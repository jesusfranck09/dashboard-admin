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
      peticion2:[],
      peticion3:[],
      peticion4:[],
      peticion5:[],
      peticion6:[],
      peticion7:[],
      peticion8:[],
      peticion9:[],
      peticion10:[],
      peticion11:[],
      peticion12:[],
      peticion13:[],
      peticion14:[],
      peticion15:[],
      filtro1:'',
      filtro2:'',
      filtro3:'',
      filtro4:'',
      filtro5:'',
      filtro6:'',
      filtro7:'',
      filtro8:'',
      arrayFinal:[],
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
    console.log("entro")
    axios({
      url:  url,
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
            url:  url,
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
        // console.log("rows" , rows.data[6])
        periodo= rows.data[6]
        array.push(rows.data[0])
      })

      // console.log("periodo" ,periodo)

      // console.log("array",array[0],array[1])

      for(var i=0; i<=array.length;i++){
        console.log("este es el array en i" , array[i])
        const url = 'http://localhost:8000/graphql'
       await  axios({
          url:  url,
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
               
                // console.log("peticion global" , datos.data.data.getresultGlobalSurveyEEO)
              //  this.setState({peticion1:datos.data.data.getresultGlobalSurveyEEO})
              totalEmpleados.push(datos.data.data.getresultGlobalSurveyEEO)
              this.setState({peticion1:totalEmpleados})
              })
              .catch(err => {
                // console.log("el error es  ",err.response)
              });  
           }
          
           let array3 = []
           let array4=array3.push(array3)
          //  this.setState({peticion1:array4})
          //  console.log("el array final en el estado" ,this.state.peticion1)

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

      let array1=[], array2=[], array3=[], array4=[], array5=[], array6=[], array7=[], array8=[], array9=[], array10=[]      
      let array11=[], array12=[], array13=[], array14=[], array15=[], array16=[], array17=[], array18=[], array19=[], array20=[]      
      let array21=[], array22=[], array23=[], array24=[], array25=[], array26=[], array27=[], array28=[], array29=[], array30=[]      
      let array31=[], array32=[], array33=[], array34=[], array35=[], array36=[], array37=[], array38=[], array39=[], array40=[]      
      let array41=[], array42=[], array43=[], array44=[], array45=[], array46=[], array47=[], array48=[], array49=[], array50=[]      
      let array51=[], array52=[], array53=[], array54=[], array55=[], array56=[], array57=[], array58=[], array59=[], array60=[]      
      let array61=[], array62=[], array63=[], array64=[], array65=[], array66=[], array67=[], array68=[], array69=[], array70=[],array71=[],array72=[];

      let ponderacionTotal=[];
      var filtrar1 ;
      var array1Int;
      var arrInt;
      var suma;
        this.state.peticion1.map(rows=>{
       filtrar1 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO == 2;
        });

        array1.push(filtrar1)
        let valor1=[];

        array1.map(rows=>{
          if(rows[0]){
            console.log("rows",rows[0].ponderacion)
            valor1.push(rows[0].ponderacion)
          } 
        })
        console.log("el valor1",valor1)

        arrInt = valor1.map(x => Number.parseInt(x, 10));
        
        suma=0;
        arrInt.forEach (function(numero){
          suma += numero;
        });
        console.log("suma",suma)
 //////////////       ////////////////////////////////////////////////////////////////////////7
          // rows.map(rows=>{
          //   ponderacionTotal.push(rows.ponderacion)
          // })

        }) 

        // console.log("ponderacionkTotal" , ponderacionTotal)


// console.log("la suma" , suma/this.state.peticion1.length);
// console.log("array1int" ,array1Int);

// let celda;
// let criterios;

// if(general<50){
//   celda = <TableCell style={{backgroundColor: "#51EAFF"}} align="right">Nulo o Despreciable</TableCell>
//   }else if(general>=50 && general < 75){
//     celda = <TableCell style={{backgroundColor: "#45D09E"}} align="right">Bajo</TableCell>
//   }else if(general>=75 && general < 99){
//     celda = <TableCell style={{backgroundColor: "#FFD600"}} align="right">Medio</TableCell>
//   }else if(general>=99 && general < 140){
//    celda = <TableCell style={{backgroundColor: "#FF905A"}} align="right">Alto</TableCell>
//   }
//   else if( general > 140){
//     celda  = <TableCell style={{backgroundColor: "#E20338"}} align="right">Muy Alto</TableCell>
//   }

// if(general<50){
// celda = <TableCell width="10%"  style={{backgroundColor: "#51EAFF"}}>Nulo o Despreciable</TableCell>
// criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
// }else if(general>=50 && general < 75){
//   celda = <TableCell width="10%" style={{backgroundColor: "#45D09E"}} >Bajo</TableCell>
//   criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}>Es necesario una mayor difusión de la política de prevención de riesgos
//   psicosociales y programas para: la prevención de los factores de riesgo
//   psicosocial, la promoción de un entorno organizacional favorable y la
//   prevención de la violencia laboral.</TableCell>
// }else if(general>=75 && general < 99){
//   celda = <TableCell width="10%"  style={{backgroundColor: "#FFD600"}} >Medio</TableCell>
//   criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} >Se requiere revisar la política de prevención de riesgos psicosociales y
//   programas para la prevención de los factores de riesgo psicosocial, la
//   promoción de un entorno organizacional favorable y la prevención de la
//   violencia laboral, así como reforzar su aplicación y difusión, mediante un
//   Programa de intervención.</TableCell>
// }else if(general>=99 && general < 140){
//  celda = <TableCell  width="10%" style={{backgroundColor: "#FF905A"}} >Alto</TableCell>
//  criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} >Se requiere realizar un análisis de cada categoría y dominio, de manera que
//  se puedan determinar las acciones de intervención apropiadas a través de un
//  Programa de intervención, que podrá incluir una evaluación específica1 y
//  deberá incluir una campaña de sensibilización, revisar la política de
//  prevención de riesgos psicosociales y programas para la prevención de los
//  factores de riesgo psicosocial, la promoción de un entorno organizacional
//  favorable y la prevención de la violencia laboral, así como reforzar su
//  aplicación y difusión.</TableCell>
// }
// else if( general > 140){
//   celda  = <TableCell width="10%"  style={{backgroundColor: "#E20338"}}>Muy Alto</TableCell>
//   criterios = <TableCell style={{backgroundColor: "#F0F8FF"}} >Se requiere realizar el análisis de cada categoría y dominio para establecer
//   las acciones de intervención apropiadas, mediante un Programa de
//   intervención que deberá incluir evaluaciones específicas1, y contemplar
//   campañas de sensibilización, revisar la política de prevención de riesgos
//   psicosociales y programas para la prevención de los factores de riesgo
//   psicosocial, la promoción de un entorno organizacional favorable y la
//   prevención de la violencia laboral, así como reforzar su aplicación y difusión.</TableCell>
// }


