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
    // http://serpapi.com/playground?engine=google_about_this_result&api_key=${process.env.SERP_API_KEY}google_domain=google.com&q=${query.Name}
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