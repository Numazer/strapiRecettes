import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function setup() {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS recettes_ingredients (
      recette_id INTEGER,
      ingredient_id INTEGER,
      quantite TEXT,
      PRIMARY KEY (recette_id, ingredient_id),
      FOREIGN KEY (recette_id) REFERENCES recettes(id),
      FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
    )
  `);

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

const ingredients = [
  "Farine",
  "Sucre",
  "Beurre",
  "Œufs",
  "Lait",
  "Sel",
  "Poivre",
  "Huile d'olive",
  "Levure chimique",
  "Chocolat noir",
  "Vanille",
  "Crème fraîche",
  "Fromage râpé",
  "Mozzarella",
  "Parmesan",
  "Pâtes",
  "Riz",
  "Pommes de terre",
  "Carottes",
  "Oignons",
  "Ail",
  "Tomates",
  "Poivrons",
  "Courgettes",
  "Champignons",
  "Persil",
  "Basilic",
  "Thym",
  "Citron",
  "Amandes"
];

 for (const ing of ingredients) {
  await db.run("INSERT OR IGNORE INTO ingredients (name) VALUES (?)", [ing]);
}

  await db.close();
}

setup().catch(err => console.error(err));

export default setup;
