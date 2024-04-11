import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CompanyCard(props) {
  const { query } = props;
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
        {query.Links && query.Links.length > 0 && (
          <div>
            <Typography variant="h6" component="div">
              Links:
            </Typography>
            {query.Links.map((link, index) => (
              <div key={index}>
                <a href={link} target="_blank" rel="noreferrer">{link}</a>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CompanyCard;
