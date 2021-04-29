import React from "react";
import MUIDataTable from "mui-datatables";
import Grow from "@material-ui/core/Grow";
import {MDBRow,MDBCol,MDBBtn,MDBTable, MDBTableBody, MDBContainer,MDBTableHead} from 'mdbreact';
import logo from '../images/logo.png'
import diagnostico from '../images/diagnostico.png'
import { API} from '../utils/http'
import {Spinner,Button as BotonReactstrap} from 'react-bootstrap'
import '../Home/index.css'
import Button from '@material-ui/core/Button';
import { DialogUtility } from '@syncfusion/ej2-popups';
import Modal from 'react-modal';
import {Alert} from 'reactstrap'
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
      reporteEjecutivo:[],
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
      datosLength:'',
      totalEmpleadosFiltrados:'',
      resultadosInicio:[],
      showModal2: false,  
      spinner:false,
      empleadosRE:[],
      evaluacionMasivoResultados:[],
      respuestasInicio:[],
      valor1:[],
      valor2:[],
      valor3:[],
      valor4:[],
      valor5:[],
      valor6:[],
      valor7:[],
      valor8:[],
      valor9:[],
      valor10:[],
      valor11:[],
      valor12:[],
      valor13:[],
      valor14:[],
      valor15:[],
      valor16:[],
      valor17:[],
      valor18:[],
      valor19:[],
      valor20:[],
      valor21:[],
      valor22:[],
      valor23:[],
      valor24:[],
      valor25:[],
      valor26:[],
      valor27:[],
      valor28:[],
      valor29:[],
      valor30:[],
      valor31:[],
      valor32:[],
      valor33:[],
      valor34:[],
      valor35:[],
      valor36:[],
      valor37:[],
      valor38:[],
      valor39:[],
      valor40:[],
      valor41:[],
      valor42:[],
      valor43:[],
      valor44:[],
      valor45:[],
      valor46:[],
      volor47:[],
      valor48:[],
      valor49:[],
      valor50:[],
      valor51:[],
      valor52:[],
      valor53:[],
      valor54:[],
      valor55:[],
      valor56:[],
      valor57:[],
      valor58:[],
      valor59:[],
      valor60:[],
      valor61:[],
      valor62:[],
      valor63:[],
      valor64:[],
      valor65:[],
      valor66:[],
      valor67:[],
      valor68:[],
      valor69:[],
      valor70:[],
      valor71:[],
      valor72:[],
      FechaCompleta:''

      // componentepdf:'0'
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.ads = this.ads.bind(this);
    this.reporteEjecutivo = this.reporteEjecutivo.bind(this);  
    
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

      this.getGlobalEmployees();
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
  getGlobalEmployees = async ( ) => {
    this.setState({spinner:true})
    let totalEmpleados=[];
    let totalEmpleadosResultados=[];
    var id  =localStorage.getItem("idAdmin")       
    // const url = 'http://localhost:8000/graphql'
    await axios({
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
          Respuestas 
          fk_preguntasEEO
          ponderacion
            }
          }
          `
       }
       }).then((datos) => {
         
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
                  fk_empleados 
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
              
              this.setState({resultadosInicio:totalEmpleados})
              if(this.state.resultadosInicio.length == this.state.empleados.length){
                this.setState({spinner:false})
              }
            })
            .catch(err => {
            }); 
             axios({
              url:  API,
              method:'post',
              data:{
              query:`
              query{
              resultSingleSurveyEEO(data:"${[rows.id,rows.periodo]}"){
                id 
                Respuestas 
                fk_preguntasEEO
                fk_empleados
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
              totalEmpleadosResultados.push(datos.data.data.resultSingleSurveyEEO)
              this.setState({evaluacionMasivoResultados : totalEmpleadosResultados})  
              this.setState({resultadosQueryMasivo : totalEmpleadosResultados})  
              if(this.state.evaluacionMasivoResultados.length == this.state.empleados.length){
                this.setState({spinner:false})
              }    
            })
            .catch(err => {
              console.log("el error es  ",err.response)
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
      let arrayFilter = []
      let filter;
      
      await this.state.resultadosInicio.forEach(row=>{
           array.forEach(element => {
            filter  = row.filter(function(hero){
              return hero.fk_empleados === element
            })
              arrayFilter.push(filter)

            }); 
      })
      let tag = []
      function array_equals(a, b){
        return a.length === b.length && a.every((item,idx) => item === b[idx])
       }
      var filtrado = arrayFilter.filter(item => !array_equals(item, tag))

      this.setState({peticion1:filtrado}) 
       this.setState({spinner:false});
           
      if(filtro !== undefined){
        
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
    let arrayFilter = []
    let filter;
    
    this.state.resultadosInicio.forEach(row=>{
      array.forEach(rows=>{
      filter =row.filter(function(hero){
        return hero.fk_empleados === rows
      })
        arrayFilter.push(filter)
      })
    })
    function array_equals(a, b){
      return a.length === b.length && a.every((item,idx) => item === b[idx])
     }
     let tag = []
     var filtrado = arrayFilter.filter(item => !array_equals(item, tag))

      this.setState({reporteImasivo:filtrado})
      this.setState({spinner:false});

         
    if(filtro!== undefined){
      
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

    datos.map(rows=>{
      array.push(rows.data[0])
    })

    let arrayFilter = []
    let filter;
    
    this.state.evaluacionMasivoResultados.forEach(row=>{
      array.forEach(rows=>{
      filter =row.filter(function(hero){
        return hero.fk_empleados === rows
      })
        arrayFilter.push(filter)
      })
    })
    function array_equals(a, b){
      return a.length === b.length && a.every((item,idx) => item === b[idx])
     }
     let tag = []
     var filtrado = arrayFilter.filter(item => !array_equals(item, tag))
   
      this.setState({resultadosEvaluacionMasivo:filtrado})
      this.setState({spinner:false});

    if(filtro!== undefined){
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
                fk_empleados
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
                  this.setState({resultados:''})
                  this.setState({resultados :datos.data.data.resultSingleSurveyEEO })                
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
                  fk_empleados
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
                    if(datos.data.data.resultSingleSurveyEEO.length > 0 ){
                      this.setState({resultadosEvaluacion:''})
                    this.setState({resultadosEvaluacion :datos.data.data.resultSingleSurveyEEO })                
                    this.setState({resultados:[]}) 
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
                  fk_empleados
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
                    this.setState({resultadosQuery:''})              
                    this.setState({resultadosQuery :datos.data.data.resultSingleSurveyEEO })                
        
                  })
                  .catch(err => {
                    console.log("el error es  ",err)
                  });  
                    }
                  reporteEjecutivo = async (datos,filtro)=>{
                    this.setState({botonDisabled:''})
                    this.setState({botonResultados:''})
                    this.setState({spinner:true})
                    let array=[];
                    let periodo;
                    let totalEmpleados=[];
                    let array1=[], array2=[], array3=[], array4=[], array5=[], array6=[], array7=[], array8=[], array9=[], array10=[]      
                    let array11=[], array12=[], array13=[], array14=[], array15=[], array16=[], array17=[], array18=[], array19=[], array20=[]      
                    let array21=[], array22=[], array23=[], array24=[], array25=[], array26=[], array27=[], array28=[], array29=[], array30=[]      
                    let array31=[], array32=[], array33=[], array34=[], array35=[], array36=[], array37=[], array38=[], array39=[], array40=[]      
                    let array41=[], array42=[], array43=[], array44=[], array45=[], array46=[], array47=[], array48=[], array49=[], array50=[]      
                    let array51=[], array52=[], array53=[], array54=[], array55=[], array56=[], array57=[], array58=[], array59=[], array60=[]      
                    let array61=[], array62=[], array63=[], array64=[], array65=[], array66=[], array67=[], array68=[], array69=[], array70=[]
                    let array71=[],array72=[];
          
                    let filtrar1, filtrar2, filtrar3, filtrar4, filtrar5, filtrar6, filtrar7, filtrar8, filtrar9, filtrar10
                    let filtrar11, filtrar12, filtrar13, filtrar14, filtrar15, filtrar16, filtrar17, filtrar18, filtrar19, filtrar20
                    let filtrar21, filtrar22, filtrar23, filtrar24, filtrar25, filtrar26, filtrar27, filtrar28, filtrar29, filtrar30
                    let filtrar31, filtrar32, filtrar33, filtrar34, filtrar35, filtrar36, filtrar37, filtrar38, filtrar39, filtrar40
                    let filtrar41, filtrar42, filtrar43, filtrar44, filtrar45, filtrar46, filtrar47, filtrar48, filtrar49, filtrar50
                    let filtrar51, filtrar52, filtrar53, filtrar54, filtrar55, filtrar56, filtrar57, filtrar58, filtrar59, filtrar60
                    let filtrar61, filtrar62, filtrar63, filtrar64, filtrar65, filtrar66, filtrar67, filtrar68, filtrar69, filtrar70
                    let filtrar71, filtrar72;

                    datos.map(rows=>{
                      periodo= rows.data[6]
                      array.push(rows.data[0])
                    })
                              
                    let arrayFilter = []
                    let filter;
                     this.state.resultadosInicio.forEach(row=>{
                        array.forEach(element => {
                          filter  = row.filter(function(hero){
                            return hero.fk_empleados === element
                          })
                            arrayFilter.push(filter)
                          }); 
                    })
                    let tag = []
                    function array_equals(a, b){
                      return a.length === b.length && a.every((item,idx) => item === b[idx])
                    }
                    var filtrado = arrayFilter.filter(item => !array_equals(item, tag))
                    
                    var array1Int;
                    var arr1Int;
                    var respuesta1;
                 
                    filtrado.map(rows=>{
                    filtrar1 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 1;
                    });
                    array1.push(filtrar1)
                    
                      let valor1=[];  
                      let empleados = []  
                      array1.map(rows=>{
                        empleados.push(rows[0].nombre +" " + rows[0].ApellidoP  + " " + rows[0].ApellidoM) 
                          valor1.push(rows[0].ponderacion)           
                   })
                   this.setState({valor1:valor1})  
                  this.setState({empleadosRE:empleados})        
                       }) 
                       
                    filtrado.map(rows=>{
                    filtrar2 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 2;
                    });
                    array2.push(filtrar2)
                      let valor2=[];    
                      array2.map(rows=>{
                            valor2.push(rows[0].ponderacion)            
                    })
                    this.setState({valor2:valor2})
                             }) 
          
                    filtrado.map(rows=>{
                    filtrar3 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 3;
                    });
                    array3.push(filtrar3)
                      let valor3=[];    
                      array3.map(rows=>{
                            valor3.push(rows[0].ponderacion)            
                    })
                    this.setState({valor3:valor3})
                             })
          
                    filtrado.map(rows=>{
                    filtrar4 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 4;
                    });
                    array4.push(filtrar4)
                      let valor4=[];    
                      array4.map(rows=>{
                            valor4.push(rows[0].ponderacion)           
                    })
                    this.setState({valor4:valor4})
                             })
          
                    filtrado.map(rows=>{
                    filtrar5 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 5;
                    });
                    array5.push(filtrar5)
                      let valor5=[];    
                      array5.map(rows=>{                        
                            valor5.push(rows[0].ponderacion)        
                    })
                    this.setState({valor5:valor5})
                             })
          
                    filtrado.map(rows=>{
                    filtrar6 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 6;
                    });
                    array6.push(filtrar6)
                      let valor6=[];    
                      array6.map(rows=>{
                            valor6.push(rows[0].ponderacion)
                    })
                    console.log("array6" , array6)
                    this.setState({valor6:valor6})
                              })
          
                    filtrado.map(rows=>{
                    filtrar7 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 7;
                    });
                    array7.push(filtrar7)
                     let valor7=[];    
                      array7.map(rows=>{
                            valor7.push(rows[0].ponderacion)          
                    })
                    this.setState({valor7:valor7})
                              })
          
                    filtrado.map(rows=>{
                    filtrar8 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 8;
                    });
                    array8.push(filtrar8)
                      let valor8=[];    
                      array8.map(rows=>{
                            valor8.push(rows[0].ponderacion)            
                    })
                    this.setState({valor8:valor8})
                              })
          
                    filtrado.map(rows=>{
                    filtrar9 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 9;
                    });
                    array9.push(filtrar9)
                      let valor9=[];    
                      array9.map(rows=>{
                            valor9.push(rows[0].ponderacion)            
                    })
                    this.setState({valor9:valor9})
                              })
          
                    filtrado.map(rows=>{
                    filtrar10 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 10;
                    });
                    array10.push(filtrar10)
                      let valor10=[];    
                      array10.map(rows=>{
                            valor10.push(rows[0].ponderacion)            
                    })
                    this.setState({valor10:valor10})
                              })
          
                    filtrado.map(rows=>{
                    filtrar11 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 11;
                    });
                    array11.push(filtrar11)
                      let valor11=[];    
                      array11.map(rows=>{
                            valor11.push(rows[0].ponderacion)             
                    })
                    this.setState({valor11:valor11})
                              })
          
                    filtrado.map(rows=>{
                    filtrar12 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 12;
                    });
                    array12.push(filtrar12)
                      let valor12=[];    
                      array12.map(rows=>{
                            valor12.push(rows[0].ponderacion)          
                    })
                    this.setState({valor12:valor12})
                              })
          
                    filtrado.map(rows=>{
                    filtrar13 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 13;
                    });
                    array13.push(filtrar13)
                      let valor13=[];    
                      array13.map(rows=>{
                            valor13.push(rows[0].ponderacion)            
                    })
                    this.setState({valor13:valor13})
                              })
          
                    filtrado.map(rows=>{
                    filtrar14 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 14;
                    });
                    array14.push(filtrar14)
                    let valor14=[];    
                      array14.map(rows=>{
                            valor14.push(rows[0].ponderacion)            
                    })
                    this.setState({valor14:valor14})
                              })
          
                    filtrado.map(rows=>{
                    filtrar15 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 15;
                    });
                    array15.push(filtrar15)
                     let valor15=[];    
                      array15.map(rows=>{
                            valor15.push(rows[0].ponderacion)            
                    })
                    this.setState({valor15:valor15})
                              })
          
                    filtrado.map(rows=>{
                    filtrar16 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 16;
                    });
                    array16.push(filtrar16)
                     let valor16=[];    
                      array16.map(rows=>{
                            valor16.push(rows[0].ponderacion)          
                    })
                    this.setState({valor16:valor16})
                              })
                    
                    filtrado.map(rows=>{
                    filtrar17 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 17;
                    });
                    array17.push(filtrar17)
                    let valor17=[];    
                      array17.map(rows=>{
                            valor17.push(rows[0].ponderacion)            
                    })
                    this.setState({valor17:valor17})
                              })
          
                    filtrado.map(rows=>{
                    filtrar18 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 18 ;
                    });
                    array18.push(filtrar18)
                     let valor18=[];    
                      array18.map(rows=>{
                            valor18.push(rows[0].ponderacion)            
                    })
                    this.setState({valor18:valor18})
                              })
          
                    filtrado.map(rows=>{
                    filtrar19 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 19;
                    });
                    array19.push(filtrar19)
                    let valor19=[];    
                      array19.map(rows=>{
                            valor19.push(rows[0].ponderacion)            
                    })
                    this.setState({valor19:valor19})
                              })
          
                    filtrado.map(rows=>{
                    filtrar20 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 20;
                    });
                    array20.push(filtrar20)
                    let valor20=[];    
                      array20.map(rows=>{
                            valor20.push(rows[0].ponderacion)             
                    })
                    this.setState({valor20:valor20})
                              })
          
                    filtrado.map(rows=>{
                    filtrar21 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 21;
                    });
                    array21.push(filtrar21)
                    let valor21=[];    
                      array21.map(rows=>{
                            valor21.push(rows[0].ponderacion)            
                    })
                    this.setState({valor21:valor21})
                              })
          
                    filtrado.map(rows=>{
                    filtrar22 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 22;
                    });
                    array22.push(filtrar22)
                      let valor22=[];    
                      array22.map(rows=>{
                            valor22.push(rows[0].ponderacion)          
                    })
                    this.setState({valor22:valor22})
                              })
          
                    filtrado.map(rows=>{
                    filtrar23 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 23;
                    });
                    array23.push(filtrar23)
                     let valor23=[];    
                      array23.map(rows=>{
                            valor23.push(rows[0].ponderacion)           
                    })
                    this.setState({valor23:valor23})
                              })
          
                    filtrado.map(rows=>{
                    filtrar24 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 24;
                    });
                    array24.push(filtrar24)
                    let valor24=[];    
                      array24.map(rows=>{
                            valor24.push(rows[0].ponderacion)           
                    })
                    this.setState({valor24:valor24})
                              })
          
                    filtrado.map(rows=>{
                    filtrar25=  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 25;
                    });
                    array25.push(filtrar25)
                    let valor25=[];    
                      array25.map(rows=>{
                            valor25.push(rows[0].ponderacion)
                    })
                    this.setState({valor25:valor25})
                              })
          
                    filtrado.map(rows=>{
                    filtrar26 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 26;
                    });
                    array26.push(filtrar26)
                    let valor26=[];    
                      array26.map(rows=>{
                            valor26.push(rows[0].ponderacion)
                    })
                    this.setState({valor26:valor26})
                              })
          
                    filtrado.map(rows=>{
                    filtrar27 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 27;
                    });
                    array27.push(filtrar27)
                     let valor27=[];    
                      array27.map(rows=>{
                            valor27.push(rows[0].ponderacion)           
                    })
                    this.setState({valor27:valor27})
                              })
          
                    filtrado.map(rows=>{
                    filtrar28 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 28;
                    });
                    array28.push(filtrar28)
                     let valor28=[];    
                      array28.map(rows=>{
                            valor28.push(rows[0].ponderacion)             
                    })
                    this.setState({valor28:valor28})
                              })
          
                    filtrado.map(rows=>{
                    filtrar29 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 29;
                    });
                    array29.push(filtrar29)
                     let valor29=[];    
                      array29.map(rows=>{
                            valor29.push(rows[0].ponderacion)            
                    })
                    this.setState({valor29:valor29})
                              })
          
                    filtrado.map(rows=>{
                    filtrar30 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 30;
                    });
                    array30.push(filtrar30)
                    let valor30=[];    
                      array30.map(rows=>{
                            valor30.push(rows[0].ponderacion)            
                    })
                    this.setState({valor30:valor30})
                              })
          
                    filtrado.map(rows=>{
                    filtrar31 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 31;
                    });
                    array31.push(filtrar31)
                     let valor31=[];    
                      array31.map(rows=>{
                            valor31.push(rows[0].ponderacion)            
                    })
                    this.setState({valor31:valor31})
                              })
          
                    filtrado.map(rows=>{
                    filtrar32 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 32;
                    });
                    array32.push(filtrar32)
                     let valor32=[];    
                      array32.map(rows=>{
                            valor32.push(rows[0].ponderacion)            
                    })
                    this.setState({valor32:valor32})
                              }) 
          
                    filtrado.map(rows=>{
                    filtrar33 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 33;
                    });
                    array33.push(filtrar33)
                     let valor33=[];    
                      array33.map(rows=>{
                            valor33.push(rows[0].ponderacion)           
                    })
                    this.setState({valor33:valor33})
                              })
          
                    filtrado.map(rows=>{
                    filtrar34=  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 34;
                    });
                    array34.push(filtrar34)
                    let valor34=[];    
                      array34.map(rows=>{
                            valor34.push(rows[0].ponderacion)           
                    })
                    this.setState({valor34:valor34})
                              })
          
                    filtrado.map(rows=>{
                    filtrar35 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 35;
                    });
                    array35.push(filtrar35)
                    let valor35=[];    
                      array35.map(rows=>{  
                        valor35.push(rows[0].ponderacion)          
                    })
                    console.log("array35" , array35)
                    this.setState({valor35:valor35})
                              })
          
                    filtrado.map(rows=>{
                    filtrar36 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 36;
                    });
                    array36.push(filtrar36)
                    let valor36=[];    
                      array36.map(rows=>{
                            valor36.push(rows[0].ponderacion)            
                    })
                    this.setState({valor36:valor36})
                              })
          
                    filtrado.map(rows=>{
                    filtrar37 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 37;
                    });
                    array37.push(filtrar37)
                    let valor37=[];    
                      array37.map(rows=>{
                            valor37.push(rows[0].ponderacion)           
                    })
                    this.setState({valor37:valor37})
                              })
          
                    filtrado.map(rows=>{
                    filtrar38 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 38;
                    });
                    array38.push(filtrar38)
                    let valor38= []    
                      array38.map(rows=>{
                            valor38.push(rows[0].ponderacion)            
                    })
                    this.setState({valor38:valor38})
                              })
          
                    filtrado.map(rows=>{
                    filtrar39 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 39;
                    });
                    array39.push(filtrar39)
                    let valor39=[];    
                      array39.map(rows=>{
                            valor39.push(rows[0].ponderacion)            
                    })
                    this.setState({valor39:valor39})
                              })
            
                    filtrado.map(rows=>{
                    filtrar40 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 40;
                    });
                    array40.push(filtrar40)
                     let valor40=[];    
                      array40.map(rows=>{
                            valor40.push(rows[0].ponderacion)           
                    })
                    this.setState({valor40:valor40})
                              })
          
                    filtrado.map(rows=>{
                    filtrar41 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 41;
                    });
                    array41.push(filtrar41)
                     let valor41=[];    
                      array41.map(rows=>{
                            valor41.push(rows[0].ponderacion)            
                    })
                    this.setState({valor41:valor41})
                              })
          
                    filtrado.map(rows=>{
                    filtrar42 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 42;
                    });
                    array42.push(filtrar42)
                     let valor42=[];    
                      array42.map(rows=>{
                            valor42.push(rows[0].ponderacion)            
                    })
                    this.setState({valor42:valor42})
                              })
          
                    filtrado.map(rows=>{
                    filtrar43 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 43;
                    });
                    array43.push(filtrar43)
                    let valor43=[];    
                      array43.map(rows=>{
                            valor43.push(rows[0].ponderacion)            
                    })
                    this.setState({valor43:valor43})
                              })
          
                    filtrado.map(rows=>{
                    filtrar44 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 44;
                    });
                    array44.push(filtrar44)
                    let valor44=[];    
                      array44.map(rows=>{
                            valor44.push(rows[0].ponderacion)           
                    })
                    this.setState({valor44:valor44})
                              })
          
                    filtrado.map(rows=>{
                    filtrar45 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 45;
                    });
                    array45.push(filtrar45)
                    let valor45=[];    
                      array45.map(rows=>{
                            valor45.push(rows[0].ponderacion)           
                    })
                    this.setState({valor45:valor45})
                              })
          
                    filtrado.map(rows=>{
                    filtrar46 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 46;
                    });
                    array46.push(filtrar46)
                    let valor46=[];    
                      array46.map(rows=>{
                            valor46.push(rows[0].ponderacion)
                    })
                    this.setState({valor46:valor46})
                              })

                    filtrado.map(rows=>{
                    filtrar47 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 47;
                    });
                    array47.push(filtrar47)
                    let valor47=[];    
                      array47.map(rows=>{
                            valor47.push(rows[0].ponderacion)            
                    })
                    this.setState({valor47:valor47})
                              })

                    filtrado.map(rows=>{
                    filtrar48 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 48;
                    });
                    array48.push(filtrar48)
                     let valor48=[];    
                      array48.map(rows=>{
                            valor48.push(rows[0].ponderacion)           
                    })
                    this.setState({valor48:valor48})
                              })

                    filtrado.map(rows=>{
                    filtrar49 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 49;
                    });
                    array49.push(filtrar49)
                     let valor49=[];    
                      array49.map(rows=>{
                            valor49.push(rows[0].ponderacion)            
                    })
                    this.setState({valor49:valor49})
                              })
                                      
                    filtrado.map(rows=>{
                    filtrar50 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 50;
                    });
                    array50.push(filtrar50)
                    let valor50=[];    
                      array50.map(rows=>{
                            valor50.push(rows[0].ponderacion)            
                    })
                    this.setState({valor50:valor50})
                              })

                    filtrado.map(rows=>{
                    filtrar51 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 51;
                    });
                    array51.push(filtrar51)
                      let valor51=[];    
                      array51.map(rows=>{
                            valor51.push(rows[0].ponderacion)
                    })
                    this.setState({valor51:valor51})
                              })

                    filtrado.map(rows=>{
                    filtrar52 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 52;
                    });
                    array52.push(filtrar52)
                    let valor52=[];    
                      array52.map(rows=>{
                            valor52.push(rows[0].ponderacion)     
                    })
                    this.setState({valor52:valor52})
                              })

                    filtrado.map(rows=>{
                    filtrar53 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 53;
                    });
                    array53.push(filtrar53)
                    let valor53=[];    
                      array53.map(rows=>{
                            valor53.push(rows[0].ponderacion)         
                    })
                    this.setState({valor53:valor53})
                              })

                    filtrado.map(rows=>{
                    filtrar54 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 54;
                    });
                    array54.push(filtrar54)
                    let valor54=[];    
                      array54.map(rows=>{
                            valor54.push(rows[0].ponderacion)         
                    })
                    this.setState({valor54:valor54})
                              })

                    filtrado.map(rows=>{
                    filtrar55 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 55;
                    });
                    array55.push(filtrar55)
                    let valor55=[];    
                      array55.map(rows=>{
                            valor55.push(rows[0].ponderacion)         
                    })
                    this.setState({valor55:valor55})
                              })

                    filtrado.map(rows=>{
                    filtrar56 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 56;
                    });
                    array56.push(filtrar56)
                    let valor56=[];    
                      array56.map(rows=>{
                            valor56.push(rows[0].ponderacion)        
                    })
                    this.setState({valor56:valor56})
                              })

                    filtrado.map(rows=>{
                    filtrar57 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 57;
                    });
                    array57.push(filtrar57)
                    let valor57=[];    
                      array57.map(rows=>{
                            valor57.push(rows[0].ponderacion)
                    })
                      this.setState({valor57:valor57})
                              })

                    filtrado.map(rows=>{
                    filtrar58 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 58;
                    });
                    array58.push(filtrar58)
                    let valor58=[];    
                      array58.map(rows=>{
                            valor58.push(rows[0].ponderacion)      
                    })
                    this.setState({valor58:valor58})
                              })

                    filtrado.map(rows=>{
                    filtrar59 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 59;
                    });
                    array59.push(filtrar59)
                    let valor59=[];    
                      array59.map(rows=>{
                            valor59.push(rows[0].ponderacion)           
                    })
                    this.setState({valor59:valor59})
                              })

                    filtrado.map(rows=>{
                    filtrar60 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 60;
                    });
                    array60.push(filtrar60)
                     let valor60=[];    
                      array60.map(rows=>{
                            valor60.push(rows[0].ponderacion)            
                    })
                    this.setState({valor60:valor60})
                              })

                    filtrado.map(rows=>{
                    filtrar61 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 61;
                    });
                    array61.push(filtrar61)
                     let valor61=[];    
                      array61.map(rows=>{
                            valor61.push(rows[0].ponderacion)           
                    })
                    this.setState({valor61:valor61})
                              })

                    filtrado.map(rows=>{
                    filtrar62 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 62;
                    });
                    array62.push(filtrar62)
                    let valor62=[];    
                      array62.map(rows=>{
                            valor62.push(rows[0].ponderacion)            
                    })
                    this.setState({valor62:valor62})
                              })

                    filtrado.map(rows=>{
                    filtrar63 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 63;
                    });
                    array63.push(filtrar63)
                    let valor63=[];    
                      array63.map(rows=>{
                            valor63.push(rows[0].ponderacion)          
                    })
                    this.setState({valor63:valor63})
                              })

                    filtrado.map(rows=>{
                    filtrar64 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 64;
                    });
                    array64.push(filtrar64)
                    let valor64=[];    
                      array64.map(rows=>{
                            valor64.push(rows[0].ponderacion)             
                    })
                    this.setState({valor64:valor64})
                              })


                    filtrado.map(rows=>{
                    filtrar65 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 65;
                    });
                    array65.push(filtrar65)
                     let valor65=[];    
                      array65.map(rows=>{
                            valor65.push(rows[0].ponderacion)           
                    })
                    this.setState({valor65:valor65})
                              })

                    filtrado.map(rows=>{
                    filtrar66 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 66;
                    });
                    array66.push(filtrar66)
                    let valor66=[];    
                      array66.map(rows=>{
                            valor66.push(rows[0].ponderacion)           
                    })
                    this.setState({valor66:valor66})
                              })

                    filtrado.map(rows=>{
                    filtrar67 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 67;
                    });
                    array67.push(filtrar67)
                     let valor67=[];    
                      array67.map(rows=>{
                            valor67.push(rows[0].ponderacion)            
                    })
                    this.setState({valor67:valor67})
                              })

                    filtrado.map(rows=>{
                    filtrar68 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 68;
                    });
                    array68.push(filtrar68)
                    let valor68=[];    
                      array68.map(rows=>{
                            valor68.push(rows[0].ponderacion)            
                    })
                    this.setState({valor68:valor68})
                              })

                    filtrado.map(rows=>{
                    filtrar69 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 69;
                    });
                    array69.push(filtrar69)
                    let valor69=[];    
                      array69.map(rows=>{
                            valor69.push(rows[0].ponderacion)            
                    })
                    this.setState({valor69:valor69})
                              })

                    filtrado.map(rows=>{
                    filtrar70 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 70;
                    });
                    array70.push(filtrar70)
                    let valor70=[];    
                      array70.map(rows=>{
                            valor70.push(rows[0].ponderacion)            
                    })
                    this.setState({valor70:valor70})
                              })

                    filtrado.map(rows=>{
                    filtrar71 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 71;
                    });
                    array71.push(filtrar71)
                    let valor71=[];    
                      array71.map(rows=>{
                            valor71.push(rows[0].ponderacion)          
                    })
                    this.setState({valor71:valor71})
                              })

                    filtrado.map(rows=>{
                    filtrar72 =  rows.filter(function(hero) {
                      return hero.fk_preguntasEEO == 72;
                    });
                    array72.push(filtrar72)
                     let valor72=[];    
                      array72.map(rows=>{
                            valor72.push(rows[0].ponderacion)           
                    })
                    this.setState({valor72:valor72})
                              })
                    
                      this.setState({spinner:false});    
                      if(filtro!== undefined){
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
                                 
                  
  render() {
    let spinner;
    let spinnerReporte;
    let nombre;
    let arrayNombre= []
    let a;
    let botonCerrar;
    if(!this.state.botonDisabled){
        botonCerrar=<MDBBtn className = "text-white"  size="md" color="danger" onClick={(e)=>{window.location.reload()}} >Cerrar</MDBBtn>
    }
    if(this.state.spinner=== true){
      spinner = <div><MDBBtn className = "text-white"  size="md" color="danger" disabled>
      <Spinner
        as="span"
        outline
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      
    </MDBBtn>{''}
    <MDBBtn className = "text-white"  size="md" color="secondary" disabled>
      <Spinner
        as="span"
        outlined
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Validando información por favor espere ...
    </MDBBtn>{''}
    </div>
    }    
    if(this.state.spinnerReporte=== true){
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
        let botonRespuestas = <div><MDBBtn className = "text-white"  disabled={!this.state.botonResultados}  size="md" color="danger"  onClick={(e) => this.click(rows.id,rows.periodo)}>Respuestas</MDBBtn></div>
      let botonResultados =  <div><MDBBtn className = "text-white"  disabled={!this.state.botonResultados} color="secondary" size="md" onClick={(e) => this.getEvaluacion(rows.id,rows.periodo)}>Resultados</MDBBtn></div> 
      return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.Sexo,rows.AreaTrabajo,rows.Puesto,rows.CentroTrabajo,rows.periodo,botonRespuestas,botonResultados])
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
      let array61=[], array62=[], array63=[], array64=[], array65=[], array66=[], array67=[], array68=[], array69=[], array70=[]
      let array71=[],array72=[];

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
 
  let length =this.state.peticion1.length;
  let general =total/length;

  console.log("general" , general)

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
  colorCategoriaUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria1Nulo= categoriaUno
}else if(categoriaUno >= 5 && categoriaUno < 9){
  colorCategoriaUno =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria1Bajo= categoriaUno
}else if(categoriaUno >= 9 && categoriaUno < 11){
  colorCategoriaUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria1Medio= categoriaUno
}else if(categoriaUno >= 11 && categoriaUno < 14){
  colorCategoriaUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria1Alto= categoriaUno
}else if(categoriaUno >= 14){
  colorCategoriaUno = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorCategoriaDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria2Nulo= categoriaDos
}else if(categoriaDos >= 15 && categoriaDos < 30){
  colorCategoriaDos =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria2Bajo= categoriaDos
}else if(categoriaDos >=30 && categoriaDos < 45){
  colorCategoriaDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria2Medio= categoriaDos
}else if(categoriaDos >=45 && categoriaDos < 60){
  colorCategoriaDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria2Alto= categoriaDos
}else if(categoriaDos >= 60){
  colorCategoriaDos = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria3Nulo= categoriaTre
}else if(categoriaTre >= 5 && categoriaTre < 7){
  colorCategoriaTre =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria3Bajo= categoriaTre
}else if(categoriaTre >=7 && categoriaTre < 10){
  colorCategoriaTre=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria3Medio= categoriaTre
}else if(categoriaTre >=10 && categoriaTre < 13){
  colorCategoriaTre = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria3Alto= categoriaTre
}else if(categoriaTre >= 13){
  colorCategoriaTre = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorCategoriaCuatro  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria4Nulo= categoriaCuatro
}else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
  colorCategoriaCuatro =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria4Bajo= categoriaCuatro
}else if(categoriaCuatro >=29 && categoriaCuatro < 42){
  colorCategoriaCuatro=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria4Medio= categoriaCuatro
}else if(categoriaCuatro >=42 && categoriaCuatro < 58){
  colorCategoriaCuatro = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria4Alto= categoriaCuatro
}else if(categoriaCuatro >= 58){
  colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorCategoriaCinco  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria5Nulo= categoriaCinco
}else if(categoriaCinco >= 10 && categoriaCinco < 14){
  colorCategoriaCinco=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria5Bajo= categoriaCinco
}else if(categoriaCinco >=14 && categoriaCinco < 18){
  colorCategoriaCinco=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria5Medio= categoriaCinco
}else if(categoriaCinco >=18 && categoriaCinco < 23){
  colorCategoriaCinco = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria5Alto= categoriaCinco
}else if(categoriaCinco >= 23){
  colorCategoriaCinco= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorDominioUno  = <td  width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio1Nulo= DominioUno
}else if(DominioUno >= 5 && DominioUno < 9){
  colorDominioUno=<td  width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio1Bajo= DominioUno
}else if(DominioUno >= 9 && DominioUno < 11){
  colorDominioUno=<td  width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio1Medio= DominioUno
}else if(DominioUno >=11 && DominioUno < 14){
  colorDominioUno = <td  width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio1Alto= DominioUno
}else if(DominioUno >= 14){
  colorDominioUno= <td  width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorDominioDos  = <td  width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio2Nulo= DominioDos
}else if(DominioDos >= 15 && DominioDos < 21){
  colorDominioDos=<td  width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio2Bajo= DominioDos
}else if(DominioDos >= 21 && DominioDos < 27){
  colorDominioDos=<td  width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio2Medio= DominioDos
}else if(DominioDos >= 27 && DominioDos < 37){
  colorDominioDos = <td  width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio2Alto= DominioDos
}else if(DominioDos >= 37){
  colorDominioDos= <td  width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorDominioTres  = <td  width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio3Nulo= DominioTres
}else if(DominioTres >= 11 && DominioTres < 16){
  colorDominioTres=<td  width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio3Bajo= DominioTres
}else if(DominioTres >= 16 && DominioTres < 21){
  colorDominioTres=<td  width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio3Medio= DominioTres
}else if(DominioTres >= 21 && DominioTres < 25){
  colorDominioTres = <td  width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio3Alto= DominioTres
}else if(DominioTres >= 25){
  colorDominioTres= <td  width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorDominioCuatro  = <td  width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio4Nulo= DominioCuatro
}else if(DominioCuatro >= 1 && DominioCuatro < 2){
  colorDominioCuatro=<td  width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio4Bajo= DominioCuatro
}else if(DominioCuatro >= 2 && DominioCuatro < 4){
  colorDominioCuatro = <td  width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio4Medio= DominioCuatro
}else if(DominioCuatro >= 4 && DominioCuatro < 6){
  colorDominioCuatro = <td  width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio4Alto= DominioCuatro
}else if(DominioCuatro >= 6){
  colorDominioCuatro= <td  width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorDominioCinco  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio5Nulo= DominioCinco
}else if(DominioCinco >= 4 && DominioCinco < 6){
  colorDominioCinco=<td width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio5Bajo= DominioCinco
}else if(DominioCinco >= 6 && DominioCinco < 8){
  colorDominioCinco=<td width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio5Medio= DominioCinco
}else if(DominioCinco >= 8 && DominioCinco < 10){
  colorDominioCinco = <td  width="20px"style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio5Alto= DominioCinco
}else if(DominioCinco >= 10){
  colorDominioCinco= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorDominioSeis  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio6Nulo= DominioSeis
}else if(DominioSeis >= 9 && DominioSeis < 12){
  colorDominioSeis=<td  width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio6Bajo= DominioSeis
}else if(DominioSeis >= 12 && DominioSeis < 16){
  colorDominioSeis=<td width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio6Medio= DominioSeis
}else if(DominioSeis >= 16 && DominioSeis < 20){
  colorDominioSeis = <td width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio6Alto= DominioSeis
}else if(DominioSeis >= 20){
  colorDominioSeis= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorDominioSiete  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio7Nulo= DominioSiete
}else if(DominioSiete >= 10 && DominioSiete < 13){
  colorDominioSiete=<td width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio7Bajo= DominioSiete
}else if(DominioSiete >= 13 && DominioSiete < 17){
  colorDominioSiete=<td  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio7Medio= DominioSiete
}else if(DominioSiete >= 17 && DominioSiete < 21){
  colorDominioSiete = <td width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio7Alto= DominioSiete
}else if(DominioSiete >= 21){
  colorDominioSiete= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorDominioOcho  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio8Nulo= DominioOcho
}else if(DominioOcho >= 7 && DominioOcho < 10){
  colorDominioOcho  = <td width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio8Bajo= DominioOcho
}else if(DominioOcho >= 10 && DominioOcho < 13){
  colorDominioOcho=<td width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio8Medio= DominioOcho
}else if(DominioOcho >= 13 && DominioOcho < 16){
  colorDominioOcho = <td width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio8Alto= DominioOcho
}else if(DominioOcho >= 16){
  colorDominioOcho= <td width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorDominioNueve  = <td width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio9Nulo= DominioNueve
}else if(DominioNueve >= 6 && DominioNueve < 10){
  colorDominioNueve  = <td width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio9Bajo= DominioNueve
}else if(DominioNueve >= 10 && DominioNueve < 14){
  colorDominioNueve=<td  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio9Medio= DominioNueve
}else if(DominioNueve >= 14 && DominioNueve < 18){
  colorDominioNueve = <td  width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio9Alto= DominioNueve
}else if(DominioNueve >= 18){
  colorDominioNueve= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
  colorDominioDiez  = <td width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio10Nulo= DominioDiez
}else if(DominioDiez >= 4 && DominioDiez < 6){
  colorDominioDiez  = <td width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio10Bajo= DominioDiez
}else if(DominioDiez >= 6 && DominioDiez < 8){
  colorDominioDiez=<td width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio10Medio= DominioDiez
}else if(DominioDiez >= 8 && DominioDiez < 10){
  colorDominioDiez = <td width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio10Alto= DominioDiez
}else if(DominioDiez >= 10){
  colorDominioDiez= <td  width="20px"style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio10MuyAlto= DominioDiez
}
 a = 1  

