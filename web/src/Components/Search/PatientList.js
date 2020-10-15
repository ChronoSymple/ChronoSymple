import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core';
import { PatientPropTypes } from '../../MyPropTypes';
import i18n from 'i18next';
//import Alert from '../Alert/Alert';
//import Fav from './Fav';
//import PatIcon from './PatIcon';


// const putFavInTab = (e) => {
//   ArrayFav = [...ArrayFav, e.id];
//   // var n = ArrayFav.includes(e.id);
//   console.log(ArrayFav.length);
//   console.log('weeeeey');
//   // STAR = star2;

// }

const styles = {
  selectable : {
    '&:hover': {
      backgroundColor: '#00000011'
    },
    transition: 'background-color .3s'
  },
  patientCard: {
    marginTop: 16
  }
};

const PatientList = ({
  classes,
  data,
  setPatient
}) => (
  <Card className={classes.patientCard}>
    <Table>
      <TableHead>
        <TableRow style={{backgroundColor: '#EFEFEF', borderBottomWidth: 1, borderBottomColor: '#000000', borderBottomStyle: 'block'}}>
          {
            /*
          <TableCell>{i18n.t('lastname')}</TableCell>
          <TableCell>{i18n.t('firstname')}</TableCell>
          <TableCell>Favorites</TableCell>
          <TableCell>Icon</TableCell>
          <TableCell>{i18n.t('patState')}</TableCell>
            */
          }
          <TableCell><b>{i18n.t('fullname')}</b></TableCell>
          <TableCell><b>{i18n.t('birthDate')}</b></TableCell>
          {/* <Alert/> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((e, i) =>
          <TableRow
            key={e.id}
            className={classes.selectable}
            onClick={() => setPatient(e.id)}
            style={{backgroundColor: (i % 2 !== 0) ? '#F7F7F7' : '#FFFFFF'}}
          >
            {
              /*
              <TableCell>{e.firstname}</TableCell>
              <TableCell>{e.birthdate}</TableCell>
              
              <TableCell><Fav favId={e.id}/></TableCell>
              <TableCell><PatIcon patBirth={e.birthdate}/></TableCell>
              <TableCell><Alert/></TableCell>
              */
            }
            <TableCell><b>{`${e.civility === 'homme' ? 'Mr' : 'Mme'} ${e.lastname.toLocaleUpperCase()} ${e.firstname}`}</b></TableCell>
            <TableCell><b>{e.birthdate}</b></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </Card>
);

PatientList.propTypes = {
  setPatient: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    patientCard: PropTypes.string.isRequired,
    selectable: PropTypes.string.isRequired,
  }),
  data: PropTypes.arrayOf(PatientPropTypes.isRequired).isRequired
};

export default withStyles(styles)(PatientList);
