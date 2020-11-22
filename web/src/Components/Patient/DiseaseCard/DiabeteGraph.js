import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Chart, { helpers } from 'chart.js';
import ChartAnnotation from 'chartjs-plugin-annotation';

class DiabeteGraph extends PureComponent {
  setRef = ref => {
    this.ref = ref;
    this.ctx = (this.ref == null) ? null : this.ref.getContext('2d');
  }
  setDivRef = ref => this.divref = ref;
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
      'Goûter': 'rgb(255, 205, 86)',
      'Dîner': 'rgb(75, 192, 192)',
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
      if (Object.keys(meals).includes(wichLunch) === false) {
        return acc;
      }
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
      labels,
    };
    const res = {
      type: 'bar',
      plugins: [ChartAnnotation],
      data: graphData,
      options: {
        annotation: {
          annotations: [],
          drawTime: 'afterDraw'
        },
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
      },
    };
    if (this.props.min >= 0) {
      const obj = {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: this.props.min,
        borderColor: 'tomato',
        borderWidth: 1,
        label: {
          backgroundColor: 'red',
          content: 'Hypoglycémie',
          position: 'left',
          enabled: true
        }
      };
      res.options.annotation.annotations = [...res.options.annotation.annotations, obj];
    }
    if (this.props.max >= 0) {
      const obj = {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: this.props.max,
        borderColor: 'tomato',
        borderWidth: 1,
        label: {
          backgroundColor: 'red',
          content: 'Hyperglycémie',
          position: 'left',
          enabled: true
        }
      };
      res.options.annotation.annotations = [...res.options.annotation.annotations, obj];
    }
    return res;
  }
  componentDidMount() {
    this.ctx = this.ref.getContext('2d');
    this.ctx.canvas.height = this.divref.clientHeight;
    this.ctx.canvas.width = this.divref.clientWidth;
    const config = this.convertToGraphData(this.props.data);
    this.chart = new Chart(this.ctx, config);
    
    //window.addEventListener('resize', this.onResize);
  }
  componentDidUpdate() {
    if (this.chart) {
      this.chart.destroy();
      this.ctx = this.ref.getContext('2d');
      if (this.ctx) {
        this.ctx.canvas.height = this.divref.clientHeight;
        this.ctx.canvas.width = this.divref.clientWidth;
        const config = this.convertToGraphData(this.props.data);
        this.chart = new Chart(this.ctx, config);
      }
    }
  }
  componentWillUnmount() {
    //window.removeEventListener('resize', this.onResize);
    if (this.chart) {
      this.chart.destroy();
    }
  }
  render = () =>
    <div ref={this.setDivRef} style={{height: 500, width: '100%', overflow: 'none'}}>
      <canvas ref={this.setRef}/>
    </div>
}

DiabeteGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    data: PropTypes.number
  })),
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default DiabeteGraph;