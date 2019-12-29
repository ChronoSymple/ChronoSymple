// Components/Statistic.js

import React from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet, Button } from 'react-native'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { colors, windowSize } from '../StyleSheet'
import { connect } from 'react-redux';
import { APIGetPatientNotesByModule } from '../../API/APIModule'
import { getUserToken, getUserCurrentModule } from '../../Redux/Action/action';
import {
  LineChart
} from 'react-native-chart-kit'
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';

class Statistic extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      Glycemie: [],
      GlycemieAverage: 0,
      Date: [],
      loading: true
    }
    this._bootstrapAsync();
  }

  create_stats = async (response) => {
    for (var i = 0; i < response.length; i++) {
      obj = JSON.parse(response[i].data);
      this.setState({
        Glycemie: this.state.Glycemie.concat([parseInt(obj.BloodGlucose, 10)]),
        Date: this.state.Date.concat([obj.date])
      })
    }
  }

  AverageMaker() {
    var average = 0
    var glycemieArraySize = this.state.Glycemie.length
    for (var i = 0; i < glycemieArraySize; i++) {
      average += this.state.Glycemie[i];
    }
    average /= glycemieArraySize;
    this.setState({
      GlycemieAverage: Math.round(average)
    })
  }

	_bootstrapAsync = () => {
		this.props.getUserToken().then(() => {
			this.props.getUserCurrentModule().then(() => {
				APIGetPatientNotesByModule(this.props.token.token, this.props.currentModule.currentModule).then(async data => {
					let response = await data.json()
					console.log(data)
					if (data.status == 200) {
						this.setState({
							DNotes: [ ...this.state.DNotes, ...response ],
							loading: false,
						})
					}
					}).catch(error => {
						this.setState({ error })
					})
				})
		}).catch(error => {
			this.setState({ error })
		})
	}

  render() {
    var data= {
      labels: this.state.Date,
      datasets: [{
        data: [
          0,
          25
        ]
      }]
    }
    var data2 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }]
    }
    const data3 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    return (
      <View style={styles.container}>
        <View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
          <Text style={{color:colors.secondary , textAlign:'center', fontWeight: "bold", justifyContent: 'center', fontSize:25}}>Vos dernières</Text>
          <Text style={{color:colors.secondary , textAlign:'center', fontWeight: "bold", justifyContent: 'center', fontSize:25}}>données</Text>
        </View>
        <View style={{flex: 8}}>
          <ScrollView>
             <Text style={{textAlign:'center', fontSize:20}}>Moyennes</Text>
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
                  <Text style={{fontSize: 25, color:"white"}}>14</Text>
                </TouchableOpacity>
                </View>
                <Text style={{marginTop: 20, textAlign: "center"}}>Glycémie</Text>
                <LineChart
                  data={data}
                  width={Dimensions.get('window').width}
                  height={220}
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16
                  }}              
                />
                <Text style={{marginTop: 20, textAlign: "center"}}>Insuline (Nourriture)</Text>
                <LineChart
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [{
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }]
                  }}
                  width={Dimensions.get('window').width - 16}
                  height={220}
                  yAxisLabel={'Rs'}
                  chartConfig={{
                    backgroundColor: '#FFF',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
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
                <Text style={{marginTop: 20, textAlign: "center"}}>Insuline (Corr.)</Text>
                <LineChart
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [{
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }]
                  }}
                  width={Dimensions.get('window').width - 16}
                  height={220}
                  yAxisLabel={'Rs'}
                  chartConfig={{
                    backgroundColor: '#FFF',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
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
                <AreaChart
                style={{ height: 200 }}
                data={ this.state.Glycemie }
                contentInset={{ top: 30, bottom: 30 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                >
                  <Grid/>
                </AreaChart>
          </ScrollView>
        </View>
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
