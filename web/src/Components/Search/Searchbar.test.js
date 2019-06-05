import React from 'react';
import ReactDOM from 'react-dom';
import Searchbar from './Searchbar';
import 'jest-prop-type-error';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Searchbar
    search="a"
    setSearchValue={() => 0}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
