import React from 'react'
import { APIGetPatientModules } from '../../API/APIModule'
import {
	ActivityIndicator,
	View,
	SafeAreaView,
	FlatList,
    Text,
	Dimensions,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import DoctorsOfModule from "./DoctorsOfModule"
import { colors } from '../StyleSheet'
import { Icon } from 'react-native-elements'

class AllDoctors extends React.Component {
	constructor(props) {
        super(props)
        const { navigation } = this.props;
		this.state = {
            loading: true,
            Dmodules: []
		}
        this._bootstrapAsync();
		this.focusListener = navigation.addListener('didFocus', () => {
			this.state = {
				loading: true,
                Dmodules: []
			}
			this._bootstrapAsync();
		});
	}

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
					}
				} else if (data.status == 404 || data.status == 500) {
					showMessage({
						message: "Un probleme est survenus. Si le probleme persiste contactez nous",
						type: "danger",
					});
				} else if (data.status == 401) {
					showMessage({
						message: "Une erreur est survenue, vous avez été deconnecter",
						type: "danger",
					});
					this.props.navigation.navigate("Logout");
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
    }

    doctorPressed = (item, moduleId) => {
		this.props.navigation.navigate("DoctorCard", {id: item.id, unitId: moduleId, mode : "delete", pageToReturn: "AllDoctors"})
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignContent: "center", width: Dimensions.get('window').width, flexDirection: "row"}}>
					<View style={{flex: 2}}/>
            		<View style={{flex: 6, justifyContent: "center", alignItems: "center"}}>
            			<Text style={{color: "white", fontWeight: "bold", fontSize:22}}>Vos médecins</Text>
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
                    {this.state.loading ? 
                    	<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    	    <ActivityIndicator size='large' color='black' />
                    	</View>
                    : !this.state.Dmodules
						?	
							<View>
				    			<Text style={{ fontSize: 20 }}>
				    				Aucun module actif
                    		        POUR UTILISER L'APPLICATION VOUS DEVEZ AJOUTER UN MODULE
				    			</Text>
				    		</View>
						:
							this.state.Dmodules.length > 0
							?
						 	<FlatList 
						 		data={this.state.Dmodules} 
						 		keyExtractor={(item) => item.id.toString()} 
						 		renderItem={({item}) => ( 
						 	        <DoctorsOfModule 
						 	            dModule={item} 
						 	            doctorpressed={this.doctorPressed}> 
						 	        </DoctorsOfModule> 
						 		)}
						 	/>
							:
							<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
								<Text>eofjoêfj</Text>
							</View>
				    }
                </View>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token,
	currentModule: state.currentModule
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserCurrentModule: () => dispatch(getUserCurrentModule()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctors);