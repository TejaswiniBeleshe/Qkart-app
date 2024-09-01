import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import ipConfig from './ipConfig.json';
import Login from './components/Login';
import { ThemeProvider } from '@mui/material';
import theme from './theme.js';
import Products from './components/Products';
import Checkout from './components/Checkout'
import Thanks from "./components/Thanks"
export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/'>
              <Products />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/checkout'>
              <Checkout/>
            </Route>
            <Route path='/thanks'>
              <Thanks/>
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
