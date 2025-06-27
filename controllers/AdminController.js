const db = require("../db/queries");

module.exports = {
  newGet: (req, res) => {
    if (!req.app.locals.isAuthenticated) {
      res.redirect("/");
      return;
    }

    res.render("index", { page: "admin", anime: "" });
  },
  newPost: async (req, res) => {
    const anime = req.body;
    const genres = anime.genres.trim().split(",");

    await db.insertAnime({
      name: anime["anime-name"],
      rating: anime.rating,
      description: anime.description,
      genres,
    });
    res.redirect("/");
  },

  updateGet: async (req, res) => {
    if (!req.app.locals.isAuthenticated) {
      res.redirect("/");
      return;
    }

    const anime = await db.getAnimeById(req.params.id);
    res.render("index", { page: "admin", anime: anime });
  },

  updatePost: async (req, res) => {
    await db.updateAnime({
      id: req.params.id,
      name: req.body["anime-name"].trim(),
      rating: req.body.rating.trim(),
      description: req.body.description.trim(),
      imageURL: req.body.imageURL || "",
      genres: req.body.genres.trim().split(","),
    });
    res.redirect("/");
  },
};
