// Components/SignUp.js

import React from 'react'
import { View, Text, TextInput, Button, ImageBackground} from 'react-native'
import { SiginAPatientWithApi } from '../../API/APIConnection'
import { styles, colors, windowSize } from '../StyleSheet'
import { connect } from 'react-redux';
import { saveUserToken } from '../../Redux/Action/action';

class SignIn extends React.Component {
	static navigationOptions = {
		headerStyle: {backgroundColor: '#58b57d'},
		title: 'Inscription',
	  	headerTintColor: 'white'
	}
	constructor(props) {
		super(props)
		this.state = { 
			fname: "",
			lname: "",
			mail: "",
			password: "",
			rePassword: "",
			fnameFocused: false,
			lnameFocused: false,
			emailFocused: false,
			passwordFocused: false,
			rePasswordFocused: false,
			isInvalid: false,
			textFiledFocusColor: colors.primary,
		}
	}

	_signInAsync = (oui) => {
		this.props.saveUserToken(oui)
		    .then(() => {
			this.props.navigation.navigate('Home');
		    })
		    .catch((error) => {
			this.setState({ error })
		    })
	};
	
	checkSignIn = () => {
		let { navigate } = this.props.navigation;
		SiginAPatientWithApi(this.state.fname, this.state.lname, this.state.mail, this.state.password).then(async data => {
			console.log(data.status)
			if (data.status == 201) {
				let response = await data.json()
				this._signInAsync(response.login_token)
				if (response.login_token !== null) {
					navigate('Home')
				}
				else {
					navigate('SignIn')
				}
			}
			else {
				this.setState({ isInvalid: true})
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

	textFieldFocused = (state) => {
		this.setState({[state]: true})
	}

	textFieldBlured = (state) => {
		this.setState({[state]: false})
	}

	render() {
		let { navigate } 		= this.props.navigation;
		let placeholder_fname 		= "Prénom";
		let placeholder_lname 		= "Nom";
		let placeholder_email 		= "E-mail";
		let placeholder_password 	= "Mot de passe";
		let placeholder_rePassword 	= "Vérification du mot de passe";
		let subscribe 			= "J'ai déjà un compte";
		let SignIn 			= "S'inscrire";
		let errorMessage 		= "Problème avec les données rentrées";
		let fnameFocused 		= "fnameFocused";
		let lnameFocused 		= "lnameFocused";
		let emailFocused 		= "emailFocused";
		let passwordFocused 		= "passwordFocused"
		let rePasswordFocused 		= "rePasswordFocused"
		return (
			<ImageBackground source={require("./../../assets/photo-1532274402911-5a369e4c4bb5.jpeg")} style={{width: '100%', height: '100%'}}>
    				<View style={[styles.AuthMainContainer, styles.SigninMainContainer]}>
	      				<View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
					      	<View style={{flex: 0.25}}></View>
						<View style={{ flex: 1, justifyContent: "center"}}>
							<Text style={styles.label}>INSCRIPTION</Text>
						</View>
						<View style={{flex: 0.25}}></View>
	      					<View style={{ flex: 5, justifyContent: "center", alignCOntent: 'center'}}>
							<TextInput
								onFocus={() => this.textFieldFocused(lnameFocused)}
								onBlur={() => this.textFieldBlured(lnameFocused)}
								placeholder={placeholder_lname}
								style={[this.state[lnameFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5 }]}
								autoCorrect={false}
								onChangeText={(text) => this.setLName(text)}
								value={this.lname}
							/>
						      	<TextInput
								onFocus={() => this.textFieldFocused(fnameFocused)}
								onBlur={() => this.textFieldBlured(fnameFocused)}
								placeholder={placeholder_fname}
								style={[this.state[fnameFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5 }]}
								autoCorrect={false}
								onChangeText={(text) => this.setFName(text)}
								value={this.fname}
							/>
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
							<TextInput
								onFocus={() => this.textFieldFocused(rePasswordFocused)}
								onBlur={() => this.textFieldBlured(rePasswordFocused)}
								secureTextEntry={true}
								placeholder={placeholder_rePassword}
								style={[this.state[rePasswordFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5 }]}
								autoCorrect={false}
								onChangeText={(text) => this.setRePassword(text)}
								value={this.password}
							/>
						</View>
						<View style={{ flex: 0.5, justifyContent: "center", alignItems: "center"}}>
								{this.state.isInvalid && <Text style={{ color: colors.errorColor }}>{errorMessage}</Text>}
						</View>
						<View style={{ flex: 1, justifyContent: "center", width: windowSize.x / 1.5}}>
							<Button 
								color={colors.secondary}
								onPress={() => navigate('Login')}
								title={subscribe}
							/>
						</View>
						<View style={{ flex: 1, justifyContent: "center", width: windowSize.x / 1.5}}>
							<Button 
								color={colors.primary}
								onPress={() => this.checkSignIn()}
								title={SignIn}
							/>
						</View>
						<View style={{flex: 0.25}}></View>
					</View>
				</View>
			</ImageBackground>
	)}
}

const mapStateToProps = state => ({
	token: state.token,
});

const mapDispatchToProps = dispatch => ({
	saveUserToken: (oui1) => dispatch(saveUserToken(oui1)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

{/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'white'}}>
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
			onPress={() => {}}
			onPress={() => this.checkSingIn()}
			title="S'inscrire"
			/*title="SI T'APPUIS SUR CE BOUTON CA DOIT SIGNUP LE GARS ET APRES CA REDIRECT LOGIN"
		/>
		<Text>{"\n"}</Text>
		<Button 
			color="#62BE87"
			onPress={() => navigate('Login')} 
			title="J'ai deja un compte"
			/*title="Je ne déjà inscrit => ALLEZ SUR SIGNIN"
		/>
		<Text>{"\n"}</Text>
		{ this.state.isInvalid && <Text style={{color: 'red'}}>{this.state.rrorText}</Text>}
	</View> */}