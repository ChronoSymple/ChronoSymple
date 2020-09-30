import React from 'react'
import { View, Text, Button, TextInput, BackHandler, Picker, FlatList} from 'react-native'
import { colors } from '../StyleSheet'
import { connect } from 'react-redux';
import { APIAddPatientNotes } from '../../API/APIModule'
import { getUserToken, getUserCurrentModule, getUserCurrentModuleName } from '../../Redux/Action/action';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon_Ant from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { showMessage } from "react-native-flash-message";
import { APIGetModules, APIGetNotesParameters } from "../../API/APIModule"

class Note extends React.Component {

	constructor(props) {
		super(props)
		var now =  new Date()
		var annee   = now.getFullYear();
		var month    = now.getMonth() + 1;
		var jour    = now.getDate();
		var heure   = now.getHours();
		var minute  = now.getMinutes();
		
		if (month < 10)
			var date = jour + '/' + '0' + month + '/' + annee
		else
			var date = jour + '/' + month + '/' + annee
		if (minute > 9)
			var horaire = heure + ':' + minute
		else
			var horaire = heure + ':' + 0 + minute
		this.state = { 
			pageToReturn: this.props.navigation.getParam("pageToReturn"),
			glycemie: "", 
			insulineFood: "", 
			insulineCorr: "", 
			description: "",
			whichLunch: "",
			date: date,
			time: horaire,
			isDateTimePickerVisible: false,
			isTimePickerVisible: false,
			textFiledFocusColor: colors.primary,
			isInvalid: false,
			bloodGlucoseFocused: false,
			insulineFoodFocused: false,
			InsulineaprepasFocused: false,
			descriptionFocused: false
		}
		this.props.getUserCurrentModule().then(() => {
		})
		this.getJson();
	}

	_changeTabValue = (key, value) => {
		this.setState({
			whichLunch: value,
			mytab: this.state.mytab.set(key, value),
		})
	}

