import { StyleSheet, Dimensions } from 'react-native'

const windowSize = {
  x: Dimensions.get('window').width,
  y: Dimensions.get('window').height
};

const colors = {
	//primary: 		"#06C4BF",
	primary: 		"#62BE87",
	activeTextField: 	this.primary,
	secondary: 		"#00928C",
	//tierce:			"#68E0A3",
	tierce:			"#21B086",
	borderColor: 		"grey",
	labelColor: 		"grey",
	errorColor: 		"#e94e62"
};


const styles = StyleSheet.create({
	title: {
		fontSize: 24
	},
	navBar: {
		backgroundColor: colors.primary
	},
	textField: {
		height: 40,
		marginBottom: 30,
		borderBottomWidth: 1,
		borderColor: colors.borderColor
	},
	textFieldFocus: {
		height: 40,
		marginBottom: 30,
		borderBottomWidth: 1,
		borderColor: colors.primary
	},
	label: {
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.labelColor
	}, mainContner: {
		flex: 1,
		// alignItems: "center", 
		alignSelf: "center",
		// justifyContent: "center",
		width: windowSize.x / 1.1,
		marginTop: 40,
		marginBottom: 30
	},
	AuthBackgroundContainer: {
		backgroundColor: colors.primary,
		flex: 1
	},
	AuthMainContainer: {
		backgroundColor: 'white',
		flex: 1,
		alignSelf: "center",
		width: windowSize.x / 1.2,
		marginTop: 120,
		marginBottom: 120,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: 'white',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 10
  	}
});

export { styles, colors, windowSize }