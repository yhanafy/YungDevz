import React, {Component} from 'react'
import {Text, View} from 'react-native'
import { Rating, AirbnbRating } from 'react-native-elements';
import classImages from 'config/classImages';

class EvaluationPage extends Component {

    render(){
        return(
        
        <View>
<Text>Header</Text>

<Rating
  showRating
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/>
<Rating
  showRating
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 40 }}
/>
    </View>
        
     ) }

}
export default EvaluationPage
