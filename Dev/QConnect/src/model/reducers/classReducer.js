import { combineReducers } from 'redux';
import update from 'immutability-helper';
import actionTypes from '../actions/actionTypes';
import Analytics from '@aws-amplify/analytics';
import analyticsEvents from 'config/analyticsEvents'
import awsconfig from '../../../aws-exports';

export const INITIAL_STATE = {
  firstRunCompleted: false,
  teacher: {
      id: "",
      name: "",
      phoneNumber: "",
      emailAddress: "",
      currentClassId: "",
      profileImageId: 1,
      classes: []
  },
  classes: {},
  students: {}
};

// configure analytics for redux
Analytics.configure(awsconfig);

export const classReducer = (state = INITIAL_STATE, action) => {
  // pulls list of current student in current state
  const {
    id, name, phoneNumber, emailAddress, classes
  } = state.teacher;

  if (Object.values(actionTypes).indexOf(action.type) > -1) {
    // Analytics.record({
    //   name: analyticsEvents.action_dispatched,
    //   attributes: { type: action.type }
    // })
  }

  const baseState = { ...state };

  switch (action.type) {
    case actionTypes.ADD_STUDENT:
      {
        let classId = action.classId

        var nanoid = require('nanoid')
        let newStudentId = nanoid()

        newState = update(baseState, { students: { $merge: {[newStudentId]: action.studentInfo} } } );
        newState = update(newState, { classes: { [classId]: { students: { $push: [newStudentId] } } } } );
        return newState;
      }
    case actionTypes.DELETE_STUDENT:
      {
        newState = update(baseState, { classes: { [action.classId]: { students: { $splice: [[action.studentId, 1]] } } } } );
        return newState;
      }
    case actionTypes.ADD_CLASS:
      {
        newState = update(baseState, { classes: { $merge: {[action.classInfo.id]: action.classInfo} } } );
        newState = update(newState, { teacher: { classes: { $push: [action.classInfo.id] } } });
        newState = update(newState, { teacher: { currentClassId: { $set: [action.classInfo.id] } } });
        return newState
      }
    case actionTypes.ADD_ATTENDANCE:
      {
        //Fetches the current list of students
        studentslist = state.classes[action.classId].students;

        //First checks if the student already has a recorded date with an attendance saved.
        //If he does, it will overwrite the old information with the new information. If he doesn't,
        //it will write the new information 
        for (i = 0; i < studentslist.length; i++) {
          let attHistory = studentslist[i].attendanceHistory;
          let addingDate = action.attendanceInfo[i].date;
          let isDatePreviouslySaved = false;
          let counter = 0;
          for (counter = 0; counter < attHistory.length; counter++) {
            if (attHistory[counter].date === addingDate) {
              isDatePreviouslySaved = true;
              break;
            }
          }
          if (isDatePreviouslySaved) {
            studentslist[i].attendanceHistory.splice(counter, 1, action.attendanceInfo[i])
          } else {
            studentslist[i].attendanceHistory.push(action.attendanceInfo[i]);
          }

        }

        newState = update(baseState, { classes: { [action.classId]: { students: { $set: studentslist } } } });
        return newState;
      }
    case actionTypes.SAVE_TEACHER_INFO:
      {
        //fetches current teacher info
        newState = update(baseState, { teacher: { $merge: { ...action.teacherInfo } } });
        return newState;
      }
    case actionTypes.EDIT_CURRENT_ASSIGNMENT:
      {
        let { classId, studentId } = action;
        let updatedAssignment = {
          name: action.newAssignment.name,
          startDate: action.newAssignment.startDate
        }

        let newState = update(baseState, { classes: { [classId]: { students: { [studentId]: { currentAssignment: { $set: updatedAssignment } } } } } });
        return newState;
      }
    case actionTypes.UPDATE_STUDENT_IMAGE:
      {
        let { classId, studentId, imageId } = action;
        let newState = update(baseState, { classes: { [classId]: { students: { [studentId]: { imageId: { $set: imageId } } } } } });
        return newState;
      }
    case actionTypes.ADD_NEW_ASSIGNMENT:
      {
        let { classId, studentId, newAssignmentName } = action;
        let newAssignmentDate = new Date().toLocaleDateString("en-US");

        //creates the new assignment before adding it to the persist
        let newCurrentAssignment = {
          name: newAssignmentName,
          startDate: newAssignmentDate
        }

        //updates the current assignment
        let newState = update(baseState, { classes: { [classId]: { students: { [studentId]: { currentAssignment: { $set: newCurrentAssignment } } } } } });
        return newState;
      }
    case actionTypes.COMPLETE_CURRENT_ASSIGNMENT:
      {
        let { classId, studentId, evaluation } = action;

        //updates the evaluation of the current assignment
        let assignment = {
          ...baseState.classes[classId].students[studentId].currentAssignment,
          completionDate: new Date().toLocaleDateString("en-US"),
          evaluation
        }

        //pushes the assignment to the array of assignment history (Remember, this action does not 
        //update the current assignment, this needs to be done using the addNewAssignment action)
        let newState = update(baseState, { classes: { [classId]: { students: { [studentId]: { assignmentHistory: { $push: [assignment] } } } } } });
        if (evaluation.overallGrade !== 0) {
          let totalAssignments = baseState.classes[classId].students[studentId].totalAssignments;
          let totalGrade = baseState.classes[classId].students[studentId].totalGrade;
          newState = update(newState, { classes: { [classId]: { students: { [studentId]: { totalAssignments: { $set: (totalAssignments + 1) } } } } } });
          newState = update(newState, { classes: { [classId]: { students: { [studentId]: { totalGrade: { $set: (totalGrade + assignment.evaluation.overallGrade) } } } } } });
        }
        return newState;
      }
    case actionTypes.SET_FIRST_RUN_COMPLETED:
      {
        let { completed } = action;
        let newState = update(baseState, { firstRunCompleted: { $set: completed } });
        return newState;
      }
    default:
      return state
  }
};

export default combineReducers({
  data: classReducer,
});