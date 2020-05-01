import React from 'react'
import {
	Text,
	TouchableOpacity,
	View,
	Animated,
	StyleSheet,
	Button,
	TouchableWithoutFeedback,
	Alert
	} from 'react-native'
import { colors, windowSize } from '../StyleSheet'
import { APIRemoveUnit } from '../../API/APIModule'
import Modal from "react-native-modal";
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import { connect } from 'react-redux';
import { ThemeProvider } from 'react-native-paper';

var SMALL = 0.9;
var ACTION_TIMER = 800;


class ModuleItem extends React.Component {

	constructor(props) {
		super(props)
		const { dModule, triggerModule, generalUnit, deleteUnit} = this.props
		this.state = {
			isModalVisible: false,
			dModule: dModule,
			triggerModule: triggerModule,
			generalUnit: generalUnit, 
			deleteUnit: deleteUnit,
			animatedValue: new Animated.Value(1)
		}
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


	accessToDoctor = () => {
		console.log(this.state.dModule.id)
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
		console.log(this._value)
		if (this._value <= SMALL) {
			this.setModalVisible(true)
		}
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
					onSwipeComplete={() => this.setModalVisible(false)}
					transparent={true}
					backdropColor="rgba(0,0,0,0)"
					onBackdropPress = {() => this.setModalVisible(false)}>
				    	<View style={styles.content} >
							<Text style={styles.contentTitle} onPress={() => Alert.alert(
							'Retirer le module',
							"Si vous retirez ce module vous supprimerez de \"Vos médecins\" tous les médecins rattachés uniquement à ce module.\nVous supprimerez aussi définitivement toutes les notes ajoutées dans ce module.",
							[
								{text: 'Annuler', style: 'cancel'},
								{text: 'OK', onPress: () => {this.setModalVisible(false), this.state.deleteUnit(this.state.dModule.id)}},
							],
							{ cancelable: false }
							)}>Supprimer la note</Text>
							<Text style={styles.contentTitle} onPress={() => this.accessToDoctor(false)}>Voir les médecins ajoutés</Text>
				    		<Button testID={'close-button'} onPress={() => this.setModalVisible(false)} title="Close" />
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
	content: {
		backgroundColor: 'white',
		padding: 22,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: '#EFF0F1',
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