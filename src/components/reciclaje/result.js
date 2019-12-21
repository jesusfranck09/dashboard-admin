import React from 'react';
import {MDBRow,MDBCol, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'
import usuario from '../images/usuario.png'
// import { Alert } from 'reactstrap';
import Button from '@material-ui/core/Button';
// import AppBar from 'material-ui/AppBar';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios'
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { DialogUtility } from '@syncfusion/ej2-popups';
import Modal from 'react-modal';
import PDF from '../PDF/index'


import {
  Grid,
} from '@material-ui/core';

import Result from '../resultsCuestions/results'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isOpen: false,
      datos:[],
      resultados:[],
      showModal2: false,  
    
    };
    this.onClick = this.onClick.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.ads = this.ads.bind(this);
    
  }
  componentWillMount(){
    var Nombre = localStorage.getItem("nombre")
    var Apellidos = localStorage.getItem("apellidos")


    var LaFecha=new Date();
    var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasem=new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
    var diasemana=LaFecha.getDay();
    var FechaCompleta="";
    var NumeroDeMes="";    
    NumeroDeMes=LaFecha.getMonth();
    FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();

    this.setState({date:FechaCompleta}) 
    this.setState({nombre:Nombre}) 
    this.setState({apellidos:Apellidos}) 
    this.viewEmmployee()
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

handleclick(){
this.props.history.push("/profile")

}



handleLogOut(){
localStorage.removeItem("elToken")
localStorage.removeItem("nombre")
localStorage.removeItem("apellidos")
localStorage.removeItem("rfc")
localStorage.removeItem("razonsocial")
localStorage.removeItem("usuario")
localStorage.removeItem("correo")
localStorage.removeItem("max")
this.props.history.push("/login")
DialogUtility.alert({
  animationSettings: { effect: 'Fade' },           
  title: 'Hasta luego...!',
  position: "fixed",

}
)
}


ads(){

  this.setState({showModal2:true})
  
}

  viewEmmployee = event  =>{
//obtener todos los empleados del administrador
    var correo  = localStorage.getItem("correo")      
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
          // console.log("este es el estado " , this.state.datos)
                            
          {this.state.datos.map(function(title,index){
            //mapeamos el estado para obtener las respuestas de cada unoo de los empleados
    console.log("title.id" ,  title.id)
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
                      console.log("los datos en la consulta son ",datos)
                    //  this.setState({ resultados: datos.data.data.resultSingleSurvey});
                      // console.log("las respuestas de cada uno en el estado son  "  , this.state.resultados)
                   })
                   .catch(err => {
                    console.log("el error es  ",err)
                  }); 
           })}
          })

          .catch((error) => {
            //console.log("errores" ,error.response.data.errors[0].message)
            // console.log(".cartch" , error.response)
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
                <strong>{this.state.date}</strong> 
                <MDBNavbarNav right>
                <MDBNavbarBrand>
              <AppNavbarBrand full={{ src: usuario, width: 30, height: 25, alt: 'ADS' }} />               
              {this.state.nombre}
              </MDBNavbarBrand>
              <MDBNavbarBrand>
              
              <MDBNavItem>
                
              <MDBDropdown>
                
                <MDBDropdownToggle nav caret>
               
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem onClick={this.handleclick}>Mi Perfil</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Configuración</MDBDropdownItem>
                  <MDBDropdownItem onClick={this.ads}>Más sobre ADS</MDBDropdownItem>
                  <MDBDropdownItem onClick={this.handleLogOut}>Cerrar Sesión</MDBDropdownItem>

                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            </MDBNavbarBrand>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
            
          </header>
        <MDBContainer style={container} className="text-center mt-5 pt-5">
    {/* <h6><strong><Alert color="primary">Elija el tipo de resultados que desea Visualizar</Alert></strong></h6> */}
      <MDBRow>
          <MDBCol>
      <Result/>
      </MDBCol>
      {/* <MDBCol>
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
                  


                  </MDBCol> */}
                  </MDBRow>


                  <Modal className="modal-main" isOpen={this.state.showModal2} contentLabel="Minimal Modal Example">
                    <div className="row">
                        <div className="col-md-12" item xs={12}>
                            <center><br/>
                                <br/>
                                <br/>
                                <font size="4">
                                El Distribuidor Asociado Master de CONTPAQi® que ha recibido el reconocimiento como el
                                <br/>
                                 Primer Lugar en Ventas por 15 Años Consecutivos en la Ciudad de México.
                                
                                <br/>
                                <br/>
                                Alfa Diseño de Sistemas: 
                               
                                Somos un distribuidor asociado master de CONTPAQi®, 
                                <br/>
                                 una casa desarrolladora de software, que además es PAC (Proveedor Autorizado de Certificación) y PCRDD 
                                <br/>
                                (Proveedor de Certificación y Recepción de Documentos Digitales) por parte del SAT.
                                {/* <img src={Ok} alt="ok" className="img-fluid"/><br/><br/> */}
                                <br/>
                                <br/>
                                Conoce más sobre nosotros en 
                                <br></br>
                                  <a href="www.ads.com.mx">www.ads.com.mx</a>
                                </font>

                                <br/>
                                <br/>
                                <br/>
                                {/* <Alert color="secondary" style={{fontSize: 24}}>Su encuesta ha finalizado, Gracias por su colaboración</Alert> */}
                                <br/>
                                <br/>
                                <Grid item style={{ marginTop: 16 }} spacing={2} item xs={12}>
                                <Button 
                                  variant="outlined"
                                    color="primary"
                                    type = "submit"
                                     onClick={()=>{this.setState({showModal2:false})}}
                                  >
                                   Cerrar
                                  </Button>
                                  </Grid>
                            </center>
                        </div>
                    </div>

                </Modal>
        <MDBContainer className="text-center mt-5 pt-5">
        <PDF></PDF>
        </MDBContainer>
        </MDBContainer>
    
      </div>
      </React.Fragment>
    );
  }
}



export default Home;
