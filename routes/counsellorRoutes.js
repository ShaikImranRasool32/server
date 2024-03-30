const express = require('express');
const router = express.Router();
const counsellorController = require('../controllers/counsellorController');

router.post('/',counsellorController.createConsellor);
router.get('/',counsellorController.getCounsellors);
router.get('/:id',counsellorController.getCounsellorByID);
router.put('/:id', studentController.updateCounsellor); 
router.delete('/:id', studentController.deleteCounsellor);

module.exports = router;