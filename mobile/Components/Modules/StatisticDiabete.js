// Components/Statistic.js

import React from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet, Button, ActivityIndicator } from 'react-native'
import { colors, windowSize } from '../StyleSheet'
import { connect } from 'react-redux';
import { APIGetPatientNotesByDateIntervale, APIGetPatientNotesByModule } from '../../API/APIModule'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import {LineChart} from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/MaterialIcons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Modal from "react-native-modal";
import CalendarPicker from 'react-native-calendar-picker'

class Statistic extends React.Component {
  
  constructor (props) {
    super(props)
    var now =  new Date()
		var year   = now.getFullYear();
		var month    = now.getMonth() + 1; 
    var day    = now.getDate();
    var date = day + '/' + month + '/' + year    
    this.state = {
      Glycemie: [],
      GlycemieAverage: 0,
      Date: [],
      hyper: 0,
      hypo: 0,
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
      data: {
        labels: [],
        datasets: [{
          data: []
        }]
      },
      display : false,
      loading: true,
      gmyText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff',
      selectedStartDate: null,
    }
    this.onDateChange = this.onDateChange.bind(this);
    this._bootstrapAsync();
  }

  _createStats = async (response) => {
    for (i = 0; i < response.length; i++) {
      obj = response[i].data
      if (parseInt(obj.BloodGlucose, 10))
      {
        this.setState({
          Glycemie: this.state.Glycemie.concat([parseInt(obj.BloodGlucose, 10)]),
        })
         if (parseInt(obj.BloodGlucose, 10) < 4) {
          this.setState({
            hypo: this.state.hypo + 1
          })
        }
        else if (parseInt(obj.BloodGlucose, 10) > 17) {
          this.setState({
            hyper:  this.state.hyper + 1
          })
        }
      }
    }
   if (this.state.Glycemie.length <= 0)
    {
      this.setState({
        Glycemie: [0, 0],
      })
    }
    else if (this.state.Glycemie.length == 1)
    {
      this.setState({
        Glycemie: this.state.Glycemie.concat(this.state.Glycemie[0]),
      })
    }
    let dataClone = {...this.state.data}
    dataClone.datasets[0].data = this.state.Glycemie;
    dataClone.labels = this.state.Date;
    this.setState({
        isLoading: false,
        data: dataClone,
        display: true
    });
  }