// let categoria1Nulo;
// let categoria1Bajo;
// let categoria1Medio;
// let categoria1Alto;
// let categoria1MuyAlto;

// let entero2 = pet1ent2+pet2ent2+pet3ent2+pet4ent2+pet5ent2+pet6ent2+pet7ent2+pet8ent2+pet9ent2+pet10ent2+pet11ent2+pet12ent2+pet13ent2+pet14ent2+pet15ent2;
// let entero1 = pet1ent1+pet2ent1+pet3ent1+pet4ent1+pet5ent1+pet6ent1+pet7ent1+pet8ent1+pet9ent1+pet10ent1+pet11ent1+pet12ent1+pet13ent1+pet14ent1+pet15ent1;
// let entero3 = pet1ent3+pet2ent3+pet3ent3+pet4ent3+pet5ent3+pet6ent3+pet7ent3+pet8ent3+pet9ent3+pet10ent3+pet11ent3+pet12ent3+pet13ent3+pet14ent3+pet15ent3;
// let entero4 = pet1ent4+pet2ent4+pet3ent4+pet4ent4+pet5ent4+pet6ent4+pet7ent4+pet8ent4+pet9ent4+pet10ent4+pet11ent4+pet12ent4+pet13ent4+pet14ent4+pet15ent4;
// let entero5 = pet1ent5+pet2ent5+pet3ent5+pet4ent5+pet5ent5+pet6ent5+pet7ent5+pet8ent5+pet9ent5+pet10ent5+pet11ent5+pet12ent5+pet13ent5+pet14ent5+pet15ent5;

// let categoriaUno = (entero1+entero3+entero2+entero4+entero5)/length;
// if(categoriaUno < 5){
//   categoria1Nulo= <MDBBadge color="info">{categoriaUno}</MDBBadge>
// }else if(categoriaUno >= 5 && categoriaUno < 9){
//   categoria1Bajo= <MDBBadge color="success">{categoriaUno}</MDBBadge>
// }else if(categoriaUno >= 9 && categoriaUno < 11){
//   categoria1Medio= <MDBBadge color="warning">{categoriaUno}</MDBBadge>
// }else if(categoriaUno >= 11 && categoriaUno < 14){
//   categoria1Alto= <MDBBadge color="warning">{categoriaUno}</MDBBadge>
// }else if(categoriaUno >= 14){
//   categoria1MuyAlto= <MDBBadge color="danger">{categoriaUno}</MDBBadge>
// }
// let categoria2Nulo;
// let categoria2Bajo;
// let categoria2Medio;
// let categoria2Alto;
// let categoria2MuyAlto;


// let entero6= pet1ent6+pet2ent6+pet3ent6+pet4ent6+pet5ent6+pet6ent6+pet7ent6+pet8ent6+pet9ent6+pet10ent6+pet11ent6+pet12ent6+pet13ent6+pet14ent6+pet15ent6;
// let entero12=pet1ent12+pet2ent12+pet3ent12+pet4ent12+pet5ent12+pet6ent12+pet7ent12+pet8ent12+pet9ent12+pet10ent12+pet11ent12+pet12ent12+pet13ent12+pet14ent12+pet15ent12;
// let entero7= pet1ent7+pet2ent7+pet3ent7+pet4ent7+pet5ent7+pet6ent7+pet7ent7+pet8ent7+pet9ent7+pet10ent7+pet11ent7+pet12ent7+pet13ent7+pet14ent7+pet15ent7;
// let entero8= pet1ent8+pet2ent8+pet3ent8+pet4ent8+pet5ent8+pet6ent8+pet7ent8+pet8ent8+pet9ent8+pet10ent8+pet11ent8+pet12ent8+pet13ent8+pet14ent8+pet15ent8;
// let entero9 = pet1ent9+pet2ent9+pet3ent9+pet4ent9+pet5ent9+pet6ent9+pet7ent9+pet8ent9+pet9ent9+pet10ent9+pet11ent9+pet12ent9+pet13ent9+pet14ent9+pet15ent9;
// let entero10=pet1ent10+pet2ent10+pet3ent10+pet4ent10+pet5ent10+pet6ent10+pet7ent10+pet8ent10+pet9ent10+pet10ent10+pet11ent10+pet12ent10+pet13ent10+pet14ent10+pet15ent10;
// let entero11=pet1ent11+pet2ent11+pet3ent11+pet4ent11+pet5ent11+pet6ent11+pet7ent11+pet8ent11+pet9ent11+pet10ent11+pet11ent11+pet12ent11+pet13ent11+pet14ent11+pet15ent11;
// let entero65=pet1ent65+pet2ent65+pet3ent65+pet4ent65+pet5ent65+pet6ent65+pet7ent65+pet8ent65+pet9ent65+pet10ent65+pet11ent65+pet12ent65+pet13ent65+pet14ent65+pet15ent65;
// let entero66=pet1ent66+pet2ent66+pet3ent66+pet4ent66+pet5ent66+pet6ent66+pet7ent66+pet8ent66+pet9ent66+pet10ent66+pet11ent66+pet12ent66+pet13ent66+pet14ent66+pet15ent66;
// let entero67=pet1ent67+pet2ent67+pet3ent67+pet4ent67+pet5ent67+pet6ent67+pet7ent67+pet8ent67+pet9ent67+pet10ent67+pet11ent67+pet12ent67+pet13ent67+pet14ent67+pet15ent67;
// let entero68=pet1ent68+pet2ent68+pet3ent68+pet4ent68+pet5ent68+pet6ent68+pet7ent68+pet8ent68+pet9ent68+pet10ent68+pet11ent68+pet12ent68+pet13ent68+pet14ent68+pet15ent68;
// let entero13=pet1ent13+pet2ent13+pet3ent13+pet4ent13+pet5ent13+pet6ent13+pet7ent13+pet8ent13+pet9ent13+pet10ent13+pet11ent13+pet12ent13+pet13ent13+pet14ent13+pet15ent13;
// let entero14=pet1ent14+pet2ent14+pet3ent14+pet4ent14+pet5ent14+pet6ent14+pet7ent14+pet8ent14+pet9ent14+pet10ent14+pet11ent14+pet12ent14+pet13ent14+pet14ent14+pet15ent14;
// let entero15=pet1ent15+pet2ent15+pet3ent15+pet4ent15+pet5ent15+pet6ent15+pet7ent15+pet8ent15+pet9ent15+pet10ent15+pet11ent15+pet12ent15+pet13ent15+pet14ent15+pet15ent15;
// let entero16=pet1ent16+pet2ent16+pet3ent16+pet4ent16+pet5ent16+pet6ent16+pet7ent16+pet8ent16+pet9ent16+pet10ent16+pet11ent16+pet12ent16+pet13ent16+pet14ent16+pet15ent16;
// let entero26=pet1ent26+pet2ent26+pet3ent26+pet4ent26+pet5ent26+pet6ent26+pet7ent26+pet8ent26+pet9ent26+pet10ent26+pet11ent26+pet12ent26+pet13ent26+pet14ent26+pet15ent26;
// let entero27=pet1ent27+pet2ent27+pet3ent27+pet4ent27+pet5ent27+pet6ent27+pet7ent27+pet8ent27+pet9ent27+pet10ent27+pet11ent27+pet12ent27+pet13ent27+pet14ent27+pet15ent27;
// let entero25=pet1ent25+pet2ent25+pet3ent25+pet4ent25+pet5ent25+pet6ent25+pet7ent25+pet8ent25+pet9ent25+pet10ent25+pet11ent25+pet12ent25+pet13ent25+pet14ent25+pet15ent25;
// let entero23=pet1ent23+pet2ent23+pet3ent23+pet4ent23+pet5ent23+pet6ent23+pet7ent23+pet8ent23+pet9ent23+pet10ent23+pet11ent23+pet12ent23+pet13ent23+pet14ent23+pet15ent23;
// let entero24=pet1ent24+pet2ent24+pet3ent24+pet4ent24+pet5ent24+pet6ent24+pet7ent24+pet8ent24+pet9ent24+pet10ent24+pet11ent24+pet12ent24+pet13ent24+pet14ent24+pet15ent24;
// let entero28=pet1ent28+pet2ent28+pet3ent28+pet4ent28+pet5ent28+pet6ent28+pet7ent28+pet8ent28+pet9ent28+pet10ent28+pet11ent28+pet12ent28+pet13ent28+pet14ent28+pet15ent28;
// let entero29=pet1ent29+pet2ent29+pet3ent29+pet4ent29+pet5ent29+pet6ent29+pet7ent29+pet8ent29+pet9ent29+pet10ent29+pet11ent29+pet12ent29+pet13ent29+pet14ent29+pet15ent29;
// let entero30=pet1ent30+pet2ent30+pet3ent30+pet4ent30+pet5ent30+pet6ent30+pet7ent30+pet8ent30+pet9ent30+pet10ent30+pet11ent30+pet12ent30+pet13ent30+pet14ent30+pet15ent30;
// let entero35=pet1ent35+pet2ent35+pet3ent35+pet4ent35+pet5ent35+pet6ent35+pet7ent35+pet8ent35+pet9ent35+pet10ent35+pet11ent35+pet12ent35+pet13ent35+pet14ent35+pet15ent35;
// let entero36=pet1ent36+pet2ent36+pet3ent36+pet4ent36+pet5ent36+pet6ent36+pet7ent36+pet8ent36+pet9ent36+pet10ent36+pet11ent36+pet12ent36+pet13ent36+pet14ent36+pet15ent36;

