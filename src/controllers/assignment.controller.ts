import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const createAssignment = async (req: Request, res: Response) => {
  try {
    const { title, dueDate, courseId } = req.body;
    
    const newAssignment = await prisma.assignment.create({
      data: {
        title,
        dueDate: new Date(dueDate), 
        courseId: Number(courseId)
      }
    });

    res.status(201).json({ message: 'Tạo bài tập thành công!', newAssignment });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo bài tập', error });
  }
};