import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Button
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken } from '../../Redux/Action/action';
import { colors, windowSize } from '../StyleSheet'

class AccountValidation extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			code: "", 
			isInvalid: false,
			textFiledFocusColor: colors.primary,
			passwordFocused: false,
			codeFocused: false
		}
	}

	checkCodeValidation = () => {
		this.props.navigation.navigate('Home');
	}

	setCode = (text) => {
		this.setState({ code: text })
	}

	textFieldFocused = (state) => {
		this.setState({[state]: true})
	}

	textFieldBlured = (state) => {
		this.setState({[state]: false})
	}

	render() {
		let { navigate } 			= this.props.navigation;
		let login 					= "Valider le code";
		let errorMessage 			= "Mauvais code de validation";
		let codeFocused 			= "codeFocused";
		let passwordFocused 		= "passwordFocused"

		return (
        <View style={styles.container}>
			<View style={{ flex: 2}}></View>
			<View style={{ flex: 3, justifyContent: "center", alignItems: "center"}}>
				<View style={{ flex: 2}}></View>
            	<Text style={{ flex: 2, fontSize: 25}}>
            	    CODE DE VALIDATION
            	</Text>
				<View style={{ flex: 2}}></View>
        		<TextInput
            	    onFocus={() => this.textFieldFocused(codeFocused)}
            	    onBlur={() => this.textFieldBlured(codeFocused)}
            	    style={[this.state[codeFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5, borderWidth: 2, borderColor: "white", borderBottomColor: colors.secondary}]}
            	    autoCorrect={false}
            	    onChangeText={(text) => this.setCode(text)}
            	    value={this.code}
            	/>
				<View style={{ flex: 2}}></View>
			</View>
			<View  style={{ flex: 3, justifyContent: 'center'}}>
				<View style={{ flex: 2, justifyContent: "center", alignItems: "center"}}>
					{this.state.isInvalid && <Text style={{ color: colors.errorColor }}>{errorMessage}</Text>}
				</View>
				<View style={{ flex: 2, justifyContent: "center"}}>
					<Button 
						color={colors.primary}
						onPress={() => this.checkCodeValidation()}
						title={login}
					/>
				</View>
            	<Text style={{ flex: 2, width: windowSize.x / 1.5}}>
            	    Vous n'avez pas reçu d'email, Renvoyez-moi un email !
            	</Text>
			</View>
			<View style={{ flex: 2}}></View>
        </View>
		)
    }
}

{/*  <View style={styles.container}>
	 <ActivityIndicator size='large' color='white' />
 </View> */}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

})

const mapStateToProps = state => ({
	token: state.token,
});


const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountValidation);