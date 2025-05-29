import { getPerformanceLevel, getCategoryClass, getScoreColor } from "../utils/helpers.js"

export class ModalManager {
  constructor() {
    this.selectedComponent = null
    this.initializeEventListeners()
  }

  initializeEventListeners() {
    const closeBtn = document.getElementById("close-btn")
    const modal = document.getElementById("modal")

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeModal())
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target.id === "modal") {
          this.closeModal()
        }
      })
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.classList.contains("show")) {
        this.closeModal()
      }
    })
  }

  openModal(component) {
    if (!component) return

    this.selectedComponent = component
    const performance = getPerformanceLevel(component.score)
    const categoryClass = getCategoryClass(component.category)

    this.updateModalContent(component, performance, categoryClass)

    const modal = document.getElementById("modal")
    if (modal) {
      modal.classList.add("show")
      document.body.style.overflow = "hidden"
    }
  }

  updateModalContent(component, performance, categoryClass) {
    const elements = {
      title: document.getElementById("modal-title"),
      category: document.getElementById("modal-category"),
      score: document.getElementById("modal-score"),
      weight: document.getElementById("modal-weight"),
      trend: document.getElementById("modal-trend"),
      benchmark: document.getElementById("modal-benchmark"),
      description: document.getElementById("modal-description"),
      details: document.getElementById("modal-details"),
      performanceText: document.getElementById("performance-text"),
      header: document.getElementById("modal-header"),
      performanceIndicator: document.getElementById("performance-indicator"),
      statusIcon: document.querySelector(".status-icon"),
      scoreSection: document.getElementById("score-section"),
    }

    if (elements.title) elements.title.textContent = component.name
    if (elements.category) elements.category.textContent = component.category
    if (elements.score) elements.score.textContent = component.score + "%"
    if (elements.weight) elements.weight.textContent = "Weight: " + component.weight
    if (elements.trend) elements.trend.textContent = component.trend
    if (elements.benchmark) elements.benchmark.textContent = component.benchmark
    if (elements.description) elements.description.textContent = component.description
    if (elements.details) elements.details.textContent = component.details
    if (elements.performanceText) {
      elements.performanceText.textContent = performance.text + " - " + performance.description
    }

    if (elements.header) {
      elements.header.className = "modal-header " + categoryClass
    }
    if (elements.score) {
      elements.score.style.color = getScoreColor(component.score)
      elements.score.className = `score-value ${performance.level}`
    }
    if (elements.performanceIndicator) {
      elements.performanceIndicator.className = `performance-indicator ${performance.level}`
    }
    if (elements.statusIcon) {
      elements.statusIcon.className = `status-icon ${performance.level}`
    }
    if (elements.scoreSection) {
      elements.scoreSection.className = `score-section ${categoryClass}`
    }
  }

  closeModal() {
    const modal = document.getElementById("modal")
    if (modal) {
      modal.classList.remove("show")
      document.body.style.overflow = "auto"
    }
    this.selectedComponent = null
  }
}
