import React, { useState, useEffect } from "react";
import {
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  Edit,
  Trash2,
} from "lucide-react";
import WeeklyPlanDisplay from "./WeeklyPlanDisplay";
import "./WeeklyPlanModal.css";
import SmartWeeklyPlanChatbot from "./SmartWeeklyPlanChatbot";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const getAuthHeadersWithCSRF = async (method = "GET", contentType = true) => {
  const credentials = btoa("ktfladm:Ktfl_Admin@2024");

  // Step 1: Trigger cookie set
  await fetch("https://ktfrancesrv2.kalyanicorp.com/internal/weekly_entry", {
    method: "GET",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    credentials: "include",
  });

  const csrfToken = getCookie("CSRFToken");
  console.log("Fetched CSRF Token from cookie:", csrfToken);

  if (!csrfToken) {
    throw new Error("CSRF token not found in cookies.");
  }

  const headers = {
    Authorization: `Basic ${credentials}`,
    "X-CSRF-Token": csrfToken,
  };

  if (contentType) {
    headers["Content-Type"] = "application/json";
  }

  return {
    headers,
    credentials: "include",
  };
};

const formatDateForBackend = (date) => {
  const pad = (n) => n.toString().padStart(2, "0");
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}.${month}.${year} 00:00:00`;
};

// Constants
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const FIELD_LABELS = {
  plantCode: "Plant Code",
  productionOrderNo: "Production Order No.",
  pressId: "Press ID",
  customer: "Customer",
  netWt: "Net Weight (KG)",
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

// API Service Layer (Ready for backend integration)
const apiService = {
  getKlnMasterDataByDie: async (dieNumber) => {
    try {
      const response = await fetch(
        `https://ktfrancesrv2.kalyanicorp.com/internal/weekly_entry?die_no=${dieNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa("ktfladm:Ktfl_Admin@2024")}`,
          },
        }
      );
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching weekly entry by die number:", error);
      return [];
    }
  },

  getForgeLines: async () => {
    console.log("Calling Forge Lines API 🚀");
    try {
      const response = await fetch(
        "https://ktfrancesrv2.kalyanicorp.com/internal/forge_lines",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa("ktfladm:Ktfl_Admin@2024")}`,
          },
        }
      );

      const data = await response.json();

      // API response: [{ "forge_lines": [] }]
      // Extract forge_lines array from first object
      if (data && data.length > 0 && data[0].forge_lines) {
        return data[0].forge_lines;
      }
      return [];
    } catch (error) {
      console.error("Error fetching forge lines:", error);
      return [];
    }
  },

  // Get all plans for a specific week
  getWeeklyPlans: async (weekOffset) => {
    // TODO: Replace with actual API call
    // return await fetch(`/api/plans?weekOffset=${weekOffset}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: {} });
      }, 500);
    });
  },

  // Save/Update weekly plan
  saveWeeklyPlan: async (dayWiseData) => {
    try {
      const plans = [];

      Object.entries(dayWiseData).forEach(([_, records]) => {
        records.forEach((rec) => {
          plans.push({
            prod_order: rec.productionOrderNo || "P-" + Date.now(),
            forge_press: rec.pressId || "None",
            heat_code: rec.heatCode || "None",
            shift1_qty: parseInt(rec.qty?.shift1) || 0,
            shift2_qty: parseInt(rec.qty?.shift2) || 0,
            shift3_qty: parseInt(rec.qty?.shift3) || 0,
            die_req: parseInt(rec.dieRequired) || 0,
            rm_status: rec.rmStatus || "None",
            prod_tonn: parseFloat(rec.prodTonn) || 0,
            remark: rec.remark || "None",
            die_no: rec.dieNo?.[0] || "None",
            customer: rec.customer || "None",
            section: parseInt(rec.section) || 0,
            rm_grade: rec.grade === "N/A" ? "" : rec.grade,
            die_req:
              rec.dieRequired === "N/A" || rec.dieRequired === "No" ? 0 : 1,
            plant_code: parseInt(rec.plantCode) || 0,
          });
        });
      });

      const payload = {
        week_prod_date: formatDateForBackend(new Date()),
        plans: plans,
      };

      const authOptions = await getAuthHeadersWithCSRF("POST");

      const response = await fetch(
        "https://ktfrancesrv2.kalyanicorp.com/internal/weekly_plan",
        {
          method: "POST",
          ...authOptions,
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("API Error: " + errorText);
      }

      return { success: true, message: "Weekly plan submitted." };
    } catch (error) {
      console.error("Save plan failed:", error);
      return { success: false, message: error.message };
    }
  },

  // Delete specific plan
  deletePlan: async (planId) => {
    // TODO: Replace with actual API call
    // return await fetch(`/api/plans/${planId}`, { method: 'DELETE' });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Plan deleted successfully" });
      }, 500);
    });
  },

  // Update specific plan
  updatePlan: async (planId, planData) => {
    // TODO: Replace with actual API call
    // return await fetch(`/api/plans/${planId}`, { method: 'PUT', body: JSON.stringify(planData) });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Plan updated successfully" });
      }, 1000);
    });
  },

  // Get master data (presses, customers, etc.)
  getMasterData: async () => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          presses: [
            { id: "FP4001T", name: "FP4001T", capacity: 1000 },
            { id: "FP4002Q", name: "FP4002Q", capacity: 1200 },
          ],
          customers: [
            { id: 1, name: "Dana Thailand" },
            { id: 2, name: "ABC Corp" },
          ],
          grades: ["6061", "6063", "7075"],
          sections: ["A1", "A2", "B1", "B2"],
        });
      }, 300);
    });
  },
};

