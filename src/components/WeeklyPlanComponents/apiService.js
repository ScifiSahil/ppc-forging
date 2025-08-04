// API Service Layer (Ready for backend integration)
const apiService = {
  getKlnMasterDataByDie: async (dieNumber) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/collection/kln_master_data?$filter=die_number eq ${dieNumber}`
      );
      const data = await response.json();
      return data.objects || [];
    } catch (error) {
      console.error("Error fetching master data by die:", error);
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
  saveWeeklyPlan: async (planData) => {
    // TODO: Replace with actual API call
    // return await fetch('/api/plans', { method: 'POST', body: JSON.stringify(planData) });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Plan saved successfully" });
      }, 1000);
    });
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
};

export default apiService;