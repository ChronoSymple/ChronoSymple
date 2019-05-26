import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';


const Notes = ({
  data
}) => (
  <div>
    {data && data.map((e, i) => <Note key={i} data={e} ></Note>)}
  </div>
);

Notes.propTypes = {
  data: PropTypes.array
};

export default Notes;
