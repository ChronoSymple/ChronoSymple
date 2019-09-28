// Components/Profil.js

import React from 'react'
import { View, Dimensions,  Text, TextInput, Button, Alert} from 'react-native'
import { connect } from 'react-redux'
import { APIAddPatientNotes } from '../../API/APIModule'

class Profil extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
		<View style={{ flex: 1, alignItems: "center" }}>
			<Text>BIENVENUE SUR LA PAGE PROFIL</Text>
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