import React from 'react';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const diseases = [
  {name: 'diabetes', fullName: 'Diabète'},
  {name: 'cancer', fullName: 'Cancer'},
];

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
          diseases.map(disease => <Chip
            key={disease.name}
            color={this.state.selected[disease.name] ? 'primary' : 'default'}
            label={disease.fullName}
            onClick={() => this.chipClick(disease.name)}/>)
        }
      </CardContent>
    </Card>);
  }
}

export default Profile;