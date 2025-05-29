import { BaseESGComponent } from "./base-component.js"
import { CATEGORIES } from "../config/constants.js"

export class WellnessComponent extends BaseESGComponent {
  constructor() {
    super({
      id: "wellness",
      name: "Wellness Score",
      category: CATEGORIES.SOCIAL,
      description: "Assesses employee well-being, including health, safety, and work-life balance initiatives.",
      details:
        "Covers mental health support, workplace safety protocols, employee satisfaction metrics, and comprehensive wellness programs that promote healthy work-life integration.",
      score: 88,
      trend: "+7%",
      weight: "8%",
      benchmark: "Industry Average: 80%",
    })
  }

  updateEmployeeSatisfaction(satisfaction) {
    console.log(`Employee satisfaction updated: ${satisfaction}`)
  }

  updateSafetyMetrics(safetyData) {
    console.log(`Safety metrics updated:`, safetyData)
  }
}
