import React from 'react';
import { Route } from 'react-router-dom';

const Admin = (props) => {
  const { routes } = props;
  return (
    <>
      {
        routes && routes.map(route => {
          return <Route
            exact={route.exact}
            path={route.path}
            key={route.path}
            render={(routeProps) => <route.component {...routeProps} routes={route.children} />}
          />;
        })
      }
    </>
  )
}

export default Admin;
