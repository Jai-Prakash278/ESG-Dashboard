// // // Nine Component**********************************
// // // ESG Component Cards
// // // Dynamic data objects (can be replaced or updated from API)
// var dynamicScores = {
//   sustainability: 82,
//   environmental: 75,
//   wellness: 88,
//   "human-rights": 59,
//   stakeholder: 79,
//   inclusive: 84,
//   consumer: 56,
//   ethics: 60,
//   advocacy: 81,
// };

// var dynamicTrends = {
//   sustainability: "+5%",
//   environmental: "+2%",
//   wellness: "+7%",
//   "human-rights": "+3%",
//   stakeholder: "+1%",
//   inclusive: "+6%",
//   consumer: "+4%",
//   ethics: "+2%",
//   advocacy: "+3%",
// };

// var dynamicWeights = {
//   sustainability: "20%",
//   environmental: "15%",
//   wellness: "8%",
//   "human-rights": "12%",
//   stakeholder: "7%",
//   inclusive: "8%",
//   consumer: "5%",
//   ethics: "15%",
//   advocacy: "10%",
// };

// var dynamicBenchmarks = {
//   sustainability: "Industry Average: 75%",
//   environmental: "Industry Average: 70%",
//   wellness: "Industry Average: 80%",
//   "human-rights": "Industry Average: 85%",
//   stakeholder: "Industry Average: 76%",
//   inclusive: "Industry Average: 78%",
//   consumer: "Industry Average: 72%",
//   ethics: "Industry Average: 82%",
//   advocacy: "Industry Average: 77%",
// };


// // === Performance Thresholds and Colors ===
// const SCORE_THRESHOLDS = {
//   poor: 60,
//   average: 80,
// };

// const SCORE_COLORS = {
//   poor: "#FF4560",      // Red
//   average: "#FEB019",   // Yellow/Orange
//   good: "#00E396",      // Green
// };

// const PERFORMANCE_LEVELS = {
//   good: {
//     level: "good",
//     text: "Excellent Performance",
//     description: "Exceeding industry standards"
//   },
//   average: {
//     level: "average",
//     text: "Average Performance",
//     description: "Meeting basic requirements"
//   },
//   poor: {
//     level: "poor",
//     text: "Poor Performance",
//     description: "Requires immediate attention"
//   }
// };



// // Data array referencing dynamic variables — you can update dynamic* anytime and then re-render


// var esgData = [
//   {
//     id: "sustainability",
//     name: "Sustainability Score",
//     category: "ENVIRONMENTAL",
//     description:
//       "Measures the organization's overall sustainability practices, including resource usage and carbon footprint.",
//     details:
//       "This comprehensive metric evaluates renewable energy adoption, waste reduction initiatives, and environmental management systems. Tracks progress on carbon neutrality goals and environmental compliance standards.",
//   },
//   {
//     id: "environmental",
//     name: "Environmental Performance",
//     category: "ENVIRONMENTAL",
//     description:
//       "Evaluates the environmental impact, including emissions, waste management, and energy efficiency.",
//     details:
//       "Focuses on reducing environmental footprint through sustainable practices, monitoring air and water quality impacts, and implementing circular economy principles.",
//   },
//   {
//     id: "wellness",
//     name: "Wellness Score",
//     category: "SOCIAL",
//     description:
//       "Assesses employee well-being, including health, safety, and work-life balance initiatives.",
//     details:
//       "Covers mental health support, workplace safety protocols, employee satisfaction metrics, and comprehensive wellness programs that promote healthy work-life integration.",
//   },
//   {
//     id: "human-rights",
//     name: "Human Rights Index",
//     category: "SOCIAL",
//     description:
//       "Measures adherence to human rights standards, including labor practices and community impact.",
//     details:
//       "Evaluates fair labor conditions, supply chain ethics, community development programs, and ensures compliance with international human rights standards.",
//   },
//   {
//     id: "stakeholder",
//     name: "Stakeholder Satisfaction",
//     category: "SOCIAL",
//     description:
//       "Gauges satisfaction levels among stakeholders, including customers, employees, and partners.",
//     details:
//       "Measures engagement quality, feedback responsiveness, relationship management effectiveness, and overall stakeholder trust and satisfaction levels.",
//   },
//   {
//     id: "inclusive",
//     name: "Inclusive & Equitable Index",
//     category: "SOCIAL",
//     description:
//       "Evaluates diversity, equity, and inclusion practices within the organization.",
//     details:
//       "Tracks representation metrics, pay equity, inclusive culture initiatives across all organizational levels, and promotes equal opportunities for all employees.",
//   },
//   {
//     id: "consumer",
//     name: "Consumer Responsibility",
//     category: "SOCIAL",
//     description:
//       "Assesses the organization's responsibility towards consumers, including product safety and transparency.",
//     details:
//       "Covers data privacy, product quality, ethical marketing practices, consumer protection measures, and transparent communication with customers.",
//   },
//   {
//     id: "ethics",
//     name: "Ethics Score",
//     category: "GOVERNANCE",
//     description:
//       "Measures ethical practices, including anti-corruption policies and transparency.",
//     details:
//       "Evaluates code of conduct implementation, whistleblower protection, ethical decision-making frameworks, and maintains high standards of business integrity.",
//   },
//   {
//     id: "advocacy",
//     name: "Responsible Advocacy",
//     category: "GOVERNANCE",
//     description:
//       "Evaluates the organization's advocacy efforts for responsible governance and policy influence.",
//     details:
//       "Assesses lobbying transparency, political contribution disclosure, public policy alignment, and responsible influence on regulatory and policy matters.",
//   },
// ];

