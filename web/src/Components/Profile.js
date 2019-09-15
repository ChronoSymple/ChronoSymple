import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
class Profile extends React.Component {
  render() {
    return (<Card>
      <CardContent>
        <Typography variant="h4">Profile</Typography>
        <Typography variant="h5">
          {'Mr. Test Doctor'}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {'Spécialités: Admin'}
        </Typography>
      </CardContent>
    </Card>);
  }
}

export default Profile;