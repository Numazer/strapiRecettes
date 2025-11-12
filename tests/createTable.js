import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function setup() {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS utilisateurs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      motdepasse TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS recettes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titre TEXT NOT NULL,
      description TEXT,
      difficulte INTEGER,
      tempsPrep INTEGER,
      budget REAL
    )
  `);

  await db.close();
}

setup().catch(err => console.error(err));

export default setup;
