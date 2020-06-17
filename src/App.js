import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";

import Welcome from "./pages/welcome";

/*import logo from './logo.svg';
import './App.css';*/

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Welcome} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
