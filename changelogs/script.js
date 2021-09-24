var appName = "Monsy";
var storeUrl =
  "https://play.google.com/store/apps/details?id=dev.timistudio.monsy";
var date = "2021-08-04";

function onIndexLoad() {
  document.title = appName;
  document.getElementById("storeUrl").href = storeUrl;
}

function onPolicyLoad() {
  document.title = appName + " " + "Privacy Policy";
  getData();
}

function onTermLoad() {
  document.getElementById("appName2").innerHTML = appName;
  document.title = appName + " " + "Terms and Conditions";
  getData();
}

function getData() {
  document.getElementById("appName").innerHTML = appName;
  document.getElementById("date").innerHTML = date;
}
