import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, TextInput} from 'react-native';
import { connect } from 'react-redux';
import StudentCard from 'components/StudentCard'
import colors from 'config/colors'
import { bindActionCreators } from 'redux';
import { deleteStudent } from 'model/actions/deleteStudent';
import { addStudent } from 'model/actions/addStudent';
import QcActionButton from 'components/QcActionButton'
import {ToastAndroid} from 'react-native';
class ClassEditScreen extends Component {

    state = {
        newStudentName: "",
    }

    addNewStudent(){
        this.props.addStudent({
            name: this.state.newStudentName,
            avatar: "https://randomuser.me/api/portraits/thumb/men/77.jpg",
            assignment: "No assignment yet"
        });
        ToastAndroid.show(this.state.newStudentName + " is now added to the class", ToastAndroid.SHORT);
    }

    render() {    
        return (<ScrollView style={styles.container}>
        <TextInput
            placeholder="Enter new student's name"
            onChangeText={(newStudentName) => this.setState({newStudentName})}
            value={this.state.newStudentName}
        />
        <QcActionButton 
            text="Add student"
            onPress={() => this.addNewStudent()}
        />

      <View>
            {this.props.classroom.students.map((student, i) => {
            return (
            <StudentCard
                key={i}
                studentName={student.name}
                profilePic={student.avatar}
                currentAssignment={student.assignment}
                onPress={() => this.props.deleteStudent(i)}
            />
            );
            })}
        </View>
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
    classTitle: {
        color: colors.primaryDark,
        fontSize: 25 
    }
});

const mapStateToProps = (state) => {
    const { classroom } = state
    return { classroom }
  };
  
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      deleteStudent,
      addStudent,
    }, dispatch)
  );
  
  export default connect(mapStateToProps, mapDispatchToProps)(ClassEditScreen);