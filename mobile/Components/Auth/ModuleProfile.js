// Components/ModuleProfile.js

import React from 'react'
import { colors, windowSize } from '../StyleSheet'
import { View, ScrollView, FlatList, StyleSheet, Button, Image, Text, TouchableOpacity, TouchableHighlight, ActivityIndicator, Modal } from 'react-native'
import { connect } from 'react-redux'
import { APIGetPatientModules, APIAddModule, APIRemoveUnit } from '../../API/APIModule'
import { getUserToken } from '../../Redux/Action/action';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModuleItem from '../Modules/ModuleItem'


class ModuleProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			Dmodules: [],
			loading: true,
			moduleSelected: -1,
			modalModuleVisible: false,
			unitSelected: -1,
		}
		this._getPatientModule()
	}

	_getPatientModule = () => {
		this.props.getUserToken().then(() => {
			APIGetPatientModules(this.props.token.token).then(async data => {
				console.log("Module profile - _getPatientModule :")
				console.log(APIGetPatientModules)
				let response = await data.json()
				if (data.status == 200) {
					if (response.length > 0 && JSON.stringify(this.state.Dmodules) != JSON.stringify(response.modules)) {
						this.setState({
							Dmodules: [ ...response ],
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

	setModalModuleVisible = (visible) => {
		this.setState({ modalModuleVisible: visible })
	}

	modulePressed = (item) => {
		console.log("modulePressed")
		console.log(item)
		this.setState({
			moduleSelected: item.general_unit.id,
			unitSelected: item.id
		})
		this.setModalModuleVisible(true)
	}

	cancelPressed = (item) => {
		this.setState({
			moduleSelected: -1,
			unitSelected: -1,
		})
		this.setModalModuleVisible(false)
	}
	removePressed = (item) => {
		APIRemoveUnit(this.props.token.token, item.id).then(data => {
		})
	}

	changeDoctorPressed = () => {
		this.setModalModuleVisible(false)
		this.props.navigation.navigate('SearchDoctors', {moduleId: this.state.moduleSelected, unitId: this.state.unitSelected });
	}

	doctorCardPressed = () => {
		
		this.setModalModuleVisible(false)
		this.props.navigation.navigate('DoctorCard', {unitId: this.state.unitSelected })
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
						<Modal
							animationType="slide"
							transparent={false}
							visible={this.state.modalModuleVisible}
						>
							<View style={{ flex: 1}}>
								<TouchableHighlight style={{margin: 10}}>
									<Icon
										name="clear"
										color="#62BE87"
										size={35}
										onPress={() => { this.cancelPressed(false); }}
				    				/>
								</TouchableHighlight>
								<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => this.changeDoctorPressed()}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Changer de medecin </Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => this.doctorCardPressed()}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Voir la fiche du medecin </Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => {}}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Supprimer le module </Text>
								</TouchableOpacity>
							</View>

						</Modal>
						<FlatList
							style={styles.list}
							data={this.state.Dmodules}
							extraData={this.state.moduleSelected}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => (
								<View>
									<View style={{flex: 1, justifyContent : 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>
										<TouchableOpacity
											onPress={() => {}}>
												<View style={{alignItems: 'flex-end'}}>
													<Icon
														name="settings"
														color={colors.secondary}
														size={35}
														onPress={() => { this.modulePressed(item) }}
													/>
												</View>
												<View style={{ alignItems: 'center' }}>
													<Text style={{ fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}>{item.general_unit.name}</Text>
												</View>
												<View style={{ alignItems: 'flex-end' }}>
													<Text> docteur: nom prenom </Text>
												</View>
										</TouchableOpacity>
									</View>
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
