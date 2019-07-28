import React from 'react'
import { StyleSheet, Text, View, Button, Dimensions, ActivityIndicator } from 'react-native'
import { getToken, setToken } from './Auth/Cache'
import { connect } from 'react-redux'
import { APIGetPatientModules } from '../API/APIModule'
import { LoginAPatientWithApi } from '../API/APIConnection'

class Loading extends React.Component {
	async componentDidMount() {
		let { navigate } = this.props.navigation;
		token = await getToken();
		console.log(token)
		await APIGetPatientModules(token).then(async data => {
			console.log(data)
			if (data.status == 200) {
				let response = await data.json()
				setToken(token);
				const action = { type: "TOGGLE_FAVORITE", value: token }
				this.props.dispatch(action)
				if (response.modules.length > 0 && token !== null) {
					const action = { type: "CURRENT_MODULE", value: response.modules[0].id}
					this.props.dispatch(action)
					this.props.navigation.navigate('HomeModule', {idModule: response.modules[0].id})
				}
				else {
					navigate('Home')
				}
			}
			else {
				navigate('LoginStack')
			}
		})
	}

	render() {
		let deviceWidth = Dimensions.get('window').width
		return (
			<View style={styles.container}>
				<ActivityIndicator size='large' color='white' />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: '#62BE87'
	},

})

const mapStateToProps = (state) => {
	return {
	  token: state.token,
	  idCurrentModule: state.idCurrentModule,
	}
}
      
export default connect(mapStateToProps)(Loading)