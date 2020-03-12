import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoginCard from '../Components/LoginCard';
import Api from '../Api';

class LoginCardController extends PureComponent {
  state = {password: '', email: '', error: ''}

  setPassword = e => {
    const password = e.target.value;
    this.setState({password, error: ''});
  }
  setEmail = e => {
    const email = e.target.value;
    this.setState({email, error : ''});
  }
  login = async e => {
    e.preventDefault();
    try {
      const token = await Api.login(this.state.email, this.state.password);
      this.props.setToken(token);
    } catch (e) {
      const error = e.toString();
      this.setState({error});
    }
  }

  render() {
    const {
      email,
      password,
      error
    } = this.state;
    const {
      openRegister
    } = this.props;
    return (<LoginCard
      email={email}
      password={password}
      error={error}
      setEmail={this.setEmail}
      setPassword={this.setPassword}
      login={this.login}
      openRegister={openRegister}
    />);
  }
}

LoginCardController.propTypes = {
  setToken: PropTypes.func.isRequired,
  openRegister: PropTypes.func.isRequired,
};

export default LoginCardController;