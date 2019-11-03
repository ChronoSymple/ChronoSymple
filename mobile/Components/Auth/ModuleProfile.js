// Components/ModuleProfile.js

import React from 'react'
import { colors, windowSize } from '../StyleSheet'
import { View, ScrollView, FlatList, StyleSheet, Button, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { APIGetPatientModules, APIAddModule, APIRemoveUnit } from '../../API/APIModule'
import { getUserToken } from '../../Redux/Action/action';
import ModuleItem from '../Modules/ModuleItem'


class ModuleProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			Dmodules: [],
			loading: true,
			moduleSelected: -1
		}
		this._getPatientModule()
	}

	_getPatientModule = () => {
		this.props.getUserToken().then(() => {
			APIGetPatientModules(this.props.token.token).then(async data => {
				console.log("ModuleProfile - APIGetPatientModules - data :")
				console.log(data)
				let response = await data.json()
				console.log("ModuleProfile - APIGetPatientModules - response :")
				console.log(response)
				if (data.status == 200) {
					if (response.length > 0 && JSON.stringify(this.state.Dmodules) != JSON.stringify(response.modules)) {
						this.setState({
							Dmodules: [ ...response ],
							loading: false
						})
					}
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	modulePressed = (item) => {
		this.setState({
			moduleSelected: item.id
		})
	}

	cancelPressed = (item) => {
		this.setState({
			moduleSelected: -1
		})
	}
	removePressed = (item) => {
		console.log('user pressed remove. Need to remove this module')
		console.log(item)
		console.log(this.props.token)
		APIRemoveUnit(this.props.token.token, item.id).then(data => {
			console.log("ModuleProfile - APIRemoveUnit - data: ")
			console.log(data)
		})
	}

	doctorListPressed = (item) => {
		console.log('doctorListPressed')
		console.log(item)
		this.props.navigation.navigate('MyDoctorChoiceStackNavigator');
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={styles.main_container}>
        		<Text style={{color:"#62BE87", textAlign:'center', fontWeight: "bold", justifyContent: 'center', fontSize:30, margin: 30}}>modules du patient</Text>
				{this.state.loading
					?	
					<ActivityIndicator size='large' color='black' />
					:
					<ScrollView style={{flex: 1}}>
						<FlatList
							style={styles.list}
							data={this.state.Dmodules}
							extraData={this.state.moduleSelected}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => (
								<View>
									{this.state.moduleSelected != item.id ?
									<View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>
										<TouchableOpacity style={ styles.module }
											onPress={() => this.modulePressed(item) }>
												<Text style={{ fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}>{item.general_unit.name}</Text>
										</TouchableOpacity>
									</View>
									:
									<View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>
										<TouchableOpacity style={ styles.module }
											onPress={() => this.cancelPressed(item) }>
												<Text style={{ fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}>retour</Text>
										</TouchableOpacity>
										<TouchableOpacity style={ styles.module, {backgroundColor : 'rgba(91, 232, 245, 0.5)'}}
											onPress={() => this.doctorListPressed(item) }>
												<Text style={{ fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}>Liste des docteurs</Text>
										</TouchableOpacity>
										<TouchableOpacity style={ styles.module, {backgroundColor : 'rgba(255, 110, 110, 0.5)'}}
											onPress={() => this.removePressed(item) }>
												<Text style={{ fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}>supprimer</Text>
										</TouchableOpacity>
									</View>
									}
								</View>
							)}
						/>
					</ScrollView>
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	module: {
		flex: 1,
		alignItems: 'center',
		flexDirection : 'row', 
		justifyContent: 'center', 
		width: "100%", 
		height: "100%",
		margin: 20, 
	},
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
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserToken: () => dispatch(getUserToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleProfile)
