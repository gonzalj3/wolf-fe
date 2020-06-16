import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Welcome from "./pages/welcome";

/*import logo from './logo.svg';
import './App.css';*/

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Welcome} />
    </BrowserRouter>
  );
}

export default App;
