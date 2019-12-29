import React from "react";
import { useSelector } from "react-redux";

import { Button, createStyles, Theme, makeStyles } from "@material-ui/core";

import { showLock } from "../../services/auth/auth.service";
import { AppState } from "../../store";

const Home: React.FC<{}> = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state: AppState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div className={classes.anonContainer}>
        <p>Login to get started.</p>
        <Button
          variant="contained"
          size="large"
          onClick={event => {
            event.preventDefault();
            showLock();
          }}
        >
          Login or Sign Up
        </Button>
        <p>
          Edit this page in <code>frontend/src/scenes/Home/Home.scene.tsx</code>
        </p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <h1>You're logged in</h1>
      <p>
        Edit this page in <code>frontend/src/scenes/Home/Home.scene.tsx</code>
      </p>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    anonContainer: {
      paddingTop: "10vh",
      textAlign: "center",
      fontSize: "3em"
    },
    container: {}
  })
);

export default Home;
