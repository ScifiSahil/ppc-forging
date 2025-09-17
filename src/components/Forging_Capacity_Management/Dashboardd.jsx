import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Download,
  Upload,
  BarChart3,
  Users,
  Settings,
  Home,
  Filter,
  TrendingUp,
  Calendar,
  FileText,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  DollarSign,
  Package,
  Factory,
} from "lucide-react";

const Dashboardd = () => {
  const [activeTab, setActiveTab] = useState("data");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPress, setFilterPress] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterKAM, setFilterKAM] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // table, cards
  const [masterData, setMasterData] = useState([]);
  const [isLoadingMasterData, setIsLoadingMasterData] = useState(false);

  // Enhanced sample data based on your Excel with more realistic data

  const [formData, setFormData] = useState({
    kam: "",
    customer: "",
    dieNo: "",
    partName: "",
    press: "",
    comments: "",
    qI: "",
    qII: "",
    qIII: "",
    qIV: "",
    plant: "Baramati",
    pressComm: "",
    mar25: "",
    apr25: "",
    may25: "",
    forecast: "",
    schedule: "",
    diff: "",
    status: "Active",
  });

  useEffect(() => {
    fetch("http://localhost:8080/internal/production_capacity")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((items) => {
        // Transform API data to match component expectations
        const transformedItems = items.map((item) => ({
          id: item.id,
          kam: item.kam,
          customer: item.customer,
          dieNo: item.die_no,
          partName: item.part_name,
          press: item.press,
          comments: item.comments,
          qI: item.q1,
          qII: item.q2,
          qIII: item.q3,
          qIV: item.q4,
          plant: item.plant,
          pressComm: item.press, // assuming same as press
          mar25: item.mar25,
          apr25: item.apr25,
          may25: item.may25,
          forecast: item.forecast,
          schedule: item.schedule,
          diff: item.diff,
          status: item.status,
        }));
        setData(transformedItems);
        setFilteredData(transformedItems);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        // Set empty data on error to prevent crashes
        setData([]);
        setFilteredData([]);
      });
  }, []);

  // Search handler function
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  useEffect(() => {
    let filtered = [...data];

    // Apply search filter
    if (searchTerm && searchTerm.trim() !== '') {
      const searchValue = searchTerm.trim().toLowerCase();
      filtered = filtered.filter((item) => {
        const partName = item.partName || '';
        const customer = item.customer || '';
        const kam = item.kam || '';
        const dieNo = item.dieNo ? item.dieNo.toString() : '';
        
        return (
          partName.toLowerCase().includes(searchValue) ||
          customer.toLowerCase().includes(searchValue) ||
          kam.toLowerCase().includes(searchValue) ||
          dieNo.toLowerCase().includes(searchValue)
        );
      });
    }

    // Apply other filters
    if (filterPress) {
      filtered = filtered.filter((item) => item.press === filterPress);
    }

    if (filterCustomer) {
      filtered = filtered.filter((item) => item.customer === filterCustomer);
    }

    if (filterKAM) {
      filtered = filtered.filter((item) => item.kam === filterKAM);
    }

    setFilteredData(filtered);
  }, [data, searchTerm, filterPress, filterCustomer, filterKAM]);

  const handleSubmit = useCallback(async () => {
  // Client-side validation
  if (!formData.customer || !formData.partName || !formData.press) {
    alert("Please fill all required fields: Customer, Part Name, and Press");
    return;
  }

  if (!formData.customer.trim() || !formData.partName.trim()) {
    alert("Customer and Part Name cannot be empty");
    return;
  }

  const calculatedForecast = Math.max(
    parseInt(formData.qI) || 0,
    parseInt(formData.qII) || 0,
    parseInt(formData.qIII) || 0,
    parseInt(formData.qIV) || 0
  );

  const avgSchedule = Math.round(
    ((parseInt(formData.mar25) || 0) +
      (parseInt(formData.apr25) || 0) +
      (parseInt(formData.may25) || 0)) /
      3
  );

  // Transform data for API
  const apiData = {
    kam: formData.kam,
    customer: formData.customer,
    die_no: formData.dieNo,
    part_name: formData.partName,
    press: formData.press,
    comments: formData.comments,
    q1: parseInt(formData.qI) || 0,
    q2: parseInt(formData.qII) || 0,
    q3: parseInt(formData.qIII) || 0,
    q4: parseInt(formData.qIV) || 0,
    plant: formData.plant,
    mar25: parseInt(formData.mar25) || 0,
    apr25: parseInt(formData.apr25) || 0,
    may25: parseInt(formData.may25) || 0,
    forecast: calculatedForecast,
    schedule: avgSchedule,
    diff: calculatedForecast - avgSchedule,
    status: formData.status,
  };

  try {
    if (editingItem) {
      // Update existing item
      const response = await fetch(
        `http://localhost:8080/internal/production_capacity/${editingItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("✅ Item updated successfully:", responseData);
        
        // Update local state directly instead of refetching
        const updatedItem = {
          ...editingItem,
          ...formData,
          qI: parseInt(formData.qI) || 0,
          qII: parseInt(formData.qII) || 0,
          qIII: parseInt(formData.qIII) || 0,
          qIV: parseInt(formData.qIV) || 0,
          mar25: parseInt(formData.mar25) || 0,
          apr25: parseInt(formData.apr25) || 0,
          may25: parseInt(formData.may25) || 0,
          forecast: calculatedForecast,
          schedule: avgSchedule,
          diff: calculatedForecast - avgSchedule,
        };
        
        setData(prevData => 
          prevData.map(item => 
            item.id === editingItem.id ? updatedItem : item
          )
        );
        setEditingItem(null);
        alert("Item updated successfully!");
      } else {
        const errorText = await response.text();
        console.error("❌ Failed to update item:", errorText);
        alert(`Failed to update item: ${errorText || 'Unknown error'}`);
        return;
      }
    } else {
      // Create new item
      const response = await fetch(
        "http://localhost:8080/internal/production_capacity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      if (response.ok) {
        const newItem = await response.json();
        console.log("✅ Item created successfully:", newItem);
        
        const transformedItem = {
          id: newItem.id || Date.now(), // fallback ID
          kam: newItem.kam || formData.kam,
          customer: newItem.customer || formData.customer,
          dieNo: newItem.die_no || formData.dieNo,
          partName: newItem.part_name || formData.partName,
          press: newItem.press || formData.press,
          comments: newItem.comments || formData.comments,
          qI: newItem.q1 || parseInt(formData.qI) || 0,
          qII: newItem.q2 || parseInt(formData.qII) || 0,
          qIII: newItem.q3 || parseInt(formData.qIII) || 0,
          qIV: newItem.q4 || parseInt(formData.qIV) || 0,
          plant: newItem.plant || formData.plant,
          pressComm: newItem.press || formData.press,
          mar25: newItem.mar25 || parseInt(formData.mar25) || 0,
          apr25: newItem.apr25 || parseInt(formData.apr25) || 0,
          may25: newItem.may25 || parseInt(formData.may25) || 0,
          forecast: newItem.forecast || calculatedForecast,
          schedule: newItem.schedule || avgSchedule,
          diff: newItem.diff || (calculatedForecast - avgSchedule),
          status: newItem.status || formData.status,
        };
        
        setData(prevData => [...prevData, transformedItem]);
        alert("Item created successfully!");
      } else {
        const errorText = await response.text();
        console.error("❌ Failed to create item:", errorText);
        alert(`Failed to create item: ${errorText || 'Unknown error'}`);
        return;
      }
    }
  } catch (error) {
    console.error("Error saving data:", error);
    alert("Error saving data");
    return; // Don't reset form on error
  }

  // Reset form only on successful save
  resetForm();
}, [formData, editingItem]);

const resetForm = useCallback(() => {
  setFormData({
    kam: "",
    customer: "",
    dieNo: "",
    partName: "",
    press: "",
    comments: "",
    qI: "",
    qII: "",
    qIII: "",
    qIV: "",
    plant: "Baramati",
    pressComm: "",
    mar25: "",
    apr25: "",
    may25: "",
    forecast: "",
    schedule: "",
    diff: "",
    status: "Active",
  });
  setShowAddForm(false);
  setEditingItem(null);
}, []);

const handleEdit = useCallback((item) => {
  const editData = {
    kam: item.kam || "",
    customer: item.customer || "",
    dieNo: item.dieNo || "",
    partName: item.partName || "",
    press: item.press || "",
    comments: item.comments || "",
    qI: item.qI?.toString() || "",
    qII: item.qII?.toString() || "",
    qIII: item.qIII?.toString() || "",
    qIV: item.qIV?.toString() || "",
    plant: item.plant || "Baramati",
    pressComm: item.pressComm || "",
    mar25: item.mar25?.toString() || "",
    apr25: item.apr25?.toString() || "",
    may25: item.may25?.toString() || "",
    forecast: item.forecast?.toString() || "",
    schedule: item.schedule?.toString() || "",
    diff: item.diff?.toString() || "",
    status: item.status || "Active",
  };
  
  setFormData(editData);
  setEditingItem(item);
  setShowAddForm(true);
}, []);

const handleInputChange = useCallback((field, value) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
}, []);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/internal/production_capacity/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setData((prev) => prev.filter((item) => item.id !== id));
        } else {
          alert("Error deleting item");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Error deleting item");
      }
    }
  }, []);

  const getUniqueValues = useCallback((field) => {
    return [...new Set(data.map((item) => item[field]))].filter(Boolean);
  }, [data]);

  const calculateTotals = useCallback(() => {
    return filteredData.reduce(
      (acc, item) => ({
        qI: acc.qI + item.qI,
        qII: acc.qII + item.qII,
        qIII: acc.qIII + item.qIII,
        qIV: acc.qIV + item.qIV,
        forecast: acc.forecast + item.forecast,
        schedule: acc.schedule + item.schedule,
        totalItems: acc.totalItems + 1,
        activeItems: acc.activeItems + (item.status === "Active" ? 1 : 0),
        plannedItems: acc.plannedItems + (item.status === "Planned" ? 1 : 0),
      }),
      {
        qI: 0,
        qII: 0,
        qIII: 0,
        qIV: 0,
        forecast: 0,
        schedule: 0,
        totalItems: 0,
        activeItems: 0,
        plannedItems: 0,
      }
    );
  }, [filteredData]);

  const getCapacityByPress = useCallback(() => {
    const pressCapacity = {
      "500T": { capacity: 220000, current: 0 },
      "1350T": { capacity: 200000, current: 0 },
      "1600T": { capacity: 120000, current: 0 },
      "2500T": { capacity: 80000, current: 0 },
      "FP4000T4": { capacity: 150000, current: 0 },
    };

    filteredData.forEach((item) => {
      if (pressCapacity[item.press]) {
        pressCapacity[item.press].current += Math.max(
          item.qI,
          item.qII,
          item.qIII,
          item.qIV
        );
      }
    });

    return pressCapacity;
  }, [filteredData]);

  // Fetch master data from API
  const fetchMasterData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/collection/kln_master_data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMasterData(data.objects || []);
    } catch (error) {
      console.error('Error fetching master data:', error);
      setMasterData([]);
    }
  }, []);

  // Load master data on component mount
  useEffect(() => {
    fetchMasterData();
  }, [fetchMasterData]);

  // Debounced search function
  const debounce = useCallback((func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // Auto-fill function based on die number
  const autoFillFromDieNumber = useCallback((dieNumber, rowIndex, currentFormData) => {
    if (!dieNumber || dieNumber.length < 2) return;
    
    setIsLoadingMasterData(true);
    
    // Find matching data from master data
    const matchedData = masterData.find(item => 
      item.die_number && item.die_number.toString().toLowerCase().includes(dieNumber.toLowerCase())
    );
    
    if (matchedData) {
      const newData = [...currentFormData];
      newData[rowIndex] = {
        ...newData[rowIndex],
        customer: matchedData.customer_name || '',
        partName: matchedData.part_name || '',
        press: matchedData.forge_press || '',
        comments: `RM Grade: ${matchedData.rm_grade || 'N/A'}, Cut Weight: ${matchedData.cut_wt || 'N/A'}kg, Cycle Time: ${matchedData.cycle_time || 'N/A'}s`,
      };
      return newData;
    }
    
    setIsLoadingMasterData(false);
    return currentFormData;
  }, [masterData]);

  // Debounced auto-fill function
  const debouncedAutoFill = useMemo(
    () => debounce(autoFillFromDieNumber, 500),
    [debounce, autoFillFromDieNumber]
  );

  const totals = useMemo(() => calculateTotals(), [calculateTotals]);
  const capacityData = useMemo(() => getCapacityByPress(), [getCapacityByPress]);

  const Sidebar = () => (
    <div
      style={{
        width: "288px",
        background: "linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)",
        color: "white",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        overflowY: "auto",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        borderRight: "1px solid #475569",
      }}
    >
      <div
        style={{
          padding: "24px",
          borderBottom: "1px solid #475569",
          background: "linear-gradient(to right, #1e3a8a, #3730a3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#3b82f6",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Factory style={{ width: "24px", height: "24px" }} />
          </div>
          <div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "white",
                margin: 0,
              }}
            >
              Kalyani Technoforge Ltd.
            </h1>
            <p style={{ fontSize: "14px", color: "#bfdbfe", margin: 0 }}>
              Capacity Management System
            </p>
          </div>
        </div>
      </div>

      <nav style={{ marginTop: "24px", padding: "0 16px" }}>
        {[
          {
            id: "dashboard",
            icon: Home,
            label: "Dashboard Overview",
            color: "#60a5fa",
          },
          {
            id: "data",
            icon: BarChart3,
            label: "Production Data",
            color: "#4ade80",
          },
          {
            id: "capacity",
            icon: Activity,
            label: "Capacity Analysis",
            color: "#a78bfa",
          },
          {
            id: "customers",
            icon: Users,
            label: "Customer Portfolio",
            color: "#fb923c",
          },
          {
            id: "reports",
            icon: FileText,
            label: "Reports & Analytics",
            color: "#f472b6",
          },
          {
            id: "settings",
            icon: Settings,
            label: "System Settings",
            color: "#9ca3af",
          },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: "16px",
              textAlign: "left",
              backgroundColor:
                activeTab === item.id
                  ? "rgba(37, 99, 235, 0.2)"
                  : "transparent",
              color: "white",
              border: "none",
              borderRadius: "8px",
              marginBottom: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
              borderLeft:
                activeTab === item.id
                  ? "4px solid #60a5fa"
                  : "4px solid transparent",
              boxShadow:
                activeTab === item.id
                  ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                  : "none",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== item.id) {
                e.target.style.backgroundColor = "rgba(51, 65, 85, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== item.id) {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            <item.icon
              style={{
                width: "20px",
                height: "20px",
                marginRight: "16px",
                color: item.color,
                transition: "transform 0.2s",
              }}
            />
            <span style={{ fontWeight: "500" }}>{item.label}</span>
            {activeTab === item.id && (
              <div
                style={{
                  marginLeft: "auto",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#60a5fa",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                }}
              ></div>
            )}
          </button>
        ))}
      </nav>

      <div
        style={{
          marginTop: "32px",
          margin: "32px 16px 0 16px",
          padding: "16px",
          background: "linear-gradient(to right, #14532d, #065f46)",
          borderRadius: "8px",
          border: "1px solid #166534",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#86efac",
            marginBottom: "8px",
            margin: "0 0 8px 0",
          }}
        >
          Quick Stats
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
            }}
          >
            <span style={{ color: "#d1d5db" }}>Total Items:</span>
            <span style={{ color: "white", fontWeight: "bold" }}>
              {totals.totalItems}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
            }}
          >
            <span style={{ color: "#d1d5db" }}>Active:</span>
            <span style={{ color: "#4ade80", fontWeight: "bold" }}>
              {totals.activeItems}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
            }}
          >
            <span style={{ color: "#d1d5db" }}>Planned:</span>
            <span style={{ color: "#fbbf24", fontWeight: "bold" }}>
              {totals.plannedItems}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
    trend,
    trendValue,
  }) => (
    <div
      style={{
        background: `linear-gradient(135deg, ${color[0]}, ${color[1]})`,
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "all 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 35px 60px -12px rgba(0, 0, 0, 0.35)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                padding: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                transition: "background-color 0.3s",
              }}
            >
              <Icon style={{ width: "24px", height: "24px", color: "white" }} />
            </div>
            <div>
              <h3
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "14px",
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "white",
                  margin: "4px 0 0 0",
                }}
              >
                {value}
              </p>
            </div>
          </div>
          {subtitle && (
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "14px",
                marginTop: "8px",
                margin: "8px 0 0 0",
              }}
            >
              {subtitle}
            </p>
          )}
          {trend && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "12px",
                color: trend === "up" ? "#bbf7d0" : "#fecaca",
              }}
            >
              <TrendingUp
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "4px",
                  transform: trend === "down" ? "rotate(180deg)" : "none",
                }}
              />
              <span style={{ fontSize: "14px", fontWeight: "500" }}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid #f3f4f6",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#111827",
                margin: 0,
              }}
            >
              Production Overview
            </h2>
            <p style={{ color: "#6b7280", margin: "4px 0 0 0" }}>
              Baramati Press Shop Division - Volume Forecast 25-26
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#2563eb",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
            >
              <Download style={{ width: "16px", height: "16px" }} />
              <span>Export Report</span>
            </button>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#16a34a",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#15803d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#16a34a")}
            >
              <Calendar style={{ width: "16px", height: "16px" }} />
              <span>Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        <StatCard
          title="Total Production Items"
          value={totals.totalItems.toLocaleString()}
          subtitle="Active manufacturing items"
          icon={Package}
          color={["#3b82f6", "#2563eb"]}
          trend="up"
          trendValue="+12% vs last month"
        />
        <StatCard
          title="Q1 Forecast"
          value={totals.qI.toLocaleString()}
          subtitle="First quarter projection"
          icon={TrendingUp}
          color={["#10b981", "#059669"]}
          trend="up"
          trendValue="+8.5% growth"
        />
        <StatCard
          title="Total Annual Forecast"
          value={totals.forecast.toLocaleString()}
          subtitle="Complete year projection"
          icon={BarChart3}
          color={["#8b5cf6", "#7c3aed"]}
          trend="up"
          trendValue="Target achieved"
        />
        <StatCard
          title="Average Schedule"
          value={totals.schedule.toLocaleString()}
          subtitle="Current scheduling rate"
          icon={Calendar}
          color={["#f59e0b", "#d97706"]}
          trend="up"
          trendValue="98% efficiency"
        />
      </div>

      {/* Quarterly Analysis */}
      <div
        style={{
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid #f3f4f6",
        }}
      >
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "24px",
            color: "#111827",
            margin: "0 0 24px 0",
          }}
        >
          Quarterly Production Analysis
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {[
            {
              quarter: "Q1",
              value: totals.qI,
              color: ["#60a5fa", "#3b82f6"],
              target: 200000,
            },
            {
              quarter: "Q2",
              value: totals.qII,
              color: ["#4ade80", "#22c55e"],
              target: 180000,
            },
            {
              quarter: "Q3",
              value: totals.qIII,
              color: ["#facc15", "#eab308"],
              target: 170000,
            },
            {
              quarter: "Q4",
              value: totals.qIV,
              color: ["#fb7185", "#f43f5e"],
              target: 160000,
            },
          ].map(({ quarter, value, color, target }) => (
            <div key={quarter} style={{ textAlign: "center" }}>
              <div
                style={{
                  background: `linear-gradient(135deg, ${color[0]}, ${color[1]})`,
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  marginBottom: "16px",
                }}
              >
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: 0,
                  }}
                >
                  {quarter} 2025-26
                </p>
                <p
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "white",
                    marginTop: "8px",
                    margin: "8px 0 0 0",
                  }}
                >
                  {value.toLocaleString()}
                </p>
                <div
                  style={{
                    marginTop: "16px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "9999px",
                    height: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "9999px",
                      height: "8px",
                      width: `${Math.min((value / target) * 100, 100)}%`,
                      transition: "width 1s",
                    }}
                  ></div>
                </div>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "12px",
                    marginTop: "8px",
                    margin: "8px 0 0 0",
                  }}
                >
                  Target: {target.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Press Capacity Analysis */}
      <div
        style={{
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid #f3f4f6",
        }}
      >
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "24px",
            color: "#111827",
            margin: "0 0 24px 0",
          }}
        >
          Press Capacity Utilization
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {Object.entries(capacityData).map(([press, data]) => {
            const utilization = data.current / data.capacity;
            const utilizationColor =
              utilization > 0.9
                ? "#ef4444"
                : utilization > 0.7
                ? "#eab308"
                : "#22c55e";
            const utilizationBgColor =
              utilization > 0.9
                ? "#fef2f2"
                : utilization > 0.7
                ? "#fefce8"
                : "#f0fdf4";
            const utilizationTextColor =
              utilization > 0.9
                ? "#b91c1c"
                : utilization > 0.7
                ? "#a16207"
                : "#166534";

            return (
              <div
                key={press}
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "24px",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#374151",
                      margin: 0,
                    }}
                  >
                    {press}
                  </h4>
                  <div
                    style={{
                      padding: "4px 12px",
                      backgroundColor: utilizationBgColor,
                      color: utilizationTextColor,
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {(utilization * 100).toFixed(1)}%
                  </div>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div
                    style={{
                      backgroundColor: "#e5e7eb",
                      borderRadius: "9999px",
                      height: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: utilizationColor,
                        borderRadius: "9999px",
                        height: "12px",
                        width: `${Math.min(utilization * 100, 100)}%`,
                        transition: "width 1s",
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#6b7280" }}>Current:</span>
                  <span style={{ fontWeight: "600", color: "#111827" }}>
                    {data.current.toLocaleString()}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#6b7280" }}>Capacity:</span>
                  <span style={{ fontWeight: "600", color: "#111827" }}>
                    {data.capacity.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const DataView = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header with controls */}
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #f3f4f6",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#111827",
              margin: 0,
            }}
          >
            Production Data Management
          </h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() =>
                setViewMode(viewMode === "table" ? "cards" : "table")
              }
              style={{
                padding: "8px 16px",
                backgroundColor: "#6b7280",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Eye style={{ width: "16px", height: "16px" }} />
              {viewMode === "table" ? "Card View" : "Table View"}
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#10b981",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Plus style={{ width: "16px", height: "16px" }} />
              Add New Item
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", minWidth: "300px" }}>
            <Search
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                color: "#9ca3af",
              }}
            />
            <input
              type="text"
              placeholder="Search by part name, customer, KAM, die number..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 44px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
                backgroundColor: "white",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
              autoComplete="off"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>

          <select
            value={filterPress}
            onChange={(e) => setFilterPress(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              minWidth: "120px",
            }}
          >
            <option value="">All Presses</option>
            {getUniqueValues("press").map((press) => (
              <option key={press} value={press}>
                {press}
              </option>
            ))}
          </select>

          <select
            value={filterCustomer}
            onChange={(e) => setFilterCustomer(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              minWidth: "150px",
            }}
          >
            <option value="">All Customers</option>
            {getUniqueValues("customer").map((customer) => (
              <option key={customer} value={customer}>
                {customer}
              </option>
            ))}
          </select>

          <select
            value={filterKAM}
            onChange={(e) => setFilterKAM(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              minWidth: "120px",
            }}
          >
            <option value="">All KAMs</option>
            {getUniqueValues("kam").map((kam) => (
              <option key={kam} value={kam}>
                {kam || "Unassigned"}
              </option>
            ))}
          </select>

          {(searchTerm || filterPress || filterCustomer || filterKAM) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterPress("");
                setFilterCustomer("");
                setFilterKAM("");
              }}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ef4444",
                color: "white",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Data Display */}
      {viewMode === "table" ? (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #f3f4f6",
            overflowX: "auto",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f9fafb" }}>
              <tr>
                {[
                  "KAM",
                  "Customer",
                  "Die No",
                  "Part Name",
                  "Press",
                  "Q1",
                  "Q2",
                  "Q3",
                  "Q4",
                  "Forecast",
                  "Schedule",
                  "Diff",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "16px 12px",
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#374151",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "#f9fafb",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f3f4f6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "white" : "#f9fafb")
                  }
                >
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      color: "#374151",
                    }}
                  >
                    {item.kam || "-"}
                  </td>
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    {item.customer}
                  </td>
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      color: "#374151",
                    }}
                  >
                    {item.dieNo}
                  </td>
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      color: "#374151",
                      maxWidth: "200px",
                    }}
                  >
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.partName}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      color: "#374151",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#dbeafe",
                        color: "#1d4ed8",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {item.press}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      color: "#374151",
                      textAlign: "right",
                    }}
                  >
                    {item.qI?.toLocaleString() || "0"}
                  </td>
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      color: "#374151",
                      textAlign: "right",
                    }}
                  >
                    {item.qII?.toLocaleString() || "0"}
                  </td>
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      color: "#374151",
                      textAlign: "right",
                    }}
                  >
                    {item.qIII?.toLocaleString() || "0"}
                  </td>
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      color: "#374151",
                      textAlign: "right",
                    }}
                  >
                    {item.qIV?.toLocaleString() || "0"}
                  </td>
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      color: "#374151",
                      textAlign: "right",
                      fontWeight: "600",
                    }}
                  >
                    {item.forecast?.toLocaleString() || "0"}
                  </td>
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      color: "#374151",
                      textAlign: "right",
                    }}
                  >
                    {item.schedule?.toLocaleString() || "0"}
                  </td>
                  <td
                    style={{
                      padding: "16px 12px",
                      fontSize: "14px",
                      textAlign: "right",
                      color:
                        item.diff > 0
                          ? "#059669"
                          : item.diff < 0
                          ? "#dc2626"
                          : "#374151",
                      fontWeight: "600",
                    }}
                  >
                    {item.diff > 0 ? "+" : ""}
                    {item.diff?.toLocaleString() || "0"}
                  </td>
                  <td style={{ padding: "16px 12px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleEdit(item)}
                        style={{
                          padding: "6px",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          borderRadius: "4px",
                          border: "none",
                          cursor: "pointer",
                        }}
                        title="Edit"
                      >
                        <Edit3 style={{ width: "16px", height: "16px" }} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          padding: "6px",
                          backgroundColor: "#ef4444",
                          color: "white",
                          borderRadius: "4px",
                          border: "none",
                          cursor: "pointer",
                        }}
                        title="Delete"
                      >
                        <Trash2 style={{ width: "16px", height: "16px" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card View
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredData.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                border: "1px solid #f3f4f6",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {item.partName}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
                    {item.customer} • Die #{item.dieNo}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 4px 0",
                    }}
                  >
                    KAM
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {item.kam || "Unassigned"}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Press
                  </p>
                  <span
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#dbeafe",
                      color: "#1d4ed8",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {item.press}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                {["qI", "qII", "qIII", "qIV"].map((quarter, index) => (
                  <div
                    key={quarter}
                    style={{
                      textAlign: "center",
                      padding: "8px",
                      backgroundColor: "#f9fafb",
                      borderRadius: "6px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Q{index + 1}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827",
                        margin: 0,
                      }}
                    >
                      {item[quarter]?.toLocaleString() || "0"}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                    Forecast vs Schedule
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {item.forecast?.toLocaleString() || "0"}
                    </span>
                    <span style={{ color: "#6b7280" }}>vs</span>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      {item.schedule?.toLocaleString() || "0"}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Difference
                  </p>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color:
                        item.diff > 0
                          ? "#059669"
                          : item.diff < 0
                          ? "#dc2626"
                          : "#374151",
                    }}
                  >
                    {item.diff > 0 ? "+" : ""}
                    {item.diff?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => handleEdit(item)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "14px",
                  }}
                >
                  <Edit3 style={{ width: "16px", height: "16px" }} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "14px",
                  }}
                >
                  <Trash2 style={{ width: "16px", height: "16px" }} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Add/Edit Form Modal
  const FormModal = () => {
    if (!showAddForm) return null;

    const [selectedYear, setSelectedYear] = useState("2025");
    const [multiFormData, setMultiFormData] = useState([
      {
        kam: "",
        customer: "",
        dieNo: "",
        partName: "",
        press: "",
        comments: "",
        qI: "",
        qII: "",
        qIII: "",
        qIV: "",
        plant: "Baramati",
        pressComm: "",
        mar25: "",
        apr25: "",
        may25: "",
        forecast: "",
        schedule: "",
        diff: "",
        status: "Active",
      }
    ]);

    const years = ["2025", "2026", "2027", "2028"];
    
    const handleAddRow = () => {
      setMultiFormData([...multiFormData, {
        kam: "",
        customer: "",
        dieNo: "",
        partName: "",
        press: "",
        comments: "",
        qI: "",
        qII: "",
        qIII: "",
        qIV: "",
        plant: "Baramati",
        pressComm: "",
        mar25: "",
        apr25: "",
        may25: "",
        forecast: "",
        schedule: "",
        diff: "",
        status: "Active",
      }]);
    };

    const handleRemoveRow = (index) => {
      const newData = multiFormData.filter((_, i) => i !== index);
      setMultiFormData(newData);
    };

    const handleMultiInputChange = (index, field, value) => {
      const newData = [...multiFormData];
      newData[index][field] = value;
      setMultiFormData(newData);
      
      // Trigger auto-fill when die number is entered
      if (field === 'dieNo' && value.length >= 2 && masterData.length > 0) {
        const handleAutoFill = async () => {
          setIsLoadingMasterData(true);
          
          // Find matching data from master data
          const matchedData = masterData.find(item => 
            item.die_number && item.die_number.toString().toLowerCase().includes(value.toLowerCase())
          );
          
          if (matchedData) {
            const updatedData = [...multiFormData];
            
            // Map forge press to standard press options
            let mappedPress = '';
            const forgePress = matchedData.forge_press?.toUpperCase();
            if (forgePress?.includes('500') || forgePress?.includes('HATEBUR')) {
              mappedPress = '500T';
            } else if (forgePress?.includes('1350')) {
              mappedPress = '1350T';
            } else if (forgePress?.includes('1600')) {
              mappedPress = '1600T';
            } else if (forgePress?.includes('2500')) {
              mappedPress = '2500T';
            } else if (forgePress?.includes('4000') || forgePress?.includes('FP4000T4')) {
              mappedPress = 'FP4000T4';
            }
            
            updatedData[index] = {
              ...updatedData[index],
              customer: matchedData.customer_name || '',
              partName: matchedData.part_name || '',
              press: mappedPress,
              comments: `RM Grade: ${matchedData.rm_grade || 'N/A'}, Cut Weight: ${matchedData.cut_wt || 'N/A'}kg, Cycle Time: ${matchedData.cycle_time || 'N/A'}s, R-Code: ${matchedData.r_code || 'N/A'}`,
            };
            setMultiFormData(updatedData);
            
            // Show success message
            console.log(`✅ Auto-filled data for Die Number: ${value}`);
          }
          
          setIsLoadingMasterData(false);
        };
        
        // Debounced call
        setTimeout(handleAutoFill, 500);
      }
    };

    const handleSubmitAll = async () => {
      for (const data of multiFormData) {
        if (!data.customer || !data.partName || !data.press) {
          alert("Please fill all required fields for all items");
          return;
        }
      }

      try {
        for (const data of multiFormData) {
          const calculatedForecast = Math.max(
            parseInt(data.qI) || 0,
            parseInt(data.qII) || 0,
            parseInt(data.qIII) || 0,
            parseInt(data.qIV) || 0
          );

          const avgSchedule = Math.round(
            ((parseInt(data.mar25) || 0) +
              (parseInt(data.apr25) || 0) +
              (parseInt(data.may25) || 0)) / 3
          );

          const apiData = {
            kam: data.kam,
            customer: data.customer,
            die_no: data.dieNo,
            part_name: data.partName,
            press: data.press,
            comments: data.comments,
            q1: parseInt(data.qI) || 0,
            q2: parseInt(data.qII) || 0,
            q3: parseInt(data.qIII) || 0,
            q4: parseInt(data.qIV) || 0,
            plant: data.plant,
            mar25: parseInt(data.mar25) || 0,
            apr25: parseInt(data.apr25) || 0,
            may25: parseInt(data.may25) || 0,
            forecast: calculatedForecast,
            schedule: avgSchedule,
            diff: calculatedForecast - avgSchedule,
            status: data.status,
          };

          const response = await fetch(
            "http://localhost:8080/internal/production_capacity",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(apiData),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to save item");
          }
        }

        // Refresh data
        window.location.reload();
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Error saving data");
      }
    };

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            maxWidth: "95%",
            width: "1400px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#111827",
                  margin: 0,
                }}
              >
                {editingItem ? "Edit Production Item" : "Add New Production Items"}
              </h2>
              
              {/* Year Selector */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  padding: "8px 16px",
                  border: "2px solid #3b82f6",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  backgroundColor: "#eff6ff",
                  color: "#1e40af",
                  cursor: "pointer",
                }}
              >
                {years.map(year => (
                  <option key={year} value={year}>Year {year}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingItem(null);
                setMultiFormData([{
                  kam: "",
                  customer: "",
                  dieNo: "",
                  partName: "",
                  press: "",
                  comments: "",
                  qI: "",
                  qII: "",
                  qIII: "",
                  qIV: "",
                  plant: "Baramati",
                  pressComm: "",
                  mar25: "",
                  apr25: "",
                  may25: "",
                  forecast: "",
                  schedule: "",
                  diff: "",
                  status: "Active",
                }]);
              }}
              style={{
                padding: "8px",
                backgroundColor: "#f3f4f6",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              <XCircle
                style={{ width: "20px", height: "20px", color: "#6b7280" }}
              />
            </button>
          </div>

          {/* Table Header */}
          <div style={{ overflowX: "auto", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1200px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f3f4f6" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #d1d5db" }}>KAM</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #d1d5db" }}>Customer*</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #d1d5db" }}>Die No</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #d1d5db" }}>Part Name*</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #d1d5db" }}>Press*</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #d1d5db" }}>Q1 {selectedYear}</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #d1d5db" }}>Q2 {selectedYear}</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #d1d5db" }}>Q3 {selectedYear}</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #d1d5db" }}>Q4 {selectedYear}</th>
                  <th style={{ padding: "12px", textAlign: "left", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #d1d5db" }}>Comments</th>
                  <th style={{ padding: "12px", textAlign: "center", fontSize: "14px", fontWeight: "600", borderBottom: "2px solid #d1d5db" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {multiFormData.map((rowData, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="text"
                        value={rowData.kam}
                        onChange={(e) => handleMultiInputChange(index, "kam", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "14px",
                        }}
                        placeholder="KAM Name"
                      />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="text"
                        value={rowData.customer}
                        onChange={(e) => handleMultiInputChange(index, "customer", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "14px",
                          backgroundColor: rowData.customer ? "white" : "#fef2f2",
                        }}
                        placeholder="Customer*"
                        required
                      />
                    </td>
                    <td style={{ padding: "8px", position: "relative" }}>
                      <input
                        type="text"
                        value={rowData.dieNo}
                        onChange={(e) => handleMultiInputChange(index, "dieNo", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "14px",
                          backgroundColor: isLoadingMasterData && rowData.dieNo ? "#f0f9ff" : "white",
                        }}
                        placeholder="Die Number"
                      />
                      {isLoadingMasterData && rowData.dieNo && (
                        <div
                          style={{
                            position: "absolute",
                            right: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#3b82f6",
                            fontSize: "12px",
                          }}
                        >
                          Loading...
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="text"
                        value={rowData.partName}
                        onChange={(e) => handleMultiInputChange(index, "partName", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "14px",
                          backgroundColor: rowData.partName ? "white" : "#fef2f2",
                        }}
                        placeholder="Part Name*"
                        required
                      />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <select
                        value={rowData.press}
                        onChange={(e) => handleMultiInputChange(index, "press", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "14px",
                          backgroundColor: rowData.press ? "white" : "#fef2f2",
                        }}
                        required
                      >
                        <option value="">Select Press*</option>
                        <option value="500T">500T</option>
                        <option value="1350T">1350T</option>
                        <option value="1600T">1600T</option>
                        <option value="2500T">2500T</option>
                        <option value="FP4000T4">FP4000T4</option>
                      </select>
                    </td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="number"
                        value={rowData.qI}
                        onChange={(e) => handleMultiInputChange(index, "qI", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "14px",
                        }}
                        placeholder="Q1"
                      />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="number"
                        value={rowData.qII}
                        onChange={(e) => handleMultiInputChange(index, "qII", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "14px",
                        }}
                        placeholder="Q2"
                      />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="number"
                        value={rowData.qIII}
                        onChange={(e) => handleMultiInputChange(index, "qIII", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "14px",
                        }}
                        placeholder="Q3"
                      />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="number"
                        value={rowData.qIV}
                        onChange={(e) => handleMultiInputChange(index, "qIV", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "14px",
                        }}
                        placeholder="Q4"
                      />
                    </td>
                    <td style={{ padding: "8px" }}>
                      <input
                        type="text"
                        value={rowData.comments}
                        onChange={(e) => handleMultiInputChange(index, "comments", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "14px",
                        }}
                        placeholder="Comments"
                      />
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      {multiFormData.length > 1 && (
                        <button
                          onClick={() => handleRemoveRow(index)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#ef4444",
                            color: "white",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "space-between",
              marginTop: "24px",
            }}
          >
            <button
              onClick={handleAddRow}
              style={{
                padding: "12px 24px",
                backgroundColor: "#3b82f6",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <Plus style={{ width: "18px", height: "18px" }} />
              Add Another Row
            </button>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowAddForm(false);
                  setEditingItem(null);
                  setMultiFormData([{
                    kam: "",
                    customer: "",
                    dieNo: "",
                    partName: "",
                    press: "",
                    comments: "",
                    qI: "",
                    qII: "",
                    qIII: "",
                    qIV: "",
                    plant: "Baramati",
                    pressComm: "",
                    mar25: "",
                    apr25: "",
                    may25: "",
                    forecast: "",
                    schedule: "",
                    diff: "",
                    status: "Active",
                  }]);
                }}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#6b7280",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={handleSubmit}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#059669",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <CheckCircle style={{ width: "18px", height: "18px" }} />
                Save & Add More
              </button>

              <button
                onClick={handleSubmitAll}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#10b981",
                  color: "white",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <CheckCircle style={{ width: "18px", height: "18px" }} />
                Save All Items
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PlaceholderView = ({ title, icon: Icon }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        border: "1px solid #f3f4f6",
        margin: "20px 0",
      }}
    >
      <Icon
        style={{
          width: "64px",
          height: "64px",
          color: "#9ca3af",
          marginBottom: "16px",
        }}
      />
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#374151",
          margin: "0 0 8px 0",
        }}
      >
        {title}
      </h2>
      <p style={{ color: "#6b7280", textAlign: "center", margin: 0 }}>
        This section is under development and will be available soon.
      </p>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "288px",
          flex: 1,
          padding: "32px",
          minHeight: "100vh",
        }}
      >
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "data" && <DataView />}
        {activeTab === "capacity" && (
          <PlaceholderView title="Capacity Analysis" icon={Activity} />
        )}
        {activeTab === "customers" && (
          <PlaceholderView title="Customer Portfolio" icon={Users} />
        )}
        {activeTab === "reports" && (
          <PlaceholderView title="Reports & Analytics" icon={FileText} />
        )}
        {activeTab === "settings" && (
          <PlaceholderView title="System Settings" icon={Settings} />
        )}
      </div>

      <FormModal />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Dashboardd;
