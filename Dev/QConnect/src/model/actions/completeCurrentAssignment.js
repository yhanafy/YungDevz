import actionTypes from './actionTypes';

export const completeCurrentAssignment = (classId, studentId, evaluation) => (
    {
        type: actionTypes.COMPLETE_CURRENT_ASSIGNMENT,
        classId,
        studentId,
        evaluation
    }
);