import { addTemplateValid, detailTemplateValid, listTemplateValid, updateTemplateValid } from '@lib/validation';
import { countListTemplateMd, deleteTemplateMd, getDetailTemplateMd, getListTemplateMd, updateTemplateMd } from '@models';
import { validateData } from '@utils';
import { uploadFileToFirebase } from '@lib/firebase';
import { addTemplateMd } from '@models/TemplateMd';

export const getListTemplate = async (req, res) => {
  try {
    const { error, value } = validateData(listTemplateValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ subject: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await getListTemplateMd(where, page, limit);
    const total = await countListTemplateMd(where);
    res.json({ status: true, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailTemplate = async (req, res) => {
  try {
    const { error, value } = validateData(detailTemplateValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await getDetailTemplateMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Template không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const { error, value } = validateData(detailTemplateValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteTemplateMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Template không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addTemplate = async (req, res) => {
  try {
    const { error, value } = validateData(addTemplateValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    let { subject, code, content, description, status } = value;

    const checkSubject = await getDetailTemplateMd({ subject });
    if (checkSubject) return res.status(400).json({ status: false, mess: 'Tiêu đề đã tồn tại!' });

    const checkCode = await getDetailTemplateMd({ code });
    if (checkCode) return res.status(400).json({ status: false, mess: 'Mã template đã tồn tại!' });

    let files = [];
    if (req.files) {
      for (let file of req.files) {
        files.push(await uploadFileToFirebase(file));
      }
    }

    const data = await addTemplateMd({ by: req.userInfo._id, subject, code, content, description, status, files });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const { error, value } = validateData(updateTemplateValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id, subject, code, content, description, status, files } = value;

    const template = await getDetailTemplateMd({ _id });
    if (!template) return res.status(400).json({ status: false, mess: 'Template không tồn tại!' });

    if (subject) {
      const checkSubject = await getDetailTemplateMd({ subject });
      if (checkSubject) return res.status(400).json({ status: false, mess: 'Tiêu đề đã tồn tại!' });
    }

    if (code) {
      const checkCode = await getDetailTemplateMd({ code });
      if (checkCode) return res.status(400).json({ status: false, mess: 'Mã template đã tồn tại!' });
    }

    if (req.files) {
      for (let file of req.files) {
        files.push(await uploadFileToFirebase(file));
      }
    }

    const data = await updateTemplateMd({ _id }, { updateBy: req.userInfo._id, subject, code, content, description, status, files });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
