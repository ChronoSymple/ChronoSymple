// Components/SignUp.js

import React from 'react'
import { View, Text, TextInput, Button, ImageBackground, Picker, ToastAndroid} from 'react-native'
import { SiginAPatientWithApi } from '../../API/APIConnection'
import { styles, colors, windowSize } from '../StyleSheet'
import { connect } from 'react-redux';
import { saveUserToken } from '../../Redux/Action/action';
import { ScrollView } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import PasswordInputText from 'react-native-hide-show-password-input';


class SignIn extends React.Component {
	static navigationOptions = {
		headerStyle: {backgroundColor: '#58b57d'},
		title: 'Inscription',
		headerTintColor: 'white',
		date:"2016-05-15"
	}
	constructor(props) {
		super(props)
		this.state = { 
			fname: "",
			lname: "",
			mail: "",
			password: "",
			rePassword: "",
			Gender: "femme",
			GenderString: "",
			phoneNumber: "",
			PickerDay: "Jour",
			PickerMonth: "Mois",
			PickerYear: "Année",
			phoneNumberFocused: false,
			fnameFocused: false,
			lnameFocused: false,
			emailFocused: false,
			passwordFocused: false,
			rePasswordFocused: false,
			genderFocused: false,
			isInvalid: false,
			textFiledFocusColor: colors.primary,
			errorMessage: "La requête de connexion n'a pas aboutis, veuillez rééssayer"
		}
	}

	_signInAsync = (oui) => {
		this.props.saveUserToken(oui)
		    .then(() => {
			this.props.navigation.navigate('AccountValidation');
		    })
		    .catch((error) => {
			this.setState({ error })
		    })
	};
	
	verification = () => {
		if (this.state.fname == "") {
			this.setState({ errorMessage: "Le champ \"Nom\" n'a pas été indiqué" })
			return false
		}
		else if (this.state.Gender == "") {
			this.setState({ errorMessage: "Le genre doit être indiqué" })
			return false
		}
		else if (this.state.Gender == "personnalisé" && this.state.Gender != "" ) {
			this.setState({ Gender: this.state.GenderString })
			return false
		}
		else if (this.state.PickerDay == "à") {
			this.setState({ errorMessage: "Le champ \"Jour\" dans \"Date de naissance\" n'a pas été indiqué" })
			return false
		}
		else if (this.state.PickerMonth == "0") {
			this.setState({ errorMessage: "Le champ \"Mois\" dans \"Date de naissance\" n'a pas été indiqué" })
			return false
		}
		else if (this.state.PickerYear == "0") {
			this.setState({ errorMessage: "Le champ \"Année\" dans \"Date de naissance\" n'a pas été indiqué" })
			return false
		}
		else if (this.state.lname == "") {
			this.setState({ errorMessage: "Le champ \"Prénom#\" n'a pas été indiqué" })
			return false
		}
		else if (this.state.mail == "" ) {
			this.setState({ errorMessage: "Le champ \"E-mmil\" n'a pas été indiqué" })
			return false
		}
		else if (this.state.password == "" ) {
			this.setState({ errorMessage: "Le champ \"Mot de passe\" n'a pas été indiqué" })
			return false
		}
		else if (this.state.rePassword == "" ) {
			this.setState({ errorMessage: "Le mot de passe doit être indiqué deux fois" })
			return false
		}
		return true
	}

