const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");
const foodspots = require("./models/foodspots");
require("dotenv").config();

const app = express();
const PORT = 3000;

const Foodspot = require("./models/foodspots");
app.use(express.json());
// enable cors for all requests
app.use(cors());
app.use("/api", routes);

mongoose.connect(process.env.DB_CONNECTION);

//Testen der Anwendung; zwei Foodspots werden erstellt, wenn die Datenbank leer ist
async function init() {
  const count = await Foodspot.countDocuments();
  if (count === 0) {
    await Foodspot.insertMany([
      {
        name: "Miyabi",
        stadt: "Berlin",
        kueche: "japanisch",
        bewertung_geschmack: 10,
        bewertung_preis: 9,
        bewertung_ambiente: 10,
        kommentar:
          'sehr lecker, große Auswahl an Sushi, "Pay One - Get Two"  🍣🥢',
      },
      {
        name: "Barbados",
        stadt: "Kolberg",
        kueche: "polnisch",
        bewertung_geschmack: 10,
        bewertung_preis: 9,
        bewertung_ambiente: 8,
        kommentar: "hausgemachte Speisen sowie täglich wechselnde Gerichte 🍽️",
      },
      {
        name: "Coreana",
        stadt: "Berlin",
        kueche: "koreanisch",
        bewertung_geschmack: 8,
        bewertung_preis: 7,
        bewertung_ambiente: 7,
        kommentar:
          "Super lecker, Tische mit integriertem Grill, auf denen man das Essen selber grillen kann. Gerichte wurden traditionell serviert. 🫕",
      },
    ]);
  }
}

init().catch(console.error);
console.log("Database initialized with test data (if empty)");

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("connected to DB");
});

//nach dem Start des Servers wird die Datenbankverbindung geschlossen
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started and listening on port ${PORT} ... `);
  }
});
