import actionTypes from './actionTypes';

export const updateStudentImage = (classId, studentId, imageId) => (
  {
    type: actionTypes.UPDATE_STUDENT_IMAGE,
    classId,
    studentId,
    imageId
  }
);