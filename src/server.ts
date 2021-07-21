import 'reflect-metadata';
import './database';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  console.log('hello');
  return res.json('Hello world');
});

app.listen(port, () => {
  console.log(`Server listenning at: http://localhost:${port}`);
});
