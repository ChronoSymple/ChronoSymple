
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
import { APIGetMyDoctors, APIGetDoctorProfile, APIAddDoctor, APIRemoveDoctor} from '../../API/APIDoctor';
import { connect } from 'react-redux';
import { colors, windowSize } from '../StyleSheet'


/*
Cette classe correspond a la page : fiche du medecin
dans la partie profil du patient --> module -> voir la fiche du medecin
*/
class DoctorCard extends React.Component {
	constructor (props) {
		super(props)
		
		doctorInfo = this.props.navigation.getParam("doctorInfo")
		this.state = {
			data: [],
			isMyDoctor: false,
			unitId: this.props.navigation.getParam("unitId"),
			firstName: '',
			lastName: '',
			domain: '',
			address: '',
			hours: '',
			doctorId: -1
		}
		console.log("doctorId : this.state")
		console.log(this.state)
		this.getMyDoctorCard()
		if (doctorInfo != undefined) {
			console.log("dsqdqs")
			this.state.firstName = doctorInfo.first_name
			this.state.lastName = doctorInfo.last_name
			this.state.doctorId = doctorInfo.id
		}

	}
	

	getMyDoctorCard = () => {
		APIGetMyDoctors(this.props.token.token).then(async data => {
			let response = await data.json()
			this.setState({
				data: response,
			})
			console.log("My doctor - response:")
			console.log(response)
		})
	}

	addDoctorPressed = () => {
		console.log("Add doctor ...")
		if (this.state.isMyDoctor == true) {
			console.log("cannot add doctor that is already yours")
		} else {
			console.log("unitId: ")
			console.log(this.state.unitId)
			console.log("doctorId")
			console.log(this.state.doctorId)
			APIAddDoctor(this.props.token.token, this.state.unitId, this.state.doctorId).then(async data => {
				let response = await data.json()
				console.log("APIAddDoctor - response")
				console.log(response)
			})
		}
	}

	removeDoctorPressed = () => {
		console.log("remove doctor ...")
		if (this.state.isMyDoctor == false) {
			console.log("cannot remove a doctor that is not yours")
		}	else {
			APIRemoveDoctor(this.props.token.token, this.state.unitId, this.state.doctorId).then(async data => {
				let response = await data.json()
				console.log("APIRemoveDoctor - reponse")
				console.log(response)
			})

		}
	}


	render() {
		let { navigate } = this.props.navigation;

		return (
			<View style={{flex: 1}}>
				<View style={{backgroundColor:colors.secondary, flex:1, flexDirection: 'column'}}>
					<View style={{flex:1}}></View>
					<View style={{flex:8, flexDirection: 'row', justifyContent:"space-between"}}>
						<TouchableHighlight style={{margin: 10}}>
							<Icon
								name="arrow-back"
								color="#FFF"
								size={35}
								onPress={() => navigate("ModuleProfile")}
		    				/>
						</TouchableHighlight>
					</View>
					<View style={{flex:1}}></View>
				</View>
				<View style={{flex: 4}}>
					<Text>
						Fiche du medecin
					</Text>
					<TouchableHighlight>
						<Text>Nom: {this.state.lastName}</Text>
					</TouchableHighlight>
					<TouchableHighlight>
						<Text>Prenom: {this.state.firstName}</Text>
					</TouchableHighlight>
					<TouchableHighlight>
						<Text>Domaine d'expertise: </Text>
					</TouchableHighlight>
					<TouchableHighlight>
						<Text>Addresse de travail: </Text>
					</TouchableHighlight>
					<TouchableHighlight>
						<Text>Horaire d'ouverture: </Text>
					</TouchableHighlight>
				</View>
				<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
					<View>
						<Button 
							color="#62BE87"
							style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
							onPress={() => {this.addDoctorPressed()}}
							title="Ajouter"
						/>
					</View>
					<View>
						<Button 
							color="#62BE87"
							style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
							onPress={() => {this.removeDoctorPressed()}}
							title="Retirer"
						/>
					</View>
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