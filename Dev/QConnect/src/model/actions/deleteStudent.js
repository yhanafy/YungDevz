export const deleteStudent = (classIndex, studentIndex) => (
    {
      type: 'DELETE_STUDENT',
      classIndex,
      studentIndex
    }
  );