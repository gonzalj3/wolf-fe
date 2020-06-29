import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";

import Welcome from "./pages/welcome";
import Gameboard from "./pages/gameBoard";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/gameboard" component={Gameboard} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
