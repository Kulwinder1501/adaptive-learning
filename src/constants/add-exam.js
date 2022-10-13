import * as yup from 'yup'

export const initialValues = {
  examType: "",
  class: "",
  subject: "",
  unit: "",
  chapter: "",
  topic: "",
  subTopic: "",
  questionType: "",
};
export const showblock = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

export const responseData = [
  "allChapter",
  "allClasses",
  "allExamtypes",
  "allQuestionType",
  "allSubjects",
  "allSubtopic",
  "allTemp1",
  "allTemp2",
  "allTemp3",
  "allTopic",
  "allUnit",
];



export const validationSchema = yup.object().shape({
  examType: yup.string().required("ExamType is required"),
  class: yup.string().required("Class is required"),
  subject: yup.string().required("Subject is required"),
  unit: yup.string().required("Unit is required"),
  chapter: yup.string().required("Chapter is required"),
  topic: yup.string().required("Topic is required"),
  subTopic: yup.string().required("subTopic is required"),
  questionType: yup.string().required("questionType is required"),
});