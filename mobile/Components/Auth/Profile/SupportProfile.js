
import React from 'react'
import { View, Button, Text, TextInput, TouchableOpacity, Flatlist } from 'react-native'
import { styles, colors, windowSize } from '../../StyleSheet'
import { connect } from 'react-redux'
import { getUserToken } from '../../../Redux/Action/action';

class SupportProfile extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <View style={{flex:1}}>
          <View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>
            <TouchableOpacity style={{
              flex: 1,
              alignItems: 'center',
              flexDirection : 'row', 
              justifyContent: 'center', 
              width: "100%", 
              height: "100%",
              margin: 20, 
              }} onPress={() => navigate('FAQProfile')}>
                <Text style={{ fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}>FAQ</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>
            <TouchableOpacity style={{
              flex: 1,
              alignItems: 'center',
              flexDirection : 'row', 
              justifyContent: 'center', 
              width: "100%", 
              height: "100%",
              margin: 20, 
              }} onPress={() => navigate('ContactProfile')}>
                <Text style={{ fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}>Nous contacter</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent : 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.secondary, borderRadius: 15, backgroundColor : 'white', margin: 10}}>
            <TouchableOpacity style={{
              flex: 1,
              alignItems: 'center',
              flexDirection : 'row', 
              justifyContent: 'center', 
              width: "100%", 
              height: "100%",
              margin: 20, 
              }} onPress={() => navigate('AProposProfile')}>
                <Text style={{ fontSize: 18, color: colors.secondary, textTransform: 'capitalize' }}>A propos</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  getUserToken: () => dispatch(getUserToken()),
  getUserToken: () => dispatch(getUserToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(SupportProfile)
