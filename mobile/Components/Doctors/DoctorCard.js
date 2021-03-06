
import React from 'react'
import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableHighlight,
	Image,
	Modal,
	ActivityIndicator} from 'react-native'
import { Icon } from 'react-native-elements'
import { APIAddDoctor, APIRemoveDoctor} from '../../API/APIDoctor';
import { connect } from 'react-redux';
import { colors } from '../StyleSheet'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import { APIGetDoctorProfile } from '../../API/APIDoctor'
import { showMessage, hideMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";

/*
Cette classe correspond a la page : fiche du medecin
dans la partie profil du patient --> module -> voir la fiche du medecin
*/
class DoctorCard extends React.Component {
	constructor (props) {
		super(props)
		const id = this.props.navigation.getParam("id")
		const pageToReturn = this.props.navigation.getParam("pageToReturn")
		this.state = {
			unitId: this.props.navigation.getParam("unitId"),
			actualDoctor: this.props.navigation.getParam("actualDoctor"),
			firstName: "",
			lastName: "",
			address: "",
			numero: "",
			mail: "",
			doctorId: id,
			domain: "",
			hours: "",
			pageToReturn: pageToReturn,
			mode: this.props.navigation.getParam("mode"),
			display: false,
			modalInternetVisible: false,
		}
		this.getSpecificDoctor(id)
	}

	getSpecificDoctor = (id) => {
		NetInfo.fetch().then((state) => {
			if (state.isConnected == true) {
				this.setInternetModal(false)
			} else {
				this.setInternetModal(true)
			}
		})
		this.props.getUserToken().then(() => {
			APIGetDoctorProfile(this.props.token.token, id).then(async data => {
				let response = await data.json()
				if (data.status == 200) {
					this.setState({
						firstName: response.first_name,
						lastName: response.last_name,
						address: response.adress,
						numero: response.phone_number,
						mail: response.email,
						domain: "",
						hours: "",
						display: true
					})
				} else if (data.status == 404) {
					showMessage({
						message: "le docteur n'a pas été trouvé. Recommencez. Si le probleme persiste contactez nous",
						type: "danger",
					});
				} else if (data.status == 401) {
					showMessage({
						message: "Un probleme est survenus, vous allez être déconnecté",
						type: "danger",
					});
					this.props.navigation.navigate("Logout");
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	setInternetModal = (visible) => {
		this.setState({ modalInternetVisible: visible })
	}

	addDoctorPressed = () => {
		this.props.getUserToken().then(() => {
			APIAddDoctor(this.props.token.token, this.state.unitId, this.state.doctorId).then(async data => {
				if (data.status == 200) {
					if (this.state.mode == "change") {
						showMessage({
							message: this.state.firstName + " " + this.state.lastName + " est votre nouveau médecin",
							type: "success",
						});	
					}
					else {
						showMessage({
							message: "Le médecin " + this.state.firstName + " " + this.state.lastName + " a été ajouté",
							type: "success",
						});
					}
					this.props.navigation.navigate("Home")
				} else if (data.status == 404) {
					showMessage({
						message: "Le docteur ou l'unit(Module) n'a pas été trouver. Recommencez. Si le probleme persiste contactez nous",
						type: "danger",
					});
				} else if (data.status == 401) {
					showMessage({
						message: "Un probleme est survenus, vous allez être déconnecté",
						type: "danger",
					});
					this.props.navigation.navigate("Logout");
				} else {
					showMessage({
						message: "Le médecin " + this.state.firstName + " " + this.state.lastName + " n'a pas a été ajouté",
						type: "danger",
					});
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}


	removeDoctorPressed = (navigate, id) => {
		if (id == true)
			id = this.state.actualDoctor
		else
			id = this.state.doctorId
		this.props.getUserToken().then(() => {
			APIRemoveDoctor(this.props.token.token, this.state.unitId, id).then(async data => {
				if (navigate && data.status == 200) {
					showMessage({
						message: "Le médecin " + this.state.firstName + " " + this.state.lastName + " a été supprimé",
						type: "success",
					});
					if (this.state.pageToReturn == "AllDoctors")
						this.props.navigation.navigate("Profil")
					else
						this.props.navigation.navigate("Home")
				} else if (data.status == 404) {
					showMessage({
						message: "Le docteur ou l'unit (Module) n'a pas été trouver. Recommencez. Si le probleme persiste contactez nous",
						type: "danger",
					});
				} else if (data.status == 401) {
					showMessage({
						message: "Un probleme est survenus, vous allez être déconnecté",
						type: "danger",
					});
					this.props.navigation.navigate("Logout");
				} else {
					showMessage({
						message: "Le médecin " + this.state.firstName + " " + this.state.lastName + " n'a pas a été supprimé",
						type: "danger",
					});
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}


	render() {
		let { navigate } = this.props.navigation;

		return (
			<View style={{flex: 1}}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalInternetVisible}
				>
					<View style={{ flex: 1, marginTop: 10}}>
						<View style={{flex: 1 }}>
						<TouchableHighlight style={{margin: 10}}>
							<Icon
								name="clear"
								color="#62BE87"
								size={35}
								onPress={() => this.setInternetModal(false)}
							/>
						</TouchableHighlight>
						</View>
						<View style={{flex: 1}}>
							<Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#62BE87'}}>
								Un probleme est survenue.{'\n'}Ceci peut etre du a un probleme de connexion internet{'\n'}{'\n'}
							</Text>
							<Button 
								style={styles.buttonNoModule}
								color="#62BE87"
								onPress={() => {this.getSpecificDoctor(this.state.doctorId)}}
								title="Actualiser la page"
							/>
						</View>
						<View style={{flex: 1}}/>
					</View>
				</Modal>
				<View style={{backgroundColor:colors.secondary, flex:1, flexDirection: 'column'}}>
					<View style={{flex:1}}></View>
					<View style={{flex:8, flexDirection: 'row', justifyContent:"space-between"}}>
						{ this.state.pageToReturn == "AllDoctors" &&
							<TouchableHighlight style={{margin: 10, flex: 2}}>
									<Icon
										name="arrow-back"
										color="#FFF"
										size={35}
										onPress={() => navigate("Profil")}
									/>
							</TouchableHighlight>
						}
						{ this.state.pageToReturn == "SearchDoctors" &&
							<TouchableHighlight style={{margin: 10, flex: 2}}>
									<Icon
										name="arrow-back"
										color="#FFF"
										size={35}
										onPress={() => navigate("SearchDoctors")}
									/>
							</TouchableHighlight>
						}
						<View style={{margin: 10, flex: 8, alignItems: "center", justifyContent: "center"}}>
							<Text style={{color:"white", textAlign:'center', fontWeight: "bold", fontSize:22}}>
								Fiche médecin
							</Text>
						</View>
					</View>
					<View style={{flex:1}}></View>
				</View>
				<View style={{flex: 9}}>
				{! this.state.display ?
					<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
						<ActivityIndicator size='large' color='black' syle={{justifyContent: "center", alignItems: "center"}}/>
					</View>
					:
					<View style={{flex: 1}}>
						<View style={{flex: 9, flexDirection: "column"}}>
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
										onPress={() => {this.removeDoctorPressed(true, true)}}
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
									onPress={() => {this.removeDoctorPressed(true, true), this.addDoctorPressed()}}
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
						{ this.state.mode == "delete" &&
							<View style={{flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
									<Button 
										color="#62BE87"
										style={{ borderWidth: 2, borderColor: '#000000'}}
										onPress={() => {this.removeDoctorPressed(true, false)}}
										title="Dissocier"
									/>
							</View>
						}
					</View>
				}
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