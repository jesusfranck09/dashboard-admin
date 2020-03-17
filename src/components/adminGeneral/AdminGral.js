import React, { useState, useCallback } from 'react';
import {MDBRow,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBContainer, MDBNavbar,MDBNavbarNav, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBCol, MDBCardHeader, MDBTable} from 'mdbreact';
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'
import Paper from '@material-ui/core/Paper';
import inicio from '../images/house.png'
import { API} from '../utils/http'

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import MiniDrawer from './Sidebar'
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { Form, Field } from 'react-final-form';
import { TextField ,Select} from 'final-form-material-ui';
import {
	MenuItem,
  } from '@material-ui/core';
  import MenuIcon from '@material-ui/icons/Menu';
  import 'date-fns';
  import DateFnsUtils from '@date-io/date-fns';
import {
  Grid,
  Button,

} from '@material-ui/core';
import diagnostico from '../images/diagnostico.png'
import axios from 'axios'
import {Alert} from 'reactstrap';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import esLocale from "date-fns/locale/es";
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';

class AdminGral extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        collapse: false,
        datos:[],
        datosSucursales:[],
        datosDeptos:[],
        datosPuestos:[],
        modal13: false,
        modal14: false,
        modal15: false,
        modal16: false,
        updateRows:[],
        updateRowsSucursales:[],
        updateRowsDeptos:[],
        updateRowsPuestos:[],
        periodo:[],
        inicial:null,
        final:null,
        Alerta1:null,
        Alerta2:null,
        Alerta3:null,
        registrarPeriodo:'',
        editarPeriodo:'',
        imagePreviewUrl: ''
        // periodoDesactivado:[],
      };
      this.getEmployees = this.getEmployees.bind(this);

      this.handleImageChange = this.handleImageChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    componentWillMount(){
        this.getEmployees()
        const idAdmin = localStorage.getItem("idAdmin")
        // const url = 'http://localhost:8000/graphql'
        axios({
          url:  API,
          method:'post',
          data:{
          query:`
           query{
            getPeriodo(data:"${[idAdmin]}"){
              idEventos
              fk_administrador
              Descripcion

                  }
                }
              `
          }
        })
        .then(datos => {	
          console.log("exito eventos",datos)
          this.setState({periodo:datos.data.data.getPeriodo})
        }).catch(err=>{
          console.log("error",err.response)
        })

    }
    onClick() {
      this.setState({
        collapse: !this.state.collapse,
      });
    }

    getEmployees(){
        var correo  =localStorage.getItem("correo") 
        const idAdmin= localStorage.getItem("idAdmin") 
        // const url = 'http://localhost:8000/graphql'
        axios({
          url:  API,
          method:'post',
          data:{
          query:`
          query{
            getUsersTableEmployees(data:"${idAdmin}"){
              id
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
              url:  API,
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
                  actividad
                  telefono
                  actividades
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
              url:  API,
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
                  url:  API,
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
            // const url = 'http://localhost:8000/graphql'

              axios({
                url:  API,
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

          deleteSucursales(i,id){
            let rows = [...this.state.datosSucursales]
            rows.splice(i, 1)
            this.setState({ 
              datosSucursales: rows
            })
            
            var correo  = localStorage.getItem("correo")       
            // const url = 'http://localhost:8000/graphql'

              axios({
                url:  API,
                method:'post',
                data:{
                query:`
                mutation{
                  deleteSucursales(data:"${[id,correo]}"){
                   message               
                      }
                    }
                    `
                }
                    }).then((datos) => {
                      DialogUtility.alert({
                        animationSettings: { effect: 'Fade' },        
                        title:"AVISO!",   
                        content: 'Sucursal Eliminada Exitosamente',
                        position: "fixed",
                      
                      }
                      )
                    })

                    .catch((error) => {
                      console.log(".cartch" , error.response)
                  });  
                }

                deleteDepartamentos(i,id){
                  let rows = [...this.state.datosDeptos]
                  rows.splice(i, 1)
                  this.setState({ 
                    datosDeptos: rows
                  })
                  
                  var correo  = localStorage.getItem("correo")       
                  // const url = 'http://localhost:8000/graphql'
      
                    axios({
                      url:  API,
                      method:'post',
                      data:{
                      query:`
                      mutation{
                        deleteDeptos(data:"${[id,correo]}"){
                         message               
                            }
                          }
                          `
                      }
                          }).then((datos) => {
                            DialogUtility.alert({
                              animationSettings: { effect: 'Fade' },        
                              title:"AVISO!",   
                              content: 'Departamento Eliminado Exitosamente',
                              position: "fixed",
                            
                            }
                            )
                          })
      
                          .catch((error) => {
                            console.log(".cartch" , error.response)
                        });  
                      }

                      deletePuestos(i,id){
                        let rows = [...this.state.datosPuestos]
                        rows.splice(i, 1)
                        this.setState({ 
                          datosPuestos: rows
                        })
                        
                        var correo  = localStorage.getItem("correo")       
                        // const url = 'http://localhost:8000/graphql'
            
                          axios({
                            url:  API,
                            method:'post',
                            data:{
                            query:`
                            mutation{
                              deletePuestos(data:"${[id,correo]}"){
                               message               
                                  }
                                }
                                `
                            }
                                }).then((datos) => {
                                  DialogUtility.alert({
                                    animationSettings: { effect: 'Fade' },        
                                    title:"AVISO!",   
                                    content: 'El Puesto fue Eliminado Exitosamente',
                                    position: "fixed",
                                  
                                  }
                                  )
                                })
            
                                .catch((error) => {
                                  console.log(".cartch" , error.response)
                              });  
                            }
      

                toggle = (nr,id) => () => {
                console.log("id rows",id)
                this.setState({updateRows:id} )
                  
                  let modalNumber = 'modal' + nr
                  this.setState({
                    [modalNumber]: !this.state[modalNumber]
                  });
                }

                toggleSucursales = (nr,id) => () => {
                  console.log("id rows",id)
                  this.setState({updateRowsSucursales:id} )
                  
                  let modalNumber = 'modal' + nr
                  this.setState({
                    [modalNumber]: !this.state[modalNumber]
                  });
                }

                toggleDeptos = (nr,id) => () => {
                  console.log("id rows deptos",id)
                  this.setState({updateRowsDeptos:id} )
                  
                  let modalNumber = 'modal' + nr
                  this.setState({
                    [modalNumber]: !this.state[modalNumber]
                  });
                }

                togglePuestos = (nr,id) => () => {
                  console.log("id rows deptos",id)
                  this.setState({updateRowsPuestos:id} )
                  
                  let modalNumber = 'modal' + nr
                  this.setState({
                    [modalNumber]: !this.state[modalNumber]
                  });
                }


                onSubmit (values) {
                };
        
          validate = values => {
                const errors = {};
                if (!values.nombre) {
                  errors.nombre = 'Este campo es requerido';
                }
                if (!values.ApellidoP) {
                  errors.ApellidoP = 'Este campo es requerido';
                }
                if (!values.ApellidoM) {
                  errors.ApellidoM = 'Este campo es requerido';
                }
                if (!values.Curp) {
                  errors.Curp = 'Este campo es requerido';
                }
                if (!values.rfc) {
                  errors.rfc = 'Este campo es requerido';
                }
                if (!values.FechaNacimiento) {
                  errors.FechaNacimiento = 'Este campo es requerido';
                }
                if (!values.sexo) {
                  errors.sexo = 'Este campo es requerido';
                }
                if (!values.cp) {
                  errors.cp = 'Este campo es requerido';
                }
                if (!values.EstadoCivil) {
                  errors.EstadoCivil = 'Este campo es requerido';
                }
                if (!values.correo) {
                  errors.correo = 'Este campo es requerido';
                }
                if (!values.Curp) {
                  errors.Curp = 'Este campo es requerido';
                }
                if (!values.AreaTrabajo) {
                  errors.AreaTrabajo = 'Este campo es requerido';
                }
                if (!values.Puesto) {
                  errors.Puesto = 'Este campo es requerido';
                }
                if (!values.Ciudad) {
                  errors.Ciudad = 'Este campo es requerido';
                }

                if (!values.NivelEstudios) {
                  errors.NivelEstudios = 'Este campo es requerido';
                }
                if (!values.TipoPersonal) {
                  errors.TipoPersonal = 'Este campo es requerido';
                }
                if (!values.JornadaTrabajo) {
                  errors.JornadaTrabajo = 'Este campo es requerido';
                }
                if (!values.TipoContratacion) {
                  errors.TipoContratacion = 'Este campo es requerido';
                }
                if (!values.TiempoPuesto) {
                  errors.TiempoPuesto = 'Este campo es requerido';
                }
                if (!values.ExperienciaLaboral) {
                  errors.ExperienciaLaboral = 'Este campo es requerido';
                }
    
                return errors;
              };


              validate3 = values => {
                const errors = {};
                if (!values.nombreDepto) {
                  errors.nombreDepto = 'Este campo es requerido';
                }
                
                return errors;
              };

              validate4 = values => {
                const errors = {};
                if (!values.nombrePuesto) {
                  errors.nombrePuesto = 'Este campo es requerido';
                }
                
                return errors;
              };
        


              validate2 = values => {
                const errors = {};
                if (!values.nombreSucursal) {
                  errors.nombreSucursal = 'Este campo es requerido';
                }
                if (!values.calle) {
                  errors.calle = 'Este campo es requerido';
                }
                if (!values.numExt) {
                  errors.numExt = 'Este campo es requerido';
                }
                if (!values.numInt) {
                  errors.numInt = 'Este campo es requerido';
                }
                if (!values.colonia) {
                  errors.colonia = 'Este campo es requerido';
                }
                if (!values.Ciudad) {
                  errors.Ciudad = 'Este campo es requerido';
                }
                if (!values.rfc) {
                  errors.rfc = 'Este campo es requerido';
                }
                if (!values.telefono) {
                  errors.telefono = 'Este campo es requerido';
                }
                if (!values.correo) {
                  errors.correo = 'Este campo es requerido';
                }

                if (!values.CP) {
                  errors.CP = 'Este campo es requerido';
                }
              
                return errors;
              };
        
              evaluar  = (values,id) =>{
                console.log("los valores son ",values,id)
               console.log("entro")
                // if(values){
                //   let modalNumber = 'modal' + 13
                //   this.setState({
                //     [modalNumber]: !this.state[modalNumber]
                //   });
                // }
                

                const nombre = values.nombre
                const ApellidoP = values.ApellidoP
                const ApellidoM = values.ApellidoM
                const Curp = values.Curp
                const rfc = values.rfc
                const sexo = values.sexo
                const cp = values.cp
                const correoEmployee =values.correo
                const AreaTrabajo= values.AreaTrabajo
                const Puesto = values.Puesto
                const Ciudad = values.Ciudad
                
                const correo = localStorage.getItem('correo')
        
                if(values.nombre){
                    // const url = 'http://localhost:8000/graphql'
                    axios({
                      url:  API,
                      method:'post',
                      data:{
                      query:`
                       mutation{
                        updateEmployees(data:"${[nombre,ApellidoP,ApellidoM,Curp,rfc,sexo,cp,correoEmployee,AreaTrabajo,Puesto,Ciudad,id,correo]}"){
                            message
                              }
                            }
                          `
                      }
                    })
                    .then(datos => {	
                      console.log("exito")
                      let modalNumber = 'modal' + 13
                      this.setState({
                        [modalNumber]: !this.state[modalNumber]
                      });
                      DialogUtility.alert({
                        animationSettings: { effect: 'Fade' },        
                        title:"AVISO!",   
                        content: 'Empleado Actualizado',
                        position: "fixed",
                      
                      }
                      )
                      this.setState({modal13:false})
                    })
                   
                } 
              }

              evaluarSucursales  = (values,id) =>{
                console.log("los valores son ",values,id)
               console.log("entro")
                // if(values){
                //   let modalNumber = 'modal' + 13
                //   this.setState({
                //     [modalNumber]: !this.state[modalNumber]
                //   });
                // }
                

                const nombreSucursal = values.nombreSucursal
                const calle = values.calle
                const numExt = values.numExt
                const numInt = values.numInt
                const colonia = values.colonia
                const CP = values.CP
                const rfc =values.rfc
                const telefono= values.telefono
                const correoSucursal = values.correo
                const Ciudad= values.Ciudad
            
                
                const correo = localStorage.getItem('correo')
        
                if(values.nombreSucursal){
                    // const url = 'http://localhost:8000/graphql'
                    axios({
                      url:  API,
                      method:'post',
                      data:{
                      query:`
                       mutation{
                        updateSucursales(data:"${[nombreSucursal,calle,numExt,numInt,colonia,CP,Ciudad,rfc,telefono,correoSucursal,id,correo]}"){
                            message
                              }
                            }
                          `
                      }
                    })
                    .then(datos => {	
                      console.log("exito")
                      let modalNumber = 'modal' + 14
                      this.setState({
                        [modalNumber]: !this.state[modalNumber]
                      });
                      DialogUtility.alert({
                        animationSettings: { effect: 'Fade' },        
                        title:"AVISO!",   
                        content: 'Sucursal Actualizada',
                        position: "fixed",
                      
                      }
                      )

                      this.setState({modal14:false})
                    })
                   
                } 
              }
              evaluarDeptos  = (values,id) =>{

                console.log("values" , values , id)
                const nombreDepto = values.nombreDepto  
                const correo = localStorage.getItem('correo')
        
                if(values.nombreDepto){
                    // const url = 'http://localhost:8000/graphql'
                    axios({
                      url:  API,
                      method:'post',
                      data:{
                      query:`
                       mutation{
                        updateDeptos(data:"${[nombreDepto,id,correo]}"){
                            message
                              }
                            }
                          `
                      }
                    })
                    .then(datos => {	
                      console.log("exito")
                      let modalNumber = 'modal' + 15
                      this.setState({
                        [modalNumber]: !this.state[modalNumber]
                      });
                      DialogUtility.alert({
                        animationSettings: { effect: 'Fade' },        
                        title:"AVISO!",   
                        content: 'Departamento Actualizado',
                        position: "fixed",
                      
                      }
                      )

                      this.setState({modal15:false})
                    })
                   
                } 
              }


              evaluarPuestos  = (values,id) =>{
            
                const nombrePuesto = values.nombrePuesto         
                const correo = localStorage.getItem('correo')
        
                if(values.nombrePuesto){
                    // const url = 'http://localhost:8000/graphql'
                    axios({
                      url:  API,
                      method:'post',
                      data:{
                      query:`
                       mutation{
                        updatePuestos(data:"${[nombrePuesto,id,correo]}"){
                            message
                              }
                            }
                          `
                      }
                    })
                    .then(datos => {	
                      console.log("exito")
                      let modalNumber = 'modal' + 16
                      this.setState({
                        [modalNumber]: !this.state[modalNumber]
                      });
                      DialogUtility.alert({
                        animationSettings: { effect: 'Fade' },        
                        title:"AVISO!",   
                        content: 'Puesto Actualizado',
                        position: "fixed",
                      
                      }
                      )

                      this.setState({modal16:false})
                    })
                   
                } 
              }
          NuevoPeriodo(values){
            if(values.NombrePeriodo && this.state.inicial && this.state.final && this.state.Alerta1&& this.state.Alerta1&& this.state.Alerta2&& this.state.Alerta3){

            const idAdmin=localStorage.getItem("idAdmin")
            // const url = 'http://localhost:8000/graphql'
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
               query{
                getEventos(data:"${[idAdmin]}"){
                    message
                      }
                    }
                  `
              }
            })
            .then(datos => {
              console.log("message",datos.data.data.getEventos.message)	
              if(datos.data.data.getEventos.message=="evento encontrado"){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'Hay un evento Activo por favor deshabilitelo y vuelva a intentar',
                  position: "fixed",
                }
                )
              }else if(datos.data.data.getEventos.message=="exito"){
                
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
               mutation{
                addPeriodo(data:"${[values.NombrePeriodo,this.state.inicial,this.state.final,this.state.Alerta1,this.state.Alerta2,this.state.Alerta3,idAdmin]}"){
                    message
                      }
                    }
                  `
              }
            })
            .then(datos => {	
              if(datos.data.data.addPeriodo.message=='registro exitoso'){
                console.log("exito",datos)
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'Periodo Registrado con Éxito',
                  position: "fixed",
                }
                )
                  window.location.reload();
              }else if(datos.data.data.addPeriodo.message=='periodo existente' ){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'El nombre del periodo ya fue registrado con anterioridad',
                  position: "fixed",
                }
                )
              }   
            })
              }
            }).catch(err=>{
              console.log("error en la consulta del evento" , err.response)}) 
            }else{
              DialogUtility.alert({
                animationSettings: { effect: 'Fade' },        
                title:"AVISO!",   
                content: 'Por favor ingrese algún valor',
                position: "fixed",
              }
              )
            }
          }

          editarPeriodo(values){  
            if(values.NombrePeriodo && this.state.final && this.state.Alerta1 && this.state.Alerta2 && this.state.Alerta3){    
            const idAdmin=localStorage.getItem("idAdmin")
            // const url = 'http://localhost:8000/graphql'    
            console.log("entro aqui")                  
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
               mutation{
                updatePeriodo(data:"${[values.NombrePeriodo,this.state.final,this.state.Alerta1,this.state.Alerta2,this.state.Alerta3,idAdmin]}"){
                    message
                      }
                    }
                  `
              }
            })
            .then(datos => {	
              if(datos.data.data.updatePeriodo.message=='evento existente'){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'El nombre del periodo ya corresponde a un evento registrado y deshabilitado con anterioridad por favor ingrese uno diferente',
                  position: "fixed",
                }
                )
              }else if (datos.data.data.updatePeriodo.message=='no hay eventos'){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'No existe ningun periodo Activo por favor registre uno antes de editar',
                  position: "fixed",
                }
                )
              }else if ( datos.data.data.updatePeriodo.message=='evento Actualizdo'){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'periodo Actualizado con éxito',
                  position: "fixed",
                }
                )
                window.location.reload();
              }
            }).catch(err=>{
              console.log("error" , err.response)
            })
          }else{
            DialogUtility.alert({
              animationSettings: { effect: 'Fade' },        
              title:"AVISO!",   
              content:'Por favor complete todos los campos',
              position: "fixed",
            }
            ) 
          }
          }

          DesactivarPeriodo(values){
            if(values.deshabilitar){
            const idAdmin=localStorage.getItem("idAdmin")
            // const url = 'http://localhost:8000/graphql'
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
               mutation{
                deletePeriodo(data:"${[values.deshabilitar,idAdmin]}"){
                    message
                      }
                    }
                  `
              }
            })
            .then(datos => {	
              console.log("exito",datos)
              DialogUtility.alert({
                animationSettings: { effect: 'Fade' },        
                title:"AVISO!",   
                content: 'Periodo Deshabilitado con Éxito',
                position: "fixed",
              
              }
              )

              window.location.reload();
            })
          }else{
            DialogUtility.alert({
              animationSettings: { effect: 'Fade' },        
              title:"AVISO!",   
              content: 'Por favor seleccione una opción',
              position: "fixed",
            }
            )
          }
          }

           handleDateChange = date => {
            this.setState({inicial:date})
          
          };
           handleDateChange2 = date2 => {
            this.setState({final:date2})
              console.log("data" , date2)
            };    
            handleAlerta1 = date => {
                this.setState({Alerta1:date})
         
                }; 
            handleAlerta2 = date => {
            this.setState({Alerta2:date})
            
            }; 
            handleAlerta3 = date => {
            this.setState({Alerta3:date})
        
                };  

                handleSubmit() {
                  // var fd = new FormData();
 
                  // fd.append('file', this.state.file);
                  // const idAdmin=localStorage.getItem("idAdmin")
                  // const url = 'http://localhost:8000/graphql'
                  // // axios({
                  // //   url:  url,
                  // //   method:'post',
                  // //   data:{
                  // //   query:`
                  // //   mutation{
                  // //     loadLogo(data:"${[idAdmin]}"){
                  // //         IMAGE
                  // //           }
                  // //         }
                  // //       `
                  // //   }
                  // // })
                  // // .then(datos => {	
                  // //   // console.log("exito",datos)
                  // //  
                  // // console.log("exito " ,datos)}).catch(err=>{
                  // //   console.log("error" , err.response)
                  // // })


                  // axios({
                  //   url:  url,
                  //   method:'post',
                  //   data:{
                  //   query:`
                  //   query{
                  //     getImage(data:"${[idAdmin]}"){
                  //         image
                  //           }
                  //         }
                  //       `
                  //   }
                  // })
                  // .then(datos => {	
                   
                  // console.log("exito " ,datos)}).catch(err=>{
                  //   console.log("error" , err.response)
                  // })
                  // TODO: do something with -> this.state.file
                }
              handleImageChange(e) {
                // e.preventDefault();
            
                let reader = new FileReader();
                let file = e.target.files[0];
            
                reader.onloadend = () => {
                  this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                  });
                }
                reader.readAsDataURL(file)
                console.log("file" , file)

                // console.log("image" , this.state.imagePreviewUrl)
              }
            
    render() {
      let {imagePreviewUrl} = this.state;
      let imagePreview = null;
      if (imagePreviewUrl) {
        imagePreview = (<img src={imagePreviewUrl} />);
      }

      let editarPeriodo;
      if(this.state.editarPeriodo=='1'){
       
        editarPeriodo =<Paper style={{ width: "70rem" }}>
            <MDBCard style={{ width: "70rem" }} >
                <MDBCardBody>
                <MDBCardTitle>Periodo de Evaluación</MDBCardTitle>
                    <Form
                  onSubmit={this.onSubmit}
                  render={({ handleSubmit, submitting,values }) => (
                    <form onSubmit={handleSubmit}>
                    
                          <MDBRow>
                         <MDBCol>    
                         <Paper>
                         <Grid item xs={12}  >
                            <Field
                              fullWidth
                              required
                              name="NombrePeriodo"
                              component={TextField}
                              type="text"
                             label="Nombre del Periodo"
                            />
                            </Grid>
                          <Grid item xs={12}  justify="center">
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                                  
                                  <KeyboardDatePicker
                                  margin="normal"
                                  id="date-picker-dialog"
                                  label="Fecha Final"
                                  format="dd/MM/yyyy"
                                  value={this.state.final}
                                  onChange={this.handleDateChange2}
                                  
                                  KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                  }}
                                  />

                              </MuiPickersUtilsProvider>     
                                              
                          </Grid>
                          
                          </Paper>        
                          </MDBCol>      
                          <MDBCol>                  
                            
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                                                   {/* <Alert color="danger">LAs alertas que ingrese enviaran un correo electrónico a sus empleados en caso de no haber contestado su evaluación</Alert> */}
                          <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              label="Alerta 1"
                              format="dd/MM/yyyy"
                              value={this.state.Alerta1}
                              onChange={this.handleAlerta1}
                              
                              KeyboardButtonProps={{
                                  'aria-label': 'change date',
                              }}
                              />
                          </MuiPickersUtilsProvider>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                                  
                                  <KeyboardDatePicker
                                  margin="normal"
                                  id="date-picker-dialog"
                                  label="Alerta 2"
                                  format="dd/MM/yyyy"
                                  value={this.state.Alerta2}
                                  onChange={this.handleAlerta2}
                                  
                                  KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                  }}
                                  />

                              </MuiPickersUtilsProvider>
                              <Grid>
                              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>     
                                  <KeyboardDatePicker
                                  margin="normal"
                                  id="date-picker-dialog"
                                  label="Alerta 3"
                                  format="dd/MM/yyyy"
                                  value={this.state.Alerta3}
                                  onChange={this.handleAlerta3}
                                  
                                  KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                  }}
                                  />

                              </MuiPickersUtilsProvider>
                              </Grid>
                   
                              <MDBBtn
                              // variant="contained"
                              color="success"                             
                              style={{marginTop:25}}
                              onClick={ e => this.editarPeriodo(values)}
                            >
                              Aceptar
                            </MDBBtn>          
                          </MDBCol> 
                        
                          </MDBRow>
                     
                    </form>
                        )}
                      />  
                </MDBCardBody>                     
                </MDBCard>
                </Paper>
      }

        let registrarPeriodo ;

        if(this.state.registrarPeriodo=='1'){
          
          registrarPeriodo =  <Paper style={{ width: "70rem" }}>
            <MDBCard style={{ width: "70rem" }} >
                <MDBCardBody>
                <MDBCardTitle>Periodo de Evaluación</MDBCardTitle>
                    <Form
                  onSubmit={this.onSubmit}
                  render={({ handleSubmit, submitting,values }) => (
                    <form onSubmit={handleSubmit}>
                    
                          <MDBRow>
                         <MDBCol>    
                         <Paper>
                       
                            <Field
                              fullWidth
                              required
                              name="NombrePeriodo"
                              component={TextField}
                              type="text"
                             label="Nombre del Periodo"
                            />

                          <Grid item xs={12}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                          <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              label="Fecha Inicial"
                              format="dd/MM/yyyy"
                              value={this.state.inicial}
                              onChange={this.handleDateChange}
                              
                              KeyboardButtonProps={{
                                  'aria-label': 'change date',
                              }}
                              />
                          </MuiPickersUtilsProvider>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                                  
                                  <KeyboardDatePicker
                                  margin="normal"
                                  id="date-picker-dialog"
                                  label="Fecha Final"
                                  format="dd/MM/yyyy"
                                  value={this.state.final}
                                  onChange={this.handleDateChange2}
                                  
                                  KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                  }}
                                  />

                              </MuiPickersUtilsProvider>                                 
                          </Grid>
                          <MDBBtn
                              // variant="contained"
                              color="primary"
                              type="submit"
                              disabled={submitting}
                              onClick={(e) =>this.NuevoPeriodo(values)}
                            >
                              Registrar
                            </MDBBtn>
                          </Paper>        
                          </MDBCol>      
                          <MDBCol>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                                                   {/* <Alert color="danger">LAs alertas que ingrese enviaran un correo electrónico a sus empleados en caso de no haber contestado su evaluación</Alert> */}
                          <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              label="Alerta 1"
                              format="dd/MM/yyyy"
                              value={this.state.Alerta1}
                              onChange={this.handleAlerta1}
                              
                              KeyboardButtonProps={{
                                  'aria-label': 'change date',
                              }}
                              />
                          </MuiPickersUtilsProvider>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                                  
                                  <KeyboardDatePicker
                                  margin="normal"
                                  id="date-picker-dialog"
                                  label="Alerta 2"
                                  format="dd/MM/yyyy"
                                  value={this.state.Alerta2}
                                  onChange={this.handleAlerta2}
                                  
                                  KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                  }}
                                  />

                              </MuiPickersUtilsProvider>
                              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>     
                                  <KeyboardDatePicker
                                  margin="normal"
                                  id="date-picker-dialog"
                                  label="Alerta 3"
                                  format="dd/MM/yyyy"
                                  value={this.state.Alerta3}
                                  onChange={this.handleAlerta3}
                                  
                                  KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                  }}
                                  />

                              </MuiPickersUtilsProvider>
                          </MDBCol>  
                          </MDBRow>
                     
                    </form>
                        )}
                      />  
                
                <MDBRow> 
                <MDBCol>   
                <Form
                  onSubmit={this.onSubmit}
                  render={({ handleSubmit, submitting,values }) => (
                    <form onSubmit={handleSubmit}>
                      <Paper style={{ padding: 10} }>
                       <MDBRow>  
                         <MDBCol>
                         <Grid item xs={12}>
                          <Field
                          fullWidth
                          name="deshabilitar"
                          component={Select}
                          label="Seleccione el Periodo a Deshabilitar"
                          formControlProps={{ fullWidth: true }}
                          >
                         {this.state.periodo.map(row=>{
                          return(<MenuItem value={row.Descripcion}>{row.Descripcion}</MenuItem>)
                          })}
                          </Field>
                          </Grid>
                          </MDBCol>
                          <MDBCol>
                              
                          <MDBBtn
                              style={{marginTop:14}}
                              color="danger"
                              type="submit"
                              disabled={submitting}
                              onClick={(e) => { if (window.confirm('Si desactiva el periodo no podrá habilitarlo nuevamente, Desea Continuar?')) this.DesactivarPeriodo(values)} }
                          > 
                              Deshabilitar Periodo
                             </MDBBtn>
                            
                              </MDBCol>
                          </MDBRow>
                     
                      </Paper>
                    </form>
                        )}
                      />  </MDBCol>
                      </MDBRow>         
                </MDBCardBody>                     
                </MDBCard>
                </Paper>
        }

        const localeMap = {
            es: esLocale
          }; 

          const locale = "es";

      let periodo;
      if(this.state.periodo.length == 0){
       periodo = <Alert color="danger"> AVISO! : Por favor Registre otro periodo antes de salir, "Su sistema podria funcionar de manera Incorrecta". </Alert> 

      }
      let modal 
      let modalSucursales
      let modalDeptos
      let modalPuestos
      if(this.state.modal13){
       modal  =  <MDBContainer>
        <MDBModal isOpen={this.state.modal13} toggle={this.toggle(13)}>
          <MDBModalHeader toggle={this.toggle(13)}>
            Actualizar Empleados
          </MDBModalHeader>
          <MDBModalBody>
         
          <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <Form
              onSubmit={this.onSubmit}
              
              validate={this.validate}
              render={({ handleSubmit, submitting,values }) => (
                <form onSubmit={handleSubmit}>
                 <Alert color="success">Nota : Puede que Algunos datos no aparezcan en el formulario de edición ,
                 por favor comuniquese con su asesor de ADS para Actualizar  si así lo desea.</Alert>
                  <Paper style={{ padding: 16} }>
                    <Grid container alignItems="flex-start" spacing={2} >
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="nombre"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRows.nombre}
                        />
                       
                      </Grid>

                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="ApellidoP"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRows.ApellidoP}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="ApellidoM"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRows.ApellidoM}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="Curp"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRows.Curp}
                        />
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="rfc"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRows.RFC}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="sexo"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRows.Sexo}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="cp"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRows.CP}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="correo"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRows.correo}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="AreaTrabajo"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRows.AreaTrabajo}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="Puesto"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRows.Puesto}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="Ciudad"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRows.Ciudad}
                        />
                      </Grid>

	                      <Grid item >
                        <Button
                         variant="outlined"
                          color="primary"
                          type="submit"
                          disabled={submitting}
                          onClick={(e) =>this.evaluar(values,this.state.updateRows.id)}
                        >
                          Actualizar Empleado
                        </Button>
                        <MDBBtn outlined color="danger" onClick={this.toggle(13)} style={{margin:60}} >
                          Cerrar
                        </MDBBtn>
                      </Grid>
                    </Grid>
                  </Paper>
                </form>
              )}
            />    
          </div>
          </MDBModalBody>   
        </MDBModal>
      </MDBContainer>
      }


      if(this.state.modal14){
 
       modalSucursales  =  <MDBContainer>
        <MDBModal isOpen={this.state.modal14} toggle={this.toggleSucursales(14)}>
          <MDBModalHeader toggle={this.toggleSucursales(14)}>
            Actualizar Sucursales
          </MDBModalHeader>
          <MDBModalBody>
         
          <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <Form
              onSubmit={this.onSubmit}
              
              validate={this.validate2}
              render={({ handleSubmit, submitting,values }) => (
                <form onSubmit={handleSubmit}>
                 <Alert color="primary">Nota : Puede que Algunos datos no aparezcan en el formulario de edición ,
                 por favor comuniquese con su asesor de ADS para Actualizar  si así lo desea.</Alert>
                  <Paper style={{ padding: 16} }>
                    <Grid container alignItems="flex-start" spacing={2} >
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="nombreSucursal"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRowsSucursales.nombreSucursal}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="calle"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRowsSucursales.calle}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="numExt"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRowsSucursales.numExt}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="numInt"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRowsSucursales.numInt}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="colonia"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRowsSucursales.colonia}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="CP"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRowsSucursales.CP}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="Ciudad"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRowsSucursales.Ciudad}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="telefono"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRowsSucursales.telefono}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="actividades"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRowsSucursales.actividades}
                        />
                      </Grid>
	                      <Grid item >
                        <Button
                         variant="outlined"
                          color="primary"
                          type="submit"
                          disabled={submitting}
                          onClick={(e) =>this.evaluarSucursales(values,this.state.updateRowsSucursales.id)}
                        >
                          Actualizar Centro
                        </Button>
                        <MDBBtn outlined color="success" onClick={this.toggleSucursales(14)} style={{margin:60}} >
                          Cerrar
                        </MDBBtn>
                      </Grid>
                    </Grid>
                  </Paper>
                </form>
              )}
            />    
          </div>
          </MDBModalBody>   
        </MDBModal>
      </MDBContainer>

      }


      if(this.state.modal15){
       
       modalDeptos  =  <MDBContainer>
        <MDBModal isOpen={this.state.modal15} toggle={this.toggleDeptos(15)}>
          <MDBModalHeader toggle={this.toggleDeptos(15)}>
            Actualizar Departamentos
          </MDBModalHeader>
          <MDBModalBody>
         
          <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <Form
              onSubmit={this.onSubmit}
              
              validate={this.validate3}
              render={({ handleSubmit, submitting,values }) => (
                <form onSubmit={handleSubmit}>
                 <Alert color="warning">Nota : Una vez Modificado el Departamento no podrá retroceder.</Alert>
                  <Paper style={{ padding: 16} }>
                    <Grid container alignItems="flex-start" spacing={2} >
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="nombreDepto"
                          component={TextField}
                          type="text"
                          defaultValue={this.state.updateRowsDeptos.nombre}
                        />
                      </Grid>
                     
	                      <Grid item >
                        <Button
                         variant="outlined"
                          color="default"
                          type="submit"
                          disabled={submitting}
                          onClick={(e) =>this.evaluarDeptos(values,this.state.updateRowsDeptos.id)}
                        >
                          Actualizar
                        </Button>
                        <MDBBtn outlined color="primary" onClick={this.toggleDeptos(15)} style={{margin:60}} >
                          Cerrar
                        </MDBBtn>
                      </Grid>
                     
                    </Grid>
                  </Paper>
                </form>
              )}
            />    
          </div>
          </MDBModalBody>   
        </MDBModal>
      </MDBContainer>
      }

      if(this.state.modal16){
       
        modalPuestos  =  <MDBContainer>
         <MDBModal isOpen={this.state.modal16} toggle={this.toggleDeptos(16)}>
           <MDBModalHeader toggle={this.toggleDeptos(16)}>
             Actualizar Puestos
           </MDBModalHeader>
           <MDBModalBody>
          
           <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
             <Form
               onSubmit={this.onSubmit}
               
               validate={this.validate4}
               render={({ handleSubmit, submitting,values }) => (
                 <form onSubmit={handleSubmit}>
                  <Alert color="info">Nota : Una vez Modificado el Puesto no podrá retroceder.</Alert>
                   <Paper style={{ padding: 16} }>
                     <Grid container alignItems="flex-start" spacing={2} >
                       <Grid item xs={6}>
                         <Field
                           fullWidth
                           required
                           name="nombrePuesto"
                           component={TextField}
                           type="text"
                           defaultValue={this.state.updateRowsPuestos.nombre}
                         />
                       </Grid>
                      
                         <Grid item >
                         <Button
                          variant="outlined"
                           color="secondary"
                           type="submit"
                           disabled={submitting}
                           onClick={(e) =>this.evaluarPuestos(values,this.state.updateRowsPuestos.id)}
                         >
                           Actualizar Puestos
                         </Button>
                         <MDBBtn outlined color="info" onClick={this.togglePuestos(16)} style={{margin:60}} >
                           Cerrar
                         </MDBBtn>
                       </Grid>
          
                     </Grid>
                   </Paper>
                 </form>
               )}
             />    
           </div>
           </MDBModalBody>   
         </MDBModal>
       </MDBContainer>
       }
 
   
      // const { children} = this.props;
      const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
      const container = { width:1000, height: 800 }
      return (
        <React.Fragment>
        <div>
            <header>
              <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
               <MiniDrawer/>
                <MDBNavbarBrand a href="./inicio">
                <AppNavbarBrand
                    full={{ src: diagnostico, width: 100, height: 33, alt: 'DIAGNOSTICO' }} />               
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
                <MDBContainer style={{marginTop:60}} >
              <Alert  color="primary">Nota : El periodo de Evaluación debe ser Registrado para que su sistema funcione de manera correcta, si desea Agregar o desactivar Periodos de evaluacion puede hacerlo mediante el botón de abajo</Alert>    
              <Button  startIcon={<MenuIcon />} color="primary" onClick={(e)=>this.setState({registrarPeriodo:"1",editarPeriodo:''}) } style={{marginBottom:20}}>
                  Agregar o Desactivar Periodo
               </Button>
               <div>
          <input type="file" onChange={this.handleImageChange} />
          <button  onClick={this.handleSubmit}>Cargar imagen</button>
      
        {imagePreview}
      </div>
               <Button  startIcon={<BorderColorOutlinedIcon />} color="secondary" onClick={(e)=>this.setState({editarPeriodo:"1",registrarPeriodo:''}) } style={{marginBottom:20}}>
                  Editar Periodo
               </Button>
                 {registrarPeriodo} 
                 {editarPeriodo}
                  {periodo}
                    <Paper >
                   <MDBCard>
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
                                      <TableCell  >{rows.Sexo}</TableCell>
                                      <TableCell  >{rows.rfc} </TableCell>
                                      <TableCell  >{rows.ciudad} </TableCell>
                                      <TableCell  >
                                      <IconButton onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a este Empleado ?.Los datos se perderán')) this.delete(i,rows.id)} } >
                                          <DeleteIcon />
                                        </IconButton></TableCell>
                                        <TableCell>
                                        <IconButton onClick={this.toggle(13,rows)}>
                                          <CreateOutlinedIcon />
                                        </IconButton>
                                        </TableCell>
                                    </TableRow> 
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </MDBCardBody>
                      </MDBCard>
                      </Paper>
                    <Paper >
                    <MDBCard >
                        <MDBCardBody>
                        <MDBCardTitle>Centros de Trabajo</MDBCardTitle>
                        </MDBCardBody>
                         
                        <Table bordered>
                           
                           <TableBody>
                             {this.state.datosSucursales.map((rows,i) => {
                               return (
                                 <TableRow >
                                   <TableCell component="th" scope="row">
                                     {rows.id}
                                   </TableCell>
                                   <TableCell >{rows.nombreSucursal}</TableCell>
                                   <TableCell  >{rows.calle}</TableCell>
                                   <TableCell  >{rows.colonia}</TableCell>
                                   <TableCell  >{rows.Ciudad} </TableCell>
                                   <TableCell  >{rows.rfc} </TableCell>
                                   <TableCell  > <IconButton onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a esta Sucursal ?.Los datos se perderán')) this.deleteSucursales(i,rows.id)} } >
                                   <DeleteIcon /></IconButton></TableCell>
                                   <TableCell  > <IconButton onClick={this.toggleSucursales(14,rows)} >
                                   <CreateOutlinedIcon /></IconButton></TableCell>
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
                        <Table bordered>
                           
                           <TableBody>
                             {this.state.datosDeptos.map((rows,i) => {
                               return (
                                 <TableRow >
                                   <TableCell component="th" scope="row">
                                     {rows.id}
                                   </TableCell>
                                 <TableCell ><strong> {rows.nombre}</strong> </TableCell>
                                 <TableCell  > <IconButton onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a este Departamento ?.Los datos se perderán')) this.deleteDepartamentos(i,rows.id)} } >
                                   <DeleteIcon /></IconButton></TableCell>
                                   <TableCell  > <IconButton onClick={ this.toggleDeptos(15,rows)}  >
                                   <CreateOutlinedIcon /></IconButton></TableCell>
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
                    <Paper style={{ width: "22rem" }}>
                    <MDBCard style={{ width: "22rem" }} >
                        <MDBCardBody>
                        <MDBCardTitle>Puestos Actuales</MDBCardTitle>
                        <Table bordered>
                           <TableBody>
                             {this.state.datosPuestos.map((rows,i) => {
                               return (
                                 <TableRow >
                                   <TableCell component="th" scope="row">
                                     {rows.id}
                                   </TableCell>
                                 <TableCell ><strong> {rows.nombre}</strong> </TableCell>
                                 <TableCell  > <IconButton onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a este Puesto ?.Los datos se perderán')) this.deletePuestos(i,rows.id)} } >
                                   <DeleteIcon /></IconButton></TableCell>
                                   <TableCell  > <IconButton onClick={ this.togglePuestos(16,rows)}  >
                                   <CreateOutlinedIcon /></IconButton></TableCell>                           
                                 </TableRow>                                
                               );
                             })}
                           </TableBody>
                   </Table>
                        </MDBCardBody>                     
                    </MDBCard>
                    </Paper>
                    </MDBCol>
                    </MDBRow>
                    
                      {modal}
                      {modalSucursales}
                      {modalDeptos}
                      {modalPuestos}
                 </MDBContainer>
        </div>
        </React.Fragment>
      );
    }
  }
  
  
  
  export default AdminGral;
  
  