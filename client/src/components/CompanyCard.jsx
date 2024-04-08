import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import React from 'react'

function CompanyCard(props) {
  const { query } = props;

  if (query._id) {
    return (
      <Card>
        
      </Card>
    )
  } else {
    return (
      <Card>


        
      </Card>
    )
  }
}

export default CompanyCard