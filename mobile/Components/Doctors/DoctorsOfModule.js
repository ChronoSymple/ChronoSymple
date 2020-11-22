import React from 'react'
import {
	Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Image,
    TouchableHighlight,
    Button,
    FlatList,
	} from 'react-native'
import { APIgetDoctorsOfModule } from '../../API/APIModule'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import { connect } from 'react-redux';
import { styles, colors, windowSize } from '../StyleSheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from "@react-native-community/netinfo";

class DoctorsOfModule extends React.Component {

	constructor(props) {
        super(props)
        const { dModule, doctorpressed } = this.props
		this.state = {
			isModalVisible: false,
			modalInternetVisible: false,
            dModule: dModule,
            doctorPressed: doctorpressed,
			doctorsOfModule: this.getDoctors(),
			displayDoctor: true,
			finish: false
        }
	}

    displayDoctor = () => {
		if (!this.state.displayDoctor == true)
			this.getDoctors()
		this.setState({
			finish: false,
			displayDoctor: !this.state.displayDoctor
		})
	}

	setInternetModal = (visible) => {
		this.setState({ modalInternetVisible: visible })
	}

	getDoctors = () => {
		NetInfo.fetch().then((state) => {
			if (state.isConnected == true) {
				this.setInternetModal(false)
			} else {
				this.setInternetModal(true)
			}
		})
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIgetDoctorsOfModule(this.props.token.token, this.state.dModule.id).then(async data => {
                    let response = await data.json()
                    if (data.status == 200) {
						this.setState({ 
							finish: true,
							doctorsOfModule: response
						})
                    } else if (data.status == 404) {
						showMessage({
							message: "l'unit n'a pas été trouvé. Recommencez. Si le probleme persiste contactez nous",
							type: "danger",
						});
						this.props.navigation.navigate("Logout");
                    } else if (data.status == 401) {
                    	showMessage({
							message: "Un probleme est survenus, vous allez être déconnecté",
							type: "danger",
						});
						this.props.navigation.navigate("Logout");
                    }
				}).catch(error => {
					this.setState({ error, finish: true, doctorsOfModule: [] })
				})
			})
		}).catch(error => {
			this.setState({ error, doctorsOfModule: [] })
		})
	}

	render() {
		return (
            <View style={{flex: 1}}>
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
							onPress={() => {this.getDoctors()}}
							title="Actualiser la page"
						/>
					</View>
					<View style={{flex: 1}}/>
				</View>
			</Modal>
				<TouchableOpacity style={{flex: 1, borderTopWidth: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 4}}>
							<Text style={{ padding: 20, fontSize: 18, color: "black", textTransform: 'capitalize' }}>{this.state.dModule.general_unit.name}</Text>
						</View>
						<View style={{flex: 1, alignItems: "flex-end", padding: 15}}>
						{ this.state.displayDoctor ?
                    	    <Icon
                    	        name="keyboard-arrow-up"
                    	        color="black"
								size={35}
								onPress={() => { this.displayDoctor() }}
                    	    />
                    	    :
                    	    <Icon
                    	        name="keyboard-arrow-down"
                    	        color="black"
								size={35}
								onPress={() => { this.displayDoctor() }}
                    	    />
                    	}
						</View>
					</View>
				</TouchableOpacity>

                {!this.state.finish
				?
                    <ActivityIndicator size='large' color='black' style={{marginBottom: 10}} />
				: this.state.displayDoctor
					?
						this.state.doctorsOfModule.length > 0
						?
                			<View>
                				<FlatList
									data={this.state.doctorsOfModule}
									keyExtractor={(item) => item.id.toString()}
									renderItem={({item}) => (
										<View>
											<TouchableOpacity
												onPress={() => {this.state.doctorPressed(item, this.state.dModule.id)}}
											>
												<View style={{height: windowSize.y / 4, backgroundColor: "#f2f3f4", margin: 3, borderRadius: 15, borderWidth: 1, borderColor: '#e5e6e8', flexDirection: "row", marginBottom: 10}}>
												<Image
													source={{
                		                                uri: 'https://image.flaticon.com/icons/png/512/122/122454.png',
													}}
													style={{flex: 5, margin: 15, backgroundColor: "white", borderRadius: 15, borderWidth: 1, borderColor: 'white' }}
                		                            />
												  <View style={{flex: 6, flexDirection: "column" }}>
													<View style={{flex: 2}}/>
													  <Text style={{ fontSize: 18, color: "#27292C", textAlign: "center", flex: 3}}> Dr.  </Text>
													<Text style={{ fontSize: 17, color: "#27292C", textTransform: 'capitalize', flex: 4}}>{item.user.first_name} {item.user.last_name} </Text>
													<View style={{flex: 1}}/>
												  </View>
												</View>
											</TouchableOpacity>
										</View>
									)}
	            	            />
	            	        </View>
						:
							<View>
								<Text style={{textAlign: "center"}}>Vous n'avez pas de médecins rattachés à ce module</Text>
                	    	</View>
					:
						<View><Text>aeindfpief</Text></View>
                }
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
	getUserCurrentModule: () => dispatch(getUserCurrentModule())
});


export default connect(mapStateToProps, mapDispatchToProps)(DoctorsOfModule);
{/* { this.checkSearch(item.first_name, item.last_name) && */}