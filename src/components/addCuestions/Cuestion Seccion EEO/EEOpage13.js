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
import { API} from '../../utils/http'

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
    if (!values.pregunta65) {
      errors.pregunta65 = 'Este campo es requerido';
    }
    if (!values.pregunta66) {
      errors.pregunta66 = 'Este campo es requerido';
    }
    if (!values.pregunta67) {
      errors.pregunta67 = 'Este campo es requerido';
    }
    if (!values.pregunta68) {
      errors.pregunta68 = 'Este campo es requerido';
    }
  }
   
  evaluar= (values) => {

    if( (values.pregunta65 == "Siempre" || values.pregunta65=="CasiSiempre"|| values.pregunta65=="AlgunasVeces"|| values.pregunta65=="CasiNunca"|| values.pregunta65=="Nunca") 
    && (values.pregunta66 == "Siempre" || values.pregunta66=="CasiSiempre"|| values.pregunta66=="AlgunasVeces"|| values.pregunta66=="CasiNunca"|| values.pregunta66=="Nunca") 
    && (values.pregunta67 == "Siempre" || values.pregunta67=="CasiSiempre"|| values.pregunta67=="AlgunasVeces"|| values.pregunta67=="CasiNunca"|| values.pregunta67=="Nunca")
    && (values.pregunta68 == "Siempre" || values.pregunta68=="CasiSiempre"|| values.pregunta68=="AlgunasVeces"|| values.pregunta68=="CasiNunca"|| values.pregunta68=="Nunca")

    ){
      let pregunta65;
      let pregunta66;
      let pregunta67;
      let pregunta68;
      
      if(values.pregunta65=="Siempre"){
        pregunta65=4
      }else if(values.pregunta65=="CasiSiempre"){
        pregunta65=3
      }else if(values.pregunta65=="AlgunasVeces"){
        pregunta65=2
      }else if(values.pregunta65=="CasiNunca"){
        pregunta65=1
      }else if(values.pregunta65=="Nunca"){
        pregunta65=0
      }
      if(values.pregunta66=="Siempre"){
        pregunta66=4
      }else if(values.pregunta66=="CasiSiempre"){
        pregunta66=3
      }else if(values.pregunta66=="AlgunasVeces"){
        pregunta66=2
      }else if(values.pregunta66=="CasiNunca"){
        pregunta66=1
      }else if(values.pregunta66=="Nunca"){
        pregunta66=0
      }
      if(values.pregunta67=="Siempre"){
        pregunta67=4
      }else if(values.pregunta67=="CasiSiempre"){
        pregunta67=3
      }else if(values.pregunta67=="AlgunasVeces"){
        pregunta67=2
      }else if(values.pregunta67=="CasiNunca"){
        pregunta67=1
      }else if(values.pregunta67=="Nunca"){
        pregunta67=0
      }
      if(values.pregunta68=="Siempre"){
        pregunta68=4
      }else if(values.pregunta68=="CasiSiempre"){
        pregunta68=3
      }else if(values.pregunta68=="AlgunasVeces"){
        pregunta68=2
      }else if(values.pregunta68=="CasiNunca"){
        pregunta68=1
      }else if(values.pregunta68=="Nunca"){
        pregunta68=0
      }
      const correo   = localStorage.getItem("correoEEO")
      const periodo = localStorage.getItem("Periodo")
      // const url = 'http://localhost:8000/graphql'
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
         mutation{
          eeoPage13(data:"${[values.pregunta65,values.pregunta66,values.pregunta67,values.pregunta68,correo,periodo,pregunta65,pregunta66,pregunta67,pregunta68]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
              this.props.history.push("./EEOpage14")
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
            <Paper style={{ padding: 16 }}><Alert color="dark">XIII. Atención a clientes y usuarios.</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>65.-Atiendo clientes o usuarios muy enojados</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta65" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta65" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta65" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta65" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta65" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>66.- Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta66" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta66" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta66" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta66" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta66" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>67.- Para hacer mi trabajo debo demostrar sentimientos distintos a los míos</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta67" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta67" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta67" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta67" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta67" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>68.- Mi trabajo me exige atender situaciones de violencia</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta68" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta68" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta68" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta68" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta68" component={Radio} type="radio" value="Nunca"/>} /></td>
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
                  const vari = JSON.stringify(values,1,2)  };
                  export default Home;
