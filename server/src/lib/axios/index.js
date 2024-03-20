import axios from 'axios';

const clientApi = axios.create({
  baseURL: 'https://service.s-tech.info/'
});

export const sendMailStech = async ({
  token = 'DuzSbfmMZSaz84giEiVT2AsqzlSTYXwJ54tZRS6KC6FQzw3xHk7DkonUuDk9S+Zr2CnSpkCcxJp/8JkKY3mm3rYPmUlyyS0ITS+Xp5UxH16c8BmEDdiINxVCKHubSMpyM+NNkgyKl04x0S2TW/FqpyvxPjA7xzM1Ve05reCiUggyf7Tt32cfbepveT9sqUuBQp+LWjzMKvyHQO2cQ+4PHkJmhcJ1VkEe0bNJ59mpNekpiLSQLdQBMGqK+FuAj6TDN9BL+Gz0LUvRFeUudXQVz4UNduC4Avl70sTDteR3j3qdE3B1f3NjHSW/H8U9eTbs9VP7AXWsUDDe5kzk5f7XoA==',
  to,
  bodyHtml,
  subject,
  attachments
}) => {
  try {
    await clientApi.post('/sendMail', {
      token,
      to,
      bodyHtml,
      subject,
      attachments
    });
    return { status: true, data: { to, status: 1, subject, content: bodyHtml } };
  } catch (error) {
    console.log(error, 14);
  }
};