ponderacion=<React.Fragment>

<MDBContainer style={{marginTop:20}}>
  <table>
    <tr>
      <td width="33%">
      <MDBBtn className = "text-white"  gradient="purple" size="md"  className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
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
      <td>{botonCerrar}</td>
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
  <TableCell width="6%"  > <strong>   TOTAL {general.toFixed(2)}  Puntos </strong></TableCell>
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
                            <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                            <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font>
                            <br/><font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
                        
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

                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">I.- Resultados de la categoría</font>
                     
                                    <table width="500" style={{marginLeft:20}} className="table-bordered">                                           
                                         <tr >                              
                                          <td  width="10%"><font size="1" face="arial"color="black" ></font></td>
                                          <td  width="60%"><font size="1" face="arial"color="black">Categoría</font></td>
                                          <td  width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                          <td ><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                        </tr>
                                        <tr>           
                                        <td  width="10%"><font size="1" face="arial"color="black" >1</font></td>
                                        <td  width="60%"><font size="1" face="arial"color="black">Ambiente de Trabajo</font></td>
                                        <td  width="20%"><font size="1" face="arial"color="black">{categoriaUno}</font></td>
                                         {colorCategoriaUno}                
                                        </tr>
                                        <tr>         
                                          <td  width="10%"><font size="1" face="arial"color="black" >2</font></td>
                                          <td  width="60%"><font size="1" face="arial"color="black">Factores propios de la actividad</font></td>
                                          <td  width="20%"><font size="1" face="arial"color="black">{categoriaDos}</font></td>
                                           {colorCategoriaDos}
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Organización del tiempo de trabajo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{categoriaTre}</font></td>
                                          {colorCategoriaTre}
                                        </tr>
                                        <tr>         
                                          <td  width="10%"><font size="1" face="arial"color="black" >4</font></td>
                                          <td  width="60%"><font size="1" face="arial"color="black">Liderazgo y relaciones en el trabajo</font></td>
                                          <td  width="20%"><font size="1" face="arial"color="black">{categoriaCuatro}</font></td>
                                          {colorCategoriaCuatro}
                                          </tr>
                                        <tr>         
                                          <td  width="10%"><font size="1" face="arial"color="black" >5</font></td>
                                          <td  width="60%"><font size="1" face="arial"color="black">Entorno organizacional</font></td>
                                          <td  width="20%"><font size="1" face="arial"color="black">{categoriaCinco}</font></td>
                                          {colorCategoriaCinco}  
                                        </tr>
                                        </table>
                      
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">II.- Resultados del dominio</font>         
                                      <table width="500" style={{marginLeft:20}} className="table-bordered"> 

                                         <tr >                              
                                          <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Dominio</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                          <td><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                        </tr>
                                        <tr>           
                                        <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
                                        <td width="60%"><font size="1" face="arial"color="black">Condiciones en el ambiente de trabajo</font></td>
                                        <td width="20%"><font size="1" face="arial"color="black">{DominioUno}</font></td>
                                         {colorDominioUno}                
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Carga de Trabajo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{DominioDos}</font></td>
                                           {colorDominioDos}
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Falta de control sobre el trabajo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{DominioTres}</font></td>
                                          {colorDominioTres}
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Jornada de trabajo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{DominioCuatro}</font></td>
                                          {colorDominioCinco}  
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Interferencia en la relación trabajo-familia</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{DominioCinco}</font></td>
                                          {colorDominioCinco}
                                          </tr>
                                          <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >6</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Liderazgo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{DominioSeis}</font></td>
                                          {colorDominioSeis}  
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >7</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Relaciones en el trabajo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{DominioSiete}</font></td>
                                          {colorDominioSiete}  
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >8</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Violencia</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{DominioOcho}</font></td>
                                          {colorDominioOcho}  
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >9</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Reconocimiento del desempeño</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{DominioNueve}</font></td>
                                          {colorDominioNueve}  
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >10</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Insuficiente sentido de pertenencia e, inestabilidad</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{DominioDiez}</font></td>
                                          {colorDominioDiez}  
                                        </tr>
                                      </table>
                     
                                    <font color="red" style= {{marginLeft:20}}  size="1">III.- Resultados por Dimensión</font>
                                      <table width="500" style={{marginLeft:20}} className="table-bordered "> 

                                         <tr >                              
                                          <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Dimensión</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                        </tr>
                                        <tr>           
                                        <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
                                        <td width="60%"><font size="1" face="arial"color="black">Condiciones peligrosas e inseguras</font></td>
                                        <td width="20%"><font size="1" face="arial"color="black">{((respuesta1/length)+(respuesta3/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta2/length)+(respuesta4/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{(respuesta5/length).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta6/length)+(respuesta12/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
                                          <td width="60%" ><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta7/length)+(respuesta8/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >6</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Carga mental</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta9/length)+(respuesta10/length)+(respuesta11/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >7</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta65/length)+(respuesta66/length)+(respuesta67/length)+(respuesta68/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >8</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta13/length)+(respuesta14/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>           
                                        <td width="10%"><font size="1" face="arial"color="black" >9</font></td>
                                        <td width="60%"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
                                        <td width="20%"><font size="1" face="arial"color="black">{((respuesta15/length)+(respuesta16/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >10</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta25/length)+(respuesta26/length)+(respuesta27/length)+(respuesta28/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >11</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta23/length)+(respuesta24/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >12</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Insuficiente participación y manejo del cambio</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta29/length)+(respuesta30/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >13</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta35/length)+(respuesta36/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >14</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta17/length)+(respuesta18/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >15</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta19/length)+(respuesta20/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >16</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta21/length)+(respuesta22/length)).toFixed(2)}</font></td>
                                        </tr>

                                        <tr>           
                                        <td width="10%"><font size="1" face="arial"color="black" >17</font></td>
                                        <td width="60%"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
                                        <td width="20%"><font size="1" face="arial"color="black">{((respuesta31/length)+(respuesta32/length)+(respuesta33/length)+(respuesta34/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >18</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)+(respuesta41/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >19</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Relaciones sociales en el trabajo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta42/length)+(respuesta43/length)+(respuesta44/length)+(respuesta45/length)+(respuesta46/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >20</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta69/length)+(respuesta70/length)+(respuesta71/length)+(respuesta72/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >21</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Violencia laboral</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta57/length)+(respuesta58/length)+(respuesta59/length)+(respuesta60/length)+(respuesta61/length)+(respuesta62/length)+(respuesta63/length)+(respuesta64/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >22</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Escasa o nula retroalimentación del desempeño</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta47/length)+(respuesta48/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >23</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Escaso o nulo reconocimiento y compensación</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta49/length)+(respuesta50/length)+(respuesta51/length)+(respuesta52/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >24</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Limitado sentido de pertenencia</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta55/length)+(respuesta56/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >25</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta53/length)+(respuesta54/length)).toFixed(2)}</font></td>
                                        </tr>
                                      </table>           
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

    let pdfView1;
    if(this.state.resultados[2]){ 
      
      let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,value21,value22,value23,value24;
      let value25,value26,value27,value28,value29,value30,value31,value32,value33,value34,value35,value36,value37,value38,value39,value40,value41,value42,value43,value44,value45,value46;
      let value47,value48,value49,value50,value51,value52,value53,value54,value55,value56,value57,value58,value59,value60,value61,value62,value63,value64,value65,value66,value67,value68;
      let value69,value70,value71,value72;

      let filtrar1;
      filtrar1 =  this.state.resultados.filter(function(hero) {
        console.log("filtrar1" , hero.fk_preguntasEEO)

        return hero.fk_preguntasEEO == 1;
      });
      value1 = filtrar1.pop()

      console.log("filtrar1" , filtrar1)

      let filtrar2;
      filtrar2 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 2;
      });
      value2 = filtrar2.pop()

      let filtrar3;
      filtrar3 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 3;
      });
      value3 = filtrar3.pop()


      let filtrar4;
      filtrar4 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 4;
      });
      value4 = filtrar4.pop()


      let filtrar5;
      filtrar5 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 5;
      });
      value5 = filtrar5.pop()


      let filtrar6;
      filtrar6 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 6;
      });
      value6 = filtrar6.pop()


      let filtrar7;
      filtrar7 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 7;
      });
      value7 = filtrar7.pop()


      let filtrar8;
      filtrar8 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 8;
      });
      value8 = filtrar8.pop()


      let filtrar9;
      filtrar9 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 9;
      });
      value9  = filtrar9.pop()


      let filtrar10;
      filtrar10 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 10;
      });
      value10 = filtrar10.pop()


      let filtrar11;
      filtrar11 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 11;
      });
      value11 = filtrar11.pop()

      let filtrar12;
      filtrar12 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 12;
      });
      value12 = filtrar12.pop()

      let filtrar13;
      filtrar13 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 13;
      });
      value13 = filtrar13.pop()

      let filtrar14;
      filtrar14 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 14;
      });
      value14 = filtrar14.pop()

      let filtrar15;
      filtrar15 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 15;
      });
      value15 = filtrar15.pop()

      let filtrar16;
      filtrar16 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 16;
      });
      value16 = filtrar16.pop()

      let filtrar17;
      filtrar17 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 17;
      });
      value17 = filtrar17.pop()

      let filtrar18;
      filtrar18 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 18;
      });
      value18 = filtrar18.pop()

      let filtrar19;
      filtrar19 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 19;
      });
      value19 = filtrar19.pop()

      let filtrar20;
      filtrar20=  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 20;
      });
      value20 = filtrar20.pop()

      let filtrar21;
      filtrar21 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 21;
      });
      value21 = filtrar21.pop()

        let filtrar22;
      filtrar22 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 22;
      });
      value22 = filtrar22.pop()

      let filtrar23;
      filtrar23 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 23;
      });
      value23 = filtrar23.pop()

      let filtrar24;
      filtrar24=  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 24;
      });
      value24 = filtrar24.pop()

      let filtrar25;
      filtrar25 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 25;
      });
      value25 = filtrar25.pop()

      let filtrar26;
      filtrar26 =  this.state.resultados.filter(function(hero) {
        console.log("hero" , hero)
        return hero.fk_preguntasEEO == 26;
      });
      value26 = filtrar26.pop()

      console.log("filtrar26" , filtrar25)

      let filtrar27;
      filtrar27 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 27;
      }); 
      value27 = filtrar27.pop()
    
      let filtrar28;
      filtrar28 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 28;
      });
      value28 = filtrar28.pop()

      let filtrar29;
      filtrar29 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 29;
      }); 
      value29 = filtrar29.pop()
   
      let filtrar30;
      filtrar30 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 30;
      });
      value30 = filtrar30.pop()

      let filtrar31;
      filtrar31 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 31;
      });
      value31 = filtrar31.pop()

      let filtrar32;
      filtrar32 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 32;
      });
      value32 = filtrar32.pop()

      let filtrar33;
      filtrar33 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 33;
      });
      value33 = filtrar33.pop()

      let filtrar34;
      filtrar34 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 34;
      });
      value34 = filtrar34.pop()

      let filtrar35;
      filtrar35 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 35;
      });
      value35 = filtrar35.pop()

      let filtrar36;
      filtrar36 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 36;
      });
      value36 = filtrar36.pop()

      let filtrar37;
      filtrar37 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 37;
      });
      value37 = filtrar37.pop()

      let filtrar38;
      filtrar38 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 38;
      });
      value38 = filtrar38.pop()

       let filtrar39;
      filtrar39 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 39;
      });
      value39 = filtrar39.pop()

      let filtrar40;
      filtrar40 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 40;
      }); 
      value40 = filtrar40.pop()
     
      let filtrar41;
      filtrar41 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 41;
      });   
      value41 = filtrar41.pop()
   
      let filtrar42;
      filtrar42 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 42;
      });  
      value42 = filtrar42.pop()
    
      let filtrar43;
      filtrar43 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 43;
      }); 
      value43 = filtrar43.pop()
     
      let filtrar44;
      filtrar44 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 44;
      });
      value44 = filtrar44.pop()

      let filtrar45;
      filtrar45 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 45;
      });
      value45 = filtrar45.pop()

       let filtrar46;
      filtrar46 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 46;
      });
      value46 = filtrar46.pop()

      let filtrar47;
      filtrar47 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 47;
      });
      value47 = filtrar47.pop()

      let filtrar48;
      filtrar48 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 48;
      });
      value48 = filtrar48.pop()

      let filtrar49;
      filtrar49 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 49;
      });
      value49 = filtrar49.pop()
      
      let filtrar50;
      filtrar50 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 50;
      });
      value50 = filtrar50.pop()

      let filtrar51;
      filtrar51 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 51;
      });
      value51 = filtrar51.pop()

      let filtrar52;
      filtrar52 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 52;
      });
      value52= filtrar52.pop()

      let filtrar53;
      filtrar53 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 53;
      });
      value53 = filtrar53.pop()

      let filtrar54;
      filtrar54 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 54;
      });
      value54 = filtrar54.pop()

      let filtrar55;
      filtrar55 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 55;
      });
      value55 = filtrar55.pop()

      let filtrar56;
      filtrar56 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 56;
      });
      value56 = filtrar56.pop()

      let filtrar57;
      filtrar57 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 57;
      }); 
      value57 = filtrar57.pop()
 
      let filtrar58;
      filtrar58 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 58;
      });
      value58 = filtrar58.pop()

      let filtrar59;
      filtrar59 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 59;
      });
      value59 = filtrar59.pop()

      let filtrar60;
      filtrar60 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 60;
      });
      value60 = filtrar60.pop()

      let filtrar61;
      filtrar61 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 61;
      });
      value61 = filtrar61.pop()
  
      let filtrar62;
      filtrar62 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 62;
      });
      value62 = filtrar62.pop()

      let filtrar63;
      filtrar63 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 63;
      });
      value63 = filtrar63.pop()

      let filtrar64;
      filtrar64 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 64;
      });
      value64 = filtrar64.pop()

      let filtrar65;
      filtrar65 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 65;
      });
      value65 = filtrar65.pop()

      let filtrar66;
      filtrar66 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 66;
      });
      value66 = filtrar66.pop()

      let filtrar67;
      filtrar67 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 67;
      });
      value67 = filtrar67.pop()

      let filtrar68;
      filtrar68 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 68;
      });
      value68 = filtrar68.pop()

      let filtrar69;
      filtrar69 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 69;
      });
      value69= filtrar69.pop()

      let filtrar70;
      filtrar70 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 70;
      });
      value70 = filtrar70.pop()

      let filtrar71;
      filtrar71 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 71;
      });
      value71 = filtrar71.pop()

      let filtrar72;
      filtrar72 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasEEO == 72;
      });
      value72 = filtrar72.pop()
 
      console.log("resultads" , this.state.resultados)

      a = 1
      pdfView1 = <MDBContainer> <Alert className ="mt-4" color ="primary ">Resultados de la Aplicación de la evaluación EEO </Alert>
        <React.Fragment>
            <section className="flex-column  bg-white  pa4 "  >
                <div  style={{marginLeft:"6%"}}>
                      <MDBBtn className = "text-white"  size="md" color="secondary"  className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                          Descargar Respuestas de {this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM}
                      </MDBBtn>
                      &nbsp;
                    {botonCerrar}
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
                      <td width="25%" >{value1.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td >2</td>
                      <td>Mi trabajo me exige hacer mucho esfuerzo físico</td>
                      <td>{value2.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Me preocupa sufrir un accidente en mi trabajo</td>
                      <td>{value3.Respuestas}</td> 
                    </tr>                    
                    <tr>
                      <td>4</td>
                      <td>Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo</td>
                      <td>{value4.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Considero que las actividades que realizo son peligrosas</td>
                      <td >{value5.Respuestas}</td> 
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
                      <td >{value6.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Por la cantidad de trabajo que tengo debo trabajar sin parar</td>   
                      <td >{value7.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Considero que es necesario mantener un ritmo de trabajo acelerado</td>   
                      <td >{value8.Respuestas}</td> 
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
                      <td width="25%" >{value9.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Mi trabajo requiere que memorice mucha información</td>   
                      <td >{value10.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>En mi trabajo tengo que tomar decisiones difíciles muy rápido</td>   
                      <td>{value11.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>Mi trabajo exige que atienda varios asuntos al mismo tiempo</td>   
                      <td >{value12.Respuestas}</td> 
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
                      <td width="25%" >{value13.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>14</td>
                      <td>Respondo ante mi jefe por los resultados de toda mi área de trabajo</td>   
                      <td>{value14.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>En el trabajo me dan órdenes contradictorias</td>   
                      <td>{value15.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>16</td>
                      <td>Considero que en mi trabajo me piden hacer cosas innecesarias</td>   
                      <td>{value16.Respuestas}</td> 
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
                      <td width="25%">{value17.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>18</td>
                      <td>Mi trabajo me exige laborar en días de descanso, festivos o fines de semana</td>   
                      <td>{value18.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>19</td>
                      <td>Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales</td>   
                      <td>{value19.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>20</td>
                      <td>Debo atender asuntos de trabajo cuando estoy en casa</td>   
                      <td>{value20.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>21</td>
                      <td>Pienso en las actividades familiares o personales cuando estoy en mi trabajo</td>   
                      <td>{value21.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>22</td>
                      <td>Pienso que mis responsabilidades familiares afectan mi trabajo</td>   
                      <td>{value22.Respuestas}</td> 
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
                      <td width="25%">{value23.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>24</td>
                      <td>En mi trabajo puedo aspirar a un mejor puesto</td>   
                      <td >{value24.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>25</td>
                      <td>Durante mi jornada de trabajo puedo tomar pausas cuando las necesito</td>   
                      <td>{value25.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td >26</td>
                      <td >Puedo decidir cuánto trabajo realizo durante la jornada laboral</td>   
                      <td >{value26.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>27</td>
                      <td>Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo</td>   
                      <td >{value27.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>28</td>
                      <td>Puedo cambiar el orden de las actividades que realizo en mi trabajo</td>   
                      <td>{value28.Respuestas}</td> 
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
                      <td  width="25%">{value29.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>30</td>
                      <td>Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas o aportaciones</td>   
                      <td >{value30.Respuestas}</td> 
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
                      <td width="25%">{value31.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>32</td>
                      <td>Me explican claramente los resultados que debo obtener en mi trabajo</td>   
                      <td >{value32.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>33</td>
                      <td>Me explican claramente los objetivos de mi trabajo</td>   
                      <td >{value33.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>34</td>
                      <td>Me informan con quién puedo resolver problemas o asuntos de trabajo</td>   
                      <td>{value34.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>35</td>
                      <td>Me permiten asistir a capacitaciones relacionadas con mi trabajo</td>   
                      <td>{value35.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>36</td>
                      <td>Recibo capacitación útil para hacer mi trabajo</td>   
                      <td>{value36.Respuestas}</td> 
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
                      <td width="25%">{value37.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>38</td>
                      <td>Mi jefe tiene en cuenta mis puntos de vista y opiniones</td>   
                      <td>{value38.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>39</td>
                      <td>Mi jefe me comunica a tiempo la información relacionada con el trabajo</td>   
                      <td>{value39.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>40</td>
                      <td>La orientación que me da mi jefe me ayuda a realizar mejor mi trabajo</td>   
                      <td>{value40.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>41</td>
                      <td>Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo</td>   
                      <td>{value41.Respuestas}</td> 
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
                      <td width="25%">{value42.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>43</td>
                      <td>Entre compañeros solucionamos los problemas de trabajo de forma respetuosa</td>   
                      <td>{value43.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>44</td>
                      <td>En mi trabajo me hacen sentir parte del grupo</td>   
                      <td>{value44.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>45</td>
                      <td>Cuando tenemos que realizar trabajo de equipo los compañeros colaboran</td>   
                      <td >{value45.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>46</td>
                      <td>Mis compañeros de trabajo me ayudan cuando tengo dificultades</td>   
                      <td>{value46.Respuestas}</td> 
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
                      <td width="25%">{value47.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>48</td>
                      <td>La forma como evalúan mi trabajo en mi centro de trabajo me ayuda a mejorar mi desempeño</td>   
                      <td>{value48.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>49</td>
                      <td>En mi centro de trabajo me pagan a tiempo mi salario</td>   
                      <td>{value49.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>50</td>
                      <td>El pago que recibo es el que merezco por el trabajo que realizo</td>   
                      <td>{value50.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>51</td>
                      <td>Si obtengo los resultados esperados en mi trabajo me recompensan o reconocen</td>   
                      <td>{value51.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>52</td>
                      <td>Las personas que hacen bien el trabajo pueden crecer laboralmente</td>   
                      <td >{value52.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>53</td>
                      <td>Considero que mi trabajo es estable</td>   
                      <td >{value53.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>54</td>
                      <td>En mi trabajo existe continua rotación de personal</td>   
                      <td>{value54.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>55</td>
                      <td>Siento orgullo de laborar en este centro de trabajo</td>   
                      <td>{value55.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>56</td>
                      <td>Me siento comprometido con mi trabajo</td>   
                      <td>{value56.Respuestas}</td> 
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
                      <td width="25%">{value57.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>58</td>
                      <td>Recibo críticas constantes a mi persona y/o trabajo</td>   
                      <td>{value58.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>59</td>
                      <td>Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones</td>   
                      <td>{value59.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>60</td>
                      <td>Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones</td>   
                      <td>{value60.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>61</td>
                      <td>Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador</td>   
                      <td>{value61.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>62</td>
                      <td>Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores</td>   
                      <td>{value62.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>63</td>
                      <td>Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo</td>   
                      <td>{value63.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>64</td>
                      <td>He presenciado actos de violencia en mi centro de trabajo</td>   
                      <td >{value64.Respuestas}</td> 
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
                      <td width="25%">{value65.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>66</td>
                      <td>Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas</td>   
                      <td>{value66.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>67</td>
                      <td>Para hacer mi trabajo debo demostrar sentimientos distintos a los míos</td>   
                      <td>{value67.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>68</td>
                      <td>Mi trabajo me exige atender situaciones de violencia</td>   
                      <td>{value68.Respuestas}</td> 
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
                      <td width="25%">{value69.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>70</td>
                      <td>Dificultan el logro de los resultados del trabajo</td>   
                      <td>{value70.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>71</td>
                      <td>Cooperan poco cuando se necesita</td>   
                      <td >{value71.Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>72</td>
                      <td>Ignoran las sugerencias para mejorar su trabajo</td>   
                      <td>{value72.Respuestas}</td> 
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
                                    <br/><font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
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
                                    <font size="1"
                                        face="arial"
                                        color="black" style = {{marginLeft:35}}><strong>GUÍA DE REFERENCIA III
                                        CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO</strong></font>   <br/>  
                                        <font size="1"  face="arial"
                                        color="black" style = {{marginLeft:35}}><strong>PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN
                                        LOS CENTROS DE TRABAJO</strong></font>
                                    <table width="500" style = {{marginLeft:40,marginBottom:10}}>
        
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
                                    </table>
             

                                    <font color="red" style= {{marginLeft:20}}  size="1">I. Condiciones ambientales de su centro de trabajo.</font>
                                
                                    <table width="500" style = {{marginLeft:20}} className="table-bordered "> 
                                        
                                    <tr>
                                    <td width="80%"><font size="1" face="arial"color="black" >El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</font></td>
                                    <td width="20%"><font size="1" face="arial"color="black" >{value1.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo me exige hacer mucho esfuerzo físico</font></td>
                                      <td width="20%"><font size="1" face="arial"color="black" >{value2.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Me preocupa sufrir un accidente en mi trabajo</font></td>
                                      <td width="20%"><font size="1" face="arial"color="black" >{value3.Respuestas}</font></td> 
                                    </tr>                    
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo</font></td>
                                      <td width="20%"><font size="1" face="arial"color="black" >{value4.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Considero que las actividades que realizo son peligrosas</font></td>
                                      <td width="20%"><font size="1" face="arial"color="black" >{value5.Respuestas}</font></td> 
                                    </tr>
                                   </table>
                                    
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}   size="1">II. La cantidad y ritmo de trabajo que tiene.</font>
                                  
                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                    <td width="80%"><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno</font></td>
                                    <td width="20%"><font size="1" face="arial"color="black" >{value6.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo trabajar sin parar</font></td>
                                      <td width="20%"><font size="1" face="arial"color="black" >{value7.Respuestas} </font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Considero que es necesario mantener un ritmo de trabajo acelerado</font></td>
                                      <td width="20%"><font size="1" face="arial"color="black" >{value8.Respuestas}</font></td> 
                                    </tr>
                                  
                                    </table>
                          

                                    <font style= {{marginLeft:20}}  size="1" color="red" >III. El esfuerzo mental que le exige su trabajo.</font>
                                   
                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                    <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo exige que esté muy concentrado</font></td>
                                    <td width="20%"><font size="1" face="arial"color="black" >{value9.Respuestas}</font></td> 
                                  </tr>
                                    <tr>
                                    <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo requiere que memorice mucha información</font></td>   
                                    <td width="20%"><font size="1" face="arial"color="black" >{value10.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >En mi trabajo tengo que tomar decisiones difíciles muy rápido</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value11.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo exige que atienda varios asuntos al mismo tiempo</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value12.Respuestas}</font></td> 
                                    </tr>
                                    </table>
                              
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >IV. Trabajo y las responsabilidades que tiene.</font>
                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >En mi trabajo soy responsable de cosas de mucho valor</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value13.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                    <td width="80%"><font size="1" face="arial"color="black" >Respondo ante mi jefe por los resultados de toda mi área de trabajo</font></td>   
                                    <td width="20%"><font size="1" face="arial"color="black" >{value14.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >En el trabajo me dan órdenes contradictorias</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value15.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Considero que en mi trabajo me piden hacer cosas innecesarias</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value16.Respuestas}</font></td> 
                                    </tr>
                                    </table>

                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >V. Jornada de trabajo.</font>
                                 
                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Trabajo horas extras más de tres veces a la semana</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value17.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                    <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo me exige laborar en días de descanso, festivos o fines de semana</font></td>   
                                    <td width="20%"><font size="1" face="arial"color="black" >{value18.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value19.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Debo atender asuntos de trabajo cuando estoy en casa</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value20.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Pienso en las actividades familiares o personales cuando estoy en mi trabajo</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value21.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Pienso que mis responsabilidades familiares afectan mi trabajo</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value22.Respuestas}</font></td> 
                                    </tr>
                                    </table>
                                    
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >VI. Decisiones que puede tomar en su trabajo.</font>
                                 
                                    < table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                            
                                    <tr>
                                    <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo permite que desarrolle nuevas habilidades</font></td>   
                                    <td width="20%"><font size="1" face="arial"color="black" >{value23.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >En mi trabajo puedo aspirar a un mejor puesto</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value24.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Durante mi jornada de trabajo puedo tomar pausas cuando las necesito</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value25.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Puedo decidir cuánto trabajo realizo durante la jornada laboral</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value26.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1" face="arial"color="black" >Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo</font></td>   
                                      <td width="20%"><font size="1" face="arial"color="black" >{value27.Respuestas}</font></td> 
                                    </tr>
                            
                                    <tr>
                                    <td width="80%"><font size="1"face="arial"color="black">Puedo cambiar el orden de las actividades que realizo en mi trabajo</font></td>   
                                    <td width="20%"><font size="1"face="arial"color="black">{value28.Respuestas}</font></td> 
                                    </tr>
                                    
                                    </table>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >VII.Cualquier tipo de cambio que ocurra en su trabajo (considere los últimos cambios realizados).</font>

                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Los cambios que se presentan en mi trabajo dificultan mi labor</font></td>   
                                      <td width="20%" ><font size="1"face="arial"color="black">{value29.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas o aportaciones</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value30.Respuestas}</font></td> 
                                    </tr>
                                    
                                    </table>
                                   
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >VIII. capacitación e información que se le proporciona sobre su trabajo.</font>
                                
                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Me informan con claridad cuáles son mis funciones</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value31.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Me explican claramente los resultados que debo obtener en mi trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value32.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Me explican claramente los objetivos de mi trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value33.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Me informan con quién puedo resolver problemas o asuntos de trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value34.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Me permiten asistir a capacitaciones relacionadas con mi trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value35.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Recibo capacitación útil para hacer mi trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value36.Respuestas}</font></td> 
                                    </tr>
                                    
                                    </table>
                                   
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >IX. Jefes con quien tiene contacto.</font>
                            
                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Mi jefe ayuda a organizar mejor el trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value37.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Mi jefe tiene en cuenta mis puntos de vista y opiniones</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value38.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Mi jefe me comunica a tiempo la información relacionada con el trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value39.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">La orientación que me da mi jefe me ayuda a realizar mejor mi trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value40.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value41.Respuestas}</font></td> 
                                    </tr>
                                                                 
                                    </table>
                                 
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >X. Relaciones con sus compañeros.</font>
                         
                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Puedo confiar en mis compañeros de trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value42.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Entre compañeros solucionamos los problemas de trabajo de forma respetuosa</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value43.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">En mi trabajo me hacen sentir parte del grupo</font></td>   
                                      <td width="20%" ><font size="1"face="arial"color="black">{value44.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Cuando tenemos que realizar trabajo de equipo los compañeros colaboran</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value45.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Mis compañeros de trabajo me ayudan cuando tengo dificultades</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value46.Respuestas}</font></td> 
                                    </tr>
                                                                 
                                    </table>
                                    <br/>
                                    <br/>  
                                  
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >XI. Información que recibe sobre su rendimiento en el trabajo, el reconocimiento</font><br/>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >el sentido de pertenencia y la estabilidad que le ofrece su trabajo.</font>

                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Me informan sobre lo que hago bien en mi trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value47.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">La forma como evalúan mi trabajo en mi centro de trabajo me ayuda a mejorar mi desempeño</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value48.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">En mi centro de trabajo me pagan a tiempo mi salario</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value49.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">El pago que recibo es el que merezco por el trabajo que realizo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value50.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Si obtengo los resultados esperados en mi trabajo me recompensan o reconocen</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value51.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Las personas que hacen bien el trabajo pueden crecer laboralmente</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value52.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Considero que mi trabajo es estable</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value53.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">En mi trabajo existe continua rotación de personal</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value54.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Siento orgullo de laborar en este centro de trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value55.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Me siento comprometido con mi trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value56.Respuestas}</font></td> 
                                    </tr>
                                                                 
                                    </table>
                                    
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >XII. Actos de violencia laboral (malos tratos, acoso, hostigamiento, acoso psicológico).</font>
                          
                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">En mi trabajo puedo expresarme libremente sin interrupciones</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value57.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Recibo críticas constantes a mi persona y/o trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value58.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value59.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value60.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value61.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value62.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value63.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">He presenciado actos de violencia en mi centro de trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value64.Respuestas}</font></td> 
                                    </tr>
                                                                                                  
                                    </table>
                                  
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >XIII. Atención a clientes y usuarios.</font>
                                
                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Atiendo clientes o usuarios muy enojados</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value65.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value66.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Para hacer mi trabajo debo demostrar sentimientos distintos a los míos</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value67.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Mi trabajo me exige atender situaciones de violencia</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value68.Respuestas}</font></td> 
                                    </tr>
                                    </table>
                                   
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >Las actitudes de las personas que supervisa.</font>
                             
                                    <table width="500" style = {{marginLeft:20}} className="table-bordered ">
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Comunican tarde los asuntos de trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value69.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Dificultan el logro de los resultados del trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value70.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Cooperan poco cuando se necesita</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value71.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td width="80%"><font size="1"face="arial"color="black">Ignoran las sugerencias para mejorar su trabajo</font></td>   
                                      <td width="20%"><font size="1"face="arial"color="black">{value72.Respuestas}</font></td> 
                                    </tr>
                                    </table>
                                </div>
                            </PDFExport>
                        </div>
                    </div>

          </section>
        </React.Fragment>
   
      </MDBContainer>
    } 
    let ponderacionIndividual 
      let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,value21,value22,value23,value24;
      let value25,value26,value27,value28,value29,value30,value31,value32,value33,value34,value35,value36,value37,value38,value39,value40,value41,value42,value43,value44,value45,value46;
      let value47,value48,value49,value50,value51,value52,value53,value54,value55,value56,value57,value58,value59,value60,value61,value62,value63,value64,value65,value66,value67,value68;
      let value69,value70,value71,value72;

     if( this.state.resultadosEvaluacion.length > 0 && this.state.resultadosQuery.length>0){
    
      let filtrar1;
      filtrar1 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 1;
      });
      value1 = filtrar1.pop()

      let filtrar2;
      filtrar2 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 2;
      });
      value2 = filtrar2.pop()

      let filtrar3;
      filtrar3 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 3;
      });
      value3 = filtrar3.pop()


      let filtrar4;
      filtrar4 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 4;
      });
      value4 = filtrar4.pop()


      let filtrar5;
      filtrar5 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 5;
      });
      value5 = filtrar5.pop()


      let filtrar6;
      filtrar6 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 6;
      });
      value6 = filtrar6.pop()


      let filtrar7;
      filtrar7 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 7;
      });
      value7 = filtrar7.pop()


      let filtrar8;
      filtrar8 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 8;
      });
      value8 = filtrar8.pop()


      let filtrar9;
      filtrar9 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 9;
      });
      value9  = filtrar9.pop()


      let filtrar10;
      filtrar10 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 10;
      });
      value10 = filtrar10.pop()


      let filtrar11;
      filtrar11 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 11;
      });
      value11 = filtrar11.pop()

      let filtrar12;
      filtrar12 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 12;
      });
      value12 = filtrar12.pop()

      let filtrar13;
      filtrar13 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 13;
      });
      value13 = filtrar13.pop()

      let filtrar14;
      filtrar14 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 14;
      });
      value14 = filtrar14.pop()

      let filtrar15;
      filtrar15 = this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 15;
      });
      value15 = filtrar15.pop()

      let filtrar16;
      filtrar16 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 16;
      });
      value16 = filtrar16.pop()

      let filtrar17;
      filtrar17 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 17;
      });
      value17 = filtrar17.pop()

      let filtrar18;
      filtrar18 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 18;
      });
      value18 = filtrar18.pop()

      let filtrar19;
      filtrar19 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 19;
      });
      value19 = filtrar19.pop()

      let filtrar20;
      filtrar20=  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 20;
      });
      value20 = filtrar20.pop()

      let filtrar21;
      filtrar21 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 21;
      });
      value21 = filtrar21.pop()

        let filtrar22;
      filtrar22 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 22;
      });
      value22 = filtrar22.pop()

      let filtrar23;
      filtrar23 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 23;
      });
      value23 = filtrar23.pop()

      let filtrar24;
      filtrar24=  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 24;
      });
      value24 = filtrar24.pop()

      let filtrar25;
      filtrar25 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 25;
      });
      value25 = filtrar25.pop()

      let filtrar26;
      filtrar26 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 26;
      });
      value26 = filtrar26.pop()

      let filtrar27;
      filtrar27 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 27;
      }); 
      value27 = filtrar27.pop()
    
      let filtrar28;
      filtrar28 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 28;
      });
      value28 = filtrar28.pop()

      let filtrar29;
      filtrar29 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 29;
      }); 
      value29 = filtrar29.pop()
   
      let filtrar30;
      filtrar30 = this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 30;
      });
      value30 = filtrar30.pop()

      let filtrar31;
      filtrar31 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 31;
      });
      value31 = filtrar31.pop()

      let filtrar32;
      filtrar32 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 32;
      });
      value32 = filtrar32.pop()

      let filtrar33;
      filtrar33 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 33;
      });
      value33 = filtrar33.pop()

      let filtrar34;
      filtrar34 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 34;
      });
      value34 = filtrar34.pop()

      let filtrar35;
      filtrar35 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 35;
      });
      value35 = filtrar35.pop()

      let filtrar36;
      filtrar36 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 36;
      });
      value36 = filtrar36.pop()

      let filtrar37;
      filtrar37 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 37;
      });
      value37 = filtrar37.pop()

      let filtrar38;
      filtrar38 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 38;
      });
      value38 = filtrar38.pop()

       let filtrar39;
      filtrar39 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 39;
      });
      value39 = filtrar39.pop()

      let filtrar40;
      filtrar40 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 40;
      }); 
      value40 = filtrar40.pop()
     
      let filtrar41;
      filtrar41 = this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 41;
      });   
      value41 = filtrar41.pop()
   
      let filtrar42;
      filtrar42 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 42;
      });  
      value42 = filtrar42.pop()
    
      let filtrar43;
      filtrar43 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 43;
      }); 
      value43 = filtrar43.pop()
     
      let filtrar44;
      filtrar44 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 44;
      });
      value44 = filtrar44.pop()

      let filtrar45;
      filtrar45 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 45;
      });
      value45 = filtrar45.pop()

       let filtrar46;
      filtrar46 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 46;
      });
      value46 = filtrar46.pop()

      let filtrar47;
      filtrar47 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 47;
      });
      value47 = filtrar47.pop()

      let filtrar48;
      filtrar48 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 48;
      });
      value48 = filtrar48.pop()

      let filtrar49;
      filtrar49 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 49;
      });
      value49 = filtrar49.pop()
      
      let filtrar50;
      filtrar50 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 50;
      });
      value50 = filtrar50.pop()

      let filtrar51;
      filtrar51 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 51;
      });
      value51 = filtrar51.pop()

      let filtrar52;
      filtrar52 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 52;
      });
      value52= filtrar52.pop()

      let filtrar53;
      filtrar53 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 53;
      });
      value53 = filtrar53.pop()

      let filtrar54;
      filtrar54 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 54;
      });
      value54 = filtrar54.pop()

      let filtrar55;
      filtrar55 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 55;
      });
      value55 = filtrar55.pop()

      let filtrar56;
      filtrar56 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 56;
      });
      value56 = filtrar56.pop()

      let filtrar57;
      filtrar57 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 57;
      }); 
      value57 = filtrar57.pop()
 
      let filtrar58;
      filtrar58 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 58;
      });
      value58 = filtrar58.pop()

      let filtrar59;
      filtrar59 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 59;
      });
      value59 = filtrar59.pop()

      let filtrar60;
      filtrar60 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 60;
      });
      value60 = filtrar60.pop()

      let filtrar61;
      filtrar61 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 61;
      });
      value61 = filtrar61.pop()
  
      let filtrar62;
      filtrar62 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 62;
      });
      value62 = filtrar62.pop()

      let filtrar63;
      filtrar63 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 63;
      });
      value63 = filtrar63.pop()

      let filtrar64;
      filtrar64 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 64;
      });
      value64 = filtrar64.pop()

      let filtrar65;
      filtrar65 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 65;
      });
      value65 = filtrar65.pop()

      let filtrar66;
      filtrar66 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 66;
      });
      value66 = filtrar66.pop()

      let filtrar67;
      filtrar67 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 67;
      });
      value67 = filtrar67.pop()

      let filtrar68;
      filtrar68 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 68;
      });
      value68 = filtrar68.pop()

      let filtrar69;
      filtrar69 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 69;
      });
      value69= filtrar69.pop()

      let filtrar70;
      filtrar70 = this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 70;
      });
      value70 = filtrar70.pop()

      let filtrar71;
      filtrar71 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 71;
      });
      value71 = filtrar71.pop()

      let filtrar72;
      filtrar72 =  this.state.resultadosEvaluacion.filter(function(hero) {
        return hero.fk_preguntasEEO == 72;
      });
      value72 = filtrar72.pop()

      let respuesta1=value1.Respuestas;
      let respuesta2=value2.Respuestas;
      let respuesta3=value3.Respuestas;
      let respuesta4=value4.Respuestas;
      let respuesta5=value5.Respuestas;
      let respuesta6=value6.Respuestas;
      let respuesta7=value7.Respuestas;
      let respuesta8=value8.Respuestas;
      let respuesta9=value9.Respuestas;
      let respuesta10=value10.Respuestas;
      let respuesta11=value11.Respuestas;
      let respuesta12=value12.Respuestas;
      let respuesta13=value13.Respuestas;
      let respuesta14=value14.Respuestas;
      let respuesta15=value15.Respuestas;
      let respuesta16=value16.Respuestas;
      let respuesta17=value17.Respuestas;
      let respuesta18=value18.Respuestas;
      let respuesta19=value19.Respuestas;
      let respuesta20=value20.Respuestas;
      let respuesta21=value21.Respuestas;
      let respuesta22=value22.Respuestas;
      let respuesta23=value23.Respuestas;
      let respuesta24=value24.Respuestas;
      let respuesta25=value25.Respuestas;
      let respuesta26=value26.Respuestas;
      let respuesta27=value27.Respuestas;
      let respuesta28=value28.Respuestas;
      let respuesta29=value29.Respuestas;
      let respuesta30=value30.Respuestas;
      let respuesta31=value31.Respuestas;
      let respuesta32=value32.Respuestas;
      let respuesta33=value33.Respuestas;
      let respuesta34=value34.Respuestas;
      let respuesta35=value35.Respuestas;
      let respuesta36=value36.Respuestas;
      let respuesta37=value37.Respuestas;
      let respuesta38=value38.Respuestas;
      let respuesta39=value39.Respuestas;
      let respuesta40=value40.Respuestas;
      let respuesta41=value41.Respuestas;
      let respuesta42=value42.Respuestas;
      let respuesta43=value43.Respuestas;
      let respuesta44=value44.Respuestas;
      let respuesta45=value45.Respuestas;
      let respuesta46=value46.Respuestas;
      let respuesta47=value47.Respuestas;
      let respuesta48=value48.Respuestas;
      let respuesta49=value49.Respuestas;
      let respuesta50=value50.Respuestas;  
      let respuesta51=value51.Respuestas;
      let respuesta52=value52.Respuestas;
      let respuesta53=value53.Respuestas;
      let respuesta54=value54.Respuestas;
      let respuesta55=value55.Respuestas;
      let respuesta56=value56.Respuestas;
      let respuesta57=value57.Respuestas;
      let respuesta58=value58.Respuestas;
      let respuesta59=value59.Respuestas;
      let respuesta60=value60.Respuestas; 
      let respuesta61=value61.Respuestas;
      let respuesta62=value62.Respuestas;
      let respuesta63=value63.Respuestas;
      let respuesta64=value64.Respuestas;
      let respuesta65=value65.Respuestas;
      let respuesta66=value66.Respuestas;
      let respuesta67=value67.Respuestas;
      let respuesta68=value68.Respuestas;
      let respuesta69=value69.Respuestas;
      let respuesta70=value70.Respuestas;
      let respuesta71=value71.Respuestas;
      let respuesta72=value72.Respuestas;
      
      let valor1=value1.ponderacion;
      let valor2=value2.ponderacion;
      let valor3=value3.ponderacion;
      let valor4=value4.ponderacion;
      let valor5=value5.ponderacion;
      let valor6=value6.ponderacion;
      let valor7=value7.ponderacion;
      let valor8=value8.ponderacion;
      let valor9=value9.ponderacion;
      let valor10=value10.ponderacion;
      let valor11=value11.ponderacion;
      let valor12=value12.ponderacion;
      let valor13=value13.ponderacion;
      let valor14=value14.ponderacion;
      let valor15=value15.ponderacion;
      let valor16=value16.ponderacion;
      let valor17=value17.ponderacion;
      let valor18=value18.ponderacion;
      let valor19=value19.ponderacion;
      let valor20=value20.ponderacion;
      let valor21=value21.ponderacion;
      let valor22=value22.ponderacion;
      let valor23=value23.ponderacion;
      let valor24=value24.ponderacion;
      let valor25=value25.ponderacion;
      let valor26=value26.ponderacion;
      let valor27=value27.ponderacion;
      let valor28=value28.ponderacion;
      let valor29=value29.ponderacion;
      let valor30=value30.ponderacion;
      let valor31=value31.ponderacion;
      let valor32=value32.ponderacion;
      let valor33=value33.ponderacion;
      let valor34=value34.ponderacion;
      let valor35=value35.ponderacion;
      let valor36=value36.ponderacion;
      let valor37=value37.ponderacion;
      let valor38=value38.ponderacion;
      let valor39=value39.ponderacion;
      let valor40=value40.ponderacion;
      let valor41=value41.ponderacion;
      let valor42=value42.ponderacion;
      let valor43=value43.ponderacion;
      let valor44=value44.ponderacion;
      let valor45=value45.ponderacion;
      let valor46=value46.ponderacion;
      let valor47=value47.ponderacion;
      let valor48=value48.ponderacion;
      let valor49=value49.ponderacion;
      let valor50=value50.ponderacion;  
      let valor51=value51.ponderacion;
      let valor52=value52.ponderacion;
      let valor53=value53.ponderacion;
      let valor54=value54.ponderacion;
      let valor55=value55.ponderacion;
      let valor56=value56.ponderacion;
      let valor57=value57.ponderacion;
      let valor58=value58.ponderacion;
      let valor59=value59.ponderacion;
      let valor60=value60.ponderacion; 
      let valor61=value61.ponderacion;
      let valor62=value62.ponderacion;
      let valor63=value63.ponderacion;
      let valor64=value64.ponderacion;
      let valor65=value65.ponderacion;
      let valor66=value66.ponderacion;
      let valor67=value67.ponderacion;
      let valor68=value68.ponderacion;
      let valor69=value69.ponderacion;
      let valor70=value70.ponderacion;
      let valor71=value71.ponderacion;
      let valor72=value72.ponderacion;

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
    
    if(categoriaUno < 5){
      categoria1Nulo= categoriaUno
      colorCategoriaUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    }else if(categoriaUno >= 5 && categoriaUno < 9){
      colorCategoriaUno =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      categoria1Bajo= categoriaUno
    }else if(categoriaUno >= 9 && categoriaUno < 11){
      colorCategoriaUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      categoria1Medio= categoriaUno
    }else if(categoriaUno >= 11 && categoriaUno < 14){
      colorCategoriaUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      categoria1Alto= categoriaUno
    }else if(categoriaUno >= 14){
      colorCategoriaUno = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorCategoriaDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      categoria2Nulo= categoriaDos
    }else if(categoriaDos >= 15 && categoriaDos < 30){
      colorCategoriaDos =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      categoria2Bajo= categoriaDos
    }else if(categoriaDos >=30 && categoriaDos < 45){
      colorCategoriaDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      categoria2Medio= categoriaDos
    }else if(categoriaDos >=45 && categoriaDos < 60){
      colorCategoriaDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      categoria2Alto= categoriaDos
    }else if(categoriaDos >= 60){
      colorCategoriaDos = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      categoria3Nulo= categoriaTre
    }else if(categoriaTre >= 5 && categoriaTre < 7){
      colorCategoriaTre =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      categoria3Bajo= categoriaTre
    }else if(categoriaTre >=7 && categoriaTre < 10){
      colorCategoriaTre=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      categoria3Medio= categoriaTre
    }else if(categoriaTre >=10 && categoriaTre < 13){
      colorCategoriaTre = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      categoria3Alto= categoriaTre
    }else if(categoriaTre >= 13){
      categoria3MuyAlto= categoriaTre
      colorCategoriaTre = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    }
    
    let categoria4Nulo;
    let categoria4Bajo;
    let categoria4Medio;
    let categoria4Alto;
    let categoria4MuyAlto;
    let colorCategoriaCuatro;
    let categoriaCuatro = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72+entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64).toFixed(2);
    if(categoriaCuatro < 14){
      colorCategoriaCuatro  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      categoria4Nulo= categoriaCuatro
    }else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
      colorCategoriaCuatro =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      categoria4Bajo= categoriaCuatro
    }else if(categoriaCuatro >=29 && categoriaCuatro < 42){
      colorCategoriaCuatro=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      categoria4Medio= categoriaCuatro
    }else if(categoriaCuatro >=42 && categoriaCuatro < 58){
      colorCategoriaCuatro = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      categoria4Alto= categoriaCuatro
    }else if(categoriaCuatro >= 58){
      colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorCategoriaCinco  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      categoria5Nulo= categoriaCinco
    }else if(categoriaCinco >= 10 && categoriaCinco < 14){
      colorCategoriaCinco=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      categoria5Bajo= categoriaCinco
    }else if(categoriaCinco >=14 && categoriaCinco < 18){
      colorCategoriaCinco=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      categoria5Medio= categoriaCinco
    }else if(categoriaCinco >=18 && categoriaCinco < 23){
      colorCategoriaCinco = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      categoria5Alto= categoriaCinco
    }else if(categoriaCinco >= 23){
      colorCategoriaCinco= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorDominioUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      Dominio1Nulo= DominioUno
    }else if(DominioUno >= 5 && DominioUno < 9){
      colorDominioUno=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      Dominio1Bajo= DominioUno
    }else if(DominioUno >= 9 && DominioUno < 11){
      colorDominioUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      Dominio1Medio= DominioUno
    }else if(DominioUno >=11 && DominioUno < 14){
      colorDominioUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      Dominio1Alto= DominioUno
    }else if(DominioUno >= 14){
      colorDominioUno= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorDominioDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      Dominio2Nulo= DominioDos
    }else if(DominioDos >= 15 && DominioDos < 21){
      colorDominioDos=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      Dominio2Bajo= DominioDos
    }else if(DominioDos >= 21 && DominioDos < 27){
      colorDominioDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      Dominio2Medio= DominioDos
    }else if(DominioDos >= 27 && DominioDos < 37){
      colorDominioDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      Dominio2Alto= DominioDos
    }else if(DominioDos >= 37){
      colorDominioDos= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorDominioTres  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      Dominio3Nulo= DominioTres
    }else if(DominioTres >= 11 && DominioTres < 16){
      colorDominioTres=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      Dominio3Bajo= DominioTres
    }else if(DominioTres >= 16 && DominioTres < 21){
      colorDominioTres=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      Dominio3Medio= DominioTres
    }else if(DominioTres >= 21 && DominioTres < 25){
      colorDominioTres = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      Dominio3Alto= DominioTres
    }else if(DominioTres >= 25){
      colorDominioTres= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorDominioCuatro  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      Dominio4Nulo= DominioCuatro
    }else if(DominioCuatro >= 1 && DominioCuatro < 2){
      colorDominioCuatro=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      Dominio4Bajo= DominioCuatro
    }else if(DominioCuatro >= 2 && DominioCuatro < 4){
      colorDominioCuatro=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      Dominio4Medio= DominioCuatro
    }else if(DominioCuatro >= 4 && DominioCuatro < 6){
      colorDominioCuatro = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      Dominio4Alto= DominioCuatro
    }else if(DominioCuatro >= 6){
      colorDominioCuatro= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorDominioCinco  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      Dominio5Nulo= DominioCinco
    }else if(DominioCinco >= 4 && DominioCinco < 6){
      colorDominioCinco=<td  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      Dominio5Bajo= DominioCinco
    }else if(DominioCinco >= 6 && DominioCinco < 8){
      colorDominioCinco=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      Dominio5Medio= DominioCinco
    }else if(DominioCinco >= 8 && DominioCinco < 10){
      colorDominioCinco = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      Dominio5Alto= DominioCinco
    }else if(DominioCinco >= 10){
      colorDominioCinco= <td  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorDominioSeis  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      Dominio6Nulo= DominioSeis
    }else if(DominioSeis >= 9 && DominioSeis < 12){
      colorDominioSeis=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      Dominio6Bajo= DominioSeis
    }else if(DominioSeis >= 12 && DominioSeis < 16){
      colorDominioSeis=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      Dominio6Medio= DominioSeis
    }else if(DominioSeis >= 16 && DominioSeis < 20){
      colorDominioSeis = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      Dominio6Alto= DominioSeis
    }else if(DominioSeis >= 20){
      colorDominioSeis= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorDominioSiete  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      Dominio7Nulo= DominioSiete
    }else if(DominioSiete >= 10 && DominioSiete < 13){
      colorDominioSiete=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      Dominio7Bajo= DominioSiete
    }else if(DominioSiete >= 13 && DominioSiete < 17){
      colorDominioSiete=<td  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      Dominio7Medio= DominioSiete
    }else if(DominioSiete >= 17 && DominioSiete < 21){
      colorDominioSiete = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    Dominio7Alto= DominioSiete
    }else if(DominioSiete >= 21){
      colorDominioSiete= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorDominioOcho  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      Dominio8Nulo= DominioOcho
    }else if(DominioOcho >= 7 && DominioOcho < 10){
      colorDominioOcho  = <td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      Dominio8Bajo= DominioOcho
    }else if(DominioOcho >= 10 && DominioOcho < 13){
      colorDominioOcho=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      Dominio8Medio= DominioOcho
    }else if(DominioOcho >= 13 && DominioOcho < 16){
      colorDominioOcho = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      Dominio8Alto= DominioOcho
    }else if(DominioOcho >= 16){
      colorDominioOcho= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorDominioNueve  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      Dominio9Nulo= DominioNueve
    }else if(DominioNueve >= 6 && DominioNueve < 10){
      colorDominioNueve  = <td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      Dominio9Bajo= DominioNueve
    }else if(DominioNueve >= 10 && DominioNueve < 14){
      colorDominioNueve=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      Dominio9Medio= DominioNueve
    }else if(DominioNueve >= 14 && DominioNueve < 18){
      colorDominioNueve = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      Dominio9Alto= DominioNueve
    }else if(DominioNueve >= 18){
      colorDominioNueve= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
      colorDominioDiez  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
      Dominio10Nulo= DominioDiez
    }else if(DominioDiez >= 4 && DominioDiez < 6){
      colorDominioDiez  = <td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
      Dominio10Bajo= DominioDiez
    }else if(DominioDiez >= 6 && DominioDiez < 8){
      colorDominioDiez=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
      Dominio10Medio= DominioDiez
    }else if(DominioDiez >= 8 && DominioDiez < 10){
      colorDominioDiez = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
      Dominio10Alto= DominioDiez
    }else if(DominioDiez >= 10){
      colorDominioDiez= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
      Dominio10MuyAlto= DominioDiez
    }
     
    ponderacionIndividual =  <React.Fragment>
            <Alert className ="mt-4" color ="primary ">Resultados de la aplicación de la evaluación EEO </Alert>

                    <div>
                        <MDBBtn  className = "text-white"  size="md" color="secondary" className="k-button" onClick={() => { this.pdfExportComponent.save();}}>
                            Descargar Resultados de {this.state.resultadosQuery[0].nombre} {this.state.resultadosQuery[0].ApellidoP} {this.state.resultadosQuery[0].ApellidoM}
                        </MDBBtn>
                        &nbsp;
                    {botonCerrar}
                    </div>
                    <br/>       
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
                                <br/><font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
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
    
                                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">I.- Resultados de la categoría</font>
                                        
                                        <table WIDTH="500"style={{marginLeft:20}} className="table-bordered">
                                              
                                             <tr >                              
                                              <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Categoría</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                              <td ><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                            </tr>
                                            <tr>           
                                            <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Ambiente de Trabajo</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{categoriaUno}</font></td>
                                             {colorCategoriaUno}                
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Factores propios de la actividad</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{categoriaDos}</font></td>
                                               {colorCategoriaDos}
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Organización del tiempo de trabajo</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{categoriaTre}</font></td>
                                              {colorCategoriaTre}
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Liderazgo y relaciones en el trabajo</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{categoriaCuatro}</font></td>
                                              {colorCategoriaCuatro}
                                              </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Entorno organizacional</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{categoriaCinco}</font></td>
                                              {colorCategoriaCinco}  
                                            </tr>
                                            </table>
                                       
                                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">II.- Resultados del dominio</font>
                                      
                                          <table WIDTH="500"style={{marginLeft:20}} className="table-bordered">                                               
                                             <tr >                              
                                              <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Dominio</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                              <td ><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                            </tr>
                                            <tr>           
                                            <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Carga de Trabajo</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{DominioUno}</font></td>
                                             {colorDominioUno}                
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Condiciones en el ambiente de trabajo</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{DominioDos}</font></td>
                                               {colorDominioDos}
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Falta de control sobre el trabajo</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{DominioTres}</font></td>
                                              {colorDominioTres}
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Interferencia en la relación trabajo-familia</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{DominioCuatro}</font></td>
                                              {colorDominioCuatro}
                                              </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Jornada de trabajo</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{DominioCinco}</font></td>
                                              {colorDominioCinco}  
                                            </tr>
                                            </table>
                                          <table WIDTH="500"style={{marginLeft:20}} className="table-bordered"> 
                                              <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >6</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Liderazgo</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{DominioSeis}</font></td>
                                              {colorDominioSeis}  
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >7</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Relaciones en el trabajo</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{DominioSiete}</font></td>
                                              {colorDominioSiete}  
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >8</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Violencia</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{DominioOcho}</font></td>
                                              {colorDominioOcho}  
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >9</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Reconocimiento del desempeño</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{DominioNueve}</font></td>
                                              {colorDominioNueve}  
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >10</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Insuficiente sentido de pertenencia e, inestabilidad</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{DominioDiez}</font></td>
                                              {colorDominioDiez}  
                                            </tr>
                                          </table>
    
                                         
                                        <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">III.- Resultados por Dimensión</font>
                                        
                                          <table WIDTH="500"style={{marginLeft:20}} className="table-bordered"> 
 
                                             <tr >                              
                                              <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Dimensión</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                            </tr>
                                            <tr>           
                                            <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Condiciones peligrosas e inseguras</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero1+entero3).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero2+entero4).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{entero5.toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero6+entero12).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero7+entero8).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >6</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Carga mental</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero9+entero10+entero11).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >7</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero65+entero66+entero67+entero68).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >8</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero13+entero14).toFixed(2)}</font></td>
                                            </tr>
    
    
                                            <tr>           
                                            <td width="10%"><font size="1" face="arial"color="black" >9</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero15+entero16).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >10</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero25+entero26+entero27+entero28).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >11</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero23+entero24).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >12</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Insuficiente participación y manejo del cambio</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero29+entero30).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >13</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero35+entero36).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >14</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero17+entero18).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >15</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero19+entero20).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >16</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero21+entero22).toFixed(2)}</font></td>
                                            </tr>
    
                                            <tr>           
                                            <td width="10%"><font size="1" face="arial"color="black" >17</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero31+entero32+entero33+entero34).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >18</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero37+entero38+entero39+entero40+entero41).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >19</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Relaciones sociales en el trabajo</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero42+entero43+entero44+entero45+entero46).toFixed(2)}</font></td>
                                            </tr>
    
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >20</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero69+entero70+entero71+entero72).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >21</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Violencia laboral</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >22</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Escasa o nula retroalimentación del desempeño</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero47+entero48).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >23</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Escaso o nulo reconocimiento y compensación</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero49+entero50+entero51+entero52).toFixed(2)}</font></td>
                                              </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >24</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Limitado sentido de pertenencia</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero55+entero56).toFixed(2)}</font></td>
                                            </tr>
                                            <tr>         
                                              <td width="10%"><font size="1" face="arial"color="black" >25</font></td>
                                              <td width="60%"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                              <td width="20%"><font size="1" face="arial"color="black">{(entero53+entero54).toFixed(2)}</font></td>
                                            </tr>
                                          </table>
    
                                    
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
    
     
     let botonResultadosGlobales;
     let botonReporteEjecutivo;
    
     if(this.state.botonDisabled){
         botonResultadosGlobales=
         
         <MDBCol>
         <MDBBtn className = "text-white"  onClick={e=>this.consultarDatosFiltrados(datosEmpleados,filtro)} color="success" size="md">Reporte Global</MDBBtn>
         <MDBBtn className = "text-white"  disabled={!this.state.botonResultados} onClick={e=>this.reporteImasivo(datosEmpleados,filtro)} color="success" size="md">Evaluaciones masivas</MDBBtn>
         <MDBBtn className = "text-white"  disabled={!this.state.botonResultados} onClick={e=>this.reporteImasivoResultados(datosEmpleados,filtro)} color="success" size="md">Resultados masivos</MDBBtn>
         <MDBBtn className = "text-white"  disabled={!this.state.botonResultados} onClick={e=>this.reporteEjecutivo(datosEmpleados,filtro)} color="success" size="md">Reporte ejecutivo</MDBBtn> 
         </MDBCol>
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

                    
    let PDFResultadosMasivos;
    let PDFRespuestasMasivos;
    if(this.state.resultadosEvaluacionMasivo[0]){
     
      PDFResultadosMasivos = 
        <div>
         <MDBRow style={{marginLeft:"2%"}}>     
              <MDBBtn   color="primary" size="md"  onClick={() => { this.pdfExportComponent.save(); }}>
                  Descargar reporte de resultados masivos
              </MDBBtn>
              {botonCerrar}
          </MDBRow>  
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
          <br/><font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
                          
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

            let filtrar1;
            filtrar1 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 1;
            });
            value1 = filtrar1.pop()
      
            let filtrar2;
            filtrar2 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 2;
            });
            value2 = filtrar2.pop()
      
            let filtrar3;
            filtrar3 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 3;
            });
            value3 = filtrar3.pop()
      
      
            let filtrar4;
            filtrar4 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 4;
            });
            value4 = filtrar4.pop()
      
      
            let filtrar5;
            filtrar5 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 5;
            });
            value5 = filtrar5.pop()
      
      
            let filtrar6;
            filtrar6 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 6;
            });
            value6 = filtrar6.pop()
      
      
            let filtrar7;
            filtrar7 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 7;
            });
            value7 = filtrar7.pop()
      
      
            let filtrar8;
            filtrar8 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 8;
            });
            value8 = filtrar8.pop()
      
      
            let filtrar9;
            filtrar9 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 9;
            });
            value9  = filtrar9.pop()
      
      
            let filtrar10;
            filtrar10 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 10;
            });
            value10 = filtrar10.pop()
      
      
            let filtrar11;
            filtrar11 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 11;
            });
            value11 = filtrar11.pop()
      
            let filtrar12;
            filtrar12 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 12;
            });
            value12 = filtrar12.pop()
      
            let filtrar13;
            filtrar13 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 13;
            });
            value13 = filtrar13.pop()
      
            let filtrar14;
            filtrar14 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 14;
            });
            value14 = filtrar14.pop()
      
            let filtrar15;
            filtrar15 = rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 15;
            });
            value15 = filtrar15.pop()
      
            let filtrar16;
            filtrar16 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 16;
            });
            value16 = filtrar16.pop()
      
            let filtrar17;
            filtrar17 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 17;
            });
            value17 = filtrar17.pop()
      
            let filtrar18;
            filtrar18 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 18;
            });
            value18 = filtrar18.pop()
      
            let filtrar19;
            filtrar19 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 19;
            });
            value19 = filtrar19.pop()
      
            let filtrar20;
            filtrar20=  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 20;
            });
            value20 = filtrar20.pop()
      
            let filtrar21;
            filtrar21 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 21;
            });
            value21 = filtrar21.pop()
      
              let filtrar22;
            filtrar22 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 22;
            });
            value22 = filtrar22.pop()
      
            let filtrar23;
            filtrar23 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 23;
            });
            value23 = filtrar23.pop()
      
            let filtrar24;
            filtrar24=  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 24;
            });
            value24 = filtrar24.pop()
      
            let filtrar25;
            filtrar25 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 25;
            });
            value25 = filtrar25.pop()
      
            let filtrar26;
            filtrar26 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 26;
            });
            value26 = filtrar26.pop()
      
            let filtrar27;
            filtrar27 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 27;
            }); 
            value27 = filtrar27.pop()
          
            let filtrar28;
            filtrar28 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 28;
            });
            value28 = filtrar28.pop()
      
            let filtrar29;
            filtrar29 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 29;
            }); 
            value29 = filtrar29.pop()
         
            let filtrar30;
            filtrar30 = rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 30;
            });
            value30 = filtrar30.pop()
      
            let filtrar31;
            filtrar31 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 31;
            });
            value31 = filtrar31.pop()
      
            let filtrar32;
            filtrar32 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 32;
            });
            value32 = filtrar32.pop()
      
            let filtrar33;
            filtrar33 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 33;
            });
            value33 = filtrar33.pop()
      
            let filtrar34;
            filtrar34 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 34;
            });
            value34 = filtrar34.pop()
      
            let filtrar35;
            filtrar35 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 35;
            });
            value35 = filtrar35.pop()
      
            let filtrar36;
            filtrar36 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 36;
            });
            value36 = filtrar36.pop()
      
            let filtrar37;
            filtrar37 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 37;
            });
            value37 = filtrar37.pop()
      
            let filtrar38;
            filtrar38 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 38;
            });
            value38 = filtrar38.pop()
      
             let filtrar39;
            filtrar39 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 39;
            });
            value39 = filtrar39.pop()
      
            let filtrar40;
            filtrar40 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 40;
            }); 
            value40 = filtrar40.pop()
           
            let filtrar41;
            filtrar41 = rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 41;
            });   
            value41 = filtrar41.pop()
         
            let filtrar42;
            filtrar42 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 42;
            });  
            value42 = filtrar42.pop()
          
            let filtrar43;
            filtrar43 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 43;
            }); 
            value43 = filtrar43.pop()
           
            let filtrar44;
            filtrar44 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 44;
            });
            value44 = filtrar44.pop()
      
            let filtrar45;
            filtrar45 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 45;
            });
            value45 = filtrar45.pop()
      
             let filtrar46;
            filtrar46 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 46;
            });
            value46 = filtrar46.pop()
      
            let filtrar47;
            filtrar47 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 47;
            });
            value47 = filtrar47.pop()
      
            let filtrar48;
            filtrar48 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 48;
            });
            value48 = filtrar48.pop()
      
            let filtrar49;
            filtrar49 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 49;
            });
            value49 = filtrar49.pop()
            
            let filtrar50;
            filtrar50 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 50;
            });
            value50 = filtrar50.pop()
      
            let filtrar51;
            filtrar51 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 51;
            });
            value51 = filtrar51.pop()
      
            let filtrar52;
            filtrar52 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 52;
            });
            value52= filtrar52.pop()
      
            let filtrar53;
            filtrar53 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 53;
            });
            value53 = filtrar53.pop()
      
            let filtrar54;
            filtrar54 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 54;
            });
            value54 = filtrar54.pop()
      
            let filtrar55;
            filtrar55 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 55;
            });
            value55 = filtrar55.pop()
      
            let filtrar56;
            filtrar56 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 56;
            });
            value56 = filtrar56.pop()
      
            let filtrar57;
            filtrar57 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 57;
            }); 
            value57 = filtrar57.pop()
       
            let filtrar58;
            filtrar58 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 58;
            });
            value58 = filtrar58.pop()
      
            let filtrar59;
            filtrar59 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 59;
            });
            value59 = filtrar59.pop()
      
            let filtrar60;
            filtrar60 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 60;
            });
            value60 = filtrar60.pop()
      
            let filtrar61;
            filtrar61 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 61;
            });
            value61 = filtrar61.pop()
        
            let filtrar62;
            filtrar62 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 62;
            });
            value62 = filtrar62.pop()
      
            let filtrar63;
            filtrar63 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 63;
            });
            value63 = filtrar63.pop()
      
            let filtrar64;
            filtrar64 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 64;
            });
            value64 = filtrar64.pop()
      
            let filtrar65;
            filtrar65 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 65;
            });
            value65 = filtrar65.pop()
      
            let filtrar66;
            filtrar66 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 66;
            });
            value66 = filtrar66.pop()
      
            let filtrar67;
            filtrar67 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 67;
            });
            value67 = filtrar67.pop()
      
            let filtrar68;
            filtrar68 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 68;
            });
            value68 = filtrar68.pop()
      
            let filtrar69;
            filtrar69 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 69;
            });
            value69= filtrar69.pop()
      
            let filtrar70;
            filtrar70 = rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 70;
            });
            value70 = filtrar70.pop()
      
            let filtrar71;
            filtrar71 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 71;
            });
            value71 = filtrar71.pop()
      
            let filtrar72;
            filtrar72 =  rows.filter(function(hero) {
              return hero.fk_preguntasEEO == 72;
            });
            value72 = filtrar72.pop()

      let valor1=value1.ponderacion;
      let valor2=value2.ponderacion;
      let valor3=value3.ponderacion;
      let valor4=value4.ponderacion;
      let valor5=value5.ponderacion;
      let valor6=value6.ponderacion;
      let valor7=value7.ponderacion;
      let valor8=value8.ponderacion;
      let valor9=value9.ponderacion;
      let valor10=value10.ponderacion;
      let valor11=value11.ponderacion;
      let valor12=value12.ponderacion;
      let valor13=value13.ponderacion;
      let valor14=value14.ponderacion;
      let valor15=value15.ponderacion;
      let valor16=value16.ponderacion;
      let valor17=value17.ponderacion;
      let valor18=value18.ponderacion;
      let valor19=value19.ponderacion;
      let valor20=value20.ponderacion;
      let valor21=value21.ponderacion;
      let valor22=value22.ponderacion;
      let valor23=value23.ponderacion;
      let valor24=value24.ponderacion;
      let valor25=value25.ponderacion;
      let valor26=value26.ponderacion;
      let valor27=value27.ponderacion;
      let valor28=value28.ponderacion;
      let valor29=value29.ponderacion;
      let valor30=value30.ponderacion;
      let valor31=value31.ponderacion;
      let valor32=value32.ponderacion;
      let valor33=value33.ponderacion;
      let valor34=value34.ponderacion;
      let valor35=value35.ponderacion;
      let valor36=value36.ponderacion;
      let valor37=value37.ponderacion;
      let valor38=value38.ponderacion;
      let valor39=value39.ponderacion;
      let valor40=value40.ponderacion;
      let valor41=value41.ponderacion;
      let valor42=value42.ponderacion;
      let valor43=value43.ponderacion;
      let valor44=value44.ponderacion;
      let valor45=value45.ponderacion;
      let valor46=value46.ponderacion;
      let valor47=value47.ponderacion;
      let valor48=value48.ponderacion;
      let valor49=value49.ponderacion;
      let valor50=value50.ponderacion;  
      let valor51=value51.ponderacion;
      let valor52=value52.ponderacion;
      let valor53=value53.ponderacion;
      let valor54=value54.ponderacion;
      let valor55=value55.ponderacion;
      let valor56=value56.ponderacion;
      let valor57=value57.ponderacion;
      let valor58=value58.ponderacion;
      let valor59=value59.ponderacion;
      let valor60=value60.ponderacion; 
      let valor61=value61.ponderacion;
      let valor62=value62.ponderacion;
      let valor63=value63.ponderacion;
      let valor64=value64.ponderacion;
      let valor65=value65.ponderacion;
      let valor66=value66.ponderacion;
      let valor67=value67.ponderacion;
      let valor68=value68.ponderacion;
      let valor69=value69.ponderacion;
      let valor70=value70.ponderacion;
      let valor71=value71.ponderacion;
      let valor72=value72.ponderacion;

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

    if(categoriaUno < 5){
    categoria1Nulo= categoriaUno
    colorCategoriaUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    }else if(categoriaUno >= 5 && categoriaUno < 9){
    colorCategoriaUno =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    categoria1Bajo= categoriaUno
    }else if(categoriaUno >= 9 && categoriaUno < 11){
    colorCategoriaUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    categoria1Medio= categoriaUno
    }else if(categoriaUno >= 11 && categoriaUno < 14){
    colorCategoriaUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    categoria1Alto= categoriaUno
    }else if(categoriaUno >= 14){
    colorCategoriaUno = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorCategoriaDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    categoria2Nulo= categoriaDos
    }else if(categoriaDos >= 15 && categoriaDos < 30){
    colorCategoriaDos =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    categoria2Bajo= categoriaDos
    }else if(categoriaDos >=30 && categoriaDos < 45){
    colorCategoriaDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    categoria2Medio= categoriaDos
    }else if(categoriaDos >=45 && categoriaDos < 60){
    colorCategoriaDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    categoria2Alto= categoriaDos
    }else if(categoriaDos >= 60){
    colorCategoriaDos = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    categoria3Nulo= categoriaTre
    }else if(categoriaTre >= 5 && categoriaTre < 7){
    colorCategoriaTre =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    categoria3Bajo= categoriaTre
    }else if(categoriaTre >=7 && categoriaTre < 10){
    colorCategoriaTre=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    categoria3Medio= categoriaTre
    }else if(categoriaTre >=10 && categoriaTre < 13){
    colorCategoriaTre = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    categoria3Alto= categoriaTre
    }else if(categoriaTre >= 13){
    categoria3MuyAlto= categoriaTre
    colorCategoriaTre = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    }

    let categoria4Nulo;
    let categoria4Bajo;
    let categoria4Medio;
    let categoria4Alto;
    let categoria4MuyAlto;
    let colorCategoriaCuatro;
    let categoriaCuatro = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72+entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64).toFixed(2);
    if(categoriaCuatro < 14){
    colorCategoriaCuatro  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    categoria4Nulo= categoriaCuatro
    }else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
    colorCategoriaCuatro =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    categoria4Bajo= categoriaCuatro
    }else if(categoriaCuatro >=29 && categoriaCuatro < 42){
    colorCategoriaCuatro=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    categoria4Medio= categoriaCuatro
    }else if(categoriaCuatro >=42 && categoriaCuatro < 58){
    colorCategoriaCuatro = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    categoria4Alto= categoriaCuatro
    }else if(categoriaCuatro >= 58){
    colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorCategoriaCinco  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    categoria5Nulo= categoriaCinco
    }else if(categoriaCinco >= 10 && categoriaCinco < 14){
    colorCategoriaCinco=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    categoria5Bajo= categoriaCinco
    }else if(categoriaCinco >=14 && categoriaCinco < 18){
    colorCategoriaCinco=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    categoria5Medio= categoriaCinco
    }else if(categoriaCinco >=18 && categoriaCinco < 23){
    colorCategoriaCinco = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    categoria5Alto= categoriaCinco
    }else if(categoriaCinco >= 23){
    colorCategoriaCinco= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorDominioUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    Dominio1Nulo= DominioUno
    }else if(DominioUno >= 5 && DominioUno < 9){
    colorDominioUno=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    Dominio1Bajo= DominioUno
    }else if(DominioUno >= 9 && DominioUno < 11){
    colorDominioUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    Dominio1Medio= DominioUno
    }else if(DominioUno >=11 && DominioUno < 14){
    colorDominioUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    Dominio1Alto= DominioUno
    }else if(DominioUno >= 14){
    colorDominioUno= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorDominioDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    Dominio2Nulo= DominioDos
    }else if(DominioDos >= 15 && DominioDos < 21){
    colorDominioDos=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    Dominio2Bajo= DominioDos
    }else if(DominioDos >= 21 && DominioDos < 27){
    colorDominioDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    Dominio2Medio= DominioDos
    }else if(DominioDos >= 27 && DominioDos < 37){
    colorDominioDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    Dominio2Alto= DominioDos
    }else if(DominioDos >= 37){
    colorDominioDos= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorDominioTres  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    Dominio3Nulo= DominioTres
    }else if(DominioTres >= 11 && DominioTres < 16){
    colorDominioTres=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    Dominio3Bajo= DominioTres
    }else if(DominioTres >= 16 && DominioTres < 21){
    colorDominioTres=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    Dominio3Medio= DominioTres
    }else if(DominioTres >= 21 && DominioTres < 25){
    colorDominioTres = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    Dominio3Alto= DominioTres
    }else if(DominioTres >= 25){
    colorDominioTres= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorDominioCuatro  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    Dominio4Nulo= DominioCuatro
    }else if(DominioCuatro >= 1 && DominioCuatro < 2){
    colorDominioCuatro=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    Dominio4Bajo= DominioCuatro
    }else if(DominioCuatro >= 2 && DominioCuatro < 4){
    colorDominioCuatro=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    Dominio4Medio= DominioCuatro
    }else if(DominioCuatro >= 4 && DominioCuatro < 6){
    colorDominioCuatro = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    Dominio4Alto= DominioCuatro
    }else if(DominioCuatro >= 6){
    colorDominioCuatro= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorDominioCinco  = <td width="15px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    Dominio5Nulo= DominioCinco
    }else if(DominioCinco >= 4 && DominioCinco < 6){
    colorDominioCinco=<td width="15px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    Dominio5Bajo= DominioCinco
    }else if(DominioCinco >= 6 && DominioCinco < 8){
    colorDominioCinco=<td width="15px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    Dominio5Medio= DominioCinco
    }else if(DominioCinco >= 8 && DominioCinco < 10){
    colorDominioCinco = <td  width="15px"style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    Dominio5Alto= DominioCinco
    }else if(DominioCinco >= 10){
    colorDominioCinco= <td  width="15px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorDominioSeis  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    Dominio6Nulo= DominioSeis
    }else if(DominioSeis >= 9 && DominioSeis < 12){
    colorDominioSeis=<td  width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    Dominio6Bajo= DominioSeis
    }else if(DominioSeis >= 12 && DominioSeis < 16){
    colorDominioSeis=<td width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    Dominio6Medio= DominioSeis
    }else if(DominioSeis >= 16 && DominioSeis < 20){
    colorDominioSeis = <td width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    Dominio6Alto= DominioSeis
    }else if(DominioSeis >= 20){
    colorDominioSeis= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorDominioSiete  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    Dominio7Nulo= DominioSiete
    }else if(DominioSiete >= 10 && DominioSiete < 13){
    colorDominioSiete=<td width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    Dominio7Bajo= DominioSiete
    }else if(DominioSiete >= 13 && DominioSiete < 17){
    colorDominioSiete=<td  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    Dominio7Medio= DominioSiete
    }else if(DominioSiete >= 17 && DominioSiete < 21){
    colorDominioSiete = <td width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    Dominio7Alto= DominioSiete
    }else if(DominioSiete >= 21){
    colorDominioSiete= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorDominioOcho  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    Dominio8Nulo= DominioOcho
    }else if(DominioOcho >= 7 && DominioOcho < 10){
    colorDominioOcho  = <td width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    Dominio8Bajo= DominioOcho
    }else if(DominioOcho >= 10 && DominioOcho < 13){
    colorDominioOcho=<td width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    Dominio8Medio= DominioOcho
    }else if(DominioOcho >= 13 && DominioOcho < 16){
    colorDominioOcho = <td width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    Dominio8Alto= DominioOcho
    }else if(DominioOcho >= 16){
    colorDominioOcho= <td width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorDominioNueve  = <td width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    Dominio9Nulo= DominioNueve
    }else if(DominioNueve >= 6 && DominioNueve < 10){
    colorDominioNueve  = <td width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    Dominio9Bajo= DominioNueve
    }else if(DominioNueve >= 10 && DominioNueve < 14){
    colorDominioNueve=<td  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    Dominio9Medio= DominioNueve
    }else if(DominioNueve >= 14 && DominioNueve < 18){
    colorDominioNueve = <td  width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    Dominio9Alto= DominioNueve
    }else if(DominioNueve >= 18){
    colorDominioNueve= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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
    colorDominioDiez  = <td width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    Dominio10Nulo= DominioDiez
    }else if(DominioDiez >= 4 && DominioDiez < 6){
    colorDominioDiez  = <td width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    Dominio10Bajo= DominioDiez
    }else if(DominioDiez >= 6 && DominioDiez < 8){
    colorDominioDiez=<td width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    Dominio10Medio= DominioDiez
    }else if(DominioDiez >= 8 && DominioDiez < 10){
    colorDominioDiez = <td width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    Dominio10Alto= DominioDiez
    }else if(DominioDiez >= 10){
    colorDominioDiez= <td  width="20px"style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
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

    <table  component={Paper}  small  className="text-left ">
     <font color="red" style= {{marginTop:20,marginLeft:15}}  size="1">I.- Resultados de la categoría</font>
    </table>
    <table width="500" style={{marginLeft:15}} className="table-bordered"> 

    <tr >                              
    <td width="10%"><font size="1" face="arial"color="black" ></font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Categoría</font></td>
    <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
    <td ><font size="1" face="arial"color="black">Riesgo</font></td>                                         
    </tr>
    <tr>           
    <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
    <td width="60%"  className="text-left"><font size="1" face="arial"color="black">Ambiente de Trabajo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{categoriaUno}</font></td>
    {colorCategoriaUno}                
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Factores propios de la actividad</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{categoriaDos}</font></td>
      {colorCategoriaDos}
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Organización del tiempo de trabajo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{categoriaTre}</font></td>
    {colorCategoriaTre}
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Liderazgo y relaciones en el trabajo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{categoriaCuatro}</font></td>
    {colorCategoriaCuatro}
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Entorno organizacional</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{categoriaCinco}</font></td>
    {colorCategoriaCinco}  
    </tr>
    </table>
    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">II.- Resultados del dominio</font>

    <table width="500" style={{marginLeft:15}} className="table-bordered"> 
    <tr >                              
    <td width="10%"><font size="1" face="arial"color="black" ></font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Dominio</font></td>
    <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
    <td ><font size="1" face="arial"color="black">Riesgo</font></td>                                         
    </tr>
    <tr>           
    <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
    <td width="60%"  className="text-left"><font size="1" face="arial"color="black">Carga de Trabajo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{DominioUno}</font></td>
    {colorDominioUno}                
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Condiciones en el ambiente de trabajo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{DominioDos}</font></td>
      {colorDominioDos}
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Falta de control sobre el trabajo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{DominioTres}</font></td>
    {colorDominioTres}
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Interferencia en la relación trabajo-familia</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{DominioCuatro}</font></td>
    {colorDominioCuatro}
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Jornada de trabajo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{DominioCinco}</font></td>
    {colorDominioCinco}  
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >6</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Liderazgo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{DominioSeis}</font></td>
    {colorDominioSeis}  
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >7</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Relaciones en el trabajo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{DominioSiete}</font></td>
    {colorDominioSiete}  
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >8</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Violencia</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{DominioOcho}</font></td>
    {colorDominioOcho}  
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >9</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Reconocimiento del desempeño</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{DominioNueve}</font></td>
    {colorDominioNueve}  
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >10</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Insuficiente sentido de pertenencia e, inestabilidad</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{DominioDiez}</font></td>
    {colorDominioDiez}  
    </tr>

    </table>
    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">III.- Resultados por Dimensión</font>
    <table width="500" style={{marginLeft:15}} className="table-bordered"> 

    <tr >                              
    <td width="10%"><font size="1" face="arial"color="black" ></font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Dimensión</font></td>
    <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
    </tr>
    <tr>           
    <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
    <td width="60%"  className="text-left"><font size="1" face="arial"color="black">Condiciones peligrosas e inseguras</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero1+entero3).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero2+entero4).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{entero5.toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero6+entero12).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero7+entero8).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >6</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Carga mental</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero9+entero10+entero11).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >7</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero65+entero66+entero67+entero68).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >8</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero13+entero14).toFixed(2)}</font></td>
    </tr>

    <tr>           
    <td width="10%"><font size="1" face="arial"color="black" >9</font></td>
    <td width="60%"  className="text-left"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero15+entero16).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10"><font size="1" face="arial"color="black" >10</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero25+entero26+entero27+entero28).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >11</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero23+entero24).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >12</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Insuficiente participación y manejo del cambio</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero29+entero30).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >13</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero35+entero36).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >14</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero17+entero18).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >15</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero19+entero20).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >16</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero21+entero22).toFixed(2)}</font></td>
    </tr>

    <tr>           
    <td width="10%"><font size="1" face="arial"color="black" >17</font></td>
    <td width="60%"  className="text-left"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero31+entero32+entero33+entero34).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >18</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero37+entero38+entero39+entero40+entero41).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >19</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Relaciones sociales en el trabajo</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero42+entero43+entero44+entero45+entero46).toFixed(2)}</font></td>
    </tr>

    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >20</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero69+entero70+entero71+entero72).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >21</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Violencia laboral</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >22</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Escasa o nula retroalimentación del desempeño</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero47+entero48).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >23</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Escaso o nulo reconocimiento y compensación</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero49+entero50+entero51+entero52).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >24</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Limitado sentido de pertenencia</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero55+entero56).toFixed(2)}</font></td>
    </tr>
    <tr>         
    <td width="10%"><font size="1" face="arial"color="black" >25</font></td>
    <td width="60%" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
    <td width="20%"><font size="1" face="arial"color="black">{(entero53+entero54).toFixed(2)}</font></td>
    </tr>
    </table>                        
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

    }

    if(this.state.reporteImasivo[0]){

         PDFRespuestasMasivos = 
         <div>
           <MDBRow style={{marginLeft:"2%"}}>     
              <MDBBtn   color="primary" size="md"  onClick={() => { this.pdfExportComponent.save(); }}>
                  Descargar reporte de evaluaciones masivas
              </MDBBtn>
              {botonCerrar}
          </MDBRow>
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
              <font size="2"face="arial"color="black">CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO</font><br></br>
              <font size="1"face="arial"color="black">{this.state.date}</font>    
              <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                  <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font>                                               
                  <br/><font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
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
                console.log("reporteimasivo" , rows)
               if(rows[0]){
                let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,value21,value22,value23,value24;
                let value25,value26,value27,value28,value29,value30,value31,value32,value33,value34,value35,value36,value37,value38,value39,value40,value41,value42,value43,value44,value45,value46;
                let value47,value48,value49,value50,value51,value52,value53,value54,value55,value56,value57,value58,value59,value60,value61,value62,value63,value64,value65,value66,value67,value68;
                let value69,value70,value71,value72;
                 
                let filtrar1;
                filtrar1 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 1;
                });
                value1 = filtrar1.pop()
                          
                let filtrar2;
                filtrar2 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 2;
                });
                value2 = filtrar2.pop()
          
                let filtrar3;
                filtrar3 = rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 3;
                });
                value3 = filtrar3.pop()
          
                let filtrar4;
                filtrar4 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 4;
                });
                value4 = filtrar4.pop()
          
                let filtrar5;
                filtrar5 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 5;
                });
                value5 = filtrar5.pop()
          
                let filtrar6;
                filtrar6 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 6;
                });
                value6 = filtrar6.pop();
                console.log("value6" , value6)
          
                let filtrar7;
                filtrar7 = rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 7;
                });
                value7 = filtrar7.pop()
          
                let filtrar8;
                filtrar8 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 8;
                });
                value8 = filtrar8.pop()
          
                let filtrar9;
                filtrar9 = rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 9;
                });
                value9 = filtrar9.pop()
          
                let filtrar10;
                filtrar10 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 10;
                });
                value10 = filtrar10.pop()
          
                let filtrar11;
                filtrar11 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 11;
                });
                value11 = filtrar11.pop()
          
                let filtrar12;
                filtrar12 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 12;
                });
                value12 = filtrar12.pop()

                let filtrar13;
                filtrar13 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 13;
                });
                value13 = filtrar13.pop()

                let filtrar14;
                filtrar14 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 14;
                });
                value14 = filtrar14.pop()

                let filtrar15;
                filtrar15 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 15;
                });
                value15 = filtrar15.pop()

                let filtrar16;
                filtrar16 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 16;
                });
                value16 = filtrar16.pop()

                let filtrar17;
                filtrar17 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 17;
                });
                value17 = filtrar17.pop()
                          
                let filtrar18;
                filtrar18 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 18;
                });
                value18 = filtrar18.pop()

                let filtrar19;
                filtrar19 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 19;
                });
                value19 = filtrar19.pop()
                          
                let filtrar20;
                filtrar20=  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 20;
                });
                value20 = filtrar20.pop()

                let filtrar21;
                filtrar21 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 21;
                });
                value21 = filtrar21.pop()

                  let filtrar22;
                filtrar22 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 22;
                });
                value22 = filtrar22.pop()

                let filtrar23;
                filtrar23 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 23;
                });
                value23 = filtrar23.pop()

                let filtrar24;
                filtrar24=  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 24;
                });
                value24 = filtrar24.pop()

                let filtrar25;
                filtrar25 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 25;
                });
                value25 = filtrar25.pop()

                let filtrar26;
                filtrar26 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 26;
                });
                value26 = filtrar26.pop()

                let filtrar27;
                filtrar27 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 27;
                });
                value27 = filtrar27.pop()

                let filtrar28;
                filtrar28 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 28;
                });
                value28 = filtrar28.pop()

                let filtrar29;
                filtrar29 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 29;
                }); 
                value29 = filtrar29.pop()

                let filtrar30;
                filtrar30 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 30;
                });
                value30 = filtrar30.pop()

                let filtrar31;
                filtrar31 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 31;
                });
                value31 = filtrar31.pop()

                let filtrar32;
                filtrar32 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 32;
                });
                value32 = filtrar32.pop()

                let filtrar33;
                filtrar33 = rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 33;
                });
                value33 = filtrar33.pop()
                
                let filtrar34;
                filtrar34 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 34;
                });
                value34 = filtrar34.pop()

                let filtrar35;
                filtrar35 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 35;
                });
                value35 = filtrar35.pop()

                let filtrar36;
                filtrar36 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 36;
                });
                value36 = filtrar36.pop()

                let filtrar37;
                filtrar37 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 37;
                });
                value37 = filtrar37.pop()

                let filtrar38;
                filtrar38 = rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 38;
                });
                value38 = filtrar38.pop()

                 let filtrar39;
                filtrar39 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 39;
                });
                value39 = filtrar39.pop()
                
                let filtrar40;
                filtrar40 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 40;
                }); 
                value40 = filtrar40.pop()

                let filtrar41;
                filtrar41 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 41;
                });  
                value41 = filtrar41.pop()

                let filtrar42;
                filtrar42 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 42;
                });  
                value42 = filtrar42.pop()

                let filtrar43;
                filtrar43 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 43;
                });  
                value43 = filtrar43.pop()

                let filtrar44;
                filtrar44 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 44;
                });
                value44= filtrar44.pop()

                let filtrar45;
                filtrar45 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 45;
                });
                value45 = filtrar45.pop()

                 let filtrar46;
                filtrar46 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 46;
                });
                value46 = filtrar46.pop()

                let filtrar47;
                filtrar47 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 47;
                });
                value47 = filtrar47.pop()

                let filtrar48;
                filtrar48 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 48;
                });
                value48 = filtrar48.pop()

                let filtrar49;
                filtrar49 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 49;
                }); 
                value49 = filtrar49.pop()
                     
                let filtrar50;
                filtrar50 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 50;
                });
                value50 = filtrar50.pop()

                let filtrar51;
                filtrar51 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 51;
                });
                value51 = filtrar51.pop()

                let filtrar52;
                filtrar52 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 52;
                });
                value52 = filtrar52.pop()

                let filtrar53;
                filtrar53 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 53;
                });
                value53 = filtrar53.pop()

                let filtrar54;
                filtrar54 = rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 54;
                });
                value54 = filtrar54.pop()

                let filtrar55;
                filtrar55 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 55;
                });
                value55 = filtrar55.pop()

                let filtrar56;
                filtrar56 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 56;
                });
                value56 = filtrar56.pop()

                let filtrar57;
                filtrar57 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 57;
                });  
                value57 = filtrar57.pop()

                let filtrar58;
                filtrar58 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 58;
                });
                value58 = filtrar58.pop()

                let filtrar59;
                filtrar59 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 59;
                });
                value59 = filtrar59.pop()

                let filtrar60;
                filtrar60 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 60;
                });
                value60 = filtrar60.pop()

                let filtrar61;
                filtrar61 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 61;
                });  
                value61 = filtrar61.pop()

                let filtrar62;
                filtrar62 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 62;
                });
                value62 = filtrar62.pop()

                let filtrar63;
                filtrar63 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 63;
                });
                value63 = filtrar63.pop()

                let filtrar64;
                filtrar64 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 64;
                });
                value64 = filtrar64.pop()

                let filtrar65;
                filtrar65 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 65;
                });
                value65 = filtrar65.pop()

                let filtrar66;
                filtrar66 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 66;
                });
                value66 = filtrar66.pop()

                let filtrar67;
                filtrar67 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 67;
                });
                value67 = filtrar67.pop()

                let filtrar68;
                filtrar68 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 68;
                });
                value68 = filtrar68.pop()

                let filtrar69;
                filtrar69 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 69;
                });
                value69 = filtrar69.pop()

                let filtrar70;
                filtrar70 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 70;
                });
                value70 = filtrar70.pop()

                let filtrar71;
                filtrar71 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 71;
                });
                value71 = filtrar71.pop()

                let filtrar72;
                filtrar72 =  rows.filter(function(hero) {
                  return hero.fk_preguntasEEO == 72;
                });  
                value72 = filtrar72.pop()

               return(
                <div> 
                 
                <table width="500" style = {{marginLeft:40,marginBottom:15,marginTop:10}} >

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
                </table>

                <font color="red" style= {{marginLeft:30}}  size="1">I. Condiciones ambientales de su centro de trabajo.</font>
           
                <table width="500" style = {{marginLeft:30}} className="table-bordered ">                     
               
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</font></td>
                <td width="20%"><font size="1" face="arial"color="black" >{value1.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo me exige hacer mucho esfuerzo físico</font></td>
                  <td width="20%" ><font size="1" face="arial"color="black" >{value2.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Me preocupa sufrir un accidente en mi trabajo</font></td>
                  <td width="20%"><font size="1" face="arial"color="black" >{value3.Respuestas}</font></td> 
                </tr>                    
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo</font></td>
                  <td width="20%"><font size="1" face="arial"color="black" >{value4.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Considero que las actividades que realizo son peligrosas</font></td>
                  <td width="20%"><font size="1" face="arial"color="black" >{value5.Respuestas}</font></td> 
              </tr>
               </table>
   
                <font color="red" style= {{marginTop:40,marginLeft:30}}   size="1">II. La cantidad y ritmo de trabajo que tiene.</font>

                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno</font></td>
                <td width="20%"><font size="1" face="arial"color="black" >{value6.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo trabajar sin parar</font></td>
                  <td width="20%"><font size="1" face="arial"color="black" >{value7.Respuestas} </font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Considero que es necesario mantener un ritmo de trabajo acelerado</font></td>
                  <td width="20%"><font size="1" face="arial"color="black" >{value8.Respuestas}</font></td> 
                </tr>
              
                </table>

                <font style= {{marginLeft:30}}  size="1" color="red" >III. El esfuerzo mental que le exige su trabajo.</font>

                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo exige que esté muy concentrado</font></td>
                <td width="20%"><font size="1" face="arial"color="black" >{value9.Respuestas}</font></td> 
              </tr>
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo requiere que memorice mucha información</font></td>   
                <td width="20%"><font size="1" face="arial"color="black" >{value10.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >En mi trabajo tengo que tomar decisiones difíciles muy rápido</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value11.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo exige que atienda varios asuntos al mismo tiempo</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value12.Respuestas}</font></td> 
                </tr>
                </table>
             
                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >IV. Trabajo y las responsabilidades que tiene.</font>
  
                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >En mi trabajo soy responsable de cosas de mucho valor</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value13.Respuestas}</font></td> 
                </tr>
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Respondo ante mi jefe por los resultados de toda mi área de trabajo</font></td>   
                <td width="20%"><font size="1" face="arial"color="black" >{value14.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >En el trabajo me dan órdenes contradictorias</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value15.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Considero que en mi trabajo me piden hacer cosas innecesarias</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value16.Respuestas}</font></td> 
                </tr>
               
                </table>

                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >V. Jornada de trabajo.</font>

                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Trabajo horas extras más de tres veces a la semana</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value17.Respuestas}</font></td> 
                </tr>
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo me exige laborar en días de descanso, festivos o fines de semana</font></td>   
                <td width="20%"><font size="1" face="arial"color="black" >{value18.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value19.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Debo atender asuntos de trabajo cuando estoy en casa</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value20.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Pienso en las actividades familiares o personales cuando estoy en mi trabajo</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value21.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Pienso que mis responsabilidades familiares afectan mi trabajo</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value22.Respuestas}</font></td> 
                </tr>
                </table>

                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >VI. Decisiones que puede tomar en su trabajo.</font>

                <table width="500" style = {{marginLeft:30}} className="table-bordered ">                        
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo permite que desarrolle nuevas habilidades</font></td>   
                <td width="20%"><font size="1" face="arial"color="black" >{value23.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >En mi trabajo puedo aspirar a un mejor puesto</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value24.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Durante mi jornada de trabajo puedo tomar pausas cuando las necesito</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value25.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Puedo decidir cuánto trabajo realizo durante la jornada laboral</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value26.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value27.Respuestas}</font></td> 
                </tr>
        
                <tr>
                <td width="80%"><font size="1"face="arial"color="black">Puedo cambiar el orden de las actividades que realizo en mi trabajo</font></td>   
                <td width="20%"><font size="1"face="arial"color="black">{value28.Respuestas}</font></td> 
                </tr>
                
                </table>
   
                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >VII.Cualquier tipo de cambio que ocurra en su trabajo</font><br/>
                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >(considere los últimos cambios realizados).	</font>

                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Los cambios que se presentan en mi trabajo dificultan mi labor</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value29.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas o aportaciones</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value30.Respuestas}</font></td> 
                </tr>
                </table>

                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >VIII. capacitación e información que se le proporciona sobre su trabajo.</font>
                
                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Me informan con claridad cuáles son mis funciones</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value31.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Me explican claramente los resultados que debo obtener en mi trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value32.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Me explican claramente los objetivos de mi trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value33.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Me informan con quién puedo resolver problemas o asuntos de trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value34.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Me permiten asistir a capacitaciones relacionadas con mi trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value35.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Recibo capacitación útil para hacer mi trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value36.Respuestas}</font></td> 
                </tr>
                </table>

                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >IX. Jefes con quien tiene contacto.</font>
              
                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Mi jefe ayuda a organizar mejor el trabajo</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value37.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Mi jefe tiene en cuenta mis puntos de vista y opiniones</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value38.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Mi jefe me comunica a tiempo la información relacionada con el trabajo</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value39.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">La orientación que me da mi jefe me ayuda a realizar mejor mi trabajo</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value40.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value41.Respuestas}</font></td> 
                </tr>
                                             
                </table>

                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >X. Relaciones con sus compañeros.</font>
  
                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Puedo confiar en mis compañeros de trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value42.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Entre compañeros solucionamos los problemas de trabajo de forma respetuosa</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value43.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">En mi trabajo me hacen sentir parte del grupo</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value44.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Cuando tenemos que realizar trabajo de equipo los compañeros colaboran</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value45.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Mis compañeros de trabajo me ayudan cuando tengo dificultades</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value46.Respuestas}</font></td> 
                </tr>
                </table>
           
                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >XI. Información que recibe sobre su rendimiento en el trabajo, el reconocimiento</font><br/>
                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >el sentido de pertenencia y la estabilidad que le ofrece su trabajo.</font>
               
                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Me informan sobre lo que hago bien en mi trabajo</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value47.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">La forma como evalúan mi trabajo en mi centro de trabajo me ayuda a mejorar mi desempeño</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value48.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">En mi centro de trabajo me pagan a tiempo mi salario</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value49.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">El pago que recibo es el que merezco por el trabajo que realizo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value50.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Si obtengo los resultados esperados en mi trabajo me recompensan o reconocen</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value51.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Las personas que hacen bien el trabajo pueden crecer laboralmente</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value52.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Considero que mi trabajo es estable</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value53.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">En mi trabajo existe continua rotación de personal</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value54.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Siento orgullo de laborar en este centro de trabajo</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value55.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td  width="80%"><font size="1"face="arial"color="black">Me siento comprometido con mi trabajo</font></td>   
                  <td  width="20%"><font size="1"face="arial"color="black">{value56.Respuestas}</font></td> 
                </tr>
                                             
                </table>
               
                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >XII. Actos de violencia laboral (malos tratos, acoso, hostigamiento, acoso psicológico).</font>
               
                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">En mi trabajo puedo expresarme libremente sin interrupciones</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value57.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Recibo críticas constantes a mi persona y/o trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value58.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value59.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value60.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value61.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value62.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value63.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">He presenciado actos de violencia en mi centro de trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value64.Respuestas}</font></td> 
                </tr>
                                                                              
                </table>

                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >XIII. Atención a clientes y usuarios.</font>
               
                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Atiendo clientes o usuarios muy enojados</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value65.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value66.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Para hacer mi trabajo debo demostrar sentimientos distintos a los míos</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value67.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Mi trabajo me exige atender situaciones de violencia</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value68.Respuestas}</font></td> 
                </tr>
                </table>
               
                <font color="red" style= {{marginTop:40,marginLeft:30}}  size="1" >XIV. Las actitudes de las personas que supervisa.</font>

                <table width="500" style = {{marginLeft:30}} className="table-bordered ">
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Comunican tarde los asuntos de trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value69.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Dificultan el logro de los resultados del trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value70.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Cooperan poco cuando se necesita</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value71.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Ignoran las sugerencias para mejorar su trabajo</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value72.Respuestas}</font></td> 
                </tr>
                </table> 
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
              </div> 
    }

    let reporteEjecutivo;
    if(this.state.valor1[0] && this.state.valor72[0]){
      let celda;
      let criterios;
      let celdaPrev;
      let criteriosPrev;
      let charColor;

      var arr1 = this.state.valor1.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr2 = this.state.valor2.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr3 = this.state.valor3.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr4 = this.state.valor4.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr5 = this.state.valor5.map(function (x) { 
        return parseInt(x, 10); 
      });
      
      var categoriaUno = [];

      for(let i = 0; i < arr1.length; i++){
        categoriaUno[i] =arr1[i]+arr2[i]+arr3[i]+arr4[i]+arr5[i];
      }


      var arr6 = this.state.valor6.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr12 = this.state.valor12.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr7 = this.state.valor7.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr8 = this.state.valor8.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr9 = this.state.valor9.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr10 = this.state.valor10.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr11 = this.state.valor11.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr65 = this.state.valor65.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr66 = this.state.valor66.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr67 = this.state.valor67.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr68 = this.state.valor68.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr13 = this.state.valor13.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr14 = this.state.valor14.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr15 = this.state.valor15.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr16 = this.state.valor16.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr25 = this.state.valor25.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr26 = this.state.valor26.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr27 = this.state.valor27.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr28 = this.state.valor28.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr23 = this.state.valor23.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr24 = this.state.valor24.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr29 = this.state.valor29.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr30 = this.state.valor30.map(function (x) { 
        return parseInt(x, 10); 
      });
      var arr35 = this.state.valor35.map(function (x) { 
        return parseInt(x, 10); 
      });
       var arr36 = this.state.valor36.map(function (x) { 
        return parseInt(x, 10); 
      });

      var categoriaDos = [];
      for(let i = 0; i < arr6.length; i++){
        categoriaDos[i] = arr6[i]+arr12[i]+arr7[i]+arr8[i]+arr9[i]+arr10[i]+arr11[i]+arr65[i]+arr66[i]+arr67[i]+arr68[i]+arr13[i]+arr14[i]+arr15[i]+arr16[i]+arr25[i]+arr26[i]+arr27[i]+arr28[i]+arr23[i]+arr24[i]+arr29[i]+arr30[i]+arr35[i]+arr36[i];

      }
      
      var arr17 = this.state.valor17.map(function (x) { 
      return parseInt(x, 10); 
    });
    var arr18 = this.state.valor18.map(function (x) { 
      return parseInt(x, 10); 
    });
    var arr19 = this.state.valor19.map(function (x) { 
      return parseInt(x, 10); 
    });
    var arr20 = this.state.valor20.map(function (x) { 
      return parseInt(x, 10); 
    });
    var arr21 = this.state.valor21.map(function (x) { 
      return parseInt(x, 10); 
    });
    var arr22 = this.state.valor22.map(function (x) { 
      return parseInt(x, 10); 
    });

    var  categoriaTres = [];
    for(let i = 0; i < arr17.length; i++){
      categoriaTres[i] =arr17[i]+arr18[i]+arr19[i]+arr20[i]+arr21[i]+arr22[i];
    }
   

  var arr31 = this.state.valor31.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr32 = this.state.valor32.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr33 = this.state.valor33.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr34 = this.state.valor34.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr37 = this.state.valor37.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr38 = this.state.valor38.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr39 = this.state.valor39.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr40 = this.state.valor40.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr41 = this.state.valor41.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr42 = this.state.valor42.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr43 = this.state.valor43.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr44 = this.state.valor44.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr45 = this.state.valor45.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr46 = this.state.valor46.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr69 = this.state.valor69.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr70 = this.state.valor70.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr71 = this.state.valor71.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr72 = this.state.valor72.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr57 = this.state.valor57.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr58 = this.state.valor58.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr59 = this.state.valor59.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr60 = this.state.valor60.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr61 = this.state.valor61.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr62 = this.state.valor62.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr63 = this.state.valor63.map(function (x) { 
    return parseInt(x, 10); 
  });
  var arr64 = this.state.valor64.map(function (x) { 
    return parseInt(x, 10); 
  });  



  var categoriaCuatro=[];
  for(let i = 0; i < arr31.length; i++){
    categoriaCuatro[i] =arr31[i]+arr32[i]+arr33[i]+arr34[i]+arr37[i]+arr38[i]+arr39[i]+arr40[i]+arr41[i]+arr42[i]+arr43[i]+arr44[i]+arr45[i]+arr46[i]+arr69[i]+arr70[i]+arr71[i]+arr72[i]+arr57[i]+arr58[i]+arr59[i]+arr60[i]+arr61[i]+arr62[i]+arr63[i]+arr64[i];
  }


var arr47 = this.state.valor47.map(function (x) { 
  return parseInt(x, 10); 
});  
var arr48 = this.state.valor48.map(function (x) { 
  return parseInt(x, 10); 
});  
var arr49 = this.state.valor49.map(function (x) { 
  return parseInt(x, 10); 
});  
var arr50 = this.state.valor50.map(function (x) { 
  return parseInt(x, 10); 
});  
var arr51 = this.state.valor51.map(function (x) { 
  return parseInt(x, 10); 
});  
var arr52 = this.state.valor52.map(function (x) { 
  return parseInt(x, 10); 
});  
var arr55 = this.state.valor55.map(function (x) { 
  return parseInt(x, 10); 
});  
var arr56 = this.state.valor56.map(function (x) { 
  return parseInt(x, 10); 
});  
var arr53 = this.state.valor53.map(function (x) { 
  return parseInt(x, 10); 
});  
var arr54 = this.state.valor54.map(function (x) { 
  return parseInt(x, 10); 
});  


var categoriaCinco=[];
for(let i = 0; i < arr47.length; i++){
  categoriaCinco[i] =arr47[i]+arr48[i]+arr49[i]+arr50[i]+arr51[i]+arr52[i]+arr55[i]+arr56[i]+arr53[i]+arr54[i];
}

 
let totalPonderacion = [];
for(let i = 0; i < categoriaUno.length; i++){
  totalPonderacion[i] = categoriaUno[i] + categoriaDos[i] + categoriaTres[i] + categoriaCuatro [i] + categoriaCinco[i];  
}

console.log("totalPonderacion " , totalPonderacion)

let suma = 0;
totalPonderacion.forEach (function(numero){
    suma += numero;
});
let ponderacionPromedio = (suma/totalPonderacion.length).toFixed(2)

if(ponderacionPromedio<50){
  celda = <TableCell width="10%"  style={{backgroundColor: "#9BE0F7"}} className="text-center"><font size="1" face="arial"color="black" align="justify">NULO O DESPRECIABLE</font></TableCell>
  celdaPrev = <TableCell width="10%"  style={{backgroundColor: "#9BE0F7"}} className="text-center"><font size="3" face="arial"color="black" align="justify">NULO O DESPRECIABLE</font></TableCell>
  
  criterios = <font size="2" face="arial"color="black" align="justify">El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</font>
  criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="3" face="arial"color="black" align="justify">El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</font></TableCell>
  
  }else if(ponderacionPromedio>=50 && ponderacionPromedio < 75){
    celda = <TableCell width="10%" style={{backgroundColor: "#6BF56E"}}  className="text-center"><font size="1" face="arial"color="black" align="justify">BAJO</font></TableCell>
    celdaPrev = <TableCell width="10%" style={{backgroundColor: "#6BF56E"}}  className="text-center"><font size="3" face="arial"color="black" align="justify">BAJO</font></TableCell>
  
    criterios = <font size="2" face="arial"color="black" align="justify">Es necesario una mayor difusión de la política de prevención de riesgos
    psicosociales y programas para: la prevención de los factores de riesgo
    psicosocial, la promoción de un entorno organizacional favorable y la
    prevención de la violencia laboral.</font>
    
    criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="3" face="arial"color="black" align="justify">Es necesario una mayor difusión de la política de prevención de riesgos
    psicosociales y programas para: la prevención de los factores de riesgo
    psicosocial, la promoción de un entorno organizacional favorable y la
    prevención de la violencia laboral.</font></TableCell>
  }else if(ponderacionPromedio>=75 && ponderacionPromedio < 99){
    celda = <TableCell width="10%"  style={{backgroundColor: "#FFFF00"}}  className="text-center"><font size="1" face="arial"color="black" align="justify">MEDIO</font></TableCell>
    celdaPrev = <TableCell width="10%"  style={{backgroundColor: "#FFFF00"}}  className="text-center"><font size="3" face="arial"color="black" align="justify">MEDIO</font></TableCell>
  
    criterios = <font size="2" face="arial"color="black" align="justify">Se requiere revisar la política de prevención de riesgos psicosociales y
    programas para la prevención de los factores de riesgo psicosocial, la
    promoción de un entorno organizacional favorable y la prevención de la
    violencia laboral, así como reforzar su aplicación y difusión, mediante un
    Programa de intervención.</font>
    criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="3" face="arial"color="black" align="justify">Se requiere revisar la política de prevención de riesgos psicosociales y
    programas para la prevención de los factores de riesgo psicosocial, la
    promoción de un entorno organizacional favorable y la prevención de la
    violencia laboral, así como reforzar su aplicación y difusión, mediante un
    Programa de intervención.</font></TableCell>
  
  }else if(ponderacionPromedio>=99 && ponderacionPromedio < 140){
   celda = <TableCell  width="10%" style={{backgroundColor: "#FFC000"}} className="text-center" ><font size="1" face="arial"color="black" align="justify">ALTO</font></TableCell>
   celdaPrev = <TableCell  width="10%" style={{backgroundColor: "#FFC000"}} className="text-center" ><font size="3" face="arial"color="black" align="justify">ALTO</font></TableCell>
  
   criterios =<font size="2" face="arial"color="black" align="justify">Se requiere realizar un análisis de cada categoría y dominio, de manera que
   se puedan determinar las acciones de intervención apropiadas a través de un
   Programa de intervención, que podrá incluir una evaluación específica y
   deberá incluir una campaña de sensibilización, revisar la política de
   prevención de riesgos psicosociales y programas para la prevención de los
   factores de riesgo psicosocial, la promoción de un entorno organizacional
   favorable y la prevención de la violencia laboral, así como reforzar su
   aplicación y difusión.</font>
   
   criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="3" face="arial"color="black" align="justify">Se requiere realizar un análisis de cada categoría y dominio, de manera que
   se puedan determinar las acciones de intervención apropiadas a través de un
   Programa de intervención, que podrá incluir una evaluación específica y
   deberá incluir una campaña de sensibilización, revisar la política de
   prevención de riesgos psicosociales y programas para la prevención de los
   factores de riesgo psicosocial, la promoción de un entorno organizacional
   favorable y la prevención de la violencia laboral, así como reforzar su
   aplicación y difusión.</font></TableCell>
  }
  else if( ponderacionPromedio > 140){
    celda  = <TableCell width="10%"  style={{backgroundColor: "#FF0000"}} className="text-center"><font size="1" face="arial"color="black" align="justify">MUY ALTO</font></TableCell>
    celdaPrev  = <TableCell width="10%"  style={{backgroundColor: "#FF0000"}} className="text-center"><font size="3" face="arial"color="black" align="justify">MUY ALTO</font></TableCell>
   
   criterios= <font size="2" face="arial"color="black" align="justify">Se requiere realizar el análisis de cada categoría y dominio para establecer
    las acciones de intervención apropiadas, mediante un Programa de
    intervención que deberá incluir evaluaciones específicas, y contemplar
    campañas de sensibilización, revisar la política de prevención de riesgos
    psicosociales y programas para la prevención de los factores de riesgo
    psicosocial, la promoción de un entorno organizacional favorable y la
    prevención de la violencia laboral, así como reforzar su aplicación y difusión.</font>
  
    criteriosPrev = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="3" face="arial"color="black" align="justify">Se requiere realizar el análisis de cada categoría y dominio para establecer
    las acciones de intervención apropiadas, mediante un Programa de
    intervención que deberá incluir evaluaciones específicas, y contemplar
    campañas de sensibilización, revisar la política de prevención de riesgos
    psicosociales y programas para la prevención de los factores de riesgo
    psicosocial, la promoción de un entorno organizacional favorable y la
    prevención de la violencia laboral, así como reforzar su aplicación y difusión.</font></TableCell>
  }
    // let sumaCategoria1 = 0;
    // categoriaUno.forEach (function(numero){
    //   sumaCategoria1 += numero;
    // });

    // let suma1 = (sumaCategoria1/categoriaUno.length).toFixed(2);

    // console.log("suma1" , suma1)

    // let sumaCategoria2 = 0;
    // categoriaDos.forEach (function(numero){
    //   sumaCategoria2 += numero;
    // });

    // let suma2 = (sumaCategoria2/categoriaDos.length).toFixed(2);
    // console.log("suma2", suma2)

    // let sumaCategoria3 = 0;
    // categoriaTres.forEach (function(numero){
    //   sumaCategoria3 += numero;
    // });

    // let suma3 = (sumaCategoria3/categoriaTres.length).toFixed(2);
    // console.log("suma3", suma3)
    
    // let sumaCategoria4 = 0;
    // categoriaCuatro.forEach (function(numero){
    //   sumaCategoria4 += numero;
    // });

    // let suma4 = (sumaCategoria4/categoriaCuatro.length).toFixed(2);
    // console.log("suma4", suma4)
     
    // let sumaCategoria5 = 0;
    // categoriaCinco.forEach (function(numero){
    //   sumaCategoria5 += numero;
    // });

    // let suma5 = (sumaCategoria5/categoriaCinco.length).toFixed(2);
    // console.log("suma4", suma5)

    let frecuenciaCategoriaUno1 = 0;
    let frecuenciaCategoriaUno2 = 0;
    let frecuenciaCategoriaUno3 = 0;
    let frecuenciaCategoriaUno4 = 0;
    let frecuenciaCategoriaUno5 = 0;
    let frecuenciaCategoriaDos1 = 0;
    let frecuenciaCategoriaDos2 = 0;
    let frecuenciaCategoriaDos3 = 0;
    let frecuenciaCategoriaDos4 = 0;
    let frecuenciaCategoriaDos5 = 0;
    let frecuenciaCategoriaTres1 = 0;
    let frecuenciaCategoriaTres2 = 0;
    let frecuenciaCategoriaTres3 = 0;
    let frecuenciaCategoriaTres4 = 0;
    let frecuenciaCategoriaTres5 = 0;
    let frecuenciaCategoriaCuatro1= 0;
    let frecuenciaCategoriaCuatro2= 0;
    let frecuenciaCategoriaCuatro3= 0;
    let frecuenciaCategoriaCuatro4= 0;
    let frecuenciaCategoriaCuatro5= 0;
    let frecuenciaCategoriaCinco1= 0;
    let frecuenciaCategoriaCinco2= 0;
    let frecuenciaCategoriaCinco3= 0;
    let frecuenciaCategoriaCinco4= 0;
    let frecuenciaCategoriaCinco5= 0;

    let arrayFinal = [];
    for(let i = 0; i < this.state.empleadosRE.length; i++){
       arrayFinal[i] = [this.state.empleadosRE[i] , categoriaUno[i] , categoriaDos[i] , categoriaTres[i] , categoriaCuatro[i], categoriaCinco[i],totalPonderacion[i]];  
    }

    let increment = 1;

    var LaFecha=new Date();
    var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasem=new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
    var diasemana=LaFecha.getDay();
    var FechaCompleta="";
    var NumeroDeMes="";    
    NumeroDeMes=LaFecha.getMonth();
    FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
    let celdaNombre;
    let celdaAmbiente;

    reporteEjecutivo = 
    <React.Fragment>
    <Alert className ="mt-4" color ="primary ">Reporte ejecutivo del total de empleados</Alert>

    <MDBContainer style={{marginTop:20}}>
      <table>
        <tr>
          <td width="33%">
          <MDBBtn   gradient="purple" size="md" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
          Descargar reporte ejecutivo
          </MDBBtn>
          </td>
          <td>

          </td>
          <td width="33%">
          <font  face="arial" className = "mt-4" ><strong> EVALUACIÓN RP. </strong><br/><strong>FILTRADO POR: <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;  {this.state.filtro2} &nbsp;&nbsp; {this.state.filtro3} &nbsp;&nbsp;{this.state.filtro4} &nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp; {this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></strong><br/><strong>{localStorage.getItem("razonsocial")}</strong> </font>
          </td>
          <td width="34%">
          <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100}}/> 
          </td>
          <td>{botonCerrar}</td>
        </tr>
      </table>


    </MDBContainer>
        <MDBContainer >
          <Table   responsive small borderless className="text-left mt-4 ">
          <TableHead>
          <TableRow>
            <TableCell  width="13%" style={{backgroundColor: "#E6E7E8"}}>PUNTAJE PROMEDIO</TableCell>
              {celdaPrev}
            <TableCell width="6%"  > <strong>   TOTAL {ponderacionPromedio}  PUNTOS </strong></TableCell>
            <TableCell width="2%" ></TableCell>
            <TableCell width="1%"  ></TableCell>
              {criteriosPrev}
          </TableRow>
          </TableHead>
          </Table>
        </MDBContainer>
        <br/>

    <TableContainer component={Paper} style={{marginBottom:30}}>
      <Table  size="small">
    
        <TableBody>
            <TableRow>
            <TableCell width="5%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>#</strong></TableCell> 
              <TableCell width="30%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Nombre</strong></TableCell> 
              <TableCell width="11%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Ambiente de Trabajo</strong></TableCell>              
              <TableCell width="11%"component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Factores Propios</strong></TableCell>              
              <TableCell width="11%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Organización del tiempo</strong></TableCell>              
              <TableCell width="11%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Liderazgo</strong></TableCell>   
              <TableCell width="11%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong> Entorno organizacional</strong></TableCell>
              <TableCell width="10%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Total</strong></TableCell>              

            </TableRow>
            {arrayFinal.map(rows=>{
              let fila1;
              let fila2;
              let fila3;
              let fila4;
              let fila5;
              let fila6;
          

              if(rows[1] < 5){
                fila1 = <td style={{backgroundColor: "#9BE0F7"}}>
                    <font size="2" face="arial"color="black">
                    {rows[1]}
                    </font>
                  </td>
              }else if(rows[1] >= 5 && rows[1] < 9){                                                     
                  fila1 = <td style={{backgroundColor: "#6BF56E"}}>
                    <font size="2" face="arial"color="black">
                    {rows[1]}
                    </font>
                  </td>
              }else if(rows[1] >= 9 && rows[1] < 11){
                  fila1 = <td style={{backgroundColor: "#FFFF00"}}>
                      <font size="2" face="arial"color="black">
                      {rows[1]}
                      </font>
                    </td>
              }else if(rows[1] >= 11 && rows[1] < 14){
                  fila1 = <td style={{backgroundColor: "#FFC000"}}>
                      <font size="2" face="arial"color="black">
                      {rows[1]}
                      </font>
                    </td>
              }else if(rows[1] >= 14){
                    fila1 = <td  style={{backgroundColor: "#FF0000"}} >
                      <font size="2" face="arial"color="black">
                      {rows[1]}
                      </font>
                    </td>
              }

              if(rows[2] < 15){
                fila2 = <td style={{backgroundColor: "#9BE0F7"}}>
                <font size="2" face="arial"color="black">
                {rows[2]}
                </font>
                </td>
              }else if(rows[2] >= 15 && rows[2] < 30){
                fila2 = <td style={{backgroundColor: "#6BF56E"}}>
                <font size="2" face="arial"color="black">
                {rows[2]}
                </font>
                </td>
              }else if(rows[2] >=30 && rows[2] < 45){
                fila2 = <td style={{backgroundColor: "#FFFF00"}}>
                <font size="2" face="arial"color="black">
                {rows[2]}
                </font>
                </td>
              }else if(rows[2] >=45 && rows[2] < 60){
                fila2 = <td style={{backgroundColor: "#FFC000"}}>
                <font size="2" face="arial"color="black">
                {rows[2]}
                </font>
                </td>
              }else if(rows[2] >= 60){
                fila2 = <td style={{backgroundColor: "#FF0000"}}>
                <font size="2" face="arial"color="black">
                {rows[2]}
                </font>
                </td>
              }

            if(rows[3] < 5){
              fila3 = 
              <td style={{backgroundColor: "#9BE0F7"}}>
                <font size="2" face="arial"color="black">
                  {rows[3]}
                </font>
              </td>
            }else if(rows[3] >= 5 && rows[3] < 7){
              fila3 = 
              <td style={{backgroundColor: "#6BF56E"}}>
                <font size="2" face="arial"color="black">
                  {rows[3]}
                </font>
              </td>
            }else if(rows[3] >=7 && rows[3] < 10){
              fila3 = 
              <td style={{backgroundColor: "#FFFF00"}}>
                <font size="2" face="arial"color="black">
                  {rows[3]}
                </font>
              </td>
            }else if(rows[3] >=10 && rows[3] < 13){
              fila3 = 
              <td style={{backgroundColor: "#FFC000"}}>
                <font size="2" face="arial"color="black">
                  {rows[3]}
                </font>
              </td>
            }else if(rows[3] >= 13){
              fila3 = 
              <td style={{backgroundColor: "#FF0000"}}>
                <font size="2" face="arial"color="black">
                  {rows[3]}
                </font>
              </td>
            }

            if(rows[4]  < 14){
              fila4 = 
              <td style={{backgroundColor: "#9BE0F7"}}>
                <font size="2" face="arial"color="black">
                  {rows[4]}
                </font>
              </td>
            }else if(rows[4] >= 14 && rows[4] < 29){
              fila4 = 
              <td style={{backgroundColor: "#6BF56E"}}>
                <font size="2" face="arial"color="black">
                  {rows[4]}
                </font>
              </td>
            }else if(rows[4] >=29 && rows[4] < 42){
              fila4 = 
              <td style={{backgroundColor: "#FFFF00"}}>
                <font size="2" face="arial"color="black">
                  {rows[4]}
                </font>
              </td>
            }else if(rows[4] >=42 && rows[4] < 58){
              fila4 = 
              <td style={{backgroundColor: "#FFC000"}}>
                <font size="2" face="arial"color="black">
                  {rows[4]}
                </font>
              </td>
            }else if(rows[4] >= 58){
              fila4 = 
              <td style={{backgroundColor: "#FF0000"}}>
                <font size="2" face="arial"color="black">
                  {rows[4]}
                </font>
              </td>   
            }
            if(rows[5]  < 10){
              fila5 = 
              <td style={{backgroundColor: "#9BE0F7"}}>
                <font size="2" face="arial"color="black">
                  {rows[5]}
                </font>
              </td>
            }else if(rows[5] >= 10 && rows[5] < 14){
              fila5 = 
              <td style={{backgroundColor: "#6BF56E"}}>
                <font size="2" face="arial"color="black">
                  {rows[5]}
                </font>
              </td>
            }else if(rows[5] >=14 && rows[5] < 18){
              fila5 = 
              <td style={{backgroundColor: "#FFFF00"}}>
                <font size="2" face="arial"color="black">
                  {rows[5]}
                </font>
              </td>
            }else if(rows[5] >=18 && rows[5] < 23){
              fila5 = 
              <td style={{backgroundColor: "#FFC000"}}>
                <font size="2" face="arial"color="black">
                  {rows[5]}
                </font>
              </td>
            }else if(rows[5] >= 23){
              fila5 = 
              <td style={{backgroundColor: "#FF0000"}}>
                <font size="2" face="arial"color="black">
                  {rows[5]}
                </font>
              </td>   
            }

              if(rows[6]<50){
                fila6 = 
                <td style={{backgroundColor: "#9BE0F7"}}>
                  <font size="2" face="arial"color="black">
                    {rows[6]}
                  </font>
                </td>    
              }
              else if(rows[6]>=50 && rows[6] <75){
                fila6 = 
                <td style={{backgroundColor: "#6BF56E"}}>
                  <font size="2" face="arial"color="black">
                    {rows[6]}
                  </font>
                </td> 
              }else if(rows[6]>=75 && rows[6] < 99){
                fila6 = 
                <td style={{backgroundColor: "#FFFF00"}}>
                  <font size="2" face="arial"color="black">
                    {rows[6]}
                  </font>
                </td> 
              }else if(rows[6]>=99 && rows[6] < 140){
                fila6 = 
                <td style={{backgroundColor: "#FFC000"}}>
                  <font size="2" face="arial"color="black">
                    {rows[6]}
                  </font>
                </td> 
              }
              else if( rows[6] >= 140){
                fila6 = 
                <td style={{backgroundColor: "#FF0000"}}>
                  <font size="2" face="arial"color="black">
                    {rows[6]}
                  </font>
                </td> 
            } 
              return(
                    <tr>
                      <td><font size="2" face="arial"color="black" >{increment++}</font></td>
                      <td  className = "text-left"><font size="2" face="arial"color="black" >{rows[0]}</font></td>
                        {fila1}
                        {fila2}
                        {fila3}
                        {fila4}
                        {fila5}
                        {fila6}
                    </tr>
              )

            })}  
            {/* <TableCell component="th" scope="row" >
            {this.state.empleadosRE.map(rows=>{
              return(
                <tr>{rows}</tr>                          
              )
            })}
            </TableCell>   
            <TableCell component="th" scope="row" align="center">
            {categoriaUno.map(filas=>{  

              return(
                <tr>{filas}</tr>     
              )  
            })} 
            </TableCell>
            <TableCell component="th" scope="row" align="center">
            {categoriaDos.map(filas=>{  
              return(
                <tr>{filas}</tr>     
              )  
            })} 
            </TableCell>
            <TableCell component="th" scope="row" align="center">
            {categoriaTres.map(filas=>{  
              return(
                <tr>{filas}</tr>     
              )  
            })} 
            </TableCell>
            <TableCell component="th" scope="row" align="center">
             {categoriaCuatro.map(filas=>{  
              return(
                <tr>{filas}</tr>     
              )  
            })} 
            </TableCell>
            <TableCell component="th" scope="row" align="center">
             {categoriaCinco.map(filas=>{  
              return(
                <tr>{filas}</tr>     
              )  
            })} 
            </TableCell>
            <TableCell component="th" scope="row" align="center">
             {totalPonderacion.map(filas=>{  
              return(
                <tr>{filas}</tr>     
              )  
            })} 
            </TableCell> */}
                   
        </TableBody>
      </Table>

    </TableContainer>              
           <div>
                <div className="example-config">
                  
                </div>
                 {/*   */}

                <div style={{ position: "absolute", left: "-1000px", top: 0 }}>
                    <PDFExport
                        paperSize="letter"
                        margin="1cm"
                        pageNum
                        pageTemplate={PageTemplate}
                        forcePageBreak=".page-break"
                        fileName={`Reporte ejecutivo ${new Date().getFullYear()}`}
                        ref={(component) => this.pdfExportComponent = component}
                    >
                        <div style={{ width: "500px" }}>                                          
                            <img src={logo} alt="logo" style = {{width:550,marginTop:30}}/>
                            <MDBRow > 
                            <MDBCol>                                  
                            {/* <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,marginLeft:230,heigth:20}}/> */}
                            </MDBCol> 
                            </MDBRow>   
                            <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left ">
                              
                            <MDBTableBody>  
                            <br/>     
                            <font size="2"face="arial"color="black"><strong> {localStorage.getItem("razonsocial")} </strong></font><br></br>          
                            <br></br>
                            <font size="1"face="arial"color="black"><strong>Reporte Ejecutivo Global | identificación y análisis de los factores de riesgo psicosocial y evaluacion del entorno organizacional</strong></font><br></br>
                            <br></br>
                            <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>

                            <br></br><br/>
                            <font size="1"face="arial"color="black">Total de evaluaciones consideradas : {this.state.empleadosRE.length}</font><br></br><br></br>

                            <br/><font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>

                            <br></br><br/><br></br><br/>
                            <center><font size="1"face="arial"color="red"><strong>diagnostico035.com</strong></font></center>
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

                                <div style={{marginLeft:"2%"}} >
                                <p  className ="text-center"><strong>GUÍA DE REFERENCIA III  <br/>IDENTIFICACIÓN Y ANÁLISIS DE LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUACIÓN DEL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO </strong> </p>

                                  </div> 
                                  <br/>

                                  <MDBTable bordless style={{marginLeft:"5%",marginTop:"2%"}}>
                                  <MDBTableBody>
                                  <tr>
                                    <td width="30%"><font size="1" face="arial"color="black"><strong>{localStorage.getItem("razonsocial")}</strong></font></td>
                                    <td width="14%"><font size="1" face="arial"color="black"><strong>{this.state.nombre3}</strong></font></td>
                                    <td width="14%"><font size="1" face="arial"color="black"><strong>{this.state.nombre4}</strong></font></td>
                                    <td width="14%"><font size="1" face="arial"color="black"><strong>{this.state.nombre5}</strong></font></td>
                                    <td width="14%"><font size="1" face="arial"color="black"><strong>{this.state.nombre6}</strong></font></td>
                                    <td width="14%"><font size="1" face="arial"color="black"><strong>{this.state.nombre7}</strong></font></td>
                                  </tr> 
                                  </MDBTableBody>
                                  </MDBTable>

                                  <MDBTable style={{marginLeft:"5%"}}   large bordered  className="text-center">
                                  <MDBTableBody>  
                               
                                  <tr >                              
                                  <td width = "32%"><font size="1" face="arial"color="#283747" ><strong>Puntaje Promedio:</strong></font></td>
                                  <td width = "13%" className="text-left"><font size="1" face="arial"color="#273746"><strong>   {ponderacionPromedio}</strong></font></td>
                                  <td width = "30%"><font size="1" face="arial"color="#283747"><strong> Nivel de riesgo:</strong></font></td>
                                   {celda}                                  
                                  </tr>   
                                  </MDBTableBody>                                              
                                  </MDBTable>
                                  <Table style={{marginLeft:"5%"}}  responsive small bordless  className="text-left">
                                  <tr >                              
                                  <td width="100%"><font size="2" face="arial"color="black" ><strong>Necesidad de la acción : </strong></font></td>                                
                                 
                                  </tr>
                                  <tr>
                                    <td width="100%"><font size="1" face="arial"color="black" >{criterios}</font></td>
                                  </tr>
                                  </Table>
                                 <br/>
                                <table width="500" className="table-bordered" style={{marginLeft:"5%"}}>
                             
                                  <tr >
                                    <th width="8%" scope="col"><p  style={{fontSize:"6px"}}><strong>#</strong></p></th>
                                    <th width="40%" scope="col"><p style={{fontSize:"6px"}}><strong >Nombre</strong></p></th>
                                    <th width="10%"  scope="col"><p style={{fontSize:"6px"}}><strong>Ambiente de T.</strong></p></th>
                                    <th width="8%" scope="col"><p style={{fontSize:"6px"}}><strong >Factores P.</strong></p></th>
                                    <th width="10%" scope="col"><p style={{fontSize:"6px"}}><strong >Organización</strong></p></th>
                                    <th width="8%" scope="col"><p style={{fontSize:"6px"}}><strong>Liderazgo</strong></p></th>
                                    <th width="8%" scope="col"><p style={{fontSize:"6px"}}><strong>Entorno O.</strong></p></th>
                                    <th width="8%"scope="col"><p  style={{fontSize:"6px"}}><strong>Total</strong></p></th>
                                  </tr>
                              
                                {arrayFinal.map(rows=>{
                                  let fila1;
                                  let fila2;
                                  let fila3;
                                  let fila4;
                                  let fila5;
                                  let fila6;
                             

                                  if(rows[1] < 5){
                                    fila1 = <td style={{backgroundColor: "#9BE0F7"}}>
                                       <font size="1" face="arial"color="black">
                                       {rows[1]}
                                       </font>
                                     </td>
                                     frecuenciaCategoriaUno1++;
                                 }else if(rows[1] >= 5 && rows[1] < 9){                                                     
                                     fila1 = <td style={{backgroundColor: "#6BF56E"}}>
                                       <font size="1" face="arial"color="black">
                                       {rows[1]}
                                       </font>
                                     </td>
                                     frecuenciaCategoriaUno2++;
                                 }else if(rows[1] >= 9 && rows[1] < 11){
                                      fila1 = <td style={{backgroundColor: "#FFFF00"}}>
                                         <font size="1" face="arial"color="black">
                                         {rows[1]}
                                         </font>
                                       </td>
                                       frecuenciaCategoriaUno3++;
                                 }else if(rows[1] >= 11 && rows[1] < 14){
                                      fila1 = <td style={{backgroundColor: "#FFC000"}}>
                                         <font size="1" face="arial"color="black">
                                         {rows[1]}
                                         </font>
                                       </td>
                                       frecuenciaCategoriaUno4++;
                                 }else if(rows[1] >= 14){
                                       fila1 = <td  style={{backgroundColor: "#FF0000"}} >
                                         <font size="1" face="arial"color="black">
                                         {rows[1]}
                                         </font>
                                       </td>
                                       frecuenciaCategoriaUno5++;
                                 }

                                  if(rows[2] < 15){
                                    fila2 = <td style={{backgroundColor: "#9BE0F7"}}>
                                    <font size="1" face="arial"color="black">
                                    {rows[2]}
                                    </font>
                                    </td>
                                    frecuenciaCategoriaDos1++;
                                  }else if(rows[2] >= 15 && rows[2] < 30){
                                    fila2 = <td style={{backgroundColor: "#6BF56E"}}>
                                    <font size="1" face="arial"color="black">
                                    {rows[2]}
                                    </font>
                                    </td>
                                    frecuenciaCategoriaDos2++;
                                  }else if(rows[2] >=30 && rows[2] < 45){
                                    fila2 = <td style={{backgroundColor: "#FFFF00"}}>
                                    <font size="1" face="arial"color="black">
                                    {rows[2]}
                                    </font>
                                    </td>
                                    frecuenciaCategoriaDos3++;
                                  }else if(rows[2] >=45 && rows[2] < 60){
                                    fila2 = <td style={{backgroundColor: "#FFC000"}}>
                                    <font size="1" face="arial"color="black">
                                    {rows[2]}
                                    </font>
                                    </td>
                                    frecuenciaCategoriaDos4++;
                                  }else if(rows[2] >= 60){
                                    fila2 = <td style={{backgroundColor: "#FF0000"}}>
                                    <font size="1" face="arial"color="black">
                                    {rows[2]}
                                    </font>
                                    </td>
                                    frecuenciaCategoriaDos5++;
                                  }

                                if(rows[3] < 5){
                                  fila3 = 
                                  <td style={{backgroundColor: "#9BE0F7"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[3]}
                                    </font>
                                  </td>
                                  frecuenciaCategoriaTres1++;
                                }else if(rows[3] >= 5 && rows[3] < 7){
                                  fila3 = 
                                  <td style={{backgroundColor: "#6BF56E"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[3]}
                                    </font>
                                  </td>
                                  frecuenciaCategoriaTres2++;
                                }else if(rows[3] >=7 && rows[3] < 10){
                                  fila3 = 
                                  <td style={{backgroundColor: "#FFFF00"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[3]}
                                    </font>
                                  </td>
                                  frecuenciaCategoriaTres3++;
                                }else if(rows[3] >=10 && rows[3] < 13){
                                  fila3 = 
                                  <td style={{backgroundColor: "#FFC000"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[3]}
                                    </font>
                                  </td>
                                  frecuenciaCategoriaTres4++;
                                }else if(rows[3] >= 13){
                                  fila3 = 
                                  <td style={{backgroundColor: "#FF0000"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[3]}
                                    </font>
                                  </td>
                                  frecuenciaCategoriaTres5++;
                                }

                                if(rows[4]  < 14){
                                  fila4 = 
                                  <td style={{backgroundColor: "#9BE0F7"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[4]}
                                    </font>
                                  </td>
                                  frecuenciaCategoriaCuatro1++;
                                }else if(rows[4] >= 14 && rows[4] < 29){
                                  fila4 = 
                                  <td style={{backgroundColor: "#6BF56E"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[4]}
                                    </font>
                                  </td>
                                   frecuenciaCategoriaCuatro2++;
                                }else if(rows[4] >=29 && rows[4] < 42){
                                  fila4 = 
                                  <td style={{backgroundColor: "#FFFF00"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[4]}
                                    </font>
                                  </td>
                                   frecuenciaCategoriaCuatro3++;
                                }else if(rows[4] >=42 && rows[4] < 58){
                                  fila4 = 
                                  <td style={{backgroundColor: "#FFC000"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[4]}
                                    </font>
                                  </td>
                                   frecuenciaCategoriaCuatro4++;
                                }else if(rows[4] >= 58){
                                  fila4 = 
                                  <td style={{backgroundColor: "#FF0000"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[4]}
                                    </font>
                                  </td>   
                                   frecuenciaCategoriaCuatro5++;  
                                }

                                
                                if(rows[5]  < 10){
                                  fila5 = 
                                  <td style={{backgroundColor: "#9BE0F7"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[5]}
                                    </font>
                                  </td>
                                  frecuenciaCategoriaCinco1++;
                                }else if(rows[5] >= 10 && rows[5] < 14){
                                  fila5 = 
                                  <td style={{backgroundColor: "#6BF56E"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[5]}
                                    </font>
                                  </td>
                                   frecuenciaCategoriaCinco2++;
                                }else if(rows[5] >=14 && rows[5] < 18){
                                  fila5 = 
                                  <td style={{backgroundColor: "#FFFF00"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[5]}
                                    </font>
                                  </td>
                                   frecuenciaCategoriaCinco3++;
                                }else if(rows[5] >=18 && rows[5] < 23){
                                  fila5 = 
                                  <td style={{backgroundColor: "#FFC000"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[5]}
                                    </font>
                                  </td>
                                   frecuenciaCategoriaCinco4++;
                                }else if(rows[5] >= 23){
                                  fila5 = 
                                  <td style={{backgroundColor: "#FF0000"}}>
                                    <font size="1" face="arial"color="black">
                                      {rows[5]}
                                    </font>
                                  </td>   
                                   frecuenciaCategoriaCinco5++;  
                                }

                                  if(rows[6]<50){
                                    fila6 = 
                                    <td style={{backgroundColor: "#9BE0F7"}}>
                                      <font size="1" face="arial"color="black">
                                        {rows[6]}
                                      </font>
                                    </td>    
                                  }
                                  else if(rows[6]>=50 && rows[6] <75){
                                    fila6 = 
                                    <td style={{backgroundColor: "#6BF56E"}}>
                                      <font size="1" face="arial"color="black">
                                        {rows[6]}
                                      </font>
                                    </td> 
                                  }else if(rows[6]>=75 && rows[6] < 99){
                                    fila6 = 
                                    <td style={{backgroundColor: "#FFFF00"}}>
                                      <font size="1" face="arial"color="black">
                                        {rows[6]}
                                      </font>
                                    </td> 
                                  }else if(rows[6]>=99 && rows[6] < 140){
                                    fila6 = 
                                    <td style={{backgroundColor: "#FFC000"}}>
                                      <font size="1" face="arial"color="black">
                                        {rows[6]}
                                      </font>
                                    </td> 
                                  }
                                  else if( rows[6] >= 140){
                                    fila6 = 
                                    <td style={{backgroundColor: "#FF0000"}}>
                                      <font size="1" face="arial"color="black">
                                        {rows[6]}
                                      </font>
                                    </td> 
                                } 


                                  return(
                                      <tbody>
                                        <tr>
                                          <th scope="row"><font size="1" face="arial"color="black" >{increment++}</font></th>
                                          <td  width="40%"  className = "text-left"><font size="1" face="arial"color="black" >{rows[0]}</font></td>
                                           {fila1}
                                           {fila2}
                                           {fila3}
                                           {fila4}
                                           {fila5}
                                           {fila6}
                                        </tr>
                                      </tbody>                     
                                  )

                                })}

                                </table>
                                <br/>
                                <p style={{marginLeft:"5%"}}><font size="1" face="arial"color="black" >FRECUENCIA</font></p>
                                <table with="500" className=" table-bordered" style={{marginLeft:"5%"}}>
                                
                                    <tr>
                                      <td width="10%" scope="col"></td>
                                      <td width="40%" scope="col"><font size="1" face="arial"color="black" >Ponderaciones</font></td>
                                      <td width="10%"style={{backgroundColor: "#9BE0F7"}} scope="col"><font size="1" face="arial"color="black" >Nulo</font></td>
                                      <td width="10%"style={{backgroundColor: "#6BF56E"}} scope="col"><font size="1" face="arial"color="black" >Bajo</font></td>
                                      <td width="10%"style={{backgroundColor: "#FFFF00"}} scope="col"><font size="1" face="arial"color="black" >Medio</font></td>
                                      <td width="10%"style={{backgroundColor: "#FFC000"}} scope="col"><font size="1" face="arial"color="black" >Alto</font></td>
                                      <td width="10%"style={{backgroundColor: "#FF0000"}} scope="col"><font size="1" face="arial"color="black" >Muy Alto</font></td>
                                    </tr>
                                 
                                  <tbody>
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >1</font></td>
                                    <td><font size="1" face="arial"color="black" >Ambiente de Trabajo</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaUno1}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaUno2}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaUno3}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaUno4}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaUno5}</font></td>
                                    </tr>
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >2</font></td>
                                    <td><font size="1" face="arial"color="black" >Factores Propios</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaDos1}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaDos2}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaDos3}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaDos4}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaDos5}</font></td>
                                    </tr>
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >3</font></td>
                                    <td><font size="1" face="arial"color="black" >Organizacion</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaTres1}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaTres2}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaTres3}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaTres4}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaTres5}</font></td>
                                    </tr>
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >4</font></td>
                                    <td><font size="1" face="arial"color="black" >Liderazgo</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaCuatro1}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaCuatro2}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaCuatro3}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaCuatro4}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaCuatro5}</font></td>
                                    </tr>
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >5</font></td>
                                    <td><font size="1" face="arial"color="black" >Entorno Organizacional</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaCinco1}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaCinco2}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaCinco3}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaCinco4}</font></td>
                                    <td><font size="1" face="arial"color="black" >{frecuenciaCategoriaCinco5}</font></td>
                                    </tr>
                                  </tbody>
                                </table>
                                <td>
                                 
                                 </td>
                             
                        </div>
                    </PDFExport>
                </div>
            </div>
  
          </React.Fragment>


}
 
    return (
      <React.Fragment>
      <div>
          <Navbar/>
         <div
        
        style={{
          marginLeft: "5%",
          position: "absolute"
        }}
      >
        <div style={{ height: "110%"}}>
          <Grow in={true}>
            <div style={{ margin: "60px 56px" }}>
            <ReactFusioncharts
              type="pie3d"
              width="100%"
              height="80%"
              dataFormat="JSON"
              dataSource={dataSource}
            />{spinner}
              <MUIDataTable
                title={`Resultados EEO`}
                data={data}
                columns={columns}
                options={options}
              />
              <MDBRow style={{marginTop:20}}>
              {botonResultadosGlobales}
              {spinner}
             { PDFRespuestasMasivos}
              {PDFResultadosMasivos}
              </MDBRow>
              {ponderacion}
              {ponderacionIndividual}
              {pdfView1}
              {reporteEjecutivo}
            </div> 
          </Grow>  
        </div> 
      </div>
      </div>
      </React.Fragment>
      
    )
  }
}
