import React, { PureComponent } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
//import { createPalette } from '@material-ui/core';
//import * as ChartAnnotation from 'chartjs-plugin-annotation';

class Diabetes extends PureComponent {
  setRef = ref => this.ref = ref;

  convertToGraphData = data => {
    data = data.map(e => e.note);
    //WIP
    //const dateToValue = str => str.split('-').map(e => Number(e)).reduce((prev, cur) => prev * 1000 + cur, 0);
    //console.log(data);
    //const maxDate = data.reduce((prev, data) => Math.max(prev, dateToValue(data.data.date)), null);
    //const minDate = data.reduce((prev, data) => Math.min(prev, dateToValue(data.data.date)), null);
    
    const graphData = {
      data
    };
    return {
      type: 'bar',
      data: graphData,
      options: {
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

  componentDidMount() {
    this.ctx = this.ref.getContext('2d');
    new Chart(this.ctx, this.convertToGraphData(this.props.data));
  }

  changeStep = (e, v) => this.setState({step: v}, this.generateProbsGraph);

  render() {
    return (
      <canvas ref={this.setRef} width="400" height="500"/>
    );
  }
}

Diabetes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    data: PropTypes.number
  }))
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