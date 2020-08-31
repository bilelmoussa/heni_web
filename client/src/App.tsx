import React from 'react';
import './App.css';
import { connect } from "react-redux";
import { AppState } from './store';
import { Router, Route, Switch as SwitchRouter } from "react-router-dom";
import { history } from "./utils/history";
import { unstable_createMuiStrictModeTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import Login from './routes/login/Login';
import Dashboard from './routes/dashboard/Dashboard';
import Contact from './routes/contact/Contact';

import { getMessage } from './sockets/socket';
import { switchDark } from './thunks';


interface Props {
  theme: any
  switchDark: any
}


class App extends React.Component<Props> {

  componentDidMount(){
    const darkState = JSON.parse(String(localStorage.getItem('darkState'))) || false;

    this.props.switchDark(darkState);

    getMessage()
  }

  render() {
    const { darkState } = this.props.theme;
    const palletType = darkState ? "dark" : "light";

    const darkTheme = unstable_createMuiStrictModeTheme({
      palette: {
        type: palletType,
        primary: {
          main: '#419aff'
        }
      }
    });

    return (
      <ThemeProvider theme={darkTheme}>
          <div className="App">
              <CssBaseline />
              <Router history={history}>
                <SwitchRouter>
                  <Route path="/" exact/>
                  <Route path="/dashboard" component={ Dashboard } />
                  <Route exact path="/login" component={ Login } />
                  <Route exact path="/contact" component={ Contact } />
                </SwitchRouter>
              </Router>
          </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  theme: state.theme,
});

export default connect(mapStateToProps, { switchDark })(App);
