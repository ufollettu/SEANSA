const express = require('express');
const router = express.Router();

const MatricoleController = require('./../controllers/matricole.server.controller');

// // RESTful API
// 
// router.get('/',          Controller.list);       // Index
// router.get('/new',       Controller.add);        // New
// router.post('/',         Controller.create);     // Create
// router.get('/:id',       Controller.show);       // Show
// router.get('/:id/edit',  Controller.edit);       // Edit
// router.put('/:id',       Controller.update);     // Update
// router.delete('/:id',    Controller.destroy);    // Destroy

router.get('/', MatricoleController.list); // Index
router.get('/new', MatricoleController.add); // New
router.post('/', MatricoleController.create); // Create
router.get('/:id', MatricoleController.show); // Show
router.get('/:id/edit', MatricoleController.edit); // Edit
router.put('/:id', MatricoleController.update); // Update
router.delete('/:id', MatricoleController.destroy); // Destroy

module.exports = router;