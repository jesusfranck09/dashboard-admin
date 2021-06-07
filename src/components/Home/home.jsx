import React from 'react';
import {MDBRow, MDBContainer, MDBCol,MDBBtn, MDBCardHeader} from 'mdbreact';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { DialogUtility } from '@syncfusion/ej2-popups';
import Modal from 'react-modal';
import Grow from "@material-ui/core/Grow";

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
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import { API} from '../utils/http'
import ModalVideo from 'react-modal-video'
import "./styles.scss";
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import Upload from '../uploadImage/upload'
import UpdateLogo from '../uploadImage/updateLogo'
import { MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import {ProgressBar} from 'react-bootstrap' 
import Navbar from './navbar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MUIDataTable from "mui-datatables";

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
      // resultadosInicio:[],
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
      tablaEmpleados:true,
      tablaATSContestado:false,
      tablaATSNoContestado:false,
      tablaRPContestado:false,
      tablaRPNoContestado:false,
      tablaEEOContestado:false,
      tablaEEONoContestado:false,
      tablaATSDetectado:false
    };

    this.ads = this.ads.bind(this);
    this.openModal = this.openModal.bind(this)

  }

  async componentWillMount(){
    let idAdmin = localStorage.getItem("idAdmin")
      // const url = 'http://localhost:8000/graphql'
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
        
      })
        await this.getEmployees();
        await this.handleFront();
        await this.verifyTables();
        await this.getUrlLogo();
        var LaFecha=new Date();
        var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var diasem=new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
        var diasemana=LaFecha.getDay();
        var FechaCompleta="";
        var NumeroDeMes="";    
        NumeroDeMes=LaFecha.getMonth();
        FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
    
        this.setState({date:FechaCompleta}) 
  }

  getEmployees(){
    let array = [];
    let array2 = [];
    let array3 = [];
    let array4 = [];
    let array5 = [];
    let array6 = [];
    let array7 = [];
 
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
              ATSDetectado
                }
              }
              `
          }
         }).then((datos) => {
            
           let datosEmpleados = datos.data.data.getUsersTableEmployees;

           if( datos.data.data.getUsersTableEmployees.length>0){
            localStorage.setItem("empleadoActivo","true")
           }else{
             localStorage.setItem("empleadoActivo","false")
           }
           this.setState({totalEmpleados  : datosEmpleados.length})  
           this.setState({empleadosTotales:datosEmpleados})

           let resultados1 = datosEmpleados.filter(function(hero) {
             return hero.ATSContestado == 'true';
           });
           array.push(resultados1)
           this.setState({empleadosAts:array[0]})
           this.setState({ATSContestado:array[0].length})
           let resultados2 = datosEmpleados.filter(function(hero) {
             return hero.ATSContestado == 'false';
           });
           array2.push(resultados2)
           this.setState({empleadosAtsFalse:array2[0]})
           this.setState({ATSNoContestado:array2[0].length})
 
           let resultados3 = datosEmpleados.filter(function(hero) {
             return hero.RPContestado == 'true';
           });
           array3.push(resultados3)
           this.setState({empleadosRP:array3[0]})
           this.setState({RPContestado:array3[0].length})
 
           let resultados4 = datosEmpleados.filter(function(hero) {
             return hero.RPContestado == 'false';
           });
           array4.push(resultados4)
           this.setState({empleadosRPFalse:array4[0]})
           this.setState({RPNoContestado:array4[0].length})
 
           let resultados5 = datosEmpleados.filter(function(hero) {
             return hero.EEOContestado == 'true';
           });
           array5.push(resultados5)
           this.setState({empleadosEEO:array5[0]})
           this.setState({EEOContestado:array5[0].length})
 
           let resultados6 = datosEmpleados.filter(function(hero) {
             return hero.EEOContestado == 'false';
           });
           array6.push(resultados6)
           this.setState({empleadosEEOFalse:array6[0]})
           this.setState({EEONoContestado:array6[0].length})
 
           let resultados7 = datosEmpleados.filter(function(hero) {
             return hero.ATSDetectado == 'true';
           });
           array7.push(resultados7)
           this.setState({AtsDetectado:array7[0]})

          
         })
 
         .catch((error) => {
       });  
    }

  handleFront = async () =>{
  
  let em;
  let idSuperUsuario;
  let max;
  let idAdmin = localStorage.getItem("idAdmin")
  // const url = 'http://localhost:8000/graphql'
  idSuperUsuario =localStorage.getItem("fk_superusuario")
    axios({
		  url:  API,
		  method:'post',
		  data:{
		  query:`
		   query{
		  	verifyPackSuperUser(data:"${[idSuperUsuario]}"){
				empleados
				  }
				}
			  `
		  }
		})
		.then(datos => {		
      em =datos.data.data.verifyPackSuperUser.empleados
      this.setState({empleados:em})
		}).catch(err=>{
			// console.log("error" , err.response)
		}) 
  }

  verifyTables = async () =>{
  const idAdmin   = await localStorage.getItem('idAdmin')
  // const url = 'http://localhost:8000/graphql'
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
      // console.log("este es el error " , err.response)
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
        // console.log("este es el error " , err.response)
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
        // console.log("este es el error " , err.response)
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
            console.log("datos error url " , err)
          })
      }

    ads(){
      this.setState({showModal2:true})
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
        let descripcion;
        // console.log("remine time",t )
        if(t.remainTime <= 1) {
          clearInterval(timerUpdate);
          let idAdmin = localStorage.getItem("idAdmin")
          descripcion = this.state.periodo
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
      const idAdmin  = await localStorage.getItem("idAdmin")
      let alerta2Enviada;
      let ATS;
      let RP;
      let EEO;
      let Eventos;

      Eventos = this.state.datosEventos.idEventos;
      alerta2Enviada = this.state.datosEventos.Alerta2Enviada;


      if(t.remainTime <= 1 && alerta2Enviada=='false') {
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

openModal () {
  this.setState({isOpen: true})
}
handleDropdown = (event) => {
  this.setState({dropdown: event.currentTarget});
};
handleClose = () => {
  this.setState({dropdown: null});
};

tablaATSContestado(){
  this.setState({tablaEmpleados:false})
  this.setState({tablaATSContestado:true})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:false})
}
tablaATSNoContestado(){
  this.setState({tablaEmpleados:false})
  this.setState({tablaATSNoContestado:true})
  this.setState({tablaATSContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:false})
}
tablaRPContestado(){
  this.setState({tablaEmpleados:false})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:true})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:false})
}

tablaRPNoContestado(){
  this.setState({tablaEmpleados:false})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:true})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:false})
}
tablaEEOContestado(){
  this.setState({tablaEmpleados:false})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:true})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:false})
}
tablaEEONoContestado(){
  this.setState({tablaEmpleados:false})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:true})
  this.setState({tablaATSDetectado:false})
}
tablaATSDetectado(){
  this.setState({tablaEmpleados:false})
  this.setState({tablaATSContestado:false})
  this.setState({tablaATSNoContestado:false})
  this.setState({tablaRPContestado:false})
  this.setState({tablaRPNoContestado:false})
  this.setState({tablaEEOContestado:false})
  this.setState({tablaEEONoContestado:false})
  this.setState({tablaATSDetectado:true})
}
cerraTablas(parametro){
if(parametro == 1){
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSContestado:false})
}
else if(parametro == 2){
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSNoContestado:false})
}
else if(parametro == 3){
  this.setState({tablaEmpleados:true})
  this.setState({tablaRPContestado:false})
}
else if(parametro == 4){
  this.setState({tablaEmpleados:true})
  this.setState({tablaRPNoContestado:false})
}
else if(parametro == 5){
  this.setState({tablaEmpleados:true})
  this.setState({tablaEEOContestado:false})
}
else if(parametro == 6){
  this.setState({tablaEmpleados:true})
  this.setState({tablaEEONoContestado:false})
}
else if(parametro == 7){
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSDetectado:false})
}
}
  render() {
    let periodoActivo;

    if(this.state.periodo){
      periodoActivo= <h6 style={{color:'green'}}><strong>{this.state.periodo}</strong></h6>
    }
    else{
      periodoActivo= <h6 style={{color:'red'}}><strong>Su periodo ha finalizado</strong></h6>
    }
    let Alerta;
    let dep;
    let suc;
    let pues;
    let alertaPuesto = localStorage.getItem("PuestoActivo")
    let alertaSucursal=localStorage.getItem("SucursalActiva")
    let AlertaDepartamento = localStorage.getItem("DepartamentoActivo")
    let empleadoNoEncontrado;
    let empleadoAc=localStorage.getItem("empleadoActivo")
    if(empleadoAc==="false"){
      empleadoNoEncontrado  = "Actualmente el sistema no contiene empleados registrados" 
       Alerta =   <Alert color="danger"> Estimado Usuario usted debe Contar con almenos 1 Empleado Registrado</Alert>
    }if(AlertaDepartamento==="false"){
      dep =   <Alert color="danger"> Estimado Usuario usted debe Contar con almenos 1 Departamento Registrado</Alert>
    }if(alertaSucursal==="false"){
      suc =   <Alert color="danger"> Estimado Usuario usted debe Contar con almenos 1 Centro de Trabajo Registrado</Alert>
    }if(alertaPuesto==="false"){
      pues =   <Alert color="danger"> Estimado Usuario usted debe Contar con almenos 1 Puesto Registrado</Alert>
    }


    let expiro;
    if(this.state.licencia){

      expiro = <Alert color="danger" className="text-center ">{this.state.licencia}</Alert>

    }
    let updateLogo;
    if(this.state.modal21){
 
     updateLogo  =  <MDBContainer >
       <MDBModal isOpen={this.state.modal21} toggle={this.toggle(21)}  tabindex="-1"  size="md">
         <MDBModalHeader toggle={this.toggle(21)}>
           Modificar logo
         </MDBModalHeader>
         <MDBModalBody>
         <UpdateLogo/>
         </MDBModalBody>   
       </MDBModal>
     </MDBContainer>
 
    }
 
    let logo;
    if(!this.state.urlLogo){
    logo = <div>
     <strong style={{ color: '#BC71F3'}}>Adjuntar logo de mi empresa</strong>
     <IconButton onClick={this.toggle(20)} color="#BC71F3"> <PublishOutlinedIcon /></IconButton>
    </div>
    }
 
    let modificarLogo;
    if(this.state.urlLogo){
     logo = <div>
     <strong style={{ color: '#BC71F3' }}>Modificar mi logo</strong>
     <IconButton onClick={this.toggle(21)} color="#BC71F3"> <PublishOutlinedIcon /></IconButton>
    </div>
    }
/////////////////////////////////////////////////////////////////////////////////////////////
//////Opciones de las tablas
const options = {
  filterType: "dropdown",
  responsive: "stacked",
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
  datosEmpleados = tableState.displayData
  },
  onFilterChange: (action, filtroTable) => {
    filtro=filtroTable
    }     };

     let modalInfoG;
     if(this.state.modal16){
    

        modalInfoG  =  <MDBContainer >
        <MDBModal isOpen={this.state.modal16} toggle={this.toggle(16)} size="lg">
          <MDBModalHeader toggle={this.toggle(16)}>
           Información General
          </MDBModalHeader>
          <MDBModalBody>
          <strong>Licencia de {this.state.empleados} Empleados</strong>
          <br/>
          <br/>
          <strong>Empleados registrados : {this.state.totalEmpleados}</strong>
          <br/>
          <br/>
          <strong>Empleados por registrar : {(this.state.empleados-this.state.totalEmpleados)}</strong><br/>
          <br/>
          
           
          {expiro}
          </MDBModalBody>   
        </MDBModal>
        </MDBContainer>
     }
 let cargarLogo;
   if(this.state.modal20){

    cargarLogo  =  <MDBContainer >
      <MDBModal isOpen={this.state.modal20} toggle={this.toggle(20)}  tabindex="-1"  size="md">
        <MDBModalHeader toggle={this.toggle(20)}>
          Cargar logo
        </MDBModalHeader>
        <MDBModalBody>
        <Upload/>
        </MDBModalBody>   
      </MDBModal>
    </MDBContainer>

   }

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
    progressInstanceATS =<ProgressBar style={{marginTop:"10%"}}> <ProgressBar variant="primary" animated now={50}  label={`Sin porcentaje`} /><ProgressBar variant="danger" animated now={50}  label={`Sin porcentaje`} /></ProgressBar>;
   }
   if(intPorcentajeRP || intPorcentajeRPFalse ){
    progressInstanceRP=<ProgressBar style={{marginTop:"10%"}}> <ProgressBar variant="primary" animated now={intPorcentajeRP}  label={`${intPorcentajeRP}%`} /><ProgressBar variant="danger" animated now={intPorcentajeRPFalse}  label={`${intPorcentajeRPFalse}%`} /></ProgressBar>;
   }else{
    progressInstanceRP =<ProgressBar style ={{marginTop:"10%"}}> <ProgressBar variant="primary" animated now={50}  label={`Sin porcentaje`} /><ProgressBar variant="danger" animated now={50}  label={`Sin porcentaje`} /></ProgressBar>;
   }
   if(intPorcentajeEEO || intPorcentajeEEOFalse ){
    progressInstanceEEO=<ProgressBar style={{marginTop:"10%"}}> <ProgressBar variant="primary" animated now={intPorcentajeEEO}  label={`${intPorcentajeEEO}%`} /><ProgressBar variant="danger" animated now={intPorcentajeEEOFalse}  label={`${intPorcentajeEEOFalse}%`} /></ProgressBar>;
   }else{
    progressInstanceEEO =<ProgressBar style={{marginTop:"10%"}}> <ProgressBar variant="primary" animated now={50}  label={`Sin porcentaje`} /><ProgressBar variant="danger" animated now={50}  label={`Sin porcentaje`} /></ProgressBar>;
   }
   ////////////////////////////////////////////////////////
   // TablaEmpleados de inicio
   let tablaEmpleados;
   const columns = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];

    const data = this.state.empleadosTotales.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
    })
    let datosEmpleados;
    let filtro;
   
   if(this.state.tablaEmpleados == true){
    tablaEmpleados = <div style = {{width:680,marginLeft:"1%"}} >
    <MUIDataTable
      title={`Mis empleados`}
      data={data}
      columns={columns}
      options={options}
    />
  </div> 
   }
////////////////////////////////////////////////////////////////////////////////////////////////7

////////////////////// evaluación ATS
  let tablaATSContestado;
  let botonTablaATSContestado;
  if(this.state.empleadosAts[0] &&  this.state.tablaATSContestado == true){
   
    const columnsATSContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];

    const dataATSContestado = this.state.empleadosAts.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
    })
    botonTablaATSContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(1)}> Cerrar tabla Eval. ATS contestado</MDBBtn>
    tablaATSContestado = <div style = {{width:680,marginLeft:"1%"}} >
    <MUIDataTable
      title={`Empleados que ya realizaron la evaluación ATS`}
      data={dataATSContestado}
      columns={columnsATSContestado}
      options={options}
    />
  </div> 
    } else if (this.state.empleadosAts[0] == undefined  &&  this.state.tablaATSContestado == true ) {
      botonTablaATSContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(1)}> Cerrar tabla Eval. ATS contestado</MDBBtn>

      const columnsATSContestado = [];

      const dataATSContestado =  [];
      tablaATSContestado = <MUIDataTable
      title={"Por el momento no hay datos que mostrar"}
      data={dataATSContestado}
      columns={columnsATSContestado}
      options={options}
    />
    }

    let tablaATSNoContestado;
    let botonTablaATSNoContestado;
    console.log("empleadosatsFalse" , this.state.empleadosAtsFalse[0])
    
    if(this.state.empleadosAtsFalse[0] &&  this.state.tablaATSNoContestado == true){
   
      const columnsATSNoContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
  
      const dataATSNoContestado = this.state.empleadosAtsFalse.map(rows=>{
        return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
      })
      botonTablaATSNoContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(2)}> Cerrar tabla Eval. ATS no realizadas</MDBBtn>
      tablaATSNoContestado = <div style = {{width:680,marginLeft:"1%"}} >
      <MUIDataTable
        title={`Empleados que aun no realizan la evaluación ATS`}
        data={dataATSNoContestado}
        columns={columnsATSNoContestado}
        options={options}
      />
    </div> 
      }else if (this.state.empleadosAtsFalse[0] == undefined &&  this.state.tablaATSNoContestado == true) {
        botonTablaATSNoContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(2)}> Cerrar tabla Eval. ATS no realizadas</MDBBtn>

        const columnsATSContestado = [];
  
        const dataATSContestado =  [];
        tablaATSContestado = <MUIDataTable
        title={"Por el momento no hay datos que mostrar"}
        data={dataATSContestado}
        columns={columnsATSContestado}
        options={options}
      />
      }
      /////////////////////////////////////////////////////////////////////////////////////
      // Evaluación RP

      let tablaRPContestado;
      let botonTablaRPContestado;
      if(this.state.empleadosRP[0] &&  this.state.tablaRPContestado == true){
        const columnsRPContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
        const dataRPContestado = this.state.empleadosRP.map(rows=>{
          return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
        })
        botonTablaRPContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(3)}> Cerrar tabla Eval. RP contestado</MDBBtn>
        tablaRPContestado = <div style = {{width:680,marginLeft:"1%"}} >
        <MUIDataTable
          title={`Empleados que ya realizaron la evaluación RP`}
          data={dataRPContestado}
          columns={columnsRPContestado}
          options={options}
        />
      </div> 
        } else if (this.state.empleadosRP[0] == undefined  &&  this.state.tablaRPContestado == true ) {
          botonTablaRPContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(3)}> Cerrar tabla Eval. RP contestado</MDBBtn>
          const columnsRPContestado = [];
          const dataRPContestado =  [];
          tablaRPContestado = <MUIDataTable
          title={"Por el momento no hay datos que mostrar"}
          data={dataRPContestado}
          columns={columnsRPContestado}
          options={options}
        />
        }
        let tablaRPNoContestado;
        let botonTablaRPNoContestado;
        if(this.state.empleadosRPFalse[0] &&  this.state.tablaRPNoContestado == true){
         
          const columnsRPNoContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
          const dataRPNoContestado = this.state.empleadosRPFalse.map(rows=>{
            return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
          })
          botonTablaRPNoContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(4)}> Cerrar tabla Eval. RP no contestado</MDBBtn>
          tablaRPNoContestado = <div style = {{width:680,marginLeft:"1%"}} >
          <MUIDataTable
            title={`Empleados aun no realizan la evaluación RP`}
            data={dataRPNoContestado}
            columns={columnsRPNoContestado}
            options={options}
          />
        </div> 
          } else if (this.state.empleadosRPFalse[0] == undefined  &&  this.state.tablaRPNoContestado == true ) {
            botonTablaRPNoContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(4)}> Cerrar tabla Eval. RP no contestado</MDBBtn>
      
            const columnsRPNoContestado = [];
      
            const dataRPNoContestado =  [];
            tablaRPContestado = <MUIDataTable
            title={"Por el momento no hay datos que mostrar"}
            data={dataRPNoContestado}
            columns={columnsRPNoContestado}
            options={options}
          />
          }
///////////////////////////////////////////////////////////////////////////////////////////////
// Evaluación EEO
          let tablaEEOContestado;
          let botonTablaEEOContestado;
          if(this.state.empleadosEEO[0] &&  this.state.tablaEEOContestado == true){
          
            const columnsEEOContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];

            const dataEEOContestado = this.state.empleadosEEO.map(rows=>{
              return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
            })
            botonTablaEEOContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(5)}> Cerrar tabla Eval. EEO contestado</MDBBtn>
            tablaEEOContestado = <div style = {{width:680,marginLeft:"1%"}} >
            <MUIDataTable
              title={`Empleados que ya realizaron la evaluación EEO`}
              data={dataEEOContestado}
              columns={columnsEEOContestado}
              options={options}
            />
          </div> 
            } else if (this.state.empleadosEEO[0] == undefined  &&  this.state.tablaEEOContestado == true ) {
              botonTablaEEOContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(5)}> Cerrar tabla Eval. EEO contestado</MDBBtn>
              const columnsEEOContestado = [];
              const dataEEOContestado =  [];
              tablaEEOContestado = <MUIDataTable
              title={"Por el momento no hay datos que mostrar"}
              data={dataEEOContestado}
              columns={columnsEEOContestado}
              options={options}
            />
            }
            let tablaEEONoContestado;
            let botonTablaEEONoContestado;
            if(this.state.empleadosEEOFalse[0] &&  this.state.tablaEEONoContestado == true){
              const columnsEEONoContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
              const dataEEONoContestado = this.state.empleadosEEOFalse.map(rows=>{
                return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
              })
              botonTablaEEONoContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(6)}> Cerrar tabla Eval. EEO no contestado</MDBBtn>
              tablaEEONoContestado = <div style = {{width:680,marginLeft:"1%"}} >
              <MUIDataTable
                title={`Empleados aún no realizan la evaluación EEO`}
                data={dataEEONoContestado}
                columns={columnsEEONoContestado}
                options={options}
              />
            </div> 
              } else if (this.state.empleadosEEOFalse[0] == undefined  &&  this.state.tablaEEONoContestado == true ) {
                botonTablaEEONoContestado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(6)}> Cerrar tabla Eval. EEO no contestado</MDBBtn>
                const columnsEEONoContestado = [];
                const dataEEONoContestado =  [];
                tablaEEONoContestado = <MUIDataTable
                title={"Por el momento no hay datos que mostrar"}
                data={dataEEONoContestado}
                columns={columnsEEONoContestado}
                options={options}
              />
              }
              ///////////////////////////////////////////////////////////////////////////////////////////////////
              /// Empleados con ATSDetectado 

              let tablaATSDetectado;
              let botonTablaATSDetectado;
              if(this.state.AtsDetectado[0] &&  this.state.tablaATSDetectado== true){
                const columnsATSDetectado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
    
                const dataATSDetectado= this.state.AtsDetectado.map(rows=>{
                  return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
                })
                botonTablaATSDetectado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(7)}> Cerrar tabla ATS detectado</MDBBtn>
                tablaATSDetectado = <div style = {{width:680,marginLeft:"1%"}} >
                <MUIDataTable
                  title={`Empleados con ATS detectado`}
                  data={dataATSDetectado}
                  columns={columnsATSDetectado}
                  options={options}
                />
              </div> 
                } else if (this.state.AtsDetectado[0] == undefined  &&  this.state.tablaATSDetectado == true ) {
                  botonTablaATSDetectado = <MDBBtn color="danger" size = "md" onClick = { e=> this.cerraTablas(7)}>Cerrar tabla ATS detectado</MDBBtn>
                  const columnsATSDetectado = [];
                  const dataATSDetectado =  [];
                  tablaATSDetectado = <MUIDataTable
                  title={"Por el momento no hay datos que mostrar"}
                  data={dataATSDetectado}
                  columns={columnsATSDetectado}
                  options={options}
                />
                }
       return (
      <React.Fragment>
      <div>
        <Navbar/>
        <div style = {{marginTop:"5%" ,marginLeft:"13%"}}>
        <MDBRow >
         <MDBCard style={{ width: "22rem",marginLeft:"1%"}}>
          <MDBCardBody>        
          <center><h6><strong>Progreso evaluación ATS </strong></h6></center>
         {progressInstanceATS}
         <MDBRow style = {{marginTop:"10%" , marginLeft : "8%"}}>
         <MDBBtn color = "success" size  = "sm" onClick = { e => this.tablaATSContestado()}> Realizada </MDBBtn>  
         <MDBBtn color= "danger" size = "sm" onClick = { e => this.tablaATSNoContestado()}>No realizada</MDBBtn>
         </MDBRow>
        </MDBCardBody>
        </MDBCard>
        <MDBCard style={{ width: "22rem",marginLeft:"1%"}}>
          <MDBCardBody>        
          <center><h6><strong>Progreso evaluación RP </strong></h6></center>           
         {progressInstanceRP}
         <MDBRow style = {{marginTop:"10%" , marginLeft : "8%"}}>
        
         <MDBBtn color = "success" size  = "sm" onClick = {e => this.tablaRPContestado()}> Realizada </MDBBtn>  
         <MDBBtn color= "danger" size = "sm" onClick = {e => this.tablaRPNoContestado()}>No realizada</MDBBtn>
        
         </MDBRow>
        </MDBCardBody>
        </MDBCard>
        <MDBCard style={{ width: "22rem",marginLeft:"1%"}}>
          <MDBCardBody>        
          <center><h6><strong>Progreso evaluación EEO </strong></h6></center>
         {progressInstanceEEO}
         <MDBRow style = {{marginTop:"10%" , marginLeft : "8%"}}>
        
         <MDBBtn color = "success" size  = "sm" onClick = { e => this.tablaEEOContestado()}> Realizada </MDBBtn>  
         <MDBBtn color= "danger" size = "sm" onClick = { e => this.tablaEEONoContestado()}>No realizada</MDBBtn>
        
         </MDBRow>
       </MDBCardBody>
       </MDBCard>
        </MDBRow>
       <MDBRow>
          {tablaEmpleados}
          {tablaATSContestado}
          {tablaATSNoContestado}
          {tablaRPContestado}
          {tablaRPNoContestado}
          {tablaEEOContestado}
          {tablaEEONoContestado}
          {tablaATSDetectado}
          <MDBCard style={{ width: "22rem",marginLeft:"4%" }}>
          
          <MDBCardHeader>
          <center>
          <Button style={{ color: 'green' }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleDropdown}>
          <strong>&nbsp;Información del Sistema <br/><i class="fas fa-mouse-pointer"></i></strong>
          </Button>
          </center>
          <Menu
              id="simple-menu"
              anchorEl={this.state.dropdown}
              keepMounted
              open={Boolean(this.state.dropdown)}
              onClose={this.handleClose}
          >
              <MenuItem onClick={this.toggle(16)}><i class="fas fa-info-circle"></i> &nbsp;  Información General</MenuItem>
              <MenuItem onClick={this.handleClose}><i class="fas fa-cloud-upload-alt"></i> &nbsp;{logo} </MenuItem>
              <MenuItem style={{ color: 'purple' }}><i class="fas fa-question"></i>&nbsp;  ¿Como usar Diagnóstico035?  <IconButton onClick={this.openModal} color="secondary"> <RemoveRedEyeOutlinedIcon /></IconButton></MenuItem>
              <MenuItem style={{ color: 'orange' }} onClick = { e => this.tablaATSDetectado()}><i class="fas fa-exclamation-triangle"></i>&nbsp; Empleados con ATS detectado : &nbsp; <strong>{this.state.AtsDetectado.length}</strong></MenuItem>
          </Menu>
          </MDBCardHeader>
          <MDBCardBody>
          <center><strong>{this.state.date}</strong> <br/>
          <br/>
          <strong>Periodo actual &nbsp;</strong> {periodoActivo}<br></br>
          {botonTablaATSContestado}
          {botonTablaATSNoContestado}
          {botonTablaRPContestado}
          {botonTablaRPNoContestado}
          {botonTablaEEOContestado}
          {botonTablaEEONoContestado}
          {botonTablaATSDetectado}
          {Alerta}
          {dep}
          {suc}
          {pues}
          </center>
          </MDBCardBody>
          </MDBCard> 
          </MDBRow>

        {updateLogo}
     
        {modalInfoG}
        {/* {modalAcciones} */}
        {cargarLogo}
        {modificarLogo}
        </div>
      </div>
      <div><ModalVideo channel='vimeo' isOpen={this.state.isOpen} videoId='461258739' onClose={() => this.setState({isOpen: false})} /></div>
      </React.Fragment>
    );
  }
}



export default Home;

