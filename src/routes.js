import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import '../src/App.scss';
import { ApolloProvider } from 'react-apollo';
import client from './Graphql';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const Login = React.lazy(() => import('./components/views/Login/login'));
const SignUp = React.lazy(() => import('./components/views/SignUp/signup'));
const Cuestions = React.lazy(() => import('./components//addCuestions/cuestions'));
const Home = React.lazy(() => import('./components/Home/home'));
const Dashboard = React.lazy(() => import('./components/dashboard/dashboard'));
const Company = React.lazy(() => import('./components/views/addCompany/addCompany'));
const ProfileAdmin = React.lazy(() => import('./components/profiles/ProfileAmin'));



// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";


class Routes extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/" name="Home Page" render={props => <Login {...props}/>} />
              <Route exact path="/signup" name="SignUp Page" render={props => <SignUp {...props}/>} />
              <Route exact path="/inicio" name="Inicio Page" render={props => <Home {...props}/>} />
              <Route exact path="/cuestions" name="Cuestions Page" render={props => <Cuestions {...props}/>} />
              <Route exact path="/das" name="Dashboard Page" render={props => <Dashboard {...props}/>} />
              <Route exact path="/company" name="company Page" render={props => <Company {...props}/>} /> 
              <Route exact path="/profileA" name="profile Page" render={props => <ProfileAdmin {...props}/>} />

            </Switch>
          </React.Suspense>
      </HashRouter>

      </ApolloProvider>
    );
  }
}

export default Routes;