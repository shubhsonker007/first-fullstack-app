import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { serve } from "inngest/express";
import { functions, inngest } from "./lib/inngest.js";

dotenv.config();
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
console.log("The CLIENT_URL is " + CLIENT_URL);

const __dirname = path.resolve();

app.use(express.json());
app.use(cors({origin:CLIENT_URL, credentials:true}));
app.use("api/inngest", serve({client: inngest, functions }));

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;


app.get("/cool", (req, res) => {
    res.status(200).json({
        message: "Success from API",
    })
})

app.get("/hot", (req, res) => {

    res.status(200).json({
        message: "This is Hot AF!",
    })
})

if(NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log("SERVER is running on port " + PORT);
});