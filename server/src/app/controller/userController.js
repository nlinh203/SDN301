import { addUserValid, changePasswordValid, detailUserValid, listUserValid, updateUserInfoValid, updateUserValid } from '@lib/validation';
import { countListUserMd, deleteUserMd, getDetailUserMd, getListUserMd, updateUserMd } from '@models';
import { createUserRp } from '@repository';
import { validateData } from '@utils';
import { uploadFileToFirebase } from '@lib/firebase';
import bcrypt from 'bcrypt';

export const getListUser = async (req, res) => {
  
};

export const getListUserInfo = async (req, res) => {
  try {
    const data = await getListUserMd({ status: 1 });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const detailUser = async (req, res) => {
  try {
    const { error, value } = validateData(detailUserValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await getDetailUserMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { error, value } = validateData(detailUserValid, req.query);
    if (error) return res.status(400).json({ status: false, mess: error });
    const { _id } = value;
    const data = await deleteUserMd({ _id });
    if (!data) return res.status(400).json({ status: false, mess: 'Người dùng không tồn tại!' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const addUser = async (req, res) => {
  try {
    const { error, value } = validateData(addUserValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });

    if (req.file) {
      value.avatar = await uploadFileToFirebase(req.file);
    }

    const { data, mess } = await createUserRp(value);
    if (data && !mess) res.json({ status: true, data });
    else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const updateUser = async (req, res) => {
 
};

export const updateUserInfo = async (req, res) => {
  
};

export const changePassword = async (req, res) => {
  try {
    const { error, value } = validateData(changePasswordValid, req.body);
    if (error) return res.status(400).json({ status: false, mess: error });

    const passLogin = await bcrypt.compare(value.password, req.userInfo.password);
    if (!passLogin) return res.status(400).json({ status: false, mess: 'Mật khẩu không hợp lệ!' });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(value.newPassword, salt);

    const data = await updateUserMd({ _id: req.userInfo._id }, { password, token: '' });
    res.status(201).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
