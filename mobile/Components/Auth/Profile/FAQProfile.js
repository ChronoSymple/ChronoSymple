import React from 'react';
import {View, Text, TouchableOpacity,  Button} from 'react-native';
import { styles, colors, windowSize } from '../../StyleSheet';
import { connect } from 'react-redux';
import { getUserToken } from '../../../Redux/Action/action';

class FAQProfile extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View>
				<Text> FAQProfile </Text>
				<Text> Comment changer son mot de passe ? </Text>
				<Text> Comment changer son adresse mail ? </Text>
				<Text> Comment changer de numéro de téléphone ? </Text>
				<Text> Comment changer de medecin ? </Text>
				<Text> J'ai mal déclaré mes symptomes, est ce possible de la modifier ? </Text>

			</View>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token
})

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserToken: () => dispatch(getUserToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(FAQProfile)