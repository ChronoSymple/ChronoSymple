
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
          this.setState({ sameNewPassword: true })
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
      <View style={{flex: 1, justifyContent: "space-around"}}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text> PasswordProfile Page </Text>
          <View style={{ flex: 1, justifyContent: "center", alignContent: 'center'}}>
            <Text> Ancient mot de passe </Text>
            <TextInput
              placeholder="ancient mot de passe"
              onChangeText={(text) => this.setOldPassword(text)}
              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
            />
            <Text> Nouveau mot de passe </Text>
            <TextInput
              placeholder="nouveau mot de passe"
              onChangeText={(text) => this.setNewPassword(text)}
              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
            />
            <Text> Confirmer nouveau mot de passe </Text>
            <TextInput
              placeholder="confirmation"
              onChangeText={(text) => this.setConfirmPassword(text)}
              style={styles.textField, { width: windowSize.x / 1.5, borderWidth: 1 }}
            />
          </View>
        </View>
        { this.state.sameNewPassword ?
          null
          :
          <Text style={{color: colors.errorColor}}> /!\ Invalid password or new password doesn't match ! /!\ </Text>
        }
        <View style={{flex: 1, flexDirection: 'row',  justifyContent: 'space-around'}}>
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
