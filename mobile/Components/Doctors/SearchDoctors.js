// Components/SearchDoctors.js

import React from 'react'
import { View, Dimensions,  Text, TextInput, Button, Alert, StyleSheet, Modal, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'
import { colors, windowSize } from '../StyleSheet'
import { APIAddPatientNotes } from '../../API/APIModule'
import { APIGetDoctors, APIGetMyDoctors, APIGetDoctorsInModule, APIGetDoctorProfile } from '../../API/APIDoctor'

/*
Cette classe correspond a la page: Changer de medecin
dans la partie profile du patient -> mes modules -> changer de medecin
*/

class SearchDoctors extends React.Component {
	constructor(props) {
		super(props)
		let moduleId = this.props.navigation.getParam("moduleId")
		this.state = {
			search: "",
			moduleId: moduleId,
			unitId: this.props.navigation.getParam("unitId"),
			doctors: [],
			data: [],

		}
		/*this.getAllDoctorList()*/
		this.getDoctorsList()
	}

	updateSearch = (value) => {
		this.setState({ search: value })
		console.log(this.state.search)
	}

	getAllDoctorList = () => {
		APIGetDoctors(this.props.token.token).then(async data => {
			let response = await data.json()
			/*this.setState({
				data: response,
			})*/
			console.log("SearchDoctors - response:")
			console.log(response)
		})
	}

	getDoctorsList = () => {
		APIGetDoctorsInModule(this.props.token.token, this.state.moduleId).then(async data => {
			console.log("SearchDoctors - response - getDoctorsList")

			console.log(data)
			let response = await data.json()
			if (data.status == 200) {
				if (response.length > 0 && JSON.stringify(this.state.data) != JSON.stringify(response.data)) {
					this.setState({
						doctors: [ ...response ],
					})
				}
			}
			/*this.setState({
				data: [ ...response ],
			})*/
			console.log("test2 SearchDoctors")
			console.log(response)
			for (var i = 0; i < this.state.doctors.length; i++) {
				console.log(this.state.doctors[i].id)
				this.getSpecificDoctor(this.state.doctors[i].id)
			}
		})
	}

	getSpecificDoctor = (id) => {
		APIGetDoctorProfile(this.props.token.token, id).then(async data => {
			console.log("getSpecificDoctor")
			console.log(data)
			let response = await data.json()
			console.log("---")
			response.id = id
			console.log(response)
			if (data.status == 200) {
				this.setState({
					data: [ ...this.state.data, response ],
				})
				console.log(response)
			}
			console.log(this.state.data)
		})
	}

	doctorPressed = (item) => {
		console.log(item)
		this.props.navigation.navigate("DoctorCard", {doctorInfo: item, unitId: this.state.unitId})
	}

	render() {
		return (
		<View>
			<SearchBar
				placeholder="Search here ..."
				onChangeText={(text) => this.updateSearch(text)}
				value={this.state.search}>
			</SearchBar>
			<ScrollView style={{marginTop: 30, marginBottom: 30}}>
				<FlatList
					data={this.state.data}
					keyExtractor={(item) => item.first_name.toString()}
					renderItem={({item}) => (
						<TouchableOpacity
							onPress={() => {this.doctorPressed(item)}}
						>
							<View style={{ alignItems: 'center' }}>
								<Text style={{ fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}> nom: {item.last_name} - prenom: {item.first_name}  </Text>
							</View>
						</TouchableOpacity>
						)}
				/>
			</ScrollView>
		</View>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token,
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserToken: () => dispatch(getUserToken())
});
        
export default connect(mapStateToProps, mapDispatchToProps)(SearchDoctors)