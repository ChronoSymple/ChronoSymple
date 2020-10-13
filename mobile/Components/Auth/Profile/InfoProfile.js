import React from 'react';
import {View, Text, TouchableOpacity,  Button, TextInput, Modal, TouchableHighlight, Alert} from 'react-native';
import { styles, colors, windowSize } from '../../StyleSheet';
import { connect } from 'react-redux';
import { getUserToken } from '../../../Redux/Action/action';
import { getPatientInfoWithApi, updatePatientProfile } from '../../../API/APIConnection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";



class InfoProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			birthdate: "",
			civility: "",
			password: "",
			tmpEmail: "",
			tmpPhoneNumber: "",
			modalPhoneVisible: false,
			modalMailVisible: false,
			modalInternetVisible: false,
			phoneRegExp: new RegExp("^[0-9]{8,12}$", 'g'),
			emailRegExp: new  RegExp(".*@.*\..*", 'g'),
			}
			this.getPatientInfo()
	}

	getPatientInfo = () => {
		NetInfo.fetch().then((state) => {
			console.log(
				'is connected: ' +
				state.isConnected
			);
			if (state.isConnected == true) {
				this.setInternetModal(false)
			} else {
				this.setInternetModal(true)
			}
		})
		getPatientInfoWithApi(this.props.token.token).then(async data => {
			let response = await data.json()
			this.setState({
				firstName: response.first_name,
				lastName: response.last_name,
				email: response.email,
				phoneNumber: response.phone_number ? response.phone_number : "None",
				birthdate: response.birthdate,
				civility: response.civility,
				tmpEmail: response.email,
				tmpPhoneNumber: response.phone_number,
			})
		})
	}

	setModalPhoneVisible = (visible) => {
		this.setState({ modalPhoneVisible: visible })
	}

	setModalMailVisible = (visible) => {
		this.setState({ modalMailVisible: visible })
	}

	setInternetModal = (visible) => {
		this.setState({ modalInternetVisible: visible })
	}

	setTmpPhoneNumber = (text) => {
		this.setState({ tmpPhoneNumber: text })
	}

	setTmpAdresseMail = (text) => {
		this.setState({ tmpEmail: text })
	}

	setPassword = (text) => {
		this.setState({ password: text })
	}

	confirmNewPhonePressed = () => {
		if (this.state.phoneRegExp.test(this.state.tmpPhoneNumber) == true) {
			updatePatientProfile(this.props.token.token, "phoneNumber", this.state.tmpPhoneNumber, this.state.password).then(async data => {
				if (data.status == 200) {
					this.getPatientInfo()
					this.setState({ password: ''})
					showMessage({
						message: "Le numero de telephone a bien été changé",
						type: "success"
					});
				} else {
					let response = await data.json()
					showMessage({
						message: "Une erreur est survenue. Recommencez. Si le probleme persiste contactez nous.",
						type: "danger"
					});
				}
			})
		}
		else {
			showMessage({
				message: "Votre numero de telephone ou mot de passe est invalide",
				type: "danger"
			});
			this.setState({ password: ''})
		}
		this.setModalPhoneVisible(!this.state.modalPhoneVisible)
	}

	confirmNewAdressMailPressed = () => {
		if (this.state.emailRegExp.test(this.state.tmpEmail) == true) {
			updatePatientProfile(this.props.token.token, "email", this.state.tmpEmail, this.state.password).then(async data => {
				if (data.status == 200) {
					this.getPatientInfo()
					this.setState({ password: ''})
					showMessage({
						message: "L'adresse mail a bien été changé",
						type: "success"
					});
				} else {
					let response = await data.json()
					showMessage({
						message: "Une erreur est survenue. Recommencez. Si le probleme persiste contactez nous.",
						type: "danger"
					});
				}
			})
		} else {
			showMessage({
				message: "Votre adresse mail ou mot de passe est invalide",
				type: "danger"
			});
			this.setState({ password: ''})
		}
		this.setModalMailVisible(!this.state.modalMailVisible)
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={{ flex:1 }}>
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
								onPress={() => {this.getPatientInfo()}}
								title="Actualiser la page"
							/>
						</View>
						<View style={{flex: 1}}/>
					</View>
				</Modal>
				<Modal
		          animationType="slide"
		          transparent={false}
		          visible={this.state.modalPhoneVisible}
		          >
		        	<View style={{ flex: 1, marginTop: 10}}>
		            	<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10, marginRight: 20}}>
				            <TextInput
				              placeholder="nouveau numero de telephone"
				              onChangeText={(text) => this.setTmpPhoneNumber(text)}
				              style={styles.textField, {borderBottomWidth: 1 }}
				              value={this.state.tmpPhoneNumber}
				            />
				            <Text style={{fontSize: 13, color: colors.secondary}}> Numero de telephone </Text>
						</View>
						<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10, marginRight: 20}}>
							<TextInput 
								secureTextEntry={true}
								label="votre mot de passe"
								value={this.state.password}
								onChangeText={ (password) => this.setState({ password }) }
							/>
				            <Text style={{fontSize: 13, color: colors.secondary}}> Mot de passe</Text>
						</View>
						<View style={{flex: 1}}/>
						<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
							<View >
								<Button 
									color="#62BE87"
									style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
									onPress={() => this.setModalPhoneVisible(!this.state.modalPhoneVisible) }
									title="Retour"
								/>
							</View>
							<View >
								<Button 
									color="#62BE87"
									style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
									onPress={() => this.confirmNewPhonePressed()}
									title="Confirmer"
								/>
							</View>
						</View>
						<View style={{flex: 4}}/>
		            </View>
		        </Modal>

		        <Modal
		          animationType="slide"
		          transparent={false}
		          visible={this.state.modalMailVisible}
		          onRequestClose={() => {
		            Alert.alert('Modal for adresse mail has been closed.');
		          }}>
		        	<View style={{ flex: 1, marginTop: 22}}>
		            	<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10, marginRight: 20}}>
				            <TextInput
				              placeholder="nouvelle adresse mail"
				              onChangeText={(text) => this.setTmpAdresseMail(text)}
				              style={styles.textField, { borderBottomWidth: 1 }}
				              value={this.state.tmpEmail}
				            />
				            <Text style={{fontSize: 13, color: colors.secondary}}> Adresse mail</Text>
						</View>
						<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10, marginRight: 20}}>
				            <TextInput 
				            	secureTextEntry={true}
								label="votre mot de passe"
								value={this.state.password}
								onChangeText={ (password) => this.setState({ password }) }
							/>
				            <Text style={{fontSize: 13, color: colors.secondary}}> Mot de passe</Text>
						</View>
						<View style={{flex: 1}}/>
						<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
							<View>
								<Button 
									color="#62BE87"
									style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
									onPress={() => this.setModalMailVisible(!this.state.modalMailVisible) }
									title="Retour"
								/>
							</View>
							<View>
								<Button 
									color="#62BE87"
									style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
									onPress={() => this.confirmNewAdressMailPressed()}
									title="Confirmer"
								/>
							</View>
						</View>
						<View style={{flex: 4}}/>
		            </View>
		        </Modal>
		        <View style={{backgroundColor: colors.secondary, flex: 1, flexDirection: 'column'}}>
					<View style={{flex:1}}/>
					<View style={{flex:8, flexDirection: 'row', justifyContent:"space-between"}}>
						<TouchableHighlight style={{margin: 10}}>
							<Icon
								name="arrow-back"
								color="#FFF"
								size={35}
								onPress={() => navigate('Profile')}
		    				/>
						</TouchableHighlight>
					</View>
					<View style={{flex:1}}/>
				</View>
				<TouchableOpacity onPress={() => {}} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}> Nom </Text>
						</View>
						<View style={{flex: 2, alignItems: 'flex-end'}}>
							<Text style={{paddingTop: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}>{this.state.lastName}</Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
							
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}> Prenom </Text>
						</View>
						<View style={{flex: 2, alignItems: 'flex-end'}}>
							<Text style={{paddingTop: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}>{this.state.firstName}</Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
							
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}> Date de naissance </Text>
						</View>
						<View style={{flex: 2, alignItems: 'flex-end'}}>
							<Text style={{paddingTop: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}>{this.state.birthdate}</Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
							
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}> Civilité </Text>
						</View>
						<View style={{flex: 2, alignItems: 'flex-end'}}>
							<Text style={{paddingTop: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}>{this.state.civility}</Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>

						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => { this.setModalPhoneVisible(true); }} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}> Numero de telephone </Text>
						</View>
						<View style={{flex: 2, alignItems: 'flex-end'}}>
							<Text style={{paddingTop: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}>{this.state.phoneNumber}</Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
							<Icon
								name="chevron-right"
								color="#62BE87"
								size={35}
							/>
						</View>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => { this.setModalMailVisible(true);}} style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}> Adresse Mail </Text>
						</View>
						<View style={{flex: 2, alignItems: 'flex-end'}}>
							<Text style={{paddingTop: 20, fontSize: 13, color: colors.secondary, textTransform: 'capitalize' }}>{this.state.email}</Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
							<Icon
								name="chevron-right"
								color="#62BE87"
								size={35}
							/>
						</View>
					</View>
				</TouchableOpacity>
				<View style={{flex: 5}}/>

				{/*</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', height: windowSize.y / 10, borderBottomWidth: 1}}>
					<Text style={{marginLeft: 20, marginTop: windowSize.y / 25}}>Nom</Text>
					<Text style={{marginRight: 20, marginTop: windowSize.y / 25}}>{this.state.lastName}</Text>
				</View>
				<View style={{ flexDirection: 'row',  justifyContent: 'space-between', height: windowSize.y / 10, borderBottomWidth: 1}}>
					<Text style={{marginLeft: 20, marginTop: windowSize.y / 25}}>Prenom</Text>
					<Text style={{marginRight: 20, marginTop: windowSize.y / 25}}>{this.state.firstName}</Text>
				</View>
				<View style={{ flexDirection: 'row',  justifyContent: 'space-between', height: windowSize.y / 10, borderBottomWidth: 1}}>
					<Text style={{marginLeft: 20, marginTop: windowSize.y / 25}}>date de naissance</Text>
					<Text style={{marginRight: 20, marginTop: windowSize.y / 25}}>{this.state.birthdate}</Text>
				</View>
				<View style={{ flexDirection: 'row',  justifyContent: 'space-between', height: windowSize.y / 10, borderBottomWidth: 1}}>
					<Text style={{marginLeft: 20, marginTop: windowSize.y / 25}}>civilité</Text>
					<Text style={{marginRight: 20, marginTop: windowSize.y / 25}}>{this.state.civility}</Text>
				</View>


				<View style={{ flexDirection: 'row',  justifyContent: 'space-between', height: windowSize.y / 10, borderBottomWidth: 1}}>
					<Text style={{marginLeft: 20, marginTop: windowSize.y / 25}}>Numero de telephone</Text>
					<TouchableHighlight onPress={() => { this.setModalPhoneVisible(true); }}>
						<Text style={{marginRight: 20, marginTop: windowSize.y / 25}}>{this.state.phoneNumber}</Text>
			        </TouchableHighlight>
				</View>

				<View style={{ flexDirection: 'row',  justifyContent: 'space-between', height: windowSize.y / 10, borderBottomWidth: 1}}>
					<Text style={{marginLeft: 20, marginTop: windowSize.y / 25}}>Adresse mail</Text>
					<TouchableHighlight onPress={() => { this.setModalMailVisible(true); }}>
						<Text style={{marginRight: 20, marginTop: windowSize.y / 25}}>{this.state.email}</Text>
			        </TouchableHighlight>
				</View>
				*/}
			</View>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token
})

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserToken: () => dispatch(getUserToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoProfile)