import axios from "axios";
import { cLightBlue } from "./color";
const studyTimeEndpoint =
  "http://posse-task.anti-pattern.co.jp/1st-work/study_time.json";
const studyContentsEndpoint =
  "http://posse-task.anti-pattern.co.jp/1st-work/study_contents.json";
const studyLanguagesEndpoint =
  "http://posse-task.anti-pattern.co.jp/1st-work/study_language.json";

const studyLanguages = [
  { name: "HTML", color: "#3DCEFE" },
  { name: "CSS", color: "#0D71BC" },
  { name: "JavaScript", color: "#0445EC" },
  { name: "PHP", color: "#20BDDE" },
  { name: "Laravel", color: "#B29FF2" },
  { name: "SQL", color: "#6C47EB" },
  { name: "SHELL", color: "#4A17EF" },
  { name: "その他", color: "#3104C0" },
];
const pieChartColors = [
  "#0445EC",
  "#0D71BC",
  "#20BDDE",
  "#3DCEFE",
  "#B29FF2",
  "#6C47EB",
  "#4A17EF",
  "#3104C0",
];

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
    vAxis: {
      // メモリに単位表示
      format: "#h",
      // メモリの色変更
      textStyle: {
        color: cLightBlue,
      },
      // メモリをカスタム指定
      ticks: [0, 2, 4, 6, 8],
      // メモリの横の線
      gridlines: {
        color: "transparent",
      },
      // 一番下の線
      baselineColor: "transparent",
    },
    hAxis: {
      textStyle: {
        color: cLightBlue,
      },
      ticks: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
      gridlines: {
        color: "transparent",
      },
    },
    bar: {
      // 棒の太さ
      groupWidth: "40%",
    },
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

  let studyTimeArray = Object.entries(data[0])
    .map(([key, value]) => [key, value])
    .sort((a, b) => (a[1] as number) - (b[1] as number))
    .reverse();
  studyTimeArray.unshift(["content", "number"]);
  const studyTimeChart = document.getElementById("js-study-contents-chart");
  const options = {
    pieHole: 0.2,
    legend: {
      position: "bottom",
      maxLines: 3,
    },
    colors: pieChartColors,
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

  let studyTimeArray = Object.entries(data[0])
    .map(([key, value]) => [key, value])
    .sort((a, b) => (a[1] as number) - (b[1] as number))
    .reverse();
  studyTimeArray.unshift(["language", "number"]);
  console.log(studyTimeArray);
  const studyTimeChart = document.getElementById("js-study-languages-chart");
  const options = {
    pieHole: 0.2,
    legend: {
      position: "bottom",
      maxLines: 3,
      textStyle: {
        // fontSize: 8,
      },
    },
    colors: pieChartColors,
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
