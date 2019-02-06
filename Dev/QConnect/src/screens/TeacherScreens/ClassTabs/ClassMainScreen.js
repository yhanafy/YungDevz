import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements'

class ClassMainScreen extends React.Component {
    state = {
        students: []
    };

    componentDidMount() {
        const students = require('model/class.json').students.map(s => ({
                ...s
        }));
        this.setState( {students} );
    }

    render() {        
        return (
            <View>
                {this.state.students.map((u, i) => {
              return (
                <ListItem
                    key={i}
                    roundAvatar
                    title={u.name}
                    leftAvatar={{ rounded: true, source: { uri: u.avatar } }}
                    subtitle={u.assignment}
                    />
              );
            })}
            </View>);
    }
}

export default ClassMainScreen;
