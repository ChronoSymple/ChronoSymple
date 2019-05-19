// Components/SignIn.js

import React from 'react'
import { View, Text, Button, TextInput, Dimensions, AsyncStorage } from 'react-native'
import { LoginAPatientWithApi } from '../../API/APIConnection'
import { APIGetPatientModules } from '../../API/APIModule'
import { getToken, setToken } from './StoreToken'
import { connect } from 'react-redux'

class Login extends React.Component {
	static navigationOptions = {
		headerStyle: {backgroundColor: '#58b57d'},
	  title: 'Connection',
	  headerTintColor: 'white'
	}

	constructor(props) {
		super(props)
		this.state = { mail: "", password: "fzer", isInvalid: false }
	}

	checkLogin = () => {
		let { navigate } = this.props.navigation;

		if (this.state.mail == "" || this.state.password == "") {
			this.setState({ isInvalid: true })
			return;
		}
		// LoginAPatientWithApi(this.state.mail, this.state.password).then(async data => {
		// 	if (data.status == 200) {
		// 		let response = await data.json()
		// 		let token = response.login_token
		// 		setToken(token);
		// 		const action = { type: "TOGGLE_FAVORITE", value: token }
		// 		this.props.dispatch(action)
		// 		if (token !== null) {
		// 			APIGetPatientModules(this.props.token).then(async data => {
		// 				if (data.status == 200) {
		// 					let response = await data.json()
		// 					if (response.modules.length > 0) {
		// 						const action = { type: "CURRENT_MODULE", value: response.modules[0].id}
		// 						this.props.dispatch(action)	
		// 						this.props.navigation.navigate('HomeModule', {idModule: response.modules[0].id})
		// 					}
		// 					else
		// 						navigate('Home')
		// 				}
		// 			})
		// 		}
		// 	}
		// 	else {
		// 		this.setState({ isInvalid: true, errorText: "Problème de connection" })
		// 	}
		// }); 				// TO DECOMMENT 
		navigate('Home') // TO RM NEXT EIP REUNION 
	}
	setMail = (text) => {

		this.setState({ mail: text })
	}

	setPassword = (text) => {
		this.setState({ password: text })
	}

  	render() {
	let { navigate } = this.props.navigation;
	let deviceWidth = Dimensions.get('window').width
	let errorMessage = "Mauvaise addresse mail ou mot de passe"
    	return (
      		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
			<Text style={{fontSize: 24}}>Connection{"\n"}</Text>
			<TextInput
				placeholder="Addresse mail"
				style={{ height: 40, width: deviceWidth / 3 * 2, borderBottomWidth: 1}}
				onChangeText={(text) => this.setMail(text)}
				value={this.mail}
			/>
			<Text>{"\n"}</Text>
			<TextInput
				placeholder="Mot de passe"
				style={{ height: 40, width: deviceWidth / 3 * 2, borderBottomWidth: 1}}
				onChangeText={(text) => this.setPassword(text)}
				value={this.password}
			/>
			<Text>{"\n"}</Text>
			<Button 
				color="#62BE87"
				style={{ height: 40, borderWidth: 2, borderColor: '#000000' }} 
				onPress={() => this.checkLogin()} 
				title="Se connecter"
			/>
			<Text>{"\n"}</Text>
			<Button 
				color="#62BE87"
				style={{ height: 40, borderWidth: 2, borderColor: '#000000' }} 
				onPress={() => navigate('SignIn')} 
				title="je n'ai pas de compte"
			/>
			<Text>{"\n"}</Text>
			{this.state.isInvalid && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
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