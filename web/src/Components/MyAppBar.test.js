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
  ReactDOM.render(<MyAppBar
    classes={classes}
    openProfile={() => 0}
    openMenu={() => 0}
    closeMenu={() => 0}
    openSettings={() => 0}
    title='Hello'
    disconnect={() => 0}
    anchorEl={null}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
