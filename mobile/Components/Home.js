import React from 'react'
import { APIGetPatientModules, APIRemoveUnit } from '../API/APIModule'
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
	Animated,
	TouchableHighlight,
	Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken, saveUserCurrentModule, saveUserCurrentModuleName, getUserCurrentModule } from '../Redux/Action/action';

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			Dmodules: null,
			loading: true,
			isModalVisible: false,
			animatedValue: new Animated.Value(1)
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
		
	UNSAFE_componentWillMount = () => {
		this._value = 0;
		this.state.animatedValue.addListener((v) => this._value = v.value);
	}

	deleteUnit = (idModule) => {
		this.props.getUserToken().then(() => {
			APIRemoveUnit(this.props.token.token, idModule).then(async data => {
				if (data.status == 200) {
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
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			APIGetPatientModules(this.props.token.token).then(async data => {
				if (data.status == 200) {
					let response = await data.json()
					if (response.length > 0 && JSON.stringify(this.state.Dmodules) != JSON.stringify(response.modules)) {
						this.setState({
							Dmodules: [ ...response ],
							loading: false
						})
					}
					else {
						this.setState({
							loading: false
						})
					console.log(response)
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

	render() {
		let { navigate } = this.props.navigation;
		const animatedStyle = {
			transform: [{ scale: this.state.animatedValue }]
		}
		return (
			<View style={styles.container}>
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
					<ScrollView style={{flex: 1}}>
						<FlatList
							style={styles.list}
							data={this.state.Dmodules}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => (
								<ModuleItem
									dModule={item}
									triggerModule={this.changeModule}
									generalUnit={true}
									deleteUnit={this.deleteUnit}>
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