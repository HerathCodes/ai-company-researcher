import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CompanyCard(props) {
  const { query } = props;

  if (query._id) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {query.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {query.Office}
          </Typography>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
              {query.Name}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default CompanyCard