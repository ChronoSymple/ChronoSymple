
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
import { APIGetDoctors, APIAddDoctor } from '../../API/APIDoctor';
import { connect } from 'react-redux';

class DoctorChoice extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			data: []
		}

	}

	componentWillMount () {
		APIGetDoctors(this.props.token).then(async data => {
			console.log("DoctorChoice - APIGetDoctors - data")
			console.log(data)
			let response = await data.json()
			console.log("DoctorChoice - APIGetDoctors response: ")
			console.log(response)
			this.setState({
				data: response,
			})
		})
	}

	_addDoctor = (item) => {
		console.log("clicked on add doctor ! in Doctor choice page")
		APIAddDoctor(this.props.token, item.id).then(async data => {
			console.log("DoctorChoice - APIAddDoctor - data")
			console.log(data)
			let response = await data.json()
			console.log("DoctorChoice - APIAddDoctor response: ")
			console.log(response)
			this.setState({
				data: response,
			})
		})
	}

	render() {
		let { navigate } = this.props.navigation;
		let deviceWidth = Dimensions.get('window').width
		const { data } = this.state;
		return (
			<View>
				<FlatList
  					data={data}
  					keyExtractor={(item) => item.id.toString()}
  					renderItem={({item, separators}) => (
    					<TouchableHighlight
    						key={item.id}
							onPress={() => {this._addDoctor(item)}} 
      						onShowUnderlay={separators.highlight}
      						onHideUnderlay={separators.unhighlight}>
      						<View key={item.id} style={{backgroundColor: 'white', borderBottomWidth: 1, justifyContent: 'center'}}>
        						<Text style={{margin: 15}}>{item.user.first_name} {item.user.last_name}</Text>
        						<Button
									color="#62BE87"
									style={{borderRadius: 15}}
									onPress={() => {}}
									title="Ajouter"
          						/>
      						</View>
    					</TouchableHighlight>
  					)}
				/>
      		</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1
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
		flex: 9,
		height: 50
	},
	searchelem: {
		flex: 1
	}
})

const mapStateToProps = (state) => {
	return {
	  token: state.token
	}
      }
      
export default connect(mapStateToProps)(DoctorChoice)

/*navigate('ChooseModulesToSendStackNavigator')*/