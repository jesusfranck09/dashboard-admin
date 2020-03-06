import React from "react";
import MUIDataTable from "mui-datatables";
import Grow from "@material-ui/core/Grow";
import {MDBRow,MDBCol,MDBBtn, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
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
      datosLength:'',
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
    const url = 'http://localhost:8000/graphql'
    
    axios({
      url:  url,
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
            url:  url,
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
      let array=[];
      let periodo;
      let totalEmpleados=[];
      datos.map(rows=>{
        periodo= rows.data[6]
        array.push(rows.data[0])
      })
      for(var i=0; i<=array.length;i++){
       
        const url = 'http://localhost:8000/graphql'
       await  axios({
          url:  url,
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
              totalEmpleados.push(datos.data.data.getresultGlobalSurveyRP)
              console.log("totalEMpleados" , totalEmpleados)
              this.setState({peticion1:totalEmpleados})
              })
              .catch(err => {
              });  
           }
          
           let array3 = []
           let array4=array3.push(array3)
           console.log("el estado " , this.state.peticion1)

      if(filtro!= undefined){
      if(filtro[0].length>0){
        this.setState({filtro1:"ID"})
        this.setState({filtro6:""})
      }else{
        this.setState({filtro1:""})
        this.setState({filtro6:""})
      }
      if(filtro[1].length>0){
        this.setState({filtro2:"NOMBRE"})
        this.setState({filtro6:""})
      }else{
        this.setState({filtro2:""})
        this.setState({filtro6:""})
      }
      if(filtro[2].length>0){
        this.setState({filtro3:"SEXO"})
        this.setState({filtro6:""})
      }else{
        this.setState({filtro3:""})
        this.setState({filtro6:""})
      }
      if(filtro[3].length>0){
        this.setState({filtro4:"ÁREA DE TRABAJO"})
        this.setState({filtro6:""})
      }else{
        this.setState({filtro4:""})
        this.setState({filtro6:""})
      }if(filtro[4].length>0){
        this.setState({filtro5:"PUESTO"})
        this.setState({filtro6:""})
      }else{
        this.setState({filtro5:""})
        this.setState({filtro6:""})
      }if(filtro[5].length>0){
        this.setState({filtro7:"CENTRO DE TRABAJO"})
        this.setState({filtro6:""})
      }else{
        this.setState({filtro7:""})
        this.setState({filtro6:""})
      }if(filtro[6].length>0){
        this.setState({filtro8:"PERIODO"})
        this.setState({filtro6:""})
      }else{
        this.setState({filtro8:""})
        this.setState({filtro6:""})
      }
    }
      this.setState({filtro:filtro})
      this.setState({datosLength:datos.length})
      console.log("datos enviados",datos[0].data[6])
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
                let general =total/length;
let celda;
let criterios;

if(general<20){
celda = <TableCell width="10%"  style={{backgroundColor: "#51EAFF"}}>Nulo o Despreciable</TableCell>
criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
}else if(general>=20 && general < 45){
  celda = <TableCell width="10%" style={{backgroundColor: "#45D09E"}} >Bajo</TableCell>
  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}>Es necesario una mayor difusión de la política de prevención de riesgos
  psicosociales y programas para: la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral.</TableCell>
}else if(general>=45 && general < 70){
  celda = <TableCell width="10%"  style={{backgroundColor: "#FFD600"}} >Medio</TableCell>
  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} >Se requiere revisar la política de prevención de riesgos psicosociales y
  programas para la prevención de los factores de riesgo psicosocial, la
  promoción de un entorno organizacional favorable y la prevención de la
  violencia laboral, así como reforzar su aplicación y difusión, mediante un
  Programa de intervención.</TableCell>
}else if(general>=70 && general < 90){
 celda = <TableCell  width="10%" style={{backgroundColor: "#FF905A"}} >Alto</TableCell>
 criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} >Se requiere realizar un análisis de cada categoría y dominio, de manera que
 se puedan determinar las acciones de intervención apropiadas a través de un
 Programa de intervención, que podrá incluir una evaluación específica y
 deberá incluir una campaña de sensibilización, revisar la política de
 prevención de riesgos psicosociales y programas para la prevención de los
 factores de riesgo psicosocial, la promoción de un entorno organizacional
 favorable y la prevención de la violencia laboral, así como reforzar su
 aplicación y difusión.</TableCell>
}
else if( general > 90){
  celda  = <TableCell width="10%"  style={{backgroundColor: "#E20338"}}>Muy Alto</TableCell>
  criterios = <TableCell style={{backgroundColor: "#F0F8FF"}} >Se requiere realizar el análisis de cada categoría y dominio para establecer
  las acciones de intervención apropiadas, mediante un Programa de
  intervención que deberá incluir evaluaciones específicas, y contemplar
  campañas de sensibilización, revisar la política de prevención de riesgos
  psicosociales y programas para la prevención de los factores de riesgo
  psicosocial, la promoción de un entorno organizacional favorable y la
  prevención de la violencia laboral, así como reforzar su aplicación y difusión.</TableCell>
}


let categoria1Nulo;
let categoria1Bajo;
let categoria1Medio;
let categoria1Alto;
let categoria1MuyAlto;

let categoriaUno = (respuesta2+respuesta1+respuesta3)/length;
if(categoriaUno < 3){
  categoria1Nulo= <MDBBadge color="info">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 3 && categoriaUno < 5){
  categoria1Bajo= <MDBBadge color="success">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 5 && categoriaUno < 7){
  categoria1Medio= <MDBBadge color="warning">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 7 && categoriaUno < 9){
  categoria1Alto= <MDBBadge color="warning">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 9){
  categoria1MuyAlto= <MDBBadge color="danger">{categoriaUno}</MDBBadge>
}
let categoria2Nulo;
let categoria2Bajo;
let categoria2Medio;
let categoria2Alto;
let categoria2MuyAlto;


let categoriaDos = (respuesta4+respuesta9+respuesta5+respuesta6+respuesta7+respuesta8+respuesta41+respuesta42+respuesta43+respuesta10+respuesta11+respuesta12+respuesta13+respuesta20+respuesta21+respuesta22+respuesta18+respuesta19+respuesta26+respuesta27)/length;
if(categoriaDos < 10){
  categoria2Nulo= <MDBBadge color="info">{categoriaDos}</MDBBadge>
}else if(categoriaDos >= 10 && categoriaDos < 20){
  categoria2Bajo= <MDBBadge color="success">{categoriaDos}</MDBBadge>
}else if(categoriaDos >=20 && categoriaDos < 30){
  categoria2Medio= <MDBBadge color="warning">{categoriaDos}</MDBBadge>
}else if(categoriaDos >=30 && categoriaDos < 40){
  categoria2Alto= <MDBBadge color="warning">{categoriaDos}</MDBBadge>
}else if(categoriaDos >= 40){
  categoria2MuyAlto= <MDBBadge color="danger">{categoriaDos}</MDBBadge>
}
let categoria3Nulo;
let categoria3Bajo;
let categoria3Medio;
let categoria3Alto;
let categoria3MuyAlto;

let categoriaTre = (respuesta14+respuesta15+respuesta16+respuesta17)/length;
if(categoriaTre < 4){
  categoria3Nulo= <MDBBadge color="info">{categoriaTre}</MDBBadge>
}else if(categoriaTre >= 4 && categoriaTre < 6){
  categoria3Bajo= <MDBBadge color="success">{categoriaTre}</MDBBadge>
}else if(categoriaTre >=6 && categoriaTre < 9){
  categoria3Medio= <MDBBadge color="warning">{categoriaTre}</MDBBadge>
}else if(categoriaTre >=9 && categoriaTre < 12){
  categoria3Alto= <MDBBadge color="warning">{categoriaTre}</MDBBadge>
}else if(categoriaTre >= 12){
  categoria3MuyAlto= <MDBBadge color="danger">{categoriaTre}</MDBBadge>
}

let categoria4Nulo;
let categoria4Bajo;
let categoria4Medio;
let categoria4Alto;
let categoria4MuyAlto;

let categoriaCuatro = (respuesta23+respuesta24+respuesta25+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40+respuesta44+respuesta45+respuesta46)/length;
if(categoriaCuatro < 10){
  categoria4Nulo= <MDBBadge color="info">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >= 10 && categoriaCuatro < 18){
  categoria4Bajo= <MDBBadge color="success">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >=18 && categoriaCuatro < 28){
  categoria4Medio= <MDBBadge color="warning">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >=28 && categoriaCuatro < 38){
  categoria4Alto= <MDBBadge color="warning">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >= 38){
  categoria4MuyAlto= <MDBBadge color="danger">{categoriaCuatro}</MDBBadge>
}

