import React from 'react';
import {View, Text, TouchableOpacity,  Button, TextInput} from 'react-native';
import { styles, colors, windowSize } from '../../StyleSheet';
import { connect } from 'react-redux';
import { getUserToken } from '../../../Redux/Action/action';

class ContactProfile extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={{flex: 1}}>
				<Text> ContactProfile </Text>

				<Text> Sujet </Text>
				<View style={{ flex: 1, justifyContent: "center", alignContent: 'center'}}>
		            <Text> Sujet </Text>
		            <TextInput
		              placeholder="Sujet"
		              onChangeText={(text) => {}}
		              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
		            />
				</View>
				<Text> Message </Text>
				<View style={{ flex: 1, justifyContent: "center", alignContent: 'center'}}>
		            <Text> Message </Text>
		            <TextInput
		              placeholder="Message"
		              onChangeText={(text) => {}}
		              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
		            />
				</View>
				<Text> Adresse mail </Text>
				<View style={{ flex: 1, justifyContent: "center", alignContent: 'center'}}>
		            <Text> Adresse mail </Text>
		            <TextInput
		              placeholder="Adresse mail"
		              onChangeText={(text) => {}}
		              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
		            />
				</View>
				<Text> Numero de téléphone (facultatif) </Text>
				<View style={{ flex: 1, justifyContent: "center", alignContent: 'center'}}>
		            <Text> Numero de téléphone (facultatif) </Text>
		            <TextInput
		              placeholder="Numero de téléphone (facultatif)"
		              onChangeText={(text) => {}}
		              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
		            />
				</View>
				<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
					<View>
						<Button 
							color="#62BE87"
							style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
							onPress={() => {}}
							title="Retour"
						/>
					</View>
					<View>
						<Button 
						color="#62BE87"
						style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
						onPress={() => {}}
						title="Confirmer"
						/>
					</View>
				</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactProfile)