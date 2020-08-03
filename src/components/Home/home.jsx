import React from 'react';
import {MDBRow, MDBContainer, MDBCol, MDBCardHeader} from 'mdbreact';
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
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import { API} from '../utils/http'
import ModalVideo from 'react-modal-video'
import "./styles.scss";
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import Upload from '../uploadImage/upload'
import { MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";

import { MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import {ProgressBar} from 'react-bootstrap' 
import Navbar from './navbar'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection : 1,
      showModal2: false,
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
      totalEmpleados:'',
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
      max:'',
      urlLogo:''
    };

    this.ads = this.ads.bind(this);
    this.openModal = this.openModal.bind(this)

  }

  async componentWillMount(){

    let idAdmin = localStorage.getItem("idAdmin")
      // const url = 'http://localhost:8000/graphql'
      // console.log("el tiempo es " , t )
     await  axios({
        url:  API,
        method:'post',
        data:{
        query:`
         query{
          getPeriodo(data:"${[idAdmin]}"){
            idEventos
            fk_administrador
            Descripcion
            EventoActivo
                }
              }
            `
        }
      })
      .then(datos => {	
        localStorage.setItem("periodo" ,datos.data.data.getPeriodo[0].Descripcion )
      }).catch(err=>{
        // console.log("error",err.response)
      })

    this.handleFront();
    this.countEmployees();
    this.verifyTables();
    this.getUrlLogo();
    this.getEmployees();
    // this.datosEEO()
  }
  
  componentDidMount(){
    this.sendMAilAlert1Survey();
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
            console.log("datos urlLogo" , datos)
            if(datos.data.data.getLogo.url){
              localStorage.setItem("urlLogo",datos.data.data.getLogo.url)
            }
            this.setState({urlLogo:datos.data.data.getLogo.url})
          }).catch(err=>{
            console.log("datos error url " , err)
          })

  }

  handleFront = async () =>{
  
  let em;
  let idSuperUsuario;
  let max;
  let idAdmin = localStorage.getItem("idAdmin")
  // const url = 'http://localhost:8000/graphql'
  await axios({
    url:  API,
    method:'post',
    data:{
    query:`
    mutation{
      authRegisterSingleEmployee(data:"${[idAdmin]}"){
      max
        }
      }
      `
    }
  })
  .then(datos => {		
        max=datos.data.data.authRegisterSingleEmployee[0].max;
        this.setState({max:max})
  });

   axios({
    url:  API,
    method:'post',
    data:{
    query:`
     query{
      getAdminDashboard(data:"${[idAdmin]}"){
        fk_superusuario
        }
        }
      `
    }
    })
    .then(datos => {		
    idSuperUsuario = datos.data.data.getAdminDashboard.fk_superusuario;
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
      // console.log("exito pack " , datos)
      em =datos.data.data.verifyPackSuperUser.empleados
      this.setState({empleados:em})
		}).catch(err=>{
			// console.log("error" , err.response)
		}) 
    }).catch(err=>{
      // console.log("error" , err.response)
    }) 
   
 
}


ads(){
  this.setState({showModal2:true})
}

verifyTables=async () =>{
  const idAdmin   = await localStorage.getItem('idAdmin')
  // const url = 'http://localhost:8000/graphql'
  await axios({
    url:  API,
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
          // console.log("este es el error " , err.response)
        })
        
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
        // console.log("depto activo",datos.data.data.deptoActive)
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
        // console.log("depto activo",datos.data.data.sucActive)
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
        // console.log("depto activo",datos.data.data.puestoActive)
      if(datos.data.data.puestoActive.length>0){
        localStorage.setItem("PuestoActivo","true")
      }else{
        localStorage.setItem("PuestoActivo","false")
      }
  
    }).catch(err=>{
      // console.log("este es el error " , err.response)
    })
}

countEmployees = async()=>{
  
  const idAdmin   = localStorage.getItem('idAdmin')
  // const url = 'http://localhost:8000/graphql'
  await axios({
    url:  API,
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
      // console.log("este es el error " , err.response)
    })

}

// datosEEO = async ( ) => {
//   let totalEmpleados=[];
//   var id  =localStorage.getItem("idAdmin")       
//   await axios({
//     url:  API,
//     method:'post',
//     data:{
//     query:`
//     query{
//       getEmployeesResolvesEEO(data:"${id}"){
//         id
//         periodo
//           }
//         }
//         `
//      }
//      }).then((datos) => {
//        console.log("hay datos" , datos)
//         datos.data.data.getEmployeesResolvesEEO.map(rows=>{
//           axios({
//           url:  API,
//           method:'post',
//           data:{
//           query:`
//             query{
//               getresultGlobalSurveyEEO(data:"${[rows.id,rows.periodo]}"){
//               nombre  
//               Respuestas 
//               fk_preguntasEEO
//               ponderacion
//                   }
//                 }
//               `
//           }
//           }).then(datos => {  
//             totalEmpleados.push(datos.data.data.getresultGlobalSurveyEEO)  
//             console.log("totalEmpleados" , totalEmpleados)
//             this.setState({resultadosInicio:totalEmpleados})
//           })
//           .catch(err => {
//           }); 
//       })
//       }).catch(err=>{
//         console.log("error" ,err.response)
//       })
//  }

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

toggle = (nr) => () => {  
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

sendMAilAlert1Survey  = async () => {

  let eventoFinal;
  let alerta1;
  let alerta2;
  let alerta3; 
 let idAdmin = localStorage.getItem("idAdmin")
  // const url = 'http://localhost:8000/graphql'
      await axios({
        url:  API,
        method:'post',
        data:{
        query:`
        query{
          getEventos(data:"${[idAdmin]}"){
           message
           eventoFinal
            alerta1
             alerta2,
             alerta3
                }
              }
            `
        }
            }).then((datos) => {
                eventoFinal = datos.data.data.getEventos.eventoFinal;
                alerta1=datos.data.data.getEventos.alerta1;
                alerta2=datos.data.data.getEventos.alerta2;
                alerta3=datos.data.data.getEventos.alerta3;
            }).catch(err=>{
            })       
            
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
              // console.log("alerta",fechaFinal) 
            }
            this.countdown(fechaFinal)
            this.alerta1(alert1)
            this.alerta2(alert2)
            this.alerta3(alert3)

          }
