import { classReducer, INITIAL_STATE } from 'model/reducers/classReducer';

describe('teacher reducer', () => {

    //------ test consts --------
    const teacher_props = {
        name: "Teacher Name 1",
        phoneNumber: "123-456-789",
        emailAddress: "test@email.com",
        currentClassIndex: 0,
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
        assignment: "Test assignment",
        attendanceHistory: []
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
        }
    ;

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



    //------------ Initial state test ---------------------
    it('should return the initial state', () => {
        expect(classReducer(undefined, {})).toEqual(INITIAL_STATE)
    })

    //------------ AddClass test ---------------------
    it('should handle ADD_CLASS', () => {
        expect(
            classReducer(teacher_no_class, {
                type: "ADD_CLASS",
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
                type: "ADD_STUDENT",
                studentInfo: payload
            })
        ).toEqual(teacher_one_class_one_student);
    })

    //------------ DeleteStudent test ---------------------
    it('should handle DELETE_STUDENT', () => {
        expect(
            classReducer(teacher_one_class_one_student, {
                type: "DELETE_STUDENT",
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
                type: "ADD_ATTENDANCE",
                classIndex: classIndex,
                attendanceInfo: [attendanceInfo]
            })
        ).toEqual(teacher_one_class_one_student_with_attendance);
    })

})