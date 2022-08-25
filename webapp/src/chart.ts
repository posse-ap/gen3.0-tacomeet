import axios from "axios";

const studyTimeEndpoint =
  "http://posse-task.anti-pattern.co.jp/1st-work/study_time.json";
const studyContentsEndpoint =
  "http://posse-task.anti-pattern.co.jp/1st-work/study_contents.json";
const studyLanguagesEndpoint =
  "http://posse-task.anti-pattern.co.jp/1st-work/study_language.json";

export const setupChart = () => {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawCharts);
};

export const drawCharts = async () => {
  drawStudyTimeChart();
  drawStudyContents();
  drawStudyLanguages();
};

const drawStudyTimeChart = async () => {
  const { data } = await axios.get(studyTimeEndpoint);
  let studyTimeArray: any[][] = data.map(({ day, time }) => [day, time]);
  studyTimeArray.unshift(["day", "number"]);
  const studyTimeChart = document.getElementById("js-study-time-chart");
  const options = {
    legend: "none" as "none",
  };
  drawChart(
    studyTimeChart,
    studyTimeArray,
    options,
    google.visualization.ColumnChart
  );
};

const drawStudyContents = async () => {
  const { data } = await axios.get(studyContentsEndpoint);

  let studyTimeArray = Object.entries(data[0]);
  studyTimeArray.unshift(["content", "number"]);
  const studyTimeChart = document.getElementById("js-study-contents-chart");
  const options = {
    pieHole: 0.4,
    legend: {
      position: "bottom",
      maxLines: 3,
    },
  };
  drawChart(
    studyTimeChart,
    studyTimeArray,
    options,
    google.visualization.PieChart
  );
};

const drawStudyLanguages = async () => {
  const { data } = await axios.get(studyLanguagesEndpoint);

  let studyTimeArray = Object.entries(data[0]);
  studyTimeArray.unshift(["language", "number"]);
  const studyTimeChart = document.getElementById("js-study-languages-chart");
  const options = {
    pieHole: 0.4,
    legend: {
      position: "bottom",
      maxLines: 3,
    },
  };
  drawChart(
    studyTimeChart,
    studyTimeArray,
    options,
    google.visualization.PieChart
  );
};

const drawChart = async (htmlElement, array, opts, chartObj) => {
  let dt = google.visualization.arrayToDataTable(array);
  let chart = new chartObj(htmlElement);
  chart.draw(dt, opts);
};
