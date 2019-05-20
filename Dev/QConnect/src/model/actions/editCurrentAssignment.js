import actionTypes from './actionTypes';

export const editCurrentAssignment = (classId, studentId, newAssignment) => (
    {
        type: actionTypes.EDIT_CURRENT_ASSIGNMENT,
        classId,
        studentId,
        newAssignment
    }
);