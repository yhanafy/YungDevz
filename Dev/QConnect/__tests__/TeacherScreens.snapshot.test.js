import React from 'react';
import { ClassMainScreen } from '../src/screens/TeacherScreens/ClassTabs/ClassMainScreen';
import renderer from 'react-test-renderer';
import { ClassEditScreen } from '../src/screens/TeacherScreens/ClassTabs/ClassEditScreen';
import { ClassAttendanceScreen } from '../src/screens/TeacherScreens/ClassTabs/ClassAttendanceScreen';
import { AddClassScreen } from '../src/screens/TeacherScreens/AddClass/AddClassScreen';
import { TeacherProfileScreen } from '../src/screens/TeacherScreens/TeacherProfile/TeacherProfileScreen.js'
jest.mock('../src/components/FadeInView')
import { TeacherWelcomeScreen } from '../src/screens/FirstRun/TeacherWelcomeScreen';
import { EvaluationPage } from '../src/screens/Evaluation/EvaluationPage';

const getClassStudents = (studentIds, students) => {
  return Object.values(students).filter(s => studentIds.includes(s.id))
}

const INITIAL_STATE = {
    firstRunCompleted: true,
    teacher: {
      id: '',
      name: '',
      phoneNumber: '',
      emailAddress: '',
      currentClassId: 'iTwcObaU9ZjnSN6SSiB_N',
      profileImageId: 1,
      classes: [
        'iTwcObaU9ZjnSN6SSiB_N',
        'LGG0TwfH1KuTabwao9jcj'
      ]
    },
    classes: {
      iTwcObaU9ZjnSN6SSiB_N: {
        id: 'iTwcObaU9ZjnSN6SSiB_N',
        name: 'Class 1',
        imageId: 1,
        students: [
          'Kvu_cRpBXG5nxUW6mHCNL',
          'RPVYO2TFj7Zthc13_V_xg',
          'U1WNVEvgZ6vmv_DrO6sQ9',
          'wN1FhsRhvCOJP3Hs_K1Pq'
        ]
      },
      LGG0TwfH1KuTabwao9jcj: {
        id: 'LGG0TwfH1KuTabwao9jcj',
        name: 'Class 2',
        imageId: 2,
        students: [
          '-DTfTpCH5pZVFcN01Kiro',
          'EX7yXPzvEpJbLvCkm2JRN',
          'TL8GSSCvahYa4HMDUsx6Q',
          'BcoFOO-5INvrIXrE4Y44j'
        ]
      }
    },
    students: {
      Kvu_cRpBXG5nxUW6mHCNL: {
        id: 'Kvu_cRpBXG5nxUW6mHCNL',
        name: 'CS1 ',
        imageId: 1
      },
      RPVYO2TFj7Zthc13_V_xg: {
        id: 'RPVYO2TFj7Zthc13_V_xg',
        name: 'CS2 ',
        imageId: 3
      },
      U1WNVEvgZ6vmv_DrO6sQ9: {
        id: 'U1WNVEvgZ6vmv_DrO6sQ9',
        name: 'CS3',
        imageId: 4
      },
      wN1FhsRhvCOJP3Hs_K1Pq: {
        id: 'wN1FhsRhvCOJP3Hs_K1Pq',
        name: 'CS4',
        imageId: 7
      },
      '-DTfTpCH5pZVFcN01Kiro': {
        id: '-DTfTpCH5pZVFcN01Kiro',
        name: '2S1',
        imageId: 6
      },
      EX7yXPzvEpJbLvCkm2JRN: {
        id: 'EX7yXPzvEpJbLvCkm2JRN',
        name: '2S2',
        imageId: 0
      },
      TL8GSSCvahYa4HMDUsx6Q: {
        id: 'TL8GSSCvahYa4HMDUsx6Q',
        name: '2S3',
        imageId: 26
      },
      'BcoFOO-5INvrIXrE4Y44j': {
        id: 'BcoFOO-5INvrIXrE4Y44j',
        name: '2S4',
        imageId: 3
      }
    },
    attendance: {
      byClassId: {
        iTwcObaU9ZjnSN6SSiB_N: {
          byDate: {
            '6/13/2019': {
              Kvu_cRpBXG5nxUW6mHCNL: false,
              RPVYO2TFj7Zthc13_V_xg: false,
              U1WNVEvgZ6vmv_DrO6sQ9: true,
              wN1FhsRhvCOJP3Hs_K1Pq: true
            },
            '05-13-2019': {
              Kvu_cRpBXG5nxUW6mHCNL: true,
              RPVYO2TFj7Zthc13_V_xg: true,
              U1WNVEvgZ6vmv_DrO6sQ9: false,
              wN1FhsRhvCOJP3Hs_K1Pq: true
            }
          }
        }
      }
    },
    currentAssignments: {
      byClassId: {
        iTwcObaU9ZjnSN6SSiB_N: {
          byStudentId: {
            Kvu_cRpBXG5nxUW6mHCNL: [
              {
                name: 'Test 1',
                startDate: '6/13/2019',
                totalAssignments: 0,
                grade: 0
              }
            ],
            RPVYO2TFj7Zthc13_V_xg: [
              {
                name: 'Test 3',
                startDate: '6/13/2019',
                totalAssignments: 2,
                grade: 4.5
              }
            ],
            U1WNVEvgZ6vmv_DrO6sQ9: [
              {
                name: 'None',
                startDate: '',
                totalAssignments: 0,
                grade: 0
              }
            ],
            wN1FhsRhvCOJP3Hs_K1Pq: [
              {
                name: 'Test CS4',
                startDate: '6/13/2019',
                totalAssignments: 1,
                grade: 4
              }
            ]
          }
        },
        LGG0TwfH1KuTabwao9jcj: {
          byStudentId: {
            '-DTfTpCH5pZVFcN01Kiro': [
              {
                name: 'None',
                startDate: '',
                totalAssignments: 0,
                grade: 0
              }
            ],
            EX7yXPzvEpJbLvCkm2JRN: [
              {
                name: '2S2as2',
                startDate: '6/13/2019',
                totalAssignments: 2,
                grade: 4.5
              }
            ],
            TL8GSSCvahYa4HMDUsx6Q: [
              {
                name: 'None',
                startDate: '',
                totalAssignments: 0,
                grade: 0
              }
            ],
            'BcoFOO-5INvrIXrE4Y44j': [
              {
                name: '2S4 assignment 1',
                startDate: '6/13/2019',
                totalAssignments: 0,
                grade: 0
              }
            ]
          }
        }
      }
    },
    assignmentsHistory: {
      byStudentId: {
        RPVYO2TFj7Zthc13_V_xg: {
          byClassId: {
            iTwcObaU9ZjnSN6SSiB_N: [
              {
                name: 'Test 1',
                startDate: '6/13/2019',
                completionDate: '6/13/2019',
                evaluation: {
                  grade: 4,
                  notes: 'Test test test',
                  improvementAreas: [
                    'Makharej',
                    'Ekhfae',
                    'Qalqalah'
                  ]
                }
              },
              {
                name: 'Test 2',
                startDate: '6/13/2019',
                completionDate: '6/13/2019',
                evaluation: {
                  grade: 5,
                  notes: 'Mundo',
                  improvementAreas: [
                    'Rulings of Raa\''
                  ]
                }
              }
            ]
          }
        },
        wN1FhsRhvCOJP3Hs_K1Pq: {
          byClassId: {
            iTwcObaU9ZjnSN6SSiB_N: [
              {
                name: 'Test CS4',
                startDate: '6/13/2019',
                completionDate: '6/13/2019',
                evaluation: {
                  grade: 4,
                  notes: 'Hola',
                  improvementAreas: []
                }
              }
            ]
          }
        },
        EX7yXPzvEpJbLvCkm2JRN: {
          byClassId: {
            LGG0TwfH1KuTabwao9jcj: [
              {
                name: '2S2as1',
                startDate: '6/13/2019',
                completionDate: '6/13/2019',
                evaluation: {
                  grade: 4,
                  notes: 'Test',
                  improvementAreas: []
                }
              },
              {
                name: '2S2as2',
                startDate: '6/13/2019',
                completionDate: '6/13/2019',
                evaluation: {
                  grade: 5,
                  notes: 'Test test test',
                  improvementAreas: []
                }
              }
            ]
          }
        }
      }
    }
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

      const { teacher, students, classes, currentAssignments } = INITIAL_STATE;
      let classId = teacher.currentClassId;
      const classStudents = getClassStudents(classes[classId].students, students);
      const classAssignments = currentAssignments.byClassId[classId];

      const tree = renderer.create(<Component
        classes={teacher.classes}
        navigation={navigation}
        students={classStudents}
        currentAssignments={classAssignments}
        {...props}
      />).toJSON();

      expect(tree).toMatchSnapshot();
    })
  }

  testRenderTeacherScreen("ClassMainScreen", ClassMainScreen)
  testRenderTeacherScreen("ClassEditScreen", ClassEditScreen)
  testRenderTeacherScreen("ClassAttendanceScreen", ClassAttendanceScreen, { defaultDate: new Date(1552719600000) })
  testRenderTeacherScreen("AddClassScreen", AddClassScreen)
  testRenderTeacherScreen("TeacherProfileScreen", TeacherProfileScreen, { name: "TestName", phoneNumber: "TestNumber", emailAddress: "TestEmail", profileImageId: 1 })
  testRenderTeacherScreen("TeacherWelcomeScreen", TeacherWelcomeScreen, { name: "TestName", phoneNumber: "TestNumber", emailAddress: "TestEmail", profileImageId: 1 })
  testRenderTeacherScreen("TeacherWelcomeScreen", EvaluationPage, { name: "TestName", imageId: 6, currentAssignment: { name: "test assignment" } })
})