import { ESGDashboard } from "./dashboard/esg-dashboard.js"

// Initialize the dashboard when the page loads
window.addEventListener("DOMContentLoaded", () => {
  window.esgDashboard = new ESGDashboard()
  window.esgDashboard.renderComponents()
})

// Export for global access if needed
export { ESGDashboard }
