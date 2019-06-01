import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

class LineChart extends PureComponent {
  setRef = ref => this.ref = ref;

  componentDidMount() {
    let ctx = this.ref.getContext('2d');
    const {
      data,
      options
    } = this.props;
    new Chart(ctx, {
      type: 'line',
      data,
      options
    });
  }

  render() {
    const {
      width,
      height,
    } = this.props;
    return (
      <canvas ref={this.setRef} width={width} height={height}></canvas>
    );
  }
}

LineChart.defaultProps = {
  width: 400,
  height: 400,
};

const PropTypesColor = {};

LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.shape({
    label: PropTypes.string,
    xAxisID: PropTypes.string,
    yAxisID: PropTypes.string,
    backgroundColor: PropTypesColor,
    borderColor: PropTypesColor,
    borderWidth: PropTypes.number,
    borderDash: PropTypes.arrayOf(PropTypes.number),
    borderDashOffset: PropTypes.number,
    borderCapStyle: PropTypes.string,
    borderJoinStyle: PropTypes.string,
    cubicInterpolationMode: PropTypes.string,
    fill: PropTypes.oneOf([PropTypes.bool, PropTypes.string]),
    lineTension: PropTypes.number,
    pointBackgroundColor: PropTypes.oneOf([PropTypesColor, PropTypes.arrayOf(PropTypesColor)]),
    pointBorderColor: PropTypes.oneOf([PropTypesColor, PropTypes.arrayOf(PropTypesColor)]),
    pointBorderWidth: PropTypes.oneOf([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    pointRadius: PropTypes.oneOf([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  }),
  options: PropTypes.any
};

export default LineChart;