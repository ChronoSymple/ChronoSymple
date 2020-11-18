// Components/ModulePlace.js

import React from 'react'
import ModuleItem from './ModuleItem'
import { APIGetModules, APIAddModule, APIGetPatientModules } from '../../API/APIModule'
import {
	ActivityIndicator,
	BackHandler,
	StyleSheet,
	View,
	FlatList,
	SafeAreaView,
	Text,
	Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken, saveUserCurrentModule, saveUserCurrentModuleName } from '../../Redux/Action/action';
import { showMessage } from "react-native-flash-message";
import { colors } from '../StyleSheet'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchBar } from 'react-native-elements'

class ModulePlace extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			Dmodules: [],
			loading: true,
			search: false
		}
		this._bootstrapAsync();
	}

	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			APIGetModules(this.props.token.token).then(async data => {
				let response = await data.json()
				if (data.status == 200) {
					this.setState({
						Dmodules: [ ...this.state.Dmodules, ...response.modules ],
						loading: false,
					})
				} else if (data.status == 401) {
					showMessage({
						message: "Un probleme est survenus, vous allez être déconnecté",
						type: "danger",
					});
					this.props.navigation.navigate("Logout");
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	_addModule = (idModule, moduleName) => {
		this.props.getUserToken().then(() => {
			APIAddModule(this.props.token.token, idModule).then(data => {
				if (data.status == 200 || data.status == 422)
				{
					APIGetPatientModules(this.props.token.token).then(async data => {
						if (data.status == 200) {
							let response = await data.json()
							for (var i = 0; i < response.length; i++) {
								if (response[i].general_unit.name == moduleName)
									this.props.saveUserCurrentModule(response[i].id.toString())
									.then(() => {
										this.props.saveUserCurrentModuleName(moduleName)
											.then(() => {
												showMessage({
													message: "Le module " + moduleName + " a été ajouté",
													type: "success",
												});
												this.props.navigation.navigate('Module', {idModule: idModule})
											})
											.catch((error) => {
												showMessage({
													message: "Une erreur est survenue : Le module " + moduleName + " n'a été ajouté",
													type: "danger",
												});
												this.setState({ error })
											})
										})
										.catch((error) => {
											showMessage({
												message: "Une erreur est survenue : Le module " + moduleName + " n'a été ajouté",
												type: "danger",
											});
											this.setState({ error })
										})
							}
						} else if (data.status == 404 || data.status == 500) {
							showMessage({
								message: "Un probleme est survenus, si le probleme persiste contactez nous",
								type: "danger",
							});
						} else if (data.status == 401) {
							showMessage({
								message: "Un probleme est survenus, vous allez etre déconnecté",
								type: "danger",
							});
							this.props.navigation.navigate("Logout")
						}
					})
				}
				else
					this.props.navigation.navigate('Login', {idModule: idModule})
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	_searchModule = () => {
	}

	render() {
		return(
			<View style={styles.main_container}>
        		<View style={{flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignContent: "center", width: Dimensions.get('window').width, flexDirection: "row"}}>
					<View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
            			<Icon
						  	name="arrow-back"
						  	color={"white"}
							size={45}
						  	onPress={() => { this.props.navigation.navigate('Home')}}
						  	style={{justifyContent: "flex-end"}}
						/>
            		</View>
            		<View style={{flex: 6, justifyContent: "center", alignItems: "center"}}>
            			<Text style={{color: "white", fontWeight: "bold", fontSize:22}}>Tous les modules</Text>
            		</View>
            		<View style={{flex: 2}}>
            		</View>
          		</View>
				{this.state.loading
					?	
					<ActivityIndicator style={{flex: 9}} size='large' color='black' />
					:
					<SafeAreaView style={{flex: 9, flexDirection: "column"}}>
						<SearchBar					
							round
							lightTheme
							placeholder="Search here ..."
							onChangeText={(text) => this.updateSearch(text)}
							value={this.state.search}
							style={{flex: 1, backgroundColor: "green"}}>
						</SearchBar>
						<FlatList
							style={styles.list}
							data={this.state.Dmodules}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => (
								<ModuleItem
									dModule={item}
									triggerModule={this._addModule}
									generalUnit={false}
								/>
							)}
						/>
					</SafeAreaView>
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
		this.props.navigation.navigate('Home')
		return true;
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		justifyContent: 'center',
	},
	search: { 
		flex: 1,
		flexDirection: 'row',
		height: 50,
		borderColor: '#000000',
		borderWidth: 0.5,
		paddingLeft: 5
	},
	list: {
		flex: 9
  	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
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

export default connect(mapStateToProps, mapDispatchToProps)(ModulePlace);