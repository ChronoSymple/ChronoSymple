import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoginCard from '../Components/Login';
import Api from '../Api';

class LoginController extends PureComponent {
  state = {password: '', email: ''}

  setPassword = e => {
    const password = e.target.value;
    this.setState({password});
  }
  setEmail = e => {
    const email = e.target.value;
    this.setState({email});
  }
  login = async e => {
    e.preventDefault();
    this.props.setToken(await Api.login(this.state.email, this.state.password));
  }

  render() {
    const {
      email,
      password
    } = this.state;
    return (<LoginCard
      email={email}
      password={password}
      setEmail={this.setEmail}
      setPassword={this.setPassword}
      login={this.login}
    />);
  }
}

LoginController.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginController;