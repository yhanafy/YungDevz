import actionTypes from './actionTypes';

export const addNewAssignment = (classIndex, studentIndex, newAssignmentName, newAssignmentDate) => (
    {
        type: actionTypes.ADD_NEW_ASSIGNMENT,
        classIndex,
        studentIndex,
        newAssignmentName,
        newAssignmentDate
    }
);