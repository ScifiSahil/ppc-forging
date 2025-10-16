import React, { useState, useEffect } from "react";
import { Trash2, Download, Filter } from "lucide-react";
import "./ActivityLog.css";

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [filterType, setFilterType] = useState("all"); // all, edit, delete, create
  const [filterPlant, setFilterPlant] = useState("all");
  const [uniquePlants, setUniquePlants] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Load activities from localStorage on mount
  useEffect(() => {
    loadActivities();
  }, []);

  // Update unique plants when activities change
  useEffect(() => {
    const plants = [...new Set(activities.map((a) => a.plant))].filter(Boolean);
    setUniquePlants(plants);
  }, [activities]);

  const loadActivities = () => {
    try {
      const stored = localStorage.getItem("activityLog");
      if (stored) {
        setActivities(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading activities:", error);
    }
  };

  const clearAllActivities = () => {
    if (window.confirm("Are you sure you want to delete all activity logs?")) {
      localStorage.removeItem("activityLog");
      setActivities([]);
    }
  };

  const downloadActivityLog = () => {
    const dataStr = JSON.stringify(activities, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `activity-log-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filter activities based on type, plant, and search text
  const filteredActivities = activities.filter((activity) => {
    const matchesType = filterType === "all" || activity.type === filterType;
    const matchesPlant = filterPlant === "all" || activity.plant === filterPlant;
    const matchesSearch =
      searchText === "" ||
      activity.plant?.toLowerCase().includes(searchText.toLowerCase()) ||
      activity.prodOrder?.toLowerCase().includes(searchText.toLowerCase()) ||
      activity.user?.toLowerCase().includes(searchText.toLowerCase());

    return matchesType && matchesPlant && matchesSearch;
  });

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const containerStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "2rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
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
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#667eea",
  };

  const filterContainerStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
    alignItems: "center",
  };

  const selectStyle = {
    padding: "0.75rem 1rem",
    border: "2px solid #e1e5e9",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    minWidth: "150px",
  };

  const searchStyle = {
    padding: "0.75rem 1rem",
    border: "2px solid #e1e5e9",
    borderRadius: "8px",
    fontSize: "14px",
    flex: "1",
    minWidth: "200px",
    transition: "border-color 0.3s ease",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const downloadButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
  };

  const clearButtonStyle = {
    ...buttonStyle,
    background: "#ef4444",
    color: "white",
  };

  const tableContainerStyle = {
    overflowX: "auto",
    borderRadius: "12px",
    border: "1px solid #e1e5e9",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  };

  const thStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "1rem",
    textAlign: "left",
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: "0.85rem",
    letterSpacing: "0.05em",
    position: "sticky",
    top: 0,
    zIndex: 10,
  };

  const tdStyle = {
    padding: "1rem",
    borderBottom: "1px solid #e1e5e9",
    background: "rgba(255, 255, 255, 0.8)",
  };

  const activityTypeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.4rem 0.8rem",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
  };

  const statsStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  };

  const statCardStyle = {
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    padding: "1.5rem",
    borderRadius: "12px",
    textAlign: "center",
    border: "1px solid #dee2e6",
  };

  const statValueStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#667eea",
    marginBottom: "0.5rem",
  };

  const statLabelStyle = {
    fontSize: "0.85rem",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontWeight: "600",
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "3rem",
    color: "#9ca3af",
  };

  // Calculate statistics
  const stats = {
    total: activities.length,
    edits: activities.filter((a) => a.type === "edit").length,
    deletes: activities.filter((a) => a.type === "delete").length,
    creates: activities.filter((a) => a.type === "create").length,
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>📊 Activity Log & Audit Trail</h2>
        <div>
          <button onClick={downloadActivityLog} style={downloadButtonStyle}>
            <Download size={16} /> Export
          </button>
          <button
            onClick={clearAllActivities}
            style={{
              ...clearButtonStyle,
              marginLeft: "0.5rem",
            }}
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      {activities.length > 0 && (
        <div style={statsStyle}>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{stats.total}</div>
            <div style={statLabelStyle}>Total Activities</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ ...statValueStyle, color: "#667eea" }}>
              {stats.edits}
            </div>
            <div style={statLabelStyle}>Edits</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ ...statValueStyle, color: "#ef4444" }}>
              {stats.deletes}
            </div>
            <div style={statLabelStyle}>Deletes</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ ...statValueStyle, color: "#10b981" }}>
              {stats.creates}
            </div>
            <div style={statLabelStyle}>Creates</div>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div style={filterContainerStyle}>
        <Filter size={18} color="#667eea" />
        <input
          type="text"
          placeholder="Search by Plant, Prod Order, or User..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={searchStyle}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={selectStyle}
        >
          <option value="all">All Activities</option>
          <option value="edit">Edits</option>
          <option value="delete">Deletes</option>
          <option value="create">Creates</option>
        </select>
        <select
          value={filterPlant}
          onChange={(e) => setFilterPlant(e.target.value)}
          style={selectStyle}
        >
          <option value="all">All Plants</option>
          {uniquePlants.map((plant) => (
            <option key={plant} value={plant}>
              {plant}
            </option>
          ))}
        </select>
      </div>

      {/* Activities Table */}
      {filteredActivities.length > 0 ? (
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Activity Type</th>
                <th style={thStyle}>Plant Code</th>
                <th style={thStyle}>Production Order</th>
                <th style={thStyle}>Die No</th>
                <th style={thStyle}>Changes Made</th>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Timestamp</th>
                <th style={thStyle}>Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity, index) => (
                <tr key={index}>
                  <td style={tdStyle}>
                    <div
                      style={{
                        ...activityTypeStyle,
                        background:
                          activity.type === "edit"
                            ? "#dbeafe"
                            : activity.type === "delete"
                            ? "#fee2e2"
                            : "#dcfce7",
                        color: getActivityColor(activity.type),
                      }}
                    >
                      {getActivityIcon(activity.type)} {activity.type}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <strong>{activity.plant || "N/A"}</strong>
                  </td>
                  <td style={tdStyle}>{activity.prodOrder || "N/A"}</td>
                  <td style={tdStyle}>{activity.dieNo || "N/A"}</td>
                  <td style={tdStyle}>
                    <div style={{ maxWidth: "300px", wordBreak: "break-word" }}>
                      {activity.changes ? (
                        <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
                          {typeof activity.changes === "string"
                            ? activity.changes
                              .split(",")
                              .map((change, i) => (
                                <li key={i}>{change.trim()}</li>
                              ))
                            : Array.isArray(activity.changes)
                            ? activity.changes.map((change, i) => (
                                <li key={i}>{change}</li>
                              ))
                            : Object.entries(activity.changes).map(
                                ([key, value]) => (
                                  <li key={key}>
                                    {key}: {value}
                                  </li>
                                )
                              )}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </td>
                  <td style={tdStyle}>{activity.user || "System"}</td>
                  <td style={{ ...tdStyle, fontSize: "0.85rem", color: "#6b7280" }}>
                    {formatDate(activity.timestamp)}
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#667eea",
                        color: "white",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                      }}
                    >
                      {activity.count || 1}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={emptyStateStyle}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
          <p>No activities found. Start editing to see activity logs.</p>
        </div>
      )}

      {/* Footer Stats */}
      {filteredActivities.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#f3f4f6",
            borderRadius: "8px",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.9rem",
          }}
        >
          Showing {filteredActivities.length} of {activities.length} activities
        </div>
      )}
    </div>
  );
};

export default ActivityLog;