// let categoriaDos = (entero6+entero12+entero7+entero8+entero9+entero10+entero11+entero65+entero66+entero67+entero68+entero13+entero14+entero15+entero16+entero25+entero26+entero27+entero28+entero23+entero24+entero29+entero30+entero35+entero36)/length;
// if(categoriaDos < 15){
//   categoria2Nulo= <MDBBadge color="info">{categoriaDos}</MDBBadge>
// }else if(categoriaDos >= 15 && categoriaDos < 30){
//   categoria2Bajo= <MDBBadge color="success">{categoriaDos}</MDBBadge>
// }else if(categoriaDos >=30 && categoriaDos < 45){
//   categoria2Medio= <MDBBadge color="warning">{categoriaDos}</MDBBadge>
// }else if(categoriaDos >=45 && categoriaDos < 60){
//   categoria2Alto= <MDBBadge color="warning">{categoriaDos}</MDBBadge>
// }else if(categoriaDos >= 60){
//   categoria2MuyAlto= <MDBBadge color="danger">{categoriaDos}</MDBBadge>
// }
// let categoria3Nulo;
// let categoria3Bajo;
// let categoria3Medio;
// let categoria3Alto;
// let categoria3MuyAlto;

// let entero17=pet1ent17+pet2ent17+pet3ent17+pet4ent17+pet5ent17+pet6ent17+pet7ent17+pet8ent17+pet9ent17+pet10ent17+pet11ent17+pet12ent17+pet13ent17+pet14ent17+pet15ent17;
// let entero18=pet1ent18+pet2ent18+pet3ent18+pet4ent18+pet5ent18+pet6ent18+pet7ent18+pet8ent18+pet9ent18+pet10ent18+pet11ent18+pet12ent18+pet13ent18+pet14ent18+pet15ent18;
// let entero19=pet1ent19+pet2ent19+pet3ent19+pet4ent19+pet5ent19+pet6ent19+pet7ent19+pet8ent19+pet9ent19+pet10ent19+pet11ent19+pet12ent19+pet13ent19+pet14ent19+pet15ent19;
// let entero20=pet1ent20+pet2ent20+pet3ent20+pet4ent20+pet5ent20+pet6ent20+pet7ent20+pet8ent20+pet9ent20+pet10ent20+pet11ent20+pet12ent20+pet13ent20+pet14ent20+pet15ent20;
// let entero21=pet1ent21+pet2ent21+pet3ent21+pet4ent21+pet5ent21+pet6ent21+pet7ent21+pet8ent21+pet9ent21+pet10ent21+pet11ent21+pet12ent21+pet13ent21+pet14ent21+pet15ent21;
// let entero22=pet1ent22+pet2ent22+pet3ent22+pet4ent22+pet5ent22+pet6ent22+pet7ent22+pet8ent22+pet9ent22+pet10ent22+pet11ent22+pet12ent22+pet13ent22+pet14ent22+pet15ent22;

