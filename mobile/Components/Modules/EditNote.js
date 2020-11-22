import React from 'react'
import { View, Text, Button, TextInput, BackHandler, FlatList, Dimensions, Alert} from 'react-native'
import { connect } from 'react-redux';
import { APIEditPatientNotes, APIGetGeneralUnitId } from '../../API/APIModule'
import { getUserToken, getUserCurrentModule, getUserCurrentModuleName } from '../../Redux/Action/action';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon_Ant from 'react-native-vector-icons/AntDesign';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { APIGetModules, APIGetNotesParameters } from "../../API/APIModule"
import { styles, colors, windowSize, note_style } from '../StyleSheet'
import { Picker } from '@react-native-community/picker';

class EditNote extends React.Component {
	
	constructor(props) {
		super(props)
		var now =  new Date();

		this.state = { 
			pageToReturn: this.props.navigation.getParam("pageToReturn"),
			glycemie: "", 
			insulineFood: "", 
			insulineCorr: "", 
			description: "",
			whichLunch: "",
			date: "",
			time: "",
			original_dt: new Date(Date.now() - (now.getTimezoneOffset() * 60 * 1000)),
			isDateTimePickerVisible: false, 
			isTimePickerVisible: false,
			textFiledFocusColor: colors.primary,
			isInvalid: false,
			bloodGlucoseFocused: false,
			insulineFoodFocused: false,
			InsulineaprepasFocused: false,
			descriptionFocused: false,
			noteSheme: []
		}
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
				APIGetGeneralUnitId(this.props.token.token, this.props.currentModule.currentModule).then(async data => {
					if (data.status == 200) {
						let response = await data.json()
						APIGetNotesParameters(this.props.token.token, response.id).then(async data => {
							if (data.status == 200) {
								var myTab = new Map()
								var fieldsJSON = await data.json();
								if (fieldsJSON != null) {
									for (var values in fieldsJSON) {
										myTab = myTab.set(fieldsJSON[values].tag, this.fillField(fieldsJSON[values].tag))
									}
								}
								this.setState ({ 
									fieldsJSON: fieldsJSON,
									mytab: new Map(myTab)
								})
								this.getParamTab();
							}
							else {
								return (null);
							}
						}).catch(error => {
								this.setState({ error })
						})
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

	fillField = (fieldTag) => {
		for (var value in this.state.noteSheme) {
			if (fieldTag == value)
				return (this.state.noteSheme[value])
		}
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
				APIEditPatientNotes(this.props.token.token, object, this.props.navigation.getParam('id'), this.state.original_dt).then(async data => {
					let response = await data.json()
					if (data.status == 200) {
						this.setState({ isSend: true })
						navigate("Calendar")
					} else if (data.status == 404) {
						showMessage({
							message: "La note n'a pas pu etre ajouter. Recommencez. Si le probleme persiste contactez nous",
							type: "danger",
						});
					} else if (data.status == 401) {
						showMessage({
							message: "Un probleme est survenus, vous allez être déconnecté",
							type: "danger",
						});
						this.props.navigation.navigate("Logout");
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

	handleDatePicked = datetime => {
		this.hideDateTimePicker();
		this.setState({ original_dt: datetime});
		var date = datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getFullYear()
		this.setState({ date: date });
	};

	showTimePicker = () => {
		this.setState({ isTimePickerVisible: true });
	};
	 
	hideTimePicker = () => {
		this.setState({ isTimePickerVisible: false });
	};
	 
	handleTimePicked = datetime => {
		this.hideTimePicker();
		this.setState({original_dt: datetime})
		if (datetime.getMinutes() > 9)
			var horaire = datetime.getHours() + ':' + datetime.getMinutes()
		else
			var horaire = datetime.getHours() + ':' + "0" + datetime.getMinutes()
		this.setState({ time: horaire });
	};

	getParamTab() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

		let item2 = this.props.navigation.getParam('itemDetail')
		let item = item2.data;
		let tmp = this.state.noteSheme
		if (item != null) {
			for (var val in item) {
				tmp.push({[val]: item[val]})
			}
		}
		this.setState({
			noteSheme : tmp
		})
		
		for (var temp in item) {
			this.setState({
				mytab: this.state.mytab.set(temp, item[temp])
			})
		}

		let itemDate = item2.date
		var now =  Date.parse(item2.date)
		now = new Date(now + (new Date(now).getTimezoneOffset() * 60 * 1000))

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
		this.setState({
			date: date,
			time: horaire,
			original_dt: now,
		})
	}

	checkFieldType = data => {
		const iterator1 = this.state.mytab.values();
		if (data.field_type == "text") {
			return (
				<View style={note_style.row}>
					<View style={note_style.text_label_box}>
						<Text style={note_style.text_label}>
							{data.name} :
						</Text>
					</View>
					<View style={{flex: 5, paddingLeft: 10, paddingRight: 20}}>
						<View style={{flex:0.5}}></View>
						<TextInput
							pattern="[0-9]{10}"
							keyboardType={data.keyboardType}
							placeholder={this.state.mytab.get(data.tag)}
							autoCorrect={false}
							onChangeText={(text) => this._changeTabValue(data.tag, text)}
							value={this.state.mytab.get(data.tag)}
						/>
						<View style={{flex:0.5}}></View>
					</View>				
				</View>				
			);
		}
		else if (data.field_type == "select") {
			let myUsers = data.select_values.map((myValue, myIndex)=>{
				return(
					<Picker.Item label={myValue} value={myValue}/>
				)
			});
			return (
				<View style={note_style.row}>
					<View style={note_style.text_label_box}>
						<Text style={note_style.text_label}>
							{data.name}
						</Text>
					</View>
					<View style={{flex: 5, paddingLeft: 10, paddingRight: 20}}>
						<Picker
							selectedValue={this.state.mytab.get(data.tag)}
							style={{alignItems: 'center'}}
							onValueChange={(itemValue, itemIndex) => this._changeTabValue(data.tag, itemValue)}>
							{myUsers}
						</Picker>
					</View>
				</View>	
			);
		}
	};
	
	render() {
		let { navigate } = this.props.navigation;
    	return (
			<View style={{flex:1}}>
				<View style={{flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignContent: "center", width: Dimensions.get('window').width, flexDirection: "row"}}>
            		<View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
						<Icon
						  	name="clear"
						  	color={"white"}
							size={45}
							onPress={() => Alert.alert(
								"",
								"Toutes vos modifications seront annulées !",
								[
									{text: 'Annuler', style: 'cancel'},
									{text: 'OK', onPress: () => navigate('Calendar')},
								],
								{ cancelable: false }
							)}
						  	style={{justifyContent: "flex-end"}}
						/>
            		</View>
            		<View style={{flex: 6}}>
            		</View>
            		<View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
            			<Icon
						  	name="check"
						  	color={"white"}
							size={45}
						  	onPress={() => this._bootstrapAsync()}
						  	style={{justifyContent: "flex-end"}}
						/>
            		</View>
          		</View>
				<View style={{flex:9}}>
					<View style={{flex:2}}>
						<View style={note_style.date_time}>
							<Icon_Ant
								name="calendar"
								color="#000"
								size={40}
								style={{paddingRight: 20}}
								onPress={this.showDateTimePicker}
							/>
							<View style={{width: 150}}>
								<Button 
									color={colors.primary} 
									title={this.state.date} 
									onPress={this.showDateTimePicker} 
								/>
								<DateTimePicker
									date={this.state.original_dt}
								  	isVisible={this.state.isDateTimePickerVisible}
								  	onConfirm={this.handleDatePicked}
								  	onCancel={this.hideDateTimePicker}
			    			 	/>
			    			</View>
						</View>
						<View style={note_style.date_time}>
							<Icon_Ant
								name="clockcircleo"
								color="#000"
								size={40}
								style={{paddingRight: 20}}
								onPress={this.showTimePicker}
							/>
							<View style={{width: 150}}>
								<Button
									color={colors.primary} 
									title={this.state.time} 
									onPress={this.showTimePicker} 
								/>
								<DateTimePicker
									mode="time"
									date={this.state.original_dt}
									isVisible={this.state.isTimePickerVisible}
									onConfirm={this.handleTimePicked}
									onCancel={this.hideTimePicker}
								/>
							</View>
						</View>
					</View>
					<View style={{flex: 8, marginTop: 10}}>
						{this.state.fieldsJSON
							&&
							<FlatList
							data={this.state.fieldsJSON}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({item}) => (
								this.checkFieldType(item)
								)}
								/>
							}
					</View>
				</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);