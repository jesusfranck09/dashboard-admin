import React from "react";
import MUIDataTable from "mui-datatables";
import Grow from "@material-ui/core/Grow";
import {MDBRow,MDBCol,MDBBtn,MDBTable, MDBTableBody, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
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
      datosLength:'',
      totalEmpleadosFiltrados:'',
      collapse: false,
      isOpen: false,
      showModal2: false,  
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
        labels: ["Siempre", "Casi Siempre", "Algunas Veces", "Casi nunca", "Nunca"],
        datasets: [
          {
            label: "% Resultados",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 134,159,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(255, 218, 128,0.4)",
              "rgba(113, 205, 205,0.4)",
              "rgba(170, 128, 252,0.4)",
              "rgba(255, 177, 101,0.4)"
            ],
            borderWidth: 2,
            borderColor: [
              "rgba(255, 134, 159, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(255, 218, 128, 1)",
              "rgba(113, 205, 205, 1)",
              "rgba(170, 128, 252, 1)",
              "rgba(255, 177, 101, 1)"
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
  this.props.history.push("/login")
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
              CP 
              EstadoCivil 
              correo 
              AreaTrabajo 
              Puesto 
              Ciudad 
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

  render() {
 

    const columns = ["ID","Nombre", "Sexo",  "Area", "Puesto","Centro de Trabajo","Periodo"];

    const data = this.state.empleados.map(rows=>{
      return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoP,rows.Sexo,rows.AreaTrabajo,rows.Puesto,rows.CentroTrabajo,rows.periodo])
    })

    let datosEmpleados;
    let filtro;
    const options = {
        filterType: "dropdown",
        responsive: "stacked", textLabels: {
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
  let general =total/length;

let celda;
let criterios;



if(general<50){
celda = <TableCell width="10%"  style={{backgroundColor: "#51EAFF"}} className="text-center"><font size="1" face="arial"color="black">Nulo o Despreciable</font></TableCell>
criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black">El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</font></TableCell>
}else if(general>=50 && general < 75){
  celda = <TableCell width="10%" style={{backgroundColor: "#45D09E"}}  className="text-center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black">Es necesario una mayor difusión de la política de prevención de riesgos
  psicosociales y programas para: la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral.</font></TableCell>
}else if(general>=75 && general < 99){
  celda = <TableCell width="10%"  style={{backgroundColor: "#FFD600"}}  className="text-center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black">Se requiere revisar la política de prevención de riesgos psicosociales y
  programas para la prevención de los factores de riesgo psicosocial, la
  promoción de un entorno organizacional favorable y la prevención de la
  violencia laboral, así como reforzar su aplicación y difusión, mediante un
  Programa de intervención.</font></TableCell>
}else if(general>=99 && general < 140){
 celda = <TableCell  width="10%" style={{backgroundColor: "#FF905A"}} className="text-center" ><font size="1" face="arial"color="black">Alto</font></TableCell>
 criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black">Se requiere realizar un análisis de cada categoría y dominio, de manera que
 se puedan determinar las acciones de intervención apropiadas a través de un
 Programa de intervención, que podrá incluir una evaluación específica y
 deberá incluir una campaña de sensibilización, revisar la política de
 prevención de riesgos psicosociales y programas para la prevención de los
 factores de riesgo psicosocial, la promoción de un entorno organizacional
 favorable y la prevención de la violencia laboral, así como reforzar su
 aplicación y difusión.</font></TableCell>
}
else if( general > 140){
  celda  = <TableCell width="10%"  style={{backgroundColor: "#E20338"}} className="text-center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
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

let categoriaUno = (respuesta1+respuesta3+respuesta2+respuesta4+respuesta5)/length;
if(categoriaUno < 5){
  colorCategoriaUno  = <TableCell style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria1Nulo= <MDBBadge color="info">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 5 && categoriaUno < 9){
  colorCategoriaUno =<TableCell style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria1Bajo= <MDBBadge color="success">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 9 && categoriaUno < 11){
  colorCategoriaUno=<TableCell style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria1Medio= <MDBBadge color="warning">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 11 && categoriaUno < 14){
  colorCategoriaUno = <TableCell style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria1Alto= <MDBBadge color="warning">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 14){
  colorCategoriaUno = <TableCell style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria1MuyAlto= <MDBBadge color="danger">{categoriaUno}</MDBBadge>
}
let categoria2Nulo;
let categoria2Bajo;
let categoria2Medio;
let categoria2Alto;
let categoria2MuyAlto;
let colorCategoriaDos;
let categoriaDos = (respuesta6+respuesta12+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta65+respuesta66+respuesta67+respuesta68+respuesta13+respuesta14+respuesta15+respuesta16+respuesta25+respuesta26+respuesta27+respuesta28+respuesta23+respuesta24+respuesta29+respuesta30+respuesta35+respuesta36)/length;
if(categoriaDos < 15){
  colorCategoriaDos  = <TableCell style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria2Nulo= <MDBBadge color="info">{categoriaDos}</MDBBadge>
}else if(categoriaDos >= 15 && categoriaDos < 30){
  colorCategoriaDos =<TableCell style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria2Bajo= <MDBBadge color="success">{categoriaDos}</MDBBadge>
}else if(categoriaDos >=30 && categoriaDos < 45){
  colorCategoriaDos=<TableCell style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria2Medio= <MDBBadge color="warning">{categoriaDos}</MDBBadge>
}else if(categoriaDos >=45 && categoriaDos < 60){
  colorCategoriaDos = <TableCell style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria2Alto= <MDBBadge color="warning">{categoriaDos}</MDBBadge>
}else if(categoriaDos >= 60){
  colorCategoriaDos = <TableCell style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria2MuyAlto= <MDBBadge color="danger">{categoriaDos}</MDBBadge>
}
let categoria3Nulo;
let categoria3Bajo;
let categoria3Medio;
let categoria3Alto;
let categoria3MuyAlto;
let colorCategoriaTre;
let categoriaTre = (respuesta17+respuesta18+respuesta19+respuesta20+respuesta21+respuesta22)/length;
if(categoriaTre < 5){
  colorCategoriaTre  = <TableCell style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria3Nulo= <MDBBadge color="info">{categoriaTre}</MDBBadge>
}else if(categoriaTre >= 5 && categoriaTre < 7){
  colorCategoriaTre =<TableCell style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria3Bajo= <MDBBadge color="success">{categoriaTre}</MDBBadge>
}else if(categoriaTre >=7 && categoriaTre < 10){
  colorCategoriaTre=<TableCell style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria3Medio= <MDBBadge color="warning">{categoriaTre}</MDBBadge>
}else if(categoriaTre >=10 && categoriaTre < 13){
  colorCategoriaTre = <TableCell style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria3Alto= <MDBBadge color="warning">{categoriaTre}</MDBBadge>
}else if(categoriaTre >= 13){
  colorCategoriaTre = <TableCell style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria3MuyAlto= <MDBBadge color="danger">{categoriaTre}</MDBBadge>
}

let categoria4Nulo;
let categoria4Bajo;
let categoria4Medio;
let categoria4Alto;
let categoria4MuyAlto;
let colorCategoriaCuatro;

let categoriaCuatro = (respuesta31+respuesta32+respuesta33+respuesta34+respuesta37+respuesta38+respuesta39+respuesta40+respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta69+respuesta70+respuesta71+respuesta72+respuesta57+respuesta58+respuesta59+respuesta60+respuesta61+respuesta62+respuesta63+respuesta64)/length;
if(categoriaCuatro < 14){
  colorCategoriaCuatro  = <TableCell style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria4Nulo= <MDBBadge color="info">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
  colorCategoriaCuatro =<TableCell style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria4Bajo= <MDBBadge color="success">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >=29 && categoriaCuatro < 42){
  colorCategoriaCuatro=<TableCell style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria4Medio= <MDBBadge color="warning">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >=42 && categoriaCuatro < 58){
  colorCategoriaCuatro = <TableCell style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria4Alto= <MDBBadge color="warning">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >= 58){
  colorCategoriaCuatro= <TableCell style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria4MuyAlto= <MDBBadge color="danger">{categoriaCuatro}</MDBBadge>
}

let categoria5Nulo;
let categoria5Bajo;
let categoria5Medio;
let categoria5Alto;
let categoria5MuyAlto;
let colorCategoriaCinco;
let categoriaCinco = (respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52+respuesta55+respuesta56+respuesta53+respuesta54)/length;
if(categoriaCinco < 10){
  colorCategoriaCinco  = <TableCell style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria5Nulo= <MDBBadge color="info">{categoriaCinco}</MDBBadge>
}else if(categoriaCinco >= 10 && categoriaCinco < 14){
  colorCategoriaCinco=<TableCell style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria5Bajo= <MDBBadge color="success">{categoriaCinco}</MDBBadge>
}else if(categoriaCinco >=14 && categoriaCinco < 18){
  colorCategoriaCinco=<TableCell style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria5Medio= <MDBBadge color="warning">{categoriaCinco}</MDBBadge>
}else if(categoriaCinco >=18 && categoriaCinco < 23){
  colorCategoriaCinco = <TableCell style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria5Alto= <MDBBadge color="warning">{categoriaCinco}</MDBBadge>
}else if(categoriaCinco >= 23){
  colorCategoriaCinco= <TableCell style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria5MuyAlto= <MDBBadge color="danger">{categoriaCinco}</MDBBadge>
}

let Dominio1Nulo;
let Dominio1Bajo;
let Dominio1Medio;
let Dominio1Alto;
let Dominio1MuyAlto;
let colorDominioUno;
let DominioUno = (respuesta1+respuesta3+respuesta2+respuesta4+respuesta5)/length;
if(DominioUno < 5){
  colorDominioUno  = <TableCell style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio1Nulo= <MDBBadge color="info">{DominioUno}</MDBBadge>
}else if(DominioUno >= 5 && DominioUno < 9){
  colorDominioUno=<TableCell style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio1Bajo= <MDBBadge color="success">{DominioUno}</MDBBadge>
}else if(DominioUno >= 9 && DominioUno < 11){
  colorDominioUno=<TableCell style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio1Medio= <MDBBadge color="warning">{DominioUno}</MDBBadge>
}else if(DominioUno >=11 && DominioUno < 14){
  colorDominioUno = <TableCell style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio1Alto= <MDBBadge color="warning">{DominioUno}</MDBBadge>
}else if(DominioUno >= 14){
  colorDominioUno= <TableCell style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio1MuyAlto= <MDBBadge color="danger">{DominioUno}</MDBBadge>
}

let Dominio2Nulo;
let Dominio2Bajo;
let Dominio2Medio;
let Dominio2Alto;
let Dominio2MuyAlto;
let colorDominioDos;
let DominioDos = (respuesta6+respuesta12+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta65+respuesta66+respuesta67+respuesta68+respuesta13+respuesta14+respuesta15+respuesta16)/length;
if(DominioDos < 15){
  colorDominioDos  = <TableCell style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio2Nulo= <MDBBadge color="info">{DominioDos}</MDBBadge>
}else if(DominioDos >= 15 && DominioDos < 21){
  colorDominioDos=<TableCell style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio2Bajo= <MDBBadge color="success">{DominioDos}</MDBBadge>
}else if(DominioDos >= 21 && DominioDos < 27){
  colorDominioDos=<TableCell style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio2Medio= <MDBBadge color="warning">{DominioDos}</MDBBadge>
}else if(DominioDos >= 27 && DominioDos < 37){
  colorDominioDos = <TableCell style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio2Alto= <MDBBadge color="warning">{DominioDos}</MDBBadge>
}else if(DominioDos >= 37){
  colorDominioDos= <TableCell style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio2MuyAlto= <MDBBadge color="danger">{DominioDos}</MDBBadge>
}

let Dominio3Nulo;
let Dominio3Bajo;
let Dominio3Medio;
let Dominio3Alto;
let Dominio3MuyAlto;
let colorDominioTres;
let DominioTres = (respuesta25+respuesta26+respuesta27+respuesta28+respuesta23+respuesta24+respuesta29+respuesta30+respuesta35+respuesta36)/length;
if(DominioTres < 11){
  colorDominioTres  = <TableCell style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio3Nulo= <MDBBadge color="info">{DominioTres}</MDBBadge>
}else if(DominioTres >= 11 && DominioTres < 16){
  colorDominioTres=<TableCell style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio3Bajo= <MDBBadge color="success">{DominioTres}</MDBBadge>
}else if(DominioTres >= 16 && DominioTres < 21){
  colorDominioTres=<TableCell style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio3Medio= <MDBBadge color="warning">{DominioTres}</MDBBadge>
}else if(DominioTres >= 21 && DominioTres < 25){
  colorDominioTres = <TableCell style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio3Alto= <MDBBadge color="warning">{DominioTres}</MDBBadge>
}else if(DominioTres >= 25){
  colorDominioTres= <TableCell style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio3MuyAlto= <MDBBadge color="danger">{DominioTres}</MDBBadge>
}

let Dominio4Nulo;
let Dominio4Bajo;
let Dominio4Medio;
let Dominio4Alto;
let Dominio4MuyAlto;
let colorDominioCuatro;
let DominioCuatro = (respuesta17+respuesta18)/length;
if(DominioCuatro < 1){
  colorDominioCuatro  = <TableCell style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio4Nulo= <MDBBadge color="info">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 1 && DominioCuatro < 2){
  colorDominioCuatro=<TableCell style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio4Bajo= <MDBBadge color="success">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 2 && DominioCuatro < 4){
  colorDominioCuatro = <TableCell style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio4Medio= <MDBBadge color="warning">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 4 && DominioCuatro < 6){
  colorDominioCuatro = <TableCell style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio4Alto= <MDBBadge color="warning">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 6){
  colorDominioCuatro= <TableCell style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio4MuyAlto= <MDBBadge color="danger">{DominioCuatro}</MDBBadge>
}

let Dominio5Nulo;
let Dominio5Bajo;
let Dominio5Medio;
let Dominio5Alto;
let Dominio5MuyAlto;
let colorDominioCinco;
let DominioCinco = (respuesta19+respuesta20+respuesta21+respuesta22)/length;
if(DominioCinco < 4){
  colorDominioCinco  = <TableCell width="15px" style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio5Nulo= <MDBBadge color="info">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 4 && DominioCinco < 6){
  colorDominioCinco=<TableCell width="15px" style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio5Bajo= <MDBBadge color="success">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 6 && DominioCinco < 8){
  colorDominioCinco=<TableCell width="15px" style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio5Medio= <MDBBadge color="warning">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 8 && DominioCinco < 10){
  colorDominioCinco = <TableCell  width="15px"style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio5Alto= <MDBBadge color="warning">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 10){
  colorDominioCinco= <TableCell  width="15px" style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio5MuyAlto= <MDBBadge color="danger">{DominioCinco}</MDBBadge>
}

let Dominio6Nulo;
let Dominio6Bajo;
let Dominio6Medio;
let Dominio6Alto;
let Dominio6MuyAlto;
let colorDominioSeis;
let DominioSeis = (respuesta31+respuesta32+respuesta33+respuesta34+respuesta37+respuesta38+respuesta39+respuesta40+respuesta41)/length;
if(DominioSeis < 9){
  colorDominioSeis  = <TableCell width="20px" style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio6Nulo= <MDBBadge color="info">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 9 && DominioSeis < 12){
  colorDominioSeis=<TableCell  width="20px" style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio6Bajo= <MDBBadge color="success">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 12 && DominioSeis < 16){
  colorDominioSeis=<TableCell width="20px"  style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio6Medio= <MDBBadge color="warning">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 16 && DominioSeis < 20){
  colorDominioSeis = <TableCell width="20px" style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio6Alto= <MDBBadge color="warning">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 20){
  colorDominioSeis= <TableCell  width="20px" style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio6MuyAlto= <MDBBadge color="danger">{DominioSeis}</MDBBadge>
}

let Dominio7Nulo;
let Dominio7Bajo;
let Dominio7Medio;
let Dominio7Alto;
let Dominio7MuyAlto;
let colorDominioSiete;
let DominioSiete = (respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta69+respuesta70+respuesta71+respuesta72)/length;
if(DominioSiete < 10){
  colorDominioSiete  = <TableCell width="20px" style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio7Nulo= <MDBBadge color="info">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 10 && DominioSiete < 13){
  colorDominioSiete=<TableCell width="20px" style={{backgroundColor: "#45D09E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio7Bajo= <MDBBadge color="success">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 13 && DominioSiete < 17){
  colorDominioSiete=<TableCell  width="20px" style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio7Medio= <MDBBadge color="warning">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 17 && DominioSiete < 21){
  colorDominioSiete = <TableCell width="20px"  style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio7Alto= <MDBBadge color="warning">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 21){
  colorDominioSiete= <TableCell  width="20px" style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio7MuyAlto= <MDBBadge color="danger">{DominioSiete}</MDBBadge>
}

let Dominio8Nulo;
let Dominio8Bajo;
let Dominio8Medio;
let Dominio8Alto;
let Dominio8MuyAlto;
let colorDominioOcho;
let DominioOcho = (respuesta57+respuesta58+respuesta59+respuesta60+respuesta61+respuesta62+respuesta63+respuesta64)/length;
if(DominioOcho < 7){
  colorDominioOcho  = <TableCell width="20px" style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio8Nulo= <MDBBadge color="info">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 7 && DominioOcho < 10){
  colorDominioOcho  = <TableCell width="20px"  style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio8Bajo= <MDBBadge color="success">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 10 && DominioOcho < 13){
  colorDominioOcho=<TableCell width="20px"  style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio8Medio= <MDBBadge color="warning">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 13 && DominioOcho < 16){
  colorDominioOcho = <TableCell width="20px"  style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio8Alto= <MDBBadge color="warning">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 16){
  colorDominioOcho= <TableCell width="20px"  style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio8MuyAlto= <MDBBadge color="danger">{DominioOcho}</MDBBadge>
}

let Dominio9Nulo;
let Dominio9Bajo;
let Dominio9Medio;
let Dominio9Alto;
let Dominio9MuyAlto;
let colorDominioNueve;
let DominioNueve = (respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52)/length;
if(DominioNueve < 6){
  colorDominioNueve  = <TableCell width="20px"  style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio9Nulo= <MDBBadge color="info">{DominioNueve}</MDBBadge>
}else if(DominioNueve >= 6 && DominioNueve < 10){
  colorDominioNueve  = <TableCell width="20px"  style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio9Bajo= <MDBBadge color="success">{DominioNueve}</MDBBadge>
}else if(DominioNueve >= 10 && DominioNueve < 14){
  colorDominioNueve=<TableCell  width="20px" style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio9Medio= <MDBBadge color="warning">{DominioNueve}</MDBBadge>
}else if(DominioNueve >= 14 && DominioNueve < 18){
  colorDominioNueve = <TableCell  width="20px" style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio9Alto= <MDBBadge color="warning">{DominioNueve}</MDBBadge>
}else if(DominioNueve >= 18){
  colorDominioNueve= <TableCell  width="20px" style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio9MuyAlto= <MDBBadge color="danger">{DominioNueve}</MDBBadge>
}

let Dominio10Nulo;
let Dominio10Bajo;
let Dominio10Medio;
let Dominio10Alto;
let Dominio10MuyAlto;
let colorDominioDiez;
let DominioDiez = (respuesta55+respuesta56+respuesta53+respuesta54)/length;
if(DominioDiez < 4){
  colorDominioDiez  = <TableCell width="20px"  style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio10Nulo= <MDBBadge color="info">{DominioDiez}</MDBBadge>
}else if(DominioDiez >= 4 && DominioDiez < 6){
  colorDominioDiez  = <TableCell width="20px"  style={{backgroundColor: "#51EAFF"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio10Bajo= <MDBBadge color="success">{DominioDiez}</MDBBadge>
}else if(DominioDiez >= 6 && DominioDiez < 8){
  colorDominioDiez=<TableCell width="20px"  style={{backgroundColor: "#FFD600"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio10Medio= <MDBBadge color="warning">{DominioDiez}</MDBBadge>
}else if(DominioDiez >= 8 && DominioDiez < 10){
  colorDominioDiez = <TableCell width="20px"  style={{backgroundColor: "#FF905A"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio10Alto= <MDBBadge color="warning">{DominioDiez}</MDBBadge>
}else if(DominioDiez >= 10){
  colorDominioDiez= <TableCell  width="20px"style={{backgroundColor: "#E20338"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio10MuyAlto= <MDBBadge color="danger">{DominioDiez}</MDBBadge>
}


ponderacion=<React.Fragment>

<MDBContainer style={{marginTop:20}}>
          <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
              Descargar Resultados
          </MDBBtn>
 </MDBContainer>
 <br/>

<MDBContainer >
<font face="arial" className = "mt-4" ><strong> ENCUESTA EEO. </strong><br/><strong>FILTRADO POR: <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;  {this.state.filtro2} &nbsp;&nbsp; {this.state.filtro3} &nbsp;&nbsp;{this.state.filtro4} &nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp; {this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></strong></font><br/>
<font face="arial " className = "mt-4 " ><strong>{localStorage.getItem("razonsocial")}</strong> </font>

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
            <TableCell align="right" style={{backgroundColor: "#51EAFF"}}>Nulo</TableCell>
            <TableCell align="right" style={{backgroundColor: "#76FEC5"}}>Bajo&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#F4EDB2"}}>Medio&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#F5E027"}}>Alto&nbsp;</TableCell>
            <TableCell align="right" style={{backgroundColor: "#FF756B"}}>Muy Alto&nbsp;</TableCell>
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
                <TableCell component="th" scope="row" >I. Ambiente de Trabajo</TableCell>
                <TableCell component="th" scope="row" >{categoria1Nulo}</TableCell>
                <TableCell component="th" scope="row" >{categoria1Bajo}</TableCell>
                <TableCell component="th" scope="row" >{categoria1Medio}</TableCell>
                <TableCell component="th" scope="row" >{categoria1Alto}</TableCell>
                <TableCell component="th" scope="row" >{categoria1MuyAlto}</TableCell>           
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >II. Factores propios de la actividad</TableCell>   
                <TableCell component="th" scope="row" >{categoria2Nulo}</TableCell>
                <TableCell component="th" scope="row" >{categoria2Bajo}</TableCell>
                <TableCell component="th" scope="row" >{categoria2Medio}</TableCell>
                <TableCell component="th" scope="row" >{categoria2Alto}</TableCell>
                <TableCell component="th" scope="row" >{categoria2MuyAlto}</TableCell>    
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >III. Organización del tiempo de trabajo</TableCell>   
                <TableCell component="th" scope="row" >{categoria3Nulo}</TableCell>
                <TableCell component="th" scope="row" >{categoria3Bajo}</TableCell>
                <TableCell component="th" scope="row" >{categoria3Medio}</TableCell>
                <TableCell component="th" scope="row" >{categoria3Alto}</TableCell>
                <TableCell component="th" scope="row" >{categoria3MuyAlto}</TableCell>    
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >IV. Liderazgo y relaciones en el trabajo</TableCell>   
                <TableCell component="th" scope="row" >{categoria4Nulo}</TableCell>
                <TableCell component="th" scope="row" >{categoria4Bajo}</TableCell>
                <TableCell component="th" scope="row" >{categoria4Medio}</TableCell>
                <TableCell component="th" scope="row" >{categoria4Alto}</TableCell>
                <TableCell component="th" scope="row" >{categoria4MuyAlto}</TableCell>           
                </TableRow>

                <TableRow>
                <TableCell component="th" scope="row" >V. Entorno organizacional</TableCell>   
                <TableCell component="th" scope="row" >{categoria5Nulo}</TableCell>
                <TableCell component="th" scope="row" >{categoria5Bajo}</TableCell>
                <TableCell component="th" scope="row" >{categoria5Medio}</TableCell>
                <TableCell component="th" scope="row" >{categoria5Alto}</TableCell>
                <TableCell component="th" scope="row" >{categoria5MuyAlto}</TableCell>           
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
                <TableCell component="th" scope="row" >{Dominio1Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio1Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio1Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio1Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio1MuyAlto}</TableCell>
    
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >II. Carga de trabajo</TableCell>    
                <TableCell component="th" scope="row" >{Dominio2Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio2Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio2Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio2Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio2MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >III. Falta de control sobre el trabajo</TableCell>     
                <TableCell component="th" scope="row" >{Dominio3Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio3Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio3Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio3Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio3MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >IV. Jornada de trabajo</TableCell>  
                <TableCell component="th" scope="row" >{Dominio4Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio4Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio4Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio4Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio4MuyAlto}</TableCell>         
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >V. Interferencia en la relación trabajo-familia</TableCell>           
                <TableCell component="th" scope="row" >{Dominio5Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio5Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio5Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio5Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio5MuyAlto}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >VI. Liderazgo</TableCell>    
                <TableCell component="th" scope="row" >{Dominio6Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio6Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio6Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio6Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio6MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >VII. Relaciones en el trabajo</TableCell>    
                <TableCell component="th" scope="row" >{Dominio7Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio7Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio7Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio7Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio7MuyAlto}</TableCell>       
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
                <TableCell component="th" scope="row" >IX. Reconocimiento del desempeño</TableCell>    
                <TableCell component="th" scope="row" >{Dominio9Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio9Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio9Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio9Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio9MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >XX. Insuficiente sentido de pertenencia e, inestabilidad</TableCell>    
                <TableCell component="th" scope="row" >{Dominio10Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio10Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio10Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio10Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio10MuyAlto}</TableCell>        
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
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta1/length)+(respuesta3/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >2.- Condiciones deficientes e insalubres</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta2/length)+(respuesta4/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow> 
           
            <TableRow>
            <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{respuesta5/length}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%">4.- Cargas cuantitativas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta6/length)+(respuesta12/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%">5.- Ritmos de trabajo acelerado</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta7/length)+(respuesta8/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta9/length)+(respuesta10/length)+(respuesta11/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta65/length)+(respuesta66/length)+(respuesta67/length)+(respuesta68/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >8.- Cargas de alta responsabilidad</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta13/length)+(respuesta14/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >9.- Cargas contradictorias o inconsistentes</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta15/length)+(respuesta16/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta25/length)+(respuesta26/length)+(respuesta27/length)+(respuesta28/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta23/length)+(respuesta24/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>

            <TableRow>
            <TableCell component="th" scope="row" >12.- Insuficiente participación y manejo del cambio</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta29/length)+(respuesta30/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>



            <TableRow>
            <TableCell component="th" scope="row" >13.- Limitada o inexistente capacitación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta35/length)+(respuesta36/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >14.- Jornadas de trabajo extensas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta17/length)+(respuesta18/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >15.- Influencia del trabajo fuera del centro laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta19/length)+(respuesta20/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >16.- Influencia de las responsabilidades familiares</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta21/length)+(respuesta22/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >17.- Escasa claridad de funciones</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta31/length)+(respuesta32/length)+(respuesta33/length)+(respuesta34/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >18.- Características del liderazgo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)+(respuesta41/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >19.- Relaciones sociales en el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta42/length)+(respuesta43/length)+(respuesta44/length)+(respuesta45/length)+(respuesta46/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >20.- Deficiente relación con los colaboradores que supervisa</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta69/length)+(respuesta70/length)+(respuesta71/length)+(respuesta72/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >21.- Violencia laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta57/length)+(respuesta58/length)+(respuesta59/length)+(respuesta60/length)+(respuesta61/length)+(respuesta62/length)+(respuesta63/length)+(respuesta64/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >22.- Escasa o nula retroalimentación del desempeño</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta47/length)+(respuesta48/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>

            <TableRow>
            <TableCell component="th" scope="row" >23.- Escaso o nulo reconocimiento y compensación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta49/length)+(respuesta50/length)+(respuesta51/length)+(respuesta52/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >24.- Limitado sentido de pertenencia</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta55/length)+(respuesta56/length)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >25.- Inestabilidad laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(respuesta53/length)+(respuesta54/length)}</MDBBadge ></TableCell>
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
                                   <td width="40%"><font size="1" face="arial"color="black">RESULTADO DEL NÚMERO DE ENCUESTAS :  </font></td>
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
                                      
                                       
                                      </MDBTableBody>
                                      </MDBTable>
                                      <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
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
                                        <td width="15px"><font size="1" face="arial"color="black">{(respuesta1/length)+(respuesta3/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta2/length)+(respuesta4/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{respuesta5/length}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta6/length)+(respuesta12/length)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta7/length)+(respuesta8/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >6</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Carga mental</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta9/length)+(respuesta10/length)+(respuesta11/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >7</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta65/length)+(respuesta66/length)+(respuesta67/length)+(respuesta68/length)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >8</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta13/length)+(respuesta14/length)}</font></td>
                                        </tr>


                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >9</font></td>
                                        <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{(respuesta15/length)+(respuesta16/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >10</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta25/length)+(respuesta26/length)+(respuesta27/length)+(respuesta28/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >11</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta23/length)+(respuesta24/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >12</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Insuficiente participación y manejo del cambio</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta29/length)+(respuesta30/length)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >13</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta35/length)+(respuesta36/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >14</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta17/length)+(respuesta18/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >15</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta19/length)+(respuesta20/length)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >16</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta21/length)+(respuesta22/length)}</font></td>
                                        </tr>

                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >17</font></td>
                                        <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{(respuesta31/length)+(respuesta32/length)+(respuesta33/length)+(respuesta34/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >18</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)+(respuesta41/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >19</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black"></font>Relaciones sociales en el trabajo</td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta42/length)+(respuesta43/length)+(respuesta44/length)+(respuesta45/length)+(respuesta46/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >20</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta69/length)+(respuesta70/length)+(respuesta71/length)+(respuesta72/length)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >21</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Violencia laboral</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta57/length)+(respuesta58/length)+(respuesta59/length)+(respuesta60/length)+(respuesta61/length)+(respuesta62/length)+(respuesta63/length)+(respuesta64/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >22</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Escasa o nula retroalimentación del desempeño</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta47/length)+(respuesta48/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >23</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Escaso o nulo reconocimiento y compensación</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta49/length)+(respuesta50/length)+(respuesta51/length)+(respuesta52/length)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >24</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitado sentido de pertenencia</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta55/length)+(respuesta56/length)}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >25</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(respuesta53/length)+(respuesta54/length)}</font></td>
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
                Resultados Globales de la Evaluación Entorno Organizacional
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
              &nbsp;&nbsp;&nbsp;
              
                <strong>{localStorage.getItem("razonsocial")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {this.state.date}</strong> 
                <MDBNavbarNav right>
                              
           
                <MDBNavbarBrand>
                <AppNavbarBrand
                  full={{ src: logotipo, width: 80, height:25 , alt: 'ADS' }} /> 
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
        <MDBContainer></MDBContainer>
         <div
        
        style={{
          marginLeft: "10%",
          position: "absolute"
        }}
      >
        <div style={{ height: "110%"}}>
          <Grow in={true}>
            <div style={{ margin: "30px 56px" }}>
            
           
              <MUIDataTable
                title={"Total de Empleados Alfa Diseño de Sistemas"}
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


// const state.empleados = []

// fori
//  const aux = state.empleados
//  Hacer peticion
//  const aux2 = aux.push(loQueMeMandan)
// setState(aux2)




// const nuevoEstado = state.empleados.map(async () => {
//     const empleado = await consulta();
//     return empleado;
// })

// setState(nuevoEstado)