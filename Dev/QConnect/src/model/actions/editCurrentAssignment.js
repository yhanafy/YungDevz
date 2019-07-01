import actionTypes from './actionTypes';

export const editCurrentAssignment = (classId, studentId, newAssignmentName) => (
    {
        type: actionTypes.EDIT_CURRENT_ASSIGNMENT,
        classId,
        studentId,
        newAssignmentName
    }
);