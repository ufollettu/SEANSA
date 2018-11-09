const express = require("express");
const router = express.Router();

const can = require("../middleware").can;

const UtentiPermessiController = require("./../controllers/utenti-permessi.server.controller");

router.get("/", can(1), UtentiPermessiController.list); // Index
router.post("/", can(1), UtentiPermessiController.create); // Create
router.get("/:id", can(3), UtentiPermessiController.show); // Show
router.put("/:id", can(3), UtentiPermessiController.update); // Update
// router.delete('/:id', can(1), UtentiPermessiController.destroy); // Destroy

module.exports = router;
