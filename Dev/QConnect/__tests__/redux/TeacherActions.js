import { addClass } from "model/actions/addClass";
import { addStudent } from "model/actions/addStudent";
import { deleteStudent } from "model/actions/deleteStudent";
import { addAttendance } from "model/actions/addAttendance";
//import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('should create an action to add a class', () => {
    const classInfo = {
        name: "test class",
        imageId: 1,
        students: []
      };
    const expectedAction = {
      type: "ADD_CLASS",
      classInfo
    }
    expect(addClass(classInfo)).toEqual(expectedAction)
  })

  it('should create an action to add a student to a class', () => {
      const studentInfo = {
        classIndex: 0,
        studentInfo: {
          name: "Tester Student 1",
          avatar: "http://test.avatar.url",
          assignment: "Test assignment",
          attendanceHistory: []
        }
      };

    const expectedAction = {
      type: "ADD_STUDENT",
      studentInfo
    }
    expect(addStudent(studentInfo)).toEqual(expectedAction)
  })
})