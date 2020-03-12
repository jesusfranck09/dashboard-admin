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
import { API} from '../../utils/http'

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
    if (!values.pregunta41) {
      errors.pregunta41 = 'Este campo es requerido';
    }
    if (!values.pregunta42) {
      errors.pregunta42 = 'Este campo es requerido';
    }
    if (!values.pregunta43) {
      errors.pregunta43 = 'Este campo es requerido';
    }
   return errors;
  };

  evaluar= (values) => {

    if( (values.pregunta41 == "Siempre" || values.pregunta41=="CasiSiempre"|| values.pregunta41=="AlgunasVeces"|| values.pregunta41=="CasiNunca"|| values.pregunta41=="Nunca") 
    && (values.pregunta42 == "Siempre" || values.pregunta42=="CasiSiempre"|| values.pregunta42=="AlgunasVeces"|| values.pregunta42=="CasiNunca"|| values.pregunta42=="Nunca") 
    && (values.pregunta43 == "Siempre" || values.pregunta43=="CasiSiempre"|| values.pregunta43=="AlgunasVeces"|| values.pregunta43=="CasiNunca"|| values.pregunta43=="Nunca")
    ){
      let pregunta41;
      let pregunta42;
      let pregunta43;
  
      if(values.pregunta41=="Siempre"){
        pregunta41=4
      }else if(values.pregunta41=="CasiSiempre"){
        pregunta41=3
      }else if(values.pregunta41=="AlgunasVeces"){
        pregunta41=2
      }else if(values.pregunta41=="CasiNunca"){
        pregunta41=1
      }else if(values.pregunta41=="Nunca"){
        pregunta41=0
      }
      if(values.pregunta42=="Siempre"){
        pregunta42=4
      }else if(values.pregunta42=="CasiSiempre"){
        pregunta42=3
      }else if(values.pregunta42=="AlgunasVeces"){
        pregunta42=2
      }else if(values.pregunta42=="CasiNunca"){
        pregunta42=1
      }else if(values.pregunta42=="Nunca"){
        pregunta42=0
      }
      if(values.pregunta43=="Siempre"){
        pregunta43=4
      }else if(values.pregunta43=="CasiSiempre"){
        pregunta43=3
      }else if(values.pregunta43=="AlgunasVeces"){
        pregunta43=2
      }else if(values.pregunta43=="CasiNunca"){
        pregunta43=1
      }else if(values.pregunta43=="Nunca"){
        pregunta43=0
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
          rpPage7(data:"${[values.pregunta41,values.pregunta42,values.pregunta43,correo,periodo,pregunta41,pregunta42,pregunta43]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            }); 


        this.props.history.push("./RPValidate8")
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
        
        validate={this.alidate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
            
           <Alert color="primary">Sección RP<br></br>  INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">VII. En mi trabajo debo brindar servicio a clientes o usuarios</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>41.- Atiendo clientes o usuarios muy enojados.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta41" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta41" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta41" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta41" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta41" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>42.- Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta42" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta42" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta42" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta42" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta42" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>43.- Para hacer mi trabajo debo demostrar sentimientos distintos a los míos.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta43" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta43" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta43" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta43" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta43" component={Radio} type="radio" value="Nunca"/>} /></td>
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
