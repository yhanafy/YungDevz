import { classReducer, INITIAL_STATE } from 'model/reducers/classReducer';
import actionTypes from "model/actions/actionTypes";

  //------ test consts --------
  const teacher_props = {
    name: "Teacher Name 1",
    phoneNumber: "123-456-789",
    emailAddress: "test@email.com",
    currentClassId: "",
    profileImageId: 5
};

const teacher_no_class = {
    assignmentsHistory: {byStudentId: {}},
    attendance: {byClassId: {}},
    classes: {},
    currentAssignments: {byClassId: {}},
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
    assignmentsHistory: {byStudentId: {}},
    attendance: {byClassId: {}},
    classes: {
        [classInfo.id]: {
            ...classInfo
        }
    },
    currentAssignments: {byClassId: {}},
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

const teacher_one_class_student_removed_from_class = {
    assignmentsHistory: {byStudentId: {}},
    attendance: {byClassId: {}},
    classes: {
        [classInfo.id]: {
            ...classInfo
        }
    },
    currentAssignments: {byClassId: {}},
    students: {
        suid1: {
            ...studentInfo
        }
    },
    teacher: {
        ...teacher_props,
        currentClassId: "uid1",
        classes: [
            classInfo.id
        ]
    },
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
        "uid1":{
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
    suid1: {
        "12/31/2018": false
    }
};

const new_assignment_text = "Test new assignment";
const teacher_one_class_one_student_with_new_assignment = {
    ...teacher_one_class_one_student,
    currentAssignments: {
        byClassId: {
        uid1:{
            byStudentId: {
            "suid1": [
                {
                    grade: 0,
                    name: new_assignment_text,
                    startDate: "12/31/2018",
                    totalAssignments: 0,
                },
            ],
        },
    }}
    }
};

const updated_assignment_text = "Updated assignment";

const teacher_one_class_one_student_updated_assignment = {
    ...teacher_one_class_one_student_with_new_assignment,
        currentAssignments: {
            byClassId: {
            uid1:{
                byStudentId: {
                "suid1": [
                    {
                        grade: 0,
                        name: updated_assignment_text,
                        startDate: "12/31/2018",
                        totalAssignments: 0,
                    },
                ],
            },
        }}
        }
};

const evaluation = {
    notes: 'Great job',
    improvementAreas: [
        'Makharej'
    ],
    grade: 5
}

const studentassignmentsHistory =  [{
        name: "Test new assignment",
        startDate: "12/31/2018",
        evaluation: evaluation,
        completionDate: "12/31/2018"
    }]

    const teacher_one_class_one_student_completed_assignment = {
        ...teacher_one_class_one_student_with_new_assignment,
        currentAssignments: {
            byClassId: {
                uid1: {
                    byStudentId: {
                        "suid1": [
                            {
                                grade: 5,
                                name: new_assignment_text,
                                startDate: "12/31/2018",
                                totalAssignments: 1,
                            },
                        ],
                    },
                }
            }
        },
        assignmentsHistory: {
            byStudentId: {
                suid1: {
                    byClassId: {
                        uid1:[
                        {
                            name: new_assignment_text,
                            startDate: '12/31/2018',
                            completionDate: '12/31/2018',
                            evaluation: evaluation
                        }
                        ]
                    }
                }
            }
        }
    };
    
const teacher_one_class_one_student_with_attendance = {
    ...teacher_one_class_one_student,
    attendance: {
        byClassId: {
            uid1: {
                byStudentId: {
                    suid1: {
                        "12/31/2018": false
                    }
                }
            }
        }
    }
};

//----- Mocking AWS Analytics -------------------------
//Todo: we should create a real mock instead of hacking global
//--------------------------------------------------------
const RealAnalytics = require('@aws-amplify/analytics')

afterEach(() => {
    global.Analytics = RealAnalytics
})

class MockAnalytics {
    static configure(data){return ""};
}

beforeEach(() => {
    global.Analytics = jest.fn(() => MockAnalytics);
})
//----------- End of mocking Analytics ------------------
  
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

    //------------ DeleteStudent test ---------------------
    it('should handle DELETE_STUDENT', () => {
        expect(
            classReducer(teacher_one_class_one_student, {
                type: actionTypes.DELETE_STUDENT,
                classId: "uid1",
                studentId: "suid1"
            })
        ).toEqual(teacher_one_class_student_removed_from_class);

        // test removing a student who has attendance record
        expect(
            classReducer(teacher_one_class_one_student_with_attendance, {
                type: actionTypes.DELETE_STUDENT,
                classId: "uid1",
                studentId: "suid1"
            })
        ).toEqual(teacher_one_class_student_removed_from_class);
    })

    //------------ AddAttendance test ---------------------
    it('should handle ADD_ATTENDANCE', () => {

        expect(
            classReducer(teacher_one_class_one_student, {
                type: actionTypes.ADD_ATTENDANCE,
                classId: "uid1",
                attendanceInfo: attendanceInfo
            })
        ).toEqual(teacher_one_class_one_student_with_attendance);
    })
})


//-------------- set of tests that depend on mocking the Date class to get consistent results ----------------
describe('teacher reducer with mock dates', () => {

    const RealDate = Date

    afterEach(() => {
        global.Date = RealDate
    })

    beforeEach(() => {
        const DATE_TO_USE = new Date('2019');
        const _Date = Date;
        global.Date = jest.fn(() => DATE_TO_USE);
    })
        
    //------------ AddNewAssignment test ---------------------
    it('should handle Adding new assignment', () => {

        expect(
            classReducer(teacher_one_class_one_student, {
                type: actionTypes.EDIT_CURRENT_ASSIGNMENT,
                classId: "uid1",
                studentId: "suid1",
                newAssignmentName: new_assignment_text
            })
        ).toEqual(teacher_one_class_one_student_with_new_assignment);
    })

    //------------ EditCurrentAssignment test ---------------------
    it('should handle EDIT_CURRENT_ASSIGNMENT', () => {

        actual = classReducer(teacher_one_class_one_student_with_new_assignment, {
            type: actionTypes.EDIT_CURRENT_ASSIGNMENT,
            classId: "uid1",
            studentId: "suid1",
            newAssignmentName: updated_assignment_text
        });

        updated_assignment = { name: updated_assignment_text, startDate: new Date().toLocaleDateString("EN-US") }
        expect(
            actual
        ).toEqual(teacher_one_class_one_student_updated_assignment);

    })

    //------------ CompleteCurrentAssignment test ---------------------
    it('should handle COMPLETE_CURRENT_ASSIGNMENT', () => {

        actual = classReducer(teacher_one_class_one_student_with_new_assignment, {
            type: actionTypes.COMPLETE_CURRENT_ASSIGNMENT,
            classId: "uid1",
            studentId: "suid1",
            evaluation: evaluation
        });

        expect(
            actual
        ).toEqual(teacher_one_class_one_student_completed_assignment);
   })
})