// Styles
const styles = {
  container: {
    padding: "10px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    flexWrap: "wrap",
    gap: "10px",
  },
  button: {
    padding: "6px 12px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    background: "#f5f5f5",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
  },
  primaryButton: {
    padding: "6px 12px",
    border: "1px solid #007bff",
    borderRadius: "4px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
  },
  successButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  weekNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px",
    padding: "6px",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    flexWrap: "wrap",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "5px",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    width: "97%",
    maxWidth: "100vw",
    height: "70vh",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
  },
  modalTitle: {
    margin: 0,
    fontSize: "14px",
  },
  modalTableWrapper: {
    flex: 1,
    overflowX: "auto",
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "4px",
    maxHeight: "calc(95vh - 140px)",
  },
  modalTable: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "10px",
    minWidth: "1200px", // Ensures horizontal scroll on small screens
  },
  modalTableHeader: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    padding: "6px 2px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "9px",
    position: "sticky",
    top: 0,
    zIndex: 10,
    whiteSpace: "nowrap",
  },
  modalTableCell: {
    border: "1px solid #dee2e6",
    padding: "2px",
    verticalAlign: "top",
    minWidth: "60px",
  },
  dayCell: {
    backgroundColor: "#f8f9fa",
    fontWeight: "600",
    fontSize: "9px",
    minWidth: "60px",
    position: "sticky",
    left: 0,
    zIndex: 5,
  },
  compactInput: {
    width: "100%",
    padding: "2px 3px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontSize: "9px",
    minHeight: "20px",
    boxSizing: "border-box",
  },
  compactSelect: {
    width: "100%",
    padding: "2px 3px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontSize: "9px",
    minHeight: "22px",
    backgroundColor: "white",
    color: "#333",
    boxSizing: "border-box",
  },
  shiftInputs: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
  },
  shiftInput: {
    width: "100%",
    padding: "1px 2px",
    border: "1px solid #ccc",
    borderRadius: "2px",
    fontSize: "8px",
    minHeight: "16px",
    boxSizing: "border-box",
  },
  actionButtons: {
    display: "flex",
    gap: "1px",
    flexWrap: "wrap",
  },
  smallButton: {
    padding: "1px 4px",
    fontSize: "8px",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    minHeight: "16px",
    whiteSpace: "nowrap",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    paddingTop: "6px",
    borderTop: "1px solid #eee",
    marginTop: "6px",
    flexShrink: 0,
    flexWrap: "wrap",
  },
  modalFooterButton: {
    padding: "6px 12px",
    fontSize: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "1px solid",
    minWidth: "80px",
  },
  loading: {
    textAlign: "center",
    padding: "15px",
    color: "#666",
    fontSize: "14px",
  },
};

