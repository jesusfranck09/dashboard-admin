import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Radio, Select } from 'final-form-material-ui';
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
import Ok from '../images/ok.png'
import payload from '../../resolvers/payload';


import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import { MDBContainer,MDBTableBody,MDBTable,MDBTableHead,MDBCollapse} from 'mdbreact';

import Modal from 'react-modal';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     data:'',
    showModal2:false

    
    };
  }

  evaluar= (values) => {
    console.log("los values son" , values)
    if(values.rotacion === 'si'){
      const correo = localStorage.getItem('correo')
      const respuesta = values.rotacion
      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          atsPage1(data:"${[respuesta,correo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            });     
         this.props.history.push("./page1")

      }
    
     if (values.rotacion === 'no') {
      const correo = localStorage.getItem('correo')
      const respuesta = values.rotacion
    
      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          atsPage1(data:"${[respuesta,correo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
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
        render={({ handleSubmit, reset, submitting, pristine,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary"> Sección ATS <br></br> INSTRUCCIONES : Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="secondary">I.- Acontecimiento traumático severo </Alert>


              <Grid container alignItems="flex-start" spacing={2} item xs={12}>
            
                    <Grid  item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup row>
                      <MDBRow>
                      <FormLabel component="legend" className="text-left mt-3 ml-4">¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los siguientes?</FormLabel>
                        <MDBCol>
                        <FormLabel component="legend" className="text-left mt-3 ml-4">1.- Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión grave?</FormLabel>
                        <FormLabel component="legend" className="text-left mt-3 ml-4">2.-¿Asaltos , Actos violentos que derivaron en lesiones graves? </FormLabel>
                        <FormLabel component="legend" className="text-left mt-3 ml-4">3.-¿Secuestro,Amenazas o Cualquier otro que ponga en riesgo su vida o salud, y/o la de otras personas?</FormLabel>
                        
                        </MDBCol>
                       
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
                                <Alert color="secondary" style={{fontSize: 24}}>Gracias por realizar su Encuesta</Alert>
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
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // await sleep(300);
const vari = JSON.stringify(values,1,2)


alert(vari)

//  const url = 'http://localhost:8000/graphql'
//   axios({
//     url:  url,
//     method:'post',
//     data:{
//     query:`
//      mutation{
//       registerSingleEmployee(data:$input){
//           message
//             }
//           }
//         `
//     }
//         }).then((datos) => {
//           console.log("los datos son ",datos)
//           alert("exito")
     
//           alert(vari)
     
        

//           // this.props.history.push("/inicio")
//         })
        
//         .catch((err) => {
//           alert("error")
    
//           alert(vari)
//           alert(vari.Nombre)
//           console.log("los datos son ",err.response)
        
//         })
// const url  = 'http://localhost:8000/graphql'
				
// 				const query =  `
// 				mutation {
// 					registerSingleEmployee(
// 						data:${vari}
// 					){
// 						message
// 					}
// 				}
// 				`;
// 				axios({
// 				url:  url,
// 				method: 'post',
// 				data: {
// 					query,
// 					variables: {
// 						data: `${vari}`
// 					}
// 				}
// 					}).then((result) => {
//             alert("exito")
     
//            alert(vari[0].Nombre)
// 					})
// 					 .catch((error) => {
//             alert("error")
//             alert(query)

// 					 console.log(".cartch" , error.response)
// 				});

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
