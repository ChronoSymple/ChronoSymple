// Components/ModulePlace.js

import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableRipple } from 'react-native-paper';

class ModulePlace extends React.Component {
	render() {
		let item = this.props.navigation.getParam('data')
		return (
			<View style={styles.main_container}>
				<Text style={styles.moduleText}>Glycemie : {item.Glycemie}</Text>
				<Text>{"\n"}</Text>
				<Text style={styles.moduleText}>Glucide : {item.Glucide}</Text>
				<Text>{"\n"}</Text>
				<Text style={styles.moduleText}>Insuline a jeun : {item.InsulineAvRepas}</Text>
				<Text>{"\n"}</Text>
				<Text style={styles.moduleText}>Insuline avant repas : {item.InsulineApRepas}</Text>
				<Text>{"\n"}</Text>			
				<Text style={styles.moduleText}>Insuline après repas : {item.InsulineAJeun}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1, 
		justifyContent: "center", 
		alignItems: "center"
	},
	moduleText: {
		fontSize: 20
	}
})

export default ModulePlace;