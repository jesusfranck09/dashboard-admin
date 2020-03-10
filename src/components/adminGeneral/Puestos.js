import React from 'react'
import {
	Paper,
	Grid,
	Button,
	MenuItem,
  } from '@material-ui/core';

import axios from 'axios';
import {Alert } from 'reactstrap'
import {MDBRow, MDBNavItem,MDBNavbarNav, MDBNavLink, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBCol, MDBBtn} from 'mdbreact';
import { Form, Field } from 'react-final-form';
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import { TextField, Radio, Select } from 'final-form-material-ui';
import MiniDrawer from './Sidebar'
import { DialogUtility } from '@syncfusion/ej2-popups';

import diagnostico from '../images/diagnostico.png'

 function onSubmit (values) {
	};

	const validate = values => {
        const errors = {};
        if (!values.puesto) {
          errors.puesto = 'Este campo es requerido';
        }
      
      
        return errors;
      };

      const evaluar  = (values) =>{

        const puesto = values.puesto
        
        const correo = localStorage.getItem('correo')

        if(puesto){
            const url = 'http://localhost:8000/graphql'
            axios({
              url:  url,
              method:'post',
              data:{
              query:`
               mutation{
                registerPuesto(data:"${[puesto,correo]}"){
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
                content: 'Nuevo Puesto registrado!',
                position: "fixed",
              
              }
              )
              window.location.reload();
            });    
           
        } else{
            DialogUtility.alert({
                animationSettings: { effect: 'Fade' },           
                title:'Aviso',
                content: 'Por favor complete el Campo!',
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
                 <Alert color="success">Por favor ingrese Puesto que desea Registrar</Alert>
                  <Paper style={{ padding: 16} }>
                    <Grid container alignItems="flex-start" spacing={2} >
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="puesto"
                          component={TextField}
                          type="text"
                          label="Nuevo Puesto"
                        />
                      </Grid>

                      <Grid item style={{ marginTop: 16 ,marginLeft:160 }}>
                        <Button
                         variant="outlined"
                          color="primary"
                          type="submit"
                          disabled={submitting}
                          onClick={(e) =>evaluar(values)}
                        >
                          Registrar Nuevo Puesto
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
                    <strong> Registrar Puestos</strong>
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