let Dominio1Nulo;
let Dominio1Bajo;
let Dominio1Medio;
let Dominio1Alto;
let Dominio1MuyAlto;
let DominioUno = (respuesta2+respuesta1+respuesta3)/length;
if(DominioUno < 3){
  Dominio1Nulo= <MDBBadge color="info">{DominioUno}</MDBBadge>
}else if(DominioUno >= 3 && DominioUno < 5){
  Dominio1Bajo= <MDBBadge color="success">{DominioUno}</MDBBadge>
}else if(DominioUno >= 5 && DominioUno < 7){
  Dominio1Medio= <MDBBadge color="warning">{DominioUno}</MDBBadge>
}else if(DominioUno >= 7 && DominioUno < 9){
  Dominio1Alto= <MDBBadge color="warning">{DominioUno}</MDBBadge>
}else if(DominioUno >= 9){
  Dominio1MuyAlto= <MDBBadge color="danger">{DominioUno}</MDBBadge>
}

let Dominio2Nulo;
let Dominio2Bajo;
let Dominio2Medio;
let Dominio2Alto;
let Dominio2MuyAlto;
let DominioDos = (respuesta4+respuesta9+respuesta5+respuesta6+respuesta7+respuesta8+respuesta41+respuesta42+respuesta43+respuesta10+respuesta11+respuesta12+respuesta13) /length;
if(DominioDos < 12){
  Dominio2Nulo= <MDBBadge color="info">{DominioDos}</MDBBadge>
}else if(DominioDos >= 12 && DominioDos < 16){
  Dominio2Bajo= <MDBBadge color="success">{DominioDos}</MDBBadge>
}else if(DominioDos >= 16 && DominioDos < 20){
  Dominio2Medio= <MDBBadge color="warning">{DominioDos}</MDBBadge>
}else if(DominioDos >= 20 && DominioDos < 24){
  Dominio2Alto= <MDBBadge color="warning">{DominioDos}</MDBBadge>
}else if(DominioDos >= 24){
  Dominio2MuyAlto= <MDBBadge color="danger">{DominioDos}</MDBBadge>
}

let Dominio3Nulo;
let Dominio3Bajo;
let Dominio3Medio;
let Dominio3Alto;
let Dominio3MuyAlto;
let DominioTres = (respuesta20+respuesta21+respuesta22+respuesta18+respuesta19+respuesta26+respuesta27)/length;
if(DominioTres < 5){
  Dominio3Nulo= <MDBBadge color="info">{DominioTres}</MDBBadge>
}else if(DominioTres >= 5 && DominioTres < 8){
  Dominio3Bajo= <MDBBadge color="success">{DominioTres}</MDBBadge>
}else if(DominioTres >= 8 && DominioTres < 11){
  Dominio3Medio= <MDBBadge color="warning">{DominioTres}</MDBBadge>
}else if(DominioTres >= 11 && DominioTres < 14){
  Dominio3Alto= <MDBBadge color="warning">{DominioTres}</MDBBadge>
}else if(DominioTres >= 14){
  Dominio3MuyAlto= <MDBBadge color="danger">{DominioTres}</MDBBadge>
}

let Dominio4Nulo;
let Dominio4Bajo;
let Dominio4Medio;
let Dominio4Alto;
let Dominio4MuyAlto;
let DominioCuatro = (respuesta14+respuesta15)/length;
if(DominioCuatro < 1){
  Dominio4Nulo= <MDBBadge color="info">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 1 && DominioCuatro < 2){
  Dominio4Bajo= <MDBBadge color="success">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 2 && DominioCuatro < 4){
  Dominio4Medio= <MDBBadge color="warning">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 4 && DominioCuatro < 6){
  Dominio4Alto= <MDBBadge color="warning">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 6){
  Dominio4MuyAlto= <MDBBadge color="danger">{DominioCuatro}</MDBBadge>
}

let Dominio5Nulo;
let Dominio5Bajo;
let Dominio5Medio;
let Dominio5Alto;
let Dominio5MuyAlto;
let DominioCinco = (respuesta16+respuesta17)/length;
if(DominioCinco < 1){
  Dominio5Nulo= <MDBBadge color="info">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 1 && DominioCinco < 2){
  Dominio5Bajo= <MDBBadge color="success">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 2 && DominioCinco < 4){
  Dominio5Medio= <MDBBadge color="warning">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 4 && DominioCinco < 6){
  Dominio5Alto= <MDBBadge color="warning">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 6){
  Dominio5MuyAlto= <MDBBadge color="danger">{DominioCinco}</MDBBadge>
}

let Dominio6Nulo;
let Dominio6Bajo;
let Dominio6Medio;
let Dominio6Alto;
let Dominio6MuyAlto;
let DominioSeis = (respuesta23+respuesta24+respuesta25+respuesta28+respuesta29)/length;
if(DominioSeis < 3){
  Dominio6Nulo= <MDBBadge color="info">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 3 && DominioSeis < 5){
  Dominio6Bajo= <MDBBadge color="success">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 5 && DominioSeis < 8){
  Dominio6Medio= <MDBBadge color="warning">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 8 && DominioSeis < 11){
  Dominio6Alto= <MDBBadge color="warning">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 11){
  Dominio6MuyAlto= <MDBBadge color="danger">{DominioSeis}</MDBBadge>
}

