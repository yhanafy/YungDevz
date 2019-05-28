import actionTypes from './actionTypes';

export const updateStudentImage = (classIndex, studentIndex, imageId) => (
  {
    type: actionTypes.UPDATE_STUDENT_IMAGE,
    classIndex,
    studentIndex,
    imageId
  }
);