const WeeklyPlan = () => {
  // State Management
  const [weekOffset, setWeekOffset] = useState(0);
  const [modalWeekOffset, setModalWeekOffset] = useState(0);
  const [plans, setPlans] = useState({});
  const [dayWiseData, setDayWiseData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [masterData, setMasterData] = useState({
    presses: [],
    customers: [],
    grades: [],
    sections: [],
  });

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
    pressId: "",
    customer: "",
    netWt: "",
    dieNo: [""],
    dieNoError: false,
    dieNoErrorMessage: "",
    qty: { shift1: "", shift2: "", shift3: "" },
    prodTonn: "",
    section: "",
    plantCode: "",
    grade: "",
    dieRequired: "",
    rmStatus: "",
    heatCode: "",
    remark: "",
    day: dayName,
    date: date,
    weekOffset: modalWeekOffset,
    isNew: true,
  });

  const loadMasterData = async () => {
    console.log("loadMasterData called ✅");
    try {
      const forgeLines = await apiService.getForgeLines(); // ✅ Uncomment this line
      console.log("Forge Lines API Response 👉", forgeLines); // ✅ Add this debug log

      // Transform data properly
      const transformedPresses = forgeLines.map((press) => ({
        id: press,
        name: press,
      }));

      console.log("Transformed Presses:", transformedPresses); // ✅ Add this debug log

      // Static values ko empty arrays se replace kar dein
      const data = {
        presses: transformedPresses, // Yeh remove kar dega Press ID dropdown
        customers: [], // Yeh remove kar dega Customer dropdown
        grades: [], // Yeh remove kar dega Grade dropdown
        sections: [], // Yeh remove kar dega Section dropdown
      };
      setMasterData(data);
      console.log("MasterData set:", data); // ✅ Add this debug log
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

  const handleModalWeekChange = (newOffset) => {
    setModalWeekOffset(newOffset);
    const newData = initializeDayWiseData(newOffset);
    setDayWiseData(newData);
  };

  // 🔥 UPDATED handleDieNoChange function
  const handleDieNoChange = async (day, recordIndex, value) => {
    if (!value || value.trim() === "") {
      // Reset fields
      setDayWiseData((prev) => ({
        ...prev,
        [day]: prev[day].map((record, idx) =>
          idx === recordIndex
            ? {
                ...record,
                dieNo: [value],
                dieNoError: false,
                dieNoErrorMessage: "",
                productionOrderNo: "",
                customer: "",
                grade: "",
                pressId: "",
                plantCode: "",
                section: "",
                netWt: "",
                customerOptions: [],
                pressOptions: [],
                gradeOptions: [],
                plantOptions: [],
                productionOrderOptions: [],
                dieResults: [],
                hasMultipleOptions: false, // ✅ Reset on error
              }
            : record
        ),
      }));
      return;
    }

    try {
      const results = await apiService.getKlnMasterDataByDie(value);

      if (!results || results.length === 0) {
        // No matching die number
        setDayWiseData((prev) => ({
          ...prev,
          [day]: prev[day].map((record, idx) =>
            idx === recordIndex
              ? {
                  ...record,
                  dieNo: [value],
                  dieNoError: true,
                  dieNoErrorMessage: `No data found for Die No. ${value}`,
                  productionOrderNo: "",
                  customer: "",
                  grade: "",
                  pressId: "",
                  plantCode: "",
                  section: "",
                  netWt: "",
                  customerOptions: [],
                  pressOptions: [],
                  gradeOptions: [],
                  plantOptions: [],
                  productionOrderOptions: [],
                  dieResults: [],
                  hasMultipleOptions: false, // ✅ Reset flag
                  hasMultipleOptions: false, // ✅ Reset flag
                }
              : record
          ),
        }));
        return;
      }

      // Get unique production orders and press IDs
      const uniqueProductionOrders = [
        ...new Set(results.map((r) => r.prod_order)),
      ];
      const uniquePressIds = [...new Set(results.map((r) => r.forge_press))];

      // 🔥 NEW: Always get the first result for auto-filling
      const firstResult = results[0];
      const plantCodeValue =
        firstResult.plant_code ||
        firstResult.plantCode ||
        firstResult.plant ||
        firstResult.Plant_Code ||
        "";

      if (results.length === 1) {
        // Single result - auto-fill all fields (existing logic)
        setDayWiseData((prev) => ({
          ...prev,
          [day]: prev[day].map((record, idx) =>
            idx === recordIndex
              ? {
                  ...record,
                  dieNo: [value],
                  dieNoError: false,
                  dieNoErrorMessage: "",
                  productionOrderNo: firstResult.prod_order || "",
                  plantCode: plantCodeValue,
                  pressId: firstResult.forge_press || "",
                  customer: firstResult.customer || "",
                  netWt: firstResult.net_wt || 0,
                  section: firstResult.section || "",
                  grade: firstResult.rm_grade || "N/A",
                  dieRequired: firstResult.die_req ? "Yes" : "No",
                  rmStatus: firstResult.rm_status || "No",
                  customerOptions: [],
                  pressOptions: [],
                  gradeOptions: [],
                  plantOptions: [],
                  productionOrderOptions: [],
                  dieResults: results,
                  hasMultipleOptions: false, // ✅ Single result, no dropdown needed
                }
              : record
          ),
        }));
      } else {
        // 🔥 UPDATED: Multiple results - show dropdowns with first value auto-selected
        setDayWiseData((prev) => ({
          ...prev,
          [day]: prev[day].map((record, idx) =>
            idx === recordIndex
              ? {
                  ...record,
                  dieNo: [value],
                  dieNoError: false,
                  dieNoErrorMessage: "",
                  // 🔥 AUTO-SELECT FIRST VALUES (but keep dropdowns enabled)
                  productionOrderNo: firstResult.prod_order || "", // ✅ Auto-select first production order
                  pressId: firstResult.forge_press || "", // ✅ Auto-select first press ID
                  plantCode: plantCodeValue,
                  customer: firstResult.customer || "",
                  netWt: firstResult.net_wt || 0,
                  section: firstResult.section || "",
                  grade: firstResult.rm_grade || "N/A",
                  dieRequired: firstResult.die_req ? "Yes" : "No",
                  rmStatus: firstResult.rm_status || "No",
                  // ✅ IMPORTANT: Provide ALL options for dropdowns so user can change
                  customerOptions: [...new Set(results.map((r) => r.customer))],
                  pressOptions: uniquePressIds, // ✅ All available press options
                  gradeOptions: [...new Set(results.map((r) => r.rm_grade))],
                  plantOptions: [...new Set(results.map((r) => r.plant_code))],
                  productionOrderOptions: uniqueProductionOrders, // ✅ All available production orders
                  dieResults: results,
                  // 🔥 NEW: Flag to indicate this record has multiple options available
                  hasMultipleOptions: true,
                }
              : record
          ),
        }));
      }
    } catch (error) {
      console.error("API error:", error);
      setDayWiseData((prev) => ({
        ...prev,
        [day]: prev[day].map((record, idx) =>
          idx === recordIndex
            ? {
                ...record,
                dieNo: [value],
                dieNoError: true,
                dieNoErrorMessage: "Error fetching die data",
                productionOrderOptions: [],
                dieResults: [],
              }
            : record
        ),
      }));
    }
  };

  // 🔥 UPDATED handleProductionOrderChange function
  const handleProductionOrderChange = (day, recordIndex, selectedProdOrder) => {
    const record = dayWiseData[day]?.[recordIndex];
    if (!record || !record.dieResults) return;

    // Find the selected production order data
    const selectedData = record.dieResults.find(
      (r) => r.prod_order === selectedProdOrder
    );

    if (selectedData) {
      // 🔧 Try different field names for plant code
      const plantCodeValue =
        selectedData.plant_code ||
        selectedData.plantCode ||
        selectedData.plant ||
        selectedData.Plant_Code ||
        "";

      console.log("🔧 Plant Code from Production Order:", plantCodeValue);

      setDayWiseData((prev) => ({
        ...prev,
        [day]: prev[day].map((rec, idx) =>
          idx === recordIndex
            ? {
                ...rec,
                productionOrderNo: selectedData.prod_order || "",
                plantCode: plantCodeValue, // 🔧 UPDATED THIS LINE
                pressId: selectedData.forge_press || "",
                customer: selectedData.customer || "",
                netWt: selectedData.net_wt || 0,
                section: selectedData.section || "",
                grade: selectedData.rm_grade || "N/A",
                dieRequired: selectedData.die_req ? "Yes" : "No",
                rmStatus: selectedData.rm_status || "No",
              }
            : rec
        ),
      }));
    }
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

  // const updateDieNo = async (day, recordIndex, dieIndex, value) => {
  //   setDayWiseData((prev) => {
  //     const newData = { ...prev };
  //     newData[day][recordIndex].dieNo[dieIndex] = value;
  //     return newData;
  //   });

  //   if (dieIndex === 0 && value) {
  //     const masterData = await apiService.getKlnMasterDataByDie(value);
  //     if (masterData) {
  //       setDayWiseData((prev) => ({
  //         ...prev,
  //         [day]: prev[day].map((record, idx) =>
  //           idx === recordIndex
  //             ? {
  //                 ...record,
  //                 customer: masterData.customer_name,
  //                 netWt: masterData.net_wt,
  //                 section: masterData.rm_section,
  //                 grade: masterData.rm_grade,
  //               }
  //             : record
  //         ),
  //       }));
  //     }
  //   }
  // };

  // const addDieNo = (day, recordIndex) => {
  //   setDayWiseData((prev) => ({
  //     ...prev,
  //     [day]: prev[day].map((record, idx) =>
  //       idx === recordIndex
  //         ? { ...record, dieNo: [...(record.dieNo || []), ""] }
  //         : record
  //     ),
  //   }));
  // };

  // const removeDieNo = (day, recordIndex, dieIndex) => {
  //   setDayWiseData((prev) => ({
  //     ...prev,
  //     [day]: prev[day].map((record, idx) =>
  //       idx === recordIndex
  //         ? { ...record, dieNo: record.dieNo.filter((_, i) => i !== dieIndex) }
  //         : record
  //     ),
  //   }));
  // };

  const calculateProdTonn = (qty, netWt) => {
    const s1 = parseFloat(qty?.shift1 || 0);
    const s2 = parseFloat(qty?.shift2 || 0);
    const s3 = parseFloat(qty?.shift3 || 0);
    const wt = parseFloat(netWt || 0);
    const total = ((s1 + s2 + s3) * wt) / 1000;
    return Number(total.toFixed(2));
  };

  const handleDayWiseChange = (dayName, recordIndex, field, value) => {
    setDayWiseData((prev) => {
      const updated = { ...prev };
      const record = { ...updated[dayName][recordIndex] };

      if (field.startsWith("shift")) {
        record.qty = {
          ...record.qty,
          [field]: value,
        };
      } else {
        record[field] = value;
      }

      // recalculate prodTonn
      const qty = field.startsWith("shift") ? record.qty : record.qty || {};
      const netWt = field === "netWt" ? value : record.netWt;
      record.prodTonn = calculateProdTonn(qty, netWt);

      updated[dayName][recordIndex] = record;
      return updated;
    });
  };

  const handleSavePlan = async () => {
    setLoading(true);

    try {
      const validatedPlans = [];
      const allProdOrders = new Set();

      for (const [day, records] of Object.entries(dayWiseData)) {
        for (const rec of records) {
          const qty = rec.qty || {};

          const isAnyFieldEmpty =
            !rec.productionOrderNo ||
            !rec.pressId ||
            !rec.dieRequired ||
            !rec.rmStatus ||
            !rec.dieNo?.[0] ||
            !rec.customer ||
            rec.section === "" ||
            rec.grade === "" ||
            rec.plantCode === "" ||
            qty.shift1 === "" ||
            qty.shift2 === "" ||
            qty.shift3 === "";

          if (isAnyFieldEmpty) {
            alert("⚠️ Please fill all fields before saving the plan.");
            setLoading(false);
            return;
          }

          // 🚨 Check for duplicate Production Order No.
          // if (allProdOrders.has(rec.productionOrderNo)) {
          //   alert(
          //     `⚠️ Duplicate Production Order "${rec.productionOrderNo}" found!`
          //   );
          //   setLoading(false);
          //   return;
          // }
          // allProdOrders.add(rec.productionOrderNo);

          // ✅ Convert record.date ("16/07/2025") → "16.07.2025 00:00:00"
          const dateParts = rec.date.split("/");
          const weekDateStr = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]} 00:00:00`;

          validatedPlans.push({
            week_prod_date: weekDateStr,
            prod_order: rec.productionOrderNo,
            forge_press: rec.pressId,
            heat_code: rec.heatCode,
            shift1_qty: parseInt(qty.shift1),
            shift2_qty: parseInt(qty.shift2),
            shift3_qty: parseInt(qty.shift3),

            rm_status: rec.rmStatus,
            prod_tonn: parseFloat(rec.prodTonn) || 0,
            remark: rec.remark,
            die_no: rec.dieNo[0],
            customer: rec.customer,
            section: parseInt(rec.section),
            rm_grade: rec.grade === "N/A" ? "" : rec.grade,
            die_req:
              rec.dieRequired === "N/A" || rec.dieRequired === "No" ? 0 : 1,

            plant_code: parseInt(rec.plantCode),
          });
        }
      }

      const payload = validatedPlans;

      console.log("📦 Final Payload Being Sent:", payload);

      // ✅ FIXED: Use getAuthHeadersWithCSRF properly
      const authOptions = await getAuthHeadersWithCSRF("POST");

      const response = await fetch(
        "https://ktfrancesrv2.kalyanicorp.com/internal/weekly_plan",
        {
          method: "POST",
          ...authOptions, // This includes headers with CSRF token and credentials
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg);
      }

      alert("✅ Plan submitted successfully!");
      setShowModal(false);
      setDayWiseData({}); // Clear modal data
      setModalWeekOffset(weekOffset); // Reset modal week offset
    } catch (error) {
      console.error("❌ Save plan failed:", error);
      alert("❌ Error saving plan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setModalWeekOffset(weekOffset);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false); // ✅ Ensure preview table is hidden
    setModalWeekOffset(weekOffset);
    setDayWiseData({}); // ✅ Clear any leftover data
    setEditingRow(null); // ✅ Clear editing state
  };

  // Effects
  useEffect(() => {
    console.log("Component Mounted ✅");
    loadMasterData();
  }, []);

  useEffect(() => {
    if (showModal) {
      setDayWiseData(initializeDayWiseData(modalWeekOffset));
    }
  }, [modalWeekOffset, showModal]);

  // const renderDieNoField = (record, day, recordIndex) => (
  //   <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
  //     {(record.dieNo || []).map((dn, dieIndex) => (
  //       <div
  //         key={dieIndex}
  //         style={{ display: "flex", gap: "4px", alignItems: "center" }}
  //       >
  //         <input
  //           type="text"
  //           value={record.dieNo[0] || ""}
  //           onChange={(e) =>
  //             handleDieNoChange(day, recordIndex, e.target.value)
  //           }
  //           style={styles.input}
  //           placeholder="Die No"
  //         />

  //         {record.dieNo.length > 1 && (
  //           <button
  //             onClick={() => removeDieNo(day, recordIndex, dieIndex)}
  //             style={{
  //               padding: "4px",
  //               background: "#dc3545",
  //               color: "white",
  //               border: "none",
  //               borderRadius: "3px",
  //             }}
  //           >
  //             <X size={12} />
  //           </button>
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // );

  if (loading && !showModal) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <button style={styles.button}>
            <Filter size={16} /> Filter
          </button> */}
          <button onClick={openModal} style={styles.primaryButton}>
            <Plus size={16} /> Enter Plan
          </button>
        </div>
      </div>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Weekly Plan Entry</h3>
              <button
                onClick={closeModal}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "3px",
                }}
              >
                <X size={window.innerWidth >= 768 ? 20 : 16} />
              </button>
            </div>

            {/* Week Navigation */}
            <div style={styles.weekNav}>
              <button
                onClick={() => handleModalWeekChange(modalWeekOffset - 1)}
                style={{
                  ...styles.button,
                  background: "white",
                  fontSize: window.innerWidth >= 768 ? "14px" : "11px",
                }}
              >
                <ChevronLeft size={window.innerWidth >= 768 ? 16 : 14} />
                <span
                  style={{
                    display: window.innerWidth >= 480 ? "inline" : "none",
                  }}
                >
                  Previous
                </span>
              </button>

              <div
                style={{
                  fontSize: window.innerWidth >= 768 ? "16px" : "12px",
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: "center",
                  flex: "1",
                  minWidth: "120px",
                }}
              >
                <div>{getWeekTitle(modalWeekOffset)}</div>
                <div
                  style={{
                    fontSize: window.innerWidth >= 768 ? "14px" : "10px",
                    color: "#666",
                    marginTop: "2px",
                  }}
                >
                  {getWeekStatus(modalWeekOffset)}
                </div>
              </div>

              <button
                onClick={() => handleModalWeekChange(modalWeekOffset + 1)}
                style={{
                  ...styles.button,
                  background: "white",
                  fontSize: window.innerWidth >= 768 ? "14px" : "11px",
                }}
              >
                <span
                  style={{
                    display: window.innerWidth >= 480 ? "inline" : "none",
                  }}
                >
                  Next
                </span>
                <ChevronRight size={window.innerWidth >= 768 ? 16 : 14} />
              </button>
            </div>

            {/* Table Wrapper */}
            <div style={styles.modalTableWrapper}>
              <table style={styles.modalTable}>
                <thead>
                  <tr>
                    <th
                      style={{ ...styles.modalTableHeader, ...styles.dayCell }}
                    >
                      Day & Date
                    </th>
                    {Object.keys(FIELD_LABELS).map((field) => (
                      <th key={field} style={styles.modalTableHeader}>
                        {window.innerWidth >= 768
                          ? FIELD_LABELS[field]
                          : FIELD_LABELS[field].length > 12
                          ? FIELD_LABELS[field].substring(0, 12) + "..."
                          : FIELD_LABELS[field]}
                      </th>
                    ))}
                    <th style={styles.modalTableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getWeekDates(modalWeekOffset).map(({ dayName, date }) =>
                    dayWiseData[dayName]?.map((record, recordIndex) => (
                      <tr key={`${dayName}-${recordIndex}`}>
                        <td
                          style={{
                            ...styles.modalTableCell,
                            ...styles.dayCell,
                          }}
                        >
                          <div style={{ fontWeight: "600" }}>{dayName}</div>
                          <div
                            style={{
                              fontSize:
                                window.innerWidth >= 768 ? "10px" : "8px",
                              color: "#666",
                            }}
                          >
                            {window.innerWidth >= 480
                              ? date
                              : date.split("/").slice(0, 2).join("/")}
                          </div>
                          {recordIndex > 0 && (
                            <div
                              style={{
                                fontSize:
                                  window.innerWidth >= 768 ? "9px" : "7px",
                                color: "#999",
                              }}
                            >
                              #{recordIndex + 1}
                            </div>
                          )}
                        </td>

                        {/* All data fields */}
                        {Object.keys(FIELD_LABELS).map((field) => (
                          <td
                            key={`${dayName}-${recordIndex}-${field}`}
                            style={styles.modalTableCell}
                          >
                            {field === "dieNo" ? (
                              <div>
                                <input
                                  type="text"
                                  value={record.dieNo?.[0] || ""}
                                  onChange={(e) =>
                                    handleDieNoChange(
                                      dayName,
                                      recordIndex,
                                      e.target.value
                                    )
                                  }
                                  style={{
                                    ...styles.compactInput,
                                    borderColor: record.dieNoError
                                      ? "#dc3545"
                                      : "#ccc",
                                    backgroundColor: record.dieNoError
                                      ? "#fff5f5"
                                      : "white",
                                  }}
                                  placeholder={
                                    window.innerWidth >= 768 ? "Die No" : "Die"
                                  }
                                />
                                {record.dieNoError && (
                                  <div
                                    style={{
                                      color: "#dc3545",
                                      fontSize:
                                        window.innerWidth >= 768
                                          ? "9px"
                                          : "7px",
                                      marginTop: "1px",
                                    }}
                                  >
                                    {window.innerWidth >= 768
                                      ? record.dieNoErrorMessage
                                      : "Error"}
                                  </div>
                                )}
                              </div>
                            ) : field === "qty" ? (
                              <div style={styles.shiftInputs}>
                                <input
                                  type="number"
                                  placeholder="S1"
                                  value={record.qty?.shift1 || ""}
                                  onChange={(e) =>
                                    handleDayWiseChange(
                                      dayName,
                                      recordIndex,
                                      "qty",
                                      {
                                        ...record.qty,
                                        shift1: e.target.value,
                                      }
                                    )
                                  }
                                  style={styles.shiftInput}
                                />
                                <input
                                  type="number"
                                  placeholder="S2"
                                  value={record.qty?.shift2 || ""}
                                  onChange={(e) =>
                                    handleDayWiseChange(
                                      dayName,
                                      recordIndex,
                                      "qty",
                                      {
                                        ...record.qty,
                                        shift2: e.target.value,
                                      }
                                    )
                                  }
                                  style={styles.shiftInput}
                                />
                                <input
                                  type="number"
                                  placeholder="S3"
                                  value={record.qty?.shift3 || ""}
                                  onChange={(e) =>
                                    handleDayWiseChange(
                                      dayName,
                                      recordIndex,
                                      "qty",
                                      {
                                        ...record.qty,
                                        shift3: e.target.value,
                                      }
                                    )
                                  }
                                  style={styles.shiftInput}
                                />
                              </div>
                            ) : field === "plantCode" ? (
                              record.plantOptions &&
                              record.plantOptions.length > 1 ? (
                                <select
                                  value={record.plantCode || ""}
                                  onChange={(e) =>
                                    handleDayWiseChange(
                                      dayName,
                                      recordIndex,
                                      "plantCode",
                                      e.target.value
                                    )
                                  }
                                  style={styles.compactSelect}
                                >
                                  <option value="">Select Plant Code</option>
                                  {record.plantOptions.map((plant, idx) => (
                                    <option key={idx} value={plant}>
                                      {plant}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  value={record.plantCode || ""}
                                  onChange={(e) =>
                                    handleDayWiseChange(
                                      dayName,
                                      recordIndex,
                                      "plantCode",
                                      e.target.value
                                    )
                                  }
                                  style={styles.compactInput}
                                  placeholder="Plant Code"
                                />
                              )
                            ) : field === "productionOrderNo" ? (
                              record.productionOrderOptions &&
                              record.productionOrderOptions.length > 1 ? (
                                <select
                                  value={record.productionOrderNo || ""}
                                  onChange={(e) =>
                                    handleProductionOrderChange(
                                      dayName,
                                      recordIndex,
                                      e.target.value
                                    )
                                  }
                                  style={styles.compactSelect}
                                >
                                  <option value="">
                                    Select Production Order
                                  </option>
                                  {record.productionOrderOptions.map(
                                    (prodOrder, idx) => (
                                      <option key={idx} value={prodOrder}>
                                        {prodOrder}
                                      </option>
                                    )
                                  )}
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  value={record.productionOrderNo || ""}
                                  onChange={(e) =>
                                    handleDayWiseChange(
                                      dayName,
                                      recordIndex,
                                      "productionOrderNo",
                                      e.target.value
                                    )
                                  }
                                  style={styles.compactInput}
                                  placeholder="Production Order No."
                                />
                              )
                            ) : field === "section" || field === "grade" ? (
                              <input
                                type="text"
                                value={record[field] || ""}
                                readOnly
                                style={{
                                  ...styles.compactInput,
                                  backgroundColor: "#f8f9fa",
                                  color: "#6c757d",
                                }}
                                placeholder={
                                  field === "section" ? "Section" : "Grade"
                                }
                              />
                            ) : // Modal table mein ye part find karein (around line 800+):
                            field === "pressId" ? (
                              <select
                                value={record.pressId || ""}
                                onChange={(e) =>
                                  handleDayWiseChange(
                                    dayName,
                                    recordIndex,
                                    "pressId",
                                    e.target.value
                                  )
                                }
                                style={styles.compactSelect}
                              >
                                <option value="">Select Press</option>

                                {/* ✅ Pehle dynamic options add karein (API se aaye hue) */}
                                {record.pressOptions?.map((press, idx) => (
                                  <option key={`dynamic-${idx}`} value={press}>
                                    {press}
                                  </option>
                                ))}

                                {/* ✅ Phir master data options add karein (duplicates avoid karein) */}
                                {masterData.presses
                                  ?.filter(
                                    (press) =>
                                      !record.pressOptions?.includes(press.id)
                                  )
                                  ?.map((press) => (
                                    <option key={press.id} value={press.id}>
                                      {press.name}
                                    </option>
                                  ))}
                              </select>
                            ) : field === "customer_name" ? (
                              <select
                                value={record.customer_name || ""}
                                onChange={(e) =>
                                  handleDayWiseChange(
                                    dayName,
                                    recordIndex,
                                    "customer_name",
                                    e.target.value
                                  )
                                }
                                style={styles.compactSelect}
                              >
                                <option value="" disabled>
                                  {window.innerWidth >= 768
                                    ? "Select Customer"
                                    : "Customer"}
                                </option>
                                {(
                                  record.customer_nameOptions ||
                                  masterData.customer_names.map((c) => c.name)
                                ).map((cust, idx) => (
                                  <option key={idx} value={cust}>
                                    {window.innerWidth >= 768
                                      ? cust
                                      : cust.length > 15
                                      ? cust.substring(0, 15) + "..."
                                      : cust}
                                  </option>
                                ))}
                              </select>
                            ) : field === "dieRequired" ||
                              field === "rmStatus" ? (
                              <input
                                type="text"
                                value={record[field] ?? ""}
                                readOnly
                                style={{
                                  ...styles.compactInput,
                                  backgroundColor: "#f8f9fa",
                                  color: "#6c757d",
                                }}
                                placeholder={
                                  field === "dieRequired"
                                    ? window.innerWidth >= 768
                                      ? "Die Req"
                                      : "Die"
                                    : window.innerWidth >= 768
                                    ? "RM Status"
                                    : "RM"
                                }
                              />
                            ) : field === "prodTonn" ? (
                              <input
                                type="number"
                                value={record.prodTonn || ""}
                                readOnly
                                style={{
                                  ...styles.compactInput,
                                  backgroundColor: "#f8f9fa",
                                  color: "#6c757d",
                                }}
                                placeholder={
                                  window.innerWidth >= 768
                                    ? "Production Tonnage"
                                    : "Prod"
                                }
                              />
                            ) : (
                              <input
                                type={
                                  ["qty", "netWt"].includes(field)
                                    ? "number"
                                    : "text"
                                }
                                value={record[field] || ""}
                                onChange={(e) =>
                                  handleDayWiseChange(
                                    dayName,
                                    recordIndex,
                                    field,
                                    e.target.value
                                  )
                                }
                                style={styles.compactInput}
                                placeholder={
                                  window.innerWidth >= 768
                                    ? field === "productionOrderNo"
                                      ? "Production Order No."
                                      : field === "netWt"
                                      ? "Net Weight"
                                      : field === "heatCode"
                                      ? "Heat Code"
                                      : field === "remark"
                                      ? "Remark"
                                      : FIELD_LABELS[field]
                                    : field === "productionOrderNo"
                                    ? "Prod Order"
                                    : field === "netWt"
                                    ? "Weight"
                                    : field === "heatCode"
                                    ? "Heat"
                                    : field === "remark"
                                    ? "Remark"
                                    : FIELD_LABELS[field].substring(0, 8)
                                }
                              />
                            )}
                          </td>
                        ))}

                        {/* Action buttons */}
                        <td style={styles.modalTableCell}>
                          <div style={styles.actionButtons}>
                            {recordIndex ===
                              dayWiseData[dayName].length - 1 && (
                              <button
                                onClick={() => addNewRowForDay(dayName)}
                                style={{
                                  ...styles.smallButton,
                                  background: "#28a745",
                                  color: "white",
                                }}
                              >
                                {window.innerWidth >= 768 ? "+ Add" : "+"}
                              </button>
                            )}
                            {dayWiseData[dayName].length > 1 && (
                              <button
                                onClick={() =>
                                  removeRowFromDay(dayName, recordIndex)
                                }
                                style={{
                                  ...styles.smallButton,
                                  background: "#dc3545",
                                  color: "white",
                                }}
                              >
                                <Trash2
                                  size={window.innerWidth >= 768 ? 10 : 8}
                                />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div style={styles.modalFooter}>
              <button
                onClick={closeModal}
                style={{
                  ...styles.modalFooterButton,
                  backgroundColor: "#6c757d",
                  color: "white",
                  borderColor: "#6c757d",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSavePlan}
                disabled={loading}
                style={{
                  ...styles.modalFooterButton,
                  backgroundColor: loading ? "#6c757d" : "#28a745",
                  borderColor: loading ? "#6c757d" : "#28a745",
                  color: "white",
                }}
              >
                {loading
                  ? "Saving..."
                  : window.innerWidth >= 768
                  ? "Save Plan"
                  : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {!showModal && (
        <WeeklyPlanDisplay
          weekTitle={getWeekTitle(weekOffset)}
          weekStatus={getWeekStatus(weekOffset)}
          weekDates={getWeekDates(weekOffset)}
          submittedPlans={plans}
          onEditPlan={(dayName, index, record) => {
            // optional: open modal + pre-fill data if needed
            setModalWeekOffset(weekOffset);
            setShowModal(true);
          }}
          onDeletePlan={(dayName, index, record) => {
            // optional: handle delete functionality
            console.log("Delete", dayName, index, record);
          }}
          onOpenPlanModal={openModal}
        />
      )}
      <SmartWeeklyPlanChatbot />
    </div>
  );
};

export default WeeklyPlan;
