import express, {Express, Request, Response} from 'express';
import bodyParser from "body-parser";
import {createConnection} from "typeorm";
import cors from 'cors';
import {router} from "./routes";

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
const port: string | number = process.env.PORT || 4000;


app.use("/api", router);
createConnection().then(() => {
    console.log("Connected to database");
    app.listen(port, () => console.log(`Server listens at ${port}`))
});
