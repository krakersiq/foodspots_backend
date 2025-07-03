const express = require("express");
const router = express.Router();
const Foodspot = require("./models/foodspots");
/* const Member = require('./models/members'); */

//get all foodspots Auslesen
router.get("/foodspots", async (req, res) => {
  const allFoodspots = await Foodspot.find();
  console.log(allFoodspots);
  res.send(allFoodspots);
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

// eine GET-Anfrage
router.get("/fiw", async (req, res) => {
  res.send({ message: "Hello FIW!" });
});

/* // get all members
router.get('/members', async(req, res) => {
    const allMembers = await Member.find();
    console.log(allMembers);
    res.send(allMembers);
}); */

/* router.delete('/foodspots', async(req, res) => {
    const foodspotId = req.query.id;
    console.log(foodspotId);
    if (!foodspotId) {
        return res.status(400).send({ message: "Foodspot ID is required" });
    }
    
    try {
        const deletedFoodspot = await Foodspot.findByIdAndDelete(foodspotId);
        if (!deletedFoodspot) {
            return res.status(404).send({ message: "Foodspot not found" });
        }
        res.send({ message: "Foodspot deleted successfully", foodspot: deletedFoodspot });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred while deleting the foodspot" });
    }
} */

module.exports = router;
