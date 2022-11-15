import React from 'react';

import { API} from '../utils/http'
import MUIDataTable from "mui-datatables";
import './index.css';
import '../Home/index.css'
import axios from 'axios'
import {Card,Button,Modal} from 'antd'
import Navbar from '../Home/navbar';
import Report from "./Report";
import { FloatingButton, Item } from "react-floating-button";
import downloadIcon from "./chart.svg";
import Donut from './donut'

class Estadisticas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isOpen: false,
      datos:[],
      propiedades:[]   ,
      showModal2: false,     
      reporteEstadisticas:[],
      visible:false,
      confirmLoading:false,
      descarga:false,
      visible2:false,
      confirmLoading2:false,
      cardInicial:true,
      graficas:false,
      disabledButtons:false,
      leyendaDemo:''
    };
    this.onClick = this.onClick.bind(this);
    this.handleclick = this.handleclick.bind(this);
  }
      componentWillMount(){
        this.getEmployees()
        var Nombre = localStorage.getItem("nombre")
        var Apellidos = localStorage.getItem("apellidos")      
        this.setState({nombre:Nombre}) 
        this.setState({apellidos:Apellidos}) 
        let paquete = localStorage.getItem("paqueteAdquirido")
      if(paquete === "40" || paquete === "41" || paquete === "42"){
        console.log("entro",paquete)
        this.setState({disabledButtons:true})
        this.setState({leyendaDemo:"Licencia demo adquirida, funciones principales no disponibles"})
      }
      }
      onClick() {
        this.setState({
          collapse: !this.state.collapse,
        });
      }
    
    handleclick(){
    this.props.history.push("/profile")
    }
    
  getEmployees = async event => {
    var idAdmin  = localStorage.getItem("idAdmin")  
     await axios({
        url:  API,
        method:'post',
        data:{
        query:`
        query{
          getUsersTableEmployees(data:"${[idAdmin]}"){
            id
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
            ATSContestado
            RPContestado
            EEOContestado
            CentroTrabajo
              }
            }
            `
        }
            }).then((datos) => {
              this.setState({ datos: datos.data.data.getUsersTableEmployees});
            })
            .catch((error) => {
              console.log(".cartch" , error.response)
          });
  }
  showModal = () => {
    this.setState({visible:true})
  };
  showModal2 = () => {
    this.setState({visible2:true})
  };
  handleOk = async() => {
    await this.setState({descarga:true})
    this.setState({descarga:false})
    this.setState({confirmLoading:true})
    setTimeout(() => {
      this.setState({visible:false})
      this.setState({confirmLoading:false})
    }, 3000);
  };
  handleOk2 = () => {
    this.setState({graficas:true})
    this.setState({confirmLoading2:true})
    this.setState({cardInicial:false})
    setTimeout(() => {
      this.setState({visible2:false})
      this.setState({confirmLoading2:false})
    }, 3000);
  };   
  handleCancel2 = () => {
    this.setState({visible2:false})
  }; 
  handleCancel = () => {
    this.setState({visible:false})
  };

  generarReporte(data){
    this.showModal()
    let array = [];
    let arrayData = []
    data.map(rows=>{
      array.push(rows.data[0])
    })
    array.map(rows=>{
    let filter = this.state.datos.filter(function(param){
        return param.id === rows
    })
    arrayData.push(filter)
    })
    this.setState({reporteEstadisticas:arrayData})
  }

  render() {
    let leyendaDemo;
    if(this.state.leyendaDemo){
      leyendaDemo = <font color = "red">{this.state.leyendaDemo}</font>
    }else{
      leyendaDemo = <font color = "green">Licencia vigente</font>
    }
    const columns = ["ID","Nombre", "Apellido P.","Apellido M.","Centro de Trabajo","Genero"];
    const data = this.state.datos.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,rows.CentroTrabajo,rows.Sexo])
    })
    let filtro;
    let datosEmpleados;
    const options = {
        filterType: "dropdown",
        responsive: "stacked",
        download:true,
        viewColumns:false,
        // filter:false,
        search:false,
        print:false,
        elevation:0,
        textLabels: {
                   body: {
                     noMatch: "Lo Siento ,No se han encontrado Resultados :(",
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
        datosEmpleados = tableState.displayData
        },
        onFilterChange: (action, filtroTable) => {
          filtro=filtroTable
        }};
          let pdf ;
          let array  =  [ ]
          let arrayExpLab  =  [ ]
          let arrayAnt  =  [ ]
          let arrayEstudios  =  [ ]
          let arraySexo =  [ ]
          let arrayTipoPuesto =  [ ]
          let edad1519= []
          let edad2024= []
          let edad2529= []
          let edad3034= []
          let edad3539= []
          let edad4044= []
          let edad4549= []
          let edad5054= []
          let edad5559= []
          let edad6064= []
          let edad6569= []
          let edad70omas= []
          let expLab6Meses=[]
          let expLab6Meses1Año=[]
          let expLab1a4años=[]
          let expLab5a9años=[]
          let expLab10a14años=[]
          let expLab15a19años=[]
          let expLab20a24años=[]
          let expLab25años=[]       
          let ant6Meses=[]
          let ant6Meses1Año=[]
          let ant1a4años=[]
          let ant5a9años=[]
          let ant10a14años=[]
          let ant15a19años=[]
          let ant20a24años=[]
          let ant25años=[]
          let sinEstudios= []
          let primaria= []
          let secundaria= []
          let preparatoria= []
          let licenciatura= []
          let maestria= []
          let doctorado= []
          let hombre  = []
          let mujer= []
          let operativo = []
          let profesionalTecnico= []
          let supervisor = []
          let gerencial = []
          let directivo = []
          if(this.state.reporteEstadisticas[0]){
              this.state.reporteEstadisticas.map(rows =>{
                array.push(rows[0].FechaNacimiento)
                arrayExpLab.push(rows[0].ExperienciaLaboral)
                arrayAnt.push(rows[0].TiempoPuesto)
                arrayEstudios.push(rows[0].NivelEstudios)
                arraySexo.push(rows[0].Sexo)
                arrayTipoPuesto.push(rows[0].TipoPuesto)
              })
              const resultSexoH= arraySexo.filter(function(valor){
                return valor === "MASCULINO"
              })
              hombre.push(resultSexoH)
              const resultSexoM= arraySexo.filter(function(valor){
                return valor === "FEMENINO"
              })
              mujer.push(resultSexoM)
              var porcentajeMujer = (mujer[0].length / arraySexo.length)*100;
              var intPorcentajeMujer = Math.round( porcentajeMujer );
              var porcentajeHombre= (hombre[0].length / arraySexo.length)*100;
              var intPorcentajeHombre= Math.round( porcentajeHombre );
              let arrayGenero = []
              arrayGenero.push([hombre,intPorcentajeHombre],[mujer,intPorcentajeMujer])
              ///////////////////////////////////////////////////////////////////////
              let arrayDatos = [];
              this.state.reporteEstadisticas.map(rows=>{
                arrayDatos.push(rows[0])
              })
              function getUniqueListBy(arr, key) {
                return [...new Map(arr.map(item => [item[key], item])).values()]
              }
              const arr1 = getUniqueListBy(arrayDatos, 'CentroTrabajo')
              let arrayCentro = [];
               arr1.map(rows=>{
                arrayCentro.push(rows.CentroTrabajo)
              })
              let distribucionCentro;  
              let nuevoObjeto = []
              arrayDatos.forEach( (x,i) => {
              if( !nuevoObjeto.hasOwnProperty(x.CentroTrabajo)){
                nuevoObjeto.push(x.CentroTrabajo)
              }
              const counts = {};
              nuevoObjeto.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
              distribucionCentro = Object.entries(counts);
              })             
              ///////////////////////////////////////////////////////////////////////////
                let arrayEdad =  []
                const result1519 = array.filter(function(valor){
                  return valor === "15 A 19"
                })
                edad1519.push(result1519)
                var porcentajeedad1519= (edad1519[0].length / array.length)*100;
                var intPorcentajeedad1519= Math.round( porcentajeedad1519 );
                const result2024 = array.filter(function(valor){
                  return valor === "20 A 24"
                })
                edad2024.push(result2024)
                var porcentajeedad2024= (edad2024[0].length / array.length)*100;
                var intPorcentajeedad2024= Math.round( porcentajeedad2024 );
                const result2529 = array.filter(function(valor){
                  return valor === "25 A 29"
                })
                edad2529.push(result2529)
                var porcentajeedad2529= (edad2529[0].length / array.length)*100;
                var intPorcentajeedad2529= Math.round( porcentajeedad2529 );
                const result3034 = array.filter(function(valor){
                  return valor === "30 A 34"
                })
                edad3034.push(result3034)
                var porcentajeedad3034= (edad3034[0].length / array.length)*100;
                var intPorcentajeedad3034= Math.round( porcentajeedad3034 );
                const result3539 = array.filter(function(valor){
                  return valor === "35 A 39"
                })
                edad3539.push(result3539)
                var porcentajeedad3539= (edad3539[0].length / array.length)*100;
                var intPorcentajeedad3539= Math.round( porcentajeedad3539 );
                const result4044 = array.filter(function(valor){
                  return valor === "40 A 44"
                })
                edad4044.push(result4044)
                var porcentajeedad4044= (edad4044[0].length / array.length)*100;
                var intPorcentajeedad4044= Math.round( porcentajeedad4044 );
                const result4549 = array.filter(function(valor){
                  return valor === "45 A 49"
                })
                edad4549.push(result4549)
                var porcentajeedad4549= (edad4549[0].length / array.length)*100;
                var intPorcentajeedad4549= Math.round( porcentajeedad4549 );
                const result5054 = array.filter(function(valor){
                  return valor === "50 A 54"
                })
                edad5054.push(result5054)
                var porcentajeedad5054= (edad5054[0].length / array.length)*100;
                var intPorcentajeedad5054= Math.round( porcentajeedad5054);
                const result5559 = array.filter(function(valor){
                  return valor === "55 A 59"
                })
                edad5559.push(result5559)
                var porcentajeedad5559= (edad5559[0].length / array.length)*100;
                var intPorcentajeedad5559= Math.round( porcentajeedad5559);
                const result6064 = array.filter(function(valor){
                  return valor === "60 A 64"
                })
                edad6064.push(result6064)
                var porcentajeedad6064= (edad6064[0].length / array.length)*100;
                var intPorcentajeedad6064= Math.round( porcentajeedad6064);
                const result6569 = array.filter(function(valor){
                  return valor === "65 A 69"
                })
                edad6569.push(result6569)
                var porcentajeedad6569= (edad6569[0].length / array.length)*100;
                var intPorcentajeedad6569= Math.round( porcentajeedad6569);
                const result70omas = array.filter(function(valor){
                  return valor === "70 0 mas"
                })
                edad70omas.push(result70omas)
                var porcentajeedad70omas= (edad70omas[0].length / array.length)*100;
                var intPorcentajeedad70omas= Math.round( porcentajeedad70omas);
                arrayEdad.push([edad1519[0].length,intPorcentajeedad1519],[edad2024[0].length,intPorcentajeedad2024],
                  [edad2529[0].length,intPorcentajeedad2529],[edad3034[0].length,intPorcentajeedad3034],
                  [edad3539[0].length,intPorcentajeedad3539],[edad4044[0].length,intPorcentajeedad4044],
                  [edad4549[0].length,intPorcentajeedad4549],[edad5054[0].length,intPorcentajeedad5054],
                  [edad5559[0].length,intPorcentajeedad5559],[edad6064[0].length,intPorcentajeedad6064],
                  [edad6569[0].length,intPorcentajeedad6569],[edad70omas[0].length,intPorcentajeedad70omas],
                  [this.state.reporteEstadisticas.length]
                )
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                let arrayFormacion = []    
                const resultSinEstudios= arrayEstudios.filter(function(valor){
                  return valor === "SIN FORMACION"
                })
                sinEstudios.push(resultSinEstudios)
                var porcentajesinEstudios= (sinEstudios[0].length / arrayEstudios.length)*100;
                var intPorcentajesinEstudios= Math.round( porcentajesinEstudios );
                const resultPrimaria= arrayEstudios.filter(function(valor){
                  return valor === "PRIMARIA"
                })
                primaria.push(resultPrimaria)
                var porcentajeprimaria= (primaria[0].length / arrayEstudios.length)*100;
                var intPorcentajeprimaria= Math.round( porcentajeprimaria );
                const resultSecundaria= arrayEstudios.filter(function(valor){
                  return valor === "SECUNDARIA"
                })
                secundaria.push(resultSecundaria)
                var porcentajesecundaria= (secundaria[0].length / arrayEstudios.length)*100;
                var intPorcentajesecundaria= Math.round( porcentajesecundaria );
                const resultPreparatoria= arrayEstudios.filter(function(valor){
                  return valor === "PREPARATORIA O BACHILLERATO"
                })
                preparatoria.push(resultPreparatoria)
                var porcentajepreparatoria= (preparatoria[0].length / arrayEstudios.length)*100;
                var intPorcentajepreparatoria= Math.round( porcentajepreparatoria );
                const resultLicenciatura= arrayEstudios.filter(function(valor){
                  return valor=== "LICENCIATURA"
                })
                licenciatura.push(resultLicenciatura)
                var porcentajelicenciatura= (licenciatura[0].length / arrayEstudios.length)*100;
                var intPorcentajelicenciatura= Math.round( porcentajelicenciatura);
                const resultMaestria= arrayEstudios.filter(function(valor){
                  return valor === "MAESTRIA"
                })
                maestria.push(resultMaestria)
                var porcentajemaestria= (maestria[0].length / arrayEstudios.length)*100;
                var intPorcentajemaestria= Math.round( porcentajemaestria);
                const resultDoctorado= arrayEstudios.filter(function(valor){
                  return valor === "DOCTORADO"
                })
                doctorado.push(resultDoctorado)
                var porcentajedoctorado= (doctorado[0].length / arrayEstudios.length)*100;
                var intPorcentajedoctorado= Math.round( porcentajedoctorado);
                arrayFormacion.push(
                  [sinEstudios[0].length,intPorcentajesinEstudios],[primaria[0].length,intPorcentajeprimaria],
                  [secundaria[0].length,intPorcentajesecundaria],[preparatoria[0].length,intPorcentajepreparatoria],
                  [licenciatura[0].length,intPorcentajelicenciatura],[maestria[0].length,intPorcentajemaestria],
                  [doctorado[0].length,intPorcentajedoctorado]
                )
                ///////////////////////////////////////////////////////////////
                let arrayExperienciaLaboral = [];
                const resultExpLab6Meses= arrayExpLab.filter(function(valor){
                  return valor === "MENOS DE 6 MESES"
                })
                expLab6Meses.push(resultExpLab6Meses)
                var porcentajeexpLab6Meses= (expLab6Meses[0].length / arrayExpLab.length)*100;
                var intPorcentajeexpLab6Meses= Math.round( porcentajeexpLab6Meses);
                const resultExpLab1Año= arrayExpLab.filter(function(valor){
                  return valor === "ENTRE 6 MESES Y 1 AÑO"
                })
                expLab6Meses1Año.push(resultExpLab1Año)
                var porcentajeexpLab6Meses1Año= (expLab6Meses1Año[0].length / arrayExpLab.length)*100;
                var intPorcentajeexpLab6Meses1Año= Math.round( porcentajeexpLab6Meses1Año);
                const resultExpLab4Año= arrayExpLab.filter(function(valor){
                  return valor === "ENTRE 1 A 4 AÑOS"
                })
                expLab1a4años.push(resultExpLab4Año)
                var porcentajeexpLab1a4años= (expLab1a4años[0].length / arrayExpLab.length)*100;
                var intPorcentajeexpLab1a4años= Math.round( porcentajeexpLab1a4años);
                const resultExpLab9Año= arrayExpLab.filter(function(valor){
                  return valor === "ENTRE 5 A 9 AÑOS"
                })
                expLab5a9años.push(resultExpLab9Año)
                var porcentajeexpLab5a9años= (expLab5a9años[0].length / arrayExpLab.length)*100;
                var intPorcentajeexpLab5a9años= Math.round( porcentajeexpLab5a9años);
                const resultExpLab14Año= arrayExpLab.filter(function(valor){
                  return valor === "ENTRE 10 A 14 AÑOS"
                })
                expLab10a14años.push(resultExpLab14Año)
                var porcentajeexpLab10a14años= (expLab10a14años[0].length / arrayExpLab.length)*100;
                var intPorcentajeexpLab10a14años= Math.round( porcentajeexpLab10a14años);
                const resultExpLab19Año= arrayExpLab.filter(function(valor){
                  return valor === "ENTRE 15 A 19 AÑOS"
                })
                expLab15a19años.push(resultExpLab19Año)
                var porcentajeexpLab15a19años= (expLab15a19años[0].length / arrayExpLab.length)*100;
                var intPorcentajeexpLab15a19años= Math.round( porcentajeexpLab15a19años);
                const resultExpLab24Año= arrayExpLab.filter(function(valor){
                  return valor === "ENTRE 20 A 24 AÑOS"
                })
                expLab20a24años.push(resultExpLab24Año)
                var porcentajeexpLab20a24años= (expLab20a24años[0].length / arrayExpLab.length)*100;
                var intPorcentajeexpLab20a24años= Math.round( porcentajeexpLab20a24años);
                const resultExpLab25Año= arrayExpLab.filter(function(valor){
                  return valor === "25 AÑOS O MAS"
                })
                expLab25años.push(resultExpLab25Año)
                var porcentajeexpLab25años= (expLab25años[0].length / arrayExpLab.length)*100;
                var intPorcentajeexpLab25años= Math.round( porcentajeexpLab25años);
                arrayExperienciaLaboral.push(
                  [expLab6Meses[0].length,intPorcentajeexpLab6Meses],[expLab6Meses1Año[0].length,intPorcentajeexpLab6Meses1Año],
                  [expLab1a4años[0].length,intPorcentajeexpLab1a4años],[expLab5a9años[0].length,intPorcentajeexpLab5a9años],
                  [expLab10a14años[0].length,intPorcentajeexpLab10a14años],[expLab15a19años[0].length,intPorcentajeexpLab15a19años],
                  [expLab20a24años[0].length,intPorcentajeexpLab20a24años],[expLab25años[0].length,intPorcentajeexpLab25años]
                )
                ////////////////////////////////////////////////////////////////////////////
                let arrayAntiguedad = [];  
                const resultAnt6Meses= arrayAnt.filter(function(valor){
                  return valor === "MENOS DE 6 MESES"
                })
                ant6Meses.push(resultAnt6Meses)
                var porcentajeant6Meses= (ant6Meses[0].length / arrayAnt.length)*100;
                var intPorcentajeant6Meses= Math.round( porcentajeant6Meses);
                const resultAnt1Año= arrayAnt.filter(function(valor){
                  return valor === "ENTRE 6 MESES Y 1 AÑO"
                })
                ant6Meses1Año.push(resultAnt1Año)
                var porcentajeant6Meses1Año= (ant6Meses1Año[0].length / arrayAnt.length)*100;
                var intPorcentajeant6Meses1Año= Math.round( porcentajeant6Meses1Año);
                const resultAnt4Año= arrayAnt.filter(function(valor){
                  return valor === "ENTRE 1 A 4 AÑOS"
                })
                ant1a4años.push(resultAnt4Año)
                var porcentajeant1a4años= (ant1a4años[0].length / arrayAnt.length)*100;
                var intPorcentajeant1a4años= Math.round( porcentajeant1a4años);
                const resultAnt9Año= arrayAnt.filter(function(valor){
                  return valor === "ENTRE 5 A 9 AÑOS"
                })
                ant5a9años.push(resultAnt9Año)
                var porcentajeant5a9años= (ant5a9años[0].length / arrayAnt.length)*100;
                var intPorcentajeant5a9años= Math.round( porcentajeant5a9años);
                const resultAnt14Año= arrayAnt.filter(function(valor){
                  return valor=== "ENTRE 10 A 14 AÑOS"
                })
                ant10a14años.push(resultAnt14Año)
                var porcentajeant10a14años= (ant10a14años[0].length / arrayAnt.length)*100;
                var intPorcentajeant10a14años= Math.round( porcentajeant10a14años);
                const resultAnt19Año= arrayAnt.filter(function(valor){
                  return valor === "ENTRE 15 A 19 AÑOS"
                })
                ant15a19años.push(resultAnt19Año)
                var porcentajeant15a19años= (ant15a19años[0].length / arrayAnt.length)*100;
                var intPorcentajeant15a19años= Math.round( porcentajeant15a19años);
                const resultAnt24Año= arrayAnt.filter(function(valor){
                  return valor === "ENTRE 20 A 24 AÑOS"
                })
                ant20a24años.push(resultAnt24Año)
                var porcentajeant20a24años= (ant20a24años[0].length / arrayAnt.length)*100;
                var intPorcentajeant20a24años= Math.round( porcentajeant20a24años);
                const resultAnt25Año= arrayAnt.filter(function(valor){
                  return valor === "25 AÑOS O MAS"
                })
                ant25años.push(resultAnt25Año)
                var porcentajeant25años= (ant25años[0].length / arrayAnt.length)*100;
                var intPorcentajeant25años= Math.round( porcentajeant25años);
                arrayAntiguedad.push(
                  [ant6Meses[0].length,intPorcentajeant6Meses],[ant6Meses1Año[0].length,intPorcentajeant6Meses1Año],
                  [ant1a4años[0].length,intPorcentajeant1a4años],[ant5a9años[0].length,intPorcentajeant5a9años],
                  [ant10a14años[0].length,intPorcentajeant10a14años],[ant15a19años[0].length,intPorcentajeant15a19años],
                  [ant20a24años[0].length,intPorcentajeant20a24años],[ant25años[0].length,intPorcentajeant25años]
                )
                /////////////////////////////////////////////////////////////////////////////
                let arrayPuesto = [];
                const resultOperativo= arrayTipoPuesto.filter(function(valor){
                  return valor === "OPERATIVO"
                })
                operativo.push(resultOperativo)
                var porcentajeoperativo= (operativo[0].length / arrayTipoPuesto.length)*100;
                var intPorcentajeoperativo= Math.round( porcentajeoperativo);
                const resultProfesionalTecnico= arrayTipoPuesto.filter(function(valor){
                  return valor === "PROFESIONAL O TECNICO"
                })
                profesionalTecnico.push(resultProfesionalTecnico)
                var porcentajeprofesionalTecnico= (profesionalTecnico[0].length / arrayTipoPuesto.length)*100;
                var intPorcentajeprofesionalTecnico= Math.round( porcentajeprofesionalTecnico);

                const resultSupervisor= arrayTipoPuesto.filter(function(valor){
                  return valor === "SUPERVISOR"
                })
                supervisor.push(resultSupervisor)
                var porcentajesupervisor= (supervisor[0].length / arrayTipoPuesto.length)*100;
                var intPorcentajesupervisor= Math.round( porcentajesupervisor);
                const resultGerencial= arrayTipoPuesto.filter(function(valor){
                  return valor === "GERENCIAL"
                })
                gerencial.push(resultGerencial)
                var porcentajegerencial= (gerencial[0].length / arrayTipoPuesto.length)*100;
                var intPorcentajegerencial= Math.round( porcentajegerencial);
                const resultDirectivo= arrayTipoPuesto.filter(function(valor){
                  return valor === "DIRECTIVO"
                })
                directivo.push(resultDirectivo)
                var porcentajedirectivo= (directivo[0].length / arrayTipoPuesto.length)*100;
                var intPorcentajedirectivo= Math.round( porcentajedirectivo);
                arrayPuesto.push(
                  [operativo[0].length,intPorcentajeoperativo],[profesionalTecnico[0].length,intPorcentajeprofesionalTecnico],
                  [supervisor[0].length,intPorcentajesupervisor],[gerencial[0].length,intPorcentajegerencial],
                  [directivo[0].length,intPorcentajedirectivo]
                )
                pdf =  <Report descarga={this.state.descarga} puesto={arrayPuesto} antiguedad = {arrayAntiguedad} experienciaLAboral = {arrayExperienciaLaboral} formacion={arrayFormacion} centroTrabajo={distribucionCentro} epleadosTotales = {this.state.reporteEstadisticas.length} genero = {arrayGenero} edad = {arrayEdad}/>
          }
  
    let tituloModal = <h6><strong>Reporte de estadísticas generales (Guía V)</strong></h6>
    let rs = localStorage.getItem("razonsocial");
    let urlLogo = localStorage.getItem("urlLogo");
    let cardInicial;
    if(this.state.cardInicial === true){
      cardInicial = <Card style={{marginTop:"3%",padding:"10px",width:"80%",marginLeft:"5%"}} title = {<h6><strong>Guía de referencia. V (Estadísticas generales)</strong></h6>} extra = { <Button  className = "text-white"  type="primary" onClick={(e)=>this.generarReporte(datosEmpleados)}  disabled={this.state.disabledButtons}>Generar reporte</Button>}>
      {leyendaDemo}
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
      </Card>
    }
    let modalGraficas;
    if(this.state.graficas === false){
      modalGraficas =   <Modal
      title={<h6><strong>Gráficas de distribución</strong></h6>}
      cancelText="Cancelar"
      okText="Ver gráficas"
      visible={this.state.visible2}
      onOk={e=>this.handleOk2()}
      confirmLoading={this.state.confirmLoading2}
      onCancel={e=>this.handleCancel2()}
    >
    <Donut estadisticas = {this.state.datos}/>
    </Modal>
    }
    let dognut;
    if(this.state.graficas === true){
     dognut = <Donut verGraficas={true} estadisticas = {this.state.datos}/>
    }
    return (
     <div>
        <Navbar modulo = {"ESTADÍSTICAS GUIA V"}/>  
        <FloatingButton>
          <Item
            imgSrc={downloadIcon}
            onClick={(e) => {
              this.showModal2()
            }}
          />
        </FloatingButton>;
        <div className = "tablaInicialEstadisticas" >  
        {cardInicial}
        <Modal
            title={tituloModal}
            cancelText="Cancelar"
            okText="Descargar reporte"
            visible={this.state.visible}
            onOk={e=>this.handleOk()}
            confirmLoading={this.state.confirmLoading}
            onCancel={e=>this.handleCancel()}
          >
           <img src={urlLogo} style={{width:"35px"}} alt="logo"/><br/>{rs} <i  class="fas size:7x fa-file-pdf"></i>
          </Modal>
          {modalGraficas}
          {dognut}
          {pdf}
        </div>          
        
      </div>
      )
      }
      }


export default Estadisticas