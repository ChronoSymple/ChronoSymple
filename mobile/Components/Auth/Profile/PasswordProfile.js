
import React from 'react'
import { View, Button, Text, TextInput } from 'react-native'
import { styles, colors, windowSize } from '../../StyleSheet'
import { connect } from 'react-redux'
import { getUserToken } from '../../../Redux/Action/action';
import { checkPatientPassword, updatePatientPassword } from '../../../API/APIConnection';
import { showMessage } from "react-native-flash-message";


class PasswordProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  }

  newPasswordSubmitted = () => {
    if (this.state.newPassword == this.state.confirmPassword && this.state.newPassword != "" && this.state.confirmPassword != "") {
      checkPatientPassword(this.props.token.token, this.state.oldPassword).then(async data => {
        if (data.status == 200) {
          updatePatientPassword(this.props.token.token, this.state.oldPassword, this.state.newPassword).then(async data => {
            if (data.status == 200) {
              this.props.navigation.navigate('Profile');
              showMessage({
                message: "Le mot de passe a bien été changé",
                type: "success"
              });
            } else if (data.status == 403) {
              showMessage({
                message: "incorrect mot de passe",
                type: "danger"
              });
            } else if (data.status == 401) {
              showMessage({
                message: "Vous avez été deconnecte",
                type: "danger"
              });
              this.props.navigation.navigate("Logout")
            } else {
              showMessage({
                message: "Une erreur est survenue. Recommencez. Si le probleme persiste contactez nous.",
                type: "danger"
              });
            }
          })
        } else if (data.status == 403) {
          showMessage({
            message: "incorrect mot de passe",
            type: "danger"
          });
        } else if (data.status == 401) {
          showMessage({
            message: "Vous avez été deconnecte",
            type: "danger"
          });
          this.props.navigation.navigate("Logout")
        } else {
         showMessage({
            message: "Une erreur est survenue. Recommencez. Si le probleme persiste contactez nous.",
            type: "danger"
          }); 
        }
      })
    } else {
      showMessage({
        message: "Les deux nouveaux mot de passe saisies sont differents ou vides",
        type: "danger"
      });
    }
  }

  setOldPassword = (text) => {
    this.setState({ oldPassword: text })
  }

  setNewPassword = (text) => {
    this.setState({ newPassword: text })
  }

  setConfirmPassword = (text) => {
    this.setState({ confirmPassword: text })
  }

  render() {
    let { navigate } = this.props.navigation;

    let placeholder_oldPassword  = "ancient mot de passe";
    let placeholder_newPassword = "nouveau mot de passe";
    let placeholder_confirmPassword = "confirmation mot de passe";
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.5}}/>
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 15, marginRight: 25}}>
          <TextInput 
            secureTextEntry={true}
            label="ancient mot de passe"
            autoCorrect={false}
            style={{borderBottomWidth: 1, borderColor: 'grey'}}
            value={this.state.oldPassword}
            onChangeText={ (oldPassword) => this.setState({ oldPassword }) }
            placeholder={placeholder_oldPassword}
          />
          <Text style={{fontSize: 13, color: colors.secondary}}> Mot De Passe </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 15, marginRight: 25}}>
          <TextInput 
            secureTextEntry={true}
            label="nouveau mot de passe"
            autoCorrect={false}
            style={{borderBottomWidth: 1, borderColor: 'grey'}}
            value={this.state.newPassword}
            onChangeText={ (newPassword) => this.setState({ newPassword }) }
            placeholder={placeholder_newPassword}
          />
          <Text style={{fontSize: 13, color: colors.secondary}}> Nouveau Mot De Passe </Text>
        </View>
        <View style={{flex: 1, justifyContent: "center", marginLeft: 15, marginRight: 25}}>
          <TextInput 
            secureTextEntry={true}
            label="confirmation"
            autoCorrect={false}
            style={{borderBottomWidth: 1, borderColor: 'grey'}}
            value={this.state.confirmPassword}
            onChangeText={ (confirmPassword) => this.setState({ confirmPassword }) }
            placeholder={placeholder_confirmPassword}
          />
          <Text style={{fontSize: 13, color: colors.secondary}}> Confirmer votre nouveau Mot De Passe </Text>
        </View>
        <View style={{flex: 1}}/>
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
