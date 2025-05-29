// =========================================================
// Pie chart
const chartLabels = ['Environmental', 'Social', 'Governance'];
const chartData = [45, 35, 20];
const chartColors = [
  'rgb(94, 191, 72)',
  'rgb(43, 152, 225)',
  'rgba(255, 206, 86, 1)'
];
const chartBorderColor = '#fff';
const chartLabel = 'ESG Weightage';

// =======================
// Chart Configuration
// =======================
const ctx = document.getElementById('myChart').getContext('2d');

new Chart(ctx, {
  type: 'pie',
  data: {
    labels: chartLabels,
    datasets: [{
      label: chartLabel,
      data: chartData,
      backgroundColor: chartColors,
      borderColor: chartBorderColor,
      borderWidth: 2,
      hoverOffset: 10
    }]
  },
  options: {
    responsive: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          let percentage = (value / sum * 100).toFixed(1) + '%';
          return percentage;
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 13
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true
    }
  },
  plugins: [ChartDataLabels]
});

// ==================================================
// Line chart (ApexCharts)
const seriesData = [
  {
    name: 'Environmental',
    data: [65, 68, 70, 72, 75, 77, 74, 76, 75, 76, 77, 77]
  },
  {
    name: 'Social',
    data: [70, 72, 75, 77, 79, 81, 80, 81, 82, 81, 81, 81]
  },
  {
    name: 'Governance',
    data: [62, 63, 67, 69, 71, 72, 73, 74, 73, 74, 74, 74]
  }
];

// Months for X-Axis
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Theme & Style Config
const chartColors2 = ['#5EBF48', '#2B98E1', '#FFD54F'];
const yAxisMin = 50;
const yAxisMax = 100;
const yAxisTicks = 5;
const strokeCurve = 'smooth';
const strokeWidth = 3;
const markerSize = 5;
const markerHoverSize = 7;
const legendFontSize = '14px';
const legendFontWeight = 600;
const legendLabelColor = '#374151';
const gridBorderColor = '#e5e7eb';
const gridStrokeDashArray = 4;
const chartTextColor = '#374151';

// =======================
// Chart Configuration
// =======================

const options = {
  chart: {
    type: 'line',
    height: 250,
    toolbar: { show: false },
    zoom: { enabled: false },
    foreColor: chartTextColor
  },
  theme: {
    mode: 'light'
  },
  colors: chartColors2,
  series: seriesData,
  xaxis: {
    categories: months,
    labels: {
      style: {
        fontSize: '13px'
      }
    }
  },
  yaxis: {
    min: yAxisMin,
    max: yAxisMax,
    tickAmount: yAxisTicks,
    labels: {
      formatter: val => `${val}%`
    }
  },
  stroke: {
    curve: strokeCurve,
    width: strokeWidth
  },
  markers: {
    size: markerSize,
    strokeWidth: 2,
    hover: { size: markerHoverSize }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    fontSize: legendFontSize,
    fontWeight: legendFontWeight,
    labels: {
      colors: legendLabelColor
    }
  },
  tooltip: {
    y: {
      formatter: val => `${val}%`
    }
  },
  grid: {
    borderColor: gridBorderColor,
    strokeDashArray: gridStrokeDashArray
  }
};

const chart = new ApexCharts(document.querySelector("#line-chart"), options);
chart.render();


// =====================================================
// GeoChart for Plants
const plantData = [
  { lat: 28.6139, lng: 77.2090, plant: 'Plant 1', city: 'Delhi', score: 85 },
  // { lat: 28.6145, lng: 77.2085, plant: 'Plant 2', city: 'Delhi', score: 82 },

  { lat: 19.0760, lng: 72.8777, plant: 'Plant 1', city: 'Mumbai', score: 78 },

  { lat: 20.2961, lng: 85.8245, plant: 'Plant 1', city: 'Bhubaneswar, Odisha', score: 88 },
  // { lat: 20.4625, lng: 85.8828, plant: 'Plant 2', city: 'Cuttack, Odisha', score: 80 },
  // { lat: 22.2604, lng: 84.8536, plant: 'Plant 3', city: 'Rourkela, Odisha', score: 84 },

  { lat: 22.5726, lng: 88.3639, plant: 'Plant 1', city: 'Kolkata', score: 81 },

  { lat: 23.2599, lng: 77.4126, plant: 'Plant 1', city: 'Bhopal, MP', score: 79 }
];

// GeoChart Options
const geoChartOptions = {
  region: 'IN',
  displayMode: 'markers',
  resolution: 'provinces',
  colorAxis: { colors: ['#007bff'] },
  tooltip: { isHtml: true },
  markerOpacity: 0.9,
  backgroundColor: '#f4f4f4',
  datalessRegionColor: '#e0e0e0',
};

// =======================
// Chart Initialization
// =======================

google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" // Replace with your actual API key
});

google.charts.setOnLoadCallback(drawMarkersMap);

function drawMarkersMap() {
  const rows = plantData.map(plant => [
    plant.lat,
    plant.lng,
    createTooltip(plant.plant, plant.city, plant.score)
  ]);

  const data = google.visualization.arrayToDataTable([
    ['Latitude', 'Longitude', { type: 'string', role: 'tooltip', p: { html: true } }],
    ...rows
  ]);

  const chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
  chart.draw(data, geoChartOptions);
}

function createTooltip(plant, city, score) {
  return `
    <div style="padding:10px;">
      <strong>${plant}</strong><br>
      City: ${city}<br>
      ESG Score: <b>${score}</b>
    </div>`;
}