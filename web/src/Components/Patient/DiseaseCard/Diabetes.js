import React, { PureComponent } from 'react';
import Chart, { helpers } from 'chart.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Api from '../../../Api';
//import { createPalette } from '@material-ui/core';
//import * as ChartAnnotation from 'chartjs-plugin-annotation';

class Diabetes extends PureComponent {
  setRef = ref => this.ref = ref;
  setDivRef = ref => this.divref = ref;

  state = {
    min: -1,
    max: -1,
  };

  dateToDateOfTheDay = date => {
    const divider = 1000 * 60 * 60 * 24;
    const time = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
    const remaining = time % divider;
    return new Date(time + ((remaining === 0) ? 0 : divider - remaining));
  }
  nextDay = date => new Date(date.getTime() + 1000 * 60 * 60 * 24);
  convertToGraphData = data => {
    const meals = {
      'Petit déjeuner': 'rgb(255, 99, 132)',
      'Repas': 'rgb(54, 162, 235)',
      'Gouter': 'rgb(255, 205, 86)',
      'Diner': 'rgb(75, 192, 192)',
    };
    data = data.map(e => e.note).map(({date, ...e}) => ({...e, date: new Date(date)}));
    data = data.filter(e => e !== undefined && e.date !== undefined && e.data !== undefined && e.data.bloodGlucose !== undefined);
    if (data.length === 0) {
      return;
    }
    const biggestDate = data.map(e => e.date).reduce((acc, e) => acc === null ? e : ((acc > e) ? acc : e), null);
    const smallestDate = data.map(e => e.date).reduce((acc, e) => acc === null ? e : ((acc < e) ? acc : e), null);
    data = data.reduce((acc, e) => {
      const wichLunch = e.data.wichLunch;
      return ({ ...acc, [wichLunch]: [...acc[wichLunch], e] });
    }, Object.keys(meals).reduce((acc, key) => ({ ...acc, [key]: [] }), {}));
    Object.keys(data).map(key => data[key].sort((a, b) => a.date.getTime() - b.date.getTime()));

    const tmp = Object.keys(data).reduce((acc, key) => {
      const value = data[key];
      let newValue = value.reduce(({lastDate, arr}, e) => {
        while (this.dateToDateOfTheDay(e.date) > this.dateToDateOfTheDay(lastDate)) {
          arr = [...arr, null];
          lastDate = this.nextDay(lastDate);
        }
        arr = [...arr, e];
        lastDate = this.nextDay(lastDate);
        return {lastDate, arr};
      }, { lastDate:smallestDate, arr:[]}).arr;
      let lastDate = (newValue.length === 0) ? smallestDate : this.nextDay(newValue[newValue.length - 1].date);
      while (this.dateToDateOfTheDay(lastDate) <= this.dateToDateOfTheDay(biggestDate)) {
        newValue = [...newValue, null];
        lastDate = this.nextDay(lastDate);
      }
      newValue = newValue.map(e => e === null ? NaN : e.data.bloodGlucose);
      return {...acc, [key]: newValue};
    }, {});
    data = Object.keys(meals).reduce((acc, key) => {
      const value = tmp[key];
      const newElem = {
        label: key,
        backgroundColor: helpers.color(meals[key]).alpha(0.5).rgbString(),
        borderColor: meals[key],
        borderWidth: 1,
        data: value
      };
      return ([...acc, newElem]);
    }, []);
    let labels = [];
    let lastDate = smallestDate;
    while (this.dateToDateOfTheDay(lastDate) <= this.dateToDateOfTheDay(biggestDate)) {
      labels = [...labels, `${lastDate.getDate()}/${lastDate.getMonth()}/${lastDate.getFullYear()}`];
      lastDate = this.nextDay(lastDate);
    }
    const graphData = {
      datasets: data,
      labels
    };
    return {
      type: 'bar',
      data: graphData,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'top',
        }, 
        title: {
          display: true,
          text: 'Glycémie'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };
  }

  onResize = () => {
    //this.ctx.canvas.height = window.innerHeight * 0.7;
    this.ctx.canvas.width = this.divref.clientWidth;
    this.chart.resize();
  }
  
  getLimits = async() => {
    try {
      const req = await Api.getLimits(localStorage.getItem('myToken'), this.props.unitID);
      const insuline = req['Insuline'];
      if (insuline !== null) {
        let {'min_limit': min, 'max_limit': max} = insuline;
        if (min === undefined) {
          min = -1;
        }
        if (max === undefined) {
          max = -1;
        }
        this.setState({min, max});
      }
    } catch (e) {
      // Because of 404
    }
  }

  setLimits = async() => {
    await Api.setLimits(localStorage.getItem('myToken'), this.props.unitID, {
      'fields_limits': {
        'Insuline': {'min_limit': this.state.min, 'max_limit': this.state.max}
      }
    });
  }

  componentDidMount() {
    this.ctx = this.ref.getContext('2d');
    //this.ctx.canvas.height = window.innerHeight * 0.7;
    this.ctx.canvas.width = this.divref.clientWidth;
    this.chart = new Chart(this.ctx, this.convertToGraphData(this.props.data));
    this.getLimits(this.props.unitID);
    
    //window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount() {
    //window.removeEventListener('resize', this.onResize);
    if (this.chart) {
      this.chart.destroy();
    }
  }

  setMin = e => {
    const min = e.target.value;
    this.setState({min});
  }

  setMax = e => {
    const max = e.target.value;
    this.setState({max});
  }

  changeStep = (e, v) => this.setState({step: v}, this.generateProbsGraph);

  render() {
    return (
      <div style={{width: '100%'}}>
        <div ref={this.setDivRef} style={{height: 500, width: '100%', overflow: 'none'}}>
          <canvas ref={this.setRef}/>
        </div>
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
          <p style={{color: '#333333', marginTop:10}}>*Negative value are disabled</p>
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

/*
{
      type: 'line',
      plugins: [ChartAnnotation],
      data: {
        labels: table.map(e => e.date.toLocaleString()),
        datasets: [{
          label: 'Glycemie',
          data: table.map(e => ({
            x: e.date.getTime(),
            y: e.data,
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Dates'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Taux de glycémie (g/L)'
            }
          }]
        },
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '60',
            borderColor: 'tomato',
            borderWidth: 1,
            label: {
              backgroundColor: 'red',
              content: 'Hypoglycémie',
              enabled: table.some(e => e.data < 60),
              position : 'left'
            }
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '110',
            borderColor: 'tomato',
            borderWidth: 1,
            label: {
              backgroundColor: 'red',
              content: 'Hyperglycémie à jeun',
              enabled: true,
              position : 'left'
            }
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '140',
            borderColor: 'tomato',
            borderWidth: 1,
            label: {
              backgroundColor: 'red',
              content: 'Hyperglycémie après repas',
              enabled: table.some(e => e.data > 140),
              position : 'left'
            }
          }],
          drawTime: 'afterDraw'
        }
      }
    }
*/