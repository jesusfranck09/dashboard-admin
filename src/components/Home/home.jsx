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
import UpdateLogo from '../uploadImage/updateLogo'
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
      datosEventos:[]
    };

    this.ads = this.ads.bind(this);
    this.openModal = this.openModal.bind(this)

  }

   componentWillMount(){
    let idAdmin = localStorage.getItem("idAdmin")
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
        localStorage.setItem("periodo" ,datos.data.data.getPeriodo[0].Descripcion)
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
        console.log("periodo",eventoFinal)

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
         this.getEmployees();
         this.handleFront();
         this.verifyTables();
         this.getUrlLogo();
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
          })
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

  render() {
   
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
          Cargar logo
        </MDBModalHeader>
        <MDBModalBody>
        <Upload/>
        </MDBModalBody>   
      </MDBModal>
    </MDBContainer>

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

   let periodoActivo;

   if(this.state.periodo){
     periodoActivo= <font size="2" face="arial"color="#58BC8D">{this.state.periodo}</font>
   }
   else{
     periodoActivo= <font size="2" face="arial"color="#F7251B">Su periodo ha finalizado</font>
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
          
          <strong>Licencia de {this.state.empleados} Empleados</strong>
          <br/>
          <br/>
          <strong>Empleados registrados : {this.state.totalEmpleados}</strong>
          <br/>
          <br/>
          <strong>Empleados por registrar : {(this.state.empleados-this.state.totalEmpleados)}</strong><br/>
          <strong style={{ color: '#BC71F3' }}>¿Como usar Diagnóstico035?</strong>
          <IconButton onClick={this.openModal} color="secondary"> <RemoveRedEyeOutlinedIcon /></IconButton><br/>
          <i>Periodo actual :</i>{periodoActivo} 
         </MDBCardHeader>      
        {expiro}
       </MDBCardBody>
      </MDBCard >
          <MDBCard style={{ width: "22rem",marginLeft:100,marginTop:5}}>
          <MDBCardBody>  
          <MDBCardTitle>Acciones a realizar</MDBCardTitle>      
         <MDBCardHeader><strong>Detección de ATS : {this.state.AtsDetectado.length}</strong> <IconButton onClick={this.toggle(10)}> <RemoveRedEyeOutlinedIcon /></IconButton>               
          {logo}
          {updateLogo}
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
        {modificarLogo}
        </MDBContainer>
      </div>
      <div><ModalVideo channel='vimeo' isOpen={this.state.isOpen} videoId='461258739' onClose={() => this.setState({isOpen: false})} /></div>
      </React.Fragment>
    );
  }
}



export default Home;

