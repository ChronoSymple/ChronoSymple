// Components/Profil.js

import React from 'react'
import { View, Button, Image, Text } from 'react-native'
import { connect } from 'react-redux'

class Profil extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
		<View style={{ flex: 1, alignItems: "center" }}>		
			<View style={{ flex: 3, alignItems: "center", justifyContent : "center" }}>
				<Image
				/* 	source={require('../../Images/profile-2398782_960_720.png')} */
				 	source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'}} 
					style={{ width: 140, height: 140, borderRadius: 140 / 2, borderWidth : 1, borderColor: '#000000'}}
				/>
				<Text>
					Changer
				</Text>
				<Text style={{margin: 10}}>
					mail: uneAdresse@mail.com
				</Text>
			</View>
			<View style={{ flex: 3, alignItems: "center", justifyContent : "space-around"}}>
				<Button 
					color="#62BE87"
					style={{ height: 40, borderWidth: 2, borderColor: '#000000'}}
					title="mes modules"
				/>
				<Button 
					color="#62BE87"
					style={{ height: 40, borderWidth: 2, borderColor: '#000000'}}
					title="changer de mot de passe"
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
      
export default connect(mapStateToProps)(Profil)