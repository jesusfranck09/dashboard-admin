import React from 'react';
import {MDBBtn} from 'mdbreact';
import axios from 'axios'
import {Alert} from 'reactstrap';
// import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import { API} from '../utils/http'
import ModalVideo from 'react-modal-video'
import "./index.css"
import Upload from '../uploadImage/upload'
import UpdateLogo from '../uploadImage/updateLogo'
import { MDBModal, MDBModalBody,MDBContainer} from "mdbreact";
import {MDBCardBody} from 'mdbreact';
import {ProgressBar} from 'react-bootstrap' 
import Navbar from './navbar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MUIDataTable from "mui-datatables";
import {Card, Button as Boton,Modal, Input} from 'antd'
import { Chart } from "react-google-charts";
// import { ValuesOfCorrectType } from 'graphql/validation/rules/ValuesOfCorrectType';
import {Button,Space} from 'antd'
import { CloudUploadOutlined, BarChartOutlined, VideoCameraOutlined,UserSwitchOutlined } from '@ant-design/icons';
import { DialogUtility } from '@syncfusion/ej2-popups';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection : 1,
      showModal2: false,
      totalEmpleados : '',
      ATSContestado:'',
      ATSNoContestado:'',
      RPContestado:'',
      RPNoContestado:'',
      EEOContestado:'',
      EEONoContestado:'',
      empleadosAts:[],
      empleadosAtsFalse:[],
      modal16: false,
      modal15:false,
      modal14:false,
      modal10:false,
      modal11:false,
      modal12:false,
      modal20:false,
      modal21:false,
      empleadosRP:[],
      empleadosRPFalse:[],
      AtsDetectado:[],
      empleadosEEO:[],
      empleadosEEOFalse:[],
      dias:'',
      horas:'',
      minutos:'',
      segundos:'',
      licencia:'',
      array:[],
      empleados:'',
      urlLogo:'',
      periodo:'',
      datosEventos:[],
      dropdown:null,
      date:'',
      empleadosTotales : [],
      tablaEmpleados:false,
      tablaATSContestado:false,
      tablaATSNoContestado:false,
      tablaRPContestado:false,
      tablaRPNoContestado:false,
      tablaEEOContestado:false,
      tablaEEONoContestado:false,
      tablaATSDetectado:false,
      graficaDistribucionInicial:true,
      disabledButtons:false,
      leyendaDemo:'',
      openModal:false,
      confirmLoading:false,
      visible:false,
      visible2:false,
      cardInicial:true,
      accesoPortal:false,
      modalAdministracion:false,
      dataAdminEmpleado : [],
      habilitarAcceso:true,
      confirmar:false,
      valueInput:'',
      valueInputPass:'',
      tableDetallesPortal:false,
      tablaDetalles:false,
      tablaTeletrabajo:false,
      arrayTeletrabajo:[],
      seleccionTeletrabajo:[],
      modalTeletrabajo:false,
      tablaTeletrabajoAsignado:false,
      arrayTeletrabajoAsignado:[],
      datosGeneralesEmpleados:[]
    };
    this.showModal = this.showModal.bind(this)
    this.showModal2 = this.showModal2.bind(this)
    this.onOkModalAdministracion = this.onOkModalAdministracion.bind(this)
    this.onChangeInputCorreo = this.onChangeInputCorreo.bind(this)  
    this.onChangeInputPass = this.onChangeInputPass.bind(this)  
  }
  showModal = (param) => {
    this.setState({visible:true})
    if(param === 1){
      this.tablaATSDetectado()
    }else if(param === 2){
      this.tablaATSContestado()
    }else if(param === 3){
      this.tablaATSNoContestado()
    }else if(param === 4){
      this.tablaRPContestado()
    }else if(param === 5){
      this.tablaRPNoContestado()
    }else if(param === 6){
      this.tablaEEOContestado()
    }else if(param === 7){
      this.tablaEEONoContestado()
    }
    
  };
  handleOk = () => {
      this.setState({confirmLoading:true})
      setTimeout(() => {
        this.setState({visible:false})
        this.setState({confirmLoading:false})
      }, 1000);
  };
  showModal2 = () => {
    this.setState({visible2:true})
    this.setState({isOpen: true})
  };
  handleOk2 = () => {
    this.setState({isOpen: false})
    this.setState({visible2:false})
  };
  handleCloseDropdown = () => {
    this.setState({dropdown: null});
  };
  handleDropdown = (event) => {
    this.setState({dropdown: event.currentTarget});
  };
  async componentWillMount(){
    let idAdmin = localStorage.getItem("idAdmin")
     await  axios({
        url:  API,
        method:'post',
        data:{
        query:`
         query{
          getPeriodo(data:"${[idAdmin]}"){
            idEventos
            fk_administrador
            evento
            eventoFinal
            alerta1
            alerta2
            alerta3
            Descripcion
            EventoActivo
            Alerta1Enviada
            Alerta2Enviada
            Alerta3Enviada
                }
              }
            `
        }
      })
      .then(datos => {
        let periodo = datos.data.data.getPeriodo[0].Descripcion ;
        localStorage.setItem("periodo" ,datos.data.data.getPeriodo[0].Descripcion )
        this.setState({periodo:periodo})
        this.setState({datosEventos:datos.data.data.getPeriodo[0]})
        
        let eventoFinal;
        let alerta1;
        let alerta2;
        let alerta3; 
        eventoFinal = datos.data.data.getPeriodo[0].eventoFinal
        alerta1  = datos.data.data.getPeriodo[0].alerta1
        alerta2  = datos.data.data.getPeriodo[0].alerta2
        alerta3  =  datos.data.data.getPeriodo[0].alerta3
        var alert3;
        var alert2;
        var alert1;
        var fechaFinal;
        if(alerta1){
          alert1= alerta1.substring(4,34)       
        } 
        if (alerta2){
          alert2=alerta2.substring(4,34)
        } 
        if (alerta3){
          alert3=alerta3.substring(4,34)
        }
        if (eventoFinal){
          fechaFinal = eventoFinal.substring(4,34)
        }
        this.countdown(fechaFinal)
        this.alerta1(alert1)
        this.alerta2(alert2)
        this.alerta3(alert3)
      }).catch(err=>{
        console.log("err",err.response)
      })
        await this.getEmployees();
        await this.handleFront();
        await this.verifyTables();
        this.getUrlLogo();
        var LaFecha=new Date();
        var Mes=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        var diasem=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        var diasemana=LaFecha.getDay();
        var FechaCompleta="";
        var NumeroDeMes="";    
        NumeroDeMes=LaFecha.getMonth();
        FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
    
        this.setState({date:FechaCompleta}) 
        
  }

  getEmployees = async() =>{
    let array7 = [];
 
   const idAdmin= localStorage.getItem("idAdmin");
   let periodo = localStorage.getItem("periodo"); 
   let arrayDatos = [];
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
              ATSDetectado
              accesoPortal
              passwordPortal
              teletrabajo
                }
              }
              `
          }
         }).then((datos) => {
           let datosEmpleados = datos.data.data.getUsersTableEmployees;
           this.setState({datosGeneralesEmpleados:datos.data.data.getUsersTableEmployees})
           let arrayTeletrabajo = [];
           let arrayTeletrabajoAsignado = [];

           let teletrabajo = datosEmpleados.filter(function(hero){
               return hero.teletrabajo === "false"
           })
           let teletrabajoAsignado = datosEmpleados.filter(function(hero){
            return hero.teletrabajo === "true"
           })
           arrayTeletrabajo.push(teletrabajo)
           this.setState({arrayTeletrabajo:arrayTeletrabajo[0]})

           arrayTeletrabajoAsignado.push(teletrabajoAsignado)
           this.setState({arrayTeletrabajoAsignado:arrayTeletrabajoAsignado[0]})

           arrayDatos.push(datosEmpleados);
           if( datos.data.data.getUsersTableEmployees.length>0){
            localStorage.setItem("empleadoActivo","true")
           }else{
             localStorage.setItem("empleadoActivo","false")
           }
           this.setState({totalEmpleados:datosEmpleados.length})  
           this.setState({empleadosTotales:datosEmpleados})
           let resultados7 = datosEmpleados.filter(function(hero) {
             return hero.ATSDetectado === 'true';
           });
           array7.push(resultados7)
           this.setState({AtsDetectado:array7[0]})          
         })
 
         .catch((error) => {
         }); 

         let evaluacionesRealizadasPeriodoActual;
         let evaluacionATSContestado;
         let resultATS;
         let evaluacionRPContestado;
         let resultRP;
         let evaluacionEEOContestado;
         let resultEEO;

         axios({
          url:  API,
          method:'post',
          data:{
          query:`
           query{
                getEmployeesPerido(data:"${[idAdmin]}"){
                  id
                  nombre
                  ApellidoP
                  ApellidoM
                  CentroTrabajo
                  idPeriodo
                  periodo
                  encuesta
                  fk_empleados
  
                }
              }
            `
          }
        })
        .then(datos => {	
          evaluacionesRealizadasPeriodoActual =   datos.data.data.getEmployeesPerido;
          evaluacionesRealizadasPeriodoActual.sort(function(a,b) {return (a.ApellidoP > b.ApellidoP) ? 1 : ((b.ApellidoP > a.ApellidoP) ? -1 : 0);} );
          evaluacionATSContestado = evaluacionesRealizadasPeriodoActual.filter(function(hero){
            return hero.encuesta ==="ATS"
          }) 
          resultATS = evaluacionATSContestado.filter(function(hero){
            return hero.periodo === periodo 
          })

          this.setState({empleadosAts:resultATS})
          this.setState({ATSContestado:resultATS.length})
          let arrayInicial = arrayDatos[0];
          var arrayATS = [];
          for (var i = 0; i < arrayInicial.length; i++) {
              var igual=false;
              for (var j = 0; j < resultATS.length & !igual; j++) {
                  if(arrayInicial[i].id === resultATS[j].id) 
                          igual=true;
              }
              if(!igual)arrayATS.push(arrayInicial[i]);
          }

          this.setState({empleadosAtsFalse:arrayATS})
          this.setState({ATSNoContestado:arrayATS.length})
          evaluacionRPContestado = evaluacionesRealizadasPeriodoActual.filter(function(hero){
            return hero.encuesta === "RP"
          }) 
          resultRP = evaluacionRPContestado.filter(function(hero){
            return hero.periodo === periodo 
          })
          this.setState({empleadosRP:resultRP})
          this.setState({RPContestado:resultRP.length})

          var arrayRP = [];
          for (var iRP = 0; iRP < arrayInicial.length; iRP++) {
              var igualRP=false;
              for (var jRP = 0; jRP < resultRP.length & !igualRP; jRP++) {
                  if(arrayInicial[iRP].id === resultRP[jRP].id) 
                          igualRP=true;
              }
              if(!igualRP)arrayRP.push(arrayInicial[iRP]);
          }

          this.setState({empleadosRPFalse:arrayRP})
          this.setState({RPNoContestado:arrayRP.length})

          evaluacionEEOContestado = evaluacionesRealizadasPeriodoActual.filter(function(hero){
            return hero.encuesta === "EEO"
          }) 
          resultEEO = evaluacionEEOContestado.filter(function(hero){
            return hero.periodo === periodo 
          })

          this.setState({empleadosEEO:resultEEO})
          this.setState({EEOContestado:resultEEO.length})

          var arrayEEO = [];
          for (var iEEO = 0; iEEO < arrayInicial.length; iEEO++) {
              var igualEEO=false;
              for (var jEEO = 0; jEEO < resultEEO.length & !igualEEO; jEEO++) {
                  if(arrayInicial[iEEO].id === resultEEO[jEEO].id) 
                          igualEEO=true;
              }
              if(!igualEEO)arrayEEO.push(arrayInicial[iEEO]);
          }
          this.setState({empleadosEEOFalse:arrayEEO})
          this.setState({EEONoContestado:arrayEEO.length})
        })
    }

  handleFront = async () =>{
  
  let em;
  let idSuperUsuario;
  idSuperUsuario =localStorage.getItem("fk_superusuario")
    axios({
		  url:  API,
		  method:'post',
		  data:{
		  query:`
		   query{
		  	verifyPackSuperUser(data:"${[idSuperUsuario]}"){
          empresas
          empleados
          id
          nombre
          apellidos
          RazonSocial
          telefono
          correo
          activo
          fechaRegistro
          fk_paquetes
				  }
				}
			  `
		  }
		})
		.then(datos => {		
      em =datos.data.data.verifyPackSuperUser[0].empleados
      let values = datos.data.data.verifyPackSuperUser[0]
      if(values.fk_paquetes === "40" || values.fk_paquetes === "41" || values.fk_paquetes === "42"){
        this.setState({disabledButtons:true})
        this.setState({leyendaDemo:"Licencia demo adquirida, funciones principales no disponibles"})
      }
      localStorage.setItem("paqueteAdquirido",values.fk_paquetes)
      this.setState({empleados:em})
		}).catch(err=>{
		}) 
  }

  verifyTables = async () =>{
  const idAdmin   = await localStorage.getItem('idAdmin')
  await axios({
    url:  API,
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
      if(datos.data.data.deptoActive.length>0){
        localStorage.setItem("DepartamentoActivo","true")
      }else{
        localStorage.setItem("DepartamentoActivo","false")
      }
  
    }).catch(err=>{
    })
    await axios({
      url:  API,
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
        if(datos.data.data.sucActive.length>0){
          localStorage.setItem("SucursalActiva","true")
        }else{
          localStorage.setItem("SucursalActiva","false")
        }
      }).catch(err=>{
      })
    await axios({
      url:  API,
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
        if(datos.data.data.puestoActive.length>0){
          localStorage.setItem("PuestoActivo","true")
        }else{
          localStorage.setItem("PuestoActivo","false")
        }
      }).catch(err=>{
      })
  }
      getUrlLogo(){
        let idAdmin = localStorage.getItem("idAdmin")
        axios({
          url:  API,
          method:'post',
          data:{
          query:`
          query{
            getLogo(data:"${[idAdmin]}"){
              url
                  }
                }
              `
          }
          }).then((datos) => {
            if(datos.data.data.getLogo.url){
              localStorage.setItem("urlLogo",datos.data.data.getLogo.url)
            }
            this.setState({urlLogo:datos.data.data.getLogo.url})
          }).catch(err=>{
            console.log("datos error url " , err.response)
          })
      }
    toggle = (nr) => () => {  
      let modalNumber = 'modal' + nr
      this.setState({
        [modalNumber]: !this.state[modalNumber]
      });
    }

    countdown =  (deadline) => {
      const timerUpdate = setInterval( async () => {
        let t = this.getRemainingTime(deadline);
        // let descripcion;
        // console.log("remine time",t )
        if(t.remainTime <= 1) {
          clearInterval(timerUpdate);
          // let idAdmin = localStorage.getItem("idAdmin")
          // descripcion = this.state.periodo
          // axios({
          //   url:  API,
          //   method:'post',
          //   data:{
          //   query:`
          //   mutation{
          //     deletePeriodo(data:"${[descripcion,idAdmin]}"){
          //         message
          //           }
          //         }
          //       `
          //   }
          // })
          // .then(datos => {	
          //   DialogUtility.alert({
          //     animationSettings: { effect: 'Fade' },        
          //     title:"AVISO!",   
          //     content: 'Su periodo está Desactivado por favor Registre uno nuevo',
          //     position: "fixed",
          //   }
          //   ) 
          // })
        }
      }, 1000)
    };
      alerta1 =  (deadline) => {
        const timerUpdate = setInterval( async () => {
        let t = this.getRemainingTime(deadline);
        let alerta1Enviada;
        let ATS;
        let RP;
        let EEO;
        let Eventos;

        Eventos = this.state.datosEventos.idEventos;
        alerta1Enviada = this.state.datosEventos.Alerta1Enviada;
        if(t.remainTime <= 1 && alerta1Enviada==='false') {
          clearInterval(timerUpdate);
          let idAdmin = localStorage.getItem("idAdmin")
          await axios({
            url:  API,
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
              ATS=datos.data.data.getEmployeesResolvesSurveyATSFalse
              const correo  = localStorage.getItem("correo")
              const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su evaluación ATS por favor realice la actividad lo mas pronto posible "
              ATS.map(rows=>{
                axios({
                  url:  API,
                  method:'post',
                  data:{
                  query:`
                  mutation{
                    alert1(data:"${[rows.correo ,correo,mensaje,Eventos]}"){
                      message
                          }
                        }
                      `
                  }
                })
                .then(datos => {	
                }).catch(err=>{
                })
  
              })
            }).catch(err=>{
            })  
          await axios({
            url:  API,
            method:'post',
            data:{
            query:`
              query{
              getEmployeesResolvesSurveyRPFalse(data:"${[idAdmin]}"){
                    nombre
                    ApellidoP
                    ApellidoM
                    correo
                    }
                  }
                `
            }
            }).then((datos) => {
            const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su evaluación RP por favor realice la actividad lo mas pronto posible "
            RP=datos.data.data.getEmployeesResolvesSurveyRPFalse
            const correo  = localStorage.getItem("correo")
            RP.map(rows=>{
                axios({
                url:  API,
                method:'post',
                data:{
                query:`
                mutation{
                  alert1(data:"${[rows.correo , correo , mensaje,Eventos]}"){
                    message
                        }
                      }
                    `
                }
              })
              .then(datos => {	
              }).catch(err=>{
              })
            })
            }).catch(err=>{
            }) 
        await axios({
          url:  API,
          method:'post',
          data:{
          query:`
            query{
            getEmployeesResolvesSurveyEEOFalse(data:"${[idAdmin]}"){
                  nombre
                  ApellidoP
                  ApellidoM
                  correo
                  }
                }
              `
          }
          }).then((datos) => {
          const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su evaluación EEO por favor realice la actividad lo mas pronto posible "
            EEO=datos.data.data.getEmployeesResolvesSurveyEEOFalse
            const correo  = localStorage.getItem("correo")
            EEO.map(rows=>{
              axios({
                url:  API,
                method:'post',
                data:{
                query:`
                mutation{
                  alert1(data:"${[rows.correo ,correo,mensaje,Eventos]}"){
                    message
                        }
                      }
                    `
                }
              })
              .then(datos => {	
              }).catch(err=>{
              })
            })
          }).catch(err=>{
          })  
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

    alerta2 =  (deadline) => {
    const timerUpdate = setInterval( async () => {
      let t = this.getRemainingTime(deadline);
      let alerta2Enviada;
      let ATS;
      let RP;
      let EEO;
      let Eventos;
      Eventos = this.state.datosEventos.idEventos;
      alerta2Enviada = this.state.datosEventos.Alerta2Enviada;
      if(t.remainTime <= 1 && alerta2Enviada === 'false') {
        clearInterval(timerUpdate);
        let idAdmin = localStorage.getItem("idAdmin")
        await axios({
          url:  API,
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
          ATS=datos.data.data.getEmployeesResolvesSurveyATSFalse
          const correo  = localStorage.getItem("correo")
          const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su evaluación ATS por favor realice la actividad lo mas pronto posible"
          ATS.map(rows=>{
              axios({
              url:  API,
              method:'post',
              data:{
              query:`
                mutation{
                alert2(data:"${[rows.correo ,correo,mensaje,Eventos]}"){
                  message
                      }
                    }
                  `
              }
            })
            .then(datos => {	
            }).catch(err=>{
            })

            })
            }).catch(err=>{
            })  

        await axios({
          url:  API,
          method:'post',
          data:{
          query:`
            query{
            getEmployeesResolvesSurveyRPFalse(data:"${[idAdmin]}"){
                  nombre
                  ApellidoP
                  ApellidoM
                  correo
                  }
                }
              `
          }
          }).then((datos) => {
          const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su evaluación RP por favor realice la actividad lo mas pronto posible "
          RP=datos.data.data.getEmployeesResolvesSurveyRPFalse
          const correo  = localStorage.getItem("correo")
          RP.map(rows=>{
              axios({
              url:  API,
              method:'post',
              data:{
              query:`
              mutation{
                alert2(data:"${[rows.correo , correo , mensaje,Eventos]}"){
                  message
                      }
                    }
                  `
              }
            })
            .then(datos => {	
            }).catch(err=>{
            })
          })
          }).catch(err=>{
          }) 
      ///////////////////////////////////////////////////////////////////////////////////////////
      await axios({
        url:  API,
        method:'post',
        data:{
        query:`
          query{
          getEmployeesResolvesSurveyEEOFalse(data:"${[idAdmin]}"){
                nombre
                ApellidoP
                ApellidoM
                correo
                }
              }
            `
        }
            }).then((datos) => {
            const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su evaluación EEO por favor realice la actividad lo mas pronto posible "
             EEO=datos.data.data.getEmployeesResolvesSurveyEEOFalse
             const correo  = localStorage.getItem("correo")
             EEO.map(rows=>{
                axios({
                 url:  API,
                 method:'post',
                 data:{
                 query:`
                 mutation{
                   alert2(data:"${[rows.correo ,correo,mensaje,Eventos]}"){
                     message
                         }
                       }
                     `
                 }
               })
               .then(datos => {	
               }).catch(err=>{
               })
             })
            }).catch(err=>{
            })  
        }
      }, 1000)
    };

alerta3 =  (deadline) => {
  // const url = 'http://localhost:8000/graphql'
  const timerUpdate = setInterval( async () => {
    let t = this.getRemainingTime(deadline);
    const idAdmin  = localStorage.getItem("idAdmin")
    let alerta3Enviada;
    let ATS;
    let RP;
    let EEO;
    let Eventos;
   
    Eventos = this.state.datosEventos.idEventos;
    alerta3Enviada = this.state.datosEventos.Alerta3Enviada;

    if(t.remainTime <= 1 && alerta3Enviada==='false') {
      clearInterval(timerUpdate);
      let idAdmin = localStorage.getItem("idAdmin")
      await axios({
        url:  API,
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
             ATS=datos.data.data.getEmployeesResolvesSurveyATSFalse
             const correo  = localStorage.getItem("correo")
             const mensaje = "Estimado Colaborador el periodo de evaluación se cerrara pronto por favor responda su evaluación ATS lo antes posible"
             ATS.map(rows=>{
                axios({
                 url:  API,
                 method:'post',
                 data:{
                 query:`
                  mutation{
                   alert3(data:"${[rows.correo ,correo,mensaje,Eventos]}"){
                     message
                         }
                       }
                     `
                 }
               })
               .then(datos => {	
               // descripcion = datos.data.data.getPeriodo[0].Descripcion
               }).catch(err=>{
               })
 
             })
            }).catch(err=>{
            })  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
    await axios({
      url:  API,
      method:'post',
      data:{
      query:`
        query{
        getEmployeesResolvesSurveyRPFalse(data:"${[idAdmin]}"){
              nombre
              ApellidoP
              ApellidoM
              correo
              }
            }
          `
      }
          }).then((datos) => {
            const mensaje = "Estimado Colaborador el periodo de evaluación se cerrara pronto por favor responda su evaluación RP lo antes posible"
            RP=datos.data.data.getEmployeesResolvesSurveyRPFalse
          const correo  = localStorage.getItem("correo")
          RP.map(rows=>{
              axios({
              url:  API,
              method:'post',
              data:{
              query:`
              mutation{
                alert3(data:"${[rows.correo , correo , mensaje,Eventos]}"){
                  message
                      }
                    }
                  `
              }
            })
            .then(datos => {	
            }).catch(err=>{
            })
          })
          }).catch(err=>{
          }) 
      ///////////////////////////////////////////////////////////////////////////////////////////
      await axios({
        url:  API,
        method:'post',
        data:{
        query:`
          query{
          getEmployeesResolvesSurveyEEOFalse(data:"${[idAdmin]}"){
                nombre
                ApellidoP
                ApellidoM
                correo
                }
              }
            `
        }
            }).then((datos) => {
              const mensaje = "Estimado Colaborador el periodo de evaluación se cerrara pronto por favor responda su evaluación EEO lo antes posible"
              EEO=datos.data.data.getEmployeesResolvesSurveyEEOFalse
             const correo  = localStorage.getItem("correo")
             EEO.map(rows=>{
                axios({
                 url:  API,
                 method:'post',
                 data:{
                 query:`
                 mutation{
                   alert3(data:"${[rows.correo ,correo,mensaje,Eventos]}"){
                     message
                         }
                       }
                     `
                 }
               })
               .then(datos => {	
               }).catch(err=>{
               })
             })
            }).catch(err=>{
            })  
    }
  }, 1000)
};

handleDropdown = (event) => {
  this.setState({dropdown: event.currentTarget});
};
handleClose = () => {
  this.setState({dropdown: null});
};

tablaATSContestado(){
  this.setState({tablaATSContestado:true})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:false})

}
tablaATSNoContestado(){
  this.setState({tablaATSNoContestado:true})
  this.setState({tablaATSContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:false})
}
tablaRPContestado(){
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:true})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:false})
}

