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
import logo from '../images/logo.png'
import logotipo from '../images/logotipo.png'

import {Alert} from 'reactstrap'
class App extends Component {
pdfExportComponent =(props)=><span><font size="1"face="arial"color="red">diagnostico.com</font><br/><font size="1"face="arial"color="gray">{props.pageNum}</font></span>;
  constructor(props) {
    super(props);
    this.state = {
      datos:[],
      resultados:[],
      fecha:''
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
    const url = 'http://localhost:8000/graphql'
 
    const idAdmin = localStorage.getItem("idAdmin")
    axios({
      url:  url,
      method:'post',
      data:{
      query:`
       query{
        getPeriodo(data:"${[idAdmin]}"){
          idEventos
          fk_administrador
          Descripcion
              }
            }
          `
      }
    })
    .then(datos => {	
      console.log("eventos o periodos exito" , datos.data.data.getPeriodo)
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
        query{
          getUsersTableEmployeesthisPeriodoATS(data:"${[idAdmin,datos.data.data.getPeriodo[0].Descripcion]}"){
            id
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
              }
            }
            `
        }
            }).then((datos) => {
              this.setState({ datos: datos.data.data.getUsersTableEmployeesthisPeriodoATS});
             console.log("this.state.resultados" ,idAdmin,datos)
            }).catch(err=>{
              console.log("el error " , err)
            })     
    }).catch(err=>{
      console.log("err", err.response)
    }) 


    var LaFecha=new Date();
    var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasem=new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
    var diasemana=LaFecha.getDay();
    var FechaCompleta="";
    var NumeroDeMes="";    
    NumeroDeMes=LaFecha.getMonth();
    FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
    this.setState({fecha:FechaCompleta})
  }

    click(id){           
            const periodo  = localStorage.getItem("periodo")        
            const url = 'http://localhost:8000/graphql'
            axios({
              url:  url,
              method:'post',
              data:{
              query:`
                query{
                resultSingleSurvey(data:"${[id,periodo]}"){
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
                    console.log("los datos son " ,  datos)
                  if(datos.data.data.resultSingleSurvey.length > 0 ){
                  this.setState({resultados :datos.data.data.resultSingleSurvey })                
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
                    console.log("el error es  ",err.response)
                  });  
          }

    
  render() {
    
    const container = { marginLeft:20}
    let pdfView1;
    let ATS;
    let ATSReporte;

    if(this.state.resultados.length!=0){
      if(this.state.resultados[1].Respuestas=="si"){
        ATSReporte= <font size="1"
        face="arial"
        color="red" >LA EVALUACIÓN REVELÓ QUE EL PERSONAL  REQUIERE CANALIZACIÓN CON UN PROFESIONAL</font>
        ATS = <Alert className ="mt-4" color ="danger ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL  REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
       }if(this.state.resultados[1].Respuestas=="no"){
         ATSReporte= <font size="1"
         face="arial"
         color="blue" >LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</font>
         ATS = <Alert className ="mt-4" color ="primary ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
        }
    }

    if(this.state.resultados.length>0){ 
      pdfView1 = <MDBContainer > <Alert className ="mt-4" color ="primary ">Resultados de la Aplicación de la encuesta ATS </Alert>

       
        <React.Fragment>
          <section className="flex-column"  >
          <div>
                    <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                        Descargar Resultados 
                    </MDBBtn>
           </div>
           <br/>
        
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
         
          <div>
                <div className="example-config">
                  
                </div>

                <div style={{ position: "absolute", left: "-1000px", top: 0 }}>
                    <PDFExport
                        paperSize="letter"
                        margin="1cm"
                        pageNum
                        pageTemplate={this.pdfExportComponent}
                        ref={(component) => this.pdfExportComponent = component}
                    >
                        <div style={{ width: "500px" }}>
                      
                            <MDBRow> 
                            <MDBCol>
                            <img src={logotipo} alt="logo" style = {{width:150,marginBottom:20}}/>
                            </MDBCol>  
                            <MDBCol>
                            {/* <img src={logotipo} alt="logo" style = {{width:100,marginBottom:30}}/> */}
                            </MDBCol>
                            </MDBRow> 
                            <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                            <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left mt-4 ">
                              
                                    <MDBTableBody>     
                            <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                            <font size="1"face="arial"color="black">{this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM}</font><br></br><br/>
                            <font size="3"face="arial"color="black">Diagnóstico de acontecimientos traumáticos severos</font><br></br>
                            <font size="1"face="arial"color="black">{this.state.fecha}</font>
                            
                        
                            </MDBTableBody>
                            </MDBTable>

                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                          
                              <font size="1"
                              face="arial"
                              color="black" style = {{marginTop:25,marginLeft:20}}>GUÍA DE REFERENCIA I - 
                                CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE FUERON
                                SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</font>   <br/>  
                                
                                <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
                                    <MDBTableBody>
                                    <tr>
                                      <td width="25%"><font size="1" face="arial"color="black"><strong>{this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM}</strong></font></td>
                                    <td width="25%"><font size="1" face="arial"color="black">RESULTADO DE LA EVALUACIÓN : </font></td>
                                   <td width="50%"> <font size="1" face="arial"color="black" > {ATSReporte}</font></td>
                                   </tr>
                                   <tr></tr>
                                  
                                   </MDBTableBody>
                                   
                                    </MDBTable>  
                                
                                <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left  ">
                                    <MDBTableBody>
                                    <tr></tr>
                                    <td ></td>
                                    <td></td>
                               
                                  
                                   </MDBTableBody>
                                   
                                    </MDBTable>  

                                   <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">I.- Acontecimiento traumático severo </font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left"> 
                                      <MDBTableBody>
                                          
                                         <tr>
                                       
                                          <td >
                                         <font size="1" face="arial"color="black" >¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los
                                              siguientes:<br></br> Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión
                                              grave? Asaltos? Actos violentos que derivaron en lesiones graves? Secuestro? Amenazas?, o Cualquier otro
                                              que ponga en riesgo su vida o salud, y/o la de otras personas?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[1].Respuestas}</font></td>
                                          
                                        </tr>
               
                                      </MDBTableBody>
                                      </MDBTable>
                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                      <font color="red" style= {{marginTop:40,marginLeft:20}}   size="1">II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes)</font>
                                      </MDBTableBody>
                                      </MDBTable>
                                      <MDBTable style={{marginLeft:20}}  component={Paper}  small bordered className="text-left mt-4 ">
                                      <MDBTableBody>
                                      <tr>            
                                        <td >
                                      <font size="1" face="arial"color="black">¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</font></td>
                                        <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[2].Respuestas}</font></td>
                                       </tr>
                                       <tr>
                                        <td >
                                      <font size="1" face="arial"color="black">¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?</font></td>
                                        <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[3].Respuestas}</font></td>
                                         
                                      </tr>
                                     
                                    </MDBTableBody>
                                    </MDBTable>
                                    <MDBTable  component={Paper}  small  className="text-left  ">
                                     <MDBTableBody>
                        
                                      <font style= {{marginLeft:20}}  size="1" color="red" >III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento</font>
                                   </MDBTableBody>
                                   </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                                      <MDBTableBody>
                                        <tr>
                                         
                                          <td >
                                        <font size="1" face="arial"color="black">¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[4].Respuestas}</font></td></tr>
                                         
                                         <tr>
                                          
                                          <td >
                                        <font size="1" face="arial"color="black">¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[5].Respuestas}</font></td>
                                         </tr>

