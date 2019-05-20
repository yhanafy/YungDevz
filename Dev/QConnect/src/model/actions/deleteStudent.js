import actionTypes from './actionTypes';

export const deleteStudent = (classId, studentIndex) => (
    {
      type: actionTypes.DELETE_STUDENT,
      classId,
      studentIndex
    }
);