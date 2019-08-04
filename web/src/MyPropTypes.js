import PropTypes from 'prop-types';

const DiseasePropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired
}); 

const PatientPropTypes = PropTypes.shape({
  id: PropTypes.number,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  birthdate: PropTypes.string.isRequired,
  civility: PropTypes.oneOf(['Mr', 'Mme']),
  diseases: PropTypes.arrayOf(DiseasePropTypes.isRequired).isRequired
});

export {
  PatientPropTypes,
  DiseasePropTypes
};

