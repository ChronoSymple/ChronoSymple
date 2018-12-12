import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class DiseaseCard extends PureComponent {
  render() {
    const {
      disease,
      children,
    } = this.props;
    return (
      <Card style={{marginTop: 16}}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{disease}</Typography>
          </ExpansionPanelSummary>
          {children}
          <ExpansionPanelDetails></ExpansionPanelDetails>
        </ExpansionPanel>
      </Card>
    );
  }
}

DiseaseCard.propTypes = {
  disease: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default DiseaseCard;