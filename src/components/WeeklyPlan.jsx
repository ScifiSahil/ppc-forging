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
  Mail,
} from "lucide-react";
import WeeklyPlanDisplay from "./WeeklyPlanDisplay";
import "./WeeklyPlanModal.css";
import SmartWeeklyPlanChatbot from "./SmartWeeklyPlanChatbot";
import axios from "axios";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const getAuthHeadersWithCSRF = async (method = "GET", contentType = true) => {
  const credentials = btoa("kalyaniadmin:kalyaniadmin@7001");

  // Step 1: Trigger cookie set
  await fetch("https://ktflceprd.kalyanicorp.com/internal/weekly_entry", {
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
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
        `https://ktflceprd.kalyanicorp.com/internal/weekly_entry?die_no=${dieNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa("kalyaniadmin:kalyaniadmin@7001")}`,
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
        "https://ktflceprd.kalyanicorp.com/internal/forge_lines",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa("kalyaniadmin:kalyaniadmin@7001")}`,
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
        "https://ktflceprd.kalyanicorp.com/internal/weekly_plan",
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

  getDieActualData: async (plantCode, dieNo) => {
    console.log("🔍 getDieActualData called with:", { plantCode, dieNo });

    try {
      // ✅ Construct URL with proper encoding
      const baseUrl = "https://ktflceprd.kalyanicorp.com/internal/kln_dms_dieactual";
      const params = new URLSearchParams({
        plant_code: plantCode,
        die_no: dieNo,
      });
      const fullUrl = `${baseUrl}?${params.toString()}`;

      console.log("📡 Making request to:", fullUrl);

      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa("kalyaniadmin:kalyaniadmin@7001")}`,
        },
      });

      console.log("📡 Response status:", response.status);
      console.log(
        "📡 Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error Response:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ API Response data:", data);
      console.log(
        "📊 Data type:",
        typeof data,
        "Is array:",
        Array.isArray(data)
      );

      // ✅ Handle different response formats
      if (Array.isArray(data)) {
        return data;
      } else if (data && data.data && Array.isArray(data.data)) {
        return data.data;
      } else if (data && typeof data === "object") {
        // If single object, wrap in array
        return [data];
      } else {
        console.warn("⚠️ Unexpected data format:", data);
        return [];
      }
    } catch (error) {
      console.error("❌ Error in getDieActualData:", error);
      throw error; // Re-throw to handle in calling function
    }
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

  // ✅ NEW: Create Production Order
  createProductionOrder: async (orderData) => {
    try {
      const authOptions = await getAuthHeadersWithCSRF("POST");
      const response = await fetch(
        "https://ktflceprd.kalyanicorp.com/internal/production_order",
        {
          method: "POST",
          ...authOptions,
          body: JSON.stringify({
            data: [orderData], // API expects array format
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error("❌ Create production order failed:", error);
      return { success: false, message: error.message };
    }
  },

  // ✅ NEW: Send Email API
  sendEmail: async () => {
    try {
      // Get authentication headers with CSRF token
      const authConfig = await getAuthHeadersWithCSRF("GET", false);

      const response = await fetch(
        "https://ktflceprd.kalyanicorp.com/internal/production_report",
        {
          method: "GET",
          ...authConfig, // Spread the headers and credentials
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Email API Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error("❌ Send email failed:", error);
      return { success: false, message: error.message };
    }
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
  // ✅ NEW: Month Report Button Style
  monthReportButton: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    backgroundImage: "linear-gradient(93deg, #764ba2 0%, #667eea 100%)", // Reverse gradient
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s ease-in-out",
  },

  // ✅ NEW: KPI Card Style
  kpiCard: {
    padding: "8px 12px",
    borderRadius: "6px",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    border: "1px solid #dee2e6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
    minWidth: "70px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },

  kpiDay: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#6c757d",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  kpiValue: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#2d3748",
  },

  kpiLabel: {
    fontSize: "8px",
    color: "#6c757d",
    textTransform: "uppercase",
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
    padding: "8px 16px", // ✅ Reduced padding
    border: "none",
    borderRadius: "6px", // ✅ Smaller radius
    backgroundImage: "linear-gradient(93deg, #43cea2 0%, #185a9d 100%)",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px", // ✅ Smaller gap
    fontSize: "12px", // ✅ Smaller font
    fontWeight: "600",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    whiteSpace: "nowrap",
  },
  // ✅ NEW: Email Button Style
  emailButton: {
    padding: "8px 16px", // ✅ Reduced
    border: "none",
    borderRadius: "6px",
    backgroundImage: "linear-gradient(93deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    whiteSpace: "nowrap",
  },

  monthReportButton: {
    padding: "8px 16px", // ✅ Reduced
    border: "none",
    borderRadius: "6px",
    backgroundImage: "linear-gradient(93deg, #f093fb 0%, #f5576c 100%)",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    textTransform: "uppercase",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    whiteSpace: "nowrap",
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
    padding: "0",
    borderRadius: "8px",
    width: "95%",
    maxWidth: "100vw",
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
    overflowY: "hidden",
    border: "1px solid #ddd",
    borderRadius: "4px",
    height: "100%",
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
    padding: "8px 4px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "11px",
    position: "sticky",
    top: 0,
    zIndex: 10,
    whiteSpace: "nowrap",
    minWidth: "80px",
    maxWidth: "120px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  modalTableCell: {
    border: "1px solid #dee2e6",
    padding: "4px 2px",
    verticalAlign: "middle",
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
    minHeight: "18px",
    boxSizing: "border-box",
  },
  compactSelect: {
    width: "100%",
    padding: "2px 3px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontSize: "9px",
    minHeight: "20px",
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

// const getFieldStyle = (record, fieldName) => {
//   const hasError = record.fieldErrors?.[fieldName];
//   return {
//     ...styles.compactInput,
//     borderRadius: "8px",
//     border: `2px solid ${hasError ? "#f56565" : "#cbd5e0"}`,
//     backgroundColor: hasError ? "#fed7d7" : "white",
//     padding: "8px 12px",
//     fontSize: "13px",
//     transition: "all 0.2s ease",
//     boxShadow: hasError ? "0 0 0 3px rgba(245, 101, 101, 0.2)" : "none",
//   };
// };

// const getSelectStyle = (record, fieldName) => {
//   const hasError = record.fieldErrors?.[fieldName];
//   return {
//     ...styles.compactSelect,
//     borderRadius: "8px",
//     border: `2px solid ${hasError ? "#f56565" : "#cbd5e0"}`,
//     backgroundColor: hasError ? "#fed7d7" : "white",
//     padding: "8px 12px",
//     fontSize: "13px",
//     transition: "all 0.2s ease",
//     boxShadow: hasError ? "0 0 0 3px rgba(245, 101, 101, 0.2)" : "none",
//   };
// };

// const getShiftInputStyle = (record, shiftName) => {
//   const hasError = record.fieldErrors?.[shiftName];
//   return {
//     ...styles.shiftInput,
//     borderRadius: "6px",
//     border: `1px solid ${hasError ? "#f56565" : "#cbd5e0"}`,
//     backgroundColor: hasError ? "#fed7d7" : "white",
//     padding: "6px 8px",
//     fontSize: "12px",
//     textAlign: "center",
//     transition: "all 0.2s ease",
//     boxShadow: hasError ? "0 0 0 2px rgba(245, 101, 101, 0.2)" : "none",
//   };
// };

const getConsistentInputStyle = () => ({
  width: "100%",
  padding: "6px 8px",
  border: "1px solid #cbd5e0",
  borderRadius: "6px",
  fontSize: "12px",
  backgroundColor: "white",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
  minHeight: "32px",
});

const getConsistentSelectStyle = () => ({
  width: "100%",
  padding: "6px 8px",
  border: "1px solid #cbd5e0",
  borderRadius: "6px",
  fontSize: "12px",
  backgroundColor: "white",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
  minHeight: "32px",
});

const WeeklyPlan = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  // 🔥 NEW: Daily Tonnage State
  const [dailyTonnage, setDailyTonnage] = useState({
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  });

  // 🔥 NEW: Callback to receive daily tonnage from WeeklyPlanDisplay
  const handleDailyTonnageUpdate = (totals) => {
    console.log("📊 Received daily tonnage:", totals);
    setDailyTonnage(totals);
  };
  const [showDieActualModal, setShowDieActualModal] = useState(false);
  const [dieActualData, setDieActualData] = useState([]);
  const [selectedDieInfo, setSelectedDieInfo] = useState({
    plantCode: "",
    dieNo: "",
  });
  const [loadingDieActual, setLoadingDieActual] = useState(false);
  const [modalWeekOffset, setModalWeekOffset] = useState(0);
  const [plans, setPlans] = useState({});
  const [dayWiseData, setDayWiseData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showManualEntryModal, setShowManualEntryModal] = useState(false);
  const [manualEntryData, setManualEntryData] = useState({
    order_id: "", // Production Order No (matches API format)
    customer: "", // Customer name
    amount: "", // Single quantity (not shift-wise)
    // Keep other fields for UI but don't send to production_order API
    plantCode: "",
    pressId: "",
    grade: "",
    section: "",
    netWt: "",
    dieRequired: "Yes",
    rmStatus: "Available",
    heatCode: "",
    remark: "",
  });
  const [currentManualRecord, setCurrentManualRecord] = useState({
    day: "",
    recordIndex: null,
  });

  // ✅ NEW: Send Email Handler
  const handleSendEmail = async () => {
    // Show confirmation alert
    const confirmed = window.confirm("Do you really want to send email?");

    if (!confirmed) {
      return; // Exit if user cancels
    }

    try {
      setLoading(true);

      // Prepare email data - you can customize this based on your requirements
      const emailData = {
        subject: `Weekly Production Plan - ${getWeekTitle(weekOffset)}`,
        body: `Weekly production plan for ${getWeekTitle(
          weekOffset
        )} has been prepared and is ready for review.`,
        recipients: ["manager@company.com", "production@company.com"], // Add actual email addresses
        week_offset: weekOffset,
        plan_data: dayWiseData,
      };

      const result = await apiService.sendEmail(emailData);

      if (result.success) {
        alert("✅ Email sent successfully!");
      } else {
        alert("❌ Failed to send email: " + result.message);
      }
    } catch (error) {
      console.error("❌ Send email error:", error);
      alert("❌ Error sending email: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Send Month Report Handler
  const handleSendMonthReport = async () => {
    // Show confirmation alert
    const confirmed = window.confirm(
      "Do you really want to send monthly report?"
    );

    if (!confirmed) {
      return; // Exit if user cancels
    }

    try {
      setLoading(true);

      // Call API for monthly report
      const authConfig = await getAuthHeadersWithCSRF("GET", false);

      const response = await fetch(
        "https://ktflceprd.kalyanicorp.com/internal/monthly_report", // ✅ NEW URL
        {
          method: "GET",
          ...authConfig,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Email API Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      alert("✅ Monthly report sent successfully!");
    } catch (error) {
      console.error("❌ Send monthly report failed:", error);
      alert("❌ Error sending monthly report: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  // ✅ UPDATED: Manual Entry Modal - Removed Plant Code Input
  const ManualEntryModal = () => (
    <div style={styles.modal}>
      <div style={{ ...styles.modalContent, maxWidth: "400px", width: "90%" }}>
        {/* Modal Header */}
        <div
          style={{
            ...styles.modalHeader,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: "12px 12px 0 0",
            padding: "12px 20px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
            Create New Production Order
          </h3>
          <button
            onClick={() => setShowManualEntryModal(false)}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "6px",
              color: "white",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {/* ✅ Die No - READ ONLY */}
          <div>
            <label
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Die No * (Auto-filled)
            </label>
            <input
              type="text"
              value={manualEntryData.die_no || ""}
              readOnly
              style={{
                ...getConsistentInputStyle(),
                backgroundColor: "#f7fafc",
                color: "#2d3748",
                cursor: "not-allowed",
                fontWeight: "600",
              }}
              placeholder="Die Number"
            />
          </div>

          {/* ✅ FIXED: Order Quantity */}
          <div>
            <label
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "4px",
                display: "block",
              }}
            >
              Order Quantity *
            </label>
            <input
              type="number"
              placeholder="Enter Order Quantity"
              value={manualEntryData.order_qty || ""}
              onChange={(e) => {
                // ✅ FIX: Directly update only order_qty field
                setManualEntryData((prev) => ({
                  ...prev,
                  order_qty: e.target.value,
                }));
              }}
              style={getConsistentInputStyle()}
              min="1"
              step="1"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            padding: "15px 20px",
            borderTop: "1px solid #e2e8f0",
            background: "#f8f9fa",
            borderRadius: "0 0 12px 12px",
          }}
        >
          <button
            onClick={() => setShowManualEntryModal(false)}
            style={{
              ...styles.button,
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleManualEntrySubmit}
            style={{
              ...styles.successButton,
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

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

    for (let i = 0; i < 7; i++) {
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
    const endDate = dates[6].fullDate;
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

  // 🔥 NEW: Handle Die Required click
  const handleDieRequiredClick = async (record) => {
    console.log("🔥 Die Required clicked for record:", record);

    // 1. ✅ Better validation with detailed logging
    if (!record.plantCode || !record.dieNo?.[0]) {
      console.error("❌ Missing required data:", {
        plantCode: record.plantCode,
        dieNo: record.dieNo,
        fullRecord: record,
      });
      alert("⚠️ Please select Plant Code and Die Number first!");
      return;
    }

    // 2. ✅ Set loading state and modal info
    const plantCode = record.plantCode.toString().trim();
    const dieNo = record.dieNo[0].toString().trim();

    console.log("📡 Making API call with:", { plantCode, dieNo });

    setSelectedDieInfo({
      plantCode: plantCode,
      dieNo: dieNo,
    });

    setLoadingDieActual(true);
    setShowDieActualModal(true);
    setDieActualData([]); // Clear previous data

    try {
      // 3. ✅ Enhanced API call with better error handling
      console.log("📡 Calling getDieActualData API...");
      const dieData = await apiService.getDieActualData(plantCode, dieNo);

      console.log("✅ API Response received:", dieData);
      console.log(
        "📊 Response type:",
        typeof dieData,
        "Length:",
        dieData?.length
      );

      // 4. ✅ Better data validation
      if (!dieData) {
        console.warn("⚠️ API returned null/undefined");
        setDieActualData([]);
        return;
      }

      if (!Array.isArray(dieData)) {
        console.warn("⚠️ API response is not an array:", dieData);
        setDieActualData([]);
        return;
      }

      if (dieData.length === 0) {
        console.warn("⚠️ API returned empty array");
        setDieActualData([]);
        return;
      }

      console.log("✅ Setting die actual data:", dieData);
      setDieActualData(dieData);
    } catch (error) {
      console.error("❌ Failed to fetch die actual data:", error);
      console.error("❌ Error details:", {
        message: error.message,
        stack: error.stack,
        plantCode,
        dieNo,
      });

      alert(`❌ Failed to fetch die actual data: ${error.message}`);
      setDieActualData([]);
    } finally {
      setLoadingDieActual(false);
    }
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

  const handleDieNoChange = async (day, recordIndex, value) => {
    // ✅ If die_no is removed/cleared, reset all autofilled fields
    if (!value || value.trim() === "") {
      console.log("🧹 Die No removed - clearing autofilled fields");

      setDayWiseData((prev) => ({
        ...prev,
        [day]: prev[day].map((record, idx) =>
          idx === recordIndex
            ? {
                ...record,
                // ✅ Clear die number
                dieNo: [value],

                // ✅ Reset error states
                dieNoError: false,
                dieNoErrorMessage: "",
                showCreateLink: false,

                // ✅ Clear ALL autofilled fields
                productionOrderNo: "",
                customer: "",
                grade: "",
                pressId: "",
                plantCode: "",
                section: "",
                netWt: "",
                dieRequired: "",
                rmStatus: "",

                // ✅ Clear all dropdown options
                customerOptions: [],
                pressOptions: [],
                gradeOptions: [],
                plantOptions: [],
                productionOrderOptions: [],
                dieResults: [],
                hasMultipleOptions: false,

                // ✅ Keep these fields (user might have manually entered)
                qty: record.qty || { shift1: "", shift2: "", shift3: "" },
                heatCode: record.heatCode || "",
                remark: record.remark || "",
                prodTonn: "", // Reset production tonnage
              }
            : record
        ),
      }));
      return;
    }

    // ✅ Rest of your existing API call logic remains same
    try {
      const results = await apiService.getKlnMasterDataByDie(value);

      if (!results || results.length === 0) {
        setDayWiseData((prev) => ({
          ...prev,
          [day]: prev[day].map((record, idx) =>
            idx === recordIndex
              ? {
                  ...record,
                  dieNo: [value],
                  dieNoError: true,
                  dieNoErrorMessage: `No data found for Die No. ${value}`,
                  showCreateLink: true,

                  // ✅ Clear fields on error too
                  productionOrderNo: "",
                  customer: "",
                  grade: "",
                  pressId: "",
                  plantCode: "",
                  section: "",
                  netWt: "",
                  dieRequired: "",
                  rmStatus: "",
                  customerOptions: [],
                  pressOptions: [],
                  gradeOptions: [],
                  plantOptions: [],
                  productionOrderOptions: [],
                  dieResults: [],
                  hasMultipleOptions: false,
                }
              : record
          ),
        }));
        return;
      }

      // ✅ Your existing logic for single/multiple results...
      const uniqueProductionOrders = [
        ...new Set(results.map((r) => r.prod_order)),
      ];
      const uniquePressIds = [...new Set(results.map((r) => r.forge_press))];
      const firstResult = results[0];
      const plantCodeValue =
        firstResult.plant_code ||
        firstResult.plantCode ||
        firstResult.plant ||
        firstResult.Plant_Code ||
        "";

      if (results.length === 1) {
        // Single result - auto-fill all fields
        setDayWiseData((prev) => ({
          ...prev,
          [day]: prev[day].map((record, idx) =>
            idx === recordIndex
              ? {
                  ...record,
                  dieNo: [value],
                  dieNoError: false,
                  dieNoErrorMessage: "",
                  showCreateLink: false,
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
                  hasMultipleOptions: false,
                  // ✅ Recalculate production tonnage
                  prodTonn: calculateProdTonn(
                    record.qty,
                    firstResult.net_wt || 0
                  ),
                }
              : record
          ),
        }));
      } else {
        // Multiple results - show dropdowns with first value auto-selected
        setDayWiseData((prev) => ({
          ...prev,
          [day]: prev[day].map((record, idx) =>
            idx === recordIndex
              ? {
                  ...record,
                  dieNo: [value],
                  dieNoError: false,
                  dieNoErrorMessage: "",
                  showCreateLink: false,
                  productionOrderNo: firstResult.prod_order || "",
                  pressId: firstResult.forge_press || "",
                  plantCode: plantCodeValue,
                  customer: firstResult.customer || "",
                  netWt: firstResult.net_wt || 0,
                  section: firstResult.section || "",
                  grade: firstResult.rm_grade || "N/A",
                  dieRequired: firstResult.die_req ? "Yes" : "No",
                  rmStatus: firstResult.rm_status || "No",
                  customerOptions: [...new Set(results.map((r) => r.customer))],
                  pressOptions: uniquePressIds,
                  gradeOptions: [...new Set(results.map((r) => r.rm_grade))],
                  plantOptions: [...new Set(results.map((r) => r.plant_code))],
                  productionOrderOptions: uniqueProductionOrders,
                  dieResults: results,
                  hasMultipleOptions: true,
                  // ✅ Recalculate production tonnage
                  prodTonn: calculateProdTonn(
                    record.qty,
                    firstResult.net_wt || 0
                  ),
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
                showCreateLink: true,

                // ✅ Clear fields on error
                productionOrderNo: "",
                customer: "",
                grade: "",
                pressId: "",
                plantCode: "",
                section: "",
                netWt: "",
                dieRequired: "",
                rmStatus: "",
                productionOrderOptions: [],
                dieResults: [],
              }
            : record
        ),
      }));
    }
  };
  // // Updated handleDieNoChange function
  // const handleDieNoChange = async (day, recordIndex, value) => {
  //   if (!value || value.trim() === "") {
  //     // Reset fields
  //     setDayWiseData((prev) => ({
  //       ...prev,
  //       [day]: prev[day].map((record, idx) =>
  //         idx === recordIndex
  //           ? {
  //               ...record,
  //               dieNo: [value],
  //               dieNoError: false,
  //               dieNoErrorMessage: "",
  //               showCreateLink: false, // ✅ NEW: Hide create link
  //               productionOrderNo: "",
  //               customer: "",
  //               grade: "",
  //               pressId: "",
  //               plantCode: "",
  //               section: "",
  //               netWt: "",
  //               dieRequired: "", // ✅ ADD THIS
  //               rmStatus: "", // ✅ ADD THIS
  //               customerOptions: [],
  //               pressOptions: [],
  //               gradeOptions: [],
  //               plantOptions: [],
  //               productionOrderOptions: [],
  //               dieResults: [],
  //               hasMultipleOptions: false,
  //             }
  //           : record
  //       ),
  //     }));
  //     return;
  //   }

  //   // ✅ REMOVED: 4 digit minimum check - now API call happens for any value
  //   try {
  //     const results = await apiService.getKlnMasterDataByDie(value);

  //     if (!results || results.length === 0) {
  //       // ✅ NEW: Show hyperlink instead of opening modal immediately
  //       setDayWiseData((prev) => ({
  //         ...prev,
  //         [day]: prev[day].map((record, idx) =>
  //           idx === recordIndex
  //             ? {
  //                 ...record,
  //                 dieNo: [value],
  //                 dieNoError: true,
  //                 dieNoErrorMessage: `No data found for Die No. ${value}`,
  //                 showCreateLink: true, // ✅ NEW: Show create production order link
  //                 productionOrderNo: "",
  //                 customer: "",
  //                 grade: "",
  //                 pressId: "",
  //                 plantCode: "",
  //                 section: "",
  //                 netWt: "",
  //                 customerOptions: [],
  //                 pressOptions: [],
  //                 gradeOptions: [],
  //                 plantOptions: [],
  //                 productionOrderOptions: [],
  //                 dieResults: [],
  //                 hasMultipleOptions: false,
  //               }
  //             : record
  //         ),
  //       }));
  //       return;
  //     }

  //     // Get unique production orders and press IDs
  //     const uniqueProductionOrders = [
  //       ...new Set(results.map((r) => r.prod_order)),
  //     ];
  //     const uniquePressIds = [...new Set(results.map((r) => r.forge_press))];

  //     // Always get the first result for auto-filling
  //     const firstResult = results[0];
  //     const plantCodeValue =
  //       firstResult.plant_code ||
  //       firstResult.plantCode ||
  //       firstResult.plant ||
  //       firstResult.Plant_Code ||
  //       "";

  //     if (results.length === 1) {
  //       // Single result - auto-fill all fields
  //       setDayWiseData((prev) => ({
  //         ...prev,
  //         [day]: prev[day].map((record, idx) =>
  //           idx === recordIndex
  //             ? {
  //                 ...record,
  //                 dieNo: [value],
  //                 dieNoError: false,
  //                 dieNoErrorMessage: "",
  //                 showCreateLink: false, // ✅ NEW: Hide create link
  //                 productionOrderNo: firstResult.prod_order || "",
  //                 plantCode: plantCodeValue,
  //                 pressId: firstResult.forge_press || "",
  //                 customer: firstResult.customer || "",
  //                 netWt: firstResult.net_wt || 0,
  //                 section: firstResult.section || "",
  //                 grade: firstResult.rm_grade || "N/A",
  //                 dieRequired: firstResult.die_req ? "Yes" : "No",
  //                 rmStatus: firstResult.rm_status || "No",
  //                 customerOptions: [],
  //                 pressOptions: [],
  //                 gradeOptions: [],
  //                 plantOptions: [],
  //                 productionOrderOptions: [],
  //                 dieResults: results,
  //                 hasMultipleOptions: false,
  //               }
  //             : record
  //         ),
  //       }));
  //     } else {
  //       // Multiple results - show dropdowns with first value auto-selected
  //       setDayWiseData((prev) => ({
  //         ...prev,
  //         [day]: prev[day].map((record, idx) =>
  //           idx === recordIndex
  //             ? {
  //                 ...record,
  //                 dieNo: [value],
  //                 dieNoError: false,
  //                 dieNoErrorMessage: "",
  //                 showCreateLink: false, // ✅ NEW: Hide create link
  //                 productionOrderNo: firstResult.prod_order || "",
  //                 pressId: firstResult.forge_press || "",
  //                 plantCode: plantCodeValue,
  //                 customer: firstResult.customer || "",
  //                 netWt: firstResult.net_wt || 0,
  //                 section: firstResult.section || "",
  //                 grade: firstResult.rm_grade || "N/A",
  //                 dieRequired: firstResult.die_req ? "Yes" : "No",
  //                 rmStatus: firstResult.rm_status || "No",
  //                 customerOptions: [...new Set(results.map((r) => r.customer))],
  //                 pressOptions: uniquePressIds,
  //                 gradeOptions: [...new Set(results.map((r) => r.rm_grade))],
  //                 plantOptions: [...new Set(results.map((r) => r.plant_code))],
  //                 productionOrderOptions: uniqueProductionOrders,
  //                 dieResults: results,
  //                 hasMultipleOptions: true,
  //               }
  //             : record
  //         ),
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("API error:", error);
  //     setDayWiseData((prev) => ({
  //       ...prev,
  //       [day]: prev[day].map((record, idx) =>
  //         idx === recordIndex
  //           ? {
  //               ...record,
  //               dieNo: [value],
  //               dieNoError: true,
  //               dieNoErrorMessage: "Error fetching die data",
  //               showCreateLink: true, // ✅ NEW: Show create link on API error too
  //               productionOrderOptions: [],
  //               dieResults: [],
  //             }
  //           : record
  //       ),
  //     }));
  //   }
  // };

  // ✅ NEW: Function to handle create production order link click
  const handleCreateProductionOrderClick = (day, recordIndex) => {
    const record = dayWiseData[day][recordIndex];

    // Pre-fill die number and plant code from the current record
    setManualEntryData({
      die_no: record.dieNo?.[0] || "",
      plant_code: record.plantCode || "", // Get plant code from main record
      order_qty: "",
    });

    setCurrentManualRecord({ day, recordIndex });
    setShowManualEntryModal(true);
  };

  // 🔥 UPDATED handleDieNoChange function
  //   const handleDieNoChange = async (day, recordIndex, value) => {
  //     if (!value || value.trim() === "") {
  //       // Reset fields
  //       setDayWiseData((prev) => ({
  //         ...prev,
  //         [day]: prev[day].map((record, idx) =>
  //           idx === recordIndex
  //             ? {
  //                 ...record,
  //                 dieNo: [value],
  //                 dieNoError: false,
  //                 dieNoErrorMessage: "",
  //                 showCreateLink: false,
  //                 productionOrderNo: "",
  //                 customer: "",
  //                 grade: "",
  //                 pressId: "",
  //                 plantCode: "",
  //                 section: "",
  //                 netWt: "",
  //                 customerOptions: [],
  //                 pressOptions: [],
  //                 gradeOptions: [],
  //                 plantOptions: [],
  //                 productionOrderOptions: [],
  //                 dieResults: [],
  //                 hasMultipleOptions: false, // ✅ Reset on error
  //               }
  //             : record
  //         ),
  //       }));
  //       return;
  //     }

  //     try {
  //       const results = await apiService.getKlnMasterDataByDie(value);

  //       if (!results || results.length === 0) {
  //         // No matching die number
  //         setShowManualEntryModal(true); // ✅ Manual Entry Modal khulega
  //         setCurrentManualRecord({ day, recordIndex }); // ✅ Track karega kaha insert karna hai
  //         const confirmCreate = window.confirm(
  //           `No Production Order is available for this Die No. (${value}).
  // Do you want to create one?
  // `
  //         );

  //         if (confirmCreate) {
  //           setShowManualEntryModal(true); // ✅ Manual Entry Modal khulega
  //           setCurrentManualRecord({ day, recordIndex });
  //         }

  //         setDayWiseData((prev) => ({
  //           ...prev,
  //           [day]: prev[day].map((record, idx) =>
  //             idx === recordIndex
  //               ? {
  //                   ...record,
  //                   dieNo: [value],
  //                   dieNoError: true,
  //                   dieNoErrorMessage: `No data found for Die No. ${value}`,
  //                   productionOrderNo: "",
  //                   customer: "",
  //                   grade: "",
  //                   pressId: "",
  //                   plantCode: "",
  //                   section: "",
  //                   netWt: "",
  //                   customerOptions: [],
  //                   pressOptions: [],
  //                   gradeOptions: [],
  //                   plantOptions: [],
  //                   productionOrderOptions: [],
  //                   dieResults: [],
  //                   hasMultipleOptions: false, // ✅ Reset flag
  //                   hasMultipleOptions: false, // ✅ Reset flag
  //                 }
  //               : record
  //           ),
  //         }));
  //         return;
  //       }

  //       // Get unique production orders and press IDs
  //       const uniqueProductionOrders = [
  //         ...new Set(results.map((r) => r.prod_order)),
  //       ];
  //       const uniquePressIds = [...new Set(results.map((r) => r.forge_press))];

  //       // 🔥 NEW: Always get the first result for auto-filling
  //       const firstResult = results[0];
  //       const plantCodeValue =
  //         firstResult.plant_code ||
  //         firstResult.plantCode ||
  //         firstResult.plant ||
  //         firstResult.Plant_Code ||
  //         "";

  //       if (results.length === 1) {
  //         // Single result - auto-fill all fields (existing logic)
  //         setDayWiseData((prev) => ({
  //           ...prev,
  //           [day]: prev[day].map((record, idx) =>
  //             idx === recordIndex
  //               ? {
  //                   ...record,
  //                   dieNo: [value],
  //                   dieNoError: false,
  //                   dieNoErrorMessage: "",
  //                   productionOrderNo: firstResult.prod_order || "",
  //                   plantCode: plantCodeValue,
  //                   pressId: firstResult.forge_press || "",
  //                   customer: firstResult.customer || "",
  //                   netWt: firstResult.net_wt || 0,
  //                   section: firstResult.section || "",
  //                   grade: firstResult.rm_grade || "N/A",
  //                   dieRequired: firstResult.die_req ? "Yes" : "No",
  //                   rmStatus: firstResult.rm_status || "No",
  //                   customerOptions: [],
  //                   pressOptions: [],
  //                   gradeOptions: [],
  //                   plantOptions: [],
  //                   productionOrderOptions: [],
  //                   dieResults: results,
  //                   hasMultipleOptions: false,
  //                 }
  //               : record
  //           ),
  //         }));
  //       } else {
  //         // 🔥 UPDATED: Multiple results - show dropdowns with first value auto-selected
  //         setDayWiseData((prev) => ({
  //           ...prev,
  //           [day]: prev[day].map((record, idx) =>
  //             idx === recordIndex
  //               ? {
  //                   ...record,
  //                   dieNo: [value],
  //                   dieNoError: false,
  //                   dieNoErrorMessage: "",
  //                   // 🔥 AUTO-SELECT FIRST VALUES (but keep dropdowns enabled)
  //                   productionOrderNo: firstResult.prod_order || "", // ✅ Auto-select first production order
  //                   pressId: firstResult.forge_press || "", // ✅ Auto-select first press ID
  //                   plantCode: plantCodeValue,
  //                   customer: firstResult.customer || "",
  //                   netWt: firstResult.net_wt || 0,
  //                   section: firstResult.section || "",
  //                   grade: firstResult.rm_grade || "N/A",
  //                   dieRequired: firstResult.die_req ? "Yes" : "No",
  //                   rmStatus: firstResult.rm_status || "No",
  //                   // ✅ IMPORTANT: Provide ALL options for dropdowns so user can change
  //                   customerOptions: [...new Set(results.map((r) => r.customer))],
  //                   pressOptions: uniquePressIds, // ✅ All available press options
  //                   gradeOptions: [...new Set(results.map((r) => r.rm_grade))],
  //                   plantOptions: [...new Set(results.map((r) => r.plant_code))],
  //                   productionOrderOptions: uniqueProductionOrders, // ✅ All available production orders
  //                   dieResults: results,
  //                   // 🔥 NEW: Flag to indicate this record has multiple options available
  //                   hasMultipleOptions: true,
  //                 }
  //               : record
  //           ),
  //         }));
  //       }
  //     } catch (error) {
  //       console.error("API error:", error);
  //       setDayWiseData((prev) => ({
  //         ...prev,
  //         [day]: prev[day].map((record, idx) =>
  //           idx === recordIndex
  //             ? {
  //                 ...record,
  //                 dieNo: [value],
  //                 dieNoError: true,
  //                 dieNoErrorMessage: "Error fetching die data",
  //                 productionOrderOptions: [],
  //                 dieResults: [],
  //               }
  //             : record
  //         ),
  //       }));
  //     }
  //   };

  const handleManualEntrySubmit = async () => {
    try {
      const payload = {
        die_no: manualEntryData.die_no,
        order_qty: Number(manualEntryData.order_qty),
      };

      console.log("📦 Sending payload:", payload);

      const response = await axios.post(
        "https://ktflceprd.kalyanicorp.com/internal/production_order",
        payload
      );

      // ✅ Check if backend returned an error in the response
      if (response.data && response.data.error) {
        alert("❌ Error: " + response.data.error);
        return;
      }

      // ✅ Success case
      alert("✅ Production order created successfully!");
      setShowManualEntryModal(false);
      setManualEntryData({ plant_code: "", die_no: "", order_qty: "" });
    } catch (error) {
      console.error("❌ Error creating production order:", error);

      // ✅ Extract backend error message
      let errorMessage = "Failed to create production order.";

      if (error.response && error.response.data) {
        // Backend ne error field return kiya hai
        if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
        // Ya phir string format mein error aaya
        else if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        }
      }
      // Network error ya generic error
      else if (error.message) {
        errorMessage = error.message;
      }

      alert("❌ Error: " + errorMessage);
    }
  };

  // const handleManualEntrySubmit = async () => {
  //   try {
  //     const payload = {
  //       prod_order: manualEntryData.productionOrderNo,
  //       plant_code: parseInt(manualEntryData.plantCode),
  //       die_no:
  //         dayWiseData[currentManualRecord.day][currentManualRecord.recordIndex]
  //           .dieNo[0],
  //       shift1_qty: parseInt(manualEntryData.qty.shift1 || 0),
  //       shift2_qty: parseInt(manualEntryData.qty.shift2 || 0),
  //       shift3_qty: parseInt(manualEntryData.qty.shift3 || 0),
  //     };

  //     const authOptions = await getAuthHeadersWithCSRF("POST");
  //     const response = await fetch(
  //       "https://ktflceprd.kalyanicorp.com/internal/weekly_plan",
  //       {
  //         method: "POST",
  //         ...authOptions,
  //         body: JSON.stringify([payload]), // API bulk format ke liye array bhejna
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(await response.text());
  //     }

  //     alert("✅ Manual entry saved successfully!");
  //     setShowManualEntryModal(false);
  //     setManualEntryData({
  //       productionOrderNo: "",
  //       plantCode: "",
  //       qty: "",
  //     });
  //   } catch (error) {
  //     alert("❌ Failed to save manual entry: " + error.message);
  //   }
  // };

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
      let hasValidData = false; // ✅ Track if at least one complete record exists
      const incompleteRecords = []; // ✅ Track incomplete records for highlighting

      // ✅ First pass: Reset all error highlights
      setDayWiseData((prev) => {
        const resetData = { ...prev };
        Object.keys(resetData).forEach((day) => {
          resetData[day] = resetData[day].map((record) => ({
            ...record,
            fieldErrors: {}, // Reset field errors
          }));
        });
        return resetData;
      });

      for (const [day, records] of Object.entries(dayWiseData)) {
        for (let recordIndex = 0; recordIndex < records.length; recordIndex++) {
          const rec = records[recordIndex];
          const qty = rec.qty || {};

          // ✅ Check if this record has ANY data filled
          const hasAnyData =
            rec.productionOrderNo?.trim() ||
            rec.pressId?.trim() ||
            rec.dieNo?.[0]?.trim() ||
            rec.customer?.trim() ||
            rec.plantCode?.toString().trim() ||
            qty.shift1?.toString().trim() ||
            qty.shift2?.toString().trim() ||
            qty.shift3?.toString().trim() ||
            rec.heatCode?.trim() ||
            rec.remark?.trim();

          // ✅ Skip completely empty records
          if (!hasAnyData) {
            continue;
          }

          // ✅ If record has some data, validate all required fields
          const fieldErrors = {};
          let isIncomplete = false;

          // Check required fields
          if (!rec.productionOrderNo?.trim()) {
            fieldErrors.productionOrderNo = true;
            isIncomplete = true;
          }
          if (!rec.pressId?.trim()) {
            fieldErrors.pressId = true;
            isIncomplete = true;
          }
          if (!rec.dieNo?.[0]?.trim()) {
            fieldErrors.dieNo = true;
            isIncomplete = true;
          }
          if (!rec.customer?.trim()) {
            fieldErrors.customer = true;
            isIncomplete = true;
          }
          if (!rec.plantCode?.toString().trim()) {
            fieldErrors.plantCode = true;
            isIncomplete = true;
          }
          if (!qty.shift1?.toString().trim()) {
            fieldErrors.shift1 = true;
            isIncomplete = true;
          }
          if (!qty.shift2?.toString().trim()) {
            fieldErrors.shift2 = true;
            isIncomplete = true;
          }
          if (!qty.shift3?.toString().trim()) {
            fieldErrors.shift3 = true;
            isIncomplete = true;
          }
          if (rec.section?.toString().trim() === "") {
            fieldErrors.section = true;
            isIncomplete = true;
          }
          if (rec.grade?.toString().trim() === "") {
            fieldErrors.grade = true;
            isIncomplete = true;
          }
          if (!rec.dieRequired?.toString().trim()) {
            fieldErrors.dieRequired = true;
            isIncomplete = true;
          }
          if (!rec.rmStatus?.toString().trim()) {
            fieldErrors.rmStatus = true;
            isIncomplete = true;
          }

          if (isIncomplete) {
            incompleteRecords.push({
              day,
              recordIndex,
              fieldErrors,
            });
          } else {
            // ✅ Record is complete - add to validated plans
            hasValidData = true;

            const dateParts = rec.date.split("/");
            const weekDateStr = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]} 00:00:00`;

            validatedPlans.push({
              week_prod_date: weekDateStr,
              prod_order: rec.productionOrderNo,
              forge_press: rec.pressId,
              heat_code: rec.heatCode || "None",
              shift1_qty: parseInt(qty.shift1),
              shift2_qty: parseInt(qty.shift2),
              shift3_qty: parseInt(qty.shift3),
              rm_status: rec.rmStatus,
              prod_tonn: parseFloat(rec.prodTonn) || 0,
              remark: rec.remark || "None",
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
      }

      // ✅ If there are incomplete records, highlight them and show error
      if (incompleteRecords.length > 0) {
        // Highlight incomplete fields
        setDayWiseData((prev) => {
          const updatedData = { ...prev };
          incompleteRecords.forEach(({ day, recordIndex, fieldErrors }) => {
            if (updatedData[day] && updatedData[day][recordIndex]) {
              updatedData[day][recordIndex] = {
                ...updatedData[day][recordIndex],
                fieldErrors,
              };
            }
          });
          return updatedData;
        });

        alert("⚠️ Please fill all highlighted fields before saving the plan.");
        setLoading(false);
        return;
      }

      // ✅ Check if at least one complete record exists
      if (!hasValidData) {
        alert("⚠️ Please fill at least one complete record to save the plan.");
        setLoading(false);
        return;
      }

      const payload = validatedPlans;
      console.log("📦 Final Payload Being Sent:", payload);

      // ✅ API call remains the same
      const authOptions = await getAuthHeadersWithCSRF("POST");
      const response = await fetch(
        "https://ktflceprd.kalyanicorp.com/internal/weekly_plan",
        {
          method: "POST",
          ...authOptions,
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg);
      }

      alert("✅ Plan submitted successfully!");
      setShowModal(false);
      setDayWiseData({});
      setModalWeekOffset(weekOffset);
    } catch (error) {
      console.error("❌ Save plan failed:", error);
      alert("❌ Error saving plan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleSavePlan = async () => {
  //   setLoading(true);

  //   try {
  //     const validatedPlans = [];
  //     const allProdOrders = new Set();
  //     let hasValidData = false; // ✅ Track if at least one complete record exists
  //     const incompleteRecords = []; // ✅ Track incomplete records for highlighting

  //     for (const [day, records] of Object.entries(dayWiseData)) {
  //       for (const rec of records) {
  //         const qty = rec.qty || {};

  //         const isAnyFieldEmpty =
  //           !rec.productionOrderNo ||
  //           !rec.pressId ||
  //           !rec.dieRequired ||
  //           !rec.rmStatus ||
  //           !rec.dieNo?.[0] ||
  //           !rec.customer ||
  //           rec.section === "" ||
  //           rec.grade === "" ||
  //           rec.plantCode === "" ||
  //           qty.shift1 === "" ||
  //           qty.shift2 === "" ||
  //           qty.shift3 === "";

  //         if (isAnyFieldEmpty) {
  //           alert("⚠️ Please fill all fields before saving the plan.");
  //           setLoading(false);
  //           return;
  //         }

  //         // 🚨 Check for duplicate Production Order No.
  //         // if (allProdOrders.has(rec.productionOrderNo)) {
  //         //   alert(
  //         //     `⚠️ Duplicate Production Order "${rec.productionOrderNo}" found!`
  //         //   );
  //         //   setLoading(false);
  //         //   return;
  //         // }
  //         // allProdOrders.add(rec.productionOrderNo);

  //         // ✅ Convert record.date ("16/07/2025") → "16.07.2025 00:00:00"
  //         const dateParts = rec.date.split("/");
  //         const weekDateStr = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]} 00:00:00`;

  //         validatedPlans.push({
  //           week_prod_date: weekDateStr,
  //           prod_order: rec.productionOrderNo,
  //           forge_press: rec.pressId,
  //           heat_code: rec.heatCode,
  //           shift1_qty: parseInt(qty.shift1),
  //           shift2_qty: parseInt(qty.shift2),
  //           shift3_qty: parseInt(qty.shift3),

  //           rm_status: rec.rmStatus,
  //           prod_tonn: parseFloat(rec.prodTonn) || 0,
  //           remark: rec.remark,
  //           die_no: rec.dieNo[0],
  //           customer: rec.customer,
  //           section: parseInt(rec.section),
  //           rm_grade: rec.grade === "N/A" ? "" : rec.grade,
  //           die_req:
  //             rec.dieRequired === "N/A" || rec.dieRequired === "No" ? 0 : 1,

  //           plant_code: parseInt(rec.plantCode),
  //         });
  //       }
  //     }

  //     const payload = validatedPlans;

  //     console.log("📦 Final Payload Being Sent:", payload);

  //     // ✅ FIXED: Use getAuthHeadersWithCSRF properly
  //     const authOptions = await getAuthHeadersWithCSRF("POST");

  //     const response = await fetch(
  //       "https://ktflceprd.kalyanicorp.com/internal/weekly_plan",
  //       {
  //         method: "POST",
  //         ...authOptions, // This includes headers with CSRF token and credentials
  //         body: JSON.stringify(payload),
  //       }
  //     );
  //     if (!response.ok) {
  //       const errMsg = await response.text();
  //       throw new Error(errMsg);
  //     }

  //     alert("✅ Plan submitted successfully!");
  //     setShowModal(false);
  //     setDayWiseData({}); // Clear modal data
  //     setModalWeekOffset(weekOffset); // Reset modal week offset
  //   } catch (error) {
  //     console.error("❌ Save plan failed:", error);
  //     alert("❌ Error saving plan: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
      {/* Header */}
      <div
        style={{
          ...styles.header,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
          padding: "15px",
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Left Side - Action Buttons */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={openModal} style={styles.primaryButton}>
            <Plus size={14} /> Enter Plan
          </button>
          <button
            onClick={handleSendEmail}
            style={styles.emailButton}
            disabled={loading}
          >
            <Mail size={14} /> {loading ? "Sending..." : "Send Week"}
          </button>
          <button
            onClick={handleSendMonthReport}
            style={styles.monthReportButton}
            disabled={loading}
          >
            <Mail size={14} /> {loading ? "Sending..." : "Send Month"}
          </button>
        </div>

        {/* Right Side - Day-wise KPI Cards */}
        {/* <div
          style={{
            display: "flex",

            gap: "8px",
            flexWrap: "wrap",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          {getWeekDates(weekOffset).map(({ dayName, date }) => {
            // Calculate total tonnage for this day
            const dayPlans = plans[dayName] || [];
            const totalTonnage = dayPlans.reduce((sum, plan) => {
              return sum + (parseFloat(plan.prodTonn) || 0);
            }, 0);

            return (
              <div key={dayName} style={styles.kpiCard}>
                <div style={styles.kpiDay}>{dayName}</div>
                <div style={styles.kpiValue}>{totalTonnage.toFixed(1)}</div>
                <div style={styles.kpiLabel}>Tons</div>
              </div>
            );
          })}
        </div> */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dayName) => (
            <div key={dayName} style={styles.kpiCard}>
              <div style={styles.kpiDay}>{dayName}</div>
              <div style={styles.kpiValue}>
                {dailyTonnage[dayName].toFixed(1)}
              </div>
              <div style={styles.kpiLabel}>Tons</div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div
          style={{
            ...styles.modal,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(8px)",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <div
            style={{
              ...styles.modalContent,
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                ...styles.modalHeader,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: "12px 12px 0 0",
                padding: "12px 20px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                flexShrink: 0,
                minHeight: "50px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Weekly Plan Entry
              </h3>
              <button
                onClick={closeModal}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                  borderRadius: "6px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  minWidth: "28px",
                  minHeight: "28px",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Week Navigation */}
            <div
              style={{
                ...styles.weekNav,
                padding: "8px 16px",
                background: "#f8f9fa",
                borderBottom: "1px solid #e2e8f0",
                flexShrink: 0,
                minHeight: "45px",
              }}
            >
              <button
                onClick={() => handleModalWeekChange(modalWeekOffset - 1)}
                disabled={modalWeekOffset <= 0} // ✅ Previous week disable करने के लिए
                style={{
                  ...styles.button,
                  background:
                    modalWeekOffset <= 0
                      ? "linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)" // Disabled background
                      : "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)", // Normal background
                  fontSize: window.innerWidth >= 768 ? "14px" : "11px",
                  border: "1px solid rgba(102, 126, 234, 0.2)",
                  borderRadius: "10px",
                  padding: "10px 16px",
                  color: modalWeekOffset <= 0 ? "#a0aec0" : "#667eea", // Disabled color
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                  boxShadow:
                    modalWeekOffset <= 0
                      ? "none"
                      : "0 2px 4px rgba(0, 0, 0, 0.05)",
                  cursor: modalWeekOffset <= 0 ? "not-allowed" : "pointer", // Disabled cursor
                  opacity: modalWeekOffset <= 0 ? 0.6 : 1, // Disabled opacity
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
                  fontWeight: "700",
                  color: "#2d3748",
                  textAlign: "center",
                  flex: "1",
                  minWidth: "120px",
                  padding: "0 16px",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {getWeekTitle(modalWeekOffset)}
                </div>
                <div
                  style={{
                    fontSize: window.innerWidth >= 768 ? "14px" : "10px",
                    color: "#718096",
                    marginTop: "4px",
                    fontWeight: "500",
                  }}
                >
                  {getWeekStatus(modalWeekOffset)}
                </div>
              </div>
              <button
                onClick={() => handleModalWeekChange(modalWeekOffset + 1)}
                style={{
                  ...styles.button,
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  fontSize: window.innerWidth >= 768 ? "14px" : "11px",
                  border: "1px solid rgba(102, 126, 234, 0.2)",
                  borderRadius: "10px",
                  padding: "10px 16px",
                  color: "#667eea",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
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
            <div
              style={{
                ...styles.modalTableWrapper,
                background: "white",
                borderRadius: "0",
                overflowY: "auto",
                overflowX: "auto",
                flex: 1,
                maxHeight: "calc(80vh - 160px)",
              }}
            >
              <table
                style={{
                  ...styles.modalTable,
                  borderCollapse: "separate",
                  borderSpacing: 0,
                }}
              >
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                  }}
                >
                  <tr>
                    <th
                      style={{
                        ...styles.modalTableHeader,
                        ...styles.dayCell,
                        background:
                          "linear-gradient(135deg, #4a5568 0%, #2d3748 100%)",
                        color: "white",
                        textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                        borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      Day & Date
                    </th>
                    {Object.keys(FIELD_LABELS).map((field, index) => (
                      <th
                        key={field}
                        style={{
                          ...styles.modalTableHeader,
                          background:
                            "linear-gradient(135deg, #4a5568 0%, #2d3748 100%)",
                          color: "white",
                          textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                          borderRight:
                            index < Object.keys(FIELD_LABELS).length - 1
                              ? "1px solid rgba(255, 255, 255, 0.1)"
                              : "none",
                        }}
                      >
                        {window.innerWidth >= 768
                          ? FIELD_LABELS[field]
                          : FIELD_LABELS[field].length > 10
                          ? FIELD_LABELS[field].substring(0, 10) + "..."
                          : FIELD_LABELS[field]}
                      </th>
                    ))}
                    <th
                      style={{
                        ...styles.modalTableHeader,
                        background:
                          "linear-gradient(135deg, #4a5568 0%, #2d3748 100%)",
                        color: "white",
                        textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getWeekDates(modalWeekOffset).map(
                    ({ dayName, date }, dayIndex) =>
                      dayWiseData[dayName]?.map((record, recordIndex) => (
                        <tr
                          key={`${dayName}-${recordIndex}`}
                          style={{
                            background:
                              dayIndex % 2 === 0 ? "#ffffff" : "#f8f9fa",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              background: "#e3f2fd",
                              transform: "translateY(-1px)",
                            },
                          }}
                        >
                          <td
                            style={{
                              ...styles.modalTableCell,
                              ...styles.dayCell,
                              background:
                                dayIndex % 2 === 0
                                  ? "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
                                  : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                              borderRight: "2px solid #e9ecef",
                              fontWeight: "600",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: "700",
                                color: "#2d3748",
                                fontSize:
                                  window.innerWidth >= 768 ? "14px" : "12px",
                              }}
                            >
                              {dayName}
                            </div>
                            <div
                              style={{
                                fontSize:
                                  window.innerWidth >= 768 ? "11px" : "9px",
                                color: "#718096",
                                marginTop: "2px",
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
                                  color: "#a0aec0",
                                  background: "#667eea",
                                  color: "white",
                                  padding: "2px 6px",
                                  borderRadius: "10px",
                                  display: "inline-block",
                                  marginTop: "4px",
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
                              style={{
                                ...styles.modalTableCell,
                                borderRight: "1px solid #e2e8f0",
                              }}
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
                                    style={getConsistentInputStyle()}
                                    placeholder={
                                      window.innerWidth >= 768
                                        ? "Die No"
                                        : "Die"
                                    }
                                  />
                                  {record.dieNoError && (
                                    <div
                                      style={{
                                        color: "#f56565",
                                        fontSize:
                                          window.innerWidth >= 768
                                            ? "10px"
                                            : "8px",
                                        marginTop: "4px",
                                        fontWeight: "500",
                                      }}
                                    >
                                      {window.innerWidth >= 768
                                        ? record.dieNoErrorMessage
                                        : "Error"}
                                    </div>
                                  )}
                                  {/* ✅ NEW: Show create production order hyperlink */}
                                  {record.showCreateLink && (
                                    <div style={{ marginTop: "6px" }}>
                                      <button
                                        onClick={() =>
                                          handleCreateProductionOrderClick(
                                            dayName,
                                            recordIndex
                                          )
                                        }
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "#3182ce",
                                          fontSize:
                                            window.innerWidth >= 768
                                              ? "11px"
                                              : "9px",
                                          textDecoration: "underline",
                                          cursor: "pointer",
                                          padding: "0",
                                          fontWeight: "500",
                                          transition: "color 0.2s ease",
                                        }}
                                        onMouseOver={(e) => {
                                          e.target.style.color = "#2c5aa0";
                                        }}
                                        onMouseOut={(e) => {
                                          e.target.style.color = "#3182ce";
                                        }}
                                      >
                                        ➕ Create New Production Order
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ) : field === "qty" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "3px",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                  }}
                                >
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
                                    style={{
                                      ...getConsistentInputStyle(),
                                      width: "55px",
                                      textAlign: "center",
                                    }}
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
                                    style={{
                                      ...getConsistentInputStyle(),
                                      width: "55px",
                                      textAlign: "center",
                                    }}
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
                                    style={{
                                      ...getConsistentInputStyle(),
                                      width: "55px",
                                      textAlign: "center",
                                    }}
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
                                    style={getConsistentSelectStyle()}
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
                                    style={getConsistentInputStyle()}
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
                                    style={getConsistentSelectStyle()}
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
                                    style={getConsistentInputStyle()}
                                    placeholder="Production Order No."
                                  />
                                )
                              ) : field === "section" || field === "grade" ? (
                                <input
                                  type="text"
                                  value={record[field] || ""}
                                  readOnly
                                  style={{
                                    ...getConsistentInputStyle(),
                                    backgroundColor: "#f7fafc",
                                    color: "#718096",
                                  }}
                                  placeholder={
                                    field === "section" ? "Section" : "Grade"
                                  }
                                />
                              ) : field === "pressId" ? (
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
                                  style={getConsistentSelectStyle()}
                                >
                                  <option value="">Select Press</option>
                                  {record.pressOptions?.map((press, idx) => (
                                    <option
                                      key={`dynamic-${idx}`}
                                      value={press}
                                    >
                                      {press}
                                    </option>
                                  ))}
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
                                  style={{
                                    ...styles.compactSelect,
                                    borderRadius: "8px",
                                    border: "2px solid #cbd5e0",
                                    padding: "8px 12px",
                                    fontSize: "13px",
                                    background: "white",
                                    transition: "all 0.2s ease",
                                  }}
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
                              ) : field === "dieRequired" ? (
                                <div>
                                  <button
                                    onClick={() =>
                                      handleDieRequiredClick(record)
                                    }
                                    style={{
                                      ...getConsistentInputStyle(),
                                      background:
                                        record.dieRequired === "Yes"
                                          ? "linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
                                          : "linear-gradient(135deg, #e53e3e 0%, #c53030 100%)",
                                      color: "white",
                                      border: "none",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      gap: "4px",
                                      fontWeight: "600",
                                      transition: "all 0.2s ease",
                                    }}
                                    disabled={
                                      !record.plantCode || !record.dieNo?.[0]
                                    }
                                  >
                                    {record.dieRequired || "Check"}
                                    {record.plantCode && record.dieNo?.[0] && (
                                      <span style={{ fontSize: "10px" }}>
                                        📊
                                      </span>
                                    )}
                                  </button>
                                </div>
                              ) : field === "rmStatus" ? (
                                <input
                                  type="text"
                                  value={record[field] ?? ""}
                                  readOnly
                                  style={{
                                    ...getConsistentInputStyle(),
                                    backgroundColor: "#f7fafc",
                                    color: "#718096",
                                  }}
                                  placeholder={
                                    window.innerWidth >= 768
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
                                    ...getConsistentInputStyle(),
                                    backgroundColor: "#f7fafc",
                                    color: "#718096",
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
                                  style={getConsistentInputStyle()}
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
                          <td
                            style={{
                              ...styles.modalTableCell,
                              textAlign: "center",
                            }}
                          >
                            <div
                              style={{
                                ...styles.actionButtons,
                                display: "flex",
                                gap: "6px",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {recordIndex ===
                                dayWiseData[dayName].length - 1 && (
                                <button
                                  onClick={() => addNewRowForDay(dayName)}
                                  style={{
                                    ...styles.smallButton,
                                    background:
                                      "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "8px 12px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    boxShadow:
                                      "0 2px 4px rgba(72, 187, 120, 0.3)",
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
                                    background:
                                      "linear-gradient(135deg, #f56565 0%, #e53e3e 100%)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    boxShadow:
                                      "0 2px 4px rgba(245, 101, 101, 0.3)",
                                  }}
                                >
                                  <Trash2
                                    size={window.innerWidth >= 768 ? 12 : 10}
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
            <div
              style={{
                ...styles.modalFooter,
                padding: "10px 20px",
                background: "#f8f9fa",
                borderTop: "1px solid #e2e8f0",
                borderRadius: "0 0 12px 12px",
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
                flexShrink: 0,
                minHeight: "50px",
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  ...styles.modalFooterButton,
                  backgroundColor: "#6c757d",
                  color: "white",
                  borderColor: "#6c757d",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(108, 117, 125, 0.3)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSavePlan}
                disabled={loading}
                style={{
                  ...styles.modalFooterButton,
                  backgroundColor: loading ? "#a0aec0" : "#48bb78",
                  borderColor: loading ? "#a0aec0" : "#48bb78",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: loading
                    ? "none"
                    : "0 2px 4px rgba(72, 187, 120, 0.3)",
                  opacity: loading ? 0.7 : 1,
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

      {showDieActualModal && (
        <div style={styles.modal}>
          <div
            style={{
              ...styles.modalContent,
              maxWidth: "800px",
              maxHeight: "600px",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                ...styles.modalHeader,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: "12px 12px 0 0",
                padding: "12px 20px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
                Die Actual Status - Plant: {selectedDieInfo.plantCode} | Die:{" "}
                {selectedDieInfo.dieNo}
              </h3>
              <button
                onClick={() => setShowDieActualModal(false)}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                  borderRadius: "6px",
                  color: "white",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: "20px", flex: 1, overflow: "auto" }}>
              {loadingDieActual ? (
                <div style={{ textAlign: "center", padding: "40px" }}>
                  <div style={{ fontSize: "16px", color: "#666" }}>
                    Loading die actual data...
                  </div>
                </div>
              ) : dieActualData.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px" }}>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#e53e3e",
                      marginBottom: "10px",
                    }}
                  >
                    No die actual data found
                  </div>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    Plant Code: {selectedDieInfo.plantCode} | Die Number:{" "}
                    {selectedDieInfo.dieNo}
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      marginBottom: "15px",
                      fontSize: "14px",
                      color: "#2d3748",
                      fontWeight: "600",
                    }}
                  >
                    Found {dieActualData.length} record(s):
                  </div>

                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "13px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background:
                            "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
                        }}
                      >
                        <th
                          style={{
                            padding: "12px 8px",
                            textAlign: "left",
                            fontWeight: "600",
                            color: "#2d3748",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          Plant
                        </th>
                        <th
                          style={{
                            padding: "12px 8px",
                            textAlign: "left",
                            fontWeight: "600",
                            color: "#2d3748",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          Die Number
                        </th>
                        <th
                          style={{
                            padding: "12px 8px",
                            textAlign: "left",
                            fontWeight: "600",
                            color: "#2d3748",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          Element
                        </th>
                        <th
                          style={{
                            padding: "12px 8px",
                            textAlign: "center",
                            fontWeight: "600",
                            color: "#2d3748",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          Required Set
                        </th>
                        <th
                          style={{
                            padding: "12px 8px",
                            textAlign: "center",
                            fontWeight: "600",
                            color: "#2d3748",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          Actual Set
                        </th>
                        <th
                          style={{
                            padding: "12px 8px",
                            textAlign: "center",
                            fontWeight: "600",
                            color: "#2d3748",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dieActualData.map((item, index) => (
                        <tr
                          key={index}
                          style={{
                            background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                            transition: "background-color 0.2s ease",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 8px",
                              border: "1px solid #e2e8f0",
                              color: "#4a5568",
                            }}
                          >
                            {item.plant}
                          </td>
                          <td
                            style={{
                              padding: "10px 8px",
                              border: "1px solid #e2e8f0",
                              color: "#4a5568",
                              fontWeight: "600",
                            }}
                          >
                            {item.die_number}
                          </td>
                          <td
                            style={{
                              padding: "10px 8px",
                              border: "1px solid #e2e8f0",
                              color: "#4a5568",
                            }}
                          >
                            {item.element}
                          </td>
                          <td
                            style={{
                              padding: "10px 8px",
                              border: "1px solid #e2e8f0",
                              textAlign: "center",
                              color: "#4a5568",
                              fontWeight: "600",
                            }}
                          >
                            {item.required_set}
                          </td>
                          <td
                            style={{
                              padding: "10px 8px",
                              border: "1px solid #e2e8f0",
                              textAlign: "center",
                              color:
                                item.actual_set === item.required_set
                                  ? "#38a169"
                                  : "#e53e3e",
                              fontWeight: "700",
                            }}
                          >
                            {item.actual_set}
                          </td>
                          <td
                            style={{
                              padding: "10px 8px",
                              border: "1px solid #e2e8f0",
                              textAlign: "center",
                            }}
                          >
                            <span
                              style={{
                                padding: "4px 12px",
                                borderRadius: "20px",
                                fontSize: "11px",
                                fontWeight: "600",
                                background:
                                  item.die_status === "Ready"
                                    ? "linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
                                    : "linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)",
                                color: "white",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              {item.die_status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Summary */}
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "15px",
                      background:
                        "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  ></div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "10px 20px",
                background: "#f8f9fa",
                borderTop: "1px solid #e2e8f0",
                borderRadius: "0 0 12px 12px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowDieActualModal(false)}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showManualEntryModal && <ManualEntryModal />}

      {/* {showManualEntryModal && (
        <div style={styles.modal}>
          <div
            style={{
              ...styles.modalContent,
              maxWidth: "400px", // ✅ Reduced from default width
              width: "90%", // ✅ Responsive width
              maxHeight: "500px", // ✅ Optional: control height too
            }}
          >
            <div
              style={{
                ...styles.modalHeader,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: "12px 12px 0 0",
                padding: "12px 20px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
                Enter Production Order Details
              </h3>
              <button
                onClick={() => setShowManualEntryModal(false)}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                  borderRadius: "6px",
                  color: "white",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <input
                placeholder="Production Order No."
                value={manualEntryData.productionOrderNo}
                onChange={(e) =>
                  setManualEntryData({
                    ...manualEntryData,
                    productionOrderNo: e.target.value,
                  })
                }
                style={getConsistentInputStyle()}
              />
              <input
                placeholder="Plant Code"
                value={manualEntryData.plantCode}
                onChange={(e) =>
                  setManualEntryData({
                    ...manualEntryData,
                    plantCode: e.target.value,
                  })
                }
                style={getConsistentInputStyle()}
              />
              <input
                placeholder="Qty"
                value={manualEntryData.qty.shift1}
                onChange={(e) =>
                  setManualEntryData({
                    ...manualEntryData,
                    qty: { ...manualEntryData.qty, shift1: e.target.value },
                  })
                }
                style={getConsistentInputStyle()}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                padding: "15px 20px",
                borderTop: "1px solid #e2e8f0",
                background: "#f8f9fa",
                borderRadius: "0 0 12px 12px",
              }}
            >
              <button
                onClick={() => setShowManualEntryModal(false)}
                style={{
                  ...styles.button,
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleManualEntrySubmit}
                style={{
                  ...styles.successButton,
                  borderRadius: "8px",
                  padding: "10px 20px",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )} */}

      {!showModal && (
        <WeeklyPlanDisplay
          weekTitle={getWeekTitle(weekOffset)}
          weekStatus={getWeekStatus(weekOffset)}
          weekDates={getWeekDates(weekOffset)}
          submittedPlans={plans}
          onEditPlan={(dayName, index, record) => {
            setModalWeekOffset(weekOffset);
            setShowModal(true);
          }}
          onDeletePlan={(dayName, index, record) => {
            console.log("Delete", dayName, index, record);
          }}
          onOpenPlanModal={openModal}
          onDailyTonnageUpdate={handleDailyTonnageUpdate}
        />
      )}
      {/* {!showModal && (
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
      )} */}
      <SmartWeeklyPlanChatbot />
    </div>
  );
};

export default WeeklyPlan;
