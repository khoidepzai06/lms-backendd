import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import enrollmentRoutes from './routes/enrollment.routes';
import assignmentRoutes from './routes/assignment.routes';  
import submissionRoutes from './routes/submission.routes';
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Gắn bộ API xác thực vào đường dẫn /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.get('/', (req, res) => {
  res.send('API Backend đã chạy thành công 100%!');
});

app.listen(port, () => {
  console.log(`Server LMS đang chạy tại: http://localhost:${port}`);
});