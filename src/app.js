const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", { title: "Home", name: "Pepe" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Everything is ok :D",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About the page" });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          address: req.query.address,
          location: location,
          forecast: forecastData,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", { message: "Help article not found" });
});

app.get("*", (req, res) => {
  res.render("404", { message: "This doesn't exist" });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
