import express from 'express';      
import router from './controllers/recipeController.js'
import authRouter from './controllers/authController.js'
import { tchekToken } from './middlewares/tchekToken.js';
import setup from './createTable.js';


const app = express();
const db = await setup();

app.use(express.json());

router.use(authRouter);

app.use('/api', router);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});