	getJson = () => {
		let { navigate } = this.props.navigation;
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIGetModules(this.props.token.token).then(async data => {
					if (data.status == 200) {
						let response = await data.json()
						for (var i = 0; i < response.modules.length; i++) {
							if (response.modules[i].name == this.props.currentModuleName.currentModuleName) {
								APIGetNotesParameters(this.props.token.token, response.modules[i].id).then(async data => {
									if (data.status == 200) {
										var myTab = new Map()
										var fieldsJSON = await data.json();
										if (fieldsJSON != null) {
											for (var values in fieldsJSON) {
												myTab = myTab.set(fieldsJSON[values].tag, fieldsJSON[values].defaultText)
											}
										}
										this.setState ({ 
											fieldsJSON: fieldsJSON,
											mytab: new Map(myTab)
										})
									}
									else {
										return (null);
									}
								}).catch(error => {
										this.setState({ error })
								})
							}
						}
					}
					else
						return (null)
				}).catch(error => {
						this.setState({ error })
				})
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	_bootstrapAsync = () => {
		let { navigate } = this.props.navigation;
		let object = {};
		this.state.mytab.forEach((value, key) => {
		    var keys = key.split('.'),
		        last = keys.pop();
		    keys.reduce((r, a) => r[a] = r[a] || {}, object)[last] = value;
		});
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIAddPatientNotes(this.props.token.token, object, this.props.currentModule.currentModule).then(data => {
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
	//Sat Nov 09 2019 16:43:00 GMT+0900
	checkFieldType = data => {
		if (data.field_type == "text") {
			return (
				<View>
					<View style={{flexDirection: "row"}}>
						<View style={{flex:0.5}}></View>
						<Text style={{fontSize: 15, textAlign: "center"}}>
							{data.name}
						</Text>
						<View style={{flex:0.5}}></View>
						<Icon
							style={{flex:1}}
							name={data.icon_name}
							color={data.icon_color}
							size={35}
						/>
						<View style={{flex:0.5}}></View>
						<TextInput
							pattern="[0-9]{10}"
							keyboardType={data.keyboardType}
							placeholder={data.placeholder}
							autoCorrect={false}
							onChangeText={(text) => this._changeTabValue(data.tag, text)}
							value={this.state.mytab.get[data.tag]}
						/>
						<View style={{flex:0.5}}></View>
					</View>				
				</View>
			);
		}
		else if (data.field_type == "select") {
			let myUsers = data.select_values.map((myValue, myIndex)=>{
				return(
					<Picker.Item label={myValue} value={myIndex}/>
				)
			});
			return (
				<View>
					<View style={{flexDirection: "row"}}>
						 <View style={{flex:0.5}}></View>
						<Text style={{flex:4, fontSize: 15, paddingTop: 20}}>
							{data.name}
						</Text>
						<View style={{flex:0.5}}></View>
						<Picker
  							selectedValue={this.state.mytab.get(data.tag)}
							style={{ flex:5}}
							onValueChange={(itemValue, itemIndex) => this._changeTabValue(data.tag, itemValue)}>
							{myUsers}
						</Picker>
						<View style={{flex:0.5}}></View>
					</View>	
				</View>
			);
		}
	};
	
  	render() {
		let { navigate } = this.props.navigation;
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
				<View style={{flex: 1}}></View>
				<View style={{flex: 5}}>
				{this.state.fieldsJSON
					&&
					<FlatList
					data={this.state.fieldsJSON}
					keyExtractor={(item) => item.toString()}
					renderItem={({item}) => (
						this.checkFieldType(item)
						)}
					/>
				}
				</View>
				<View style={{ flex: 1}}></View>
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
	currentModule: state.currentModule,
	currentModuleName: state.currentModuleName
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserCurrentModule: () => dispatch(getUserCurrentModule()),
	getUserCurrentModuleName: () => dispatch(getUserCurrentModuleName())
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
/*
class Note extends React.Component {

	constructor(props) {
		super(props)
		var now =  new Date()
		var annee   = now.getFullYear();
		var month    = now.getMonth() + 1;
		var jour    = now.getDate();
		var heure   = now.getHours();
		var minute  = now.getMinutes();
		
		if (month < 10)
			var date = jour + '/' + '0' + month + '/' + annee
		else
			var date = jour + '/' + month + '/' + annee
		if (minute > 9)
			var horaire = heure + ':' + minute
		else
			var horaire = heure + ':' + 0 + minute
		this.state = { 
			pageToReturn: this.props.navigation.getParam("pageToReturn"),
			glycemie: "", 
			insulineFood: "", 
			insulineCorr: "", 
			description: "",
			wichLunch: "Petit déjeuner",
			date: date,
			time: horaire,
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
			"BloodGlucose" : this.state.glycemie,
			"InsulineFood" : this.state.insulineFood,
			"InsulineCorr" : this.state.insulineCorr,
			"description"  : this.state.description,
			"wichLunch"    : this.state.wichLunch,
			"date"		   : this.state.date,
			"time"         : this.state.time
		}
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIAddPatientNotes(this.props.token.token, myTab, this.props.currentModule.currentModule).then(data => {
					if (data.status == 200) {
						this.setState({ isSend: true })
						navigate("Calendar")
						showMessage({
							message: "La note a bien été crée",
							type: "success"
						});
					}
				}).catch(error => {
						this.setState({ error })
						showMessage({
							message: "Une erreur est survenue lors de l'ajout de note. Veuillez recommencer. Si le probleme persiste contactez nous",
							type: "danger"
						});
				})
			})
		}).catch(error => {
			this.setState({ error })
			showMessage({
				message: "Une erreur est survenue avec votre session. reactualisez la page. Si le probleme persiste contactez nous",
				type: "danger"
			});
		})
	}

	setBloodGlucose = (text) => {
		this.setState({ glycemie: text })
	}

	setInsulineFood = (text) => {
		this.setState({ insulineFood: text})

	}

	setInsulineCorr = (text) => {
	    this.setState({ insulineCorr: text})
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
	//Sat Nov 09 2019 16:43:00 GMT+0900

  	render() {
		let { navigate } = this.props.navigation;
		let placeholder_glycemie			= "mmol/L";
		let placeholder_insuline 			= "Unité";
		let placeholder_description		 	= "ex: j'ai mangé...";
		let errorMessage 					= "Ne message n'a pas été envoyé";
		let bloodGlucoseFocused				= "bloodGlucoseFocused";
		let insulineFoodFocused 			= "insulineFoodFocused";
		let insulineCorrFocused 			= "insulineCorrFocused";
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
								<Text style={{fontSize: 15, textAlign: "center"}}>
									Glucose
								</Text>
								<View style={{flex:0.5}}></View>
								<Icon
									style={{flex:1}}
									name="bubble-chart"
									color="#ffbb00"
									size={35}
									onPress={() => navigate("Calendar")}
								/>
								<View style={{flex:0.5}}></View>
								<TextInput
									pattern="[0-9]{10}"
									keyboardType="numeric"
									onFocus={() => this.textFieldFocused(bloodGlucoseFocused)}
									onBlur={() => this.textFieldBlured(bloodGlucoseFocused)}
									placeholder={placeholder_glycemie}
									style={[this.state[bloodGlucoseFocused] ? styles.textFieldFocus : styles.textField, { flex:4, fontSize: 15 }]}
									autoCorrect={false}
									onChangeText={(text) => this.setBloodGlucose(text)}
									value={this.state.glycemie}
								/>
								<View style={{flex:0.5}}></View>

							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{fontSize: 15, textAlign: "center"}}>
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
									value={this.state.insulineFood}
								/>
								<View style={{flex:0.5}}></View>
							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{fontSize: 15, textAlign: "center"}}>
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
									value={this.state.insulineCorr}
								/>
								<View style={{flex:0.5}}></View>
							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>

								<Text style={{fontSize: 15, textAlign: "center"}}>
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
									autoCorrect={true}
									onChangeText={(text) => this.setDescription(text)}
									value={this.state.description}
								/>
								<View style={{flex:0.5}}></View>
							</View>
							<View style={{flexDirection: "row"}}>
								<View style={{flex:0.5}}></View>
								<Text style={{flex:4, fontSize: 15, paddingTop: 20}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Note);
*/