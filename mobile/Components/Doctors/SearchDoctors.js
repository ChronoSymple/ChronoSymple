// Components/SearchDoctors.js

import React from 'react'
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, TouchableHighlight} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'
import { colors, windowSize } from '../StyleSheet'
import { APIAddPatientNotes } from '../../API/APIModule'
import { APIGetDoctors, APIGetDoctorsInModule, APIGetDoctorProfile } from '../../API/APIDoctor'
import { getUserToken} from '../../Redux/Action/action';
import { Icon } from 'react-native-elements'

class SearchDoctors extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			search: "",
			general_unitId: this.props.navigation.getParam("general_unitId"),
			unitId: this.props.navigation.getParam("unitId"),
			doctors: [],
			data: [],
			pageToReturn: this.props.navigation.getParam("pageToReturn")
		}
		/*this.getAllDoctorList()*/
		this.getDoctorsList()
	}

	updateSearch = (value) => {
		this.setState({ search: value })
	}

	getDoctorsList = () => {		
		this.props.getUserToken().then(() => {
			APIGetDoctorsInModule(this.props.token.token, this.state.general_unitId).then(async data => {
				let response = await data.json()
				if (data.status == 200) {
					if (response.length > 0 && JSON.stringify(this.state.data) != JSON.stringify(response.data)) {
						this.setState({
							doctors: [ ...response ],
						})
					}
				}
				for (var i = 0; i < this.state.doctors.length; i++) {
					console.log(this.state.doctors[i].id)
					this.getSpecificDoctor(this.state.doctors[i].id)
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	getSpecificDoctor = (id) => {
		this.props.getUserToken().then(() => {
			APIGetDoctorProfile(this.props.token.token, id).then(async data => {
				let response = await data.json()
				response.id = id
				if (data.status == 200) {
					this.setState({
						data: [ ...this.state.data, response ],
					})
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	doctorPressed = (item) => {
		console.log(item)
		this.props.navigation.navigate("DoctorCard", {doctorInfo: item, unitId: this.state.unitId, mode : this.props.navigation.getParam("mode"), actualDoctor: this.props.navigation.getParam("actualDoctor")})
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
					placeholder="Search here ..."
					onChangeText={(text) => this.updateSearch(text)}
					value={this.state.search}>
				</SearchBar>
			</View>
			<View style={{flex: 7.5}}>
				<ScrollView>
					<FlatList
						data={this.state.data}
						keyExtractor={(item) => item.first_name.toString()}
						renderItem={({item}) => (
							<View>
								{ this.checkSearch(item.first_name, item.last_name) &&
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
											<Text style={{ fontSize: 17, color: "#27292C", textTransform: 'capitalize', flex: 4}}>{item.first_name} {item.last_name} </Text>
											<View style={{flex: 1}}/>
										  </View>
										</View>
									</TouchableOpacity>
									}
							</View>
							)}
					/>
				</ScrollView>
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