import React, { PureComponent } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core';

const style = {
  "selectable" : {
    "&:hover": {
      background: "#00000011"
    }
  }
}

class MyTable extends PureComponent {
  render() {
    const {
      cols,
      data,
      classes
    } = this.props;
    return (
        <Table>
        <TableHead>
          <TableRow>
            {cols.map((col, id) =>
              <TableCell key={id}>
                {col.label}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((e, i) =>
            <TableRow key={i} className={classes.selectable}>
              {cols.map((col, id) =>
                <TableCell key={col.field}>{e[col.field]}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}

export default withStyles(style)(MyTable)