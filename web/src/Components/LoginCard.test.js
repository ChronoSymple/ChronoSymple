import React from 'react';
import ReactDOM from 'react-dom';
import LoginCard from './LoginCard';
import 'jest-prop-type-error';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginCard
    email="test@test.com"
    password="password"
    setEmail={() => 0}
    setPassword={() => 0}
    login={() => 0}
    openRegister={() => 0}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
