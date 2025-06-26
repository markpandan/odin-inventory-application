const { Client } = require("pg");
const { readFile } = require("fs/promises");
require("dotenv").config();

async function main() {
  const sql = await readFile("./db/init.sql", { encoding: "utf-8" });

  console.log("Seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.ROLE_NAME}:${process.env.ROLE_PASSWORD}@localhost:5432/anime_checklist`,
  });
  await client.connect();
  await client.query(sql);
  await client.end();
}

main()
  .then(() => console.log("Done"))
  .catch((e) => console.error("An error has occured: ", e));
