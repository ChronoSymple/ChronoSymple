import React, { PureComponent } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import diseases from '../../diseases';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import CloseIcon from '@material-ui/icons/Close';

class AdminDiseaseCard extends PureComponent {

  render() {
    const {
      diseaseName,
      defaultOpen,
    } = this.props;
    const diseasesData = diseases[diseaseName];
    return (
      <Card style={{ marginTop: 16 }}>
        <ExpansionPanel defaultExpanded={defaultOpen}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <IconButton><CloseIcon /></IconButton>
            <Typography variant="h6" style={{ lineHeight: '48px' }}>{diseasesData.fullName || diseaseName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell padding='none' style={{ width: '100%' }}>Doctor</TableCell>
                  <TableCell>Retirer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Mr HENRY Martin</TableCell>
                  <TableCell padding='none' align='center'>
                    <IconButton>
                      <LinkOffIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Card>
    );
  }
}

AdminDiseaseCard.propTypes = {
  diseaseName: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  defaultOpen: PropTypes.bool,
};

export default AdminDiseaseCard;