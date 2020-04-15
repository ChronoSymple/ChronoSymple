// Components/Calendar.js

import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet, Image, Modal, Button, FlatList, ScrollView, BackHandler, Dimensions} from 'react-native'
import { APIGetPatientNotesByDateIntervale,  APIRemovePatientNotes, APIShareNote, APIgetDoctorsOfModule } from '../../API/APIModule'
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import { colors, windowSize } from '../StyleSheet';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Modal2 from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker'
/*import { NoteItem } from './NoteItem' NOT USED*/
 
class Calendar extends React.Component {

	constructor (props) {
		super(props)
		var now =  new Date()
		var year   = now.getFullYear();
		var month    = now.getMonth() + 1; 
		var day    = now.getDate();
		var date = day + '/' + month + '/' + year    
		this.state = {
			DNotes: [],
		  	originalColor: colors.secondary,
		  	finalColor: colors.primary,
		  	firstButton: colors.secondary,
		  	secondButton: colors.secondary,
		  	thirdButton: colors.primary,
		  	customButton: colors.secondary,
		  	adminEnum: { Day: 1, Week: 2, Month: 3, Custom: 4 },
		  	datasMode: 1,
		  	customFirstDate: false,
		  	customLastDate: true,
		  	loading: true,
		  	todayDate: date,
		  	isModalVisible: false,
		  	actualDayDate : date,
		  	actualDayDay : day,
		  	actualDayMonth : month,
		  	actualDayYear : year,
		  	actualDateBeginDay: day,
		  	actualDateBeginMonth: month,
		  	actualDateBeginYear: year,
		  	actualDateBegin: date, 
		  	actualDateEndDay: day,
		  	actualDateEndMonth: month,
		  	actualDateEndYear: year,
		  	actualDateEnd: date,
		  	lastmode: 1,
		  	selectedStartDate: null,
		  	selectedEndDate: null,
		  	nbDaysOfCurrentMonth: this.getDaysInMonth(month, year),
		  	display : false,
		  	gmyText: 'I\'m ready to get swiped!',
		  	gestureName: 'none',
		  	backgroundColor: '#fff',
		  	selectedNotes: [],
			loading: true,
			isSelectActive: false,
			refreshing: false,
			checkCount: 0,
			modalCheckboxVisible: false
		}
		this._bootstrapAsync();
		const { navigation } = this.props;
		this.focusListener = navigation.addListener('didFocus', () => {
			this._bootstrapAsync();
	  });
	}

	getSelectedNote = () => {
		selected_note = []
		for (let note of this.state.selectedNotes) {
		    if (note.id == true) {
		    	selected_note.push(note.id);
		    }
		}
		return (selected_note);
	}

