import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

class AdminDoctor extends PureComponent {
  render() {
    const {
      doctor
    } = this.props;
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h4">{`${doctor.civility}. ${doctor.lastname} ${doctor.firstname}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {`Née le ${doctor.birthdate}`}
            </Typography>
            <TextField defaultValue={doctor.email || ''} label='Email'/>
            <Button variant='contained' color='secondary' style={{margin:'5px 0'}}>Set New Email</Button>
            <br/>
            <Button variant='contained' color='primary' style={{margin:'5px 0'}}>Send reset password</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

AdminDoctor.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default AdminDoctor;