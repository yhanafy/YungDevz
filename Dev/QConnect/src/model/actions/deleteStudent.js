import actionTypes from './actionTypes';

export const deleteStudent = (classId, studentId) => (
    {
      type: actionTypes.DELETE_STUDENT,
      classId,
      studentId
    }
);