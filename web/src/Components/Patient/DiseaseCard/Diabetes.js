import React, { PureComponent } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import Notes from '../../../Controller/NotesController';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import Slider from '@material-ui/core/Slider';

const dateToProbs = (table, step = 1) => {
  const data = table.map(e => e.data);
  const min = Math.floor(Math.min(...data) / step);
  const max = Math.floor(Math.max(...data) / step);
  let obj = {};
  for (let i = min; i < max; i++) {
    obj[i] = 0;
  }
  const r = data.reduce((p, c) => ({
    ...p,
    [Math.floor(c / step)]: (p[Math.floor(c / step)] || 0) + 1
  }), obj);

  const labels = Object.keys(r).map(k => (k * step).toString());
  const points = Object.keys(r).map(k => ({
    x: k,
    y: r[k]
  }));
  return ({points, labels});
}

class Diabetes extends PureComponent {
  setRef = ref => this.ref = ref;
  setRef2 = ref => this.ref2 = ref;
  state = {step:1}
  componentDidMount() {
    const table = this.props.data;
    let ctx = this.ref.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      plugins: [ChartAnnotation],
      data: {
        labels: table.map(e => e.date.toLocaleString()),
        datasets: [{
          label: 'Glycemie',
          data: table.map(e => ({
            x: e.date.getTime(),
            y: e.data,
          }))
        }],
      },
      options: {
        responsive: true,
        legend: {
          display: false
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
    });
    this.generateProbsGraph();
  }
  generateProbsGraph = () => {
    const probs = dateToProbs(this.props.data, this.state.step);

    new Chart(this.ref2.getContext('2d'), {
      type: 'bar',
      plugins: [ChartAnnotation],
      data: {
        labels: probs.labels,
        datasets: [{
          label: 'Glycemie',
          data: probs.points
        }],
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Taux de glycémie (g/L)'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Probabilités'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        },
      }
    });
  }

  changeStep = (e, v) => {
    this.setState({step: v}, this.generateProbsGraph);
  }

  render() {
    return (
      <div>
        <canvas ref={this.setRef} width="400" height="500"></canvas>
        <Slider
          defaultValue={1}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={30}
          onChange={this.changeStep}
        />
        <canvas ref={this.setRef2} width="400" height="500"></canvas>
        <Notes/>
      </div>
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