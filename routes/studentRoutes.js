const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const studentController = require('../controllers/studentController');

// Protected routes
router.post('/', verifyToken, studentController.createStudent);
router.get('/', verifyToken, studentController.getStudents);
router.get('/:id', verifyToken, studentController.getStudentById);
router.put('/:id', verifyToken, studentController.updateStudent);
router.delete('/:id', verifyToken, studentController.deleteStudent);

module.exports = router;
