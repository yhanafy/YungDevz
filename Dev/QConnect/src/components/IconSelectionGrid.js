import React, { Component } from 'react'
import { ScrollView, FlatList, Image, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
// import colors from 'config/colors'

export default class IconSelectionGrid extends Component {
render() {
const {onImageSelected, images} = this.props;

    return (
        <ScrollView>
            <FlatList
                numColumns={3}
                data={images}
                keyExtractor={(item, index) => index} // fix, should be item.id (add id to classes)
                renderItem={({ item, index }) => (
                    <TouchableHighlight onPress={() => onImageSelected(index)}>
                        <Image
                            key={index}
                            borderRadius={30}
                            source={item}
                            style={styles.imageStyle}
                            resizeMode="contain"
                        />
                    </TouchableHighlight>
                )} >
            </FlatList>
        </ScrollView>
    );
}
}
IconSelectionGrid.propTypes = {
images: PropTypes.array.isRequired,
onImageSelected: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
imageStyle: {
height: 60,
width: 60,
marginLeft: 15,
marginTop: 15,
padding:15,
borderRadius: 30,
},
}
);