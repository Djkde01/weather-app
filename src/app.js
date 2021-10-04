const express = require("express");
const path = require("path");
const hbs = require("hbs");

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
  res.send({
    location: {
      latitude: 54,
      longitude: -15,
    },
    forecast: "Rainy",
  });
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
