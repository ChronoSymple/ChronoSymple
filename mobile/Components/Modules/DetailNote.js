// Components/ModulePlace.js

import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'
import { styles, colors, windowSize } from '../StyleSheet'

class ModulePlace extends React.Component {
	render() {
		let item = this.props.navigation.getParam('data')
		return (
			<View style={styles2.main_container}>
                <View style={{ flex: 2, justifyContent: "center"}}>
					<Text style={styles.label_green}>Detail</Text>
				</View>
                <View style={{ flex: 7, alignContent: "center"}}>
					<Text style={styles2.moduleText}>Date : {item.date}</Text>
				    <Text>{"\n"}</Text>			
				    <Text style={styles2.moduleText}>Heure : {item.time}</Text>
				    <Text>{"\n"}</Text>			
				    <Text style={styles2.moduleText}>Glucose : {item.BloodGlucose}</Text>
				    <Text>{"\n"}</Text>
				    <Text style={styles2.moduleText}>Insuline (Nourriture) : {item.InsulineFood}</Text>
				    <Text>{"\n"}</Text>
				    <Text style={styles2.moduleText}>Insuline (Corr.) : {item.InsulineCorr}</Text>
				    <Text>{"\n"}</Text>			
				    <Text style={styles2.moduleText}>Description : {item.description}</Text>
					<Text>{"\n"}</Text>			
				    <Text style={styles2.moduleText}>Quel repas : {item.wichLunch}</Text>
                </View>
			</View>
		)
	}
}

const styles2 = StyleSheet.create({
	main_container: {
		flex: 1, 
		justifyContent: "center", 
		alignItems: "center",
		width: windowSize.x
	},
	moduleText: {
		fontSize: 17,
		width: windowSize.x / 1.2
	}
})

export default ModulePlace;