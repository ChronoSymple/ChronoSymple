import React from 'react'
import { View, Text, Button, TextInput, ScrollView, BackHandler, Image, Picker} from 'react-native'
import { LoginAPatientWithApi } from '../../API/APIConnection'
import { styles, colors, windowSize } from '../StyleSheet'
import { connect } from 'react-redux';
import { APIEditPatientNotes } from '../../API/APIModule'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon_Ant from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';

class EditNote extends React.Component {

	constructor(props) {
		super(props)
		let item = this.props.navigation.getParam("itemDetail")
		obj = item.data
		this.state = { 
			id: item.id, 
			BloodGlucose: obj.BloodGlucose, 
			InsulineFood: obj.InsulineFood, 
			InsulineCorr: obj.InsulineCorr, 
			description: obj.description,
			wichLunch: obj.wichLunch,
			date: obj.date,
			time: obj.time,
			isDateTimePickerVisible: false,
			isTimePickerVisible: false,
			isInvalid: false,
			textFiledFocusColor: colors.primary,
			bloodGlucoseFocused: false,
			insulineFoodFocused: false,
			InsulineaprepasFocused: false,
			descriptionFocused: false
		}
		this.props.getUserCurrentModule().then(() => {
		})
	}
	
	_bootstrapAsync = () => {
		let { navigate } = this.props.navigation;
		let myTab = {
			"BloodGlucose" : this.state.BloodGlucose,
			"InsulineFood" : this.state.InsulineFood,
			"InsulineCorr" : this.state.InsulineCorr,
			"description"  : this.state.description,
			"wichLunch"    : this.state.wichLunch,
			"date"		   : this.state.date,
			"time"         : this.state.time
		}
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIEditPatientNotes(this.props.token.token, myTab, this.state.id).then(data => {
					if (data.status == 200) {
						this.setState({ isSend: true })
						navigate("Calendar")
					}
				}).catch(error => {
						this.setState({ error })
				})
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	setBloodGlucose = (text) => {
		this.setState({ BloodGlucose: text })
	}

	setInsulineFood = (text) => {
	    this.setState({ InsulineFood: text})
	}

	setInsulineCorr = (text) => {
	    this.setState({ InsulineCorr: text})
	}

	setDescription = (text) => {
	    this.setState({ description: text})
	}

	textFieldFocused = (state) => {
		this.setState({[state]: true})
	}

	textFieldBlured = (state) => {
		this.setState({[state]: false})
	}

	showDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: true });
	};
	 
	hideDateTimePicker = () => {
		this.setState({ isDateTimePickerVisible: false });
	};
	 
	handleDatePicked = date => {
		var date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
		this.setState({ date: date });
		this.hideDateTimePicker();
	};

	showTimePicker = () => {
		this.setState({ isTimePickerVisible: true });
	};
	 
	hideTimePicker = () => {
		this.setState({ isTimePickerVisible: false });
	};
	 
	handleTimePicked = time => {
		if (time.getMinutes() > 9)
			var horaire = time.getHours() + ':' + time.getMinutes()
		else
			var horaire = time.getHours() + ':' + "0" + time.getMinutes()
		this.setState({ time: horaire });
		this.hideTimePicker();
	};

  	render() {
		let { navigate } = this.props.navigation;
		let placeholder_glycemie			= "mmol/L";
		let placeholder_insuline 			= "Unité";
		let placeholder_description		 	= "ex: j'ai mangé...";
		let errorMessage 					= "Ne message n'a pas été envoyé";
		let bloodGlucoseFocused				= "bloodGlucoseFocused";
		let insulineFoodFocused 			= "insulineFood";
		let insulineCorrFocused 			= "insulineCorr";
		let descriptionFocused				= "descriptionFocused";

    		return (
				<View style={{flex:1}}>
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
							<Text style={{textSize:65, color: "white", margin: 10}}>EDITER</Text>
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
					<View style={{ flex: 1}}></View>
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
        						<Button style={{fontSize: 20, borderRadius: 15,	borderWidth: 4,	borderColor: colors.primary }} color={colors.primary} title={this.state.date} onPress={this.showDateTimePicker} />
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
        						<Button style={{fontSize: 20, borderRadius: 15,	borderWidth: 4,	borderColor: colors.primary }} color={colors.primary}  title={this.state.time} onPress={this.showTimePicker} />
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
					<View style={{ flex: 1}}></View>
					<View style={{ flex: 5, justifyContent: "center"}}>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{fontSize: 15}}>
									Glucose
								</Text>
								<View style={{flex:0.5}}></View>
								<Icon
									style={{flex:1}}
									name="bubble-chart"
									color="#ffbb00"
									size={35}
								/>
								<View style={{flex:0.5}}></View>
								<TextInput
									pattern="[0-9]{10}"
									keyboardType="numeric"
									onFocus={() => this.textFieldFocused(bloodGlucoseFocused)}
									onBlur={() => this.textFieldBlured(bloodGlucoseFocused)}
									placeholder={placeholder_glycemie}
									style={[this.state[bloodGlucoseFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5, flex:4 }]}
									autoCorrect={false}
									onChangeText={(text) => this.setBloodGlucose(text)}
									value={this.state.BloodGlucose}
								/>
								<View style={{flex:0.5}}></View>

							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{fontSize: 15}}>
									Insuline (Nourr.)
								</Text>
								<View style={{flex:0.5}}></View>
								<Icon
									style={{flex:1}}
									name="lens"
									color="#b2ff00"
									size={35}
								/>
								<View style={{flex:0.5}}></View>
								<TextInput
									pattern="[0-9]{10}"
									keyboardType="numeric"
									onFocus={() => this.textFieldFocused(insulineFoodFocused)}
									onBlur={() => this.textFieldBlured(insulineFoodFocused)}
									placeholder={placeholder_insuline}
									style={[this.state[insulineFoodFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5, flex:4 }]}
									autoCorrect={false}
									onChangeText={(text) => this.setInsulineFood(text)}
									value={this.state.InsulineFood}
								/>
								<View style={{flex:0.5}}></View>
							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{fontSize: 15}}>
									Insuline (Corr.)
								</Text>
								<View style={{flex:0.5}}></View>
								<Icon
									style={{flex:1}}
									name="label"
									color="red"
									size={35}
								/>
								<View style={{flex:0.5}}></View>
								<TextInput
									pattern="[0-9]{10}"
									keyboardType="numeric"
									onFocus={() => this.textFieldFocused(insulineCorrFocused)}
									onBlur={() => this.textFieldBlured(insulineCorrFocused)}
									placeholder={placeholder_insuline}
									style={[this.state[insulineCorrFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5, flex:4 }]}
									autoCorrect={false}
									onChangeText={(text) => this.setInsulineCorr(text)}
									value={this.state.InsulineCorr}
								/>
								<View style={{flex:0.5}}></View>
							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{fontSize: 15}}>
									Description
								</Text>
								<View style={{flex:0.5}}></View>
								<Icon
									style={{flex:1}}
									name="textsms"
									color="#00bfff"
									size={35}
									onPress={() => navigate("Calendar")}
								/>
								<View style={{flex:0.5}}></View>
								<TextInput
									onFocus={() => this.textFieldFocused(descriptionFocused)}
									onBlur={() => this.textFieldBlured(descriptionFocused)}
									placeholder={placeholder_description}
									style={[this.state[descriptionFocused] ? styles.textFieldFocus : styles.textField, { width: windowSize.x / 1.5, flex:4 }]}
									autoCorrect={false}
									onChangeText={(text) => this.setDescription(text)}
									value={this.state.description}
								/>
								<View style={{flex:0.5}}></View>
							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{fontSize: 15}}>
									Quelle période ?
								</Text>
								<View style={{flex:0.5}}></View>
								<Picker
  									selectedValue={this.state.wichLunch}
  									style={{ flex:5}}
  									onValueChange={(itemValue, itemIndex) =>
  									  this.setState({wichLunch: itemValue})
  									}>
  									<Picker.Item label="Petit déjeuner" value="Petit déjeuner" />
  									<Picker.Item label="Repas" value="Repas" />
  									<Picker.Item label="Goûter" value="Gouter" />
  									<Picker.Item label="Grignotage" value="Grignotage" />
  									<Picker.Item label="Dîner" value="Diner" />
								</Picker>
								<View style={{flex:0.5}}></View>
							</View>
					</View>
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
									{this.state.isInvalid && <Text style={{ color: colors.errorColor }}>{errorMessage}</Text>}
					</View>
					<View style={{flex: 0.5}}></View>
				</View>
			)
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
	}

	handleBackPress = () => {
		this.props.navigation.navigate('Calendar')
		return true;
	}
}

const mapStateToProps = state => ({
	token: state.token,
	currentModule: state.currentModule
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserCurrentModule: () => dispatch(getUserCurrentModule())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);

/*
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
		obj = item.data
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
*/