import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from "react-native";
import colors from "config/colors";
import classImages from "config/classImages";
import QcActionButton from "components/QcActionButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addClass } from "model/actions/addClass";

export class AddClassScreen extends Component {
  state = {
    className: "",
    classImageId: Math.floor(Math.random() * 10),
    modalVisible: false,
  };

  /*This method will toggle the 
   *On the modal visablity.
  */

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  addNewClass() {
    if (this.state.className) {
      let classInfo = {
        name: this.state.className,
        imageId: this.state.classImageId,
        students: []
      };

      this.props.addClass(classInfo);
    } else {
      alert("Please make sure to have an input!")
    }
  }

  render() {
    return (

      <View
        ID="addNewClass"
        style={{
          alignItems: "center"
        }}
      >
        
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>



              
              <QcActionButton
              text="Close Image Menu"
              style = {{
                justifyContent: "center",
                paddingVertical: 10,
                
              }}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}/>
              
      
        </Modal >



      <TouchableHighlight
        onPress={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}>
        <Image
          source={(classImages.images[this.state.classImageId])}
          style={{
            backgroundColor: colors.lightGrey,
            borderRadius: 50 / 2,
            marginTop: 100,
            marginBottom: 30,
            width: 150,
            height: 150,
            alignItems: "center",
            justifyContent: "center"
          }}
        />
      </TouchableHighlight>


      <TouchableHighlight
        onPress={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}>
        <Text>Edit Class Image</Text>
      </TouchableHighlight>


      <TextInput
        style={{
          backgroundColor: colors.lightGrey,
          borderColor: colors.darkGrey,
          width: 250,
          height: 30,
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
        placeholder="Write Class Name Here"
        onChangeText={classInput =>
          this.setState({
            className: classInput
          })
        }
      />

      <Text style={{
        fontSize: 15,
        marginTop: 5
      }}>Your Class name is {this.state.className}</Text>

      <QcActionButton
        text="Add Class"
        onPress={() => {
          this.addNewClass();
        }}
      />


      </View >
    );
  }
}

const mapStateToProps = state => {
  const { classes } = state.data.teachers[0];
  return { classes };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addClass
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClassScreen);