// Components/Profil.js

import React from 'react'
import { View, Dimensions,  Text, TextInput, Button, Alert} from 'react-native'
import { connect } from 'react-redux'
import { APIAddPatientNotes } from '../API/APIModule'

class Profil extends React.Component {
	constructor(props) {
		super(props)
		this.state = { glycemie: "", glucide: "", insulineavrepas: "", Insulineaprepas: "", insulineajeun: "", date: "", heure: "", isSend: false}
	}

	render() {
		return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>ok{"\n"}</Text>
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