import React, { FC, useState } from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth-context';
import styles from './Header.module.scss';

const Header: FC = () => {
  const { signOut } = useAuth();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onSignOut = () => {
    signOut();
    history.push('/signin');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          <Link to="/" className={styles.link}>
            Course Planner
          </Link>
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={isOpen}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <Link to="/profile" className={styles.link}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
