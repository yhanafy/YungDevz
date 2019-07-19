import actionTypes from './actionTypes';

export const updateAssignmentStatus = (newStatus) => (
  {
    type: actionTypes.UPDATE_ASSIGNMENT_STATUS,
    newStatus
  }
);