	checkSignIn = () => {
		let { navigate } = this.props.navigation;
		if (!this.verification()) {
			this.setState({ isInvalid: true})
			return;
		}
		if (this.state.password != this.state.rePassword) {
			this.setState({ errorMessage: "Les deux mots de passe ne sont pas identiques" })
		}
		birthDate = this.state.PickerDay + "/" + this.state.PickerMonth + "/" + this.state.PickerYear;
		SiginAPatientWithApi(this.state.fname, this.state.lname, this.state.mail, this.state.password, this.state.Gender, birthDate, this.state.phoneNumber).then(async data => {
			if (data.status == 201) {
				let response = await data.json()
				this._signInAsync(response.login_token)
				if (response.login_token !== null) {
					navigate('AccountValidation')
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

	setGender = (text) => {
	    this.setState({ GenderString: text})
	}

	setPhoneNumber = (text) => {
	    this.setState({ phoneNumber: text})
	}


	textFieldFocused = (state) => {
		this.setState({[state]: true})
	}

	textFieldBlured = (state) => {
		this.setState({[state]: false})
	}

	showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true });
	};
	 
	hideDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: false });
	};
	 
	handleDatePicked = date => {
		var date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
		this.setState({ date: date });
		this.hideDateTimePicker();
	}

	clickme=()=>{
		alert(this.state.PickerValue)
	}

	render() {
		const { checked } = this.state;
		let { navigate } 		= this.props.navigation;
		let placeholder_fname 		= "Prénom";
		let placeholder_lname 		= "Nom";
		let placeholder_email 		= "E-mail";
		let placeholder_password 	= "Mot de passe";
		let placeholder_rePassword 	= "Vérification du mot de passe";
		let placeholder_gender 	= "Genre (facultatif)";
		let placeholder_phoneNumber 	= "Numéro de téléphone (facultatif)";
		let subscribe 			= "J'ai déjà un compte";
		let SignIn 			= "S'inscrire";
		let fnameFocused 		= "fnameFocused";
		let lnameFocused 		= "lnameFocused";
		let emailFocused 		= "emailFocused";
		let passwordFocused 		= "passwordFocused"
		let rePasswordFocused 		= "rePasswordFocused"
		let genderFocused 		= "genderFocused"
		let phoneNumberFocused = "phoneNumberFocused"
		var Gender = [
			{label: "Femme", value: "femme"},
			{label: "Homme", value: "homme"},
			{label: "Personnalisé", value: "personnalisé"}
		]
		return (
			<ImageBackground source={require("./../../assets/photo-1532274402911-5a369e4c4bb5.jpeg")} style={{width: '100%', height: '100%'}}>
    				<View style={[styles.AuthMainContainer, styles.SigninMainContainer]}>
	      				<View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
					      	<View style={{flex: 0.25}}></View>
						<View style={{ flex: 1, justifyContent: "center"}}>
							<Text style={styles.label}>INSCRIPTION</Text>
						</View>
						<View style={{flex: 0.25}}></View>
	      				<View style={{ flex: 6, justifyContent: "center", alignCOntent: 'center'}}>
							<ScrollView>
								<TextInput
									onBlur={() => this.textFieldBlured(lnameFocused)}
									onFocus={() => this.textFieldFocused(lnameFocused)}
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
								<View style={{ flex: 1, justifyContent: "center"}}>
									<Text style={{ fontSize: 18 }}>Date de naissance</Text>
								</View>
								<View style={{justifyContent: "center", alignCOntent: 'center', flexDirection: "column"}}>
									<Picker
									selectedValue={this.state.PickerDay}
									onValueChange={(itemvalue, itemIndex) => this.setState({PickerDay: itemvalue})}
									style={{flex:3, borderRadius: 15, borderWidth: 3, borderColor: colors.secondary}}
									>
										<Picker.Item label="Jour" value="0"/>
										<Picker.Item label="1" value="1"/>
										<Picker.Item label="2" value="2"/>
										<Picker.Item label="3" value="3"/>
										<Picker.Item label="4" value="4"/>
										<Picker.Item label="5" value="5"/>
										<Picker.Item label="6" value="6"/>
										<Picker.Item label="7" value="7"/>
										<Picker.Item label="8" value="8"/>
										<Picker.Item label="9" value="9"/>
										<Picker.Item label="10" value="10"/>
										<Picker.Item label="11" value="11"/>
										<Picker.Item label="12" value="12"/>
										<Picker.Item label="13" value="13"/>
										<Picker.Item label="14" value="14"/>
										<Picker.Item label="15" value="15"/>
										<Picker.Item label="16" value="16"/>
										<Picker.Item label="17" value="17"/>
										<Picker.Item label="18" value="18"/>
										<Picker.Item label="19" value="19"/>
										<Picker.Item label="20" value="20"/>
										<Picker.Item label="21" value="21"/>
										<Picker.Item label="22" value="22"/>
										<Picker.Item label="23" value="23"/>
										<Picker.Item label="24" value="24"/>
										<Picker.Item label="25" value="25"/>
										<Picker.Item label="26" value="26"/>
										<Picker.Item label="27" value="27"/>
										<Picker.Item label="28" value="28"/>
										<Picker.Item label="29" value="29"/>
										<Picker.Item label="30" value="30"/>
										<Picker.Item label="31" value="31"/>
									</Picker>
									<Picker
									selectedValue={this.state.PickerMonth}
									onValueChange={(itemvalue, itemIndex) => this.setState({PickerMonth: itemvalue})}
									style={{flex:3}}
									>
										<Picker.Item label="Mois" value="0"/>
										<Picker.Item label="Janvier" value="1"/>
										<Picker.Item label="Février" value="2"/>
										<Picker.Item label="Mars" value="3"/>
										<Picker.Item label="Avril" value="4"/>
										<Picker.Item label="Mai" value="5"/>
										<Picker.Item label="Juin" value="6"/>
										<Picker.Item label="Juillet" value="7"/>
										<Picker.Item label="Aout" value="8"/>
										<Picker.Item label="Septembre" value="9"/>
										<Picker.Item label="Octobre" value="10"/>
										<Picker.Item label="Novembre" value="11"/>
										<Picker.Item label="Décembre" value="12"/>
									</Picker>
									<Picker
									selectedValue={this.state.PickerYear}
									onValueChange={(itemvalue, itemIndex) => this.setState({PickerYear: itemvalue})}
									style={{flex:3}}
									>
										<Picker.Item label="Année" value="0"/>
										<Picker.Item label="2019" value="2019"/>
										<Picker.Item label="2018" value="2018"/>
										<Picker.Item label="2017" value="2017"/>
										<Picker.Item label="2016" value="2016"/>
										<Picker.Item label="2015" value="2015"/>
										<Picker.Item label="2014" value="2014"/>
										<Picker.Item label="2013" value="2013"/>
										<Picker.Item label="2012" value="2012"/>
										<Picker.Item label="2011" value="2011"/>
										<Picker.Item label="2009" value="2009"/>
										<Picker.Item label="2008" value="2008"/>
										<Picker.Item label="2007" value="2007"/>
										<Picker.Item label="2006" value="2006"/>
										<Picker.Item label="2005" value="2005"/>
										<Picker.Item label="2004" value="2004"/>
										<Picker.Item label="2003" value="2003"/>
										<Picker.Item label="2002" value="2002"/>
										<Picker.Item label="2001" value="2001"/>
										<Picker.Item label="2000" value="2000"/>
										<Picker.Item label="1999" value="1999"/>
										<Picker.Item label="1998" value="1998"/>
										<Picker.Item label="1997" value="1997"/>
										<Picker.Item label="1996" value="1996"/>
										<Picker.Item label="1995" value="1995"/>
										<Picker.Item label="1994" value="1994"/>
										<Picker.Item label="1993" value="1993"/>
										<Picker.Item label="1992" value="1992"/>
										<Picker.Item label="1991" value="1991"/>
										<Picker.Item label="1990" value="1990"/>
										<Picker.Item label="1989" value="1989"/>
										<Picker.Item label="1988" value="1988"/>
										<Picker.Item label="1987" value="1987"/>
										<Picker.Item label="1986" value="1986"/>
										<Picker.Item label="1985" value="1985"/>
										<Picker.Item label="1984" value="1984"/>
										<Picker.Item label="1983" value="1983"/>
										<Picker.Item label="1982" value="1982"/>
										<Picker.Item label="1981" value="1981"/>
										<Picker.Item label="1980" value="1980"/>
										<Picker.Item label="1979" value="1979"/>
										<Picker.Item label="1978" value="1978"/>
										<Picker.Item label="1977" value="1977"/>
										<Picker.Item label="1976" value="1976"/>
										<Picker.Item label="1975" value="1975"/>
										<Picker.Item label="1974" value="1974"/>
										<Picker.Item label="1973" value="1973"/>
										<Picker.Item label="1972" value="1972"/>
										<Picker.Item label="1971" value="1971"/>
										<Picker.Item label="1970" value="1970"/>
										<Picker.Item label="1969" value="1969"/>
										<Picker.Item label="1968" value="1968"/>
										<Picker.Item label="1967" value="1967"/>
										<Picker.Item label="1966" value="1966"/>
										<Picker.Item label="1965" value="1965"/>
										<Picker.Item label="1964" value="1964"/>
										<Picker.Item label="1963" value="1963"/>
										<Picker.Item label="1962" value="1962"/>
										<Picker.Item label="1961" value="1961"/>
										<Picker.Item label="1960" value="1960"/>
										<Picker.Item label="1959" value="1959"/>
										<Picker.Item label="1958" value="1958"/>
										<Picker.Item label="1957" value="1957"/>
										<Picker.Item label="1956" value="1956"/>
										<Picker.Item label="1955" value="1955"/>
										<Picker.Item label="1954" value="1954"/>
										<Picker.Item label="1953" value="1953"/>
										<Picker.Item label="1952" value="1952"/>
										<Picker.Item label="1951" value="1951"/>
										<Picker.Item label="1950" value="1950"/>
										<Picker.Item label="1949" value="1949"/>
										<Picker.Item label="1948" value="1948"/>
										<Picker.Item label="1947" value="1947"/>
										<Picker.Item label="1946" value="1946"/>
										<Picker.Item label="1945" value="1945"/>
										<Picker.Item label="1944" value="1944"/>
										<Picker.Item label="1943" value="1943"/>
										<Picker.Item label="1942" value="1942"/>
										<Picker.Item label="1941" value="1941"/>
										<Picker.Item label="1940" value="1940"/>
										<Picker.Item label="1939" value="1939"/>
										<Picker.Item label="1938" value="1938"/>
										<Picker.Item label="1937" value="1937"/>
										<Picker.Item label="1936" value="1936"/>
										<Picker.Item label="1935" value="1935"/>
										<Picker.Item label="1934" value="1934"/>
										<Picker.Item label="1933" value="1933"/>
										<Picker.Item label="1932" value="1932"/>
										<Picker.Item label="1931" value="1931"/>
										<Picker.Item label="1930" value="1930"/>
										<Picker.Item label="1929" value="1929"/>
										<Picker.Item label="1928" value="1928"/>
										<Picker.Item label="1927" value="1927"/>
										<Picker.Item label="1926" value="1926"/>
										<Picker.Item label="1925" value="1925"/>
										<Picker.Item label="1924" value="1924"/>
										<Picker.Item label="1923" value="1923"/>
										<Picker.Item label="1922" value="1922"/>
										<Picker.Item label="1921" value="1921"/>
										<Picker.Item label="1920" value="1920"/>
										<Picker.Item label="1919" value="1919"/>
										<Picker.Item label="1918" value="1918"/>
										<Picker.Item label="1917" value="1917"/>
										<Picker.Item label="1916" value="1916"/>
										<Picker.Item label="1915" value="1915"/>
										<Picker.Item label="1914" value="1914"/>
										<Picker.Item label="1913" value="1913"/>
										<Picker.Item label="1912" value="1912"/>
										<Picker.Item label="1911" value="1911"/>
										<Picker.Item label="1910" value="1910"/>
										<Picker.Item label="1909" value="1909"/>
										<Picker.Item label="1908" value="1908"/>
										<Picker.Item label="1907" value="1907"/>
										<Picker.Item label="1906" value="1906"/>
										<Picker.Item label="1905" value="1905"/>
									</Picker>
								</View>
								<View  style={{justifyContent:"center", alignCOntent: 'center', flexDirection: "row", marginTop: 15, marginBottom: 15}}>
									<RadioForm
										radio_props={Gender}
										initiale={1}
										onPress={(value) => this.setState({Gender: value})}
										buttonSize={15}
										labelSize={15}
										formHorizontal={true}
										labelHorizontal={false}
										selectedButtonColor={colors.secondary}
										buttonColor={colors.primary}
										animation={true}
									/>
								</View>
								<View>
									{this.state.Gender == "personnalisé" && 
									<TextInput
										onFocus={() => this.textFieldFocused(genderFocused)}
										onBlur={() => this.textFieldBlured(genderFocused)}
										placeholder={placeholder_gender}
										style={[this.state[genderFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5 }]}
										autoCorrect={false}
										onChangeText={(text) => this.setGender(text)}
										value={this.GenderString}
									/>}
								</View>
								<TextInput
									onFocus={() => this.textFieldFocused(phoneNumberFocused)}
									onBlur={() => this.textFieldBlured(phoneNumberFocused)}
									placeholder={placeholder_phoneNumber}
									style={[this.state[phoneNumberFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5 }]}
									autoCorrect={false}
									onChangeText={(text) => this.setPhoneNumber(text)}
									value={this.phoneNumber}
									pattern="[0-9]{10}"
									keyboardType="numeric"
								/>
								<PasswordInputText
									label={placeholder_password}
									value={this.state.password}
									onChangeText={ (password) => this.setState({ password }) }
								/>
								<PasswordInputText
									label={placeholder_rePassword}
									value={this.state.rePassword}
									onChangeText={ (rePassword) => this.setState({ rePassword }) }
								/>
							</ScrollView>
						</View>
						<View style={{ flex: 1, justifyContent: "center"}}>
							{this.state.isInvalid && <Text style={{ color: colors.errorColor }}>{this.state.errorMessage}</Text>}
						</View>
						<View style={{ flex: 1, justifyContent: "center"}}>
							<Button 
								color={colors.secondary}
								onPress={() => navigate('Login')}
								title={subscribe}
							/>
						</View>
						<View style={{ flex: 1, justifyContent: "center"}}>
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