// Production Service for API calls and calculations
import { productionData } from '../data/productionData';

class ProductionService {
  // Get production data (mock for now)
  async getProductionData(date) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real implementation, this would be:
      // const response = await fetch(`/api/production?date=${date}`);
      // return response.json();
      
      return productionData;
    } catch (error) {
      console.error('Error fetching production data:', error);
      throw error;
    }
  }

  // Calculate total production
  calculateTotalProduction(data) {
    return data.reduce((sum, item) => sum + item.prodQty, 0);
  }

  // Calculate total plan
  calculateTotalPlan(data) {
    return data.reduce((sum, item) => sum + item.prodPlan, 0);
  }

  // Calculate overall efficiency
  calculateOverallEfficiency(data) {
    const totalProduction = this.calculateTotalProduction(data);
    const totalPlan = this.calculateTotalPlan(data);
    return totalPlan > 0 ? Math.round((totalProduction / totalPlan) * 100) : 0;
  }

  // Get efficiency status based on percentage
  getEfficiencyStatus(efficiency) {
    if (efficiency >= 90) return 'excellent';
    if (efficiency >= 80) return 'good';
    if (efficiency >= 70) return 'warning';
    return 'danger';
  }

  // Format number with commas
  formatNumber(number) {
    return number.toLocaleString();
  }

  // Get status color
  getStatusColor(status) {
    const colors = {
      excellent: '#10B981',
      good: '#3B82F6', 
      warning: '#F59E0B',
      danger: '#EF4444'
    };
    return colors[status] || colors.danger;
  }

  // Prepare chart data
  prepareChartData(data) {
    return data.map(item => ({
      name: item.id,
      plan: item.prodPlan,
      actual: item.prodQty,
      efficiency: item.efficiency
    }));
  }

  // Prepare pie chart data
  preparePieData(data) {
    return data.map(item => ({
      name: item.id,
      value: item.prodQty,
      color: this.getStatusColor(item.status)
    }));
  }
}

export default new ProductionService();