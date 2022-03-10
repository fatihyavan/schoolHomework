const router = require("express").Router();
const authController=require('../controllers/auth_Controller');

router.get('/studentLogin',authController.student_login);
router.get('/teacherLogin',authController.teacher_login);

router.post('/student',authController.student_post);
router.post('/teacher',authController.teacher_post);
router.post('/homework',authController.addingHomework);

module.exports=router;