                                         <tr>
                                          
                                          <td >
                                        <font size="1" face="arial"color="black">¿Ha tenido dificultad para recordar alguna parte importante del evento?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[6].Respuestas}</font></td>
                                          </tr>

                                          <tr>
                                          
                                          <td >
                                        <font size="1" face="arial"color="black">¿Ha disminuido su interés en sus actividades cotidianas?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[7].Respuestas}</font></td>
                                         </tr>

                                         <tr>
                                         
                                          <td >
                                        <font size="1" face="arial"color="black">  ¿Se ha sentido usted alejado o distante de los demás?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[8].Respuestas}</font></td>
                                         </tr>

                                         <tr>
                                          
                                          <td >
                                        <font size="1" face="arial"color="black"> ¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[9].Respuestas}</font></td>

                                        </tr>
                                    
                                      </MDBTableBody>
                                      </MDBTable>
                                      <MDBTable  component={Paper}  small  className="text-left mt-4 ">
                                     <MDBTableBody>
                                      <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >IV.- Afectación (durante el último mes)</font>
                                     </MDBTableBody>
                                     </MDBTable>
                                      <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                                      <MDBTableBody>
                                        <tr>
                                         
                                          <td >
                                        <font size="1" face="arial"color="black">¿Ha tenido usted dificultades para dormir?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[10].Respuestas}</font></td></tr>
                                         
                                         <tr>
                                          
                                          <td >
                                        <font size="1" face="arial"color="black">¿Ha estado particularmente irritable o le han dado arranques de coraje?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[11].Respuestas}</font></td>
                                         </tr>

                                         <tr>
                                          
                                          <td >
                                        <font size="1" face="arial"color="black">¿Ha tenido dificultad para concentrarse?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[12].Respuestas}</font></td>
                                          </tr>

                                          <tr>
                                         
                                          <td >
                                        <font size="1" face="arial"color="black">¿Ha estado nervioso o constantemente en alerta?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[13].Respuestas}</font></td>
                                         </tr>

                                         <tr>
                                          
                                          <td >
                                        <font size="1" face="arial"color="black">¿Se ha sobresaltado fácilmente por cualquier cosa?</font></td>
                                          <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[14].Respuestas}</font></td>
                                         </tr>
                                      
                                        
                                      </MDBTableBody>
                                      </MDBTable>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      <br/>
                                      
                                   
                                     
 
                        </div>
                    </PDFExport>
                </div>
            </div>
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
