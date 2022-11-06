import {join} from "path";
import express from "express";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"))
app.get("/", (req, res) => res.render("home"));

const handleListening = () => console.log(`✅ Server running: http://localhost:${PORT}`);

app.listen(PORT, handleListening);