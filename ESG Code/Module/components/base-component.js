import { createScoreGauge } from "../utils/helpers.js"

export class BaseESGComponent {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.category = data.category
    this.description = data.description
    this.details = data.details
    this.score = data.score || 0
    this.trend = data.trend || "-"
    this.weight = data.weight || "-"
    this.benchmark = data.benchmark || "-"
  }

  render() {
    return `
      <div class="card" data-id="${this.id}" onclick="window.esgDashboard.openModal('${this.id}')">
        <p class="comp-name">${this.name}</p>
        ${createScoreGauge(this.score)}
      </div>
    `
  }

  updateScore(newScore) {
    this.score = newScore
  }

  updateTrend(newTrend) {
    this.trend = newTrend
  }

  updateWeight(newWeight) {
    this.weight = newWeight
  }

  updateBenchmark(newBenchmark) {
    this.benchmark = newBenchmark
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      description: this.description,
      details: this.details,
      score: this.score,
      trend: this.trend,
      weight: this.weight,
      benchmark: this.benchmark,
    }
  }
}
