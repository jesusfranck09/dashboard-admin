import React from "react";
import MUIDataTable from "mui-datatables";
import { Progress } from 'reactstrap';
import {MDBBtn,MDBIcon} from 'mdbreact';
import { API} from '../utils/http'
import {Spinner,Button as BotonReactstrap} from 'react-bootstrap'
import '../Home/index.css'
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'
import Navbar from '../Home/navbar'
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { Tabs, Card, Button, Modal } from 'antd';
import ReportEEOI from "./reportEEO/reportEEOI";
import ReportEEORI from "./reportEEO/reportEEORI";
import ReportEEOM from "./reportEEO/reportEEOM";
import ReportEEOMR from "./reportEEO/reportEEOMR";
import ReportEEOGE from "./reportEEO/reportEEOGE";
import { Collapse } from 'antd';
const { TabPane } = Tabs;
const { Panel } = Collapse;

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
      resultados:[],
      resultadosEvaluacionMasivo:[],
      reporteImasivo:[],
      datosLength:'',
      totalEmpleadosFiltrados:'',
      resultadosInicio:[],
      showModal2: false,  
      spinner:false,
      evaluacionMasivoResultados:[],
      respuestasInicio:[],
      FechaCompleta:'',
      tablaPeriodoActual:true,
      dropdown:null,
      reporteIndividual:false,
      reporteResultadosIndividual:false,
      reporteResultadosGlobales:false,
      tablaPeriodoSeleccionado:false,
      periodoSeleccionado:'',
      todosLosPeriodos:[],
      evaluacionesTodosLosPeriodos:[],
      reporteEjecutivo:false,
      visible2:false,
      visible:false,
      visible3:false,
      visible4:false,
      confirmLoading:false,
      confirmLoading2:false,
      confirmLoading3:false,
      confirmLoading4:false,
      descarga:false,
      descarga2:false,
      descarga3:false,
      parametro:'',
      parametroRenderizado:'',
      collapse:true,
      disabledButtons:false,
      leyendaDemo:''
    };
    this.handleLogOut = this.handleLogOut.bind(this);
    this.reporteEjecutivo = this.reporteEjecutivo.bind(this);  
  }
  componentWillMount(){
    let paquete = localStorage.getItem("paqueteAdquirido")
    if(paquete === "40" || paquete === "41" || paquete === "42"){
      this.setState({disabledButtons:true})
      this.setState({leyendaDemo:"Licencia demo adquirida, funciones principales no disponibles"})
    }
    this.getGlobalEmployees();
  }
  componentDidMount() {
    window.scrollTo(0, 0)
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

    async getGlobalEmployees() {
      let periodo = localStorage.getItem("periodo");
      this.setState({ spinner: true, progress: 0 });  // Inicializamos el spinner y el progreso
      
      let totalEmpleados = [];
      var idAdmin = localStorage.getItem("idAdmin");
      let evaluacionesRealizadasPeriodoActual;
      let evaluacionEEO;
      let result;
      let progress = 0;
    
      try {
        // 1. Obtener todos los periodos
        const periodosResponse = await axios({
          url: API,
          method: 'post',
          data: {
            query: `
              query {
                getallPeriodo(data:"${[idAdmin]}") {
                  Descripcion
                  EventoActivo
                }
              }
            `
          }
        });
        this.setState({ todosLosPeriodos: periodosResponse.data.data.getallPeriodo });
        progress += 20; // Incrementamos el progreso al 20%
        this.setState({ progress });
    
        // 2. Obtener empleados por periodo
        const empleadosResponse = await axios({
          url: API,
          method: 'post',
          data: {
            query: `
              query {
                getEmployeesPerido(data:"${[idAdmin]}") {
                  id
                  nombre
                  ApellidoP
                  ApellidoM
                  CentroTrabajo
                  AreaTrabajo
                  idPeriodo
                  periodo
                  encuesta
                  fk_empleados
                }
              }
            `
          }
        });
    
        evaluacionesRealizadasPeriodoActual = empleadosResponse.data.data.getEmployeesPerido;
        evaluacionesRealizadasPeriodoActual.sort((a, b) =>
          a.ApellidoP > b.ApellidoP ? 1 : (b.ApellidoP > a.ApellidoP ? -1 : 0)
        );
    
        evaluacionEEO = evaluacionesRealizadasPeriodoActual.filter(hero => hero.encuesta === "EEO");
        this.setState({ evaluacionesTodosLosPeriodos: evaluacionEEO });
        
        progress += 20; // Incrementamos al 40% tras cargar empleados
        this.setState({ progress });
    
        // 3. Obtener los resultados de la encuesta EEO para cada empleado
        const resultPromises = evaluacionEEO.map(rows => {
          return axios({
            url: API,
            method: 'post',
            data: {
              query: `
                query {
                  getresultGlobalSurveyEEO(data:"${[rows.id, rows.periodo]}") {
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
                    Periodo
                  }
                }
              `
            }
          });
        });
    
        const responses = await Promise.all(resultPromises);
        totalEmpleados = responses.map(response => response.data.data.getresultGlobalSurveyEEO);
        this.setState({ resultadosInicio: totalEmpleados });
        this.setState({ evaluacionMasivoResultados: totalEmpleados });
    
        progress += 40; // Incrementamos al 80% tras obtener los resultados
        this.setState({ progress });
    
        if (totalEmpleados.length === this.state.evaluacionMasivoResultados.length) {
          this.setState({ spinner: false });
        }
    
        result = evaluacionEEO.filter(hero => hero.periodo === periodo);
        this.setState({ empleados: result });
    
        // 4. Obtener la ponderación de las encuestas EEO
        const ponderacionResponse = await axios({
          url: API,
          method: 'post',
          data: {
            query: `
              query {
                getPonderacionEEO(data:"${[idAdmin]}") {
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
        });
    
        this.setState({ getPonderacion: ponderacionResponse.data.data.getPonderacionEEO });
        
        progress += 20; // Incrementamos al 100% cuando todo haya terminado
        this.setState({ progress });
    
      } catch (err) {
        console.error("Error en la ejecución de las peticiones: ", err);
        this.setState({ spinner: false });
      }
    }
    
    
    async cargarTablaPeriodoSeleccionado(parametro) {
      this.setState({ collapse: false });
    
      const periodo = parametro;
      const empleados = this.state.evaluacionesTodosLosPeriodos;
    
      // Filtrar empleados por el periodo seleccionado
      const arrayFilter = empleados.filter(e => e.periodo === periodo);
    
      // Limpiar los empleados antes de aplicar el filtro
      await this.setState({ empleados: [] });
    
      // Actualizar el estado con los empleados del periodo seleccionado
      this.setState({ tablaPeriodoSeleccionado: true });
      this.setState({ empleados: arrayFilter });
    
      // Actualizar otros estados relacionados con el reporte
      this.setState({ reporteEjecutivo: false });
      this.setState({ reporteResultadosIndividual: false });
      this.setState({ reporteResultadosGlobales: true });
      this.setState({ reporteIndividual: false });
    }
    
   
     consultarDatosFiltrados =  async(datos,filtro,periodoTabla,parametro)=>{
      let array=[];
      datos.map(rows=>{
       array.push(rows.data[0])
      })
      this.setState({parametroRenderizado:1})
      this.setState({reporteResultadosGlobales:true})
      this.setState({visible3:false})
      this.setState({reporteIndividual:false})
      this.setState({reporteResultadosIndividual:false})
      this.setState({reporteEjecutivo:false})
      this.setState({reporteIndividual:false})
      this.setState({tablaPeriodoSeleccionado:false})
      this.setState({botonDisabled:''})
      this.setState({botonResultados:''})
      let arrayFilter = []
      let filter;
      let filterArray;
      let filtrado = [];
       this.state.resultadosInicio.forEach(row=>{
           array.forEach(element => {
            filter  = row.filter(function(hero){
              return hero.fk_empleados === element
            })
              arrayFilter.push(filter)
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
      let filtrado2 = filtrado.filter(item => !array_equals(item, tag))
      await this.setState({peticion1:filtrado2})
      let filtros = this.state.filtroTabla
      if(filtros){
        if(filtros[0]){
          if(filtros[0].id.length>0){
            this.setState({nombre1:filtros[0].id})
            this.setState({filtro1:"ID"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre1:''})
            this.setState({filtro1:""})
            this.setState({filtro6:""})
          }
        }else{
          this.setState({filtro6:"SIN FILTRO"})
        }
        if(filtros[1]){
          if(filtros[1].nombre.length>0){
            this.setState({nombre2:filtros[1].nombre})
            this.setState({filtro2:"NOMBRE"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre2:''})
            this.setState({filtro2:""})
            this.setState({filtro6:""})
          }
        }
        if(filtros[2]){
          if(filtros[2].centroTrabajo.length>0){
            this.setState({nombre4:filtros[2].centroTrabajo})
            this.setState({filtro4:"CENTRO DE TRABAJO"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre4:''})
            this.setState({filtro4:""})
            this.setState({filtro6:""})
          }
        }
        if(filtros[3]){
          if(filtros[3].periodo.length>0){
            this.setState({nombre5:filtros[3].periodo})
            this.setState({filtro5:"PERIODO"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre5:''})
            this.setState({filtro5:""})
            this.setState({filtro6:""})
          }
        }
      }else{
        this.setState({filtro6:"SIN FILTRO"})
      }
      this.setState({datosLength:datos.length})
      if(parametro === 1){
        this.setState({tablaPeriodoActual:false})
        await this.setState({parametro:parametro})
      }if(parametro === 2){
        await this.setState({parametro:parametro})
        this.setState({parametro:''})
      }
    }

    reporteImasivo = async (datos,filtro,periodoTabla) =>{
    await this.setState({confirmLoading2:true})
    await setTimeout(() => {
      this.setState({visible2:false})
      this.setState({confirmLoading2:false})
    }, 3000);
    let array=[];
    datos.map(rows=>{
      array.push(rows.data[0])
    })
    let arrayFilter = []
    let filter;
    let filterArray;
    let filtrado = [];
    this.state.resultadosInicio.forEach(row=>{
      array.forEach(element=>{
      filter =row.filter(function(hero){
        return hero.fk_empleados === element
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
      let filtros = this.state.filtroTabla

      if(filtros){
        if(filtros[0]){
          if(filtros[0].id.length>0){
            this.setState({nombre1:filtros[0].id})
            this.setState({filtro1:"ID"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre1:''})
            this.setState({filtro1:""})
            this.setState({filtro6:""})
          }
        }else{
          this.setState({filtro6:"SIN FILTRO"})
        }
        if(filtros[1]){
          if(filtros[1].nombre.length>0){
            this.setState({nombre2:filtros[1].nombre})
            this.setState({filtro2:"NOMBRE"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre2:''})
            this.setState({filtro2:""})
            this.setState({filtro6:""})
          }
        }
        if(filtros[2]){
          if(filtros[2].centroTrabajo.length>0){
            this.setState({nombre4:filtros[2].centroTrabajo})
            this.setState({filtro4:"CENTRO DE TRABAJO"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre4:''})
            this.setState({filtro4:""})
            this.setState({filtro6:""})
          }
        }
        if(filtros[3]){
          if(filtros[3].periodo.length>0){
            this.setState({nombre5:filtros[3].periodo})
            this.setState({filtro5:"PERIODO"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre5:''})
            this.setState({filtro5:""})
            this.setState({filtro6:""})
          }
        }
      }else{
        this.setState({filtro6:"SIN FILTRO"})
      }
    await this.setState({descarga:true});
    this.setState({descarga:false})  
    this.setState({datosLength:datos.length})
  }

  reporteImasivoResultados = async (datos,filtro,periodoTabla) =>{
    await this.setState({confirmLoading:true})
    await setTimeout(() => {
      this.setState({visible:false})
      this.setState({confirmLoading:false})
    }, 3000);
    let array=[];
    datos.map(rows=>{
      array.push(rows.data[0])
    })
    let arrayFilter = []
    let filter;
    let filterArray;
    let filtrado = [];
    this.state.evaluacionMasivoResultados.forEach(row=>{
      array.forEach(element=>{
      filter =row.filter(function(hero){
        return hero.fk_empleados === element
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
      this.setState({resultadosEvaluacionMasivo:filtrado2})
      let filtros = this.state.filtroTabla

      if(filtros){
        if(filtros[0]){
          if(filtros[0].id.length>0){
            this.setState({nombre1:filtros[0].id})
            this.setState({filtro1:"ID"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre1:''})
            this.setState({filtro1:""})
            this.setState({filtro6:""})
          }
        }else{
          this.setState({filtro6:"SIN FILTRO"})
        }
        if(filtros[1]){
          if(filtros[1].nombre.length>0){
            this.setState({nombre2:filtros[1].nombre})
            this.setState({filtro2:"NOMBRE"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre2:''})
            this.setState({filtro2:""})
            this.setState({filtro6:""})
          }
        }
        if(filtros[2]){
          if(filtros[2].centroTrabajo.length>0){
            this.setState({nombre4:filtros[2].centroTrabajo})
            this.setState({filtro4:"CENTRO DE TRABAJO"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre4:''})
            this.setState({filtro4:""})
            this.setState({filtro6:""})
          }
        }
        if(filtros[3]){
          if(filtros[3].periodo.length>0){
            this.setState({nombre5:filtros[3].periodo})
            this.setState({filtro5:"PERIODO"})
            this.setState({filtro6:""})
          }else{
            this.setState({nombre5:''})
            this.setState({filtro5:""})
            this.setState({filtro6:""})
          }
        }
      }else{
        this.setState({filtro6:"SIN FILTRO"})
      }
      await this.setState({descarga2:true});
      this.setState({descarga2:false})  
      this.setState({datosLength:datos.length})
      }
    reporteIndividual(id,periodo,parametro){
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
        if(parametro===1){
          this.setState({botonDisabled:''})
          this.setState({reporteIndividual:true})
          this.setState({tablaPeriodoActual:false})
          this.setState({reporteResultadosIndividual:false})
          this.setState({reporteResultadosGlobales:false})
          this.setState({reporteEjecutivo:false})
          this.setState({tablaPeriodoSeleccionado:false})
          this.setState({resultados:''})
          this.setState({resultados :datos.data.data.resultSingleSurveyEEO })                
          this.setState({getPonderacion:[]})
        }
        if(parametro===2){
          this.setState({botonDisabled:''})
          this.setState({reporteIndividual:false})
          this.setState({tablaPeriodoActual:false})
          this.setState({reporteResultadosIndividual:true})
          this.setState({reporteResultadosGlaobales:false})
          this.setState({reporteEjecutivo:false})
          this.setState({tablaPeriodoSeleccionado:false})
          this.setState({resultados:datos.data.data.resultSingleSurveyEEO})
        }
        })
        .catch(err => {
          console.log("el error es  ",err)
        });  
      }          
   
      reporteEjecutivo = async (datos,filtro,periodoTabla)=>{
        this.setState({visible4:false})
        let array=[];
        datos.map(rows=>{
          array.push(rows.data[0])
        })
        this.setState({botonDisabled:''})
        this.setState({botonResultados:''})
        this.setState({reporteIndividual:false})
        this.setState({tablaPeriodoActual:false})      
        this.setState({tablaPeriodoSeleccionado:false})
        this.setState({reporteResultadosIndividual:false})
        this.setState({reporteResultadosGlobales:false})
        this.setState({reporteEjecutivo:true})
        this.setState({parametroRenderizado:2})
        let arrayFilter = []
        let filter;
        let filterArray;
        let filtrado2 = [];
          this.state.resultadosInicio.forEach(row=>{
            array.forEach(element => {
              filter  = row.filter(function(hero){
                return hero.fk_empleados === element
              })
                arrayFilter.push(filter)
            });
        })
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
        await this.setState({peticion1:filtrado})
        let filtros = this.state.filtroTabla

        if(filtros){
          if(filtros[0]){
            if(filtros[0].id.length>0){
              this.setState({nombre1:filtros[0].id})
              this.setState({filtro1:"ID"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre1:''})
              this.setState({filtro1:""})
              this.setState({filtro6:""})
            }
          }else{
            this.setState({filtro6:"SIN FILTRO"})
          }
          if(filtros[1]){
            if(filtros[1].nombre.length>0){
              this.setState({nombre2:filtros[1].nombre})
              this.setState({filtro2:"NOMBRE"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre2:''})
              this.setState({filtro2:""})
              this.setState({filtro6:""})
            }
          }
          if(filtros[2]){
            if(filtros[2].centroTrabajo.length>0){
              this.setState({nombre4:filtros[2].centroTrabajo})
              this.setState({filtro4:"CENTRO DE TRABAJO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre4:''})
              this.setState({filtro4:""})
              this.setState({filtro6:""})
            }
          }
          if(filtros[3]){
            if(filtros[3].periodo.length>0){
              this.setState({nombre5:filtros[3].periodo})
              this.setState({filtro5:"PERIODO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre5:''})
              this.setState({filtro5:""})
              this.setState({filtro6:""})
            }
          }
        }else{
          this.setState({filtro6:"SIN FILTRO"})
        }
      this.setState({datosLength:datos.length})
      await this.setState({parametro:2})
      // this.setState({parametro:''})
      }
    handleDropdown = (event) => {
      this.setState({dropdown: event.currentTarget});
    };
    handleClose = () => {
      this.setState({dropdown: null});
    };
    showModal = () => {
      this.setState({visible:true})
    };
    showModal2 = () => {
      this.setState({visible2:true})
    };
    showModal3 = () => {
      this.setState({visible3:true})
    };
    showModal4 = () => {
      this.setState({visible4:true})
    };
    handleCancel = () => {
      this.setState({visible:false})
    };
    handleCancel2 = () => {
      this.setState({visible2:false})
    };
    handleCancel3 = () => {
      this.setState({visible3:false})
    };
    handleCancel4 = () => {
      this.setState({visible4:false})
    };      
    callback(key) {
      console.log(key);
    }      
    cerrarTablaPeriodos(){
      this.setState({tablaPeriodoActual:true})
      this.setState({tablaPeriodoSeleccionado:false})
      this.setState({collapse:true})
    }
  render() {
    let leyendaDemo;
    let arrayFilter2 = [];
    if(this.state.leyendaDemo){
      leyendaDemo = <font color = "red">{this.state.leyendaDemo}</font>
    }else{
      leyendaDemo = <font color = "green">Licencia vigente</font>
    }
    var LaFecha=new Date();
    var Mes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    var diasem = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    var diasemana=LaFecha.getDay();
    var fechaCompleta="";
    var NumeroDeMes="";    
    NumeroDeMes=LaFecha.getMonth();
    fechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
    let periodoTabla;
    let datosEmpleados;
    let filtro;
    const options = {
        filterType: "dropdown",
        responsive: "stacked",
        elevation:0,
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
        periodoTabla = tableState.filterData[4]
        },
        onFilterChange: (action, filtroTable) => {
          filtro = filtroTable
          if(filtro[0]){
            arrayFilter2.push({id:filtro[0]})
          }if(filtro[1]){
            arrayFilter2.push({nombre:filtro[1]})
          }if(filtro[2]){
            arrayFilter2.push({centroTrabajo:filtro[2]})
          }if(filtro[3]){
            arrayFilter2.push({periodo:filtro[3]})
          }
          this.setState({filtroTabla:arrayFilter2})
          }          
      };
    let dataSource;
    charts(FusionCharts);
    let spinner;
    if (this.state.spinner === true) {
      spinner = (
        <div className="loading-container">
          <div className="progress-wrapper">
            <Spinner as="span" outline animation="border" size="sm" role="status" aria-hidden="true" className="spinner-loading" />
            <div className="progress-text">
              Validando información, por favor espere...
            </div>
            
            {/* Barra de progreso */}
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${this.state.progress}%` }}>
                <span className="progress-percentage">{this.state.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    

    if(this.state.spinnerReporte=== true){
      spinner = <div><BotonReactstrap variant="warning" disabled>
      <Spinner as="span" outline animation="border" size="sm" role="status" aria-hidden="true" />      
    </BotonReactstrap>{''}
    <BotonReactstrap variant="warning" disabled>
      <Spinner as="span" outline animation="border" size="sm" role="status" aria-hidden="true" />
      Generando reporte por favor espere...
    </BotonReactstrap>
    </div>
    }

      let reporteIndividual;
      let ponderacionIndividual;
      if(this.state.resultados[2]){
        let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,value21,value22,value23,value24;
        let value25,value26,value27,value28,value29,value30,value31,value32,value33,value34,value35,value36,value37,value38,value39,value40,value41,value42,value43,value44,value45,value46;
        let value47,value48,value49,value50,value51,value52,value53,value54,value55,value56,value57,value58,value59,value60,value61,value62,value63,value64,value65,value66,value67,value68;
        let value69,value70,value71,value72;
 
        let filtrar1,filtrar2,filtrar3,filtrar4,filtrar5,filtrar6,filtrar7,filtrar8,filtrar9,filtrar10,
            filtrar11,filtrar12,filtrar13,filtrar14,filtrar15,filtrar16,filtrar17,filtrar18,filtrar19,filtrar20,
            filtrar21,filtrar22,filtrar23,filtrar24,filtrar25,filtrar26,filtrar27,filtrar28,filtrar29,filtrar30,
            filtrar31,filtrar32,filtrar33,filtrar34,filtrar35,filtrar36,filtrar37,filtrar38,filtrar39,filtrar40,
            filtrar41,filtrar42,filtrar43,filtrar44,filtrar45,filtrar46,filtrar47,filtrar48,filtrar49,filtrar50,
            filtrar51,filtrar52,filtrar53,filtrar54,filtrar55,filtrar56,filtrar57,filtrar58,filtrar59,filtrar60,
            filtrar61,filtrar62,filtrar63,filtrar64,filtrar65,filtrar66,filtrar67,filtrar68,filtrar69,filtrar70,filtrar71,filtrar72;
        filtrar1 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "1";
        });
        value1 = filtrar1.pop()
        filtrar2 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "2";
        });
        value2 = filtrar2.pop()
        filtrar3 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "3";
        });
        value3 = filtrar3.pop()
        filtrar4 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "4";
        });
        value4 = filtrar4.pop()
        filtrar5 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "5";
        });
        value5 = filtrar5.pop()
        filtrar6 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "6";
        });
        value6 = filtrar6.pop()
        filtrar7 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "7";
        });
        value7 = filtrar7.pop()
        filtrar8 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "8";
        });
        value8 = filtrar8.pop()
        filtrar9 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "9";
        });
        value9  = filtrar9.pop()
        filtrar10 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "10";
        });
        value10 = filtrar10.pop()
        filtrar11 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "11";
        });
        value11 = filtrar11.pop()
        filtrar12 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "12";
        });
        value12 = filtrar12.pop()
        filtrar13 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "13";
        });
        value13 = filtrar13.pop()
        filtrar14 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "14";
        });
        value14 = filtrar14.pop()
        filtrar15 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "15";
        });
        value15 = filtrar15.pop()
        filtrar16 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "16";
        });
        value16 = filtrar16.pop()
        filtrar17 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "17";
        });
        value17 = filtrar17.pop()
        filtrar18 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "18";
        });
        value18 = filtrar18.pop()
        filtrar19 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "19";
        });
        value19 = filtrar19.pop()
        filtrar20=  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "20";
        });
        value20 = filtrar20.pop()
        filtrar21 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "21";
        });
        value21 = filtrar21.pop()
        filtrar22 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "22";
        });
        value22 = filtrar22.pop()
        filtrar23 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "23";
        });
        value23 = filtrar23.pop()
        filtrar24=  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "24";
        });
        value24 = filtrar24.pop();
        filtrar25 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "25";
        });
        value25 = filtrar25.pop()
        filtrar26 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "26";
        });
        value26 = filtrar26.pop()
        filtrar27 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "27";
        });
        value27 = filtrar27.pop()
        filtrar28 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "28";
        });
        value28 = filtrar28.pop()
        filtrar29 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "29";
        });
        value29 = filtrar29.pop()
        filtrar30 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "30";
        });
        value30 = filtrar30.pop()
        filtrar31 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "31";
        });
        value31 = filtrar31.pop()
        filtrar32 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "32";
        });
        value32 = filtrar32.pop()
        filtrar33 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "33";
        });
        value33 = filtrar33.pop()
        filtrar34 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "34";
        });
        value34 = filtrar34.pop()
        filtrar35 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "35";
        });
        value35 = filtrar35.pop()
        filtrar36 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "36";
        });
        value36 = filtrar36.pop()
        filtrar37 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "37";
        });
        value37 = filtrar37.pop()
        filtrar38 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "38";
        });
        value38 = filtrar38.pop()
        filtrar39 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "39";
        });
        value39 = filtrar39.pop()
        filtrar40 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "40";
        });
        value40 = filtrar40.pop()
        filtrar41 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "41";
        });  
        value41 = filtrar41.pop()
        filtrar42 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "42";
        });  
        value42 = filtrar42.pop()
        filtrar43 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "43";
        });
        value43 = filtrar43.pop()
        filtrar44 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "44";
        });
        value44 = filtrar44.pop()
        filtrar45 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "45";
        });
        value45 = filtrar45.pop()
        filtrar46 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "46";
        });
        value46 = filtrar46.pop()
        filtrar47 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "47";
        });
        value47 = filtrar47.pop()
        filtrar48 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "48";
        });
        value48 = filtrar48.pop()
        filtrar49 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "49";
        });
        value49 = filtrar49.pop()
        filtrar50 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "50";
        });
        value50 = filtrar50.pop()
        filtrar51 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "51";
        });
        value51 = filtrar51.pop()
        filtrar52 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "52";
        });
        value52= filtrar52.pop()
        filtrar53 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "53";
        });
        value53 = filtrar53.pop()
        filtrar54 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "54";
        });
        value54 = filtrar54.pop()
        filtrar55 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "55";
        });
        value55 = filtrar55.pop()
        filtrar56 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "56";
        });
        value56 = filtrar56.pop()
        filtrar57 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "57";
        });
        value57 = filtrar57.pop()
        filtrar58 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "58";
        });
        value58 = filtrar58.pop()
        filtrar59 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "59";
        });
        value59 = filtrar59.pop()
        filtrar60 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "60";
        });
        value60 = filtrar60.pop()
        filtrar61 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "61";
        });
        value61 = filtrar61.pop()
        filtrar62 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "62";
        });
        value62 = filtrar62.pop()
        filtrar63 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "63";
        });
        value63 = filtrar63.pop()
        filtrar64 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "64";
        });
        value64 = filtrar64.pop()
        filtrar65 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "65";
        });
        value65 = filtrar65.pop()
        filtrar66 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "66";
        });
        value66 = filtrar66.pop()
        filtrar67 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "67";
        });
        value67 = filtrar67.pop()
        filtrar68 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "68";
        });
        value68 = filtrar68.pop()
        filtrar69 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "69";
        });
        value69= filtrar69.pop()
        filtrar70 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "70";
        });
        value70 = filtrar70.pop()
        filtrar71 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "71";
        });
        value71 = filtrar71.pop()
        filtrar72 =  this.state.resultados.filter(function(hero) {
          return hero.fk_preguntasEEO === "72";
        });
        value72 = filtrar72.pop()
        let array = [];

        array.push(value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,
          value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,
          value21,value22,value23,value24,value25,value26,value27,value28,value29,value30,
          value31,value32,value33,value34,value35,value36,value37,value38,value39,value40,
          value41,value42,value43,value44,value45,value46,value47,value48,value49,value50,
          value51,value52,value53,value54,value55,value56,value57,value58,value59,value60,
          value61,value62,value63,value64,value65,value66,value67,value68,value69,value70,value71,value72)

        if(this.state.reporteIndividual === true){
          let estado =  this.state.resultados[0]
          reporteIndividual = <ReportEEOI fechaCompleta={fechaCompleta} data = {array} estado={estado}/>
        }
        if(this.state.reporteResultadosIndividual === true){
           ponderacionIndividual = <ReportEEORI fechaCompleta={fechaCompleta} data = {array}/>
        }
      }
      let PDFRespuestasMasivos;
      if(this.state.reporteImasivo[0]){
        let filtro1 = this.state.filtro1
        let filtro2 = this.state.filtro2
        let filtro3 = this.state.filtro3
        let filtro4 = this.state.filtro4
        let filtro5 = this.state.filtro5
        let filtro6 = this.state.filtro6
        let filtro7 = this.state.filtro7
        let filtro8 = this.state.filtro8
        let descarga = this.state.descarga
        let datosLength = this.state.datosLength
        PDFRespuestasMasivos = <ReportEEOM datosLength={datosLength} filtro1={filtro1} filtro2={filtro2} filtro3={filtro3}
        filtro4={filtro4} filtro5={filtro5} filtro6={filtro6} filtro7={filtro7} filtro8={filtro8} descarga = {descarga}
        reporteImasivo = {this.state.reporteImasivo} fechaCompleta={fechaCompleta}/>
      }
      let PDFResultadosMasivos;
      if(this.state.resultadosEvaluacionMasivo[0]){
        let filtro1 = this.state.filtro1
        let filtro2 = this.state.filtro2
        let filtro3 = this.state.filtro3
        let filtro4 = this.state.filtro4
        let filtro5 = this.state.filtro5
        let filtro6 = this.state.filtro6
        let filtro7 = this.state.filtro7
        let filtro8 = this.state.filtro8
        let descarga = this.state.descarga2
        let datosLength = this.state.datosLength
        PDFResultadosMasivos = <ReportEEOMR resultadosEvaluacionMasivo={this.state.resultadosEvaluacionMasivo} datosLength={datosLength} filtro1={filtro1} filtro2={filtro2} filtro3={filtro3}
        filtro4={filtro4} filtro5={filtro5} filtro6={filtro6} filtro7={filtro7} filtro8={filtro8} descarga = {descarga}
        fechaCompleta={fechaCompleta}/>
      }
      let ponderacion;
      if(this.state.peticion1.length>0 && this.state.reporteResultadosGlobales === true && this.state.parametroRenderizado === 1){
        let filtro1 = this.state.filtro1
        let filtro2 = this.state.filtro2
        let filtro3 = this.state.filtro3
        let filtro4 = this.state.filtro4
        let filtro5 = this.state.filtro5
        let filtro6 = this.state.filtro6
        let filtro7 = this.state.filtro7
        let filtro8 = this.state.filtro8
        let datosLength  = this.state.datosLength
      ponderacion = <ReportEEOGE  datosLength={datosLength}fechaCompleta = {fechaCompleta} filtro1={filtro1} filtro2={filtro2} filtro3={filtro3}
      filtro4={filtro4} filtro5={filtro5} filtro6={filtro6} filtro7={filtro7} filtro8={filtro8} peticion1 = {this.state.peticion1} parametro = {this.state.parametro}/>
   }
   let reporteEjecutivo;
   if(this.state.peticion1[0] && this.state.reporteEjecutivo === true && this.state.parametroRenderizado === 2){
    let filtro1 = this.state.filtro1
    let filtro2 = this.state.filtro2
    let filtro3 = this.state.filtro3
    let filtro4 = this.state.filtro4
    let filtro5 = this.state.filtro5
    let filtro6 = this.state.filtro6
    let filtro7 = this.state.filtro7
    let filtro8 = this.state.filtro8
    reporteEjecutivo = <ReportEEOGE parametro={this.state.parametro} peticion1 = {this.state.peticion1}  
    filtro1={filtro1} filtro2={filtro2} filtro3={filtro3}
    filtro4={filtro4} filtro5={filtro5} filtro6={filtro6} filtro7={filtro7} filtro8={filtro8}/>
   }
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

          let colorCategoriaUno;
          let textoCategoriaUno;
          let categoriaUno = ((respuesta1+respuesta3+respuesta2+respuesta4+respuesta5)/length).toFixed(2);
          if(categoriaUno < 5){
            colorCategoriaUno  = "#9BE0F7"
            textoCategoriaUno = "Nulo"
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
            textoCategoriaDos = "Nulo"
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
            textoCategoriaTre="Nulo"
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
            textoCategoriaCuatro="Nulo"
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
            textoCategoriaCuatro="Nulo"
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
            caption: "Gráfica de previsualización de Evaluación de Entorno Organizacional",
            subcaption: "Ponderación",
            showvalues: "1",
            showpercentintooltip: "0",
            enablemultislicing: "1",
            theme: "fusion"
            },
            data: [
              {
                label: "Ambiente de Trabajo",
                value:  categoriaUno,
                color: colorCategoriaUno,
                labelFontSize:12,
                toolText: textoCategoriaUno
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
                label: "Organización",
                value: categoriaTre,
                color: colorCategoriaTre,
                labelFontSize:12,
                toolText: textoCategoriaTre
              },
              {
                label: "Liderazgo ",
                value: categoriaCuatro,
                color: colorCategoriaCuatro,
                labelFontSize:12,
                toolText: textoCategoriaCuatro
              },
              {
                label: "Entorno Organizacional",
                value: categoriaCinco,
                color: colorCategoriaCinco,
                labelFontSize:12,
                toolText: textoCategoriaCinco
              },
            ]
          };    }
   
    let tablaPeriodoActual;  
    if(this.state.tablaPeriodoActual === true){
      let periodo;
      periodo = localStorage.getItem("periodo")
      const columns = ["Id" , "Nombre","Centro de Trabajo","Departamento","Periodo",{name:" ",label:"Respuestas",options:{filter: false,sort: true,}},{name:" ",label:"Resultados",options:{filter: false,sort: true,}}];
      const data = this.state.empleados.map(rows=>{
        if(rows) {
          let botonRespuestas = <Button  disabled={this.state.disabledButtons} className = "text-white"  type="primary" onClick={(e) => this.reporteIndividual(rows.id,rows.periodo,1)}>Respuestas&nbsp;&nbsp;<i class="fas fa-diagnoses"></i></Button>
          let botonResultados = <Button  disabled={this.state.disabledButtons} style={{backgroundColor:"bisque"}} onClick={(e) => this.reporteIndividual(rows.id,rows.periodo,2)}>Resultados &nbsp;&nbsp; <i class="far fa-chart-bar"></i></Button>
          return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.CentroTrabajo,rows.AreaTrabajo,rows.periodo,botonRespuestas,botonResultados])
        }
      })
      let tituloTabla = <h6><strong>Reportes EEO {periodo}</strong></h6>
      tablaPeriodoActual  = <Card className="cardATS" extra = {<div>
      <Button type="danger" onClick = {e=>this.showModal3()}  disabled={this.state.disabledButtons}>Reporte global&nbsp;&nbsp;<i class="fas fa-file-pdf"></i></Button>&nbsp;&nbsp;&nbsp;
      <Button type="success" onClick = {e=>this.showModal4()}  disabled={this.state.disabledButtons}>Reporte ejecutivo&nbsp;&nbsp;<i class="fas fa-file-medical-alt"></i></Button>&nbsp;&nbsp;&nbsp;
      <Button type="primary"  onClick={e=>this.showModal2()}  disabled={this.state.disabledButtons}>Respuestas masivas&nbsp;&nbsp;<i class="fas fa-hdd"></i></Button>&nbsp;&nbsp;&nbsp;
      <Button style={{backgroundColor:"bisque"}} onClick={e=>this.showModal()}  disabled={this.state.disabledButtons}>Resultados masivos&nbsp;&nbsp;<i class="fas fa-chart-line"></i></Button>
      </div>}>    
      <MUIDataTable
        title={tituloTabla}
        data={data}
        columns={columns}
        options={options}
      />
      </Card>
    }
 
    let tablaPeriodoSeleccionado;
    if(this.state.tablaPeriodoSeleccionado === true){
      const columns = ["Id" , "Nombre","Centro de Trabajo","Departamento","Periodo",{name:" ",label:"Respuestas",options:{filter: false,sort: true,}},{name:" ",label:"Resultados",options:{filter: false,sort: true,}}];
      const data = this.state.empleados.map(rows=>{
        if(rows){
          let botonRespuestas = <Button  disabled={this.state.disabledButtons} className = "text-white"  type="primary" onClick={(e) => this.reporteIndividual(rows.id,rows.periodo,1)}>Respuestas&nbsp;&nbsp;<i class="fas fa-diagnoses"></i></Button>
          let botonResultados = <Button  disabled={this.state.disabledButtons} style={{backgroundColor:"bisque"}} onClick={(e) => this.reporteIndividual(rows.id,rows.periodo,2)}>Resultados &nbsp;&nbsp; <i class="far fa-chart-bar"></i></Button>
          return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.CentroTrabajo,rows.AreaTrabajo,rows.periodo,botonRespuestas,botonResultados])
        }
      })
      let tituloTablaPeriodoSeleccionado = <h6><strong>Reportes EEO {this.state.periodoSeleccionado}</strong></h6>
      tablaPeriodoSeleccionado = <Card className="cardATS" extra = {<div>
        <Button type="danger" onClick = {e=>this.showModal3()}  disabled={this.state.disabledButtons}>Reporte global&nbsp;&nbsp;<i class="fas fa-file-pdf"></i></Button>&nbsp;&nbsp;&nbsp;
        <Button type="success" onClick = {e=>this.showModal4()}  disabled={this.state.disabledButtons}>Reporte ejecutivo&nbsp;&nbsp;<i class="fas fa-file-medical-alt"></i></Button>&nbsp;&nbsp;&nbsp;
        <Button type="primary"  onClick={e=>this.showModal2()}  disabled={this.state.disabledButtons}>Respuestas masivas&nbsp;&nbsp;<i class="fas fa-hdd"></i></Button>&nbsp;&nbsp;&nbsp;
        <Button style={{backgroundColor:"bisque"}} onClick={e=>this.showModal()}  disabled={this.state.disabledButtons}>Resultados masivos&nbsp;&nbsp;<i class="fas fa-chart-line"></i></Button>
        &nbsp;&nbsp;<Button shape="circle" size="middle" type="danger" onClick={e=>this.cerrarTablaPeriodos()}><MDBIcon icon="times" /></Button>
      </div>}>  
      <MUIDataTable
      title={tituloTablaPeriodoSeleccionado}
      data={data}
      columns={columns}
      options={options}
      />
      </Card>
    }
    let tituloModal1 = <strong><font size="2" color="blue">Reporte masivo de Evaluación de Entorno Organizacional</font></strong>
    let tituloModal2 = <strong><font size="2" color="secondary">Reporte masivo de Evaluación de Entorno Organizacional</font></strong>
    let tituloModal3 = <strong><font size="2" color="primary">Reporte global de Evaluación de Entorno Organizacional</font></strong>
    let tituloModal4 = <strong><font size="2" color="green">Reporte Ejecuivo de Evaluación de Entorno Organizacional</font></strong>
    let urlLogo = localStorage.getItem("urlLogo");
    let rs = <font color="green">{localStorage.getItem("razonsocial")}</font>
    let modalRepuestasMasivo  =
    <Modal
      title={tituloModal1}
      cancelText="Cancelar"
      okText="Descargar respuestas masivas"
      visible={this.state.visible2}
      onOk={e=>this.reporteImasivo(datosEmpleados,filtro,periodoTabla)}
      confirmLoading={this.state.confirmLoading2}
      onCancel={e=>this.handleCancel2()}
    >
      <img src={urlLogo} style={{width:"55px"}} alt="logo"/><br/>{rs} <i class="fas fa-drafting-compass"></i>
    </Modal>
     let modalResultadosMasivos  =
     <Modal
       title={tituloModal2}
       cancelText="Cancelar"
       okText="Descargar resultados masivos"
       visible={this.state.visible}
       onOk={e=>this.reporteImasivoResultados(datosEmpleados,filtro,periodoTabla)}
       confirmLoading={this.state.confirmLoading}
       onCancel={e=>this.handleCancel()}
     >
      <img src={urlLogo} style={{width:"55px"}} alt="logo"/><br/>{rs} <i class="fas fa-drafting-compass"></i>
     </Modal>
      let modalResultadosGlobales  =
      <Modal title={tituloModal3}
        visible={this.state.visible3}
        footer={[
          <Button key="submit" type="primary" onClick={e=>this.consultarDatosFiltrados(datosEmpleados,filtro,periodoTabla,1)}>
            Ver reporte global
          </Button>,
          <Button key="submit" type="danger" onClick={e=>this.handleCancel3()}>Cancelar</Button>
        ]}
        onCancel={e=>this.handleCancel3()}
        confirmLoading={this.state.confirmLoading3}>
       <img src={urlLogo} style={{width:"55px"}} alt="logo"/><br/>{rs} <i class="fas fa-drafting-compass"></i>
      </Modal>

      let modalResultadoEjecutivo =
      <Modal title={tituloModal4}
        visible={this.state.visible4}
        footer={[
          <Button key="submit" type="primary" onClick={e=>this.reporteEjecutivo(datosEmpleados,filtro,periodoTabla)}>
            Ver reporte ejecutivo
          </Button>,
          <Button key="submit" type="danger" onClick={e=>this.handleCancel4()}>Cancelar</Button>
        ]}
        onCancel={e=>this.handleCancel4()}
        confirmLoading={this.state.confirmLoading4}
      >
      <img src={urlLogo} style={{width:"55px"}} alt="logo"/><br/>{rs} <i class="fas fa-drafting-compass"></i>
      </Modal>

      let listaperiodos;
      if(this.state.collapse === true){
        listaperiodos = <Collapse style={{width:"100%"}} defaultActiveKey={['1']} onChange={this.callback()}>
        {this.state.todosLosPeriodos.map((rows,i)=>{
        if(rows.Descripcion){
          return(
            <Panel  header={rows.Descripcion} key={i}>
              <div className="panel">  
                <h6 style={{marginTop:"2%"}}><strong><font color="rgba(4, 180, 174,0.5)">{rows.Descripcion}</font></strong></h6> &nbsp;&nbsp;&nbsp; <Button shape="circle" size="large" style={{backgroundColor:"azure"}} onClick={e=>this.cargarTablaPeriodoSeleccionado(rows.Descripcion)}><MDBIcon icon="table" /></Button>
              </div>
            </Panel>
          ) }
        })}
      </Collapse>
      }
    return (
      <React.Fragment>
      <div>
      <Navbar modulo = {"EVALUACIÓN EEO"}/>
        <div >
        <div className="tabsATS" style={{marginTop:"5%",marginLeft:"5%"}}>
        <Tabs defaultActiveKey="1" size={this.state.size} style={{ marginBottom: 32 }}>
        <TabPane tab="Gráfica de evaluación EEO" key="1">
          <div className = "graficasEEO">  
          <ReactFusioncharts
            type="pie3d"
            width="200%" /* Cambiar a 100% */
            height="400" /* Define una altura fija o usa un porcentaje */
            dataFormat="JSON"
            dataSource={dataSource}
            />

          </div>
          {spinner}  
          </TabPane> 
          <TabPane tab="Generar reportes periodo vigente" key="2">
           {leyendaDemo}
           {tablaPeriodoActual}
           {reporteIndividual}
           {ponderacionIndividual}
           {PDFRespuestasMasivos}
           {modalRepuestasMasivo}
           {modalResultadosMasivos}
           {PDFResultadosMasivos}
           {ponderacion}
           {modalResultadosGlobales}
           {modalResultadoEjecutivo}
           {reporteEjecutivo}
          </TabPane>  
          <TabPane tab="Generar reportes historicos" key="3">
           {listaperiodos}
           {tablaPeriodoSeleccionado}
           {reporteIndividual}
           {ponderacionIndividual}
           {PDFRespuestasMasivos}
           {modalRepuestasMasivo}
           {modalResultadosMasivos}
           {PDFResultadosMasivos}
           {ponderacion}
           {modalResultadosGlobales}
           {modalResultadoEjecutivo}
           {reporteEjecutivo}
          </TabPane>   
          
        </Tabs>  
        </div>
      </div>
      </div>
      </React.Fragment>
    )
  }
}