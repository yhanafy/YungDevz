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
  students: {},
  attendance: {
    byClassId: {}
  },
  currentAssignments: {
    byClassId: {

    }
  },
  assignmentsHistory:{
    byStudentId: {

    }
  }
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

        var nanoid = require('nanoid/non-secure')
        let newStudentId = nanoid()

        let newStudent = {id: newStudentId, ...action.studentInfo.studentInfo}

        newState = update(baseState, { students: { $merge: {[newStudentId]: newStudent} } } );
        newState = update(newState, { classes: { [classId]: { students: { $push: [newStudentId] } } } } );
        newState = editAssignment(newState, classId, newStudentId, {name: 'None', startDate: '', totalAssignments: 0, grade: 0});
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
        let classId = action.classId;
        newState = baseState;
        if (!baseState.attendance.byClassId[classId]) {
          newState = update(baseState, { attendance: { byClassId: { $merge: {[classId]: { byDate: { }}}}}});
        }
      
        newState = update(newState,  { attendance: { byClassId: { [classId]: { byDate: {$merge: {[ action.date]: action.attendanceInfo} } } } }} );
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
        let { classId, studentId, newAssignmentName } = action;
        let newAssignmentDate = new Date().toLocaleDateString("en-US");

        let newAssignment = {
          name: newAssignmentName,
          startDate: newAssignmentDate
        }

        let newState = editAssignment(baseState, classId, studentId, newAssignment);
        return newState;
      }
    case actionTypes.UPDATE_STUDENT_IMAGE:
      {
        let { classId, studentId, imageId } = action;
        let newState = update(baseState, {students: { [studentId]: { imageId: { $set: imageId } } } });
        return newState;
      }
    case actionTypes.COMPLETE_CURRENT_ASSIGNMENT:
      {
        let { classId, studentId, evaluation } = action;
        const {grade, totalAssignments, ...oldAssignment} = baseState.currentAssignments.byClassId[classId].byStudentId[studentId][0];
    
        //updates the evaluation of the current assignment
        let assignment = {
          ...oldAssignment, //todo, pass index of which assignment (oncw we support multiple current assigments)
          completionDate: new Date().toLocaleDateString("en-US"),
          evaluation
        }

        let newState = addToAssignmentHistory(baseState, classId, studentId, assignment);
        
        //pushes the assignment to the array of assignment history (Remember, this action does not 
        if (evaluation.grade !== 0) {
          let { totalAssignmentsNum, newGrade } = getNewAvgGradeAndTotal(totalAssignments, grade, assignment);
          let newAssignment = {...oldAssignment, totalAssignments: totalAssignmentsNum, grade: newGrade}
          
          //todo: right now even though the currentAssignments is an array, we still only support one assignment, so we replace the first element with the new assignment
          // later, once we start officially supporting mutliple assignments, we need to properly replace the right assignment index
          newState = update(newState, { currentAssignments: { byClassId: { [classId]: { byStudentId: { [studentId]: {$splice: [[0, 1, newAssignment]]} } } }}});
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

//calculates new average grade from old average and total number of assignments
// returns: {the new grade average, the new total number of assignments
function getNewAvgGradeAndTotal(totalAssignments, grade, assignment) {
  let totalAssignmentsNum = totalAssignments ? totalAssignments : 0;
  let oldGrade = grade ? grade : 0;
  let newGrade = ((oldGrade * totalAssignmentsNum) + assignment.evaluation.grade) / ++totalAssignmentsNum;
  return { totalAssignmentsNum, newGrade };
}

// Updates the current assignment with the new info
function editAssignment(baseState, classId, studentId, newAssignment) {
  newState = baseState;
  if (!newState.currentAssignments.byClassId) {
    newState = update(newState, { currentAssignments: { byClassId: { $set: { [classId]: { byStudentId: { [studentId]: [newAssignment] } } } } } });
  }
  else if (!newState.currentAssignments.byClassId[classId]) {
    newState = update(newState, { currentAssignments: { byClassId: { $merge: { [classId]: { byStudentId: { [studentId]: [newAssignment] } } } } } });
  }
  else if (!newState.currentAssignments.byClassId[classId].byStudentId[studentId]) {
    newState = update(newState, { currentAssignments: { byClassId: { [classId]: { byStudentId: { $merge: { [studentId]: [newAssignment] } } } } } });
  }
  else {
    let oldAssignment = newState.currentAssignments.byClassId[classId].byStudentId[studentId][0];
    let mergedAssignment = {...oldAssignment, ...newAssignment}
    newState = update(newState, { currentAssignments: { byClassId: { [classId]: { byStudentId: { [studentId]: { $set: [mergedAssignment] } } } } } });
  }

  return newState;
}

// pushes the completed assignment to the assignment history
function addToAssignmentHistory(baseState, classId, studentId, assignment) {
  newState = baseState;
  if (!newState.assignmentsHistory.byStudentId) {
    newState = update(newState, { assignmentsHistory: { byStudentId: { $set: { [studentId]: { byClassId: { [classId]: [assignment] } } } } } });
  }
  else if (!newState.assignmentsHistory.byStudentId[studentId]) {
    newState = update(newState, { assignmentsHistory: { byStudentId: { $merge: { [studentId]: { byClassId: { [classId]: [assignment] } } } } } });
  }
  else if (!newState.assignmentsHistory.byStudentId[studentId].byClassId[classId]) {
    newState = update(newState, { assignmentsHistory: { byStudentId: { [studentId]: { byClassId: { $merge: { [classId]: [assignment] } } } } } });
  }
  else {
    newState = update(newState, { assignmentsHistory: { byStudentId: { [studentId]: { byClassId: { [classId]: { $push: [assignment] } } } } } });
  }

  return newState;
}
