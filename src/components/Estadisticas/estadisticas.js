import React from 'react';

import { MDBContainer, MDBNavbar, MDBNavbarBrand,MDBTable, MDBTableBody , MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBBtn} from 'mdbreact';
import Paper from '@material-ui/core/Paper';

import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logo.png'
import diagnostico from '../images/diagnostico.png'
import { API} from '../utils/http'
import MUIDataTable from "mui-datatables";
import Grow from "@material-ui/core/Grow";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import '../Home/index.css'
// import Paper from '@material-ui/core/Paper';
import { MDBRow,MDBCol} from 'mdbreact'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { DialogUtility } from '@syncfusion/ej2-popups';
import logotipo from '../images/logotipo.png'
// import TableHead from '@material-ui/core/TableHead';
import { PDFExport } from '@progress/kendo-react-pdf';

import usuario from '../images/usuario.png'
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import Modal from 'react-modal';
import {
  Grid    
} from '@material-ui/core';

class Estadisticas extends React.Component {
  pdfExportComponent ;
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isOpen: false,
      datos:[],
      propiedades:[]   ,
      showModal2: false,     
      reporteEstadisticas:[],

    };
    this.onClick = this.onClick.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.ads = this.ads.bind(this);

  }


      componentWillMount(){
        this.getEmployees()
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

        let idAdmin = localStorage.getItem("idAdmin")
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
    console.log(idAdmin)     
    // const url = 'http://localhost:8000/graphql'
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
              console.log("datos de todo los empleados",datos)
            })
            .catch((error) => {
              console.log(".cartch" , error.response)
          });
  
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
    
    }
    )
    }
             
    ads(){
    
      this.setState({showModal2:true})
      
    }


  render() {
   
    const columns = ["Nombre", "Apellido P.",  "Apellido M.","Experiencia lab.","Edad","Estudios","Antiguedad","Jornada","Sexo","Puesto"];

    const data = this.state.datos.map(rows=>{
      return([rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.ExperienciaLaboral,rows.FechaNacimiento,rows.NivelEstudios,rows.TiempoPuesto,rows.JornadaTrabajo,rows.Sexo,rows.TipoPuesto])
    })
    
    let datosEmpleados;
    let filtro;
    let length;
    const options = {
        filterType: "dropdown",
        responsive: "stacked",
        // filter:false,
        search:false,
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
          console.log("filtro" , filtro) 
          }     };

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
           console.log("estadisticas" , this.state.reporteEstadisticas)
              {this.state.reporteEstadisticas.map(rows =>{
                console.log("las rows" , rows.data[0])
                array.push(rows.data[4])

                arrayExpLab.push(rows.data[3])
                arrayAnt.push(rows.data[6])
                arrayEstudios.push(rows.data[5])
                arraySexo.push(rows.data[8])
                arrayTipoPuesto.push(rows.data[9])
              })}

                const result1519 = array.filter(function(valor){
                  return valor == "15 A 19"
                })
                edad1519.push(result1519)

                const result2024 = array.filter(function(valor){
                  return valor == "20 A 24"
                })
                edad2024.push(result2024)

                const result2529 = array.filter(function(valor){
                  return valor == "25 A 29"
                })
                edad2529.push(result2529)

                const result3034 = array.filter(function(valor){
                  return valor == "30 A 34"
                })
                edad3034.push(result3034)

                const result3539 = array.filter(function(valor){
                  return valor == "35 A 39"
                })
                edad3539.push(result3539)

                const result4044 = array.filter(function(valor){
                  return valor == "40 A 44"
                })
                edad4044.push(result4044)

                const result4549 = array.filter(function(valor){
                  return valor == "45 A 49"
                })
                edad4549.push(result4549)

                const result5054 = array.filter(function(valor){
                  return valor == "50 A 54"
                })
                edad5054.push(result5054)

                const result5559 = array.filter(function(valor){
                  return valor == "55 A 59"
                })
                edad5559.push(result5559)

                const result6064 = array.filter(function(valor){
                  return valor == "60 A 64"
                })
                edad6064.push(result6064)

                const result6569 = array.filter(function(valor){
                  return valor == "65 A 69"
                })
                edad6569.push(result6569)
         
                const result70omas = array.filter(function(valor){
                  return valor == "70 0 mas"
                })
                edad70omas.push(result70omas)
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                
                const resultExpLab6Meses= arrayExpLab.filter(function(valor){
                  return valor == "MENOS DE 6 MESES"
                })
                expLab6Meses.push(resultExpLab6Meses)

                const resultExpLab1Año= arrayExpLab.filter(function(valor){
                  return valor == "ENTRE 6 MESES Y 1 AÑO"
                })
                expLab6Meses1Año.push(resultExpLab1Año)

                const resultExpLab4Año= arrayExpLab.filter(function(valor){
                  return valor == "ENTRE 1 A 4 AÑOS"
                })
                expLab1a4años.push(resultExpLab4Año)

                const resultExpLab9Año= arrayExpLab.filter(function(valor){
                  return valor == "ENTRE 5 A 9 AÑOS"
                })
                expLab5a9años.push(resultExpLab9Año)

                const resultExpLab14Año= arrayExpLab.filter(function(valor){
                  return valor == "ENTRE 10 A 14 AÑOS"
                })
                expLab10a14años.push(resultExpLab14Año)
                
                const resultExpLab19Año= arrayExpLab.filter(function(valor){
                  return valor == "ENTRE 15 A 19 AÑOS"
                })
                expLab15a19años.push(resultExpLab19Año)

                const resultExpLab24Año= arrayExpLab.filter(function(valor){
                  return valor == "ENTRE 20 A 24 AÑOS"
                })
                expLab20a24años.push(resultExpLab24Año)

                const resultExpLab25Año= arrayExpLab.filter(function(valor){
                  return valor == "25 AÑOS O MAS"
                })
                expLab25años.push(resultExpLab25Año)

                ////////////////////////////////////////////////////////////////////////////

                const resultAnt6Meses= arrayAnt.filter(function(valor){
                  return valor == "MENOS DE 6 MESES"
                })
                ant6Meses.push(resultAnt6Meses)

                const resultAnt1Año= arrayAnt.filter(function(valor){
                  return valor == "ENTRE 6 MESES Y 1 AÑO"
                })
                ant6Meses1Año.push(resultAnt1Año)

                const resultAnt4Año= arrayAnt.filter(function(valor){
                  return valor == "ENTRE 1 A 4 AÑOS"
                })
                ant1a4años.push(resultAnt4Año)

                const resultAnt9Año= arrayAnt.filter(function(valor){
                  return valor == "ENTRE 5 A 9 AÑOS"
                })
                ant5a9años.push(resultAnt9Año)

                const resultAnt14Año= arrayAnt.filter(function(valor){
                  return valor == "ENTRE 10 A 14 AÑOS"
                })
                ant10a14años.push(resultAnt14Año)
                
                const resultAnt19Año= arrayAnt.filter(function(valor){
                  return valor == "ENTRE 15 A 19 AÑOS"
                })
                ant15a19años.push(resultAnt19Año)

                const resultAnt24Año= arrayAnt.filter(function(valor){
                  return valor == "ENTRE 20 A 24 AÑOS"
                })
                ant20a24años.push(resultAnt24Año)

                const resultAnt25Año= arrayAnt.filter(function(valor){
                  return valor == "25 AÑOS O MAS"
                })
                ant25años.push(resultAnt25Año)

                /////////////////////////////////////////////////////////////////////////////
                console.log("arrayEstudios" , arrayEstudios)
                const resultSinEstudios= arrayEstudios.filter(function(valor){
                  return valor == "SIN FORMACION"
                })
                sinEstudios.push(resultSinEstudios)

                const resultPrimaria= arrayEstudios.filter(function(valor){
                  return valor == "PRIMARIA"
                })
                primaria.push(resultPrimaria)

                const resultSecundaria= arrayEstudios.filter(function(valor){
                  return valor == "SECUNDARIA"
                })
                secundaria.push(resultSecundaria)

                const resultPreparatoria= arrayEstudios.filter(function(valor){
                  return valor == "PREPARATORIA O BACHILLERATO"
                })
                preparatoria.push(resultPreparatoria)

                const resultLicenciatura= arrayEstudios.filter(function(valor){
                  return valor == "LICENCIATURA"
                })
                licenciatura.push(resultLicenciatura)

                const resultMaestria= arrayEstudios.filter(function(valor){
                  return valor == "MAESTRIA"
                })
                maestria.push(resultMaestria)

                const resultDoctorado= arrayEstudios.filter(function(valor){
                  return valor == "DOCTORADO"
                })
                doctorado.push(resultDoctorado)
                //////////////////////////////////////////////////////////////////

                const resultSexoH= arraySexo.filter(function(valor){
                  return valor == "MASCULINO"
                })
                hombre.push(resultSexoH)

                const resultSexoM= arraySexo.filter(function(valor){
                  return valor == "FEMENINO"
                })
                mujer.push(resultSexoM)

                //////////////////////////////////////////////////////////////777777
                console.log("arraytipopuesto" , arrayTipoPuesto)
                const resultOperativo= arrayTipoPuesto.filter(function(valor){
                  return valor == "OPERATIVO"
                })
                operativo.push(resultOperativo)

                const resultProfesionalTecnico= arrayTipoPuesto.filter(function(valor){
                  return valor == "PROFESIONAL O TECNICO"
                })
                profesionalTecnico.push(resultProfesionalTecnico)

                const resultSupervisor= arrayTipoPuesto.filter(function(valor){
                  return valor == "SUPERVISOR"
                })
                supervisor.push(resultSupervisor)

                const resultGerencial= arrayTipoPuesto.filter(function(valor){
                  return valor == "GERENCIAL"
                })
                gerencial.push(resultGerencial)

                const resultDirectivo= arrayTipoPuesto.filter(function(valor){
                  return valor == "DIRECTIVO"
                })
                directivo.push(resultDirectivo)
                
                console.log("hombres" , hombre)
                pdf =  <React.Fragment>  <div>
              <MDBContainer style={{marginTop:20}}>
              <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                  Descargar Resultados
              </MDBBtn>
              </MDBContainer>
              <br/>

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
                            <font size="3"face="arial"color="black">Estadística Guia de Referencia V</font><br></br>
                            <br/><font size="1"face="arial"color="black">Total de Empleados Considerados : <strong>{this.state.reporteEstadisticas.length}</strong></font>

                        
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
                              color="black" style = {{marginTop:25,marginLeft:20}}>GUÍA DE REFERENCIA V -
                              DATOS DEL TRABAJADOR</font>   <br/>  
                                </MDBTableBody>
                                </MDBTable>
                                <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
                                    <MDBTableBody>
                                   
                                   </MDBTableBody>
                                   </MDBTable>
                              <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-center mt-4 ">
                              <MDBTableBody>
                              <font size="1"
                              face="arial"
                              color="black" style = {{marginTop:25,marginLeft:20}}>Reporte de datos demográficos generales.</font>   <br/>  
                                </MDBTableBody>
                                </MDBTable>
                                <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">I.-Distribución por Sexo</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="20px" className="text-center"><font size="1" face="arial"color="black" >Personal Considerado</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">Hombres</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">Mujeres</font></td>
                                                                              
                                        </tr>
                                    
                                        <tr >  
                                        <td width="20px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                            
                                          <td width="40px" className="text-venyer"><font size="1" face="arial"color="black">{hombre[0].length}</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{mujer[0].length}</font></td>
                                 
                                        </tr>
               
                                      </MDBTableBody>
                                      </MDBTable>

                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">II.-Distribución por Edad</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Rango</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black" >Empleados</font></td>                             
                                        </tr>                               
                                      
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >15 a 19 Años</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad1519[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >20 a 24 Años</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad2024[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >25 a 29 Años</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad2529[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >30 a 34 Años</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad3034[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >35 a 39 Años</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad3539[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >40 a 44 Años</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad4044[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >45 a 49 Años</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad4549[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >50 a 54 Años</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad5054[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >55 a 59 Años</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad5559[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >60 a 64 Años</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad6064[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >65 a 69 Años</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad6569[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >70 o más</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{edad70omas[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                                          <td width="70px" className="text-venyer"><font size="1" face="arial"color="black">{this.state.reporteEstadisticas.length}</font></td>                                 
                                        </tr>
                                      </MDBTableBody>
                                      </MDBTable>

                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">III.-Distribución por Formación Académica</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Estudios</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black" >Empleados</font></td>                             
                                        </tr>                               
                                       
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Sin estudios</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{sinEstudios[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Primaria</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{primaria[0].length}</font></td>                                                                              
                                        </tr>
                                      
                                        
                                       
                                      </MDBTableBody>
                                      </MDBTable>

                                      <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                      <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Secundaria</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{secundaria[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Preparatoria O Bachillerato</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{preparatoria[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Licenciatura</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{licenciatura[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Maestría</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{maestria[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Doctorado</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{doctorado[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{this.state.reporteEstadisticas.length}</font></td>                                 
                                        </tr>
                                      </MDBTableBody>
                                      </MDBTable>

                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">IV.-Distribución por Experiencia Laboral</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Experiencia</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black" >Empleados</font></td>                             
                                        </tr>                               
                                      
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Menos de 6 Meses</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{expLab6Meses[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 6 meses y 1 Año</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{expLab6Meses1Año[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 1 A 4 Años</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{expLab1a4años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 5 A 9 Años</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{expLab5a9años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 10 A 14 Años</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{expLab10a14años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 15 A 19 Años</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{expLab15a19años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 20 A 24 Años</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{expLab20a24años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >25 Años o más</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{expLab25años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{this.state.reporteEstadisticas.length}</font></td>                                 
                                        </tr>
                                      </MDBTableBody>
                                      </MDBTable>
                                      
                                   
                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">V.-Distribución por Antiguedad</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Antiguedad</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black" >Empleados</font></td>                             
                                        </tr>                               
                                       
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Menos de 6 Meses</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{ant6Meses[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 6 meses y 1 Año</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{ant6Meses1Año[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 1 A 4 Años</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{ant1a4años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 5 A 9 Años</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{ant5a9años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 10 A 14 Años</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{ant10a14años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 15 A 19 Años</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{ant15a19años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 20 A 24 Años</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{ant20a24años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >25 Años o más</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{ant25años[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{this.state.reporteEstadisticas.length}</font></td>                                 
                                        </tr>
                                      </MDBTableBody>
                                      </MDBTable>

                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">VI.-Distribución por Puesto</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Puestos</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black" >Empleados</font></td>                             
                                        </tr>                               
                                      
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Operativo</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{operativo[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Profesional o Técnico</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{profesionalTecnico[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Supervisor</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{supervisor[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Gerencial</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{gerencial[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Directivo</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{directivo[0].length}</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{this.state.reporteEstadisticas.length}</font></td>                                 
                                        </tr>
                                      
                                      </MDBTableBody>
                                      </MDBTable>


                        </div>
                    </PDFExport>
                </div>
            </div>
            </React.Fragment> 
          }

    // const { children, ...attributes } = this.props;
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
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
                      Estadísticas de mi Empresa
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
                <MDBContainer style={container} className="text-center mt-4 pt-5">
            <MDBContainer style={container} className="text-center mt-2 pt-2">
            <ul>
            <MDBRow>
            <MDBCol> 
           </MDBCol>
            </MDBRow>   
            </ul>

        
        <div style={{ height: "110%"}}>

         <Grow in={true}>
            <div >
 
              <MUIDataTable
                title={`Empleados  totales de ${localStorage.getItem("razonsocial")}`}
                data={data}
                columns={columns}
                options={options}
              />
              <MDBRow style={{marginTop:20}}>
              <MDBCol  sm="4"></MDBCol>  
             </MDBRow>
             <Button  startIcon={<CheckOutlinedIcon />}  outline color="primary" onClick={(e)=>this.setState({reporteEstadisticas:datosEmpleados})}>
                  Consultar
               </Button>
             
            </div> 
          </Grow>  
         {pdf}
        </div>

        
   
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
            </MDBContainer >

  </MDBContainer>
</div>   
</React.Fragment>
);
}
}


export default Estadisticas