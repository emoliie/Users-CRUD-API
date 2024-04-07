// ce fichier permet de lancer le serveur
// recupere un json en particulier un array

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json()); // converti en json(?)

app.use("/", require("./routes/start")); // on defini quel router utiliser

const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

initializeApp();
