import { SCORE_THRESHOLDS, SCORE_COLORS, PERFORMANCE_LEVELS } from "../config/constants.js"

export function getScoreColor(score) {
  if (score < SCORE_THRESHOLDS.poor) return SCORE_COLORS.poor
  if (score < SCORE_THRESHOLDS.average) return SCORE_COLORS.average
  return SCORE_COLORS.good
}

export function getPerformanceLevel(score) {
  if (score >= SCORE_THRESHOLDS.average) return PERFORMANCE_LEVELS.good
  if (score >= SCORE_THRESHOLDS.poor) return PERFORMANCE_LEVELS.average
  return PERFORMANCE_LEVELS.poor
}

export function getCategoryClass(category) {
  return category.toLowerCase()
}

export function createScoreGauge(score, size = 110) {
  const color = getScoreColor(score)
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (score / 100) * circumference

  return `
    <div class="gauge-container" style="width: ${size}px; height: ${size}px;">
      <svg width="${size}" height="${size}" class="gauge-svg">
        <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" class="gauge-background"></circle>
        <circle 
          cx="${size / 2}" 
          cy="${size / 2}" 
          r="${radius}" 
          class="gauge-progress"
          stroke="${color}"
          stroke-dasharray="${strokeDasharray}"
          stroke-dashoffset="${strokeDashoffset}"
        ></circle>
      </svg>
      <div class="gauge-text" style="color: ${color};">${score}%</div>
    </div>
  `
}
