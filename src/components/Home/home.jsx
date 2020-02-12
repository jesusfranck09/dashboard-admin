import React from 'react';
import {MDBRow, MDBContainer,MDBBadge, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBCol, MDBCardHeader} from 'mdbreact';
import Sidebar from './sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import './index.css'
import usuario from '../images/usuario.png'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
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
      empleadosAtsFalse:[],
      modal16: false,
      modal15:false,
      modal14:false,
      modal10:false,
      modal11:false,
      modal12:false,
      totalEmpleados:[],
      empleadosRP:[],
      empleadosRPFalse:[],
      empleadosAtsDetectado:[],
      empleadosEEO:[],
      empleadosEEOFalse:[],
      dias:'',
      horas:'',
      minutos:'',
      segundos:'',
      licencia:'',
      array:[]
    };
    this.onClick = this.onClick.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.ads = this.ads.bind(this);
  }

  componentWillMount(){
  const idAdmin   = localStorage.getItem('idAdmin')
  const url = 'http://localhost:8000/graphql'
  axios({
    url:  url,
    method:'post',
    data:{
    query:`
     query{
      getAdminFechaRegistro(data:"${[idAdmin]}"){
      fechaRegistro
            }
          }
        `
    }
        }).then((datos) => {
        console.log("Registro",datos.data.data.getAdminFechaRegistro.fechaRegistro)
        
        var part1=datos.data.data.getAdminFechaRegistro.fechaRegistro.substring(5,11)
        var part2=datos.data.data.getAdminFechaRegistro.fechaRegistro.substring(16,29)
        this.countdown(part1 + " 2021 " + part2)
        })

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


    this.getMaxEmployees();
    this.countEmployees();
    this.verifyTables()
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

verifyTables(){
  const idAdmin   = localStorage.getItem('idAdmin')
  const url = 'http://localhost:8000/graphql'
  axios({
    url:  url,
    method:'post',
    data:{
    query:`
     query{
      employeeActive(data:"${[idAdmin]}"){
        id
        EmpleadoActivo
            }
          }
        `
    }
        }).then((datos) => {
          // console.log("em activo",datos.data.data.employeeActive.length)
          if(datos.data.data.employeeActive.length>0){
           localStorage.setItem("empleadoActivo","true")
          }else{
            localStorage.setItem("empleadoActivo","false")
          }
      
        }).catch(err=>{
          console.log("este es el error " , err.response)
        })
        
  axios({
    url:  url,
    method:'post',
    data:{
    query:`
      query{
      deptoActive(data:"${[idAdmin]}"){
        id
        DepartamentoActivo
            }
          }
        `
    }
        }).then((datos) => {
            console.log("depto activo",datos.data.data.deptoActive)
          if(datos.data.data.deptoActive.length>0){
            localStorage.setItem("DepartamentoActivo","true")
          }else{
            localStorage.setItem("DepartamentoActivo","false")
          }
      
        }).catch(err=>{
          console.log("este es el error " , err.response)
        })
  axios({
    url:  url,
    method:'post',
    data:{
    query:`
      query{
      sucActive(data:"${[idAdmin]}"){
        id
        SucursalActiva
            }
          }
        `
    }
        }).then((datos) => {
            console.log("depto activo",datos.data.data.sucActive)
          if(datos.data.data.sucActive.length>0){
            localStorage.setItem("SucursalActiva","true")
          }else{
            localStorage.setItem("SucursalActiva","false")
          }
      
        }).catch(err=>{
          console.log("este es el error " , err.response)
        })
  axios({
    url:  url,
    method:'post',
    data:{
    query:`
      query{
      puestoActive(data:"${[idAdmin]}"){
        id
        PuestoActivo
            }
          }
        `
    }
        }).then((datos) => {
            console.log("depto activo",datos.data.data.puestoActive)
          if(datos.data.data.puestoActive.length>0){
            localStorage.setItem("PuestoActivo","true")
          }else{
            localStorage.setItem("PuestoActivo","false")
          }
      
        }).catch(err=>{
          console.log("este es el error " , err.response)
        })


}

countEmployees(){
  
  const idAdmin   = localStorage.getItem('idAdmin')
  const url = 'http://localhost:8000/graphql'
  axios({
    url:  url,
    method:'post',
    data:{
    query:`
     query{
      countEmployees(data:"${[idAdmin]}"){
           id
            }
          }
        `
    }
        }).then((datos) => {
          // console.log("los datos son ",datos.data.data.countEmployees[0].id)
          this.setState({totalEmpleados:datos.data.data.countEmployees[0].id})
       
        }).catch(err=>{
          console.log("este es el error " , err.response)
        })

  axios({
    url:  url,
    method:'post',
    data:{
    query:`
      query{
          getEmployeesATSDetectado(data:"${[idAdmin]}"){
            nombre
            ApellidoP
            ApellidoM
            correo
            }
          }
        `
    }
        }).then((datos) => {
          // console.log("los datos son ",datos.data.data.countEmployees[0].id)
          this.setState({empleadosAtsDetectado:datos.data.data.getEmployeesATSDetectado})
        }).catch(err=>{
          console.log("este es el error " , err.response)
        })

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
          // console.log("los datos son ",datos)
          this.setState({empleadosAts:datos.data.data.getEmployeesResolvesSurveyATS})
          // console.log("state.lenght" , this.state.empleadosAts.length)
        }).catch(err=>{
          // console.log("este es el error " , err.response)
        })

  axios({
    url:  url,
    method:'post',
    data:{
    query:`
      query{
      getEmployeesResolvesSurveyATSFalse(data:"${[idAdmin]}"){
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
          // console.log("los datos son ",datos)
          this.setState({empleadosAtsFalse:datos.data.data.getEmployeesResolvesSurveyATSFalse})
          // console.log("state.lenghtFalse" , this.state.empleadosAtsFalse.length)
        }).catch(err=>{
          // console.log("este es el error " , err.response)
        })  
                 
  axios({
    url:  url,
    method:'post',
    data:{
    query:`
    query{
      getEmployeesResolvesSurveyRP(data:"${[idAdmin]}"){
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
          this.setState({empleadosRP:datos.data.data.getEmployeesResolvesSurveyRP})
          // console.log("hay datos RP  " ,datos ) 
        }).catch(err=>{
          // console.log("error", err.response)
        })

    axios({
      url:  url,
      method:'post',
      data:{
      query:`
      query{
        getEmployeesResolvesSurveyRPFalse(data:"${[idAdmin]}"){
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
            this.setState({empleadosRPFalse:datos.data.data.getEmployeesResolvesSurveyRPFalse})
            // console.log("hay datos RPFalse  " ,datos ) 
          }).catch(err=>{
            // console.log("error", err.response)
          })
 
    axios({
      url:  url,
      method:'post',
      data:{
      query:`
      query{
        getEmployeesResolvesSurveyEEO(data:"${[idAdmin]}"){
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
            this.setState({empleadosEEO:datos.data.data.getEmployeesResolvesSurveyEEO})

          }).catch(err=>{
            // console.log("error", err.response)
          })

    axios({
      url:  url,
      method:'post',
      data:{
      query:`
      query{
        getEmployeesResolvesSurveyEEOFalse(data:"${[idAdmin]}"){
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
            this.setState({empleadosEEOFalse:datos.data.data.getEmployeesResolvesSurveyEEOFalse})
            // console.log("datosFalse" ,datos.data.data.getEmployeesResolvesSurveyEEOFalse )
          }).catch(err=>{
            // console.log("error", err.response)
          })


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
    let Alerta;
    let dep;
    let suc;
    let pues;
    let alertaPuesto = localStorage.getItem("PuestoActivo")
    let alertaSucursal=localStorage.getItem("SucursalActiva")
    let AlertaDepartamento = localStorage.getItem("DepartamentoActivo")
   let empleadoAc=localStorage.getItem("empleadoActivo")
    if(empleadoAc=="false"){
     Alerta =   <Alert color="danger"> Estimado Usuario usted debe Contar con almenos 1 usuario Registrado </Alert>
    }if(AlertaDepartamento=="false"){
      dep =   <Alert color="danger"> Estimado Usuario usted debe Contar con almenos 1 Departamento Registrado</Alert>
    }if(alertaSucursal=="false"){
      suc =   <Alert color="danger"> Estimado Usuario usted debe Contar con almenos 1 Centro de Trabajo Registrado</Alert>
    }if(alertaPuesto=="false"){
      pues =   <Alert color="danger"> Estimado Usuario usted debe Contar con almenos 1 Puesto Registrado</Alert>
    }


    let expiro;
    if(this.state.licencia){

      expiro = <Alert color="danger" className="text-center ">{this.state.licencia}</Alert>

    }

    let empleadoATSDetectado;
    if(this.state.empleadosAtsDetectado.length != 0){ 
      empleadoATSDetectado=<MDBContainer >
        <MDBModal isOpen={this.state.modal10} toggle={this.toggle(10)} size="md">
          <MDBModalHeader toggle={this.toggle(10)}>
          <Alert color="danger"> Empleado con ATS Detectado</Alert>
          </MDBModalHeader>
          <MDBModalBody>
      
          <Paper >
          <MDBCard>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar>ATS</Avatar>
            </Grid>
            <Grid item xs>
          <Typography>   
          <MDBContainer >
          <TableContainer align="left">
          <Table  >
            
            <TableBody>
              {this.state.empleadosAtsDetectado.map(row => (
                
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.nombre}
                  </TableCell>
                  <TableCell align="left">{row.ApellidoP}</TableCell>
                  <TableCell align="left">{row.ApellidoM}</TableCell>              
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        </MDBContainer>
        </Typography>
            </Grid>
          </Grid>
          </MDBCard>
        </Paper>
    </MDBModalBody>   
        </MDBModal>
      </MDBContainer>      
    }

     let modal;
     let modalFalse;
     let modalRP;
     let modalRPFalse;
     let modalEEO;
     let modalEEOFalse;
     if(this.state.modal16){
  
      if(this.state.empleadosAts[0]){

        modal  =  <MDBContainer >
        <MDBModal isOpen={this.state.modal16} toggle={this.toggle(16)} size="lg">
          <MDBModalHeader toggle={this.toggle(16)}>
            Empleados Evaluacion ATS Contestado
          </MDBModalHeader>
          <MDBModalBody>
          <TableContainer component={Paper} align="center">
       <Table  aria-label="simple table" style={{width:650}}>
         <TableHead>
           <TableRow>
             <TableCell align="center">Nombre</TableCell>
             <TableCell align="center">Apellido Paterno</TableCell>
             <TableCell align="center">Apellido Materno</TableCell>
             <TableCell align="center">Correo</TableCell>
            
           </TableRow>
         </TableHead>
         <TableBody>
          {this.state.empleadosAts.map(row => (
             <TableRow key={row.id}>
               
               <TableCell component="th" scope="row">
                 {row.nombre}
               </TableCell>
               <TableCell align="center">{row.ApellidoP}</TableCell>
               <TableCell align="center">{row.ApellidoM}</TableCell>
               <TableCell align="center">{row.correo}</TableCell>
              
             </TableRow>
             ))}
         </TableBody>
       </Table>
     </TableContainer>
          </MDBModalBody>   
        </MDBModal>
      </MDBContainer>
      }else{
        DialogUtility.alert({
          animationSettings: { effect: 'Fade' },           
          title: 'Sus colaboradores aún no han Realizado la evaluación',
          position: "fixed",
        
        }
        )
      }

     }

     if(this.state.modal15){
     if(this.state.empleadosAtsFalse[0]){

      modalFalse  =  <MDBContainer >
      <MDBModal isOpen={this.state.modal15} toggle={this.toggle(15)} size="lg">
        <MDBModalHeader toggle={this.toggle(15)}>
          Empleados Evaluacion ATS No Contestado
        </MDBModalHeader>
        <MDBModalBody>
        <TableContainer component={Paper} align="center">
     <Table  aria-label="simple table" style={{width:650}}>
       <TableHead>
         <TableRow>
           <TableCell align="center">Nombre</TableCell>
           <TableCell align="center">Apellido Paterno</TableCell>
           <TableCell align="center">Apellido Materno</TableCell>
           <TableCell align="center">Correo</TableCell>
          
         </TableRow>
       </TableHead>
       <TableBody>
        {this.state.empleadosAtsFalse.map(row => (
           <TableRow key={row.id}>
             <TableCell component="th" scope="row">
               {row.nombre}
             </TableCell>
             <TableCell align="center">{row.ApellidoP}</TableCell>
             <TableCell align="center">{row.ApellidoM}</TableCell>
             <TableCell align="center">{row.correo}</TableCell>
            
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

  if(this.state.modal14){
  
    if(this.state.empleadosRP[0]){

      modalRP  =  <MDBContainer >
      <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} size="lg">
        <MDBModalHeader toggle={this.toggle(14)}>
          Empleados Evaluacion RP Contestado
        </MDBModalHeader>
        <MDBModalBody>
        <TableContainer component={Paper} align="center">
     <Table  aria-label="simple table" style={{width:650}}>
       <TableHead>
         <TableRow>
           <TableCell align="center">Nombre</TableCell>
           <TableCell align="center">Apellido Paterno</TableCell>
           <TableCell align="center">Apellido Materno</TableCell>
           <TableCell align="center">Correo</TableCell>
          
         </TableRow>
       </TableHead>
       <TableBody>
        {this.state.empleadosRP.map(row => (
           <TableRow key={row.id}>
             <TableCell component="th" scope="row">
               {row.nombre}
             </TableCell>
             <TableCell align="center">{row.ApellidoP}</TableCell>
             <TableCell align="center">{row.ApellidoM}</TableCell>
             <TableCell align="center">{row.correo}</TableCell>
            
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

   if(this.state.modal13){
  
    if(this.state.empleadosRPFalse[0]){

      modalRPFalse  =  <MDBContainer >
      <MDBModal isOpen={this.state.modal13} toggle={this.toggle(13)} size="lg">
        <MDBModalHeader toggle={this.toggle(13)}>
          Empleados Evaluacion RP No Contestado
        </MDBModalHeader>
        <MDBModalBody>
        <TableContainer component={Paper} align="center">
     <Table  aria-label="simple table" style={{width:650}}>
       <TableHead>
         <TableRow>
           <TableCell align="center">Nombre</TableCell>
           <TableCell align="center">Apellido Paterno</TableCell>
           <TableCell align="center">Apellido Materno</TableCell>
           <TableCell align="center">Correo</TableCell>
          
         </TableRow>
       </TableHead>
       <TableBody>
        {this.state.empleadosRPFalse.map(row => (
           <TableRow key={row.id}>
             <TableCell component="th" scope="row">
               {row.nombre}
             </TableCell>
             <TableCell align="center">{row.ApellidoP}</TableCell>
             <TableCell align="center">{row.ApellidoM}</TableCell>
             <TableCell align="center">{row.correo}</TableCell>
            
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

   if(this.state.modal11){
  
    if(this.state.empleadosEEO[0]){

      modalEEO  =  <MDBContainer >
      <MDBModal isOpen={this.state.modal11} toggle={this.toggle(11)} size="lg">
        <MDBModalHeader toggle={this.toggle(11)}>
          Empleados Evaluacion EEO Contestado
        </MDBModalHeader>
        <MDBModalBody>
        <TableContainer component={Paper} align="center">
     <Table  aria-label="simple table" style={{width:650}}>
       <TableHead>
         <TableRow>
           <TableCell align="center">Nombre</TableCell>
           <TableCell align="center">Apellido Paterno</TableCell>
           <TableCell align="center">Apellido Materno</TableCell>
           <TableCell align="center">Correo</TableCell>
          
         </TableRow>
       </TableHead>
       <TableBody>
        {this.state.empleadosEEO.map(row => (
           <TableRow key={row.id}>
             <TableCell component="th" scope="row">
               {row.nombre}
             </TableCell>
             <TableCell align="center">{row.ApellidoP}</TableCell>
             <TableCell align="center">{row.ApellidoM}</TableCell>
             <TableCell align="center">{row.correo}</TableCell>
            
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

   if(this.state.modal12){
  
    if(this.state.empleadosEEOFalse[0]){

      modalEEOFalse  =  <MDBContainer >
      <MDBModal isOpen={this.state.modal12} toggle={this.toggle(12)} size="lg">
        <MDBModalHeader toggle={this.toggle(12)}>
          Empleados Evaluacion EEO No Contestado
        </MDBModalHeader>
        <MDBModalBody>
        <TableContainer component={Paper} align="center">
     <Table  aria-label="simple table" style={{width:650}}>
       <TableHead>
         <TableRow>
           <TableCell align="center">Nombre</TableCell>
           <TableCell align="center">Apellido Paterno</TableCell>
           <TableCell align="center">Apellido Materno</TableCell>
           <TableCell align="center">Correo</TableCell>
          
         </TableRow>
       </TableHead>
       <TableBody>
        {this.state.empleadosEEOFalse.map(row => (
           <TableRow key={row.id}>
             <TableCell component="th" scope="row">
               {row.nombre}
             </TableCell>
             <TableCell align="center">{row.ApellidoP}</TableCell>
             <TableCell align="center">{row.ApellidoM}</TableCell>
             <TableCell align="center">{row.correo}</TableCell>
            
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
    const container = { width: 1000, height: 500 }
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
        <MDBCard style={{ width: "25rem" ,marginTop:60}}>
          <MDBCardBody>        
          <strong>Empleados Evaluación ATS</strong>
         <MDBCardHeader><strong>Realizada : {this.state.empleadosAts.length} </strong>  <IconButton onClick={this.toggle(16)}> <RemoveRedEyeOutlinedIcon /></IconButton> <strong>No Realizada : {this.state.empleadosAtsFalse.length}</strong><IconButton onClick={this.toggle(15)}> <RemoveRedEyeOutlinedIcon /></IconButton></MDBCardHeader>                 
       </MDBCardBody>
      </MDBCard>

      <MDBCard style={{ width: "25rem" ,marginTop:5}}>
          <MDBCardBody>        
          <strong>Empleados Evaluación RP</strong>
         <MDBCardHeader><strong>Realizada : {this.state.empleadosRP.length} </strong>  <IconButton onClick={this.toggle(14)}> <RemoveRedEyeOutlinedIcon /></IconButton> <strong>No Realizada : {this.state.empleadosRPFalse.length} </strong><IconButton onClick={this.toggle(13)}> <RemoveRedEyeOutlinedIcon /></IconButton></MDBCardHeader>                  
       </MDBCardBody>
      </MDBCard>

      <MDBCard style={{ width: "25rem" ,marginTop:5}}>
          <MDBCardBody>        
          <strong>Empleados Evaluación EEO</strong>
         <MDBCardHeader><strong>Realizada : {this.state.empleadosEEO.length} </strong>  <IconButton onClick={this.toggle(11)}> <RemoveRedEyeOutlinedIcon /></IconButton> <strong>No Realizada : {this.state.empleadosEEOFalse.length} </strong><IconButton onClick={this.toggle(12)}> <RemoveRedEyeOutlinedIcon /></IconButton></MDBCardHeader>                  
       </MDBCardBody>
      </MDBCard>
        {/* <MDBContainer className=" mt-5 pt-5" ><Alert color = "primary">Su licencia caduca en undefined dias</Alert>  <ProgressBar/></MDBContainer> */}
        </MDBCol>
        <MDBCol>
        <MDBCard style={{ width: "22rem" ,marginTop:60,marginLeft:100}}>
          <MDBCardBody>        
          <MDBCardTitle>Su Licencia caduca en :</MDBCardTitle>
         <MDBCardHeader>{this.state.dias} Dias  {this.state.horas} horas {this.state.minutos} minutos {this.state.segundos} segundos
          <br/>
          <br/>
          <strong>Licencia de 1-15 Usuarios</strong>
          <br/>
          <br/>
          <strong>Empleados Totales : {this.state.totalEmpleados}</strong>
          <br/>
          <br/>
          <strong>Empleados Restantes : {(15-this.state.totalEmpleados)}</strong>
        
         
         </MDBCardHeader>      
         
        {expiro}
       </MDBCardBody>
      </MDBCard >
      <MDBCard style={{ width: "22rem",marginLeft:100,marginTop:5}}>
          <MDBCardBody>        
         <MDBCardHeader><strong>Acciones a Realizar </strong> <IconButton onClick={this.toggle(10)}> <RemoveRedEyeOutlinedIcon /></IconButton></MDBCardHeader>                  
       </MDBCardBody>
      </MDBCard>
      {pues}
      </MDBCol>
      </MDBRow>
        {modal}
        {modalFalse}
        {modalRP}
        {modalRPFalse}
        {modalEEOFalse}
        {modalEEO}
        {empleadoATSDetectado}
        {Alerta}
        {dep}
        {suc}
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

