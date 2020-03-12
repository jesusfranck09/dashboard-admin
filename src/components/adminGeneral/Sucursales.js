import React from 'react'
import {
	Paper,
	Grid,
	Button,
	MenuItem,
  } from '@material-ui/core';
  import diagnostico from '../images/diagnostico.png'
  import { API} from '../utils/http'

import axios from 'axios';
import {Alert } from 'reactstrap'
import {MDBRow, MDBNavItem,MDBNavbarNav, MDBNavLink, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBCol, MDBBtn} from 'mdbreact';
import { Form, Field } from 'react-final-form';
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import { TextField, Radio, Select } from 'final-form-material-ui';
import MiniDrawer from './Sidebar'
import { DialogUtility } from '@syncfusion/ej2-popups';

 function onSubmit (values) {
	};

	const validate = values => {
        const errors = {};
        if (!values.Nombre) {
          errors.Nombre = 'Este campo es requerido';
        }
        if (!values.calle) {
          errors.calle = 'Este campo es requerido';
        }
        if (!values.NumExt) {
          errors.NumExt = 'Este campo es requerido';
        }
        if (!values.numInt) {
          errors.numInt = 'Este campo es requerido';
        }
        if (!values.colonia) {
          errors.colonia = 'Este campo es requerido';
        }
        if (!values.cp) {
          errors.cp = 'Este campo es requerido';
        }
        if (!values.city) {
          errors.city = 'Este campo es requerido';
        }
      
        if (!values.estado) {
          errors.estado = 'Required';
        }
        if (!values.RFC) {
            errors.RFC = 'Required';
          }
          if (!values.telefono) {
            errors.telefono = 'Required';
          }

        if (!values.correo) {
            errors.correo = 'Required';
          }
       
      
        return errors;
      };

      const evaluar  = (values) =>{

        const Nombre = values.Nombre
        const calle = values.calle
        const NumExt = values.NumExt
        const numInt = values.numInt
        const colonia =  values.colonia
        const cp = values.cp
        const city= values.city
        const estado = values.estado
        const actividad = values.actividad
        const telefono = values.telefono
        const email =  values.correo

        const correo = localStorage.getItem('correo')

        if(Nombre && calle && numInt && NumExt && colonia && cp && city && estado && actividad && telefono && email){
            // const url = 'http://localhost:8000/graphql'
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
               mutation{
                registerSucursales(data:"${[Nombre,calle,NumExt,numInt,colonia,cp,city,estado,actividad,telefono,email,correo]}"){
                    message
                      }
                    }
                  `
              }
            })
            .then(datos => {		
            console.log("datos correctos" , datos)
            localStorage.setItem("ok",1)
            DialogUtility.alert({
                animationSettings: { effect: 'Fade' },           
                title:'Aviso',
                content: 'Centro de trabajo Registrado con Éxito!',
                position: "fixed",
              
              }
              )

              window.location.reload();
            });    
           
        } else{
            DialogUtility.alert({
                animationSettings: { effect: 'Fade' },           
                title:'Aviso',
                content: 'Debe Completar todos los Campos!',
                position: "fixed",
              
              }
              )
        }
      }
      
      
      function App() {
        return (
          <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <Form
              onSubmit={onSubmit}
              
              validate={validate}
              render={({ handleSubmit, submitting,values }) => (
                <form onSubmit={handleSubmit}>
                 <Alert color="dark">Datos generales</Alert>
                  <Paper style={{ padding: 16} }>
                    <Grid container alignItems="flex-start" spacing={2} >
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="Nombre"
                          component={TextField}
                          type="text"
                          label="Centro de trabajo"
                        />
                      </Grid>

                     
                      <Grid item xs={12} style ={{marginTop:20}}>
                      <Alert color="secondary">Dirección </Alert>
                        <Field
                          fullWidth
                          required
                          name="calle"
                          component={TextField}
                          type="text"
                          label="Calle"
                        />
                      </Grid>
      
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="NumExt"
                          component={TextField}
                          type="text"
                          label="Número Exterior"
                        />
                      </Grid>
      
                      <Grid item xs={6}>
                        <Field
                        
                          fullWidth
                          required
                          name="numInt"
                          component={TextField}
                          type="text"
                          label="Número Interior  /  ejemplo. 0"
                        
                        />
                      </Grid>
      
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="colonia"
                          component={TextField}
                          type="text"
                          label="Colonia"
                        />
                      </Grid>
      
                      <Grid item xs={6}>
                      <Field
                          fullWidth
                          required
                          name="cp"
                          component={TextField}
                          type="text"
                          label="Código Postal"
                        />
                        </Grid>
    
      
                      <Grid item xs={12}>
                        <Field
                        required
                          fullWidth
                          name="city"
                          component={TextField}
                          label="Ciudad"
                          type = "text"
                        />
                     

                       
                      </Grid>
      
                
                      <Grid item xs={12}>
                        <Field
                          required
                          fullWidth
                          name="estado"
                          component={Select}
                          label="Estado"
                          formControlProps={{ fullWidth: true }}
                        >
      
                        <MenuItem value=" Aguascalientes"> Aguascalientes</MenuItem>
                        <MenuItem value=" Baja California"> Baja California</MenuItem>
                        <MenuItem value=" Baja California Sur"> Baja California Sur</MenuItem>
                        <MenuItem value=" Campeche"> Campeche</MenuItem>
                        <MenuItem value=" Chiapas"> Chiapas</MenuItem>
                        <MenuItem value=" Chihuahua"> Chihuahua</MenuItem>
                        <MenuItem value=" Ciudad de México"> Ciudad de México</MenuItem>
                        <MenuItem value=" Coahuila de Zaragoza"> Coahuila de Zaragoza</MenuItem>
                        <MenuItem value=" Durango"> Durango</MenuItem>
                        <MenuItem value=" Estado de México"> Estado de México</MenuItem>
                        <MenuItem value=" Guanajuato"> Guanajuato</MenuItem>
                        <MenuItem value=" Guerrero"> Guerrero</MenuItem>
                        <MenuItem value=" Hidalgo"> Hidalgo</MenuItem>
                        <MenuItem value=" Jalisco"> Jalisco</MenuItem>
                        <MenuItem value=" Michoacán de Ocampo">Michoacán de Ocampo</MenuItem>
                        <MenuItem value=" Morelos"> Morelos</MenuItem>
                        <MenuItem value=" Nayarit"> Nayarit</MenuItem>
                        <MenuItem value=" Nuevo León"> Nuevo León</MenuItem>
                        <MenuItem value=" Oaxaca"> Oaxaca</MenuItem>
                        <MenuItem value=" Puebla"> Puebla</MenuItem>
                        <MenuItem value=" Querétaro"> Querétaro</MenuItem>
                        <MenuItem value=" Quintana Roo"> Quintana Roo</MenuItem>
                        <MenuItem value=" San Luis Potosí"> San Luis Potosí</MenuItem>
                        <MenuItem value=" Sin Localidad"> Sin Localidad</MenuItem>
                        <MenuItem value=" Tabasco"> Tabasco</MenuItem>
                        <MenuItem value=" Tamaulipas"> Tamaulipas</MenuItem>
                        <MenuItem value=" Tlaxcala"> Tlaxcala</MenuItem>
                        <MenuItem value=" Veracruz de Ignacio de la Llave"> Veracruz de Ignacio de la Llave</MenuItem>
                        <MenuItem value=" Yucatán"> Yucatán</MenuItem>
                        <MenuItem value=" Zacatecas"> Zacatecas</MenuItem>
                
                          </Field>
                          </Grid>
      
                        <Grid item xs={12} style ={{marginTop:20}} > 
                        <Alert color="secondary">Datos Generales </Alert>
                        <Field
                          required
                          fullWidth
                          name="actividad"
                          component={TextField}
                          label="Actividad Principal"      
                          type = "text"                   
                        >
                          </Field>
                          </Grid>
                        <Grid item xs={6}>
                        <Field
                          required
                          fullWidth
                          name="telefono"
                          component={TextField}
                          label="Teléfono"
                          type = "text"
                        >
                          </Field>
                          </Grid>
      
      
                        <Grid item xs={6}>
                        <Field
                          required
                          fullWidth
                          name="correo"
                          component={TextField}
                          label="Correo"   
                          type = "text"                       
                        >
                          </Field>
                          </Grid>

      
                      <Grid item style={{ marginTop: 16 ,marginLeft:160 }}>
                        <Button
                         variant="outlined"
                          color="inherit"
                          type="submit"
                          disabled={submitting}
                          onClick={(e) =>evaluar(values)}
                        >
                          Registrar Centro de Trabajo
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                 
                </form>
              )}
            />
          </div>
        );
      }



      class Sucursales extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            collapse: false,
            datos:[],
        
          };
         
          
        }

        onClick() {
          this.setState({
            collapse: !this.state.collapse,
          });
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
                   <MiniDrawer/>
                    <MDBNavbarBrand a href="./inicio">
                    <AppNavbarBrand
                    full={{ src: diagnostico, width: 100, height: 33, alt: 'DIAGNOSTICO' }} />             
                    </MDBNavbarBrand>
                    <MDBNavbarBrand >
                    <strong> Registrar Centros de Trabajo</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="/adminGral">Administración general de mi Empresa</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>

                    <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapse} navbar>
      
                    </MDBCollapse>
                  </MDBNavbar>
                
                </header>
               
                <MDBContainer style={{marginTop:40}}>
                 <MDBRow>
                 <App/>
                </MDBRow>   
                </MDBContainer>
            </div>
      
           
            </React.Fragment>
          );
        }
      }
      export default Sucursales