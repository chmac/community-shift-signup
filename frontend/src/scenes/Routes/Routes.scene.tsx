import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";
import { createStyles, Theme, createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { responsiveFontSizes, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import { AppState } from "../../store";

import Bar from "../Bar/Bar.scene";
import Home from "../Home/Home.scene";
import MissionNew from "../MissionNew/MissionNew.scene";
import MissionSingle from "../MissionSingle/MissionSingle.scene";

const baseTheme = createMuiTheme();
const theme = responsiveFontSizes(baseTheme);

export const history = createBrowserHistory();

const Routes: React.FC<{}> = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state: AppState) => state.auth.isLoggedIn);

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Bar />
        <CssBaseline />
        <Container className={classes.container}>
          {isLoggedIn ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/missions/new" component={MissionNew} />
              <Route exact path="/missions/:id" component={MissionSingle} />
            </Switch>
          ) : (
            <>
              <Home />
            </>
          )}
        </Container>
      </Router>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1
    }
  })
);

export default Routes;
