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
    if (!values.pregunta13) {
      errors.pregunta13 = 'Este campo es requerido';
    }
    if (!values.pregunta14) {
      errors.pregunta14 = 'Este campo es requerido';
    }
    if (!values.pregunta15) {
      errors.pregunta15 = 'Este campo es requerido';
    }
    if (!values.pregunta16) {
      errors.pregunta16 = 'Este campo es requerido';
    }
        return errors;
  };



  evaluar= (values) => {

    if( (values.pregunta13 == "Siempre" || values.pregunta13=="CasiSiempre"|| values.pregunta13=="AlgunasVeces"|| values.pregunta13=="CasiNunca"|| values.pregunta13=="Nunca") 
    && (values.pregunta14 == "Siempre" || values.pregunta14=="CasiSiempre"|| values.pregunta14=="AlgunasVeces"|| values.pregunta14=="CasiNunca"|| values.pregunta14=="Nunca") 
    && (values.pregunta15 == "Siempre" || values.pregunta15=="CasiSiempre"|| values.pregunta15=="AlgunasVeces"|| values.pregunta15=="CasiNunca"|| values.pregunta15=="Nunca")
    && (values.pregunta16 == "Siempre" || values.pregunta16=="CasiSiempre"|| values.pregunta16=="AlgunasVeces"|| values.pregunta16=="CasiNunca"|| values.pregunta16=="Nunca")

    ){
      let pregunta13;
      let pregunta14;
      let pregunta15;
      let pregunta16;
   
      if(values.pregunta13=="Siempre"){
        pregunta13=4
      }else if(values.pregunta13=="CasiSiempre"){
        pregunta13=3
      }else if(values.pregunta13=="AlgunasVeces"){
        pregunta13=2
      }else if(values.pregunta13=="CasiNunca"){
        pregunta13=1
      }else if(values.pregunta13=="Nunca"){
        pregunta13=0
      }
      if(values.pregunta14=="Siempre"){
        pregunta14=4
      }else if(values.pregunta14=="CasiSiempre"){
        pregunta14=3
      }else if(values.pregunta14=="AlgunasVeces"){
        pregunta14=2
      }else if(values.pregunta14=="CasiNunca"){
        pregunta14=1
      }else if(values.pregunta14=="Nunca"){
        pregunta14=0
      }
      if(values.pregunta15=="Siempre"){
        pregunta15=4
      }else if(values.pregunta15=="CasiSiempre"){
        pregunta15=3
      }else if(values.pregunta15=="AlgunasVeces"){
        pregunta15=2
      }else if(values.pregunta15=="CasiNunca"){
        pregunta15=1
      }else if(values.pregunta15=="Nunca"){
        pregunta15=0
      }
      if(values.pregunta16=="Siempre"){
        pregunta16=4
      }else if(values.pregunta16=="CasiSiempre"){
        pregunta16=3
      }else if(values.pregunta16=="AlgunasVeces"){
        pregunta16=2
      }else if(values.pregunta16=="CasiNunca"){
        pregunta16=1
      }else if(values.pregunta16=="Nunca"){
        pregunta16=0
      }

      const correo   = localStorage.getItem("correoEEO")
      const periodo = localStorage.getItem("Periodo")
      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          eeoPage4(data:"${[values.pregunta13,values.pregunta14,values.pregunta15,values.pregunta16,correo,periodo,pregunta13,pregunta14,pregunta15,pregunta16]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
              this.props.history.push("./EEOpage5")
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
      <div style= {{marginTop:50}}>
      <MDBContainer style={container} className="text-center  ">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={this.validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección EEO<br></br>  INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">IV. Trabajo y las responsabilidades que tiene.</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>13.- En mi trabajo soy responsable de cosas de mucho valor</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>14.- Respondo ante mi jefe por los resultados de toda mi área de trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>15.- En el trabajo me dan órdenes contradictorias</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta15" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta15" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta15" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta15" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta15" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>16.- Considero que en mi trabajo me piden hacer cosas innecesarias</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta16" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta16" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta16" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta16" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta16" component={Radio} type="radio" value="Nunca"/>} /></td>
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
