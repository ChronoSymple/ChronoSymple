// Components/SearchDoctors.js

import React from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Image, Modal, Button, TouchableHighlight} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'
import { colors, windowSize, styles } from '../StyleSheet'
import { APIGetDoctorsInModule } from '../../API/APIDoctor'
import { getUserToken} from '../../Redux/Action/action';
import { Icon } from 'react-native-elements'
import NetInfo from "@react-native-community/netinfo";

class SearchDoctors extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			search: "",
			general_unitId: this.props.navigation.getParam("general_unitId"),
			unitId: this.props.navigation.getParam("unitId"),
			doctors: [],
			pageToReturn: this.props.navigation.getParam("pageToReturn"),
			modalInternetVisible: false,
		}
		/*this.getAllDoctorList()*/
		this.getDoctorsList()
	}

	updateSearch = (value) => {
		this.setState({ search: value })
	}

	getDoctorsList = () => {
		NetInfo.fetch().then((state) => {
			if (state.isConnected == true) {
				this.setInternetModal(false)
			} else {
				this.setInternetModal(true)
			}
		})
		this.props.getUserToken().then(() => {
			APIGetDoctorsInModule(this.props.token.token, this.state.general_unitId).then(async data => {
				let response = await data.json()
				if (data.status == 200) {
					this.setState({
						doctors: [ ...response ],
					})
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	setInternetModal = (visible) => {
		this.setState({ modalInternetVisible: visible })
	}

	doctorPressed = (item) => {
		this.props.navigation.navigate("DoctorCard", {id: item.id, unitId: this.state.unitId, mode : this.props.navigation.getParam("mode"), actualDoctor: this.props.navigation.getParam("actualDoctor"), pageToReturn: "SearchDoctors"})
	}

	checkSearch = (first_name, last_name) => {
		if (first_name.indexOf(this.state.search.toLowerCase()) !=-1 || last_name.indexOf(this.state.search.toLowerCase()) !=-1)
			return(true)
		return(false)
	}

	render() {
		let { navigate } = this.props.navigation;
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
							onPress={() => {this.getDoctorsList()}}
							title="Actualiser la page"
						/>
					</View>
					<View style={{flex: 1}}/>
				</View>
			</Modal>
			<View style={{backgroundColor: colors.secondary, flex: 1, flexDirection: 'column'}}>
					<View style={{flex:1}}/>
					<View style={{flex:8, flexDirection: 'row', justifyContent:"space-between"}}>
						<TouchableHighlight style={{margin: 10}}>
							<Icon
								name="arrow-back"
								color="#FFF"
								size={35}
								onPress={() => navigate(this.state.pageToReturn)}
		    				/>
						</TouchableHighlight>
					</View>
					<View style={{flex:1}}/>
			</View>
			<View style={{flex: 1}}>
				<SearchBar					
					round
					lightTheme
					placeholder="Rechercher ..."
					onChangeText={(text) => this.updateSearch(text)}
					value={this.state.search}>
				</SearchBar>
			</View>
			<View style={{flex: 7.5}}>
				<SafeAreaView>
					<FlatList
						data={this.state.doctors}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({item}) => (
							<View>
								{ this.checkSearch(item.user.first_name, item.user.last_name) &&
									<TouchableOpacity
										onPress={() => {this.doctorPressed(item)}}View
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
									}
							</View>
							)}
					/>
				</SafeAreaView>
			</View>
		</View>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token,
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken())
})
        
export default connect(mapStateToProps, mapDispatchToProps)(SearchDoctors)