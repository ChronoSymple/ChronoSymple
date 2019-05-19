// Components/SignUp.js

import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import { LogOutAPatientWithApi } from '../../API/APIConnection'
import { getToken, remove, removeToken } from './StoreToken'
import { connect } from 'react-redux'

class Logout extends React.Component {
	constructor (props) {
		super(props)
	}
		
	componentDidMount() {
		// LogOutAPatientWithApi(this.props.token).then(async data => {
		// 	if (data.status == 200) {
		// 		await removeToken()
		// 		this.props.navigation.navigate('LoginStack');
		// 	}
		// 	else {
		// 		this.props.navigation.goBack();
		// 	}
		// })
		// .catch() // TO DECOMMENT NEXT EIP REU
		this.props.navigation.navigate('LoginStack'); // TO RM NEXT EIP REU
	}

	render() {
		return (
			<View style={styles.main_container}>
				<Text style={{fontSize: 20}}>A la prochaine !</Text>
				<Text>{"\n"}</Text>
				<ActivityIndicator size='large' />
			</View>
		)
	}
}


const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

const mapStateToProps = (state) => {
	return {
	  token: state.token
	}
      }
      
export default connect(mapStateToProps)(Logout)