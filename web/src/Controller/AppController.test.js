import React from 'react';
import ReactDOM from 'react-dom';
import AppController from './AppController';
import 'jest-prop-type-error';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppController />, div);
  ReactDOM.unmountComponentAtNode(div);
});
