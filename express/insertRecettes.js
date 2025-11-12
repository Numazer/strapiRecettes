import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


async function insertRecettes() {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });

  const recettes = [
    {
      titre: 'Crêpes maison',
      description: 'Mélangez farine, œufs, lait et sucre puis faites cuire.',
      difficulte: 2,
      tempsPrep: 15,
      budget: 3.5,
    },
    {
      titre: 'Pâtes carbonara',
      description: 'Pâtes, œufs, pancetta, parmesan et poivre.',
      difficulte: 3,
      tempsPrep: 25,
      budget: 5,
    },
  ];

  for (const r of recettes) {
    await db.run(
      `INSERT INTO recettes (titre, description, difficulte, tempsPrep, budget)
       VALUES (?, ?, ?, ?, ?)`,
      [r.titre, r.description, r.difficulte, r.tempsPrep, r.budget]
    );
  }

  console.log('✅ Recettes ajoutées avec succès !');

  await db.close();
}

insertRecettes();
