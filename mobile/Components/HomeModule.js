
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

class HomeModule extends React.Component {

	constructor(props) {
		super(props)
		console.log(this.props.idCurrentModule)

	}

	render() {
		let { navigate } = this.props.navigation;
		return (
			<View style={styles.main_container}>
				<TouchableOpacity
				style={styles.noteModule}
				onPress={() => navigate('Note')}>
					<Text style={styles.moduleText}>Note</Text>
				</TouchableOpacity>
				<TouchableOpacity
				style={styles.CalendarMdule}
				onPress={() => navigate('Calendar')}>
					<Text style={styles.moduleText}>Calendrier</Text>
				</TouchableOpacity>
				<TouchableOpacity
				style={styles.StatisticModule}
				onPress={() => navigate('Statistic')}>
					<Text style={styles.moduleText}>Statistic</Text>
				</TouchableOpacity>
				<TouchableOpacity
				style={styles.ExportModule}
				onPress={() => navigate('Export')}>
					<Text style={styles.moduleText}>Export</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		margin: 10,
		justifyContent: 'center',
		flex: 1
	},
	noteModule: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		backgroundColor: '#DEDDC7',
		borderColor: 'black',
		borderRadius: 10,
		padding: 30,
		marginBottom: 30
	},
	CalendarMdule: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		backgroundColor: '#AEECF9',
		borderColor: 'black',
		borderRadius: 10,
		padding: 30,
		marginBottom: 30,
	},
	StatisticModule: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		borderRadius: 10,
		borderColor: 'black',
		padding: 30,
		backgroundColor: '#FF7395',
		marginBottom: 30,
	},
	ExportModule: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		backgroundColor: '#FBC58F',
		borderColor: 'black',
		borderRadius: 10,
		padding: 30,
		marginBottom: 30,
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
      
export default connect(mapStateToProps)(HomeModule)