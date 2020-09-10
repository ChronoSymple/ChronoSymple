// Components/SignUp.js

import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import { LogOutAPatientWithApi } from '../../API/APIConnection'
import { connect } from 'react-redux';
import { removeUserToken } from '../../Redux/Action/action';

class Logout extends React.Component {
	constructor (props) {
		super(props)
	}
		
	componentDidMount() {
		this._bootstrapAsync();
	}
	
	_bootstrapAsync = () => {
		this.props.removeUserToken().then(() => {
			this.props.navigation.navigate("Login");
		})
		.catch(error => {
			this.setState({ error })
		})
	};
	
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

const mapStateToProps = state => ({
	token: state.token,
});


const mapDispatchToProps = dispatch => ({
	removeUserToken: () => dispatch(removeUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);