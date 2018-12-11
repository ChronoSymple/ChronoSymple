import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class DiseaseCard extends PureComponent {
  render() {
    const {
      disease,
      children,
    } = this.props;
    return (
      <Card style={{marginTop: 16}}>
        <CardContent>
          <Typography variant="h6">{disease}</Typography>
          {children}
        </CardContent>
      </Card>
    );
  }
}

DiseaseCard.propTypes = {
  disease: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default DiseaseCard;