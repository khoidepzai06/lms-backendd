import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Lấy danh sách khóa học (Ai cũng xem được) - READ
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: { 
        instructor: { select: { fullName: true, email: true } } // Lấy kèm tên giảng viên
      }
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải danh sách khóa học', error });
  }
};

// 2. Tạo khóa học mới (Chỉ Admin mới được làm) - CREATE
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, instructorId } = req.body;
    const newCourse = await prisma.course.create({
      data: { 
        title, 
        description, 
        instructorId 
      }
    });
    res.status(201).json({ message: 'Tạo khóa học thành công!', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo khóa học', error });
  }
};