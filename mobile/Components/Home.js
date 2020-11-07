import React from 'react'
import { APIGetPatientModules, APIRemoveUnit } from '../API/APIModule'
import ModuleItem from './Modules/ModuleItem'
import {
	ActivityIndicator,
	StyleSheet,
	View,
	SafeAreaView,
	FlatList,
	Text,
	Button,
	BackHandler,
	TouchableOpacity,
	Animated,
	Modal,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { connect } from 'react-redux';
import { getUserToken, saveUserCurrentModule, saveUserCurrentModuleName, getUserCurrentModule } from '../Redux/Action/action';
import { TouchableHighlight} from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialIcons';


class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			Dmodules: null,
			loading: true,
			isModalVisible: false,
			animatedValue: new Animated.Value(1),
			modalInternetVisible: false,
		}
		this.focusListener = this.props.navigation.addListener('didFocus', () => {
			this.state = {
				Dmodules: null,
				loading: true
			}
			this._bootstrapAsync()
	  	});
	}

	reset = () => {
		this.state = {
			Dmodules: null,
			loading: true
		}
	}
		
	UNSAFE_componentWillMount = () => {
		this._value = 0;
		this.state.animatedValue.addListener((v) => this._value = v.value);
	}

	deleteUnit = (idModule) => {
		this.props.getUserToken().then(() => {
			APIRemoveUnit(this.props.token.token, idModule).then(async data => {
				if (data.status == 200) {
					showMessage({
						message: "Le module a été supprimé",
						type: "success",
					});
					this.props.getUserCurrentModule().then(() => {
						this.setState({
							Dmodules: null,
							loading: true
						})
						this._bootstrapAsync();
						if (idModule == this.props.currentModule.currentModule)
							this.props.navigation.navigate('HomeTabs')
					}).catch(error => {
						this.setState({ error })
					})
				} else if (data.status == 404 && data.status == 500) {
					showMessage({
						message: "Un probleme est survenus, vous allez être déconnecté",
						type: "danger",
					});
					this.props.navigation.navigate("Logout");
				} else {
					showMessage({
						message: "Nous n'avons pas réussis à supprimer votre module, réessayez plus tard",
						type: "danger",
					});
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = () => {
		NetInfo.fetch().then((state) => {
			console.log(
				"Initial, type: " +
				state.type +
				', effectiveType: ' +
				state.effectiveType +
				', is connected: ' +
				state.isConnected
			);
			if (state.isConnected == true) {
				this.setState({ modalInternetVisible: false })
			} else {
				this.setState({ modalInternetVisible: true })
			}
		})
		this.props.getUserToken().then(() => {
			APIGetPatientModules(this.props.token.token).then(async data => {
				if (data.status == 200) {
					let response = await data.json()
					if (response.length > 0 && JSON.stringify(this.state.Dmodules) != JSON.stringify(response.modules)) {
						this.setState({
							Dmodules: [ ...response ],
							loading: false
						})
					} else {
						this.setState({
							loading: false
						})
					}
				} else if (data.status == 404 && data.status == 500) {
					showMessage({
						message: "Un probleme est survenus, vous allez être déconnecté",
						type: "danger",
					});
					this.props.navigation.navigate("Logout");
				} else {
					showMessage({
						message: "Nous n'avons pas réussis à récupérer vos modules, réessayez plus tard",
						type: "danger",
					});
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

	setInternetModal = (visible) => {
		this.setState({
			modalInternetVisible: visible,
		})
	}

	setModalVisible = (visible) => {
		this.setState({
			isModalVisible: visible,
		})
	}

	changeDoctor = (unitId, general_unitId, mode, actualDoctor) => {
		this.props.navigation.navigate('SearchDoctors', {unitId: unitId, general_unitId: general_unitId, pageToReturn: "Home", mode: mode, actualDoctor: actualDoctor});
	}

	render() {
		let { navigate } = this.props.navigation;
		const animatedStyle = {
			transform: [{ scale: this.state.animatedValue }]
		}
		return (
			<View style={styles.container}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalInternetVisible}
				>
					<View style={{ flex: 1, marginTop: 10}}>
						<View style={{flex: 1 }}>
						<TouchableHighlight style={{margin: 10}}>
							<Icon
								name="clear"
								color="#62BE87"
								size={35}
								onPress={() => this.setInternetModal(false)}
							/>
						</TouchableHighlight>
						</View>
						<View style={{flex: 1}}>
							<Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#62BE87'}}>
								Un probleme est survenue.{'\n'}Ceci peut etre du a un probleme de connexion internet{'\n'}{'\n'}
							</Text>
							<Button 
								style={styles.buttonNoModule}
								color="#62BE87"
								onPress={() => {this._bootstrapAsync()}}
								title="Actualiser la page"
							/>
						</View>
						<View style={{flex: 1}}/>
					</View>
				</Modal>
        		<Text style={{color:"#62BE87", textAlign:'center', fontWeight: "bold", justifyContent: 'center', fontSize:30, margin: 30}}>Chronosymple</Text>
				{this.state.loading && <ActivityIndicator size='large' color='black' />}
				{ !this.state.loading && !this.state.Dmodules
					?	
					<View style={styles.WhithoutModule}>
						<Text style={{ marginBottom : 30, fontSize: 20 }}>
							Aucun module actif
						</Text>
						<Button 
							style={styles.buttonNoModule}
							color="#62BE87"
							onPress={() => navigate('Stack')} 
							title="POUR UTILISER L'APPLICATION VOUS DEVEZ AJOUTER UN MODULE"
						/>
					</View>
					:
					<SafeAreaView style={{flex: 1}}>
						<View style={styles.list}>
							<FlatList
								data={this.state.Dmodules}
								keyExtractor={(item) => item.id.toString()}
								renderItem={({item}) => (
									<ModuleItem
										dModule={item}
										triggerModule={this.changeModule}
										generalUnit={true}
										deleteUnit={this.deleteUnit}
										doctorChoice={this.changeDoctor}>
									</ModuleItem>
								)}
							/>
						</View>
						<View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: "black", borderStyle: "dashed", borderRadius: 15, margin: 10}}>
							<TouchableOpacity style={{ margin: 20, flexDirection : 'row', alignItems: 'center', justifyContent: 'center', width: "100%", height: "100%"}} onPress={() => navigate('Stack')}>
								<Text style={{fontSize: 20}}>Ajouter un module</Text>						
							</TouchableOpacity>
						</View>
					</SafeAreaView>
				}
			</View>
		)
	}

	componentDidMount() {
		this._bootstrapAsync();
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
	list: {
		flex: 9
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
	width: 400,
	buttonNoModule: {
		justifyContent: 'center',
		alignItems: 'center'
	}
})

const mapStateToProps = state => ({
	token: state.token,
	currentModule: state.currentModule
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserCurrentModule: () => dispatch(getUserCurrentModule()),
	saveUserCurrentModule: (currentModule) => dispatch(saveUserCurrentModule(currentModule)),	
	saveUserCurrentModuleName: (currentModuleName) => dispatch(saveUserCurrentModuleName(currentModuleName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);