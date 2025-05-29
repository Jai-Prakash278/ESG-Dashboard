// Comparision Bar Chart
const categories = ['Environmental', 'Social', 'Governance'];

var dynamicScores = {
  sustainability: 82,
  environmental: 75,
  wellness: 88,
  "human-rights": 59,
  stakeholder: 79,
  inclusive: 84,
  consumer: 56,
  ethics: 60,
  advocacy: 81,
};


const seriesNames = [
  "Sustainability",
  "Performance",
  "Wellness",
  "Human Rights",
  "Stakeholder",
  "Inclusive",
  "Consumer",
  "Ethics",
  "Advocacy"
];

// const seriesValues = [
//   [82, 0, 0],
//   [75, 0, 0],
//   [0, 88, 0],
//   [0, 59, 0],
//   [0, 79, 0],
//   [0, 84, 0],
//   [0, 56, 0],
//   [0, 0, 60],
//   [0, 0, 81]
// ];

const seriesColors = [
  "#10b981",
  "#34d399",
  "#3b82f6",
  "#60a5fa",
  "#9ca3af",
  "#cbd5e1",
  "#e2e8f0",
  "#f59e0b",
  "#fbbf24"
];

const seriesCategories = [
  "Environmental",
  "Environmental",
  "Social",
  "Social",
  "Social",
  "Social",
  "Social",
  "Governance",
  "Governance"
];

const seriesKeys = Object.keys(dynamicScores);

const seriesValues = seriesKeys.map((key) => {
  if (["sustainability", "environmental"].includes(key)) {
    return [dynamicScores[key], 0, 0]; // Environmental
  } else if (
    ["wellness", "human-rights", "stakeholder", "inclusive", "consumer"].includes(key)
  ) {
    return [0, dynamicScores[key], 0]; // Social
  } else {
    return [0, 0, dynamicScores[key]]; // Governance
  }
});

// Build final series array
const chartData2 = {
  series: seriesNames.map((name, i) => ({
    name,
    data: seriesValues[i],
    color: seriesColors[i],
    category: seriesCategories[i],
  })),
};

// Chart options
const chartOptions = {
  chart: {
    type: 'bar',
    height: 330,
    toolbar: { show: false },
    background: 'transparent',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%',
      endingShape: 'rounded',
      borderRadius: 4,
      dataLabels: { position: 'top' },
    },
  },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ['transparent'] },
  xaxis: {
    categories: categories,
    labels: {
      style: {
        colors: '#6b7280',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    labels: {
      formatter: val => val + '%',
      style: {
        colors: '#6b7280',
        fontSize: '12px',
      },
    },
    min: 0,
    max: 100,
    tickAmount: 10,
  },
  fill: { opacity: 1 },
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex }) {
      const value = series[seriesIndex][dataPointIndex];
      if (value === 0) return '';

      const seriesName = chartData2.series[seriesIndex].name;
      const seriesCategory = chartData2.series[seriesIndex].category || 'General';

      return `
        <div style="padding: .4rem .8rem; background:rgba(0, 0, 0, 0.73); color: white; border-radius: .3rem; font-size: 12px; display: flex; flex-direction: column; align-items: center; gap: .4rem;">
          <strong>${seriesCategory}</strong>
          ${seriesName}: ${value}%
        </div>`;
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontSize: '16px',
    fontWeight: 400,
    markers: { width: 16, height: 16, radius: 5 },
    itemMargin: { horizontal: 8, vertical: 6 },
    onItemClick: { toggleDataSeries: true },
  },
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 0,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  },
  colors: chartData2.series.map(series => series.color),
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: { height: 300 },
        legend: { position: 'top', horizontalAlign: 'center' },
        plotOptions: { bar: { columnWidth: '80%' } },
      },
    },
    {
      breakpoint: 480,
      options: {
        chart: { height: 350 },
        legend: {
          fontSize: '12px',
          itemMargin: { horizontal: 10, vertical: 5 },
        },
        plotOptions: { bar: { columnWidth: '90%' } },
      },
    },
  ],
};

// Initialize chart
document.addEventListener('DOMContentLoaded', function () {
  const chart = new ApexCharts(document.querySelector("#chart"), {
    ...chartOptions,
    series: chartData2.series
  });

  chart.render();
  console.log('ESG Chart initialized successfully!');
});