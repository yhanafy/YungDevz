import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-elements';
import colors from 'config/colors';

class EvaluationPage extends Component {
  
  state = {
    tajweed: {
    edgham: 0,
    madd: 0
    //... (todo: add others like this)
    },
    memorization: 0, //memorization rating (0 to 3)
    notes: ""
    };

    render(){
        return(
        <View>
      <Text>Header</Text>

      <View
        style={{
          alignContent: "center",
          
          justifyContent: "center",
        }}>
        <Rating
          showRating
          onFinishRating={this.ratingCompleted}
          style={{
            paddingVertical: 10,
            backgroundColor: colors.lightGrey,
            
          }}
        />
      </View>

    )
  }

}
export default EvaluationPage