  _averageMaker() {
    if (this.state.Glycemie)
    {
      var average = 0
      var glycemieArraySize = this.state.Glycemie.length
      for (var i = 0; i < glycemieArraySize; i++) {
        average += this.state.Glycemie[i];
      }
      average /= glycemieArraySize;
      this.setState({
        GlycemieAverage: Math.round(average),
        loading: false
      })
    }
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
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        data: {
          labels: ["jun", "feb"],
          datasets: [{
            data: [0]
          }]
        },
        hyper: 0,
        hypo: 0,
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
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        hyper: 0,
        hypo: 0,
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
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        data: {
          labels: [""],
          datasets: [{
            data: [0]
          }]
        },
        hyper: 0,
        hypo: 0,
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
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        data: {
          labels: ["jun", "feb"],
          datasets: [{
            data: [0]
          }]
        },
        hyper: 0,
        hypo: 0,
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
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        hyper: 0,
        hypo: 0,
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
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        data: {
          labels: ["jun", "feb"],
          datasets: [{
            data: [0]
          }]
        },
        hyper: 0,
        hypo: 0,
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
				APIGetPatientNotesByDateIntervale(this.props.token.token, this.state.actualDateBegin, this.state.actualDateEnd, this.props.currentModule.currentModule).then(async data => {
          let response = await data.json()
				 	if (data.status == 200) {
            this._createStats(response)
            this._averageMaker()
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
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        hyper: 0,
        hypo: 0,
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
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        hyper: 0,
        hypo: 0,
        loading: true
      })
      this._bootstrapAsync();
    }
    else if (id == 1 && this.state.datasMode != this.state.adminEnum.Day) {
      this.setState({
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
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        hyper: 0,
        hypo: 0,
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
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        hyper: 0,
        hypo: 0,
        loading: true
      })
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
      Glycemie: [],
      GlycemieAverage: 0,
      Date: [],
      hyper: 0,
      hypo: 0,
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
          <View style={{flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignContent: "center", width: Dimensions.get('window').width}}>
            <Text style={{color:"white", textAlign:'center', fontWeight: "bold", fontSize:22}}>Vos données statistiques</Text>
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
        <Modal
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
  			</Modal>
        <GestureRecognizer
          onSwipe={this.onSwipe}
          config={config}
          style={{flex: 7}}
        >
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
							onPress={() => { this.props.navigation.navigate('AddNote', {pageToReturn: "StatisticDiabete"}) }}
							style={{justifyContent: "flex-end"}}
						/>
						</View>
					</View>					
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
          {this.state.loading
          ? <ActivityIndicator size='large' color='black' />
          :
            <ScrollView>
               <Text style={{textAlign:'center', marginBottom: 15}}>Moyennes</Text>
               <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                  <TouchableOpacity
                    style={{
                       borderWidth:1,
                       borderColor:"white",
                       alignItems:'center',
                       justifyContent:'center',
                       width:100,
                       height:100,
                       backgroundColor:colors.secondary,
                       borderRadius:50,
                       marginLeft: "30%"
                    }}>
                    <Text style={{fontSize: 25, color:"white"}}>{this.state.GlycemieAverage}</Text>
                    <Text style={{fontSize: 10, color:"white"}}>Glucose</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                        borderWidth:1,
                        borderColor:"white",
                        alignItems:'center',
                        justifyContent:'center',
                        width:100,
                        height:100,
                        backgroundColor:colors.primary,
                        borderRadius:50,
                        marginRight: "30%"
                      }}>
                      <Text style={{fontSize: 15, color:"white", borderBottomColor: "white", borderBottomWidth: 2}}>{this.state.hyper} Hypers</Text>                  
                      <Text style={{fontSize: 15, color:"white"}}>{this.state.hypo} Hypos</Text>
                  </TouchableOpacity>
                  </View>
                  <Text style={{marginTop: 20, marginBottom: 20, textAlign: "center", justifyContent: 'center', alignItems:"center"}}>Evolution du taux de glucose</Text>
                  { this.state.display && this.state.Glycemie.length > 2 &&
                    <LineChart
                      data={this.state.data}
                      width={Dimensions.get('window').width * 1} // from react-native
                      height={220}
                      fromZero={true}
                      withDots={false}
                      chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        decimalPlaces: 1, // optional, defaults to 2dp
                        color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        },
                      }}
                      bezier
                      style={{
                        marginVertical: 10,
                        borderRadius: 16,
                      }}
                    />
                  }
                  { this.state.display && this.state.Glycemie.length <= 2 &&
                    <LineChart
                      data={this.state.data}
                      width={Dimensions.get('window').width * 1.5} // from react-native
                      height={220}
                      fromZero={true}
                      withDots={false}
                      chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        decimalPlaces: 1, // optional, defaults to 2dp
                        color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        },
                      }}
                      bezier
                      style={{
                        marginVertical: 10,
                        borderRadius: 16,
                      }}
                    />
                  }
            </ScrollView>
          }
          </View>
        </GestureRecognizer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  myButton:{
    padding: 5,
    height: 200,
    width: 200,
    borderRadius:400,
    backgroundColor:'rgb(195, 125, 198)',

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
});

const mapStateToProps = state => ({
	token: state.token,
	currentModule: state.currentModule
});

const mapDispatchToProps = dispatch => ({
	getUserToken: () => dispatch(getUserToken()),
	getUserCurrentModule: () => dispatch(getUserCurrentModule())
});


export default connect(mapStateToProps, mapDispatchToProps)(Statistic);