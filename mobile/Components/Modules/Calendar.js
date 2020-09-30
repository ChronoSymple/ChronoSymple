// Components/Calendar.js

import React from 'react'
import { ActivityIndicator, View, Text, StyleSheet, Button, FlatList, TouchableOpacity, TouchableHighlight, BackHandler, Dimensions, SafeAreaView} from 'react-native'
import { APIGetPatientNotesByDateIntervale,  APIRemovePatientNotes, APIShareNote, APIgetDoctorsOfModule, APIUnshareNote, APIDoctorOfNotes } from '../../API/APIModule'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import { colors, windowSize } from '../StyleSheet';
import ModalFilter from "./ModalFilter"
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Modal2 from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker'
import { showMessage, hideMessage } from "react-native-flash-message";
import { StackActions } from 'react-navigation';

class Calendar extends React.Component {

	constructor (props) {
		super(props)
		var now =  new Date()
		var year   = now.getFullYear();
		var month    = now.getMonth() + 1; 
		var day    = now.getDate();
		var date = day + '/' + month + '/' + year    
		this.state = {
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
			modalCheckboxVisible: false,
			modalManySelected: false,
			modalOneSelected: false,
			notes: [],
			displayDoctor: false,
			doctorOfNote: "",
			doctorsOfModule: [],
			displayDoctor: false,
			finish: false,
			shared: new Map(),
			modalVisible: false
		}
		//this.hideFilterModal = this.hideFilterModal().bind(this)
		this._bootstrapAsync();
		const { navigation } = this.props;
		this.focusListener = navigation.addListener('didFocus', () => {
			this._bootstrapAsync();
	  });
	}

