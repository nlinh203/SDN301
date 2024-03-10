import { listLogValid } from '@lib/validation';
import { countListLogMd, getListLogMd } from '@models';
import { validateData } from '@utils';

export const getListLog = async (req, res) => {
  try {
    const { error, value } = validateData(listLogValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, to, fromDate, toDate, type, status } = value;
    const where = {};
    if (keySearch) where.title = { $regex: keySearch, $options: 'i' };
    if (to) where.to = { $regex: to, $options: 'i' };
    if (fromDate) where.createdAt = { $gte: fromDate };
    if (toDate) {
      if (!where.createdAt) where.createdAt.$lte = toDate;
    }
    if (status || status === 0) where.status = status;
    if (type) where.type = type;
    const documents = await getListLogMd(where, page, limit);
    const total = await countListLogMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
