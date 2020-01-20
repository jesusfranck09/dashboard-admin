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
import Navbar from './NavbarDatos'
 

import {  MDBBadge } from 'mdbreact';

import { MDBContainer,MDBTableBody,MDBTable,MDBTableHead,MDBCollapse} from 'mdbreact';

 

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data:'',
    showModal2:false

    
    };
  }

  evaluar= (values) => {
console.log("values", values)

if( (values.pregunta1 == "si" || values.pregunta1=="no") && (values.pregunta2 == "si" || values.pregunta2=="no")){
  
  const correo = localStorage.getItem('correoATS')


  const url = 'http://localhost:8000/graphql'
  axios({
    url:  url,
    method:'post',
    data:{
    query:`
     mutation{
      atsPage2(data:"${[values.pregunta1,values.pregunta2,correo]}"){
          message
            }
          }
        `
    }
        }).then((datos) => {
          console.log("los datos son ",datos)
        });    
  
  this.props.history.push("./page2")
}

  }


  componentWillMount(){
    setTimeout(() => { this.setState({showModal:false})},1500)
}

  handleClick(){

  }


  render() {
    // const { children} = this.props;
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
    return (


      <React.Fragment>
      <MDBContainer>
        <Navbar></Navbar>
        </MDBContainer>  

      <div style={{marginTop:60}}>
        
        <MDBContainer style={container} className="text-center mt-2 pt-5">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección ATS <br></br> INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes).</Alert>


              <Grid container alignItems="flex-start" spacing={2} item xs={12}>
              <FormControl component="fieldset">
                   <RadioGroup >
              <MDBTable striped>
                 
                  <MDBTableHead>
                  <td><FormLabel component="legend"  ></FormLabel></td>
                  <td><MDBBadge color="ligth"  style={{ fontSize:14 }}><strong>SI</strong></MDBBadge></td>
                  <td><MDBBadge color="ligth"  style={{ fontSize:14 }}><strong>NO</strong></MDBBadge></td>
                  

                  </MDBTableHead>
                  <MDBTableBody>
                  
                    <tr>
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>1.- ¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="no"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>2.-¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="no"/>} /></td>
                    </tr> 
                  </MDBTableBody>
                  
                </MDBTable>
                </RadioGroup>
                    </FormControl>
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
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
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
