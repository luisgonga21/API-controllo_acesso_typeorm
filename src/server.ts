import express from "express";
import { router } from "./routes";
import "reflect-metadata"
import "./database/index";


const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log("Running on port 8889")
});


