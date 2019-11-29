import React from 'react';
import { Form, Field } from 'react-final-form';
import {  Radio  } from 'final-form-material-ui';
import Modal from 'react-modal';
import Ok from '../images/ok.png'
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
 

  evaluar= (values) => {

    if( (values.pregunta10 == "Siempre" || values.pregunta10=="CasiSiempre"|| values.pregunta10=="AlgunasVeces"|| values.pregunta10=="CasiNunca"|| values.pregunta10=="Nunca") 
    && (values.pregunta11 == "Siempre" || values.pregunta11=="CasiSiempre"|| values.pregunta11=="AlgunasVeces"|| values.pregunta11=="CasiNunca"|| values.pregunta11=="Nunca") 
    && (values.pregunta12 == "Siempre" || values.pregunta12=="CasiSiempre"|| values.pregunta12=="AlgunasVeces"|| values.pregunta12=="CasiNunca"|| values.pregunta12=="Nunca") 
    && (values.pregunta13 == "Siempre" || values.pregunta13=="CasiSiempre"|| values.pregunta13=="AlgunasVeces"|| values.pregunta13=="CasiNunca"|| values.pregunta13=="Nunca") 
    && (values.pregunta14 == "Siempre" || values.pregunta14=="CasiSiempre"|| values.pregunta14=="AlgunasVeces"|| values.pregunta14=="CasiNunca"|| values.pregunta14=="Nunca")){
        
      const correo = localStorage.getItem('correo')
      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          atsPage4(data:"${[values.pregunta10,values.pregunta11,values.pregunta12,values.pregunta13,values.pregunta14,correo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              localStorage.removeItem('correo')
            }); 

      this.setState({
            showModal2:true
      }) 
      }


   
  }


  componentWillMount(){
    setTimeout(() => { this.setState({showModal:false})},1500)
}


  handleClick(){

    

// var val =  JSON.parse(values)
// console.log(val.rotacion)
// if(val.rotacion=="si"){

// return(
// console.log("jlkjl")
// )
// }else if(val.rotacion=="no"){ 

  
// }
 

console.log("data" ,this.state.data)

  }


  render() {
    // const { children} = this.props;
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
    return (


      <React.Fragment>
      <div>
        <MDBContainer style={container} className="text-center mt-2 pt-5">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección ATS <br></br> INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">IV.- Afectación (durante el último mes).</Alert>


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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>10.- ¿Ha tenido usted dificultades para dormir?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>11.-¿Ha estado particularmente irritable o le han dado arranques de coraje?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>12.-¿Ha tenido dificultad para concentrarse?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>13.-¿Ha estado nervioso o constantemente en alerta?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>14.-¿Se ha sobresaltado fácilmente por cualquier cosa?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="Casisiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="Nunca"/>} /></td>
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
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
        </MDBContainer>
    
      </div>


      <Modal className="modal-main" isOpen={this.state.showModal2} contentLabel="Minimal Modal Example">
                    <div className="row">
                        <div className="col-md-12" item xs={12}>
                            <center><br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <img src={Ok} alt="ok" className="img-fluid"/><br/><br/>
                                
                                <br/>
                                <br/>
                                <br/>
                                <Alert color="secondary" style={{fontSize: 24}}>Su encuesta ha finalizado, Gracias por su colaboración</Alert>
                                <br/>
                                <br/>
                                <Grid item style={{ marginTop: 16 }} spacing={2} item xs={12}>
                                <Button 
                                  variant="contained"
                                    color="secondary"
                                    type = "submit"
                                    onClick={()=>{this.props.history.push('/inicio')}}
                                  >
                                    Pantalla de inicio  
                                  </Button>
                                  </Grid>
                            </center>
                        </div>
                    </div>

                </Modal>
      </React.Fragment>

    );  
  }
}

                  function onSubmit (values) {

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
