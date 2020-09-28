import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CenteredView from '../Components/CenteredView';
import Register from '../Components/Register';
import LoginCardController from '../Controller/LoginCardController';
import loginBackground from '../assets/Img/backgroundLogin.jpg';

class LoginController extends PureComponent {
  state = {
    register: false
  };
  openRegister = () => this.setState({register: true});
  closeRegister = () => this.setState({register: false});
  render() {
    const {
      setToken,
    } = this.props;
    return (<CenteredView image={loginBackground}>{this.state.register ?
      <Register closeRegister={this.closeRegister}/> : 
      <LoginCardController setToken={setToken} openRegister={this.openRegister} />
    }</CenteredView>);
  }
}

LoginController.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginController;