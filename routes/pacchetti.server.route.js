const express = require("express");
const router = express.Router();

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

router.get("/", PacksController.list); // Index
router.post("/", PacksController.create); // Create
router.get("/:id", PacksController.show); // Show
router.get("/user/:id", PacksController.showByUserId); // Show
router.put("/:id", PacksController.update); // Update
router.delete("/:id", PacksController.destroy); // Destroy

module.exports = router;
