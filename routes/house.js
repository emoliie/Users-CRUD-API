const express = require("express");
const HousesController = require("../controllers/HousesController");

const router = express.Router();

router.get("/houses", HousesController.index);
router.post("/houses", HousesController.createHouse);
router.patch("/houses", HousesController.updateHouse);

// router.get("/", (req, res) => {
//     res.json({ message: global.lastHouseVisited });
//   });

module.exports = router