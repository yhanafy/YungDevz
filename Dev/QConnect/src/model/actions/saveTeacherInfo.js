import actionTypes from './actionTypes';

export const saveTeacherInfo = (teacherInfo) => (
    {
      type: actionTypes.SAVE_TEACHER_INFO,
      teacherInfo
    }
);