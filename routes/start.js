// defini un router et toutes les routes

const express = require("express");
const UsersController = require("../controllers/UsersController");
const AuthenticationController = require("../controllers/AuthenticationController"); // on exporte que le controller donc pas d'{}
const { authMiddleware } = require("../middlewares/Auth"); // destructuration : on exporte un objet de fonction (plein de fonction) c'est pq les {}
const router = express.Router();

router.get("/users", UsersController.index); // affiche /users
router.post("/users", UsersController.store); // créer dans /users
router.get("/users/:id", UsersController.show);
router.put("/users/:id", UsersController.update);
router.delete("/users/:id", UsersController.delete);

router.post("/login", AuthenticationController.login);
router.get(
  "/getMyProfile",
  authMiddleware,
  AuthenticationController.getMyProfile
);

module.exports = router; // ce fichier n'est pas appelé donc on export
