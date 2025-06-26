const pool = require("./pool");

async function getAllAnimes() {
  const { rows } = await pool.query("SELECT * FROM animes");
  return rows;
}

async function searchAnime(anime) {
  const { rows } = await pool.query("SELECT * FROM animes WHERE name LIKE $1", [
    `%${anime}%`,
  ]);
  return rows;
}

async function getGenres(animeId) {
  let query;
  if (!id) {
    query = await pool.query("SELECT * FROM genres");
  } else {
    query = await pool.query("SELECT * FROM genres WHERE anime_id = $1", [
      animeId,
    ]);
  }

  return query.rows;
}

module.exports = {
  getAllAnimes,
  searchAnime,
  getGenres,
};
