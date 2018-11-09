const express = require('express');
const router = express.Router();
const can = require('../middleware').can;

const ClientiController = require('./../controllers/clienti.server.controller');

// // RESTful API
// 
// router.get('/',          Controller.list);       // Index
// router.get('/new',       Controller.add);        // New
// router.post('/',         Controller.create);     // Create
// router.get('/:id',       Controller.show);       // Show
// router.get('/:id/edit',  Controller.edit);       // Edit
// router.put('/:id',       Controller.update);     // Update
// router.delete('/:id',    Controller.destroy);    // Destroy

router.get('/', ClientiController.list); // Index
// router.get('/new', ClientiController.add); // New
router.post('/', can(6), ClientiController.create); // Create
router.get('/:id', ClientiController.show); // Show
// router.get('/:id/edit', ClientiController.edit); // Edit
router.put('/:id', can(6), ClientiController.update); // Update
router.delete('/:id', can(6), ClientiController.destroy); // Destroy

module.exports = router;