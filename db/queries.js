const pool = require("./pool");

async function getAllAnimes() {
  const { rows } = await pool.query(
    `SELECT animes.id, animes.name, animes.rating, animes.description, animes.imageURL, ARRAY_AGG(genres.name) AS genres FROM animes 
    INNER JOIN animes_to_genres AS atg ON atg.anime_id = animes.id 
    INNER JOIN genres ON genres.id = atg.genre_id 
    GROUP BY animes.id, animes.name`
  );
  return rows;
}

async function getAnimeById(id) {
  const { rows } = await pool.query(
    `SELECT animes.id, animes.name, animes.rating, animes.description, animes.imageURL, ARRAY_AGG(genres.name) AS genres FROM animes 
    INNER JOIN animes_to_genres AS atg ON atg.anime_id = animes.id 
    INNER JOIN genres ON genres.id = atg.genre_id 
    WHERE animes.id = $1 GROUP BY animes.id, animes.name`,
    [id]
  );
  return rows[0];
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

async function insertAnime({ name, rating, description, genres }) {
  const queryId = await pool.query(
    "INSERT INTO animes(name, rating, description) VALUES ($1, $2, $3) RETURNING id",
    [name, rating, description]
  );

  const genreIds = await pool.query(
    "SELECT id FROM genres WHERE name = ANY($1)",
    [[genres]]
  );

  let valuesToInsert = [];
  genreIds.rows.forEach((value) => {
    valuesToInsert.push(`( ${queryId.rows[0].id}, ${value.id} )`);
  });
  valuesToInsert = valuesToInsert.join(",");

  await pool.query(`INSERT INTO animes_to_genres VALUES ${valuesToInsert}`);
}

async function updateAnime({
  id,
  name,
  rating,
  description,
  imageURL,
  genres,
}) {
  await pool.query(
    `UPDATE animes SET name = $2, rating = $3, description = $4, imageURL = $5
    WHERE id = $1`,
    [id, name, rating, description, imageURL]
  );

  const genreIds = await pool.query(
    "SELECT id FROM genres WHERE name = ANY($1)",
    [[genres]]
  );

  let valuesToInsert = [];
  genreIds.rows.forEach((value) => {
    valuesToInsert.push(`( ${id}, ${value.id} )`);
  });
  valuesToInsert = valuesToInsert.join(",");

  await pool.query(`DELETE FROM animes_to_genres WHERE anime_id = $1`, [id]);
  await pool.query(
    `INSERT INTO animes_to_genres VALUES ${valuesToInsert} ON CONFLICT DO NOTHING`
  );
}

async function deleteAnime(id) {
  await pool.query("DELETE FROM animes WHERE id = $1", [id]);
}

module.exports = {
  getAllAnimes,
  getAnimeById,
  getGenres,
  searchAnime,
  insertAnime,
  updateAnime,
  deleteAnime,
};
