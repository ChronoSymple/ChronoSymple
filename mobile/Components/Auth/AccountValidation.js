import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken, getUserAccountValid, saveUserAccountValid } from '../../Redux/Action/action';
import { colors, windowSize } from '../StyleSheet';
import { confirmPatientEmail } from '../../API/APIConnection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from "react-native-flash-message";


class AccountValidation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mail: "",
			password: "",
			matchCode: this.props.navigation.getParam("matchCode"),
			code: "",
			isInvalid: false,
			textFiledFocusColor: colors.primary,
			passwordFocused: false,
			codeFocused: false
		}
		this.props.getUserAccountValid().then(() => {
			let accountInfo = this.props.accountValid.accountValid.split(",")
			this.setState({ mail: accountInfo[0], password: accountInfo[1]})
		})
		this.props.getUserToken().then(() => {
		})


	}

	checkCodeValidation = () => {
		/*console.log("user Code:")
		console.log(this.state.code)
		console.log("matchCode:")
		console.log(this.state.matchCode)*/
		console.log(this.state.code)
		console.log(this.state.matchCode)
		if (this.state.code == this.state.matchCode) {
			this.props.saveUserAccountValid("true").then(() => {
				console.log("CODE CONFIRMED !!")
				console.log(this.props)
				this.props.navigation.navigate("Home")
			})
		} else {
			this.setCode("")
			showMessage({
				message: "Le code saisie est incorrect",
				type: "danger"
			});
		}
		/*this.props.navigation.navigate('Home');*/
	}

	resendCode = () => {
		confirmPatientEmail(this.state.mail, this.state.password, this.props.token.token).then(async data => {
			console.log(data)
			if (data.status == 200) {
				let response = await data.json()
				console.log(response)
				showMessage({
						message: "Le code a bien été envoyé a l'adresse mail: " + this.state.mail,
						type: "success"
					});	
				this.setState({ matchCode: response.confirmation_token })
			}
		})
	}

	setCode = (text) => {
		this.setState({ code: text })
	}

	textFieldFocused = (state) => {
		this.setState({[state]: true})
	}

	textFieldBlured = (state) => {
		this.setState({[state]: false})
	}

	render() {
		let { navigate } 			= this.props.navigation;
		let login 					= "Valider le code";
		let errorMessage 			= "Mauvais code de validation";
		let codeFocused 			= "codeFocused";
		let passwordFocused 		= "passwordFocused"

		return (
        <View style={styles.container}>
			<View style={{ flex: 2}}>
				<TouchableHighlight style={{margin: 10}}>
					<Icon
						name="clear"
						color="#62BE87"
						size={35}
						onPress={() => navigate("Home")}
					/>
				</TouchableHighlight>
			</View>
			<View style={{ flex: 3, justifyContent: "center", alignItems: "center"}}>
				<View style={{ flex: 2}}></View>
            	<Text style={{ flex: 2, fontSize: 25}}>
            	    CODE DE VALIDATION
            	</Text>
				<View style={{ flex: 2}}></View>
        		<TextInput
            	    onFocus={() => this.textFieldFocused(codeFocused)}
            	    onBlur={() => this.textFieldBlured(codeFocused)}
            	    style={[this.state[codeFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5, borderWidth: 2, borderColor: "white", borderBottomColor: colors.secondary}]}
            	    autoCorrect={true}
            	    onChangeText={(text) => this.setCode(text)}
            	    value={this.state.code}
            	/>
				<View style={{ flex: 2}}></View>
			</View>
			<View  style={{ flex: 3, justifyContent: 'center'}}>
				<View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
					{this.state.isInvalid && <Text style={{ color: colors.errorColor }}>{errorMessage}</Text>}
				</View>
				<View style={{ flex: 2, justifyContent: "center"}}>
					<Button 
						color={colors.primary}
						onPress={() => this.checkCodeValidation()}
						title={login}
					/>
				</View>
				<View style={{flex: 2}}>
	            	<Text style={{ width: windowSize.x / 2}}>
	            	    Vous n'avez pas reçu d'email,
	            	</Text>
					<TouchableOpacity onPress={() => this.resendCode()} style={{}}>
						<View style={{}}>
							<Text style={{padding: 5, color: colors.secondary }}> Renvoyez-moi un email ! </Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ flex: 2}}></View>
        </View>
		)
    }
}

{/*  <View style={styles.container}>
	 <ActivityIndicator size='large' color='white' />
 </View> */}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

})

const mapStateToProps = state => ({
	token: state.token,
	accountValid: state.accountValid,
});


const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserAccountValid: () => dispatch(getUserAccountValid()),
	saveUserAccountValid: (data) => dispatch(saveUserAccountValid(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountValidation);