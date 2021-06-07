import React from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem} from 'mdbreact';
import Sidebar from './sidebarAdminGral'
import diagnostico from '../images/diagnostico.png'
import { AppNavbarBrand } from '@coreui/react';
import {MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { DialogUtility } from '@syncfusion/ej2-popups';
import "./styles.scss";
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
    handleDropdown = (event) => {
        this.setState({dropdown: event.currentTarget});
      
      };
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
        handleClose = () => {
            this.setState({dropdown: null});
          };

    render(){
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
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
      
        )
    }
}
export default withRouter(Navbar)