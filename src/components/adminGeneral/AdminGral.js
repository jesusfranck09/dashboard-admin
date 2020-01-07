import React from 'react';
import {MDBRow,MDBBtn, MDBContainer, MDBNavbar,MDBNavbarNav, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBCol, MDBCardHeader, MDBTable} from 'mdbreact';
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'
import Paper from '@material-ui/core/Paper';
import inicio from '../images/house.png'

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import MiniDrawer from './Sidebar'
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { DialogUtility } from '@syncfusion/ej2-popups';

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
        datosSucursales:[],
        datosDeptos:[],
        datosPuestos:[],
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
                console.log("los datos de los empleados" , datos.data.data.getUsersTableEmployees) 
              })

              .catch((error) => {
          
                //console.log("errores" ,error.response.data.errors[0].message)
                console.log(".cartch" , error.response)
            });  

              axios({
              url:  url,
              method:'post',
              data:{
              query:`
              query{
                getSucursales(data:"${correo}"){
                  id
                  nombreSucursal
                  calle
                  numExt
                  numInt
                  colonia
                  CP
                  Ciudad
                  Estado
                  rfc
                  telefono
                  correo
                  fk_administrador
                    }
                  }
                  `
              }
              }).then((datos) => {
               console.log("datos correctos" ,datos.data.data.getSucursales)
                this.setState({ datosSucursales: datos.data.data.getSucursales});

              })

              .catch((error) => {
                
                //console.log("errores" ,error.response.data.errors[0].message)
                console.log(".cartch" , error.response)
            });  

            axios({
              url:  url,
              method:'post',
              data:{
              query:`
              query{
                getDeptos(data:"${correo}"){
                  id
                  nombre
                  fk_Administrador                 
                    }
                  }
                  `
              }
                  }).then((datos) => {
                   
                    console.log("datos correctos" , datos.data.data.getDeptos)
                     this.setState({ datosDeptos: datos.data.data.getDeptos});
    
                  })
    
                  .catch((error) => {
              
                    //console.log("errores" ,error.response.data.errors[0].message)
                    console.log(".cartch" , error.response)
                });  

                axios({
                  url:  url,
                  method:'post',
                  data:{
                  query:`
                  query{
                    getPuestos(data:"${correo}"){
                      id
                      nombre
                      fk_Administrador                 
                        }
                      }
                      `
                  }
                      }).then((datos) => {
                         this.setState({ datosPuestos: datos.data.data.getPuestos});
                      })
        
                      .catch((error) => {
                  
                        //console.log("errores" ,error.response.data.errors[0].message)
                        console.log(".cartch" , error.response)
                    });  
    }


          delete(i,id){
            let rows = [...this.state.datos]
            rows.splice(i, 1)
            this.setState({ 
              datos: rows
            })

            var correo  =localStorage.getItem("correo")       
            const url = 'http://localhost:8000/graphql'

              axios({
                url:  url,
                method:'post',
                data:{
                query:`
                mutation{
                  deleteEmployees(data:"${[id,correo]}"){
                   message               
                      }
                    }
                    `
                }
                    }).then((datos) => {
                      DialogUtility.alert({
                        animationSettings: { effect: 'Fade' },        
                        title:"AVISO!",   
                        content: 'Empleado Eliminado Exitosamente',
                        position: "fixed",
                      
                      }
                      )
                    })

                    .catch((error) => {
                
                      //console.log("errores" ,error.response.data.errors[0].message)
                      console.log(".cartch" , error.response)
                  });  
            

          }


          update(i,id){
            let rows = [...this.state.datos]
            rows.splice(i, 1)
            this.setState({ 
              datos: rows
            })

            var correo  =localStorage.getItem("correo")       
            const url = 'http://localhost:8000/graphql'

              axios({
                url:  url,
                method:'post',
                data:{
                query:`
                mutation{
                  deleteEmployees(data:"${[id,correo]}"){
                   message               
                      }
                    }
                    `
                }
                    }).then((datos) => {
                      
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
                <MDBNavbarBrand>              
                </MDBNavbarBrand>
                <MDBNavbarNav right> 
                <MDBNavbarBrand a href="./inicio">

                <AppNavbarBrand full={{ src: inicio, width: 30, height: 25, alt: 'Inicio' }} />              
                Página Principal  
              </MDBNavbarBrand>
              </MDBNavbarNav>
                <MDBNavbarToggler onClick={this.onClick} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
                </MDBCollapse>
              </MDBNavbar>
            </header>
                <MDBContainer style={container} >
                    <MDBRow style={{ marginTop:60}}>

                    <MDBCol>
                    <Alert  color="primary">Nota : Puede editar y/o eliminar los campos si así lo desea</Alert>    

                    <Paper >

                    <MDBCard  >
                        <MDBCardBody>
                        <MDBCardTitle>Empleados totales</MDBCardTitle>
      
                              
                                <Table bordered>
                           
                                  <TableBody>
                                    {this.state.datos.map((rows,i )=> {
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
                                          
                                          <IconButton onClick={(e) => { if (window.confirm('Está seguro de Eliminar a este Empleado ? , Los datos se perderán')) this.delete(i,rows.id)} } >
                                              <DeleteIcon />
                                            </IconButton>

                                            <IconButton onClick={(e) => this.update(i,rows.id)}>
                                              <CreateOutlinedIcon />
                                            </IconButton>

                                            
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
                    <Paper >
                    <MDBCard >
                        <MDBCardBody>
                        <MDBCardTitle>Centros de Trabajo</MDBCardTitle>
                   
                        </MDBCardBody>
                         
                        <Table bordered>
                           
                           <TableBody>
                             {this.state.datosSucursales.map(rows => {
                               return (
                                 <TableRow >
                                   <TableCell component="th" scope="row">
                                     {rows.id}
                                   </TableCell>
                                   <TableCell >{rows.nombreSucursal}</TableCell>
                                   <TableCell  >{rows.calle}</TableCell>
                                   <TableCell  >{rows.numExt}</TableCell>
                                   <TableCell  >{rows.numInt}</TableCell>
                                   <TableCell  >{rows.colonia}</TableCell>
                                   <TableCell  >{rows.CP}</TableCell>
                                   <TableCell  >{rows.Ciudad} </TableCell>
                                   <TableCell  >{rows.Estado}</TableCell>
                                   <TableCell  >{rows.rfc} </TableCell>
                                   <TableCell  >{rows.telefono}</TableCell>
                                   <TableCell  >{rows.correo} </TableCell>
                                 </TableRow>                                
                               );
                             })}
                           </TableBody>
                   </Table>
                    </MDBCard>
                    </Paper>
                    <MDBRow>
                      <MDBCol>
                    <Paper style={{ width: "22rem" }}>
                    <MDBCard style={{ width: "22rem" }}>
                        <MDBCardBody>
                        <MDBCardTitle>Departamentos Actuales</MDBCardTitle>
                   
                        </MDBCardBody>
                         
                        <Table bordered>
                           
                           <TableBody>
                             {this.state.datosDeptos.map(rows => {
                               return (
                                 <TableRow >
                                   <TableCell component="th" scope="row">
                                     {rows.id}
                                   </TableCell>
                                 <TableCell ><strong> {rows.nombre}</strong> </TableCell>
                                
                                 </TableRow>                                
                               );
                             })}
                           </TableBody>
                   </Table>
                    </MDBCard>
                    </Paper>
                    </MDBCol>
                    <MDBCol>
                    <Paper style={{ width: "22rem" }}>
                    <MDBCard style={{ width: "22rem" }} >
                        <MDBCardBody>
                        <MDBCardTitle>Puestos Actuales</MDBCardTitle>
                   
                        </MDBCardBody>
                         
                        <Table bordered>
                           
                           <TableBody>
                             {this.state.datosPuestos.map(rows => {
                               return (
                                 <TableRow >
                                   <TableCell component="th" scope="row">
                                     {rows.id}
                                   </TableCell>
                                 <TableCell ><strong> {rows.nombre}</strong> </TableCell>
                           
                                 </TableRow>                                
                               );
                             })}
                           </TableBody>
                   </Table>
                    </MDBCard>
                    </Paper>
                    </MDBCol>
                    </MDBRow>
                    </MDBCol>
                    <MDBCol>


                    </MDBCol>
                    </MDBRow>
                 </MDBContainer>
        </div>
        </React.Fragment>
      );
    }
  }
  
  
  
  export default AdminGral;
  
  