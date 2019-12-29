// Components/Calendar.js

import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { APIGetPatientNotesByModule } from '../../API/APIModule'
import { connect } from 'react-redux'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../StyleSheet'

/*import { NoteItem } from './NoteItem' NOT USED*/

class Calendar extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			DNotes: [],
			loading: true
		}
		this._bootstrapAsync();
	}
	
	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIGetPatientNotesByModule(this.props.token.token, this.props.currentModule.currentModule).then(async data => {
					let response = await data.json()
					console.log(data)
					if (data.status == 200) {
						this.setState({
							DNotes: [ ...this.state.DNotes, ...response ],
							loading: false,
						})
					}
					}).catch(error => {
						this.setState({ error })
					})
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
				<View style={{flexDirection: "row", justifyContent: 'space-between'}}>
					<Text style={{color:colors.secondary, fontWeight: "bold", fontSize:30}}>Prise de notes</Text>
					<Icon
						name="add-circle"
						color={colors.secondary}
						size={45}
						onPress={() => this.props.navigation.navigate('AddNote')}
					/>
				</View>
				<ScrollView style={{marginTop: 30, marginBottom: 30}}>
					{this.state.loading && <ActivityIndicator style={{alignSelf: "center"}} size='large' color='black' />}
					<FlatList
						data={this.state.DNotes}
						keyExtractor={(item) => item.id.toString()}			
						renderItem={({item}) => (
							<TouchableOpacity
								onPress={() => this.props.navigation.navigate('DetailNote', item)}
								style={styles.note}>
									<Text style={styles.noteText}>{JSON.parse(item.data).date} {JSON.parse(item.data).heure}</Text>
									<Text style={styles.description}>description de la note</Text>
									<TouchableOpacity onPress={() => this.props.navigation.navigate('EditNote',  {itemDetail: item })}>
										<View style={styles.editBorder}>
											<Icon
												name="edit"
												color={"#874C90"}
												size={15}
			    							/>
											<Text style={styles.edit}>Edit</Text>
										</View>
									</TouchableOpacity>
							</TouchableOpacity>
						)}
					/>
				</ScrollView>
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
		borderWidth: 3.5,
		borderColor: '#F1F1F1',
		borderRadius: 10,
		padding: 15,
		color: '#000',
		marginBottom: 15
	},
	noteText: {
		fontSize: 20,
		color: "#62BE87",
		fontWeight: "bold"
	},
	list: {
		marignTop: 30,
	},
	description: {
		marginTop: 15,
		fontSize: 14,
		color: "E9E9E9"
	},
	editBorder: {
		marginTop: 15,
		paddingLeft: 13,
		paddingRight: 15,
		paddingTop: 3,
		paddingBottom: 3,
		flexDirection: "row",
		borderColor: "#874C90",
		borderWidth: 1.5,
	},
	edit: {
		paddingLeft: 3,
		fontSize: 13,
		color: "#874C90"
	}
})

const mapStateToProps = state => ({
	token: state.token,
	currentModule: state.currentModule
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserCurrentModule: () => dispatch(getUserCurrentModule())
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
