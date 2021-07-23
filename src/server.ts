import 'reflect-metadata';
import './database';

import express from 'express';
import cors from 'cors';

import { router } from './routes';

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server listenning at: http://localhost:${port}`);
});
