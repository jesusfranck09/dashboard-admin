import React from 'react';
import {MDBRow,MDBCol, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'
import usuario from '../images/usuario.png'
import Button from '@material-ui/core/Button';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { DialogUtility } from '@syncfusion/ej2-popups';
import Modal from 'react-modal';
import PDF from '../PDFRP/index'
import {
  Grid,
} from '@material-ui/core';
import { Bar } from "react-chartjs-2";

import Result from './resultsRP'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isOpen: false,
      showModal2: false,  
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      dataBar: {
        labels: ["Siempre", "Casi Siempre", "Algunas Veces", "Casi nunca", "Nunca"],
        datasets: [
          {
            label: "% Resultados",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 134,159,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(255, 218, 128,0.4)",
              "rgba(113, 205, 205,0.4)",
              "rgba(170, 128, 252,0.4)",
              "rgba(255, 177, 101,0.4)"
            ],
            borderWidth: 2,
            borderColor: [
              "rgba(255, 134, 159, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(255, 218, 128, 1)",
              "rgba(113, 205, 205, 1)",
              "rgba(170, 128, 252, 1)",
              "rgba(255, 177, 101, 1)"
            ]
          }
        ]
      } 
      // componentepdf:'0'
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

  render() {
    const container2 = { width: 500, height: 300 }
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

              <MDBNavbarBrand>
               Resultados de la Encuesta RP
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav >   
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
          <MDBContainer style={container} className="pt-5">
          <MDBRow>
              <MDBCol md="9">
              <MDBContainer style={container2} className="  pt-5" >
            <h5 >Ejemplo de Ponderación</h5>
            <Bar  data={this.state.dataBar} options={this.state.barChartOptions} />
            {/* <span>{this.state.dias} {this.state.horas} {this.state.minutos} {this.state.segundos}</span> */}
          </MDBContainer>
          </MDBCol>
         
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
                                  <a href="http://www.ads.com.mx">www.ads.com.mx</a>
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

