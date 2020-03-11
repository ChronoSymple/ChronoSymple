// Components/ExportPDF.js

import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet, Image, Modal, Button, TouchableOpacity, TouchableHighlight, FlatList, ScrollView, BackHandler, PermissionsAndroid} from 'react-native'
import { windowSize } from '../StyleSheet';
import { APIGetPatientNotesByModule, APIRemovePatientNotes } from '../../API/APIModule'
import { connect } from 'react-redux'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../StyleSheet'
import { CheckBox } from 'react-native-elements'
import RNHTMLtoPDF from 'react-native-html-to-pdf';

class ExportPDF extends React.Component {
	constructor (props) {
		super(props)
		console.log("valeur de tmp value sur ExportPDF Page")
		let tmpValue = this.props.navigation.getParam("PDFData")
		console.log(tmpValue)

		this.state = {

		}
	}

/*	askPermission() {
		var that = this;
		async function requestExternalWritePermission() {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
					title: 'CameraExample App External Storage Write Permission',
					message:
					'CameraExample App needs access to Storage data in your SD Card ',
				});
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					//If WRITE_EXTERNAL_STORAGE Permission is granted
					//changing the state to show Create PDF option
					that.createPDF();
				} else {
					alert('WRITE_EXTERNAL_STORAGE permission denied');
				}
			} catch (err) {
				alert('Write permission err', err);
				console.warn(err);
			}
		}
		//Calling the External Write permission function
		if (Platform.OS === 'android') {
			requestExternalWritePermission();
		} else {
			this.createPDF();
		}
	}*/

	async createPDF() {
		let options = {
			html: '<h1> PDF TEST (dit wallah) </h1>',
			fileName: 'Chronosymple_test2',
			directory: 'docs',
		}

		let file = await RNHTMLtoPDF.convert(options)

		console.log(file.filepath)

	}


	render() {
		return (
			<View>
				<Text> Exportation des datas :) </Text>
				<TouchableOpacity onPress={this.createPDF}>
					<Text> create Chronosymple_test PDF </Text>
				</TouchableOpacity>
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
