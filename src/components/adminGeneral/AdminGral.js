import React from 'react';
import {MDBRow,MDBBtn, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBCol, MDBCardHeader, MDBTable} from 'mdbreact';
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'
import Paper from '@material-ui/core/Paper';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import MiniDrawer from './Sidebar'


import {
  Grid,
  Button,

} from '@material-ui/core';
import axios from 'axios'
import {Alert} from 'reactstrap';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';


class AdminGral extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        collapse: false,
        datos:[],
    
      };
      this.getEmployees = this.getEmployees.bind(this);

      
    }
  
    componentWillMount(){
        this.getEmployees()
    }
    onClick() {
      this.setState({
        collapse: !this.state.collapse,
      });
    }

    getEmployees(){
        var correo  =localStorage.getItem("correo")       
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
              ATSContestado
              RPContestado
              EEOContestado
                }
              }
              `
          }
              }).then((datos) => {
               
                this.setState({ datos: datos.data.data.getUsersTableEmployees});

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
               <MiniDrawer/>
                <MDBNavbarBrand a href="./inicio">
                <AppNavbarBrand
                    full={{ src: logo, width: 80, height: 25, alt: 'ADS' }} />               
                </MDBNavbarBrand>
                <MDBNavbarBrand>
                <strong> Administración general de  Mi Empresa </strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.onClick} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
  
                </MDBCollapse>
              </MDBNavbar>
            
            </header>
                <MDBContainer style={container} >
                    <MDBRow style={{ marginTop:60}}>

                    <MDBCol>
                    <Alert  color="primary">Nota : Puede editar los diferentes campos desde el menú Hamburguesa</Alert>    

                    <Paper >

                    <MDBCard  >
                        <MDBCardBody>
                        <MDBCardTitle>Empleados totales</MDBCardTitle>
      
                              
                                <Table bordered>
                           
                                  <TableBody>
                                    {this.state.datos.map(rows => {
                                      return (
                                        <TableRow >
                                          <TableCell component="th" scope="row">
                                            {rows.id}
                                          </TableCell>
                                          <TableCell >{rows.nombre}</TableCell>
                                          <TableCell  >{rows.ApellidoP}</TableCell>
                                          <TableCell  >{rows.ApellidoM}</TableCell>
                                          <TableCell  >{rows.Curp}</TableCell>
                                          <TableCell  >{rows.Ciudad}</TableCell>
                                          <TableCell  >{rows.Sexo}</TableCell>
                                          <TableCell  >{rows.rfc} </TableCell>
                                        </TableRow>
                                        
                                      );
                                    })}
                                  </TableBody>
                          
                          
                          </Table>
                     

                        </MDBCardBody>
                    </MDBCard>
                    </Paper>
  
                    </MDBCol>
                    <MDBCol>
                    <Paper style={{ width: "33rem"}}>
                    <MDBCard  style={{ width: "33rem" ,marginTop:60}}>
                        <MDBCardBody>
                        <MDBCardTitle>Centros de Trabajo</MDBCardTitle>
                   
                        </MDBCardBody>
                    </MDBCard>
                    </Paper>
                    </MDBCol>
                    </MDBRow>

                    <MDBRow>
                    <MDBCol>
                    <Paper style={{ width: "33rem"}}>
                    <MDBCard  style={{ width: "33rem" ,marginTop:25}}>
                        <MDBCardBody>
                        <MDBCardTitle>Departamentos</MDBCardTitle>
                   
                        </MDBCardBody>
                    </MDBCard>
                    </Paper>
  
                    </MDBCol>
                    <MDBCol>
                    <Paper style={{ width: "33rem"}}>
                    <MDBCard  style={{ width: "33rem" ,marginTop:25}}>
                        <MDBCardBody>
                        <MDBCardTitle>Puestos</MDBCardTitle>
                   
                        </MDBCardBody>
                    </MDBCard>
                    </Paper>
                    </MDBCol>
                    </MDBRow>
                 </MDBContainer>
        </div>
  
       
        </React.Fragment>
      );
    }
  }
  
  
  
  export default AdminGral;
  
  