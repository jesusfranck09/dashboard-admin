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
 

import { MDBRow, MDBCol, MDBBadge } from 'mdbreact';

import { MDBContainer,MDBTableBody,MDBTable,MDBTableHead,MDBCollapse} from 'mdbreact';
// import Modal from 'react-modal';
// import Ok from '../../images/ok.png'
import { DialogUtility } from '@syncfusion/ej2-popups';
import Navbar from '../NavbarDatos'

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
    if (!values.pregunta69) {
      errors.pregunta69 = 'Este campo es requerido';
    }
    if (!values.pregunta70) {
      errors.pregunta70 = 'Este campo es requerido';
    }
    if (!values.pregunta71) {
      errors.pregunta71 = 'Este campo es requerido';
    }
    if (!values.pregunta72) {
      errors.pregunta72 = 'Este campo es requerido';
    }
   

    return errors;
  };
  evaluar= (values) => {

    if( (values.pregunta69 == "Siempre" || values.pregunta69=="CasiSiempre"|| values.pregunta69=="AlgunasVeces"|| values.pregunta69=="CasiNunca"|| values.pregunta69=="Nunca") 
    && (values.pregunta70 == "Siempre" || values.pregunta70=="CasiSiempre"|| values.pregunta70=="AlgunasVeces"|| values.pregunta70=="CasiNunca"|| values.pregunta70=="Nunca") 
    && (values.pregunta71 == "Siempre" || values.pregunta71=="CasiSiempre"|| values.pregunta71=="AlgunasVeces"|| values.pregunta71=="CasiNunca"|| values.pregunta71=="Nunca")
    && (values.pregunta72 == "Siempre" || values.pregunta72=="CasiSiempre"|| values.pregunta72=="AlgunasVeces"|| values.pregunta72=="CasiNunca"|| values.pregunta72=="Nunca")

    ){
      let pregunta69;
      let pregunta70;
      let pregunta71;
      let pregunta72;
      
      if(values.pregunta69=="Siempre"){
        pregunta69=4
      }else if(values.pregunta69=="CasiSiempre"){
        pregunta69=3
      }else if(values.pregunta69=="AlgunasVeces"){
        pregunta69=2
      }else if(values.pregunta69=="CasiNunca"){
        pregunta69=1
      }else if(values.pregunta69=="Nunca"){
        pregunta69=0
      }
      if(values.pregunta70=="Siempre"){
        pregunta70=4
      }else if(values.pregunta70=="CasiSiempre"){
        pregunta70=3
      }else if(values.pregunta70=="AlgunasVeces"){
        pregunta70=2
      }else if(values.pregunta70=="CasiNunca"){
        pregunta70=1
      }else if(values.pregunta70=="Nunca"){
        pregunta70=0
      }
      if(values.pregunta71=="Siempre"){
        pregunta71=4
      }else if(values.pregunta71=="CasiSiempre"){
        pregunta71=3
      }else if(values.pregunta71=="AlgunasVeces"){
        pregunta71=2
      }else if(values.pregunta71=="CasiNunca"){
        pregunta71=1
      }else if(values.pregunta71=="Nunca"){
        pregunta71=0
      }
      if(values.pregunta72=="Siempre"){
        pregunta72=4
      }else if(values.pregunta72=="CasiSiempre"){
        pregunta72=3
      }else if(values.pregunta72=="AlgunasVeces"){
        pregunta72=2
      }else if(values.pregunta72=="CasiNunca"){
        pregunta72=1
      }else if(values.pregunta72=="Nunca"){
        pregunta72=0
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
          eeoPage14(data:"${[values.pregunta69,values.pregunta70,values.pregunta71,values.pregunta72,correo,periodo,pregunta69,pregunta70,pregunta71,pregunta72]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              localStorage.removeItem('correoEEO')
              localStorage.removeItem('nombreUsuario')
              localStorage.removeItem('ApellidoPUsuario')
              localStorage.removeItem('ApellidoMUsuario')
              localStorage.removeItem("Periodo")
              this.props.history.push("./inicio")
            }); 

            localStorage.removeItem('correoEEO')
            DialogUtility.alert({
              animationSettings: { effect: 'Zoom' },           
              content: "Su Encuesta EEO ha finalizado, gracias por su colaboracion!",
              title: 'Aviso!',
              position: "fixed",
           
          })
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
      <div style = {{marginTop:50}}>
      <MDBContainer style={container} className="text-center  ">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={this.validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección EEO<br></br>  INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">XIV.  Las actitudes de las personas que supervisa.</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>69.- Para hacer mi trabajo debo demostrar sentimientos distintos a los míos</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta69" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta69" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta69" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta69" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta69" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>70.- Dificultan el logro de los resultados del trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta70" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta70" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta70" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta70" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta70" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>71.- Cooperan poco cuando se necesita</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta71" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta71" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta71" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta71" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta71" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>72.- Ignoran las sugerencias para mejorar su trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta72" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta72" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta72" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta72" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta72" component={Radio} type="radio" value="Nunca"/>} /></td>
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






                  // function App() {
                  //   return (
                    
                  // }


                  export default Home;
