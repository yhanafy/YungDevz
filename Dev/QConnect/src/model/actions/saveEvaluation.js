import actionTypes from './actionTypes';

export const saveEvaluationPage = (evaluationInfo, classId, studentIndex) => (
    {
      type: actionTypes.SAVE_EVALUATION_PAGE,
      classId,
      evaluationInfo,
      studentIndex
    }
);