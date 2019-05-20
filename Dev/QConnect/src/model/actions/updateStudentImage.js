import actionTypes from './actionTypes';

export const updateStudentImage = (classId, studentIndex, imageId) => (
    {
      type: actionTypes.UPDATE_STUDENT_IMAGE,
      classId,
      studentIndex,
      imageId
    }
);