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
// import Modal from 'react-modal';
// import Ok from '../../images/ok.png'
import { DialogUtility } from '@syncfusion/ej2-popups';
import Navbar from '../NavbarDatos'

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

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
validate = values => {
    const errors = {};
    if (!values.pregunta44) {
      errors.pregunta44 = 'Este campo es requerido';
    }
    if (!values.pregunta45) {
      errors.pregunta45 = 'Este campo es requerido';
    }
    if (!values.pregunta46) {
      errors.pregunta46 = 'Este campo es requerido';
    }
    return errors;
  };
  evaluar= (values) => {

    if( (values.pregunta44 == "Siempre" || values.pregunta44=="CasiSiempre"|| values.pregunta44=="AlgunasVeces"|| values.pregunta44=="CasiNunca"|| values.pregunta44=="Nunca") 
    && (values.pregunta45 == "Siempre" || values.pregunta45=="CasiSiempre"|| values.pregunta45=="AlgunasVeces"|| values.pregunta45=="CasiNunca"|| values.pregunta45=="Nunca") 
    && (values.pregunta46 == "Siempre" || values.pregunta46=="CasiSiempre"|| values.pregunta46=="AlgunasVeces"|| values.pregunta46=="CasiNunca"|| values.pregunta46=="Nunca")
   
    ){
      let pregunta44;
      let pregunta45;
      let pregunta46;
  
      if(values.pregunta44=="Siempre"){
        pregunta44=4
      }else if(values.pregunta44=="CasiSiempre"){
        pregunta44=3
      }else if(values.pregunta44=="AlgunasVeces"){
        pregunta44=2
      }else if(values.pregunta44=="CasiNunca"){
        pregunta44=1
      }else if(values.pregunta44=="Nunca"){
        pregunta44=0
      }
      if(values.pregunta45=="Siempre"){
        pregunta45=4
      }else if(values.pregunta45=="CasiSiempre"){
        pregunta45=3
      }else if(values.pregunta45=="AlgunasVeces"){
        pregunta45=2
      }else if(values.pregunta45=="CasiNunca"){
        pregunta45=1
      }else if(values.pregunta45=="Nunca"){
        pregunta45=0
      }
      if(values.pregunta46=="Siempre"){
        pregunta46=4
      }else if(values.pregunta46=="CasiSiempre"){
        pregunta46=3
      }else if(values.pregunta46=="AlgunasVeces"){
        pregunta46=2
      }else if(values.pregunta46=="CasiNunca"){
        pregunta46=1
      }else if(values.pregunta46=="Nunca"){
        pregunta46=0
      }
      const correo = localStorage.getItem('correoRP')
      const periodo = localStorage.getItem("Periodo")
      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          rpPage8(data:"${[values.pregunta44,values.pregunta45,values.pregunta46,correo,periodo,pregunta44,pregunta45,pregunta46]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              localStorage.removeItem('correoRP')
              localStorage.removeItem('nombreUsuario')
              localStorage.removeItem('ApellidoPUsuario')
              localStorage.removeItem('ApellidoMUsuario')
              localStorage.removeItem('Periodo')
            }); 

            localStorage.removeItem('correoRP')
            DialogUtility.alert({
              animationSettings: { effect: 'Zoom' },           
              content: "Su Encuesta RP ha finalizado, gracias por su colaboracion!",
              title: 'Aviso!',
              position: "fixed",
           
          })
          this.props.history.push("./inicio")
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
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección RP<br></br>  INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">VIII. Soy jefe de otros trabajadores</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>44.- Comunican tarde los asuntos de trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta44" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta44" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta44" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta44" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta44" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>45.- Dificultan el logro de los resultados del trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta45" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta45" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta45" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta45" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta45" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>46.- Ignoran las sugerencias para mejorar su trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta46" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta46" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta46" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta46" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta46" component={Radio} type="radio" value="Nunca"/>} /></td>
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
