import React from 'react'
import { View, Text, Button, TextInput, ScrollView, BackHandler} from 'react-native'
import { LoginAPatientWithApi } from '../../API/APIConnection'
import { styles, colors, windowSize } from '../StyleSheet'
import { connect } from 'react-redux';
import { APIAddPatientNotes } from '../../API/APIModule'
import { getUserToken } from '../../Redux/Action/action';

class Note extends React.Component {

	constructor(props) {
		super(props)
		this.state = { 
			glycemie: "", 
			glucide: "", 
			insulineavrepas: "", 
			Insulineaprepas: "", 
			insulineajeun: "", 
			date: "", 
			heure: "", 
			isInvalid: false,
			textFiledFocusColor: colors.primary,
			glycemieFocused: false,
			glucideFocused: false,
			insulineavrepasFocused: false,
			InsulineaprepasFocused: false,
			insulineajeunFocused: false
		}
	}

	_bootstrapAsync = () => {
		let { navigate } = this.props.navigation;
		var now =  new Date()
		var annee   = now.getFullYear();
		var month    = now.getMonth() + 1;
		var jour    = now.getDate();
		var heure   = now.getHours();
		var minute  = now.getMinutes();
		var seconde = now.getSeconds();
		var date = jour + '/' + month + '/' + annee
		var horaire = heure + 'h' + minute + 'm' + seconde + 's'
		let myTab = {
			"Glycemie": this.state.glycemie,
			"Glucide": this.state.glucide,
			"InsulineAvRepas": this.state.insulineavrepas,
			"InsulineApRepas": this.state.Insulineaprepas,
			"InsulineAJeun": this.state.insulineajeun,
			"date": date,
			"heure": horaire
		}
		this.props.getUserToken().then(() => {
			APIAddPatientNotes(this.props.token.token, myTab, this.props.idCurrentModule).then(data => {
				if (data.status == 200)
					this.setState({ isSend: true })
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	setGlicemie = (text) => {
		this.setState({ glycemie: text })
	}

	setGlucide = (text) => {
		this.setState({ glucide: text })
	}

	setInsulineavrepas = (text) => {
		this.setState({ insulineavrepas: text })
	}

	setInsulineaprepas = (text) => {
		this.setState({ Insulineaprepas: text })
	} 

	setInsulineajeun = (text) => {
	    this.setState({ insulineajeun: text})
	}

	textFieldFocused = (state) => {
		this.setState({[state]: true})
	}

	textFieldBlured = (state) => {
		this.setState({[state]: false})
	}

  	render() {
		let { navigate } = this.props.navigation;
		let placeholder_glycemie			= "Taux de glycemie";
		let placeholder_insulineavrepas 	= "Taux d'insuline av.repas";
		let placeholder_Insulineaprepas 	= "Taux d'insuline ap.repas";
		let placeholder_insulineajeun	 	= "Taux d'insuline à jeun";
		let Add 							= "Sauvegarder la note";
		let errorMessage 					= "Ne message n'a pas été envoyé";
		let glycemieFocused					= "glycemieFocused";
		let glucideFocused					= "glucideFocused";
		let insulineavrepasFocused			= "insulineavrepasFocused";
		let InsulineaprepasFocused			= "InsulineaprepasFocused";
		let insulineajeunFocused			= "insulineajeunFocused";

    		return (
    			<ScrollView style={{justifyContent: "center", alignItems: "center"}}>
	      				<View style={{ flex: 3, justifyContent: "center", alignCOntent: 'center'}}>
						<TextInput
							onFocus={() => this.textFieldFocused(glycemieFocused)}
							onBlur={() => this.textFieldBlured(glycemieFocused)}
							placeholder={placeholder_glycemie}
							style={[this.state[glycemieFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5 }]}
							autoCorrect={false}
							onChangeText={(text) => this.setGlicemie(text)}
							value={this.mail}
						/>
						<TextInput
							onFocus={() => this.textFieldFocused(insulineavrepasFocused)}
							onBlur={() => this.textFieldBlured(insulineavrepasFocused)}
							placeholder={placeholder_insulineavrepas}
							style={[this.state[insulineavrepasFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5 }]}
							autoCorrect={false}
							onChangeText={(text) => this.setInsulineavrepas(text)}
							value={this.mail}
						/>
						<TextInput
							onFocus={() => this.textFieldFocused(InsulineaprepasFocused)}
							onBlur={() => this.textFieldBlured(InsulineaprepasFocused)}
							placeholder={placeholder_Insulineaprepas}
							style={[this.state[InsulineaprepasFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5 }]}
							autoCorrect={false}
							onChangeText={(text) => this.setInsulineaprepas(text)}
							value={this.mail}
						/>
						<TextInput
							onFocus={() => this.textFieldFocused(insulineajeunFocused)}
							onBlur={() => this.textFieldBlured(insulineajeunFocused)}
							placeholder={placeholder_insulineajeun}
							style={[this.state[insulineajeunFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5 }]}
							autoCorrect={false}
							onChangeText={(text) => this.setInsulineajeun(text)}
							value={this.mail}
						/>
					</View>
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
							{this.state.isInvalid && <Text style={{ color: colors.errorColor }}>{errorMessage}</Text>}
					</View>
					<View style={{flex: 0.5}}></View>
					<View style={{ flex: 1, justifyContent: "center"}}>
						<Button 
							color={colors.primary}
							onPress={() => this._bootstrapAsync()}
							title={Add}
						/>
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
	getUserToken: (oui1) => dispatch(getUserToken(oui1)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);