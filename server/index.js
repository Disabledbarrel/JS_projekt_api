const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Skapa instans av express, initierar appen
const app = express();

// Middleware för dependencies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
const posts = require("./routes/api/posts");

// Dirigerar till posts
app.use("/api/posts", posts);

// Port för anslutning
const PORT = process.env.PORT || 5000;

// Starta server
app.listen(PORT, () => console.log(`Server starded on port ${PORT}`));
