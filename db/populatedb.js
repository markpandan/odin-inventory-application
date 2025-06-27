const { Client } = require("pg");
const { readFile } = require("fs/promises");
require("dotenv").config();

async function main() {
  const client = new Client({
    connectionString: `postgresql://${process.env.ROLE_NAME}:${process.env.ROLE_PASSWORD}@localhost:5432/anime_checklist`,
  });

  try {
    const sql = await readFile("./db/init.sql", { encoding: "utf-8" });
    console.log("Seeding...");

    await client.connect();
    await client.query(sql);
    console.log("Success!");
  } catch (err) {
    console.error("An error has occured: ", err);
  } finally {
    await client.end();
  }
}

main();
