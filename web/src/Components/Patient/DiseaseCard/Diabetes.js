import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Api from '../../../Api';
import DiabeteGraph from './DiabeteGraph';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
class Diabetes extends PureComponent {
  state = {
    min: -1,
    max: -1,
    defMin: -1,
    defMax: -1,
  };


  onResize = () => {
    //this.ctx.canvas.height = window.innerHeight * 0.7;
    this.ctx.canvas.width = this.divref.clientWidth;
    this.chart.resize();
  }
  
  getLimits = async() => {
    try {
      const req = await Api.getLimits(localStorage.getItem('myToken'), this.props.unitID);
      const insuline = req['bloodGlucose'];
      if (insuline !== null) {
        let {'min_limit': min, 'max_limit': max} = insuline;
        if (min === undefined) {
          min = -1;
        }
        if (max === undefined) {
          max = -1;
        }
        this.setState({min, max, defMin: min, defMax: max});
      }
    } catch (e) {
      // Because of 404
    }
  }

  setLimits = async() => {
    const min = Number(this.state.min);
    const max = Number(this.state.max);
    await Api.setLimits(localStorage.getItem('myToken'), this.props.unitID, {
      'fields_limits': {
        'bloodGlucose': {'min_limit': min, 'max_limit': max}
      }
    });
    this.setState({defMin: min, defMax: max});
  }

  setMin = e => {
    const min = e.target.value;
    this.setState({min});
  }

  setMax = e => {
    const max = e.target.value;
    this.setState({max});
  }
  componentDidMount() {
    this.getLimits(this.props.unitID);
  }
  render() {
    return (
      <div style={{width: '100%'}}>
        <DiabeteGraph min={this.state.defMin} max={this.state.defMax} data={this.props.data}/>
        <div>
          <TextField
            label="Min Limit"
            type="number"
            InputLabelProps={{ shrink: true, }}
            variant="outlined"
            size="small"
            value={this.state.min}
            onChange={this.setMin}
          />
          <TextField
            label="Max Limit"
            type="number"
            InputLabelProps={{ shrink: true, }}
            variant="outlined"
            style={{marginLeft: 10}}
            onChange={this.setMax}
            value={this.state.max}
            size="small"
          />
          <Button
            style={{marginLeft: 10}}
            variant="contained"
            onClick={this.setLimits}
            color="primary">
              Apply
          </Button>
          <p style={{color: '#333333', marginTop:10}}>*Les valeurs négatives désactivent les limites</p>
          <div>
            <h3>Detaillé</h3>
            {this.props.data.map(e =>
              <ExpansionPanel key={e.note.id} style={e.note.anomali_status === 'anomali' ? ({backgroundColor: '#ffe5d0'}) : ({})}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography>{new Date(e.note.date).toLocaleString()}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    <b>Description: </b>{e.note.data.description || ''}<br/>
                    <b>Repas: </b>{e.note.data.wichLunch || 'N/A'}<br/>
                    <b>Glucose: </b>{e.note.data.bloodGlucose || 'N/A'}<br/>
                    <b>Correction: </b>{e.note.data.insulineCorr || 'N/A'}<br/>
                    <b>Insuline après repas: </b>{e.note.data.insulineFood || 'N/A'}<br/>
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Diabetes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    data: PropTypes.number
  })),
  unitID: PropTypes.number.isRequired,
};

export default Diabetes;
