import { countListNotifyMd, getListNotifyMd, updateManyNotifyMd, updateNotifyMd } from '@models';
import { validateData } from '@utils';
import { listNotifyValid, readAllNotifyValid, updateNotifyValid } from '@lib/validation';

export const getListNotify = async (req, res) => {
  try {
    const { error, value } = validateData(listNotifyValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit = 10, status } = value;
    const where = { to: req.userInfo._id };
    if (status || status === 0) where.status = status;
    const documents = await getListNotifyMd(where, page, limit, [{ path: 'by', select: 'avatar fullName role' }]);
    const total = await countListNotifyMd(where);
    const isLastPage = page >= total / limit;
    res.json({ status: true, data: { documents, nextPage: !isLastPage ? page + 1 : undefined } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateStatusNotify = async (req, res) => {
  try {
    const { error, value } = validateData(updateNotifyValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, status } = value;
    const data = await updateNotifyMd({ _id, to: req.userInfo._id }, { status });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const readAllNotify = async (req, res) => {
  try {
    const { error, value } = validateData(readAllNotifyValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { status } = value;

    const data = await updateManyNotifyMd({ to: req.userInfo._id }, { status });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
