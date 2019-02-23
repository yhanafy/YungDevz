import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput} from 'react-native';
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

    getAvatarUrl(){
        let photoNum = Math.floor(Math.random() * Math.floor(90));
        let url = "https://randomuser.me/api/portraits/thumb/men/" + photoNum + ".jpg";
        return url;
    }

    addNewStudent(classIndex){
        this.props.addStudent(
        {
            classIndex: classIndex,
            studentInfo: {
                name: this.state.newStudentName,
                avatar: this.getAvatarUrl(),
                assignment: "No assignment yet"
            }
        }
        );
        ToastAndroid.show(this.state.newStudentName + " is now added to the class", ToastAndroid.SHORT);
    }

    render() {  
        classIndex = this.props.navigation.state.params? this.props.navigation.state.params.classIndex : 0;
        //alert(JSON.stringify(this.props.classrooms))
        return (<ScrollView style={styles.container}>
      <View ID={classIndex} style={styles.inputContainer}>
        <TextInput
            placeholder="Enter new student's name"
            onChangeText={(newStudentName) => this.setState({newStudentName})}
            value={this.state.newStudentName}
        />
        <QcActionButton 
            text="Add student"
            onPress={() => this.addNewStudent(classIndex)}
        />
      </View>
      <View>
            {this.props.classrooms.classes[classIndex].students.map((student, i) => {
            return (
            <StudentCard
                key={i}
                studentName={student.name}
                profilePic={{uri: student.avatar}}
                background={colors.white}
                onPress={() => this.props.deleteStudent({
                    classIndex: classIndex,
                    studentIndex: i})}
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
    inputContainer: {
        flexDirection: 'column',
        backgroundColor: colors.white,
        padding: 10,
        flex: 1  
    },
    classTitle: {
        color: colors.primaryDark,
        fontSize: 25 
    }
});

const mapStateToProps = (state) => {
    const { classrooms } = state
    return { classrooms }
  };
  
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      deleteStudent,
      addStudent,
    }, dispatch)
  );
  
  export default connect(mapStateToProps, mapDispatchToProps)(ClassEditScreen);