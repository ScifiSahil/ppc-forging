import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Warehouse,
  Target,
  ShieldCheck,
  MessageCircle,
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  Brain,
  X,
  Minimize2,
  Maximize2,
  RefreshCw,
  Loader2,
  Search,
} from "lucide-react";

const InventoryDashboard = () => {
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [selectedDieNo, setSelectedDieNo] = useState("all");
  const [viewMode, setViewMode] = useState("overview");
  const [globalSearch, setGlobalSearch] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message:
        "Hi! 👋 I'm your AI Inventory Assistant. I can help you with:\n\n📊 Analyze inventory levels\n⚠️ Identify critical items\n📈 Suggest optimal stock levels\n🎯 Create action plans\n\nWhat would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [statusDetailModal, setStatusDetailModal] = useState(false);

  // API Integration State
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const API_URL =
    "https://ktflceprd.kalyanicorp.com/api/v1/collection/kln_ppc_rm_wip_inv";

  // Function to fetch data from API
  const fetchInventoryData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any required headers here (auth tokens, etc.)
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Extract objects array from API response
      const inventoryItems = data.objects || data;

      // Transform API data to match expected structure
      const transformedData = inventoryItems.map((item) => ({
        daily_material_qty: item.daily_material_qty || 0,
        daily_opening_stock: item.daily_opening_stock || 0,
        desired_wip: item.desired_wip || null,
        inv_die_no: item.inv_die_no || "",
        material_qty: item.material_qty || 0,
        opening_stock: item.opening_stock || 0,
        r_code: item.r_code || "",
        raw_material: item.raw_material || "",
        rm_plant_code: item.rm_plant_code || 0,
        safety_stock: item.safety_stock || null,
        unit: item.unit || "TO",
      }));

      setRawData(transformedData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching inventory data:", err);
      setError(err.message);

      // Fallback to sample data for development
      setRawData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and set up refresh interval
  useEffect(() => {
    fetchInventoryData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      fetchInventoryData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const processedData = useMemo(() => {
    return rawData.map((item) => {
      const daysOfStock =
        item.daily_material_qty > 0
          ? item.daily_opening_stock / item.daily_material_qty
          : 0;
      const wipLevel = item.desired_wip
        ? (item.daily_opening_stock / item.desired_wip) * 100
        : 0;
      const safetyBuffer = item.safety_stock
        ? item.daily_opening_stock / item.safety_stock
        : 0;

      let status = "optimal";
      if (safetyBuffer < 5) status = "critical";
      else if (safetyBuffer < 10) status = "low";
      else if (wipLevel > 80) status = "excess";

      return {
        ...item,
        days_of_stock: daysOfStock.toFixed(1),
        wip_level: wipLevel.toFixed(1),
        safety_buffer: safetyBuffer.toFixed(1),
        status,
        consumption_rate: item.daily_material_qty || 0,
      };
    });
  }, [rawData]);

  const filteredData = processedData.filter((item) => {
    const materialMatch =
      selectedMaterial === "all" ||
      item.raw_material.includes(selectedMaterial);
    const dieMatch =
      selectedDieNo === "all" || item.inv_die_no === selectedDieNo;

    // Global search functionality
    const globalMatch =
      globalSearch === "" ||
      item.raw_material.toLowerCase().includes(globalSearch.toLowerCase()) ||
      item.inv_die_no.toLowerCase().includes(globalSearch.toLowerCase()) ||
      item.r_code.toLowerCase().includes(globalSearch.toLowerCase()) ||
      item.status.toLowerCase().includes(globalSearch.toLowerCase()) ||
      item.rm_plant_code.toString().includes(globalSearch.toLowerCase()) ||
      item.days_of_stock.toString().includes(globalSearch.toLowerCase());

    return materialMatch && dieMatch && globalMatch;
  });

  const materialTypes = [
    ...new Set(rawData.map((item) => item.raw_material.split(" - ")[0])),
  ];

  const dieNumbers = [
    ...new Set(
      rawData
        .map((item) => item.inv_die_no)
        .filter(Boolean)
        .sort()
    ),
  ];

  const summaryStats = useMemo(() => {
    const totalStock = processedData.reduce(
      (sum, item) => sum + item.daily_opening_stock,
      0
    );
    const totalDesiredWip = processedData.reduce(
      (sum, item) => sum + (item.desired_wip || 0),
      0
    );
    const criticalItems = processedData.filter(
      (item) => item.status === "critical"
    ).length;
    const lowItems = processedData.filter(
      (item) => item.status === "low"
    ).length;
    const avgDaysStock =
      processedData.length > 0
        ? processedData.reduce(
            (sum, item) => sum + parseFloat(item.days_of_stock),
            0
          ) / processedData.length
        : 0;

    return {
      totalStock,
      totalDesiredWip,
      criticalItems,
      lowItems,
      avgDaysStock: avgDaysStock.toFixed(1),
      wipUtilization:
        totalDesiredWip > 0
          ? ((totalStock / totalDesiredWip) * 100).toFixed(1)
          : 0,
    };
  }, [processedData]);

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    const criticalItems = processedData.filter(
      (item) => item.status === "critical"
    );
    const lowItems = processedData.filter((item) => item.status === "low");
    const excessItems = processedData.filter(
      (item) => item.status === "excess"
    );

    if (
      message.includes("critical") ||
      message.includes("urgent") ||
      message.includes("emergency")
    ) {
      if (criticalItems.length > 0) {
        return `🚨 URGENT ACTION NEEDED!\n\nCritical items requiring immediate attention:\n\n${criticalItems
          .map(
            (item) =>
              `• ${item.raw_material} (Die: ${item.inv_die_no})\n  Stock: ${item.daily_opening_stock} ${item.unit} (${item.days_of_stock} days left)\n  Daily consumption: ${item.daily_material_qty} ${item.unit}\n`
          )
          .join("\n")}\n💡 Recommendation: Place emergency orders ASAP!`;
      } else {
        return "✅ Good news! No critical inventory items at the moment. Your stock levels are healthy!";
      }
    }

    if (
      message.includes("recommendation") ||
      message.includes("suggest") ||
      message.includes("advice")
    ) {
      let recommendations = [];
      if (criticalItems.length > 0)
        recommendations.push(
          `🔴 ${criticalItems.length} critical items need immediate ordering`
        );
      if (lowItems.length > 0)
        recommendations.push(
          `🟡 ${lowItems.length} items are running low, schedule orders soon`
        );
      if (excessItems.length > 0)
        recommendations.push(
          `🔵 ${excessItems.length} items have excess stock, reduce future orders`
        );

      return `📋 AI RECOMMENDATIONS:\n\n${recommendations.join(
        "\n"
      )}\n\n🎯 Priority Action: Focus on critical items first, then optimize excess inventory to free up working capital.`;
    }

    if (
      message.includes("excess") ||
      message.includes("waste") ||
      message.includes("optimize")
    ) {
      if (excessItems.length > 0) {
        return `💡 OPTIMIZATION OPPORTUNITIES:\n\nExcess inventory detected:\n\n${excessItems
          .map(
            (item) =>
              `• ${item.raw_material}: ${
                item.wip_level
              }% of desired WIP\n  Reduce next order by ${Math.round(
                ((parseFloat(item.wip_level) - 80) * item.desired_wip) / 100
              )} ${item.unit}\n`
          )
          .join(
            "\n"
          )}\n💰 Potential savings: Reduce working capital by optimizing these items!`;
      } else {
        return "✅ Your inventory is well optimized! No significant excess detected.";
      }
    }

    if (message.includes("stock") || message.includes("level")) {
      const totalStock = summaryStats.totalStock;
      const avgDays = summaryStats.avgDaysStock;
      return `📊 CURRENT STOCK OVERVIEW:\n\n• Total Stock: ${(
        totalStock / 1000
      ).toFixed(
        1
      )}K tonnes\n• Average Days Coverage: ${avgDays} days\n• WIP Utilization: ${
        summaryStats.wipUtilization
      }%\n\n${
        criticalItems.length > 0
          ? `⚠️ ${criticalItems.length} items need attention`
          : "✅ Stock levels are healthy"
      }`;
    }

    if (message.includes("report") || message.includes("summary")) {
      return `📈 INVENTORY HEALTH REPORT:\n\n🔴 Critical: ${
        criticalItems.length
      } items\n🟡 Low: ${lowItems.length} items\n🟢 Optimal: ${
        processedData.filter((item) => item.status === "optimal").length
      } items\n🔵 Excess: ${
        excessItems.length
      } items\n\n📊 Key Metrics:\n• Total Stock: ${(
        summaryStats.totalStock / 1000
      ).toFixed(1)}K tonnes\n• Avg Coverage: ${
        summaryStats.avgDaysStock
      } days\n• WIP Efficiency: ${summaryStats.wipUtilization}%`;
    }

    if (message.includes("plan") || message.includes("action")) {
      return `🎯 30-DAY ACTION PLAN:\n\nWEEK 1 (Urgent):\n${
        criticalItems.length > 0
          ? `• Order critical materials: ${criticalItems
              .map((i) => i.raw_material)
              .join(", ")}`
          : "• No urgent actions needed"
      }\n\nWEEK 2-3 (Important):\n${
        lowItems.length > 0
          ? `• Schedule orders for low stock items\n• Review safety stock levels`
          : "• Monitor consumption patterns"
      }\n\nWEEK 4 (Optimize):\n• Analyze excess inventory\n• Adjust future order quantities\n• Review supplier performance`;
    }

    if (
      message.includes("cost") ||
      message.includes("money") ||
      message.includes("saving")
    ) {
      const excessValue = excessItems.reduce(
        (sum, item) => sum + item.daily_opening_stock * 0.1,
        0
      );
      return `💰 COST ANALYSIS:\n\n• Excess inventory value: ~₹${(
        excessValue * 1000
      ).toLocaleString()}\n• Working capital tied up: ${(
        summaryStats.totalStock *
        0.1 *
        1000
      ).toLocaleString()}\n\n💡 Optimization potential:\n• Reduce excess by 20%: Save ~₹${(
        excessValue * 200
      ).toLocaleString()}\n• Improve turnover ratio for better cash flow`;
    }

    const responses = [
      "🤖 I'm analyzing your inventory data... Here's what I found:\n\nYour current inventory status shows some interesting patterns. Would you like me to focus on critical items, optimization opportunities, or create an action plan?",
      "📊 Based on your data analysis:\n\n• You have a good mix of inventory levels\n• Some items need attention\n• Opportunities for optimization exist\n\nWhat specific area would you like me to dive deeper into?",
      "🎯 I can help you with:\n\n1. Identifying critical items\n2. Cost optimization strategies\n3. Creating action plans\n4. Inventory level recommendations\n\nWhat interests you most?",
      `💡 Smart Insight: Your average stock coverage is ${
        summaryStats.avgDaysStock
      } days. This ${
        parseFloat(summaryStats.avgDaysStock) > 30
          ? "might be optimized for better cash flow"
          : "looks healthy for production continuity"
      }.\n\nNeed specific recommendations?`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      type: "user",
      message: currentMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        type: "bot",
        message: generateAIResponse(currentMessage),
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const chartData = filteredData
    .map((item) => ({
      material: item.inv_die_no,
      stock: item.daily_opening_stock,
      desired: item.desired_wip || 0,
      consumption: item.daily_material_qty,
      safety: item.safety_stock || 0,
      daysStock: parseFloat(item.days_of_stock),
    }))
    .sort((a, b) => b.stock - a.stock);

  const statusColors = {
    critical: "#dc2626",
    low: "#f59e0b",
    optimal: "#10b981",
    excess: "#3b82f6",
  };

  const pieData = [
    {
      name: "Critical",
      value: processedData.filter((item) => item.status === "critical").length,
      color: "#dc2626",
    },
    {
      name: "Low",
      value: processedData.filter((item) => item.status === "low").length,
      color: "#f59e0b",
    },
    {
      name: "Optimal",
      value: processedData.filter((item) => item.status === "optimal").length,
      color: "#10b981",
    },
    {
      name: "Excess",
      value: processedData.filter((item) => item.status === "excess").length,
      color: "#3b82f6",
    },
  ];

  // Skeleton Loader Component
  const SkeletonLoader = ({
    width = "100%",
    height = "20px",
    borderRadius = "8px",
  }) => (
    <div
      style={{
        width,
        height,
        background:
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius,
      }}
    />
  );

  // KPI Card Skeleton
  const KPICardSkeleton = () => (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        border: "1px solid rgba(255,255,255,0.4)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <SkeletonLoader width="44px" height="44px" borderRadius="14px" />
        <SkeletonLoader width="50px" height="24px" borderRadius="8px" />
      </div>
      <SkeletonLoader width="100px" height="16px" />
      <div style={{ marginTop: "12px" }}>
        <SkeletonLoader width="80px" height="32px" />
      </div>
    </div>
  );

  // Table Row Skeleton
  const TableRowSkeleton = () => (
    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
      {[80, 150, 100, 100, 80, 80, 100].map((width, index) => (
        <td key={index} style={{ padding: "15px 12px" }}>
          <SkeletonLoader width={`${width}px`} height="16px" />
        </td>
      ))}
    </tr>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgb(241, 245, 249) 0%, rgb(226, 232, 240) 50%, rgb(203, 213, 225) 100%)",
        padding: "15px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                padding: "8px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)",
              }}
            >
              <Warehouse size={24} color="white" />
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "1.5rem",
                  color: "#1e293b",
                  fontWeight: "600",
                }}
              >
                WIP & Raw Material
              </h1>
              {(selectedMaterial !== "all" ||
                selectedDieNo !== "all" ||
                globalSearch) && (
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    marginTop: "6px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {globalSearch && (
                    <span
                      style={{
                        padding: "3px 8px",
                        background: "#f0f9ff",
                        border: "1px solid #3b82f6",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        color: "#3b82f6",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Search size={10} />
                      Search: "{globalSearch}"
                    </span>
                  )}
                  {selectedMaterial !== "all" && (
                    <span
                      style={{
                        padding: "3px 8px",
                        background: "#f0f9ff",
                        border: "1px solid #3b82f6",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        color: "#3b82f6",
                        fontWeight: "500",
                      }}
                    >
                      Material: {selectedMaterial}
                    </span>
                  )}
                  {selectedDieNo !== "all" && (
                    <span
                      style={{
                        padding: "3px 8px",
                        background: "#f0f9ff",
                        border: "1px solid #3b82f6",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        color: "#3b82f6",
                        fontWeight: "500",
                      }}
                    >
                      Die No: {selectedDieNo}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    ({filteredData.length} items found)
                  </span>
                </div>
              )}
              {lastUpdated && (
                <p
                  style={{
                    margin: "4px 0 0 0",
                    color: "#9ca3af",
                    fontSize: "0.9rem",
                  }}
                >
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
              {error && (
                <p
                  style={{
                    margin: "4px 0 0 0",
                    color: "#dc2626",
                    fontSize: "0.9rem",
                  }}
                >
                  ⚠️ Using sample data - API connection failed
                </p>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {/* Global Search Box */}
            <div style={{ position: "relative", minWidth: "200px" }}>
              <Search
                size={14}
                color="#64748b"
                style={{
                  position: "absolute",
                  left: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1,
                }}
              />
              <input
                type="text"
                placeholder="Search anything..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                style={{
                  padding: "8px 12px 8px 28px",
                  borderRadius: "8px",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                  background: "white",
                  fontSize: "13px",
                  outline: "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease",
                  width: "100%",
                  minWidth: "180px",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#6366f1";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(99, 102, 241, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(99, 102, 241, 0.2)";
                  e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                }}
              />
              {globalSearch && (
                <button
                  onClick={() => setGlobalSearch("")}
                  style={{
                    position: "absolute",
                    right: "4px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "2px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={12} color="#64748b" />
                </button>
              )}
            </div>

            <button
              onClick={fetchInventoryData}
              disabled={loading}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                background: "white",
                fontSize: "13px",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#6366f1",
              }}
            >
              <RefreshCw
                size={12}
                style={{
                  animation: loading ? "spin 1s linear infinite" : "none",
                }}
              />
              Refresh
            </button>

            {(selectedMaterial !== "all" ||
              selectedDieNo !== "all" ||
              globalSearch) && (
              <button
                onClick={() => {
                  setSelectedMaterial("all");
                  setSelectedDieNo("all");
                  setGlobalSearch("");
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(220, 38, 38, 0.2)",
                  background: "white",
                  fontSize: "13px",
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#dc2626",
                }}
              >
                <X size={12} />
                Clear All
              </button>
            )}

            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                background: "white",
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
                fontWeight: "500",
                minWidth: "120px",
              }}
            >
              <option value="all">All Materials</option>
              {materialTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={selectedDieNo}
              onChange={(e) => setSelectedDieNo(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                background: "white",
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
                fontWeight: "500",
                minWidth: "100px",
              }}
            >
              <option value="all">All Dies</option>
              {dieNumbers.map((dieNo) => (
                <option key={dieNo} value={dieNo}>
                  {dieNo}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {loading
          ? // Show skeleton loaders when loading
            [1, 2, 3, 4].map((index) => <KPICardSkeleton key={index} />)
          : // Show actual KPI cards when data is loaded
            [
              {
                title: "Total Stock Value",
                value: `${(summaryStats.totalStock / 1000).toFixed(1)}K`,
                subtext: "Tonnes",
                icon: Package,
                color: "#6366f1",
                trend: "+12%",
              },
              {
                title: "WIP Utilization",
                value: `${summaryStats.wipUtilization}%`,
                subtext: "vs Desired WIP",
                icon: Target,
                color: "#10b981",
                trend: "+5%",
              },
              {
                title: "Critical Items",
                value: summaryStats.criticalItems,
                subtext: "Need Attention",
                icon: AlertTriangle,
                color: "#dc2626",
                trend: "-2",
              },
              {
                title: "Avg Days Stock",
                value: summaryStats.avgDaysStock,
                subtext: "Days Coverage",
                icon: ShieldCheck,
                color: "#f59e0b",
                trend: "+0.5",
              },
            ].map((kpi, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "12px",
                  padding: "14px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.05)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${kpi.color}, ${kpi.color}dd)`,
                      padding: "8px",
                      borderRadius: "8px",
                      boxShadow: `0 2px 8px ${kpi.color}30`,
                    }}
                  >
                    <kpi.icon size={16} color="white" />
                  </div>
                  <div
                    style={{
                      background: kpi.trend.startsWith("+")
                        ? "#f0fdf4"
                        : "#fef2f2",
                      color: kpi.trend.startsWith("+") ? "#16a34a" : "#dc2626",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                    }}
                  >
                    {kpi.trend}
                  </div>
                </div>

                <h3
                  style={{
                    margin: "0 0 4px 0",
                    color: "#64748b",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {kpi.title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    {kpi.value}
                  </span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    {kpi.subtext}
                  </span>
                </div>
              </div>
            ))}
      </div>

      {/* Charts Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          {/* Title + Dropdown aligned in one row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#1e293b",
                fontSize: "1.5rem",
                fontWeight: "700",
              }}
            >
              {viewMode === "overview"
                ? "Stock vs Desired WIP Levels"
                : "Consumption vs Stock Analysis"}
            </h3>

            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                background: "white",
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
                fontWeight: "500",
                minWidth: "90px",
              }}
            >
              <option value="overview">WIP</option>
              <option value="detailed">Raw Material</option>
            </select>
          </div>

          {loading ? (
            <div
              style={{
                height: "280px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader2
                size={48}
                color="#6366f1"
                style={{ animation: "spin 1s linear infinite" }}
              />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              {viewMode === "overview" ? (
                <BarChart
                  // Sort bars DESC by stock before plotting
                  data={[...chartData].sort((a, b) => b.stock - a.stock)}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="material" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.98)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                      backdropFilter: "blur(20px)",
                    }}
                  />
                  <Bar
                    dataKey="stock"
                    fill="#6366f1"
                    name="Current Stock"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="desired"
                    fill="#10b981"
                    name="Desired WIP"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="material" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255, 255, 255, 0.98)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                      backdropFilter: "blur(20px)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="stock"
                    stroke="#6366f1"
                    fill="url(#stockGradient)"
                    strokeWidth={3}
                    name="Current Stock"
                  />
                  <Area
                    type="monotone"
                    dataKey="consumption"
                    stroke="#f59e0b"
                    fill="url(#consumptionGradient)"
                    strokeWidth={3}
                    name="Daily Consumption"
                  />
                  <defs>
                    <linearGradient
                      id="stockGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="consumptionGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#f59e0b"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                </AreaChart>
              )}
            </ResponsiveContainer>
          )}
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <h3
            style={{
              margin: "0 0 25px 0",
              color: "#1e293b",
              fontSize: "1.5rem",
              fontWeight: "700",
            }}
          >
            Status Distribution
          </h3>
          {loading ? (
            <div
              style={{
                height: "280px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader2
                size={48}
                color="#6366f1"
                style={{ animation: "spin 1s linear infinite" }}
              />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={(data) => {
                    if (data && data.value > 0) {
                      setSelectedStatus(data.name.toLowerCase());
                      setStatusDetailModal(true);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{
                        cursor: entry.value > 0 ? "pointer" : "default",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.98)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Detailed Table */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "30px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <h3
          style={{
            margin: "0 0 25px 0",
            color: "#1e293b",
            fontSize: "1.5rem",
            fontWeight: "700",
          }}
        >
          Inventory Details
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {[
                  "Die No",
                  "Material",
                  "Current Stock",
                  "Daily Usage",
                  "Days Left",
                  "Status",
                  "WIP %",
                ].map((header, index) => (
                  <th
                    key={index}
                    style={{
                      padding: "10px 8px",
                      textAlign: "left",
                      fontWeight: "600",
                      color: "#374151",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderBottom: "2px solid #e5e7eb",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? // Show skeleton loaders when loading
                  [1, 2, 3, 4, 5].map((index) => (
                    <TableRowSkeleton key={index} />
                  ))
                : // Show actual data rows when loaded
                  filteredData.slice(0, 10).map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f8fafc";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <td
                        style={{
                          padding: "10px 8px",
                          fontWeight: "600",
                          color: "#1e293b",
                        }}
                      >
                        {item.inv_die_no}
                      </td>
                      <td
                        style={{
                          padding: "10px 8px",
                          color: "#374151",
                          maxWidth: "200px",
                        }}
                      >
                        <div style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                          {item.raw_material.length > 30
                            ? `${item.raw_material.substring(0, 30)}...`
                            : item.raw_material}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                          {item.r_code}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "10px 8px",
                          fontWeight: "600",
                          color: "#1e293b",
                        }}
                      >
                        {item.daily_opening_stock.toLocaleString()} {item.unit}
                      </td>
                      <td style={{ padding: "15px 12px", color: "#374151" }}>
                        {item.daily_material_qty.toFixed(2)} {item.unit}/day
                      </td>
                      <td style={{ padding: "15px 12px", fontWeight: "600" }}>
                        <span
                          style={{
                            color:
                              parseFloat(item.days_of_stock) < 10
                                ? "#dc2626"
                                : parseFloat(item.days_of_stock) < 30
                                ? "#f59e0b"
                                : "#10b981",
                          }}
                        >
                          {item.days_of_stock} days
                        </span>
                      </td>
                      <td style={{ padding: "15px 12px" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            background: `${statusColors[item.status]}20`,
                            color: statusColors[item.status],
                            border: `2px solid ${statusColors[item.status]}30`,
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: "15px 12px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              height: "6px",
                              background: "#e5e7eb",
                              borderRadius: "3px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${Math.min(
                                  parseFloat(item.wip_level),
                                  100
                                )}%`,
                                height: "100%",
                                background:
                                  parseFloat(item.wip_level) > 80
                                    ? "#3b82f6"
                                    : parseFloat(item.wip_level) > 50
                                    ? "#10b981"
                                    : "#f59e0b",
                                borderRadius: "3px",
                                transition: "width 0.3s ease",
                              }}
                            ></div>
                          </div>
                          <span
                            style={{
                              fontSize: "0.8rem",
                              fontWeight: "500",
                              color: "#374151",
                            }}
                          >
                            {item.wip_level}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Detail Modal */}
      {statusDetailModal && selectedStatus && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            animation: "fadeIn 0.3s ease",
          }}
          onClick={() => setStatusDetailModal(false)}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: "30px",
              maxWidth: "90%",
              width: "900px",
              maxHeight: "80vh",
              overflow: "auto",
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              animation: "slideUp 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
                borderBottom: "2px solid #f1f5f9",
                paddingBottom: "15px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${statusColors[selectedStatus]}, ${statusColors[selectedStatus]}dd)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 8px 20px ${statusColors[selectedStatus]}30`,
                  }}
                >
                  {selectedStatus === "critical" && (
                    <AlertTriangle size={24} color="white" />
                  )}
                  {selectedStatus === "low" && (
                    <TrendingDown size={24} color="white" />
                  )}
                  {selectedStatus === "optimal" && (
                    <CheckCircle size={24} color="white" />
                  )}
                  {selectedStatus === "excess" && (
                    <TrendingUp size={24} color="white" />
                  )}
                </div>
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#1e293b",
                      textTransform: "capitalize",
                    }}
                  >
                    {selectedStatus} Items
                  </h2>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      color: "#64748b",
                      fontSize: "0.9rem",
                    }}
                  >
                    {
                      processedData.filter(
                        (item) => item.status === selectedStatus
                      ).length
                    }{" "}
                    items in this category
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStatusDetailModal(false)}
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)";
                }}
              >
                <X size={20} color="#64748b" />
              </button>
            </div>

            {/* Summary Statistics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              {(() => {
                const statusItems = processedData.filter(
                  (item) => item.status === selectedStatus
                );
                const totalStock = statusItems.reduce(
                  (sum, item) => sum + item.daily_opening_stock,
                  0
                );
                const avgDaysStock =
                  statusItems.length > 0
                    ? statusItems.reduce(
                        (sum, item) => sum + parseFloat(item.days_of_stock),
                        0
                      ) / statusItems.length
                    : 0;
                const totalConsumption = statusItems.reduce(
                  (sum, item) => sum + item.daily_material_qty,
                  0
                );

                return [
                  {
                    label: "Total Items",
                    value: statusItems.length,
                    color: statusColors[selectedStatus],
                    icon: Package,
                  },
                  {
                    label: "Total Stock",
                    value: `${(totalStock / 1000).toFixed(1)}K ${
                      statusItems[0]?.unit || "TO"
                    }`,
                    color: "#6366f1",
                    icon: Warehouse,
                  },
                  {
                    label: "Avg Days Stock",
                    value: `${avgDaysStock.toFixed(1)} days`,
                    color: "#f59e0b",
                    icon: ShieldCheck,
                  },
                  {
                    label: "Daily Consumption",
                    value: `${totalConsumption.toFixed(1)} ${
                      statusItems[0]?.unit || "TO"
                    }`,
                    color: "#10b981",
                    icon: TrendingUp,
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      background: `${stat.color}10`,
                      borderRadius: "12px",
                      padding: "15px",
                      border: `2px solid ${stat.color}20`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "8px",
                      }}
                    >
                      <stat.icon size={18} color={stat.color} />
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "#64748b",
                          fontWeight: "500",
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "700",
                        color: "#1e293b",
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Detailed Items Table */}
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "12px",
                padding: "20px",
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
              <h3
                style={{
                  margin: "0 0 15px 0",
                  color: "#1e293b",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                Detailed Items List
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                    {[
                      "Die No",
                      "Material",
                      "Stock",
                      "Daily Usage",
                      "Days Left",
                      "Action Required",
                    ].map((header) => (
                      <th
                        key={header}
                        style={{
                          padding: "10px",
                          textAlign: "left",
                          fontSize: "0.85rem",
                          color: "#64748b",
                          fontWeight: "600",
                          textTransform: "uppercase",
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {processedData
                    .filter((item) => item.status === selectedStatus)
                    .sort(
                      (a, b) =>
                        parseFloat(a.days_of_stock) -
                        parseFloat(b.days_of_stock)
                    )
                    .map((item, index) => (
                      <tr
                        key={index}
                        style={{
                          borderBottom: "1px solid #f1f5f9",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 10px",
                            fontWeight: "600",
                            color: "#1e293b",
                          }}
                        >
                          {item.inv_die_no}
                        </td>
                        <td style={{ padding: "12px 10px", color: "#374151" }}>
                          <div
                            style={{ fontSize: "0.9rem", fontWeight: "500" }}
                          >
                            {item.raw_material}
                          </div>
                          <div
                            style={{ fontSize: "0.75rem", color: "#9ca3af" }}
                          >
                            {item.r_code}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "12px 10px",
                            fontWeight: "600",
                            color: "#1e293b",
                          }}
                        >
                          {item.daily_opening_stock.toLocaleString()}{" "}
                          {item.unit}
                        </td>
                        <td style={{ padding: "12px 10px", color: "#374151" }}>
                          {item.daily_material_qty.toFixed(2)} {item.unit}/day
                        </td>
                        <td style={{ padding: "12px 10px" }}>
                          <span
                            style={{
                              fontWeight: "600",
                              color: statusColors[selectedStatus],
                            }}
                          >
                            {item.days_of_stock} days
                          </span>
                        </td>
                        <td style={{ padding: "12px 10px" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "6px",
                              fontSize: "0.8rem",
                              fontWeight: "500",
                              background:
                                selectedStatus === "critical"
                                  ? "#fef2f2"
                                  : selectedStatus === "low"
                                  ? "#fffbeb"
                                  : selectedStatus === "optimal"
                                  ? "#f0fdf4"
                                  : "#eff6ff",
                              color:
                                selectedStatus === "critical"
                                  ? "#dc2626"
                                  : selectedStatus === "low"
                                  ? "#f59e0b"
                                  : selectedStatus === "optimal"
                                  ? "#10b981"
                                  : "#3b82f6",
                            }}
                          >
                            {selectedStatus === "critical"
                              ? "Order Now!"
                              : selectedStatus === "low"
                              ? "Order Soon"
                              : selectedStatus === "optimal"
                              ? "Monitor"
                              : "Reduce Order"}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Action Recommendations */}
            {selectedStatus && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  background: `${statusColors[selectedStatus]}10`,
                  borderRadius: "12px",
                  border: `2px solid ${statusColors[selectedStatus]}20`,
                }}
              >
                <h4
                  style={{
                    margin: "0 0 10px 0",
                    color: "#1e293b",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Recommended Actions
                </h4>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "20px",
                    color: "#374151",
                    fontSize: "0.9rem",
                    lineHeight: "1.6",
                  }}
                >
                  {selectedStatus === "critical" && (
                    <>
                      <li>
                        Place emergency orders immediately for all critical
                        items
                      </li>
                      <li>Contact suppliers for expedited delivery options</li>
                      <li>
                        Review production schedules to minimize consumption
                      </li>
                      <li>Consider alternative materials if available</li>
                    </>
                  )}
                  {selectedStatus === "low" && (
                    <>
                      <li>Schedule orders within the next 3-5 days</li>
                      <li>Monitor consumption rates daily</li>
                      <li>Update safety stock levels if needed</li>
                      <li>
                        Coordinate with procurement team for timely orders
                      </li>
                    </>
                  )}
                  {selectedStatus === "optimal" && (
                    <>
                      <li>Continue regular monitoring</li>
                      <li>Maintain current ordering patterns</li>
                      <li>Review for potential optimization opportunities</li>
                      <li>Document successful inventory practices</li>
                    </>
                  )}
                  {selectedStatus === "excess" && (
                    <>
                      <li>Reduce or postpone upcoming orders</li>
                      <li>Review consumption forecasts for accuracy</li>
                      <li>Consider reallocating excess to other facilities</li>
                      <li>Analyze root cause of excess inventory</li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Chat Assistant */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "none",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              animation: "pulse 2s infinite",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px rgba(99, 102, 241, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(99, 102, 241, 0.4)";
            }}
          >
            <Bot size={28} color="white" />
          </button>
        )}

        {chatOpen && (
          <div
            style={{
              width: chatMinimized ? "300px" : "400px",
              height: chatMinimized ? "60px" : "500px",
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                padding: "20px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Brain size={20} />
                </div>
                <div>
                  <h3
                    style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700" }}
                  >
                    AI Assistant
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.8rem", opacity: "0.8" }}>
                    {isTyping ? "Thinking..." : "Online"}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setChatMinimized(!chatMinimized)}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  {chatMinimized ? (
                    <Maximize2 size={16} />
                  ) : (
                    <Minimize2 size={16} />
                  )}
                </button>
                <button
                  onClick={() => setChatOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!chatMinimized && (
              <>
                <div
                  style={{
                    flex: 1,
                    padding: "20px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        flexDirection:
                          msg.type === "user" ? "row-reverse" : "row",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background:
                            msg.type === "bot"
                              ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                              : "linear-gradient(135deg, #10b981, #059669)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {msg.type === "bot" ? (
                          <Bot size={16} color="white" />
                        ) : (
                          <User size={16} color="white" />
                        )}
                      </div>
                      <div
                        style={{
                          background:
                            msg.type === "user" ? "#f0f9ff" : "#f8fafc",
                          padding: "12px 16px",
                          borderRadius: "16px",
                          maxWidth: "80%",
                          border: `2px solid ${
                            msg.type === "user" ? "#e0f2fe" : "#f1f5f9"
                          }`,
                          whiteSpace: "pre-wrap",
                          fontSize: "0.9rem",
                          lineHeight: "1.4",
                        }}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Bot size={16} color="white" />
                      </div>
                      <div
                        style={{
                          background: "#f8fafc",
                          padding: "12px 16px",
                          borderRadius: "16px",
                          border: "2px solid #f1f5f9",
                          display: "flex",
                          gap: "4px",
                        }}
                      >
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "#6366f1",
                              animation: `bounce 1.4s infinite ${i * 0.2}s`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    padding: "20px",
                    borderTop: "2px solid #f1f5f9",
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about inventory, stock levels, recommendations..."
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      outline: "none",
                      transition: "all 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#6366f1";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim()}
                    style={{
                      padding: "12px",
                      background: currentMessage.trim()
                        ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                        : "#e5e7eb",
                      border: "none",
                      borderRadius: "12px",
                      cursor: currentMessage.trim() ? "pointer" : "not-allowed",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Send size={16} color="white" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Animations */}

      <style>
        {`
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
      100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes bounce {
      0%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-8px); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    @keyframes slideUp {
      0% { 
        opacity: 0;
        transform: translateY(20px);
      }
      100% { 
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}
      </style>
    </div>
  );
};

export default InventoryDashboard;
