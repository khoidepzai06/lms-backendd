import { Router } from 'express';
import { submitAssignment, gradeSubmission } from '../controllers/submission.controller';
import { checkRole } from '../middlewares/auth.middleware';

const router = Router();

// Đường link Nộp bài: Chỉ cấp quyền cho STUDENT
router.post('/', checkRole(['STUDENT']), submitAssignment);

// Đường link Chấm điểm: Chỉ cấp quyền cho INSTRUCTOR hoặc ADMIN
router.put('/:id/grade', checkRole(['INSTRUCTOR', 'ADMIN']), gradeSubmission);

export default router;