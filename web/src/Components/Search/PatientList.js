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
import Alert from '../Alert/Alert'
import i18n from 'i18next' 

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
        <TableRow>
          <TableCell>{i18n.t("lastname")}</TableCell>
          <TableCell>{i18n.t("firstname")}</TableCell>
          <TableCell>{i18n.t("birthDate")}</TableCell>
          <TableCell>{i18n.t("patState")}</TableCell>
        {/* <Alert/> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(e =>
          <TableRow
            key={e.id}
            className={classes.selectable}
            onClick={() => setPatient(e.id)}
          >
            <TableCell>{e.lastname}</TableCell>
            <TableCell>{e.firstname}</TableCell>
            <TableCell>{e.birthdate}</TableCell>
            <TableCell><Alert/></TableCell>
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
