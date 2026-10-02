import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { functions, inngest } from "./lib/inngest";

dotenv.config();
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
console.log("The CLIENT_URL is " + CLIENT_URL);

app.use(express.json());
app.use(cors({origin:CLIENT_URL, credentials:true}));
app.use("api/inngest", serve({client: inngest, functions }));

const PORT = process.env.PORT;


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Success from API",
    })
})

app.listen(PORT, () => {
    console.log("SERVER is running on port " + PORT);
});