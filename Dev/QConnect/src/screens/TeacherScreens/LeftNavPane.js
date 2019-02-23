import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import colors from 'config/colors'
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

class LeftNavPane extends React.Component {
    openClass = (i, className) => {
        this.props.navigation.push('CurrentClass',  { classIndex: i, classTitle: className})
        this.props.navigation.closeDrawer();
    }
    render() {
        return (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
   {this.props.classrooms.classes.map((classroom, i) => {
          return (
            <TouchableHighlight key={classroom.name} 
              style={{flex: 1, flexDirection: 'row', margin: 10}}
              onPress={() => this.openClass(i, classroom.name)}>
              <View>
            <Icon
          name="group"
          size={15}
          type="font-awesome"
          iconStyle={{ paddingLeft: 10 }}
        />
            <Text>{classroom.name}</Text>
            </View>
            </TouchableHighlight>
          )
        })}
        <TouchableHighlight key="AddClass" 
              style={{flex: 1, flexDirection: 'row', margin: 10}}
              onPress={() => this.props.navigation.push('AddClass')}>
              <View>
            <Icon
          name="group"
          size={15}
          type="font-awesome"
          iconStyle={{ paddingLeft: 10 }}
        />
            <Text>Add new class</Text>
            </View>
            </TouchableHighlight>
    </SafeAreaView>
  </ScrollView>
);
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
    const { classrooms } = state
    return { classrooms }
  };
  
  export default connect(mapStateToProps)(LeftNavPane);