// let categoriaTre = (entero17+entero18+entero19+entero20+entero21+entero22)/length;
// if(categoriaTre < 5){
//   categoria3Nulo= <MDBBadge color="info">{categoriaTre}</MDBBadge>
// }else if(categoriaTre >= 5 && categoriaTre < 7){
//   categoria3Bajo= <MDBBadge color="success">{categoriaTre}</MDBBadge>
// }else if(categoriaTre >=7 && categoriaTre < 10){
//   categoria3Medio= <MDBBadge color="warning">{categoriaTre}</MDBBadge>
// }else if(categoriaTre >=10 && categoriaTre < 13){
//   categoria3Alto= <MDBBadge color="warning">{categoriaTre}</MDBBadge>
// }else if(categoriaTre >= 13){
//   categoria3MuyAlto= <MDBBadge color="danger">{categoriaTre}</MDBBadge>
// }

// let categoria4Nulo;
// let categoria4Bajo;
// let categoria4Medio;
// let categoria4Alto;
// let categoria4MuyAlto;

// let entero31=pet1ent31+pet2ent31+pet3ent31+pet4ent31+pet5ent31+pet6ent31+pet7ent31+pet8ent31+pet9ent31+pet10ent31+pet11ent31+pet12ent31+pet13ent31+pet14ent31+pet15ent31;
// let entero32=pet1ent32+pet2ent32+pet3ent32+pet4ent32+pet5ent32+pet6ent32+pet7ent32+pet8ent32+pet9ent32+pet10ent32+pet11ent32+pet12ent32+pet13ent32+pet14ent32+pet15ent32;
// let entero33=pet1ent33+pet2ent33+pet3ent33+pet4ent33+pet5ent33+pet6ent33+pet7ent33+pet8ent33+pet9ent33+pet10ent33+pet11ent33+pet12ent33+pet13ent33+pet14ent33+pet15ent33;
// let entero34=pet1ent34+pet2ent34+pet3ent34+pet4ent34+pet5ent34+pet6ent34+pet7ent34+pet8ent34+pet9ent34+pet10ent34+pet11ent34+pet12ent34+pet13ent34+pet14ent34+pet15ent34;
// let entero37=pet1ent37+pet2ent37+pet3ent37+pet4ent37+pet5ent37+pet6ent37+pet7ent37+pet8ent37+pet9ent37+pet10ent37+pet11ent37+pet12ent37+pet13ent37+pet14ent37+pet15ent37;
// let entero38=pet1ent38+pet2ent38+pet3ent38+pet4ent38+pet5ent38+pet6ent38+pet7ent38+pet8ent38+pet9ent38+pet10ent38+pet11ent38+pet12ent38+pet13ent38+pet14ent38+pet15ent38;
// let entero39=pet1ent39+pet2ent39+pet3ent39+pet4ent39+pet5ent39+pet6ent39+pet7ent39+pet8ent39+pet9ent39+pet10ent39+pet11ent39+pet12ent39+pet13ent39+pet14ent39+pet15ent39;
// let entero40=pet1ent40+pet2ent40+pet3ent40+pet4ent40+pet5ent40+pet6ent40+pet7ent40+pet8ent40+pet9ent40+pet10ent40+pet11ent40+pet12ent40+pet13ent40+pet14ent40+pet15ent40;
// let entero41= pet1ent41+pet2ent41+pet3ent41+pet4ent41+pet5ent41+pet6ent41+pet7ent41+pet8ent41+pet9ent41+pet10ent41+pet11ent41+pet12ent41+pet13ent41+pet14ent41+pet15ent41;
// let entero42= pet1ent42+pet2ent42+pet3ent42+pet4ent42+pet5ent42+pet6ent42+pet7ent42+pet8ent42+pet9ent42+pet10ent42+pet11ent42+pet12ent42+pet13ent42+pet14ent42+pet15ent42;
// let entero43=pet1ent43+pet2ent43+pet3ent43+pet4ent43+pet5ent43+pet6ent43+pet7ent43+pet8ent43+pet9ent43+pet10ent43+pet11ent43+pet12ent43+pet13ent43+pet14ent43+pet15ent43;
// let entero44=pet1ent44+pet2ent44+pet3ent44+pet4ent44+pet5ent44+pet6ent44+pet7ent44+pet8ent44+pet9ent44+pet10ent44+pet11ent44+pet12ent44+pet13ent44+pet14ent44+pet15ent44;
// let entero45=pet1ent45+pet2ent45+pet3ent45+pet4ent45+pet5ent45+pet6ent45+pet7ent45+pet8ent45+pet9ent45+pet10ent45+pet11ent45+pet12ent45+pet13ent45+pet14ent45+pet15ent45;
// let entero46=pet1ent46+pet2ent46+pet3ent46+pet4ent46+pet5ent46+pet6ent46+pet7ent46+pet8ent46+pet9ent46+pet10ent46+pet11ent46+pet12ent46+pet13ent46+pet14ent46+pet15ent46;
// let entero69=pet1ent69+pet2ent69+pet3ent69+pet4ent69+pet5ent69+pet6ent69+pet7ent69+pet8ent69+pet9ent69+pet10ent69+pet11ent69+pet12ent69+pet13ent69+pet14ent69+pet15ent69;


