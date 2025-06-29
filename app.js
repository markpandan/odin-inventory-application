const express = require("express");
const app = express();
const path = require("node:path");

const db = require(path.join(__dirname, "db/queries"));

app.locals.isAuthenticated = false;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const homeRoute = require("./routes/HomeRoute");
app.use("/", homeRoute);

const loginRoute = require("./routes/LoginRoute");
app.use("/login", loginRoute);

const adminRoute = require("./routes/AdminRoute");
app.use("/admin", adminRoute);

const animePageRoute = require("./routes/AnimePageRoute");
app.use("/anime", animePageRoute);

app.get("/logout", (req, res) => {
  req.app.locals.isAuthenticated = false;
  res.redirect("/");
});

app.get("/delete", async (req, res) => {
  await db.deleteAnime(req.query.id);
  res.redirect("/");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
  console.log(`Link is http://localhost:${PORT}/`);
});
