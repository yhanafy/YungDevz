import actionTypes from './actionTypes';

export const addNewAssignment = (classId, studentIndex, newAssignmentName) => (
    {
        type: actionTypes.ADD_NEW_ASSIGNMENT,
        classId,
        studentIndex,
        newAssignmentName
    }
);