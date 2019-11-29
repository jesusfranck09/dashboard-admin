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

    if( (values.pregunta42 == "Siempre" || values.pregunta42=="CasiSiempre"|| values.pregunta42=="AlgunasVeces"|| values.pregunta42=="CasiNunca"|| values.pregunta42=="Nunca") 
    && (values.pregunta43 == "Siempre" || values.pregunta43=="CasiSiempre"|| values.pregunta43=="AlgunasVeces"|| values.pregunta43=="CasiNunca"|| values.pregunta43=="Nunca") 
    && (values.pregunta44 == "Siempre" || values.pregunta44=="CasiSiempre"|| values.pregunta44=="AlgunasVeces"|| values.pregunta44=="CasiNunca"|| values.pregunta44=="Nunca")
    && (values.pregunta45 == "Siempre" || values.pregunta45=="CasiSiempre"|| values.pregunta45=="AlgunasVeces"|| values.pregunta45=="CasiNunca"|| values.pregunta45=="Nunca")
    && (values.pregunta46 == "Siempre" || values.pregunta46=="CasiSiempre"|| values.pregunta46=="AlgunasVeces"|| values.pregunta46=="CasiNunca"|| values.pregunta46=="Nunca")

    ){

      const correo   = localStorage.getItem("correo")
    
      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          eeoPage10(data:"${[values.pregunta42,values.pregunta43,values.pregunta44,values.pregunta45,values.pregunta46,correo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            }); 

        this.props.history.push("./EEOpage11")
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
            <Paper style={{ padding: 16 }}><Alert color="dark">X. Relaciones con sus compañeros.</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>42.- Puedo confiar en mis compañeros de trabajo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta42" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta42" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta42" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta42" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta42" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>43.- Entre compañeros solucionamos los problemas de trabajo de forma respetuosa</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta43" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta43" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta43" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta43" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta43" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>44.-En mi trabajo me hacen sentir parte del grupo</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta44" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta44" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta44" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta44" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta44" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>45.- Cuando tenemos que realizar trabajo de equipo los compañeros colaboran</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta45" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta45" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta45" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta45" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta45" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>46.-Mis compañeros de trabajo me ayudan cuando tengo dificultades</FormLabel></td> 
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
