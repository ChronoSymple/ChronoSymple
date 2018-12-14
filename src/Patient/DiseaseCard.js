import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chart from 'chart.js';

class DiseaseCard extends PureComponent {
  setRef = ref => this.ref = ref;

  componentDidMount() {
    let ctx = this.ref.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '20/10',
          '21/10',
          '22/10',
          '23/10',
          '24/10',
          '25/10',
          '26/10',
        ],
        datasets: [{
          label: 'Glycemie',
          data: [
            20,
            14,
            15,
            12,
            19,
            17,
            14,
          ]
        }],
      },
      options: {
      }
    });
  }

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
          <ExpansionPanelDetails>
            {children}
            <div><canvas ref={this.setRef} width="400" height="400"></canvas></div>
          </ExpansionPanelDetails>
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