import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { serve } from "inngest/express";
import { functions, inngest } from "./lib/inngest.js";
import {clerkMiddleware, ClerkMiddleware} from "@clerk/express";

dotenv.config();
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
console.log("The CLIENT_URL is " + CLIENT_URL);

app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({origin:CLIENT_URL, credentials:true}));
app.use("/api/inngest", serve({client: inngest, functions }));

const PORT = process.env.PORT;


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

export default app;