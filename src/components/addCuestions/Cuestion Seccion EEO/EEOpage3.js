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
    if (!values.pregunta9) {
      errors.pregunta9 = 'Este campo es requerido';
    }
    if (!values.pregunta10) {
      errors.pregunta10 = 'Este campo es requerido';
    }
    if (!values.pregunta11) {
      errors.pregunta11 = 'Este campo es requerido';
    }
    if (!values.pregunta12) {
      errors.pregunta12 = 'Este campo es requerido';
    }
  
    return errors;
  };


  evaluar= (values) => {
console.log("values" ,values)
    if( (values.pregunta9 == "Siempre" || values.pregunta9=="CasiSiempre"|| values.pregunta9=="AlgunasVeces"|| values.pregunta9=="CasiNunca"|| values.pregunta9=="Nunca") 
    && (values.pregunta10 == "Siempre" || values.pregunta10=="CasiSiempre"|| values.pregunta10=="AlgunasVeces"|| values.pregunta10=="CasiNunca"|| values.pregunta10=="Nunca") 
    && (values.pregunta11 == "Siempre" || values.pregunta11=="CasiSiempre"|| values.pregunta11=="AlgunasVeces"|| values.pregunta11=="CasiNunca"|| values.pregunta11=="Nunca")
    && (values.pregunta12 == "Siempre" || values.pregunta12=="CasiSiempre"|| values.pregunta12=="AlgunasVeces"|| values.pregunta12=="CasiNunca"|| values.pregunta12=="Nunca")

    ){


      let pregunta9;
      let pregunta10;
      let pregunta11;
      let pregunta12;
   
      if(values.pregunta9=="Siempre"){
        pregunta9=4
      }else if(values.pregunta9=="CasiSiempre"){
        pregunta9=3
      }else if(values.pregunta9=="AlgunasVeces"){
        pregunta9=2
      }else if(values.pregunta9=="CasiNunca"){
        pregunta9=1
      }else if(values.pregunta9=="Nunca"){
        pregunta9=0
      }
      if(values.pregunta10=="Siempre"){
        pregunta10=4
      }else if(values.pregunta10=="CasiSiempre"){
        pregunta10=3
      }else if(values.pregunta10=="AlgunasVeces"){
        pregunta10=2
      }else if(values.pregunta10=="CasiNunca"){
        pregunta10=1
      }else if(values.pregunta10=="Nunca"){
        pregunta10=0
      }
      if(values.pregunta11=="Siempre"){
        pregunta11=4
      }else if(values.pregunta11=="CasiSiempre"){
        pregunta11=3
      }else if(values.pregunta11=="AlgunasVeces"){
        pregunta11=2
      }else if(values.pregunta11=="CasiNunca"){
        pregunta11=1
      }else if(values.pregunta11=="Nunca"){
        pregunta11=0
      }
      if(values.pregunta12=="Siempre"){
        pregunta12=4
      }else if(values.pregunta12=="CasiSiempre"){
        pregunta12=3
      }else if(values.pregunta12=="AlgunasVeces"){
        pregunta12=2
      }else if(values.pregunta12=="CasiNunca"){
        pregunta12=1
      }else if(values.pregunta12=="Nunca"){
        pregunta12=0
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
          eeoPage3(data:"${[values.pregunta9,values.pregunta10,values.pregunta11,values.pregunta12,correo,periodo,pregunta9,pregunta10,pregunta11,pregunta12]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
              this.props.history.push("./EEOpage4")
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
      <div style={{marginTop:40} }>
      <MDBContainer style={container} className="text-center  ">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={this.validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección EEO<br></br>  INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">III. El esfuerzo mental que le exige su trabajo.</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>9.- Mi trabajo exige que esté muy concentrado</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>10.- Mi trabajo requiere que memorice mucha información</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>11.- En mi trabajo tengo que tomar decisiones difíciles muy rápido</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>12.- Mi trabajo exige que atienda varios asuntos al mismo tiempo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="Nunca"/>} /></td>
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
