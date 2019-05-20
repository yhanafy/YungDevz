import actionTypes from './actionTypes';

export const addNewAssignment = (classId, studentId, newAssignmentName) => (
    {
        type: actionTypes.ADD_NEW_ASSIGNMENT,
        classId,
        studentId,
        newAssignmentName
    }
);