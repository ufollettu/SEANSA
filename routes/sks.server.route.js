const express = require('express');
const router = express.Router();

const SksController = require('./../controllers/sks.server.controller');

// // RESTful API
//
// router.get('/',          Controller.list);       // Index
// router.get('/new',       Controller.add);        // New
// router.post('/',         Controller.create);     // Create
// router.get('/:id',       Controller.show);       // Show
// router.get('/:id/edit',  Controller.edit);       // Edit
// router.put('/:id',       Controller.update);     // Update
// router.delete('/:id',    Controller.destroy);    // Destroy

router.get('/', SksController.list); // Index
// router.get('/new', SksController.add); // New
router.post('/', SksController.create); // Create
router.post('/email', SksController.email); // Email sks

router.get('/:id', SksController.show); // Show
// router.get('/:id/edit', SksController.edit); // Edit
router.put('/:id', SksController.update); // Update
router.delete('/:id', SksController.destroy); // Destroy

module.exports = router;
