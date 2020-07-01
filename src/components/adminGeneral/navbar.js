import React from 'react'
import {MDBRow, MDBContainer,MDBBadge, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBCol, MDBCardHeader, MDBBtn} from 'mdbreact';
import Sidebar from './sidebarAdminGral'
import diagnostico from '../images/diagnostico.png'
import { AppNavbarBrand } from '@coreui/react';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { DialogUtility } from '@syncfusion/ej2-popups';
import "./styles.scss";
import { withRouter } from 'react-router-dom';
class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            collapse: false,
            isOpen: false,
            nombre:''
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
        
        this.props.history.push("/")
        DialogUtility.alert({
            animationSettings: { effect: 'Fade' },           
            title: 'Hasta luego...!',
            position: "fixed",
        }
        )
        }
        
    render(){
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 1000, height: 500 }
        return(
      
                <header>
                <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
                    <Sidebar/>
                    <MDBNavbarBrand a href="./inicio">
                        <AppNavbarBrand full={{ src: diagnostico, width: 100, height: 33, alt: 'Diagnostico035' }} />               
                    </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapse} navbar>
                        <MDBNavbarNav left>
                           <MDBNavItem >
                            <a href="http://ats.diagnostico035.com/">evaluación ATS &nbsp;&nbsp;   </a>
                           </MDBNavItem>
                           <MDBNavItem >
                            <a href="http://rp.diagnostico035.com/"> evaluación RP &nbsp;&nbsp; </a>
                           </MDBNavItem>
                           <MDBNavItem >
                            <a href="http://eeo.diagnostico035.com/"> evaluación EEO   </a>
                           </MDBNavItem>
                            
                        </MDBNavbarNav>
                            <strong>{localStorage.getItem("razonsocial")}</strong> 
                        <MDBNavbarNav right>
                        </MDBNavbarNav>
                            <strong>{this.state.date}</strong> 
                        <MDBNavbarNav right>
                        </MDBNavbarNav>
                            <strong>Versión 1.1.0</strong> 
                        <MDBNavbarNav right>
                        <MDBNavbarBrand>  
                                     
                        <AppNavbarBrand full={{ src: localStorage.getItem("urlLogo") , width: 30, height: 25, alt: 'logo' }} />               
                        {this.state.nombre}      
                        </MDBNavbarBrand>
                        <MDBNavbarBrand>  
                            <MDBNavItem>   
                              <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem onClick={this.handleclick}>Mi Perfil</MDBDropdownItem>
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
      
        )
    }
}
export default withRouter(Navbar)