
import React from 'react'
import { View,
	Text,
	Button,
	Dimensions,
	StyleSheet,
	TouchableHighlight,
	FlatList,
} from 'react-native'
import { APIGetDoctors, APIAddDoctor, APIRemoveDoctor } from '../../API/APIDoctor';
import { connect } from 'react-redux';

class DoctorChoice extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			data: []
		}
		this.getDoctorsList()

	}

	getDoctorsList = () => {
		APIGetDoctors(this.props.token.token).then(async data => {
			console.log("DoctorChoice - APIGetDoctors - data")
			console.log(data)
			let response = await data.json()
			console.log("DoctorChoice - APIGetDoctors response: ")
			console.log(response)
			this.setState({
				data: response,
			})
		})
	}

	_addDoctor = (item) => {
		console.log("clicked on add doctor ! in Doctor choice page")
		APIAddDoctor(this.props.token.token, item.id).then(async data => {
			console.log("DoctorChoice - APIAddDoctor - data")
			console.log(data)
			let response = await data.json()
			console.log("DoctorChoice - APIAddDoctor response: ")
			console.log(data)
		})
		this.props.navigation.navigate('MyDoctorChoiceStackNavigator')
	}

	_removeDoctor = (item) => {
		console.log('user want to remove the doctor')
		console.log(item)
		APIRemoveDoctor(this.props.token.token, item.id).then(async data => {
			console.log("DoctorChoice - APIRemoveDoctor - data")
			console.log(data)
			let response = await data.json()
			console.log("DoctorChoice - APIRemoveDoctor response: ")
			console.log(response)
		})
		this.props.navigation.navigate('MyDoctorChoiceStackNavigator')
	}

	render() {
		let { navigate } = this.props.navigation;
		let deviceWidth = Dimensions.get('window').width
		const { data } = this.state;
		return (
			<View>
				{/*<FlatList
  					data={data}
  					keyExtractor={(item) => item.id.toString()}
  					renderItem={({item, separators}) => (
    					<TouchableHighlight
    						key={item.id}
      						onShowUnderlay={separators.highlight}
      						onHideUnderlay={separators.unhighlight}>
      						<View key={item.id} style={{backgroundColor: 'white', borderBottomWidth: 1, justifyContent: 'center'}}>
        						<Text style={{margin: 15}}>{item.user.first_name} {item.user.last_name}</Text>
        						<Button
									color="#62BE87"
									style={{borderRadius: 15}}
									onPress={() => {this._addDoctor(item)}}
									title="Ajouter ce docteur"
          						/>
          						<Button
									color="#FF8787"
									style={{borderRadius: 15}}
									onPress={() => {this._removeDoctor(item)}}
									title="Retirer ce docteur"
          						/>
      						</View>
    					</TouchableHighlight>
  					)}
				/>*/}
      		</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1
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
		height: 50
	},
	searchelem: {
		flex: 1
	}
})

const mapStateToProps = (state) => {
	return {
	  token: state.token
	}
      }
      
export default connect(mapStateToProps)(DoctorChoice)

/*navigate('ChooseModulesToSendStackNavigator')*/