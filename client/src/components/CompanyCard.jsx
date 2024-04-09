import React from 'react'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CompanyCard(props) {
  const { query } = props;

  if (query._id) {
    return (
      <Card>
        <CardHeader
          title={query.Name}
          subheader={query.Office}
        />
        <CardContent>
          <Typography variant="p" component="div">
            {query.Summary}
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