import React from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';
import AutoComplete from 'components/AutoComplete'

export default class AssignmentEntryComponent extends React.Component{
    render(){
        return(
            <View>
                <AutoComplete/>
            </View>
        )
    }
}