import { classReducer, INITIAL_STATE } from 'model/reducers/classReducer';
import actionTypes from "model/actions/actionTypes";

  //------ test consts --------
  const teacher_props = {
    name: "Teacher Name 1",
    phoneNumber: "123-456-789",
    emailAddress: "test@email.com",
    currentClassIndex: 0,
    profileImageId: 5
};

const teacher_no_class = {
    teachers: [
        {
            ...teacher_props,
            classes: []
        }]
};

const classInfo = {
    name: "test class",
    imageId: 1,
    students: []
};

const teacher_one_class_no_students = {
    teachers: [
        {
            ...teacher_props,
            classes: [
                classInfo
            ]
        }
    ]
};

const studentInfo = {
    name: "Test Student 1",
    avatar: "http://test.avatar.url",
    attendanceHistory: [],
    assignmentHistory: [],
};

const teacher_one_class_one_student = {
    teachers: [
        {
            ...teacher_props,
            classes: [
                {
                    ...classInfo,
                    students: [
                        studentInfo
                    ]
                }
            ]
        }
    ]
};

const date = Date.now;

const attendanceInfo = {
    date: date,
    isHere: false
};

const new_assignment_text = "Test new assignment";
const teacher_one_class_one_student_with_new_assignment = {
    teachers: [
        {
            ...teacher_props,
            classes: [
                {
                    ...classInfo,
                    students: [
                        {
                            ...studentInfo,
                            currentAssignment: {
                                name: new_assignment_text,
                                startDate: "1/1/2019"
                            }
                        }
                    ]
                }
            ]
        }
    ]
};

const updated_assignment_text = "Updated assignment";
const teacher_one_class_one_student_updated_assignment = {
    teachers: [
        {
            ...teacher_props,
            classes: [
                {
                    ...classInfo,
                    students: [
                        {
                            ...studentInfo,
                            currentAssignment: {
                                name: updated_assignment_text,
                                startDate: "1/1/2019"
                            }
                        }
                    ]
                }
            ]
        }
    ]
};

const studentAssignmentHistory =  [{
        completionDate: date,
        evaluation: "good job",
        name: "Updated assignment",
        startDate: date,
    }]

    const teacher_one_class_one_student_completed_assignment = {
        teachers: [
            {
                ...teacher_props,
                classes: [
                    {
                        ...classInfo,
                        students: [
                            {
                                ...studentInfo,
                                currentAssignment: {
                                    name: new_assignment_text,
                                    startDate: "1/1/2019"
                                },
                                assignmentHistory: studentAssignmentHistory
                            }
                        ]
                    }
                ]
            }
        ]
    };

    
const teacher_one_class_one_student_with_attendance = {
    teachers: [
        {
            ...teacher_props,
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
        }
    ]
};


const evaluation_text = "good job"

describe('teacher reducer', () => {
    //------------ Initial state test ---------------------
    it('should return the initial state', () => {
        expect(classReducer(undefined, {})).toEqual(INITIAL_STATE)
    })

    //------------ AddClass test ---------------------
    it('should handle ADD_CLASS', () => {
        expect(
            classReducer(teacher_no_class, {
                type: actionTypes.ADD_CLASS,
                classInfo
            })
        ).toEqual(teacher_one_class_no_students);
    })

    //------------ AddStudent test ---------------------
    it('should handle ADD_STUDENT', () => {
        let payload = {
            classIndex: 0,
            studentInfo: studentInfo
        }
        expect(
            classReducer(teacher_one_class_no_students, {
                type: actionTypes.ADD_STUDENT,
                studentInfo: payload
            })
        ).toEqual(teacher_one_class_one_student);
    })

    //------------ DeleteStudent test ---------------------
    it('should handle DELETE_STUDENT', () => {
        expect(
            classReducer(teacher_one_class_one_student, {
                type: actionTypes.DELETE_STUDENT,
                classIndex: 0,
                studentIndex: 0
            })
        ).toEqual(teacher_one_class_no_students);
    })

    //------------ AddAttendance test ---------------------
    it('should handle ADD_ATTENDANCE', () => {
        const classIndex = 0;

        expect(
            classReducer(teacher_one_class_one_student, {
                type: actionTypes.ADD_ATTENDANCE,
                classIndex: classIndex,
                attendanceInfo: [attendanceInfo]
            })
        ).toEqual(teacher_one_class_one_student_with_attendance);
    })

    //------------ EditCurrentAssignment test ---------------------
    it('should handle COMPLETE_ASSIGNMENT', () => {
        const classIndex = 0;

        expect(
            classReducer(teacher_one_class_one_student_with_new_assignment, {
                type: actionTypes.COMPLETE_ASSIGNMENT,
                classIndex: classIndex,
                studentIndex: 0,
                assignmentInfo: {
                    name: updated_assignment_text,
                    startDate: date,
                    completionDate: date,
                    evaluation: evaluation_text
                }
            })
        ).toEqual(teacher_one_class_one_student_completed_assignment);
    })
})

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
    it('should handle ADD_NEW_ASSIGNMENT', () => {
        const classIndex = 0;

        expect(
            classReducer(teacher_one_class_one_student, {
                type: actionTypes.ADD_NEW_ASSIGNMENT,
                classIndex: classIndex,
                studentIndex: 0,
                newAssignmentName: new_assignment_text
            })
        ).toEqual(teacher_one_class_one_student_with_new_assignment);
    })

    //------------ EditCurrentAssignment test ---------------------
    it('should handle EDIT_CURRENT_ASSIGNMENT', () => {
        const classIndex = 0;

        expect(
            classReducer(teacher_one_class_one_student_with_new_assignment, {
                type: actionTypes.EDIT_CURRENT_ASSIGNMENT,
                classIndex: classIndex,
                studentIndex: 0,
                newAssignment: updated_assignment_text
            })
        ).toEqual(teacher_one_class_one_student_updated_assignment);
    })
    
})