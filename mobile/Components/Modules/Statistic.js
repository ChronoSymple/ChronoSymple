// Components/Statistic.js

import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { styles, colors, windowSize } from '../StyleSheet'

class Statistic extends React.Component {
  render() {
  	let deviceWidth = Dimensions.get('window').width
    const data = [ 50, 10, 40, 95, -4, -24, 85 ]
  	const data2 = [ 20, 60, 15, -7, -10, -24, 0 ]    
  	// faudra remplacer la data par ce que renverra la BDD
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ backgroundColor:colors.secondary, color:'white', textAlign:'center', fontWeight: "bold", justifyContent: 'center', fontSize:25}}>STATISTIQUE</Text>
        <Text style={{ marginLeft: deviceWidth / 10 * 4, marginTop: 20}}>Glycémie</Text>
        <AreaChart
            style={{ height: 200, margin: 20, marginTop : 5, borderWidth: 1, borderColor: colors.secondary}}
            data={ data }
            contentInset={{ top: 30, bottom: 30 }}
            curve={ shape.curveNatural }
            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        >
            <Grid/>
        </AreaChart>
        <Text style={{ marginLeft: deviceWidth / 10 * 4}}>Gluicide</Text>
        <AreaChart
            style={{ height: 200, margin: 20, marginTop : 5, borderWidth: 1, borderColor: colors.secondary}}
            data={ data2 }
            contentInset={{ top: 30, bottom: 30 }}
            curve={ shape.curveNatural }
            svg={{ fill: 'rgba(65, 145, 244, 0.8)' }}
        >
            <Grid/>
        </AreaChart>
      </View>
    )
  }
}

export default Statistic;