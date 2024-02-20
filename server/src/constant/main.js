export const VALIDATE_TYPE = {
  EMAIL: 'email',
  STRING: 'string',
  NUMBER: 'number',
  PHONE: 'phone',
  JSON: 'json',
  BOOLEAN: 'boolean',
  DATE: 'date',
  DATETIME: 'datetime'
};

export const NOTI_CONTENT = {
  1: 'đã bày tỏ cảm xúc về bài viết của bạn',
  2: 'đã thêm một bình luận vào bài viết của bạn',
  3: 'đã nhắc đến bạn trong bình luận của họ',
  4: 'bạn đã đăng ký khóa học',
  5: 'đã đặt câu hỏi trong bài học',
  6: 'bạn đã hoàn thành bài học'
};

export const REDIS_KEY = {
  EMAIL_QUEUE: 'emailQueue',
  NOTIFY_QUEUE: 'notifyQueue'
};
