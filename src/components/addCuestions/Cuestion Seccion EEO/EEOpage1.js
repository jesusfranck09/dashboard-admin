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
    if (!values.pregunta1) {
      errors.pregunta1 = 'Este campo es requerido';
    }
    if (!values.pregunta2) {
      errors.pregunta2 = 'Este campo es requerido';
    }
    if (!values.pregunta3) {
      errors.pregunta3 = 'Este campo es requerido';
    }
    if (!values.pregunta4) {
      errors.pregunta4 = 'Este campo es requerido';
    }
    if (!values.pregunta5) {
      errors.pregunta5 = 'Este campo es requerido';
    }
    return errors;
  };

  evaluar= (values) => {


    if( (values.pregunta1 == "Siempre" || values.pregunta1=="CasiSiempre"|| values.pregunta1=="AlgunasVeces"|| values.pregunta1=="CasiNunca"|| values.pregunta1=="Nunca") 
    && (values.pregunta2 == "Siempre" || values.pregunta2=="CasiSiempre"|| values.pregunta2=="AlgunasVeces"|| values.pregunta2=="CasiNunca"|| values.pregunta2=="Nunca") 
    && (values.pregunta3 == "Siempre" || values.pregunta3=="CasiSiempre"|| values.pregunta3=="AlgunasVeces"|| values.pregunta3=="CasiNunca"|| values.pregunta3=="Nunca")
    && (values.pregunta4 == "Siempre" || values.pregunta4=="CasiSiempre"|| values.pregunta4=="AlgunasVeces"|| values.pregunta4=="CasiNunca"|| values.pregunta4=="Nunca")
    && (values.pregunta5 == "Siempre" || values.pregunta5=="CasiSiempre"|| values.pregunta5=="AlgunasVeces"|| values.pregunta5=="CasiNunca"|| values.pregunta5=="Nunca")

    ){
      let pregunta1;
      let pregunta2;
      let pregunta3;
      let pregunta4;
      let pregunta5;
      if(values.pregunta1=="Siempre"){
        pregunta1=0
      }else if(values.pregunta1=="CasiSiempre"){
        pregunta1=1
      }else if(values.pregunta1=="AlgunasVeces"){
        pregunta1=2
      }else if(values.pregunta1=="CasiNunca"){
        pregunta1=3
      }else if(values.pregunta1=="Nunca"){
        pregunta1=4
      }
      if(values.pregunta2=="Siempre"){
        pregunta2=4
      }else if(values.pregunta2=="CasiSiempre"){
        pregunta2=3
      }else if(values.pregunta2=="AlgunasVeces"){
        pregunta2=2
      }else if(values.pregunta2=="CasiNunca"){
        pregunta2=1
      }else if(values.pregunta2=="Nunca"){
        pregunta2=0
      }
      if(values.pregunta3=="Siempre"){
        pregunta3=4
      }else if(values.pregunta3=="CasiSiempre"){
        pregunta3=3
      }else if(values.pregunta3=="AlgunasVeces"){
        pregunta3=2
      }else if(values.pregunta3=="CasiNunca"){
        pregunta3=1
      }else if(values.pregunta3=="Nunca"){
        pregunta3=0
      }
      if(values.pregunta4=="Siempre"){
        pregunta4=0
      }else if(values.pregunta4=="CasiSiempre"){
        pregunta4=1
      }else if(values.pregunta4=="AlgunasVeces"){
        pregunta4=2
      }else if(values.pregunta4=="CasiNunca"){
        pregunta4=3
      }else if(values.pregunta4=="Nunca"){
        pregunta4=4
      }
      if(values.pregunta5=="Siempre"){
        pregunta5=4
      }else if(values.pregunta5=="CasiSiempre"){
        pregunta5=3
      }else if(values.pregunta5=="AlgunasVeces"){
        pregunta5=2
      }else if(values.pregunta5=="CasiNunca"){
        pregunta5=1
      }else if(values.pregunta5=="Nunca"){
        pregunta5=0
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
          eeoPage1(data:"${[values.pregunta1,values.pregunta2,values.pregunta3,values.pregunta4,values.pregunta5,correo,periodo,pregunta1,pregunta2,pregunta3,pregunta4,pregunta5]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
              this.props.history.push("./EEOpage2")
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
      <div style={{marginTop:60}}>
      <MDBContainer style={container} className="text-center  ">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={this.validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección EEO<br></br>  INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">I. Condiciones ambientales de su centro de trabajo.</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>1.- El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>2.- Mi trabajo me exige hacer mucho esfuerzo físico</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>3.- Me preocupa sufrir un accidente en mi trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>4.- Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>5.- Considero que las actividades que realizo son peligrosas</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="Nunca"/>} /></td>
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
