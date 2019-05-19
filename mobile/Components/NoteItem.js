import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

class NoteItem extends React.Component {
	render() {
		//const { note, _accessDetailNote } = this.props
		//console.log(item)
		return (
			<View></View>
		)
		//	<FlatList style={styles.list}
		//		data={note}
		//		keyExtractor={(item) => item.id.toString()}
		//		renderItem={({item}) => (
		//			<TouchableOpacity
		//				style={styles.note}
		//				onPress={() => _accessDetailNote(item)}>
		//					<Text>{item} + {item}</Text>
		//			</TouchableOpacity>
		//	)}/>
		//)
	}
}
/* 
const styles = StyleSheet.create({
	main_container: {
		margin: 10
	},
  note: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		borderColor: 'black',
		backgroundColor: '#62BE87',
		borderRadius: 0.5,
		padding: 30,
		color: '#000'
	},
}) */

export default NoteItem