import actionTypes from './actionTypes';

export const addStudent = (classId, studentInfo) => (
    {
      type: actionTypes.ADD_STUDENT,
      classId,
      studentInfo,
    }
  );