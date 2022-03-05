import React from 'react';
import {MDBRow, MDBContainer,MDBBtn} from 'mdbreact';
import axios from 'axios'
import {Alert} from 'reactstrap';
import IconButton from "@material-ui/core/IconButton";
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import { API} from '../utils/http'
import ModalVideo from 'react-modal-video'
import "./styles.scss";
import "./index.css"
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import Upload from '../uploadImage/upload'
import UpdateLogo from '../uploadImage/updateLogo'
import { MDBModal, MDBModalBody} from "mdbreact";
import {MDBCardBody} from 'mdbreact';
import {ProgressBar} from 'react-bootstrap' 
import Navbar from './navbar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MUIDataTable from "mui-datatables";
import {Card, Button as Boton} from 'antd'
import { Chart } from "react-google-charts";

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
      tablaEmpleados:true,
      tablaATSContestado:false,
      tablaATSNoContestado:false,
      tablaRPContestado:false,
      tablaRPNoContestado:false,
      tablaEEOContestado:false,
      tablaEEONoContestado:false,
      tablaATSDetectado:false,

      
    };
    this.ads = this.ads.bind(this);
    this.openModal = this.openModal.bind(this)
  }

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
        
      })
        await this.getEmployees();
        await this.handleFront();
        await this.verifyTables();
        await this.getUrlLogo();
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
                }
              }
              `
          }
         }).then((datos) => {
           let datosEmpleados = datos.data.data.getUsersTableEmployees;
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
if(parametro === 1){
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSContestado:false})
}
else if(parametro === 2){
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSNoContestado:false})
}
else if(parametro === 3){
  this.setState({tablaEmpleados:true})
  this.setState({tablaRPContestado:false})
}
else if(parametro === 4){
  this.setState({tablaEmpleados:true})
  this.setState({tablaRPNoContestado:false})
}
else if(parametro === 5){
  this.setState({tablaEmpleados:true})
  this.setState({tablaEEOContestado:false})
}
else if(parametro === 6){
  this.setState({tablaEmpleados:true})
  this.setState({tablaEEONoContestado:false})
}
else if(parametro === 7){
  this.setState({tablaEmpleados:true})
  this.setState({tablaATSDetectado:false})
}
else if(parametro === 8){
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
  render() {
    let periodoActivo;
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

        //////Opciones de las tablas
const options = {
  filterType: "dropdown",
  responsive: "stacked",
  search:false,
  print:false,
  download:false,
  sort:false,
  filter:false,
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
  // datosEmpleados = tableState.displayData
  },
  onFilterChange: (action, filtroTable) => {
    // filtro=filtroTable
    }     };
  
    const columnsATSContestado = [];
    let tituloTablaVacia = <h6><strong>Por el momento no hay datos que mostrar</strong></h6>
    const dataATSContestado =  [];
    let tablaVacia  = 
    <div style = {{width:680}}>
    <Card title={tituloTablaVacia} extra = {<div><Boton type="dashed" danger onClick = { e=> this.cerraTablas(8)}>Cerrar</Boton></div>}><MUIDataTable
    data={dataATSContestado}
    columns={columnsATSContestado}
    options={options}
     />
    </Card>
    </div> 
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
    logo = <div>
     <strong style={{ color: 'blue'}}>Adjuntar logo de mi empresa</strong>
     <IconButton onClick={this.toggle(20)} color="green"> <PublishOutlinedIcon /></IconButton>
    </div>
    }
 
    let modificarLogo;
    if(this.state.urlLogo){
     logo = <div>
     <strong style={{ color: 'blue' }}>Modificar logo</strong>
     <IconButton onClick={this.toggle(21)} color="green"> <PublishOutlinedIcon /></IconButton>
    </div>
    }
/////////////////////////////////////////////////////////////////////////////////////////////
     let modalInfoG;
     if(this.state.modal16){
        modalInfoG  =  
        <MDBModal isOpen={this.state.modal16} toggle={this.toggle(16)} size="lg">
          <MDBModalBody>
          <Card title = {<div><h6><strong>Información general</strong></h6></div>} >
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
   // TablaEmpleados de inicio
   let tablaEmpleados;
   const columns = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
   const data = this.state.empleadosTotales.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
   })

    let tituloEmpleado = <h6><strong>Empleados registrados</strong></h6>
   if(this.state.tablaEmpleados === true && data[0]){
    tablaEmpleados = <div style = {{width:"56%",marginLeft:"1%"}} >
    <Card title = {tituloEmpleado} extra={<div><label style={{color:'blue'}}><strong>Información del sistema</strong></label> &nbsp;<Boton type="dashed" onClick={this.handleDropdown}><i class="fas fa-mouse-pointer"></i></Boton></div>}>  
    <MUIDataTable
      data={data}
      columns={columns}
      options={options}
    />
     <Menu
              id="simple-menu"
              anchorEl={this.state.dropdown}
              keepMounted
              open={Boolean(this.state.dropdown)}
              onClose={this.handleClose}
          >
              <MenuItem style={{color:'blue'}} onClick={this.toggle(16)}>Datos generales</MenuItem>
              <MenuItem style={{color:'blue'}} onClick={this.handleClose}>{logo} </MenuItem>
              <MenuItem style={{ color: 'blue' }}> Tutorial de Diagnóstico035 <IconButton onClick={this.openModal} color="secondary"> <RemoveRedEyeOutlinedIcon /></IconButton></MenuItem>
              <MenuItem style={{ color: 'blue' }} onClick = { e => this.tablaATSDetectado()}>Empleados con ATS detectado : &nbsp; <strong>{this.state.AtsDetectado.length}</strong></MenuItem>
    </Menu>
    </Card>
    </div> 
   }else{
    tablaEmpleados = <div style = {{width:680}} >
    {Alerta}
    {dep}
    {suc}
    {pues}
    </div>
   }

////////////////////// evaluación ATS
  let tablaATSContestado;
  if(this.state.empleadosAts[0] &&  this.state.tablaATSContestado === true){
    const columnsATSContestado = ["ID","Nombre", "Apellido P.",  "Apellido M.","Centro de trabajo"];
    const dataATSContestado = this.state.empleadosAts.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo])
    })
    let tituloATSContesado = <h6><strong>Empleados que ya realizaron la evaluación ATS</strong></h6>
    tablaATSContestado = <div style = {{width:680}} >
    <Card title={tituloATSContesado} extra = {<div><Boton type="dashed" danger onClick = { e=> this.cerraTablas(1)}>Cerrar</Boton></div>}>  
    <MUIDataTable
      data={dataATSContestado}
      columns={columnsATSContestado}
      options={options}
    />
    </Card>
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
      let tituloATSNoContestado = <h6><strong>Empleados que aun no realizan la evaluación ATS</strong></h6>
      tablaATSNoContestado = <div style = {{width:680}} >
      <Card title={tituloATSNoContestado} extra = {<div><Boton type="dashed" danger onClick = { e=> this.cerraTablas(2)}>Cerrar</Boton></div>}>  

      <MUIDataTable
        data={dataATSNoContestado}
        columns={columnsATSNoContestado}
        options={options}
      />
      </Card>
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
        let tituloRPContestado = <h6><strong>Empleados que ya realizaron la evaluación RP</strong></h6>
        tablaRPContestado =
        <div style = {{width:680}} >
        <Card title={tituloRPContestado} extra = {<div><Boton type="dashed" danger onClick = { e=> this.cerraTablas(3)}>Cerrar</Boton></div>}>  
        <MUIDataTable
          data={dataRPContestado}
          columns={columnsRPContestado}
          options={options}
        />
        </Card>
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
          let tituloRPNoContestado = <h6><strong>Empleados aun no realizan la evaluación RP</strong></h6>
          tablaRPNoContestado = 
          <div style = {{width:680}} >
          <Card title={tituloRPNoContestado} extra = {<div><Boton type="dashed" danger onClick = { e=> this.cerraTablas(4)}>Cerrar</Boton></div>}>  
          <MUIDataTable
            data={dataRPNoContestado}
            columns={columnsRPNoContestado}
            options={options}
          />
          </Card>
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
            let tituloEEOContestado = <h6><strong>Empleados que ya realizaron la evaluación EEO</strong></h6>
            tablaEEOContestado = 
            <div style = {{width:680}} >
            <Card title={tituloEEOContestado} extra = {<div><Boton type="dashed" danger onClick = { e=> this.cerraTablas(5)}>Cerrar</Boton></div>}>  
            <MUIDataTable
              data={dataEEOContestado}
              columns={columnsEEOContestado}
              options={options}
            />
            </Card>
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
              let tituloEEONoContestado = <h6><strong>Empleados aún no realizan la evaluación EEO</strong></h6>

              tablaEEONoContestado = 
              <div style = {{width:680}} >
              <Card title={tituloEEONoContestado} extra = {<div><Boton type="dashed" danger onClick = { e=> this.cerraTablas(6)}>Cerrar</Boton></div>}>  
              <MUIDataTable
                data={dataEEONoContestado}
                columns={columnsEEONoContestado}
                options={options}
              />
              </Card>
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
                let tituloAtsDetectado = <h6><strong>Empleados con ATS detectado</strong></h6>
                tablaATSDetectado = 
                <div style = {{marginLeft:"5%"}} >
                <Card title={tituloAtsDetectado} extra = {<div><Boton type="dashed" danger onClick = { e=> this.cerraTablas(7)}>Cerrar</Boton></div>}>  
                <MUIDataTable
                  data={dataATSDetectado}
                  columns={columnsATSDetectado}
                  options={options}
                />
                </Card>
              </div> 
                } else if (this.state.AtsDetectado[0] === undefined  &&  this.state.tablaATSDetectado === true ) {
                  tablaATSDetectado = tablaVacia
                }
      let titulo1 = <h6><strong>Progreso evaluación ATS </strong></h6>;
      let titulo2 = <h6><strong>Progreso evaluación RP </strong></h6>;
      let titulo3 = <h6><strong>Progreso evaluación EEO </strong></h6>;
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
      return (
      <React.Fragment>
      <div>
        <Navbar periodo = {periodoActivo}/>
        <div style = {{marginTop:"5%"}}>
        <div className = "cardPorcentaje">  
         <Card type="inner" title={ <div><center>{titulo1}{progressInstanceATS}</center></div>} style={{ width: "22rem",height:"12rem",padding:"0px"}}>
         <MDBCardBody style={{padding:"10px"}}> 
         <center>       
         <MDBBtn color = "success" size  = "sm" onClick = { e => this.tablaATSContestado()}> Realizada </MDBBtn>  
         <MDBBtn color= "danger" size = "sm" onClick = { e => this.tablaATSNoContestado()}>No realizada</MDBBtn>
         </center>
        </MDBCardBody>
        </Card>
        <Card  type="inner" title={ <div><center>{titulo2}{progressInstanceRP}</center></div>} style={{ width: "22rem",height:"12rem",padding:"0px"}}>
        <MDBCardBody>        
        <center>
         <MDBBtn color = "success" size  = "sm" onClick = {e => this.tablaRPContestado()}> Realizada </MDBBtn>  
         <MDBBtn color= "danger" size = "sm" onClick = {e => this.tablaRPNoContestado()}>No realizada</MDBBtn>
        </center>
        </MDBCardBody>
        </Card>
        <Card  type="inner" title={ <div><center>{titulo3}{progressInstanceEEO}</center></div>} style={{ width: "22rem",height:"12rem",padding:"0px"}}>
        <MDBCardBody>        
         <center>        
         <MDBBtn color = "success" size  = "sm" onClick = { e => this.tablaEEOContestado()}> Realizada </MDBBtn>  
         <MDBBtn color= "danger" size = "sm" onClick = { e => this.tablaEEONoContestado()}>No realizada</MDBBtn>
         </center>
       </MDBCardBody>
       </Card>
        </div>
          <MDBRow style={{marginLeft:"10%",marginTop:"2%"}}>
          {tablaEmpleados}
          {tablaATSContestado}
          {tablaATSNoContestado}
          {tablaRPContestado}
          {tablaRPNoContestado}
          {tablaEEOContestado}
          {tablaEEONoContestado}
          {tablaATSDetectado}
          <Card title={<h6><strong>Gráficas de distribución de empleados actuales</strong></h6>} style={{marginLeft:"3%"}}>
          <Card>
          <Chart
            width={'400px'}
            height={'250px'}
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
          </Card>
          <Card>
          <Chart
            width={'400px'}
            height={'250px'}
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
          </Card> 
          </Card>
         </MDBRow> 
        {updateLogo}
        {modalInfoG}
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

