import React from 'react'
import {
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Alert,
	ActivityIndicator
	} from 'react-native'
import { colors, windowSize } from '../StyleSheet'
import { APIgetDoctorsOfModule } from '../../API/APIModule'
import Modal from "react-native-modal";
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

var SMALL = 0.9;
var ACTION_TIMER = 2;


class ModuleItem extends React.Component {

	constructor(props) {
		super(props)
		const { dModule, triggerModule, generalUnit, deleteUnit, doctorChoice } = this.props
		this.state = {
			isModalVisible: false,
			dModule: dModule,
			triggerModule: triggerModule,
			doctorChoice: doctorChoice,
			generalUnit: generalUnit, 
			deleteUnit: deleteUnit,
			doctorsOfModule: this.getDoctors(),
			displayDoctor: false,
			finish: false
		}
	}

	setModalVisible = (visible) => {
		this.setState({
			isModalVisible: visible,
		})
	}
	
 	displayDoctor = () => {
		if (!this.state.displayDoctor == true)
			this.getDoctors()
		this.setState({
			finish: false,
			displayDoctor: !this.state.displayDoctor
		})
	}

	getDoctors = () => {
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIgetDoctorsOfModule(this.props.token.token, this.state.dModule.id).then(async data => {
					let response = await data.json()
					if (data.status == 200) {
						console.log(response)
						this.setState({ 
							finish: true,
							doctorsOfModule: response
						})
					} else if (data.status == 404) {
						this.setState({ 
							finish: true,
							doctorsOfModule: []
						})
						showMessage({
							message: "L'unit n'a pas été trouvé. Recommencez. Si le probleme persiste contactez nous",
							type: "danger",
						});
					} else if (data.status == 401) {
						showMessage({
							message: "Un probleme est survenus, vous allez être déconnecté",
							type: "danger",
						});
						this.props.navigation.navigate("Logout");
					}
				}).catch(error => {
					this.setState({ error, finish: true })
				})
			})
		}).catch(error => {
			this.setState({ error })
		})
	}


	render() {
		console.log(this.state)
		return (
			<View>
				<Modal
				    visible={this.state.isModalVisible}
				    style={styles.view}
				    swipeDirection={'down'}
					animationInTiming={3000}
					animationType="slide"
					animationIn="slideInUp"
				  	animationOut="slideOutDown"
					transparent={true}
					backdropColor="rgba(0,0,0,0)"
					onBackdropPress = {() => this.setModalVisible(false)}>
				    	<View style={styles.modalContent}>
							<View style={styles.modalContentCenter}>
								<TouchableOpacity style={{ alignItems: 'center', height: windowSize.y / 10 }}  onPress={() => Alert.alert(
								'Retirer le module',
								"Si vous retirez ce module vous supprimerez de \"Vos médecins\" tous les médecins rattachés uniquement à ce module.\nVous supprimerez aussi définitivement toutes les notes ajoutées dans ce module.",
								[
									{text: 'Annuler', style: 'cancel'},
									{text: 'OK', onPress: () => {this.setModalVisible(false), this.state.deleteUnit(this.state.dModule.id)}},
								],
								{ cancelable: false }
								)}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}>Supprimer le module</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ paddingLeft: 15, paddingRight: 15, flexDirection: "row", alignItems: 'center', justifyContent : "space-around", borderTopWidth: 1, height: windowSize.y / 10}} onPress={() => {this.displayDoctor()}}>
									<Text style={{ flex: 9, marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}>Voir le médecin assigné</Text>
									{ this.state.displayDoctor ?
										<Icon
											style={{ flex: 1, marginTop: windowSize.y / 30 }}
											name="keyboard-arrow-up"
											color="#000"
											size={25}
											onPress={() => { this.setModalVisible(false) }}
	    								/>
										:
										<Icon
											style={{ flex: 1, marginTop: windowSize.y / 30 }}
											name="keyboard-arrow-down"
											size={25}
											color="#000"
											onPress={() => { this.setModalVisible(false) }}
	    								/>
									}
								</TouchableOpacity>
								{this.state.displayDoctor && !this.state.finish && 
									<ActivityIndicator size='large' color='black' />
								}
								{ this.state.finish && this.state.doctorsOfModule.length == 0 && this.state.displayDoctor  &&
										<View style={{flexDirection : "row", height: windowSize.y / 20}} onPress={() => {}}>								
											<TouchableOpacity style={{backgroundColor: colors.primary, marginTop: windowSize.y / 60, flex: 4, marginRight: 10, marginLeft: 10}}>
												<Text style={{color:"white", textAlign: "center"}} onPress={() => {this.displayDoctor(), this.setModalVisible(false), this.state.doctorChoice(this.state.dModule.id, this.state.dModule.general_unit.id, "add", null)}}>Assigner</Text>
											</TouchableOpacity>
										</View>	
								}
								{ this.state.finish && this.state.displayDoctor && this.state.doctorsOfModule.length > 0 &&
											<View style={{flexDirection : "row", height: windowSize.y / 10}} onPress={() => {}}>
											<FlatList
												data={this.state.doctorsOfModule}
												keyExtractor={(item) => item.id.toString()}
												renderItem={({item}) => (
													<View style={{flexDirection: "row", justifyContent: "space-between"}}>
														<Text style={{marginTop: windowSize.y / 40, flex: 6, fontSize: windowSize.y / 48}}>Dr. {item.user.first_name} {item.user.last_name}</Text>
														<TouchableOpacity style={{backgroundColor: colors.primary, marginTop: windowSize.y / 40, flex: 4, fontSize: windowSize.y / 48}} onPress={() => {this.displayDoctor(), this.setModalVisible(false), this.state.doctorChoice(this.state.dModule.id, this.state.dModule.general_unit.id, "change", item.id)}}>
															<Text style={{color:"white", textAlign: "center"}}>Changer</Text>
														</TouchableOpacity>
													</View>
												)}
											/>
										</View>
								}
							</View>
				  		</View>
				</Modal>
			{ !this.state.generalUnit
				?
				!this.state.dModule.already_added
				?
				<TouchableOpacity onPress={() => this.state.triggerModule(this.state.dModule.id, this.state.dModule.name)}
					style={{
						flex: 1, 
						justifyContent : 'center', 
						alignItems: 'center', 
						borderWidth: 3, 
						borderColor: colors.primary, 
						borderRadius: 15, 
						backgroundColor : 'white', 
						margin: 10}}>					
						<View style={{
							flex: 1,
							alignItems: 'center',
							flexDirection : 'row', 
							justifyContent: 'center', 
							width: "100%", 
							height: "100%",
							margin: 20, 
							}}>
								<Text style={{ fontSize: 18, textTransform: 'capitalize' }}>{this.state.dModule.name}</Text>
						</View>
					</TouchableOpacity>
					:
					<View/>
				:
				<TouchableOpacity onPress={() => this.state.triggerModule(this.state.dModule.id, this.state.dModule.general_unit.name)}>
					<View style={styles.moduleBox}>
						<View style={styles.moduleTitle}>
							<Text style={{ fontSize: 18, textAlign: "center", textTransform: 'capitalize', flex: 8 }}>{this.state.dModule.general_unit.name}</Text>
						</View>
						<Icon
							name="more-vert"
							size={35}
							color={colors.primary}
							onPress={() => { this.setModalVisible(true) }}
							style={styles.moduleMoreVer}
						/>
					</View>
				</TouchableOpacity>
			}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	WhithoutModule: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	view: {
		justifyContent: 'flex-end',
		margin: 0,
	},
	modalContent: {
		borderTopWidth: 1,
		backgroundColor: 'white',
		padding: 22,
		borderRadius: 4,
		borderColor: '#EFF0F1',
	},
	modalContentCenter: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentTitle: {
		fontSize: 20,
		marginBottom: 12,
	},
	moduleTitle: {
		flex: 8,
		justifyContent: 'center', 
		paddingTop: 3
	},
	moduleMoreVer: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center', 
	},
	moduleBox: {
		flex: 1, 
		flexDirection: "row",
		borderWidth: 3, 
		borderColor: colors.secondary, 
		borderRadius: 15, 
		margin: 5,
		paddingTop: 17,
		paddingBottom: 17
	},
	list: {
		paddingRight : 10,
		paddingLeft : 10,
		justifyContent: "flex-start"
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


export default connect(mapStateToProps, mapDispatchToProps)(ModuleItem);