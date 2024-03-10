import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getDetailUserMd } from '@models';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.header('Bearer');
  if (!token) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userInfo = await getDetailUserMd({ _id: checkToken._id }, [
      {
        path: 'saves',
        select: '_id title slug time image by hashtag createdAt description likes',
        populate: { path: 'by', select: 'avatar fullName' }
      },
      {
        path: 'posts',
        select: '_id title slug time image by hashtag createdAt description likes',
        populate: { path: 'by', select: 'avatar fullName' }
      },
      {
        path: 'courses',
        select: '_id course lessons createdAt status qr',
        populate: { path: 'course', select: 'name image slug' }
      }
    ]);

    if (!userInfo) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
    if (userInfo.token !== token) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
    if (userInfo.status === 0)
      return res
        .status(401)
        .json({ status: false, mess: 'Tài khoản của bạn chưa được kích hoạt hoặc đã bị khóa, vui lòng liên hệ quản trị viên!' });
    req.userInfo = userInfo;
    next();
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
