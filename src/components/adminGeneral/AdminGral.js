  import React from 'react';
  import {MDBCardText,MDBIcon} from 'mdbreact';
  import '../Home/index.css'
  import { API} from '../utils/http'
  import TableRow from '@material-ui/core/TableRow';
  import TableCell from '@material-ui/core/TableCell';
  import TableBody from '@material-ui/core/TableBody';
  import Table from '@material-ui/core/Table';
  import { DialogUtility } from '@syncfusion/ej2-popups';
  import { Form, Field } from 'react-final-form';
  import { TextField ,Select} from 'final-form-material-ui';
  import MUIDataTable from "mui-datatables";
  import Navbar from './navbar'
  import {MenuItem} from '@material-ui/core';
  import 'date-fns';
  import DateFnsUtils from '@date-io/date-fns';
  import {Grid} from '@material-ui/core';
  import axios from 'axios'
  import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
  import esLocale from "date-fns/locale/es";
  import { Tabs} from 'antd';
  import {Card} from 'antd'
  import './index.css'
  import {Button,Select as Selec,Modal} from 'antd'
  const { TabPane } = Tabs;
  const { Option } = Selec;

  class AdminGral extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          collapse: false,
          datos:[],
          datosSucursales:[],
          datosDeptos:[],
          datosPuestos:[],
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
          date:'',
          size: 'small',
          periodoSeleccionado:'',
          tablaInicial:true,
          editarEmpleados:false,
          editarCentros:false,
          isModalVisible:false,
          isModalVisible2:false,
          isModalVisible3:false
        };

          this.getEmployees = this.getEmployees.bind(this);
          this.handleImageChange = this.handleImageChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
        }
  
          async componentWillMount(){
          var LaFecha=new Date();
          var Mes=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
          var diasem=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
          var diasemana=LaFecha.getDay();
          var FechaCompleta="";
          var NumeroDeMes="";    
          NumeroDeMes=LaFecha.getMonth();
          FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
          this.setState({date:FechaCompleta}) 
          await this.getEmployees()
          const idAdmin = localStorage.getItem("idAdmin")
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
                  }`
            }
            })
            .then(datos => {	
              this.setState({allperiodo:datos.data.data.getallPeriodo})
            }).catch(err=>{
            })
         }
        getEmployees =  async() =>{
        var correo  =localStorage.getItem("correo") 
        const idAdmin= localStorage.getItem("idAdmin") 
        await axios({
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

          await axios({
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
          }).catch((error) => {
            console.log(".cartch" , error)
         });  

          await axios({
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
          }).catch((error) => {
            console.log(".cartch" , error.response)
          });  
          await axios({
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
            }).catch((error) => {
                console.log(".cartch" , error.response)
            });   
           await axios({
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
            });}

         delete(i,id){
          let rows = [...this.state.datos]
          rows.splice(i, 1)
          this.setState({ 
            datos: rows
          })
          var correo  =localStorage.getItem("correo")       
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
              })
            })
            .catch((error) => {
              console.log(".cartch" , error.response)
            });}

          deleteSucursales(i,id){
            let rows = [...this.state.datosSucursales]
            rows.splice(i, 1)
            this.setState({ 
              datosSucursales: rows
            })
            var correo  = localStorage.getItem("correo")       
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
              })
              }).catch((error) => {
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
              })
              }).catch((error) => {
                console.log(".cartch" , error.response)
          });}

          deletePuestos(i,id){
            let rows = [...this.state.datosPuestos]
            rows.splice(i, 1)
            this.setState({ 
              datosPuestos: rows
            })
            var correo  = localStorage.getItem("correo")           
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
              })
              }).catch((error) => {
              console.log(".cartch" , error.response)
            });}

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
                window.location.reload();
                }else{
                  DialogUtility.alert({
                    animationSettings: { effect: 'Fade' },        
                    title:"AVISO!",   
                    content: 'Estimado usuario el proceso no pudo completarse con éxito por favor intentelo nuevamente, si el problema persiste contacte a soporte técnico.',
                    position: "fixed", 
                  })
                }
              })
          }}

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
                    content: 'Centro de trabajo actualizado',
                    position: "fixed",
                  })
                  window.location.reload();
                })
            } 
          }
          evaluarDeptos  = (values,id) =>{
            const nombreDepto = values.nombreDepto  
            const correo = localStorage.getItem('correo')
            if(values.nombreDepto){
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
                  })
                  this.setState({isModalVisible:false})
                  window.location.reload()
                })
            } 
          }
          evaluarPuestos  = (values,id) =>{
            const nombrePuesto = values.nombrePuesto         
            const correo = localStorage.getItem('correo')
            if(values.nombrePuesto){
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
                  })
                this.setState({isModalVisible:false})  
                window.location.reload();  
                })
            } 
          }
          NuevoPeriodo(values){
            if(values.NombrePeriodo && this.state.inicial && this.state.final && this.state.Alerta1&& this.state.Alerta1&& this.state.Alerta2&& this.state.Alerta3){
            const idAdmin=localStorage.getItem("idAdmin")
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
                })
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
                })
                  window.location.reload();
              }else if(datos.data.data.addPeriodo.message==='periodo existente' ){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'El nombre del periodo ya fue registrado con anterioridad',
                  position: "fixed",
                })
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
              })
            }
          }

          editarPeriodo(values){  
            if(values.NombrePeriodo && this.state.final && this.state.Alerta1 && this.state.Alerta2 && this.state.Alerta3){    
            const idAdmin=localStorage.getItem("idAdmin")
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
                })
              }else if (datos.data.data.updatePeriodo.message==='no hay eventos'){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'No existe ningun periodo Activo por favor registre uno antes de editar',
                  position: "fixed",
                })
              }else if ( datos.data.data.updatePeriodo.message==='evento Actualizdo'){
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'periodo Actualizado con éxito',
                  position: "fixed",
                })
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
            }) 
          }}

      DesactivarPeriodo(){
        let values = this.state.periodoSeleccionado
        if(values){
        const idAdmin=localStorage.getItem("idAdmin")
        axios({
          url:  API,
          method:'post',
          data:{
          query:`
            mutation{
            deletePeriodo(data:"${[values,idAdmin]}"){
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
          })
          window.location.reload();
        })
      }else{
        DialogUtility.alert({
          animationSettings: { effect: 'Fade' },        
          title:"AVISO!",   
          content: 'Por favor seleccione una opción',
          position: "fixed",
        })
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

    handleChange(value) {
      this.setState({periodoSeleccionado:value})
      console.log(`selected ${value}`);
    }
    
    onChange = e => {
      this.setState({ size: e.target.value });
    }; 
    edicionDatos(parameter,id){
      if(parameter === 1){
        this.setState({tablaInicial:false})
        this.setState({editarEmpleados:true})
        this.setState({updateRows:id})
        this.setState({editarCentros:false})
        this.setState({editarPuestos:false})

      }
      if(parameter === 2){
        this.setState({editarEmpleados:false})
        this.setState({tablaInicial:false})
        this.setState({editarCentros:true})
        this.setState({updateRowsSucursales:id})
        this.setState({editarPuestos:false})
      }
      if(parameter === 3){
        this.showModal2();
        this.setState({updateRowsDeptos:id})
      }
      if(parameter === 4){
        this.showModal();
        this.setState({updateRowsPuestos:id})
      }
    }
    cerrarEdicion(){
      this.setState({tablaInicial:true})
      this.setState({editarEmpleados:false})
      this.setState({editarCentros:false})
    }
    showModal = () => {
      this.setState({isModalVisible:true});
    }; 
    handleCancel = () => {
      this.setState({isModalVisible:false});
    };
    showModal2 = () => {
      this.setState({isModalVisible2:true});
    };
    showModal3 = () => {
      this.setState({isModalVisible3:true});
    }; 
    handleCancel2 = () => {
      this.setState({isModalVisible2:false});
    };
    handleCancel3 = () => {
      this.setState({isModalVisible3:false});
    };
    render() {  
      const { size } = this.state;
      const localeMap = {
          es: esLocale
        }; 
       const locale = "es";
       const options = {
           filterType: "dropdown",
           responsive: "staked",
           elevation:0,
           viewColumns:false,
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
          //  datosEmpleados=tableState.displayData
           },
           onFilterChange: (action, filtroTable) => {
            //  filtro=filtroTable
          }     };

          const columns = ["Nombre","Apellido P", "Apellido M.", "Centro de Trabajo","Puesto","Status", {name: "boton1",label: "Editar",
          options: {filter: false,sort: true,}}, {name: "boton2",label: "Suspender",options: {filter: false,sort: true,}}];

         const data = this.state.datos.map((rows,i)=>{
         const boton2 = <div><Button shape="circle" size="large" type="primary" onClick={e => this.edicionDatos(1,rows)}><MDBIcon icon="user-edit" /></Button></div>
         const boton =<div><Button shape="circle" size="large" type="danger" onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a este Empleado?, Los datos se perderán')) this.delete(i,rows.id)} } ><MDBIcon icon="user-times" /></Button></div> 
         return([rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.CentroTrabajo,rows.Puesto,"Vigente",boton2,boton])
       })

       const columnsCentro = ["Centro de Trabajo","Calle", "Colonia",  "Ciudad",{name: "boton1",label: "Editar",
        options: {filter: false,sort: true}}, {name: "boton2",label: "Suspender",options: {filter: false,sort: true}}];
       const dataCentro = this.state.datosSucursales.map((rows,i)=>{
         const botonUno = <div> <Button shape="circle" size="large" type="primary" onClick={e=>this.edicionDatos(2,rows)} ><MDBIcon icon="pen-square" /></Button></div>
         const botonDos = <div><Button shape="circle" size="large" type="danger" onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a esta Sucursal?, Los datos se perderán')) this.deleteSucursales(i,rows.id)} } ><MDBIcon icon="trash-alt" /></Button></div>
         return([rows.nombreSucursal,rows.calle ,rows.colonia ,rows.Ciudad,botonUno,botonDos])
       })

       const columnsDeptos = ["Id","Id administrador","Nombre",{name: "boton1",label: "Editar",options:{filter: false,sort: true,}},{name: "boton2",label: "Eliminar",options:{filter: false,sort: true,}}];
       const dataDeptos = this.state.datosDeptos.map((rows,i)=>{
         const boton1Uno = <div><Button shape="circle" size="large" type="primary" onClick={ e=> this.edicionDatos(3,rows)}  ><MDBIcon icon="marker" /></Button></div>
         const boton2Dos = <div><Button shape="circle" size="large" type="danger" onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a este Departamento?, Los datos se perderán')) this.deleteDepartamentos(i,rows.id)} } ><MDBIcon icon="trash" /></Button></div>
         return([rows.id,rows.fk_Administrador,rows.nombre,boton1Uno,boton2Dos])
       })

       const columnsPuestos = ["Id","Id administrador","Nombre",{name: "boton1",label: "Editar",options:{filter: false,sort: true,}},{name: "boton2",label: "Eliminar",options:{filter: false,sort: true,}}];
       const dataPuestos = this.state.datosPuestos.map((rows,i)=>{
         const boton11 = <div><Button shape="circle" size="large" type="primary" onClick={e=> this.edicionDatos(4,rows)}  ><MDBIcon icon="pencil-alt" /></Button></div>
         const boton22 = <div> <Button shape="circle" size="large" type="danger" onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a este Puesto?, Los datos se perderán')) this.deletePuestos(i,rows.id)} } ><MDBIcon far icon="trash-alt" /></Button></div>
         return([rows.id,rows.fk_Administrador,rows.nombre,boton11,boton22])
       })
             let cartaAdmin;
             if(this.state.admin.nombreAdmin){
               cartaAdmin =
                <Modal cancelText="Cancelar" okText="Aceptar" title={<h6><strong>Información General</strong></h6>} visible={this.state.isModalVisible3} onOk={e=>this.handleCancel3()} onCancel={e=>this.handleCancel3()}>    
                 <MDBCardText>Razón social : <strong>{this.state.admin.RazonSocial}</strong> </MDBCardText>
                 <MDBCardText>RFC : <strong>{this.state.admin.RFC} </strong></MDBCardText>
                 <MDBCardText>Fecha de registro : <strong>{this.state.admin.fechaRegistro.substring(0,17)} </strong></MDBCardText>
                 <MDBCardText>Objetivo de mi empresa : <strong>{this.state.admin.objetivo} </strong></MDBCardText>
                 <MDBCardText>Administrador : <strong>{this.state.admin.nombreAdmin + " "  + this.state.admin.Apellidos} </strong></MDBCardText>
                </Modal>
             }

            let editarEmpleados;
            if(this.state.editarEmpleados ===  true){
              editarEmpleados  =
              <Card title = {<h6><strong>Actualizar empleados</strong></h6>}  style={{padding:"2%"}}>
              <Form
                onSubmit={this.onSubmit}
                validate={this.validate}
                render={({ handleSubmit, submitting,values }) => (
                  <form onSubmit={handleSubmit}>
                        <Grid container spacing={3} >
                        <Grid item xs={4}>
                          <Field fullWidth required name="nombre" component={TextField} type="text"
                            defaultValue={this.state.updateRows.nombre} label = "Nombre"/>
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="ApellidoP" component={TextField} type="text"
                            defaultValue={this.state.updateRows.ApellidoP} label = "Apellido Paterno"/>
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="ApellidoM" component={TextField} type="text"
                            defaultValue={this.state.updateRows.ApellidoM} label  = "Apellido Materno"/>
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="Curp" component={TextField} type="text"
                            defaultValue={this.state.updateRows.Curp} label = "Curp"/>
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="rfc" component={TextField} type="text"
                            defaultValue={this.state.updateRows.RFC} label ="RFC"/>
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="sexo" component={TextField} type="text"
                            defaultValue={this.state.updateRows.Sexo} label = "Sexo"/>
                        </Grid>
                        <Grid item xs={4}>
                        <Field fullWidth required name="centrotrabajo"type="text"
                            defaultValue={this.state.updateRows.CentroTrabajo} component={Select} label = "Centro de Trabajo" formControlProps={{ fullWidth: true }}>
                        {this.state.datosSucursales.map(rows=>{
                          return(	<MenuItem value={rows.nombreSucursal}>{rows.nombreSucursal}</MenuItem>)
                        })}
                        </Field>
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="correo" component={TextField} type="text"
                            defaultValue={this.state.updateRows.correo} label  = "Correo"/>
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="AreaTrabajo" type="text"
                            defaultValue={this.state.updateRows.AreaTrabajo} label ="Area de Trabajo" component={Select} formControlProps={{ fullWidth: true }}>
                          {this.state.datosDeptos.map(rows=>{
                          return(	<MenuItem value={rows.nombre}>{rows.nombre}</MenuItem>)
                          })}
                        </Field>
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="Puesto" component={Select} type="text"
                            defaultValue={this.state.updateRows.Puesto} label = "Puesto" formControlProps={{ fullWidth: true }}>
                         {this.state.datosPuestos.map(rows=>{
                          return(	<MenuItem value={rows.nombre}>{rows.nombre}</MenuItem>)
                          })}
                        </Field>
                        </Grid>
                        <Grid item xs={4}>
                          <Field fullWidth required name="TipoPuesto" component={TextField} type="text"
                            defaultValue={this.state.updateRows.TipoPuesto} label = "Tipo de Puesto"/>
                        </Grid>
                          <Grid item >
                          <Button type="primary" disabled={submitting}
                            onClick={(e) =>this.evaluar(values,this.state.updateRows.id)} className="text-white">Actualizar Empleado </Button>&nbsp;&nbsp;&nbsp;
                          <Button  type="danger" onClick={e=>this.cerrarEdicion()}>Cancelar</Button>
                        </Grid>
                      </Grid>
                  </form>
                )}
              />    
              </Card> 
            }           
         let editarCentroT;   
      if(this.state.editarCentros === true){
        editarCentroT = 
        <Card title = {<h6><strong>Actualizar centros de trabajo</strong></h6>} style={{padding:"2%"}}>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate2}
          render={({ handleSubmit, submitting,values }) => (
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="flex-start" spacing={3} >
                  <Grid item xs={4}>
                    <Field fullWidth required name="nombreSucursal" component={TextField} type="text" 
                      defaultValue={this.state.updateRowsSucursales.nombreSucursal} label = "Nombre del Centro de T."/>
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="calle" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.calle} label = "Calle"/>
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="numExt" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.numExt} label="Número Exterior"/>
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="numInt" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.numInt} label = "Número Interior" />
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="colonia" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.colonia} label = "Colonia"/>
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="CP" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.CP} label = "Código Postal"/>
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="Ciudad" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.Ciudad} label = "Ciudad"/>
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="telefono" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.telefono} label = "Teléfono"/>
                  </Grid>
                  <Grid item xs={4}>
                    <Field fullWidth required name="actividades" component={TextField} type="text"
                      defaultValue={this.state.updateRowsSucursales.actividades} label = "Actividades "/>
                  </Grid>
                    <Grid item xs={4}>
                    <Button type="primary"  disabled={submitting}
                      onClick={(e) =>this.evaluarSucursales(values,this.state.updateRowsSucursales.id)} className="text-white">
                      Actualizar Centro</Button>&nbsp;&nbsp;&nbsp;
                    <Button  type="danger" size="md"  onClick={e=>this.cerrarEdicion()} >cancelar</Button>
                    </Grid>
                </Grid>
            </form>
          )}
        />    
        </Card>
      }
      let editarDepartamentos = 
      <div style={{ maxWidth: 900 }}>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate3}
          render={({ handleSubmit, submitting,values }) => (
            <form onSubmit={handleSubmit}>
            <Modal cancelText="Cancelar" okText="Actualizar Departamento" title={<h6><strong>Actualizar Departamento</strong></h6>} visible={this.state.isModalVisible2} onOk={(e) =>this.evaluarDeptos(values,this.state.updateRowsDeptos.id)} onCancel={e=>this.handleCancel2()}>    
                <Grid container alignItems="flex-start" spacing={2} >
                  <Grid item xs={6}>
                    <Field  fullWidth required  name="nombreDepto" component={TextField}
                      type="text" defaultValue={this.state.updateRowsDeptos.nombre}/>
                  </Grid>
                </Grid>
              </Modal>  
            </form>
          )}/>    
      </div>
      
      let editarPuestos = 
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate4}
            render={({ handleSubmit, submitting,values }) => (
              <form onSubmit={handleSubmit}>
                <Modal cancelText="Cancelar" okText="Actualizar Puestos" title={<h6><strong>Actualizar puesto</strong></h6>} visible={this.state.isModalVisible} onOk={(e) =>this.evaluarPuestos(values,this.state.updateRowsPuestos.id)} onCancel={e=>this.handleCancel()}>
                  <Grid container alignItems="flex-start" spacing={2} >
                    <Grid item xs={6}>
                      <Field fullWidth required name="nombrePuesto" component={TextField}
                        type="text" defaultValue={this.state.updateRowsPuestos.nombre}/>
                    </Grid>
                  </Grid>
                </Modal> 
              </form>
            )}/>    
      let tablaInicial;
      if(this.state.tablaInicial === true) {
        tablaInicial =  <div className="tabInicio" style={{marginTop:"5%"}}>                         
            <Tabs defaultActiveKey="1" type="card" size={size}>
            <TabPane tab="Empleados" key="1">
            <Card className="card" title = {<h6><strong>Empleados Registrados {localStorage.getItem("razonsocial")}</strong></h6>} extra={<Button type="success" onClick = {e=>this.showModal3()}>Información general</Button>}>
            <MUIDataTable
              data={data}
              columns={columns}
              options={options}
            />
            </Card>
            </TabPane>
            <TabPane tab="Centros de trabajo" key="2">
            <Card  className="card" title = {<h6><strong>Centros de trabajo de {localStorage.getItem("razonsocial")}</strong></h6>}>
              <MUIDataTable
              data={dataCentro}
              columns={columnsCentro}
              options={options}
            />
            </Card>
            </TabPane>
            <TabPane tab="Puestos de trabajo" key="3">
            <Card className="card" title = {<h6><strong>Puestos de trabajo de  {localStorage.getItem("razonsocial")}</strong></h6>}>
            <MUIDataTable
              data={dataPuestos}
              columns={columnsPuestos}
              options={options}
            />
            </Card>
            </TabPane>
            <TabPane tab="Departamentos de trabajo" key="4">
              <Card className="card" title = {<h6><strong>Departamentos registrados de  {localStorage.getItem("razonsocial")}</strong></h6>}>
              <MUIDataTable
              data={dataDeptos}
              columns={columnsDeptos}
              options={options}
              />
              </Card>
            </TabPane>
            <TabPane tab="Registrar periodo" key="5">
            <Card style={{ width:"100%",padding:"10px" }} title={<h6><strong>Agregar y eliminar periodo</strong></h6>}>
            <div className = "select">
            <Selec size="middle" defaultValue="Seleccione el periodo a deshabilitar" style={{ width: "35%" }} onChange={this.handleChange}>
              {this.state.periodo.map(row=>{
                return(<Option value={row.Descripcion}>{row.Descripcion}</Option>)
              })}
            </Selec>
            <Button  type = "danger"onClick={(e) => { if (window.confirm('Si desactiva el periodo no podrá habilitarlo nuevamente, Desea Continuar?')) this.DesactivarPeriodo()}}><MDBIcon icon="times" /></Button>
            </div>
            <div className = "select2">  
            <Form
              onSubmit={this.onSubmit}
              render={({ handleSubmit, submitting,values }) => (
                <form onSubmit={handleSubmit}>
                      <Card style={{padding:"15px"}} title={<Field required name="NombrePeriodo" component={TextField} type="text" label="Nombre del Periodo"/>} extra={<Button  type="primary" disabled={submitting} onClick={(e) =>this.NuevoPeriodo(values)}>Registrar periodo</Button>}>
                      <div className="formperiodo">  
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                      <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Fecha Inicial"  ormat="dd/MM/yyyy"
                          value={this.state.inicial} onChange={this.handleDateChange} KeyboardButtonProps={{'aria-label': 'change date',}}/>
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                        <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Fecha Final" format="dd/MM/yyyy" value={this.state.final}
                        onChange={this.handleDateChange2} KeyboardButtonProps={{'aria-label': 'change date',}}/>
                      </MuiPickersUtilsProvider>                                 
                      </div>
                      <div className="formperiodo">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                        <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 1" format="dd/MM/yyyy" value={this.state.Alerta1}
                          onChange={this.handleAlerta1} KeyboardButtonProps={{'aria-label': 'change date',}}/>
                      </MuiPickersUtilsProvider>&nbsp;&nbsp;&nbsp;
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                        <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 2" format="dd/MM/yyyy"value={this.state.Alerta2}
                        onChange={this.handleAlerta2} KeyboardButtonProps={{'aria-label': 'change date',}}/>
                        </MuiPickersUtilsProvider>&nbsp;&nbsp;&nbsp;
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>     
                        <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 3" format="dd/MM/yyyy" value={this.state.Alerta3}
                        onChange={this.handleAlerta3} KeyboardButtonProps={{'aria-label': 'change date',}}/>
                      </MuiPickersUtilsProvider>
                      </div>
                      </Card>
                </form>
                    )}
                  /> 
              </div>     
            </Card>
            </TabPane>
            <TabPane tab="Editar periodos" key="6">
            <Card style={{ width:"100%", padding:"15px" }} title = {<h6><strong>Editar periodo de evaluación</strong></h6>}>
            <div> 
              <Form onSubmit={this.onSubmit} render={({ handleSubmit, submitting,values }) => (
                <form onSubmit={handleSubmit}>
                    <table className = "table table-borderless">
                    <tr>
                      <td>
                        <Field fullWidth  required name="NombrePeriodo" component={TextField} type="text"
                        label="Nuevo nombre del periodo" style={{marginTop:"6%"}} formControlProps={{ fullWidth: true }} />
                      </td>
                      <td>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                        <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Fecha Final" format="dd/MM/yyyy"
                          value={this.state.final} onChange={this.handleDateChange2} 
                          KeyboardButtonProps={{'aria-label': 'change date',}}/>
                      </MuiPickersUtilsProvider>
                    </td>
                    <td>
                    <Button type="primary" style={{marginTop:"12%"}} onClick={ e => this.editarPeriodo(values)}>Editar periodo</Button>
                    </td>
                    </tr>                          <td>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                        <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 1" format="dd/MM/yyyy"
                            value={this.state.Alerta1} onChange={this.handleAlerta1}                        
                            KeyboardButtonProps={{'aria-label': 'change date',}}/>
                      </MuiPickersUtilsProvider>
                      </td>
                      <td>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                        <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 2" format="dd/MM/yyyy"
                            value={this.state.Alerta2} onChange={this.handleAlerta2}
                            KeyboardButtonProps={{'aria-label': 'change date',}}/>
                      </MuiPickersUtilsProvider>
                      </td>
                      <td>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>     
                        <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 3" format="dd/MM/yyyy"
                            value={this.state.Alerta3} onChange={this.handleAlerta3}
                            KeyboardButtonProps={{'aria-label': 'change date',}}/>
                      </MuiPickersUtilsProvider>
                      </td>
                      </table>    
                </form>
                    )}
                  /> 
              </div>    

            </Card>
            </TabPane>
            <TabPane tab="Historial de periodos" key="7">
            <Card style={{ width:"100%",padding:"25px" }} title = {<h6><strong>Historial de periodos</strong></h6>}>
              <div className = "select2">
              <Table bordered>
              <TableCell component="th" scope="row">
              <strong>Nombre</strong>
              </TableCell>
              <TableCell > <strong>Inicial </strong></TableCell>
              <TableCell > <strong>Final</strong></TableCell>
              <TableCell > <strong>Alerta1</strong></TableCell>
              <TableCell > <strong>Alerta2</strong></TableCell>
              <TableCell > <strong>Alerta3</strong></TableCell>             
              <TableBody>
                  {this.state.allperiodo.map(rows => {
                    console.log("rows",rows)
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
                      descripcion = rows.Descripcion.substring(0,16).toUpperCase();
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
            </div>
              </Card>
            </TabPane>
            </Tabs>
          </div>
          }
      return (
        <React.Fragment>
          <div>
              <Navbar modulo = {"ADMINISTRACIÓN GENERAL"} />
              {tablaInicial}
              <div className="tablaEditar">
              {editarEmpleados}
              {editarCentroT}
              {editarPuestos}
              {editarDepartamentos}
              {cartaAdmin}
              </div>
          </div>
        </React.Fragment>
      );
    }
  } 
  export default AdminGral;
  
  