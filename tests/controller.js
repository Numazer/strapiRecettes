import express from 'express';

const router = express.Router();

router.get('/recettes', (req, res) => {
  res.json({ message: 'Liste des recettes' });
});

router.post('/recettes', (req, res) => {
  res.json({ message: 'Recette créée' });
});

router.get('/recettes/:documentId', (req, res) => {
  res.json({ message: `Recette avec ID ${req.params.documentId}` });
});

router.put('/recettes/:documentId', (req, res) => {
  res.json({ message: `Recette avec ID ${req.params.documentId} mise à jour` });
});

router.delete('/recettes/:documentId', (req, res) => {
  res.json({ message: `Recette avec ID ${req.params.documentId} supprimée` });
});

export default router;