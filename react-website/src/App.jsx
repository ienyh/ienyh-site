import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './assets/App.css'
import routes from './router/index';

function App () {
  return (
    <>
      <Router>
        <Switch>
          {
            routes.map(route => {
              return <Route
                exact={ route.exact }
                path={ route.path }
                key={ route.path }
                render={ routeProps => <route.component {...routeProps} routes={route.children} /> }
              />;
            })
          }
          <Redirect to="/404" />
        </Switch>
      </Router>
    </>
  )
}

export default App;
