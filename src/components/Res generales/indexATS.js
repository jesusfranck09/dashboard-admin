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
  this.props.history.push("/")
  DialogUtility.alert({
    animationSettings: { effect: 'Fade' },           
    title: 'Hasta luego...!',
    position: "fixed",})}
  ads(){
    this.setState({showModal2:true}) 
  }
  getGlobalEmployees   = async () => {
    var id  =  localStorage.getItem("idAdmin")       
    // const url = 'http://localhost:8000/graphql'
    
   await  axios({
      url:  API,
      method:'post',
      data:{ 
      query:`
      query{
        getEmployeesResolvesATS(data:"${[id]}"){
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
          this.setState({empleados:datos.data.data.getEmployeesResolvesATS})       
          }).catch(err=>{
            console.log("error" ,err)
          })

         
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
        // console.log("array en la posicion  de i " , array[i])    
        // const url = 'http://localhost:8000/graphql'

       await  axios({
          url:  API,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyATS(data:"${[array[i],periodo]}"){
              id 
              Respuestas 
              fk_preguntasATS
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
              totalEmpleados.push(datos.data.data.getresultGlobalSurveyATS)
              // console.log("totalEMpleados" , totalEmpleados)
              this.setState({peticion1:totalEmpleados})
              console.log("estado",this.state.peticion1)
              })
              .catch(err => {
              });  
           }
       
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
     
    let accionSi = 0;
    let accionNo =0;
    
    this.state.peticion1.map(rows=>{
      if(rows[1]){
        if (rows[1].Respuestas == 'si'){
           accionSi = accionSi + 1
      
        }
        console.log("accionSi" , accionSi)
        if (rows[1].Respuestas == 'no'){
           accionNo = accionNo +1
        
        }
        
      }
    })
    
   
    console.log("accionNo" , accionNo)

    const columns = ["ID","Nombre", "Sexo",  "Area", "Puesto","Centro de Trabajo","Periodo"];

    const data = this.state.empleados.map(rows=>{
      return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.Sexo,rows.AreaTrabajo,rows.Puesto,rows.CentroTrabajo,rows.periodo])
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
                Resultados Globales de la Encuesta ATS
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

 
        <MDBContainer style = {{marginTop:60}}>
        <font face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>&nbsp;&nbsp;

      <font face="arial " className = "mt-4 " ><strong>{localStorage.getItem("razonsocial")}</strong> </font>

        { this.state.peticion1.map(rows =>{ 
   

            if(rows[1]){
                return (
                    <MDBContainer >
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
                            <font size="3"face="arial"color="black">Reporte Global de Acontecimientos Traumáticos Severos  </font><br></br>
                            <font size="1"face="arial"color="black">{this.state.date}</font><br/>
                            <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                            <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font>
                            <br/><font size="1"face="arial"color="black">Total de empleados con atención requerida : <strong>{accionSi}</strong></font>
                            <br/><font size="1"face="arial"color="black">Total de empleados sin atención requerida : <strong>{accionNo}</strong></font>
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
                            <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-center mt-4 ">
                              <MDBTableBody>
                              <font size="1"
                              face="arial"
                              color="black" style = {{marginTop:25,marginLeft:20}}>GUÍA DE REFERENCIA I -
                              CUESTIONARIO PARA IDENTIFICAR LOS ACONTECIMIENTOS TRAUMÁTICOS SEVEROS EN LOS CENTROS DE TRABAJO</font>   <br/>  
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
                                   <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left ">
                                    <MDBTableBody>
                                    <tr>
                                        <td width="25%"><font size="1" face="arial"color="black"></font></td>
                                   </tr>
                                   </MDBTableBody>
                                   </MDBTable>
                                   <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left ">
                                    <MDBTableBody>
                            
                                   <tr>
                                   <td width="40%" style={{backgroundColor: "#D8D8D8"}}><font size="1" face="arial"color="black">TOTAL DE EVALUACIONES : <strong>{this.state.datosLength}</strong></font></td>
                                   <td width="30%" style={{backgroundColor: "#F61414"}} ><font size="1" face="arial"color="black">ACCIÓN REQUERIDA : {accionSi}</font></td>
                                   <td width="30%" style={{backgroundColor: "#62F0FA"}}><font size="1" face="arial"color="black" >ACCIÓN NO REQUERIDA : {accionNo}</font></td>
                                    
                                   </tr>                                  
                                   </MDBTableBody>
                                    </MDBTable>  
            <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
              <MDBTableBody>
                
                <tr >   
                <td width="10px"><font size="1" face="arial"color="black" ><strong></strong></font></td>                           
                <td width="30px"><font size="1" face="arial"color="black" ><strong>Nombre</strong></font></td>
                <td width="30px" ><font size="1" face="arial"color="black"><strong>Apellido Paterno</strong></font></td>
                <td width="20px"><font size="1" face="arial"color="black"><strong>Apellido Materno</strong></font></td>
                <td width="10px"><font size="1" face="arial"color="black"><strong>Accion Requerida</strong></font></td>                                         
                                    
              </tr>
              { this.state.peticion1.map((rows,i) => {
                if(rows[1]){
                  let respuesta;
                  if(rows[1].Respuestas =='si'){
                   respuesta =  <TableCell  width="10px" style={{backgroundColor: "#F61414"}} align="center" component="th" scope="row" ><font size="1" face="arial"color="black">SI</font></TableCell>
                  }if(rows[1].Respuestas =='no'){
                    respuesta =  <TableCell  width="10px" style={{backgroundColor: "#62F0FA"}} align="center" component="th" scope="row" ><font size="1" face="arial"color="black">NO</font></TableCell>
                   }
                   
                  return (
                    <TableRow >
                   <td width="10px"  className="text-left"><font size="1" face="arial"color="black" >{i + 1} </font></td>
                   <td width="30px"  className="text-left"><font size="1" face="arial"color="black" >{rows[1].nombre} </font></td>
                   <td width="30px" className="text-left"><font size="1" face="arial"color="black">{rows[1].ApellidoP  }</font></td>
                <td width="20px"  className="text-left"><font size="1" face="arial"color="black">{rows[1].ApellidoM}</font></td>
                  {respuesta}
                    </TableRow>                                
                  );
                }
             
              })}
            </MDBTableBody>
          </MDBTable>
                          
                        </div>
                    </PDFExport>
                </div>
            </div>
                 </MDBContainer>              
                 )       
            }
                return(
                    <div>
                    <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                        Descargar Resultados 
                    </MDBBtn>
                    </div>
                )
        })
}
        </MDBContainer>
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
                title={`Empledos  totales de ${localStorage.getItem("razonsocial")}`}
                data={data}
                columns={columns}
                options={options}
              />
              <MDBRow style={{marginTop:20}}>
              <MDBCol  sm="4"></MDBCol>  
              <MDBCol><MDBBtn onClick={e=>this.consultarDatosFiltrados(datosEmpleados,filtro)}  outline color="success">Ver Resultados Globales</MDBBtn></MDBCol>  
             </MDBRow>
            
              
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