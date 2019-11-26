// Components/ModulePlace.js

import React from 'react'
import { View, Text, Button, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { getUserToken } from '../../Redux/Action/action';
import { APIRemovePatientNotes } from '../../API/APIModule'
import { styles, colors, windowSize } from '../StyleSheet'
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon_Ant from 'react-native-vector-icons/AntDesign';

class EditNote extends React.Component {
	constructor(props) {
		super(props)
		let item = this.props.navigation.getParam("itemDetail")
		obj = JSON.parse(item.data)
		console.log(obj.InsulineFood)
		console.log(item)
		this.state = {
			BloodGlucose: obj.BloodGlucose, 
			InsulineFood: obj.InsulineFood, 
			InsulineCorr: obj.InsulineCorr, 
			description: obj.description,
			wichLunch: obj.wichLunch,
			date: obj.date,
			time: obj.time,
			id: item.id
		}
	}
   
 	_bootstrapAsync = (id) => {
            this.props.getUserToken().then(() => {
            APIRemovePatientNotes(this.props.token.token, id).then(data => {
                if (data.status == 200) {
                    this.setState({ isRemoved: true })
                    this.props.navigation.navigate('Calendar')
                }
            })
        }).catch(error => {
            this.setState({ error })
        })
    }
 
	render() {
		let { navigate } = this.props.navigation;

		return (
			<View style={styles2.main_container}>
				<View style={{backgroundColor:colors.secondary, flex:1, flexDirection: 'column'}}>
					<View style={{flex:1}}></View>
					<View style={{flex:8, flexDirection: 'row', justifyContent:"space-between"}}>
						<TouchableHighlight style={{margin: 10}}>
							<Icon
								name="clear"
								color="#FFF"
								size={35}
								onPress={() => navigate("Calendar")}
			    			/>
						</TouchableHighlight>
						<TouchableHighlight style={{margin: 10}}>
							<Icon
								name="check"
								color="#FFF"
								size={35}
								onPress={() => this._bootstrapAsync()}
			    			/>
						</TouchableHighlight>
					</View>
					<View style={{flex:1}}></View>
				</View>
                <View style={{ flex: 2, justifyContent: "center"}}>
					<Text style={styles.label_green}>Edit</Text>
				</View>
				<View style={{ flex: 2, justifyContent: "center", alignCOntent: 'center'}}>
					<View style={{flex: 0.5}}></View>
					<View style={{flex: 4.25, fontSize: 20, flexDirection:"row"}}>
						<View style={{ flex: 1.5}}></View>
						<Icon_Ant
							name="clockcircleo"
							color="#000"
							size={40}
							onPress={this.showDateTimePicker}
						/>
						<View style={{ flex: 1.5}}></View>
						<View style={{ flex: 5}}>
        					<Button style={{fontSize: 20, borderRadius: 15,	borderWidth: 4,	borderColor: colors.primary }} color={colors.primary} title={"oui"} onPress={this.showDateTimePicker} />
        					<DateTimePicker
        					  	isVisible={this.state.isDateTimePickerVisible}
        					  	onConfirm={this.handleDatePicked}
        					  	onCancel={this.hideDateTimePicker}
				    	 	/>
						</View>
						<View style={{ flex: 1}}></View>
					</View>
					<View style={{flex: 0.5}}></View>
					<View style={{flex: 4.25, flexDirection:"row"}}>
						<View style={{ flex: 1.5}}></View>
						<Icon_Ant
							name="calendar"
							color="#000"
							size={40}
							onPress={this.showTimePicker}
						/>
						<View style={{ flex: 1.5}}></View>
						<View style={{ flex: 5}}>
        					<Button style={{fontSize: 20, borderRadius: 15,	borderWidth: 4,	borderColor: colors.primary }} color={colors.primary} title={"oui"} onPress={this.showTimePicker} />
        					<DateTimePicker
								mode="time"
        						isVisible={this.state.isTimePickerVisible}
        						onConfirm={this.handleTimePicked}
								onCancel={this.hideTimePicker}
							/>
						</View>
						<View style={{ flex: 1}}></View>
					</View>
					<View style={{flex: 0.5}}></View>
				</View>
                <View style={{ flex: 7, alignContent: "center"}}>
				    <Text style={styles2.moduleText}>Glucose : {this.state.BloodGlucose}</Text>
				    <Text>{"\n"}</Text>
				    <Text style={styles2.moduleText}>InsulineFood : {this.state.InsulineFood}</Text>
				    <Text>{"\n"}</Text>
				    <Text style={styles2.moduleText}>InsulineCorr : {this.state.InsulineCorr}</Text>
				    <Text>{"\n"}</Text>
				    <Text style={styles2.moduleText}>Description : {this.state.description}</Text>
				    <Text>{"\n"}</Text>			
				    <Text style={styles2.moduleText}>Quelle période de la journée : {this.state.wichLunch}</Text>
                    <Text>{"\n"}</Text>	
                </View>
                <View style={{ flex: 1}}>
						<Button 
							color={colors.primary}
							title={"Editer la note"}
						/>
				</View>
                <View style={{ flex: 1}}>
						<Button 
							color={"#CD3621"}
							onPress={() => this._bootstrapAsync(this.state.id)}
							title={"Supprimer la note"}
						/>
				</View>
			</View>
		)
	}
}

const styles2 = StyleSheet.create({
	main_container: {
		flex: 1
	},
	moduleText: {
        fontSize: 17,
        width: windowSize.x / 1.2
	}
})

const mapStateToProps = state => ({
	token: state.token,
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
