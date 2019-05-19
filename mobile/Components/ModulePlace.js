// Components/ModulePlace.js

import React from 'react'
import { StyleSheet, FlatList, View} from 'react-native'
import ModuleItem from './ModuleItem'
import NoteItem from './NoteItem'
import { APIGetModules, APIAddModule } from '../API/APIModule'
import { connect } from 'react-redux'

class ModulePlace extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			Dmodules: []
		}
		APIGetModules(this.props.token).then(data => {
			this.setState({
				Dmodules: [ ...this.state.Dmodules, ...data.modules ],
			})
		})
	}

	_addModule = (idModule) => {
		const action = { type: "CURRENT_MODULE", value: idModule }
		this.props.dispatch(action)
		APIAddModule(this.props.token, idModule).then(data => {
			if (data.status != 401)
				this.props.navigation.navigate('HomeModule', {idModule: idModule})
			else
				this.props.navigation.navigate('Login', {idModule: idModule})
		})
	}
	
	_searchModule = () => {
		console.log('faire le filtre ici')
	}

	render() {
		return(
			<View style={styles.main_container}>
			<FlatList
				style={styles.list}
				data={this.state.Dmodules}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => (
				  <ModuleItem
				    dModule={item}
				    _addModule={this._addModule}
				  />
				)}
			/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		margin: 10,
		justifyContent: 'center',
	},
	search: { 
		flex: 1,
		flexDirection: 'row',
		height: 50,
		borderColor: '#000000',
		borderWidth: 0.5,
		paddingLeft: 5
	},
	module: { 
		flex: 9,
		height: 50,
	},
	searchelem: {
		flex: 1,
	},
	list: {
		flex: 1,
  	}
})

const mapStateToProps = (state) => {
	return {
	  token: state.token
	}
      }
      
export default connect(mapStateToProps)(ModulePlace)