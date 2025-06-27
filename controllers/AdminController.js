const db = require("../db/queries");

module.exports = {
  get: (req, res) => {
    if (!req.app.locals.isAuthenticated) {
      res.redirect("/");
      return;
    }

    res.render("index", { page: "admin" });
  },
  post: async (req, res) => {
    const anime = req.body;
    const genres = anime.genres.split(",");

    await db.insertAnime({
      name: anime["anime-name"],
      rating: anime.rating,
      description: anime.description,
      genres,
    });
    res.redirect("/");
  },
};
