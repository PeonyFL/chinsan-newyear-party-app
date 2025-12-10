const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');
const multer = require('multer');
const fs = require('fs');

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) { fs.mkdirSync(uploadDir); }
const upload = multer({ dest: uploadDir + '/' });

router.post('/upload-employees', upload.single('employeeFile'), controller.uploadEmployees);
router.post('/add-employee', controller.addEmployee); // Logic includes Login
router.get('/find/:employeeId', controller.findEmployee);
router.get('/employees', controller.getAllEmployees);
router.get('/employees/status-summary', controller.getStatusSummary);
router.get('/employee-status/:employeeId', controller.getEmployeeStatus);
router.post('/checkin', controller.checkin);
router.post('/sportday-register', controller.sportdayRegister);
router.delete('/employees/all', controller.deleteAllEmployees);
router.delete('/employees/:id', controller.deleteEmployee);

module.exports = router;
