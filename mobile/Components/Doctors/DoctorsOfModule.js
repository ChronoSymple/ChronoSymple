import React from 'react'
import {
	Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image
	} from 'react-native'
import { APIgetDoctorsOfModule } from '../../API/APIModule'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import { connect } from 'react-redux';
import { windowSize } from '../StyleSheet'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';

class DoctorsOfModule extends React.Component {

	constructor(props) {
        super(props)
        const { dModule, doctorpressed } = this.props
		this.state = {
			isModalVisible: false,
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

	getDoctors = () => {
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIgetDoctorsOfModule(this.props.token.token, this.state.dModule.id).then(async data => {
                    let response = await data.json()
                    console.log(response)
					this.setState({ 
						finish: true,
						doctorsOfModule: response
					})
				}).catch(error => {
					this.setState({ error, finish: true })
				})
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	render() {
		return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={{ paddingLeft: 15, paddingRight: 15, flexDirection: "row", alignItems: 'center', justifyContent : "space-around"}} onPress={() => {this.displayDoctor()}}>
                    <Text style={{ flex: 9, marginTop: windowSize.y / 30, fontSize: windowSize.y / 40, textTransform: 'capitalize'}}>{this.state.dModule.general_unit.name}</Text>
                    { this.state.displayDoctor ?
                        <Icon
                            style={{ flex: 1, marginTop: windowSize.y / 30 }}
                            name="keyboard-arrow-up"
                            color="#000"
                            size={25}
                            onPress={() => { this.displayDoctor() }}
                        />
                        :
                        <Icon
                            style={{ flex: 1, marginTop: windowSize.y / 30 }}
                            name="keyboard-arrow-down"
                            size={25}
                            color="#000"
                            onPress={() => { this.displayDoctor() }}
                        />
                    }
                </TouchableOpacity>
                {this.state.displayDoctor && !this.state.finish && 
                    <ActivityIndicator size='large' color='black' />
                }
                { this.state.finish && this.state.displayDoctor && this.state.doctorsOfModule.length > 0 &&
                    <View>
                       <FlatList
						    data={this.state.doctorsOfModule}
						    keyExtractor={(item) => item.id.toString()}
						    renderItem={({item}) => (
							    <View>
									<TouchableOpacity
										onPress={() => {this.state.doctorPressed(item, this.state.dModule.id)}}
                                        >
										<View style={{height: windowSize.y / 4, backgroundColor: "#f2f3f4", margin: 3, borderRadius: 15, borderWidth: 1, borderColor: '#e5e6e8', flexDirection: "row"}}>
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
								{/* 	} */}
							</View>
							)}
                            />
                    </View>
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