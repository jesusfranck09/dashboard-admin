import React from 'react';
import {MDBRow,MDBCol, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'
import usuario from '../images/usuario.png'
import { Alert } from 'reactstrap';
import Button from '@material-ui/core/Button';
// import AppBar from 'material-ui/AppBar';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'

import Result from './results'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isOpen: false,
      datos:[],
      resultados:[]      
    
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  viewEmmployee = event  =>{

    var correo  = "d93409@gmail.com"       
    const url = 'http://localhost:8000/graphql'
    axios({
      url:  url,
      method:'post',
      data:{
      query:`
      query{
        getUsersTableEmployees(email:"${correo}"){
          id
          nombre
          ApellidoP
          ApellidoM
          Curp
          rfc
          FechaNacimiento
          Sexo
          cp
          EstadoCivil
          correo
          AreaTrabajo
          Puesto
          Ciudad
          NivelEstudios
          TipoPersonal
          JornadaTrabajo
          TipoContratacion
          TiempoPuesto
          ExperienciaLaboral
          RotacionTurnos
          fk_administrador
            }
          }
          `
      }
          }).then((datos) => {
            // console.log("parseo" ,JSON.stringify(datos.data.data))
            // console.log("datps" ,datos.data.data.getUsersTableEmployees)
            this.setState({ datos: datos.data.data.getUsersTableEmployees});
          console.log("este es el estado " , this.state.datos)
                            
          {this.state.datos.map(function(title,index){     
            const url = 'http://localhost:8000/graphql'
             axios({
               url:  url,
               method:'post',
               data:{
               query:`
                query{
                 resultSingleSurvey(data:"${[title.id]}"){
                  id 
                  Respuestas 
                  fk_preguntasATS 
                  fk_Empleados 
                  nombre 
                  ApellidoP 
                  ApellidoM 
                  Curp 
                  RFC 
                  FechaNacimiento 
                  Sexo 
                  CP 
                  EstadoCivil 
                  correo 
                  AreaTrabajo 
                  Puesto 
                  Ciudad 
                  NivelEstudios 
                  TipoPersonal 
                  JornadaTrabajo 
                  TipoContratacion 
                  TiempoPuesto 
                  ExperienciaLaboral 
                  RotacionTurnos 
                  fk_administrador 
                  fk_correos 
                       }
                     }
                   `
               }
                   }).then(datos => {
                     console.log("los datos en la consulta son ",datos.data.data.resultSingleSurvey)
                     this.setState({ resultados: datos.data.data.resultSingleSurvey});
                     console.log("este es el estado  "  , this.state.resultados)
                   })
                   .catch(err => {
                    console.log("los datos son ",err.response)
                  }); 
           })}
          })

          .catch((error) => {
      
            //console.log("errores" ,error.response.data.errors[0].message)
            console.log(".cartch" , error.response)
        });


                    
                
         }




  render() {
    // const { children} = this.props;
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
    return (
      <React.Fragment>
      <div>
          <header>
            <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
            <Sidebar/>
              <MDBNavbarBrand a href="./inicio">
              <AppNavbarBrand
                  full={{ src: logo, width: 80, height: 25, alt: 'ADS' }} />               
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="/employees">Cargar Empleados</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active>
                    <MDBNavLink to="/survey">Cuestionario ATS</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active>
                    <MDBNavLink to="/politicaRP">Cuestionario RP</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active>
                    <MDBNavLink to="/politicaEEO">Cuestionario EEO</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                <MDBNavbarBrand a href="/profile">
              <AppNavbarBrand
                  full={{ src: usuario, width: 30, height: 25, alt: 'ADS' }} />               
              </MDBNavbarBrand>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
        <MDBContainer style={container} className="text-center mt-2 pt-5">
    <h6><strong><Alert color="primary">Elija el tipo de resultados que desea Visualizar</Alert></strong></h6>
      <MDBRow>
          <MDBCol md="9">
      <Result/>
      </MDBCol>
      <MDBCol>
      <Alert  color="light"><Button
                   
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    size="large"
 
                  >
                  <strong>Resultados Encuesta ATS</strong> 
                  </Button> </Alert>
                  <Alert  color="light"><Button
                   type="submit"
                   fullWidth
                   variant="outlined"
                   color="primary"
                   size="large"
                 >
                 <strong>Resultados Encuesta RP</strong> 
                 </Button> </Alert>
                 <Alert  color="light"><Button                  
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={this.viewEmmployee}
                  >
                  <strong>Resultados Encuesta EEO</strong> 
                  </Button> </Alert>
                  


                  </MDBCol>
                  </MDBRow>
        </MDBContainer>
    
      </div>
      </React.Fragment>
    );
  }
}



export default Home;

