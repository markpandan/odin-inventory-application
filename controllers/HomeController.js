const db = require("../db/queries");

module.exports = {
  get: async (req, res) => {
    let animes;
    if (Object.keys(req.query) != 0) {
      animes = await db.searchAnime(req.query.s.trim(), req.query.id);
    } else {
      animes = await db.getAllAnimes();
    }

    const genres = await db.getGenres();

    res.render("index", {
      page: "home",
      animes,
      genres,
    });
  },
  // post: async (req, res) => {},
};
