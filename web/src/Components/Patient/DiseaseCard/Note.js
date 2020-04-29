import React from 'react';
import PropTypes from 'prop-types';

const Note = ({
  data
}) => (
  <div>
    <p>Glicemie: {data.glycemie}</p>
    <p>Glucide: {data.glucide}</p>
    <p>Insuline av.repas: {data.insulineavrepas}</p>
    <p>Insuline ap.repas: {data.Insulineaprepas}</p>
    <p>Insuline a jeun: {data.insulineajeun}</p>
    <p>date: {data.date}</p>
    <p>heure: {data.heure}</p>
  </div>
);

Note.propTypes = {
  data: PropTypes.shape({
    glycemie: PropTypes.string,
    glucide: PropTypes.string,
    insulineavrepas: PropTypes.string,
    Insulineaprepas: PropTypes.string,
    insulineajeun: PropTypes.string,
    date: PropTypes.string,
    heure: PropTypes.string,
  })
};

export default Note;