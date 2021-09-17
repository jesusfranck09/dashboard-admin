
import React, { PureComponent } from "react";
import MUIDataTable from "mui-datatables";
import Grow from "@material-ui/core/Grow";
import {MDBRow,MDBCol,MDBBtn, MDBContainer,MDBTableHead,MDBCard ,MDBCardBody,MDBCardHeader,MDBTable, MDBCardTitle,MDBTableBody} from 'mdbreact';
import logo from '../images/logo.png'
import diagnostico from '../images/diagnostico.png'
import { API} from '../utils/http'
import {Spinner,Button as BotonReactstrap} from 'react-bootstrap'
import { Bar } from "react-chartjs-2";
import '../Home/index.css'
import Button from '@material-ui/core/Button';
import { DialogUtility } from '@syncfusion/ej2-popups';
import Modal from 'react-modal';
// import PDF from '../PDF/index'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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


class App extends React.Component {
pdfExportComponent ;
  constructor(props) {
    super(props);
    this.state = {
      datos:[],
      empleados:[],
      getPonderacion:[],
      datosGlobales:[],
      peticion1:[],
      resultados:[],
      resultadosEvaluacion:[],
      resultadosQueryMasivo:[],
      resultadosEvaluacionMasivo:[],
      resultadosQuery:[],
      reporteImasivo:[],
      reporteEjecutivo:[],
      resultadosInicio:[],
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
      datosLength:'',
      botonResultados:'1',
      botonDisabled:'1',
      collapse: false,
      isOpen: false,
      showModal2: false,  
      spinner:false,
      empleadosRE:[],
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
      date:'',
      tablaPeriodoActual:true,
      reporteIndividual:false,
      reporteResultadosIndividual:false,
      todosLosPeriodos:[],
      dropdown:null,
      reporteResultadosGlobales:false,
      reporteEjecutivos:false,
      tablaPeriodoSeleccionado:true,
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
      // console.log("ya se esta montando")
      this.getGlobalEmployees()
    }

    ponderacionTotal ( ){

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
    position: "fixed",
  })
  }

  ads(){
    this.setState({showModal2:true}) 
  }
  getGlobalEmployees = async( ) => {
    this.setState({spinner:true})
    let resultadosQuery=[];
    let totalEmpleados=[]
    var id  =localStorage.getItem("idAdmin")  
    let resultadosEvaluacion=[];     
    let periodo =  localStorage.getItem("periodo")
    var datasort;
    let arrayFilter;
    let evaluacionesRealizadasPeriodoActual;
    let evaluacionRP;
    let result;

    // const url = 'http://localhost:8000/graphql'
    await axios({
      url:  API,
      method:'post',
      data:{
      query:`
       query{
        getallPeriodo(data:"${[id]}"){
         Descripcion
         EventoActivo
              }
            }
          `
      }
    })
    .then(datos => {	
      this.setState({todosLosPeriodos:datos.data.data.getallPeriodo})
    }).catch(err=>{
    })

    axios({
      url:  API,
      method:'post',
      data:{
      query:`
       query{
            getEmployeesPerido(data:"${[id]}"){
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
      evaluacionRP= evaluacionesRealizadasPeriodoActual.filter(function(hero){
        return hero.encuesta === "RP"
      })
      this.setState({evaluacionesTodosLosPeriodos:evaluacionRP}) 

      evaluacionRP.map(rows=>{
        axios({
        url:  API,
        method:'post',
        data:{
        query:`
          query{
            getresultGlobalSurveyRP(data:"${[rows.id,rows.periodo]}"){
            id 
            Respuestas 
            fk_preguntasRP
            fk_empleadosRP 
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
            Periodo
                }
              }
            `
        }
        }).then(datos => {              
          totalEmpleados.push(datos.data.data.getresultGlobalSurveyRP);  
          this.setState({resultadosInicio:totalEmpleados});
        })
        .catch(err => {
        }); 
          
        axios({
        url:  API,
        method:'post',
        data:{
        query:`
          query{
          resultSingleSurveyRP(data:"${[rows.id,rows.periodo]}"){
            id 
            Respuestas 
            fk_preguntasRP
            fk_empleadosRP
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
            Periodo
                }
              }
            `
        }
        }).then(datos => {     
          resultadosEvaluacion.push(datos.data.data.resultSingleSurveyRP )
          this.setState({evaluacionMasivoResultados : resultadosEvaluacion}) 
          resultadosQuery.push(datos.data.data.resultSingleSurveyRP )
          this.setState({resultadosQueryMasivo : resultadosQuery})   
          if(this.state.evaluacionMasivoResultados.length == this.state.empleados.length){
          }    
          })
        .catch(err => {
          console.log("el error es  ",err.response)
        });    
      })
      result = evaluacionRP.filter(function(hero){
        return hero.periodo === periodo 
      })
      this.setState({empleados:result}) 
      })
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
          query{
          getPonderacion(data:"${[id]}"){
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
          this.setState({getPonderacion: datos.data.data.getPonderacion})
          //  console.log("ponderaciones",datos.data.data.getPonderacion)
        })
        .catch(err => {
          console.log("el error es  ",err.response)
        }); 
        this.setState({spinner:false})

     }

     async cargarTablaPeriodoSeleccionado (parametro){
      let periodo = parametro
      let empleados  = this.state.evaluacionesTodosLosPeriodos; 
      let arrayFilter = empleados.filter(e => e.periodo == periodo)
      await  this.setState({empleados:[]})
      this.setState({tablaPeriodoActual:false})            
      this.setState({tablaPeriodoSeleccionado:true})
      this.setState({empleados:arrayFilter})
      this.setState({reporteEjecutivos:false})
      this.setState({reporteResultadosIndividual:false})
      this.setState({reporteResultadosGlobales:false})
      this.setState({reporteIndividual:false})
    }


     consultarDatosFiltrados = async (datos,filtro,periodoTabla) =>{
      this.setState({spinner:true})
      this.setState({reporteIndividual:false})
      this.setState({tablaPeriodoActual:false})
      this.setState({reporteResultadosIndividual:false})
      this.setState({reporteResultadosGlobales:true})
      this.setState({reporteEjecutivos:false})
      this.setState({reporteIndividual:false})
      this.setState({tablaPeriodoSeleccionado:false})
      this.setState({botonDisabled:''})
      this.setState({botonResultados:''})
      
      let array=[];
      let totalEmpleados=[];

      datos.map(rows=>{
        array.push(rows.data[0])
      })

      let arrayFilter = []
      let filter;
      let filterArray;
      let filtrado = [];

       this.state.resultadosInicio.forEach(row=>{
           array.forEach(element => {
            filter  = row.filter(function(hero){
              return hero.fk_empleadosRP === element
            })
              arrayFilter.push(filter)
            //  console.log("arrayFilter" , element)
            }); 
      })
    

      arrayFilter.map(row=>{
        filterArray = row.filter(function(hero){
          return hero.Periodo === periodoTabla[0]
        })
        filtrado.push(filterArray)
        })

        function array_equals(a, b){
          return a.length === b.length && a.every((item,idx) => item === b[idx])
         }
         let tag = []
       var filtrado2 = filtrado.filter(item => !array_equals(item, tag))
      this.setState({peticion1:filtrado2}) 
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
          this.setState({filtro3:"CENTRO DE TRABAJO"})
          this.setState({filtro6:""})
        }else{
          this.setState({nombre3:''})
          this.setState({filtro3:""})
          this.setState({filtro6:""})
        }
        if(filtro[3].length>0){
          this.setState({nombre4:filtro[3][0]})
          this.setState({filtro4:"PERIODO"})
          this.setState({filtro6:""})
        }else{
          this.setState({nombre4:''})
          this.setState({filtro4:""})
          this.setState({filtro6:""})
        }
      }else{
        this.setState({filtro6:"SIN FILTRO"})
      }
     
    this.setState({datosLength:datos.length})
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    reporteImasivo = async (datos,filtro,periodoTabla) =>{
      this.setState({botonDisabled:''})
      this.setState({botonResultados:''})
      this.setState({spinner:true})

      let array=[];
      let totalEmpleados=[];
      datos.map(rows=>{
        array.push(rows.data[0])
      })

      let arrayFilter = []
      let filter;
      let filterArray;
      let filtrado = [];

      // console.log("array" , array)
      this.state.resultadosInicio.forEach(row=>{
        array.forEach(rows=>{
        filter =row.filter(function(hero){
          // console.log("rows" , hero)

          return hero.fk_empleadosRP === rows
        })
          arrayFilter.push(filter)
        })
      })
      
      arrayFilter.map(fila=>{
        filterArray = fila.filter(function(hero){
          return hero.Periodo === periodoTabla[0]
        })
          filtrado.push(filterArray)
        })

      function array_equals(a, b){
        return a.length === b.length && a.every((item,idx) => item === b[idx])
      }
      let tag = []
      var filtrado2 = filtrado.filter(item => !array_equals(item, tag))

        this.setState({reporteImasivo:filtrado2})
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
            this.setState({filtro3:"CENTRO DE TRABAJO"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre3:''})
            this.setState({filtro3:""})
            this.setState({filtro6:""})
          }
          if(filtro[3].length>0){
            this.setState({nombre4:filtro[3][0]})
            this.setState({filtro4:"PERIODO"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre4:''})
            this.setState({filtro4:""})
            this.setState({filtro6:""})
          }
        }else{
          this.setState({filtro6:"SIN FILTRO"})
        }
    this.setState({datosLength:datos.length})
    }

    reporteImasivoResultados = async (datos,filtro,periodoTabla) =>{
      this.setState({botonDisabled:''})
      this.setState({botonResultados:''})
      this.setState({spinner:true})
      let array=[];
  
      datos.map(rows=>{
        array.push(rows.data[0])
      })
  
      let arrayFilter = []
      let filter;
      let filterArray;
      let filtrado = [];

      this.state.evaluacionMasivoResultados.forEach(row=>{
        array.forEach(rows=>{
        filter =row.filter(function(hero){
          return hero.fk_empleadosRP === rows
        })
          arrayFilter.push(filter)
        })
      })
      arrayFilter.map(fila=>{
        filterArray = fila.filter(function(hero){
          return hero.Periodo === periodoTabla[0]
        })
          filtrado.push(filterArray)
        })
      function array_equals(a, b){
        return a.length === b.length && a.every((item,idx) => item === b[idx])
        }
        let tag = []
        var filtrado2 = arrayFilter.filter(item => !array_equals(item, tag))
  
        this.setState({resultadosEvaluacionMasivo:filtrado2})
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
            this.setState({filtro3:"CENTRO DE TRABAJO"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre3:''})
            this.setState({filtro3:""})
            this.setState({filtro6:""})
          }
          if(filtro[3].length>0){
            this.setState({nombre4:filtro[3][0]})
            this.setState({filtro4:"PERIODO"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre4:''})
            this.setState({filtro4:""})
            this.setState({filtro6:""})
          }
        }else{
          this.setState({filtro6:"SIN FILTRO"})
        }
    this.setState({datosLength:datos.length})   
    }
                  
    reporteIndividual(id,periodo){ 
    this.setState({botonDisabled:''})  
    this.setState({reporteIndividual:true})
    this.setState({tablaPeriodoActual:false})
    this.setState({reporteResultadosIndividual:false})
    this.setState({reporteResultadosGlobales:false})
    this.setState({reporteEjecutivos:false})
    this.setState({tablaPeriodoSeleccionado:false}) 
    // const url = 'http://localhost:8000/graphql'
    axios({
      url:  API,
      method:'post',
      data:{
      query:`
        query{
        resultSingleSurveyRP(data:"${[id,periodo]}"){
          id 
          Respuestas 
          fk_preguntasRP
          fk_empleadosRP 
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
      
      if(datos.data.data.resultSingleSurveyRP.length > 0 ){
        this.setState({resultados:''})
        this.setState({resultados :datos.data.data.resultSingleSurveyRP })                
        this.setState({getPonderacion:[]})
      } if(datos.data.data.resultSingleSurveyRP.length <= 0){
        DialogUtility.alert({
          animationSettings: { effect: 'Zoom' },           
          title: "Su colaborador aun no responde la evaluación",
          // title: 'Aviso!',
          position: "fixed"
          });
      }
      })
      .catch(err => {
        console.log("el error es  ",err.response)
      });  
    }
      
  getEvaluacion(id,periodo){
   this.setState({botonDisabled:''})  
   this.setState({reporteIndividual:false})
   this.setState({tablaPeriodoActual:false})
   this.setState({reporteResultadosIndividual:true})
   this.setState({reporteResultadosGlaobales:false})
   this.setState({reporteEjecutivos:false})
   this.setState({tablaPeriodoSeleccionado:false})
    // const url = 'http://localhost:8000/graphql'
    axios({
      url:  API,
      method:'post',
      data:{
      query:`
      query{
      resultSingleSurveyRP(data:"${[id,periodo]}"){
        id 
        Respuestas 
        fk_preguntasRP
        fk_empleadosRP 
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
      if(datos.data.data.resultSingleSurveyRP.length > 0 ){
      this.setState({resultadosEvaluacion:''})
      this.setState({resultadosEvaluacion :datos.data.data.resultSingleSurveyRP })                
      this.setState({resultados:[]}) 
    
    } if(datos.data.data.resultSingleSurveyRP.length <= 0){
      DialogUtility.alert({
        animationSettings: { effect: 'Zoom' },           
        title: "Su colaborador aun no responde la evaluación",
        // title: 'Aviso!',
        position: "fixed"
        });
    }
    })
      .catch(err => {
        console.log("el error es  ",err.response)
    });  
  
    axios({
      url:  API,
      method:'post',
      data:{
      query:`
        query{
        resultSingleSurveyRP(data:"${[id,periodo]}"){
          id 
          Respuestas 
          fk_preguntasRP
          fk_empleadosRP
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
        this.setState({resultadosQuery:''})             
        this.setState({resultadosQuery :datos.data.data.resultSingleSurveyRP })                
        // console.log("los resultadosQuery",this.state.resultadosQuery )
      })
      .catch(err => {
        console.log("el error es  ",err.response)
      });  

      axios({
      url:  API,
      method:'post',
      data:{
      query:`
      query{
      resultSingleSurveyRP(data:"${[id,periodo]}"){
        id 
        Respuestas 
        fk_preguntasRP
        fk_empleadosRP 
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
      if(datos.data.data.resultSingleSurveyRP.length > 0 ){
      this.setState({resultadosEvaluacion:''})
      this.setState({resultadosEvaluacion :datos.data.data.resultSingleSurveyRP })                
      this.setState({resultados:[]}) 

      } if(datos.data.data.resultSingleSurveyRP.length <= 0){
        DialogUtility.alert({
          animationSettings: { effect: 'Zoom' },           
          title: "Su colaborador aun no responde la evaluación",
          // title: 'Aviso!',
          position: "fixed"
          });
      }
      })
      .catch(err => {
        console.log("el error es  ",err.response)
      });  
      }    

      handleDropdown = (event) => {
        this.setState({dropdown: event.currentTarget});
      };
      handleClose = () => {
        this.setState({dropdown: null});
      };
              
         reporteEjecutivo (datos,filtro,periodoTabla){
          this.setState({botonDisabled:''})
          this.setState({botonResultados:''})
          this.setState({reporteIndividual:false})
          this.setState({tablaPeriodoActual:false})      
          this.setState({tablaPeriodoSeleccionado:false})
          this.setState({reporteResultadosIndividual:false})
          this.setState({reporteResultadosGlobales:false})
          this.setState({reporteEjecutivos:true})
          this.setState({spinner:true})

          let array=[];
          let totalEmpleados=[];
          let array1=[], array2=[], array3=[], array4=[], array5=[], array6=[], array7=[], array8=[], array9=[], array10=[]      
          let array11=[], array12=[], array13=[], array14=[], array15=[], array16=[], array17=[], array18=[], array19=[], array20=[]      
          let array21=[], array22=[], array23=[], array24=[], array25=[], array26=[], array27=[], array28=[], array29=[], array30=[]      
          let array31=[], array32=[], array33=[], array34=[], array35=[], array36=[], array37=[], array38=[], array39=[], array40=[]      
          let array41=[], array42=[], array43=[], array44=[], array45=[], array46=[];

          let filtrar1, filtrar2, filtrar3, filtrar4, filtrar5, filtrar6, filtrar7, filtrar8, filtrar9, filtrar10
          let filtrar11, filtrar12, filtrar13, filtrar14, filtrar15, filtrar16, filtrar17, filtrar18, filtrar19, filtrar20
          let filtrar21, filtrar22, filtrar23, filtrar24, filtrar25, filtrar26, filtrar27, filtrar28, filtrar29, filtrar30
          let filtrar31, filtrar32, filtrar33, filtrar34, filtrar35, filtrar36, filtrar37, filtrar38, filtrar39, filtrar40
          let filtrar41, filtrar42, filtrar43, filtrar44, filtrar45, filtrar46;

      
          datos.map(rows=>{
            array.push(rows.data[0])
          })

          let arrayFilter = []
          let filter;
          this.state.resultadosInicio.forEach(row=>{
              array.forEach(element => {
                filter  = row.filter(function(hero){
                  return hero.fk_empleadosRP === element
                })
                  arrayFilter.push(filter)
                }); 
          })
          let filterArray;
          let filtrado2 = [];
          // let tag = []
          // function array_equals(a, b){
          //   return a.length === b.length && a.every((item,idx) => item === b[idx])
          // }
          // var filtrado = arrayFilter.filter(item => !array_equals(item, tag))
          arrayFilter.map(fila=>{
            filterArray = fila.filter(function(hero){
              return hero.Periodo === periodoTabla[0]
            })
              filtrado2.push(filterArray)
          })
          let tag = []
          function array_equals(a, b){
            return a.length === b.length && a.every((item,idx) => item === b[idx])
          }
          var filtrado = filtrado2.filter(item => !array_equals(item, tag))

          var array1Int;
          var arr1Int;
          var respuesta1;
          filtrado.map(rows=>{
          filtrar1 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 1;
          })

          array1.push(filtrar1)
          let valor1=[];
          let empleados = []
           array1.map(rows=>{
              console.log("rows" , rows)
              empleados.push(rows[0].nombre +" " + rows[0].ApellidoP  + " " + rows[0].ApellidoM) 
                valor1.push(rows[0].ponderacion)          
            })
            this.setState({valor1:valor1})
            this.setState({empleadosRE:empleados})
           })

          filtrado.map(rows=>{
          filtrar2 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 2;
          });
          array2.push(filtrar2)
          let valor2=[]
            array2.map(rows=>{
                  valor2.push(rows[0].ponderacion)         
              })
              this.setState({valor2:valor2})
           }) 

          filtrado.map(rows=>{
          filtrar3 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 3;
          });
          array3.push(filtrar3)
            let valor3 = []
            array3.map(rows=>{
                  valor3.push(rows[0].ponderacion)            
              })
              this.setState({valor3:valor3})
            })
            
          filtrado.map(rows=>{
          filtrar4 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 4;
          });
          array4.push(filtrar4)
          let valor4= []
           array4.map(rows=>{
               
                  valor4.push(rows[0].ponderacion)
                            
              })
              this.setState({valor4:valor4})
           })

          filtrado.map(rows=>{
          filtrar5 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 5;
          });
          array5.push(filtrar5)
          let valor5 = []
            array5.map(rows=>{               
                  valor5.push(rows[0].ponderacion)                            
              })
              this.setState({valor5:valor5})
           })

          filtrado.map(rows=>{
          filtrar6 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 6;
          });
          array6.push(filtrar6)
          let valor6 = []
            array6.map(rows=>{
                  valor6.push(rows[0].ponderacion)            
              })
              this.setState({valor6:valor6})
            })

          filtrado.map(rows=>{
          filtrar7 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 7;
          });
          array7.push(filtrar7)
          let valor7 = []
            array7.map(rows=>{              
                  valor7.push(rows[0].ponderacion)                           
              })
              this.setState({valor7:valor7})
           })

          filtrado.map(rows=>{
          filtrar8 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 8;
          });
          array8.push(filtrar8)
          let valor8 = []
            array8.map(rows=>{
                  valor8.push(rows[0].ponderacion)
              })
            this.setState({valor8:valor8})
            })

          filtrado.map(rows=>{
          filtrar9 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 9;
          });
          array9.push(filtrar9)
          let valor9 = []
            array9.map(rows=>{                
                  valor9.push(rows[0].ponderacion)            
             })
             this.setState({valor9:valor9})
           })

          filtrado.map(rows=>{
          filtrar10 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 10;
          });
          array10.push(filtrar10)
          let valor10= []
            array10.map(rows=>{               
                  valor10.push(rows[0].ponderacion)            
              })
              this.setState({valor10:valor10})
            })

          filtrado.map(rows=>{
          filtrar11 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 11;
          });
          array11.push(filtrar11)
          let valor11= []
           array11.map(rows=>{
                  valor11.push(rows[0].ponderacion)           
              })
              this.setState({valor11:valor11})
           })

          filtrado.map(rows=>{
          filtrar12 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 12;
          });
          array12.push(filtrar12)
          let valor12= []
            array12.map(rows=>{
                  valor12.push(rows[0].ponderacion)            
              })
              this.setState({valor12:valor12})
            })

          filtrado.map(rows=>{
          filtrar13 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 13;
          });
          array13.push(filtrar13)
          let valor13= []
            array13.map(rows=>{
                  valor13.push(rows[0].ponderacion)            
              })
              this.setState({valor13:valor13})
            })

          filtrado.map(rows=>{
          filtrar14 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 14;
          });
          array14.push(filtrar14)
          let valor14= []
            array14.map(rows=>{
                  valor14.push(rows[0].ponderacion)             
              })
              this.setState({valor14:valor14})
           })

          filtrado.map(rows=>{
          filtrar15 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 15;
          });
          array15.push(filtrar15)
          let valor15= []
             array15.map(rows=>{
                  valor15.push(rows[0].ponderacion)           
              })
              this.setState({valor15:valor15})
            })

          filtrado.map(rows=>{
          filtrar16 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 16;
          });
          array16.push(filtrar16)
          let valor16= []
            array16.map(rows=>{
                  valor16.push(rows[0].ponderacion)           
              })
              this.setState({valor16:valor16})
            })
          
          filtrado.map(rows=>{
          filtrar17 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 17;
          });
          array17.push(filtrar17)
          let valor17= []
            array17.map(rows=>{
                  valor17.push(rows[0].ponderacion)            
              })
              this.setState({valor17:valor17})
           })

          filtrado.map(rows=>{
          filtrar18 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 18 ;
          });
          array18.push(filtrar18)
          let valor18= []
            array18.map(rows=>{
                  valor18.push(rows[0].ponderacion)             
              })
              this.setState({valor18:valor18})
           })

          filtrado.map(rows=>{
          filtrar19 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 19;
          });
          array19.push(filtrar19)
          let valor19= []
            array19.map(rows=>{
                  valor19.push(rows[0].ponderacion)        
              })
              this.setState({valor19:valor19})
            })

          filtrado.map(rows=>{
          filtrar20 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 20;
          });
          array20.push(filtrar20)
          let valor20= []
            array20.map(rows=>{
                  valor20.push(rows[0].ponderacion)            
              })
              this.setState({valor20:valor20})
            })

          filtrado.map(rows=>{
          filtrar21 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 21;
          });
          array21.push(filtrar21)
          let valor21= []
            array21.map(rows=>{
                  valor21.push(rows[0].ponderacion)            
             })
             this.setState({valor21:valor21})
           })

          filtrado.map(rows=>{
          filtrar22 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 22;
          });
          array22.push(filtrar22)
          let valor22= []
            array22.map(rows=>{
                  valor22.push(rows[0].ponderacion)         
              })
              this.setState({valor22:valor22})
            })

          filtrado.map(rows=>{
          filtrar23 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 23;
          });
          array23.push(filtrar23)
          let valor23= []
           array23.map(rows=>{
                  valor23.push(rows[0].ponderacion)            
              })
              this.setState({valor23:valor23})
            })

          filtrado.map(rows=>{
          filtrar24 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 24;
          });
          array24.push(filtrar24)
          let valor24= []
            array24.map(rows=>{
                if(rows[0]){
                  valor24.push(rows[0].ponderacion)
                }             
              })
              this.setState({valor24:valor24})
            })

          filtrado.map(rows=>{
          filtrar25=  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 25;
          });
          array25.push(filtrar25)
          let valor25= []
            array25.map(rows=>{
                  valor25.push(rows[0].ponderacion)            
              })
              this.setState({valor25:valor25})
            })

          filtrado.map(rows=>{
          filtrar26 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 26;
          });
          array26.push(filtrar26)
          let valor26= []
            array26.map(rows=>{
                  valor26.push(rows[0].ponderacion)            
              })
              this.setState({valor26:valor26})
            })

          filtrado.map(rows=>{
          filtrar27 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 27;
          });
          array27.push(filtrar27)
          let valor27= []
           array27.map(rows=>{
                  valor27.push(rows[0].ponderacion)            
              })
              this.setState({valor27:valor27})
            })

          filtrado.map(rows=>{
          filtrar28 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 28;
          });
          array28.push(filtrar28)
          let valor28= []
            array28.map(rows=>{
                  valor28.push(rows[0].ponderacion)            
              })
              this.setState({valor28:valor28})
           })

          filtrado.map(rows=>{
          filtrar29 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 29;
          });
          array29.push(filtrar29)
          let valor29= []
            array29.map(rows=>{
                  valor29.push(rows[0].ponderacion)            
              })
              this.setState({valor29:valor29})
            })

          filtrado.map(rows=>{
          filtrar30 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 30;
          });
          array30.push(filtrar30)
          let valor30= []
            array30.map(rows=>{
                  valor30.push(rows[0].ponderacion)           
              })
              this.setState({valor30:valor30})
            })

          filtrado.map(rows=>{
          filtrar31 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 31;
          });
          array31.push(filtrar31)
          let valor31= []
            array31.map(rows=>{
                  valor31.push(rows[0].ponderacion)             
              })
              this.setState({valor31:valor31})
            })

          filtrado.map(rows=>{
          filtrar32 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 32;
          });
          array32.push(filtrar32)
          let valor32= []
           array32.map(rows=>{
                  valor32.push(rows[0].ponderacion)           
              })
              this.setState({valor32:valor32})
            }) 

          filtrado.map(rows=>{
          filtrar33 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 33;
          });
          array33.push(filtrar33)
          let valor33= []
            array33.map(rows=>{
                  valor33.push(rows[0].ponderacion)            
              })
              this.setState({valor33:valor33})
            })

          filtrado.map(rows=>{
          filtrar34=  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 34;
          });
          array34.push(filtrar34)
          let valor34= []
            array34.map(rows=>{
                  valor34.push(rows[0].ponderacion)           
             })
             this.setState({valor34:valor34})
          })

          filtrado.map(rows=>{
          filtrar35 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 35;
          });
          array35.push(filtrar35)
          let valor35=[]
            array35.map(rows=>{
                  valor35.push(rows[0].ponderacion)          
             })
             this.setState({valor35:valor35})
           })

          filtrado.map(rows=>{
          filtrar36 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 36;
          });
          array36.push(filtrar36)
          let valor36= []
            array36.map(rows=>{
                  valor36.push(rows[0].ponderacion)            
              })
              this.setState({valor36:valor36})
            })

          filtrado.map(rows=>{
          filtrar37 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 37;
          });
          array37.push(filtrar37)
          let valor37= []
            array37.map(rows=>{
                  valor37.push(rows[0].ponderacion)            
              })
              this.setState({valor37:valor37})
            })

          filtrado.map(rows=>{
          filtrar38 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 38;
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
            return hero.fk_preguntasRP == 39;
          });
          array39.push(filtrar39)
          let valor39= []
            array39.map(rows=>{
                  valor39.push(rows[0].ponderacion)            
              })
              this.setState({valor39:valor39})
           })
  
          filtrado.map(rows=>{
          filtrar40 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 40;
          });
          array40.push(filtrar40)
          let valor40= []
            array40.map(rows=>{
                  valor40.push(rows[0].ponderacion)             
              })
              this.setState({valor40:valor40})
           })

          filtrado.map(rows=>{
          filtrar41 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 41;
          });
          array41.push(filtrar41)
          let valor41= []
            array41.map(rows=>{
                  valor41.push(rows[0].ponderacion)             
              })
              this.setState({valor41:valor41})
           })

          filtrado.map(rows=>{
          filtrar42 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 42;
          });
          array42.push(filtrar42)
          let valor42= []
            array42.map(rows=>{
                  valor42.push(rows[0].ponderacion) 
              })
              this.setState({valor42:valor42})
           })

          filtrado.map(rows=>{
          filtrar43 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 43;
          });
          array43.push(filtrar43)
          let valor43= []
            array43.map(rows=>{
                  valor43.push(rows[0].ponderacion)          
              })
              this.setState({valor43:valor43})
            })

          filtrado.map(rows=>{
          filtrar44 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 44;
          });
          array44.push(filtrar44)
          let valor44= []
             array44.map(rows=>{
                  valor44.push(rows[0].ponderacion)
              })
              this.setState({valor44:valor44})
           })

          filtrado.map(rows=>{
          filtrar45 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 45;
          });
          array45.push(filtrar45)
          let valor45= []
            array45.map(rows=>{
                  valor45.push(rows[0].ponderacion)          
              })
              this.setState({valor45:valor45})
            })

          filtrado.map(rows=>{
          filtrar46 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP == 46;
          });
          array46.push(filtrar46)
          let valor46= []
           array46.map(rows=>{
                  valor46.push(rows[0].ponderacion)            
              })
              this.setState({valor46:valor46})
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
    let categoria1Grafica;
    let categoria2Grafica;
    let categoria3Grafica;
    let categoria4Grafica;
    let totalGrafica;
    let colorCategoria1Grafica;
    let colorCategoria2Grafica;
    let colorCategoria3Grafica;
    let colorCategoria4Grafica;
    let a ;
    let spinner;
    if(this.state.spinner== true){
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
    let botonCerrar;
    if(!this.state.botonDisabled){  
        botonCerrar=<MDBBtn className = "text-white"  size="md" color="danger" onClick={(e)=>{window.location.reload()}} >Cerrar</MDBBtn>
    }
   
    let datosEmpleados;
    let filtro;
    let periodoTabla;
    
    const options = {
        filterType: "dropdown",
        responsive: "scrollMaxHeight",
        sort:true,
        setCellProps: () => ({ style: { minWidth: "1000px", maxWidth: "1000px" }}),
        customBodyRender: (data, type, row) => {return <pre>{data}</pre>},
        textLabels: {
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
        periodoTabla = tableState.filterData[3]

        },
        onFilterChange: (action, filtroTable) => {
          filtro=filtroTable
          
          }     };
          let dataSource;
          charts(FusionCharts);
      
      
          if(this.state.resultadosInicio.length>0){
      
            let total;
          
                let array1=[], array2=[], array3=[], array4=[], array5=[], array6=[], array7=[], array8=[], array9=[], array10=[]      
                let array11=[], array12=[], array13=[], array14=[], array15=[], array16=[], array17=[], array18=[], array19=[], array20=[]      
                let array21=[], array22=[], array23=[], array24=[], array25=[], array26=[], array27=[], array28=[], array29=[], array30=[]      
                let array31=[], array32=[], array33=[], array34=[], array35=[], array36=[], array37=[], array38=[], array39=[], array40=[]      
                let array41=[], array42=[], array43=[], array44=[], array45=[], array46=[];  
                var filtrar1 ;
                var array1Int;
                var arr1Int;
                var respuesta1;
                  this.state.resultadosInicio.map(rows=>{
                  filtrar1 =  rows.filter(function(hero) {
                    return hero.fk_preguntasRP == 1;
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
                    return hero.fk_preguntasRP == 2;
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
                      return hero.fk_preguntasRP == 3;
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
                      return hero.fk_preguntasRP == 4;
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
                      return hero.fk_preguntasRP == 5;
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
                      return hero.fk_preguntasRP == 6;
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
                      return hero.fk_preguntasRP == 7;
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
                      return hero.fk_preguntasRP == 8;
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
                      return hero.fk_preguntasRP == 9;
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
                      return hero.fk_preguntasRP == 10;
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
                      return hero.fk_preguntasRP == 11;
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
                      return hero.fk_preguntasRP == 12;
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
                      return hero.fk_preguntasRP == 13;
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
                      return hero.fk_preguntasRP == 14;
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
                      return hero.fk_preguntasRP == 15;
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
                      return hero.fk_preguntasRP == 16;
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
                      return hero.fk_preguntasRP == 17;
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
                      return hero.fk_preguntasRP == 18;
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
                      return hero.fk_preguntasRP == 19;
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
                      return hero.fk_preguntasRP == 20;
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
                      return hero.fk_preguntasRP == 21;
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
                      return hero.fk_preguntasRP == 22;
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
                      return hero.fk_preguntasRP == 23;
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
                      return hero.fk_preguntasRP == 24;
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
                      return hero.fk_preguntasRP == 25;
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
                      return hero.fk_preguntasRP == 26;
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
                      return hero.fk_preguntasRP == 27;
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
                      return hero.fk_preguntasRP == 28;
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
                      return hero.fk_preguntasRP == 29;
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
                      return hero.fk_preguntasRP == 30;
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
                      return hero.fk_preguntasRP == 31;
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
                      return hero.fk_preguntasRP == 32;
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
                      return hero.fk_preguntasRP == 33;
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
                      return hero.fk_preguntasRP == 34;
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
                      return hero.fk_preguntasRP == 35;
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
                      return hero.fk_preguntasRP == 36;
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
                      return hero.fk_preguntasRP == 37;
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
                      return hero.fk_preguntasRP == 38;
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
                      return hero.fk_preguntasRP == 39;
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
                      return hero.fk_preguntasRP == 40;
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
                      return hero.fk_preguntasRP == 41;
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
                      return hero.fk_preguntasRP == 42;
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
                      return hero.fk_preguntasRP == 43;
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
                      return hero.fk_preguntasRP == 44;
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
                      return hero.fk_preguntasRP == 45;
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
                      return hero.fk_preguntasRP == 46;
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
                    
                    total =(respuesta1+respuesta2+respuesta3+respuesta4+respuesta5+respuesta6+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta12+respuesta13+respuesta14+respuesta15+respuesta16+respuesta17+respuesta18+respuesta19+respuesta20
                      +respuesta21+respuesta22+respuesta23+respuesta24+respuesta25+respuesta26+respuesta27+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40
                      +respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46).toFixed(2)
                      let length =this.state.resultadosInicio.length;
                      // console.log("length" , length)
                      let general =total/length.toFixed(2);
                      
                      let textoCategoriaUno;
                       categoria1Grafica = ((respuesta2+respuesta1+respuesta3)/length).toFixed(2);
      
                      if(categoria1Grafica < 3){
                        colorCategoria1Grafica  = "#9BE0F7"
                        textoCategoriaUno = "Nulo"
                      }else if(categoria1Grafica >= 3 && categoria1Grafica < 5){
                        colorCategoria1Grafica ="#6BF56E"
                        textoCategoriaUno = "Bajo"
                      }else if(categoria1Grafica >= 5 && categoria1Grafica < 7){
                        colorCategoria1Grafica="#FFFF00"
                        textoCategoriaUno = "Medio"
                      }else if(categoria1Grafica >= 7 && categoria1Grafica < 9){
                        colorCategoria1Grafica = "#FFC000"
                        textoCategoriaUno = "Alto"
                      }else if(categoria1Grafica >= 9){
                        colorCategoria1Grafica =  "#FF0000"
                        textoCategoriaUno = "Muy alto"
      
                      }
                      let textoCategoriaDos;
                      categoria2Grafica = ((respuesta4+respuesta9+respuesta5+respuesta6+respuesta7+respuesta8+respuesta41+respuesta42+respuesta43+respuesta10+respuesta11+respuesta12+respuesta13+respuesta20+respuesta21+respuesta22+respuesta18+respuesta19+respuesta26+respuesta27)/length).toFixed(2);
                      if(categoria2Grafica < 10){
                        colorCategoria2Grafica  = "#9BE0F7"
                        textoCategoriaDos = "Nulo"
                      }else if(categoria2Grafica >= 10 && categoria2Grafica < 20){
                        colorCategoria2Grafica ="#6BF56E"
                        textoCategoriaDos = "Bajo"
                      }else if(categoria2Grafica >=20 && categoria2Grafica < 30){
                        colorCategoria2Grafica="#FFFF00"
                        textoCategoriaDos = "Medio"
                      }else if(categoria2Grafica >=30 && categoria2Grafica < 40){
                        colorCategoria2Grafica = "#FFC000"
                        textoCategoriaDos = "Alto"
                      }else if(categoria2Grafica >= 40){
                        colorCategoria2Grafica = "#FF0000"
                        textoCategoriaDos = "Muy alto "
                      }
          
                      let textoCategoriaTre;
                      categoria3Grafica =( (respuesta14+respuesta15+respuesta16+respuesta17)/length).toFixed(2);
                      if(categoria3Grafica < 4){
                        colorCategoria3Grafica  = "#9BE0F7"
                        textoCategoriaTre="Nulo"
                      }else if(categoria3Grafica >= 4 && categoria3Grafica < 6){
                        colorCategoria3Grafica ="#6BF56E"
                        textoCategoriaTre="Bajo"
                      }else if(categoria3Grafica >=6 && categoria3Grafica < 9){
                        colorCategoria3Grafica="#FFFF00"
                        textoCategoriaTre="Medio"
                      }else if(categoria3Grafica >=9 && categoria3Grafica < 12){
                        colorCategoria3Grafica = "#FFC000"
                        textoCategoriaTre="Alto"
                      }else if(categoria3Grafica >= 12){
                        colorCategoria3Grafica = "#FF0000"
                        textoCategoriaTre="Muy alto"
                      }
                      let textoCategoriaCuatro;
                      categoria4Grafica = ((respuesta23+respuesta24+respuesta25+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40+respuesta44+respuesta45+respuesta46)/length).toFixed(2);
                      if(categoria4Grafica < 10){
                        colorCategoria4Grafica  = "#9BE0F7"
                        textoCategoriaCuatro="Nulo "
                      }else if(categoria4Grafica >= 10 && categoria4Grafica < 18){
                        colorCategoria4Grafica ="#6BF56E"
                        textoCategoriaCuatro="Bajo"
                      }else if(categoria4Grafica >=18 && categoria4Grafica < 28){
                        colorCategoria4Grafica="#FFFF00"
                        textoCategoriaCuatro="Medio"
                      }else if(categoria4Grafica >=28 && categoria4Grafica < 38){
                        colorCategoria4Grafica = "#FFC000"
                        textoCategoriaCuatro="Alto"
                      }else if(categoria4Grafica >= 38){
                        colorCategoria4Grafica = "#FF0000"
                        textoCategoriaCuatro="Muy alto"
                      }
                         dataSource = {
                          chart: {
                            caption: "Gráfica de previsualización",
                            subcaption: "Ponderación",
                            showvalues: "1",
                            showpercentintooltip: "0",
                            // numberprefix: "Pts.",
                            enablemultislicing: "1",
                            theme: "fusion"
                            },
                            data: [
                              {
                                label: "Ambiente de T",
                                value:  categoria1Grafica,
                                color: colorCategoria1Grafica,
                                labelFontSize:12,
                                toolText: textoCategoriaUno
      
                                // link:"www.google.com"
                              },
                              {
                                label: "Factores propios",
                                value: categoria2Grafica,
                                color: colorCategoria2Grafica,
                                labelFontSize:12,
                                toolText: textoCategoriaDos
                                // link:"www.google.com"
                              },
                              {
                                label: "Organización",
                                value: categoria3Grafica,
                                color: colorCategoria3Grafica,
                                labelFontSize:12,
                                toolText: textoCategoriaTre
                                // link:"www.google.com"
                              },
                              {
                                label: "Liderazgo",
                                value: categoria4Grafica,
                                color: colorCategoria4Grafica,
                                labelFontSize:12,
                                toolText: textoCategoriaCuatro
                                // link:"www.google.com"
                              },
                              
                            ]
                          };    

                        let value1 = parseFloat(categoria1Grafica)
                        let value2 = parseFloat(categoria2Grafica)
                        let value3 = parseFloat(categoria3Grafica)
                        let value4 = parseFloat(categoria4Grafica)
                        totalGrafica = (value1+value2+value3+value4).toFixed(2)                        
                        }
      
          let ponderacion;
          let botonDescargarResultadosGlobales;
          // console.log("dataPeticion1" , this.state.peticion1) 

          if(this.state.peticion1.length>0 &&  this.state.reporteResultadosGlobales == true){
          let total;
          let array1=[], array2=[], array3=[], array4=[], array5=[], array6=[], array7=[], array8=[], array9=[], array10=[]      
          let array11=[], array12=[], array13=[], array14=[], array15=[], array16=[], array17=[], array18=[], array19=[], array20=[]      
          let array21=[], array22=[], array23=[], array24=[], array25=[], array26=[], array27=[], array28=[], array29=[], array30=[]      
          let array31=[], array32=[], array33=[], array34=[], array35=[], array36=[], array37=[], array38=[], array39=[], array40=[]      
          let array41=[], array42=[], array43=[], array44=[], array45=[], array46=[];  
          var filtrar1 ;
       //   console.log("array1",array1)
          var array1Int;
          var arr1Int;
          var respuesta1;
            this.state.peticion1.map(rows=>{
            filtrar1 =  rows.filter(function(hero) {
              return hero.fk_preguntasRP == 1;
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
            // console.log("respuesta1" , respuesta1)
            }) 
    
            var filtrar2 ;
            var array2Int;
            var arr2Int;
            var respuesta2;
            this.state.peticion1.map(rows=>{
            filtrar2 =  rows.filter(function(hero) {
              return hero.fk_preguntasRP == 2;
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
            // console.log("respuesta2" , respuesta2)
            }) 
              var filtrar3 ;
              var array3Int;
              var arr3Int;
              var respuesta3;
              this.state.peticion1.map(rows=>{
              filtrar3 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 3;
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
              // console.log("respuesta3" , respuesta3)
              }) 
              var filtrar4 ;
              var array4Int;
              var arr4Int;
              var respuesta4;
              this.state.peticion1.map(rows=>{
              filtrar4 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 4;
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
              // console.log("respuesta4" , respuesta4)
              }) 
              var filtrar5 ;
              var array5Int;
              var arr5Int;
              var respuesta5;
              this.state.peticion1.map(rows=>{
              filtrar5 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 5;
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
              // console.log("respuesta5" , respuesta5)
              }) 
              var filtrar6 ;
              var array6Int;
              var arr6Int;
              var respuesta6;
              this.state.peticion1.map(rows=>{
              filtrar6 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 6;
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
              // console.log("respuesta6" , respuesta6)
              }) 
              var filtrar7 ;
              var array7Int;
              var arr7Int;
              var respuesta7;
              this.state.peticion1.map(rows=>{
              filtrar7 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 7;
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
              // console.log("respuesta7" , respuesta7)
              })
              var filtrar8 ;
              var array8Int;
              var arr8Int;
              var respuesta8;
              this.state.peticion1.map(rows=>{
              filtrar8 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 8;
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
              // console.log("respuesta8" , respuesta8)
              })
              var filtrar9 ;
              var array9Int;
              var arr9Int;
              var respuesta9;
              this.state.peticion1.map(rows=>{
              filtrar9 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 9;
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
              // console.log("respuesta8" , respuesta9)
              })
              var filtrar10 ;
              var array10Int;
              var arr10Int;
              var respuesta10;
              this.state.peticion1.map(rows=>{
              filtrar10 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 10;
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
              // console.log("respuesta9" , respuesta9)
              })
            
              var filtrar11 ;
              var array11Int;
              var arr11Int;
              var respuesta11;
              this.state.peticion1.map(rows=>{
              filtrar11 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 11;
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
              // console.log("respuesta11" , respuesta11)
              })
             
              var filtrar12 ;
              var array12Int;
              var arr12Int;
              var respuesta12;
              this.state.peticion1.map(rows=>{
              filtrar12 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 12;
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
              // console.log("respuesta12" , respuesta12)

              })
              var filtrar13 ;
              var array13Int;
              var arr13Int;
              var respuesta13;
              this.state.peticion1.map(rows=>{
              filtrar13 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 13;
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
              // console.log("respuesta13" , respuesta13)
              })
              var filtrar14 ;
              var array14Int;
              var arr14Int;
              var respuesta14;
              this.state.peticion1.map(rows=>{
              filtrar14 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 14;
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
              // console.log("respuesta14" , respuesta14)
              })
              var filtrar15 ;
              var array15Int;
              var arr15Int;
              var respuesta15;
              this.state.peticion1.map(rows=>{
              filtrar15 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 15;
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
              // console.log("respuesta15" , respuesta15)
              })
              var filtrar16 ;
              var array16Int;
              var arr16Int;
              var respuesta16;
              this.state.peticion1.map(rows=>{
              filtrar16 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 16;
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
              // console.log("respuesta16" , respuesta16)
              })
              var filtrar17 ;
              var array17Int;
              var arr17Int;
              var respuesta17;
              this.state.peticion1.map(rows=>{
              filtrar17 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 17;
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
              // console.log("respuesta17" , respuesta17)
              })
              var filtrar18 ;
              var array18Int;
              var arr18Int;
              var respuesta18;
              this.state.peticion1.map(rows=>{
              filtrar18 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 18;
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
              // console.log("respuesta18" , respuesta18)
              })
              var filtrar19 ;
              var array19Int;
              var arr19Int;
              var respuesta19;
              this.state.peticion1.map(rows=>{
              filtrar19 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 19;
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
              // console.log("respuesta19" , respuesta19)
              })
              var filtrar20 ;
              var array20Int;
              var arr20Int;
              var respuesta20;
              this.state.peticion1.map(rows=>{
              filtrar20 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 20;
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
              // console.log("respuesta20" , respuesta20)
              })
              var filtrar21 ;
              var array21Int;
              var arr21Int;
              var respuesta21;
              this.state.peticion1.map(rows=>{
              filtrar21 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 21;
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
              // console.log("respuesta21" , respuesta21)
              })
              var filtrar22 ;
              var array22Int;
              var arr22Int;
              var respuesta22;
              this.state.peticion1.map(rows=>{
              filtrar22 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 22;
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
              // console.log("respuesta22" , respuesta22)
              })
              var filtrar23 ;
              var array23Int;
              var arr23Int;
              var respuesta23;
              this.state.peticion1.map(rows=>{
              filtrar23 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 23;
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
              // console.log("respuesta23" , respuesta23)
              })
              var filtrar24 ;
              var array24Int;
              var arr24Int;
              var respuesta24;
              this.state.peticion1.map(rows=>{
              filtrar24 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 24;
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
              // console.log("respuesta24" , respuesta24)
              })
              var filtrar25 ;
              var array25Int;
              var arr25Int;
              var respuesta25;
              this.state.peticion1.map(rows=>{
              filtrar25 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 25;
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
              // console.log("respuesta25" , respuesta1)
              })
              var filtrar26 ;
              var array26Int;
              var arr26Int;
              var respuesta26;
              this.state.peticion1.map(rows=>{
              filtrar26 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 26;
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
              // console.log("respuesta26" , respuesta26)
              })
              var filtrar27 ;
              var array27Int;
              var arr27Int;
              var respuesta27;
              this.state.peticion1.map(rows=>{
              filtrar27 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 27;
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
              // console.log("respuesta27" , respuesta27)
              })
              var filtrar28 ;
              var array28Int;
              var arr28Int;
              var respuesta28;
              this.state.peticion1.map(rows=>{
              filtrar28 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 28;
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
              // console.log("respuesta28" , respuesta28)
              })
              var filtrar29 ;
              var array29Int;
              var arr29Int;
              var respuesta29;
              this.state.peticion1.map(rows=>{
              filtrar29 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 29;
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
              // console.log("respuesta29" , respuesta29)
              })
              var filtrar30 ;
              var array30Int;
              var arr30Int;
              var respuesta30;
              this.state.peticion1.map(rows=>{
              filtrar30 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 30;
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
              // console.log("respuesta30" , respuesta30)
              })
              var filtrar31 ;
              var array31Int;
              var arr31Int;
              var respuesta31;
              this.state.peticion1.map(rows=>{
              filtrar31 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 31;
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
              // console.log("respuesta31" , respuesta31)
              })
              var filtrar32 ;
              var array32Int;
              var arr32Int;
              var respuesta32;
              this.state.peticion1.map(rows=>{
              filtrar32 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 32;
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
              // console.log("respuesta32" , respuesta32)
              })
              var filtrar33 ;
              var array33Int;
              var arr33Int;
              var respuesta33;
              this.state.peticion1.map(rows=>{
              filtrar33 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 33;
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
              // console.log("respuesta33" , respuesta33)
              })
              var filtrar34 ;
              var array34Int;
              var arr34Int;
              var respuesta34;
              this.state.peticion1.map(rows=>{
              filtrar34 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 34;
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
              // console.log("respuesta34" , respuesta34)
              })
              var filtrar35 ;
              var array35Int;
              var arr35Int;
              var respuesta35;
              this.state.peticion1.map(rows=>{
              filtrar35 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 35;
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
              // console.log("respuesta35" , respuesta35)
              })
              var filtrar36 ;
              var array36Int;
              var arr36Int;
              var respuesta36;
              this.state.peticion1.map(rows=>{
              filtrar36 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 36;
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
              // console.log("respuesta36" , respuesta36)
              })
              var filtrar37 ;
              var array37Int;
              var arr37Int;
              var respuesta37;
              this.state.peticion1.map(rows=>{
              filtrar37 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 37;
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
              // console.log("respuesta37" , respuesta37)
              })
              var filtrar38 ;
              var array38Int;
              var arr38Int;
              var respuesta38;
              this.state.peticion1.map(rows=>{
              filtrar38 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 38;
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
              // console.log("respuesta38" , respuesta38)
              })
              var filtrar39 ;
              var array39Int;
              var arr39Int;
              var respuesta39;
              this.state.peticion1.map(rows=>{
              filtrar39 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 39;
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
              // console.log("respuesta39" , respuesta39)
              })
              var filtrar40 ;
              var array40Int;
              var arr40Int;
              var respuesta40;
              this.state.peticion1.map(rows=>{
              filtrar40 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 40;
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
              // console.log("respuesta40" , respuesta40)
              })
              var filtrar41 ;
              var array41Int;
              var arr41Int;
              var respuesta41;
              this.state.peticion1.map(rows=>{
              filtrar41 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 41;
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
              // console.log("respuesta41" , respuesta41)
              })
              var filtrar42 ;
              var array42Int;
              var arr42Int;
              var respuesta42;
              this.state.peticion1.map(rows=>{
              filtrar42 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 42;
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
              // console.log("respuesta42" , respuesta42)
              })
              var filtrar43 ;
              var array43Int;
              var arr43Int;
              var respuesta43;
              this.state.peticion1.map(rows=>{
              filtrar43 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 43;
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
              // console.log("respuesta43" , respuesta43)
              })
              var filtrar44 ;
              var array44Int;
              var arr44Int;
              var respuesta44;
              this.state.peticion1.map(rows=>{
              filtrar44 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 44;
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
                return hero.fk_preguntasRP == 45;
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
              // console.log("respuesta45" , respuesta45)
              })
              var filtrar46 ;
              var array46Int;
              var arr46Int;
              var respuesta46;
              this.state.peticion1.map(rows=>{
              filtrar46 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 46;
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
              // console.log("respuesta46" , respuesta46)
              })

              total =(respuesta1+respuesta2+respuesta3+respuesta4+respuesta5+respuesta6+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta12+respuesta13+respuesta14+respuesta15+respuesta16+respuesta17+respuesta18+respuesta19+respuesta20
                +respuesta21+respuesta22+respuesta23+respuesta24+respuesta25+respuesta26+respuesta27+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40
                +respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46).toFixed(2)
                let length =this.state.peticion1.length;
                // console.log("length2" , length)
                let general =total/length.toFixed(2);
let celda;
let criterios;
let celdaPrev;
let criteriosPrev;
if(general<20){
celda = <TableCell width="10%"  style={{backgroundColor: "#9BE0F7"}}><font size="2" face="arial"color="black" align="justify"><p>NULO O DESPRECIABLE</p></font></TableCell>
criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align="justify"><p>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</p></font></TableCell>
}

else if(general>=20 && general <45){

  celda = <TableCell width="10%" style={{backgroundColor: "#6BF56E"}} ><font size="1" face="arial"color="black" align="justify">BAJO</font></TableCell>
  celdaPrev = <TableCell width="10%" style={{backgroundColor: "#6BF56E"}} ><font size="3" face="arial"color="black" align="justify">BAJO</font></TableCell>

 criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align="justify"><p> Es necesario una mayor difusión de la política de prevención de riesgos
  psicosociales y programas para: la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral.</p></font></TableCell>

  criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="2" face="arial"color="black" align="justify"><p> Es necesario una mayor difusión de la política de prevención de riesgos
  psicosociales y programas para: la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral.</p></font></TableCell>

}else if(general>=45 && general < 70){
  celda = <TableCell width="10%"  style={{backgroundColor: "#FFFF00"}} ><font size="1" face="arial"color="black" align="justify">MEDIO</font></TableCell>
  celdaPrev = <TableCell width="10%"  style={{backgroundColor: "#FFFF00"}} ><font size="3" face="arial"color="black" align="justify">MEDIO</font></TableCell>

  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align="justify"><p>Se requiere revisar la política de prevención de riesgos psicosociales y
  programas para la prevención de los factores de riesgo psicosocial, la
  promoción de un entorno organizacional favorable y la prevención de la
  violencia laboral, así como reforzar su aplicación y difusión, mediante un
  Programa de intervención.</p></font></TableCell>

   criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="2" face="arial"color="black" align="justify"><p>Se requiere revisar la política de prevención de riesgos psicosociales y
   programas para la prevención de los factores de riesgo psicosocial, la
   promoción de un entorno organizacional favorable y la prevención de la
   violencia laboral, así como reforzar su aplicación y difusión, mediante un
   Programa de intervención.</p></font></TableCell>
}else if(general>=70 && general < 90){
 celda = <TableCell  width="10%" style={{backgroundColor: "#FFC000"}} ><font size="1" face="arial"color="black" align="justify">ALTO</font></TableCell>
 celdaPrev = <TableCell  width="10%" style={{backgroundColor: "#FFC000"}} ><font size="3" face="arial"color="black" align="justify">ALTO</font></TableCell>

criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align="justify"><p>Se requiere realizar un análisis de cada categoría y dominio, de manera que
 se puedan determinar las acciones de intervención apropiadas a través de un
 Programa de intervención, que podrá incluir una evaluación específica y
 deberá incluir una campaña de sensibilización, revisar la política de
 prevención de riesgos psicosociales y programas para la prevención de los
 factores de riesgo psicosocial, la promoción de un entorno organizacional
 favorable y la prevención de la violencia laboral, así como reforzar su
 aplicación y difusión.</p></font></TableCell>

 criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="2" face="arial"color="black" align="justify"><p>Se requiere realizar un análisis de cada categoría y dominio, de manera que
 se puedan determinar las acciones de intervención apropiadas a través de un
 Programa de intervención, que podrá incluir una evaluación específica y
 deberá incluir una campaña de sensibilización, revisar la política de
 prevención de riesgos psicosociales y programas para la prevención de los
 factores de riesgo psicosocial, la promoción de un entorno organizacional
 favorable y la prevención de la violencia laboral, así como reforzar su
 aplicación y difusión.</p></font></TableCell>
}
else if( general >= 90){
  celda  = <TableCell width="10%"  style={{backgroundColor: "#FF0000"}}><font size="1" face="arial"color="black" align="justify">MUY ALTO</font></TableCell>
  celdaPrev  = <TableCell width="10%"  style={{backgroundColor: "#FF0000"}}><font size="3" face="arial"color="black" align="justify">MUY ALTO</font></TableCell>
 
 criterios = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="1" face="arial"color="black" align="justify"><p>Se requiere realizar el análisis de cada categoría y dominio para establecer
  las acciones de intervención apropiadas, mediante un Programa de
  intervención que deberá incluir evaluaciones específicas, y contemplar
  campañas de sensibilización, revisar la política de prevención de riesgos
  psicosociales y programas para la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral, así como reforzar su aplicación y difusión.</p></font></TableCell>
  criteriosPrev = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="2" face="arial"color="black" align="justify"><p>Se requiere realizar el análisis de cada categoría y dominio para establecer
  las acciones de intervención apropiadas, mediante un Programa de
  intervención que deberá incluir evaluaciones específicas, y contemplar
  campañas de sensibilización, revisar la política de prevención de riesgos
  psicosociales y programas para la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral, así como reforzar su aplicación y difusión.</p></font></TableCell>
}


let categoria1Nulo;
let categoria1Bajo;
let categoria1Medio;
let categoria1Alto;
let categoria1MuyAlto;
let colorCategoriaUno;
 let categoriaUno = ((respuesta2+respuesta1+respuesta3)/length).toFixed(2);

if(categoriaUno < 3){
  colorCategoriaUno  = <td  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria1Nulo=categoriaUno
}else if(categoriaUno >= 3 && categoriaUno < 5){
  colorCategoriaUno =<td  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria1Bajo= categoriaUno
}else if(categoriaUno >= 5 && categoriaUno < 7){
  colorCategoriaUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria1Medio= categoriaUno
}else if(categoriaUno >= 7 && categoriaUno < 9){
  colorCategoriaUno = <td  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria1Alto= categoriaUno
}else if(categoriaUno >= 9){
  colorCategoriaUno = <td  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  categoria1MuyAlto= categoriaUno
}
let categoria2Nulo;
let categoria2Bajo;
let categoria2Medio;
let categoria2Alto;
let categoria2MuyAlto;
let colorCategoriaDos;

 let categoriaDos = ((respuesta4+respuesta9+respuesta5+respuesta6+respuesta7+respuesta8+respuesta41+respuesta42+respuesta43+respuesta10+respuesta11+respuesta12+respuesta13+respuesta20+respuesta21+respuesta22+respuesta18+respuesta19+respuesta26+respuesta27)/length).toFixed(2);
if(categoriaDos < 10){
  colorCategoriaDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria2Nulo=categoriaDos
}else if(categoriaDos >= 10 && categoriaDos < 20){
  colorCategoriaDos =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria2Bajo= categoriaDos
}else if(categoriaDos >=20 && categoriaDos < 30){
  colorCategoriaDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria2Medio= categoriaDos
}else if(categoriaDos >=30 && categoriaDos < 40){
  colorCategoriaDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria2Alto= categoriaDos
}else if(categoriaDos >= 40){
  colorCategoriaDos = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  categoria2MuyAlto = categoriaDos
}
let categoria3Nulo;
let categoria3Bajo;
let categoria3Medio;
let categoria3Alto;
let categoria3MuyAlto;
let colorCategoriaTre;

 let  categoriaTre =( (respuesta14+respuesta15+respuesta16+respuesta17)/length).toFixed(2);
if(categoriaTre < 4){
  colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria3Nulo=categoriaTre
}else if(categoriaTre >= 4 && categoriaTre < 6){
  colorCategoriaTre =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria3Bajo= categoriaTre
}else if(categoriaTre >=6 && categoriaTre < 9){
  colorCategoriaTre=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria3Medio= categoriaTre
}else if(categoriaTre >=9 && categoriaTre < 12){
  colorCategoriaTre = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria3Alto= categoriaTre
}else if(categoriaTre >= 12){
  colorCategoriaTre = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  categoria3MuyAlto= categoriaTre
}

let categoria4Nulo;
let categoria4Bajo;
let categoria4Medio;
let categoria4Alto;
let categoria4MuyAlto;
let colorCategoriaCuatro;

 let categoriaCuatro = ((respuesta23+respuesta24+respuesta25+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40+respuesta44+respuesta45+respuesta46)/length).toFixed(2);
if(categoriaCuatro < 10){
  colorCategoriaCuatro  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria4Nulo=categoriaCuatro
}else if(categoriaCuatro >= 10 && categoriaCuatro < 18){
  colorCategoriaCuatro =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria4Bajo= categoriaCuatro
}else if(categoriaCuatro >=18 && categoriaCuatro < 28){
  colorCategoriaCuatro=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria4Medio= categoriaCuatro
}else if(categoriaCuatro >=28 && categoriaCuatro < 38){
  colorCategoriaCuatro = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria4Alto= categoriaCuatro
}else if(categoriaCuatro >= 38){
  colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  categoria4MuyAlto= categoriaCuatro
}

let Dominio1Nulo;
let Dominio1Bajo;
let Dominio1Medio;
let Dominio1Alto;
let Dominio1MuyAlto;
let colorDominioUno;
let DominioUno =( (respuesta2+respuesta1+respuesta3)/length).toFixed(2);
if(DominioUno < 3){
  colorDominioUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio1Nulo=DominioUno
}else if(DominioUno >= 3 && DominioUno < 5){
  colorDominioUno=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio1Bajo= DominioUno
}else if(DominioUno >= 5 && DominioUno < 7){
  colorDominioUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio1Medio= DominioUno
}else if(DominioUno >= 7 && DominioUno < 9){
  colorDominioUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio1Alto= DominioUno
}else if(DominioUno >= 9){
  colorDominioUno= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio1MuyAlto= DominioUno
}

let Dominio2Nulo;
let Dominio2Bajo;
let Dominio2Medio;
let Dominio2Alto;
let Dominio2MuyAlto;
let colorDominioDos;
let DominioDos = ((respuesta4+respuesta9+respuesta5+respuesta6+respuesta7+respuesta8+respuesta41+respuesta42+respuesta43+respuesta10+respuesta11+respuesta12+respuesta13) /length).toFixed(2);
if(DominioDos < 12){
  colorDominioDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio2Nulo=DominioDos
}else if(DominioDos >= 12 && DominioDos < 16){
  colorDominioDos=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio2Bajo= DominioDos
}else if(DominioDos >= 16 && DominioDos < 20){
  colorDominioDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio2Medio= DominioDos
}else if(DominioDos >= 20 && DominioDos < 24){
  colorDominioDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio2Alto= DominioDos
}else if(DominioDos >= 24){
  colorDominioDos= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio2MuyAlto= DominioDos
}

let Dominio3Nulo;
let Dominio3Bajo;
let Dominio3Medio;
let Dominio3Alto;
let Dominio3MuyAlto;
let colorDominioTres;
let DominioTres = ((respuesta20+respuesta21+respuesta22+respuesta18+respuesta19+respuesta26+respuesta27)/length).toFixed(2);
if(DominioTres < 5){
  colorDominioTres  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio3Nulo=DominioTres
}else if(DominioTres >= 5 && DominioTres < 8){
  colorDominioTres=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio3Bajo= DominioTres
}else if(DominioTres >= 8 && DominioTres < 11){
  colorDominioTres=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio3Medio= DominioTres
}else if(DominioTres >= 11 && DominioTres < 14){
  colorDominioTres = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio3Alto= DominioTres
}else if(DominioTres >= 14){
  colorDominioTres= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio3MuyAlto= DominioTres
}

let Dominio4Nulo;
let Dominio4Bajo;
let Dominio4Medio;
let Dominio4Alto;
let Dominio4MuyAlto;
let colorDominioCuatro;
let DominioCuatro =( (respuesta14+respuesta15)/length).toFixed(2);
if(DominioCuatro < 1){
  colorDominioCuatro  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio4Nulo=DominioCuatro
}else if(DominioCuatro >= 1 && DominioCuatro < 2){
  colorDominioCuatro=<td width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio4Bajo= DominioCuatro
}else if(DominioCuatro >= 2 && DominioCuatro < 4){
  colorDominioCuatro = <td  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio4Medio= DominioCuatro
}else if(DominioCuatro >= 4 && DominioCuatro < 6){
  colorDominioCuatro = <td width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio4Alto= DominioCuatro
}else if(DominioCuatro >= 6){
  colorDominioCuatro= <td width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio4MuyAlto= DominioCuatro
}

let Dominio5Nulo;
let Dominio5Bajo;
let Dominio5Medio;
let Dominio5Alto;
let Dominio5MuyAlto;
let colorDominioCinco;
let DominioCinco = ((respuesta16+respuesta17)/length).toFixed(2);
if(DominioCinco < 1){
  colorDominioCinco  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio5Nulo=DominioCinco
}else if(DominioCinco >= 1 && DominioCinco < 2){
  colorDominioCinco=<td width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio5Bajo= DominioCinco
}else if(DominioCinco >= 2 && DominioCinco < 4){
  colorDominioCinco=<td width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio5Medio= DominioCinco
}else if(DominioCinco >= 4 && DominioCinco < 6){
  colorDominioCinco = <td  width="20px"style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio5Alto= DominioCinco
}else if(DominioCinco >= 6){
  colorDominioCinco= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio5MuyAlto= DominioCinco
}

let Dominio6Nulo;
let Dominio6Bajo;
let Dominio6Medio;
let Dominio6Alto;
let Dominio6MuyAlto;
let colorDominioSeis;
let DominioSeis = ((respuesta23+respuesta24+respuesta25+respuesta28+respuesta29)/length).toFixed(2);
if(DominioSeis < 3){
  colorDominioSeis  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio6Nulo=DominioSeis
}else if(DominioSeis >= 3 && DominioSeis < 5){
  colorDominioSeis=<td  width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio6Bajo= DominioSeis
}else if(DominioSeis >= 5 && DominioSeis < 8){
  colorDominioSeis=<td width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
Dominio6Medio= DominioSeis
}else if(DominioSeis >= 8 && DominioSeis < 11){
  colorDominioSeis = <td width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio6Alto= DominioSeis
}else if(DominioSeis >= 11){
  colorDominioSeis= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio6MuyAlto= DominioSeis
}

let Dominio7Nulo;
let Dominio7Bajo;
let Dominio7Medio;
let Dominio7Alto;
let Dominio7MuyAlto;
let colorDominioSiete;
let DominioSiete = ((respuesta30+respuesta31+respuesta32+respuesta44+respuesta45+respuesta46)/length).toFixed(2);
if(DominioSiete < 5){
  colorDominioSiete  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio7Nulo=DominioSiete
}else if(DominioSiete >= 5 && DominioSiete < 8){
  colorDominioSiete=<td width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio7Bajo= DominioSiete
}else if(DominioSiete >= 8 && DominioSiete < 11){
  colorDominioSiete=<td  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio7Medio= DominioSiete
}else if(DominioSiete >= 11 && DominioSiete < 14){
  colorDominioSiete = <td width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio7Alto= DominioSiete
}else if(DominioSiete >= 14){
  colorDominioSiete= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio7MuyAlto= DominioSiete
}

let Dominio8Nulo;
let Dominio8Bajo;
let Dominio8Medio;
let Dominio8Alto;
let Dominio8MuyAlto;
let colorDominioOcho;
let DominioOcho = ((respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40)/length).toFixed(2);
if(DominioOcho < 7){
  colorDominioOcho  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio8Nulo=DominioOcho
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

 a = 1
  botonDescargarResultadosGlobales =    
  <MDBBtn   gradient="purple" size="md" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
    Descargar reporte global
  </MDBBtn>
ponderacion=<React.Fragment>

  <MDBCard>
    <MDBCardHeader>
      <MDBCardTitle><center>Resultados globales de la evaluación RP</center></MDBCardTitle>
    </MDBCardHeader>
  <MDBCardBody>
  <table style={{marginLeft:"20%"}}>
    <tr>
    <td width="65%" > <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100,marginBottom:20}}/></td>
    <td width="35%" >
    <img src={diagnostico} alt="logo" style = {{width:150}}/>
    </td>
    </tr>
    </table>
    <center> 
    <font face="arial" className = "mt-4" ><center><strong>REPORTE GLOBAL DEL CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO</strong></center></font><br/>
    <strong className="text-left  ml-2 mt-4">{localStorage.getItem("razonsocial")}</strong><br/>
    <font face="arial" className = "mt-4" >FILTRADO POR: <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;  {this.state.filtro2} &nbsp;&nbsp; {this.state.filtro3} &nbsp;&nbsp;{this.state.filtro4} &nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp; {this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8} </strong> </font>

    </center>
    <br/>
<MDBContainer >

<Table   responsive small borderless className="text-left mt-4 ">
<TableHead>
<TableRow>
  <TableCell  width="13%" style={{backgroundColor: "#E6E7E8"}}>RESULTADOS GENERALES</TableCell>
    {celdaPrev}
  <TableCell width="6%"  > <strong>   TOTAL {general.toFixed(2)}  PUNTOS </strong></TableCell>
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
            <TableCell align="center" style={{backgroundColor: "#9BE0F7"}}>NULO</TableCell>
            <TableCell align="center" style={{backgroundColor: "#6BF56E"}}>BAJO&nbsp;</TableCell>
            <TableCell align="center" style={{backgroundColor: "#FFFF00"}}>MEDIO&nbsp;</TableCell>
            <TableCell align="center" style={{backgroundColor: "#FFC000"}}>ALTO&nbsp;</TableCell>
            <TableCell align="center" style={{backgroundColor: "#FF0000"}}>MUY ALTO&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  style={{marginTop:20}}>       
            <TableRow>
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS DE LA CATEGORÍA</strong></TableCell>              
              <TableCell component="th" scope="row"></TableCell>
              <TableCell component="th" scope="row" ></TableCell>
              <TableCell component="th" scope="row" ></TableCell>
              <TableCell component="th" scope="row" ></TableCell>
              <TableCell component="th" scope="row" ></TableCell>  
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row">I. Ambiente de Trabajo</TableCell>
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
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS DEL DOMÍNIO</strong></TableCell>              
              <TableCell component="th" scope="row" align="center" style={{backgroundColor: "#E6E7E8"}}></TableCell>              
              <TableCell component="th" scope="row" align="center" style={{backgroundColor: "#E6E7E8"}}></TableCell>              
              <TableCell component="th" scope="row" align="center" style={{backgroundColor: "#E6E7E8"}}></TableCell>              
              <TableCell component="th" scope="row" align="center" style={{backgroundColor: "#E6E7E8"}}></TableCell>              
              <TableCell component="th" scope="row" align="center" style={{backgroundColor: "#E6E7E8"}}></TableCell>              

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
            <TableCell component="th" scope="row" align="center" >{Dominio2Nulo}</TableCell>
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
            <TableCell component="th" scope="row"align="center">{Dominio4Nulo}</TableCell>
            <TableCell component="th" scope="row" align="center">{Dominio4Bajo}</TableCell>
            <TableCell component="th" scope="row" align="center">{Dominio4Medio}</TableCell>
            <TableCell component="th" scope="row" align="center">{Dominio4Alto}</TableCell>
            <TableCell component="th" scope="row" align="center">{Dominio4MuyAlto}</TableCell>         
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >V. Interferencia en la relación trabajo-familia</TableCell>           
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
            <TableCell component="th" scope="row" >{Dominio8Nulo}</TableCell>
            <TableCell component="th" scope="row" >{Dominio8Bajo}</TableCell>
            <TableCell component="th" scope="row" >{Dominio8Medio}</TableCell>
            <TableCell component="th" scope="row" >{Dominio8Alto}</TableCell>
            <TableCell component="th" scope="row" >{Dominio8MuyAlto}</TableCell>        
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
            <TableCell component="th" scope="row" align="center"> {(respuesta1/length).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >2.- Condiciones deficientes e insalubres</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(respuesta2/length).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
           
            <TableRow>
            <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row"align="center"> {(respuesta3/length).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >4.- Cargas cuantitativas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta4/length)+(respuesta9/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >5.- Ritmos de trabajo acelerado</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta5/length)+(respuesta6/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta7/length)+(respuesta8/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta41/length)+(respuesta42/length)+(respuesta43/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >8.- Cargas de alta responsabilidad</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta10/length)+(respuesta11/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row"  width="50%">9.- Cargas contradictorias o inconsistentes</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta12/length)+(respuesta13/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta20/length)+(respuesta21/length)+(respuesta22/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta18/length)+(respuesta19/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >12.- Limitada o inexistente capacitación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta26/length)+(respuesta27/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >13.- Jornadas de trabajo extensas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta14/length)+(respuesta15/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >14.- Influencia del trabajo fuera del centro laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(respuesta16/length).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >15.- Influencia de las responsabilidades familiares</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(respuesta17/length).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >16.- Escasa claridad de funciones</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta23/length)+(respuesta24/length)+(respuesta25/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >17.- Características del liderazgo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta28/length)+(respuesta29/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >18.- Relaciones sociales en el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta30/length)+(respuesta31/length)+(respuesta32/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >19.- Deficiente relación con los colaboradores que supervisa</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta44/length)+(respuesta45/length)+(respuesta46/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >20.- Violencia laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {((respuesta33/length)+(respuesta34/length)+(respuesta35/length)+(respuesta36/length)+(respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </MDBCardBody>
    </MDBCard>
    <div>
                <div className="example-config">
                  
                </div>

                <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
                    <PDFExport
                        paperSize="letter"
                        margin="1cm"
                        pageTemplate={PageTemplate}
                        forcePageBreak=".page-break"
                        fileName={`Resultados globales RP ${new Date().getFullYear()}`}
                        ref={(component) => this.pdfExportComponent = component}
                    >
                        <div style={{ width: "550px" }}>
                            <MDBRow style={{marginBottom:10}}> 
                             <MDBCol>
                             <MDBTable component={Paper}  small borderless className="text-left">
                            <MDBTableBody>  
                            <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>

                                <font size="3"face="arial"color="black">Reporte global de factores de riesgo psicosocial en los centros de trabajo</font><br></br>  <br></br>  
                              <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")} </font><br></br>  
                              <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                              <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font><br/>
                              <font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              </MDBTableBody>
                              </MDBTable>    
                              <center>   <img src={diagnostico} alt="logo" style = {{width:120,heigth:50}}/>&nbsp;&nbsp;&nbsp;<img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,heigth:20}}/></center>
                            </MDBCol> 
                            </MDBRow> 
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <center>
                              <p  className ="text-center"><strong> <font size="1"face="arial"color="black">GUÍA DE REFERENCIA II -
                              CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO</font></strong> </p>
                              </center>
                              <MDBTable bordless >
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
                              <MDBTable  bordered large  className="text-center">
                              <MDBTableBody>  
                              <tr >                              
                              <td width = "32%"><font size="1" face="arial"color="#283747" ><strong>Resultado:</strong></font></td>
                              <td width = "13%" className="text-left"><font size="1" face="arial"color="#273746"><strong>   {general.toFixed(2)}</strong></font></td>
                              <td width = "30%"><font size="1" face="arial"color="#283747"><strong> Nivel de riesgo:</strong></font></td>
                              {celda}                                  
                              </tr>   
                              </MDBTableBody>                                              
                              </MDBTable>
                              <Table  responsive small bordless  className="text-left mb-2">
                              <tr >                              
                              <td width="100%"><font size="2" face="arial"color="black" ><strong>Necesidad de la acción : </strong></font></td>                                    
                              </tr>
                              <tr>
                                <td width="100%"><font size="1" face="arial"color="black" >{criterios}</font></td>
                              </tr>
                              </Table>

                                <MDBTable  component={Paper}  small  className="text-left ">
                                  <MDBTableBody>
                                <font color="red" style= {{marginTop:40}}  size="1">I.- Resultados de la categoría</font>
                                </MDBTableBody>                                                                            
                                </MDBTable>
                                <table width="550" className="table-bordered table-lg"> 
                                      
                                      <tr>                              
                                      <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                      <td width="60%"><font size="1" face="arial"color="black">Categoría</font></td>
                                      <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                      <td><font size="1" face="arial"color="black">Riesgo</font></td>                                         
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
                                      <td  width="10%"><font size="1" face="arial"color="black" >3</font></td>
                                      <td  width="60%"><font size="1" face="arial"color="black">Organización del tiempo de trabajo</font></td>
                                      <td  width="20%"><font size="1" face="arial"color="black">{categoriaTre}</font></td>
                                      {colorCategoriaTre}
                                    </tr>
                                    <tr>         
                                      <td  width="10%"><font size="1" face="arial"color="black" >4</font></td>
                                      <td  width="60%"><font size="1" face="arial"color="black">Liderazgo y relaciones en el trabajo</font></td>
                                      <td  width="20%"><font size="1" face="arial"color="black">{categoriaCuatro}</font></td>
                                      {colorCategoriaCuatro}
                                      </tr>            
                                  </table>
                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:20}}  size="1">II.- Resultados del dominio</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                      <table width="550" className="table-bordered table-lg">                                           
                                         <tr >                              
                                          <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                          <td width="60%" className="text-left"><font size="1" face="arial"color="black">Dominio</font></td>
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
                                          <td width="60%"><font size="1" face="arial"color="black">Carga de trabajo</font></td>
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
                                          <td width="60%" className="text-left"><font size="1" face="arial"color="black">Jornada de trabajo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{DominioCuatro}</font></td>
                                          {colorDominioCuatro}
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
                                    
                                     </table>

                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:20}}  size="1">III.- Resultados por Dimensión</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                      <table width="550" className="table-bordered table-lg">                                           
                                         <tr >                              
                                          <td  width="10%"><font size="1" face="arial"color="black" ></font></td>
                                          <td  width="60%"><font size="1" face="arial"color="black">Dimensión</font></td>
                                          <td  width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                        </tr>
                                        <tr>           
                                        <td  width="10%"><font size="1" face="arial"color="black" >1</font></td>
                                        <td  width="60%"><font size="1" face="arial"color="black">Condiciones peligrosas e inseguras</font></td>
                                        <td  width="20%"><font size="1" face="arial"color="black">{(respuesta1/length).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{(respuesta2/length).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="60%" className="text-left"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{(respuesta3/length).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta4/length)+(respuesta9/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta5/length)+(respuesta6/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >6</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Carga mental</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta7/length)+(respuesta8/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >7</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta41/length)+(respuesta42/length)+(respuesta43/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >8</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta10/length)+(respuesta11/length)).toFixed(2)}</font></td>
                                        </tr>


                                        <tr>           
                                        <td width="10%"><font size="1" face="arial"color="black" >9</font></td>
                                        <td width="60%"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
                                        <td width="20%"><font size="1" face="arial"color="black">{((respuesta12/length)+(respuesta13/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >10</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta20/length)+(respuesta21/length)+(respuesta22/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >11</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta18/length)+(respuesta19/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >12</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta26/length)+(respuesta27/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >13</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta14/length)+(respuesta15/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >14</font></td>
                                          <td width="60%" className="text-left"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{(respuesta16/length).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >15</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{(respuesta17/length).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >16</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta23/length)+(respuesta24/length)+(respuesta25/length)).toFixed(2)}</font></td>
                                        </tr>

                                        <tr>           
                                        <td width="10%"><font size="1" face="arial"color="black" >17</font></td>
                                        <td width="60%"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
                                        <td  width="20%"><font size="1" face="arial"color="black">{((respuesta28/length)+(respuesta29/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >18</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Relaciones sociales en el trabajo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta30/length)+(respuesta31/length)+(respuesta32/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >19</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta44/length)+(respuesta45/length)+(respuesta46/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="10%"><font size="1" face="arial"color="black" >20</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Violencia laboral</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{((respuesta33/length)+(respuesta34/length)+(respuesta35/length)+(respuesta36/length)+(respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)).toFixed(2)}</font></td>
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
                        </div>
                    </PDFExport>
                </div>
            </div>
</React.Fragment>
   } 

    let reporteIndividual;
    let botonDescargarReporteIndividual;

    if(this.state.resultados[2]  && this.state.reporteIndividual== true){ 
      botonDescargarReporteIndividual = <MDBBtn className = "text-white"  size="md" color="secondary"  className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
      Respuestas de {this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM}
      </MDBBtn>

      let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,value21,value22,value23,value24;
      let value25,value26,value27,value28,value29,value30,value31,value32,value33,value34,value35,value36,value37,value38,value39,value40,value41,value42,value43,value44,value45,value46;

      let filtrar1;
      filtrar1 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 1;
      });
      value1 = filtrar1.pop()

      let filtrar2;
      filtrar2 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 2;
      });

      value2 = filtrar2.pop()

      let filtrar3;
      filtrar3 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 3;
      });
      value3 = filtrar3.pop()


      let filtrar4;
      filtrar4 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 4;
      });
      value4 = filtrar4.pop()


      let filtrar5;
      filtrar5 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 5;
      });
      value5 = filtrar5.pop()


      let filtrar6;
      filtrar6 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 6;
      });
      value6 = filtrar6.pop()


      let filtrar7;
      filtrar7 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 7;
      });
      value7 = filtrar7.pop()


      let filtrar8;
      filtrar8 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 8;
      });
      value8 = filtrar8.pop()


      let filtrar9;
      filtrar9 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 9;
      });
      value9 = filtrar9.pop()


      let filtrar10;
      filtrar10 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 10;
      });
      value10 = filtrar10.pop()


      let filtrar11;
      filtrar11 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 11;
      });
      value11 = filtrar11.pop()

      let filtrar12;
      filtrar12 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 12;
      });
      value12 = filtrar12.pop()

      let filtrar13;
      filtrar13 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 13;
      });
      value13 = filtrar13.pop()

      let filtrar14;
      filtrar14 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 14;
      });
      value14 = filtrar14.pop()

      let filtrar15;
      filtrar15 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 15;
      });
      value15 = filtrar15.pop()

      let filtrar16;
      filtrar16 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 16;
      });
      value16 = filtrar16.pop()

      let filtrar17;
      filtrar17 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 17;
      });
      value17 = filtrar17.pop()


      let filtrar18;
      filtrar18 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 18;
      });
      value18 = filtrar18.pop()

      let filtrar19;
      filtrar19 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 19;
      });
      value19 = filtrar19.pop()

      let filtrar20;
      filtrar20=  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 20;
      });
      value20 = filtrar20.pop()

      let filtrar21;
      filtrar21 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 21;
      });
      value21 = filtrar21.pop()

        let filtrar22;
      filtrar22 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 22;
      });
      value22 = filtrar22.pop()

      let filtrar23;
      filtrar23 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 23;
      });
      value23 = filtrar23.pop()


      let filtrar24;
      filtrar24=  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 24;
      });
      value24 = filtrar24.pop()

      let filtrar25;
      filtrar25 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 25;
      });
      value25 = filtrar25.pop()

      let filtrar26;
      filtrar26 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 26;
      });
      value26 = filtrar26.pop()

      let filtrar27;
      filtrar27 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 27;
      });
      value27 = filtrar27.pop()

     
      let filtrar28;
      filtrar28 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 28;
      });
      value28 = filtrar28.pop()

      let filtrar29;
      filtrar29 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 29;
      });
      value29 = filtrar29.pop()

    
      let filtrar30;
      filtrar30 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 30;
      });
      value30 = filtrar30.pop()

      let filtrar31;
      filtrar31 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 31;
      });
      value31 = filtrar31.pop()

      let filtrar32;
      filtrar32 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 32;
      });
      value32 = filtrar32.pop()


      let filtrar33;
      filtrar33 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 33;
      });
      value33 = filtrar33.pop()

      let filtrar34;
      filtrar34 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 34;
      });
      value34 = filtrar34.pop()

      let filtrar35;
      filtrar35 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 35;
      });
      value35 = filtrar35.pop()

      let filtrar36;
      filtrar36 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 36;
      });
      value36 = filtrar36.pop()

      let filtrar37;
      filtrar37 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 37;
      });
      value37 = filtrar37.pop()

      let filtrar38;
      filtrar38 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 38;
      });
      value38 = filtrar38.pop()

       let filtrar39;
      filtrar39 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 39;
      });
      value39 = filtrar39.pop()

      let filtrar40;
      filtrar40 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 40;
      });
      value40 = filtrar40.pop()

      
      let filtrar41;
      filtrar41 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 41;
      });  
      value41 = filtrar41.pop()


      let filtrar42;
      filtrar42 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 42;
      });  
      value42 = filtrar42.pop()

      
      let filtrar43;
      filtrar43 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 43;
      });
      value43 = filtrar43.pop()
  
      
      let filtrar44;
      filtrar44 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 44;
      }); 
      value44 = filtrar44.pop()


      let filtrar45;
      filtrar45 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 45;
      }); 
      value45 = filtrar45.pop()


       let filtrar46;
      filtrar46 =  this.state.resultados.filter(function(hero) {
        return hero.fk_preguntasRP == 46;
      });  
      value46 = filtrar46.pop()

      a = 1
      // console.log("este es lo que contiene el estado ")
      reporteIndividual =
    
        <React.Fragment>
          <section className="flex-column  bg-white  pa4 "  >
          <MDBCard>
          <MDBCardHeader>
              <MDBCardTitle><center>Resultados de la aplicación de la evaluación RP</center></MDBCardTitle>
            </MDBCardHeader>
          <MDBCardBody>
           <table style={{marginLeft:"20%"}}>
            <tr>
            <td width="65%" > <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100,marginBottom:20}}/></td>
            <td width="35%" >
            <img src={diagnostico} alt="logo" style = {{width:150}}/>
            </td>
            </tr>
            </table>
            <center> 
            <font face="arial" className = "mt-4" ><center><strong>CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO</strong></center></font><br/>
            <strong className="text-left  ml-2 mt-4">{localStorage.getItem("razonsocial")}</strong><br/>
            <table  style={{marginLeft:"10%"}} className="mt-4">
              <tr>
                <td width="40%"><strong>{this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM}</strong></td>
                <td width="20%"></td>
                <td width="40%"><strong>{this.state.resultados[0].RFC}</strong></td>
              </tr>
              <tr>
                <td><strong>{this.state.resultados[0].correo}</strong></td>
              </tr>
            </table>
            </center>     
                <MDBContainer style={{marginLeft:20}}>
                <MDBTable component={Paper}  small borderless className="text-left mt-4 ml-4 " responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th  width="70%"><strong>I. Las condiciones de su centro de trabajo, así como la cantidad y ritmo de trabajo.</strong></th>    
                      <td width="25%"></td>   
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                      <td>1</td>
                      <td>Mi trabajo me exige hacer mucho esfuerzo físico.</td>
                      <td >{value1.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Me preocupa sufrir un accidente en mi trabajo.</td>
                      <td >{value2.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Considero que las actividades que realizo son peligrosas</td>
                      <td >{value3.Respuestas.toUpperCase()}</td> 
                    </tr>                    
                    <tr>
                      <td>4</td>
                      <td>Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno.</td>
                      <td >{value4.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Por la cantidad de trabajo que tengo debo trabajar sin parar.</td>
                      <td >{value5.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Considero que es necesario mantener un ritmo de trabajo acelerado.</td>
                      <td >{value6.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Mi trabajo exige que esté muy concentrado.</td>
                      <td >{value7.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Mi trabajo requiere que memorice mucha información.</td>
                      <td >{value8.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Mi trabajo exige que atienda varios asuntos al mismo tiempo.</td>
                      <td >{value9.Respuestas.toUpperCase()}</td> 
                    </tr>
 
                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th><strong>II. Las actividades que realiza en su trabajo y las responsabilidades que tiene.</strong></th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>10</td>
                      <td>En mi trabajo soy responsable de cosas de mucho valor.</td>   
                      <td >{value10.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>Respondo ante mi jefe por los resultados de toda mi área de trabajo.</td>   
                      <td >{value11.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>En mi trabajo me dan órdenes contradictorias.</td>   
                      <td >{value12.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>13</td>
                      <td>Considero que en mi trabajo me piden hacer cosas innecesarias.</td>   
                      <td >{value13.Respuestas.toUpperCase()}</td> 
                    </tr>
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th><strong>III. El tiempo destinado a su trabajo y sus responsabilidades familiares.</strong></th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>14</td>
                      <td>Trabajo horas extras más de tres veces a la semana.</td>   
                      <td >{value14.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>Mi trabajo me exige laborar en días de descanso, festivos o fines de semana.</td>   
                      <td >{value15.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>16</td>
                      <td>Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales.</td>   
                      <td >{value16.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>17</td>
                      <td>Pienso en las actividades familiares o personales cuando estoy en mi trabajo.</td>   
                      <td >{value17.Respuestas.toUpperCase()}</td> 
                    </tr>
                   
                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th><strong>IV. Las decisiones que puede tomar en su trabajo.</strong></th>       
                      <td ></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>18</td>
                      <td>Mi trabajo permite que desarrolle nuevas habilidades.</td>   
                      <td >{value18.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>19</td>
                      <td>En mi trabajo puedo aspirar a un mejor puesto.</td>   
                      <td >{value19.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>20</td>
                      <td>Durante mi jornada de trabajo puedo tomar pausas cuando las necesito.</td>   
                      <td >{value20.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>21</td>
                      <td>Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo.</td>   
                      <td >{value21.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>22</td>
                      <td>Puedo cambiar el orden de las actividades que realizo en mi trabajo.</td>   
                      <td >{value22.Respuestas.toUpperCase()}</td> 
                    </tr>
                  
                  </MDBTableBody>
                   </MDBTable>
     
                   <MDBTable responsive small borderless className="text-left">

                  <MDBTableHead>
                    <tr>
                      <th  width="5%"></th>
                      <th width="70%"><strong>V. La capacitación e información que recibe sobre su trabajo.</strong></th>       
                      <td  width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>23</td>
                      <td>Me informan con claridad cuáles son mis funciones.</td>   
                      <td>{value23.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>24</td>
                      <td>Me explican claramente los resultados que debo obtener en mi trabajo.</td>   
                      <td >{value24.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>25</td>
                      <td>Me informan con quién puedo resolver problemas o asuntos de trabajo.</td>   
                      <td >{value25.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>26</td>
                      <td>Me permiten asistir a capacitaciones relacionadas con mi trabajo.</td>   
                      <td >{value26.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td >27</td>
                      <td >Recibo capacitación útil para hacer mi trabajo.</td>   
                      <td  >{value27.Respuestas.toUpperCase()}</td> 
                    </tr>
                  </MDBTableBody>

                  <br/>
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th ><strong>VI. Las relaciones con sus compañeros de trabajo y su jefe.</strong></th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>28</td>
                      <td>Mi jefe tiene en cuenta mis puntos de vista y opiniones.</td>   
                      <td >{value28.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>29</td>
                      <td>Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo.</td>   
                      <td >{value29.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>30</td>
                      <td>Puedo confiar en mis compañeros de trabajo.</td>   
                      <td >{value30.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>31</td>
                      <td>Cuando tenemos que realizar trabajo de equipo los compañeros colaboran.</td>   
                      <td >{value31.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>32</td>
                      <td>Mis compañeros de trabajo me ayudan cuando tengo dificultades.</td>   
                      <td>{value32.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>33</td>
                      <td>En mi trabajo puedo expresarme libremente sin interrupciones.</td>   
                      <td >{value33.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>34</td>
                      <td>Recibo críticas constantes a mi persona y/o trabajo.</td>   
                      <td >{value34.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>35</td>
                      <td>Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones.</td>   
                      <td>{value35.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>36</td>
                      <td>Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones.</td>   
                      <td >{value36.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>37</td>
                      <td>Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador.</td>   
                      <td >{value37.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>38</td>
                      <td>Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores.</td>   
                      <td>{value38.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>39</td>
                      <td>Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo.</td>   
                      <td >{value39.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>40</td>
                      <td>He presenciado actos de violencia en mi centro de trabajo.</td>   
                      <td >{value40.Respuestas.toUpperCase()}</td> 
                    </tr>
                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th><strong>VII. En mi trabajo debo brindar servicio a clientes o usuarios:</strong></th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>41</td>
                      <td>Atiendo clientes o usuarios muy enojados.</td>   
                      <td >{value41.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>42</td>
                      <td>Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas.</td>   
                      <td >{value42.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>43</td>
                      <td>Para hacer mi trabajo debo demostrar sentimientos distintos a los míos.</td>   
                      <td>{value43.Respuestas.toUpperCase()}</td> 
                    </tr>
                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>VIII. Soy jefe de otros trabajadores:</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>44</td>
                      <td>Comunican tarde los asuntos de trabajo.</td>   
                      <td >{value44.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>45</td>
                      <td>Dificultan el logro de los resultados del trabajo.</td>   
                      <td >{value45.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                      <td>46</td>
                      <td>Ignoran las sugerencias para mejorar su trabajo.</td>   
                      <td >{value46.Respuestas.toUpperCase()}</td> 
                    </tr>
                  </MDBTableBody>
                </MDBTable> 
                </MDBContainer>
                </MDBCardBody>  
                </MDBCard>
                <div>
                        <div className="example-config">    
                        </div>
                        <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
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
                                    <MDBTable component={Paper}  small borderless className="text-left">
                                    <MDBTableBody>  
                                    <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                                    <font size="2"face="arial"color="black">Reporte individual para identificar los factores de Riesgo Psicosocial en los centros de trabajo</font><br></br>
                                    <font size="1"face="arial"color="black"> <strong>{localStorage.getItem("razonsocial")}</strong></font><br></br>          
                                    <font size="1"face="arial"color="black">{this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM}</font><br></br><br/>
                                    <br/><font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
                                      <br></br>
                                      <br></br>
                                      <br></br>
                                      <br></br>
                                      </MDBTableBody>
                                      </MDBTable>    
                                      <center>   <img src={diagnostico} alt="logo" style = {{width:120,heigth:50}}/>&nbsp;&nbsp;&nbsp;<img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,heigth:20}}/></center>
                                    </MDBCol> 
                                    </MDBRow>
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>  
                                    <br/>
                                    <br/>
                                    <center>
                                    <font size="1"
                                        face="arial"
                                        color="black" ><strong>GUÍA DE REFERENCIA III
                                        CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN
                                        LOS CENTROS DE TRABAJO</strong></font> <br/><br/>
                                        </center>
                      
                                    <font color="red" style= {{marginTop:25,marginLeft:20}}  size="1">I. Las condiciones de su centro de trabajo, así como la cantidad y ritmo de trabajo.</font>
                                    <table width="500" style = {{marginLeft:25}} className="table-bordered ">                                         
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >Mi trabajo me exige hacer mucho esfuerzo físico.</font></td>
                                    <td width="90px"><font size="1" face="arial"color="black" >{value1.Respuestas}</font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Me preocupa sufrir un accidente en mi trabajo.</font></td>
                                    <td width="90px" ><font size="1" face="arial"color="black" >{value2.Respuestas}</font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Considero que las actividades que realizo son peligrosas</font></td>
                                    <td  width="90px"><font size="1" face="arial"color="black" >{value3.Respuestas}</font></td> 
                                  </tr>                    
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno.</font></td>
                                    <td  width="90px"><font size="1" face="arial"color="black" >{value4.Respuestas}</font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo trabajar sin parar.</font></td>
                                    <td  width="90px"><font size="1" face="arial"color="black" >{value5.Respuestas}</font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Considero que es necesario mantener un ritmo de trabajo acelerado.</font></td>
                                    <td width="90px"><font size="1" face="arial"color="black" >{value6.Respuestas}</font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Mi trabajo exige que esté muy concentrado.</font></td>
                                    <td width="90px"><font size="1" face="arial"color="black" >{value7.Respuestas} </font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Mi trabajo requiere que memorice mucha información.</font></td>
                                    <td width="90px"><font size="1" face="arial"color="black" >{value8.Respuestas}</font></td> 
                                  </tr>
                                  <tr>
                                    <td><font size="1" face="arial"color="black" >Mi trabajo exige que atienda varios asuntos al mismo tiempo.</font></td>
                                    <td width="90px"><font size="1" face="arial"color="black" >{value9.Respuestas}</font></td> 
                                  </tr>
                                   </table>
                                   <font color="red" style= {{marginTop:25,marginLeft:20}}   size="1">II. Las actividades que realiza en su trabajo y las responsabilidades que tiene.</font>
                                    <table width="500" style = {{marginLeft:25}} className="table-bordered ">
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >En mi trabajo soy responsable de cosas de mucho valor.</font></td>   
                                    <td width="90px"><font size="1" face="arial"color="black" >{value10.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Respondo ante mi jefe por los resultados de toda mi área de trabajo.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value11.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >En mi trabajo me dan órdenes contradictorias.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value12.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Considero que en mi trabajo me piden hacer cosas innecesarias.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value13.Respuestas}</font></td> 
                                    </tr>
                                    </table>

                                    <font style= {{marginLeft:25}}  size="1" color="red" >III. El tiempo destinado a su trabajo y sus responsabilidades familiares.</font>

                                    <table  width="500"  style = {{marginLeft:25}} className="table-bordered">
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >Trabajo horas extras más de tres veces a la semana.</font></td>   
                                    <td width="90px"><font size="1" face="arial"color="black" >{value14.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Mi trabajo me exige laborar en días de descanso, festivos o fines de semana.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value15.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value16.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Pienso en las actividades familiares o personales cuando estoy en mi trabajo.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value17.Respuestas}</font></td> 
                                    </tr>
                                    </table>
                                    <font color="red" style= {{marginTop:25,marginLeft:20}}  size="1" >IV. Las decisiones que puede tomar en su trabajo.</font>
                                    <table  width="500"  style = {{marginLeft:25}} className="table-bordered">
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >Mi trabajo permite que desarrolle nuevas habilidades.</font></td>   
                                    <td width="90px"><font size="1" face="arial"color="black" >{value18.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >En mi trabajo puedo aspirar a un mejor puesto.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value19.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Durante mi jornada de trabajo puedo tomar pausas cuando las necesito.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value20.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value21.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Puedo cambiar el orden de las actividades que realizo en mi trabajo.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value22.Respuestas}</font></td> 
                                    </tr>
                                     </table>
                                    <font color="red" style= {{marginTop:25,marginLeft:20}}  size="1" >V. La capacitación e información que recibe sobre su trabajo.</font>
                                    <table  width="500"  style = {{marginLeft:25}} className="table-bordered">
                                    <tr>
                                    <td><font size="1" face="arial"color="black" >Me informan con claridad cuáles son mis funciones.</font></td>   
                                    <td width="90px"><font size="1" face="arial"color="black" >{value23.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Me explican claramente los resultados que debo obtener en mi trabajo.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value24.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Me informan con quién puedo resolver problemas o asuntos de trabajo.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value25.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1" face="arial"color="black" >Me permiten asistir a capacitaciones relacionadas con mi trabajo.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value26.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td ><font size="1" face="arial"color="black" >Recibo capacitación útil para hacer mi trabajo.</font></td>   
                                      <td width="90px"><font size="1" face="arial"color="black" >{value27.Respuestas}</font></td> 
                                    </tr>
                                    </table>
                                    <font color="red" style= {{marginTop:25,marginLeft:20}}  size="1" >VI. Las relaciones con sus compañeros de trabajo y su jefe.</font>                                   
                                    <table  width="500"  style = {{marginLeft:25}} className="table-bordered">
                                    <tr>
                                    <td><font size="1"face="arial"color="black">Mi jefe tiene en cuenta mis puntos de vista y opiniones.</font></td>   
                                    <td width="90px"><font size="1"face="arial"color="black">{value28.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo.</font></td>   
                                      <td width="90px" ><font size="1"face="arial"color="black">{value29.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Puedo confiar en mis compañeros de trabajo.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value30.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Cuando tenemos que realizar trabajo de equipo los compañeros colaboran.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value31.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Mis compañeros de trabajo me ayudan cuando tengo dificultades.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value32.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">En mi trabajo puedo expresarme libremente sin interrupciones.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value33.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Recibo críticas constantes a mi persona y/o trabajo.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value34.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value35.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value36.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value37.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value38.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value39.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">He presenciado actos de violencia en mi centro de trabajo.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value40.Respuestas}</font></td> 
                                    </tr>
                                    </table>
                                    <font color="red" style= {{marginTop:25,marginLeft:20}}  size="1" >VII. En mi trabajo debo brindar servicio a clientes o usuarios</font>                                   
                                    <table  width="500"  style = {{marginLeft:25}} className="table-bordered">
                                    <tr>
                                    <td><font size="1"face="arial"color="black">Atiendo clientes o usuarios muy enojados.</font></td>   
                                    <td width="90px"><font size="1"face="arial"color="black">{value41.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value42.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Para hacer mi trabajo debo demostrar sentimientos distintos a los míos.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value43.Respuestas}</font></td> 
                                    </tr>
                                    </table>
                                    <font color="red" style= {{marginTop:25,marginLeft:20}}  size="1" >VIII. Soy jefe de otros trabajadores</font>                                   
                                    <table width="500" style = {{marginLeft:25}} className="table-bordered ">
                                    <tr>
                                    <td><font size="1"face="arial"color="black">Comunican tarde los asuntos de trabajo.</font></td>   
                                    <td width="90px"><font size="1"face="arial"color="black">{value44.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Dificultan el logro de los resultados del trabajo.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value45.Respuestas}</font></td> 
                                    </tr>
                                    <tr>
                                      <td><font size="1"face="arial"color="black">Ignoran las sugerencias para mejorar su trabajo.</font></td>   
                                      <td width="90px"><font size="1"face="arial"color="black">{value46.Respuestas}</font></td> 
                                    </tr>
                                    </table>
                                </div>
                            </PDFExport>
                        </div>
                    </div>
          </section>
        </React.Fragment>
      }
let ponderacionIndividual; 
let botonDescargarReporteIndividualResultados;

let value1, value2, value3, value4, value5, value6, value7, value8, value9, value10
let value11, value12, value13, value14, value15, value16, value17, value18, value19, value20
let value21, value22, value23, value24, value25, value26, value27, value28, value29, value30
let value31, value32, value33, value34, value35, value36, value37, value38, value39, value40
let value41, value42, value43, value44, value45, value46;


if(this.state.resultadosEvaluacion.length > 0 && this.state.resultadosQuery.length>0 && this.state.reporteResultadosIndividual == true){

 let filtrar1;
 filtrar1 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 1;
 });
 value1=filtrar1.pop() 

 console.log("value1" , value1)
 let filtrar2;
 filtrar2 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 2;
 });
 value2=filtrar2.pop() 
 console.log("value1" , value2)

 let filtrar3;
 filtrar3 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 3;
 });
 value3=filtrar3.pop() 

 let filtrar4;
 filtrar4 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 4;
 });
 value4=filtrar4.pop() 

 let filtrar5;
 filtrar5 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 5;
 });
 value5=filtrar5.pop() 

 let filtrar6;
 filtrar6 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 6;
 });
 value6=filtrar6.pop() 

 let filtrar7;
 filtrar7 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 7;
 });
 value7=filtrar7.pop() 

 let filtrar8;
 filtrar8 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 8;
 });
 value8=filtrar8.pop() 

 let filtrar9;
 filtrar9 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 9;
 });
 value9=filtrar9.pop() 

 let filtrar10;
 filtrar10 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 10;
 });
 value10=filtrar10.pop() 

 let filtrar11;
 filtrar11 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 11;
 });
 value11=filtrar11.pop() 

 let filtrar12;
 filtrar12 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 12;
 });
 value12=filtrar12.pop() 

 let filtrar13;
 filtrar13 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 13;
 });
 value13=filtrar13.pop() 

 let filtrar14;
 filtrar14 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 14;
 });
 value14=filtrar14.pop() 

 let filtrar15;
 filtrar15 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 15;
 });
 value15=filtrar15.pop() 

 let filtrar16;
 filtrar16 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 16;
 });
 value16=filtrar16.pop() 

 let filtrar17;
 filtrar17 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 17;
 });
 value17=filtrar17.pop() 

 let filtrar18;
 filtrar18 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 18;
 });
 value18=filtrar18.pop() 

 let filtrar19;
 filtrar19 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 19;
 });
 value19=filtrar19.pop() 

 let filtrar20;
 filtrar20 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 20;
 });
 value20=filtrar20.pop() 

 let filtrar21;
 filtrar21 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 21;
 });
 value21=filtrar21.pop() 

 let filtrar22;
 filtrar22 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 22;
 });
 value22=filtrar22.pop() 

 let filtrar23;
 filtrar23 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 23;
 });
 value23=filtrar23.pop() 

 let filtrar24;
 filtrar24 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 24;
 });
 value24=filtrar24.pop() 

 let filtrar25;
 filtrar25 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 25;
 });
 value25=filtrar25.pop() 

 let filtrar26;
 filtrar26 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 26;
 });
 value26=filtrar26.pop() 

 let filtrar27;
 filtrar27 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 27;
 });
 value27=filtrar27.pop() 

 let filtrar28;
 filtrar28 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 28;
 });
 value28=filtrar28.pop() 

 let filtrar29;
 filtrar29 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 29;
 });
 value29=filtrar29.pop() 

 let filtrar30;
 filtrar30 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 30;
 });
 value30=filtrar30.pop() 

 let filtrar31;
 filtrar31 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 31;
 });
 value31=filtrar31.pop() 

 let filtrar32;
 filtrar32 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 32;
 });
 value32=filtrar32.pop() 

 let filtrar33;
 filtrar33 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 33;
 });
 value33=filtrar33.pop() 

 let filtrar34;
 filtrar34 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 34;
 });
 value34=filtrar34.pop() 

 let filtrar35;
 filtrar35 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 35;
 });
 value35=filtrar35.pop() 

 let filtrar36;
 filtrar36 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 36;
 });
 value36=filtrar36.pop() 

 let filtrar37;
 filtrar37 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 37;
 });
 value37=filtrar37.pop() 

 let filtrar38;
 filtrar38 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 38;
 });
 value38=filtrar38.pop() 

 let filtrar39;
 filtrar39 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 39;
 });
 value39=filtrar39.pop() 
 
 let filtrar40;
 filtrar40 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 40;
 });
 value40=filtrar40.pop() 

 let filtrar41;
 filtrar41 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 41;
 });
 value41=filtrar41.pop() 

 let filtrar42;
 filtrar42 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 42;
 });
 value42=filtrar42.pop() 

 let filtrar43;
 filtrar43 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 43;
 });
 value43=filtrar43.pop() 

 let filtrar44;
 filtrar44 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 44;
 });
 value44=filtrar44.pop() 

 let filtrar45;
 filtrar45 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 45;
 });
 value45=filtrar45.pop() 

 let filtrar46;
 filtrar46 =this.state.resultadosEvaluacion.filter(function(hero){
   return hero.fk_preguntasRP == 46;
 });
 value46=filtrar46.pop() 
 
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
let entero45=parseInt(valor45);let entero46=parseInt(valor46)

let total = (entero1+entero2+entero3+entero4+entero5+entero6+entero7+entero8+entero9+entero10+entero11+entero12+entero13+entero14+entero15+entero16+entero17+entero18+entero19+entero20+entero21+entero22+entero23+entero24+entero25+entero26+entero27+entero28+entero29+entero30+entero31+entero32+entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46).toFixed(2);

let celda1;
let celda2;
let celda3;
let celda4;
let celda5;
let criterios;
let color;

if(total<20){
color =<TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align="justify"><p>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</p></font></TableCell>
celda1 = <TableCell style={{backgroundColor: "#9BE0F7"}} align="right">{total}</TableCell>
}else if(total>=20 && total < 45){
  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align="justify"><p>Es necesario una mayor difusión de la política de prevención de riesgos
  psicosociales y programas para: la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral.</p></font></TableCell>
  color= <TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black" >Bajo</font></TableCell>
  celda2 = <TableCell style={{backgroundColor: "#6BF56E"}} align="right">{total}</TableCell>
}else if(total>=45 && total < 70){
  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align="justify"><p>Se requiere revisar la política de prevención de riesgos psicosociales y
  programas para la prevención de los factores de riesgo psicosocial, la
  promoción de un entorno organizacional favorable y la prevención de la
  violencia laboral, así como reforzar su aplicación y difusión, mediante un
  Programa de intervención.</p></font></TableCell>
color=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  celda3 = <TableCell style={{backgroundColor: "#FFFF00"}} align="right">{total}</TableCell>
}else if(total>=70 && total < 90){
  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align=" justify"><p>Se requiere realizar un análisis de cada categoría y dominio, de manera que
  se puedan determinar las acciones de intervención apropiadas a través de un
  Programa de intervención, que podrá incluir una evaluación específica y
  deberá incluir una campaña de sensibilización, revisar la política de
  prevención de riesgos psicosociales y programas para la prevención de los
  factores de riesgo psicosocial, la promoción de un entorno organizacional
  favorable y la prevención de la violencia laboral, así como reforzar su
  aplicación y difusión.</p></font></TableCell>
  color = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black" >Alto</font></TableCell>
 celda4 = <TableCell style={{backgroundColor: "#FFC000"}} align="right">{total}</TableCell>
}
else if( total >= 90){
  criterios = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="1" face="arial"color="black" align=" justify"><p>Se requiere realizar el análisis de cada categoría y dominio para establecer
  las acciones de intervención apropiadas, mediante un Programa de
  intervención que deberá incluir evaluaciones específicas, y contemplar
  campañas de sensibilización, revisar la política de prevención de riesgos
  psicosociales y programas para la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral, así como reforzar su aplicación y difusión.</p></font></TableCell>
 color = <TableCell style={ {backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  celda5  = <TableCell style={{backgroundColor: "#FF0000"}} align="right">{total}</TableCell>
}

let categoria1Nulo;
let categoria1Bajo;
let categoria1Medio;
let categoria1Alto;
let categoria1MuyAlto;
let colorCategoriaUno;
let categoriaUno = (entero2+entero1+entero3).toFixed(2);
// console.log("categoria1" , categoriaUno)
if(categoriaUno < 3){
  colorCategoriaUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria1Nulo= categoriaUno
}else if(categoriaUno >= 3 && categoriaUno < 5){
  colorCategoriaUno =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria1Bajo= categoriaUno
}else if(categoriaUno >= 5 && categoriaUno < 7){
  colorCategoriaUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria1Medio= categoriaUno
}else if(categoriaUno >= 7 && categoriaUno < 9){
  colorCategoriaUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria1Alto= categoriaUno
}else if(categoriaUno >= 9){
  colorCategoriaUno = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  categoria1MuyAlto= categoriaUno
}

let categoria2Nulo;
let categoria2Bajo;
let categoria2Medio;
let categoria2Alto;
let categoria2MuyAlto;
let colorCategoriaDos;
let categoriaDos = (entero4+entero9+entero5+entero6+entero7+entero8+entero41+entero42+entero43+entero10+entero11+entero12+entero13+entero20+entero21+entero22+entero18+entero19+entero26+entero27).toFixed(2);
// console.log("enteros",entero4,entero9,entero5,entero6,entero7,entero8,entero41,entero42,entero43,entero10,entero11,entero12,entero13,entero20,entero21,entero22,entero18,entero19,entero26,entero27)
if(categoriaDos < 10){
  colorCategoriaDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria2Nulo= categoriaDos
}else if(categoriaDos >= 10 && categoriaDos < 20){
  colorCategoriaDos =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria2Bajo= categoriaDos
}else if(categoriaDos >=20 && categoriaDos < 30){
  colorCategoriaDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria2Medio= categoriaDos
}else if(categoriaDos >=30 && categoriaDos < 40){
  colorCategoriaDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria2Alto= categoriaDos
}else if(categoriaDos >= 40){
  colorCategoriaDos = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  categoria2MuyAlto= categoriaDos
}
let categoria3Nulo;
let categoria3Bajo;
let categoria3Medio;
let categoria3Alto;
let categoria3MuyAlto;
let colorCategoriaTre;
let categoriaTre = (entero14+entero15+entero16+entero17).toFixed(2);
if(categoriaTre < 4){
  colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria3Nulo= categoriaTre
}else if(categoriaTre >= 4 && categoriaTre < 6){
  colorCategoriaTre =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria3Bajo= categoriaTre
}else if(categoriaTre >=6 && categoriaTre < 9){
  colorCategoriaTre=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria3Medio= categoriaTre
}else if(categoriaTre >=9 && categoriaTre < 12){
  colorCategoriaTre = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria3Alto= categoriaTre
}else if(categoriaTre >= 12){
  colorCategoriaTre = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  categoria3MuyAlto= categoriaTre
}

let categoria4Nulo;
let categoria4Bajo;
let categoria4Medio;
let categoria4Alto;
let categoria4MuyAlto;
let colorCategoriaCuatro;
let categoriaCuatro = (entero23+entero24+entero25+entero28+entero29+entero30+entero31+entero32+entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40+entero44+entero45+entero46).toFixed(2);
if(categoriaCuatro < 10){
  colorCategoriaCuatro  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  categoria4Nulo= categoriaCuatro
}else if(categoriaCuatro >= 10 && categoriaCuatro < 18){
  colorCategoriaCuatro =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  categoria4Bajo= categoriaCuatro
}else if(categoriaCuatro >=18 && categoriaCuatro < 28){
  colorCategoriaCuatro=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  categoria4Medio= categoriaCuatro
}else if(categoriaCuatro >=28 && categoriaCuatro < 38){
  colorCategoriaCuatro = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  categoria4Alto= categoriaCuatro
}else if(categoriaCuatro >= 38){
  colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  categoria4MuyAlto= categoriaCuatro
}


let Dominio1Nulo;
let Dominio1Bajo;
let Dominio1Medio;
let Dominio1Alto;
let Dominio1MuyAlto;
let colorDominioUno;
let DominioUno = (entero2+entero1+entero3).toFixed(2);
if(DominioUno < 3){
  colorDominioUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio1Nulo= DominioUno
}else if(DominioUno >= 3 && DominioUno < 5){
  colorDominioUno=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio1Bajo= DominioUno
}else if(DominioUno >= 5 && DominioUno < 7){
  colorDominioUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio1Medio= DominioUno
}else if(DominioUno >= 7 && DominioUno < 9){
  colorDominioUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio1Alto= DominioUno
}else if(DominioUno >= 9){
  colorDominioUno= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio1MuyAlto= DominioUno
}

let Dominio2Nulo;
let Dominio2Bajo;
let Dominio2Medio;
let Dominio2Alto;
let Dominio2MuyAlto;
let colorDominioDos;
let DominioDos = (entero4+entero9+entero5+entero6+entero7+entero8+entero41+entero42+entero43+entero10+entero11+entero12+entero13).toFixed(2);
if(DominioDos < 12){
  colorDominioDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio2Nulo= DominioDos
}else if(DominioDos >= 12 && DominioDos < 16){
  colorDominioDos=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio2Bajo= DominioDos
}else if(DominioDos >= 16 && DominioDos < 20){
  colorDominioDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio2Medio= DominioDos
}else if(DominioDos >= 20 && DominioDos < 24){
  colorDominioDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio2Alto= DominioDos
}else if(DominioDos >= 24){
  colorDominioDos= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio2MuyAlto= DominioDos
}

let Dominio3Nulo;
let Dominio3Bajo;
let Dominio3Medio;
let Dominio3Alto;
let Dominio3MuyAlto;
let colorDominioTres
let DominioTres = (entero20+entero21+entero22+entero18+entero19+entero26+entero27).toFixed(2);
if(DominioTres < 5){
  colorDominioTres  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio3Nulo= DominioTres
}else if(DominioTres >= 5 && DominioTres < 8){
  colorDominioTres=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio3Bajo= DominioTres
}else if(DominioTres >= 8 && DominioTres < 11){
  colorDominioTres=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio3Medio= DominioTres
}else if(DominioTres >= 11 && DominioTres < 14){
  colorDominioTres = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio3Alto= DominioTres
}else if(DominioTres >= 14){
  colorDominioTres= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio3MuyAlto= DominioTres
}

let Dominio4Nulo;
let Dominio4Bajo;
let Dominio4Medio;
let Dominio4Alto;
let Dominio4MuyAlto;
let colorDominioCuatro;
let DominioCuatro = (entero14+entero15).toFixed(2);
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
let DominioCinco = (entero16+entero17).toFixed(2);
if(DominioCinco < 1){
  colorDominioCinco  = <td width="15px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio5Nulo= DominioCinco
}else if(DominioCinco >= 1 && DominioCinco < 2){
  colorDominioCinco=<td width="15px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio5Bajo= DominioCinco
}else if(DominioCinco >= 2 && DominioCinco < 4){
  colorDominioCinco=<td width="15px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio5Medio= DominioCinco
}else if(DominioCinco >= 4 && DominioCinco < 6){
  colorDominioCinco = <td  width="15px"style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio5Alto= DominioCinco
}else if(DominioCinco >= 6){
  colorDominioCinco= <td  width="15px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio5MuyAlto= DominioCinco
}

let Dominio6Nulo;
let Dominio6Bajo;
let Dominio6Medio;
let Dominio6Alto;
let Dominio6MuyAlto;
let colorDominioSeis;
let DominioSeis = (entero23+entero24+entero25+entero28+entero29).toFixed(2);
if(DominioSeis < 3){
  colorDominioSeis  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio6Nulo= DominioSeis
}else if(DominioSeis >= 3 && DominioSeis < 5){
  colorDominioSeis=<td  width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio6Bajo= DominioSeis
}else if(DominioSeis >= 5 && DominioSeis < 8){
  colorDominioSeis=<td width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio6Medio= DominioSeis
}else if(DominioSeis >= 8 && DominioSeis < 11){
  colorDominioSeis = <td width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio6Alto= DominioSeis
}else if(DominioSeis >= 11){
  colorDominioSeis= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio6MuyAlto= DominioSeis
}

let Dominio7Nulo;
let Dominio7Bajo;
let Dominio7Medio;
let Dominio7Alto;
let Dominio7MuyAlto;
let colorDominioSiete;
let DominioSiete = (entero30+entero31+entero32+entero44+entero45+entero46).toFixed(2);

if(DominioSiete < 5){
  colorDominioSiete  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
  Dominio7Nulo= DominioSiete
}else if(DominioSiete >= 5 && DominioSiete < 8){
  colorDominioSiete=<td width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
  Dominio7Bajo= DominioSiete
}else if(DominioSiete >= 8 && DominioSiete < 11){
  colorDominioSiete=<td  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
  Dominio7Medio= DominioSiete
}else if(DominioSiete >= 11 && DominioSiete < 14){
  colorDominioSiete = <td width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
  Dominio7Alto= DominioSiete
}else if(DominioSiete >= 14){
  colorDominioSiete= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
  Dominio7MuyAlto= DominioSiete
}

let Dominio8Nulo;
let Dominio8Bajo;
let Dominio8Medio;
let Dominio8Alto;
let Dominio8MuyAlto;
let colorDominioOcho;
let DominioOcho = (entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40).toFixed(2);
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

    a = 1
    botonDescargarReporteIndividualResultados = <MDBBtn size="md" color="secondary" className="k-button text-white" onClick={() => { this.pdfExportComponent.save(); }}>
    Descargar Resultados de {this.state.resultadosQuery[0].nombre} {this.state.resultadosQuery[0].ApellidoP} {this.state.resultadosQuery[0].ApellidoM}
    </MDBBtn>
    ponderacionIndividual =  <React.Fragment>
    <MDBCard>
    <MDBCardHeader>
      <MDBCardTitle><center>Resultados individuales de la aplicación de la evaluación RP</center></MDBCardTitle>
    </MDBCardHeader>
      <MDBCardBody> 
      <table style={{marginLeft:"20%"}}>
      <tr>
      <td width="65%" > <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100,marginBottom:20}}/></td>
      <td width="35%" >
      <img src={diagnostico} alt="logo" style = {{width:150}}/>
      </td>
      </tr>
      </table>
      <center> 
      <font face="arial" className = "mt-4" ><center><strong>CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO</strong></center></font><br/>
      <strong className="text-left  ml-2 mt-4">{localStorage.getItem("razonsocial")}</strong><br/>
      <table  style={{marginLeft:"10%"}} className="mt-4">
        <tr>
          <td width="40%"><strong>{this.state.resultadosQuery[0].nombre} {this.state.resultadosQuery[0].ApellidoP} {this.state.resultadosQuery[0].ApellidoM}</strong></td>
          <td width="20%"></td>
          <td width="40%"><strong>{this.state.resultadosQuery[0].RFC}</strong></td>
        </tr>
        <tr>
          <td><strong>{this.state.resultadosQuery[0].correo}</strong></td>
        </tr>
      </table>
      </center>
      <br/> 
      <MDBContainer >
      <Table   responsive small borderless className="text-left mt-4 ">
      <TableHead>
      <TableRow>
        <TableCell  width="13%" style={{backgroundColor: "#E6E7E8"}}>RESULTADOS GENERALES</TableCell>
          {celda1}{celda2}{celda3}{celda4}{celda5}
        <TableCell width="6%"  > <strong>   TOTAL {total}  PUNTOS </strong></TableCell>
        <TableCell width="2%" ></TableCell>
        <TableCell width="1%"  ></TableCell>
      {criterios}
      </TableRow>
      </TableHead>
      </Table>
      <br/> 
      </MDBContainer>
      <TableContainer component={Paper} style={{marginBottom:30}}>
      <Table  size="small" aria-label="a dense table" >
      <TableRow>
        <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}} width="50%"><strong>Resultados Generales</strong></TableCell>              
        <TableCell component="th" scope="row"></TableCell>
        <TableCell component="th" scope="row" ></TableCell>
        <TableCell component="th" scope="row" ></TableCell>
        <TableCell component="th" scope="row" ></TableCell>
        <TableCell component="th" scope="row" ></TableCell>  
      </TableRow>
        <TableHead>
          <TableRow>
            <TableCell ></TableCell>
            <TableCell align="right" style={{backgroundColor: "#9BE0F7"}}>Nulo</TableCell>
            <TableCell align="right" style={{backgroundColor: "#6BF56E"}}>Bajo&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#FFFF00"}}>Medio&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#FFC000"}}>Alto&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#FF0000"}}>Muy Alto&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  style={{marginTop:20}}>
        <TableRow>
          <TableCell component="th" scope="row">
          Puntuación total
          </TableCell>
          <TableCell component="th" scope="row" align="center">{celda1}</TableCell>
          <TableCell component="th" scope="row" align="center">{celda2}</TableCell>
          <TableCell component="th" scope="row" align="center">{celda3}</TableCell>
          <TableCell component="th" scope="row" align="center">{celda4}</TableCell>
          <TableCell component="th" scope="row" align="center">{celda5}</TableCell>
        </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    <TableContainer component={Paper} style={{marginBottom:30}}>
      <Table  size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
            <TableCell width="50%" ></TableCell>
            <TableCell align="right" style={{backgroundColor: "#9BE0F7"}}>Nulo</TableCell>
            <TableCell align="right" style={{backgroundColor: "#6BF56E"}}>Bajo&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#FFFF00"}}>Medio&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#FFC000"}}>Alto&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#FF0000"}}>Muy Alto&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  style={{marginTop:20}}>       
            <TableRow>
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados de la Categoría</strong></TableCell>              
              <TableCell component="th" scope="row" align="center"></TableCell>
              <TableCell component="th" scope="row"align="center" ></TableCell>
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
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados del Dominio</strong></TableCell>              
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
            <TableCell component="th" scope="row" width="50%" >V. Interferencia en la relación trabajo-familia</TableCell>           
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
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados Por Dimensión</strong></TableCell>              
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
            <TableCell component="th" scope="row" align="center"> {entero2.toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >2.- Condiciones deficientes e insalubres</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {entero1.toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
           
            <TableRow>
            <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {entero3.toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >4.- Cargas cuantitativas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero4+entero9).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >5.- Ritmos de trabajo acelerado</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero5+entero6).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero7+entero8).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero41+entero42+entero43).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >8.- Cargas de alta responsabilidad</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero10+entero11).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >9.- Cargas contradictorias o inconsistentes</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero12+entero13).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero20+entero21+entero22).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero18+entero19).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >12.- Limitada o inexistente capacitación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero26+entero27).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >13.- Jornadas de trabajo extensas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero14+entero15).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >14.- Influencia del trabajo fuera del centro laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero16).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >15.- Influencia de las responsabilidades familiares</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero17).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >16.- Escasa claridad de funciones</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero23+entero24+entero25).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >17.- Características del liderazgo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero28+entero29).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >18.- Relaciones sociales en el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero30+entero31+entero32).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >19.- Deficiente relación con los colaboradores que supervisa</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero44+entero45+entero46).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >20.- Violencia laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40).toFixed(2)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
          
        </TableBody>
      </Table>

      </TableContainer>
      </MDBCardBody>
      </MDBCard>

           <div>
                <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
                    <PDFExport
                        paperSize="letter"
                        margin="1cm"
                        pageNum
                        pageTemplate={PageTemplate}
                        forcePageBreak=".page-break"
                        fileName={`${this.state.resultadosQuery[0].nombre} ${this.state.resultadosQuery[0].ApellidoP} ${this.state.resultadosQuery[0].ApellidoM} Resultados RP ${new Date().getFullYear()}`}
                        ref={(component) => this.pdfExportComponent = component}
                    >
                        <div style={{ width: "550px" }}>
                  
                            <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                            <MDBTable  component={Paper}  small borderless className="text-left mt-4 ">
                            <MDBTableBody>     
                            <font size="3"face="arial"color="black">Reporte de resultados del diagnóstico individual de factores de Riesgo Psicosocial en los Centros de Trabajo</font><br></br><br></br>
                            <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                            <font size="1"face="arial"color="black">{this.state.resultadosQuery[0].nombre} {this.state.resultadosQuery[0].ApellidoP} {this.state.resultadosQuery[0].ApellidoM}</font><br></br>
                            <font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
                            </MDBTableBody>
                            <br></br>
                            <br></br>
                            </MDBTable>
                            <center>   <img src={diagnostico} alt="logo" style = {{width:120,heigth:50}}/>&nbsp;&nbsp;&nbsp;<img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,heigth:20}}/></center>
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
                              <center>
                              <p  className ="text-center"><strong> <font size="1"face="arial"color="black">GUÍA DE REFERENCIA II
                              CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN
                              LOS CENTROS DE TRABAJO</font></strong> </p>
                              </center>
                                <MDBTable bordless >
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
                                <MDBTable  large bordered  className="text-center">
                                <MDBTableBody>  
                                <tr >                              
                                <td width = "32%"><font size="1" face="arial"color="#283747" ><strong>Resultado:</strong></font></td>
                                <td width = "13%" className="text-left"><font size="1" face="arial"color="#273746"><strong>   {total}</strong></font></td>
                                <td width = "30%"><font size="1" face="arial"color="#283747"><strong> Nivel de riesgo:</strong></font></td>
                                {color}                                  
                                </tr>   
                                </MDBTableBody>                                              
                                </MDBTable>
                                <Table  responsive small bordless  className="text-left mb-2">
                                <tr >                              
                                <td width="100%"><font size="2" face="arial"color="black" ><strong>Necesidad de la acción : </strong></font></td>                                
                                </tr>
                                <tr>
                                  <td width="100%"><font size="1" face="arial"color="black" >{criterios}</font></td>
                                </tr>
                                </Table>
                                <font color="red" style= {{marginTop:40}}  size="1">I.- Resultados de la categoría</font>
                                <table WIDTH="550" className="table-bordered"> 
                                <tr >                              
                                  <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                  <td width="60%" className="text-left"><font size="1" face="arial"color="black">Categoría</font></td>
                                  <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                  <td><font size="1" face="arial"color="black">Riesgo</font></td>                                         
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
                                </table>
                                <font color="red" style= {{marginTop:40}}  size="1">II.- Resultados del dominio</font>
                                <table  WIDTH="550"  className="table-bordered table-lg"> 
                                <tr >                              
                                <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Dominio</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                <td ><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                </tr>
                                <tr>           
                                <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
                                <td width="60%"  className="text-left"><font size="1" face="arial"color="black">Condiciones en el ambiente de trabajo</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{DominioUno}</font></td>
                                {colorDominioUno}                
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Carga de trabajo</font></td>
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
                                <td width="20%"><font size="1" face="arial"color="black" >4</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Jornada de trabajo</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{DominioCuatro}</font></td>
                                {colorDominioCuatro}
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Interferencia en la relación trabajo-familia</font></td>
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
                                </table>        
                               
                                <font color="red" style= {{marginTop:40}}  size="1">III.- Resultados por Dimensión</font>
                                
                                <table  WIDTH="550" className="table-bordered table-lg"> 
                                <tr >                              
                                <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Dimensión</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                </tr>
                                <tr>           
                                <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
                                <td width="60%"  className="text-left"><font size="1" face="arial"color="black">Condiciones peligrosas e inseguras</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{entero2.toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{entero1.toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{entero3.toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero4+entero9).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero5+entero6).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >6</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Carga mental</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero7+entero8).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >7</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero41+entero42+entero43).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >8</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero10+entero11).toFixed(2)}</font></td>
                                </tr>

                                <tr>           
                                <td width="10%"><font size="1" face="arial"color="black" >9</font></td>
                                <td width="60%"  className="text-left"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero12+entero13).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >10</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero20+entero21+entero22).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >11</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero18+entero19).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >12</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero26+entero27).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >13</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero14+entero15).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >14</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{entero16.toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >15</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero17).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >16</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero23+entero24+entero25).toFixed(2)}</font></td>
                                </tr>
                                <tr>           
                                <td width="10%"><font size="1" face="arial"color="black" >17</font></td>
                                <td width="60%"  className="text-left"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero28+entero29).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >18</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Relaciones sociales en el trabajo</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero30+entero31+entero32).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >19</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{(entero44+entero45+entero46).toFixed(2)}</font></td>
                                </tr>
                                <tr>         
                                <td width="10%"><font size="1" face="arial"color="black" >20</font></td>
                                <td width="60%" className="text-left"><font size="1" face="arial"color="black">Violencia laboral</font></td>
                                <td width="20%"><font size="1" face="arial"color="black">{entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40}</font></td>
                                </tr>
                                </table>
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
      <div>
      <MDBBtn style={{width:"70%"}} className = "text-white" disabled={!this.state.botonResultados} onClick={e=>this.consultarDatosFiltrados(datosEmpleados,filtro,periodoTabla)} color="success" size="md">Descarga de reporte global</MDBBtn>
      <MDBBtn style={{width:"70%"}} className = "text-white"  disabled={!this.state.botonResultados} onClick={e=>this.reporteImasivo(datosEmpleados,filtro,periodoTabla)}  color="success" size="md"> Descarga masiva de evaluaciones</MDBBtn>
      <MDBBtn style={{width:"70%"}} className = "text-white"  disabled={!this.state.botonResultados} onClick={e=>this.reporteImasivoResultados(datosEmpleados,filtro,periodoTabla)} color="success" size="md">Descarga masiva de resultados</MDBBtn> 
      <MDBBtn style={{width:"70%"}} className = "text-white"  disabled={!this.state.botonResultados} onClick={e=>this.reporteEjecutivo(datosEmpleados,filtro,periodoTabla)} color="success" size="md">Descarga del reporte ejecutivo</MDBBtn> 
      </div>  
    }
  
    let PDFRespuestasMasivos;
    if(this.state.reporteImasivo[0]){
      PDFRespuestasMasivos =  
        <div> 
              <MDBBtn   color="primary" size="md"  onClick={() => { this.pdfExportComponent.save(); }}>
                  Reporte de evaluaciones masivas
              </MDBBtn>
       
         <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
         <section className="flex-column  bg-white  pa4 "  >
          <PDFExport
                   paperSize="A4"
                   margin="1cm"
                   pageTemplate={PageTemplate}
                   forcePageBreak=".page-break"
                   ref={(component) => this.pdfExportComponent = component}
                   fileName={`Repuestas del total de empleados ${new Date().getFullYear()}`}
               >
                 
                  
                    
             {this.state.reporteImasivo.map(rows=>{
               if(rows[0]){
                let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,value21,value22,value23,value24;
                let value25,value26,value27,value28,value29,value30,value31,value32,value33,value34,value35,value36,value37,value38,value39,value40,value41,value42,value43,value44,value45,value46;
          
                let filtrar1;
                filtrar1 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 1;
                });
                value1=filtrar1.pop() 

                let filtrar2;
                filtrar2 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 2;
                });
                value2= filtrar2.pop() 
          
                let filtrar3;
                filtrar3 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 3;
                });
                value3 = filtrar3.pop() 
          
                let filtrar4;
                filtrar4 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 4;
                });
                value4 = filtrar4.pop() 
          
                let filtrar5;
                filtrar5 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 5;
                });
                value5 = filtrar5.pop() 
                          
                let filtrar6;
                filtrar6 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 6;
                });
                value6 = filtrar6.pop() 
          
                let filtrar7;
                filtrar7 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 7;
                });
                value7 = filtrar7.pop() 
          
                let filtrar8;
                filtrar8 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 8;
                });
                value8= filtrar8.pop() 
          
                let filtrar9;
                filtrar9 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 9;
                });
                value9 = filtrar9.pop() 
          
                let filtrar10;
                filtrar10 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 10;
                });
                value10 = filtrar10.pop() 
          
                let filtrar11;
                filtrar11 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 11;
                });
                value11= filtrar11.pop() 

                let filtrar12;
                filtrar12 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 12;
                });
                value12 = filtrar12.pop() 

                let filtrar13;
                filtrar13 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 13;
                });
                value13 = filtrar13.pop() 

                let filtrar14;
                filtrar14 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 14;
                });
                value14 = filtrar14.pop() 

                let filtrar15;
                filtrar15 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 15;
                });
                value15 = filtrar15.pop() 

                let filtrar16;
                filtrar16 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 16;
                });
                value16 = filtrar16.pop() 

                let filtrar17;
                filtrar17 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 17;
                });
                value17= filtrar17.pop() 
          
                let filtrar18;
                filtrar18 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 18;
                });
                value18 = filtrar18.pop() 

                let filtrar19;
                filtrar19 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 19;
                });
                value19 = filtrar19.pop() 

                let filtrar20;
                filtrar20= rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 20;
                });
                value20 = filtrar20.pop() 

                let filtrar21;
                filtrar21 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 21;
                });
                value21 = filtrar21.pop() 

                  let filtrar22;
                filtrar22 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 22;
                });
                value22 = filtrar22.pop() 

                let filtrar23;
                filtrar23 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 23;
                });
                value23 = filtrar23.pop() 

                let filtrar24;
                filtrar24= rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 24;
                });
                value24 = filtrar24.pop() 

                let filtrar25;
                filtrar25 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 25;
                });
                value25 = filtrar25.pop() 

                let filtrar26;
                filtrar26 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 26;
                });
                value26 = filtrar26.pop() 

                let filtrar27;
                filtrar27 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 27;
                });
                value27 = filtrar27.pop() 
               
                let filtrar28;
                filtrar28 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 28;
                });
                value28 = filtrar28.pop() 
                let filtrar29;
                filtrar29 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 29;
                });
                value29 = filtrar29.pop() 
              
                let filtrar30;
                filtrar30 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 30;
                });
                value30 = filtrar30.pop() 

                let filtrar31;
                filtrar31 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 31;
                });
                value31 = filtrar31.pop() 

                let filtrar32;
                filtrar32 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 32;
                });
                value32 = filtrar32.pop() 

                let filtrar33;
                filtrar33 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 33;
                });
                value33 = filtrar33.pop() 

                let filtrar34;
                filtrar34 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 34;
                });
                value34 = filtrar34.pop() 

                let filtrar35;
                filtrar35 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 35;
                });
                value35 = filtrar35.pop() 

                let filtrar36;
                filtrar36 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 36;
                });
                value36 =filtrar36.pop() 

                let filtrar37;
                filtrar37 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 37;
                });
                value37 = filtrar37.pop() 

                let filtrar38;
                filtrar38 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 38;
                });
                value38 = filtrar38.pop() 

                 let filtrar39;
                filtrar39 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 39;
                });
                value39 = filtrar39.pop() 

                let filtrar40;
                filtrar40 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 40;
                });
                value40 = filtrar40.pop() 
                
                let filtrar41;
                filtrar41 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 41;
                });  
                value41= filtrar41.pop() 
          
                let filtrar42;
                filtrar42 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 42;
                }); 
                value42 = filtrar42.pop() 
                
                let filtrar43;
                filtrar43 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 43;
                });
                value43 = filtrar43.pop()  
                
                let filtrar44;
                filtrar44 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 44;
                }); 
                value44= filtrar44.pop() 
          
                let filtrar45;
                filtrar45 = rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 45;
                }); 
                value45 = filtrar45.pop() 
          
                 let filtrar46;
                filtrar46 =  rows.filter(function(hero) {
                  return hero.fk_preguntasRP == 46;
                });  
                value46 = filtrar46.pop() 

               return(
                <div style={{ width: "550px" }}>
                 
               <div>
                 <MDBRow style={{marginBottom:10}}> 
                <MDBCol>
                <img src={logo} alt="logo" style = {{width:550}}/>
                <MDBTable  component={Paper}  small borderless className="text-left mt-4 ">
                <MDBTableBody>  
                <font size="3"face="arial"color="black">Reporte individual masivo para identificar los factores de Riesgo Psicosocial en los centros de trabajo</font><br></br>  <br></br>
                <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")} </font><br></br>  
                <font color="black" className= "textleft"  size="1"><strong>{rows[0].nombre} {rows[0].ApellidoP} {rows[0].ApellidoM}</strong></font><br/>        
                <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font><br/>
                <font color="black" className= "textleft"  size="1">Periodo: <strong>{rows[0].Periodo}</strong></font><br/>
                <font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                </MDBTableBody>
                </MDBTable>    
                <center>   <img src={diagnostico} alt="logo" style = {{width:120,heigth:50}}/>&nbsp;&nbsp;&nbsp;<img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,heigth:20}}/></center>
                </MDBCol> 
                </MDBRow> 
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
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <center><font size="1" face="arial" color="black" style = {{marginTop:25}}>GUÍA DE REFERENCIA II
                  CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO
                 </font> </center> <br/>
                 <p style={{textAlign: 'left'}}> <font color="red"  size="1">I. Las condiciones de su centro de trabajo, así como la cantidad y ritmo de trabajo.</font></p>
                <table width="530"  className="table-bordered " > 
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo me exige hacer mucho esfuerzo físico.</font></td>
                <td width="20%"><font size="1" face="arial"color="black" >{value1.Respuestas}</font></td> 
              </tr>
              <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Me preocupa sufrir un accidente en mi trabajo.</font></td>
                <td width="20%" ><font size="1" face="arial"color="black" >{value2.Respuestas}</font></td> 
              </tr>
              <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Considero que las actividades que realizo son peligrosas</font></td>
                <td width="20%"><font size="1" face="arial"color="black" >{value3.Respuestas}</font></td> 
              </tr>                    
              <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno.</font></td>
                <td width="20%"><font size="1" face="arial"color="black" >{value4.Respuestas}</font></td> 
              </tr>
              <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Por la cantidad de trabajo que tengo debo trabajar sin parar.</font></td>
                <td width="20%"><font size="1" face="arial"color="black" >{value5.Respuestas}</font></td> 
              </tr>
              <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Considero que es necesario mantener un ritmo de trabajo acelerado.</font></td>
                <td width="20%"><font size="1" face="arial"color="black" >{value6.Respuestas}</font></td> 
              </tr>
              <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo exige que esté muy concentrado.</font></td>
                <td width="20%"><font size="1" face="arial"color="black" >{value7.Respuestas} </font></td> 
              </tr>
              <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo requiere que memorice mucha información.</font></td>
                <td width="20%"><font size="1" face="arial"color="black" >{value8.Respuestas}</font></td> 
              </tr>
              <tr>
                <td width="80%"> <font size="1" face="arial"color="black" >Mi trabajo exige que atienda varios asuntos al mismo tiempo.</font></td>
                <td width="20%"><font size="1" face="arial"color="black" >{value9.Respuestas}</font></td> 
              </tr>
              </table>
                <p style={{textAlign: 'left'}}><font color="red" size="1"> II. Las actividades que realiza en su trabajo y las responsabilidades que tiene.</font></p>
                <table width="530" className="table-bordered">
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >En mi trabajo soy responsable de cosas de mucho valor.</font></td>   
                <td width="20%"><font size="1" face="arial"color="black" >{value10.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Respondo ante mi jefe por los resultados de toda mi área de trabajo.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value11.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >En mi trabajo me dan órdenes contradictorias.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value12.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Considero que en mi trabajo me piden hacer cosas innecesarias.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value13.Respuestas}</font></td> 
                </tr>
                </table>
               <p style={{textAlign: 'left'}}><font   size="1" color="red" >III. El tiempo destinado a su trabajo y sus responsabilidades familiares.</font></p>                        
                <table  width="530" className="table-bordered">
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Trabajo horas extras más de tres veces a la semana.</font></td>   
                <td width="20%"><font size="1" face="arial"color="black" >{value14.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo me exige laborar en días de descanso, festivos o fines de semana.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value15.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value16.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Pienso en las actividades familiares o personales cuando estoy en mi trabajo.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value17.Respuestas}</font></td> 
                </tr>
                </table>
                 <p style={{textAlign: 'left'}}><font color="red" size="1" >IV. Las decisiones que puede tomar en su trabajo.</font></p>
                <table  width="530" className="table-bordered">
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Mi trabajo permite que desarrolle nuevas habilidades.</font></td>   
                <td width="20%"><font size="1" face="arial"color="black" >{value18.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"> <font size="1" face="arial"color="black" >En mi trabajo puedo aspirar a un mejor puesto.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value19.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Durante mi jornada de trabajo puedo tomar pausas cuando las necesito.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value20.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value21.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Puedo cambiar el orden de las actividades que realizo en mi trabajo.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value22.Respuestas}</font></td> 
                </tr>
                </table>
                <p style={{textAlign: 'left'}}><font color="red" size="1" >V. La capacitación e información que recibe sobre su trabajo.</font></p>
                <table  width="530" className="table-bordered ">
                <tr>
                <td width="80%"><font size="1" face="arial"color="black" >Me informan con claridad cuáles son mis funciones.</font></td>   
                <td width="20%"><font size="1" face="arial"color="black" >{value23.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Me explican claramente los resultados que debo obtener en mi trabajo.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value24.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Me informan con quién puedo resolver problemas o asuntos de trabajo.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value25.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1" face="arial"color="black" >Me permiten asistir a capacitaciones relacionadas con mi trabajo.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value26.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%" ><font size="1" face="arial"color="black" >Recibo capacitación útil para hacer mi trabajo.</font></td>   
                  <td width="20%"><font size="1" face="arial"color="black" >{value27.Respuestas}</font></td> 
                </tr>
                </table>
                <p style={{textAlign: 'left'}}><font color="red"  size="1" >VI. Las relaciones con sus compañeros de trabajo y su jefe.</font></p>
                <table  width="530" className="table-bordered ">
                <tr>
                <td width="80%"><font size="1"face="arial"color="black">Mi jefe tiene en cuenta mis puntos de vista y opiniones.</font></td>   
                <td width="20%"><font size="1"face="arial"color="black">{value28.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo.</font></td>   
                  <td width="20%" ><font size="1"face="arial"color="black">{value29.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Puedo confiar en mis compañeros de trabajo.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value30.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Cuando tenemos que realizar trabajo de equipo los compañeros colaboran.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value31.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Mis compañeros de trabajo me ayudan cuando tengo dificultades.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value32.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">En mi trabajo puedo expresarme libremente sin interrupciones.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value33.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Recibo críticas constantes a mi persona y/o trabajo.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value34.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value35.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value36.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value37.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value38.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value39.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">He presenciado actos de violencia en mi centro de trabajo.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value40.Respuestas}</font></td> 
                </tr>
                </table>
                <p style={{textAlign: 'left'}}> <font color="red" size="1" >VII. En mi trabajo debo brindar servicio a clientes o usuarios</font></p>
                <table  width="530" className="table-bordered ">
                <tr>
                <td width="80%"><font size="1"face="arial"color="black">Atiendo clientes o usuarios muy enojados.</font></td>   
                <td width="20%"><font size="1"face="arial"color="black">{value41.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value42.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Para hacer mi trabajo debo demostrar sentimientos distintos a los míos.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value43.Respuestas}</font></td> 
                </tr>
                </table>
                <p style={{textAlign: 'left'}}><font color="red" size="1" >VIII. Soy jefe de otros trabajadores</font></p>
                <table  width="530" className="table-bordered">
                <tr>
                <td width="80%"><font size="1"face="arial"color="black">Comunican tarde los asuntos de trabajo.</font></td>   
                <td width="20%"><font size="1"face="arial"color="black">{value44.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Dificultan el logro de los resultados del trabajo.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value45.Respuestas}</font></td> 
                </tr>
                <tr>
                  <td width="80%"><font size="1"face="arial"color="black">Ignoran las sugerencias para mejorar su trabajo.</font></td>   
                  <td width="20%"><font size="1"face="arial"color="black">{value46.Respuestas}</font></td> 
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
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
             {/* <Alert className ="mt-4" color ="primary ">INFORMACIÓN: LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert> */}
               </div> 
              </div>
                 )}
                 })}
               </PDFExport>
        
              </section>
              
              </div>
              </div>
        }   
        let PDFResultadosMasivos;
        if(this.state.resultadosEvaluacionMasivo[0]){
          
          let value1, value2, value3, value4, value5, value6, value7, value8, value9, value10
          let value11, value12, value13, value14, value15, value16, value17, value18, value19, value20
          let value21, value22, value23, value24, value25, value26, value27, value28, value29, value30
          let value31, value32, value33, value34, value35, value36, value37, value38, value39, value40
          let value41, value42, value43, value44, value45, value46;

          PDFResultadosMasivos = 
                       <div>       
                      <MDBBtn   color="info" size="md"  onClick={() => { this.pdfExportComponent.save(); }}>
                          Descargar reporte de resultados masivos
                      </MDBBtn>
                        <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
                         <PDFExport
                                paperSize="A4"
                                margin="1cm"
                                ref={(component) => this.pdfExportComponent = component}
                                fileName={`Resultados del total de empleados ${new Date().getFullYear()}`}
                                pageTemplate={PageTemplate}
                                forcePageBreak=".page-break"
                            >
                               
                                    {this.state.resultadosEvaluacionMasivo.map(rows=>{
                                      if(rows){
                                        let filtrar1;
                                         filtrar1 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 1;
                                         });
                                         console.log("filtrar1" , filtrar1)
                                         value1=filtrar1.pop() 
                                        // console.log("this.state.resultadosEvaluacionMasivo", this.state.resultadosEvaluacionMasivo)
                                         let filtrar2;
                                         filtrar2 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 2;
                                         });
                                         value2=filtrar2.pop() 
                                        
                                         let filtrar3;
                                         filtrar3 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 3;
                                         });
                                         value3=filtrar3.pop() 
                                        
                                         let filtrar4;
                                         filtrar4 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 4;
                                         });
                                         value4=filtrar4.pop() 
                                        
                                         let filtrar5;
                                         filtrar5 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 5;
                                         });
                                         value5=filtrar5.pop() 
                                        
                                         let filtrar6;
                                         filtrar6 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 6;
                                         });
                                         value6=filtrar6.pop() 
                                        
                                         let filtrar7;
                                         filtrar7 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 7;
                                         });
                                         value7=filtrar7.pop() 
                                        
                                         let filtrar8;
                                         filtrar8 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 8;
                                         });
                                         value8=filtrar8.pop() 
                                        
                                         let filtrar9;
                                         filtrar9 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 9;
                                         });
                                         value9=filtrar9.pop() 
                                        
                                         let filtrar10;
                                         filtrar10 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 10;
                                         });
                                         value10=filtrar10.pop() 
                                        
                                         let filtrar11;
                                         filtrar11 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 11;
                                         });
                                         value11=filtrar11.pop() 
                                        
                                         let filtrar12;
                                         filtrar12 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 12;
                                         });
                                         value12=filtrar12.pop() 
                                        
                                         let filtrar13;
                                         filtrar13 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 13;
                                         });
                                         value13=filtrar13.pop() 
                                        
                                         let filtrar14;
                                         filtrar14 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 14;
                                         });
                                         value14=filtrar14.pop() 
                                        
                                         let filtrar15;
                                         filtrar15 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 15;
                                         });
                                         value15=filtrar15.pop() 
                                        
                                         let filtrar16;
                                         filtrar16 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 16;
                                         });
                                         value16=filtrar16.pop() 
                                        
                                         let filtrar17;
                                         filtrar17 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 17;
                                         });
                                         value17=filtrar17.pop() 
                                        
                                         let filtrar18;
                                         filtrar18 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 18;
                                         });
                                         value18=filtrar18.pop() 
                                        
                                         let filtrar19;
                                         filtrar19 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 19;
                                         });
                                         value19=filtrar19.pop() 
                                        
                                         let filtrar20;
                                         filtrar20 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 20;
                                         });
                                         value20=filtrar20.pop() 
                                        
                                         let filtrar21;
                                         filtrar21 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 21;
                                         });
                                         value21=filtrar21.pop() 
                                        
                                         let filtrar22;
                                         filtrar22 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 22;
                                         });
                                         value22=filtrar22.pop() 
                                        
                                         let filtrar23;
                                         filtrar23 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 23;
                                         });
                                         value23=filtrar23.pop() 
                                        
                                         let filtrar24;
                                         filtrar24 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 24;
                                         });
                                         value24=filtrar24.pop() 
                                        
                                         let filtrar25;
                                         filtrar25 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 25;
                                         });
                                         value25=filtrar25.pop() 
                                        
                                         let filtrar26;
                                         filtrar26 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 26;
                                         });
                                         value26=filtrar26.pop() 
                                        
                                         let filtrar27;
                                         filtrar27 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 27;
                                         });
                                         value27=filtrar27.pop() 
                                        
                                         let filtrar28;
                                         filtrar28 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 28;
                                         });
                                         value28=filtrar28.pop() 
                                        
                                         let filtrar29;
                                         filtrar29 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 29;
                                         });
                                         value29=filtrar29.pop() 
                                        
                                         let filtrar30;
                                         filtrar30 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 30;
                                         });
                                         value30=filtrar30.pop() 
                                        
                                         let filtrar31;
                                         filtrar31 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 31;
                                         });
                                         value31=filtrar31.pop() 
                                        
                                         let filtrar32;
                                         filtrar32 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 32;
                                         });
                                         value32=filtrar32.pop() 
                                        
                                         let filtrar33;
                                         filtrar33 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 33;
                                         });
                                         value33=filtrar33.pop() 
                                        
                                         let filtrar34;
                                         filtrar34 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 34;
                                         });
                                         value34=filtrar34.pop() 
                                        
                                         let filtrar35;
                                         filtrar35 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 35;
                                         });
                                         value35=filtrar35.pop() 
                                        
                                         let filtrar36;
                                         filtrar36 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 36;
                                         });
                                         value36=filtrar36.pop() 
                                        
                                         let filtrar37;
                                         filtrar37 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 37;
                                         });
                                         value37=filtrar37.pop() 
                                        
                                         let filtrar38;
                                         filtrar38 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 38;
                                         });
                                         value38=filtrar38.pop() 
                                        
                                         let filtrar39;
                                         filtrar39 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 39;
                                         });
                                         value39=filtrar39.pop() 
                                         
                                         let filtrar40;
                                         filtrar40 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 40;
                                         });
                                         value40=filtrar40.pop() 
                                        
                                         let filtrar41;
                                         filtrar41 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 41;
                                         });
                                         value41=filtrar41.pop() 
                                        
                                         let filtrar42;
                                         filtrar42 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 42;
                                         });
                                         value42=filtrar42.pop() 
                                        
                                         let filtrar43;
                                         filtrar43 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 43;
                                         });
                                         value43=filtrar43.pop() 
                                        
                                         let filtrar44;
                                         filtrar44 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 44;
                                         });
                                         value44=filtrar44.pop() 
                                        
                                         let filtrar45;
                                         filtrar45 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 45;
                                         });
                                         value45=filtrar45.pop() 
                                        
                                         let filtrar46;
                                         filtrar46 =rows.filter(function(hero){
                                           return hero.fk_preguntasRP == 46;
                                         });
                                         value46=filtrar46.pop() 
                                         
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
                                      let entero45=parseInt(valor45);let entero46=parseInt(valor46)
                                      
                                      let total = (entero1+entero2+entero3+entero4+entero5+entero6+entero7+entero8+entero9+entero10+entero11+entero12+entero13+entero14+entero15+entero16+entero17+entero18+entero19+entero20+entero21+entero22+entero23+entero24+entero25+entero26+entero27+entero28+entero29+entero30+entero31+entero32+entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46).toFixed(2);
                                      // console.log("total" , entero1,entero2,entero3,entero4,entero5,entero6,entero7,entero8,entero9,entero10,entero11,entero12,entero13,entero14,entero15,entero16,entero17,entero18,entero19,entero20,entero21,entero22,entero23,entero24,entero25,entero26,entero27,entero28,entero29,entero30,entero31,entero32,entero33,entero34,entero35,entero36,entero37,entero38,entero39,entero40,entero41,entero42,entero43,entero44,entero45,entero46)
                                      let celda1;
                                      let celda2;
                                      let celda3;
                                      let celda4;
                                      let celda5;
                                      let criterios;
                                      let color;
                                      if(total<20){
                                      color =<TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black" align="justify">Nulo</font></TableCell>
                                      criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
                                      celda1 = <TableCell style={{backgroundColor: "#9BE0F7"}} align="right">{total}</TableCell>
                                      }else if(total>=20 && total <= 45){
                                        criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align="left">
                                          <p>Es necesario una mayor difusión de la política de prevención de riesgos
                                        psicosociales y programas para: la prevención de los factores de riesgo
                                        psicosocial, la promoción de un entorno organizacional favorable y la
                                        prevención de la violencia laboral.</p></font></TableCell>
                                        color= <TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black" >Bajo</font></TableCell>
                                        celda2 = <TableCell style={{backgroundColor: "#6BF56E"}} align="right">{total}</TableCell>
                                      }else if(total>=45 && total <= 70){
                                        criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align="left">
                                          <p>Se requiere revisar la política de prevención de riesgos psicosociales y
                                        programas para la prevención de los factores de riesgo psicosocial, la
                                        promoción de un entorno organizacional favorable y la prevención de la
                                        violencia laboral, así como reforzar su aplicación y difusión, mediante un
                                        Programa de intervención.</p></font></TableCell>
                                      color=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black" align="justify">Medio</font></TableCell>
                                        celda3 = <TableCell style={{backgroundColor: "#FFFF00"}} align="right">{total}</TableCell>
                                      }else if(total>=70 && total <= 90){
                                        criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align=" left">
                                          <p>Se requiere realizar un análisis de cada categoría y dominio, de manera que
                                        se puedan determinar las acciones de intervención apropiadas a través de un
                                        Programa de intervención, que podrá incluir una evaluación específica y
                                        deberá incluir una campaña de sensibilización, revisar la política de
                                        prevención de riesgos psicosociales y programas para la prevención de los
                                        factores de riesgo psicosocial, la promoción de un entorno organizacional
                                        favorable y la prevención de la violencia laboral, así como reforzar su
                                        aplicación y difusión.</p></font></TableCell>
                                        color = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black" >Alto</font></TableCell>
                                        celda4 = <TableCell style={{backgroundColor: "#FFC000"}} align="right">{total}</TableCell>
                                      }
                                      else if( total > 90){
                                        criterios = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="1" face="arial"color="black" align=" left">
                                          <p>Se requiere realizar el análisis de cada categoría y dominio para establecer
                                        las acciones de intervención apropiadas, mediante un Programa de
                                        intervención que deberá incluir evaluaciones específicas, y contemplar
                                        campañas de sensibilización, revisar la política de prevención de riesgos
                                        psicosociales y programas para la prevención de los factores de riesgo
                                        psicosocial, la promoción de un entorno organizacional favorable y la
                                        prevención de la violencia laboral, así como reforzar su aplicación y difusión.</p></font></TableCell>
                                        color = <TableCell style={ {backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
                                        celda5  = <TableCell style={{backgroundColor: "#FF0000"}} align="right">{total}</TableCell>
                                      }
                                      
                                      let categoria1Nulo;
                                      let categoria1Bajo; 
                                      let categoria1Medio;
                                      let categoria1Alto;
                                      let categoria1MuyAlto;
                                      let colorCategoriaUno;
                                      let categoriaUno = (entero2+entero1+entero3).toFixed(2);
                                      // console.log("categoria1" , categoriaUno)
                                      if(categoriaUno < 3){
                                        colorCategoriaUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
                                        categoria1Nulo= categoriaUno
                                      }else if(categoriaUno >= 3 && categoriaUno < 5){
                                        colorCategoriaUno =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
                                        categoria1Bajo= categoriaUno
                                      }else if(categoriaUno >= 5 && categoriaUno < 7){
                                        colorCategoriaUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
                                        categoria1Medio= categoriaUno
                                      }else if(categoriaUno >= 7 && categoriaUno < 9){
                                        colorCategoriaUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
                                        categoria1Alto= categoriaUno
                                      }else if(categoriaUno >= 9){
                                        colorCategoriaUno = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
                                        categoria1MuyAlto= categoriaUno
                                      }
                                      
                                      let categoria2Nulo;
                                      let categoria2Bajo;
                                      let categoria2Medio;
                                      let categoria2Alto;
                                      let categoria2MuyAlto;
                                      let colorCategoriaDos;
                                      let categoriaDos = (entero4+entero9+entero5+entero6+entero7+entero8+entero41+entero42+entero43+entero10+entero11+entero12+entero13+entero20+entero21+entero22+entero18+entero19+entero26+entero27).toFixed(2);
                                      if(categoriaDos < 10){
                                        colorCategoriaDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
                                        categoria2Nulo= categoriaDos
                                      }else if(categoriaDos >= 10 && categoriaDos < 20){
                                        colorCategoriaDos =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
                                        categoria2Bajo= categoriaDos
                                      }else if(categoriaDos >=20 && categoriaDos < 30){
                                        colorCategoriaDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
                                        categoria2Medio= categoriaDos
                                      }else if(categoriaDos >=30 && categoriaDos < 40){
                                        colorCategoriaDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
                                        categoria2Alto= categoriaDos
                                      }else if(categoriaDos >= 40){
                                        colorCategoriaDos = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
                                        categoria2MuyAlto= categoriaDos
                                      }
                                      let categoria3Nulo;
                                      let categoria3Bajo;
                                      let categoria3Medio;
                                      let categoria3Alto;
                                      let categoria3MuyAlto;
                                      let colorCategoriaTre;
                                      let categoriaTre = (entero14+entero15+entero16+entero17).toFixed(2);
                                      if(categoriaTre < 4){
                                        colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
                                        categoria3Nulo= categoriaTre
                                      }else if(categoriaTre >= 4 && categoriaTre < 6){
                                        colorCategoriaTre =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
                                        categoria3Bajo= categoriaTre
                                      }else if(categoriaTre >=6 && categoriaTre < 9){
                                        colorCategoriaTre=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
                                        categoria3Medio= categoriaTre
                                      }else if(categoriaTre >=9 && categoriaTre < 12){
                                        colorCategoriaTre = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
                                        categoria3Alto= categoriaTre
                                      }else if(categoriaTre >= 12){
                                        colorCategoriaTre = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
                                        categoria3MuyAlto= categoriaTre
                                      }
                                      
                                      let categoria4Nulo;
                                      let categoria4Bajo;
                                      let categoria4Medio;
                                      let categoria4Alto;
                                      let categoria4MuyAlto;
                                      let colorCategoriaCuatro;
                                      let categoriaCuatro = (entero23+entero24+entero25+entero28+entero29+entero30+entero31+entero32+entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40+entero44+entero45+entero46).toFixed(2);
                                      if(categoriaCuatro < 10){
                                        colorCategoriaCuatro  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
                                        categoria4Nulo= categoriaCuatro
                                      }else if(categoriaCuatro >= 10 && categoriaCuatro < 18){
                                        colorCategoriaCuatro =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
                                        categoria4Bajo= categoriaCuatro
                                      }else if(categoriaCuatro >=18 && categoriaCuatro < 28){
                                        colorCategoriaCuatro=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
                                        categoria4Medio= categoriaCuatro
                                      }else if(categoriaCuatro >=28 && categoriaCuatro < 38){
                                        colorCategoriaCuatro = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
                                        categoria4Alto= categoriaCuatro
                                      }else if(categoriaCuatro >= 38){
                                        colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
                                        categoria4MuyAlto= categoriaCuatro
                                      }
                                      
                                      // console.log("categoria" , categoriaUno,categoriaDos,categoriaTre,categoriaCuatro)
                                      let Dominio1Nulo;
                                      let Dominio1Bajo;
                                      let Dominio1Medio;
                                      let Dominio1Alto;
                                      let Dominio1MuyAlto;
                                      let colorDominioUno;
                                      let DominioUno = (entero2+entero1+entero3).toFixed(2);
                                      if(DominioUno < 3){
                                        colorDominioUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
                                        Dominio1Nulo= DominioUno
                                      }else if(DominioUno >= 3 && DominioUno < 5){
                                        colorDominioUno=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
                                        Dominio1Bajo= DominioUno
                                      }else if(DominioUno >= 5 && DominioUno < 7){
                                        colorDominioUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
                                        Dominio1Medio= DominioUno
                                      }else if(DominioUno >= 7 && DominioUno < 9){
                                        colorDominioUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
                                        Dominio1Alto= DominioUno
                                      }else if(DominioUno >= 9){
                                        colorDominioUno= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
                                        Dominio1MuyAlto= DominioUno
                                      }
                                      
                                      let Dominio2Nulo;
                                      let Dominio2Bajo;
                                      let Dominio2Medio;
                                      let Dominio2Alto;
                                      let Dominio2MuyAlto;
                                      let colorDominioDos;
                                      let DominioDos = (entero4+entero9+entero5+entero6+entero7+entero8+entero41+entero42+entero43+entero10+entero11+entero12+entero13).toFixed(2);
                                      if(DominioDos < 12){
                                        colorDominioDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
                                        Dominio2Nulo= DominioDos
                                      }else if(DominioDos >= 12 && DominioDos < 16){
                                        colorDominioDos=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
                                        Dominio2Bajo= DominioDos
                                      }else if(DominioDos >= 16 && DominioDos < 20){
                                        colorDominioDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
                                        Dominio2Medio= DominioDos
                                      }else if(DominioDos >= 20 && DominioDos < 24){
                                        colorDominioDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
                                        Dominio2Alto= DominioDos
                                      }else if(DominioDos >= 24){
                                        colorDominioDos= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
                                        Dominio2MuyAlto= DominioDos
                                      }
                                      
                                      let Dominio3Nulo;
                                      let Dominio3Bajo;
                                      let Dominio3Medio;
                                      let Dominio3Alto;
                                      let Dominio3MuyAlto;
                                      let colorDominioTres
                                      let DominioTres = (entero20+entero21+entero22+entero18+entero19+entero26+entero27).toFixed(2);
                                      if(DominioTres < 5){
                                        colorDominioTres  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
                                        Dominio3Nulo= DominioTres
                                      }else if(DominioTres >= 5 && DominioTres < 8){
                                        colorDominioTres=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
                                        Dominio3Bajo= DominioTres
                                      }else if(DominioTres >= 8 && DominioTres < 11){
                                        colorDominioTres=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
                                        Dominio3Medio= DominioTres
                                      }else if(DominioTres >= 11 && DominioTres < 14){
                                        colorDominioTres = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
                                        Dominio3Alto= DominioTres
                                      }else if(DominioTres >= 14){
                                        colorDominioTres= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
                                        Dominio3MuyAlto= DominioTres
                                      }
                                      
                                      let Dominio4Nulo;
                                      let Dominio4Bajo;
                                      let Dominio4Medio;
                                      let Dominio4Alto;
                                      let Dominio4MuyAlto;
                                      let colorDominioCuatro;
                                      let DominioCuatro = (entero14+entero15).toFixed(2);
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
                                      let DominioCinco = (entero16+entero17).toFixed(2);
                                      if(DominioCinco < 1){
                                        colorDominioCinco  = <td width="15px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
                                        Dominio5Nulo= DominioCinco
                                      }else if(DominioCinco >= 1 && DominioCinco < 2){
                                        colorDominioCinco=<td width="15px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
                                        Dominio5Bajo= DominioCinco
                                      }else if(DominioCinco >= 2 && DominioCinco < 4){
                                        colorDominioCinco=<td width="15px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
                                        Dominio5Medio= DominioCinco
                                      }else if(DominioCinco >= 4 && DominioCinco < 6){
                                        colorDominioCinco = <td  width="15px"style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
                                        Dominio5Alto= DominioCinco
                                      }else if(DominioCinco >= 6){
                                        colorDominioCinco= <td  width="15px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
                                        Dominio5MuyAlto= DominioCinco
                                      }
                                      
                                      let Dominio6Nulo;
                                      let Dominio6Bajo;
                                      let Dominio6Medio;
                                      let Dominio6Alto;
                                      let Dominio6MuyAlto;
                                      let colorDominioSeis;
                                      let DominioSeis = (entero23+entero24+entero25+entero28+entero29).toFixed(2);
                                      if(DominioSeis < 3){
                                        colorDominioSeis  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
                                        Dominio6Nulo= DominioSeis
                                      }else if(DominioSeis >= 3 && DominioSeis < 5){
                                        colorDominioSeis=<td  width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
                                        Dominio6Bajo= DominioSeis
                                      }else if(DominioSeis >= 5 && DominioSeis < 8){
                                        colorDominioSeis=<td width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
                                        Dominio6Medio= DominioSeis
                                      }else if(DominioSeis >= 8 && DominioSeis < 11){
                                        colorDominioSeis = <td width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
                                        Dominio6Alto= DominioSeis
                                      }else if(DominioSeis >= 11){
                                        colorDominioSeis= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
                                        Dominio6MuyAlto= DominioSeis
                                      }
                                      
                                      let Dominio7Nulo;
                                      let Dominio7Bajo;
                                      let Dominio7Medio;
                                      let Dominio7Alto;
                                      let Dominio7MuyAlto;
                                      let colorDominioSiete;
                                      let DominioSiete = (entero30+entero31+entero32+entero44+entero45+entero46).toFixed(2);
                                      
                                      if(DominioSiete < 5){
                                        colorDominioSiete  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
                                        Dominio7Nulo= DominioSiete
                                      }else if(DominioSiete >= 5 && DominioSiete < 8){
                                        colorDominioSiete=<td width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
                                        Dominio7Bajo= DominioSiete
                                      }else if(DominioSiete >= 8 && DominioSiete < 11){
                                        colorDominioSiete=<td  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
                                        Dominio7Medio= DominioSiete
                                      }else if(DominioSiete >= 11 && DominioSiete < 14){
                                        colorDominioSiete = <td width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
                                        Dominio7Alto= DominioSiete
                                      }else if(DominioSiete >= 14){
                                        colorDominioSiete= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
                                        Dominio7MuyAlto= DominioSiete
                                      }
                                      
                                      let Dominio8Nulo;
                                      let Dominio8Bajo;
                                      let Dominio8Medio;
                                      let Dominio8Alto;
                                      let Dominio8MuyAlto;
                                      let colorDominioOcho;
                                      let DominioOcho = (entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40).toFixed(2);
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
                                      return(
                                        <div style={{ width: "550px" }}>
                                        <MDBRow style={{marginBottom:10}}> 
                                        <MDBCol>
                                        <img src={logo} alt="logo" style = {{width:550}}/>
                                        <MDBTable  component={Paper}  small borderless className="text-left mt-4 ">
                                        <MDBTableBody>  
                                        <font size="3"face="arial"color="black">Reporte individual de resultados para identificar los factores de Riesgo Psicosocial en los centros de trabajo</font><br></br>  <br></br>
                                        <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")} </font><br></br>  
                                        <font color="black" className= "textleft"  size="1"><strong>{rows[0].nombre} {rows[0].ApellidoP} {rows[0].ApellidoM}</strong></font><br/>        
                                        <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                                        <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font><br/>
                                        <font color="black" className= "textleft"  size="1">Periodo: <strong>{rows[0].Periodo}</strong></font><br/>
                                        <font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        </MDBTableBody>
                                        </MDBTable>    
                                        <center>   <img src={diagnostico} alt="logo" style = {{width:120,heigth:50}}/>&nbsp;&nbsp;&nbsp;<img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,heigth:20}}/></center>
                                        </MDBCol> 
                                        </MDBRow> 
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
                                          <center>
                                          <p  className ="text-center"><strong> <font size="1"face="arial"color="black">GUÍA DE REFERENCIA II
                                          CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN
                                          LOS CENTROS DE TRABAJO</font></strong> </p>
                                          </center>
                                          <MDBTable bordless >
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
                                          <MDBTable  large bordered  className="text-center">
                                          <MDBTableBody>  
                                          <tr >                              
                                          <td width = "32%"><font size="1" face="arial"color="#283747" ><strong>Resultado:</strong></font></td>
                                          <td width = "13%" className="text-left"><font size="1" face="arial"color="#273746"><strong>   {total}</strong></font></td>
                                          <td width = "30%"><font size="1" face="arial"color="#283747"><strong> Nivel de riesgo:</strong></font></td>
                                          {color}                                  
                                          </tr>   
                                          </MDBTableBody>                                              
                                          </MDBTable>
                                          <Table  responsive small bordless  className="text-left mb-2">
                                          <tr >                              
                                          <td width="100%"><font size="2" face="arial"color="black" ><strong>Necesidad de la acción : </strong></font></td>                                    
                                          </tr>
                                          <tr>
                                            <td width="100%"><font size="1" face="arial"color="black" >{criterios}</font></td>
                                          </tr>
                                          </Table>
                                     <p style={{textAlign: 'left'}}><font color="red" style= {{marginTop:20}}  size="1">I.- Resultados de la categoría</font></p>
                                      <table width="530" className="table-bordered"> 
                                            
                                           <tr >                              
                                            <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Categoría</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
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
                                            <td  width="10%"><font size="1" face="arial"color="black" >3</font></td>
                                            <td  width="60%"><font size="1" face="arial"color="black">Organización del tiempo de trabajo</font></td>
                                            <td  width="20%"><font size="1" face="arial"color="black">{categoriaTre}</font></td>
                                            {colorCategoriaTre}
                                          </tr>
                                          <tr>         
                                            <td  width="10%"><font size="1" face="arial"color="black" >4</font></td>
                                            <td  width="60%"><font size="1" face="arial"color="black">Liderazgo y relaciones en el trabajo</font></td>
                                            <td  width="20%"><font size="1" face="arial"color="black">{categoriaCuatro}</font></td>
                                            {colorCategoriaCuatro}
                                            </tr>
                                         </table>
                                      <p style={{textAlign: 'left'}}><font color="red" style= {{marginTop:40}}  size="1">II.- Resultados del dominio</font></p>
                                        <table width="530" className="table-bordered">                                             
                                           <tr >                              
                                            <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Dominio</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                            <td ><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                          </tr>
                                          <tr>           
                                          <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Condiciones en el ambiente de trabajo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{DominioUno}</font></td>
                                           {colorDominioUno}                
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Carga de trabajo</font></td>
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
                                            {colorDominioCuatro}
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
                                        </table>
                                        <br/>                                       
                                      <p style={{textAlign: 'left'}}>  <font color="red" style= {{marginTop:40}}  size="1">III.- Resultados por Dimensión</font></p>
                                        <table width="530"  className="table-bordered">                                             
                                           <tr >                              
                                            <td width="10%"><font size="1" face="arial"color="black" ></font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Dimensión</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
                                          </tr>
                                          <tr>           
                                          <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Condiciones peligrosas e inseguras</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{entero2.toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{entero1.toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{entero3.toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero4+entero9).toFixed(2)}</font></td>
                                            </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero5+entero6).toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >6</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Carga mental</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero7+entero8).toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >7</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero41+entero42+entero43).toFixed(2)}</font></td>
                                            </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >8</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero10+entero11).toFixed(2)}</font></td>
                                          </tr>
                                          <tr>           
                                          <td width="10%"><font size="1" face="arial"color="black" >9</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{(entero12+entero13).toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >10</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero20+entero21+entero22).toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >11</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero18+entero19).toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >12</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero26+entero27).toFixed(2)}</font></td>
                                            </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >13</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero14+entero15).toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >14</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{entero16.toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >15</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero17).toFixed(2)}</font></td>
                                            </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >16</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero23+entero24+entero25).toFixed(2)}</font></td>
                                          </tr>
  
                                          <tr>           
                                          <td width="10%"><font size="1" face="arial"color="black" >17</font></td>
                                          <td width="60%"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
                                          <td width="20%"><font size="1" face="arial"color="black">{(entero28+entero29).toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >18</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Relaciones sociales en el trabajo</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero30+entero31+entero32).toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >19</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{(entero44+entero45+entero46).toFixed(2)}</font></td>
                                          </tr>
                                          <tr>         
                                            <td width="10%"><font size="1" face="arial"color="black" >20</font></td>
                                            <td width="60%"><font size="1" face="arial"color="black">Violencia laboral</font></td>
                                            <td width="20%"><font size="1" face="arial"color="black">{entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40}</font></td>
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
                       {/* <Alert className ="mt-4" color ="primary ">INFORMACIÓN: LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert> */}
                       </div> 
                         )}
                         })}
                       </PDFExport>
                </div>  
                </div>
        }

        let reporteEjecutivo;
        let botonDescargarReporteEjecutivo;
        ////////////////////////////////////////////Reporte Ejecutivo////////////////////////////////////////////////////////////////////////////////
                if(this.state.valor1[0] && this.state.valor46[0] && this.state.reporteEjecutivos == true){
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

                  var ambienteTrabajo = [];

                  for(let i = 0; i < arr1.length; i++){
                    ambienteTrabajo[i] =arr1[i]+arr2[i]+arr3[i];
                  }

                  var arr4 = this.state.valor4.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr9 = this.state.valor9.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr5 = this.state.valor5.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr6 = this.state.valor6.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr7 = this.state.valor7.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr8 = this.state.valor8.map(function (x) { 
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
                  var arr10 = this.state.valor10.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr11 = this.state.valor11.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr12 = this.state.valor12.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr13 = this.state.valor13.map(function (x) { 
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
                  var arr18 = this.state.valor18.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr19 = this.state.valor19.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr26 = this.state.valor26.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr27 = this.state.valor27.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var factoresPropios = [];

                  for(let i = 0; i < arr4.length; i++){
                    factoresPropios[i] =arr4[i]+arr9[i]+arr5[i]+arr6[i]+arr7[i]+arr8[i]+arr41[i]+arr42[i]+arr43[i]+arr10[i]+arr11[i]+arr12[i]+arr13[i]+arr20[i]+arr21[i]+arr22[i]+arr18[i]+arr19[i]+arr26[i]+arr27[i];
                  }

                  var arr14 = this.state.valor14.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr15 = this.state.valor15.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr16 = this.state.valor16.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr17 = this.state.valor17.map(function (x) { 
                    return parseInt(x, 10); 
                  });
              
                  var organizacion = [];

                  for(let i = 0; i < arr14.length; i++){
                    organizacion[i] =arr14[i]+arr15[i]+arr16[i]+arr17[i];
                  }

                  var arr23 = this.state.valor23.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr24 = this.state.valor24.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr25 = this.state.valor25.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr28 = this.state.valor28.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr29 = this.state.valor29.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr30 = this.state.valor30.map(function (x) { 
                    return parseInt(x, 10); 
                  });
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
                  var arr35 = this.state.valor35.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr36 = this.state.valor36.map(function (x) { 
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
                  var arr44 = this.state.valor44.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr45 = this.state.valor45.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                  var arr46 = this.state.valor46.map(function (x) { 
                    return parseInt(x, 10); 
                  });
                 
                  var liderazgo = [];

                  for(let i = 0; i < arr23.length; i++){
                    liderazgo[i] =arr23[i]+arr24[i]+arr25[i]+arr28[i]+arr29[i]+arr30[i]+arr31[i]+arr32[i]+arr33[i]+arr34[i]+arr35[i]+arr36[i]+arr37[i]+arr38[i]+arr39[i]+arr40[i]+arr44[i]+arr45[i]+arr46[i];
                  }
                  ////////////////////////////////////////////////////////////////////
                  
                  let totalPonderacion = [];
                  for(let i = 0; i < ambienteTrabajo.length; i++){
                    totalPonderacion[i] = ambienteTrabajo[i] + factoresPropios[i] + organizacion[i] + liderazgo [i];  
                  }
                  
                  let suma = 0;
                  totalPonderacion.forEach (function(numero){
                      suma += numero;
                  });
                  let ponderacionPromedio = (suma/totalPonderacion.length).toFixed(2)
      
                  // console.log("ponderacion promedio" , ponderacionPromedio)
                  if(ponderacionPromedio<20){
                    charColor = "#9BE0F7"
                    celda = <td   style={{backgroundColor: "#9BE0F7 "}}><font size="1" face="arial"color="#283747" align="justify"><strong> NULO O DESPRECIABLE</strong></font></td>
                    criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align="justify"><p>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</p></font></TableCell>
                    }else if(totalGrafica>=20 && totalGrafica < 45){
                      celda = <td width="10%" style={{backgroundColor: "#6BF56E"}} ><font size="1" face="arial"color="#283747" align="justify"><strong> BAJO</strong></font></td>
                      celdaPrev = <TableCell width="10%" style={{backgroundColor: "#6BF56E"}} ><font size="3" face="arial"color="black" align="justify">BAJO</font></TableCell>
                      
                    criterios =<font size="2" face="arial"color="black" align="justify"><p> Es necesario una mayor difusión de la política de prevención de riesgos
                    psicosociales y programas para: la prevención de los factores de riesgo
                    psicosocial, la promoción de un entorno organizacional favorable y la
                    prevención de la violencia laboral. <br></br></p></font>
  
                      criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="2" face="arial"color="black" align="justify">
                    <p> Es necesario una mayor difusión de la política de prevención de riesgos
                        psicosociales y programas para: la prevención de los factores de riesgo
                        psicosocial, la promoción de un entorno organizacional favorable y la
                        prevención de la violencia laboral.</p></font></TableCell>
  
                    }else if(ponderacionPromedio>=45 && ponderacionPromedio < 70){
                      celda = <td style={{backgroundColor: "#FFFF00"}} ><font size="1" face="arial"color="#283747" align="justify"><strong> MEDIO</strong></font></td>
                      celdaPrev = <TableCell width="10%"  style={{backgroundColor: "#FFFF00"}} ><font size="3" face="arial"color="black" align="justify">MEDIO</font></TableCell>
                      charColor = "#FFFF00"
                      criterios = <font size="2" face="arial"color="black" align="justify">
                        <p>Se requiere revisar la política de prevención de riesgos psicosociales y
                          programas para la prevención de los factores de riesgo psicosocial, la
                          promoción de un entorno organizacional favorable y la prevención de la
                          violencia laboral, así como reforzar su aplicación y difusión, mediante un
                          Programa de intervención.</p></font>
  
                      criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="2" face="arial"color="black" align="justify">
                    <p>Se requiere revisar la política de prevención de riesgos psicosociales y
                      programas para la prevención de los factores de riesgo psicosocial, la
                      promoción de un entorno organizacional favorable y la prevención de la
                      violencia laboral, así como reforzar su aplicación y difusión, mediante un
                      Programa de intervención.</p></font></TableCell>
                    }else if(ponderacionPromedio>=70 && ponderacionPromedio < 90){
                    celda = <td  style={{backgroundColor: "#FFC000"}} ><font size="1" face="arial"color="#283747" align="justify"><strong>ALTO</strong></font></td>
                    celdaPrev = <TableCell  width="10%" style={{backgroundColor: "#FFC000"}} ><font size="3" face="arial"color="black" align="justify">ALTO</font></TableCell>
                    charColor = "#FFC000"  
                    criterios = <font size="1" face="arial"color="black" align="justify"><p>
                   </p></font>
                    criteriosPrev = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="2" face="arial"color="black" align="justify"><p>Se requiere realizar un análisis de cada categoría y dominio, de manera que
                     Se requiere realizar un análisis de cada categoría y dominio, de manera que
                    se puedan determinar las acciones de intervención apropiadas a través de un
                    Programa de intervención, que podrá incluir una evaluación específica y
                    deberá incluir una campaña de sensibilización, revisar la política de
                    prevención de riesgos psicosociales y programas para la prevención de los
                    factores de riesgo psicosocial, la promoción de un entorno organizacional
                    favorable y la prevención de la violencia laboral, así como reforzar su
                    aplicación y difusión.</p></font></TableCell>
                    }
                    else if( ponderacionPromedio > 90){
                      celda  = <td   style={{backgroundColor: "#FF0000"}}><font size="1" face="arial"color="#283747" align="justify"><strong>MUY ALTO</strong></font></td>
                      celdaPrev  = <TableCell width="10%"  style={{backgroundColor: "#FF0000"}}><font size="3" face="arial"color="black" align="justify">MUY ALTO</font></TableCell>
                    charColor = "#FF0000"
                    criterios = <font size="2" face="arial"color="black" align="justify"><p>
                     Se requiere realizar el análisis de cada categoría y dominio para establecer
                      las acciones de intervención apropiadas, mediante un Programa de
                      intervención que deberá incluir evaluaciones específicas, y contemplar
                      campañas de sensibilización, revisar la política de prevención de riesgos
                      psicosociales y programas para la prevención de los factores de riesgo
                      psicosocial, la promoción de un entorno organizacional favorable y la
                      prevención de la violencia laboral, así como reforzar su aplicación y difusión.</p></font>
                      criteriosPrev = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="2" face="arial"color="black" align="justify">
                  <p> Se requiere realizar el análisis de cada categoría y dominio para establecer
                      las acciones de intervención apropiadas, mediante un Programa de
                      intervención que deberá incluir evaluaciones específicas, y contemplar
                      campañas de sensibilización, revisar la política de prevención de riesgos
                      psicosociales y programas para la prevención de los factores de riesgo
                      psicosocial, la promoción de un entorno organizacional favorable y la
                      prevención de la violencia laboral, así como reforzar su aplicación y difusión.</p></font></TableCell>
                    }

                  ////////////////////////////////////////////////////////
                  let sumaAmbienteT = 0;
                  ambienteTrabajo.forEach (function(numero){
                    sumaAmbienteT += numero;
                  });

                  let suma1 = (sumaAmbienteT/ambienteTrabajo.length).toFixed(2);

                  console.log("suma1" , suma1)
                  let sumaFactoresP = 0;
                  factoresPropios.forEach (function(numero){
                    sumaFactoresP += numero;
                  });

                  let suma2 = (sumaFactoresP/factoresPropios.length).toFixed(2);
                  console.log("suma2", suma2)

                  let sumaOrganizacion = 0;
                  organizacion.forEach (function(numero){
                    sumaOrganizacion += numero;
                  });

                  let suma3 = (sumaOrganizacion/organizacion.length).toFixed(2);
                  console.log("suma3", suma3)
                 
                  let sumaLiderazgo = 0;
                  liderazgo.forEach (function(numero){
                    sumaLiderazgo += numero;
                  });

                  let suma4 = (sumaLiderazgo/liderazgo.length).toFixed(2);

                  let frecuenciaAmbiente1 = 0;
                  let frecuenciaAmbiente2 = 0;
                  let frecuenciaAmbiente3 = 0;
                  let frecuenciaAmbiente4 = 0;
                  let frecuenciaAmbiente5 = 0;
                  let frecuenciaFactores1 = 0;
                  let frecuenciaFactores2 = 0;
                  let frecuenciaFactores3 = 0;
                  let frecuenciaFactores4 = 0;
                  let frecuenciaFactores5 = 0;
                  let frecuenciaOrganizacion1 = 0;
                  let frecuenciaOrganizacion2 = 0;
                  let frecuenciaOrganizacion3 = 0;
                  let frecuenciaOrganizacion4 = 0;
                  let frecuenciaOrganizacion5 = 0;
                  let frecuenciaLiderazgo1= 0;
                  let frecuenciaLiderazgo2= 0;
                  let frecuenciaLiderazgo3= 0;
                  let frecuenciaLiderazgo4= 0;
                  let frecuenciaLiderazgo5= 0;

                  let arrayFinal = [];
                  for(let i = 0; i < this.state.empleadosRE.length; i++){
                     arrayFinal[i] = [this.state.empleadosRE[i], ambienteTrabajo[i] , factoresPropios[i] , organizacion[i] , liderazgo[i],totalPonderacion[i]];  
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
                  botonDescargarReporteEjecutivo = <MDBBtn   gradient="purple" size="md" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                  Descargar reporte ejecutivo
                  </MDBBtn>
                  reporteEjecutivo = 
                  <React.Fragment>
                <MDBCard>
                  <MDBCardHeader>
                    <MDBCardTitle><center>Reporte ejecutivo del total de empleados</center></MDBCardTitle>
                  </MDBCardHeader>
                  <MDBCardBody> 
                  <table style={{marginLeft:"20%"}}>
                  <tr>
                  <td width="65%" > <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100,marginBottom:20}}/></td>
                  <td width="35%" >
                  <img src={diagnostico} alt="logo" style = {{width:150}}/>
                  </td>
                  </tr>
                  </table>
                  <center> 
                  <font face="arial" className = "mt-4" ><center><strong>REPORTE EJECUTIVO DEL CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO</strong></center></font><br/>
                  <strong className="text-left  ml-2 mt-4">{localStorage.getItem("razonsocial")}</strong><br/>
                  <font face="arial" className = "mt-4" >FILTRADO POR: <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;  {this.state.filtro2} &nbsp;&nbsp; {this.state.filtro3} &nbsp;&nbsp;{this.state.filtro4} &nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp; {this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8} </strong> </font>
                  </center>
                  <br/>
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
                      <br/>
              
                      <TableContainer component={Paper} style={{marginBottom:30}}>
                    <Table  size="small" aria-label="a dense table" >
                  
                      <TableBody>
                          <TableRow>
                           <TableCell width="10%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>#</strong></TableCell> 
                            <TableCell width="40%" component="th" style={{backgroundColor: "#E6E7E8"}}><strong>Nombre</strong></TableCell> 
                            <TableCell width="10%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Ambiente de trabajo</strong></TableCell>              
                            <TableCell width="10%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Factores P. de la actividad</strong></TableCell>              
                            <TableCell width="10%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Organización del tiempo de T.</strong></TableCell>              
                            <TableCell width="10%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Liderazgo y R. en el trabajo</strong></TableCell>   
                            <TableCell width="10%" component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Total</strong></TableCell>              
           
                          </TableRow>
                          {arrayFinal.map(rows=>{
                          console.log("rows" , rows)  
                          let fila1;
                          let fila2;
                          let fila3;
                          let fila4;
                          let fila5;
                          if(rows[1] < 3){
                            fila1 = <td style={{backgroundColor: "#9BE0F7"}}>
                                <font size="2" face="arial"color="black">
                                {rows[1]}
                                </font>
                              </td>
                          }else if(rows[1] >= 3 && rows[1] < 5){                                                     
                              fila1 = <td style={{backgroundColor: "#6BF56E"}}>
                                <font size="2" face="arial"color="black">
                                {rows[1]}
                                </font>
                              </td>
                          }else if(rows[1] >= 5 && rows[1] < 7){
                              fila1 = <td style={{backgroundColor: "#FFFF00"}}>
                                  <font size="2" face="arial"color="black">
                                  {rows[1]}
                                  </font>
                                </td>
                          }else if(rows[1] >= 7 && rows[1] < 9){
                              fila1 = <td style={{backgroundColor: "#FFC000"}}>
                                  <font size="2" face="arial"color="black">
                                  {rows[1]}
                                  </font>
                                </td>
                          }else if(rows[1] >= 9){
                                fila1 = <td style={{backgroundColor: "#FF0000"}} >
                                  <font size="2" face="arial"color="black">
                                  {rows[1]}
                                  </font>
                                </td>
                          }

                          if(rows[2] < 10){
                          fila2 = <td style={{backgroundColor: "#9BE0F7"}}>
                          <font size="2" face="arial"color="black">
                          {rows[2]}
                          </font>
                          </td>
                        }else if(rows[2] >= 10 && rows[2] < 20){
                          fila2 = <td style={{backgroundColor: "#6BF56E"}}>
                          <font size="2" face="arial"color="black">
                          {rows[2]}
                          </font>
                          </td>
                        }else if(rows[2] >=20 && rows[2] < 30){
                          fila2 = <td style={{backgroundColor: "#FFFF00"}}>
                          <font size="2" face="arial"color="black">
                          {rows[2]}
                          </font>
                          </td>
                        }else if(rows[2] >=30 && rows[2] < 40){
                          fila2 = <td style={{backgroundColor: "#FFC000"}}>
                          <font size="2" face="arial"color="black">
                          {rows[2]}
                          </font>
                          </td>
                        }else if(rows[2] >= 40){
                          fila2 = <td style={{backgroundColor: "#FF0000"}}>
                          <font size="2" face="arial"color="black">
                          {rows[2]}
                          </font>
                          </td>
                        }

                        if(rows[3] < 4){
                          fila3 = 
                          <td style={{backgroundColor: "#9BE0F7"}}>
                            <font size="2" face="arial"color="black">
                              {rows[3]}
                            </font>
                          </td>
                        }else if(rows[3] >= 4 && rows[3] < 6){
                          fila3 = 
                          <td style={{backgroundColor: "#6BF56E"}}>
                            <font size="2" face="arial"color="black">
                              {rows[3]}
                            </font>
                          </td>
                        }else if(rows[3] >=6 && rows[3] < 9){
                          fila3 = 
                          <td style={{backgroundColor: "#FFFF00"}}>
                            <font size="2" face="arial"color="black">
                              {rows[3]}
                            </font>
                          </td>
                        }else if(rows[3] >=9 && rows[3] < 12){
                          fila3 = 
                          <td style={{backgroundColor: "#FFC000"}}>
                            <font size="2" face="arial"color="black">
                              {rows[3]}
                            </font>
                          </td>
                        }else if(rows[3] >= 12){
                          fila3 = 
                          <td style={{backgroundColor: "#FF0000"}}>
                            <font size="2" face="arial"color="black">
                              {rows[3]}
                            </font>
                          </td>
                        }

                        if(rows[4]  < 10){
                          fila4 = 
                          <td style={{backgroundColor: "#9BE0F7"}}>
                            <font size="2" face="arial"color="black">
                              {rows[4]}
                            </font>
                          </td>
                        }else if(rows[4] >= 10 && rows[4] < 18){
                          fila4 = 
                          <td style={{backgroundColor: "#6BF56E"}}>
                            <font size="2" face="arial"color="black">
                              {rows[4]}
                            </font>
                          </td>
                        }else if(rows[4] >=18 && rows[4] < 28){
                          fila4 = 
                          <td style={{backgroundColor: "#FFFF00"}}>
                            <font size="2" face="arial"color="black">
                              {rows[4]}
                            </font>
                          </td>
                        }else if(rows[4] >=28 && rows[4] < 38){
                          fila4 = 
                          <td style={{backgroundColor: "#FFC000"}}>
                            <font size="2" face="arial"color="black">
                              {rows[4]}
                            </font>
                          </td>
                        }else if(rows[4] >= 38){
                          fila4 = 
                          <td style={{backgroundColor: "#FF0000"}}>
                            <font size="2" face="arial"color="black">
                              {rows[4]}
                            </font>
                          </td>   
                        }
                          if(rows[5]<20){
                            fila5 = 
                            <td  style={{backgroundColor: "#9BE0F7"}}>
                              <font size="2" face="arial"color="black">
                                {rows[5]}
                              </font>
                            </td>    
                          }
                          else if(rows[5]>=20 && rows[5] <45){
                            fila5 = 
                            <td style={{backgroundColor: "#6BF56E"}}>
                              <font size="2" face="arial"color="black">
                                {rows[5]}
                              </font>
                            </td> 
                          }else if(rows[5]>=45 && rows[5] < 70){
                            fila5 = 
                            <td style={{backgroundColor: "#FFFF00"}}>
                              <font size="2" face="arial"color="black">
                                {rows[5]}
                              </font>
                            </td> 
                          }else if(rows[5]>=70 && rows[5] < 90){
                            fila5 = 
                            <td  style={{backgroundColor: "#FFC000"}}>
                              <font size="2" face="arial"color="black">
                                {rows[5]}
                              </font>
                            </td> 
                          }
                          else if( rows[5] >= 90){
                            fila5 = 
                            <td style={{backgroundColor: "#FF0000"}}>
                              <font size="2" face="arial"color="black">
                                {rows[5]}
                              </font>
                            </td> 
                        } 
                          return(
                              
                                <tr>
                                  <td  scope="col" ><font size="2" face="arial"color="black" >{increment++}</font></td>
                                  <td  scope="col"><font size="2" face="arial"color="black" >{rows[0]}</font></td>
                                    {fila1}
                                    {fila2}
                                    {fila3}
                                    {fila4}
                                    {fila5}
                                </tr>
                                  )
                                })}
                    </TableBody>
                    </Table>
                   </TableContainer>  
                   </MDBCardBody>
                   </MDBCard>            
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
                                      fileName={`Reporte ejecutivo ${new Date().getFullYear()}`}
                                      ref={(component) => this.pdfExportComponent = component}
                                  >
                                      <div style={{ width: "500px" }}>  
                                      <img src={logo} alt="logo" style = {{width:550}}/>                                         
                                          <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left ">
                                          <MDBTableBody>  
                                          <br/>   
                                          <font size="2"face="arial"color="black"><strong> Reporte Ejecutivo Global | identificación y análisis de los factores de riesgo psicosocial</strong></font><br></br>                                            <br></br>
                                          <font size="2"face="arial"color="black"><strong> {localStorage.getItem("razonsocial")} </strong></font><br></br>          
                                          <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                                          <br></br><br/>
                                          <font size="1"face="arial"color="black">Total de evaluaciones consideradas : {this.state.empleadosRE.length}</font><br></br>
                                          <font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
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
                                             <center> <p  className ="text-center"> <font size="1" face="arial"color="black"><strong>GUÍA DE REFERENCIA II IDENTIFICACIÓN Y ANÁLISIS DE LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO </strong></font> </p></center>
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
                                                <MDBTableBody>                                                  <tr >                              
                                                <td width = "32%"><font size="1" face="arial"color="#283747" ><strong>Puntaje Promedio:</strong></font></td>
                                                <td width = "13%" className="text-left"><font size="1" face="arial"color="#273746"><strong>   {ponderacionPromedio}</strong></font></td>
                                                <td width = "30%"><font size="1" face="arial"color="#283747"><strong> Nivel de riesgo:</strong></font></td>
                                                 {celda}                                  
                                                </tr>   
                                                </MDBTableBody>                                              
                                                </MDBTable>
                                                <table style={{marginLeft:"5%"}}  responsive small bordless  className="text-left">
                                                <tr >                              
                                                <td width="100%"><font size="2" face="arial"color="black" ><strong>Necesidad de la acción : </strong></font></td>                                
                                                </tr>
                                                <tr>
                                                  <td width="100%"><font size="1" face="arial"color="black" >{criterios}</font></td>
                                                </tr>
                                                </table>
                                              <table width="500" className="table-bordered" style={{marginLeft:"5%"}}>
                                                <tr >
                                                  <th width="10%" scope="col"><p  style={{fontSize:"6px"}}><strong>#</strong></p></th>
                                                  <th width="40%" scope="col"><p style={{fontSize:"6px"}}><strong >Nombre</strong></p></th>
                                                  <th width="10%"  scope="col"><p style={{fontSize:"6px"}}><strong>Ambiente de trabajo</strong></p></th>
                                                  <th width="10%" scope="col"><p style={{fontSize:"6px"}}><strong >Factores propios</strong></p></th>
                                                  <th width="10%" scope="col"><p style={{fontSize:"6px"}}><strong >Organización</strong></p></th>
                                                  <th width="10%" scope="col"><p style={{fontSize:"6px"}}><strong>Liderazgo</strong></p></th>
                                                  <th width="10%"scope="col"><p  style={{fontSize:"6px"}}><strong>Total</strong></p></th>
                                                </tr>
                                              {arrayFinal.map(rows=>{
                                                let fila1;
                                                let fila2;
                                                let fila3;
                                                let fila4;
                                                let fila5;
                                                if(rows[1] < 3){
                                                  fila1 = <td width="10%" style={{backgroundColor: "#9BE0F7"}}>
                                                     <font size="1" face="arial"color="black">
                                                     {rows[1]}
                                                     </font>
                                                   </td>
                                                   frecuenciaAmbiente1++;
                                                    console.log("frecuenciaAmbiente" ,frecuenciaAmbiente1)
                                               }else if(rows[1] >= 3 && rows[1] < 5){                                                     
                                                   fila1 = <td width="10%" style={{backgroundColor: "#6BF56E"}}>
                                                     <font size="1" face="arial"color="black">
                                                     {rows[1]}
                                                     </font>
                                                   </td>
                                                   frecuenciaAmbiente2++;
                                                   console.log("frecuenciaAmbiente" ,frecuenciaAmbiente1)
                                               }else if(rows[1] >= 5 && rows[1] < 7){
                                                    fila1 = <td width="10%" style={{backgroundColor: "#FFFF00"}}>
                                                       <font size="1" face="arial"color="black">
                                                       {rows[1]}
                                                       </font>
                                                     </td>
                                                     frecuenciaAmbiente3++;
                                               }else if(rows[1] >= 7 && rows[1] < 9){
                                                    fila1 = <td width="10%" style={{backgroundColor: "#FFC000"}}>
                                                       <font size="1" face="arial"color="black">
                                                       {rows[1]}
                                                       </font>
                                                     </td>
                                                     frecuenciaAmbiente4++;
                                               }else if(rows[1] >= 9){
                                                     fila1 = <td  width="10%" style={{backgroundColor: "#FF0000"}} >
                                                       <font size="1" face="arial"color="black">
                                                       {rows[1]}
                                                       </font>
                                                     </td>
                                                     frecuenciaAmbiente5++;
                                               }
                                               if(rows[2] < 10){
                                                fila2 = <td width="10%" style={{backgroundColor: "#9BE0F7"}}>
                                                <font size="1" face="arial"color="black">
                                                {rows[2]}
                                                </font>
                                                </td>
                                                frecuenciaFactores1++;
                                              }else if(rows[2] >= 10 && rows[2] < 20){
                                                fila2 = <td width="10%" style={{backgroundColor: "#6BF56E"}}>
                                                <font size="1" face="arial"color="black">
                                                {rows[2]}
                                                </font>
                                                </td>
                                                frecuenciaFactores2++;
                                              }else if(rows[2] >=20 && rows[2] < 30){
                                                fila2 = <td width="10%" style={{backgroundColor: "#FFFF00"}}>
                                                <font size="1" face="arial"color="black">
                                                {rows[2]}
                                                </font>
                                                </td>
                                                frecuenciaFactores3++;
                                              }else if(rows[2] >=30 && rows[2] < 40){
                                                fila2 = <td width="10%" style={{backgroundColor: "#FFC000"}}>
                                                <font size="1" face="arial"color="black">
                                                {rows[2]}
                                                </font>
                                                </td>
                                                frecuenciaFactores4++;
                                              }else if(rows[2] >= 40){
                                                fila2 = <td width="10%" style={{backgroundColor: "#FF0000"}}>
                                                <font size="1" face="arial"color="black">
                                                {rows[2]}
                                                </font>
                                                </td>
                                                frecuenciaFactores5++;
                                              }
                                              if(rows[3] < 4){
                                                fila3 = 
                                                <td width="10%" style={{backgroundColor: "#9BE0F7"}}>
                                                  <font size="1" face="arial"color="black">
                                                    {rows[3]}
                                                  </font>
                                                </td>
                                                frecuenciaOrganizacion1++;
                                              }else if(rows[3] >= 4 && rows[3] < 6){
                                                fila3 = 
                                                <td width="10%" style={{backgroundColor: "#6BF56E"}}>
                                                  <font size="1" face="arial"color="black">
                                                    {rows[3]}
                                                  </font>
                                                </td>
                                                frecuenciaOrganizacion2++;
                                              }else if(rows[3] >=6 && rows[3] < 9){
                                                fila3 = 
                                                <td width="10%" style={{backgroundColor: "#FFFF00"}}>
                                                  <font size="1" face="arial"color="black">
                                                    {rows[3]}
                                                  </font>
                                                </td>
                                                frecuenciaOrganizacion3++;
                                              }else if(rows[3] >=9 && rows[3] < 12){
                                                fila3 = 
                                                <td width="10%" style={{backgroundColor: "#FFC000"}}>
                                                  <font size="1" face="arial"color="black">
                                                    {rows[3]}
                                                  </font>
                                                </td>
                                                frecuenciaOrganizacion4++;
                                              }else if(rows[3] >= 12){
                                                fila3 = 
                                                <td width="10%" style={{backgroundColor: "#FF0000"}}>
                                                  <font size="1" face="arial"color="black">
                                                    {rows[3]}
                                                  </font>
                                                </td>
                                                frecuenciaOrganizacion5++;
                                              }

                                              if(rows[4]  < 10){
                                                fila4 = 
                                                <td width="10%" style={{backgroundColor: "#9BE0F7"}}>
                                                  <font size="1" face="arial"color="black">
                                                    {rows[4]}
                                                  </font>
                                                </td>
                                                frecuenciaLiderazgo1++;
                                              }else if(rows[4] >= 10 && rows[4] < 18){
                                                fila4 = 
                                                <td width="10%" style={{backgroundColor: "#6BF56E"}}>
                                                  <font size="1" face="arial"color="black">
                                                    {rows[4]}
                                                  </font>
                                                </td>
                                                 frecuenciaLiderazgo2++;
                                              }else if(rows[4] >=18 && rows[4] < 28){
                                                fila4 = 
                                                <td width="10%" style={{backgroundColor: "#FFFF00"}}>
                                                  <font size="1" face="arial"color="black">
                                                    {rows[4]}
                                                  </font>
                                                </td>
                                                 frecuenciaLiderazgo3++;
                                              }else if(rows[4] >=28 && rows[4] < 38){
                                                fila4 = 
                                                <td width="10%" style={{backgroundColor: "#FFC000"}}>
                                                  <font size="1" face="arial"color="black">
                                                    {rows[4]}
                                                  </font>
                                                </td>
                                                 frecuenciaLiderazgo4++;
                                              }else if(rows[4] >= 38){
                                                fila4 = 
                                                <td width="10%" style={{backgroundColor: "#FF0000"}}>
                                                  <font size="1" face="arial"color="black">
                                                    {rows[4]}
                                                  </font>
                                                </td>   
                                                 frecuenciaLiderazgo5++;  
                                              }
                                                if(rows[5]<20){
                                                  fila5 = 
                                                  <td width="10%" style={{backgroundColor: "#9BE0F7"}}>
                                                    <font size="1" face="arial"color="black">
                                                      {rows[5]}
                                                    </font>
                                                  </td>    
                                                }
                                                else if(rows[5]>=20 && rows[5] <45){
                                                  fila5 = 
                                                  <td width="10%" style={{backgroundColor: "#6BF56E"}}>
                                                    <font size="1" face="arial"color="black">
                                                      {rows[5]}
                                                    </font>
                                                  </td> 
                                                }else if(rows[5]>=45 && rows[5] < 70){
                                                  fila5 = 
                                                  <td width="10%" style={{backgroundColor: "#FFFF00"}}>
                                                    <font size="1" face="arial"color="black">
                                                      {rows[5]}
                                                    </font>
                                                  </td> 
                                                }else if(rows[5]>=70 && rows[5] < 90){
                                                  fila5 = 
                                                  <td width="10%" style={{backgroundColor: "#FFC000"}}>
                                                    <font size="1" face="arial"color="black">
                                                      {rows[5]}
                                                    </font>
                                                  </td> 
                                                }
                                                else if( rows[5] >= 90){
                                                  fila5 = 
                                                  <td width="10%" style={{backgroundColor: "#FF0000"}}>
                                                    <font size="1" face="arial"color="black">
                                                      {rows[5]}
                                                    </font>
                                                  </td> 
                                              } 
                                                return(
                                                    
                                                      <tr>
                                                        <td  width="10%"  scope="col" ><font size="1" face="arial"color="black" >{increment++}</font></td>
                                                        <td  width="40%" scope="col"><font size="1" face="arial"color="black" >{rows[0]}</font></td>
                                                         {fila1}
                                                         {fila2}
                                                         {fila3}
                                                         {fila4}
                                                         {fila5}
                                                      </tr>
                                                )

                                              })}

                                              </table>

                                              <br/>
                                              <br/>
                                           
                                              <p style={{marginLeft:"5%"}}><font size="1" face="arial"color="black" >FRECUENCIA</font></p>
                                              <table width = "500" className=" table-bordered" style={{marginLeft:"5%"}}>
                                              
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
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaAmbiente1}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaAmbiente2}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaAmbiente3}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaAmbiente4}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaAmbiente5}</font></td>
                                                  </tr>
                                                  <tr>
                                                  <td><font size="1" face="arial"color="black" >2</font></td>
                                                  <td><font size="1" face="arial"color="black" >Factores Propios</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaFactores1}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaFactores2}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaFactores3}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaFactores4}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaFactores5}</font></td>
                                                  </tr>
                                                  <tr>
                                                  <td><font size="1" face="arial"color="black" >3</font></td>
                                                  <td><font size="1" face="arial"color="black" >Organizacion</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaOrganizacion1}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaOrganizacion2}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaOrganizacion3}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaOrganizacion4}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaOrganizacion5}</font></td>
                                                  </tr>
                                                  <tr>
                                                  <td><font size="1" face="arial"color="black" >4</font></td>
                                                  <td><font size="1" face="arial"color="black" >Liderazgo</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaLiderazgo1}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaLiderazgo2}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaLiderazgo3}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaLiderazgo4}</font></td>
                                                  <td><font size="1" face="arial"color="black" >{frecuenciaLiderazgo5}</font></td>
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

          let tablaPeriodoActual;   
          if(this.state.tablaPeriodoActual == true){
            let periodo;
            periodo = localStorage.getItem("periodo")
                       const columns = ["ID","Nombre","Centro de Trabajo","Periodo",{name:"Resultados",label:"Respuestas",options:{filter: false,sort: false,}},{name:"Resultados",label:"Resultados",options:{filter: false,sort: false,}}];

            const data = this.state.empleados.map(rows=>{
              if(rows) {
                let botonRespuestas = <div><MDBBtn className = "text-white"   disabled={!this.state.botonResultados}size="md" color="danger"  onClick={(e) => this.reporteIndividual(rows.id,rows.periodo)}>Respuestas</MDBBtn></div>
                let botonResultados =  <div><MDBBtn className = "text-white"  disabled={!this.state.botonResultados} color="secondary" size="md" onClick={(e) => this.getEvaluacion(rows.id,rows.periodo)}>Resultados</MDBBtn></div> 
              return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.CentroTrabajo,rows.periodo,botonRespuestas,botonResultados])
              }
               
            })
            tablaPeriodoActual  = <MUIDataTable
            title={`Tabla de reportes RP ${periodo}`}
            data={data}
            columns={columns}
            options={options}
          />
          }

          let tablaPeriodoSeleccionado;
          if(this.state.tablaPeriodoSeleccionado == true){
         
            const columns = ["ID","Nombre","Centro de Trabajo","Periodo",{name:"Resultados",label:"Respuestas",options:{filter: false,sort: false,}},{name:"Resultados",label:"Resultados",options:{filter: false,sort: false,}}];
            const data = this.state.empleados.map(rows=>{
              if(rows) {
                let botonRespuestas = <div><MDBBtn className = "text-white"   disabled={!this.state.botonResultados}size="md" color="danger"  onClick={(e) => this.reporteIndividual(rows.id,rows.periodo)}>Respuestas</MDBBtn></div>
                let botonResultados =  <div><MDBBtn className = "text-white"  disabled={!this.state.botonResultados} color="secondary" size="md" onClick={(e) => this.getEvaluacion(rows.id,rows.periodo)}>Resultados</MDBBtn></div> 
              return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.CentroTrabajo,rows.periodo,botonRespuestas,botonResultados])
              }
               
            })
            tablaPeriodoActual  = <MUIDataTable
            title={`Tabla de reportes RP`}
            data={data}
            columns={columns}
            options={options}
          />
          
          }
                
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
      
      <React.Fragment>
      <div>
        <Navbar/>
        <div >
        <div  style={{marginTop:"5%", maxWidth:1140}}>
        <MDBRow>
        <MDBCol style={{ maxWidth: "30rem" }}> 
            <ReactFusioncharts
              type="pie3d"
              width="140%"
              height="60%"
              dataFormat="JSON"
              dataSource={dataSource}
            />
              <MDBCard style={{marginLeft:"20%",width:"101%"}}>
              <MDBCardHeader>
              <center>
              <Button style={{ color: 'green' }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleDropdown}>
              <strong>&nbsp;Resultados de otros periodos<br/><i class="fas fa-mouse-pointer"></i></strong>
              </Button>
              </center>
              <Menu
                  id="simple-menu"
                  anchorEl={this.state.dropdown}
                  keepMounted
                  open={Boolean(this.state.dropdown)}
                  onClose={this.handleClose}
              >
              { this.state.todosLosPeriodos.map((rows)=>{
                if(rows.Descripcion){
                  return( <MenuItem value={rows.Descripcion} onClick={e=>this.cargarTablaPeriodoSeleccionado(rows.Descripcion)}><strong>{rows.Descripcion.toUpperCase()}</strong></MenuItem>
                  ) }
              })}
                
              </Menu>
              </MDBCardHeader>
              <MDBCardBody>
              <center>
              {botonCerrar}
              {botonDescargarReporteIndividual}
              {botonDescargarReporteIndividualResultados}
              {botonResultadosGlobales}
              {botonDescargarResultadosGlobales}
              {PDFRespuestasMasivos}
              {PDFResultadosMasivos}
              {botonDescargarReporteEjecutivo}

              {/* 
              
               */}
              {spinner}
              </center>
              </MDBCardBody>
              </MDBCard>

            </MDBCol> 
            <MDBCol style={{ maxWidth: "50rem" }}>
            <div style={{display: 'table', tableLayout:'fixed', width:'119%',marginLeft:"14%"}} >
                {tablaPeriodoActual}
                {reporteIndividual}
                {ponderacionIndividual}
                {ponderacion}
                {reporteEjecutivo}
                {tablaPeriodoSeleccionado}

            </div>
            </MDBCol>
         </MDBRow>
          </div> 
      </div>
      </div>
      </React.Fragment> 
    )
  }
}

export default App 