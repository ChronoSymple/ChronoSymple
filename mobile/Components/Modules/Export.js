
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button, Dimensions } from 'react-native'
import { styles, colors, windowSize } from '../StyleSheet'

export default class Export extends React.Component {

  render() {
    let { navigate } = this.props.navigation;
    let deviceWidth = Dimensions.get('window').width

    return (
      <View style={styles2.container}>
        <View style={{ flex: 2, justifyContent: "center"}}>
					<Text style={styles.label_green}>Exporter vos notes</Text>
				</View>
        <Text style={{ flex: 3}}></Text>
        <Text style={{ flex: 1, fontSize: 20 }}>Partager avec mon docteur{'\n'}</Text>
        <Button 
          color="#62BE87"
          style={{width: deviceWidth / 2, borderRadius: 15, flex: 1}}
          onPress={() => navigate('MyDoctorChoiceStackNavigator')}
          title="Choisir le docteur"
        />
        <Text style={{ flex: 3}}></Text>
        <Text style={{ flex: 1, fontSize: 20 }}>Télécharger sous format PDF{'\n'}</Text>
        <Button 
          color="#62BE87"
          style={{width: deviceWidth / 2, borderRadius: 15,flex: 1}}
          onPress={() => {}} 
          title="Télécharger"
        />
        <Text style={{ flex: 5}}></Text>
      </View>
    )
  }
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

})