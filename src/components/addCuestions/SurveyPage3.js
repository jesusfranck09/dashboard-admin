import React from 'react';
import { Form, Field } from 'react-final-form';
import {  Radio  } from 'final-form-material-ui';
// import Modal from 'react-modal';
//  import Ok from '../images/ok.png'
import {
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormLabel,
  // MenuItem,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { Alert } from 'reactstrap';
import axios from 'axios';
import { DialogUtility } from '@syncfusion/ej2-popups';

import {MDBBadge } from 'mdbreact';
import Navbar from './NavbarDatos'
import { MDBContainer,MDBTableBody,MDBTable,MDBTableHead,MDBCollapse} from 'mdbreact';
 
 

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data:'',

    };
    
  }
 

  evaluar= (values) => {
    console.log("entro a evaluar")
    if( (values.pregunta10 == "si" || values.pregunta10=="no")&& (values.pregunta11 == "si" || values.pregunta11=="no")&& (values.pregunta12 == "si" || values.pregunta12=="no") 
    && (values.pregunta13 == "si" || values.pregunta13=="no")&& (values.pregunta14 == "si" || values.pregunta14=="no")){
        
      const correo = localStorage.getItem('correoATS')
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

              DialogUtility.alert({
                animationSettings: { effect: 'Zoom' },           
                content: "Su Encuesta ATS, ha finalizado gracias por su colaboracion!",
                title: 'Aviso!',
                position: "fixed",
            })
            localStorage.removeItem('correoATS')
            localStorage.removeItem('nombreUsuario')
            localStorage.removeItem('ApellidoPUsuario')
            localStorage.removeItem('ApellidoMUsuario')
            this.props.history.push("/inicio")
            })
            .catch(err=>{
              console.log("err" , err)
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
        <MDBContainer>
          <Navbar></Navbar>
        </MDBContainer>
        
      <div style={{marginTop:30}}>
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
                  <td><MDBBadge color="ligth"style={{ fontSize:14 }}><strong>SI</strong></MDBBadge></td>
                  <td><MDBBadge color="ligth"style={{ fontSize:14 }}><strong>NO</strong></MDBBadge></td>

                  </MDBTableHead>
                  <MDBTableBody>
                  
                    <tr>
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>10.- ¿Ha tenido usted dificultades para dormir?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta10" component={Radio} type="radio" value="no"/>} /></td>
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>11.-¿Ha estado particularmente irritable o le han dado arranques de coraje?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta11" component={Radio} type="radio" value="no"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>12.-¿Ha tenido dificultad para concentrarse?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta12" component={Radio} type="radio" value="no"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>13.-¿Ha estado nervioso o constantemente en alerta?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta13" component={Radio} type="radio" value="no"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>14.-¿Se ha sobresaltado fácilmente por cualquier cosa?</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="si"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta14" component={Radio} type="radio" value="no"/>} /></td>
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

{/* 
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

                </Modal> */}
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
