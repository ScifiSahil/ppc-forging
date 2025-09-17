import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Factory,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Bot,
  Send,
  X,
  Maximize2,
  Minimize2,
  Zap,
  BarChart3,
  AlertCircle,
  Settings,
  RefreshCw,
  WifiOff,
  Loader2,
} from "lucide-react";

const ScheduleSummary = () => {
  const [selectedPlant, setSelectedPlant] = useState("all");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "👋 Hey! I'm your AI Manufacturing Assistant. I can help you optimize production, predict bottlenecks, and make data-driven decisions. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef(null);

  // API Configuration
  const API_URL =
    "https://ktflceprd.kalyanicorp.com/api/v1/collection/kln_schedule_summary";
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000; // 2 seconds

  // Fetch data from API
  const fetchApiData = async (isRetry = false) => {
    try {
      if (!isRetry) {
        setLoading(true);
        setError(null);
      }

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 10000, // 10 seconds timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Validate data structure
      if (!data || !data.objects || !Array.isArray(data.objects)) {
        throw new Error("Invalid data format received from API");
      }

      // Transform API data to match expected structure
      const transformedData = data.objects.map((item) => ({
        month_machine_capacity: item.month_machine_capacity || 0,
        plant_code: item.plant_code || "Unknown",
        pre_forge_press: item.pre_forge_press || "Unknown",
        remaining_capacity: item.remaining_capacity || 0,
        total_order_qty: item.total_order_qty || 0,
      }));

      setApiData(transformedData);
      setLastUpdated(new Date());
      setError(null);
      setRetryCount(0);
    } catch (err) {
      console.error("API Error:", err);

      // Classify error types for better user experience
      let errorType = "api";
      let errorMessage = "Failed to fetch data";

      if (err.name === "TypeError" || err.message.includes("fetch")) {
        errorType = "network";
        errorMessage =
          "Network connection error - please check your internet connection";
      } else if (err.message.includes("timeout")) {
        errorType = "timeout";
        errorMessage =
          "Request timed out - server is taking too long to respond";
      } else if (err.message.includes("404")) {
        errorType = "not_found";
        errorMessage = "API endpoint not found - please contact support";
      } else if (
        err.message.includes("500") ||
        err.message.includes("502") ||
        err.message.includes("503")
      ) {
        errorType = "server";
        errorMessage = "Server error - the system is temporarily unavailable";
      } else if (err.message.includes("401") || err.message.includes("403")) {
        errorType = "auth";
        errorMessage = "Authentication error - please refresh the page";
      } else {
        errorMessage = err.message || errorMessage;
      }

      setError({
        message: errorMessage,
        type: errorType,
        timestamp: new Date(),
        retryable: errorType !== "not_found" && errorType !== "auth",
      });

      // Auto retry logic - only for retryable errors
      if (
        retryCount < MAX_RETRIES &&
        !isRetry &&
        errorType !== "not_found" &&
        errorType !== "auth"
      ) {
        setRetryCount((prev) => prev + 1);
        setTimeout(() => {
          fetchApiData(true);
        }, RETRY_DELAY * (retryCount + 1)); // Exponential backoff
      }
    } finally {
      if (!isRetry) {
        setLoading(false);
      }
    }
  };

  // Manual refresh
  const handleRefresh = () => {
    setRetryCount(0);
    fetchApiData();
  };

  // 2. Add this function after your existing functions (around line 200)
  const handlePieClick = (data) => {
    const statusMap = {
      Overloaded: "overloaded",
      Optimal: "optimal",
      "Under-utilized": "underutilized",
    };

    const clickedStatus = statusMap[data.name];

    // Toggle selection - if already selected, deselect
    if (selectedStatus === clickedStatus) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(clickedStatus);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchApiData();

    // Set up auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchApiData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Process data with error handling
  const processedData = useMemo(() => {
    if (!apiData.length) return [];

    try {
      return apiData.map((item) => ({
        ...item,
        utilization:
          item.month_machine_capacity > 0
            ? (
                (item.total_order_qty / item.month_machine_capacity) *
                100
              ).toFixed(1)
            : "0.0",
        status:
          item.remaining_capacity < 0
            ? "overloaded"
            : item.remaining_capacity > item.month_machine_capacity * 0.2
            ? "underutilized"
            : "optimal",
      }));
    } catch (err) {
      console.error("Data processing error:", err);
      return [];
    }
  }, [apiData]);

  const filteredData = useMemo(() => {
    let data =
      selectedPlant === "all"
        ? processedData
        : processedData.filter(
            (item) => item.plant_code.toString() === selectedPlant
          );

    // Apply status filter if selected
    if (selectedStatus) {
      data = data.filter((item) => item.status === selectedStatus);
    }

    return data;
  }, [processedData, selectedPlant, selectedStatus]);

  // Replace your existing plantSummary useMemo (around line 140) with this updated version:
  const plantSummary = useMemo(() => {
    if (!processedData.length) return [];

    try {
      // Start with all processed data
      let dataToProcess = processedData;

      // Apply selectedPlant filter FIRST - this is the key fix
      if (selectedPlant !== "all") {
        dataToProcess = dataToProcess.filter(
          (item) => item.plant_code.toString() === selectedPlant
        );
      }

      // Then apply selectedStatus filter if any
      if (selectedStatus) {
        dataToProcess = dataToProcess.filter(
          (item) => item.status === selectedStatus
        );
      }

      // Group by plant code
      const plants = {};
      dataToProcess.forEach((item) => {
        const plantCode = item.plant_code.toString();

        if (!plants[plantCode]) {
          plants[plantCode] = {
            plant_code: plantCode,
            total_capacity: 0,
            total_orders: 0,
            machines: 0,
            overloaded_machines: 0,
            optimal_machines: 0,
            underutilized_machines: 0,
            status_filter: selectedStatus || "all",
            plant_filter: selectedPlant || "all",
            machines_by_status: {
              overloaded: [],
              optimal: [],
              underutilized: [],
            },
          };
        }

        const plant = plants[plantCode];
        plant.total_capacity += item.month_machine_capacity || 0;
        plant.total_orders += item.total_order_qty || 0;
        plant.machines += 1;

        // Count machines by status
        if (item.status === "overloaded") {
          plant.overloaded_machines += 1;
          plant.machines_by_status.overloaded.push(item.pre_forge_press);
        } else if (item.status === "optimal") {
          plant.optimal_machines += 1;
          plant.machines_by_status.optimal.push(item.pre_forge_press);
        } else if (item.status === "underutilized") {
          plant.underutilized_machines += 1;
          plant.machines_by_status.underutilized.push(item.pre_forge_press);
        }
      });

      // Convert to array and calculate utilization
      const plantsArray = Object.values(plants).map((plant) => ({
        ...plant,
        utilization:
          plant.total_capacity > 0
            ? ((plant.total_orders / plant.total_capacity) * 100).toFixed(1)
            : "0.0",
        efficiency_score:
          plant.total_capacity > 0
            ? Math.min(
                100,
                (plant.total_orders / plant.total_capacity) * 100
              ).toFixed(1)
            : "0.0",
      }));

      // Sort plants by utilization (highest first) for systematic display
      return plantsArray
        .filter((plant) => plant.machines > 0)
        .sort((a, b) => parseFloat(b.utilization) - parseFloat(a.utilization));
    } catch (err) {
      console.error("Plant summary processing error:", err);
      return [];
    }
  }, [processedData, selectedStatus, selectedPlant]);
  // Add selectedPlant as dependency // Add selectedStatus as dependency

  const chartData = filteredData
    .map((item) => ({
      machine: item.pre_forge_press,
      capacity: item.month_machine_capacity,
      orders: item.total_order_qty,
      utilization: parseFloat(item.utilization),
    }))
    // ✅ descending order ke liye capacity ya orders ke basis pe sort
    .sort((a, b) => b.capacity - a.capacity);

  const statusColors = {
    overloaded: "#ef4444",
    optimal: "#10b981",
    underutilized: "#f59e0b",
  };

  const pieData = [
    {
      name: "Overloaded",
      value: processedData.filter((item) => item.status === "overloaded")
        .length,
      color: "#ef4444",
    },
    {
      name: "Optimal",
      value: processedData.filter((item) => item.status === "optimal").length,
      color: "#10b981",
    },
    {
      name: "Under-utilized",
      value: processedData.filter((item) => item.status === "underutilized")
        .length,
      color: "#f59e0b",
    },
  ];

  // AI Chat functionality with API data integration
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Handle different API error types in AI responses
    if (error) {
      const errorIcon =
        error.type === "network"
          ? "🌐"
          : error.type === "timeout"
          ? "⏱️"
          : error.type === "server"
          ? "🛠️"
          : error.type === "auth"
          ? "🔐"
          : "🔴";
      const errorTitle =
        error.type === "network"
          ? "Network Connection Issue"
          : error.type === "timeout"
          ? "Server Response Timeout"
          : error.type === "server"
          ? "Server Maintenance"
          : error.type === "auth"
          ? "Authentication Required"
          : "System Alert";

      const canRetry = error.retryable
        ? `**Auto-retry**: ${retryCount}/${MAX_RETRIES} attempts made`
        : "**Manual action required**";

      return `${errorIcon} **${errorTitle}**: I'm currently unable to access real-time production data.

**Issue**: ${error.message}
**Timestamp**: ${error.timestamp.toLocaleTimeString()}
${canRetry}

**What I can still help with:**
• General production optimization strategies
• Manufacturing best practices
• Capacity planning guidance
• Process improvement recommendations
• Historical data analysis techniques

${
  error.retryable
    ? "The system is automatically retrying. Please wait or try refreshing manually."
    : "Please contact your system administrator or try refreshing the page."
}`;
    }

    if (!processedData.length) {
      return `**No Production Data Available**

I don't have any production data to analyze right now. This could be because:
• The system is still loading data
• No scheduled production for this period
• Temporary data synchronization issues

**Try asking me about:**
• General manufacturing strategies
• Production planning best practices
• Optimization methodologies

Or wait for the data to load and ask me again!`;
    }

    // Calculate insights for responses with real API data
    const overloadedMachines = processedData.filter(
      (item) => item.status === "overloaded"
    );
    const underutilizedMachines = processedData.filter(
      (item) => item.status === "underutilized"
    );
    const totalCapacity = processedData.reduce(
      (sum, item) => sum + (item.month_machine_capacity || 0),
      0
    );
    const totalOrders = processedData.reduce(
      (sum, item) => sum + (item.total_order_qty || 0),
      0
    );
    const overallUtilization =
      totalCapacity > 0
        ? ((totalOrders / totalCapacity) * 100).toFixed(1)
        : "0.0";

    if (
      message.includes("optimize") ||
      message.includes("suggestion") ||
      message.includes("recommend")
    ) {
      const topOverloaded = overloadedMachines.sort(
        (a, b) => a.remaining_capacity - b.remaining_capacity
      )[0];
      const topUnderutilized = underutilizedMachines.sort(
        (a, b) => b.remaining_capacity - a.remaining_capacity
      )[0];

      return `**Real-time Production Optimization:**

**Current Status** (Last updated: ${lastUpdated?.toLocaleTimeString()}):
• Total machines analyzed: ${processedData.length}
• Overall utilization: ${overallUtilization}%
• Overloaded machines: ${overloadedMachines.length}

**Immediate Actions:**
${
  topOverloaded
    ? `• Redistribute ${Math.abs(
        topOverloaded.remaining_capacity
      ).toLocaleString()} units from ${topOverloaded.pre_forge_press}`
    : "• All machines within capacity limits"
}
${
  topUnderutilized
    ? `• ${
        topUnderutilized.pre_forge_press
      } has ${topUnderutilized.remaining_capacity.toLocaleString()} units available`
    : "• No underutilized capacity available"
}

**Strategic Recommendations:**
• Implement load balancing between plants
• Consider cross-training operators for flexibility
• Schedule maintenance during low-demand periods`;
    }

    if (
      message.includes("predict") ||
      message.includes("forecast") ||
      message.includes("future")
    ) {
      const plantGroups = {};
      processedData.forEach((item) => {
        if (!plantGroups[item.plant_code]) {
          plantGroups[item.plant_code] = {
            capacity: 0,
            orders: 0,
            machines: 0,
          };
        }
        plantGroups[item.plant_code].capacity += item.month_machine_capacity;
        plantGroups[item.plant_code].orders += item.total_order_qty;
        plantGroups[item.plant_code].machines += 1;
      });

      return `**AI Production Forecast** (Based on current data):

**Plant Performance Analysis:**
${Object.entries(plantGroups)
  .map(
    ([plant, data]) =>
      `• Plant ${plant}: ${((data.orders / data.capacity) * 100).toFixed(
        1
      )}% utilization (${data.machines} machines)`
  )
  .join("\n")}

**Predictive Insights:**
• High-risk machines: ${overloadedMachines
        .slice(0, 3)
        .map((m) => m.pre_forge_press)
        .join(", ")}
• Optimization potential: ${
        underutilizedMachines.length > 0
          ? `${underutilizedMachines.length} machines have spare capacity`
          : "All machines at capacity"
      }
• Recommended capacity adjustment: ${
        totalCapacity > totalOrders
          ? "Consider redistributing load"
          : "May need capacity expansion"
      }

**Data freshness**: ${
        lastUpdated
          ? `Updated ${Math.round(
              (new Date() - lastUpdated) / 60000
            )} minutes ago`
          : "Real-time"
      }`;
    }

    if (
      message.includes("bottleneck") ||
      message.includes("problem") ||
      message.includes("issue")
    ) {
      const criticalMachines = overloadedMachines.sort(
        (a, b) => a.remaining_capacity - b.remaining_capacity
      );

      return `**Real-time Bottleneck Analysis:**

**Critical Bottlenecks Identified:**
${criticalMachines
  .slice(0, 5)
  .map(
    (machine, index) =>
      `${index + 1}. **${machine.pre_forge_press}**: ${(
        (machine.total_order_qty / machine.month_machine_capacity) *
        100
      ).toFixed(1)}% loaded (${Math.abs(
        machine.remaining_capacity
      ).toLocaleString()} over capacity)`
  )
  .join("\n")}

**Available Capacity:**
${
  underutilizedMachines
    .slice(0, 3)
    .map(
      (machine) =>
        `• ${
          machine.pre_forge_press
        }: ${machine.remaining_capacity.toLocaleString()} units available`
    )
    .join("\n") || "• No spare capacity available"
}

**Smart Solutions:**
• Immediate load redistribution needed
• Consider overtime scheduling for critical machines
• Implement priority queuing system
• Cross-plant coordination recommended

**Impact Assessment**: ${overloadedMachines.length}/${
        processedData.length
      } machines overloaded`;
    }

    if (
      message.includes("status") ||
      message.includes("current") ||
      message.includes("now")
    ) {
      return `**Current Production Status** (Live Data):

**System Health:**
• API Status: ${error ? "🔴 Error" : "🟢 Connected"}
• Data Age: ${
        lastUpdated
          ? `${Math.round((new Date() - lastUpdated) / 60000)}min ago`
          : "Loading..."
      }
• Total Machines: ${processedData.length}

**Performance Overview:**
• Overall Utilization: ${overallUtilization}%
• Total Monthly Capacity: ${totalCapacity.toLocaleString()} units
• Total Orders: ${totalOrders.toLocaleString()} units
• Available Capacity: ${(totalCapacity - totalOrders).toLocaleString()} units

**Machine Status Distribution:**
🔴 Overloaded: ${overloadedMachines.length} machines
🟢 Optimal: ${
        processedData.filter((item) => item.status === "optimal").length
      } machines  
🟡 Under-utilized: ${underutilizedMachines.length} machines

Need specific analysis for any machine or plant?`;
    }

    // Default response with current data
    return `🤖 I understand you're asking about "${userMessage}".

**Current Production Snapshot:**
• Active Machines: ${processedData.length}
• System Utilization: ${overallUtilization}%
• Overloaded Units: ${overloadedMachines.length}
• Available Capacity: ${underutilizedMachines.length} machines

**How I can help:**
💡 Ask "optimize production" for actionable recommendations
💡 Say "find bottlenecks" to identify problem areas
💡 Try "current status" for detailed system overview
💡 Request "predict trends" for forecasting insights

**Data Status**: ${error ? "Limited (API issues)" : "Live data connected"}`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        text: getAIResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const quickActions = [
    {
      icon: <Zap size={16} />,
      text: "Optimize Production",
      action: () => setInputValue("optimize production"),
    },
    {
      icon: <BarChart3 size={16} />,
      text: "Current Status",
      action: () => setInputValue("current status"),
    },
    {
      icon: <AlertCircle size={16} />,
      text: "Find Bottlenecks",
      action: () => setInputValue("identify bottlenecks"),
    },
    {
      icon: <Settings size={16} />,
      text: "Maintenance Plan",
      action: () => setInputValue("maintenance schedule"),
    },
  ];

  // Error Display Component
  const ErrorDisplay = () => (
    <div
      style={{
        background: "rgba(239, 68, 68, 0.1)",
        border: "1px solid rgba(239, 68, 68, 0.2)",
        borderRadius: "12px",
        padding: "20px",
        margin: "20px 0",
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <WifiOff size={24} color="#ef4444" />
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: "0 0 8px 0", color: "#ef4444" }}>
          Connection Error
        </h4>
        <p style={{ margin: "0 0 8px 0", color: "#64748b" }}>{error.message}</p>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#94a3b8" }}>
          Last attempt: {error.timestamp.toLocaleTimeString()}
          {retryCount > 0 && ` • Retry ${retryCount}/${MAX_RETRIES}`}
        </p>
      </div>
      <button
        onClick={handleRefresh}
        disabled={loading}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
        ) : (
          <RefreshCw size={16} />
        )}
        Retry
      </button>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgb(241, 245, 249) 0%, rgb(226, 232, 240) 50%, rgb(203, 213, 225) 100%)",
        padding: "20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          padding: "25px",
          marginBottom: "30px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.18)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                padding: "8px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(102, 126, 234, 0.2)",
              }}
            >
              <Factory size={24} color="white" />
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "1.8rem",
                  color: "#1e293b",
                  fontWeight: "600",
                }}
              >
                Schedule Summary
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <select
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              disabled={loading || error}
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                border: "2px solid #e2e8f0",
                background: "white",
                fontSize: "16px",
                cursor: loading || error ? "not-allowed" : "pointer",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                opacity: loading || error ? 0.7 : 1,
              }}
            >
              <option value="all">All Plants</option>
              {[...new Set(processedData.map((item) => item.plant_code))].map(
                (plantCode) => (
                  <option key={plantCode} value={plantCode}>
                    Plant {plantCode}
                  </option>
                )
              )}
            </select>

            <button
              onClick={handleRefresh}
              disabled={loading}
              style={{
                background: loading
                  ? "#e2e8f0"
                  : "linear-gradient(45deg, #667eea, #764ba2)",
                color: loading ? "#94a3b8" : "white",
                border: "none",
                padding: "12px 16px",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: loading ? "none" : "0 4px 8px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
              title={
                lastUpdated
                  ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
                  : "Refresh data"
              }
            >
              {loading ? (
                <Loader2
                  size={16}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : (
                <RefreshCw size={16} />
              )}
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* Error Display - Only show critical errors */}
      {error && error.type === "critical" && <ErrorDisplay />}

      {/* Main Content - Always show with loading states */}
      <div>
        {(loading || error) && (
          <div
            style={{
              background: loading
                ? "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)",
              border: loading
                ? "1px solid rgba(102, 126, 234, 0.2)"
                : "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: "12px",
              padding: "15px 20px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              animation: "slideIn 0.3s ease-out",
            }}
          >
            {loading ? (
              <Loader2
                size={20}
                color="#667eea"
                style={{ animation: "spin 1s linear infinite" }}
              />
            ) : (
              <WifiOff size={20} color="#ef4444" />
            )}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: "600",
                  color: loading ? "#667eea" : "#ef4444",
                  marginBottom: "4px",
                }}
              >
                {loading ? "Loading Production Data..." : "Connection Issues"}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                }}
              >
                {loading
                  ? "Please wait while we fetch real-time manufacturing data"
                  : `${
                      error.message
                    } • Last attempt: ${error.timestamp.toLocaleTimeString()}`}
              </div>
            </div>
            {error && error.retryable && (
              <button
                onClick={handleRefresh}
                disabled={loading}
                style={{
                  background: error.type === "network" ? "#f59e0b" : "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: loading ? 0.7 : 1,
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
                title={
                  retryCount > 0
                    ? `Retry attempt ${retryCount}/${MAX_RETRIES}`
                    : "Retry connection"
                }
              >
                {loading ? (
                  <Loader2
                    size={14}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  <RefreshCw size={14} />
                )}
                {retryCount > 0
                  ? `Retry (${retryCount}/${MAX_RETRIES})`
                  : "Retry"}
              </button>
            )}

            {error && !error.retryable && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "#ef4444",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                {error.type === "auth" ? " Auth Required" : " Service Error"}
              </div>
            )}
          </div>
        )}
        <>
          {/* KPI Cards */}
          <div style={{ marginBottom: "25px" }}>
            {/* Status Filter Header */}
            {selectedStatus && (
              <div
                style={{
                  background:
                    selectedStatus === "overloaded"
                      ? "rgba(239, 68, 68, 0.1)"
                      : selectedStatus === "optimal"
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(245, 158, 11, 0.1)",
                  border: `2px solid ${
                    selectedStatus === "overloaded"
                      ? "#ef4444"
                      : selectedStatus === "optimal"
                      ? "#10b981"
                      : "#f59e0b"
                  }`,
                  borderRadius: "12px",
                  padding: "15px 20px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      background:
                        selectedStatus === "overloaded"
                          ? "#ef4444"
                          : selectedStatus === "optimal"
                          ? "#10b981"
                          : "#f59e0b",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: "20px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                    }}
                  >
                    {selectedStatus === "overloaded"
                      ? "🔴"
                      : selectedStatus === "optimal"
                      ? "🟢"
                      : "🟡"}
                    {selectedStatus.charAt(0).toUpperCase() +
                      selectedStatus.slice(1)}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: "#1e293b" }}>
                      Showing plants with {selectedStatus} machines only
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: "#64748b",
                        fontSize: "0.9rem",
                      }}
                    >
                      {plantSummary.length} plant(s) have {selectedStatus}{" "}
                      machines
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStatus(null)}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  <X size={16} />
                  Show All Plants
                </button>
              </div>
            )}

            {/* Plant Cards Grid */}
            {loading ? (
              // Skeleton Loading Cards
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)", // 4 cards ek row me
                  gap: "15px", // thoda kam gap rakha
                }}
              >
                {[1, 2, 3, 4].map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      padding: "25px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    {/* Skeleton Header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          height: "24px",
                          width: "120px",
                          background:
                            "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer 1.5s infinite",
                          borderRadius: "4px",
                        }}
                      />
                      <div
                        style={{
                          height: "36px",
                          width: "80px",
                          background:
                            "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer 1.5s infinite",
                          borderRadius: "18px",
                        }}
                      />
                    </div>

                    {/* Skeleton Stats Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px",
                        marginBottom: "20px",
                      }}
                    >
                      {[1, 2].map((_, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                          <div
                            style={{
                              height: "14px",
                              width: "100px",
                              background:
                                "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer 1.5s infinite",
                              borderRadius: "4px",
                              marginBottom: "8px",
                              margin: "0 auto 8px auto",
                            }}
                          />
                          <div
                            style={{
                              height: "20px",
                              width: "60px",
                              background:
                                "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer 1.5s infinite",
                              borderRadius: "4px",
                              margin: "0 auto",
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Skeleton Machine Status */}
                    <div
                      style={{
                        background: "#f8fafc",
                        borderRadius: "12px",
                        padding: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <div
                        style={{
                          height: "16px",
                          width: "120px",
                          background:
                            "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer 1.5s infinite",
                          borderRadius: "4px",
                          marginBottom: "12px",
                        }}
                      />
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: "10px",
                        }}
                      >
                        {[1, 2, 3].map((_, i) => (
                          <div key={i} style={{ textAlign: "center" }}>
                            <div
                              style={{
                                height: "28px",
                                width: "40px",
                                background:
                                  "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                                backgroundSize: "200% 100%",
                                animation: "shimmer 1.5s infinite",
                                borderRadius: "4px",
                                marginBottom: "4px",
                                margin: "0 auto 4px auto",
                              }}
                            />
                            <div
                              style={{
                                height: "12px",
                                width: "60px",
                                background:
                                  "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                                backgroundSize: "200% 100%",
                                animation: "shimmer 1.5s infinite",
                                borderRadius: "4px",
                                margin: "0 auto",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skeleton Footer Stats */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "15px",
                        borderTop: "1px solid #e2e8f0",
                      }}
                    >
                      {[1, 2].map((_, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                          <div
                            style={{
                              height: "12px",
                              width: "80px",
                              background:
                                "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer 1.5s infinite",
                              borderRadius: "4px",
                              marginBottom: "6px",
                              margin: "0 auto 6px auto",
                            }}
                          />
                          <div
                            style={{
                              height: "18px",
                              width: "50px",
                              background:
                                "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer 1.5s infinite",
                              borderRadius: "4px",
                              margin: "0 auto",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : plantSummary.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "20px",
                }}
              >
                {plantSummary.map((plant, index) => (
                  <div
                    key={`${plant.plant_code}-${selectedStatus || "all"}`}
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "12px",
                      padding: "8px",
                      minWidth: "0",
                      boxShadow: selectedStatus
                        ? `0 3px 12px ${
                            selectedStatus === "overloaded"
                              ? "rgba(239, 68, 68, 0.15)"
                              : selectedStatus === "optimal"
                              ? "rgba(16, 185, 129, 0.15)"
                              : "rgba(245, 158, 11, 0.15)"
                          }`
                        : "0 2px 8px rgba(0,0,0,0.08)",
                      border: selectedStatus
                        ? `1px solid ${
                            selectedStatus === "overloaded"
                              ? "rgba(239, 68, 68, 0.2)"
                              : selectedStatus === "optimal"
                              ? "rgba(16, 185, 129, 0.2)"
                              : "rgba(245, 158, 11, 0.2)"
                          }`
                        : "1px solid rgba(255,255,255,0.3)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      cursor: "pointer",
                      position: "relative",
                      animation: `slideInUp 0.4s ease-out ${
                        index * 0.08
                      }s both`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = selectedStatus
                        ? `0 6px 20px ${
                            selectedStatus === "overloaded"
                              ? "rgba(239, 68, 68, 0.2)"
                              : selectedStatus === "optimal"
                              ? "rgba(16, 185, 129, 0.2)"
                              : "rgba(245, 158, 11, 0.2)"
                          }`
                        : "0 4px 16px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = selectedStatus
                        ? `0 3px 12px ${
                            selectedStatus === "overloaded"
                              ? "rgba(239, 68, 68, 0.15)"
                              : selectedStatus === "optimal"
                              ? "rgba(16, 185, 129, 0.15)"
                              : "rgba(245, 158, 11, 0.15)"
                          }`
                        : "0 2px 8px rgba(0,0,0,0.08)";
                    }}
                  >
                    {/* Status Badge */}
                    {selectedStatus && (
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background:
                            selectedStatus === "overloaded"
                              ? "#ef4444"
                              : selectedStatus === "optimal"
                              ? "#10b981"
                              : "#f59e0b",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                        }}
                      >
                        {selectedStatus === "overloaded"
                          ? "OVERLOADED"
                          : selectedStatus === "optimal"
                          ? "OPTIMAL"
                          : "UNDER-UTILIZED"}
                      </div>
                    )}

                    {/* Plant Header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                        marginTop: selectedStatus ? "25px" : "15px",
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          color: "#1e293b",
                          fontSize: "1.2rem",
                          fontWeight: "600",
                        }}
                      >
                        Plant {plant.plant_code}
                      </h3>
                      <div
                        style={{
                          background:
                            plant.utilization > 100
                              ? "linear-gradient(45deg, #ef4444, #dc2626)"
                              : plant.utilization < 80
                              ? "linear-gradient(45deg, #f59e0b, #d97706)"
                              : "linear-gradient(45deg, #10b981, #059669)",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                      >
                        {plant.utilization}%
                      </div>
                    </div>

                    {/* Capacity Overview */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px",
                        marginBottom: "20px",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            color: "#64748b",
                            fontSize: "0.9rem",
                            marginBottom: "5px",
                          }}
                        >
                          Monthly Capacity
                        </div>
                        <div
                          style={{
                            color: "#1e293b",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                          }}
                        >
                          {(plant.total_capacity / 1000).toFixed(0)}K
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            color: "#64748b",
                            fontSize: "0.9rem",
                            marginBottom: "5px",
                          }}
                        >
                          Total Orders
                        </div>
                        <div
                          style={{
                            color: "#1e293b",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                          }}
                        >
                          {(plant.total_orders / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>

                    {/* Machine Status Breakdown */}
                    <div
                      style={{
                        background: "#f8fafc",
                        borderRadius: "12px",
                        padding: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <h4
                        style={{
                          margin: "0 0 12px 0",
                          color: "#374151",
                          fontSize: "1rem",
                          fontWeight: "600",
                        }}
                      >
                        Machine Status
                      </h4>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: "10px",
                          textAlign: "center",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              color: "#ef4444",
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              marginBottom: "3px",
                            }}
                          >
                            {plant.overloaded_machines || 0}
                          </div>
                          <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                            Overloaded
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              color: "#10b981",
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              marginBottom: "3px",
                            }}
                          >
                            {plant.optimal_machines || 0}
                          </div>
                          <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                            Optimal
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              color: "#f59e0b",
                              fontSize: "1.2rem",
                              fontWeight: "600",
                              marginBottom: "3px",
                            }}
                          >
                            {plant.underutilized_machines || 0}
                          </div>
                          <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                            Under-utilized
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Machine Details for Selected Status */}
                    {selectedStatus &&
                      plant.machines_by_status &&
                      plant.machines_by_status[selectedStatus] &&
                      plant.machines_by_status[selectedStatus].length > 0 && (
                        <div
                          style={{
                            background:
                              selectedStatus === "overloaded"
                                ? "rgba(239, 68, 68, 0.05)"
                                : selectedStatus === "optimal"
                                ? "rgba(16, 185, 129, 0.05)"
                                : "rgba(245, 158, 11, 0.05)",
                            border: `1px solid ${
                              selectedStatus === "overloaded"
                                ? "rgba(239, 68, 68, 0.2)"
                                : selectedStatus === "optimal"
                                ? "rgba(16, 185, 129, 0.2)"
                                : "rgba(245, 158, 11, 0.2)"
                            }`,
                            borderRadius: "8px",
                            padding: "12px",
                            marginBottom: "15px",
                          }}
                        >
                          <h5
                            style={{
                              margin: "0 0 8px 0",
                              fontSize: "0.9rem",
                              fontWeight: "600",
                              color:
                                selectedStatus === "overloaded"
                                  ? "#ef4444"
                                  : selectedStatus === "optimal"
                                  ? "#10b981"
                                  : "#f59e0b",
                            }}
                          >
                            {selectedStatus.charAt(0).toUpperCase() +
                              selectedStatus.slice(1)}{" "}
                            Machines:
                          </h5>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "5px",
                            }}
                          >
                            {plant.machines_by_status[selectedStatus]
                              .slice(0, 4)
                              .map((machine, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    background:
                                      selectedStatus === "overloaded"
                                        ? "#ef4444"
                                        : selectedStatus === "optimal"
                                        ? "#10b981"
                                        : "#f59e0b",
                                    color: "white",
                                    padding: "3px 8px",
                                    borderRadius: "12px",
                                    fontSize: "0.75rem",
                                    fontWeight: "500",
                                  }}
                                >
                                  {machine}
                                </span>
                              ))}
                            {plant.machines_by_status[selectedStatus].length >
                              4 && (
                              <span
                                style={{
                                  background: "#64748b",
                                  color: "white",
                                  padding: "3px 8px",
                                  borderRadius: "12px",
                                  fontSize: "0.75rem",
                                  fontWeight: "500",
                                }}
                              >
                                +
                                {plant.machines_by_status[selectedStatus]
                                  .length - 4}{" "}
                                more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Summary Stats */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "15px",
                        paddingTop: "15px",
                        borderTop: "1px solid #e2e8f0",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                          Total Machines
                        </div>
                        <div
                          style={{
                            color: "#1e293b",
                            fontSize: "1rem",
                            fontWeight: "600",
                          }}
                        >
                          {plant.machines}
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                          Available Capacity
                        </div>
                        <div
                          style={{
                            color:
                              plant.total_capacity > plant.total_orders
                                ? "#10b981"
                                : "#ef4444",
                            fontSize: "1rem",
                            fontWeight: "600",
                          }}
                        >
                          {(
                            (plant.total_capacity - plant.total_orders) /
                            1000
                          ).toFixed(0)}
                          K
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Enhanced No Plants Message */
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "16px",
                  padding: "50px 30px",
                  textAlign: "center",
                  border: selectedStatus
                    ? `2px dashed ${
                        selectedStatus === "overloaded"
                          ? "#ef4444"
                          : selectedStatus === "optimal"
                          ? "#10b981"
                          : "#f59e0b"
                      }`
                    : "2px dashed #e2e8f0",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Background Pattern */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `radial-gradient(circle, ${
                      selectedStatus === "overloaded"
                        ? "rgba(239, 68, 68, 0.05)"
                        : selectedStatus === "optimal"
                        ? "rgba(16, 185, 129, 0.05)"
                        : "rgba(245, 158, 11, 0.05)"
                    } 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                    opacity: 0.3,
                  }}
                />

                {/* Content */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      fontSize: "4rem",
                      marginBottom: "20px",
                      animation: "bounce 2s infinite",
                    }}
                  >
                    {selectedPlant !== "all"
                      ? "🏭"
                      : selectedStatus === "overloaded"
                      ? "🔴"
                      : selectedStatus === "optimal"
                      ? "🟢"
                      : "🟡"}
                  </div>

                  <h3
                    style={{
                      margin: "0 0 15px 0",
                      color: "#1e293b",
                      fontSize: "1.8rem",
                      fontWeight: "700",
                    }}
                  >
                    {selectedPlant !== "all"
                      ? `Plant ${selectedPlant} - No ${
                          selectedStatus || "matching"
                        } Machines`
                      : `No ${selectedStatus || "matching"} Plants Found`}
                  </h3>

                  <p
                    style={{
                      margin: "0 0 25px 0",
                      color: "#64748b",
                      fontSize: "1.1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {selectedPlant !== "all" ? (
                      <>
                        Plant {selectedPlant} doesn't have any machines with "
                        <strong>{selectedStatus}</strong>" status.
                      </>
                    ) : (
                      <>
                        No plants found with machines in "
                        <strong>{selectedStatus}</strong>" status.
                      </>
                    )}
                  </p>

                  {/* Filter Summary */}
                  <div
                    style={{
                      background: "#f8fafc",
                      borderRadius: "12px",
                      padding: "15px",
                      marginBottom: "25px",
                      textAlign: "left",
                    }}
                  >
                    <h4 style={{ margin: "0 0 10px 0", color: "#374151" }}>
                      Current Filters:
                    </h4>
                    <div
                      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                    >
                      <span
                        style={{
                          background: "#667eea",
                          color: "white",
                          padding: "5px 12px",
                          borderRadius: "15px",
                          fontSize: "0.9rem",
                        }}
                      >
                        Plant:{" "}
                        {selectedPlant === "all"
                          ? "All Plants"
                          : `Plant ${selectedPlant}`}
                      </span>
                      {selectedStatus && (
                        <span
                          style={{
                            background:
                              selectedStatus === "overloaded"
                                ? "#ef4444"
                                : selectedStatus === "optimal"
                                ? "#10b981"
                                : "#f59e0b",
                            color: "white",
                            padding: "5px 12px",
                            borderRadius: "15px",
                            fontSize: "0.9rem",
                          }}
                        >
                          Status:{" "}
                          {selectedStatus.charAt(0).toUpperCase() +
                            selectedStatus.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {selectedStatus && (
                      <button
                        onClick={() => setSelectedStatus(null)}
                        style={{
                          background:
                            "linear-gradient(45deg, #ef4444, #dc2626)",
                          color: "white",
                          border: "none",
                          padding: "12px 24px",
                          borderRadius: "25px",
                          cursor: "pointer",
                          fontSize: "1rem",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
                        }}
                      >
                        <X size={18} />
                        Clear Status Filter
                      </button>
                    )}

                    {selectedPlant !== "all" && (
                      <button
                        onClick={() => setSelectedPlant("all")}
                        style={{
                          background:
                            "linear-gradient(45deg, #667eea, #764ba2)",
                          color: "white",
                          border: "none",
                          padding: "12px 24px",
                          borderRadius: "25px",
                          cursor: "pointer",
                          fontSize: "1rem",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                        }}
                      >
                        <RefreshCw size={18} />
                        Show All Plants
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Charts Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "25px",
              marginBottom: "25px",
            }}
          >
            {/* Bar Chart */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <h3
                  style={{
                    margin: "0 0 5px 0",
                    color: "#1e293b",
                    fontSize: "1.4rem",
                    fontWeight: "600",
                  }}
                >
                  Production Capacity vs Current Orders
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "0.9rem",
                    lineHeight: "1.4",
                  }}
                >
                  Compare monthly production capacity with current order volumes
                  for each machine
                </p>
              </div>
              {loading ? (
                // Skeleton Bar Chart
                <div
                  style={{
                    height: "300px",
                    display: "flex",
                    alignItems: "end",
                    gap: "8px",
                    padding: "20px",
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <div
                        style={{
                          height: `${Math.random() * 200 + 50}px`,
                          width: "100%",
                          background:
                            "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer 1.5s infinite",
                          borderRadius: "4px 4px 0 0",
                          animationDelay: `${index * 0.1}s`,
                        }}
                      />
                      <div
                        style={{
                          height: "12px",
                          width: "60px",
                          background:
                            "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                          backgroundSize: "200% 100%",
                          animation: "shimmer 1.5s infinite",
                          borderRadius: "4px",
                          animationDelay: `${index * 0.1}s`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : chartData.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center", 
                    justifyContent: "center", 
                    height: "100%",
                    minHeight: "320px",
                  }}
                >
                  <ResponsiveContainer width="95%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                      {/* ✅ X Axis with label */}
                      <XAxis
                        dataKey="machine"
                        stroke="#64748b"
                        fontSize={11}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={0}
                        label={{
                          value: "Machines",
                          position: "insideBottom",
                          offset: -5,
                          style: {
                            textAnchor: "middle",
                            fill: "#475569",
                            fontSize: "13px",
                            fontWeight: "600",
                          },
                        }}
                      />

                      {/* ✅ Y Axis with units */}
                      <YAxis
                        stroke="#64748b"
                        fontSize={11}
                        width={80}
                        tickFormatter={(value) => {
                          if (value >= 1000000)
                            return `${(value / 1000000).toFixed(1)}M`;
                          if (value >= 1000)
                            return `${(value / 1000).toFixed(0)}K`;
                          return value;
                        }}
                        label={{
                          value: "Production Units (K)",
                          angle: -90,
                          position: "insideLeft",
                          style: {
                            textAnchor: "middle",
                            fill: "#475569",
                            fontSize: "13px",
                            fontWeight: "600",
                          },
                        }}
                      />

                      <Tooltip
                        formatter={(value, name) => [
                          `${value.toLocaleString()} units`,
                          name === "capacity"
                            ? "Production Capacity"
                            : "Current Orders",
                        ]}
                        labelFormatter={(label) => `Machine: ${label}`}
                        contentStyle={{
                          background: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                          fontSize: "13px",
                        }}
                      />

                      <Legend
                        wrapperStyle={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#475569",
                          paddingTop: "10px",
                        }}
                        formatter={(value) => {
                          if (value === "capacity") {
                            return "Production Capacity (units)";
                          } else if (value === "orders") {
                            return "Current Orders (units)";
                          }
                          return value;
                        }}
                      />

                      <Bar
                        dataKey="capacity"
                        fill="#60a5fa"
                        name="capacity"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="orders"
                        fill="#f472b6"
                        name="orders"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "300px",
                    color: "#64748b",
                    fontSize: "1.1rem",
                  }}
                >
                  No chart data available for selected filters
                </div>
              )}
            </div>

            {/* Pie Chart */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "25px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#1e293b",
                    fontSize: "1.4rem",
                    fontWeight: "600",
                  }}
                >
                  Machine Status Distribution
                </h3>
                {selectedStatus && (
                  <button
                    onClick={() => setSelectedStatus(null)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <X size={14} />
                    Clear Filter
                  </button>
                )}
              </div>

              {/* Status Filter Info */}
              {selectedStatus && (
                <div
                  style={{
                    background:
                      selectedStatus === "overloaded"
                        ? "#fef2f2"
                        : selectedStatus === "optimal"
                        ? "#f0fdf4"
                        : "#fffbeb",
                    border: `1px solid ${
                      selectedStatus === "overloaded"
                        ? "#fecaca"
                        : selectedStatus === "optimal"
                        ? "#bbf7d0"
                        : "#fde68a"
                    }`,
                    borderRadius: "8px",
                    padding: "10px",
                    marginBottom: "15px",
                    fontSize: "0.9rem",
                    color:
                      selectedStatus === "overloaded"
                        ? "#dc2626"
                        : selectedStatus === "optimal"
                        ? "#16a34a"
                        : "#d97706",
                  }}
                >
                  Showing only
                  <strong>
                    {selectedStatus.charAt(0).toUpperCase() +
                      selectedStatus.slice(1)}
                  </strong>
                  machines ({filteredData.length} found)
                </div>
              )}

              {loading ? (
                // Skeleton Pie Chart
                <div
                  style={{
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "160px",
                      height: "160px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "40px solid #f1f5f9",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        width: "calc(100% - 20px)",
                        height: "calc(100% - 20px)",
                        border: "30px solid #f8fafc",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </div>
              ) : pieData.some((item) => item.value > 0) ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData.filter((item) => item.value > 0)}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                      onClick={handlePieClick}
                      style={{ cursor: "pointer" }}
                    >
                      {pieData
                        .filter((item) => item.value > 0)
                        .map((entry, index) => {
                          const statusMap = {
                            Overloaded: "overloaded",
                            Optimal: "optimal",
                            "Under-utilized": "underutilized",
                          };
                          const isSelected =
                            selectedStatus === statusMap[entry.name];

                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke={isSelected ? "#1e293b" : "none"}
                              strokeWidth={isSelected ? 3 : 0}
                              style={{
                                filter: isSelected
                                  ? "brightness(1.1)"
                                  : "brightness(1)",
                                cursor: "pointer",
                              }}
                            />
                          );
                        })}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div
                              style={{
                                background: "rgba(255, 255, 255, 0.95)",
                                border: "none",
                                borderRadius: "8px",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                padding: "10px",
                              }}
                            >
                              <p style={{ margin: 0, fontWeight: "600" }}>
                                {data.name}: {data.value} machines
                              </p>
                              <p
                                style={{
                                  margin: "5px 0 0 0",
                                  fontSize: "0.9rem",
                                  color: "#64748b",
                                }}
                              >
                                Click to filter by this status
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "300px",
                    color: "#64748b",
                    fontSize: "1.1rem",
                  }}
                >
                  No status data available
                </div>
              )}

              {/* Quick Status Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { key: "overloaded", label: "Overloaded", color: "#ef4444" },
                  { key: "optimal", label: "Optimal", color: "#10b981" },
                  {
                    key: "underutilized",
                    label: "Under-utilized",
                    color: "#f59e0b",
                  },
                ].map((status) => (
                  <button
                    key={status.key}
                    onClick={() =>
                      setSelectedStatus(
                        selectedStatus === status.key ? null : status.key
                      )
                    }
                    style={{
                      background:
                        selectedStatus === status.key ? status.color : "white",
                      color:
                        selectedStatus === status.key ? "white" : status.color,
                      border: `2px solid ${status.color}`,
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontWeight: "600",
                    }}
                  >
                    {status.label} (
                    {
                      processedData.filter((item) => item.status === status.key)
                        .length
                    }
                    )
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Machine Details Table */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              overflowX: "auto",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                color: "#1e293b",
                fontSize: "1.4rem",
                fontWeight: "600",
              }}
            >
              Machine Details ({filteredData.length} machines)
              {selectedStatus && (
                <span
                  style={{
                    fontSize: "1rem",
                    color: "#64748b",
                    fontWeight: "normal",
                    marginLeft: "10px",
                  }}
                >
                  - Showing{" "}
                  {selectedStatus.charAt(0).toUpperCase() +
                    selectedStatus.slice(1)}{" "}
                  only
                </span>
              )}
            </h3>

            {loading ? (
              // Skeleton Table
              <div>
                {/* Table Header */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1.5fr 1.5fr 1fr 1.5fr 1.5fr",
                    gap: "15px",
                    padding: "15px",
                    background: "#f8fafc",
                    borderRadius: "8px 8px 0 0",
                    borderBottom: "2px solid #e2e8f0",
                  }}
                >
                  {[
                    "Machine",
                    "Plant",
                    "Capacity",
                    "Orders",
                    "Utilization",
                    "Status",
                    "Available",
                  ].map((header, index) => (
                    <div
                      key={index}
                      style={{
                        height: "16px",
                        background:
                          "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                        borderRadius: "4px",
                        animationDelay: `${index * 0.1}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Table Rows */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "2fr 1fr 1.5fr 1.5fr 1fr 1.5fr 1.5fr",
                      gap: "15px",
                      padding: "15px",
                      borderBottom: "1px solid #f1f5f9",
                      animationDelay: `${rowIndex * 0.1}s`,
                    }}
                  >
                    {/* Machine Name */}
                    <div
                      style={{
                        height: "16px",
                        background:
                          "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                        borderRadius: "4px",
                        animationDelay: `${rowIndex * 0.1}s`,
                      }}
                    />

                    {/* Plant */}
                    <div
                      style={{
                        height: "16px",
                        width: "40px",
                        background:
                          "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                        borderRadius: "4px",
                        animationDelay: `${rowIndex * 0.1 + 0.1}s`,
                      }}
                    />

                    {/* Capacity */}
                    <div
                      style={{
                        height: "16px",
                        background:
                          "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                        borderRadius: "4px",
                        marginLeft: "auto",
                        width: "80px",
                        animationDelay: `${rowIndex * 0.1 + 0.2}s`,
                      }}
                    />

                    {/* Orders */}
                    <div
                      style={{
                        height: "16px",
                        background:
                          "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                        borderRadius: "4px",
                        marginLeft: "auto",
                        width: "80px",
                        animationDelay: `${rowIndex * 0.1 + 0.3}s`,
                      }}
                    />

                    {/* Utilization */}
                    <div
                      style={{
                        height: "16px",
                        background:
                          "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                        borderRadius: "4px",
                        marginLeft: "auto",
                        width: "50px",
                        animationDelay: `${rowIndex * 0.1 + 0.4}s`,
                      }}
                    />

                    {/* Status */}
                    <div
                      style={{
                        height: "28px",
                        background:
                          "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                        borderRadius: "14px",
                        margin: "0 auto",
                        width: "100px",
                        animationDelay: `${rowIndex * 0.1 + 0.5}s`,
                      }}
                    />

                    {/* Available */}
                    <div
                      style={{
                        height: "16px",
                        background:
                          "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                        borderRadius: "4px",
                        marginLeft: "auto",
                        width: "70px",
                        animationDelay: `${rowIndex * 0.1 + 0.6}s`,
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : filteredData.length > 0 ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderRadius: "8px" }}>
                    <th
                      style={{
                        padding: "15px",
                        textAlign: "left",
                        color: "#475569",
                        fontWeight: "600",
                        borderBottom: "2px solid #e2e8f0",
                      }}
                    >
                      Plant
                    </th>
                    <th
                      style={{
                        padding: "15px",
                        textAlign: "left",
                        color: "#475569",
                        fontWeight: "600",
                        borderBottom: "2px solid #e2e8f0",
                      }}
                    >
                      Machine
                    </th>

                    <th
                      style={{
                        padding: "15px",
                        textAlign: "right",
                        color: "#475569",
                        fontWeight: "600",
                        borderBottom: "2px solid #e2e8f0",
                      }}
                    >
                      Capacity
                    </th>
                    <th
                      style={{
                        padding: "15px",
                        textAlign: "right",
                        color: "#475569",
                        fontWeight: "600",
                        borderBottom: "2px solid #e2e8f0",
                      }}
                    >
                      Orders
                    </th>
                    <th
                      style={{
                        padding: "15px",
                        textAlign: "right",
                        color: "#475569",
                        fontWeight: "600",
                        borderBottom: "2px solid #e2e8f0",
                      }}
                    >
                      Available
                    </th>
                    <th
                      style={{
                        padding: "15px",
                        textAlign: "right",
                        color: "#475569",
                        fontWeight: "600",
                        borderBottom: "2px solid #e2e8f0",
                      }}
                    >
                      Utilization
                    </th>
                    <th
                      style={{
                        padding: "15px",
                        textAlign: "center",
                        color: "#475569",
                        fontWeight: "600",
                        borderBottom: "2px solid #e2e8f0",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f8fafc")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <td style={{ padding: "15px", color: "#64748b" }}>
                        {item.plant_code}
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          fontWeight: "600",
                          color: "#1e293b",
                        }}
                      >
                        {item.pre_forge_press}
                      </td>

                      <td
                        style={{
                          padding: "15px",
                          textAlign: "right",
                          color: "#64748b",
                        }}
                      >
                        {item.month_machine_capacity.toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          textAlign: "right",
                          color: "#64748b",
                        }}
                      >
                        {item.total_order_qty.toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          textAlign: "right",
                          fontWeight: "600",
                          color:
                            item.remaining_capacity < 0 ? "#dc2626" : "#16a34a",
                        }}
                      >
                        {item.remaining_capacity < 0
                          ? `-${Math.abs(
                              item.remaining_capacity
                            ).toLocaleString()}`
                          : `+${item.remaining_capacity.toLocaleString()}`}
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          textAlign: "right",
                          fontWeight: "600",
                          color:
                            parseFloat(item.utilization) > 100
                              ? "#dc2626"
                              : "#16a34a",
                        }}
                      >
                        {item.utilization}%
                      </td>
                      <td style={{ padding: "15px", textAlign: "center" }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                            background:
                              item.status === "overloaded"
                                ? "#fef2f2"
                                : item.status === "optimal"
                                ? "#f0fdf4"
                                : "#fffbeb",
                            color: statusColors[item.status],
                          }}
                        >
                          {item.status === "overloaded" ? (
                            <TrendingDown size={14} />
                          ) : item.status === "optimal" ? (
                            <CheckCircle size={14} />
                          ) : (
                            <AlertTriangle size={14} />
                          )}
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                  color: "#64748b",
                  fontSize: "1.1rem",
                }}
              >
                No machines match the selected filters
              </div>
            )}
          </div>
        </>
      </div>

      {/* AI Chat Interface */}
      {chatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: chatExpanded ? "20px" : "20px",
            right: "20px",
            width: chatExpanded ? "600px" : "400px",
            height: chatExpanded ? "700px" : "500px",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            animation: "slideUp 0.4s ease-out",
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              borderRadius: "20px 20px 0 0",
              color: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.2)",
                  padding: "8px",
                  borderRadius: "10px",
                }}
              >
                <Bot size={24} />
              </div>
              <div>
                <h4
                  style={{ margin: 0, fontSize: "1.2rem", fontWeight: "600" }}
                >
                  AI Assistant
                </h4>
                <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.9 }}>
                  {error
                    ? "Limited Mode"
                    : processedData.length > 0
                    ? `${processedData.length} machines connected`
                    : "No data"}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setChatExpanded(!chatExpanded)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
                }
              >
                {chatExpanded ? (
                  <Minimize2 size={18} />
                ) : (
                  <Maximize2 size={18} />
                )}
              </button>
              <button
                onClick={() => setChatOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,0,0,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
                }
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              padding: "15px",
              borderBottom: "1px solid #f1f5f9",
              background: "#fafbfc",
            }}
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  style={{
                    background: "linear-gradient(45deg, #f8fafc, #e2e8f0)",
                    border: "1px solid #e2e8f0",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    color: "#475569",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(45deg, #667eea, #764ba2)";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(45deg, #f8fafc, #e2e8f0)";
                    e.currentTarget.style.color = "#475569";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {action.icon}
                  {action.text}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.type === "user" ? "flex-end" : "flex-start",
                  animation: "messageSlideIn 0.3s ease-out",
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "12px 16px",
                    borderRadius:
                      message.type === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    background:
                      message.type === "user"
                        ? "linear-gradient(45deg, #667eea, #764ba2)"
                        : "linear-gradient(45deg, #f8fafc, #e2e8f0)",
                    color: message.type === "user" ? "white" : "#1e293b",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  animation: "messageSlideIn 0.3s ease-out",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "18px 18px 18px 4px",
                    background: "linear-gradient(45deg, #f8fafc, #e2e8f0)",
                    color: "#64748b",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#64748b",
                        animation: "bounce 1.4s infinite ease-in-out",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#64748b",
                        animation: "bounce 1.4s infinite ease-in-out",
                        animationDelay: "0.16s",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#64748b",
                        animation: "bounce 1.4s infinite ease-in-out",
                        animationDelay: "0.32s",
                      }}
                    ></div>
                  </div>
                  AI is analyzing data...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: "20px",
              borderTop: "1px solid #e2e8f0",
              background: "#fafbfc",
              borderRadius: "0 0 20px 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-end",
              }}
            >
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about production optimization, bottlenecks, machine status, or any manufacturing insights..."
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "14px",
                  resize: "none",
                  minHeight: "44px",
                  maxHeight: "120px",
                  background: "white",
                  transition: "border-color 0.2s ease",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#667eea")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                style={{
                  background:
                    !inputValue.trim() || isTyping
                      ? "#e2e8f0"
                      : "linear-gradient(45deg, #10b981, #059669)",
                  color: !inputValue.trim() || isTyping ? "#94a3b8" : "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "12px",
                  cursor:
                    !inputValue.trim() || isTyping ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow:
                    !inputValue.trim() || isTyping
                      ? "none"
                      : "0 4px 12px rgba(16, 185, 129, 0.3)",
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim() && !isTyping) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 16px rgba(16, 185, 129, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (inputValue.trim() && !isTyping) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(16, 185, 129, 0.3)";
                  }
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot Floating Icon */}
      {!chatOpen && (
        <div
          onClick={() => setChatOpen(true)}
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            width: "60px",
            height: "60px",
            background: error
              ? "linear-gradient(45deg, #ef4444, #dc2626)"
              : "linear-gradient(45deg, #10b981, #059669)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: error
              ? "0 8px 25px rgba(239, 68, 68, 0.4)"
              : "0 8px 25px rgba(16, 185, 129, 0.4)",
            zIndex: 1000,
            transition: "all 0.3s ease",
            animation: "pulse 2s infinite",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = error
              ? "0 12px 30px rgba(239, 68, 68, 0.5)"
              : "0 12px 30px rgba(16, 185, 129, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = error
              ? "0 8px 25px rgba(239, 68, 68, 0.4)"
              : "0 8px 25px rgba(16, 185, 129, 0.4)";
          }}
          title={
            error
              ? "AI Assistant (Limited Mode)"
              : processedData.length > 0
              ? `AI Assistant (${processedData.length} machines)`
              : "AI Assistant"
          }
        >
          <Bot size={28} color="white" />

          {/* Notification Badge */}
          <div
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "18px",
              height: "18px",
              background: error
                ? "#fbbf24"
                : processedData.length > 0
                ? "#10b981"
                : "#ef4444",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "white",
              fontWeight: "bold",
              animation: "bounce 1.5s infinite",
            }}
          >
            {error ? "!" : processedData.length > 0 ? "✓" : "?"}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 10px;
          }
          
          .charts-grid {
            grid-template-columns: 1fr;
          }
          
          .chat-interface {
            width: 90vw !important;
            height: 70vh !important;
            bottom: 10px !important;
            right: 5vw !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ScheduleSummary;
