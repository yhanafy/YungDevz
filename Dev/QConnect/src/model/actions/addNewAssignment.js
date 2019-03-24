import actionTypes from './actionTypes';

export const addNewAssignment = (classIndex, studentIndex, newAssignment) => (
    {
        type: actionTypes.ADD_NEW_ASSIGNMENT,
        classIndex,
        studentIndex,
        newAssignment
    }
);