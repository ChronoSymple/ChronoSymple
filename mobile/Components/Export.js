
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button, Dimensions } from 'react-native'

export default class Export extends React.Component {

  render() {
    let { navigate } = this.props.navigation;
    let deviceWidth = Dimensions.get('window').width

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>partager avec mon docteur{'\n'}</Text>
        
        <Button 
          color="#62BE87"
          style={{width: deviceWidth / 2, borderRadius: 15}}
          onPress={() => navigate('DoctorChoiceStackNavigator')}
          title="Choisir le docteur"
        />
        <Text>{'\n\n'}</Text>

        <Text style={{ fontSize: 20 }}>Télécharger sous format PDF{'\n'}</Text>
        <Button 
          color="#62BE87"
          style={{width: deviceWidth / 2, borderRadius: 15}}
          onPress={() => {}} 
          title="Télécharger"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

})