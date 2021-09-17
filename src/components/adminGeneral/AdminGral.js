import React from 'react';
import {MDBRow,MDBBtn, MDBModal,MDBCardText, MDBModalBody,MDBCardImage, MDBModalHeader, MDBContainer, MDBCol,MDBCardHeader} from 'mdbreact';
import '../Home/index.css'
import Paper from '@material-ui/core/Paper';
import { API} from '../utils/http'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
// import MiniDrawer from './Sidebar'
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { Form, Field } from 'react-final-form';
import { TextField ,Select} from 'final-form-material-ui';
import MUIDataTable from "mui-datatables";
import Navbar from './navbar'
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
import axios from 'axios'
import {Alert} from 'reactstrap';
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import esLocale from "date-fns/locale/es";
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import HomeIcon from '@material-ui/icons/Home';
import Menu from '@material-ui/core/Menu';

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
        imagePreviewUrl: '',
        allperiodo:[],
        dropdown:null,
        admin:[],
        tablaEmpleados:true,
        tablaCentro:false,
        tablaDepartamentos:false,
        tablaPuestos:false,
        editarEmpleados:false,
        editarCentroTrabajo:false,
        editarDepartamentos:false,
        registrarPeriodo:false,
        editarPeriodo:false,
        misPeriodos:false,
        date:''
      };
      this.getEmployees = this.getEmployees.bind(this);

      this.handleImageChange = this.handleImageChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.cerrarModales = this.cerrarModales.bind(this);
    }
  
    componentWillMount(){
      var LaFecha=new Date();
      var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      var diasem=new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
      var diasemana=LaFecha.getDay();
      var FechaCompleta="";
      var NumeroDeMes="";    
      NumeroDeMes=LaFecha.getMonth();
      FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
  
      this.setState({date:FechaCompleta}) 
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
          this.setState({periodo:datos.data.data.getPeriodo})
        }).catch(err=>{
        })
        axios({
          url:  API,
          method:'post',
          data:{
          query:`
           query{
            getallPeriodo(data:"${[idAdmin]}"){
             evento
             eventoFinal
             alerta1
             alerta2
             alerta3
             Descripcion
             EventoActivo
                  }
                }
              `
          }
        })
        .then(datos => {	
          this.setState({allperiodo:datos.data.data.getallPeriodo})
        }).catch(err=>{
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
            CentroTrabajo
            EstadoCivil
            correo
            AreaTrabajo
            Puesto
            TipoPuesto
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
                console.log(".cartch" , error)
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
            this.setState({ datosSucursales: datos.data.data.getSucursales});

          })

          .catch((error) => {
            console.log(".cartch" , error)
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
                
                  this.setState({ datosDeptos: datos.data.data.getDeptos});

              })

              .catch((error) => {
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
                  console.log(".cartch" , error.response)
            });   
          axios({
            url:  API,
            method:'post',
            data:{
            query:`
            query{
              getAdminDashboard(data:"${idAdmin}"){
                id
                fechaRegistro
                nombreAdmin
                Apellidos
                RFC
                RazonSocial
                correo
                Activo
                fk_superusuario
                objetivo         
                  }
                }
                `
            }
            }).then((datos) => {
                this.setState({admin:datos.data.data.getAdminDashboard})
            })

            .catch((error) => {
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
                  
                  let modalNumber = 'modal' + nr
                  this.setState({
                    [modalNumber]: !this.state[modalNumber]
                  });
                }

                toggleSucursales = (nr,id) => () => {
                  this.setState({updateRowsSucursales:id} )
                  
                  let modalNumber = 'modal' + nr
                  this.setState({
                    [modalNumber]: !this.state[modalNumber]
                  });
                }

                toggleDeptos = (nr,id) => () => {
                  this.setState({updateRowsDeptos:id} )
                  
                  let modalNumber = 'modal' + nr
                  this.setState({
                    [modalNumber]: !this.state[modalNumber]
                  });
                }

                togglePuestos = (nr,id) => () => {
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

                if(values.rfc){
                  if(values.rfc.length < 12 || values.rfc.length > 13){
                    errors.rfc = 'El número de caracteres no es el correcto';
                  }
                }

                if(values.Curp){
                  if(values.Curp.length !== 18){
                    errors.Curp = 'El número de caracteres no es el correcto';
                  }
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
                if (!values.TipoPuesto) {
                  errors.TipoPuesto = 'Este campo es requerido';
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
                if(values.rfc){
                  if(values.rfc.length < 12 || values.rfc.length > 13){
                    errors.rfc = 'El número de caracteres no es el correcto';
                  }
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
            /////////////////////////////// agregar mas elementos a actualizar en el campo editar empleados
                const nombre = values.nombre
                const ApellidoP = values.ApellidoP
                const ApellidoM = values.ApellidoM
                const Curp = values.Curp
                const rfc = values.rfc
                const sexo = values.sexo
                const centro = values.centrotrabajo
                const correoEmployee =values.correo
                const AreaTrabajo= values.AreaTrabajo
                const Puesto = values.Puesto
                const TipoPuesto = values.TipoPuesto
                const idAdmin = localStorage.getItem('idAdmin')
                if(values.nombre){
                    axios({
                      url:  API,
                      method:'post',
                      data:{
                      query:`
                       mutation{
                        updateEmployees(data:"${[nombre,ApellidoP,ApellidoM,Curp,rfc,sexo,centro,correoEmployee,AreaTrabajo,Puesto,TipoPuesto,id,idAdmin]}"){
                            message
                              }
                            }
                          `
                      }
                    })
                    .then(datos => {	
                      if(datos.data.data.updateEmployees.message === 'actualizacion exitosa'){
                      DialogUtility.alert({
                        animationSettings: { effect: 'Fade' },        
                        title:"AVISO!",   
                        content: 'Empleado Actualizado',
                        position: "fixed", 
                      })
                      }else{
                        DialogUtility.alert({
                          animationSettings: { effect: 'Fade' },        
                          title:"AVISO!",   
                          content: 'Estimado usuario el proceso no pudo completarse con éxito por favor intentelo nuevamente, si el problema persiste contacte a soporte técnico.',
                          position: "fixed", 
                        })
                      }
                    })
                   
                } 
              }

              evaluarSucursales  = (values,id) =>{
                const nombreSucursal = values.nombreSucursal
                const calle = values.calle
                const numExt = values.numExt
                const numInt = values.numInt
                const colonia = values.colonia
                const CP = values.CP
                const telefono= values.telefono
                const actividades = values.actividades
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
                        updateSucursales(data:"${[nombreSucursal,calle,numExt,numInt,colonia,CP,Ciudad,telefono,id,actividades,correo]}"){
                            message
                              }
                            }
                          `
                      }
                    })
                    .then(datos => {	
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
                        updateDeptos(data:"${[nombreDepto.toUpperCase(),id,correo]}"){
                            message
                              }
                            }
                          `
                      }
                    })
                    .then(datos => {	
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
                if(datos.data.data.getEventos.message==="evento encontrado"){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'Hay un evento Activo por favor deshabilitelo y vuelva a intentar',
                  position: "fixed",
                }
                )
              }else if(datos.data.data.getEventos.message==="exito"){
                
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
              if(datos.data.data.addPeriodo.message==='registro exitoso'){
                  DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'Periodo Registrado con Éxito',
                  position: "fixed",
                }
                )
                  window.location.reload();
              }else if(datos.data.data.addPeriodo.message==='periodo existente' ){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'El nombre del periodo ya fue registrado con anterioridad',
                  position: "fixed",
                }
                )
              }   
            }).catch(error=>{
              console.log("errror" , error)
            })
              }
            }).catch(err=>{
              console.log("error en la consulta del evento" , err)}) 
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
              if(datos.data.data.updatePeriodo.message==='evento existente'){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'El nombre del periodo ya corresponde a un evento registrado o deshabilitado con anterioridad por favor ingrese uno diferente',
                  position: "fixed",
                }
                )
              }else if (datos.data.data.updatePeriodo.message==='no hay eventos'){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'No existe ningun periodo Activo por favor registre uno antes de editar',
                  position: "fixed",
                }
                )
              }else if ( datos.data.data.updatePeriodo.message==='evento Actualizdo'){
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
        }
      handleImageChange(e) {          
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
      }
      handleDropdown = (event) => {
        this.setState({dropdown: event.currentTarget});
      };
      handleClose = () => {
        this.setState({dropdown: null});
      };
    mostrarTablas(parametro){
      if(parametro == 1){
        this.setState({tablaEmpleados:false})
        this.setState({tablaCentro:true})
        this.setState({tablaDepartamentos:false})
        this.setState({tablaPuestos:false})
      }
      if(parametro == 2){
        this.setState({tablaEmpleados:false})
        this.setState({tablaCentro:false})
        this.setState({tablaDepartamentos:true})
        this.setState({tablaPuestos:false})
      }
      if(parametro == 3){
        this.setState({tablaEmpleados:false})
        this.setState({tablaCentro:false})
        this.setState({tablaDepartamentos:false})
        this.setState({tablaPuestos:true})
      }
    }  
    cerrarTablas(){
        this.setState({tablaCentro:false})
        this.setState({tablaDepartamentos:false})
        this.setState({tablaPuestos:false})
        this.setState({tablaEmpleados:true})
    }  
    mostrarModales(parametro,id){
      if(parametro === 1){
        this.setState({updateRows:id} )
        this.setState({tablaEmpleados:false})
        this.setState({tablaCentro:false})
        this.setState({tablaDepartamentos:false})
        this.setState({tablaPuestos:false})
        this.setState({editarEmpleados:true})
        this.setState({editarCentroTrabajo:false})
        this.setState({editarDepartamentos:false})
        this.setState({editarPuestos:false})
      }
      if(parametro === 2){
        this.setState({updateRowsSucursales:id} )
        this.setState({tablaEmpleados:false})
        this.setState({tablaCentro:false})
        this.setState({tablaDepartamentos:false})
        this.setState({tablaPuestos:false})
        this.setState({editarEmpleados:false})
        this.setState({editarCentroTrabajo:true})
        this.setState({editarDepartamentos:false})
        this.setState({editarPuestos:false})
      }
      if(parametro === 3){
        this.setState({updateRowsDeptos:id} )
        this.setState({tablaEmpleados:false})
        this.setState({tablaCentro:false})
        this.setState({tablaDepartamentos:false})
        this.setState({tablaPuestos:false})
        this.setState({editarEmpleados:false})
        this.setState({editarCentroTrabajo:false})
        this.setState({editarDepartamentos:true})
        this.setState({editarPuestos:false})
      }
      if(parametro === 4){
        this.setState({updateRowsPuestos:id} )
        this.setState({tablaEmpleados:false})
        this.setState({tablaCentro:false})
        this.setState({tablaDepartamentos:false})
        this.setState({tablaPuestos:false})
        this.setState({editarEmpleados:false})
        this.setState({editarCentroTrabajo:false})
        this.setState({editarDepartamentos:false})
        this.setState({editarPuestos:true})
      }
    }
    
    cerrarModales(){
      this.setState({tablaEmpleados:true})
      this.setState({tablaCentro:false})
      this.setState({tablaDepartamentos:false})
      this.setState({tablaPuestos:false})
      this.setState({editarEmpleados:false})
      this.setState({editarCentroTrabajo:false})
      this.setState({editarDepartamentos:false})
      this.setState({editarPuestos:false})
      this.setState({registrarPeriodo:false})
      this.setState({editarPeriodo:false})
      this.setState({misPeriodos:false})
    }
    mostrarPeriodos(parametro){
      if(parametro === 1) {
      this.setState({tablaEmpleados:false})
      this.setState({tablaCentro:false})
      this.setState({tablaDepartamentos:false})
      this.setState({tablaPuestos:false})
      this.setState({editarEmpleados:false})
      this.setState({editarCentroTrabajo:false})
      this.setState({editarDepartamentos:false})
      this.setState({editarPuestos:false})
      this.setState({registrarPeriodo:true})
      this.setState({editarPeriodo:false})
      this.setState({misPeriodos:false})
      }
      if(parametro === 2){
        this.setState({tablaEmpleados:false})
        this.setState({tablaCentro:false})
        this.setState({tablaDepartamentos:false})
        this.setState({tablaPuestos:false})
        this.setState({editarEmpleados:false})
        this.setState({editarCentroTrabajo:false})
        this.setState({editarDepartamentos:false})
        this.setState({editarPuestos:false})
        this.setState({registrarPeriodo:false})
        this.setState({editarPeriodo:true})
        this.setState({misPeriodos:false})
      }
      if(parametro === 3){
        this.setState({tablaEmpleados:false})
        this.setState({tablaCentro:false})
        this.setState({tablaDepartamentos:false})
        this.setState({tablaPuestos:false})
        this.setState({editarEmpleados:false})
        this.setState({editarCentroTrabajo:false})
        this.setState({editarDepartamentos:false})
        this.setState({editarPuestos:false})
        this.setState({registrarPeriodo:false})
        this.setState({editarPeriodo:false})
        this.setState({misPeriodos:true})
      }
    }
    render() {  
      const localeMap = {
          es: esLocale
        }; 

       const locale = "es";
       let datosEmpleados;
       let filtro;
       const options = {
           filterType: "dropdown",
           responsive: "scroll",
           
           textLabels: {
                      body: {
                        noMatch: "Lo Siento ,No se han encontrado Resultados :(",
                        toolTip: "Sort",
                        columnHeaderTooltip: column => `Sort for ${column.label}`
                      },
                      pagination: {
                        next: "Siguiente Página",
                        previous: "Anterior Página",
                        rowsPerPage: "Filas por Página:",
                        displayRows: "de",
                      },
                      toolbar: {
                        search: "Buscar",
                        downloadCsv: "Descargar CSV",
                        print: "Imprimir",
                        viewColumns: "Ver Columnas",
                        filterTable: "Filtrar Tabla",
                      },
                      filter: {
                        all: "Todos",
                        title: "Filtros",
                        reset: "Deshacer",
                      },
                      viewColumns: {
                        title: "Mostrar Columnas",
                        titleAria: "Show/Hide Table Columns",
                      },
                      selectedRows: {
                        text: "Filas Selecionadas",
                        delete: "Borrar",
                        deleteAria: "Eliminar Filas Seleccionadas",
                      },
                    },
         
           onTableChange: (action, tableState) => {
           datosEmpleados=tableState.displayData
           },
           onFilterChange: (action, filtroTable) => {
             filtro=filtroTable
          }     };

          const columns = ["Nombre","Apellido P", "Apellido M.", "Centro de Trabajo", {name: "boton1",label: "Editar",
          options: {filter: false,sort: true,}}, {name: "boton2",label: "Suspender",options: {filter: false,sort: true,}}];

         const data = this.state.datos.map((rows,i)=>{
         const boton2 = <div><MDBBtn  color ="warning" size="sm" onClick={e => this.mostrarModales(1,rows)}><i class="far fa-edit"></i></MDBBtn></div>
         const boton =<div><MDBBtn  color ="danger" size="sm" onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a este Empleado?, Los datos se perderán')) this.delete(i,rows.id)} } ><i class="far fa-trash-alt"></i></MDBBtn></div> 
         return([rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.CentroTrabajo,boton2,boton])
       })

       const columnsCentro = ["Centro de Trabajo","Calle", "Colonia",  "Ciudad",{name: "boton1",label: "Editar",
        options: {filter: false,sort: true}}, {name: "boton2",label: "Suspender",options: {filter: false,sort: true}}];

       const dataCentro = this.state.datosSucursales.map((rows,i)=>{
         const botonUno = <div> <MDBBtn  color ="warning" size="sm" onClick={e=>this.mostrarModales(2,rows)} ><i class="far fa-edit"></i></MDBBtn></div>
         const botonDos = <div><MDBBtn  color ="danger" size="sm" onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a esta Sucursal?, Los datos se perderán')) this.deleteSucursales(i,rows.id)} } ><i class="far fa-trash-alt"></i></MDBBtn></div>
         return([rows.nombreSucursal,rows.calle ,rows.colonia ,rows.Ciudad,botonUno,botonDos])
       })

       const columnsDeptos = ["Nombre",{name: "boton1",label: "Editar",options:{filter: false,sort: true,}},{name: "boton2",label: "Eliminar",options:{filter: false,sort: true,}}];

       const dataDeptos = this.state.datosDeptos.map((rows,i)=>{
         const boton1Uno = <div><MDBBtn  color ="warning" size="sm" onClick={ e=> this.mostrarModales(3,rows)}  ><i class="far fa-edit"></i></MDBBtn></div>
         const boton2Dos = <div><MDBBtn  color ="danger" size="sm" onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a este Departamento?, Los datos se perderán')) this.deleteDepartamentos(i,rows.id)} } ><i class="far fa-trash-alt"></i></MDBBtn></div>
         return([rows.nombre,boton1Uno,boton2Dos])
       })

       const columnsPuestos = ["Nombre",{name: "boton1",label: "Editar",options:{filter: false,sort: true,}},{name: "boton2",label: "Eliminar",options:{filter: false,sort: true,}}];

       const dataPuestos = this.state.datosPuestos.map((rows,i)=>{
         const boton11 = <div><MDBBtn  color ="warning" size="sm" onClick={e=> this.mostrarModales(4,rows)}  ><i class="far fa-edit"></i></MDBBtn></div>
         const boton22 = <div> <MDBBtn  color ="danger" size="sm" onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a este Puesto?, Los datos se perderán')) this.deletePuestos(i,rows.id)} } ><i class="far fa-trash-alt"></i></MDBBtn></div>
         return([rows.nombre,boton11,boton22])
       })
             let cartaAdmin;
             if(this.state.admin.nombreAdmin){
               cartaAdmin = <MDBCard style={{ width: "22rem",marginLeft:"9%"}}>
               <MDBCardBody>
                 <center><MDBCardTitle>Mi empresa</MDBCardTitle></center>
                 <MDBCardText>Razón social : <strong>{this.state.admin.RazonSocial}</strong> </MDBCardText>
                 <MDBCardText>RFC : <strong>{this.state.admin.RFC} </strong></MDBCardText>
                 <MDBCardText>Fecha de registro : <strong>{this.state.admin.fechaRegistro.substring(0,17)} </strong></MDBCardText>
                 <MDBCardText>Objetivo de mi empresa : <strong>{this.state.admin.objetivo} </strong></MDBCardText>
                 <MDBCardText>Administrador : <strong>{this.state.admin.nombreAdmin + " "  + this.state.admin.Apellidos} </strong></MDBCardText>
               </MDBCardBody>
             </MDBCard>
             }
            let tablaEmpleados;
            let tablaCentro;
            let botonCentroT;
            let botonDepartamentos;
            let botonPuestos;
            if(this.state.tablaEmpleados === true) {
              botonCentroT= <MDBBtn style= {{width:"60%"}} color = "success" size = "sm" onClick = {e => this.mostrarTablas(1)}>Centros de trabajo</MDBBtn>;
              botonDepartamentos= <MDBBtn style= {{width:"60%"}}  color = "info" size = "sm" onClick = {e => this.mostrarTablas(2)}>Departamentos</MDBBtn>;
              botonPuestos= <MDBBtn style= {{width:"60%"}} color = "secondary" size = "sm" onClick = {e => this.mostrarTablas(3)}>Puestos de T.</MDBBtn>;

                tablaEmpleados =  <div style={{width:900}}>
                <MUIDataTable
                  title={`Empleados de ${localStorage.getItem("razonsocial")}`}
                  data={data}
                  columns={columns}
                  options={options}
                />
                 </div>
            } 
            
            let botonCerrarTablaCentroT;
            if(this.state.tablaCentro == true){
              botonCerrarTablaCentroT = <MDBBtn color = "danger" size = "sm" onClick = { e => this.cerrarTablas()}>Cerrar Centros T  </MDBBtn>
              tablaCentro =<div style={{width:900}}> <MUIDataTable
              title={`Centros de trabajo de ${localStorage.getItem("razonsocial")}`}
              data={dataCentro}
              columns={columnsCentro}
              options={options}
            />
            </div>
           
            }
            let botonCerrarTablaDepartamentos;
            let tablaDepartamentos;
            if(this.state.tablaDepartamentos === true){
              botonCerrarTablaDepartamentos = <MDBBtn color = "danger" size = "sm" onClick = { e => this.cerrarTablas()}>Cerrar Departamentos </MDBBtn>
              tablaDepartamentos =<div style={{width:900}}> 
               <MUIDataTable
                title={`Departamentos de ${localStorage.getItem("razonsocial")}`}
                data={dataDeptos}
                columns={columnsDeptos}
                options={options}
              />
            </div>
            }
            let botonCerrarTablaPuestos;
            let tablaPuestos;
            if(this.state.tablaPuestos === true){
              botonCerrarTablaPuestos = <MDBBtn color = "danger" size = "sm" onClick = { e => this.cerrarTablas()}>Cerrar Puestos </MDBBtn>
              tablaPuestos =<div style={{width:900}}> 
                <MUIDataTable
                  title={`Puestos de ${localStorage.getItem("razonsocial")}`}
                  data={dataPuestos}
                  columns={columnsPuestos}
                  options={options}
                  
                />
            </div>
            }
            let editarEmpleados;
            if(this.state.editarEmpleados ===  true){
              editarEmpleados  = <div style={{maxWidth: 900 }}>
              <MDBCard style={{padding:"2%"}}>
              <MDBCardHeader><MDBCardTitle>Actualizar empleados</MDBCardTitle></MDBCardHeader>
              <MDBCardBody> 
              <Form
                onSubmit={this.onSubmit}
                
                validate={this.validate}
                render={({ handleSubmit, submitting,values }) => (
                  <form onSubmit={handleSubmit}>
                   {/* <Alert color="success">Nota : Puede que Algunos datos no aparezcan en el formulario de edición ,
                   por favor comuniquese con su asesor de ADS para Actualizar  si así lo desea.</Alert> */}

                      <Grid container alignItems="flex-start" spacing={3} >
                        <Grid item xs={4}>
                          <Field fullWidth required name="nombre" component={TextField} type="text"
                            defaultValue={this.state.updateRows.nombre} label = "Nombre"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="ApellidoP" component={TextField} type="text"
                            defaultValue={this.state.updateRows.ApellidoP} label = "Apellido Paterno"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="ApellidoM" component={TextField} type="text"
                            defaultValue={this.state.updateRows.ApellidoM} label  = "Apellido Materno"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="Curp" component={TextField} type="text"
                            defaultValue={this.state.updateRows.Curp} label = "Curp"
                          />
                        </Grid>
                        
                        <Grid item xs={4}>
                          <Field fullWidth required name="rfc" component={TextField} type="text"
                            defaultValue={this.state.updateRows.RFC} label ="RFC"
                          />
                        </Grid>
  
                        <Grid item xs={4}>
                          <Field fullWidth required name="sexo" component={TextField} type="text"
                            defaultValue={this.state.updateRows.Sexo} label = "Sexo"
                          />
                        </Grid>
                        <Grid item xs={4}>
                        <Field fullWidth required name="centrotrabajo"type="text"
                            defaultValue={this.state.updateRows.CentroTrabajo} component={Select} label = "Centro de Trabajo" formControlProps={{ fullWidth: true }}
                        >
                        {this.state.datosSucursales.map(rows=>{
                          return(	<MenuItem value={rows.nombreSucursal}>{rows.nombreSucursal}</MenuItem>)
                        })}
                        </Field>
                          
                        </Grid>
  
                        <Grid item xs={4}>
                          <Field fullWidth required name="correo" component={TextField} type="text"
                            defaultValue={this.state.updateRows.correo} label  = "Correo"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="AreaTrabajo" type="text"
                            defaultValue={this.state.updateRows.AreaTrabajo} label ="Area de Trabajo" component={Select} formControlProps={{ fullWidth: true }}
                          >
                          {this.state.datosDeptos.map(rows=>{
                          return(	<MenuItem value={rows.nombre}>{rows.nombre}</MenuItem>)
                          })}
                        </Field>
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="Puesto" component={Select} type="text"
                            defaultValue={this.state.updateRows.Puesto} label = "Puesto" formControlProps={{ fullWidth: true }}
                          >
                         {this.state.datosPuestos.map(rows=>{
                          return(	<MenuItem value={rows.nombre}>{rows.nombre}</MenuItem>)
                          })}
                        </Field>
                        </Grid>
  
                        <Grid item xs={4}>
                          <Field fullWidth required name="TipoPuesto" component={TextField} type="text"
                            defaultValue={this.state.updateRows.TipoPuesto} label = "Tipo de Puesto"
                          />
                        </Grid>
                          <Grid item >
                          <MDBBtn color="success" size="md" type="submit" disabled={submitting}
                            onClick={(e) =>this.evaluar(values,this.state.updateRows.id)}
                            className="text-white"
                          >
                            Actualizar Empleado
                          </MDBBtn>
                          <MDBBtn  color="danger" size="md" onClick={this.cerrarModales}>Cancelar</MDBBtn>
                        </Grid>
                      </Grid>
                  </form>
                )}
              />    
              </MDBCardBody> 
              </MDBCard>  
            </div>
            }           
         let editarCentroT;   
      if(this.state.editarCentroTrabajo == true){
        editarCentroT = <div style={{  maxWidth: 900 }}>
        <MDBCard style={{padding:"2%"}}>
        <MDBCardHeader><MDBCardTitle>Actualizar centros de trabajo</MDBCardTitle></MDBCardHeader>
        <MDBCardBody> 
        <Form
          onSubmit={this.onSubmit}
          
          validate={this.validate2}
          render={({ handleSubmit, submitting,values }) => (
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="flex-start" spacing={3} >
                  <Grid item xs={4}>
                    <Field fullWidth required name="nombreSucursal" component={TextField} type="text" 
                      defaultValue={this.state.updateRowsSucursales.nombreSucursal} label = "Nombre del Centro de T."
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="calle" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.calle} label = "Calle"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Field fullWidth required name="numExt" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.numExt} label="Número Exterior"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Field fullWidth required name="numInt" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.numInt} label = "Número Interior"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="colonia" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.colonia} label = "Colonia"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="CP" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.CP} label = "Código Postal"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Field fullWidth required name="Ciudad" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.Ciudad} label = "Ciudad"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Field fullWidth required name="telefono" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.telefono} label = "Teléfono"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="actividades" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.actividades} label = "Actividades "
                    />
                  </Grid>
                    <Grid item >
                    <MDBBtn
                     color="success" size="md" type="submit" disabled={submitting}
                      onClick={(e) =>this.evaluarSucursales(values,this.state.updateRowsSucursales.id)} className="text-white"
                    >
                      Actualizar Centro
                    </MDBBtn>
                    <MDBBtn  color="danger" size="md"  onClick={e=>this.cerrarModales()} >
                      cancelar
                    </MDBBtn>
                  </Grid>
                </Grid>
            </form>
          )}
        />    
        </MDBCardBody>
        </MDBCard>
      </div>
      }
      let editarDepartamentos;
      if(this.state.editarDepartamentos  === true) {
        editarDepartamentos = <div style={{ maxWidth: 900 }}>
        <MDBCard style={{padding:"2%"}}>
        <MDBCardHeader><MDBCardTitle>Actualizar departamentos</MDBCardTitle></MDBCardHeader>
        <MDBCardBody> 
        <Form
          onSubmit={this.onSubmit}
          
          validate={this.validate3}
          render={({ handleSubmit, submitting,values }) => (
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="flex-start" spacing={2} >
                  <Grid item xs={6}>
                    <Field  fullWidth required  name="nombreDepto" component={TextField}
                      type="text" defaultValue={this.state.updateRowsDeptos.nombre}
                    />
                  </Grid>
                    <Grid item >
                    <MDBBtn color="success" size="md" type="submit" disabled={submitting}
                      onClick={(e) =>this.evaluarDeptos(values,this.state.updateRowsDeptos.id)} className="text-white"
                    >
                      Actualizar
                    </MDBBtn>
                    <MDBBtn color="danger" size="md" onClick={e=>this.cerrarModales()}  >
                      calcelar
                    </MDBBtn>
                    </Grid>
                </Grid>
            </form>
          )}
        />    
        </MDBCardBody>
        </MDBCard>
      </div>
      }
      let editarPuestos;
      if(this.state.editarPuestos === true) {
       editarPuestos =  <div style={{  maxWidth: 900 }}>
        <MDBCard style={{padding:"2%"}}>
        <MDBCardHeader><MDBCardTitle>Actualizar puestos</MDBCardTitle></MDBCardHeader>
        <MDBCardBody> 
             <Form
               onSubmit={this.onSubmit}
               
               validate={this.validate4}
               render={({ handleSubmit, submitting,values }) => (
                 <form onSubmit={handleSubmit}>
                     <Grid container alignItems="flex-start" spacing={2} >
                       <Grid item xs={6}>
                         <Field fullWidth required name="nombrePuesto" component={TextField}
                           type="text" defaultValue={this.state.updateRowsPuestos.nombre}/>
                       </Grid>
                         <Grid item >
                         <MDBBtn color="success" size="md" type="submit" disabled={submitting}
                           onClick={(e) =>this.evaluarPuestos(values,this.state.updateRowsPuestos.id)} className="text-white" >
                           Actualizar Puestos
                         </MDBBtn>
                         <MDBBtn color="danger" size="md"  onClick={e=>this.cerrarModales()}>
                           Cancelar
                         </MDBBtn>
                       </Grid>
                     </Grid>
                 </form>
               )}
             />    
             </MDBCardBody>
             </MDBCard>
           </div>
      }
      let registrarPeriodo;
      let botonCerrarRegistroPeriodo;
      if(this.state.registrarPeriodo){
        botonCerrarRegistroPeriodo = <MDBBtn color = "danger" size = "md" onClick = {e=> this.cerrarModales()}> Cerrar periodos</MDBBtn>
        registrarPeriodo =  <div style={{  maxWidth: 900 }}>
      
        <MDBCard>
        <MDBCardHeader><MDBCardTitle>Agregar y eliminar periodo</MDBCardTitle></MDBCardHeader>
        <MDBCardBody>
        <center>Nota: Si desea agregar un nuevo periodo asegúrese de no tener periodos activos, de ser así, seleccione el periodo y oprima el botón deshabilitar periodo.</center>

         <MDBRow> 
        <MDBCol>   
           
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit, submitting,values }) => (
            <form onSubmit={handleSubmit}>
               <MDBRow>  
                 <MDBCol>
                 <Grid item xs={12}>
                  <Field fullWidth name="deshabilitar" component={Select} label="Seleccione el Periodo a Deshabilitar" formControlProps={{ fullWidth: true }}
                  >
                 {this.state.periodo.map(row=>{
                  return(<MenuItem value={row.Descripcion}>{row.Descripcion}</MenuItem>)
                  })}
                  </Field>
                  </Grid>
                  </MDBCol>
                  <MDBCol>
                      <MDBBtn style={{marginTop:14}} color="danger" size="md" type="submit" disabled={submitting}
                          onClick={(e) => { if (window.confirm('Si desactiva el periodo no podrá habilitarlo nuevamente, Desea Continuar?')) this.DesactivarPeriodo(values)} }
                      > 
                      Deshabilitar Periodo
                      </MDBBtn>
                      </MDBCol>
                  </MDBRow>
            </form>
                )}
              /> 
          </MDBCol>
        </MDBRow>
            <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit, submitting,values }) => (
            <form onSubmit={handleSubmit}>
                 <MDBRow>
                 <MDBCol>    
                 <Grid item xs={12}>
                    <Field fullWidth required name="NombrePeriodo" component={TextField} type="text" label="Nombre del Periodo"/>
                  </Grid>
                  <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                  <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Fecha Inicial"  ormat="dd/MM/yyyy"
                      value={this.state.inicial} onChange={this.handleDateChange} KeyboardButtonProps={{'aria-label': 'change date',}}/>
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                    <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Fecha Final" format="dd/MM/yyyy" value={this.state.final}
                    onChange={this.handleDateChange2} KeyboardButtonProps={{'aria-label': 'change date',}}/>
                  </MuiPickersUtilsProvider>                                 
                  </Grid>
                  <MDBBtn size="md" color="primary" type="submit" disabled={submitting} onClick={(e) =>this.NuevoPeriodo(values)}>Registrar</MDBBtn>
                  </MDBCol>      
                  <MDBCol>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                    <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 1" format="dd/MM/yyyy" value={this.state.Alerta1}
                      onChange={this.handleAlerta1} KeyboardButtonProps={{'aria-label': 'change date',}}/>
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                    <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 2" format="dd/MM/yyyy"value={this.state.Alerta2}
                     onChange={this.handleAlerta2} KeyboardButtonProps={{'aria-label': 'change date',}}/>
                    </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>     
                    <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 3" format="dd/MM/yyyy" value={this.state.Alerta3}
                     onChange={this.handleAlerta3} KeyboardButtonProps={{'aria-label': 'change date',}}/>
                      </MuiPickersUtilsProvider>
                  </MDBCol>  
                  </MDBRow>
            </form>
                )}
              />  
          </MDBCardBody>                     
        </MDBCard>
        </div>
      }
      let editarPeriodo;
      let botonCerrarTablaEditarPeriodo;
      if(this.state.editarPeriodo === true) {
        botonCerrarTablaEditarPeriodo = <MDBBtn color = "danger" size = "sm"  onClick = {e=> this.cerrarModales()}>Cerrar edicion de periodos</MDBBtn>
       editarPeriodo = <div style={{  maxWidth: 900 }}>
            <MDBCard >
                <MDBCardBody>
                <MDBCardHeader><MDBCardTitle>Editar periodo de evaluación</MDBCardTitle></MDBCardHeader>
                  <Form
                  onSubmit={this.onSubmit}
                  render={({ handleSubmit, submitting,values }) => (
                    <form onSubmit={handleSubmit}>
                    
                          <MDBRow>
                         <MDBCol>    
                         <Grid item xs={12}  >
                          <Field
                            fullWidth
                            required
                            name="NombrePeriodo"
                            component={TextField}
                            type="text"
                            label="Nuevo nombre del periodo"
                            formControlProps={{ fullWidth: true }}
                          />
                          
                            </Grid>
                          <Grid item xs={6}  justify="center">
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
                          </MDBCol>      
                          <MDBCol>                  
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
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
                            </MDBCol> 
                          </MDBRow>
                          <MDBBtn color="warning" size="md" style={{marginTop:25}} onClick={ e => this.editarPeriodo(values)}>Editar periodo</MDBBtn>       
                    </form>
                        )}
                      />  
                </MDBCardBody>                     
                </MDBCard>
                </div>
      }
      let misPeriodos;    
      let cerrarTablaMisPeriodos;     
      if(this.state.misPeriodos === true && this.state.allperiodo[0]) {
        cerrarTablaMisPeriodos = <MDBBtn color = "danger" size = "sm"  onClick = {e=> this.cerrarModales()}>Cerrar mis periodos</MDBBtn>
        misPeriodos = 
        <div style={{  maxWidth: 900 }}>
        <MDBCard >
            <MDBCardBody>
            <MDBCardHeader><MDBCardTitle>Historial de periodos</MDBCardTitle></MDBCardHeader>
            </MDBCardBody>
            <Table bordered>
            <TableCell component="th" scope="row">
            <strong>Nombre</strong>
            </TableCell>
            <TableCell > <strong>Inicial </strong></TableCell>
            <TableCell  > <strong>Final</strong></TableCell>
            <TableCell  > <strong>Alerta1</strong></TableCell>
            <TableCell  > <strong>Alerta2</strong></TableCell>
            <TableCell  > <strong>Alerta3</strong></TableCell>             
             <TableBody>
                 {this.state.allperiodo.map((rows,i) => {
                   let evento;
                   let descripcion;
                   let eventoFinal;
                   let alerta1;
                   let alerta2;
                   let alerta3;
                   if(rows.EventoActivo === 'true'){
                    evento = <label style = {{color:'green'}}><strong>{rows.evento.substring(4,16).toUpperCase() }</strong></label>
                    descripcion  =<label style = {{color:'green'}}><strong>{rows.Descripcion.toUpperCase() + " (Periodo actual)"}</strong></label>
                   }else{
                    evento = rows.evento.substring(4,16).toUpperCase();
                    descripcion = rows.evento.substring(4,16).toUpperCase();
                   }if(rows.eventoFinal === 'no hay Eventos'){
                     eventoFinal = rows.eventoFinal.toUpperCase();
                   }else {
                     eventoFinal = rows.eventoFinal.substring(4,16).toUpperCase();
                   }if(rows.alerta1 === 'no hay Eventos'){
                     alerta1 = rows.alerta1.toUpperCase();
                    }else {
                     alerta1 = rows.alerta1.substring(4,16).toUpperCase();
                    }if(rows.alerta2 === 'no hay Eventos'){
                      alerta2 = rows.alerta2.toUpperCase();
                     }else {
                      alerta2 = rows.alerta2.substring(4,16).toUpperCase();
                     }if(rows.alerta3 === 'no hay Eventos'){
                      alerta3 = rows.alerta3.toUpperCase();
                     }else {
                      alerta3 = rows.alerta3.substring(4,16).toUpperCase();
                     }

                   return (
                     <TableRow >
                       <TableCell component="th" scope="row">
                         {descripcion}
                       </TableCell>
                       <TableCell >{evento}</TableCell>
                       <TableCell  >{eventoFinal}</TableCell>
                       <TableCell  >{alerta1}</TableCell>
                       <TableCell  >{alerta2} </TableCell>
                       <TableCell  >{alerta3} </TableCell>
                     </TableRow>                                
                   );
                 })}
               </TableBody>
       </Table>
        </MDBCard>
        </div>
      }
      return (
        <React.Fragment>
          <div>
               <Navbar/>
               <div>
               <MDBRow style = {{marginTop:"5%"}} >
               <MDBCol style={{ maxWidth: "27rem" }}>
               {cartaAdmin}
               <MDBCard style={{ width: "22rem", marginLeft:"9%"}}>
                 <MDBCardHeader>
                <center>
                <Button style={{ color: 'green' }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleDropdown}>
                <strong>&nbsp;Herramientas con periodos <br/><i class="fas fa-mouse-pointer"></i></strong>
                </Button>
                
                </center>
               <center> <strong>{this.state.date}</strong> </center>
                 <Menu
                      id="simple-menu"
                      anchorEl={this.state.dropdown}
                      keepMounted
                      open={Boolean(this.state.dropdown)}
                      onClose={this.handleClose}
                  >
                      <MenuItem onClick={(e)=>this.mostrarPeriodos(1) }><i class="fas fa-plus"></i>&nbsp; Agregar o Desactivar</MenuItem>
                      <MenuItem onClick={(e)=>this.mostrarPeriodos(2)}><i class="fas fa-pen-alt"></i>&nbsp;Editar</MenuItem>
                      <MenuItem  onClick={(e)=>this.mostrarPeriodos(3)}><i class="far fa-clock"></i>&nbsp;   Mis periodos</MenuItem>
                  </Menu>
                 </MDBCardHeader>
                 
                  <MDBCardBody>
                  <center>     
                  {botonCerrarTablaCentroT}
                  {botonCerrarTablaDepartamentos}
                  {botonCerrarTablaPuestos}
                  {botonCentroT}
                  {botonDepartamentos}
                  {botonPuestos}
                  {botonCerrarRegistroPeriodo}
                  {botonCerrarTablaEditarPeriodo}
                  {cerrarTablaMisPeriodos}
                  </center>     
                 </MDBCardBody>
                </MDBCard>
               </MDBCol>
               
               <MDBCol style={{ maxWidth: "60rem" }}>
                <MDBRow>
                {tablaEmpleados}
                {tablaCentro}
                {tablaDepartamentos}
                {tablaPuestos}
                {editarEmpleados}
                {editarCentroT}
                {editarDepartamentos}
                {editarPuestos}
                {registrarPeriodo}
                {editarPeriodo}
                {misPeriodos}
                </MDBRow>
                </MDBCol>
                </MDBRow>
             </div>
          </div>
        </React.Fragment>
      );
    }
  }
  
  
  
  export default AdminGral;
  
  