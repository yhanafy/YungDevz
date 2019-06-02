// ------- FlowLayout: Sorts items in a way similar to Android's FlowLayout ------
// items flowing through the row and then overflowing down to next columns ------
//--------------------------------------------------------------------------------
import React, {
	Component,
} from 'react';
import PropTypes from 'prop-types';

import {
	StyleSheet,
	PixelRatio,
	Text,
	View,
	TouchableOpacity,
	Platform,
	Dimensions,
} from 'react-native';
import colors from 'config/colors'

var {
	width,
	height
} = Dimensions.get('window');

class FlowView extends Component {

	static propTypes = {
		backgroundColors: PropTypes.array,
		textColors: PropTypes.array,
		text: PropTypes.string,
		isSelected: PropTypes.bool,
		onClick: PropTypes.func,
	}
	static defaultProps = {
		backgroundColors: [colors.lightGrey, colors.primaryLight],
		textColors: [colors.darkGrey, colors.primaryDark],
		isSelected: false,
	}
	constructor(props) {
		super(props);

		this.state = {
			isSelected: this.props.isSelected,
		};
	}

	setSelected(bool) {
		this.setState({
			isSelected: bool
		})
	}

	_backgoundColor() {
		if (this.state.isSelected) {
			return this.props.backgroundColors[1];
		} else {
			return this.props.backgroundColors[0];
		}
	}

	_textColor() {
		if (this.state.isSelected) {
			return this.props.textColors[1];
		} else {
			return this.props.textColors[0];
		}
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={() => {
					this.props.onClick();
					this.setState({ isSelected: !this.state.isSelected });
				}}>
					<View style={[styles.corner, { backgroundColor: this._backgoundColor() }]}>
						<Text style={[styles.text, { color: this._textColor() }]}>{this.props.text}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	};

}

export default class FlowLayout extends Component {
	static propTypes = {
		style: PropTypes.object,
		dataValue: PropTypes.array,
		title: PropTypes.string,
		multiselect: PropTypes.bool,
		onSelectionChanged: PropTypes.func.isRequired,
	}
	static defaultProps = {
		style: {},
		dataValue: [],
		multiselect: true,
		title: strings.ImprovementAreas
	}
	constructor(props) {
		super(props);

		this.state = {
			selectedState: new Array(this.props.dataValue.length).fill(false),
		};

	}
	change() {
		for (var i = 0; i < this.state.selectedState.length; i++) {
			let item = this.refs[this.props.dataValue[i]];
			if (item) {
				item.setSelected(this.state.selectedState[i]);
			}
		}

		this.props.onSelectionChanged(this.getSelectedPosition())
	}
	getSelectedPosition() {
		let list = [];
		this.state.selectedState.forEach((value, key) => {
			if (value) {
				list.push(this.props.dataValue[key]);
			}
		});
		return list;
	}
	resetData() {
		this.setState({
			selectedState: new Array(this.props.dataValue.length).fill(false),
		}, () => {
			this.change();
		})
	}

	render() {
		let items = this.props.dataValue.map((value, position) => {
			return (
				<View key={position}>
					<FlowView ref={this.props.dataValue[position]} text={value} onClick={() => {
						if (this.props.multiselect == false) {
							for (var i = this.state.selectedState.length - 1; i >= 0; i--) {
								if (i == position) {
									continue;
								}
								if (this.state.selectedState[i] == true) {
									this.state.selectedState[i] = false;
									break;
								}
							}
						}
						this.state.selectedState[position] = !this.state.selectedState[position];

						this.change();
					}} />
				</View>
			);
		});

		return (
			<View>
				<View style={[styles.container, this.props.style]}>
					{items}
				</View>
			</View>
		);
	};
}
const styles = StyleSheet.create({
	corner: {
		borderColor: colors.grey,
		borderWidth: 1 / PixelRatio.get(),
		borderRadius: 5,
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		marginRight: 10,
		marginTop: 10,
	},
	text: {
		fontSize: 16,
		textAlign: 'center',
	},
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		marginHorizontal: 15,
		width: width - 40,
	},

});