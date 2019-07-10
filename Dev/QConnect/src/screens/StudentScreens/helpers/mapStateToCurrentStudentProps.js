//Maps the current state to the props
export default mapStateToCurrentStudentProps = (state) => {

    const student = state.data.student;
    return { student };
    
}