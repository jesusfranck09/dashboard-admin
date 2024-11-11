import React from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse} from 'mdbreact';
import Sidebar from './sidebar'
import diagnostico from '../images/diagnostico.png'
import { AppNavbarBrand } from '@coreui/react';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { withRouter } from 'react-router-dom';
import {
    Button,
  } from '@material-ui/core';
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
        let nombreCompleto =  Nombre + " " + Apellidos
        let result = nombreCompleto.slice(0, 15);
    
        var LaFecha=new Date();
        var Mes=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        var diasem=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        var diasemana=LaFecha.getDay();
        var FechaCompleta="";
        var NumeroDeMes="";    
        NumeroDeMes=LaFecha.getMonth();
        FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
    
        this.setState({date:FechaCompleta}) 
        this.setState({nombre:result}) 
    
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
   
    render(){
      
      let periodo =<label style={{color:'green',marginTop:"2%"}}><strong>{localStorage.getItem("periodo")}</strong></label>
      const {modulo} = this.props
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
        return(
                <React.Fragment>
                <header>
                <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
                    <Sidebar/>
                    
                    <MDBNavbarBrand a href="./inicio">
                        <AppNavbarBrand full={{ src: diagnostico, width: 100, height: 33, alt: 'Diagnostico035' }} />               
                    </MDBNavbarBrand>
                    <MDBNavbarNav left>
                      &nbsp; &nbsp; &nbsp;<strong>{this.state.nombre}&nbsp; &nbsp; &nbsp; </strong>
                    </MDBNavbarNav>

                    <MDBCollapse isOpen={this.state.collapse} navbar>                        
                        <MDBNavbarNav left>
                        <strong> &nbsp; &nbsp; &nbsp; {localStorage.getItem("razonsocial")}</strong> 
                        </MDBNavbarNav>
                        <MDBNavbarNav style={{marginTop:"1%"}}left>
                        <strong> {modulo} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong>
                        </MDBNavbarNav>
                        <MDBNavbarNav left>
                        </MDBNavbarNav>  
                        <MDBNavbarNav left>
                        </MDBNavbarNav>  
                        <MDBNavbarNav left>
                        </MDBNavbarNav>
                        <MDBNavbarNav left>
                        <strong>Version 3.1.2</strong>
                        </MDBNavbarNav>  
                        <MDBNavbarNav left>
                        <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:50,heigth:20}}/>                                          
                        </MDBNavbarNav>  
                     </MDBCollapse>
                </MDBNavbar>
                {/* <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
                    <Sidebar/>
                    
                    <MDBNavbarBrand a href="./inicio">
                        <AppNavbarBrand full={{ src: diagnostico, width: 100, height: 33, alt: 'Diagnostico035' }} />               
                    </MDBNavbarBrand>
                    <MDBNavbarNav left>
                      &nbsp; &nbsp; &nbsp;<strong>{this.state.nombre} </strong>&nbsp;<strong>  {this.state.apellidos}  &nbsp; </strong>
                    </MDBNavbarNav>

                    <MDBCollapse isOpen={this.state.collapse} navbar>                        
                        <MDBNavbarNav left>
                        <strong>-- {localStorage.getItem("razonsocial")}</strong> 
                        </MDBNavbarNav>
                        <MDBNavbarNav style={{marginTop:"1%"}}left>
                        <strong> {modulo} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{periodo}</strong>
                        </MDBNavbarNav>
                        <MDBNavbarNav left>
                          <strong>Versión 3.0</strong>
                        </MDBNavbarNav>
                        <MDBNavbarNav left>
                        
                        <Button  style={{ color: '#FC1B99' }} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleDropdown}>
                          Herramientas &nbsp;<i class="fas fa-cog"> </i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Button>
                        </MDBNavbarNav>                                            
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
                        <MenuItem ><a href = "http://ads.com.mx"><i class="fab fa-buysellads" ></i> &nbsp;Más sobre ADS</a></MenuItem>
                    </Menu>
                </MDBNavbar> */}
                </header>
                </React.Fragment>
        )
    }
}
export default withRouter(Navbar)