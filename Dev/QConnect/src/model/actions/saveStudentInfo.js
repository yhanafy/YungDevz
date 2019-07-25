import actionTypes from './actionTypes';

export const saveStudentInfo = (studentInfo) => (
  {
    type: actionTypes.SAVE_STUDENT_INFO,
    studentInfo
  }
);