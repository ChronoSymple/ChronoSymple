// Components/Note.js

import React from 'react'
import { View, Dimensions,  Text, TextInput, Button, Alert} from 'react-native'
import { connect } from 'react-redux'
import { APIAddPatientNotes } from '../API/APIModule'

class Note extends React.Component {
	constructor(props) {
		super(props)
		this.state = { glycemie: "", glucide: "", insulineavrepas: "", Insulineaprepas: "", insulineajeun: "", date: "", heure: "", isSend: false}
	}

	setPassword = (text) => { 
		this.setState({ password: text })
	}

	_addNote = () => {
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
		APIAddPatientNotes(this.props.token, myTab, this.props.idCurrentModule).then(data => {})
		this.setState({ isSend: true })
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

	render() {
		let deviceWidth = Dimensions.get('window').width
		let successMessage = "La note a bien été envoyé."
		return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Declaration de symptome{'\n\n\n'}</Text>
			<View style={{flexDirection: 'row', marginLeft: deviceWidth / 7, marginRight: deviceWidth / 7}}>
				<Text style={{flex: 1}}> Glycemie:</Text>
				<TextInput
				placeholder="Glycémie"
				style={{ flex: 1, height: 25, width: deviceWidth / 3, borderBottomWidth: 1}}
				onChangeText={(text) => this.setGlicemie(text)}
				value={this.glicemie}
			/>
			</View>
			<Text>{"\n"}</Text>
			<View style={{flexDirection: 'row', marginLeft: deviceWidth / 7, marginRight: deviceWidth / 7}}>
				<Text style={{flex: 1}}> Glucide:</Text>
				<TextInput
				placeholder="Glucide"
				style={{ flex: 1, height: 25, width: deviceWidth / 3, borderBottomWidth: 1}}
				onChangeText={(text) => this.setGlucide(text)}
				value={this.glucide}
			/>
			</View>
			<Text>{"\n"}</Text>
			<View style={{flexDirection: 'row', marginLeft: deviceWidth / 7, marginRight: deviceWidth / 7}}>
	        	<Text style={{flex: 1}}> Insuline av. repas</Text>
	        	<TextInput
				placeholder="Insuline av. repas:"
				style={{ flex: 1, height: 25, width: deviceWidth / 3, borderBottomWidth: 1}}
				onChangeText={(text) => this.setInsulineavrepas(text)}
				value={this.insulineavrepas}
			/>
			</View>
			<Text>{"\n"}</Text>
			<View style={{flexDirection: 'row', marginLeft: deviceWidth / 7, marginRight: deviceWidth / 7}}>
	        	<Text style={{flex: 1}}> Insuline ap. repas:</Text>
	        	<TextInput
				placeholder="Insuline ap. repas:"
				style={{ flex: 1, height: 25, width: deviceWidth / 3, borderBottomWidth: 1}}
				onChangeText={(text) => this.setInsulineaprepas(text)}
				value={this.Insulineaprepas}
			/>
			</View>
			<Text>{"\n"}</Text>
			<View style={{flexDirection: 'row', marginLeft: deviceWidth / 7, marginRight: deviceWidth / 7}}>
				<Text style={{flex: 1}}> Insuline a jeun:</Text>
				<TextInput
				placeholder="Insuline a jeun"
				style={{ flex: 1, height: 25, width: deviceWidth / 3, borderBottomWidth: 1}}
				onChangeText={(text) => this.setInsulineajeun(text)}
				value={this.insulineajeun}
			/>
			</View>
			<Text>{"\n"}</Text>
			<Button 
				color="#62BE87"
				style={{ height: 40, borderWidth: 2, borderColor: '#000000' }} 
				onPress={() => {this._addNote()}} 
				title="Valider la prise de note"
			/>
			{this.state.isSend && <Text style={{ color: 'green' }}>{"\n"}{successMessage}</Text>}
		</View>
		)
	}
}


const mapStateToProps = (state) => {
	return {
	  token: state.token,
	  idCurrentModule: state.idCurrentModule
	}
      }
      
export default connect(mapStateToProps)(Note)