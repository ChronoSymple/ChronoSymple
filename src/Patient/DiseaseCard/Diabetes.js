import React, { PureComponent } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

class Diabetes extends PureComponent {
  setRef = ref => this.ref = ref;

  componentDidMount() {
    const table = this.props.data;
    let ctx = this.ref.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: table.map(e => e.date),
        datasets: [{
          label: 'Glycemie',
          data: table.map(e => e.data)
        }],
      },
      options: {
      }
    });
  }

  render() {
    return (
      <div><canvas ref={this.setRef} width="400" height="400"></canvas></div>
    );
  }
}

Diabetes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    data: PropTypes.number
  }))
};

export default Diabetes;