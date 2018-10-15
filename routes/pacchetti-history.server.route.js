const express = require('express');
const router = express.Router();

const PacksHistoryController = require('./../controllers/pacchetti-history.server.controller');

// // RESTful API
//
// router.get('/',          Controller.list);       // Index
// router.get('/new',       Controller.add);        // New
// router.post('/',         Controller.create);     // Create
// router.get('/:id',       Controller.show);       // Show
// router.get('/:id/edit',  Controller.edit);       // Edit
// router.put('/:id',       Controller.update);     // Update
// router.delete('/:id',    Controller.destroy);    // Destroy

router.get('/', PacksHistoryController.list); // Index
router.post('/', PacksHistoryController.create); // Create
router.get('/:id', PacksHistoryController.show); // Show
router.put('/:id', PacksHistoryController.update); // Update
router.delete('/:id', PacksHistoryController.destroy); // Destroy

module.exports = router;
