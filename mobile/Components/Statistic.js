// Components/Statistic.js

import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class Statistic extends React.Component {
  render() {
  	let deviceWidth = Dimensions.get('window').width
  	const data = [ 50, 10, 40, 95, -4, -24, 85 ]
  	// faudra remplacer la data par ce que renverra la BDD
    return (
      <View style={{ flex: 1, justifyContent: "center"/*, alignItems: "center"*/ }}>
        <Text style={{ marginLeft: deviceWidth / 10 * 4}}>STATISTIQUE</Text>
        <AreaChart
            style={{ height: 200, margin: 20, borderWidth: 1}}
            data={ data }
            contentInset={{ top: 30, bottom: 30 }}
            curve={ shape.curveNatural }
            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        >
            <Grid/>
        </AreaChart>
      </View>
    )
  }
}

export default Statistic;