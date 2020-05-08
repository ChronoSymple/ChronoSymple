import React from 'react'
import {
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
	Animated,
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

var SMALL = 0.9;
var ACTION_TIMER = 800;


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
			animatedValue: new Animated.Value(1),
			doctorsOfModule: [],
			displayDoctor: false,
			finish: false
		}
		this.setState({
			doctorsOfModule: this.getDoctors()
		})
	}

	setModalVisible = (visible) => {
		this.setState({
			isModalVisible: visible,
		})
	}
	
	UNSAFE_componentWillMount = () => {
		this._value = 0;
		this.state.animatedValue.addListener((v) => this._value = v.value);

	}

  	handlePressIn = () => {
		Animated.spring(this.state.animatedValue, {
			duration: ACTION_TIMER,
			toValue: SMALL,
			friction: 40
		}).start(this.animationActionComplete)
	}

	handlePressOut= () => {
		if (this._value > SMALL) {
			this.state.triggerModule(this.state.dModule.id, this.state.dModule.general_unit.name)
		}
		Animated.spring(this.state.animatedValue, {
			duration: ACTION_TIMER,
			toValue: 1
		}).start()
	}

	animationActionComplete= () => {
		if (this._value <= SMALL) {
			this.setModalVisible(true)
		}
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
					this.setState({ 
						finish: true,
						doctorsOfModule: response
					})
				}).catch(error => {
					this.setState({ error, finish: true })
				})
			})
		}).catch(error => {
			this.setState({ error })
		})
	}


	render() {
		const animatedStyle = {
			transform: [{ scale: this.state.animatedValue }]
		}
		return (
			<View>
				<Modal
				    visible={this.state.isModalVisible}
				    style={styles.view}
				    swipeDirection={'down'}
					animationInTiming="3000"
					animationType="slide"
					animationIn="slideInUp"
				  	animationOut="slideOutDown"
					transparent={true}
					backdropColor="rgba(0,0,0,0)"
					onBackdropPress = {() => this.setModalVisible(false)}>
				    	<View style={styles.modalContent}>
							<TouchableHighlight style={{margin: 1}}>
								<Icon
									name="clear"
									color="#62BE87"
									size={35}
									onPress={() => { this.setModalVisible(false) }}
	    						/>
							</TouchableHighlight>
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
								{ this.state.finish && this.state.doctorsOfModule.length == 0 && this.state.displayDoctor  && this.state.loading &&
										<View style={{flexDirection : "row", height: windowSize.y / 20}} onPress={() => {}}>								
											<TouchableOpacity style={{backgroundColor: "#2296F3", marginTop: windowSize.y / 60, flex: 4, fontSize: windowSize.y / 48}}>
												<Text style={{color:"white", textAlign: "center", paddingLeft: 30, paddingRight: 30}} onPress={() => {this.displayDoctor(), this.setModalVisible(false), this.state.doctorChoice(this.state.dModule.id, this.state.dModule.general_unit.id, "add", null)}}>Assigner</Text>
											</TouchableOpacity>
										</View>	
								}
								{ this.state.finish && this.state.displayDoctor && this.state.doctorsOfModule.length > 0 &&  this.state.loading &&
											<View style={{flexDirection : "row", height: windowSize.y / 10}} onPress={() => {}}>
											<FlatList
												data={this.state.doctorsOfModule}
												keyExtractor={(item) => item.id.toString()}
												renderItem={({item}) => (
													<View style={{flexDirection: "row", justifyContent: "space-between"}}>
														<Text style={{marginTop: windowSize.y / 40, flex: 6, fontSize: windowSize.y / 48}}>Dr. {item.user.first_name} {item.user.last_name}</Text>
														<TouchableOpacity style={{backgroundColor: "#2296F3", marginTop: windowSize.y / 40, flex: 4, fontSize: windowSize.y / 48}} onPress={() => {this.displayDoctor(), this.setModalVisible(false), this.state.doctorChoice(this.state.dModule.id, this.state.dModule.general_unit.id, "change", item.id)}}>
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
				<TouchableOpacity onPress={() => this.state.triggerModule(this.state.dModule.id, this.state.dModule.name)}
					style={{
						flex: 1, 
						justifyContent : 'center', 
						alignItems: 'center', 
						borderWidth: 3, 
						borderColor: colors.secondary, 
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
				<TouchableWithoutFeedback
					onPressIn={this.handlePressIn} 
					onPressOut={this.handlePressOut}>
					<Animated.View style={[animatedStyle, styles.moduleBox]}>
						<View style={styles.moduleTitle}>
								<Text style={{ fontSize: 18, textTransform: 'capitalize' }}>{this.state.dModule.general_unit.name}</Text>
						</View>
					</Animated.View>
				</TouchableWithoutFeedback>
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
		flex: 1,
		alignItems: 'center',
		flexDirection : 'row', 
		justifyContent: 'center', 
		width: "100%", 
		height: "100%",
		margin: 20
	},
	moduleBox: {
		flex: 1, 
		justifyContent : 'center', 
		alignItems: 'center', 
		borderWidth: 3, 
		borderColor: colors.secondary, 
		borderRadius: 15, 
		margin: 10
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