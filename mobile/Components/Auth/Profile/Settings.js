import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Alert} from 'react-native';
import { styles, colors, windowSize } from '../../StyleSheet';
import { connect } from 'react-redux';
import { getUserToken } from '../../../Redux/Action/action';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Settings extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignContent: "center", width: Dimensions.get('window').width, flexDirection: "row"}}>
					<View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
            			<Icon
						  	name="arrow-back"
						  	color={"white"}
						  	size={45}
						  	onPress={() => { this.props.navigation.navigate('Profile') }}
						  	style={{justifyContent: "flex-end"}}
						/>
            		</View>
            		<View style={{flex: 6, justifyContent: "center", alignItems: "center"}}>
            			<Text style={{color: "white", fontWeight: "bold", fontSize:22}}>Paramètres</Text>
            		</View>
            		<View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
            			<Icon
						  	name="exit-to-app"
						  	color={"white"}
						  	size={45}
							onPress={() => Alert.alert(
								'Déconnexion',
								"Etes vous sûr de vouloir vous déconnecter ?",
								[
									{text: 'Annuler', style: 'cancel'},
									{text: 'OK', onPress: () => navigate('Logout')},
								],
								{ cancelable: false }
							)}
						  	style={{justifyContent: "flex-end"}}
						/>
            		</View>
          		</View>
				<View style={{flex: 9}}>
					<View style={{ flex: 1}}>
						<TouchableOpacity onPress={() => navigate('FAQProfile')} style={{flex: 1, borderTopWidth: 1}}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 4}}>
									<Text style={{ padding: 20, fontSize: 18, color: "black", textTransform: 'capitalize' }}> FAQ </Text>
								</View>
								<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
									<Icon
										name="chevron-right"
										color="black"
										size={35}
									/>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1}}>
						<TouchableOpacity onPress={() => navigate('ContactProfile')} style={{flex: 1, borderTopWidth: 1}}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 4}}>
									<Text style={{ padding: 20, fontSize: 18, color: "black", textTransform: 'capitalize' }}> Nous Contacter </Text>
								</View>
								<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
									<Icon
										name="chevron-right"
										color="black"
										size={35}
									/>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1}}>
						<TouchableOpacity onPress={() => navigate('AProposProfile')} style={{flex: 1, borderTopWidth: 1}}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 4}}>
									<Text style={{ padding: 20, fontSize: 18, color: "black", textTransform: 'capitalize' }}> A Propos </Text>
								</View>
								<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
									<Icon
										name="chevron-right"
										color="black"
										size={35}
									/>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{flex: 5}}/>
				</View>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token
})

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserToken: () => dispatch(getUserToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings)