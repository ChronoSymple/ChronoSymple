// Components/Profil.js

import React from 'react'
import { View, Button, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { APIAddPatientNotes } from '../API/APIModule'
import Navigator from '../Navigation/ProfilNavigator';

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
					source={require('../Images/profile-2398782_960_720.png')}
					style={{ width: 140, height: 140 }}
				/>
				<Text>
					NOM DE L'UTILISATEUR
				</Text>
			</View>
			<View style={{ flex: 7, alignItems: "center" }}>
 	   			<Navigator/>
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