import React from 'react';
import {View, Text, TouchableOpacity,  Button, TextInput, Modal, TouchableHighlight, Alert} from 'react-native';
import { styles, colors, windowSize } from '../../StyleSheet';
import { connect } from 'react-redux';
import { getUserToken } from '../../../Redux/Action/action';
import { getPatientInfoWithApi, updatePatientProfile } from '../../../API/APIConnection'

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
			isPhoneNumberValid: true,
			isMailValid: true,
			phoneRegExp: new RegExp("^[0-9]{8,12}$", 'g'),
			emailRegExp: new  RegExp(".*@.*\..*", 'g'),
			}
			this.getPatientInfo()
	}

	getPatientInfo = () => {
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
			this.setState({ isPhoneNumberValid: true})
			updatePatientProfile(this.props.token.token, "phoneNumber", this.state.tmpPhoneNumber, this.state.password).then(async data => {
				if (data.status == 200) {
					this.getPatientInfo()
					this.setModalPhoneVisible(!this.state.modalPhoneVisible)
				} else {
					let response = await data.json()
				}
			})
		}
		else {
			this.setState({ isPhoneNumberValid: false})
		}
	}

	confirmNewAdressMailPressed = () => {
		if (this.state.emailRegExp.test(this.state.tmpEmail) == true) {
			this.setState({ isMailValid: true })
			updatePatientProfile(this.props.token.token, "email", this.state.tmpEmail, this.state.password).then(async data => {
				if (data.status == 200) {
					this.getPatientInfo()
					this.setModalMailVisible(!this.state.modalMailVisible)
				} else {
					let response = await data.json()
				}
			})
		} else {
			this.setState({ isMailValid: false })
		}
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={{ flex:1 }}>
				<Modal
		          animationType="slide"
		          transparent={false}
		          visible={this.state.modalPhoneVisible}
		          >
		        	<View style={{ flex: 1, marginTop: 22}}>
		            	<Text>This is the modal for the phone number!</Text>
		            	<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10}}>
				            <Text> Numero de telephone </Text>
				            <TextInput
				              placeholder="nouveau numero de telephone"
				              onChangeText={(text) => this.setTmpPhoneNumber(text)}
				              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
				              value={this.state.tmpPhoneNumber}
				            />
						</View>
						<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10}}>
				            <Text> Mot de passe </Text>
				            <TextInput
				              placeholder="votre mot de passe"
				              onChangeText={(text) => this.setPassword(text)}
				              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
				            />
						</View>
						{this.state.isPhoneNumberValid ?
							null
							:
							<Text style={{color: colors.errorColor}}> /!\ Invalid phone number ! /!\ </Text>
						}
						<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
							<View>
								<Button 
									color="#62BE87"
									style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
									onPress={() => this.setModalPhoneVisible(!this.state.modalPhoneVisible) }
									title="Retour"
								/>
							</View>
							<View>
								<Button 
									color="#62BE87"
									style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
									onPress={() => this.confirmNewPhonePressed()}
									title="Confirmer"
								/>
							</View>
						</View>
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
		            	<Text>This is the modal for the Adresse Mail!</Text>
		            	<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10}}>
				            <Text> Adresse Mail </Text>
				            <TextInput
				              placeholder="nouvelle adresse mail"
				              onChangeText={(text) => this.setTmpAdresseMail(text)}
				              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
				              value={this.state.tmpEmail}
				            />
						</View>
						<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10}}>
				            <Text> Mot de passe </Text>
				            <TextInput
				              placeholder="votre mot de passe"
				              onChangeText={(text) => this.setPassword(text)}
				              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
				            />
						</View>
						{this.state.isMailValid ?
							null
							:
							<Text style={{color: colors.errorColor}}> /!\ Invalid email ! /!\ </Text>
						}
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
		            </View>
		        </Modal>
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