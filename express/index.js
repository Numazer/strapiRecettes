import express from 'express';      
import router from './controllers/controller.js'
import authRouter from './controllers/auth.js'
import { tchekToken } from './middlewares/tchekToken.js';

router.use(authRouter);


const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});