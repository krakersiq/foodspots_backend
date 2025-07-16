const express = require("express");
const router = express.Router();
const Foodspot = require("./models/foodspots");


//get all foodspots - Alle Auslesen
router.get("/foodspots", async (req, res) => {
  const allFoodspots = await Foodspot.find();
  console.log(allFoodspots);
  res.send(allFoodspots);
});

//get one foodspot - Eins Auslesen
router.get("/foodspots/:id", async (req, res) => {
  const foodspot = await Foodspot.findOne({ _id: req.params.id });
  console.log("ONE Foodspot: ", foodspot);
  if (foodspot) {
    res.send(foodspot);
  } else {
    res.status(404).send({ message: "Foodspot not found" });
  }
});

// post one foodspot Eintragen
router.post("/foodspots", async (req, res) => {
  const newFoodspot = new Foodspot({
    name: req.body.name,
    stadt: req.body.stadt,
    kueche: req.body.kueche,
    bewertung_geschmack: req.body.bewertung_geschmack,
    bewertung_preis: req.body.bewertung_preis,
    bewertung_ambiente: req.body.bewertung_ambiente,
    kommentar: req.body.kommentar,
  });
  await newFoodspot.save();
  res.send(newFoodspot);
});

router.delete("/foodspots/:id", async (req, res) => {
  const foodspotId = req.params.id;
  console.log("Im Server: ", foodspotId);
  if (!foodspotId) {
    return res.status(400).send({ message: "Foodspot ID is required" });
  }
  try {
    const deletedFoodspot = await Foodspot.deleteOne({ _id: foodspotId });
    if (!deletedFoodspot) {
      return res.status(404).send({ message: "Foodspot not found" });
    }
    res.send({
      message: "Foodspot successfully deleted",
      foodspot: deletedFoodspot,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while deleting the foodspot" });
  }
});

// update one Foodspot
router.patch('/foodspots/:id', async(req, res) => {
    try {
        const foodspot = await Foodspot.findOne({ _id: req.params.id })

        foodspot.name = req.body.name
        foodspot.stadt = req.body.stadt
        foodspot.kueche = req.body.kueche
        foodspot.bewertung_geschmack = req.body.bewertung_geschmack
        foodspot.bewertung_preis = req.body.bewertung_preis
        foodspot.bewertung_ambiente = req.body.bewertung_ambiente
        foodspot.kommentar = req.body.kommentar
      
        await Foodspot.updateOne({ _id: req.params.id }, foodspot);
        res.send(Foodspot)
    } catch {
        res.status(404)
        res.send({ error: "Foodspot does not exist!" })
    }
});

module.exports = router;
