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
			console.log("ContactProfile - data :")
			console.log(data)
			let response = await data.json()
			console.log("ContactProfile - response: ")
			console.log(response)
			this.setState({
				email: response.email,
				phoneNumber: response.phone_number ? response.phone_number : "",
			})

		})
	}


	setSubject = (text) => {
		this.setState({ subject: text })
		console.log(this.state.subject)
	}

	setMessage = (text) => {
		this.setState({ message: text })
		console.log(this.state.message)
	}

	setAdresseMail = (text) => {
		this.setState({ email: text })
		console.log(this.state.email)
	}

	setPhoneNumber = (text) => {
		this.setState({ phoneNumber: text })
		console.log(this.state.phoneNumber)
	}

	confirmPressed = () => {
		console.log("confirmer button pressed ")
		if (this.state.subject == "" || this.state.message == "" || this.state.email == "") {
			this.setState({ isConfirm: false })
		} else {
			console.log("OK now we can send the message !")
			this.setState({ isConfirm: true })
		}
	}


	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={{flex: 1}}>
				<Text> ContactProfile </Text>

				<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10}}>
		            <Text> Sujet </Text>
		            <TextInput
		              placeholder="Sujet"
		              onChangeText={(text) => this.setSubject(text)}
		              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
		            />
				</View>
				<View style={{ flex: 4, justifyContent: "flex-start", alignContent: 'center', marginLeft: 10}}>
		            <Text> Message </Text>
		            <TextInput
		              placeholder="Message"
		              onChangeText={(text) => this.setMessage(text) }
		              style={styles.textField, { width: windowSize.x / 1.5, height: windowSize.y / 2.75, borderWidth: 1 }}
		            />
				</View>
				<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10}}>
		            <Text> Adresse mail </Text>
		            <TextInput
		              placeholder="Adresse.mail@exemple.com"
		              onChangeText={(text) => this.setAdresseMail(text)}
		              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
		              value={this.state.email}
		            />
				</View>
				<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', marginLeft: 10}}>
		            <Text> Numero de téléphone (facultatif) </Text>
		            <TextInput
		              placeholder="0123456789"
		              onChangeText={(text) => this.setPhoneNumber(text)}
		              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
		              value={this.state.phoneNumber}
		            />
				</View>
				{this.state.isConfirm ?
					null
					:
					<Text style={{color: colors.errorColor}}> /!\ need to fill field subject, message and email at least /!\ </Text>
				}
				<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
					<View>
						<Button 
							color="#62BE87"
							style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
							onPress={() => {}}
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