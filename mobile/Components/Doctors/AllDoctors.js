import React from 'react'
import { APIGetPatientModules } from '../../API/APIModule'
import {
	ActivityIndicator,
	View,
	SafeAreaView,
	FlatList,
    Text,
    TouchableOpacity
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
                <View style={{backgroundColor:colors.secondary, flex:1, flexDirection: 'column'}}>
					<View style={{flex:1}}></View>
					<View style={{flex:8, flexDirection: 'row', justifyContent:"space-between"}}>
						<TouchableOpacity style={{margin: 10, flex: 2}}>
							<Icon
								name="arrow-back"
								color="#FFF"
								size={35}
								onPress={() => navigate("Profile")}
		    				/>
						</TouchableOpacity>
						<View style={{margin: 10, flex: 8, alignItems: "center", justifyContent: "center"}}>
							<Text style={{color:"white", textAlign:'center', fontWeight: "bold", fontSize:22}}>
								Tous les médecins
							</Text>
						</View>
					</View>
					<View style={{flex:1}}></View>
				</View>
                <View style={{flex: 9}}>
                    {this.state.loading && 
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator size='large' color='black' />
                    </View>
                    }
				    { !this.state.loading && !this.state.Dmodules
				    	?	
				    	<View style={{flex: 1}}>
				    		<Text style={{ marginBottom : 30, fontSize: 20 }}>
				    			Aucun module actif
                                POUR UTILISER L'APPLICATION VOUS DEVEZ AJOUTER UN MODULE
				    		</Text>
				    	</View>
				    	:
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