import { classReducer, INITIAL_STATE } from 'model/reducers/classReducer';
import actionTypes from "model/actions/actionTypes";
import nanoid from 'nanoid/non-secure'

  //------ test consts --------
  const teacher_props = {
    name: "Teacher Name 1",
    phoneNumber: "123-456-789",
    emailAddress: "test@email.com",
    currentClassId: "",
    profileImageId: 5
};

const teacher_no_class = {
    assignmentHistory: {},
    attendance: {},
    classes: {},
    currentAssignments: {},
    students: {},
    teacher: {
        ...teacher_props,
        classes: []
    }
};

const classInfo = {
    id: "uid1",
    name: "test class",
    imageId: 1,
    students: []
};

const teacher_one_class_no_students = {
    assignmentHistory: {},
    attendance: {},
    classes: {
        [classInfo.id]: {
            ...classInfo
        }
    },
    currentAssignments: {},
    students: {},
    teacher: {
        ...teacher_props,
        currentClassId: "uid1",
        classes: [
            classInfo.id
        ]
    },
};

const studentInfo = {
    id: "suid1",
    name: "Test Student 1",
    imageId: 8,
};

const teacher_one_class_one_student = {
    ...teacher_one_class_no_students,
    classes:{
        ...teacher_one_class_no_students.classes,
        uid1: {
            ...teacher_one_class_no_students.classes.uid1,
            students: ["suid1"]
        }
    },
    students: {
        "suid1": {
        ...studentInfo,
        }
    },
    currentAssignments: {
        byClassId: {
        uid1:{
            byStudentId: {
            "suid1": [
                {
                    grade: 0,
                    name: "None",
                    startDate: "",
                    totalAssignments: 0,
                },
            ],
        },
    }}}}

const date = Date.now;

const attendanceInfo = {
    date: date,
    isHere: false
};

const new_assignment_text = "Test new assignment";
const teacher_one_class_one_student_with_new_assignment = {
    teacher: {
        ...teacher_props,
        classes: [classInfo.id]
    },
    classes: {
        ...classInfo,
        students: [
            {
                ...studentInfo,
                currentAssignment: {
                    name: new_assignment_text,
                    startDate: "12/31/2018"
                }
            }
        ]
    }
};

const updated_assignment_text = "Updated assignment";

const teacher_one_class_one_student_updated_assignment = {
    teacher: {
        ...teacher_props,
        classes: [classInfo.id]
    },
    classes: {
            ...classInfo,
            students: [
                {
                    ...studentInfo,
                    currentAssignment: {
                        name: updated_assignment_text,
                        startDate: "12/31/2018"
                    }
                }
            ]
        }
};

const evaluation = {
    mainGrade: 4,
    categoriesGrades: [
      {
        name: "Memorization",
        grade: 'not graded',
      }
    ],
    notes: "good job",
    overallGrade: 3,
  }

const studentAssignmentHistory =  [{
        name: "Test new assignment",
        startDate: "12/31/2018",
        evaluation: evaluation,
        completionDate: "12/31/2018"
    }]

    const teacher_one_class_one_student_completed_assignment = {
        teacher: {
            ...teacher_props,
            classes: [classInfo.id]
        },
        classes: {
            uid1: {
            ...classInfo,
            students: [
                {
                    ...studentInfo,
                    totalGrade: 3,
                    totalAssignments: 1,
                    currentAssignment: {
                        name: new_assignment_text,
                        startDate: "12/31/2018"
                    },
                    assignmentHistory: studentAssignmentHistory
                }
            ]
        }
        }
    };
    
const teacher_one_class_one_student_with_attendance = {
    teacher: [
        {
            ...teacher_props,
            classes: [classInfo.id]
        }
    ],
    classes: [
        {
            ...classInfo,
            students: [
                {
                    ...studentInfo,
                    attendanceHistory: [
                        attendanceInfo
                    ]
                }
            ]
        }
    ]
};

