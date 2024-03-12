import { countListQuestionMd, getListLessonMd, getListQuestionMd } from '@models';

 const getListQuestionRepo = async (value) => {
  const { page, limit, keySearch, status, courseId, lessonId } = value;
  const where = {};
  let lessonIds = [];
  if (courseId) {
    const lessons = await getListLessonMd({ status: 1, courseId });
    if (lessons?.length > 0) lessons.forEach((l) => lessonIds.push(l._id));
  }
  if (lessonId) {
    if (lessonIds.length > 0) lessonIds.filter((l) => l === lessonId);
    else lessonIds.push(lessonId);
  }
  if (courseId || lessonId) where.lessonId = { $in: lessonIds };
  if (keySearch) where.content = { $regex: keySearch, $options: 'i' };
  if (status || status === 0) where.status = status;
  const documents = await getListQuestionMd(where, page, limit);
  const total = await countListQuestionMd(where);
  return { status: true, data: { documents, total } };
};
export default getListQuestionRepo;