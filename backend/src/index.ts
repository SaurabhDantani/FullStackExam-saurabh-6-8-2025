import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import dbUtils from './utils/db.utils';
import * as routes from "./routes";
import http from 'http'
const port = process.env.PORT || 8080
import dotenv from 'dotenv';
import mongoDBConnection from './config/db.mongo';
dotenv.config();

const app: Express = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register routes
routes.registerRoutes(app);

dbUtils.init()
  .then(() => {
    console.log("SQL Database Connected...........");
  })
  .catch((error) => {
    console.error("SQL Database connection failed:", error);
  });

// mongoDB connection
mongoDBConnection();
  // .then(() => {
  //   console.log("Mongo Database Connected...........");
  // })
  // .catch((error) => {
  //   console.error("Mongo Database connection failed:", error);
  // });

server.listen(port, async() => {
  // await connectSQLDatabase()
  console.log(`Server listening on port ${port}`);
});
