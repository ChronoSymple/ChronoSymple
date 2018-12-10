import React, { PureComponent } from 'react'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { CardContent } from '@material-ui/core';

class Patient extends PureComponent {
  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h4">Mr.XXXX XXXX</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Née le XX/XX/XX
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default Patient;