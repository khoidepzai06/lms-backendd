import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Hàm nộp bài tập (Dành cho Sinh viên)
export const submitAssignment = async (req: Request, res: Response) => {
  try {
    const { assignmentId, userId, fileUrl } = req.body;
    
    const newSubmission = await prisma.submission.create({
      data: {
        assignmentId: Number(assignmentId),
        userId: Number(userId),
        fileUrl
      }
    });

    res.status(201).json({ message: 'Nộp bài thành công!', newSubmission });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi nộp bài', error });
  }
};

// Hàm chấm điểm bài tập (Dành cho Giảng viên)
export const gradeSubmission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Lấy ID của bài nộp từ đường link
    const { grade } = req.body; // Lấy điểm số từ Body

    const updatedSubmission = await prisma.submission.update({
      where: { id: Number(id) },
      data: { grade: Number(grade) }
    });

    res.status(200).json({ message: 'Chấm điểm thành công!', updatedSubmission });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi chấm điểm', error });
  }
};