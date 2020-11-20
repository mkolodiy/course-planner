import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React, { FC } from 'react';

const Header: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Course Planner</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
