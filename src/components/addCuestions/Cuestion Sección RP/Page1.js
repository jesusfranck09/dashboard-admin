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
import { assertValidExecutionArguments } from '../../../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/graphql/execution/execute';

 

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

    if( (values.pregunta1 == "Siempre" || values.pregunta1=="CasiSiempre"|| values.pregunta1=="AlgunasVeces"|| values.pregunta1=="CasiNunca"|| values.pregunta1=="Nunca") 
    && (values.pregunta2 == "Siempre" || values.pregunta2=="CasiSiempre"|| values.pregunta2=="AlgunasVeces"|| values.pregunta2=="CasiNunca"|| values.pregunta2=="Nunca") 
    && (values.pregunta3 == "Siempre" || values.pregunta3=="CasiSiempre"|| values.pregunta3=="AlgunasVeces"|| values.pregunta3=="CasiNunca"|| values.pregunta3=="Nunca")
    && (values.pregunta4 == "Siempre" || values.pregunta4=="CasiSiempre"|| values.pregunta4=="AlgunasVeces"|| values.pregunta4=="CasiNunca"|| values.pregunta4=="Nunca")
    && (values.pregunta5 == "Siempre" || values.pregunta5=="CasiSiempre"|| values.pregunta5=="AlgunasVeces"|| values.pregunta5=="CasiNunca"|| values.pregunta5=="Nunca")
    && (values.pregunta6 == "Siempre" || values.pregunta6=="CasiSiempre"|| values.pregunta6=="AlgunasVeces"|| values.pregunta6=="CasiNunca"|| values.pregunta6=="Nunca")
    && (values.pregunta7 == "Siempre" || values.pregunta7=="CasiSiempre"|| values.pregunta7=="AlgunasVeces"|| values.pregunta7=="CasiNunca"|| values.pregunta7=="Nunca")
    && (values.pregunta8 == "Siempre" || values.pregunta8=="CasiSiempre"|| values.pregunta8=="AlgunasVeces"|| values.pregunta8=="CasiNunca"|| values.pregunta8=="Nunca")
    && (values.pregunta9 == "Siempre" || values.pregunta9=="CasiSiempre"|| values.pregunta9=="AlgunasVeces"|| values.pregunta9=="CasiNunca"|| values.pregunta9=="Nunca")

    ){

      const correo = localStorage.getItem('correo')

      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          rpPage1(data:"${[values.pregunta1,values.pregunta2,values.pregunta3,values.pregunta4,values.pregunta5,values.pregunta6,values.pregunta7,values.pregunta8,values.pregunta9,correo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
            }); 


      this.props.history.push("./RPpage2")
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
        <MDBContainer style={container} className="text-center">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 }}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary">Sección RP<br></br>  INSTRUCCIONES: Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.</Alert>
            <Paper style={{ padding: 16 }}><Alert color="dark">I. Las condiciones de su centro de trabajo, así como la cantidad y ritmo de trabajo..</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}> 1.- Mi trabajo me exige hacer mucho esfuerzo físico.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta1" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>2.- Me preocupa sufrir un accidente en mi trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta2" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>3.- Considero que las actividades que realizo son peligrosas</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta3" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>4.- Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta4" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>5.- Por la cantidad de trabajo que tengo debo trabajar sin parar.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta5" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>6.- Considero que es necesario mantener un ritmo de trabajo acelerado.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta6" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta6" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta6" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta6" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta6" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>7.- Mi trabajo exige que esté muy concentrado.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta7" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta7" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta7" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta7" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta7" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>8.- Mi trabajo requiere que memorice mucha información.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta8" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta8" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta8" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta8" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta8" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left" style={{ marginRight:200}}>9.- Mi trabajo exige que atienda varios asuntos al mismo tiempo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta9" component={Radio} type="radio" value="Nunca"/>} /></td>
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
