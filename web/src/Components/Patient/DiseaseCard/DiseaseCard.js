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
import Api from '../../../Api';
import Request from '../../Request';
class DiseaseCard extends PureComponent {

  state = {
    loaded: false,
    error: ''
  }
  componentDidMount = () => this.init();

  init = async() => {
    try {
      const data = await Api.getNotesByDateInterval(this.props.token, this.props.unitId);
      this.setState({data, loaded: true});
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  render() {
    const {
      diseaseName,
      defaultOpen,
    } = this.props;
    const {
      data,
      loaded,
      error
    } = this.state;
    const diseasesData = diseases[diseaseName];
    const Component = (diseasesData !== undefined && diseasesData.component !== undefined) ? diseasesData.component : NotImplemented;
    return (
      <Card style={{marginTop: 16}}>
        <ExpansionPanel defaultExpanded={defaultOpen}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{diseasesData.fullName || diseaseName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Request loading={!loaded} error={error}>
              {(() => <Component data={data}/>)()}
            </Request>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Card>
    );
  }
}

DiseaseCard.propTypes = {
  diseaseName: PropTypes.string.isRequired,
  unitId: PropTypes.number.isRequired,
  defaultOpen: PropTypes.bool,
  token: PropTypes.string.isRequired
};

export default DiseaseCard;