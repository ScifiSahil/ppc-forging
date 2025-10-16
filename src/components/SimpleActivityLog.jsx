import React, { useState } from "react";
import { Download, Trash2, Filter, TrendingUp } from "lucide-react";

const SimpleActivityLog = () => {
  // Static sample data
  const [activities] = useState([
    {
      id: 1,
      type: "edit",
      plant: "Plant001",
      prodOrder: "P-00015",
      dieNo: "1208",
      user: "Rajesh Kumar",
      timestamp: "2025-01-15 14:30:45",
      changes: ["Shift1: 1000 → 1500", "Heat Code: ABC → XYZ"],
    },
    {
      id: 2,
      type: "delete",
      plant: "Plant002",
      prodOrder: "P-00018",
      dieNo: "1215",
      user: "Priya Singh",
      timestamp: "2025-01-15 13:45:20",
      changes: ["Record marked as deleted"],
    },
    {
      id: 3,
      type: "create",
      plant: "Plant001",
      prodOrder: "P-00020",
      dieNo: "1220",
      user: "Amit Patel",
      timestamp: "2025-01-15 12:15:30",
      changes: ["New Production Order", "Quantity: 500", "Customer: LINAMAR"],
    },
    {
      id: 4,
      type: "edit",
      plant: "Plant003",
      prodOrder: "P-00019",
      dieNo: "1210",
      user: "Sanjay Desai",
      timestamp: "2025-01-15 11:30:15",
      changes: ["Shift2: 800 → 900", "Remark: Updated"],
    },
    {
      id: 5,
      type: "edit",
      plant: "Plant002",
      prodOrder: "P-00017",
      dieNo: "1212",
      user: "Rajesh Kumar",
      timestamp: "2025-01-15 10:45:00",
      changes: ["Shift3: 600 → 750", "Net Weight: 3 → 3.5"],
    },
    {
      id: 6,
      type: "create",
      plant: "Plant001",
      prodOrder: "P-00021",
      dieNo: "1225",
      user: "Meera Nair",
      timestamp: "2025-01-15 09:20:45",
      changes: ["New Production Order", "Quantity: 1000", "Customer: DANA"],
    },
    {
      id: 7,
      type: "delete",
      plant: "Plant003",
      prodOrder: "P-00016",
      dieNo: "1205",
      user: "Vikram Singh",
      timestamp: "2025-01-15 08:30:20",
      changes: ["Record archived"],
    },
    {
      id: 8,
      type: "edit",
      plant: "Plant001",
      prodOrder: "P-00014",
      dieNo: "1200",
      user: "Rajesh Kumar",
      timestamp: "2025-01-14 16:45:30",
      changes: ["Section: 66 → 68", "Grade: 6061 → 6063"],
    },
  ]);

  const [filterType, setFilterType] = useState("all");
  const [searchText, setSearchText] = useState("");

  const filteredActivities = activities.filter((activity) => {
    const matchesType = filterType === "all" || activity.type === filterType;
    const matchesSearch =
      searchText === "" ||
      activity.plant.toLowerCase().includes(searchText.toLowerCase()) ||
      activity.prodOrder.toLowerCase().includes(searchText.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchText.toLowerCase());

    return matchesType && matchesSearch;
  });

  const stats = {
    total: activities.length,
    edits: activities.filter((a) => a.type === "edit").length,
    deletes: activities.filter((a) => a.type === "delete").length,
    creates: activities.filter((a) => a.type === "create").length,
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "edit":
        return "✏️";
      case "delete":
        return "🗑️";
      case "create":
        return "➕";
      default:
        return "📝";
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "edit":
        return "#667eea";
      case "delete":
        return "#ef4444";
      case "create":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "2rem",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "2.5rem",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  };

  const titleStyle = {
    fontSize: "2.2rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
  };

  const statsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2.5rem",
  };

  const statCardStyle = (bgColor) => ({
    background: `linear-gradient(135deg, ${bgColor}15 0%, ${bgColor}30 100%)`,
    padding: "1.8rem",
    borderRadius: "15px",
    textAlign: "center",
    border: `2px solid ${bgColor}`,
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  });

  const statValueStyle = (color) => ({
    fontSize: "2.5rem",
    fontWeight: "800",
    color: color,
    marginBottom: "0.5rem",
  });

  const statLabelStyle = {
    fontSize: "0.9rem",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: "700",
  };

  const filterContainerStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "1.5rem",
    background: "rgba(102, 126, 234, 0.05)",
    borderRadius: "12px",
    border: "1px solid rgba(102, 126, 234, 0.1)",
  };

  const selectStyle = {
    padding: "0.8rem 1.2rem",
    border: "2px solid #e1e5e9",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: "160px",
    background: "white",
  };

  const searchStyle = {
    padding: "0.8rem 1.2rem",
    border: "2px solid #e1e5e9",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    flex: "1",
    minWidth: "200px",
    transition: "all 0.3s ease",
    background: "white",
  };

  const tableContainerStyle = {
    overflowX: "auto",
    borderRadius: "15px",
    border: "1px solid #e1e5e9",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.95rem",
  };

  const thStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "1.2rem 1rem",
    textAlign: "left",
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    letterSpacing: "0.08em",
    position: "sticky",
    top: 0,
    zIndex: 10,
  };

  const tdStyle = {
    padding: "1.2rem 1rem",
    borderBottom: "1px solid #e1e5e9",
    background: "white",
  };

  const rowHoverStyle = {
    background: "rgba(102, 126, 234, 0.03)",
  };

  const activityTypeBadgeStyle = (type) => {
    const colors = {
      edit: { bg: "#dbeafe", color: "#667eea", dark: "#1e40af" },
      delete: { bg: "#fee2e2", color: "#ef4444", dark: "#991b1b" },
      create: { bg: "#dcfce7", color: "#10b981", dark: "#065f46" },
    };
    return {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.6rem",
      padding: "0.6rem 1rem",
      borderRadius: "25px",
      fontSize: "0.85rem",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.03em",
      background: colors[type].bg,
      color: colors[type].color,
      border: `2px solid ${colors[type].color}`,
    };
  };

  const timestampStyle = {
    fontSize: "0.85rem",
    color: "#9ca3af",
    fontWeight: "600",
  };

  const changesListStyle = {
    fontSize: "0.9rem",
    lineHeight: "1.6",
    color: "#4b5563",
  };

  const changeItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.4rem",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>📊 Activity Log & Audit Trail</h1>
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
              onMouseOver={(e) => (e.target.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            >
              <Download size={16} /> Export
            </button>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)",
              }}
              onMouseOver={(e) => (e.target.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            >
              <Trash2 size={16} /> Clear
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div style={statsContainerStyle}>
          <div style={statCardStyle("#667eea")}>
            <div style={statValueStyle("#667eea")}>{stats.total}</div>
            <div style={statLabelStyle}>Total Activities</div>
          </div>
          <div style={statCardStyle("#667eea")}>
            <div style={statValueStyle("#667eea")}>{stats.edits}</div>
            <div style={statLabelStyle}>Edits</div>
          </div>
          <div style={statCardStyle("#ef4444")}>
            <div style={statValueStyle("#ef4444")}>{stats.deletes}</div>
            <div style={statLabelStyle}>Deletes</div>
          </div>
          <div style={statCardStyle("#10b981")}>
            <div style={statValueStyle("#10b981")}>{stats.creates}</div>
            <div style={statLabelStyle}>Creates</div>
          </div>
        </div>

        {/* Filters */}
        <div style={filterContainerStyle}>
          <Filter size={20} color="#667eea" />
          <input
            type="text"
            placeholder="🔍 Search by Plant, Order, or User..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={searchStyle}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#e1e5e9")}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={selectStyle}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#e1e5e9")}
          >
            <option value="all">All Activities</option>
            <option value="edit">✏️ Edits Only</option>
            <option value="delete">🗑️ Deletes Only</option>
            <option value="create">➕ Creates Only</option>
          </select>
        </div>

        {/* Table */}
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Plant</th>
                <th style={thStyle}>Production Order</th>
                <th style={thStyle}>Die No</th>
                <th style={thStyle}>Changes</th>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr
                  key={activity.id}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "rgba(102, 126, 234, 0.05)")
                  }
                  onMouseOut={(e) => (e.currentTarget.style.background = "white")}
                >
                  <td style={tdStyle}>
                    <div style={activityTypeBadgeStyle(activity.type)}>
                      {getActivityIcon(activity.type)} {activity.type}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <strong style={{ color: "#667eea", fontSize: "1rem" }}>
                      {activity.plant}
                    </strong>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        fontWeight: "600",
                        color: "#2d3748",
                        background: "#f3f4f6",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "6px",
                      }}
                    >
                      {activity.prodOrder}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        fontWeight: "600",
                        color: "#764ba2",
                      }}
                    >
                      {activity.dieNo}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={changesListStyle}>
                      {activity.changes.map((change, idx) => (
                        <div key={idx} style={changeItemStyle}>
                          <span style={{ color: "#667eea", fontWeight: "700" }}>
                            •
                          </span>
                          {change}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        fontWeight: "600",
                        color: "#4b5563",
                        background: "#f0f1f5",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "6px",
                      }}
                    >
                      {activity.user}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, ...timestampStyle }}>
                    {activity.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1.2rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            color: "white",
            textAlign: "center",
            fontWeight: "700",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <TrendingUp size={18} /> Showing {filteredActivities.length} of{" "}
          {activities.length} activities
        </div>
      </div>
    </div>
  );
};

export default SimpleActivityLog;
