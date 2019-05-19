
export default mapStateToCurrentClassProps = (state) => {
    let classIndex = state.data.teacher.currentClassIndex;
    let currentClass = classIndex >= 0 ? state.data.classes[classIndex] : null;
    return { classIndex, ...currentClass };
  };