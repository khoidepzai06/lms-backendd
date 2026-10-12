import { Router } from 'express';
import { getCourses, createCourse } from '../controllers/course.controller';
import { checkRole } from '../middlewares/auth.middleware'; // Đã đổi sang bảo vệ mới

const router = Router();

// Xem danh sách thì thả cửa
router.get('/', getCourses);

// Tạo khóa học thì phải qua chốt kiểm tra Admin
router.post('/', checkRole(['ADMIN']), createCourse); // Ốp checkRole vào đây

export default router;