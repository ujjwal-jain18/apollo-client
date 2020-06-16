import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  spacing: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const handleLogout = () => {
  localStorage.removeItem('token');
};

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title}>Trainee Portal</Typography>
          <Button color='inherit' component={Link} to='/'>
            Trainee
          </Button>
          <Button color='inherit' component={Link} to='/textfield-demo'>
            TextFieldDemo
          </Button>
          <Button color='inherit' component={Link} to='/input-demo'>
            InputDemo
          </Button>
          <Button
            color='inherit'
            className={classes.spacing}
            component={Link}
            to='/children-demo'
          >
            ChildrenDemo
          </Button>
          <Button color='inherit' href='/login' onClick={() => handleLogout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
