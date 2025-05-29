import { SustainabilityComponent } from "../components/sustainability-component.js"
import { EnvironmentalComponent } from "../components/environmental-component.js"
import { WellnessComponent } from "../components/wellness-component.js"
import { HumanRightsComponent } from "../components/human-rights-component.js"
import { StakeholderComponent } from "../components/stakeholder-component.js"
import { InclusiveComponent } from "../components/inclusive-component.js"
import { ConsumerComponent } from "../components/consumer-component.js"
import { EthicsComponent } from "../components/ethics-component.js"
import { AdvocacyComponent } from "../components/advocacy-component.js"
import { ModalManager } from "../modal/modal-manager.js"

export class ESGDashboard {
  constructor() {
    this.activeTab = "ALL"
    this.components = new Map()
    this.modalManager = new ModalManager()
    this.initializeComponents()
    this.initializeTabs()
  }

  initializeComponents() {
    const componentInstances = [
      new SustainabilityComponent(),
      new EnvironmentalComponent(),
      new WellnessComponent(),
      new HumanRightsComponent(),
      new StakeholderComponent(),
      new InclusiveComponent(),
      new ConsumerComponent(),
      new EthicsComponent(),
      new AdvocacyComponent(),
    ]

    componentInstances.forEach((component) => {
      this.components.set(component.id, component)
    })
  }

  initializeTabs() {
    const tabs = document.querySelectorAll(".tab")

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")
        this.activeTab = tab.getAttribute("data-category")
        this.renderComponents()
      })
    })
  }

  renderComponents() {
    const grid = document.getElementById("components-grid")
    if (!grid) return

    const componentsArray = Array.from(this.components.values())
    const filteredComponents =
      this.activeTab === "ALL"
        ? componentsArray
        : componentsArray.filter((component) => component.category === this.activeTab)

    grid.innerHTML = filteredComponents.map((component) => component.render()).join("")
  }

  openModal(componentId) {
    const component = this.components.get(componentId)
    if (component) {
      this.modalManager.openModal(component.getData())
    }
  }

  updateComponentScore(componentId, newScore) {
    const component = this.components.get(componentId)
    if (component) {
      component.updateScore(newScore)
      this.renderComponents()
    }
  }

  updateComponentTrend(componentId, newTrend) {
    const component = this.components.get(componentId)
    if (component) {
      component.updateTrend(newTrend)
    }
  }

  updateComponentWeight(componentId, newWeight) {
    const component = this.components.get(componentId)
    if (component) {
      component.updateWeight(newWeight)
    }
  }

  updateComponentBenchmark(componentId, newBenchmark) {
    const component = this.components.get(componentId)
    if (component) {
      component.updateBenchmark(newBenchmark)
    }
  }

  getComponent(componentId) {
    return this.components.get(componentId)
  }

  getAllComponents() {
    return Array.from(this.components.values())
  }
}
