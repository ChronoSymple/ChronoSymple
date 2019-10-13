import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotImplemented from './NotImplemented';
import PropTypes from 'prop-types';
import diseases from '../../../diseases';

class DiseaseCard extends PureComponent {
  
  render() {
    const {
      diseaseName,
      data,
      defaultOpen,
    } = this.props;
    const diseasesData = diseases[diseaseName];
    const Component = (diseasesData !== undefined && diseasesData.component !== undefined) ? diseasesData.component : NotImplemented;
    return (
      <Card style={{marginTop: 16}}>
        <ExpansionPanel defaultExpanded={defaultOpen}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{diseasesData.fullName || diseaseName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Component data={data}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Card>
    );
  }
}

DiseaseCard.propTypes = {
  diseaseName: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  defaultOpen: PropTypes.bool,
};

export default DiseaseCard;