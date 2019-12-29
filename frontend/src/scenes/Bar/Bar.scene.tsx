import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { createStyles, Theme, makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { AppState } from "../../store";
import { showLock, logout } from "../../services/auth/auth.service";
import { doesUserHaveRole } from "../../services/auth/auth.state";

const Bar: React.FC<{}> = () => {
  const classes = useStyles();

  const isLoggedIn = useSelector((state: AppState) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state: AppState) =>
    doesUserHaveRole(state, "admin")
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Link to="/" className={classes.title}>
            <Typography variant="h6" component="h1" color="inherit">
              App Header
            </Typography>
          </Link>
          {isAdmin ? (
            <Link to="/admin/route">
              <Button color="inherit">Admin Link</Button>
            </Link>
          ) : null}
          {isLoggedIn ? (
            <>
              <Link to="/authenticated/route">
                <Button color="inherit">Logged In</Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                showLock();
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    }
  })
);

export default Bar;
