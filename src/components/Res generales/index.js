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

     consultarDatosFiltrados = (datos,filtro) =>{
      
       console.log("datos de la table "  , datos)

       let array
       datos.map(rows=>{
         console.log("rows", rows.data[0])
       })
      // for (var i =0; i<=datos.length;i++){

      // console.log("datos[i]", datos[i].data[0])

      // }



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
      if(datos[0]){
        console.log("los datitos",datos[0])
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[0].data[0],datos[0].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
               
                console.log("datos[0] " , datos.data.data.getresultGlobalSurveyRP)
                 this.setState({peticion1:datos.data.data.getresultGlobalSurveyRP})
              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[1]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[1].data[0],datos[1].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[1]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion2:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[2]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[2].data[0],datos[2].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                 console.log("datos[2]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion3:datos.data.data.getresultGlobalSurveyRP})
              // console.log("this.state" , this.state.peticion3)
              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[3]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[3].data[0],datos[3].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[3]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion4:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[4]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[4].data[0],datos[4].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[4]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion5:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[5]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[5].data[0],datos[5].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[5]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion6:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[6]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[6].data[0],datos[5].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[6]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion7:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[7]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[7].data[0],datos[7].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[7]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion8:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[8]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[8].data[0],datos[8].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[8]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion9:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[9]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[9].data[0],datos[9].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[9]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion10:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[10]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[10].data[0],datos[10].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[10]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion11:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[11]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[11].data[0],datos[11].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[11]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion12:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[12]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[12].data[0],datos[12].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[12]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion13:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[13]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[13].data[0],datos[13].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[13]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion14:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  
      } if(datos[14]){
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyRP(data:"${[datos[14].data[0],datos[14].data[6]]}"){
              id 
              Respuestas 
              fk_preguntasRP
              fk_EmpleadosRP 
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
                console.log("datos[14]" , datos.data.data.getresultGlobalSurveyRP)
                this.setState({peticion15:datos.data.data.getresultGlobalSurveyRP})

              })
              .catch(err => {
                console.log("el error es  ",err)
              });  


    }

          
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


      
  let respuesta1,respuesta2,respuesta3,respuesta4,respuesta5,respuesta6,respuesta7,respuesta8,respuesta9,respuesta10,respuesta11,respuesta12;
  let respuesta13,respuesta14, respuesta15,respuesta16,respuesta17,respuesta18,respuesta19,respuesta20,respuesta21,respuesta22,respuesta23;
  let respuesta24,respuesta25,respuesta26,respuesta27,respuesta28,respuesta29,respuesta30,respuesta31,respuesta32,respuesta33,respuesta34;
  let respuesta35,respuesta36,respuesta37,respuesta38,respuesta39,respuesta40,respuesta41,respuesta42,respuesta43,respuesta44,respuesta45,respuesta46;
  let respuesta47,respuesta48,respuesta49,respuesta50,respuesta51,respuesta52,respuesta53,respuesta54,respuesta55,respuesta56,respuesta57;
  let respuesta58,respuesta59,respuesta60,respuesta61,respuesta62,respuesta63,respuesta64,respuesta65,respuesta66,respuesta67,respuesta68,respuesta69,respuesta70,respuesta71,respuesta72,respuesta73,respuesta74;
  let respuesta75,respuesta76,respuesta77,respuesta78,respuesta79,respuesta80,respuesta81,respuesta82,respuesta83,respuesta84,respuesta85,respuesta86;
  let respuesta87,respuesta88,respuesta89,respuesta90,respuesta91,respuesta92,respuesta93,respuesta94,respuesta95,respuesta96,respuesta97,respuesta98;
  let respuesta99,respuesta100,respuesta101,respuesta102,respuesta103,respuesta104,respuesta105,respuesta106,respuesta107,respuesta108,respuesta109;
  let respuesta110,respuesta111,respuesta112,respuesta113,respuesta114,respuesta115,respuesta116,respuesta117,respuesta118,respuesta119,respuesta120;
  let respuesta121,respuesta122,respuesta123,respuesta124,respuesta125,respuesta126,respuesta127,respuesta128,respuesta129,respuesta130,respuesta131,respuesta132;
  let respuesta133,respuesta134,respuesta135,respuesta136,respuesta137,respuesta138,respuesta139,respuesta140,respuesta141,respuesta142,respuesta143,respuesta144;
  let respuesta145,respuesta146,respuesta147,respuesta148,respuesta149,respuesta150,respuesta151,respuesta152,respuesta153,respuesta154,respuesta155;
  let respuesta156,respuesta157,respuesta158,respuesta159,respuesta160,respuesta161,respuesta162,respuesta163,respuesta164,respuesta165,respuesta166;
  let respuesta167,respuesta168,respuesta169,respuesta170,respuesta171,respuesta172,respuesta173,respuesta174,respuesta175,respuesta176,respuesta177;
  let respuesta178,respuesta179,respuesta180,respuesta181,respuesta182,respuesta183,respuesta184,respuesta185,respuesta186,respuesta187,respuesta188;
  let respuesta189,respuesta190,respuesta191,respuesta192,respuesta193,respuesta194,respuesta195,respuesta196,respuesta197,respuesta198,respuesta199;
  let respuesta200,respuesta201,respuesta202,respuesta203,respuesta204,respuesta205,respuesta206,respuesta207,respuesta208,respuesta209,respuesta210,respuesta211;
  let respuesta212,respuesta213,respuesta214,respuesta215,respuesta216,respuesta217,respuesta218,respuesta219,respuesta220,respuesta221,respuesta222,respuesta223;
  let respuesta224,respuesta225,respuesta226,respuesta227,respuesta228,respuesta229,respuesta230;  
  
  let valor1=0,valor2=0,valor3=0,valor4=0,valor5=0,valor6=0,valor7=0, valor8=0,valor9=0,valor10=0;
  let valor11=0,valor12=0,valor13=0,valor14=0,valor15=0,valor16=0,valor17=0, valor18=0,valor19=0,valor20=0;
  let valor21=0,valor22=0,valor23=0,valor24=0,valor25=0,valor26=0,valor27=0, valor28=0,valor29=0,valor30=0;
  let valor31=0,valor32=0,valor33=0,valor34=0,valor35=0,valor36=0,valor37=0, valor38=0,valor39=0,valor40=0;
  let valor41=0,valor42=0,valor43=0,valor44=0,valor45=0,valor46=0;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
  let pet2res1,pet2res2,pet2res3,pet2res4,pet2res5,pet2res6,pet2res7,pet2res8,pet2res9,pet2res10,pet2res11,pet2res12;
  let pet2res13,pet2res14, pet2res15,pet2res16,pet2res17,pet2res18,pet2res19,pet2res20,pet2res21,pet2res22,pet2res23;
  let pet2res24,pet2res25,pet2res26,pet2res27,pet2res28,pet2res29,pet2res30,pet2res31,pet2res32,pet2res33,pet2res34;
  let pet2res35,pet2res36,pet2res37,pet2res38,pet2res39,pet2res40,pet2res41,pet2res42,pet2res43,pet2res44,pet2res45,pet2res46;
  let pet2res47,pet2res48,pet2res49,pet2res50,pet2res51,pet2res52,pet2res53,pet2res54,pet2res55,pet2res56,pet2res57;
  let pet2res58,pet2res59,pet2res60,pet2res61,pet2res62,pet2res63,pet2res64,pet2res65,pet2res66,pet2res67,pet2res68,pet2res69,pet2res70,pet2res71,pet2res72,pet2res73,pet2res74;
  let pet2res75,pet2res76,pet2res77,pet2res78,pet2res79,pet2res80,pet2res81,pet2res82,pet2res83,pet2res84,pet2res85,pet2res86;
  let pet2res87,pet2res88,pet2res89,pet2res90,pet2res91,pet2res92,pet2res93,pet2res94,pet2res95,pet2res96,pet2res97,pet2res98;
  let pet2res99,pet2res100,pet2res101,pet2res102,pet2res103,pet2res104,pet2res105,pet2res106,pet2res107,pet2res108,pet2res109;
  let pet2res110,pet2res111,pet2res112,pet2res113,pet2res114,pet2res115,pet2res116,pet2res117,pet2res118,pet2res119,pet2res120;
  let pet2res121,pet2res122,pet2res123,pet2res124,pet2res125,pet2res126,pet2res127,pet2res128,pet2res129,pet2res130,pet2res131,pet2res132;
  let pet2res133,pet2res134,pet2res135,pet2res136,pet2res137,pet2res138,pet2res139,pet2res140,pet2res141,pet2res142,pet2res143,pet2res144;
  let pet2res145,pet2res146,pet2res147,pet2res148,pet2res149,pet2res150,pet2res151,pet2res152,pet2res153,pet2res154,pet2res155;
  let pet2res156,pet2res157,pet2res158,pet2res159,pet2res160,pet2res161,pet2res162,pet2res163,pet2res164,pet2res165,pet2res166;
  let pet2res167,pet2res168,pet2res169,pet2res170,pet2res171,pet2res172,pet2res173,pet2res174,pet2res175,pet2res176,pet2res177;
  let pet2res178,pet2res179,pet2res180,pet2res181,pet2res182,pet2res183,pet2res184,pet2res185,pet2res186,pet2res187,pet2res188;
  let pet2res189,pet2res190,pet2res191,pet2res192,pet2res193,pet2res194,pet2res195,pet2res196,pet2res197,pet2res198,pet2res199;
  let pet2res200,pet2res201,pet2res202,pet2res203,pet2res204,pet2res205,pet2res206,pet2res207,pet2res208,pet2res209,pet2res210,pet2res211;
  let pet2res212,pet2res213,pet2res214,pet2res215,pet2res216,pet2res217,pet2res218,pet2res219,pet2res220,pet2res221,pet2res222,pet2res223;
  let pet2res224,pet2res225,pet2res226,pet2res227,pet2res228,pet2res229,pet2res230;  
  
  let pet2val1=0,pet2val2=0,pet2val3=0,pet2val4=0,pet2val5=0,pet2val6=0,pet2val7=0, pet2val8=0,pet2val9=0,pet2val10=0;
  let pet2val11=0,pet2val12=0,pet2val13=0,pet2val14=0,pet2val15=0,pet2val16=0,pet2val17=0, pet2val18=0,pet2val19=0,pet2val20=0;
  let pet2val21=0,pet2val22=0,pet2val23=0,pet2val24=0,pet2val25=0,pet2val26=0,pet2val27=0, pet2val28=0,pet2val29=0,pet2val30=0;
  let pet2val31=0,pet2val32=0,pet2val33=0,pet2val34=0,pet2val35=0,pet2val36=0,pet2val37=0, pet2val38=0,pet2val39=0,pet2val40=0;
  let pet2val41=0,pet2val42=0,pet2val43=0,pet2val44=0,pet2val45=0,pet2val46=0;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  let pet3res1,pet3res2,pet3res3,pet3res4,pet3res5,pet3res6,pet3res7,pet3res8,pet3res9,pet3res10,pet3res11,pet3res12;
  let pet3res13,pet3res14, pet3res15,pet3res16,pet3res17,pet3res18,pet3res19,pet3res20,pet3res21,pet3res22,pet3res23;
  let pet3res24,pet3res25,pet3res26,pet3res27,pet3res28,pet3res29,pet3res30,pet3res31,pet3res32,pet3res33,pet3res34;
  let pet3res35,pet3res36,pet3res37,pet3res38,pet3res39,pet3res40,pet3res41,pet3res42,pet3res43,pet3res44,pet3res45,pet3res46;
  let pet3res47,pet3res48,pet3res49,pet3res50,pet3res51,pet3res52,pet3res53,pet3res54,pet3res55,pet3res56,pet3res57;
  let pet3res58,pet3res59,pet3res60,pet3res61,pet3res62,pet3res63,pet3res64,pet3res65,pet3res66,pet3res67,pet3res68,pet3res69,pet3res70,pet3res71,pet3res72,pet3res73,pet3res74;
  let pet3res75,pet3res76,pet3res77,pet3res78,pet3res79,pet3res80,pet3res81,pet3res82,pet3res83,pet3res84,pet3res85,pet3res86;
  let pet3res87,pet3res88,pet3res89,pet3res90,pet3res91,pet3res92,pet3res93,pet3res94,pet3res95,pet3res96,pet3res97,pet3res98;
  let pet3res99,pet3res100,pet3res101,pet3res102,pet3res103,pet3res104,pet3res105,pet3res106,pet3res107,pet3res108,pet3res109;
  let pet3res110,pet3res111,pet3res112,pet3res113,pet3res114,pet3res115,pet3res116,pet3res117,pet3res118,pet3res119,pet3res120;
  let pet3res121,pet3res122,pet3res123,pet3res124,pet3res125,pet3res126,pet3res127,pet3res128,pet3res129,pet3res130,pet3res131,pet3res132;
  let pet3res133,pet3res134,pet3res135,pet3res136,pet3res137,pet3res138,pet3res139,pet3res140,pet3res141,pet3res142,pet3res143,pet3res144;
  let pet3res145,pet3res146,pet3res147,pet3res148,pet3res149,pet3res150,pet3res151,pet3res152,pet3res153,pet3res154,pet3res155;
  let pet3res156,pet3res157,pet3res158,pet3res159,pet3res160,pet3res161,pet3res162,pet3res163,pet3res164,pet3res165,pet3res166;
  let pet3res167,pet3res168,pet3res169,pet3res170,pet3res171,pet3res172,pet3res173,pet3res174,pet3res175,pet3res176,pet3res177;
  let pet3res178,pet3res179,pet3res180,pet3res181,pet3res182,pet3res183,pet3res184,pet3res185,pet3res186,pet3res187,pet3res188;
  let pet3res189,pet3res190,pet3res191,pet3res192,pet3res193,pet3res194,pet3res195,pet3res196,pet3res197,pet3res198,pet3res199;
  let pet3res200,pet3res201,pet3res202,pet3res203,pet3res204,pet3res205,pet3res206,pet3res207,pet3res208,pet3res209,pet3res210,pet3res211;
  let pet3res212,pet3res213,pet3res214,pet3res215,pet3res216,pet3res217,pet3res218,pet3res219,pet3res220,pet3res221,pet3res222,pet3res223;
  let pet3res224,pet3res225,pet3res226,pet3res227,pet3res228,pet3res229,pet3res230;  
  
  let pet3val1=0,pet3val2=0,pet3val3=0,pet3val4=0,pet3val5=0,pet3val6=0,pet3val7=0, pet3val8=0,pet3val9=0,pet3val10=0;
  let pet3val11=0,pet3val12=0,pet3val13=0,pet3val14=0,pet3val15=0,pet3val16=0,pet3val17=0, pet3val18=0,pet3val19=0,pet3val20=0;
  let pet3val21=0,pet3val22=0,pet3val23=0,pet3val24=0,pet3val25=0,pet3val26=0,pet3val27=0, pet3val28=0,pet3val29=0,pet3val30=0;
  let pet3val31=0,pet3val32=0,pet3val33=0,pet3val34=0,pet3val35=0,pet3val36=0,pet3val37=0, pet3val38=0,pet3val39=0,pet3val40=0;
  let pet3val41=0,pet3val42=0,pet3val43=0,pet3val44=0,pet3val45=0,pet3val46=0;
  /////////////////////////////////////////////////////////////////////////////////////////////////77777777

  let pet4res1,pet4res2,pet4res3,pet4res4,pet4res5,pet4res6,pet4res7,pet4res8,pet4res9,pet4res10,pet4res11,pet4res12;
  let pet4res13,pet4res14, pet4res15,pet4res16,pet4res17,pet4res18,pet4res19,pet4res20,pet4res21,pet4res22,pet4res23;
  let pet4res24,pet4res25,pet4res26,pet4res27,pet4res28,pet4res29,pet4res30,pet4res31,pet4res32,pet4res33,pet4res34;
  let pet4res35,pet4res36,pet4res37,pet4res38,pet4res39,pet4res40,pet4res41,pet4res42,pet4res43,pet4res44,pet4res45,pet4res46;
  let pet4res47,pet4res48,pet4res49,pet4res50,pet4res51,pet4res52,pet4res53,pet4res54,pet4res55,pet4res56,pet4res57;
  let pet4res58,pet4res59,pet4res60,pet4res61,pet4res62,pet4res63,pet4res64,pet4res65,pet4res66,pet4res67,pet4res68,pet4res69,pet4res70,pet4res71,pet4res72,pet4res73,pet4res74;
  let pet4res75,pet4res76,pet4res77,pet4res78,pet4res79,pet4res80,pet4res81,pet4res82,pet4res83,pet4res84,pet4res85,pet4res86;
  let pet4res87,pet4res88,pet4res89,pet4res90,pet4res91,pet4res92,pet4res93,pet4res94,pet4res95,pet4res96,pet4res97,pet4res98;
  let pet4res99,pet4res100,pet4res101,pet4res102,pet4res103,pet4res104,pet4res105,pet4res106,pet4res107,pet4res108,pet4res109;
  let pet4res110,pet4res111,pet4res112,pet4res113,pet4res114,pet4res115,pet4res116,pet4res117,pet4res118,pet4res119,pet4res120;
  let pet4res121,pet4res122,pet4res123,pet4res124,pet4res125,pet4res126,pet4res127,pet4res128,pet4res129,pet4res130,pet4res131,pet4res132;
  let pet4res133,pet4res134,pet4res135,pet4res136,pet4res137,pet4res138,pet4res139,pet4res140,pet4res141,pet4res142,pet4res143,pet4res144;
  let pet4res145,pet4res146,pet4res147,pet4res148,pet4res149,pet4res150,pet4res151,pet4res152,pet4res153,pet4res154,pet4res155;
  let pet4res156,pet4res157,pet4res158,pet4res159,pet4res160,pet4res161,pet4res162,pet4res163,pet4res164,pet4res165,pet4res166;
  let pet4res167,pet4res168,pet4res169,pet4res170,pet4res171,pet4res172,pet4res173,pet4res174,pet4res175,pet4res176,pet4res177;
  let pet4res178,pet4res179,pet4res180,pet4res181,pet4res182,pet4res183,pet4res184,pet4res185,pet4res186,pet4res187,pet4res188;
  let pet4res189,pet4res190,pet4res191,pet4res192,pet4res193,pet4res194,pet4res195,pet4res196,pet4res197,pet4res198,pet4res199;
  let pet4res200,pet4res201,pet4res202,pet4res203,pet4res204,pet4res205,pet4res206,pet4res207,pet4res208,pet4res209,pet4res210,pet4res211;
  let pet4res212,pet4res213,pet4res214,pet4res215,pet4res216,pet4res217,pet4res218,pet4res219,pet4res220,pet4res221,pet4res222,pet4res223;
  let pet4res224,pet4res225,pet4res226,pet4res227,pet4res228,pet4res229,pet4res230;  
  
  let pet4val1=0, pet4val2=0,pet4val3=0,pet4val4=0,pet4val5=0,pet4val6=0,pet4val7=0, pet4val8=0,pet4val9=0,pet4val10 =0;
  let pet4val11=0,pet4val12=0,pet4val13=0,pet4val14=0,pet4val15=0,pet4val16=0,pet4val17=0, pet4val18=0,pet4val19=0,pet4val20=0;
  let pet4val21=0,pet4val22=0,pet4val23=0,pet4val24=0,pet4val25=0,pet4val26=0,pet4val27=0, pet4val28=0,pet4val29=0,pet4val30=0;
  let pet4val31=0,pet4val32=0,pet4val33=0,pet4val34=0,pet4val35=0,pet4val36=0,pet4val37=0, pet4val38=0,pet4val39=0,pet4val40=0;
  let pet4val41=0,pet4val42=0,pet4val43=0,pet4val44=0,pet4val45=0,pet4val46=0;


//////////////////////////////////////////////////////////////////////////////////////////////////////
let pet5res1,pet5res2,pet5res3,pet5res4,pet5res5,pet5res6,pet5res7,pet5res8,pet5res9,pet5res10,pet5res11,pet5res12;
  let pet5res13,pet5res14, pet5res15,pet5res16,pet5res17,pet5res18,pet5res19,pet5res20,pet5res21,pet5res22,pet5res23;
  let pet5res24,pet5res25,pet5res26,pet5res27,pet5res28,pet5res29,pet5res30,pet5res31,pet5res32,pet5res33,pet5res34;
  let pet5res35,pet5res36,pet5res37,pet5res38,pet5res39,pet5res40,pet5res41,pet5res42,pet5res43,pet5res44,pet5res45,pet5res46;
  let pet5res47,pet5res48,pet5res49,pet5res50,pet5res51,pet5res52,pet5res53,pet5res54,pet5res55,pet5res56,pet5res57;
  let pet5res58,pet5res59,pet5res60,pet5res61,pet5res62,pet5res63,pet5res64,pet5res65,pet5res66,pet5res67,pet5res68,pet5res69,pet5res70,pet5res71,pet5res72,pet5res73,pet5res74;
  let pet5res75,pet5res76,pet5res77,pet5res78,pet5res79,pet5res80,pet5res81,pet5res82,pet5res83,pet5res84,pet5res85,pet5res86;
  let pet5res87,pet5res88,pet5res89,pet5res90,pet5res91,pet5res92,pet5res93,pet5res94,pet5res95,pet5res96,pet5res97,pet5res98;
  let pet5res99,pet5res100,pet5res101,pet5res102,pet5res103,pet5res104,pet5res105,pet5res106,pet5res107,pet5res108,pet5res109;
  let pet5res110,pet5res111,pet5res112,pet5res113,pet5res114,pet5res115,pet5res116,pet5res117,pet5res118,pet5res119,pet5res120;
  let pet5res121,pet5res122,pet5res123,pet5res124,pet5res125,pet5res126,pet5res127,pet5res128,pet5res129,pet5res130,pet5res131,pet5res132;
  let pet5res133,pet5res134,pet5res135,pet5res136,pet5res137,pet5res138,pet5res139,pet5res140,pet5res141,pet5res142,pet5res143,pet5res144;
  let pet5res145,pet5res146,pet5res147,pet5res148,pet5res149,pet5res150,pet5res151,pet5res152,pet5res153,pet5res154,pet5res155;
  let pet5res156,pet5res157,pet5res158,pet5res159,pet5res160,pet5res161,pet5res162,pet5res163,pet5res164,pet5res165,pet5res166;
  let pet5res167,pet5res168,pet5res169,pet5res170,pet5res171,pet5res172,pet5res173,pet5res174,pet5res175,pet5res176,pet5res177;
  let pet5res178,pet5res179,pet5res180,pet5res181,pet5res182,pet5res183,pet5res184,pet5res185,pet5res186,pet5res187,pet5res188;
  let pet5res189,pet5res190,pet5res191,pet5res192,pet5res193,pet5res194,pet5res195,pet5res196,pet5res197,pet5res198,pet5res199;
  let pet5res200,pet5res201,pet5res202,pet5res203,pet5res204,pet5res205,pet5res206,pet5res207,pet5res208,pet5res209,pet5res210,pet5res211;
  let pet5res212,pet5res213,pet5res214,pet5res215,pet5res216,pet5res217,pet5res218,pet5res219,pet5res220,pet5res221,pet5res222,pet5res223;
  let pet5res224,pet5res225,pet5res226,pet5res227,pet5res228,pet5res229,pet5res230;  
  
  let pet5val1=0,pet5val2=0,pet5val3=0,pet5val4=0,pet5val5=0,pet5val6=0,pet5val7=0, pet5val8=0,pet5val9=0,pet5val10=0;
  let pet5val11=0,pet5val12=0,pet5val13=0,pet5val14=0,pet5val15=0,pet5val16=0,pet5val17=0, pet5val18=0,pet5val19=0,pet5val20=0;
  let pet5val21=0,pet5val22=0,pet5val23=0,pet5val24=0,pet5val25=0,pet5val26=0,pet5val27=0, pet5val28=0,pet5val29=0,pet5val30=0;
  let pet5val31=0,pet5val32=0,pet5val33=0,pet5val34=0,pet5val35=0,pet5val36=0,pet5val37=0, pet5val38=0,pet5val39=0,pet5val40=0;
  let pet5val41=0,pet5val42=0,pet5val43=0,pet5val44=0,pet5val45=0,pet5val46=0;
////////////////////////////////////////////////////////////////////////////////////////////////////////////777
let pet6res1,pet6res2,pet6res3,pet6res4,pet6res5,pet6res6,pet6res7,pet6res8,pet6res9,pet6res10,pet6res11,pet6res12;
let pet6res13,pet6res14, pet6res15,pet6res16,pet6res17,pet6res18,pet6res19,pet6res20,pet6res21,pet6res22,pet6res23;
let pet6res24,pet6res25,pet6res26,pet6res27,pet6res28,pet6res29,pet6res30,pet6res31,pet6res32,pet6res33,pet6res34;
let pet6res35,pet6res36,pet6res37,pet6res38,pet6res39,pet6res40,pet6res41,pet6res42,pet6res43,pet6res44,pet6res45,pet6res46;
let pet6res47,pet6res48,pet6res49,pet6res50,pet6res51,pet6res52,pet6res53,pet6res54,pet6res55,pet6res56,pet6res57;
let pet6res58,pet6res59,pet6res60,pet6res61,pet6res62,pet6res63,pet6res64,pet6res65,pet6res66,pet6res67,pet6res68,pet6res69,pet6res70,pet6res71,pet6res72,pet6res73,pet6res74;
let pet6res75,pet6res76,pet6res77,pet6res78,pet6res79,pet6res80,pet6res81,pet6res82,pet6res83,pet6res84,pet6res85,pet6res86;
let pet6res87,pet6res88,pet6res89,pet6res90,pet6res91,pet6res92,pet6res93,pet6res94,pet6res95,pet6res96,pet6res97,pet6res98;
let pet6res99,pet6res100,pet6res101,pet6res102,pet6res103,pet6res104,pet6res105,pet6res106,pet6res107,pet6res108,pet6res109;
let pet6res110,pet6res111,pet6res112,pet6res113,pet6res114,pet6res115,pet6res116,pet6res117,pet6res118,pet6res119,pet6res120;
let pet6res121,pet6res122,pet6res123,pet6res124,pet6res125,pet6res126,pet6res127,pet6res128,pet6res129,pet6res130,pet6res131,pet6res132;
let pet6res133,pet6res134,pet6res135,pet6res136,pet6res137,pet6res138,pet6res139,pet6res140,pet6res141,pet6res142,pet6res143,pet6res144;
let pet6res145,pet6res146,pet6res147,pet6res148,pet6res149,pet6res150,pet6res151,pet6res152,pet6res153,pet6res154,pet6res155;
let pet6res156,pet6res157,pet6res158,pet6res159,pet6res160,pet6res161,pet6res162,pet6res163,pet6res164,pet6res165,pet6res166;
let pet6res167,pet6res168,pet6res169,pet6res170,pet6res171,pet6res172,pet6res173,pet6res174,pet6res175,pet6res176,pet6res177;
let pet6res178,pet6res179,pet6res180,pet6res181,pet6res182,pet6res183,pet6res184,pet6res185,pet6res186,pet6res187,pet6res188;
let pet6res189,pet6res190,pet6res191,pet6res192,pet6res193,pet6res194,pet6res195,pet6res196,pet6res197,pet6res198,pet6res199;
let pet6res200,pet6res201,pet6res202,pet6res203,pet6res204,pet6res205,pet6res206,pet6res207,pet6res208,pet6res209,pet6res210,pet6res211;
let pet6res212,pet6res213,pet6res214,pet6res215,pet6res216,pet6res217,pet6res218,pet6res219,pet6res220,pet6res221,pet6res222,pet6res223;
let pet6res224,pet6res225,pet6res226,pet6res227,pet6res228,pet6res229,pet6res230;  

let pet6val1=0,pet6val2=0,pet6val3=0,pet6val4=0,pet6val5=0,pet6val6=0,pet6val7=0, pet6val8=0,pet6val9=0,pet6val10=0;
let pet6val11=0,pet6val12=0,pet6val13=0,pet6val14=0,pet6val15=0,pet6val16=0,pet6val17=0, pet6val18=0,pet6val19=0,pet6val20=0;
let pet6val21=0,pet6val22=0,pet6val23=0,pet6val24=0,pet6val25=0,pet6val26=0,pet6val27=0, pet6val28=0,pet6val29=0,pet6val30=0;
let pet6val31=0,pet6val32=0,pet6val33=0,pet6val34=0,pet6val35=0,pet6val36=0,pet6val37=0, pet6val38=0,pet6val39=0,pet6val40=0;
let pet6val41=0,pet6val42=0,pet6val43=0,pet6val44=0,pet6val45=0,pet6val46=0;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let pet7res1,pet7res2,pet7res3,pet7res4,pet7res5,pet7res6,pet7res7,pet7res8,pet7res9,pet7res10,pet7res11,pet7res12;
let pet7res13,pet7res14, pet7res15,pet7res16,pet7res17,pet7res18,pet7res19,pet7res20,pet7res21,pet7res22,pet7res23;
let pet7res24,pet7res25,pet7res26,pet7res27,pet7res28,pet7res29,pet7res30,pet7res31,pet7res32,pet7res33,pet7res34;
let pet7res35,pet7res36,pet7res37,pet7res38,pet7res39,pet7res40,pet7res41,pet7res42,pet7res43,pet7res44,pet7res45,pet7res46;
let pet7res47,pet7res48,pet7res49,pet7res50,pet7res51,pet7res52,pet7res53,pet7res54,pet7res55,pet7res56,pet7res57;
let pet7res58,pet7res59,pet7res60,pet7res61,pet7res62,pet7res63,pet7res64,pet7res65,pet7res66,pet7res67,pet7res68,pet7res69,pet7res70,pet7res71,pet7res72,pet7res73,pet7res74;
let pet7res75,pet7res76,pet7res77,pet7res78,pet7res79,pet7res80,pet7res81,pet7res82,pet7res83,pet7res84,pet7res85,pet7res86;
let pet7res87,pet7res88,pet7res89,pet7res90,pet7res91,pet7res92,pet7res93,pet7res94,pet7res95,pet7res96,pet7res97,pet7res98;
let pet7res99,pet7res100,pet7res101,pet7res102,pet7res103,pet7res104,pet7res105,pet7res106,pet7res107,pet7res108,pet7res109;
let pet7res110,pet7res111,pet7res112,pet7res113,pet7res114,pet7res115,pet7res116,pet7res117,pet7res118,pet7res119,pet7res120;
let pet7res121,pet7res122,pet7res123,pet7res124,pet7res125,pet7res126,pet7res127,pet7res128,pet7res129,pet7res130,pet7res131,pet7res132;
let pet7res133,pet7res134,pet7res135,pet7res136,pet7res137,pet7res138,pet7res139,pet7res140,pet7res141,pet7res142,pet7res143,pet7res144;
let pet7res145,pet7res146,pet7res147,pet7res148,pet7res149,pet7res150,pet7res151,pet7res152,pet7res153,pet7res154,pet7res155;
let pet7res156,pet7res157,pet7res158,pet7res159,pet7res160,pet7res161,pet7res162,pet7res163,pet7res164,pet7res165,pet7res166;
let pet7res167,pet7res168,pet7res169,pet7res170,pet7res171,pet7res172,pet7res173,pet7res174,pet7res175,pet7res176,pet7res177;
let pet7res178,pet7res179,pet7res180,pet7res181,pet7res182,pet7res183,pet7res184,pet7res185,pet7res186,pet7res187,pet7res188;
let pet7res189,pet7res190,pet7res191,pet7res192,pet7res193,pet7res194,pet7res195,pet7res196,pet7res197,pet7res198,pet7res199;
let pet7res200,pet7res201,pet7res202,pet7res203,pet7res204,pet7res205,pet7res206,pet7res207,pet7res208,pet7res209,pet7res210,pet7res211;
let pet7res212,pet7res213,pet7res214,pet7res215,pet7res216,pet7res217,pet7res218,pet7res219,pet7res220,pet7res221,pet7res222,pet7res223;
let pet7res224,pet7res225,pet7res226,pet7res227,pet7res228,pet7res229,pet7res230;  

let pet7val1=0,pet7val2=0,pet7val3=0,pet7val4=0,pet7val5=0,pet7val6=0,pet7val7=0, pet7val8=0,pet7val9=0,pet7val10=0;
let pet7val11=0,pet7val12=0,pet7val13=0,pet7val14=0,pet7val15=0,pet7val16=0,pet7val17=0, pet7val18=0,pet7val19=0,pet7val20=0;
let pet7val21=0,pet7val22=0,pet7val23=0,pet7val24=0,pet7val25=0,pet7val26=0,pet7val27=0, pet7val28=0,pet7val29=0,pet7val30=0;
let pet7val31=0,pet7val32=0,pet7val33=0,pet7val34=0,pet7val35=0,pet7val36=0,pet7val37=0, pet7val38=0,pet7val39=0,pet7val40=0;
let pet7val41=0,pet7val42=0,pet7val43=0,pet7val44=0,pet7val45=0,pet7val46=0;
//////////////////////////////////////////////////////////////////////////////////////
let pet8res1,pet8res2,pet8res3,pet8res4,pet8res5,pet8res6,pet8res7,pet8res8,pet8res9,pet8res10,pet8res11,pet8res12;
let pet8res13,pet8res14, pet8res15,pet8res16,pet8res17,pet8res18,pet8res19,pet8res20,pet8res21,pet8res22,pet8res23;
let pet8res24,pet8res25,pet8res26,pet8res27,pet8res28,pet8res29,pet8res30,pet8res31,pet8res32,pet8res33,pet8res34;
let pet8res35,pet8res36,pet8res37,pet8res38,pet8res39,pet8res40,pet8res41,pet8res42,pet8res43,pet8res44,pet8res45,pet8res46;
let pet8res47,pet8res48,pet8res49,pet8res50,pet8res51,pet8res52,pet8res53,pet8res54,pet8res55,pet8res56,pet8res57;
let pet8res58,pet8res59,pet8res60,pet8res61,pet8res62,pet8res63,pet8res64,pet8res65,pet8res66,pet8res67,pet8res68,pet8res69,pet8res70,pet8res71,pet8res72,pet8res73,pet8res74;
let pet8res75,pet8res76,pet8res77,pet8res78,pet8res79,pet8res80,pet8res81,pet8res82,pet8res83,pet8res84,pet8res85,pet8res86;
let pet8res87,pet8res88,pet8res89,pet8res90,pet8res91,pet8res92,pet8res93,pet8res94,pet8res95,pet8res96,pet8res97,pet8res98;
let pet8res99,pet8res100,pet8res101,pet8res102,pet8res103,pet8res104,pet8res105,pet8res106,pet8res107,pet8res108,pet8res109;
let pet8res110,pet8res111,pet8res112,pet8res113,pet8res114,pet8res115,pet8res116,pet8res117,pet8res118,pet8res119,pet8res120;
let pet8res121,pet8res122,pet8res123,pet8res124,pet8res125,pet8res126,pet8res127,pet8res128,pet8res129,pet8res130,pet8res131,pet8res132;
let pet8res133,pet8res134,pet8res135,pet8res136,pet8res137,pet8res138,pet8res139,pet8res140,pet8res141,pet8res142,pet8res143,pet8res144;
let pet8res145,pet8res146,pet8res147,pet8res148,pet8res149,pet8res150,pet8res151,pet8res152,pet8res153,pet8res154,pet8res155;
let pet8res156,pet8res157,pet8res158,pet8res159,pet8res160,pet8res161,pet8res162,pet8res163,pet8res164,pet8res165,pet8res166;
let pet8res167,pet8res168,pet8res169,pet8res170,pet8res171,pet8res172,pet8res173,pet8res174,pet8res175,pet8res176,pet8res177;
let pet8res178,pet8res179,pet8res180,pet8res181,pet8res182,pet8res183,pet8res184,pet8res185,pet8res186,pet8res187,pet8res188;
let pet8res189,pet8res190,pet8res191,pet8res192,pet8res193,pet8res194,pet8res195,pet8res196,pet8res197,pet8res198,pet8res199;
let pet8res200,pet8res201,pet8res202,pet8res203,pet8res204,pet8res205,pet8res206,pet8res207,pet8res208,pet8res209,pet8res210,pet8res211;
let pet8res212,pet8res213,pet8res214,pet8res215,pet8res216,pet8res217,pet8res218,pet8res219,pet8res220,pet8res221,pet8res222,pet8res223;
let pet8res224,pet8res225,pet8res226,pet8res227,pet8res228,pet8res229,pet8res230;  

let pet8val1=0,pet8val2=0,pet8val3=0,pet8val4=0,pet8val5=0,pet8val6=0,pet8val7=0, pet8val8=0,pet8val9=0,pet8val10=0;
let pet8val11=0,pet8val12=0,pet8val13=0,pet8val14=0,pet8val15=0,pet8val16=0,pet8val17=0, pet8val18=0,pet8val19=0,pet8val20=0;
let pet8val21=0,pet8val22=0,pet8val23=0,pet8val24=0,pet8val25=0,pet8val26=0,pet8val27=0, pet8val28=0,pet8val29=0,pet8val30=0;
let pet8val31=0,pet8val32=0,pet8val33=0,pet8val34=0,pet8val35=0,pet8val36=0,pet8val37=0, pet8val38=0,pet8val39=0,pet8val40=0;
let pet8val41=0,pet8val42=0,pet8val43=0,pet8val44=0,pet8val45=0,pet8val46=0;
  let totalpet1,totalpet2,totalpet3,totalpet4,totalpet5,totalpet6,totalpet7,totalpet8,totalpet9,totalpet10,totalpet11,totalpet12,totalpet13,totalpet14,totalpet15;
//////////////////////////////////////////////////////////////////////////////////////////7777
let pet9res1,pet9res2,pet9res3,pet9res4,pet9res5,pet9res6,pet9res7,pet9res8,pet9res9,pet9res10,pet9res11,pet9res12;
let pet9res13,pet9res14, pet9res15,pet9res16,pet9res17,pet9res18,pet9res19,pet9res20,pet9res21,pet9res22,pet9res23;
let pet9res24,pet9res25,pet9res26,pet9res27,pet9res28,pet9res29,pet9res30,pet9res31,pet9res32,pet9res33,pet9res34;
let pet9res35,pet9res36,pet9res37,pet9res38,pet9res39,pet9res40,pet9res41,pet9res42,pet9res43,pet9res44,pet9res45,pet9res46;
let pet9res47,pet9res48,pet9res49,pet9res50,pet9res51,pet9res52,pet9res53,pet9res54,pet9res55,pet9res56,pet9res57;
let pet9res58,pet9res59,pet9res60,pet9res61,pet9res62,pet9res63,pet9res64,pet9res65,pet9res66,pet9res67,pet9res68,pet9res69,pet9res70,pet9res71,pet9res72,pet9res73,pet9res74;
let pet9res75,pet9res76,pet9res77,pet9res78,pet9res79,pet9res80,pet9res81,pet9res82,pet9res83,pet9res84,pet9res85,pet9res86;
let pet9res87,pet9res88,pet9res89,pet9res90,pet9res91,pet9res92,pet9res93,pet9res94,pet9res95,pet9res96,pet9res97,pet9res98;
let pet9res99,pet9res100,pet9res101,pet9res102,pet9res103,pet9res104,pet9res105,pet9res106,pet9res107,pet9res108,pet9res109;
let pet9res110,pet9res111,pet9res112,pet9res113,pet9res114,pet9res115,pet9res116,pet9res117,pet9res118,pet9res119,pet9res120;
let pet9res121,pet9res122,pet9res123,pet9res124,pet9res125,pet9res126,pet9res127,pet9res128,pet9res129,pet9res130,pet9res131,pet9res132;
let pet9res133,pet9res134,pet9res135,pet9res136,pet9res137,pet9res138,pet9res139,pet9res140,pet9res141,pet9res142,pet9res143,pet9res144;
let pet9res145,pet9res146,pet9res147,pet9res148,pet9res149,pet9res150,pet9res151,pet9res152,pet9res153,pet9res154,pet9res155;
let pet9res156,pet9res157,pet9res158,pet9res159,pet9res160,pet9res161,pet9res162,pet9res163,pet9res164,pet9res165,pet9res166;
let pet9res167,pet9res168,pet9res169,pet9res170,pet9res171,pet9res172,pet9res173,pet9res174,pet9res175,pet9res176,pet9res177;
let pet9res178,pet9res179,pet9res180,pet9res181,pet9res182,pet9res183,pet9res184,pet9res185,pet9res186,pet9res187,pet9res188;
let pet9res189,pet9res190,pet9res191,pet9res192,pet9res193,pet9res194,pet9res195,pet9res196,pet9res197,pet9res198,pet9res199;
let pet9res200,pet9res201,pet9res202,pet9res203,pet9res204,pet9res205,pet9res206,pet9res207,pet9res208,pet9res209,pet9res210,pet9res211;
let pet9res212,pet9res213,pet9res214,pet9res215,pet9res216,pet9res217,pet9res218,pet9res219,pet9res220,pet9res221,pet9res222,pet9res223;
let pet9res224,pet9res225,pet9res226,pet9res227,pet9res228,pet9res229,pet9res230;  

let pet9val1=0,pet9val2=0,pet9val3=0,pet9val4=0,pet9val5=0,pet9val6=0,pet9val7=0, pet9val8=0,pet9val9=0,pet9val10=0;
let pet9val11=0,pet9val12=0,pet9val13=0,pet9val14=0,pet9val15=0,pet9val16=0,pet9val17=0, pet9val18=0,pet9val19=0,pet9val20=0;
let pet9val21=0,pet9val22=0,pet9val23=0,pet9val24=0,pet9val25=0,pet9val26=0,pet9val27=0, pet9val28=0,pet9val29=0,pet9val30=0;
let pet9val31=0,pet9val32=0,pet9val33=0,pet9val34=0,pet9val35=0,pet9val36=0,pet9val37=0, pet9val38=0,pet9val39=0,pet9val40=0;
let pet9val41=0,pet9val42=0,pet9val43=0,pet9val44=0,pet9val45=0,pet9val46=0;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let pet10res1,pet10res2,pet10res3,pet10res4,pet10res5,pet10res6,pet10res7,pet10res8,pet10res9,pet10res10,pet10res11,pet10res12;
let pet10res13,pet10res14, pet10res15,pet10res16,pet10res17,pet10res18,pet10res19,pet10res20,pet10res21,pet10res22,pet10res23;
let pet10res24,pet10res25,pet10res26,pet10res27,pet10res28,pet10res29,pet10res30,pet10res31,pet10res32,pet10res33,pet10res34;
let pet10res35,pet10res36,pet10res37,pet10res38,pet10res39,pet10res40,pet10res41,pet10res42,pet10res43,pet10res44,pet10res45,pet10res46;
let pet10res47,pet10res48,pet10res49,pet10res50,pet10res51,pet10res52,pet10res53,pet10res54,pet10res55,pet10res56,pet10res57;
let pet10res58,pet10res59,pet10res60,pet10res61,pet10res62,pet10res63,pet10res64,pet10res65,pet10res66,pet10res67,pet10res68,pet10res69,pet10res70,pet10res71,pet10res72,pet10res73,pet10res74;
let pet10res75,pet10res76,pet10res77,pet10res78,pet10res79,pet10res80,pet10res81,pet10res82,pet10res83,pet10res84,pet10res85,pet10res86;
let pet10res87,pet10res88,pet10res89,pet10res90,pet10res91,pet10res92,pet10res93,pet10res94,pet10res95,pet10res96,pet10res97,pet10res98;
let pet10res99,pet10res100,pet10res101,pet10res102,pet10res103,pet10res104,pet10res105,pet10res106,pet10res107,pet10res108,pet10res109;
let pet10res110,pet10res111,pet10res112,pet10res113,pet10res114,pet10res115,pet10res116,pet10res117,pet10res118,pet10res119,pet10res120;
let pet10res121,pet10res122,pet10res123,pet10res124,pet10res125,pet10res126,pet10res127,pet10res128,pet10res129,pet10res130,pet10res131,pet10res132;
let pet10res133,pet10res134,pet10res135,pet10res136,pet10res137,pet10res138,pet10res139,pet10res140,pet10res141,pet10res142,pet10res143,pet10res144;
let pet10res145,pet10res146,pet10res147,pet10res148,pet10res149,pet10res150,pet10res151,pet10res152,pet10res153,pet10res154,pet10res155;
let pet10res156,pet10res157,pet10res158,pet10res159,pet10res160,pet10res161,pet10res162,pet10res163,pet10res164,pet10res165,pet10res166;
let pet10res167,pet10res168,pet10res169,pet10res170,pet10res171,pet10res172,pet10res173,pet10res174,pet10res175,pet10res176,pet10res177;
let pet10res178,pet10res179,pet10res180,pet10res181,pet10res182,pet10res183,pet10res184,pet10res185,pet10res186,pet10res187,pet10res188;
let pet10res189,pet10res190,pet10res191,pet10res192,pet10res193,pet10res194,pet10res195,pet10res196,pet10res197,pet10res198,pet10res199;
let pet10res200,pet10res201,pet10res202,pet10res203,pet10res204,pet10res205,pet10res206,pet10res207,pet10res208,pet10res209,pet10res210,pet10res211;
let pet10res212,pet10res213,pet10res214,pet10res215,pet10res216,pet10res217,pet10res218,pet10res219,pet10res220,pet10res221,pet10res222,pet10res223;
let pet10res224,pet10res225,pet10res226,pet10res227,pet10res228,pet10res229,pet10res230;  

let pet10val1=0,pet10val2=0,pet10val3=0,pet10val4=0,pet10val5=0,pet10val6=0,pet10val7=0, pet10val8=0,pet10val9=0,pet10val10=0;
let pet10val11=0,pet10val12=0,pet10val13=0,pet10val14=0,pet10val15=0,pet10val16=0,pet10val17=0, pet10val18=0,pet10val19=0,pet10val20=0;
let pet10val21=0,pet10val22=0,pet10val23=0,pet10val24=0,pet10val25=0,pet10val26=0,pet10val27=0, pet10val28=0,pet10val29=0,pet10val30=0;
let pet10val31=0,pet10val32=0,pet10val33=0,pet10val34=0,pet10val35=0,pet10val36=0,pet10val37=0, pet10val38=0,pet10val39=0,pet10val40=0;
let pet10val41=0,pet10val42=0,pet10val43=0,pet10val44=0,pet10val45=0,pet10val46=0;
///////////////////////////////////////////////////////////////////////////////
let pet11res1,pet11res2,pet11res3,pet11res4,pet11res5,pet11res6,pet11res7,pet11res8,pet11res9,pet11res10,pet11res11,pet11res12;
let pet11res13,pet11res14, pet11res15,pet11res16,pet11res17,pet11res18,pet11res19,pet11res20,pet11res21,pet11res22,pet11res23;
let pet11res24,pet11res25,pet11res26,pet11res27,pet11res28,pet11res29,pet11res30,pet11res31,pet11res32,pet11res33,pet11res34;
let pet11res35,pet11res36,pet11res37,pet11res38,pet11res39,pet11res40,pet11res41,pet11res42,pet11res43,pet11res44,pet11res45,pet11res46;
let pet11res47,pet11res48,pet11res49,pet11res50,pet11res51,pet11res52,pet11res53,pet11res54,pet11res55,pet11res56,pet11res57;
let pet11res58,pet11res59,pet11res60,pet11res61,pet11res62,pet11res63,pet11res64,pet11res65,pet11res66,pet11res67,pet11res68,pet11res69,pet11res70,pet11res71,pet11res72,pet11res73,pet11res74;
let pet11res75,pet11res76,pet11res77,pet11res78,pet11res79,pet11res80,pet11res81,pet11res82,pet11res83,pet11res84,pet11res85,pet11res86;
let pet11res87,pet11res88,pet11res89,pet11res90,pet11res91,pet11res92,pet11res93,pet11res94,pet11res95,pet11res96,pet11res97,pet11res98;
let pet11res99,pet11res100,pet11res101,pet11res102,pet11res103,pet11res104,pet11res105,pet11res106,pet11res107,pet11res108,pet11res109;
let pet11res110,pet11res111,pet11res112,pet11res113,pet11res114,pet11res115,pet11res116,pet11res117,pet11res118,pet11res119,pet11res120;
let pet11res121,pet11res122,pet11res123,pet11res124,pet11res125,pet11res126,pet11res127,pet11res128,pet11res129,pet11res130,pet11res131,pet11res132;
let pet11res133,pet11res134,pet11res135,pet11res136,pet11res137,pet11res138,pet11res139,pet11res140,pet11res141,pet11res142,pet11res143,pet11res144;
let pet11res145,pet11res146,pet11res147,pet11res148,pet11res149,pet11res150,pet11res151,pet11res152,pet11res153,pet11res154,pet11res155;
let pet11res156,pet11res157,pet11res158,pet11res159,pet11res160,pet11res161,pet11res162,pet11res163,pet11res164,pet11res165,pet11res166;
let pet11res167,pet11res168,pet11res169,pet11res170,pet11res171,pet11res172,pet11res173,pet11res174,pet11res175,pet11res176,pet11res177;
let pet11res178,pet11res179,pet11res180,pet11res181,pet11res182,pet11res183,pet11res184,pet11res185,pet11res186,pet11res187,pet11res188;
let pet11res189,pet11res190,pet11res191,pet11res192,pet11res193,pet11res194,pet11res195,pet11res196,pet11res197,pet11res198,pet11res199;
let pet11res200,pet11res201,pet11res202,pet11res203,pet11res204,pet11res205,pet11res206,pet11res207,pet11res208,pet11res209,pet11res210,pet11res211;
let pet11res212,pet11res213,pet11res214,pet11res215,pet11res216,pet11res217,pet11res218,pet11res219,pet11res220,pet11res221,pet11res222,pet11res223;
let pet11res224,pet11res225,pet11res226,pet11res227,pet11res228,pet11res229,pet11res230;  

let pet11val1=0,pet11val2=0,pet11val3=0,pet11val4=0,pet11val5=0,pet11val6=0,pet11val7=0, pet11val8=0,pet11val9=0,pet11val10=0;
let pet11val11=0,pet11val12=0,pet11val13=0,pet11val14=0,pet11val15=0,pet11val16=0,pet11val17=0, pet11val18=0,pet11val19=0,pet11val20=0;
let pet11val21=0,pet11val22=0,pet11val23=0,pet11val24=0,pet11val25=0,pet11val26=0,pet11val27=0, pet11val28=0,pet11val29=0,pet11val30=0;
let pet11val31=0,pet11val32=0,pet11val33=0,pet11val34=0,pet11val35=0,pet11val36=0,pet11val37=0, pet11val38=0,pet11val39=0,pet11val40=0;
let pet11val41=0,pet11val42=0,pet11val43=0,pet11val44=0,pet11val45=0,pet11val46=0;
///////////////////////////////////////////////////////////////////////
let pet12res1,pet12res2,pet12res3,pet12res4,pet12res5,pet12res6,pet12res7,pet12res8,pet12res9,pet12res10,pet12res11,pet12res12;
let pet12res13,pet12res14, pet12res15,pet12res16,pet12res17,pet12res18,pet12res19,pet12res20,pet12res21,pet12res22,pet12res23;
let pet12res24,pet12res25,pet12res26,pet12res27,pet12res28,pet12res29,pet12res30,pet12res31,pet12res32,pet12res33,pet12res34;
let pet12res35,pet12res36,pet12res37,pet12res38,pet12res39,pet12res40,pet12res41,pet12res42,pet12res43,pet12res44,pet12res45,pet12res46;
let pet12res47,pet12res48,pet12res49,pet12res50,pet12res51,pet12res52,pet12res53,pet12res54,pet12res55,pet12res56,pet12res57;
let pet12res58,pet12res59,pet12res60,pet12res61,pet12res62,pet12res63,pet12res64,pet12res65,pet12res66,pet12res67,pet12res68,pet12res69,pet12res70,pet12res71,pet12res72,pet12res73,pet12res74;
let pet12res75,pet12res76,pet12res77,pet12res78,pet12res79,pet12res80,pet12res81,pet12res82,pet12res83,pet12res84,pet12res85,pet12res86;
let pet12res87,pet12res88,pet12res89,pet12res90,pet12res91,pet12res92,pet12res93,pet12res94,pet12res95,pet12res96,pet12res97,pet12res98;
let pet12res99,pet12res100,pet12res101,pet12res102,pet12res103,pet12res104,pet12res105,pet12res106,pet12res107,pet12res108,pet12res109;
let pet12res110,pet12res111,pet12res112,pet12res113,pet12res114,pet12res115,pet12res116,pet12res117,pet12res118,pet12res119,pet12res120;
let pet12res121,pet12res122,pet12res123,pet12res124,pet12res125,pet12res126,pet12res127,pet12res128,pet12res129,pet12res130,pet12res131,pet12res132;
let pet12res133,pet12res134,pet12res135,pet12res136,pet12res137,pet12res138,pet12res139,pet12res140,pet12res141,pet12res142,pet12res143,pet12res144;
let pet12res145,pet12res146,pet12res147,pet12res148,pet12res149,pet12res150,pet12res151,pet12res152,pet12res153,pet12res154,pet12res155;
let pet12res156,pet12res157,pet12res158,pet12res159,pet12res160,pet12res161,pet12res162,pet12res163,pet12res164,pet12res165,pet12res166;
let pet12res167,pet12res168,pet12res169,pet12res170,pet12res171,pet12res172,pet12res173,pet12res174,pet12res175,pet12res176,pet12res177;
let pet12res178,pet12res179,pet12res180,pet12res181,pet12res182,pet12res183,pet12res184,pet12res185,pet12res186,pet12res187,pet12res188;
let pet12res189,pet12res190,pet12res191,pet12res192,pet12res193,pet12res194,pet12res195,pet12res196,pet12res197,pet12res198,pet12res199;
let pet12res200,pet12res201,pet12res202,pet12res203,pet12res204,pet12res205,pet12res206,pet12res207,pet12res208,pet12res209,pet12res210,pet12res211;
let pet12res212,pet12res213,pet12res214,pet12res215,pet12res216,pet12res217,pet12res218,pet12res219,pet12res220,pet12res221,pet12res222,pet12res223;
let pet12res224,pet12res225,pet12res226,pet12res227,pet12res228,pet12res229,pet12res230;  

let pet12val1=0,pet12val2=0,pet12val3=0,pet12val4=0,pet12val5=0,pet12val6=0,pet12val7=0, pet12val8=0,pet12val9=0,pet12val10=0;
let pet12val11=0,pet12val12=0,pet12val13=0,pet12val14=0,pet12val15=0,pet12val16=0,pet12val17=0, pet12val18=0,pet12val19=0,pet12val20=0;
let pet12val21=0,pet12val22=0,pet12val23=0,pet12val24=0,pet12val25=0,pet12val26=0,pet12val27=0, pet12val28=0,pet12val29=0,pet12val30=0;
let pet12val31=0,pet12val32=0,pet12val33=0,pet12val34=0,pet12val35=0,pet12val36=0,pet12val37=0, pet12val38=0,pet12val39=0,pet12val40=0;
let pet12val41=0,pet12val42=0,pet12val43=0,pet12val44=0,pet12val45=0,pet12val46=0;
/////////////////////////////////////////////////////////////////////////////////
let pet13res1,pet13res2,pet13res3,pet13res4,pet13res5,pet13res6,pet13res7,pet13res8,pet13res9,pet13res10,pet13res11,pet13res12;
let pet13res13,pet13res14, pet13res15,pet13res16,pet13res17,pet13res18,pet13res19,pet13res20,pet13res21,pet13res22,pet13res23;
let pet13res24,pet13res25,pet13res26,pet13res27,pet13res28,pet13res29,pet13res30,pet13res31,pet13res32,pet13res33,pet13res34;
let pet13res35,pet13res36,pet13res37,pet13res38,pet13res39,pet13res40,pet13res41,pet13res42,pet13res43,pet13res44,pet13res45,pet13res46;
let pet13res47,pet13res48,pet13res49,pet13res50,pet13res51,pet13res52,pet13res53,pet13res54,pet13res55,pet13res56,pet13res57;
let pet13res58,pet13res59,pet13res60,pet13res61,pet13res62,pet13res63,pet13res64,pet13res65,pet13res66,pet13res67,pet13res68,pet13res69,pet13res70,pet13res71,pet13res72,pet13res73,pet13res74;
let pet13res75,pet13res76,pet13res77,pet13res78,pet13res79,pet13res80,pet13res81,pet13res82,pet13res83,pet13res84,pet13res85,pet13res86;
let pet13res87,pet13res88,pet13res89,pet13res90,pet13res91,pet13res92,pet13res93,pet13res94,pet13res95,pet13res96,pet13res97,pet13res98;
let pet13res99,pet13res100,pet13res101,pet13res102,pet13res103,pet13res104,pet13res105,pet13res106,pet13res107,pet13res108,pet13res109;
let pet13res110,pet13res111,pet13res112,pet13res113,pet13res114,pet13res115,pet13res116,pet13res117,pet13res118,pet13res119,pet13res120;
let pet13res121,pet13res122,pet13res123,pet13res124,pet13res125,pet13res126,pet13res127,pet13res128,pet13res129,pet13res130,pet13res131,pet13res132;
let pet13res133,pet13res134,pet13res135,pet13res136,pet13res137,pet13res138,pet13res139,pet13res140,pet13res141,pet13res142,pet13res143,pet13res144;
let pet13res145,pet13res146,pet13res147,pet13res148,pet13res149,pet13res150,pet13res151,pet13res152,pet13res153,pet13res154,pet13res155;
let pet13res156,pet13res157,pet13res158,pet13res159,pet13res160,pet13res161,pet13res162,pet13res163,pet13res164,pet13res165,pet13res166;
let pet13res167,pet13res168,pet13res169,pet13res170,pet13res171,pet13res172,pet13res173,pet13res174,pet13res175,pet13res176,pet13res177;
let pet13res178,pet13res179,pet13res180,pet13res181,pet13res182,pet13res183,pet13res184,pet13res185,pet13res186,pet13res187,pet13res188;
let pet13res189,pet13res190,pet13res191,pet13res192,pet13res193,pet13res194,pet13res195,pet13res196,pet13res197,pet13res198,pet13res199;
let pet13res200,pet13res201,pet13res202,pet13res203,pet13res204,pet13res205,pet13res206,pet13res207,pet13res208,pet13res209,pet13res210,pet13res211;
let pet13res212,pet13res213,pet13res214,pet13res215,pet13res216,pet13res217,pet13res218,pet13res219,pet13res220,pet13res221,pet13res222,pet13res223;
let pet13res224,pet13res225,pet13res226,pet13res227,pet13res228,pet13res229,pet13res230;  

let pet13val1=0,pet13val2=0,pet13val3=0,pet13val4=0,pet13val5=0,pet13val6=0,pet13val7=0, pet13val8=0,pet13val9=0,pet13val10=0;
let pet13val11=0,pet13val12=0,pet13val13=0,pet13val14=0,pet13val15=0,pet13val16=0,pet13val17=0, pet13val18=0,pet13val19=0,pet13val20=0;
let pet13val21=0,pet13val22=0,pet13val23=0,pet13val24=0,pet13val25=0,pet13val26=0,pet13val27=0, pet13val28=0,pet13val29=0,pet13val30=0;
let pet13val31=0,pet13val32=0,pet13val33=0,pet13val34=0,pet13val35=0,pet13val36=0,pet13val37=0, pet13val38=0,pet13val39=0,pet13val40=0;
let pet13val41=0,pet13val42=0,pet13val43=0,pet13val44=0,pet13val45=0,pet13val46=0;
//////////////////////////////////////////////////////////////////////////////////
let pet14res1,pet14res2,pet14res3,pet14res4,pet14res5,pet14res6,pet14res7,pet14res8,pet14res9,pet14res10,pet14res11,pet14res12;
let pet14res13,pet14res14, pet14res15,pet14res16,pet14res17,pet14res18,pet14res19,pet14res20,pet14res21,pet14res22,pet14res23;
let pet14res24,pet14res25,pet14res26,pet14res27,pet14res28,pet14res29,pet14res30,pet14res31,pet14res32,pet14res33,pet14res34;
let pet14res35,pet14res36,pet14res37,pet14res38,pet14res39,pet14res40,pet14res41,pet14res42,pet14res43,pet14res44,pet14res45,pet14res46;
let pet14res47,pet14res48,pet14res49,pet14res50,pet14res51,pet14res52,pet14res53,pet14res54,pet14res55,pet14res56,pet14res57;
let pet14res58,pet14res59,pet14res60,pet14res61,pet14res62,pet14res63,pet14res64,pet14res65,pet14res66,pet14res67,pet14res68,pet14res69,pet14res70,pet14res71,pet14res72,pet14res73,pet14res74;
let pet14res75,pet14res76,pet14res77,pet14res78,pet14res79,pet14res80,pet14res81,pet14res82,pet14res83,pet14res84,pet14res85,pet14res86;
let pet14res87,pet14res88,pet14res89,pet14res90,pet14res91,pet14res92,pet14res93,pet14res94,pet14res95,pet14res96,pet14res97,pet14res98;
let pet14res99,pet14res100,pet14res101,pet14res102,pet14res103,pet14res104,pet14res105,pet14res106,pet14res107,pet14res108,pet14res109;
let pet14res110,pet14res111,pet14res112,pet14res113,pet14res114,pet14res115,pet14res116,pet14res117,pet14res118,pet14res119,pet14res120;
let pet14res121,pet14res122,pet14res123,pet14res124,pet14res125,pet14res126,pet14res127,pet14res128,pet14res129,pet14res130,pet14res131,pet14res132;
let pet14res133,pet14res134,pet14res135,pet14res136,pet14res137,pet14res138,pet14res139,pet14res140,pet14res141,pet14res142,pet14res143,pet14res144;
let pet14res145,pet14res146,pet14res147,pet14res148,pet14res149,pet14res150,pet14res151,pet14res152,pet14res153,pet14res154,pet14res155;
let pet14res156,pet14res157,pet14res158,pet14res159,pet14res160,pet14res161,pet14res162,pet14res163,pet14res164,pet14res165,pet14res166;
let pet14res167,pet14res168,pet14res169,pet14res170,pet14res171,pet14res172,pet14res173,pet14res174,pet14res175,pet14res176,pet14res177;
let pet14res178,pet14res179,pet14res180,pet14res181,pet14res182,pet14res183,pet14res184,pet14res185,pet14res186,pet14res187,pet14res188;
let pet14res189,pet14res190,pet14res191,pet14res192,pet14res193,pet14res194,pet14res195,pet14res196,pet14res197,pet14res198,pet14res199;
let pet14res200,pet14res201,pet14res202,pet14res203,pet14res204,pet14res205,pet14res206,pet14res207,pet14res208,pet14res209,pet14res210,pet14res211;
let pet14res212,pet14res213,pet14res214,pet14res215,pet14res216,pet14res217,pet14res218,pet14res219,pet14res220,pet14res221,pet14res222,pet14res223;
let pet14res224,pet14res225,pet14res226,pet14res227,pet14res228,pet14res229,pet14res230;  

let pet14val1=0,pet14val2=0,pet14val3=0,pet14val4=0,pet14val5=0,pet14val6=0,pet14val7=0, pet14val8=0,pet14val9=0,pet14val10 = 0;
let pet14val11=0,pet14val12=0,pet14val13=0,pet14val14=0,pet14val15=0,pet14val16=0,pet14val17=0, pet14val18=0,pet14val19=0,pet14val20 = 0;
let pet14val21=0,pet14val22=0,pet14val23=0,pet14val24=0,pet14val25=0,pet14val26=0,pet14val27=0, pet14val28=0,pet14val29=0,pet14val30 = 0;
let pet14val31=0,pet14val32=0,pet14val33=0,pet14val34=0,pet14val35=0,pet14val36=0,pet14val37=0, pet14val38=0,pet14val39=0,pet14val40 = 0;
let pet14val41=0,pet14val42=0,pet14val43=0,pet14val44=0,pet14val45=0,pet14val46 = 0;
//////////////////////////////////////////////////////////////////////////////
let pet15res1,pet15res2,pet15res3,pet15res4,pet15res5,pet15res6,pet15res7,pet15res8,pet15res9,pet15res10,pet15res11,pet15res12;
let pet15res13,pet15res14, pet15res15,pet15res16,pet15res17,pet15res18,pet15res19,pet15res20,pet15res21,pet15res22,pet15res23;
let pet15res24,pet15res25,pet15res26,pet15res27,pet15res28,pet15res29,pet15res30,pet15res31,pet15res32,pet15res33,pet15res34;
let pet15res35,pet15res36,pet15res37,pet15res38,pet15res39,pet15res40,pet15res41,pet15res42,pet15res43,pet15res44,pet15res45,pet15res46;
let pet15res47,pet15res48,pet15res49,pet15res50,pet15res51,pet15res52,pet15res53,pet15res54,pet15res55,pet15res56,pet15res57;
let pet15res58,pet15res59,pet15res60,pet15res61,pet15res62,pet15res63,pet15res64,pet15res65,pet15res66,pet15res67,pet15res68,pet15res69,pet15res70,pet15res71,pet15res72,pet15res73,pet15res74;
let pet15res75,pet15res76,pet15res77,pet15res78,pet15res79,pet15res80,pet15res81,pet15res82,pet15res83,pet15res84,pet15res85,pet15res86;
let pet15res87,pet15res88,pet15res89,pet15res90,pet15res91,pet15res92,pet15res93,pet15res94,pet15res95,pet15res96,pet15res97,pet15res98;
let pet15res99,pet15res100,pet15res101,pet15res102,pet15res103,pet15res104,pet15res105,pet15res106,pet15res107,pet15res108,pet15res109;
let pet15res110,pet15res111,pet15res112,pet15res113,pet15res114,pet15res115,pet15res116,pet15res117,pet15res118,pet15res119,pet15res120;
let pet15res121,pet15res122,pet15res123,pet15res124,pet15res125,pet15res126,pet15res127,pet15res128,pet15res129,pet15res130,pet15res131,pet15res132;
let pet15res133,pet15res134,pet15res135,pet15res136,pet15res137,pet15res138,pet15res139,pet15res140,pet15res141,pet15res142,pet15res143,pet15res144;
let pet15res145,pet15res146,pet15res147,pet15res148,pet15res149,pet15res150,pet15res151,pet15res152,pet15res153,pet15res154,pet15res155;
let pet15res156,pet15res157,pet15res158,pet15res159,pet15res160,pet15res161,pet15res162,pet15res163,pet15res164,pet15res165,pet15res166;
let pet15res167,pet15res168,pet15res169,pet15res170,pet15res171,pet15res172,pet15res173,pet15res174,pet15res175,pet15res176,pet15res177;
let pet15res178,pet15res179,pet15res180,pet15res181,pet15res182,pet15res183,pet15res184,pet15res185,pet15res186,pet15res187,pet15res188;
let pet15res189,pet15res190,pet15res191,pet15res192,pet15res193,pet15res194,pet15res195,pet15res196,pet15res197,pet15res198,pet15res199;
let pet15res200,pet15res201,pet15res202,pet15res203,pet15res204,pet15res205,pet15res206,pet15res207,pet15res208,pet15res209,pet15res210,pet15res211;
let pet15res212,pet15res213,pet15res214,pet15res215,pet15res216,pet15res217,pet15res218,pet15res219,pet15res220,pet15res221,pet15res222,pet15res223;
let pet15res224,pet15res225,pet15res226,pet15res227,pet15res228,pet15res229,pet15res230;  

let pet15val1=0,pet15val2=0,pet15val3=0,pet15val4=0,pet15val5=0,pet15val6=0,pet15val7=0, pet15val8=0,pet15val9=0,pet15val10=0;
let pet15val11=0,pet15val12=0,pet15val13=0,pet15val14=0,pet15val15=0,pet15val16=0,pet15val17=0, pet15val18=0,pet15val19=0,pet15val20=0;
let pet15val21=0,pet15val22=0,pet15val23=0,pet15val24=0,pet15val25=0,pet15val26=0,pet15val27=0, pet15val28=0,pet15val29=0,pet15val30=0;
let pet15val31=0,pet15val32=0,pet15val33=0,pet15val34=0,pet15val35=0,pet15val36=0,pet15val37=0, pet15val38=0,pet15val39=0,pet15val40=0;
let pet15val41=0,pet15val42=0,pet15val43=0,pet15val44=0,pet15val45=0,pet15val46 = 0 ;


/////////////////////////////////////////////////////////////////////////////////////////
let pet1ent1,pet1ent2,pet1ent3,pet1ent4,pet1ent5,pet1ent6,pet1ent7,pet1ent8,pet1ent9,pet1ent10,pet1ent11;
let pet1ent12,pet1ent13,pet1ent14,pet1ent15,pet1ent16,pet1ent17,pet1ent18,pet1ent19,pet1ent20,pet1ent21,pet1ent22;
let pet1ent23,pet1ent24,pet1ent25,pet1ent26,pet1ent27,pet1ent28,pet1ent29,pet1ent30,pet1ent31,pet1ent32,pet1ent33;
let pet1ent34,pet1ent35,pet1ent36,pet1ent37,pet1ent38,pet1ent39,pet1ent40,pet1ent41,pet1ent42,pet1ent43,pet1ent44,pet1ent45,pet1ent46;

let pet2ent1,pet2ent2,pet2ent3,pet2ent4,pet2ent5,pet2ent6,pet2ent7,pet2ent8,pet2ent9,pet2ent10,pet2ent11;
let pet2ent12,pet2ent13,pet2ent14,pet2ent15,pet2ent16,pet2ent17,pet2ent18,pet2ent19,pet2ent20,pet2ent21,pet2ent22;
let pet2ent23,pet2ent24,pet2ent25,pet2ent26,pet2ent27,pet2ent28,pet2ent29,pet2ent30,pet2ent31,pet2ent32,pet2ent33;
let pet2ent34,pet2ent35,pet2ent36,pet2ent37,pet2ent38,pet2ent39,pet2ent40,pet2ent41,pet2ent42,pet2ent43,pet2ent44,pet2ent45,pet2ent46;

let pet3ent1,pet3ent2,pet3ent3,pet3ent4,pet3ent5,pet3ent6,pet3ent7,pet3ent8,pet3ent9,pet3ent10,pet3ent11;
let pet3ent12,pet3ent13,pet3ent14,pet3ent15,pet3ent16,pet3ent17,pet3ent18,pet3ent19,pet3ent20,pet3ent21,pet3ent22;
let pet3ent23,pet3ent24,pet3ent25,pet3ent26,pet3ent27,pet3ent28,pet3ent29,pet3ent30,pet3ent31,pet3ent32,pet3ent33;
let pet3ent34,pet3ent35,pet3ent36,pet3ent37,pet3ent38,pet3ent39,pet3ent40,pet3ent41,pet3ent42,pet3ent43,pet3ent44,pet3ent45,pet3ent46;

let pet4ent1,pet4ent2,pet4ent3,pet4ent4,pet4ent5,pet4ent6,pet4ent7,pet4ent8,pet4ent9,pet4ent10,pet4ent11;
let pet4ent12,pet4ent13,pet4ent14,pet4ent15,pet4ent16,pet4ent17,pet4ent18,pet4ent19,pet4ent20,pet4ent21,pet4ent22;
let pet4ent23,pet4ent24,pet4ent25,pet4ent26,pet4ent27,pet4ent28,pet4ent29,pet4ent30,pet4ent31,pet4ent32,pet4ent33;
let pet4ent34,pet4ent35,pet4ent36,pet4ent37,pet4ent38,pet4ent39,pet4ent40,pet4ent41,pet4ent42,pet4ent43,pet4ent44,pet4ent45,pet4ent46;

let pet5ent1,pet5ent2,pet5ent3,pet5ent4,pet5ent5,pet5ent6,pet5ent7,pet5ent8,pet5ent9,pet5ent10,pet5ent11;
let pet5ent12,pet5ent13,pet5ent14,pet5ent15,pet5ent16,pet5ent17,pet5ent18,pet5ent19,pet5ent20,pet5ent21,pet5ent22;
let pet5ent23,pet5ent24,pet5ent25,pet5ent26,pet5ent27,pet5ent28,pet5ent29,pet5ent30,pet5ent31,pet5ent32,pet5ent33;
let pet5ent34,pet5ent35,pet5ent36,pet5ent37,pet5ent38,pet5ent39,pet5ent40,pet5ent41,pet5ent42,pet5ent43,pet5ent44,pet5ent45,pet5ent46;
let ponderacion;

let pet6ent1,pet6ent2,pet6ent3,pet6ent4,pet6ent5,pet6ent6,pet6ent7,pet6ent8,pet6ent9,pet6ent10,pet6ent11;
let pet6ent12,pet6ent13,pet6ent14,pet6ent15,pet6ent16,pet6ent17,pet6ent18,pet6ent19,pet6ent20,pet6ent21,pet6ent22;
let pet6ent23,pet6ent24,pet6ent25,pet6ent26,pet6ent27,pet6ent28,pet6ent29,pet6ent30,pet6ent31,pet6ent32,pet6ent33;
let pet6ent34,pet6ent35,pet6ent36,pet6ent37,pet6ent38,pet6ent39,pet6ent40,pet6ent41,pet6ent42,pet6ent43,pet6ent44,pet6ent45,pet6ent46;

let pet7ent1,pet7ent2,pet7ent3,pet7ent4,pet7ent5,pet7ent6,pet7ent7,pet7ent8,pet7ent9,pet7ent10,pet7ent11;
let pet7ent12,pet7ent13,pet7ent14,pet7ent15,pet7ent16,pet7ent17,pet7ent18,pet7ent19,pet7ent20,pet7ent21,pet7ent22;
let pet7ent23,pet7ent24,pet7ent25,pet7ent26,pet7ent27,pet7ent28,pet7ent29,pet7ent30,pet7ent31,pet7ent32,pet7ent33;
let pet7ent34,pet7ent35,pet7ent36,pet7ent37,pet7ent38,pet7ent39,pet7ent40,pet7ent41,pet7ent42,pet7ent43,pet7ent44,pet7ent45,pet7ent46;

let pet8ent1,pet8ent2,pet8ent3,pet8ent4,pet8ent5,pet8ent6,pet8ent7,pet8ent8,pet8ent9,pet8ent10,pet8ent11;
let pet8ent12,pet8ent13,pet8ent14,pet8ent15,pet8ent16,pet8ent17,pet8ent18,pet8ent19,pet8ent20,pet8ent21,pet8ent22;
let pet8ent23,pet8ent24,pet8ent25,pet8ent26,pet8ent27,pet8ent28,pet8ent29,pet8ent30,pet8ent31,pet8ent32,pet8ent33;
let pet8ent34,pet8ent35,pet8ent36,pet8ent37,pet8ent38,pet8ent39,pet8ent40,pet8ent41,pet8ent42,pet8ent43,pet8ent44,pet8ent45,pet8ent46;

let pet9ent1,pet9ent2,pet9ent3,pet9ent4,pet9ent5,pet9ent6,pet9ent7,pet9ent8,pet9ent9,pet9ent10,pet9ent11;
let pet9ent12,pet9ent13,pet9ent14,pet9ent15,pet9ent16,pet9ent17,pet9ent18,pet9ent19,pet9ent20,pet9ent21,pet9ent22;
let pet9ent23,pet9ent24,pet9ent25,pet9ent26,pet9ent27,pet9ent28,pet9ent29,pet9ent30,pet9ent31,pet9ent32,pet9ent33;
let pet9ent34,pet9ent35,pet9ent36,pet9ent37,pet9ent38,pet9ent39,pet9ent40,pet9ent41,pet9ent42,pet9ent43,pet9ent44,pet9ent45,pet9ent46;

let pet10ent1,pet10ent2,pet10ent3,pet10ent4,pet10ent5,pet10ent6,pet10ent7,pet10ent8,pet10ent9,pet10ent10,pet10ent11;
let pet10ent12,pet10ent13,pet10ent14,pet10ent15,pet10ent16,pet10ent17,pet10ent18,pet10ent19,pet10ent20,pet10ent21,pet10ent22;
let pet10ent23,pet10ent24,pet10ent25,pet10ent26,pet10ent27,pet10ent28,pet10ent29,pet10ent30,pet10ent31,pet10ent32,pet10ent33;
let pet10ent34,pet10ent35,pet10ent36,pet10ent37,pet10ent38,pet10ent39,pet10ent40,pet10ent41,pet10ent42,pet10ent43,pet10ent44,pet10ent45,pet10ent46;

let pet11ent1,pet11ent2,pet11ent3,pet11ent4,pet11ent5,pet11ent6,pet11ent7,pet11ent8,pet11ent9,pet11ent10,pet11ent11;
let pet11ent12,pet11ent13,pet11ent14,pet11ent15,pet11ent16,pet11ent17,pet11ent18,pet11ent19,pet11ent20,pet11ent21,pet11ent22;
let pet11ent23,pet11ent24,pet11ent25,pet11ent26,pet11ent27,pet11ent28,pet11ent29,pet11ent30,pet11ent31,pet11ent32,pet11ent33;
let pet11ent34,pet11ent35,pet11ent36,pet11ent37,pet11ent38,pet11ent39,pet11ent40,pet11ent41,pet11ent42,pet11ent43,pet11ent44,pet11ent45,pet11ent46;

let pet12ent1,pet12ent2,pet12ent3,pet12ent4,pet12ent5,pet12ent6,pet12ent7,pet12ent8,pet12ent9,pet12ent10,pet12ent11;
let pet12ent12,pet12ent13,pet12ent14,pet12ent15,pet12ent16,pet12ent17,pet12ent18,pet12ent19,pet12ent20,pet12ent21,pet12ent22;
let pet12ent23,pet12ent24,pet12ent25,pet12ent26,pet12ent27,pet12ent28,pet12ent29,pet12ent30,pet12ent31,pet12ent32,pet12ent33;
let pet12ent34,pet12ent35,pet12ent36,pet12ent37,pet12ent38,pet12ent39,pet12ent40,pet12ent41,pet12ent42,pet12ent43,pet12ent44,pet12ent45,pet12ent46;

let pet13ent1,pet13ent2,pet13ent3,pet13ent4,pet13ent5,pet13ent6,pet13ent7,pet13ent8,pet13ent9,pet13ent10,pet13ent11;
let pet13ent12,pet13ent13,pet13ent14,pet13ent15,pet13ent16,pet13ent17,pet13ent18,pet13ent19,pet13ent20,pet13ent21,pet13ent22;
let pet13ent23,pet13ent24,pet13ent25,pet13ent26,pet13ent27,pet13ent28,pet13ent29,pet13ent30,pet13ent31,pet13ent32,pet13ent33;
let pet13ent34,pet13ent35,pet13ent36,pet13ent37,pet13ent38,pet13ent39,pet13ent40,pet13ent41,pet13ent42,pet13ent43,pet13ent44,pet13ent45,pet13ent46;

let pet14ent1,pet14ent2,pet14ent3,pet14ent4,pet14ent5,pet14ent6,pet14ent7,pet14ent8,pet14ent9,pet14ent10,pet14ent11;
let pet14ent12,pet14ent13,pet14ent14,pet14ent15,pet14ent16,pet14ent17,pet14ent18,pet14ent19,pet14ent20,pet14ent21,pet14ent22;
let pet14ent23,pet14ent24,pet14ent25,pet14ent26,pet14ent27,pet14ent28,pet14ent29,pet14ent30,pet14ent31,pet14ent32,pet14ent33;
let pet14ent34,pet14ent35,pet14ent36,pet14ent37,pet14ent38,pet14ent39,pet14ent40,pet14ent41,pet14ent42,pet14ent43,pet14ent44,pet14ent45,pet14ent46;

let pet15ent1,pet15ent2,pet15ent3,pet15ent4,pet15ent5,pet15ent6,pet15ent7,pet15ent8,pet15ent9,pet15ent10,pet15ent11;
let pet15ent12,pet15ent13,pet15ent14,pet15ent15,pet15ent16,pet15ent17,pet15ent18,pet15ent19,pet15ent20,pet15ent21,pet15ent22;
let pet15ent23,pet15ent24,pet15ent25,pet15ent26,pet15ent27,pet15ent28,pet15ent29,pet15ent30,pet15ent31,pet15ent32,pet15ent33;
let pet15ent34,pet15ent35,pet15ent36,pet15ent37,pet15ent38,pet15ent39,pet15ent40,pet15ent41,pet15ent42,pet15ent43,pet15ent44,pet15ent45,pet15ent46;



// console.log("peticion1",this.state.peticion1)
// console.log("peticion2",this.state.peticion2)
// console.log("peticion3",this.state.peticion3)
// console.log("peticion4",this.state.peticion4)
 console.log("peticion5",this.state.peticion5)
if(this.state.peticion1.length>0){

  
if(this.state.peticion1.length>0){


  if(this.state.peticion1[1].Respuestas=="Siempre"){
    respuesta1="Siempre"
    valor1= this.state.getPonderacion[0].siempre
    }else if(this.state.peticion1[1].Respuestas=="CasiSiempre"){
      respuesta2="Casi Siempre"
      valor1= this.state.getPonderacion[0].casisiempre
    }
    else if(this.state.peticion1[1].Respuestas=="AlgunasVeces"){
      respuesta3="Algunas Veces"
      valor1= this.state.getPonderacion[0].algunasveces
    } 
    else if(this.state.peticion1[1].Respuestas=="CasiNunca"){
      respuesta4="Casi Nunca"
      valor1= this.state.getPonderacion[0].casinunca
    } 
    else if(this.state.peticion1[1].Respuestas=="Nunca"){
      respuesta5="Nunca"
      valor1= this.state.getPonderacion[0].nunca
    } 


  if(this.state.peticion1[2].Respuestas=="Siempre"){
    respuesta6="Siempre"
    valor2= this.state.getPonderacion[1].siempre
    }else if(this.state.peticion1[2].Respuestas=="CasiSiempre"){
      respuesta7="Casi Siempre"
      valor2= this.state.getPonderacion[1].casisiempre
    }
    else if(this.state.peticion1[2].Respuestas=="AlgunasVeces"){
      respuesta8="Algunas Veces"
      valor2= this.state.getPonderacion[1].algunasveces
    } 
    else if(this.state.peticion1[2].Respuestas=="CasiNunca"){
      respuesta9="Casi Nunca"
      valor2= this.state.getPonderacion[2].casinunca
    } 
    else if(this.state.peticion1[2].Respuestas=="Nunca"){
      respuesta10="Nunca"
      valor2= this.state.getPonderacion[1].nunca
    } 

    if(this.state.peticion1[3].Respuestas=="Siempre"){
      respuesta11="Siempre"
      valor3= this.state.getPonderacion[2].siempre
      }else if(this.state.peticion1[3].Respuestas=="CasiSiempre"){
        respuesta12="Casi Siempre"
        valor3= this.state.getPonderacion[2].casisiempre
      }
      else if(this.state.peticion1[3].Respuestas=="AlgunasVeces"){
        respuesta13="Algunas Veces"
        valor3= this.state.getPonderacion[2].algunasveces
      } 
      else if(this.state.peticion1[3].Respuestas=="CasiNunca"){
        respuesta14="Casi Nunca"
        valor3= this.state.getPonderacion[2].casinunca
      } 
      else if(this.state.peticion1[3].Respuestas=="Nunca"){
        respuesta15="Nunca"
        valor3= this.state.getPonderacion[2].nunca
      } 


    if(this.state.peticion1[4].Respuestas=="Siempre"){
      respuesta16="Siempre"
      valor4= this.state.getPonderacion[3].siempre
      }else if(this.state.peticion1[4].Respuestas=="CasiSiempre"){
        respuesta17="Casi Siempre"
        valor4= this.state.getPonderacion[3].casisiempre
      }
      else if(this.state.peticion1[4].Respuestas=="AlgunasVeces"){
        respuesta18="Algunas Veces"
        valor4= this.state.getPonderacion[3].algunasveces
      } 
      else if(this.state.peticion1[4].Respuestas=="CasiNunca"){
        respuesta19="Casi Nunca"
        valor4= this.state.getPonderacion[3].casinunca
      } 
      else if(this.state.peticion1[4].Respuestas=="Nunca"){
        respuesta20="Nunca"
        valor4= this.state.getPonderacion[3].nunca
      } 

    if(this.state.peticion1[5].Respuestas=="Siempre"){
      respuesta21="Siempre"
      valor5= this.state.getPonderacion[4].siempre
      }else if(this.state.peticion1[5].Respuestas=="CasiSiempre"){
        respuesta22="Casi Siempre"
        valor5= this.state.getPonderacion[4].casisiempre
      }
      else if(this.state.peticion1[5].Respuestas=="AlgunasVeces"){
        respuesta23="Algunas Veces"
        valor5= this.state.getPonderacion[4].algunasveces
      } 
      else if(this.state.peticion1[5].Respuestas=="CasiNunca"){
        respuesta24="Casi Nunca"
        valor5= this.state.getPonderacion[4].casinunca
      } 
      else if(this.state.peticion1[5].Respuestas=="Nunca"){
        respuesta25="Nunca"
        valor5= this.state.getPonderacion[4].nunca
      } 


      if(this.state.peticion1[6].Respuestas=="Siempre"){
        respuesta26="Siempre"
        valor6= this.state.getPonderacion[5].siempre
        }else if(this.state.peticion1[6].Respuestas=="CasiSiempre"){
          respuesta27="Casi Siempre"
          valor6= this.state.getPonderacion[5].casisiempre
        }
        else if(this.state.peticion1[6].Respuestas=="AlgunasVeces"){
          respuesta28="Algunas Veces"
          valor6= this.state.getPonderacion[5].algunasveces
        } 
        else if(this.state.peticion1[6].Respuestas=="CasiNunca"){
          respuesta29="Casi Nunca"
          valor6= this.state.getPonderacion[5].casinunca
        } 
        else if(this.state.peticion1[6].Respuestas=="Nunca"){
          respuesta30="Nunca"
          valor6= this.state.getPonderacion[5].nunca
        }

      if(this.state.peticion1[7].Respuestas=="Siempre"){
        respuesta31="Siempre"
        valor7= this.state.getPonderacion[6].siempre
        }else if(this.state.peticion1[7].Respuestas=="CasiSiempre"){
          respuesta32="Casi Siempre"
          valor7= this.state.getPonderacion[6].casisiempre
        }
        else if(this.state.peticion1[7].Respuestas=="AlgunasVeces"){
          respuesta33="Algunas Veces"
          valor7= this.state.getPonderacion[6].algunasveces
        } 
        else if(this.state.peticion1[7].Respuestas=="CasiNunca"){
          respuesta34="Casi Nunca"
          valor7= this.state.getPonderacion[6].casinunca
        } 
        else if(this.state.peticion1[7].Respuestas=="Nunca"){
          respuesta35="Nunca"
          valor7= this.state.getPonderacion[6].nunca
        }

        if(this.state.peticion1[8].Respuestas=="Siempre"){
          respuesta36="Siempre"
          valor8= this.state.getPonderacion[7].siempre
          }else if(this.state.peticion1[8].Respuestas=="CasiSiempre"){
            respuesta37="Casi Siempre"
            valor8= this.state.getPonderacion[7].casisiempre
          }
          else if(this.state.peticion1[8].Respuestas=="AlgunasVeces"){
            respuesta38="Algunas Veces"
            valor8= this.state.getPonderacion[7].algunasveces
          } 
          else if(this.state.peticion1[8].Respuestas=="CasiNunca"){
            respuesta39="Casi Nunca"
            valor8= this.state.getPonderacion[7].casinunca
          } 
          else if(this.state.peticion1[8].Respuestas=="Nunca"){
            respuesta40="Nunca"
            valor8= this.state.getPonderacion[7].nunca
          }
        if(this.state.peticion1[9].Respuestas=="Siempre"){
          respuesta41="Siempre"
          valor9= this.state.getPonderacion[8].siempre
          }else if(this.state.peticion1[9].Respuestas=="CasiSiempre"){
            respuesta42="Casi Siempre"
            valor9= this.state.getPonderacion[8].casisiempre
          }
          else if(this.state.peticion1[9].Respuestas=="AlgunasVeces"){
            respuesta43="Algunas Veces"
            valor9= this.state.getPonderacion[8].algunasveces
          } 
          else if(this.state.peticion1[9].Respuestas=="CasiNunca"){
            respuesta44="Casi Nunca"
            valor9= this.state.getPonderacion[8].casinunca
          } 
          else if(this.state.peticion1[9].Respuestas=="Nunca"){
            respuesta45="Nunca"
            valor9= this.state.getPonderacion[8].nunca
          }

      if(this.state.peticion1[10].Respuestas=="Siempre"){
        respuesta46="Siempre"
        valor10= this.state.getPonderacion[9].siempre
        }else if(this.state.peticion1[10].Respuestas=="CasiSiempre"){
          respuesta47="Casi Siempre"
          valor10= this.state.getPonderacion[9].casisiempre
        }
        else if(this.state.peticion1[10].Respuestas=="AlgunasVeces"){
          respuesta48="Algunas Veces"
          valor10= this.state.getPonderacion[9].algunasveces
        } 
        else if(this.state.peticion1[10].Respuestas=="CasiNunca"){
          respuesta49="Casi Nunca"
          valor10= this.state.getPonderacion[9].casinunca
        } 
        else if(this.state.peticion1[10].Respuestas=="Nunca"){
          respuesta50="Nunca"
          valor10= this.state.getPonderacion[9].nunca
        }

      if(this.state.peticion1[11].Respuestas=="Siempre"){
        respuesta51="Siempre"
        valor11= this.state.getPonderacion[10].siempre
        }else if(this.state.peticion1[11].Respuestas=="CasiSiempre"){
          respuesta52="Casi Siempre"
          valor11= this.state.getPonderacion[10].casisiempre
        }
        else if(this.state.peticion1[11].Respuestas=="AlgunasVeces"){
          respuesta53="Algunas Veces"
          valor11= this.state.getPonderacion[10].algunasveces
        } 
        else if(this.state.peticion1[11].Respuestas=="CasiNunca"){
          respuesta54="Casi Nunca"
          valor11= this.state.getPonderacion[10].casinunca
        } 
        else if(this.state.peticion1[11].Respuestas=="Nunca"){
          respuesta55="Nunca"
          valor11= this.state.getPonderacion[10].nunca
        }
      if(this.state.peticion1[12].Respuestas=="Siempre"){
        respuesta56="Siempre"
        valor12= this.state.getPonderacion[11].siempre
        }else if(this.state.peticion1[12].Respuestas=="CasiSiempre"){
          respuesta57="Casi Siempre"
          valor12= this.state.getPonderacion[11].casisiempre
        }
        else if(this.state.peticion1[12].Respuestas=="AlgunasVeces"){
          respuesta58="Algunas Veces"
          valor12= this.state.getPonderacion[11].algunasveces
        } 
        else if(this.state.peticion1[12].Respuestas=="CasiNunca"){
          respuesta59="Casi Nunca"
          valor12= this.state.getPonderacion[11].casinunca
        } 
        else if(this.state.peticion1[12].Respuestas=="Nunca"){
          respuesta60="Nunca"
          valor12= this.state.getPonderacion[11].nunca
        }

      if(this.state.peticion1[13].Respuestas=="Siempre"){
        respuesta61="Siempre"
        valor13= this.state.getPonderacion[12].siempre
        }else if(this.state.peticion1[13].Respuestas=="CasiSiempre"){
          respuesta62="Casi Siempre"
          valor13= this.state.getPonderacion[12].casisiempre
        }
        else if(this.state.peticion1[13].Respuestas=="AlgunasVeces"){
          respuesta63="Algunas Veces"
          valor13= this.state.getPonderacion[12].algunasveces
        } 
        else if(this.state.peticion1[13].Respuestas=="CasiNunca"){
          respuesta64="Casi Nunca"
          valor13= this.state.getPonderacion[12].casinunca
        } 
        else if(this.state.peticion1[13].Respuestas=="Nunca"){
          respuesta65="Nunca"
          valor13= this.state.getPonderacion[12].nunca
        }
      if(this.state.peticion1[14].Respuestas=="Siempre"){
        respuesta66="Siempre"
        valor14= this.state.getPonderacion[13].siempre
        }else if(this.state.peticion1[14].Respuestas=="CasiSiempre"){
          respuesta67="Casi Siempre"
          valor14= this.state.getPonderacion[13].casisiempre
        }
        else if(this.state.peticion1[14].Respuestas=="AlgunasVeces"){
          respuesta68="Algunas Veces"
          valor14= this.state.getPonderacion[13].algunasveces
        } 
        else if(this.state.peticion1[14].Respuestas=="CasiNunca"){
          respuesta69="Casi Nunca"
          valor14= this.state.getPonderacion[13].casinunca
        } 
        else if(this.state.peticion1[14].Respuestas=="Nunca"){
          respuesta70="Nunca"
          valor14= this.state.getPonderacion[13].nunca
        } 

      if(this.state.peticion1[15].Respuestas=="Siempre"){
        respuesta71="Siempre"
        valor15= this.state.getPonderacion[14].siempre
        }else if(this.state.peticion1[15].Respuestas=="CasiSiempre"){
          respuesta72="Casi Siempre"
          valor15= this.state.getPonderacion[14].casisiempre
        }
        else if(this.state.peticion1[15].Respuestas=="AlgunasVeces"){
          respuesta73="Algunas Veces"
          valor15= this.state.getPonderacion[14].algunasveces
        } 
        else if(this.state.peticion1[15].Respuestas=="CasiNunca"){
          respuesta74="Casi Nunca"
          valor15= this.state.getPonderacion[14].casinunca
        } 
        else if(this.state.peticion1[15].Respuestas=="Nunca"){
          respuesta75="Nunca"
          valor15= this.state.getPonderacion[14].nunca
        } 
      if(this.state.peticion1[16].Respuestas=="Siempre"){
        respuesta76="Siempre"
        valor16= this.state.getPonderacion[15].siempre
        }else if(this.state.peticion1[16].Respuestas=="CasiSiempre"){
          respuesta77="Casi Siempre"
          valor16= this.state.getPonderacion[15].casisiempre
        }
        else if(this.state.peticion1[16].Respuestas=="AlgunasVeces"){
          respuesta78="Algunas Veces"
          valor16= this.state.getPonderacion[15].algunasveces
        } 
        else if(this.state.peticion1[16].Respuestas=="CasiNunca"){
          respuesta79="Casi Nunca"
          valor16= this.state.getPonderacion[15].casinunca
        } 
        else if(this.state.peticion1[16].Respuestas=="Nunca"){
          respuesta80="Nunca"
          valor16= this.state.getPonderacion[15].nunca
        }
      if(this.state.peticion1[17].Respuestas=="Siempre"){
        respuesta81="Siempre"
        valor17= this.state.getPonderacion[16].siempre
        }else if(this.state.peticion1[17].Respuestas=="CasiSiempre"){
          respuesta82="Casi Siempre"
          valor17= this.state.getPonderacion[16].casisiempre
        }
        else if(this.state.peticion1[17].Respuestas=="AlgunasVeces"){
          respuesta83="Algunas Veces"
          valor17= this.state.getPonderacion[16].algunasveces
        } 
        else if(this.state.peticion1[17].Respuestas=="CasiNunca"){
          respuesta84="Casi Nunca"
          valor17= this.state.getPonderacion[16].casinunca
        } 
        else if(this.state.peticion1[17].Respuestas=="Nunca"){
          respuesta85="Nunca"
          valor17= this.state.getPonderacion[16].nunca
        }
      if(this.state.peticion1[18].Respuestas=="Siempre"){
        respuesta86="Siempre"
        valor18= this.state.getPonderacion[17].siempre
        }else if(this.state.peticion1[18].Respuestas=="CasiSiempre"){
          respuesta87="Casi Siempre"
          valor18= this.state.getPonderacion[17].casisiempre
        }
        else if(this.state.peticion1[18].Respuestas=="AlgunasVeces"){
          respuesta88="Algunas Veces"
          valor18= this.state.getPonderacion[17].algunasveces
        } 
        else if(this.state.peticion1[18].Respuestas=="CasiNunca"){
          respuesta89="Casi Nunca"
          valor18= this.state.getPonderacion[17].casinunca
        } 
        else if(this.state.peticion1[18].Respuestas=="Nunca"){
          respuesta90="Nunca"
          valor18= this.state.getPonderacion[17].nunca
        }

      if(this.state.peticion1[19].Respuestas=="Siempre"){
        respuesta91="Siempre"
        valor19= this.state.getPonderacion[18].siempre
        }else if(this.state.peticion1[19].Respuestas=="CasiSiempre"){
          respuesta92="Casi Siempre"
          valor19= this.state.getPonderacion[18].casisiempre
        }
        else if(this.state.peticion1[19].Respuestas=="AlgunasVeces"){
          respuesta93="Algunas Veces"
          valor19= this.state.getPonderacion[18].algunasveces
        } 
        else if(this.state.peticion1[19].Respuestas=="CasiNunca"){
          respuesta94="Casi Nunca"
          valor19= this.state.getPonderacion[18].casinunca
        } 
        else if(this.state.peticion1[19].Respuestas=="Nunca"){
          respuesta95="Nunca"
          valor19= this.state.getPonderacion[18].nunca
        }
      if(this.state.peticion1[20].Respuestas=="Siempre"){
        respuesta96="Siempre"
        valor20= this.state.getPonderacion[19].siempre
        }else if(this.state.peticion1[20].Respuestas=="CasiSiempre"){
          respuesta97="Casi Siempre"
          valor20= this.state.getPonderacion[19].casisiempre
        }
        else if(this.state.peticion1[20].Respuestas=="AlgunasVeces"){
          respuesta98="Algunas Veces"
          valor20= this.state.getPonderacion[19].algunasveces
        } 
        else if(this.state.peticion1[20].Respuestas=="CasiNunca"){
          respuesta99="Casi Nunca"
          valor20= this.state.getPonderacion[19].casinunca
        } 
        else if(this.state.peticion1[20].Respuestas=="Nunca"){
          respuesta100="Nunca"
          valor20= this.state.getPonderacion[19].nunca
        }

      if(this.state.peticion1[21].Respuestas=="Siempre"){
        respuesta101="Siempre"
        valor21= this.state.getPonderacion[20].siempre
        }else if(this.state.peticion1[21].Respuestas=="CasiSiempre"){
          respuesta102="Casi Siempre"
          valor21= this.state.getPonderacion[20].casisiempre
        }
        else if(this.state.peticion1[21].Respuestas=="AlgunasVeces"){
          respuesta103="Algunas Veces"
          valor21= this.state.getPonderacion[21].algunasveces
        } 
        else if(this.state.peticion1[21].Respuestas=="CasiNunca"){
          respuesta104="Casi Nunca"
          valor21= this.state.getPonderacion[20].casinunca
        } 
        else if(this.state.peticion1[21].Respuestas=="Nunca"){
          respuesta105="Nunca"
          valor21= this.state.getPonderacion[20].nunca
        } 

      if(this.state.peticion1[22].Respuestas=="Siempre"){
        respuesta106="Siempre"
        valor22= this.state.getPonderacion[21].siempre
        }else if(this.state.peticion1[22].Respuestas=="CasiSiempre"){
          respuesta107="Casi Siempre"
          valor22= this.state.getPonderacion[21].casisiempre
        }
        else if(this.state.peticion1[22].Respuestas=="AlgunasVeces"){
          respuesta108="Algunas Veces"
          valor22= this.state.getPonderacion[21].algunasveces
        } 
        else if(this.state.peticion1[2].Respuestas=="CasiNunca"){
          respuesta109="Casi Nunca"
          valor22= this.state.getPonderacion[21].casinunca
        } 
        else if(this.state.peticion1[22].Respuestas=="Nunca"){
          respuesta110="Nunca"
          valor22= this.state.getPonderacion[21].nunca
        } 

      if(this.state.peticion1[23].Respuestas=="Siempre"){
        respuesta111="Siempre"
        valor23= this.state.getPonderacion[22].siempre
        }else if(this.state.peticion1[23].Respuestas=="CasiSiempre"){
          respuesta112="Casi Siempre"
          valor23= this.state.getPonderacion[22].casisiempre
        }
        else if(this.state.peticion1[23].Respuestas=="AlgunasVeces"){
          respuesta113="Algunas Veces"
          valor23= this.state.getPonderacion[22].algunasveces
        } 
        else if(this.state.peticion1[23].Respuestas=="CasiNunca"){
          respuesta114="Casi Nunca"
          valor23= this.state.getPonderacion[22].casinunca
        } 
        else if(this.state.peticion1[23].Respuestas=="Nunca"){
          respuesta115="Nunca"
          valor23= this.state.getPonderacion[22].nunca
        } 
      if(this.state.peticion1[24].Respuestas=="Siempre"){
        respuesta116="Siempre"
        valor24= this.state.getPonderacion[23].siempre
        }else if(this.state.peticion1[24].Respuestas=="CasiSiempre"){
          respuesta117="Casi Siempre"
          valor24= this.state.getPonderacion[23].casisiempre
        }
        else if(this.state.peticion1[24].Respuestas=="AlgunasVeces"){
          respuesta118="Algunas Veces"
          valor24= this.state.getPonderacion[23].algunasveces
        } 
        else if(this.state.peticion1[24].Respuestas=="CasiNunca"){
          respuesta119="Casi Nunca"
          valor24= this.state.getPonderacion[23].casinunca
        } 
        else if(this.state.peticion1[24].Respuestas=="Nunca"){
          respuesta120="Nunca"
          valor24= this.state.getPonderacion[23].nunca
        }
        
      if(this.state.peticion1[25].Respuestas=="Siempre"){
        respuesta121="Siempre"
        valor25= this.state.getPonderacion[24].siempre
        }else if(this.state.peticion1[25].Respuestas=="CasiSiempre"){
          respuesta122="Casi Siempre"
          valor25= this.state.getPonderacion[24].casisiempre
        }
        else if(this.state.peticion1[25].Respuestas=="AlgunasVeces"){
          respuesta123="Algunas Veces"
          valor25= this.state.getPonderacion[24].algunasveces
        } 
        else if(this.state.peticion1[25].Respuestas=="CasiNunca"){
          respuesta124="Casi Nunca"
          valor25= this.state.getPonderacion[24].casinunca
        } 
        else if(this.state.peticion1[25].Respuestas=="Nunca"){
          respuesta125="Nunca"
          valor25= this.state.getPonderacion[24].nunca
        }
      if(this.state.peticion1[26].Respuestas=="Siempre"){
        respuesta126="Siempre"
        valor26= this.state.getPonderacion[25].siempre
        }else if(this.state.peticion1[26].Respuestas=="CasiSiempre"){
          respuesta127="Casi Siempre"
          valor26= this.state.getPonderacion[25].casisiempre
        }
        else if(this.state.peticion1[26].Respuestas=="AlgunasVeces"){
          respuesta128="Algunas Veces"
          valor26= this.state.getPonderacion[25].algunasveces
        } 
        else if(this.state.peticion1[26].Respuestas=="CasiNunca"){
          respuesta129="Casi Nunca"
          valor26= this.state.getPonderacion[25].casinunca
        } 
        else if(this.state.peticion1[26].Respuestas=="Nunca"){
          respuesta130="Nunca"
          valor26= this.state.getPonderacion[25].nunca
        }
      if(this.state.peticion1[27].Respuestas=="Siempre"){
        respuesta131="Siempre"
        valor27= this.state.getPonderacion[26].siempre
        }else if(this.state.peticion1[27].Respuestas=="CasiSiempre"){
          respuesta132="Casi Siempre"
          valor27= this.state.getPonderacion[26].casisiempre
        }
        else if(this.state.peticion1[27].Respuestas=="AlgunasVeces"){
          respuesta133="Algunas Veces"
          valor27= this.state.getPonderacion[26].algunasveces
        } 
        else if(this.state.peticion1[27].Respuestas=="CasiNunca"){
          respuesta134="Casi Nunca"
          valor27= this.state.getPonderacion[26].casinunca
        } 
        else if(this.state.peticion1[27].Respuestas=="Nunca"){
          respuesta135="Nunca"
          valor27= this.state.getPonderacion[26].nunca
      }
    if(this.state.peticion1[28].Respuestas=="Siempre"){
      respuesta136="Siempre"
      valor28= this.state.getPonderacion[27].siempre
      }else if(this.state.peticion1[28].Respuestas=="CasiSiempre"){
        respuesta137="Casi Siempre"
        valor28= this.state.getPonderacion[27].casisiempre
      }
      else if(this.state.peticion1[28].Respuestas=="AlgunasVeces"){
        respuesta138="Algunas Veces"
        valor28= this.state.getPonderacion[27].algunasveces
      } 
      else if(this.state.peticion1[28].Respuestas=="CasiNunca"){
        respuesta139="Casi Nunca"
        valor28= this.state.getPonderacion[27].casinunca
      } 
      else if(this.state.peticion1[28].Respuestas=="Nunca"){
        respuesta140="Nunca"
        valor28= this.state.getPonderacion[27].nunca
      }
    if(this.state.peticion1[29].Respuestas=="Siempre"){
      respuesta141="Siempre"
      valor29= this.state.getPonderacion[28].siempre
      }else if(this.state.peticion1[29].Respuestas=="CasiSiempre"){
        respuesta142="Casi Siempre"
        valor29= this.state.getPonderacion[28].casisiempre
      }
      else if(this.state.peticion1[29].Respuestas=="AlgunasVeces"){
        respuesta143="Algunas Veces"
        valor29= this.state.getPonderacion[28].algunasveces
      } 
      else if(this.state.peticion1[29].Respuestas=="CasiNunca"){
        respuesta144="Casi Nunca"
        valor29= this.state.getPonderacion[28].casinunca
      } 
      else if(this.state.peticion1[29].Respuestas=="Nunca"){
        respuesta145="Nunca"
        valor29= this.state.getPonderacion[28].nunca
      }

    if(this.state.peticion1[30].Respuestas=="Siempre"){
      respuesta146="Siempre"
      valor30= this.state.getPonderacion[29].siempre
      }else if(this.state.peticion1[30].Respuestas=="CasiSiempre"){
        respuesta147="Casi Siempre"
        valor30= this.state.getPonderacion[29].casisiempre
      }
      else if(this.state.peticion1[30].Respuestas=="AlgunasVeces"){
        respuesta148="Algunas Veces"
        valor30= this.state.getPonderacion[29].algunasveces
      } 
      else if(this.state.peticion1[30].Respuestas=="CasiNunca"){
        respuesta149="Casi Nunca"
        valor30= this.state.getPonderacion[29].casinunca
      } 
      else if(this.state.peticion1[30].Respuestas=="Nunca"){
        respuesta150="Nunca"
        valor30= this.state.getPonderacion[29].nunca
      }

    if(this.state.peticion1[31].Respuestas=="Siempre"){
      respuesta151="Siempre"
      valor31= this.state.getPonderacion[30].siempre
      }else if(this.state.peticion1[31].Respuestas=="CasiSiempre"){
        respuesta152="Casi Siempre"
        valor31= this.state.getPonderacion[30].casisiempre
      }
      else if(this.state.peticion1[31].Respuestas=="AlgunasVeces"){
        respuesta153="Algunas Veces"
        valor31= this.state.getPonderacion[30].algunasveces
      } 
      else if(this.state.peticion1[31].Respuestas=="CasiNunca"){
        respuesta154="Casi Nunca"
        valor31= this.state.getPonderacion[30].casinunca
      } 
      else if(this.state.peticion1[31].Respuestas=="Nunca"){
        respuesta155="Nunca"
        valor31= this.state.getPonderacion[30].nunca
      } 
    if(this.state.peticion1[32].Respuestas=="Siempre"){
      respuesta156="Siempre"
      valor32= this.state.getPonderacion[31].siempre
      }else if(this.state.peticion1[32].Respuestas=="CasiSiempre"){
        respuesta157="Casi Siempre"
        valor32= this.state.getPonderacion[31].casisiempre
      }
      else if(this.state.peticion1[32].Respuestas=="AlgunasVeces"){
        respuesta158="Algunas Veces"
        valor32= this.state.getPonderacion[31].algunasveces
      } 
      else if(this.state.peticion1[32].Respuestas=="CasiNunca"){
        respuesta159="Casi Nunca"
        valor32= this.state.getPonderacion[31].casinunca
      } 
      else if(this.state.peticion1[32].Respuestas=="Nunca"){
        respuesta160="Nunca"
        valor32= this.state.getPonderacion[31].nunca
      } 

      if(this.state.peticion1[33].Respuestas=="Siempre"){
        respuesta161="Siempre"
        valor33= this.state.getPonderacion[32].siempre
        }else if(this.state.peticion1[33].Respuestas=="CasiSiempre"){
          respuesta162="Casi Siempre"
          valor33= this.state.getPonderacion[32].casisiempre
        }
        else if(this.state.peticion1[33].Respuestas=="AlgunasVeces"){
          respuesta163="Algunas Veces"
          valor33= this.state.getPonderacion[32].algunasveces
        } 
        else if(this.state.peticion1[33].Respuestas=="CasiNunca"){
          respuesta164="Casi Nunca"
          valor33= this.state.getPonderacion[32].casinunca
        } 
        else if(this.state.peticion1[33].Respuestas=="Nunca"){
          respuesta165="Nunca"
          valor33= this.state.getPonderacion[32].nunca
        } 

      if(this.state.peticion1[34].Respuestas=="Siempre"){
        respuesta166="Siempre"
        valor34= this.state.getPonderacion[33].siempre
        }else if(this.state.peticion1[34].Respuestas=="CasiSiempre"){
          respuesta167="Casi Siempre"
          valor34= this.state.getPonderacion[33].casisiempre
        }
        else if(this.state.peticion1[34].Respuestas=="AlgunasVeces"){
          respuesta168="Algunas Veces"
          valor34= this.state.getPonderacion[33].algunasveces
        } 
        else if(this.state.peticion1[34].Respuestas=="CasiNunca"){
          respuesta169="Casi Nunca"
          valor34= this.state.getPonderacion[33].casinunca
        } 
        else if(this.state.peticion1[34].Respuestas=="Nunca"){
          respuesta170="Nunca"
          valor34= this.state.getPonderacion[33].nunca
        } 
        if(this.state.peticion1[35].Respuestas=="Siempre"){
          respuesta171="Siempre"
          valor35= this.state.getPonderacion[34].siempre
          }else if(this.state.peticion1[35].Respuestas=="CasiSiempre"){
            respuesta172="Casi Siempre"
            valor35= this.state.getPonderacion[34].casisiempre
          }
          else if(this.state.peticion1[35].Respuestas=="AlgunasVeces"){
            respuesta173="Algunas Veces"
            valor35= this.state.getPonderacion[34].algunasveces
          } 
          else if(this.state.peticion1[35].Respuestas=="CasiNunca"){
            respuesta174="Casi Nunca"
            valor35= this.state.getPonderacion[34].casinunca
          } 
          else if(this.state.peticion1[35].Respuestas=="Nunca"){
            respuesta175="Nunca"
            valor35= this.state.getPonderacion[34].nunca
          } 

        if(this.state.peticion1[36].Respuestas=="Siempre"){
          respuesta176="Siempre"
          valor36= this.state.getPonderacion[35].siempre
          }else if(this.state.peticion1[36].Respuestas=="CasiSiempre"){
            respuesta177="Casi Siempre"
            valor36= this.state.getPonderacion[35].casisiempre
          }
          else if(this.state.peticion1[36].Respuestas=="AlgunasVeces"){
            respuesta178="Algunas Veces"
            valor36= this.state.getPonderacion[35].algunasveces
          } 
          else if(this.state.peticion1[36].Respuestas=="CasiNunca"){
            respuesta179="Casi Nunca"
            valor36= this.state.getPonderacion[35].casinunca
          } 
          else if(this.state.peticion1[36].Respuestas=="Nunca"){
            respuesta180="Nunca"
            valor36= this.state.getPonderacion[35].nunca
          }

        if(this.state.peticion1[37].Respuestas=="Siempre"){
          respuesta181="Siempre"
          valor37= this.state.getPonderacion[36].siempre
          
          }else if(this.state.peticion1[37].Respuestas=="CasiSiempre"){
            respuesta182="Casi Siempre"
            valor37= this.state.getPonderacion[36].casisiempre
          }
          else if(this.state.peticion1[37].Respuestas=="AlgunasVeces"){
            respuesta183="Algunas Veces"
            valor37= this.state.getPonderacion[36].algunasveces
          } 
          else if(this.state.peticion1[37].Respuestas=="CasiNunca"){
            respuesta184="Casi Nunca"
            valor37= this.state.getPonderacion[36].casinunca
          } 
          else if(this.state.peticion1[37].Respuestas=="Nunca"){
            respuesta185="Nunca"
            valor37= this.state.getPonderacion[36].nunca
          }
        if(this.state.peticion1[38].Respuestas=="Siempre"){
          respuesta186="Siempre"
          valor38= this.state.getPonderacion[37].siempre
          }else if(this.state.peticion1[38].Respuestas=="CasiSiempre"){
            respuesta187="Casi Siempre"
            valor38= this.state.getPonderacion[37].casisiempre
          }
          else if(this.state.peticion1[38].Respuestas=="AlgunasVeces"){
            respuesta188="Algunas Veces"
            valor38= this.state.getPonderacion[37].algunasveces
          } 
          else if(this.state.peticion1[38].Respuestas=="CasiNunca"){
            respuesta189="Casi Nunca"
            valor38= this.state.getPonderacion[37].casinunca
          } 
          else if(this.state.peticion1[38].Respuestas=="Nunca"){
            respuesta190="Nunca"
            valor38= this.state.getPonderacion[37].nunca
          }

          if(this.state.peticion1[39].Respuestas=="Siempre"){
            respuesta191="Siempre"
            valor39= this.state.getPonderacion[38].siempre
            }else if(this.state.peticion1[39].Respuestas=="CasiSiempre"){
              respuesta192="Casi Siempre"
              valor39= this.state.getPonderacion[38].casisiempre
            }
            else if(this.state.peticion1[39].Respuestas=="AlgunasVeces"){
              respuesta193="Algunas Veces"
              valor39= this.state.getPonderacion[38].algunasveces
            } 
            else if(this.state.peticion1[39].Respuestas=="CasiNunca"){
              respuesta194="Casi Nunca"
              valor39= this.state.getPonderacion[38].casinunca
            } 
            else if(this.state.peticion1[39].Respuestas=="Nunca"){
              respuesta195="Nunca"
              valor39= this.state.getPonderacion[38].nunca
            }

            if(this.state.peticion1[40].Respuestas=="Siempre"){
              respuesta196="Siempre"
              valor40= this.state.getPonderacion[39].siempre
              }else if(this.state.peticion1[40].Respuestas=="CasiSiempre"){
                respuesta197="Casi Siempre"
                valor40= this.state.getPonderacion[39].casisiempre
              }
              else if(this.state.peticion1[40].Respuestas=="AlgunasVeces"){
                respuesta198="Algunas Veces"
                valor40= this.state.getPonderacion[39].algunasveces
              } 
              else if(this.state.peticion1[40].Respuestas=="CasiNunca"){
                respuesta199="Casi Nunca"
                valor40= this.state.getPonderacion[39].casinunca
              } 
              else if(this.state.peticion1[40].Respuestas=="Nunca"){
                respuesta200="Nunca"
                valor40= this.state.getPonderacion[39].nunca
              }

            if(this.state.peticion1[42].Respuestas=="Siempre"){
              respuesta201="Siempre"
              valor41= this.state.getPonderacion[40].siempre
            }else if(this.state.peticion1[42].Respuestas=="CasiSiempre"){
              respuesta202="Casi Siempre"
              valor41= this.state.getPonderacion[40].casisiempre
            }
            else if(this.state.peticion1[42].Respuestas=="AlgunasVeces"){
              respuesta203="Algunas Veces"
              valor41= this.state.getPonderacion[40].algunasveces
            } 
            else if(this.state.peticion1[42].Respuestas=="CasiNunca"){
              respuesta204="Casi Nunca"
              valor41= this.state.getPonderacion[40].casinunca
            } 
            else if(this.state.peticion1[42].Respuestas=="Nunca"){
              respuesta205="Nunca"
              valor41= this.state.getPonderacion[40].nunca
            }
          if(this.state.peticion1[43].Respuestas=="Siempre"){
            respuesta206="Siempre"
            valor42= this.state.getPonderacion[41].siempre
          }else if(this.state.peticion1[43].Respuestas=="CasiSiempre"){
            respuesta207="Casi Siempre"
            valor42= this.state.getPonderacion[41].casisiempre
          }
          else if(this.state.peticion1[43].Respuestas=="AlgunasVeces"){
            respuesta208="Algunas Veces"
            valor42= this.state.getPonderacion[41].algunasveces
          } 
          else if(this.state.peticion1[43].Respuestas=="CasiNunca"){
            respuesta209="Casi Nunca"
            valor42= this.state.getPonderacion[41].casinunca
          } 
          else if(this.state.peticion1[43].Respuestas=="Nunca"){
            respuesta210="Nunca"
            valor42= this.state.getPonderacion[41].nunca
          }
        if(this.state.peticion1[44].Respuestas=="Siempre"){
          respuesta211="Siempre"
          valor43= this.state.getPonderacion[42].siempre
        }else if(this.state.peticion1[44].Respuestas=="CasiSiempre"){
          respuesta212="Casi Siempre"
          valor43= this.state.getPonderacion[42].casisiempre
        }
        else if(this.state.peticion1[44].Respuestas=="AlgunasVeces"){
          respuesta213="Algunas Veces"
          valor43= this.state.getPonderacion[42].algunasveces
        } 
        else if(this.state.peticion1[44].Respuestas=="CasiNunca"){
          respuesta214="Casi Nunca"
          valor43= this.state.getPonderacion[42].casinunca
        } 
        else if(this.state.peticion1[44].Respuestas=="Nunca"){
          respuesta215="Nunca"
          valor43= this.state.getPonderacion[42].nunca
        }

      if(this.state.peticion1[46].Respuestas=="Siempre"){
        respuesta216="Siempre"
        valor44= this.state.getPonderacion[43].siempre
      }else if(this.state.peticion1[46].Respuestas=="CasiSiempre"){
        respuesta217="Casi Siempre"
        valor44= this.state.getPonderacion[43].casisiempre
      }
      else if(this.state.peticion1[46].Respuestas=="AlgunasVeces"){
        respuesta218="Algunas Veces"
        valor44= this.state.getPonderacion[43].algunasveces
      } 
      else if(this.state.peticion1[46].Respuestas=="CasiNunca"){
        respuesta219="Casi Nunca"
        valor44= this.state.getPonderacion[43].casinunca
      } 
      else if(this.state.peticion1[46].Respuestas=="Nunca"){
        respuesta220="Nunca"
        valor44= this.state.getPonderacion[43].nunca
      }

    if(this.state.peticion1[47].Respuestas=="Siempre"){
      respuesta221="Siempre"
      valor45= this.state.getPonderacion[44].siempre
    }else if(this.state.peticion1[47].Respuestas=="CasiSiempre"){
      respuesta222="Casi Siempre"
      valor45= this.state.getPonderacion[44].casisiempre
    }
    else if(this.state.peticion1[47].Respuestas=="AlgunasVeces"){
      respuesta223="Algunas Veces"
      valor45= this.state.getPonderacion[44].algunasveces
    } 
    else if(this.state.peticion1[47].Respuestas=="CasiNunca"){
      respuesta224="Casi Nunca"
      valor45= this.state.getPonderacion[44].casinunca
    } 
    else if(this.state.peticion1[47].Respuestas=="Nunca"){
      respuesta225="Nunca"
      valor45= this.state.getPonderacion[44].nunca
    }
    if(this.state.peticion1[48].Respuestas=="Siempre"){
      respuesta226="Siempre"
      valor46= this.state.getPonderacion[45].siempre
    }else if(this.state.peticion1[48].Respuestas=="CasiSiempre"){
      respuesta227="Casi Siempre"
      valor46= this.state.getPonderacion[45].casisiempre
    }
    else if(this.state.peticion1[48].Respuestas=="AlgunasVeces"){
      respuesta228="Algunas Veces"
      valor46= this.state.getPonderacion[45].algunasveces
    } 
    else if(this.state.peticion1[48].Respuestas=="CasiNunca"){
      respuesta229="Casi Nunca"
      valor46= this.state.getPonderacion[45].casinunca
    } 
    else if(this.state.peticion1[48].Respuestas=="Nunca"){
      respuesta230="Nunca"
      valor46= this.state.getPonderacion[45].nunca
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////7
  if(this.state.peticion2.length>0){
    
  if(this.state.peticion2[1].Respuestas=="Siempre"){
    pet2res1="Siempre"
    pet2val1= this.state.getPonderacion[0].siempre
    }else if(this.state.peticion2[1].Respuestas=="CasiSiempre"){
      pet2res2="Casi Siempre"
      pet2val1= this.state.getPonderacion[0].casisiempre
    }
    else if(this.state.peticion2[1].Respuestas=="AlgunasVeces"){
      pet2res3="Algunas Veces"
      pet2val1= this.state.getPonderacion[0].algunasveces
    } 
    else if(this.state.peticion2[1].Respuestas=="CasiNunca"){
      pet2res4="Casi Nunca"
      pet2val1= this.state.getPonderacion[0].casinunca
    } 
    else if(this.state.peticion2[1].Respuestas=="Nunca"){
      pet2res5="Nunca"
      pet2val1= this.state.getPonderacion[0].nunca
    } 


  if(this.state.peticion2[2].Respuestas=="Siempre"){
    pet2res6="Siempre"
    pet2val2= this.state.getPonderacion[1].siempre
    }else if(this.state.peticion2[2].Respuestas=="CasiSiempre"){
      pet2res7="Casi Siempre"
      pet2val2= this.state.getPonderacion[1].casisiempre
    }
    else if(this.state.peticion2[2].Respuestas=="AlgunasVeces"){
      pet2res8="Algunas Veces"
      pet2val2= this.state.getPonderacion[1].algunasveces
    } 
    else if(this.state.peticion2[2].Respuestas=="CasiNunca"){
      pet2res9="Casi Nunca"
      pet2val2= this.state.getPonderacion[2].casinunca
    } 
    else if(this.state.peticion2[2].Respuestas=="Nunca"){
      pet2res10="Nunca"
      pet2val2= this.state.getPonderacion[1].nunca
    } 

    if(this.state.peticion2[3].Respuestas=="Siempre"){
      pet2res11="Siempre"
      pet2val3= this.state.getPonderacion[2].siempre
      }else if(this.state.peticion2[3].Respuestas=="CasiSiempre"){
        pet2res12="Casi Siempre"
        pet2val3= this.state.getPonderacion[2].casisiempre
      }
      else if(this.state.peticion2[3].Respuestas=="AlgunasVeces"){
        pet2res13="Algunas Veces"
        pet2val3= this.state.getPonderacion[2].algunasveces
      } 
      else if(this.state.peticion2[3].Respuestas=="CasiNunca"){
        pet2res14="Casi Nunca"
        pet2val3= this.state.getPonderacion[2].casinunca
      } 
      else if(this.state.peticion2[3].Respuestas=="Nunca"){
        pet2res15="Nunca"
        pet2val3= this.state.getPonderacion[2].nunca
      } 


    if(this.state.peticion2[4].Respuestas=="Siempre"){
      pet2res16="Siempre"
      pet2val4= this.state.getPonderacion[3].siempre
      }else if(this.state.peticion2[4].Respuestas=="CasiSiempre"){
        pet2res17="Casi Siempre"
        pet2val4= this.state.getPonderacion[3].casisiempre
      }
      else if(this.state.peticion2[4].Respuestas=="AlgunasVeces"){
        pet2res18="Algunas Veces"
        pet2val4= this.state.getPonderacion[3].algunasveces
      } 
      else if(this.state.peticion2[4].Respuestas=="CasiNunca"){
        pet2res19="Casi Nunca"
        pet2val4= this.state.getPonderacion[3].casinunca
      } 
      else if(this.state.peticion2[4].Respuestas=="Nunca"){
        pet2res20="Nunca"
        pet2val4= this.state.getPonderacion[3].nunca
      } 

    if(this.state.peticion2[5].Respuestas=="Siempre"){
      pet2res21="Siempre"
      pet2val5= this.state.getPonderacion[4].siempre
      }else if(this.state.peticion2[5].Respuestas=="CasiSiempre"){
        pet2res22="Casi Siempre"
        pet2val5= this.state.getPonderacion[4].casisiempre
      }
      else if(this.state.peticion2[5].Respuestas=="AlgunasVeces"){
        pet2res23="Algunas Veces"
        pet2val5= this.state.getPonderacion[4].algunasveces
      } 
      else if(this.state.peticion2[5].Respuestas=="CasiNunca"){
        pet2res24="Casi Nunca"
        pet2val5= this.state.getPonderacion[4].casinunca
      } 
      else if(this.state.peticion2[5].Respuestas=="Nunca"){
        pet2res25="Nunca"
        pet2val5= this.state.getPonderacion[4].nunca
      } 


      if(this.state.peticion2[6].Respuestas=="Siempre"){
        pet2res26="Siempre"
        pet2val6= this.state.getPonderacion[5].siempre
        }else if(this.state.peticion2[6].Respuestas=="CasiSiempre"){
          pet2res27="Casi Siempre"
          pet2val6= this.state.getPonderacion[5].casisiempre
        }
        else if(this.state.peticion2[6].Respuestas=="AlgunasVeces"){
          pet2res28="Algunas Veces"
          pet2val6= this.state.getPonderacion[5].algunasveces
        } 
        else if(this.state.peticion2[6].Respuestas=="CasiNunca"){
          pet2res29="Casi Nunca"
          pet2val6= this.state.getPonderacion[5].casinunca
        } 
        else if(this.state.peticion2[6].Respuestas=="Nunca"){
          pet2res30="Nunca"
          pet2val6= this.state.getPonderacion[5].nunca
        }

      if(this.state.peticion2[7].Respuestas=="Siempre"){
        pet2res31="Siempre"
        pet2val7= this.state.getPonderacion[6].siempre
        }else if(this.state.peticion2[7].Respuestas=="CasiSiempre"){
          pet2res32="Casi Siempre"
          pet2val7= this.state.getPonderacion[6].casisiempre
        }
        else if(this.state.peticion2[7].Respuestas=="AlgunasVeces"){
          pet2res33="Algunas Veces"
          pet2val7= this.state.getPonderacion[6].algunasveces
        } 
        else if(this.state.peticion2[7].Respuestas=="CasiNunca"){
          pet2res34="Casi Nunca"
          pet2val7= this.state.getPonderacion[6].casinunca
        } 
        else if(this.state.peticion2[7].Respuestas=="Nunca"){
          pet2res35="Nunca"
          pet2val7= this.state.getPonderacion[6].nunca
        }

        if(this.state.peticion2[8].Respuestas=="Siempre"){
          pet2res36="Siempre"
          pet2val8= this.state.getPonderacion[7].siempre
          }else if(this.state.peticion2[8].Respuestas=="CasiSiempre"){
            pet2res37="Casi Siempre"
            pet2val8= this.state.getPonderacion[7].casisiempre
          }
          else if(this.state.peticion2[8].Respuestas=="AlgunasVeces"){
            pet2res38="Algunas Veces"
            pet2val8= this.state.getPonderacion[7].algunasveces
          } 
          else if(this.state.peticion2[8].Respuestas=="CasiNunca"){
            pet2res39="Casi Nunca"
            pet2val8= this.state.getPonderacion[7].casinunca
          } 
          else if(this.state.peticion2[8].Respuestas=="Nunca"){
            pet2res40="Nunca"
            pet2val8= this.state.getPonderacion[7].nunca
          }
        if(this.state.peticion2[9].Respuestas=="Siempre"){
          pet2res41="Siempre"
          pet2val9= this.state.getPonderacion[8].siempre
          }else if(this.state.peticion2[9].Respuestas=="CasiSiempre"){
            pet2res42="Casi Siempre"
            pet2val9= this.state.getPonderacion[8].casisiempre
          }
          else if(this.state.peticion2[9].Respuestas=="AlgunasVeces"){
            pet2res43="Algunas Veces"
            pet2val9= this.state.getPonderacion[8].algunasveces
          } 
          else if(this.state.peticion2[9].Respuestas=="CasiNunca"){
            pet2res44="Casi Nunca"
            pet2val9= this.state.getPonderacion[8].casinunca
          } 
          else if(this.state.peticion2[9].Respuestas=="Nunca"){
            pet2res45="Nunca"
            pet2val9= this.state.getPonderacion[8].nunca
          }

      if(this.state.peticion2[10].Respuestas=="Siempre"){
        pet2res46="Siempre"
        pet2val10= this.state.getPonderacion[9].siempre
        }else if(this.state.peticion2[10].Respuestas=="CasiSiempre"){
          pet2res47="Casi Siempre"
          pet2val10= this.state.getPonderacion[9].casisiempre
        }
        else if(this.state.peticion2[10].Respuestas=="AlgunasVeces"){
          pet2res48="Algunas Veces"
          pet2val10= this.state.getPonderacion[9].algunasveces
        } 
        else if(this.state.peticion2[10].Respuestas=="CasiNunca"){
          pet2res49="Casi Nunca"
          pet2val10= this.state.getPonderacion[9].casinunca
        } 
        else if(this.state.peticion2[10].Respuestas=="Nunca"){
          pet2res50="Nunca"
          pet2val10= this.state.getPonderacion[9].nunca
        }

      if(this.state.peticion2[11].Respuestas=="Siempre"){
        pet2res51="Siempre"
        pet2val11= this.state.getPonderacion[10].siempre
        }else if(this.state.peticion2[11].Respuestas=="CasiSiempre"){
          pet2res52="Casi Siempre"
          pet2val11= this.state.getPonderacion[10].casisiempre
        }
        else if(this.state.peticion2[11].Respuestas=="AlgunasVeces"){
          pet2res53="Algunas Veces"
          pet2val11= this.state.getPonderacion[10].algunasveces
        } 
        else if(this.state.peticion2[11].Respuestas=="CasiNunca"){
          pet2res54="Casi Nunca"
          pet2val11= this.state.getPonderacion[10].casinunca
        } 
        else if(this.state.peticion2[11].Respuestas=="Nunca"){
          pet2res55="Nunca"
          pet2val11= this.state.getPonderacion[10].nunca
        }
      if(this.state.peticion2[12].Respuestas=="Siempre"){
        pet2res56="Siempre"
        pet2val12= this.state.getPonderacion[11].siempre
        }else if(this.state.peticion2[12].Respuestas=="CasiSiempre"){
          pet2res57="Casi Siempre"
          pet2val12= this.state.getPonderacion[11].casisiempre
        }
        else if(this.state.peticion2[12].Respuestas=="AlgunasVeces"){
          pet2res58="Algunas Veces"
          pet2val12= this.state.getPonderacion[11].algunasveces
        } 
        else if(this.state.peticion2[12].Respuestas=="CasiNunca"){
          pet2res59="Casi Nunca"
          pet2val12= this.state.getPonderacion[11].casinunca
        } 
        else if(this.state.peticion2[12].Respuestas=="Nunca"){
          pet2res60="Nunca"
          pet2val12= this.state.getPonderacion[11].nunca
        }
       
      if(this.state.peticion2[13].Respuestas=="Siempre"){
        pet2res61="Siempre"
        pet2val13= this.state.getPonderacion[12].siempre
        }else if(this.state.peticion2[13].Respuestas=="CasiSiempre"){
          pet2res62="Casi Siempre"
          pet2val13= this.state.getPonderacion[12].casisiempre
        }
        else if(this.state.peticion2[13].Respuestas=="AlgunasVeces"){
          pet2res63="Algunas Veces"
          pet2val13= this.state.getPonderacion[12].algunasveces
        } 
        else if(this.state.peticion2[13].Respuestas=="CasiNunca"){
          pet2res64="Casi Nunca"
          pet2val13= this.state.getPonderacion[12].casinunca
        } 
        else if(this.state.peticion2[13].Respuestas=="Nunca"){
          pet2res65="Nunca"
          pet2val13= this.state.getPonderacion[12].nunca
        }
      if(this.state.peticion2[14].Respuestas=="Siempre"){
        pet2res66="Siempre"
        pet2val14= this.state.getPonderacion[13].siempre
        }else if(this.state.peticion2[14].Respuestas=="CasiSiempre"){
          pet2res67="Casi Siempre"
          pet2val14= this.state.getPonderacion[13].casisiempre
        }
        else if(this.state.peticion2[14].Respuestas=="AlgunasVeces"){
          pet2res68="Algunas Veces"
          pet2val14= this.state.getPonderacion[13].algunasveces
        } 
        else if(this.state.peticion2[14].Respuestas=="CasiNunca"){
          pet2res69="Casi Nunca"
          pet2val14= this.state.getPonderacion[13].casinunca
        } 
        else if(this.state.peticion2[14].Respuestas=="Nunca"){
          pet2res70="Nunca"
          pet2val14= this.state.getPonderacion[13].nunca
        } 

      if(this.state.peticion2[15].Respuestas=="Siempre"){
        pet2res71="Siempre"
        pet2val15= this.state.getPonderacion[14].siempre
        }else if(this.state.peticion2[15].Respuestas=="CasiSiempre"){
          pet2res72="Casi Siempre"
          pet2val15= this.state.getPonderacion[14].casisiempre
        }
        else if(this.state.peticion2[15].Respuestas=="AlgunasVeces"){
          pet2res73="Algunas Veces"
          pet2val15= this.state.getPonderacion[14].algunasveces
        } 
        else if(this.state.peticion2[15].Respuestas=="CasiNunca"){
          pet2res74="Casi Nunca"
          pet2val15= this.state.getPonderacion[14].casinunca
        } 
        else if(this.state.peticion2[15].Respuestas=="Nunca"){
          pet2res75="Nunca"
          pet2val15= this.state.getPonderacion[14].nunca
        } 
      if(this.state.peticion2[16].Respuestas=="Siempre"){
        pet2res76="Siempre"
        pet2val16= this.state.getPonderacion[15].siempre
        }else if(this.state.peticion2[16].Respuestas=="CasiSiempre"){
          pet2res77="Casi Siempre"
          pet2val16= this.state.getPonderacion[15].casisiempre
        }
        else if(this.state.peticion2[16].Respuestas=="AlgunasVeces"){
          pet2res78="Algunas Veces"
          pet2val16= this.state.getPonderacion[15].algunasveces
        } 
        else if(this.state.peticion2[16].Respuestas=="CasiNunca"){
          pet2res79="Casi Nunca"
          pet2val16= this.state.getPonderacion[15].casinunca
        } 
        else if(this.state.peticion2[16].Respuestas=="Nunca"){
          pet2res80="Nunca"
          pet2val16= this.state.getPonderacion[15].nunca
        }
      if(this.state.peticion2[17].Respuestas=="Siempre"){
        pet2res81="Siempre"
        pet2val17= this.state.getPonderacion[16].siempre
        }else if(this.state.peticion2[17].Respuestas=="CasiSiempre"){
          pet2res82="Casi Siempre"
          pet2val17= this.state.getPonderacion[16].casisiempre
        }
        else if(this.state.peticion2[17].Respuestas=="AlgunasVeces"){
          pet2res83="Algunas Veces"
          pet2val17= this.state.getPonderacion[16].algunasveces
        } 
        else if(this.state.peticion2[17].Respuestas=="CasiNunca"){
          pet2res84="Casi Nunca"
          pet2val17= this.state.getPonderacion[16].casinunca
        } 
        else if(this.state.peticion2[17].Respuestas=="Nunca"){
          pet2res85="Nunca"
          pet2val17= this.state.getPonderacion[16].nunca
        }
      if(this.state.peticion2[18].Respuestas=="Siempre"){
        pet2res86="Siempre"
        pet2val18= this.state.getPonderacion[17].siempre
        }else if(this.state.peticion2[18].Respuestas=="CasiSiempre"){
          pet2res87="Casi Siempre"
          pet2val18= this.state.getPonderacion[17].casisiempre
        }
        else if(this.state.peticion2[18].Respuestas=="AlgunasVeces"){
          pet2res88="Algunas Veces"
          pet2val18= this.state.getPonderacion[17].algunasveces
        } 
        else if(this.state.peticion2[18].Respuestas=="CasiNunca"){
          pet2res89="Casi Nunca"
          pet2val18= this.state.getPonderacion[17].casinunca
        } 
        else if(this.state.peticion2[18].Respuestas=="Nunca"){
          pet2res90="Nunca"
          pet2val18= this.state.getPonderacion[17].nunca
        }

      if(this.state.peticion2[19].Respuestas=="Siempre"){
        pet2res91="Siempre"
        pet2val19= this.state.getPonderacion[18].siempre
        }else if(this.state.peticion2[19].Respuestas=="CasiSiempre"){
          pet2res92="Casi Siempre"
          pet2val19= this.state.getPonderacion[18].casisiempre
        }
        else if(this.state.peticion2[19].Respuestas=="AlgunasVeces"){
          pet2res93="Algunas Veces"
          pet2val19= this.state.getPonderacion[18].algunasveces
        } 
        else if(this.state.peticion2[19].Respuestas=="CasiNunca"){
          pet2res94="Casi Nunca"
          pet2val19= this.state.getPonderacion[18].casinunca
        } 
        else if(this.state.peticion2[19].Respuestas=="Nunca"){
          pet2res95="Nunca"
          pet2val19= this.state.getPonderacion[18].nunca
        }
      if(this.state.peticion2[20].Respuestas=="Siempre"){
        pet2res96="Siempre"
        pet2val20= this.state.getPonderacion[19].siempre
        }else if(this.state.peticion2[20].Respuestas=="CasiSiempre"){
          pet2res97="Casi Siempre"
          pet2val20= this.state.getPonderacion[19].casisiempre
        }
        else if(this.state.peticion2[20].Respuestas=="AlgunasVeces"){
          pet2res98="Algunas Veces"
          pet2val20= this.state.getPonderacion[19].algunasveces
        } 
        else if(this.state.peticion2[20].Respuestas=="CasiNunca"){
          pet2res99="Casi Nunca"
          pet2val20= this.state.getPonderacion[19].casinunca
        } 
        else if(this.state.peticion2[20].Respuestas=="Nunca"){
          pet2res100="Nunca"
          pet2val20= this.state.getPonderacion[19].nunca
        }

      if(this.state.peticion2[21].Respuestas=="Siempre"){
        pet2res101="Siempre"
        pet2val21= this.state.getPonderacion[20].siempre
        }else if(this.state.peticion2[21].Respuestas=="CasiSiempre"){
          pet2res102="Casi Siempre"
          pet2val21= this.state.getPonderacion[20].casisiempre
        }
        else if(this.state.peticion2[21].Respuestas=="AlgunasVeces"){
          pet2res103="Algunas Veces"
          pet2val21= this.state.getPonderacion[21].algunasveces
        } 
        else if(this.state.peticion2[21].Respuestas=="CasiNunca"){
          pet2res104="Casi Nunca"
          pet2val21= this.state.getPonderacion[20].casinunca
        } 
        else if(this.state.peticion2[21].Respuestas=="Nunca"){
          pet2res105="Nunca"
          pet2val21= this.state.getPonderacion[20].nunca
        } 

      if(this.state.peticion2[22].Respuestas=="Siempre"){
        pet2res106="Siempre"
        pet2val22= this.state.getPonderacion[21].siempre
        }else if(this.state.peticion2[22].Respuestas=="CasiSiempre"){
          pet2res107="Casi Siempre"
          pet2val22= this.state.getPonderacion[21].casisiempre
        }
        else if(this.state.peticion2[22].Respuestas=="AlgunasVeces"){
          pet2res108="Algunas Veces"
          pet2val22= this.state.getPonderacion[21].algunasveces
        } 
        else if(this.state.peticion2[2].Respuestas=="CasiNunca"){
          pet2res109="Casi Nunca"
          pet2val22= this.state.getPonderacion[21].casinunca
        } 
        else if(this.state.peticion2[22].Respuestas=="Nunca"){
          pet2res110="Nunca"
          pet2val22= this.state.getPonderacion[21].nunca
        } 

      if(this.state.peticion2[23].Respuestas=="Siempre"){
        pet2res111="Siempre"
        pet2val23= this.state.getPonderacion[22].siempre
        }else if(this.state.peticion2[23].Respuestas=="CasiSiempre"){
          pet2res112="Casi Siempre"
          pet2val23= this.state.getPonderacion[22].casisiempre
        }
        else if(this.state.peticion2[23].Respuestas=="AlgunasVeces"){
          pet2res113="Algunas Veces"
          pet2val23= this.state.getPonderacion[22].algunasveces
        } 
        else if(this.state.peticion2[23].Respuestas=="CasiNunca"){
          pet2res114="Casi Nunca"
          pet2val23= this.state.getPonderacion[22].casinunca
        } 
        else if(this.state.peticion2[23].Respuestas=="Nunca"){
          pet2res115="Nunca"
          pet2val23= this.state.getPonderacion[22].nunca
        } 
      if(this.state.peticion2[24].Respuestas=="Siempre"){
        pet2res116="Siempre"
        pet2val24= this.state.getPonderacion[23].siempre
        }else if(this.state.peticion2[24].Respuestas=="CasiSiempre"){
          pet2res117="Casi Siempre"
          pet2val24= this.state.getPonderacion[23].casisiempre
        }
        else if(this.state.peticion2[24].Respuestas=="AlgunasVeces"){
          pet2res118="Algunas Veces"
          pet2val24= this.state.getPonderacion[23].algunasveces
        } 
        else if(this.state.peticion2[24].Respuestas=="CasiNunca"){
          pet2res119="Casi Nunca"
          pet2val24= this.state.getPonderacion[23].casinunca
        } 
        else if(this.state.peticion2[24].Respuestas=="Nunca"){
          pet2res120="Nunca"
          pet2val24= this.state.getPonderacion[23].nunca
        }
        
      if(this.state.peticion2[25].Respuestas=="Siempre"){
        pet2res121="Siempre"
        pet2val25= this.state.getPonderacion[24].siempre
        }else if(this.state.peticion2[25].Respuestas=="CasiSiempre"){
          pet2res122="Casi Siempre"
          pet2val25= this.state.getPonderacion[24].casisiempre
        }
        else if(this.state.peticion2[25].Respuestas=="AlgunasVeces"){
          pet2res123="Algunas Veces"
          pet2val25= this.state.getPonderacion[24].algunasveces
        } 
        else if(this.state.peticion2[25].Respuestas=="CasiNunca"){
          pet2res124="Casi Nunca"
          pet2val25= this.state.getPonderacion[24].casinunca
        } 
        else if(this.state.peticion2[25].Respuestas=="Nunca"){
          pet2res125="Nunca"
          pet2val25= this.state.getPonderacion[24].nunca
        }
      if(this.state.peticion2[26].Respuestas=="Siempre"){
        pet2res126="Siempre"
        pet2val26= this.state.getPonderacion[25].siempre
        }else if(this.state.peticion2[26].Respuestas=="CasiSiempre"){
          pet2res127="Casi Siempre"
          pet2val26= this.state.getPonderacion[25].casisiempre
        }
        else if(this.state.peticion2[26].Respuestas=="AlgunasVeces"){
          pet2res128="Algunas Veces"
          pet2val26= this.state.getPonderacion[25].algunasveces
        } 
        else if(this.state.peticion2[26].Respuestas=="CasiNunca"){
          pet2res129="Casi Nunca"
          pet2val26= this.state.getPonderacion[25].casinunca
        } 
        else if(this.state.peticion2[26].Respuestas=="Nunca"){
          pet2res130="Nunca"
          pet2val26= this.state.getPonderacion[25].nunca
        }
      if(this.state.peticion2[27].Respuestas=="Siempre"){
        pet2res131="Siempre"
        pet2val27= this.state.getPonderacion[26].siempre
        }else if(this.state.peticion2[27].Respuestas=="CasiSiempre"){
          pet2res132="Casi Siempre"
          pet2val27= this.state.getPonderacion[26].casisiempre
        }
        else if(this.state.peticion2[27].Respuestas=="AlgunasVeces"){
          pet2res133="Algunas Veces"
          pet2val27= this.state.getPonderacion[26].algunasveces
        } 
        else if(this.state.peticion2[27].Respuestas=="CasiNunca"){
          pet2res134="Casi Nunca"
          pet2val27= this.state.getPonderacion[26].casinunca
        } 
        else if(this.state.peticion2[27].Respuestas=="Nunca"){
          pet2res135="Nunca"
          pet2val27= this.state.getPonderacion[26].nunca
      }
    if(this.state.peticion2[28].Respuestas=="Siempre"){
      pet2res136="Siempre"
      pet2val28= this.state.getPonderacion[27].siempre
      }else if(this.state.peticion2[28].Respuestas=="CasiSiempre"){
        pet2res137="Casi Siempre"
        pet2val28= this.state.getPonderacion[27].casisiempre
      }
      else if(this.state.peticion2[28].Respuestas=="AlgunasVeces"){
        pet2res138="Algunas Veces"
        pet2val28= this.state.getPonderacion[27].algunasveces
      } 
      else if(this.state.peticion2[28].Respuestas=="CasiNunca"){
        pet2res139="Casi Nunca"
        pet2val28= this.state.getPonderacion[27].casinunca
      } 
      else if(this.state.peticion2[28].Respuestas=="Nunca"){
        pet2res140="Nunca"
        pet2val28= this.state.getPonderacion[27].nunca
      }
    if(this.state.peticion2[29].Respuestas=="Siempre"){
      pet2res141="Siempre"
      pet2val29= this.state.getPonderacion[28].siempre
      }else if(this.state.peticion2[29].Respuestas=="CasiSiempre"){
        pet2res142="Casi Siempre"
        pet2val29= this.state.getPonderacion[28].casisiempre
      }
      else if(this.state.peticion2[29].Respuestas=="AlgunasVeces"){
        pet2res143="Algunas Veces"
        pet2val29= this.state.getPonderacion[28].algunasveces
      } 
      else if(this.state.peticion2[29].Respuestas=="CasiNunca"){
        pet2res144="Casi Nunca"
        pet2val29= this.state.getPonderacion[28].casinunca
      } 
      else if(this.state.peticion2[29].Respuestas=="Nunca"){
        pet2res145="Nunca"
        pet2val29= this.state.getPonderacion[28].nunca
      }

    if(this.state.peticion2[30].Respuestas=="Siempre"){
      pet2res146="Siempre"
      pet2val30= this.state.getPonderacion[29].siempre
      }else if(this.state.peticion2[30].Respuestas=="CasiSiempre"){
        pet2res147="Casi Siempre"
        pet2val30= this.state.getPonderacion[29].casisiempre
      }
      else if(this.state.peticion2[30].Respuestas=="AlgunasVeces"){
        pet2res148="Algunas Veces"
        pet2val30= this.state.getPonderacion[29].algunasveces
      } 
      else if(this.state.peticion2[30].Respuestas=="CasiNunca"){
        pet2res149="Casi Nunca"
        pet2val30= this.state.getPonderacion[29].casinunca
      } 
      else if(this.state.peticion2[30].Respuestas=="Nunca"){
        pet2res150="Nunca"
        pet2val30= this.state.getPonderacion[29].nunca
      }

    if(this.state.peticion2[31].Respuestas=="Siempre"){
      pet2res151="Siempre"
      pet2val31= this.state.getPonderacion[30].siempre
      }else if(this.state.peticion2[31].Respuestas=="CasiSiempre"){
        pet2res152="Casi Siempre"
        pet2val31= this.state.getPonderacion[30].casisiempre
      }
      else if(this.state.peticion2[31].Respuestas=="AlgunasVeces"){
        pet2res153="Algunas Veces"
        pet2val31= this.state.getPonderacion[30].algunasveces
      } 
      else if(this.state.peticion2[31].Respuestas=="CasiNunca"){
        pet2res154="Casi Nunca"
        pet2val31= this.state.getPonderacion[30].casinunca
      } 
      else if(this.state.peticion2[31].Respuestas=="Nunca"){
        pet2res155="Nunca"
        pet2val31= this.state.getPonderacion[30].nunca
      } 
    if(this.state.peticion2[32].Respuestas=="Siempre"){
      pet2res156="Siempre"
      pet2val32= this.state.getPonderacion[31].siempre
      }else if(this.state.peticion2[32].Respuestas=="CasiSiempre"){
        pet2res157="Casi Siempre"
        pet2val32= this.state.getPonderacion[31].casisiempre
      }
      else if(this.state.peticion2[32].Respuestas=="AlgunasVeces"){
        pet2res158="Algunas Veces"
        pet2val32= this.state.getPonderacion[31].algunasveces
      } 
      else if(this.state.peticion2[32].Respuestas=="CasiNunca"){
        pet2res159="Casi Nunca"
        pet2val32= this.state.getPonderacion[31].casinunca
      } 
      else if(this.state.peticion2[32].Respuestas=="Nunca"){
        pet2res160="Nunca"
        pet2val32= this.state.getPonderacion[31].nunca
      } 

      if(this.state.peticion2[33].Respuestas=="Siempre"){
        pet2res161="Siempre"
        pet2val33= this.state.getPonderacion[32].siempre
        }else if(this.state.peticion2[33].Respuestas=="CasiSiempre"){
          pet2res162="Casi Siempre"
          pet2val33= this.state.getPonderacion[32].casisiempre
        }
        else if(this.state.peticion2[33].Respuestas=="AlgunasVeces"){
          pet2res163="Algunas Veces"
          pet2val33= this.state.getPonderacion[32].algunasveces
        } 
        else if(this.state.peticion2[33].Respuestas=="CasiNunca"){
          pet2res164="Casi Nunca"
          pet2val33= this.state.getPonderacion[32].casinunca
        } 
        else if(this.state.peticion2[33].Respuestas=="Nunca"){
          pet2res165="Nunca"
          pet2val33= this.state.getPonderacion[32].nunca
        } 

      if(this.state.peticion2[34].Respuestas=="Siempre"){
        pet2res166="Siempre"
        pet2val34= this.state.getPonderacion[33].siempre
        }else if(this.state.peticion2[34].Respuestas=="CasiSiempre"){
          pet2res167="Casi Siempre"
          pet2val34= this.state.getPonderacion[33].casisiempre
        }
        else if(this.state.peticion2[34].Respuestas=="AlgunasVeces"){
          pet2res168="Algunas Veces"
          pet2val34= this.state.getPonderacion[33].algunasveces
        } 
        else if(this.state.peticion2[34].Respuestas=="CasiNunca"){
          pet2res169="Casi Nunca"
          pet2val34= this.state.getPonderacion[33].casinunca
        } 
        else if(this.state.peticion2[34].Respuestas=="Nunca"){
          pet2res170="Nunca"
          pet2val34= this.state.getPonderacion[33].nunca
        } 
        if(this.state.peticion2[35].Respuestas=="Siempre"){
          pet2res171="Siempre"
          pet2val35= this.state.getPonderacion[34].siempre
          }else if(this.state.peticion2[35].Respuestas=="CasiSiempre"){
            pet2res172="Casi Siempre"
            pet2val35= this.state.getPonderacion[34].casisiempre
          }
          else if(this.state.peticion2[35].Respuestas=="AlgunasVeces"){
            pet2res173="Algunas Veces"
            pet2val35= this.state.getPonderacion[34].algunasveces
          } 
          else if(this.state.peticion2[35].Respuestas=="CasiNunca"){
            pet2res174="Casi Nunca"
            pet2val35= this.state.getPonderacion[34].casinunca
          } 
          else if(this.state.peticion2[15].Respuestas=="Nunca"){
            pet2res175="Nunca"
            pet2val35= this.state.getPonderacion[34].nunca
          } 

        if(this.state.peticion2[36].Respuestas=="Siempre"){
          pet2res176="Siempre"
          pet2val36= this.state.getPonderacion[35].siempre
          }else if(this.state.peticion2[36].Respuestas=="CasiSiempre"){
            pet2res177="Casi Siempre"
            pet2val36= this.state.getPonderacion[35].casisiempre
          }
          else if(this.state.peticion2[36].Respuestas=="AlgunasVeces"){
            pet2res178="Algunas Veces"
            pet2val36= this.state.getPonderacion[35].algunasveces
          } 
          else if(this.state.peticion2[36].Respuestas=="CasiNunca"){
            pet2res179="Casi Nunca"
            pet2val36= this.state.getPonderacion[35].casinunca
          } 
          else if(this.state.peticion2[36].Respuestas=="Nunca"){
            pet2res180="Nunca"
            pet2val36= this.state.getPonderacion[35].nunca
          }

        if(this.state.peticion2[37].Respuestas=="Siempre"){
          pet2res181="Siempre"
          pet2val37= this.state.getPonderacion[36].siempre
          
          }else if(this.state.peticion2[37].Respuestas=="CasiSiempre"){
            pet2res182="Casi Siempre"
            pet2val37= this.state.getPonderacion[36].casisiempre
          }
          else if(this.state.peticion2[37].Respuestas=="AlgunasVeces"){
            pet2res183="Algunas Veces"
            pet2val37= this.state.getPonderacion[36].algunasveces
          } 
          else if(this.state.peticion2[37].Respuestas=="CasiNunca"){
            pet2res184="Casi Nunca"
            pet2val37= this.state.getPonderacion[36].casinunca
          } 
          else if(this.state.peticion2[37].Respuestas=="Nunca"){
            pet2res185="Nunca"
            pet2val37= this.state.getPonderacion[36].nunca
          }
        if(this.state.peticion2[38].Respuestas=="Siempre"){
          pet2res186="Siempre"
          pet2val38= this.state.getPonderacion[37].siempre
          }else if(this.state.peticion2[38].Respuestas=="CasiSiempre"){
            pet2res187="Casi Siempre"
            pet2val38= this.state.getPonderacion[37].casisiempre
          }
          else if(this.state.peticion2[38].Respuestas=="AlgunasVeces"){
            pet2res188="Algunas Veces"
            pet2val38= this.state.getPonderacion[37].algunasveces
          } 
          else if(this.state.peticion2[38].Respuestas=="CasiNunca"){
            pet2res189="Casi Nunca"
            pet2val38= this.state.getPonderacion[37].casinunca
          } 
          else if(this.state.peticion2[38].Respuestas=="Nunca"){
            pet2res190="Nunca"
            pet2val38= this.state.getPonderacion[37].nunca
          }

          if(this.state.peticion2[39].Respuestas=="Siempre"){
            pet2res191="Siempre"
            pet2val39= this.state.getPonderacion[38].siempre
            }else if(this.state.peticion2[39].Respuestas=="CasiSiempre"){
              pet2res192="Casi Siempre"
              pet2val39= this.state.getPonderacion[38].casisiempre
            }
            else if(this.state.peticion2[39].Respuestas=="AlgunasVeces"){
              pet2res193="Algunas Veces"
              pet2val39= this.state.getPonderacion[38].algunasveces
            } 
            else if(this.state.peticion2[39].Respuestas=="CasiNunca"){
              pet2res194="Casi Nunca"
              pet2val39= this.state.getPonderacion[38].casinunca
            } 
            else if(this.state.peticion2[39].Respuestas=="Nunca"){
              pet2res195="Nunca"
              pet2val39= this.state.getPonderacion[38].nunca
            }

            if(this.state.peticion2[40].Respuestas=="Siempre"){
              pet2res196="Siempre"
              pet2val40= this.state.getPonderacion[39].siempre
              }else if(this.state.peticion2[40].Respuestas=="CasiSiempre"){
                pet2res197="Casi Siempre"
                pet2val40= this.state.getPonderacion[39].casisiempre
              }
              else if(this.state.peticion2[40].Respuestas=="AlgunasVeces"){
                pet2res198="Algunas Veces"
                pet2val40= this.state.getPonderacion[39].algunasveces
              } 
              else if(this.state.peticion2[40].Respuestas=="CasiNunca"){
                pet2res199="Casi Nunca"
                pet2val40= this.state.getPonderacion[39].casinunca
              } 
              else if(this.state.peticion2[40].Respuestas=="Nunca"){
                pet2res200="Nunca"
                pet2val40= this.state.getPonderacion[39].nunca
              }

            if(this.state.peticion2[42].Respuestas=="Siempre"){
              pet2res201="Siempre"
              pet2val41= this.state.getPonderacion[40].siempre
            }else if(this.state.peticion2[42].Respuestas=="CasiSiempre"){
              pet2res202="Casi Siempre"
              pet2val41= this.state.getPonderacion[40].casisiempre
            }
            else if(this.state.peticion2[42].Respuestas=="AlgunasVeces"){
              pet2res203="Algunas Veces"
              pet2val41= this.state.getPonderacion[40].algunasveces
            } 
            else if(this.state.peticion2[42].Respuestas=="CasiNunca"){
              pet2res204="Casi Nunca"
              pet2val41= this.state.getPonderacion[40].casinunca
            } 
            else if(this.state.peticion2[42].Respuestas=="Nunca"){
              pet2res205="Nunca"
              pet2val41= this.state.getPonderacion[40].nunca
            }
          if(this.state.peticion2[43].Respuestas=="Siempre"){
            pet2res206="Siempre"
            pet2val42= this.state.getPonderacion[41].siempre
          }else if(this.state.peticion2[43].Respuestas=="CasiSiempre"){
            pet2res207="Casi Siempre"
            pet2val42= this.state.getPonderacion[41].casisiempre
          }
          else if(this.state.peticion2[43].Respuestas=="AlgunasVeces"){
            pet2res208="Algunas Veces"
            pet2val42= this.state.getPonderacion[41].algunasveces
          } 
          else if(this.state.peticion2[43].Respuestas=="CasiNunca"){
            pet2res209="Casi Nunca"
            pet2val42= this.state.getPonderacion[41].casinunca
          } 
          else if(this.state.peticion2[43].Respuestas=="Nunca"){
            pet2res210="Nunca"
            pet2val42= this.state.getPonderacion[41].nunca
          }
        if(this.state.peticion2[44].Respuestas=="Siempre"){
          pet2res211="Siempre"
          pet2val43= this.state.getPonderacion[42].siempre
        }else if(this.state.peticion2[44].Respuestas=="CasiSiempre"){
          pet2res212="Casi Siempre"
          pet2val43= this.state.getPonderacion[42].casisiempre
        }
        else if(this.state.peticion2[44].Respuestas=="AlgunasVeces"){
          pet2res213="Algunas Veces"
          pet2val43= this.state.getPonderacion[42].algunasveces
        } 
        else if(this.state.peticion2[44].Respuestas=="CasiNunca"){
          pet2res214="Casi Nunca"
          pet2val43= this.state.getPonderacion[42].casinunca
        } 
        else if(this.state.peticion2[44].Respuestas=="Nunca"){
          pet2res215="Nunca"
          pet2val43= this.state.getPonderacion[42].nunca
        }
      if(this.state.peticion2[46].Respuestas=="Siempre"){
        pet2res216="Siempre"
        pet2val44= this.state.getPonderacion[43].siempre
      }else if(this.state.peticion2[46].Respuestas=="CasiSiempre"){
        pet2res217="Casi Siempre"
        pet2val44= this.state.getPonderacion[43].casisiempre
      }
      else if(this.state.peticion2[46].Respuestas=="AlgunasVeces"){
        pet2res218="Algunas Veces"
        pet2val44= this.state.getPonderacion[43].algunasveces
      } 
      else if(this.state.peticion2[46].Respuestas=="CasiNunca"){
        pet2res219="Casi Nunca"
        pet2val44= this.state.getPonderacion[43].casinunca
      } 
      else if(this.state.peticion2[46].Respuestas=="Nunca"){
        pet2res220="Nunca"
        pet2val44= this.state.getPonderacion[43].nunca
      }

    if(this.state.peticion2[47].Respuestas=="Siempre"){
      pet2res221="Siempre"
      pet2val45= this.state.getPonderacion[44].siempre
    }else if(this.state.peticion2[47].Respuestas=="CasiSiempre"){
      pet2res222="Casi Siempre"
      pet2val45= this.state.getPonderacion[44].casisiempre
    }
    else if(this.state.peticion2[47].Respuestas=="AlgunasVeces"){
      pet2res223="Algunas Veces"
      pet2val45= this.state.getPonderacion[44].algunasveces
    } 
    else if(this.state.peticion2[47].Respuestas=="CasiNunca"){
      pet2res224="Casi Nunca"
      pet2val45= this.state.getPonderacion[44].casinunca
    } 
    else if(this.state.peticion2[47].Respuestas=="Nunca"){
      pet2res225="Nunca"
      pet2val45= this.state.getPonderacion[44].nunca
    }
    if(this.state.peticion2[48].Respuestas=="Siempre"){
      pet2res226="Siempre"
      pet2val46= this.state.getPonderacion[45].siempre
    }else if(this.state.peticion2[48].Respuestas=="CasiSiempre"){
      pet2res227="Casi Siempre"
      pet2val46= this.state.getPonderacion[45].casisiempre
    }
    else if(this.state.peticion2[48].Respuestas=="AlgunasVeces"){
      pet2res228="Algunas Veces"
      pet2val46= this.state.getPonderacion[45].algunasveces
    } 
    else if(this.state.peticion2[48].Respuestas=="CasiNunca"){
      pet2res229="Casi Nunca"
      pet2val46= this.state.getPonderacion[45].casinunca
    } 
    else if(this.state.peticion2[48].Respuestas=="Nunca"){
      pet2res230="Nunca"
      pet2val46= this.state.getPonderacion[45].nunca
    }
    
    } 
  
 ///////////////////////////////////////////////////////////////////////////////////////////////////////

 if(this.state.peticion3.length>0){
console.log("entro a la peticion 3" )
  if(this.state.peticion3[1].Respuestas=="Siempre"){
    pet3res1="Siempre"
    pet3val1= this.state.getPonderacion[0].siempre
    
    }else if(this.state.peticion3[1].Respuestas=="CasiSiempre"){
      pet3res2="Casi Siempre"
      pet3val1= this.state.getPonderacion[0].casisiempre
    }
    else if(this.state.peticion3[1].Respuestas=="AlgunasVeces"){
      pet3res3="Algunas Veces"
      pet3val1= this.state.getPonderacion[0].algunasveces
    } 
    else if(this.state.peticion3[1].Respuestas=="CasiNunca"){
      pet3res4="Casi Nunca"
      pet3val1= this.state.getPonderacion[0].casinunca
    } 
    else if(this.state.peticion3[1].Respuestas=="Nunca"){
      pet3res5="Nunca"
      pet3val1= this.state.getPonderacion[0].nunca
    } 
   
  if(this.state.peticion3[2].Respuestas=="Siempre"){
    pet3res6="Siempre"
    pet3val2= this.state.getPonderacion[1].siempre
    }else if(this.state.peticion3[2].Respuestas=="CasiSiempre"){
      pet3res7="Casi Siempre"
      pet3val2= this.state.getPonderacion[1].casisiempre
    }
    else if(this.state.peticion3[2].Respuestas=="AlgunasVeces"){
      pet3res8="Algunas Veces"
      pet3val2= this.state.getPonderacion[1].algunasveces
    } 
    else if(this.state.peticion3[2].Respuestas=="CasiNunca"){
      pet3res9="Casi Nunca"
      pet3val2= this.state.getPonderacion[1].casinunca
    } 
    else if(this.state.peticion3[2].Respuestas=="Nunca"){
      pet3res10="Nunca"
      pet3val2= this.state.getPonderacion[1].nunca
    } 

    if(this.state.peticion3[3].Respuestas=="Siempre"){
      pet3res11="Siempre"
      pet3val3= this.state.getPonderacion[2].siempre
      }else if(this.state.peticion3[3].Respuestas=="CasiSiempre"){
        pet3res12="Casi Siempre"
        pet3val3= this.state.getPonderacion[2].casisiempre
      }
      else if(this.state.peticion3[3].Respuestas=="AlgunasVeces"){
        pet3res13="Algunas Veces"
        pet3val3= this.state.getPonderacion[2].algunasveces
      } 
      else if(this.state.peticion3[3].Respuestas=="CasiNunca"){
        pet3res14="Casi Nunca"
        pet3val3= this.state.getPonderacion[2].casinunca
      } 
      else if(this.state.peticion3[3].Respuestas=="Nunca"){
        pet3res15="Nunca"
        pet3val3= this.state.getPonderacion[2].nunca
      } 


    if(this.state.peticion3[4].Respuestas=="Siempre"){
      pet3res16="Siempre"
      pet3val4= this.state.getPonderacion[3].siempre
      }else if(this.state.peticion3[4].Respuestas=="CasiSiempre"){
        pet3res17="Casi Siempre"
        pet3val4= this.state.getPonderacion[3].casisiempre
      }
      else if(this.state.peticion3[4].Respuestas=="AlgunasVeces"){
        pet3res18="Algunas Veces"
        pet3val4= this.state.getPonderacion[3].algunasveces
      } 
      else if(this.state.peticion3[4].Respuestas=="CasiNunca"){
        pet3res19="Casi Nunca"
        pet3val4= this.state.getPonderacion[3].casinunca
      } 
      else if(this.state.peticion3[4].Respuestas=="Nunca"){
        pet3res20="Nunca"
        pet3val4= this.state.getPonderacion[3].nunca
      } 

    if(this.state.peticion3[5].Respuestas=="Siempre"){
      pet3res21="Siempre"
      pet3val5= this.state.getPonderacion[4].siempre
      }else if(this.state.peticion3[5].Respuestas=="CasiSiempre"){
        pet3res22="Casi Siempre"
        pet3val5= this.state.getPonderacion[4].casisiempre
      }
      else if(this.state.peticion3[5].Respuestas=="AlgunasVeces"){
        pet3res23="Algunas Veces"
        pet3val5= this.state.getPonderacion[4].algunasveces
      } 
      else if(this.state.peticion3[5].Respuestas=="CasiNunca"){
        pet3res24="Casi Nunca"
        pet3val5= this.state.getPonderacion[4].casinunca
      } 
      else if(this.state.peticion3[5].Respuestas=="Nunca"){
        pet3res25="Nunca"
        pet3val5= this.state.getPonderacion[4].nunca
      } 


      if(this.state.peticion3[6].Respuestas=="Siempre"){
        pet3res26="Siempre"
        pet3val6= this.state.getPonderacion[5].siempre
        }else if(this.state.peticion3[6].Respuestas=="CasiSiempre"){
          pet3res27="Casi Siempre"
          pet3val6= this.state.getPonderacion[5].casisiempre
        }
        else if(this.state.peticion3[6].Respuestas=="AlgunasVeces"){
          pet3res28="Algunas Veces"
          pet3val6= this.state.getPonderacion[5].algunasveces
        } 
        else if(this.state.peticion3[6].Respuestas=="CasiNunca"){
          pet3res29="Casi Nunca"
          pet3val6= this.state.getPonderacion[5].casinunca
        } 
        else if(this.state.peticion3[6].Respuestas=="Nunca"){
          pet3res30="Nunca"
          pet3val6= this.state.getPonderacion[5].nunca
        }

      if(this.state.peticion3[7].Respuestas=="Siempre"){
        pet3res31="Siempre"
        pet3val7= this.state.getPonderacion[6].siempre
        }else if(this.state.peticion3[7].Respuestas=="CasiSiempre"){
          pet3res32="Casi Siempre"
          pet3val7= this.state.getPonderacion[6].casisiempre
        }
        else if(this.state.peticion3[7].Respuestas=="AlgunasVeces"){
          pet3res33="Algunas Veces"
          pet3val7= this.state.getPonderacion[6].algunasveces
        } 
        else if(this.state.peticion3[7].Respuestas=="CasiNunca"){
          pet3res34="Casi Nunca"
          pet3val7= this.state.getPonderacion[6].casinunca
        } 
        else if(this.state.peticion3[7].Respuestas=="Nunca"){
          pet3res35="Nunca"
          pet3val7= this.state.getPonderacion[6].nunca
        }

        if(this.state.peticion3[8].Respuestas=="Siempre"){
          pet3res36="Siempre"
          pet3val8= this.state.getPonderacion[7].siempre
          }else if(this.state.peticion3[8].Respuestas=="CasiSiempre"){
            pet3res37="Casi Siempre"
            pet3val8= this.state.getPonderacion[7].casisiempre
          }
          else if(this.state.peticion3[8].Respuestas=="AlgunasVeces"){
            pet3res38="Algunas Veces"
            pet3val8= this.state.getPonderacion[7].algunasveces
          } 
          else if(this.state.peticion3[8].Respuestas=="CasiNunca"){
            pet3res39="Casi Nunca"
            pet3val8= this.state.getPonderacion[7].casinunca
          } 
          else if(this.state.peticion3[8].Respuestas=="Nunca"){
            pet3res40="Nunca"
            pet3val8= this.state.getPonderacion[7].nunca
          }
        if(this.state.peticion3[9].Respuestas=="Siempre"){
          pet3res41="Siempre"
          pet3val9= this.state.getPonderacion[8].siempre
          }else if(this.state.peticion3[9].Respuestas=="CasiSiempre"){
            pet3res42="Casi Siempre"
            pet3val9= this.state.getPonderacion[8].casisiempre
          }
          else if(this.state.peticion3[9].Respuestas=="AlgunasVeces"){
            pet3res43="Algunas Veces"
            pet3val9= this.state.getPonderacion[8].algunasveces
          } 
          else if(this.state.peticion3[9].Respuestas=="CasiNunca"){
            pet3res44="Casi Nunca"
            pet3val9= this.state.getPonderacion[8].casinunca
          } 
          else if(this.state.peticion3[9].Respuestas=="Nunca"){
            pet3res45="Nunca"
            pet3val9= this.state.getPonderacion[8].nunca
          }

      if(this.state.peticion3[10].Respuestas=="Siempre"){
        pet3res46="Siempre"
        pet3val10= this.state.getPonderacion[9].siempre
        }else if(this.state.peticion3[10].Respuestas=="CasiSiempre"){
          pet3res47="Casi Siempre"
          pet3val10= this.state.getPonderacion[9].casisiempre
        }
        else if(this.state.peticion3[10].Respuestas=="AlgunasVeces"){
          pet3res48="Algunas Veces"
          pet3val10= this.state.getPonderacion[9].algunasveces
        } 
        else if(this.state.peticion3[10].Respuestas=="CasiNunca"){
          pet3res49="Casi Nunca"
          pet3val10= this.state.getPonderacion[9].casinunca
        } 
        else if(this.state.peticion3[10].Respuestas=="Nunca"){
          pet3res50="Nunca"
          pet3val10= this.state.getPonderacion[9].nunca
        }

      if(this.state.peticion3[11].Respuestas=="Siempre"){
        pet3res51="Siempre"
        pet3val11= this.state.getPonderacion[10].siempre
        }else if(this.state.peticion3[11].Respuestas=="CasiSiempre"){
          pet3res52="Casi Siempre"
          pet3val11= this.state.getPonderacion[10].casisiempre
        }
        else if(this.state.peticion3[11].Respuestas=="AlgunasVeces"){
          pet3res53="Algunas Veces"
          pet3val11= this.state.getPonderacion[10].algunasveces
        } 
        else if(this.state.peticion3[11].Respuestas=="CasiNunca"){
          pet3res54="Casi Nunca"
          pet3val11= this.state.getPonderacion[10].casinunca
        } 
        else if(this.state.peticion3[11].Respuestas=="Nunca"){
          pet3res55="Nunca"
          pet3val11= this.state.getPonderacion[10].nunca
        }
      if(this.state.peticion3[12].Respuestas=="Siempre"){
        pet3res56="Siempre"
        pet3val12= this.state.getPonderacion[11].siempre
        }else if(this.state.peticion3[12].Respuestas=="CasiSiempre"){
          pet3res57="Casi Siempre"
          pet3val12= this.state.getPonderacion[11].casisiempre
        }
        else if(this.state.peticion3[12].Respuestas=="AlgunasVeces"){
          pet3res58="Algunas Veces"
          pet3val12= this.state.getPonderacion[11].algunasveces
        } 
        else if(this.state.peticion3[12].Respuestas=="CasiNunca"){
          pet3res59="Casi Nunca"
          pet3val12= this.state.getPonderacion[11].casinunca
        } 
        else if(this.state.peticion3[12].Respuestas=="Nunca"){
          pet3res60="Nunca"
          pet3val12= this.state.getPonderacion[11].nunca
        }

      if(this.state.peticion3[13].Respuestas=="Siempre"){
        pet3res61="Siempre"
        pet3val13= this.state.getPonderacion[12].siempre
        }else if(this.state.peticion3[13].Respuestas=="CasiSiempre"){
          pet3res62="Casi Siempre"
          pet3val13= this.state.getPonderacion[12].casisiempre
        }
        else if(this.state.peticion3[13].Respuestas=="AlgunasVeces"){
          pet3res63="Algunas Veces"
          pet3val13= this.state.getPonderacion[12].algunasveces
        } 
        else if(this.state.peticion3[13].Respuestas=="CasiNunca"){
          pet3res64="Casi Nunca"
          pet3val13= this.state.getPonderacion[12].casinunca
        } 
        else if(this.state.peticion3[13].Respuestas=="Nunca"){
          pet3res65="Nunca"
          pet3val13= this.state.getPonderacion[12].nunca
        }
      if(this.state.peticion3[14].Respuestas=="Siempre"){
        pet3res66="Siempre"
        pet3val14= this.state.getPonderacion[13].siempre
        }else if(this.state.peticion3[14].Respuestas=="CasiSiempre"){
          pet3res67="Casi Siempre"
          pet3val14= this.state.getPonderacion[13].casisiempre
        }
        else if(this.state.peticion3[14].Respuestas=="AlgunasVeces"){
          pet3res68="Algunas Veces"
          pet3val14= this.state.getPonderacion[13].algunasveces
        } 
        else if(this.state.peticion3[14].Respuestas=="CasiNunca"){
          pet3res69="Casi Nunca"
          pet3val14= this.state.getPonderacion[13].casinunca
        } 
        else if(this.state.peticion3[14].Respuestas=="Nunca"){
          pet3res70="Nunca"
          pet3val14= this.state.getPonderacion[13].nunca
        } 

      if(this.state.peticion3[15].Respuestas=="Siempre"){
        pet3res71="Siempre"
        pet3val15= this.state.getPonderacion[14].siempre
        }else if(this.state.peticion3[15].Respuestas=="CasiSiempre"){
          pet3res72="Casi Siempre"
          pet3val15= this.state.getPonderacion[14].casisiempre
        }
        else if(this.state.peticion3[15].Respuestas=="AlgunasVeces"){
          pet3res73="Algunas Veces"
          pet3val15= this.state.getPonderacion[14].algunasveces
        } 
        else if(this.state.peticion3[15].Respuestas=="CasiNunca"){
          pet3res74="Casi Nunca"
          pet3val15= this.state.getPonderacion[14].casinunca
        } 
        else if(this.state.peticion3[15].Respuestas=="Nunca"){
          pet3res75="Nunca"
          pet3val15= this.state.getPonderacion[14].nunca
        } 
      if(this.state.peticion3[16].Respuestas=="Siempre"){
        pet3res76="Siempre"
        pet3val16= this.state.getPonderacion[15].siempre
        }else if(this.state.peticion3[16].Respuestas=="CasiSiempre"){
          pet3res77="Casi Siempre"
          pet3val16= this.state.getPonderacion[15].casisiempre
        }
        else if(this.state.peticion3[16].Respuestas=="AlgunasVeces"){
          pet3res78="Algunas Veces"
          pet3val16= this.state.getPonderacion[15].algunasveces
        } 
        else if(this.state.peticion3[16].Respuestas=="CasiNunca"){
          pet3res79="Casi Nunca"
          pet3val16= this.state.getPonderacion[15].casinunca
        } 
        else if(this.state.peticion3[16].Respuestas=="Nunca"){
          pet3res80="Nunca"
          pet3val16= this.state.getPonderacion[15].nunca
        }
      if(this.state.peticion3[17].Respuestas=="Siempre"){
        pet3res81="Siempre"
        pet3val17= this.state.getPonderacion[16].siempre
        }else if(this.state.peticion3[17].Respuestas=="CasiSiempre"){
          pet3res82="Casi Siempre"
          pet3val17= this.state.getPonderacion[16].casisiempre
        }
        else if(this.state.peticion3[17].Respuestas=="AlgunasVeces"){
          pet3res83="Algunas Veces"
          pet3val17= this.state.getPonderacion[16].algunasveces
        } 
        else if(this.state.peticion3[17].Respuestas=="CasiNunca"){
          pet3res84="Casi Nunca"
          pet3val17= this.state.getPonderacion[16].casinunca
        } 
        else if(this.state.peticion3[17].Respuestas=="Nunca"){
          pet3res85="Nunca"
          pet3val17= this.state.getPonderacion[16].nunca
        }
      if(this.state.peticion3[18].Respuestas=="Siempre"){
        pet3res86="Siempre"
        pet3val18= this.state.getPonderacion[17].siempre
        }else if(this.state.peticion3[18].Respuestas=="CasiSiempre"){
          pet3res87="Casi Siempre"
          pet3val18= this.state.getPonderacion[17].casisiempre
        }
        else if(this.state.peticion3[18].Respuestas=="AlgunasVeces"){
          pet3res88="Algunas Veces"
          pet3val18= this.state.getPonderacion[17].algunasveces
        } 
        else if(this.state.peticion3[18].Respuestas=="CasiNunca"){
          pet3res89="Casi Nunca"
          pet3val18= this.state.getPonderacion[17].casinunca
        } 
        else if(this.state.peticion3[18].Respuestas=="Nunca"){
          pet3res90="Nunca"
          pet3val18= this.state.getPonderacion[17].nunca
        }

      if(this.state.peticion3[19].Respuestas=="Siempre"){
        pet3res91="Siempre"
        pet3val19= this.state.getPonderacion[18].siempre
        }else if(this.state.peticion3[19].Respuestas=="CasiSiempre"){
          pet3res92="Casi Siempre"
          pet3val19= this.state.getPonderacion[18].casisiempre
        }
        else if(this.state.peticion3[19].Respuestas=="AlgunasVeces"){
          pet3res93="Algunas Veces"
          pet3val19= this.state.getPonderacion[18].algunasveces
        } 
        else if(this.state.peticion3[19].Respuestas=="CasiNunca"){
          pet3res94="Casi Nunca"
          pet3val19= this.state.getPonderacion[18].casinunca
        } 
        else if(this.state.peticion3[19].Respuestas=="Nunca"){
          pet3res95="Nunca"
          pet3val19= this.state.getPonderacion[18].nunca
        }
      if(this.state.peticion3[20].Respuestas=="Siempre"){
        pet3res96="Siempre"
        pet3val20= this.state.getPonderacion[19].siempre
        }else if(this.state.peticion3[20].Respuestas=="CasiSiempre"){
          pet3res97="Casi Siempre"
          pet3val20= this.state.getPonderacion[19].casisiempre
        }
        else if(this.state.peticion3[20].Respuestas=="AlgunasVeces"){
          pet3res98="Algunas Veces"
          pet3val20= this.state.getPonderacion[19].algunasveces
        } 
        else if(this.state.peticion3[20].Respuestas=="CasiNunca"){
          pet3res99="Casi Nunca"
          pet3val20= this.state.getPonderacion[19].casinunca
        } 
        else if(this.state.peticion3[20].Respuestas=="Nunca"){
          pet3res100="Nunca"
          pet3val20= this.state.getPonderacion[19].nunca
        }

      if(this.state.peticion3[21].Respuestas=="Siempre"){
        pet3res101="Siempre"
        pet3val21= this.state.getPonderacion[20].siempre
        }else if(this.state.peticion3[21].Respuestas=="CasiSiempre"){
          pet3res102="Casi Siempre"
          pet3val21= this.state.getPonderacion[20].casisiempre
        }
        else if(this.state.peticion3[21].Respuestas=="AlgunasVeces"){
          pet3res103="Algunas Veces"
          pet3val21= this.state.getPonderacion[21].algunasveces
        } 
        else if(this.state.peticion3[21].Respuestas=="CasiNunca"){
          pet3res104="Casi Nunca"
          pet3val21= this.state.getPonderacion[20].casinunca
        } 
        else if(this.state.peticion3[21].Respuestas=="Nunca"){
          pet3res105="Nunca"
          pet3val21= this.state.getPonderacion[20].nunca
        } 

      if(this.state.peticion3[22].Respuestas=="Siempre"){
        pet3res106="Siempre"
        pet3val22= this.state.getPonderacion[21].siempre
        }else if(this.state.peticion3[22].Respuestas=="CasiSiempre"){
          pet3res107="Casi Siempre"
          pet3val22= this.state.getPonderacion[21].casisiempre
        }
        else if(this.state.peticion3[22].Respuestas=="AlgunasVeces"){
          pet3res108="Algunas Veces"
          pet3val22= this.state.getPonderacion[21].algunasveces
        } 
        else if(this.state.peticion3[2].Respuestas=="CasiNunca"){
          pet3res109="Casi Nunca"
          pet3val22= this.state.getPonderacion[21].casinunca
        } 
        else if(this.state.peticion3[22].Respuestas=="Nunca"){
          pet3res110="Nunca"
          pet3val22= this.state.getPonderacion[21].nunca
        } 

      if(this.state.peticion3[23].Respuestas=="Siempre"){
        pet3res111="Siempre"
        pet3val23= this.state.getPonderacion[22].siempre
        }else if(this.state.peticion3[23].Respuestas=="CasiSiempre"){
          pet3res112="Casi Siempre"
          pet3val23= this.state.getPonderacion[22].casisiempre
        }
        else if(this.state.peticion3[23].Respuestas=="AlgunasVeces"){
          pet3res113="Algunas Veces"
          pet3val23= this.state.getPonderacion[22].algunasveces
        } 
        else if(this.state.peticion3[23].Respuestas=="CasiNunca"){
          pet3res114="Casi Nunca"
          pet3val23= this.state.getPonderacion[22].casinunca
        } 
        else if(this.state.peticion3[23].Respuestas=="Nunca"){
          pet3res115="Nunca"
          pet3val23= this.state.getPonderacion[22].nunca
        } 
      if(this.state.peticion3[24].Respuestas=="Siempre"){
        pet3res116="Siempre"
        pet3val24= this.state.getPonderacion[23].siempre
        }else if(this.state.peticion3[24].Respuestas=="CasiSiempre"){
          pet3res117="Casi Siempre"
          pet3val24= this.state.getPonderacion[23].casisiempre
        }
        else if(this.state.peticion3[24].Respuestas=="AlgunasVeces"){
          pet3res118="Algunas Veces"
          pet3val24= this.state.getPonderacion[23].algunasveces
        } 
        else if(this.state.peticion3[24].Respuestas=="CasiNunca"){
          pet3res119="Casi Nunca"
          pet3val24= this.state.getPonderacion[23].casinunca
        } 
        else if(this.state.peticion3[24].Respuestas=="Nunca"){
          pet3res120="Nunca"
          pet3val24= this.state.getPonderacion[23].nunca
        }
        
      if(this.state.peticion3[25].Respuestas=="Siempre"){
        pet3res121="Siempre"
        pet3val25= this.state.getPonderacion[24].siempre
        }else if(this.state.peticion3[25].Respuestas=="CasiSiempre"){
          pet3res122="Casi Siempre"
          pet3val25= this.state.getPonderacion[24].casisiempre
        }
        else if(this.state.peticion3[25].Respuestas=="AlgunasVeces"){
          pet3res123="Algunas Veces"
          pet3val25= this.state.getPonderacion[24].algunasveces
        } 
        else if(this.state.peticion3[25].Respuestas=="CasiNunca"){
          pet3res124="Casi Nunca"
          pet3val25= this.state.getPonderacion[24].casinunca
        } 
        else if(this.state.peticion3[25].Respuestas=="Nunca"){
          pet3res125="Nunca"
          pet3val25= this.state.getPonderacion[24].nunca
        }
      if(this.state.peticion3[26].Respuestas=="Siempre"){
        pet3res126="Siempre"
        pet3val26= this.state.getPonderacion[25].siempre
        }else if(this.state.peticion3[26].Respuestas=="CasiSiempre"){
          pet3res127="Casi Siempre"
          pet3val26= this.state.getPonderacion[25].casisiempre
        }
        else if(this.state.peticion3[26].Respuestas=="AlgunasVeces"){
          pet3res128="Algunas Veces"
          pet3val26= this.state.getPonderacion[25].algunasveces
        } 
        else if(this.state.peticion3[26].Respuestas=="CasiNunca"){
          pet3res129="Casi Nunca"
          pet3val26= this.state.getPonderacion[25].casinunca
        } 
        else if(this.state.peticion3[26].Respuestas=="Nunca"){
          pet3res130="Nunca"
          pet3val26= this.state.getPonderacion[25].nunca
        }
      if(this.state.peticion3[27].Respuestas=="Siempre"){
        pet3res131="Siempre"
        pet3val27= this.state.getPonderacion[26].siempre
        }else if(this.state.peticion3[27].Respuestas=="CasiSiempre"){
          pet3res132="Casi Siempre"
          pet3val27= this.state.getPonderacion[26].casisiempre
        }
        else if(this.state.peticion3[27].Respuestas=="AlgunasVeces"){
          pet3res133="Algunas Veces"
          pet3val27= this.state.getPonderacion[26].algunasveces
        } 
        else if(this.state.peticion3[27].Respuestas=="CasiNunca"){
          pet3res134="Casi Nunca"
          pet3val27= this.state.getPonderacion[26].casinunca
        } 
        else if(this.state.peticion3[27].Respuestas=="Nunca"){
          pet3res135="Nunca"
          pet3val27= this.state.getPonderacion[26].nunca
      }
    if(this.state.peticion3[28].Respuestas=="Siempre"){
      pet3res136="Siempre"
      pet3val28= this.state.getPonderacion[27].siempre
      }else if(this.state.peticion3[28].Respuestas=="CasiSiempre"){
        pet3res137="Casi Siempre"
        pet3val28= this.state.getPonderacion[27].casisiempre
      }
      else if(this.state.peticion3[28].Respuestas=="AlgunasVeces"){
        pet3res138="Algunas Veces"
        pet3val28= this.state.getPonderacion[27].algunasveces
      } 
      else if(this.state.peticion3[28].Respuestas=="CasiNunca"){
        pet3res139="Casi Nunca"
        pet3val28= this.state.getPonderacion[27].casinunca
      } 
      else if(this.state.peticion3[28].Respuestas=="Nunca"){
        pet3res140="Nunca"
        pet3val28= this.state.getPonderacion[27].nunca
      }
    if(this.state.peticion3[29].Respuestas=="Siempre"){
      pet3res141="Siempre"
      pet3val29= this.state.getPonderacion[28].siempre
      }else if(this.state.peticion3[29].Respuestas=="CasiSiempre"){
        pet3res142="Casi Siempre"
        pet3val29= this.state.getPonderacion[28].casisiempre
      }
      else if(this.state.peticion3[29].Respuestas=="AlgunasVeces"){
        pet3res143="Algunas Veces"
        pet3val29= this.state.getPonderacion[28].algunasveces
      } 
      else if(this.state.peticion3[29].Respuestas=="CasiNunca"){
        pet3res144="Casi Nunca"
        pet3val29= this.state.getPonderacion[28].casinunca
      } 
      else if(this.state.peticion3[29].Respuestas=="Nunca"){
        pet3res145="Nunca"
        pet3val29= this.state.getPonderacion[28].nunca
      }

    if(this.state.peticion3[30].Respuestas=="Siempre"){
      pet3res146="Siempre"
      pet3val30= this.state.getPonderacion[29].siempre
      }else if(this.state.peticion3[30].Respuestas=="CasiSiempre"){
        pet3res147="Casi Siempre"
        pet3val30= this.state.getPonderacion[29].casisiempre
      }
      else if(this.state.peticion3[30].Respuestas=="AlgunasVeces"){
        pet3res148="Algunas Veces"
        pet3val30= this.state.getPonderacion[29].algunasveces
      } 
      else if(this.state.peticion3[30].Respuestas=="CasiNunca"){
        pet3res149="Casi Nunca"
        pet3val30= this.state.getPonderacion[29].casinunca
      } 
      else if(this.state.peticion3[30].Respuestas=="Nunca"){
        pet3res150="Nunca"
        pet3val30= this.state.getPonderacion[29].nunca
      }

    if(this.state.peticion3[31].Respuestas=="Siempre"){
      pet3res151="Siempre"
      pet3val31= this.state.getPonderacion[30].siempre
      }else if(this.state.peticion3[31].Respuestas=="CasiSiempre"){
        pet3res152="Casi Siempre"
        pet3val31= this.state.getPonderacion[30].casisiempre
      }
      else if(this.state.peticion3[31].Respuestas=="AlgunasVeces"){
        pet3res153="Algunas Veces"
        pet3val31= this.state.getPonderacion[30].algunasveces
      } 
      else if(this.state.peticion3[31].Respuestas=="CasiNunca"){
        pet3res154="Casi Nunca"
        pet3val31= this.state.getPonderacion[30].casinunca
      } 
      else if(this.state.peticion3[31].Respuestas=="Nunca"){
        pet3res155="Nunca"
        pet3val31= this.state.getPonderacion[30].nunca
      } 
    if(this.state.peticion3[32].Respuestas=="Siempre"){
      pet3res156="Siempre"
      pet3val32= this.state.getPonderacion[31].siempre
      }else if(this.state.peticion3[32].Respuestas=="CasiSiempre"){
        pet3res157="Casi Siempre"
        pet3val32= this.state.getPonderacion[31].casisiempre
      }
      else if(this.state.peticion3[32].Respuestas=="AlgunasVeces"){
        pet3res158="Algunas Veces"
        pet3val32= this.state.getPonderacion[31].algunasveces
      } 
      else if(this.state.peticion3[32].Respuestas=="CasiNunca"){
        pet3res159="Casi Nunca"
        pet3val32= this.state.getPonderacion[31].casinunca
      } 
      else if(this.state.peticion3[32].Respuestas=="Nunca"){
        pet3res160="Nunca"
        pet3val32= this.state.getPonderacion[31].nunca
      } 

      if(this.state.peticion3[33].Respuestas=="Siempre"){
        pet3res161="Siempre"
        pet3val33= this.state.getPonderacion[32].siempre
        }else if(this.state.peticion3[33].Respuestas=="CasiSiempre"){
          pet3res162="Casi Siempre"
          pet3val33= this.state.getPonderacion[32].casisiempre
        }
        else if(this.state.peticion3[33].Respuestas=="AlgunasVeces"){
          pet3res163="Algunas Veces"
          pet3val33= this.state.getPonderacion[32].algunasveces
        } 
        else if(this.state.peticion3[33].Respuestas=="CasiNunca"){
          pet3res164="Casi Nunca"
          pet3val33= this.state.getPonderacion[32].casinunca
        } 
        else if(this.state.peticion3[33].Respuestas=="Nunca"){
          pet3res165="Nunca"
          pet3val33= this.state.getPonderacion[32].nunca
        } 

      if(this.state.peticion3[34].Respuestas=="Siempre"){
        pet3res166="Siempre"
        pet3val34= this.state.getPonderacion[33].siempre
        }else if(this.state.peticion3[34].Respuestas=="CasiSiempre"){
          pet3res167="Casi Siempre"
          pet3val34= this.state.getPonderacion[33].casisiempre
        }
        else if(this.state.peticion3[34].Respuestas=="AlgunasVeces"){
          pet3res168="Algunas Veces"
          pet3val34= this.state.getPonderacion[33].algunasveces
        } 
        else if(this.state.peticion3[34].Respuestas=="CasiNunca"){
          pet3res169="Casi Nunca"
          pet3val34= this.state.getPonderacion[33].casinunca
        } 
        else if(this.state.peticion3[34].Respuestas=="Nunca"){
          pet3res170="Nunca"
          pet3val34= this.state.getPonderacion[33].nunca
        } 
        if(this.state.peticion3[35].Respuestas=="Siempre"){
          pet3res171="Siempre"
          pet3val35= this.state.getPonderacion[34].siempre
          }else if(this.state.peticion3[35].Respuestas=="CasiSiempre"){
            pet3res172="Casi Siempre"
            pet3val35= this.state.getPonderacion[34].casisiempre
          }
          else if(this.state.peticion3[35].Respuestas=="AlgunasVeces"){
            pet3res173="Algunas Veces"
            pet3val35= this.state.getPonderacion[34].algunasveces
          } 
          else if(this.state.peticion3[35].Respuestas=="CasiNunca"){
            pet3res174="Casi Nunca"
            pet3val35= this.state.getPonderacion[34].casinunca
          } 
          else if(this.state.peticion3[15].Respuestas=="Nunca"){
            pet3res175="Nunca"
            pet3val35= this.state.getPonderacion[34].nunca
          } 

        if(this.state.peticion3[36].Respuestas=="Siempre"){
          pet3res176="Siempre"
          pet3val36= this.state.getPonderacion[35].siempre
          }else if(this.state.peticion3[36].Respuestas=="CasiSiempre"){
            pet3res177="Casi Siempre"
            pet3val36= this.state.getPonderacion[35].casisiempre
          }
          else if(this.state.peticion3[36].Respuestas=="AlgunasVeces"){
            pet3res178="Algunas Veces"
            pet3val36= this.state.getPonderacion[35].algunasveces
          } 
          else if(this.state.peticion3[36].Respuestas=="CasiNunca"){
            pet3res179="Casi Nunca"
            pet3val36= this.state.getPonderacion[35].casinunca
          } 
          else if(this.state.peticion3[36].Respuestas=="Nunca"){
            pet3res180="Nunca"
            pet3val36= this.state.getPonderacion[35].nunca
          }

        if(this.state.peticion3[37].Respuestas=="Siempre"){
          pet3res181="Siempre"
          pet3val37= this.state.getPonderacion[36].siempre
          
          }else if(this.state.peticion3[37].Respuestas=="CasiSiempre"){
            pet3res182="Casi Siempre"
            pet3val37= this.state.getPonderacion[36].casisiempre
          }
          else if(this.state.peticion3[37].Respuestas=="AlgunasVeces"){
            pet3res183="Algunas Veces"
            pet3val37= this.state.getPonderacion[36].algunasveces
          } 
          else if(this.state.peticion3[37].Respuestas=="CasiNunca"){
            pet3res184="Casi Nunca"
            pet3val37= this.state.getPonderacion[36].casinunca
          } 
          else if(this.state.peticion3[37].Respuestas=="Nunca"){
            pet3res185="Nunca"
            pet3val37= this.state.getPonderacion[36].nunca
          }
        if(this.state.peticion3[38].Respuestas=="Siempre"){
          pet3res186="Siempre"
          pet3val38= this.state.getPonderacion[37].siempre
          }else if(this.state.peticion3[38].Respuestas=="CasiSiempre"){
            pet3res187="Casi Siempre"
            pet3val38= this.state.getPonderacion[37].casisiempre
          }
          else if(this.state.peticion3[38].Respuestas=="AlgunasVeces"){
            pet3res188="Algunas Veces"
            pet3val38= this.state.getPonderacion[37].algunasveces
          } 
          else if(this.state.peticion3[38].Respuestas=="CasiNunca"){
            pet3res189="Casi Nunca"
            pet3val38= this.state.getPonderacion[37].casinunca
          } 
          else if(this.state.peticion3[38].Respuestas=="Nunca"){
            pet3res190="Nunca"
            pet3val38= this.state.getPonderacion[37].nunca
          }

          if(this.state.peticion3[39].Respuestas=="Siempre"){
            pet3res191="Siempre"
            pet3val39= this.state.getPonderacion[38].siempre
            }else if(this.state.peticion3[39].Respuestas=="CasiSiempre"){
              pet3res192="Casi Siempre"
              pet3val39= this.state.getPonderacion[38].casisiempre
            }
            else if(this.state.peticion3[39].Respuestas=="AlgunasVeces"){
              pet3res193="Algunas Veces"
              pet3val39= this.state.getPonderacion[38].algunasveces
            } 
            else if(this.state.peticion3[39].Respuestas=="CasiNunca"){
              pet3res194="Casi Nunca"
              pet3val39= this.state.getPonderacion[38].casinunca
            } 
            else if(this.state.peticion3[39].Respuestas=="Nunca"){
              pet3res195="Nunca"
              pet3val39= this.state.getPonderacion[38].nunca
            }

            if(this.state.peticion3[40].Respuestas=="Siempre"){
              pet3res196="Siempre"
              pet3val40= this.state.getPonderacion[39].siempre
              }else if(this.state.peticion3[40].Respuestas=="CasiSiempre"){
                pet3res197="Casi Siempre"
                pet3val40= this.state.getPonderacion[39].casisiempre
              }
              else if(this.state.peticion3[40].Respuestas=="AlgunasVeces"){
                pet3res198="Algunas Veces"
                pet3val40= this.state.getPonderacion[39].algunasveces
              } 
              else if(this.state.peticion3[40].Respuestas=="CasiNunca"){
                pet3res199="Casi Nunca"
                pet3val40= this.state.getPonderacion[39].casinunca
              } 
              else if(this.state.peticion3[40].Respuestas=="Nunca"){
                pet3res200="Nunca"
                pet3val40= this.state.getPonderacion[39].nunca
              }

            if(this.state.peticion3[42].Respuestas=="Siempre"){
              pet3res201="Siempre"
              pet3val41= this.state.getPonderacion[40].siempre
            }else if(this.state.peticion3[42].Respuestas=="CasiSiempre"){
              pet3res202="Casi Siempre"
              pet3val41= this.state.getPonderacion[40].casisiempre
            }
            else if(this.state.peticion3[42].Respuestas=="AlgunasVeces"){
              pet3res203="Algunas Veces"
              pet3val41= this.state.getPonderacion[40].algunasveces
            } 
            else if(this.state.peticion3[42].Respuestas=="CasiNunca"){
              pet3res204="Casi Nunca"
              pet3val41= this.state.getPonderacion[40].casinunca
            } 
            else if(this.state.peticion3[42].Respuestas=="Nunca"){
              pet3res205="Nunca"
              pet3val41= this.state.getPonderacion[40].nunca
            }
          if(this.state.peticion3[43].Respuestas=="Siempre"){
            pet3res206="Siempre"
            pet3val42= this.state.getPonderacion[41].siempre
          }else if(this.state.peticion3[43].Respuestas=="CasiSiempre"){
            pet3res207="Casi Siempre"
            pet3val42= this.state.getPonderacion[41].casisiempre
          }
          else if(this.state.peticion3[43].Respuestas=="AlgunasVeces"){
            pet3res208="Algunas Veces"
            pet3val42= this.state.getPonderacion[41].algunasveces
          } 
          else if(this.state.peticion3[43].Respuestas=="CasiNunca"){
            pet3res209="Casi Nunca"
            pet3val42= this.state.getPonderacion[41].casinunca
          } 
          else if(this.state.peticion3[43].Respuestas=="Nunca"){
            pet3res210="Nunca"
            pet3val42= this.state.getPonderacion[41].nunca
          }
        if(this.state.peticion3[44].Respuestas=="Siempre"){
          pet3res211="Siempre"
          pet3val43= this.state.getPonderacion[42].siempre
        }else if(this.state.peticion3[44].Respuestas=="CasiSiempre"){
          pet3res212="Casi Siempre"
          pet3val43= this.state.getPonderacion[42].casisiempre
        }
        else if(this.state.peticion3[44].Respuestas=="AlgunasVeces"){
          pet3res213="Algunas Veces"
          pet3val43= this.state.getPonderacion[42].algunasveces
        } 
        else if(this.state.peticion3[44].Respuestas=="CasiNunca"){
          pet3res214="Casi Nunca"
          pet3val43= this.state.getPonderacion[42].casinunca
        } 
        else if(this.state.peticion3[44].Respuestas=="Nunca"){
          pet3res215="Nunca"
          pet3val43= this.state.getPonderacion[42].nunca
        }

      if(this.state.peticion3[46].Respuestas=="Siempre"){
        pet3res216="Siempre"
        pet3val44= this.state.getPonderacion[43].siempre
      }else if(this.state.peticion3[46].Respuestas=="CasiSiempre"){
        pet3res217="Casi Siempre"
        pet3val44= this.state.getPonderacion[43].casisiempre
      }
      else if(this.state.peticion3[46].Respuestas=="AlgunasVeces"){
        pet3res218="Algunas Veces"
        pet3val44= this.state.getPonderacion[43].algunasveces
      } 
      else if(this.state.peticion3[46].Respuestas=="CasiNunca"){
        pet3res219="Casi Nunca"
        pet3val44= this.state.getPonderacion[43].casinunca
      } 
      else if(this.state.peticion3[46].Respuestas=="Nunca"){
        pet3res220="Nunca"
        pet3val44= this.state.getPonderacion[43].nunca
      }

    if(this.state.peticion3[47].Respuestas=="Siempre"){
      pet3res221="Siempre"
      pet3val45= this.state.getPonderacion[44].siempre
    }else if(this.state.peticion3[47].Respuestas=="CasiSiempre"){
      pet3res222="Casi Siempre"
      pet3val45= this.state.getPonderacion[44].casisiempre
    }
    else if(this.state.peticion3[47].Respuestas=="AlgunasVeces"){
      pet3res223="Algunas Veces"
      pet3val45= this.state.getPonderacion[44].algunasveces
    } 
    else if(this.state.peticion3[47].Respuestas=="CasiNunca"){
      pet3res224="Casi Nunca"
      pet3val45= this.state.getPonderacion[44].casinunca
    } 
    else if(this.state.peticion3[47].Respuestas=="Nunca"){
      pet3res225="Nunca"
      pet3val45= this.state.getPonderacion[44].nunca
    }
    if(this.state.peticion3[48].Respuestas=="Siempre"){
      pet3res226="Siempre"
      pet3val46= this.state.getPonderacion[45].siempre
    }else if(this.state.peticion3[48].Respuestas=="CasiSiempre"){
      pet3res227="Casi Siempre"
      pet3val46= this.state.getPonderacion[45].casisiempre
    }
    else if(this.state.peticion3[48].Respuestas=="AlgunasVeces"){
      pet3res228="Algunas Veces"
      pet3val46= this.state.getPonderacion[45].algunasveces
    } 
    else if(this.state.peticion3[48].Respuestas=="CasiNunca"){
      pet3res229="Casi Nunca"
      pet3val46= this.state.getPonderacion[45].casinunca
    } 
    else if(this.state.peticion3[48].Respuestas=="Nunca"){
      pet3res230="Nunca"
      pet3val46= this.state.getPonderacion[45].nunca
    }
 } 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  if(this.state.peticion4.length>0){

    if(this.state.peticion4[1].Respuestas=="Siempre"){
      pet4res1="Siempre"
      pet4val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion4[1].Respuestas=="CasiSiempre"){
        pet4res2="Casi Siempre"
        pet4val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion4[1].Respuestas=="AlgunasVeces"){
        pet4res3="Algunas Veces"
        pet4val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion4[1].Respuestas=="CasiNunca"){
        pet4res4="Casi Nunca"
        pet4val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion4[1].Respuestas=="Nunca"){
        pet4res5="Nunca"
        pet4val1= this.state.getPonderacion[0].nunca
      } 
     

    if(this.state.peticion4[2].Respuestas=="Siempre"){
      pet4res6="Siempre"
      pet4val2= this.state.getPonderacion[1].siempre
     
      }else if(this.state.peticion4[2].Respuestas=="CasiSiempre"){
        pet4res7="Casi Siempre"
        pet4val2= this.state.getPonderacion[1].casisiempre
        
      }
      else if(this.state.peticion4[2].Respuestas=="AlgunasVeces"){
        pet4res8="Algunas Veces"
        pet4val2= this.state.getPonderacion[1].algunasveces
       console.log("esta es la peticion", this.state.peticion4)
      } 
      else if(this.state.peticion4[2].Respuestas=="CasiNunca"){
        pet4res9="Casi Nunca"
        pet4val2= this.state.getPonderacion[1].casinunca
      } 
      else if(this.state.peticion4[2].Respuestas=="Nunca"){
        pet4res10="Nunca"
        pet4val2= this.state.getPonderacion[1].nunca
      } 
  
      if(this.state.peticion4[3].Respuestas=="Siempre"){
        pet4res11="Siempre"
        pet4val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion4[3].Respuestas=="CasiSiempre"){
          pet4res12="Casi Siempre"
          pet4val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion4[3].Respuestas=="AlgunasVeces"){
          pet4res13="Algunas Veces"
          pet4val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion4[3].Respuestas=="CasiNunca"){
          pet4res14="Casi Nunca"
          pet4val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion4[3].Respuestas=="Nunca"){
          pet4res15="Nunca"
          pet4val3= this.state.getPonderacion[2].nunca
        } 
  
  
      if(this.state.peticion4[4].Respuestas=="Siempre"){
        pet4res16="Siempre"
        pet4val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion4[4].Respuestas=="CasiSiempre"){
          pet4res17="Casi Siempre"
          pet4val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion4[4].Respuestas=="AlgunasVeces"){
          pet4res18="Algunas Veces"
          pet4val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion4[4].Respuestas=="CasiNunca"){
          pet4res19="Casi Nunca"
          pet4val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion4[4].Respuestas=="Nunca"){
          pet4res20="Nunca"
          pet4val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion4[5].Respuestas=="Siempre"){
        pet4res21="Siempre"
        pet4val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion4[5].Respuestas=="CasiSiempre"){
          pet4res22="Casi Siempre"
          pet4val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion4[5].Respuestas=="AlgunasVeces"){
          pet4res23="Algunas Veces"
          pet4val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion4[5].Respuestas=="CasiNunca"){
          pet4res24="Casi Nunca"
          pet4val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion4[5].Respuestas=="Nunca"){
          pet4res25="Nunca"
          pet4val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion4[6].Respuestas=="Siempre"){
          pet4res26="Siempre"
          pet4val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion4[6].Respuestas=="CasiSiempre"){
            pet4res27="Casi Siempre"
            pet4val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion4[6].Respuestas=="AlgunasVeces"){
            pet4res28="Algunas Veces"
            pet4val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion4[6].Respuestas=="CasiNunca"){
            pet4res29="Casi Nunca"
            pet4val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion4[6].Respuestas=="Nunca"){
            pet4res30="Nunca"
            pet4val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion4[7].Respuestas=="Siempre"){
          pet4res31="Siempre"
          pet4val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion4[7].Respuestas=="CasiSiempre"){
            pet4res32="Casi Siempre"
            pet4val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion4[7].Respuestas=="AlgunasVeces"){
            pet4res33="Algunas Veces"
            pet4val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion4[7].Respuestas=="CasiNunca"){
            pet4res34="Casi Nunca"
            pet4val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion4[7].Respuestas=="Nunca"){
            pet4res35="Nunca"
            pet4val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion4[8].Respuestas=="Siempre"){
            pet4res36="Siempre"
            pet4val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion4[8].Respuestas=="CasiSiempre"){
              pet4res37="Casi Siempre"
              pet4val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion4[8].Respuestas=="AlgunasVeces"){
              pet4res38="Algunas Veces"
              pet4val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion4[8].Respuestas=="CasiNunca"){
              pet4res39="Casi Nunca"
              pet4val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion4[8].Respuestas=="Nunca"){
              pet4res40="Nunca"
              pet4val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion4[9].Respuestas=="Siempre"){
            pet4res41="Siempre"
            pet4val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion4[9].Respuestas=="CasiSiempre"){
              pet4res42="Casi Siempre"
              pet4val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion4[9].Respuestas=="AlgunasVeces"){
              pet4res43="Algunas Veces"
              pet4val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion4[9].Respuestas=="CasiNunca"){
              pet4res44="Casi Nunca"
              pet4val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion4[9].Respuestas=="Nunca"){
              pet4res45="Nunca"
              pet4val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion4[10].Respuestas=="Siempre"){
          pet4res46="Siempre"
          pet4val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion4[10].Respuestas=="CasiSiempre"){
            pet4res47="Casi Siempre"
            pet4val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion4[10].Respuestas=="AlgunasVeces"){
            pet4res48="Algunas Veces"
            pet4val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion4[10].Respuestas=="CasiNunca"){
            pet4res49="Casi Nunca"
            pet4val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion4[10].Respuestas=="Nunca"){
            pet4res50="Nunca"
            pet4val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion4[11].Respuestas=="Siempre"){
          pet4res51="Siempre"
          pet4val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion4[11].Respuestas=="CasiSiempre"){
            pet4res52="Casi Siempre"
            pet4val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion4[11].Respuestas=="AlgunasVeces"){
            pet4res53="Algunas Veces"
            pet4val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion4[11].Respuestas=="CasiNunca"){
            pet4res54="Casi Nunca"
            pet4val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion4[11].Respuestas=="Nunca"){
            pet4res55="Nunca"
            pet4val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion4[12].Respuestas=="Siempre"){
          pet4res56="Siempre"
          pet4val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion4[12].Respuestas=="CasiSiempre"){
            pet4res57="Casi Siempre"
            pet4val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion4[12].Respuestas=="AlgunasVeces"){
            pet4res58="Algunas Veces"
            pet4val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion4[12].Respuestas=="CasiNunca"){
            pet4res59="Casi Nunca"
            pet4val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion4[12].Respuestas=="Nunca"){
            pet4res60="Nunca"
            pet4val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion4[13].Respuestas=="Siempre"){
          pet4res61="Siempre"
          pet4val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion4[13].Respuestas=="CasiSiempre"){
            pet4res62="Casi Siempre"
            pet4val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion4[13].Respuestas=="AlgunasVeces"){
            pet4res63="Algunas Veces"
            pet4val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion4[13].Respuestas=="CasiNunca"){
            pet4res64="Casi Nunca"
            pet4val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion4[13].Respuestas=="Nunca"){
            pet4res65="Nunca"
            pet4val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion4[14].Respuestas=="Siempre"){
          pet4res66="Siempre"
          pet4val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion4[14].Respuestas=="CasiSiempre"){
            pet4res67="Casi Siempre"
            pet4val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion4[14].Respuestas=="AlgunasVeces"){
            pet4res68="Algunas Veces"
            pet4val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion4[14].Respuestas=="CasiNunca"){
            pet4res69="Casi Nunca"
            pet4val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion4[14].Respuestas=="Nunca"){
            pet4res70="Nunca"
            pet4val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion4[15].Respuestas=="Siempre"){
          pet4res71="Siempre"
          pet4val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion4[15].Respuestas=="CasiSiempre"){
            pet4res72="Casi Siempre"
            pet4val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion4[15].Respuestas=="AlgunasVeces"){
            pet4res73="Algunas Veces"
            pet4val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion4[15].Respuestas=="CasiNunca"){
            pet4res74="Casi Nunca"
            pet4val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion4[15].Respuestas=="Nunca"){
            pet4res75="Nunca"
            pet4val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion4[16].Respuestas=="Siempre"){
          pet4res76="Siempre"
          pet4val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion4[16].Respuestas=="CasiSiempre"){
            pet4res77="Casi Siempre"
            pet4val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion4[16].Respuestas=="AlgunasVeces"){
            pet4res78="Algunas Veces"
            pet4val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion4[16].Respuestas=="CasiNunca"){
            pet4res79="Casi Nunca"
            pet4val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion4[16].Respuestas=="Nunca"){
            pet4res80="Nunca"
            pet4val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion4[17].Respuestas=="Siempre"){
          pet4res81="Siempre"
          pet4val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion4[17].Respuestas=="CasiSiempre"){
            pet4res82="Casi Siempre"
            pet4val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion4[17].Respuestas=="AlgunasVeces"){
            pet4res83="Algunas Veces"
            pet4val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion4[17].Respuestas=="CasiNunca"){
            pet4res84="Casi Nunca"
            pet4val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion4[17].Respuestas=="Nunca"){
            pet4res85="Nunca"
            pet4val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion4[18].Respuestas=="Siempre"){
          pet4res86="Siempre"
          pet4val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion4[18].Respuestas=="CasiSiempre"){
            pet4res87="Casi Siempre"
            pet4val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion4[18].Respuestas=="AlgunasVeces"){
            pet4res88="Algunas Veces"
            pet4val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion4[18].Respuestas=="CasiNunca"){
            pet4res89="Casi Nunca"
            pet4val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion4[18].Respuestas=="Nunca"){
            pet4res90="Nunca"
            pet4val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion4[19].Respuestas=="Siempre"){
          pet4res91="Siempre"
          pet4val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion4[19].Respuestas=="CasiSiempre"){
            pet4res92="Casi Siempre"
            pet4val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion4[19].Respuestas=="AlgunasVeces"){
            pet4res93="Algunas Veces"
            pet4val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion4[19].Respuestas=="CasiNunca"){
            pet4res94="Casi Nunca"
            pet4val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion4[19].Respuestas=="Nunca"){
            pet4res95="Nunca"
            pet4val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion4[20].Respuestas=="Siempre"){
          pet4res96="Siempre"
          pet4val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion4[20].Respuestas=="CasiSiempre"){
            pet4res97="Casi Siempre"
            pet4val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion4[20].Respuestas=="AlgunasVeces"){
            pet4res98="Algunas Veces"
            pet4val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion4[20].Respuestas=="CasiNunca"){
            pet4res99="Casi Nunca"
            pet4val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion4[20].Respuestas=="Nunca"){
            pet4res100="Nunca"
            pet4val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion4[21].Respuestas=="Siempre"){
          pet4res101="Siempre"
          pet4val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion4[21].Respuestas=="CasiSiempre"){
            pet4res102="Casi Siempre"
            pet4val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion4[21].Respuestas=="AlgunasVeces"){
            pet4res103="Algunas Veces"
            pet4val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion4[21].Respuestas=="CasiNunca"){
            pet4res104="Casi Nunca"
            pet4val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion4[21].Respuestas=="Nunca"){
            pet4res105="Nunca"
            pet4val21= this.state.getPonderacion[20].nunca
          } 
  
        if(this.state.peticion4[22].Respuestas=="Siempre"){
          pet4res106="Siempre"
          pet4val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion4[22].Respuestas=="CasiSiempre"){
            pet4res107="Casi Siempre"
            pet4val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion4[22].Respuestas=="AlgunasVeces"){
            pet4res108="Algunas Veces"
            pet4val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion4[2].Respuestas=="CasiNunca"){
            pet4res109="Casi Nunca"
            pet4val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion4[22].Respuestas=="Nunca"){
            pet4res110="Nunca"
            pet4val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion4[23].Respuestas=="Siempre"){
          pet4res111="Siempre"
          pet4val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion4[23].Respuestas=="CasiSiempre"){
            pet4res112="Casi Siempre"
            pet4val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion4[23].Respuestas=="AlgunasVeces"){
            pet4res113="Algunas Veces"
            pet4val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion4[23].Respuestas=="CasiNunca"){
            pet4res114="Casi Nunca"
            pet4val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion4[23].Respuestas=="Nunca"){
            pet4res115="Nunca"
            pet4val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion4[24].Respuestas=="Siempre"){
          pet4res116="Siempre"
          pet4val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion4[24].Respuestas=="CasiSiempre"){
            pet4res117="Casi Siempre"
            pet4val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion4[24].Respuestas=="AlgunasVeces"){
            pet4res118="Algunas Veces"
            pet4val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion4[24].Respuestas=="CasiNunca"){
            pet4res119="Casi Nunca"
            pet4val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion4[24].Respuestas=="Nunca"){
            pet4res120="Nunca"
            pet4val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion4[25].Respuestas=="Siempre"){
          pet4res121="Siempre"
          pet4val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion4[25].Respuestas=="CasiSiempre"){
            pet4res122="Casi Siempre"
            pet4val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion4[25].Respuestas=="AlgunasVeces"){
            pet4res123="Algunas Veces"
            pet4val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion4[25].Respuestas=="CasiNunca"){
            pet4res124="Casi Nunca"
            pet4val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion4[25].Respuestas=="Nunca"){
            pet4res125="Nunca"
            pet4val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion4[26].Respuestas=="Siempre"){
          pet4res126="Siempre"
          pet4val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion4[26].Respuestas=="CasiSiempre"){
            pet4res127="Casi Siempre"
            pet4val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion4[26].Respuestas=="AlgunasVeces"){
            pet4res128="Algunas Veces"
            pet4val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion4[26].Respuestas=="CasiNunca"){
            pet4res129="Casi Nunca"
            pet4val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion4[26].Respuestas=="Nunca"){
            pet4res130="Nunca"
            pet4val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion4[27].Respuestas=="Siempre"){
          pet4res131="Siempre"
          pet4val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion4[27].Respuestas=="CasiSiempre"){
            pet4res132="Casi Siempre"
            pet4val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion4[27].Respuestas=="AlgunasVeces"){
            pet4res133="Algunas Veces"
            pet4val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion4[27].Respuestas=="CasiNunca"){
            pet4res134="Casi Nunca"
            pet4val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion4[27].Respuestas=="Nunca"){
            pet4res135="Nunca"
            pet4val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion4[28].Respuestas=="Siempre"){
        pet4res136="Siempre"
        pet4val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion4[28].Respuestas=="CasiSiempre"){
          pet4res137="Casi Siempre"
          pet4val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion4[28].Respuestas=="AlgunasVeces"){
          pet4res138="Algunas Veces"
          pet4val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion4[28].Respuestas=="CasiNunca"){
          pet4res139="Casi Nunca"
          pet4val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion4[28].Respuestas=="Nunca"){
          pet4res140="Nunca"
          pet4val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion4[29].Respuestas=="Siempre"){
        pet4res141="Siempre"
        pet4val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion4[29].Respuestas=="CasiSiempre"){
          pet4res142="Casi Siempre"
          pet4val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion4[29].Respuestas=="AlgunasVeces"){
          pet4res143="Algunas Veces"
          pet4val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion4[29].Respuestas=="CasiNunca"){
          pet4res144="Casi Nunca"
          pet4val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion4[29].Respuestas=="Nunca"){
          pet4res145="Nunca"
          pet4val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion4[30].Respuestas=="Siempre"){
        pet4res146="Siempre"
        pet4val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion4[30].Respuestas=="CasiSiempre"){
          pet4res147="Casi Siempre"
          pet4val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion4[30].Respuestas=="AlgunasVeces"){
          pet4res148="Algunas Veces"
          pet4val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion4[30].Respuestas=="CasiNunca"){
          pet4res149="Casi Nunca"
          pet4val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion4[30].Respuestas=="Nunca"){
          pet4res150="Nunca"
          pet4val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion4[31].Respuestas=="Siempre"){
        pet4res151="Siempre"
        pet4val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion4[31].Respuestas=="CasiSiempre"){
          pet4res152="Casi Siempre"
          pet4val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion4[31].Respuestas=="AlgunasVeces"){
          pet4res153="Algunas Veces"
          pet4val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion4[31].Respuestas=="CasiNunca"){
          pet4res154="Casi Nunca"
          pet4val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion4[31].Respuestas=="Nunca"){
          pet4res155="Nunca"
          pet4val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion4[32].Respuestas=="Siempre"){
        pet4res156="Siempre"
        pet4val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion4[32].Respuestas=="CasiSiempre"){
          pet4res157="Casi Siempre"
          pet4val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion4[32].Respuestas=="AlgunasVeces"){
          pet4res158="Algunas Veces"
          pet4val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion4[32].Respuestas=="CasiNunca"){
          pet4res159="Casi Nunca"
          pet4val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion4[32].Respuestas=="Nunca"){
          pet4res160="Nunca"
          pet4val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion4[33].Respuestas=="Siempre"){
          pet4res161="Siempre"
          pet4val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion4[33].Respuestas=="CasiSiempre"){
            pet4res162="Casi Siempre"
            pet4val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion4[33].Respuestas=="AlgunasVeces"){
            pet4res163="Algunas Veces"
            pet4val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion4[33].Respuestas=="CasiNunca"){
            pet4res164="Casi Nunca"
            pet4val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion4[33].Respuestas=="Nunca"){
            pet4res165="Nunca"
            pet4val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion4[34].Respuestas=="Siempre"){
          pet4res166="Siempre"
          pet4val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion4[34].Respuestas=="CasiSiempre"){
            pet4res167="Casi Siempre"
            pet4val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion4[34].Respuestas=="AlgunasVeces"){
            pet4res168="Algunas Veces"
            pet4val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion4[34].Respuestas=="CasiNunca"){
            pet4res169="Casi Nunca"
            pet4val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion4[34].Respuestas=="Nunca"){
            pet4res170="Nunca"
            pet4val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion4[35].Respuestas=="Siempre"){
            pet4res171="Siempre"
            pet4val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion4[35].Respuestas=="CasiSiempre"){
              pet4res172="Casi Siempre"
              pet4val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion4[35].Respuestas=="AlgunasVeces"){
              pet4res173="Algunas Veces"
              pet4val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion4[35].Respuestas=="CasiNunca"){
              pet4res174="Casi Nunca"
              pet4val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion4[15].Respuestas=="Nunca"){
              pet4res175="Nunca"
              pet4val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion4[36].Respuestas=="Siempre"){
            pet4res176="Siempre"
            pet4val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion4[36].Respuestas=="CasiSiempre"){
              pet4res177="Casi Siempre"
              pet4val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion4[36].Respuestas=="AlgunasVeces"){
              pet4res178="Algunas Veces"
              pet4val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion4[36].Respuestas=="CasiNunca"){
              pet4res179="Casi Nunca"
              pet4val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion4[36].Respuestas=="Nunca"){
              pet4res180="Nunca"
              pet4val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion4[37].Respuestas=="Siempre"){
            pet4res181="Siempre"
            pet4val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion4[37].Respuestas=="CasiSiempre"){
              pet4res182="Casi Siempre"
              pet4val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion4[37].Respuestas=="AlgunasVeces"){
              pet4res183="Algunas Veces"
              pet4val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion4[37].Respuestas=="CasiNunca"){
              pet4res184="Casi Nunca"
              pet4val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion4[37].Respuestas=="Nunca"){
              pet4res185="Nunca"
              pet4val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion4[38].Respuestas=="Siempre"){
            pet4res186="Siempre"
            pet4val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion4[38].Respuestas=="CasiSiempre"){
              pet4res187="Casi Siempre"
              pet4val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion4[38].Respuestas=="AlgunasVeces"){
              pet4res188="Algunas Veces"
              pet4val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion4[38].Respuestas=="CasiNunca"){
              pet4res189="Casi Nunca"
              pet4val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion4[38].Respuestas=="Nunca"){
              pet4res190="Nunca"
              pet4val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion4[39].Respuestas=="Siempre"){
              pet4res191="Siempre"
              pet4val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion4[39].Respuestas=="CasiSiempre"){
                pet4res192="Casi Siempre"
                pet4val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion4[39].Respuestas=="AlgunasVeces"){
                pet4res193="Algunas Veces"
                pet4val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion4[39].Respuestas=="CasiNunca"){
                pet4res194="Casi Nunca"
                pet4val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion4[39].Respuestas=="Nunca"){
                pet4res195="Nunca"
                pet4val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion4[40].Respuestas=="Siempre"){
                pet4res196="Siempre"
                pet4val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion4[40].Respuestas=="CasiSiempre"){
                  pet4res197="Casi Siempre"
                  pet4val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion4[40].Respuestas=="AlgunasVeces"){
                  pet4res198="Algunas Veces"
                  pet4val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion4[40].Respuestas=="CasiNunca"){
                  pet4res199="Casi Nunca"
                  pet4val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion4[40].Respuestas=="Nunca"){
                  pet4res200="Nunca"
                  pet4val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion4[42].Respuestas=="Siempre"){
                pet4res201="Siempre"
                pet4val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion4[42].Respuestas=="CasiSiempre"){
                pet4res202="Casi Siempre"
                pet4val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion4[42].Respuestas=="AlgunasVeces"){
                pet4res203="Algunas Veces"
                pet4val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion4[42].Respuestas=="CasiNunca"){
                pet4res204="Casi Nunca"
                pet4val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion4[42].Respuestas=="Nunca"){
                pet4res205="Nunca"
                pet4val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion4[43].Respuestas=="Siempre"){
              pet4res206="Siempre"
              pet4val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion4[43].Respuestas=="CasiSiempre"){
              pet4res207="Casi Siempre"
              pet4val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion4[43].Respuestas=="AlgunasVeces"){
              pet4res208="Algunas Veces"
              pet4val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion4[43].Respuestas=="CasiNunca"){
              pet4res209="Casi Nunca"
              pet4val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion4[43].Respuestas=="Nunca"){
              pet4res210="Nunca"
              pet4val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion4[44].Respuestas=="Siempre"){
            pet4res211="Siempre"
            pet4val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion4[44].Respuestas=="CasiSiempre"){
            pet4res212="Casi Siempre"
            pet4val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion4[44].Respuestas=="AlgunasVeces"){
            pet4res213="Algunas Veces"
            pet4val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion4[44].Respuestas=="CasiNunca"){
            pet4res214="Casi Nunca"
            pet4val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion4[44].Respuestas=="Nunca"){
            pet4res215="Nunca"
            pet4val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion4[46].Respuestas=="Siempre"){
          pet4res216="Siempre"
          pet4val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion4[46].Respuestas=="CasiSiempre"){
          pet4res217="Casi Siempre"
          pet4val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion4[46].Respuestas=="AlgunasVeces"){
          pet4res218="Algunas Veces"
          pet4val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion4[46].Respuestas=="CasiNunca"){
          pet4res219="Casi Nunca"
          pet4val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion4[46].Respuestas=="Nunca"){
          pet4res220="Nunca"
          pet4val44= this.state.getPonderacion[43].nunca
        }
  
      if(this.state.peticion4[47].Respuestas=="Siempre"){
        pet4res221="Siempre"
        pet4val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion4[47].Respuestas=="CasiSiempre"){
        pet4res222="Casi Siempre"
        pet4val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion4[47].Respuestas=="AlgunasVeces"){
        pet4res223="Algunas Veces"
        pet4val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion4[47].Respuestas=="CasiNunca"){
        pet4res224="Casi Nunca"
        pet4val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion4[47].Respuestas=="Nunca"){
        pet4res225="Nunca"
        pet4val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion4[48].Respuestas=="Siempre"){
        pet4res226="Siempre"
        pet4val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion4[48].Respuestas=="CasiSiempre"){
        pet4res227="Casi Siempre"
        pet4val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion4[48].Respuestas=="AlgunasVeces"){
        pet4res228="Algunas Veces"
        pet4val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion4[48].Respuestas=="CasiNunca"){
        pet4res229="Casi Nunca"
        pet4val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion4[48].Respuestas=="Nunca"){
        pet4res230="Nunca"
        pet4val46= this.state.getPonderacion[45].nunca
      }
   } 

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////////////////////////////////////////////////////////////////////////////////
   
  if(this.state.peticion5.length>0){

    if(this.state.peticion5[1].Respuestas=="Siempre"){
      pet5res1="Siempre"
      pet5val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion5[1].Respuestas=="CasiSiempre"){
        pet5res2="Casi Siempre"
        pet5val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion5[1].Respuestas=="AlgunasVeces"){
        pet5res3="Algunas Veces"
        pet5val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion5[1].Respuestas=="CasiNunca"){
        pet5res4="Casi Nunca"
        pet5val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion5[1].Respuestas=="Nunca"){
        pet5res5="Nunca"
        pet5val1= this.state.getPonderacion[0].nunca
      } 
  
  
    if(this.state.peticion5[2].Respuestas=="Siempre"){
      pet5res6="Siempre"
      pet5val2= this.state.peticion5[1].siempre
      }else if(this.state.peticion5[2].Respuestas=="CasiSiempre"){
        pet5res7="Casi Siempre"
        pet5val2= this.state.peticion5[1].casisiempre
      }
      else if(this.state.peticion5[2].Respuestas=="AlgunasVeces"){
        pet5res8="Algunas Veces"
        pet5val2= this.state.peticion5[1].algunasveces
      } 
      else if(this.state.peticion5[2].Respuestas=="CasiNunca"){
        pet5res9="Casi Nunca"
        pet5val2= this.state.peticion5[2].casinunca
      } 
      else if(this.state.peticion5[2].Respuestas=="Nunca"){
        pet5res10="Nunca"
        pet5val2= this.state.peticion5[1].nunca
      } 
  
      if(this.state.peticion5[3].Respuestas=="Siempre"){
        pet5res11="Siempre"
        pet5val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion5[3].Respuestas=="CasiSiempre"){
          pet5res12="Casi Siempre"
          pet5val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion5[3].Respuestas=="AlgunasVeces"){
          pet5res13="Algunas Veces"
          pet5val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion5[3].Respuestas=="CasiNunca"){
          pet5res14="Casi Nunca"
          pet5val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion5[3].Respuestas=="Nunca"){
          pet5res15="Nunca"
          pet5val3= this.state.getPonderacion[2].nunca
        } 
  
  
      if(this.state.peticion5[4].Respuestas=="Siempre"){
        pet5res16="Siempre"
        pet5val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion5[4].Respuestas=="CasiSiempre"){
          pet5res17="Casi Siempre"
          pet5val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion5[4].Respuestas=="AlgunasVeces"){
          pet5res18="Algunas Veces"
          pet5val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion5[4].Respuestas=="CasiNunca"){
          pet5res19="Casi Nunca"
          pet5val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion5[4].Respuestas=="Nunca"){
          pet5res20="Nunca"
          pet5val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion5[5].Respuestas=="Siempre"){
        pet5res21="Siempre"
        pet5val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion5[5].Respuestas=="CasiSiempre"){
          pet5res22="Casi Siempre"
          pet5val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion5[5].Respuestas=="AlgunasVeces"){
          pet5res23="Algunas Veces"
          pet5val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion5[5].Respuestas=="CasiNunca"){
          pet5res24="Casi Nunca"
          pet5val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion5[5].Respuestas=="Nunca"){
          pet5res25="Nunca"
          pet5val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion5[6].Respuestas=="Siempre"){
          pet5res26="Siempre"
          pet5val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion5[6].Respuestas=="CasiSiempre"){
            pet5res27="Casi Siempre"
            pet5val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion5[6].Respuestas=="AlgunasVeces"){
            pet5res28="Algunas Veces"
            pet5val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion5[6].Respuestas=="CasiNunca"){
            pet5res29="Casi Nunca"
            pet5val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion5[6].Respuestas=="Nunca"){
            pet5res30="Nunca"
            pet5val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion5[7].Respuestas=="Siempre"){
          pet5res31="Siempre"
          pet5val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion5[7].Respuestas=="CasiSiempre"){
            pet5res32="Casi Siempre"
            pet5val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion5[7].Respuestas=="AlgunasVeces"){
            pet5res33="Algunas Veces"
            pet5val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion5[7].Respuestas=="CasiNunca"){
            pet5res34="Casi Nunca"
            pet5val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion5[7].Respuestas=="Nunca"){
            pet5res35="Nunca"
            pet5val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion5[8].Respuestas=="Siempre"){
            pet5res36="Siempre"
            pet5val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion5[8].Respuestas=="CasiSiempre"){
              pet5res37="Casi Siempre"
              pet5val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion5[8].Respuestas=="AlgunasVeces"){
              pet5res38="Algunas Veces"
              pet5val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion5[8].Respuestas=="CasiNunca"){
              pet5res39="Casi Nunca"
              pet5val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion5[8].Respuestas=="Nunca"){
              pet5res40="Nunca"
              pet5val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion5[9].Respuestas=="Siempre"){
            pet5res41="Siempre"
            pet5val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion5[9].Respuestas=="CasiSiempre"){
              pet5res42="Casi Siempre"
              pet5val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion5[9].Respuestas=="AlgunasVeces"){
              pet5res43="Algunas Veces"
              pet5val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion5[9].Respuestas=="CasiNunca"){
              pet5res44="Casi Nunca"
              pet5val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion5[9].Respuestas=="Nunca"){
              pet5res45="Nunca"
              pet5val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion5[10].Respuestas=="Siempre"){
          pet5res46="Siempre"
          pet5val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion5[10].Respuestas=="CasiSiempre"){
            pet5res47="Casi Siempre"
            pet5val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion5[10].Respuestas=="AlgunasVeces"){
            pet5res48="Algunas Veces"
            pet5val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion5[10].Respuestas=="CasiNunca"){
            pet5res49="Casi Nunca"
            pet5val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion5[10].Respuestas=="Nunca"){
            pet5res50="Nunca"
            pet5val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion5[11].Respuestas=="Siempre"){
          pet5res51="Siempre"
          pet5val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion5[11].Respuestas=="CasiSiempre"){
            pet5res52="Casi Siempre"
            pet5val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion5[11].Respuestas=="AlgunasVeces"){
            pet5res53="Algunas Veces"
            pet5val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion5[11].Respuestas=="CasiNunca"){
            pet5res54="Casi Nunca"
            pet5val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion5[11].Respuestas=="Nunca"){
            pet5res55="Nunca"
            pet5val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion5[12].Respuestas=="Siempre"){
          pet5res56="Siempre"
          pet5val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion5[12].Respuestas=="CasiSiempre"){
            pet5res57="Casi Siempre"
            pet5val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion5[12].Respuestas=="AlgunasVeces"){
            pet5res58="Algunas Veces"
            pet5val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion5[12].Respuestas=="CasiNunca"){
            pet5res59="Casi Nunca"
            pet5val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion5[12].Respuestas=="Nunca"){
            pet5res60="Nunca"
            pet5val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion5[13].Respuestas=="Siempre"){
          pet5res61="Siempre"
          pet5val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion5[13].Respuestas=="CasiSiempre"){
            pet5res62="Casi Siempre"
            pet5val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion5[13].Respuestas=="AlgunasVeces"){
            pet5res63="Algunas Veces"
            pet5val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion5[13].Respuestas=="CasiNunca"){
            pet5res64="Casi Nunca"
            pet5val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion5[13].Respuestas=="Nunca"){
            pet5res65="Nunca"
            pet5val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion5[14].Respuestas=="Siempre"){
          pet5res66="Siempre"
          pet5val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion5[14].Respuestas=="CasiSiempre"){
            pet5res67="Casi Siempre"
            pet5val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion5[14].Respuestas=="AlgunasVeces"){
            pet5res68="Algunas Veces"
            pet5val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion5[14].Respuestas=="CasiNunca"){
            pet5res69="Casi Nunca"
            pet5val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion5[14].Respuestas=="Nunca"){
            pet5res70="Nunca"
            pet5val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion5[15].Respuestas=="Siempre"){
          pet5res71="Siempre"
          pet5val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion5[15].Respuestas=="CasiSiempre"){
            pet5res72="Casi Siempre"
            pet5val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion5[15].Respuestas=="AlgunasVeces"){
            pet5res73="Algunas Veces"
            pet5val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion5[15].Respuestas=="CasiNunca"){
            pet5res74="Casi Nunca"
            pet5val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion5[15].Respuestas=="Nunca"){
            pet5res75="Nunca"
            pet5val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion5[16].Respuestas=="Siempre"){
          pet5res76="Siempre"
          pet5val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion5[16].Respuestas=="CasiSiempre"){
            pet5res77="Casi Siempre"
            pet5val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion5[16].Respuestas=="AlgunasVeces"){
            pet5res78="Algunas Veces"
            pet5val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion5[16].Respuestas=="CasiNunca"){
            pet5res79="Casi Nunca"
            pet5val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion5[16].Respuestas=="Nunca"){
            pet5res80="Nunca"
            pet5val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion5[17].Respuestas=="Siempre"){
          pet5res81="Siempre"
          pet5val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion5[17].Respuestas=="CasiSiempre"){
            pet5res82="Casi Siempre"
            pet5val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion5[17].Respuestas=="AlgunasVeces"){
            pet5res83="Algunas Veces"
            pet5val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion5[17].Respuestas=="CasiNunca"){
            pet5res84="Casi Nunca"
            pet5val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion5[17].Respuestas=="Nunca"){
            pet5res85="Nunca"
            pet5val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion5[18].Respuestas=="Siempre"){
          pet5res86="Siempre"
          pet5val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion5[18].Respuestas=="CasiSiempre"){
            pet5res87="Casi Siempre"
            pet5val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion5[18].Respuestas=="AlgunasVeces"){
            pet5res88="Algunas Veces"
            pet5val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion5[18].Respuestas=="CasiNunca"){
            pet5res89="Casi Nunca"
            pet5val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion5[18].Respuestas=="Nunca"){
            pet5res90="Nunca"
            pet5val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion5[19].Respuestas=="Siempre"){
          pet5res91="Siempre"
          pet5val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion5[19].Respuestas=="CasiSiempre"){
            pet5res92="Casi Siempre"
            pet5val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion5[19].Respuestas=="AlgunasVeces"){
            pet5res93="Algunas Veces"
            pet5val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion5[19].Respuestas=="CasiNunca"){
            pet5res94="Casi Nunca"
            pet5val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion5[19].Respuestas=="Nunca"){
            pet5res95="Nunca"
            pet5val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion5[20].Respuestas=="Siempre"){
          pet5res96="Siempre"
          pet5val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion5[20].Respuestas=="CasiSiempre"){
            pet5res97="Casi Siempre"
            pet5val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion5[20].Respuestas=="AlgunasVeces"){
            pet5res98="Algunas Veces"
            pet5val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion5[20].Respuestas=="CasiNunca"){
            pet5res99="Casi Nunca"
            pet5val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion5[20].Respuestas=="Nunca"){
            pet5res100="Nunca"
            pet5val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion5[21].Respuestas=="Siempre"){
          pet5res101="Siempre"
          pet5val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion5[21].Respuestas=="CasiSiempre"){
            pet5res102="Casi Siempre"
            pet5val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion5[21].Respuestas=="AlgunasVeces"){
            pet5res103="Algunas Veces"
            pet5val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion5[21].Respuestas=="CasiNunca"){
            pet5res104="Casi Nunca"
            pet5val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion5[21].Respuestas=="Nunca"){
            pet5res105="Nunca"
            pet5val21= this.state.getPonderacion[20].nunca
          } 
  
        if(this.state.peticion5[22].Respuestas=="Siempre"){
          pet5res106="Siempre"
          pet5val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion5[22].Respuestas=="CasiSiempre"){
            pet5res107="Casi Siempre"
            pet5val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion5[22].Respuestas=="AlgunasVeces"){
            pet5res108="Algunas Veces"
            pet5val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion5[2].Respuestas=="CasiNunca"){
            pet5res109="Casi Nunca"
            pet5val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion5[22].Respuestas=="Nunca"){
            pet5res110="Nunca"
            pet5val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion5[23].Respuestas=="Siempre"){
          pet5res111="Siempre"
          pet5val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion5[23].Respuestas=="CasiSiempre"){
            pet5res112="Casi Siempre"
            pet5val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion5[23].Respuestas=="AlgunasVeces"){
            pet5res113="Algunas Veces"
            pet5val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion5[23].Respuestas=="CasiNunca"){
            pet5res114="Casi Nunca"
            pet5val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion5[23].Respuestas=="Nunca"){
            pet5res115="Nunca"
            pet5val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion5[24].Respuestas=="Siempre"){
          pet5res116="Siempre"
          pet5val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion5[24].Respuestas=="CasiSiempre"){
            pet5res117="Casi Siempre"
            pet5val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion5[24].Respuestas=="AlgunasVeces"){
            pet5res118="Algunas Veces"
            pet5val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion5[24].Respuestas=="CasiNunca"){
            pet5res119="Casi Nunca"
            pet5val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion5[24].Respuestas=="Nunca"){
            pet5res120="Nunca"
            pet5val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion5[25].Respuestas=="Siempre"){
          pet5res121="Siempre"
          pet5val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion5[25].Respuestas=="CasiSiempre"){
            pet5res122="Casi Siempre"
            pet5val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion5[25].Respuestas=="AlgunasVeces"){
            pet5res123="Algunas Veces"
            pet5val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion5[25].Respuestas=="CasiNunca"){
            pet5res124="Casi Nunca"
            pet5val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion5[25].Respuestas=="Nunca"){
            pet5res125="Nunca"
            pet5val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion5[26].Respuestas=="Siempre"){
          pet5res126="Siempre"
          pet5val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion5[26].Respuestas=="CasiSiempre"){
            pet5res127="Casi Siempre"
            pet5val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion5[26].Respuestas=="AlgunasVeces"){
            pet5res128="Algunas Veces"
            pet5val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion5[26].Respuestas=="CasiNunca"){
            pet5res129="Casi Nunca"
            pet5val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion5[26].Respuestas=="Nunca"){
            pet5res130="Nunca"
            pet5val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion5[27].Respuestas=="Siempre"){
          pet5res131="Siempre"
          pet5val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion5[27].Respuestas=="CasiSiempre"){
            pet5res132="Casi Siempre"
            pet5val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion5[27].Respuestas=="AlgunasVeces"){
            pet5res133="Algunas Veces"
            pet5val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion5[27].Respuestas=="CasiNunca"){
            pet5res134="Casi Nunca"
            pet5val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion5[27].Respuestas=="Nunca"){
            pet5res135="Nunca"
            pet5val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion5[28].Respuestas=="Siempre"){
        pet5res136="Siempre"
        pet5val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion5[28].Respuestas=="CasiSiempre"){
          pet5res137="Casi Siempre"
          pet5val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion5[28].Respuestas=="AlgunasVeces"){
          pet5res138="Algunas Veces"
          pet5val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion5[28].Respuestas=="CasiNunca"){
          pet5res139="Casi Nunca"
          pet5val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion5[28].Respuestas=="Nunca"){
          pet5res140="Nunca"
          pet5val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion5[29].Respuestas=="Siempre"){
        pet5res141="Siempre"
        pet5val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion5[29].Respuestas=="CasiSiempre"){
          pet5res142="Casi Siempre"
          pet5val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion5[29].Respuestas=="AlgunasVeces"){
          pet5res143="Algunas Veces"
          pet5val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion5[29].Respuestas=="CasiNunca"){
          pet5res144="Casi Nunca"
          pet5val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion5[29].Respuestas=="Nunca"){
          pet5res145="Nunca"
          pet5val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion5[30].Respuestas=="Siempre"){
        pet5res146="Siempre"
        pet5val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion5[30].Respuestas=="CasiSiempre"){
          pet5res147="Casi Siempre"
          pet5val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion5[30].Respuestas=="AlgunasVeces"){
          pet5res148="Algunas Veces"
          pet5val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion5[30].Respuestas=="CasiNunca"){
          pet5res149="Casi Nunca"
          pet5val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion5[30].Respuestas=="Nunca"){
          pet5res150="Nunca"
          pet5val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion5[31].Respuestas=="Siempre"){
        pet5res151="Siempre"
        pet5val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion5[31].Respuestas=="CasiSiempre"){
          pet5res152="Casi Siempre"
          pet5val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion5[31].Respuestas=="AlgunasVeces"){
          pet5res153="Algunas Veces"
          pet5val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion5[31].Respuestas=="CasiNunca"){
          pet5res154="Casi Nunca"
          pet5val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion5[31].Respuestas=="Nunca"){
          pet5res155="Nunca"
          pet5val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion5[32].Respuestas=="Siempre"){
        pet5res156="Siempre"
        pet5val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion5[32].Respuestas=="CasiSiempre"){
          pet5res157="Casi Siempre"
          pet5val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion5[32].Respuestas=="AlgunasVeces"){
          pet5res158="Algunas Veces"
          pet5val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion5[32].Respuestas=="CasiNunca"){
          pet5res159="Casi Nunca"
          pet5val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion5[32].Respuestas=="Nunca"){
          pet5res160="Nunca"
          pet5val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion5[33].Respuestas=="Siempre"){
          pet5res161="Siempre"
          pet5val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion5[33].Respuestas=="CasiSiempre"){
            pet5res162="Casi Siempre"
            pet5val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion5[33].Respuestas=="AlgunasVeces"){
            pet5res163="Algunas Veces"
            pet5val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion5[33].Respuestas=="CasiNunca"){
            pet5res164="Casi Nunca"
            pet5val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion5[33].Respuestas=="Nunca"){
            pet5res165="Nunca"
            pet5val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion5[34].Respuestas=="Siempre"){
          pet5res166="Siempre"
          pet5val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion5[34].Respuestas=="CasiSiempre"){
            pet5res167="Casi Siempre"
            pet5val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion5[34].Respuestas=="AlgunasVeces"){
            pet5res168="Algunas Veces"
            pet5val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion5[34].Respuestas=="CasiNunca"){
            pet5res169="Casi Nunca"
            pet5val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion5[34].Respuestas=="Nunca"){
            pet5res170="Nunca"
            pet5val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion5[35].Respuestas=="Siempre"){
            pet5res171="Siempre"
            pet5val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion5[35].Respuestas=="CasiSiempre"){
              pet5res172="Casi Siempre"
              pet5val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion5[35].Respuestas=="AlgunasVeces"){
              pet5res173="Algunas Veces"
              pet5val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion5[35].Respuestas=="CasiNunca"){
              pet5res174="Casi Nunca"
              pet5val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion5[15].Respuestas=="Nunca"){
              pet5res175="Nunca"
              pet5val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion5[36].Respuestas=="Siempre"){
            pet5res176="Siempre"
            pet5val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion5[36].Respuestas=="CasiSiempre"){
              pet5res177="Casi Siempre"
              pet5val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion5[36].Respuestas=="AlgunasVeces"){
              pet5res178="Algunas Veces"
              pet5val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion5[36].Respuestas=="CasiNunca"){
              pet5res179="Casi Nunca"
              pet5val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion5[36].Respuestas=="Nunca"){
              pet5res180="Nunca"
              pet5val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion5[37].Respuestas=="Siempre"){
            pet5res181="Siempre"
            pet5val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion5[37].Respuestas=="CasiSiempre"){
              pet5res182="Casi Siempre"
              pet5val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion5[37].Respuestas=="AlgunasVeces"){
              pet5res183="Algunas Veces"
              pet5val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion5[37].Respuestas=="CasiNunca"){
              pet5res184="Casi Nunca"
              pet5val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion5[37].Respuestas=="Nunca"){
              pet5res185="Nunca"
              pet5val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion5[38].Respuestas=="Siempre"){
            pet5res186="Siempre"
            pet5val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion5[38].Respuestas=="CasiSiempre"){
              pet5res187="Casi Siempre"
              pet5val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion5[38].Respuestas=="AlgunasVeces"){
              pet5res188="Algunas Veces"
              pet5val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion5[38].Respuestas=="CasiNunca"){
              pet5res189="Casi Nunca"
              pet5val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion5[38].Respuestas=="Nunca"){
              pet5res190="Nunca"
              pet5val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion5[39].Respuestas=="Siempre"){
              pet5res191="Siempre"
              pet5val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion5[39].Respuestas=="CasiSiempre"){
                pet5res192="Casi Siempre"
                pet5val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion5[39].Respuestas=="AlgunasVeces"){
                pet5res193="Algunas Veces"
                pet5val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion5[39].Respuestas=="CasiNunca"){
                pet5res194="Casi Nunca"
                pet5val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion5[39].Respuestas=="Nunca"){
                pet5res195="Nunca"
                pet5val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion5[40].Respuestas=="Siempre"){
                pet5res196="Siempre"
                pet5val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion5[40].Respuestas=="CasiSiempre"){
                  pet5res197="Casi Siempre"
                  pet5val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion5[40].Respuestas=="AlgunasVeces"){
                  pet5res198="Algunas Veces"
                  pet5val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion5[40].Respuestas=="CasiNunca"){
                  pet5res199="Casi Nunca"
                  pet5val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion5[40].Respuestas=="Nunca"){
                  pet5res200="Nunca"
                  pet5val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion5[42].Respuestas=="Siempre"){
                pet5res201="Siempre"
                pet5val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion5[42].Respuestas=="CasiSiempre"){
                pet5res202="Casi Siempre"
                pet5val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion5[42].Respuestas=="AlgunasVeces"){
                pet5res203="Algunas Veces"
                pet5val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion5[42].Respuestas=="CasiNunca"){
                pet5res204="Casi Nunca"
                pet5val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion5[42].Respuestas=="Nunca"){
                pet5res205="Nunca"
                pet5val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion5[43].Respuestas=="Siempre"){
              pet5res206="Siempre"
              pet5val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion5[43].Respuestas=="CasiSiempre"){
              pet5res207="Casi Siempre"
              pet5val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion5[43].Respuestas=="AlgunasVeces"){
              pet5res208="Algunas Veces"
              pet5val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion5[43].Respuestas=="CasiNunca"){
              pet5res209="Casi Nunca"
              pet5val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion5[43].Respuestas=="Nunca"){
              pet5res210="Nunca"
              pet5val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion5[44].Respuestas=="Siempre"){
            pet5res211="Siempre"
            pet5val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion5[44].Respuestas=="CasiSiempre"){
            pet5res212="Casi Siempre"
            pet5val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion5[44].Respuestas=="AlgunasVeces"){
            pet5res213="Algunas Veces"
            pet5val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion5[44].Respuestas=="CasiNunca"){
            pet5res214="Casi Nunca"
            pet5val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion5[44].Respuestas=="Nunca"){
            pet5res215="Nunca"
            pet5val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion5[46].Respuestas=="Siempre"){
          pet5res216="Siempre"
          pet5val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion5[46].Respuestas=="CasiSiempre"){
          pet5res217="Casi Siempre"
          pet5val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion5[46].Respuestas=="AlgunasVeces"){
          pet5res218="Algunas Veces"
          pet5val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion5[46].Respuestas=="CasiNunca"){
          pet5res219="Casi Nunca"
          pet5val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion5[46].Respuestas=="Nunca"){
          pet5res220="Nunca"
          pet5val44= this.state.getPonderacion[43].nunca
        }
  
      if(this.state.peticion5[47].Respuestas=="Siempre"){
        pet5res221="Siempre"
        pet5val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion5[47].Respuestas=="CasiSiempre"){
        pet5res222="Casi Siempre"
        pet5val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion5[47].Respuestas=="AlgunasVeces"){
        pet5res223="Algunas Veces"
        pet5val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion5[47].Respuestas=="CasiNunca"){
        pet5res224="Casi Nunca"
        pet5val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion5[47].Respuestas=="Nunca"){
        pet5res225="Nunca"
        pet5val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion5[48].Respuestas=="Siempre"){
        pet5res226="Siempre"
        pet5val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion5[48].Respuestas=="CasiSiempre"){
        pet5res227="Casi Siempre"
        pet5val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion5[48].Respuestas=="AlgunasVeces"){
        pet5res228="Algunas Veces"
        pet5val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion5[48].Respuestas=="CasiNunca"){
        pet5res229="Casi Nunca"
        pet5val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion5[48].Respuestas=="Nunca"){
        pet5res230="Nunca"
        pet5val46= this.state.getPonderacion[45].nunca
      }
 } 
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  if(this.state.peticion6.length>0){

    if(this.state.peticion6[1].Respuestas=="Siempre"){
      pet6res1="Siempre"
      pet6val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion6[1].Respuestas=="CasiSiempre"){
        pet6res2="Casi Siempre"
        pet6val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion6[1].Respuestas=="AlgunasVeces"){
        pet6res3="Algunas Veces"
        pet6val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion6[1].Respuestas=="CasiNunca"){
        pet6res4="Casi Nunca"
        pet6val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion6[1].Respuestas=="Nunca"){
        pet6res5="Nunca"
        pet6val1= this.state.getPonderacion[0].nunca
      } 
  
  
    if(this.state.peticion6[2].Respuestas=="Siempre"){
      pet6res6="Siempre"
      pet6val2= this.state.peticion6[1].siempre
      }else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiSiempre"){
        pet6res7="Casi Siempre"
        pet6val2= this.state.peticion6[1].casisiempre
      }
      else if(this.state.resultadosEvaluacion[2].Respuestas=="AlgunasVeces"){
        pet6res8="Algunas Veces"
        pet6val2= this.state.peticion6[1].algunasveces
      } 
      else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiNunca"){
        pet6res9="Casi Nunca"
        pet6val2= this.state.peticion6[2].casinunca
      } 
      else if(this.state.peticion6[2].Respuestas=="Nunca"){
        pet6res10="Nunca"
        pet6val2= this.state.peticion6[1].nunca
      } 
  
      if(this.state.peticion6[3].Respuestas=="Siempre"){
        pet6res11="Siempre"
        pet6val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion6[3].Respuestas=="CasiSiempre"){
          pet6res12="Casi Siempre"
          pet6val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion6[3].Respuestas=="AlgunasVeces"){
          pet6res13="Algunas Veces"
          pet6val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion6[3].Respuestas=="CasiNunca"){
          pet6res14="Casi Nunca"
          pet6val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion6[3].Respuestas=="Nunca"){
          pet6res15="Nunca"
          pet6val3= this.state.getPonderacion[2].nunca
        } 
  
  
      if(this.state.peticion6[4].Respuestas=="Siempre"){
        pet6res16="Siempre"
        pet6val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion6[4].Respuestas=="CasiSiempre"){
          pet6res17="Casi Siempre"
          pet6val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion6[4].Respuestas=="AlgunasVeces"){
          pet6res18="Algunas Veces"
          pet6val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion6[4].Respuestas=="CasiNunca"){
          pet6res19="Casi Nunca"
          pet6val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion6[4].Respuestas=="Nunca"){
          pet6res20="Nunca"
          pet6val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion6[5].Respuestas=="Siempre"){
        pet6res21="Siempre"
        pet6val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion6[5].Respuestas=="CasiSiempre"){
          pet6res22="Casi Siempre"
          pet6val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion6[5].Respuestas=="AlgunasVeces"){
          pet6res23="Algunas Veces"
          pet6val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion6[5].Respuestas=="CasiNunca"){
          pet6res24="Casi Nunca"
          pet6val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion6[5].Respuestas=="Nunca"){
          pet6res25="Nunca"
          pet6val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion6[6].Respuestas=="Siempre"){
          pet6res26="Siempre"
          pet6val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion6[6].Respuestas=="CasiSiempre"){
            pet6res27="Casi Siempre"
            pet6val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion6[6].Respuestas=="AlgunasVeces"){
            pet6res28="Algunas Veces"
            pet6val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion6[6].Respuestas=="CasiNunca"){
            pet6res29="Casi Nunca"
            pet6val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion6[6].Respuestas=="Nunca"){
            pet6res30="Nunca"
            pet6val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion6[7].Respuestas=="Siempre"){
          pet6res31="Siempre"
          pet6val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion6[7].Respuestas=="CasiSiempre"){
            pet6res32="Casi Siempre"
            pet6val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion6[7].Respuestas=="AlgunasVeces"){
            pet6res33="Algunas Veces"
            pet6val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion6[7].Respuestas=="CasiNunca"){
            pet6res34="Casi Nunca"
            pet6val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion6[7].Respuestas=="Nunca"){
            pet6res35="Nunca"
            pet6val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion6[8].Respuestas=="Siempre"){
            pet6res36="Siempre"
            pet6val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion6[8].Respuestas=="CasiSiempre"){
              pet6res37="Casi Siempre"
              pet6val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion6[8].Respuestas=="AlgunasVeces"){
              pet6res38="Algunas Veces"
              pet6val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion6[8].Respuestas=="CasiNunca"){
              pet6res39="Casi Nunca"
              pet6val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion6[8].Respuestas=="Nunca"){
              pet6res40="Nunca"
              pet6val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion6[9].Respuestas=="Siempre"){
            pet6res41="Siempre"
            pet6val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion6[9].Respuestas=="CasiSiempre"){
              pet6res42="Casi Siempre"
              pet6val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion6[9].Respuestas=="AlgunasVeces"){
              pet6res43="Algunas Veces"
              pet6val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion6[9].Respuestas=="CasiNunca"){
              pet6res44="Casi Nunca"
              pet6val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion6[9].Respuestas=="Nunca"){
              pet6res45="Nunca"
              pet6val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion6[10].Respuestas=="Siempre"){
          pet6res46="Siempre"
          pet6val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion6[10].Respuestas=="CasiSiempre"){
            pet6res47="Casi Siempre"
            pet6val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion6[10].Respuestas=="AlgunasVeces"){
            pet6res48="Algunas Veces"
            pet6val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion6[10].Respuestas=="CasiNunca"){
            pet6res49="Casi Nunca"
            pet6val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion6[10].Respuestas=="Nunca"){
            pet6res50="Nunca"
            pet6val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion6[11].Respuestas=="Siempre"){
          pet6res51="Siempre"
          pet6val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion6[11].Respuestas=="CasiSiempre"){
            pet6res52="Casi Siempre"
            pet6val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion6[11].Respuestas=="AlgunasVeces"){
            pet6res53="Algunas Veces"
            pet6val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion6[11].Respuestas=="CasiNunca"){
            pet6res54="Casi Nunca"
            pet6val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion6[11].Respuestas=="Nunca"){
            pet6res55="Nunca"
            pet6val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion6[12].Respuestas=="Siempre"){
          pet6res56="Siempre"
          pet6val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion6[12].Respuestas=="CasiSiempre"){
            pet6res57="Casi Siempre"
            pet6val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion6[12].Respuestas=="AlgunasVeces"){
            pet6res58="Algunas Veces"
            pet6val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion6[12].Respuestas=="CasiNunca"){
            pet6res59="Casi Nunca"
            pet6val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion6[12].Respuestas=="Nunca"){
            pet6res60="Nunca"
            pet6val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion6[13].Respuestas=="Siempre"){
          pet6res61="Siempre"
          pet6val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion6[13].Respuestas=="CasiSiempre"){
            pet6res62="Casi Siempre"
            pet6val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion6[13].Respuestas=="AlgunasVeces"){
            pet6res63="Algunas Veces"
            pet6val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion6[13].Respuestas=="CasiNunca"){
            pet6res64="Casi Nunca"
            pet6val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion6[13].Respuestas=="Nunca"){
            pet6res65="Nunca"
            pet6val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion6[14].Respuestas=="Siempre"){
          pet6res66="Siempre"
          pet6val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion6[14].Respuestas=="CasiSiempre"){
            pet6res67="Casi Siempre"
            pet6val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion6[14].Respuestas=="AlgunasVeces"){
            pet6res68="Algunas Veces"
            pet6val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion6[14].Respuestas=="CasiNunca"){
            pet6res69="Casi Nunca"
            pet6val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion6[14].Respuestas=="Nunca"){
            pet6res70="Nunca"
            pet6val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion6[15].Respuestas=="Siempre"){
          pet6res71="Siempre"
          pet6val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion6[15].Respuestas=="CasiSiempre"){
            pet6res72="Casi Siempre"
            pet6val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion6[15].Respuestas=="AlgunasVeces"){
            pet6res73="Algunas Veces"
            pet6val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion6[15].Respuestas=="CasiNunca"){
            pet6res74="Casi Nunca"
            pet6val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion6[15].Respuestas=="Nunca"){
            pet6res75="Nunca"
            pet6val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion6[16].Respuestas=="Siempre"){
          pet6res76="Siempre"
          pet6val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion6[16].Respuestas=="CasiSiempre"){
            pet6res77="Casi Siempre"
            pet6val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion6[16].Respuestas=="AlgunasVeces"){
            pet6res78="Algunas Veces"
            pet6val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion6[16].Respuestas=="CasiNunca"){
            pet6res79="Casi Nunca"
            pet6val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion6[16].Respuestas=="Nunca"){
            pet6res80="Nunca"
            pet6val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion6[17].Respuestas=="Siempre"){
          pet6res81="Siempre"
          pet6val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion6[17].Respuestas=="CasiSiempre"){
            pet6res82="Casi Siempre"
            pet6val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion6[17].Respuestas=="AlgunasVeces"){
            pet6res83="Algunas Veces"
            pet6val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion6[17].Respuestas=="CasiNunca"){
            pet6res84="Casi Nunca"
            pet6val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion6[17].Respuestas=="Nunca"){
            pet6res85="Nunca"
            pet6val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion6[18].Respuestas=="Siempre"){
          pet6res86="Siempre"
          pet6val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion6[18].Respuestas=="CasiSiempre"){
            pet6res87="Casi Siempre"
            pet6val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion6[18].Respuestas=="AlgunasVeces"){
            pet6res88="Algunas Veces"
            pet6val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion6[18].Respuestas=="CasiNunca"){
            pet6res89="Casi Nunca"
            pet6val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion6[18].Respuestas=="Nunca"){
            pet6res90="Nunca"
            pet6val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion6[19].Respuestas=="Siempre"){
          pet6res91="Siempre"
          pet6val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion6[19].Respuestas=="CasiSiempre"){
            pet6res92="Casi Siempre"
            pet6val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion6[19].Respuestas=="AlgunasVeces"){
            pet6res93="Algunas Veces"
            pet6val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion6[19].Respuestas=="CasiNunca"){
            pet6res94="Casi Nunca"
            pet6val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion6[19].Respuestas=="Nunca"){
            pet6res95="Nunca"
            pet6val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion6[20].Respuestas=="Siempre"){
          pet6res96="Siempre"
          pet6val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion6[20].Respuestas=="CasiSiempre"){
            pet6res97="Casi Siempre"
            pet6val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion6[20].Respuestas=="AlgunasVeces"){
            pet6res98="Algunas Veces"
            pet6val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion6[20].Respuestas=="CasiNunca"){
            pet6res99="Casi Nunca"
            pet6val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion6[20].Respuestas=="Nunca"){
            pet6res100="Nunca"
            pet6val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion6[21].Respuestas=="Siempre"){
          pet6res101="Siempre"
          pet6val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion6[21].Respuestas=="CasiSiempre"){
            pet6res102="Casi Siempre"
            pet6val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion6[21].Respuestas=="AlgunasVeces"){
            pet6res103="Algunas Veces"
            pet6val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion6[21].Respuestas=="CasiNunca"){
            pet6res104="Casi Nunca"
            pet6val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion6[21].Respuestas=="Nunca"){
            pet6res105="Nunca"
            pet6val21= this.state.getPonderacion[20].nunca
          } 
  
        if(this.state.peticion6[22].Respuestas=="Siempre"){
          pet6res106="Siempre"
          pet6val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion6[22].Respuestas=="CasiSiempre"){
            pet6res107="Casi Siempre"
            pet6val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion6[22].Respuestas=="AlgunasVeces"){
            pet6res108="Algunas Veces"
            pet6val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion6[2].Respuestas=="CasiNunca"){
            pet6res109="Casi Nunca"
            pet6val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion6[22].Respuestas=="Nunca"){
            pet6res110="Nunca"
            pet6val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion6[23].Respuestas=="Siempre"){
          pet6res111="Siempre"
          pet6val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion6[23].Respuestas=="CasiSiempre"){
            pet6res112="Casi Siempre"
            pet6val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion6[23].Respuestas=="AlgunasVeces"){
            pet6res113="Algunas Veces"
            pet6val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion6[23].Respuestas=="CasiNunca"){
            pet6res114="Casi Nunca"
            pet6val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion6[23].Respuestas=="Nunca"){
            pet6res115="Nunca"
            pet6val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion6[24].Respuestas=="Siempre"){
          pet6res116="Siempre"
          pet6val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion6[24].Respuestas=="CasiSiempre"){
            pet6res117="Casi Siempre"
            pet6val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion6[24].Respuestas=="AlgunasVeces"){
            pet6res118="Algunas Veces"
            pet6val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion6[24].Respuestas=="CasiNunca"){
            pet6res119="Casi Nunca"
            pet6val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion6[24].Respuestas=="Nunca"){
            pet6res120="Nunca"
            pet6val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion6[25].Respuestas=="Siempre"){
          pet6res121="Siempre"
          pet6val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion6[25].Respuestas=="CasiSiempre"){
            pet6res122="Casi Siempre"
            pet6val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion6[25].Respuestas=="AlgunasVeces"){
            pet6res123="Algunas Veces"
            pet6val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion6[25].Respuestas=="CasiNunca"){
            pet6res124="Casi Nunca"
            pet6val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion6[25].Respuestas=="Nunca"){
            pet6res125="Nunca"
            pet6val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion6[26].Respuestas=="Siempre"){
          pet6res126="Siempre"
          pet6val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion6[26].Respuestas=="CasiSiempre"){
            pet6res127="Casi Siempre"
            pet6val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion6[26].Respuestas=="AlgunasVeces"){
            pet6res128="Algunas Veces"
            pet6val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion6[26].Respuestas=="CasiNunca"){
            pet6res129="Casi Nunca"
            pet6val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion6[26].Respuestas=="Nunca"){
            pet6res130="Nunca"
            pet6val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion6[27].Respuestas=="Siempre"){
          pet6res131="Siempre"
          pet6val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion6[27].Respuestas=="CasiSiempre"){
            pet6res132="Casi Siempre"
            pet6val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion6[27].Respuestas=="AlgunasVeces"){
            pet6res133="Algunas Veces"
            pet6val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion6[27].Respuestas=="CasiNunca"){
            pet6res134="Casi Nunca"
            pet6val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion6[27].Respuestas=="Nunca"){
            pet6res135="Nunca"
            pet6val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion6[28].Respuestas=="Siempre"){
        pet6res136="Siempre"
        pet6val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion6[28].Respuestas=="CasiSiempre"){
          pet6res137="Casi Siempre"
          pet6val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion6[28].Respuestas=="AlgunasVeces"){
          pet6res138="Algunas Veces"
          pet6val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion6[28].Respuestas=="CasiNunca"){
          pet6res139="Casi Nunca"
          pet6val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion6[28].Respuestas=="Nunca"){
          pet6res140="Nunca"
          pet6val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion6[29].Respuestas=="Siempre"){
        pet6res141="Siempre"
        pet6val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion6[29].Respuestas=="CasiSiempre"){
          pet6res142="Casi Siempre"
          pet6val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion6[29].Respuestas=="AlgunasVeces"){
          pet6res143="Algunas Veces"
          pet6val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion6[29].Respuestas=="CasiNunca"){
          pet6res144="Casi Nunca"
          pet6val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion6[29].Respuestas=="Nunca"){
          pet6res145="Nunca"
          pet6val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion6[30].Respuestas=="Siempre"){
        pet6res146="Siempre"
        pet6val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion6[30].Respuestas=="CasiSiempre"){
          pet6res147="Casi Siempre"
          pet6val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion6[30].Respuestas=="AlgunasVeces"){
          pet6res148="Algunas Veces"
          pet6val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion6[30].Respuestas=="CasiNunca"){
          pet6res149="Casi Nunca"
          pet6val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion6[30].Respuestas=="Nunca"){
          pet6res150="Nunca"
          pet6val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion6[31].Respuestas=="Siempre"){
        pet6res151="Siempre"
        pet6val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion6[31].Respuestas=="CasiSiempre"){
          pet6res152="Casi Siempre"
          pet6val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion6[31].Respuestas=="AlgunasVeces"){
          pet6res153="Algunas Veces"
          pet6val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion6[31].Respuestas=="CasiNunca"){
          pet6res154="Casi Nunca"
          pet6val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion6[31].Respuestas=="Nunca"){
          pet6res155="Nunca"
          pet6val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion6[32].Respuestas=="Siempre"){
        pet6res156="Siempre"
        pet6val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion6[32].Respuestas=="CasiSiempre"){
          pet6res157="Casi Siempre"
          pet6val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion6[32].Respuestas=="AlgunasVeces"){
          pet6res158="Algunas Veces"
          pet6val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion6[32].Respuestas=="CasiNunca"){
          pet6res159="Casi Nunca"
          pet6val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion6[32].Respuestas=="Nunca"){
          pet6res160="Nunca"
          pet6val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion6[33].Respuestas=="Siempre"){
          pet6res161="Siempre"
          pet6val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion6[33].Respuestas=="CasiSiempre"){
            pet6res162="Casi Siempre"
            pet6val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion6[33].Respuestas=="AlgunasVeces"){
            pet6res163="Algunas Veces"
            pet6val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion6[33].Respuestas=="CasiNunca"){
            pet6res164="Casi Nunca"
            pet6val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion6[33].Respuestas=="Nunca"){
            pet6res165="Nunca"
            pet6val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion6[34].Respuestas=="Siempre"){
          pet6res166="Siempre"
          pet6val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion6[34].Respuestas=="CasiSiempre"){
            pet6res167="Casi Siempre"
            pet6val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion6[34].Respuestas=="AlgunasVeces"){
            pet6res168="Algunas Veces"
            pet6val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion6[34].Respuestas=="CasiNunca"){
            pet6res169="Casi Nunca"
            pet6val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion6[34].Respuestas=="Nunca"){
            pet6res170="Nunca"
            pet6val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion6[35].Respuestas=="Siempre"){
            pet6res171="Siempre"
            pet6val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion6[35].Respuestas=="CasiSiempre"){
              pet6res172="Casi Siempre"
              pet6val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion6[35].Respuestas=="AlgunasVeces"){
              pet6res173="Algunas Veces"
              pet6val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion6[35].Respuestas=="CasiNunca"){
              pet6res174="Casi Nunca"
              pet6val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion6[15].Respuestas=="Nunca"){
              pet6res175="Nunca"
              pet6val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion6[36].Respuestas=="Siempre"){
            pet6res176="Siempre"
            pet6val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion6[36].Respuestas=="CasiSiempre"){
              pet6res177="Casi Siempre"
              pet6val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion6[36].Respuestas=="AlgunasVeces"){
              pet6res178="Algunas Veces"
              pet6val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion6[36].Respuestas=="CasiNunca"){
              pet6res179="Casi Nunca"
              pet6val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion6[36].Respuestas=="Nunca"){
              pet6res180="Nunca"
              pet6val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion6[37].Respuestas=="Siempre"){
            pet6res181="Siempre"
            pet6val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion6[37].Respuestas=="CasiSiempre"){
              pet6res182="Casi Siempre"
              pet6val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion6[37].Respuestas=="AlgunasVeces"){
              pet6res183="Algunas Veces"
              pet6val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion6[37].Respuestas=="CasiNunca"){
              pet6res184="Casi Nunca"
              pet6val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion6[37].Respuestas=="Nunca"){
              pet6res185="Nunca"
              pet6val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion6[38].Respuestas=="Siempre"){
            pet6res186="Siempre"
            pet6val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion6[38].Respuestas=="CasiSiempre"){
              pet6res187="Casi Siempre"
              pet6val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion6[38].Respuestas=="AlgunasVeces"){
              pet6res188="Algunas Veces"
              pet6val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion6[38].Respuestas=="CasiNunca"){
              pet6res189="Casi Nunca"
              pet6val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion6[38].Respuestas=="Nunca"){
              pet6res190="Nunca"
              pet6val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion6[39].Respuestas=="Siempre"){
              pet6res191="Siempre"
              pet6val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion6[39].Respuestas=="CasiSiempre"){
                pet6res192="Casi Siempre"
                pet6val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion6[39].Respuestas=="AlgunasVeces"){
                pet6res193="Algunas Veces"
                pet6val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion6[39].Respuestas=="CasiNunca"){
                pet6res194="Casi Nunca"
                pet6val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion6[39].Respuestas=="Nunca"){
                pet6res195="Nunca"
                pet6val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion6[40].Respuestas=="Siempre"){
                pet6res196="Siempre"
                pet6val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion6[40].Respuestas=="CasiSiempre"){
                  pet6res197="Casi Siempre"
                  pet6val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion6[40].Respuestas=="AlgunasVeces"){
                  pet6res198="Algunas Veces"
                  pet6val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion6[40].Respuestas=="CasiNunca"){
                  pet6res199="Casi Nunca"
                  pet6val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion6[40].Respuestas=="Nunca"){
                  pet6res200="Nunca"
                  pet6val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion6[42].Respuestas=="Siempre"){
                pet6res201="Siempre"
                pet6val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion6[42].Respuestas=="CasiSiempre"){
                pet6res202="Casi Siempre"
                pet6val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion6[42].Respuestas=="AlgunasVeces"){
                pet6res203="Algunas Veces"
                pet6val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion6[42].Respuestas=="CasiNunca"){
                pet6res204="Casi Nunca"
                pet6val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion6[42].Respuestas=="Nunca"){
                pet6res205="Nunca"
                pet6val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion6[43].Respuestas=="Siempre"){
              pet6res206="Siempre"
              pet6val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion6[43].Respuestas=="CasiSiempre"){
              pet6res207="Casi Siempre"
              pet6val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion6[43].Respuestas=="AlgunasVeces"){
              pet6res208="Algunas Veces"
              pet6val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion6[43].Respuestas=="CasiNunca"){
              pet6res209="Casi Nunca"
              pet6val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion6[43].Respuestas=="Nunca"){
              pet6res210="Nunca"
              pet6val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion6[44].Respuestas=="Siempre"){
            pet6res211="Siempre"
            pet6val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion6[44].Respuestas=="CasiSiempre"){
            pet6res212="Casi Siempre"
            pet6val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion6[44].Respuestas=="AlgunasVeces"){
            pet6res213="Algunas Veces"
            pet6val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion6[44].Respuestas=="CasiNunca"){
            pet6res214="Casi Nunca"
            pet6val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion6[44].Respuestas=="Nunca"){
            pet6res215="Nunca"
            pet6val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion6[46].Respuestas=="Siempre"){
          pet6res216="Siempre"
          pet6val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion6[46].Respuestas=="CasiSiempre"){
          pet6res217="Casi Siempre"
          pet6val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion6[46].Respuestas=="AlgunasVeces"){
          pet6res218="Algunas Veces"
          pet6val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion6[46].Respuestas=="CasiNunca"){
          pet6res219="Casi Nunca"
          pet6val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion6[46].Respuestas=="Nunca"){
          pet6res220="Nunca"
          pet6val44= this.state.getPonderacion[43].nunca
        }
  
      if(this.state.peticion6[47].Respuestas=="Siempre"){
        pet6res221="Siempre"
        pet6val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion6[47].Respuestas=="CasiSiempre"){
        pet6res222="Casi Siempre"
        pet6val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion6[47].Respuestas=="AlgunasVeces"){
        pet6res223="Algunas Veces"
        pet6val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion6[47].Respuestas=="CasiNunca"){
        pet6res224="Casi Nunca"
        pet6val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion6[47].Respuestas=="Nunca"){
        pet6res225="Nunca"
        pet6val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion6[48].Respuestas=="Siempre"){
        pet6res226="Siempre"
        pet6val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion6[48].Respuestas=="CasiSiempre"){
        pet6res227="Casi Siempre"
        pet6val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion6[48].Respuestas=="AlgunasVeces"){
        pet6res228="Algunas Veces"
        pet6val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion6[48].Respuestas=="CasiNunca"){
        pet6res229="Casi Nunca"
        pet6val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion6[48].Respuestas=="Nunca"){
        pet6res230="Nunca"
        pet6val46= this.state.getPonderacion[45].nunca
      }
   } 
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77777777
     ///////////////////////////////////////////////////////////////////////////////////////////////////////
   
  
  if(this.state.peticion7.length>0){

    if(this.state.peticion7[1].Respuestas=="Siempre"){
      pet7res1="Siempre"
      pet7val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion7[1].Respuestas=="CasiSiempre"){
        pet7res2="Casi Siempre"
        pet7val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion7[1].Respuestas=="AlgunasVeces"){
        pet7res3="Algunas Veces"
        pet7val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion7[1].Respuestas=="CasiNunca"){
        pet7res4="Casi Nunca"
        pet7val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion7[1].Respuestas=="Nunca"){
        pet7res5="Nunca"
        pet7val1= this.state.getPonderacion[0].nunca
      } 
  
  
    if(this.state.peticion7[2].Respuestas=="Siempre"){
      pet7res6="Siempre"
      pet7val2= this.state.peticion7[1].siempre
      }else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiSiempre"){
        pet7res7="Casi Siempre"
        pet7val2= this.state.peticion7[1].casisiempre
      }
      else if(this.state.resultadosEvaluacion[2].Respuestas=="AlgunasVeces"){
        pet7res8="Algunas Veces"
        pet7val2= this.state.peticion7[1].algunasveces
      } 
      else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiNunca"){
        pet7res9="Casi Nunca"
        pet7val2= this.state.peticion7[2].casinunca
      } 
      else if(this.state.peticion7[2].Respuestas=="Nunca"){
        pet7res10="Nunca"
        pet7val2= this.state.peticion7[1].nunca
      } 
  
      if(this.state.peticion7[3].Respuestas=="Siempre"){
        pet7res11="Siempre"
        pet7val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion7[3].Respuestas=="CasiSiempre"){
          pet7res12="Casi Siempre"
          pet7val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion7[3].Respuestas=="AlgunasVeces"){
          pet7res13="Algunas Veces"
          pet7val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion7[3].Respuestas=="CasiNunca"){
          pet7res14="Casi Nunca"
          pet7val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion7[3].Respuestas=="Nunca"){
          pet7res15="Nunca"
          pet7val3= this.state.getPonderacion[2].nunca
        } 
      
      if(this.state.peticion7[4].Respuestas=="Siempre"){
        pet7res16="Siempre"
        pet7val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion7[4].Respuestas=="CasiSiempre"){
          pet7res17="Casi Siempre"
          pet7val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion7[4].Respuestas=="AlgunasVeces"){
          pet7res18="Algunas Veces"
          pet7val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion7[4].Respuestas=="CasiNunca"){
          pet7res19="Casi Nunca"
          pet7val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion7[4].Respuestas=="Nunca"){
          pet7res20="Nunca"
          pet7val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion7[5].Respuestas=="Siempre"){
        pet7res21="Siempre"
        pet7val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion7[5].Respuestas=="CasiSiempre"){
          pet7res22="Casi Siempre"
          pet7val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion7[5].Respuestas=="AlgunasVeces"){
          pet7res23="Algunas Veces"
          pet7val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion7[5].Respuestas=="CasiNunca"){
          pet7res24="Casi Nunca"
          pet7val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion7[5].Respuestas=="Nunca"){
          pet7res25="Nunca"
          pet7val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion7[6].Respuestas=="Siempre"){
          pet7res26="Siempre"
          pet7val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion7[6].Respuestas=="CasiSiempre"){
            pet7res27="Casi Siempre"
            pet7val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion7[6].Respuestas=="AlgunasVeces"){
            pet7res28="Algunas Veces"
            pet7val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion7[6].Respuestas=="CasiNunca"){
            pet7res29="Casi Nunca"
            pet7val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion7[6].Respuestas=="Nunca"){
            pet7res30="Nunca"
            pet7val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion7[7].Respuestas=="Siempre"){
          pet7res31="Siempre"
          pet7val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion7[7].Respuestas=="CasiSiempre"){
            pet7res32="Casi Siempre"
            pet7val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion7[7].Respuestas=="AlgunasVeces"){
            pet7res33="Algunas Veces"
            pet7val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion7[7].Respuestas=="CasiNunca"){
            pet7res34="Casi Nunca"
            pet7val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion7[7].Respuestas=="Nunca"){
            pet7res35="Nunca"
            pet7val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion7[8].Respuestas=="Siempre"){
            pet7res36="Siempre"
            pet7val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion7[8].Respuestas=="CasiSiempre"){
              pet7res37="Casi Siempre"
              pet7val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion7[8].Respuestas=="AlgunasVeces"){
              pet7res38="Algunas Veces"
              pet7val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion7[8].Respuestas=="CasiNunca"){
              pet7res39="Casi Nunca"
              pet7val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion7[8].Respuestas=="Nunca"){
              pet7res40="Nunca"
              pet7val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion7[9].Respuestas=="Siempre"){
            pet7res41="Siempre"
            pet7val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion7[9].Respuestas=="CasiSiempre"){
              pet7res42="Casi Siempre"
              pet7val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion7[9].Respuestas=="AlgunasVeces"){
              pet7res43="Algunas Veces"
              pet7val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion7[9].Respuestas=="CasiNunca"){
              pet7res44="Casi Nunca"
              pet7val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion7[9].Respuestas=="Nunca"){
              pet7res45="Nunca"
              pet7val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion7[10].Respuestas=="Siempre"){
          pet7res46="Siempre"
          pet7val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion7[10].Respuestas=="CasiSiempre"){
            pet7res47="Casi Siempre"
            pet7val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion7[10].Respuestas=="AlgunasVeces"){
            pet7res48="Algunas Veces"
            pet7val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion7[10].Respuestas=="CasiNunca"){
            pet7res49="Casi Nunca"
            pet7val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion7[10].Respuestas=="Nunca"){
            pet7res50="Nunca"
            pet7val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion7[11].Respuestas=="Siempre"){
          pet7res51="Siempre"
          pet7val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion7[11].Respuestas=="CasiSiempre"){
            pet7res52="Casi Siempre"
            pet7val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion7[11].Respuestas=="AlgunasVeces"){
            pet7res53="Algunas Veces"
            pet7val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion7[11].Respuestas=="CasiNunca"){
            pet7res54="Casi Nunca"
            pet7val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion7[11].Respuestas=="Nunca"){
            pet7res55="Nunca"
            pet7val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion7[12].Respuestas=="Siempre"){
          pet7res56="Siempre"
          pet7val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion7[12].Respuestas=="CasiSiempre"){
            pet7res57="Casi Siempre"
            pet7val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion7[12].Respuestas=="AlgunasVeces"){
            pet7res58="Algunas Veces"
            pet7val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion7[12].Respuestas=="CasiNunca"){
            pet7res59="Casi Nunca"
            pet7val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion7[12].Respuestas=="Nunca"){
            pet7res60="Nunca"
            pet7val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion7[13].Respuestas=="Siempre"){
          pet7res61="Siempre"
          pet7val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion7[13].Respuestas=="CasiSiempre"){
            pet7res62="Casi Siempre"
            pet7val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion7[13].Respuestas=="AlgunasVeces"){
            pet7res63="Algunas Veces"
            pet7val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion7[13].Respuestas=="CasiNunca"){
            pet7res64="Casi Nunca"
            pet7val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion7[13].Respuestas=="Nunca"){
            pet7res65="Nunca"
            pet7val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion7[14].Respuestas=="Siempre"){
          pet7res66="Siempre"
          pet7val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion7[14].Respuestas=="CasiSiempre"){
            pet7res67="Casi Siempre"
            pet7val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion7[14].Respuestas=="AlgunasVeces"){
            pet7res68="Algunas Veces"
            pet7val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion7[14].Respuestas=="CasiNunca"){
            pet7res69="Casi Nunca"
            pet7val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion7[14].Respuestas=="Nunca"){
            pet7res70="Nunca"
            pet7val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion7[15].Respuestas=="Siempre"){
          pet7res71="Siempre"
          pet7val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion7[15].Respuestas=="CasiSiempre"){
            pet7res72="Casi Siempre"
            pet7val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion7[15].Respuestas=="AlgunasVeces"){
            pet7res73="Algunas Veces"
            pet7val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion7[15].Respuestas=="CasiNunca"){
            pet7res74="Casi Nunca"
            pet7val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion7[15].Respuestas=="Nunca"){
            pet7res75="Nunca"
            pet7val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion7[16].Respuestas=="Siempre"){
          pet7res76="Siempre"
          pet7val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion7[16].Respuestas=="CasiSiempre"){
            pet7res77="Casi Siempre"
            pet7val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion7[16].Respuestas=="AlgunasVeces"){
            pet7res78="Algunas Veces"
            pet7val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion7[16].Respuestas=="CasiNunca"){
            pet7res79="Casi Nunca"
            pet7val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion7[16].Respuestas=="Nunca"){
            pet7res80="Nunca"
            pet7val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion7[17].Respuestas=="Siempre"){
          pet7res81="Siempre"
          pet7val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion7[17].Respuestas=="CasiSiempre"){
            pet7res82="Casi Siempre"
            pet7val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion7[17].Respuestas=="AlgunasVeces"){
            pet7res83="Algunas Veces"
            pet7val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion7[17].Respuestas=="CasiNunca"){
            pet7res84="Casi Nunca"
            pet7val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion7[17].Respuestas=="Nunca"){
            pet7res85="Nunca"
            pet7val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion7[18].Respuestas=="Siempre"){
          pet7res86="Siempre"
          pet7val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion7[18].Respuestas=="CasiSiempre"){
            pet7res87="Casi Siempre"
            pet7val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion7[18].Respuestas=="AlgunasVeces"){
            pet7res88="Algunas Veces"
            pet7val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion7[18].Respuestas=="CasiNunca"){
            pet7res89="Casi Nunca"
            pet7val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion7[18].Respuestas=="Nunca"){
            pet7res90="Nunca"
            pet7val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion7[19].Respuestas=="Siempre"){
          pet7res91="Siempre"
          pet7val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion7[19].Respuestas=="CasiSiempre"){
            pet7res92="Casi Siempre"
            pet7val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion7[19].Respuestas=="AlgunasVeces"){
            pet7res93="Algunas Veces"
            pet7val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion7[19].Respuestas=="CasiNunca"){
            pet7res94="Casi Nunca"
            pet7val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion7[19].Respuestas=="Nunca"){
            pet7res95="Nunca"
            pet7val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion7[20].Respuestas=="Siempre"){
          pet7res96="Siempre"
          pet7val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion7[20].Respuestas=="CasiSiempre"){
            pet7res97="Casi Siempre"
            pet7val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion7[20].Respuestas=="AlgunasVeces"){
            pet7res98="Algunas Veces"
            pet7val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion7[20].Respuestas=="CasiNunca"){
            pet7res99="Casi Nunca"
            pet7val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion7[20].Respuestas=="Nunca"){
            pet7res100="Nunca"
            pet7val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion7[21].Respuestas=="Siempre"){
          pet7res101="Siempre"
          pet7val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion7[21].Respuestas=="CasiSiempre"){
            pet7res102="Casi Siempre"
            pet7val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion7[21].Respuestas=="AlgunasVeces"){
            pet7res103="Algunas Veces"
            pet7val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion7[21].Respuestas=="CasiNunca"){
            pet7res104="Casi Nunca"
            pet7val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion7[21].Respuestas=="Nunca"){
            pet7res105="Nunca"
            pet7val21= this.state.getPonderacion[20].nunca
          } 
         
        if(this.state.peticion7[22].Respuestas=="Siempre"){
          pet7res106="Siempre"
          pet7val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion7[22].Respuestas=="CasiSiempre"){
            pet7res107="Casi Siempre"
            pet7val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion7[22].Respuestas=="AlgunasVeces"){
            pet7res108="Algunas Veces"
            pet7val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion7[2].Respuestas=="CasiNunca"){
            pet7res109="Casi Nunca"
            pet7val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion7[22].Respuestas=="Nunca"){
            pet7res110="Nunca"
            pet7val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion7[23].Respuestas=="Siempre"){
          pet7res111="Siempre"
          pet7val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion7[23].Respuestas=="CasiSiempre"){
            pet7res112="Casi Siempre"
            pet7val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion7[23].Respuestas=="AlgunasVeces"){
            pet7res113="Algunas Veces"
            pet7val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion7[23].Respuestas=="CasiNunca"){
            pet7res114="Casi Nunca"
            pet7val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion7[23].Respuestas=="Nunca"){
            pet7res115="Nunca"
            pet7val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion7[24].Respuestas=="Siempre"){
          pet7res116="Siempre"
          pet7val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion7[24].Respuestas=="CasiSiempre"){
            pet7res117="Casi Siempre"
            pet7val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion7[24].Respuestas=="AlgunasVeces"){
            pet7res118="Algunas Veces"
            pet7val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion7[24].Respuestas=="CasiNunca"){
            pet7res119="Casi Nunca"
            pet7val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion7[24].Respuestas=="Nunca"){
            pet7res120="Nunca"
            pet7val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion7[25].Respuestas=="Siempre"){
          pet7res121="Siempre"
          pet7val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion7[25].Respuestas=="CasiSiempre"){
            pet7res122="Casi Siempre"
            pet7val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion7[25].Respuestas=="AlgunasVeces"){
            pet7res123="Algunas Veces"
            pet7val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion7[25].Respuestas=="CasiNunca"){
            pet7res124="Casi Nunca"
            pet7val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion7[25].Respuestas=="Nunca"){
            pet7res125="Nunca"
            pet7val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion7[26].Respuestas=="Siempre"){
          pet7res126="Siempre"
          pet7val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion7[26].Respuestas=="CasiSiempre"){
            pet7res127="Casi Siempre"
            pet7val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion7[26].Respuestas=="AlgunasVeces"){
            pet7res128="Algunas Veces"
            pet7val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion7[26].Respuestas=="CasiNunca"){
            pet7res129="Casi Nunca"
            pet7val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion7[26].Respuestas=="Nunca"){
            pet7res130="Nunca"
            pet7val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion7[27].Respuestas=="Siempre"){
          pet7res131="Siempre"
          pet7val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion7[27].Respuestas=="CasiSiempre"){
            pet7res132="Casi Siempre"
            pet7val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion7[27].Respuestas=="AlgunasVeces"){
            pet7res133="Algunas Veces"
            pet7val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion7[27].Respuestas=="CasiNunca"){
            pet7res134="Casi Nunca"
            pet7val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion7[27].Respuestas=="Nunca"){
            pet7res135="Nunca"
            pet7val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion7[28].Respuestas=="Siempre"){
        pet7res136="Siempre"
        pet7val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion7[28].Respuestas=="CasiSiempre"){
          pet7res137="Casi Siempre"
          pet7val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion7[28].Respuestas=="AlgunasVeces"){
          pet7res138="Algunas Veces"
          pet7val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion7[28].Respuestas=="CasiNunca"){
          pet7res139="Casi Nunca"
          pet7val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion7[28].Respuestas=="Nunca"){
          pet7res140="Nunca"
          pet7val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion7[29].Respuestas=="Siempre"){
        pet7res141="Siempre"
        pet7val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion7[29].Respuestas=="CasiSiempre"){
          pet7res142="Casi Siempre"
          pet7val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion7[29].Respuestas=="AlgunasVeces"){
          pet7res143="Algunas Veces"
          pet7val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion7[29].Respuestas=="CasiNunca"){
          pet7res144="Casi Nunca"
          pet7val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion7[29].Respuestas=="Nunca"){
          pet7res145="Nunca"
          pet7val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion7[30].Respuestas=="Siempre"){
        pet7res146="Siempre"
        pet7val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion7[30].Respuestas=="CasiSiempre"){
          pet7res147="Casi Siempre"
          pet7val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion7[30].Respuestas=="AlgunasVeces"){
          pet7res148="Algunas Veces"
          pet7val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion7[30].Respuestas=="CasiNunca"){
          pet7res149="Casi Nunca"
          pet7val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion7[30].Respuestas=="Nunca"){
          pet7res150="Nunca"
          pet7val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion7[31].Respuestas=="Siempre"){
        pet7res151="Siempre"
        pet7val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion7[31].Respuestas=="CasiSiempre"){
          pet7res152="Casi Siempre"
          pet7val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion7[31].Respuestas=="AlgunasVeces"){
          pet7res153="Algunas Veces"
          pet7val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion7[31].Respuestas=="CasiNunca"){
          pet7res154="Casi Nunca"
          pet7val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion7[31].Respuestas=="Nunca"){
          pet7res155="Nunca"
          pet7val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion7[32].Respuestas=="Siempre"){
        pet7res156="Siempre"
        pet7val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion7[32].Respuestas=="CasiSiempre"){
          pet7res157="Casi Siempre"
          pet7val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion7[32].Respuestas=="AlgunasVeces"){
          pet7res158="Algunas Veces"
          pet7val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion7[32].Respuestas=="CasiNunca"){
          pet7res159="Casi Nunca"
          pet7val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion7[32].Respuestas=="Nunca"){
          pet7res160="Nunca"
          pet7val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion7[33].Respuestas=="Siempre"){
          pet7res161="Siempre"
          pet7val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion7[33].Respuestas=="CasiSiempre"){
            pet7res162="Casi Siempre"
            pet7val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion7[33].Respuestas=="AlgunasVeces"){
            pet7res163="Algunas Veces"
            pet7val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion7[33].Respuestas=="CasiNunca"){
            pet7res164="Casi Nunca"
            pet7val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion7[33].Respuestas=="Nunca"){
            pet7res165="Nunca"
            pet7val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion7[34].Respuestas=="Siempre"){
          pet7res166="Siempre"
          pet7val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion7[34].Respuestas=="CasiSiempre"){
            pet7res167="Casi Siempre"
            pet7val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion7[34].Respuestas=="AlgunasVeces"){
            pet7res168="Algunas Veces"
            pet7val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion7[34].Respuestas=="CasiNunca"){
            pet7res169="Casi Nunca"
            pet7val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion7[34].Respuestas=="Nunca"){
            pet7res170="Nunca"
            pet7val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion7[35].Respuestas=="Siempre"){
            pet7res171="Siempre"
            pet7val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion7[35].Respuestas=="CasiSiempre"){
              pet7res172="Casi Siempre"
              pet7val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion7[35].Respuestas=="AlgunasVeces"){
              pet7res173="Algunas Veces"
              pet7val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion7[35].Respuestas=="CasiNunca"){
              pet7res174="Casi Nunca"
              pet7val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion7[15].Respuestas=="Nunca"){
              pet7res175="Nunca"
              pet7val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion7[36].Respuestas=="Siempre"){
            pet7res176="Siempre"
            pet7val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion7[36].Respuestas=="CasiSiempre"){
              pet7res177="Casi Siempre"
              pet7val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion7[36].Respuestas=="AlgunasVeces"){
              pet7res178="Algunas Veces"
              pet7val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion7[36].Respuestas=="CasiNunca"){
              pet7res179="Casi Nunca"
              pet7val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion7[36].Respuestas=="Nunca"){
              pet7res180="Nunca"
              pet7val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion7[37].Respuestas=="Siempre"){
            pet7res181="Siempre"
            pet7val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion7[37].Respuestas=="CasiSiempre"){
              pet7res182="Casi Siempre"
              pet7val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion7[37].Respuestas=="AlgunasVeces"){
              pet7res183="Algunas Veces"
              pet7val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion7[37].Respuestas=="CasiNunca"){
              pet7res184="Casi Nunca"
              pet7val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion7[37].Respuestas=="Nunca"){
              pet7res185="Nunca"
              pet7val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion7[38].Respuestas=="Siempre"){
            pet7res186="Siempre"
            pet7val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion7[38].Respuestas=="CasiSiempre"){
              pet7res187="Casi Siempre"
              pet7val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion7[38].Respuestas=="AlgunasVeces"){
              pet7res188="Algunas Veces"
              pet7val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion7[38].Respuestas=="CasiNunca"){
              pet7res189="Casi Nunca"
              pet7val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion7[38].Respuestas=="Nunca"){
              pet7res190="Nunca"
              pet7val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion7[39].Respuestas=="Siempre"){
              pet7res191="Siempre"
              pet7val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion7[39].Respuestas=="CasiSiempre"){
                pet7res192="Casi Siempre"
                pet7val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion7[39].Respuestas=="AlgunasVeces"){
                pet7res193="Algunas Veces"
                pet7val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion7[39].Respuestas=="CasiNunca"){
                pet7res194="Casi Nunca"
                pet7val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion7[39].Respuestas=="Nunca"){
                pet7res195="Nunca"
                pet7val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion7[40].Respuestas=="Siempre"){
                pet7res196="Siempre"
                pet7val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion7[40].Respuestas=="CasiSiempre"){
                  pet7res197="Casi Siempre"
                  pet7val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion7[40].Respuestas=="AlgunasVeces"){
                  pet7res198="Algunas Veces"
                  pet7val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion7[40].Respuestas=="CasiNunca"){
                  pet7res199="Casi Nunca"
                  pet7val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion7[40].Respuestas=="Nunca"){
                  pet7res200="Nunca"
                  pet7val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion7[42].Respuestas=="Siempre"){
                pet7res201="Siempre"
                pet7val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion7[42].Respuestas=="CasiSiempre"){
                pet7res202="Casi Siempre"
                pet7val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion7[42].Respuestas=="AlgunasVeces"){
                pet7res203="Algunas Veces"
                pet7val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion7[42].Respuestas=="CasiNunca"){
                pet7res204="Casi Nunca"
                pet7val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion7[42].Respuestas=="Nunca"){
                pet7res205="Nunca"
                pet7val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion7[43].Respuestas=="Siempre"){
              pet7res206="Siempre"
              pet7val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion7[43].Respuestas=="CasiSiempre"){
              pet7res207="Casi Siempre"
              pet7val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion7[43].Respuestas=="AlgunasVeces"){
              pet7res208="Algunas Veces"
              pet7val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion7[43].Respuestas=="CasiNunca"){
              pet7res209="Casi Nunca"
              pet7val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion7[43].Respuestas=="Nunca"){
              pet7res210="Nunca"
              pet7val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion7[44].Respuestas=="Siempre"){
            pet7res211="Siempre"
            pet7val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion7[44].Respuestas=="CasiSiempre"){
            pet7res212="Casi Siempre"
            pet7val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion7[44].Respuestas=="AlgunasVeces"){
            pet7res213="Algunas Veces"
            pet7val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion7[44].Respuestas=="CasiNunca"){
            pet7res214="Casi Nunca"
            pet7val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion7[44].Respuestas=="Nunca"){
            pet7res215="Nunca"
            pet7val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion7[46].Respuestas=="Siempre"){
          pet7res216="Siempre"
          pet7val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion7[46].Respuestas=="CasiSiempre"){
          pet7res217="Casi Siempre"
          pet7val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion7[46].Respuestas=="AlgunasVeces"){
          pet7res218="Algunas Veces"
          pet7val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion7[46].Respuestas=="CasiNunca"){
          pet7res219="Casi Nunca"
          pet7val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion7[46].Respuestas=="Nunca"){
          pet7res220="Nunca"
          pet7val44= this.state.getPonderacion[43].nunca
        }
      if(this.state.peticion7[47].Respuestas=="Siempre"){
        pet7res221="Siempre"
        pet7val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion7[47].Respuestas=="CasiSiempre"){
        pet7res222="Casi Siempre"
        pet7val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion7[47].Respuestas=="AlgunasVeces"){
        pet7res223="Algunas Veces"
        pet7val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion7[47].Respuestas=="CasiNunca"){
        pet7res224="Casi Nunca"
        pet7val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion7[47].Respuestas=="Nunca"){
        pet7res225="Nunca"
        pet7val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion7[48].Respuestas=="Siempre"){
        pet7res226="Siempre"
        pet7val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion7[48].Respuestas=="CasiSiempre"){
        pet7res227="Casi Siempre"
        pet7val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion7[48].Respuestas=="AlgunasVeces"){
        pet7res228="Algunas Veces"
        pet7val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion7[48].Respuestas=="CasiNunca"){
        pet7res229="Casi Nunca"
        pet7val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion7[48].Respuestas=="Nunca"){
        pet7res230="Nunca"
        pet7val46= this.state.getPonderacion[45].nunca
      }
 } 
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////////////////////////////////////////////////////////////////////////////////

  if(this.state.peticion8.length>0){

    if(this.state.peticion8[1].Respuestas=="Siempre"){
      pet8res1="Siempre"
      pet8val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion8[1].Respuestas=="CasiSiempre"){
        pet8res2="Casi Siempre"
        pet8val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion8[1].Respuestas=="AlgunasVeces"){
        pet8res3="Algunas Veces"
        pet8val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion8[1].Respuestas=="CasiNunca"){
        pet8res4="Casi Nunca"
        pet8val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion8[1].Respuestas=="Nunca"){
        pet8res5="Nunca"
        pet8val1= this.state.getPonderacion[0].nunca
      } 
  
  
    if(this.state.peticion8[2].Respuestas=="Siempre"){
      pet8res6="Siempre"
      pet8val2= this.state.peticion8[1].siempre
      }else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiSiempre"){
        pet8res7="Casi Siempre"
        pet8val2= this.state.peticion8[1].casisiempre
      }
      else if(this.state.resultadosEvaluacion[2].Respuestas=="AlgunasVeces"){
        pet8res8="Algunas Veces"
        pet8val2= this.state.peticion8[1].algunasveces
      } 
      else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiNunca"){
        pet8res9="Casi Nunca"
        pet8val2= this.state.peticion8[2].casinunca
      } 
      else if(this.state.peticion8[2].Respuestas=="Nunca"){
        pet8res10="Nunca"
        pet8val2= this.state.peticion8[1].nunca
      } 
  
      if(this.state.peticion8[3].Respuestas=="Siempre"){
        pet8res11="Siempre"
        pet8val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion8[3].Respuestas=="CasiSiempre"){
          pet8res12="Casi Siempre"
          pet8val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion8[3].Respuestas=="AlgunasVeces"){
          pet8res13="Algunas Veces"
          pet8val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion8[3].Respuestas=="CasiNunca"){
          pet8res14="Casi Nunca"
          pet8val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion8[3].Respuestas=="Nunca"){
          pet8res15="Nunca"
          pet8val3= this.state.getPonderacion[2].nunca
        } 
  
  
      if(this.state.peticion8[4].Respuestas=="Siempre"){
        pet8res16="Siempre"
        pet8val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion8[4].Respuestas=="CasiSiempre"){
          pet8res17="Casi Siempre"
          pet8val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion8[4].Respuestas=="AlgunasVeces"){
          pet8res18="Algunas Veces"
          pet8val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion8[4].Respuestas=="CasiNunca"){
          pet8res19="Casi Nunca"
          pet8val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion8[4].Respuestas=="Nunca"){
          pet8res20="Nunca"
          pet8val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion8[5].Respuestas=="Siempre"){
        pet8res21="Siempre"
        pet8val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion8[5].Respuestas=="CasiSiempre"){
          pet8res22="Casi Siempre"
          pet8val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion8[5].Respuestas=="AlgunasVeces"){
          pet8res23="Algunas Veces"
          pet8val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion8[5].Respuestas=="CasiNunca"){
          pet8res24="Casi Nunca"
          pet8val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion8[5].Respuestas=="Nunca"){
          pet8res25="Nunca"
          pet8val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion8[6].Respuestas=="Siempre"){
          pet8res26="Siempre"
          pet8val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion8[6].Respuestas=="CasiSiempre"){
            pet8res27="Casi Siempre"
            pet8val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion8[6].Respuestas=="AlgunasVeces"){
            pet8res28="Algunas Veces"
            pet8val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion8[6].Respuestas=="CasiNunca"){
            pet8res29="Casi Nunca"
            pet8val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion8[6].Respuestas=="Nunca"){
            pet8res30="Nunca"
            pet8val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion8[7].Respuestas=="Siempre"){
          pet8res31="Siempre"
          pet8val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion8[7].Respuestas=="CasiSiempre"){
            pet8res32="Casi Siempre"
            pet8val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion8[7].Respuestas=="AlgunasVeces"){
            pet8res33="Algunas Veces"
            pet8val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion8[7].Respuestas=="CasiNunca"){
            pet8res34="Casi Nunca"
            pet8val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion8[7].Respuestas=="Nunca"){
            pet8res35="Nunca"
            pet8val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion8[8].Respuestas=="Siempre"){
            pet8res36="Siempre"
            pet8val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion8[8].Respuestas=="CasiSiempre"){
              pet8res37="Casi Siempre"
              pet8val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion8[8].Respuestas=="AlgunasVeces"){
              pet8res38="Algunas Veces"
              pet8val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion8[8].Respuestas=="CasiNunca"){
              pet8res39="Casi Nunca"
              pet8val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion8[8].Respuestas=="Nunca"){
              pet8res40="Nunca"
              pet8val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion8[9].Respuestas=="Siempre"){
            pet8res41="Siempre"
            pet8val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion8[9].Respuestas=="CasiSiempre"){
              pet8res42="Casi Siempre"
              pet8val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion8[9].Respuestas=="AlgunasVeces"){
              pet8res43="Algunas Veces"
              pet8val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion8[9].Respuestas=="CasiNunca"){
              pet8res44="Casi Nunca"
              pet8val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion8[9].Respuestas=="Nunca"){
              pet8res45="Nunca"
              pet8val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion8[10].Respuestas=="Siempre"){
          pet8res46="Siempre"
          pet8val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion8[10].Respuestas=="CasiSiempre"){
            pet8res47="Casi Siempre"
            pet8val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion8[10].Respuestas=="AlgunasVeces"){
            pet8res48="Algunas Veces"
            pet8val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion8[10].Respuestas=="CasiNunca"){
            pet8res49="Casi Nunca"
            pet8val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion8[10].Respuestas=="Nunca"){
            pet8res50="Nunca"
            pet8val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion8[11].Respuestas=="Siempre"){
          pet8res51="Siempre"
          pet8val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion8[11].Respuestas=="CasiSiempre"){
            pet8res52="Casi Siempre"
            pet8val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion8[11].Respuestas=="AlgunasVeces"){
            pet8res53="Algunas Veces"
            pet8val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion8[11].Respuestas=="CasiNunca"){
            pet8res54="Casi Nunca"
            pet8val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion8[11].Respuestas=="Nunca"){
            pet8res55="Nunca"
            pet8val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion8[12].Respuestas=="Siempre"){
          pet8res56="Siempre"
          pet8val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion8[12].Respuestas=="CasiSiempre"){
            pet8res57="Casi Siempre"
            pet8val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion8[12].Respuestas=="AlgunasVeces"){
            pet8res58="Algunas Veces"
            pet8val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion8[12].Respuestas=="CasiNunca"){
            pet8res59="Casi Nunca"
            pet8val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion8[12].Respuestas=="Nunca"){
            pet8res60="Nunca"
            pet8val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion8[13].Respuestas=="Siempre"){
          pet8res61="Siempre"
          pet8val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion8[13].Respuestas=="CasiSiempre"){
            pet8res62="Casi Siempre"
            pet8val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion8[13].Respuestas=="AlgunasVeces"){
            pet8res63="Algunas Veces"
            pet8val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion8[13].Respuestas=="CasiNunca"){
            pet8res64="Casi Nunca"
            pet8val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion8[13].Respuestas=="Nunca"){
            pet8res65="Nunca"
            pet8val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion8[14].Respuestas=="Siempre"){
          pet8res66="Siempre"
          pet8val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion8[14].Respuestas=="CasiSiempre"){
            pet8res67="Casi Siempre"
            pet8val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion8[14].Respuestas=="AlgunasVeces"){
            pet8res68="Algunas Veces"
            pet8val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion8[14].Respuestas=="CasiNunca"){
            pet8res69="Casi Nunca"
            pet8val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion8[14].Respuestas=="Nunca"){
            pet8res70="Nunca"
            pet8val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion8[15].Respuestas=="Siempre"){
          pet8res71="Siempre"
          pet8val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion8[15].Respuestas=="CasiSiempre"){
            pet8res72="Casi Siempre"
            pet8val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion8[15].Respuestas=="AlgunasVeces"){
            pet8res73="Algunas Veces"
            pet8val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion8[15].Respuestas=="CasiNunca"){
            pet8res74="Casi Nunca"
            pet8val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion8[15].Respuestas=="Nunca"){
            pet8res75="Nunca"
            pet8val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion8[16].Respuestas=="Siempre"){
          pet8res76="Siempre"
          pet8val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion8[16].Respuestas=="CasiSiempre"){
            pet8res77="Casi Siempre"
            pet8val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion8[16].Respuestas=="AlgunasVeces"){
            pet8res78="Algunas Veces"
            pet8val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion8[16].Respuestas=="CasiNunca"){
            pet8res79="Casi Nunca"
            pet8val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion8[16].Respuestas=="Nunca"){
            pet8res80="Nunca"
            pet8val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion8[17].Respuestas=="Siempre"){
          pet8res81="Siempre"
          pet8val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion8[17].Respuestas=="CasiSiempre"){
            pet8res82="Casi Siempre"
            pet8val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion8[17].Respuestas=="AlgunasVeces"){
            pet8res83="Algunas Veces"
            pet8val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion8[17].Respuestas=="CasiNunca"){
            pet8res84="Casi Nunca"
            pet8val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion8[17].Respuestas=="Nunca"){
            pet8res85="Nunca"
            pet8val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion8[18].Respuestas=="Siempre"){
          pet8res86="Siempre"
          pet8val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion8[18].Respuestas=="CasiSiempre"){
            pet8res87="Casi Siempre"
            pet8val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion8[18].Respuestas=="AlgunasVeces"){
            pet8res88="Algunas Veces"
            pet8val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion8[18].Respuestas=="CasiNunca"){
            pet8res89="Casi Nunca"
            pet8val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion8[18].Respuestas=="Nunca"){
            pet8res90="Nunca"
            pet8val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion8[19].Respuestas=="Siempre"){
          pet8res91="Siempre"
          pet8val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion8[19].Respuestas=="CasiSiempre"){
            pet8res92="Casi Siempre"
            pet8val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion8[19].Respuestas=="AlgunasVeces"){
            pet8res93="Algunas Veces"
            pet8val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion8[19].Respuestas=="CasiNunca"){
            pet8res94="Casi Nunca"
            pet8val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion8[19].Respuestas=="Nunca"){
            pet8res95="Nunca"
            pet8val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion8[20].Respuestas=="Siempre"){
          pet8res96="Siempre"
          pet8val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion8[20].Respuestas=="CasiSiempre"){
            pet8res97="Casi Siempre"
            pet8val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion8[20].Respuestas=="AlgunasVeces"){
            pet8res98="Algunas Veces"
            pet8val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion8[20].Respuestas=="CasiNunca"){
            pet8res99="Casi Nunca"
            pet8val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion8[20].Respuestas=="Nunca"){
            pet8res100="Nunca"
            pet8val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion8[21].Respuestas=="Siempre"){
          pet8res101="Siempre"
          pet8val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion8[21].Respuestas=="CasiSiempre"){
            pet8res102="Casi Siempre"
            pet8val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion8[21].Respuestas=="AlgunasVeces"){
            pet8res103="Algunas Veces"
            pet8val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion8[21].Respuestas=="CasiNunca"){
            pet8res104="Casi Nunca"
            pet8val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion8[21].Respuestas=="Nunca"){
            pet8res105="Nunca"
            pet8val21= this.state.getPonderacion[20].nunca
          } 
  
        if(this.state.peticion8[22].Respuestas=="Siempre"){
          pet8res106="Siempre"
          pet8val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion8[22].Respuestas=="CasiSiempre"){
            pet8res107="Casi Siempre"
            pet8val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion8[22].Respuestas=="AlgunasVeces"){
            pet8res108="Algunas Veces"
            pet8val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion8[2].Respuestas=="CasiNunca"){
            pet8res109="Casi Nunca"
            pet8val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion8[22].Respuestas=="Nunca"){
            pet8res110="Nunca"
            pet8val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion8[23].Respuestas=="Siempre"){
          pet8res111="Siempre"
          pet8val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion8[23].Respuestas=="CasiSiempre"){
            pet8res112="Casi Siempre"
            pet8val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion8[23].Respuestas=="AlgunasVeces"){
            pet8res113="Algunas Veces"
            pet8val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion8[23].Respuestas=="CasiNunca"){
            pet8res114="Casi Nunca"
            pet8val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion8[23].Respuestas=="Nunca"){
            pet8res115="Nunca"
            pet8val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion8[24].Respuestas=="Siempre"){
          pet8res116="Siempre"
          pet8val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion8[24].Respuestas=="CasiSiempre"){
            pet8res117="Casi Siempre"
            pet8val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion8[24].Respuestas=="AlgunasVeces"){
            pet8res118="Algunas Veces"
            pet8val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion8[24].Respuestas=="CasiNunca"){
            pet8res119="Casi Nunca"
            pet8val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion8[24].Respuestas=="Nunca"){
            pet8res120="Nunca"
            pet8val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion8[25].Respuestas=="Siempre"){
          pet8res121="Siempre"
          pet8val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion8[25].Respuestas=="CasiSiempre"){
            pet8res122="Casi Siempre"
            pet8val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion8[25].Respuestas=="AlgunasVeces"){
            pet8res123="Algunas Veces"
            pet8val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion8[25].Respuestas=="CasiNunca"){
            pet8res124="Casi Nunca"
            pet8val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion8[25].Respuestas=="Nunca"){
            pet8res125="Nunca"
            pet8val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion8[26].Respuestas=="Siempre"){
          pet8res126="Siempre"
          pet8val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion8[26].Respuestas=="CasiSiempre"){
            pet8res127="Casi Siempre"
            pet8val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion8[26].Respuestas=="AlgunasVeces"){
            pet8res128="Algunas Veces"
            pet8val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion8[26].Respuestas=="CasiNunca"){
            pet8res129="Casi Nunca"
            pet8val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion8[26].Respuestas=="Nunca"){
            pet8res130="Nunca"
            pet8val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion8[27].Respuestas=="Siempre"){
          pet8res131="Siempre"
          pet8val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion8[27].Respuestas=="CasiSiempre"){
            pet8res132="Casi Siempre"
            pet8val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion8[27].Respuestas=="AlgunasVeces"){
            pet8res133="Algunas Veces"
            pet8val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion8[27].Respuestas=="CasiNunca"){
            pet8res134="Casi Nunca"
            pet8val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion8[27].Respuestas=="Nunca"){
            pet8res135="Nunca"
            pet8val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion8[28].Respuestas=="Siempre"){
        pet8res136="Siempre"
        pet8val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion8[28].Respuestas=="CasiSiempre"){
          pet8res137="Casi Siempre"
          pet8val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion8[28].Respuestas=="AlgunasVeces"){
          pet8res138="Algunas Veces"
          pet8val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion8[28].Respuestas=="CasiNunca"){
          pet8res139="Casi Nunca"
          pet8val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion8[28].Respuestas=="Nunca"){
          pet8res140="Nunca"
          pet8val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion8[29].Respuestas=="Siempre"){
        pet8res141="Siempre"
        pet8val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion8[29].Respuestas=="CasiSiempre"){
          pet8res142="Casi Siempre"
          pet8val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion8[29].Respuestas=="AlgunasVeces"){
          pet8res143="Algunas Veces"
          pet8val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion8[29].Respuestas=="CasiNunca"){
          pet8res144="Casi Nunca"
          pet8val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion8[29].Respuestas=="Nunca"){
          pet8res145="Nunca"
          pet8val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion8[30].Respuestas=="Siempre"){
        pet8res146="Siempre"
        pet8val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion8[30].Respuestas=="CasiSiempre"){
          pet8res147="Casi Siempre"
          pet8val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion8[30].Respuestas=="AlgunasVeces"){
          pet8res148="Algunas Veces"
          pet8val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion8[30].Respuestas=="CasiNunca"){
          pet8res149="Casi Nunca"
          pet8val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion8[30].Respuestas=="Nunca"){
          pet8res150="Nunca"
          pet8val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion8[31].Respuestas=="Siempre"){
        pet8res151="Siempre"
        pet8val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion8[31].Respuestas=="CasiSiempre"){
          pet8res152="Casi Siempre"
          pet8val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion8[31].Respuestas=="AlgunasVeces"){
          pet8res153="Algunas Veces"
          pet8val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion8[31].Respuestas=="CasiNunca"){
          pet8res154="Casi Nunca"
          pet8val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion8[31].Respuestas=="Nunca"){
          pet8res155="Nunca"
          pet8val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion8[32].Respuestas=="Siempre"){
        pet8res156="Siempre"
        pet8val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion8[32].Respuestas=="CasiSiempre"){
          pet8res157="Casi Siempre"
          pet8val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion8[32].Respuestas=="AlgunasVeces"){
          pet8res158="Algunas Veces"
          pet8val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion8[32].Respuestas=="CasiNunca"){
          pet8res159="Casi Nunca"
          pet8val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion8[32].Respuestas=="Nunca"){
          pet8res160="Nunca"
          pet8val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion8[33].Respuestas=="Siempre"){
          pet8res161="Siempre"
          pet8val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion8[33].Respuestas=="CasiSiempre"){
            pet8res162="Casi Siempre"
            pet8val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion8[33].Respuestas=="AlgunasVeces"){
            pet8res163="Algunas Veces"
            pet8val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion8[33].Respuestas=="CasiNunca"){
            pet8res164="Casi Nunca"
            pet8val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion8[33].Respuestas=="Nunca"){
            pet8res165="Nunca"
            pet8val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion8[34].Respuestas=="Siempre"){
          pet8res166="Siempre"
          pet8val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion8[34].Respuestas=="CasiSiempre"){
            pet8res167="Casi Siempre"
            pet8val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion8[34].Respuestas=="AlgunasVeces"){
            pet8res168="Algunas Veces"
            pet8val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion8[34].Respuestas=="CasiNunca"){
            pet8res169="Casi Nunca"
            pet8val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion8[34].Respuestas=="Nunca"){
            pet8res170="Nunca"
            pet8val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion8[35].Respuestas=="Siempre"){
            pet8res171="Siempre"
            pet8val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion8[35].Respuestas=="CasiSiempre"){
              pet8res172="Casi Siempre"
              pet8val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion8[35].Respuestas=="AlgunasVeces"){
              pet8res173="Algunas Veces"
              pet8val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion8[35].Respuestas=="CasiNunca"){
              pet8res174="Casi Nunca"
              pet8val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion8[15].Respuestas=="Nunca"){
              pet8res175="Nunca"
              pet8val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion8[36].Respuestas=="Siempre"){
            pet8res176="Siempre"
            pet8val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion8[36].Respuestas=="CasiSiempre"){
              pet8res177="Casi Siempre"
              pet8val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion8[36].Respuestas=="AlgunasVeces"){
              pet8res178="Algunas Veces"
              pet8val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion8[36].Respuestas=="CasiNunca"){
              pet8res179="Casi Nunca"
              pet8val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion8[36].Respuestas=="Nunca"){
              pet8res180="Nunca"
              pet8val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion8[37].Respuestas=="Siempre"){
            pet8res181="Siempre"
            pet8val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion8[37].Respuestas=="CasiSiempre"){
              pet8res182="Casi Siempre"
              pet8val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion8[37].Respuestas=="AlgunasVeces"){
              pet8res183="Algunas Veces"
              pet8val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion8[37].Respuestas=="CasiNunca"){
              pet8res184="Casi Nunca"
              pet8val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion8[37].Respuestas=="Nunca"){
              pet8res185="Nunca"
              pet8val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion8[38].Respuestas=="Siempre"){
            pet8res186="Siempre"
            pet8val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion8[38].Respuestas=="CasiSiempre"){
              pet8res187="Casi Siempre"
              pet8val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion8[38].Respuestas=="AlgunasVeces"){
              pet8res188="Algunas Veces"
              pet8val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion8[38].Respuestas=="CasiNunca"){
              pet8res189="Casi Nunca"
              pet8val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion8[38].Respuestas=="Nunca"){
              pet8res190="Nunca"
              pet8val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion8[39].Respuestas=="Siempre"){
              pet8res191="Siempre"
              pet8val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion8[39].Respuestas=="CasiSiempre"){
                pet8res192="Casi Siempre"
                pet8val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion8[39].Respuestas=="AlgunasVeces"){
                pet8res193="Algunas Veces"
                pet8val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion8[39].Respuestas=="CasiNunca"){
                pet8res194="Casi Nunca"
                pet8val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion8[39].Respuestas=="Nunca"){
                pet8res195="Nunca"
                pet8val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion8[40].Respuestas=="Siempre"){
                pet8res196="Siempre"
                pet8val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion8[40].Respuestas=="CasiSiempre"){
                  pet8res197="Casi Siempre"
                  pet8val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion8[40].Respuestas=="AlgunasVeces"){
                  pet8res198="Algunas Veces"
                  pet8val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion8[40].Respuestas=="CasiNunca"){
                  pet8res199="Casi Nunca"
                  pet8val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion8[40].Respuestas=="Nunca"){
                  pet8res200="Nunca"
                  pet8val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion8[42].Respuestas=="Siempre"){
                pet8res201="Siempre"
                pet8val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion8[42].Respuestas=="CasiSiempre"){
                pet8res202="Casi Siempre"
                pet8val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion8[42].Respuestas=="AlgunasVeces"){
                pet8res203="Algunas Veces"
                pet8val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion8[42].Respuestas=="CasiNunca"){
                pet8res204="Casi Nunca"
                pet8val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion8[42].Respuestas=="Nunca"){
                pet8res205="Nunca"
                pet8val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion8[43].Respuestas=="Siempre"){
              pet8res206="Siempre"
              pet8val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion8[43].Respuestas=="CasiSiempre"){
              pet8res207="Casi Siempre"
              pet8val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion8[43].Respuestas=="AlgunasVeces"){
              pet8res208="Algunas Veces"
              pet8val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion8[43].Respuestas=="CasiNunca"){
              pet8res209="Casi Nunca"
              pet8val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion8[43].Respuestas=="Nunca"){
              pet8res210="Nunca"
              pet8val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion8[44].Respuestas=="Siempre"){
            pet8res211="Siempre"
            pet8val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion8[44].Respuestas=="CasiSiempre"){
            pet8res212="Casi Siempre"
            pet8val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion8[44].Respuestas=="AlgunasVeces"){
            pet8res213="Algunas Veces"
            pet8val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion8[44].Respuestas=="CasiNunca"){
            pet8res214="Casi Nunca"
            pet8val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion8[44].Respuestas=="Nunca"){
            pet8res215="Nunca"
            pet8val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion8[46].Respuestas=="Siempre"){
          pet8res216="Siempre"
          pet8val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion8[46].Respuestas=="CasiSiempre"){
          pet8res217="Casi Siempre"
          pet8val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion8[46].Respuestas=="AlgunasVeces"){
          pet8res218="Algunas Veces"
          pet8val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion8[46].Respuestas=="CasiNunca"){
          pet8res219="Casi Nunca"
          pet8val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion8[46].Respuestas=="Nunca"){
          pet8res220="Nunca"
          pet8val44= this.state.getPonderacion[43].nunca
        }
  
      if(this.state.peticion8[47].Respuestas=="Siempre"){
        pet8res221="Siempre"
        pet8val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion8[47].Respuestas=="CasiSiempre"){
        pet8res222="Casi Siempre"
        pet8val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion8[47].Respuestas=="AlgunasVeces"){
        pet8res223="Algunas Veces"
        pet8val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion8[47].Respuestas=="CasiNunca"){
        pet8res224="Casi Nunca"
        pet8val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion8[47].Respuestas=="Nunca"){
        pet8res225="Nunca"
        pet8val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion8[48].Respuestas=="Siempre"){
        pet8res226="Siempre"
        pet8val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion8[48].Respuestas=="CasiSiempre"){
        pet8res227="Casi Siempre"
        pet8val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion8[48].Respuestas=="AlgunasVeces"){
        pet8res228="Algunas Veces"
        pet8val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion8[48].Respuestas=="CasiNunca"){
        pet8res229="Casi Nunca"
        pet8val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion8[48].Respuestas=="Nunca"){
        pet8res230="Nunca"
        pet8val46= this.state.getPonderacion[45].nunca
      }
   } 
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////////////////////////////////////////////////////////////////////////////////

  if(this.state.peticion9.length>0){

    if(this.state.peticion9[1].Respuestas=="Siempre"){
      pet9res1="Siempre"
      pet9val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion9[1].Respuestas=="CasiSiempre"){
        pet9res2="Casi Siempre"
        pet9val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion9[1].Respuestas=="AlgunasVeces"){
        pet9res3="Algunas Veces"
        pet9val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion9[1].Respuestas=="CasiNunca"){
        pet9res4="Casi Nunca"
        pet9val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion9[1].Respuestas=="Nunca"){
        pet9res5="Nunca"
        pet9val1= this.state.getPonderacion[0].nunca
      } 
  
  
    if(this.state.peticion9[2].Respuestas=="Siempre"){
      pet9res6="Siempre"
      pet9val2= this.state.peticion9[1].siempre
      }else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiSiempre"){
        pet9res7="Casi Siempre"
        pet9val2= this.state.peticion9[1].casisiempre
      }
      else if(this.state.resultadosEvaluacion[2].Respuestas=="AlgunasVeces"){
        pet9res8="Algunas Veces"
        pet9val2= this.state.peticion9[1].algunasveces
      } 
      else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiNunca"){
        pet9res9="Casi Nunca"
        pet9val2= this.state.peticion9[2].casinunca
      } 
      else if(this.state.peticion9[2].Respuestas=="Nunca"){
        pet9res10="Nunca"
        pet9val2= this.state.peticion9[1].nunca
      } 
  
      if(this.state.peticion9[3].Respuestas=="Siempre"){
        pet9res11="Siempre"
        pet9val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion9[3].Respuestas=="CasiSiempre"){
          pet9res12="Casi Siempre"
          pet9val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion9[3].Respuestas=="AlgunasVeces"){
          pet9res13="Algunas Veces"
          pet9val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion9[3].Respuestas=="CasiNunca"){
          pet9res14="Casi Nunca"
          pet9val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion9[3].Respuestas=="Nunca"){
          pet9res15="Nunca"
          pet9val3= this.state.getPonderacion[2].nunca
        } 
  
  
      if(this.state.peticion9[4].Respuestas=="Siempre"){
        pet9res16="Siempre"
        pet9val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion9[4].Respuestas=="CasiSiempre"){
          pet9res17="Casi Siempre"
          pet9val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion9[4].Respuestas=="AlgunasVeces"){
          pet9res18="Algunas Veces"
          pet9val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion9[4].Respuestas=="CasiNunca"){
          pet9res19="Casi Nunca"
          pet9val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion9[4].Respuestas=="Nunca"){
          pet9res20="Nunca"
          pet9val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion9[5].Respuestas=="Siempre"){
        pet9res21="Siempre"
        pet9val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion9[5].Respuestas=="CasiSiempre"){
          pet9res22="Casi Siempre"
          pet9val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion9[5].Respuestas=="AlgunasVeces"){
          pet9res23="Algunas Veces"
          pet9val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion9[5].Respuestas=="CasiNunca"){
          pet9res24="Casi Nunca"
          pet9val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion9[5].Respuestas=="Nunca"){
          pet9res25="Nunca"
          pet9val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion9[6].Respuestas=="Siempre"){
          pet9res26="Siempre"
          pet9val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion9[6].Respuestas=="CasiSiempre"){
            pet9res27="Casi Siempre"
            pet9val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion9[6].Respuestas=="AlgunasVeces"){
            pet9res28="Algunas Veces"
            pet9val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion9[6].Respuestas=="CasiNunca"){
            pet9res29="Casi Nunca"
            pet9val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion9[6].Respuestas=="Nunca"){
            pet9res30="Nunca"
            pet9val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion9[7].Respuestas=="Siempre"){
          pet9res31="Siempre"
          pet9val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion9[7].Respuestas=="CasiSiempre"){
            pet9res32="Casi Siempre"
            pet9val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion9[7].Respuestas=="AlgunasVeces"){
            pet9res33="Algunas Veces"
            pet9val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion9[7].Respuestas=="CasiNunca"){
            pet9res34="Casi Nunca"
            pet9val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion9[7].Respuestas=="Nunca"){
            pet9res35="Nunca"
            pet9val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion9[8].Respuestas=="Siempre"){
            pet9res36="Siempre"
            pet9val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion9[8].Respuestas=="CasiSiempre"){
              pet9res37="Casi Siempre"
              pet9val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion9[8].Respuestas=="AlgunasVeces"){
              pet9res38="Algunas Veces"
              pet9val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion9[8].Respuestas=="CasiNunca"){
              pet9res39="Casi Nunca"
              pet9val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion9[8].Respuestas=="Nunca"){
              pet9res40="Nunca"
              pet9val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion9[9].Respuestas=="Siempre"){
            pet9res41="Siempre"
            pet9val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion9[9].Respuestas=="CasiSiempre"){
              pet9res42="Casi Siempre"
              pet9val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion9[9].Respuestas=="AlgunasVeces"){
              pet9res43="Algunas Veces"
              pet9val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion9[9].Respuestas=="CasiNunca"){
              pet9res44="Casi Nunca"
              pet9val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion9[9].Respuestas=="Nunca"){
              pet9res45="Nunca"
              pet9val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion9[10].Respuestas=="Siempre"){
          pet9res46="Siempre"
          pet9val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion9[10].Respuestas=="CasiSiempre"){
            pet9res47="Casi Siempre"
            pet9val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion9[10].Respuestas=="AlgunasVeces"){
            pet9res48="Algunas Veces"
            pet9val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion9[10].Respuestas=="CasiNunca"){
            pet9res49="Casi Nunca"
            pet9val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion9[10].Respuestas=="Nunca"){
            pet9res50="Nunca"
            pet9val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion9[11].Respuestas=="Siempre"){
          pet9res51="Siempre"
          pet9val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion9[11].Respuestas=="CasiSiempre"){
            pet9res52="Casi Siempre"
            pet9val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion9[11].Respuestas=="AlgunasVeces"){
            pet9res53="Algunas Veces"
            pet9val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion9[11].Respuestas=="CasiNunca"){
            pet9res54="Casi Nunca"
            pet9val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion9[11].Respuestas=="Nunca"){
            pet9res55="Nunca"
            pet9val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion9[12].Respuestas=="Siempre"){
          pet9res56="Siempre"
          pet9val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion9[12].Respuestas=="CasiSiempre"){
            pet9res57="Casi Siempre"
            pet9val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion9[12].Respuestas=="AlgunasVeces"){
            pet9res58="Algunas Veces"
            pet9val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion9[12].Respuestas=="CasiNunca"){
            pet9res59="Casi Nunca"
            pet9val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion9[12].Respuestas=="Nunca"){
            pet9res60="Nunca"
            pet9val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion9[13].Respuestas=="Siempre"){
          pet9res61="Siempre"
          pet9val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion9[13].Respuestas=="CasiSiempre"){
            pet9res62="Casi Siempre"
            pet9val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion9[13].Respuestas=="AlgunasVeces"){
            pet9res63="Algunas Veces"
            pet9val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion9[13].Respuestas=="CasiNunca"){
            pet9res64="Casi Nunca"
            pet9val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion9[13].Respuestas=="Nunca"){
            pet9res65="Nunca"
            pet9val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion9[14].Respuestas=="Siempre"){
          pet9res66="Siempre"
          pet9val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion9[14].Respuestas=="CasiSiempre"){
            pet9res67="Casi Siempre"
            pet9val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion9[14].Respuestas=="AlgunasVeces"){
            pet9res68="Algunas Veces"
            pet9val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion9[14].Respuestas=="CasiNunca"){
            pet9res69="Casi Nunca"
            pet9val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion9[14].Respuestas=="Nunca"){
            pet9res70="Nunca"
            pet9val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion9[15].Respuestas=="Siempre"){
          pet9res71="Siempre"
          pet9val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion9[15].Respuestas=="CasiSiempre"){
            pet9res72="Casi Siempre"
            pet9val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion9[15].Respuestas=="AlgunasVeces"){
            pet9res73="Algunas Veces"
            pet9val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion9[15].Respuestas=="CasiNunca"){
            pet9res74="Casi Nunca"
            pet9val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion9[15].Respuestas=="Nunca"){
            pet9res75="Nunca"
            pet9val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion9[16].Respuestas=="Siempre"){
          pet9res76="Siempre"
          pet9val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion9[16].Respuestas=="CasiSiempre"){
            pet9res77="Casi Siempre"
            pet9val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion9[16].Respuestas=="AlgunasVeces"){
            pet9res78="Algunas Veces"
            pet9val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion9[16].Respuestas=="CasiNunca"){
            pet9res79="Casi Nunca"
            pet9val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion9[16].Respuestas=="Nunca"){
            pet9res80="Nunca"
            pet9val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion9[17].Respuestas=="Siempre"){
          pet9res81="Siempre"
          pet9val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion9[17].Respuestas=="CasiSiempre"){
            pet9res82="Casi Siempre"
            pet9val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion9[17].Respuestas=="AlgunasVeces"){
            pet9res83="Algunas Veces"
            pet9val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion9[17].Respuestas=="CasiNunca"){
            pet9res84="Casi Nunca"
            pet9val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion9[17].Respuestas=="Nunca"){
            pet9res85="Nunca"
            pet9val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion9[18].Respuestas=="Siempre"){
          pet9res86="Siempre"
          pet9val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion9[18].Respuestas=="CasiSiempre"){
            pet9res87="Casi Siempre"
            pet9val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion9[18].Respuestas=="AlgunasVeces"){
            pet9res88="Algunas Veces"
            pet9val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion9[18].Respuestas=="CasiNunca"){
            pet9res89="Casi Nunca"
            pet9val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion9[18].Respuestas=="Nunca"){
            pet9res90="Nunca"
            pet9val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion9[19].Respuestas=="Siempre"){
          pet9res91="Siempre"
          pet9val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion9[19].Respuestas=="CasiSiempre"){
            pet9res92="Casi Siempre"
            pet9val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion9[19].Respuestas=="AlgunasVeces"){
            pet9res93="Algunas Veces"
            pet9val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion9[19].Respuestas=="CasiNunca"){
            pet9res94="Casi Nunca"
            pet9val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion9[19].Respuestas=="Nunca"){
            pet9res95="Nunca"
            pet9val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion9[20].Respuestas=="Siempre"){
          pet9res96="Siempre"
          pet9val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion9[20].Respuestas=="CasiSiempre"){
            pet9res97="Casi Siempre"
            pet9val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion9[20].Respuestas=="AlgunasVeces"){
            pet9res98="Algunas Veces"
            pet9val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion9[20].Respuestas=="CasiNunca"){
            pet9res99="Casi Nunca"
            pet9val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion9[20].Respuestas=="Nunca"){
            pet9res100="Nunca"
            pet9val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion9[21].Respuestas=="Siempre"){
          pet9res101="Siempre"
          pet9val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion9[21].Respuestas=="CasiSiempre"){
            pet9res102="Casi Siempre"
            pet9val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion9[21].Respuestas=="AlgunasVeces"){
            pet9res103="Algunas Veces"
            pet9val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion9[21].Respuestas=="CasiNunca"){
            pet9res104="Casi Nunca"
            pet9val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion9[21].Respuestas=="Nunca"){
            pet9res105="Nunca"
            pet9val21= this.state.getPonderacion[20].nunca
          } 
  
        if(this.state.peticion9[22].Respuestas=="Siempre"){
          pet9res106="Siempre"
          pet9val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion9[22].Respuestas=="CasiSiempre"){
            pet9res107="Casi Siempre"
            pet9val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion9[22].Respuestas=="AlgunasVeces"){
            pet9res108="Algunas Veces"
            pet9val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion9[2].Respuestas=="CasiNunca"){
            pet9res109="Casi Nunca"
            pet9val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion9[22].Respuestas=="Nunca"){
            pet9res110="Nunca"
            pet9val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion9[23].Respuestas=="Siempre"){
          pet9res111="Siempre"
          pet9val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion9[23].Respuestas=="CasiSiempre"){
            pet9res112="Casi Siempre"
            pet9val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion9[23].Respuestas=="AlgunasVeces"){
            pet9res113="Algunas Veces"
            pet9val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion9[23].Respuestas=="CasiNunca"){
            pet9res114="Casi Nunca"
            pet9val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion9[23].Respuestas=="Nunca"){
            pet9res115="Nunca"
            pet9val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion9[24].Respuestas=="Siempre"){
          pet9res116="Siempre"
          pet9val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion9[24].Respuestas=="CasiSiempre"){
            pet9res117="Casi Siempre"
            pet9val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion9[24].Respuestas=="AlgunasVeces"){
            pet9res118="Algunas Veces"
            pet9val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion9[24].Respuestas=="CasiNunca"){
            pet9res119="Casi Nunca"
            pet9val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion9[24].Respuestas=="Nunca"){
            pet9res120="Nunca"
            pet9val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion9[25].Respuestas=="Siempre"){
          pet9res121="Siempre"
          pet9val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion9[25].Respuestas=="CasiSiempre"){
            pet9res122="Casi Siempre"
            pet9val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion9[25].Respuestas=="AlgunasVeces"){
            pet9res123="Algunas Veces"
            pet9val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion9[25].Respuestas=="CasiNunca"){
            pet9res124="Casi Nunca"
            pet9val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion9[25].Respuestas=="Nunca"){
            pet9res125="Nunca"
            pet9val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion9[26].Respuestas=="Siempre"){
          pet9res126="Siempre"
          pet9val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion9[26].Respuestas=="CasiSiempre"){
            pet9res127="Casi Siempre"
            pet9val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion9[26].Respuestas=="AlgunasVeces"){
            pet9res128="Algunas Veces"
            pet9val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion9[26].Respuestas=="CasiNunca"){
            pet9res129="Casi Nunca"
            pet9val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion9[26].Respuestas=="Nunca"){
            pet9res130="Nunca"
            pet9val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion9[27].Respuestas=="Siempre"){
          pet9res131="Siempre"
          pet9val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion9[27].Respuestas=="CasiSiempre"){
            pet9res132="Casi Siempre"
            pet9val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion9[27].Respuestas=="AlgunasVeces"){
            pet9res133="Algunas Veces"
            pet9val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion9[27].Respuestas=="CasiNunca"){
            pet9res134="Casi Nunca"
            pet9val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion9[27].Respuestas=="Nunca"){
            pet9res135="Nunca"
            pet9val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion9[28].Respuestas=="Siempre"){
        pet9res136="Siempre"
        pet9val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion9[28].Respuestas=="CasiSiempre"){
          pet9res137="Casi Siempre"
          pet9val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion9[28].Respuestas=="AlgunasVeces"){
          pet9res138="Algunas Veces"
          pet9val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion9[28].Respuestas=="CasiNunca"){
          pet9res139="Casi Nunca"
          pet9val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion9[28].Respuestas=="Nunca"){
          pet9res140="Nunca"
          pet9val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion9[29].Respuestas=="Siempre"){
        pet9res141="Siempre"
        pet9val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion9[29].Respuestas=="CasiSiempre"){
          pet9res142="Casi Siempre"
          pet9val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion9[29].Respuestas=="AlgunasVeces"){
          pet9res143="Algunas Veces"
          pet9val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion9[29].Respuestas=="CasiNunca"){
          pet9res144="Casi Nunca"
          pet9val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion9[29].Respuestas=="Nunca"){
          pet9res145="Nunca"
          pet9val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion9[30].Respuestas=="Siempre"){
        pet9res146="Siempre"
        pet9val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion9[30].Respuestas=="CasiSiempre"){
          pet9res147="Casi Siempre"
          pet9val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion9[30].Respuestas=="AlgunasVeces"){
          pet9res148="Algunas Veces"
          pet9val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion9[30].Respuestas=="CasiNunca"){
          pet9res149="Casi Nunca"
          pet9val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion9[30].Respuestas=="Nunca"){
          pet9res150="Nunca"
          pet9val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion9[31].Respuestas=="Siempre"){
        pet9res151="Siempre"
        pet9val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion9[31].Respuestas=="CasiSiempre"){
          pet9res152="Casi Siempre"
          pet9val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion9[31].Respuestas=="AlgunasVeces"){
          pet9res153="Algunas Veces"
          pet9val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion9[31].Respuestas=="CasiNunca"){
          pet9res154="Casi Nunca"
          pet9val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion9[31].Respuestas=="Nunca"){
          pet9res155="Nunca"
          pet9val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion9[32].Respuestas=="Siempre"){
        pet9res156="Siempre"
        pet9val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion9[32].Respuestas=="CasiSiempre"){
          pet9res157="Casi Siempre"
          pet9val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion9[32].Respuestas=="AlgunasVeces"){
          pet9res158="Algunas Veces"
          pet9val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion9[32].Respuestas=="CasiNunca"){
          pet9res159="Casi Nunca"
          pet9val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion9[32].Respuestas=="Nunca"){
          pet9res160="Nunca"
          pet9val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion9[33].Respuestas=="Siempre"){
          pet9res161="Siempre"
          pet9val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion9[33].Respuestas=="CasiSiempre"){
            pet9res162="Casi Siempre"
            pet9val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion9[33].Respuestas=="AlgunasVeces"){
            pet9res163="Algunas Veces"
            pet9val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion9[33].Respuestas=="CasiNunca"){
            pet9res164="Casi Nunca"
            pet9val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion9[33].Respuestas=="Nunca"){
            pet9res165="Nunca"
            pet9val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion9[34].Respuestas=="Siempre"){
          pet9res166="Siempre"
          pet9val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion9[34].Respuestas=="CasiSiempre"){
            pet9res167="Casi Siempre"
            pet9val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion9[34].Respuestas=="AlgunasVeces"){
            pet9res168="Algunas Veces"
            pet9val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion9[34].Respuestas=="CasiNunca"){
            pet9res169="Casi Nunca"
            pet9val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion9[34].Respuestas=="Nunca"){
            pet9res170="Nunca"
            pet9val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion9[35].Respuestas=="Siempre"){
            pet9res171="Siempre"
            pet9val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion9[35].Respuestas=="CasiSiempre"){
              pet9res172="Casi Siempre"
              pet9val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion9[35].Respuestas=="AlgunasVeces"){
              pet9res173="Algunas Veces"
              pet9val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion9[35].Respuestas=="CasiNunca"){
              pet9res174="Casi Nunca"
              pet9val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion9[15].Respuestas=="Nunca"){
              pet9res175="Nunca"
              pet9val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion9[36].Respuestas=="Siempre"){
            pet9res176="Siempre"
            pet9val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion9[36].Respuestas=="CasiSiempre"){
              pet9res177="Casi Siempre"
              pet9val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion9[36].Respuestas=="AlgunasVeces"){
              pet9res178="Algunas Veces"
              pet9val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion9[36].Respuestas=="CasiNunca"){
              pet9res179="Casi Nunca"
              pet9val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion9[36].Respuestas=="Nunca"){
              pet9res180="Nunca"
              pet9val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion9[37].Respuestas=="Siempre"){
            pet9res181="Siempre"
            pet9val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion9[37].Respuestas=="CasiSiempre"){
              pet9res182="Casi Siempre"
              pet9val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion9[37].Respuestas=="AlgunasVeces"){
              pet9res183="Algunas Veces"
              pet9val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion9[37].Respuestas=="CasiNunca"){
              pet9res184="Casi Nunca"
              pet9val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion9[37].Respuestas=="Nunca"){
              pet9res185="Nunca"
              pet9val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion9[38].Respuestas=="Siempre"){
            pet9res186="Siempre"
            pet9val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion9[38].Respuestas=="CasiSiempre"){
              pet9res187="Casi Siempre"
              pet9val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion9[38].Respuestas=="AlgunasVeces"){
              pet9res188="Algunas Veces"
              pet9val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion9[38].Respuestas=="CasiNunca"){
              pet9res189="Casi Nunca"
              pet9val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion9[38].Respuestas=="Nunca"){
              pet9res190="Nunca"
              pet9val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion9[39].Respuestas=="Siempre"){
              pet9res191="Siempre"
              pet9val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion9[39].Respuestas=="CasiSiempre"){
                pet9res192="Casi Siempre"
                pet9val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion9[39].Respuestas=="AlgunasVeces"){
                pet9res193="Algunas Veces"
                pet9val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion9[39].Respuestas=="CasiNunca"){
                pet9res194="Casi Nunca"
                pet9val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion9[39].Respuestas=="Nunca"){
                pet9res195="Nunca"
                pet9val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion9[40].Respuestas=="Siempre"){
                pet9res196="Siempre"
                pet9val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion9[40].Respuestas=="CasiSiempre"){
                  pet9res197="Casi Siempre"
                  pet9val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion9[40].Respuestas=="AlgunasVeces"){
                  pet9res198="Algunas Veces"
                  pet9val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion9[40].Respuestas=="CasiNunca"){
                  pet9res199="Casi Nunca"
                  pet9val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion9[40].Respuestas=="Nunca"){
                  pet9res200="Nunca"
                  pet9val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion9[42].Respuestas=="Siempre"){
                pet9res201="Siempre"
                pet9val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion9[42].Respuestas=="CasiSiempre"){
                pet9res202="Casi Siempre"
                pet9val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion9[42].Respuestas=="AlgunasVeces"){
                pet9res203="Algunas Veces"
                pet9val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion9[42].Respuestas=="CasiNunca"){
                pet9res204="Casi Nunca"
                pet9val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion9[42].Respuestas=="Nunca"){
                pet9res205="Nunca"
                pet9val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion9[43].Respuestas=="Siempre"){
              pet9res206="Siempre"
              pet9val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion9[43].Respuestas=="CasiSiempre"){
              pet9res207="Casi Siempre"
              pet9val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion9[43].Respuestas=="AlgunasVeces"){
              pet9res208="Algunas Veces"
              pet9val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion9[43].Respuestas=="CasiNunca"){
              pet9res209="Casi Nunca"
              pet9val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion9[43].Respuestas=="Nunca"){
              pet9res210="Nunca"
              pet9val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion9[44].Respuestas=="Siempre"){
            pet9res211="Siempre"
            pet9val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion9[44].Respuestas=="CasiSiempre"){
            pet9res212="Casi Siempre"
            pet9val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion9[44].Respuestas=="AlgunasVeces"){
            pet9res213="Algunas Veces"
            pet9val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion9[44].Respuestas=="CasiNunca"){
            pet9res214="Casi Nunca"
            pet9val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion9[44].Respuestas=="Nunca"){
            pet9res215="Nunca"
            pet9val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion9[46].Respuestas=="Siempre"){
          pet9res216="Siempre"
          pet9val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion9[46].Respuestas=="CasiSiempre"){
          pet9res217="Casi Siempre"
          pet9val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion9[46].Respuestas=="AlgunasVeces"){
          pet9res218="Algunas Veces"
          pet9val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion9[46].Respuestas=="CasiNunca"){
          pet9res219="Casi Nunca"
          pet9val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion9[46].Respuestas=="Nunca"){
          pet9res220="Nunca"
          pet9val44= this.state.getPonderacion[43].nunca
        }
  
      if(this.state.peticion9[47].Respuestas=="Siempre"){
        pet9res221="Siempre"
        pet9val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion9[47].Respuestas=="CasiSiempre"){
        pet9res222="Casi Siempre"
        pet9val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion9[47].Respuestas=="AlgunasVeces"){
        pet9res223="Algunas Veces"
        pet9val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion9[47].Respuestas=="CasiNunca"){
        pet9res224="Casi Nunca"
        pet9val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion9[47].Respuestas=="Nunca"){
        pet9res225="Nunca"
        pet9val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion9[48].Respuestas=="Siempre"){
        pet9res226="Siempre"
        pet9val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion9[48].Respuestas=="CasiSiempre"){
        pet9res227="Casi Siempre"
        pet9val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion9[48].Respuestas=="AlgunasVeces"){
        pet9res228="Algunas Veces"
        pet9val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion9[48].Respuestas=="CasiNunca"){
        pet9res229="Casi Nunca"
        pet9val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion9[48].Respuestas=="Nunca"){
        pet9res230="Nunca"
        pet9val46= this.state.getPonderacion[45].nunca
      }
      } 
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////////////////////////////////////////////////////////////////////////////////

  if(this.state.peticion10.length>0){

    if(this.state.peticion10[1].Respuestas=="Siempre"){
      pet10res1="Siempre"
      pet10val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion10[1].Respuestas=="CasiSiempre"){
        pet10res2="Casi Siempre"
        pet10val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion10[1].Respuestas=="AlgunasVeces"){
        pet10res3="Algunas Veces"
        pet10val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion10[1].Respuestas=="CasiNunca"){
        pet10res4="Casi Nunca"
        pet10val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion10[1].Respuestas=="Nunca"){
        pet10res5="Nunca"
        pet10val1= this.state.getPonderacion[0].nunca
      } 
  
  
    if(this.state.peticion10[2].Respuestas=="Siempre"){
      pet10res6="Siempre"
      pet10val2= this.state.peticion10[1].siempre
      }else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiSiempre"){
        pet10res7="Casi Siempre"
        pet10val2= this.state.peticion10[1].casisiempre
      }
      else if(this.state.resultadosEvaluacion[2].Respuestas=="AlgunasVeces"){
        pet10res8="Algunas Veces"
        pet10val2= this.state.peticion10[1].algunasveces
      } 
      else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiNunca"){
        pet10res9="Casi Nunca"
        pet10val2= this.state.peticion10[2].casinunca
      } 
      else if(this.state.peticion10[2].Respuestas=="Nunca"){
        pet10res10="Nunca"
        pet10val2= this.state.peticion10[1].nunca
      } 
  
      if(this.state.peticion10[3].Respuestas=="Siempre"){
        pet10res11="Siempre"
        pet10val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion10[3].Respuestas=="CasiSiempre"){
          pet10res12="Casi Siempre"
          pet10val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion10[3].Respuestas=="AlgunasVeces"){
          pet10res13="Algunas Veces"
          pet10val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion10[3].Respuestas=="CasiNunca"){
          pet10res14="Casi Nunca"
          pet10val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion10[3].Respuestas=="Nunca"){
          pet10res15="Nunca"
          pet10val3= this.state.getPonderacion[2].nunca
        } 
  
  
      if(this.state.peticion10[4].Respuestas=="Siempre"){
        pet10res16="Siempre"
        pet10val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion10[4].Respuestas=="CasiSiempre"){
          pet10res17="Casi Siempre"
          pet10val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion10[4].Respuestas=="AlgunasVeces"){
          pet10res18="Algunas Veces"
          pet10val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion10[4].Respuestas=="CasiNunca"){
          pet10res19="Casi Nunca"
          pet10val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion10[4].Respuestas=="Nunca"){
          pet10res20="Nunca"
          pet10val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion10[5].Respuestas=="Siempre"){
        pet10res21="Siempre"
        pet10val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion10[5].Respuestas=="CasiSiempre"){
          pet10res22="Casi Siempre"
          pet10val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion10[5].Respuestas=="AlgunasVeces"){
          pet10res23="Algunas Veces"
          pet10val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion10[5].Respuestas=="CasiNunca"){
          pet10res24="Casi Nunca"
          pet10val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion10[5].Respuestas=="Nunca"){
          pet10res25="Nunca"
          pet10val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion10[6].Respuestas=="Siempre"){
          pet10res26="Siempre"
          pet10val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion10[6].Respuestas=="CasiSiempre"){
            pet10res27="Casi Siempre"
            pet10val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion10[6].Respuestas=="AlgunasVeces"){
            pet10res28="Algunas Veces"
            pet10val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion10[6].Respuestas=="CasiNunca"){
            pet10res29="Casi Nunca"
            pet10val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion10[6].Respuestas=="Nunca"){
            pet10res30="Nunca"
            pet10val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion10[7].Respuestas=="Siempre"){
          pet10res31="Siempre"
          pet10val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion10[7].Respuestas=="CasiSiempre"){
            pet10res32="Casi Siempre"
            pet10val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion10[7].Respuestas=="AlgunasVeces"){
            pet10res33="Algunas Veces"
            pet10val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion10[7].Respuestas=="CasiNunca"){
            pet10res34="Casi Nunca"
            pet10val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion10[7].Respuestas=="Nunca"){
            pet10res35="Nunca"
            pet10val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion10[8].Respuestas=="Siempre"){
            pet10res36="Siempre"
            pet10val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion10[8].Respuestas=="CasiSiempre"){
              pet10res37="Casi Siempre"
              pet10val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion10[8].Respuestas=="AlgunasVeces"){
              pet10res38="Algunas Veces"
              pet10val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion10[8].Respuestas=="CasiNunca"){
              pet10res39="Casi Nunca"
              pet10val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion10[8].Respuestas=="Nunca"){
              pet10res40="Nunca"
              pet10val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion10[9].Respuestas=="Siempre"){
            pet10res41="Siempre"
            pet10val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion10[9].Respuestas=="CasiSiempre"){
              pet10res42="Casi Siempre"
              pet10val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion10[9].Respuestas=="AlgunasVeces"){
              pet10res43="Algunas Veces"
              pet10val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion10[9].Respuestas=="CasiNunca"){
              pet10res44="Casi Nunca"
              pet10val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion10[9].Respuestas=="Nunca"){
              pet10res45="Nunca"
              pet10val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion10[10].Respuestas=="Siempre"){
          pet10res46="Siempre"
          pet10val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion10[10].Respuestas=="CasiSiempre"){
            pet10res47="Casi Siempre"
            pet10val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion10[10].Respuestas=="AlgunasVeces"){
            pet10res48="Algunas Veces"
            pet10val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion10[10].Respuestas=="CasiNunca"){
            pet10res49="Casi Nunca"
            pet10val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion10[10].Respuestas=="Nunca"){
            pet10res50="Nunca"
            pet10val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion10[11].Respuestas=="Siempre"){
          pet10res51="Siempre"
          pet10val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion10[11].Respuestas=="CasiSiempre"){
            pet10res52="Casi Siempre"
            pet10val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion10[11].Respuestas=="AlgunasVeces"){
            pet10res53="Algunas Veces"
            pet10val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion10[11].Respuestas=="CasiNunca"){
            pet10res54="Casi Nunca"
            pet10val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion10[11].Respuestas=="Nunca"){
            pet10res55="Nunca"
            pet10val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion10[12].Respuestas=="Siempre"){
          pet10res56="Siempre"
          pet10val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion10[12].Respuestas=="CasiSiempre"){
            pet10res57="Casi Siempre"
            pet10val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion10[12].Respuestas=="AlgunasVeces"){
            pet10res58="Algunas Veces"
            pet10val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion10[12].Respuestas=="CasiNunca"){
            pet10res59="Casi Nunca"
            pet10val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion10[12].Respuestas=="Nunca"){
            pet10res60="Nunca"
            pet10val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion10[13].Respuestas=="Siempre"){
          pet10res61="Siempre"
          pet10val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion10[13].Respuestas=="CasiSiempre"){
            pet10res62="Casi Siempre"
            pet10val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion10[13].Respuestas=="AlgunasVeces"){
            pet10res63="Algunas Veces"
            pet10val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion10[13].Respuestas=="CasiNunca"){
            pet10res64="Casi Nunca"
            pet10val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion10[13].Respuestas=="Nunca"){
            pet10res65="Nunca"
            pet10val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion10[14].Respuestas=="Siempre"){
          pet10res66="Siempre"
          pet10val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion10[14].Respuestas=="CasiSiempre"){
            pet10res67="Casi Siempre"
            pet10val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion10[14].Respuestas=="AlgunasVeces"){
            pet10res68="Algunas Veces"
            pet10val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion10[14].Respuestas=="CasiNunca"){
            pet10res69="Casi Nunca"
            pet10val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion10[14].Respuestas=="Nunca"){
            pet10res70="Nunca"
            pet10val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion10[15].Respuestas=="Siempre"){
          pet10res71="Siempre"
          pet10val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion10[15].Respuestas=="CasiSiempre"){
            pet10res72="Casi Siempre"
            pet10val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion10[15].Respuestas=="AlgunasVeces"){
            pet10res73="Algunas Veces"
            pet10val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion10[15].Respuestas=="CasiNunca"){
            pet10res74="Casi Nunca"
            pet10val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion10[15].Respuestas=="Nunca"){
            pet10res75="Nunca"
            pet10val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion10[16].Respuestas=="Siempre"){
          pet10res76="Siempre"
          pet10val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion10[16].Respuestas=="CasiSiempre"){
            pet10res77="Casi Siempre"
            pet10val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion10[16].Respuestas=="AlgunasVeces"){
            pet10res78="Algunas Veces"
            pet10val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion10[16].Respuestas=="CasiNunca"){
            pet10res79="Casi Nunca"
            pet10val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion10[16].Respuestas=="Nunca"){
            pet10res80="Nunca"
            pet10val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion10[17].Respuestas=="Siempre"){
          pet10res81="Siempre"
          pet10val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion10[17].Respuestas=="CasiSiempre"){
            pet10res82="Casi Siempre"
            pet10val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion10[17].Respuestas=="AlgunasVeces"){
            pet10res83="Algunas Veces"
            pet10val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion10[17].Respuestas=="CasiNunca"){
            pet10res84="Casi Nunca"
            pet10val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion10[17].Respuestas=="Nunca"){
            pet10res85="Nunca"
            pet10val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion10[18].Respuestas=="Siempre"){
          pet10res86="Siempre"
          pet10val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion10[18].Respuestas=="CasiSiempre"){
            pet10res87="Casi Siempre"
            pet10val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion10[18].Respuestas=="AlgunasVeces"){
            pet10res88="Algunas Veces"
            pet10val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion10[18].Respuestas=="CasiNunca"){
            pet10res89="Casi Nunca"
            pet10val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion10[18].Respuestas=="Nunca"){
            pet10res90="Nunca"
            pet10val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion10[19].Respuestas=="Siempre"){
          pet10res91="Siempre"
          pet10val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion10[19].Respuestas=="CasiSiempre"){
            pet10res92="Casi Siempre"
            pet10val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion10[19].Respuestas=="AlgunasVeces"){
            pet10res93="Algunas Veces"
            pet10val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion10[19].Respuestas=="CasiNunca"){
            pet10res94="Casi Nunca"
            pet10val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion10[19].Respuestas=="Nunca"){
            pet10res95="Nunca"
            pet10val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion10[20].Respuestas=="Siempre"){
          pet10res96="Siempre"
          pet10val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion10[20].Respuestas=="CasiSiempre"){
            pet10res97="Casi Siempre"
            pet10val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion10[20].Respuestas=="AlgunasVeces"){
            pet10res98="Algunas Veces"
            pet10val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion10[20].Respuestas=="CasiNunca"){
            pet10res99="Casi Nunca"
            pet10val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion10[20].Respuestas=="Nunca"){
            pet10res100="Nunca"
            pet10val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion10[21].Respuestas=="Siempre"){
          pet10res101="Siempre"
          pet10val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion10[21].Respuestas=="CasiSiempre"){
            pet10res102="Casi Siempre"
            pet10val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion10[21].Respuestas=="AlgunasVeces"){
            pet10res103="Algunas Veces"
            pet10val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion10[21].Respuestas=="CasiNunca"){
            pet10res104="Casi Nunca"
            pet10val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion10[21].Respuestas=="Nunca"){
            pet10res105="Nunca"
            pet10val21= this.state.getPonderacion[20].nunca
          } 
  
        if(this.state.peticion10[22].Respuestas=="Siempre"){
          pet10res106="Siempre"
          pet10val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion10[22].Respuestas=="CasiSiempre"){
            pet10res107="Casi Siempre"
            pet10val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion10[22].Respuestas=="AlgunasVeces"){
            pet10res108="Algunas Veces"
            pet10val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion10[2].Respuestas=="CasiNunca"){
            pet10res109="Casi Nunca"
            pet10val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion10[22].Respuestas=="Nunca"){
            pet10res110="Nunca"
            pet10val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion10[23].Respuestas=="Siempre"){
          pet10res111="Siempre"
          pet10val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion10[23].Respuestas=="CasiSiempre"){
            pet10res112="Casi Siempre"
            pet10val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion10[23].Respuestas=="AlgunasVeces"){
            pet10res113="Algunas Veces"
            pet10val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion10[23].Respuestas=="CasiNunca"){
            pet10res114="Casi Nunca"
            pet10val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion10[23].Respuestas=="Nunca"){
            pet10res115="Nunca"
            pet10val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion10[24].Respuestas=="Siempre"){
          pet10res116="Siempre"
          pet10val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion10[24].Respuestas=="CasiSiempre"){
            pet10res117="Casi Siempre"
            pet10val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion10[24].Respuestas=="AlgunasVeces"){
            pet10res118="Algunas Veces"
            pet10val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion10[24].Respuestas=="CasiNunca"){
            pet10res119="Casi Nunca"
            pet10val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion10[24].Respuestas=="Nunca"){
            pet10res120="Nunca"
            pet10val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion10[25].Respuestas=="Siempre"){
          pet10res121="Siempre"
          pet10val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion10[25].Respuestas=="CasiSiempre"){
            pet10res122="Casi Siempre"
            pet10val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion10[25].Respuestas=="AlgunasVeces"){
            pet10res123="Algunas Veces"
            pet10val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion10[25].Respuestas=="CasiNunca"){
            pet10res124="Casi Nunca"
            pet10val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion10[25].Respuestas=="Nunca"){
            pet10res125="Nunca"
            pet10val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion10[26].Respuestas=="Siempre"){
          pet10res126="Siempre"
          pet10val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion10[26].Respuestas=="CasiSiempre"){
            pet10res127="Casi Siempre"
            pet10val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion10[26].Respuestas=="AlgunasVeces"){
            pet10res128="Algunas Veces"
            pet10val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion10[26].Respuestas=="CasiNunca"){
            pet10res129="Casi Nunca"
            pet10val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion10[26].Respuestas=="Nunca"){
            pet10res130="Nunca"
            pet10val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion10[27].Respuestas=="Siempre"){
          pet10res131="Siempre"
          pet10val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion10[27].Respuestas=="CasiSiempre"){
            pet10res132="Casi Siempre"
            pet10val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion10[27].Respuestas=="AlgunasVeces"){
            pet10res133="Algunas Veces"
            pet10val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion10[27].Respuestas=="CasiNunca"){
            pet10res134="Casi Nunca"
            pet10val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion10[27].Respuestas=="Nunca"){
            pet10res135="Nunca"
            pet10val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion10[28].Respuestas=="Siempre"){
        pet10res136="Siempre"
        pet10val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion10[28].Respuestas=="CasiSiempre"){
          pet10res137="Casi Siempre"
          pet10val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion10[28].Respuestas=="AlgunasVeces"){
          pet10res138="Algunas Veces"
          pet10val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion10[28].Respuestas=="CasiNunca"){
          pet10res139="Casi Nunca"
          pet10val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion10[28].Respuestas=="Nunca"){
          pet10res140="Nunca"
          pet10val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion10[29].Respuestas=="Siempre"){
        pet10res141="Siempre"
        pet10val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion10[29].Respuestas=="CasiSiempre"){
          pet10res142="Casi Siempre"
          pet10val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion10[29].Respuestas=="AlgunasVeces"){
          pet10res143="Algunas Veces"
          pet10val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion10[29].Respuestas=="CasiNunca"){
          pet10res144="Casi Nunca"
          pet10val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion10[29].Respuestas=="Nunca"){
          pet10res145="Nunca"
          pet10val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion10[30].Respuestas=="Siempre"){
        pet10res146="Siempre"
        pet10val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion10[30].Respuestas=="CasiSiempre"){
          pet10res147="Casi Siempre"
          pet10val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion10[30].Respuestas=="AlgunasVeces"){
          pet10res148="Algunas Veces"
          pet10val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion10[30].Respuestas=="CasiNunca"){
          pet10res149="Casi Nunca"
          pet10val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion10[30].Respuestas=="Nunca"){
          pet10res150="Nunca"
          pet10val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion10[31].Respuestas=="Siempre"){
        pet10res151="Siempre"
        pet10val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion10[31].Respuestas=="CasiSiempre"){
          pet10res152="Casi Siempre"
          pet10val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion10[31].Respuestas=="AlgunasVeces"){
          pet10res153="Algunas Veces"
          pet10val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion10[31].Respuestas=="CasiNunca"){
          pet10res154="Casi Nunca"
          pet10val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion10[31].Respuestas=="Nunca"){
          pet10res155="Nunca"
          pet10val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion10[32].Respuestas=="Siempre"){
        pet10res156="Siempre"
        pet10val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion10[32].Respuestas=="CasiSiempre"){
          pet10res157="Casi Siempre"
          pet10val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion10[32].Respuestas=="AlgunasVeces"){
          pet10res158="Algunas Veces"
          pet10val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion10[32].Respuestas=="CasiNunca"){
          pet10res159="Casi Nunca"
          pet10val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion10[32].Respuestas=="Nunca"){
          pet10res160="Nunca"
          pet10val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion10[33].Respuestas=="Siempre"){
          pet10res161="Siempre"
          pet10val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion10[33].Respuestas=="CasiSiempre"){
            pet10res162="Casi Siempre"
            pet10val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion10[33].Respuestas=="AlgunasVeces"){
            pet10res163="Algunas Veces"
            pet10val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion10[33].Respuestas=="CasiNunca"){
            pet10res164="Casi Nunca"
            pet10val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion10[33].Respuestas=="Nunca"){
            pet10res165="Nunca"
            pet10val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion10[34].Respuestas=="Siempre"){
          pet10res166="Siempre"
          pet10val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion10[34].Respuestas=="CasiSiempre"){
            pet10res167="Casi Siempre"
            pet10val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion10[34].Respuestas=="AlgunasVeces"){
            pet10res168="Algunas Veces"
            pet10val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion10[34].Respuestas=="CasiNunca"){
            pet10res169="Casi Nunca"
            pet10val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion10[34].Respuestas=="Nunca"){
            pet10res170="Nunca"
            pet10val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion10[35].Respuestas=="Siempre"){
            pet10res171="Siempre"
            pet10val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion10[35].Respuestas=="CasiSiempre"){
              pet10res172="Casi Siempre"
              pet10val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion10[35].Respuestas=="AlgunasVeces"){
              pet10res173="Algunas Veces"
              pet10val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion10[35].Respuestas=="CasiNunca"){
              pet10res174="Casi Nunca"
              pet10val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion10[15].Respuestas=="Nunca"){
              pet10res175="Nunca"
              pet10val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion10[36].Respuestas=="Siempre"){
            pet10res176="Siempre"
            pet10val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion10[36].Respuestas=="CasiSiempre"){
              pet10res177="Casi Siempre"
              pet10val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion10[36].Respuestas=="AlgunasVeces"){
              pet10res178="Algunas Veces"
              pet10val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion10[36].Respuestas=="CasiNunca"){
              pet10res179="Casi Nunca"
              pet10val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion10[36].Respuestas=="Nunca"){
              pet10res180="Nunca"
              pet10val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion10[37].Respuestas=="Siempre"){
            pet10res181="Siempre"
            pet10val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion10[37].Respuestas=="CasiSiempre"){
              pet10res182="Casi Siempre"
              pet10val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion10[37].Respuestas=="AlgunasVeces"){
              pet10res183="Algunas Veces"
              pet10val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion10[37].Respuestas=="CasiNunca"){
              pet10res184="Casi Nunca"
              pet10val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion10[37].Respuestas=="Nunca"){
              pet10res185="Nunca"
              pet10val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion10[38].Respuestas=="Siempre"){
            pet10res186="Siempre"
            pet10val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion10[38].Respuestas=="CasiSiempre"){
              pet10res187="Casi Siempre"
              pet10val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion10[38].Respuestas=="AlgunasVeces"){
              pet10res188="Algunas Veces"
              pet10val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion10[38].Respuestas=="CasiNunca"){
              pet10res189="Casi Nunca"
              pet10val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion10[38].Respuestas=="Nunca"){
              pet10res190="Nunca"
              pet10val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion10[39].Respuestas=="Siempre"){
              pet10res191="Siempre"
              pet10val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion10[39].Respuestas=="CasiSiempre"){
                pet10res192="Casi Siempre"
                pet10val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion10[39].Respuestas=="AlgunasVeces"){
                pet10res193="Algunas Veces"
                pet10val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion10[39].Respuestas=="CasiNunca"){
                pet10res194="Casi Nunca"
                pet10val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion10[39].Respuestas=="Nunca"){
                pet10res195="Nunca"
                pet10val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion10[40].Respuestas=="Siempre"){
                pet10res196="Siempre"
                pet10val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion10[40].Respuestas=="CasiSiempre"){
                  pet10res197="Casi Siempre"
                  pet10val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion10[40].Respuestas=="AlgunasVeces"){
                  pet10res198="Algunas Veces"
                  pet10val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion10[40].Respuestas=="CasiNunca"){
                  pet10res199="Casi Nunca"
                  pet10val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion10[40].Respuestas=="Nunca"){
                  pet10res200="Nunca"
                  pet10val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion10[42].Respuestas=="Siempre"){
                pet10res201="Siempre"
                pet10val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion10[42].Respuestas=="CasiSiempre"){
                pet10res202="Casi Siempre"
                pet10val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion10[42].Respuestas=="AlgunasVeces"){
                pet10res203="Algunas Veces"
                pet10val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion10[42].Respuestas=="CasiNunca"){
                pet10res204="Casi Nunca"
                pet10val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion10[42].Respuestas=="Nunca"){
                pet10res205="Nunca"
                pet10val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion10[43].Respuestas=="Siempre"){
              pet10res206="Siempre"
              pet10val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion10[43].Respuestas=="CasiSiempre"){
              pet10res207="Casi Siempre"
              pet10val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion10[43].Respuestas=="AlgunasVeces"){
              pet10res208="Algunas Veces"
              pet10val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion10[43].Respuestas=="CasiNunca"){
              pet10res209="Casi Nunca"
              pet10val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion10[43].Respuestas=="Nunca"){
              pet10res210="Nunca"
              pet10val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion10[44].Respuestas=="Siempre"){
            pet10res211="Siempre"
            pet10val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion10[44].Respuestas=="CasiSiempre"){
            pet10res212="Casi Siempre"
            pet10val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion10[44].Respuestas=="AlgunasVeces"){
            pet10res213="Algunas Veces"
            pet10val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion10[44].Respuestas=="CasiNunca"){
            pet10res214="Casi Nunca"
            pet10val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion10[44].Respuestas=="Nunca"){
            pet10res215="Nunca"
            pet10val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion10[46].Respuestas=="Siempre"){
          pet10res216="Siempre"
          pet10val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion10[46].Respuestas=="CasiSiempre"){
          pet10res217="Casi Siempre"
          pet10val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion10[46].Respuestas=="AlgunasVeces"){
          pet10res218="Algunas Veces"
          pet10val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion10[46].Respuestas=="CasiNunca"){
          pet10res219="Casi Nunca"
          pet10val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion10[46].Respuestas=="Nunca"){
          pet10res220="Nunca"
          pet10val44= this.state.getPonderacion[43].nunca
        }
  
      if(this.state.peticion10[47].Respuestas=="Siempre"){
        pet10res221="Siempre"
        pet10val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion10[47].Respuestas=="CasiSiempre"){
        pet10res222="Casi Siempre"
        pet10val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion10[47].Respuestas=="AlgunasVeces"){
        pet10res223="Algunas Veces"
        pet10val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion10[47].Respuestas=="CasiNunca"){
        pet10res224="Casi Nunca"
        pet10val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion10[47].Respuestas=="Nunca"){
        pet10res225="Nunca"
        pet10val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion10[48].Respuestas=="Siempre"){
        pet10res226="Siempre"
        pet10val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion10[48].Respuestas=="CasiSiempre"){
        pet10res227="Casi Siempre"
        pet10val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion10[48].Respuestas=="AlgunasVeces"){
        pet10res228="Algunas Veces"
        pet10val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion10[48].Respuestas=="CasiNunca"){
        pet10res229="Casi Nunca"
        pet10val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion10[48].Respuestas=="Nunca"){
        pet10res230="Nunca"
        pet10val46= this.state.getPonderacion[45].nunca
      }
   } 
   ////////////////////////////////////////////////////////////////////////////////////////////////77
     ///////////////////////////////////////////////////////////////////////////////////////////////////////

  if(this.state.peticion11.length>0){

    if(this.state.peticion11[1].Respuestas=="Siempre"){
      pet11res1="Siempre"
      pet11val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion11[1].Respuestas=="CasiSiempre"){
        pet11res2="Casi Siempre"
        pet11val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion11[1].Respuestas=="AlgunasVeces"){
        pet11res3="Algunas Veces"
        pet11val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion11[1].Respuestas=="CasiNunca"){
        pet11res4="Casi Nunca"
        pet11val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion11[1].Respuestas=="Nunca"){
        pet11res5="Nunca"
        pet11val1= this.state.getPonderacion[0].nunca
      } 
  
  
    if(this.state.peticion11[2].Respuestas=="Siempre"){
      pet11res6="Siempre"
      pet11val2= this.state.peticion11[1].siempre
      }else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiSiempre"){
        pet11res7="Casi Siempre"
        pet11val2= this.state.peticion11[1].casisiempre
      }
      else if(this.state.resultadosEvaluacion[2].Respuestas=="AlgunasVeces"){
        pet11res8="Algunas Veces"
        pet11val2= this.state.peticion11[1].algunasveces
      } 
      else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiNunca"){
        pet11res9="Casi Nunca"
        pet11val2= this.state.peticion11[2].casinunca
      } 
      else if(this.state.peticion11[2].Respuestas=="Nunca"){
        pet11res10="Nunca"
        pet11val2= this.state.peticion11[1].nunca
      } 
  
      if(this.state.peticion11[3].Respuestas=="Siempre"){
        pet11res11="Siempre"
        pet11val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion11[3].Respuestas=="CasiSiempre"){
          pet11res12="Casi Siempre"
          pet11val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion11[3].Respuestas=="AlgunasVeces"){
          pet11res13="Algunas Veces"
          pet11val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion11[3].Respuestas=="CasiNunca"){
          pet11res14="Casi Nunca"
          pet11val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion11[3].Respuestas=="Nunca"){
          pet11res15="Nunca"
          pet11val3= this.state.getPonderacion[2].nunca
        } 
  
  
      if(this.state.peticion11[4].Respuestas=="Siempre"){
        pet11res16="Siempre"
        pet11val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion11[4].Respuestas=="CasiSiempre"){
          pet11res17="Casi Siempre"
          pet11val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion11[4].Respuestas=="AlgunasVeces"){
          pet11res18="Algunas Veces"
          pet11val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion11[4].Respuestas=="CasiNunca"){
          pet11res19="Casi Nunca"
          pet11val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion11[4].Respuestas=="Nunca"){
          pet11res20="Nunca"
          pet11val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion11[5].Respuestas=="Siempre"){
        pet11res21="Siempre"
        pet11val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion11[5].Respuestas=="CasiSiempre"){
          pet11res22="Casi Siempre"
          pet11val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion11[5].Respuestas=="AlgunasVeces"){
          pet11res23="Algunas Veces"
          pet11val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion11[5].Respuestas=="CasiNunca"){
          pet11res24="Casi Nunca"
          pet11val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion11[5].Respuestas=="Nunca"){
          pet11res25="Nunca"
          pet11val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion11[6].Respuestas=="Siempre"){
          pet11res26="Siempre"
          pet11val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion11[6].Respuestas=="CasiSiempre"){
            pet11res27="Casi Siempre"
            pet11val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion11[6].Respuestas=="AlgunasVeces"){
            pet11res28="Algunas Veces"
            pet11val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion11[6].Respuestas=="CasiNunca"){
            pet11res29="Casi Nunca"
            pet11val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion11[6].Respuestas=="Nunca"){
            pet11res30="Nunca"
            pet11val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion11[7].Respuestas=="Siempre"){
          pet11res31="Siempre"
          pet11val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion11[7].Respuestas=="CasiSiempre"){
            pet11res32="Casi Siempre"
            pet11val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion11[7].Respuestas=="AlgunasVeces"){
            pet11res33="Algunas Veces"
            pet11val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion11[7].Respuestas=="CasiNunca"){
            pet11res34="Casi Nunca"
            pet11val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion11[7].Respuestas=="Nunca"){
            pet11res35="Nunca"
            pet11val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion11[8].Respuestas=="Siempre"){
            pet11res36="Siempre"
            pet11val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion11[8].Respuestas=="CasiSiempre"){
              pet11res37="Casi Siempre"
              pet11val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion11[8].Respuestas=="AlgunasVeces"){
              pet11res38="Algunas Veces"
              pet11val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion11[8].Respuestas=="CasiNunca"){
              pet11res39="Casi Nunca"
              pet11val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion11[8].Respuestas=="Nunca"){
              pet11res40="Nunca"
              pet11val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion11[9].Respuestas=="Siempre"){
            pet11res41="Siempre"
            pet11val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion11[9].Respuestas=="CasiSiempre"){
              pet11res42="Casi Siempre"
              pet11val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion11[9].Respuestas=="AlgunasVeces"){
              pet11res43="Algunas Veces"
              pet11val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion11[9].Respuestas=="CasiNunca"){
              pet11res44="Casi Nunca"
              pet11val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion11[9].Respuestas=="Nunca"){
              pet11res45="Nunca"
              pet11val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion11[10].Respuestas=="Siempre"){
          pet11res46="Siempre"
          pet11val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion11[10].Respuestas=="CasiSiempre"){
            pet11res47="Casi Siempre"
            pet11val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion11[10].Respuestas=="AlgunasVeces"){
            pet11res48="Algunas Veces"
            pet11val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion11[10].Respuestas=="CasiNunca"){
            pet11res49="Casi Nunca"
            pet11val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion11[10].Respuestas=="Nunca"){
            pet11res50="Nunca"
            pet11val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion11[11].Respuestas=="Siempre"){
          pet11res51="Siempre"
          pet11val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion11[11].Respuestas=="CasiSiempre"){
            pet11res52="Casi Siempre"
            pet11val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion11[11].Respuestas=="AlgunasVeces"){
            pet11res53="Algunas Veces"
            pet11val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion11[11].Respuestas=="CasiNunca"){
            pet11res54="Casi Nunca"
            pet11val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion11[11].Respuestas=="Nunca"){
            pet11res55="Nunca"
            pet11val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion11[12].Respuestas=="Siempre"){
          pet11res56="Siempre"
          pet11val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion11[12].Respuestas=="CasiSiempre"){
            pet11res57="Casi Siempre"
            pet11val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion11[12].Respuestas=="AlgunasVeces"){
            pet11res58="Algunas Veces"
            pet11val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion11[12].Respuestas=="CasiNunca"){
            pet11res59="Casi Nunca"
            pet11val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion11[12].Respuestas=="Nunca"){
            pet11res60="Nunca"
            pet11val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion11[13].Respuestas=="Siempre"){
          pet11res61="Siempre"
          pet11val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion11[13].Respuestas=="CasiSiempre"){
            pet11res62="Casi Siempre"
            pet11val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion11[13].Respuestas=="AlgunasVeces"){
            pet11res63="Algunas Veces"
            pet11val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion11[13].Respuestas=="CasiNunca"){
            pet11res64="Casi Nunca"
            pet11val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion11[13].Respuestas=="Nunca"){
            pet11res65="Nunca"
            pet11val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion11[14].Respuestas=="Siempre"){
          pet11res66="Siempre"
          pet11val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion11[14].Respuestas=="CasiSiempre"){
            pet11res67="Casi Siempre"
            pet11val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion11[14].Respuestas=="AlgunasVeces"){
            pet11res68="Algunas Veces"
            pet11val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion11[14].Respuestas=="CasiNunca"){
            pet11res69="Casi Nunca"
            pet11val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion11[14].Respuestas=="Nunca"){
            pet11res70="Nunca"
            pet11val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion11[15].Respuestas=="Siempre"){
          pet11res71="Siempre"
          pet11val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion11[15].Respuestas=="CasiSiempre"){
            pet11res72="Casi Siempre"
            pet11val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion11[15].Respuestas=="AlgunasVeces"){
            pet11res73="Algunas Veces"
            pet11val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion11[15].Respuestas=="CasiNunca"){
            pet11res74="Casi Nunca"
            pet11val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion11[15].Respuestas=="Nunca"){
            pet11res75="Nunca"
            pet11val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion11[16].Respuestas=="Siempre"){
          pet11res76="Siempre"
          pet11val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion11[16].Respuestas=="CasiSiempre"){
            pet11res77="Casi Siempre"
            pet11val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion11[16].Respuestas=="AlgunasVeces"){
            pet11res78="Algunas Veces"
            pet11val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion11[16].Respuestas=="CasiNunca"){
            pet11res79="Casi Nunca"
            pet11val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion11[16].Respuestas=="Nunca"){
            pet11res80="Nunca"
            pet11val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion11[17].Respuestas=="Siempre"){
          pet11res81="Siempre"
          pet11val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion11[17].Respuestas=="CasiSiempre"){
            pet11res82="Casi Siempre"
            pet11val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion11[17].Respuestas=="AlgunasVeces"){
            pet11res83="Algunas Veces"
            pet11val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion11[17].Respuestas=="CasiNunca"){
            pet11res84="Casi Nunca"
            pet11val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion11[17].Respuestas=="Nunca"){
            pet11res85="Nunca"
            pet11val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion11[18].Respuestas=="Siempre"){
          pet11res86="Siempre"
          pet11val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion11[18].Respuestas=="CasiSiempre"){
            pet11res87="Casi Siempre"
            pet11val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion11[18].Respuestas=="AlgunasVeces"){
            pet11res88="Algunas Veces"
            pet11val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion11[18].Respuestas=="CasiNunca"){
            pet11res89="Casi Nunca"
            pet11val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion11[18].Respuestas=="Nunca"){
            pet11res90="Nunca"
            pet11val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion11[19].Respuestas=="Siempre"){
          pet11res91="Siempre"
          pet11val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion11[19].Respuestas=="CasiSiempre"){
            pet11res92="Casi Siempre"
            pet11val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion11[19].Respuestas=="AlgunasVeces"){
            pet11res93="Algunas Veces"
            pet11val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion11[19].Respuestas=="CasiNunca"){
            pet11res94="Casi Nunca"
            pet11val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion11[19].Respuestas=="Nunca"){
            pet11res95="Nunca"
            pet11val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion11[20].Respuestas=="Siempre"){
          pet11res96="Siempre"
          pet11val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion11[20].Respuestas=="CasiSiempre"){
            pet11res97="Casi Siempre"
            pet11val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion11[20].Respuestas=="AlgunasVeces"){
            pet11res98="Algunas Veces"
            pet11val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion11[20].Respuestas=="CasiNunca"){
            pet11res99="Casi Nunca"
            pet11val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion11[20].Respuestas=="Nunca"){
            pet11res100="Nunca"
            pet11val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion11[21].Respuestas=="Siempre"){
          pet11res101="Siempre"
          pet11val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion11[21].Respuestas=="CasiSiempre"){
            pet11res102="Casi Siempre"
            pet11val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion11[21].Respuestas=="AlgunasVeces"){
            pet11res103="Algunas Veces"
            pet11val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion11[21].Respuestas=="CasiNunca"){
            pet11res104="Casi Nunca"
            pet11val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion11[21].Respuestas=="Nunca"){
            pet11res105="Nunca"
            pet11val21= this.state.getPonderacion[20].nunca
          } 
  
        if(this.state.peticion11[22].Respuestas=="Siempre"){
          pet11res106="Siempre"
          pet11val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion11[22].Respuestas=="CasiSiempre"){
            pet11res107="Casi Siempre"
            pet11val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion11[22].Respuestas=="AlgunasVeces"){
            pet11res108="Algunas Veces"
            pet11val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion11[2].Respuestas=="CasiNunca"){
            pet11res109="Casi Nunca"
            pet11val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion11[22].Respuestas=="Nunca"){
            pet11res110="Nunca"
            pet11val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion11[23].Respuestas=="Siempre"){
          pet11res111="Siempre"
          pet11val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion11[23].Respuestas=="CasiSiempre"){
            pet11res112="Casi Siempre"
            pet11val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion11[23].Respuestas=="AlgunasVeces"){
            pet11res113="Algunas Veces"
            pet11val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion11[23].Respuestas=="CasiNunca"){
            pet11res114="Casi Nunca"
            pet11val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion11[23].Respuestas=="Nunca"){
            pet11res115="Nunca"
            pet11val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion11[24].Respuestas=="Siempre"){
          pet11res116="Siempre"
          pet11val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion11[24].Respuestas=="CasiSiempre"){
            pet11res117="Casi Siempre"
            pet11val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion11[24].Respuestas=="AlgunasVeces"){
            pet11res118="Algunas Veces"
            pet11val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion11[24].Respuestas=="CasiNunca"){
            pet11res119="Casi Nunca"
            pet11val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion11[24].Respuestas=="Nunca"){
            pet11res120="Nunca"
            pet11val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion11[25].Respuestas=="Siempre"){
          pet11res121="Siempre"
          pet11val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion11[25].Respuestas=="CasiSiempre"){
            pet11res122="Casi Siempre"
            pet11val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion11[25].Respuestas=="AlgunasVeces"){
            pet11res123="Algunas Veces"
            pet11val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion11[25].Respuestas=="CasiNunca"){
            pet11res124="Casi Nunca"
            pet11val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion11[25].Respuestas=="Nunca"){
            pet11res125="Nunca"
            pet11val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion11[26].Respuestas=="Siempre"){
          pet11res126="Siempre"
          pet11val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion11[26].Respuestas=="CasiSiempre"){
            pet11res127="Casi Siempre"
            pet11val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion11[26].Respuestas=="AlgunasVeces"){
            pet11res128="Algunas Veces"
            pet11val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion11[26].Respuestas=="CasiNunca"){
            pet11res129="Casi Nunca"
            pet11val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion11[26].Respuestas=="Nunca"){
            pet11res130="Nunca"
            pet11val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion11[27].Respuestas=="Siempre"){
          pet11res131="Siempre"
          pet11val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion11[27].Respuestas=="CasiSiempre"){
            pet11res132="Casi Siempre"
            pet11val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion11[27].Respuestas=="AlgunasVeces"){
            pet11res133="Algunas Veces"
            pet11val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion11[27].Respuestas=="CasiNunca"){
            pet11res134="Casi Nunca"
            pet11val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion11[27].Respuestas=="Nunca"){
            pet11res135="Nunca"
            pet11val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion11[28].Respuestas=="Siempre"){
        pet11res136="Siempre"
        pet11val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion11[28].Respuestas=="CasiSiempre"){
          pet11res137="Casi Siempre"
          pet11val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion11[28].Respuestas=="AlgunasVeces"){
          pet11res138="Algunas Veces"
          pet11val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion11[28].Respuestas=="CasiNunca"){
          pet11res139="Casi Nunca"
          pet11val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion11[28].Respuestas=="Nunca"){
          pet11res140="Nunca"
          pet11val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion11[29].Respuestas=="Siempre"){
        pet11res141="Siempre"
        pet11val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion11[29].Respuestas=="CasiSiempre"){
          pet11res142="Casi Siempre"
          pet11val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion11[29].Respuestas=="AlgunasVeces"){
          pet11res143="Algunas Veces"
          pet11val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion11[29].Respuestas=="CasiNunca"){
          pet11res144="Casi Nunca"
          pet11val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion11[29].Respuestas=="Nunca"){
          pet11res145="Nunca"
          pet11val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion11[30].Respuestas=="Siempre"){
        pet11res146="Siempre"
        pet11val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion11[30].Respuestas=="CasiSiempre"){
          pet11res147="Casi Siempre"
          pet11val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion11[30].Respuestas=="AlgunasVeces"){
          pet11res148="Algunas Veces"
          pet11val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion11[30].Respuestas=="CasiNunca"){
          pet11res149="Casi Nunca"
          pet11val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion11[30].Respuestas=="Nunca"){
          pet11res150="Nunca"
          pet11val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion11[31].Respuestas=="Siempre"){
        pet11res151="Siempre"
        pet11val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion11[31].Respuestas=="CasiSiempre"){
          pet11res152="Casi Siempre"
          pet11val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion11[31].Respuestas=="AlgunasVeces"){
          pet11res153="Algunas Veces"
          pet11val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion11[31].Respuestas=="CasiNunca"){
          pet11res154="Casi Nunca"
          pet11val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion11[31].Respuestas=="Nunca"){
          pet11res155="Nunca"
          pet11val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion11[32].Respuestas=="Siempre"){
        pet11res156="Siempre"
        pet11val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion11[32].Respuestas=="CasiSiempre"){
          pet11res157="Casi Siempre"
          pet11val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion11[32].Respuestas=="AlgunasVeces"){
          pet11res158="Algunas Veces"
          pet11val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion11[32].Respuestas=="CasiNunca"){
          pet11res159="Casi Nunca"
          pet11val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion11[32].Respuestas=="Nunca"){
          pet11res160="Nunca"
          pet11val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion11[33].Respuestas=="Siempre"){
          pet11res161="Siempre"
          pet11val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion11[33].Respuestas=="CasiSiempre"){
            pet11res162="Casi Siempre"
            pet11val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion11[33].Respuestas=="AlgunasVeces"){
            pet11res163="Algunas Veces"
            pet11val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion11[33].Respuestas=="CasiNunca"){
            pet11res164="Casi Nunca"
            pet11val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion11[33].Respuestas=="Nunca"){
            pet11res165="Nunca"
            pet11val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion11[34].Respuestas=="Siempre"){
          pet11res166="Siempre"
          pet11val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion11[34].Respuestas=="CasiSiempre"){
            pet11res167="Casi Siempre"
            pet11val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion11[34].Respuestas=="AlgunasVeces"){
            pet11res168="Algunas Veces"
            pet11val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion11[34].Respuestas=="CasiNunca"){
            pet11res169="Casi Nunca"
            pet11val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion11[34].Respuestas=="Nunca"){
            pet11res170="Nunca"
            pet11val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion11[35].Respuestas=="Siempre"){
            pet11res171="Siempre"
            pet11val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion11[35].Respuestas=="CasiSiempre"){
              pet11res172="Casi Siempre"
              pet11val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion11[35].Respuestas=="AlgunasVeces"){
              pet11res173="Algunas Veces"
              pet11val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion11[35].Respuestas=="CasiNunca"){
              pet11res174="Casi Nunca"
              pet11val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion11[15].Respuestas=="Nunca"){
              pet11res175="Nunca"
              pet11val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion11[36].Respuestas=="Siempre"){
            pet11res176="Siempre"
            pet11val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion11[36].Respuestas=="CasiSiempre"){
              pet11res177="Casi Siempre"
              pet11val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion11[36].Respuestas=="AlgunasVeces"){
              pet11res178="Algunas Veces"
              pet11val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion11[36].Respuestas=="CasiNunca"){
              pet11res179="Casi Nunca"
              pet11val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion11[36].Respuestas=="Nunca"){
              pet11res180="Nunca"
              pet11val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion11[37].Respuestas=="Siempre"){
            pet11res181="Siempre"
            pet11val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion11[37].Respuestas=="CasiSiempre"){
              pet11res182="Casi Siempre"
              pet11val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion11[37].Respuestas=="AlgunasVeces"){
              pet11res183="Algunas Veces"
              pet11val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion11[37].Respuestas=="CasiNunca"){
              pet11res184="Casi Nunca"
              pet11val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion11[37].Respuestas=="Nunca"){
              pet11res185="Nunca"
              pet11val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion11[38].Respuestas=="Siempre"){
            pet11res186="Siempre"
            pet11val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion11[38].Respuestas=="CasiSiempre"){
              pet11res187="Casi Siempre"
              pet11val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion11[38].Respuestas=="AlgunasVeces"){
              pet11res188="Algunas Veces"
              pet11val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion11[38].Respuestas=="CasiNunca"){
              pet11res189="Casi Nunca"
              pet11val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion11[38].Respuestas=="Nunca"){
              pet11res190="Nunca"
              pet11val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion11[39].Respuestas=="Siempre"){
              pet11res191="Siempre"
              pet11val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion11[39].Respuestas=="CasiSiempre"){
                pet11res192="Casi Siempre"
                pet11val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion11[39].Respuestas=="AlgunasVeces"){
                pet11res193="Algunas Veces"
                pet11val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion11[39].Respuestas=="CasiNunca"){
                pet11res194="Casi Nunca"
                pet11val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion11[39].Respuestas=="Nunca"){
                pet11res195="Nunca"
                pet11val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion11[40].Respuestas=="Siempre"){
                pet11res196="Siempre"
                pet11val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion11[40].Respuestas=="CasiSiempre"){
                  pet11res197="Casi Siempre"
                  pet11val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion11[40].Respuestas=="AlgunasVeces"){
                  pet11res198="Algunas Veces"
                  pet11val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion11[40].Respuestas=="CasiNunca"){
                  pet11res199="Casi Nunca"
                  pet11val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion11[40].Respuestas=="Nunca"){
                  pet11res200="Nunca"
                  pet11val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion11[42].Respuestas=="Siempre"){
                pet11res201="Siempre"
                pet11val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion11[42].Respuestas=="CasiSiempre"){
                pet11res202="Casi Siempre"
                pet11val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion11[42].Respuestas=="AlgunasVeces"){
                pet11res203="Algunas Veces"
                pet11val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion11[42].Respuestas=="CasiNunca"){
                pet11res204="Casi Nunca"
                pet11val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion11[42].Respuestas=="Nunca"){
                pet11res205="Nunca"
                pet11val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion11[43].Respuestas=="Siempre"){
              pet11res206="Siempre"
              pet11val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion11[43].Respuestas=="CasiSiempre"){
              pet11res207="Casi Siempre"
              pet11val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion11[43].Respuestas=="AlgunasVeces"){
              pet11res208="Algunas Veces"
              pet11val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion11[43].Respuestas=="CasiNunca"){
              pet11res209="Casi Nunca"
              pet11val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion11[43].Respuestas=="Nunca"){
              pet11res210="Nunca"
              pet11val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion11[44].Respuestas=="Siempre"){
            pet11res211="Siempre"
            pet11val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion11[44].Respuestas=="CasiSiempre"){
            pet11res212="Casi Siempre"
            pet11val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion11[44].Respuestas=="AlgunasVeces"){
            pet11res213="Algunas Veces"
            pet11val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion11[44].Respuestas=="CasiNunca"){
            pet11res214="Casi Nunca"
            pet11val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion11[44].Respuestas=="Nunca"){
            pet11res215="Nunca"
            pet11val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion11[46].Respuestas=="Siempre"){
          pet11res216="Siempre"
          pet11val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion11[46].Respuestas=="CasiSiempre"){
          pet11res217="Casi Siempre"
          pet11val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion11[46].Respuestas=="AlgunasVeces"){
          pet11res218="Algunas Veces"
          pet11val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion11[46].Respuestas=="CasiNunca"){
          pet11res219="Casi Nunca"
          pet11val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion11[46].Respuestas=="Nunca"){
          pet11res220="Nunca"
          pet11val44= this.state.getPonderacion[43].nunca
        }
  
      if(this.state.peticion11[47].Respuestas=="Siempre"){
        pet11res221="Siempre"
        pet11val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion11[47].Respuestas=="CasiSiempre"){
        pet11res222="Casi Siempre"
        pet11val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion11[47].Respuestas=="AlgunasVeces"){
        pet11res223="Algunas Veces"
        pet11val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion11[47].Respuestas=="CasiNunca"){
        pet11res224="Casi Nunca"
        pet11val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion11[47].Respuestas=="Nunca"){
        pet11res225="Nunca"
        pet11val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion11[48].Respuestas=="Siempre"){
        pet11res226="Siempre"
        pet11val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion11[48].Respuestas=="CasiSiempre"){
        pet11res227="Casi Siempre"
        pet11val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion11[48].Respuestas=="AlgunasVeces"){
        pet11res228="Algunas Veces"
        pet11val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion11[48].Respuestas=="CasiNunca"){
        pet11res229="Casi Nunca"
        pet11val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion11[48].Respuestas=="Nunca"){
        pet11res230="Nunca"
        pet11val46= this.state.getPonderacion[45].nunca
      }
   } 
   ///////////////////////////////////////////////////////////////////////////////
     ///////////////////////////////////////////////////////////////////////////////////////////////////////

  if(this.state.peticion12.length>0){

    if(this.state.peticion12[1].Respuestas=="Siempre"){
      pet12res1="Siempre"
      pet12val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion12[1].Respuestas=="CasiSiempre"){
        pet12res2="Casi Siempre"
        pet12val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion12[1].Respuestas=="AlgunasVeces"){
        pet12res3="Algunas Veces"
        pet12val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion12[1].Respuestas=="CasiNunca"){
        pet12res4="Casi Nunca"
        pet12val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion12[1].Respuestas=="Nunca"){
        pet12res5="Nunca"
        pet12val1= this.state.getPonderacion[0].nunca
      } 
  
  
    if(this.state.peticion12[2].Respuestas=="Siempre"){
      pet12res6="Siempre"
      pet12val2= this.state.peticion12[1].siempre
      }else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiSiempre"){
        pet12res7="Casi Siempre"
        pet12val2= this.state.peticion12[1].casisiempre
      }
      else if(this.state.resultadosEvaluacion[2].Respuestas=="AlgunasVeces"){
        pet12res8="Algunas Veces"
        pet12val2= this.state.peticion12[1].algunasveces
      } 
      else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiNunca"){
        pet12res9="Casi Nunca"
        pet12val2= this.state.peticion12[2].casinunca
      } 
      else if(this.state.peticion12[2].Respuestas=="Nunca"){
        pet12res10="Nunca"
        pet12val2= this.state.peticion12[1].nunca
      } 
  
      if(this.state.peticion12[3].Respuestas=="Siempre"){
        pet12res11="Siempre"
        pet12val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion12[3].Respuestas=="CasiSiempre"){
          pet12res12="Casi Siempre"
          pet12val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion12[3].Respuestas=="AlgunasVeces"){
          pet12res13="Algunas Veces"
          pet12val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion12[3].Respuestas=="CasiNunca"){
          pet12res14="Casi Nunca"
          pet12val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion12[3].Respuestas=="Nunca"){
          pet12res15="Nunca"
          pet12val3= this.state.getPonderacion[2].nunca
        } 
  
  
      if(this.state.peticion12[4].Respuestas=="Siempre"){
        pet12res16="Siempre"
        pet12val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion12[4].Respuestas=="CasiSiempre"){
          pet12res17="Casi Siempre"
          pet12val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion12[4].Respuestas=="AlgunasVeces"){
          pet12res18="Algunas Veces"
          pet12val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion12[4].Respuestas=="CasiNunca"){
          pet12res19="Casi Nunca"
          pet12val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion12[4].Respuestas=="Nunca"){
          pet12res20="Nunca"
          pet12val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion12[5].Respuestas=="Siempre"){
        pet12res21="Siempre"
        pet12val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion12[5].Respuestas=="CasiSiempre"){
          pet12res22="Casi Siempre"
          pet12val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion12[5].Respuestas=="AlgunasVeces"){
          pet12res23="Algunas Veces"
          pet12val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion12[5].Respuestas=="CasiNunca"){
          pet12res24="Casi Nunca"
          pet12val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion12[5].Respuestas=="Nunca"){
          pet12res25="Nunca"
          pet12val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion12[6].Respuestas=="Siempre"){
          pet12res26="Siempre"
          pet12val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion12[6].Respuestas=="CasiSiempre"){
            pet12res27="Casi Siempre"
            pet12val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion12[6].Respuestas=="AlgunasVeces"){
            pet12res28="Algunas Veces"
            pet12val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion12[6].Respuestas=="CasiNunca"){
            pet12res29="Casi Nunca"
            pet12val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion12[6].Respuestas=="Nunca"){
            pet12res30="Nunca"
            pet12val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion12[7].Respuestas=="Siempre"){
          pet12res31="Siempre"
          pet12val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion12[7].Respuestas=="CasiSiempre"){
            pet12res32="Casi Siempre"
            pet12val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion12[7].Respuestas=="AlgunasVeces"){
            pet12res33="Algunas Veces"
            pet12val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion12[7].Respuestas=="CasiNunca"){
            pet12res34="Casi Nunca"
            pet12val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion12[7].Respuestas=="Nunca"){
            pet12res35="Nunca"
            pet12val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion12[8].Respuestas=="Siempre"){
            pet12res36="Siempre"
            pet12val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion12[8].Respuestas=="CasiSiempre"){
              pet12res37="Casi Siempre"
              pet12val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion12[8].Respuestas=="AlgunasVeces"){
              pet12res38="Algunas Veces"
              pet12val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion12[8].Respuestas=="CasiNunca"){
              pet12res39="Casi Nunca"
              pet12val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion12[8].Respuestas=="Nunca"){
              pet12res40="Nunca"
              pet12val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion12[9].Respuestas=="Siempre"){
            pet12res41="Siempre"
            pet12val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion12[9].Respuestas=="CasiSiempre"){
              pet12res42="Casi Siempre"
              pet12val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion12[9].Respuestas=="AlgunasVeces"){
              pet12res43="Algunas Veces"
              pet12val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion12[9].Respuestas=="CasiNunca"){
              pet12res44="Casi Nunca"
              pet12val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion12[9].Respuestas=="Nunca"){
              pet12res45="Nunca"
              pet12val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion12[10].Respuestas=="Siempre"){
          pet12res46="Siempre"
          pet12val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion12[10].Respuestas=="CasiSiempre"){
            pet12res47="Casi Siempre"
            pet12val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion12[10].Respuestas=="AlgunasVeces"){
            pet12res48="Algunas Veces"
            pet12val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion12[10].Respuestas=="CasiNunca"){
            pet12res49="Casi Nunca"
            pet12val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion12[10].Respuestas=="Nunca"){
            pet12res50="Nunca"
            pet12val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion12[11].Respuestas=="Siempre"){
          pet12res51="Siempre"
          pet12val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion12[11].Respuestas=="CasiSiempre"){
            pet12res52="Casi Siempre"
            pet12val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion12[11].Respuestas=="AlgunasVeces"){
            pet12res53="Algunas Veces"
            pet12val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion12[11].Respuestas=="CasiNunca"){
            pet12res54="Casi Nunca"
            pet12val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion12[11].Respuestas=="Nunca"){
            pet12res55="Nunca"
            pet12val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion12[12].Respuestas=="Siempre"){
          pet12res56="Siempre"
          pet12val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion12[12].Respuestas=="CasiSiempre"){
            pet12res57="Casi Siempre"
            pet12val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion12[12].Respuestas=="AlgunasVeces"){
            pet12res58="Algunas Veces"
            pet12val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion12[12].Respuestas=="CasiNunca"){
            pet12res59="Casi Nunca"
            pet12val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion12[12].Respuestas=="Nunca"){
            pet12res60="Nunca"
            pet12val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion12[13].Respuestas=="Siempre"){
          pet12res61="Siempre"
          pet12val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion12[13].Respuestas=="CasiSiempre"){
            pet12res62="Casi Siempre"
            pet12val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion12[13].Respuestas=="AlgunasVeces"){
            pet12res63="Algunas Veces"
            pet12val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion12[13].Respuestas=="CasiNunca"){
            pet12res64="Casi Nunca"
            pet12val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion12[13].Respuestas=="Nunca"){
            pet12res65="Nunca"
            pet12val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion12[14].Respuestas=="Siempre"){
          pet12res66="Siempre"
          pet12val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion12[14].Respuestas=="CasiSiempre"){
            pet12res67="Casi Siempre"
            pet12val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion12[14].Respuestas=="AlgunasVeces"){
            pet12res68="Algunas Veces"
            pet12val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion12[14].Respuestas=="CasiNunca"){
            pet12res69="Casi Nunca"
            pet12val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion12[14].Respuestas=="Nunca"){
            pet12res70="Nunca"
            pet12val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion12[15].Respuestas=="Siempre"){
          pet12res71="Siempre"
          pet12val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion12[15].Respuestas=="CasiSiempre"){
            pet12res72="Casi Siempre"
            pet12val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion12[15].Respuestas=="AlgunasVeces"){
            pet12res73="Algunas Veces"
            pet12val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion12[15].Respuestas=="CasiNunca"){
            pet12res74="Casi Nunca"
            pet12val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion12[15].Respuestas=="Nunca"){
            pet12res75="Nunca"
            pet12val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion12[16].Respuestas=="Siempre"){
          pet12res76="Siempre"
          pet12val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion12[16].Respuestas=="CasiSiempre"){
            pet12res77="Casi Siempre"
            pet12val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion12[16].Respuestas=="AlgunasVeces"){
            pet12res78="Algunas Veces"
            pet12val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion12[16].Respuestas=="CasiNunca"){
            pet12res79="Casi Nunca"
            pet12val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion12[16].Respuestas=="Nunca"){
            pet12res80="Nunca"
            pet12val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion12[17].Respuestas=="Siempre"){
          pet12res81="Siempre"
          pet12val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion12[17].Respuestas=="CasiSiempre"){
            pet12res82="Casi Siempre"
            pet12val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion12[17].Respuestas=="AlgunasVeces"){
            pet12res83="Algunas Veces"
            pet12val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion12[17].Respuestas=="CasiNunca"){
            pet12res84="Casi Nunca"
            pet12val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion12[17].Respuestas=="Nunca"){
            pet12res85="Nunca"
            pet12val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion12[18].Respuestas=="Siempre"){
          pet12res86="Siempre"
          pet12val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion12[18].Respuestas=="CasiSiempre"){
            pet12res87="Casi Siempre"
            pet12val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion12[18].Respuestas=="AlgunasVeces"){
            pet12res88="Algunas Veces"
            pet12val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion12[18].Respuestas=="CasiNunca"){
            pet12res89="Casi Nunca"
            pet12val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion12[18].Respuestas=="Nunca"){
            pet12res90="Nunca"
            pet12val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion12[19].Respuestas=="Siempre"){
          pet12res91="Siempre"
          pet12val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion12[19].Respuestas=="CasiSiempre"){
            pet12res92="Casi Siempre"
            pet12val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion12[19].Respuestas=="AlgunasVeces"){
            pet12res93="Algunas Veces"
            pet12val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion12[19].Respuestas=="CasiNunca"){
            pet12res94="Casi Nunca"
            pet12val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion12[19].Respuestas=="Nunca"){
            pet12res95="Nunca"
            pet12val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion12[20].Respuestas=="Siempre"){
          pet12res96="Siempre"
          pet12val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion12[20].Respuestas=="CasiSiempre"){
            pet12res97="Casi Siempre"
            pet12val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion12[20].Respuestas=="AlgunasVeces"){
            pet12res98="Algunas Veces"
            pet12val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion12[20].Respuestas=="CasiNunca"){
            pet12res99="Casi Nunca"
            pet12val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion12[20].Respuestas=="Nunca"){
            pet12res100="Nunca"
            pet12val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion12[21].Respuestas=="Siempre"){
          pet12res101="Siempre"
          pet12val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion12[21].Respuestas=="CasiSiempre"){
            pet12res102="Casi Siempre"
            pet12val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion12[21].Respuestas=="AlgunasVeces"){
            pet12res103="Algunas Veces"
            pet12val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion12[21].Respuestas=="CasiNunca"){
            pet12res104="Casi Nunca"
            pet12val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion12[21].Respuestas=="Nunca"){
            pet12res105="Nunca"
            pet12val21= this.state.getPonderacion[20].nunca
          } 
  
        if(this.state.peticion12[22].Respuestas=="Siempre"){
          pet12res106="Siempre"
          pet12val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion12[22].Respuestas=="CasiSiempre"){
            pet12res107="Casi Siempre"
            pet12val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion12[22].Respuestas=="AlgunasVeces"){
            pet12res108="Algunas Veces"
            pet12val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion12[2].Respuestas=="CasiNunca"){
            pet12res109="Casi Nunca"
            pet12val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion12[22].Respuestas=="Nunca"){
            pet12res110="Nunca"
            pet12val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion12[23].Respuestas=="Siempre"){
          pet12res111="Siempre"
          pet12val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion12[23].Respuestas=="CasiSiempre"){
            pet12res112="Casi Siempre"
            pet12val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion12[23].Respuestas=="AlgunasVeces"){
            pet12res113="Algunas Veces"
            pet12val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion12[23].Respuestas=="CasiNunca"){
            pet12res114="Casi Nunca"
            pet12val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion12[23].Respuestas=="Nunca"){
            pet12res115="Nunca"
            pet12val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion12[24].Respuestas=="Siempre"){
          pet12res116="Siempre"
          pet12val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion12[24].Respuestas=="CasiSiempre"){
            pet12res117="Casi Siempre"
            pet12val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion12[24].Respuestas=="AlgunasVeces"){
            pet12res118="Algunas Veces"
            pet12val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion12[24].Respuestas=="CasiNunca"){
            pet12res119="Casi Nunca"
            pet12val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion12[24].Respuestas=="Nunca"){
            pet12res120="Nunca"
            pet12val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion12[25].Respuestas=="Siempre"){
          pet12res121="Siempre"
          pet12val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion12[25].Respuestas=="CasiSiempre"){
            pet12res122="Casi Siempre"
            pet12val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion12[25].Respuestas=="AlgunasVeces"){
            pet12res123="Algunas Veces"
            pet12val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion12[25].Respuestas=="CasiNunca"){
            pet12res124="Casi Nunca"
            pet12val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion12[25].Respuestas=="Nunca"){
            pet12res125="Nunca"
            pet12val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion12[26].Respuestas=="Siempre"){
          pet12res126="Siempre"
          pet12val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion12[26].Respuestas=="CasiSiempre"){
            pet12res127="Casi Siempre"
            pet12val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion12[26].Respuestas=="AlgunasVeces"){
            pet12res128="Algunas Veces"
            pet12val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion12[26].Respuestas=="CasiNunca"){
            pet12res129="Casi Nunca"
            pet12val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion12[26].Respuestas=="Nunca"){
            pet12res130="Nunca"
            pet12val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion12[27].Respuestas=="Siempre"){
          pet12res131="Siempre"
          pet12val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion12[27].Respuestas=="CasiSiempre"){
            pet12res132="Casi Siempre"
            pet12val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion12[27].Respuestas=="AlgunasVeces"){
            pet12res133="Algunas Veces"
            pet12val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion12[27].Respuestas=="CasiNunca"){
            pet12res134="Casi Nunca"
            pet12val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion12[27].Respuestas=="Nunca"){
            pet12res135="Nunca"
            pet12val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion12[28].Respuestas=="Siempre"){
        pet12res136="Siempre"
        pet12val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion12[28].Respuestas=="CasiSiempre"){
          pet12res137="Casi Siempre"
          pet12val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion12[28].Respuestas=="AlgunasVeces"){
          pet12res138="Algunas Veces"
          pet12val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion12[28].Respuestas=="CasiNunca"){
          pet12res139="Casi Nunca"
          pet12val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion12[28].Respuestas=="Nunca"){
          pet12res140="Nunca"
          pet12val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion12[29].Respuestas=="Siempre"){
        pet12res141="Siempre"
        pet12val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion12[29].Respuestas=="CasiSiempre"){
          pet12res142="Casi Siempre"
          pet12val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion12[29].Respuestas=="AlgunasVeces"){
          pet12res143="Algunas Veces"
          pet12val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion12[29].Respuestas=="CasiNunca"){
          pet12res144="Casi Nunca"
          pet12val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion12[29].Respuestas=="Nunca"){
          pet12res145="Nunca"
          pet12val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion12[30].Respuestas=="Siempre"){
        pet12res146="Siempre"
        pet12val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion12[30].Respuestas=="CasiSiempre"){
          pet12res147="Casi Siempre"
          pet12val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion12[30].Respuestas=="AlgunasVeces"){
          pet12res148="Algunas Veces"
          pet12val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion12[30].Respuestas=="CasiNunca"){
          pet12res149="Casi Nunca"
          pet12val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion12[30].Respuestas=="Nunca"){
          pet12res150="Nunca"
          pet12val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion12[31].Respuestas=="Siempre"){
        pet12res151="Siempre"
        pet12val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion12[31].Respuestas=="CasiSiempre"){
          pet12res152="Casi Siempre"
          pet12val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion12[31].Respuestas=="AlgunasVeces"){
          pet12res153="Algunas Veces"
          pet12val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion12[31].Respuestas=="CasiNunca"){
          pet12res154="Casi Nunca"
          pet12val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion12[31].Respuestas=="Nunca"){
          pet12res155="Nunca"
          pet12val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion12[32].Respuestas=="Siempre"){
        pet12res156="Siempre"
        pet12val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion12[32].Respuestas=="CasiSiempre"){
          pet12res157="Casi Siempre"
          pet12val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion12[32].Respuestas=="AlgunasVeces"){
          pet12res158="Algunas Veces"
          pet12val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion12[32].Respuestas=="CasiNunca"){
          pet12res159="Casi Nunca"
          pet12val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion12[32].Respuestas=="Nunca"){
          pet12res160="Nunca"
          pet12val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion12[33].Respuestas=="Siempre"){
          pet12res161="Siempre"
          pet12val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion12[33].Respuestas=="CasiSiempre"){
            pet12res162="Casi Siempre"
            pet12val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion12[33].Respuestas=="AlgunasVeces"){
            pet12res163="Algunas Veces"
            pet12val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion12[33].Respuestas=="CasiNunca"){
            pet12res164="Casi Nunca"
            pet12val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion12[33].Respuestas=="Nunca"){
            pet12res165="Nunca"
            pet12val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion12[34].Respuestas=="Siempre"){
          pet12res166="Siempre"
          pet12val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion12[34].Respuestas=="CasiSiempre"){
            pet12res167="Casi Siempre"
            pet12val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion12[34].Respuestas=="AlgunasVeces"){
            pet12res168="Algunas Veces"
            pet12val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion12[34].Respuestas=="CasiNunca"){
            pet12res169="Casi Nunca"
            pet12val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion12[34].Respuestas=="Nunca"){
            pet12res170="Nunca"
            pet12val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion12[35].Respuestas=="Siempre"){
            pet12res171="Siempre"
            pet12val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion12[35].Respuestas=="CasiSiempre"){
              pet12res172="Casi Siempre"
              pet12val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion12[35].Respuestas=="AlgunasVeces"){
              pet12res173="Algunas Veces"
              pet12val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion12[35].Respuestas=="CasiNunca"){
              pet12res174="Casi Nunca"
              pet12val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion12[15].Respuestas=="Nunca"){
              pet12res175="Nunca"
              pet12val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion12[36].Respuestas=="Siempre"){
            pet12res176="Siempre"
            pet12val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion12[36].Respuestas=="CasiSiempre"){
              pet12res177="Casi Siempre"
              pet12val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion12[36].Respuestas=="AlgunasVeces"){
              pet12res178="Algunas Veces"
              pet12val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion12[36].Respuestas=="CasiNunca"){
              pet12res179="Casi Nunca"
              pet12val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion12[36].Respuestas=="Nunca"){
              pet12res180="Nunca"
              pet12val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion12[37].Respuestas=="Siempre"){
            pet12res181="Siempre"
            pet12val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion12[37].Respuestas=="CasiSiempre"){
              pet12res182="Casi Siempre"
              pet12val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion12[37].Respuestas=="AlgunasVeces"){
              pet12res183="Algunas Veces"
              pet12val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion12[37].Respuestas=="CasiNunca"){
              pet12res184="Casi Nunca"
              pet12val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion12[37].Respuestas=="Nunca"){
              pet12res185="Nunca"
              pet12val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion12[38].Respuestas=="Siempre"){
            pet12res186="Siempre"
            pet12val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion12[38].Respuestas=="CasiSiempre"){
              pet12res187="Casi Siempre"
              pet12val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion12[38].Respuestas=="AlgunasVeces"){
              pet12res188="Algunas Veces"
              pet12val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion12[38].Respuestas=="CasiNunca"){
              pet12res189="Casi Nunca"
              pet12val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion12[38].Respuestas=="Nunca"){
              pet12res190="Nunca"
              pet12val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion12[39].Respuestas=="Siempre"){
              pet12res191="Siempre"
              pet12val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion12[39].Respuestas=="CasiSiempre"){
                pet12res192="Casi Siempre"
                pet12val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion12[39].Respuestas=="AlgunasVeces"){
                pet12res193="Algunas Veces"
                pet12val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion12[39].Respuestas=="CasiNunca"){
                pet12res194="Casi Nunca"
                pet12val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion12[39].Respuestas=="Nunca"){
                pet12res195="Nunca"
                pet12val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion12[40].Respuestas=="Siempre"){
                pet12res196="Siempre"
                pet12val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion12[40].Respuestas=="CasiSiempre"){
                  pet12res197="Casi Siempre"
                  pet12val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion12[40].Respuestas=="AlgunasVeces"){
                  pet12res198="Algunas Veces"
                  pet12val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion12[40].Respuestas=="CasiNunca"){
                  pet12res199="Casi Nunca"
                  pet12val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion12[40].Respuestas=="Nunca"){
                  pet12res200="Nunca"
                  pet12val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion12[42].Respuestas=="Siempre"){
                pet12res201="Siempre"
                pet12val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion12[42].Respuestas=="CasiSiempre"){
                pet12res202="Casi Siempre"
                pet12val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion12[42].Respuestas=="AlgunasVeces"){
                pet12res203="Algunas Veces"
                pet12val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion12[42].Respuestas=="CasiNunca"){
                pet12res204="Casi Nunca"
                pet12val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion12[42].Respuestas=="Nunca"){
                pet12res205="Nunca"
                pet12val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion12[43].Respuestas=="Siempre"){
              pet12res206="Siempre"
              pet12val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion12[43].Respuestas=="CasiSiempre"){
              pet12res207="Casi Siempre"
              pet12val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion12[43].Respuestas=="AlgunasVeces"){
              pet12res208="Algunas Veces"
              pet12val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion12[43].Respuestas=="CasiNunca"){
              pet12res209="Casi Nunca"
              pet12val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion12[43].Respuestas=="Nunca"){
              pet12res210="Nunca"
              pet12val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion12[44].Respuestas=="Siempre"){
            pet12res211="Siempre"
            pet12val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion12[44].Respuestas=="CasiSiempre"){
            pet12res212="Casi Siempre"
            pet12val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion12[44].Respuestas=="AlgunasVeces"){
            pet12res213="Algunas Veces"
            pet12val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion12[44].Respuestas=="CasiNunca"){
            pet12res214="Casi Nunca"
            pet12val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion12[44].Respuestas=="Nunca"){
            pet12res215="Nunca"
            pet12val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion12[46].Respuestas=="Siempre"){
          pet12res216="Siempre"
          pet12val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion12[46].Respuestas=="CasiSiempre"){
          pet12res217="Casi Siempre"
          pet12val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion12[46].Respuestas=="AlgunasVeces"){
          pet12res218="Algunas Veces"
          pet12val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion12[46].Respuestas=="CasiNunca"){
          pet12res219="Casi Nunca"
          pet12val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion12[46].Respuestas=="Nunca"){
          pet12res220="Nunca"
          pet12val44= this.state.getPonderacion[43].nunca
        }
  
      if(this.state.peticion12[47].Respuestas=="Siempre"){
        pet12res221="Siempre"
        pet12val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion12[47].Respuestas=="CasiSiempre"){
        pet12res222="Casi Siempre"
        pet12val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion12[47].Respuestas=="AlgunasVeces"){
        pet12res223="Algunas Veces"
        pet12val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion12[47].Respuestas=="CasiNunca"){
        pet12res224="Casi Nunca"
        pet12val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion12[47].Respuestas=="Nunca"){
        pet12res225="Nunca"
        pet12val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion12[48].Respuestas=="Siempre"){
        pet12res226="Siempre"
        pet12val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion12[48].Respuestas=="CasiSiempre"){
        pet12res227="Casi Siempre"
        pet12val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion12[48].Respuestas=="AlgunasVeces"){
        pet12res228="Algunas Veces"
        pet12val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion12[48].Respuestas=="CasiNunca"){
        pet12res229="Casi Nunca"
        pet12val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion12[48].Respuestas=="Nunca"){
        pet12res230="Nunca"
        pet12val46= this.state.getPonderacion[45].nunca
      }
   } 
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////////////////////////////////////////////////////////////////////////////////

  if(this.state.peticion13.length>0){

    if(this.state.peticion13[1].Respuestas=="Siempre"){
      pet13res1="Siempre"
      pet13val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion13[1].Respuestas=="CasiSiempre"){
        pet13res2="Casi Siempre"
        pet13val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion13[1].Respuestas=="AlgunasVeces"){
        pet13res3="Algunas Veces"
        pet13val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion13[1].Respuestas=="CasiNunca"){
        pet13res4="Casi Nunca"
        pet13val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion13[1].Respuestas=="Nunca"){
        pet13res5="Nunca"
        pet13val1= this.state.getPonderacion[0].nunca
      } 
  
  
    if(this.state.peticion13[2].Respuestas=="Siempre"){
      pet13res6="Siempre"
      pet13val2= this.state.peticion13[1].siempre
      }else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiSiempre"){
        pet13res7="Casi Siempre"
        pet13val2= this.state.peticion13[1].casisiempre
      }
      else if(this.state.resultadosEvaluacion[2].Respuestas=="AlgunasVeces"){
        pet13res8="Algunas Veces"
        pet13val2= this.state.peticion13[1].algunasveces
      } 
      else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiNunca"){
        pet13res9="Casi Nunca"
        pet13val2= this.state.peticion13[2].casinunca
      } 
      else if(this.state.peticion13[2].Respuestas=="Nunca"){
        pet13res10="Nunca"
        pet13val2= this.state.peticion13[1].nunca
      } 
  
      if(this.state.peticion13[3].Respuestas=="Siempre"){
        pet13res11="Siempre"
        pet13val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion13[3].Respuestas=="CasiSiempre"){
          pet13res12="Casi Siempre"
          pet13val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion13[3].Respuestas=="AlgunasVeces"){
          pet13res13="Algunas Veces"
          pet13val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion13[3].Respuestas=="CasiNunca"){
          pet13res14="Casi Nunca"
          pet13val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion13[3].Respuestas=="Nunca"){
          pet13res15="Nunca"
          pet13val3= this.state.getPonderacion[2].nunca
        } 
  
  
      if(this.state.peticion13[4].Respuestas=="Siempre"){
        pet13res16="Siempre"
        pet13val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion13[4].Respuestas=="CasiSiempre"){
          pet13res17="Casi Siempre"
          pet13val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion13[4].Respuestas=="AlgunasVeces"){
          pet13res18="Algunas Veces"
          pet13val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion13[4].Respuestas=="CasiNunca"){
          pet13res19="Casi Nunca"
          pet13val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion13[4].Respuestas=="Nunca"){
          pet13res20="Nunca"
          pet13val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion13[5].Respuestas=="Siempre"){
        pet13res21="Siempre"
        pet13val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion13[5].Respuestas=="CasiSiempre"){
          pet13res22="Casi Siempre"
          pet13val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion13[5].Respuestas=="AlgunasVeces"){
          pet13res23="Algunas Veces"
          pet13val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion13[5].Respuestas=="CasiNunca"){
          pet13res24="Casi Nunca"
          pet13val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion13[5].Respuestas=="Nunca"){
          pet13res25="Nunca"
          pet13val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion13[6].Respuestas=="Siempre"){
          pet13res26="Siempre"
          pet13val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion13[6].Respuestas=="CasiSiempre"){
            pet13res27="Casi Siempre"
            pet13val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion13[6].Respuestas=="AlgunasVeces"){
            pet13res28="Algunas Veces"
            pet13val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion13[6].Respuestas=="CasiNunca"){
            pet13res29="Casi Nunca"
            pet13val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion13[6].Respuestas=="Nunca"){
            pet13res30="Nunca"
            pet13val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion13[7].Respuestas=="Siempre"){
          pet13res31="Siempre"
          pet13val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion13[7].Respuestas=="CasiSiempre"){
            pet13res32="Casi Siempre"
            pet13val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion13[7].Respuestas=="AlgunasVeces"){
            pet13res33="Algunas Veces"
            pet13val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion13[7].Respuestas=="CasiNunca"){
            pet13res34="Casi Nunca"
            pet13val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion13[7].Respuestas=="Nunca"){
            pet13res35="Nunca"
            pet13val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion13[8].Respuestas=="Siempre"){
            pet13res36="Siempre"
            pet13val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion13[8].Respuestas=="CasiSiempre"){
              pet13res37="Casi Siempre"
              pet13val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion13[8].Respuestas=="AlgunasVeces"){
              pet13res38="Algunas Veces"
              pet13val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion13[8].Respuestas=="CasiNunca"){
              pet13res39="Casi Nunca"
              pet13val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion13[8].Respuestas=="Nunca"){
              pet13res40="Nunca"
              pet13val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion13[9].Respuestas=="Siempre"){
            pet13res41="Siempre"
            pet13val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion13[9].Respuestas=="CasiSiempre"){
              pet13res42="Casi Siempre"
              pet13val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion13[9].Respuestas=="AlgunasVeces"){
              pet13res43="Algunas Veces"
              pet13val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion13[9].Respuestas=="CasiNunca"){
              pet13res44="Casi Nunca"
              pet13val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion13[9].Respuestas=="Nunca"){
              pet13res45="Nunca"
              pet13val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion13[10].Respuestas=="Siempre"){
          pet13res46="Siempre"
          pet13val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion13[10].Respuestas=="CasiSiempre"){
            pet13res47="Casi Siempre"
            pet13val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion13[10].Respuestas=="AlgunasVeces"){
            pet13res48="Algunas Veces"
            pet13val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion13[10].Respuestas=="CasiNunca"){
            pet13res49="Casi Nunca"
            pet13val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion13[10].Respuestas=="Nunca"){
            pet13res50="Nunca"
            pet13val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion13[11].Respuestas=="Siempre"){
          pet13res51="Siempre"
          pet13val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion13[11].Respuestas=="CasiSiempre"){
            pet13res52="Casi Siempre"
            pet13val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion13[11].Respuestas=="AlgunasVeces"){
            pet13res53="Algunas Veces"
            pet13val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion13[11].Respuestas=="CasiNunca"){
            pet13res54="Casi Nunca"
            pet13val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion13[11].Respuestas=="Nunca"){
            pet13res55="Nunca"
            pet13val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion13[12].Respuestas=="Siempre"){
          pet13res56="Siempre"
          pet13val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion13[12].Respuestas=="CasiSiempre"){
            pet13res57="Casi Siempre"
            pet13val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion13[12].Respuestas=="AlgunasVeces"){
            pet13res58="Algunas Veces"
            pet13val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion13[12].Respuestas=="CasiNunca"){
            pet13res59="Casi Nunca"
            pet13val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion13[12].Respuestas=="Nunca"){
            pet13res60="Nunca"
            pet13val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion13[13].Respuestas=="Siempre"){
          pet13res61="Siempre"
          pet13val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion13[13].Respuestas=="CasiSiempre"){
            pet13res62="Casi Siempre"
            pet13val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion13[13].Respuestas=="AlgunasVeces"){
            pet13res63="Algunas Veces"
            pet13val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion13[13].Respuestas=="CasiNunca"){
            pet13res64="Casi Nunca"
            pet13val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion13[13].Respuestas=="Nunca"){
            pet13res65="Nunca"
            pet13val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion13[14].Respuestas=="Siempre"){
          pet13res66="Siempre"
          pet13val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion13[14].Respuestas=="CasiSiempre"){
            pet13res67="Casi Siempre"
            pet13val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion13[14].Respuestas=="AlgunasVeces"){
            pet13res68="Algunas Veces"
            pet13val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion13[14].Respuestas=="CasiNunca"){
            pet13res69="Casi Nunca"
            pet13val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion13[14].Respuestas=="Nunca"){
            pet13res70="Nunca"
            pet13val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion13[15].Respuestas=="Siempre"){
          pet13res71="Siempre"
          pet13val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion13[15].Respuestas=="CasiSiempre"){
            pet13res72="Casi Siempre"
            pet13val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion13[15].Respuestas=="AlgunasVeces"){
            pet13res73="Algunas Veces"
            pet13val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion13[15].Respuestas=="CasiNunca"){
            pet13res74="Casi Nunca"
            pet13val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion13[15].Respuestas=="Nunca"){
            pet13res75="Nunca"
            pet13val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion13[16].Respuestas=="Siempre"){
          pet13res76="Siempre"
          pet13val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion13[16].Respuestas=="CasiSiempre"){
            pet13res77="Casi Siempre"
            pet13val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion13[16].Respuestas=="AlgunasVeces"){
            pet13res78="Algunas Veces"
            pet13val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion13[16].Respuestas=="CasiNunca"){
            pet13res79="Casi Nunca"
            pet13val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion13[16].Respuestas=="Nunca"){
            pet13res80="Nunca"
            pet13val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion13[17].Respuestas=="Siempre"){
          pet13res81="Siempre"
          pet13val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion13[17].Respuestas=="CasiSiempre"){
            pet13res82="Casi Siempre"
            pet13val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion13[17].Respuestas=="AlgunasVeces"){
            pet13res83="Algunas Veces"
            pet13val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion13[17].Respuestas=="CasiNunca"){
            pet13res84="Casi Nunca"
            pet13val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion13[17].Respuestas=="Nunca"){
            pet13res85="Nunca"
            pet13val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion13[18].Respuestas=="Siempre"){
          pet13res86="Siempre"
          pet13val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion13[18].Respuestas=="CasiSiempre"){
            pet13res87="Casi Siempre"
            pet13val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion13[18].Respuestas=="AlgunasVeces"){
            pet13res88="Algunas Veces"
            pet13val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion13[18].Respuestas=="CasiNunca"){
            pet13res89="Casi Nunca"
            pet13val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion13[18].Respuestas=="Nunca"){
            pet13res90="Nunca"
            pet13val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion13[19].Respuestas=="Siempre"){
          pet13res91="Siempre"
          pet13val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion13[19].Respuestas=="CasiSiempre"){
            pet13res92="Casi Siempre"
            pet13val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion13[19].Respuestas=="AlgunasVeces"){
            pet13res93="Algunas Veces"
            pet13val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion13[19].Respuestas=="CasiNunca"){
            pet13res94="Casi Nunca"
            pet13val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion13[19].Respuestas=="Nunca"){
            pet13res95="Nunca"
            pet13val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion13[20].Respuestas=="Siempre"){
          pet13res96="Siempre"
          pet13val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion13[20].Respuestas=="CasiSiempre"){
            pet13res97="Casi Siempre"
            pet13val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion13[20].Respuestas=="AlgunasVeces"){
            pet13res98="Algunas Veces"
            pet13val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion13[20].Respuestas=="CasiNunca"){
            pet13res99="Casi Nunca"
            pet13val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion13[20].Respuestas=="Nunca"){
            pet13res100="Nunca"
            pet13val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion13[21].Respuestas=="Siempre"){
          pet13res101="Siempre"
          pet13val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion13[21].Respuestas=="CasiSiempre"){
            pet13res102="Casi Siempre"
            pet13val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion13[21].Respuestas=="AlgunasVeces"){
            pet13res103="Algunas Veces"
            pet13val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion13[21].Respuestas=="CasiNunca"){
            pet13res104="Casi Nunca"
            pet13val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion13[21].Respuestas=="Nunca"){
            pet13res105="Nunca"
            pet13val21= this.state.getPonderacion[20].nunca
          } 
  
        if(this.state.peticion13[22].Respuestas=="Siempre"){
          pet13res106="Siempre"
          pet13val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion13[22].Respuestas=="CasiSiempre"){
            pet13res107="Casi Siempre"
            pet13val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion13[22].Respuestas=="AlgunasVeces"){
            pet13res108="Algunas Veces"
            pet13val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion13[2].Respuestas=="CasiNunca"){
            pet13res109="Casi Nunca"
            pet13val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion13[22].Respuestas=="Nunca"){
            pet13res110="Nunca"
            pet13val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion13[23].Respuestas=="Siempre"){
          pet13res111="Siempre"
          pet13val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion13[23].Respuestas=="CasiSiempre"){
            pet13res112="Casi Siempre"
            pet13val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion13[23].Respuestas=="AlgunasVeces"){
            pet13res113="Algunas Veces"
            pet13val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion13[23].Respuestas=="CasiNunca"){
            pet13res114="Casi Nunca"
            pet13val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion13[23].Respuestas=="Nunca"){
            pet13res115="Nunca"
            pet13val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion13[24].Respuestas=="Siempre"){
          pet13res116="Siempre"
          pet13val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion13[24].Respuestas=="CasiSiempre"){
            pet13res117="Casi Siempre"
            pet13val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion13[24].Respuestas=="AlgunasVeces"){
            pet13res118="Algunas Veces"
            pet13val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion13[24].Respuestas=="CasiNunca"){
            pet13res119="Casi Nunca"
            pet13val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion13[24].Respuestas=="Nunca"){
            pet13res120="Nunca"
            pet13val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion13[25].Respuestas=="Siempre"){
          pet13res121="Siempre"
          pet13val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion13[25].Respuestas=="CasiSiempre"){
            pet13res122="Casi Siempre"
            pet13val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion13[25].Respuestas=="AlgunasVeces"){
            pet13res123="Algunas Veces"
            pet13val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion13[25].Respuestas=="CasiNunca"){
            pet13res124="Casi Nunca"
            pet13val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion13[25].Respuestas=="Nunca"){
            pet13res125="Nunca"
            pet13val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion13[26].Respuestas=="Siempre"){
          pet13res126="Siempre"
          pet13val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion13[26].Respuestas=="CasiSiempre"){
            pet13res127="Casi Siempre"
            pet13val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion13[26].Respuestas=="AlgunasVeces"){
            pet13res128="Algunas Veces"
            pet13val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion13[26].Respuestas=="CasiNunca"){
            pet13res129="Casi Nunca"
            pet13val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion13[26].Respuestas=="Nunca"){
            pet13res130="Nunca"
            pet13val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion13[27].Respuestas=="Siempre"){
          pet13res131="Siempre"
          pet13val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion13[27].Respuestas=="CasiSiempre"){
            pet13res132="Casi Siempre"
            pet13val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion13[27].Respuestas=="AlgunasVeces"){
            pet13res133="Algunas Veces"
            pet13val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion13[27].Respuestas=="CasiNunca"){
            pet13res134="Casi Nunca"
            pet13val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion13[27].Respuestas=="Nunca"){
            pet13res135="Nunca"
            pet13val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion13[28].Respuestas=="Siempre"){
        pet13res136="Siempre"
        pet13val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion13[28].Respuestas=="CasiSiempre"){
          pet13res137="Casi Siempre"
          pet13val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion13[28].Respuestas=="AlgunasVeces"){
          pet13res138="Algunas Veces"
          pet13val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion13[28].Respuestas=="CasiNunca"){
          pet13res139="Casi Nunca"
          pet13val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion13[28].Respuestas=="Nunca"){
          pet13res140="Nunca"
          pet13val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion13[29].Respuestas=="Siempre"){
        pet13res141="Siempre"
        pet13val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion13[29].Respuestas=="CasiSiempre"){
          pet13res142="Casi Siempre"
          pet13val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion13[29].Respuestas=="AlgunasVeces"){
          pet13res143="Algunas Veces"
          pet13val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion13[29].Respuestas=="CasiNunca"){
          pet13res144="Casi Nunca"
          pet13val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion13[29].Respuestas=="Nunca"){
          pet13res145="Nunca"
          pet13val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion13[30].Respuestas=="Siempre"){
        pet13res146="Siempre"
        pet13val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion13[30].Respuestas=="CasiSiempre"){
          pet13res147="Casi Siempre"
          pet13val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion13[30].Respuestas=="AlgunasVeces"){
          pet13res148="Algunas Veces"
          pet13val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion13[30].Respuestas=="CasiNunca"){
          pet13res149="Casi Nunca"
          pet13val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion13[30].Respuestas=="Nunca"){
          pet13res150="Nunca"
          pet13val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion13[31].Respuestas=="Siempre"){
        pet13res151="Siempre"
        pet13val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion13[31].Respuestas=="CasiSiempre"){
          pet13res152="Casi Siempre"
          pet13val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion13[31].Respuestas=="AlgunasVeces"){
          pet13res153="Algunas Veces"
          pet13val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion13[31].Respuestas=="CasiNunca"){
          pet13res154="Casi Nunca"
          pet13val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion13[31].Respuestas=="Nunca"){
          pet13res155="Nunca"
          pet13val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion13[32].Respuestas=="Siempre"){
        pet13res156="Siempre"
        pet13val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion13[32].Respuestas=="CasiSiempre"){
          pet13res157="Casi Siempre"
          pet13val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion13[32].Respuestas=="AlgunasVeces"){
          pet13res158="Algunas Veces"
          pet13val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion13[32].Respuestas=="CasiNunca"){
          pet13res159="Casi Nunca"
          pet13val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion13[32].Respuestas=="Nunca"){
          pet13res160="Nunca"
          pet13val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion13[33].Respuestas=="Siempre"){
          pet13res161="Siempre"
          pet13val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion13[33].Respuestas=="CasiSiempre"){
            pet13res162="Casi Siempre"
            pet13val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion13[33].Respuestas=="AlgunasVeces"){
            pet13res163="Algunas Veces"
            pet13val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion13[33].Respuestas=="CasiNunca"){
            pet13res164="Casi Nunca"
            pet13val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion13[33].Respuestas=="Nunca"){
            pet13res165="Nunca"
            pet13val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion13[34].Respuestas=="Siempre"){
          pet13res166="Siempre"
          pet13val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion13[34].Respuestas=="CasiSiempre"){
            pet13res167="Casi Siempre"
            pet13val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion13[34].Respuestas=="AlgunasVeces"){
            pet13res168="Algunas Veces"
            pet13val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion13[34].Respuestas=="CasiNunca"){
            pet13res169="Casi Nunca"
            pet13val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion13[34].Respuestas=="Nunca"){
            pet13res170="Nunca"
            pet13val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion13[35].Respuestas=="Siempre"){
            pet13res171="Siempre"
            pet13val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion13[35].Respuestas=="CasiSiempre"){
              pet13res172="Casi Siempre"
              pet13val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion13[35].Respuestas=="AlgunasVeces"){
              pet13res173="Algunas Veces"
              pet13val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion13[35].Respuestas=="CasiNunca"){
              pet13res174="Casi Nunca"
              pet13val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion13[15].Respuestas=="Nunca"){
              pet13res175="Nunca"
              pet13val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion13[36].Respuestas=="Siempre"){
            pet13res176="Siempre"
            pet13val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion13[36].Respuestas=="CasiSiempre"){
              pet13res177="Casi Siempre"
              pet13val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion13[36].Respuestas=="AlgunasVeces"){
              pet13res178="Algunas Veces"
              pet13val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion13[36].Respuestas=="CasiNunca"){
              pet13res179="Casi Nunca"
              pet13val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion13[36].Respuestas=="Nunca"){
              pet13res180="Nunca"
              pet13val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion13[37].Respuestas=="Siempre"){
            pet13res181="Siempre"
            pet13val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion13[37].Respuestas=="CasiSiempre"){
              pet13res182="Casi Siempre"
              pet13val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion13[37].Respuestas=="AlgunasVeces"){
              pet13res183="Algunas Veces"
              pet13val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion13[37].Respuestas=="CasiNunca"){
              pet13res184="Casi Nunca"
              pet13val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion13[37].Respuestas=="Nunca"){
              pet13res185="Nunca"
              pet13val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion13[38].Respuestas=="Siempre"){
            pet13res186="Siempre"
            pet13val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion13[38].Respuestas=="CasiSiempre"){
              pet13res187="Casi Siempre"
              pet13val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion13[38].Respuestas=="AlgunasVeces"){
              pet13res188="Algunas Veces"
              pet13val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion13[38].Respuestas=="CasiNunca"){
              pet13res189="Casi Nunca"
              pet13val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion13[38].Respuestas=="Nunca"){
              pet13res190="Nunca"
              pet13val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion13[39].Respuestas=="Siempre"){
              pet13res191="Siempre"
              pet13val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion13[39].Respuestas=="CasiSiempre"){
                pet13res192="Casi Siempre"
                pet13val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion13[39].Respuestas=="AlgunasVeces"){
                pet13res193="Algunas Veces"
                pet13val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion13[39].Respuestas=="CasiNunca"){
                pet13res194="Casi Nunca"
                pet13val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion13[39].Respuestas=="Nunca"){
                pet13res195="Nunca"
                pet13val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion13[40].Respuestas=="Siempre"){
                pet13res196="Siempre"
                pet13val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion13[40].Respuestas=="CasiSiempre"){
                  pet13res197="Casi Siempre"
                  pet13val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion13[40].Respuestas=="AlgunasVeces"){
                  pet13res198="Algunas Veces"
                  pet13val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion13[40].Respuestas=="CasiNunca"){
                  pet13res199="Casi Nunca"
                  pet13val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion13[40].Respuestas=="Nunca"){
                  pet13res200="Nunca"
                  pet13val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion13[42].Respuestas=="Siempre"){
                pet13res201="Siempre"
                pet13val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion13[42].Respuestas=="CasiSiempre"){
                pet13res202="Casi Siempre"
                pet13val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion13[42].Respuestas=="AlgunasVeces"){
                pet13res203="Algunas Veces"
                pet13val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion13[42].Respuestas=="CasiNunca"){
                pet13res204="Casi Nunca"
                pet13val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion13[42].Respuestas=="Nunca"){
                pet13res205="Nunca"
                pet13val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion13[43].Respuestas=="Siempre"){
              pet13res206="Siempre"
              pet13val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion13[43].Respuestas=="CasiSiempre"){
              pet13res207="Casi Siempre"
              pet13val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion13[43].Respuestas=="AlgunasVeces"){
              pet13res208="Algunas Veces"
              pet13val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion13[43].Respuestas=="CasiNunca"){
              pet13res209="Casi Nunca"
              pet13val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion13[43].Respuestas=="Nunca"){
              pet13res210="Nunca"
              pet13val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion13[44].Respuestas=="Siempre"){
            pet13res211="Siempre"
            pet13val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion13[44].Respuestas=="CasiSiempre"){
            pet13res212="Casi Siempre"
            pet13val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion13[44].Respuestas=="AlgunasVeces"){
            pet13res213="Algunas Veces"
            pet13val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion13[44].Respuestas=="CasiNunca"){
            pet13res214="Casi Nunca"
            pet13val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion13[44].Respuestas=="Nunca"){
            pet13res215="Nunca"
            pet13val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion13[46].Respuestas=="Siempre"){
          pet13res216="Siempre"
          pet13val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion13[46].Respuestas=="CasiSiempre"){
          pet13res217="Casi Siempre"
          pet13val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion13[46].Respuestas=="AlgunasVeces"){
          pet13res218="Algunas Veces"
          pet13val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion13[46].Respuestas=="CasiNunca"){
          pet13res219="Casi Nunca"
          pet13val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion13[46].Respuestas=="Nunca"){
          pet13res220="Nunca"
          pet13val44= this.state.getPonderacion[43].nunca
        }
  
      if(this.state.peticion13[47].Respuestas=="Siempre"){
        pet13res221="Siempre"
        pet13val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion13[47].Respuestas=="CasiSiempre"){
        pet13res222="Casi Siempre"
        pet13val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion13[47].Respuestas=="AlgunasVeces"){
        pet13res223="Algunas Veces"
        pet13val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion13[47].Respuestas=="CasiNunca"){
        pet13res224="Casi Nunca"
        pet13val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion13[47].Respuestas=="Nunca"){
        pet13res225="Nunca"
        pet13val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion13[48].Respuestas=="Siempre"){
        pet13res226="Siempre"
        pet13val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion13[48].Respuestas=="CasiSiempre"){
        pet13res227="Casi Siempre"
        pet13val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion13[48].Respuestas=="AlgunasVeces"){
        pet13res228="Algunas Veces"
        pet13val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion13[48].Respuestas=="CasiNunca"){
        pet13res229="Casi Nunca"
        pet13val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion13[48].Respuestas=="Nunca"){
        pet13res230="Nunca"
        pet13val46= this.state.getPonderacion[45].nunca
      }
 } 
   ///////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////////////////////////////////////////////////////////////////////////////////

  if(this.state.peticion14.length>0){

    if(this.state.peticion14[1].Respuestas=="Siempre"){
      pet14res1="Siempre"
      pet14val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion14[1].Respuestas=="CasiSiempre"){
        pet14res2="Casi Siempre"
        pet14val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion14[1].Respuestas=="AlgunasVeces"){
        pet14res3="Algunas Veces"
        pet14val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion14[1].Respuestas=="CasiNunca"){
        pet14res4="Casi Nunca"
        pet14val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion14[1].Respuestas=="Nunca"){
        pet14res5="Nunca"
        pet14val1= this.state.getPonderacion[0].nunca
      } 
  
  
    if(this.state.peticion14[2].Respuestas=="Siempre"){
      pet14res6="Siempre"
      pet14val2= this.state.peticion14[1].siempre
      }else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiSiempre"){
        pet14res7="Casi Siempre"
        pet14val2= this.state.peticion14[1].casisiempre
      }
      else if(this.state.resultadosEvaluacion[2].Respuestas=="AlgunasVeces"){
        pet14res8="Algunas Veces"
        pet14val2= this.state.peticion14[1].algunasveces
      } 
      else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiNunca"){
        pet14res9="Casi Nunca"
        pet14val2= this.state.peticion14[2].casinunca
      } 
      else if(this.state.peticion14[2].Respuestas=="Nunca"){
        pet14res10="Nunca"
        pet14val2= this.state.peticion14[1].nunca
      } 
  
      if(this.state.peticion14[3].Respuestas=="Siempre"){
        pet14res11="Siempre"
        pet14val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion14[3].Respuestas=="CasiSiempre"){
          pet14res12="Casi Siempre"
          pet14val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion14[3].Respuestas=="AlgunasVeces"){
          pet14res13="Algunas Veces"
          pet14val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion14[3].Respuestas=="CasiNunca"){
          pet14res14="Casi Nunca"
          pet14val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion14[3].Respuestas=="Nunca"){
          pet14res15="Nunca"
          pet14val3= this.state.getPonderacion[2].nunca
        } 
  
  
      if(this.state.peticion14[4].Respuestas=="Siempre"){
        pet14res16="Siempre"
        pet14val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion14[4].Respuestas=="CasiSiempre"){
          pet14res17="Casi Siempre"
          pet14val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion14[4].Respuestas=="AlgunasVeces"){
          pet14res18="Algunas Veces"
          pet14val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion14[4].Respuestas=="CasiNunca"){
          pet14res19="Casi Nunca"
          pet14val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion14[4].Respuestas=="Nunca"){
          pet14res20="Nunca"
          pet14val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion14[5].Respuestas=="Siempre"){
        pet14res21="Siempre"
        pet14val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion14[5].Respuestas=="CasiSiempre"){
          pet14res22="Casi Siempre"
          pet14val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion14[5].Respuestas=="AlgunasVeces"){
          pet14res23="Algunas Veces"
          pet14val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion14[5].Respuestas=="CasiNunca"){
          pet14res24="Casi Nunca"
          pet14val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion14[5].Respuestas=="Nunca"){
          pet14res25="Nunca"
          pet14val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion14[6].Respuestas=="Siempre"){
          pet14res26="Siempre"
          pet14val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion14[6].Respuestas=="CasiSiempre"){
            pet14res27="Casi Siempre"
            pet14val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion14[6].Respuestas=="AlgunasVeces"){
            pet14res28="Algunas Veces"
            pet14val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion14[6].Respuestas=="CasiNunca"){
            pet14res29="Casi Nunca"
            pet14val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion14[6].Respuestas=="Nunca"){
            pet14res30="Nunca"
            pet14val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion14[7].Respuestas=="Siempre"){
          pet14res31="Siempre"
          pet14val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion14[7].Respuestas=="CasiSiempre"){
            pet14res32="Casi Siempre"
            pet14val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion14[7].Respuestas=="AlgunasVeces"){
            pet14res33="Algunas Veces"
            pet14val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion14[7].Respuestas=="CasiNunca"){
            pet14res34="Casi Nunca"
            pet14val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion14[7].Respuestas=="Nunca"){
            pet14res35="Nunca"
            pet14val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion14[8].Respuestas=="Siempre"){
            pet14res36="Siempre"
            pet14val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion14[8].Respuestas=="CasiSiempre"){
              pet14res37="Casi Siempre"
              pet14val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion14[8].Respuestas=="AlgunasVeces"){
              pet14res38="Algunas Veces"
              pet14val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion14[8].Respuestas=="CasiNunca"){
              pet14res39="Casi Nunca"
              pet14val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion14[8].Respuestas=="Nunca"){
              pet14res40="Nunca"
              pet14val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion14[9].Respuestas=="Siempre"){
            pet14res41="Siempre"
            pet14val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion14[9].Respuestas=="CasiSiempre"){
              pet14res42="Casi Siempre"
              pet14val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion14[9].Respuestas=="AlgunasVeces"){
              pet14res43="Algunas Veces"
              pet14val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion14[9].Respuestas=="CasiNunca"){
              pet14res44="Casi Nunca"
              pet14val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion14[9].Respuestas=="Nunca"){
              pet14res45="Nunca"
              pet14val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion14[10].Respuestas=="Siempre"){
          pet14res46="Siempre"
          pet14val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion14[10].Respuestas=="CasiSiempre"){
            pet14res47="Casi Siempre"
            pet14val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion14[10].Respuestas=="AlgunasVeces"){
            pet14res48="Algunas Veces"
            pet14val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion14[10].Respuestas=="CasiNunca"){
            pet14res49="Casi Nunca"
            pet14val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion14[10].Respuestas=="Nunca"){
            pet14res50="Nunca"
            pet14val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion14[11].Respuestas=="Siempre"){
          pet14res51="Siempre"
          pet14val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion14[11].Respuestas=="CasiSiempre"){
            pet14res52="Casi Siempre"
            pet14val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion14[11].Respuestas=="AlgunasVeces"){
            pet14res53="Algunas Veces"
            pet14val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion14[11].Respuestas=="CasiNunca"){
            pet14res54="Casi Nunca"
            pet14val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion14[11].Respuestas=="Nunca"){
            pet14res55="Nunca"
            pet14val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion14[12].Respuestas=="Siempre"){
          pet14res56="Siempre"
          pet14val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion14[12].Respuestas=="CasiSiempre"){
            pet14res57="Casi Siempre"
            pet14val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion14[12].Respuestas=="AlgunasVeces"){
            pet14res58="Algunas Veces"
            pet14val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion14[12].Respuestas=="CasiNunca"){
            pet14res59="Casi Nunca"
            pet14val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion14[12].Respuestas=="Nunca"){
            pet14res60="Nunca"
            pet14val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion14[13].Respuestas=="Siempre"){
          pet14res61="Siempre"
          pet14val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion14[13].Respuestas=="CasiSiempre"){
            pet14res62="Casi Siempre"
            pet14val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion14[13].Respuestas=="AlgunasVeces"){
            pet14res63="Algunas Veces"
            pet14val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion14[13].Respuestas=="CasiNunca"){
            pet14res64="Casi Nunca"
            pet14val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion14[13].Respuestas=="Nunca"){
            pet14res65="Nunca"
            pet14val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion14[14].Respuestas=="Siempre"){
          pet14res66="Siempre"
          pet14val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion14[14].Respuestas=="CasiSiempre"){
            pet14res67="Casi Siempre"
            pet14val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion14[14].Respuestas=="AlgunasVeces"){
            pet14res68="Algunas Veces"
            pet14val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion14[14].Respuestas=="CasiNunca"){
            pet14res69="Casi Nunca"
            pet14val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion14[14].Respuestas=="Nunca"){
            pet14res70="Nunca"
            pet14val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion14[15].Respuestas=="Siempre"){
          pet14res71="Siempre"
          pet14val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion14[15].Respuestas=="CasiSiempre"){
            pet14res72="Casi Siempre"
            pet14val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion14[15].Respuestas=="AlgunasVeces"){
            pet14res73="Algunas Veces"
            pet14val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion14[15].Respuestas=="CasiNunca"){
            pet14res74="Casi Nunca"
            pet14val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion14[15].Respuestas=="Nunca"){
            pet14res75="Nunca"
            pet14val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion14[16].Respuestas=="Siempre"){
          pet14res76="Siempre"
          pet14val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion14[16].Respuestas=="CasiSiempre"){
            pet14res77="Casi Siempre"
            pet14val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion14[16].Respuestas=="AlgunasVeces"){
            pet14res78="Algunas Veces"
            pet14val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion14[16].Respuestas=="CasiNunca"){
            pet14res79="Casi Nunca"
            pet14val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion14[16].Respuestas=="Nunca"){
            pet14res80="Nunca"
            pet14val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion14[17].Respuestas=="Siempre"){
          pet14res81="Siempre"
          pet14val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion14[17].Respuestas=="CasiSiempre"){
            pet14res82="Casi Siempre"
            pet14val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion14[17].Respuestas=="AlgunasVeces"){
            pet14res83="Algunas Veces"
            pet14val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion14[17].Respuestas=="CasiNunca"){
            pet14res84="Casi Nunca"
            pet14val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion14[17].Respuestas=="Nunca"){
            pet14res85="Nunca"
            pet14val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion14[18].Respuestas=="Siempre"){
          pet14res86="Siempre"
          pet14val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion14[18].Respuestas=="CasiSiempre"){
            pet14res87="Casi Siempre"
            pet14val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion14[18].Respuestas=="AlgunasVeces"){
            pet14res88="Algunas Veces"
            pet14val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion14[18].Respuestas=="CasiNunca"){
            pet14res89="Casi Nunca"
            pet14val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion14[18].Respuestas=="Nunca"){
            pet14res90="Nunca"
            pet14val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion14[19].Respuestas=="Siempre"){
          pet14res91="Siempre"
          pet14val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion14[19].Respuestas=="CasiSiempre"){
            pet14res92="Casi Siempre"
            pet14val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion14[19].Respuestas=="AlgunasVeces"){
            pet14res93="Algunas Veces"
            pet14val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion14[19].Respuestas=="CasiNunca"){
            pet14res94="Casi Nunca"
            pet14val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion14[19].Respuestas=="Nunca"){
            pet14res95="Nunca"
            pet14val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion14[20].Respuestas=="Siempre"){
          pet14res96="Siempre"
          pet14val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion14[20].Respuestas=="CasiSiempre"){
            pet14res97="Casi Siempre"
            pet14val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion14[20].Respuestas=="AlgunasVeces"){
            pet14res98="Algunas Veces"
            pet14val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion14[20].Respuestas=="CasiNunca"){
            pet14res99="Casi Nunca"
            pet14val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion14[20].Respuestas=="Nunca"){
            pet14res100="Nunca"
            pet14val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion14[21].Respuestas=="Siempre"){
          pet14res101="Siempre"
          pet14val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion14[21].Respuestas=="CasiSiempre"){
            pet14res102="Casi Siempre"
            pet14val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion14[21].Respuestas=="AlgunasVeces"){
            pet14res103="Algunas Veces"
            pet14val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion14[21].Respuestas=="CasiNunca"){
            pet14res104="Casi Nunca"
            pet14val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion14[21].Respuestas=="Nunca"){
            pet14res105="Nunca"
            pet14val21= this.state.getPonderacion[20].nunca
          } 
  
        if(this.state.peticion14[22].Respuestas=="Siempre"){
          pet14res106="Siempre"
          pet14val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion14[22].Respuestas=="CasiSiempre"){
            pet14res107="Casi Siempre"
            pet14val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion14[22].Respuestas=="AlgunasVeces"){
            pet14res108="Algunas Veces"
            pet14val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion14[2].Respuestas=="CasiNunca"){
            pet14res109="Casi Nunca"
            pet14val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion14[22].Respuestas=="Nunca"){
            pet14res110="Nunca"
            pet14val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion14[23].Respuestas=="Siempre"){
          pet14res111="Siempre"
          pet14val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion14[23].Respuestas=="CasiSiempre"){
            pet14res112="Casi Siempre"
            pet14val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion14[23].Respuestas=="AlgunasVeces"){
            pet14res113="Algunas Veces"
            pet14val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion14[23].Respuestas=="CasiNunca"){
            pet14res114="Casi Nunca"
            pet14val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion14[23].Respuestas=="Nunca"){
            pet14res115="Nunca"
            pet14val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion14[24].Respuestas=="Siempre"){
          pet14res116="Siempre"
          pet14val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion14[24].Respuestas=="CasiSiempre"){
            pet14res117="Casi Siempre"
            pet14val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion14[24].Respuestas=="AlgunasVeces"){
            pet14res118="Algunas Veces"
            pet14val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion14[24].Respuestas=="CasiNunca"){
            pet14res119="Casi Nunca"
            pet14val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion14[24].Respuestas=="Nunca"){
            pet14res120="Nunca"
            pet14val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion14[25].Respuestas=="Siempre"){
          pet14res121="Siempre"
          pet14val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion14[25].Respuestas=="CasiSiempre"){
            pet14res122="Casi Siempre"
            pet14val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion14[25].Respuestas=="AlgunasVeces"){
            pet14res123="Algunas Veces"
            pet14val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion14[25].Respuestas=="CasiNunca"){
            pet14res124="Casi Nunca"
            pet14val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion14[25].Respuestas=="Nunca"){
            pet14res125="Nunca"
            pet14val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion14[26].Respuestas=="Siempre"){
          pet14res126="Siempre"
          pet14val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion14[26].Respuestas=="CasiSiempre"){
            pet14res127="Casi Siempre"
            pet14val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion14[26].Respuestas=="AlgunasVeces"){
            pet14res128="Algunas Veces"
            pet14val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion14[26].Respuestas=="CasiNunca"){
            pet14res129="Casi Nunca"
            pet14val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion14[26].Respuestas=="Nunca"){
            pet14res130="Nunca"
            pet14val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion14[27].Respuestas=="Siempre"){
          pet14res131="Siempre"
          pet14val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion14[27].Respuestas=="CasiSiempre"){
            pet14res132="Casi Siempre"
            pet14val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion14[27].Respuestas=="AlgunasVeces"){
            pet14res133="Algunas Veces"
            pet14val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion14[27].Respuestas=="CasiNunca"){
            pet14res134="Casi Nunca"
            pet14val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion14[27].Respuestas=="Nunca"){
            pet14res135="Nunca"
            pet14val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion14[28].Respuestas=="Siempre"){
        pet14res136="Siempre"
        pet14val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion14[28].Respuestas=="CasiSiempre"){
          pet14res137="Casi Siempre"
          pet14val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion14[28].Respuestas=="AlgunasVeces"){
          pet14res138="Algunas Veces"
          pet14val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion14[28].Respuestas=="CasiNunca"){
          pet14res139="Casi Nunca"
          pet14val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion14[28].Respuestas=="Nunca"){
          pet14res140="Nunca"
          pet14val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion14[29].Respuestas=="Siempre"){
        pet14res141="Siempre"
        pet14val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion14[29].Respuestas=="CasiSiempre"){
          pet14res142="Casi Siempre"
          pet14val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion14[29].Respuestas=="AlgunasVeces"){
          pet14res143="Algunas Veces"
          pet14val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion14[29].Respuestas=="CasiNunca"){
          pet14res144="Casi Nunca"
          pet14val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion14[29].Respuestas=="Nunca"){
          pet14res145="Nunca"
          pet14val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion14[30].Respuestas=="Siempre"){
        pet14res146="Siempre"
        pet14val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion14[30].Respuestas=="CasiSiempre"){
          pet14res147="Casi Siempre"
          pet14val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion14[30].Respuestas=="AlgunasVeces"){
          pet14res148="Algunas Veces"
          pet14val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion14[30].Respuestas=="CasiNunca"){
          pet14res149="Casi Nunca"
          pet14val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion14[30].Respuestas=="Nunca"){
          pet14res150="Nunca"
          pet14val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion14[31].Respuestas=="Siempre"){
        pet14res151="Siempre"
        pet14val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion14[31].Respuestas=="CasiSiempre"){
          pet14res152="Casi Siempre"
          pet14val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion14[31].Respuestas=="AlgunasVeces"){
          pet14res153="Algunas Veces"
          pet14val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion14[31].Respuestas=="CasiNunca"){
          pet14res154="Casi Nunca"
          pet14val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion14[31].Respuestas=="Nunca"){
          pet14res155="Nunca"
          pet14val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion14[32].Respuestas=="Siempre"){
        pet14res156="Siempre"
        pet14val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion14[32].Respuestas=="CasiSiempre"){
          pet14res157="Casi Siempre"
          pet14val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion14[32].Respuestas=="AlgunasVeces"){
          pet14res158="Algunas Veces"
          pet14val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion14[32].Respuestas=="CasiNunca"){
          pet14res159="Casi Nunca"
          pet14val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion14[32].Respuestas=="Nunca"){
          pet14res160="Nunca"
          pet14val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion14[33].Respuestas=="Siempre"){
          pet14res161="Siempre"
          pet14val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion14[33].Respuestas=="CasiSiempre"){
            pet14res162="Casi Siempre"
            pet14val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion14[33].Respuestas=="AlgunasVeces"){
            pet14res163="Algunas Veces"
            pet14val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion14[33].Respuestas=="CasiNunca"){
            pet14res164="Casi Nunca"
            pet14val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion14[33].Respuestas=="Nunca"){
            pet14res165="Nunca"
            pet14val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion14[34].Respuestas=="Siempre"){
          pet14res166="Siempre"
          pet14val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion14[34].Respuestas=="CasiSiempre"){
            pet14res167="Casi Siempre"
            pet14val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion14[34].Respuestas=="AlgunasVeces"){
            pet14res168="Algunas Veces"
            pet14val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion14[34].Respuestas=="CasiNunca"){
            pet14res169="Casi Nunca"
            pet14val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion14[34].Respuestas=="Nunca"){
            pet14res170="Nunca"
            pet14val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion14[35].Respuestas=="Siempre"){
            pet14res171="Siempre"
            pet14val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion14[35].Respuestas=="CasiSiempre"){
              pet14res172="Casi Siempre"
              pet14val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion14[35].Respuestas=="AlgunasVeces"){
              pet14res173="Algunas Veces"
              pet14val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion14[35].Respuestas=="CasiNunca"){
              pet14res174="Casi Nunca"
              pet14val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion14[15].Respuestas=="Nunca"){
              pet14res175="Nunca"
              pet14val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion14[36].Respuestas=="Siempre"){
            pet14res176="Siempre"
            pet14val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion14[36].Respuestas=="CasiSiempre"){
              pet14res177="Casi Siempre"
              pet14val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion14[36].Respuestas=="AlgunasVeces"){
              pet14res178="Algunas Veces"
              pet14val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion14[36].Respuestas=="CasiNunca"){
              pet14res179="Casi Nunca"
              pet14val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion14[36].Respuestas=="Nunca"){
              pet14res180="Nunca"
              pet14val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion14[37].Respuestas=="Siempre"){
            pet14res181="Siempre"
            pet14val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion14[37].Respuestas=="CasiSiempre"){
              pet14res182="Casi Siempre"
              pet14val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion14[37].Respuestas=="AlgunasVeces"){
              pet14res183="Algunas Veces"
              pet14val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion14[37].Respuestas=="CasiNunca"){
              pet14res184="Casi Nunca"
              pet14val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion14[37].Respuestas=="Nunca"){
              pet14res185="Nunca"
              pet14val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion14[38].Respuestas=="Siempre"){
            pet14res186="Siempre"
            pet14val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion14[38].Respuestas=="CasiSiempre"){
              pet14res187="Casi Siempre"
              pet14val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion14[38].Respuestas=="AlgunasVeces"){
              pet14res188="Algunas Veces"
              pet14val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion14[38].Respuestas=="CasiNunca"){
              pet14res189="Casi Nunca"
              pet14val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion14[38].Respuestas=="Nunca"){
              pet14res190="Nunca"
              pet14val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion14[39].Respuestas=="Siempre"){
              pet14res191="Siempre"
              pet14val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion14[39].Respuestas=="CasiSiempre"){
                pet14res192="Casi Siempre"
                pet14val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion14[39].Respuestas=="AlgunasVeces"){
                pet14res193="Algunas Veces"
                pet14val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion14[39].Respuestas=="CasiNunca"){
                pet14res194="Casi Nunca"
                pet14val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion14[39].Respuestas=="Nunca"){
                pet14res195="Nunca"
                pet14val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion14[40].Respuestas=="Siempre"){
                pet14res196="Siempre"
                pet14val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion14[40].Respuestas=="CasiSiempre"){
                  pet14res197="Casi Siempre"
                  pet14val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion14[40].Respuestas=="AlgunasVeces"){
                  pet14res198="Algunas Veces"
                  pet14val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion14[40].Respuestas=="CasiNunca"){
                  pet14res199="Casi Nunca"
                  pet14val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion14[40].Respuestas=="Nunca"){
                  pet14res200="Nunca"
                  pet14val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion14[42].Respuestas=="Siempre"){
                pet14res201="Siempre"
                pet14val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion14[42].Respuestas=="CasiSiempre"){
                pet14res202="Casi Siempre"
                pet14val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion14[42].Respuestas=="AlgunasVeces"){
                pet14res203="Algunas Veces"
                pet14val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion14[42].Respuestas=="CasiNunca"){
                pet14res204="Casi Nunca"
                pet14val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion14[42].Respuestas=="Nunca"){
                pet14res205="Nunca"
                pet14val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion14[43].Respuestas=="Siempre"){
              pet14res206="Siempre"
              pet14val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion14[43].Respuestas=="CasiSiempre"){
              pet14res207="Casi Siempre"
              pet14val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion14[43].Respuestas=="AlgunasVeces"){
              pet14res208="Algunas Veces"
              pet14val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion14[43].Respuestas=="CasiNunca"){
              pet14res209="Casi Nunca"
              pet14val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion14[43].Respuestas=="Nunca"){
              pet14res210="Nunca"
              pet14val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion14[44].Respuestas=="Siempre"){
            pet14res211="Siempre"
            pet14val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion14[44].Respuestas=="CasiSiempre"){
            pet14res212="Casi Siempre"
            pet14val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion14[44].Respuestas=="AlgunasVeces"){
            pet14res213="Algunas Veces"
            pet14val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion14[44].Respuestas=="CasiNunca"){
            pet14res214="Casi Nunca"
            pet14val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion14[44].Respuestas=="Nunca"){
            pet14res215="Nunca"
            pet14val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion14[46].Respuestas=="Siempre"){
          pet14res216="Siempre"
          pet14val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion14[46].Respuestas=="CasiSiempre"){
          pet14res217="Casi Siempre"
          pet14val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion14[46].Respuestas=="AlgunasVeces"){
          pet14res218="Algunas Veces"
          pet14val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion14[46].Respuestas=="CasiNunca"){
          pet14res219="Casi Nunca"
          pet14val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion14[46].Respuestas=="Nunca"){
          pet14res220="Nunca"
          pet14val44= this.state.getPonderacion[43].nunca
        }
  
      if(this.state.peticion14[47].Respuestas=="Siempre"){
        pet14res221="Siempre"
        pet14val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion14[47].Respuestas=="CasiSiempre"){
        pet14res222="Casi Siempre"
        pet14val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion14[47].Respuestas=="AlgunasVeces"){
        pet14res223="Algunas Veces"
        pet14val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion14[47].Respuestas=="CasiNunca"){
        pet14res224="Casi Nunca"
        pet14val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion14[47].Respuestas=="Nunca"){
        pet14res225="Nunca"
        pet14val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion14[48].Respuestas=="Siempre"){
        pet14res226="Siempre"
        pet14val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion14[48].Respuestas=="CasiSiempre"){
        pet14res227="Casi Siempre"
        pet14val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion14[48].Respuestas=="AlgunasVeces"){
        pet14res228="Algunas Veces"
        pet14val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion14[48].Respuestas=="CasiNunca"){
        pet14res229="Casi Nunca"
        pet14val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion14[48].Respuestas=="Nunca"){
        pet14res230="Nunca"
        pet14val46= this.state.getPonderacion[45].nunca
      }
} 
 
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     ///////////////////////////////////////////////////////////////////////////////////////////////////////

  if(this.state.peticion15.length>0){

    if(this.state.peticion15[1].Respuestas=="Siempre"){
      pet15res1="Siempre"
      pet15val1= this.state.getPonderacion[0].siempre
      }else if(this.state.peticion15[1].Respuestas=="CasiSiempre"){
        pet15res2="Casi Siempre"
        pet15val1= this.state.getPonderacion[0].casisiempre
      }
      else if(this.state.peticion15[1].Respuestas=="AlgunasVeces"){
        pet15res3="Algunas Veces"
        pet15val1= this.state.getPonderacion[0].algunasveces
      } 
      else if(this.state.peticion15[1].Respuestas=="CasiNunca"){
        pet15res4="Casi Nunca"
        pet15val1= this.state.getPonderacion[0].casinunca
      } 
      else if(this.state.peticion15[1].Respuestas=="Nunca"){
        pet15res5="Nunca"
        pet15val1= this.state.getPonderacion[0].nunca
      } 
  
  
    if(this.state.peticion15[2].Respuestas=="Siempre"){
      pet15res6="Siempre"
      pet15val2= this.state.peticion15[1].siempre
      }else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiSiempre"){
        pet15res7="Casi Siempre"
        pet15val2= this.state.peticion15[1].casisiempre
      }
      else if(this.state.resultadosEvaluacion[2].Respuestas=="AlgunasVeces"){
        pet15res8="Algunas Veces"
        pet15val2= this.state.peticion15[1].algunasveces
      } 
      else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiNunca"){
        pet15res9="Casi Nunca"
        pet15val2= this.state.peticion15[2].casinunca
      } 
      else if(this.state.peticion15[2].Respuestas=="Nunca"){
        pet15res10="Nunca"
        pet15val2= this.state.peticion15[1].nunca
      } 
  
      if(this.state.peticion15[3].Respuestas=="Siempre"){
        pet15res11="Siempre"
        pet15val3= this.state.getPonderacion[2].siempre
        }else if(this.state.peticion15[3].Respuestas=="CasiSiempre"){
          pet15res12="Casi Siempre"
          pet15val3= this.state.getPonderacion[2].casisiempre
        }
        else if(this.state.peticion15[3].Respuestas=="AlgunasVeces"){
          pet15res13="Algunas Veces"
          pet15val3= this.state.getPonderacion[2].algunasveces
        } 
        else if(this.state.peticion15[3].Respuestas=="CasiNunca"){
          pet15res14="Casi Nunca"
          pet15val3= this.state.getPonderacion[2].casinunca
        } 
        else if(this.state.peticion15[3].Respuestas=="Nunca"){
          pet15res15="Nunca"
          pet15val3= this.state.getPonderacion[2].nunca
        } 
  
  
      if(this.state.peticion15[4].Respuestas=="Siempre"){
        pet15res16="Siempre"
        pet15val4= this.state.getPonderacion[3].siempre
        }else if(this.state.peticion15[4].Respuestas=="CasiSiempre"){
          pet15res17="Casi Siempre"
          pet15val4= this.state.getPonderacion[3].casisiempre
        }
        else if(this.state.peticion15[4].Respuestas=="AlgunasVeces"){
          pet15res18="Algunas Veces"
          pet15val4= this.state.getPonderacion[3].algunasveces
        } 
        else if(this.state.peticion15[4].Respuestas=="CasiNunca"){
          pet15res19="Casi Nunca"
          pet15val4= this.state.getPonderacion[3].casinunca
        } 
        else if(this.state.peticion15[4].Respuestas=="Nunca"){
          pet15res20="Nunca"
          pet15val4= this.state.getPonderacion[3].nunca
        } 
  
      if(this.state.peticion15[5].Respuestas=="Siempre"){
        pet15res21="Siempre"
        pet15val5= this.state.getPonderacion[4].siempre
        }else if(this.state.peticion15[5].Respuestas=="CasiSiempre"){
          pet15res22="Casi Siempre"
          pet15val5= this.state.getPonderacion[4].casisiempre
        }
        else if(this.state.peticion15[5].Respuestas=="AlgunasVeces"){
          pet15res23="Algunas Veces"
          pet15val5= this.state.getPonderacion[4].algunasveces
        } 
        else if(this.state.peticion15[5].Respuestas=="CasiNunca"){
          pet15res24="Casi Nunca"
          pet15val5= this.state.getPonderacion[4].casinunca
        } 
        else if(this.state.peticion15[5].Respuestas=="Nunca"){
          pet15res25="Nunca"
          pet15val5= this.state.getPonderacion[4].nunca
        } 
  
  
        if(this.state.peticion15[6].Respuestas=="Siempre"){
          pet15res26="Siempre"
          pet15val6= this.state.getPonderacion[5].siempre
          }else if(this.state.peticion15[6].Respuestas=="CasiSiempre"){
            pet15res27="Casi Siempre"
            pet15val6= this.state.getPonderacion[5].casisiempre
          }
          else if(this.state.peticion15[6].Respuestas=="AlgunasVeces"){
            pet15res28="Algunas Veces"
            pet15val6= this.state.getPonderacion[5].algunasveces
          } 
          else if(this.state.peticion15[6].Respuestas=="CasiNunca"){
            pet15res29="Casi Nunca"
            pet15val6= this.state.getPonderacion[5].casinunca
          } 
          else if(this.state.peticion15[6].Respuestas=="Nunca"){
            pet15res30="Nunca"
            pet15val6= this.state.getPonderacion[5].nunca
          }
  
        if(this.state.peticion15[7].Respuestas=="Siempre"){
          pet15res31="Siempre"
          pet15val7= this.state.getPonderacion[6].siempre
          }else if(this.state.peticion15[7].Respuestas=="CasiSiempre"){
            pet15res32="Casi Siempre"
            pet15val7= this.state.getPonderacion[6].casisiempre
          }
          else if(this.state.peticion15[7].Respuestas=="AlgunasVeces"){
            pet15res33="Algunas Veces"
            pet15val7= this.state.getPonderacion[6].algunasveces
          } 
          else if(this.state.peticion15[7].Respuestas=="CasiNunca"){
            pet15res34="Casi Nunca"
            pet15val7= this.state.getPonderacion[6].casinunca
          } 
          else if(this.state.peticion15[7].Respuestas=="Nunca"){
            pet15res35="Nunca"
            pet15val7= this.state.getPonderacion[6].nunca
          }
  
          if(this.state.peticion15[8].Respuestas=="Siempre"){
            pet15res36="Siempre"
            pet15val8= this.state.getPonderacion[7].siempre
            }else if(this.state.peticion15[8].Respuestas=="CasiSiempre"){
              pet15res37="Casi Siempre"
              pet15val8= this.state.getPonderacion[7].casisiempre
            }
            else if(this.state.peticion15[8].Respuestas=="AlgunasVeces"){
              pet15res38="Algunas Veces"
              pet15val8= this.state.getPonderacion[7].algunasveces
            } 
            else if(this.state.peticion15[8].Respuestas=="CasiNunca"){
              pet15res39="Casi Nunca"
              pet15val8= this.state.getPonderacion[7].casinunca
            } 
            else if(this.state.peticion15[8].Respuestas=="Nunca"){
              pet15res40="Nunca"
              pet15val8= this.state.getPonderacion[7].nunca
            }
          if(this.state.peticion15[9].Respuestas=="Siempre"){
            pet15res41="Siempre"
            pet15val9= this.state.getPonderacion[8].siempre
            }else if(this.state.peticion15[9].Respuestas=="CasiSiempre"){
              pet15res42="Casi Siempre"
              pet15val9= this.state.getPonderacion[8].casisiempre
            }
            else if(this.state.peticion15[9].Respuestas=="AlgunasVeces"){
              pet15res43="Algunas Veces"
              pet15val9= this.state.getPonderacion[8].algunasveces
            } 
            else if(this.state.peticion15[9].Respuestas=="CasiNunca"){
              pet15res44="Casi Nunca"
              pet15val9= this.state.getPonderacion[8].casinunca
            } 
            else if(this.state.peticion15[9].Respuestas=="Nunca"){
              pet15res45="Nunca"
              pet15val9= this.state.getPonderacion[8].nunca
            }
  
        if(this.state.peticion15[10].Respuestas=="Siempre"){
          pet15res46="Siempre"
          pet15val10= this.state.getPonderacion[9].siempre
          }else if(this.state.peticion15[10].Respuestas=="CasiSiempre"){
            pet15res47="Casi Siempre"
            pet15val10= this.state.getPonderacion[9].casisiempre
          }
          else if(this.state.peticion15[10].Respuestas=="AlgunasVeces"){
            pet15res48="Algunas Veces"
            pet15val10= this.state.getPonderacion[9].algunasveces
          } 
          else if(this.state.peticion15[10].Respuestas=="CasiNunca"){
            pet15res49="Casi Nunca"
            pet15val10= this.state.getPonderacion[9].casinunca
          } 
          else if(this.state.peticion15[10].Respuestas=="Nunca"){
            pet15res50="Nunca"
            pet15val10= this.state.getPonderacion[9].nunca
          }
  
        if(this.state.peticion15[11].Respuestas=="Siempre"){
          pet15res51="Siempre"
          pet15val11= this.state.getPonderacion[10].siempre
          }else if(this.state.peticion15[11].Respuestas=="CasiSiempre"){
            pet15res52="Casi Siempre"
            pet15val11= this.state.getPonderacion[10].casisiempre
          }
          else if(this.state.peticion15[11].Respuestas=="AlgunasVeces"){
            pet15res53="Algunas Veces"
            pet15val11= this.state.getPonderacion[10].algunasveces
          } 
          else if(this.state.peticion15[11].Respuestas=="CasiNunca"){
            pet15res54="Casi Nunca"
            pet15val11= this.state.getPonderacion[10].casinunca
          } 
          else if(this.state.peticion15[11].Respuestas=="Nunca"){
            pet15res55="Nunca"
            pet15val11= this.state.getPonderacion[10].nunca
          }
        if(this.state.peticion15[12].Respuestas=="Siempre"){
          pet15res56="Siempre"
          pet15val12= this.state.getPonderacion[11].siempre
          }else if(this.state.peticion15[12].Respuestas=="CasiSiempre"){
            pet15res57="Casi Siempre"
            pet15val12= this.state.getPonderacion[11].casisiempre
          }
          else if(this.state.peticion15[12].Respuestas=="AlgunasVeces"){
            pet15res58="Algunas Veces"
            pet15val12= this.state.getPonderacion[11].algunasveces
          } 
          else if(this.state.peticion15[12].Respuestas=="CasiNunca"){
            pet15res59="Casi Nunca"
            pet15val12= this.state.getPonderacion[11].casinunca
          } 
          else if(this.state.peticion15[12].Respuestas=="Nunca"){
            pet15res60="Nunca"
            pet15val12= this.state.getPonderacion[11].nunca
          }
  
        if(this.state.peticion15[13].Respuestas=="Siempre"){
          pet15res61="Siempre"
          pet15val13= this.state.getPonderacion[12].siempre
          }else if(this.state.peticion15[13].Respuestas=="CasiSiempre"){
            pet15res62="Casi Siempre"
            pet15val13= this.state.getPonderacion[12].casisiempre
          }
          else if(this.state.peticion15[13].Respuestas=="AlgunasVeces"){
            pet15res63="Algunas Veces"
            pet15val13= this.state.getPonderacion[12].algunasveces
          } 
          else if(this.state.peticion15[13].Respuestas=="CasiNunca"){
            pet15res64="Casi Nunca"
            pet15val13= this.state.getPonderacion[12].casinunca
          } 
          else if(this.state.peticion15[13].Respuestas=="Nunca"){
            pet15res65="Nunca"
            pet15val13= this.state.getPonderacion[12].nunca
          }
        if(this.state.peticion15[14].Respuestas=="Siempre"){
          pet15res66="Siempre"
          pet15val14= this.state.getPonderacion[13].siempre
          }else if(this.state.peticion15[14].Respuestas=="CasiSiempre"){
            pet15res67="Casi Siempre"
            pet15val14= this.state.getPonderacion[13].casisiempre
          }
          else if(this.state.peticion15[14].Respuestas=="AlgunasVeces"){
            pet15res68="Algunas Veces"
            pet15val14= this.state.getPonderacion[13].algunasveces
          } 
          else if(this.state.peticion15[14].Respuestas=="CasiNunca"){
            pet15res69="Casi Nunca"
            pet15val14= this.state.getPonderacion[13].casinunca
          } 
          else if(this.state.peticion15[14].Respuestas=="Nunca"){
            pet15res70="Nunca"
            pet15val14= this.state.getPonderacion[13].nunca
          } 
  
        if(this.state.peticion15[15].Respuestas=="Siempre"){
          pet15res71="Siempre"
          pet15val15= this.state.getPonderacion[14].siempre
          }else if(this.state.peticion15[15].Respuestas=="CasiSiempre"){
            pet15res72="Casi Siempre"
            pet15val15= this.state.getPonderacion[14].casisiempre
          }
          else if(this.state.peticion15[15].Respuestas=="AlgunasVeces"){
            pet15res73="Algunas Veces"
            pet15val15= this.state.getPonderacion[14].algunasveces
          } 
          else if(this.state.peticion15[15].Respuestas=="CasiNunca"){
            pet15res74="Casi Nunca"
            pet15val15= this.state.getPonderacion[14].casinunca
          } 
          else if(this.state.peticion15[15].Respuestas=="Nunca"){
            pet15res75="Nunca"
            pet15val15= this.state.getPonderacion[14].nunca
          } 
        if(this.state.peticion15[16].Respuestas=="Siempre"){
          pet15res76="Siempre"
          pet15val16= this.state.getPonderacion[15].siempre
          }else if(this.state.peticion15[16].Respuestas=="CasiSiempre"){
            pet15res77="Casi Siempre"
            pet15val16= this.state.getPonderacion[15].casisiempre
          }
          else if(this.state.peticion15[16].Respuestas=="AlgunasVeces"){
            pet15res78="Algunas Veces"
            pet15val16= this.state.getPonderacion[15].algunasveces
          } 
          else if(this.state.peticion15[16].Respuestas=="CasiNunca"){
            pet15res79="Casi Nunca"
            pet15val16= this.state.getPonderacion[15].casinunca
          } 
          else if(this.state.peticion15[16].Respuestas=="Nunca"){
            pet15res80="Nunca"
            pet15val16= this.state.getPonderacion[15].nunca
          }
        if(this.state.peticion15[17].Respuestas=="Siempre"){
          pet15res81="Siempre"
          pet15val17= this.state.getPonderacion[16].siempre
          }else if(this.state.peticion15[17].Respuestas=="CasiSiempre"){
            pet15res82="Casi Siempre"
            pet15val17= this.state.getPonderacion[16].casisiempre
          }
          else if(this.state.peticion15[17].Respuestas=="AlgunasVeces"){
            pet15res83="Algunas Veces"
            pet15val17= this.state.getPonderacion[16].algunasveces
          } 
          else if(this.state.peticion15[17].Respuestas=="CasiNunca"){
            pet15res84="Casi Nunca"
            pet15val17= this.state.getPonderacion[16].casinunca
          } 
          else if(this.state.peticion15[17].Respuestas=="Nunca"){
            pet15res85="Nunca"
            pet15val17= this.state.getPonderacion[16].nunca
          }
        if(this.state.peticion15[18].Respuestas=="Siempre"){
          pet15res86="Siempre"
          pet15val18= this.state.getPonderacion[17].siempre
          }else if(this.state.peticion15[18].Respuestas=="CasiSiempre"){
            pet15res87="Casi Siempre"
            pet15val18= this.state.getPonderacion[17].casisiempre
          }
          else if(this.state.peticion15[18].Respuestas=="AlgunasVeces"){
            pet15res88="Algunas Veces"
            pet15val18= this.state.getPonderacion[17].algunasveces
          } 
          else if(this.state.peticion15[18].Respuestas=="CasiNunca"){
            pet15res89="Casi Nunca"
            pet15val18= this.state.getPonderacion[17].casinunca
          } 
          else if(this.state.peticion15[18].Respuestas=="Nunca"){
            pet15res90="Nunca"
            pet15val18= this.state.getPonderacion[17].nunca
          }
  
        if(this.state.peticion15[19].Respuestas=="Siempre"){
          pet15res91="Siempre"
          pet15val19= this.state.getPonderacion[18].siempre
          }else if(this.state.peticion15[19].Respuestas=="CasiSiempre"){
            pet15res92="Casi Siempre"
            pet15val19= this.state.getPonderacion[18].casisiempre
          }
          else if(this.state.peticion15[19].Respuestas=="AlgunasVeces"){
            pet15res93="Algunas Veces"
            pet15val19= this.state.getPonderacion[18].algunasveces
          } 
          else if(this.state.peticion15[19].Respuestas=="CasiNunca"){
            pet15res94="Casi Nunca"
            pet15val19= this.state.getPonderacion[18].casinunca
          } 
          else if(this.state.peticion15[19].Respuestas=="Nunca"){
            pet15res95="Nunca"
            pet15val19= this.state.getPonderacion[18].nunca
          }
        if(this.state.peticion15[20].Respuestas=="Siempre"){
          pet15res96="Siempre"
          pet15val20= this.state.getPonderacion[19].siempre
          }else if(this.state.peticion15[20].Respuestas=="CasiSiempre"){
            pet15res97="Casi Siempre"
            pet15val20= this.state.getPonderacion[19].casisiempre
          }
          else if(this.state.peticion15[20].Respuestas=="AlgunasVeces"){
            pet15res98="Algunas Veces"
            pet15val20= this.state.getPonderacion[19].algunasveces
          } 
          else if(this.state.peticion15[20].Respuestas=="CasiNunca"){
            pet15res99="Casi Nunca"
            pet15val20= this.state.getPonderacion[19].casinunca
          } 
          else if(this.state.peticion15[20].Respuestas=="Nunca"){
            pet15res100="Nunca"
            pet15val20= this.state.getPonderacion[19].nunca
          }
  
        if(this.state.peticion15[21].Respuestas=="Siempre"){
          pet15res101="Siempre"
          pet15val21= this.state.getPonderacion[20].siempre
          }else if(this.state.peticion15[21].Respuestas=="CasiSiempre"){
            pet15res102="Casi Siempre"
            pet15val21= this.state.getPonderacion[20].casisiempre
          }
          else if(this.state.peticion15[21].Respuestas=="AlgunasVeces"){
            pet15res103="Algunas Veces"
            pet15val21= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion15[21].Respuestas=="CasiNunca"){
            pet15res104="Casi Nunca"
            pet15val21= this.state.getPonderacion[20].casinunca
          } 
          else if(this.state.peticion15[21].Respuestas=="Nunca"){
            pet15res105="Nunca"
            pet15val21= this.state.getPonderacion[20].nunca
          } 
  
        if(this.state.peticion15[22].Respuestas=="Siempre"){
          pet15res106="Siempre"
          pet15val22= this.state.getPonderacion[21].siempre
          }else if(this.state.peticion15[22].Respuestas=="CasiSiempre"){
            pet15res107="Casi Siempre"
            pet15val22= this.state.getPonderacion[21].casisiempre
          }
          else if(this.state.peticion15[22].Respuestas=="AlgunasVeces"){
            pet15res108="Algunas Veces"
            pet15val22= this.state.getPonderacion[21].algunasveces
          } 
          else if(this.state.peticion15[2].Respuestas=="CasiNunca"){
            pet15res109="Casi Nunca"
            pet15val22= this.state.getPonderacion[21].casinunca
          } 
          else if(this.state.peticion15[22].Respuestas=="Nunca"){
            pet15res110="Nunca"
            pet15val22= this.state.getPonderacion[21].nunca
          } 
  
        if(this.state.peticion15[23].Respuestas=="Siempre"){
          pet15res111="Siempre"
          pet15val23= this.state.getPonderacion[22].siempre
          }else if(this.state.peticion15[23].Respuestas=="CasiSiempre"){
            pet15res112="Casi Siempre"
            pet15val23= this.state.getPonderacion[22].casisiempre
          }
          else if(this.state.peticion15[23].Respuestas=="AlgunasVeces"){
            pet15res113="Algunas Veces"
            pet15val23= this.state.getPonderacion[22].algunasveces
          } 
          else if(this.state.peticion15[23].Respuestas=="CasiNunca"){
            pet15res114="Casi Nunca"
            pet15val23= this.state.getPonderacion[22].casinunca
          } 
          else if(this.state.peticion15[23].Respuestas=="Nunca"){
            pet15res115="Nunca"
            pet15val23= this.state.getPonderacion[22].nunca
          } 
        if(this.state.peticion15[24].Respuestas=="Siempre"){
          pet15res116="Siempre"
          pet15val24= this.state.getPonderacion[23].siempre
          }else if(this.state.peticion15[24].Respuestas=="CasiSiempre"){
            pet15res117="Casi Siempre"
            pet15val24= this.state.getPonderacion[23].casisiempre
          }
          else if(this.state.peticion15[24].Respuestas=="AlgunasVeces"){
            pet15res118="Algunas Veces"
            pet15val24= this.state.getPonderacion[23].algunasveces
          } 
          else if(this.state.peticion15[24].Respuestas=="CasiNunca"){
            pet15res119="Casi Nunca"
            pet15val24= this.state.getPonderacion[23].casinunca
          } 
          else if(this.state.peticion15[24].Respuestas=="Nunca"){
            pet15res120="Nunca"
            pet15val24= this.state.getPonderacion[23].nunca
          }
          
        if(this.state.peticion15[25].Respuestas=="Siempre"){
          pet15res121="Siempre"
          pet15val25= this.state.getPonderacion[24].siempre
          }else if(this.state.peticion15[25].Respuestas=="CasiSiempre"){
            pet15res122="Casi Siempre"
            pet15val25= this.state.getPonderacion[24].casisiempre
          }
          else if(this.state.peticion15[25].Respuestas=="AlgunasVeces"){
            pet15res123="Algunas Veces"
            pet15val25= this.state.getPonderacion[24].algunasveces
          } 
          else if(this.state.peticion15[25].Respuestas=="CasiNunca"){
            pet15res124="Casi Nunca"
            pet15val25= this.state.getPonderacion[24].casinunca
          } 
          else if(this.state.peticion15[25].Respuestas=="Nunca"){
            pet15res125="Nunca"
            pet15val25= this.state.getPonderacion[24].nunca
          }
        if(this.state.peticion15[26].Respuestas=="Siempre"){
          pet15res126="Siempre"
          pet15val26= this.state.getPonderacion[25].siempre
          }else if(this.state.peticion15[26].Respuestas=="CasiSiempre"){
            pet15res127="Casi Siempre"
            pet15val26= this.state.getPonderacion[25].casisiempre
          }
          else if(this.state.peticion15[26].Respuestas=="AlgunasVeces"){
            pet15res128="Algunas Veces"
            pet15val26= this.state.getPonderacion[25].algunasveces
          } 
          else if(this.state.peticion15[26].Respuestas=="CasiNunca"){
            pet15res129="Casi Nunca"
            pet15val26= this.state.getPonderacion[25].casinunca
          } 
          else if(this.state.peticion15[26].Respuestas=="Nunca"){
            pet15res130="Nunca"
            pet15val26= this.state.getPonderacion[25].nunca
          }
        if(this.state.peticion15[27].Respuestas=="Siempre"){
          pet15res131="Siempre"
          pet15val27= this.state.getPonderacion[26].siempre
          }else if(this.state.peticion15[27].Respuestas=="CasiSiempre"){
            pet15res132="Casi Siempre"
            pet15val27= this.state.getPonderacion[26].casisiempre
          }
          else if(this.state.peticion15[27].Respuestas=="AlgunasVeces"){
            pet15res133="Algunas Veces"
            pet15val27= this.state.getPonderacion[26].algunasveces
          } 
          else if(this.state.peticion15[27].Respuestas=="CasiNunca"){
            pet15res134="Casi Nunca"
            pet15val27= this.state.getPonderacion[26].casinunca
          } 
          else if(this.state.peticion15[27].Respuestas=="Nunca"){
            pet15res135="Nunca"
            pet15val27= this.state.getPonderacion[26].nunca
        }
      if(this.state.peticion15[28].Respuestas=="Siempre"){
        pet15res136="Siempre"
        pet15val28= this.state.getPonderacion[27].siempre
        }else if(this.state.peticion15[28].Respuestas=="CasiSiempre"){
          pet15res137="Casi Siempre"
          pet15val28= this.state.getPonderacion[27].casisiempre
        }
        else if(this.state.peticion15[28].Respuestas=="AlgunasVeces"){
          pet15res138="Algunas Veces"
          pet15val28= this.state.getPonderacion[27].algunasveces
        } 
        else if(this.state.peticion15[28].Respuestas=="CasiNunca"){
          pet15res139="Casi Nunca"
          pet15val28= this.state.getPonderacion[27].casinunca
        } 
        else if(this.state.peticion15[28].Respuestas=="Nunca"){
          pet15res140="Nunca"
          pet15val28= this.state.getPonderacion[27].nunca
        }
      if(this.state.peticion15[29].Respuestas=="Siempre"){
        pet15res141="Siempre"
        pet15val29= this.state.getPonderacion[28].siempre
        }else if(this.state.peticion15[29].Respuestas=="CasiSiempre"){
          pet15res142="Casi Siempre"
          pet15val29= this.state.getPonderacion[28].casisiempre
        }
        else if(this.state.peticion15[29].Respuestas=="AlgunasVeces"){
          pet15res143="Algunas Veces"
          pet15val29= this.state.getPonderacion[28].algunasveces
        } 
        else if(this.state.peticion15[29].Respuestas=="CasiNunca"){
          pet15res144="Casi Nunca"
          pet15val29= this.state.getPonderacion[28].casinunca
        } 
        else if(this.state.peticion15[29].Respuestas=="Nunca"){
          pet15res145="Nunca"
          pet15val29= this.state.getPonderacion[28].nunca
        }
  
      if(this.state.peticion15[30].Respuestas=="Siempre"){
        pet15res146="Siempre"
        pet15val30= this.state.getPonderacion[29].siempre
        }else if(this.state.peticion15[30].Respuestas=="CasiSiempre"){
          pet15res147="Casi Siempre"
          pet15val30= this.state.getPonderacion[29].casisiempre
        }
        else if(this.state.peticion15[30].Respuestas=="AlgunasVeces"){
          pet15res148="Algunas Veces"
          pet15val30= this.state.getPonderacion[29].algunasveces
        } 
        else if(this.state.peticion15[30].Respuestas=="CasiNunca"){
          pet15res149="Casi Nunca"
          pet15val30= this.state.getPonderacion[29].casinunca
        } 
        else if(this.state.peticion15[30].Respuestas=="Nunca"){
          pet15res150="Nunca"
          pet15val30= this.state.getPonderacion[29].nunca
        }
  
      if(this.state.peticion15[31].Respuestas=="Siempre"){
        pet15res151="Siempre"
        pet15val31= this.state.getPonderacion[30].siempre
        }else if(this.state.peticion15[31].Respuestas=="CasiSiempre"){
          pet15res152="Casi Siempre"
          pet15val31= this.state.getPonderacion[30].casisiempre
        }
        else if(this.state.peticion15[31].Respuestas=="AlgunasVeces"){
          pet15res153="Algunas Veces"
          pet15val31= this.state.getPonderacion[30].algunasveces
        } 
        else if(this.state.peticion15[31].Respuestas=="CasiNunca"){
          pet15res154="Casi Nunca"
          pet15val31= this.state.getPonderacion[30].casinunca
        } 
        else if(this.state.peticion15[31].Respuestas=="Nunca"){
          pet15res155="Nunca"
          pet15val31= this.state.getPonderacion[30].nunca
        } 
      if(this.state.peticion15[32].Respuestas=="Siempre"){
        pet15res156="Siempre"
        pet15val32= this.state.getPonderacion[31].siempre
        }else if(this.state.peticion15[32].Respuestas=="CasiSiempre"){
          pet15res157="Casi Siempre"
          pet15val32= this.state.getPonderacion[31].casisiempre
        }
        else if(this.state.peticion15[32].Respuestas=="AlgunasVeces"){
          pet15res158="Algunas Veces"
          pet15val32= this.state.getPonderacion[31].algunasveces
        } 
        else if(this.state.peticion15[32].Respuestas=="CasiNunca"){
          pet15res159="Casi Nunca"
          pet15val32= this.state.getPonderacion[31].casinunca
        } 
        else if(this.state.peticion15[32].Respuestas=="Nunca"){
          pet15res160="Nunca"
          pet15val32= this.state.getPonderacion[31].nunca
        } 
  
        if(this.state.peticion15[33].Respuestas=="Siempre"){
          pet15res161="Siempre"
          pet15val33= this.state.getPonderacion[32].siempre
          }else if(this.state.peticion15[33].Respuestas=="CasiSiempre"){
            pet15res162="Casi Siempre"
            pet15val33= this.state.getPonderacion[32].casisiempre
          }
          else if(this.state.peticion15[33].Respuestas=="AlgunasVeces"){
            pet15res163="Algunas Veces"
            pet15val33= this.state.getPonderacion[32].algunasveces
          } 
          else if(this.state.peticion15[33].Respuestas=="CasiNunca"){
            pet15res164="Casi Nunca"
            pet15val33= this.state.getPonderacion[32].casinunca
          } 
          else if(this.state.peticion15[33].Respuestas=="Nunca"){
            pet15res165="Nunca"
            pet15val33= this.state.getPonderacion[32].nunca
          } 
  
        if(this.state.peticion15[34].Respuestas=="Siempre"){
          pet15res166="Siempre"
          pet15val34= this.state.getPonderacion[33].siempre
          }else if(this.state.peticion15[34].Respuestas=="CasiSiempre"){
            pet15res167="Casi Siempre"
            pet15val34= this.state.getPonderacion[33].casisiempre
          }
          else if(this.state.peticion15[34].Respuestas=="AlgunasVeces"){
            pet15res168="Algunas Veces"
            pet15val34= this.state.getPonderacion[33].algunasveces
          } 
          else if(this.state.peticion15[34].Respuestas=="CasiNunca"){
            pet15res169="Casi Nunca"
            pet15val34= this.state.getPonderacion[33].casinunca
          } 
          else if(this.state.peticion15[34].Respuestas=="Nunca"){
            pet15res170="Nunca"
            pet15val34= this.state.getPonderacion[33].nunca
          } 
          if(this.state.peticion15[35].Respuestas=="Siempre"){
            pet15res171="Siempre"
            pet15val35= this.state.getPonderacion[34].siempre
            }else if(this.state.peticion15[35].Respuestas=="CasiSiempre"){
              pet15res172="Casi Siempre"
              pet15val35= this.state.getPonderacion[34].casisiempre
            }
            else if(this.state.peticion15[35].Respuestas=="AlgunasVeces"){
              pet15res173="Algunas Veces"
              pet15val35= this.state.getPonderacion[34].algunasveces
            } 
            else if(this.state.peticion15[35].Respuestas=="CasiNunca"){
              pet15res174="Casi Nunca"
              pet15val35= this.state.getPonderacion[34].casinunca
            } 
            else if(this.state.peticion15[15].Respuestas=="Nunca"){
              pet15res175="Nunca"
              pet15val35= this.state.getPonderacion[34].nunca
            } 
  
          if(this.state.peticion15[36].Respuestas=="Siempre"){
            pet15res176="Siempre"
            pet15val36= this.state.getPonderacion[35].siempre
            }else if(this.state.peticion15[36].Respuestas=="CasiSiempre"){
              pet15res177="Casi Siempre"
              pet15val36= this.state.getPonderacion[35].casisiempre
            }
            else if(this.state.peticion15[36].Respuestas=="AlgunasVeces"){
              pet15res178="Algunas Veces"
              pet15val36= this.state.getPonderacion[35].algunasveces
            } 
            else if(this.state.peticion15[36].Respuestas=="CasiNunca"){
              pet15res179="Casi Nunca"
              pet15val36= this.state.getPonderacion[35].casinunca
            } 
            else if(this.state.peticion15[36].Respuestas=="Nunca"){
              pet15res180="Nunca"
              pet15val36= this.state.getPonderacion[35].nunca
            }
  
          if(this.state.peticion15[37].Respuestas=="Siempre"){
            pet15res181="Siempre"
            pet15val37= this.state.getPonderacion[36].siempre
            
            }else if(this.state.peticion15[37].Respuestas=="CasiSiempre"){
              pet15res182="Casi Siempre"
              pet15val37= this.state.getPonderacion[36].casisiempre
            }
            else if(this.state.peticion15[37].Respuestas=="AlgunasVeces"){
              pet15res183="Algunas Veces"
              pet15val37= this.state.getPonderacion[36].algunasveces
            } 
            else if(this.state.peticion15[37].Respuestas=="CasiNunca"){
              pet15res184="Casi Nunca"
              pet15val37= this.state.getPonderacion[36].casinunca
            } 
            else if(this.state.peticion15[37].Respuestas=="Nunca"){
              pet15res185="Nunca"
              pet15val37= this.state.getPonderacion[36].nunca
            }
          if(this.state.peticion15[38].Respuestas=="Siempre"){
            pet15res186="Siempre"
            pet15val38= this.state.getPonderacion[37].siempre
            }else if(this.state.peticion15[38].Respuestas=="CasiSiempre"){
              pet15res187="Casi Siempre"
              pet15val38= this.state.getPonderacion[37].casisiempre
            }
            else if(this.state.peticion15[38].Respuestas=="AlgunasVeces"){
              pet15res188="Algunas Veces"
              pet15val38= this.state.getPonderacion[37].algunasveces
            } 
            else if(this.state.peticion15[38].Respuestas=="CasiNunca"){
              pet15res189="Casi Nunca"
              pet15val38= this.state.getPonderacion[37].casinunca
            } 
            else if(this.state.peticion15[38].Respuestas=="Nunca"){
              pet15res190="Nunca"
              pet15val38= this.state.getPonderacion[37].nunca
            }
  
            if(this.state.peticion15[39].Respuestas=="Siempre"){
              pet15res191="Siempre"
              pet15val39= this.state.getPonderacion[38].siempre
              }else if(this.state.peticion15[39].Respuestas=="CasiSiempre"){
                pet15res192="Casi Siempre"
                pet15val39= this.state.getPonderacion[38].casisiempre
              }
              else if(this.state.peticion15[39].Respuestas=="AlgunasVeces"){
                pet15res193="Algunas Veces"
                pet15val39= this.state.getPonderacion[38].algunasveces
              } 
              else if(this.state.peticion15[39].Respuestas=="CasiNunca"){
                pet15res194="Casi Nunca"
                pet15val39= this.state.getPonderacion[38].casinunca
              } 
              else if(this.state.peticion15[39].Respuestas=="Nunca"){
                pet15res195="Nunca"
                pet15val39= this.state.getPonderacion[38].nunca
              }
  
              if(this.state.peticion15[40].Respuestas=="Siempre"){
                pet15res196="Siempre"
                pet15val40= this.state.getPonderacion[39].siempre
                }else if(this.state.peticion15[40].Respuestas=="CasiSiempre"){
                  pet15res197="Casi Siempre"
                  pet15val40= this.state.getPonderacion[39].casisiempre
                }
                else if(this.state.peticion15[40].Respuestas=="AlgunasVeces"){
                  pet15res198="Algunas Veces"
                  pet15val40= this.state.getPonderacion[39].algunasveces
                } 
                else if(this.state.peticion15[40].Respuestas=="CasiNunca"){
                  pet15res199="Casi Nunca"
                  pet15val40= this.state.getPonderacion[39].casinunca
                } 
                else if(this.state.peticion15[40].Respuestas=="Nunca"){
                  pet15res200="Nunca"
                  pet15val40= this.state.getPonderacion[39].nunca
                }
  
              if(this.state.peticion15[42].Respuestas=="Siempre"){
                pet15res201="Siempre"
                pet15val41= this.state.getPonderacion[40].siempre
              }else if(this.state.peticion15[42].Respuestas=="CasiSiempre"){
                pet15res202="Casi Siempre"
                pet15val41= this.state.getPonderacion[40].casisiempre
              }
              else if(this.state.peticion15[42].Respuestas=="AlgunasVeces"){
                pet15res203="Algunas Veces"
                pet15val41= this.state.getPonderacion[40].algunasveces
              } 
              else if(this.state.peticion15[42].Respuestas=="CasiNunca"){
                pet15res204="Casi Nunca"
                pet15val41= this.state.getPonderacion[40].casinunca
              } 
              else if(this.state.peticion15[42].Respuestas=="Nunca"){
                pet15res205="Nunca"
                pet15val41= this.state.getPonderacion[40].nunca
              }
            if(this.state.peticion15[43].Respuestas=="Siempre"){
              pet15res206="Siempre"
              pet15val42= this.state.getPonderacion[41].siempre
            }else if(this.state.peticion15[43].Respuestas=="CasiSiempre"){
              pet15res207="Casi Siempre"
              pet15val42= this.state.getPonderacion[41].casisiempre
            }
            else if(this.state.peticion15[43].Respuestas=="AlgunasVeces"){
              pet15res208="Algunas Veces"
              pet15val42= this.state.getPonderacion[41].algunasveces
            } 
            else if(this.state.peticion15[43].Respuestas=="CasiNunca"){
              pet15res209="Casi Nunca"
              pet15val42= this.state.getPonderacion[41].casinunca
            } 
            else if(this.state.peticion15[43].Respuestas=="Nunca"){
              pet15res210="Nunca"
              pet15val42= this.state.getPonderacion[41].nunca
            }
          if(this.state.peticion15[44].Respuestas=="Siempre"){
            pet15res211="Siempre"
            pet15val43= this.state.getPonderacion[42].siempre
          }else if(this.state.peticion15[44].Respuestas=="CasiSiempre"){
            pet15res212="Casi Siempre"
            pet15val43= this.state.getPonderacion[42].casisiempre
          }
          else if(this.state.peticion15[44].Respuestas=="AlgunasVeces"){
            pet15res213="Algunas Veces"
            pet15val43= this.state.getPonderacion[42].algunasveces
          } 
          else if(this.state.peticion15[44].Respuestas=="CasiNunca"){
            pet15res214="Casi Nunca"
            pet15val43= this.state.getPonderacion[42].casinunca
          } 
          else if(this.state.peticion15[44].Respuestas=="Nunca"){
            pet15res215="Nunca"
            pet15val43= this.state.getPonderacion[42].nunca
          }
  
        if(this.state.peticion15[46].Respuestas=="Siempre"){
          pet15res216="Siempre"
          pet15val44= this.state.getPonderacion[43].siempre
        }else if(this.state.peticion15[46].Respuestas=="CasiSiempre"){
          pet15res217="Casi Siempre"
          pet15val44= this.state.getPonderacion[43].casisiempre
        }
        else if(this.state.peticion15[46].Respuestas=="AlgunasVeces"){
          pet15res218="Algunas Veces"
          pet15val44= this.state.getPonderacion[43].algunasveces
        } 
        else if(this.state.peticion15[46].Respuestas=="CasiNunca"){
          pet15res219="Casi Nunca"
          pet15val44= this.state.getPonderacion[43].casinunca
        } 
        else if(this.state.peticion15[46].Respuestas=="Nunca"){
          pet15res220="Nunca"
          pet15val44= this.state.getPonderacion[43].nunca
        }
  
      if(this.state.peticion15[47].Respuestas=="Siempre"){
        pet15res221="Siempre"
        pet15val45= this.state.getPonderacion[44].siempre
      }else if(this.state.peticion15[47].Respuestas=="CasiSiempre"){
        pet15res222="Casi Siempre"
        pet15val45= this.state.getPonderacion[44].casisiempre
      }
      else if(this.state.peticion15[47].Respuestas=="AlgunasVeces"){
        pet15res223="Algunas Veces"
        pet15val45= this.state.getPonderacion[44].algunasveces
      } 
      else if(this.state.peticion15[47].Respuestas=="CasiNunca"){
        pet15res224="Casi Nunca"
        pet15val45= this.state.getPonderacion[44].casinunca
      } 
      else if(this.state.peticion15[47].Respuestas=="Nunca"){
        pet15res225="Nunca"
        pet15val45= this.state.getPonderacion[44].nunca
      }
      if(this.state.peticion15[48].Respuestas=="Siempre"){
        pet15res226="Siempre"
        pet15val46= this.state.getPonderacion[45].siempre
      }else if(this.state.peticion15[48].Respuestas=="CasiSiempre"){
        pet15res227="Casi Siempre"
        pet15val46= this.state.getPonderacion[45].casisiempre
      }
      else if(this.state.peticion15[48].Respuestas=="AlgunasVeces"){
        pet15res228="Algunas Veces"
        pet15val46= this.state.getPonderacion[45].algunasveces
      } 
      else if(this.state.peticion15[48].Respuestas=="CasiNunca"){
        pet15res229="Casi Nunca"
        pet15val46= this.state.getPonderacion[45].casinunca
      } 
      else if(this.state.peticion15[48].Respuestas=="Nunca"){
        pet15res230="Nunca"
        pet15val46= this.state.getPonderacion[45].nunca
      }
}
pet1ent1=parseInt(valor1); pet1ent2=parseInt(valor2); pet1ent3=parseInt(valor3); pet1ent4=parseInt(valor4);
pet1ent5=parseInt(valor5); pet1ent6=parseInt(valor6); pet1ent7=parseInt(valor7); pet1ent8=parseInt(valor8);
pet1ent9=parseInt(valor9); pet1ent10=parseInt(valor10); pet1ent11=parseInt(valor11); pet1ent12=parseInt(valor12);
pet1ent13=parseInt(valor13); pet1ent14=parseInt(valor14); pet1ent15=parseInt(valor15); pet1ent16=parseInt(valor16);
pet1ent17=parseInt(valor17); pet1ent18=parseInt(valor18); pet1ent19=parseInt(valor19); pet1ent20=parseInt(valor20);
pet1ent21=parseInt(valor21); pet1ent22=parseInt(valor22); pet1ent23=parseInt(valor23); pet1ent24=parseInt(valor24);
pet1ent25=parseInt(valor25); pet1ent26=parseInt(valor26); pet1ent27=parseInt(valor27); pet1ent28=parseInt(valor28);
pet1ent29=parseInt(valor29); pet1ent30=parseInt(valor30); pet1ent31=parseInt(valor31); pet1ent32=parseInt(valor32);
pet1ent33=parseInt(valor33); pet1ent34=parseInt(valor34); pet1ent35=parseInt(valor35); pet1ent36=parseInt(valor36);
pet1ent37=parseInt(valor37); pet1ent38=parseInt(valor38); pet1ent39=parseInt(valor39); pet1ent40=parseInt(valor40);
pet1ent41=parseInt(valor41); pet1ent42=parseInt(valor42); pet1ent43=parseInt(valor43); pet1ent44=parseInt(valor44);
pet1ent45=parseInt(valor45); pet1ent46=parseInt(valor46)
totalpet1 = (pet1ent1+pet1ent2+pet1ent3+pet1ent4+pet1ent5+pet1ent6+pet1ent7+pet1ent8+pet1ent9+pet1ent10+pet1ent11+pet1ent12+pet1ent13+pet1ent14+pet1ent15+pet1ent16+pet1ent17+pet1ent18+pet1ent19+pet1ent20+pet1ent21+pet1ent22+pet1ent23+pet1ent24+pet1ent25+pet1ent26+pet1ent27+pet1ent28+pet1ent29+pet1ent30+pet1ent31+pet1ent32+pet1ent33+pet1ent34+pet1ent35+pet1ent36+pet1ent37+pet1ent38+pet1ent39+pet1ent40+pet1ent41+pet1ent42+pet1ent43+pet1ent44+pet1ent45+pet1ent46);        

pet2ent1=parseInt(pet2val1); pet2ent2=parseInt(pet2val2); pet2ent3=parseInt(pet2val3); pet2ent4=parseInt(pet2val4);
pet2ent5=parseInt(pet2val5); pet2ent6=parseInt(pet2val6); pet2ent7=parseInt(pet2val7); pet2ent8=parseInt(pet2val8);
pet2ent9=parseInt(pet2val9); pet2ent10=parseInt(pet2val10); pet2ent11=parseInt(pet2val11); pet2ent12=parseInt(pet2val12);
pet2ent13=parseInt(pet2val13); pet2ent14=parseInt(pet2val14); pet2ent15=parseInt(pet2val15); pet2ent16=parseInt(pet2val16);
pet2ent17=parseInt(pet2val17); pet2ent18=parseInt(pet2val18); pet2ent19=parseInt(pet2val19); pet2ent20=parseInt(pet2val20);
pet2ent21=parseInt(pet2val21); pet2ent22=parseInt(pet2val22); pet2ent23=parseInt(pet2val23); pet2ent24=parseInt(pet2val24);
pet2ent25=parseInt(pet2val25); pet2ent26=parseInt(pet2val26); pet2ent27=parseInt(pet2val27); pet2ent28=parseInt(pet2val28);
pet2ent29=parseInt(pet2val29); pet2ent30=parseInt(pet2val30); pet2ent31=parseInt(pet2val31); pet2ent32=parseInt(pet2val32);
pet2ent33=parseInt(pet2val33); pet2ent34=parseInt(pet2val34); pet2ent35=parseInt(pet2val35); pet2ent36=parseInt(pet2val36);
pet2ent37=parseInt(pet2val37); pet2ent38=parseInt(pet2val38); pet2ent39=parseInt(pet2val39); pet2ent40=parseInt(pet2val40);
pet2ent41=parseInt(pet2val41); pet2ent42=parseInt(pet2val42); pet2ent43=parseInt(pet2val43); pet2ent44=parseInt(pet2val44);
pet2ent45=parseInt(pet2val45); pet2ent46=parseInt(pet2val46)
totalpet2 = (pet2ent1+pet2ent2+pet2ent3+pet2ent4+pet2ent5+pet2ent6+pet2ent7+pet2ent8+pet2ent9+pet2ent10+pet2ent11+pet2ent12+pet2ent13+pet2ent14+pet2ent15+pet2ent16+pet2ent17+pet2ent18+pet2ent19+pet2ent20+pet2ent21+pet2ent22+pet2ent23+pet2ent24+pet2ent25+pet2ent26+pet2ent27+pet2ent28+pet2ent29+pet2ent30+pet2ent31+pet2ent32+pet2ent33+pet2ent34+pet2ent35+pet2ent36+pet2ent37+pet2ent38+pet2ent39+pet2ent40+pet2ent41+pet2ent42+pet2ent43+pet2ent44+pet2ent45+pet2ent46);  

pet3ent1=parseInt(pet3val1); pet3ent2=parseInt(pet3val2); pet3ent3=parseInt(pet3val3); pet3ent4=parseInt(pet3val4);
pet3ent5=parseInt(pet3val5); pet3ent6=parseInt(pet3val6); pet3ent7=parseInt(pet3val7); pet3ent8=parseInt(pet3val8);
pet3ent9=parseInt(pet3val9); pet3ent10=parseInt(pet3val10); pet3ent11=parseInt(pet3val11); pet3ent12=parseInt(pet3val12);
pet3ent13=parseInt(pet3val13); pet3ent14=parseInt(pet3val14); pet3ent15=parseInt(pet3val15); pet3ent16=parseInt(pet3val16);
pet3ent17=parseInt(pet3val17); pet3ent18=parseInt(pet3val18); pet3ent19=parseInt(pet3val19); pet3ent20=parseInt(pet3val20);
pet3ent21=parseInt(pet3val21); pet3ent22=parseInt(pet3val22); pet3ent23=parseInt(pet3val23); pet3ent24=parseInt(pet3val24);
pet3ent25=parseInt(pet3val25); pet3ent26=parseInt(pet3val26); pet3ent27=parseInt(pet3val27); pet3ent28=parseInt(pet3val28);
pet3ent29=parseInt(pet3val29); pet3ent30=parseInt(pet3val30); pet3ent31=parseInt(pet3val31); pet3ent32=parseInt(pet3val32);
pet3ent33=parseInt(pet3val33); pet3ent34=parseInt(pet3val34); pet3ent35=parseInt(pet3val35); pet3ent36=parseInt(pet3val36);
pet3ent37=parseInt(pet3val37); pet3ent38=parseInt(pet3val38); pet3ent39=parseInt(pet3val39); pet3ent40=parseInt(pet3val40);
pet3ent41=parseInt(pet3val41); pet3ent42=parseInt(pet3val42); pet3ent43=parseInt(pet3val43); pet3ent44=parseInt(pet3val44);
pet3ent45=parseInt(pet3val45); pet3ent46=parseInt(pet3val46)
totalpet3 = (pet3ent1+pet3ent2+pet3ent3+pet3ent4+pet3ent5+pet3ent6+pet3ent7+pet3ent8+pet3ent9+pet3ent10+pet3ent11+pet3ent12+pet3ent13+pet3ent14+pet3ent15+pet3ent16+pet3ent17+pet3ent18+pet3ent19+pet3ent20+pet3ent21+pet3ent22+pet3ent23+pet3ent24+pet3ent25+pet3ent26+pet3ent27+pet3ent28+pet3ent29+pet3ent30+pet3ent31+pet3ent32+pet3ent33+pet3ent34+pet3ent35+pet3ent36+pet3ent37+pet3ent38+pet3ent39+pet3ent40+pet3ent41+pet3ent42+pet3ent43+pet3ent44+pet3ent45+pet3ent46);        


pet4ent1=parseInt(pet4val1); pet4ent2=parseInt(pet4val2); pet4ent3=parseInt(pet4val3); pet4ent4=parseInt(pet4val4);
pet4ent5=parseInt(pet4val5); pet4ent6=parseInt(pet4val6); pet4ent7=parseInt(pet4val7); pet4ent8=parseInt(pet4val8);
pet4ent9=parseInt(pet4val9); pet4ent10=parseInt(pet4val10); pet4ent11=parseInt(pet4val11); pet4ent12=parseInt(pet4val12);
pet4ent13=parseInt(pet4val13); pet4ent14=parseInt(pet4val14); pet4ent15=parseInt(pet4val15); pet4ent16=parseInt(pet4val16);
pet4ent17=parseInt(pet4val17); pet4ent18=parseInt(pet4val18); pet4ent19=parseInt(pet4val19); pet4ent20=parseInt(pet4val20);
pet4ent21=parseInt(pet4val21); pet4ent22=parseInt(pet4val22); pet4ent23=parseInt(pet4val23); pet4ent24=parseInt(pet4val24);
pet4ent25=parseInt(pet4val25); pet4ent26=parseInt(pet4val26); pet4ent27=parseInt(pet4val27); pet4ent28=parseInt(pet4val28);
pet4ent29=parseInt(pet4val29); pet4ent30=parseInt(pet4val30); pet4ent31=parseInt(pet4val31); pet4ent32=parseInt(pet4val32);
pet4ent33=parseInt(pet4val33); pet4ent34=parseInt(pet4val34); pet4ent35=parseInt(pet4val35); pet4ent36=parseInt(pet4val36);
pet4ent37=parseInt(pet4val37); pet4ent38=parseInt(pet4val38); pet4ent39=parseInt(pet4val39); pet4ent40=parseInt(pet4val40);
pet4ent41=parseInt(pet4val41); pet4ent42=parseInt(pet4val42); pet4ent43=parseInt(pet4val43); pet4ent44=parseInt(pet4val44);
pet4ent45=parseInt(pet4val45); pet4ent46=parseInt(pet4val46)
totalpet4 = (pet4ent1+pet4ent2+pet4ent3+pet4ent4+pet4ent5+pet4ent6+pet4ent7+pet4ent8+pet4ent9+pet4ent10+pet4ent11+pet4ent12+pet4ent13+pet4ent14+pet4ent15+pet4ent16+pet4ent17+pet4ent18+pet4ent19+pet4ent20+pet4ent21+pet4ent22+pet4ent23+pet4ent24+pet4ent25+pet4ent26+pet4ent27+pet4ent28+pet4ent29+pet4ent30+pet4ent31+pet4ent32+pet4ent33+pet4ent34+pet4ent35+pet4ent36+pet4ent37+pet4ent38+pet4ent39+pet4ent40+pet4ent41+pet4ent42+pet4ent43+pet4ent44+pet4ent45+pet4ent46);        
     
pet5ent1=parseInt(pet5val1); pet5ent2=parseInt(pet5val2); pet5ent3=parseInt(pet5val3); pet5ent4=parseInt(pet5val4);
pet5ent5=parseInt(pet5val5); pet5ent6=parseInt(pet5val6); pet5ent7=parseInt(pet5val7); pet5ent8=parseInt(pet5val8);
pet5ent9=parseInt(pet5val9); pet5ent10=parseInt(pet5val10); pet5ent11=parseInt(pet5val11); pet5ent12=parseInt(pet5val12);
pet5ent13=parseInt(pet5val13); pet5ent14=parseInt(pet5val14); pet5ent15=parseInt(pet5val15); pet5ent16=parseInt(pet5val16);
pet5ent17=parseInt(pet5val17); pet5ent18=parseInt(pet5val18); pet5ent19=parseInt(pet5val19); pet5ent20=parseInt(pet5val20);
pet5ent21=parseInt(pet5val21); pet5ent22=parseInt(pet5val22); pet5ent23=parseInt(pet5val23); pet5ent24=parseInt(pet5val24);
pet5ent25=parseInt(pet5val25); pet5ent26=parseInt(pet5val26); pet5ent27=parseInt(pet5val27); pet5ent28=parseInt(pet5val28);
pet5ent29=parseInt(pet5val29); pet5ent30=parseInt(pet5val30); pet5ent31=parseInt(pet5val31); pet5ent32=parseInt(pet5val32);
pet5ent33=parseInt(pet5val33); pet5ent34=parseInt(pet5val34); pet5ent35=parseInt(pet5val35); pet5ent36=parseInt(pet5val36);
pet5ent37=parseInt(pet5val37); pet5ent38=parseInt(pet5val38); pet5ent39=parseInt(pet5val39); pet5ent40=parseInt(pet5val40);
pet5ent41=parseInt(pet5val41); pet5ent42=parseInt(pet5val42); pet5ent43=parseInt(pet5val43); pet5ent44=parseInt(pet5val44);
pet5ent45=parseInt(pet5val45); pet5ent46=parseInt(pet5val46)
totalpet5 = (pet5ent1+pet5ent2+pet5ent3+pet5ent4+pet5ent5+pet5ent6+pet5ent7+pet5ent8+pet5ent9+pet5ent10+pet5ent11+pet5ent12+pet5ent13+pet5ent14+pet5ent15+pet5ent16+pet5ent17+pet5ent18+pet5ent19+pet5ent20+pet5ent21+pet5ent22+pet5ent23+pet5ent24+pet5ent25+pet5ent26+pet5ent27+pet5ent28+pet5ent29+pet5ent30+pet5ent31+pet5ent32+pet5ent33+pet5ent34+pet5ent35+pet5ent36+pet5ent37+pet5ent38+pet5ent39+pet5ent40+pet5ent41+pet5ent42+pet5ent43+pet5ent44+pet5ent45+pet5ent46);          
     
pet6ent1=parseInt(pet6val1); pet6ent2=parseInt(pet6val2); pet6ent3=parseInt(pet6val3); pet6ent4=parseInt(pet6val4);
pet6ent5=parseInt(pet6val5); pet6ent6=parseInt(pet6val6); pet6ent7=parseInt(pet6val7); pet6ent8=parseInt(pet6val8);
pet6ent9=parseInt(pet6val9); pet6ent10=parseInt(pet6val10); pet6ent11=parseInt(pet6val11); pet6ent12=parseInt(pet6val12);
pet6ent13=parseInt(pet6val13); pet6ent14=parseInt(pet6val14); pet6ent15=parseInt(pet6val15); pet6ent16=parseInt(pet6val16);
pet6ent17=parseInt(pet6val17); pet6ent18=parseInt(pet6val18); pet6ent19=parseInt(pet6val19); pet6ent20=parseInt(pet6val20);
pet6ent21=parseInt(pet6val21); pet6ent22=parseInt(pet6val22); pet6ent23=parseInt(pet6val23); pet6ent24=parseInt(pet6val24);
pet6ent25=parseInt(pet6val25); pet6ent26=parseInt(pet6val26); pet6ent27=parseInt(pet6val27); pet6ent28=parseInt(pet6val28);
pet6ent29=parseInt(pet6val29); pet6ent30=parseInt(pet6val30); pet6ent31=parseInt(pet6val31); pet6ent32=parseInt(pet6val32);
pet6ent33=parseInt(pet6val33); pet6ent34=parseInt(pet6val34); pet6ent35=parseInt(pet6val35); pet6ent36=parseInt(pet6val36);
pet6ent37=parseInt(pet6val37); pet6ent38=parseInt(pet6val38); pet6ent39=parseInt(pet6val39); pet6ent40=parseInt(pet6val40);
pet6ent41=parseInt(pet6val41); pet6ent42=parseInt(pet6val42); pet6ent43=parseInt(pet6val43); pet6ent44=parseInt(pet6val44);
pet6ent45=parseInt(pet6val45); pet6ent46=parseInt(pet6val46)
totalpet6 = (pet6ent1+pet6ent2+pet6ent3+pet6ent4+pet6ent5+pet6ent6+pet6ent7+pet6ent8+pet6ent9+pet6ent10+pet6ent11+pet6ent12+pet6ent13+pet6ent14+pet6ent15+pet6ent16+pet6ent17+pet6ent18+pet6ent19+pet6ent20+pet6ent21+pet6ent22+pet6ent23+pet6ent24+pet6ent25+pet6ent26+pet6ent27+pet6ent28+pet6ent29+pet6ent30+pet6ent31+pet6ent32+pet6ent33+pet6ent34+pet6ent35+pet6ent36+pet6ent37+pet6ent38+pet6ent39+pet6ent40+pet6ent41+pet6ent42+pet6ent43+pet6ent44+pet6ent45+pet6ent46);        
  
pet7ent1=parseInt(pet7val1); pet7ent2=parseInt(pet7val2); pet7ent3=parseInt(pet7val3); pet7ent4=parseInt(pet7val4);
pet7ent5=parseInt(pet7val5); pet7ent6=parseInt(pet7val6); pet7ent7=parseInt(pet7val7); pet7ent8=parseInt(pet7val8);
pet7ent9=parseInt(pet7val9); pet7ent10=parseInt(pet7val10); pet7ent11=parseInt(pet7val11); pet7ent12=parseInt(pet7val12);
pet7ent13=parseInt(pet7val13); pet7ent14=parseInt(pet7val14); pet7ent15=parseInt(pet7val15); pet7ent16=parseInt(pet7val16);
pet7ent17=parseInt(pet7val17); pet7ent18=parseInt(pet7val18); pet7ent19=parseInt(pet7val19); pet7ent20=parseInt(pet7val20);
pet7ent21=parseInt(pet7val21); pet7ent22=parseInt(pet7val22); pet7ent23=parseInt(pet7val23); pet7ent24=parseInt(pet7val24);
pet7ent25=parseInt(pet7val25); pet7ent26=parseInt(pet7val26); pet7ent27=parseInt(pet7val27); pet7ent28=parseInt(pet7val28);
pet7ent29=parseInt(pet7val29); pet7ent30=parseInt(pet7val30); pet7ent31=parseInt(pet7val31); pet7ent32=parseInt(pet7val32);
pet7ent33=parseInt(pet7val33); pet7ent34=parseInt(pet7val34); pet7ent35=parseInt(pet7val35); pet7ent36=parseInt(pet7val36);
pet7ent37=parseInt(pet7val37); pet7ent38=parseInt(pet7val38); pet7ent39=parseInt(pet7val39); pet7ent40=parseInt(pet7val40);
pet7ent41=parseInt(pet7val41); pet7ent42=parseInt(pet7val42); pet7ent43=parseInt(pet7val43); pet7ent44=parseInt(pet7val44);
pet7ent45=parseInt(pet7val45); pet7ent46=parseInt(pet7val46)
totalpet7 = (pet7ent1+pet7ent2+pet7ent3+pet7ent4+pet7ent5+pet7ent6+pet7ent7+pet7ent8+pet7ent9+pet7ent10+pet7ent11+pet7ent12+pet7ent13+pet7ent14+pet7ent15+pet7ent16+pet7ent17+pet7ent18+pet7ent19+pet7ent20+pet7ent21+pet7ent22+pet7ent23+pet7ent24+pet7ent25+pet7ent26+pet7ent27+pet7ent28+pet7ent29+pet7ent30+pet7ent31+pet7ent32+pet7ent33+pet7ent34+pet7ent35+pet7ent36+pet7ent37+pet7ent38+pet7ent39+pet7ent40+pet7ent41+pet7ent42+pet7ent43+pet7ent44+pet7ent45+pet7ent46);        

 
pet8ent1=parseInt(pet8val1); pet8ent2=parseInt(pet8val2); pet8ent3=parseInt(pet8val3); pet8ent4=parseInt(pet8val4);
pet8ent5=parseInt(pet8val5); pet8ent6=parseInt(pet8val6); pet8ent7=parseInt(pet8val7); pet8ent8=parseInt(pet8val8);
pet8ent9=parseInt(pet8val9); pet8ent10=parseInt(pet8val10); pet8ent11=parseInt(pet8val11); pet8ent12=parseInt(pet8val12);
pet8ent13=parseInt(pet8val13); pet8ent14=parseInt(pet8val14); pet8ent15=parseInt(pet8val15); pet8ent16=parseInt(pet8val16);
pet8ent17=parseInt(pet8val17); pet8ent18=parseInt(pet8val18); pet8ent19=parseInt(pet8val19); pet8ent20=parseInt(pet8val20);
pet8ent21=parseInt(pet8val21); pet8ent22=parseInt(pet8val22); pet8ent23=parseInt(pet8val23); pet8ent24=parseInt(pet8val24);
pet8ent25=parseInt(pet8val25); pet8ent26=parseInt(pet8val26); pet8ent27=parseInt(pet8val27); pet8ent28=parseInt(pet8val28);
pet8ent29=parseInt(pet8val29); pet8ent30=parseInt(pet8val30); pet8ent31=parseInt(pet8val31); pet8ent32=parseInt(pet8val32);
pet8ent33=parseInt(pet8val33); pet8ent34=parseInt(pet8val34); pet8ent35=parseInt(pet8val35); pet8ent36=parseInt(pet8val36);
pet8ent37=parseInt(pet8val37); pet8ent38=parseInt(pet8val38); pet8ent39=parseInt(pet8val39); pet8ent40=parseInt(pet8val40);
pet8ent41=parseInt(pet8val41); pet8ent42=parseInt(pet8val42); pet8ent43=parseInt(pet8val43); pet8ent44=parseInt(pet8val44);
pet8ent45=parseInt(pet8val45); pet8ent46=parseInt(pet8val46)
totalpet8 = (pet8ent1+pet8ent2+pet8ent3+pet8ent4+pet8ent5+pet8ent6+pet8ent7+pet8ent8+pet8ent9+pet8ent10+pet8ent11+pet8ent12+pet8ent13+pet8ent14+pet8ent15+pet8ent16+pet8ent17+pet8ent18+pet8ent19+pet8ent20+pet8ent21+pet8ent22+pet8ent23+pet8ent24+pet8ent25+pet8ent26+pet8ent27+pet8ent28+pet8ent29+pet8ent30+pet8ent31+pet8ent32+pet8ent33+pet8ent34+pet8ent35+pet8ent36+pet8ent37+pet8ent38+pet8ent39+pet8ent40+pet8ent41+pet8ent42+pet8ent43+pet8ent44+pet8ent45+pet8ent46);        

pet9ent1=parseInt(pet9val1); pet9ent2=parseInt(pet9val2); pet9ent3=parseInt(pet9val3); pet9ent4=parseInt(pet9val4);
pet9ent5=parseInt(pet9val5); pet9ent6=parseInt(pet9val6); pet9ent7=parseInt(pet9val7); pet9ent8=parseInt(pet9val8);
pet9ent9=parseInt(pet9val9); pet9ent10=parseInt(pet9val10); pet9ent11=parseInt(pet9val11); pet9ent12=parseInt(pet9val12);
pet9ent13=parseInt(pet9val13); pet9ent14=parseInt(pet9val14); pet9ent15=parseInt(pet9val15); pet9ent16=parseInt(pet9val16);
pet9ent17=parseInt(pet9val17); pet9ent18=parseInt(pet9val18); pet9ent19=parseInt(pet9val19); pet9ent20=parseInt(pet9val20);
pet9ent21=parseInt(pet9val21); pet9ent22=parseInt(pet9val22); pet9ent23=parseInt(pet9val23); pet9ent24=parseInt(pet9val24);
pet9ent25=parseInt(pet9val25); pet9ent26=parseInt(pet9val26); pet9ent27=parseInt(pet9val27); pet9ent28=parseInt(pet9val28);
pet9ent29=parseInt(pet9val29); pet9ent30=parseInt(pet9val30); pet9ent31=parseInt(pet9val31); pet9ent32=parseInt(pet9val32);
pet9ent33=parseInt(pet9val33); pet9ent34=parseInt(pet9val34); pet9ent35=parseInt(pet9val35); pet9ent36=parseInt(pet9val36);
pet9ent37=parseInt(pet9val37); pet9ent38=parseInt(pet9val38); pet9ent39=parseInt(pet9val39); pet9ent40=parseInt(pet9val40);
pet9ent41=parseInt(pet9val41); pet9ent42=parseInt(pet9val42); pet9ent43=parseInt(pet9val43); pet9ent44=parseInt(pet9val44);
pet9ent45=parseInt(pet9val45); pet9ent46=parseInt(pet9val46)
totalpet9 = (pet9ent1+pet9ent2+pet9ent3+pet9ent4+pet9ent5+pet9ent6+pet9ent7+pet9ent8+pet9ent9+pet9ent10+pet9ent11+pet9ent12+pet9ent13+pet9ent14+pet9ent15+pet9ent16+pet9ent17+pet9ent18+pet9ent19+pet9ent20+pet9ent21+pet9ent22+pet9ent23+pet9ent24+pet9ent25+pet9ent26+pet9ent27+pet9ent28+pet9ent29+pet9ent30+pet9ent31+pet9ent32+pet9ent33+pet9ent34+pet9ent35+pet9ent36+pet9ent37+pet9ent38+pet9ent39+pet9ent40+pet9ent41+pet9ent42+pet9ent43+pet9ent44+pet9ent45+pet9ent46);        
   
pet10ent1=parseInt(pet10val1); pet10ent2=parseInt(pet10val2); pet10ent3=parseInt(pet10val3); pet10ent4=parseInt(pet10val4);
pet10ent5=parseInt(pet10val5); pet10ent6=parseInt(pet10val6); pet10ent7=parseInt(pet10val7); pet10ent8=parseInt(pet10val8);
pet10ent9=parseInt(pet10val9); pet10ent10=parseInt(pet10val10); pet10ent11=parseInt(pet10val11); pet10ent12=parseInt(pet10val12);
pet10ent13=parseInt(pet10val13); pet10ent14=parseInt(pet10val14); pet10ent15=parseInt(pet10val15); pet10ent16=parseInt(pet10val16);
pet10ent17=parseInt(pet10val17); pet10ent18=parseInt(pet10val18); pet10ent19=parseInt(pet10val19); pet10ent20=parseInt(pet10val20);
pet10ent21=parseInt(pet10val21); pet10ent22=parseInt(pet10val22); pet10ent23=parseInt(pet10val23); pet10ent24=parseInt(pet10val24);
pet10ent25=parseInt(pet10val25); pet10ent26=parseInt(pet10val26); pet10ent27=parseInt(pet10val27); pet10ent28=parseInt(pet10val28);
pet10ent29=parseInt(pet10val29); pet10ent30=parseInt(pet10val30); pet10ent31=parseInt(pet10val31); pet10ent32=parseInt(pet10val32);
pet10ent33=parseInt(pet10val33); pet10ent34=parseInt(pet10val34); pet10ent35=parseInt(pet10val35); pet10ent36=parseInt(pet10val36);
pet10ent37=parseInt(pet10val37); pet10ent38=parseInt(pet10val38); pet10ent39=parseInt(pet10val39); pet10ent40=parseInt(pet10val40);
pet10ent41=parseInt(pet10val41); pet10ent42=parseInt(pet10val42); pet10ent43=parseInt(pet10val43); pet10ent44=parseInt(pet10val44);
pet10ent45=parseInt(pet10val45); pet10ent46=parseInt(pet10val46)
totalpet10 = (pet10ent1+pet10ent2+pet10ent3+pet10ent4+pet10ent5+pet10ent6+pet10ent7+pet10ent8+pet10ent9+pet10ent10+pet10ent11+pet10ent12+pet10ent13+pet10ent14+pet10ent15+pet10ent16+pet10ent17+pet10ent18+pet10ent19+pet10ent20+pet10ent21+pet10ent22+pet10ent23+pet10ent24+pet10ent25+pet10ent26+pet10ent27+pet10ent28+pet10ent29+pet10ent30+pet10ent31+pet10ent32+pet10ent33+pet10ent34+pet10ent35+pet10ent36+pet10ent37+pet10ent38+pet10ent39+pet10ent40+pet10ent41+pet10ent42+pet10ent43+pet10ent44+pet10ent45+pet10ent46);        
      
pet11ent1=parseInt(pet11val1); pet11ent2=parseInt(pet11val2); pet11ent3=parseInt(pet11val3); pet11ent4=parseInt(pet11val4);
pet11ent5=parseInt(pet11val5); pet11ent6=parseInt(pet11val6); pet11ent7=parseInt(pet11val7); pet11ent8=parseInt(pet11val8);
pet11ent9=parseInt(pet11val9); pet11ent10=parseInt(pet11val10); pet11ent11=parseInt(pet11val11); pet11ent12=parseInt(pet11val12);
pet11ent13=parseInt(pet11val13); pet11ent14=parseInt(pet11val14); pet11ent15=parseInt(pet11val15); pet11ent16=parseInt(pet11val16);
pet11ent17=parseInt(pet11val17); pet11ent18=parseInt(pet11val18); pet11ent19=parseInt(pet11val19); pet11ent20=parseInt(pet11val20);
pet11ent21=parseInt(pet11val21); pet11ent22=parseInt(pet11val22); pet11ent23=parseInt(pet11val23); pet11ent24=parseInt(pet11val24);
pet11ent25=parseInt(pet11val25); pet11ent26=parseInt(pet11val26); pet11ent27=parseInt(pet11val27); pet11ent28=parseInt(pet11val28);
pet11ent29=parseInt(pet11val29); pet11ent30=parseInt(pet11val30); pet11ent31=parseInt(pet11val31); pet11ent32=parseInt(pet11val32);
pet11ent33=parseInt(pet11val33); pet11ent34=parseInt(pet11val34); pet11ent35=parseInt(pet11val35); pet11ent36=parseInt(pet11val36);
pet11ent37=parseInt(pet11val37); pet11ent38=parseInt(pet11val38); pet11ent39=parseInt(pet11val39); pet11ent40=parseInt(pet11val40);
pet11ent41=parseInt(pet11val41); pet11ent42=parseInt(pet11val42); pet11ent43=parseInt(pet11val43); pet11ent44=parseInt(pet11val44);
pet11ent45=parseInt(pet11val45); pet11ent46=parseInt(pet11val46)
totalpet11 = (pet11ent1+pet11ent2+pet11ent3+pet11ent4+pet11ent5+pet11ent6+pet11ent7+pet11ent8+pet11ent9+pet11ent10+pet11ent11+pet11ent12+pet11ent13+pet11ent14+pet11ent15+pet11ent16+pet11ent17+pet11ent18+pet11ent19+pet11ent20+pet11ent21+pet11ent22+pet11ent23+pet11ent24+pet11ent25+pet11ent26+pet11ent27+pet11ent28+pet11ent29+pet11ent30+pet11ent31+pet11ent32+pet11ent33+pet11ent34+pet11ent35+pet11ent36+pet11ent37+pet11ent38+pet11ent39+pet11ent40+pet11ent41+pet11ent42+pet11ent43+pet11ent44+pet11ent45+pet11ent46);        

pet12ent1=parseInt(pet12val1); pet12ent2=parseInt(pet12val2); pet12ent3=parseInt(pet12val3); pet12ent4=parseInt(pet12val4);
pet12ent5=parseInt(pet12val5); pet12ent6=parseInt(pet12val6); pet12ent7=parseInt(pet12val7); pet12ent8=parseInt(pet12val8);
pet12ent9=parseInt(pet12val9); pet12ent10=parseInt(pet12val10); pet12ent11=parseInt(pet12val11); pet12ent12=parseInt(pet12val12);
pet12ent13=parseInt(pet12val13); pet12ent14=parseInt(pet12val14); pet12ent15=parseInt(pet12val15); pet12ent16=parseInt(pet12val16);
pet12ent17=parseInt(pet12val17); pet12ent18=parseInt(pet12val18); pet12ent19=parseInt(pet12val19); pet12ent20=parseInt(pet12val20);
pet12ent21=parseInt(pet12val21); pet12ent22=parseInt(pet12val22); pet12ent23=parseInt(pet12val23); pet12ent24=parseInt(pet12val24);
pet12ent25=parseInt(pet12val25); pet12ent26=parseInt(pet12val26); pet12ent27=parseInt(pet12val27); pet12ent28=parseInt(pet12val28);
pet12ent29=parseInt(pet12val29); pet12ent30=parseInt(pet12val30); pet12ent31=parseInt(pet12val31); pet12ent32=parseInt(pet12val32);
pet12ent33=parseInt(pet12val33); pet12ent34=parseInt(pet12val34); pet12ent35=parseInt(pet12val35); pet12ent36=parseInt(pet12val36);
pet12ent37=parseInt(pet12val37); pet12ent38=parseInt(pet12val38); pet12ent39=parseInt(pet12val39); pet12ent40=parseInt(pet12val40);
pet12ent41=parseInt(pet12val41); pet12ent42=parseInt(pet12val42); pet12ent43=parseInt(pet12val43); pet12ent44=parseInt(pet12val44);
pet12ent45=parseInt(pet12val45); pet12ent46=parseInt(pet12val46)
totalpet12 = (pet12ent1+pet12ent2+pet12ent3+pet12ent4+pet12ent5+pet12ent6+pet12ent7+pet12ent8+pet12ent9+pet12ent10+pet12ent11+pet12ent12+pet12ent13+pet12ent14+pet12ent15+pet12ent16+pet12ent17+pet12ent18+pet12ent19+pet12ent20+pet12ent21+pet12ent22+pet12ent23+pet12ent24+pet12ent25+pet12ent26+pet12ent27+pet12ent28+pet12ent29+pet12ent30+pet12ent31+pet12ent32+pet12ent33+pet12ent34+pet12ent35+pet12ent36+pet12ent37+pet12ent38+pet12ent39+pet12ent40+pet12ent41+pet12ent42+pet12ent43+pet12ent44+pet12ent45+pet12ent46);        
   
pet13ent1=parseInt(pet13val1); pet13ent2=parseInt(pet13val2); pet13ent3=parseInt(pet13val3); pet13ent4=parseInt(pet13val4);
pet13ent5=parseInt(pet13val5); pet13ent6=parseInt(pet13val6); pet13ent7=parseInt(pet13val7); pet13ent8=parseInt(pet13val8);
pet13ent9=parseInt(pet13val9); pet13ent10=parseInt(pet13val10); pet13ent11=parseInt(pet13val11); pet13ent12=parseInt(pet13val12);
pet13ent13=parseInt(pet13val13); pet13ent14=parseInt(pet13val14); pet13ent15=parseInt(pet13val15); pet13ent16=parseInt(pet13val16);
pet13ent17=parseInt(pet13val17); pet13ent18=parseInt(pet13val18); pet13ent19=parseInt(pet13val19); pet13ent20=parseInt(pet13val20);
pet13ent21=parseInt(pet13val21); pet13ent22=parseInt(pet13val22); pet13ent23=parseInt(pet13val23); pet13ent24=parseInt(pet13val24);
pet13ent25=parseInt(pet13val25); pet13ent26=parseInt(pet13val26); pet13ent27=parseInt(pet13val27); pet13ent28=parseInt(pet13val28);
pet13ent29=parseInt(pet13val29); pet13ent30=parseInt(pet13val30); pet13ent31=parseInt(pet13val31); pet13ent32=parseInt(pet13val32);
pet13ent33=parseInt(pet13val33); pet13ent34=parseInt(pet13val34); pet13ent35=parseInt(pet13val35); pet13ent36=parseInt(pet13val36);
pet13ent37=parseInt(pet13val37); pet13ent38=parseInt(pet13val38); pet13ent39=parseInt(pet13val39); pet13ent40=parseInt(pet13val40);
pet13ent41=parseInt(pet13val41); pet13ent42=parseInt(pet13val42); pet13ent43=parseInt(pet13val43); pet13ent44=parseInt(pet13val44);
pet13ent45=parseInt(pet13val45); pet13ent46=parseInt(pet13val46)
totalpet13 = (pet13ent1+pet13ent2+pet13ent3+pet13ent4+pet13ent5+pet13ent6+pet13ent7+pet13ent8+pet13ent9+pet13ent10+pet13ent11+pet13ent12+pet13ent13+pet13ent14+pet13ent15+pet13ent16+pet13ent17+pet13ent18+pet13ent19+pet13ent20+pet13ent21+pet13ent22+pet13ent23+pet13ent24+pet13ent25+pet13ent26+pet13ent27+pet13ent28+pet13ent29+pet13ent30+pet13ent31+pet13ent32+pet13ent33+pet13ent34+pet13ent35+pet13ent36+pet13ent37+pet13ent38+pet13ent39+pet13ent40+pet13ent41+pet13ent42+pet13ent43+pet13ent44+pet13ent45+pet13ent46);        
     
pet14ent1=parseInt(pet14val1); pet14ent2=parseInt(pet14val2); pet14ent3=parseInt(pet14val3); pet14ent4=parseInt(pet14val4);
pet14ent5=parseInt(pet14val5); pet14ent6=parseInt(pet14val6); pet14ent7=parseInt(pet14val7); pet14ent8=parseInt(pet14val8);
pet14ent9=parseInt(pet14val9); pet14ent10=parseInt(pet14val10); pet14ent11=parseInt(pet14val11); pet14ent12=parseInt(pet14val12);
pet14ent13=parseInt(pet14val13); pet14ent14=parseInt(pet14val14); pet14ent15=parseInt(pet14val15); pet14ent16=parseInt(pet14val16);
pet14ent17=parseInt(pet14val17); pet14ent18=parseInt(pet14val18); pet14ent19=parseInt(pet14val19); pet14ent20=parseInt(pet14val20);
pet14ent21=parseInt(pet14val21); pet14ent22=parseInt(pet14val22); pet14ent23=parseInt(pet14val23); pet14ent24=parseInt(pet14val24);
pet14ent25=parseInt(pet14val25); pet14ent26=parseInt(pet14val26); pet14ent27=parseInt(pet14val27); pet14ent28=parseInt(pet14val28);
pet14ent29=parseInt(pet14val29); pet14ent30=parseInt(pet14val30); pet14ent31=parseInt(pet14val31); pet14ent32=parseInt(pet14val32);
pet14ent33=parseInt(pet14val33); pet14ent34=parseInt(pet14val34); pet14ent35=parseInt(pet14val35); pet14ent36=parseInt(pet14val36);
pet14ent37=parseInt(pet14val37); pet14ent38=parseInt(pet14val38); pet14ent39=parseInt(pet14val39); pet14ent40=parseInt(pet14val40);
pet14ent41=parseInt(pet14val41); pet14ent42=parseInt(pet14val42); pet14ent43=parseInt(pet14val43); pet14ent44=parseInt(pet14val44);
pet14ent45=parseInt(pet14val45); pet14ent46=parseInt(pet14val46)
totalpet14 = (pet14ent1+pet14ent2+pet14ent3+pet14ent4+pet14ent5+pet14ent6+pet14ent7+pet14ent8+pet14ent9+pet14ent10+pet14ent11+pet14ent12+pet14ent13+pet14ent14+pet14ent15+pet14ent16+pet14ent17+pet14ent18+pet14ent19+pet14ent20+pet14ent21+pet14ent22+pet14ent23+pet14ent24+pet14ent25+pet14ent26+pet14ent27+pet14ent28+pet14ent29+pet14ent30+pet14ent31+pet14ent32+pet14ent33+pet14ent34+pet14ent35+pet14ent36+pet14ent37+pet14ent38+pet14ent39+pet14ent40+pet14ent41+pet14ent42+pet14ent43+pet14ent44+pet14ent45+pet14ent46);        
   
pet15ent1=parseInt(pet15val1); pet15ent2=parseInt(pet15val2); pet15ent3=parseInt(pet15val3); pet15ent4=parseInt(pet15val4);
pet15ent5=parseInt(pet15val5); pet15ent6=parseInt(pet15val6); pet15ent7=parseInt(pet15val7); pet15ent8=parseInt(pet15val8);
pet15ent9=parseInt(pet15val9); pet15ent10=parseInt(pet15val10); pet15ent11=parseInt(pet15val11); pet15ent12=parseInt(pet15val12);
pet15ent13=parseInt(pet15val13); pet15ent14=parseInt(pet15val14); pet15ent15=parseInt(pet15val15); pet15ent16=parseInt(pet15val16);
pet15ent17=parseInt(pet15val17); pet15ent18=parseInt(pet15val18); pet15ent19=parseInt(pet15val19); pet15ent20=parseInt(pet15val20);
pet15ent21=parseInt(pet15val21); pet15ent22=parseInt(pet15val22); pet15ent23=parseInt(pet15val23); pet15ent24=parseInt(pet15val24);
pet15ent25=parseInt(pet15val25); pet15ent26=parseInt(pet15val26); pet15ent27=parseInt(pet15val27); pet15ent28=parseInt(pet15val28);
pet15ent29=parseInt(pet15val29); pet15ent30=parseInt(pet15val30); pet15ent31=parseInt(pet15val31); pet15ent32=parseInt(pet15val32);
pet15ent33=parseInt(pet15val33); pet15ent34=parseInt(pet15val34); pet15ent35=parseInt(pet15val35); pet15ent36=parseInt(pet15val36);
pet15ent37=parseInt(pet15val37); pet15ent38=parseInt(pet15val38); pet15ent39=parseInt(pet15val39); pet15ent40=parseInt(pet15val40);
pet15ent41=parseInt(pet15val41); pet15ent42=parseInt(pet15val42); pet15ent43=parseInt(pet15val43); pet15ent44=parseInt(pet15val44);
pet15ent45=parseInt(pet15val45); pet15ent46=parseInt(pet15val46)
totalpet15 = (pet15ent1+pet15ent2+pet15ent3+pet15ent4+pet15ent5+pet15ent6+pet15ent7+pet15ent8+pet15ent9+pet15ent10+pet15ent11+pet15ent12+pet15ent13+pet15ent14+pet15ent15+pet15ent16+pet15ent17+pet15ent18+pet15ent19+pet15ent20+pet15ent21+pet15ent22+pet15ent23+pet15ent24+pet15ent25+pet15ent26+pet15ent27+pet15ent28+pet15ent29+pet15ent30+pet15ent31+pet15ent32+pet15ent33+pet15ent34+pet15ent35+pet15ent36+pet15ent37+pet15ent38+pet15ent39+pet15ent40+pet15ent41+pet15ent42+pet15ent43+pet15ent44+pet15ent45+pet15ent46);        

let totpreg1=(pet1ent1+pet2ent1+pet3ent1+pet4ent1+pet5ent1+pet6ent1+pet7ent1+pet8ent1+pet9ent1+pet10ent1+pet11ent1+pet12ent1+pet13ent1+pet14ent1+pet15ent1)
let totpreg2=(pet1ent2+pet2ent2+pet3ent2+pet4ent2+pet5ent2+pet6ent2+pet7ent2+pet8ent2+pet9ent2+pet10ent2+pet11ent2+pet12ent2+pet13ent2+pet14ent2+pet15ent2)
let totpreg3=(pet1ent3+pet2ent3+pet3ent3+pet4ent3+pet5ent3+pet6ent3+pet7ent3+pet8ent3+pet9ent3+pet10ent3+pet11ent3+pet12ent3+pet13ent3+pet14ent3+pet15ent3)
let totpreg4=(pet1ent4+pet2ent4+pet3ent4+pet4ent4+pet5ent4+pet6ent4+pet7ent4+pet8ent4+pet9ent4+pet10ent4+pet11ent4+pet12ent4+pet13ent4+pet14ent4+pet15ent4)
let totpreg5=(pet1ent5+pet2ent5+pet3ent5+pet4ent5+pet5ent5+pet6ent5+pet7ent5+pet8ent5+pet9ent5+pet10ent5+pet11ent5+pet12ent5+pet13ent5+pet14ent5+pet15ent5)
let totpreg6=(pet1ent6+pet2ent6+pet3ent6+pet4ent6+pet5ent6+pet6ent6+pet7ent6+pet8ent6+pet9ent6+pet10ent6+pet11ent6+pet12ent6+pet13ent6+pet14ent6+pet15ent6)
let totpreg7=(pet1ent7+pet2ent7+pet3ent7+pet4ent7+pet5ent7+pet6ent7+pet7ent7+pet8ent7+pet9ent7+pet10ent7+pet11ent7+pet12ent7+pet13ent7+pet14ent7+pet15ent7)
let totpreg8=(pet1ent8+pet2ent8+pet3ent8+pet4ent8+pet5ent8+pet6ent8+pet7ent8+pet8ent8+pet9ent8+pet10ent8+pet11ent8+pet12ent8+pet13ent8+pet14ent8+pet15ent8)
let totpreg9=(pet1ent9+pet2ent9+pet3ent9+pet4ent9+pet5ent9+pet6ent9+pet7ent9+pet8ent9+pet9ent9+pet10ent9+pet11ent9+pet12ent9+pet13ent9+pet14ent9+pet15ent9)
let totpreg10=(pet1ent10+pet2ent10+pet3ent10+pet4ent10+pet5ent10+pet6ent10+pet7ent10+pet8ent10+pet9ent10+pet10ent10+pet11ent10+pet12ent10+pet13ent10+pet14ent10+pet15ent10)
let totpreg11=(pet1ent11+pet2ent11+pet3ent11+pet4ent11+pet5ent11+pet6ent11+pet7ent11+pet8ent11+pet9ent11+pet10ent11+pet11ent11+pet12ent11+pet13ent11+pet14ent11+pet15ent11)
let totpreg12=(pet1ent12+pet2ent12+pet3ent12+pet4ent12+pet5ent12+pet6ent12+pet7ent12+pet8ent12+pet9ent12+pet10ent12+pet11ent12+pet12ent12+pet13ent12+pet14ent12+pet15ent12)
let totpreg13=(pet1ent13+pet2ent13+pet3ent13+pet4ent13+pet5ent13+pet6ent13+pet7ent13+pet8ent13+pet9ent13+pet10ent13+pet11ent13+pet12ent13+pet13ent13+pet14ent13+pet15ent13)
let totpreg14=(pet1ent14+pet2ent14+pet3ent14+pet4ent14+pet5ent14+pet6ent14+pet7ent14+pet8ent14+pet9ent14+pet10ent14+pet11ent14+pet12ent14+pet13ent14+pet14ent14+pet15ent14)
let totpreg15=(pet1ent15+pet2ent15+pet3ent15+pet4ent15+pet5ent15+pet6ent15+pet7ent15+pet8ent15+pet9ent15+pet10ent15+pet11ent15+pet12ent15+pet13ent15+pet14ent15+pet15ent15)
let totpreg16=(pet1ent16+pet2ent16+pet3ent16+pet4ent16+pet5ent16+pet6ent16+pet7ent16+pet8ent16+pet9ent16+pet10ent16+pet11ent16+pet12ent16+pet13ent16+pet14ent16+pet15ent16)
let totpreg17=(pet1ent17+pet2ent17+pet3ent17+pet4ent17+pet5ent17+pet6ent17+pet7ent17+pet8ent17+pet9ent17+pet10ent17+pet11ent17+pet12ent17+pet13ent17+pet14ent17+pet15ent17)
let totpreg18=(pet1ent18+pet2ent18+pet3ent18+pet4ent18+pet5ent18+pet6ent18+pet7ent18+pet8ent18+pet9ent18+pet10ent18+pet11ent18+pet12ent18+pet13ent18+pet14ent18+pet15ent18)
let totpreg19=(pet1ent19+pet2ent19+pet3ent19+pet4ent19+pet5ent19+pet6ent19+pet7ent19+pet8ent19+pet9ent19+pet10ent19+pet11ent19+pet12ent19+pet13ent19+pet14ent19+pet15ent19)
let totpreg20=(pet1ent20+pet2ent20+pet3ent20+pet4ent20+pet5ent20+pet6ent20+pet7ent20+pet8ent20+pet9ent20+pet10ent20+pet11ent20+pet12ent20+pet13ent20+pet14ent20+pet15ent20)
let totpreg21=(pet1ent21+pet2ent21+pet3ent21+pet4ent21+pet5ent21+pet6ent21+pet7ent21+pet8ent21+pet9ent21+pet10ent21+pet11ent21+pet12ent21+pet13ent21+pet14ent21+pet15ent21)
let totpreg22=(pet1ent22+pet2ent22+pet3ent22+pet4ent22+pet5ent22+pet6ent22+pet7ent22+pet8ent22+pet9ent22+pet10ent22+pet11ent22+pet12ent22+pet13ent22+pet14ent22+pet15ent22)
let totpreg23=(pet1ent23+pet2ent23+pet3ent23+pet4ent23+pet5ent23+pet6ent23+pet7ent23+pet8ent23+pet9ent23+pet10ent23+pet11ent23+pet12ent23+pet13ent23+pet14ent23+pet15ent23)
let totpreg24=(pet1ent24+pet2ent24+pet3ent24+pet4ent24+pet5ent24+pet6ent24+pet7ent24+pet8ent24+pet9ent24+pet10ent24+pet11ent24+pet12ent24+pet13ent24+pet14ent24+pet15ent24)
let totpreg25=(pet1ent25+pet2ent25+pet3ent25+pet4ent25+pet5ent25+pet6ent25+pet7ent25+pet8ent25+pet9ent25+pet10ent25+pet11ent25+pet12ent25+pet13ent25+pet14ent25+pet15ent25)
let totpreg26=(pet1ent26+pet2ent26+pet3ent26+pet4ent26+pet5ent26+pet6ent26+pet7ent26+pet8ent26+pet9ent26+pet10ent26+pet11ent26+pet12ent26+pet13ent26+pet14ent26+pet15ent26)
let totpreg27=(pet1ent27+pet2ent27+pet3ent27+pet4ent27+pet5ent27+pet6ent27+pet7ent27+pet8ent27+pet9ent27+pet10ent27+pet11ent27+pet12ent27+pet13ent27+pet14ent27+pet15ent27)
let totpreg28=(pet1ent28+pet2ent28+pet3ent28+pet4ent28+pet5ent28+pet6ent28+pet7ent28+pet8ent28+pet9ent28+pet10ent28+pet11ent28+pet12ent28+pet13ent28+pet14ent28+pet15ent28)
let totpreg29=(pet1ent29+pet2ent29+pet3ent29+pet4ent29+pet5ent29+pet6ent29+pet7ent29+pet8ent29+pet9ent29+pet10ent29+pet11ent29+pet12ent29+pet13ent29+pet14ent29+pet15ent29)
let totpreg30=(pet1ent30+pet2ent30+pet3ent30+pet4ent30+pet5ent30+pet6ent30+pet7ent30+pet8ent30+pet9ent30+pet10ent30+pet11ent30+pet12ent30+pet13ent30+pet14ent30+pet15ent30)
let totpreg31=(pet1ent31+pet2ent31+pet3ent31+pet4ent31+pet5ent31+pet6ent31+pet7ent31+pet8ent31+pet9ent31+pet10ent31+pet11ent31+pet12ent31+pet13ent31+pet14ent31+pet15ent31)
let totpreg32=(pet1ent32+pet2ent32+pet3ent32+pet4ent32+pet5ent32+pet6ent32+pet7ent32+pet8ent32+pet9ent32+pet10ent32+pet11ent32+pet12ent32+pet13ent32+pet14ent32+pet15ent32)
let totpreg33=(pet1ent33+pet2ent33+pet3ent33+pet4ent33+pet5ent33+pet6ent33+pet7ent33+pet8ent33+pet9ent33+pet10ent33+pet11ent33+pet12ent33+pet13ent33+pet14ent33+pet15ent33)
let totpreg34=(pet1ent34+pet2ent34+pet3ent34+pet4ent34+pet5ent34+pet6ent34+pet7ent34+pet8ent34+pet9ent34+pet10ent34+pet11ent34+pet12ent34+pet13ent34+pet14ent34+pet15ent34)
let totpreg35=(pet1ent35+pet2ent35+pet3ent35+pet4ent35+pet5ent35+pet6ent35+pet7ent35+pet8ent35+pet9ent35+pet10ent35+pet11ent35+pet12ent35+pet13ent35+pet14ent35+pet15ent35)
let totpreg36=(pet1ent36+pet2ent36+pet3ent36+pet4ent36+pet5ent36+pet6ent36+pet7ent36+pet8ent36+pet9ent36+pet10ent36+pet11ent36+pet12ent36+pet13ent36+pet14ent36+pet15ent36)
let totpreg37=(pet1ent37+pet2ent37+pet3ent37+pet4ent37+pet5ent37+pet6ent37+pet7ent37+pet8ent37+pet9ent37+pet10ent37+pet11ent37+pet12ent37+pet13ent37+pet14ent37+pet15ent37)
let totpreg38=(pet1ent38+pet2ent38+pet3ent38+pet4ent38+pet5ent38+pet6ent38+pet7ent38+pet8ent38+pet9ent38+pet10ent38+pet11ent38+pet12ent38+pet13ent38+pet14ent38+pet15ent38)
let totpreg39=(pet1ent39+pet2ent39+pet3ent39+pet4ent39+pet5ent39+pet6ent39+pet7ent39+pet8ent39+pet9ent39+pet10ent39+pet11ent39+pet12ent39+pet13ent39+pet14ent39+pet15ent39)
let totpreg40=(pet1ent40+pet2ent40+pet3ent40+pet4ent40+pet5ent40+pet6ent40+pet7ent40+pet8ent40+pet9ent40+pet10ent40+pet11ent40+pet12ent40+pet13ent40+pet14ent40+pet15ent40)
let totpreg41=(pet1ent41+pet2ent41+pet3ent41+pet4ent41+pet5ent41+pet6ent41+pet7ent41+pet8ent41+pet9ent41+pet10ent41+pet11ent41+pet12ent41+pet13ent41+pet14ent41+pet15ent41)
let totpreg42=(pet1ent42+pet2ent42+pet3ent42+pet4ent42+pet5ent42+pet6ent42+pet7ent42+pet8ent42+pet9ent42+pet10ent42+pet11ent42+pet12ent42+pet13ent42+pet14ent42+pet15ent42)
let totpreg43=(pet1ent43+pet2ent43+pet3ent43+pet4ent43+pet5ent43+pet6ent43+pet7ent43+pet8ent43+pet9ent43+pet10ent43+pet11ent43+pet12ent43+pet13ent43+pet14ent43+pet15ent43)
let totpreg44=(pet1ent44+pet2ent44+pet3ent44+pet4ent44+pet5ent44+pet6ent44+pet7ent44+pet8ent44+pet9ent44+pet10ent44+pet11ent44+pet12ent44+pet13ent44+pet14ent44+pet15ent44)
let totpreg45=(pet1ent45+pet2ent45+pet3ent45+pet4ent45+pet5ent45+pet6ent45+pet7ent45+pet8ent45+pet9ent45+pet10ent45+pet11ent45+pet12ent45+pet13ent45+pet14ent45+pet15ent45)
let totpreg46=(pet1ent46+pet2ent46+pet3ent46+pet4ent46+pet5ent46+pet6ent46+pet7ent46+pet8ent46+pet9ent46+pet10ent46+pet11ent46+pet12ent46+pet13ent46+pet14ent46+pet15ent46)

// console.log("peticiones",totalpet1,totalpet2,totalpet3,totalpet4,totalpet5,totalpet6,totalpet7,totalpet8,totalpet9,totalpet10,totalpet11,totalpet12,totalpet13,totalpet14,totalpet15)
let length = parseInt(this.state.datosLength)
let resultadoGeneral = (totalpet1+totalpet2+totalpet3+totalpet4+totalpet5+totalpet6+totalpet7+totalpet8+totalpet9+totalpet10+totalpet11+totalpet12+totalpet13+totalpet14+totalpet15)
let general=resultadoGeneral/length

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
 Programa de intervención, que podrá incluir una evaluación específica1 y
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
  intervención que deberá incluir evaluaciones específicas1, y contemplar
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

let entero2 = pet1ent2+pet2ent2+pet3ent2+pet4ent2+pet5ent2+pet6ent2+pet7ent2+pet8ent2+pet9ent2+pet10ent2+pet11ent2+pet12ent2+pet13ent2+pet14ent2+pet15ent2;
let entero1 = pet1ent1+pet2ent1+pet3ent1+pet4ent1+pet5ent1+pet6ent1+pet7ent1+pet8ent1+pet9ent1+pet10ent1+pet11ent1+pet12ent1+pet13ent1+pet14ent1+pet15ent1;
let entero3 = pet1ent3+pet2ent3+pet3ent3+pet4ent3+pet5ent3+pet6ent3+pet7ent3+pet8ent3+pet9ent3+pet10ent3+pet11ent3+pet12ent3+pet13ent3+pet14ent3+pet15ent3;

let categoriaUno = (entero2+entero1+entero3)/length;
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
console.log("esta es la categoria 1" ,pet4ent2,pet5ent2)
let categoria2Nulo;
let categoria2Bajo;
let categoria2Medio;
let categoria2Alto;
let categoria2MuyAlto;

let entero4 = pet1ent4+pet2ent4+pet3ent4+pet4ent4+pet5ent4+pet6ent4+pet7ent4+pet8ent4+pet9ent4+pet10ent4+pet11ent4+pet12ent4+pet13ent4+pet14ent4+pet15ent4;
let entero9 = pet1ent9+pet2ent9+pet3ent9+pet4ent9+pet5ent9+pet6ent9+pet7ent9+pet8ent9+pet9ent9+pet10ent9+pet11ent9+pet12ent9+pet13ent9+pet14ent9+pet15ent9;
let entero5 = pet1ent5+pet2ent5+pet3ent5+pet4ent5+pet5ent5+pet6ent5+pet7ent5+pet8ent5+pet9ent5+pet10ent5+pet11ent5+pet12ent5+pet13ent5+pet14ent5+pet15ent5;
let entero6= pet1ent6+pet2ent6+pet3ent6+pet4ent6+pet5ent6+pet6ent6+pet7ent6+pet8ent6+pet9ent6+pet10ent6+pet11ent6+pet12ent6+pet13ent6+pet14ent6+pet15ent6;
let entero7= pet1ent7+pet2ent7+pet3ent7+pet4ent7+pet5ent7+pet6ent7+pet7ent7+pet8ent7+pet9ent7+pet10ent7+pet11ent7+pet12ent7+pet13ent7+pet14ent7+pet15ent7;
let entero8= pet1ent8+pet2ent8+pet3ent8+pet4ent8+pet5ent8+pet6ent8+pet7ent8+pet8ent8+pet9ent8+pet10ent8+pet11ent8+pet12ent8+pet13ent8+pet14ent8+pet15ent8;
let entero41= pet1ent41+pet2ent41+pet3ent41+pet4ent41+pet5ent41+pet6ent41+pet7ent41+pet8ent41+pet9ent41+pet10ent41+pet11ent41+pet12ent41+pet13ent41+pet14ent41+pet15ent41;
let entero42= pet1ent42+pet2ent42+pet3ent42+pet4ent42+pet5ent42+pet6ent42+pet7ent42+pet8ent42+pet9ent42+pet10ent42+pet11ent42+pet12ent42+pet13ent42+pet14ent42+pet15ent42;
let entero43=pet1ent43+pet2ent43+pet3ent43+pet4ent43+pet5ent43+pet6ent43+pet7ent43+pet8ent43+pet9ent43+pet10ent43+pet11ent43+pet12ent43+pet13ent43+pet14ent43+pet15ent43;
let entero10=pet1ent10+pet2ent10+pet3ent10+pet4ent10+pet5ent10+pet6ent10+pet7ent10+pet8ent10+pet9ent10+pet10ent10+pet11ent10+pet12ent10+pet13ent10+pet14ent10+pet15ent10;
let entero11=pet1ent11+pet2ent11+pet3ent11+pet4ent11+pet5ent11+pet6ent11+pet7ent11+pet8ent11+pet9ent11+pet10ent11+pet11ent11+pet12ent11+pet13ent11+pet14ent11+pet15ent11;
let entero12=pet1ent12+pet2ent12+pet3ent12+pet4ent12+pet5ent12+pet6ent12+pet7ent12+pet8ent12+pet9ent12+pet10ent12+pet11ent12+pet12ent12+pet13ent12+pet14ent12+pet15ent12;
let entero13=pet1ent13+pet2ent13+pet3ent13+pet4ent13+pet5ent13+pet6ent13+pet7ent13+pet8ent13+pet9ent13+pet10ent13+pet11ent13+pet12ent13+pet13ent13+pet14ent13+pet15ent13;
let entero20=pet1ent20+pet2ent20+pet3ent20+pet4ent20+pet5ent20+pet6ent20+pet7ent20+pet8ent20+pet9ent20+pet10ent20+pet11ent20+pet12ent20+pet13ent20+pet14ent20+pet15ent20;
let entero21=pet1ent21+pet2ent21+pet3ent21+pet4ent21+pet5ent21+pet6ent21+pet7ent21+pet8ent21+pet9ent21+pet10ent21+pet11ent21+pet12ent21+pet13ent21+pet14ent21+pet15ent21;
let entero22=pet1ent22+pet2ent22+pet3ent22+pet4ent22+pet5ent22+pet6ent22+pet7ent22+pet8ent22+pet9ent22+pet10ent22+pet11ent22+pet12ent22+pet13ent22+pet14ent22+pet15ent22;
let entero18=pet1ent18+pet2ent18+pet3ent18+pet4ent18+pet5ent18+pet6ent18+pet7ent18+pet8ent18+pet9ent18+pet10ent18+pet11ent18+pet12ent18+pet13ent18+pet14ent18+pet15ent18;
let entero19=pet1ent19+pet2ent19+pet3ent19+pet4ent19+pet5ent19+pet6ent19+pet7ent19+pet8ent19+pet9ent19+pet10ent19+pet11ent19+pet12ent19+pet13ent19+pet14ent19+pet15ent19;
let entero26=pet1ent26+pet2ent26+pet3ent26+pet4ent26+pet5ent26+pet6ent26+pet7ent26+pet8ent26+pet9ent26+pet10ent26+pet11ent26+pet12ent26+pet13ent26+pet14ent26+pet15ent26;
let entero27=pet1ent27+pet2ent27+pet3ent27+pet4ent27+pet5ent27+pet6ent27+pet7ent27+pet8ent27+pet9ent27+pet10ent27+pet11ent27+pet12ent27+pet13ent27+pet14ent27+pet15ent27;

let categoriaDos = (entero4+entero9+entero5+entero6+entero7+entero8+entero41+entero42+entero43+entero10+entero11+entero12+entero13+entero20+entero21+entero22+entero18+entero19+entero26+entero27)/length;
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
let entero14=pet1ent14+pet2ent14+pet3ent14+pet4ent14+pet5ent14+pet6ent14+pet7ent14+pet8ent14+pet9ent14+pet10ent14+pet11ent14+pet12ent14+pet13ent14+pet14ent14+pet15ent14;
let entero15=pet1ent15+pet2ent15+pet3ent15+pet4ent15+pet5ent15+pet6ent15+pet7ent15+pet8ent15+pet9ent15+pet10ent15+pet11ent15+pet12ent15+pet13ent15+pet14ent15+pet15ent15;
let entero16=pet1ent16+pet2ent16+pet3ent16+pet4ent16+pet5ent16+pet6ent16+pet7ent16+pet8ent16+pet9ent16+pet10ent16+pet11ent16+pet12ent16+pet13ent16+pet14ent16+pet15ent16;
let entero17=pet1ent17+pet2ent17+pet3ent17+pet4ent17+pet5ent17+pet6ent17+pet7ent17+pet8ent17+pet9ent17+pet10ent17+pet11ent17+pet12ent17+pet13ent17+pet14ent17+pet15ent17;

let categoriaTre = (entero14+entero15+entero16+entero17)/length;
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
let entero23=pet1ent23+pet2ent23+pet3ent23+pet4ent23+pet5ent23+pet6ent23+pet7ent23+pet8ent23+pet9ent23+pet10ent23+pet11ent23+pet12ent23+pet13ent23+pet14ent23+pet15ent23;
let entero24=pet1ent24+pet2ent24+pet3ent24+pet4ent24+pet5ent24+pet6ent24+pet7ent24+pet8ent24+pet9ent24+pet10ent24+pet11ent24+pet12ent24+pet13ent24+pet14ent24+pet15ent24;
let entero25=pet1ent25+pet2ent25+pet3ent25+pet4ent25+pet5ent25+pet6ent25+pet7ent25+pet8ent25+pet9ent25+pet10ent25+pet11ent25+pet12ent25+pet13ent25+pet14ent25+pet15ent25;
let entero28=pet1ent28+pet2ent28+pet3ent28+pet4ent28+pet5ent28+pet6ent28+pet7ent28+pet8ent28+pet9ent28+pet10ent28+pet11ent28+pet12ent28+pet13ent28+pet14ent28+pet15ent28;
let entero29=pet1ent29+pet2ent29+pet3ent29+pet4ent29+pet5ent29+pet6ent29+pet7ent29+pet8ent29+pet9ent29+pet10ent29+pet11ent29+pet12ent29+pet13ent29+pet14ent29+pet15ent29;
let entero30=pet1ent30+pet2ent30+pet3ent30+pet4ent30+pet5ent30+pet6ent30+pet7ent30+pet8ent30+pet9ent30+pet10ent30+pet11ent30+pet12ent30+pet13ent30+pet14ent30+pet15ent30;
let entero31=pet1ent31+pet2ent31+pet3ent31+pet4ent31+pet5ent31+pet6ent31+pet7ent31+pet8ent31+pet9ent31+pet10ent31+pet11ent31+pet12ent31+pet13ent31+pet14ent31+pet15ent31;
let entero32=pet1ent32+pet2ent32+pet3ent32+pet4ent32+pet5ent32+pet6ent32+pet7ent32+pet8ent32+pet9ent32+pet10ent32+pet11ent32+pet12ent32+pet13ent32+pet14ent32+pet15ent32;
let entero33=pet1ent33+pet2ent33+pet3ent33+pet4ent33+pet5ent33+pet6ent33+pet7ent33+pet8ent33+pet9ent33+pet10ent33+pet11ent33+pet12ent33+pet13ent33+pet14ent33+pet15ent33;
let entero34=pet1ent34+pet2ent34+pet3ent34+pet4ent34+pet5ent34+pet6ent34+pet7ent34+pet8ent34+pet9ent34+pet10ent34+pet11ent34+pet12ent34+pet13ent34+pet14ent34+pet15ent34;
let entero35=pet1ent35+pet2ent35+pet3ent35+pet4ent35+pet5ent35+pet6ent35+pet7ent35+pet8ent35+pet9ent35+pet10ent35+pet11ent35+pet12ent35+pet13ent35+pet14ent35+pet15ent35;
let entero36=pet1ent36+pet2ent36+pet3ent36+pet4ent36+pet5ent36+pet6ent36+pet7ent36+pet8ent36+pet9ent36+pet10ent36+pet11ent36+pet12ent36+pet13ent36+pet14ent36+pet15ent36;
let entero37=pet1ent37+pet2ent37+pet3ent37+pet4ent37+pet5ent37+pet6ent37+pet7ent37+pet8ent37+pet9ent37+pet10ent37+pet11ent37+pet12ent37+pet13ent37+pet14ent37+pet15ent37;
let entero38=pet1ent38+pet2ent38+pet3ent38+pet4ent38+pet5ent38+pet6ent38+pet7ent38+pet8ent38+pet9ent38+pet10ent38+pet11ent38+pet12ent38+pet13ent38+pet14ent38+pet15ent38;
let entero39=pet1ent39+pet2ent39+pet3ent39+pet4ent39+pet5ent39+pet6ent39+pet7ent39+pet8ent39+pet9ent39+pet10ent39+pet11ent39+pet12ent39+pet13ent39+pet14ent39+pet15ent39;
let entero40=pet1ent40+pet2ent40+pet3ent40+pet4ent40+pet5ent40+pet6ent40+pet7ent40+pet8ent40+pet9ent40+pet10ent40+pet11ent40+pet12ent40+pet13ent40+pet14ent40+pet15ent40;
let entero44=pet1ent44+pet2ent44+pet3ent44+pet4ent44+pet5ent44+pet6ent44+pet7ent44+pet8ent44+pet9ent44+pet10ent44+pet11ent44+pet12ent44+pet13ent44+pet14ent44+pet15ent44;
let entero45=pet1ent45+pet2ent45+pet3ent45+pet4ent45+pet5ent45+pet6ent45+pet7ent45+pet8ent45+pet9ent45+pet10ent45+pet11ent45+pet12ent45+pet13ent45+pet14ent45+pet15ent45;
let entero46=pet1ent46+pet2ent46+pet3ent46+pet4ent46+pet5ent46+pet6ent46+pet7ent46+pet8ent46+pet9ent46+pet10ent46+pet11ent46+pet12ent46+pet13ent46+pet14ent46+pet15ent46;

let categoriaCuatro = (entero23+entero24+entero25+entero28+entero29+entero30+entero31+entero32+entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40+entero44+entero45+entero46)/length;
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
let DominioUno = (entero2+entero1+entero3)/length;
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
let DominioDos = (entero4+entero9+entero5+entero6+entero7+entero8+entero41+entero42+entero43+entero10+entero11+entero12+entero13) /length;
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
let DominioTres = (entero20+entero21+entero22+entero18+entero19+entero26+entero27)/length;
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
let DominioCuatro = (entero14+entero15)/length;
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
let DominioCinco = (entero16+entero17)/length;
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
let DominioSeis = (entero23+entero24+entero25+entero28+entero29)/length;
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
let DominioSiete = (entero30+entero31+entero32+entero44+entero45+entero46)/length;
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
let DominioOcho = (entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40)/length;
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
            <TableCell component="th" scope="row" > <Badge  color="primary">{entero1/length}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >2.- Condiciones deficientes e insalubres</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{entero2/length}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
           
            <TableRow>
            <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{entero3/length}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >4.- Cargas cuantitativas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero4/length)+(entero9/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >5.- Ritmos de trabajo acelerado</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero5/length)+(entero6/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero7/length)+(entero8/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero41/length)+(entero42/length)+(entero43/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >8.- Cargas de alta responsabilidad</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero10/length)+(entero11/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row"  width="50%">9.- Cargas contradictorias o inconsistentes</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero12/length)+(entero13/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero20/length)+(entero21/length)+(entero22/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero18/length)+(entero19/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >12.- Limitada o inexistente capacitación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero26/length)+(entero27/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >13.- Jornadas de trabajo extensas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero14/length)+(entero15/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >14.- Influencia del trabajo fuera del centro laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero16/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >15.- Influencia de las responsabilidades familiares</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero17/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >16.- Escasa claridad de funciones</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero23/length)+(entero24/length)+(entero25/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >17.- Características del liderazgo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero28/length)+(entero29/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >18.- Relaciones sociales en el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero30/length)+(entero31/length)+(entero32/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >19.- Deficiente relación con los colaboradores que supervisa</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero44/length)+(entero45/length)+(entero46/length)}</Badge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >20.- Violencia laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <Badge  color="primary">{(entero33/length)+(entero34/length)+(entero35/length)+(entero36/length)+(entero37/length)+(entero38/length)+(entero39/length)+(entero40/length)}</Badge ></TableCell>
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