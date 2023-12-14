import express from 'express';
import errorHandlers from './middlewares/errorHandlers';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

const { default: router } = require('./routes');
require("dotenv").config();

const app = express();
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(router);
app.use(errorHandlers);

mongoose
  // .connect('mongodb://127.0.0.1:27017/node-blog')
  .connect(process.env.DATABASE_URI)
  .then(() => {
    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.clear;
      console.log("Application run at " + port + " port");
    });
  })
  .catch((err) => console.log(err));