const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecastTitle = document.getElementById("forecast-title");
const forecastMsg = document.getElementById("forecast-message");
const loader = document.getElementsByClassName("loader")[0];
const forecastIcon = document.getElementById("forecast-icon");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  forecastTitle.innerText = "";
  forecastMsg.innerText = "Getting results...";
  loader.classList.remove("hidden");
  forecastIcon.classList.add("hidden");
  fetch(
    `http://localhost:3000/weather?address=${encodeURIComponent(search.value)}`
  ).then((response) => {
    response.json().then((data) => {
      loader.classList.add("hidden");
      forecastIcon.classList.remove("hidden");
      if (data.error) {
        forecastTitle.innerText = data.error;
        forecastMsg.innerText = "";
      } else {
        forecastTitle.innerText = data.location;
        forecastMsg.innerText = data.forecast;
        forecastIcon.src = data.icon;
      }
    });
  });
});
