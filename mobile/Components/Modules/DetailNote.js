import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image, BackHandler, FlatList} from 'react-native'
import { styles, colors, windowSize } from '../StyleSheet'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon_Ant from 'react-native-vector-icons/AntDesign';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';

class DetailNote extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			noteSheme : []
		}
		console.log("oui")
	}

	checkFieldType = ({item}) => {
		console.log("item", item)
		var key = Object.keys(item)[0];
		var val = Object.values(item)[0];
		console.log(key)
		console.log(val)

		return (
			<View style={{flex:0.5}}>
				<Text style={{flex:4, fontSize: 22}}>
					{val}
				</Text>
				<View style={{flex:0.5}}></View>
				<Text style={{width: windowSize.x / 1.5, flex: 4 }}>
				{key}
				</Text>
				<View style={{flex:0.5}}></View> 
			</View>
		)
	};

	render() {
		return (
			<View>
				<FlatList
					data={this.state.noteSheme}
					keyExtractor={(item, index) => index.toString()}
					renderItem={this.checkFieldType}
				/>
			</View>
		)
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

		let item2 = this.props.navigation.getParam('data')
		let item = item2.data;
		let tmp = this.state.noteSheme
		if (item != null) {
			for (var val in item) {
				tmp.push({[val]: item[val]})
			}
		}
		this.setState({
			noteSheme : tmp
		})
		console.log(this.state.noteSheme)
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		this.props.navigation.navigate('Calendar')
		return true;
	}
}

const styles2 = StyleSheet.create({
	main_container: {
		flex: 1, 
		justifyContent: "center", 
		alignItems: "center",
		width: windowSize.x
	},
	moduleText: {
		fontSize: 17,
		width: windowSize.x / 1.2
	}
})

export default DetailNote;