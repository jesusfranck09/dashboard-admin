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
const Employees = React.lazy(() => import('./components/Upload/modalUpload'));
const Table = React.lazy(() => import('./components/Home/table'));
const Survey = React.lazy(() => import('./components/addCuestions/surveyTraumaticoSevero'));
const InitSurvey = React.lazy(() => import('./components/addCuestions/InitSurvey'))

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
              <Route exact path="/table" name="table Page" render={props => <Table {...props}/>} />
              <Route exact path="/employees" name="employee Page" render={props => <Employees {...props}/>} />
              <Route exact path="/survey" name="survey Page" render={props => <Survey {...props}/>} />
              <Route exact path="/Initsurvey" name="survey Page" render={props => <InitSurvey {...props}/>} />

            </Switch>
          </React.Suspense>
      </HashRouter>

      </ApolloProvider>
    );
  }
}

export default Routes;