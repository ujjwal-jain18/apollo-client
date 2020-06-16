import React from 'react';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {' © '}
      <Link color='inherit' href='https://successive.tech'>
        Successive Technology
      </Link>
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box mt={8}>
      <Copyright />
    </Box>
  );
}
