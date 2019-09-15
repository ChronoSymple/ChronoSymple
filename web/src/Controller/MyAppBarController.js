
import React from 'react';
import MyAppBar from '../Components/MyAppBar';
import PropTypes from 'prop-types';

class MyAppBarController extends React.Component {
  state = {
    anchorEl: null
  };
  openMenu = event => {
    const anchorEl = event.currentTarget;
    this.setState({ anchorEl });
  }
  closeMenu = () => {
    if (this.state.anchorEl !== null) {
      this.setState({anchorEl: null});
    }
  }
  disconnect = () => {
    this.closeMenu();
    this.props.disconnect();
  }
  openProfile = () => {
    this.closeMenu();
    this.props.openProfile();
  }
  render() {
    const {
      title,
      closeProfile,
      closePatient
    } = this.props;
    let back;
    if (title === 'Patient') {
      back = closePatient;
    }
    if (title === 'Profile') {
      back = closeProfile;
    }
    return <MyAppBar
      disconnect={this.disconnect}
      openProfile={this.openProfile}
      openMenu={this.openMenu}
      closeMenu={this.closeMenu}
      anchorEl={this.state.anchorEl}
      title={title}
      back={back}
    />;
  }
}

MyAppBarController.propTypes = {
  disconnect: PropTypes.func.isRequired,
  openProfile: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  closeProfile: PropTypes.func.isRequired,
  closePatient: PropTypes.func.isRequired
};

export default MyAppBarController;