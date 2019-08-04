import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Diabetes from './Diabetes';
import NotImplemented from './NotImplemented';
import { DiseasePropTypes } from '../../../MyPropTypes';

const diseases = [
  {name: 'diabetes', fullName: 'Diabète', component: Diabetes},
  {default: true, component: NotImplemented}
];

class DiseaseCard extends PureComponent {
  
  render() {
    const {
      disease,
    } = this.props;
    const diseasesData = diseases.find(e => e.default || e.name === disease.name);
    const Component = diseasesData.component;
    return (
      <Card style={{marginTop: 16}}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{diseasesData.fullName || disease.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Component data={disease.data}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Card>
    );
  }
}

DiseaseCard.propTypes = {
  disease: DiseasePropTypes.isRequired
};

export default DiseaseCard;