countdown =  (deadline) => {
  const timerUpdate = setInterval( async () => {
    let t = this.getRemainingTime(deadline);
    let descripcion;
    if(t.remainTime <= 1) {
      clearInterval(timerUpdate);
      let idAdmin = localStorage.getItem("idAdmin")
      await axios({
        url:  API,
        method:'post',
        data:{
        query:`
         query{
          getPeriodo(data:"${[idAdmin]}"){
            idEventos
            fk_administrador
            Descripcion
            EventoActivo
                }
              }
            `
        }
      })
      .then(datos => {	
      descripcion = datos.data.data.getPeriodo[0].Descripcion
      }).catch(err=>{
      })
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
         mutation{
          deletePeriodo(data:"${[descripcion,idAdmin]}"){
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
          content: 'Su periodo está Desactivado por favor Registre uno nuevo',
          position: "fixed",
        }
        ) 
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

alerta1 =  (deadline) => {
  const timerUpdate = setInterval( async () => {
    let t = this.getRemainingTime(deadline);
    const idAdmin  = localStorage.getItem("idAdmin")
    let alerta1Enviada;
    let ATS;
    let RP;
    let EEO;
    let Eventos;
    await axios({
      url:  API,
      method:'post',
      data:{
      query:`
       query{
        getPeriodo(data:"${[idAdmin]}"){
          idEventos
          fk_administrador
          Descripcion
          Alerta1Enviada
              }
            }
          `
      }
    })
    .then(datos => {	
    Eventos = datos.data.data.getPeriodo[0].idEventos
    alerta1Enviada = datos.data.data.getPeriodo[0].Alerta1Enviada
    }).catch(err=>{
    })
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

alerta2 =  (deadline) => {
  const timerUpdate = setInterval( async () => {
    let t = this.getRemainingTime(deadline);
    const idAdmin  = await localStorage.getItem("idAdmin")
    let alerta2Enviada;
    let ATS;
    let RP;
    let EEO;
    let Eventos;
    await axios({
      url:  API,
      method:'post',
      data:{
      query:`
       query{
        getPeriodo(data:"${[idAdmin]}"){
          idEventos
          fk_administrador
          Descripcion
          Alerta2Enviada
              }
            }
          `
      }
    })
    .then(datos => {	
    Eventos = datos.data.data.getPeriodo[0].idEventos
    alerta2Enviada = datos.data.data.getPeriodo[0].Alerta2Enviada
    }).catch(err=>{
      // console.log("error" , err)
    })
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
    await axios({
      url:  API,
      method:'post',
      data:{
      query:`
       query{
        getPeriodo(data:"${[idAdmin]}"){
          idEventos
          fk_administrador
          Descripcion
          Alerta3Enviada
              }
            }
          `
      }
    })
    .then(datos => {	
    Eventos = datos.data.data.getPeriodo[0].idEventos
    alerta3Enviada = datos.data.data.getPeriodo[0].Alerta3Enviada
    }).catch(err=>{
      // console.log("error" , err)
    })
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

  render() {
    // if(this.state.resultadosInicio[0]){
    //   console.log("estado" , this.state.resultadosInicio)
    //   let total;
    //   let array1=[], array2=[], array3=[], array4=[], array5=[], array6=[], array7=[], array8=[], array9=[], array10=[]      
    //   let array11=[], array12=[], array13=[], array14=[], array15=[], array16=[], array17=[], array18=[], array19=[], array20=[]      
    //   let array21=[], array22=[], array23=[], array24=[], array25=[], array26=[], array27=[], array28=[], array29=[], array30=[]      
    //   let array31=[], array32=[], array33=[], array34=[], array35=[], array36=[], array37=[], array38=[], array39=[], array40=[]      
    //   let array41=[], array42=[], array43=[], array44=[], array45=[], array46=[], array47=[], array48=[], array49=[], array50=[]      
    //   let array51=[], array52=[], array53=[], array54=[], array55=[], array56=[], array57=[], array58=[], array59=[], array60=[]      
    //   let array61=[], array62=[], array63=[], array64=[], array65=[], array66=[], array67=[], array68=[], array69=[], array70=[],array71=[],array72=[];
    //   let valor1=[],valor2=[],valor3=[],valor4=[],valor5=[],valor6=[],valor7=[],valor8=[],valor9=[],valor10=[],valor11=[],valor12=[],valor13=[];    
    //   let valor14=[],valor15=[],valor16=[],valor17=[],valor18=[],valor19=[],valor20=[],valor21=[],valor22=[],valor23=[],valor24=[],valor25=[],valor26=[];
    //   let valor27=[],valor28=[],valor29=[],valor30=[],valor31=[],valor32=[],valor33=[],valor34=[],valor35=[],valor36=[],valor37=[],valor38=[],valor39=[];
    //   let valor40=[],valor41=[],valor42=[],valor43=[],valor44=[],valor45=[],valor46=[],valor47=[],valor48=[],valor49=[],valor50=[],valor51=[],valor52=[];
    //   let valor53=[],valor54=[],valor55=[],valor56=[],valor57=[],valor58=[],valor59=[],valor60=[],valor61=[],valor62=[],valor63=[],valor64=[],valor65=[];
    //   let valor66=[],valor67=[],valor68=[],valor69=[],valor70=[],valor71=[],valor72;
    
    //   var filtrar1,array1Int,arr1Int,respuesta1,filtrar2 ,array2Int,arr2Int,respuesta2,filtrar3,array3Int,arr3Int,respuesta3,filtrar4,array4Int,arr4Int,respuesta4;
    //   var filtrar5,array5Int,arr5Int,respuesta5,filtrar6,array6Int,arr6Int,respuesta6,filtrar7,array7Int,arr7Int,respuesta7,filtrar8,array8Int,arr8Int,respuesta8;
    //   var filtrar9,array9Int,arr9Int,respuesta9,filtrar10,array10Int,arr10Int,respuesta10,filtrar11,array11Int,arr11Int,respuesta11,filtrar12,array12Int,arr12Int,respuesta12;
    //   var filtrar13,array13Int,arr13Int,respuesta13,filtrar14,array14Int,arr14Int,respuesta14,filtrar15,array15Int,arr15Int,respuesta15,filtrar16,array16Int,arr16Int,respuesta16;
    //   var filtrar17,array17Int,arr17Int,respuesta17,filtrar18,array18Int,arr18Int,respuesta18,filtrar19,array19Int,arr19Int,respuesta19,filtrar20,array20Int,arr20Int,respuesta20;
    //   var filtrar21,array21Int,arr21Int,respuesta21,filtrar22,array22Int,arr22Int,respuesta22,filtrar23,array23Int,arr23Int,respuesta23,filtrar24,array24Int,arr24Int,respuesta24;
    //   var filtrar25,array25Int,arr25Int,respuesta25,filtrar26,array26Int,arr26Int,respuesta26,filtrar27,array27Int,arr27Int,respuesta27,filtrar28,array28Int,arr28Int,respuesta28;
    //   var filtrar29,array29Int,arr29Int,respuesta29,filtrar30,array30Int,arr30Int,respuesta30,filtrar31,array31Int,arr31Int,respuesta31,filtrar32,array32Int,arr32Int,respuesta32;
    //   var filtrar33,array33Int,arr33Int,respuesta33,filtrar34,array34Int,arr34Int,respuesta34,filtrar35,array35Int,arr35Int,respuesta35,filtrar36,array36Int,arr36Int,respuesta36;
    //   var filtrar37,array37Int,arr37Int,respuesta37,filtrar38,array38Int,arr38Int,respuesta38,filtrar39,array39Int,arr39Int,respuesta39,filtrar40,array40Int,arr40Int,respuesta40;
    //   var filtrar41,array41Int,arr41Int,respuesta41,filtrar42,array42Int,arr42Int,respuesta42,filtrar43,array43Int,arr43Int,respuesta43,filtrar44,array44Int,arr44Int,respuesta44;
    //   var filtrar45,array45Int,arr45Int,respuesta45,filtrar46,array46Int,arr46Int,respuesta46,filtrar47,array47Int,arr47Int,respuesta47,filtrar48,array48Int,arr48Int,respuesta48;
    //   var filtrar49,array49Int,arr49Int,respuesta49,filtrar50,array50Int,arr50Int,respuesta50,filtrar51,array51Int,arr51Int,respuesta51,filtrar52,array52Int,arr52Int,respuesta52;
    //   var filtrar53,array53Int,arr53Int,respuesta53,filtrar54,array54Int,arr54Int,respuesta54,filtrar55,array55Int,arr55Int,respuesta55,filtrar56,array56Int,arr56Int,respuesta56;
    //   var filtrar57,array57Int,arr57Int,respuesta57,filtrar58,array58Int,arr58Int,respuesta58,filtrar59,array59Int,arr59Int,respuesta59,filtrar60,array60Int,arr60Int,respuesta60;
    //   var filtrar61,array61Int,arr61Int,respuesta61,filtrar62,array62Int,arr62Int,respuesta62,filtrar63,array63Int,arr63Int,respuesta63,filtrar64,array64Int,arr64Int,respuesta64;
    //   var filtrar65,array65Int,arr65Int,respuesta65,filtrar66,array66Int,arr66Int,respuesta66,filtrar67,array67Int,arr67Int,respuesta67,filtrar68,array68Int,arr68Int,respuesta68;
    //   var filtrar69,array69Int,arr69Int,respuesta69,filtrar70,array70Int,arr70Int,respuesta70,filtrar71,array71Int,arr71Int,respuesta71,filtrar72,array72Int,arr72Int,respuesta72;
    
    //     this.state.resultadosInicio.map(rows=>{

    //     filtrar1 =  rows.filter(function(hero) {
    //       console.log("hero",hero)
    //       return hero.fk_preguntasEEO == 1;
    //     });
    //     array1.push(filtrar1)
    //     array1.map(rows=>{
    //       if(rows[0]){
    //         valor1.push(rows[0].ponderacion)
    //       } 
    //     })
    //     arr1Int = valor1.map(x => Number.parseInt(x, 10)); 
    //     respuesta1=0;
    //     arr1Int.forEach (function(numero){
    //       respuesta1 += numero;
    //     });
    //     }) 
    //     this.state.resultadosInicio.map(rows=>{
    //     filtrar2 =  rows.filter(function(hero) {
    //       return hero.fk_preguntasEEO == 2;
    //     });
    //     array2.push(filtrar2)
    //     array2.map(rows=>{
    //       if(rows[0]){
    //         valor2.push(rows[0].ponderacion)
    //       } 
    //     })
    //     arr2Int = valor2.map(x => Number.parseInt(x, 10)); 
    //     respuesta2=0;
    //     arr2Int.forEach (function(numero){
    //       respuesta2 += numero;
    //     });
    //     }) 
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar3 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 3;
    //       });
    //       array3.push(filtrar3)
    //       array3.map(rows=>{
    //         if(rows[0]){
    //           valor3.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr3Int = valor3.map(x => Number.parseInt(x, 10)); 
    //       respuesta3=0;
    //       arr3Int.forEach (function(numero){
    //         respuesta3 += numero;
    //       });
    //       }) 
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar4 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 4;
    //       });
    //       array4.push(filtrar4)
    
    //       array4.map(rows=>{
    //         if(rows[0]){
    //           valor4.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr4Int = valor4.map(x => Number.parseInt(x, 10)); 
    //       respuesta4=0;
    //       arr4Int.forEach (function(numero){
    //         respuesta4 += numero;
    //       });
    //       }) 
        
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar5 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 5;
    //       });
    //       array5.push(filtrar5)
    //       array5.map(rows=>{
    //         if(rows[0]){
    //           valor5.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr5Int = valor5.map(x => Number.parseInt(x, 10)); 
    //       respuesta5=0;
    //       arr5Int.forEach (function(numero){
    //         respuesta5 += numero;
    //       });
    //       }) 
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar6 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 6;
    //       });
    //       array6.push(filtrar6)
    //       array6.map(rows=>{
    //         if(rows[0]){
    //           valor6.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr6Int = valor6.map(x => Number.parseInt(x, 10)); 
    //       respuesta6=0;
    //       arr6Int.forEach (function(numero){
    //         respuesta6 += numero;
    //       });
    //       }) 
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar7 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 7;
    //       });
    //       array7.push(filtrar7)
    //       array7.map(rows=>{
    //         if(rows[0]){
    //           valor7.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr7Int = valor7.map(x => Number.parseInt(x, 10)); 
    //       respuesta7=0;
    //       arr7Int.forEach (function(numero){
    //         respuesta7 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar8 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 8;
    //       });
    //       array8.push(filtrar8)
    //       array8.map(rows=>{
    //         if(rows[0]){
    //           valor8.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr8Int = valor8.map(x => Number.parseInt(x, 10)); 
    //       respuesta8=0;
    //       arr8Int.forEach (function(numero){
    //         respuesta8 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar9 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 9;
    //       });
    //       array9.push(filtrar9)
    //       array9.map(rows=>{
    //         if(rows[0]){
    //           valor9.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr9Int = valor9.map(x => Number.parseInt(x, 10)); 
    //       respuesta9=0;
    //       arr9Int.forEach (function(numero){
    //         respuesta9 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar10 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 10;
    //       });
    //       array10.push(filtrar10)
    //       array10.map(rows=>{
    //         if(rows[0]){
    //           valor10.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr10Int = valor10.map(x => Number.parseInt(x, 10)); 
    //       respuesta10=0;
    //       arr10Int.forEach (function(numero){
    //         respuesta10 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar11 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 11;
    //       });
    //       array11.push(filtrar11)
    //       array11.map(rows=>{
    //         if(rows[0]){
    //           valor11.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr11Int = valor11.map(x => Number.parseInt(x, 10)); 
    //       respuesta11=0;
    //       arr11Int.forEach (function(numero){
    //         respuesta11 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar12 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 12;
    //       });
    //       array12.push(filtrar12)
    //       array12.map(rows=>{
    //         if(rows[0]){
    //           valor12.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr12Int = valor12.map(x => Number.parseInt(x, 10)); 
    //       respuesta12=0;
    //       arr12Int.forEach (function(numero){
    //         respuesta12 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar13 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 13;
    //       });
    //       array13.push(filtrar13)
    //       array13.map(rows=>{
    //         if(rows[0]){
    //           valor13.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr13Int = valor13.map(x => Number.parseInt(x, 10)); 
    //       respuesta13=0;
    //       arr13Int.forEach (function(numero){
    //         respuesta13 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar14 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 14;
    //       });
    //       array14.push(filtrar14)
    //       array14.map(rows=>{
    //         if(rows[0]){
    //           valor14.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr14Int = valor14.map(x => Number.parseInt(x, 10)); 
    //       respuesta14=0;
    //       arr14Int.forEach (function(numero){
    //         respuesta14 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar15 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 15;
    //       });
    //       array15.push(filtrar15)
    //       array15.map(rows=>{
    //         if(rows[0]){
    //           valor15.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr15Int = valor15.map(x => Number.parseInt(x, 10)); 
    //       respuesta15=0;
    //       arr15Int.forEach (function(numero){
    //         respuesta15 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar16 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 16;
    //       });
    //       array16.push(filtrar16)
    //       array16.map(rows=>{
    //         if(rows[0]){
    //           valor16.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr16Int = valor16.map(x => Number.parseInt(x, 10)); 
    //       respuesta16=0;
    //       arr16Int.forEach (function(numero){
    //         respuesta16 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar17 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 17;
    //       });
    //       array17.push(filtrar17)
    //       array17.map(rows=>{
    //         if(rows[0]){
    //           valor17.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr17Int = valor17.map(x => Number.parseInt(x, 10)); 
    //       respuesta17=0;
    //       arr17Int.forEach (function(numero){
    //         respuesta17 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar18 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 18;
    //       });
    //       array18.push(filtrar18)
    //       array18.map(rows=>{
    //         if(rows[0]){
    //           valor18.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr18Int = valor18.map(x => Number.parseInt(x, 10)); 
    //       respuesta18=0;
    //       arr18Int.forEach (function(numero){
    //         respuesta18 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar19 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 19;
    //       });
    //       array19.push(filtrar19)
    //       array19.map(rows=>{
    //         if(rows[0]){
    //           valor19.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr19Int = valor19.map(x => Number.parseInt(x, 10)); 
    //       respuesta19=0;
    //       arr19Int.forEach (function(numero){
    //         respuesta19 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar20 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 20;
    //       });
    //       array20.push(filtrar20)
    //       array20.map(rows=>{
    //         if(rows[0]){
    //           valor20.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr20Int = valor20.map(x => Number.parseInt(x, 10)); 
    //       respuesta20=0;
    //       arr20Int.forEach (function(numero){
    //         respuesta20 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar21 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 21;
    //       });
    //       array21.push(filtrar21)
    //       array21.map(rows=>{
    //         if(rows[0]){
    //           valor21.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr21Int = valor21.map(x => Number.parseInt(x, 10)); 
    //       respuesta21=0;
    //       arr21Int.forEach (function(numero){
    //         respuesta21 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar22 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 22;
    //       });
    //       array22.push(filtrar22)
    //       array22.map(rows=>{
    //         if(rows[0]){
    //           valor22.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr22Int = valor22.map(x => Number.parseInt(x, 10)); 
    //       respuesta22=0;
    //       arr22Int.forEach (function(numero){
    //         respuesta22 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar23 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 23;
    //       });
    //       array23.push(filtrar23)
    //       array23.map(rows=>{
    //         if(rows[0]){
    //           valor23.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr23Int = valor23.map(x => Number.parseInt(x, 10)); 
    //       respuesta23=0;
    //       arr23Int.forEach (function(numero){
    //         respuesta23 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar24 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 24;
    //       });
    //       array24.push(filtrar24)
    //       array24.map(rows=>{
    //         if(rows[0]){
    //           valor24.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr24Int = valor24.map(x => Number.parseInt(x, 10)); 
    //       respuesta24=0;
    //       arr24Int.forEach (function(numero){
    //         respuesta24 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar25 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 25;
    //       });
    //       array25.push(filtrar25)
    //       array25.map(rows=>{
    //         if(rows[0]){
    //           valor25.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr25Int = valor25.map(x => Number.parseInt(x, 10)); 
    //       respuesta25=0;
    //       arr25Int.forEach (function(numero){
    //         respuesta25 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar26 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 26;
    //       });
    //       array26.push(filtrar26)
    //       array26.map(rows=>{
    //         if(rows[0]){
    //           valor26.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr26Int = valor26.map(x => Number.parseInt(x, 10)); 
    //       respuesta26=0;
    //       arr26Int.forEach (function(numero){
    //         respuesta26 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar27 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 27;
    //       });
    //       array27.push(filtrar27)
    //       array27.map(rows=>{
    //         if(rows[0]){
    //           valor27.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr27Int = valor27.map(x => Number.parseInt(x, 10)); 
    //       respuesta27=0;
    //       arr27Int.forEach (function(numero){
    //         respuesta27 += numero;
    //       });
    //       });
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar28 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 28;
    //       });
    //       array28.push(filtrar28)
    //       array28.map(rows=>{
    //         if(rows[0]){
    //           valor28.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr28Int = valor28.map(x => Number.parseInt(x, 10)); 
    //       respuesta28=0;
    //       arr28Int.forEach (function(numero){
    //         respuesta28 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar29 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 29;
    //       });
    //       array29.push(filtrar29)
    //       array29.map(rows=>{
    //         if(rows[0]){
    //           valor29.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr29Int = valor29.map(x => Number.parseInt(x, 10)); 
    //       respuesta29=0;
    //       arr29Int.forEach (function(numero){
    //         respuesta29 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar30 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 30;
    //       });
    //       array30.push(filtrar30)
    //       array30.map(rows=>{
    //         if(rows[0]){
    //           valor30.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr30Int = valor30.map(x => Number.parseInt(x, 10)); 
    //       respuesta30=0;
    //       arr30Int.forEach (function(numero){
    //         respuesta30 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar31 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 31;
    //       });
    //       array31.push(filtrar31)
    //       array31.map(rows=>{
    //         if(rows[0]){
    //           valor31.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr31Int = valor31.map(x => Number.parseInt(x, 10)); 
    //       respuesta31=0;
    //       arr31Int.forEach (function(numero){
    //         respuesta31 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar32 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 32;
    //       });
    //       array32.push(filtrar32)
    //       array32.map(rows=>{
    //         if(rows[0]){
    //           valor32.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr32Int = valor32.map(x => Number.parseInt(x, 10)); 
    //       respuesta32=0;
    //       arr32Int.forEach (function(numero){
    //         respuesta32 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar33 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 33;
    //       });
    //       array33.push(filtrar33)
    //       array33.map(rows=>{
    //         if(rows[0]){
    //           valor33.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr33Int = valor33.map(x => Number.parseInt(x, 10)); 
    //       respuesta33=0;
    //       arr33Int.forEach (function(numero){
    //         respuesta33 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar34 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 34;
    //       });
    //       array34.push(filtrar34)
    //       array34.map(rows=>{
    //         if(rows[0]){
    //           valor34.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr34Int = valor34.map(x => Number.parseInt(x, 10)); 
    //       respuesta34=0;
    //       arr34Int.forEach (function(numero){
    //         respuesta34 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar35 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 35;
    //       });
    //       array35.push(filtrar35)
    //       array35.map(rows=>{
    //         if(rows[0]){
    //           valor35.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr35Int = valor35.map(x => Number.parseInt(x, 10)); 
    //       respuesta35=0;
    //       arr35Int.forEach (function(numero){
    //         respuesta35 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar36 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 36;
    //       });
    //       array36.push(filtrar36)
    //       array36.map(rows=>{
    //         if(rows[0]){
    //           valor36.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr36Int = valor36.map(x => Number.parseInt(x, 10)); 
    //       respuesta36=0;
    //       arr36Int.forEach (function(numero){
    //         respuesta36 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar37 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 37;
    //       });
    //       array37.push(filtrar37)
    //       array37.map(rows=>{
    //         if(rows[0]){
    //           valor37.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr37Int = valor37.map(x => Number.parseInt(x, 10)); 
    //       respuesta37=0;
    //       arr37Int.forEach (function(numero){
    //         respuesta37 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar38 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 38;
    //       });
    //       array38.push(filtrar38)
    //       array38.map(rows=>{
    //         if(rows[0]){
    //           valor38.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr38Int = valor38.map(x => Number.parseInt(x, 10)); 
    //       respuesta38=0;
    //       arr38Int.forEach (function(numero){
    //         respuesta38 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar39 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 39;
    //       });
    //       array39.push(filtrar39)
    //       array39.map(rows=>{
    //         if(rows[0]){
    //           valor39.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr39Int = valor39.map(x => Number.parseInt(x, 10)); 
    //       respuesta39=0;
    //       arr39Int.forEach (function(numero){
    //         respuesta39 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar40 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 40;
    //       });
    //       array40.push(filtrar40)
    //       array40.map(rows=>{
    //         if(rows[0]){
    //           valor40.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr40Int = valor40.map(x => Number.parseInt(x, 10)); 
    //       respuesta40=0;
    //       arr40Int.forEach (function(numero){
    //         respuesta40 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar41 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 41;
    //       });
    //       array41.push(filtrar41)
    //       array41.map(rows=>{
    //         if(rows[0]){
    //           valor41.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr41Int = valor41.map(x => Number.parseInt(x, 10)); 
    //       respuesta41=0;
    //       arr41Int.forEach (function(numero){
    //         respuesta41 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar42 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 42;
    //       });
    //       array42.push(filtrar42)
    //       array42.map(rows=>{
    //         if(rows[0]){
    //           valor42.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr42Int = valor42.map(x => Number.parseInt(x, 10)); 
    //       respuesta42=0;
    //       arr42Int.forEach (function(numero){
    //         respuesta42 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar43 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 43;
    //       });
    //       array43.push(filtrar43)
    //       array43.map(rows=>{
    //         if(rows[0]){
    //           valor43.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr43Int = valor43.map(x => Number.parseInt(x, 10)); 
    //       respuesta43=0;
    //       arr43Int.forEach (function(numero){
    //         respuesta43 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar44 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 44;
    //       });
    //       array44.push(filtrar44)
    //       array44.map(rows=>{
    //         if(rows[0]){
    //           valor44.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr44Int = valor44.map(x => Number.parseInt(x, 10)); 
    //       respuesta44=0;
    //       arr44Int.forEach (function(numero){
    //         respuesta44 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar45 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 45;
    //       });
    //       array45.push(filtrar45)
    //       array45.map(rows=>{
    //         if(rows[0]){
    //           valor45.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr45Int = valor45.map(x => Number.parseInt(x, 10)); 
    //       respuesta45=0;
    //       arr45Int.forEach (function(numero){
    //         respuesta45 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar46 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 46;
    //       });
    //       array46.push(filtrar46)
    //       array46.map(rows=>{
    //         if(rows[0]){
    //           valor46.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr46Int = valor46.map(x => Number.parseInt(x, 10)); 
    //       respuesta46=0;
    //       arr46Int.forEach (function(numero){
    //         respuesta46 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar47 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 47;
    //       });
    //       array47.push(filtrar47)
    //       array47.map(rows=>{
    //         if(rows[0]){
    //           valor47.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr47Int = valor47.map(x => Number.parseInt(x, 10)); 
    //       respuesta47=0;
    //       arr47Int.forEach (function(numero){
    //         respuesta47 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar48 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 48;
    //       });
    //       array48.push(filtrar48)
    //       array48.map(rows=>{
    //         if(rows[0]){
    //           valor48.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr48Int = valor48.map(x => Number.parseInt(x, 10)); 
    //       respuesta48=0;
    //       arr48Int.forEach (function(numero){
    //         respuesta48 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar49 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 49;
    //       });
    //       array49.push(filtrar49)
    //       array49.map(rows=>{
    //         if(rows[0]){
    //           valor49.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr49Int = valor49.map(x => Number.parseInt(x, 10)); 
    //       respuesta49=0;
    //       arr49Int.forEach (function(numero){
    //         respuesta49 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar50 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 50;
    //       });
    //       array50.push(filtrar50)
    //       array50.map(rows=>{
    //         if(rows[0]){
    //           valor50.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr50Int = valor50.map(x => Number.parseInt(x, 10)); 
    //       respuesta50=0;
    //       arr50Int.forEach (function(numero){
    //         respuesta50 += numero;
    //       });
    //       });
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar51 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 51;
    //       });
    //       array51.push(filtrar51)
    //       array51.map(rows=>{
    //         if(rows[0]){
    //           valor51.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr51Int = valor51.map(x => Number.parseInt(x, 10)); 
    //       respuesta51=0;
    //       arr51Int.forEach (function(numero){
    //         respuesta51 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar52 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 52;
    //       });
    //       array52.push(filtrar52)
    //       array52.map(rows=>{
    //         if(rows[0]){
    //           valor52.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr52Int = valor52.map(x => Number.parseInt(x, 10)); 
    //       respuesta52=0;
    //       arr52Int.forEach (function(numero){
    //         respuesta52 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar53 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 53;
    //       });
    //       array53.push(filtrar53)
    //       array53.map(rows=>{
    //         if(rows[0]){
    //           valor53.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr53Int = valor53.map(x => Number.parseInt(x, 10)); 
    //       respuesta53=0;
    //       arr53Int.forEach (function(numero){
    //         respuesta53 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar54 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 54;
    //       });
    //       array54.push(filtrar54)
    //       array54.map(rows=>{
    //         if(rows[0]){
    //           valor54.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr54Int = valor54.map(x => Number.parseInt(x, 10)); 
    //       respuesta54=0;
    //       arr54Int.forEach (function(numero){
    //         respuesta54 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar55 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 55;
    //       });
    //       array55.push(filtrar55)
    //       array55.map(rows=>{
    //         if(rows[0]){
    //           valor55.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr55Int = valor55.map(x => Number.parseInt(x, 10)); 
    //       respuesta55=0;
    //       arr55Int.forEach (function(numero){
    //         respuesta55 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar56 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 56;
    //       });
    //       array56.push(filtrar56)
    //       array56.map(rows=>{
    //         if(rows[0]){
    //           valor56.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr56Int = valor56.map(x => Number.parseInt(x, 10)); 
    //       respuesta56=0;
    //       arr56Int.forEach (function(numero){
    //         respuesta56 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar57 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 57;
    //       });
    //       array57.push(filtrar57)
    //       array57.map(rows=>{
    //         if(rows[0]){
    //           valor57.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr57Int = valor57.map(x => Number.parseInt(x, 10)); 
    //       respuesta57=0;
    //       arr57Int.forEach (function(numero){
    //         respuesta57 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar58 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 58;
    //       });
    //       array58.push(filtrar58)
    //       array58.map(rows=>{
    //         if(rows[0]){
    //           valor58.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr58Int = valor58.map(x => Number.parseInt(x, 10)); 
    //       respuesta58=0;
    //       arr58Int.forEach (function(numero){
    //         respuesta58 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar59 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 59;
    //       });
    //       array59.push(filtrar59)
    //       array59.map(rows=>{
    //         if(rows[0]){
    //           valor59.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr59Int = valor59.map(x => Number.parseInt(x, 10)); 
    //       respuesta59=0;
    //       arr59Int.forEach (function(numero){
    //         respuesta59 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar60 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 60;
    //       });
    //       array60.push(filtrar60)
    //       array60.map(rows=>{
    //         if(rows[0]){
    //           valor60.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr60Int = valor60.map(x => Number.parseInt(x, 10)); 
    //       respuesta60=0;
    //       arr60Int.forEach (function(numero){
    //         respuesta60 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar61 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 61;
    //       });
    //       array61.push(filtrar61)
    //       array61.map(rows=>{
    //         if(rows[0]){
    //           valor61.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr61Int = valor61.map(x => Number.parseInt(x, 10)); 
    //       respuesta61=0;
    //       arr61Int.forEach (function(numero){
    //         respuesta61 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar62 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 62;
    //       });
    //       array62.push(filtrar62)
    //       array62.map(rows=>{
    //         if(rows[0]){
    //           valor62.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr62Int = valor62.map(x => Number.parseInt(x, 10)); 
    //       respuesta62=0;
    //       arr62Int.forEach (function(numero){
    //         respuesta62 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar63 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 63;
    //       });
    //       array63.push(filtrar63)
    //       array63.map(rows=>{
    //         if(rows[0]){
    //           valor63.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr63Int = valor63.map(x => Number.parseInt(x, 10)); 
    //       respuesta63=0;
    //       arr63Int.forEach (function(numero){
    //         respuesta63 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar64 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 64;
    //       });
    //       array64.push(filtrar64)
    //       array64.map(rows=>{
    //         if(rows[0]){
    //           valor64.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr64Int = valor64.map(x => Number.parseInt(x, 10)); 
    //       respuesta64=0;
    //       arr64Int.forEach (function(numero){
    //         respuesta64 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar65 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 65;
    //       });
    //       array65.push(filtrar65)
    //       array65.map(rows=>{
    //         if(rows[0]){
    //           valor65.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr65Int = valor65.map(x => Number.parseInt(x, 10)); 
    //       respuesta65=0;
    //       arr65Int.forEach (function(numero){
    //         respuesta65 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar66 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 66;
    //       });
    //       array66.push(filtrar66)
    //       array66.map(rows=>{
    //         if(rows[0]){
    //           valor66.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr66Int = valor66.map(x => Number.parseInt(x, 10)); 
    //       respuesta66=0;
    //       arr66Int.forEach (function(numero){
    //         respuesta66 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar67 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 67;
    //       });
    //       array67.push(filtrar67)
    //       array67.map(rows=>{
    //         if(rows[0]){
    //           valor67.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr67Int = valor67.map(x => Number.parseInt(x, 10)); 
    //       respuesta67=0;
    //       arr67Int.forEach (function(numero){
    //         respuesta67 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar68 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 68;
    //       });
    //       array68.push(filtrar68)
    //       array68.map(rows=>{
    //         if(rows[0]){
    //           valor68.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr68Int = valor68.map(x => Number.parseInt(x, 10)); 
    //       respuesta68=0;
    //       arr68Int.forEach (function(numero){
    //         respuesta68 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar69 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 69;
    //       });
    //       array69.push(filtrar69)
    //       array69.map(rows=>{
    //         if(rows[0]){
    //           valor69.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr69Int = valor69.map(x => Number.parseInt(x, 10)); 
    //       respuesta69=0;
    //       arr69Int.forEach (function(numero){
    //         respuesta69 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar70 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 70;
    //       });
    //       array70.push(filtrar70)
    //       array70.map(rows=>{
    //         if(rows[0]){
    //           valor70.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr70Int = valor70.map(x => Number.parseInt(x, 10)); 
    //       respuesta70=0;
    //       arr70Int.forEach (function(numero){
    //         respuesta70 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar71 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 71;
    //       });
    //       array71.push(filtrar71)
    //       array71.map(rows=>{
    //         if(rows[0]){
    //           valor71.push(rows[0].ponderacion)
    //         } 
    //       })

    //       arr71Int = valor71.map(x => Number.parseInt(x, 10)); 
    //       respuesta71=0;
    //       arr71Int.forEach (function(numero){
    //         respuesta71 += numero;
    //       });
    //       })
    //       this.state.resultadosInicio.map(rows=>{
    //       filtrar72 =  rows.filter(function(hero) {
    //         return hero.fk_preguntasEEO == 72;
    //       });
    //       console.log("array" , array72)

    //       array72.push(filtrar72)
    //       array72.map(rows=>{
    //         if(rows[0]){
    //           valor72.push(rows[0].ponderacion)
    //         } 
    //       })
    //       arr72Int = valor72.map(x => Number.parseInt(x, 10)); 
    //       respuesta72=0;
    //       arr72Int.forEach (function(numero){
    //         respuesta72 += numero;
    //       });
    //       })
    // total =(respuesta1+respuesta2+respuesta3+respuesta4+respuesta5+respuesta6+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta12+respuesta13+respuesta14+respuesta15+respuesta16+respuesta17+respuesta18+respuesta19+respuesta20
    // +respuesta21+respuesta22+respuesta23+respuesta24+respuesta25+respuesta26+respuesta27+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40
    // +respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52+respuesta53+respuesta54+respuesta55+respuesta56+respuesta57+respuesta58+respuesta59+respuesta60
    // +respuesta61+respuesta62+respuesta63+respuesta64+respuesta65+respuesta66+respuesta67+respuesta68+respuesta69+respuesta70+respuesta71+respuesta72)          
    
    // let length =this.state.resultadosInicio.length;
    // let general =total/length.toFixed(2);
    
    //             let colorCategoriaUno;
    //             let textoCategoriaUno;
    //             let categoriaUno = ((respuesta1+respuesta3+respuesta2+respuesta4+respuesta5)/length).toFixed(2);
    //             if(categoriaUno < 5){
    //               colorCategoriaUno  = "#9BE0F7"
    //               textoCategoriaUno = "Nulo o despreciable"
    //             }else if(categoriaUno >= 5 && categoriaUno < 9){
    //               colorCategoriaUno ="#6BF56E"
    //               textoCategoriaUno = "Bajo"
    //             }else if(categoriaUno >= 9 && categoriaUno < 11){
    //               colorCategoriaUno="#FFFF00"
    //               textoCategoriaUno = "Medio"
    //             }else if(categoriaUno >= 11 && categoriaUno < 14){
    //               colorCategoriaUno = "#FFC000"
    //               textoCategoriaUno = "Alto"
    //             }else if(categoriaUno >= 14){
    //               colorCategoriaUno =  "#FF0000"
    //               textoCategoriaUno = "Muy alto"
    //             }
    //             let colorCategoriaDos;
    //             let textoCategoriaDos;
    //             let categoriaDos = ((respuesta6+respuesta12+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta65+respuesta66+respuesta67+respuesta68+respuesta13+respuesta14+respuesta15+respuesta16+respuesta25+respuesta26+respuesta27+respuesta28+respuesta23+respuesta24+respuesta29+respuesta30+respuesta35+respuesta36)/length).toFixed(2);
    //             if(categoriaDos < 15){
    //               colorCategoriaDos  = "#9BE0F7"
    //               textoCategoriaDos = "Nulo o despreciable"
    //             }else if(categoriaDos >= 15 && categoriaDos < 30){
    //               colorCategoriaDos ="#6BF56E"
    //               textoCategoriaDos = "Bajo"
    //             }else if(categoriaDos >=30 && categoriaDos < 45){
    //               colorCategoriaDos="#FFFF00"
    //               textoCategoriaDos = "Medio"
    //             }else if(categoriaDos >=45 && categoriaDos < 60){
    //               colorCategoriaDos = "#FFC000"
    //               textoCategoriaDos = "Alto"
    //             }else if(categoriaDos >= 60){
    //               colorCategoriaDos = "#FF0000"
    //               textoCategoriaDos = "Muy alto "
    //             }
    //             let colorCategoriaTre;
    //             let textoCategoriaTre;
    //             let categoriaTre = ((respuesta17+respuesta18+respuesta19+respuesta20+respuesta21+respuesta22)/length).toFixed(2);
                
    //             if(categoriaTre < 5){
    //               colorCategoriaTre  = "#9BE0F7"
    //               textoCategoriaTre="Nulo o despreciable"
    //             }else if(categoriaTre >= 5 && categoriaTre < 7){
    //               colorCategoriaTre ="#6BF56E"
    //               textoCategoriaTre="Bajo"
    //             }else if(categoriaTre >=7 && categoriaTre < 10){
    //               colorCategoriaTre="#FFFF00"
    //               textoCategoriaTre="Medio"
    //             }else if(categoriaTre >=10 && categoriaTre < 13){
    //               colorCategoriaTre = "#FFC000"
    //               textoCategoriaTre="Alto"
    //             }else if(categoriaTre >= 13){
    //               colorCategoriaTre = "#FF0000"
    //               textoCategoriaTre="Muy alto"
    //             }
    //             let colorCategoriaCuatro;
    //             let textoCategoriaCuatro;
    //             let categoriaCuatro = ((respuesta31+respuesta32+respuesta33+respuesta34+respuesta37+respuesta38+respuesta39+respuesta40+respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta69+respuesta70+respuesta71+respuesta72+respuesta57+respuesta58+respuesta59+respuesta60+respuesta61+respuesta62+respuesta63+respuesta64)/length).toFixed(2);
    //             if(categoriaCuatro < 14){
    //               colorCategoriaCuatro  = "#9BE0F7"
    //               textoCategoriaCuatro="Nulo o despreciable "
    //             }else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
    //               colorCategoriaCuatro ="#6BF56E"
    //               textoCategoriaCuatro="Bajo"
    //             }else if(categoriaCuatro >=29 && categoriaCuatro < 42){
    //               colorCategoriaCuatro="#FFFF00"
    //               textoCategoriaCuatro="Medio"
    //             }else if(categoriaCuatro >=42 && categoriaCuatro < 58){
    //               colorCategoriaCuatro = "#FFC000"
    //               textoCategoriaCuatro="Alto"
    //             }else if(categoriaCuatro >= 58){
    //               colorCategoriaCuatro = "#FF0000"
    //               textoCategoriaCuatro="Muy alto"
    //             }
    //             let colorCategoriaCinco;
    //             let textoCategoriaCinco;
    //             let categoriaCinco = ((respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52+respuesta55+respuesta56+respuesta53+respuesta54)/length).toFixed(2);
    //             if(categoriaCinco < 10){
    //               colorCategoriaCinco  = "#9BE0F7"
    //               textoCategoriaCuatro="Nulo o despreciable "
    //             }else if(categoriaCinco >= 10 && categoriaCinco < 14){
    //               colorCategoriaCinco ="#6BF56E"
    //               textoCategoriaCuatro="Bajo"
    //             }else if(categoriaCinco >=14 && categoriaCinco < 18){
    //               colorCategoriaCinco="#FFFF00"
    //               textoCategoriaCuatro="Medio"
    //             }else if(categoriaCinco >=18 && categoriaCinco < 23){
    //               colorCategoriaCinco = "#FFC000"
    //               textoCategoriaCuatro="Alto"
    //             }else if(categoriaCinco >= 23){
    //               colorCategoriaCinco = "#FF0000"
    //               textoCategoriaCuatro="Muy alto"
    //             }
    
    //             localStorage.setIten("categoria1",categoriaUno)
    //             localStorage.setIten("colorCategoriaUno",colorCategoriaUno)
    //             localStorage.setIten("textoCategoriaUno",textoCategoriaUno)
    
    //             localStorage.setIten("categoriaDos",categoriaDos)
    //             localStorage.setIten("colorCategoriaDos",colorCategoriaDos)
    //             localStorage.setIten("textoCategoriaDos",textoCategoriaDos)
    
    //             localStorage.setIten("categoriaTre",categoriaTre)
    //             localStorage.setIten("colorCategoriaTre",colorCategoriaTre)
    //             localStorage.setIten("textoCategoriaTre",textoCategoriaTre)
    
    //             localStorage.setIten("categoriaCuatro",categoriaCuatro)
    //             localStorage.setIten("colorCategoriaCuatro",colorCategoriaCuatro)
    //             localStorage.setIten("textoCategoriaCuatro",textoCategoriaCuatro)
    
    //             localStorage.setIten("categoriaCinco",categoriaCinco)
    //             localStorage.setIten("colorCategoriaCinco",colorCategoriaCinco)
    //             localStorage.setIten("textoCategoriaCinco",textoCategoriaCinco)
    // }
    let Alerta;
    let dep;
    let suc;
    let pues;
    let alertaPuesto = localStorage.getItem("PuestoActivo")
    let alertaSucursal=localStorage.getItem("SucursalActiva")
    let AlertaDepartamento = localStorage.getItem("DepartamentoActivo")
   let empleadoAc=localStorage.getItem("empleadoActivo")
    if(empleadoAc==="false"){
     Alerta =   <Alert color="danger"> Estimado Usuario usted debe Contar con almenos 1 Empleado Registrado </Alert>
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

    let empleadoATSDetectado;
    if(this.state.AtsDetectado.length !== 0){ 
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
              {this.state.AtsDetectado.map(row => (
                
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

   let cargarLogo;
   if(this.state.modal20){

    cargarLogo  =  <MDBContainer >
      <MDBModal isOpen={this.state.modal20} toggle={this.toggle(20)}  tabindex="-1"  size="md">
        <MDBModalHeader toggle={this.toggle(20)}>
          Cargar Logo
        </MDBModalHeader>
        <MDBModalBody>
        <Upload/>
        </MDBModalBody>   
      </MDBModal>
    </MDBContainer>

   }

   let logo;
   if(!this.state.urlLogo){
   logo = <div>
    <strong style={{ color: '#FF5733  ' }}>Adjuntar logo de mi empresa</strong>
    <IconButton onClick={this.toggle(20)} color="#FF5733"> <PublishOutlinedIcon /></IconButton>
   </div>
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
    progressInstanceATS =<ProgressBar> <ProgressBar variant="primary" animated now={intPorcentajeATS}  label={`${intPorcentajeATS}%`} /><ProgressBar variant="danger" animated now={intPorcentajeATSFalse}  label={`${intPorcentajeATSFalse}%`} /></ProgressBar>;
   }else{
    progressInstanceATS =<ProgressBar> <ProgressBar variant="primary" animated now={50}  label={`Sin porcentaje`} /><ProgressBar variant="danger" animated now={50}  label={`Sin porcentaje`} /></ProgressBar>;
   }
   if(intPorcentajeRP || intPorcentajeRPFalse ){
    progressInstanceRP=<ProgressBar> <ProgressBar variant="primary" animated now={intPorcentajeRP}  label={`${intPorcentajeRP}%`} /><ProgressBar variant="danger" animated now={intPorcentajeRPFalse}  label={`${intPorcentajeRPFalse}%`} /></ProgressBar>;
   }else{
    progressInstanceRP =<ProgressBar> <ProgressBar variant="primary" animated now={50}  label={`Sin porcentaje`} /><ProgressBar variant="danger" animated now={50}  label={`Sin porcentaje`} /></ProgressBar>;
   }
   if(intPorcentajeEEO || intPorcentajeEEOFalse ){
    progressInstanceEEO=<ProgressBar> <ProgressBar variant="primary" animated now={intPorcentajeEEO}  label={`${intPorcentajeEEO}%`} /><ProgressBar variant="danger" animated now={intPorcentajeEEOFalse}  label={`${intPorcentajeEEOFalse}%`} /></ProgressBar>;
   }else{
    progressInstanceEEO =<ProgressBar> <ProgressBar variant="primary" animated now={50}  label={`Sin porcentaje`} /><ProgressBar variant="danger" animated now={50}  label={`Sin porcentaje`} /></ProgressBar>;
   }


    const container = { width: 1000, height: 500 }
    return (


      <React.Fragment>
      <div>
        <Navbar/>
        <MDBContainer style={container} >
       
        {/* {this.state.nombre.nombre} */}
        <MDBRow>
        <MDBCol>
        <MDBCard style={{ width: "25rem" ,marginTop:60}}>
          <MDBCardBody>        
          <strong>Empleados Evaluación ATS</strong>
         <MDBCardHeader><strong>Realizada: {this.state.ATSContestado} </strong>  <IconButton onClick={this.toggle(16)}> <RemoveRedEyeOutlinedIcon /></IconButton> <strong>No Realizada: {this.state.empleadosAtsFalse.length}</strong><IconButton onClick={this.toggle(15)}> <RemoveRedEyeOutlinedIcon /></IconButton></MDBCardHeader>                 
         {progressInstanceATS}  
       </MDBCardBody>
      </MDBCard>
      
      <MDBCard style={{ width: "25rem" ,marginTop:5}}>
          <MDBCardBody>        
          <strong>Empleados Evaluación RP</strong>
         <MDBCardHeader><strong>Realizada: {this.state.RPContestado} </strong>  <IconButton onClick={this.toggle(14)}> <RemoveRedEyeOutlinedIcon /></IconButton> <strong>No Realizada: {this.state.RPNoContestado} </strong><IconButton onClick={this.toggle(13)}> <RemoveRedEyeOutlinedIcon /></IconButton></MDBCardHeader>                  
         {progressInstanceRP}  
       </MDBCardBody>
      </MDBCard>
   
      <MDBCard style={{ width: "25rem" ,marginTop:5}}>
          <MDBCardBody>        
          <strong>Empleados Evaluación EEO</strong>
         <MDBCardHeader><strong>Realizada: {this.state.EEOContestado} </strong>  <IconButton onClick={this.toggle(11)}> <RemoveRedEyeOutlinedIcon /></IconButton> <strong>No Realizada: {this.state.EEONoContestado} </strong><IconButton onClick={this.toggle(12)}> <RemoveRedEyeOutlinedIcon /></IconButton></MDBCardHeader>                  
         {progressInstanceEEO}
       </MDBCardBody>
      </MDBCard>
        {/* <MDBContainer className=" mt-5 pt-5" ><Alert color = "primary">Su licencia caduca en undefined dias</Alert>  <ProgressBar/></MDBContainer> */}
        </MDBCol>
        <MDBCol>
        <MDBCard style={{ width: "22rem" ,marginTop:60,marginLeft:100}}>
          <MDBCardBody>        
          <MDBCardTitle>Información General:</MDBCardTitle>
         <MDBCardHeader>
          
          <strong>Licencia de {this.state.empleados} Usuarios</strong>
          <br/>
          <br/>
          <strong>Empleados Totales : {this.state.totalEmpleados}</strong>
          <br/>
          <br/>
          <strong>Empleados Restantes : {(this.state.empleados-this.state.max)}</strong><br/>
          <strong style={{ color: 'rgba(4, 180, 174,0.5) ' }}>¿Como usar Diagnóstico035?</strong>
          <IconButton onClick={this.openModal} color="secondary"> <RemoveRedEyeOutlinedIcon /></IconButton>
         </MDBCardHeader>      
        {expiro}
       </MDBCardBody>
      </MDBCard >
          <MDBCard style={{ width: "22rem",marginLeft:100,marginTop:5}}>
          <MDBCardBody>  
          <MDBCardTitle>Acciones a realizar</MDBCardTitle>      
         <MDBCardHeader><strong>Detección de ATS : {this.state.AtsDetectado.length}</strong> <IconButton onClick={this.toggle(10)}> <RemoveRedEyeOutlinedIcon /></IconButton>               
          {logo}
         </MDBCardHeader>   
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
        {cargarLogo}
        </MDBContainer>
      </div>
      <div><ModalVideo channel='vimeo' isOpen={this.state.isOpen} videoId='392556343' onClose={() => this.setState({isOpen: false})} /></div>
      </React.Fragment>
    );
  }
}



export default Home;

