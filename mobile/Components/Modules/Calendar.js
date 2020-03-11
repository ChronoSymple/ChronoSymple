// Components/Calendar.js

import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet, Image, Modal, Button, TouchableOpacity, TouchableHighlight, FlatList, ScrollView, BackHandler} from 'react-native'
import { windowSize } from '../StyleSheet';
import { APIGetPatientNotesByModule, APIRemovePatientNotes } from '../../API/APIModule'
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
			DNotes: [],
			loading: true,
			isSelectActive: false,
			refreshing: false,
			checkingList: {},
			checkCount: 0,
			modalCheckboxVisible: false
		}
		this._bootstrapAsync();
		const { navigation } = this.props;
    	this.focusListener = navigation.addListener('didFocus', () => {
      		this._bootstrapAsync();
    	});
	}
	
	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIGetPatientNotesByModule(this.props.token.token, this.props.currentModule.currentModule).then(async data => {
					let response = await data.json()
					if (data.status == 200) {
						this.setState({
							DNotes: [ ...response ],
							loading: false,
						})
						for (var i = 0; i < this.state.DNotes.length; i++) {
							let id = this.state.DNotes[i].id
							this.setState({
								[this.state.DNotes[i].id]: false
							})
						}
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
		console.log('selectAllPressed ! :)')
		for (var i = 0; i < this.state.DNotes.length; i++) {
			console.log(this.state.DNotes[i].id)
			if (this.state[this.state.DNotes[i].id] == false) {
				this.setState({
					[this.state.DNotes[i].id]: true
				})
				this.state.checkCount += 1
			}
		}
		this.setModalCheckboxVisible(false)
		this.setState({ refreshing: true })
	}

	setModalCheckboxVisible = (visible) => {
		this.setState({ modalCheckboxVisible: visible })
	}

	noteChecked = (item) => {
		console.log("toto")
		if (this.state[item.id] == false) {
			this.state.checkCount += 1
		} else {
			this.state.checkCount -= 1
		}
		this.setState({ [item.id]: !this.state[item.id] })
		console.log(this.state[item.id])

		console.log("checkCount")
		console.log(this.state.checkCount)
		

		if (this.state.checkCount == 0) {
			this.setState({ isSelectActive: false })
		} else if (this.state.checkCount != 0 && this.state.isSelectActive == false) {
			this.setState({ isSelectActive: true })
		}
		this.setState({ refreshing: true })
	}
		
	_deletelNote = (id) => {
		this.props.getUserToken().then(() => {
			APIRemovePatientNotes(this.props.token.token, id).then(data => {
				if (data.status == 200)
					this._bootstrapAsync();
			})
		}).catch(error => {
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
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => {}}>
						<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Exporter sous PDF </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => {}}>
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
					{ this.state.isSelectActive ?
						<Icon
							name="more-horiz"
							color={colors.secondary}
							size={45}
							onPress={() => { this.setModalCheckboxVisible(true); }}
						/>
						:
						<Icon
							name="add-circle"
							color={colors.secondary}
							size={45}
							onPress={() => this.props.navigation.navigate('AddNote')}
						/>
					}

				</View>
				<ScrollView style={{marginTop: 30, marginBottom: 30}}>
					{this.state.loading && <ActivityIndicator style={{alignSelf: "center"}} size='large' color='black' />}
					<FlatList
						data={this.state.DNotes}
						keyExtractor={(item) => item.id.toString()}
						refreshing={this.state.refreshing}
						renderItem={({item}) => (
							<TouchableOpacity
								delayLongPress={1000}
								onLongPress={() => { this.noteChecked(item)	}}
								onRefresh={this.setState({ refreshing: false })}
								onPress={() => this.props.navigation.navigate('DetailNote', item)}
								style={styles.note}>
									{ this.state.isSelectActive ? 
										<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
											<CheckBox
												checked={this.state[item.id]}
												onPress={() => { this.noteChecked(item) }}
											/>
											<Text style={styles.noteText}>{item.data.date} {item.data.time}</Text>
										</View>
										:
										<Text style={styles.noteText}>{item.data.date} {item.data.time}</Text>
									}
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
				</ScrollView>
			</View>
		)
	}
	
	componentDidMount() {
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
