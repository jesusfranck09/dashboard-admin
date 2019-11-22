
import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Radio, Select } from 'final-form-material-ui';
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

import { MDBRow, MDBCol } from 'mdbreact';
import { object } from 'prop-types';

function onSubmit (values) {
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // await sleep(300);
const vari = JSON.stringify(values,1,2)


//  const url = 'http://localhost:8000/graphql'
//   axios({
//     url:  url,
//     method:'post',
//     data:{
//     query:`
//      mutation{
//       registerSingleEmployee(data:$input){
//           message
//             }
//           }
//         `
//     }
//         }).then((datos) => {
//           console.log("los datos son ",datos)
//           alert("exito")
     
//           alert(vari)
     
        

//           // this.props.history.push("/inicio")
//         })
        
//         .catch((err) => {
//           alert("error")
    
//           alert(vari)
//           alert(vari.Nombre)
//           console.log("los datos son ",err.response)
        
//         })
const url  = 'http://localhost:8000/graphql'
				
				const query =  `
				mutation {
					registerSingleEmployee(
						data:${vari}
					){
						message
					}
				}
				`;
				axios({
				url:  url,
				method: 'post',
				data: {
					query,
					variables: {
						data: `${vari}`
					}
				}
					}).then((result) => {
            alert("exito")
     
           alert(vari[0].Nombre)
					})
					 .catch((error) => {
            alert("error")
            alert(query)

					 console.log(".cartch" , error.response)
				});

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

function App() {
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary"> INSTRUCCIONES : Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="secondary">I.- Acontecimiento traumático severo </Alert>


              <Grid container alignItems="flex-start" spacing={2} item xs={12}>
            
                    <Grid  item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup row>
                      <MDBRow>
                      <MDBCol>
                      <FormLabel component="legend" className="text-center mt-3 ml-3">¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los siguientes:    Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión grave?    Asaltos?    Actos violentos que derivaron en lesiones graves?    Secuestro?    Amenazas?, o    Cualquier otro que ponga en riesgo su vida o salud, y/o la de otras personas?</FormLabel>
                      </MDBCol> 
                      <FormControlLabel 
                        label="Si"
                        control={
                          <Field
                          required
                            name="rotacion"
                            component={Radio}
                            type="radio"
                            value="si"
                          />
                        }
                      />
                      <FormControlLabel
                        label="No"
                        control={
                          <Field
                          required
                            name="rotacion"
                            component={Radio}
                            type="radio"
                            value="no"
                          />
                        }
                      />


                    <FormControlLabel
                        label="No"
                        control={
                          <Field
                          required
                            name="rotacion"
                            component={Radio}
                            type="radio"
                            value="no"
                          />
                        }
                      />


                    <FormControlLabel
                        label="No"
                        control={
                          <Field
                          required
                            name="rotacion"
                            component={Radio}
                            type="radio"
                            value="no"
                          />
                        }
                      />
                      </MDBRow>

                    </RadioGroup>
                  </FormControl>
                </Grid>


                <Grid  item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup row>
                      <MDBRow>
                      <MDBCol>
                      <FormLabel component="legend" className="text-center mt-3 ml-3">SEXO</FormLabel>
                      </MDBCol> 
                      <FormControlLabel 
                        label="Hombre"
                        control={
                          <Field
                          required
                            name="stooge"
                            component={Radio}
                            type="radio"
                            value="uno"
                          />
                        }
                      />
                      <FormControlLabel
                        label="cero"
                        control={
                          <Field
                          required
                            name="stooge"
                            component={Radio}
                            type="radio"
                            value="dos"
                          />
                        }
                      />
                    <FormControlLabel
                      
                        control={
                          <Field
                          required
                            name="rotacion"
                            component={Radio}
                            type="radio"
                            value="tres"
                          />
                        }
                      />
                       <FormControlLabel
                        
                        control={
                          <Field
                          required
                            name="rotacion"
                            component={Radio}
                            type="radio"
                            value="cuatro"
                          />
                        }
                      />
                      <FormControlLabel
                        
                        control={
                          <Field
                          required
                            name="rotacion"
                            component={Radio}
                            type="radio"
                            value="cinco"
                          />
                        }
                      />
                      </MDBRow>

                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                   variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
           <pre>{JSON.stringify(values,1,2)}</pre> 
          </form>
        )}
      />
    </div>
  );
}

export default App;
