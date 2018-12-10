import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core';

const styles = {
  selectable : {
    "&:hover": {
      backgroundColor: "#00000011"
    },
    transition: "background-color .3s"
  },
  patientCard: {
    marginTop: 16
  }
};

class PatientList extends PureComponent {
  setClient = (e) => this.props.setClient(e);

  render() {
    const {
      classes,
      data,
    } = this.props;
    return (
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
          {data.map((e, i) =>
            <TableRow
              key={e.id}
              className={classes.selectable}
              onClick={() => this.setClient(e)}
            >
                <TableCell>{e.lastname}</TableCell>
                <TableCell>{e.firstname}</TableCell>
                <TableCell>{e.birthdate}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </Card>
    )
  }
}

PatientList.propTypes = {
  setClient: PropTypes.func.isRequired,
};

export default withStyles(styles)(PatientList);
