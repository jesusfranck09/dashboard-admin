import '../src/App.scss';
import { ApolloProvider } from 'react-apollo';
import client from './Graphql';
import checkToken from '../src/resolvers/checkToken';
 // import checkSurveyATS from '../src/resolvers/checkSurveyATS';
// import checkSurveyRP from '../src/resolvers/checkSurveyRP';
// import checkSurveyEEO from '../src/resolvers/checkSurveyEEO';
import {
  BrowserRouter as Router,
  Route,Redirect,Switch
} from 'react-router-dom';
import React, { Component } from 'react';

import Login from './components/views/Login/LoginEmpresas';
import Cuestions from './components//addCuestions/cuestions';
import Home from './components/Home/home';
// import Company from './components/views/addCompany/addCompany';
import Employees from './components/Upload/Employes';
import Table from './components/Home/table';
import Survey from './components/addCuestions/PoliticaPrivacidad';
import InitSurvey from './components/addCuestions/surveyTraumaticoSevero';

import SurveyPage1 from './components/addCuestions/SurveyPage1';
import SurveyPage2 from './components/addCuestions/SurveyPage2';
import SurveyPage3 from './components/addCuestions/SurveyPage3';

import RPPage1 from './components/addCuestions/Cuestion Sección RP/Page1';
import RPPage2 from './components/addCuestions/Cuestion Sección RP/Page2';
import RPPage3 from './components/addCuestions/Cuestion Sección RP/Page3';
import RPPage4 from './components/addCuestions/Cuestion Sección RP/Page4';
import RPPage5 from './components/addCuestions/Cuestion Sección RP/Page5';
import RPPage6 from './components/addCuestions/Cuestion Sección RP/Page6';
import RPPage7 from './components/addCuestions/Cuestion Sección RP/Page7';
import RPPage8 from './components/addCuestions/Cuestion Sección RP/Page8';
import AdminGral from './components/adminGeneral/AdminGral';

import PoliticaRP from './components/addCuestions/Cuestion Sección RP/PoliticaPrivacidadRP';

import RPValidateCuestion7 from './components/addCuestions/Cuestion Sección RP/ValidateCuestion7';
import RPValidateCuestion8 from './components/addCuestions/Cuestion Sección RP/ValidateCuestion8';

import PoliticaEEO from './components/addCuestions/Cuestion Seccion EEO/PoliticaPrivacidadEEO';

import EEOpage1 from './components/addCuestions/Cuestion Seccion EEO/EEOpage1';
import EEOpage2 from './components/addCuestions/Cuestion Seccion EEO/EEOpage2';
import EEOpage3 from './components/addCuestions/Cuestion Seccion EEO/EEOpage3';
import EEOpage4 from './components/addCuestions/Cuestion Seccion EEO/EEOpage4';
import EEOpage5 from './components/addCuestions/Cuestion Seccion EEO/EEOpage5';
import EEOpage6 from './components/addCuestions/Cuestion Seccion EEO/EEOpage6';
import EEOpage7 from './components/addCuestions/Cuestion Seccion EEO/EEOpage7';
import EEOpage8 from './components/addCuestions/Cuestion Seccion EEO/EEOpage8';
import EEOpage9 from './components/addCuestions/Cuestion Seccion EEO/EEOpage9';
import EEOpage10 from './components/addCuestions/Cuestion Seccion EEO/EEOpage10';
import EEOpage11 from './components/addCuestions/Cuestion Seccion EEO/EEOpage11';
import EEOpage12 from './components/addCuestions/Cuestion Seccion EEO/EEOpage12';
import EEOpage13 from './components/addCuestions/Cuestion Seccion EEO/EEOpage13';
import EEOpage14 from './components/addCuestions/Cuestion Seccion EEO/EEOpage14';
import ProfileUser from './components/Home/ProfileUser';
import Sucursales from './components/adminGeneral/Sucursales';
import Puestos from './components/adminGeneral/Puestos';
import IndexEEO from './components/Res generales/indexEEO';
import ResultRP from './components/resultsCuestionsRP/resultRP';
import ResultEEO from './components/resultsCuestionsEEO/resultEEO';
import Apartments from './components/adminGeneral/Apartments';
import IndexATS from './components/Res generales/indexATS';
import Res from './components/resultsCuestions/resultados';
import Estadisticas from './components/Estadisticas/estadisticas';

import ResGral from './components/Res generales/index';

class Routes extends Component{
  
