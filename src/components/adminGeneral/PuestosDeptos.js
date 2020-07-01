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
// import MiniDrawer from './Sidebar'
import { DialogUtility } from '@syncfusion/ej2-popups';
import { API} from '../utils/http'

import diagnostico from '../images/diagnostico.png'
import Navbar from './navbar'

 function onSubmit (values) { 
	};

	const validate = values => {
        const errors = {};
        if (!values.puesto) {
          errors.puesto = 'Este campo es requerido';
        }
        
        return errors;
      };

      const validateDepto = values => {
        const errors = {};
        if (!values.departamento) {
          errors.departamento = 'Este campo es requerido';
        }  
        return errors;
      };



      class Sucursales extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            collapse: false,
            datos:[],
            datosDepto:[],
        
          };          
        }
        onClick() {
          this.setState({
            collapse: !this.state.collapse,
          });
        }

        evaluar  = (values) =>{

          const puesto = values.puesto
          
          const correo = localStorage.getItem('correo')
  
          if(puesto){
              // const url = 'http://localhost:8000/graphql'
              axios({
                url:  API,
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
               this.props.history.push("/adminGral")
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

        evaluarDepto  = (values) =>{

          const departamento = values.departamento
          
          const correo = localStorage.getItem('correo')
  
          if(departamento){
              // const url = 'http://localhost:8000/graphql'
              axios({
                url:  API,
                method:'post',
                data:{
                query:`
                 mutation{
                  registerApartments(data:"${[departamento,correo]}"){
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
                  content: 'Se agregó el Nuevo Departamento!',
                  position: "fixed",
                
                }
                )
                this.props.history.push("/adminGral")
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
  
        render() {     
          // const { children} = this.props;
          const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
          const container = { width: 2500, height: 1300 }
          return (
            <React.Fragment>
            <div>
            <Alert style={{marginTop:60}} color="primary"><strong>Registrar puestos y departamentos</strong></Alert>

                <Navbar/>               
                <MDBContainer >
                 <MDBRow>
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
                                onClick={(e) =>this.evaluar(values)}
                              >
                                Registrar nuevo puesto
                              </Button>
                            </Grid>
                          </Grid>
                        </Paper>
                      
                      </form>
                    )}
                  />
                </div>
                </MDBRow>   
                </MDBContainer>
                <MDBContainer style={{marginTop:20}}>
                 <MDBRow>
                        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                    <Form
                      onSubmit={onSubmit}
                      
                      validate={validateDepto}
                      render={({ handleSubmit, submitting,values }) => (
                        <form onSubmit={handleSubmit}>
                        <Alert color="primary">Por favor ingrese el nuevo Departamento a Registrar</Alert>
                          <Paper style={{ padding: 16} }>
                            <Grid container alignItems="flex-start" spacing={2} >
                              <Grid item xs={6}>
                                <Field
                                  fullWidth
                                  required
                                  name="departamento"
                                  component={TextField}
                                  type="text"
                                  label="Nuevo Departamento"
                                />
                              </Grid>

                              <Grid item style={{ marginTop: 16 ,marginLeft:150 }}>
                                <Button
                                variant="outlined"
                                  color="secondary"
                                  type="submit"
                                  disabled={submitting}
                                  onClick={(e) =>this.evaluarDepto(values)}
                                >
                                  Registrar nuevo departamento
                                </Button>
                              </Grid>
                            </Grid>
                          </Paper>
                        
                        </form>
                      )}
                    />
                  </div>
                </MDBRow>   
                </MDBContainer>
            </div>
      
           
            </React.Fragment>
          );
        }
      }
      export default Sucursales