import { classReducer, INITIAL_STATE } from 'model/reducers/classReducer';

describe('teacher reducer', () => {


    //------------ Initial state test ---------------------
    it('should return the initial state', () => {
        expect(classReducer(undefined, {})).toEqual(INITIAL_STATE)
    })

    //------------ AddClass test ---------------------
    it('should handle ADD_CLASS', () => {
        const initial_state = {
            teachers: [
                {
                    name: "Teacher Name 1",
                    phoneNumber: "123-456-789",
                    emailAddress: "test@email.com",
                    currentClassIndex: 0,
                    classes: []
                }]
        };

        const classInfo = {
            name: "test class",
            imageId: 1,
            students: []
        };

        expect(
            classReducer(initial_state, {
                type: "ADD_CLASS",
                classInfo
            })
        ).toEqual({
            teachers: [
                {
                    name: "Teacher Name 1",
                    phoneNumber: "123-456-789",
                    emailAddress: "test@email.com",
                    currentClassIndex: 0,
                    classes: [
                        {
                            name: "test class",
                            imageId: 1,
                            students: []
                        }
                    ]
                }
            ]
        });
    })

    //------------ AddStudent test ---------------------
    it('should handle ADD_STUDENT', () => {
        const initial_state = {
            teachers: [
                {
                    name: "Teacher Name 1",
                    phoneNumber: "123-456-789",
                    emailAddress: "test@email.com",
                    currentClassIndex: 0,
                    classes: [{
                        name: "test class",
                        imageId: 1,
                        students: []
                    }
                    ]
                }]
        };

        const studentInfo = {
            classIndex: 0,
            studentInfo: {
                name: "Test Student 1",
                avatar: "http://test.avatar.url",
                assignment: "Test assignment",
                attendanceHistory: []
            }
        };

        expect(
            classReducer(initial_state, {
                type: "ADD_STUDENT",
                studentInfo
            })
        ).toEqual({
            teachers: [
                {
                    name: "Teacher Name 1",
                    phoneNumber: "123-456-789",
                    emailAddress: "test@email.com",
                    currentClassIndex: 0,
                    classes: [
                        {
                            name: "test class",
                            imageId: 1,
                            students: [
                                {
                                    name: "Test Student 1",
                                    avatar: "http://test.avatar.url",
                                    assignment: "Test assignment",
                                    attendanceHistory: []
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    })

})