// let entero70=pet1ent70+pet2ent70+pet3ent70+pet4ent70+pet5ent70+pet6ent70+pet7ent70+pet8ent70+pet9ent70+pet10ent70+pet11ent70+pet12ent70+pet13ent70+pet14ent70+pet15ent70;
// let entero71=pet1ent71+pet2ent71+pet3ent71+pet4ent71+pet5ent71+pet6ent71+pet7ent71+pet8ent71+pet9ent71+pet10ent71+pet11ent71+pet12ent71+pet13ent71+pet14ent71+pet15ent71;
// console.log("PETS", pet1ent71,pet2ent71,pet3ent71,pet4ent71,pet5ent71,pet6ent71,pet7ent71,pet8ent71,pet9ent71,pet10ent71,pet11ent71,pet12ent71,pet13ent71,pet14ent71,pet15ent71)
// let entero72=pet1ent72+pet2ent72+pet3ent72+pet4ent72+pet5ent72+pet6ent72+pet7ent72+pet8ent72+pet9ent72+pet10ent72+pet11ent72+pet12ent72+pet13ent72+pet14ent72+pet15ent72;
// let entero57=pet1ent57+pet2ent57+pet3ent57+pet4ent57+pet5ent57+pet6ent57+pet7ent57+pet8ent57+pet9ent57+pet10ent57+pet11ent57+pet12ent57+pet13ent57+pet14ent57+pet15ent57;
// let entero58=pet1ent58+pet2ent58+pet3ent58+pet4ent58+pet5ent58+pet6ent58+pet7ent58+pet8ent58+pet9ent58+pet10ent58+pet11ent58+pet12ent58+pet13ent58+pet14ent58+pet15ent58;
// let entero59=pet1ent59+pet2ent59+pet3ent59+pet4ent59+pet5ent59+pet6ent59+pet7ent59+pet8ent59+pet9ent59+pet10ent59+pet11ent59+pet12ent59+pet13ent59+pet14ent59+pet15ent59;
// let entero60=pet1ent60+pet2ent60+pet3ent60+pet4ent60+pet5ent60+pet6ent60+pet7ent60+pet8ent60+pet9ent60+pet10ent60+pet11ent60+pet12ent60+pet13ent60+pet14ent60+pet15ent60;
// let entero61=pet1ent61+pet2ent61+pet3ent61+pet4ent61+pet5ent61+pet6ent61+pet7ent61+pet8ent61+pet9ent61+pet10ent61+pet11ent61+pet12ent61+pet13ent61+pet14ent61+pet15ent61;
// let entero62=pet1ent62+pet2ent62+pet3ent62+pet4ent62+pet5ent62+pet6ent62+pet7ent62+pet8ent62+pet9ent62+pet10ent62+pet11ent62+pet12ent62+pet13ent62+pet14ent62+pet15ent62;
// let entero63=pet1ent63+pet2ent63+pet3ent63+pet4ent63+pet5ent63+pet6ent63+pet7ent63+pet8ent63+pet9ent63+pet10ent63+pet11ent63+pet12ent63+pet13ent63+pet14ent63+pet15ent63;
// let entero64=pet1ent64+pet2ent64+pet3ent64+pet4ent64+pet5ent64+pet6ent64+pet7ent64+pet8ent64+pet9ent64+pet10ent64+pet11ent64+pet12ent64+pet13ent64+pet14ent64+pet15ent64;

// let categoriaCuatro = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72+entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64)/length;
// if(categoriaCuatro < 14){
//   categoria4Nulo= <MDBBadge color="info">{categoriaCuatro}</MDBBadge>
// }else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
//   categoria4Bajo= <MDBBadge color="success">{categoriaCuatro}</MDBBadge>
// }else if(categoriaCuatro >=29 && categoriaCuatro < 42){
//   categoria4Medio= <MDBBadge color="warning">{categoriaCuatro}</MDBBadge>
// }else if(categoriaCuatro >=42 && categoriaCuatro < 58){
//   categoria4Alto= <MDBBadge color="warning">{categoriaCuatro}</MDBBadge>
// }else if(categoriaCuatro >= 58){
//   categoria4MuyAlto= <MDBBadge color="danger">{categoriaCuatro}</MDBBadge>
// }

// let categoria5Nulo;
// let categoria5Bajo;
// let categoria5Medio;
// let categoria5Alto;
// let categoria5MuyAlto;

// let entero47=pet1ent47+pet2ent47+pet3ent47+pet4ent47+pet5ent47+pet6ent47+pet7ent47+pet8ent47+pet9ent47+pet10ent47+pet11ent47+pet12ent47+pet13ent47+pet14ent47+pet15ent47;
// let entero48=pet1ent48+pet2ent48+pet3ent48+pet4ent48+pet5ent48+pet6ent48+pet7ent48+pet8ent48+pet9ent48+pet10ent48+pet11ent48+pet12ent48+pet13ent48+pet14ent48+pet15ent48;
// let entero49=pet1ent49+pet2ent49+pet3ent49+pet4ent49+pet5ent49+pet6ent49+pet7ent49+pet8ent49+pet9ent49+pet10ent49+pet11ent49+pet12ent49+pet13ent49+pet14ent49+pet15ent49;
// let entero50=pet1ent50+pet2ent50+pet3ent50+pet4ent50+pet5ent50+pet6ent50+pet7ent50+pet8ent50+pet9ent50+pet10ent50+pet11ent50+pet12ent50+pet13ent50+pet14ent50+pet15ent50;
// let entero51=pet1ent51+pet2ent51+pet3ent51+pet4ent51+pet5ent51+pet6ent51+pet7ent51+pet8ent51+pet9ent51+pet10ent51+pet11ent51+pet12ent51+pet13ent51+pet14ent51+pet15ent51;
// let entero52=pet1ent52+pet2ent52+pet3ent52+pet4ent52+pet5ent52+pet6ent52+pet7ent52+pet8ent52+pet9ent52+pet10ent52+pet11ent52+pet12ent52+pet13ent52+pet14ent52+pet15ent52;
// let entero53=pet1ent53+pet2ent53+pet3ent53+pet4ent53+pet5ent53+pet6ent53+pet7ent53+pet8ent53+pet9ent53+pet10ent53+pet11ent53+pet12ent53+pet13ent53+pet14ent53+pet15ent53;
// let entero54=pet1ent54+pet2ent54+pet3ent54+pet4ent54+pet5ent54+pet6ent54+pet7ent54+pet8ent54+pet9ent54+pet10ent54+pet11ent54+pet12ent54+pet13ent54+pet14ent54+pet15ent54;
// let entero55=pet1ent55+pet2ent55+pet3ent55+pet4ent55+pet5ent55+pet6ent55+pet7ent55+pet8ent55+pet9ent55+pet10ent55+pet11ent55+pet12ent55+pet13ent55+pet14ent55+pet15ent55;
// let entero56=pet1ent56+pet2ent56+pet3ent56+pet4ent56+pet5ent56+pet6ent56+pet7ent56+pet8ent56+pet9ent56+pet10ent56+pet11ent56+pet12ent56+pet13ent56+pet14ent56+pet15ent56;

// let categoriaCinco = (entero47+entero48+entero49+entero50+entero51+entero52+entero55+entero56+entero53+entero54)/length;
// if(categoriaCinco < 10){
//   categoria5Nulo= <MDBBadge color="info">{categoriaCinco}</MDBBadge>
// }else if(categoriaCinco >= 10 && categoriaCinco < 14){
//   categoria5Bajo= <MDBBadge color="success">{categoriaCinco}</MDBBadge>
// }else if(categoriaCinco >=14 && categoriaCinco < 18){
//   categoria5Medio= <MDBBadge color="warning">{categoriaCinco}</MDBBadge>
// }else if(categoriaCinco >=18 && categoriaCinco < 23){
//   categoria5Alto= <MDBBadge color="warning">{categoriaCinco}</MDBBadge>
// }else if(categoriaCinco >= 23){
//   categoria5MuyAlto= <MDBBadge color="danger">{categoriaCinco}</MDBBadge>
// }

