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
import { getUserCurrentModuleName } from '../Redux/Action/action';

class CheckMOdule extends React.Component {
	constructor(props) {
		super(props)
		this._bootstrapAsync()
		this.focusListener = this.props.navigation.addListener('didFocus', () => {
			this._bootstrapAsync()
	  	});
	}

	_bootstrapAsync = () => {
		this.props.getUserCurrentModuleName().then(() => {
			if (this.props.currentModuleName.currentModuleName == "diabetes")
				this.props.navigation.navigate('ModuleDiabete')
			else
				this.props.navigation.navigate('ModuleAsthma')
		}).catch(error => {
			this.setState({ error })
		})
	}

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
	currentModuleName: state.currentModuleName,
});


const mapDispatchToProps = dispatch => ({
	getUserCurrentModuleName: () => dispatch(getUserCurrentModuleName())
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckMOdule);