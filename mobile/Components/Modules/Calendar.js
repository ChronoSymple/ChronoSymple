// Components/Calendar.js

import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet, Image, Modal, Button, TouchableOpacity, TouchableHighlight, FlatList, SafeAreaView, BackHandler} from 'react-native'
import { windowSize } from '../StyleSheet';
import { APIGetPatientNotesByModule, APIRemovePatientNotes, APIShareNote, APIgetDoctorsOfModule } from '../../API/APIModule'
import { connect } from 'react-redux'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../StyleSheet'
import { CheckBox } from 'react-native-elements'

/*import { NoteItem } from './NoteItem' NOT USED*/
 
class Calendar extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			notes: [],
			selectedNotes: [],
			loading: true,
			modalCheckboxVisible: false
		}
		this._bootstrapAsync();
		const { navigation } = this.props;
    	this.focusListener = navigation.addListener('didFocus', () => {
      		this._bootstrapAsync();
    	});
	}

	shareNote = () => {
		let notes = this.state.selectedNotes;
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				let token = this.props.token.token;
				let cur_modl = this.props.currentModule.currentModule;
				APIgetDoctorsOfModule(token, cur_modl).then(async data => {
					let response = await data.json();
					let doctor_ids = [];
					for (let doc of response) {
						doctor_ids.push(doc.id)
					}
					if (data.status == 200) {
						APIShareNote(token, cur_modl, notes, doctor_ids).then(async data => {
							let response = await data.json();
							if (data.status == 200) {
							} else {
							}
						})
					} else {
					}
				})
			})
		})
		this.setModalCheckboxVisible(false);
	}
	
	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIGetPatientNotesByModule(this.props.token.token, this.props.currentModule.currentModule).then(async data => {
					let response = await data.json()
					if (data.status == 200) {
						this.setState({
							notes: [ ...response ],
							loading: false,
						})
					}
					}).catch(error => {
						this.setState({ error })
					})
				})
		}).catch(error => {
			this.setState({ error })
		})
	}


	_accessDetailNote = (DataNote) => {
		this.props.navigation.navigate('DetailNote', {data: JSON.parse(DataNote)})
	}


	selectAllPressed = () => {
		let all_note_ids = []
		for (let note of this.state.notes) {
			all_note_ids.push(note.id);
		}
		this.setState({selectedNotes: all_note_ids});
		this.setModalCheckboxVisible(false);
	}

	exportPDFPressed = () => {
		let PDFData = []
		let counter = 0
		for (var i = 0; i < this.state.notes.length; i++) {
			if (this.state[this.state.notes[i].id] == true) {
				PDFData[counter] = this.state.notes[i]
				counter += 1
			}
		}
		this.setModalCheckboxVisible(false)
		
		this.props.navigation.navigate('ExportPDF', {'PDFData': PDFData})
	}

	setModalCheckboxVisible = (visible) => {
		this.setState({ modalCheckboxVisible: visible })
	}

	noteChecked = (item, state) => {
		let selected_n = this.state.selectedNotes;

		// If state.selectedNotes containe id remove 
		if (this.state.selectedNotes.includes(item.id)) {
			selected_n.pop(item.id)
		}
		// Else add in selectedNotes
		else {
			selected_n.push(item.id);
		}
		// SetState new selected note ids
		this.setState({
			selectedNotes: selected_n
		})
	}
		
	_deletelNote = (id) => {
		this.setState({loading: true});
		this.props.getUserToken().then(() => {
			APIRemovePatientNotes(this.props.token.token, id).then(data => {
				if (data.status == 200)
					this.setState({loading: false});
					this._bootstrapAsync();
			})
		}).catch(error => {
			this.setState({loading: false});
			this.setState({ error })
		})
	}

	render() {
		return (
			<View style={styles.main_container}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalCheckboxVisible}
				>
					<View style={{ flex: 1}}>
					<TouchableHighlight style={{margin: 10}}>
						<Icon
							name="clear"
							color="#62BE87"
							size={35}
							onPress={() => { this.setModalCheckboxVisible(false); }}
	    				/>
					</TouchableHighlight>
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.selectAllPressed() }}>
						<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Tout Selectionner </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.exportPDFPressed() }}>
						<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Exporter sous PDF </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.shareNote() }}>
						<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Partager </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => {}}>
						<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Ne plus partager </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => {}}>
						<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Supprimer </Text>
					</TouchableOpacity>
					</View>
				</Modal>
				<View style={{flexDirection: "row", justifyContent: 'space-between'}}>
					<Text style={{color:colors.secondary, fontWeight: "bold", fontSize:30}}>Prise de notes</Text>
						<Icon
							name="more-horiz"
							color={colors.secondary}
							size={45}
							onPress={() => { this.setModalCheckboxVisible(true); }}
						/>
						<Icon
							name="add-circle"
							color={colors.secondary}
							size={45}
							onPress={() => this.props.navigation.navigate('AddNote')}
						/>

				</View>
				<SafeAreaView style={{marginTop: 30, marginBottom: 80}}>
				{this.state.loading && <ActivityIndicator style={{alignSelf: "center"}} size='large' color='black' />}
					<FlatList
						data={this.state.notes}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({item}) => (
							<TouchableOpacity
								delayLongPress={1000}
								onPress={() => this.props.navigation.navigate('DetailNote', item)}
								style={styles.note}>
										<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
											<Text style={styles.noteText}>{item.data.date} {item.data.time}</Text>
											<CheckBox
												checked={this.state.selectedNotes.includes(item.id)}
												onPress={() => { this.noteChecked(item) }}
											/>
										</View>
									{ !item.data.description
									?
									<Text style={styles.description}>Pas de description</Text>
									: (item.data.description.length > 20)
									?
									<Text style={styles.description}>{item.data.description.substr(0, 20)}...</Text>
									:
									<Text style={styles.description}>{item.data.description}</Text>
									}
									<View style={{flexDirection: "row"}}>
										<TouchableOpacity onPress={() => this.props.navigation.navigate('EditNote',  {itemDetail: item })}>
											<View style={styles.editBorder}>
												<Icon
													name="edit"
													color={"#874C90"}
													size={18}
			    								/>
												<Text style={styles.edit}>Edit</Text>
											</View>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => this._deletelNote(item.id)}>
											<View style={styles.deleteBorder}>
												<Icon
													name="delete"
													color={"#ad0f0f"}
													size={18}
			    								/>
												<Text style={styles.delete}>Supprimer</Text>
											</View>
										</TouchableOpacity>
									</View>
							</TouchableOpacity>
						)}
					/>
				</SafeAreaView>
			</View>
		)
	}
	
	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		this.props.navigation.navigate('Calendar')
		return true;
	}
}

