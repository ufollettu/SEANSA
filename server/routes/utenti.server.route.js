const express = require('express');
const router = express.Router();

const UtentiController = require('./../controllers/utenti.server.controller');

// // RESTful API
// 
// router.get('/',          Controller.list);       // Index
// router.get('/new',       Controller.add);        // New
// router.post('/',         Controller.create);     // Create
// router.get('/:id',       Controller.show);       // Show
// router.get('/:id/edit',  Controller.edit);       // Edit
// router.put('/:id',       Controller.update);     // Update
// router.delete('/:id',    Controller.destroy);    // Destroy

router.get('/', UtentiController.list); // Index
router.get('/new', UtentiController.add); // New
router.post('/', UtentiController.create); // Create
router.get('/:id', UtentiController.show); // Show
router.get('/:id/edit', UtentiController.edit); // Edit
router.put('/:id', UtentiController.update); // Update
router.delete('/:id', UtentiController.destroy); // Destroy

module.exports = router;