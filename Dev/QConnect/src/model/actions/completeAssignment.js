import actionTypes from './actionTypes';

export const completeAssignment = (classIndex, studentIndex, assignmentInfo) => (
    {
        type: actionTypes.COMPLETE_ASSIGNMENT,
        classIndex,
        studentIndex,
        assignmentInfo
    }
);