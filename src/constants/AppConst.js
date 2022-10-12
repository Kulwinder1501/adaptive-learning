export const API_BASE_URL = "https://ques-portal-backend.herokuapp.com";

export const QUESTION = {
  GET_ALL: "question/viewQuestions",
  ADD_QUESTION: "question/createQuestion",
  VIEW_QUESTION: "question/viewQuestionById/{id}",
  DELETE_QUESTION: "question/deleteQuestion/{id}",
  UPDATE_QUESTION: "question/updateQuestion/{id}",
  VIEW_ALL_FIELDS: "question/viewAllfields",
};
export const EXAM = {
  GET_ALL: "question/viewAllFields",
  ADD_EXAM: "question/addQuestionFields",
  VIEW_QUESTION: "question/viewQuestionById/{id}",
  DELETE_QUESTION: "question/deleteQuestion/{id}",
  UPDATE_QUESTION: "question/updateQuestion/{id}",
  VIEW_ALL_FIELDS: "question/viewAllfields",
};
export const ADMIN = {
  CREATE_ADMIN: "admin/createAdmin",
  VIEW_ALL: "admin/viewAllAdmins",
  CHANGE_ADMIN_ROLE: "admin/changeAdminRole/{id}",
  DELETE_ADMIN: "admin/deleteAdmin/{id}",
  CHECK_ADMIN_TYPE: "admin/checkAdminType",
};

export const ACTIVITY = {
  ALL_ACTIVITY: "activity/checkOverallActivity",
  ACTIVITY_BY_ID: "activity/checkDetailedActivityByAdminId",
};
