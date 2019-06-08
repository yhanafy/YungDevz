export default mapStateToCurrentClassProps = (state) => {
  let classIndex = state.data.teachers[0].currentClassIndex;
  let currentClass = classIndex >= 0 ? state.data.teachers[0].classes[classIndex] : null;
  return { classIndex, ...currentClass };
};