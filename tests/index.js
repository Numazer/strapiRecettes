import express from 'express';      
import router from './controller.js'

const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});