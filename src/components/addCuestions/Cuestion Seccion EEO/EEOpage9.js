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



  evaluar= (values) => {

    if( (values.pregunta37 == "Siempre" || values.pregunta37=="CasiSiempre"|| values.pregunta37=="AlgunasVeces"|| values.pregunta37=="CasiNunca"|| values.pregunta37=="Nunca") 
    && (values.pregunta38 == "Siempre" || values.pregunta38=="CasiSiempre"|| values.pregunta38=="AlgunasVeces"|| values.pregunta38=="CasiNunca"|| values.pregunta39=="Nunca") 
    && (values.pregunta39 == "Siempre" || values.pregunta39=="CasiSiempre"|| values.pregunta39=="AlgunasVeces"|| values.pregunta39=="CasiNunca"|| values.pregunta39=="Nunca")
    && (values.pregunta40 == "Siempre" || values.pregunta40=="CasiSiempre"|| values.pregunta40=="AlgunasVeces"|| values.pregunta40=="CasiNunca"|| values.pregunta40=="Nunca") 
    && (values.pregunta41 == "Siempre" || values.pregunta41=="CasiSiempre"|| values.pregunta41=="AlgunasVeces"|| values.pregunta41=="CasiNunca"|| values.pregunta41=="Nunca")
   
    ){
        this.props.history.push("./EEOpage10")
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
      <MDBContainer style={container} className="text-center  ">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección EEO<br></br>  INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">IX. Jefes con quien tiene contacto.	Mi jefe me comunica a tiempo la información relacionada con el trabajo	Activo							</Alert>
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
                    
                    <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>37.- Mi jefe me comunica a tiempo la información relacionada con el trabajo</FormLabel></td> 
                    <td> <FormControlLabel  control={<Field required name="pregunta37" component={Radio} type="radio" value="Siempre"/>} /></td>
                    <td> <FormControlLabel  control={<Field required name="pregunta37" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                    <td> <FormControlLabel  control={<Field required name="pregunta37" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                    <td> <FormControlLabel  control={<Field required name="pregunta37" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                    <td> <FormControlLabel  control={<Field required name="pregunta37" component={Radio} type="radio" value="Nunca"/>} /></td>
               
                  </tr>
                  <tr>
                    
                    <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>38.-Mi jefe ayuda a organizar mejor el trabajo</FormLabel></td> 
                    <td> <FormControlLabel  control={<Field required name="pregunta38" component={Radio} type="radio" value="Siempre"/>} /></td>
                    <td> <FormControlLabel  control={<Field required name="pregunta38" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                    <td> <FormControlLabel  control={<Field required name="pregunta38" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                    <td> <FormControlLabel  control={<Field required name="pregunta38" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                    <td> <FormControlLabel  control={<Field required name="pregunta38" component={Radio} type="radio" value="Nunca"/>} /></td>
               
                  </tr>
                  
                    <tr>
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>39.-Mi jefe tiene en cuenta mis puntos de vista y opiniones</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta39" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta39" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta39" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta39" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta39" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>40.- La orientación que me da mi jefe me ayuda a realizar mejor mi trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta40" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta40" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta40" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta40" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta40" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-center " style={{ marginRight:200}}>41.-Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta41" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta41" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta41" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta41" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta41" component={Radio} type="radio" value="Nunca"/>} /></td>
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
      </React.Fragment>





    );


    
  }
}

                  function onSubmit (values) {
                  const vari = JSON.stringify(values,1,2)


                  alert(vari)

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
