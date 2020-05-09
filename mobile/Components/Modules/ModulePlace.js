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
	Text
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken, saveUserCurrentModule, saveUserCurrentModuleName } from '../../Redux/Action/action';

class ModulePlace extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			Dmodules: [],
			loading: true
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
						let response = await data.json()
						for (var i = 0; i < response.length; i++) {
							if (response[i].general_unit.name == moduleName)
								this.props.saveUserCurrentModule(response[i].id.toString())
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
        			<Text style={{color:"#62BE87", textAlign:'center', fontWeight: "bold", justifyContent: 'center', fontSize:30, margin: 30}}>Tous les modules</Text>
				{this.state.loading
					?	
					<ActivityIndicator size='large' color='black' />
					:
					<SafeAreaView style={{flex: 1}}>
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
		margin: 10,
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
		flex: 1,
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