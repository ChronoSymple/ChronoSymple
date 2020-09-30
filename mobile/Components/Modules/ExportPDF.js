// Components/ExportPDF.js

import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet, Image, Modal, Button, TouchableOpacity, TouchableHighlight, FlatList, ScrollView, BackHandler, PermissionsAndroid} from 'react-native'
import { windowSize } from '../StyleSheet';
import { APIGetPatientNotesByModule, APIRemovePatientNotes } from '../../API/APIModule';
import { getPatientInfoWithApi } from '../../API/APIConnection';
import { APIGetMyDoctors } from '../../API/APIDoctor';
import { connect } from 'react-redux'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../StyleSheet'
import { CheckBox } from 'react-native-elements'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { showMessage } from "react-native-flash-message";


class ExportPDF extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			pdfData: this.props.navigation.getParam("PDFData"),
			startDate: this.props.navigation.getParam("startDate"),
			endDate: this.props.navigation.getParam("endDate"),
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			birthdate: "",
			civility: "",
			doctorFirstName: "",
			doctorLastName: "",
			doctorEmail: "",
			doctorAddress: "",
			PDFcreated: "unknown",
		}
		this.getPatientInfo()
		this.getDoctorInfo()
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
		APIGetMyDoctors(this.props.token.token).then(async data => {
			let response = await data.json()
			if (data.status == 200) {
				for (var i = response.length - 1; i >= 0; i--) {
					if (this.state.pdfData[0].unit_id == response[i].id) {
						this.setState({
							doctorFirstName: response[i].doctors[0].user.first_name,
							doctorLastName: response[i].doctors[0].user.last_name,
							doctorEmail: response[i].doctors[0].user.email,
							doctorAddress: response[i].doctors[0].user.address,
						})
					}
				}
			} else if (data.status == 404 && data.status == 500) {
				showMessage({
					message: "Un probleme est survenus, vous allez être déconnecté",
					type: "danger",
				});
				this.props.navigation.navigate("Logout");
			} else {
				showMessage({
					message: "Un problème est survenus, nous n'avons pas réussis à récupérer la liste des modules",
					type: "danger",
				});
			}
		})
		/*GET MYDOCTOR INFO */
		console.log(this.state)
	}

	returnPressed = () => {
		this.props.navigation.navigate('Calendar')
	}

	async createPDF() {
		console.log("creating pdf file ....")
		showMessage({
			message: "téléchargement du fichier ...",
			type: "info"
		});
		let generalInfo='<h4 style="text-align: left"> Patient\
							<span style="float:right"> Docteur</span>\
						</h4>\
						<p style="text-align: left">nom: ' + this.state.lastName + '\
							<span style="float:right"> nom: ' + this.state.doctorLastName + '</span>\
						</p>\
						<p style="text-align: left">prenom: ' + this.state.firstName + '\
							<span style="float:right"> Prenom ' + this.state.doctorFirstName + '</span>\
						</p>\
						<p style="text-align: left">email: ' + this.state.email + '\
							<span style="float:right"> email: ' + this.state.doctorEmail + '</span>\
						</p>\
						<p style="text-align: left">telephone: ' + this.state.phoneNumber + '\
							<span style="float:right"> adresse de travail: ' + this.state.doctorAddress + '</span>\
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
		let filename = 'Chronosymple_fiche_symptome_' + new Date().getDate() + (new Date().getMonth() + 1) + new Date().getFullYear()
		console.log(filename)

		let options = {
			html: generalInfo + '<p style="text-align: left;">\
						<br>\
						<strong>Declaration des symptomes du ' + this.state.startDate + ' au ' + this.state.endDate + ': </strong>\
					</p>' + patientNote + '\
					<p>fait le ' + currentDate + ' à ' + currentTime + '</p',
			fileName: filename,
			directory: 'docs',
		}
		try {
			let file = await RNHTMLtoPDF.convert(options)
			this.setState({ PDFcreated: "yes" })
			showMessage({
				message: "le document PDF a bien été télécharger",
				type: "success"
			});
			this.props.navigation.navigate("Calendar")
		} catch (error) {

			console.log(error)
			showMessage({
				message: "Une erreur est survenue lors de l'export de note. Veuillez recommencer. Si le probleme persiste contactez nous",
				type: "danger",
			});
		}
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<View style={{backgroundColor: colors.secondary, flex: 1, flexDirection: 'column'}}>
					
					<View style={{flex:1, flexDirection: 'row'}}>
						<View style={{flex:1}}>
						<TouchableHighlight style={{margin: 15}}>
							<Icon
								name="arrow-back"
								color="#FFF"
								size={35}
								onPress={this.returnPressed}
		    				/>
						</TouchableHighlight>
						</View>
						<View style={{flex: 1, alignItems: "flex-end"}}>
						<TouchableHighlight style={{margin: 15}}>
							<Icon
								name="check"
								color="#FFF"
								size={35}
								onPress={this.createPDF.bind(this)}
		    				/>
						</TouchableHighlight>
						</View>
					</View>
				</View>
				<View style={{flex: 0.4}}/>
				<View style={{flex: 2}}>
					<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
						<Text> Patient </Text>
						<Text> Docteur </Text>
					</View>
			        <View style={{flex: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10}}>
						<View style={{flex: 1}}>
							<Text style={{fontSize: 12}}> Nom: {this.state.lastName} </Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end"}}>
							<Text style={{fontSize: 12}}> Nom: {this.state.doctorLastName} </Text>
						</View>
					</View>
					<View style={{flex: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10}}>
						<View style={{flex: 1}}>
							<Text style={{fontSize: 12}}> Prenom: {this.state.firstName} </Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end"}}>
							<Text style={{fontSize: 12}}> Prenom: {this.state.doctorFirstName} </Text>
						</View>
					</View>
					<View style={{flex: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10}}>
						<View style={{flex: 1}}>
							<Text style={{fontSize: 12}}> mail: {this.state.email} </Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end"}}>
							<Text style={{fontSize: 12}}> mail: {this.state.doctorEmail} </Text>
						</View>
					</View>
					<View style={{flex: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10}}>
						<View style={{flex: 1}}>
							<Text style={{fontSize: 12}}> Numero de telephone: {this.state.phoneNumber} </Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end"}}>
							<Text style={{fontSize: 12}}> addresse de travail:  {this.state.doctorAddress} </Text>
						</View>
					</View>
				</View>
				<View style={{flex: 0.7}}/>
				<View style={{flex: 6, marginLeft: 10, marginRight: 10}}>
					<View style={{flex: 1}}>
						<Text> Declaration des symptomes du {this.state.startDate} au {this.state.endDate}: </Text>
					</View>
					<View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around'}}>
						<View style={{flex: 1}}>
							<Text style={{fontSize: 10}}>date</Text>
						</View>
						<View style={{flex: 1}}>
							<Text style={{fontSize: 10}}>heure</Text>
						</View>
						<View style={{flex: 1}}>
							<Text style={{fontSize: 10}}>Glucose</Text>
						</View>
						<View style={{flex: 1}}>
							<Text style={{fontSize: 10}}>insuline(food)</Text>
						</View>
						<View style={{flex: 1}}>
							<Text style={{fontSize: 10}}>insuline(corr)</Text>
						</View>
					</View>
					<View style={{flex: 8}}>
					<FlatList
						data={this.state.pdfData}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({item}) => (
							<View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around'}}>
								<View style={{flex: 1}}>
									<Text style={{fontSize: 10}}> {item.data.date} </Text>
								</View>
								<View style={{flex: 1}}>
									<Text style={{fontSize: 10}}> {item.data.time} </Text>
								</View>
								<View style={{flex: 1}}>
									<Text style={{fontSize: 10}}> {item.data.BloodGlucose} </Text>
								</View>
								<View style={{flex: 1}}>
									<Text style={{fontSize: 10}}> {item.data.InsulineFood} </Text>
								</View>
								<View style={{flex: 1}}>
									<Text style={{fontSize: 10}}> {item.data.InsulineCorr} </Text>
								</View>
							</View>
						)}
					/>
					</View>
				</View>
				{/*<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
					<TouchableOpacity onPress={this.createPDF.bind(this)}>
						<Text> Generer le PDF </Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.returnPressed}>
						<Text> Retour </Text>
					</TouchableOpacity>
				</View>*/}

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
