// Components/Calendar.js

import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native'
import { APIGetPatientNotesByModule } from '../../API/APIModule'
import { connect } from 'react-redux'
import { getUserToken } from '../../Redux/Action/action';
/*import { NoteItem } from './NoteItem' NOT USED*/

class Calendar extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			DNotes: []
		}
		this._bootstrapAsync();
	}
	
	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			APIGetPatientNotesByModule(this.props.token.token, 1).then(async data => {
				console.log(data)
				let response = await data.json()
				if (data.status == 200) {
					this.setState({
						DNotes: [ ...this.state.DNotes, ...response ],
						loading: false,
					})
				}
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	_accessDetailNote = (DataNote) => {

		this.props.navigation.navigate('DetailNote', {data: JSON.parse(DataNote)})
	}

	render() {
		return (
			<View style={styles.main_container}>
				<View style={{flex: 1, justifyContent: 'space-between', flexDirection: "row", alignItems: "stretch", flexWrap: "wrap"}}>
        				<Text style={{color:"#62BE87", fontWeight: "bold", fontSize:30, alignSelf: "center"}}>Historique</Text>
					<Image source={require("../../assets/36962.png")} style={{width: 35, height: 35}}/>
				</View>
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

const mapStateToProps = state => ({
	token: state.token,
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
