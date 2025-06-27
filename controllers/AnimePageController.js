const db = require("../db/queries");

module.exports = {
  get: async (req, res) => {
    const anime = await db.getAnimeById(req.params.id);

    res.render("index", { page: "anime", anime: anime });
  },
};
