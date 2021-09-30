const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", { title: "Wenas prros", name: "Pepe" });
});

app.get("/help", (req, res) => {
  res.render("help", { message: "Everything is ok :D" });
});

app.get("/about", (req, res) => {
  res.render("about");
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
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
