import React from 'react'
import { View, Text, Button, TextInput, ImageBackground, BackHandler } from 'react-native'
import { LoginAPatientWithApi } from '../../API/APIConnection'
import { styles, colors, windowSize } from '../StyleSheet'
import { connect } from 'react-redux';
import { saveUserToken } from '../../Redux/Action/action';

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

	_signInAsync = (token) => {
		this.props.saveUserToken(token)
		    .then(() => {
			this.props.navigation.navigate('Home');
		    })
		    .catch((error) => {
			this.setState({ error })
		    })
	};
	
	checkLogin = () => {
		let { navigate } = this.props.navigation;
		LoginAPatientWithApi(this.state.mail, this.state.password).then(async data => {
			if (data.status == 200) {
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
				this.setState({ isInvalid: true, errorText: "Problème de connection" })
			}
		});
	}

	setMail = (text) => {
		this.setState({ mail: text.trim() })
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
			<ImageBackground source={require("./../../assets/pexels-photo-247478.jpeg")} style={{width: '100%', height: '100%'}}>
    				<View style={[styles.AuthMainContainer, styles.LoginMainContainer]}>
	      				<View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
					      	<View style={{flex: 0.5}}></View>
						<View style={{ flex: 2, justifyContent: "center"}}>
							<Text style={styles.label}>CONNECTION</Text>
						</View>
						<View style={{flex: 0.5}}></View>
	      					<View style={{ flex: 3, justifyContent: "center", alignCOntent: 'center'}}>
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
						<View style={{ flex: 1, justifyContent: "center", width: windowSize.x / 1.5}}>
							<Button 
								color={colors.secondary}
								onPress={() => navigate('SignIn')}
								title={notSubscribe}
							/>
						</View>
						<View style={{flex: 0.5}}></View>
						<View style={{ flex: 1, justifyContent: "center", width: windowSize.x / 1.5}}>
							<Button 
								color={colors.primary}
								onPress={() => this.checkLogin()}
								title={login}
							/>
						</View>
						<View style={{flex: 0.25}}></View>
						<View style={{ flex: 1, justifyContent: "center", width: windowSize.x / 1.5 }}>
							<Text style={{textAlign: 'justify'}}>Vous avez oublié votre mot de passe cliquez ici ?</Text>
						</View>
						<View style={{flex: 0.5}}></View>
					</View>
				</View>
			</ImageBackground>
		)
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		BackHandler.exitApp();
		return true;
	}
}

const mapStateToProps = state => ({
	token: state.token,
});


const mapDispatchToProps = dispatch => ({
	saveUserToken: (token) => dispatch(saveUserToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);