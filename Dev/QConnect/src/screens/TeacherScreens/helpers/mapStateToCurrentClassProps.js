
export default mapStateToCurrentClassProps = (state) => {
    let classId = state.data.teacher.currentClassId;
    let currentClass = classId.length > 0? state.data.classes[classId] : null;
    return { classId, ...currentClass };
  };