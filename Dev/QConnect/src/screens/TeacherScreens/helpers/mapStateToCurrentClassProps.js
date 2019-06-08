
const getClassStudents = (studentIds, students) => {
  return Object.values(students).filter(s => studentIds.includes(s.id))
}

export default mapStateToCurrentClassProps = (state) => {
    let classId = state.data.teacher.currentClassId;
    let currentClass = classId.length > 0? state.data.classes[classId] : null;
    let students = currentClass? getClassStudents(state.data.classes[classId].students, state.data.students) : null;
    let currentAssignments = (state.data.currentAssignments && state.data.currentAssignments.byClassId)? state.data.currentAssignments.byClassId[classId] : [{name: 'None', date: ''}]; 
    return { classId, ...currentClass, students, currentAssignments };
  };