// // Helper to add dynamic fields before rendering
// function enrichData(data) {
//   return data.map(item => ({
//     ...item,
//     score: dynamicScores[item.id] ?? 0,
//     trend: dynamicTrends[item.id] ?? "-",
//     weight: dynamicWeights[item.id] ?? "-",
//     benchmark: dynamicBenchmarks[item.id] ?? "-",
//   }));
// }

// // Global variables
// var activeTab = "ALL";
// var selectedComponent = null;

// function getScoreColor(score) {
//   if (score < SCORE_THRESHOLDS.poor) return SCORE_COLORS.poor;
//   if (score < SCORE_THRESHOLDS.average) return SCORE_COLORS.average;
//   return SCORE_COLORS.good;
// }

// function getPerformanceLevel(score) {
//   if (score >= SCORE_THRESHOLDS.average) return PERFORMANCE_LEVELS.good;
//   if (score >= SCORE_THRESHOLDS.poor) return PERFORMANCE_LEVELS.average;
//   return PERFORMANCE_LEVELS.poor;
// }

// function getCategoryClass(category) {
//   return category.toLowerCase();
// }

// // Create score gauge (SVG circle)
// function createScoreGauge(score, size = 110) {
//   var color = getScoreColor(score);
//   var radius = (size - 20) / 2;
//   var circumference = 2 * Math.PI * radius;
//   var strokeDasharray = circumference;
//   var strokeDashoffset = circumference - (score / 100) * circumference;

//   return `
//         <div class="gauge-container" style="width: ${size}px; height: ${size}px;">
//             <svg width="${size}" height="${size}" class="gauge-svg">
//                 <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" class="gauge-background"></circle>
//                 <circle 
//                     cx="${size / 2}" 
//                     cy="${size / 2}" 
//                     r="${radius}" 
//                     class="gauge-progress"
//                     stroke="${color}"
//                     stroke-dasharray="${strokeDasharray}"
//                     stroke-dashoffset="${strokeDashoffset}"
//                 ></circle>
//             </svg>
//             <div class="gauge-text" style="color: ${color};">${score}%</div>
//         </div>
//     `;
// }

// // Render components grid
// function renderComponents() {
//   var grid = document.getElementById("components-grid");
//   var enrichedData = enrichData(esgData);
//   var filteredData = activeTab === "ALL" ? enrichedData : enrichedData.filter(item => item.category === activeTab);

//   grid.innerHTML = filteredData
//     .map(
//       component => `
//         <div class="card" data-id="${component.id}" onclick="openModal('${component.id}')">
//             <p class="comp-name">${component.name}</p>
//             ${createScoreGauge(component.score)}
//         </div>
//     `
//     )
//     .join("");
// }

// // Tabs initialization
// function initializeTabs() {
//   var tabs = document.querySelectorAll(".tab");

//   tabs.forEach(tab => {
//     tab.addEventListener("click", () => {
//       // Remove active class from all tabs
//       tabs.forEach(t => t.classList.remove("active"));

//       // Add active class to clicked tab
//       tab.classList.add("active");

//       // Update active tab
//       activeTab = tab.getAttribute("data-category");

//       // Re-render components
//       renderComponents();
//     });
//   });
// }

// // Modal open with dynamic data
// function openModal(componentId) {
//   var enrichedData = enrichData(esgData);
//   var component = enrichedData.find(item => item.id === componentId);
//   if (!component) return;

//   selectedComponent = component;
//   var performance = getPerformanceLevel(component.score);
//   var categoryClass = getCategoryClass(component.category);

//   // Update modal content dynamically
//   document.getElementById("modal-title").textContent = component.name;
//   document.getElementById("modal-category").textContent = component.category;
//   document.getElementById("modal-score").textContent = component.score + "%";
//   document.getElementById("modal-weight").textContent = "Weight: " + component.weight;
//   document.getElementById("modal-trend").textContent = component.trend;
//   document.getElementById("modal-benchmark").textContent = component.benchmark;
//   document.getElementById("modal-description").textContent = component.description;
//   document.getElementById("modal-details").textContent = component.details;
//   document.getElementById("performance-text").textContent = performance.text + " - " + performance.description;

//   // Apply category and performance classes
//   document.getElementById("modal-header").className = "modal-header " + categoryClass;
//   document.getElementById("modal-score").style.color = getScoreColor(component.score);

//   // Show modal
//   // document.getElementById("modal").style.display = "block";
//   document.getElementById("modal").classList.add("show");
// document.body.style.overflow = "hidden"; // Optional: prevent scroll when modal is open

// // Apply performance-level classes
// document.getElementById("modal-score").className = `score-value ${performance.level}`;
// document.getElementById("performance-indicator").className = `performance-indicator ${performance.level}`;
// document.querySelector(".status-icon").className = `status-icon ${performance.level}`;


// }

// // Close modal
// document.getElementById("close-btn").addEventListener("click", closeModal);
// function closeModal() {
//   document.getElementById("modal").classList.remove("show");
// document.body.style.overflow = "auto";
//   selectedComponent = null;

// }

// document.getElementById("close-btn").addEventListener("click", closeModal);

// document.getElementById("modal").addEventListener("click", function(e) {
//   if (e.target.id === "modal") {
//     closeModal();
//   }
// });

// document.addEventListener("keydown", function(e) {
//   if (e.key === "Escape" && document.getElementById("modal").classList.contains("show")) {
//     closeModal();
//   }
// });

// // Initialize on page load
// window.onload = function () {
//   initializeTabs();
//   renderComponents();
// };
