import React, {Component} from 'react';
import { ScrollView, StyleSheet, View, FlatList, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StudentCard from 'components/StudentCard';
import QcActionButton from 'components/QcActionButton';
import { addAttendance } from 'model/actions/addAttendance';
import colors from 'config/colors';

//const { directions: { SWIPE_UP, SWIPE_LEFT, SWIPE_DOWN, SWIPE_RIGHT } } = swipeable;

export class ClassAttendanceScreen extends Component {

    state = {
        selectedStudents: [],
        selectedDate: new Date().toLocaleDateString("en-US")
    }

    //This method will set the student selected property to the opposite of whatever it was
    //by either removing the student or adding them to the array of selected students
    //based on if they are already in the array or not
    onStudentSelected = (id) => {
        let tmp = this.state.selectedStudents;
    
        if ( tmp.includes( id ) ) {
          tmp.splice( tmp.indexOf(id), 1 );
        } else {
          tmp.push( id );
        }
    
        this.setState({
          selectedStudents: tmp,
          selectedDate: this.state.selectedDate
        });

    }

    //fetches the current selected students and the current selected date and adds the current
    //attendance to the database
    saveAttendance = (classIndex) => {
        let selected = this.state.selectedStudents;
        let date = this.state.selectedDate;
        let studentList = this.props.classrooms.classes[classIndex].students;
        let attendanceInfo =[];
        for(let i = 0; i < studentList.length; i++) {
            //If the current state of selected students includes the current student being
            //iterated over, then the student will be marked as absent. If not, then the student
            //is present
            if(selected.includes(i)) {
                attendanceInfo.push({
                    date: date,
                    isHere: false
                });
            } else {
                attendanceInfo.push({
                    date: date,
                    isHere: true
                }) ;
            }
        }
        this.props.addAttendance(
            classIndex,
            attendanceInfo
        );
        ToastAndroid.show("Attendance for " + date + " has been saved", ToastAndroid.SHORT);
    }
    
    render() {

        const { params } = this.props.navigation.state;

        classIndex = params && params.classIndex? params.classIndex : 0;
    
        return (
        //The scroll view will have at the top a date picker which will be defaulted to the current
        //date and it will allow the user to view previous day's attendance along with setting
        //and changing them. The max possible date will be the current date.
        <ScrollView style={styles.container}>
            <View style={styles.saveAttendance}>
                <DatePicker
                    date={this.state.selectedDate}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    format="MM-DD-YYYY"
                    duration={300}
                    style={{paddingLeft: 15}}
                    maxDate={new Date().toLocaleDateString("en-US")}
                    customStyles={{dateInput: {borderColor: colors.lightGrey}}}
                    onDateChange={(date) => {
                        this.setState({
                            selectedStudents: [], 
                            selectedDate: date
                        })
                    }}
                    />
                <QcActionButton
                    text="Save Attendance"
                    onPress={() => this.saveAttendance(classIndex)}
                    style={{paddingRight: 30}}
                />
            </View>
            {this.props.classrooms.classes[classIndex].students.map((student, i) => {
                let color = this.state.selectedStudents.includes(i) ? colors.red : colors.green;
                return (
                    <StudentCard
                        key={i}
                        studentName={student.name}
                        profilePic={{uri: student.avatar}}
                        currentAssignment={student.assignment}
                        background={color}
                        onPress={() => this.onStudentSelected(i) }
                    />
                );
            })}
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
    const { classrooms } = state
    return { classrooms }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addAttendance
    }, dispatch)
);
  
export default connect(mapStateToProps, mapDispatchToProps)(ClassAttendanceScreen);