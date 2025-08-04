import { useState, useEffect } from "react";
import apiService from "./apiService";

// Constants
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const FIELD_LABELS = {
  productionOrderNo: "Production Order No.",
  pressId: "Press ID",
  customer: "Customer",
  netWt: "Net Weight (Ton)",
  dieNo: "Die Number",
  qty: "Quantity",
  prodTonn: "Production Tonnage",
  section: "Section",
  grade: "Material Grade",
  dieRequired: "Die Required",
  rmStatus: "RM Status",
  heatCode: "Heat Code",
  remark: "Remark",
  // ✅ NEW FIELD,
};

const useWeeklyPlanData = () => {
  // State Management
  const [weekOffset, setWeekOffset] = useState(0);
  const [pressDropdown, setPressDropdown] = useState([]);
  const [customerDropdown, setCustomerDropdown] = useState([]);
  const [gradeDropdown, setGradeDropdown] = useState([]);
  const [modalWeekOffset, setModalWeekOffset] = useState(0);
  const [plans, setPlans] = useState({});
  const [dayWiseData, setDayWiseData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showPreviewTable, setShowPreviewTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [masterData, setMasterData] = useState({
    presses: [],
    customers: [],
    grades: [],
    sections: [],
  });
  const [editingRow, setEditingRow] = useState(null);

  // Utility Functions
  const getWeekDates = (offset = 0) => {
    const dates = [];
    const today = new Date();
    const currentMonday = new Date(today);
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    currentMonday.setDate(today.getDate() + daysToMonday + offset * 7);

    for (let i = 0; i < 6; i++) {
      const date = new Date(currentMonday);
      date.setDate(currentMonday.getDate() + i);
      dates.push({
        dayName: DAY_NAMES[i],
        date: date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        fullDate: date,
        key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      });
    }
    return dates;
  };

  const getWeekTitle = (offset = weekOffset) => {
    const dates = getWeekDates(offset);
    const startDate = dates[0].fullDate;
    const endDate = dates[5].fullDate;
    const startStr = startDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    const endStr = endDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return `${startStr} - ${endStr}`;
  };

  const getWeekStatus = (offset = weekOffset) => {
    if (offset === 0) return "Current Week";
    if (offset === 1) return "Next Week";
    return offset > 1
      ? `${offset} Weeks Ahead`
      : `${Math.abs(offset)} Weeks Ago`;
  };

  const createEmptyRecord = (dayName, date) => ({
    id: `temp_${Date.now()}_${Math.random()}`,
    pressId: "FP4001T",
    customer: "",
    netWt: "",
    dieNo: [""],
    qty: { shift1: "", shift2: "", shift3: "" },
    prodTonn: "",
    section: "",
    grade: "",
    dieRequired: "Yes",
    rmStatus: "Available",
    heatCode: "",
    remark: "",
    day: dayName,
    date: date,
    weekOffset: modalWeekOffset,
    isNew: true,
  });

  // API Integration Functions
  const loadWeeklyPlans = async (offset) => {
    setLoading(true);
    try {
      const response = await apiService.getWeeklyPlans(offset);
      if (response.success) {
        setPlans(response.data || {});
      }
    } catch (error) {
      console.error("Error loading plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMasterData = async () => {
    try {
      const data = await apiService.getMasterData();
      setMasterData(data);
    } catch (error) {
      console.error("Error loading master data:", error);
    }
  };

  const initializeDayWiseData = (offset = modalWeekOffset) => {
    const dates = getWeekDates(offset);
    const data = {};

    dates.forEach(({ dayName, date }) => {
      // Check if plans exist for this day
      const existingPlan = plans[dayName];
      if (existingPlan && existingPlan.length > 0) {
        data[dayName] = existingPlan;
      } else {
        data[dayName] = [createEmptyRecord(dayName, date)];
      }
    });

    return data;
  };

  // Event Handlers
  const handleWeekChange = (newOffset) => {
    setWeekOffset(newOffset);
    loadWeeklyPlans(newOffset);
  };

  const handleModalWeekChange = (newOffset) => {
    setModalWeekOffset(newOffset);
    const newData = initializeDayWiseData(newOffset);
    setDayWiseData(newData);
  };

  const handleDieNoChange = async (day, recordIndex, value) => {
    const results = await apiService.getKlnMasterDataByDie(value);

    const customers = [...new Set(results.map((obj) => obj.customer_name))];
    const grades = [...new Set(results.map((obj) => obj.rm_grade))];
    const presses = [...new Set(results.map((obj) => obj.forge_press))];
    const sections = [...new Set(results.map((obj) => obj.rm_section))];

    setCustomerDropdown(customers);
    setGradeDropdown(grades);
    setPressDropdown(presses);

    setDayWiseData((prev) => {
      const updatedDayData = prev[day].map((record, idx) =>
        idx === recordIndex
          ? {
              ...record,
              dieNo: [value],
              customer: customers[0] || "",
              grade: grades[0] || "",
              pressId: presses[0] || "",
              section: sections[0] || "",
            }
          : record
      );
      console.log("Updated Day Only:", updatedDayData);
      return { ...prev, [day]: updatedDayData };
    });
  };

  const handleDayWiseChange = (day, recordIndex, field, value) => {
    setDayWiseData((prev) => ({
      ...prev,
      [day]: prev[day].map((record, idx) =>
        idx === recordIndex ? { ...record, [field]: value } : record
      ),
    }));
  };

  const addNewRowForDay = (day) => {
    const dates = getWeekDates(modalWeekOffset);
    const dayData = dates.find((d) => d.dayName === day);
    const emptyRow = createEmptyRecord(day, dayData.date);

    setDayWiseData((prev) => ({
      ...prev,
      [day]: [...prev[day], emptyRow],
    }));
  };

  const removeRowFromDay = (day, recordIndex) => {
    setDayWiseData((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, idx) => idx !== recordIndex),
    }));
  };

  const updateDieNo = async (day, recordIndex, dieIndex, value) => {
    setDayWiseData((prev) => {
      const newData = { ...prev };
      newData[day][recordIndex].dieNo[dieIndex] = value;
      return newData;
    });

    if (dieIndex === 0 && value) {
      const masterData = await apiService.getKlnMasterDataByDie(value);
      if (masterData) {
        setDayWiseData((prev) => ({
          ...prev,
          [day]: prev[day].map((record, idx) =>
            idx === recordIndex
              ? {
                  ...record,
                  customer: masterData.customer_name,
                  netWt: masterData.net_wt,
                  section: masterData.rm_section,
                  grade: masterData.rm_grade,
                }
              : record
          ),
        }));
      }
    }
  };

  const addDieNo = (day, recordIndex) => {
    setDayWiseData((prev) => ({
      ...prev,
      [day]: prev[day].map((record, idx) =>
        idx === recordIndex
          ? { ...record, dieNo: [...(record.dieNo || []), ""] }
          : record
      ),
    }));
  };

  const removeDieNo = (day, recordIndex, dieIndex) => {
    setDayWiseData((prev) => ({
      ...prev,
      [day]: prev[day].map((record, idx) =>
        idx === recordIndex
          ? { ...record, dieNo: record.dieNo.filter((_, i) => i !== dieIndex) }
          : record
      ),
    }));
  };

  const handleSavePlan = async () => {
    setLoading(true);
    try {
      const planData = {
        weekOffset: modalWeekOffset,
        weekDates: getWeekDates(modalWeekOffset),
        plans: dayWiseData,
      };

      const response = await apiService.saveWeeklyPlan(planData);
      if (response.success) {
        alert("Plan saved successfully!");
        setShowModal(false);
        loadWeeklyPlans(weekOffset); // Refresh current view
      }
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Error saving plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setModalWeekOffset(weekOffset);
    setShowModal(true);
    setShowPreviewTable(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowPreviewTable(false);
    setModalWeekOffset(weekOffset);
  };

  const handleEditClick = (dayName, index) => {
    setEditingRow({ dayName, index });
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
  };

  const handlePreviewRowChange = (field, value) => {
    const { dayName, index } = editingRow;
    setDayWiseData((prev) => {
      const updated = [...prev[dayName]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [dayName]: updated };
    });
  };

  const handlePreviewSave = () => {
    setEditingRow(null);
  };

  // Effects
  useEffect(() => {
    loadMasterData();
    loadWeeklyPlans(weekOffset);
  }, []);

  useEffect(() => {
    if (showModal) {
      setDayWiseData(initializeDayWiseData(modalWeekOffset));
    }
  }, [modalWeekOffset, showModal]);

  return {
    // State
    weekOffset,
    pressDropdown,
    customerDropdown,
    gradeDropdown,
    modalWeekOffset,
    plans,
    dayWiseData,
    showModal,
    showPreviewTable,
    loading,
    masterData,
    editingRow,
    
    // Constants
    DAY_NAMES,
    FIELD_LABELS,
    
    // Utility Functions
    getWeekDates,
    getWeekTitle,
    getWeekStatus,
    createEmptyRecord,
    
    // Event Handlers
    handleWeekChange,
    handleModalWeekChange,
    handleDieNoChange,
    handleDayWiseChange,
    addNewRowForDay,
    removeRowFromDay,
    updateDieNo,
    addDieNo,
    removeDieNo,
    handleSavePlan,
    openModal,
    closeModal,
    handleEditClick,
    handleCancelEdit,
    handlePreviewRowChange,
    handlePreviewSave,
    
    // API Functions
    loadWeeklyPlans,
    loadMasterData,
    initializeDayWiseData,
  };
};

export default useWeeklyPlanData;