tablaRPNoContestado(){
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:true})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:false})
}
tablaEEOContestado(){
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:true})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:false})
}
tablaEEONoContestado(){
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:true})
  this.setState({tablaATSDetectado:false})
}
tablaATSDetectado(){
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:true})
}
cerraTablas(parametro){
if(parametro === 1){
  this.setState({graficaDistribucionInicial:true})
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaATSDetectado:false})
  this.setState({tablaEEONoContestado:false})
}
else if(parametro === 2){
  this.setState({graficaDistribucionInicial:true})
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaATSDetectado:false})
  this.setState({tablaEEONoContestado:false})
  
}
else if(parametro === 3){
  this.setState({graficaDistribucionInicial:true})
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaATSDetectado:false})
  this.setState({tablaEEONoContestado:false})
}
else if(parametro === 4){
  this.setState({graficaDistribucionInicial:true})
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaATSDetectado:false})
  this.setState({tablaEEONoContestado:false})
}
else if(parametro === 5){
  this.setState({graficaDistribucionInicial:true})
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaATSDetectado:false})
  this.setState({tablaEEONoContestado:false})
}
else if(parametro === 6){
  this.setState({graficaDistribucionInicial:true})
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaATSDetectado:false})
  this.setState({tablaEEONoContestado:false})
}
else if(parametro === 8){
  this.setState({graficaDistribucionInicial:true})
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaATSDetectado:false})
  this.setState({tablaEEONoContestado:false})
}
}

  adminEmpleados(){
    this.setState({tablaEmpleados:true})
    this.setState({cardInicial:false})
  }

  cerrarProceso(){
    this.setState({tablaEmpleados:false})
    this.setState({cardInicial:true})
    this.setState({tablaDetalles:false})
    this.setState({tableDetallesPortal:false})
    this.setState({tablaTeletrabajo:false})
    this.setState({tablaTeletrabajoAsignado:false})
  }
  cerrarDetalles(){
    this.setState({tablaEmpleados:false})
    this.setState({tablaDetalles:false})
    this.setState({cardInicial:true})
    this.setState({tableDetallesPortal:false})
    this.setState({tablaTeletrabajo:false})
    this.setState({tablaTeletrabajoAsignado:false})
  } 
  cerrarDetallesPortal(){
    this.setState({tablaEmpleados:false})
    this.setState({tablaDetalles:false})
    this.setState({cardInicial:true})
    this.setState({tableDetallesPortal:false})
    this.setState({tablaTeletrabajo:false})
    this.setState({tablaTeletrabajoAsignado:false})
  }
  cerrarTablaTeleTrabajo(){
    this.setState({tablaEmpleados:false})
    this.setState({tablaDetalles:false})
    this.setState({cardInicial:true})
    this.setState({tableDetallesPortal:false})
    this.setState({tablaTeletrabajo:false})
    this.setState({tablaTeletrabajoAsignado:false})
  }
  cerrarTablaTeleTrabajoAsignado(){
    this.setState({tablaEmpleados:false})
    this.setState({tablaDetalles:false})
    this.setState({cardInicial:true})
    this.setState({tableDetallesPortal:false})
    this.setState({tablaTeletrabajo:false})
    this.setState({tablaTeletrabajoAsignado:false})
  }
  administrarEmpleados(rows){
    this.setState({modalAdministracion:true})
    this.setState({dataAdminEmpleado: rows})
  }
  onOkModalAdministracion(){
    this.setState({modalAdministracion:false})

  }
  habilitarAcceso(){
    this.setState({accesoPortal:true})
    this.setState({habilitarAcceso:false})
  }
  cancelarHabilitarAcceso(){
    this.setState({confirmar:false})
    this.setState({accesoPortal:false})
    this.setState({habilitarAcceso:true})
  }

  onChangeInputCorreo(e){
    this.setState({valueInput:e.target.value})
  }
  onChangeInputPass(e){
    this.setState({confirmar:true})
    this.setState({valueInputPass:e.target.value})
  }
  confirmAccess(){
    let dataEmpleado =  this.state.dataAdminEmpleado

    if(this.state.valueInputPass){
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
        mutation{
            accesoPortal(data:"${[dataEmpleado.id,this.state.valueInputPass]}"){
            message
                }
              }
            `
        }
      })
      .then(datos => {	
        if(datos.data.data.accesoPortal.message){
          DialogUtility.alert({
            animationSettings: { effect: 'FadeZoom' },           
            title:'Aviso',
            content: `Acceso al portal de ${dataEmpleado.nombre + " " + dataEmpleado.ApellidoP + " " + dataEmpleado.ApellidoM}`,
            position: "fixed",
          })
        }
        setTimeout(()=>{
          window.location.reload()
        },2000)
      }).catch(err=>{
      })
    }else{
      DialogUtility.alert({
        animationSettings: { effect: 'Fade' },           
        title:'Aviso',
        content: 'Ingrese un valor válido',
        position: "fixed",
      }
      )
    }
  }
  suspendAccess(rows){
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
        mutation{
            suspenderAccesoPortal(data:"${[rows.id]}"){
            message
                }
              }
            `
        }
      })
      .then(datos => {	
        if(datos.data.data.suspenderAccesoPortal.message){
          DialogUtility.alert({
            animationSettings: { effect: 'FadeZoom' },           
            title:'Aviso',
            content: `Sin acceso al portal de ${rows.nombre + " " + rows.ApellidoP + " " + rows.ApellidoM}`,
            position: "fixed",
          })
        }
        setTimeout(()=>{
          window.location.reload()
        },2000)
      }).catch(err=>{
      })
    
  }
  detallesPortal(){
    this.setState({tablaEmpleados:false})
    this.setState({cardInicial:false})
    this.setState({tableDetallesPortal:true})
    this.setState({tablaDetalles:false})
    this.setState({tablaTeletrabajo:false})
    this.setState({tablaTeletrabajoAsignado:false})
  }
  tablaDetalles(){
    this.setState({tablaEmpleados:false})
    this.setState({cardInicial:false})
    this.setState({tableDetallesPortal:false})
    this.setState({tablaDetalles:true})
    this.setState({tablaTeletrabajo:false})
    this.setState({tablaTeletrabajoAsignado:false})
  }
  tablaTeletrabajo(){
    this.setState({tablaEmpleados:false})
    this.setState({cardInicial:false})
    this.setState({tableDetallesPortal:false})
    this.setState({tablaDetalles:false})
    this.setState({tablaTeletrabajo:true})
    this.setState({tablaTeletrabajoAsignado:false})
  }
  tablaTeletrabajoAsignado(){
    this.setState({tablaEmpleados:false})
    this.setState({cardInicial:false})
    this.setState({tableDetallesPortal:false})
    this.setState({tablaDetalles:false})
    this.setState({tablaTeletrabajo:false})
    this.setState({tablaTeletrabajoAsignado:true})
  }

  anadirPlantillaTeletrabajo(param){
    if(param){
    if(param[0]){

    let array = []
    let datosEmpleados = this.state.empleadosTotales
    let dataFilter;    
    param.map(rows=>{
    dataFilter =  datosEmpleados.filter(function(hero){
        return hero.id === rows[0]
    })
    array.push(dataFilter[0])  
    })


    this.setState({seleccionTeletrabajo:array})
    this.setState({modalTeletrabajo:true})
    }else{
      DialogUtility.alert({
        animationSettings: { effect: 'FadeZoom' },           
        title:'Aviso',
        content: `Seleccione al menos un empleado`,
        position: "fixed",
      })
    }
    }else{
      DialogUtility.alert({
        animationSettings: { effect: 'FadeZoom' },           
        title:'Aviso',
        content: `Seleccione al menos un empleado`,
        position: "fixed",
      })
    }
  }

  registrarPlantilla(){
    for(let i = 0; i <= this.state.seleccionTeletrabajo.length; i ++){
      if(this.state.seleccionTeletrabajo[i]){
      axios({
            url:  API,
            method:'post',
            data:{
            query:`
            mutation{
                registerPlantilla(data:"${[this.state.seleccionTeletrabajo[i].id]}"){
                message
                    }
                  }
                `
            }
          })
          .then(datos => {	
            if(datos.data.data.registerPlantilla.message){
              DialogUtility.alert({
                animationSettings: { effect: 'FadeZoom' },           
                title:'Aviso',
                content: `Acceso a modalidad teletrabajo`,
                position: "fixed",
              })
              setTimeout(()=>{
                window.location.reload();                
              },2000)
            }
          }).catch(err=>{
      })
    }
    }
    // this.state.seleccionTeletrabajo.map(rows=>{
    
    // })
  }
  cancelarPlantilla(){
    this.setState({modalTeletrabajo:false})
  }

  quitarAccesoTeletrabajo(rows){
    axios({
      url:  API,
      method:'post',
      data:{
      query:`
      mutation{
        quitarAccesoTeletrabajo(data:"${[rows.id]}"){
          message
              }
            }
          `
      }
    })
    .then(datos => {	
      if(datos.data.data.quitarAccesoTeletrabajo.message){
        DialogUtility.alert({
          animationSettings: { effect: 'FadeZoom' },           
          title:'Aviso',
          content: `Modaldad cancelada`,
          position: "fixed",
        })
        setTimeout(()=>{
          window.location.reload();                
        },2000)
      }
    }).catch(err=>{
})
  }

  render() {
    let periodoActivo;
    let datosEmpleados;
    let filtro;
    if(this.state.periodo){
      periodoActivo= <label style={{color:'green'}}><strong>{this.state.periodo.toUpperCase()}</strong></label>
    }
    else{
      let periodoString =  "Periodo finalizado"
      periodoActivo= <label style={{color:'red'}}><strong>{periodoString.toUpperCase()}</strong></label>
    } 
    let Alerta;
    let dep;
    let suc;
    let pues;
    let alertaPuesto = localStorage.getItem("PuestoActivo")
    let alertaSucursal = localStorage.getItem("SucursalActiva")
    let AlertaDepartamento = localStorage.getItem("DepartamentoActivo")
    let empleadoNoEncontrado;
    let empleadoAc=localStorage.getItem("empleadoActivo")
    if(empleadoAc==="false"){
      empleadoNoEncontrado  = "Actualmente el sistema no contiene empleados registrados" 
       Alerta =   <Alert color="danger">Para comenzar a usar Diagnóstico035 usted debe contar con al menos 1 Empleado Registrado</Alert>
    }if(AlertaDepartamento==="false"){
      dep =   <Alert color="danger">Para comenzar a usar Diagnóstico035 usted debe Contar con al menos 1 Departamento Registrado</Alert>
    }if(alertaSucursal==="false"){
      suc =   <Alert color="danger">Para comenzar a usar Diagnóstico035 usted debe Contar con al menos 1 Centro de Trabajo Registrado</Alert>
    }if(alertaPuesto==="false"){
      pues =   <Alert color="danger">Para comenzar a usar Diagnóstico035 usted debe Contar con al menos 1 Puesto Registrado</Alert>
    }
    let expiro;
    if(this.state.licencia){
      expiro = <Alert color="danger" className="text-center ">{this.state.licencia}</Alert>
    }

        //////Opciones de las tablas
const options = {
  filterType: "dropdown",
  responsive: "stacked",
  search:true,
  print:false,
  download:false,
  sort:false,
  filter:true,
  viewColumns:false,
  elevation:0,
  textLabels: {
            body: {
              noMatch: empleadoNoEncontrado,
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
    let array2 = []
    let param1 = tableState.selectedRows.data
      if(param1[0]){
        let array = []
        param1.map(param =>{
          let filter = tableState.data.filter(function(rows){
            return  rows.index  === param.dataIndex
          })

          array.push(filter)
        })
        if(array[0]){
          array.map(rows=>{
            if(rows[0]){
              array2.push([rows[0].data[0],rows[0].data[4],rows[0].data[5]])
            }
          })
        }
      }
    datosEmpleados = array2
  },
  onFilterChange: (action, filtroTable) => {
  filtro=filtroTable

    }     };
  const options2 = {
    filterType: "dropdown",
    responsive: "stacked",
    search:true,
    print:true,
    download:true,
    sort:true,
    filter:true,
    viewColumns:true,
    elevation:0,
    textLabels: {
              body: {
                noMatch: empleadoNoEncontrado,
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
    // datosEmpleados = tableState.displayData
    },
    onFilterChange: (action, filtroTable) => {
      // filtro=filtroTable
      }     };  
  
    const columnsATSContestado = [];
    let tituloTablaVacia = <h6><strong>La tabla no contiene datos</strong></h6>
    const dataATSContestado =  [];
    let tablaVacia  = 
    <center>
    <div style={{width:"100%"}}>
    <Card type="inner"title={tituloTablaVacia}>
    </Card>
    </div> 
    </center>
    let updateLogo;
    if(this.state.modal21){
     updateLogo  =  
       <MDBModal isOpen={this.state.modal21} toggle={this.toggle(21)}  tabindex="-1"  size="md">
         <Card title = {<h6><strong>Modificar logo</strong></h6>}>
         <MDBModalBody>
         <UpdateLogo/>
         </MDBModalBody>   
         </Card>

       </MDBModal>
    }
    let logo;
    if(!this.state.urlLogo){
    logo =  <Button className="borderNone"  style={{width:"200px" }}  icon={<CloudUploadOutlined />} type='link' onClick={this.toggle(20)}>
    Adjuntar logo
    </Button>
    }
 
    let modificarLogo;
    if(this.state.urlLogo){
     logo = <Button className="borderNone"  style={{width:"200px" }}  icon={<CloudUploadOutlined />} type='link' onClick={this.toggle(21)}>
        Modificar logo
     </Button>
    }
/////////////////////////////////////////////////////////////////////////////////////////////
     let modalInfoG;
     if(this.state.modal16){
        modalInfoG  =  
        <MDBModal isOpen={this.state.modal16} toggle={this.toggle(16)} size="lg">
          <MDBModalBody>
          <Card type='inner' title = {<div><h6><strong>Información general</strong></h6></div>} >
          <strong>Licencia de {this.state.empleados} Empleados</strong>
          <br/>
          <br/>
          <strong>Empleados registrados : {this.state.totalEmpleados}</strong>
          <br/>
          <br/>
          <strong>Empleados por registrar : {(this.state.empleados-this.state.totalEmpleados)}</strong><br/>
          <br/>
          {expiro}
          </Card>
          </MDBModalBody>   
        </MDBModal>
     }
 let cargarLogo;
   if(this.state.modal20){
    cargarLogo  =  <MDBContainer >
      <MDBModal isOpen={this.state.modal20} toggle={this.toggle(20)}  tabindex="-1"  size="md">
        <Card title={<div><h6><strong>Adjuntar logo</strong></h6></div>}>
        <Upload/>
        </Card>  
      </MDBModal>
    </MDBContainer>

   }

   // TablaEmpleados de inicio
   let tablaEmpleados;
   const columns = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo", "Servicios del portal", "Administrar", "Quitar acceso"];
   const data = this.state.empleadosTotales.map(rows=>{
      let serviciosPortal;
      let button2;
      if(rows.accesoPortal === "true"){
        serviciosPortal = <font color = "#0751AF"><strong>Acceso Activo</strong></font>
        button2 = <Button style={{backgroundColor:"#AF0774", color:"white"}}  onClick = {e=> this.suspendAccess(rows)}>Suspender &nbsp; <i class="fas fa-solid fa-ban"></i></Button>
      }else if(rows.accesoPortal === "false"){
        button2 = <font color="#AF0784"><strong>Sin acceso</strong></font>
        serviciosPortal = <font color="#AF0784"><strong>Sin acceso</strong></font>
      }else{
        serviciosPortal = "ERROR"
      } 
      let button = <Button style={{backgroundColor:"#5DB195", color:"white"}} onClick = {e=> this.administrarEmpleados(rows)}>Administrar &nbsp; <i class="fas fa-cog"> </i></Button>
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo, serviciosPortal,button, button2])
   })

  const columnsTablaDetalles = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo","Correo","Género","Puesto"];

  let dataTablaDetalles = this.state.empleadosTotales.map(rows=>{
     return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo,rows.correo,rows.Sexo,rows.Puesto]) 
   })

   const columnsAccesoPortal = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo","Acceso al portal","Correo de acceso","Contraseña"];

   let dataTablaAccesoPortal = this.state.empleadosTotales.map(rows=>{
    let serviciosPortal;
    let contraseña;
    if(rows.accesoPortal === "true"){
      serviciosPortal = <font color = "#0751AF"><strong>Acceso Activo</strong></font>
    }else if(rows.accesoPortal === "false"){
      serviciosPortal = <font color="#AF0784"><strong>Sin acceso</strong></font>
    }else{
      serviciosPortal = "ERROR"
    } 
    if(rows.accesoPortal=== "true" && rows.passwordPortal){
      contraseña = <font color="green"><strong>{rows.passwordPortal}</strong></font> 
    }else{
      contraseña = <strong>No asignado</strong>
    }
     return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo,serviciosPortal,rows.correo,contraseña]) 
   })

   const columnsTeleTrabajo = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo","Correo","Género","Puesto"];
    let dataTeleTrabajo = this.state.arrayTeletrabajo.map(rows=>{
     return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo,rows.correo,rows.Sexo,rows.Puesto]) 
   })

   const columnsTeleTrabajoAsignado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo","Correo","Status","Suprimir acceso"];
   let dataTeleTrabajoAsignado = this.state.arrayTeletrabajoAsignado.map(rows=>{
    let button = <Button type="danger" onClick={e=> this.quitarAccesoTeletrabajo(rows)}>Suspender modalidad</Button>
    return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo,rows.correo,"Teletrabajo Asignado",button]) 
  })

   let hombres =  this.state.empleadosTotales.filter(function(rows){
    return rows.Sexo === "MASCULINO"
  })
  let mujeres =  this.state.empleadosTotales.filter(function(rows){
    return rows.Sexo === "FEMENINO"
  })
  let edad1529 =  this.state.empleadosTotales.filter(function(rows){
    return rows.FechaNacimiento === "15 A 19" || rows.FechaNacimiento === "20 A 24" || rows.FechaNacimiento === "25 A 29"
  })

  let edad3044 =  this.state.empleadosTotales.filter(function(rows){
    return rows.FechaNacimiento === "30 A 34" || rows.FechaNacimiento === "35 A 39" || rows.FechaNacimiento === "40 A 44"
  })
  let edad4559 =  this.state.empleadosTotales.filter(function(rows){
    return rows.FechaNacimiento === "45 A 49" || rows.FechaNacimiento === "50 A 54" || rows.FechaNacimiento === "55 A 59"
  })
  let edad6070 =  this.state.empleadosTotales.filter(function(rows){
    return rows.FechaNacimiento === "60 A 64" || rows.FechaNacimiento === "65 A 69" || rows.FechaNacimiento === "70 A más"
  })
