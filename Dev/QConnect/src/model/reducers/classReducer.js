import { combineReducers } from 'redux';
import update from 'immutability-helper';

const INITIAL_STATE = {
  currentClassIndex: 0,
  classes: [
    {
        name: "Monday Class ICOE",
        students: [
          {
            name: "Ahmed Reducer",
            avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            assignment: "Al-Nahl page 5"
          },
          {
            name: "Amina Khan",
            avatar: "https://randomuser.me/api/portraits/thumb/women/42.jpg",
            assignment: "An-Naze'aat"
          },
          {
            name: "Ayoub Barrak",
            avatar: "https://randomuser.me/api/portraits/thumb/men/43.jpg",
            assignment: "Aal-Imran"
          },
          {
            name: "Khaled Kwick",
            avatar: "https://randomuser.me/api/portraits/thumb/men/45.jpg",
            assignment: "Al-Toor pages 2,3"
          },
          {
            name: "Yassine Lightening",
            avatar: "https://randomuser.me/api/portraits/thumb/men/22.jpg",
            assignment: "Al-An'aam"
          },
          {
            name: "Yusuf Awesome",
            avatar: "https://randomuser.me/api/portraits/thumb/men/26.jpg",
            assignment: "Huud, pages 3 and 4"
          }
        ]
      }

  ]

};

const classReducer = (state = INITIAL_STATE, action) => {
  // pulls list of current student in current state
  const {
    classes
  } = state;

  switch (action.type) {
    case 'ADD_STUDENT':

    let classIndex = action.studentInfo.classIndex
    // let students = state.classes[classIndex].students;
    
    // students2 = students.length > 0? students.concat(action.studentInfo.studentInfo) : action.studentInfo.studentInfo;
    // const updatedClass = {
    //   ...classes[classIndex],
    //   students: [students2]
    // } 

    //alert ("updateClass: OOOOOO " + JSON.stringify(updatedClass))

    //alert ("updateClass" + JSON.stringify(updatedClass))

    const baseState= {...state};
    //alert ("baseclass" + JSON.stringify(baseClasses))

//     const collection = {children: ['zero', 'one', 'two']};
// const index = 1;
// const newCollection = update(collection, {children: {[index]: {$set: 1}}});
// => {children: ['zero', 1, 'two']}
    const newState = update(baseState, {classes: {[classIndex]: {students: {$push: [action.studentInfo.studentInfo]}}}});

    //const newClasses = update(baseClasses, {[classIndex]: {$merge: updatedClass}});
    //alert ("newClass" + JSON.stringify(newClasses))

    // const myret = {
    //   ...state,
    //   classes: [newClasses]
    // }
    alert ("new state" + JSON.stringify(newState))


    return newState;




/**
 * students: {
          ...state.first.second,
          [action.someId]: {
            ...state.first.second[action.someId],
            fourth: action.someValue
          }
        }
 */
    // alert ("ClassIndex " + classIndex + ". data " + JSON.stringify(state.classes[classIndex]))
    // //alert (JSON.stringify(state.classes[classIndex].students? state.classes[classIndex].students : "undefined"))
      

      // mynewstate = {
      //   ...state,
      //   classes: newClasses
      // }
      // alert (JSON.stringify(mynewstate))
      // return mynewstate;

    case 'DELETE_STUDENT':
      let studentsList = state.classes[action.studentIndex.classIndex].students;
      studentsList.splice(action.studentIndex.studentIndex, 1);

      // Finally, update our redux state
      updatedClass = {
        ...classes[classIndex],
        students: studentsList
      } 

      return {
        ...state,
        classes: [updatedClass]
      }
    case 'ADD_CLASS':
      return { 
        ...state,
        classes: state.classes.concat(action.classInfo)
      }
    default:
      return state
  }
};

export default combineReducers({
  classrooms: classReducer,
});