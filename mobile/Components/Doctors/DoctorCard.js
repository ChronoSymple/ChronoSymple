
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
	Image,
	Alert} from 'react-native'
import { Icon } from 'react-native-elements'
import { APIGetMyDoctors, APIGetDoctorProfile, APIAddDoctor, APIRemoveDoctor} from '../../API/APIDoctor';
import { APIgetDoctorsOfModule, APIUnshareNote, APIDoctorOfNotes } from '../../API/APIModule'

import { connect } from 'react-redux';
import { colors, windowSize } from '../StyleSheet'


/*
Cette classe correspond a la page : fiche du medecin
dans la partie profil du patient --> module -> voir la fiche du medecin
*/
class DoctorCard extends React.Component {
	constructor (props) {
		super(props)
		const doctorInfo = this.props.navigation.getParam("doctorInfo")
		const pageToReturn = this.props.navigation.getParam("pageToReturn")
		this.state = {
			data: [],
			isMyDoctor: false,
			unitId: this.props.navigation.getParam("unitId"),
			actualDoctor: this.props.navigation.getParam("actualDoctor"),
			firstName: doctorInfo.first_name,
			lastName: doctorInfo.last_name,
			address: doctorInfo.adress,
			numero: doctorInfo.phone_number,
			mail: doctorInfo.email,
			doctorId: doctorInfo.id,
			domain: "",
			hours: "",
			pageToReturn: pageToReturn,
			mode: this.props.navigation.getParam("mode"),
	}
		if (this.state.actualDoctor == this.state.doctorId )
			console.log("equal")
	}

	addDoctorPressed = () => {
		APIAddDoctor(this.props.token.token, this.state.unitId, this.state.doctorId).then(async data => {
			console.log(data.status)
			this.props.navigation.navigate("Home")
		})
	}

	removeDoctorPressed = (navigate) => {
		APIRemoveDoctor(this.props.token.token, this.state.unitId, this.state.actualDoctor).then(async data => {
			if (navigate == "navigate")
				this.props.navigation.navigate("Home")
		})
	}


	render() {
		let { navigate } = this.props.navigation;

		return (
			<View style={{flex: 1}}>
				<View style={{backgroundColor:colors.secondary, flex:1, flexDirection: 'column'}}>
					<View style={{flex:1}}></View>
					<View style={{flex:8, flexDirection: 'row', justifyContent:"space-between"}}>
						<TouchableHighlight style={{margin: 10, flex: 2}}>
							<Icon
								name="arrow-back"
								color="#FFF"
								size={35}
								onPress={() => navigate("SearchDoctors")}
		    				/>
						</TouchableHighlight>
						<View style={{margin: 10, flex: 8, alignItems: "center", justifyContent: "center"}}>
							<Text style={{color:"white", textAlign:'center', fontWeight: "bold", fontSize:22}}>
								Fiche médecin
							</Text>
						</View>
					</View>
					<View style={{flex:1}}></View>
				</View>
				<View style={{flex: 8, flexDirection: "column"}}>
					<View style={{flex: 4, flexDirection: "row"}}>
						<View style={{flex: 2}}/>
						<View style={{flex: 6}}>
							<Image
								source={{
								  uri: 'https://image.flaticon.com/icons/png/512/122/122454.png',
								}}
								style={{flex: 5, margin: 15, backgroundColor: "white", borderRadius: 15, borderWidth: 1, borderColor: 'white' }}
							/>
						</View>
						<View style={{flex: 2}}/>
					</View>
					<View style={{flex: 6, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
						<View style={{flex: 1, justifyContent: "center"}}>
							<Text>Nom : {this.state.firstName} Prénom : {this.state.lastName}</Text>
						</View>
						<View style={{flex: 1, justifyContent: "center"}}>
							<Text>Tél. : {this.state.numero}</Text>
						</View>
						<View style={{flex: 1, justifyContent: "center"}}>
							<Text>Mail : {this.state.mail}</Text>
						</View>
						<View style={{flex: 0.5, justifyContent: "center"}}>
						</View>
						<View style={{flex: 2, alignItems: "center"}}>
							<Text>Domaine d'expertise: </Text>
							<Text>Inconnu</Text>
						</View>
						<View style={{flex: 2}}>
							<Text>Addresse de travail:</Text>
							<Text>{this.state.address}</Text>
						</View>
						<View style={{flex: 2.5, alignItems: "center"}}>
							<Text>Horaire d'ouverture: </Text>
							<Text>Inconnues</Text>
						</View>
					</View>
				</View>
				{ this.state.mode == "change" && this.state.actualDoctor == this.state.doctorId &&
					<View style={{flex: 1, flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
						<View style={{flex: 5, alignItems: "center"}}>
							<Button 
								style={{ borderWidth: 2, borderColor: '#000000'}}
								title="Changer"
								color="#DDDDDD"
							/>
						</View>
						<View style={{flex: 5, alignItems: "center"}}>
							<Button 
								color="#62BE87"
								style={{flex:5, borderWidth: 2, borderColor: '#000000'}}
								onPress={() => {this.removeDoctorPressed("navigate")}}
								title="Dissocier"
							/>
						</View>
					</View>
				}
				{ this.state.mode == "change" && this.state.actualDoctor != this.state.doctorId &&
					<View style={{flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
						<Button 
							color="#62BE87"
							style={{flex:5, borderWidth: 2, borderColor: '#000000'}}
							onPress={() => {this.removeDoctorPressed("none"), this.addDoctorPressed()}}
							title="Changer"
						/>
					</View>
				}
				{ this.state.mode == "add" &&
					<View style={{flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
							<Button 
								color="#62BE87"
								style={{ borderWidth: 2, borderColor: '#000000'}}
								onPress={() => {this.addDoctorPressed()}}
								title="Ajouter"
							/>
					</View>
				}
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