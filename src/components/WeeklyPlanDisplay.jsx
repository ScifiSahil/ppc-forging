import React, { useState, useEffect } from "react";
import { Edit, Save, X } from "lucide-react";
import "./WeeklyPlanDisplay.css";

// Function to safely convert string to integer
const safeParseInt = (value, defaultValue = 0) => {
  if (value === null || value === undefined || value === "") {
    return defaultValue;
  }
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

const calculateProdTonn = (shift1, shift2, shift3, netWt) => {
  const s1 = safeParseInt(shift1);
  const s2 = safeParseInt(shift2);
  const s3 = safeParseInt(shift3);
  const net = safeParseFloat(netWt);

  const total = ((s1 + s2 + s3) * net) / 1000;
  return Number(total.toFixed(2));
};

// Function to safely convert string to float
const safeParseFloat = (value, defaultValue = 0) => {
  if (value === null || value === undefined || value === "") {
    return defaultValue;
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Function to safely convert to string
const safeParseString = (value, defaultValue = "") => {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  return String(value).trim();
};

// Function to validate form data
const validateFormData = (formData) => {
  const errors = [];

  // Required string fields
  if (!safeParseString(formData.prod_order)) {
    errors.push("Production Order is required");
  }

  // Numeric validations
  const plantCode = safeParseInt(formData.plant_code);
  if (plantCode <= 0) {
    errors.push("Plant Code must be a positive number");
  }

  const prodTonn = safeParseFloat(formData.prod_tonn);
  if (prodTonn < 0) {
    errors.push("Production Tonnage cannot be negative");
  }

  // Quantity validations
  const shift1 = safeParseInt(formData.shift1_qty);
  const shift2 = safeParseInt(formData.shift2_qty);
  const shift3 = safeParseInt(formData.shift3_qty);

  if (shift1 < 0 || shift2 < 0 || shift3 < 0) {
    errors.push("Shift quantities cannot be negative");
  }

  return errors;
};

// Function to map API data to component format
const mapApiDataToComponentFormat = (apiData) => {
  return apiData.map((item, index) => ({
    plantCode: item.plant_code || "",
    productionOrderNo: item.main_prod_no || "",
    prod_order: item.main_prod_no || "",
    pressId: item.main_forge_press || "",
    main_forge_press: item.main_forge_press || "",
    customer: item.customer_name || "",
    netWt: item.week_net_tonn || 0,
    dieNo: item.week_die_no || "",
    qty: formatQuantity(item.shift1_qty, item.shift2_qty, item.shift3_qty),
    shift1Qty: item.shift1_qty || 0,
    shift2Qty: item.shift2_qty || 0,
    shift3Qty: item.shift3_qty || 0,
    prodTonn: calculateProdTonn(
      item.shift1_qty || 0,
      item.shift2_qty || 0,
      item.shift3_qty || 0,
      item.week_net_tonn || 0
    ),
    section: item.week_section || "",
    grade: item.rm_grade || "",
    dieRequired: item.dies_req ?? "",
    rmStatus: item.rm_status || "",
    heatCode: item.heat_code || "",
    remark: item.remark || "",
    date: item.week_prod_date,
    rawData: item,
    id: item.id || `${item.main_prod_no}-${item.week_prod_date}-${index}`,
  }));
};


// Function to format quantity display
const formatQuantity = (shift1, shift2, shift3) => {
  const s1 = shift1 !== null && shift1 !== undefined ? shift1 : 0;
  const s2 = shift2 !== null && shift2 !== undefined ? shift2 : 0;
  const s3 = shift3 !== null && shift3 !== undefined ? shift3 : 0;

  return `${s1}, ${s2}, ${s3}`;
};

// Function to group data by day of week
const groupDataByDay = (mappedData) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const workingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const grouped = {};

  // Initialize all working days
  workingDays.forEach((day) => {
    grouped[day] = [];
  });

  mappedData.forEach((item) => {
    const date = new Date(item.date);
    const dayName = dayNames[date.getDay()];

    console.log(
      `📅 Processing item: ${item.prod_order}, Date: ${item.date}, Day: ${dayName}`
    );

    if (workingDays.includes(dayName)) {
      grouped[dayName].push({
        ...item,
        dayLabel: `${dayName} (${date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        })})`,
      });
    }
  });

  console.log("📊 Final grouped data:", grouped);
  return grouped;
};

// Function to get date range for week title
const getWeekDateRange = (apiData) => {
  if (!apiData.length) return "Loading...";

  const dates = apiData.map((item) => new Date(item.week_prod_date));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
};

const WeeklyPlanDisplay = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupedPlans, setGroupedPlans] = useState({});
  const [weekTitle, setWeekTitle] = useState("Loading...");
  const [editingRow, setEditingRow] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [matchingDieOptions, setMatchingDieOptions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [forgeLines, setForgeLines] = useState([]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const getAuthHeadersWithCSRF = async (method = "GET", contentType = true) => {
    const credentials = btoa("kalyaniadmin:kalyaniadmin@7001");
    console.log("📡 Fetching CSRF token with credentials:", credentials);

    // Step 1: Trigger cookie set
    await fetch("https://ktflceprd.kalyanicorp.com/internal/weekly_plan", {
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

  const containerStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropfilter: "blur(20px)",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    fontSize: "0.9rem",
  };

  const thStyle = {
    position: "sticky",
    left: 0,
    zindex: 5,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "1rem 0.75rem",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  const tdStyle = {
    padding: "1rem 0.75rem",
    borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
    background: "rgba(255, 255, 255, 0.8)",
    transition: "all 0.3s ease",
  };


  const fetchWeeklyPlan = async (start, end) => {
    try {
      setLoading(true);
      setError(null);

      const formatDate = (date) => {
        if (!date) {
          console.error("❌ Date is null/undefined:", date);
          return new Date().toISOString().split("T")[0] + "T00:00:00";
        }

        const dateObj = date instanceof Date ? date : new Date(date);

        if (isNaN(dateObj.getTime())) {
          console.error("❌ Invalid date:", date);
          return new Date().toISOString().split("T")[0] + "T00:00:00";
        }

        return dateObj.toISOString().split("T")[0] + "T00:00:00";
      };

      if (!start || !end) {
        console.error("❌ Start or end date is missing:", { start, end });
        throw new Error("Start and end dates are required");
      }

      const formattedStart = formatDate(start);
      const formattedEnd = formatDate(end);

      const query = `start_date=${formattedStart}&end_date=${formattedEnd}`;
      const apiUrl = `https://ktflceprd.kalyanicorp.com/internal/weekly_plan?${query}`;

      console.log("📡 API Call →", apiUrl);
      console.log("📅 Date Range:", formattedStart, "to", formattedEnd);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa("ktfladm:Ktfl_Admin@2024")}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error Response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("✅ API Response received:", data?.length || 0, "records");
      console.log("📊 Raw API Data:", data);

      // Process the data - remove duplicate filtering for now to see all data
      const mappedData = mapApiDataToComponentFormat(data);
      console.log("🔄 Mapped Data:", mappedData);

      const grouped = groupDataByDay(mappedData);
      console.log("📊 Grouped Data:", grouped);

      setGroupedPlans(grouped);
      setApiData(data);
      setWeekTitle(getWeekDateRange(data));
    } catch (err) {
      console.error("❌ Error fetching weekly plan:", err);
      setError(`Failed to load weekly plan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getMonday = (date) => {
    if (!date) {
      console.error("❌ getMonday: date is null/undefined");
      return new Date();
    }

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      console.error("❌ getMonday: invalid date:", date);
      return new Date();
    }

    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Sunday => previous Monday
    d.setDate(d.getDate() + diff);
    return d;
  };

  const handleWeekChange = (direction) => {
    try {
      // ✅ Ensure startDate is a valid Date object
      const currentStart =
        startDate instanceof Date ? startDate : new Date(startDate);

      if (isNaN(currentStart.getTime())) {
        console.error("❌ Invalid startDate:", startDate);
        // Reset to current week if date is invalid
        const today = new Date();
        const [monday, saturday] = getWeekRange(today);
        setStartDate(monday);
        setEndDate(saturday);
        fetchWeeklyPlan(monday, saturday);
        return;
      }

      const baseDate = new Date(currentStart);
      baseDate.setDate(baseDate.getDate() + direction * 7); // +7 days for next, -7 for prev

      const newStart = getMonday(baseDate);
      const newEnd = new Date(newStart);
      newEnd.setDate(newStart.getDate() + 5); // Monday + 5 = Saturday

      console.log("📅 Week navigation:", {
        direction,
        currentStart: currentStart.toISOString(),
        newStart: newStart.toISOString(),
        newEnd: newEnd.toISOString(),
      });

      setStartDate(newStart);
      setEndDate(newEnd);

      fetchWeeklyPlan(newStart, newEnd);
    } catch (error) {
      console.error("❌ Error in handleWeekChange:", error);
      setError(`Failed to change week: ${error.message}`);
    }
  };

  const getWeekRange = (date) => {
    if (!date) {
      console.error("❌ getWeekRange: date is null/undefined");
      const today = new Date();
      return [today, today];
    }

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      console.error("❌ getWeekRange: invalid date:", date);
      const today = new Date();
      return [today, today];
    }

    const day = d.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(d);
    monday.setDate(d.getDate() + diffToMonday);
    const saturday = new Date(monday);
    saturday.setDate(monday.getDate() + 5);
    return [monday, saturday];
  };

  useEffect(() => {
    const fetchForgeLines = async () => {
      try {
        const res = await fetch("https://ktflceprd.kalyanicorp.com/internal/forge_lines", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Basic ${btoa("ktfladm:Ktfl_Admin@2024")}`,
          },
        });

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setForgeLines(data[0].forge_lines || []);
          console.log("✅ Forge lines loaded:", data[0].forge_lines);
        }
      } catch (err) {
        console.error("❌ Failed to fetch forge lines:", err);
      }
    };

    try {
      const today = new Date();
      console.log("📅 Initializing with today:", today.toISOString());

      const [monday, saturday] = getWeekRange(today);
      console.log("📅 Initial week range:", {
        monday: monday.toISOString(),
        saturday: saturday.toISOString(),
      });

      setStartDate(monday);
      setEndDate(saturday);
      fetchWeeklyPlan(monday, saturday);
      fetchForgeLines(); // 👈 Add this call
    } catch (error) {
      console.error("Error in useEffect initialization:", error);
      setError(`Failed to initialize: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    const [monday, saturday] = getWeekRange(today);
    setStartDate(monday);
    setEndDate(saturday);
    fetchWeeklyPlan(monday, saturday);
  }, []);

  // Handle edit button click
  const handleEditClick = (dayName, planIndex, plan) => {
    const planDate = new Date(plan.date);
    const today = new Date();

    // Set time to 00:00:00 for accurate comparison
    planDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // ✅ If plan date is before today, don't allow editing
    if (planDate < today) {
      alert("⚠️ Previous week's plans cannot be edited!");
      return;
    }
    const rowKey = `${dayName}-${planIndex}`;
    setEditingRow(rowKey);
    setValidationErrors([]);

    const raw = plan.rawData || {};

    setEditFormData({
      prod_order: raw.main_prod_no || "",
      die_no: raw.week_die_no || "",
      plant_code: raw.plant_code || "",
      main_forge_press: raw.main_forge_press || "",
      forge_press: raw.main_forge_press || "",
      customer: raw.customer_name || "",
      shift1_qty: raw.shift1_qty || 0, // ✅ Fixed: These should show values now
      shift2_qty: raw.shift2_qty || 0,
      shift3_qty: raw.shift3_qty || 0,
      netWt: raw.week_net_tonn || 0,
      prod_tonn: calculateProdTonn(
        raw.shift1_qty || 0, // ✅ Calculate from actual API values
        raw.shift2_qty || 0,
        raw.shift3_qty || 0,
        raw.week_net_tonn || 0
      ),
      section: raw.week_section || "",
      rm_grade: raw.rm_grade || "",
      die_req: raw.dies_req || 0,
      rm_status: raw.rm_status || "",
      heat_code: raw.heat_code || "",
      remark: raw.remark || "",
    });
  };

  const handleFieldChange = (field, value) => {
    // 1. Update the field
    setEditFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // 2. Re-calculate prod_tonn if any shift changes
      if (["shift1_qty", "shift2_qty", "shift3_qty", "netWt"].includes(field)) {
        const shift1 =
          field === "shift1_qty"
            ? Number(value) || 0
            : Number(updated.shift1_qty) || 0;
        const shift2 =
          field === "shift2_qty"
            ? Number(value) || 0
            : Number(updated.shift2_qty) || 0;
        const shift3 =
          field === "shift3_qty"
            ? Number(value) || 0
            : Number(updated.shift3_qty) || 0;
        const netWt =
          field === "netWt" ? Number(value) || 0 : Number(updated.netWt) || 0;

        updated.prod_tonn = calculateProdTonn(shift1, shift2, shift3, netWt);
      }

      return updated;
    });

    // 3. Clear validation errors on any change
    if (validationErrors.length) setValidationErrors([]);
  };

  const renderWeekHeader = () => {
    const formatWeekDisplay = (start, end) => {
      try {
        if (!start || !end) return "Loading...";

        const startDate = start instanceof Date ? start : new Date(start);
        const endDate = end instanceof Date ? end : new Date(end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          return "Invalid Date Range";
        }

        const formatDate = (date) => {
          return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        };

        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
      } catch (error) {
        console.error("❌ Error formatting week display:", error);
        return "Error in Date Display";
      }
    };
  };

  // Handle save
  const handleSave = async (dayName, planIndex, originalPlan) => {
    try {
      setSaving(true);
      setMessage({ type: "", text: "" });
      setValidationErrors([]);

      // Validate form data
      const errors = validateFormData(editFormData);
      if (errors.length > 0) {
        setValidationErrors(errors);
        setSaving(false);
        return;
      }

      // Prepare data for API with proper data types
      // const updateData = {
      //   id: originalPlan.id,
      //   prod_order: safeParseString(editFormData.prod_order),
      //   die_no: safeParseString(editFormData.die_no),
      //   plant_code: safeParseInt(editFormData.plant_code, 0),
      //   main_forge_press: safeParseString(editFormData.main_forge_press),
      //   forge_press: safeParseString(editFormData.forge_press),
      //   customer: safeParseString(editFormData.customer),
      //   shift1_qty: safeParseInt(editFormData.shift1_qty, 0),
      //   shift2_qty: safeParseInt(editFormData.shift2_qty, 0),
      //   shift3_qty: safeParseInt(editFormData.shift3_qty, 0),
      //   prod_tonn: safeParseFloat(editFormData.prod_tonn, 0),
      //   section: safeParseInt(editFormData.section, 0),
      //   rm_grade: safeParseString(editFormData.rm_grade),
      //   die_req: safeParseInt(editFormData.die_req, 0),
      //   rm_status: safeParseString(editFormData.rm_status),
      //   heat_code: safeParseString(editFormData.heat_code),
      //   remark: safeParseString(editFormData.remark),
      // };

      const updateData = {
        main_prod_no: safeParseString(editFormData.prod_order),
        main_forge_press: safeParseString(
          editFormData.main_forge_press || editFormData.forge_press
        ),
        week_die_no: safeParseString(editFormData.die_no),
        week_net_tonn: safeParseFloat(editFormData.netWt),
        shift1_qty: safeParseInt(editFormData.shift1_qty),
        shift2_qty: safeParseInt(editFormData.shift2_qty),
        shift3_qty: safeParseInt(editFormData.shift3_qty),
        week_section: safeParseFloat(editFormData.section),
        rm_grade: safeParseString(editFormData.rm_grade),
        dies_req: safeParseInt(editFormData.die_req),
        rm_status: safeParseString(editFormData.rm_status),
        heat_code: safeParseString(editFormData.heat_code),
        remark: safeParseString(editFormData.remark),
        customer_name: safeParseString(editFormData.customer),
        plant_code: safeParseInt(editFormData.plant_code),
        week_prod_date: originalPlan.date, // 🔥 This is the date from the selected row
        old_prod_no: originalPlan.prod_order,
      };

      console.log("Sending data to API:", updateData);

      const options = await getAuthHeadersWithCSRF("PUT");

      // Make API call to update
      const response = await fetch(
        "https://ktflceprd.kalyanicorp.com/internal/weekly_plan",
        {
          ...options,
          method: "PUT",
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update: ${response.status} - ${errorText}`);
      }

      // ✅ FIX: Pass current startDate and endDate parameters
      await fetchWeeklyPlan(startDate, endDate);
      setEditingRow(null);
      setEditFormData({});
      setMessage({
        type: "success",
        text: "Plan updated successfully!",
      });

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    } catch (err) {
      console.error("Error updating plan:", err);
      setMessage({
        type: "error",
        text: `Failed to update plan: ${err.message}`,
      });

      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
    } finally {
      setSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingRow(null);
    setEditFormData({});
    setValidationErrors([]);
  };

  const editableFields = [
    "die_no",
    "main_forge_press",
    "customer",
    "prod_order",
    "heat_code",
    "remark",
    "shift1_qty", // ✅ These are editable
    "shift2_qty",
    "shift3_qty",
    "netWt",
  ];
  // useEffect(() => {
  //   const dieNo = editFormData.die_no;
  //   if (!dieNo || !dieNo.trim() || !editingRow) return;

  //   const fetchDieDetails = async () => {
  //     try {
  //       const res = await fetch(
  //         `https://ktflceprd.kalyanicorp.com/https://ktflceprd.kalyanicorp.com/internal/weekly_entry?die_no=${encodeURIComponent(
  //           dieNo
  //         )}`
  //       );
  //       const data = await res.json();
  //       if (!Array.isArray(data) || data.length === 0) return;

  //       const first = data[0];
  //       setEditFormData((prev) => ({
  //         ...prev,
  //         plant_code: first.plant_code ?? prev.plant_code,
  //         forge_press: first.main_forge_press ?? prev.forge_press,
  //         customer: first.customer_name ?? prev.customer,
  //         prod_order: first.main_prod_no ?? prev.prod_order,
  //         netWt: first.net_wt ?? prev.netWt,
  //         section: first.week_section ?? prev.section,
  //         rm_grade: first.rm_grade ?? prev.rm_grade,
  //         die_req: first.die_req ?? prev.die_req,
  //         rm_status: first.rm_status ?? prev.rm_status,
  //         heat_code: first.heat_code ?? prev.heat_code,
  //         remark: first.remark ?? prev.remark,
  //         prod_tonn: calculateProdTonn(
  //           prev.shift1_qty || 0,
  //           prev.shift2_qty || 0,
  //           prev.shift3_qty || 0,
  //           first.net_wt ?? prev.netWt
  //         ),
  //       }));
  //       setMatchingDieOptions(data.length > 1 ? data : []);
  //     } catch (e) {
  //       console.error("Die fetch error:", e);
  //       setMatchingDieOptions([]);
  //     }
  //   };

  //   fetchDieDetails();
  // }, [editFormData.die_no, editingRow]);

  // General field renderer for editable and static view

  useEffect(() => {
    const dieNo = editFormData.die_no;
    console.log("🔍 Die number changed:", dieNo);
    console.log("🔍 Current editing row:", editingRow);
    console.log("📝 Current editFormData:", editFormData);

    if (!dieNo || !dieNo.trim() || !editingRow) {
      console.log("❌ Skipping fetch - missing die_no or editingRow");
      return;
    }

    const fetchDieDetails = async () => {
      try {
        console.log("📡 Fetching die details for:", dieNo);

        const res = await fetch(
          `https://ktflceprd.kalyanicorp.com/internal/weekly_entry?die_no=${encodeURIComponent(
            dieNo
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${btoa("ktfladm:Ktfl_Admin@2024")}`,
            },
          }
        );
        const data = await res.json();
        console.log("✅ API Response received:", data);

        if (!Array.isArray(data) || data.length === 0) {
          console.log("❌ No data received from API");
          return;
        }

        const first = data[0];
        console.log("🎯 First item from API:", first);
        console.log("📝 Current form data before update:", editFormData);

        setEditFormData((prev) => {
          const updated = {
            ...prev,
            plant_code: first.plant_code ?? prev.plant_code,
            forge_press: first.forge_press ?? prev.forge_press, // Updated: API has forge_press not main_forge_press
            main_forge_press: first.forge_press ?? prev.main_forge_press, // Keep both for compatibility
            customer: first.customer ?? prev.customer, // Updated: API has customer not customer_name
            prod_order: first.prod_order ?? prev.prod_order, // Updated: API has prod_order not main_prod_no
            netWt: first.net_wt ?? prev.netWt,
            section: first.section ?? prev.section, // Updated: API has section not week_section
            rm_grade: first.rm_grade ?? prev.rm_grade,
            die_req: first.die_req ?? prev.die_req,
            rm_status: first.rm_status ?? prev.rm_status,
            heat_code: first.heat_code ?? prev.heat_code,
            remark: first.remark ?? prev.remark,
            prod_tonn: calculateProdTonn(
              prev.shift1_qty || 0,
              prev.shift2_qty || 0,
              prev.shift3_qty || 0,
              first.net_wt ?? prev.netWt
            ),
          };

          console.log("🔄 Updated form data:", updated);
          return updated;
        });

        setMatchingDieOptions(data.length > 1 ? data : []);
        console.log("✅ Form data updated successfully");
      } catch (e) {
        console.error("❌ Die fetch error:", e);
        setMatchingDieOptions([]);
      }
    };

    fetchDieDetails();
  }, [editFormData.die_no, editingRow]);

  const renderValue = (value, field, isEditing, rowKey) => {
    // const isEditableField = editableFields.includes(field);

    if (isEditing && editingRow === rowKey && editableFields.includes(field)) {
      const inputType = [
        "shift1_qty",
        "shift2_qty",
        "shift3_qty",
        "plant_code",
        "netWt",
      ].includes(field)
        ? "number"
        : "text";

      return (
        <input
          type={inputType}
          className="edit-input"
          value={editFormData[field] !== undefined ? editFormData[field] : ""}
          onChange={(e) => handleFieldChange(field, e.target.value)}
          placeholder={`Enter ${field}`}
          step={field === "netWt" ? "0.01" : "1"} // Allow decimals for netWt
        />
      );
    }

    // If value is null/undefined/empty, show N/A
    // 🔁 Pull from editFormData if editing
    if (isEditing && editingRow === rowKey) {
      const formValue = editFormData[field];
      if (formValue !== undefined && formValue !== null && formValue !== "") {
        return formValue.toString();
      }
    }

    // 👇 If nothing valid, show N/A
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === "N/A"
    ) {
      return <span className="na-value">N/A</span>;
    }

    // For numeric rounding fields like netWt, prodTonn
    if (["netWt", "prodTonn"].includes(field)) {
      const rounded = Math.round(Number(value));
      return isNaN(rounded) ? (
        <span className="na-value">N/A</span>
      ) : (
        rounded.toString()
      );
    }

    // Default text render
    return value.toString();
  };

  // Quantity field-specific rendering (like customer dropdown)
  const renderQuantityValue = (plan, isEditing, rowKey, field) => {
    const shouldRenderDropdown =
      isEditing &&
      editingRow === rowKey &&
      ((matchingDieOptions.length > 0 &&
        [
          "customer",
          "forge_press",
          "main_forge_press",
          "plant_code",
          "prod_order",
        ].includes(field)) ||
        (field === "main_forge_press" && forgeLines.length > 0));

    if (shouldRenderDropdown) {
      const labelMap = {
        customer: "Customer",
        forge_press: "Press",
        main_forge_press: "Press",
        plant_code: "Plant Code",
        prod_order: "Production Order",
      };

      // ✅ Render forge_lines dropdown if editing main_forge_press and forgeLines available
      if (
        isEditing &&
        editingRow === rowKey &&
        field === "main_forge_press" &&
        forgeLines.length > 0
      ) {
        // ✅ Include selected value even if not in forgeLines list
        const currentValue = editFormData[field];
        const dropdownOptions = forgeLines.includes(currentValue)
          ? forgeLines
          : [...forgeLines, currentValue]; // add selected value if missing

        return (
          <select
            className="edit-select"
            value={currentValue || ""}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          >
            <option value="">Select Press</option>
            {dropdownOptions.map((line, idx) => (
              <option key={idx} value={line}>
                {line}
              </option>
            ))}
          </select>
        );
      }

      const uniqueOptions = [
        ...new Set(
          matchingDieOptions.map((item) => {
            if (field === "prod_order") return item.prod_order;
            if (field === "forge_press" || field === "main_forge_press")
              return item.main_forge_press;
            if (field === "customer") return item.customer_name;
            return item[field];
          })
        ),
      ].filter(Boolean);

      return (
        <select
          className="edit-select"
          onChange={(e) => {
            const selectedValue = e.target.value;
            const matched = matchingDieOptions.find((item) => {
              if (field === "prod_order")
                return item.main_prod_no === selectedValue;
              if (field === "forge_press")
                return item.main_forge_press === selectedValue;
              if (field === "customer")
                return item.customer_name === selectedValue;
              return item[field] === selectedValue;
            });

            if (matched) {
              setEditFormData((prev) => ({
                ...prev,
                die_no: matched.week_die_no || "",
                plant_code: matched.plant_code || "",
                forge_press: matched.main_forge_press || "",
                main_forge_press: matched.main_forge_press || "",
                customer: matched.customer_name || "",
                prod_order: matched.main_prod_no || "",
                prod_tonn: matched.week_net_tonn || "",
                section: matched.week_section || "",
                rm_grade: matched.rm_grade || "",
                die_req: matched.dies_req || 0,
                rm_status: matched.rm_status || "",
                heat_code: matched.heat_code || "",
                remark: "",
              }));

              setMatchingDieOptions([]);
            }
          }}
          value={editFormData[field] || ""}
        >
          <option value="">Select {labelMap[field]}</option>
          {uniqueOptions.map((val, idx) => (
            <option key={idx} value={val}>
              {val}
            </option>
          ))}
        </select>
      );
    }

    // ✅ For shift fields & others: simple input (not dropdown)
    return isEditing && editingRow === rowKey ? (
      <input
        type={
          ["shift1_qty", "shift2_qty", "shift3_qty"].includes(field)
            ? "number"
            : "text"
        }
        className="edit-input"
        value={editFormData[field] || ""}
        onChange={(e) => handleFieldChange(field, e.target.value)}
        placeholder="Enter value"
      />
    ) : plan[field] !== undefined &&
      plan[field] !== null &&
      plan[field] !== "" ? (
      plan[field].toString()
    ) : (
      "N/A"
    );
  };

  // ✅ Correct – wrap in function
  const renderQtyCell = (plan, isEditing, rowKey) => {
    return renderValue(plan.qty, "qty", isEditing, rowKey);
  };

  // Updated renderTableRows function with better data handling
  const renderTableRows = () => {
    const workingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const rows = [];

    const highlightMatch = (text) => {
      if (!searchText || typeof text !== "string") return text;
      const regex = new RegExp(`(${searchText})`, "gi");
      const parts = text.split(regex);
      return parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : part
      );
    };

    const isRowMatching = (plan) => {
      if (!searchText) return true;
      const valuesToCheck = [
        plan.plantCode,
        plan.prod_order,
        plan.main_forge_press,
        plan.customer,
        plan.netWt,
        plan.dieNo,
        plan.shift1Qty,
        plan.shift2Qty,
        plan.shift3Qty,
        plan.prodTonn,
        plan.section,
        plan.grade,
        plan.dieRequired,
        plan.rmStatus,
        plan.heatCode,
        plan.remark,
      ];
      return valuesToCheck
        .join(" ")
        .toLowerCase()
        .includes(searchText.toLowerCase());
    };

    workingDays.forEach((dayName) => {
      const dayPlans = groupedPlans[dayName] || [];
      const filteredPlans = dayPlans.filter((plan) => isRowMatching(plan));

      console.log(`📊 ${dayName} plans:`, filteredPlans.length);

      if (filteredPlans.length === 0) return;

      filteredPlans.forEach((plan, planIndex) => {
        const rowKey = `${dayName}-${planIndex}`;
        const isEditing = editingRow === rowKey;

        rows.push(
          <tr key={rowKey} className={isEditing ? "editing-row" : ""}>
            {planIndex === 0 && (
              <td
                className="weekly-plan-td weekly-day-cell"
                rowSpan={filteredPlans.length}
              >
                {plan.dayLabel || dayName}
              </td>
            )}
            <td className="weekly-plan-td">
              {renderValue(plan.plantCode, "plant_code", isEditing, rowKey)}
            </td>
            <td className="weekly-plan-td max-ellipsis-90">
              {renderQuantityValue(plan, isEditing, rowKey, "prod_order")}
            </td>
            <td className="weekly-plan-td">
              {renderQuantityValue(plan, isEditing, rowKey, "main_forge_press")}
            </td>
            <td className="weekly-plan-td customer-cell">
              {renderQuantityValue(plan, isEditing, rowKey, "customer")}
            </td>

            <td className="weekly-plan-td">
              {renderQuantityValue(plan, isEditing, rowKey, "netWt")}
            </td>
            <td className="weekly-plan-td">
              {renderValue(plan.dieNo, "die_no", isEditing, rowKey)}
            </td>
            <td className="weekly-plan-td shift-cell">
              {isEditing ? (
                <div className="shift-edit-container">
                  <div className="shift-edit-item">
                    <label>S1:</label>
                    {renderQuantityValue(plan, isEditing, rowKey, "shift1_qty")}
                  </div>
                  <div className="shift-edit-item">
                    <label>S2:</label>
                    {renderQuantityValue(plan, isEditing, rowKey, "shift2_qty")}
                  </div>
                  <div className="shift-edit-item">
                    <label>S3:</label>
                    {renderQuantityValue(plan, isEditing, rowKey, "shift3_qty")}
                  </div>
                </div>
              ) : (
                `${plan.shift1Qty || 0}, ${plan.shift2Qty || 0}, ${
                  plan.shift3Qty || 0
                }`
              )}
            </td>
            <td className="weekly-plan-td">
              {renderValue(plan.prodTonn, "prod_tonn", isEditing, rowKey)}
            </td>
            <td className="weekly-plan-td">
              {renderValue(plan.section, "section", isEditing, rowKey)}
            </td>
            <td className="weekly-plan-td">
              {renderValue(plan.grade, "rm_grade", isEditing, rowKey)}
            </td>
            <td className="weekly-plan-td">
              {renderValue(plan.dieRequired, "die_req", isEditing, rowKey)}
            </td>
            <td className="weekly-plan-td">
              {renderValue(plan.rmStatus, "rm_status", isEditing, rowKey)}
            </td>
            <td className="weekly-plan-td">
              {renderValue(plan.heatCode, "heat_code", isEditing, rowKey)}
            </td>
            <td className="weekly-plan-td">
              {renderValue(plan.remark, "remark", isEditing, rowKey)}
            </td>
            <td className="weekly-plan-td action-cell">
              {isEditing ? (
                <div className="flex-gap-2">
                  <button
                    className="action-btn save-btn"
                    onClick={() => handleSave(dayName, planIndex, plan)}
                    disabled={saving}
                  >
                    {saving ? "..." : <Save size={10} />}
                  </button>

                  <button
                    className="action-btn cancel-btn"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    <X size={10} />
                  </button>
                </div>
              ) : (
                <button
                  className="action-btn"
                  onClick={() => handleEditClick(dayName, planIndex, plan)}
                >
                  <Edit size={12} />
                </button>
              )}
            </td>
          </tr>
        );
      });
    });

    return rows;
  };

  // Loading state
  if (loading) {
    return (
      <div style={containerStyle}>
        <div className="loading-state">
          <div className="large-icon mb-10">⏳</div>
          <h4>Loading Weekly Plan...</h4>
          <p>Fetching data from server</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <button
          onClick={() => handleWeekChange(-1)}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "50px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ← Previous Week
        </button>

        <h3 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#667eea" }}>
          Weekly Plan Preview - {weekTitle}
        </h3>

        <button
          onClick={() => handleWeekChange(1)}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "50px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Next Week →
        </button>
      </div>

      {renderWeekHeader()}
      {validationErrors.length > 0 && (
        <div className="validation-error">
          <strong>Validation Errors:</strong>
          <ul className="validation-list">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {message.text && (
        <div
          className={
            message.type === "success" ? "success-message" : "error-message"
          }
        >
          {message.text}
        </div>
      )}

      {Object.values(groupedPlans).flat().length > 0 ? (
        <div className="table-container">
          <div style={{ position: "relative", marginBottom: "2rem" }}>
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Day</th>
                  <th style={thStyle}>Plant Code</th>
                  <th style={thStyle}>Production Order No</th>
                  <th style={thStyle}>Press</th>
                  <th style={thStyle}>Customer</th>
                  <th style={thStyle}>Net Wt</th>
                  <th style={thStyle}>Die No</th>
                  <th style={thStyle}>Qty (S1, S2, S3)</th>
                  <th style={thStyle}>Prod Tonn</th>
                  <th style={thStyle}>Section</th>
                  <th style={thStyle}>Grade</th>
                  <th style={thStyle}>Die Required</th>
                  <th style={thStyle}>RM Status</th>
                  <th style={thStyle}>Heat Code</th>
                  <th style={thStyle}>Remark</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="no-plan-message">
          <p>No Plan Available for the selected date</p>
        </div>
      )}
    </div>
  );
};

export default WeeklyPlanDisplay;
