// importer les données de prisma

const { PrismaClient } = require("@prisma/client");

// on initialise une connection avec la bdd
module.exports = new PrismaClient(); // exportation du client