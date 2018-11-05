const express = require('express');
const router = express.Router();
const can = require('../middleware').can;

const MatricoleController = require('./../controllers/matricole.server.controller');

router.get('/', MatricoleController.list); // Index
// router.get('/new', MatricoleController.add); // New
router.post('/', can(8), MatricoleController.create); // Create
router.get('/:sksId', MatricoleController.show); // Show
// router.get('/:id/edit', MatricoleController.edit); // Edit
router.put('/:id', can(8), MatricoleController.update); // Update
router.delete('/:id', can(8), MatricoleController.destroy); // Destroy

module.exports = router;