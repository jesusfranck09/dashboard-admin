import React from "react";
import MUIDataTable from "mui-datatables";
import Grow from "@material-ui/core/Grow";
import {MDBRow,MDBCol,MDBBtn,MDBTableHead, MDBContainer,MDBTable, MDBTableBody, MDBCard, MDBCardHeader,MDBCardBody, MDBCardTitle} from 'mdbreact';
import logo from '../images/logo.png'
import diagnostico from '../images/diagnostico.png'
import { API} from '../utils/http'
import {Spinner,Button as BotonReactstrap} from 'react-bootstrap'
import '../Home/index.css'
import Button from '@material-ui/core/Button';
import { DialogUtility } from '@syncfusion/ej2-popups';
import Modal from 'react-modal';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Alert} from 'reactstrap'
import {
  Grid,
  
} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import axios from 'axios'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { PDFExport }  from '@progress/kendo-react-pdf';
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
      botonDescargar:'1',
      botonDescargarIndividual:'1',
      botonDescargaMasivo:'1',
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
      showModal2: false,  
      spinnerReporte:false,
      date:'',
      dropdown:null,
      tablaPeriodoActual:true,
      reporteIndividual:false,
      todosLosPeriodos:[],
      evaluacionesTodosLosPeriodos:[],
      tablaPeriodoSeleccionado:false,
      periodoSeleccionado:'',
      tablaEmpleados:[]
    };
    this.ads = this.ads.bind(this);  
  }

     async componentWillMount(){
      var LaFecha=new Date();
      var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      var diasem=new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
      var diasemana=LaFecha.getDay();
      var FechaCompleta="";
      var NumeroDeMes="";    
      NumeroDeMes=LaFecha.getMonth();
      FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
      this.setState({date:FechaCompleta}) 
      await this.getGlobalEmployees();
      }

    ads(){
        this.setState({showModal2:true}) 
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
        let resultOrdenado;
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
            //  console.log("rows " , rows)
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
                  
                  // console.log("datos peticion" , datos)
                  totalEmpleados.push(datos.data.data.getresultGlobalSurveyATS)
                  this.setState({peticion:totalEmpleados})   
                 
                })
                .catch(err => {
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
              
              let arrayFilter = datasort.filter(e => e.periodo == periodo)

              this.setState({tablaEmpleados:arrayFilter}) 

              }).catch(err=>{
                console.log("error" ,err)
              }) 
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
        this.setState({reporteIndividual:false})
      }
 
       consultarDatosFiltrados ( datos,filtro,periodoTabla){
        this.setState({botonDescargaMasivo:''})
        this.setState({botonDescargarIndividual:''})
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
          }


        reporteImasivo(datos,filtro,periodoTabla){
        this.setState({botonDescargaMasivo:''})
        this.setState({botonDescargarIndividual:''})

        // let arrayFilters = datasort.filter(e => e.periodo == periodo)

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
          console.log("totalEmpleaos" ,filtrado2)

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

        reporteIndividual(id,periodo){  
        
          this.setState({botonDescargaMasivo:''})
          this.setState({botonDescargar:''})        
          // const url = 'http://localhost:8000/graphql'
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
                this.setState({resultados: datos.data.data.resultSingleSurvey })    
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

    
  render() {  
    let spinner;
    let spinnerReporte;
    let nombre;
    let arrayNombre= [];
    let botonCerrarReporteIndividual;
    let botonDescargarReporteIndividual;
   
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
    <MDBBtn size="md" className = "text-white"  color="secondary" disabled>
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

    let accionSi = 0;
    let accionNo =0;
    let valueAccion;
    let filtrarAccion;

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
          }     
        };

          let tablaPeriodoActual;
          if(this.state.tablaPeriodoActual === true) {
          let periodo;
          periodo = localStorage.getItem("periodo")
          const columns = ["ID","Nombre","Centro de Trabajo","Periodo",{name: "Respuestas",label: "Respuestas",options:{filter: false,sort: true,}}];
          const data = this.state.empleados.map(rows=>{
            if(rows){
              let boton =  <div><MDBBtn  className = "text-white"  disabled={!this.state.botonDescargarIndividual} size ="md" color ="danger" onClick={(e) => this.reporteIndividual(rows.id,rows.periodo)}>Respuestas</MDBBtn></div> 
              return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.CentroTrabajo,rows.periodo,boton])
            }
          })
            tablaPeriodoActual = <MUIDataTable
            title={`Tabla de reportes ATS ${periodo}`}
            data={data}
            columns={columns}
            options={options}
            />
          }
          let tablaPeriodoSeleccionado;
          if(this.state.tablaPeriodoSeleccionado == true){
            const columns = ["ID","Nombre","Centro de Trabajo","Periodo",{name: "Respuestas",label: "Respuestas",options:{filter: false,sort: true,}}];
            const data = this.state.empleados.map(rows=>{
              if(rows){
                let boton =  <div><MDBBtn  className = "text-white"  disabled={!this.state.botonDescargarIndividual} size ="md" color ="danger" onClick={(e) => this.reporteIndividual(rows.id,rows.periodo)}>Respuestas</MDBBtn></div> 
                return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.CentroTrabajo,rows.periodo,boton])
              }
            })
            tablaPeriodoSeleccionado = <MUIDataTable
            title={`Tabla de reportes ATS ${this.state.periodoSeleccionado}`}
            data={data}
            columns={columns}
            options={options}
            />
          }
      
            let pdfView1;
            let ATS;
            let ATSReporte;

            let a  = 1

            if(this.state.resultados.length!==0){

              let filtro;
              filtro =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 1;
              });
              let valor = filtro.pop()

            if(valor.ATSDetectado==="true"){
                ATSReporte= <font size="1"
                face="arial"
                color="red" >LA EVALUACIÓN REVELÓ QUE EL PERSONAL  REQUIERE CANALIZACIÓN CON UN PROFESIONAL</font>
                ATS = <Alert className ="mt-4" color ="danger ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL  REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
            }if(valor.ATSDetectado==="false"){
                ATSReporte= <font size="1"
                face="arial"
                color="blue" >LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</font>
                ATS = <Alert className ="mt-4" color ="primary ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
                }
            }

            if(this.state.resultados.length>0 && this.state.reporteIndividual === true){ 
              botonCerrarReporteIndividual = <MDBBtn color="danger" size="md" onClick={e=>window.location.reload()}>Cerrar</MDBBtn>
              botonDescargarReporteIndividual = <MDBBtn  size="md" color="secondary" className="k-button text-white" onClick={() => { this.pdfExportComponent.save(); }}>
              Respuestas de {this.state.resultados[0].nombre } {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM} 
              </MDBBtn>
              let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value12,value13,value14,value15,value16;
              
              let filtrar1;
              filtrar1 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 1;
              });
              value1 = filtrar1.pop()
              
              let filtrar2;
              filtrar2 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 2;
              });
              value2 = filtrar2.pop()  

              let filtrar3;
              filtrar3 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 3;
              });
               value3 = filtrar3.pop()

              let filtrar4;
              filtrar4 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 4;
              });
              value4 = filtrar4.pop()

              let filtrar5;
              filtrar5 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 5;
              });
              value5 = filtrar5.pop()

              let filtrar6;
              filtrar6 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 6;
              });
              value6 = filtrar6.pop()

              let filtrar7;
              filtrar7 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 7;
              });
              value7 = filtrar7.pop()

              let filtrar8;
              filtrar8 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 8;
              });
              value8 = filtrar8.pop()

              let filtrar9;
              filtrar9 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 9;
              });
              value9 = filtrar9.pop()

              let filtrar10;
              filtrar10 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 10;
              });
              value10 = filtrar10.pop()

              let filtrar12;
              filtrar12 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 12;
              });
              value12 = filtrar12.pop()

              let filtrar13;
              filtrar13 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 13;
              });
              value13 = filtrar13.pop()

              let filtrar14;
              filtrar14 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 14;
              });
              value14 = filtrar14.pop()

              let filtrar15;
              filtrar15 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 15;
              });
              value15 = filtrar15.pop()

              let filtrar16;
              filtrar16 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasATS == 16;
              });
              value16 = filtrar16.pop()
              

            pdfView1 =            
                <React.Fragment>
                <section className="flex-column"  >
                <MDBCard>
                  <MDBCardHeader>
                    <MDBCardTitle><center>Resultados individuales de la evaluación ATS</center></MDBCardTitle>
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
                    <font face="arial" className = "mt-4" ><center><strong>CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO</strong></center></font><br/>
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
                    <br/>
                    <MDBContainer>
                    <MDBTable small borderless className="text-left">
                    <MDBTableHead>
                        <tr>
                        <th width="1%"></th>
                        <th width="91%"><strong>I.- Acontecimiento traumático severo</strong></th>    
                        <td width="8%"></td>   
                                            
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                        <td width="1%"></td>
                        <td width="91%">¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los
                            siguientes:<br/> Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión
                            grave, asaltos, actos violentos que derivaron en lesiones graves, secuestro, amenazas o cualquier otro
                            que ponga en riesgo su vida o salud, y/o la de otras personas?</td>
                        <td width="8%">{value1.Respuestas.toUpperCase()}</td>
                        </tr>
                        <br/>
                    </MDBTableBody>
                
                    <MDBTableHead>
                        <tr>
                        <th width="1%"></th>
                        <th><strong>II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes)</strong></th>       
                        <td></td> 
                        </tr>
                        <br/>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                        <td></td>
                        <td>¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</td>   
                        <td >{value2.Respuestas.toUpperCase()}</td> 
                        </tr>
                    
                        <tr>
                        <td></td>
                        <td>¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?</td>   
                        <td >{value3.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <br/>
                    </MDBTableBody>

                    <MDBTableHead>
                        <tr>
                        <th></th>
                        <th><strong>III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento (durante el último mes)</strong></th>       
                        <td></td> 
                        </tr>
                        <br/>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                        <td></td>
                        <td>¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?</td>   
                        <td>{value4.Respuestas.toUpperCase()}</td> 
                        </tr>
                    
                        <tr>
                        <td></td>
                        <td>¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?</td>   
                        <td >{value5.Respuestas.toUpperCase()}</td> 
                        </tr>
                    
                        <tr>
                        <td></td>
                        <td>¿Ha tenido dificultad para recordar alguna parte importante del evento?</td>   
                        <td >{value6.Respuestas.toUpperCase()}</td> 
                        </tr>
                        
                        <tr>
                        <td></td>
                        <td>¿Ha disminuido su interés en sus actividades cotidianas?</td>   
                        <td >{value7.Respuestas.toUpperCase()}</td> 
                        </tr>
                    
                        <tr>
                        <td></td>
                        <td>¿Se ha sentido usted alejado o distante de los demás?</td>   
                        <td >{value8.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                        <td></td>
                        <td>¿Ha notado que tiene dificultad para expresar sus sentimientos?</td>   
                        <td >{value9.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                        <td></td>
                        <td>¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?</td>   
                        <td >{value10.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <br/>
                    
                    </MDBTableBody>

                    <MDBTableHead>
                        <tr>
                        <th></th>
                        <th><strong>IV.- Afectación (durante el último mes)</strong></th>       
                        <td></td> 
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr>
                        <td></td>
                        <td>¿Ha tenido usted dificultades para dormir?</td>   
                        <td >{value12.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                        <td></td>
                        <td>¿Ha estado particularmente irritable o le han dado arranques de coraje?</td>   
                        <td >{value13.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                        <td></td>
                        <td>¿Ha tenido dificultad para concentrarse?</td>   
                        <td >{value14.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                        <td></td>
                        <td>¿Ha estado nervioso o constantemente en alerta?</td>   
                        <td >{value15.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                        <td></td>
                        <td>¿Se ha sobresaltado fácilmente por cualquier cosa?</td>   
                        <td >{value16.Respuestas.toUpperCase()}</td> 
                        </tr>
                    </MDBTableBody>
                    </MDBTable> 
                    {ATS}
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
                                    <font size="3"face="arial"color="black">Reporte individual del diagnóstico de Acontecimientos Traumáticos Severos</font><br></br>
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
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
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
                                      color="black" style = {{marginTop:25,marginLeft:35}}>GUÍA DE REFERENCIA I - 
                                      CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE</font>   <br/>  
                                      <font size="1"  face="arial"
                                      color="black" style = {{marginLeft:35}}>FUERON
                                      SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</font>
                                    
                                        
                                        <MDBTable  component={Paper}  style = {{marginLeft:25}} small  className="text-left">
                                        <MDBTableBody>
                                        <tr>
                                        <td width="25%"><font size="1" face="arial"color="black">RESULTADO DE LA EVALUACIÓN : </font></td>
                                        <td width="75%"> <font size="1" face="arial"color="black" > {ATSReporte}</font></td>
                                        </tr>
                                        <tr></tr>
                                        </MDBTableBody>
                                        </MDBTable>  

                                        <font color="red" style= {{marginLeft:20}}  size="1">I.- Acontecimiento traumático severo </font>

                                        <table width="500" className=" table-bordered" style={{marginLeft:"5%"}}> 
                                          <tr>
                                          <td >
                                          <font size="1" face="arial"color="black" >¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los
                                              siguientes:<br></br> Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión
                                              grave? Asaltos? Actos violentos que derivaron en lesiones graves? Secuestro? Amenazas?, o Cualquier otro
                                              que ponga en riesgo su vida o salud, y/o la de otras personas?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{value1.Respuestas.toUpperCase()}</font></td>
                                          </tr>
                                          </table>
                                          <font color="red" style= {{marginLeft:20}}   size="1">II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes)</font>
                                          <table width="500" className=" table-bordered" style={{marginLeft:"5%"}}>
                                          <tr>            
                                              <td >
                                          <font size="1" face="arial"color="black">¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</font></td>
                                              <td width="60px"><font size="1" face="arial"color="black">{value2.Respuestas.toUpperCase()}</font></td>
                                          </tr>
                                          <tr>
                                              <td >
                                          <font size="1" face="arial"color="black">¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?</font></td>
                                              <td width="60px"><font size="1" face="arial"color="black">{value3.Respuestas.toUpperCase()}</font></td>
                                          </tr>
                                          </table>
                                          <font style= {{marginLeft:20}}  size="1" color="red" >III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento</font>
                                          <table width="500" className=" table-bordered" style={{marginLeft:"5%"}}>
                                            <tr>
                                            <td >
                                            <font size="1" face="arial"color="black">¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?</font></td>
                                            <td width="60px"><font size="1" face="arial"color="black">{value4.Respuestas.toUpperCase()}</font></td></tr>
                                            <tr>
                                            <td >
                                            <font size="1" face="arial"color="black">¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?</font></td>
                                            <td width="60px"><font size="1" face="arial"color="black">{value5.Respuestas.toUpperCase()}</font></td>
                                            </tr>
                                            <tr>
                                            <td >
                                            <font size="1" face="arial"color="black">¿Ha tenido dificultad para recordar alguna parte importante del evento?</font></td>
                                            <td width="60px"><font size="1" face="arial"color="black">{value6.Respuestas.toUpperCase()}</font></td>
                                            </tr>
                                            <tr>
                                            <td >
                                            <font size="1" face="arial"color="black">¿Ha disminuido su interés en sus actividades cotidianas?</font></td>
                                            <td width="60px"><font size="1" face="arial"color="black">{value7.Respuestas.toUpperCase()}</font></td>
                                            </tr>
                                            <tr>
                                            <td >
                                            <font size="1" face="arial"color="black">  ¿Se ha sentido usted alejado o distante de los demás?</font></td>
                                            <td width="60px"><font size="1" face="arial"color="black">{value8.Respuestas.toUpperCase()}</font></td>
                                            </tr>
                                            <tr>
                                            <td >
                                            <font size="1" face="arial"color="black"> ¿Ha notado que tiene dificultad para expresar sus sentimientos?</font></td>
                                            <td width="60px"><font size="1" face="arial"color="black">{value9.Respuestas.toUpperCase()}</font></td>
                                            </tr>
                                            <tr>
                                            <td >
                                            <font size="1" face="arial"color="black"> ¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?</font></td>
                                            <td width="60px"><font size="1" face="arial"color="black">{value10.Respuestas.toUpperCase()}</font></td>
                                            </tr>
                                            </table>
                                            <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >IV.- Afectación (durante el último mes)</font>
                                            <table width="500" className=" table-bordered" style={{marginLeft:"5%"}}>
                                                <tr>
                                                <td >
                                                <font size="1" face="arial"color="black">¿Ha tenido usted dificultades para dormir?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value12.Respuestas.toUpperCase()}</font></td></tr>
                                                <tr>
                                                <td >
                                                <font size="1" face="arial"color="black">¿Ha estado particularmente irritable o le han dado arranques de coraje?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value13.Respuestas.toUpperCase()}</font></td>
                                                </tr>
                                                <tr>
                                                <td >
                                                <font size="1" face="arial"color="black">¿Ha tenido dificultad para concentrarse?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value14.Respuestas.toUpperCase()}</font></td>
                                                </tr>
                                                <tr>
                                                <td >
                                                <font size="1" face="arial"color="black">¿Ha estado nervioso o constantemente en alerta?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value15.Respuestas.toUpperCase()}</font></td>
                                                </tr>
                                                <tr>
                                                <td >
                                                <font size="1" face="arial"color="black">¿Se ha sobresaltado fácilmente por cualquier cosa?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value16.Respuestas.toUpperCase()}</font></td>
                                                </tr>
                                                </table>
                                        </div>
                                    </PDFExport>
                                </div>
                            </div>
                          </section>
                      </React.Fragment>
                              }
////////////////////////////////////////////////////////////////////////////////////////////////
      let chartDona;
      let mapeo=[];
      let filtrar;       
      let arraySi=[] 
      let filtrar1;       
      let arrayNo=[] 
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
          caption: "ATS detectado",
          subcaption: "Vista rápida del total de empleados",
          showvalues: "1",
          showpercentintooltip: "0",
          numberprefix: "%",
          enablemultislicing: "1",
          theme: "fusion",
          
          },
          data: [
            {
              label: filtrar.length +" " + "Con ATS"  ,
              value:  intPorcentaje,
              color: "#FF0000",
              labelFontSize:12
              // link:"www.google.com"
            },
 
            {
              label:filtrar1.length  + " "+ "Sin ATS" ,
              value: intPorcentaje2,
              color: "#9BE0F7",
              labelFontSize:12,
       
            }
          ]
        };
    }      

    let reporteGlobal;
    let filtrarVeredicto;
    let valueVeredicto;
    if(this.state.peticion1[0]){
     
      let estado  = this.state.peticion1;
      function array_equals(a, b){
        return a.length === b.length && a.every((item,idx) => item === b[idx])
        }
        let tag = []
        var filtrado = estado.filter(item => !array_equals(item, tag))
        if(filtrado[0]){
        reporteGlobal =
        <MDBContainer>
        <div className="example-config">           
                <MDBBtn color="secondary" size="md"  className="text-white" onClick={() => { this.pdfExportComponent.save(); }}>
                  Descargar
                </MDBBtn>
               <MDBBtn  className = "text-white" color="danger"  size="md"  onClick= {(e) => window.location.reload()}>Cerrar</MDBBtn>
         </div>
        {filtrado.map((rows,i) =>{       
           filtrarAccion =  rows.filter(function(hero) {
            return hero.ATSDetectado;
          });

          valueAccion = filtrarAccion.pop()
          if(valueAccion){
    
            if (valueAccion.ATSDetectado === 'true'){
               accionSi = accionSi + 1
            }
            else if (valueAccion.ATSDetectado === 'false'){
               accionNo = accionNo +1
            }
          }
            a=1          
            let respuesta;
            if(rows[1]){
                return (
                 <div>
                     <div>
                     
                      <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
                          <PDFExport
                              pageTemplate={PageTemplate}
                              forcePageBreak=".page-break"
                              paperSize="letter"
                              margin="1cm"
                              pageNum
                              fileName={`Reporte global ATS ${new Date().getFullYear()}`}
                              // pageTemplate={this.pdfExportComponent}
                              ref={(component) => this.pdfExportComponent = component}
                                 >
                                <div style={{ width: "550px" }}>
                                <MDBRow style={{marginBottom:10}}> 
                                <MDBCol>
                                </MDBCol> 
                                </MDBRow> 
                                <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                                <MDBTable component={Paper}  small borderless className="text-left">
                                <MDBTableBody>  
                                   <font size="3"face="arial"color="black">Reporte global del diagnóstico de Acontecimientos Traumáticos Severos</font><br></br>  
                                  <font size="1"face="arial"color="black"> <strong>{localStorage.getItem("razonsocial")} </strong></font><br></br>  
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
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>
                              <br/>  
                              <br/>
                              <br/>
                              <br/>
                              <br/>  
                              <br/>
                              <br/>
                              <br/>
                              <br/>  
                              <br/>
                              <br/>
                              <br/>
                              <br/>  
                              <br/>  
                              <br/>
                              <br/>
                              <br/>
                              <br/>  
                              <br/>
                              <br/>
                              <br/>
                              <br/>  
                              <br/>
                              <br/>
                              <br/>
                              <br/>    
                              <MDBTable  component={Paper}  small  className="text-center">
                              <MDBTableBody>
                              <center> 
                              <font size="1"
                              face="arial"
                              color="black" 
                              style = {{marginTop:25}}>GUÍA DE REFERENCIA I -
                              CUESTIONARIO PARA IDENTIFICAR LOS ACONTECIMIENTOS TRAUMÁTICOS SEVEROS EN LOS CENTROS DE TRABAJO</font> </center>   <br/>  
                                </MDBTableBody>
                                </MDBTable>
                                <MDBTable  component={Paper} small  className="text-left mt-4 ">
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
                                  
                                   <table width="500" className="table-bordered table-lg" style = {{ marginBottom:20}}>
                                   <tr>
                                   <td width="36%" className="text-center" style={{backgroundColor: "#D8D8D8"}}><font size="1" face="arial"color="black">TOTAL : <strong>{this.state.datosLength}</strong></font></td>
                                   <td width="32%" className="text-center" style={{backgroundColor: "#FF0000 "}} ><font size="1" face="arial"color="black">ACCIÓN REQUERIDA : {accionSi}</font></td>
                                   <td width="32%" className="text-center" style={{backgroundColor: "#9BE0F7"}}><font size="1" face="arial"color="black" >ACCIÓN NO REQUERIDA : {accionNo}</font></td>
                                   </tr>                                  
                                    </table>  
                                  <table width="500" className="table-bordered table-lg" > 
                                    <tr >   
                                    <td className="text-center" width="5%"><font size="1" face="arial"color="black" ><strong>#</strong></font></td>                           
                                    <td className="text-center" width="19%" ><font size="1" face="arial"color="black"><strong>Apellido Paterno</strong></font></td>
                                    <td className="text-center" width="19%"><font size="1" face="arial"color="black"><strong>Apellido Materno</strong></font></td>
                                    <td className="text-center" width="18%"><font size="1" face="arial"color="black" ><strong>Nombre</strong></font></td>
                                    <td className="text-center" width="27%"><font size="1" face="arial"color="black"><strong>Centro de Trabajo</strong></font></td>                                                                     

                                    <td className="text-center" width="12%"><font size="1" face="arial"color="black"><strong>Accion Requerida</strong></font></td>                                                                     

                                  </tr>
                                  { this.state.peticion1.map((rows,i) => {
                                      if(rows[1]){
                                      filtrarVeredicto =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 1;
                                      });
                                      valueVeredicto= filtrarVeredicto.pop()
                                      if(valueAccion){
                                
                                        if (valueVeredicto.ATSDetectado === 'true'){
                                      respuesta =  <td  width="10%" style={{backgroundColor: "#FF0000"}} align="center" component="th" ><font size="1" face="arial"color="black">SI</font></td>
                                      }
                                        else if (valueVeredicto.ATSDetectado === 'false'){
                                        respuesta =  <td  width="10%" style={{backgroundColor: "#9BE0F7 "}} align="center" component="th"><font size="1" face="arial"color="black">NO</font></td>
                                      }
                                      }
                                      
                                      return (
                                        <tr >
                                      <td width="7%"  className="text-justify"><font style={{marginLeft:1}} size="1" face="arial"color="black" >{i + 1} </font></td>
                                      <td width="19%" className="text-justify"><font style={{marginLeft:1}} size="1" face="arial"color="black">{rows[1].ApellidoP  }</font></td>
                                      <td width="19%" className="text-justify"><font style={{marginLeft:1}} size="1" face="arial"color="black">{ rows[1].ApellidoM}</font></td>
                                      <td width="18%" className="text-justify"><font style={{marginLeft:1}} size="1" face="arial"color="black" >{rows[1].nombre} </font></td>
                                      <td width="27%" className="text-justify"><font style={{marginLeft:1}} size="1" face="arial"color="black" >{rows[1].CentroTrabajo} </font></td>

                                      {respuesta}
                                        </tr>                                
                                      );
                                    }
                                
                                    })
                                    
                                  }
                              </table>
                              </div>

                              </PDFExport>
                          </div>
                        </div>

                    </div>          
                        )   
                      }                      
                    } )
                    
                  }
    </MDBContainer>
        }
    }

    let reporteImasivo;

    if(this.state.reporteImasivo[0]){

      let estado  = this.state.reporteImasivo;
      function array_equals(a, b){
        return a.length === b.length && a.every((item,idx) => item === b[idx])
        }
        let tag = []
        var filtrado = estado.filter(item => !array_equals(item, tag))
        if(filtrado[0]){

          reporteImasivo = 
          <MDBContainer>
              <div className="example-config">
                <MDBBtn   color="secondary" size="md"  className="k-button text-white" onClick={() => { this.pdfExportComponent.save(); }}>
                    Descargar
                </MDBBtn>
                <MDBBtn  className = "text-white"  color="danger" size="md"   onClick= {(e) => window.location.reload()}>Cerrar</MDBBtn>
              </div>
           { filtrado.map((rows) =>{ 
                    a=1       
                  let respuesta;
                  if(rows[0]){
                  return (
                     <div>
                      <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
                          <PDFExport
                              pageTemplate={PageTemplate}
                              forcePageBreak=".page-break"
                              paperSize="letter"
                              margin="1cm"
                              pageNum
                              fileName={`Reporte individual masivo del total de empleados ATS ${new Date().getFullYear()}`}
                              // pageTemplate={this.pdfExportComponent}
                              ref={(component) => this.pdfExportComponent = component}
                                 >
                                
                                  <font size="1"  face="arial"
                                  color="black" style = {{marginLeft:35}}></font>
                                  {this.state.reporteImasivo.map(rows=>{
                                    // console.log("reportei masivo" , this.state.reporteImasivo)
                                     let ATSReporteMasivo;
                                     let filtrarVeredictoMasivo;
                                     let valueVeredictoMasivo;
                                    if(rows[0]){
                                      filtrarVeredictoMasivo =  rows.filter(function(hero) {
                                        return hero.ATSDetectado;
                                      });
                                      valueVeredictoMasivo= filtrarVeredictoMasivo.pop()
                                      if(valueVeredictoMasivo){
                                      if (valueVeredictoMasivo.ATSDetectado === 'true'){
                                        ATSReporteMasivo= <font size="1"
                                        face="arial"
                                        color="red" >LA EVALUACIÓN REVELÓ QUE EL PERSONAL  REQUIERE CANALIZACIÓN CON UN PROFESIONAL</font>
                                        ATS = <Alert className ="mt-4" color ="danger ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL  REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
                                      }
                                      else if (valueVeredictoMasivo.ATSDetectado === 'false'){
                                        ATSReporteMasivo= <font size="1"
                                        face="arial"
                                        color="blue" >LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</font>
                                        ATS = <Alert className ="mt-4" color ="primary ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
                                      }
                                      }
                                    }
                                    if(rows[0]){
                                      let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16;
                                      let array1= [];
                                      let filtrar1;
                                      filtrar1 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 1;
                                      });
                                      value1 = filtrar1.pop()
                        
                                      let array2= [];
                                      let filtrar2;
                                      filtrar2 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 2;
                                      });
                                      value2 = filtrar2.pop()

                        
                                      let array3= [];
                                      let filtrar3;
                                      filtrar3 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 3;
                                      });
                                      value3 = filtrar3.pop()


                                      let array4= [];
                                      let filtrar4;
                                      filtrar4 = rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 4;
                                      });
                                      value4 = filtrar4.pop()

                                      let array5= [];
                                      let filtrar5;
                                      filtrar5 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 5;
                                      });
                                      value5 = filtrar5.pop()

                                      let array6= [];
                                      let filtrar6;
                                      filtrar6 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 6;
                                      });
                                      value6 = filtrar6.pop()

                                      let array7= [];
                                      let filtrar7;
                                      filtrar7 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 7;
                                      });
                                      value7 = filtrar7.pop()

                                      let array8= [];
                                      let filtrar8;
                                      filtrar8 = rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 8;
                                      });
                                      value8 = filtrar8.pop()

                                      let array9= [];
                                      let filtrar9;
                                      filtrar9 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 9;
                                      });
                                      value9 = filtrar9.pop()
                        
                                      let array10= [];
                                      let filtrar10;
                                      filtrar10 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 10;
                                      });
                                      value10 = filtrar10.pop()

                                      let array12= [];
                                      let filtrar12;
                                      filtrar12 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 12;
                                      });
                                      value12 = filtrar12.pop()

                                      let array13= [];
                                      let filtrar13;
                                      filtrar13 = rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 13;
                                      });
                                      value13 = filtrar13.pop()

                                      let array14= [];
                                      let filtrar14;
                                      filtrar14 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 14;
                                      });
                                      value14 = filtrar14.pop()

                                      let array15= [];
                                      let filtrar15;
                                      filtrar15 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 15;
                                      });
                                      value15 = filtrar15.pop()

                                      let filtrar16;
                                      filtrar16 =  rows.filter(function(hero) {
                                        return hero.fk_preguntasATS == 16;

                                      });
                                      value16 = filtrar16.pop()
                                      return(
                                  <div style={{ width: "550px" }}>
                                  <img src={logo} alt="logo" style = {{width:550}}/>
                                  <MDBTable  component={Paper}  small borderless className="text-left mt-4 ">
                                    
                                   <MDBTableBody>  
                                   <font size="3"face="arial"color="black">Reporte individual del Diagnóstico de Acontecimientos Traumáticos Severos</font><br></br>  
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
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>  
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>  
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>  
                                  <br/>
                                  <br/>
                                  <br/>  
                                  <br/>  
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>  
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>  
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>  
                                  <br/>  
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>  
                                  <br/>
                                  <br/>
                                  <br/>
                                  <br/>  
                                  <br/>
                                  <br/>
                                  <br/>
                                      <center><font size="1" face="arial" color="black" style = {{marginTop:25}}>GUÍA DE REFERENCIA I - 
                                      CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE FUERON
                                      SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</font> </center> <br/>
  
                                       <table className="text-left ">
                                          <tr>
                                          <td width="16%"><font size="1" face="arial"color="black">RESULTADO : </font></td>
                                         <td width="84%"> <font size="1" face="arial"color="black" > {ATSReporteMasivo}</font></td>
                                         </tr>                                       
                                        </table>  
                                        <br></br>
                                        <p style={{textAlign: 'left'}}> <font  color="red"size="1">I.- Acontecimiento traumático severo </font></p>

                                          <table width="550" className=" table-bordered"> 
                                               <tr>           
                                                <td >
                                               <font size="1" face="arial"color="black" >¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los
                                                    siguientes:<br></br> ¿Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión
                                                    grave?, Asaltos?, ¿Actos violentos que derivaron en lesiones graves?, ¿Secuestro?, ¿Amenazas?, o Cualquier otro
                                                    que ponga en riesgo su vida o salud, y/o la de otras personas?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value1.Respuestas.toUpperCase()}</font></td>              
                                              </tr>
                                             </table>
                                       
                                             <p style={{textAlign: 'left'}}> <font color="red"   size="1">II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes)</font></p>
                                          
                                            <table width="550" className=" table-bordered">
                                            <tr>            
                                              <td >
                                            <font size="1" face="arial"color="black">¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</font></td>
                                              <td width="60px"><font size="1" face="arial"color="black">{value2.Respuestas.toUpperCase()}</font></td>
                                             </tr>
                                             <tr>
                                              <td >
                                            <font size="1" face="arial"color="black">¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?</font></td>
                                              <td width="60px"><font size="1" face="arial"color="black">{value3.Respuestas.toUpperCase()}</font></td>
                                               
                                            </tr>
                                           
                                          </table>

                                          <p style={{textAlign: 'left'}}>   <font size="1" color="red" >III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento</font></p>

                                          <table width="550" className=" table-bordered" >
                                              <tr>
                                               
                                                <td >
                                              <font size="1" face="arial"color="black">¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value4.Respuestas.toUpperCase()}</font></td></tr>
                                               
                                               <tr>
                                                
                                                <td >
                                              <font size="1" face="arial"color="black">¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value5.Respuestas.toUpperCase()}</font></td>
                                               </tr>
      
                                               <tr>
                                                
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha tenido dificultad para recordar alguna parte importante del evento?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value6.Respuestas.toUpperCase()}</font></td>
                                                </tr>
      
                                                <tr>
                                                
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha disminuido su interés en sus actividades cotidianas?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value7.Respuestas.toUpperCase()}</font></td>
                                               </tr>
      
                                               <tr>
                                               
                                                <td >
                                              <font size="1" face="arial"color="black">  ¿Se ha sentido usted alejado o distante de los demás?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value8.Respuestas.toUpperCase()}</font></td>
                                               </tr>
      
                                               <tr>
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha notado que tiene dificultad para expresar sus sentimientos?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value9.Respuestas.toUpperCase()}</font></td>
      
                                              </tr>

                                               <tr>
                                                <td >
                                              <font size="1" face="arial"color="black"> ¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value10.Respuestas.toUpperCase()}</font></td>
      
                                              </tr>
                                          
                                            </table>

                                            <p style={{textAlign: 'left'}}><font color="red"  size="1" >IV.- Afectación (durante el último mes)</font></p>
                                            <table width="550" className=" table-bordered">
                                              <tr>
                                               
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha tenido usted dificultades para dormir?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value12.Respuestas.toUpperCase()}</font></td></tr>
                                               
                                               <tr>
                                                
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha estado particularmente irritable o le han dado arranques de coraje?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value13.Respuestas.toUpperCase()}</font></td>
                                               </tr>
      
                                               <tr>
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha tenido dificultad para concentrarse?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value14.Respuestas.toUpperCase()}</font></td>
                                                </tr>
                                                <tr>
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha estado nervioso o constantemente en alerta?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value15.Respuestas.toUpperCase()}</font></td>
                                               </tr>
                                               <tr>
                                                <td >
                                              <font size="1" face="arial"color="black">¿Se ha sobresaltado fácilmente por cualquier cosa?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{value16.Respuestas.toUpperCase()}</font></td>
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
                                          </div>
                                            )
                                          }
                                        })}            
                              </PDFExport>
                          </div>
                        </div>       
                        )       
                       }
                    } )  
            }
          </MDBContainer>
      }

  } 
    return (
      <React.Fragment>
      <div>
          <Navbar/>
          <div style={{marginTop:"5%"}}>
          <MDBRow>
          <MDBCol style={{ maxWidth: "30rem" }}> 
          <ReactFusioncharts
            type="pie3d"
            width="140%"
            height="60%"
            dataFormat="JSON"
            dataSource={dataSource}
          />
          <MDBCard style={{marginLeft:"20%",width:"100%"}}>
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
           {this.state.todosLosPeriodos.map((rows)=>{
             if(rows.Descripcion){
              return( <MenuItem value={rows.Descripcion} onClick={e=>this.cargarTablaPeriodoSeleccionado(rows.Descripcion)}><strong>{rows.Descripcion.toUpperCase()}</strong></MenuItem>
              ) }
            })}
             
          </Menu>
          </MDBCardHeader>
          <MDBCardBody>
          <center>
          <MDBBtn style={{width:"60%"}} color="success" className = "text-white"  size="md" disabled={!this.state.botonDescargar}  onClick={e=>this.consultarDatosFiltrados(datosEmpleados,filtro,periodoTabla)} >Descarga del reporte Global</MDBBtn> 
          <MDBBtn style={{width:"60%"}}  color="success" size="md" disabled={!this.state.botonDescargaMasivo}  onClick={e=>this.reporteImasivo(datosEmpleados,filtro,periodoTabla)}  >Descarga masiva evaluaciones</MDBBtn>
          {spinnerReporte}
          {reporteGlobal}
          {reporteImasivo}
          {botonDescargarReporteIndividual}
          {botonCerrarReporteIndividual}
          {spinner}
          </center>
          </MDBCardBody>
          </MDBCard>
          </MDBCol> 
          <MDBCol style={{ maxWidth: "50rem" }}>
          <div style={{display: 'table', tableLayout:'fixed', width:'105%',marginLeft:"11%"}} >
            {tablaPeriodoActual}
            {tablaPeriodoSeleccionado}
            {pdfView1} 
          </div>
          </MDBCol>
          </MDBRow>         
          </div>
      </div>
      </React.Fragment>
        
      )
    }
  }

  export default App