	shareNote = () => {
		notes = this.getSelectedNote();
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				let token = this.props.token.token;
				let cur_modl = this.props.currentModule.currentModule;
				APIgetDoctorsOfModule(token, cur_modl).then(async data => {
					let response = await data.json();
					let doctor_ids = [];
					for (let doc of response) {
						doctor_ids.push(doc.id)
					}
					if (data.status == 200) {
						APIShareNote(token, cur_modl, notes, doctor_ids).then(async data => {
							let response = await data.json();
							if (data.status == 200) {
								console.log("Succeed send notif")
							} else {
								console.log("Failed send notif")
							}
						})
					} else {
						console.log("Failed get docs")
					}
				})
			})
		})
	}
	

	_previousPeriod = () => {
		if (this.state.datasMode == this.state.adminEnum.Month) {
		  month  = parseInt(this.state.actualDateBeginMonth, 10) - 1	
		  year = this.state.actualDateBeginYear
		  if (month <= 0) {
			year = parseInt(this.state.actualDateBeginYear, 10) - 1
			month = 12
		  }
		  var date = this.state.actualDateBeginDay + '/' + month + '/' + year
		  this.setState({
			actualDateBeginDay: 1,
			actualDateBeginMonth: month,
			actualDateBeginYear: year,
			actualDateEndDay: this.getDaysInMonth(month, year),
			actualDateEndMonth: month,
			actualDateEndYear: year,
			actualDateBegin: 1 + '/' + month + '/' + year,
			actualDateEnd: this.getDaysInMonth(month, year) + '/' + month + '/' + year,
			DNotes: [],	
			loading: true
		  })
		  this._bootstrapAsync();
		  return
		}
		else if (this.state.datasMode == this.state.adminEnum.Week) {
		  var dateBeginDay = this.state.actualDateBeginDay - 7
		  var dateBeginMonth = this.state.actualDateBeginMonth
		  var dateBeginYear = this.state.actualDateBeginYear
		  if (dateBeginDay <= 0) {
			dateBeginMonth  = parseInt(dateBeginMonth, 10) - 1	
			if (dateBeginMonth <= 0) {
			  dateBeginYear = parseInt(this.state.actualDateEndYear, 10) - 1	
			  dateBeginMonth = 12
			}
			dateBeginDay = this.getDaysInMonth(dateBeginMonth, dateBeginYear) + dateBeginDay
		  }
		  var dateEndDay = this.state.actualDateEndDay - 7
		  var dateEndMonth = this.state.actualDateEndMonth
		  var dateEndYear = this.state.actualDateEndYear
		  if (dateEndDay  <= 0) {
			dateEndMonth  = parseInt(this.state.actualDateEndMonth, 10) - 1	
			if (dateEndMonth <= 0) {
			  dateEndYear = parseInt(this.state.actualDateEndYear, 10) - 1	
			  dateEndMonth = 12
			}
			dateEndDay = this.getDaysInMonth(dateEndMonth, dateEndYear) + dateEndDay
		  }
		  this.setState({
			actualDateBeginDay: dateBeginDay,
			actualDateBeginMonth: dateBeginMonth,
			actualDateBeginYear: dateBeginYear,
			actualDateBegin: dateBeginDay + '/' + dateBeginMonth + '/' + dateBeginYear,
			actualDateEndDay: dateEndDay,
			actualDateEndMonth: dateEndMonth,
			actualDateEndYear: dateEndYear,
			actualDateEnd: dateEndDay + '/' + dateEndMonth + '/' + dateEndYear,
			firstButton: this.state.finalColor,
			secondButton: this.state.originalColor,
			thirdButton: this.state.originalColor,
			firstButton: this.state.originalColor,
			secondButton: this.state.finalColor,
			thirdButton: this.state.originalColor,
			DNotes: [],	
			loading: true
		  })
		  this._bootstrapAsync();
		  return
		}
		else if (this.state.datasMode == this.state.adminEnum.Day) {
		  var day = parseInt(this.state.actualDateBeginDay, 10) - 1	
		  var month = this.state.actualDateBeginMonth;
		  var year = this.state.actualDateBeginYear;
		  if (day <= 0) {
			month  = parseInt(this.state.actualDateBeginMonth, 10) - 1	
			if (month <= 0) {
			  year = parseInt(this.state.actualDateBeginYear, 10) - 1	
			  month = 12
			}
			this.setState({
			  nbDaysOfCurrentMonth: this.getDaysInMonth(month, year)
			})
			day = this.state.nbDaysOfCurrentMonth
		  }
		  var date = day + '/' + month + '/' + year
		  this.setState({
			actualDateBegin: date,
			actualDateBeginDay: day,
			actualDateBeginMonth: month,
			actualDateBeginYear: year,
			actualDateEnd: date,
			actualDateEndDay: day,
			actualDateEndMonth: month,
			actualDateEndYear: year,
			DNotes: [],	
			loading: true
		  })
		  this._bootstrapAsync();
		}
	  }
	
	  _nextPeriod() {
		if (this.state.datasMode == this.state.adminEnum.Month) {
		  month  = parseInt(this.state.actualDateBeginMonth, 10) + 1	
		  year = this.state.actualDateBeginYear
		  if (month > 12) {
			year = parseInt(this.state.actualDateBeginYear, 10) + 1
			month = 1
		  }
		  var date = this.state.actualDateBeginDay + '/' + month + '/' + year
		  this.setState({
			actualDateBeginDay: 1,
			actualDateBeginMonth: month,
			actualDateBeginYear: year,
			actualDateEndDay: this.getDaysInMonth(month, year),
			actualDateEndMonth: month,
			actualDateEndYear: year,
			actualDateBegin: 1 + '/' + month + '/' + year,
			actualDateEnd: this.getDaysInMonth(month, year) + '/' + month + '/' + year,
			DNotes: [],	
			loading: true
		  })
		  this._bootstrapAsync();
		  return
		} month  = parseInt(this.state.actualDateBeginMonth, 10) + 1	
		if (month >= 12) {
		  year = parseInt(this.state.actualDateBeginYear, 10) + 1
		  month = 1
		}
		else if (this.state.datasMode == this.state.adminEnum.Week) {
		  var dateBeginDay = this.state.actualDateBeginDay + 7
		  var dateBeginMonth = this.state.actualDateBeginMonth
		  var dateBeginYear = this.state.actualDateBeginYear
		  if (dateBeginDay >= this.getDaysInMonth(dateBeginMonth, dateBeginYear)) {
			dateBeginMonth  = parseInt(dateBeginMonth, 10) + 1	
			if (dateBeginMonth >= 12) {
			  dateBeginYear = parseInt(this.state.actualDateEndYear, 10) + 1	
			  dateBeginMonth = 1 
			}
			dateBeginDay = dateBeginDay - this.getDaysInMonth(this.state.actualDateBeginMonth, dateBeginYear)
		  }
		  var dateEndDay = this.state.actualDateEndDay + 7
		  var dateEndMonth = this.state.actualDateEndMonth
		  var dateEndYear = this.state.actualDateEndYear
		  if (dateEndDay >= this.getDaysInMonth(dateBeginMonth, dateBeginYear)) {
			dateEndMonth  = parseInt(this.state.actualDateEndMonth, 10) + 1	
			if (dateBeginMonth >= 12) {
			  dateBeginYear = parseInt(this.state.actualDateEndYear, 10) + 1	
			  dateBeginMonth = 1 
			}
			dateEndDay = dateEndDay - this.getDaysInMonth(dateBeginMonth, dateBeginYear)
		  }
		  this.setState({
			actualDateBeginDay: dateBeginDay,
			actualDateBeginMonth: dateBeginMonth,
			actualDateBeginYear: dateBeginYear,
			actualDateBegin: dateBeginDay + '/' + dateBeginMonth + '/' + dateBeginYear,
			actualDateEndDay: dateEndDay,
			actualDateEndMonth: dateEndMonth,
			actualDateEndYear: dateEndYear,
			actualDateEnd: dateEndDay + '/' + dateEndMonth + '/' + dateEndYear,
			firstButton: this.state.finalColor,
			secondButton: this.state.originalColor,
			thirdButton: this.state.originalColor,
			firstButton: this.state.originalColor,
			secondButton: this.state.finalColor,
			thirdButton: this.state.originalColor,
			DNotes: [],	
			loading: true
		  })
		  this._bootstrapAsync();
		  return
		}
		else if (this.state.datasMode == this.state.adminEnum.Day) {
		  var day = parseInt(this.state.actualDateBeginDay, 10) + 1	
		  var month = this.state.actualDateBeginMonth;
		  var year = this.state.actualDateBeginYear;
		  if (day >= this.state.nbDaysOfCurrentMonth) {
			month  = parseInt(this.state.actualDateBeginMonth, 10) + 1	
			if (month > 12) {
			  year = parseInt(this.state.actualDateBeginYear, 10) + 1
			  month = 1
			}
			this.setState({
			  nbDaysOfCurrentMonth: this.getDaysInMonth(month, year)
			})
			day = 1
		  }
		  var date = day + '/' + month + '/' + year
		  this.setState({
			actualDateBegin: date,
			actualDateBeginDay: day,
			actualDateBeginMonth: month,
			actualDateBeginYear: year,
			actualDateEnd: date,
			actualDateEndDay: day,
			actualDateEndMonth: month,
			actualDateEndYear: year,
			DNotes: [],	
			loading: true
		  })
		  this._bootstrapAsync();
		}
	  }
	
	  onSwipe = (gestureName, gestureState) => {
		const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
		this.setState({gestureName: gestureName});
		switch (gestureName) {
		  case SWIPE_LEFT:
			this._nextPeriod()
			break;
		  case SWIPE_RIGHT:
			this._previousPeriod()
			break;
		}
	  }
	
		_bootstrapAsync = () => {
			this.props.getUserToken().then(() => {
				this.props.getUserCurrentModule().then(() => {
					APIGetPatientNotesByDateIntervale(this.props.token.token, this.state.actualDateBegin, this.state.actualDateEnd).then(async data => {
					let response = await data.json()
					if (data.status == 200) {
						this.setState({ DNotes: response, loading: false })
					}
					}).catch(error => {
						this.setState({ error })
					})
				})
			}).catch(error => {
				this.setState({ error })
			})
		}
	
	  getAndFindDay = (dateStr) =>
	  {
		var date = new Date(dateStr);
		date = date.toDateString()
		nameOfDay = date.substr(0, date.indexOf(' '))
		if (nameOfDay == "Mon")
		  return 1
		else if (nameOfDay == "Tue")
		  return 2
		else if (nameOfDay == "Wed")
		  return 3
		else if (nameOfDay == "Thu")
		  return 4
		else if (nameOfDay == "Fri")
		  return 5
		else if (nameOfDay == "Sat")
		  return 6
		else if (nameOfDay == "Sun")
		  return 7
	  }
	
	  _handleChangeDatasMode = (id) => {
		if (id == 1 && this.state.datasMode != this.state.adminEnum.Month) {
		  this.setState({
			lastmode: this.state.datasMode,
			actualDateBeginDay: 1,
			actualDateBegin: 1 + '/' + this.state.actualDateBeginMonth + '/' + this.state.actualDateBeginYear,
			actualDateEndDay: this.getDaysInMonth(this.state.actualDateBeginMonth, this.state.actualDateBeginYear),
			actualDateEnd: this.getDaysInMonth(this.state.actualDateBeginMonth, this.state.actualDateBeginYear) + '/' + this.state.actualDateBeginMonth + '/' + this.state.actualDateBeginYear,
			nbDaysOfCurrentMonth: this.getDaysInMonth(this.state.actualDateBeginMonth, this.state.actualDateBeginYear),
			customButton: this.state.originalColor,
			firstButton: this.state.finalColor,
			secondButton: this.state.originalColor,
			thirdButton: this.state.originalColor,
			datasMode: this.state.adminEnum.Month,
			DNotes: [],	
			loading: true
		  })
		  this._bootstrapAsync();
		}
		else if (id == 2 && this.state.datasMode != this.state.adminEnum.Week) {
		  var place0fTheDay = this.getAndFindDay(this.state.actualDateBeginMonth + "/" + this.state.actualDateBeginDay + "/" + this.state.actualDateBeginYear);
		  var dateBeginDay = this.state.actualDateBeginDay - place0fTheDay + 1
		  var dateBeginMonth = this.state.actualDateBeginMonth
		  var dateBeginYear = this.state.actualDateBeginYear
		  if (dateBeginDay <= 0) {
			dateBeginMonth  = parseInt(this.state.actualDateBeginMonth, 10) - 1	
			if (dateBeginMonth <= 0) {
			  dateBeginYear = parseInt(this.state.actualDateBeginYear, 10) - 1	
			  dateBeginMonth = 12 
			}
			dateBeginDay = this.getDaysInMonth(dateBeginMonth, dateBeginYear) + dateBeginDay
		  }
		  var dateEndDay = this.state.actualDateBeginDay + (7 - place0fTheDay)
		  var dateEndMonth = this.state.actualDateEndMonth
		  var dateEndYear = this.state.actualDateEndYear
		  if (dateEndDay >= this.getDaysInMonth(dateBeginMonth, dateBeginYear)) {
			dateEndMonth  = parseInt(this.state.actualDateEndMonth, 10) + 1	
			if (dateEndMonth <= 0) {
			  dateEndYear = parseInt(this.state.actualDateEndYear, 10) + 1	
			  dateEndMonth = 1 
			}
			dateEndDay = dateEndDay - this.getDaysInMonth(dateBeginMonth, dateBeginYear)
		  }
		  this.setState({
			lastmode: this.state.datasMode,
			actualDateBeginDay: dateBeginDay,
			actualDateBeginMonth: dateBeginMonth,
			actualDateBeginYear: dateBeginYear,
			actualDateBegin: dateBeginDay + '/' + dateBeginMonth + '/' + dateBeginYear,
			actualDateEndDay: dateEndDay,
			actualDateEndMonth: dateEndMonth,
			actualDateEndYear: dateEndYear,
			actualDateEnd: dateEndDay + '/' + dateEndMonth + '/' + dateEndYear,
			customButton: this.state.originalColor,
			firstButton: this.state.originalColor,
			secondButton: this.state.finalColor,
			thirdButton: this.state.originalColor,
			datasMode: this.state.adminEnum.Week,
			DNotes: [],	
			loading: true
		  })
		  this._bootstrapAsync();
		}
		else if (id == 3 && this.state.datasMode != this.state.adminEnum.Day) {
		  this.setState({
			lastmode: this.state.datasMode,
			actualDateBeginDay: this.state.actualDayDay,
			actualDateBeginMonth: this.state.actualDayMonth,
			actualDateBeginYear: this.state.actualDayYear,
			actualDateBegin: this.state.actualDayDate, 
			actualDateEndDay: this.state.actualDayDay,
			actualDateEndMonth: this.state.actualDayMonth,
			actualDateEndYear: this.state.actualDayYear,
			actualDateEnd: this.state.actualDayDate,
			nbDaysOfCurrentMonth: this.getDaysInMonth(this.state.actualDateBeginMonth, this.state.actualDateBeginYear),
			firstButton: this.state.originalColor,
			secondButton: this.state.originalColor,
			customButton: this.state.originalColor,
			thirdButton: this.state.finalColor,
			datasMode: this.state.adminEnum.Day,
			DNotes: [],	
			loading: true
		  })
		  this._bootstrapAsync();
		}
		else if (id == 4 && !this.state.isModalVisible) {
		  this.setModalVisible(true)
		  this.setState({
			lastmode: this.state.datasMode,
			firstButton: this.state.originalColor,
			secondButton: this.state.originalColor,
			thirdButton: this.state.originalColor,
			customButton: this.state.finalColor,
			datasMode: this.state.adminEnum.Custom,
			DNotes: [],	
			loading: true
		  })
		  this._bootstrapAsync();
		}
	  }
	
	  onDateChange(date) {
		this.setState({
		  selectedStartDate: date,
		});
	  }
	
	  getDaysInMonth = (month,year) => {
		return new Date(year, month, 0).getDate();
	  }
	   
	  onDateChange = (date, type) => {
		if (type === 'END_DATE') {
		  this.setState({
			selectedEndDate: date,
		  });
	  
		} else {
		  this.setState({
			selectedStartDate: date,
			selectedEndDate: null,
		  });
		}
	  }
	 
		setModalVisible = (visible) => {
			this.setState({
				isModalVisible: visible,
		})
		if (!visible) {
		  this._bootstrapAsync();
	
		}
	  }
	
	  validateDates = (startDate, endDate) => {
		if (!startDate || !endDate)
		  this._handleChangeDatasMode(this.state.lastmode)
		console.log(startDate, endDate)
		startDate = new Date(startDate)
		endDate = new Date(endDate)
		var startYear = startDate.getFullYear();
			var startMonth = startDate.getMonth() + 1; 
		var startDay = startDate.getDate();
		console.log(startYear, startMonth, startDay)
		var endYear = endDate.getFullYear();
			var endMonth = endDate.getMonth() + 1; 
		var endDay = endDate.getDate();
		console.log(endYear, endMonth, endDay)
		this.setState({
		  actualDateBeginDay: startDay,
		  actualDateBeginMonth: startMonth,
		  actualDateBeginYear: startYear,
		  actualDateBegin: startDay + '/' + startMonth + '/' + startYear, 
		  actualDateEndDay: endDay,
		  actualDateEndMonth: endMonth,
		  actualDateEndYear: endYear,
		  actualDateEnd: endDay + '/' + endMonth + '/' + endYear,
		  nbDaysOfCurrentMonth: this.getDaysInMonth(startMonth, startYear)
		})
		this.setModalVisible(false)
	  }
	
	  displaytDate = (date) => {
		if (!date)
		  return
		date = new Date(date)
		var dateYear = date.getFullYear();
			var dateMonth = date.getMonth() + 1; 
		var dateDate = date.getDate();
		return(dateDate + '/' + dateMonth + '/' + dateYear)
	  }
	  
	_accessDetailNote = (DataNote) => {
		this.props.navigation.navigate('DetailNote', {data: JSON.parse(DataNote)})
	}


	selectAllPressed = () => {
		console.log('selectAllPressed ! :)')
		for (var i = 0; i < this.state.selectedNotes.length; i++) {
			console.log(this.state.selectedNotes[i].id)
			if (this.state[this.state.selectedNotes[i].id] == false) {
				this.setState({
					[this.state.selectedNotes[i].id]: true
				})
				this.state.checkCount += 1
			}
		}
		this.setModalCheckboxVisible(false)
		this.setState({ refreshing: true })
	}

	exportPDFPressed = () => {
		let PDFData = []
		let counter = 0
		for (var i = 0; i < this.state.DNotes.length; i++) {
			if (this.state[this.state.DNotes[i].id] == true) {
				PDFData[counter] = this.state.DNotes[i]
				counter += 1
			}
		}
		this.setModalCheckboxVisible(false)
		this.setState({ refreshing: true })
		
		this.props.navigation.navigate('ExportPDF', {'PDFData': PDFData})
	}

	setModalCheckboxVisible = (visible) => {
		this.setState({ modalCheckboxVisible: visible })
	}

	noteChecked = (item) => {
		console.log("toto")
		if (this.state[item.id] == false) {
			this.state.checkCount += 1
		} else {
			this.state.checkCount -= 1
		}
		this.setState({ [item.id]: !this.state[item.id] })
		console.log(this.state[item.id])

		console.log("checkCount")
		console.log(this.state.checkCount)
		

		if (this.state.checkCount == 0) {
			this.setState({ isSelectActive: false })
		} else if (this.state.checkCount != 0 && this.state.isSelectActive == false) {
			this.setState({ isSelectActive: true })
		}
		this.setState({ refreshing: true })
	}
		
	_deletelNote = (id) => {
		this.props.getUserToken().then(() => {
			APIRemovePatientNotes(this.props.token.token, id).then(data => {
				if (data.status == 200)
					this._bootstrapAsync();
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	render() {
		const deviceWidth = Dimensions.get("window").width / 2;
		const { selectedStartDate, selectedEndDate } = this.state;
		const minDate = new Date(2010, 6, 3);
		const maxDate = new Date(2034, 6, 3);
		const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
		const endDate = selectedEndDate ? selectedEndDate.toString() : '';
	 
		const config = {
		  velocityThreshold: 0.3,
		  directionalOffsetThreshold: 80
		};
		return (
			<View style={styles.container}>
				<View style={{flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignContent: "center", width: Dimensions.get('window').width}}>
         		    <Text style={{color:"white", textAlign:'center', fontWeight: "bold", fontSize: 22}}>Vos données statistiques</Text>
         		</View>
         		<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: "stretch", width: Dimensions.get('window').width}}>
         			<View style={{flex: 1.8}}>
         		    	<Button color={this.state.firstButton} onPress={() => {this._handleChangeDatasMode(1)}} title={"Mois"}/>
         		    </View>
         		   	<View style={{flex: 2.5}}>
         		    	<Button color={this.state.secondButton} onPress={() => {this._handleChangeDatasMode(2)}} title={"Semaine"}/>
         		   	</View>
         		   	<View style={{flex: 1.7}}>
         		    	<Button color={this.state.thirdButton} onPress={() => {this._handleChangeDatasMode(3)}} title={"Jour"}/>
         		   	</View>
         		   	<View style={{ flex:4}}>
         		        <Button color={this.state.customButton} onPress={() => {this._handleChangeDatasMode(4)}} title={"Personnaliser"}/>
         		   	</View>
         		</View>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalCheckboxVisible}
				>
					<View style={{ flex: 1}}>
					<TouchableHighlight style={{margin: 10}}>
						<Icon
							name="clear"
							color="#62BE87"
							size={35}
							onPress={() => { this.setModalCheckboxVisible(false); }}
	    				/>
					</TouchableHighlight>
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.selectAllPressed() }}>
						<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Tout Selectionner </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.exportPDFPressed() }}>
						<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Exporter sous PDF </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.shareNote() }}>
						<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Partager </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => {}}>
						<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Ne plus partager </Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => {}}>
						<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Supprimer </Text>
					</TouchableOpacity>
					</View>
				</Modal>
				<Modal2
				  	visible={this.state.isModalVisible}
					animationType="slide"
					animationIn="slideInUp"
       			   	animationOut="slideOutDown"
       			   	backdropColor='rgba(0,0,0,0.5'
       			   	onSwipeComplete={() => this.validateDates(startDate, endDate)}
       			   	onBackdropPress={() => this.validateDates(startDate, endDate)}
       			   	deviceWidth={deviceWidth}>
       			   	  	<View style={styles.modalView}>
       			   	  	  	<Text>{this.displaytDate(startDate)} {this.displaytDate(endDate)}</Text>
       			   	  	  	<CalendarPicker
       			   	  	  	  startFromMonday={true}
       			   	  	  	  allowRangeSelection={true}
       			   	  	  	  minDate={minDate}
       			   	  	  	  maxDate={maxDate}
       			   	  	  	  todayBackgroundColor="#f2e6ff"
       			   	  	  	  selectedDayColor="#7300e6"
       			   	  	  	  selectedDayTextColor="#FFFFFF"
       			   	  	  	  onDateChange={this.onDateChange}
       			   	  	  	  style={{flex : 1}}
       			   	  	  	  previousTitle="Précedent"
       			   	  	  	  nextTitle="Suivant"
       			      	  	 months={["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]}
       			      	  	 weekdays={["Lun","Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]}
       			      	 	/>
       			      	 <Button title="OK" onPress={() => this.validateDates(startDate, endDate)}/>
       			     	</View>
  				</Modal2>
				<GestureRecognizer
        		  onSwipe={this.onSwipe}
        		  config={config}
        		  style={{flex: 7}}
        		>
        			<View style={{ flex: 1, justifyContent: 'center', alignContent: "center", flexDirection: 'row', backgroundColor: "", width: Dimensions.get('window').width}}>
        				<View style={{ flex: 2 }}></View>
        				{ this.state.datasMode != this.state.adminEnum.Custom &&
        					<Icon
								name="arrow-back"
								color={"black"}
								size={20}
        					  	onPress={() => this._previousPeriod()}
        					  	style={{ flex: 1, textAlign: "center" }}
							/>
        				}
        				{ this.state.actualDateBegin == this.state.actualDateEnd
        				?
        					<Text style={{ flex: 4, textAlign: "center", color: "black" }}>{this.state.actualDateBegin}</Text>
        				:
        				this.state.datasMode != this.state.adminEnum.Custom
        				?
        		    		<View style={{ flex: 4 }}>
        		    		  <Text style={{ flex: 5, textAlign: "center", color: "black" }}>{this.state.actualDateBegin}</Text>
        		    		  <Text style={{ flex: 5, textAlign: "center", color: "black" }}>{this.state.actualDateEnd}</Text>
        		    		</View>
        		  		:
        		  			<View style={{ flex: 10 }}>
        		  			  <Text style={{ flex: 5, textAlign: "center", color: "black" }}>{this.state.actualDateBegin}</Text>
        		  			  <Text style={{ flex: 5, textAlign: "center", color: "black" }}>{this.state.actualDateEnd}</Text>
        		  			</View>
        				}
        				{ this.state.datasMode != this.state.adminEnum.Custom &&
        					<Icon
        						name="arrow-forward"
        						color={"black"}
        						size={20}
        					  	onPress={() => this._nextPeriod()}
        					  	style={{ flex: 1, textAlign: "center" }}
        					/>
        				}
        				<View style={{ flex: 2 }}></View>
        			</View>
					<View style={{flex: 9}}>
						{this.state.loading && 
							<ActivityIndicator size='large' color='black' />}
						{ !this.state.loading && !this.state.DNotes
						?
						<View style={styles.WhithoutModule}>
							<Text style={{ marginBottom : 30, fontSize: 20 }}>
								Aucunes notes sur cette période de temps
							</Text>
						</View>
						:
            			<ScrollView>
							<FlatList
								data={this.state.DNotes}
								keyExtractor={(item) => item.id.toString()}
								refreshing={this.state.refreshing}
								renderItem={({item}) => (
									console.log("njlnj"),
								<TouchableOpacity
									delayLongPress={1000}
									onLongPress={() => { this.noteChecked(item)	}}
									onRefresh={this.setState({ refreshing: false })}
									onPress={() => this.props.navigation.navigate('DetailNote', item)}
									style={styles.note}>
									{ this.state.isSelectActive ? 
										<View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
											<CheckBox
												checked={this.state[item.id]}
												onPress={() => { this.noteChecked(item) }}
											/>
											<Text style={styles.noteText}>{item.data.date} {item.data.time}</Text>
										</View>
										:
										<Text style={styles.noteText}>{item.data.date} {item.data.time}</Text>
									}
									{ !item.data.description
									?
									<Text style={styles.description}>Pas de description</Text>
									: (item.data.description.length > 20)
									?
									<Text style={styles.description}>{item.data.description.substr(0, 20)}...</Text>
									:
									<Text style={styles.description}>{item.data.description}</Text>
									}
									<View style={{flexDirection: "row"}}>
										<TouchableOpacity onPress={() => this.props.navigation.navigate('EditNote',  {itemDetail: item })}>
											<View style={styles.editBorder}>
												<Icon
													name="edit"
													color={"#874C90"}
													size={18}
			    								/>
												<Text style={styles.edit}>Edit</Text>
											</View>
										</TouchableOpacity>
										<TouchableOpacity onPress={() => this._deletelNote(item.id)}>
											<View style={styles.deleteBorder}>
												<Icon
													name="delete"
													color={"#ad0f0f"}
													size={18}
			    								/>
												<Text style={styles.delete}>Supprimer</Text>
											</View>
										</TouchableOpacity>
									</View>
							</TouchableOpacity>
							)}
							/>
						</ScrollView>
						}
					</View>
				</GestureRecognizer>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
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
		marginTop: 30,
	},
	description: {
		marginTop: 15,
		fontSize: 14,
		color: "#E9E9E9"
	},
	editBorder: {
		marginTop: 15,
		marginRight: 5,
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
	},
	deleteBorder: {
		marginTop: 15,
		marginLeft: 5,
		paddingLeft: 13,
		paddingRight: 15,
		paddingTop: 3,
		paddingBottom: 3,
		flexDirection: "row",
		borderColor: "#ad0f0f",
		borderWidth: 1.5,
	},
	delete: {
		paddingLeft: 3,
		fontSize: 13,
		color: "#ad0f0f"
	},
	centeredView: {
		flex: 1,
	  },
	  modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		alignItems: "center",
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	  },
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