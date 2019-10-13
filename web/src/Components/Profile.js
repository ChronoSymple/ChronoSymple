import React from 'react';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import diseases from '../diseases';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: JSON.parse(localStorage.getItem('diseases') || '{}')
    };
  }
  chipClick = disease => {
    this.setState(state => {
      const selected = {...state.selected, [disease]: !state.selected[disease]};
      localStorage.setItem('diseases', JSON.stringify(selected));
      return ({selected});
    });
  }
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
        {
          Object.keys(diseases).map(key => <Chip
            key={key}
            color={this.state.selected[key] ? 'primary' : 'default'}
            label={diseases[key].fullName}
            onClick={() => this.chipClick(key)}/>)
        }
      </CardContent>
    </Card>);
  }
}

export default Profile;