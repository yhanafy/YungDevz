
const getClassStudents = (studentIds, students) => {
  return Object.values(students).filter(s => studentIds.includes(s.id))
}

export default mapStateToCurrentClassProps = (state) => {
    let classId = state.data.teacher.currentClassId;
    let currentClass = classId.length > 0? state.data.classes[classId] : null;
    let students = currentClass? getClassStudents(state.data.classes[classId].students, state.data.students) : null;

    return { classId, ...currentClass, students };
  };