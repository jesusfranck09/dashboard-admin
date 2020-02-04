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
    if (!values.pregunta28) {
      errors.pregunta28 = 'Este campo es requerido';
    }
    if (!values.pregunta29){
      errors.pregunta29 = 'Este campo es requerido';
    }
    if (!values.pregunta30) {
      errors.pregunta30 = 'Este campo es requerido';
    }
    if (!values.pregunta31) {
      errors.pregunta31 = 'Este campo es requerido';
    }
    if (!values.pregunta32) {
      errors.pregunta32 = 'Este campo es requerido';
    }
    if (!values.pregunta33) {
      errors.pregunta33 = 'Este campo es requerido';
    }
    if (!values.pregunta34) {
      errors.pregunta34 = 'Este campo es requerido';
    }

    if (!values.pregunta35) {
      errors.pregunta35= 'Required';
    }
    if (!values.pregunta36) {
      errors.pregunta36 = 'Este campo es requerido';
    }
    if (!values.pregunta37) {
      errors.pregunta37 = 'Este campo es requerido';
    }
    if (!values.pregunta38) {
      errors.pregunta38 = 'Este campo es requerido';
    }
    if (!values.pregunta39) {
      errors.pregunta39 = 'Este campo es requerido';
    }
    if (!values.pregunta40) {
      errors.pregunta40 = 'Este campo es requerido';
    }
    return errors;
  };

  evaluar= (values) => {
    console.log("vslues" , values)
    if( (values.pregunta28 == "Siempre" || values.pregunta28=="CasiSiempre"|| values.pregunta28=="AlgunasVeces"|| values.pregunt28=="CasiNunca"|| values.pregunta28=="Nunca") 
    || (values.pregunta29 == "Siempre" || values.pregunta29=="CasiSiempre"|| values.pregunta29=="AlgunasVeces"|| values.pregunta29=="CasiNunca"|| values.pregunta29=="Nunca") 
    || (values.pregunta30 == "Siempre" || values.pregunta30=="CasiSiempre"|| values.pregunta30=="AlgunasVeces"|| values.pregunta30=="CasiNunca"|| values.pregunta30=="Nunca")
    || (values.pregunta31 == "Siempre" || values.pregunta31=="CasiSiempre"|| values.pregunta31=="AlgunasVeces"|| values.pregunta31=="CasiNunca"|| values.pregunta31=="Nunca")
    || (values.pregunta32 == "Siempre" || values.pregunta32=="CasiSiempre"|| values.pregunta32=="AlgunasVeces"|| values.pregunta32=="CasiNunca"|| values.pregunta32=="Nunca")
    || (values.pregunta33 == "Siempre" || values.pregunta33=="CasiSiempre"|| values.pregunta33=="AlgunasVeces"|| values.pregunta33=="CasiNunca"|| values.pregunta33=="Nunca")
    || (values.pregunta34 == "Siempre" || values.pregunta34=="CasiSiempre"|| values.pregunta34=="AlgunasVeces"|| values.pregunta34=="CasiNunca"|| values.pregunta34=="Nunca")
    || (values.pregunta35 == "Siempre" || values.pregunta35=="CasiSiempre"|| values.pregunta35=="AlgunasVeces"|| values.pregunta35=="CasiNunca"|| values.pregunta35=="Nunca")
    || (values.pregunta36 == "Siempre" || values.pregunta36=="CasiSiempre"|| values.pregunta36=="AlgunasVeces"|| values.pregunta36=="CasiNunca"|| values.pregunta36=="Nunca")
    || (values.pregunta37 == "Siempre" || values.pregunta37=="CasiSiempre"|| values.pregunta37=="AlgunasVeces"|| values.pregunta37=="CasiNunca"|| values.pregunta37=="Nunca")
    || (values.pregunta38 == "Siempre" || values.pregunta38=="CasiSiempre"|| values.pregunta38=="AlgunasVeces"|| values.pregunta38=="CasiNunca"|| values.pregunta38=="Nunca")
    || (values.pregunta39 == "Siempre" || values.pregunta39=="CasiSiempre"|| values.pregunta39=="AlgunasVeces"|| values.pregunta39=="CasiNunca"|| values.pregunta39=="Nunca")
    || (values.pregunta40 == "Siempre" || values.pregunta40=="CasiSiempre"|| values.pregunta40=="AlgunasVeces"|| values.pregunta40=="CasiNunca"|| values.pregunta40=="Nunca")

    ){
      console.log("vslues" , values)

      const correo = localStorage.getItem('correoRP')

      const url = 'http://localhost:8000/graphql'
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
         mutation{
          rpPage6(data:"${[values.pregunta28,values.pregunta29,values.pregunta30,values.pregunta31,values.pregunta32,values.pregunta33,values.pregunta34,values.pregunta35,values.pregunta36,values.pregunta37,values.pregunta38,values.pregunta39,values.pregunta40,correo]}"){
              message
                }
              }
            `
        }
            }).then((datos) => {
              console.log("los datos son ",datos)
              this.props.history.push("./RPValidate7")
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
            <Paper style={{ padding: 16 }}><Alert color="dark">VI. Las relaciones con sus compañeros de trabajo y su jefe.</Alert>
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
                    
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>28.- Mi jefe tiene en cuenta mis puntos de vista y opiniones.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta28" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta28" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta28" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta28" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta28" component={Radio} type="radio" value="Nunca"/>} /></td>
                 
                    </tr>
                   
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>29.- Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta29" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta29" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta29" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta29" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta29" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>30.- Puedo confiar en mis compañeros de trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta30" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta30" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta30" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta30" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta30" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>31.- Cuando tenemos que realizar trabajo de equipo los compañeros colaboran.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta31" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta31" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta31" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta31" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta31" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>32.- Mis compañeros de trabajo me ayudan cuando tengo dificultades.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta32" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta32" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta32" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta32" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta32" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>33.- En mi trabajo puedo expresarme libremente sin interrupciones.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta33" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta33" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta33" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta33" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta33" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>34.- Recibo críticas constantes a mi persona y/o trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta34" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta34" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta34" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta34" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta34" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>35.- Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta35" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta35" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta35" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta35" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta35" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>36.- Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta36" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta36" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta36" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta36" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta36" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>37.- Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta37" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta37" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta37" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta37" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta37" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>38.- Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta38" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta38" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta38" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta38" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta38" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>39.- Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta39" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta39" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta39" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta39" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta39" component={Radio} type="radio" value="Nunca"/>} /></td>
                    </tr> 
                    <tr>
                      <td> <FormLabel  style={{ fontSize:2 }} component="legend" className="text-left " style={{ marginRight:200}}>40.- He presenciado actos de violencia en mi centro de trabajo.</FormLabel></td> 
                      <td> <FormControlLabel  control={<Field required name="pregunta40" component={Radio} type="radio" value="Siempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta40" component={Radio} type="radio" value="CasiSiempre"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta40" component={Radio} type="radio" value="AlgunasVeces"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta40" component={Radio} type="radio" value="CasiNunca"/>} /></td>
                      <td> <FormControlLabel  control={<Field required name="pregunta40" component={Radio} type="radio" value="Nunca"/>} /></td>
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
