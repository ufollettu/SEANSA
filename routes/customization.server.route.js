const express = require('express');
const router = express.Router();
const can = require('../middleware').can;
const upload = require('../config/multer');

const CustomizationController = require('./../controllers/customization.server.controller');


router.get('/', CustomizationController.list); // Index
// router.get('/new', ClientiController.add); // New
router.post('/', CustomizationController.create); // Create Logo
router.get('/:id', CustomizationController.show); // Show
// router.get('/:id/edit', ClientiController.edit); // Edit
router.put('/:id', CustomizationController.update); // Update
// router.delete('/:id', CustomizationController.destroy); // Destroy

router.post('/logo', upload.single('logo'), CustomizationController.createLogo); // Create Logo

module.exports = router;