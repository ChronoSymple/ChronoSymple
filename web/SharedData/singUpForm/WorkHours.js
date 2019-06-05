import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

const styles = {
    bloc: {
        margin: 2,
        maxWidth: 600,
        width: '50%',
        justifyContent: 'right',
    }
};

class WorkHours extends Component {

    state = {monday: '00:00 - 00:00',
    tuesday: '00:00 - 00:00',
    wednesday: '00:00 - 00:00',
    thursday: '00:00 - 00:00',
    friday: '00:00 - 00:00',
    saturday: '00:00 - 00:00',
    sunday: '00:00 - 00:00'}

    setMonday = e => {
        const monday = e.target.value;
        this.setState({monday});
    }
    setTuesday = e => {
        const tuesday = e.target.value;
        this.setState({tuesday});
    }
    setWednesday = e => {
        const wednesday = e.target.value;
        this.setState({wednesday});
    }
    setThursday = e => {
        const thursday = e.target.value;
        this.setState({thursday});
    }
    setFriday = e => {
        const friday = e.target.value;
        this.setState({friday});
    }
    setSaturday = e => {
        const saturday = e.target.value;
        this.setState({saturday});
    }
    setSunday = e => {
        const sunday = e.target.value;
        this.setState({sunday});
    }
    render () {
        const {
            classes,
        } = this.props;
        return (
            <div >
                <Typography variant="h6">Horaires</Typography>
                <TextField className={classes.bloc}
                label="Lundi"
                margin="normal"
                value={this.state.monday}
                onChange={this.setMonday}
                />
                <TextField className={classes.bloc}
                label="Mardi"
                margin="normal"
                value={this.state.tuesday}
                onChange={this.setTuesday}
                />
                <TextField className={classes.bloc}
                label="Mercredi"
                margin="normal"
                value={this.state.wednesday}
                onChange={this.setWednesday}
                />
                <TextField className={classes.bloc}
                label="Jeudi"
                margin="normal"
                value={this.state.thursday}
                onChange={this.setThursday}
                />
                <TextField className={classes.bloc}
                label="Vendredi"
                margin="normal"
                value={this.state.friday}
                onChange={this.setFriday}
                />
                <TextField className={classes.bloc}
                label="Samedi"
                margin="normal"
                value={this.state.saturday}
                onChange={this.setSaturday}
                />
                <TextField className={classes.bloc}
                label="Dimanche"
                margin="normal"
                value={this.state.sunday}
                onChange={this.setSunday}
                />

            </div>
        )
    }
}

export default withStyles(styles)(WorkHours);
