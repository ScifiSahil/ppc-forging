// activityTracker.js

/**
 * Log an activity to the activity log
 * @param {string} type - 'edit', 'delete', 'create'
 * @param {object} details - { plant, prodOrder, dieNo, changes, user }
 */
export const logActivity = (type, details = {}) => {
  try {
    const activity = {
      type, // 'edit', 'delete', 'create'
      plant: details.plant || "",
      prodOrder: details.prodOrder || "",
      dieNo: details.dieNo || "",
      changes: details.changes || [],
      user: details.user || "System User",
      timestamp: new Date().toISOString(),
      count: 1,
    };

    // Get existing activities from localStorage
    let activities = [];
    const stored = localStorage.getItem("activityLog");

    if (stored) {
      try {
        activities = JSON.parse(stored);
      } catch (e) {
        console.error("Error parsing stored activities:", e);
        activities = [];
      }
    }

    // Add new activity to beginning of array (latest first)
    activities.unshift(activity);

    // Keep only last 1000 activities to prevent localStorage overflow
    if (activities.length > 1000) {
      activities = activities.slice(0, 1000);
    }

    // Save back to localStorage
    localStorage.setItem("activityLog", JSON.stringify(activities));

    console.log("✅ Activity logged:", activity);
    return true;
  } catch (error) {
    console.error("Error logging activity:", error);
    return false;
  }
};

/**
 * Log an edit activity
 */
export const logEditActivity = (plant, prodOrder, dieNo, changes) => {
  return logActivity("edit", {
    plant,
    prodOrder,
    dieNo,
    changes: Array.isArray(changes) ? changes : [changes],
    user: localStorage.getItem("currentUser") || "System User",
  });
};

/**
 * Log a delete activity
 */
export const logDeleteActivity = (plant, prodOrder, dieNo, reason = "") => {
  return logActivity("delete", {
    plant,
    prodOrder,
    dieNo,
    changes: [`Deleted${reason ? " - " + reason : ""}`],
    user: localStorage.getItem("currentUser") || "System User",
  });
};

/**
 * Log a create activity
 */
export const logCreateActivity = (plant, prodOrder, dieNo, details = []) => {
  return logActivity("create", {
    plant,
    prodOrder,
    dieNo,
    changes: details.length > 0 ? details : ["New record created"],
    user: localStorage.getItem("currentUser") || "System User",
  });
};

/**
 * Get all activities
 */
export const getActivities = () => {
  try {
    const stored = localStorage.getItem("activityLog");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error retrieving activities:", error);
    return [];
  }
};

/**
 * Clear all activities
 */
export const clearActivities = () => {
  try {
    localStorage.removeItem("activityLog");
    return true;
  } catch (error) {
    console.error("Error clearing activities:", error);
    return false;
  }
};

/**
 * Set current user for activity tracking
 */
export const setCurrentUser = (userName) => {
  localStorage.setItem("currentUser", userName);
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  return localStorage.getItem("currentUser") || "System User";
};