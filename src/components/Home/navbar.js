import React from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from 'mdbreact';
import Sidebar from './sidebar'
import diagnostico from '../images/diagnostico.png'
import { AppNavbarBrand } from '@coreui/react';
import { DialogUtility } from '@syncfusion/ej2-popups';
import "./styles.scss";
import { withRouter } from 'react-router-dom';
import {
    Grid,
    Button,
  } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from 'react-modal';
class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            collapse: false,
            isOpen: false,
            nombre:'',
            dropdown:null

        }
        this.onClick = this.onClick.bind(this);
        this.handleclick = this.handleclick.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
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
        localStorage.removeItem("idAdmin")
        localStorage.removeItem("fechaRegistro")
        localStorage.removeItem("fechaRegistroSuperusuario")
        localStorage.removeItem("ok")
        localStorage.removeItem("empleadoActivo")
        localStorage.removeItem("DepartamentoActivo")
        localStorage.removeItem("SucursalActiva")
        localStorage.removeItem("PuestoActivo")
        localStorage.removeItem("urlLogo")
        
        DialogUtility.alert({
            animationSettings: { effect: 'Fade' },           
            title: 'Hasta luego...!',
            position: "fixed",
        }
        )
        this.props.history.push("/")
        }
        handleClose = () => {
            this.setState({dropdown: null});
          };
          handleDropdown = (event) => {
            this.setState({dropdown: event.currentTarget});
          
          };
    render(){
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
        return(
                <React.Fragment>
                <header>
                <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
                    <Sidebar/>
                    
                    <MDBNavbarBrand a href="./inicio">
                        <AppNavbarBrand full={{ src: diagnostico, width: 100, height: 33, alt: 'Diagnostico035' }} />               
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapse} navbar>

                        <MDBNavbarNav left>
                        <strong>{this.state.nombre} </strong>&nbsp;<strong>  {this.state.apellidos}  &nbsp; </strong>
                        &nbsp;
                        </MDBNavbarNav>
                        <MDBNavbarNav left>
                        <strong>{localStorage.getItem("razonsocial")}</strong> 
                        </MDBNavbarNav>
                        <MDBNavbarNav left>
                        <strong>Versión 2.0</strong> 
                        </MDBNavbarNav>
                        <MDBNavbarNav left>
                        <Button  style={{ color: '#FC1B99' }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleDropdown}>
                          Herramientas del usuario &nbsp;<i class="fas fa-cog"> </i> 
                        </Button>
                        </MDBNavbarNav>
                        <MDBNavbarBrand>  
                                     
                        <AppNavbarBrand full={{ src: localStorage.getItem("urlLogo") , width: 30, height: 25, alt: 'logo' }} />               
                             
                        </MDBNavbarBrand>
                       
                      
                     </MDBCollapse>
                     
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.dropdown}
                        keepMounted
                        open={Boolean(this.state.dropdown)}
                        onClose={this.handleClose}
                    >
                        <MenuItem ><a href = "http://eval.diagnostico035.com/ats">Realizar evaluación ATS</a></MenuItem>
                        <MenuItem ><a href = "http://eval.diagnostico035.com/rp">Realizar evaluación RP</a></MenuItem>
                        <MenuItem ><a href = "http://eval.diagnostico035.com/eeo">Realizar evaluación EEO</a></MenuItem>
                        <MenuItem onClick={this.handleclick}><i class="fas fa-address-card"></i> &nbsp;Mi Perfil</MenuItem>
                        <MenuItem ><a href = "http://ads.com.mx"><i class="fab fa-buysellads"></i> &nbsp;Más sobre ADS</a></MenuItem>


                    </Menu>
                </MDBNavbar>
                </header>
                </React.Fragment>
        )
    }
}
export default withRouter(Navbar)