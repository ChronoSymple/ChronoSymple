
import React from 'react'
import { View,
	List,
	Text,
	Button,
	Dimensions,
	ListItem,
	StyleSheet,
	TouchableHighlight,
	TextInput,
	FlatList,
	ScrollView,
	TouchableOpacity,
	Image} from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableRipple } from 'react-native-paper';
import { APIGetPatientModules } from '../API/APIModule';
import { connect } from 'react-redux';


class ChooseModulesToSend extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			data: []
		}

	}

	componentWillMount () {
		APIGetPatientModules(this.props.token).then(async data => {
			console.log("ChooseModulesToSend=>");
			console.log(data)
			let response = await data.json()
			console.log("-----")
			console.log(response.modules)
			console.log("-----")
			
			this.setState({
				data: response.modules,
			})
		})
	}


	render() {
		let { navigate } = this.props.navigation;
		let deviceWidth = Dimensions.get('window').width
		var moduleLists = [];
		const dataToRender = this.state.data
		const numRows = dataToRender.length
		for (let i = 0; i < numRows; i++) {
			moduleLists.push(
				<View key = {i}>
					<TouchableOpacity
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
							borderWidth: 3,
							borderColor: 'black',
							borderRadius: 10,
							backgroundColor : this.state.data[i].color,
							padding: 30,
							marginBottom: 30,
						}}
						onPress={() => navigate('Export')}>
						<Text style={{fontSize: 20}} >{this.state.data[i].name}</Text>
					</TouchableOpacity>
				</View>
			)
		}
		return (
			<View style={styles.main_container}>
				{moduleLists}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		margin: 10,
		justifyContent: 'center'
	},
	search: { 
		flex: 1,
		flexDirection: 'row',
		height: 50,
		borderColor: '#000000',
		borderWidth: 0.5,
		paddingLeft: 5
	},
	module: {
		flex: 1,
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		borderRadius: 0.5,
		padding: 30
	},
	moduleText: {
		fontSize: 20
	}
})

const mapStateToProps = (state) => {
	return {
	  token: state.token
	}
      }
      
export default connect(mapStateToProps)(ChooseModulesToSend)