import React from 'react'
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	View,
	Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken } from '../Redux/Action/action';

class Loading extends React.Component {
	componentDidMount() {
		this._bootstrapAsync();
	}
	
	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			this.props.navigation.navigate(this.props.token.token !== null ? 'Home' : 'Login');
		})
		.catch(error => {
			this.setState({ error })
		})
	
	};

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

const mapStateToProps = state => ({
	token: state.token,
});


const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loading);