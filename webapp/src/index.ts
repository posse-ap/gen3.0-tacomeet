import "./style.css";

var callback = function () {
  console.log("ready");
};

if (document.readyState === "complete" || document.readyState !== "loading") {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