////////////////////// evaluación ATS
  let tablaATSContestado;
  if(this.state.empleadosAts[0] &&  this.state.tablaATSContestado === true){
    const columnsATSContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
    const dataATSContestado = this.state.empleadosAts.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
    })
    tablaATSContestado = <div style = {{width:"100%"}}>
    <MUIDataTable
      title="Empleados que ya realizaron la evaluación ATS"
      data={dataATSContestado}
      columns={columnsATSContestado}
      options={options}
    />
  </div> 
    } else if (this.state.empleadosAts[0] === undefined  &&  this.state.tablaATSContestado === true ) {
      tablaATSContestado = tablaVacia
    }
    let tablaATSNoContestado;
    if(this.state.empleadosAtsFalse[0] &&  this.state.tablaATSNoContestado === true){
      const columnsATSNoContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
      const dataATSNoContestado = this.state.empleadosAtsFalse.map(rows=>{
        return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
      })
      tablaATSNoContestado = <div style = {{width:"100%"}}>

      <MUIDataTable
        title="Empleados que aun no realizan la evaluación ATS"
        data={dataATSNoContestado}
        columns={columnsATSNoContestado}
        options={options}
      />
      
    </div> 
      }else if (this.state.empleadosAtsFalse[0] === undefined &&  this.state.tablaATSNoContestado === true) {
        tablaATSNoContestado = tablaVacia
      }
      /////////////////////////////////////////////////////////////////////////////////////
      // Evaluación RP
      let tablaRPContestado;
      if(this.state.empleadosRP[0] &&  this.state.tablaRPContestado === true){
        const columnsRPContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
        const dataRPContestado = this.state.empleadosRP.map(rows=>{
          return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
        })
        tablaRPContestado =
        <div  style = {{width:"100%"}}>
        <MUIDataTable
          title="Empleados que ya realizaron la evaluación RP"
          data={dataRPContestado}
          columns={columnsRPContestado}
          options={options}
        />
      </div> 
        } else if (this.state.empleadosRP[0] === undefined  &&  this.state.tablaRPContestado === true ) {
          tablaRPContestado =  tablaVacia
        }

        let tablaRPNoContestado;
        if(this.state.empleadosRPFalse[0] &&  this.state.tablaRPNoContestado === true){
         
          const columnsRPNoContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
          const dataRPNoContestado = this.state.empleadosRPFalse.map(rows=>{
            return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
          })
          tablaRPNoContestado = 
          <div style = {{width:"100%"}}>
          <MUIDataTable
            title="Empleados aun no realizan la evaluación RP"
            data={dataRPNoContestado}
            columns={columnsRPNoContestado}
            options={options}
          />
        </div> 
          } else if (this.state.empleadosRPFalse[0] === undefined  &&  this.state.tablaRPNoContestado === true ) {
            tablaRPContestado = tablaVacia
          }
