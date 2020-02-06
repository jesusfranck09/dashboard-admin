import React from 'react';
import { Form, Field } from 'react-final-form';
import {  Radio  } from 'final-form-material-ui';
import {
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { Alert } from 'reactstrap';
import axios from 'axios';
import Navbar from '../NavbarDatos'

import { MDBRow, MDBCol, MDBBadge } from 'mdbreact';

import { MDBContainer,MDBTableBody,MDBTable,MDBTableHead,MDBCollapse} from 'mdbreact';

 

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data:'',
    showModal2:false

    
    };
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }


  validate = values => {
    const errors = {};
    if (!values.pregunta31) {
      errors.pregunta31 = 'Este campo es requerido';
    }
    if (!values.pregunta32) {
      errors.pregunta32 = 'Este campo es requerido';
    }
    if (!values.pregunta33) {
      errors.pregunta33 = 'Este campo es requerido';
    }
    if (!values.pregunta34) {
      errors.pregunta34 = 'Este campo es requerido';
    }
    if (!values.pregunta35) {
      errors.pregunta35 = 'Este campo es requerido';
    }
    if (!values.pregunta36) {
      errors.pregunta36 = 'Este campo es requerido';
    }  

    return errors;
  };
  evaluar= (values) => {

    if( (values.pregunta31 == "Siempre" || values.pregunta31=="CasiSiempre"|| values.pregunta31=="AlgunasVeces"|| values.pregunta31=="CasiNunca"|| values.pregunta31=="Nunca") 
    && (values.pregunta32 == "Siempre" || values.pregunta32=="CasiSiempre"|| values.pregunta32=="AlgunasVeces"|| values.pregunta32=="CasiNunca"|| values.pregunta32=="Nunca") 
    && (values.pregunta33 == "Siempre" || values.pregunta33=="CasiSiempre"|| values.pregunta33=="AlgunasVeces"|| values.pregunta33=="CasiNunca"|| values.pregunta33=="Nunca")
    && (values.pregunta34 == "Siempre" || values.pregunta34=="CasiSiempre"|| values.pregunta34=="AlgunasVeces"|| values.pregunta34=="CasiNunca"|| values.pregunta34=="Nunca")
    && (values.pregunta35 == "Siempre" || values.pregunta35=="CasiSiempre"|| values.pregunta35=="AlgunasVeces"|| values.pregunta35=="CasiNunca"|| values.pregunta35=="Nunca")
    && (values.pregunta36 == "Siempre" || values.pregunta36=="CasiSiempre"|| values.pregunta36=="AlgunasVeces"|| values.pregunta36=="CasiNunca"|| values.pregunta36=="Nunca")

    ){
      const correo   = localStorage.getItem("correoEEO")
    
      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          eeoPage8(data:"${[values.pregunta31,values.pregunta32,values.pregunta33,values.pregunta34,values.pregunta35,values.pregunta36,correo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
              this.props.history.push("./EEOpage9")
            }); 
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
        <Navbar></Navbar>
        </MDBContainer> 
      <div style={{marginTop:50}}>
      <MDBContainer style={container} className="text-center  ">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={this.validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección EEO<br></br>  INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">VIII. capacitación e información que se le proporciona sobre su trabajo.</Alert>
              <Grid container alignItems="flex-start" spacing={2} item xs={12}>
              <FormControl component="fieldset">
              <RadioGroup >
              <MDBTable striped>
                 
                  <MDBTableHead>
                  <td><FormLabel component="legend"style={{ marginRight:200}}></FormLabel></td>
                  <td><MDBBadge color="ligth">Siempre</MDBBadge></td>
                  <td><MDBBadge color="ligth">Casi Siempre</MDBBadge></td>
                  <td><MDBBadge color="ligth">Algunas Veces</MDBBadge></td>
                  <td><MDBBadge color="ligth">Casi Nunca</MDBBadge></td>
                  <td><MDBBadge color="ligth">Nunca</MDBBadge></td>

                  </MDBTableHead>
                  <MDBTableBody>
                  
                    <tr>
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>31.- Me informan con claridad cuáles son mis funciones</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta31" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta31" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta31" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta31" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta31" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>32.- Me explican claramente los resultados que debo obtener en mi trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta32" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta32" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta32" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta32" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta32" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>33.- Me explican claramente los objetivos de mi trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta33" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta33" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta33" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta33" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta33" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>34.- Me informan con quién puedo resolver problemas o asuntos de trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta34" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta34" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta34" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta34" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta34" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>35.- Me permiten asistir a capacitaciones relacionadas con mi trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta35" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta35" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta35" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta35" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta35" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>36.- Recibo capacitación útil para hacer mi trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta36" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta36" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta36" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta36" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta36" component={Radio} type="radio" value="Nunca"/>} /></td>
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
                  };
                  export default Home;
