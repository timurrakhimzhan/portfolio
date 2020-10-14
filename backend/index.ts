import express, {Express} from 'express';
import bodyParser from "body-parser";
import {createConnection} from "typeorm";
import cors from 'cors';
import {router} from "./routes";
import helmet from "helmet";
import session from 'express-session';
import {SECRET_WORD} from "./utils/constants";
import cookieParser from 'cookie-parser';

const allowCors = new Set(["http://localhost:3000"]);

const app: Express = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors({
    exposedHeaders: "CSRF-TOKEN",
    credentials: true,
    origin: (origin:string | undefined, callback: Function) => {
        if(origin && allowCors.has(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    }
}));
app.use(session({
    secret: SECRET_WORD,
    cookie: {
        httpOnly: true,
    },
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser(SECRET_WORD));


const port: string | number = process.env.PORT || 4000;


app.use("/api", router);

createConnection().then(() => {
    // const server = https.createServer(app);
    // server.listen(port, () => console.log(`Server listens at ${port}`));
    app.listen(port, () => console.log(`Server listens at ${port}`));
});
