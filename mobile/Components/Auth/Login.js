import React from 'react'
import { ScrollView, View, Text, Button, TextInput, ImageBackground, BackHandler } from 'react-native'
import { LoginAPatientWithApi } from '../../API/APIConnection'
import { styles, colors, windowSize } from '../StyleSheet'
import { connect } from 'react-redux';
import { saveUserToken } from '../../Redux/Action/action';
import { showMessage } from "react-native-flash-message";


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
			} else if (data.status == 401) {
				this.setState({ isInvalid: true, errorText: "Problème de connection" })
				showMessage({
					message: "Votre adresse mail ou mot de passe est incorrect",
					type: "danger"
				});
			} else {
				showMessage({
					message: "Une erreur est survenue. Recommencez. Si le probleme persiste contactez nous.",
					type: "danger"
				});
			}
		});
	}

	setMail = (text) => {
		this.setState({ mail: text.trim() })
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
			<ScrollView
			contentContainerStyle={{height: windowSize.y * 0.9}} 
			centerContent={true} 
			style={{flex: 1, backgroundColor: '#44808A' }}
			>
				<View style={[styles.AuthMainContainer, styles.LoginMainContainer]}>

      				<View style={{ width: windowSize.x * 0.8, flex: 1, justifyContent: "center", alignItems: "center"}}>
						
						<Text style={{
							margin: 20,
							marginTop: 40,
							fontSize: 25,
							fontWeight: 'bold',
							color: "grey"
						}}>
							CONNECTION
						</Text>

      					<View style={{ flex: 3, justifyContent: "center", alignCOntent: 'center', alignSelf:'stretch', padding: 40}}>
      						<View style={{flex: 1}}>
								<TextInput
									onFocus={() => this.textFieldFocused(emailFocused)}
									onBlur={() => this.textFieldBlured(emailFocused)}
									placeholder={placeholder_email}
									autoCorrect={false}
									style={{borderBottomWidth: 1, borderColor: 'grey'}}
									onChangeText={(text) => this.setMail(text)}
									value={this.mail}
								/>	
							</View>

      						<View style={{flex: 1}}>
								<TextInput
									onFocus={() => this.textFieldFocused(passwordFocused)}
									onBlur={() => this.textFieldBlured(passwordFocused)}
									secureTextEntry={true}
									label="mot de passe"
									autoCorrect={false}
									style={{borderBottomWidth: 1, borderColor: 'grey'}}
									value={this.state.password}
									onChangeText={ (password) => this.setState({ password }) }
									placeholder={placeholder_password}
								/>
							</View>
							{
								this.state.isInvalid && 
								<View style={{ padding: 20, flex: 1, justifyContent: "center", alignItems: "center"}}>
									<Text style={{ color: colors.errorColor, textAlign: 'center'}}>
										{errorMessage}
									</Text>
								</View>
							}
						</View>


						<View style={{flex: 2}}>
							<View style={{flex: 1, justifyContent: "center"}}>
								<Button 
									color={colors.secondary}
									onPress={() => navigate('SignIn')}
									title={notSubscribe}
								/>
							</View>

							<View style={{flex: 1, justifyContent: "center", marginBottom: 20}}>
								<Button 
									color={colors.primary}
									onPress={() => this.checkLogin()}
									title={login}
								/>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
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