const express = require("express");
const router = express.Router();
const can = require("../middleware").can;

const PacksController = require("./../controllers/pacchetti.server.controller");

// // RESTful API
//
// router.get('/',          Controller.list);       // Index
// router.get('/new',       Controller.add);        // New
// router.post('/',         Controller.create);     // Create
// router.get('/:id',       Controller.show);       // Show
// router.get('/:id/edit',  Controller.edit);       // Edit
// router.put('/:id',       Controller.update);     // Update
// router.delete('/:id',    Controller.destroy);    // Destroy

router.get("/", can(9), PacksController.list); // Index
router.post("/", can(9), PacksController.create); // Create
router.get("/:id", PacksController.show); // Show
router.get("/user/:id", can(9), PacksController.showByUserId); // Show
router.put("/:id", can(9), PacksController.update); // Update
router.delete("/:id", can(9), PacksController.destroy); // Destroy

module.exports = router;
