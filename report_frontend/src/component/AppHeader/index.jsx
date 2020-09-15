import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  return <AppBar position="relative">
  <Toolbar>
    <AssignmentIcon className={classes.icon} />
    <Typography variant="h6" color="inherit" noWrap>
      Jira Work log Report
    </Typography>
  </Toolbar>
</AppBar>
}