import actionTypes from './actionTypes';

export const setFirstRunCompleted = (completed) => (
  {
    type: actionTypes.SET_FIRST_RUN_COMPLETED,
    completed
  }
);