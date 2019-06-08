import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StudentCard from 'components/StudentCard';
import QcActionButton from 'components/QcActionButton';
import { addAttendance } from 'model/actions/addAttendance';
import colors from 'config/colors';
import studentImages from 'config/studentImages'
import strings from 'config/strings';
import mapStateToCurrentClassProps from 'screens/TeacherScreens/helpers/mapStateToCurrentClassProps'
import QcParentScreen from 'screens/QcParentScreen';

export class ClassAttendanceScreen extends QcParentScreen {
    name = "ClassAttendanceScreen";

    todaysDate = this.props.defaultDate ? this.props.defaultDate : new Date().toLocaleDateString("en-US")
    state = {
        absentStudents: [],
        selectedDate: this.todaysDate
    }

    //This method will set the student selected property to the opposite of whatever it was
    //by either removing the student or adding them to the array of selected students
    //based on if they are already in the array or not
    onStudentSelected = (id) => {
        let tmp = this.state.absentStudents;

        if (tmp.includes(id)) {
            tmp.splice(tmp.indexOf(id), 1);
        } else {
            tmp.push(id);
        }

        this.setState({
            absentStudents: tmp,
            selectedDate: this.state.selectedDate
        });

    }

    //fetches the current selected students and the current selected date and adds the current
    //attendance to the database
    saveAttendance = () => {
        let absent = this.state.absentStudents;
        let date = this.state.selectedDate;
        let attendanceInfo = {};

        this.props.students.map((student, index) => {
            attendanceInfo = {
                ...attendanceInfo,
                [student.id]: !absent.includes(index)
            }
        });

        this.props.addAttendance(
            this.props.classId,
            date,
            attendanceInfo,
        );

        this.refs.toast.show(strings.AttendanceFor + date + strings.HasBeenSaved, DURATION.LENGTH_SHORT);
    }

    //This method will set the state of the attendance screen based on the isHere property
    //from each student's attendance history based on the corresponding date
    getAttendance = (date) => {
        const { students, classId, attendance } = this.props;

        let absent = [];
        //Capture absent students to flag them in the UI.
        if (attendance.byDate[date]) {
            students.map((student, i) => {
                let wasHere = attendance.byDate[date][student.id];

                if (!wasHere) {
                    absent.push(i);
                }
            })
        }

        this.setState({
            absentStudents: absent,
            selectedDate: date
        })
    }

    render() {

        const { classId } = this.props;

        return (
            //The scroll view will have at the top a date picker which will be defaulted to the current
            //date and it will allow the user to view previous day's attendance along with setting
            //and changing them. The max possible date will be the current date.
            <ScrollView style={styles.container}>
                <View style={styles.saveAttendance}>
                    <DatePicker
                        date={this.state.selectedDate}
                        confirmBtnText={strings.Confirm}
                        cancelBtnText={strings.Cancel}
                        format="MM-DD-YYYY"
                        duration={300}
                        style={{ paddingLeft: 15 }}
                        maxDate={this.todaysDate}
                        customStyles={{ dateInput: { borderColor: colors.lightGrey } }}
                        onDateChange={(date) => this.getAttendance(date)}
                    />
                    <QcActionButton
                        text={strings.SaveAttendance}
                        onPress={() => this.saveAttendance()}
                        style={{ paddingRight: 30 }}
                        screen={this.name}
                    />
                </View>
                {this.props.students.map((student, i) => {
                    let color = this.state.absentStudents.includes(i) ? colors.red : colors.green;
                    return (
                        <StudentCard
                            key={i}
                            studentName={student.name}
                            profilePic={studentImages.images[student.imageId]}
                            currentAssignment={this.props.currentAssignments.byStudentId[student.id][0].name}
                            background={color}
                            onPress={() => this.onStudentSelected(i)}
                        />
                    );
                })}
                <Toast ref="toast" />
            </ScrollView>);
    }
}

//Styles for the entire container along with the top banner
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightGrey,
        flex: 1
    },
    saveAttendance: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lightGrey,
        flex: 1
    }
});

const mapStateToProps = (state) => {
    let props = mapStateToCurrentClassProps(state)
    let attendance = state.data.attendance.byClassId[props.classId];
    return { ...props, attendance }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addAttendance
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ClassAttendanceScreen);