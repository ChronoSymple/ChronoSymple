import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';
import 'jest-prop-type-error';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBar
    search="a"
    setSearchValue={() => 0}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
