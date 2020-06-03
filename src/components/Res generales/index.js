import React from "react";
import MUIDataTable from "mui-datatables";
import Grow from "@material-ui/core/Grow";
import {MDBRow,MDBCol,MDBBtn, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav,MDBTable, MDBTableBody, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logo.png'
import logotipo from '../images/logotipo.png'
import diagnostico from '../images/diagnostico.png'
import { API} from '../utils/http'

import '../Home/index.css'
import usuario from '../images/usuario.png'
import Button from '@material-ui/core/Button';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { DialogUtility } from '@syncfusion/ej2-popups';
import Modal from 'react-modal';
import PDF from '../PDF/index'
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
      collapse: false,
      isOpen: false,
      showModal2: false,  
      spinner:false,
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      dataBar: {
        labels: ["Nulo", "Bajo", "Medio", "Alto", "Muy Alto"],
        datasets: [
          {
            label: "% Resultados",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(155,224,247)",
              "rgba(107,245,110)",
              "rgba(255, 500,0)",
              "rgba(255, 192, 0)",
              "rgba(255, 0,0)",
              // "rgba(255, 177, 101,0.4)"
            ],
            borderWidth: 2,
            borderColor: [
              // "rgba(255, 134, 159, 1)",
              // "rgba(98,  182, 239, 1)",
              // "rgba(255, 218, 128, 1)",
              // "rgba(113, 205, 205, 1)",
              // "rgba(170, 128, 252, 1)",
              // "rgba(255, 177, 101, 1)"
            ]
          }
        ]
      } 
      // componentepdf:'0'
    };
    this.onClick = this.onClick.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.ads = this.ads.bind(this);
    
  }

    componentWillMount(){
      console.log("ya se esta montando")
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
    var id  =localStorage.getItem("idAdmin")       
    // const url = 'http://localhost:8000/graphql'
    
    axios({
      url:  API,
      method:'post',
      data:{ 
      query:`
      query{
        getEmployeesResolvesRP(data:"${id}"){
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
          this.setState({empleados:datos.data.data.getEmployeesResolvesRP})       
          console.log("state",this.state.empleados)
          }).catch(err=>{
            console.log("error" ,err.response)
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
                  // console.log("ponderaciones",datos.data.data.getPonderacion)
                })
                .catch(err => {
                  console.log("el error es  ",err.response)
                }); 
     }

     consultarDatosFiltrados = async (datos,filtro) =>{
      this.setState({spinner:true})
      let array=[];
      let periodo;
      let totalEmpleados=[];
      datos.map(rows=>{
        periodo= rows.data[6]
        array.push(rows.data[0])
      })
      for(var i=0; i<=array.length;i++){
       
        // const url = 'http://localhost:8000/graphql'
       await  axios({
          url:  API,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[array[i],periodo]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
              totalEmpleados.push(datos.data.data.getresultGlobalSurveyRP)
              console.log("totalEMpleados" , totalEmpleados)
              this.setState({peticion1:totalEmpleados})
              this.setState({spinner:false})
              })
              .catch(err => {
              });  
           }
          
           let array3 = []
           let array4=array3.push(array3)
           console.log("el estado " , this.state.peticion1)

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
      console.log("datos enviados",datos[0].data[6])
        }

  render() {
    let spinner;
    
    if(this.state.spinner== true){
      spinner = <div className="spinner-border text-info" role="status"><strong className="sr-only">Espere un momento por favor ...</strong>
        </div>
    }

    const columns = ["ID","Nombre", "Sexo",  "Area", "Puesto","Centro de Trabajo","Periodo"];

    const data = this.state.empleados.map(rows=>{
      return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoP,rows.Sexo,rows.AreaTrabajo,rows.Puesto,rows.CentroTrabajo,rows.periodo])
    })

    let datosEmpleados;
    let filtro;
    const options = {
        filterType: "dropdown",
        responsive: "stacked",
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
        datosEmpleados=tableState.displayData
        },
        onFilterChange: (action, filtroTable) => {
          filtro=filtroTable
          }     };
          let ponderacion;
          if(this.state.peticion1.length>0){
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
            console.log("respuesta1" , respuesta1)
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
            console.log("respuesta2" , respuesta2)
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
              console.log("respuesta3" , respuesta3)
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
              console.log("respuesta4" , respuesta4)
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
              console.log("respuesta5" , respuesta5)
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
              console.log("respuesta6" , respuesta6)
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
              console.log("respuesta7" , respuesta7)
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
              console.log("respuesta8" , respuesta8)
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
              console.log("respuesta8" , respuesta9)
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
              console.log("respuesta9" , respuesta9)
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
              console.log("respuesta11" , respuesta11)
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
              console.log("respuesta12" , respuesta12)
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
              console.log("respuesta13" , respuesta13)
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
              console.log("respuesta14" , respuesta14)
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
              console.log("respuesta15" , respuesta15)
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
              console.log("respuesta16" , respuesta16)
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
              console.log("respuesta17" , respuesta17)
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
              console.log("respuesta18" , respuesta18)
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
              console.log("respuesta19" , respuesta19)
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
              console.log("respuesta20" , respuesta20)
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
              console.log("respuesta21" , respuesta21)
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
              console.log("respuesta22" , respuesta22)
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
              console.log("respuesta23" , respuesta23)
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
              console.log("respuesta24" , respuesta24)
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
              console.log("respuesta25" , respuesta1)
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
              console.log("respuesta26" , respuesta26)
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
              console.log("respuesta27" , respuesta27)
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
              console.log("respuesta28" , respuesta28)
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
              console.log("respuesta29" , respuesta29)
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
              console.log("respuesta30" , respuesta30)
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
              console.log("respuesta31" , respuesta31)
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
              console.log("respuesta32" , respuesta32)
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
              console.log("respuesta33" , respuesta33)
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
              console.log("respuesta34" , respuesta34)
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
              console.log("respuesta35" , respuesta35)
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
              console.log("respuesta36" , respuesta36)
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
              console.log("respuesta37" , respuesta37)
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
              console.log("respuesta38" , respuesta38)
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
              console.log("respuesta39" , respuesta39)
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
              console.log("respuesta40" , respuesta40)
              })
              var filtrar41 ;
              var array41Int;
              var arr41Int;
              var respuesta41;
              this.state.peticion1.map(rows=>{
              filtrar41 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP == 42;
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
              console.log("respuesta41" , respuesta41)
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
              console.log("respuesta42" , respuesta42)
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
              console.log("respuesta43" , respuesta43)
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
              console.log("respuesta44" , respuesta44)
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
              console.log("respuesta45" , respuesta45)
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
              console.log("respuesta46" , respuesta46)
              })

              total =(respuesta1+respuesta2+respuesta3+respuesta4+respuesta5+respuesta6+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta12+respuesta13+respuesta14+respuesta15+respuesta16+respuesta17+respuesta18+respuesta19+respuesta20
                +respuesta21+respuesta22+respuesta23+respuesta24+respuesta25+respuesta26+respuesta27+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40
                +respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46);
                let length =this.state.peticion1.length-1;
                let general =total/length.toFixed(2);
let celda;
let criterios;

if(general<20){
celda = <TableCell width="10%"  style={{backgroundColor: "#9BE0F7 "}}><font size="1" face="arial"color="black">Nulo o Despreciable</font></TableCell>
criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black">El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</font></TableCell>
}else if(general>=20 && general < 45){
  celda = <TableCell width="10%" style={{backgroundColor: "#6BF56E"}} ><font size="1" face="arial"color="black">Bajo</font></TableCell>
  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black"> Es necesario una mayor difusión de la política de prevención de riesgos
  psicosociales y programas para: la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral.</font></TableCell>
}else if(general>=45 && general < 70){
  celda = <TableCell width="10%"  style={{backgroundColor: "#FFFF00"}} ><font size="1" face="arial"color="black">Medio</font></TableCell>
  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black">Se requiere revisar la política de prevención de riesgos psicosociales y
  programas para la prevención de los factores de riesgo psicosocial, la
  promoción de un entorno organizacional favorable y la prevención de la
  violencia laboral, así como reforzar su aplicación y difusión, mediante un
  Programa de intervención.</font></TableCell>
}else if(general>=70 && general < 90){
 celda = <TableCell  width="10%" style={{backgroundColor: "#FFC000"}} ><font size="1" face="arial"color="black">Alto</font></TableCell>
 criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black">Se requiere realizar un análisis de cada categoría y dominio, de manera que
 se puedan determinar las acciones de intervención apropiadas a través de un
 Programa de intervención, que podrá incluir una evaluación específica y
 deberá incluir una campaña de sensibilización, revisar la política de
 prevención de riesgos psicosociales y programas para la prevención de los
 factores de riesgo psicosocial, la promoción de un entorno organizacional
 favorable y la prevención de la violencia laboral, así como reforzar su
 aplicación y difusión.</font></TableCell>
}
else if( general > 90){
  celda  = <TableCell width="10%"  style={{backgroundColor: "#FF0000"}}><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  criterios = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="1" face="arial"color="black">Se requiere realizar el análisis de cada categoría y dominio para establecer
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
let categoriaUno = ((respuesta2+respuesta1+respuesta3)/length).toFixed(2);
if(categoriaUno < 3){
  colorCategoriaUno  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria1Nulo=categoriaUno
}else if(categoriaUno >= 3 && categoriaUno < 5){
  colorCategoriaUno =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria1Bajo= categoriaUno
}else if(categoriaUno >= 5 && categoriaUno < 7){
  colorCategoriaUno=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria1Medio= categoriaUno
}else if(categoriaUno >= 7 && categoriaUno < 9){
  colorCategoriaUno = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria1Alto= categoriaUno
}else if(categoriaUno >= 9){
  colorCategoriaUno = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
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
  colorCategoriaDos  = <TableCell style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria2Nulo=categoriaDos
}else if(categoriaDos >= 10 && categoriaDos < 20){
  colorCategoriaDos =<TableCell style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria2Bajo= categoriaDos
}else if(categoriaDos >=20 && categoriaDos < 30){
  colorCategoriaDos=<TableCell style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria2Medio= categoriaDos
}else if(categoriaDos >=30 && categoriaDos < 40){
  colorCategoriaDos = <TableCell style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria2Alto= categoriaDos
}else if(categoriaDos >= 40){
  colorCategoriaDos = <TableCell style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria2MuyAlto= categoriaDos
}
let categoria3Nulo;
let categoria3Bajo;
let categoria3Medio;
let categoria3Alto;
let categoria3MuyAlto;
let colorCategoriaTre;

let categoriaTre =( (respuesta14+respuesta15+respuesta16+respuesta17)/length).toFixed(2);
if(categoriaTre < 4){
  colorCategoriaTre  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria3Nulo=categoriaTre
}else if(categoriaTre >= 4 && categoriaTre < 6){
  colorCategoriaTre =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria3Bajo= categoriaTre
}else if(categoriaTre >=6 && categoriaTre < 9){
  colorCategoriaTre=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria3Medio= categoriaTre
}else if(categoriaTre >=9 && categoriaTre < 12){
  colorCategoriaTre = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria3Alto= categoriaTre
}else if(categoriaTre >= 12){
  colorCategoriaTre = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
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
  colorCategoriaCuatro  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria4Nulo=categoriaCuatro
}else if(categoriaCuatro >= 10 && categoriaCuatro < 18){
  colorCategoriaCuatro =<TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria4Bajo= categoriaCuatro
}else if(categoriaCuatro >=18 && categoriaCuatro < 28){
  colorCategoriaCuatro=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria4Medio= categoriaCuatro
}else if(categoriaCuatro >=28 && categoriaCuatro < 38){
  colorCategoriaCuatro = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria4Alto= categoriaCuatro
}else if(categoriaCuatro >= 38){
  colorCategoriaCuatro= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
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
  colorDominioUno  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio1Nulo=DominioUno
}else if(DominioUno >= 3 && DominioUno < 5){
  colorDominioUno=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio1Bajo= DominioUno
}else if(DominioUno >= 5 && DominioUno < 7){
  colorDominioUno=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio1Medio= DominioUno
}else if(DominioUno >= 7 && DominioUno < 9){
  colorDominioUno = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio1Alto= DominioUno
}else if(DominioUno >= 9){
  colorDominioUno= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
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
  colorDominioDos  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio2Nulo=DominioDos
}else if(DominioDos >= 12 && DominioDos < 16){
  colorDominioDos=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio2Bajo= DominioDos
}else if(DominioDos >= 16 && DominioDos < 20){
  colorDominioDos=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio2Medio= DominioDos
}else if(DominioDos >= 20 && DominioDos < 24){
  colorDominioDos = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio2Alto= DominioDos
}else if(DominioDos >= 24){
  colorDominioDos= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
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
  colorDominioTres  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio3Nulo=DominioTres
}else if(DominioTres >= 5 && DominioTres < 8){
  colorDominioTres=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio3Bajo= DominioTres
}else if(DominioTres >= 8 && DominioTres < 11){
  colorDominioTres=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio3Medio= DominioTres
}else if(DominioTres >= 11 && DominioTres < 14){
  colorDominioTres = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio3Alto= DominioTres
}else if(DominioTres >= 14){
  colorDominioTres= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
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
  colorDominioCuatro  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio4Nulo=DominioCuatro
}else if(DominioCuatro >= 1 && DominioCuatro < 2){
  colorDominioCuatro=<TableCell width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio4Bajo= DominioCuatro
}else if(DominioCuatro >= 2 && DominioCuatro < 4){
  colorDominioCuatro = <TableCell  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio4Medio= DominioCuatro
}else if(DominioCuatro >= 4 && DominioCuatro < 6){
  colorDominioCuatro = <TableCell width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio4Alto= DominioCuatro
}else if(DominioCuatro >= 6){
  colorDominioCuatro= <TableCell width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
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
  colorDominioCinco  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio5Nulo=DominioCinco
}else if(DominioCinco >= 1 && DominioCinco < 2){
  colorDominioCinco=<TableCell width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio5Bajo= DominioCinco
}else if(DominioCinco >= 2 && DominioCinco < 4){
  colorDominioCinco=<TableCell width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio5Medio= DominioCinco
}else if(DominioCinco >= 4 && DominioCinco < 6){
  colorDominioCinco = <TableCell  width="20px"style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio5Alto= DominioCinco
}else if(DominioCinco >= 6){
  colorDominioCinco= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
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
  colorDominioSeis  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio6Nulo=DominioSeis
}else if(DominioSeis >= 3 && DominioSeis < 5){
  colorDominioSeis=<TableCell  width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio6Bajo= DominioSeis
}else if(DominioSeis >= 5 && DominioSeis < 8){
  colorDominioSeis=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
Dominio6Medio= DominioSeis
}else if(DominioSeis >= 8 && DominioSeis < 11){
  colorDominioSeis = <TableCell width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio6Alto= DominioSeis
}else if(DominioSeis >= 11){
  colorDominioSeis= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
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
  colorDominioSiete  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio7Nulo=DominioSiete
}else if(DominioSiete >= 5 && DominioSiete < 8){
  colorDominioSiete=<TableCell width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio7Bajo= DominioSiete
}else if(DominioSiete >= 8 && DominioSiete < 11){
  colorDominioSiete=<TableCell  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio7Medio= DominioSiete
}else if(DominioSiete >= 11 && DominioSiete < 14){
  colorDominioSiete = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio7Alto= DominioSiete
}else if(DominioSiete >= 14){
  colorDominioSiete= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
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
  colorDominioOcho  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio8Nulo=DominioOcho
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


ponderacion=<React.Fragment>

<MDBContainer style={{marginTop:20}}>
          <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
              Descargar Resultados
          </MDBBtn>
 </MDBContainer>
 <br/>
 
<MDBContainer >
<font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>&nbsp;&nbsp;
<br/>
<font face="arial " className = "mt-4 " ><strong>{localStorage.getItem("razonsocial")}</strong> </font><br/>
<img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100,marginBottom:20,marginTop:20}}/> 

<Table   responsive small borderless className="text-left mt-4 ">
<TableHead>
<TableRow>
  <TableCell  width="13%" style={{backgroundColor: "#E6E7E8"}}>Resultados Generales</TableCell>
    {celda}
  <TableCell width="6%"  > <strong>   TOTAL {general}  Puntos </strong></TableCell>
  <TableCell width="2%" ></TableCell>
  <TableCell width="1%"  ></TableCell>
 {criterios}
</TableRow>
</TableHead>
</Table>
 </MDBContainer>

<TableContainer component={Paper} style={{marginBottom:30,marginTop:20}}>
      <Table  size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
            <TableCell width="50%" ></TableCell>
            <TableCell align="center" style={{backgroundColor: "#9BE0F7"}}>Nulo</TableCell>
            <TableCell align="center" style={{backgroundColor: "#6BF56E"}}>Bajo&nbsp;</TableCell>
            <TableCell align="center" style={{backgroundColor: "#FFFF00"}}>Medio&nbsp;</TableCell>
            <TableCell align="center" style={{backgroundColor: "#FFC000"}}>Alto&nbsp;</TableCell>
            <TableCell align="center" style={{backgroundColor: "#FF0000"}}>Muy Alto&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  style={{marginTop:20}}>       
            <TableRow>
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados de la Categoría</strong></TableCell>              
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
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados del Dominio</strong></TableCell>              
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
    <div>
                <div className="example-config">
                  
                </div>

                <div style={{ position: "absolute", left: "-1000px", top: 0 }}>
                    <PDFExport
                        paperSize="letter"
                        margin="1cm"
                        pageNum
                        // pageTemplate={this.pdfExportComponent}
                        ref={(component) => this.pdfExportComponent = component}
                    >
                        <div style={{ width: "500px" }}>
                      
                            <MDBRow> 
                            <MDBCol>
                            <img src={logotipo} alt="logo" style = {{width:150,marginBottom:20}}/>
                            </MDBCol>  
                            <MDBCol>
                            {/* <img src={logotipo} alt="logo" style = {{width:100,marginBottom:30}}/> */}
                            </MDBCol>
                            </MDBRow> 
                            <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                            <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left mt-4 ">
                          
                                    <MDBTableBody>     
                            <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                            <font size="3"face="arial"color="black">Diagnóstico Global de factores de riesgo psicosocial  en los centros de trabajo</font><br></br>
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
                           
                              <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-center mt-4 ">
                              <MDBTableBody>
                              <font size="1"
                              face="arial"
                              color="black" style = {{marginTop:25,marginLeft:20}}>GUÍA DE REFERENCIA II -
                              CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO</font>   <br/>  
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
                                   <td width="20%"><font size="1" face="arial"color="black">{general}</font></td>
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
                                        <td width="60px"  className="text-left"><font size="1" face="arial"color="black">Condiciones en el ambiente de trabajo</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{DominioUno}</font></td>
                                         {colorDominioUno}                
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Carga de trabajo</font></td>
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
                                          {colorDominioCuatro}
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
                                        <td width="15px"><font size="1" face="arial"color="black">{(respuesta1/length).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta2/length).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta3/length).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta4/length)+(respuesta9/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta5/length)+(respuesta6/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >6</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Carga mental</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta7/length)+(respuesta8/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >7</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta41/length)+(respuesta42/length)+(respuesta43/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >8</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta10/length)+(respuesta11/length)).toFixed(2)}</font></td>
                                        </tr>


                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >9</font></td>
                                        <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{((respuesta12/length)+(respuesta13/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >10</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta20/length)+(respuesta21/length)+(respuesta22/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >11</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta18/length)+(respuesta19/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >12</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta26/length)+(respuesta27/length)).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >13</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta14/length)+(respuesta15/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >14</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta16/length).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >15</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta17/length).toFixed(2)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >16</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta23/length)+(respuesta24/length)+(respuesta25/length)).toFixed(2)}</font></td>
                                        </tr>

                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >17</font></td>
                                        <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{((respuesta28/length)+(respuesta29/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >18</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Relaciones sociales en el trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta30/length)+(respuesta31/length)+(respuesta32/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >19</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta44/length)+(respuesta45/length)+(respuesta46/length)).toFixed(2)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >20</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Violencia laboral</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{((respuesta33/length)+(respuesta34/length)+(respuesta35/length)+(respuesta36/length)+(respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)).toFixed(2)}</font></td>
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
      const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 500, height: 400,marginLeft: "17%"}
    const container2 = { width: 500, height: 300 }

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
              <MDBNavbarBrand>
                Resultados globales de la evaluación RP
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
              &nbsp;&nbsp;&nbsp;
              
                <strong>{localStorage.getItem("razonsocial")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {this.state.date}</strong> 
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
          <MDBContainer style={container} className="pt-5">
          <MDBRow>
              <MDBCol md="9">
              <MDBContainer style={container2} className="  pt-5" >
            <h5 >Ejemplo de Ponderación</h5>
            <Bar  data={this.state.dataBar} options={this.state.barChartOptions} />
            {/* <span>{this.state.dias} {this.state.horas} {this.state.minutos} {this.state.segundos}</span> */}
          <Alert color ="primary">Seleccione por favor el periodo como primer filtro </Alert>
          </MDBContainer>
          </MDBCol>  
          </MDBRow>
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
        <MDBContainer>{spinner}</MDBContainer>
         <div
        
        style={{
          marginLeft: "5%",
          position: "absolute"
        }}
      >
        <div style={{ height: "110%"}}>

          <Grow in={true}>
            <div style={{ margin: "30px 56px" }}>
            
           
              <MUIDataTable
                title={`Empledos  totales de ${localStorage.getItem("razonsocial")}`}
                data={data}
                columns={columns}
                options={options}
              />
              <MDBRow style={{marginTop:20}}>
              <MDBCol  sm="4"></MDBCol>  
              <MDBCol><MDBBtn onClick={e=>this.consultarDatosFiltrados(datosEmpleados,filtro)}  outline color="success">Ver Resultados Globales</MDBBtn></MDBCol> 
             </MDBRow>
              
               {ponderacion}   
            </div> 
          </Grow>  
        </div>
      </div>
     
      </div>

     
      </React.Fragment>
      
    )
  }
}

export default App