// Components/SearchDoctors.js

import React from 'react'
import { View, Dimensions,  Text, TextInput, Button, Alert, StyleSheet, Modal, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'
import { APIAddPatientNotes } from '../../API/APIModule'
import { APIGetDoctors, APIGetMyDoctors } from '../../API/APIDoctor'

/*
Cette classe correspond a la page: Changer de medecin
dans la partie profile du patient -> mes modules -> changer de medecin
*/

class SearchDoctors extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			search: ""
		}
		this.getAllDoctorList()
	}

	updateSearch = (value) => {
		this.setState({ search: value })
	}

	getAllDoctorList = () => {
		APIGetDoctors(this.props.token.token).then(async data => {
			let response = await data.json()
			this.setState({
				data: response,
			})
			console.log("SearchDoctors - response:")
			console.log(response)
		})
	}

	render() {
		return (
		<View>
			<SearchBar
				placeholder="Search here ..."
				onChangeText={(text) => this.updateSearch(text)}
				value={this.search}>
			</SearchBar>
			<ScrollView style={{marginTop: 30, marginBottom: 30}}>
				<FlatList
					data={this.state.data}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => (
						<TouchableOpacity>
							<Text> id: {item.id} - nom: {item.user.last_name} - prenom: {item.user.first_name}</Text>
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