import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Pages = (props) => {
  const { routes } = props;
  return (
    <>
      <Header></Header>
      <Switch>
        {
          routes.map(route => {
            return <Route
              exact={route.exact}
              path={route.path}
              key={route.path}
              render={(routeProps) => <route.component {...routeProps} routes={route.children} />}
            />;
          })
        }
        <Redirect to="/index" />
      </Switch>
      <Footer></Footer>
    </>
  )
}

export default Pages;
