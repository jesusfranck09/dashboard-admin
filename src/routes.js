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
// const Dashboard = React.lazy(() => import('./components/reciclaje/dashboard/dashboard'));
const Company = React.lazy(() => import('./components/views/addCompany/addCompany'));
const Employees = React.lazy(() => import('./components/Upload/Employes'));
const Table = React.lazy(() => import('./components/Home/table'));


const Survey = React.lazy(() => import('./components/addCuestions/PoliticaPrivacidad'));
const InitSurvey = React.lazy(() => import('./components/addCuestions/surveyTraumaticoSevero'))
const SurveyPage1 = React.lazy(() => import('./components/addCuestions/SurveyPage1'))
const SurveyPage2 = React.lazy(() => import('./components/addCuestions/SurveyPage2'))
const SurveyPage3 = React.lazy(() => import('./components/addCuestions/SurveyPage3'))


const RPPage1 = React.lazy(() => import('./components/addCuestions/Cuestion Sección RP/Page1'))
const RPPage2 = React.lazy(() => import('./components/addCuestions/Cuestion Sección RP/Page2'))
const PoliticaRP = React.lazy(() => import('./components/addCuestions/Cuestion Sección RP/PoliticaPrivacidadRP'))
const RPPage3 = React.lazy(() => import('./components/addCuestions/Cuestion Sección RP/Page3'))
const RPPage4 = React.lazy(() => import('./components/addCuestions/Cuestion Sección RP/Page4'))
const RPPage5 = React.lazy(() => import('./components/addCuestions/Cuestion Sección RP/Page5'))
const RPPage6 = React.lazy(() => import('./components/addCuestions/Cuestion Sección RP/Page6'))
const RPPage7 = React.lazy(() => import('./components/addCuestions/Cuestion Sección RP/Page7'))
const RPPage8 = React.lazy(() => import('./components/addCuestions/Cuestion Sección RP/Page8'))
const RPValidateCuestion7 = React.lazy(() => import('./components/addCuestions/Cuestion Sección RP/ValidateCuestion7'))
const RPValidateCuestion8 = React.lazy(() => import('./components/addCuestions/Cuestion Sección RP/ValidateCuestion8'))

const PoliticaEEO = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/PoliticaPrivacidadEEO'))
const EEOpage1 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage1'))
const EEOpage2 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage2'))
const EEOpage3 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage3'))
const EEOpage4 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage4'))
const EEOpage5 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage5'))
const EEOpage6 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage6'))
const EEOpage7 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage7.js'))
const EEOpage8 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage8.js'))
const EEOpage9 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage9.js'))
const EEOpage10 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage10.js'))
const EEOpage11 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage11.js'))
const EEOpage12 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage12.js'))
const EEOpage13 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage13.js'))
const EEOpage14 = React.lazy(() => import('./components/addCuestions/Cuestion Seccion EEO/EEOpage14.js'))
const Alert = React.lazy(() => import('./components/Home/alert'))

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
              {/* <Route exact path="/das" name="Dashboard Page" render={props => <Dashboard {...props}/>} /> */}
              <Route exact path="/company" name="company Page" render={props => <Company {...props}/>} /> 
              <Route exact path="/table" name="table Page" render={props => <Table {...props}/>} />
              <Route exact path="/employees" name="employee Page" render={props => <Employees {...props}/>} />
             
             
              <Route exact path="/survey" name="survey Page" render={props => <Survey {...props}/>} />
              <Route exact path="/Initsurvey" name="survey Page" render={props => <InitSurvey {...props}/>} />
              <Route exact path="/page1" name="survey Page" render={props => <SurveyPage1 {...props}/>} />
              <Route exact path="/page2" name="survey Page2" render={props => <SurveyPage2 {...props}/>} />
              <Route exact path="/page3" name="survey Page3" render={props => <SurveyPage3 {...props}/>} />

              <Route exact path="/politicaRP" name="politicaRP" render={props => <PoliticaRP {...props}/>} />
              <Route exact path="/RPpage1" name="RPPage1" render={props => <RPPage1 {...props}/>} />
              <Route exact path="/RPpage2" name="RPPage2" render={props => <RPPage2 {...props}/>} />
              <Route exact path="/RPpage3" name="RPPage3" render={props => <RPPage3 {...props}/>} />
              <Route exact path="/RPpage4" name="RPPage4" render={props => <RPPage4 {...props}/>} />
              <Route exact path="/RPpage5" name="RPPage5" render={props => <RPPage5 {...props}/>} />
              <Route exact path="/RPpage6" name="RPPage6" render={props => <RPPage6 {...props}/>} />
              <Route exact path="/RPpage7" name="RPPage7" render={props => <RPPage7 {...props}/>} />
              <Route exact path="/RPpage8" name="RPPage8" render={props => <RPPage8 {...props}/>} />
              <Route exact path="/RPValidate7" name="RPPage7Validate" render={props => <RPValidateCuestion7 {...props}/>} />
              <Route exact path="/RPValidate8" name="RPPage8Validate" render={props => <RPValidateCuestion8 {...props}/>} />


              <Route exact path="/politicaEEO" name="politicaEEO" render={props => <PoliticaEEO {...props}/>} />
              <Route exact path="/EEOpage1" name="EEOpage1" render={props => <EEOpage1 {...props}/>} />
              <Route exact path="/EEOpage2" name="EEOpage2" render={props => <EEOpage2 {...props}/>} />
              <Route exact path="/EEOpage3" name="EEOpage3" render={props => <EEOpage3 {...props}/>} />
              <Route exact path="/EEOpage4" name="EEOpage4" render={props => <EEOpage4 {...props}/>} />
              <Route exact path="/EEOpage5" name="EEOpage4" render={props => <EEOpage5 {...props}/>} />
              <Route exact path="/EEOpage6" name="EEOpage4" render={props => <EEOpage6 {...props}/>} />
              <Route exact path="/EEOpage7" name="EEOpage7" render={props => <EEOpage7 {...props}/>} />
              <Route exact path="/EEOpage8" name="EEOpage8" render={props => <EEOpage8 {...props}/>} />
              <Route exact path="/EEOpage9" name="EEOpage9" render={props => <EEOpage9 {...props}/>} />
              <Route exact path="/EEOpage10" name="EEOpage10" render={props => <EEOpage10 {...props}/>} />
              <Route exact path="/EEOpage11" name="EEOpage11" render={props => <EEOpage11 {...props}/>} />
              <Route exact path="/EEOpage12" name="EEOpage12" render={props => <EEOpage12 {...props}/>} />
              <Route exact path="/EEOpage13" name="EEOpage13" render={props => <EEOpage13 {...props}/>} />
              <Route exact path="/EEOpage14" name="EEOpage14" render={props => <EEOpage14 {...props}/>} />
              <Route exact path="/alert" name="alert" render={props => <Alert {...props}/>} />

            </Switch>
          </React.Suspense>
      </HashRouter>

      </ApolloProvider>
    );
  }
}

export default Routes;