	shareNote = () => {
		let notes = this.state.selectedNotes;
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
					if (data.status == 200 && doctor_ids.length > 0) {
						APIShareNote(token, cur_modl, notes, doctor_ids).then(async data => {
							if (data.status == 200) {
								showMessage({
						            message: "La note a été partagée !",
						            type: "success"
					        	});
								this.setState({
									notes: [],
									selectedNotes: [],	
									loading: true
								  })
								  this._bootstrapAsync();
							} else if (data.status == 404 && data.status == 500) {
								showMessage({
									message: "Un probleme est survenus, vous allez être déconnecté",
									type: "danger",
								});
								this.props.navigation.navigate("Logout");
							} else {
								showMessage({
						            message: "Un problème est survenu, votre note n'a pas pu être partagé",
						            type: "danger",
					        	});
							}
						})
					} else if (data.status == 200)
					{
						showMessage({
							message: "Aucun médecin assigné au module \"Diabète\", la note n'a pas été partagé",
							type: "danger"
						});
					} else if (data.status == 404 && data.status == 500) {
						showMessage({
							message: "Un probleme est survenus, vous allez être déconnecté",
							type: "danger",
						});
						this.props.navigation.navigate("Logout");
					} else {
						showMessage({
							message: "Un problème est survenu, nous n'avons pas réussis à récupérer vos médecins, réessayez plus tard",
							type: "danger",
						});
					}
				})
			})
		})
		this.setModalCheckboxVisible(false);
	}

	unshareNote = () => {
		let notes = this.state.selectedNotes;
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				let token = this.props.token.token;
				let cur_modl = this.props.currentModule.currentModule;
				APIgetDoctorsOfModule(token, cur_modl).then(async data => {
					let response = await data.json();
					let doctor_ids = [];
					if (data.status == 200) {
						for (let doc of response) {
							doctor_ids.push(doc.id)
						}
						for (let note of notes) {
							APIUnshareNote(token, note, doctor_ids).then(async data => {
								if (data.status == 200) {
									this.setState({
										notes: [],
										selectedNotes: [],	
										loading: true
									})
									this._bootstrapAsync();
								} else if (data.status == 404 && data.status == 500) {
									showMessage({
										message: "Un probleme est survenus, vous allez être déconnecté",
										type: "danger",
									});
									this.props.navigation.navigate("Logout");
								} else {
									showMessage({
										message: "Un problème est survenus, nous n'avons pas réussis à enlever le partage de la note",
										type: "danger",
									});
								}
							})
						}
					} else if (data.status == 404 && data.status == 500) {
						showMessage({
							message: "Un probleme est survenus, vous allez être déconnecté",
							type: "danger",
						});
						this.props.navigation.navigate("Logout");
					} else {
						showMessage({
							message: "Un problème est survenus, nous n'avons pas réussis à récupérer vos médecins",
							type: "danger",
						});
					}
				})
			})
		})
		this.setModalCheckboxVisible(false);
	}

	displayDoctor = () => {
		notes = this.state.selectedNotes
		for (let note of notes) {
			this.setState({
				displayDoctor: true,
				doctorOfNote: this.findDoctorOfNote(note.id)
			})
		}
	}

	selectAllPressed = () => {
		let all_note_ids = []
		for (let note of this.state.notes) {
			all_note_ids.push(note.id);
		}
		this.setState({selectedNotes: all_note_ids});
		this.setModalCheckboxVisible(false);
	}

	exportPDFPressed = () => {
		let startingDate = this.state.actualDateBeginDay + "/" + this.state.actualDateBeginMonth + "/" + this.state.actualDateBeginYear
		let endDate = this.state.actualDateEndDay + "/" + this.state.actualDateEndMonth + "/" + this.state.actualDateEndYear
		let PDFData = []
		for (var i = 0; i < this.state.selectedNotes.length; i++) {
			for (var j = 0; j < this.state.notes.length; j++) {
				if (this.state.notes[j].id == this.state.selectedNotes[i]) {
					PDFData.push(this.state.notes[j])
				}
			}
		}
		this.setModalCheckboxVisible(false)
		this.props.navigation.navigate('ExportPDF', {'PDFData': PDFData, "startDate": startingDate, "endDate": endDate})
	}

	setModalCheckboxVisible = (visible) => {	
		this.setState({ modalCheckboxVisible: visible })
	}

	noteChecked = (item, state) => {
		let selected_n = this.state.selectedNotes;
		if (this.state.selectedNotes.includes(item.id)) {
			var pos = selected_n.indexOf(item.id);
			selected_n.splice(pos, 1)
		}
		else {
			selected_n.push(item.id);
		}
		this.setState({
			selectedNotes: selected_n,
			isSelectActive: true
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
			selectedNotes: [],	
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
			notes: [],
			selectedNotes: [],	
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
			notes: [],
			selectedNotes: [],	
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
			notes: [],
			selectedNotes: [],	
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
			if (this.state.actualDateEndDay == this.getDaysInMonth(dateEndMonth, dateEndYear)) {
				dateEndDay = dateEndDay - this.getDaysInMonth(dateEndMonth, dateEndYear)
				dateEndMonth  = parseInt(this.state.actualDateEndMonth, 10) + 1	
				if (dateBeginMonth >= 12) {
					dateBeginYear = parseInt(this.state.actualDateEndYear, 10) + 1	
					dateBeginMonth = 1 
				}
			}
			else if (dateEndDay > this.getDaysInMonth(dateBeginMonth, dateBeginYear)) {
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
				notes: [],
				selectedNotes: [],	
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
			notes: [],
			selectedNotes: [],	
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

	  findDoctorOfNote = (note_id) => {
		this.props.getUserToken().then(() => {
			APIDoctorOfNotes(this.props.token.token, note_id).then(async data => {
				let response = await data.json();
				if (response.length == 0)
					shared = true
				else
					shared = false
				this.setState({
					shared: this.state.shared.set(note_id, shared)
				})
			})
		})
	}

	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIGetPatientNotesByDateIntervale(this.props.token.token, this.state.actualDateBegin, this.state.actualDateEnd, this.props.currentModule.currentModule).then(async data => {
				let response = await data.json()
				if (data.status == 200) {
					this.setState({
						notes: [ ...response ],
						selectedNotes: [],
						loading: false,
					})
					var i = 0
					if (response.length > 0) {
						while (i < response.length) {
							findDoctorOfNote(response[i].id)
							i = i + 1
						}
					}
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
		if (id == 3 && this.state.datasMode != this.state.adminEnum.Month) {
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
			selectedNotes: [],	
			notes: [],
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
				selectedNotes: [],	
				notes: [],
				loading: true
		  	})
		  	this._bootstrapAsync();
		}
		else if (id == 1 && this.state.datasMode != this.state.adminEnum.Day) {
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
			selectedNotes: [],	
			notes: [],
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
				selectedNotes: [],	
				notes: [],
				loading: true
			})
		}
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
	  }
	
	  validateDates = (startDate, endDate) => {
		if (!startDate || !endDate) {
		  this.setState({
			datasMode: this.state.lastmode
		  })
		  this._handleChangeDatasMode(this.state.lastmode)
		  this.setModalVisible(false)
		  return;
		}
		startDate = new Date(startDate)
		endDate = new Date(endDate)
		var startYear = startDate.getFullYear();
			var startMonth = startDate.getMonth() + 1; 
		var startDay = startDate.getDate();
		var endYear = endDate.getFullYear();
			var endMonth = endDate.getMonth() + 1; 
		var endDay = endDate.getDate();
		this.setState({
		  actualDateBeginDay: startDay,
		  actualDateBeginMonth: startMonth,
		  actualDateBeginYear: startYear,
		  actualDateBegin: startDay + '/' + startMonth + '/' + startYear, 
		  actualDateEndDay: endDay,
		  actualDateEndMonth: endMonth,
		  actualDateEndYear: endYear,
		  actualDateEnd: endDay + '/' + endMonth + '/' + endYear,
		  nbDaysOfCurrentMonth: this.getDaysInMonth(startMonth, startYear),
		  selectedNotes: [],	
		  notes: [],
		  loading: true
		})
		this._bootstrapAsync();
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

	_deleteNote = () => {
		this.setModalCheckboxVisible(false);
		let notes = this.state.selectedNotes;
		this.props.getUserToken().then(() => {
			for (let note of notes) {
				APIRemovePatientNotes(this.props.token.token, note).then(data => {
					if (data.status == 200) {
						this._bootstrapAsync();
						if (notes.length == 1) {
							showMessage({
								message: "La note ont bien été supprimé",
								type: "success"
							});
						} else {
							showMessage({
								message: "Les notes ont bien été supprimé",
								type: "success"
							});
						}
					} else {
						showMessage({
							message: "Une erreur est survenue, reessayez. Si le probleme persiste contactez nous",
							type: "danger"
						});
					}
				})
			}
		}).catch(error => {
			this.setState({loading: false});
			this.setState({ error })
			showMessage({
				message: "Une erreur de session est survenue. actualisez la page. Si le probleme persiste contactez nous",
				type: "danger"
			});
		})
	}

	changeDoctor = (unitId, general_unitId, mode, actualDoctor) => {
		this.props.navigation.navigate('SearchDoctors', {unitId: unitId, general_unitId: general_unitId, pageToReturn: "Calendar", mode: mode, actualDoctor: actualDoctor});
	}

	displayDoctor = () => {
		if (!this.state.displayDoctor == true)
			this.getDoctors()
		this.setState({
			finish: false,
			displayDoctor: !this.state.displayDoctor
		})
	}

	showFilterModal = () => {
		console.log("VISBLE")
		this.setState({
			modalVisible: true
		}, () => {console.log(this.state.modalVisible)})
	}

	hideFilterModal = () => {
		console.log("HIDE")
		this.setState({
			modalVisible: false
		}, () => {console.log(this.state.modalVisible)})
		this.setModalCheckboxVisible(false);
	}

	getDoctors = () => {
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIgetDoctorsOfModule(this.props.token.token, this.props.currentModule.currentModule).then(async data => {
					let response = await data.json()
					this.setState({ 
						finish: true,
						doctorsOfModule: response
					})
				}).catch(error => {
					this.setState({ error, finish: true })
				})
			})
		}).catch(error => {
			this.setState({ error })
		})
	}

	displayDate = (created_at) => {
		let date = new Date(created_at)
		let time = created_at.substr(created_at.indexOf("\T") + 1, created_at.length);
		let time2 = time.split(":")
	//	dateDate = dateDate.split("-").join(" ")
		return (
			<Text style={styles.noteText}>
				{time2[0]}H {time2[1]}:{time2[2].substr(0, time2[2].indexOf("."))}
			</Text>
		);
	}

	render() {
		const deviceWidth = Dimensions.get("window").width / 2;
		const { selectedStartDate, selectedEndDate } = this.state;
		const minDate = new Date(2010, 6, 3);
		const maxDate = new Date(2034, 6, 3);
		const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
		const endDate = selectedEndDate ? selectedEndDate.toString() : '';
	 
		const config = {
			velocityThreshold: 0.6,
      		directionalOffsetThreshold: 100
		};
		return (
			<View style={styles.container}>
				<ModalFilter 
					modalShow={this.state.modalVisible}
					modalHide={this.hideFilterModal}
					callBack={ () => { this.shareNote() } }
				/>
				<View style={{flex: 0.8, backgroundColor: colors.secondary, justifyContent: 'center', alignContent: "center", width: Dimensions.get('window').width}}>
	         		<Text style={{color:"white", textAlign:'center', fontWeight: "bold", fontSize: 22}}>
	         			Toutes vos notes
	         		</Text>
	         	</View>
         		<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: "stretch", width: Dimensions.get('window').width}}>
         			<View style={{flex: 1.8}}>
         		    	<Button color={this.state.firstButton} onPress={() => {this._handleChangeDatasMode(3)}} title={"Mois"}/>
         		    </View>
         		   	<View style={{flex: 2.5}}>
         		    	<Button color={this.state.secondButton} onPress={() => {this._handleChangeDatasMode(2)}} title={"Semaine"}/>
         		   	</View>
         		   	<View style={{flex: 1.7}}>
         		    	<Button color={this.state.thirdButton} onPress={() => {this._handleChangeDatasMode(1)}} title={"Jour"}/>
         		   	</View>
         		   	<View style={{ flex:4}}>
         		        <Button color={this.state.customButton} onPress={() => {this._handleChangeDatasMode(4)}} title={"Personnaliser"}/>
         		   	</View>
         		</View>

				 { this.state.notes.length == 1 && this.state.selectedNotes.length == 1
				 ?
				 <Modal2
				    visible={this.state.modalCheckboxVisible}
				    style={styles.view}
				    swipeDirection={'down'}
					animationInTiming="3000"
					animationType="slide"
					animationIn="slideInUp"
				  	animationOut="slideOutDown"
					onSwipeComplete={() => this.setModalCheckboxVisible(false)}
					transparent={true}
					backdropColor="rgba(0,0,0,0)"
					onBackdropPress = {() => this.setModalCheckboxVisible(false)}>
				    	<View style={styles.modalContent}>
							<TouchableHighlight style={{margin: 1}}>
								<Icon
									name="clear"
									color="#62BE87"
									size={35}
									onPress={() => { this.setModalCheckboxVisible(false) }}
	    						/>
							</TouchableHighlight>
							<View style={styles.modalContentCenter}>
								<TouchableOpacity style={{ alignItems: 'center', height: windowSize.y / 10 }} onPress={() => { this.exportPDFPressed() }}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Exporter sous PDF </Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => {  this.showFilterModal() }}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Partager </Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.unshareNote() }}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Ne plus partager </Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => this.props.navigation.navigate('EditNote', {itemDetail: this.state.selectedNotes[0]})}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Editer </Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => {this._deleteNote()}}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Supprimer </Text>
								</TouchableOpacity>
							</View>
				  		</View>
				</Modal2>
				:
				this.state.selectedNotes.length == this.state.notes.length 
				?				
				<Modal2
				    visible={this.state.modalCheckboxVisible}
				    style={styles.view}
				    swipeDirection={'down'}
					animationInTiming="3000"
					animationType="slide"
					animationIn="slideInUp"
				  	animationOut="slideOutDown"
					transparent={true}
					backdropColor="rgba(0,0,0,0)"
					onBackdropPress = {() => this.setModalCheckboxVisible(false)}>
				    	<View style={styles.modalContent}>
							<TouchableHighlight style={{margin: 1}}>
								<Icon
									name="clear"
									color="#62BE87"
									size={35}
									onPress={() => { this.setModalCheckboxVisible(false) }}
	    						/>
							</TouchableHighlight>
							<View style={styles.modalContentCenter}>
								<TouchableOpacity style={{ alignItems: 'center', height: windowSize.y / 10 }} onPress={() => { this.exportPDFPressed() }}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Exporter sous PDF </Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.showFilterModal() }}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Partager </Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.unshareNote() }}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Ne plus partager </Text>
								</TouchableOpacity>
								<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => {this._deleteNote()}}>
									<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Supprimer </Text>
								</TouchableOpacity>
							</View>
				  		</View>
				</Modal2>
				:
				<Modal2
					visible={this.state.modalCheckboxVisible}
					style={styles.view}
					swipeDirection={'down'}
					animationInTiming="3000"
					animationType="slide"
					animationIn="slideInUp"
					animationOut="slideOutDown"
					transparent={true}
					backdropColor="rgba(0,0,0,0)"
					onBackdropPress = {() => this.setModalCheckboxVisible(false)}>
					<View style={styles.modalContent}>
						<TouchableHighlight style={{margin: 1}}>
							<Icon
								name="clear"
								color="#62BE87"
								size={35}
								onPress={() => { this.setModalCheckboxVisible(false) }}
							/>
						</TouchableHighlight>
						<View style={styles.modalContentCenter}>
							<TouchableOpacity style={{ alignItems: 'center', height: windowSize.y / 10 }} onPress={() => { this.selectAllPressed() }}>
								<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Tout Selectionner </Text>
							</TouchableOpacity>
							<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.exportPDFPressed() }}>
								<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Exporter sous PDF </Text>
							</TouchableOpacity>
							<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.showFilterModal() }}>
								<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Partager </Text>
							</TouchableOpacity>
							<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => { this.unshareNote() }}>
								<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Ne plus partager </Text>
							</TouchableOpacity>
							<TouchableOpacity style={{ alignItems: 'center', borderTopWidth: 1, height: windowSize.y / 10 }} onPress={() => {this._deleteNote()}}>
								<Text style={{marginTop: windowSize.y / 30, fontSize: windowSize.y / 40}}> Supprimer </Text>
							</TouchableOpacity>
						</View>
					  </View>
				</Modal2>
				}
				<Modal2
				  	visible={this.state.isModalVisible}
					animationType="slide"
					animationIn="slideInUp"
					animationOut="slideOutDown"
					backdropColor='rgba(0,0,0,0.5'
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
					{ this.state.selectedNotes.length > 0 ?
						 <View style={{position:'absolute',bottom:10, zIndex: 2, right: 10}}>
							<View
							style={{
								borderWidth:1,
								borderColor:"white",
								alignItems:'center',
								justifyContent:'center',
								width:60,
								height:60,
								backgroundColor:colors.secondary,
								borderRadius:50,
								shadowColor: '#000',
							 shadowOffset: { width: 1, height: 2 },
							 shadowOpacity: 1,
							 shadowRadius: 1.5,
							 elevation: 10
							}}>
								<Icon
									name="more-vert"
									color={"white"}
									size={45}
									onPress={() => { this.setModalCheckboxVisible(true); }}
									style={{justifyContent: "flex-end"}}
								/>
							</View>
						</View>
						:
						<View style={{position:'absolute',bottom:10, zIndex: 2, right: 10}}>
							<View
							style={{
							   	borderWidth:1,
							   	borderColor:"white",
							   	alignItems:'center',
							   	justifyContent:'center',
							   	width:60,
							   	height:60,
							   	backgroundColor:colors.secondary,
							   	borderRadius:50,
						   		shadowColor: '#000',
								shadowOffset: { width: 1, height: 2 },
								shadowOpacity: 1,
								shadowRadius: 1.5,
								elevation: 10
							}}>
							<Icon
								name="add"
								color={"white"}
								size={45}
								onPress={() => { this.props.navigation.navigate('AddNote', {pageToReturn: "Calendrier"}) }}
								style={{justifyContent: "flex-end"}}
							/>
							</View>
						</View>
					}
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
        		  			  <Text style={{ textAlign: "center", color: "black" }}>{this.state.actualDateBegin} {this.state.actualDateEnd}</Text>
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
						{ !this.state.loading && this.state.notes.length < 1
						?
						<View style={styles.WhithoutModule}>
							<Text style={{ fontSize: 20, textAlign: "center" }}>
								Aucunes notes sur cette période de temps
							</Text>
						</View>
						:
						<SafeAreaView>
							<FlatList
							data={this.state.notes}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => (
								<View style={{flexDirection: "row", borderWidth: 3.5, borderColor: '#F1F1F1', borderRadius: 10,  marginLeft: 12,
								marginRight: 12,
								marginTop: 6,
								marginBottom: 6}}>
									<TouchableOpacity
										delayLongPress={800}
										onLongPress={() => { this.noteChecked(item)	}}
										onPress={() => this.props.navigation.navigate('DetailNote', {data: item})}
										style={styles.note}>
											<View style={{flex: 1, flexDirection: 'row'}}>
												<CheckBox
													checked={this.state.selectedNotes.includes(item.id)}
													onPress={() => { this.noteChecked(item) }}
													style={{flex: 2}}
												/>
												<View style={{flexDirection: "column"}}>
													{this.displayDate(item.created_at)}
													<View>
														{ !item.data.description
															?
															<Text style={styles.description}>Pas de description</Text>
															: (item.data.description.length > 20)
															?
															<Text style={styles.description}>{item.data.description.substr(0, 20)}...</Text>
															:
															<Text style={styles.description}>{item.data.description}</Text>
														}
													</View>
												</View>
											</View>
									</TouchableOpacity>
									{ item.doctor_ids.length > 0 ?
										<View style={{flex: 0.8, backgroundColor: "black",  borderWidth: 3.5, borderColor: 'black', borderBottomRightRadius: 8, borderTopRightRadius: 8}}/>
									:
										<View style={{flex: 0.8, backgroundColor: "#F1F1F1",  borderWidth: 3.5, borderColor: '#F1F1F1', borderBottomRightRadius: 8, borderTopRightRadius: 8}}/>
									}
								</View>
							)}
							/>
						</SafeAreaView>
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
	  	flex: 9.2,
	  	alignItems: 'center',
	  	justifyContent: 'center',
	  	padding: 15,
	  	color: '#000',
	  	flexDirection: "row"
	},
	noteText: {
		fontSize: 20,
		color: "#62BE87",
		fontWeight: "bold",
	},
	list: {
		marginTop: 30,
	},
	view: {
		justifyContent: 'flex-end',
		margin: 0,
	},
	modalContent: {
		borderTopWidth: 1,
		backgroundColor: 'white',
		padding: 22,
		borderRadius: 4,
		borderColor: '#EFF0F1',
	},
	modalContentCenter: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	description: {
		marginTop: 15,
		fontSize: 14,
		color: "black"
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
	WhithoutModule: {
		justifyContent: "center",
		alignItems: "center", 
		margin: 30
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