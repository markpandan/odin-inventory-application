const db = require("../db/queries");

module.exports = {
  get: async (req, res) => {
    const animes = await db.getAllAnimes();

    res.render("index", {
      page: "home",
      animes: animes,
    });
  },
  post: async (req, res) => {},
};
