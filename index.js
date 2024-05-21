// ce fichier permet de lancer le serveur
// recupere un json en particulier un array

const express = require("express");
const cors = require("cors");
const ip = require("ip");
const ipAddress = ip.address();
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json()); // converti en json(?)


app.use("/", require("./routes/start")); // on defini quel router utiliser

app.use("/", require("./routes/house"));

app.use("/", require("./routes/draw"));

// global.lastHouseVisited = null; // défini une variable globale disponible partout

const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`port: ${ipAddress}:${port}`);
  });
};

initializeApp();
