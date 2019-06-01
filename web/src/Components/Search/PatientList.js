import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core';
import exact from 'prop-types-exact';

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
  setClient
}) => (
  <Card className={classes.patientCard}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nom</TableCell>
          <TableCell>Prénom</TableCell>
          <TableCell>Date de naissance</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(e =>
          <TableRow
            key={e.id}
            className={classes.selectable}
            onClick={() => setClient(e)}
          >
            <TableCell>{e.lastname}</TableCell>
            <TableCell>{e.firstname}</TableCell>
            <TableCell>{e.birthdate}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </Card>
);

PatientList.propTypes = exact({
  setClient: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    patientCard: PropTypes.string.isRequired,
    selectable: PropTypes.string.isRequired,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    lastname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }))
});

export default withStyles(styles)(PatientList);
