import { addClass } from "model/actions/addClass";
import { addStudent } from "model/actions/addStudent";
import { deleteStudent } from "model/actions/deleteStudent";
import { addAttendance } from "model/actions/addAttendance";
import { completeCurrentAssignment } from "../../src/model/actions/completeCurrentAssignment";
import {saveTeacherInfo} from "../../src/model/actions/saveTeacherInfo"
import { editCurrentAssignment } from "../../src/model/actions/editCurrentAssignment"; 
import actionTypes from "model/actions/actionTypes";

describe('actions', () => {
  // ----------- ADD_CLASS Dispatch ------------------------
  it('should create an action to add a class', () => {
    const classInfo = {
        name: "test class",
        imageId: 1,
      };
    const expectedAction = {
      type: actionTypes.ADD_CLASS,
      classInfo
    }
    expect(addClass(classInfo)).toEqual(expectedAction)
  })

  // ----------- ADD_STUDENT Dispatch ------------------------
  it('should create an action to add a student to a class', () => {
      const studentInfo = {
            name: "Tester Student 1",
            imageId: 6,
      };
      
      const classId = "uid1";

    const expectedAction = {
      type: actionTypes.ADD_STUDENT,
      classId,
      studentInfo
    }
    expect(addStudent(classId, studentInfo)).toEqual(expectedAction)
  })

  // ----------- DELETE_STUDENT Dispatch ------------------------
  it('should create an action to delete a student from a class', () => {

    classId = 0;
    studentId = 3;

    const expectedAction = {
      type: actionTypes.DELETE_STUDENT,
      classId,
      studentId
    }
    expect(deleteStudent(classId, studentId)).toEqual(expectedAction)
  })

  // ----------- ADD_ATTENDANCE Dispatch ------------------------
  it('should create an action to update a class attendance', () => {

    let date = Date.now
    const attendanceInfo ={
      "suid1": {
        "3/2/1982": false
      }
    };
    const classId = "uid1";

    const expectedAction = {
      type: actionTypes.ADD_ATTENDANCE,
      classId,
      date,
      attendanceInfo,
    }
    expect(addAttendance(classId, date, attendanceInfo)).toEqual(expectedAction)
  })

// ----------- SAVE_TEACHER_INFO Dispatch ------------------------
it('should create an action to save teacher info', () => {

  teacherInfo = {
    name: "test name"
  };

  const expectedAction = {
    type: actionTypes.SAVE_TEACHER_INFO,
    teacherInfo
  }
  expect(saveTeacherInfo(teacherInfo)).toEqual(expectedAction)
})

// ----------- EDIT_CURRENT_ASSIGNMENT Dispatch ------------------------
it("should create an action to edit student's assignment", () => {

  classId = 0;
  studentId = 3;
  newAssignmentName = "current assignment"

  const expectedAction = {
    type: actionTypes.EDIT_CURRENT_ASSIGNMENT,
    classId,
    studentId,
    newAssignmentName
  }
  expect(editCurrentAssignment(classId, studentId, newAssignmentName)).toEqual(expectedAction)
})

// ----------- COMPLETE_ASSIGNMENT Dispatch ------------------------
it("should create an action to complete a student's assignment", () => {

  classId = 0;
  studentId = 3;
  evaluation = {
    mainGrade: 4,
    categoriesGrades: [
      {
        name: "Memorization",
        grade: 'not graded',
      }
    ],
    notes: "good job"
  }

  const expectedAction = {
    type: actionTypes.COMPLETE_CURRENT_ASSIGNMENT,
    classId,
    studentId, 
    evaluation
  }
  expect(completeCurrentAssignment(classId, studentId, evaluation)).toEqual(expectedAction)
})

})
