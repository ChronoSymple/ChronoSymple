import React from 'react';
import ReactDOM from 'react-dom';
import MyAppBar from './MyAppBar';
import 'jest-prop-type-error';

const classes = {
  menuButton: '',
  appBar: ''
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyAppBar classes={classes}
    handleDrawerToggle={() => 0}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
