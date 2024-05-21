const prisma = require("../config/prisma");

class HousesController {
  
  async index(req, res) {
    try {
      const houses = await prisma.house.findUnique({
        where: {
          id: 1,
        },
      });
      return res.status(200).json(houses);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async createHouse(req, res) {
    // Method: POST
    // Crée une maison (si elle n'existe pas dans la base de donnée), sinon renvoie 403 (car déjà crée)
    const body = req.body;

    try {
      const existHouse = await prisma.house.findMany();

      if (!existHouse || existHouse.length == 0) {
        const house = await prisma.house.create({
          data: {
            house: body.house,
          },
        });

        return res.status(201).json(house);
      } else {
        return res.status(403);
      }
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async updateHouse(req, res) {
    // Method: PUT ou PATCH
    const body = req.body;
    console.log(body);
    const houses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
    
    try {
      if (!body || !body.house) {
        // Vérification de l'inexistence d'un body et d'une maison dans le body
        return res.status(400);
      }
      if (!houses.includes(body.house)) {
        // Vérification de si l'élément body.house est inclu dans le tableau houses
        return res.status(400).json({ message: "House not found" });
      }

      const updatedHouse = await prisma.house.update({
        // Met à jour dans la base de données (via Prisma)
        where: { id: 1 },
        data: { house: body.house } // data = colonnes à modifier par ce qu'il y a apres : (ici on modifie house)
      });
      return res.status(201).json(updatedHouse);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }

    // global.lastHouseVisited = body.house; // garder en mémoire la maison
    // console.log(global.lastHouseVisited);
  }
}

module.exports = new HousesController();
