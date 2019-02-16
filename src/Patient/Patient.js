import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import DiseaseCard from './DiseaseCard/DiseaseCard';


class Patient extends PureComponent {
  render() {
    const {
      client
    } = this.props;
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h4">{`${client.civility}. ${client.lastname} ${client.firstname}`}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {`Née le ${client.birthdate}`}
            </Typography>
          </CardContent>
        </Card>
        {client.diseases.map(e => <DiseaseCard key={e.name} disease={e}/>)}
      </div>
    );
  }
}

Patient.propTypes = {
  client: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    birthdate: PropTypes.string,
    civility: PropTypes.oneOf(['Mr', 'Mme']),
    diseases: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.any,
    })).isRequired
  })
};

export default Patient;