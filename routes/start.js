// defini un router et toutes les routes

const express = require("express");
const UsersController = require("../controllers/UsersController");
const AuthentificationController = require("../controllers/AuthentificationController"); // on exporte que le controller donc pas d'{}
const { authenticateToken } = require("../middlewares/Auth"); // destructuration : on exporte un objet de fonction (plein de fonction) c'est pq les {}

const router = express.Router();

router.get("/users", UsersController.index); // affiche /users
router.post("/users", UsersController.store); // créer dans /users
router.get("/users/:id", UsersController.show);
router.put("/users/:id", UsersController.update);
router.delete("/users/:id", UsersController.delete);

router.post("/login", AuthentificationController.login);
router.get(
  "/getMyProfile",
  authenticateToken,
  AuthentificationController.getMyProfile
);

module.exports = router; // ce fichier n'est pas appelé donc on export
