import React from 'react';
import {View, Text, TouchableOpacity,  Button, TextInput} from 'react-native';
import { styles, colors, windowSize } from '../../StyleSheet';
import { connect } from 'react-redux';
import { getUserToken } from '../../../Redux/Action/action';
import { getPatientInfoWithApi } from '../../../API/APIConnection'


class ContactProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			subject: "",
			message: "",
			email: "",
			phoneNumber: "",
			isConfirm: true
		}

		getPatientInfoWithApi(this.props.token.token).then(async data => {
			let response = await data.json()
			this.setState({
				email: response.email,
				phoneNumber: response.phone_number ? response.phone_number : "",
			})

		})
	}


	setSubject = (text) => {
		this.setState({ subject: text })
	}

	setMessage = (text) => {
		this.setState({ message: text })
	}

	setAdresseMail = (text) => {
		this.setState({ email: text })
	}

	setPhoneNumber = (text) => {
		this.setState({ phoneNumber: text })
	}

	confirmPressed = () => {
		if (this.state.subject == "" || this.state.message == "" || this.state.email == "") {
			this.setState({ isConfirm: false })
		} else {
			this.setState({ isConfirm: true })
		}
	}

	returnPressed = () => {
		this.props.navigation.navigate("SupportProfile")
	}


	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={{flex: 1}}>
				<View style={{ flex: 1, justifyContent: "center", marginLeft: 15, marginRight: 25}}>
					<TextInput
						placeholder="Sujet"
						onChangeText={(text) => this.setSubject(text)}
						style={styles.textField, { borderBottomWidth: 1 }}
					/>
					<Text style={{fontSize: 13, color: colors.secondary}}> Sujet </Text>
				</View>
				<View style={{ flex: 4, justifyContent: "flex-start", alignContent: 'center', marginLeft: 15, marginRight: 15}}>
		            <TextInput
		              placeholder="Message"
		              onChangeText={(text) => this.setMessage(text) }
		              style={styles.textField, { borderWidth: 1 }}
		            />
		            <Text style={{fontSize: 13, color: colors.secondary}}> Message </Text>
				</View>
				<View style={{ flex: 1, justifyContent: "center", marginLeft: 15, marginRight: 25}}>
					<TextInput
						placeholder="Adresse.mail@exemple.com"
						onChangeText={(text) => this.setAdresseMail(text)}
						style={styles.textField, { borderBottomWidth: 1 }}
						value={this.state.email}
					/>
					<Text style={{fontSize: 13, color: colors.secondary}}> Adresse Mail </Text>
				</View>
				<View style={{ flex: 1, justifyContent: "center", marginLeft: 15, marginRight: 25}}>
					<TextInput
						placeholder="0123456789"
						onChangeText={(text) => this.setPhoneNumber(text)}
						style={styles.textField, { borderBottomWidth: 1 }}
						value={this.state.phoneNumber}
					/>
					<Text style={{fontSize: 13, color: colors.secondary}}> Numero de telephone (facultatif) </Text>
				</View>
				{this.state.isConfirm ?
					null
					:
					<Text style={{color: colors.errorColor, marginRight: 15, marginLeft: 15}}> /!\ sujet, message et / ou adresse mail non valide (ou vide) /!\ </Text>
				}
				<View style={{flex: 1}}/>
				<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
					<View>
						<Button 
							color="#62BE87"
							style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
							onPress={() => this.returnPressed()}
							title="Retour"
						/>
					</View>
					<View>
						<Button 
						color="#62BE87"
						style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
						onPress={() => this.confirmPressed()}
						title="Confirmer"
						/>
					</View>
				</View>
				<View style={{flex: 1}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactProfile)