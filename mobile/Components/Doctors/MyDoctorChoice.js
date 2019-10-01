
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
import { APIGetMyDoctors } from '../../API/APIDoctor';
import { connect } from 'react-redux';

class MyDoctorChoice extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			data: []
		}

	}

	componentWillMount () {
		APIGetMyDoctors(this.props.token).then(async data => {
			console.log("MyDoctorChoice - APIGetMyDoctors - data")
			console.log(data)
			let response = await data.json()
			console.log("MyDoctorChoice - APIGetMyDoctors response: ")
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
      						onPress={() => {}}
      						onShowUnderlay={separators.highlight}
      						onHideUnderlay={separators.unhighlight}>
      						<View key={item.id} style={{backgroundColor: 'white', borderBottomWidth: 1, justifyContent: 'center'}}>
        						<Text style={{margin: 15}}>{item.user.first_name} {item.user.last_name}</Text>
      						</View>
    					</TouchableHighlight>
  					)}
				/>
				<Button 
					color="#62BE87"
					style={{ height: 40, borderWidth: 2, borderColor: '#000000' }} 
		          	onPress={() => navigate('DoctorChoiceStackNavigator')}
					title="ajouter un doctor"
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
      
export default connect(mapStateToProps)(MyDoctorChoice)

/*navigate('ChooseModulesToSendStackNavigator')*/