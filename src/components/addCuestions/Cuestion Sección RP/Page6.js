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
    if( (values.pregunta28 == "Siempre" || values.pregunta28=="CasiSiempre"|| values.pregunta28=="AlgunasVeces"|| values.pregunta28=="CasiNunca"|| values.pregunta28=="Nunca") 
    && (values.pregunta29 == "Siempre" || values.pregunta29=="CasiSiempre"|| values.pregunta29=="AlgunasVeces"|| values.pregunta29=="CasiNunca"|| values.pregunta29=="Nunca") 
    && (values.pregunta30 == "Siempre" || values.pregunta30=="CasiSiempre"|| values.pregunta30=="AlgunasVeces"|| values.pregunta30=="CasiNunca"|| values.pregunta30=="Nunca")
    && (values.pregunta31 == "Siempre" || values.pregunta31=="CasiSiempre"|| values.pregunta31=="AlgunasVeces"|| values.pregunta31=="CasiNunca"|| values.pregunta31=="Nunca")
    && (values.pregunta32 == "Siempre" || values.pregunta32=="CasiSiempre"|| values.pregunta32=="AlgunasVeces"|| values.pregunta32=="CasiNunca"|| values.pregunta32=="Nunca")
    && (values.pregunta33 == "Siempre" || values.pregunta33=="CasiSiempre"|| values.pregunta33=="AlgunasVeces"|| values.pregunta33=="CasiNunca"|| values.pregunta33=="Nunca")
    && (values.pregunta34 == "Siempre" || values.pregunta34=="CasiSiempre"|| values.pregunta34=="AlgunasVeces"|| values.pregunta34=="CasiNunca"|| values.pregunta34=="Nunca")
    && (values.pregunta35 == "Siempre" || values.pregunta35=="CasiSiempre"|| values.pregunta35=="AlgunasVeces"|| values.pregunta35=="CasiNunca"|| values.pregunta35=="Nunca")
     &&(values.pregunta36 == "Siempre" || values.pregunta36=="CasiSiempre"|| values.pregunta36=="AlgunasVeces"|| values.pregunta36=="CasiNunca"|| values.pregunta36=="Nunca")
    && (values.pregunta37 == "Siempre" || values.pregunta37=="CasiSiempre"|| values.pregunta37=="AlgunasVeces"|| values.pregunta37=="CasiNunca"|| values.pregunta37=="Nunca")
    && (values.pregunta38 == "Siempre" || values.pregunta38=="CasiSiempre"|| values.pregunta38=="AlgunasVeces"|| values.pregunta38=="CasiNunca"|| values.pregunta38=="Nunca")
    && (values.pregunta39 == "Siempre" || values.pregunta39=="CasiSiempre"|| values.pregunta39=="AlgunasVeces"|| values.pregunta39=="CasiNunca"|| values.pregunta39=="Nunca")
    &&(values.pregunta40 == "Siempre" || values.pregunta40=="CasiSiempre"|| values.pregunta40=="AlgunasVeces"|| values.pregunta40=="CasiNunca"|| values.pregunta40=="Nunca")

    ){
      console.log("vslues" , values)
      let pregunta28;
      let pregunta29;
      let pregunta30;
      let pregunta31;
      let pregunta32;
      let pregunta33;
      let pregunta34;
      let pregunta35;
      let pregunta36;
      let pregunta37;
      let pregunta38;
      let pregunta39;
      let pregunta40;

      if(values.pregunta28=="Siempre"){
        pregunta28=0
      }else if(values.pregunta28=="CasiSiempre"){
        pregunta28=1
      }else if(values.pregunta28=="AlgunasVeces"){
        pregunta28=2
      }else if(values.pregunta28=="CasiNunca"){
        pregunta28=3
      }else if(values.pregunta28=="Nunca"){
        pregunta28=4
      }
      if(values.pregunta29=="Siempre"){
        pregunta29=0
      }else if(values.pregunta29=="CasiSiempre"){
        pregunta29=1
      }else if(values.pregunta29=="AlgunasVeces"){
        pregunta29=2
      }else if(values.pregunta29=="CasiNunca"){
        pregunta29=3
      }else if(values.pregunta29=="Nunca"){
        pregunta29=4
      }
      if(values.pregunta30=="Siempre"){
        pregunta30=0
      }else if(values.pregunta30=="CasiSiempre"){
        pregunta30=1
      }else if(values.pregunta30=="AlgunasVeces"){
        pregunta30=2
      }else if(values.pregunta30=="CasiNunca"){
        pregunta30=3
      }else if(values.pregunta30=="Nunca"){
        pregunta30=4
      }
      if(values.pregunta31=="Siempre"){
        pregunta31=0
      }else if(values.pregunta31=="CasiSiempre"){
        pregunta31=1
      }else if(values.pregunta31=="AlgunasVeces"){
        pregunta31=2
      }else if(values.pregunta31=="CasiNunca"){
        pregunta31=3
      }else if(values.pregunta31=="Nunca"){
        pregunta31=4
      }
      if(values.pregunta32=="Siempre"){
        pregunta32=0
      }else if(values.pregunta32=="CasiSiempre"){
        pregunta32=1
      }else if(values.pregunta32=="AlgunasVeces"){
        pregunta32=2
      }else if(values.pregunta32=="CasiNunca"){
        pregunta32=3
      }else if(values.pregunta32=="Nunca"){
        pregunta32=4
      }
      if(values.pregunta33=="Siempre"){
        pregunta33=0
      }else if(values.pregunta33=="CasiSiempre"){
        pregunta33=1
      }else if(values.pregunta33=="AlgunasVeces"){
        pregunta33=2
      }else if(values.pregunta33=="CasiNunca"){
        pregunta33=3
      }else if(values.pregunta33=="Nunca"){
        pregunta33=4
      }
      if(values.pregunta34=="Siempre"){
        pregunta34=4
      }else if(values.pregunta34=="CasiSiempre"){
        pregunta34=3
      }else if(values.pregunta34=="AlgunasVeces"){
        pregunta34=2
      }else if(values.pregunta34=="CasiNunca"){
        pregunta34=1
      }else if(values.pregunta34=="Nunca"){
        pregunta34=0
      }
      if(values.pregunta35=="Siempre"){
        pregunta35=4
      }else if(values.pregunta35=="CasiSiempre"){
        pregunta35=3
      }else if(values.pregunta35=="AlgunasVeces"){
        pregunta35=2
      }else if(values.pregunta35=="CasiNunca"){
        pregunta35=1
      }else if(values.pregunta35=="Nunca"){
        pregunta35=0
      }
      if(values.pregunta36=="Siempre"){
        pregunta36=4
      }else if(values.pregunta36=="CasiSiempre"){
        pregunta36=3
      }else if(values.pregunta36=="AlgunasVeces"){
        pregunta36=2
      }else if(values.pregunta36=="CasiNunca"){
        pregunta36=1
      }else if(values.pregunta36=="Nunca"){
        pregunta36=0
      }
      if(values.pregunta37=="Siempre"){
        pregunta37=4
      }else if(values.pregunta37=="CasiSiempre"){
        pregunta37=3
      }else if(values.pregunta37=="AlgunasVeces"){
        pregunta37=2
      }else if(values.pregunta37=="CasiNunca"){
        pregunta37=1
      }else if(values.pregunta37=="Nunca"){
        pregunta37=0
      }
      if(values.pregunta38=="Siempre"){
        pregunta38=4
      }else if(values.pregunta38=="CasiSiempre"){
        pregunta38=3
      }else if(values.pregunta38=="AlgunasVeces"){
        pregunta38=2
      }else if(values.pregunta38=="CasiNunca"){
        pregunta38=1
      }else if(values.pregunta38=="Nunca"){
        pregunta38=0
      }
      if(values.pregunta39=="Siempre"){
        pregunta39=4
      }else if(values.pregunta39=="CasiSiempre"){
        pregunta39=3
      }else if(values.pregunta39=="AlgunasVeces"){
        pregunta39=2
      }else if(values.pregunta39=="CasiNunca"){
        pregunta39=1
      }else if(values.pregunta39=="Nunca"){
        pregunta39=0
      }
      if(values.pregunta40=="Siempre"){
        pregunta40=4
      }else if(values.pregunta40=="CasiSiempre"){
        pregunta40=3
      }else if(values.pregunta40=="AlgunasVeces"){
        pregunta40=2
      }else if(values.pregunta40=="CasiNunca"){
        pregunta40=1
      }else if(values.pregunta40=="Nunca"){
        pregunta40=0
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
          rpPage6(data:"${[values.pregunta28,values.pregunta29,values.pregunta30,values.pregunta31,values.pregunta32,values.pregunta33,values.pregunta34,values.pregunta35,values.pregunta36,values.pregunta37,values.pregunta38,values.pregunta39,values.pregunta40,correo,periodo,pregunta28,pregunta29,pregunta30,pregunta31,pregunta32,pregunta33,pregunta34,pregunta35,pregunta36,pregunta37,pregunta38,pregunta39,pregunta40]}"){
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

                  };
                  export default Home;
