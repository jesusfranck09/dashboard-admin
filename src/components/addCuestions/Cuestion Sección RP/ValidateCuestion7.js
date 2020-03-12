import React from 'react';
import { Form, Field } from 'react-final-form';
import {  Radio} from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { Alert } from 'reactstrap';
import axios from 'axios';
import Navbar from '../NavbarDatos'
import { API} from '../../utils/http'

import { MDBRow, MDBCol} from 'mdbreact';

import { MDBContainer} from 'mdbreact';

 
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data:'',
    };
  }
 validate = values => {
    const errors = {};
    if (!values.rotacion) {
      errors.rotacion = 'Este campo es requerido';
    }
    return errors;
  };
  

  evaluar= (values) => {
    console.log("los values son" , values)
    const periodo = localStorage.getItem("Periodo")
    if(values.rotacion === 'si'){

      const correo = localStorage.getItem('correoRP')

      // const url = 'http://localhost:8000/graphql'
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
         mutation{
          rpValidadorPage7(data:"${[values.rotacion,correo,periodo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            }); 
        this.props.history.push("./RPpage7")
    }
    
    if (values.rotacion === 'no') {

      const correo = localStorage.getItem('correoRP')
     
      // const url = 'http://localhost:8000/graphql'
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
         mutation{
          rpValidadorPage7(data:"${[values.rotacion,correo,periodo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            }); 
        this.props.history.push("./RPValidate8")   
       }
  }


  componentWillMount(){
    setTimeout(() => { this.setState({showModal:false})},1500)
}


  handleClick(){
console.log("data" ,this.state.data)
  }
  render() {
    // const { children} = this.props;
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
    return (


      <React.Fragment>
        <MDBContainer>
          <Navbar/>
        </MDBContainer>
      <div>
     
        <MDBContainer style={container} className="text-center mt-2 pt-5">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={this.validate}
        render={({ handleSubmit, reset, submitting, pristine,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary"> Sección RP <br></br> INSTRUCCIONES : Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="secondary">VII.¿ En mi trabajo debo brindar servicio a clientes o usuarios?</Alert>


              <Grid container alignItems="flex-start" spacing={2} item xs={12}>
            
                    <Grid  item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup row>
                      <MDBRow>
                       
                      <MDBCol className="text-center mt-5 ml-3">
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

                      </MDBCol>
                      </MDBRow>

                    </RadioGroup>
                  </FormControl>
                </Grid>
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

}
export default Home;
