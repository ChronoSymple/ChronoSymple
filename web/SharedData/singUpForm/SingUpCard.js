import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Work from './WorkHours'
import './App.css';

class SingUpCard extends Component {
  state = {name: '', firstName: '', profession: '', workplace: '', workingHours: ''}
  setName = e => {
    const name = e.target.value;
    this.setState({name});
  }
  setFirstName = e => {
    const firstName = e.target.value;
    this.setState({firstName});
  }
  setProfession = e => {
    const profession = e.target.value;
    this.setState({profession});
  }
  setWorkplace = e => {
    const workplace = e.target.value;
    this.setState({workplace});
  }
  setWorkingHours = e => {
    const workingHours = e.target.value;
    this.setState({workingHours});
  }
  render() {
    const {
      name,
      firstName,
      profession,
      workplace,
    } = this.state;
    return (
      <div className="Form">
      <div className="FormContainer">
        <Card className="CardCont">
          <CardContent>
           <Typography variant="h5">Inscription</Typography>

            <TextField
            label="Nom"
            margin="normal"
            value={name}
            onChange={this.setName}
            fullWidth />

            <TextField
            label="Prénom"
            margin="normal"
            value={firstName}
            onChange={this.setFirstName}
            fullWidth />

            <TextField
            label="Profession"
            margin="normal"
            value={profession}
            onChange={this.setProfession}
            fullWidth />

            <TextField
            label="Lieu de travail"
            margin="normal"
            value={workplace}
            onChange={this.setWorkplace}
            fullWidth />

            <Work />

          </CardContent>
        </Card>
      </div>
    </div>
  );
  }
}

export default SingUpCard;
