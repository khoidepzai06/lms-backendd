import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware kiểm tra quyền truy cập
export const checkRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Lấy ID của người đang thao tác từ Header của request
      const userId = req.headers['user-id']; 

      if (!userId) {
        return res.status(401).json({ message: 'Lỗi 401: Vui lòng cung cấp user-id để xác thực!' });
      }

      // Tìm người dùng trong Database
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
      });

      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
      }

      // Kiểm tra xem Role của người dùng có nằm trong danh sách cho phép không
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ 
          message: `Lỗi 403 Forbidden: Chức vụ ${user.role} không có quyền thực hiện hành động này!` 
        });
      }

      // Nếu Role hợp lệ -> Mở cổng cho đi tiếp vào hàm xử lý
      next();
    } catch (error) {
      res.status(500).json({ message: 'Lỗi hệ thống xác thực', error });
    }
  };
};