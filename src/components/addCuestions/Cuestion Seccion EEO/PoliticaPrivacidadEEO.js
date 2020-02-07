import React from 'react';
import { Form, Field } from 'react-final-form';
import {
  Paper,
  Grid,
  Button,
  FormGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { TextField, Radio } from 'final-form-material-ui';
import { Alert } from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { DialogUtility } from '@syncfusion/ej2-popups';

import axios from 'axios';

import { MDBContainer, MDBCardBody, MDBCard,MDBCardHeader} from 'mdbreact';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
 function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          VER POLITICA DE PRIVACIDAD 
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"POLITICA DE PRIVACIDAD DE DATOS PERSONALES"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            Política de Privacidad
Alfa Diseño de Sistemas te informa sobre su Política de Privacidad respecto del tratamiento y protección de los datos de carácter personal de los usuarios y clientes que puedan ser recabados por la navegación o contratación de servicios a través del sitio Web Sitio web.
En este sentido, el Titular garantiza el cumplimiento de la normativa vigente en materia de protección de datos personales, reflejada en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y de Garantía de Derechos Digitales (LOPD GDD). Cumple también con el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas (RGPD).
El uso de sitio Web implica la aceptación de esta Política de Privacidad así como las condiciones incluidas en el Aviso Legal.
</DialogContentText>
<DialogContentText id="alert-dialog-slide-description">
Identidad del responsable
Titular: ALFA DISEÑO DE SISTEMAS
Domicilio: AVENIDA CHAPULTEPEC 473 COLONIA BENITO JUAREZ
Correo electrónico: ADS.COM.MX
Sitio Web: DIRECCIÓN-WEB
</DialogContentText>
Principios aplicados en el tratamiento de datos
En el tratamiento de tus datos personales, el Titular aplicará los siguientes principios que se ajustan a las exigencias del nuevo reglamento europeo de protección de datos:
Principio de licitud, lealtad y transparencia: El Titular siempre requerirá el consentimiento para el tratamiento de tus datos personales que puede ser para uno o varios fines específicos sobre los que te informará previamente con absoluta transparencia.
Principio de minimización de datos: El Titular te solicitará solo los datos estrictamente necesarios para el fin o los fines que los solicita.
Principio de limitación del plazo de conservación: Los datos se mantendrán durante el tiempo estrictamente necesario para el fin o los fines del tratamiento.
El Titular te informará del plazo de conservación correspondiente según la finalidad. En el caso de suscripciones, el Titular revisará periódicamente las listas y eliminará aquellos registros inactivos durante un tiempo considerable.
Principio de integridad y confidencialidad: Tus datos serán tratados de tal manera que su seguridad, confidencialidad e integridad esté garantizada.
Debes saber que el Titular toma las precauciones necesarias para evitar el acceso no autorizado o uso indebido de los datos de sus usuarios por parte de terceros.
<DialogContentText id="alert-dialog-slide-description">
Tus derechos
El Titular te informa que sobre tus datos personales tienes derecho a:
Solicitar el acceso a los datos almacenados.
Solicitar una rectificación o la cancelación.
Solicitar la limitación de su tratamiento.
Oponerte al tratamiento.
</DialogContentText>
Solicitar la portabilidad de tus datos.
El ejercicio de estos derechos es personal y por tanto debe ser ejercido directamente por el interesado, solicitándolo directamente al Titular, lo que significa que cualquier cliente, suscriptor o colaborador que haya facilitado sus datos en algún momento puede dirigirse al Titular y pedir información sobre los datos que tiene almacenados y cómo los ha obtenido, solicitar la rectificación de los mismos, solicitar la portabilidad de sus datos personales, oponerse al tratamiento, limitar su uso o solicitar la cancelación de esos datos en los ficheros del Titular.
Para ejercitar tus derechos de acceso, rectificación, cancelación, portabilidad y oposición tienes que enviar un correo electrónico a ADS.COM.MX junto con la prueba válida en derecho como una fotocopia del D.N.I. o equivalente.
Tienes derecho a la tutela judicial efectiva y a presentar una reclamación ante la autoridad de control, en este caso, la Agencia Española de Protección de Datos, si consideras que el tratamiento de datos personales que te conciernen infringe el Reglamento.
<DialogContentText id="alert-dialog-slide-description">
Seguridad de los datos personales
Para proteger tus datos personales, el Titular toma todas las precauciones razonables y sigue las mejores prácticas de la industria para evitar su pérdida, mal uso, acceso indebido,
Legitimación para el tratamiento de datos
La base legal para el tratamiento de tus datos es: el consentimiento.
Para contactar con el Titular, suscribirte a un boletín o realizar comentarios en este sitio Web tienes que aceptar la presente Política de Privacidad.
Categorías de datos personales
Las categorías de datos personales que trata el Titular son:
Datos identificativos.

</DialogContentText>
Conservación de datos personales
Los datos personales que proporciones al Titular se conservarán hasta que solicites su supresión.
Navegación Web
<DialogContentText id="alert-dialog-slide-description">
Al navegar por SITIO WEB se pueden recoger datos no identificativos, que pueden incluir, la dirección IP, geolocalización, un registro de cómo se utilizan los servicios y sitios, hábitos de navegación y otros datos que no pueden ser utilizados para identificarte.
Exactitud y veracidad de los datos personales
Te comprometes a que los datos facilitados al Titular sean correctos, completos, exactos y vigentes, así como a mantenerlos debidamente actualizados.
Como Usuario del sitio Web eres el único responsable de la veracidad y corrección de los datos que remitas al sitio exonerando a el Titular de cualquier responsabilidad al respecto.
Aceptación y consentimiento
Como Usuario del sitio Web declaras haber sido informado de las condiciones sobre protección de datos de carácter personal, aceptas y consientes el tratamiento de los mismos por parte de el Titular en la forma y para las finalidades indicadas en esta Política de Privacidad.
Revocabilidad
<br/>
Para ejercitar tus derechos de acceso, rectificación, cancelación, portabilidad y oposición tienes que enviar un correo electrónico a CORREO ELECTRÓNICO junto con la prueba válida en derecho como una fotocopia del D.N.I. o equivalente.
El ejercicio de tus derechos no incluye ningún dato que el Titular esté obligado a conservar con fines administrativos, legales o de seguridad.
Cambios en la Política de Privacidad
El Titular se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas de la industria.
Estas políticas estarán vigentes hasta que sean modificadas por otras debidamente publicadas.


            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
           
          </DialogActions>
        </Dialog>
      </div>
    );
  }


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  evaluar= (values) => {
 

if(values.stooge=="acepto" && values.correo){
  
  const correo = values.correo
  const acepto  = values.stooge
  localStorage.setItem('correoEEO', correo)

  const url = 'http://localhost:8000/graphql'

  axios({
    url:  url,
    method:'post',
    data:{
    query:`
    query{
      getEmployeesFkAdmin(data:"${[correo]}"){
       fk_administrador               
          }
        }
        `
    }
        }).then((datos) => {
        const idAdmin= datos.data.data.getEmployeesFkAdmin[0].fk_administrador
        console.log("idAdmin" , idAdmin)
          axios({
            url:  url,
            method:'post',
            data:{
            query:`
             query{
              getPeriodo(data:"${[idAdmin]}"){
                idEventos
                fk_administrador
                evento
                    }
                  }
                `
            }
          })
          .then(datos => {	
            // console.log("exito",datos.data.data.getPeriodo[0].evento)
           localStorage.setItem("Periodo" , datos.data.data.getPeriodo[0].evento)
           const periodo =localStorage.getItem("Periodo")
  axios({
    url:  url,
    method:'post',
    data:{
    query:`
     mutation{
      eeoPoliticaPrivacidad(data:"${[correo,acepto,periodo]}"){
            message
            nombre
            ApellidoP
            ApellidoM
            correo
            fk_administrador
            }
          }
        `
    }
        }).then((datos) => {
          if(datos.data.data.eeoPoliticaPrivacidad.message=="usuario incorrecto"){
            DialogUtility.alert({
              animationSettings: { effect: 'Zoom' },           
              title: 'Aviso!',
              content: `El Empleado no fue encontrado o ya resolvio su encuesta`, 
              position: "fixed",
          })
          }else{

            console.log("datos", datos.data.data.eeoPoliticaPrivacidad)
            const nombre = datos.data.data.eeoPoliticaPrivacidad.nombre
            const apellidoP = datos.data.data.eeoPoliticaPrivacidad.ApellidoP
            const apellidoM =  datos.data.data.eeoPoliticaPrivacidad.ApellidoM
            localStorage.setItem("nombreUsuario", nombre)
            localStorage.setItem("ApellidoPUsuario", apellidoP)
            localStorage.setItem("ApellidoMUsuario", apellidoM)
          
            DialogUtility.alert({
              animationSettings: { effect: 'Zoom' },           
              title: 'Notificación!',
              content: `Bienvenido a su Encuesta  ${nombre}  ${apellidoP}  ${apellidoM}`, 
             
              position: "fixed",
          })
          this.props.history.push("./EEOpage1")
          }
          }).catch((err)=>{
            console.log(err.response)
          })
          }).catch(err=>{
            console.log("error",err.response)
          })
        })
        
}

  }

  componentWillMount(){
    setTimeout(() => { this.setState({showModal:false})},1500)

    const idAdmin = localStorage.getItem("idAdmin")
    const url = 'http://localhost:8000/graphql'
    axios({
      url:  url,
      method:'post',
      data:{
      query:`
       query{
        getPeriodo(data:"${[idAdmin]}"){
          idEventos
          fk_administrador
          evento
              }
            }
          `
      }
    })
    .then(datos => {	
      console.log("exito",datos)
      this.setState({periodo:datos.data.data.getPeriodo})
    }).catch(err=>{
      console.log("error",err.response)
    })
}


  handleClick(){

  }
  render() {
    // const { children} = this.props;
    const container = { width: 2500, height: 1300 }
    return (
      <React.Fragment>
      <div>
          <header>
          </header>
        <MDBContainer style={container} className="text-center  ">
    
        <div style={{ padding: 16, margin: 'auto', maxWidth: 1050 ,marginLeft:20}}>
      {/* <CssBaseline /> */}
      <Form
        onSubmit={onSubmit}
        
        validate={validate}
        render={({ handleSubmit,values }) => (
          <form onSubmit={handleSubmit}>
           <Alert color="primary"> Política de Privacidad</Alert>
            <Paper responsive style={{ padding: 10 }}><Alert color="secondary">Los datos recolectados por la encuesta no serán difundidos dentro y fuera de la organización,los comentarios que usted anexe serán tomados en cuenta con el fin de mejorar el entorno laboral.</Alert>
            <Grid spacing={2} style={{ marginLeft:"27%" }}>
         
                    <MDBCard spacing={5} style={{marginTop:50,  width: "27rem", marginBottom:50}} >
                        <MDBCardHeader><Alert>Sección EEO</Alert></MDBCardHeader>
                        <MDBCardBody>
                            <Grid item>
                            <Grid  item style={{ marginTop: 16,marginLeft:50 }} spacing={2} item xs={9} >                          
                            <Field      
                                name="correo"
                                fullWidth
                                required
                                component={TextField}
                                type="email"
                            label="Por favor ingrese su correo electrónico"
                            />
                           
                            </Grid>
                            <FormControl component="fieldset">
                                
                                <FormGroup row>
                                    <FormControlLabel
                                    label="Acepto Terminos y Condiciones"
                                    control={
                                    <Field
                                    required
                                        name="stooge"
                                        component={Radio}
                                        type="radio"
                                        value="acepto"
                                    />
                                    }
                                />
                                </FormGroup>
                            </FormControl>
                            </Grid>
                             <AlertDialogSlide/>                          
                        </MDBCardBody>
                    </MDBCard>          
                <Grid item style={{ marginTop: 16 ,marginRight:290 , marginBottom: 80}} spacing={2} >             
                  <Button 
                   variant="contained"
                    color="secondary"
                    onClick={(e) => this.evaluar(values)}
                    type = "submit"
                  >
                    Iniciar mi Encuesta
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            {/* <pre>{JSON.stringify(values,1,2)}</pre> */}
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
};

const validate = values => {
  const errors = {};
  if (!values.correo) {
    errors.correo = 'Este campo es requerido';
  } if (!values.sauces) {
    errors.correo = 'Este campo es requerido';
  }
 

  return errors;
};

export default Home




