import { getDetailTemplateMd } from '@models';
import { sendMail } from './config';

export const replaceFistText = (inputString = '', prefix = '\\$') => {
  const regex = new RegExp(`${prefix}\\w+\\s?`, 'g');
  return inputString.replace(regex, '');
};
export const convertParams = (params, html) => {
  for (const key of Object.keys(params)) {
    html = html.replaceAll(key, params[key]);
    html = html.replaceAll(key.toLocaleUpperCase(), params[key]);
  }
  return replaceFistText(html);
};

export const sendMailUse = async ({ code, params, to }) => {
  const template = await getDetailTemplateMd({ code, status: 1 });
  if (template) {
    const subject = convertParams(params, template.subject);
    const html = convertParams(params, template.content);
    return await sendMail({ to, subject, html });
  }
};

export const sendMailSignup = ({ to, username, otp }) => {
  return sendMailUse({ to, code: 'SIGNUP_OTP', params: { $username: username, $otp: otp } });
};

export const sendMailForgotPassword = ({ to, username, otp }) => {
  return sendMailUse({ to, code: 'FORGOT_PASSWORD_OTP', params: { $username: username, $otp: otp } });
};
