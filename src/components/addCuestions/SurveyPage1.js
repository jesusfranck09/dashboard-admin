import React from 'react';
import { Form, Field } from 'react-final-form';
import {  Radio  } from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { Alert } from 'reactstrap';
import axios from 'axios';
 

import { MDBRow, MDBCol, MDBBadge } from 'mdbreact';

import { MDBContainer, MDBNavbar,MDBTableBody,MDBTable, MDBNavbarBrand,MDBTableHead, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'
 

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data:'',
     collapse: false,
     isOpen: false,
    showModal2:false

    
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }



  evaluar= (values) => {
    console.log("los values son" , values)
    if(values.rotacion === 'si'){

   this.props.history.push("./page1")


 
    }
    
    if (values.rotacion === 'no') {
           
      this.setState({
      showModal2:true
}) 


       }
  }


  componentWillMount(){
    setTimeout(() => { this.setState({showModal:false})},1500)
}


  handleClick(){

    

// var val =  JSON.parse(values)
// console.log(val.rotacion)
// if(val.rotacion=="si"){

// return(
// console.log("jlkjl")
// )
// }else if(val.rotacion=="no"){ 

  
// }
 

console.log("data" ,this.state.data)

  }


  render() {
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
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="/employees">Cargar Empleados</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#">Beneficios</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#">Opciones</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink to="#">Mi Perfil</MDBNavLink>
                </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
        <MDBContainer style={container} className="text-center mt-2 pt-5">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary"> INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes).</Alert>


              <Grid container alignItems="flex-start" spacing={2} item xs={12}>
              <MDBTable striped>
                  <MDBTableHead>
                  <td><FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}></FormLabel></td>
                  <td><MDBBadge color="ligth">Siempre</MDBBadge></td>
                  <td><MDBBadge color="ligth">Casi Siempre</MDBBadge></td>
                  <td><MDBBadge color="ligth">Algunas Veces</MDBBadge></td>
                  <td><MDBBadge color="ligth">Casi Nunca</MDBBadge></td>
                  <td><MDBBadge color="ligth">Nunca</MDBBadge></td>

                  </MDBTableHead>
                  <MDBTableBody>
                  
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>1.- ¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="rotacion" component={Radio} type="radio" value="siempre1"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="rotacion" component={Radio} type="radio" value="casi_siempre1"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="rotacion" component={Radio} type="radio" value="Algunas_veces1"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="rotacion" component={Radio} type="radio" value="casi_nunca1"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="rotacion" component={Radio} type="radio" value="nunca1"/>} /></td>
                    </tr>
                    
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>2.-¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="rotacion" component={Radio} type="radio" value="siempre2"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="rotacion" component={Radio} type="radio" value="casi_siempre2"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="rotacion" component={Radio} type="radio" value="Algunas_veces2"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="rotacion" component={Radio} type="radio" value="casi_nunca2"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="rotacion" component={Radio} type="radio" value="nunca2"/>} /></td>
                    </tr> 
                  </MDBTableBody>
                </MDBTable>
                  
                <Grid item style={{ marginTop: 16 }} spacing={2} item xs={12}>
                <center>
                  <Button 
                   variant="contained"
                    color="primary"

                    onClick={(e) => this.evaluar(values)}
                   
                    type = "submit"
                  >
                    Siguiente
                  </Button>
                  </center>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      />
    </div>
        </MDBContainer>
    
      </div>
      </React.Fragment>





    );


    
  }
}

                  function onSubmit (values) {
                  const vari = JSON.stringify(values,1,2)


                  alert(vari)

                  };




                  const validate = values => {
                    const errors = {};
                    if (!values.Nombre) {
                      errors.Nombre = 'Este campo es requerido';
                    }
                    if (!values.ApellidoP) {
                      errors.ApellidoP = 'Este campo es requerido';
                    }
                    if (!values.ApellidoM) {
                      errors.ApellidoM = 'Este campo es requerido';
                    }
                    if (!values.curp) {
                      errors.curp = 'Este campo es requerido';
                    }
                    if (!values.rfc) {
                      errors.rfc = 'Este campo es requerido';
                    }
                    if (!values.Correo) {
                      errors.Correo = 'Este campo es requerido';
                    }
                    if (!values.cp) {
                      errors.cp = 'Este campo es requerido';
                    }

                    if (!values.area) {
                      errors.area = 'Required';
                    }

                  

                    return errors;
                  };


                  // function App() {
                  //   return (
                    
                  // }


                  export default Home;
