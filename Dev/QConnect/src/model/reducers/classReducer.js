import { combineReducers } from 'redux';
import update from 'immutability-helper';

export const INITIAL_STATE = {
  teachers: [
    {
      name: "Eslam Abdo",
      phoneNumber: "425-246-5971",
      emailAddress: "eslam_w@hotmail.com",
      currentClassIndex: 0,
      classes: [
        {
          name: "Monday Class ICOE",
          imageId: 1,
          students: [
            {
              name: "Ahmed Reducer",
              avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
              assignment: "Al-Nahl page 5",
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Amina Khan",
              avatar: "https://randomuser.me/api/portraits/thumb/women/42.jpg",
              assignment: "An-Naze'aat",
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Ayoub Barrak",
              avatar: "https://randomuser.me/api/portraits/thumb/men/43.jpg",
              assignment: "Aal-Imran",
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Khaled Kwick",
              avatar: "https://randomuser.me/api/portraits/thumb/men/45.jpg",
              assignment: "Al-Toor pages 2,3",
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Yassine Lightening",
              avatar: "https://randomuser.me/api/portraits/thumb/men/22.jpg",
              assignment: "Al-An'aam",
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Yusuf Awesome",
              avatar: "https://randomuser.me/api/portraits/thumb/men/26.jpg",
              assignment: "Huud, pages 3 and 4",
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            }
          ],
        }

      ]
    }
  ]

};

const classReducer = (state = INITIAL_STATE, action) => {
  // pulls list of current student in current state
  const {
    classes
  } = state.teachers[0];

  const baseState= {...state};

  switch (action.type) {
    case 'ADD_STUDENT':
      let classIndex = action.studentInfo.classIndex
      newState = update(baseState, {teachers: {[0]: {classes: {[classIndex]: {students: {$push: [action.studentInfo.studentInfo]}}}}}});
      return newState;

    case 'DELETE_STUDENT':
      newState = update(baseState, {teachers: {[0]: {classes: {[action.classIndex]: {students: {$splice: [[action.studentIndex, 1]]}}} } }});
      return newState;
      
    case 'ADD_CLASS':
      newState = update(baseState, {teachers: {[0]: {classes: {$push: [action.classInfo]}}}});
      return newState
    case 'ADD_ATTENDANCE':
      //Fetches the current list of students
      studentslist = state.teachers[0].classes[action.classIndex].students;
      
      //First checks if the student already has a recorded date with an attendance saved.
      //If he does, it will overwrite the old information with the new information. If he doesn't,
      //it will write the new information 
      for(i = 0; i < studentslist.length; i++) {
        let attHistory = studentslist[i].attendanceHistory;
        let addingDate = action.attendanceInfo[i].date;
        let isDatePreviouslySaved = false;
        let counter = 0;
        for(counter = 0; counter < attHistory.length; counter++) {
          if(attHistory[counter].date === addingDate) {
            isDatePreviouslySaved = true;
            break;
          }
        }
        if(isDatePreviouslySaved) {
          studentslist[i].attendanceHistory.splice(counter, 1, action.attendanceInfo[i])
        } else {
          studentslist[i].attendanceHistory.push(action.attendanceInfo[i]);
        }
        
      }

      newState = update(baseState, {teachers: {[0]: {classes: {[action.classIndex]: {students: {$set: [studentslist]}}}}  }});
      return state
    default:
      return state
  }
};

export default combineReducers({
  data: classReducer,
});