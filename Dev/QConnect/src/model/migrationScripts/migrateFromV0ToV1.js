import update from 'immutability-helper';

export default function migrateFromV0ToV1(state) {
    let baseState = state.data;
    const {classes, fontLoaded, currentClassIndex, ...teacher} = baseState.teachers[0];
    var nanoid = require('nanoid/non-secure')
    let teacherId = nanoid()
  
    let classNameToClassId = {};
    let  attendance = { byClassId: {}};
    let assignmentsHistory = { byStudentId: {}};

    //---------   migrate classes schema ---------------
    let clsIndex = 0;
    let currentClassId = "";
    let classIds = [];

    updatedClassesList = baseState.teachers[0].classes.reduce(
      function(trimmedClasses, cls){
        let newClassId = nanoid();
        classIds = classIds.concat(newClassId);
        if(clsIndex++ === currentClassIndex) {currentClassId = newClassId};

        newClass = {id: newClassId, name: cls.name, imageId: cls.imageId, students: []};
        
        //Save the class name to class ID mapping to be used to construct later references
        classNameToClassId= {...classNameToClassId, [cls.name]: newClassId};

        //return the migrated object
        return {...trimmedClasses, [newClassId]: newClass};
      }, []
    )

    //-------- migrate students schema ------------------
    updatedStudentsList = {};
    let currentAssignments = {};
    baseState.teachers[0].classes.map((cls, index) => {
      
      let studentIds = [];
      //trim down the older student object to hold only the student's info, attendance and assignments are now on separate objects
      newStudentsList = cls.students.reduce(function (trimmedStudentsInfo, std) { 
          let studentId = nanoid();
          
          //save class's student IDs to add later to the class object.
          studentIds = studentIds.concat(studentId);

          //we only need the name, imageID, and ID as student info now. Assignments and attendance are tracked on separate objects
          newStudentInfo = {id: studentId, name: std.name, imageId: std.imageId};

          let clsId = classNameToClassId[cls.name];
          std.attendanceHistory.map( (att) => {
            attendance = updateAttendance(clsId, studentId, attendance, att);
          });

          std.assignmentHistory.map((assignment) => {
            const {overallGrade, fontLoaded, ...evaluationInfo} = assignment.evaluation;
            newEvaluation = {...evaluationInfo, grade: overallGrade}
            let newAssignment = {...assignment, evaluation: newEvaluation};
            assignmentsHistory = addToAssignmentHistory(assignmentsHistory, clsId, studentId, newAssignment)
          })

          currentAssignments = editAssignment(currentAssignments, clsId, studentId, std.currentAssignment)
         
          trimmedStudentsInfo = {...trimmedStudentsInfo, [studentId]: newStudentInfo};
          return trimmedStudentsInfo;
        }, {});

      //append the class students to the total list of students
      updatedStudentsList = {...updatedStudentsList, ...newStudentsList};

      //add reference to the students in the class object
      updatedClassesList[classNameToClassId[cls.name]].students = studentIds;
      return updatedStudentsList;
    });

    migratedState = {
      teacher: {
        id: teacherId,
        currentClassId: currentClassId,
        classes: classIds,
        ...teacher
      },
      students: updatedStudentsList,
      classes: updatedClassesList,
      attendance: attendance,
      assignmentsHistory: assignmentsHistory,
      currentAssignments: currentAssignments,
      firstRunCompleted: baseState.firstRunCompleted
    }

    return {data: migratedState};
}

function updateAttendance(clsId, studentId, attendance, currentAttendance) {    
    if (!attendance.byClassId[clsId]) {
      attendance = update(attendance, { byClassId: { $merge: { [clsId]: { byStudentId: { [studentId]: { [currentAttendance.date]: currentAttendance.isHere } } } } } });
    }
    else if (!attendance.byClassId[clsId].byStudentId[studentId]) {
      attendance = update(attendance, { byClassId: { [clsId]: { byStudentId: { $merge: { [studentId]: { [currentAttendance.date]: currentAttendance.isHere } } } } } });
    }
    else {
      attendance = update(attendance, { byClassId: { [clsId]: { byStudentId: { [studentId]: { $merge: { [currentAttendance.date]: currentAttendance.isHere } } } } } });
    }
    return attendance;
  }
  
  function addToAssignmentHistory(assignmentsHistory, classId, studentId, assignment) {
  
    if (!assignmentsHistory.byStudentId) {
      assignmentsHistory = update(assignmentsHistory, { byStudentId: { $set: { [studentId]: { byClassId: { [classId]: [assignment] } } } } } );
    }
    else if (!assignmentsHistory.byStudentId[studentId]) {
      assignmentsHistory = update(assignmentsHistory, { byStudentId: { $merge: { [studentId]: { byClassId: { [classId]: [assignment] } } } } });
    }
    else if (!assignmentsHistory.byStudentId[studentId].byClassId[classId]) {
      assignmentsHistory = update(assignmentsHistory, { byStudentId: { [studentId]: { byClassId: { $merge: { [classId]: [assignment] } } } } });
    }
    else {
      assignmentsHistory = update(assignmentsHistory, { byStudentId: { [studentId]: { byClassId: { [classId]: { $push: [assignment] } } } } });
    }
  
    return assignmentsHistory;
  }
  
  // Updates the current assignment with the new info
  function editAssignment(currentAssignments, classId, studentId, newAssignment) {
    if (!currentAssignments.byClassId) {
      currentAssignments = update(currentAssignments, { byClassId: { $set: { [classId]: { byStudentId: { [studentId]: [newAssignment] } } } } });
    }
    else if (!currentAssignments.byClassId[classId]) {
      currentAssignments = update(currentAssignments, { byClassId: { $merge: { [classId]: { byStudentId: { [studentId]: [newAssignment] } } } } });
    }
    else if (!currentAssignments.byClassId[classId].byStudentId[studentId]) {
      currentAssignments = update(currentAssignments, { byClassId: { [classId]: { byStudentId: { $merge: { [studentId]: [newAssignment] } } } } });
    }
    else {
      let oldAssignment = currentAssignments.byClassId[classId].byStudentId[studentId][0];
      let mergedAssignment = {...oldAssignment, ...newAssignment}
      currentAssignments = update(currentAssignments, { byClassId: { [classId]: { byStudentId: { [studentId]: { $set: [mergedAssignment] } } } } });
    }
  
    return currentAssignments;
  }