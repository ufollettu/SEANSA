const express = require('express');
const router = express.Router();
const can = require('../middleware').can;

const PcController = require('./../controllers/pc.server.contoller');

// // RESTful API
// 
// router.get('/',          Controller.list);       // Index
// router.get('/new',       Controller.add);        // New
// router.post('/',         Controller.create);     // Create
// router.get('/:id',       Controller.show);       // Show
// router.get('/:id/edit',  Controller.edit);       // Edit
// router.put('/:id',       Controller.update);     // Update
// router.delete('/:id',    Controller.destroy);    // Destroy


router.get('/', PcController.list); // Index
// router.get('/new', PcController.add); // New
router.post('/', can(7), PcController.create); // Create
router.get('/:id', PcController.show); // Show
// router.get('/:id/edit', PcController.edit); // Edit
router.put('/:id', can(7), PcController.update); // Update
router.delete('/:id', can(7), PcController.destroy); // Destroy

// router.put('/:id', PcController.updateStatus); // U SP_STATUS by SP_ID
// router.get('/hwid/:id', PcController.getByHwId); // R by SP_HW_ID
// router.put('/hwId/:id', PcController.updateHwId); // U by SP_HW_ID

module.exports = router;