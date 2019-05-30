import React from 'react';
import {View} from 'react-native';
import {ClassMainScreen} from '../src/screens/TeacherScreens/ClassTabs/ClassMainScreen';
import renderer from 'react-test-renderer';
import {ClassEditScreen} from '../src/screens/TeacherScreens/ClassTabs/ClassEditScreen';
import {ClassAttendanceScreen} from '../src/screens/TeacherScreens/ClassTabs/ClassAttendanceScreen';
import {AddClassScreen} from '../src/screens/TeacherScreens/AddClass/AddClassScreen';
import {TeacherProfileScreen} from '../src/screens/TeacherScreens/TeacherProfile/TeacherProfileScreen.js'
import { TeacherWelcomeScreen } from '../src/screens/FirstRun/TeacherWelcomeScreen';
import { EvaluationPage } from '../src/screens/Evaluation/EvaluationPage';
import FadeInView from '../src/components/FadeInView'

const INITIAL_STATE = {
  firstRunCompleted: false,
  teachers: [
    {
      name: "",
      phoneNumber: "",
      emailAddress: "",
      currentClassIndex: 0,
      profileImageId: 1,
      classes: [
        {
          name: "Demo Class",
          imageId: 1,
          students: [
            {
              name: "Ahmed Reducer",
              imageId: 5,
              totalAssignments: 1,
              totalGrade: 2,
              currentAssignment: {
                name: "Al-Nahl page 5",
                startDate: "03-24-2019"
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 2,
                    notes: ""
                  }
                }
              ],
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }, {
                  date: '03-25-2019',
                  isHere: false
                }
              ]
            },
            {
              name: "Amina Khan",
              imageId: 25,
              totalAssignments: 1,
              totalGrade: 4,
              currentAssignment: {
                name: "An-Naze'aat",
                startDate: "03-24-2019"
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 4,
                    notes: ""
                  }
                }
              ],
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Ayoub Barrak",

              imageId: 19,
              totalAssignments: 1,
              totalGrade: 1,
              currentAssignment: {
                name: "Aal-Imran",
                startDate: "03-24-2019"
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 1,
                    notes: ""
                  }
                }
              ],
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Nouha Yacoubi",
              imageId: 21,
              totalAssignments: 1,
              totalGrade: 5,
              currentAssignment: {
                name: "Al-Toor pages 5, 6, 8",
                startDate: "03-24-2019"
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 5,
                    notes: ""
                  }
                }
              ],
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Yassine Lightening",
              imageId: 15,
              totalAssignments: 1,
              totalGrade: 2,
              currentAssignment: {
                name: "Al-Baqara pages 5-8",
                startDate: "03-24-2019"
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 2,
                    notes: ""
                  }
                }
              ],
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Ayah Sulaiman",
              imageId: 27,
              totalAssignments: 2,
              totalGrade: 8,
              currentAssignment: {
                name: "None",
                startDate: ""
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-22-2019",
                  evaluation: {
                    overallGrade: 3,
                    notes: ""
                  }
                },
                {
                  name: "Al-Baqara 9-15",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 5,
                    notes: ""
                  }
                }
              ],
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
}

describe('Teacher screens snapshots', () => {
  const testRenderTeacherScreen = (screenName, Component, props) => {
    global.requestAnimationFrame = null

    test(`render ${screenName}`, () => {
        const navigation = {
          state: {
            params: {
              classIndex: 0
            }
          }
        }

        const {teachers} = INITIAL_STATE;
        const teacher = teachers[0];
        const students = teacher.classes[0].students

        
        
        jest.mock("../src/components/FadeInView", () => {
          const {View} = require('react-native');
          return(
          <View></View>
          )
        }
        );

        jest.useFakeTimers();

        const tree = renderer.create(<Component 
          classes = {teacher.classes}
          navigation = {navigation}
          students = {students}
          {...props} 
        />).toJSON();

        expect(tree).toMatchSnapshot();
    })
  }

  testRenderTeacherScreen("ClassMainScreen", ClassMainScreen)
  testRenderTeacherScreen("ClassEditScreen", ClassEditScreen)
  testRenderTeacherScreen("ClassAttendanceScreen", ClassAttendanceScreen, {defaultDate: new Date(1552719600000)})
  testRenderTeacherScreen("AddClassScreen", AddClassScreen)
  testRenderTeacherScreen("TeacherProfileScreen", TeacherProfileScreen, {name: "TestName", phoneNumber: "TestNumber", emailAddress: "TestEmail", profileImageId: 1})
  testRenderTeacherScreen("TeacherWelcomeScreen", TeacherWelcomeScreen, {name: "TestName", phoneNumber: "TestNumber", emailAddress: "TestEmail", profileImageId: 1})
  testRenderTeacherScreen("TeacherWelcomeScreen", EvaluationPage, {name: "TestName", imageId:  6, currentAssignment: {name: "test assignment"}})
})