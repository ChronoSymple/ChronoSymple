import React from 'react'
import {
	ActivityIndicator,
	StatusBar,
	StyleSheet,
	View,
	Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken, getUserAccountValid } from '../Redux/Action/action';

class Loading extends React.Component {
	componentDidMount() {
		this._bootstrapAsync();
	}
	
	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			if (this.props.token.token == null) {
				this.props.navigation.navigate('Login');
			} else {
				this.props.getUserAccountValid().then(() => {
					if (this.props.token.accountValid != "true") {
						this.props.navigation.navigate("AccountValidation")
					} else {
						this.props.navigation.navigate("Home")
					}
				})
				.catch(error => {
					this.setState({ error })
				})
			}
		})
		.catch(error => {
			this.setState({ error })
		})
	};

	render() {
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

const mapStateToProps = state => ({
	token: state.token,
	accountValid: state.accountValid,
});


const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserAccountValid: () => dispatch(getUserAccountValid()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);