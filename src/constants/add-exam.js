import * as yup from "yup";

export const initialValues = {
  examType: "",
  class: "",
  subject: "",
  unit: "",
  chapter: "",
  topic: "",
  subTopic: "",
  // temp1: "",
  // temp2: "",
  // temp3: "",
};
export const showblock = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  // false,
];

export const responseData = [
  "allExamtypes",
  "allClasses",
  "allSubjects",
  "allUnit",
  "allChapter",
  "allTopic",
  "allSubtopic",
  // "allQuestionType",
  // "allTemp1",
  // "allTemp2",
  // "allTemp3",
];

export const Schema1 = yup.object().shape({
  examType: yup.string().required("Exam Type is Required"),
  class: yup.string(),
  subject: yup.string(),
  unit: yup.string(),
  chapter: yup.string(),
  topic: yup.string(),
  subTopic: yup.string(),
  questionType: yup.string(),
});

export const Schema2 = yup.object().shape({
  examType: yup.string().required("Exam Type is Required"),
  class: yup.string().required("Class is Required"),
  subject: yup.string(),
  unit: yup.string(),
  chapter: yup.string(),
  topic: yup.string(),
  subTopic: yup.string(),
  questionType: yup.string(),
});

export const Schema3 = yup.object().shape({
  examType: yup.string().required("Exam Type is Required"),
  class: yup.string().required("Class is Required"),
  subject: yup.string().required("Subject is Required"),
  unit: yup.string(),
  chapter: yup.string(),
  topic: yup.string(),
  subTopic: yup.string(),
  questionType: yup.string(),
});
export const Schema4 = yup.object().shape({
  examType: yup.string().required("Exam Type is Required"),
  class: yup.string().required("Class is Required"),
  subject: yup.string().required("Subject is Required"),
  unit: yup.string().required("Unit is Required"),
  chapter: yup.string(),
  topic: yup.string(),
  subTopic: yup.string(),
  questionType: yup.string(),
});
export const Schema5 = yup.object().shape({
  examType: yup.string().required("Exam Type is Required"),
  class: yup.string().required("Class is Required"),
  subject: yup.string().required("Subject is Required"),
  unit: yup.string().required("Unit is Required"),
  chapter: yup.string().required("Chapter is Required"),
  topic: yup.string(),
  subTopic: yup.string(),
  questionType: yup.string(),
});
export const Schema6 = yup.object().shape({
  examType: yup.string().required("Exam Type is Required"),
  class: yup.string().required("Class is Required"),
  subject: yup.string().required("Subject is Required "),
  unit: yup.string().required("Unit is Required"),
  chapter: yup.string().required("Chapter is Required"),
  topic: yup.string().required("Topic is Required"),
  subTopic: yup.string(),
  questionType: yup.string(),
});
export const Schema7 = yup.object().shape({
  examType: yup.string().required("Exam Type is Required"),
  class: yup.string().required("Class is Required"),
  subject: yup.string().required("Subject is Required"),
  unit: yup.string().required("Unit is Required"),
  chapter: yup.string().required("Chapter is Required"),
  topic: yup.string().required("Topic is Required"),
  subTopic: yup.string().required("SubTopic is Required"),
  questionType: yup.string(),
});
