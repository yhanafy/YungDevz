import actionTypes from './actionTypes';

export const completeCurrentAssignment = (classId, studentIndex, evaluation) => (
    {
        type: actionTypes.COMPLETE_CURRENT_ASSIGNMENT,
        classId,
        studentIndex,
        evaluation
    }
);