import express from 'express'
import router from './router/todo-router.js';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(express.json());

app.use(cors(
  {
    origin: process.env.FRONTEND_URL
  }
));

app.get('/', (req, res) => {
  res.send('server works')
})

app.use('/todos', router);


app.listen(port, () => {
  console.log(`app is listening on port: ${port}`)
})