// Components/Statistic.js

import React from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet, Button, ActivityIndicator } from 'react-native'
import { colors, windowSize } from '../StyleSheet'
import { connect } from 'react-redux';
import { APIGetPatientNotesByModule } from '../../API/APIModule'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import {LineChart} from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/MaterialIcons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class Statistic extends React.Component {
  
  constructor (props) {
    super(props)
    var now =  new Date()
		var annee   = now.getFullYear();
		var month    = now.getMonth() + 1;
		var jour    = now.getDate();
		var date = jour + '/' + month + '/' + annee
    this.state = {
      Glycemie: [],
      GlycemieAverage: 0,
      Date: [],
      originalColor: colors.secondary,
      finalColor: colors.primary,
      firstButton: colors.secondary,
      secondButton: colors.secondary,
      thirdButton: colors.primary,
      adminEnum: { Day: 1, Week: 2, Month: 3 },
      hyper: 0,
      hypo: 0,
      datasMode: 1,
      loading: true,
      todayDate: date, 
      actualDateBegin: date, 
      actualDateEnd: date, 
      data: {
        labels: ["", ""],
        datasets: [{
          data: []
        }]
      },
      display : false,
      loading: true,
      gmyText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff'
    }
    this._bootstrapAsync();
    /*const { navigation } = this.props;
     this.focusListener = navigation.addListener('didFocus', () => {
      this.state = {
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        loading: true,
        display : false,
        data: {
          labels: ["", ""],
          datasets: [{
            data: []
          }]
        },
      }
      this._bootstrapAsync();
    });*/
  }

  _dayMode = (date) => {
    if (date == this.state.actualDateBegin)
      return true;
    else
      return false;
  }

  _checkMode = (date) => {
    if (this.state.datasMode == this.state.adminEnum.Day) {
      return this._dayMode(date)
    }
    return true;
  }

  _createStats = async (response) => {
    var dateIndex = 0;
    let i;
    for (i = 0; i < response.length; i++) {
      obj = response[i].data
      if (parseInt(obj.BloodGlucose, 10) && this._checkMode(obj.date))
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
        if (dateIndex == 0 || i == response.length - 1) {
          this.setState({
            Date: this.state.Date.concat([obj.date])
          })
        }
        else {
          this.setState({
            Date: this.state.Date.concat("")
          })
        }
        if (i == 0)
          dateIndex = 1;
        else
          dateIndex = i;
      }
    }
    if (this.state.Glycemie.length <= 0)
    {
      this.setState({
        Glycemie: [0, 0],
        Date: [this.state.actualDateBegin, this.state.actualDateEnd]
      })
    }
    else if (this.state.Glycemie.length == 1)
    {
      this.setState({
        Glycemie: this.state.Glycemie.concat(this.state.Glycemie[0]),
        Date: this.state.Date.concat(this.state.Date[0]),
      })
    }
    else if (i != dateIndex + 1)
    {
      this.setState({
        Date: this.state.Date.concat(response[dateIndex].data.date)
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
      return
    }
    else if (this.state.datasMode == this.state.adminEnum.Week) {
      return
    }
    else if (this.state.datasMode == this.state.adminEnum.Day) {
      var n = this.state.actualDateBegin.indexOf("/");
      var day = parseInt(this.state.actualDateBegin.substr(0, n), 10) - 1	
      var now =  new Date()
      var annee   = now.getFullYear();
      var month    = now.getMonth() + 1;
      var date = day + '/' + month + '/' + annee
      this.setState({
        actualDateBegin: date,
        actualDateEnd: date,
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

  _nextPeriod() {
    if (this.state.datasMode == this.state.adminEnum.Month) {
      return
    }
    else if (this.state.datasMode == this.state.adminEnum.Week) {
      return
    }
    else if (this.state.datasMode == this.state.adminEnum.Day) {
      var n = this.state.actualDateBegin.indexOf("/");
      var day = parseInt(this.state.actualDateBegin.substr(0, n), 10) + 1	
      var now =  new Date()
      var annee   = now.getFullYear();
      var month    = now.getMonth() + 1;
      var date = day + '/' + month + '/' + annee
      this.setState({
        actualDateBegin: date,
        actualDateEnd: date,
        Glycemie: [],
        GlycemieAverage: 0,
        Date: [],
        data: {
          labels: ["", ""],
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
				APIGetPatientNotesByModule(this.props.token.token, this.props.currentModule.currentModule).then(async data => {
          let response = await data.json()
          console.log(response)
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

  _handleChangeDatasMode = (id) => {
    if (id == 1 && this.state.datasMode != this.state.adminEnum.Month) {
      this.setState({
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
      this.setState({
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
    else if (id == 3 && this.state.datasMode != this.state.adminEnum.Day) {
      this.setState({
        firstButton: this.state.originalColor,
        secondButton: this.state.originalColor,
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
  }

  render() {

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
 
    return (
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: colors.secondary, justifyContent: 'center', alignContent: "center", width: Dimensions.get('window').width}}>
          <Text style={{color:"white", textAlign:'center', fontWeight: "bold", fontSize:22}}>Vos données statistiques</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: "stretch", width: Dimensions.get('window').width}}>
          <View style={{flex: 3}}>
            <Button color={this.state.firstButton} onPress={() => {this._handleChangeDatasMode(1)}} title={"Mois"}/>
          </View>
          <View style={{flex: 3}}>
            <Button color={this.state.secondButton} onPress={() => {this._handleChangeDatasMode(2)}} title={"Semaine"}/>
          </View>
          <View style={{flex: 3}}>
            <Button color={this.state.thirdButton} onPress={() => {this._handleChangeDatasMode(3)}} title={"Jour"}/>
          </View>
        </View>
        <GestureRecognizer
          onSwipe={this.onSwipe}
      //    onSwipeLeft={this.onSwipeLeft()}
//          onSwipeRight={this._previousPeriod()}
          config={config}
          style={{flex: 8}}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignContent: "center", flexDirection: 'row', backgroundColor: "", width: Dimensions.get('window').width}}>
            <View style={{ flex: 2 }}></View>
            <Icon
					  	name="arrow-back"
					  	color={"black"}
					  	size={20}
              onPress={() => this._previousPeriod()}
              style={{ flex: 1, textAlign: "center" }}
					  />
            { this.state.actualDateBegin == this.state.actualDateEnd
              ?
              <Text style={{ flex: 4, textAlign: "center", color: "black" }}>{this.state.actualDateBegin}</Text>
              :
              <View style={{ flex: 4 }}>
                <Text style={{ flex: 5, textAlign: "center", color: "black" }}>{this.state.actualDateBegin}</Text>
                <Text style={{ flex: 5, textAlign: "center", color: "black" }}>{this.state.actualDateEnd}</Text>
              </View>
            }
            <Icon
            	name="arrow-forward"
            	color={"black"}
            	size={20}
              onPress={() => this._nextPeriod()}
              style={{ flex: 1, textAlign: "center" }}
            />
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
                        marginVertical: 8,
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
                        marginVertical: 8,
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

  }
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