
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

/*
Cette classe correspond a la page : fiche du medecin
dans la partie profil du patient --> module -> voir la fiche du medecin
*/
class DoctorCard extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			data: []
		}
/*		this.getMyDoctorCard()
*/
	}
	
/*
	getMyDoctorCard = () => {
		APIGetDoctorProfile(this.props.token.token, this.props.doctorId).then(async data => {
			let response = await data.json()
			this.setState({
				data: response,
			})
			console.log("DoctorCard - response:")
			console.log(response)
		})
	}*/

	doctorPressed = (item) => {
		console.log("doctorPressed function")
		console.log(item)

	}

	render() {
		let { navigate } = this.props.navigation;
		let deviceWidth = Dimensions.get('window').width
		const { data } = this.state;
		return (
			<View>
				<Text>
					Fiche du medecin
				</Text>
				<TouchableHighlight>
					<Text>Nom: </Text>
				</TouchableHighlight>
				<TouchableHighlight>
					<Text>Prenom: </Text>
				</TouchableHighlight>
				<TouchableHighlight>
					<Text>Domaine: </Text>
				</TouchableHighlight>
				<TouchableHighlight>
					<Text>Addresse de travail: </Text>
				</TouchableHighlight>
				<TouchableHighlight>
					<Text>Horaire d'ouverture: </Text>
				</TouchableHighlight>
				<View>
					<Button 
						color="#62BE87"
						style={{ height: 40, borderWidth: 2, borderColor: '#000000'}}
						onPress={() => {}}
						title="ajouter"
					/>
					<Button 
						color="#62BE87"
						style={{ height: 40, borderWidth: 2, borderColor: '#000000'}}
						onPress={() => {}}
						title="retirer"
					/>
				</View>
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

const mapStateToProps = state => ({
	token: state.token,
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserToken: () => dispatch(getUserToken())
});
      
export default connect(mapStateToProps, mapDispatchToProps)(DoctorCard)

/*navigate('ChooseModulesToSendStackNavigator')*/