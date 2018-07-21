const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware').verifyToken;

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
router.get('/new', RinnoviController.add); // New
router.post('/', verifyToken, RinnoviController.create); // Create
router.get('/:id', RinnoviController.show); // Show
router.get('/:id/edit', RinnoviController.edit); // Edit
router.put('/:id', RinnoviController.update); // Update
router.delete('/:id', RinnoviController.destroy); // Destroy

module.exports = router;
