import React from "react";
import MUIDataTable from "mui-datatables";
import {MDBIcon,MDBBtn} from 'mdbreact';
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
import './styles.css';
import ReportATSI from "./reportsATS/reportATSI";
import ReportATSG from "./reportsATS/reportATSG";
import ReportATSM from "./reportsATS/reportATSM";
import { Collapse } from 'antd';

const { Panel } = Collapse;
const { TabPane } = Tabs;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datos:[],
      empleados:[],
      getPonderacion:[],
      datosGlobales:[],
      peticion1:[],
      peticion:[],
      reporteImasivo:[],
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
      resultados:[],
      empleadosRecibidos:'',
      empleadosTotales:'',
      spinner:false,
      spinnerReporte:false,
      date:'',
      dropdown:null,
      tablaPeriodoActual:true,
      reporteIndividual:false,
      todosLosPeriodos:[],
      evaluacionesTodosLosPeriodos:[],
      tablaPeriodoSeleccionado:false,
      periodoSeleccionado:'',
      tablaEmpleados:[],
      size: 'small',
      visible:false,
      visible2:false,
      confirmLoading:false,
      confirmLoading2:false,
      descarga:false,
      descarga2:false,
      collapse:true
    };
  }

     async componentWillMount(){
      var LaFecha=new Date();
      var Mes=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
      var diasem=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
      var diasemana=LaFecha.getDay();
      var FechaCompleta="";
      var NumeroDeMes="";    
      NumeroDeMes=LaFecha.getMonth();
      FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
      this.setState({date:FechaCompleta}) 
      await this.getGlobalEmployees();
      }

       getGlobalEmployees = async () =>{
        let periodo =  localStorage.getItem("periodo")
        this.setState({spinner:true})
        var totalEmpleados = [];
        var datasort;
        var idAdmin  =  localStorage.getItem("idAdmin")    
        let evaluacionesRealizadasPeriodoActual;
        let evaluacionATS;
        let result;
        await axios({
          url:  API,
          method:'post',
          data:{
          query:`
           query{
            getallPeriodo(data:"${[idAdmin]}"){
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
          evaluacionATS = evaluacionesRealizadasPeriodoActual.filter(function(hero){
            return hero.encuesta === "ATS"
          })
          this.setState({evaluacionesTodosLosPeriodos:evaluacionATS}) 
          evaluacionATS.map(rows=>{
              axios({
                url:  API,
                method:'post',
                data:{
                query:`
                  query{
                    getresultGlobalSurveyATS(data:"${[rows.id,rows.periodo]}"){
                    id 
                    Respuestas 
                    fk_preguntasATS
                    fk_Empleados 
                    nombre 
                    ApellidoP 
                    ApellidoM 
                    Curp 
                    RFC 
                    FechaNacimiento 
                    Sexo 
                    EstadoCivil 
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
                    CentroTrabajo
                    fk_administrador 
                    fk_correos 
                    ATSDetectado
                    Periodo
                        }
                      }
                    `
                }
                }).then(datos => {  
                  totalEmpleados.push(datos.data.data.getresultGlobalSurveyATS)
                  this.setState({peticion:totalEmpleados})
                  console.log("datos",datos.data.data.getresultGlobalSurveyATS)   
                })
                .catch(err => {
                  console.log("err",err.response)
                });  
              })
              result = evaluacionATS.filter(function(hero){
                return hero.periodo === periodo 
              })
              this.setState({empleados:result}) 
            }).catch(err=>{
              console.log("err" , err.response)
              console.log("err" , err)
            })
            await axios({
            url:  API,
            method:'post',
            data:{ 
            query:`
            query{
              getEmployeesResolvesATS(data:"${[idAdmin]}"){
                id
                nombre
                ApellidoP
                ApellidoM
                Sexo
                AreaTrabajo
                Puesto
                periodo
                CentroTrabajo
                ATSDetectado
                  }
                }
                `
            }
            }).then(datos => {
              datasort =  datos.data.data.getEmployeesResolvesATS
              datasort.sort(function(a,b) {return (a.ApellidoP > b.ApellidoP) ? 1 : ((b.ApellidoP > a.ApellidoP) ? -1 : 0);} );
              let arrayFilter = datasort.filter(e => e.periodo === periodo)
              this.setState({tablaEmpleados:arrayFilter}) 
              }).catch(err=>{
                console.log("error" ,err)
              }) 
              this.setState({spinner:false})
        }

      async cargarTablaPeriodoSeleccionado (parametro){
        this.setState({collapse:false})
        let periodo = parametro
        let empleados  = this.state.evaluacionesTodosLosPeriodos; 
        let arrayFilter = empleados.filter(e => e.periodo === periodo)
        await  this.setState({empleados:[]})
        this.setState({tablaPeriodoSeleccionado:true})
        this.setState({empleados:arrayFilter})
        this.setState({reporteIndividual:false})
      }
 
       consultarDatosFiltrados = async(datos,filtro,periodoTabla)=>{
        await this.setState({confirmLoading:true})
        await setTimeout(() => {
          this.setState({visible:false})
          this.setState({confirmLoading:false})
        }, 3000);
        this.setState({botonDescargaMasivo:''})
        var array=[];
        datos.forEach(rows=>{
          array.push(rows.data[0])
        })
        let arrayFilter = []
        let filter;
        let filterArray;
        let filtrado = [];
          this.state.peticion.forEach(row=>{
            array.forEach(element => {
              filter =row.filter(function(hero){
                return hero.fk_Empleados === element
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
           this.setState({peticion1:filtrado2}) 
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
          this.setState({spinner:false})
          await this.setState({descarga:true})
          this.setState({descarga:false})

          }

        reporteImasivo = async(datos,filtro,periodoTabla)=>{
         await this.setState({confirmLoading2:true})
         await setTimeout(() => {
          this.setState({visible2:false})
          this.setState({confirmLoading2:false})
        }, 3000);
        var array=[];
        datos.forEach(rows=>{
          array.push(rows.data[0])
        })
        let arrayFilter = []
        let filter;
        let filterArray;
        let filtrado = [];
          this.state.peticion.forEach(row=>{
            array.forEach(element => {
              filter =row.filter(function(hero){
                return hero.fk_Empleados === element
              })
                arrayFilter.push(filter)
              }); 
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
          let filtrado2 = filtrado.filter(item => !array_equals(item, tag))
          this.setState({reporteImasivo:filtrado2}) 
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
         await this.setState({descarga2:true});
         this.setState({descarga2:false})
         this.setState({datosLength:datos.length})
          }     

        reporteIndividual(id,periodo){  
          axios({
            url:  API,
            method:'post',
            data:{
            query:`
              query{
              resultSingleSurvey(data:"${[id,periodo]}"){
                id 
                Respuestas 
                fk_preguntasATS 
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
                ATSDetectado
                    }
                  }
                `
            }
            }).then(datos => {   
            if(datos.data.data.resultSingleSurvey.length > 0 ){
            this.setState({resultados:'' })  
            this.setState({resultados:datos.data.data.resultSingleSurvey })    
            this.setState({reporteIndividual:true})
            this.setState({tablaPeriodoActual:false}) 
            this.setState({tablaPeriodoSeleccionado:false})            
          } if(datos.data.data.resultSingleSurvey.length <= 0){
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
        handleDropdown = (event) => {
          this.setState({dropdown: event.currentTarget});
        };
        handleClose = () => {
          this.setState({dropdown: null});
        };
        onChange = e => {
          this.setState({ size: e.target.value });
        };
        showModal = () => {
          this.setState({visible:true})
        };
        showModal2 = () => {
          this.setState({visible2:true})
        };
        handleCancel = () => {
          this.setState({visible:false})
        };
        handleCancel2 = () => {
          this.setState({visible2:false})
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
    let spinner;
    let spinnerReporte;
    if(this.state.spinner=== true){
      spinner = <div><MDBBtn className = "text-white"  size="sm" color="danger" disabled>
      <Spinner
        as="span"
        outline
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    </MDBBtn>{''}
    <MDBBtn size="sm" className = "text-white"  color="success" disabled>
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
      spinnerReporte = <div><BotonReactstrap variant="warning" disabled>
      <Spinner
        as="span"
        outline
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    </BotonReactstrap>{''}
    <BotonReactstrap outline variant="warning" disabled>
      <Spinner
        as="span"
        outlined
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Generando reporte por favor espere ...
    </BotonReactstrap>{''}
    </div>
    }
    let datosEmpleados;
    let filtro;
    let periodoTabla;
    const options = {
        elevation:0,
        viewColumns:false, 
        filterType: "dropdown",
        responsive: "stacked",
        sort:true,
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
          filtro = filtroTable
          }     
        };
      let tablaPeriodoActual;
      if(this.state.tablaPeriodoActual === true) {
      let periodo;
      periodo = localStorage.getItem("periodo")
      const columns = ["ID","Nombre","Centro de Trabajo","Periodo","Evaluación","Status",{name: "Respuestas",label: "Respuestas",options:{filter: false,sort: true,}}];
      const data = this.state.empleados.map(rows=>{
        if(rows){
          let boton =<Button  className = "text-white"  type="primary" onClick={(e) => this.reporteIndividual(rows.id,rows.periodo)}>Respuestas&nbsp;&nbsp;<i class="fas fa-diagnoses"></i></Button>
          return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.CentroTrabajo,rows.periodo,rows.encuesta,"Vigente",boton])
        }
      })
      let tituloTabla =  <h6><strong>Reportes ATS {periodo}</strong></h6>
        tablaPeriodoActual = 
        <div>
          <Card className="cardATS" title={tituloTabla} extra = {<div><Button type="primary" onClick = {e=>this.showModal()}>Reporte global&nbsp;&nbsp;<i class="fas fa-file-pdf"></i></Button>&nbsp;&nbsp;&nbsp;<Button type="success"  onClick={e=>this.showModal2()}>Reporte masivo&nbsp;&nbsp;<i class="fas fa-hdd"></i></Button></div>}>    
            <MUIDataTable
            data={data}
            columns={columns}
            options={options}
            />
          </Card>
        </div>
      }
    let tablaPeriodoSeleccionado;
    if(this.state.tablaPeriodoSeleccionado === true){
      const columns = ["ID","Nombre","Centro de Trabajo","Periodo","Evaluación","Status",{name: "Respuestas",label: "Respuestas",options:{filter: false,sort: true,}}];
      const data = this.state.empleados.map(rows=>{
        if(rows){
          let boton =<Button  className = "text-white"  type="primary" onClick={(e) => this.reporteIndividual(rows.id,rows.periodo)}>Respuestas&nbsp;&nbsp;<i class="fas fa-diagnoses"></i></Button>
          return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.CentroTrabajo,rows.periodo,rows.encuesta,"Vigente",boton])
        }
      })
      tablaPeriodoSeleccionado = <div>
        <Card className="cardATS" title = {<div><h6><strong>Reportes ATS {this.state.periodoSeleccionado}</strong></h6></div>} extra = {<div><Button type="primary" onClick = {e=>this.showModal()}>Reporte global&nbsp;&nbsp;<i class="fas fa-file-pdf"></i></Button>&nbsp;&nbsp;&nbsp;<Button type="success"  onClick={e=>this.showModal2()}>Reporte masivo&nbsp;&nbsp;<i class="fas fa-hdd"></i></Button>&nbsp;&nbsp;<Button shape="circle" size="middle" type="danger" onClick={e=>this.cerrarTablaPeriodos()}><MDBIcon icon="times" /></Button></div>}>    
          <MUIDataTable
          data={data}
          columns={columns}
          options={options}
          />
        </Card>
      </div>
      }
      let pdfView1;
      if(this.state.resultados.length>0 && this.state.reporteIndividual === true){ 
          let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value12,value13,value14,value15,value16;
          let filtrar1,filtrar2,filtrar3,filtrar4,filtrar5,filtrar6,filtrar7,filtrar8,filtrar9,filtrar10,filtrar12,filtrar13,filtrar14,filtrar15,filtrar16;

          filtrar1 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "1";
          });
          filtrar2 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "2";
          });
          filtrar3 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "3";
          });
          filtrar4 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "4";
          });
          filtrar5 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "5";
          });
          filtrar6 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "6";
          });
          filtrar7 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "7";
          });
          filtrar8 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "8";
          });
          value8 = filtrar8.pop()
          filtrar9 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "9";
          });
          filtrar10 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "10";
          });
          filtrar12 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "12";
          });
          filtrar13 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "13";
          });
          filtrar14 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "14";
          });
          filtrar15 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "15";
          });
          filtrar16 =  this.state.resultados.filter(function(hero) {
            return hero.fk_preguntasATS === "16";
          });
          value1 = filtrar1.pop();              
          value2 = filtrar2.pop(); 
          value3 = filtrar3.pop();
          value4 = filtrar4.pop();
          value5 = filtrar5.pop();
          value6 = filtrar6.pop();
          value7 = filtrar7.pop();
          value9 = filtrar9.pop();
          value10 = filtrar10.pop();
          value12 = filtrar12.pop();
          value13 = filtrar13.pop();
          value14 = filtrar14.pop();
          value15 = filtrar15.pop();
          value16 = filtrar16.pop();

      pdfView1 = <ReportATSI value1={value1} 
                value2={value2} value3={value3} value4={value4} value5={value5} value6={value6}
                value7={value7} value8={value8} value9={value9} value10={value10} 
                value12={value12} value13={value13} value14={value14} value15={value15} value16={value16}
                estadoResultados = {this.state.resultados}/>           
      }
      
      let mapeo=[];
      let filtrar;       
      let filtrar1;       
      let dataSource;
      charts(FusionCharts);
      if(this.state.tablaEmpleados[0]){
        this.state.tablaEmpleados.map(rows=>{
          mapeo.push(rows.ATSDetectado)
            filtrar =  mapeo.filter(function(hero) {
            return hero==='true';
            });
            filtrar1 =  mapeo.filter(function(hero) {
              return hero ==='false';
            });   
        }) 
        let total = filtrar1.length+filtrar.length
        var porcentaje= (filtrar.length / total)*100;
        var intPorcentaje= Math.round( porcentaje);
        var porcentaje2= (filtrar1.length / total)*100;
        var intPorcentaje2= Math.round(porcentaje2);
       dataSource = {
        chart: {
          caption: "Gráfica general de ATS detectado",
          subcaption: "ATS detectado",
          showvalues: "1",
          showpercentintooltip: "0",
          numberprefix: "%",
          enablemultislicing: "1",
          theme: "fusion",
          },
          data: [
            {
              label: filtrar.length +" Empleados con ATS detectado",
              value:  intPorcentaje,
              color: "#FF0000",
              labelFontSize:12
            },
            {
              label:filtrar1.length  + " Empleados sin ATS detectado",
              value: intPorcentaje2,
              color: "#9BE0F7",
              labelFontSize:12,
            }
          ]
        };
    }      
    let reporteGlobal;
    if(this.state.peticion1[0]){
      let estado  = this.state.peticion1;
      function array_equals(a, b){
        return a.length === b.length && a.every((item,idx) => item === b[idx])
      }
        let tag = []
        var filtrado = estado.filter(item => !array_equals(item, tag))
        if(filtrado[0]){
        let filtro1 = this.state.filtro1; let filtro2 = this.state.filtro2; let filtro3 = this.state.filtro3
        let filtro4 = this.state.filtro4; let filtro5 = this.state.filtro5; let filtro6 = this.state.filtro6
        let filtro7 = this.state.filtro7; let filtro8 = this.state.filtro8
        let descarga = this.state.descarga
        let peticion1 = this.state.peticion1
        reporteGlobal = <ReportATSG fechaEmision = {this.state.date} evaluacionesConsideradas = {this.state.datosLength} filtro1={filtro1} filtro2={filtro2} filtro3={filtro3} filtro4={filtro4}
         filtro5={filtro5} filtro6={filtro6} filtro7={filtro7} filtro8={filtro8} descarga={descarga} filtrado = {filtrado} peticion1 = {peticion1}/>
        }
    }

    let reporteImasivo;

    if(this.state.reporteImasivo[0]){
      let estado  = this.state.reporteImasivo;
      function array_equals(a, b){
        return a.length === b.length && a.every((item,idx) => item === b[idx])
        }
        let tag = []
        var filtradoMasivo = estado.filter(item => !array_equals(item, tag))
        if(filtradoMasivo[0]){
          let descarga2 = this.state.descarga2
          let dataImasivo =  this.state.reporteImasivo
          let filtro1 = this.state.filtro1; let filtro2 = this.state.filtro2; let filtro3 = this.state.filtro3
          let filtro4 = this.state.filtro4; let filtro5 = this.state.filtro5; let filtro6 = this.state.filtro6
          let filtro7 = this.state.filtro7; let filtro8 = this.state.filtro8
          reporteImasivo = <ReportATSM fechaEmision = {this.state.date} reporteImasivo = {dataImasivo} descarga={descarga2} filtrado = {filtradoMasivo}
           filtro1={filtro1} filtro2={filtro2} filtro3={filtro3} filtro4={filtro4}
           filtro5={filtro5} filtro6={filtro6} filtro7={filtro7} filtro8={filtro8} evaluacionesConsideradas = {this.state.datosLength} />
      }
      } 
      let tituloModal = <strong><font size="2" color="green">Reporte global de Acontecimientos Traumáticos Severos</font></strong>
      let tituloModal2 = <strong><font size="2" color="green">Reporte masivo de Acontecimientos Traumáticos Severos</font></strong>

      let rs = <font color="green">{localStorage.getItem("razonsocial")}</font>
      let urlLogo = localStorage.getItem("urlLogo");
      let listaperiodos;
      if(this.state.collapse === true){
        listaperiodos = <Collapse style={{width:"100%"}}defaultActiveKey={['1']} onChange={this.callback()}>
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
    let modalGlobal = 
    <Modal
      title={tituloModal}
      cancelText="Cancelar"
      okText="Descargar reporte global"
      visible={this.state.visible}
      onOk={e=>this.consultarDatosFiltrados(datosEmpleados,filtro,periodoTabla)}
      confirmLoading={this.state.confirmLoading}
      onCancel={e=>this.handleCancel()}
      >
      <img src={urlLogo} style={{width:"55px"}} alt="logo"/><br/>{rs} <i class="fas fa-drafting-compass"></i>
    </Modal>
    let modalMasivo  =
    <Modal
      title={tituloModal2}
      cancelText="Cancelar"
      okText="Descargar reporte masivo"
      visible={this.state.visible2}
      onOk={e=>this.reporteImasivo(datosEmpleados,filtro,periodoTabla)}
      confirmLoading={this.state.confirmLoading2}
      onCancel={e=>this.handleCancel2()}
    >
      <img src={urlLogo} style={{width:"55px"}} alt="logo"/><br/>{rs} <i class="fas fa-drafting-compass"></i>
    </Modal>
    return (
      <React.Fragment>
      <div>
          <Navbar modulo = {"EVALUACIÓN ATS"}/>
          <div className="tabsATS" style={{marginTop:"5%",marginLeft:"5%"}}>
          <Tabs defaultActiveKey="1" size={this.state.size} style={{ marginBottom: 32 }}>
          <TabPane tab="Gráfica de evaluación ATS" key="1">
          <div className = "graficasATS">  
            <ReactFusioncharts
              type="pie3d"
              width="70%"
              height="60%"
              dataFormat="JSON"
              dataSource={dataSource} 
            />
          </div>
           {spinner}
          </TabPane>    
          <TabPane tab="Generar reportes periodo vigente" key="2">
            {tablaPeriodoActual}
            {pdfView1} 
            {reporteGlobal}
            {reporteImasivo}
            {spinnerReporte}
            {modalGlobal}
            {modalMasivo}
          </TabPane>
          <TabPane tab="Generar reportes historicos" key="3">
            {listaperiodos}
            {tablaPeriodoSeleccionado}
            {pdfView1} 
            {reporteGlobal}
            {reporteImasivo}
            {spinnerReporte}
            {modalGlobal}
            {modalMasivo}
          </TabPane>
        </Tabs>
        </div>
      </div>
      </React.Fragment>
      )
    }
  }

  export default App