import PropTypes from 'prop-types';

const PatientPropTypes = PropTypes.shape({
  id: PropTypes.number,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  birthdate: PropTypes.string.isRequired,
  civility: PropTypes.oneOf(['Mr', 'Mme']),
  diseases: PropTypes.object.isRequired
});

const UserPropTypes = PropTypes.shape({
  id: PropTypes.number,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  birthdate: PropTypes.string.isRequired,
  civility: PropTypes.oneOf(['Mr', 'Mme']),
});


export {
  PatientPropTypes,
  UserPropTypes
};

