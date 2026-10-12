import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const enrollCourse = async (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.body;
    
    const newEnrollment = await prisma.enrollment.create({
      data: {
        userId: Number(studentId), // Đổi vế bên trái thành userId
        courseId: Number(courseId)
      }
    });

    res.status(201).json({ message: 'Ghi danh khóa học thành công!', newEnrollment });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi ghi danh khóa học', error });
  }
};