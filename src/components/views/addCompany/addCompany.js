import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import payload from '../../../resolvers/payload';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
import Sidebar from '../../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../../../components/images/logotipo.png'
import '../../Home/index.css'
import usuario from '../../images/usuario.png'
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { DialogUtility } from '@syncfusion/ej2-popups';
import Modal from 'react-modal';

  makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: theme.spacing(0),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const classes = makeStyles()





class Cuestions extends Component{

    constructor(props){
        super(props);
        this.state = {           
          data:[],
          collapse: false,
          isOpen: false,
          localstorage:[],
          showModal2: false,

        }
        this.onClick = this.onClick.bind(this);
        this.handleclick = this.handleclick.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.ads = this.ads.bind(this);
      }

      onClick() {
        this.setState({
          collapse: !this.state.collapse,
        });
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
        position: "fixed",
      
      }
      )
      }
      
      
      ads(){
      
        this.setState({showModal2:true})
        
      }
    handleInput = (e) => {
        
        const {id, value} = e.target
         this.setState({
            [id]:value,
        });
       
        console.log("el estado es ",this.state)
        
      }

      handleSubmit = event => {
        event.preventDefault();
        const rfc = this.state.rfc
        const razonsocial = this.state.razonsocial
        const empleados = this.state.empleados
        const representante = this.state.representante
        const direccion = this.state.direccion
        const telefono =  this.state.telefono
        const correo = this.state.correo
    

        const token = localStorage.getItem('elToken')
        let pl = payload(token);

        const correoAdmin =  pl.email
        const passAdmin = pl.password

      
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
           mutation{
              registerRS(data:"${[rfc,razonsocial,empleados,representante,direccion,telefono,correo,correoAdmin,passAdmin]}"){
                message
                  }
                }
              `
          }
              }).then((datos) => {
                console.log("los datos son ",datos)
                alert("Registro Exitoso");
                // this.props.history.push("/inicio")
              });       
            }

      render(){
    // const { children} = this.props;
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
      return (
        <React.Fragment>
            <div>
            <header>  
              <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
              <Sidebar/>
                <MDBNavbarBrand href="/inicio">
                  <AppNavbarBrand
                    full={{ src: logo, width: 80, height: 25, alt: 'ADS' }} />               
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.onClick} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
                 
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
          <MDBContainer style={container} className="text-center mt-2 pt-5">
      
          <form onSubmit={this.handleSubmit}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
             <Typography component="h1" variant="h5" style={{ color: '#AFE1CE' }}>
               <strong>Registrar Sucursal Principal</strong>
              </Typography>
      
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="rfc"
                name="RFC"
                variant="outlined"
                required
                fullWidth
                type="text"
                id="rfc"
                label="RFC"
                autoFocus 
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="razonsocial"
                label="Razón Social"
                name="razonsocial"
                autoComplete="razonsocial"
                type="text"
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="empleados"
                label="Número de Empleados"
                name="empleados"
                autoComplete="empleados"
                type="number"
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Representante"
                label="Representante de la Empresa"
                type="text"
                id="representante"
                autoComplete="representante"
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="direccion"
                label="Dirección"
                type="text"
                id="direccion"
                autoComplete="dirección"
                onChange={this.handleInput}
              />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="telefono"
                label="Teléfono"
                type="tel"
                id="telefono"
                autoComplete="telefono"
                onChange={this.handleInput}
              />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="correo"
                label="Correo"
                type="email"
                id="correo"
                autoComplete="correo"
                onChange={this.handleInput}
              />
              
            </Grid>
 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
           <strong>Registrar mi Empresa</strong> 
          </Button>
          </Grid>
        </form>
      </div>
    </Container>
    </form> 

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
          {/* <MDBDataTable /> */}
          </MDBContainer>
      
        </div>




          
    </React.Fragment>
                    );    

             }
        }


export default Cuestions