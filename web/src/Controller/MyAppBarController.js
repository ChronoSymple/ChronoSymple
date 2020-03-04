
import React from 'react';
import MyAppBar from '../Components/MyAppBar';
import PropTypes from 'prop-types';
import i18n from 'i18next';

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
  openSettings = () => {
    this.closeMenu();
    this.props.openSettings();
  }
  render() {
    const {
      title,
      closeProfile,
      closePatient,
      closeSettings,
      closeDoctor
    } = this.props;
    let back;
    if (title === 'Patient') {
      back = closePatient;
    }
    if (title === 'Doctor') {
      back = closeDoctor;
    }
    if (title === 'Profile') {
      back = closeProfile;
    }
    if (title === i18n.t("settings")) {
      back = closeSettings;
    }
    return <MyAppBar
      disconnect={this.disconnect}
      openProfile={this.openProfile}
      openMenu={this.openMenu}
      openSettings={this.openSettings}
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
  openSettings: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  closeProfile: PropTypes.func.isRequired,
  closeSettings: PropTypes.func.isRequired,
  closePatient: PropTypes.func.isRequired,
  closeDoctor: PropTypes.func.isRequired
};

export default MyAppBarController;