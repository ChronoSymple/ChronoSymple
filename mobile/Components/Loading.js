import React from 'react'
import { StyleSheet, Text, View, Button, Dimensions, ActivityIndicator } from 'react-native'
import { getToken, setToken } from './Auth/Cache'
import { connect } from 'react-redux'
import { APIGetPatientModules } from '../API/APIModule'

class Loading extends React.Component {
	async componentDidMount() {
		let { navigate } = this.props.navigation;
		token = await getToken();
		await APIGetPatientModules(token).then(async data => {
			if (data.status == 200) {
				setToken(token);
				const action = { type: "REGISTER_TOKEN", value: token }
				this.props.dispatch(action)
				navigate('Home')
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