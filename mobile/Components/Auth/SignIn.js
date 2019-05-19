// Components/SignUp.js

import React from 'react'
import { View, Text, TextInput, Button, Dimensions} from 'react-native'
import { SiginAPatientWithApi } from '../../API/APIConnection'

class SignIn extends React.Component {
	static navigationOptions = {
		headerStyle: {backgroundColor: '#58b57d'},
		title: 'Inscription',
	  	headerTintColor: 'white'
	}
	constructor(props) {
		super(props)
		this.state = { fname: "", lname: "", mail: "", password: "", rePassword: "" , isInvalid: false, errorText: ''}
	}

	//checklogin est la focntion appelé sur le onpress du bouton bleu
	checkSingIn() {
		let { navigate } = this.props.navigation;
		//si l'un des deux est vide pas de passage à home
		if (this.state.fname == "" || this.state.lname == "" || this.state.mail == "" || this.state.password == "" ||
			this.state.rePassword == "" || this.state.password != this.state.rePassword) {
		    this.setState({ isInvalid: true, errorText: "Problème entrée de donnée"  })
		    return;
		}

		SiginAPatientWithApi(this.state.fname, this.state.lname, this.state.mail, this.state.password).then(data => {
		let token = data.login_token

		if (token)
			navigate('Login')
		else {
			var tabErrors = data.errors
			this.setState({ isInvalid: true, errorText: "Problème de connection" })
			return;
		}
		});
	}

	setFName = (text) => {
		this.setState({ fname: text })
	}

	setLName = (text) => {
		this.setState({ lname: text })
	}

	setMail = (text) => {
		this.setState({ mail: text })
	}

	setPassword = (text) => {
		this.setState({ password: text })
	} 

	setRePassword = (text) => {
	    this.setState({ rePassword: text})
	}

	set = (object, value) => {
		this.setState({ object : value });
	}

  render() {
    let { navigate } = this.props.navigation;
    let deviceWidth = Dimensions.get('window').width
    let errorText = "mauvais mot de passe ou addresse mail"
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'white'}}>
	<Text style={{fontSize: 24}}>Inscription{"\n"}</Text>

	 <TextInput
		placeholder="Prénom"
		style={{ height: 40, width: deviceWidth / 3 * 2, borderBottomWidth: 1}}
		onChangeText={(text) => this.setFName(text)}
		value={this.fname}
	/>
	<Text>{"\n"}</Text>
	<TextInput
		placeholder="Nom"
		style={{ height: 40, width: deviceWidth / 3 * 2, borderBottomWidth: 1}}
		onChangeText={(text) => this.setLName(text)}
		value={this.lname}
	/>
	<Text>{"\n"}</Text>
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
	<TextInput
		placeholder="Confirmer mot de passe"
		style={{ height: 40, width: deviceWidth / 3 * 2, borderBottomWidth: 1}}
		onChangeText={(text) => this.setRePassword(text)}
		value={this.rePassword}
	/>
	<Text>{"\n"}</Text>
	<Button 
		color="#62BE87"
		onPress={() => this.checkSingIn()} 
		title="S'inscrire"
		/*title="SI T'APPUIS SUR CE BOUTON CA DOIT SIGNUP LE GARS ET APRES CA REDIRECT LOGIN"*/
	/>
	<Text>{"\n"}</Text>
	<Button 
		color="#62BE87"
		onPress={() => navigate('Login')} 
		title="J'ai deja un compte"
		/*title="Je ne déjà inscrit => ALLEZ SUR SIGNIN"*/
	/>
	<Text>{"\n"}</Text>
	{ this.state.isInvalid && <Text style={{color: 'red'}}>{this.state.rrorText}</Text>}
      </View>
    )
  }
}

export default SignIn;