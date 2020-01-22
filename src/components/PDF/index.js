import React, { Component } from 'react';
// import { render } from 'react-dom';
import './index.css';
import axios from 'axios'
//  import ADS from '../images/foto.jpeg'
import {MDBContainer, MDBRow, MDBCol,MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { PDFExport } from '@progress/kendo-react-pdf';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import {Alert} from 'reactstrap'
class App extends Component {
  pdfExportComponent;
  constructor(props) {
    super(props);
    this.state = {
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
  componentWillMount(){  
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
            this.setState({ datos: datos.data.data.getUsersTableEmployees});
           console.log("this.state.resultados" , this.state.resultados)
          })     
  }

              click(id){
              console.log("el id es " , id)
                  
                      const url = 'http://localhost:8000/graphql'
                      axios({
                        url:  url,
                        method:'post',
                        data:{
                        query:`
                          query{
                          resultSingleSurvey(data:"${[id]}"){
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
                           if(datos.data.data.resultSingleSurvey.length > 0 ){
                            this.setState({resultados :datos.data.data.resultSingleSurvey })                
                            console.log("resultados de la encuesta" , this.state.resultados[1])
                          } if(datos.data.data.resultSingleSurvey.length <= 0){
                           DialogUtility.alert({
                              animationSettings: { effect: 'Zoom' },           
                              title: "Su colaborador aun no responde la Encuesta",
                              // title: 'Aviso!',
                              position: "fixed"
                              });
                          }


                          })
                            .catch(err => {
                              console.log("el error es  ",err)
                            });  
                           
         
                    }

    
  render() {
    
    const container = { marginLeft:20}
    let pdfView1;
    let ATS;
    if(this.state.resultados.length!=0){
      if(this.state.resultados[1].Respuestas=="si"){
        ATS = <Alert className ="mt-4" color ="danger ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL  REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
       }else if(this.state.resultados[1].Respuestas=="no"){
         ATS = <Alert className ="mt-4" color ="primary ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
        }
    }

    if(this.state.resultados[2]){ 
      console.log("este es lo que contiene el estado ")
      pdfView1 = <MDBContainer > <Alert className ="mt-4" color ="primary ">Resultados de la Aplicación de la encuesta ATS </Alert>

       
        <React.Fragment>
          <section className="flex-column"  >
          <div>
                    <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                        Descargar Resultados 
                    </MDBBtn>
           </div>
           <br/>
           <PDFExport
                    scale={0.7}
                    paperSize="A4"
                    margin="2cm"
                    ref={(component) => this.pdfExportComponent = component}
                >
          <font face="arial" className = "mt-4" >CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE FUERON SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</font><br/><br/><strong>{localStorage.getItem("razonsocial")}</strong><br/>
          <font face="arial" className = "mt-4 " >  <img ref={(image) => this.image = image} src="http://www.ads.com.mx/_Media/logotipo_ads_png_med.png" width="100px"
                /></font>
                <MDBContainer style={container}>
                  
                <MDBTable component={Paper}  small borderless className="text-left mt-4 ">
       
                <MDBTableBody>                  
                  <tr>
                  <td  >Nombre : {this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM} </td>
                  <td >Puesto : {this.state.resultados[0].Puesto}</td>
                                </tr>
                                <tr>
                  <td  >Departamento : {this.state.resultados[0].AreaTrabajo}</td>
                  <td  >Genero : {this.state.resultados[0].Sexo}</td> 
                                </tr>
                                <tr>
                  <td  >Correo : {this.state.resultados[0].correo}</td>
                  <td  >RFC : {this.state.resultados[0].RFC}</td>   
                 
                  </tr>
                </MDBTableBody>
                </MDBTable>
                </MDBContainer>
                
                <MDBContainer>
                <MDBTable small borderless className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th width="10px"></th>
                      <th>I.- Acontecimiento traumático severo</th>    
                      <td width="60px"></td>   
                                           
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="10px">1</td>
                      <td >¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los
                          siguientes: Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión
                          grave? Asaltos? Actos violentos que derivaron en lesiones graves? Secuestro? Amenazas?, o Cualquier otro
                          que ponga en riesgo su vida o salud, y/o la de otras personas?</td>
                      <td width="60px">{this.state.resultados[1].Respuestas}</td>
                       
                    </tr>
                    <br/>
                  </MDBTableBody>
            
                  <MDBTableHead>
                    <tr>
                      <th width="10px"></th>
                      <th>II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes):</th>       
                      <td></td> 
                    </tr>
                    <br/>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>2</td>
                      <td>¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</td>   
                      <td >{this.state.resultados[2].Respuestas}</td> 
                    </tr>
                   
                    <tr>
                      <td>3</td>
                      <td>¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?</td>   
                      <td >{this.state.resultados[3].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>
            

              
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento (durante el último mes):</th>       
                      <td></td> 
                    </tr>
                    <br/>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>4</td>
                      <td>¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?</td>   
                      <td>{this.state.resultados[4].Respuestas}</td> 
                    </tr>
                 
                    <tr>
                      <td>5</td>
                      <td>¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?</td>   
                      <td >{this.state.resultados[5].Respuestas}</td> 
                    </tr>
                   
                    <tr>
                      <td>6</td>
                      <td>¿Ha tenido dificultad para recordar alguna parte importante del evento?</td>   
                      <td >{this.state.resultados[6].Respuestas}</td> 
                    </tr>
                    
                    <tr>
                      <td>7</td>
                      <td>¿Ha disminuido su interés en sus actividades cotidianas?</td>   
                      <td >{this.state.resultados[7].Respuestas}</td> 
                    </tr>
                  
                    <tr>
                      <td>8</td>
                      <td>¿Se ha sentido usted alejado o distante de los demás?</td>   
                      <td >{this.state.resultados[8].Respuestas}</td> 
                    </tr>
                   
                    <tr>
                      <td>9</td>
                      <td>¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?</td>   
                      <td >{this.state.resultados[9].Respuestas}</td> 
                    </tr>
                    <br/>
                   
                  </MDBTableBody>
             


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
                      <td >{this.state.resultados[10].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>¿Ha estado particularmente irritable o le han dado arranques de coraje?</td>   
                      <td >{this.state.resultados[11].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>¿Ha tenido dificultad para concentrarse?</td>   
                      <td >{this.state.resultados[12].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>13</td>
                      <td>¿Ha estado nervioso o constantemente en alerta?</td>   
                      <td >{this.state.resultados[13].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>14</td>
                      <td>¿Se ha sobresaltado fácilmente por cualquier cosa?</td>   
                      <td >{this.state.resultados[14].Respuestas}</td> 
                    </tr>
                  </MDBTableBody>
                  </MDBTable> 
                {ATS}
                </MDBContainer>  
                 </PDFExport>
          </section>
        </React.Fragment>
       
      </MDBContainer>
    }
    // console.log(this.state);
    return (
      <React.Fragment>

       
      <Paper >
      <Table bordered>
 
        <TableBody>
          {this.state.datos.map(rows => {
            return (
              <TableRow >
                <TableCell component="th" scope="row">
                  {rows.id}
                </TableCell>
                <TableCell >{rows.nombre}</TableCell>
                <TableCell  >{rows.ApellidoP}</TableCell>
                <TableCell  >{rows.ApellidoM}</TableCell>
                <TableCell  >{rows.Curp}</TableCell>
                <TableCell  >{rows.Ciudad}</TableCell>
                <TableCell  >{rows.Sexo}</TableCell>
                <TableCell  >{rows.rfc} </TableCell>
                <TableCell  ><MDBBtn color ="danger" onClick={(e) => this.click(rows.id)}>Respuestas</MDBBtn></TableCell>
              </TableRow>
              
            );
          })}
        </TableBody>


      </Table>
      </Paper>

      {pdfView1}

    
      </React.Fragment>
    );
  }
}

export default App
