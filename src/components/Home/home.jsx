import React from 'react';
import {MDBRow, MDBContainer,MDBBadge, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBCol, MDBCardHeader} from 'mdbreact';
import Sidebar from './sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import diagnostico from '../images/diagnostico.png'
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
import { API} from '../utils/http'


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
      array:[],
      empleados:'',
      max:''
    };
    this.onClick = this.onClick.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.ads = this.ads.bind(this);
  }

  componentWillMount(){

    let idAdmin = localStorage.getItem("idAdmin")
      // const url = 'http://localhost:8000/graphql'
      // console.log("el tiempo es " , t )
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
            EventoActivo
                }
              }
            `
        }
      })
      .then(datos => {	
        localStorage.setItem("periodo" ,datos.data.data.getPeriodo[0].Descripcion )
      }).catch(err=>{
        console.log("error",err.response)
      })

    this.handleFront();
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
    this.verifyTables();
    this.sendMAilAlert1Survey();
  }
   
  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

handleclick(){
this.props.history.push("/profile")

}

handleFront = async () =>{
  
  let em;
  let idSuperUsuario;
  let max;
  let correoAdmin = localStorage.getItem("correo")
  // const url = 'http://localhost:8000/graphql'
  await axios({
    url:  API,
    method:'post',
    data:{
    query:`
    mutation{
      authRegisterSingleEmployee(data:"${[correoAdmin]}"){
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

  const idAdmin =  localStorage.getItem("idAdmin")
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
      console.log("exito pack " , datos)
      em =datos.data.data.verifyPackSuperUser.empleados
      this.setState({empleados:em})
		}).catch(err=>{
			console.log("error" , err.response)
		}) 
    }).catch(err=>{
      console.log("error" , err.response)
    }) 
   
 
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
localStorage.removeItem("fechaRegistro")
localStorage.removeItem("fechaRegistroSuperusuario")
localStorage.removeItem("ok")
localStorage.removeItem("empleadoActivo")
localStorage.removeItem("DepartamentoActivo")
localStorage.removeItem("SucursalActiva")
localStorage.removeItem("PuestoActivo")

this.props.history.push("/")
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

verifyTables=async () =>{
  const idAdmin   = localStorage.getItem('idAdmin')
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
          console.log("este es el error " , err.response)
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
            console.log("depto activo",datos.data.data.deptoActive)
          if(datos.data.data.deptoActive.length>0){
            localStorage.setItem("DepartamentoActivo","true")
          }else{
            localStorage.setItem("DepartamentoActivo","false")
          }
      
        }).catch(err=>{
          console.log("este es el error " , err.response)
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
            console.log("depto activo",datos.data.data.sucActive)
          if(datos.data.data.sucActive.length>0){
            localStorage.setItem("SucursalActiva","true")
          }else{
            localStorage.setItem("SucursalActiva","false")
          }
      
        }).catch(err=>{
          console.log("este es el error " , err.response)
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
          console.log("este es el error " , err.response)
        })

  await axios({
    url:  API,
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

getMaxEmployees = async()=>{
  const idAdmin   = localStorage.getItem('idAdmin')
  // const url = 'http://localhost:8000/graphql'
  await axios({
    url:  API,
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
          // console.log("los datos son ",datos)
          this.setState({empleadosAtsFalse:datos.data.data.getEmployeesResolvesSurveyATSFalse})
          // console.log("state.lenghtFalse" , this.state.empleadosAtsFalse.length)
        }).catch(err=>{
          // console.log("este es el error " , err.response)
        })  
                 
    await axios({
    url:  API,
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
 
    await axios({
      url:  API,
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
          ATSContestado
              }
            }
          `
      }
          }).then((datos) => {
            this.setState({empleadosEEOFalse:datos.data.data.getEmployeesResolvesSurveyEEOFalse})
             console.log("datosFalse" ,datos.data.data.getEmployeesResolvesSurveyEEOFalse )
          }).catch(err=>{
            // console.log("error", err.response)
          })


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
              console.log("datos" , datos)
              
                eventoFinal = datos.data.data.getEventos.eventoFinal;
                alerta1=datos.data.data.getEventos.alerta1;
                alerta2=datos.data.data.getEventos.alerta2;
                alerta3=datos.data.data.getEventos.alerta3;
          
            }).catch(err=>{
              // console.log("error", err.response)
            })       
            
            var alert3;
            var alert2;
            var alert1;
            var fechaFinal;

            console.log("la alerta 1 es " , alerta1)
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
              console.log("alerta",fechaFinal) 
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
    let eventoActivo;

    // console.log("t",t)
    if(t.remainTime <= 1) {
      clearInterval(timerUpdate);
      let idAdmin = localStorage.getItem("idAdmin")
      // const url = 'http://localhost:8000/graphql'
      // console.log("el tiempo es " , t )
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
        console.log("error",err.response)
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
        console.log("exito",datos)
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
  // const url = 'http://localhost:8000/graphql'
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
    if(t.remainTime <= 1 && alerta1Enviada=='false') {
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
             const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su encuesta ATS por favor realice la actividad lo mas pronto posible "
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
          const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su encuesta RP por favor realice la actividad lo mas pronto posible "
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
            const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su encuesta EEO por favor realice la actividad lo mas pronto posible "
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
  // const url = 'http://localhost:8000/graphql'
  const timerUpdate = setInterval( async () => {
    let t = this.getRemainingTime(deadline);
   
    const idAdmin  = localStorage.getItem("idAdmin")
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
      console.log("error" , err)
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
             const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su encuesta ATS por favor realice la actividad lo mas pronto posible"
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
          const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su encuesta RP por favor realice la actividad lo mas pronto posible "
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
            const mensaje = "Estimado Colaborador le recordamos que aun no resuelve su encuesta EEO por favor realice la actividad lo mas pronto posible "
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
      console.log("error" , err)
    })
    if(t.remainTime <= 1 && alerta3Enviada=='false') {
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
             const mensaje = "Estimado Colaborador el periodo de evaluación se cerrara pronto por favor responda su encuesta ATS lo antes posible"
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
            const mensaje = "Estimado Colaborador el periodo de evaluación se cerrara pronto por favor responda su encuesta RP lo antes posible"
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
              const mensaje = "Estimado Colaborador el periodo de evaluación se cerrara pronto por favor responda su encuesta EEO lo antes posible"
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
                  full={{ src: diagnostico, width: 100, height: 33, alt: 'Diagnostico' }} />               
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem >
                  <a href="https://master.d14ylpne1awxxr.amplifyapp.com/">Resolver Encuesta</a>
                  </MDBNavItem>
                  
                </MDBNavbarNav>
              
               <strong>{localStorage.getItem("razonsocial")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {this.state.date}</strong> 
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
          <MDBCardTitle>Información General:</MDBCardTitle>
         <MDBCardHeader>
          
    <strong>Licencia de {this.state.empleados} Usuarios</strong>
          <br/>
          <br/>
          <strong>Empleados Totales : {this.state.empleados}</strong>
          <br/>
          <br/>
          <strong>Empleados Restantes : {(this.state.empleados-this.state.max)}</strong>
        
         
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