let Dominio7Nulo;
let Dominio7Bajo;
let Dominio7Medio;
let Dominio7Alto;
let Dominio7MuyAlto;
let DominioSiete = (respuesta30+respuesta31+respuesta32+respuesta44+respuesta45+respuesta46)/length;
if(DominioSiete < 5){
  Dominio7Nulo= <MDBBadge color="info">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 5 && DominioSiete < 8){
  Dominio7Bajo= <MDBBadge color="success">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 8 && DominioSiete < 11){
  Dominio7Medio= <MDBBadge color="warning">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 11 && DominioSiete < 14){
  Dominio7Alto= <MDBBadge color="warning">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 14){
  Dominio7MuyAlto= <MDBBadge color="danger">{DominioSiete}</MDBBadge>
}

let Dominio8Nulo;
let Dominio8Bajo;
let Dominio8Medio;
let Dominio8Alto;
let Dominio8MuyAlto;
let DominioOcho = (respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40)/length;
if(DominioOcho < 7){
  Dominio8Nulo= <MDBBadge color="info">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 7 && DominioOcho < 10){
  Dominio8Bajo= <MDBBadge color="success">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 10 && DominioOcho < 13){
  Dominio8Medio= <MDBBadge color="warning">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 13 && DominioOcho < 16){
  Dominio8Alto= <MDBBadge color="warning">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 16){
  Dominio8MuyAlto= <MDBBadge color="danger">{DominioOcho}</MDBBadge>
}


ponderacion=<React.Fragment>

<MDBContainer style={{marginTop:20}}>
          <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
              Descargar Resultados
          </MDBBtn>
 </MDBContainer>
 <br/>
 <PDFExport
          scale={0.6}
          paperSize="A4"
          margin="2cm"
          ref={(component) => this.pdfExportComponent = component}
          allPages= "true"
    
      >
<MDBContainer >
<font face="arial" className = "mt-4" ><strong> ENCUESTA RP. </strong> <br/> <strong>FILTRADO POR  :  {this.state.filtro6} {this.state.filtro1} <br/>{this.state.filtro2} <br/> {this.state.filtro3}  <br/>{this.state.filtro4} <br/> {this.state.filtro5}<br/> {this.state.filtro7} <br/> {this.state.filtro8} <br/></strong></font><br/>
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
            <TableCell component="th" scope="row" width="50%" >V. Interferencia en la relación trabajo-familia</TableCell>           
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
            <TableCell component="th" scope="row" > <Badge  color="primary">{respuesta1/length}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >2.- Condiciones deficientes e insalubres</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{respuesta2/length}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
           
            <TableRow>
            <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{respuesta3/length}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >4.- Cargas cuantitativas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta4/length)+(respuesta9/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >5.- Ritmos de trabajo acelerado</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta5/length)+(respuesta6/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta7/length)+(respuesta8/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta41/length)+(respuesta42/length)+(respuesta43/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >8.- Cargas de alta responsabilidad</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta10/length)+(respuesta11/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row"  width="50%">9.- Cargas contradictorias o inconsistentes</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta12/length)+(respuesta13/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta20/length)+(respuesta21/length)+(respuesta22/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta18/length)+(respuesta19/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >12.- Limitada o inexistente capacitación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta26/length)+(respuesta27/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >13.- Jornadas de trabajo extensas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta14/length)+(respuesta15/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >14.- Influencia del trabajo fuera del centro laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta16/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >15.- Influencia de las responsabilidades familiares</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta17/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >16.- Escasa claridad de funciones</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta23/length)+(respuesta24/length)+(respuesta25/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >17.- Características del liderazgo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta28/length)+(respuesta29/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >18.- Relaciones sociales en el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta30/length)+(respuesta31/length)+(respuesta32/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >19.- Deficiente relación con los colaboradores que supervisa</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta44/length)+(respuesta45/length)+(respuesta46/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >20.- Violencia laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(respuesta33/length)+(respuesta34/length)+(respuesta35/length)+(respuesta36/length)+(respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
</PDFExport>  
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
                  full={{ src: logo, width: 80, height: 25, alt: 'ADS' }} />               
              </MDBNavbarBrand>

              <MDBNavbarBrand>
               Resultados Globales de la Encuesta Riesgo Psicosocial
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav >   
                </MDBNavbarNav>
                <strong>{this.state.date}</strong> 
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

export default App