const styles = StyleSheet.create({
	main_container: {
		margin: 10
	},
	note: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3.5,
		borderColor: '#F1F1F1',
		borderRadius: 10,
		padding: 15,
		color: '#000',
		marginBottom: 15
	},
	noteText: {
		fontSize: 20,
		color: "#62BE87",
		fontWeight: "bold"
	},
	list: {
		marginTop: 30,
	},
	description: {
		marginTop: 15,
		fontSize: 14,
		color: "#E9E9E9"
	},
	editBorder: {
		marginTop: 15,
		marginRight: 5,
		paddingLeft: 13,
		paddingRight: 15,
		paddingTop: 3,
		paddingBottom: 3,
		flexDirection: "row",
		borderColor: "#874C90",
		borderWidth: 1.5,
	},
	edit: {
		paddingLeft: 3,
		fontSize: 13,
		color: "#874C90"
	},
	deleteBorder: {
		marginTop: 15,
		marginLeft: 5,
		paddingLeft: 13,
		paddingRight: 15,
		paddingTop: 3,
		paddingBottom: 3,
		flexDirection: "row",
		borderColor: "#ad0f0f",
		borderWidth: 1.5,
	},
	delete: {
		paddingLeft: 3,
		fontSize: 13,
		color: "#ad0f0f"
	}
})

const mapStateToProps = state => ({
	token: state.token,
	currentModule: state.currentModule
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserCurrentModule: () => dispatch(getUserCurrentModule())
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
