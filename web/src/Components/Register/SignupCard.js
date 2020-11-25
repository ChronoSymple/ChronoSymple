import React, { Component, PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Work from './WorkHours';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowBackOutlined from '@material-ui/icons/ArrowBackOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './App.css';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

class ScrollDialog extends PureComponent {
  state = {
    open: false
  };
  handleClose = () => this.setState(({open: false}));
  handleOpen = () => this.setState(({open: true}));
  render() {
    const {
      open
    } = this.state;
    return (
      <div>
        <Button onClick={this.handleOpen}>{'Condition général d\'utilisation'}</Button>
        <Dialog style={{ position: 'relative', bottom: '10vmin', zIndex: 200000}}
          open={open}
          onClose={this.handleClose}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">{'Termes d\'utilisation'}</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText>
              {'Chronosymple, une startup (projet étudiant) a mis en place pour les medecins un site web qui leur permettent de suivre un patient atteint de maladie chronique de manière fluide et chronologique.\n'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

class SignupCard extends Component {

  state = {
    name: '',
    firstName: '',
    profession: '',
    workplace: '',
    workingHours: '',
    isButtonDisabled: true,
    signedup: false
  };
  setName = e => {
    const name = e.target.value;
    this.setState({ name });
  }
  setFirstName = e => {
    const firstName = e.target.value;
    this.setState({ firstName });
  }
  setProfession = e => {
    const profession = e.target.value;
    this.setState({ profession });
  }
  setWorkplace = e => {
    const workplace = e.target.value;
    this.setState({ workplace });
  }
  setWorkingHours = e => {
    const workingHours = e.target.value;
    this.setState({ workingHours });
  }
  signedup = () => {
    this.setState({signedup: true});
  }

  render() {
    const {
      name,
      firstName,
      profession,
      workplace,
    } = this.state;
    const {
      closeRegister
    } = this.props;
    if (this.state.signedup) {
      return (
        <div className="Form">
          <div className="FormContainer">
            <Card className="CardCont">
              <CardContent>
                <div><b>Votre inscription à été prise en compte</b></div>
              </CardContent>
            </Card>
          </div>
        </div>);
    }
    return (
      <div className="Form">
        <div className="FormContainer">
          <Card className="CardCont">
            <CardContent>
              <div style={{textAlign: 'left'}}>
                <IconButton onClick={closeRegister}>
                  <ArrowBackOutlined />
                </IconButton>
              </div>
              <Typography variant="h5">Inscription</Typography>
              <TextField className="txtform"
                label="Nom"
                margin="normal"
                value={name}
                onChange={this.setName}
                fullWidth />

              <TextField className="txtform"
                label="Prénom"
                margin="normal"
                value={firstName}
                onChange={this.setFirstName}
                fullWidth />

              <TextField className="txtform"
                label="Profession"
                margin="normal"
                value={profession}
                onChange={this.setProfession}
                fullWidth />

              <TextField className="txtform"
                label="Lieu de travail"
                margin="normal"
                value={workplace}
                onChange={this.setWorkplace}
                fullWidth />
              <br /><br /><br /><br />
              <Work />
              <br /><br />
              <FormControlLabel
                value="top"
                control={<Checkbox color="primary" />}
                label="Accepter les"
                onChange={() => {
                  if (this.state.isButtonDisabled === true)
                    this.setState({ isButtonDisabled: false });
                  else
                    this.setState({ isButtonDisabled: true });
                }}
              />
              <ScrollDialog />
              <br />
              <Button className="SignUpBtu"
                variant="contained"
                color="primary"
                disabled={this.state.isButtonDisabled}
                onClick={this.signedup}>
                {'S\'inscrire'}
              </Button>
              <br />
              <br />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

SignupCard.propTypes = {
  closeRegister: PropTypes.func.isRequired
};

export default SignupCard;
