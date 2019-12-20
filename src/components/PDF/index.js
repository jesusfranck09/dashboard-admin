import React, { Component } from 'react';
// import { render } from 'react-dom';
import './index.css';
import Doc from './pdfDat';
import PdfContainer from './pdf';
import axios from 'axios'
//  import ADS from '../images/foto.jpeg'
import {MDBContainer, MDBRow, MDBCol,MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import {Alert} from 'reactstrap'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: 'Resultados Según la Ponderación',
      datos:[],
      resultados:[],


    };
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      state[name] = value;
      return state;
    })
  }

  createPdf = (html) => Doc.createPdf(html);

  componentWillMount(){
    this.viewEmmployee()
  }

  
  viewEmmployee = event  =>{
    //obtener todos los empleados del administrador
        var correo  = localStorage.getItem("correo")      
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
          query{
            getUsersTableEmployees(email:"${correo}"){
              id
              nombre
              ApellidoP
              ApellidoM
              Curp
              rfc
              FechaNacimiento
              Sexo
              cp
              EstadoCivil
              correo
              AreaTrabajo
              Puesto
              Ciudad
              NivelEstudios
              TipoPersonal
              JornadaTrabajo
              TipoContratacion
              TiempoPuesto
              ExperienciaLaboral
              RotacionTurnos
              fk_administrador
                }
              }
              `
          }
              }).then((datos) => {
                // console.log("parseo" ,JSON.stringify(datos.data.data))
                // console.log("datps" ,datos.data.data.getUsersTableEmployees)
                this.setState({ datos: datos.data.data.getUsersTableEmployees});
              // console.log("este es el estado " , this.state.datos)
                                
              {this.state.datos.map(function(title,index){
                //mapeamos el estado para obtener las respuestas de cada unoo de los empleados
        console.log("title.id" ,  title.id)
                 const url = 'http://localhost:8000/graphql'
                 axios({
                   url:  url,
                   method:'post',
                   data:{
                   query:`
                    query{
                     resultSingleSurvey(data:"${[title.id]}"){
                      id 
                      Respuestas 
                      fk_preguntasATS 
                      fk_Empleados 
                      nombre 
                      ApellidoP 
                      ApellidoM 
                      Curp 
                      RFC 
                      FechaNacimiento 
                      Sexo 
                      CP 
                      EstadoCivil 
                      correo 
                      AreaTrabajo 
                      Puesto 
                      Ciudad 
                      NivelEstudios 
                      TipoPersonal 
                      JornadaTrabajo 
                      TipoContratacion 
                      TiempoPuesto 
                      ExperienciaLaboral 
                      RotacionTurnos 
                      fk_administrador 
                      fk_correos 
                           }
                         }
                       `
                   }
                       }).then(datos => {
                        //   console.log("los datos en la consulta son ",datos)
                          this.setState({ resultados: datos.data.data.resultSingleSurvey});
                          //  console.log("las respuestas de cada uno en el estado son  "  , datos.data.data.resultSingleSurvey)
                       })
                       .catch(err => {
                        console.log("el error es  ",err)
                      }); 
               })}
              })
    
              .catch((error) => {
                //console.log("errores" ,error.response.data.errors[0].message)
                // console.log(".cartch" , error.response)
            });      
             }
    
  render() {
    const container = { marginLeft:20}
    // console.log(this.state);
    return (
      <React.Fragment>
     <Alert className ="mt-4" color ="primary ">Resultados de la Aplicación de la encuesta ATS </Alert>

        <PdfContainer createPdf={this.createPdf}>
      
          <React.Fragment>

            <section className="flex-column  bg-white  pa4 "  >
            <font face="arial" className = "mt-4" >CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE FUERON SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</font>
            <font face="arial " className = "mt-4 " > {localStorage.getItem("razonsocial")}</font>
                  <MDBContainer style={container}>
                  <MDBTable responsive small borderless className="text-left mt-4 ">
         
                  <MDBTableBody>                  
                    <tr>
                    <td width="6%" >Nombre : jesus francisco francisco</td>
                    <td width="6%" >Puesto : Programador jr</td>
                    </tr>
                    <tr>
                    <td width="6%" >Departamento : Proyectos</td>
                    <td width="6%" >Genero : Masculino</td> 
                    </tr>
                    <tr>
                    <td width="6%" >Area : Proyectos</td>
                    <td width="6%" >Fecha de Aplicacion : 2019-12-12</td>   
                   
                    </tr>
                  </MDBTableBody>
              
    
                  </MDBTable>
                  </MDBContainer>
                  
                  <MDBContainer>
                  <MDBTable bordered responsive className="mt-4 text-left">
                    <MDBTableHead>
                      <tr>
                        <th></th>
                        <th>I.- Acontecimiento traumático severo</th>    
                        <td></td>   
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <td>1</td>
                        <td>¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los
                            siguientes: Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión
                            grave? Asaltos? Actos violentos que derivaron en lesiones graves? Secuestro? Amenazas?, o Cualquier otro
                            que ponga en riesgo su vida o salud, y/o la de otras personas?</td>
                        <td> </td>
                         
                      </tr>
   
                    </MDBTableBody>
                  </MDBTable> 
                  <MDBTable bordered responsive className="mt-4 text-left">
                    <MDBTableHead>
                      <tr>
                        <th></th>
                        <th>II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes):</th>       
                        <td></td> 
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <td>2</td>
                        <td>¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</td>   
                        <td></td> 
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?</td>   
                        <td></td> 
                      </tr>
                    </MDBTableBody>
                  </MDBTable> 

                  <MDBTable bordered responsive className="mt-4 text-left">
                    <MDBTableHead>
                      <tr>
                        <th></th>
                        <th>III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento (durante el último mes):</th>       
                        <td></td> 
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <td>4</td>
                        <td>¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?</td>   
                        <td></td> 
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?</td>   
                        <td></td> 
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>¿Ha tenido dificultad para recordar alguna parte importante del evento?</td>   
                        <td></td> 
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>¿Ha disminuido su interés en sus actividades cotidianas?</td>   
                        <td></td> 
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>¿Se ha sentido usted alejado o distante de los demás?</td>   
                        <td></td> 
                      </tr>
                      <tr>
                        <td>9</td>
                        <td>¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?</td>   
                        <td></td> 
                      </tr>
                     
                    </MDBTableBody>
                  </MDBTable> 


                  <MDBTable bordered responsive className="mt-4 text-left">
                    <MDBTableHead>
                      <tr>
                        <th></th>
                        <th>IV.- Afectación (durante el último mes):</th>       
                        <td></td> 
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <td>10</td>
                        <td>¿Ha tenido usted dificultades para dormir?</td>   
                        <td></td> 
                      </tr>
                      <tr>
                        <td>11</td>
                        <td>¿Ha estado particularmente irritable o le han dado arranques de coraje?</td>   
                        <td></td> 
                      </tr>
                      <tr>
                        <td>12</td>
                        <td>¿Ha tenido dificultad para concentrarse?</td>   
                        <td></td> 
                      </tr>
                      <tr>
                        <td>13</td>
                        <td>¿Ha estado nervioso o constantemente en alerta?</td>   
                        <td></td> 
                      </tr>
                      <tr>
                        <td>14</td>
                        <td>¿Se ha sobresaltado fácilmente por cualquier cosa?</td>   
                        <td></td> 
                      </tr>
                    </MDBTableBody>
                  </MDBTable> 
                  <Alert className ="mt-4" color ="primary ">INFORMACIÓN: LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
                  </MDBContainer>  

              {/* <textarea rows="20"
                placeholder="Description"
                name="description"
                value={this.state.description}
                onChange={this.onChange} /> */}
            </section>
          </React.Fragment>
        </PdfContainer>
      </React.Fragment>
    );
  }
}

export default App
