const express = require("express");
const router = express.Router();
const adminCheck = require("../middleware").adminCheck;
const can = require("../middleware").can;

const PacksHistoryController = require("./../controllers/pacchetti-history.server.controller");

// // RESTful API
//
// router.get('/',          Controller.list);       // Index
// router.get('/new',       Controller.add);        // New
// router.post('/',         Controller.create);     // Create
// router.get('/:id',       Controller.show);       // Show
// router.get('/:id/edit',  Controller.edit);       // Edit
// router.put('/:id',       Controller.update);     // Update
// router.delete('/:id',    Controller.destroy);    // Destroy

router.get("/", can(9), adminCheck(), PacksHistoryController.list); // Index
router.post("/", can(9), PacksHistoryController.create); // Create
router.get("/:id", can(9), adminCheck(), PacksHistoryController.show); // Show
router.put("/:id", can(9), PacksHistoryController.update); // Update
router.delete("/:id", can(9), PacksHistoryController.destroy); // Destroy

module.exports = router;
