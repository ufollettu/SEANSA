const express = require('express');
const router = express.Router();
const can = require('../middleware').can;

const RinnoviController = require('./../controllers/rinnovi.server.controller');

// // RESTful API
//
// router.get('/',          Controller.list);       // Index
// router.get('/new',       Controller.add);        // New
// router.post('/',         Controller.create);     // Create
// router.get('/:id',       Controller.show);       // Show
// router.get('/:id/edit',  Controller.edit);       // Edit
// router.put('/:id',       Controller.update);     // Update
// router.delete('/:id',    Controller.destroy);    // Destroy

router.get('/', RinnoviController.list); // Index
// router.get('/new', RinnoviController.add); // New
router.post('/', can(5), RinnoviController.create); // Create
router.get('/:id', RinnoviController.show); // Show
// router.get('/:id/edit', RinnoviController.edit); // Edit
router.put('/:id', can(4), RinnoviController.update); // Update
router.delete('/:id', can(5), RinnoviController.destroy); // Destroy

module.exports = router;
