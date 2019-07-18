import actionTypes from './actionTypes';

export const saveEvaluationPage = (evaluationInfo, classId, studentId) => (
  {
    type: actionTypes.SAVE_EVALUATION_PAGE,
    classId,
    evaluationInfo,
    studentId
  }
);