// let Dominio1Nulo;
// let Dominio1Bajo;
// let Dominio1Medio;
// let Dominio1Alto;
// let Dominio1MuyAlto;
// let DominioUno = (entero1+entero3+entero2+entero4+entero5)/length;
// if(DominioUno < 5){
//   Dominio1Nulo= <MDBBadge color="info">{DominioUno}</MDBBadge>
// }else if(DominioUno >= 5 && DominioUno < 9){
//   Dominio1Bajo= <MDBBadge color="success">{DominioUno}</MDBBadge>
// }else if(DominioUno >= 9 && DominioUno < 11){
//   Dominio1Medio= <MDBBadge color="warning">{DominioUno}</MDBBadge>
// }else if(DominioUno >=11 && DominioUno < 14){
//   Dominio1Alto= <MDBBadge color="warning">{DominioUno}</MDBBadge>
// }else if(DominioUno >= 14){
//   Dominio1MuyAlto= <MDBBadge color="danger">{DominioUno}</MDBBadge>
// }

// let Dominio2Nulo;
// let Dominio2Bajo;
// let Dominio2Medio;
// let Dominio2Alto;
// let Dominio2MuyAlto;
// let DominioDos = (entero6+entero12+entero7+entero8+entero9+entero10+entero11+entero65+entero66+entero67+entero68+entero13+entero14+entero15+entero16)/length;
// if(DominioDos < 15){
//   Dominio2Nulo= <MDBBadge color="info">{DominioDos}</MDBBadge>
// }else if(DominioDos >= 15 && DominioDos < 21){
//   Dominio2Bajo= <MDBBadge color="success">{DominioDos}</MDBBadge>
// }else if(DominioDos >= 21 && DominioDos < 27){
//   Dominio2Medio= <MDBBadge color="warning">{DominioDos}</MDBBadge>
// }else if(DominioDos >= 27 && DominioDos < 37){
//   Dominio2Alto= <MDBBadge color="warning">{DominioDos}</MDBBadge>
// }else if(DominioDos >= 37){
//   Dominio2MuyAlto= <MDBBadge color="danger">{DominioDos}</MDBBadge>
// }

// let Dominio3Nulo;
// let Dominio3Bajo;
// let Dominio3Medio;
// let Dominio3Alto;
// let Dominio3MuyAlto;
// let DominioTres = (entero25+entero26+entero27+entero28+entero23+entero24+entero29+entero30+entero35+entero36)/length;
// if(DominioTres < 11){
//   Dominio3Nulo= <MDBBadge color="info">{DominioTres}</MDBBadge>
// }else if(DominioTres >= 11 && DominioTres < 16){
//   Dominio3Bajo= <MDBBadge color="success">{DominioTres}</MDBBadge>
// }else if(DominioTres >= 16 && DominioTres < 21){
//   Dominio3Medio= <MDBBadge color="warning">{DominioTres}</MDBBadge>
// }else if(DominioTres >= 21 && DominioTres < 25){
//   Dominio3Alto= <MDBBadge color="warning">{DominioTres}</MDBBadge>
// }else if(DominioTres >= 25){
//   Dominio3MuyAlto= <MDBBadge color="danger">{DominioTres}</MDBBadge>
// }

// let Dominio4Nulo;
// let Dominio4Bajo;
// let Dominio4Medio;
// let Dominio4Alto;
// let Dominio4MuyAlto;
// let DominioCuatro = (entero17+entero18)/length;
// if(DominioCuatro < 1){
//   Dominio4Nulo= <MDBBadge color="info">{DominioCuatro}</MDBBadge>
// }else if(DominioCuatro >= 1 && DominioCuatro < 2){
//   Dominio4Bajo= <MDBBadge color="success">{DominioCuatro}</MDBBadge>
// }else if(DominioCuatro >= 2 && DominioCuatro < 4){
//   Dominio4Medio= <MDBBadge color="warning">{DominioCuatro}</MDBBadge>
// }else if(DominioCuatro >= 4 && DominioCuatro < 6){
//   Dominio4Alto= <MDBBadge color="warning">{DominioCuatro}</MDBBadge>
// }else if(DominioCuatro >= 6){
//   Dominio4MuyAlto= <MDBBadge color="danger">{DominioCuatro}</MDBBadge>
// }

// let Dominio5Nulo;
// let Dominio5Bajo;
// let Dominio5Medio;
// let Dominio5Alto;
// let Dominio5MuyAlto;
// let DominioCinco = (entero19+entero20+entero21+entero22)/length;
// if(DominioCinco < 4){
//   Dominio5Nulo= <MDBBadge color="info">{DominioCinco}</MDBBadge>
// }else if(DominioCinco >= 4 && DominioCinco < 6){
//   Dominio5Bajo= <MDBBadge color="success">{DominioCinco}</MDBBadge>
// }else if(DominioCinco >= 6 && DominioCinco < 8){
//   Dominio5Medio= <MDBBadge color="warning">{DominioCinco}</MDBBadge>
// }else if(DominioCinco >= 8 && DominioCinco < 10){
//   Dominio5Alto= <MDBBadge color="warning">{DominioCinco}</MDBBadge>
// }else if(DominioCinco >= 10){
//   Dominio5MuyAlto= <MDBBadge color="danger">{DominioCinco}</MDBBadge>
// }

// let Dominio6Nulo;
// let Dominio6Bajo;
// let Dominio6Medio;
// let Dominio6Alto;
// let Dominio6MuyAlto;
// let DominioSeis = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41)/length;
// if(DominioSeis < 9){
//   Dominio6Nulo= <MDBBadge color="info">{DominioSeis}</MDBBadge>
// }else if(DominioSeis >= 9 && DominioSeis < 12){
//   Dominio6Bajo= <MDBBadge color="success">{DominioSeis}</MDBBadge>
// }else if(DominioSeis >= 12 && DominioSeis < 16){
//   Dominio6Medio= <MDBBadge color="warning">{DominioSeis}</MDBBadge>
// }else if(DominioSeis >= 16 && DominioSeis < 20){
//   Dominio6Alto= <MDBBadge color="warning">{DominioSeis}</MDBBadge>
// }else if(DominioSeis >= 20){
//   Dominio6MuyAlto= <MDBBadge color="danger">{DominioSeis}</MDBBadge>
// }

