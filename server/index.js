const express = require("express");
const cors = require("cors");

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

// Hantering för när sidan är i produktion
if (process.env.NODE_ENV === "production") {
  // Statisk mapp
  app.use(express.static(__dirname + "/public"));

  // Hantering Single page application
  app.get(/.*/, (res, req) => res.sendFile(__dirname + "/public/index.html"));
}

// Port för anslutning
const PORT = process.env.PORT || 5000;

// Starta server
app.listen(PORT, () => console.log(`Server starded on port ${PORT}`));
