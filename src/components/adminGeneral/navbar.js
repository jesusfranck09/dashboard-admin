import React from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse} from 'mdbreact';
import Sidebar from './sidebarAdminGral'
import diagnostico from '../images/diagnostico.png'
import { AppNavbarBrand } from '@coreui/react';
import { DialogUtility } from '@syncfusion/ej2-popups';
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
    const {modulo} = this.props 
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
 
      return(
                <header>
                <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
                    <Sidebar/>
                    
                    <MDBNavbarBrand a href="./inicio">
                        <AppNavbarBrand full={{ src: diagnostico, width: 100, height: 33, alt: 'Diagnostico035' }} />               
                    </MDBNavbarBrand>
                    <MDBNavbarNav left>
                      &nbsp; &nbsp; &nbsp;<strong>{this.state.nombre} </strong>&nbsp;<strong>  {this.state.apellidos}  &nbsp; </strong>
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
                        <strong>Version 3.1.1</strong>
                        </MDBNavbarNav>  
                        <MDBNavbarNav left>
                        <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:50,heigth:20}}/>                                          
                        </MDBNavbarNav>  
                     </MDBCollapse>                  
                </MDBNavbar>
               
                </header>
      
        )
    }
}
export default withRouter(Navbar)