import { Router } from 'express';
import { enrollCourse } from '../controllers/enrollment.controller';
import { checkRole } from '../middlewares/auth.middleware';

const router = Router();

// Ghi danh thì phải là Sinh viên
// Chỉ cho phép STUDENT được ghi danh khóa học
router.post('/', checkRole(['STUDENT']), enrollCourse);

export default router;