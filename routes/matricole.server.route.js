const express = require('express');
const router = express.Router();

const MatricoleController = require('./../controllers/matricole.server.controller');

router.get('/', MatricoleController.list); // Index
// router.get('/new', MatricoleController.add); // New
router.post('/', MatricoleController.create); // Create
router.get('/:sksId', MatricoleController.show); // Show
// router.get('/:id/edit', MatricoleController.edit); // Edit
router.put('/:id', MatricoleController.update); // Update
router.delete('/:id', MatricoleController.destroy); // Destroy

module.exports = router;