import { Router } from 'express';
import { createAssignment } from '../controllers/assignment.controller';

const router = Router();

router.post('/', createAssignment);

export default router;