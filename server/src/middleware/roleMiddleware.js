export const staffMiddleware = async (req, res, next) => {
  if (!req.userInfo || !['staff', 'admin'].includes(req.userInfo.role))
    return res.status(400).json({ status: false, mess: 'Bạn không có quyền thực hiện tác vụ này!' });
  next();
};

export const adminMiddleware = async (req, res, next) => {
  if (!req.userInfo || req.userInfo.role !== 'admin')
    return res.status(400).json({ status: false, mess: 'Bạn không có quyền thực hiện tác vụ này!' });
  next();
};
