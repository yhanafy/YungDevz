export const saveTeacherInfo = (teacherIndex, teacherInfo) => (
    {
      type: 'SAVE_TEACHER_INFO',
      teacherIndex,
      teacherInfo
    }
);