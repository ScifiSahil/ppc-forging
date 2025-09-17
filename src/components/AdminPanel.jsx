import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Search, RefreshCw } from "lucide-react";

// ✅ COPIED FROM WEEKLYPLAN - Same authentication logic
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

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("master_data");
  const [masterData, setMasterData] = useState([]);
  const [machineCapacityData, setMachineCapacityData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ UPDATED - Using internal APIs like in WeeklyPlan
  const APIs = {
    master_data: "https://ktflceprd.kalyanicorp.com/internal/kln_master_data",
    machine_capacity: "https://ktflceprd.kalyanicorp.com/internal/kln_ppc_machine_capacity",
    month: "https://ktflceprd.kalyanicorp.com/internal/kln_ppc_month",
    week: "https://ktflceprd.kalyanicorp.com/internal/kln_ppc_week",
    schedule: "https://ktflceprd.kalyanicorp.com/internal/kln_prod_schedule",
  };

  // Column configurations for each tab
  const columnConfigs = {
    master_data: {
      order: [
        "plant_code",
        "die_number",
        "customer_name",
        "part_name",
        "forge_press",
        "r_code",
        "rm_grade",
        "rm_section",
        "net_wt",
        "cut_wt",
        "gross_wt",
        "flash_slug_wt",
        "burr_wt",
        "endpc_wt",
        "cut_length",
        "country",
        "currency",
        "forge_price",
        "forge_scrap_price",
        "rm_rate_kg",
        "cycle_time",
      ],
      labels: {
        plant_code: "PLANT CODE",
        die_number: "DIE NUMBER",
        customer_name: "CUSTOMER NAME",
        part_name: "PART NAME",
        forge_press: "FORGING PRESS",
        r_code: "R CODE",
        rm_grade: "RAW MATERIAL GRADE",
        rm_section: "SECTION",
        net_wt: "NET WEIGHT",
        cut_wt: "CUT WEIGHT",
        gross_wt: "GROSS WEIGHT",
        flash_slug_wt: "FLASH/SLUG WEIGHT",
        burr_wt: "BURR WEIGHT",
        endpc_wt: "END PIECE WEIGHT",
        cut_length: "CUT LENGTH",
        country: "COUNTRY",
        currency: "CURRENCY",
        forge_price: "FORGING PRICE",
        forge_scrap_price: "FORGING SCRAP PRICE",
        rm_rate_kg: "RM RATE/KG",
        cycle_time: "CYCLE TIME",
      },
    },

    machine_capacity: {
      order: [
        "plant_code",
        "asset_id",
        "press_category",
        "line_name",
        "month_machine_capacity",
        "shift_capacity",
        "hourly_machine_capacity",
      ],
      labels: {
        plant_code: "PLANT CODE",
        asset_id: "ASSET ID (IoT)",
        press_category: "PRESS CATEGORY",
        line_name: "LINE NAME",
        month_machine_capacity: "MONTHLY MACHINE CAPACITY",
        shift_capacity: "SHIFT CAPACITY",
        hourly_machine_capacity: "HOURLY MACHINE CAPACITY",
      },
    },

    schedule: {
      order: [
        "order_date",
        "revision_no",
        "production_order_no",
        "plant_code",
        "die_no",
        "part_name",
        "customer_name",
        "forging_press",
        "schedule_qty",
        "net_tonnage",
        "sale_value",
        "scrap_value",
        "raw_material_cost",
        "planned_cycle_time",
      ],
      labels: {
        order_date: "ORDER DATE",
        revision_no: "REVISION NO.",
        production_order_no: "PRODUCTION ORDER NO.",
        plant_code: "PLANT CODE",
        die_no: "DIE NO.",
        part_name: "PART NAME",
        customer_name: "CUSTOMER NAME",
        forging_press: "FORGING PRESS",
        schedule_qty: "SCHEDULE QTY.",
        net_tonnage: "NET TONNAGE",
        sale_value: "SALE VALUE",
        scrap_value: "SCRAP VALUE",
        raw_material_cost: "RAW MATERIAL COST",
        planned_cycle_time: "PLANNED CYCLE TIME",
      },
    },

    month: {
      order: [
        "plant_code",
        "month_prod_date",
        "month_rev_no",
        "month_prod_no",
        "month_forge_press",
        "month_die_no",
        "month_part_name",
        "month_rm_grade",
        "month_section",
        "month_net_wt",
        "month_gross_wt",
        "cut_weight",
        "month_sale_plan_qty",
        "total_production_qty",
        "outsource_qty",
        "month_net_tonn",
        "cut_tonnage",
        "desired_wip",
        "opening_stock",
      ],
      labels: {
        plant_code: "PLANT CODE",
        month_prod_date: "PRODUCTION DATE",
        month_rev_no: "REVISION NO.",
        month_prod_no: "PRODUCTION NO.",
        month_forge_press: "FORGING PRESS",
        month_die_no: "DIE NO.",
        month_part_name: "PART NAME",
        month_rm_grade: "RAW MATERIAL GRADE",
        month_section: "SECTION",
        month_net_wt: "NET WEIGHT",
        month_gross_wt: "GROSS WEIGHT",
        cut_weight: "CUT WEIGHT",
        month_sale_plan_qty: "SALE PLAN QTY.",
        total_production_qty: "TOTAL PRODUCTION QTY.",
        outsource_qty: "OUTSOURCE QTY.",
        month_net_tonn: "NET TONNAGE",
        cut_tonnage: "CUT TONNAGE",
        desired_wip: "DESIRED WIP",
        opening_stock: "OPENING STOCK",
      },
    },
  };

  // ✅ UPDATED - Fetch data using WeeklyPlan auth but with original APIs
  const fetchData = async () => {
    setLoading(true);
    try {
      // For api/v1/collection endpoints, try basic auth first like WeeklyPlan
      const basicAuthHeaders = {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("ktfladm:Ktfl_Admin@2024")}`,
      };

      // Get CSRF token for some APIs that might need it
      let csrfAuthOptions;
      try {
        csrfAuthOptions = await getAuthHeadersWithCSRF("GET", false);
      } catch (error) {
        console.warn("CSRF token fetch failed, falling back to basic auth:", error);
      }

      const [masterRes, machineRes, monthRes, scheduleRes] =
        await Promise.allSettled([
          fetch(APIs.master_data, {
            method: "GET",
            headers: basicAuthHeaders
          }),
          fetch(APIs.machine_capacity, {
            method: "GET",
            headers: basicAuthHeaders
          }),
          fetch(APIs.month, {
            method: "GET",
            headers: basicAuthHeaders
          }),
          fetch(APIs.schedule, {
            method: "GET",
            headers: basicAuthHeaders
          }),
        ]);

      // Handle master data
      if (masterRes.status === "fulfilled" && masterRes.value.ok) {
        const masterJson = await masterRes.value.json();
        console.log("✅ Master Data Response:", masterJson);
        // Handle different response formats like original code
        setMasterData(masterJson.objects || masterJson.data || (Array.isArray(masterJson) ? masterJson : []));
      } else {
        console.error("Failed to fetch master data:", masterRes.reason);
        setMasterData([]);
      }

      // Handle machine capacity data
      if (machineRes.status === "fulfilled" && machineRes.value.ok) {
        const machineJson = await machineRes.value.json();
        console.log("✅ Machine Capacity Response:", machineJson);
        setMachineCapacityData(machineJson.objects || machineJson.data || (Array.isArray(machineJson) ? machineJson : []));
      } else {
        console.error("Failed to fetch machine capacity data:", machineRes.reason);
        setMachineCapacityData([]);
      }

      // Handle month data
      if (monthRes.status === "fulfilled" && monthRes.value.ok) {
        const monthJson = await monthRes.value.json();
        console.log("✅ Month Data Response:", monthJson);
        setMonthData(monthJson.objects || monthJson.data || (Array.isArray(monthJson) ? monthJson : []));
      } else {
        console.error("Failed to fetch month data:", monthRes.reason);
        setMonthData([]);
      }

      // Handle schedule data (this one might be different format)
      if (scheduleRes.status === "fulfilled" && scheduleRes.value.ok) {
        const scheduleJson = await scheduleRes.value.json();
        console.log("✅ Schedule Data Response:", scheduleJson);
        setScheduleData(scheduleJson.data || scheduleJson.objects || (Array.isArray(scheduleJson) ? scheduleJson : []));
      } else {
        console.error("Failed to fetch schedule data:", scheduleRes.reason);
        setScheduleData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  // ✅ UPDATED - Add data using same auth pattern as WeeklyPlan
  const handleAdd = async (data) => {
    setLoading(true);
    try {
      const endpoint = APIs[activeTab];
      console.log("🔍 handleAdd Debug:");
      console.log("➡️ Endpoint:", endpoint);
      console.log("➡️ Data being sent:", data);

      // ✅ Use same auth pattern as WeeklyPlan
      const authOptions = await getAuthHeadersWithCSRF("POST");

      const response = await fetch(endpoint, {
        method: "POST",
        ...authOptions,
        body: JSON.stringify(data),
      });

      console.log("➡️ Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error Response Body:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ Success, New Item:", result);

      // Update state based on active tab
      switch (activeTab) {
        case "master_data":
          setMasterData((prev) => [...prev, result]);
          break;
        case "machine_capacity":
          setMachineCapacityData((prev) => [...prev, result]);
          break;
        case "month":
          setMonthData((prev) => [...prev, result]);
          break;
        case "week":
          setWeekData((prev) => [...prev, result]);
          break;
        case "schedule":
          setScheduleData((prev) => [...prev, result]);
          break;
      }
      setShowAddForm(false);
      alert("✅ Data added successfully!");
    } catch (error) {
      console.error("🚨 Error adding data:", error);
      alert("❌ Failed to add data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED - Save data using same auth pattern as WeeklyPlan
  const handleSave = async (updatedItem) => {
    setLoading(true);
    try {
      const endpoint = APIs[activeTab];
      const itemId = updatedItem.id || updatedItem.cdb_object_id || updatedItem.order_id;

      console.log("🔍 handleSave Debug:");
      console.log("➡️ Endpoint:", `${endpoint}/${itemId}`);
      console.log("➡️ Data being sent:", updatedItem);

      // ✅ Use same auth pattern as WeeklyPlan
      const authOptions = await getAuthHeadersWithCSRF("PUT");

      const response = await fetch(`${endpoint}/${itemId}`, {
        method: "PUT",
        ...authOptions,
        body: JSON.stringify(updatedItem),
      });

      console.log("➡️ Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error Response Body:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      console.log("✅ Update Success");

      // Update state based on active tab
      const updateData = (data) =>
        data.map((item) =>
          (item.id === itemId || item.cdb_object_id === itemId || item.order_id === itemId)
            ? updatedItem
            : item
        );

      switch (activeTab) {
        case "master_data":
          setMasterData(updateData);
          break;
        case "machine_capacity":
          setMachineCapacityData(updateData);
          break;
        case "month":
          setMonthData(updateData);
          break;
        case "week":
          setWeekData(updateData);
          break;
        case "schedule":
          setScheduleData(updateData);
          break;
      }
      setEditingItem(null);
      alert("✅ Data updated successfully!");
    } catch (error) {
      console.error("🚨 Error updating data:", error);
      alert("❌ Failed to update data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED - Delete data using same auth pattern as WeeklyPlan
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setLoading(true);
    try {
      const endpoint = APIs[activeTab];
      console.log("🔍 handleDelete Debug:");
      console.log("➡️ Endpoint:", `${endpoint}/${id}`);

      // ✅ Use same auth pattern as WeeklyPlan
      const authOptions = await getAuthHeadersWithCSRF("DELETE");

      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
        ...authOptions,
      });

      console.log("➡️ Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error Response Body:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      console.log("✅ Delete Success");

      // Update state based on active tab
      const filterData = (data) =>
        data.filter((item) =>
          item.id !== id && item.cdb_object_id !== id && item.order_id !== id
        );

      switch (activeTab) {
        case "master_data":
          setMasterData(filterData);
          break;
        case "machine_capacity":
          setMachineCapacityData(filterData);
          break;
        case "month":
          setMonthData(filterData);
          break;
        case "week":
          setWeekData(filterData);
          break;
        case "schedule":
          setScheduleData(filterData);
          break;
      }
      alert("✅ Data deleted successfully!");
    } catch (error) {
      console.error("🚨 Error deleting data:", error);
      alert("❌ Failed to delete data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case "master_data":
        return masterData;
      case "machine_capacity":
        return machineCapacityData;
      case "month":
        return monthData;
      case "week":
        return weekData;
      case "schedule":
        return scheduleData;
      default:
        return [];
    }
  };

  const filteredData = getCurrentData().filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Get ordered headers and labels for current tab
  const getTableHeaders = () => {
    if (activeTab === "master_data" && columnConfigs.master_data) {
      const availableHeaders = columnConfigs.master_data.order.filter(
        (header) =>
          filteredData.length > 0 && filteredData[0].hasOwnProperty(header)
      );
      return {
        headers: availableHeaders,
        labels: columnConfigs.master_data.labels,
      };
    } else if (
      activeTab === "machine_capacity" &&
      columnConfigs.machine_capacity
    ) {
      const availableHeaders = columnConfigs.machine_capacity.order.filter(
        (header) =>
          filteredData.length > 0 && filteredData[0].hasOwnProperty(header)
      );
      return {
        headers: availableHeaders,
        labels: columnConfigs.machine_capacity.labels,
      };
    } else if (activeTab === "month" && columnConfigs.month) {
      const availableHeaders = columnConfigs.month.order.filter(
        (header) =>
          filteredData.length > 0 && filteredData[0].hasOwnProperty(header)
      );
      return {
        headers: availableHeaders,
        labels: columnConfigs.month.labels,
      };
    } else {
      // For other tabs, use existing logic
      const headers =
        filteredData.length > 0
          ? Object.keys(filteredData[0]).filter(
              (key) =>
                !key.startsWith("@") &&
                !key.startsWith("system:") &&
                !key.startsWith("relship:")
            )
          : [];

      const labels = {};
      headers.forEach((header) => {
        labels[header] = header.replace(/_/g, " ").toUpperCase();
      });

      return { headers, labels };
    }
  };

  // Form Components (keeping the same forms as before)
  const MasterDataForm = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      data || {
        plant_code: "",
        die_number: "",
        customer_name: "",
        part_name: "",
        forge_press: "",
        r_code: "",
        rm_grade: "",
        rm_section: "",
        net_wt: "",
        cut_wt: "",
        gross_wt: "",
        flash_slug_wt: "",
        burr_wt: "",
        endpc_wt: "",
        cut_length: "",
        country: "",
        currency: "",
        forge_price: "",
        forge_scrap_price: "",
        rm_rate_kg: "",
        cycle_time: "",
      }
    );

    return (
      <div style={styles.formContainer}>
        <h3 style={styles.formTitle}>
          {data ? "Edit Master Data" : "Add Master Data"}
        </h3>
        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Plant Code"
            type="number"
            value={formData.plant_code || ""}
            onChange={(e) =>
              setFormData({ ...formData, plant_code: parseInt(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Die Number"
            value={formData.die_number || ""}
            onChange={(e) =>
              setFormData({ ...formData, die_number: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Customer Name"
            value={formData.customer_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, customer_name: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Part Name"
            value={formData.part_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, part_name: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Forging Press"
            value={formData.forge_press || ""}
            onChange={(e) =>
              setFormData({ ...formData, forge_press: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="R Code"
            value={formData.r_code || ""}
            onChange={(e) =>
              setFormData({ ...formData, r_code: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Raw Material Grade"
            value={formData.rm_grade || ""}
            onChange={(e) =>
              setFormData({ ...formData, rm_grade: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Section"
            type="number"
            value={formData.rm_section || ""}
            onChange={(e) =>
              setFormData({ ...formData, rm_section: parseInt(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Net Weight"
            type="number"
            step="0.01"
            value={formData.net_wt || ""}
            onChange={(e) =>
              setFormData({ ...formData, net_wt: parseFloat(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Cut Weight"
            type="number"
            step="0.01"
            value={formData.cut_wt || ""}
            onChange={(e) =>
              setFormData({ ...formData, cut_wt: parseFloat(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Gross Weight"
            type="number"
            step="0.01"
            value={formData.gross_wt || ""}
            onChange={(e) =>
              setFormData({ ...formData, gross_wt: parseFloat(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Flash/Slug Weight"
            type="number"
            step="0.01"
            value={formData.flash_slug_wt || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                flash_slug_wt: parseFloat(e.target.value) || "",
              })
            }
          />
          <input
            style={styles.input}
            placeholder="Burr Weight"
            type="number"
            step="0.01"
            value={formData.burr_wt || ""}
            onChange={(e) =>
              setFormData({ ...formData, burr_wt: parseFloat(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="End Piece Weight"
            type="number"
            step="0.01"
            value={formData.endpc_wt || ""}
            onChange={(e) =>
              setFormData({ ...formData, endpc_wt: parseFloat(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Cut Length"
            type="number"
            step="0.01"
            value={formData.cut_length || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                cut_length: parseFloat(e.target.value) || "",
              })
            }
          />
          <input
            style={styles.input}
            placeholder="Country"
            value={formData.country || ""}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Currency"
            value={formData.currency || ""}
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Forging Price"
            type="number"
            step="0.01"
            value={formData.forge_price || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                forge_price: parseFloat(e.target.value) || "",
              })
            }
          />
          <input
            style={styles.input}
            placeholder="Forging Scrap Price"
            type="number"
            step="0.01"
            value={formData.forge_scrap_price || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                forge_scrap_price: parseFloat(e.target.value) || "",
              })
            }
          />
          <input
            style={styles.input}
            placeholder="RM Rate/Kg"
            type="number"
            step="0.01"
            value={formData.rm_rate_kg || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                rm_rate_kg: parseFloat(e.target.value) || "",
              })
            }
          />
          <input
            style={styles.input}
            placeholder="Cycle Time"
            type="number"
            value={formData.cycle_time || ""}
            onChange={(e) =>
              setFormData({ ...formData, cycle_time: parseInt(e.target.value) || "" })
            }
          />
        </div>
        <div style={styles.formActions}>
          <button
            style={{
              ...styles.button,
              ...styles.saveButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={() => onSave(formData)}
            disabled={loading}
          >
            <Save size={16} /> {loading ? "Saving..." : "Save"}
          </button>
          <button
            style={{
              ...styles.button,
              ...styles.cancelButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={onCancel}
            disabled={loading}
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </div>
    );
  };

  const MachineCapacityForm = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      data || {
        line_name: "",
        month_machine_capacity: "",
        plant_code: "",
        shift_capacity: "",
        asset_id: "",
        press_category: "",
        hourly_machine_capacity: "",
      }
    );

    return (
      <div style={styles.formContainer}>
        <h3 style={styles.formTitle}>
          {data ? "Edit Machine Capacity" : "Add Machine Capacity"}
        </h3>
        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Plant Code"
            type="number"
            value={formData.plant_code || ""}
            onChange={(e) =>
              setFormData({ ...formData, plant_code: parseInt(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Asset ID"
            value={formData.asset_id || ""}
            onChange={(e) =>
              setFormData({ ...formData, asset_id: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Press Category"
            value={formData.press_category || ""}
            onChange={(e) =>
              setFormData({ ...formData, press_category: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Line Name"
            value={formData.line_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, line_name: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Monthly Machine Capacity"
            type="number"
            value={formData.month_machine_capacity || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                month_machine_capacity: parseInt(e.target.value) || "",
              })
            }
          />
          <input
            style={styles.input}
            placeholder="Shift Capacity"
            type="number"
            value={formData.shift_capacity || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                shift_capacity: parseInt(e.target.value) || "",
              })
            }
          />
          <input
            style={styles.input}
            placeholder="Hourly Machine Capacity"
            type="number"
            value={formData.hourly_machine_capacity || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                hourly_machine_capacity: parseInt(e.target.value) || "",
              })
            }
          />
        </div>
        <div style={styles.formActions}>
          <button
            style={{
              ...styles.button,
              ...styles.saveButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={() => onSave(formData)}
            disabled={loading}
          >
            <Save size={16} /> {loading ? "Saving..." : "Save"}
          </button>
          <button
            style={{
              ...styles.button,
              ...styles.cancelButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={onCancel}
            disabled={loading}
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </div>
    );
  };

  const MonthForm = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      data || {
        plant_code: "",
        month_prod_date: "",
        month_rev_no: "",
        month_prod_no: "",
        month_forge_press: "",
        month_die_no: "",
        month_part_name: "",
        month_rm_grade: "",
        month_section: "",
        month_net_wt: "",
        month_gross_wt: "",
        cut_weight: "",
        month_sale_plan_qty: "",
        total_production_qty: "",
        outsource_qty: "",
        month_net_tonn: "",
        cut_tonnage: "",
        desired_wip: "",
        opening_stock: "",
      }
    );

    return (
      <div style={styles.formContainer}>
        <h3 style={styles.formTitle}>
          {data ? "Edit Monthly Plan" : "Add Monthly Plan"}
        </h3>
        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Plant Code"
            type="number"
            value={formData.plant_code || ""}
            onChange={(e) =>
              setFormData({ ...formData, plant_code: parseInt(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Production Date"
            type="date"
            value={formData.month_prod_date || ""}
            onChange={(e) =>
              setFormData({ ...formData, month_prod_date: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Revision No"
            value={formData.month_rev_no || ""}
            onChange={(e) =>
              setFormData({ ...formData, month_rev_no: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Production No"
            value={formData.month_prod_no || ""}
            onChange={(e) =>
              setFormData({ ...formData, month_prod_no: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Forge Press"
            value={formData.month_forge_press || ""}
            onChange={(e) =>
              setFormData({ ...formData, month_forge_press: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Die No"
            value={formData.month_die_no || ""}
            onChange={(e) =>
              setFormData({ ...formData, month_die_no: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Part Name"
            value={formData.month_part_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, month_part_name: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Raw Material Grade"
            value={formData.month_rm_grade || ""}
            onChange={(e) =>
              setFormData({ ...formData, month_rm_grade: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Section"
            type="number"
            value={formData.month_section || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                month_section: parseInt(e.target.value) || "",
              })
            }
          />
          <input
            style={styles.input}
            placeholder="Net Weight"
            type="number"
            step="0.01"
            value={formData.month_net_wt || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                month_net_wt: parseFloat(e.target.value) || "",
              })
            }
          />
          <input
            style={styles.input}
            placeholder="Gross Weight"
            type="number"
            step="0.01"
            value={formData.month_gross_wt || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                month_gross_wt: parseFloat(e.target.value) || "",
              })
            }
          />
          <input
            style={styles.input}
            placeholder="Sale Plan Qty"
            type="number"
            value={formData.month_sale_plan_qty || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                month_sale_plan_qty: parseInt(e.target.value) || "",
              })
            }
          />
        </div>
        <div style={styles.formActions}>
          <button
            style={{
              ...styles.button,
              ...styles.saveButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={() => onSave(formData)}
            disabled={loading}
          >
            <Save size={16} /> {loading ? "Saving..." : "Save"}
          </button>
          <button
            style={{
              ...styles.button,
              ...styles.cancelButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={onCancel}
            disabled={loading}
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </div>
    );
  };

  const WeekForm = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      data || {
        customer_name: "",
        mapped_month_prod_no: "",
        planned_qty: "",
        plant_code: "",
        shift1_qty: "",
        shift2_qty: "",
        shift3_qty: "",
        week_prod_date: "",
        week_die_no: "",
        main_forge_press: "",
      }
    );

    return (
      <div style={styles.formContainer}>
        <h3 style={styles.formTitle}>
          {data ? "Edit Weekly Plan" : "Add Weekly Plan"}
        </h3>
        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Customer Name"
            value={formData.customer_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, customer_name: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Product No"
            value={formData.mapped_month_prod_no || ""}
            onChange={(e) =>
              setFormData({ ...formData, mapped_month_prod_no: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Planned Qty"
            type="number"
            value={formData.planned_qty || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                planned_qty: parseInt(e.target.value) || "",
              })
            }
          />
          <input
            style={styles.input}
            placeholder="Plant Code"
            type="number"
            value={formData.plant_code || ""}
            onChange={(e) =>
              setFormData({ ...formData, plant_code: parseInt(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Shift 1 Qty"
            type="number"
            value={formData.shift1_qty || ""}
            onChange={(e) =>
              setFormData({ ...formData, shift1_qty: parseInt(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Shift 2 Qty"
            type="number"
            value={formData.shift2_qty || ""}
            onChange={(e) =>
              setFormData({ ...formData, shift2_qty: parseInt(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Shift 3 Qty"
            type="number"
            value={formData.shift3_qty || ""}
            onChange={(e) =>
              setFormData({ ...formData, shift3_qty: parseInt(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Production Date"
            type="date"
            value={formData.week_prod_date || ""}
            onChange={(e) =>
              setFormData({ ...formData, week_prod_date: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Die No"
            value={formData.week_die_no || ""}
            onChange={(e) =>
              setFormData({ ...formData, week_die_no: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Forge Press"
            value={formData.main_forge_press || ""}
            onChange={(e) =>
              setFormData({ ...formData, main_forge_press: e.target.value })
            }
          />
        </div>
        <div style={styles.formActions}>
          <button
            style={{
              ...styles.button,
              ...styles.saveButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={() => onSave(formData)}
            disabled={loading}
          >
            <Save size={16} /> {loading ? "Saving..." : "Save"}
          </button>
          <button
            style={{
              ...styles.button,
              ...styles.cancelButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={onCancel}
            disabled={loading}
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </div>
    );
  };

  const ScheduleForm = ({ data, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      data || {
        order_date: "",
        revision_no: "",
        production_order_no: "",
        plant_code: "",
        die_no: "",
        part_name: "",
        customer_name: "",
        forging_press: "",
        schedule_qty: "",
        net_tonnage: "",
        sale_value: "",
        scrap_value: "",
        raw_material_cost: "",
        planned_cycle_time: "",
      }
    );

    return (
      <div style={styles.formContainer}>
        <h3 style={styles.formTitle}>
          {data ? "Edit Production Schedule" : "Add Production Schedule"}
        </h3>
        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Order Date"
            type="date"
            value={formData.order_date || ""}
            onChange={(e) =>
              setFormData({ ...formData, order_date: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Revision No"
            value={formData.revision_no || ""}
            onChange={(e) =>
              setFormData({ ...formData, revision_no: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Production Order No"
            value={formData.production_order_no || ""}
            onChange={(e) =>
              setFormData({ ...formData, production_order_no: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Plant Code"
            type="number"
            value={formData.plant_code || ""}
            onChange={(e) =>
              setFormData({ ...formData, plant_code: parseInt(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Die No"
            value={formData.die_no || ""}
            onChange={(e) =>
              setFormData({ ...formData, die_no: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Part Name"
            value={formData.part_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, part_name: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Customer Name"
            value={formData.customer_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, customer_name: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Forging Press"
            value={formData.forging_press || ""}
            onChange={(e) =>
              setFormData({ ...formData, forging_press: e.target.value })
            }
          />
          <input
            style={styles.input}
            placeholder="Schedule Qty"
            type="number"
            value={formData.schedule_qty || ""}
            onChange={(e) =>
              setFormData({ ...formData, schedule_qty: parseInt(e.target.value) || "" })
            }
          />
          <input
            style={styles.input}
            placeholder="Net Tonnage"
            type="number"
            step="0.01"
            value={formData.net_tonnage || ""}
            onChange={(e) =>
              setFormData({ ...formData, net_tonnage: parseFloat(e.target.value) || "" })
            }
          />
        </div>
        <div style={styles.formActions}>
          <button
            style={{
              ...styles.button,
              ...styles.saveButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={() => onSave(formData)}
            disabled={loading}
          >
            <Save size={16} /> {loading ? "Saving..." : "Save"}
          </button>
          <button
            style={{
              ...styles.button,
              ...styles.cancelButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={onCancel}
            disabled={loading}
          >
            <X size={16} /> Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    const commonProps = {
      data: editingItem,
      onSave: editingItem ? handleSave : handleAdd,
      onCancel: () => {
        setEditingItem(null);
        setShowAddForm(false);
      },
    };

    if (showAddForm || editingItem) {
      switch (activeTab) {
        case "master_data":
          return <MasterDataForm {...commonProps} />;
        case "machine_capacity":
          return <MachineCapacityForm {...commonProps} />;
        case "month":
          return <MonthForm {...commonProps} />;
        case "week":
          return <WeekForm {...commonProps} />;
        case "schedule":
          return <ScheduleForm {...commonProps} />;
        default:
          return null;
      }
    }
    return null;
  };

  const renderTable = () => {
    if (loading) {
      return (
        <div style={styles.noData}>
          <RefreshCw size={24} className="animate-spin" />
          <p style={{ marginTop: "10px" }}>Loading data...</p>
        </div>
      );
    }

    if (filteredData.length === 0) {
      return (
        <div style={styles.noData}>
          <p>No data found</p>
          <button
            style={{ ...styles.button, ...styles.addButton, marginTop: "20px" }}
            onClick={() => fetchData()}
          >
            <RefreshCw size={16} /> Refresh Data
          </button>
        </div>
      );
    }

    const { headers, labels } = getTableHeaders();

    return (
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              {headers.map((header) => (
                <th key={header} style={styles.th}>
                  {labels[header] || header.replace(/_/g, " ").toUpperCase()}
                </th>
              ))}
              <th style={styles.th}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={item.cdb_object_id || item.order_id || item.id || index}
                style={{
                  ...styles.tableRow,
                }}
                onMouseEnter={(e) =>
                  (e.target.parentElement.style.background =
                    "rgba(59, 130, 246, 0.05)")
                }
                onMouseLeave={(e) =>
                  (e.target.parentElement.style.background =
                    "rgba(255, 255, 255, 0.4)")
                }
              >
                {headers.map((header) => (
                  <td key={header} style={styles.td}>
                    {item[header]}
                  </td>
                ))}
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button
                      style={{
                        ...styles.button,
                        ...styles.editButton,
                        opacity: loading ? 0.6 : 1,
                        cursor: loading ? "not-allowed" : "pointer",
                      }}
                      onClick={() => handleEdit(item)}
                      disabled={loading}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      style={{
                        ...styles.button,
                        ...styles.deleteButton,
                        opacity: loading ? 0.6 : 1,
                        cursor: loading ? "not-allowed" : "pointer",
                      }}
                      onClick={() =>
                        handleDelete(item.cdb_object_id || item.order_id || item.id)
                      }
                      disabled={loading}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background:
        "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)",
      minHeight: "100vh",
      position: "relative",
    },
    card: {
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "24px",
      padding: "40px",
      boxShadow:
        "0 25px 50px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      position: "relative",
      overflow: "hidden",
    },
    header: {
      textAlign: "center",
      color: "#1e293b",
      marginBottom: "40px",
      fontSize: "3em",
      fontWeight: "800",
      background:
        "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "-0.02em",
      textShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
    },
    tabs: {
      display: "flex",
      marginBottom: "30px",
      background: "rgba(255, 255, 255, 0.6)",
      borderRadius: "20px",
      padding: "8px",
      boxShadow:
        "inset 0 2px 10px rgba(0, 0, 0, 0.05), 0 8px 25px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(15px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    tab: {
      flex: 1,
      padding: "16px 24px",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "600",
      color: "#64748b",
      borderRadius: "16px",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
    },
    activeTab: {
      background:
        "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
      color: "white",
      transform: "translateY(-1px)",
      boxShadow:
        "0 10px 25px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
      fontWeight: "700",
    },
    controls: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      gap: "20px",
    },
    searchContainer: {
      position: "relative",
      flex: 1,
      maxWidth: "450px",
    },
    searchInput: {
      width: "100%",
      padding: "16px 50px 16px 20px",
      border: "2px solid rgba(59, 130, 246, 0.1)",
      borderRadius: "50px",
      fontSize: "15px",
      outline: "none",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      color: "#1e293b",
      fontWeight: "500",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    },
    searchIcon: {
      position: "absolute",
      right: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#64748b",
      transition: "color 0.3s ease",
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "14px 28px",
      border: "none",
      borderRadius: "50px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "600",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      outline: "none",
      position: "relative",
      overflow: "hidden",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    },
    addButton: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white",
      boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
    },
    editButton: {
      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      color: "white",
      padding: "10px 14px",
      marginRight: "8px",
      boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
    },
    deleteButton: {
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      color: "white",
      padding: "10px 14px",
      boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
    },
    saveButton: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      color: "white",
      boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
    },
    cancelButton: {
      background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
      color: "white",
      boxShadow: "0 8px 25px rgba(107, 114, 128, 0.3)",
    },
    tableContainer: {
      background: "rgba(255, 255, 255, 0.95)",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow:
        "0 20px 40px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
      overflowX: "auto",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "14px",
      fontWeight: "500",
    },
    tableHeader: {
      background:
        "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
      color: "white",
      position: "relative",
    },
    th: {
      padding: "18px 16px",
      textAlign: "left",
      fontWeight: "700",
      fontSize: "13px",
      letterSpacing: "1px",
      whiteSpace: "nowrap",
      textTransform: "uppercase",
      position: "relative",
    },
    tableRow: {
      borderBottom: "1px solid rgba(226, 232, 240, 0.5)",
      transition: "all 0.2s ease",
      background: "rgba(255, 255, 255, 0.4)",
    },
    td: {
      padding: "16px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "180px",
      color: "#334155",
      fontWeight: "500",
      fontSize: "14px",
    },
    actionButtons: {
      display: "flex",
      gap: "5px",
    },
    formContainer: {
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "20px",
      padding: "35px",
      marginBottom: "30px",
      boxShadow:
        "0 25px 50px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      position: "relative",
      overflow: "hidden",
    },
    formTitle: {
      color: "#1e293b",
      marginBottom: "30px",
      fontSize: "1.8em",
      fontWeight: "700",
      textAlign: "center",
      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "20px",
      marginBottom: "30px",
    },
    input: {
      padding: "16px 20px",
      border: "2px solid rgba(59, 130, 246, 0.1)",
      borderRadius: "12px",
      fontSize: "15px",
      outline: "none",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      background: "rgba(255, 255, 255, 0.8)",
      color: "#1e293b",
      fontWeight: "500",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    },
    formActions: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "10px",
    },
    noData: {
      textAlign: "center",
      padding: "60px",
      color: "#64748b",
      fontSize: "18px",
      fontWeight: "500",
      background: "rgba(255, 255, 255, 0.6)",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <h1 style={styles.header}>Production Planning Admin Panel</h1>

        {/* Tabs */}
        <div style={styles.tabs}>
          {[
            { key: "master_data", label: "Die/Customer Master" },
            { key: "machine_capacity", label: "Machine Capacity" },
            { key: "schedule", label: "Production Schedule" },
            { key: "month", label: "Monthly Production Plan" },
          ].map((tab) => (
            <button
              key={tab.key}
              style={{
                ...styles.tab,
                ...(activeTab === tab.key ? styles.activeTab : {}),
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search across all data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                ...styles.searchInput,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow =
                  "0 10px 40px rgba(59, 130, 246, 0.15)";
                if (e.target.nextElementSibling) {
                  e.target.nextElementSibling.style.color = "#3b82f6";
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(59, 130, 246, 0.1)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.05)";
                if (e.target.nextElementSibling) {
                  e.target.nextElementSibling.style.color = "#64748b";
                }
              }}
            />
            <Search size={20} style={styles.searchIcon} />
          </div>

          <button
            style={{
              ...styles.button,
              ...styles.addButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={() => setShowAddForm(true)}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 12px 35px rgba(16, 185, 129, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3)";
              }
            }}
          >
            <Plus size={16} />
            {loading ? "Loading..." : "Add New"}
          </button>
        </div>

        {/* Form */}
        {renderForm()}

        {/* Table */}
        {renderTable()}
      </div>
    </div>
  );
};

export default AdminPanel;