/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropType from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@material-ui/core';
import { Link, Route } from 'react-router-dom';
import NotFound from '../Nomatch';
import { trainees } from './data/trainee';

const Styles = (theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(5),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    backgroundColor: '#545454',
    display: 'flex',
    alignItems: 'center',
  },
  Text: {
    color: 'white',
    marginLeft: theme.spacing(5),
  },

  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    color: 'black',
    marginLeft: theme.spacing(70),
  },
});

function TraineeDetail(props) {
  const { match } = props;
  const trainee = trainees.find(({ id }) => id === match.params.traineeId);
  const { classes } = props;
  if (trainee === undefined) {
    return <Route component={NotFound} />;
  }
  return (
    <>
      <Card className={classes.root}>
        <CardMedia className={classes.cover}>
          <div className={classes.Text}>Thumbnail</div>
        </CardMedia>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component='h5' variant='h5'>
              {trainee.name}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {trainee.createdAt}
            </Typography>
            <Typography component='h6' variant='h6'>
              {trainee.email}
            </Typography>
            &nbsp;
          </CardContent>
        </div>
      </Card>
      <Button
        color='inherit'
        className={classes.container}
        component={Link}
        to='/trainee'
      >
        Back
      </Button>
    </>
  );
}
TraineeDetail.propTypes = {
  match: PropType.object.isRequired,
  classes: PropType.objectOf(PropType.string).isRequired,
};
export default withStyles(Styles)(TraineeDetail);
