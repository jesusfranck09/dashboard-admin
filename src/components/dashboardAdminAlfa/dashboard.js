import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import logo from '../images/logotipo.png'
import { AppNavbarBrand } from '@coreui/react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import {MDBRow, MDBCol,MDBTable, MDBTableBody, MDBBtn } from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { PDFExport } from '@progress/kendo-react-pdf';
import VerticalAlignBottomOutlinedIcon from '@material-ui/icons/VerticalAlignBottomOutlined';
import {Alert} from 'reactstrap'
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBMask,
  MDBView,
  MDBContainer,

} from "mdbreact";
import "../Home/index.css";
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'
import { API} from '../utils/http'

class Das extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          AdminAlfa:[]
        }
      }
componentWillMount(){
  // const url = 'http://localhost:8000/graphql'
 var idAdminA = localStorage.getItem("idAdminAlfa")
  axios({
    url:  API,
    method:'post',
    data:{
    query:`
    query{
        getAdminAlfa(data:"${[idAdminA]}"){
          nombreAdmin
          apellidosAdmin
          correo
          fechaVenta
          rfc
          empresas
          empleados
          RazonSocial
          RFC
            }
        }
        `
    }
})
.then(datos => {	
  console.log("datos" , datos.data.data.getAdminAlfa[0])
  this.setState({AdminAlfa: datos.data.data.getAdminAlfa})
}).catch(err=>{
    console.log("este es el error" , err.response)
}) 
}  

logOut(){
  this.props.history.push("/loginAlfa")
   localStorage.removeItem("idAdminAlfa")
  localStorage.removeItem("elToken")
  DialogUtility.alert({
    animationSettings: { effect: 'Zoom' },           
    content: "Hasta Luego!",
    title: 'Aviso!',
    position: "fixed"
  });
}
registrar(){
  this.props.history.push("/paquetes") 
}

  render() {
    const container = { marginLeft:20}
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
    return (
      

        <React.Fragment>
            <div id="apppage">
        <Router>
          <div>
            <MDBNavbar
              color="primary-color"
              dark
              expand="md"
              fixed="top"
              scrolling
              transparent
            >
              <MDBContainer>
                <MDBNavbarBrand>
                <AppNavbarBrand
                  full={{ src: logo, width: 89, height: 25, alt: 'ADS' }} />
                  <strong className="white-text">Bienvenido</strong>
                </MDBNavbarBrand>

              </MDBContainer>
            </MDBNavbar>
            {this.state.collapsed && overlay}
          </div>
        </Router>
        
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer style={{marginTop:60}}>
            <Card >
            <CardActionArea>
       
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Vista General 
                </Typography>
              
              </CardContent>
            </CardActionArea>
          <MDBContainer > <Alert className ="mt-4" color ="primary ">Movimientos Realizados por {this.state.AdminAlfa.nombreAdmin}</Alert>

       
        <React.Fragment>
        <section className="flex-column"  >
        <div>     <MDBRow>
                  <MDBCol> 
                  <Button outline startIcon={<VerticalAlignBottomOutlinedIcon />} color="success" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                      Descargar Movimientos
                  </Button>
                  </MDBCol> 
                  <MDBCol>  
                  <Button  startIcon={<DoneOutlineIcon />} color="primary" onClick={(e) => { if (window.confirm('¿Desea Registrar?')) this.registrar()} }>
                  Registrar Paquetes
                  </Button>
                  </MDBCol>
                  <MDBCol>
                  <Button startIcon={<CloseOutlinedIcon />}  color="secondary"    onClick={(e) => { if (window.confirm('¿Desea Salir?')) this.logOut()} }>
                  Salir
                  </Button> 
                  </MDBCol>
                  </MDBRow>
        </div>
        <br/>
        <PDFExport
                  scale={0.7}
                  paperSize="A4"
                  margin="2cm"
                  ref={(component) => this.pdfExportComponent = component}
              >
        <font face="arial" className = "mt-4 ml-3" >  <img ref={(image) => this.image = image} src="http://www.ads.com.mx/_Media/logotipo_ads_png_med.png" width="100px"
              /></font>

        <MDBContainer style={container}>
         <Paper>
        <MDBTable component={Paper}  small borderless className="text-left mt-4 ">

        
          {this.state.AdminAlfa.map(rows=>{
            return(
              
              <MDBTableBody>                  
                        <tr>
                        <td>  
                        </td>
                        <td ></td>
                        <td ></td>
                      </tr>
                      <tr>
                      <td></td>
                      <td ></td>
                      <td ></td>
                      </tr>
                      <tr>
                      <td ><strong>Administrador : {rows.nombreAdmin} {rows.apellidosAdmin} </strong> </td><strong>Correo :{rows.correo} </strong><td></td>
                      <td ></td>
                      <td ></td>
                      </tr>


                      <tr>
                      <td ><strong>Paquete Empleados : {rows.empleados}</strong></td>
                      <td ><strong> Empresas :  {rows.empresas}</strong></td>
                      <td ></td>
                      </tr>
                      <tr>
                      <td ><strong>Vendido a : {rows.RazonSocial}</strong></td>
                      <td > <strong>RFC :  {rows.RFC}</strong></td>
                      <td ></td>
                      </tr>
                      <tr>
                      <td ><strong>Fecha de Venta : {rows.fechaVenta}</strong></td>
                      <td ></td>
                      <td ></td>
            
                      </tr>
              </MDBTableBody>
     
            
            )

          })}               

  
        </MDBTable>
        </Paper> 
        </MDBContainer>
        
       
         </PDFExport>
        </section>
      </React.Fragment>

      </MDBContainer>
          </Card>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    </React.Fragment>
    
    );
  }
}

export default Das;