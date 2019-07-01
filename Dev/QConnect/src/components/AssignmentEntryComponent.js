import React, { Component } from 'react';
import {AutoComplete} from 'react-native-autocomplete-input';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

export default class AssignmentEntryComponent extends Component {
    state = {
        surahs: ["Al-Fatihah", "Al-Baqarah", "Aal-Imran"],
        query: "Al-Fatihah"
    }
    render() {
        return (
            <ScrollView >
                <Text>Hello</Text>
                <AutoComplete
                    data={this.state.surahs}
                    defaultValue={this.state.query}
                    onChangeText={text => this.setState({ query: text })}
                    renderItem={({ item, i }) => (
                        <TouchableOpacity onPress={() => this.setState({ query: item })}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )} />
            </ScrollView>
        );
    }
}