///////////////////////////////////////////////////////////////////////////////////////////////
// Evaluación EEO
          let tablaEEOContestado;
          if(this.state.empleadosEEO[0] &&  this.state.tablaEEOContestado === true){
          
            const columnsEEOContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];

            const dataEEOContestado = this.state.empleadosEEO.map(rows=>{
              return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
            })
            tablaEEOContestado = 
            <div style = {{width:"100%"}}>
            <MUIDataTable
              title = "Empleados que ya realizaron la evaluación EEO"
              data={dataEEOContestado}
              columns={columnsEEOContestado}
              options={options}
            />
          </div> 
            } else if (this.state.empleadosEEO[0] === undefined  &&  this.state.tablaEEOContestado === true ) {
              tablaEEOContestado = tablaVacia
            }
            let tablaEEONoContestado;
            if(this.state.empleadosEEOFalse[0] &&  this.state.tablaEEONoContestado === true){
              const columnsEEONoContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
              const dataEEONoContestado = this.state.empleadosEEOFalse.map(rows=>{
                return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
              })
              tablaEEONoContestado = <div  style = {{width:"100%"}}>
              <MUIDataTable
                title= "Empleados aún no realizan la evaluación EEO"
                data={dataEEONoContestado}
                columns={columnsEEONoContestado}
                options={options}
              />
              </div>
              } else if (this.state.empleadosEEOFalse[0] === undefined  &&  this.state.tablaEEONoContestado === true ) {
                tablaEEONoContestado = tablaVacia
              }
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              /// Empleados con ATSDetectado 
              let tablaATSDetectado;
              if(this.state.AtsDetectado[0] &&  this.state.tablaATSDetectado === true){
                const columnsATSDetectado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
    
                const dataATSDetectado= this.state.AtsDetectado.map(rows=>{
                  return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
                })
                tablaATSDetectado = 
                <div  style = {{width:"100%"}}>
                <MUIDataTable
                title="Empleados con ATS detectado"
                  data={dataATSDetectado}
                  columns={columnsATSDetectado}
                  options={options}
                />
              </div> 
                } else if (this.state.AtsDetectado[0] === undefined  &&  this.state.tablaATSDetectado === true ) {
                  tablaATSDetectado = tablaVacia
                }
   
      let cardInicial
      let titulo1 = <h6 className='family'><strong>Progreso evaluación ATS </strong></h6>;
      let titulo2 = <h6 className='family'><strong>Progreso evaluación RP </strong></h6>;
      let titulo3 = <h6 className='family'><strong>Progreso evaluación EEO </strong></h6>;
      let graficaDistribucionInicial;
      if(this.state.graficaDistribucionInicial === true && data[0]){
        graficaDistribucionInicial =  <div className='graficasDistribucion'>
        
        <Chart
          width={'420px'}
          height={'255px'}
          chartType="PieChart"
          loader={<div>Cargando distribución</div>}
          data={[
            ['Género', 'Total'],
            ['Hombres', hombres.length],
            ['Mujeres', mujeres.length],
            
          ]}
          options={{
            title: 'Distribución por Género',
            is3D: true,
          }}
          rootProps={{ 'data-testid': '2' }}
        />
        <Chart
          width={'420px'}
          height={'255px'}
          chartType="PieChart"
          loader={<div>Cargando dostribución</div>}
          data={[
            ['Rango', 'Edad'],
            ['De 15 a 29', edad1529.length],
            ['De 30 a 34', edad3044.length],
            ['De 45 a 59', edad4559.length],
            ['De 60 a 70 años o más', edad6070.length],
          ]}
          options={{
            title: 'Distribción por Edad',
            is3D: true,
          }}
          rootProps={{ 'data-testid': '2' }}
        />        
        </div>
      }else{
        graficaDistribucionInicial =   
       <div style = {{width:"90%",margin:"2%"}} >
       {Alerta}
       {dep}
       {suc}
       {pues}
       </div>
      }
      let herramintasEmpleados;
      if(this.state.graficaDistribucionInicial === true && data[0]){
        herramintasEmpleados =<Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
     <Button style={{width:300}} className= 'alignButton' type="info" block onClick={e=>this.detallesPortal()}><i class="fas fa-solid fa-users"></i>&nbsp; Detalles al portal</Button>  
     <Button style={{width:300}} className='alignButton' type="info" block onClick={e=>this.adminEmpleados()}><i class="fas fa-cog"> </i> &nbsp;  Administración de empleados</Button>
     <Button style={{width:300}} className= 'alignButton' type="info" block onClick={e=>this.tablaDetalles()}><i class="fas fa-solid fa-info"></i>&nbsp; Empleados registrados</Button>
     <Button style={{width:300}} className= 'alignButton' type="info" block onClick={e=>this.tablaTeletrabajo()}><i class="fas fa-solid fa-laptop"></i>&nbsp; Gestión a teletrabajo</Button>
     <Button style={{width:300}} className= 'alignButton' type="info" block onClick={e=>this.tablaTeletrabajoAsignado()}><i class="fas fa-solid fa-laptop"></i>&nbsp; Empleados con teletrabajo</Button>

     </Space>
      }

      if(this.state.tablaEmpleados === true){
      tablaEmpleados = <div style={{width:"80%"}}>
      <Card type='inner' title={<strong>Administración al portal de empleados</strong>} extra={<Button  style={{backgroundColor:"lightgreen",color:"white",border:"lightgreen"}} onClick = {e=> this.cerrarProceso()}>Cerrar proceso</Button>}> 
      <MUIDataTable
       data={data}
       columns={columns}
       options={options}
      />
      </Card> 
      </div>
      }
      let tablaDetalles;
      if(this.state.tablaDetalles === true){
        tablaDetalles = 
        <Card type='inner'  title={<strong>Empleados registrados</strong>} extra={<Button  style={{backgroundColor:"lightgreen",color:"white",border:"lightgreen"}} onClick = {e=> this.cerrarDetalles()}>Cerrar proceso</Button>}> 
        <MUIDataTable
        data={dataTablaDetalles}
        columns={columnsTablaDetalles}
        options={options2}
       />
       </Card>
      }

      let tablaAcceso;
      if(this.state.tableDetallesPortal === true){
        tablaAcceso = 
        <Card type='inner'  title={<strong>Detalles del portal de empleados</strong>} extra={<Button  style={{backgroundColor:"lightgreen",color:"white",border:"lightgreen"}} onClick = {e=> this.cerrarDetallesPortal()}>Cerrar proceso</Button>}> 
        <MUIDataTable
        data={dataTablaAccesoPortal}
        columns={columnsAccesoPortal}
        options={options}
       />
       </Card>
      }

      let tablaTeletrabajo;
      if(this.state.tablaTeletrabajo === true){
        tablaTeletrabajo = 
        <Card type='inner'  title={<strong>Selección de empleados a teletrabajo</strong>} extra={<div><Button type='primary' onClick = {e=> this.anadirPlantillaTeletrabajo(datosEmpleados)}>Añadir plantilla</Button>&nbsp;&nbsp;&nbsp;<Button  style={{backgroundColor:"lightgreen",color:"white",border:"lightgreen"}} onClick = {e=> this.cerrarTablaTeleTrabajo()}>Cerrar proceso</Button></div>}> 
        <MUIDataTable
        data={dataTeleTrabajo}
        columns={columnsTeleTrabajo}
        options={options}
       />
       </Card>
      }

      let tablaTeletrabajoAsignado;
      if(this.state.tablaTeletrabajoAsignado === true){
        tablaTeletrabajo = 
        <Card type='inner'  title={<strong>Empleados con teletrabajo</strong>} extra={<div><Button  style={{backgroundColor:"lightgreen",color:"white",border:"lightgreen"}} onClick = {e=> this.cerrarTablaTeleTrabajoAsignado()}>Cerrar proceso</Button></div>}> 
        <MUIDataTable
        data={dataTeleTrabajoAsignado}
        columns={columnsTeleTrabajoAsignado}
        options={options2}
       />
       </Card>
      }

      let leyendaDemo;
      if(this.state.leyendaDemo){
        leyendaDemo = <font className='family' color = "red"><strong>{this.state.leyendaDemo}</strong></font>
      }else{
        leyendaDemo = <strong><font className='family' color="green">Periodo actual:  {localStorage.getItem("periodo")}</font></strong>
      }

      if(this.state.cardInicial === true){
        cardInicial  = <div style={{width:"91%"}}>
          <center>
          <Card title={leyendaDemo} extra={<font  className='family' color="green">Licencia vigente &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </font>}>  
          <nav class="navbar navbar-light" style={{backgroundColor:"#e3f2fd"}}>
          <Button className="borderNone" style={{ color: '#FC1B99',width:"200px" }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleDropdown}> Herramientas &nbsp;<i class="fas fa-cog"> </i></Button>     
          <Button className="borderNone" icon = { <BarChartOutlined />} style={{width:"200px" }}  type="link" onClick={this.toggle(16)}>Datos generales</Button>
          {logo} 
          <Button className="borderNone" type="link"  style={{width:"200px" }}  icon = {<VideoCameraOutlined />} onClick={e=>this.showModal2()}>Videos tutoriales</Button>
          <Button className="borderNone" type="link"  style={{width:"200px" }}  icon = {<UserSwitchOutlined />} onClick = {e=>this.showModal(1)}>ATS detectado</Button>
          </nav>
          <div className='distribucion'>
         
            {herramintasEmpleados}
            {graficaDistribucionInicial}
            
            <Space direction="vertical">
            </Space>
          </div>
          </Card>
          </center>
        </div> 
      }
      
      let modal =   <Modal
      type="inner"
      width={1100}
      title={"Tabla de resultados"}
      cancelText="Cancelar"
      okText="Aceptar"
      visible={this.state.visible}
      onOk={e=>this.handleOk()}
      confirmLoading={this.state.confirmLoading}
      onCancel={e=>this.handleOk()}
    >
      {tablaATSDetectado}
      {tablaATSContestado}
      {tablaATSNoContestado}
      {tablaRPContestado}
      {tablaRPNoContestado}
      {tablaEEOContestado}
      {tablaEEONoContestado}
    </Modal>
    let modalTutorial =   <Modal
        type="inner"
        width={1200}
        title={"Tutoriales de Diagnóstico035"}
        cancelText="Cancelar"
        okText="Aceptar"
        visible={this.state.visible2}
        onOk={e=>this.handleOk2()}
        onCancel={e=>this.handleOk2()}
      >
        <div className="modalVideo">
        <div className='row'> 
        <iframe style={{margin:"1"}} width="400" height="230"src="https://www.youtube.com/embed/Gf9OqyhVC0o" title="Primeros pasos en Diagnostico035 2.0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <ModalVideo style={{margin:"1%"}} channel='vimeo' isOpen={this.state.isOpen} videoId='461258739' onClose={() => this.setState({isOpen: false})} />
        </div> 
        <div className='row'>
        <iframe width="400" height="300" src="https://www.youtube.com/embed/8Q0H9v6xSas" title="Como dar de baja empleados en Diagnostico035" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <iframe width="400" style={{marginLeft:"1%"}} height="300" src="https://www.youtube.com/embed/Kedg-1OfoNA" title="Como generar un informe ejecutivo ATS con Diagnostico035" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        </div>
      </Modal>

      
   let totalAts = this.state.empleadosAts.length + this.state.empleadosAtsFalse.length
   var porcentajeATS= (this.state.empleadosAts.length / totalAts)*100;
   var intPorcentajeATS= Math.round( porcentajeATS);

   var porcentajeATSFalse= (this.state.empleadosAtsFalse.length / totalAts)*100;
   var intPorcentajeATSFalse= Math.round( porcentajeATSFalse);

   
   let totalRP = this.state.empleadosRP.length + this.state.empleadosRPFalse.length
   var porcentajeRP= (this.state.empleadosRP.length / totalRP)*100;
   var intPorcentajeRP= Math.round( porcentajeRP);

   var porcentajeRPFalse= (this.state.empleadosRPFalse.length / totalRP)*100;
   var intPorcentajeRPFalse= Math.round( porcentajeRPFalse);

   let totalEEO = this.state.empleadosEEO.length + this.state.empleadosEEOFalse.length
   var porcentajeEEO= (this.state.empleadosEEO.length / totalEEO)*100;
   var intPorcentajeEEO= Math.round( porcentajeEEO);

   var porcentajeEEOFalse= (this.state.empleadosEEOFalse.length / totalEEO)*100;
   var intPorcentajeEEOFalse= Math.round( porcentajeEEOFalse);  

   let progressInstanceATS;
   let progressInstanceRP;
   let progressInstanceEEO;
   if(intPorcentajeATS || intPorcentajeATSFalse ){
    progressInstanceATS =<ProgressBar style={{marginTop:"10%"}}> <ProgressBar variant="primary" animated now={intPorcentajeATS}  label={`${intPorcentajeATS}%`} /><ProgressBar variant="danger" animated now={intPorcentajeATSFalse}  label={`${intPorcentajeATSFalse}%`} /></ProgressBar>;
   }else{
    progressInstanceATS =<ProgressBar style={{marginTop:"10%"}}> <ProgressBar variant="primary" animated now={50}  label={`Porcentaje no calculado`} /><ProgressBar variant="danger" animated now={50}  label={`Porcentaje no calculado`} /></ProgressBar>;
   }
   if(intPorcentajeRP || intPorcentajeRPFalse ){
    progressInstanceRP=<ProgressBar style={{marginTop:"10%"}}> <ProgressBar variant="primary" animated now={intPorcentajeRP}  label={`${intPorcentajeRP}%`} /><ProgressBar variant="danger" animated now={intPorcentajeRPFalse}  label={`${intPorcentajeRPFalse}%`} /></ProgressBar>;
   }else{
    progressInstanceRP =<ProgressBar style ={{marginTop:"10%"}}> <ProgressBar variant="primary" animated now={50}  label={`Porcentaje no calculado`} /><ProgressBar variant="danger" animated now={50}  label={`Porcentaje no calculado`} /></ProgressBar>;
   }
   if(intPorcentajeEEO || intPorcentajeEEOFalse ){
    progressInstanceEEO=<ProgressBar style={{marginTop:"10%"}}> <ProgressBar variant="primary" animated now={intPorcentajeEEO}  label={`${intPorcentajeEEO}%`} /><ProgressBar variant="danger" animated now={intPorcentajeEEOFalse}  label={`${intPorcentajeEEOFalse}%`} /></ProgressBar>;
   }else{
    progressInstanceEEO =<ProgressBar style={{marginTop:"10%"}}> <ProgressBar variant="primary" animated now={50}  label={`Porcentaje no calculado`} /><ProgressBar variant="danger" animated now={50}  label={`Porcentaje no calculado`} /></ProgressBar>;
   }

    let dataEmpleado = this.state.dataAdminEmpleado;
    let userPortal;
    let passwordPortal;
    let habilitarAcceso;
    let statusEmpleado;
    if(dataEmpleado.accesoPortal === "true"){
      statusEmpleado = <font color = "#0751AF"><strong>Acceso Activo</strong></font>      
    }else if(dataEmpleado.accesoPortal === "false"){
      statusEmpleado = <font color="#AF0784"><strong>Sin acceso</strong></font>
    }
    if(this.state.habilitarAcceso === true && dataEmpleado.accesoPortal === "false"){
      habilitarAcceso =
      <tr>
        <td style = {{ paddingBotom: "2px"}}>Habilitar acceso al portal</td>
        <td style = {{ paddingBotom: "2px"}}><Button type="success" onClick ={e=>this.habilitarAcceso()}>Habilitar</Button></td>
      </tr>
    }else if(this.state.habilitarAcceso === false){
      habilitarAcceso =
      <tr>
        <td style = {{ paddingBotom: "2px"}}></td>
        <td style = {{ paddingBotom: "2px"}}><Button type="danger" onClick ={e=>this.cancelarHabilitarAcceso()}>Cancelar</Button></td>
      </tr>
    }
    if(this.state.accesoPortal === true){
    userPortal = <tr>
      <td style = {{ paddingBotom: "2px"}}>Correo de autorización</td>
      <td style = {{ paddingBotom: "2px"}}><Input disabled onChange={this.onChangeInputCorreo} placeholder="Correo electrónico" defaultValue={this.state.valueInput || dataEmpleado.correo}/></td>
    </tr>
    passwordPortal = <tr>
      <td style = {{ paddingBotom: "2px"}}>Contraseña</td>
      <td style = {{ paddingBotom: "2px"}}><Input onChange={this.onChangeInputPass} placeholder="Contraseña" defaultValue={this.state.valueInputPass} /></td>
    </tr>
    }
    let modalAdministracion = <Modal
    footer={[
      <Button key="1" type="danger" onClick={e=> this.onOkModalAdministracion()}>Cancelar</Button>,
      <Button key="2" disabled={!this.state.confirmar} type="primary" onClick={e=> this.confirmAccess()}>Confirmar</Button>
    ]}
    width={1000} title="Administración al portal de empleados"  visible={this.state.modalAdministracion}>

      <table className='table table-bordered table table-small table table-striped'>
        <tr>
          <td style = {{ paddingBotom: "2px"}}>Datos generales</td>
          <td style = {{ paddingBotom: "2px"}}>ID: {dataEmpleado.id}</td>
        </tr>
        <tr>
          <td style = {{ paddingBotom: "2px"}}></td>
          <td style = {{ paddingBotom: "2px"}}>{dataEmpleado.nombre + " " + dataEmpleado.ApellidoP + " " + dataEmpleado.ApellidoM}</td>

        </tr>
        <tr>
          <td style = {{ paddingBotom: "2px"}}></td>
          <td style = {{ paddingBotom: "2px"}}>{dataEmpleado.CentroTrabajo}</td>
        </tr>
        <tr>
          <td style = {{ paddingBotom: "2px"}}></td>
          <td style = {{ paddingBotom: "2px"}}>{dataEmpleado.Puesto}</td>
        </tr>
        <tr>
          <td style = {{ paddingBotom: "2px"}}></td>
          <td style = {{ paddingBotom: "2px"}}>{dataEmpleado.Sexo}</td>
        </tr>
        <tr>
          <td style = {{ paddingBotom: "2px"}}>Status</td>
          <td style = {{ paddingBotom: "2px"}}>{statusEmpleado}</td>
        </tr>
        {habilitarAcceso}
        {userPortal}
        {passwordPortal}
      </table>


    </Modal>

    let modalSeleccionTeletrabajo = <Modal width={1100} title="Selección de empleados a modalidad Teletrabajo" okText="Añadir plantilla" cancelText="Cancelar" visible={this.state.modalTeletrabajo} onOk={e=>this.registrarPlantilla()} onCancel={e=>this.cancelarPlantilla()}>
      <table className='table table-bordered table table-small table table-striped'>
        <tr>
          <td >Nombre</td>
          <td >Centro de Trabajo</td>
          <td >Correo</td>
          <td >Status</td>
        </tr>
        {this.state.seleccionTeletrabajo.map(rows=>{
          return(
            <tr>
            <td >{rows.nombre + " " + rows.ApellidoP + " " + rows.ApellidoM}</td>
            <td >{rows.CentroTrabajo}</td>
            <td >{rows.correo}</td>
            <td ><strong>Teletrabajo asignado</strong></td>

          </tr>
          )
        })}
      </table>
    </Modal>

      return (
      <React.Fragment>
      <div>
        <Navbar periodo = {periodoActivo}/>
        <div style = {{marginTop:"5%"}}>
        <div className = "cardPorcentaje">  
         <Card type="inner" title={ <div><center>{titulo1}{progressInstanceATS}</center></div>} style={{ width: "22rem",height:"12rem",padding:"0px"}}>
         <MDBCardBody style={{padding:"10px"}}> 
         <center>       
         <MDBBtn color = "success" size  = "sm" onClick = { e => this.showModal(2)} disabled={this.state.disabledButtons}> Realizada </MDBBtn>  
         <MDBBtn color= "danger" size = "sm" onClick = { e => this.showModal(3)} disabled={this.state.disabledButtons}>No realizada</MDBBtn>
         </center>
        </MDBCardBody>
        </Card>
        <Card  type="inner" title={ <div><center>{titulo2}{progressInstanceRP}</center></div>} style={{ width: "22rem",height:"12rem",padding:"0px"}}>
        <MDBCardBody style={{padding:"10px"}}>        
        <center>
         <MDBBtn color = "success" size  = "sm" onClick = {e => this.showModal(4)} disabled={this.state.disabledButtons}> Realizada </MDBBtn>  
         <MDBBtn color= "danger" size = "sm" onClick = {e => this.showModal(5)} disabled={this.state.disabledButtons}>No realizada</MDBBtn>
        </center>
        </MDBCardBody>
        </Card>
        <Card  type="inner" title={ <div><center>{titulo3}{progressInstanceEEO}</center></div>} style={{ width: "22rem",height:"12rem",padding:"0px"}}>
        <MDBCardBody style={{padding:"10px"}}>        
         <center>        
         <MDBBtn color = "success" size  = "sm" onClick = { e => this.showModal(6)} disabled={this.state.disabledButtons}> Realizada </MDBBtn>  
         <MDBBtn color= "danger" size = "sm" onClick = { e => this.showModal(7)} disabled={this.state.disabledButtons}>No realizada</MDBBtn>
         </center>
       </MDBCardBody>
       </Card>
        </div>
        <div style = {{marginTop:"2%"}} className = "tablaEmpleados">
        {cardInicial}
        {/* <Dognut verGraficas={true} estadisticas = {this.state.datosGeneralesEmpleados}/> */}
        {tablaEmpleados}
        
        {modalAdministracion}
        {tablaDetalles}
        {tablaAcceso}
        {tablaTeletrabajo}
        {modalSeleccionTeletrabajo}
        {tablaTeletrabajoAsignado}
        </div>
        <center>
        {updateLogo}
        {modalInfoG}
        {cargarLogo}
        {modificarLogo}
        {modal}
        {modalTutorial}
        </center>
        </div>
        <Menu
            id="simple-menu"
            anchorEl={this.state.dropdown}
            keepMounted
            open={Boolean(this.state.dropdown)}
            onClose={this.handleCloseDropdown}
        >
            <MenuItem ><a href = "https://www.youtube.com/@diagnostico0355">Canal de youtube</a></MenuItem>
            <MenuItem ><a href = "http://madmin.diagnostico035.com/">Plataforma multi RFC</a></MenuItem>
            <MenuItem onClick={this.handleclick}><i class="fas fa-address-card"></i> &nbsp;Mi Perfil</MenuItem>
            <MenuItem ><a href = "http://ads.com.mx"><i class="fab fa-buysellads"></i> &nbsp;Más sobre ADS</a></MenuItem>


        </Menu>
      </div>
      </React.Fragment>
    );
  }
}
export default Home;

