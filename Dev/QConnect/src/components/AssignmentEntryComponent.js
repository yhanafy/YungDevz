// import React, { Component } from 'react';
// import { AutoComplete } from 'react-native-autocomplete-input';
// import { ScrollView, Text, TouchableOpacity, TextInput, View } from 'react-native';

// export default class AssignmentEntryComponent extends Component {
//     state = {
//         surahs: ["Al-Fatihah", "Al-Baqarah", "Aal-Imran"],
//         data = this.surahs,
//         input = ""
//     }

//     addToState(word){
//         this.state.input = word;
//     }


//     render() {
//         const {query} = this.state.surahs;
//         const data = query;
//         return (
//             <Autocomplete
//             data={this.state.data}
//             defaultValue={query}
//             onChangeText={text => this.setState({ query: text })}
//             renderItem={({ item, i }) => (
//               <TouchableOpacity onPress={() => this.setState({ query: item })}>
//                 <Text>{item}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         );
//     }
// }
