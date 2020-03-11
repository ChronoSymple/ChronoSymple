import React from 'react'
import { APIGetPatientModules } from '../API/APIModule'
import ModuleItem from './Modules/ModuleItem'
import {
	ActivityIndicator,
	StyleSheet,
	View,
	ScrollView,
	FlatList,
	Text,
	Button,
	BackHandler,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Animated,
	//Modal,
	TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken, saveUserCurrentModule, saveUserCurrentModuleName } from '../Redux/Action/action';
import Modal from 'react-native-modal';
import { Easing } from 'react-native-reanimated';

var ACTION_TIMER = 800;

class Home extends React.Component {
	  constructor(props) {
		  super(props)
		  this.state = {
			  Dmodules: null,
			  loading: true,
			  isModalVisible: false,
			  pressAction: new Animated.Value(0),
			}
			this._bootstrapAsync();
			const { navigation } = this.props;
			this.focusListener = navigation.addListener('didFocus', () => {
				this.state = {
					Dmodules: null,
					loading: true
				}
				this._bootstrapAsync();
			});
		}
	
		componentWillMount = () => {
			this._value = 0;
			this.state.pressAction.addListener((v) => this._value = v.value);
			this.animatedValue = new Animated.Value(1);
		}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			APIGetPatientModules(this.props.token.token).then(async data => {
				this.setState({
					loading: false							
				})
				if (data.status == 200) {
					let response = await data.json()
					if (response.length > 0 && JSON.stringify(this.state.Dmodules) != JSON.stringify(response.modules)) {
						this.setState({
							Dmodules: [ ...response ],
						})
					}
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	changeModule = (idModule, moduleName) => {
		this.props.saveUserCurrentModule(idModule.toString())
		.then(() => {
			this.props.saveUserCurrentModuleName(moduleName)
			.then(() => {
				this.props.navigation.navigate('Module', {idModule: idModule})
			})
			.catch((error) => {
				this.setState({ error })
			})
		})
		.catch((error) => {
			this.setState({ error })
		})
	}

	setModalVisible = (visible) => {
		this.setState({
			isModalVisible: visible,
		})
	}


	handlePressIn = () => {
		Animated.timing(this.state.pressAction, {
			duration: ACTION_TIMER,
			toValue: 1
		}).start(this.animationActionComplete);
		Animated.spring(this.animatedValue, {
			toValue: .5
		}).start()
	}
	
	handlePressOut= () => {
		if (this._value < 1) {
			this.props.navigation.navigate('Stack')
		}
		Animated.timing(this.state.pressAction, {
			duration: ACTION_TIMER,
			toValue: 0,
		}).start();
		Animated.spring(this.animatedValue, {
			toValue: 1,
			friction: 3,
			tension: 40
		}).start()
	}
	
	animationActionComplete= () => {
		console.log(this._value)
		if (this._value >= 1) {
			this.setModalVisible(true)
		}
	}

	render() {
		let { navigate } = this.props.navigation;
		const animatedStyle = {
			transform: [{ scale: this.animatedValue }]
		}
		return (
			<View style={styles.container}>
				<View>
				<Modal
				    visible={this.state.isModalVisible}
				    style={styles.view}
				    onSwipeComplete={this.close}
				    swipeDirection={'down'}
					transparent={true}
					animationInTiming="3000"
					animationType="slide"
					animationIn="slideInUp"
				  	animationOut="slideOutDown">
				    	<View style={styles.content}>
							<Text style={styles.contentTitle}>Supprimer la note</Text>
							<Text style={styles.contentTitle}>Voir les médecins ajoutés</Text>
				    		<Button testID={'close-button'} onPress={() => this.setModalVisible(false)} title="Close" />
				  		</View>
				</Modal>
      			</View>
        		<Text style={{color:"#62BE87", textAlign:'center', fontWeight: "bold", justifyContent: 'center', fontSize:30, margin: 30}}>Chronosymple</Text>
				{this.state.loading && <ActivityIndicator size='large' color='black' />}
				{ !this.state.loading && !this.state.Dmodules
					?	
					<View style={styles.WhithoutModule}>
						<Text style={{ marginBottom : 30, fontSize: 20 }}>
							Aucun module actif
						</Text>
						<Button 
							color="#62BE87"
							onPress={() => navigate('Stack')} 
							title="AJOUTER VOTRE PREMIER MODULE EN ALLANT SUR LE MODULE PLACE"
						/>
					</View>
					:
					<ScrollView style={{flex: 1}}>
							<TouchableWithoutFeedback 
            				    onPressIn={this.handlePressIn} 
            				    onPressOut={this.handlePressOut}>
								<Animated.View style={[styles.button, animatedStyle]}>
            				    	<View style={styles.button}>
            				    	    <Text style={styles.text}>Press And Hold Me</Text>
            				    	</View>
								</Animated.View>
            				</TouchableWithoutFeedback>
						
						<FlatList
							style={styles.list}
							data={this.state.Dmodules}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => (
								<ModuleItem
									dModule={item}
									triggerModule={this.changeModule}
									generalUnit={true}>
								</ModuleItem>
							)}
						/>
						<View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: "black", borderStyle: "dashed", borderRadius: 15, margin: 10}}>
							<TouchableOpacity style={{ margin: 20, flexDirection : 'row', alignItems: 'center', justifyContent: 'center', width: "100%", height: "100%"}} onPress={() => navigate('Stack')}>
								<Text style={{fontSize: 20}}>Ajouter un module</Text>						
							</TouchableOpacity>
						</View>
					</ScrollView>
				}
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
		BackHandler.exitApp();
		return true;
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
})

const mapStateToProps = state => ({
	token: state.token,
	currentModule: state.currentModule
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	saveUserCurrentModule: (currentModule) => dispatch(saveUserCurrentModule(currentModule)),	
	saveUserCurrentModuleName: (currentModuleName) => dispatch(saveUserCurrentModuleName(currentModuleName))	
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);