import React from 'react';
import ReactDOM from 'react-dom';
import PatientList from './PatientList';
import 'jest-prop-type-error';

const data = [
  {id: 1, firstname: 'Carl', lastname: 'DE GENTILE', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: [{
    name: 'diabetes',
    data: [
      { date: '20/10', data: 20 },
      { date: '21/10', data: 14 },
      { date: '22/10', data: 15 },
      { date: '23/10', data: 12 },
      { date: '24/10', data: 19 },
      { date: '25/10', data: 17 },
      { date: '26/10', data: 14 },
    ]
  }]},
  {id: 2, firstname: 'Marie-Aimée', lastname: 'FOURTANE', birthdate: 'XX/XX/XXXX', civility: 'Mme', diseases: []},
  {id: 3, firstname: 'Alexandre', lastname: 'CAILA', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: []},
  {id: 4, firstname: 'Victor', lastname: 'ZHU', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: []},
  {id: 5, firstname: 'Robin', lastname: 'MILAS', birthdate: 'XX/XX/XXXX', civility: 'Mr', diseases: [{
    name: 'Test',
    data: 2
  }]},
  {id: 6, firstname: 'Laura', lastname: 'PEREIRA', birthdate: 'XX/XX/XXXX', civility: 'Mme', diseases: []},
  {id: 7, firstname: 'Mohamed', lastname: 'BELKACEM', birthdate: '20/04/1997', civility:'Mr', diseases: [{
    name: 'cool',
    data: 3
  }]},
];


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PatientList
    setPatient={() => 0}
    data={data}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
