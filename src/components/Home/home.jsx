import React from 'react';
import {MDBRow, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBCol, MDBCardHeader} from 'mdbreact';
import Sidebar from './sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import './index.css'
import usuario from '../images/usuario.png'
import { Bar } from "react-chartjs-2";
import { DialogUtility } from '@syncfusion/ej2-popups';
import Modal from 'react-modal';
import {
  Grid,
  Button,
} from '@material-ui/core';
import axios from 'axios'
import {Alert} from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';


// import ProgressBar from '../ProgressBar/index'
import { MDBModal, MDBModalBody, MDBModalHeader, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isOpen: false,
      selection : 1,
      date:'',
      showModal2: false,
      nombre:'',
      apellidos:'',
      empleadosAts:[],
      modal16: false,
      empleadosRP:[],
      empleadosEEO:[],
      dias:'',
      horas:'',
      minutos:'',
      segundos:'',
      licencia:'',
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
      },
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
      }
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
    this.countdown('Jan 30 2020 11:20:58 GMT-0600 ')
    this.getMaxEmployees();
  }
   
  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

handleclick(){
this.props.history.push("/profile")

}

handleFront(){
console.log("hola mundo")
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
localStorage.removeItem("idAdmin")

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

getMaxEmployees(){

  const idAdmin   = localStorage.getItem('idAdmin')
  const url = 'http://localhost:8000/graphql'
  axios({
    url:  url,
    method:'post',
    data:{
    query:`
     query{
      getEmployeesResolvesSurveyATS(data:"${[idAdmin]}"){
            nombre
            ApellidoP
            ApellidoM
            correo
            ATSContestado
            }
          }
        `
    }
        }).then((datos) => {
          console.log("los datos son ",datos)
          this.setState({empleadosAts:datos.data.data.getEmployeesResolvesSurveyATS})

        }).catch(err=>{
          console.log("este es el error " , err.response)
        })

        
  // axios({
  //   url:  url,
  //   method:'post',
  //   data:{
  //   query:`
  //    mutation{
  //     getEmployeesResolvesSurveyRP(data:"${[idAdmin]}"){
  //         message
  //           }
  //         }
  //       `
  //   }
  //       }).then((datos) => {
  //         console.log("los datos son ",datos)
  //       }); 
 
  // axios({
  //   url:  url,
  //   method:'post',
  //   data:{
  //   query:`
  //    mutation{
  //     getEmployeesResolvesSurveyEEO(data:"${[idAdmin]}"){
  //         message
  //           }
  //         }
  //       `
  //   }
  //       }).then((datos) => {
  //         console.log("los datos son ",datos)
  //       }); 


}

countdown = (deadline) => {


  const timerUpdate = setInterval( () => {
    const licencia ="su licencia ha caducado"
    let t = this.getRemainingTime(deadline);
   this.setState ({dias:t.remainDays})
   this.setState ({horas:t.remainHours})
   this.setState ({minutos:t.remainMinutes})
   this.setState ({segundos:t.remainSeconds})
   this.setState({licencia:licencia})
    if(t.remainTime <= 1) {
      clearInterval(timerUpdate);
      const correo   = localStorage.getItem('correo')
      console.log("entro")
      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          inactiveAdmin(data:"${[correo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
           
            }); 


    }else {
this.setState({licencia:""})

    }

  }, 1000)
};

getRemainingTime = deadline => {
  let now = new Date(),
      remainTime = (new Date(deadline) - now + 1000) / 1000,
      remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
      remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
      remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
      remainDays = Math.floor(remainTime / (3600 * 24));

  return {
    remainSeconds,
    remainMinutes,
    remainHours,
    remainDays,
    remainTime
  }
};

toggle = (nr) => () => {  
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}


  render() {
    let expiro;
    if(this.state.licencia){

      expiro = <Alert color="danger" className="text-center ">{this.state.licencia}</Alert>

    }



   
     let modal;
     if(this.state.modal16){

      if(this.state.empleadosAts[0]){

        modal  =  <MDBContainer >
        <MDBModal isOpen={this.state.modal16} toggle={this.toggle(16)} style={{ width:800 }}>
          <MDBModalHeader toggle={this.toggle(16)}>
            Empleados Evaluacion ATS Contestado
          </MDBModalHeader>
          <MDBModalBody>
          <TableContainer component={Paper}>
       <Table  aria-label="simple table" >
         <TableHead>
           <TableRow>
             <TableCell></TableCell>
             <TableCell align="right">Nombre</TableCell>
             <TableCell align="right">Apellido Paterno</TableCell>
             <TableCell align="right">Apellido Materno</TableCell>
             <TableCell align="right">Correo</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
          {this.state.empleadosAts.map(row => (
             <TableRow key={row.id}>
               <TableCell component="th" scope="row">
                 {row.nombre}
               </TableCell>
               <TableCell align="right">{row.ApellidoP}</TableCell>
               <TableCell align="right">{row.ApellidoM}</TableCell>
               <TableCell align="right">{row.correo}</TableCell>
             
             </TableRow>
             ))}
         </TableBody>
       </Table>
     </TableContainer>
          </MDBModalBody>   
        </MDBModal>
      </MDBContainer>
      }
    
     
     }
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
    const container2 = { width: 500, height: 300 }
    const container3={marginLeft:200}
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
        <MDBContainer style={container} >
        {/* {this.state.nombre.nombre} */}
        <MDBRow>
        <MDBCol>
        <MDBContainer style={container2} className="text-left mt-2 pt-5" >
        <h5 >Ejemplo de Ponderación</h5>
        <Bar  data={this.state.dataBar} options={this.state.barChartOptions} />
        {/* <span>{this.state.dias} {this.state.horas} {this.state.minutos} {this.state.segundos}</span> */}
        <MDBCol>
        </MDBCol>
      </MDBContainer>
        {/* <MDBContainer className=" mt-5 pt-5" ><Alert color = "primary">Su licencia caduca en undefined dias</Alert>  <ProgressBar/></MDBContainer> */}
        </MDBCol>
        <MDBCol>
        <MDBCard style={{ width: "22rem" ,marginTop:100,marginLeft:100}}>
          <MDBCardBody>        
          <MDBCardTitle>Su Licencia caduca en :</MDBCardTitle>
         <MDBCardHeader>{this.state.dias} Dias  {this.state.horas} horas {this.state.minutos} minutos {this.state.segundos} segundos</MDBCardHeader>                 
        {expiro}

       </MDBCardBody>
      </MDBCard>

      <MDBCard style={{ width: "22rem" ,marginTop:10,marginLeft:100}}>
          <MDBCardBody>        
          <strong>Empleados Evaluación ATS</strong>
         <MDBCardHeader><strong>Realizada </strong>  <IconButton onClick={this.toggle(16)}> <RemoveRedEyeOutlinedIcon /></IconButton> <strong>No Realizada </strong><IconButton onClick={this.toggle(16)}> <RemoveRedEyeOutlinedIcon /></IconButton></MDBCardHeader>                 
        {expiro}

       </MDBCardBody>
      </MDBCard>
     

      </MDBCol>
      </MDBRow>
    
        {modal}
        </MDBContainer>
      </div>

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
      </React.Fragment>
    );
  }
}



export default Home;

