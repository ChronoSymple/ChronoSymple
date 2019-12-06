// Components/Profile.js

import React from 'react'
import { View, Button, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { getPatientInfoWithApi } from '../../API/APIConnection'


class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			picture: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
		}

		getPatientInfoWithApi(this.props.token.token).then(async data => {
			console.log("Profile - data :")
			console.log(data)
			let response = await data.json()
			console.log("Profile - response: ")
			console.log(response)
			this.setState({
				firstName: response.first_name,
				lastName: response.last_name,
				email: response.email,
				picture: response.picture ? response.picture : 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
			})
		})
	}

	changeProfilePhoto = () => {
		console.log('changeProfilePhoto button pressed')
	}


	render() {
		let { navigate } = this.props.navigation;
		return (
		<View style={{ flex: 1, alignItems: "center" }}>
			<View style={{ flex: 3, alignItems: "center", justifyContent : "center" }}>
				<Image
				/* 	source={require('../../Images/profile-2398782_960_720.png')} */
				 	source={{uri: this.state.picture}}
					style={{ width: 140, height: 140, borderRadius: 140 / 2, borderWidth : 1, borderColor: '#000000'}}
				/>
				<Button
					onPress={() => this.changeProfilePhoto()} 
					title="changer"
				/>
				<Text style={{margin: 10}}>
					email: {this.state.email}
				</Text>
				<Text>
					{this.state.lastName} {this.state.firstName}
				</Text>
			</View>
			<View style={{ flex: 3, alignItems: "center", justifyContent : "space-around"}}>
				<Button 
					color="#62BE87"
					style={{ height: 40, borderWidth: 2, borderColor: '#000000'}}
					onPress={() => navigate('InfoProfile')} 
					title="info"
				/>
				<Button 
					color="#62BE87"
					style={{ height: 40, borderWidth: 2, borderColor: '#000000'}}
					onPress={() => navigate('ModuleProfile')} 
					title="mes modules"
				/>
				<Button 
					color="#62BE87"
					style={{ height: 40, borderWidth: 2, borderColor: '#000000'}}
					onPress={() => navigate('PasswordProfile')}
					title="changer de mot de passe"
				/>
				<Button 
					color="#62BE87"
					style={{ height: 40, borderWidth: 2, borderColor: '#000000'}}
					onPress={() => navigate('SupportProfile')}
					title="support"
				/>
				<Button 
					color="#62BE87"
					style={{ height: 40, borderWidth: 2, borderColor: '#000000'}}
					onPress={() => navigate('Logout')} 
					title="Se déconnecter"
				/>
			</View>

		</View>
		)
	}
}


const mapStateToProps = (state) => {
	return {
	  token: state.token,
	  idCurrentModule: state.idCurrentModule
	}
      }
      
export default connect(mapStateToProps)(Profile)