import '../src/App.scss';
import checkToken from '../src/resolvers/checkToken';
import {
  BrowserRouter as Router,
  Route,Redirect,Switch
} from 'react-router-dom';
import React, { Component } from 'react'; 
import Login from './components/views/Login/LoginEmpresas';
import Home from './components/Home/home';
import Employees from './components/Upload/Employes';
import Table from './components/Home/table';
import AdminGral from './components/adminGeneral/AdminGral';
import ProfileUser from './components/Home/ProfileUser';
import Sucursales from './components/adminGeneral/Sucursales';
import PuestosDeptos from './components/adminGeneral/PuestosDeptos';
import Donut from './components/carpetaPrueba/donut';
import Estadisticas from './components/Estadisticas/estadisticas';
import Upload from './components/uploadImage/upload';
import PDFPrueba from './components/ResGenerales/pdfPrueba'
import ATS from './components/ResGenerales/PDFIG'
import RP from './components/ResGenerales/RPIG'
import EEO from './components/ResGenerales/EEOIG'

class Routes extends Component{
  
  render(){
      
    const PrivateRoute = ({component:Component, ...rest}) => (
      <Route {...rest} render = {(props) => (checkToken() === true ? <Component {...props}/> : <Redirect to="/"/> )}/>      
      )

      return(
          <Router>
          <Switch>
              <main>
              <Route exact path='/' component={Login}/>
                  <PrivateRoute exact path='/upload' component={Upload}/>
                  <PrivateRoute exact path='/atsDemoIG' component={PDFPrueba}/>
                  <PrivateRoute exact path='/inicio' component={Home}/>
                  <PrivateRoute exact path='/employees' component={Employees}/>
                  <PrivateRoute exact path='/table' component={Table}/>
                  <PrivateRoute exact path='/profile' component={ProfileUser}/>
                  <PrivateRoute exact path='/adminGral' component={AdminGral}/>
                  <PrivateRoute exact path='/sucursales' component={Sucursales}/>
                  <PrivateRoute exact path='/puestosDeptos' component={PuestosDeptos}/>
                  <PrivateRoute exact path='/estadisticas' component={Estadisticas}/>
                  <PrivateRoute exact path='/resultsATSIGRM' component={ATS}/>
                  <PrivateRoute exact path='/resultsRPIGRM' component={RP}/>
                  <PrivateRoute exact path='/resultsEEOIGRM' component={EEO}/>
                  <PrivateRoute exact path='/donut' component={Donut}/>
              </main>
              </Switch>
          </Router>
      )
  }
}
export default Routes;