  render(){
      
    const PrivateRoute = ({component:Component, ...rest}) => (
      <Route {...rest} render = {(props) => (checkToken() === true ? <Component {...props}/> : <Redirect to="/"/> )}/>      
      )

      return(
        <ApolloProvider client={client}>
          <Router>
          <Switch>
              <main>
              <Route exact path='/' component={Login}/>
                  {/* <Route exact path='/verify/:id' component={Verify}/> */}
                  {/* <PrivateRoute exact path='/result' component={Result}/> */}

                  <PrivateRoute exact path='/cuestions' component={Cuestions}/>
                  <PrivateRoute exact path='/indexAts' component={IndexATS}/>

                  <PrivateRoute exact path='/inicio' component={Home}/>
                  {/* <PrivateRoute exact path='/company' component={Company}/> */}
                  <PrivateRoute exact path='/employees' component={Employees}/>
                  <PrivateRoute exact path='/table' component={Table}/>
                  <PrivateRoute exact path='/survey' component={Survey}/>
                  <PrivateRoute exact path='/Initsurvey' component={InitSurvey}/>
                  <PrivateRoute exact path='/page1' component={SurveyPage1}/>
                  <PrivateRoute exact path='/page2' component={SurveyPage2}/>
                  <PrivateRoute exact path='/page3' component={SurveyPage3}/>

                  <PrivateRoute exact path='/politicaRP' component={PoliticaRP}/>

                  <PrivateRoute exact path='/RPpage1' component={RPPage1}/>
                  <PrivateRoute exact path='/RPpage2' component={RPPage2}/>
                  <PrivateRoute exact path='/RPpage3' component={RPPage3}/>
                  <PrivateRoute exact path='/RPpage4' component={RPPage4}/>
                  <PrivateRoute exact path='/RPpage5' component={RPPage5}/>
                  <PrivateRoute exact path='/RPpage6' component={RPPage6}/>
                  <PrivateRoute exact path='/RPpage7' component={RPPage7}/>
                  <PrivateRoute exact path='/RPpage8' component={RPPage8}/>

                  <PrivateRoute exact path='/RPValidate7' component={RPValidateCuestion7}/>
                  <PrivateRoute exact path='/RPValidate8' component={RPValidateCuestion8}/>


                  <PrivateRoute exact path='/politicaEEO' component={PoliticaEEO}/>

                  <PrivateRoute exact path='/EEOpage1' component={EEOpage1}/>
                  <PrivateRoute exact path='/EEOpage2' component={EEOpage2}/>
                  <PrivateRoute exact path='/EEOpage3' component={EEOpage3}/>

                  <PrivateRoute exact path='/EEOpage4' component={EEOpage4}/>
                  <PrivateRoute exact path='/EEOpage5' component={EEOpage5}/>
                  <PrivateRoute exact path='/EEOpage6' component={EEOpage6}/>
                  <PrivateRoute exact path='/EEOpage7' component={EEOpage7}/>
                  <PrivateRoute exact path='/EEOpage8' component={EEOpage8}/>
                  <PrivateRoute exact path='/EEOpage9' component={EEOpage9}/>
                  <PrivateRoute exact path='/EEOpage10' component={EEOpage10}/>
                  <PrivateRoute exact path='/EEOpage11' component={EEOpage11}/>
                  <PrivateRoute exact path='/EEOpage12' component={EEOpage12}/>
                  <PrivateRoute exact path='/EEOpage13' component={EEOpage13}/>
                  <PrivateRoute exact path='/EEOpage14' component={EEOpage14}/>
                  <PrivateRoute exact path='/profile' component={ProfileUser}/>
                  {/* <PrivateRoute exact path='/result' component={Result}/> */}
                  {/* <PrivateRoute exact path='/pdf' component={PDF}/> */}
                  <PrivateRoute exact path='/resultRP' component={ResultRP}/>
                  <PrivateRoute exact path='/resultEEO' component={ResultEEO}/>
                  <PrivateRoute exact path='/res' component={Res}/>
                  <PrivateRoute exact path='/adminGral' component={AdminGral}/>
                  <PrivateRoute exact path='/sucursales' component={Sucursales}/>
                  <PrivateRoute exact path='/apartments' component={Apartments}/>
                  <PrivateRoute exact path='/puestos' component={Puestos}/>
                  <PrivateRoute exact path='/resultGralEEO' component={IndexEEO}/>
                  <PrivateRoute exact path='/resultGral' component={ResGral}/>
                  <PrivateRoute exact path='/estadisticas' component={Estadisticas}/>


                  {/* <PrivateRoute exact path='/progressbar' component={ProgressBar}/> */}
    

              </main>
              </Switch>
          </Router>
          </ApolloProvider>
      )
  }
}
export default Routes;




