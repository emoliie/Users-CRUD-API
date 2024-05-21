//const fetch = require("node-fetch");

async function getCard() { // recupere toutes les cartes de l'api
  // Stocke la réponse de la requête
  const response = await fetch("https://hp-api.lainocs.fr/characters/");

  // Convertis le JSON (réponse) sous un format compréhensible par javascript
  const data = await response.json();

  // Retourne les données inscrits dans le JSON (de la ligne 8)
  return data;
}

async function randomCard() { // recupere 5 cartes au hasard parmi la liste
  let cardsToReveal = 5; 
  let revealedCards = [];

  while (cardsToReveal > 0) { // tant qu'on a + de 0 carte à dévoiler
    const data = await getCard();
    const random = Math.floor(Math.random() * data.length); // chiffre aleatoire dans le tableau
    //return data[random];

    revealedCards.push(data[random]); // on ajoute la carte dans le tableau

    cardsToReveal -= 1; // on enleve une carte
  }

  return revealedCards;
}

module.exports = { getCard, randomCard };
