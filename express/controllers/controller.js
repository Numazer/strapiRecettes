import express from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import recette from '../../src/api/recette/controllers/recette.js';

const router = express.Router();

router.get('/recettes', async (req, res) => {
  try {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
      });

    const recettes = await db.all('SELECT * FROM recettes');
    res.json(recettes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des recettes' });
  }
  res.json({ message: 'Liste des recettes' });
});

router.post('/recettes', async (req, res) => {
   try {
    const { titre, description, difficulte, tempsPrep, budget } = req.body.data;

    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
      });

    await db.run(
      `INSERT INTO recettes (titre, description, difficulte, tempsPrep, budget)
       VALUES (?, ?, ?, ?, ?)`,
      [titre, description, difficulte, tempsPrep, budget]
    );
    
    res.status(201).json({ message: 'Recette créée avec succès' });
  }
    catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la recette' });
  }
});
  

router.get('/recettes/:documentId', async (req, res) => {
  try {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
      });

    const recette = await db.get(
      `SELECT * FROM recettes WHERE id = ?`,
      [req.params.documentId]
    );

    if (!recette) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }

    res.json(recette);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la recette' });
  }

  res.json({ message: `Recette avec ID ${recette}` });
});

router.put('/recettes/:documentId', async (req, res) => {
  try {
    const { titre, description, difficulte, tempsPrep, budget } = req.body.data;

    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
      });

    const result = await db.run(
      `UPDATE recettes
       SET titre = ?, description = ?, difficulte = ?, tempsPrep = ?, budget = ?
       WHERE id = ?`,
      [titre, description, difficulte, tempsPrep, budget, req.params.documentId]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }

    res.json({ message: 'Recette mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la recette' });
  }
  res.json({ message: `Recette avec ID ${req.params.documentId} mise à jour` });
});

router.delete('/recettes/:documentId', async (req, res) => {
  try {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database,
      });

    const result = await db.run(
      `DELETE FROM recettes WHERE id = ?`,
      [req.params.documentId]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }

    res.json({ message: 'Recette supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la recette' });
  }
});


export default router;