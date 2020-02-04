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
    if (!values.pregunta47) {
      errors.pregunta47 = 'Este campo es requerido';
    }
    if (!values.pregunta48) {
      errors.pregunta48 = 'Este campo es requerido';
    }
    if (!values.pregunta49) {
      errors.pregunta49 = 'Este campo es requerido';
    }
    if (!values.pregunta50) {
      errors.pregunta50 = 'Este campo es requerido';
    }
    if (!values.pregunta51) {
      errors.pregunta51 = 'Este campo es requerido';
    }
    if (!values.pregunta52) {
      errors.pregunta52 = 'Este campo es requerido';
    }
    if (!values.pregunta53) {
      errors.pregunta53 = 'Este campo es requerido';
    }

    if (!values.pregunta54) {
      errors.pregunta54 = 'Required';
    }
    if (!values.pregunta55) {
      errors.pregunta55 = 'Este campo es requerido';
    }

    if (!values.pregunta56) {
      errors.pregunta56 = 'Required';
    }

    return errors;
  };

  evaluar= (values) => {

    if( (values.pregunta47 == "Siempre" || values.pregunta47=="CasiSiempre"|| values.pregunta47=="AlgunasVeces"|| values.pregunta47=="CasiNunca"|| values.pregunta47=="Nunca") 
    && (values.pregunta48 == "Siempre" || values.pregunta48=="CasiSiempre"|| values.pregunta48=="AlgunasVeces"|| values.pregunta48=="CasiNunca"|| values.pregunta48=="Nunca") 
    && (values.pregunta49 == "Siempre" || values.pregunta49=="CasiSiempre"|| values.pregunta49=="AlgunasVeces"|| values.pregunta49=="CasiNunca"|| values.pregunta49=="Nunca")
    && (values.pregunta50 == "Siempre" || values.pregunta50=="CasiSiempre"|| values.pregunta30=="AlgunasVeces"|| values.pregunta50=="CasiNunca"|| values.pregunta50=="Nunca")
    && (values.pregunta51 == "Siempre" || values.pregunta51=="CasiSiempre"|| values.pregunta51=="AlgunasVeces"|| values.pregunta51=="CasiNunca"|| values.pregunta51=="Nunca")
    && (values.pregunta52 == "Siempre" || values.pregunta52=="CasiSiempre"|| values.pregunta52=="AlgunasVeces"|| values.pregunta52=="CasiNunca"|| values.pregunta52=="Nunca")
    && (values.pregunta53 == "Siempre" || values.pregunta53=="CasiSiempre"|| values.pregunta53=="AlgunasVeces"|| values.pregunta53=="CasiNunca"|| values.pregunta53=="Nunca")
    && (values.pregunta54 == "Siempre" || values.pregunta54=="CasiSiempre"|| values.pregunta54=="AlgunasVeces"|| values.pregunta54=="CasiNunca"|| values.pregunta54=="Nunca")
    && (values.pregunta55 == "Siempre" || values.pregunta55=="CasiSiempre"|| values.pregunta55=="AlgunasVeces"|| values.pregunta55=="CasiNunca"|| values.pregunta55=="Nunca")
    && (values.pregunta56 == "Siempre" || values.pregunta56=="CasiSiempre"|| values.pregunta56=="AlgunasVeces"|| values.pregunta56=="CasiNunca"|| values.pregunta56=="Nunca")

    ){

      const correo   = localStorage.getItem("correoEEO")
    
      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          eeoPage11(data:"${[values.pregunta47,values.pregunta48,values.pregunta49,values.pregunta50,values.pregunta51,values.pregunta52,values.pregunta53,values.pregunta54,values.pregunta55,values.pregunta56,correo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            }); 

        this.props.history.push("./EEOpage12")
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
            <Paper style={{ padding: 16 }}><Alert color="dark">XI. Información que recibe sobre su rendimiento en el trabajo, el reconocimiento, el sentido de pertenencia y la estabilidad que le ofrece su trabajo.</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>47.- Me informan sobre lo que hago bien en mi trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta47" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta47" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta47" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta47" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta47" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>48.- La forma como evalúan mi trabajo en mi centro de trabajo me ayuda a mejorar mi desempeño</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta48" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta48" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta48" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta48" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta48" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>49.-En mi centro de trabajo me pagan a tiempo mi salario</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta49" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta49" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta49" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta49" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta49" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>50.-El pago que recibo es el que merezco por el trabajo que realizo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta50" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta50" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta50" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta50" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta50" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>51.- Si obtengo los resultados esperados en mi trabajo me recompensan o reconocen</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta51" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta51" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta51" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta51" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta51" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>52.- Las personas que hacen bien el trabajo pueden crecer laboralmente</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta52" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta52" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta52" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta52" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta52" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>53.- Considero que mi trabajo es estable</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta53" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta53" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta53" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta53" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta53" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>54.- En mi trabajo existe continua rotación de personal</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta54" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta54" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta54" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta54" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta54" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>55.- Siento orgullo de laborar en este centro de trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta55" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta55" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta55" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta55" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta55" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr>
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>56.- Me siento comprometido con mi trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta56" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta56" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta56" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta56" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta56" component={Radio} type="radio" value="Nunca"/>} /></td>
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


                  alert(vari)

                  };
                  export default Home;
