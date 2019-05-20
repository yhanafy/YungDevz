import actionTypes from './actionTypes';

export const editCurrentAssignment = (classId, studentIndex, newAssignment) => (
    {
        type: actionTypes.EDIT_CURRENT_ASSIGNMENT,
        classId,
        studentIndex,
        newAssignment
    }
);