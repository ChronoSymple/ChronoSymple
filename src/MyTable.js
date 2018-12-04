import React, { PureComponent } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';

export default class MyTable extends PureComponent {
  render() {
    const {
      cols,
      data
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
            <TableRow key={i}>
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
