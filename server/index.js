const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Databasanslutning
mongoose.connect(
  "mongodb+srv://disabledbarrel:<password>@vue-express-ebdrj.mongodb.net/test?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true
  }
);

// Skapa instans av express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
const posts = require("./routes/api/posts");

app.use("/api/posts", posts);

// Port för anslutning
const PORT = process.env.PORT || 5000;

// Starta server
app.listen(PORT, () => console.log(`Server starded on port ${PORT}`));
