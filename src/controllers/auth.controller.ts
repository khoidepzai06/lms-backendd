import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, role } = req.body;

    // 1. Kiểm tra xem email đã tồn tại trong database chưa
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email này đã được đăng ký!' });
    }

    // 2. Mã hóa mật khẩu (bảo mật theo chuẩn đồ án)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Tạo tài khoản mới lưu vào Database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        role: role || 'STUDENT', // Mặc định là Student nếu không truyền role
      },
    });

    res.status(201).json({ message: 'Đăng ký tài khoản thành công!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống khi đăng ký', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Kiểm tra xem email có tồn tại trong database không
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'Tài khoản không tồn tại!' });
    }

    // 2. So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Sai mật khẩu, vui lòng thử lại!' });
    }

    // 3. Tạo Token (thẻ thông hành) để chứng minh người dùng đã đăng nhập
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'BiMatCuaKhoi_LMS2026', // Khóa bảo mật
      { expiresIn: '1d' } // Thẻ này có hạn 1 ngày
    );

    res.status(200).json({
      message: 'Đăng nhập thành công!',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống khi đăng nhập', error });
  }
};