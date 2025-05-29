const esgScores = {
  overall: 61,
  environmental: 45,
  social: 60,
  governance: 78
};

//Gauge options
const gaugeOptionsLarge = {
  width: 160,
  height: 170,
  greenFrom: 0,
  greenTo: 50,
  yellowFrom: 50,
  yellowTo: 75,
  redFrom: 75,
  redTo: 100,
  minorTicks: 10,
  majorTicks: ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
  animation: { duration: 1000, easing: 'out' }
};

const gaugeOptionsSmall = {
  width: 100,
  height: 100,
  greenFrom: 0,
  greenTo: 50,
  yellowFrom: 50,
  yellowTo: 75,
  redFrom: 75,
  redTo: 100,
  minorTicks: 10,
  majorTicks: ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
  animation: { duration: 1000, easing: 'out' }
};

//Load and draw charts
google.charts.load('current', { packages: ['gauge'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
  // Prepare dynamic data
  const overallData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['ESG', esgScores.overall]
  ]);

  const environmentalData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['E', esgScores.environmental]
  ]);

  const socialData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['S', esgScores.social]
  ]);

  const governanceData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['G', esgScores.governance]
  ]);

  // Draw initial charts
  const overallChart = new google.visualization.Gauge(document.getElementById('overall_gauge'));
  const envChart = new google.visualization.Gauge(document.getElementById('gauge_env'));
  const socChart = new google.visualization.Gauge(document.getElementById('gauge_soc'));
  const govChart = new google.visualization.Gauge(document.getElementById('gauge_gov'));

  overallChart.draw(overallData, gaugeOptionsLarge);
  envChart.draw(environmentalData, gaugeOptionsSmall);
  socChart.draw(socialData, gaugeOptionsSmall);
  govChart.draw(governanceData, gaugeOptionsSmall);

  //Optional: Simulate live updates (can be replaced with real-time API updates)
  setInterval(() => {
    const newOverall = Math.floor(60 + Math.random() * 15);
    overallData.setValue(0, 1, newOverall);
    overallChart.draw(overallData, gaugeOptionsLarge);
  }, 15000);

  setInterval(() => {
    const newEnv = Math.floor(40 + Math.random() * 30);
    const newSoc = Math.floor(50 + Math.random() * 40);
    const newGov = Math.floor(60 + Math.random() * 30);

    environmentalData.setValue(0, 1, newEnv);
    socialData.setValue(0, 1, newSoc);
    governanceData.setValue(0, 1, newGov);

    envChart.draw(environmentalData, gaugeOptionsSmall);
    socChart.draw(socialData, gaugeOptionsSmall);
    govChart.draw(governanceData, gaugeOptionsSmall);
  }, 12000);
}