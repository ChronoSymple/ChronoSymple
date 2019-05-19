// Components/Calendar.js

import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native'
import { APIGetPatientNotesByModule } from '../API/APIModule'
import { connect } from 'react-redux'
import { NoteItem } from './NoteItem'

class Calendar extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			DNotes: []
		}
		APIGetPatientNotesByModule(this.props.token, this.props.idCurrentModule).then(data => {
			console.log(data)
			this.setState({
				DNotes: [ ...data.notes ]
			})
		})
	}
	
	_accessDetailNote = (DataNote) => {

		this.props.navigation.navigate('DetailNote', {data: JSON.parse(DataNote)})
	}

	render() {
		APIGetPatientNotesByModule(this.props.token, this.props.idCurrentModule).then(data => {
			if (data.status == 200) {
				let response = data.json()
				if (response.modules.length > 0 && JSON.stringify(this.state.DNotes) != JSON.stringify(response.modules)) {
					this.setState({
						DNotes: [ ...response.notes ],
					})
				}
			}
		})
		return (
			<View style={styles.main_container}>
				<FlatList
				style={styles.list}
				data={this.state.DNotes}
				keyExtractor={(item) => item.id.toString()}			
				renderItem={({item}) => (
					<TouchableOpacity
						style={styles.note}
						onPress={() => this._accessDetailNote(item.data)}>
							<Text style={styles.moduleText}>{JSON.parse(item.data).date} {JSON.parse(item.data).heure}</Text>
					</TouchableOpacity>
					//<NoteItem/>
					)}
				/>
			</View>
		)
	}
}

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
		borderRadius: 10,
		padding: 30,
		color: '#000',
		marginBottom: 30
	},
	moduleText: {
		fontSize: 20
	}
})

const mapStateToProps = (state) => {
	return {
	  token: state.token,
	  idCurrentModule: state.idCurrentModule
	}
      }
      
export default connect(mapStateToProps)(Calendar)