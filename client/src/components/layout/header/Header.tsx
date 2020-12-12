import React, { FC, useState } from 'react';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import { AccountBox } from '@material-ui/icons';
import { SettingsApplications } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth-context';
import styles from './Header.module.scss';
import { useUser } from '../../../contexts/user-context';

const Header: FC = () => {
  const { signOut } = useAuth();
  const { isAdmin } = useUser();
  const history = useHistory();

  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const isAccountMenuOpen = Boolean(accountAnchorEl);
  const isSettingsMenuOpen = Boolean(settingsAnchorEl);

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountAnchorEl(null);
  };

  const handleSettingMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingMenuClose = () => {
    setSettingsAnchorEl(null);
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
          {isAdmin && (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleSettingMenuOpen}
                color="inherit"
              >
                <SettingsApplications />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={settingsAnchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={isSettingsMenuOpen}
                onClose={handleSettingMenuClose}
              >
                <MenuItem onClick={handleSettingMenuClose}>
                  <Link to="/coursetypes" className={styles.link}>
                    Course Types
                  </Link>
                </MenuItem>
              </Menu>
            </>
          )}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccountMenuOpen}
            color="inherit"
          >
            <AccountBox />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={accountAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={isAccountMenuOpen}
            onClose={handleAccountMenuClose}
          >
            <MenuItem onClick={handleAccountMenuClose}>
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
