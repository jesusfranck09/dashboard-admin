import React from "react";
import MUIDataTable from "mui-datatables";
import Grow from "@material-ui/core/Grow";
import {MDBRow,MDBCol,MDBBtn,MDBTable, MDBTableBody, MDBContainer,MDBTableHead, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logo.png'
import logotipo from '../images/logotipo.png'
import diagnostico from '../images/diagnostico.png'
import { API} from '../utils/http'
import {Spinner,Button as BotonReactstrap} from 'react-bootstrap'

import '../Home/index.css'
import usuario from '../images/usuario.png'
import Button from '@material-ui/core/Button';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { DialogUtility } from '@syncfusion/ej2-popups';
import Modal from 'react-modal';
// import PDF from '../PDF/index'
import { Bar } from "react-chartjs-2";
import { MDBBadge} from "mdbreact";
import {Alert,Badge} from 'reactstrap'
import {
  Grid,
  
} from '@material-ui/core';
import axios from 'axios'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { PDFExport } from '@progress/kendo-react-pdf';
import PageTemplate from './pageTemplate.jsx';
import Navbar from '../Home/navbar'
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
export default class App extends React.Component {
  pdfExportComponent;

  constructor(props) {
    super(props);
    this.state = {
      datos:[],
      empleados:[],
      getPonderacion:[],
      datosGlobales:[],
      peticion1:[],
      botonResultados:'1',
      botonDisabled:'1',
      filtro1:'',
      filtro2:'',
      filtro3:'',
      filtro4:'',
      filtro5:'',
      filtro6:'',
      filtro7:'',
      filtro8:'',
      nombre1:'',
      nombre2:'',
      nombre3:'',
      nombre4:'',
      nombre5:'',
      nombre6:'',
      nombre7:'',
      nombre8:'',
      arrayFinal:[],
      resultados:[],
      resultadosEvaluacion:[],
      resultadosQuery:[],
      resultadosQueryMasivo:[],
      resultadosEvaluacionMasivo:[],
      reporteImasivo:[],
      fecha:'',
      datosLength:'',
      totalEmpleadosFiltrados:'',
      resultadosInicio:[],
      collapse: false,
      isOpen: false,
      showModal2: false,  
      spinner:false,

      // componentepdf:'0'
    };
    this.onClick = this.onClick.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.ads = this.ads.bind(this);
    
  }

    componentWillMount(){
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
      this.getGlobalEmployees()
    
    }
    onClick() {
      this.setState({
        collapse: !this.state.collapse,
      });
    }
  
  handleclick(){
  this.props.history.push("/profile")
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
  this.props.history.push("/")
  DialogUtility.alert({
    animationSettings: { effect: 'Fade' },           
    title: 'Hasta luego...!',
    position: "fixed",})}
  ads(){
    this.setState({showModal2:true}) 
  }
  getGlobalEmployees(){
    let totalEmpleados=[];
    var id  =localStorage.getItem("idAdmin")       
    // const url = 'http://localhost:8000/graphql'
    console.log("entro")
    axios({
      url:  API,
      method:'post',
      data:{
      query:`
      query{
        getEmployeesResolvesEEO(data:"${id}"){
          id
          nombre
          ApellidoP
          ApellidoM
          Sexo
          AreaTrabajo
          Puesto
          CentroTrabajo
          periodo
            }
          }
          `
      }
          }).then((datos) => {
            console.log("exito" , datos)
          this.setState({empleados:datos.data.data.getEmployeesResolvesEEO})       
          datos.data.data.getEmployeesResolvesEEO.map(rows=>{
            axios({
            url:  API,
            method:'post',
            data:{
            query:`
              query{
                getresultGlobalSurveyEEO(data:"${[rows.id,rows.periodo]}"){
                id 
                Respuestas 
                fk_preguntasEEO
                fk_Empleados
                ponderacion
                nombre 
                ApellidoP 
                ApellidoM 
                Curp 
                RFC 
                FechaNacimiento 
                Sexo 
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
                fk_correos 
                    }
                  }
                `
            }
                }).then(datos => {    
                  totalEmpleados.push(datos.data.data.getresultGlobalSurveyEEO)  
                  // console.log("rows data" , totalEmpleados)
                  this.setState({resultadosInicio:totalEmpleados})
                })
                .catch(err => {
                }); 
        })
          }).catch(err=>{
            console.log("error" ,err.response)
          })

          axios({
            url:  API,
            method:'post',
            data:{
            query:`
              query{
              getPonderacionEEO(data:"${[id]}"){
                id
                siempre
                casisiempre
                algunasveces
                casinunca
                nunca

                    }
                  }
                `
            }
                }).then(datos => { 
                 this.setState({getPonderacion: datos.data.data.getPonderacionEEO})
                  // console.log("ponderaciones",datos.data.data.getPonderacion)
                })
                .catch(err => {
                  console.log("el error es  ",err.response)
                }); 
     }

     
     consultarDatosFiltrados = async (datos,filtro) =>{
        this.setState({botonDisabled:''})
        this.setState({botonResultados:''})
      this.setState({spinner:true})
      let array=[];
      let periodo;
      let totalEmpleados=[];
      datos.map(rows=>{
        periodo= rows.data[6]
        array.push(rows.data[0])
      })
      for(var i=0; i<=array.length;i++){
        console.log("este es el array en i" , array[i])
        // const url = 'http://localhost:8000/graphql'
       await  axios({
          url:  API,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyEEO(data:"${[array[i],periodo]}"){
              id 
              Respuestas 
              fk_preguntasEEO
              fk_Empleados 
              ponderacion
              nombre 
              ApellidoP 
              ApellidoM 
              Curp 
              RFC 
              FechaNacimiento 
              Sexo  
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
              fk_correos 
                  }
                }
              `
          }
              }).then(datos => {    
              totalEmpleados.push(datos.data.data.getresultGlobalSurveyEEO)
            
              this.setState({peticion1:totalEmpleados})
              })
              .catch(err => {
              });  
           }
           this.setState({spinner:false});

           let array3 = []
           let array4=array3.push(array3)
           
      if(filtro!= undefined){
        
        if(filtro[0].length>0){
         
          this.setState({nombre1:filtro[0][0]})
          this.setState({filtro1:"ID"})
          this.setState({filtro6:""})
        }else{
          this.setState({nombre1:''})
          this.setState({filtro1:""})
          this.setState({filtro6:""})
        }
        if(filtro[1].length>0){
          this.setState({nombre2:filtro[1][0]})
          this.setState({filtro2:"NOMBRE"})
          this.setState({filtro6:""})
        }else{
          this.setState({nombre2:''})
          this.setState({filtro2:""})
          this.setState({filtro6:""})
        }
        if(filtro[2].length>0){
          this.setState({nombre3:filtro[2][0]})
          this.setState({filtro3:"SEXO"})
          this.setState({filtro6:""})
        }else{
          this.setState({nombre3:''})
          this.setState({filtro3:""})
          this.setState({filtro6:""})
        }
        if(filtro[3].length>0){
          this.setState({nombre4:filtro[3][0]})
          this.setState({filtro4:"ÁREA DE TRABAJO"})
          this.setState({filtro6:""})
        }else{
          this.setState({nombre4:''})
          this.setState({filtro4:""})
          this.setState({filtro6:""})
        }if(filtro[4].length>0){
          this.setState({nombre5:filtro[4][0]})
          this.setState({filtro5:"PUESTO"})
          this.setState({filtro6:""})
        }else{
          this.setState({nombre5:''})
          this.setState({filtro5:""})
          this.setState({filtro6:""})
        }if(filtro[5].length>0){
          this.setState({nombre6:filtro[5][0]})
        this.setState({filtro7:"CENTRO DE TRABAJO"})
        this.setState({filtro6:""})
      }else{
        this.setState({nombre6:''})
        this.setState({filtro7:""})
        this.setState({filtro6:""})
      }if(filtro[6].length>0){
        this.setState({nombre7:filtro[6][0]})
        this.setState({filtro8:"PERIODO"})
        this.setState({filtro6:""})
      }else{
        this.setState({nombre7:''})
        this.setState({filtro8:""})
        this.setState({filtro6:""})
      }
    }else{
      this.setState({filtro6:"SIN FILTRO"})
    }
    
      this.setState({datosLength:datos.length})
    }

    reporteImasivo = async (datos,filtro) =>{
      this.setState({botonDisabled:''})
      this.setState({botonResultados:''})
    this.setState({spinner:true})
    let array=[];
    let periodo;
    let totalEmpleados=[];
    datos.map(rows=>{
      periodo= rows.data[6]
      array.push(rows.data[0])
    })
    for(var i=0; i<=array.length;i++){
      console.log("este es el array en i" , array[i])
      // const url = 'http://localhost:8000/graphql'
     await  axios({
        url:  API,
        method:'post',
        data:{
        query:`
          query{
            getresultGlobalSurveyEEO(data:"${[array[i],periodo]}"){
            id 
            Respuestas 
            fk_preguntasEEO
            fk_Empleados 
            ponderacion
            nombre 
            ApellidoP 
            ApellidoM 
            Curp 
            RFC 
            FechaNacimiento 
            Sexo  
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
            fk_correos 
                }
              }
            `
        }
            }).then(datos => {    
            totalEmpleados.push(datos.data.data.getresultGlobalSurveyEEO)
          
            this.setState({reporteImasivo:totalEmpleados})
            })
            .catch(err => {
            });  
         }
         this.setState({spinner:false});
        
         let array3 = []
         let array4=array3.push(array3)
         
    if(filtro!= undefined){
      
      if(filtro[0].length>0){
       
        this.setState({nombre1:filtro[0][0]})
        this.setState({filtro1:"ID"})
        this.setState({filtro6:""})
      }else{
        this.setState({nombre1:''})
        this.setState({filtro1:""})
        this.setState({filtro6:""})
      }
      if(filtro[1].length>0){
        this.setState({nombre2:filtro[1][0]})
        this.setState({filtro2:"NOMBRE"})
        this.setState({filtro6:""})
      }else{
        this.setState({nombre2:''})
        this.setState({filtro2:""})
        this.setState({filtro6:""})
      }
      if(filtro[2].length>0){
        this.setState({nombre3:filtro[2][0]})
        this.setState({filtro3:"SEXO"})
        this.setState({filtro6:""})
      }else{
        this.setState({nombre3:''})
        this.setState({filtro3:""})
        this.setState({filtro6:""})
      }
      if(filtro[3].length>0){
        this.setState({nombre4:filtro[3][0]})
        this.setState({filtro4:"ÁREA DE TRABAJO"})
        this.setState({filtro6:""})
      }else{
        this.setState({nombre4:''})
        this.setState({filtro4:""})
        this.setState({filtro6:""})
      }if(filtro[4].length>0){
        this.setState({nombre5:filtro[4][0]})
        this.setState({filtro5:"PUESTO"})
        this.setState({filtro6:""})
      }else{
        this.setState({nombre5:''})
        this.setState({filtro5:""})
        this.setState({filtro6:""})
      }if(filtro[5].length>0){
        this.setState({nombre6:filtro[5][0]})
      this.setState({filtro7:"CENTRO DE TRABAJO"})
      this.setState({filtro6:""})
    }else{
      this.setState({nombre6:''})
      this.setState({filtro7:""})
      this.setState({filtro6:""})
    }if(filtro[6].length>0){
      this.setState({nombre7:filtro[6][0]})
      this.setState({filtro8:"PERIODO"})
      this.setState({filtro6:""})
    }else{
      this.setState({nombre7:''})
      this.setState({filtro8:""})
      this.setState({filtro6:""})
    }
  }else{
    this.setState({filtro6:"SIN FILTRO"})
  }
  
    this.setState({datosLength:datos.length})
  }

  
  reporteImasivoResultados = async (datos,filtro) =>{
    this.setState({botonDisabled:''})
    this.setState({botonResultados:''})
    this.setState({spinner:true})
    let array=[];
    let periodo;
    let resultadosEvaluacion=[];
    let resultadosQuery=[];

    let totalEmpleados=[];
    datos.map(rows=>{
      periodo= rows.data[6]
      array.push(rows.data[0])
    })
    for(var i=0; i<=array.length;i++){

         await axios({
          url:  API,
          method:'post',
          data:{
          query:`
          query{
          resultSingleSurveyEEO(data:"${[array[i],periodo]}"){
            id 
            Respuestas 
            fk_preguntasEEO
            fk_Empleados
            ponderacion
            nombre 
            ApellidoP 
            ApellidoM 
            Curp 
            RFC 
            FechaNacimiento 
            Sexo 
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
            fk_correos 
                }
              }
            `
        }
        }).then(datos => {     
          resultadosEvaluacion.push(datos.data.data.resultSingleSurveyEEO )
          this.setState({resultadosEvaluacionMasivo : resultadosEvaluacion})    
        })
        .catch(err => {
          console.log("el error es  ",err)
        });  

       await axios({
        url:  API,
        method:'post',
        data:{
        query:`
          query{
          resultSingleSurveyEEO(data:"${[array[i],periodo]}"){
            id 
            Respuestas 
            fk_preguntasEEO
            fk_Empleados
            ponderacion
            nombre 
            ApellidoP 
            ApellidoM 
            Curp 
            RFC 
            FechaNacimiento 
            Sexo 
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
            fk_correos 
                }
              }
            `
        }
        }).then(datos => {     
          resultadosQuery.push(datos.data.data.resultSingleSurveyEEO )
          this.setState({resultadosQueryMasivo : resultadosQuery})    
          setTimeout(() => {
            this.setState({spinner:false})            
          }, 5000);                  })
        .catch(err => {
          console.log("el error es  ",err.response)
        });  
         }
         let array3 = []
         let array4=array3.push(array3)
         this.setState({spinner:false});

    if(filtro!= undefined){
    if(filtro[0].length>0){
      this.setState({nombre1:filtro[0][0]})
      this.setState({filtro1:"ID"})
      this.setState({filtro6:""})
    }else{
      this.setState({nombre1:''})
      this.setState({filtro1:""})
      this.setState({filtro6:""})
    }
    if(filtro[1].length>0){
      this.setState({nombre2:filtro[1][0]})
      this.setState({filtro2:"NOMBRE"})
      this.setState({filtro6:""})
    }else{
      this.setState({nombre2:''})
      this.setState({filtro2:""})
      this.setState({filtro6:""})
    }
    if(filtro[2].length>0){
      this.setState({nombre3:filtro[2][0]})
      this.setState({filtro3:"SEXO"})
      this.setState({filtro6:""})
    }else{
      this.setState({nombre3:''})
      this.setState({filtro3:""})
      this.setState({filtro6:""})
    }
    if(filtro[3].length>0){
      this.setState({nombre4:filtro[3][0]})
      this.setState({filtro4:"ÁREA DE TRABAJO"})
      this.setState({filtro6:""})
    }else{
      this.setState({nombre4:''})
      this.setState({filtro4:""})
      this.setState({filtro6:""})
    }if(filtro[4].length>0){
      this.setState({nombre5:filtro[4][0]})
      this.setState({filtro5:"PUESTO"})
      this.setState({filtro6:""})
    }else{
      this.setState({nombre5:''})
      this.setState({filtro5:""})
      this.setState({filtro6:""})
    }if(filtro[5].length>0){
      this.setState({nombre6:filtro[5][0]})
      this.setState({filtro7:"CENTRO DE TRABAJO"})
      this.setState({filtro6:""})
    }else{
      this.setState({nombre6:''})
      this.setState({filtro7:""})
      this.setState({filtro6:""})
    }if(filtro[6].length>0){
      this.setState({nombre7:filtro[6][0]})
      this.setState({filtro8:"PERIODO"})
      this.setState({filtro6:""})
    }else{
      this.setState({nombre7:''})
      this.setState({filtro8:""})
      this.setState({filtro6:""})
    }
  }else{
    this.setState({filtro6:"SIN FILTRO"})
  }
   
    this.setState({datosLength:datos.length})
      }
    click(id,periodo){
        this.setState({botonDisabled:''})
        console.log("el id es " , id)
          // const url = 'http://localhost:8000/graphql'
          axios({
            url:  API,
            method:'post',
            data:{
            query:`
              query{
              resultSingleSurveyEEO(data:"${[id,periodo]}"){
                id 
                Respuestas 
                fk_preguntasEEO
                fk_Empleados
                nombre 
                ApellidoP 
                ApellidoM 
                Curp 
                RFC 
                FechaNacimiento 
                Sexo  
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
                fk_correos 
                    }
                  }
                `
            }
                }).then(datos => {               
                
                if(datos.data.data.resultSingleSurveyEEO.length > 0 ){
                  this.setState({resultados :datos.data.data.resultSingleSurveyEEO })                
                  console.log("resultados getsingle survey" ,this.state.resultados)
                  this.setState({getPonderacion:[]})
                } if(datos.data.data.resultSingleSurveyEEO.length <= 0){
                  DialogUtility.alert({
                    animationSettings: { effect: 'Zoom' },           
                    title: "Su colaborador aun no responde la evaluación",
                    // title: 'Aviso!',
                    position: "fixed"
                    });
                }
              })
                .catch(err => {
                  console.log("el error es  ",err)
                });  

              }          
          getEvaluacion(id,periodo){
            this.setState({botonDisabled:''})
            // const url = 'http://localhost:8000/graphql'
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
                query{
                resultSingleSurveyEEO(data:"${[id,periodo]}"){
                  id 
                  Respuestas 
                  fk_preguntasEEO
                  fk_Empleados
                  ponderacion
                  nombre 
                  ApellidoP 
                  ApellidoM 
                  Curp 
                  RFC 
                  FechaNacimiento 
                  Sexo  
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
                  fk_correos 
                      }
                    }
                  `
              }
                  }).then(datos => {   
                    console.log("el estado en resultadosEvaluacion" , datos.data.data.resultSingleSurveyEEO)
                    if(datos.data.data.resultSingleSurveyEEO.length > 0 ){
                      this.setState({resultadosEvaluacion:''})
                    this.setState({resultadosEvaluacion :datos.data.data.resultSingleSurveyEEO })                
                    this.setState({resultados:[]}) 
                    console.log("el estado en resultadosEvaluacion" , this.state.resultadosEvaluacion)
                  } if(datos.data.data.resultSingleSurveyEEO.length <= 0){
                    DialogUtility.alert({
                      animationSettings: { effect: 'Zoom' },           
                      title: "Su colaborador aun no responde la evaluación",
                      // title: 'Aviso!',
                      position: "fixed"
                      });
                  }
                })
                  .catch(err => {
                    console.log("el error es  ",err)
                  });  
  
                              
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
                query{
                resultSingleSurveyEEO(data:"${[id,periodo]}"){
                  id 
                  Respuestas 
                  fk_preguntasEEO
                  fk_Empleados
                  nombre 
                  ApellidoP 
                  ApellidoM 
                  Curp 
                  RFC 
                  FechaNacimiento 
                  Sexo 
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
                  fk_correos 
                      }
                    }
                  `
              }
                  }).then(datos => {    
                    console.log("datos recibidos" ,datos.data.data.resultSingleSurveyEEO )
                    this.setState({resultadosQuery:''})              
                    this.setState({resultadosQuery :datos.data.data.resultSingleSurveyEEO })                
        
                  })
                  .catch(err => {
                    console.log("el error es  ",err)
                  });  
                    }
  render() {
    let spinner;
    let a;
    
    if(this.state.spinner== true){
      spinner = <div><BotonReactstrap variant="warning" disabled>
      <Spinner
        as="span"
        outlined
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      
    </BotonReactstrap>{''}
    <BotonReactstrap variant="warning" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Generando reporte por favor espere...
    </BotonReactstrap>
    </div>
    }

    const columns = ["ID","Nombre", "Sexo",  "Area", "Puesto","Centro de Trabajo","Periodo",{name:" ",label:"Respuestas",options:{filter: false,sort: true,}},{name:" ",label:"Resultados",options:{filter: false,sort: true,}}];
    const data = this.state.empleados.map(rows=>{
        let botonRespuestas = <div><MDBBtn disabled={!this.state.botonResultados} color="danger"  onClick={(e) => this.click(rows.id,rows.periodo)}>Respuestas</MDBBtn></div>
      let botonResultados =  <div><Button  disabled={!this.state.botonResultados} color="secondary" onClick={(e) => this.getEvaluacion(rows.id,rows.periodo)}>Resultados</Button></div> 
      return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoP,rows.Sexo,rows.AreaTrabajo,rows.Puesto,rows.CentroTrabajo,rows.periodo,botonRespuestas,botonResultados])
    })

    let datosEmpleados;
    let filtro;
    const options = {
        filterType: "dropdown",
        responsive: "stacked", textLabels: {
          body: {
            noMatch: "Consultando información",
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
          }
      };
      let ponderacion;
      if(this.state.peticion1.length>0){
      let total;
    
      let array1=[], array2=[], array3=[], array4=[], array5=[], array6=[], array7=[], array8=[], array9=[], array10=[]      
      let array11=[], array12=[], array13=[], array14=[], array15=[], array16=[], array17=[], array18=[], array19=[], array20=[]      
      let array21=[], array22=[], array23=[], array24=[], array25=[], array26=[], array27=[], array28=[], array29=[], array30=[]      
      let array31=[], array32=[], array33=[], array34=[], array35=[], array36=[], array37=[], array38=[], array39=[], array40=[]      
      let array41=[], array42=[], array43=[], array44=[], array45=[], array46=[], array47=[], array48=[], array49=[], array50=[]      
      let array51=[], array52=[], array53=[], array54=[], array55=[], array56=[], array57=[], array58=[], array59=[], array60=[]      
      let array61=[], array62=[], array63=[], array64=[], array65=[], array66=[], array67=[], array68=[], array69=[], array70=[],array71=[],array72=[];

      var filtrar1 ;
      var array1Int;
      var arr1Int;
      var respuesta1;
        this.state.peticion1.map(rows=>{
        filtrar1 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO == 1;
        });
        array1.push(filtrar1)

        let valor1=[];    
        array1.map(rows=>{
          if(rows[0]){
            valor1.push(rows[0].ponderacion)
          } 
        })
        arr1Int = valor1.map(x => Number.parseInt(x, 10)); 
        respuesta1=0;
        arr1Int.forEach (function(numero){
          respuesta1 += numero;
        });
        }) 

        var filtrar2 ;
        var array2Int;
        var arr2Int;
        var respuesta2;
        this.state.peticion1.map(rows=>{
        filtrar2 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO == 2;
        });
        array2.push(filtrar2)

        let valor2=[];    
        array2.map(rows=>{
          if(rows[0]){
            valor2.push(rows[0].ponderacion)
          } 
        })
        arr2Int = valor2.map(x => Number.parseInt(x, 10)); 
        respuesta2=0;
        arr2Int.forEach (function(numero){
          respuesta2 += numero;
        });
        }) 
          var filtrar3 ;
          var array3Int;
          var arr3Int;
          var respuesta3;
          this.state.peticion1.map(rows=>{
          filtrar3 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 3;
          });
          array3.push(filtrar3)
  
          let valor3=[];    
          array3.map(rows=>{
            if(rows[0]){
              valor3.push(rows[0].ponderacion)
            } 
          })
          arr3Int = valor3.map(x => Number.parseInt(x, 10)); 
          respuesta3=0;
          arr3Int.forEach (function(numero){
            respuesta3 += numero;
          });
          }) 
          var filtrar4 ;
          var array4Int;
          var arr4Int;
          var respuesta4;
          this.state.peticion1.map(rows=>{
          filtrar4 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 4;
          });
          array4.push(filtrar4)
  
          let valor4=[];    
          array4.map(rows=>{
            if(rows[0]){
              valor4.push(rows[0].ponderacion)
            } 
          })
          arr4Int = valor4.map(x => Number.parseInt(x, 10)); 
          respuesta4=0;
          arr4Int.forEach (function(numero){
            respuesta4 += numero;
          });
          }) 
          var filtrar5 ;
          var array5Int;
          var arr5Int;
          var respuesta5;
          this.state.peticion1.map(rows=>{
          filtrar5 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 5;
          });
          array5.push(filtrar5)
          let valor5=[];    
          array5.map(rows=>{
            if(rows[0]){
              valor5.push(rows[0].ponderacion)
            } 
          })
          arr5Int = valor5.map(x => Number.parseInt(x, 10)); 
          respuesta5=0;
          arr5Int.forEach (function(numero){
            respuesta5 += numero;
          });
          }) 
          var filtrar6 ;
          var array6Int;
          var arr6Int;
          var respuesta6;
          this.state.peticion1.map(rows=>{
          filtrar6 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 6;
          });
          array6.push(filtrar6)
          let valor6=[];    
          array6.map(rows=>{
            if(rows[0]){
              valor6.push(rows[0].ponderacion)
            } 
          })
          arr6Int = valor6.map(x => Number.parseInt(x, 10)); 
          respuesta6=0;
          arr6Int.forEach (function(numero){
            respuesta6 += numero;
          });
          }) 
          var filtrar7 ;
          var array7Int;
          var arr7Int;
          var respuesta7;
          this.state.peticion1.map(rows=>{
          filtrar7 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 7;
          });
          array7.push(filtrar7)
          let valor7=[];    
          array7.map(rows=>{
            if(rows[0]){
              valor7.push(rows[0].ponderacion)
            } 
          })
          arr7Int = valor7.map(x => Number.parseInt(x, 10)); 
          respuesta7=0;
          arr7Int.forEach (function(numero){
            respuesta7 += numero;
          });
          })
          var filtrar8 ;
          var array8Int;
          var arr8Int;
          var respuesta8;
          this.state.peticion1.map(rows=>{
          filtrar8 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 8;
          });
          array8.push(filtrar8)
          let valor8=[];    
          array8.map(rows=>{
            if(rows[0]){
              valor8.push(rows[0].ponderacion)
            } 
          })
          arr8Int = valor8.map(x => Number.parseInt(x, 10)); 
          respuesta8=0;
          arr8Int.forEach (function(numero){
            respuesta8 += numero;
          });
          })
          var filtrar9 ;
          var array9Int;
          var arr9Int;
          var respuesta9;
          this.state.peticion1.map(rows=>{
          filtrar9 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 9;
          });
          array9.push(filtrar9)
          let valor9=[];    
          array9.map(rows=>{
            if(rows[0]){
              valor9.push(rows[0].ponderacion)
            } 
          })
          arr9Int = valor9.map(x => Number.parseInt(x, 10)); 
          respuesta9=0;
          arr9Int.forEach (function(numero){
            respuesta9 += numero;
          });
          })
          var filtrar10 ;
          var array10Int;
          var arr10Int;
          var respuesta10;
          this.state.peticion1.map(rows=>{
          filtrar10 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 10;
          });
          array10.push(filtrar10)
          let valor10=[];    
          array10.map(rows=>{
            if(rows[0]){
              valor10.push(rows[0].ponderacion)
            } 
          })
          arr10Int = valor10.map(x => Number.parseInt(x, 10)); 
          respuesta10=0;
          arr10Int.forEach (function(numero){
            respuesta10 += numero;
          });
          })
          var filtrar11 ;
          var array11Int;
          var arr11Int;
          var respuesta11;
          this.state.peticion1.map(rows=>{
          filtrar11 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 11;
          });
          array11.push(filtrar11)
          let valor11=[];    
          array11.map(rows=>{
            if(rows[0]){
              valor11.push(rows[0].ponderacion)
            } 
          })
          arr11Int = valor11.map(x => Number.parseInt(x, 10)); 
          respuesta11=0;
          arr11Int.forEach (function(numero){
            respuesta11 += numero;
          });
          })
         
          var filtrar12 ;
          var array12Int;
          var arr12Int;
          var respuesta12;
          this.state.peticion1.map(rows=>{
          filtrar12 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 12;
          });
          array12.push(filtrar12)
          let valor12=[];    
          array12.map(rows=>{
            if(rows[0]){
              valor12.push(rows[0].ponderacion)
            } 
          })
          arr12Int = valor12.map(x => Number.parseInt(x, 10)); 
          respuesta12=0;
          arr12Int.forEach (function(numero){
            respuesta12 += numero;
          });
          })
          var filtrar13 ;
          var array13Int;
          var arr13Int;
          var respuesta13;
          this.state.peticion1.map(rows=>{
          filtrar13 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 13;
          });
          array13.push(filtrar13)
          let valor13=[];    
          array13.map(rows=>{
            if(rows[0]){
              valor13.push(rows[0].ponderacion)
            } 
          })
          arr13Int = valor13.map(x => Number.parseInt(x, 10)); 
          respuesta13=0;
          arr13Int.forEach (function(numero){
            respuesta13 += numero;
          });
          })
          var filtrar14 ;
          var array14Int;
          var arr14Int;
          var respuesta14;
          this.state.peticion1.map(rows=>{
          filtrar14 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 14;
          });
          array14.push(filtrar14)
          let valor14=[];    
          array14.map(rows=>{
            if(rows[0]){
              valor14.push(rows[0].ponderacion)
            } 
          })
          arr14Int = valor14.map(x => Number.parseInt(x, 10)); 
          respuesta14=0;
          arr14Int.forEach (function(numero){
            respuesta14 += numero;
          });
          })
          var filtrar15 ;
          var array15Int;
          var arr15Int;
          var respuesta15;
          this.state.peticion1.map(rows=>{
          filtrar15 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 15;
          });
          array15.push(filtrar15)
          let valor15=[];    
          array15.map(rows=>{
            if(rows[0]){
              valor15.push(rows[0].ponderacion)
            } 
          })
          arr15Int = valor15.map(x => Number.parseInt(x, 10)); 
          respuesta15=0;
          arr15Int.forEach (function(numero){
            respuesta15 += numero;
          });
          })
          var filtrar16 ;
          var array16Int;
          var arr16Int;
          var respuesta16;
          this.state.peticion1.map(rows=>{
          filtrar16 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 16;
          });
          array16.push(filtrar16)
          let valor16=[];    
          array16.map(rows=>{
            if(rows[0]){
              valor16.push(rows[0].ponderacion)
            } 
          })
          arr16Int = valor16.map(x => Number.parseInt(x, 10)); 
          respuesta16=0;
          arr16Int.forEach (function(numero){
            respuesta16 += numero;
          });
          })
          var filtrar17 ;
          var array17Int;
          var arr17Int;
          var respuesta17;
          this.state.peticion1.map(rows=>{
          filtrar17 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 17;
          });
          array17.push(filtrar17)
          let valor17=[];    
          array17.map(rows=>{
            if(rows[0]){
              valor17.push(rows[0].ponderacion)
            } 
          })
          arr17Int = valor17.map(x => Number.parseInt(x, 10)); 
          respuesta17=0;
          arr17Int.forEach (function(numero){
            respuesta17 += numero;
          });
          })
          var filtrar18 ;
          var array18Int;
          var arr18Int;
          var respuesta18;
          this.state.peticion1.map(rows=>{
          filtrar18 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 18;
          });
          array18.push(filtrar18)
          let valor18=[];    
          array18.map(rows=>{
            if(rows[0]){
              valor18.push(rows[0].ponderacion)
            } 
          })
          arr18Int = valor18.map(x => Number.parseInt(x, 10)); 
          respuesta18=0;
          arr18Int.forEach (function(numero){
            respuesta18 += numero;
          });
          })
          var filtrar19 ;
          var array19Int;
          var arr19Int;
          var respuesta19;
          this.state.peticion1.map(rows=>{
          filtrar19 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 19;
          });
          array19.push(filtrar19)
          let valor19=[];    
          array19.map(rows=>{
            if(rows[0]){
              valor19.push(rows[0].ponderacion)
            } 
          })
          arr19Int = valor19.map(x => Number.parseInt(x, 10)); 
          respuesta19=0;
          arr19Int.forEach (function(numero){
            respuesta19 += numero;
          });
          })
          var filtrar20 ;
          var array20Int;
          var arr20Int;
          var respuesta20;
          this.state.peticion1.map(rows=>{
          filtrar20 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 20;
          });
          array20.push(filtrar20)
          let valor20=[];    
          array20.map(rows=>{
            if(rows[0]){
              valor20.push(rows[0].ponderacion)
            } 
          })
          arr20Int = valor20.map(x => Number.parseInt(x, 10)); 
          respuesta20=0;
          arr20Int.forEach (function(numero){
            respuesta20 += numero;
          });
          })
          var filtrar21 ;
          var array21Int;
          var arr21Int;
          var respuesta21;
          this.state.peticion1.map(rows=>{
          filtrar21 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 21;
          });
          array21.push(filtrar21)
          let valor21=[];    
          array21.map(rows=>{
            if(rows[0]){
              valor21.push(rows[0].ponderacion)
            } 
          })
          arr21Int = valor21.map(x => Number.parseInt(x, 10)); 
          respuesta21=0;
          arr21Int.forEach (function(numero){
            respuesta21 += numero;
          });
          })
          var filtrar22 ;
          var array22Int;
          var arr22Int;
          var respuesta22;
          this.state.peticion1.map(rows=>{
          filtrar22 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 22;
          });
          array22.push(filtrar22)
          let valor22=[];    
          array22.map(rows=>{
            if(rows[0]){
              valor22.push(rows[0].ponderacion)
            } 
          })
          arr22Int = valor22.map(x => Number.parseInt(x, 10)); 
          respuesta22=0;
          arr22Int.forEach (function(numero){
            respuesta22 += numero;
          });
          })
          var filtrar23 ;
          var array23Int;
          var arr23Int;
          var respuesta23;
          this.state.peticion1.map(rows=>{
          filtrar23 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 23;
          });
          array23.push(filtrar23)
          let valor23=[];    
          array23.map(rows=>{
            if(rows[0]){
              valor23.push(rows[0].ponderacion)
            } 
          })
          arr23Int = valor23.map(x => Number.parseInt(x, 10)); 
          respuesta23=0;
          arr23Int.forEach (function(numero){
            respuesta23 += numero;
          });
          })
          var filtrar24 ;
          var array24Int;
          var arr24Int;
          var respuesta24;
          this.state.peticion1.map(rows=>{
          filtrar24 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 24;
          });
          array24.push(filtrar24)
          let valor24=[];    
          array24.map(rows=>{
            if(rows[0]){
              valor24.push(rows[0].ponderacion)
            } 
          })
          arr24Int = valor24.map(x => Number.parseInt(x, 10)); 
          respuesta24=0;
          arr24Int.forEach (function(numero){
            respuesta24 += numero;
          });
          })
          var filtrar25 ;
          var array25Int;
          var arr25Int;
          var respuesta25;
          this.state.peticion1.map(rows=>{
          filtrar25 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 25;
          });
          array25.push(filtrar25)
          let valor25=[];    
          array25.map(rows=>{
            if(rows[0]){
              valor25.push(rows[0].ponderacion)
            } 
          })
          arr25Int = valor25.map(x => Number.parseInt(x, 10)); 
          respuesta25=0;
          arr25Int.forEach (function(numero){
            respuesta25 += numero;
          });
          })
          var filtrar26 ;
          var array26Int;
          var arr26Int;
          var respuesta26;
          this.state.peticion1.map(rows=>{
          filtrar26 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 26;
          });
          array26.push(filtrar26)
          let valor26=[];    
          array26.map(rows=>{
            if(rows[0]){
              valor26.push(rows[0].ponderacion)
            } 
          })
          arr26Int = valor26.map(x => Number.parseInt(x, 10)); 
          respuesta26=0;
          arr26Int.forEach (function(numero){
            respuesta26 += numero;
          });
          })
          var filtrar27 ;
          var array27Int;
          var arr27Int;
          var respuesta27;
          this.state.peticion1.map(rows=>{
          filtrar27 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 27;
          });
          array27.push(filtrar27)
          let valor27=[];    
          array27.map(rows=>{
            if(rows[0]){
              valor27.push(rows[0].ponderacion)
            } 
          })
          arr27Int = valor27.map(x => Number.parseInt(x, 10)); 
          respuesta27=0;
          arr27Int.forEach (function(numero){
            respuesta27 += numero;
          });
          })
          var filtrar28 ;
          var array28Int;
          var arr28Int;
          var respuesta28;
          this.state.peticion1.map(rows=>{
          filtrar28 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 28;
          });
          array28.push(filtrar28)
          let valor28=[];    
          array28.map(rows=>{
            if(rows[0]){
              valor28.push(rows[0].ponderacion)
            } 
          })
          arr28Int = valor28.map(x => Number.parseInt(x, 10)); 
          respuesta28=0;
          arr28Int.forEach (function(numero){
            respuesta28 += numero;
          });
          })
          var filtrar29 ;
          var array29Int;
          var arr29Int;
          var respuesta29;
          this.state.peticion1.map(rows=>{
          filtrar29 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 29;
          });
          array29.push(filtrar29)
          let valor29=[];    
          array29.map(rows=>{
            if(rows[0]){
              valor29.push(rows[0].ponderacion)
            } 
          })
          arr29Int = valor29.map(x => Number.parseInt(x, 10)); 
          respuesta29=0;
          arr29Int.forEach (function(numero){
            respuesta29 += numero;
          });
          })
          var filtrar30 ;
          var array30Int;
          var arr30Int;
          var respuesta30;
          this.state.peticion1.map(rows=>{
          filtrar30 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 30;
          });
          array30.push(filtrar30)
          let valor30=[];    
          array30.map(rows=>{
            if(rows[0]){
              valor30.push(rows[0].ponderacion)
            } 
          })
          arr30Int = valor30.map(x => Number.parseInt(x, 10)); 
          respuesta30=0;
          arr30Int.forEach (function(numero){
            respuesta30 += numero;
          });
          })
          var filtrar31 ;
          var array31Int;
          var arr31Int;
          var respuesta31;
          this.state.peticion1.map(rows=>{
          filtrar31 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 31;
          });
          array31.push(filtrar31)
          let valor31=[];    
          array31.map(rows=>{
            if(rows[0]){
              valor31.push(rows[0].ponderacion)
            } 
          })
          arr31Int = valor31.map(x => Number.parseInt(x, 10)); 
          respuesta31=0;
          arr31Int.forEach (function(numero){
            respuesta31 += numero;
          });
          })
          var filtrar32 ;
          var array32Int;
          var arr32Int;
          var respuesta32;
          this.state.peticion1.map(rows=>{
          filtrar32 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 32;
          });
          array32.push(filtrar32)
          let valor32=[];    
          array32.map(rows=>{
            if(rows[0]){
              valor32.push(rows[0].ponderacion)
            } 
          })
          arr32Int = valor32.map(x => Number.parseInt(x, 10)); 
          respuesta32=0;
          arr32Int.forEach (function(numero){
            respuesta32 += numero;
          });
          })
          var filtrar33 ;
          var array33Int;
          var arr33Int;
          var respuesta33;
          this.state.peticion1.map(rows=>{
          filtrar33 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 33;
          });
          array33.push(filtrar33)
          let valor33=[];    
          array33.map(rows=>{
            if(rows[0]){
              valor33.push(rows[0].ponderacion)
            } 
          })
          arr33Int = valor33.map(x => Number.parseInt(x, 10)); 
          respuesta33=0;
          arr33Int.forEach (function(numero){
            respuesta33 += numero;
          });
          })
          var filtrar34 ;
          var array34Int;
          var arr34Int;
          var respuesta34;
          this.state.peticion1.map(rows=>{
          filtrar34 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 34;
          });
          array34.push(filtrar34)
          let valor34=[];    
          array34.map(rows=>{
            if(rows[0]){
              valor34.push(rows[0].ponderacion)
            } 
          })
          arr34Int = valor34.map(x => Number.parseInt(x, 10)); 
          respuesta34=0;
          arr34Int.forEach (function(numero){
            respuesta34 += numero;
          });
          })
          var filtrar35 ;
          var array35Int;
          var arr35Int;
          var respuesta35;
          this.state.peticion1.map(rows=>{
          filtrar35 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 35;
          });
          array35.push(filtrar35)
          let valor35=[];    
          array35.map(rows=>{
            if(rows[0]){
              valor35.push(rows[0].ponderacion)
            } 
          })
          arr35Int = valor35.map(x => Number.parseInt(x, 10)); 
          respuesta35=0;
          arr35Int.forEach (function(numero){
            respuesta35 += numero;
          });
          })
          var filtrar36 ;
          var array36Int;
          var arr36Int;
          var respuesta36;
          this.state.peticion1.map(rows=>{
          filtrar36 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 36;
          });
          array36.push(filtrar36)
          let valor36=[];    
          array36.map(rows=>{
            if(rows[0]){
              valor36.push(rows[0].ponderacion)
            } 
          })
          arr36Int = valor36.map(x => Number.parseInt(x, 10)); 
          respuesta36=0;
          arr36Int.forEach (function(numero){
            respuesta36 += numero;
          });
          })
          var filtrar37 ;
          var array37Int;
          var arr37Int;
          var respuesta37;
          this.state.peticion1.map(rows=>{
          filtrar37 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 37;
          });
          array37.push(filtrar37)
          let valor37=[];    
          array37.map(rows=>{
            if(rows[0]){
              valor37.push(rows[0].ponderacion)
            } 
          })
          arr37Int = valor37.map(x => Number.parseInt(x, 10)); 
          respuesta37=0;
          arr37Int.forEach (function(numero){
            respuesta37 += numero;
          });
          })
          var filtrar38 ;
          var array38Int;
          var arr38Int;
          var respuesta38;
          this.state.peticion1.map(rows=>{
          filtrar38 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 38;
          });
          array38.push(filtrar38)
          let valor38=[];    
          array38.map(rows=>{
            if(rows[0]){
              valor38.push(rows[0].ponderacion)
            } 
          })
          arr38Int = valor38.map(x => Number.parseInt(x, 10)); 
          respuesta38=0;
          arr38Int.forEach (function(numero){
            respuesta38 += numero;
          });
          })
          var filtrar39 ;
          var array39Int;
          var arr39Int;
          var respuesta39;
          this.state.peticion1.map(rows=>{
          filtrar39 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 39;
          });
          array39.push(filtrar39)
          let valor39=[];    
          array39.map(rows=>{
            if(rows[0]){
              valor39.push(rows[0].ponderacion)
            } 
          })
          arr39Int = valor39.map(x => Number.parseInt(x, 10)); 
          respuesta39=0;
          arr39Int.forEach (function(numero){
            respuesta39 += numero;
          });
          })
          var filtrar40 ;
          var array40Int;
          var arr40Int;
          var respuesta40;
          this.state.peticion1.map(rows=>{
          filtrar40 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 40;
          });
          array40.push(filtrar40)
          let valor40=[];    
          array40.map(rows=>{
            if(rows[0]){
              valor40.push(rows[0].ponderacion)
            } 
          })
          arr40Int = valor40.map(x => Number.parseInt(x, 10)); 
          respuesta40=0;
          arr40Int.forEach (function(numero){
            respuesta40 += numero;
          });
          })
          var filtrar41 ;
          var array41Int;
          var arr41Int;
          var respuesta41;
          this.state.peticion1.map(rows=>{
          filtrar41 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 41;
          });
          array41.push(filtrar41)
          let valor41=[];    
          array41.map(rows=>{
            if(rows[0]){
              valor41.push(rows[0].ponderacion)
            } 
          })
          arr41Int = valor41.map(x => Number.parseInt(x, 10)); 
          respuesta41=0;
          arr41Int.forEach (function(numero){
            respuesta41 += numero;
          });
          })
          var filtrar42 ;
          var array42Int;
          var arr42Int;
          var respuesta42;
          this.state.peticion1.map(rows=>{
          filtrar42 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 42;
          });
          array42.push(filtrar42)
          let valor42=[];    
          array42.map(rows=>{
            if(rows[0]){
              valor42.push(rows[0].ponderacion)
            } 
          })
          arr42Int = valor42.map(x => Number.parseInt(x, 10)); 
          respuesta42=0;
          arr42Int.forEach (function(numero){
            respuesta42 += numero;
          });
          })
          var filtrar43 ;
          var array43Int;
          var arr43Int;
          var respuesta43;
          this.state.peticion1.map(rows=>{
          filtrar43 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 43;
          });
          array43.push(filtrar43)
          let valor43=[];    
          array43.map(rows=>{
            if(rows[0]){
              valor43.push(rows[0].ponderacion)
            } 
          })
          arr43Int = valor43.map(x => Number.parseInt(x, 10)); 
          respuesta43=0;
          arr43Int.forEach (function(numero){
            respuesta43 += numero;
          });
          })
          var filtrar44 ;
          var array44Int;
          var arr44Int;
          var respuesta44;
          this.state.peticion1.map(rows=>{
          filtrar44 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 44;
          });
          array44.push(filtrar44)
          let valor44=[];    
          array44.map(rows=>{
            if(rows[0]){
              valor44.push(rows[0].ponderacion)
            } 
          })
          arr44Int = valor44.map(x => Number.parseInt(x, 10)); 
          respuesta44=0;
          arr44Int.forEach (function(numero){
            respuesta44 += numero;
          });
          })
          var filtrar45 ;
          var array45Int;
          var arr45Int;
          var respuesta45;
          this.state.peticion1.map(rows=>{
          filtrar45 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 45;
          });
          array45.push(filtrar45)
          let valor45=[];    
          array45.map(rows=>{
            if(rows[0]){
              valor45.push(rows[0].ponderacion)
            } 
          })
          arr45Int = valor45.map(x => Number.parseInt(x, 10)); 
          respuesta45=0;
          arr45Int.forEach (function(numero){
            respuesta45 += numero;
          });
          })
          var filtrar46 ;
          var array46Int;
          var arr46Int;
          var respuesta46;
          this.state.peticion1.map(rows=>{
          filtrar46 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 46;
          });
          array46.push(filtrar46)
          let valor46=[];    
          array46.map(rows=>{
            if(rows[0]){
              valor46.push(rows[0].ponderacion)
            } 
          })
          arr46Int = valor46.map(x => Number.parseInt(x, 10)); 
          respuesta46=0;
          arr46Int.forEach (function(numero){
            respuesta46 += numero;
          });
          })
          var filtrar47 ;
          var array47Int;
          var arr47Int;
          var respuesta47;
          this.state.peticion1.map(rows=>{
          filtrar47 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 47;
          });
          array47.push(filtrar47)
          let valor47=[];    
          array47.map(rows=>{
            if(rows[0]){
              valor47.push(rows[0].ponderacion)
            } 
          })
          arr47Int = valor47.map(x => Number.parseInt(x, 10)); 
          respuesta47=0;
          arr47Int.forEach (function(numero){
            respuesta47 += numero;
          });
          })
          var filtrar48 ;
          var array48Int;
          var arr48Int;
          var respuesta48;
          this.state.peticion1.map(rows=>{
          filtrar48 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 48;
          });
          array48.push(filtrar48)
          let valor48=[];    
          array48.map(rows=>{
            if(rows[0]){
              valor48.push(rows[0].ponderacion)
            } 
          })
          arr48Int = valor48.map(x => Number.parseInt(x, 10)); 
          respuesta48=0;
          arr48Int.forEach (function(numero){
            respuesta48 += numero;
          });
          })
          var filtrar49 ;
          var array49Int;
          var arr49Int;
          var respuesta49;
          this.state.peticion1.map(rows=>{
          filtrar49 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 49;
          });
          array49.push(filtrar49)
          let valor49=[];    
          array49.map(rows=>{
            if(rows[0]){
              valor49.push(rows[0].ponderacion)
            } 
          })
          arr49Int = valor49.map(x => Number.parseInt(x, 10)); 
          respuesta49=0;
          arr49Int.forEach (function(numero){
            respuesta49 += numero;
          });
          })
          var filtrar50 ;
          var array50Int;
          var arr50Int;
          var respuesta50;
          this.state.peticion1.map(rows=>{
          filtrar50 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 50;
          });
          array50.push(filtrar50)
          let valor50=[];    
          array50.map(rows=>{
            if(rows[0]){
              valor50.push(rows[0].ponderacion)
            } 
          })
          arr50Int = valor50.map(x => Number.parseInt(x, 10)); 
          respuesta50=0;
          arr50Int.forEach (function(numero){
            respuesta50 += numero;
          });
          })
          var filtrar51 ;
          var array51Int;
          var arr51Int;
          var respuesta51;
          this.state.peticion1.map(rows=>{
          filtrar51 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 51;
          });
          array51.push(filtrar51)
          let valor51=[];    
          array51.map(rows=>{
            if(rows[0]){
              valor51.push(rows[0].ponderacion)
            } 
          })
          arr51Int = valor51.map(x => Number.parseInt(x, 10)); 
          respuesta51=0;
          arr51Int.forEach (function(numero){
            respuesta51 += numero;
          });
          })
          var filtrar52 ;
          var array52Int;
          var arr52Int;
          var respuesta52;
          this.state.peticion1.map(rows=>{
          filtrar52 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 52;
          });
          array52.push(filtrar52)
          let valor52=[];    
          array52.map(rows=>{
            if(rows[0]){
              valor52.push(rows[0].ponderacion)
            } 
          })
          arr52Int = valor52.map(x => Number.parseInt(x, 10)); 
          respuesta52=0;
          arr52Int.forEach (function(numero){
            respuesta52 += numero;
          });
          })
          var filtrar53 ;
          var array53Int;
          var arr53Int;
          var respuesta53;
          this.state.peticion1.map(rows=>{
          filtrar53 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 53;
          });
          array53.push(filtrar53)
          let valor53=[];    
          array53.map(rows=>{
            if(rows[0]){
              valor53.push(rows[0].ponderacion)
            } 
          })
          arr53Int = valor53.map(x => Number.parseInt(x, 10)); 
          respuesta53=0;
          arr53Int.forEach (function(numero){
            respuesta53 += numero;
          });
          })
          var filtrar54 ;
          var array54Int;
          var arr54Int;
          var respuesta54;
          this.state.peticion1.map(rows=>{
          filtrar54 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 54;
          });
          array54.push(filtrar54)
          let valor54=[];    
          array54.map(rows=>{
            if(rows[0]){
              valor54.push(rows[0].ponderacion)
            } 
          })
          arr54Int = valor54.map(x => Number.parseInt(x, 10)); 
          respuesta54=0;
          arr54Int.forEach (function(numero){
            respuesta54 += numero;
          });
          })
          var filtrar55 ;
          var array55Int;
          var arr55Int;
          var respuesta55;
          this.state.peticion1.map(rows=>{
          filtrar55 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 55;
          });
          array55.push(filtrar55)
          let valor55=[];    
          array55.map(rows=>{
            if(rows[0]){
              valor55.push(rows[0].ponderacion)
            } 
          })
          arr55Int = valor55.map(x => Number.parseInt(x, 10)); 
          respuesta55=0;
          arr55Int.forEach (function(numero){
            respuesta55 += numero;
          });
          })
          var filtrar56 ;
          var array56Int;
          var arr56Int;
          var respuesta56;
          this.state.peticion1.map(rows=>{
          filtrar56 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 56;
          });
          array56.push(filtrar56)
          let valor56=[];    
          array56.map(rows=>{
            if(rows[0]){
              valor56.push(rows[0].ponderacion)
            } 
          })
          arr56Int = valor56.map(x => Number.parseInt(x, 10)); 
          respuesta56=0;
          arr56Int.forEach (function(numero){
            respuesta56 += numero;
          });
          })
          var filtrar57 ;
          var array57Int;
          var arr57Int;
          var respuesta57;
          this.state.peticion1.map(rows=>{
          filtrar57 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 57;
          });
          array57.push(filtrar57)
          let valor57=[];    
          array57.map(rows=>{
            if(rows[0]){
              valor57.push(rows[0].ponderacion)
            } 
          })
          arr57Int = valor57.map(x => Number.parseInt(x, 10)); 
          respuesta57=0;
          arr57Int.forEach (function(numero){
            respuesta57 += numero;
          });
          })
          var filtrar58 ;
          var array58Int;
          var arr58Int;
          var respuesta58;
          this.state.peticion1.map(rows=>{
          filtrar58 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 58;
          });
          array58.push(filtrar58)
          let valor58=[];    
          array58.map(rows=>{
            if(rows[0]){
              valor58.push(rows[0].ponderacion)
            } 
          })
          arr58Int = valor58.map(x => Number.parseInt(x, 10)); 
          respuesta58=0;
          arr58Int.forEach (function(numero){
            respuesta58 += numero;
          });
          })
          var filtrar59 ;
          var array59Int;
          var arr59Int;
          var respuesta59;
          this.state.peticion1.map(rows=>{
          filtrar59 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 59;
          });
          array59.push(filtrar59)
          let valor59=[];    
          array59.map(rows=>{
            if(rows[0]){
              valor59.push(rows[0].ponderacion)
            } 
          })
          arr59Int = valor59.map(x => Number.parseInt(x, 10)); 
          respuesta59=0;
          arr59Int.forEach (function(numero){
            respuesta59 += numero;
          });
          })
          var filtrar60 ;
          var array60Int;
          var arr60Int;
          var respuesta60;
          this.state.peticion1.map(rows=>{
          filtrar60 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 60;
          });
          array60.push(filtrar60)
          let valor60=[];    
          array60.map(rows=>{
            if(rows[0]){
              valor60.push(rows[0].ponderacion)
            } 
          })
          arr60Int = valor60.map(x => Number.parseInt(x, 10)); 
          respuesta60=0;
          arr60Int.forEach (function(numero){
            respuesta60 += numero;
          });
          })
          var filtrar61 ;
          var array61Int;
          var arr61Int;
          var respuesta61;
          this.state.peticion1.map(rows=>{
          filtrar61 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 61;
          });
          array61.push(filtrar61)
          let valor61=[];    
          array61.map(rows=>{
            if(rows[0]){
              valor61.push(rows[0].ponderacion)
            } 
          })
          arr61Int = valor61.map(x => Number.parseInt(x, 10)); 
          respuesta61=0;
          arr61Int.forEach (function(numero){
            respuesta61 += numero;
          });
          })
          var filtrar62 ;
          var array62Int;
          var arr62Int;
          var respuesta62;
          this.state.peticion1.map(rows=>{
          filtrar62 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 62;
          });
          array62.push(filtrar62)
          let valor62=[];    
          array62.map(rows=>{
            if(rows[0]){
              valor62.push(rows[0].ponderacion)
            } 
          })
          arr62Int = valor62.map(x => Number.parseInt(x, 10)); 
          respuesta62=0;
          arr62Int.forEach (function(numero){
            respuesta62 += numero;
          });
          })
          var filtrar63 ;
          var array63Int;
          var arr63Int;
          var respuesta63;
          this.state.peticion1.map(rows=>{
          filtrar63 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 63;
          });
          array63.push(filtrar63)
          let valor63=[];    
          array63.map(rows=>{
            if(rows[0]){
              valor63.push(rows[0].ponderacion)
            } 
          })
          arr63Int = valor63.map(x => Number.parseInt(x, 10)); 
          respuesta63=0;
          arr63Int.forEach (function(numero){
            respuesta63 += numero;
          });
          })
          var filtrar64 ;
          var array64Int;
          var arr64Int;
          var respuesta64;
          this.state.peticion1.map(rows=>{
          filtrar64 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 64;
          });
          array64.push(filtrar64)
          let valor64=[];    
          array64.map(rows=>{
            if(rows[0]){
              valor64.push(rows[0].ponderacion)
            } 
          })
          arr64Int = valor64.map(x => Number.parseInt(x, 10)); 
          respuesta64=0;
          arr64Int.forEach (function(numero){
            respuesta64 += numero;
          });
          })
          var filtrar65 ;
          var array65Int;
          var arr65Int;
          var respuesta65;
          this.state.peticion1.map(rows=>{
          filtrar65 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 65;
          });
          array65.push(filtrar65)
          let valor65=[];    
          array65.map(rows=>{
            if(rows[0]){
              valor65.push(rows[0].ponderacion)
            } 
          })
          arr65Int = valor65.map(x => Number.parseInt(x, 10)); 
          respuesta65=0;
          arr65Int.forEach (function(numero){
            respuesta65 += numero;
          });
          })
          var filtrar66 ;
          var array66Int;
          var arr66Int;
          var respuesta66;
          this.state.peticion1.map(rows=>{
          filtrar66 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 66;
          });
          array66.push(filtrar66)
          let valor66=[];    
          array66.map(rows=>{
            if(rows[0]){
              valor66.push(rows[0].ponderacion)
            } 
          })
          arr66Int = valor66.map(x => Number.parseInt(x, 10)); 
          respuesta66=0;
          arr66Int.forEach (function(numero){
            respuesta66 += numero;
          });
          })
          var filtrar67 ;
          var array67Int;
          var arr67Int;
          var respuesta67;
          this.state.peticion1.map(rows=>{
          filtrar67 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 67;
          });
          array67.push(filtrar67)
          let valor67=[];    
          array67.map(rows=>{
            if(rows[0]){
              valor67.push(rows[0].ponderacion)
            } 
          })
          arr67Int = valor67.map(x => Number.parseInt(x, 10)); 
          respuesta67=0;
          arr67Int.forEach (function(numero){
            respuesta67 += numero;
          });
          })
          var filtrar68 ;
          var array68Int;
          var arr68Int;
          var respuesta68;
          this.state.peticion1.map(rows=>{
          filtrar68 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 68;
          });
          array68.push(filtrar68)
          let valor68=[];    
          array68.map(rows=>{
            if(rows[0]){
              valor68.push(rows[0].ponderacion)
            } 
          })
          arr68Int = valor68.map(x => Number.parseInt(x, 10)); 
          respuesta68=0;
          arr68Int.forEach (function(numero){
            respuesta68 += numero;
          });
          })
          var filtrar69 ;
          var array69Int;
          var arr69Int;
          var respuesta69;
          this.state.peticion1.map(rows=>{
          filtrar69 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 69;
          });
          array69.push(filtrar69)
          let valor69=[];    
          array69.map(rows=>{
            if(rows[0]){
              valor69.push(rows[0].ponderacion)
            } 
          })
          arr69Int = valor69.map(x => Number.parseInt(x, 10)); 
          respuesta69=0;
          arr69Int.forEach (function(numero){
            respuesta69 += numero;
          });
          })
          var filtrar70 ;
          var array70Int;
          var arr70Int;
          var respuesta70;
          this.state.peticion1.map(rows=>{
          filtrar70 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 70;
          });
          array70.push(filtrar70)
          let valor70=[];    
          array70.map(rows=>{
            if(rows[0]){
              valor70.push(rows[0].ponderacion)
            } 
          })
          arr70Int = valor70.map(x => Number.parseInt(x, 10)); 
          respuesta70=0;
          arr70Int.forEach (function(numero){
            respuesta70 += numero;
          });
          })
          var filtrar71 ;
          var array71Int;
          var arr71Int;
          var respuesta71;
          this.state.peticion1.map(rows=>{
          filtrar71 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 71;
          });
          array71.push(filtrar71)
          let valor71=[];    
          array71.map(rows=>{
            if(rows[0]){
              valor71.push(rows[0].ponderacion)
            } 
          })
          arr71Int = valor71.map(x => Number.parseInt(x, 10)); 
          respuesta71=0;
          arr71Int.forEach (function(numero){
            respuesta71 += numero;
          });
          })
          var filtrar72 ;
          var array72Int;
          var arr72Int;
          var respuesta72;
          this.state.peticion1.map(rows=>{
          filtrar72 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 72;
          });
          array72.push(filtrar72)
          let valor72=[];    
          array72.map(rows=>{
            if(rows[0]){
              valor72.push(rows[0].ponderacion)
            } 
          })
          arr72Int = valor72.map(x => Number.parseInt(x, 10)); 
          respuesta72=0;
          arr72Int.forEach (function(numero){
            respuesta72 += numero;
          });
          })
 total =(respuesta1+respuesta2+respuesta3+respuesta4+respuesta5+respuesta6+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta12+respuesta13+respuesta14+respuesta15+respuesta16+respuesta17+respuesta18+respuesta19+respuesta20
  +respuesta21+respuesta22+respuesta23+respuesta24+respuesta25+respuesta26+respuesta27+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40
  +respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52+respuesta53+respuesta54+respuesta55+respuesta56+respuesta57+respuesta58+respuesta59+respuesta60
  +respuesta61+respuesta62+respuesta63+respuesta64+respuesta65+respuesta66+respuesta67+respuesta68+respuesta69+respuesta70+respuesta71+respuesta72)          
 
  let length =this.state.peticion1.length-1;
  let general =total/length.toFixed(2);

let celda;
let criterios;

let celdaPrev;
let criteriosPrev;

if(general<50){
celda = <TableCell width="10%"  style={{backgroundColor: "#9BE0F7"}} className="text-center"><font size="1" face="arial"color="black" align="justify">NULO O DESPRECIABLE</font></TableCell>
celdaPrev = <TableCell width="10%"  style={{backgroundColor: "#9BE0F7"}} className="text-center"><font size="3" face="arial"color="black" align="justify">NULO O DESPRECIABLE</font></TableCell>

criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align="justify">El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</font></TableCell>
criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="3" face="arial"color="black" align="justify">El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</font></TableCell>

}else if(general>=50 && general < 75){
  celda = <TableCell width="10%" style={{backgroundColor: "#6BF56E"}}  className="text-center"><font size="1" face="arial"color="black" align="justify">BAJO</font></TableCell>
  celdaPrev = <TableCell width="10%" style={{backgroundColor: "#6BF56E"}}  className="text-center"><font size="3" face="arial"color="black" align="justify">BAJO</font></TableCell>

  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align="justify">Es necesario una mayor difusión de la política de prevención de riesgos
  psicosociales y programas para: la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral.</font></TableCell>
  
  criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="3" face="arial"color="black" align="justify">Es necesario una mayor difusión de la política de prevención de riesgos
  psicosociales y programas para: la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral.</font></TableCell>
}else if(general>=75 && general < 99){
  celda = <TableCell width="10%"  style={{backgroundColor: "#FFFF00"}}  className="text-center"><font size="1" face="arial"color="black" align="justify">MEDIO</font></TableCell>
  celdaPrev = <TableCell width="10%"  style={{backgroundColor: "#FFFF00"}}  className="text-center"><font size="3" face="arial"color="black" align="justify">MEDIO</font></TableCell>

  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align="justify">Se requiere revisar la política de prevención de riesgos psicosociales y
  programas para la prevención de los factores de riesgo psicosocial, la
  promoción de un entorno organizacional favorable y la prevención de la
  violencia laboral, así como reforzar su aplicación y difusión, mediante un
  Programa de intervención.</font></TableCell>
  criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="3" face="arial"color="black" align="justify">Se requiere revisar la política de prevención de riesgos psicosociales y
  programas para la prevención de los factores de riesgo psicosocial, la
  promoción de un entorno organizacional favorable y la prevención de la
  violencia laboral, así como reforzar su aplicación y difusión, mediante un
  Programa de intervención.</font></TableCell>

}else if(general>=99 && general < 140){
 celda = <TableCell  width="10%" style={{backgroundColor: "#FFC000"}} className="text-center" ><font size="1" face="arial"color="black" align="justify">ALTO</font></TableCell>
 celdaPrev = <TableCell  width="10%" style={{backgroundColor: "#FFC000"}} className="text-center" ><font size="3" face="arial"color="black" align="justify">ALTO</font></TableCell>

 criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align="justify">Se requiere realizar un análisis de cada categoría y dominio, de manera que
 se puedan determinar las acciones de intervención apropiadas a través de un
 Programa de intervención, que podrá incluir una evaluación específica y
 deberá incluir una campaña de sensibilización, revisar la política de
 prevención de riesgos psicosociales y programas para la prevención de los
 factores de riesgo psicosocial, la promoción de un entorno organizacional
 favorable y la prevención de la violencia laboral, así como reforzar su
 aplicación y difusión.</font></TableCell>
 
 criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="3" face="arial"color="black" align="justify">Se requiere realizar un análisis de cada categoría y dominio, de manera que
 se puedan determinar las acciones de intervención apropiadas a través de un
 Programa de intervención, que podrá incluir una evaluación específica y
 deberá incluir una campaña de sensibilización, revisar la política de
 prevención de riesgos psicosociales y programas para la prevención de los
 factores de riesgo psicosocial, la promoción de un entorno organizacional
 favorable y la prevención de la violencia laboral, así como reforzar su
 aplicación y difusión.</font></TableCell>
}
else if( general > 140){
  celda  = <TableCell width="10%"  style={{backgroundColor: "#FF0000"}} className="text-center"><font size="1" face="arial"color="black" align="justify">MUY ALTO</font></TableCell>
  celdaPrev  = <TableCell width="10%"  style={{backgroundColor: "#FF0000"}} className="text-center"><font size="3" face="arial"color="black" align="justify">MUY ALTO</font></TableCell>
 
 criterios= <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="1" face="arial"color="black" align="justify">Se requiere realizar el análisis de cada categoría y dominio para establecer
  las acciones de intervención apropiadas, mediante un Programa de
  intervención que deberá incluir evaluaciones específicas, y contemplar
  campañas de sensibilización, revisar la política de prevención de riesgos
  psicosociales y programas para la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral, así como reforzar su aplicación y difusión.</font></TableCell>

  criteriosPrev = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="3" face="arial"color="black" align="justify">Se requiere realizar el análisis de cada categoría y dominio para establecer
  las acciones de intervención apropiadas, mediante un Programa de
  intervención que deberá incluir evaluaciones específicas, y contemplar
  campañas de sensibilización, revisar la política de prevención de riesgos
  psicosociales y programas para la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral, así como reforzar su aplicación y difusión.</font></TableCell>
}


let categoria1Nulo;
let categoria1Bajo;
let categoria1Medio;
let categoria1Alto;
let categoria1MuyAlto;
let colorCategoriaUno;

let categoriaUno = ((respuesta1+respuesta3+respuesta2+respuesta4+respuesta5)/length).toFixed(2);
if(categoriaUno < 5){
  colorCategoriaUno  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria1Nulo= categoriaUno
}else if(categoriaUno >= 5 && categoriaUno < 9){
  colorCategoriaUno =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria1Bajo= categoriaUno
}else if(categoriaUno >= 9 && categoriaUno < 11){
  colorCategoriaUno=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria1Medio= categoriaUno
}else if(categoriaUno >= 11 && categoriaUno < 14){
  colorCategoriaUno = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria1Alto= categoriaUno
}else if(categoriaUno >= 14){
  colorCategoriaUno = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria1MuyAlto= categoriaUno
}
let categoria2Nulo;
let categoria2Bajo;
let categoria2Medio;
let categoria2Alto;
let categoria2MuyAlto;
let colorCategoriaDos;
let categoriaDos = ((respuesta6+respuesta12+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta65+respuesta66+respuesta67+respuesta68+respuesta13+respuesta14+respuesta15+respuesta16+respuesta25+respuesta26+respuesta27+respuesta28+respuesta23+respuesta24+respuesta29+respuesta30+respuesta35+respuesta36)/length).toFixed(2);
if(categoriaDos < 15){
  colorCategoriaDos  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria2Nulo= categoriaDos
}else if(categoriaDos >= 15 && categoriaDos < 30){
  colorCategoriaDos =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria2Bajo= categoriaDos
}else if(categoriaDos >=30 && categoriaDos < 45){
  colorCategoriaDos=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria2Medio= categoriaDos
}else if(categoriaDos >=45 && categoriaDos < 60){
  colorCategoriaDos = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria2Alto= categoriaDos
}else if(categoriaDos >= 60){
  colorCategoriaDos = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria2MuyAlto= categoriaDos
}
let categoria3Nulo;
let categoria3Bajo;
let categoria3Medio;
let categoria3Alto;
let categoria3MuyAlto;
let colorCategoriaTre;
let categoriaTre = ((respuesta17+respuesta18+respuesta19+respuesta20+respuesta21+respuesta22)/length).toFixed(2);
if(categoriaTre < 5){
  colorCategoriaTre  = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria3Nulo= categoriaTre
}else if(categoriaTre >= 5 && categoriaTre < 7){
  colorCategoriaTre =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria3Bajo= categoriaTre
}else if(categoriaTre >=7 && categoriaTre < 10){
  colorCategoriaTre=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria3Medio= categoriaTre
}else if(categoriaTre >=10 && categoriaTre < 13){
  colorCategoriaTre = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria3Alto= categoriaTre
}else if(categoriaTre >= 13){
  colorCategoriaTre = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria3MuyAlto= categoriaTre
}

let categoria4Nulo;
let categoria4Bajo;
let categoria4Medio;
let categoria4Alto;
let categoria4MuyAlto;
let colorCategoriaCuatro;

let categoriaCuatro = ((respuesta31+respuesta32+respuesta33+respuesta34+respuesta37+respuesta38+respuesta39+respuesta40+respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta69+respuesta70+respuesta71+respuesta72+respuesta57+respuesta58+respuesta59+respuesta60+respuesta61+respuesta62+respuesta63+respuesta64)/length).toFixed(2);
if(categoriaCuatro < 14){
  colorCategoriaCuatro  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria4Nulo= categoriaCuatro
}else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
  colorCategoriaCuatro =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria4Bajo= categoriaCuatro
}else if(categoriaCuatro >=29 && categoriaCuatro < 42){
  colorCategoriaCuatro=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria4Medio= categoriaCuatro
}else if(categoriaCuatro >=42 && categoriaCuatro < 58){
  colorCategoriaCuatro = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria4Alto= categoriaCuatro
}else if(categoriaCuatro >= 58){
  colorCategoriaCuatro= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria4MuyAlto= categoriaCuatro
}

let categoria5Nulo;
let categoria5Bajo;
let categoria5Medio;
let categoria5Alto;
let categoria5MuyAlto;
let colorCategoriaCinco;
let categoriaCinco = ((respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52+respuesta55+respuesta56+respuesta53+respuesta54)/length).toFixed(2);
if(categoriaCinco < 10){
  colorCategoriaCinco  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria5Nulo= categoriaCinco
}else if(categoriaCinco >= 10 && categoriaCinco < 14){
  colorCategoriaCinco=<TableCell style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria5Bajo= categoriaCinco
}else if(categoriaCinco >=14 && categoriaCinco < 18){
  colorCategoriaCinco=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria5Medio= categoriaCinco
}else if(categoriaCinco >=18 && categoriaCinco < 23){
  colorCategoriaCinco = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria5Alto= categoriaCinco
}else if(categoriaCinco >= 23){
  colorCategoriaCinco= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria5MuyAlto= categoriaCinco
}

let Dominio1Nulo;
let Dominio1Bajo;
let Dominio1Medio;
let Dominio1Alto;
let Dominio1MuyAlto;
let colorDominioUno;
let DominioUno =( (respuesta1+respuesta3+respuesta2+respuesta4+respuesta5)/length).toFixed(2);
if(DominioUno < 5){
  colorDominioUno  = <TableCell  width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio1Nulo= DominioUno
}else if(DominioUno >= 5 && DominioUno < 9){
  colorDominioUno=<TableCell  width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio1Bajo= DominioUno
}else if(DominioUno >= 9 && DominioUno < 11){
  colorDominioUno=<TableCell  width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio1Medio= DominioUno
}else if(DominioUno >=11 && DominioUno < 14){
  colorDominioUno = <TableCell  width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio1Alto= DominioUno
}else if(DominioUno >= 14){
  colorDominioUno= <TableCell  width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio1MuyAlto= DominioUno
}
let Dominio2Nulo;
let Dominio2Bajo;
let Dominio2Medio;
let Dominio2Alto;
let Dominio2MuyAlto;
let colorDominioDos;
let DominioDos = ((respuesta6+respuesta12+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta65+respuesta66+respuesta67+respuesta68+respuesta13+respuesta14+respuesta15+respuesta16)/length).toFixed(2);
if(DominioDos < 15){
  colorDominioDos  = <TableCell  width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio2Nulo= DominioDos
}else if(DominioDos >= 15 && DominioDos < 21){
  colorDominioDos=<TableCell  width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio2Bajo= DominioDos
}else if(DominioDos >= 21 && DominioDos < 27){
  colorDominioDos=<TableCell  width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio2Medio= DominioDos
}else if(DominioDos >= 27 && DominioDos < 37){
  colorDominioDos = <TableCell  width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio2Alto= DominioDos
}else if(DominioDos >= 37){
  colorDominioDos= <TableCell  width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio2MuyAlto= DominioDos
}

let Dominio3Nulo;
let Dominio3Bajo;
let Dominio3Medio;
let Dominio3Alto;
let Dominio3MuyAlto;
let colorDominioTres;
let DominioTres = ((respuesta25+respuesta26+respuesta27+respuesta28+respuesta23+respuesta24+respuesta29+respuesta30+respuesta35+respuesta36)/length).toFixed(2);
if(DominioTres < 11){
  colorDominioTres  = <TableCell  width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio3Nulo= DominioTres
}else if(DominioTres >= 11 && DominioTres < 16){
  colorDominioTres=<TableCell  width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio3Bajo= DominioTres
}else if(DominioTres >= 16 && DominioTres < 21){
  colorDominioTres=<TableCell  width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio3Medio= DominioTres
}else if(DominioTres >= 21 && DominioTres < 25){
  colorDominioTres = <TableCell  width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio3Alto= DominioTres
}else if(DominioTres >= 25){
  colorDominioTres= <TableCell  width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio3MuyAlto= DominioTres
}

let Dominio4Nulo;
let Dominio4Bajo;
let Dominio4Medio;
let Dominio4Alto;
let Dominio4MuyAlto;
let colorDominioCuatro;
let DominioCuatro =( (respuesta17+respuesta18)/length).toFixed(2);
if(DominioCuatro < 1){
  colorDominioCuatro  = <TableCell  width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio4Nulo= DominioCuatro
}else if(DominioCuatro >= 1 && DominioCuatro < 2){
  colorDominioCuatro=<TableCell  width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio4Bajo= DominioCuatro
}else if(DominioCuatro >= 2 && DominioCuatro < 4){
  colorDominioCuatro = <TableCell  width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio4Medio= DominioCuatro
}else if(DominioCuatro >= 4 && DominioCuatro < 6){
  colorDominioCuatro = <TableCell  width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio4Alto= DominioCuatro
}else if(DominioCuatro >= 6){
  colorDominioCuatro= <TableCell  width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio4MuyAlto= DominioCuatro
}

let Dominio5Nulo;
let Dominio5Bajo;
let Dominio5Medio;
let Dominio5Alto;
let Dominio5MuyAlto;
let colorDominioCinco;
let DominioCinco = ((respuesta19+respuesta20+respuesta21+respuesta22)/length).toFixed(2);
if(DominioCinco < 4){
  colorDominioCinco  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio5Nulo= DominioCinco
}else if(DominioCinco >= 4 && DominioCinco < 6){
  colorDominioCinco=<TableCell width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio5Bajo= DominioCinco
}else if(DominioCinco >= 6 && DominioCinco < 8){
  colorDominioCinco=<TableCell width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio5Medio= DominioCinco
}else if(DominioCinco >= 8 && DominioCinco < 10){
  colorDominioCinco = <TableCell  width="20px"style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio5Alto= DominioCinco
}else if(DominioCinco >= 10){
  colorDominioCinco= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio5MuyAlto= DominioCinco
}

let Dominio6Nulo;
let Dominio6Bajo;
let Dominio6Medio;
let Dominio6Alto;
let Dominio6MuyAlto;
let colorDominioSeis;
let DominioSeis = ((respuesta31+respuesta32+respuesta33+respuesta34+respuesta37+respuesta38+respuesta39+respuesta40+respuesta41)/length).toFixed(2);
if(DominioSeis < 9){
  colorDominioSeis  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio6Nulo= DominioSeis
}else if(DominioSeis >= 9 && DominioSeis < 12){
  colorDominioSeis=<TableCell  width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio6Bajo= DominioSeis
}else if(DominioSeis >= 12 && DominioSeis < 16){
  colorDominioSeis=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio6Medio= DominioSeis
}else if(DominioSeis >= 16 && DominioSeis < 20){
  colorDominioSeis = <TableCell width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio6Alto= DominioSeis
}else if(DominioSeis >= 20){
  colorDominioSeis= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio6MuyAlto= DominioSeis
}

let Dominio7Nulo;
let Dominio7Bajo;
let Dominio7Medio;
let Dominio7Alto;
let Dominio7MuyAlto;
let colorDominioSiete;
let DominioSiete = ((respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta69+respuesta70+respuesta71+respuesta72)/length).toFixed(2);
if(DominioSiete < 10){
  colorDominioSiete  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio7Nulo= DominioSiete
}else if(DominioSiete >= 10 && DominioSiete < 13){
  colorDominioSiete=<TableCell width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio7Bajo= DominioSiete
}else if(DominioSiete >= 13 && DominioSiete < 17){
  colorDominioSiete=<TableCell  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio7Medio= DominioSiete
}else if(DominioSiete >= 17 && DominioSiete < 21){
  colorDominioSiete = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio7Alto= DominioSiete
}else if(DominioSiete >= 21){
  colorDominioSiete= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio7MuyAlto= DominioSiete
}

let Dominio8Nulo;
let Dominio8Bajo;
let Dominio8Medio;
let Dominio8Alto;
let Dominio8MuyAlto;
let colorDominioOcho;
let DominioOcho = ((respuesta57+respuesta58+respuesta59+respuesta60+respuesta61+respuesta62+respuesta63+respuesta64)/length).toFixed(2);
if(DominioOcho < 7){
  colorDominioOcho  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio8Nulo= DominioOcho
}else if(DominioOcho >= 7 && DominioOcho < 10){
  colorDominioOcho  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio8Bajo= DominioOcho
}else if(DominioOcho >= 10 && DominioOcho < 13){
  colorDominioOcho=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio8Medio= DominioOcho
}else if(DominioOcho >= 13 && DominioOcho < 16){
  colorDominioOcho = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio8Alto= DominioOcho
}else if(DominioOcho >= 16){
  colorDominioOcho= <TableCell width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio8MuyAlto= DominioOcho
}

let Dominio9Nulo;
let Dominio9Bajo;
let Dominio9Medio;
let Dominio9Alto;
let Dominio9MuyAlto;
let colorDominioNueve;
let DominioNueve = ((respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52)/length).toFixed(2);
if(DominioNueve < 6){
  colorDominioNueve  = <TableCell width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio9Nulo= DominioNueve
}else if(DominioNueve >= 6 && DominioNueve < 10){
  colorDominioNueve  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio9Bajo= DominioNueve
}else if(DominioNueve >= 10 && DominioNueve < 14){
  colorDominioNueve=<TableCell  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio9Medio= DominioNueve
}else if(DominioNueve >= 14 && DominioNueve < 18){
  colorDominioNueve = <TableCell  width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio9Alto= DominioNueve
}else if(DominioNueve >= 18){
  colorDominioNueve= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio9MuyAlto= DominioNueve
}

let Dominio10Nulo;
let Dominio10Bajo;
let Dominio10Medio;
let Dominio10Alto;
let Dominio10MuyAlto;
let colorDominioDiez;
let DominioDiez = ((respuesta55+respuesta56+respuesta53+respuesta54)/length).toFixed(2);
if(DominioDiez < 4){
  colorDominioDiez  = <TableCell width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio10Nulo= DominioDiez
}else if(DominioDiez >= 4 && DominioDiez < 6){
  colorDominioDiez  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio10Bajo= DominioDiez
}else if(DominioDiez >= 6 && DominioDiez < 8){
  colorDominioDiez=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio10Medio= DominioDiez
}else if(DominioDiez >= 8 && DominioDiez < 10){
  colorDominioDiez = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio10Alto= DominioDiez
}else if(DominioDiez >= 10){
  colorDominioDiez= <TableCell  width="20px"style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio10MuyAlto= DominioDiez
}
 a = 1  

ponderacion=<React.Fragment>

<MDBContainer style={{marginTop:20}}>
  <table>
    <tr>
      <td width="33%">
      <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
      Descargar resultados globales
      </MDBBtn>
      </td>
      <td>

      </td>
      <td width="33%">
      <font  face="arial" className = "mt-4" ><strong> Evaluacioón EEO. </strong><br/><strong>FILTRADO POR: <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;  {this.state.filtro2} &nbsp;&nbsp; {this.state.filtro3} &nbsp;&nbsp;{this.state.filtro4} &nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp; {this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></strong><br/><strong>{localStorage.getItem("razonsocial")}</strong> </font>
      </td>
      <td width="34%">
      <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100}}/> 
      </td>
    </tr>
  </table>


 </MDBContainer>
 <br/>

<MDBContainer >

<Table   responsive small borderless className="text-left">
<TableHead>
<TableRow>
  <TableCell  width="13%" style={{backgroundColor: "#E6E7E8"}}>Resultados Generales</TableCell>
    {celdaPrev}
  <TableCell width="6%"  > <strong>   TOTAL {general}  Puntos </strong></TableCell>
  <TableCell width="2%" ></TableCell>
  <TableCell width="1%"  ></TableCell>
 {criteriosPrev}
</TableRow>
</TableHead>
</Table>
 </MDBContainer>

<TableContainer component={Paper} style={{marginBottom:30,marginTop:20}}>
      <Table  size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
            <TableCell width="50%" ></TableCell>
            <TableCell align="right" style={{backgroundColor: "#9BE0F7"}}>NULO</TableCell>
            <TableCell align="right" style={{backgroundColor: "#6BF56E"}}>BAJO&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#FFFF00"}}>MEDIO&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#FFC000"}}>ALTO&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#FF0000"}}>MUY ALTO&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  style={{marginTop:20}}>       
            <TableRow>
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS DE LA CATEGORIA</strong></TableCell>              
              <TableCell component="th" scope="row"></TableCell>
              <TableCell component="th" scope="row" ></TableCell>
              <TableCell component="th" scope="row" ></TableCell>
              <TableCell component="th" scope="row" ></TableCell>
              <TableCell component="th" scope="row" ></TableCell>  
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row" >I. Ambiente de Trabajo</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria1Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria1Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria1Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria1Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria1MuyAlto}</TableCell>           
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >II. Factores propios de la actividad</TableCell>   
                <TableCell component="th" scope="row" align="center">{categoria2Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria2Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria2Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria2Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria2MuyAlto}</TableCell>    
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >III. Organización del tiempo de trabajo</TableCell>   
                <TableCell component="th" scope="row" align="center">{categoria3Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria3Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria3Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria3Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria3MuyAlto}</TableCell>    
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >IV. Liderazgo y relaciones en el trabajo</TableCell>   
                <TableCell component="th" scope="row" align="center">{categoria4Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria4Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria4Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria4Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria4MuyAlto}</TableCell>           
                </TableRow>

                <TableRow>
                <TableCell component="th" scope="row" >V. Entorno organizacional</TableCell>   
                <TableCell component="th" scope="row" align="center">{categoria5Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria5Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria5Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria5Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria5MuyAlto}</TableCell>           
                </TableRow>
               
                <TableRow>
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS DEL DOMINIO</strong></TableCell>              
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
    
                </TableRow>
                
                <TableRow>
                <TableCell component="th" scope="row" >I. Condiciones en el ambiente de trabajo</TableCell> 
                <TableCell component="th" scope="row" align="center">{Dominio1Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio1Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio1Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio1Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio1MuyAlto}</TableCell>
    
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >II. Carga de trabajo</TableCell>    
                <TableCell component="th" scope="row" align="center">{Dominio2Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio2Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio2Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio2Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio2MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >III. Falta de control sobre el trabajo</TableCell>     
                <TableCell component="th" scope="row" align="center">{Dominio3Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio3Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio3Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio3Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio3MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >IV. Jornada de trabajo</TableCell>  
                <TableCell component="th" scope="row" align="center">{Dominio4Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio4Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio4Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio4Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio4MuyAlto}</TableCell>         
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >V. Interferencia en la relación trabajo-familia</TableCell>           
                <TableCell component="th" scope="row" align="center">{Dominio5Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio5Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio5Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio5Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio5MuyAlto}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >VI. Liderazgo</TableCell>    
                <TableCell component="th" scope="row" align="center">{Dominio6Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio6Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio6Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio6Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio6MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >VII. Relaciones en el trabajo</TableCell>    
                <TableCell component="th" scope="row" align="center">{Dominio7Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio7Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio7Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio7Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio7MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >VIII. Violencia</TableCell>    
                <TableCell component="th" scope="row" align="center">{Dominio8Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio8Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio8Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio8Alto}</TableCell>
                <TableCell component="th" scope="row" align="center" >{Dominio8MuyAlto}</TableCell>        
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >IX. Reconocimiento del desempeño</TableCell>    
                <TableCell component="th" scope="row" align="center">{Dominio9Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio9Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio9Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio9Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio9MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >XX. Insuficiente sentido de pertenencia e, inestabilidad</TableCell>    
                <TableCell component="th" scope="row" align="center">{Dominio10Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio10Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio10Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio10Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{Dominio10MuyAlto}</TableCell>        
                </TableRow>
                <TableRow>
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS POR DIMENSIÓN</strong></TableCell>              
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              

            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >1.- Condiciones peligrosas e inseguras</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta1/length)+(respuesta3/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >2.- Condiciones deficientes e insalubres</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta2/length)+(respuesta4/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow> 
           
            <TableRow>
            <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{(respuesta5/length).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%">4.- Cargas cuantitativas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta6/length)+(respuesta12/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%">5.- Ritmos de trabajo acelerado</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta7/length)+(respuesta8/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta9/length)+(respuesta10/length)+(respuesta11/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta65/length)+(respuesta66/length)+(respuesta67/length)+(respuesta68/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >8.- Cargas de alta responsabilidad</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta13/length)+(respuesta14/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >9.- Cargas contradictorias o inconsistentes</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta15/length)+(respuesta16/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta25/length)+(respuesta26/length)+(respuesta27/length)+(respuesta28/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta23/length)+(respuesta24/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>

            <TableRow>
            <TableCell component="th" scope="row" >12.- Insuficiente participación y manejo del cambio</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta29/length)+(respuesta30/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>



            <TableRow>
            <TableCell component="th" scope="row" >13.- Limitada o inexistente capacitación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta35/length)+(respuesta36/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >14.- Jornadas de trabajo extensas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta17/length)+(respuesta18/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >15.- Influencia del trabajo fuera del centro laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta19/length)+(respuesta20/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >16.- Influencia de las responsabilidades familiares</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta21/length)+(respuesta22/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >17.- Escasa claridad de funciones</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta31/length)+(respuesta32/length)+(respuesta33/length)+(respuesta34/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >18.- Características del liderazgo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)+(respuesta41/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >19.- Relaciones sociales en el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta42/length)+(respuesta43/length)+(respuesta44/length)+(respuesta45/length)+(respuesta46/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >20.- Deficiente relación con los colaboradores que supervisa</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta69/length)+(respuesta70/length)+(respuesta71/length)+(respuesta72/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >21.- Violencia laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta57/length)+(respuesta58/length)+(respuesta59/length)+(respuesta60/length)+(respuesta61/length)+(respuesta62/length)+(respuesta63/length)+(respuesta64/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >22.- Escasa o nula retroalimentación del desempeño</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta47/length)+(respuesta48/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>

            <TableRow>
            <TableCell component="th" scope="row" >23.- Escaso o nulo reconocimiento y compensación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta49/length)+(respuesta50/length)+(respuesta51/length)+(respuesta52/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >24.- Limitado sentido de pertenencia</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center">{((respuesta55/length)+(respuesta56/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >25.- Inestabilidad laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta53/length)+(respuesta54/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>

            <div>
                <div className="example-config">
                  
                </div>

                <div style={{ position: "absolute", left: "-1000px", top: 0 }}>
                    <PDFExport
                        paperSize="letter"
                        margin="1cm"
                        pageTemplate={PageTemplate}
                        forcePageBreak=".page-break"
                        fileName={`Resultados globales EEO ${new Date().getFullYear()}`}
                        ref={(component) => this.pdfExportComponent = component}
                    >
                        <div style={{ width: "500px" }}>
                      
                            <MDBRow style={{marginBottom:10}}> 
                             <MDBCol>
                            <img src={diagnostico} alt="logo" style = {{width:150,marginLeft:20,heigth:50}}/>
                    
                            <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,marginLeft:230,heigth:20}}/>
                            </MDBCol> 
                            </MDBRow> 
                            <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                            <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left mt-4 ">
                          
                                    <MDBTableBody>     
                            <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                            <font size="3"face="arial"color="black">Diagnóstico Global de factores de riesgo psicosocial y evaluación de entorno organizacional en los centros de trabajo</font><br></br>
                            <font size="1"face="arial"color="black">{this.state.date}</font><br/>
                            <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                            <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font>

                        
                            </MDBTableBody>
                            </MDBTable>

                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                           
                              <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-center mt-4 ">
                              <MDBTableBody>
                              <font size="1"
                              face="arial"
                              color="black" style = {{marginTop:25,marginLeft:20}}>GUÍA DE REFERENCIA III -
                              CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y
                              EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO</font>   <br/>  
                                </MDBTableBody>
                                </MDBTable>
                                <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
                                    <MDBTableBody>
                                    <tr>
                                        <td width="25%"><font size="1" face="arial"color="black"><strong>{localStorage.getItem("razonsocial")}</strong></font></td>
                                    <td width="15%"><font size="1" face="arial"color="black"><strong>{this.state.nombre3}</strong></font></td>
                                    <td width="15%"><font size="1" face="arial"color="black"><strong>{this.state.nombre4}</strong></font></td>
                                    <td width="15%"><font size="1" face="arial"color="black"><strong>{this.state.nombre5}</strong></font></td>
                                    <td width="15%"><font size="1" face="arial"color="black"><strong>{this.state.nombre6}</strong></font></td>
                                    <td width="15%"><font size="1" face="arial"color="black"><strong>{this.state.nombre7}</strong></font></td>
                                   </tr>
                                   </MDBTableBody>
                                   </MDBTable>
                                <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
                                    <MDBTableBody>
                            
                                   <tr>
                                   <td width="40%"><font size="1" face="arial"color="black">RESULTADO DEL NÚMERO DE EVALUACIONES :  </font></td>
                                   <td width="20%"><font size="1" face="arial"color="black">{general.toFixed(2)}</font></td>
                                   <td width="20%"><font size="1" face="arial"color="black">Nivel de riesgo </font></td>
                                    {celda}
                                   </tr>                                  
                                   </MDBTableBody>
                                    </MDBTable>  
                                    <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left ">
                                    <MDBTableBody>
                                    <tr>
                                      <td ><font size="1" face="arial"color="black"><strong>Necesidad de la acción :</strong></font></td>
                                   </tr>         
                                   <tr>
                                   {criterios}
                                     </tr>                     
                                   </MDBTableBody>
                                    </MDBTable>  

                                   <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">I.- Resultados de la categoría</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Categoría</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
                                          <td width="20px"><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                        </tr>
                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
                                        <td width="60px"  className="text-left"><font size="1" face="arial"color="black">Ambiente de Trabajo</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{categoriaUno}</font></td>
                                         {colorCategoriaUno}                
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Factores propios de la actividad</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{categoriaDos}</font></td>
                                           {colorCategoriaDos}
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Organización del tiempo de trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{categoriaTre}</font></td>
                                          {colorCategoriaTre}
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Liderazgo y relaciones en el trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{categoriaCuatro}</font></td>
                                          {colorCategoriaCuatro}
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Entorno organizacional</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{categoriaCinco}</font></td>
                                          {colorCategoriaCinco}  
                                        </tr>
               
                                      </MDBTableBody>
                                      </MDBTable>
                           
                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">II.- Resultados del dominio</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                      <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Dominio</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
                                          <td width="20px"><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                        </tr>
                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
                                        <td width="60px"  className="text-left"><font size="1" face="arial"color="black">Carga de Trabajo</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{DominioUno}</font></td>
                                         {colorDominioUno}                
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Condiciones en el ambiente de trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioDos}</font></td>
                                           {colorDominioDos}
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Falta de control sobre el trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioTres}</font></td>
                                          {colorDominioTres}
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Jornada de trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioCuatro}</font></td>
                                          {colorDominioCinco}  
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Interferencia en la relación trabajo-familia</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioCinco}</font></td>
                                          {colorDominioCinco}
                                          </tr>
                                          <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >6</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Liderazgo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioSeis}</font></td>
                                          {colorDominioSeis}  
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >7</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Relaciones en el trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioSiete}</font></td>
                                          {colorDominioSiete}  
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >8</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Violencia</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioOcho}</font></td>
                                          {colorDominioOcho}  
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >9</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Reconocimiento del desempeño</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioNueve}</font></td>
                                          {colorDominioNueve}  
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >10</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Insuficiente sentido de pertenencia e, inestabilidad</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioDiez}</font></td>
                                          {colorDominioDiez}  
                                        </tr>
                                      
                                       
                                      </MDBTableBody>
                                      </MDBTable>
                     
                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                    <font color="red" style= {{marginTop:10,marginLeft:20}}  size="1">III.- Resultados por Dimensión</font>
                                      <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Dimensión</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
                                        </tr>
                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
                                        <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Condiciones peligrosas e inseguras</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{((respuesta1/length)+(respuesta3/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta2/length)+(respuesta4/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta5/length).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta6/length)+(respuesta12/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta7/length)+(respuesta8/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >6</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Carga mental</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta9/length)+(respuesta10/length)+(respuesta11/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >7</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta65/length)+(respuesta66/length)+(respuesta67/length)+(respuesta68/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >8</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta13/length)+(respuesta14/length)).toFixed(2)}</font></td>
                                        </tr>


                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >9</font></td>
                                        <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{((respuesta15/length)+(respuesta16/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >10</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta25/length)+(respuesta26/length)+(respuesta27/length)+(respuesta28/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >11</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta23/length)+(respuesta24/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >12</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Insuficiente participación y manejo del cambio</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta29/length)+(respuesta30/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >13</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta35/length)+(respuesta36/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >14</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta17/length)+(respuesta18/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >15</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta19/length)+(respuesta20/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >16</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta21/length)+(respuesta22/length)).toFixed(2)}</font></td>
                                        </tr>

                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >17</font></td>
                                        <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{((respuesta31/length)+(respuesta32/length)+(respuesta33/length)+(respuesta34/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >18</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)+(respuesta41/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >19</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black"></font>Relaciones sociales en el trabajo</td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta42/length)+(respuesta43/length)+(respuesta44/length)+(respuesta45/length)+(respuesta46/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >20</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta69/length)+(respuesta70/length)+(respuesta71/length)+(respuesta72/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >21</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Violencia laboral</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta57/length)+(respuesta58/length)+(respuesta59/length)+(respuesta60/length)+(respuesta61/length)+(respuesta62/length)+(respuesta63/length)+(respuesta64/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >22</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Escasa o nula retroalimentación del desempeño</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta47/length)+(respuesta48/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >23</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Escaso o nulo reconocimiento y compensación</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta49/length)+(respuesta50/length)+(respuesta51/length)+(respuesta52/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >24</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitado sentido de pertenencia</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta55/length)+(respuesta56/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >25</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta53/length)+(respuesta54/length)).toFixed(2)}</font></td>
                                        </tr>
                                      </MDBTableBody>
                                      </MDBTable>           
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>

                        </div>
                    </PDFExport>
                </div>
            </div>

</React.Fragment>
   } 
      const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 500, height: 400,marginLeft: "17%"}
    const container2 = { width: 500, height: 300 }
    let pdfView1;
    if(this.state.resultados[2]){ 
      a = 1
      console.log("este es lo que contiene el estado ")
      pdfView1 = <MDBContainer> <Alert className ="mt-4" color ="primary ">Resultados de la Aplicación de la evaluación EEO </Alert>
        <React.Fragment>
          <section className="flex-column  bg-white  pa4 "  >
          <div>
                    <MDBBtn  color="primary" outline className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                        Descargar Respuestas de {this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM}
                    </MDBBtn>
           </div>
           <br/>
  
                <MDBContainer style={{marginLeft:"6%"}}>
                <font face="arial" className = "mt-4" >CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL<br/>EN LOS CENTROS DE TRABAJO</font>
                 <br/><br/> <strong>{localStorage.getItem("razonsocial")}</strong><br/>
                <MDBTable small borderless className="text-left mt-4 ">
       
                <MDBTableBody>   
                <tr>
                <td width="65%" > <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100,marginBottom:20}}/></td>
                <td width="35%" >
                <img src={diagnostico} alt="logo" style = {{width:150}}/>

                </td>
                </tr>
               
                  <tr>
                  <td width="65%"  >Nombre : {this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM} </td>
                  <td width="35%"  >Puesto : {this.state.resultados[0].Puesto}</td>
                  </tr>
                  <tr>
                  <td width="65%"  >Departamento : {this.state.resultados[0].AreaTrabajo}</td>
                  <td width="35%" >Genero : {this.state.resultados[0].Sexo}</td> 
                  </tr>
                  <tr>
                  <td width="65%" >Correo : {this.state.resultados[0].correo}</td>
                  <td width="35%" >RFC : {this.state.resultados[0].RFC}</td>   
                  </tr>
                </MDBTableBody>
                </MDBTable>
                </MDBContainer>
                
                <MDBContainer style={{marginLeft:20}} >
                <MDBTable small borderless className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">I. Condiciones ambientales de su centro de trabajo.</th>    
                      <td width="25%"></td>   
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">1</td>
                      <td width="70%">El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</td>
                      <td width="25%" >{this.state.resultados[1].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td >2</td>
                      <td>Mi trabajo me exige hacer mucho esfuerzo físico</td>
                      <td>{this.state.resultados[2].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Me preocupa sufrir un accidente en mi trabajo</td>
                      <td>{this.state.resultados[3].Respuestas}</td> 
                    </tr>                    
                    <tr>
                      <td>4</td>
                      <td>Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo</td>
                      <td>{this.state.resultados[4].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Considero que las actividades que realizo son peligrosas</td>
                      <td >{this.state.resultados[5].Respuestas}</td> 
                    </tr>
                    <br/>
 
                  </MDBTableBody>
      
                  <MDBTableHead>
                    <tr>
                    <td></td>
                      <th >II. La cantidad y ritmo de trabajo que tiene.</th>       
                      <td></td>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>6</td>
                      <td>Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno</td>   
                      <td >{this.state.resultados[6].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Por la cantidad de trabajo que tengo debo trabajar sin parar</td>   
                      <td >{this.state.resultados[7].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Considero que es necesario mantener un ritmo de trabajo acelerado</td>   
                      <td >{this.state.resultados[8].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>
  
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">III. El esfuerzo mental que le exige su trabajo.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">9</td>
                      <td width="70%">Mi trabajo exige que esté muy concentrado</td> 
                      <td width="25%" >{this.state.resultados[9].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Mi trabajo requiere que memorice mucha información</td>   
                      <td >{this.state.resultados[10].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>En mi trabajo tengo que tomar decisiones difíciles muy rápido</td>   
                      <td>{this.state.resultados[11].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>Mi trabajo exige que atienda varios asuntos al mismo tiempo</td>   
                      <td >{this.state.resultados[12].Respuestas}</td> 
                    </tr>
                   <br/>
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">IV. Trabajo y las responsabilidades que tiene.</th>       
                      <td width="25%" ></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">13</td>
                      <td width="70%">En mi trabajo soy responsable de cosas de mucho valor</td>   
                      <td width="25%" >{this.state.resultados[13].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>14</td>
                      <td>Respondo ante mi jefe por los resultados de toda mi área de trabajo</td>   
                      <td>{this.state.resultados[14].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>En el trabajo me dan órdenes contradictorias</td>   
                      <td>{this.state.resultados[15].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>16</td>
                      <td>Considero que en mi trabajo me piden hacer cosas innecesarias</td>   
                      <td>{this.state.resultados[16].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">V. Jornada de trabajo.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">17</td>
                      <td width="70%">Trabajo horas extras más de tres veces a la semana</td>   
                      <td width="25%">{this.state.resultados[17].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>18</td>
                      <td>Mi trabajo me exige laborar en días de descanso, festivos o fines de semana</td>   
                      <td>{this.state.resultados[18].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>19</td>
                      <td>Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales</td>   
                      <td>{this.state.resultados[19].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>20</td>
                      <td>Debo atender asuntos de trabajo cuando estoy en casa</td>   
                      <td>{this.state.resultados[20].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>21</td>
                      <td>Pienso en las actividades familiares o personales cuando estoy en mi trabajo</td>   
                      <td>{this.state.resultados[21].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>22</td>
                      <td>Pienso que mis responsabilidades familiares afectan mi trabajo</td>   
                      <td>{this.state.resultados[22].Respuestas}</td> 
                    </tr>
                  </MDBTableBody>
                  </MDBTable>

                  <MDBTable small borderless className="mt-4 text-left">
                  <MDBTableHead >
                    <tr>
                      <th  width="5%"></th>
                      <th  width="70%">VI. Decisiones que puede tomar en su trabajo.</th>       
                      <td  width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                 
                  <MDBTableBody>
                    <tr>
                      <td width="5%">23</td>
                      <td width="70%">Mi trabajo permite que desarrolle nuevas habilidades</td>   
                      <td width="25%">{this.state.resultados[23].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>24</td>
                      <td>En mi trabajo puedo aspirar a un mejor puesto</td>   
                      <td >{this.state.resultados[24].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>25</td>
                      <td>Durante mi jornada de trabajo puedo tomar pausas cuando las necesito</td>   
                      <td>{this.state.resultados[25].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td >26</td>
                      <td >Puedo decidir cuánto trabajo realizo durante la jornada laboral</td>   
                      <td >{this.state.resultados[26].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>27</td>
                      <td>Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo</td>   
                      <td >{this.state.resultados[27].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>28</td>
                      <td>Puedo cambiar el orden de las actividades que realizo en mi trabajo</td>   
                      <td>{this.state.resultados[28].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>
                  
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">VII.Cualquier tipo de cambio que ocurra en su trabajo (considere los últimos cambios realizados).</th>       
                      <td width="25%"> </td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td  width="5%">29</td>
                      <td  width="70%">Los cambios que se presentan en mi trabajo dificultan mi labor</td>   
                      <td  width="25%">{this.state.resultados[29].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>30</td>
                      <td>Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas o aportaciones</td>   
                      <td >{this.state.resultados[30].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">VIII. capacitación e información que se le proporciona sobre su trabajo.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">31</td>
                      <td width="70%">Me informan con claridad cuáles son mis funciones</td>   
                      <td width="25%">{this.state.resultados[31].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>32</td>
                      <td>Me explican claramente los resultados que debo obtener en mi trabajo</td>   
                      <td >{this.state.resultados[32].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>33</td>
                      <td>Me explican claramente los objetivos de mi trabajo</td>   
                      <td >{this.state.resultados[33].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>34</td>
                      <td>Me informan con quién puedo resolver problemas o asuntos de trabajo</td>   
                      <td>{this.state.resultados[34].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>35</td>
                      <td>Me permiten asistir a capacitaciones relacionadas con mi trabajo</td>   
                      <td>{this.state.resultados[35].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>36</td>
                      <td>Recibo capacitación útil para hacer mi trabajo</td>   
                      <td>{this.state.resultados[36].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">IX. Jefes con quien tiene contacto.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">37</td>
                      <td width="70%">Mi jefe ayuda a organizar mejor el trabajo</td>   
                      <td width="25%">{this.state.resultados[37].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>38</td>
                      <td>Mi jefe tiene en cuenta mis puntos de vista y opiniones</td>   
                      <td>{this.state.resultados[38].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>39</td>
                      <td>Mi jefe me comunica a tiempo la información relacionada con el trabajo</td>   
                      <td>{this.state.resultados[39].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>40</td>
                      <td>La orientación que me da mi jefe me ayuda a realizar mejor mi trabajo</td>   
                      <td>{this.state.resultados[40].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>41</td>
                      <td>Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo</td>   
                      <td>{this.state.resultados[41].Respuestas}</td> 
                    </tr>                  
                    <br/>
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">X. Relaciones con sus compañeros.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td width="5%">42</td>
                      <td width="70%">Puedo confiar en mis compañeros de trabajo</td>   
                      <td width="25%">{this.state.resultados[42].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>43</td>
                      <td>Entre compañeros solucionamos los problemas de trabajo de forma respetuosa</td>   
                      <td>{this.state.resultados[43].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>44</td>
                      <td>En mi trabajo me hacen sentir parte del grupo</td>   
                      <td>{this.state.resultados[44].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>45</td>
                      <td>Cuando tenemos que realizar trabajo de equipo los compañeros colaboran</td>   
                      <td >{this.state.resultados[45].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>46</td>
                      <td>Mis compañeros de trabajo me ayudan cuando tengo dificultades</td>   
                      <td>{this.state.resultados[46].Respuestas}</td> 
                    </tr>
                    <br/>

                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th  width="5px"></th>
                      <th  width="70px">XI. Información que recibe sobre su rendimiento en el trabajo, el reconocimiento, el sentido de pertenencia y la estabilidad que le ofrece su trabajo.</th>       
                      <td  width="25px"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td width="5%">47</td>
                      <td width="70%">Me informan sobre lo que hago bien en mi trabajo</td>   
                      <td width="25%">{this.state.resultados[47].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>48</td>
                      <td>La forma como evalúan mi trabajo en mi centro de trabajo me ayuda a mejorar mi desempeño</td>   
                      <td>{this.state.resultados[48].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>49</td>
                      <td>En mi centro de trabajo me pagan a tiempo mi salario</td>   
                      <td>{this.state.resultados[49].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>50</td>
                      <td>El pago que recibo es el que merezco por el trabajo que realizo</td>   
                      <td>{this.state.resultados[50].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>51</td>
                      <td>Si obtengo los resultados esperados en mi trabajo me recompensan o reconocen</td>   
                      <td>{this.state.resultados[51].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>52</td>
                      <td>Las personas que hacen bien el trabajo pueden crecer laboralmente</td>   
                      <td >{this.state.resultados[52].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>53</td>
                      <td>Considero que mi trabajo es estable</td>   
                      <td >{this.state.resultados[53].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>54</td>
                      <td>En mi trabajo existe continua rotación de personal</td>   
                      <td>{this.state.resultados[54].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>55</td>
                      <td>Siento orgullo de laborar en este centro de trabajo</td>   
                      <td>{this.state.resultados[55].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>56</td>
                      <td>Me siento comprometido con mi trabajo</td>   
                      <td>{this.state.resultados[56].Respuestas}</td> 
                    </tr>
               
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">XII. Actos de violencia laboral (malos tratos, acoso, hostigamiento, acoso psicológico).</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td width="5%">57</td>
                      <td width="70%">En mi trabajo puedo expresarme libremente sin interrupciones</td>   
                      <td width="25%">{this.state.resultados[57].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>58</td>
                      <td>Recibo críticas constantes a mi persona y/o trabajo</td>   
                      <td>{this.state.resultados[58].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>59</td>
                      <td>Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones</td>   
                      <td>{this.state.resultados[59].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>60</td>
                      <td>Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones</td>   
                      <td>{this.state.resultados[60].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>61</td>
                      <td>Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador</td>   
                      <td>{this.state.resultados[61].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>62</td>
                      <td>Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores</td>   
                      <td>{this.state.resultados[62].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>63</td>
                      <td>Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo</td>   
                      <td>{this.state.resultados[63].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>64</td>
                      <td>He presenciado actos de violencia en mi centro de trabajo</td>   
                      <td >{this.state.resultados[64].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">XIII. Atención a clientes y usuarios.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td width="5%">65</td>
                      <td width="70%">Atiendo clientes o usuarios muy enojados</td>   
                      <td width="25%">{this.state.resultados[65].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>66</td>
                      <td>Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas</td>   
                      <td>{this.state.resultados[66].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>67</td>
                      <td>Para hacer mi trabajo debo demostrar sentimientos distintos a los míos</td>   
                      <td>{this.state.resultados[67].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>68</td>
                      <td>Mi trabajo me exige atender situaciones de violencia</td>   
                      <td>{this.state.resultados[68].Respuestas}</td> 
                    </tr> 
                    <br/>                   
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">XIV.  Las actitudes de las personas que supervisa.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td width="5%">69</td>
                      <td width="70%"> Comunican tarde los asuntos de trabajo</td>   
                      <td width="25%">{this.state.resultados[69].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>70</td>
                      <td>Dificultan el logro de los resultados del trabajo</td>   
                      <td>{this.state.resultados[70].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>71</td>
                      <td>Cooperan poco cuando se necesita</td>   
                      <td >{this.state.resultados[71].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>72</td>
                      <td>Ignoran las sugerencias para mejorar su trabajo</td>   
                      <td>{this.state.resultados[72].Respuestas}</td> 
                    </tr>
                    
                  </MDBTableBody>
                </MDBTable> 
                </MDBContainer>  
                <div>
                        <div className="example-config">    
                        </div>
                        <div style={{ position: "absolute", left: "-1000px", top: 0 }}>
                            <PDFExport
                                paperSize="letter"
                                margin="1cm"
                                pageTemplate={PageTemplate}
                                forcePageBreak=".page-break"
                                fileName={`${this.state.resultados[0].nombre} ${this.state.resultados[0].ApellidoP} ${this.state.resultados[0].ApellidoM} Reporte ATS ${new Date().getFullYear()}`}
                                ref={(component) => this.pdfExportComponent = component}
                            >
                                <div style={{ width: "500px" }}>
                                
                                    <MDBRow style={{marginBottom:10}}> 
                                    <MDBCol>
                                    <img src={diagnostico} alt="logo" style = {{width:150,marginLeft:20,heigth:50}}/>
                            
                                    <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,marginLeft:230,heigth:20}}/>
                                    </MDBCol> 
                                    </MDBRow> 
                                    <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                                    <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left mt-4 ">
                                    
                                    <MDBTableBody>     
                                    <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                                    <font size="1"face="arial"color="black">{this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM}</font><br></br><br/>
                                    <font size="2"face="arial"color="black">CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO</font><br></br>
                                    <font size="1"face="arial"color="black">{this.state.date}</font>                     
                                    </MDBTableBody>
                                    </MDBTable>
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <font size="1"
                                        face="arial"
                                        color="black" style = {{marginLeft:35}}>GUÍA DE REFERENCIA III
                                        CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO</font>   <br/>  
                                        <font size="1"  face="arial"
                                        color="black" style = {{marginLeft:35}}>PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN
                                        LOS CENTROS DE TRABAJO</font>
                                    <MDBTable responsive small borderless className="text-left mt-4" style = {{marginLeft:35}}>
        
                                    <MDBTableBody>  
                                                        
                                      <tr>
                                      <td width="6%" ><font size="1" face="arial"color="black" >Nombre : {this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM}</font> </td>
                                      <td width="6%" ><font size="1" face="arial"color="black" >Puesto : {this.state.resultados[0].Puesto}</font></td>
                                                    </tr>
                                                    <tr>
                                      <td width="6%" ><font size="1" face="arial"color="black" >Departamento : {this.state.resultados[0].AreaTrabajo}</font></td>
                                      <td width="6%" ><font size="1" face="arial"color="black" >Genero : {this.state.resultados[0].Sexo}</font></td> 
                                                    </tr>
                                                    <tr>
                                      <td width="6%" ><font size="1" face="arial"color="black" >Correo : {this.state.resultados[0].correo}</font></td>
                                      <td width="6%" ><font size="1" face="arial"color="black" >RFC : {this.state.resultados[0].RFC}</font></td>            
                                      </tr>
                                    </MDBTableBody>
                                    </MDBTable>
             

                                    <MDBTable  component={Paper}  small  className="text-left ">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginLeft:20}}  size="1">I. Condiciones ambientales de su centro de trabajo.</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left"> 
                                    <MDBTableBody>
                                        
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</font></td>
                                    <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[1].Respuestas}</font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Mi trabajo me exige hacer mucho esfuerzo físico</font></td>
                                    <td width="90px" ><font size="1" face="arial"color="black" >{this.state.resultados[2].Respuestas}</font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Me preocupa sufrir un accidente en mi trabajo</font></td>
                                    <td  width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[3].Respuestas}</font></td> 
                                  </tr>                    
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo</font></td>
                                    <td  width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[4].Respuestas}</font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Considero que las actividades que realizo son peligrosas</font></td>
                                    <td  width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[5].Respuestas}</font></td> 
                                  </tr>
                                  
          
                                    </MDBTableBody>
                                   </MDBTable>
                                    <MDBTable  component={Paper}  small  className="text-left ">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}   size="1">II. La cantidad y ritmo de trabajo que tiene.</font>
                                    </MDBTableBody>
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}}  component={Paper}  small bordered className="text-left mt-4 ">
                                    <MDBTableBody>
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno</font></td>
                                    <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[6].Respuestas}</font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo trabajar sin parar</font></td>
                                    <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[7].Respuestas} </font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Considero que es necesario mantener un ritmo de trabajo acelerado</font></td>
                                    <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[8].Respuestas}</font></td> 
                                  </tr>
                                  
                                    </MDBTableBody>
                                    </MDBTable>
                          
                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font style= {{marginLeft:20}}  size="1" color="red" >III. El esfuerzo mental que le exige su trabajo.</font>
                                    </MDBTableBody>
                                    </MDBTable>
                                            
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                                    <MDBTableBody>
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >Mi trabajo exige que esté muy concentrado</font></td>
                                    <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[9].Respuestas}</font></td> 
                                  </tr>
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >Mi trabajo requiere que memorice mucha información</font></td>   
                                    <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[10].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >En mi trabajo tengo que tomar decisiones difíciles muy rápido</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[11].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Mi trabajo exige que atienda varios asuntos al mismo tiempo</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[12].Respuestas}</font></td> 
                                    </tr>
                                   
                   
                                    </MDBTableBody>
                                    </MDBTable>
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >IV. Trabajo y las responsabilidades que tiene.</font>
                                    </MDBTableBody>
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                                    <MDBTableBody>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >En mi trabajo soy responsable de cosas de mucho valor</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[13].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >Respondo ante mi jefe por los resultados de toda mi área de trabajo</font></td>   
                                    <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[14].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >En el trabajo me dan órdenes contradictorias</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[15].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Considero que en mi trabajo me piden hacer cosas innecesarias</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[16].Respuestas}</font></td> 
                                    </tr>
                                   
                                    </MDBTableBody>
                                    </MDBTable>

                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >V. Jornada de trabajo.</font>
                                    </MDBTableBody>
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                                    <MDBTableBody>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Trabajo horas extras más de tres veces a la semana</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[17].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >Mi trabajo me exige laborar en días de descanso, festivos o fines de semana</font></td>   
                                    <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[18].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[19].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Debo atender asuntos de trabajo cuando estoy en casa</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[20].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Pienso en las actividades familiares o personales cuando estoy en mi trabajo</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[21].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Pienso que mis responsabilidades familiares afectan mi trabajo</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[22].Respuestas}</font></td> 
                                    </tr>
                                    </MDBTableBody>
                                    </MDBTable>
                          
                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >VI. Decisiones que puede tomar en su trabajo.</font>
                                    </MDBTableBody>
                                    </MDBTable>

                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                                    <MDBTableBody>
                                            
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >Mi trabajo permite que desarrolle nuevas habilidades</font></td>   
                                    <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[23].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >En mi trabajo puedo aspirar a un mejor puesto</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[24].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Durante mi jornada de trabajo puedo tomar pausas cuando las necesito</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[25].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Puedo decidir cuánto trabajo realizo durante la jornada laboral</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[26].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td ><font size="1" face="arial"color="black" >Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{this.state.resultados[27].Respuestas}</font></td> 
                                    </tr>
                            
                                    <tr>
                                    <td><font size="1"face="arial"color="black">Puedo cambiar el orden de las actividades que realizo en mi trabajo</font></td>   
                                    <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[28].Respuestas}</font></td> 
                                    </tr>
                                    
                                    </MDBTableBody>
                                    </MDBTable>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >VII.Cualquier tipo de cambio que ocurra en su trabajo</font><br/>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >(considere los últimos cambios realizados).	</font>

                                    </MDBTableBody>
                                    </MDBTable>

                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                                    <MDBTableBody>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Los cambios que se presentan en mi trabajo dificultan mi labor</font></td>   
                                      <td width="90px" ><font size="1"face="arial"color="black">{this.state.resultados[29].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas o aportaciones</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[30].Respuestas}</font></td> 
                                    </tr>
                                    
                                    </MDBTableBody>
                                    </MDBTable>
                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >VIII. capacitación e información que se le proporciona sobre su trabajo.</font>
                                    </MDBTableBody>
                                    </MDBTable>

                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                                    <MDBTableBody>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Me informan con claridad cuáles son mis funciones</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[31].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Me explican claramente los resultados que debo obtener en mi trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[32].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Me explican claramente los objetivos de mi trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[33].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Me informan con quién puedo resolver problemas o asuntos de trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[34].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Me permiten asistir a capacitaciones relacionadas con mi trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[35].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Recibo capacitación útil para hacer mi trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[36].Respuestas}</font></td> 
                                    </tr>
                                    
                                    </MDBTableBody>
                                    </MDBTable>
                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >IX. Jefes con quien tiene contacto.</font>
                                    </MDBTableBody>
                                    </MDBTable>

                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                                    <MDBTableBody>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Mi jefe ayuda a organizar mejor el trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[37].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Mi jefe tiene en cuenta mis puntos de vista y opiniones</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[38].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Mi jefe me comunica a tiempo la información relacionada con el trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[39].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">La orientación que me da mi jefe me ayuda a realizar mejor mi trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[40].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[41].Respuestas}</font></td> 
                                    </tr>
                                                                 
                                    </MDBTableBody>
                                    </MDBTable>
                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >X. Relaciones con sus compañeros.</font>
                                    </MDBTableBody>
                                    </MDBTable>

                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                                    <MDBTableBody>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Puedo confiar en mis compañeros de trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[42].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Entre compañeros solucionamos los problemas de trabajo de forma respetuosa</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[43].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">En mi trabajo me hacen sentir parte del grupo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[44].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Cuando tenemos que realizar trabajo de equipo los compañeros colaboran</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[45].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Mis compañeros de trabajo me ayudan cuando tengo dificultades</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[46].Respuestas}</font></td> 
                                    </tr>
                                                                 
                                    </MDBTableBody>
                                    </MDBTable>
                                    <br/>
                                    <br/>  
                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >XI. Información que recibe sobre su rendimiento en el trabajo, el reconocimiento</font><br/>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >el sentido de pertenencia y la estabilidad que le ofrece su trabajo.</font>

                                    </MDBTableBody>
                                    </MDBTable>
                                   
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                                    <MDBTableBody>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Me informan sobre lo que hago bien en mi trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[47].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">La forma como evalúan mi trabajo en mi centro de trabajo me ayuda a mejorar mi desempeño</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[48].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">En mi centro de trabajo me pagan a tiempo mi salario</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[49].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">El pago que recibo es el que merezco por el trabajo que realizo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[50].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Si obtengo los resultados esperados en mi trabajo me recompensan o reconocen</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[51].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Las personas que hacen bien el trabajo pueden crecer laboralmente</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[52].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Considero que mi trabajo es estable</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[53].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">En mi trabajo existe continua rotación de personal</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[54].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Siento orgullo de laborar en este centro de trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[55].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Me siento comprometido con mi trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[56].Respuestas}</font></td> 
                                    </tr>
                                                                 
                                    </MDBTableBody>
                                    </MDBTable>
                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >XII. Actos de violencia laboral (malos tratos, acoso, hostigamiento, acoso psicológico).</font>
                                    </MDBTableBody>
                                    </MDBTable>

                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                                    <MDBTableBody>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">En mi trabajo puedo expresarme libremente sin interrupciones</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[57].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Recibo críticas constantes a mi persona y/o trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[58].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[59].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[60].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[61].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[62].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[63].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">He presenciado actos de violencia en mi centro de trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[64].Respuestas}</font></td> 
                                    </tr>
                                                                                                  
                                    </MDBTableBody>
                                    </MDBTable>
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>  
                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >XIII. Atención a clientes y usuarios.</font>
                                    </MDBTableBody>
                                    </MDBTable>

                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                                    <MDBTableBody>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Atiendo clientes o usuarios muy enojados</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[65].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[66].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Para hacer mi trabajo debo demostrar sentimientos distintos a los míos</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[67].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Mi trabajo me exige atender situaciones de violencia</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[68].Respuestas}</font></td> 
                                    </tr>
                                    </MDBTableBody>
                                    </MDBTable>
                                    <MDBTable  component={Paper}  small  className="text-left">
                                    <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >Las actitudes de las personas que supervisa.</font>
                                    </MDBTableBody>
                                    </MDBTable>

                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                                    <MDBTableBody>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Comunican tarde los asuntos de trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[69].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Dificultan el logro de los resultados del trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[70].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Cooperan poco cuando se necesita</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[71].Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Ignoran las sugerencias para mejorar su trabajo</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{this.state.resultados[72].Respuestas}</font></td> 
                                    </tr>
                                    </MDBTableBody>
                                    </MDBTable>
                                </div>
                            </PDFExport>
                        </div>
                    </div>

          </section>
        </React.Fragment>
   
      </MDBContainer>
    } 
    let ponderacionIndividual 
    // console.log("esta es la validacion",this.state.getPonderacion,this.state.resultadosEvaluacion.length,this.state.resultadosQuery.length>0)
     if( this.state.resultadosEvaluacion.length > 0 && this.state.resultadosQuery.length>0){
    
      let respuesta1=this.state.resultadosEvaluacion[1].Respuestas;
      let respuesta2=this.state.resultadosEvaluacion[2].Respuestas;
      let respuesta3=this.state.resultadosEvaluacion[3].Respuestas;
      let respuesta4=this.state.resultadosEvaluacion[4].Respuestas;
      let respuesta5=this.state.resultadosEvaluacion[5].Respuestas;
      let respuesta6=this.state.resultadosEvaluacion[6].Respuestas;
      let respuesta7=this.state.resultadosEvaluacion[7].Respuestas;
      let respuesta8=this.state.resultadosEvaluacion[8].Respuestas;
      let respuesta9=this.state.resultadosEvaluacion[9].Respuestas;
      let respuesta10=this.state.resultadosEvaluacion[10].Respuestas;
      let respuesta11=this.state.resultadosEvaluacion[11].Respuestas;
      let respuesta12=this.state.resultadosEvaluacion[12].Respuestas;
      let respuesta13=this.state.resultadosEvaluacion[13].Respuestas;
      let respuesta14=this.state.resultadosEvaluacion[14].Respuestas;
      let respuesta15=this.state.resultadosEvaluacion[15].Respuestas;
      let respuesta16=this.state.resultadosEvaluacion[16].Respuestas;
      let respuesta17=this.state.resultadosEvaluacion[17].Respuestas;
      let respuesta18=this.state.resultadosEvaluacion[18].Respuestas;
      let respuesta19=this.state.resultadosEvaluacion[19].Respuestas;
      let respuesta20=this.state.resultadosEvaluacion[20].Respuestas;
      let respuesta21=this.state.resultadosEvaluacion[21].Respuestas;
      let respuesta22=this.state.resultadosEvaluacion[22].Respuestas;
      let respuesta23=this.state.resultadosEvaluacion[23].Respuestas;
      let respuesta24=this.state.resultadosEvaluacion[24].Respuestas;
      let respuesta25=this.state.resultadosEvaluacion[25].Respuestas;
      let respuesta26=this.state.resultadosEvaluacion[26].Respuestas;
      let respuesta27=this.state.resultadosEvaluacion[27].Respuestas;
      let respuesta28=this.state.resultadosEvaluacion[28].Respuestas;
      let respuesta29=this.state.resultadosEvaluacion[29].Respuestas;
      let respuesta30=this.state.resultadosEvaluacion[30].Respuestas;
      let respuesta31=this.state.resultadosEvaluacion[31].Respuestas;
      let respuesta32=this.state.resultadosEvaluacion[32].Respuestas;
      let respuesta33=this.state.resultadosEvaluacion[33].Respuestas;
      let respuesta34=this.state.resultadosEvaluacion[34].Respuestas;
      let respuesta35=this.state.resultadosEvaluacion[35].Respuestas;
      let respuesta36=this.state.resultadosEvaluacion[36].Respuestas;
      let respuesta37=this.state.resultadosEvaluacion[37].Respuestas;
      let respuesta38=this.state.resultadosEvaluacion[38].Respuestas;
      let respuesta39=this.state.resultadosEvaluacion[39].Respuestas;
      let respuesta40=this.state.resultadosEvaluacion[40].Respuestas;
      let respuesta41=this.state.resultadosEvaluacion[41].Respuestas;
      let respuesta42=this.state.resultadosEvaluacion[42].Respuestas;
      let respuesta43=this.state.resultadosEvaluacion[43].Respuestas;
      let respuesta44=this.state.resultadosEvaluacion[44].Respuestas;
      let respuesta45=this.state.resultadosEvaluacion[45].Respuestas;
      let respuesta46=this.state.resultadosEvaluacion[46].Respuestas;
      let respuesta47=this.state.resultadosEvaluacion[47].Respuestas;
      let respuesta48=this.state.resultadosEvaluacion[48].Respuestas;
      let respuesta49=this.state.resultadosEvaluacion[49].Respuestas;
      let respuesta50=this.state.resultadosEvaluacion[50].Respuestas;  
      let respuesta51=this.state.resultadosEvaluacion[51].Respuestas;
      let respuesta52=this.state.resultadosEvaluacion[52].Respuestas;
      let respuesta53=this.state.resultadosEvaluacion[53].Respuestas;
      let respuesta54=this.state.resultadosEvaluacion[54].Respuestas;
      let respuesta55=this.state.resultadosEvaluacion[55].Respuestas;
      let respuesta56=this.state.resultadosEvaluacion[56].Respuestas;
      let respuesta57=this.state.resultadosEvaluacion[57].Respuestas;
      let respuesta58=this.state.resultadosEvaluacion[58].Respuestas;
      let respuesta59=this.state.resultadosEvaluacion[59].Respuestas;
      let respuesta60=this.state.resultadosEvaluacion[60].Respuestas; 
      let respuesta61=this.state.resultadosEvaluacion[61].Respuestas;
      let respuesta62=this.state.resultadosEvaluacion[62].Respuestas;
      let respuesta63=this.state.resultadosEvaluacion[63].Respuestas;
      let respuesta64=this.state.resultadosEvaluacion[64].Respuestas;
      let respuesta65=this.state.resultadosEvaluacion[65].Respuestas;
      let respuesta66=this.state.resultadosEvaluacion[66].Respuestas;
      let respuesta67=this.state.resultadosEvaluacion[67].Respuestas;
      let respuesta68=this.state.resultadosEvaluacion[68].Respuestas;
      let respuesta69=this.state.resultadosEvaluacion[69].Respuestas;
      let respuesta70=this.state.resultadosEvaluacion[70].Respuestas;
      let respuesta71=this.state.resultadosEvaluacion[71].Respuestas;
      let respuesta72=this.state.resultadosEvaluacion[72].Respuestas;
      
      let valor1=this.state.resultadosEvaluacion[1].ponderacion;
      let valor2=this.state.resultadosEvaluacion[2].ponderacion;
      let valor3=this.state.resultadosEvaluacion[3].ponderacion;
      let valor4=this.state.resultadosEvaluacion[4].ponderacion;
      let valor5=this.state.resultadosEvaluacion[5].ponderacion;
      let valor6=this.state.resultadosEvaluacion[6].ponderacion;
      let valor7=this.state.resultadosEvaluacion[7].ponderacion;
      let valor8=this.state.resultadosEvaluacion[8].ponderacion;
      let valor9=this.state.resultadosEvaluacion[9].ponderacion;
      let valor10=this.state.resultadosEvaluacion[10].ponderacion;
      let valor11=this.state.resultadosEvaluacion[11].ponderacion;
      let valor12=this.state.resultadosEvaluacion[12].ponderacion;
      let valor13=this.state.resultadosEvaluacion[13].ponderacion;
      let valor14=this.state.resultadosEvaluacion[14].ponderacion;
      let valor15=this.state.resultadosEvaluacion[15].ponderacion;
      let valor16=this.state.resultadosEvaluacion[16].ponderacion;
      let valor17=this.state.resultadosEvaluacion[17].ponderacion;
      let valor18=this.state.resultadosEvaluacion[18].ponderacion;
      let valor19=this.state.resultadosEvaluacion[19].ponderacion;
      let valor20=this.state.resultadosEvaluacion[20].ponderacion;
      let valor21=this.state.resultadosEvaluacion[21].ponderacion;
      let valor22=this.state.resultadosEvaluacion[22].ponderacion;
      let valor23=this.state.resultadosEvaluacion[23].ponderacion;
      let valor24=this.state.resultadosEvaluacion[24].ponderacion;
      let valor25=this.state.resultadosEvaluacion[25].ponderacion;
      let valor26=this.state.resultadosEvaluacion[26].ponderacion;
      let valor27=this.state.resultadosEvaluacion[27].ponderacion;
      let valor28=this.state.resultadosEvaluacion[28].ponderacion;
      let valor29=this.state.resultadosEvaluacion[29].ponderacion;
      let valor30=this.state.resultadosEvaluacion[30].ponderacion;
      let valor31=this.state.resultadosEvaluacion[31].ponderacion;
      let valor32=this.state.resultadosEvaluacion[32].ponderacion;
      let valor33=this.state.resultadosEvaluacion[33].ponderacion;
      let valor34=this.state.resultadosEvaluacion[34].ponderacion;
      let valor35=this.state.resultadosEvaluacion[35].ponderacion;
      let valor36=this.state.resultadosEvaluacion[36].ponderacion;
      let valor37=this.state.resultadosEvaluacion[37].ponderacion;
      let valor38=this.state.resultadosEvaluacion[38].ponderacion;
      let valor39=this.state.resultadosEvaluacion[39].ponderacion;
      let valor40=this.state.resultadosEvaluacion[40].ponderacion;
      let valor41=this.state.resultadosEvaluacion[41].ponderacion;
      let valor42=this.state.resultadosEvaluacion[42].ponderacion;
      let valor43=this.state.resultadosEvaluacion[43].ponderacion;
      let valor44=this.state.resultadosEvaluacion[44].ponderacion;
      let valor45=this.state.resultadosEvaluacion[45].ponderacion;
      let valor46=this.state.resultadosEvaluacion[46].ponderacion;
      let valor47=this.state.resultadosEvaluacion[47].ponderacion;
      let valor48=this.state.resultadosEvaluacion[48].ponderacion;
      let valor49=this.state.resultadosEvaluacion[49].ponderacion;
      let valor50=this.state.resultadosEvaluacion[50].ponderacion;  
      let valor51=this.state.resultadosEvaluacion[51].ponderacion;
      let valor52=this.state.resultadosEvaluacion[52].ponderacion;
      let valor53=this.state.resultadosEvaluacion[53].ponderacion;
      let valor54=this.state.resultadosEvaluacion[54].ponderacion;
      let valor55=this.state.resultadosEvaluacion[55].ponderacion;
      let valor56=this.state.resultadosEvaluacion[56].ponderacion;
      let valor57=this.state.resultadosEvaluacion[57].ponderacion;
      let valor58=this.state.resultadosEvaluacion[58].ponderacion;
      let valor59=this.state.resultadosEvaluacion[59].ponderacion;
      let valor60=this.state.resultadosEvaluacion[60].ponderacion; 
      let valor61=this.state.resultadosEvaluacion[61].ponderacion;
      let valor62=this.state.resultadosEvaluacion[62].ponderacion;
      let valor63=this.state.resultadosEvaluacion[63].ponderacion;
      let valor64=this.state.resultadosEvaluacion[64].ponderacion;
      let valor65=this.state.resultadosEvaluacion[65].ponderacion;
      let valor66=this.state.resultadosEvaluacion[66].ponderacion;
      let valor67=this.state.resultadosEvaluacion[67].ponderacion;
      let valor68=this.state.resultadosEvaluacion[68].ponderacion;
      let valor69=this.state.resultadosEvaluacion[69].ponderacion;
      let valor70=this.state.resultadosEvaluacion[70].ponderacion;
      let valor71=this.state.resultadosEvaluacion[71].ponderacion;
      let valor72=this.state.resultadosEvaluacion[72].ponderacion;
      let entero1=parseInt(valor1);let entero2=parseInt(valor2);let entero3=parseInt(valor3);let entero4=parseInt(valor4);
      let entero5=parseInt(valor5);let entero6=parseInt(valor6);let entero7=parseInt(valor7);let entero8=parseInt(valor8);
      let entero9=parseInt(valor9);let entero10=parseInt(valor10);let entero11=parseInt(valor11);let entero12=parseInt(valor12);
      let entero13=parseInt(valor13);let entero14=parseInt(valor14);let entero15=parseInt(valor15);let entero16=parseInt(valor16);
      let entero17=parseInt(valor17);let entero18=parseInt(valor18);let entero19=parseInt(valor19);let entero20=parseInt(valor20);
      let entero21=parseInt(valor21);let entero22=parseInt(valor22);let entero23=parseInt(valor23);let entero24=parseInt(valor24);
      let entero25=parseInt(valor25);let entero26=parseInt(valor26);let entero27=parseInt(valor27);let entero28=parseInt(valor28);
      let entero29=parseInt(valor29);let entero30=parseInt(valor30);let entero31=parseInt(valor31);let entero32=parseInt(valor32);
      let entero33=parseInt(valor33);let entero34=parseInt(valor34);let entero35=parseInt(valor35);let entero36=parseInt(valor36);
      let entero37=parseInt(valor37);let entero38=parseInt(valor38);let entero39=parseInt(valor39);let entero40=parseInt(valor40);
      let entero41=parseInt(valor41);let entero42=parseInt(valor42);let entero43=parseInt(valor43);let entero44=parseInt(valor44);
      let entero45=parseInt(valor45);let entero46=parseInt(valor46);let entero47=parseInt(valor47);let entero48=parseInt(valor48);
      let entero49=parseInt(valor49);let entero50=parseInt(valor50);let entero51=parseInt(valor51);let entero52=parseInt(valor52);
      let entero53=parseInt(valor53);let entero54=parseInt(valor54);let entero55=parseInt(valor55);let entero56=parseInt(valor56);
      let entero57=parseInt(valor57);let entero58=parseInt(valor58);let entero59=parseInt(valor59);let entero60=parseInt(valor60);
      let entero61=parseInt(valor61);let entero62=parseInt(valor62);let entero63=parseInt(valor63);let entero64=parseInt(valor64);
      let entero65=parseInt(valor65);let entero66=parseInt(valor66);let entero67=parseInt(valor67);let entero68=parseInt(valor68);
      let entero69=parseInt(valor69);let entero70=parseInt(valor70);let entero71=parseInt(valor71);let entero72=parseInt(valor72);
    
        let total = (entero1+entero2+entero3+entero4+entero5+entero6+entero7+entero8+entero9+entero10+entero11+entero12+entero13+entero14+entero15+entero16+entero17+entero18+entero19+entero20+entero21+entero22+entero23+entero24+entero25+entero26+entero27+entero28+entero29+entero30+entero31+entero32+entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46+entero47+entero48+entero49+entero50+entero51+entero52+entero53+entero54+entero55+entero56+entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64+entero65+entero66+entero67+entero68+entero69+entero70+entero71+entero72).toFixed(2);
        let celda1;
        let celda2;
        let celda3;
        let celda4;
        let celda5;
        let criterios;
    
        let color;
        if(total<50){
        criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
        color =<TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
        celda1 = <TableCell style={{backgroundColor: "#9BE0F7"}} align="right">{total}</TableCell>
        }else if(total>=50 && total <= 75){
          criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align=" justify">Es necesario una mayor difusión de la política de prevención de riesgos
          psicosociales y programas para: la prevención de los factores de riesgo
          psicosocial, la promoción de un entorno organizacional favorable y la
          prevención de la violencia laboral.</font></TableCell>
          color= <TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black" >Bajo</font></TableCell>
          celda2 = <TableCell style={{backgroundColor: "#6BF56E"}} align="right">{total}</TableCell>
        }else if(total>=75 && total <= 99){
          criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align=" justify">Se requiere revisar la política de prevención de riesgos psicosociales y
            programas para la prevención de los factores de riesgo psicosocial, la
            promoción de un entorno organizacional favorable y la prevención de la
            violencia laboral, así como reforzar su aplicación y difusión, mediante un
            Programa de intervención.</font></TableCell>
          color=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
          celda3 = <TableCell style={{backgroundColor: "#FFFF00"}} align="right">{total}</TableCell>
        }else if(total>=99 && total <= 140){
          criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align=" justify">Se requiere realizar un análisis de cada categoría y dominio, de manera que
          se puedan determinar las acciones de intervención apropiadas a través de un
          Programa de intervención, que podrá incluir una evaluación específica y
          deberá incluir una campaña de sensibilización, revisar la política de
          prevención de riesgos psicosociales y programas para la prevención de los
          factores de riesgo psicosocial, la promoción de un entorno organizacional
          favorable y la prevención de la violencia laboral, así como reforzar su
          aplicación y difusión.</font></TableCell>
          color = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black" >Alto</font></TableCell>
         celda4 = <TableCell style={{backgroundColor: "#FFC000"}} align="right">{total}</TableCell>
        }
        else if( total > 140){
          criterios = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="1" face="arial"color="black" align=" justify">Se requiere realizar el análisis de cada categoría y dominio para establecer
          las acciones de intervención apropiadas, mediante un Programa de
          intervención que deberá incluir evaluaciones específicas, y contemplar
          campañas de sensibilización, revisar la política de prevención de riesgos
          psicosociales y programas para la prevención de los factores de riesgo
          psicosocial, la promoción de un entorno organizacional favorable y la
          prevención de la violencia laboral, así como reforzar su aplicación y difusión.</font></TableCell>
          color = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
          celda5  = <TableCell style={{backgroundColor: "#FF0000"}} align="right">{total}</TableCell>
        }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    let categoria1Nulo;
    let categoria1Bajo;
    let categoria1Medio;
    let categoria1Alto;
    let categoria1MuyAlto;
    let categoriaUno = (entero1+entero3+entero2+entero4+entero5).toFixed(2);
    let colorCategoriaUno;
    console.log("categotia1",entero1,entero3,entero2,entero4,entero5)
    if(categoriaUno < 5){
      categoria1Nulo= categoriaUno
      colorCategoriaUno  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
    }else if(categoriaUno >= 5 && categoriaUno < 9){
      colorCategoriaUno =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      categoria1Bajo= categoriaUno
    }else if(categoriaUno >= 9 && categoriaUno < 11){
      colorCategoriaUno=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      categoria1Medio= categoriaUno
    }else if(categoriaUno >= 11 && categoriaUno < 14){
      colorCategoriaUno = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      categoria1Alto= categoriaUno
    }else if(categoriaUno >= 14){
      colorCategoriaUno = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      categoria1MuyAlto= categoriaUno
    }
    
    let categoria2Nulo;
    let categoria2Bajo;
    let categoria2Medio;
    let categoria2Alto;
    let categoria2MuyAlto;
    let colorCategoriaDos;
    let categoriaDos = (entero6+entero12+entero7+entero8+entero9+entero10+entero11+entero65+entero66+entero67+entero68+entero13+entero14+entero15+entero16+entero25+entero26+entero27+entero28+entero23+entero24+entero29+entero30+entero35+entero36).toFixed(2);
    if(categoriaDos < 15){
      colorCategoriaDos  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      categoria2Nulo= categoriaDos
    }else if(categoriaDos >= 15 && categoriaDos < 30){
      colorCategoriaDos =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      categoria2Bajo= categoriaDos
    }else if(categoriaDos >=30 && categoriaDos < 45){
      colorCategoriaDos=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      categoria2Medio= categoriaDos
    }else if(categoriaDos >=45 && categoriaDos < 60){
      colorCategoriaDos = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      categoria2Alto= categoriaDos
    }else if(categoriaDos >= 60){
      colorCategoriaDos = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      categoria2MuyAlto= categoriaDos
    }
    let categoria3Nulo;
    let categoria3Bajo;
    let categoria3Medio;
    let categoria3Alto;
    let categoria3MuyAlto;
    let colorCategoriaTre;
    let categoriaTre = (entero17+entero18+entero19+entero20+entero21+entero22).toFixed(2);
    if(categoriaTre < 5){
      colorCategoriaTre  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      categoria3Nulo= categoriaTre
    }else if(categoriaTre >= 5 && categoriaTre < 7){
      colorCategoriaTre =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      categoria3Bajo= categoriaTre
    }else if(categoriaTre >=7 && categoriaTre < 10){
      colorCategoriaTre=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      categoria3Medio= categoriaTre
    }else if(categoriaTre >=10 && categoriaTre < 13){
      colorCategoriaTre = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      categoria3Alto= categoriaTre
    }else if(categoriaTre >= 13){
      categoria3MuyAlto= categoriaTre
      colorCategoriaTre = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
    }
    
    let categoria4Nulo;
    let categoria4Bajo;
    let categoria4Medio;
    let categoria4Alto;
    let categoria4MuyAlto;
    let colorCategoriaCuatro;
    let categoriaCuatro = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72+entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64).toFixed(2);
    if(categoriaCuatro < 14){
      colorCategoriaCuatro  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      categoria4Nulo= categoriaCuatro
    }else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
      colorCategoriaCuatro =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      categoria4Bajo= categoriaCuatro
    }else if(categoriaCuatro >=29 && categoriaCuatro < 42){
      colorCategoriaCuatro=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      categoria4Medio= categoriaCuatro
    }else if(categoriaCuatro >=42 && categoriaCuatro < 58){
      colorCategoriaCuatro = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      categoria4Alto= categoriaCuatro
    }else if(categoriaCuatro >= 58){
      colorCategoriaCuatro= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      categoria4MuyAlto= categoriaCuatro
    }
    
    let categoria5Nulo;
    let categoria5Bajo;
    let categoria5Medio;
    let categoria5Alto;
    let categoria5MuyAlto;
    let colorCategoriaCinco;
    let categoriaCinco = (entero47+entero48+entero49+entero50+entero51+entero52+entero55+entero56+entero53+entero54).toFixed(2);
    if(categoriaCinco < 10){
      colorCategoriaCinco  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      categoria5Nulo= categoriaCinco
    }else if(categoriaCinco >= 10 && categoriaCinco < 14){
      colorCategoriaCinco=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      categoria5Bajo= categoriaCinco
    }else if(categoriaCinco >=14 && categoriaCinco < 18){
      colorCategoriaCinco=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      categoria5Medio= categoriaCinco
    }else if(categoriaCinco >=18 && categoriaCinco < 23){
      colorCategoriaCinco = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      categoria5Alto= categoriaCinco
    }else if(categoriaCinco >= 23){
      colorCategoriaCinco= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      categoria5MuyAlto= categoriaCinco
    }
    
    
    let Dominio1Nulo;
    let Dominio1Bajo;
    let Dominio1Medio;
    let Dominio1Alto;
    let Dominio1MuyAlto;
    let DominioUno = (entero1+entero3+entero2+entero4+entero5).toFixed(2);
    let colorDominioUno;
    if(DominioUno < 5){
      colorDominioUno  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio1Nulo= DominioUno
    }else if(DominioUno >= 5 && DominioUno < 9){
      colorDominioUno=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio1Bajo= DominioUno
    }else if(DominioUno >= 9 && DominioUno < 11){
      colorDominioUno=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio1Medio= DominioUno
    }else if(DominioUno >=11 && DominioUno < 14){
      colorDominioUno = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio1Alto= DominioUno
    }else if(DominioUno >= 14){
      colorDominioUno= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio1MuyAlto= DominioUno
    }
    
    let Dominio2Nulo;
    let Dominio2Bajo;
    let Dominio2Medio;
    let Dominio2Alto;
    let Dominio2MuyAlto;
    let colorDominioDos;
    let DominioDos = (entero6+entero12+entero7+entero8+entero9+entero10+entero11+entero65+entero66+entero67+entero68+entero13+entero14+entero15+entero16).toFixed(2);
    if(DominioDos < 15){
      colorDominioDos  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio2Nulo= DominioDos
    }else if(DominioDos >= 15 && DominioDos < 21){
      colorDominioDos=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio2Bajo= DominioDos
    }else if(DominioDos >= 21 && DominioDos < 27){
      colorDominioDos=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio2Medio= DominioDos
    }else if(DominioDos >= 27 && DominioDos < 37){
      colorDominioDos = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio2Alto= DominioDos
    }else if(DominioDos >= 37){
      colorDominioDos= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio2MuyAlto= DominioDos
    }
    
    let Dominio3Nulo;
    let Dominio3Bajo;
    let Dominio3Medio;
    let Dominio3Alto;
    let Dominio3MuyAlto;
    let colorDominioTres;
    let DominioTres = (entero25+entero26+entero27+entero28+entero23+entero24+entero29+entero30+entero35+entero36).toFixed(2);
    if(DominioTres < 11){
      colorDominioTres  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio3Nulo= DominioTres
    }else if(DominioTres >= 11 && DominioTres < 16){
      colorDominioTres=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio3Bajo= DominioTres
    }else if(DominioTres >= 16 && DominioTres < 21){
      colorDominioTres=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio3Medio= DominioTres
    }else if(DominioTres >= 21 && DominioTres < 25){
      colorDominioTres = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio3Alto= DominioTres
    }else if(DominioTres >= 25){
      colorDominioTres= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio3MuyAlto= DominioTres
    }
    
    let Dominio4Nulo;
    let Dominio4Bajo;
    let Dominio4Medio;
    let Dominio4Alto;
    let Dominio4MuyAlto;
    let colorDominioCuatro;
    let DominioCuatro = (entero17+entero18).toFixed(2);
    if(DominioCuatro < 1){
      colorDominioCuatro  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio4Nulo= DominioCuatro
    }else if(DominioCuatro >= 1 && DominioCuatro < 2){
      colorDominioCuatro=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio4Bajo= DominioCuatro
    }else if(DominioCuatro >= 2 && DominioCuatro < 4){
      colorDominioCuatro=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio4Medio= DominioCuatro
    }else if(DominioCuatro >= 4 && DominioCuatro < 6){
      colorDominioCuatro = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio4Alto= DominioCuatro
    }else if(DominioCuatro >= 6){
      colorDominioCuatro= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio4MuyAlto= DominioCuatro
    }
    
    let Dominio5Nulo;
    let Dominio5Bajo;
    let Dominio5Medio;
    let Dominio5Alto;
    let Dominio5MuyAlto;
    let colorDominioCinco;
    let DominioCinco = (entero19+entero20+entero21+entero22).toFixed(2);
    if(DominioCinco < 4){
      colorDominioCinco  = <TableCell width="15px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio5Nulo= DominioCinco
    }else if(DominioCinco >= 4 && DominioCinco < 6){
      colorDominioCinco=<TableCell width="15px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio5Bajo= DominioCinco
    }else if(DominioCinco >= 6 && DominioCinco < 8){
      colorDominioCinco=<TableCell width="15px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio5Medio= DominioCinco
    }else if(DominioCinco >= 8 && DominioCinco < 10){
      colorDominioCinco = <TableCell  width="15px"style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio5Alto= DominioCinco
    }else if(DominioCinco >= 10){
      colorDominioCinco= <TableCell  width="15px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio5MuyAlto= DominioCinco
    }
    
    let Dominio6Nulo;
    let Dominio6Bajo;
    let Dominio6Medio;
    let Dominio6Alto;
    let Dominio6MuyAlto;
    let colorDominioSeis;
    let DominioSeis = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41).toFixed(2);
    if(DominioSeis < 9){
      colorDominioSeis  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio6Nulo= DominioSeis
    }else if(DominioSeis >= 9 && DominioSeis < 12){
      colorDominioSeis=<TableCell  width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio6Bajo= DominioSeis
    }else if(DominioSeis >= 12 && DominioSeis < 16){
      colorDominioSeis=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio6Medio= DominioSeis
    }else if(DominioSeis >= 16 && DominioSeis < 20){
      colorDominioSeis = <TableCell width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio6Alto= DominioSeis
    }else if(DominioSeis >= 20){
      colorDominioSeis= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio6MuyAlto= DominioSeis
    }
    
    let Dominio7Nulo;
    let Dominio7Bajo;
    let Dominio7Medio;
    let Dominio7Alto;
    let Dominio7MuyAlto;
    let colorDominioSiete;
    let DominioSiete = (entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72).toFixed(2);
    if(DominioSiete < 10){
      colorDominioSiete  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio7Nulo= DominioSiete
    }else if(DominioSiete >= 10 && DominioSiete < 13){
      colorDominioSiete=<TableCell width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio7Bajo= DominioSiete
    }else if(DominioSiete >= 13 && DominioSiete < 17){
      colorDominioSiete=<TableCell  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio7Medio= DominioSiete
    }else if(DominioSiete >= 17 && DominioSiete < 21){
      colorDominioSiete = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
    Dominio7Alto= DominioSiete
    }else if(DominioSiete >= 21){
      colorDominioSiete= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio7MuyAlto= DominioSiete
    }
    
    let Dominio8Nulo;
    let Dominio8Bajo;
    let Dominio8Medio;
    let Dominio8Alto;
    let Dominio8MuyAlto;
    let colorDominioOcho;
    let DominioOcho = (entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64).toFixed(2);
    if(DominioOcho < 7){
      colorDominioOcho  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio8Nulo= DominioOcho
    }else if(DominioOcho >= 7 && DominioOcho < 10){
      colorDominioOcho  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio8Bajo= DominioOcho
    }else if(DominioOcho >= 10 && DominioOcho < 13){
      colorDominioOcho=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio8Medio= DominioOcho
    }else if(DominioOcho >= 13 && DominioOcho < 16){
      colorDominioOcho = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio8Alto= DominioOcho
    }else if(DominioOcho >= 16){
      colorDominioOcho= <TableCell width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio8MuyAlto= DominioOcho
    }
    
    let Dominio9Nulo;
    let Dominio9Bajo;
    let Dominio9Medio;
    let Dominio9Alto;
    let Dominio9MuyAlto;
    let colorDominioNueve;
    let DominioNueve = (entero47+entero48+entero49+entero50+entero51+entero52).toFixed(2);
    if(DominioNueve < 6){
      colorDominioNueve  = <TableCell width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio9Nulo= DominioNueve
    }else if(DominioNueve >= 6 && DominioNueve < 10){
      colorDominioNueve  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio9Bajo= DominioNueve
    }else if(DominioNueve >= 10 && DominioNueve < 14){
      colorDominioNueve=<TableCell  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio9Medio= DominioNueve
    }else if(DominioNueve >= 14 && DominioNueve < 18){
      colorDominioNueve = <TableCell  width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio9Alto= DominioNueve
    }else if(DominioNueve >= 18){
      colorDominioNueve= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio9MuyAlto= DominioNueve
    }
    
    let Dominio10Nulo;
    let Dominio10Bajo;
    let Dominio10Medio;
    let Dominio10Alto;
    let Dominio10MuyAlto;
    let colorDominioDiez;
    let DominioDiez = (entero55+entero56+entero53+entero54).toFixed(2);
    if(DominioDiez < 4){
      colorDominioDiez  = <TableCell width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio10Nulo= DominioDiez
    }else if(DominioDiez >= 4 && DominioDiez < 6){
      colorDominioDiez  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio10Bajo= DominioDiez
    }else if(DominioDiez >= 6 && DominioDiez < 8){
      colorDominioDiez=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio10Medio= DominioDiez
    }else if(DominioDiez >= 8 && DominioDiez < 10){
      colorDominioDiez = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio10Alto= DominioDiez
    }else if(DominioDiez >= 10){
      colorDominioDiez= <TableCell  width="20px"style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio10MuyAlto= DominioDiez
    }
     
    ponderacionIndividual =  <React.Fragment>
            <Alert className ="mt-4" color ="primary ">Resultados de la aplicación de la evaluación EEO </Alert>

                 <div>
                        <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save();}}>
                            Descargar Resultados de {this.state.resultadosQuery[0].nombre} {this.state.resultadosQuery[0].ApellidoP} {this.state.resultadosQuery[0].ApellidoM}
                        </MDBBtn>
               </div>
                               
                    <MDBContainer  style={{marginLeft:"5%",marginTop:20}}>
                    <font face="arial" className = "mt-4" >CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO</font>
                    <br/><strong>{localStorage.getItem("razonsocial")}</strong><br/>
              
                    <MDBTable responsive small borderless className="text-left mt-4 ">
           
                    <MDBTableBody>  
                    <tr>
                        <td width ="65%"> <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100,marginBottom:20}}/></td>
                        <td width ="35%">
                        <img src={diagnostico} alt="logo" style = {{width:150,marginBottom:20}}/>
    
                        </td>
                      </tr>                
                      <tr>
                      <td width ="65%" >Nombre : {this.state.resultadosQuery[0].nombre} {this.state.resultadosQuery[0].ApellidoP} {this.state.resultadosQuery[0].ApellidoM} </td>
                      <td width ="35%">Puesto : {this.state.resultadosQuery[0].Puesto}</td>
                                    </tr>
                                    <tr>
                      <td width ="65%">Departamento : {this.state.resultadosQuery[0].AreaTrabajo}</td>
                      <td width ="35%">Genero : {this.state.resultadosQuery[0].Sexo}</td> 
                                    </tr>
                                    <tr>
                      <td width ="65%">Correo : {this.state.resultadosQuery[0].correo}</td>
                      <td width ="35%">RFC : {this.state.resultadosQuery[0].RFC}</td>   
                      </tr>
                    </MDBTableBody>
                    </MDBTable>
                    </MDBContainer>
    
        <TableContainer  component={Paper} style={{marginBottom:30}}>
              <Table  borderless  size="small" aria-label="a dense table" >
              <TableRow>
                      <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}} width="50%"><strong>RESULTADOS GENERALES</strong></TableCell>              
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell component="th" scope="row" ></TableCell>
                      <TableCell component="th" scope="row" ></TableCell>
                      <TableCell component="th" scope="row" ></TableCell>
                      <TableCell component="th" scope="row" ></TableCell>  
                    </TableRow>
                <TableHead>
                  <TableRow>
                    <TableCell width ="10%"></TableCell>
                    <TableCell align="right" style={{backgroundColor: "#9BE0F7"}}>NULO</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#6BF56E"}}>BAJO&nbsp;</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FFFF00"}}>MEDIO&nbsp;</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FFC000"}}>ALTO&nbsp;</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FF0000"}}>MUY alto&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody  style={{marginTop:20}}>
                  
                    <TableRow>
                      <TableCell component="th" scope="row">
                    Puntuación total
                      </TableCell>
                      <TableCell component="th" scope="row"align="center">{celda1}</TableCell>
                      <TableCell component="th" scope="row"align="center">{celda2}</TableCell>
                      <TableCell component="th" scope="row"align="center">{celda3}</TableCell>
                      <TableCell component="th" scope="row"align="center">{celda4}</TableCell>
                      <TableCell component="th" scope="row"align="center">{celda5}</TableCell>
                    
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        
    
        
            <TableContainer component={Paper} style={{marginBottom:30}}>
              <Table  size="small" aria-label="a dense table" >
                <TableHead>
                  <TableRow>
                    <TableCell width="50%" ></TableCell>
                    <TableCell align="right" style={{backgroundColor: "#9BE0F7"}}>NULO</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#6BF56E"}}>BAJO&nbsp;</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FFFF00"}}>MEDIO&nbsp;</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FFC000"}}>ALTO&nbsp;</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FF0000"}}>MUY ALTO&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody  style={{marginTop:20}}>       
                    <TableRow>
                      <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS DE LA CATEGORÍA</strong></TableCell>              
                      <TableCell component="th" scope="row"align="center"></TableCell>
                      <TableCell component="th" scope="row" align="center"></TableCell>
                      <TableCell component="th" scope="row" align="center"></TableCell>
                      <TableCell component="th" scope="row" align="center"></TableCell>
                      <TableCell component="th" scope="row" align="center"></TableCell>  
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >I. Ambiente de Trabajo</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria1Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria1Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria1Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria1Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria1MuyAlto}</TableCell>           
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >II. Factores propios de la actividad</TableCell>   
                    <TableCell component="th" scope="row" align="center">{categoria2Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria2Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria2Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria2Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria2MuyAlto}</TableCell>    
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >III. Organización del tiempo de trabajo</TableCell>   
                    <TableCell component="th" scope="row" align="center">{categoria3Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria3Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria3Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria3Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria3MuyAlto}</TableCell>    
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >IV. Liderazgo y relaciones en el trabajo</TableCell>   
                    <TableCell component="th" scope="row" align="center">{categoria4Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria4Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria4Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria4Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria4MuyAlto}</TableCell>           
                    </TableRow>
    
                    <TableRow>
                    <TableCell component="th" scope="row" >V. Entorno organizacional</TableCell>   
                    <TableCell component="th" scope="row" align="center">{categoria5Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria5Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria5Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria5Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria5MuyAlto}</TableCell>           
                    </TableRow>
                   
                    <TableRow>
                      <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS DEL DOMINIO</strong></TableCell>              
                      <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                      <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                      <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                      <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                      <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
        
                    </TableRow>
                    
                    <TableRow>
                    <TableCell component="th" scope="row" >I. Condiciones en el ambiente de trabajo</TableCell> 
                    <TableCell component="th" scope="row" align="center">{Dominio1Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio1Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio1Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio1Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio1MuyAlto}</TableCell>
        
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >II. Carga de trabajo</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio2Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio2Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio2Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio2Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio2MuyAlto}</TableCell>       
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >III. Falta de control sobre el trabajo</TableCell>     
                    <TableCell component="th" scope="row" align="center">{Dominio3Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio3Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio3Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio3Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio3MuyAlto}</TableCell>       
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >IV. Jornada de trabajo</TableCell>  
                    <TableCell component="th" scope="row" align="center">{Dominio4Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio4Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio4Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio4Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio4MuyAlto}</TableCell>         
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >V. Interferencia en la relación trabajo-familia</TableCell>           
                    <TableCell component="th" scope="row" align="center">{Dominio5Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio5Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio5Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio5Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio5MuyAlto}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >VI. Liderazgo</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio6Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio6Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio6Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio6Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio6MuyAlto}</TableCell>       
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >VII. Relaciones en el trabajo</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio7Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio7Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio7Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio7Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio7MuyAlto}</TableCell>       
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >VIII. Violencia</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio8Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio8Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio8Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio8Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio8MuyAlto}</TableCell>        
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >IX. Reconocimiento del desempeño</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio9Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio9Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio9Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio9Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio9MuyAlto}</TableCell>       
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >XX. Insuficiente sentido de pertenencia e, inestabilidad</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio10Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio10Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio10Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio10Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio10MuyAlto}</TableCell>        
                    </TableRow>
                    <TableRow>
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS POR DIMENSIÓN</strong></TableCell>              
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
    
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >1.- Condiciones peligrosas e inseguras</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero1+entero3).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" width="50%" >2.- Condiciones deficientes e insalubres</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero2+entero4).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow> 
               
                <TableRow>
                <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {entero5.toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" width="50%">4.- Cargas cuantitativas</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero6+entero12).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >5.- Ritmos de trabajo acelerado</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero7+entero8).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero9+entero10+entero11).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero65+entero66+entero67+entero68).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >8.- Cargas de alta responsabilidad</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero13+entero14).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >9.- Cargas contradictorias o inconsistentes</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero15+entero16).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" width="50%" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero25+entero26+entero27+entero28).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero23+entero24).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
    
                <TableRow>
                <TableCell component="th" scope="row" >12.- Insuficiente participación y manejo del cambio</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero29+entero30).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
    
                <TableRow>
                <TableCell component="th" scope="row" >13.- Limitada o inexistente capacitación</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero35+entero36).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >14.- Jornadas de trabajo extensas</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero17+entero18).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >15.- Influencia del trabajo fuera del centro laboral</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero19+entero20).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >16.- Influencia de las responsabilidades familiares</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero21+entero22).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >17.- Escasa claridad de funciones</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero31+entero32+entero33+entero34).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >18.- Características del liderazgo</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero37+entero38+entero39+entero40+entero41).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >19.- Relaciones sociales en el trabajo</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero42+entero43+entero44+entero45+entero46).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >20.- Deficiente relación con los colaboradores que supervisa</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero69+entero70+entero71+entero72).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >21.- Violencia laboral</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >22.- Escasa o nula retroalimentación del desempeño</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero47+entero48).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
    
                <TableRow>
                <TableCell component="th" scope="row" >23.- Escaso o nulo reconocimiento y compensación</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero49+entero50+entero51+entero52).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >24.- Limitado sentido de pertenencia</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero55+entero56).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >25.- Inestabilidad laboral</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {(entero53+entero54).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
              </TableBody>
              </Table>        
              </TableContainer>

              <div>
                    <div className="example-config">           
                    </div>
                    <div style={{ position: "absolute", left: "-1000px", top: 0 }}>
                        <PDFExport
                            paperSize="letter"
                            margin="1cm"
                            pageNum
                            pageTemplate={PageTemplate}
                            forcePageBreak=".page-break"
                            fileName={`${this.state.resultadosQuery[0].nombre} ${this.state.resultadosQuery[0].ApellidoP} ${this.state.resultadosQuery[0].ApellidoM} Reporte EEO ${new Date().getFullYear()}`}
                            ref={(component) => this.pdfExportComponent = component}
                        >
                            <div style={{ width: "500px" }}>
                            
                                <MDBRow style={{marginBottom:10}}> 
                                <MDBCol>
                                <img src={diagnostico} alt="logo" style = {{width:150,marginLeft:20,heigth:50}}/>
                        
                                <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,marginLeft:230,heigth:20}}/>
                                </MDBCol> 
                                </MDBRow> 
                                <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                                <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left mt-4 ">
                                  
                                        <MDBTableBody>     
                                <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                                <font size="1"face="arial"color="black">{this.state.resultadosQuery[0].nombre} {this.state.resultadosQuery[0].ApellidoP} {this.state.resultadosQuery[0].ApellidoM}</font><br></br><br/>
                                <font size="3"face="arial"color="black">Diagnóstico individual de factores de riesgo psicosocial y evaluación de entorno organizacional en los centros de trabajo</font><br></br>
                                <font size="1"face="arial"color="black">{this.state.fecha}</font>
                                </MDBTableBody>
                                </MDBTable>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <br></br>
                                  <font size="1"
                                  face="arial"
                                  color="black" style = {{marginTop:25,marginLeft:35}}>GUÍA DE REFERENCIA III
                                  CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO </font>   <br/>  
                                  <font size="1"  face="arial"
                                  color="black" style = {{marginLeft:35}}>PSICOSOCIAL Y
                                  EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO</font>
                                    <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
                                        <MDBTableBody>
                                        <tr>
                                          <td width="40%"><font size="1" face="arial"color="black"><strong>{this.state.resultadosQuery[0].nombre} {this.state.resultadosQuery[0].ApellidoP} {this.state.resultadosQuery[0].ApellidoM}</strong></font></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                       </tr>
                                       <tr>
                                       <td width="40%"><font size="1" face="arial"color="black">RESULTADO DEL CUESTIONARIO :  </font></td>
                                       <td width="20%"><font size="1" face="arial"color="black">{total}</font></td>
                                       <td width="20%"><font size="1" face="arial"color="black">Nivel de riesgo </font></td>
                                        {color}
                                       </tr>                                  
                                       </MDBTableBody>
                                        </MDBTable>  
                                        <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
                                        <MDBTableBody>
                                        <tr>
                                          <td ><font size="1" face="arial"color="black"><strong>Necesidad de la acción :</strong></font></td>
                                       </tr>         
                                       <tr>
                                       {criterios}
                                         </tr>                     
                                       </MDBTableBody>
                                        </MDBTable>  
    
                                       <MDBTable  component={Paper}  small  className="text-left ">
                                         <MDBTableBody>
                                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">I.- Resultados de la categoría</font>
                                        </MDBTableBody>                                                                            
                                        </MDBTable>
                                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                          <MDBTableBody>
                                              
                                             <tr >                              
                                              <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Categoría</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
                                              <td width="20px"><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                            </tr>
                                            <tr>           
                                            <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
                                            <td width="60px"  className="text-left"><font size="1" face="arial"color="black">Ambiente de Trabajo</font></td>
                                            <td width="15px"><font size="1" face="arial"color="black">{categoriaUno}</font></td>
                                             {colorCategoriaUno}                
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Factores propios de la actividad</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{categoriaDos}</font></td>
                                               {colorCategoriaDos}
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Organización del tiempo de trabajo</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{categoriaTre}</font></td>
                                              {colorCategoriaTre}
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Liderazgo y relaciones en el trabajo</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{categoriaCuatro}</font></td>
                                              {colorCategoriaCuatro}
                                              </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Entorno organizacional</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{categoriaCinco}</font></td>
                                              {colorCategoriaCinco}  
                                            </tr>
                   
                                          </MDBTableBody>
                                          </MDBTable>
                                          <MDBTable  component={Paper}  small  className="text-left ">
                                         <MDBTableBody>
                                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">II.- Resultados del dominio</font>
                                        </MDBTableBody>                                                                            
                                        </MDBTable>
                                          <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                          <MDBTableBody>
                                              
                                             <tr >                              
                                              <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Dominio</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
                                              <td width="20px"><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                            </tr>
                                            <tr>           
                                            <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
                                            <td width="60px"  className="text-left"><font size="1" face="arial"color="black">Carga de Trabajo</font></td>
                                            <td width="15px"><font size="1" face="arial"color="black">{DominioUno}</font></td>
                                             {colorDominioUno}                
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Condiciones en el ambiente de trabajo</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{DominioDos}</font></td>
                                               {colorDominioDos}
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Falta de control sobre el trabajo</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{DominioTres}</font></td>
                                              {colorDominioTres}
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Interferencia en la relación trabajo-familia</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{DominioCuatro}</font></td>
                                              {colorDominioCuatro}
                                              </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Jornada de trabajo</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{DominioCinco}</font></td>
                                              {colorDominioCinco}  
                                            </tr>
                                            
                                          </MDBTableBody>
                                          </MDBTable>
                                          <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                          <MDBTableBody>
                                              <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >6</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Liderazgo</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{DominioSeis}</font></td>
                                              {colorDominioSeis}  
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >7</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Relaciones en el trabajo</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{DominioSiete}</font></td>
                                              {colorDominioSiete}  
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >8</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Violencia</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{DominioOcho}</font></td>
                                              {colorDominioOcho}  
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >9</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Reconocimiento del desempeño</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{DominioNueve}</font></td>
                                              {colorDominioNueve}  
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >10</font></td>
                                              <td width="60px" className="text-left"><font size="1" face="arial"color="black">Insuficiente sentido de pertenencia e, inestabilidad</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{DominioDiez}</font></td>
                                              {colorDominioDiez}  
                                            </tr>
                                          </MDBTableBody>
                                          </MDBTable>
    
                                          <MDBTable  component={Paper}  small  className="text-left ">
                                         <MDBTableBody>
                                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">III.- Resultados por Dimensión</font>
                                        </MDBTableBody>                                                                            
                                        </MDBTable>
                                          <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                          <MDBTableBody>
                                              
                                             <tr >                              
                                              <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Dimensión</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
                                            </tr>
                                            <tr>           
                                            <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
                                            <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Condiciones peligrosas e inseguras</font></td>
                                            <td width="15px"><font size="1" face="arial"color="black">{(entero1+entero3).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero2+entero4).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{entero5.toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero6+entero12).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero7+entero8).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >6</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Carga mental</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero9+entero10+entero11).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >7</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero65+entero66+entero67+entero68).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >8</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero13+entero14).toFixed(2)}</font></td>
                                            </tr>
    
    
                                            <tr>           
                                            <td width="5px"><font size="1" face="arial"color="black" >9</font></td>
                                            <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
                                            <td width="15px"><font size="1" face="arial"color="black">{(entero15+entero16).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >10</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero25+entero26+entero27+entero28).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >11</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero23+entero24).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >12</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Insuficiente participación y manejo del cambio</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero29+entero30).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >13</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero35+entero36).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >14</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero17+entero18).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >15</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero19+entero20).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >16</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero21+entero22).toFixed(2)}</font></td>
                                            </tr>
    
                                            <tr>           
                                            <td width="5px"><font size="1" face="arial"color="black" >17</font></td>
                                            <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
                                            <td width="15px"><font size="1" face="arial"color="black">{(entero31+entero32+entero33+entero34).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >18</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero37+entero38+entero39+entero40+entero41).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >19</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Relaciones sociales en el trabajo</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero42+entero43+entero44+entero45+entero46).toFixed(2)}</font></td>
                                            </tr>
    
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >20</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero69+entero70+entero71+entero72).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >21</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Violencia laboral</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >22</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Escasa o nula retroalimentación del desempeño</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero47+entero48).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >23</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Escaso o nulo reconocimiento y compensación</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero49+entero50+entero51+entero52).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >24</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitado sentido de pertenencia</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero55+entero56).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="5px"><font size="1" face="arial"color="black" >25</font></td>
                                              <td width="80px" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                              <td width="15px"><font size="1" face="arial"color="black">{(entero53+entero54).toFixed(2)}</font></td>
                                            </tr>
                                          </MDBTableBody>
                                          </MDBTable>
    
                                    
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                                          <br/>
                            </div>
                        </PDFExport>
                    </div>
                </div>
        </React.Fragment>
     }
    
     let botonCerrar;
     let botonResultadosGlobales;
     if(!this.state.botonDisabled){
         botonCerrar=<MDBBtn color="danger" onClick={(e)=>{window.location.reload()}} >Cerrar resultados</MDBBtn>
     }
     if(this.state.botonDisabled){
         botonResultadosGlobales=<MDBRow><MDBCol><MDBBtn onClick={e=>this.consultarDatosFiltrados(datosEmpleados,filtro)}  outline color="success">Descarga del reporte Global</MDBBtn></MDBCol><MDBCol><MDBBtn disabled={!this.state.botonResultados} onClick={e=>this.reporteImasivo(datosEmpleados,filtro)}  outline color="success"> Descarga masiva evaluaciones</MDBBtn></MDBCol><MDBCol><MDBBtn disabled={!this.state.botonResultados} onClick={e=>this.reporteImasivoResultados(datosEmpleados,filtro)}  outline color="success">Descarga masiva resultados</MDBBtn></MDBCol></MDBRow>
     }

     let dataSource;
    charts(FusionCharts);


    if(this.state.resultadosInicio[0]){

      let total;
    
      let array1=[], array2=[], array3=[], array4=[], array5=[], array6=[], array7=[], array8=[], array9=[], array10=[]      
      let array11=[], array12=[], array13=[], array14=[], array15=[], array16=[], array17=[], array18=[], array19=[], array20=[]      
      let array21=[], array22=[], array23=[], array24=[], array25=[], array26=[], array27=[], array28=[], array29=[], array30=[]      
      let array31=[], array32=[], array33=[], array34=[], array35=[], array36=[], array37=[], array38=[], array39=[], array40=[]      
      let array41=[], array42=[], array43=[], array44=[], array45=[], array46=[], array47=[], array48=[], array49=[], array50=[]      
      let array51=[], array52=[], array53=[], array54=[], array55=[], array56=[], array57=[], array58=[], array59=[], array60=[]      
      let array61=[], array62=[], array63=[], array64=[], array65=[], array66=[], array67=[], array68=[], array69=[], array70=[],array71=[],array72=[];

      var filtrar1 ;
      var array1Int;
      var arr1Int;
      var respuesta1;
        this.state.resultadosInicio.map(rows=>{
        filtrar1 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO == 1;
        });
        array1.push(filtrar1)

        let valor1=[];    
        array1.map(rows=>{
          if(rows[0]){
            valor1.push(rows[0].ponderacion)
          } 
        })
        arr1Int = valor1.map(x => Number.parseInt(x, 10)); 
        respuesta1=0;
        arr1Int.forEach (function(numero){
          respuesta1 += numero;
        });
        }) 

        var filtrar2 ;
        var array2Int;
        var arr2Int;
        var respuesta2;
        this.state.resultadosInicio.map(rows=>{
        filtrar2 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO == 2;
        });
        array2.push(filtrar2)

        let valor2=[];    
        array2.map(rows=>{
          if(rows[0]){
            valor2.push(rows[0].ponderacion)
          } 
        })
        arr2Int = valor2.map(x => Number.parseInt(x, 10)); 
        respuesta2=0;
        arr2Int.forEach (function(numero){
          respuesta2 += numero;
        });
        }) 
          var filtrar3 ;
          var array3Int;
          var arr3Int;
          var respuesta3;
          this.state.resultadosInicio.map(rows=>{
          filtrar3 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 3;
          });
          array3.push(filtrar3)
  
          let valor3=[];    
          array3.map(rows=>{
            if(rows[0]){
              valor3.push(rows[0].ponderacion)
            } 
          })
          arr3Int = valor3.map(x => Number.parseInt(x, 10)); 
          respuesta3=0;
          arr3Int.forEach (function(numero){
            respuesta3 += numero;
          });
          }) 
          var filtrar4 ;
          var array4Int;
          var arr4Int;
          var respuesta4;
          this.state.resultadosInicio.map(rows=>{
          filtrar4 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 4;
          });
          array4.push(filtrar4)
  
          let valor4=[];    
          array4.map(rows=>{
            if(rows[0]){
              valor4.push(rows[0].ponderacion)
            } 
          })
          arr4Int = valor4.map(x => Number.parseInt(x, 10)); 
          respuesta4=0;
          arr4Int.forEach (function(numero){
            respuesta4 += numero;
          });
          }) 
          var filtrar5 ;
          var array5Int;
          var arr5Int;
          var respuesta5;
          this.state.resultadosInicio.map(rows=>{
          filtrar5 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 5;
          });
          array5.push(filtrar5)
          let valor5=[];    
          array5.map(rows=>{
            if(rows[0]){
              valor5.push(rows[0].ponderacion)
            } 
          })
          arr5Int = valor5.map(x => Number.parseInt(x, 10)); 
          respuesta5=0;
          arr5Int.forEach (function(numero){
            respuesta5 += numero;
          });
          }) 
          var filtrar6 ;
          var array6Int;
          var arr6Int;
          var respuesta6;
          this.state.resultadosInicio.map(rows=>{
          filtrar6 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 6;
          });
          array6.push(filtrar6)
          let valor6=[];    
          array6.map(rows=>{
            if(rows[0]){
              valor6.push(rows[0].ponderacion)
            } 
          })
          arr6Int = valor6.map(x => Number.parseInt(x, 10)); 
          respuesta6=0;
          arr6Int.forEach (function(numero){
            respuesta6 += numero;
          });
          }) 
          var filtrar7 ;
          var array7Int;
          var arr7Int;
          var respuesta7;
          this.state.resultadosInicio.map(rows=>{
          filtrar7 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 7;
          });
          array7.push(filtrar7)
          let valor7=[];    
          array7.map(rows=>{
            if(rows[0]){
              valor7.push(rows[0].ponderacion)
            } 
          })
          arr7Int = valor7.map(x => Number.parseInt(x, 10)); 
          respuesta7=0;
          arr7Int.forEach (function(numero){
            respuesta7 += numero;
          });
          })
          var filtrar8 ;
          var array8Int;
          var arr8Int;
          var respuesta8;
          this.state.resultadosInicio.map(rows=>{
          filtrar8 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 8;
          });
          array8.push(filtrar8)
          let valor8=[];    
          array8.map(rows=>{
            if(rows[0]){
              valor8.push(rows[0].ponderacion)
            } 
          })
          arr8Int = valor8.map(x => Number.parseInt(x, 10)); 
          respuesta8=0;
          arr8Int.forEach (function(numero){
            respuesta8 += numero;
          });
          })
          var filtrar9 ;
          var array9Int;
          var arr9Int;
          var respuesta9;
          this.state.resultadosInicio.map(rows=>{
          filtrar9 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 9;
          });
          array9.push(filtrar9)
          let valor9=[];    
          array9.map(rows=>{
            if(rows[0]){
              valor9.push(rows[0].ponderacion)
            } 
          })
          arr9Int = valor9.map(x => Number.parseInt(x, 10)); 
          respuesta9=0;
          arr9Int.forEach (function(numero){
            respuesta9 += numero;
          });
          })
          var filtrar10 ;
          var array10Int;
          var arr10Int;
          var respuesta10;
          this.state.resultadosInicio.map(rows=>{
          filtrar10 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 10;
          });
          array10.push(filtrar10)
          let valor10=[];    
          array10.map(rows=>{
            if(rows[0]){
              valor10.push(rows[0].ponderacion)
            } 
          })
          arr10Int = valor10.map(x => Number.parseInt(x, 10)); 
          respuesta10=0;
          arr10Int.forEach (function(numero){
            respuesta10 += numero;
          });
          })
          var filtrar11 ;
          var array11Int;
          var arr11Int;
          var respuesta11;
          this.state.resultadosInicio.map(rows=>{
          filtrar11 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 11;
          });
          array11.push(filtrar11)
          let valor11=[];    
          array11.map(rows=>{
            if(rows[0]){
              valor11.push(rows[0].ponderacion)
            } 
          })
          arr11Int = valor11.map(x => Number.parseInt(x, 10)); 
          respuesta11=0;
          arr11Int.forEach (function(numero){
            respuesta11 += numero;
          });
          })
         
          var filtrar12 ;
          var array12Int;
          var arr12Int;
          var respuesta12;
          this.state.resultadosInicio.map(rows=>{
          filtrar12 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 12;
          });
          array12.push(filtrar12)
          let valor12=[];    
          array12.map(rows=>{
            if(rows[0]){
              valor12.push(rows[0].ponderacion)
            } 
          })
          arr12Int = valor12.map(x => Number.parseInt(x, 10)); 
          respuesta12=0;
          arr12Int.forEach (function(numero){
            respuesta12 += numero;
          });
          })
          var filtrar13 ;
          var array13Int;
          var arr13Int;
          var respuesta13;
          this.state.resultadosInicio.map(rows=>{
          filtrar13 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 13;
          });
          array13.push(filtrar13)
          let valor13=[];    
          array13.map(rows=>{
            if(rows[0]){
              valor13.push(rows[0].ponderacion)
            } 
          })
          arr13Int = valor13.map(x => Number.parseInt(x, 10)); 
          respuesta13=0;
          arr13Int.forEach (function(numero){
            respuesta13 += numero;
          });
          })
          var filtrar14 ;
          var array14Int;
          var arr14Int;
          var respuesta14;
          this.state.resultadosInicio.map(rows=>{
          filtrar14 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 14;
          });
          array14.push(filtrar14)
          let valor14=[];    
          array14.map(rows=>{
            if(rows[0]){
              valor14.push(rows[0].ponderacion)
            } 
          })
          arr14Int = valor14.map(x => Number.parseInt(x, 10)); 
          respuesta14=0;
          arr14Int.forEach (function(numero){
            respuesta14 += numero;
          });
          })
          var filtrar15 ;
          var array15Int;
          var arr15Int;
          var respuesta15;
          this.state.resultadosInicio.map(rows=>{
          filtrar15 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 15;
          });
          array15.push(filtrar15)
          let valor15=[];    
          array15.map(rows=>{
            if(rows[0]){
              valor15.push(rows[0].ponderacion)
            } 
          })
          arr15Int = valor15.map(x => Number.parseInt(x, 10)); 
          respuesta15=0;
          arr15Int.forEach (function(numero){
            respuesta15 += numero;
          });
          })
          var filtrar16 ;
          var array16Int;
          var arr16Int;
          var respuesta16;
          this.state.resultadosInicio.map(rows=>{
          filtrar16 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 16;
          });
          array16.push(filtrar16)
          let valor16=[];    
          array16.map(rows=>{
            if(rows[0]){
              valor16.push(rows[0].ponderacion)
            } 
          })
          arr16Int = valor16.map(x => Number.parseInt(x, 10)); 
          respuesta16=0;
          arr16Int.forEach (function(numero){
            respuesta16 += numero;
          });
          })
          var filtrar17 ;
          var array17Int;
          var arr17Int;
          var respuesta17;
          this.state.resultadosInicio.map(rows=>{
          filtrar17 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 17;
          });
          array17.push(filtrar17)
          let valor17=[];    
          array17.map(rows=>{
            if(rows[0]){
              valor17.push(rows[0].ponderacion)
            } 
          })
          arr17Int = valor17.map(x => Number.parseInt(x, 10)); 
          respuesta17=0;
          arr17Int.forEach (function(numero){
            respuesta17 += numero;
          });
          })
          var filtrar18 ;
          var array18Int;
          var arr18Int;
          var respuesta18;
          this.state.resultadosInicio.map(rows=>{
          filtrar18 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 18;
          });
          array18.push(filtrar18)
          let valor18=[];    
          array18.map(rows=>{
            if(rows[0]){
              valor18.push(rows[0].ponderacion)
            } 
          })
          arr18Int = valor18.map(x => Number.parseInt(x, 10)); 
          respuesta18=0;
          arr18Int.forEach (function(numero){
            respuesta18 += numero;
          });
          })
          var filtrar19 ;
          var array19Int;
          var arr19Int;
          var respuesta19;
          this.state.resultadosInicio.map(rows=>{
          filtrar19 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 19;
          });
          array19.push(filtrar19)
          let valor19=[];    
          array19.map(rows=>{
            if(rows[0]){
              valor19.push(rows[0].ponderacion)
            } 
          })
          arr19Int = valor19.map(x => Number.parseInt(x, 10)); 
          respuesta19=0;
          arr19Int.forEach (function(numero){
            respuesta19 += numero;
          });
          })
          var filtrar20 ;
          var array20Int;
          var arr20Int;
          var respuesta20;
          this.state.resultadosInicio.map(rows=>{
          filtrar20 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 20;
          });
          array20.push(filtrar20)
          let valor20=[];    
          array20.map(rows=>{
            if(rows[0]){
              valor20.push(rows[0].ponderacion)
            } 
          })
          arr20Int = valor20.map(x => Number.parseInt(x, 10)); 
          respuesta20=0;
          arr20Int.forEach (function(numero){
            respuesta20 += numero;
          });
          })
          var filtrar21 ;
          var array21Int;
          var arr21Int;
          var respuesta21;
          this.state.resultadosInicio.map(rows=>{
          filtrar21 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 21;
          });
          array21.push(filtrar21)
          let valor21=[];    
          array21.map(rows=>{
            if(rows[0]){
              valor21.push(rows[0].ponderacion)
            } 
          })
          arr21Int = valor21.map(x => Number.parseInt(x, 10)); 
          respuesta21=0;
          arr21Int.forEach (function(numero){
            respuesta21 += numero;
          });
          })
          var filtrar22 ;
          var array22Int;
          var arr22Int;
          var respuesta22;
          this.state.resultadosInicio.map(rows=>{
          filtrar22 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 22;
          });
          array22.push(filtrar22)
          let valor22=[];    
          array22.map(rows=>{
            if(rows[0]){
              valor22.push(rows[0].ponderacion)
            } 
          })
          arr22Int = valor22.map(x => Number.parseInt(x, 10)); 
          respuesta22=0;
          arr22Int.forEach (function(numero){
            respuesta22 += numero;
          });
          })
          var filtrar23 ;
          var array23Int;
          var arr23Int;
          var respuesta23;
          this.state.resultadosInicio.map(rows=>{
          filtrar23 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 23;
          });
          array23.push(filtrar23)
          let valor23=[];    
          array23.map(rows=>{
            if(rows[0]){
              valor23.push(rows[0].ponderacion)
            } 
          })
          arr23Int = valor23.map(x => Number.parseInt(x, 10)); 
          respuesta23=0;
          arr23Int.forEach (function(numero){
            respuesta23 += numero;
          });
          })
          var filtrar24 ;
          var array24Int;
          var arr24Int;
          var respuesta24;
          this.state.resultadosInicio.map(rows=>{
          filtrar24 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 24;
          });
          array24.push(filtrar24)
          let valor24=[];    
          array24.map(rows=>{
            if(rows[0]){
              valor24.push(rows[0].ponderacion)
            } 
          })
          arr24Int = valor24.map(x => Number.parseInt(x, 10)); 
          respuesta24=0;
          arr24Int.forEach (function(numero){
            respuesta24 += numero;
          });
          })
          var filtrar25 ;
          var array25Int;
          var arr25Int;
          var respuesta25;
          this.state.resultadosInicio.map(rows=>{
          filtrar25 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 25;
          });
          array25.push(filtrar25)
          let valor25=[];    
          array25.map(rows=>{
            if(rows[0]){
              valor25.push(rows[0].ponderacion)
            } 
          })
          arr25Int = valor25.map(x => Number.parseInt(x, 10)); 
          respuesta25=0;
          arr25Int.forEach (function(numero){
            respuesta25 += numero;
          });
          })
          var filtrar26 ;
          var array26Int;
          var arr26Int;
          var respuesta26;
          this.state.resultadosInicio.map(rows=>{
          filtrar26 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 26;
          });
          array26.push(filtrar26)
          let valor26=[];    
          array26.map(rows=>{
            if(rows[0]){
              valor26.push(rows[0].ponderacion)
            } 
          })
          arr26Int = valor26.map(x => Number.parseInt(x, 10)); 
          respuesta26=0;
          arr26Int.forEach (function(numero){
            respuesta26 += numero;
          });
          })
          var filtrar27 ;
          var array27Int;
          var arr27Int;
          var respuesta27;
          this.state.resultadosInicio.map(rows=>{
          filtrar27 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 27;
          });
          array27.push(filtrar27)
          let valor27=[];    
          array27.map(rows=>{
            if(rows[0]){
              valor27.push(rows[0].ponderacion)
            } 
          })
          arr27Int = valor27.map(x => Number.parseInt(x, 10)); 
          respuesta27=0;
          arr27Int.forEach (function(numero){
            respuesta27 += numero;
          });
          })
          var filtrar28 ;
          var array28Int;
          var arr28Int;
          var respuesta28;
          this.state.resultadosInicio.map(rows=>{
          filtrar28 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 28;
          });
          array28.push(filtrar28)
          let valor28=[];    
          array28.map(rows=>{
            if(rows[0]){
              valor28.push(rows[0].ponderacion)
            } 
          })
          arr28Int = valor28.map(x => Number.parseInt(x, 10)); 
          respuesta28=0;
          arr28Int.forEach (function(numero){
            respuesta28 += numero;
          });
          })
          var filtrar29 ;
          var array29Int;
          var arr29Int;
          var respuesta29;
          this.state.resultadosInicio.map(rows=>{
          filtrar29 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 29;
          });
          array29.push(filtrar29)
          let valor29=[];    
          array29.map(rows=>{
            if(rows[0]){
              valor29.push(rows[0].ponderacion)
            } 
          })
          arr29Int = valor29.map(x => Number.parseInt(x, 10)); 
          respuesta29=0;
          arr29Int.forEach (function(numero){
            respuesta29 += numero;
          });
          })
          var filtrar30 ;
          var array30Int;
          var arr30Int;
          var respuesta30;
          this.state.resultadosInicio.map(rows=>{
          filtrar30 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 30;
          });
          array30.push(filtrar30)
          let valor30=[];    
          array30.map(rows=>{
            if(rows[0]){
              valor30.push(rows[0].ponderacion)
            } 
          })
          arr30Int = valor30.map(x => Number.parseInt(x, 10)); 
          respuesta30=0;
          arr30Int.forEach (function(numero){
            respuesta30 += numero;
          });
          })
          var filtrar31 ;
          var array31Int;
          var arr31Int;
          var respuesta31;
          this.state.resultadosInicio.map(rows=>{
          filtrar31 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 31;
          });
          array31.push(filtrar31)
          let valor31=[];    
          array31.map(rows=>{
            if(rows[0]){
              valor31.push(rows[0].ponderacion)
            } 
          })
          arr31Int = valor31.map(x => Number.parseInt(x, 10)); 
          respuesta31=0;
          arr31Int.forEach (function(numero){
            respuesta31 += numero;
          });
          })
          var filtrar32 ;
          var array32Int;
          var arr32Int;
          var respuesta32;
          this.state.resultadosInicio.map(rows=>{
          filtrar32 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 32;
          });
          array32.push(filtrar32)
          let valor32=[];    
          array32.map(rows=>{
            if(rows[0]){
              valor32.push(rows[0].ponderacion)
            } 
          })
          arr32Int = valor32.map(x => Number.parseInt(x, 10)); 
          respuesta32=0;
          arr32Int.forEach (function(numero){
            respuesta32 += numero;
          });
          })
          var filtrar33 ;
          var array33Int;
          var arr33Int;
          var respuesta33;
          this.state.resultadosInicio.map(rows=>{
          filtrar33 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 33;
          });
          array33.push(filtrar33)
          let valor33=[];    
          array33.map(rows=>{
            if(rows[0]){
              valor33.push(rows[0].ponderacion)
            } 
          })
          arr33Int = valor33.map(x => Number.parseInt(x, 10)); 
          respuesta33=0;
          arr33Int.forEach (function(numero){
            respuesta33 += numero;
          });
          })
          var filtrar34 ;
          var array34Int;
          var arr34Int;
          var respuesta34;
          this.state.resultadosInicio.map(rows=>{
          filtrar34 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 34;
          });
          array34.push(filtrar34)
          let valor34=[];    
          array34.map(rows=>{
            if(rows[0]){
              valor34.push(rows[0].ponderacion)
            } 
          })
          arr34Int = valor34.map(x => Number.parseInt(x, 10)); 
          respuesta34=0;
          arr34Int.forEach (function(numero){
            respuesta34 += numero;
          });
          })
          var filtrar35 ;
          var array35Int;
          var arr35Int;
          var respuesta35;
          this.state.resultadosInicio.map(rows=>{
          filtrar35 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 35;
          });
          array35.push(filtrar35)
          let valor35=[];    
          array35.map(rows=>{
            if(rows[0]){
              valor35.push(rows[0].ponderacion)
            } 
          })
          arr35Int = valor35.map(x => Number.parseInt(x, 10)); 
          respuesta35=0;
          arr35Int.forEach (function(numero){
            respuesta35 += numero;
          });
          })
          var filtrar36 ;
          var array36Int;
          var arr36Int;
          var respuesta36;
          this.state.resultadosInicio.map(rows=>{
          filtrar36 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 36;
          });
          array36.push(filtrar36)
          let valor36=[];    
          array36.map(rows=>{
            if(rows[0]){
              valor36.push(rows[0].ponderacion)
            } 
          })
          arr36Int = valor36.map(x => Number.parseInt(x, 10)); 
          respuesta36=0;
          arr36Int.forEach (function(numero){
            respuesta36 += numero;
          });
          })
          var filtrar37 ;
          var array37Int;
          var arr37Int;
          var respuesta37;
          this.state.resultadosInicio.map(rows=>{
          filtrar37 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 37;
          });
          array37.push(filtrar37)
          let valor37=[];    
          array37.map(rows=>{
            if(rows[0]){
              valor37.push(rows[0].ponderacion)
            } 
          })
          arr37Int = valor37.map(x => Number.parseInt(x, 10)); 
          respuesta37=0;
          arr37Int.forEach (function(numero){
            respuesta37 += numero;
          });
          })
          var filtrar38 ;
          var array38Int;
          var arr38Int;
          var respuesta38;
          this.state.resultadosInicio.map(rows=>{
          filtrar38 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 38;
          });
          array38.push(filtrar38)
          let valor38=[];    
          array38.map(rows=>{
            if(rows[0]){
              valor38.push(rows[0].ponderacion)
            } 
          })
          arr38Int = valor38.map(x => Number.parseInt(x, 10)); 
          respuesta38=0;
          arr38Int.forEach (function(numero){
            respuesta38 += numero;
          });
          })
          var filtrar39 ;
          var array39Int;
          var arr39Int;
          var respuesta39;
          this.state.resultadosInicio.map(rows=>{
          filtrar39 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 39;
          });
          array39.push(filtrar39)
          let valor39=[];    
          array39.map(rows=>{
            if(rows[0]){
              valor39.push(rows[0].ponderacion)
            } 
          })
          arr39Int = valor39.map(x => Number.parseInt(x, 10)); 
          respuesta39=0;
          arr39Int.forEach (function(numero){
            respuesta39 += numero;
          });
          })
          var filtrar40 ;
          var array40Int;
          var arr40Int;
          var respuesta40;
          this.state.resultadosInicio.map(rows=>{
          filtrar40 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 40;
          });
          array40.push(filtrar40)
          let valor40=[];    
          array40.map(rows=>{
            if(rows[0]){
              valor40.push(rows[0].ponderacion)
            } 
          })
          arr40Int = valor40.map(x => Number.parseInt(x, 10)); 
          respuesta40=0;
          arr40Int.forEach (function(numero){
            respuesta40 += numero;
          });
          })
          var filtrar41 ;
          var array41Int;
          var arr41Int;
          var respuesta41;
          this.state.resultadosInicio.map(rows=>{
          filtrar41 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 41;
          });
          array41.push(filtrar41)
          let valor41=[];    
          array41.map(rows=>{
            if(rows[0]){
              valor41.push(rows[0].ponderacion)
            } 
          })
          arr41Int = valor41.map(x => Number.parseInt(x, 10)); 
          respuesta41=0;
          arr41Int.forEach (function(numero){
            respuesta41 += numero;
          });
          })
          var filtrar42 ;
          var array42Int;
          var arr42Int;
          var respuesta42;
          this.state.resultadosInicio.map(rows=>{
          filtrar42 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 42;
          });
          array42.push(filtrar42)
          let valor42=[];    
          array42.map(rows=>{
            if(rows[0]){
              valor42.push(rows[0].ponderacion)
            } 
          })
          arr42Int = valor42.map(x => Number.parseInt(x, 10)); 
          respuesta42=0;
          arr42Int.forEach (function(numero){
            respuesta42 += numero;
          });
          })
          var filtrar43 ;
          var array43Int;
          var arr43Int;
          var respuesta43;
          this.state.resultadosInicio.map(rows=>{
          filtrar43 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 43;
          });
          array43.push(filtrar43)
          let valor43=[];    
          array43.map(rows=>{
            if(rows[0]){
              valor43.push(rows[0].ponderacion)
            } 
          })
          arr43Int = valor43.map(x => Number.parseInt(x, 10)); 
          respuesta43=0;
          arr43Int.forEach (function(numero){
            respuesta43 += numero;
          });
          })
          var filtrar44 ;
          var array44Int;
          var arr44Int;
          var respuesta44;
          this.state.resultadosInicio.map(rows=>{
          filtrar44 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 44;
          });
          array44.push(filtrar44)
          let valor44=[];    
          array44.map(rows=>{
            if(rows[0]){
              valor44.push(rows[0].ponderacion)
            } 
          })
          arr44Int = valor44.map(x => Number.parseInt(x, 10)); 
          respuesta44=0;
          arr44Int.forEach (function(numero){
            respuesta44 += numero;
          });
          })
          var filtrar45 ;
          var array45Int;
          var arr45Int;
          var respuesta45;
          this.state.resultadosInicio.map(rows=>{
          filtrar45 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 45;
          });
          array45.push(filtrar45)
          let valor45=[];    
          array45.map(rows=>{
            if(rows[0]){
              valor45.push(rows[0].ponderacion)
            } 
          })
          arr45Int = valor45.map(x => Number.parseInt(x, 10)); 
          respuesta45=0;
          arr45Int.forEach (function(numero){
            respuesta45 += numero;
          });
          })
          var filtrar46 ;
          var array46Int;
          var arr46Int;
          var respuesta46;
          this.state.resultadosInicio.map(rows=>{
          filtrar46 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 46;
          });
          array46.push(filtrar46)
          let valor46=[];    
          array46.map(rows=>{
            if(rows[0]){
              valor46.push(rows[0].ponderacion)
            } 
          })
          arr46Int = valor46.map(x => Number.parseInt(x, 10)); 
          respuesta46=0;
          arr46Int.forEach (function(numero){
            respuesta46 += numero;
          });
          })
          var filtrar47 ;
          var array47Int;
          var arr47Int;
          var respuesta47;
          this.state.resultadosInicio.map(rows=>{
          filtrar47 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 47;
          });
          array47.push(filtrar47)
          let valor47=[];    
          array47.map(rows=>{
            if(rows[0]){
              valor47.push(rows[0].ponderacion)
            } 
          })
          arr47Int = valor47.map(x => Number.parseInt(x, 10)); 
          respuesta47=0;
          arr47Int.forEach (function(numero){
            respuesta47 += numero;
          });
          })
          var filtrar48 ;
          var array48Int;
          var arr48Int;
          var respuesta48;
          this.state.resultadosInicio.map(rows=>{
          filtrar48 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 48;
          });
          array48.push(filtrar48)
          let valor48=[];    
          array48.map(rows=>{
            if(rows[0]){
              valor48.push(rows[0].ponderacion)
            } 
          })
          arr48Int = valor48.map(x => Number.parseInt(x, 10)); 
          respuesta48=0;
          arr48Int.forEach (function(numero){
            respuesta48 += numero;
          });
          })
          var filtrar49 ;
          var array49Int;
          var arr49Int;
          var respuesta49;
          this.state.resultadosInicio.map(rows=>{
          filtrar49 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 49;
          });
          array49.push(filtrar49)
          let valor49=[];    
          array49.map(rows=>{
            if(rows[0]){
              valor49.push(rows[0].ponderacion)
            } 
          })
          arr49Int = valor49.map(x => Number.parseInt(x, 10)); 
          respuesta49=0;
          arr49Int.forEach (function(numero){
            respuesta49 += numero;
          });
          })
          var filtrar50 ;
          var array50Int;
          var arr50Int;
          var respuesta50;
          this.state.resultadosInicio.map(rows=>{
          filtrar50 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 50;
          });
          array50.push(filtrar50)
          let valor50=[];    
          array50.map(rows=>{
            if(rows[0]){
              valor50.push(rows[0].ponderacion)
            } 
          })
          arr50Int = valor50.map(x => Number.parseInt(x, 10)); 
          respuesta50=0;
          arr50Int.forEach (function(numero){
            respuesta50 += numero;
          });
          })
          var filtrar51 ;
          var array51Int;
          var arr51Int;
          var respuesta51;
          this.state.resultadosInicio.map(rows=>{
          filtrar51 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 51;
          });
          array51.push(filtrar51)
          let valor51=[];    
          array51.map(rows=>{
            if(rows[0]){
              valor51.push(rows[0].ponderacion)
            } 
          })
          arr51Int = valor51.map(x => Number.parseInt(x, 10)); 
          respuesta51=0;
          arr51Int.forEach (function(numero){
            respuesta51 += numero;
          });
          })
          var filtrar52 ;
          var array52Int;
          var arr52Int;
          var respuesta52;
          this.state.resultadosInicio.map(rows=>{
          filtrar52 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 52;
          });
          array52.push(filtrar52)
          let valor52=[];    
          array52.map(rows=>{
            if(rows[0]){
              valor52.push(rows[0].ponderacion)
            } 
          })
          arr52Int = valor52.map(x => Number.parseInt(x, 10)); 
          respuesta52=0;
          arr52Int.forEach (function(numero){
            respuesta52 += numero;
          });
          })
          var filtrar53 ;
          var array53Int;
          var arr53Int;
          var respuesta53;
          this.state.resultadosInicio.map(rows=>{
          filtrar53 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 53;
          });
          array53.push(filtrar53)
          let valor53=[];    
          array53.map(rows=>{
            if(rows[0]){
              valor53.push(rows[0].ponderacion)
            } 
          })
          arr53Int = valor53.map(x => Number.parseInt(x, 10)); 
          respuesta53=0;
          arr53Int.forEach (function(numero){
            respuesta53 += numero;
          });
          })
          var filtrar54 ;
          var array54Int;
          var arr54Int;
          var respuesta54;
          this.state.resultadosInicio.map(rows=>{
          filtrar54 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 54;
          });
          array54.push(filtrar54)
          let valor54=[];    
          array54.map(rows=>{
            if(rows[0]){
              valor54.push(rows[0].ponderacion)
            } 
          })
          arr54Int = valor54.map(x => Number.parseInt(x, 10)); 
          respuesta54=0;
          arr54Int.forEach (function(numero){
            respuesta54 += numero;
          });
          })
          var filtrar55 ;
          var array55Int;
          var arr55Int;
          var respuesta55;
          this.state.resultadosInicio.map(rows=>{
          filtrar55 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 55;
          });
          array55.push(filtrar55)
          let valor55=[];    
          array55.map(rows=>{
            if(rows[0]){
              valor55.push(rows[0].ponderacion)
            } 
          })
          arr55Int = valor55.map(x => Number.parseInt(x, 10)); 
          respuesta55=0;
          arr55Int.forEach (function(numero){
            respuesta55 += numero;
          });
          })
          var filtrar56 ;
          var array56Int;
          var arr56Int;
          var respuesta56;
          this.state.resultadosInicio.map(rows=>{
          filtrar56 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 56;
          });
          array56.push(filtrar56)
          let valor56=[];    
          array56.map(rows=>{
            if(rows[0]){
              valor56.push(rows[0].ponderacion)
            } 
          })
          arr56Int = valor56.map(x => Number.parseInt(x, 10)); 
          respuesta56=0;
          arr56Int.forEach (function(numero){
            respuesta56 += numero;
          });
          })
          var filtrar57 ;
          var array57Int;
          var arr57Int;
          var respuesta57;
          this.state.resultadosInicio.map(rows=>{
          filtrar57 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 57;
          });
          array57.push(filtrar57)
          let valor57=[];    
          array57.map(rows=>{
            if(rows[0]){
              valor57.push(rows[0].ponderacion)
            } 
          })
          arr57Int = valor57.map(x => Number.parseInt(x, 10)); 
          respuesta57=0;
          arr57Int.forEach (function(numero){
            respuesta57 += numero;
          });
          })
          var filtrar58 ;
          var array58Int;
          var arr58Int;
          var respuesta58;
          this.state.resultadosInicio.map(rows=>{
          filtrar58 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 58;
          });
          array58.push(filtrar58)
          let valor58=[];    
          array58.map(rows=>{
            if(rows[0]){
              valor58.push(rows[0].ponderacion)
            } 
          })
          arr58Int = valor58.map(x => Number.parseInt(x, 10)); 
          respuesta58=0;
          arr58Int.forEach (function(numero){
            respuesta58 += numero;
          });
          })
          var filtrar59 ;
          var array59Int;
          var arr59Int;
          var respuesta59;
          this.state.resultadosInicio.map(rows=>{
          filtrar59 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 59;
          });
          array59.push(filtrar59)
          let valor59=[];    
          array59.map(rows=>{
            if(rows[0]){
              valor59.push(rows[0].ponderacion)
            } 
          })
          arr59Int = valor59.map(x => Number.parseInt(x, 10)); 
          respuesta59=0;
          arr59Int.forEach (function(numero){
            respuesta59 += numero;
          });
          })
          var filtrar60 ;
          var array60Int;
          var arr60Int;
          var respuesta60;
          this.state.resultadosInicio.map(rows=>{
          filtrar60 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 60;
          });
          array60.push(filtrar60)
          let valor60=[];    
          array60.map(rows=>{
            if(rows[0]){
              valor60.push(rows[0].ponderacion)
            } 
          })
          arr60Int = valor60.map(x => Number.parseInt(x, 10)); 
          respuesta60=0;
          arr60Int.forEach (function(numero){
            respuesta60 += numero;
          });
          })
          var filtrar61 ;
          var array61Int;
          var arr61Int;
          var respuesta61;
          this.state.resultadosInicio.map(rows=>{
          filtrar61 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 61;
          });
          array61.push(filtrar61)
          let valor61=[];    
          array61.map(rows=>{
            if(rows[0]){
              valor61.push(rows[0].ponderacion)
            } 
          })
          arr61Int = valor61.map(x => Number.parseInt(x, 10)); 
          respuesta61=0;
          arr61Int.forEach (function(numero){
            respuesta61 += numero;
          });
          })
          var filtrar62 ;
          var array62Int;
          var arr62Int;
          var respuesta62;
          this.state.resultadosInicio.map(rows=>{
          filtrar62 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 62;
          });
          array62.push(filtrar62)
          let valor62=[];    
          array62.map(rows=>{
            if(rows[0]){
              valor62.push(rows[0].ponderacion)
            } 
          })
          arr62Int = valor62.map(x => Number.parseInt(x, 10)); 
          respuesta62=0;
          arr62Int.forEach (function(numero){
            respuesta62 += numero;
          });
          })
          var filtrar63 ;
          var array63Int;
          var arr63Int;
          var respuesta63;
          this.state.resultadosInicio.map(rows=>{
          filtrar63 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 63;
          });
          array63.push(filtrar63)
          let valor63=[];    
          array63.map(rows=>{
            if(rows[0]){
              valor63.push(rows[0].ponderacion)
            } 
          })
          arr63Int = valor63.map(x => Number.parseInt(x, 10)); 
          respuesta63=0;
          arr63Int.forEach (function(numero){
            respuesta63 += numero;
          });
          })
          var filtrar64 ;
          var array64Int;
          var arr64Int;
          var respuesta64;
          this.state.resultadosInicio.map(rows=>{
          filtrar64 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 64;
          });
          array64.push(filtrar64)
          let valor64=[];    
          array64.map(rows=>{
            if(rows[0]){
              valor64.push(rows[0].ponderacion)
            } 
          })
          arr64Int = valor64.map(x => Number.parseInt(x, 10)); 
          respuesta64=0;
          arr64Int.forEach (function(numero){
            respuesta64 += numero;
          });
          })
          var filtrar65 ;
          var array65Int;
          var arr65Int;
          var respuesta65;
          this.state.resultadosInicio.map(rows=>{
          filtrar65 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 65;
          });
          array65.push(filtrar65)
          let valor65=[];    
          array65.map(rows=>{
            if(rows[0]){
              valor65.push(rows[0].ponderacion)
            } 
          })
          arr65Int = valor65.map(x => Number.parseInt(x, 10)); 
          respuesta65=0;
          arr65Int.forEach (function(numero){
            respuesta65 += numero;
          });
          })
          var filtrar66 ;
          var array66Int;
          var arr66Int;
          var respuesta66;
          this.state.resultadosInicio.map(rows=>{
          filtrar66 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 66;
          });
          array66.push(filtrar66)
          let valor66=[];    
          array66.map(rows=>{
            if(rows[0]){
              valor66.push(rows[0].ponderacion)
            } 
          })
          arr66Int = valor66.map(x => Number.parseInt(x, 10)); 
          respuesta66=0;
          arr66Int.forEach (function(numero){
            respuesta66 += numero;
          });
          })
          var filtrar67 ;
          var array67Int;
          var arr67Int;
          var respuesta67;
          this.state.resultadosInicio.map(rows=>{
          filtrar67 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 67;
          });
          array67.push(filtrar67)
          let valor67=[];    
          array67.map(rows=>{
            if(rows[0]){
              valor67.push(rows[0].ponderacion)
            } 
          })
          arr67Int = valor67.map(x => Number.parseInt(x, 10)); 
          respuesta67=0;
          arr67Int.forEach (function(numero){
            respuesta67 += numero;
          });
          })
          var filtrar68 ;
          var array68Int;
          var arr68Int;
          var respuesta68;
          this.state.resultadosInicio.map(rows=>{
          filtrar68 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 68;
          });
          array68.push(filtrar68)
          let valor68=[];    
          array68.map(rows=>{
            if(rows[0]){
              valor68.push(rows[0].ponderacion)
            } 
          })
          arr68Int = valor68.map(x => Number.parseInt(x, 10)); 
          respuesta68=0;
          arr68Int.forEach (function(numero){
            respuesta68 += numero;
          });
          })
          var filtrar69 ;
          var array69Int;
          var arr69Int;
          var respuesta69;
          this.state.resultadosInicio.map(rows=>{
          filtrar69 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 69;
          });
          array69.push(filtrar69)
          let valor69=[];    
          array69.map(rows=>{
            if(rows[0]){
              valor69.push(rows[0].ponderacion)
            } 
          })
          arr69Int = valor69.map(x => Number.parseInt(x, 10)); 
          respuesta69=0;
          arr69Int.forEach (function(numero){
            respuesta69 += numero;
          });
          })
          var filtrar70 ;
          var array70Int;
          var arr70Int;
          var respuesta70;
          this.state.resultadosInicio.map(rows=>{
          filtrar70 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 70;
          });
          array70.push(filtrar70)
          let valor70=[];    
          array70.map(rows=>{
            if(rows[0]){
              valor70.push(rows[0].ponderacion)
            } 
          })
          arr70Int = valor70.map(x => Number.parseInt(x, 10)); 
          respuesta70=0;
          arr70Int.forEach (function(numero){
            respuesta70 += numero;
          });
          })
          var filtrar71 ;
          var array71Int;
          var arr71Int;
          var respuesta71;
          this.state.resultadosInicio.map(rows=>{
          filtrar71 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 71;
          });
          array71.push(filtrar71)
          let valor71=[];    
          array71.map(rows=>{
            if(rows[0]){
              valor71.push(rows[0].ponderacion)
            } 
          })
          arr71Int = valor71.map(x => Number.parseInt(x, 10)); 
          respuesta71=0;
          arr71Int.forEach (function(numero){
            respuesta71 += numero;
          });
          })
          var filtrar72 ;
          var array72Int;
          var arr72Int;
          var respuesta72;
          this.state.resultadosInicio.map(rows=>{
          filtrar72 =  rows.filter(function(hero) {
            return hero.fk_preguntasEEO == 72;
          });
          array72.push(filtrar72)
          let valor72=[];    
          array72.map(rows=>{
            if(rows[0]){
              valor72.push(rows[0].ponderacion)
            } 
          })
          arr72Int = valor72.map(x => Number.parseInt(x, 10)); 
          respuesta72=0;
          arr72Int.forEach (function(numero){
            respuesta72 += numero;
          });
          })
 total =(respuesta1+respuesta2+respuesta3+respuesta4+respuesta5+respuesta6+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta12+respuesta13+respuesta14+respuesta15+respuesta16+respuesta17+respuesta18+respuesta19+respuesta20
  +respuesta21+respuesta22+respuesta23+respuesta24+respuesta25+respuesta26+respuesta27+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40
  +respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52+respuesta53+respuesta54+respuesta55+respuesta56+respuesta57+respuesta58+respuesta59+respuesta60
  +respuesta61+respuesta62+respuesta63+respuesta64+respuesta65+respuesta66+respuesta67+respuesta68+respuesta69+respuesta70+respuesta71+respuesta72)          

  let length =this.state.resultadosInicio.length;
  let general =total/length.toFixed(2);

                let colorCategoriaUno;
                let textoCategoriaUno;
                let categoriaUno = ((respuesta1+respuesta3+respuesta2+respuesta4+respuesta5)/length).toFixed(2);
                if(categoriaUno < 5){
                  colorCategoriaUno  = "#9BE0F7"
                  textoCategoriaUno = "Nulo o despreciable"
                }else if(categoriaUno >= 5 && categoriaUno < 9){
                  colorCategoriaUno ="#6BF56E"
                  textoCategoriaUno = "Bajo"
                }else if(categoriaUno >= 9 && categoriaUno < 11){
                  colorCategoriaUno="#FFFF00"
                  textoCategoriaUno = "Medio"
                }else if(categoriaUno >= 11 && categoriaUno < 14){
                  colorCategoriaUno = "#FFC000"
                  textoCategoriaUno = "Alto"
                }else if(categoriaUno >= 14){
                  colorCategoriaUno =  "#FF0000"
                  textoCategoriaUno = "Muy alto"
                }
               
        
                let colorCategoriaDos;
                let textoCategoriaDos;
                let categoriaDos = ((respuesta6+respuesta12+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta65+respuesta66+respuesta67+respuesta68+respuesta13+respuesta14+respuesta15+respuesta16+respuesta25+respuesta26+respuesta27+respuesta28+respuesta23+respuesta24+respuesta29+respuesta30+respuesta35+respuesta36)/length).toFixed(2);
                
                if(categoriaDos < 15){
                  colorCategoriaDos  = "#9BE0F7"
                  textoCategoriaDos = "Nulo o despreciable"
                }else if(categoriaDos >= 15 && categoriaDos < 30){
                  colorCategoriaDos ="#6BF56E"
                  textoCategoriaDos = "Bajo"
                }else if(categoriaDos >=30 && categoriaDos < 45){
                  colorCategoriaDos="#FFFF00"
                  textoCategoriaDos = "Medio"
                }else if(categoriaDos >=45 && categoriaDos < 60){
                  colorCategoriaDos = "#FFC000"
                  textoCategoriaDos = "Alto"
                }else if(categoriaDos >= 60){
                  colorCategoriaDos = "#FF0000"
                  textoCategoriaDos = "Muy alto "
                }
                
                let colorCategoriaTre;
                let textoCategoriaTre;
                let categoriaTre = ((respuesta17+respuesta18+respuesta19+respuesta20+respuesta21+respuesta22)/length).toFixed(2);
                
                if(categoriaTre < 5){
                  colorCategoriaTre  = "#9BE0F7"
                  textoCategoriaTre="Nulo o despreciable"
                }else if(categoriaTre >= 5 && categoriaTre < 7){
                  colorCategoriaTre ="#6BF56E"
                  textoCategoriaTre="Bajo"
                }else if(categoriaTre >=7 && categoriaTre < 10){
                  colorCategoriaTre="#FFFF00"
                  textoCategoriaTre="Medio"
                }else if(categoriaTre >=10 && categoriaTre < 13){
                  colorCategoriaTre = "#FFC000"
                  textoCategoriaTre="Alto"
                }else if(categoriaTre >= 13){
                  colorCategoriaTre = "#FF0000"
                  textoCategoriaTre="Muy alto"
                }
                
                let colorCategoriaCuatro;
                let textoCategoriaCuatro;
                let categoriaCuatro = ((respuesta31+respuesta32+respuesta33+respuesta34+respuesta37+respuesta38+respuesta39+respuesta40+respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta69+respuesta70+respuesta71+respuesta72+respuesta57+respuesta58+respuesta59+respuesta60+respuesta61+respuesta62+respuesta63+respuesta64)/length).toFixed(2);

                if(categoriaCuatro < 14){
                  colorCategoriaCuatro  = "#9BE0F7"
                  textoCategoriaCuatro="Nulo o despreciable "
                }else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
                  colorCategoriaCuatro ="#6BF56E"
                  textoCategoriaCuatro="Bajo"
                }else if(categoriaCuatro >=29 && categoriaCuatro < 42){
                  colorCategoriaCuatro="#FFFF00"
                  textoCategoriaCuatro="Medio"
                }else if(categoriaCuatro >=42 && categoriaCuatro < 58){
                  colorCategoriaCuatro = "#FFC000"
                  textoCategoriaCuatro="Alto"
                }else if(categoriaCuatro >= 58){
                  colorCategoriaCuatro = "#FF0000"
                  textoCategoriaCuatro="Muy alto"
                }

                let colorCategoriaCinco;
                let textoCategoriaCinco;
                let categoriaCinco = ((respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52+respuesta55+respuesta56+respuesta53+respuesta54)/length).toFixed(2);
                if(categoriaCinco < 10){
                  colorCategoriaCinco  = "#9BE0F7"
                  textoCategoriaCuatro="Nulo o despreciable "
                }else if(categoriaCinco >= 10 && categoriaCinco < 14){
                  colorCategoriaCinco ="#6BF56E"
                  textoCategoriaCuatro="Bajo"
                }else if(categoriaCinco >=14 && categoriaCinco < 18){
                  colorCategoriaCinco="#FFFF00"
                  textoCategoriaCuatro="Medio"
                }else if(categoriaCinco >=18 && categoriaCinco < 23){
                  colorCategoriaCinco = "#FFC000"
                  textoCategoriaCuatro="Alto"
                }else if(categoriaCinco >= 23){
                  colorCategoriaCinco = "#FF0000"
                  textoCategoriaCuatro="Muy alto"
                }


                   dataSource = {
                    chart: {
                      caption: "Gráfica de previsualización por categoría de resultados globales",
                      subcaption: "Ponderación de empleados",
                      showvalues: "1",
                      showpercentintooltip: "0",
                      // numberprefix: "Pts.",
                      enablemultislicing: "1",
                      theme: "fusion"
                      },
                      data: [
                        {
                          label: "Ambiente de trabajo",
                          value:  categoriaUno,
                          color: colorCategoriaUno,
                          labelFontSize:12,
                          toolText: textoCategoriaUno

                          // link:"www.google.com"
                        },
                        {
                          label: "Factores propios de la actividad",
                          value: categoriaDos,
                          color: colorCategoriaDos,
                          labelFontSize:12,
                          toolText: textoCategoriaDos
                          // link:"www.google.com"
                        },
                        {
                          label: "Organización del tiempo de trabajo",
                          value: categoriaTre,
                          color: colorCategoriaTre,
                          labelFontSize:12,
                          toolText: textoCategoriaTre
                          // link:"www.google.com"
                        },
                        {
                          label: "Liderazgo y relaciones en el trabajo",
                          value: categoriaCuatro,
                          color: colorCategoriaCuatro,
                          labelFontSize:12,
                          toolText: textoCategoriaCuatro
                          // link:"www.google.com"
                        },
                        {
                          label: "Entorno organizacional",
                          value: categoriaCinco,
                          color: colorCategoriaCinco,
                          labelFontSize:12,
                          toolText: textoCategoriaCinco
                          // link:"www.google.com"
                        },
                      ]
                    };    }
    return (
      <React.Fragment>
      <div>
          <Navbar/>
          <MDBContainer className="pt-5">
     

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
                                  <a href="www.ads.com.mx">www.ads.com.mx</a>
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
        </MDBContainer> 
         <div
        
        style={{
          marginLeft: "5%",
          position: "absolute"
        }}
      >
        <div style={{ height: "110%"}}>
          <Grow in={true}>
            <div style={{ margin: "30px 56px" }}>
            <ReactFusioncharts
              type="pie3d"
              width="100%"
              height="80%"
              dataFormat="JSON"
              dataSource={dataSource}
            />
              <MUIDataTable
                title={`Resultados EEO`}
                data={data}
                columns={columns}
                options={options}
              />
              <MDBRow style={{marginTop:20}}>
              <MDBCol >{botonCerrar}{botonResultadosGlobales}</MDBCol> 
              <MDBCol>
  
              <MDBContainer>
              {spinner}
              {this.state.reporteImasivo.map(rows=>{
                if(rows[0]){
                return(
                 <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
                 <section className="flex-column  bg-white  pa4 "  >
                  <PDFExport
                          pageTemplate={PageTemplate}
                          forcePageBreak=".page-break"
                           paperSize="A4"
                           margin="1cm"
                           ref={(component) => this.pdfExportComponent = component}
                           fileName={`Respuestas del total de empleados ${new Date().getFullYear()}`}
                           >
           
                   <div style={{ width: "500px" }}>
                   
                   <MDBRow style={{marginBottom:10}}> 
                   <MDBCol>
                   <img src={diagnostico} alt="logo" style = {{width:150,marginLeft:20,heigth:50}}/>
          
                   <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,marginLeft:230,heigth:20}}/>
                   </MDBCol> 
                   </MDBRow> 
                      <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                      <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left mt-4 ">
                      
                      <MDBTableBody>     
                      <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                      <font size="1"face="arial"color="black">{rows[0].nombre} {rows[0].ApellidoP} {rows[0].ApellidoM}</font><br></br><br/>
                      <font size="2"face="arial"color="black">CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO</font><br></br>
                      <font size="1"face="arial"color="black">{this.state.date}</font>    
                      <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                          <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font>                                               
                      </MDBTableBody>
                      </MDBTable>
                      <br/>  
                      <br/>  
                      <br/>  
                      <br/>  
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>  
                      <br/>
                      <br/>
                      <br/>  
                      <br/>  
                      <br/>  
                      <br/>  
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>  
                      <br/>
                      <br/>
                      <br/>  
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>  
                      <br/>
                      <br/>
                      <br/>  
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>  
                      <br/>
                      <br/>
                      <font size="1"
                      face="arial"
                      color="black" style = {{marginLeft:35}}>GUÍA DE REFERENCIA III
                      CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO</font>   <br/>  
                      <font size="1"  face="arial"
                      color="black" style = {{marginLeft:35}}>PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN
                      LOS CENTROS DE TRABAJO</font>           
                     {this.state.reporteImasivo.map(rows=>{
                       if(rows[0]){
                       return(
                        <div> 
                         
                        <MDBTable responsive small borderless className="text-left mt-4" style = {{marginLeft:35}}>
        
                        <MDBTableBody>  
                                            
                          <tr>
                          <td width="6%" ><font size="1" face="arial"color="black" >Nombre : {rows[0].nombre} {rows[0].ApellidoP} {rows[0].ApellidoM}</font> </td>
                          <td width="6%" ><font size="1" face="arial"color="black" >Puesto : {rows[0].Puesto}</font></td>
                                        </tr>
                                        <tr>
                          <td width="6%" ><font size="1" face="arial"color="black" >Departamento : {rows[0].AreaTrabajo}</font></td>
                          <td width="6%" ><font size="1" face="arial"color="black" >Genero : {rows[0].Sexo}</font></td> 
                                        </tr>
                                        <tr>
                          <td width="6%" ><font size="1" face="arial"color="black" >Correo : {rows[0].correo}</font></td>
                          <td width="6%" ><font size="1" face="arial"color="black" >RFC : {rows[0].RFC}</font></td>            
                          </tr>
                        </MDBTableBody>
                        </MDBTable>
 

                        <MDBTable  component={Paper}  small  className="text-left ">
                        <MDBTableBody>
                        <font color="red" style= {{marginLeft:20}}  size="1">I. Condiciones ambientales de su centro de trabajo.</font>
                        </MDBTableBody>                                                                            
                        </MDBTable>

                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left"> 
                        <MDBTableBody>
                            
                        <tr>
                        <td><font size="1" face="arial"color="black" >El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</font></td>
                        <td width="90px"><font size="1" face="arial"color="black" >{rows[1].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Mi trabajo me exige hacer mucho esfuerzo físico</font></td>
                          <td width="90px" ><font size="1" face="arial"color="black" >{rows[2].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Me preocupa sufrir un accidente en mi trabajo</font></td>
                          <td  width="90px"><font size="1" face="arial"color="black" >{rows[3].Respuestas}</font></td> 
                        </tr>                    
                        <tr>
                          <td><font size="1" face="arial"color="black" >Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo</font></td>
                          <td  width="90px"><font size="1" face="arial"color="black" >{rows[4].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Considero que las actividades que realizo son peligrosas</font></td>
                          <td  width="90px"><font size="1" face="arial"color="black" >{rows[5].Respuestas}</font></td> 
                      </tr>
                        </MDBTableBody>
                       </MDBTable>
                        <MDBTable  component={Paper}  small  className="text-left ">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}   size="1">II. La cantidad y ritmo de trabajo que tiene.</font>
                        </MDBTableBody>
                        </MDBTable>
                        <MDBTable style={{marginLeft:20}}  component={Paper}  small bordered className="text-left mt-4 ">
                        <MDBTableBody>
                        <tr>
                        <td><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno</font></td>
                        <td width="90px"><font size="1" face="arial"color="black" >{rows[6].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo trabajar sin parar</font></td>
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[7].Respuestas} </font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Considero que es necesario mantener un ritmo de trabajo acelerado</font></td>
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[8].Respuestas}</font></td> 
                        </tr>
                      
                        </MDBTableBody>
                        </MDBTable>
              
                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font style= {{marginLeft:20}}  size="1" color="red" >III. El esfuerzo mental que le exige su trabajo.</font>
                        </MDBTableBody>
                        </MDBTable>
                                
                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                        <MDBTableBody>
                        <tr>
                        <td><font size="1" face="arial"color="black" >Mi trabajo exige que esté muy concentrado</font></td>
                        <td width="90px"><font size="1" face="arial"color="black" >{rows[9].Respuestas}</font></td> 
                      </tr>
                        <tr>
                        <td><font size="1" face="arial"color="black" >Mi trabajo requiere que memorice mucha información</font></td>   
                        <td width="90px"><font size="1" face="arial"color="black" >{rows[10].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >En mi trabajo tengo que tomar decisiones difíciles muy rápido</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[11].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Mi trabajo exige que atienda varios asuntos al mismo tiempo</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[12].Respuestas}</font></td> 
                        </tr>
                        </MDBTableBody>
                        </MDBTable>
                        <br/>  
                        <br/>  
                        <br/>  
                        <br/>  
                        <br/>  
                        <br/>  
                        <br/>  
                        <br/>  
                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >IV. Trabajo y las responsabilidades que tiene.</font>
                        </MDBTableBody>
                        </MDBTable>
                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                        <MDBTableBody>
                        <tr>
                          <td><font size="1" face="arial"color="black" >En mi trabajo soy responsable de cosas de mucho valor</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[13].Respuestas}</font></td> 
                        </tr>
                        <tr>
                        <td><font size="1" face="arial"color="black" >Respondo ante mi jefe por los resultados de toda mi área de trabajo</font></td>   
                        <td width="90px"><font size="1" face="arial"color="black" >{rows[14].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >En el trabajo me dan órdenes contradictorias</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[15].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Considero que en mi trabajo me piden hacer cosas innecesarias</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[16].Respuestas}</font></td> 
                        </tr>
                       
                        </MDBTableBody>
                        </MDBTable>

                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >V. Jornada de trabajo.</font>
                        </MDBTableBody>
                        </MDBTable>
                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                        <MDBTableBody>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Trabajo horas extras más de tres veces a la semana</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[17].Respuestas}</font></td> 
                        </tr>
                        <tr>
                        <td><font size="1" face="arial"color="black" >Mi trabajo me exige laborar en días de descanso, festivos o fines de semana</font></td>   
                        <td width="90px"><font size="1" face="arial"color="black" >{rows[18].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[19].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Debo atender asuntos de trabajo cuando estoy en casa</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[20].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Pienso en las actividades familiares o personales cuando estoy en mi trabajo</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[21].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Pienso que mis responsabilidades familiares afectan mi trabajo</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[22].Respuestas}</font></td> 
                        </tr>
                        </MDBTableBody>
                        </MDBTable>
              
                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >VI. Decisiones que puede tomar en su trabajo.</font>
                        </MDBTableBody>
                        </MDBTable>

                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                        <MDBTableBody>
                                
                        <tr>
                        <td><font size="1" face="arial"color="black" >Mi trabajo permite que desarrolle nuevas habilidades</font></td>   
                        <td width="90px"><font size="1" face="arial"color="black" >{rows[23].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >En mi trabajo puedo aspirar a un mejor puesto</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[24].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Durante mi jornada de trabajo puedo tomar pausas cuando las necesito</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[25].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1" face="arial"color="black" >Puedo decidir cuánto trabajo realizo durante la jornada laboral</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[26].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td ><font size="1" face="arial"color="black" >Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo</font></td>   
                          <td width="90px"><font size="1" face="arial"color="black" >{rows[27].Respuestas}</font></td> 
                        </tr>
                
                        <tr>
                        <td><font size="1"face="arial"color="black">Puedo cambiar el orden de las actividades que realizo en mi trabajo</font></td>   
                        <td width="90px"><font size="1"face="arial"color="black">{rows[28].Respuestas}</font></td> 
                        </tr>
                        
                        </MDBTableBody>
                        </MDBTable>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >VII.Cualquier tipo de cambio que ocurra en su trabajo</font><br/>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >(considere los últimos cambios realizados).	</font>

                        </MDBTableBody>
                        </MDBTable>

                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                        <MDBTableBody>
                        <tr>
                          <td><font size="1"face="arial"color="black">Los cambios que se presentan en mi trabajo dificultan mi labor</font></td>   
                          <td width="90px" ><font size="1"face="arial"color="black">{rows[29].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas o aportaciones</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[30].Respuestas}</font></td> 
                        </tr>
                        
                        </MDBTableBody>
                        </MDBTable>
                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >VIII. capacitación e información que se le proporciona sobre su trabajo.</font>
                        </MDBTableBody>
                        </MDBTable>

                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                        <MDBTableBody>
                        <tr>
                          <td><font size="1"face="arial"color="black">Me informan con claridad cuáles son mis funciones</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[31].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Me explican claramente los resultados que debo obtener en mi trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[32].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Me explican claramente los objetivos de mi trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[33].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Me informan con quién puedo resolver problemas o asuntos de trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[34].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Me permiten asistir a capacitaciones relacionadas con mi trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[35].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Recibo capacitación útil para hacer mi trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[36].Respuestas}</font></td> 
                        </tr>
                        
                        </MDBTableBody>
                        </MDBTable>
                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >IX. Jefes con quien tiene contacto.</font>
                        </MDBTableBody>
                        </MDBTable>

                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                        <MDBTableBody>
                        <tr>
                          <td><font size="1"face="arial"color="black">Mi jefe ayuda a organizar mejor el trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[37].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Mi jefe tiene en cuenta mis puntos de vista y opiniones</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[38].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Mi jefe me comunica a tiempo la información relacionada con el trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[39].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">La orientación que me da mi jefe me ayuda a realizar mejor mi trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[40].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[41].Respuestas}</font></td> 
                        </tr>
                                                     
                        </MDBTableBody>
                        </MDBTable>
                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >X. Relaciones con sus compañeros.</font>
                        </MDBTableBody>
                        </MDBTable>

                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                        <MDBTableBody>
                        <tr>
                          <td><font size="1"face="arial"color="black">Puedo confiar en mis compañeros de trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[42].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Entre compañeros solucionamos los problemas de trabajo de forma respetuosa</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[43].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">En mi trabajo me hacen sentir parte del grupo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[44].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Cuando tenemos que realizar trabajo de equipo los compañeros colaboran</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[45].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Mis compañeros de trabajo me ayudan cuando tengo dificultades</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[46].Respuestas}</font></td> 
                        </tr>
                                                     
                        </MDBTableBody>
                        </MDBTable>
                        <br/>
                        <br/>  
                        <br/>
                        <br/>  
                        <br/>
                        <br/>  
                        <br/>
                        <br/>  
                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >XI. Información que recibe sobre su rendimiento en el trabajo, el reconocimiento</font><br/>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >el sentido de pertenencia y la estabilidad que le ofrece su trabajo.</font>

                        </MDBTableBody>
                        </MDBTable>
                       
                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                        <MDBTableBody>
                        <tr>
                          <td><font size="1"face="arial"color="black">Me informan sobre lo que hago bien en mi trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[47].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">La forma como evalúan mi trabajo en mi centro de trabajo me ayuda a mejorar mi desempeño</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[48].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">En mi centro de trabajo me pagan a tiempo mi salario</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[49].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">El pago que recibo es el que merezco por el trabajo que realizo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[50].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Si obtengo los resultados esperados en mi trabajo me recompensan o reconocen</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[51].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Las personas que hacen bien el trabajo pueden crecer laboralmente</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[52].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Considero que mi trabajo es estable</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[53].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">En mi trabajo existe continua rotación de personal</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[54].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Siento orgullo de laborar en este centro de trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[55].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Me siento comprometido con mi trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[56].Respuestas}</font></td> 
                        </tr>
                                                     
                        </MDBTableBody>
                        </MDBTable>
                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >XII. Actos de violencia laboral (malos tratos, acoso, hostigamiento, acoso psicológico).</font>
                        </MDBTableBody>
                        </MDBTable>

                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                        <MDBTableBody>
                        <tr>
                          <td><font size="1"face="arial"color="black">En mi trabajo puedo expresarme libremente sin interrupciones</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[57].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Recibo críticas constantes a mi persona y/o trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[58].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[59].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[60].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[61].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[62].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[63].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">He presenciado actos de violencia en mi centro de trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[64].Respuestas}</font></td> 
                        </tr>
                                                                                      
                        </MDBTableBody>
                        </MDBTable>
                        <br/>
                        <br/>
                        <br/>  
                        <br/>
                        <br/>  
                        <br/>
                        <br/>  
                        <br/>
                        <br/>
                        <br/>  
                        <br/>
                        <br/>  
                        <br/>
                        <br/>  
                        <br/>
                        <br/>
                        <br/>  
                        <br/>
                        <br/>  
                        <br/>
                        <br/>  
                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >XIII. Atención a clientes y usuarios.</font>
                        </MDBTableBody>
                        </MDBTable>

                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                        <MDBTableBody>
                        <tr>
                          <td><font size="1"face="arial"color="black">Atiendo clientes o usuarios muy enojados</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[65].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[66].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Para hacer mi trabajo debo demostrar sentimientos distintos a los míos</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[67].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Mi trabajo me exige atender situaciones de violencia</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[68].Respuestas}</font></td> 
                        </tr>
                        </MDBTableBody>
                        </MDBTable>
                        <MDBTable  component={Paper}  small  className="text-left">
                        <MDBTableBody>
                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >XIV. Las actitudes de las personas que supervisa.</font>
                        </MDBTableBody>
                        </MDBTable>

                        <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left">
                        <MDBTableBody>
                        <tr>
                          <td><font size="1"face="arial"color="black">Comunican tarde los asuntos de trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[69].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Dificultan el logro de los resultados del trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[70].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Cooperan poco cuando se necesita</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[71].Respuestas}</font></td> 
                        </tr>
                        <tr>
                          <td><font size="1"face="arial"color="black">Ignoran las sugerencias para mejorar su trabajo</font></td>   
                          <td width="90px"><font size="1"face="arial"color="black">{rows[72].Respuestas}</font></td> 
                        </tr>
                        </MDBTableBody>
                        </MDBTable> 
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        </div>
                         )}
                         })}
                       </div>
                       </PDFExport>
                
                      </section>
                      
                      </div>
                    
                    ) } return(
                      <MDBContainer>
                      <MDBRow>     
                      <MDBCol>   
                      <MDBBtn  color="primary" size="3" outline className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                          Descargar respuestas
                      </MDBBtn>
                      </MDBCol>
                      <MDBCol> 
                      </MDBCol> 
                      </MDBRow>  
                      </MDBContainer>
                    )
                    })}
                    
                         {this.state.resultadosEvaluacionMasivo.map(rows=>{
                        if(rows[0]){
                          return(
                        <div>
                        <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
                         <PDFExport
                            paperSize="A4"
                            margin="1cm"
                            pageTemplate={PageTemplate}
                            forcePageBreak=".page-break"
                            ref={(component) => this.pdfExportComponent = component}
                            fileName={`Resultados del total de empleados ${new Date().getFullYear()}`}
                        >
                        <div style={{ width: "500px" }}>

                         <MDBRow style={{marginBottom:10}}> 
                         <MDBCol>
                         <img src={diagnostico} alt="logo" style = {{width:150,marginLeft:20,heigth:50}}/>
                
                         <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,marginLeft:230,heigth:20}}/>
                         </MDBCol> 
                         </MDBRow> 
                          <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                          <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left mt-4 ">
                  
                          <MDBTableBody>     
                          <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                          <font size="3"face="arial"color="black">Diagnóstico individual de factores de riesgo psicosocial y evaluación de entorno organizacional en los centros de trabajo</font><br></br>
                          <font size="1"face="arial"color="black">{this.state.date}</font><br/>
                          <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                          <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font>                              
                          </MDBTableBody>
                          </MDBTable>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br/>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                              
                            <font size="1"
                            face="arial"
                            color="black" style = {{marginTop:25,marginLeft:35}}>GUÍA DE REFERENCIA III
                            CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO </font>   <br/>  
                            <font size="1"  face="arial"
                            color="black" style = {{marginLeft:35}}>PSICOSOCIAL Y
                            EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO</font>
                   {this.state.resultadosEvaluacionMasivo.map(rows=>{
                      if(rows[0]){
                                        
                    let respuesta1=rows[1].Respuestas;
                    let respuesta2=rows[2].Respuestas;
                    let respuesta3=rows[3].Respuestas;
                    let respuesta4=rows[4].Respuestas;
                    let respuesta5=rows[5].Respuestas;
                    let respuesta6=rows[6].Respuestas;
                    let respuesta7=rows[7].Respuestas;
                    let respuesta8=rows[8].Respuestas;
                    let respuesta9=rows[9].Respuestas;
                    let respuesta10=rows[10].Respuestas;
                    let respuesta11=rows[11].Respuestas;
                    let respuesta12=rows[12].Respuestas;
                    let respuesta13=rows[13].Respuestas;
                    let respuesta14=rows[14].Respuestas;
                    let respuesta15=rows[15].Respuestas;
                    let respuesta16=rows[16].Respuestas;
                    let respuesta17=rows[17].Respuestas;
                    let respuesta18=rows[18].Respuestas;
                    let respuesta19=rows[19].Respuestas;
                    let respuesta20=rows[20].Respuestas;
                    let respuesta21=rows[21].Respuestas;
                    let respuesta22=rows[22].Respuestas;
                    let respuesta23=rows[23].Respuestas;
                    let respuesta24=rows[24].Respuestas;
                    let respuesta25=rows[25].Respuestas;
                    let respuesta26=rows[26].Respuestas;
                    let respuesta27=rows[27].Respuestas;
                    let respuesta28=rows[28].Respuestas;
                    let respuesta29=rows[29].Respuestas;
                    let respuesta30=rows[30].Respuestas;
                    let respuesta31=rows[31].Respuestas;
                    let respuesta32=rows[32].Respuestas;
                    let respuesta33=rows[33].Respuestas;
                    let respuesta34=rows[34].Respuestas;
                    let respuesta35=rows[35].Respuestas;
                    let respuesta36=rows[36].Respuestas;
                    let respuesta37=rows[37].Respuestas;
                    let respuesta38=rows[38].Respuestas;
                    let respuesta39=rows[39].Respuestas;
                    let respuesta40=rows[40].Respuestas;
                    let respuesta41=rows[41].Respuestas;
                    let respuesta42=rows[42].Respuestas;
                    let respuesta43=rows[43].Respuestas;
                    let respuesta44=rows[44].Respuestas;
                    let respuesta45=rows[45].Respuestas;
                    let respuesta46=rows[46].Respuestas;
                    let respuesta47=rows[47].Respuestas;
                    let respuesta48=rows[48].Respuestas;
                    let respuesta49=rows[49].Respuestas;
                    let respuesta50=rows[50].Respuestas;  
                    let respuesta51=rows[51].Respuestas;
                    let respuesta52=rows[52].Respuestas;
                    let respuesta53=rows[53].Respuestas;
                    let respuesta54=rows[54].Respuestas;
                    let respuesta55=rows[55].Respuestas;
                    let respuesta56=rows[56].Respuestas;
                    let respuesta57=rows[57].Respuestas;
                    let respuesta58=rows[58].Respuestas;
                    let respuesta59=rows[59].Respuestas;
                    let respuesta60=rows[60].Respuestas; 
                    let respuesta61=rows[61].Respuestas;
                    let respuesta62=rows[62].Respuestas;
                    let respuesta63=rows[63].Respuestas;
                    let respuesta64=rows[64].Respuestas;
                    let respuesta65=rows[65].Respuestas;
                    let respuesta66=rows[66].Respuestas;
                    let respuesta67=rows[67].Respuestas;
                    let respuesta68=rows[68].Respuestas;
                    let respuesta69=rows[69].Respuestas;
                    let respuesta70=rows[70].Respuestas;
                    let respuesta71=rows[71].Respuestas;
                    let respuesta72=rows[72].Respuestas;
                    
                    let valor1=rows[1].ponderacion;
                    let valor2=rows[2].ponderacion;
                    let valor3=rows[3].ponderacion;
                    let valor4=rows[4].ponderacion;
                    let valor5=rows[5].ponderacion;
                    let valor6=rows[6].ponderacion;
                    let valor7=rows[7].ponderacion;
                    let valor8=rows[8].ponderacion;
                    let valor9=rows[9].ponderacion;
                    let valor10=rows[10].ponderacion;
                    let valor11=rows[11].ponderacion;
                    let valor12=rows[12].ponderacion;
                    let valor13=rows[13].ponderacion;
                    let valor14=rows[14].ponderacion;
                    let valor15=rows[15].ponderacion;
                    let valor16=rows[16].ponderacion;
                    let valor17=rows[17].ponderacion;
                    let valor18=rows[18].ponderacion;
                    let valor19=rows[19].ponderacion;
                    let valor20=rows[20].ponderacion;
                    let valor21=rows[21].ponderacion;
                    let valor22=rows[22].ponderacion;
                    let valor23=rows[23].ponderacion;
                    let valor24=rows[24].ponderacion;
                    let valor25=rows[25].ponderacion;
                    let valor26=rows[26].ponderacion;
                    let valor27=rows[27].ponderacion;
                    let valor28=rows[28].ponderacion;
                    let valor29=rows[29].ponderacion;
                    let valor30=rows[30].ponderacion;
                    let valor31=rows[31].ponderacion;
                    let valor32=rows[32].ponderacion;
                    let valor33=rows[33].ponderacion;
                    let valor34=rows[34].ponderacion;
                    let valor35=rows[35].ponderacion;
                    let valor36=rows[36].ponderacion;
                    let valor37=rows[37].ponderacion;
                    let valor38=rows[38].ponderacion;
                    let valor39=rows[39].ponderacion;
                    let valor40=rows[40].ponderacion;
                    let valor41=rows[41].ponderacion;
                    let valor42=rows[42].ponderacion;
                    let valor43=rows[43].ponderacion;
                    let valor44=rows[44].ponderacion;
                    let valor45=rows[45].ponderacion;
                    let valor46=rows[46].ponderacion;
                    let valor47=rows[47].ponderacion;
                    let valor48=rows[48].ponderacion;
                    let valor49=rows[49].ponderacion;
                    let valor50=rows[50].ponderacion;  
                    let valor51=rows[51].ponderacion;
                    let valor52=rows[52].ponderacion;
                    let valor53=rows[53].ponderacion;
                    let valor54=rows[54].ponderacion;
                    let valor55=rows[55].ponderacion;
                    let valor56=rows[56].ponderacion;
                    let valor57=rows[57].ponderacion;
                    let valor58=rows[58].ponderacion;
                    let valor59=rows[59].ponderacion;
                    let valor60=rows[60].ponderacion; 
                    let valor61=rows[61].ponderacion;
                    let valor62=rows[62].ponderacion;
                    let valor63=rows[63].ponderacion;
                    let valor64=rows[64].ponderacion;
                    let valor65=rows[65].ponderacion;
                    let valor66=rows[66].ponderacion;
                    let valor67=rows[67].ponderacion;
                    let valor68=rows[68].ponderacion;
                    let valor69=rows[69].ponderacion;
                    let valor70=rows[70].ponderacion;
                    let valor71=rows[71].ponderacion;
                    let valor72=rows[72].ponderacion;
          let entero1=parseInt(valor1);let entero2=parseInt(valor2);let entero3=parseInt(valor3);let entero4=parseInt(valor4);
          let entero5=parseInt(valor5);let entero6=parseInt(valor6);let entero7=parseInt(valor7);let entero8=parseInt(valor8);
          let entero9=parseInt(valor9);let entero10=parseInt(valor10);let entero11=parseInt(valor11);let entero12=parseInt(valor12);
          let entero13=parseInt(valor13);let entero14=parseInt(valor14);let entero15=parseInt(valor15);let entero16=parseInt(valor16);
          let entero17=parseInt(valor17);let entero18=parseInt(valor18);let entero19=parseInt(valor19);let entero20=parseInt(valor20);
          let entero21=parseInt(valor21);let entero22=parseInt(valor22);let entero23=parseInt(valor23);let entero24=parseInt(valor24);
          let entero25=parseInt(valor25);let entero26=parseInt(valor26);let entero27=parseInt(valor27);let entero28=parseInt(valor28);
          let entero29=parseInt(valor29);let entero30=parseInt(valor30);let entero31=parseInt(valor31);let entero32=parseInt(valor32);
          let entero33=parseInt(valor33);let entero34=parseInt(valor34);let entero35=parseInt(valor35);let entero36=parseInt(valor36);
          let entero37=parseInt(valor37);let entero38=parseInt(valor38);let entero39=parseInt(valor39);let entero40=parseInt(valor40);
          let entero41=parseInt(valor41);let entero42=parseInt(valor42);let entero43=parseInt(valor43);let entero44=parseInt(valor44);
          let entero45=parseInt(valor45);let entero46=parseInt(valor46);let entero47=parseInt(valor47);let entero48=parseInt(valor48);
          let entero49=parseInt(valor49);let entero50=parseInt(valor50);let entero51=parseInt(valor51);let entero52=parseInt(valor52);
          let entero53=parseInt(valor53);let entero54=parseInt(valor54);let entero55=parseInt(valor55);let entero56=parseInt(valor56);
          let entero57=parseInt(valor57);let entero58=parseInt(valor58);let entero59=parseInt(valor59);let entero60=parseInt(valor60);
          let entero61=parseInt(valor61);let entero62=parseInt(valor62);let entero63=parseInt(valor63);let entero64=parseInt(valor64);
          let entero65=parseInt(valor65);let entero66=parseInt(valor66);let entero67=parseInt(valor67);let entero68=parseInt(valor68);
          let entero69=parseInt(valor69);let entero70=parseInt(valor70);let entero71=parseInt(valor71);let entero72=parseInt(valor72);
        
        let total = (entero1+entero2+entero3+entero4+entero5+entero6+entero7+entero8+entero9+entero10+entero11+entero12+entero13+entero14+entero15+entero16+entero17+entero18+entero19+entero20+entero21+entero22+entero23+entero24+entero25+entero26+entero27+entero28+entero29+entero30+entero31+entero32+entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46+entero47+entero48+entero49+entero50+entero51+entero52+entero53+entero54+entero55+entero56+entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64+entero65+entero66+entero67+entero68+entero69+entero70+entero71+entero72).toFixed(2);
        let celda1;
        let celda2;
        let celda3;
        let celda4;
        let celda5;
        let criterios;
    
        let color;
        if(total<50){
        criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
        color =<TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
        celda1 = <TableCell style={{backgroundColor: "#9BE0F7"}} align="right">{total}</TableCell>
        }else if(total>=50 && total <= 75){
          criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align=" justify">Es necesario una mayor difusión de la política de prevención de riesgos
          psicosociales y programas para: la prevención de los factores de riesgo
          psicosocial, la promoción de un entorno organizacional favorable y la
          prevención de la violencia laboral.</font></TableCell>
          color= <TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black" >Bajo</font></TableCell>
          celda2 = <TableCell style={{backgroundColor: "#6BF56E"}} align="right">{total}</TableCell>
        }else if(total>=75 && total <= 99){
          criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align=" justify">Se requiere revisar la política de prevención de riesgos psicosociales y
            programas para la prevención de los factores de riesgo psicosocial, la
            promoción de un entorno organizacional favorable y la prevención de la
            violencia laboral, así como reforzar su aplicación y difusión, mediante un
            Programa de intervención.</font></TableCell>
          color=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
          celda3 = <TableCell style={{backgroundColor: "#FFFF00"}} align="right">{total}</TableCell>
        }else if(total>=99 && total <= 140){
          criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align=" justify">Se requiere realizar un análisis de cada categoría y dominio, de manera que
          se puedan determinar las acciones de intervención apropiadas a través de un
          Programa de intervención, que podrá incluir una evaluación específica y
          deberá incluir una campaña de sensibilización, revisar la política de
          prevención de riesgos psicosociales y programas para la prevención de los
          factores de riesgo psicosocial, la promoción de un entorno organizacional
          favorable y la prevención de la violencia laboral, así como reforzar su
          aplicación y difusión.</font></TableCell>
          color = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black" >Alto</font></TableCell>
         celda4 = <TableCell style={{backgroundColor: "#FFC000"}} align="right">{total}</TableCell>
        }
        else if( total > 140){
          criterios = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="1" face="arial"color="black" align=" justify">Se requiere realizar el análisis de cada categoría y dominio para establecer
          las acciones de intervención apropiadas, mediante un Programa de
          intervención que deberá incluir evaluaciones específicas, y contemplar
          campañas de sensibilización, revisar la política de prevención de riesgos
          psicosociales y programas para la prevención de los factores de riesgo
          psicosocial, la promoción de un entorno organizacional favorable y la
          prevención de la violencia laboral, así como reforzar su aplicación y difusión.</font></TableCell>
          color = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
          celda5  = <TableCell style={{backgroundColor: "#FF0000"}} align="right">{total}</TableCell>
        }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    let categoria1Nulo;
    let categoria1Bajo;
    let categoria1Medio;
    let categoria1Alto;
    let categoria1MuyAlto;
    let categoriaUno = (entero1+entero3+entero2+entero4+entero5).toFixed(2);
    let colorCategoriaUno;
    console.log("categotia1",entero1,entero3,entero2,entero4,entero5)
    if(categoriaUno < 5){
      categoria1Nulo= categoriaUno
      colorCategoriaUno  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
    }else if(categoriaUno >= 5 && categoriaUno < 9){
      colorCategoriaUno =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      categoria1Bajo= categoriaUno
    }else if(categoriaUno >= 9 && categoriaUno < 11){
      colorCategoriaUno=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      categoria1Medio= categoriaUno
    }else if(categoriaUno >= 11 && categoriaUno < 14){
      colorCategoriaUno = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      categoria1Alto= categoriaUno
    }else if(categoriaUno >= 14){
      colorCategoriaUno = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      categoria1MuyAlto= categoriaUno
    }
    
    let categoria2Nulo;
    let categoria2Bajo;
    let categoria2Medio;
    let categoria2Alto;
    let categoria2MuyAlto;
    let colorCategoriaDos;
    let categoriaDos = (entero6+entero12+entero7+entero8+entero9+entero10+entero11+entero65+entero66+entero67+entero68+entero13+entero14+entero15+entero16+entero25+entero26+entero27+entero28+entero23+entero24+entero29+entero30+entero35+entero36).toFixed(2);
    if(categoriaDos < 15){
      colorCategoriaDos  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      categoria2Nulo= categoriaDos
    }else if(categoriaDos >= 15 && categoriaDos < 30){
      colorCategoriaDos =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      categoria2Bajo= categoriaDos
    }else if(categoriaDos >=30 && categoriaDos < 45){
      colorCategoriaDos=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      categoria2Medio= categoriaDos
    }else if(categoriaDos >=45 && categoriaDos < 60){
      colorCategoriaDos = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      categoria2Alto= categoriaDos
    }else if(categoriaDos >= 60){
      colorCategoriaDos = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      categoria2MuyAlto= categoriaDos
    }
    let categoria3Nulo;
    let categoria3Bajo;
    let categoria3Medio;
    let categoria3Alto;
    let categoria3MuyAlto;
    let colorCategoriaTre;
    let categoriaTre = (entero17+entero18+entero19+entero20+entero21+entero22).toFixed(2);
    if(categoriaTre < 5){
      colorCategoriaTre  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      categoria3Nulo= categoriaTre
    }else if(categoriaTre >= 5 && categoriaTre < 7){
      colorCategoriaTre =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      categoria3Bajo= categoriaTre
    }else if(categoriaTre >=7 && categoriaTre < 10){
      colorCategoriaTre=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      categoria3Medio= categoriaTre
    }else if(categoriaTre >=10 && categoriaTre < 13){
      colorCategoriaTre = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      categoria3Alto= categoriaTre
    }else if(categoriaTre >= 13){
      categoria3MuyAlto= categoriaTre
      colorCategoriaTre = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
    }
    
    let categoria4Nulo;
    let categoria4Bajo;
    let categoria4Medio;
    let categoria4Alto;
    let categoria4MuyAlto;
    let colorCategoriaCuatro;
    let categoriaCuatro = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72+entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64).toFixed(2);
    if(categoriaCuatro < 14){
      colorCategoriaCuatro  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      categoria4Nulo= categoriaCuatro
    }else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
      colorCategoriaCuatro =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      categoria4Bajo= categoriaCuatro
    }else if(categoriaCuatro >=29 && categoriaCuatro < 42){
      colorCategoriaCuatro=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      categoria4Medio= categoriaCuatro
    }else if(categoriaCuatro >=42 && categoriaCuatro < 58){
      colorCategoriaCuatro = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      categoria4Alto= categoriaCuatro
    }else if(categoriaCuatro >= 58){
      colorCategoriaCuatro= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      categoria4MuyAlto= categoriaCuatro
    }
    
    let categoria5Nulo;
    let categoria5Bajo;
    let categoria5Medio;
    let categoria5Alto;
    let categoria5MuyAlto;
    let colorCategoriaCinco;
    let categoriaCinco = (entero47+entero48+entero49+entero50+entero51+entero52+entero55+entero56+entero53+entero54).toFixed(2);
    if(categoriaCinco < 10){
      colorCategoriaCinco  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      categoria5Nulo= categoriaCinco
    }else if(categoriaCinco >= 10 && categoriaCinco < 14){
      colorCategoriaCinco=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      categoria5Bajo= categoriaCinco
    }else if(categoriaCinco >=14 && categoriaCinco < 18){
      colorCategoriaCinco=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      categoria5Medio= categoriaCinco
    }else if(categoriaCinco >=18 && categoriaCinco < 23){
      colorCategoriaCinco = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      categoria5Alto= categoriaCinco
    }else if(categoriaCinco >= 23){
      colorCategoriaCinco= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      categoria5MuyAlto= categoriaCinco
    }
    
    
    let Dominio1Nulo;
    let Dominio1Bajo;
    let Dominio1Medio;
    let Dominio1Alto;
    let Dominio1MuyAlto;
    let DominioUno = (entero1+entero3+entero2+entero4+entero5).toFixed(2);
    let colorDominioUno;
    if(DominioUno < 5){
      colorDominioUno  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio1Nulo= DominioUno
    }else if(DominioUno >= 5 && DominioUno < 9){
      colorDominioUno=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio1Bajo= DominioUno
    }else if(DominioUno >= 9 && DominioUno < 11){
      colorDominioUno=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio1Medio= DominioUno
    }else if(DominioUno >=11 && DominioUno < 14){
      colorDominioUno = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio1Alto= DominioUno
    }else if(DominioUno >= 14){
      colorDominioUno= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio1MuyAlto= DominioUno
    }
    
    let Dominio2Nulo;
    let Dominio2Bajo;
    let Dominio2Medio;
    let Dominio2Alto;
    let Dominio2MuyAlto;
    let colorDominioDos;
    let DominioDos = (entero6+entero12+entero7+entero8+entero9+entero10+entero11+entero65+entero66+entero67+entero68+entero13+entero14+entero15+entero16).toFixed(2);
    if(DominioDos < 15){
      colorDominioDos  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio2Nulo= DominioDos
    }else if(DominioDos >= 15 && DominioDos < 21){
      colorDominioDos=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio2Bajo= DominioDos
    }else if(DominioDos >= 21 && DominioDos < 27){
      colorDominioDos=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio2Medio= DominioDos
    }else if(DominioDos >= 27 && DominioDos < 37){
      colorDominioDos = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio2Alto= DominioDos
    }else if(DominioDos >= 37){
      colorDominioDos= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio2MuyAlto= DominioDos
    }
    
    let Dominio3Nulo;
    let Dominio3Bajo;
    let Dominio3Medio;
    let Dominio3Alto;
    let Dominio3MuyAlto;
    let colorDominioTres;
    let DominioTres = (entero25+entero26+entero27+entero28+entero23+entero24+entero29+entero30+entero35+entero36).toFixed(2);
    if(DominioTres < 11){
      colorDominioTres  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio3Nulo= DominioTres
    }else if(DominioTres >= 11 && DominioTres < 16){
      colorDominioTres=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio3Bajo= DominioTres
    }else if(DominioTres >= 16 && DominioTres < 21){
      colorDominioTres=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio3Medio= DominioTres
    }else if(DominioTres >= 21 && DominioTres < 25){
      colorDominioTres = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio3Alto= DominioTres
    }else if(DominioTres >= 25){
      colorDominioTres= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio3MuyAlto= DominioTres
    }
    
    let Dominio4Nulo;
    let Dominio4Bajo;
    let Dominio4Medio;
    let Dominio4Alto;
    let Dominio4MuyAlto;
    let colorDominioCuatro;
    let DominioCuatro = (entero17+entero18).toFixed(2);
    if(DominioCuatro < 1){
      colorDominioCuatro  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio4Nulo= DominioCuatro
    }else if(DominioCuatro >= 1 && DominioCuatro < 2){
      colorDominioCuatro=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio4Bajo= DominioCuatro
    }else if(DominioCuatro >= 2 && DominioCuatro < 4){
      colorDominioCuatro=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio4Medio= DominioCuatro
    }else if(DominioCuatro >= 4 && DominioCuatro < 6){
      colorDominioCuatro = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio4Alto= DominioCuatro
    }else if(DominioCuatro >= 6){
      colorDominioCuatro= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio4MuyAlto= DominioCuatro
    }
    
    let Dominio5Nulo;
    let Dominio5Bajo;
    let Dominio5Medio;
    let Dominio5Alto;
    let Dominio5MuyAlto;
    let colorDominioCinco;
    let DominioCinco = (entero19+entero20+entero21+entero22).toFixed(2);
    if(DominioCinco < 4){
      colorDominioCinco  = <TableCell width="15px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio5Nulo= DominioCinco
    }else if(DominioCinco >= 4 && DominioCinco < 6){
      colorDominioCinco=<TableCell width="15px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio5Bajo= DominioCinco
    }else if(DominioCinco >= 6 && DominioCinco < 8){
      colorDominioCinco=<TableCell width="15px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio5Medio= DominioCinco
    }else if(DominioCinco >= 8 && DominioCinco < 10){
      colorDominioCinco = <TableCell  width="15px"style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio5Alto= DominioCinco
    }else if(DominioCinco >= 10){
      colorDominioCinco= <TableCell  width="15px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio5MuyAlto= DominioCinco
    }
    
    let Dominio6Nulo;
    let Dominio6Bajo;
    let Dominio6Medio;
    let Dominio6Alto;
    let Dominio6MuyAlto;
    let colorDominioSeis;
    let DominioSeis = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41).toFixed(2);
    if(DominioSeis < 9){
      colorDominioSeis  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio6Nulo= DominioSeis
    }else if(DominioSeis >= 9 && DominioSeis < 12){
      colorDominioSeis=<TableCell  width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio6Bajo= DominioSeis
    }else if(DominioSeis >= 12 && DominioSeis < 16){
      colorDominioSeis=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio6Medio= DominioSeis
    }else if(DominioSeis >= 16 && DominioSeis < 20){
      colorDominioSeis = <TableCell width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio6Alto= DominioSeis
    }else if(DominioSeis >= 20){
      colorDominioSeis= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio6MuyAlto= DominioSeis
    }
    
    let Dominio7Nulo;
    let Dominio7Bajo;
    let Dominio7Medio;
    let Dominio7Alto;
    let Dominio7MuyAlto;
    let colorDominioSiete;
    let DominioSiete = (entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72).toFixed(2);
    if(DominioSiete < 10){
      colorDominioSiete  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio7Nulo= DominioSiete
    }else if(DominioSiete >= 10 && DominioSiete < 13){
      colorDominioSiete=<TableCell width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
      Dominio7Bajo= DominioSiete
    }else if(DominioSiete >= 13 && DominioSiete < 17){
      colorDominioSiete=<TableCell  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio7Medio= DominioSiete
    }else if(DominioSiete >= 17 && DominioSiete < 21){
      colorDominioSiete = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
    Dominio7Alto= DominioSiete
    }else if(DominioSiete >= 21){
      colorDominioSiete= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio7MuyAlto= DominioSiete
    }
    
    let Dominio8Nulo;
    let Dominio8Bajo;
    let Dominio8Medio;
    let Dominio8Alto;
    let Dominio8MuyAlto;
    let colorDominioOcho;
    let DominioOcho = (entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64).toFixed(2);
    if(DominioOcho < 7){
      colorDominioOcho  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio8Nulo= DominioOcho
    }else if(DominioOcho >= 7 && DominioOcho < 10){
      colorDominioOcho  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio8Bajo= DominioOcho
    }else if(DominioOcho >= 10 && DominioOcho < 13){
      colorDominioOcho=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio8Medio= DominioOcho
    }else if(DominioOcho >= 13 && DominioOcho < 16){
      colorDominioOcho = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio8Alto= DominioOcho
    }else if(DominioOcho >= 16){
      colorDominioOcho= <TableCell width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio8MuyAlto= DominioOcho
    }
    
    let Dominio9Nulo;
    let Dominio9Bajo;
    let Dominio9Medio;
    let Dominio9Alto;
    let Dominio9MuyAlto;
    let colorDominioNueve;
    let DominioNueve = (entero47+entero48+entero49+entero50+entero51+entero52).toFixed(2);
    if(DominioNueve < 6){
      colorDominioNueve  = <TableCell width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio9Nulo= DominioNueve
    }else if(DominioNueve >= 6 && DominioNueve < 10){
      colorDominioNueve  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio9Bajo= DominioNueve
    }else if(DominioNueve >= 10 && DominioNueve < 14){
      colorDominioNueve=<TableCell  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio9Medio= DominioNueve
    }else if(DominioNueve >= 14 && DominioNueve < 18){
      colorDominioNueve = <TableCell  width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio9Alto= DominioNueve
    }else if(DominioNueve >= 18){
      colorDominioNueve= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio9MuyAlto= DominioNueve
    }
    
    let Dominio10Nulo;
    let Dominio10Bajo;
    let Dominio10Medio;
    let Dominio10Alto;
    let Dominio10MuyAlto;
    let colorDominioDiez;
    let DominioDiez = (entero55+entero56+entero53+entero54).toFixed(2);
    if(DominioDiez < 4){
      colorDominioDiez  = <TableCell width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio10Nulo= DominioDiez
    }else if(DominioDiez >= 4 && DominioDiez < 6){
      colorDominioDiez  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
      Dominio10Bajo= DominioDiez
    }else if(DominioDiez >= 6 && DominioDiez < 8){
      colorDominioDiez=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      Dominio10Medio= DominioDiez
    }else if(DominioDiez >= 8 && DominioDiez < 10){
      colorDominioDiez = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
      Dominio10Alto= DominioDiez
    }else if(DominioDiez >= 10){
      colorDominioDiez= <TableCell  width="20px"style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      Dominio10MuyAlto= DominioDiez
    }

      return(

      <MDBContainer >

          <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
          <MDBTableBody>
          <tr>
            <td width="40%"><font size="1" face="arial"color="black"><strong>{rows[0].nombre} {rows[0].ApellidoP} {rows[0].ApellidoM}</strong></font></td>
          <td></td>
          <td></td>
          <td></td>
          </tr>
          <tr>
          <td width="40%"><font size="1" face="arial"color="black">RESULTADO DEL CUESTIONARIO :  </font></td>
          <td width="20%"><font size="1" face="arial"color="black">{total}</font></td>
          <td width="20%"><font size="1" face="arial"color="black">Nivel de riesgo </font></td>
          {color}
          </tr>                                  
          </MDBTableBody>
          </MDBTable>  
          <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
          <MDBTableBody>
          <tr>
            <td ><font size="1" face="arial"color="black"><strong>Necesidad de la acción :</strong></font></td>
          </tr>         
          <tr>
          {criterios}
            </tr>                     
          </MDBTableBody>
          </MDBTable>  

          <MDBTable  component={Paper}  small  className="text-left ">
            <MDBTableBody>
          <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">I.- Resultados de la categoría</font>
          </MDBTableBody>                                                                            
          </MDBTable>
          <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
            <MDBTableBody>
                
                <tr >                              
                <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Categoría</font></td>
                <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
                <td width="20px"><font size="1" face="arial"color="black">Riesgo</font></td>                                         
              </tr>
              <tr>           
              <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
              <td width="60px"  className="text-left"><font size="1" face="arial"color="black">Ambiente de Trabajo</font></td>
              <td width="15px"><font size="1" face="arial"color="black">{categoriaUno}</font></td>
                {colorCategoriaUno}                
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Factores propios de la actividad</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{categoriaDos}</font></td>
                  {colorCategoriaDos}
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Organización del tiempo de trabajo</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{categoriaTre}</font></td>
                {colorCategoriaTre}
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Liderazgo y relaciones en el trabajo</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{categoriaCuatro}</font></td>
                {colorCategoriaCuatro}
                </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Entorno organizacional</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{categoriaCinco}</font></td>
                {colorCategoriaCinco}  
              </tr>

            </MDBTableBody>
            </MDBTable>
            <MDBTable  component={Paper}  small  className="text-left ">
            <MDBTableBody>
          <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">II.- Resultados del dominio</font>
          </MDBTableBody>                                                                            
          </MDBTable>
            <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
            <MDBTableBody>
                
                <tr >                              
                <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Dominio</font></td>
                <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
                <td width="20px"><font size="1" face="arial"color="black">Riesgo</font></td>                                         
              </tr>
              <tr>           
              <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
              <td width="60px"  className="text-left"><font size="1" face="arial"color="black">Carga de Trabajo</font></td>
              <td width="15px"><font size="1" face="arial"color="black">{DominioUno}</font></td>
                {colorDominioUno}                
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Condiciones en el ambiente de trabajo</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{DominioDos}</font></td>
                  {colorDominioDos}
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Falta de control sobre el trabajo</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{DominioTres}</font></td>
                {colorDominioTres}
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Interferencia en la relación trabajo-familia</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{DominioCuatro}</font></td>
                {colorDominioCuatro}
                </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Jornada de trabajo</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{DominioCinco}</font></td>
                {colorDominioCinco}  
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >6</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Liderazgo</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{DominioSeis}</font></td>
                {colorDominioSeis}  
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >7</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Relaciones en el trabajo</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{DominioSiete}</font></td>
                {colorDominioSiete}  
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >8</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Violencia</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{DominioOcho}</font></td>
                {colorDominioOcho}  
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >9</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Reconocimiento del desempeño</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{DominioNueve}</font></td>
                {colorDominioNueve}  
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >10</font></td>
                <td width="60px" className="text-left"><font size="1" face="arial"color="black">Insuficiente sentido de pertenencia e, inestabilidad</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{DominioDiez}</font></td>
                {colorDominioDiez}  
              </tr>
              
            </MDBTableBody>
            </MDBTable>

            <MDBTable  component={Paper}  small  className="text-left ">
            <MDBTableBody>
          <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">III.- Resultados por Dimensión</font>
          </MDBTableBody>                                                                            
          </MDBTable>
            <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
            <MDBTableBody>
                
                <tr >                              
                <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Dimensión</font></td>
                <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
              </tr>
              <tr>           
              <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
              <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Condiciones peligrosas e inseguras</font></td>
              <td width="15px"><font size="1" face="arial"color="black">{(entero1+entero3).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero2+entero4).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{entero5.toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero6+entero12).toFixed(2)}</font></td>
                </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero7+entero8).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >6</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Carga mental</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero9+entero10+entero11).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >7</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero65+entero66+entero67+entero68).toFixed(2)}</font></td>
                </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >8</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero13+entero14).toFixed(2)}</font></td>
              </tr>


              <tr>           
              <td width="5px"><font size="1" face="arial"color="black" >9</font></td>
              <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
              <td width="15px"><font size="1" face="arial"color="black">{(entero15+entero16).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >10</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero25+entero26+entero27+entero28).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >11</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero23+entero24).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >12</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Insuficiente participación y manejo del cambio</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero29+entero30).toFixed(2)}</font></td>
                </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >13</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero35+entero36).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >14</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero17+entero18).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >15</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero19+entero20).toFixed(2)}</font></td>
                </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >16</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero21+entero22).toFixed(2)}</font></td>
              </tr>

              <tr>           
              <td width="5px"><font size="1" face="arial"color="black" >17</font></td>
              <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
              <td width="15px"><font size="1" face="arial"color="black">{(entero31+entero32+entero33+entero34).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >18</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero37+entero38+entero39+entero40+entero41).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >19</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Relaciones sociales en el trabajo</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero42+entero43+entero44+entero45+entero46).toFixed(2)}</font></td>
              </tr>

              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >20</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero69+entero70+entero71+entero72).toFixed(2)}</font></td>
                </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >21</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Violencia laboral</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >22</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Escasa o nula retroalimentación del desempeño</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero47+entero48).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >23</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Escaso o nulo reconocimiento y compensación</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero49+entero50+entero51+entero52).toFixed(2)}</font></td>
                </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >24</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitado sentido de pertenencia</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero55+entero56).toFixed(2)}</font></td>
              </tr>
              <tr>         
                <td width="5px"><font size="1" face="arial"color="black" >25</font></td>
                <td width="80px" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                <td width="15px"><font size="1" face="arial"color="black">{(entero53+entero54).toFixed(2)}</font></td>
              </tr>
            </MDBTableBody>
            </MDBTable>                        
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            </MDBContainer> 
              )}
              })}
            </div>  
            </PDFExport>
            </div>  
            </div>
                    
              ) } 
              return(
              <MDBContainer>
              <MDBRow>     
              <MDBCol>   
              <MDBBtn  color="primary" size="3" outline className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                  Descargar Resultados
              </MDBBtn>
              </MDBCol>
              <MDBCol> 
              </MDBCol> 
              </MDBRow>  
              </MDBContainer>
                    )
                    })}
              </MDBContainer>  
              </MDBCol>
            </MDBRow>
              {ponderacion}
              {ponderacionIndividual}
              {pdfView1}
            </div> 
          </Grow>  
        </div> 
      </div>
      </div>
      </React.Fragment>
      
    )
  }
}