// let Dominio7Nulo;
// let Dominio7Bajo;
// let Dominio7Medio;
// let Dominio7Alto;
// let Dominio7MuyAlto;
// let DominioSiete = (entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72)/length;
// if(DominioSiete < 10){
//   Dominio7Nulo= <MDBBadge color="info">{DominioSiete}</MDBBadge>
// }else if(DominioSiete >= 10 && DominioSiete < 13){
//   Dominio7Bajo= <MDBBadge color="success">{DominioSiete}</MDBBadge>
// }else if(DominioSiete >= 13 && DominioSiete < 17){
//   Dominio7Medio= <MDBBadge color="warning">{DominioSiete}</MDBBadge>
// }else if(DominioSiete >= 17 && DominioSiete < 21){
//   Dominio7Alto= <MDBBadge color="warning">{DominioSiete}</MDBBadge>
// }else if(DominioSiete >= 21){
//   Dominio7MuyAlto= <MDBBadge color="danger">{DominioSiete}</MDBBadge>
// }

// let Dominio8Nulo;
// let Dominio8Bajo;
// let Dominio8Medio;
// let Dominio8Alto;
// let Dominio8MuyAlto;
// let DominioOcho = (entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64)/length;
// if(DominioOcho < 7){
//   Dominio8Nulo= <MDBBadge color="info">{DominioOcho}</MDBBadge>
// }else if(DominioOcho >= 7 && DominioOcho < 10){
//   Dominio8Bajo= <MDBBadge color="success">{DominioOcho}</MDBBadge>
// }else if(DominioOcho >= 10 && DominioOcho < 13){
//   Dominio8Medio= <MDBBadge color="warning">{DominioOcho}</MDBBadge>
// }else if(DominioOcho >= 13 && DominioOcho < 16){
//   Dominio8Alto= <MDBBadge color="warning">{DominioOcho}</MDBBadge>
// }else if(DominioOcho >= 16){
//   Dominio8MuyAlto= <MDBBadge color="danger">{DominioOcho}</MDBBadge>
// }

// let Dominio9Nulo;
// let Dominio9Bajo;
// let Dominio9Medio;
// let Dominio9Alto;
// let Dominio9MuyAlto;
// let DominioNueve = (entero47+entero48+entero49+entero50+entero51+entero52)/length;
// if(DominioNueve < 6){
//   Dominio9Nulo= <MDBBadge color="info">{DominioNueve}</MDBBadge>
// }else if(DominioNueve >= 6 && DominioNueve < 10){
//   Dominio9Bajo= <MDBBadge color="success">{DominioNueve}</MDBBadge>
// }else if(DominioNueve >= 10 && DominioNueve < 14){
//   Dominio9Medio= <MDBBadge color="warning">{DominioNueve}</MDBBadge>
// }else if(DominioNueve >= 14 && DominioNueve < 18){
//   Dominio9Alto= <MDBBadge color="warning">{DominioNueve}</MDBBadge>
// }else if(DominioNueve >= 18){
//   Dominio9MuyAlto= <MDBBadge color="danger">{DominioNueve}</MDBBadge>
// }

// let Dominio10Nulo;
// let Dominio10Bajo;
// let Dominio10Medio;
// let Dominio10Alto;
// let Dominio10MuyAlto;
// let DominioDiez = (entero55+entero56+entero53+entero54)/length;
// if(DominioDiez < 4){
//   Dominio10Nulo= <MDBBadge color="info">{DominioDiez}</MDBBadge>
// }else if(DominioDiez >= 4 && DominioDiez < 6){
//   Dominio10Bajo= <MDBBadge color="success">{DominioDiez}</MDBBadge>
// }else if(DominioDiez >= 6 && DominioDiez < 8){
//   Dominio10Medio= <MDBBadge color="warning">{DominioDiez}</MDBBadge>
// }else if(DominioDiez >= 8 && DominioDiez < 10){
//   Dominio10Alto= <MDBBadge color="warning">{DominioDiez}</MDBBadge>
// }else if(DominioDiez >= 10){
//   Dominio10MuyAlto= <MDBBadge color="danger">{DominioDiez}</MDBBadge>
// }


// ponderacion=<React.Fragment>

// <MDBContainer style={{marginTop:20}}>
//           <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
//               Descargar Resultados
//           </MDBBtn>
//  </MDBContainer>
//  <br/>
//  <PDFExport
//           scale={0.6}
//           paperSize="A4"
//           margin="2cm"
//           ref={(component) => this.pdfExportComponent = component}
//           allPages= "true"
    
//       >
// <MDBContainer >
// <font face="arial" className = "mt-4" ><strong> ENCUESTA EEO. </strong> <br/> <strong>FILTRADO POR  :{this.state.filtro1} <br/>{this.state.filtro2} <br/> {this.state.filtro3}  <br/>{this.state.filtro4} <br/> {this.state.filtro5} <br/> {this.state.filtro7}<br/> {this.state.filtro8}</strong></font><br/>
// <font face="arial " className = "mt-4 " ><strong>{localStorage.getItem("razonsocial")}</strong> </font>

// <Table   responsive small borderless className="text-left mt-4 ">
// <TableHead>
// <TableRow>
//   <TableCell  width="13%" style={{backgroundColor: "#E6E7E8"}}>Resultados Generales</TableCell>
//     {celda}
//   <TableCell width="6%"  > <strong>   TOTAL {general}  Puntos </strong></TableCell>
//   <TableCell width="2%" ></TableCell>
//   <TableCell width="1%"  ></TableCell>
//  {criterios}
// </TableRow>
// </TableHead>
// </Table>
//  </MDBContainer>

// <TableContainer component={Paper} style={{marginBottom:30,marginTop:20}}>
//       <Table  size="small" aria-label="a dense table" >
//         <TableHead>
//           <TableRow>
//             <TableCell width="50%" ></TableCell>
//             <TableCell align="right" style={{backgroundColor: "#51EAFF"}}>Nulo</TableCell>
//             <TableCell align="right" style={{backgroundColor: "#76FEC5"}}>Bajo&nbsp;</TableCell>
//             <TableCell align="right" style={{backgroundColor: "#F4EDB2"}}>Medio&nbsp;</TableCell>
//             <TableCell align="right" style={{backgroundColor: "#F5E027"}}>Alto&nbsp;</TableCell>
//             <TableCell align="right" style={{backgroundColor: "#FF756B"}}>Muy Alto&nbsp;</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody  style={{marginTop:20}}>       
//             <TableRow>
//               <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados de la Categoría</strong></TableCell>              
//               <TableCell component="th" scope="row"></TableCell>
//               <TableCell component="th" scope="row" ></TableCell>
//               <TableCell component="th" scope="row" ></TableCell>
//               <TableCell component="th" scope="row" ></TableCell>
//               <TableCell component="th" scope="row" ></TableCell>  
//             </TableRow>
//             <TableRow>
//                 <TableCell component="th" scope="row" >I. Ambiente de Trabajo</TableCell>
//                 <TableCell component="th" scope="row" >{categoria1Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria1Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria1Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria1Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria1MuyAlto}</TableCell>           
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >II. Factores propios de la actividad</TableCell>   
//                 <TableCell component="th" scope="row" >{categoria2Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria2Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria2Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria2Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria2MuyAlto}</TableCell>    
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >III. Organización del tiempo de trabajo</TableCell>   
//                 <TableCell component="th" scope="row" >{categoria3Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria3Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria3Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria3Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria3MuyAlto}</TableCell>    
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >IV. Liderazgo y relaciones en el trabajo</TableCell>   
//                 <TableCell component="th" scope="row" >{categoria4Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria4Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria4Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria4Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria4MuyAlto}</TableCell>           
//                 </TableRow>

