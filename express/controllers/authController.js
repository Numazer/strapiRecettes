import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import express from 'express';
import { Router } from 'express';


const router = express.Router();

router.post('/local/register', async (req, res) => {
    const { nom, email, motdepasse } = req.body;
    const db = await open({
        filename: 'database.db',
        driver: sqlite3.Database,
      });

    const motdepasseHash = await hash(motdepasse, 10);
    try {
    await db.run(
        `INSERT INTO utilisateurs (nom, email, motdepasse)
         VALUES (?, ?, ?)`,
        [nom, email, motdepasseHash]
    );
    } catch (error) {
        return  res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
    }

    res.json({ message: 'Utilisateur enregistré avec succès' });
});

router.post('/local/login', async (req, res) => {
    const { email, motdepasse } = req.body;

    const db = await open({
        filename: 'database.db',
        driver: sqlite3.Database,
      });

    const utilisateur = await db.get(
        `SELECT * FROM utilisateurs WHERE email = ?`,
        [email]
    );

    if (!utilisateur) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const motdepasseValide = await compare(motdepasse, utilisateur.motdepasse);
    if (!motdepasseValide) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
        { id: utilisateur.id, nom: utilisateur.nom, email: utilisateur.email },
        'votre_secret_jwt',
        { expiresIn: '1h' }
    );

    res.json({ jwt: token });
});
 export default router;