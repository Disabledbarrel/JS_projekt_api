const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Posts
// Refererar till uppsatt route
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray()); // Hämtar alla poster från databasen
});

// Get enskild post

// Add Posts
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send(); // Allt gick ok och post skapades
});

// Update Posts
router.put("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.updateOne(
    { _id: new mongodb.ObjectID(req.params.id) },
    {
      $set: {
        text: req.body.text
      }
    }
  );
  res.status(201).send(); // Allt gick ok och post uppdaterades
});

// Delete Posts
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) }); // skrivsätt som krävs när man använder mongodb
  res.status(200).send(); // Allt gick ok
});

// Databasanslutning till MongoDB Atlas och collection
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://disabledbarrel:<password>@vue-express-ebdrj.mongodb.net/test?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true
    }
  );

  return client.db("vue-express").collection("posts");
}

module.exports = router;