describe('teacher reducer', () => {
    //------------ Initial state test ---------------------
    it('should return the initial state', async () => {
        expect(classReducer(undefined, {})).toEqual(INITIAL_STATE)
    })

    //------------ AddClass test ---------------------
    it('should handle ADD_CLASS', async () => {
        expect(
            classReducer(teacher_no_class, {
                type: actionTypes.ADD_CLASS,
                classInfo
            })
        ).toEqual(teacher_one_class_no_students);
    })

    //------------ AddStudent test ---------------------
    it('should handle ADD_STUDENT', async () => {
        jest.mock('nanoid/non-secure', () => jest.fn(() => 'suid1'));

        let payload = {
            studentInfo: studentInfo
        }

        actualState = classReducer(teacher_one_class_no_students, {
            type: actionTypes.ADD_STUDENT,
            classId: "uid1",
            studentInfo: payload
        });

        expect(
            actualState
        ).toEqual(teacher_one_class_one_student);
    })

    // //------------ DeleteStudent test ---------------------
    // it('should handle DELETE_STUDENT', () => {
    //     expect(
    //         classReducer(teacher_one_class_one_student, {
    //             type: actionTypes.DELETE_STUDENT,
    //             classId: "uid1",
    //             studentId: "suid1"
    //         })
    //     ).toEqual(teacher_one_class_no_students);
    // })

//     //------------ AddAttendance test ---------------------
//     it('should handle ADD_ATTENDANCE', () => {
//         const classId = 0;

//         expect(
//             classReducer(teacher_one_class_one_student, {
//                 type: actionTypes.ADD_ATTENDANCE,
//                 classId: classId,
//                 attendanceInfo: [attendanceInfo]
//             })
//         ).toEqual(teacher_one_class_one_student_with_attendance);
//     })
// })


// //-------------- set of tests that depend on mocking the Date class to get consistent results ----------------
// describe('teacher reducer with mock dates', () => {

//     const RealDate = Date

//     afterEach(() => {
//         global.Date = RealDate
//     })

//     beforeEach(() => {
//         const DATE_TO_USE = new Date('2019');
//         const _Date = Date;
//         global.Date = jest.fn(() => DATE_TO_USE);
//     })
        
//     //------------ AddNewAssignment test ---------------------
//     it('should handle ADD_NEW_ASSIGNMENT', () => {
//         const classId = 0;

//         expect(
//             classReducer(teacher_one_class_one_student, {
//                 type: actionTypes.ADD_NEW_ASSIGNMENT,
//                 classId: classId,
//                 studentId: 0,
//                 newAssignmentName: new_assignment_text
//             })
//         ).toEqual(teacher_one_class_one_student_with_new_assignment);
//     })

//     //------------ EditCurrentAssignment test ---------------------
//     it('should handle EDIT_CURRENT_ASSIGNMENT', () => {
//         const classId = 0;

//         updated_assignment = { name: updated_assignment_text, startDate: new Date().toLocaleDateString("EN-US") }
//         expect(
//             classReducer(teacher_one_class_one_student_with_new_assignment, {
//                 type: actionTypes.EDIT_CURRENT_ASSIGNMENT,
//                 classId: classId,
//                 studentId: 0,
//                 newAssignment: updated_assignment
//             })
//         ).toEqual(teacher_one_class_one_student_updated_assignment);
//     })

//     //------------ CompleteCurrentAssignment test ---------------------
//     it('should handle COMPLETE_CURRENT_ASSIGNMENT', () => {
//         const classId = 0;

//         expect(
//             classReducer(teacher_one_class_one_student_with_new_assignment, {
//                 type: actionTypes.COMPLETE_CURRENT_ASSIGNMENT,
//                 classId: classId,
//                 studentId: 0,
//                 evaluation: evaluation
//             })
//         ).toEqual(teacher_one_class_one_student_completed_assignment);
//     })
})