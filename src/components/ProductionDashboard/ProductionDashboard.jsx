import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Clock,
  Activity,
  Factory,
  Users,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Loader,
} from "lucide-react";

const ProductionDashboard = () => {
  const [selectedForge, setSelectedForge] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [selectedView, setSelectedView] = useState("summary");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [productionData, setProductionData] = useState([]);
  const [planVsActualData, setPlanVsActualData] = useState([]);
  const [selectedChartTab, setSelectedChartTab] = useState("graph");

  const thStyle = {
    padding: "12px",
    textAlign: "left",
    fontWeight: "700",
    color: "#334155",
    borderBottom: "1px solid #e2e8f0",
  };

  const tdStyle = {
    padding: "12px",
    textAlign: "left",
    color: "#475569",
    fontWeight: "500",
    borderBottom: "1px solid #e2e8f0",
  };

  // Plant code to location mapping
  const plantCodeToLocation = {
    7026: "R1",
    2101: "R2",
    7027: "R2",
    7001: "Mundhwa",
    7028: "Baramati",
  };

  // Function to determine forge type based on press name
  const getForgeType = (press) => {
    if (
      press.includes("4000") ||
      press.includes("3000") ||
      press.includes("2500")
    ) {
      return "Big Forge";
    }
    return "Small Forge";
  };

  // Improved date filtering function
  const filterDataByDate = (data, targetDate) => {
    if (!data || !Array.isArray(data) || !targetDate) return data;

    return data.filter((item) => {
      const itemDate = item.date || item.production_date || item.created_date;
      if (!itemDate) return false;

      // Extract date part only (YYYY-MM-DD)
      const itemDateOnly = itemDate.split("T")[0] || itemDate.split(" ")[0];
      return itemDateOnly === targetDate;
    });
  };

  // Updated transformation with date filtering
  const transformPlanVsActualData = (planVsActualArray) => {
    if (!planVsActualArray || !Array.isArray(planVsActualArray)) {
      console.log("❌ No plan_vs_actual array provided");
      return [];
    }

    console.log(
      "🔍 Raw plan_vs_actual data sample:",
      planVsActualArray.slice(0, 3)
    );
    console.log(
      "🔍 Total entries in plan_vs_actual:",
      planVsActualArray.length
    );

    // Filter by selected date first
    const dateFilteredData = filterDataByDate(planVsActualArray, selectedDate);
    console.log(
      `📅 Data for ${selectedDate}:`,
      dateFilteredData.length,
      "entries"
    );

    // If no data for selected date, show today's data or latest available
    let dataToUse = dateFilteredData;
    if (dateFilteredData.length === 0) {
      // Try to find today's data
      const today = new Date().toISOString().slice(0, 10);
      const todayData = filterDataByDate(planVsActualArray, today);

      if (todayData.length > 0) {
        dataToUse = todayData;
        console.log(
          `📅 No data for ${selectedDate}, showing today's data:`,
          todayData.length
        );
      } else {
        // Show latest available data (first 50 entries to keep chart readable)
        dataToUse = planVsActualArray.slice(0, 50);
        console.log(
          "📅 No data for selected date or today, showing latest 50 entries"
        );
      }
    }

    // Transform the filtered data
    const result = dataToUse.map((item) => ({
      name: item.press,
      plant_code: item.plant_code,
      location: plantCodeToLocation[item.plant_code] || "Unknown",
      planned: item.planned_qty || 0,
      actual: item.actual_qty || 0,
      balance: (item.planned_qty || 0) - (item.actual_qty || 0),
      efficiency:
        item.planned_qty > 0
          ? ((item.actual_qty / item.planned_qty) * 100).toFixed(1)
          : "0.0",
      forge: getForgeType(item.press),
      date: item.date || item.production_date || item.created_date,
    }));

    // Filter out entries with both planned and actual = 0
    const filteredResult = result.filter(
      (item) => item.planned > 0 || item.actual > 0
    );

    console.log("✅ Final transformed data:", filteredResult.length, "entries");
    return filteredResult;
  };

  // Transform API data to match existing structure
  const transformApiData = (data) => {
    if (!data || !data.summary) return [];

    return data.summary.map((item, index) => {
      const efficiency =
        item.current_avg_per_day > 0
          ? (
              (item.current_avg_per_day / item.required_avg_per_day) *
              100
            ).toFixed(1)
          : "0.0";

      return {
        plantCode: item.plant_code,
        plant_code: item.plant_code,
        pressLine: item.forge_press,
        prodPlan: item.planned_qty,
        prodQtyTillToday: item.actual_qty_till_today,
        balProdQty: item.balance_qty,
        noOfDaysPlanned: item.planned_days,
        actualWorkingDays: item.actual_days,
        balWorkingDays: item.balance_days,
        currentAvgPerDay: item.current_avg_per_day,
        reqAvgPerDay: Math.round(item.required_avg_per_day),
        // Map month_machine_capacity from API response - check these field names in your API response
        month_machine_capacity:
          item.month_machine_capacity ||
          item.machine_capacity ||
          item.monthly_capacity ||
          item.capacity ||
          item.planned_qty, // fallback to planned qty if no capacity field
        forge: getForgeType(item.forge_press),
        location: plantCodeToLocation[item.plant_code] || "Unknown",
        efficiency: efficiency,
        dailyPlan: Math.round(item.planned_qty / item.planned_days),
        totalPlan: item.planned_qty,
        shiftData: [
          {
            shift: 1,
            dieNo: 1000 + index,
            qty: Math.round(item.actual_qty_till_today * 0.35),
          },
          {
            shift: 2,
            dieNo: 1000 + index,
            qty: Math.round(item.actual_qty_till_today * 0.35),
          },
          {
            shift: 3,
            dieNo: 1000 + index,
            qty: Math.round(item.actual_qty_till_today * 0.3),
          },
        ],
      };
    });
  };

  const fetchData = async () => {
    console.log("📡 fetchData function called");
    setLoading(true);
    setError(null);

    try {
      console.log(
        "🌐 Making API call to:",
        "https://ktflceprd.kalyanicorp.com/internal/asking_rate"
      );

      const response = await fetch(
        "https://ktflceprd.kalyanicorp.com/internal/asking_rate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "📡 Response received:",
        response.status,
        response.statusText
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Data parsed successfully");
      console.log("🔍 Full API Response structure:", Object.keys(data));

      setApiData(data);
      const transformedData = transformApiData(data);
      setProductionData(transformedData);

      // Transform plan_vs_actual data with date filtering
      if (data.plan_vs_actual) {
        console.log("✅ plan_vs_actual found in API response");
        const transformedPlanVsActual = transformPlanVsActualData(
          data.plan_vs_actual
        );
        setPlanVsActualData(transformedPlanVsActual);
      } else {
        console.log("❌ No plan_vs_actual data found in API response");
        setPlanVsActualData([]);
      }
    } catch (err) {
      console.error("❌ Error in fetchData:", err);
      setError(`Failed to fetch data: ${err.message}`);
      setProductionData([]);
      setPlanVsActualData([]);
    } finally {
      setLoading(false);
      console.log("🏁 fetchData completed");
    }
  };

  // Re-fetch data when date changes
  useEffect(() => {
    if (apiData && apiData.plan_vs_actual) {
      console.log("🔄 Date changed, re-filtering plan_vs_actual data");
      const transformedPlanVsActual = transformPlanVsActualData(
        apiData.plan_vs_actual
      );
      setPlanVsActualData(transformedPlanVsActual);
    }
  }, [selectedDate]);

  // Load data on component mount
  useEffect(() => {
    console.log("🚀 Component mounted, calling fetchData...");
    fetchData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      console.log("🔄 Auto-refresh triggered");
      fetchData();
    }, 5 * 60 * 1000);

    return () => {
      console.log("🧹 Cleaning up interval");
      clearInterval(interval);
    };
  }, []);

  const filteredData = useMemo(() => {
    let data = productionData;

    if (selectedForge !== "ALL") {
      data = data.filter((item) => item.forge === selectedForge);
    }

    if (selectedLocation !== "ALL") {
      const locationGroups = {
        R1: ["7026"],
        R2: ["2101", "7027"],
        Mundhwa: ["7001"],
        Baramati: ["7028"],
      };
      data = data.filter((item) =>
        locationGroups[selectedLocation].includes(String(item.plant_code))
      );
    }

    return data;
  }, [productionData, selectedForge, selectedLocation]);

  const summaryStats = useMemo(() => {
    const totalPlan = filteredData.reduce(
      (sum, item) => sum + item.prodPlan,
      0
    );
    const totalActual = filteredData.reduce(
      (sum, item) => sum + item.prodQtyTillToday,
      0
    );
    const totalBalance = filteredData.reduce(
      (sum, item) => sum + item.balProdQty,
      0
    );
    const avgEfficiency =
      filteredData.length > 0
        ? filteredData.reduce(
            (sum, item) => sum + parseFloat(item.efficiency),
            0
          ) / filteredData.length
        : 0;

    const bigForgeTotal = productionData
      .filter((item) => item.forge === "Big Forge")
      .reduce((sum, item) => sum + item.prodQtyTillToday, 0);
    const smallForgeTotal = productionData
      .filter((item) => item.forge === "Small Forge")
      .reduce((sum, item) => sum + item.prodQtyTillToday, 0);

    return {
      totalPlan,
      totalActual,
      totalBalance,
      avgEfficiency: avgEfficiency.toFixed(1),
      completionRate:
        totalPlan > 0 ? ((totalActual / totalPlan) * 100).toFixed(1) : "0",
      bigForgeTotal,
      smallForgeTotal,
      grandTotal: bigForgeTotal + smallForgeTotal,
    };
  }, [filteredData, productionData]);

  // Efficiency chart data - uses summary data for overall efficiency
  const efficiencyChartData = useMemo(() => {
    return filteredData.map((item) => ({
      name: item.pressLine,
      efficiency: parseFloat(item.efficiency),
    }));
  }, [filteredData]);

  // Improved plan vs actual chart data with better filtering
  const planVsActualChartData = useMemo(() => {
    console.log("🔄 Recalculating planVsActualChartData");
    console.log("📊 planVsActualData available:", planVsActualData.length);

    if (!planVsActualData || planVsActualData.length === 0) {
      console.log("❌ No planVsActualData available for chart");
      return [];
    }

    // Apply forge and location filters
    let filteredPlanVsActual = planVsActualData;

    if (selectedForge !== "ALL") {
      filteredPlanVsActual = filteredPlanVsActual.filter((item) => {
        const forgeType = getForgeType(item.name);
        return forgeType === selectedForge;
      });
    }

    if (selectedLocation !== "ALL") {
      const locationGroups = {
        R1: ["7026"],
        R2: ["2101", "7027"],
        Mundhwa: ["7001"],
        Baramati: ["7028"],
      };
      filteredPlanVsActual = filteredPlanVsActual.filter((item) =>
        locationGroups[selectedLocation].includes(String(item.plant_code))
      );
    }

    // Limit to top 20 entries for better chart readability
    const chartData = filteredPlanVsActual
      .slice(0, 20)
      .map((item) => ({
        name:
          item.name.length > 15
            ? item.name.substring(0, 15) + "..."
            : item.name,
        fullName: item.name,
        planned: item.planned,
        actual: item.actual,
        balance: item.balance,
        efficiency: parseFloat(item.efficiency),
        location: item.location,
        forge: getForgeType(item.name),
      }))
      .sort((a, b) => b.capacity - a.capacity);
    console.log("✅ Final chart data entries:", chartData.length);
    return chartData;
  }, [planVsActualData, selectedLocation, selectedForge]);

  // Get unique locations and forges for filters
  const locations = [...new Set(productionData.map((item) => item.location))];
  const forges = [...new Set(productionData.map((item) => item.forge))];

  const KPICard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    color = "blue",
    status,
  }) => (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        borderRadius: "20px",
        padding: "24px",
        color: "#1e293b",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(15, 23, 42, 0.08)",
        border:
          status === "good"
            ? "2px solid #10b981"
            : status === "warning"
            ? "2px solid #f59e0b"
            : "1px solid rgba(226, 232, 240, 0.8)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(15, 23, 42, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(15, 23, 42, 0.08)";
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "60px",
          height: "60px",
          background:
            status === "good"
              ? "linear-gradient(135deg, #10b981, #059669)"
              : status === "warning"
              ? "linear-gradient(135deg, #f59e0b, #d97706)"
              : "linear-gradient(135deg, #3b82f6, #06b6d4)",
          borderRadius: "0 20px 0 40px",
          opacity: "0.1",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          {title}
        </h3>
        <div
          style={{
            padding: "8px",
            borderRadius: "12px",
            background:
              status === "good"
                ? "linear-gradient(135deg, #d1fae5, #a7f3d0)"
                : status === "warning"
                ? "linear-gradient(135deg, #fef3c7, #fde68a)"
                : "linear-gradient(135deg, #dbeafe, #bfdbfe)",
            color:
              status === "good"
                ? "#059669"
                : status === "warning"
                ? "#d97706"
                : "#1d4ed8",
          }}
        >
          <Icon size={20} />
        </div>
      </div>
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "8px",
          color: "#0f172a",
        }}
      >
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: "13px",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {trend &&
            (trend > 0 ? (
              <TrendingUp size={14} color="#10b981" />
            ) : (
              <TrendingDown size={14} color="#ef4444" />
            ))}
          {subtitle}
        </div>
      )}
    </div>
  );

  {
    /* Key Insights */
  }
  {
    productionData.length > 0 && (
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: "20px",
          padding: "28px",
          boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
          border: "1px solid rgba(226, 232, 240, 0.6)",
        }}
      >
        <h3
          style={{
            margin: "0 0 20px 0",
            color: "#0f172a",
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          📊 Key Insights & Status
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              padding: "16px",
              background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
              borderRadius: "12px",
              border: "1px solid #bbf7d0",
            }}
          >
            <div
              style={{
                color: "#166534",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              ✅ Top Performers
            </div>
            <div style={{ fontSize: "14px", color: "#374151" }}>
              {filteredData.filter((item) => parseFloat(item.efficiency) >= 100)
                .length > 0
                ? filteredData
                    .filter((item) => parseFloat(item.efficiency) >= 100)
                    .map((item) => `${item.pressLine} (${item.efficiency}%)`)
                    .join(", ")
                : "No press lines above 100% efficiency yet"}
            </div>
          </div>
          <div
            style={{
              padding: "16px",
              background: "linear-gradient(135deg, #fef3c7, #fed7aa)",
              borderRadius: "12px",
              border: "1px solid #fbbf24",
            }}
          >
            <div
              style={{
                color: "#b45309",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              ⚠️ Needs Attention
            </div>
            <div style={{ fontSize: "14px", color: "#374151" }}>
              {filteredData.filter((item) => parseFloat(item.efficiency) < 80)
                .length > 0
                ? filteredData
                    .filter((item) => parseFloat(item.efficiency) < 80)
                    .map((item) => `${item.pressLine} (${item.efficiency}%)`)
                    .join(", ")
                : "All press lines performing within acceptable range"}
            </div>
          </div>
          <div
            style={{
              padding: "16px",
              background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
              borderRadius: "12px",
              border: "1px solid #93c5fd",
            }}
          >
            <div
              style={{
                color: "#1e40af",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              📈 Progress Status
            </div>
            <div style={{ fontSize: "14px", color: "#374151" }}>
              {filteredData.length > 0
                ? `Day ${filteredData[0].actualWorkingDays} of ${
                    filteredData[0].noOfDaysPlanned
                  } completed. Need to maintain avg ${
                    filteredData.length > 0
                      ? Math.round(
                          summaryStats.totalBalance /
                            filteredData[0].balWorkingDays
                        ).toLocaleString()
                      : 0
                  } units/day to meet target.`
                : "No data available to calculate progress"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ForgeComparisonCard = ({ title, bigForge, smallForge, total }) => (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        borderRadius: "20px",
        padding: "28px",
        boxShadow: "0 8px 32px rgba(15, 23, 42, 0.08)",
        border: "1px solid rgba(226, 232, 240, 0.6)",
      }}
    >
      <h3
        style={{
          margin: "0 0 24px 0",
          color: "#0f172a",
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "16px",
            background: "#f1f5f9",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1e40af",
              marginBottom: "4px",
            }}
          >
            {bigForge.toLocaleString()}
          </div>
          <div
            style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}
          >
            Big Forge
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "16px",
            background: "#f0fdf4",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#059669",
              marginBottom: "4px",
            }}
          >
            {smallForge.toLocaleString()}
          </div>
          <div
            style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}
          >
            Small Forge
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
          borderRadius: "16px",
          border: "2px solid #e2e8f0",
        }}
      >
        <div
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#0f172a",
            marginBottom: "8px",
          }}
        >
          {total.toLocaleString()}
        </div>
        <div style={{ fontSize: "16px", color: "#64748b", fontWeight: "600" }}>
          Grand Total
        </div>
      </div>
    </div>
  );

  // Loading state - only show full page loading on first load
  if (loading && productionData.length === 0) {
    return (
      <div
        style={{
          background:
            "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
          minHeight: "100vh",
          padding: "20px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Header - Always Show */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.08)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
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
            <div>
              <h1
                style={{
                  margin: 0,
                  color: "#1e293b",
                  fontSize: "32px",
                  fontWeight: "700",
                  letterSpacing: "-0.025em",
                }}
              >
                Asking Rate
              </h1>
            </div>
            <button
              disabled={true}
              style={{
                background: "linear-gradient(135deg, #94a3b8, #64748b)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 2px 8px rgba(148, 163, 184, 0.25)",
                opacity: 0.8,
              }}
            >
              <Loader size={16} className="animate-spin" />
              Loading...
            </button>
          </div>
        </div>

        {/* Loading Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "16px",
            padding: "60px 40px",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
            border: "1px solid rgba(226, 232, 240, 0.6)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
              borderRadius: "50%",
              marginBottom: "24px",
            }}
          >
            <Loader
              size={32}
              className="animate-spin"
              style={{ color: "#3b82f6" }}
            />
          </div>
          <h3
            style={{
              margin: "0 0 12px 0",
              color: "#1e293b",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Loading Production Data
          </h3>
          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "15px",
              lineHeight: "1.5",
            }}
          >
            Please wait while we fetch the latest production information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      {/* Compact Header */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "16px 24px",
          marginBottom: "20px",
          boxShadow: "0 2px 8px rgba(15, 23, 42, 0.05)",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Title and Refresh Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#1e293b",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              Asking Rate
            </h1>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            style={{
              background: loading
                ? "linear-gradient(135deg, #94a3b8, #64748b)"
                : "linear-gradient(135deg, #059669, #047857)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 4px rgba(5, 150, 105, 0.2)",
              opacity: loading ? 0.8 : 1,
            }}
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh Data
          </button>
        </div>

        {/* Compact Filters */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "12px 16px",
            background: "#f8fafc",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
            >
              <path d="M3 6h18M7 12h10M10 18h4" />
            </svg>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#475569",
              }}
            >
              Filters
            </span>
            <div
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: "600",
              }}
            >
              {filteredData.length}
            </div>
          </div>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{
              background: "#ffffff",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "8px 12px",
              color: "#374151",
              fontSize: "13px",
              fontWeight: "500",
              minWidth: "140px",
              cursor: "pointer",
            }}
          >
            <option value="ALL">All Locations</option>
            <option value="R1">R1 (Plant 7026)</option>
            <option value="R2">R2 (Plants 2101, 7027)</option>
            <option value="Mundhwa">Mundhwa (Plant 7001)</option>
            <option value="Baramati">Baramati (Plant 7028)</option>
          </select>

          <select
            value={selectedForge}
            onChange={(e) => setSelectedForge(e.target.value)}
            style={{
              background: "#ffffff",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "8px 12px",
              color: "#374151",
              fontSize: "13px",
              fontWeight: "500",
              minWidth: "140px",
              cursor: "pointer",
            }}
          >
            <option value="ALL">All Forge Types</option>
            <option value="Big Forge">Big Forge (4000T, 3000T, 2500T)</option>
            <option value="Small Forge">Small Forge (Others)</option>
          </select>

          <button
            onClick={() => {
              setSelectedLocation("ALL");
              setSelectedForge("ALL");
            }}
            style={{
              background: "#f1f5f9",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "8px 12px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#475569",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            Reset
          </button>

          {/* Active Filters */}
          {(selectedLocation !== "ALL" || selectedForge !== "ALL") && (
            <div style={{ display: "flex", gap: "6px", marginLeft: "8px" }}>
              {selectedLocation !== "ALL" && (
                <span
                  style={{
                    background: "#3b82f6",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  {selectedLocation}
                </span>
              )}
              {selectedForge !== "ALL" && (
                <span
                  style={{
                    background: "#3b82f6",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: "600",
                  }}
                >
                  {selectedForge}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div
            style={{
              marginTop: "12px",
              padding: "10px 14px",
              background: "#fef3c7",
              color: "#b45309",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "500",
              border: "1px solid #fbbf24",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="m12 17 .01 0" />
            </svg>
            {error}
          </div>
        )}
      </div>

      {/* KPI Cards */}
      {productionData.length === 0 && !loading ? (
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "16px",
            padding: "40px",
            textAlign: "center",
            marginBottom: "24px",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
            border: "1px solid rgba(226, 232, 240, 0.6)",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              marginBottom: "16px",
              opacity: 0.5,
            }}
          >
            📊
          </div>
          <h3
            style={{
              margin: "0 0 8px 0",
              color: "#64748b",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            No Data Available
          </h3>
          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              fontSize: "14px",
            }}
          >
            {error
              ? "Failed to load production data"
              : "No production data found"}
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <KPICard
            title="Monthly Production Plan"
            value={summaryStats.totalPlan}
            subtitle="Total units planned"
            icon={Target}
            status="good"
          />
          <KPICard
            title="Production Till Today"
            value={summaryStats.totalActual}
            subtitle={`${summaryStats.completionRate}% of plan achieved`}
            icon={Activity}
            status={
              parseFloat(summaryStats.completionRate) > 4 ? "good" : "warning"
            }
          />
          <KPICard
            title="Balance Production Required"
            value={summaryStats.totalBalance}
            subtitle={`${
              filteredData.length > 0 ? filteredData[0].balWorkingDays : 0
            } working days remaining`}
            icon={Clock}
            status="warning"
          />
          <KPICard
            title="Overall Efficiency"
            value={`${summaryStats.avgEfficiency}%`}
            subtitle="Current vs Required Average"
            icon={
              parseFloat(summaryStats.avgEfficiency) >= 100
                ? CheckCircle
                : AlertTriangle
            }
            status={
              parseFloat(summaryStats.avgEfficiency) >= 100 ? "good" : "warning"
            }
          />
        </div>
      )}

      {/* Forge Comparison */}
      {productionData.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          <ForgeComparisonCard
            title="Today's Production by Forge"
            bigForge={summaryStats.bigForgeTotal}
            smallForge={summaryStats.smallForgeTotal}
            total={summaryStats.grandTotal}
          />

          {/* Efficiency Overview Chart */}
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
              border: "1px solid rgba(226, 232, 240, 0.6)",
            }}
          >
            <h3
              style={{
                margin: "0 0 24px 0",
                color: "#0f172a",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              Efficiency Status
            </h3>
            {efficiencyChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={efficiencyChartData.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.98)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      color: "#1e293b",
                    }}
                    formatter={(value) => [`${value}%`, "Efficiency"]}
                  />
                  <Bar
                    dataKey="efficiency"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="Efficiency %"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div
                style={{
                  height: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                No efficiency data available
              </div>
            )}
          </div>
        </div>
      )}

      {/* Production vs Plan Chart - Improved */}
      {planVsActualChartData.length > 0 ? (
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "20px",
            padding: "28px",
            marginBottom: "24px",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
            border: "1px solid rgba(226, 232, 240, 0.6)",
          }}
        >
          {/* Header with Chart-specific Date Filter */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div>
              <h3
                style={{
                  color: "#0f172a",
                  fontSize: "22px",
                  fontWeight: "700",
                  margin: "0 0 8px 0",
                }}
              >
                Production Plan vs Actual
              </h3>
              <div
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                📊 Showing top {planVsActualChartData.length} press lines
                {selectedForge !== "ALL" && ` | 🏭 Filter: ${selectedForge}`}
                {selectedLocation !== "ALL" &&
                  ` | 📍 Location: ${selectedLocation}`}
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <button
                onClick={() => setSelectedChartTab("graph")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border:
                    selectedChartTab === "graph"
                      ? "2px solid #3b82f6"
                      : "1px solid #cbd5e1",
                  background:
                    selectedChartTab === "graph"
                      ? "linear-gradient(135deg, #e0f2fe, #bfdbfe)"
                      : "#ffffff",
                  color: selectedChartTab === "graph" ? "#1e3a8a" : "#334155",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                📊 Graph View
              </button>
              <button
                onClick={() => setSelectedChartTab("table")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border:
                    selectedChartTab === "table"
                      ? "2px solid #3b82f6"
                      : "1px solid #cbd5e1",
                  background:
                    selectedChartTab === "table"
                      ? "linear-gradient(135deg, #e0f2fe, #bfdbfe)"
                      : "#ffffff",
                  color: selectedChartTab === "table" ? "#1e3a8a" : "#334155",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                📋 Table View
              </button>
            </div>
          </div>

          {/* Chart-specific Day Filter */}
          <div
            style={{
              background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "20px",
              border: "1px solid #0ea5e9",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    background: "#0ea5e9",
                    borderRadius: "6px",
                    padding: "4px",
                    color: "white",
                  }}
                >
                  <Calendar size={16} />
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#0369a1",
                  }}
                >
                  Select Date for Chart Data:
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* Date Picker */}
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    background: "#ffffff",
                    border: "2px solid #0ea5e9",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    color: "#1f2937",
                    fontSize: "14px",
                    fontWeight: "500",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />

                {/* Quick Date Buttons */}
                <button
                  onClick={() =>
                    setSelectedDate(new Date().toISOString().slice(0, 10))
                  }
                  style={{
                    background: "#0ea5e9",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#0284c7";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#0ea5e9";
                  }}
                >
                  📅 Today
                </button>

                <button
                  onClick={() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    setSelectedDate(yesterday.toISOString().slice(0, 10));
                  }}
                  style={{
                    background: "#64748b",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#475569";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#64748b";
                  }}
                >
                  📆 Yesterday
                </button>
              </div>
            </div>

            {/* Selected Date Display */}
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#0369a1",
                  fontWeight: "500",
                }}
              >
                📊 Currently showing data for:
              </span>
              <span
                style={{
                  background: "#0ea5e9",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "16px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {new Date(selectedDate).toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Conditionally Render Graph or Table */}
          {selectedChartTab === "graph" ? (
            <div style={{ marginTop: "16px" }}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={planVsActualChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.98)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      color: "#1e293b",
                    }}
                    formatter={(value, name) => [value.toLocaleString(), name]}
                    labelFormatter={(label, payload) => {
                      const item = payload && payload[0] && payload[0].payload;
                      return item
                        ? `Press: ${item.fullName}`
                        : `Press: ${label}`;
                    }}
                  />
                  <Bar
                    dataKey="planned"
                    fill="#6366f1"
                    name="Planned Qty"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="actual"
                    fill="#10b981"
                    name="Actual Qty"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ overflowX: "auto", marginTop: "16px" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                  minWidth: "800px",
                }}
              >
                <thead>
                  <tr style={{ background: "#f1f5f9" }}>
                    <th style={thStyle}>Press Line</th>
                    <th style={thStyle}>Location</th>
                    <th style={thStyle}>Forge Type</th>
                    <th style={thStyle}>Planned Qty</th>
                    <th style={thStyle}>Actual Qty</th>
                    <th style={thStyle}>Balance</th>
                    <th style={thStyle}>Efficiency %</th>
                  </tr>
                </thead>
                <tbody>
                  {planVsActualChartData.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        background: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                      }}
                    >
                      <td style={tdStyle}>{item.fullName}</td>
                      <td style={tdStyle}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: "600",
                            background: "#e0f2fe",
                            color: "#0369a1",
                          }}
                        >
                          {item.location}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: "600",
                            background:
                              item.forge === "Big Forge"
                                ? "#dbeafe"
                                : "#dcfce7",
                            color:
                              item.forge === "Big Forge"
                                ? "#1e40af"
                                : "#166534",
                          }}
                        >
                          {item.forge}
                        </span>
                      </td>
                      <td style={tdStyle}>{item.planned.toLocaleString()}</td>
                      <td style={tdStyle}>{item.actual.toLocaleString()}</td>
                      <td style={tdStyle}>{item.balance.toLocaleString()}</td>
                      <td style={tdStyle}>
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "11px",
                            fontWeight: "700",
                            background:
                              item.efficiency >= 100
                                ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                                : "linear-gradient(135deg, #fef3c7, #fed7aa)",
                            color:
                              item.efficiency >= 100 ? "#166534" : "#b45309",
                          }}
                        >
                          {item.efficiency.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "20px",
            padding: "28px",
            marginBottom: "24px",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
            border: "1px solid rgba(226, 232, 240, 0.6)",
          }}
        >
          {/* Header with Chart-specific Date Filter - Always Show */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div>
              <h3
                style={{
                  color: "#0f172a",
                  fontSize: "22px",
                  fontWeight: "700",
                  margin: "0 0 8px 0",
                }}
              >
                Production Plan vs Actual
              </h3>
              <div
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                📊 Chart data filtering
                {selectedForge !== "ALL" && ` | 🏭 Filter: ${selectedForge}`}
                {selectedLocation !== "ALL" &&
                  ` | 📍 Location: ${selectedLocation}`}
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <button
                onClick={() => setSelectedChartTab("graph")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border:
                    selectedChartTab === "graph"
                      ? "2px solid #3b82f6"
                      : "1px solid #cbd5e1",
                  background:
                    selectedChartTab === "graph"
                      ? "linear-gradient(135deg, #e0f2fe, #bfdbfe)"
                      : "#ffffff",
                  color: selectedChartTab === "graph" ? "#1e3a8a" : "#334155",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                📊 Graph View
              </button>
              <button
                onClick={() => setSelectedChartTab("table")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border:
                    selectedChartTab === "table"
                      ? "2px solid #3b82f6"
                      : "1px solid #cbd5e1",
                  background:
                    selectedChartTab === "table"
                      ? "linear-gradient(135deg, #e0f2fe, #bfdbfe)"
                      : "#ffffff",
                  color: selectedChartTab === "table" ? "#1e3a8a" : "#334155",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                📋 Table View
              </button>
            </div>
          </div>

          {/* Chart-specific Day Filter - Always Show */}
          <div
            style={{
              background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "20px",
              border: "1px solid #0ea5e9",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    background: "#0ea5e9",
                    borderRadius: "6px",
                    padding: "4px",
                    color: "white",
                  }}
                >
                  <Calendar size={16} />
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#0369a1",
                  }}
                >
                  Select Date for Chart Data:
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* Date Picker */}
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    background: "#ffffff",
                    border: "2px solid #0ea5e9",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    color: "#1f2937",
                    fontSize: "14px",
                    fontWeight: "500",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />

                {/* Quick Date Buttons */}
                <button
                  onClick={() =>
                    setSelectedDate(new Date().toISOString().slice(0, 10))
                  }
                  style={{
                    background: "#0ea5e9",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#0284c7";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#0ea5e9";
                  }}
                >
                  📅 Today
                </button>

                <button
                  onClick={() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    setSelectedDate(yesterday.toISOString().slice(0, 10));
                  }}
                  style={{
                    background: "#64748b",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#475569";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#64748b";
                  }}
                >
                  📆 Yesterday
                </button>
              </div>
            </div>

            {/* Selected Date Display */}
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#0369a1",
                  fontWeight: "500",
                }}
              >
                📊 Currently showing data for:
              </span>
              <span
                style={{
                  background: "#0ea5e9",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "16px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {new Date(selectedDate).toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* No Data Message */}
          <div
            style={{
              textAlign: "center",
              padding: "60px 40px",
              background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
              borderRadius: "16px",
              border: "2px dashed #cbd5e1",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
                opacity: 0.6,
              }}
            >
              📅
            </div>
            <h3
              style={{
                margin: "0 0 12px 0",
                color: "#64748b",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              No Plan vs Actual Data for {selectedDate}
            </h3>
            <p
              style={{
                margin: "0 0 20px 0",
                color: "#94a3b8",
                fontSize: "15px",
                lineHeight: "1.5",
              }}
            >
              No production data found for the selected date.
              <br />
              Try selecting a different date using the date picker above.
            </p>

            {/* Quick Action Suggestions */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() =>
                  setSelectedDate(new Date().toISOString().slice(0, 10))
                }
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0px)";
                }}
              >
                📅 Try Today's Data
              </button>

              <button
                onClick={() => {
                  const yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  setSelectedDate(yesterday.toISOString().slice(0, 10));
                }}
                style={{
                  background: "linear-gradient(135deg, #64748b, #475569)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0px)";
                }}
              >
                📆 Try Yesterday
              </button>

              <button
                onClick={fetchData}
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0px)";
                }}
              >
                🔄 Refresh Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Table */}
      {productionData.length > 0 && (
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
            border: "1px solid rgba(226, 232, 240, 0.6)",
            overflowX: "auto",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              margin: "0 0 24px 0",
              color: "#0f172a",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            Press Line Production Details ({filteredData.length} lines)
          </h3>
          {filteredData.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#64748b" }}
            >
              No data available for the selected filters.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                  minWidth: "1500px",
                  tableLayout: "fixed",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
                      borderBottom: "2px solid #cbd5e1",
                    }}
                  >
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "left",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "100px",
                      }}
                    >
                      Press Line
                    </th>

                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "left",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "90px",
                      }}
                    >
                      Location
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "right",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "90px",
                      }}
                    >
                      Production
                      <br />
                      Plan
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "right",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "90px",
                      }}
                    >
                      Month Machine
                      <br />
                      Capacity
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "right",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "80px",
                      }}
                    >
                      Daily
                      <br />
                      Plan
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "right",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "95px",
                      }}
                    >
                      Prod. Qty
                      <br />
                      till today
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "right",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "90px",
                      }}
                    >
                      Bal Prod.
                      <br />
                      Qty
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "right",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "85px",
                      }}
                    >
                      No. of Days
                      <br />
                      Planned
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "right",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "90px",
                      }}
                    >
                      Actual
                      <br />
                      Working Days
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "right",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "85px",
                      }}
                    >
                      Bal.
                      <br />
                      Working Days
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "right",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "90px",
                      }}
                    >
                      Req. Avg.
                      <br />
                      Per day
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "right",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "95px",
                      }}
                    >
                      Current Avg.
                      <br />
                      Per day
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "center",
                        fontWeight: "700",
                        color: "#334155",
                        fontSize: "13px",
                        lineHeight: "1.2",
                        minWidth: "80px",
                      }}
                    >
                      Efficiency
                      <br />%
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Big Forge Section */}
                  {filteredData.filter((row) => row.forge === "Big Forge")
                    .length > 0 && (
                    <>
                      <tr
                        style={{
                          background:
                            "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                          fontWeight: "bold",
                        }}
                      >
                        <td
                          colSpan="13"
                          style={{
                            padding: "16px 12px",
                            color: "#1e40af",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          🏭 BIG FORGE TOTAL:{" "}
                          {filteredData
                            .filter((row) => row.forge === "Big Forge")
                            .reduce(
                              (sum, item) => sum + item.prodQtyTillToday,
                              0
                            )
                            .toLocaleString()}{" "}
                          units
                        </td>
                      </tr>
                      {filteredData
                        .filter((row) => row.forge === "Big Forge")
                        .map((row, index) => (
                          <tr
                            key={index}
                            style={{
                              borderBottom: "1px solid #e2e8f0",
                              background:
                                index % 2 === 0 ? "#ffffff" : "#f8fafc",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "linear-gradient(135deg, #dbeafe, #bfdbfe)";
                              e.currentTarget.style.transform = "scale(1.01)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                index % 2 === 0 ? "#ffffff" : "#f8fafc";
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          >
                            <td
                              style={{
                                padding: "12px 8px",
                                fontWeight: "700",
                                color: "#0f172a",
                                fontSize: "13px",
                              }}
                            >
                              {row.pressLine}
                            </td>

                            <td
                              style={{
                                padding: "12px 8px",
                                color: "#334155",
                                fontSize: "13px",
                              }}
                            >
                              <span
                                style={{
                                  padding: "4px 8px",
                                  borderRadius: "12px",
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  background:
                                    row.location === "R1"
                                      ? "linear-gradient(135deg, #dbeafe, #bfdbfe)"
                                      : row.location === "R2"
                                      ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                                      : row.location === "Mundhwa"
                                      ? "linear-gradient(135deg, #fef3c7, #fed7aa)"
                                      : "linear-gradient(135deg, #f3e8ff, #ddd6fe)",
                                  color:
                                    row.location === "R1"
                                      ? "#1e40af"
                                      : row.location === "R2"
                                      ? "#166534"
                                      : row.location === "Mundhwa"
                                      ? "#b45309"
                                      : "#7c3aed",
                                }}
                              >
                                {row.location}
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                fontWeight: "700",
                                textAlign: "right",
                                color: "rgb(124, 58, 237)",
                                fontSize: "13px",
                              }}
                            >
                              {row.prodPlan.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                fontWeight: "700",
                                textAlign: "right",
                                color: "rgb(124, 58, 237)",
                                fontSize: "13px",
                              }}
                            >
                              {row.month_machine_capacity
                                ? row.month_machine_capacity.toLocaleString()
                                : "0"}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#7c3aed",
                                fontWeight: "600",
                                fontSize: "13px",
                              }}
                            >
                              {row.dailyPlan.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#16a34a",
                                fontWeight: "700",
                                fontSize: "13px",
                              }}
                            >
                              {row.prodQtyTillToday.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#ea580c",
                                fontWeight: "600",
                                fontSize: "13px",
                              }}
                            >
                              {row.balProdQty.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#475569",
                                fontSize: "13px",
                              }}
                            >
                              {row.noOfDaysPlanned}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#475569",
                                fontSize: "13px",
                              }}
                            >
                              {row.actualWorkingDays}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#475569",
                                fontSize: "13px",
                              }}
                            >
                              {row.balWorkingDays}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#475569",
                                fontWeight: "600",
                                fontSize: "13px",
                              }}
                            >
                              {row.reqAvgPerDay.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                fontWeight: "600",
                                fontSize: "13px",
                                color:
                                  row.currentAvgPerDay >= row.reqAvgPerDay
                                    ? "#16a34a"
                                    : "#dc2626",
                                background:
                                  row.currentAvgPerDay >= row.reqAvgPerDay
                                    ? "linear-gradient(135deg, rgba(220, 252, 231, 0.3), rgba(187, 247, 208, 0.3))"
                                    : "linear-gradient(135deg, rgba(254, 226, 226, 0.3), rgba(252, 165, 165, 0.3))",
                                borderRadius: "6px",
                              }}
                            >
                              {row.currentAvgPerDay.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "center",
                              }}
                            >
                              <span
                                style={{
                                  padding: "4px 12px",
                                  borderRadius: "20px",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  background:
                                    parseFloat(row.efficiency) >= 100
                                      ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                                      : "linear-gradient(135deg, #fef3c7, #fed7aa)",
                                  color:
                                    parseFloat(row.efficiency) >= 100
                                      ? "#166534"
                                      : "#b45309",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                }}
                              >
                                {row.efficiency}%
                              </span>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}

                  {/* Small Forge Section */}
                  {filteredData.filter((row) => row.forge === "Small Forge")
                    .length > 0 && (
                    <>
                      <tr
                        style={{
                          background:
                            "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                          fontWeight: "bold",
                        }}
                      >
                        <td
                          colSpan="13"
                          style={{
                            padding: "16px 12px",
                            color: "#166534",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          🏭 SMALL FORGE TOTAL:{" "}
                          {filteredData
                            .filter((row) => row.forge === "Small Forge")
                            .reduce(
                              (sum, item) => sum + item.prodQtyTillToday,
                              0
                            )
                            .toLocaleString()}{" "}
                          units
                        </td>
                      </tr>
                      {filteredData
                        .filter((row) => row.forge === "Small Forge")
                        .map((row, index) => (
                          <tr
                            key={`small-${index}`}
                            style={{
                              borderBottom: "1px solid #e2e8f0",
                              background:
                                index % 2 === 0 ? "#ffffff" : "#f0fdf4",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "linear-gradient(135deg, #dcfce7, #bbf7d0)";
                              e.currentTarget.style.transform = "scale(1.01)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                index % 2 === 0 ? "#ffffff" : "#f0fdf4";
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          >
                            <td
                              style={{
                                padding: "12px 8px",
                                fontWeight: "700",
                                color: "#0f172a",
                                fontSize: "13px",
                              }}
                            >
                              {row.pressLine}
                            </td>

                            <td
                              style={{
                                padding: "12px 8px",
                                color: "#334155",
                                fontSize: "13px",
                              }}
                            >
                              <span
                                style={{
                                  padding: "4px 8px",
                                  borderRadius: "12px",
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  background:
                                    row.location === "R1"
                                      ? "linear-gradient(135deg, #dbeafe, #bfdbfe)"
                                      : row.location === "R2"
                                      ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                                      : row.location === "Mundhwa"
                                      ? "linear-gradient(135deg, #fef3c7, #fed7aa)"
                                      : "linear-gradient(135deg, #f3e8ff, #ddd6fe)",
                                  color:
                                    row.location === "R1"
                                      ? "#1e40af"
                                      : row.location === "R2"
                                      ? "#166534"
                                      : row.location === "Mundhwa"
                                      ? "#b45309"
                                      : "#7c3aed",
                                }}
                              >
                                {row.location}
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#7c3aed",
                                fontWeight: "600",
                                fontSize: "13px",
                              }}
                            >
                              {row.prodPlan.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#7c3aed",
                                fontWeight: "600",
                                fontSize: "13px",
                              }}
                            >
                              {row.month_machine_capacity
                                ? row.month_machine_capacity.toLocaleString()
                                : "0"}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#7c3aed",
                                fontWeight: "600",
                                fontSize: "13px",
                              }}
                            >
                              {row.dailyPlan.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#16a34a",
                                fontWeight: "700",
                                fontSize: "13px",
                              }}
                            >
                              {row.prodQtyTillToday.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#ea580c",
                                fontWeight: "600",
                                fontSize: "13px",
                              }}
                            >
                              {row.balProdQty.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#475569",
                                fontSize: "13px",
                              }}
                            >
                              {row.noOfDaysPlanned}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#475569",
                                fontSize: "13px",
                              }}
                            >
                              {row.actualWorkingDays}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#475569",
                                fontSize: "13px",
                              }}
                            >
                              {row.balWorkingDays}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                color: "#475569",
                                fontWeight: "600",
                                fontSize: "13px",
                              }}
                            >
                              {row.reqAvgPerDay.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "right",
                                fontWeight: "600",
                                fontSize: "13px",
                                color:
                                  row.currentAvgPerDay >= row.reqAvgPerDay
                                    ? "#16a34a"
                                    : "#dc2626",
                                background:
                                  row.currentAvgPerDay >= row.reqAvgPerDay
                                    ? "linear-gradient(135deg, rgba(220, 252, 231, 0.3), rgba(187, 247, 208, 0.3))"
                                    : "linear-gradient(135deg, rgba(254, 226, 226, 0.3), rgba(252, 165, 165, 0.3))",
                                borderRadius: "6px",
                              }}
                            >
                              {row.currentAvgPerDay.toLocaleString()}
                            </td>
                            <td
                              style={{
                                padding: "12px 8px",
                                textAlign: "center",
                              }}
                            >
                              <span
                                style={{
                                  padding: "4px 12px",
                                  borderRadius: "20px",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  background:
                                    parseFloat(row.efficiency) >= 100
                                      ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                                      : "linear-gradient(135deg, #fef3c7, #fed7aa)",
                                  color:
                                    parseFloat(row.efficiency) >= 100
                                      ? "#166534"
                                      : "#b45309",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                }}
                              >
                                {row.efficiency}%
                              </span>
                            </td>
                          </tr>
                        ))}
                    </>
                  )}

                  {/* Grand Total Row */}
                  <tr
                    style={{
                      background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
                      fontWeight: "bold",
                      border: "2px solid #9ca3af",
                    }}
                  >
                    <td
                      style={{
                        padding: "16px 12px",
                        fontWeight: "800",
                        color: "#111827",
                        fontSize: "14px",
                      }}
                    >
                      GRAND TOTAL
                    </td>
                    <td
                      style={{
                        padding: "16px 12px",
                        fontWeight: "600",
                        color: "#374151",
                        fontSize: "13px",
                      }}
                    >
                      All Locations
                    </td>
                    <td
                      style={{
                        padding: "16px 12px",
                        textAlign: "right",
                        color: "#2563eb",
                        fontWeight: "700",
                        fontSize: "13px",
                        background:
                          "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.15))",
                        borderRadius: "4px",
                      }}
                    >
                      {filteredData
                        .reduce(
                          (sum, item) =>
                            sum + (item.month_machine_capacity || 0),
                          0
                        )
                        .toLocaleString()}
                    </td>

                    <td
                      style={{
                        padding: "16px 12px",
                        textAlign: "right",
                        color: "#111827",
                        fontWeight: "700",
                        fontSize: "13px",
                      }}
                    >
                      {summaryStats.totalPlan.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "16px 12px",
                        textAlign: "right",
                        color: "#7c3aed",
                        fontWeight: "700",
                        fontSize: "13px",
                      }}
                    >
                      {filteredData
                        .reduce((sum, item) => sum + item.dailyPlan, 0)
                        .toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "16px 12px",
                        textAlign: "right",
                        color: "#16a34a",
                        fontWeight: "800",
                        fontSize: "14px",
                      }}
                    >
                      {summaryStats.totalActual.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "16px 12px",
                        textAlign: "right",
                        color: "#ea580c",
                        fontWeight: "700",
                        fontSize: "13px",
                      }}
                    >
                      {summaryStats.totalBalance.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "16px 12px",
                        textAlign: "right",
                        color: "#111827",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      {filteredData.length > 0
                        ? filteredData[0].noOfDaysPlanned
                        : 0}
                    </td>
                    <td
                      style={{
                        padding: "16px 12px",
                        textAlign: "right",
                        color: "#111827",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      {filteredData.length > 0
                        ? filteredData[0].actualWorkingDays
                        : 0}
                    </td>
                    <td
                      style={{
                        padding: "16px 12px",
                        textAlign: "right",
                        color: "#111827",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      {filteredData.length > 0
                        ? filteredData[0].balWorkingDays
                        : 0}
                    </td>
                    <td
                      style={{
                        padding: "16px 12px",
                        textAlign: "right",
                        color: "#111827",
                        fontWeight: "700",
                        fontSize: "13px",
                      }}
                    >
                      {summaryStats.totalActual.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "16px 12px",
                        textAlign: "right",
                        color: "#111827",
                        fontWeight: "700",
                        fontSize: "13px",
                      }}
                    >
                      {filteredData.length > 0
                        ? Math.round(
                            summaryStats.totalBalance /
                              filteredData[0].balWorkingDays
                          ).toLocaleString()
                        : 0}
                    </td>
                    <td style={{ padding: "16px 12px", textAlign: "center" }}>
                      <span
                        style={{
                          padding: "6px 16px",
                          borderRadius: "25px",
                          fontSize: "12px",
                          fontWeight: "800",
                          background:
                            parseFloat(summaryStats.avgEfficiency) >= 100
                              ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                              : "linear-gradient(135deg, #fef3c7, #fed7aa)",
                          color:
                            parseFloat(summaryStats.avgEfficiency) >= 100
                              ? "#166534"
                              : "#b45309",
                          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                          border:
                            "2px solid " +
                            (parseFloat(summaryStats.avgEfficiency) >= 100
                              ? "#10b981"
                              : "#f59e0b"),
                        }}
                      >
                        {summaryStats.avgEfficiency}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Shift Details Section */}
      {selectedView === "shift" && (
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
            border: "1px solid rgba(226, 232, 240, 0.6)",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              margin: "0 0 24px 0",
              color: "#0f172a",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            Shift-wise Production Details
          </h3>
          {filteredData.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#64748b" }}
            >
              No shift data available for the selected filters.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredData.map((row, index) => (
                <div
                  key={index}
                  style={{
                    background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid #cbd5e1",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 16px 0",
                      color: "#0f172a",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    {row.pressLine}
                  </h4>
                  <div style={{ marginBottom: "16px" }}>
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "600",
                        background:
                          row.forge === "Big Forge"
                            ? "linear-gradient(135deg, #dbeafe, #bfdbfe)"
                            : "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                        color:
                          row.forge === "Big Forge" ? "#1e40af" : "#166534",
                      }}
                    >
                      {row.forge} - {row.location}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "12px",
                    }}
                  >
                    {row.shiftData.map((shift, shiftIndex) => (
                      <div
                        key={shiftIndex}
                        style={{
                          background: "#ffffff",
                          borderRadius: "8px",
                          padding: "12px",
                          textAlign: "center",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            marginBottom: "4px",
                          }}
                        >
                          Shift {shift.shift}
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#0f172a",
                            marginBottom: "2px",
                          }}
                        >
                          {shift.qty.toLocaleString()}
                        </div>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>
                          Die: {shift.dieNo}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: "16px",
                      padding: "12px",
                      background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                      borderRadius: "8px",
                      textAlign: "center",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#166534",
                        marginBottom: "4px",
                      }}
                    >
                      Total
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "800",
                        color: "#166534",
                      }}
                    >
                      {row.prodQtyTillToday.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductionDashboard;
