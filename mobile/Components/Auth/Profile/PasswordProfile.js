
import React from 'react'
import { View, Button, Text, TextInput } from 'react-native'
import { styles, colors, windowSize } from '../../StyleSheet'
import { connect } from 'react-redux'
import { getUserToken } from '../../../Redux/Action/action';
import { checkPatientPassword, updatePatientPassword } from '../../../API/APIConnection';

class PasswordProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      sameNewPassword: true
    }
  }

  newPasswordSubmitted = () => {
    console.log("newPasswordSubmitted")
    if (this.state.newPassword == this.state.confirmPassword && this.state.newPassword != "" && this.state.confirmPassword != "") {
      console.log("OK same new password")
      checkPatientPassword(this.props.token.token, this.state.oldPassword).then(async data => {
        console.log("checkPatientPassword - PasswordProfile - data")
        console.log(data)
        updatePatientPassword(this.props.token.token, this.state.oldPassword, this.state.newPassword).then(async data => {
          console.log("updatePatientPassword - PasswordProfile - data")
          console.log(data)
          if (data.status == 200) {
            this.setState({ sameNewPassword: true })
            this.props.navigation.navigate('Profile');
          } else {
            this.setState({ sameNewPassword: false })
          }
        })
      })
    } else {
      this.setState({ sameNewPassword: false })
    }
  }

  setOldPassword = (text) => {
    this.setState({ oldPassword: text })
    console.log(this.state.oldPassword)
  }

  setNewPassword = (text) => {
    this.setState({ newPassword: text })
    console.log(this.state.newPassword)
  }

  setConfirmPassword = (text) => {
    this.setState({ confirmPassword: text })
    console.log(this.state.confirmPassword)
  }

  render() {
    let { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 15, marginRight: 25}}>
          <TextInput
            placeholder="ancient mot de passe"
            onChangeText={(text) => this.setOldPassword(text)}
            style={styles.textField, { borderBottomWidth: 1 }}
          />
          <Text style={{fontSize: 13, color: colors.secondary}}> Mot De Passe </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 15, marginRight: 25}}>
          <TextInput
            placeholder="nouveau mot de passe"
            onChangeText={(text) => this.setNewPassword(text)}
            style={styles.textField, { borderBottomWidth: 1 }}
          />
          <Text style={{fontSize: 13, color: colors.secondary}}> Nouveau Mot De Passe </Text>
        </View>
        <View style={{flex: 1, justifyContent: "center", marginLeft: 15, marginRight: 25}}>
          <TextInput
            placeholder="confirmation"
            onChangeText={(text) => this.setConfirmPassword(text)}
            style={styles.textField, { borderBottomWidth: 1 }}
          />
          <Text style={{fontSize: 13, color: colors.secondary}}> Confirmer votre nouveau Mot De Passe </Text>
        </View>
        { this.state.sameNewPassword ?
          null
          :
          <Text style={{color: colors.errorColor, marginLeft: 15, marginRight: 15}}> /!\ Mot de passe incorrect ou le nouveau mot de passe ne correspondent pas /!\ </Text>
        }
        <View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around', marginTop: 25}}>
          <View>
            <Button 
              color="#62BE87"
              style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
              onPress={() => navigate('Profile')}
              title="Retour"
            />
          </View>
          <View>
          <Button 
            color="#62BE87"
            style={{ height: 40, width: 50, borderWidth: 2, borderColor: '#000000'}}
            onPress={() => this.newPasswordSubmitted()}
            title="Confirmer"
          />
          </View>
        </View>
        <View style={{flex: 5}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordProfile)
