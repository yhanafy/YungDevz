import React from "react";
import { View, FlatList, ScrollView, StyleSheet } from "react-native";
import colors from "config/colors";
import classImages from "config/classImages";
import { connect } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { ListItem } from "react-native-elements";
import QcAppBanner from "components/QcAppBanner";
import QcDrawerItem from 'components/QcDrawerItem';

class LeftNavPane extends React.Component {
  openClass = (i, className) => {
    this.props.navigation.push("CurrentClass", {
      classIndex: i,
      classTitle: className
    });
    this.props.navigation.closeDrawer();
  };

  //todo: change the ListItem footer below to the shared drawer component intead
  // generalize the QcDrawerItem to accept either an image or an icon
  render() {
    return (

      <ScrollView style={{ flex: 1, backgroundColor: colors.lightGrey }}>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: "always", horizontal: "never" }}
        >
          <View
            style={{
              padding: 10,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <QcAppBanner />
          </View>
          <QcDrawerItem
              title="Mrs. Eslam"
              image= {require('assets/images/class-icons/6.png')}
              onPress={() => this.props.navigation.push("TeacherProfile")} />
              
          <FlatList
            data={this.props.classrooms.classes}
            keyExtractor={(item, index) => item.name} // fix, should be item.id (add id to classes)
            renderItem={({ item, index }) => (
              <QcDrawerItem
              title={item.name}
              image= {classImages.images[item.imageId]}
              onPress={() => this.openClass(index, item.name)} />
            )}
          />

           <ListItem
            backgroundColor={colors.white}
            title="Add a new class"
            containerStyle={{ margin: 5, marginTop: 0, borderBottomWidth: 1, borderBottomColor: colors.lightGrey }}
            leftAvatar={{
              rounded: true,
              icon: {
                name: 'plus',
                type: 'font-awesome',
                color: colors.primaryDark,
              },
              overlayContainerStyle: {
                backgroundColor: colors.primaryLight,
              }
            }}
            onPress={() => this.props.navigation.push("AddClass")}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = state => {
  const { classrooms } = state;
  return { classrooms };
};

export default connect(mapStateToProps)(LeftNavPane);
