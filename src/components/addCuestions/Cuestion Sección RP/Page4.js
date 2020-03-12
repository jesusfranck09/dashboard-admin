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
    if (!values.pregunta18) {
      errors.pregunta18 = 'Este campo es requerido';
    }
    if (!values.pregunta19) {
      errors.pregunta19 = 'Este campo es requerido';
    }
    if (!values.pregunta20) {
      errors.pregunta20 = 'Este campo es requerido';
    }
    if (!values.pregunta21) {
      errors.pregunta21 = 'Este campo es requerido';
    }
    if (!values.pregunta22) {
      errors.pregunta22 = 'Este campo es requerido';
    }
    return errors;
  };

  evaluar= (values) => {

    if( (values.pregunta18 == "Siempre" || values.pregunta18=="CasiSiempre"|| values.pregunta18=="AlgunasVeces"|| values.pregunta18=="CasiNunca"|| values.pregunta18=="Nunca") 
    &&(values.pregunta19 == "Siempre" || values.pregunta19=="CasiSiempre"|| values.pregunta19=="AlgunasVeces"|| values.pregunta19=="CasiNunca"|| values.pregunta19=="Nunca") 
    && (values.pregunta20 == "Siempre" || values.pregunta20=="CasiSiempre"|| values.pregunta20=="AlgunasVeces"|| values.pregunta20=="CasiNunca"|| values.pregunta20=="Nunca")
    && (values.pregunta21 == "Siempre" || values.pregunta21=="CasiSiempre"|| values.pregunta21=="AlgunasVeces"|| values.pregunta21=="CasiNunca"|| values.pregunta21=="Nunca")
    && (values.pregunta22 == "Siempre" || values.pregunta22=="CasiSiempre"|| values.pregunta22=="AlgunasVeces"|| values.pregunta22=="CasiNunca"|| values.pregunta22=="Nunca")
    ){
      let pregunta18;
      let pregunta19;
      let pregunta20;
      let pregunta21;
      let pregunta22;

      if(values.pregunta18=="Siempre"){
        pregunta18=0
      }else if(values.pregunta18=="CasiSiempre"){
        pregunta18=1
      }else if(values.pregunta18=="AlgunasVeces"){
        pregunta18=2
      }else if(values.pregunta18=="CasiNunca"){
        pregunta18=3
      }else if(values.pregunta18=="Nunca"){
        pregunta18=4
      }
      if(values.pregunta19=="Siempre"){
        pregunta19=0
      }else if(values.pregunta19=="CasiSiempre"){
        pregunta19=1
      }else if(values.pregunta19=="AlgunasVeces"){
        pregunta19=2
      }else if(values.pregunta19=="CasiNunca"){
        pregunta19=3
      }else if(values.pregunta19=="Nunca"){
        pregunta19=4
      }
      if(values.pregunta20=="Siempre"){
        pregunta20=0
      }else if(values.pregunta20=="CasiSiempre"){
        pregunta20=1
      }else if(values.pregunta20=="AlgunasVeces"){
        pregunta20=2
      }else if(values.pregunta20=="CasiNunca"){
        pregunta20=3
      }else if(values.pregunta20=="Nunca"){
        pregunta20=4
      }
      if(values.pregunta21=="Siempre"){
        pregunta21=0
      }else if(values.pregunta21=="CasiSiempre"){
        pregunta21=1
      }else if(values.pregunta21=="AlgunasVeces"){
        pregunta21=2
      }else if(values.pregunta21=="CasiNunca"){
        pregunta21=3
      }else if(values.pregunta21=="Nunca"){
        pregunta21=4
      }
      if(values.pregunta22=="Siempre"){
        pregunta22=0
      }else if(values.pregunta22=="CasiSiempre"){
        pregunta22=1
      }else if(values.pregunta22=="AlgunasVeces"){
        pregunta22=2
      }else if(values.pregunta22=="CasiNunca"){
        pregunta22=3
      }else if(values.pregunta22=="Nunca"){
        pregunta22=4
      }
      
      
      
      const correo = localStorage.getItem('correoRP')
      const periodo = localStorage.getItem("Periodo")
      // const url = 'http://localhost:8000/graphql'
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
         mutation{
          rpPage4(data:"${[values.pregunta18,values.pregunta19,values.pregunta20,values.pregunta21,values.pregunta22,correo,periodo,pregunta18,pregunta19,pregunta20,pregunta21,pregunta22]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            }); 

        this.props.history.push("./RPpage5")
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
            <Paper style={{ padding: 16 }}><Alert color="dark">IV. Las decisiones que puede tomar en su trabajo.</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>18.- Mi trabajo permite que desarrolle nuevas habilidades.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta18" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta18" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta18" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta18" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta18" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>19.- En mi trabajo puedo aspirar a un mejor puesto.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta19" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta19" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta19" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta19" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta19" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>20.- Durante mi jornada de trabajo puedo tomar pausas cuando las necesito.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta20" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta20" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta20" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta20" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta20" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>21.- Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta21" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta21" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta21" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta21" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta21" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>22.- Puedo cambiar el orden de las actividades que realizo en mi trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta22" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta22" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta22" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta22" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta22" component={Radio} type="radio" value="Nunca"/>} /></td>
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
