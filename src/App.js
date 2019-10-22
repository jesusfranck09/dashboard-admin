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

// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";


class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/signup" name="SignUp Page" render={props => <SignUp {...props}/>} />
              <Route exact path="/" name="Home Page" render={props => <Home {...props}/>} />
              <Route exact path="/cuestions" name="Cuestions Page" render={props => <Cuestions {...props}/>} />
              <Route exact path="/das" name="Dashboard Page" render={props => <Dashboard {...props}/>} />

            </Switch>
          </React.Suspense>
      </HashRouter>

      </ApolloProvider>
    );
  }
}

export default App;
