import React, {Component} from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import StudentCard from 'components/StudentCard';
import QcActionButton from 'components/QcActionButton';
import colors from 'config/colors';

//const { directions: { SWIPE_UP, SWIPE_LEFT, SWIPE_DOWN, SWIPE_RIGHT } } = swipeable;

class ClassAttendanceScreen extends Component {

    state = {
        selectedStudents: []
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
          selectedStudents: tmp
        });
    }

    saveAttendence = () => {

    }

    //   getStudentAvatar = () =>{
    //     let url = this.state.selectedStudents.includes(i)? student.avatar : "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-3/3/31-512.png"
    //     alert (url);
    //     return url;
    // }
    

    render() {
        return (
        //The scroll view will have at the top a date picker which will be defaulted to the current
        //date and it will allow the user to view previous day's attendence along with setting
        //and changing them. The max possible date will be the current date.
        <ScrollView style={styles.container}>
            <View style={styles.saveAttendence}>
                <DatePicker
                    date={this.state.date}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    format="MM-DD-YYYY"
                    duration={300}
                    style={{paddingLeft: 15}}
                    maxDate={new Date().toLocaleDateString("en-US")}
                    customStyles={{dateInput: {borderColor: colors.lightGrey}}}
                    onDateChange={(date) => {this.setState({date: date})}}/>
                <QcActionButton
                    text="Save Attendence"
                    onPress={() => this.saveAttendence()}
                    style={{paddingRight: 30}}
                />
            </View>
            {this.props.classrooms.classes[0].students.map((student, i) => {
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
    saveAttendence: {
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
  
export default connect(mapStateToProps)(ClassAttendanceScreen);