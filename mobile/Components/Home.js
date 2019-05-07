// Components/Home.js

import React from 'react'
import { View, Text, Button} from 'react-native'

class Home extends React.Component {
  render() {
        let { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ flex: 1 }} >JE SUIS LA HOME</Text>
        <Button 
		style={{ flex: 1 }} 
		onPress={() => navigate('ModulePlace')} 
		title="CA FAIT ALLEZ SUR LE MODULE PLACE"
	/>
      </View>
    )
  }
}

export default Home;