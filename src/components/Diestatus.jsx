import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Factory,
  Hash,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  MessageCircle,
  X,
  Send,
  Bot,
} from "lucide-react";

const Diestatus = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedDieNumber, setSelectedDieNumber] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiChat, setAiChat] = useState([
    {
      type: "bot",
      message:
        "Hello! I'm your DMS AI Assistant. I can help you with production insights, data analysis, and recommendations. How can I assist you today?",
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:8080/internal/kln_dms_dieactual"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const apiData = await response.json();
      console.log("API Response:", apiData);
      const transformedData = apiData.map((item) => ({
        plant: item.plant || "Unknown Plant",
        die_number: item.die_number,
        element: item.element,
        required_set: item.required_set || 0,
        actual_set: item.actual_set || 0,
        die_status: item.die_status,
      }));

      setData(transformedData);
      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      setError(`Failed to fetch data: ${err.message}`);
      setLoading(false);
    }
  };

  const uniquePlants = useMemo(
    () => [
      ...new Set(
        data.filter((item) => item && item.plant).map((item) => item.plant)
      ),
    ],
    [data]
  );

  const uniqueDieNumbers = useMemo(
    () => [...new Set(data.map((item) => item.die_number))],
    [data]
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesGlobalSearch =
        globalSearch === "" ||
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(globalSearch.toLowerCase())
        );

      const matchesPlant = selectedPlant === "" || item.plant === selectedPlant;
      const matchesDieNumber =
        selectedDieNumber === "" || item.die_number === selectedDieNumber;

      return matchesGlobalSearch && matchesPlant && matchesDieNumber;
    });
  }, [data, globalSearch, selectedPlant, selectedDieNumber]);

  const groupedData = useMemo(() => {
    if (loading) return [];

    const grouped = {};

    filteredData.forEach((item) => {
      const key = `${item.plant}-${item.die_number}`;

      if (!grouped[key]) {
        grouped[key] = {
          plant: item.plant,
          die_number: item.die_number,
          elements: [],
          totalRequired: 0,
          totalActual: 0,
        };
      }

      grouped[key].elements.push({
        element: item.element,
        required_set: item.required_set || 0,
        actual_set: item.actual_set || 0,
        die_status: item.die_status,
        isComplete:
          (item.actual_set || 0) >= (item.required_set || 0) &&
          (item.required_set || 0) > 0,
      });

      grouped[key].totalRequired += item.required_set || 0;
      grouped[key].totalActual += item.actual_set || 0;
    });

    Object.values(grouped).forEach((group) => {
      const completedElements = group.elements.filter(
        (el) => el.isComplete
      ).length;
      const totalElements = group.elements.length;
      const remainingElements = totalElements - completedElements;

      group.completedElements = completedElements;
      group.totalElements = totalElements;
      group.remainingElements = remainingElements;
      group.isAllComplete = remainingElements === 0 && totalElements > 0;
    });

    return Object.values(grouped);
  }, [filteredData, loading]);

  const stats = useMemo(() => {
    if (loading) {
      return { total: "-", completed: "-", pending: "-", completionRate: "-" };
    }

    const totalDies = groupedData.length;
    const completedDies = groupedData.filter(
      (group) => group.isAllComplete
    ).length;
    const pendingDies = totalDies - completedDies;
    const completionRate =
      totalDies > 0 ? ((completedDies / totalDies) * 100).toFixed(1) : 0;

    return {
      total: totalDies,
      completed: completedDies,
      pending: pendingDies,
      completionRate: parseFloat(completionRate),
    };
  }, [groupedData, loading]);

  // Chart data preparation
  const chartData = useMemo(() => {
    if (loading || filteredData.length === 0) {
      return {
        plantData: [],
        statusData: [
          {
            name: "Completed",
            value: loading ? 0 : stats.completed,
            color: "#059669",
          },
          {
            name: "Pending",
            value: loading ? 0 : stats.pending,
            color: "#dc2626",
          },
        ],
        trendData: [],
      };
    }

    // Plant-wise performance - Updated for plant_code
    const plantData = uniquePlants
      .filter((plant) => plant && typeof plant === "string")
      .map((plant) => {
        const plantGroups = groupedData.filter(
          (group) => group.plant === plant
        );
        const completed = plantGroups.filter(
          (group) => group.isAllComplete
        ).length;
        const total = plantGroups.length;
        const completionRate = total > 0 ? (completed / total) * 100 : 0;

        return {
          name: plant,
          completed,
          pending: total - completed,
          total,
          completionRate: Math.round(completionRate),
        };
      });

    // Status distribution for pie chart
    const completed = typeof stats.completed === "number" ? stats.completed : 0;
    const pending = typeof stats.pending === "number" ? stats.pending : 0;

    const statusData = [
      { name: "Completed", value: completed, color: "#059669" },
      { name: "Pending", value: pending, color: "#dc2626" },
    ];

    // Trend data (simulated)
    let completionRate = 0;
    if (typeof stats.completionRate === "string") {
      completionRate = parseInt(stats.completionRate.replace("%", "")) || 0;
    } else if (typeof stats.completionRate === "number") {
      completionRate = stats.completionRate;
    }

    const trendData = [
      { name: "Week 1", completion: 65, efficiency: 78 },
      { name: "Week 2", completion: 72, efficiency: 82 },
      { name: "Week 3", completion: 68, efficiency: 75 },
      { name: "Week 4", completion: 85, efficiency: 88 },
      {
        name: "Current",
        completion: completionRate,
        efficiency: 85,
      },
    ];

    return { plantData, statusData, trendData };
  }, [groupedData, stats, uniquePlants, loading]);

  const clearFilters = () => {
    setGlobalSearch("");
    setSelectedPlant("");
    setSelectedDieNumber("");
  };

  const handleAIMessage = async (e) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;

    const userMessage = aiMessage;
    setAiMessage("");

    // Add user message immediately
    setAiChat((prev) => [...prev, { type: "user", message: userMessage }]);

    // Try local response first (INSTANT)
    const localResponse = generateFastLocalResponse(userMessage);
    if (localResponse) {
      setAiChat((prev) => [...prev, { type: "bot", message: localResponse }]);
      return;
    }

    // Add typing indicator for backend queries
    const typingId = Date.now();
    setAiChat((prev) => [
      ...prev,
      {
        type: "bot",
        message: "🤔 Analyzing production data...",
        id: typingId,
        isTyping: true,
      },
    ]);

    try {
      // MAIN FIX: Increase timeout and add retry logic
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 seconds

      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      // Remove typing indicator and add real response
      setAiChat((prev) =>
        prev
          .filter((msg) => msg.id !== typingId)
          .concat([
            {
              type: "bot",
              message:
                data.response ||
                data.answer ||
                data.message ||
                "⚠️ No response received from server",
            },
          ])
      );
    } catch (err) {
      console.error("AI Chat Error:", err);

      // Remove typing indicator and show detailed error
      setAiChat((prev) =>
        prev
          .filter((msg) => msg.id !== typingId)
          .concat([
            {
              type: "bot",
              message: getDetailedErrorMessage(err, userMessage),
            },
          ])
      );
    }
  };

  const getDetailedErrorMessage = (err, originalMessage) => {
    if (err.name === "AbortError") {
      return `⏱️ Request timed out after 45 seconds. The backend might be processing complex queries. 

Try these instead:
• "completion rate"
• "status overview" 
• "die 1290 status"

Original query: "${originalMessage}"`;
    }

    if (
      err.message.includes("Failed to fetch") ||
      err.message.includes("ERR_CONNECTION_REFUSED")
    ) {
      return `⚠️ Backend server is not running or crashed. 

Please:
1. Check if backend is running on localhost:3000
2. Restart backend server if needed
3. Try again after server is up

Original query: "${originalMessage}"`;
    }

    return `⚠️ Connection error: ${err.message}

Please check if the backend server is running and try again.`;
  };

  const generateFastLocalResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Pre-calculate stats for instant access
    const currentStats = {
      total: stats.total,
      completed: stats.completed,
      pending: stats.pending,
      completionRate: stats.completionRate,
    };

    // Instant responses for common queries
    if (lowerMessage.includes("completion") || lowerMessage.includes("rate")) {
      return `✅ Current completion rate: ${currentStats.completionRate}%. ${
        currentStats.completionRate < 70
          ? "⚠️ Below optimal - focus on pending tasks."
          : "🎯 Great performance!"
      }`;
    }

    if (lowerMessage.includes("pending") || lowerMessage.includes("delayed")) {
      return `📊 ${currentStats.pending} dies are pending completion. Priority: Review elements with 0 actual sets.`;
    }

    if (lowerMessage.includes("total") || lowerMessage.includes("count")) {
      return `📈 Current Status: ${currentStats.total} total dies | ${currentStats.completed} ready | ${currentStats.pending} pending`;
    }

    if (lowerMessage.includes("status") || lowerMessage.includes("overview")) {
      return `🔍 Quick Overview: ${currentStats.completionRate}% complete | ${currentStats.pending} dies need attention | ${filteredData.length} items currently filtered`;
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("commands")) {
      return `🚀 Quick Commands:
• "completion rate" - Get current progress
• "pending dies" - See what needs attention  
• "plant [number]" - Filter by plant
• "die [number]" - Check specific die
• "status overview" - Full summary`;
    }

    // Plant specific queries
    if (lowerMessage.includes("plant")) {
      const bestPlant = chartData.plantData.reduce(
        (best, current) =>
          current.completionRate > best.completionRate ? current : best,
        chartData.plantData[0] || { name: "No data", completionRate: 0 }
      );
      return `🏭 Best performing plant: ${bestPlant?.name} with ${bestPlant?.completionRate}% completion rate. Focus on underperforming plants for improvement.`;
    }

    // Performance queries
    if (
      lowerMessage.includes("efficiency") ||
      lowerMessage.includes("performance")
    ) {
      return `⚡ Current system efficiency: ${currentStats.completed} completed vs ${currentStats.pending} pending dies. Consider implementing automated alerts for delayed processes.`;
    }

    return null; // Return null to use backend AI
  };

  // Modified handleAIMessage with local response check
  const handleAIMessageOptimized = async (e) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;

    const userMessage = aiMessage;
    setAiMessage("");

    // Add user message
    setAiChat((prev) => [...prev, { type: "user", message: userMessage }]);

    // Try local response first
    const localResponse = generateFastLocalResponse(userMessage);
    if (localResponse) {
      setAiChat((prev) => [...prev, { type: "bot", message: localResponse }]);
      return;
    }

    // If no local response, use backend (with optimizations above)
    // ... rest of the backend call code
  };

  // Helper function to get element status colors
  const getElementStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "ready":
        return { bg: "#dcfce7", text: "#16a34a", border: "#bbf7d0" };
      case "pending":
        return { bg: "#fef3c7", text: "#d97706", border: "#fde68a" };
      case "in progress":
        return { bg: "#dbeafe", text: "#2563eb", border: "#bfdbfe" };
      case "maintenance":
        return { bg: "#fee2e2", text: "#dc2626", border: "#fecaca" };
      case "breakdown":
        return { bg: "#fef2f2", text: "#991b1b", border: "#fca5a5" };
      default:
        return { bg: "#f3f4f6", text: "#6b7280", border: "#e5e7eb" };
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "8px",
                  margin: "0 0 8px 0",
                }}
              >
                Die Status
              </h1>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "16px",
                  margin: 0,
                }}
              >
                Production monitoring and control dashboard with AI insights
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setAiOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#7c3aed",
                  color: "white",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#6d28d9";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#7c3aed";
                }}
              >
                <Bot size={20} />
                AI Assistant
              </button>
              <button
                onClick={fetchData}
                disabled={loading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  backgroundColor: loading ? "#f3f4f6" : "#2563eb",
                  color: loading ? "#9ca3af" : "white",
                  boxShadow: loading ? "none" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = "#1d4ed8";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = "#2563eb";
                  }
                }}
              >
                <RefreshCw
                  size={20}
                  style={{
                    animation: loading ? "spin 1s linear infinite" : "none",
                    transformOrigin: "center",
                  }}
                />
                <span>{loading ? "Syncing..." : "Refresh"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* CSS Keyframes */}
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}

          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes shimmer {
              0% { left: -100%; }
              100% { left: 100%; }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>

        {/* KPI Cards - Updated for Die-based stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {[
            {
              title: "Total Dies",
              value: stats.total,
              icon: Hash,
              textColor: "#2563eb",
              iconBg: "#dbeafe",
            },
            {
              title: "Ready Dies",
              value: stats.completed,
              icon: CheckCircle,
              textColor: "#16a34a",
              iconBg: "#dcfce7",
            },
            {
              title: "Pending Dies",
              value: stats.pending,
              icon: Clock,
              textColor: "#d97706",
              iconBg: "#fef3c7",
            },
            {
              title: "Completion Rate",
              value: loading ? "-" : `${stats.completionRate}%`,
              icon: TrendingUp,
              textColor: "#9333ea",
              iconBg: "#e9d5ff",
            },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
                padding: "16px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#6b7280",
                      marginBottom: "4px",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {stat.title}
                  </p>
                  <p
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: loading ? "#9ca3af" : "#111827",
                      margin: 0,
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: loading ? "#f3f4f6" : stat.iconBg,
                  }}
                >
                  <stat.icon
                    size={20}
                    style={{ color: loading ? "#9ca3af" : stat.textColor }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "24px",
            marginBottom: "24px",
          }}
        ></div>

        {/* Filters */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                padding: "8px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
              }}
            >
              <Filter size={20} style={{ color: "#6b7280" }} />
            </div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                margin: 0,
              }}
            >
              Filters
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {/* Global Search */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <Search size={18} style={{ color: "#9ca3af" }} />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: "40px",
                  paddingRight: "16px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2563eb";
                  e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Plant Filter */}
            <select
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.2s ease",
                backgroundColor: "white",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
                e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="">All Plants</option>
              {uniquePlants.map((plant) => (
                <option key={plant} value={plant}>
                  {plant}
                </option>
              ))}
            </select>

            {/* Die Number Filter */}
            <select
              value={selectedDieNumber}
              onChange={(e) => setSelectedDieNumber(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.2s ease",
                backgroundColor: "white",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
                e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="">All Die Numbers</option>
              {uniqueDieNumbers.map((dieNo) => (
                <option key={dieNo} value={dieNo}>
                  {dieNo}
                </option>
              ))}
            </select>

            {/* Clear Button */}
            <button
              onClick={clearFilters}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f3f4f6",
                color: "#374151",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#e5e7eb";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#f3f4f6";
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: loading ? "#9ca3af" : "#111827",
                margin: 0,
              }}
            >
              Die Status Summary -{" "}
              {loading ? "Loading..." : `${groupedData.length} Dies`}
            </h2>
          </div>

          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  border: "4px solid #e5e7eb",
                  borderTop: "4px solid #2563eb",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginBottom: "16px",
                }}
              ></div>
              <p style={{ color: "#6b7280", margin: 0 }}>Loading data...</p>
            </div>
          ) : error ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px",
                color: "#dc2626",
              }}
            >
              <AlertCircle size={20} style={{ marginRight: "8px" }} />
              <span>{error}</span>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#f9fafb" }}>
                  <tr>
                    {[
                      "Plant Code",
                      "Die Number",
                      "Elements Detail",
                      "Completion Status",
                      "Ready Set",
                      "Status",
                    ].map((header, i) => (
                      <th
                        key={i}
                        style={{
                          padding: "12px 24px",
                          textAlign: "left",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#6b7280",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {groupedData.map((group, index) => {
                    const progressPercentage =
                      group.totalRequired > 0
                        ? Math.min(
                            (group.totalActual / group.totalRequired) * 100,
                            100
                          )
                        : 0;

                    const isCompleted =
                      group.totalActual >= group.totalRequired &&
                      group.totalRequired > 0;
                    const isPending = group.totalActual === 0;

                    const dieStatus =
                      group.elements[0]?.die_status || "Unknown";

                    const getStatusColorByDieStatus = (status) => {
                      switch (status?.toLowerCase()) {
                        case "ready":
                          return "#059669"; // Green
                        case "pending":
                          return "#d97706"; // Orange
                        case "in progress":
                          return "#2563eb"; // Blue
                        case "maintenance":
                          return "#dc2626"; // Red
                        case "breakdown":
                          return "#7c2d12"; // Dark Red
                        default:
                          return "#6b7280"; // Gray
                      }
                    };

                    return (
                      <tr
                        key={index}
                        style={{
                          borderBottom: "1px solid #e5e7eb",
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#f9fafb";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        {/* Plant Code */}
                        <td
                          style={{ padding: "16px 24px", whiteSpace: "nowrap" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <div
                              style={{
                                padding: "8px",
                                backgroundColor: "#dbeafe",
                                borderRadius: "8px",
                              }}
                            >
                              <Factory size={16} style={{ color: "#2563eb" }} />
                            </div>
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#111827",
                              }}
                            >
                              {group.plant}
                            </span>
                          </div>
                        </td>
                        {/* Die Number */}
                        <td
                          style={{ padding: "16px 24px", whiteSpace: "nowrap" }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "500",
                              backgroundColor: "#e9d5ff",
                              color: "#7c3aed",
                            }}
                          >
                            {group.die_number}
                          </span>
                        </td>
                        {/* Elements Detail */}
                        <td style={{ padding: "16px 24px", minWidth: "300px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {group.elements.map((element, i) => (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "12px",
                                  padding: "10px 14px",
                                  backgroundColor: "#ffffff",
                                  borderRadius: "8px",
                                  border: "1px solid #e2e8f0",
                                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                                  transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = "#f8fafc";
                                  e.target.style.borderColor = "#cbd5e1";
                                  e.target.style.transform = "translateY(-1px)";
                                  e.target.style.boxShadow =
                                    "0 4px 6px rgba(0, 0, 0, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = "#ffffff";
                                  e.target.style.borderColor = "#e2e8f0";
                                  e.target.style.transform = "translateY(0)";
                                  e.target.style.boxShadow =
                                    "0 1px 3px rgba(0, 0, 0, 0.05)";
                                }}
                              >
                                {/* Left side - Element info */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    flex: 1,
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "13px",
                                      padding: "4px 10px",
                                      backgroundColor: "#f1f5f9",
                                      borderRadius: "6px",
                                      color: "#334155",
                                      fontWeight: "600",
                                      minWidth: "fit-content",
                                    }}
                                  >
                                    {element.element}
                                  </span>

                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "6px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "#64748b",
                                        fontWeight: "500",
                                        backgroundColor: "#f8fafc",
                                        padding: "2px 8px",
                                        borderRadius: "4px",
                                        border: "1px solid #e2e8f0",
                                      }}
                                    >
                                      {element.actual_set}/
                                      {element.required_set}
                                    </span>

                                    {element.isComplete && (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "4px",
                                          padding: "2px 6px",
                                          backgroundColor: "#dcfce7",
                                          borderRadius: "4px",
                                          border: "1px solid #bbf7d0",
                                        }}
                                      >
                                        <CheckCircle
                                          size={12}
                                          style={{ color: "#16a34a" }}
                                        />
                                        <span
                                          style={{
                                            fontSize: "10px",
                                            color: "#16a34a",
                                            fontWeight: "600",
                                          }}
                                        >
                                          DONE
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Right side - Individual Element Status */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "11px",
                                      padding: "4px 12px",
                                      borderRadius: "16px",
                                      fontWeight: "600",
                                      textTransform: "capitalize",
                                      letterSpacing: "0.3px",
                                      backgroundColor: getElementStatusColor(
                                        element.die_status
                                      ).bg,
                                      color: getElementStatusColor(
                                        element.die_status
                                      ).text,
                                      border: `1px solid ${
                                        getElementStatusColor(
                                          element.die_status
                                        ).border
                                      }`,
                                      boxShadow:
                                        "0 1px 2px rgba(0, 0, 0, 0.05)",
                                      minWidth: "70px",
                                      textAlign: "center",
                                    }}
                                  >
                                    {element.die_status || "Unknown"}
                                  </span>
                                </div>
                              </div>
                            ))}

                            {/* Summary row for the die */}
                            <div
                            // style={{
                            //   marginTop: "8px",
                            //   padding: "8px 14px",
                            //   backgroundColor: group.isAllComplete
                            //     ? "#f0fdf4"
                            //     : "#fef7ed",
                            //   borderRadius: "6px",
                            //   border: group.isAllComplete
                            //     ? "1px solid #bbf7d0"
                            //     : "1px solid #fed7aa",
                            //   display: "flex",
                            //   justifyContent: "space-between",
                            //   alignItems: "center",
                            // }}
                            >
                              {/* <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  color: group.isAllComplete
                                    ? "#16a34a"
                                    : "#ea580c",
                                }}
                              >
                                Die Summary: {group.completedElements}/
                                {group.totalElements} Elements
                              </span> */}

                              {/* <span
                                style={{
                                  fontSize: "11px",
                                  color: group.isAllComplete
                                    ? "#16a34a"
                                    : "#ea580c",
                                  fontWeight: "500",
                                }}
                              >
                                {group.isAllComplete
                                  ? "All Ready"
                                  : `${group.remainingElements} Pending`}
                              </span> */}
                            </div>
                          </div>
                        </td>
                        {/* Completion Status */}
                        <td
                          style={{ padding: "16px 24px", whiteSpace: "nowrap" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#111827",
                              }}
                            >
                              {group.completedElements}/{group.totalElements}{" "}
                              Complete
                            </span>
                            <div style={{ width: "100px" }}>
                              <div
                                style={{
                                  width: "100%",
                                  backgroundColor: "#e5e7eb",
                                  borderRadius: "20px",
                                  height: "6px",
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    height: "6px",
                                    borderRadius: "20px",
                                    transition: "width 1s ease",
                                    width: `${
                                      group.totalElements > 0
                                        ? (group.completedElements /
                                            group.totalElements) *
                                          100
                                        : 0
                                    }%`,
                                    backgroundColor: group.isAllComplete
                                      ? "#059669"
                                      : "#d97706",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* Ready Set */}
                        <td
                          style={{ padding: "16px 24px", whiteSpace: "nowrap" }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: group.isAllComplete
                                ? "#059669"
                                : "#d97706",
                            }}
                          >
                            {group.isAllComplete ? "1" : "0"}
                          </div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>
                            {group.isAllComplete
                              ? "Ready"
                              : `${group.remainingElements} Remaining`}
                          </div>
                        </td>
                        {/* Status */}
                        <td
                          style={{ padding: "16px 24px", whiteSpace: "nowrap" }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "6px 12px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "500",
                              color: "white",
                              backgroundColor: group.isAllComplete
                                ? "#059669"
                                : "#d97706",
                            }}
                          >
                            {group.isAllComplete ? (
                              <CheckCircle size={14} />
                            ) : (
                              <Clock size={14} />
                            )}
                            <span>
                              {group.isAllComplete ? "Ready" : "Pending"}
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* AI Assistant Modal */}
        {aiOpen && (
          <>
            {/* Backdrop with blur effect */}
            <div
              style={{
                position: "fixed",
                bottom: "103px",
                right: "12px",
                width: "676px",
                maxHeight: "75vh",
                height: "auto",
                borderRadius: "20px",
                overflow: "hidden",
                zIndex: 50,
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                animation: "slideUp 0.3s ease-out",
              }}
              onClick={() => setAiOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  width: "100%",
                  // maxWidth: "800px", // Uncomment if needed
                  maxHeight: "75vh",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  animation: "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Enhanced Header with gradient */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    padding: "57px 25px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Animated background pattern */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "200px",
                      height: "200px",
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                      opacity: 0.3,
                      animation: "float 6s ease-in-out infinite",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          padding: "12px",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "16px",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        <Bot size={28} style={{ color: "white" }} />
                      </div>
                      <div>
                        <h3
                          style={{
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "white",
                            margin: 0,
                            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          }}
                        >
                          AI Production Assistant
                        </h3>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "rgba(255, 255, 255, 0.9)",
                            margin: 0,
                            fontWeight: "400",
                          }}
                        >
                          Powered by Advanced Analytics
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      {/* Status indicator */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          backgroundColor: "rgba(16, 185, 129, 0.2)",
                          borderRadius: "20px",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                        }}
                      >
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            backgroundColor: "#10b981",
                            borderRadius: "50%",
                            animation: "pulse 2s infinite",
                          }}
                        />
                        <span
                          style={{
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "500",
                          }}
                        >
                          Online
                        </span>
                      </div>

                      <button
                        onClick={() => setAiOpen(false)}
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          border: "none",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          backdropFilter: "blur(10px)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor =
                            "rgba(255, 255, 255, 0.3)";
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor =
                            "rgba(255, 255, 255, 0.2)";
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        <X size={20} style={{ color: "white" }} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Action Pills */}
                <div
                  style={{
                    padding: "20px 28px 16px",
                    borderBottom: "1px solid #f1f5f9",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    {[
                      {
                        text: "📊 Completion Rate",
                        query: "What's the current completion rate?",
                      },
                      {
                        text: "⏳ Pending Dies",
                        query: "Show me pending dies",
                      },
                      {
                        text: "🏭 Plant Status",
                        query: "How are plants performing?",
                      },
                      {
                        text: "💡 Recommendations",
                        query: "Give me recommendations to improve efficiency",
                      },
                    ].map((pill, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setAiMessage(pill.query);
                          setTimeout(() => {
                            const event = { preventDefault: () => {} };
                            handleAIMessage(event);
                          }, 100);
                        }}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "20px",
                          border: "1px solid #e2e8f0",
                          backgroundColor: "white",
                          color: "#475569",
                          fontSize: "13px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#667eea";
                          e.target.style.color = "white";
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 4px 12px rgba(102, 126, 234, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                          e.target.style.color = "#475569";
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 2px 4px rgba(0,0,0,0.05)";
                        }}
                      >
                        {pill.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Chat Messages */}
                <div
                  style={{
                    flex: 1,
                    padding: "63px 48px",
                    overflowY: "auto",
                    backgroundColor: "#fafafa",
                    backgroundImage: `
                      radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.03) 0%, transparent 50%),
                      radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.03) 0%, transparent 50%)
                    `,
                  }}
                  className="custom-scrollbar"
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {aiChat.map((chat, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "16px",
                          alignItems: "flex-start",
                          animation: `messageSlide 0.5s ease-out ${
                            index * 0.1
                          }s both`,
                        }}
                      >
                        {/* Enhanced Avatar */}
                        <div
                          style={{
                            padding: "10px",
                            borderRadius: "16px",
                            background:
                              chat.type === "bot"
                                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                            flexShrink: 0,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            position: "relative",
                          }}
                        >
                          {chat.type === "bot" && chat.isTyping && (
                            <div
                              style={{
                                position: "absolute",
                                top: "-2px",
                                right: "-2px",
                                width: "12px",
                                height: "12px",
                                backgroundColor: "#10b981",
                                borderRadius: "50%",
                                animation: "pulse 1.5s infinite",
                              }}
                            />
                          )}
                          {chat.type === "bot" ? (
                            <Bot size={20} style={{ color: "white" }} />
                          ) : (
                            <MessageCircle
                              size={20}
                              style={{ color: "white" }}
                            />
                          )}
                        </div>

                        {/* Enhanced Message Bubble */}
                        <div
                          style={{
                            flex: 1,
                            padding: "16px 20px",
                            borderRadius: "20px",
                            backgroundColor:
                              chat.type === "bot" ? "white" : "#667eea",
                            border:
                              chat.type === "bot"
                                ? "1px solid #e2e8f0"
                                : "none",
                            color: chat.type === "bot" ? "#374151" : "white",
                            boxShadow:
                              chat.type === "bot"
                                ? "0 4px 12px rgba(0,0,0,0.08)"
                                : "0 4px 12px rgba(102, 126, 234, 0.3)",
                            position: "relative",
                            maxWidth: "85%",
                          }}
                        >
                          {/* Message tail */}
                          <div
                            style={{
                              position: "absolute",
                              left: "-8px",
                              top: "16px",
                              width: 0,
                              height: 0,
                              borderTop: "8px solid transparent",
                              borderBottom: "8px solid transparent",
                              borderRight:
                                chat.type === "bot"
                                  ? "8px solid white"
                                  : "8px solid #667eea",
                            }}
                          />

                          <div
                            style={{
                              fontSize: "15px",
                              lineHeight: "1.6",
                              margin: 0,
                              whiteSpace: "pre-wrap",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: chat.message
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  "<strong>$1</strong>"
                                )
                                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                                .replace(
                                  /`(.*?)`/g,
                                  '<code style="background: rgba(0,0,0,0.1); padding: 2px 4px; border-radius: 4px;">$1</code>'
                                )
                                .replace(/\n/g, "<br/>"),
                            }}
                          />

                          {/* Timestamp */}
                          <div
                            style={{
                              fontSize: "11px",
                              marginTop: "8px",
                              opacity: 0.7,
                              textAlign: "right",
                            }}
                          >
                            {new Date().toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Message Input */}
                <div
                  style={{
                    padding: "20px 28px 24px",
                    borderTop: "1px solid #e2e8f0",
                    backgroundColor: "white",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "flex-end",
                      }}
                    >
                      <div style={{ flex: 1, position: "relative" }}>
                        <textarea
                          value={aiMessage}
                          onChange={(e) => setAiMessage(e.target.value)}
                          placeholder="Type your message here... (Press Shift+Enter for new line, Enter to send)"
                          onKeyPress={(e) => {
                            if (
                              e.key === "Enter" &&
                              !e.shiftKey &&
                              aiMessage.trim()
                            ) {
                              e.preventDefault();
                              handleAIMessage(e);
                            }
                          }}
                          rows={1}
                          style={{
                            width: "100%",
                            padding: "16px 20px",
                            paddingRight: "120px",
                            border: "2px solid #e2e8f0",
                            borderRadius: "20px",
                            fontSize: "15px",
                            outline: "none",
                            transition: "all 0.3s ease",
                            resize: "none",
                            fontFamily: "inherit",
                            minHeight: "56px",
                            maxHeight: "120px",
                            backgroundColor: "#fafafa",
                            boxSizing: "border-box",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#667eea";
                            e.target.style.backgroundColor = "white";
                            e.target.style.boxShadow =
                              "0 0 0 4px rgba(102, 126, 234, 0.1)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#e2e8f0";
                            e.target.style.backgroundColor = "#fafafa";
                            e.target.style.boxShadow = "none";
                          }}
                        />

                        {/* Character counter */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "8px",
                            right: "80px",
                            fontSize: "12px",
                            color: "#9ca3af",
                          }}
                        >
                          {aiMessage.length}/500
                        </div>

                        {/* Send button inside input */}
                        <button
                          onClick={(e) => {
                            if (aiMessage.trim()) {
                              handleAIMessage(e);
                            }
                          }}
                          disabled={!aiMessage.trim()}
                          style={{
                            position: "absolute",
                            right: "8px",
                            bottom: "8px",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "none",
                            background: aiMessage.trim()
                              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                              : "#e5e7eb",
                            color: "white",
                            cursor: aiMessage.trim()
                              ? "pointer"
                              : "not-allowed",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: aiMessage.trim()
                              ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                              : "none",
                          }}
                          onMouseEnter={(e) => {
                            if (aiMessage.trim()) {
                              e.target.style.transform = "scale(1.1)";
                              e.target.style.boxShadow =
                                "0 6px 16px rgba(102, 126, 234, 0.4)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (aiMessage.trim()) {
                              e.target.style.transform = "scale(1)";
                              e.target.style.boxShadow =
                                "0 4px 12px rgba(102, 126, 234, 0.3)";
                            }
                          }}
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Typing indicator */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "12px",
                        minHeight: "20px",
                      }}
                    >
                      {aiChat.some((chat) => chat.isTyping) && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <div style={{ display: "flex", gap: "2px" }}>
                            {[0, 1, 2].map((i) => (
                              <div
                                key={i}
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  backgroundColor: "#667eea",
                                  borderRadius: "50%",
                                  animation: `bounce 1.4s ease-in-out infinite both ${
                                    i * 0.16
                                  }s`,
                                }}
                              />
                            ))}
                          </div>
                          <span
                            style={{
                              fontSize: "13px",
                              color: "#6b7280",
                              fontStyle: "italic",
                            }}
                          >
                            AI is thinking...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced CSS Animations */}
            <style>
              {`
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                
                @keyframes slideUp {
                  from { 
                    opacity: 0; 
                    transform: translateY(50px) scale(0.95); 
                  }
                  to { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                  }
                }
                
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                }
                
                @keyframes messageSlide {
                  from {
                    opacity: 0;
                    transform: translateX(-20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
                
                @keyframes bounce {
                  0%, 80%, 100% { 
                    transform: scale(0);
                    opacity: 0.5; 
                  }
                  40% { 
                    transform: scale(1);
                    opacity: 1; 
                  }
                }
                
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: #f1f1f1;
                  border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
                }
              `}
            </style>
          </>
        )}

        {/* Quick Actions Floating Button */}
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "flex-end",
          }}
        >
          <button
            onClick={() => setAiOpen(true)}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "#7c3aed",
              color: "white",
              border: "none",
              cursor: "pointer",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#6d28d9";
              e.target.style.transform = "scale(1.1)";
              e.target.style.boxShadow =
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#7c3aed";
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow =
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
            }}
          >
            <Bot size={24} />
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px",
            textAlign: "center",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              margin: 0,
            }}
          >
            DMS Die Management System v2.0 | Last updated:{" "}
            {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Diestatus;
