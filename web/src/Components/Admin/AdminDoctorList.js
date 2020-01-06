import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core';
import { UserPropTypes } from '../../MyPropTypes';

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

class AdminDoctorList extends React.Component {
  state = { anchor: null }
  openOptions = (e, id) => {
    const target = e.target;
    this.setState({anchor: target, selected: id});
    e.stopPropagation();
    return false;
  }
  deleteDoctor = e => {
    e.stopPropagation();
    this.setState({anchor: null});
    this.props.deleteDoctor(this.state.selected);
    return false;
  }
  closeMenu = () => this.setState({anchor: null})
  render = () => (
    <Card className={this.props.classes.patientCard}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Date de naissance</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.data.map(e =>
            <TableRow
              key={e.id}
              className={this.props.classes.selectable}
              onClick={() => this.props.setDoctor(e)}
            >
              <TableCell>{e.lastname}</TableCell>
              <TableCell>{e.firstname}</TableCell>
              <TableCell>{e.birthdate}</TableCell>
              <TableCell padding="none" align="right" onClick={ev => this.openOptions(ev, e.id)}>
                <IconButton>
                  <MoreVertIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.anchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.anchor != null}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.deleteDoctor}>Delete</MenuItem>
        </Menu>
      </Table>
    </Card>
  );
}

AdminDoctorList.propTypes = {
  setDoctor: PropTypes.func.isRequired,
  deleteDoctor: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    patientCard: PropTypes.string.isRequired,
    selectable: PropTypes.string.isRequired,
  }),
  data: PropTypes.arrayOf(UserPropTypes.isRequired).isRequired
};

export default withStyles(styles)(AdminDoctorList);
