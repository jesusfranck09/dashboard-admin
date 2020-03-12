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

import Login from './components/views/Login/login';
import LoginEmpresas from './components/views/Login/LoginEmpresas';
import SignUp from './components/views/SignUp/signup';
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

import Empresas from './components/views/empresas/Empresas';

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
import adminEmployees from './components/adminGeneral/adminEmployees';
import Puestos from './components/adminGeneral/Puestos';
import IndexEEO from './components/Res generales/indexEEO';
import Demo from './components/demo/demo';
import ResultRP from './components/resultsCuestionsRP/resultRP';
import ResultEEO from './components/resultsCuestionsEEO/resultEEO';
import Apartments from './components/adminGeneral/Apartments';

import Res from './components/resultsCuestions/resultados';

import ResGral from './components/Res generales/index';


 import Paquetes from './components/packComercial/packComercial';
 import LoginAlfa from './components/views/Login/loginAdminAlfa';
 import SignAlfa from './components/views/SignUp/signUpAdminAlfa';
 import DashboardAdminAlfa from './components/dashboardAdminAlfa/dashboard';
class Routes extends Component{
  
  render(){
      
      

      return(
        <ApolloProvider client={client}>
          <Router>
          <Switch>
              <main>
                 
                  <Route exact path='/' component={Login}/>
                  <Route exact path='/paquetes' component={Paquetes}/>
                  <Route exact path='/loginEmpresas' component={LoginEmpresas}/>
                  <Route exact path='/loginAlfa' component={LoginAlfa}/>
                  <Route exact path='/register473' component={SignAlfa}/>
                  {/* <Route exact path='/verify/:id' component={Verify}/> */}
                  <Route exact path='/signup' component={SignUp}/>
                  {/* <PrivateRoute exact path='/result' component={Result}/> */}

                  <Route exact path='/cuestions' component={Cuestions}/>
                  <Route exact path='/inicio' component={Home}/>
                  {/* <PrivateRoute exact path='/company' component={Company}/> */}
                  <Route exact path='/employees' component={Employees}/>
                  <Route exact path='/table' component={Table}/>
                  <Route exact path='/survey' component={Survey}/>
                  <Route exact path='/Initsurvey' component={InitSurvey}/>
                  <Route exact path='/dashboardAdminAlfa' component={DashboardAdminAlfa}/>

                  <Route exact path='/empresas' component={Empresas}/>
                  <Route exact path='/page1' component={SurveyPage1}/>
                  <Route exact path='/page2' component={SurveyPage2}/>
                  <Route exact path='/page3' component={SurveyPage3}/>

                  <Route exact path='/politicaRP' component={PoliticaRP}/>

                  <Route exact path='/RPpage1' component={RPPage1}/>
                  <Route exact path='/RPpage2' component={RPPage2}/>
                  <Route exact path='/RPpage3' component={RPPage3}/>
                  <Route exact path='/RPpage4' component={RPPage4}/>
                  <Route exact path='/RPpage5' component={RPPage5}/>
                  <Route exact path='/RPpage6' component={RPPage6}/>
                  <Route exact path='/RPpage7' component={RPPage7}/>
                  <Route exact path='/RPpage8' component={RPPage8}/>

                  <Route exact path='/RPValidate7' component={RPValidateCuestion7}/>
                  <Route exact path='/RPValidate8' component={RPValidateCuestion8}/>


                  <Route exact path='/politicaEEO' component={PoliticaEEO}/>

                  <Route exact path='/EEOpage1' component={EEOpage1}/>
                  <Route exact path='/EEOpage2' component={EEOpage2}/>
                  <Route exact path='/EEOpage3' component={EEOpage3}/>
                  <Route exact path='/EEOpage4' component={EEOpage4}/>
                  <Route exact path='/EEOpage5' component={EEOpage5}/>
                  <Route exact path='/EEOpage6' component={EEOpage6}/>
                  <Route exact path='/EEOpage7' component={EEOpage7}/>
                  <Route exact path='/EEOpage8' component={EEOpage8}/>
                  <Route exact path='/EEOpage9' component={EEOpage9}/>
                  <Route exact path='/EEOpage10' component={EEOpage10}/>
                  <Route exact path='/EEOpage11' component={EEOpage11}/>
                  <Route exact path='/EEOpage12' component={EEOpage12}/>
                  <Route exact path='/EEOpage13' component={EEOpage13}/>
                  <Route exact path='/EEOpage14' component={EEOpage14}/>
                  <Route exact path='/profile' component={ProfileUser}/>
                  {/* <PrivateRoute exact path='/result' component={Result}/> */}
                  {/* <PrivateRoute exact path='/pdf' component={PDF}/> */}
                  <Route exact path='/resultRP' component={ResultRP}/>
                  <Route exact path='/resultEEO' component={ResultEEO}/>
                  <Route exact path='/res' component={Res}/>
                  <Route exact path='/adminGral' component={AdminGral}/>
                  <Route exact path='/sucursales' component={Sucursales}/>
                  <Route exact path='/apartments' component={Apartments}/>
                  <Route exact path='/adminEmployees' component={adminEmployees}/>
                  <Route exact path='/puestos' component={Puestos}/>
                  <Route exact path='/resultGralEEO' component={IndexEEO}/>
                  <Route exact path='/resultGral' component={ResGral}/>
                  <Route exact path='/demo' component={Demo}/>
         


                  {/* <PrivateRoute exact path='/progressbar' component={ProgressBar}/> */}
    

              </main>
              </Switch>
          </Router>
          </ApolloProvider>
      )
  }
}
export default Routes;




