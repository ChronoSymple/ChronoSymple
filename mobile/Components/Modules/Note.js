import React from 'react'
import { View, Text, Button, TextInput, BackHandler, FlatList, Dimensions, Alert, SafeAreaView} from 'react-native'
import { colors, note_style } from '../StyleSheet'
import { connect } from 'react-redux';
import { APIAddPatientNotes } from '../../API/APIModule'
import { getUserToken, getUserCurrentModule, getUserCurrentModuleName } from '../../Redux/Action/action';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon_Ant from 'react-native-vector-icons/AntDesign';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { APIGetNotesParameters, APIGetGeneralUnitId } from "../../API/APIModule"
import { Picker } from '@react-native-community/picker';

class Note extends React.Component {

	constructor(props) {
		super(props)
		var now =  new Date();
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
			original_dt: now,
			date: date,
			time: horaire,
			isDateTimePickerVisible: false,
			isTimePickerVisible: false,
			textFiledFocusColor: colors.primary,
			isInvalid: false,
			bloodGlucoseFocused: false,
			insulineFoodFocused: false,
			InsulineaprepasFocused: false,
			descriptionFocused: false,
			fieldsJSON: []
		}
		this.props.getUserCurrentModule().then(() => {
		})
		console.log(this.props.navigation.getParam("pageToReturn"))
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
								if (fieldsJSON[0] != null) {
									for (var values in fieldsJSON) {
										myTab = myTab.set(fieldsJSON[values].tag, fieldsJSON[values].defaultText)
									}
									this.setState ({ 
										fieldsJSON: fieldsJSON,
										mytab: new Map(myTab)
									})
								}
								else {
									this.setState ({ 
										fieldsJSON: []
									})
								}
							} else if (data.status == 401) {
								showMessage({
									message: "Un probleme est survenus, vous allez être déconnecté",
									type: "danger",
								});
								this.props.navigation.navigate("Logout");
							} else {
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

	_bootstrapAsync = () => {
		let { navigate } = this.props.navigation;
		let note = {};
		this.state.mytab.forEach((value, key) => {
		    var keys = key.split('.'),
		        last = keys.pop();
		    keys.reduce((r, a) => r[a] = r[a] || {}, note)[last] = value;
		});
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				datetime = new Date(this.state.original_dt - (this.state.original_dt.getTimezoneOffset() * 60 * 1000));
				APIAddPatientNotes(this.props.token.token, note, datetime, this.props.currentModule.currentModule).then(data => {
					if (data.status == 200) {
						this.setState({ isSend: true })
						console.log(this.state.pageToReturn)
						navigate(this.state.pageToReturn)
					} else if (data.status == 404) {
						showMessage({
							message: "La note n'a pas pu etre ajouté. Recommencez. Si le probleme persiste contactez nous",
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
		this.setState({ original_dt: datetime});
		var date = datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + datetime.getFullYear()
		this.setState({ date: date });
		this.hideDateTimePicker();
	};

	showTimePicker = () => {
		this.setState({ isTimePickerVisible: true });
	};
	 
	hideTimePicker = () => {
		this.setState({ isTimePickerVisible: false });
	};
	
	handleTimePicked = datetime => {
		this.setState({ original_dt: datetime});
		if (datetime.getMinutes() > 9)
			var horaire = datetime.getHours() + ':' + datetime.getMinutes()
		else
			var horaire = datetime.getHours() + ':' + "0" + datetime.getMinutes()
		this.setState({ time: horaire });
		this.hideTimePicker();
	};
	//Sat Nov 09 2019 16:43:00 GMT+0900
	checkFieldType = data => {
		if (data.field_type == "text") {
			return (
				<View style={note_style.row}>
					<View style={note_style.text_label_box}>
						<Text style={note_style.text_label}>
							{data.name} :
						</Text>
					</View>
					<View style={{flex: 5, paddingLeft: 10, paddingRight: 20}}>
						<TextInput
							pattern="[0-9]{10}"
							style={{flex: 1}}
							keyboardType={data.keyboardType}
							placeholder={data.placeholder}
							autoCorrect={false}
							onChangeText={(text) => this._changeTabValue(data.tag, text)}
							value={this.state.mytab.get[data.tag]}
						/>

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
			<ScrollView>
				<View>
				<View style={{flex: 1, paddingBottom: 6, paddingTop: 6, backgroundColor: colors.secondary, justifyContent: 'center', alignContent: "center", width: Dimensions.get('window').width, flexDirection: "row"}}>
            		<View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
						<Icon
						  	name="clear"
						  	color={"white"}
							size={45}
							onPress={() => Alert.alert(
								"",
								"Votre note ne sera pas enregistrée !",
								[
									{text: 'Annuler', style: 'cancel'},
									{text: 'OK', onPress: () => navigate(this.state.pageToReturn)},
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
				{this.state.fieldsJSON != []
				?
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
				:
					<View/>
				}
				</View>
 			</ScrollView>
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