import React from 'react'
import { View, Text, Button, TextInput, Dimensions, StyleSheet } from 'react-native'
import { LoginAPatientWithApi } from '../../API/APIConnection'
import { APIGetPatientModules } from '../../API/APIModule'
import { getToken, setToken } from './Cache'
import { styles, colors, windowSize } from '../StyleSheet'
import { connect } from 'react-redux'

class Login extends React.Component {

	constructor(props) {
		super(props)
		this.state = { 
			mail: "", 
			password: "", 
			isInvalid: false,
			textFiledFocusColor: colors.primary,
			passwordFocused: false,
			emailFocused: false
		}
	}

	checkLogin = () => {
		let { navigate } = this.props.navigation;

		LoginAPatientWithApi(this.state.mail, this.state.password).then(async data => {
			console.log(data);
		 	if (data.status == 200) {
				 let response = await data.json()
		 		let token = response.login_token
		 		setToken(token);
		 		const action = { type: "REGISTER_TOKEN", value: token }
		 		this.props.dispatch(action)
		 		if (token !== null) {
		 			APIGetPatientModules(this.props.token).then(async data => {
		 				if (data.status == 200) {
		 					let response = await data.json()
		 					console.log("Login - APIGetPatientModules - response: ")
		 					console.log(response)
		 					if (response.length > 0) {
		 						const action = { type: "CURRENT_MODULE", value: response[0].id}
		 						console.log(action)
		 						this.props.dispatch(action)	
		 						this.props.navigation.navigate('Home', {idModule: response[0].id})
		 					}
		 					else
		 						navigate('Home')
		 				}
					 })
					 navigate('SignIn')
		 		}
		 	}
		 	else {
		 		this.setState({ isInvalid: true, errorText: "Problème de connection" })
		 	}
		}); 				// TO DECOMMENT 
		//navigate('Home') // TO RM NEXT EIP REUNION 
	}

	setMail = (text) => {
		this.setState({ mail: text })
	}

	setPassword = (text) => {
		this.setState({ password: text })
	}

	textFieldFocused = (state) => {
		this.setState({[state]: true})
	}

	textFieldBlured = (state) => {
		this.setState({[state]: false})
	}

  	render() {
		let { navigate } 		= this.props.navigation;
		let placeholder_email 		= "E-mail";
		let placeholder_password 	= "Mot de passe";
		let notSubscribe 		= "Créer un compte";
		let login 			= "Se connecter";
		let errorMessage 		= "email ou mot de passe incorrect";
		let emailFocused 		= "emailFocused";
		let passwordFocused 		= "passwordFocused"

    		return (
			<View style={styles.AuthBackgroundContainer}>
    				<View style={styles.AuthMainContainer}>
	      				<View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
					      	<View style={{ flex: 2, justifyContent: "center"}}></View>
						<View style={{ flex: 1, justifyContent: "center"}}>
							<Text style={styles.label}>CONNECTION</Text>
						</View>
	      					<View style={{ flex: 6, justifyContent: "center"}}>
						<TextInput
							onFocus={() => this.textFieldFocused(emailFocused)}
							onBlur={() => this.textFieldBlured(emailFocused)}
							placeholder={placeholder_email}
							style={[this.state[emailFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5 }]}
							autoCorrect={false}
							onChangeText={(text) => this.setMail(text)}
							value={this.mail}
						/>
						<TextInput
							onFocus={() => this.textFieldFocused(passwordFocused)}
							onBlur={() => this.textFieldBlured(passwordFocused)}
							secureTextEntry={true}
							placeholder={placeholder_password}
							style={[this.state[passwordFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5 }]}
							autoCorrect={false}
							onChangeText={(text) => this.setPassword(text)}
							value={this.password}
						/>
					</View>
	      				<View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
							{this.state.isInvalid && <Text style={{ color: colors.errorColor }}>{errorMessage}</Text>}
						</View>
						<View style={{ flex: 3, justifyContent: "center", width: windowSize.x / 1.5}}>
							{/* <View style={{ flex: 1, justifyContent: "center"}}>
								<Button 
									color={colors.secondary}
									onPress={() => navigate('SignIn')}
									title={notSubscribe}
								/>
							</View> */}
							<View style={{ flex: 1, justifyContent: "center"}}>
								<Button 
									color={colors.primary}
									onPress={() => this.checkLogin()}
									title={login}
								/>
							</View>
							<View style={{ flex: 2, justifyContent: "center"}}></View>
						</View>
					</View>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token
	}
}

export default connect(mapStateToProps)(Login)