const express = require("express");
const prisma = require("../config/prisma");
const { authMiddleware } = require("../middlewares/Auth.js");
const { randomCard } = require("../utils/card");

const router = express.Router();

router.use(authMiddleware);

router.post("/cards/draw", async (req, res) => {
  //console.log(req.user);
  /**
   * 1. Vérification qu'il est authentifié (JWT Middleware), ligne 12
   * 2. Vérification qu'il puisse piocher
   * 3. Vérification qu'il a assez de pioche pour pouvoir piocher
   */

  const user = req.user;
  const canDraw = user.canDraw; // ou req.user["canDraw"] (object[key])
  let remainingDraw = user.remainingDraw;

  if (!canDraw || remainingDraw == 0) {
    return res.status(403).json({ message: `Can't draw` });
  }

  const card = await randomCard(); // on obtient un tableau avec des objets
  remainingDraw = remainingDraw - 5;
  let lastDraw = new Date().toJSON(); // update la date à la date et horaire actuelle en format json 

  //console.log(lastDraw);
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { remainingDraw, canDraw: false, lastDraw}, // == { remainingDraw: remainingDraw }
  });

  //console.log(card);

  const data = [];

  for (let i = 0; i < card.length; i++) {
    data.push({
      userid: user.id,
      slug: card[i].slug,
      name: card[i].name,
      image: card[i].image
    });
  }

  const createMany = await prisma.ownedCard.createMany({
    data
  });

  return res.send({ card }); // j'envoie une reponse ici les 5 cartes
});

module.exports = router;
