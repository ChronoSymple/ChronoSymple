// Components/ExportPDF.js

import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet, Image, Modal, Button, TouchableOpacity, TouchableHighlight, FlatList, ScrollView, BackHandler, PermissionsAndroid} from 'react-native'
import { windowSize } from '../StyleSheet';
import { APIGetPatientNotesByModule, APIRemovePatientNotes } from '../../API/APIModule';
import { getPatientInfoWithApi } from '../../API/APIConnection';
import { connect } from 'react-redux'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../StyleSheet'
import { CheckBox } from 'react-native-elements'
import RNHTMLtoPDF from 'react-native-html-to-pdf';

class ExportPDF extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			pdfData: this.props.navigation.getParam("PDFData"),
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			birthdate: "",
			civility: "",

		}
		this.getPatientInfo()
	}

	getPatientInfo = () => {
		getPatientInfoWithApi(this.props.token.token).then(async data => {
			let response = await data.json()
			this.setState({
				firstName: response.first_name,
				lastName: response.last_name,
				email: response.email,
				phoneNumber: response.phone_number ? response.phone_number : "None",
				birthdate: response.birthdate,
				civility: response.civility,
			})
		})
	}

	getDoctorInfo = () => {
		/*GET MYDOCTOR INFO */
	}

	returnPressed = () => {
		this.props.navigation.navigate('Calendar')
	}

	async createPDF() {
		let generalInfo='<h4 style="text-align: left"> Patient\
							<span style="float:right"> Docteur</span>\
						</h4>\
						<p style="text-align: left">nom: ' + this.state.lastName + '\
							<span style="float:right"> nom: </span>\
						</p>\
						<p style="text-align: left">prenom: ' + this.state.firstName + '\
							<span style="float:right"> Prenom</span>\
						</p>\
						<p style="text-align: left">email: ' + this.state.email + '\
							<span style="float:right"> email: </span>\
						</p>\
						<p style="text-align: left">telephone: ' + this.state.phoneNumber + '\
							<span style="float:right"> adresse de travail: </span>\
						</p>'


		let patientNote='<table style="width:100%; border-collapse: collapse">\
							<tr style="background-color: #dddddd">\
								<th style="border: 1px solid #dddddd; text-align: center"> Date and Time </th>\
								<th style="border: 1px solid #dddddd; text-align: center"> Glucose </th>\
								<th style="border: 1px solid #dddddd; text-align: center"> Insuline(Food) </th>\
								<th style="border: 1px solid #dddddd; text-align: center"> Insuline(corr) </th>\
							</tr>'
		for (var i = 0; i < this.state.pdfData.length; i++) {
			patientNote += '<tr>\
								<th style="border: 1px solid; text-align: center"> ' + this.state.pdfData[i].data.date + ' - ' + this.state.pdfData[i].data.time + ' </th>\
								<th style="border: 1px solid; text-align: center"> ' + this.state.pdfData[i].data.BloodGlucose + ' </th>\
								<th style="border: 1px solid; text-align: center"> ' + this.state.pdfData[i].data.InsulineFood + ' </th>\
								<th style="border: 1px solid; text-align: center"> ' + this.state.pdfData[i].data.InsulineCorr + ' </th>\
							</tr>'
		}
		patientNote += '</table>'


		let currentDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()
		let currentTime = new Date().getHours() + ":" + new Date().getMinutes()

		let options = {
			html: generalInfo + '<p style="text-align: left;">\
						<br>\
						<strong>Declaration des symptomes du DD/MM/YYYY au DD/MM/YYYY: </strong>\
					</p>' + patientNote + '\
					<p>fait le ' + currentDate + ' à ' + currentTime + '</p',
			fileName: 'Chronosymple_test_follow_up',
			directory: 'docs',
		}

		let file = await RNHTMLtoPDF.convert(options)


	}


	render() {
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 1}}>
					<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
						<Text> Patient </Text>
						<Text> Docteur </Text>
					</View>
			        <View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
						<Text> Nom: {this.state.lastName} </Text>
						<Text> Nom: NomDuDocteur </Text>
					</View>
					<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
						<Text> Prenom: {this.state.firstName} </Text>
						<Text> Prenom: PrenomDuDocteur </Text>
					</View>
					<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
						<Text> mail: {this.state.email} </Text>
						<Text> addresse de travail:  </Text>
					</View>
					<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
						<Text> Numero de telephone: {this.state.phoneNumber} </Text>
						<Text> Telephone: 0123456789 </Text>
					</View>
				</View>
				<View style={{flex: 1}}>
				</View>
				<View style={{flex: 6}}>
					<Text> Declaration des symptomes du DD/MM/YYYY au DD/MM/YYYY: </Text>
					<View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around'}}>
						<Text>date</Text>
						<Text>heure</Text>
						<Text>Glucose</Text>
						<Text>insuline(food)</Text>
						<Text>insuline(corr)</Text>
					</View>
					<FlatList
						data={this.state.pdfData}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({item}) => (
							<View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around'}}>
								<Text> {item.data.date} </Text>
								<Text> {item.data.time} </Text>
								<Text> {item.data.BloodGlucose} </Text>
								<Text> {item.data.InsulineFood} </Text>
								<Text> {item.data.InsulineCorr} </Text>
							</View>
						)}
					/>
				</View>
				<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
					<TouchableOpacity onPress={this.createPDF.bind(this)}>
						<Text> Generer le PDF </Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.returnPressed}>
						<Text> Retour </Text>
					</TouchableOpacity>
				</View>

			</View>
		)
	}

}


const mapStateToProps = state => ({
	token: state.token,
	currentModule: state.currentModule
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserCurrentModule: () => dispatch(getUserCurrentModule())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExportPDF);
