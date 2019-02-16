import React from 'react';
import {View, Image} from 'react-native';

class ClassEditScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Image style={ {width: 200, height: 200, backgroundColor: "blue"} } source= {{uri: 'https://www.whyislam.org/wp-content/uploads/2017/10/Glorious-Quran-.jpg'}}></Image></View>
        );
    }
}

export default ClassEditScreen;