//                 <TableRow>
//                 <TableCell component="th" scope="row" >V. Entorno organizacional</TableCell>   
//                 <TableCell component="th" scope="row" >{categoria5Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria5Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria5Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria5Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{categoria5MuyAlto}</TableCell>           
//                 </TableRow>
               
//                 <TableRow>
//                   <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados del Dominio</strong></TableCell>              
//                   <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
//                   <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
//                   <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
//                   <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
//                   <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
    
//                 </TableRow>
                
//                 <TableRow>
//                 <TableCell component="th" scope="row" >I. Condiciones en el ambiente de trabajo</TableCell> 
//                 <TableCell component="th" scope="row" >{Dominio1Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio1Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio1Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio1Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio1MuyAlto}</TableCell>
    
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >II. Carga de trabajo</TableCell>    
//                 <TableCell component="th" scope="row" >{Dominio2Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio2Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio2Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio2Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio2MuyAlto}</TableCell>       
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >III. Falta de control sobre el trabajo</TableCell>     
//                 <TableCell component="th" scope="row" >{Dominio3Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio3Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio3Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio3Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio3MuyAlto}</TableCell>       
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >IV. Jornada de trabajo</TableCell>  
//                 <TableCell component="th" scope="row" >{Dominio4Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio4Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio4Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio4Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio4MuyAlto}</TableCell>         
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >V. Interferencia en la relación trabajo-familia</TableCell>           
//                 <TableCell component="th" scope="row" >{Dominio5Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio5Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio5Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio5Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio5MuyAlto}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >VI. Liderazgo</TableCell>    
//                 <TableCell component="th" scope="row" >{Dominio6Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio6Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio6Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio6Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio6MuyAlto}</TableCell>       
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >VII. Relaciones en el trabajo</TableCell>    
//                 <TableCell component="th" scope="row" >{Dominio7Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio7Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio7Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio7Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio7MuyAlto}</TableCell>       
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >VIII. Violencia</TableCell>    
//                 <TableCell component="th" scope="row" >{Dominio8Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio8Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio8Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio8Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio8MuyAlto}</TableCell>        
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >IX. Reconocimiento del desempeño</TableCell>    
//                 <TableCell component="th" scope="row" >{Dominio9Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio9Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio9Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio9Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio9MuyAlto}</TableCell>       
//                 </TableRow>
//                 <TableRow>
//                 <TableCell component="th" scope="row" >XX. Insuficiente sentido de pertenencia e, inestabilidad</TableCell>    
//                 <TableCell component="th" scope="row" >{Dominio10Nulo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio10Bajo}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio10Medio}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio10Alto}</TableCell>
//                 <TableCell component="th" scope="row" >{Dominio10MuyAlto}</TableCell>        
//                 </TableRow>
//                 <TableRow>
//               <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados Por Dimensión</strong></TableCell>              
//               <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
//               <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
//               <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
//               <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
//               <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              

//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >1.- Condiciones peligrosas e inseguras</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero1/length)+(entero3/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" width="50%" >2.- Condiciones deficientes e insalubres</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero2/length)+(entero4/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow> 
           
//             <TableRow>
//             <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{entero5/length}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" width="50%">4.- Cargas cuantitativas</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero6/length)+(entero12/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" width="50%">5.- Ritmos de trabajo acelerado</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero7/length)+(entero8/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero9/length)+(entero10/length)+(entero11/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero65/length)+(entero66/length)+(entero67/length)+(entero68/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >8.- Cargas de alta responsabilidad</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero13/length)+(entero14/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >9.- Cargas contradictorias o inconsistentes</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero15/length)+(entero16/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" width="50%" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero25/length)+(entero26/length)+(entero27/length)+(entero28/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero23/length)+(entero24/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>

//             <TableRow>
//             <TableCell component="th" scope="row" >12.- Insuficiente participación y manejo del cambio</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero29/length)+(entero30/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>



//             <TableRow>
//             <TableCell component="th" scope="row" >13.- Limitada o inexistente capacitación</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero35/length)+(entero36/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >14.- Jornadas de trabajo extensas</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero17/length)+(entero18/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >15.- Influencia del trabajo fuera del centro laboral</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero19/length)+(entero20/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >16.- Influencia de las responsabilidades familiares</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero21/length)+(entero22/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >17.- Escasa claridad de funciones</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero31/length)+(entero32/length)+(entero33/length)+(entero34/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >18.- Características del liderazgo</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero37/length)+(entero38/length)+(entero39/length)+(entero40/length)+(entero41/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >19.- Relaciones sociales en el trabajo</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero42/length)+(entero43/length)+(entero44/length)+(entero45/length)+(entero46/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >20.- Deficiente relación con los colaboradores que supervisa</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero69/length)+(entero70/length)+(entero71/length)+(entero72/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >21.- Violencia laboral</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero57/length)+(entero58/length)+(entero59/length)+(entero60/length)+(entero61/length)+(entero62/length)+(entero63/length)+(entero64/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >22.- Escasa o nula retroalimentación del desempeño</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero47/length)+(entero48/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>

//             <TableRow>
//             <TableCell component="th" scope="row" >23.- Escaso o nulo reconocimiento y compensación</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero49/length)+(entero50/length)+(entero51/length)+(entero52/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >24.- Limitado sentido de pertenencia</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero55/length)+(entero56/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
//             <TableRow>
//             <TableCell component="th" scope="row" >25.- Inestabilidad laboral</TableCell> 
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
//             <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero53)+(entero54/length)}</MDBBadge ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             <TableCell component="th" scope="row" ></TableCell>
//             </TableRow>
          
//         </TableBody>
//       </Table>
//     </TableContainer>
// </PDFExport>  
// </React.Fragment>
//    } 
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
               Resultados Globales de la Evaluacion Entorno Organizacional
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
               {/* {ponderacion} */}
              
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