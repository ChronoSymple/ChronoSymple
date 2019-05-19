import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, FlatList} from 'react-native';
import { DrawerActions } from 'react-navigation';
import { COLOR, ThemeProvider, Toolbar, Drawer, Avatar } from 'react-native-material-ui';
import { Icon } from 'react-native-elements'
import { TouchableRipple } from 'react-native-paper';
import { APIGetPatientModules } from '../API/APIModule'
import ModuleItem from '../Components/ModuleItem'
import { connect } from 'react-redux'

class DrawerScreen extends Component {
	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
		this.props.navigation.dispatch(DrawerActions.closeDrawer())
	}
	
	constructor(props) {
		super(props)
		this.state = {
			Dmodules: []
		}
	}

	async InAsyncStorage() {
		try {
			const value = await AsyncStorage.getItem('token');
			return value;
		} catch (error) {
			return error.message;
		}
	}

	async componentDidMount() {
		await APIGetPatientModules(this.props.token).then(async data => {
			if (data.status == 200) {
				let response = await data.json()
				if (JSON.stringify(this.state.Dmodules) != JSON.stringify(response.modules)) {
					this.setState({
						Dmodules: [ ...this.state.Dmodules, ...response.modules ],
					})
				}
			}
		})
	}

	/*_changeModule = (idModule) => {
		const action = { type: "CURRENT_MODULE", value: response.modules[0].id}
		this.props.dispatch(action)
		this.props.navigation.navigate('HomeModule', {idModule: idModule})
	}*/

	render () {
		APIGetPatientModules(this.props.token).then(async data => {
			if (data.status == 200) {
				let response = await data.json()
				if (response.modules.length > 0 && JSON.stringify(this.state.Dmodules) != JSON.stringify(response.modules)) {
					this.setState({
						Dmodules: [ ...response.modules ],
					})
				}
			}
		})
		return (
			<View>
				<ScrollView>
					<View>
						<FlatList
        						data={this.state.Dmodules}
							keyExtractor={(item) => item.id.toString()}
        						renderItem={({ item }) => (
							<TouchableOpacity style={{flex: 1, justifyContent : 'center', alignItems: 'center', flexDirection : 'row', backgroundColor: item.color,
							borderColor: 'black', borderRadius: 10, margin: 5, padding: 20, borderWidth: 3}}
							onPress={this.navigateToScreen('HomeModule', {idModule: item.id})}>
								<Text style={{fontSize: 20}}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
							</TouchableOpacity>
        						)}
        					/>
						<TouchableOpacity style={{ margin: 20, flex: 1, justifyContent : 'center', alignItems: 'center', flexDirection : 'row'}}
							onPress={this.navigateToScreen('Stack')}>
							<Icon style={{ flex: 1}} size='20' color="grey" name="add-circle-outline" size={30}/>
							<Text style={{ flex: 2, marginLeft: 20 , backgroundColor: '#fff', fontSize: 20}}>
								Ajouter un module
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "#F5FCFF"
	},
	welcome: {
			fontSize: 20,
			textAlign: "center",
			margin: 10,
			color: "#000066"
	},
	welcomePress: {
			fontSize: 20,
			textAlign: "center",
			margin: 10,
			color: "#ffffff"
	},
	button: {
			borderColor: "#000066",
			borderWidth: 1,
			borderRadius: 10
	},
	buttonPress: {
			borderColor: "#000066",
			backgroundColor: "#000066",
			borderWidth: 1,
			borderRadius: 10
	}
	});

DrawerScreen.propTypes = {
	navigation: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
	  token: state.token
	}
      }
      
export default connect(mapStateToProps)(DrawerScreen)