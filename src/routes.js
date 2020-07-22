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
import Home from './components/Home/home';
// import Company from './components/views/addCompany/addCompany';
import Employees from './components/Upload/Employes';
import Table from './components/Home/table';
import AdminGral from './components/adminGeneral/AdminGral';
import ProfileUser from './components/Home/ProfileUser';
import Sucursales from './components/adminGeneral/Sucursales';
import PuestosDeptos from './components/adminGeneral/PuestosDeptos';
// import IndexEEO from './components/Res generales/indexEEO';
// import ResultRP from './components/resultsCuestionsRP/resultRP';
// import ResultEEO from './components/resultsCuestionsEEO/resultEEO';
// import Apartments from './components/adminGeneral/Apartments';
// import IndexATS from './components/Res generales/indexATS';
import Donut from './components/carpetaPrueba/donut';
import Estadisticas from './components/Estadisticas/estadisticas';
// import ResGral from './components/Res generales/index';
import Upload from './components/uploadImage/upload';

import ATS from './components/ResGenerales/PDFIG'
import RP from './components/ResGenerales/RPIG'
import EEO from './components/ResGenerales/EEOIG'
// import Paypal from './components/paypalCheckout.js/index'

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
                  <PrivateRoute exact path='/upload' component={Upload}/>
                  {/* <PrivateRoute exact path='/indexAts' component={IndexATS}/> */}
                  <PrivateRoute exact path='/inicio' component={Home}/>
                  {/* <PrivateRoute exact path='/company' component={Company}/> */}
                  <PrivateRoute exact path='/employees' component={Employees}/>
                  <PrivateRoute exact path='/table' component={Table}/>
                  <PrivateRoute exact path='/profile' component={ProfileUser}/>
                  {/* <PrivateRoute exact path='/result' component={Result}/> */}
                  {/* <PrivateRoute exact path='/pdf' component={PDF}/> */}
                  {/* <PrivateRoute exact path='/resultRP' component={ResultRP}/>
                  <PrivateRoute exact path='/resultEEO' component={ResultEEO}/>
                  <PrivateRoute exact path='/res' component={Res}/> */}
                  <PrivateRoute exact path='/adminGral' component={AdminGral}/>
                  <PrivateRoute exact path='/sucursales' component={Sucursales}/>
                  {/* <PrivateRoute exact path='/apartments' component={Apartments}/> */}
                  <PrivateRoute exact path='/puestosDeptos' component={PuestosDeptos}/>
                  {/* <PrivateRoute exact path='/resultGralEEO' component={IndexEEO}/>
                  <PrivateRoute exact path='/resultGral' component={ResGral}/> */}
                  <PrivateRoute exact path='/estadisticas' component={Estadisticas}/>
                  <PrivateRoute exact path='/resultsATSIGRM' component={ATS}/>
                  <PrivateRoute exact path='/resultsRPIGRM' component={RP}/>
                  <PrivateRoute exact path='/resultsEEOIGRM' component={EEO}/>
                  <PrivateRoute exact path='/donut' component={Donut}/>
                  {/* <PrivateRoute exact path='/paypal' component={Paypal}/> */}

                  {/* <PrivateRoute exact path='/dashboardDemo' component={PruebaDashboard}/> */}

                  {/* <PrivateRoute exact path='/progressbar' component={ProgressBar}/> */}
    

              </main>
              </Switch>
          </Router>
          </ApolloProvider>
      )
  }
}
export default Routes;




