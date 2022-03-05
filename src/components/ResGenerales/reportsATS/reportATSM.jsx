import React, { Component } from 'react';
import {MDBTable} from 'mdbreact';
import { PDFExport }  from '@progress/kendo-react-pdf';
import PageTemplate from '../pageTemplate.jsx';
import logo from '../../images/logo.png'
import {Card,Alert} from 'antd'
import '../styles.css'
class ReportATSM extends Component {
    pdfExportComponent;
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {descarga,reporteImasivo,fechaEmision,filtro1,filtro2,filtro3,filtro4,filtro5,filtro6,filtro7,filtro8,evaluacionesConsideradas}  = this.props;
        if(descarga === true){
            this.pdfExportComponent.save();
        }
        return (
        <div className="example-config">
           <div>
                <div style={{ position: "absolute",left:"-5000px", top: 0 }}>
                    <PDFExport
                        pageTemplate={PageTemplate}
                        forcePageBreak=".page-break"
                        paperSize="letter"
                        margin="1cm"
                        pageNum
                        fileName={`Reporte individual masivo ATS ${new Date().getFullYear()}`}
                        // pageTemplate={this.pdfExportComponent}
                        ref={(component) => this.pdfExportComponent = component}
                        >
                            {reporteImasivo.map(rows=>{                            
                              if(rows[0]){
                                let filtrar1,filtrar2,filtrar3,filtrar4,filtrar5,filtrar6,filtrar7,filtrar8,filtrar9,filtrar10,
                                filtrar12,filtrar13,filtrar14,filtrar15,filtrar16;
                                let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value12,value13,value14,value15,value16;
                                filtrar1 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "1";
                                });
                                value1 = filtrar1.pop()
                                filtrar2 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "2";
                                });
                                value2 = filtrar2.pop()
                                filtrar3 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "3";
                                });
                                value3 = filtrar3.pop()
                                filtrar4 = rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "4";
                                });
                                value4 = filtrar4.pop()
                                filtrar5 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "5";
                                });
                                value5 = filtrar5.pop()
                                filtrar6 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "6";
                                });
                                value6 = filtrar6.pop()
                                filtrar7 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "7";
                                });
                                value7 = filtrar7.pop()
                                filtrar8 = rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "8";
                                });
                                value8 = filtrar8.pop()
                                filtrar9 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "9";
                                });
                                value9 = filtrar9.pop()
                                filtrar10 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "10";
                                });
                                value10 = filtrar10.pop()
                                filtrar12 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "12";
                                });
                                value12 = filtrar12.pop()
                                filtrar13 = rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "13";
                                });
                                value13 = filtrar13.pop()
                                filtrar14 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "14";
                                });
                                value14 = filtrar14.pop()
                                filtrar15 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "15";
                                });
                                value15 = filtrar15.pop()
                                filtrar16 =  rows.filter(function(hero) {
                                  return hero.fk_preguntasATS === "16";
                                });
                                value16 = filtrar16.pop()

                                let atsDetectado;
                                let array = [];
                                let array2 =[];

                                if(value2.Respuestas=== "si" || value3.Respuestas === "si"){
                                  atsDetectado = true
                                }else{
                                  array.push(value4.Respuestas,value5.Respuestas,value6.Respuestas,value7.Respuestas,value8.Respuestas,value9.Respuestas,value10.Respuestas)
                                  var occurrences = array.reduce(function(obj, item) {
                                  obj[item] = (obj[item] || 0) + 1;
                                  return obj;
                                  }, {});
                          
                                  if(occurrences.si >=3){
                                      atsDetectado = true
                                  }else if(occurrences.no>4){
                                      array2.push(value12.Respuestas,value13.Respuestas,value14.Respuestas,value15.Respuestas,value16.Respuestas)
                                      var occurrences2 = array2.reduce(function(obj, item) {
                                          obj[item] = (obj[item] || 0) + 1;
                                          return obj;
                                      }, {});
                              
                                      if(occurrences2.si >=2){
                                          atsDetectado = true
                                      }else if(occurrences2.no>3){
                                          atsDetectado = false
                                      }
                                  }
                              }
                              let atsReporte;
                              if(atsDetectado === true){
                                  atsReporte= <Alert className="textabla2" message ={ <font size="1"face="arial">La evaluación reveló que el personal requiere canalización con un profesional</font>} type="error"/>
                              }
                              if(atsDetectado === false){
                                  atsReporte= <Alert className="textabla2" message ={<font size="1" face="arial">La evaluación reveló que el personal está en perfecto estado y nó requiere canalización con un profesional</font>} type="success"/>
                              }
                            let representante = localStorage.getItem("nombre") + " " + localStorage.getItem("apellidos")
                            let empleado =  rows[0].nombre + " " + rows[0].ApellidoP + " " + rows[0].ApellidoM;
                            let periodoEvaluacion = localStorage.getItem("periodo")
                            let titulo1 = <font color="blue">I.- Acontecimiento traumático severo </font>
                            let titulo2 = <font color="blue">II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes)</font>
                            let titulo3 = <font color="blue">III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento</font>
                            let titulo4 = <font color="blue">IV.- Afectación (durante el último mes)</font>

                            return(
                            <div style={{ width: "550px" }}>

                            <center><img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/></center>  
                            <Card style = {{width:550}} className="text-left mt-2 ">   
                            <center><p className="textabla1">REPORTE INDIVIDUAL DEL DIAGNÓSTICO DE ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</p></center>
                            <p className="textabla2"> <strong>{localStorage.getItem("razonsocial")}</strong></p>
                            <p className="textabla2">Representante: <strong>{representante}</strong></p>         
                            <p className="textabla2">{empleado}</p>
                            <p className="textabla2">Filtrado por : <strong>{filtro6}&nbsp;{filtro1}&nbsp;&nbsp;{filtro2}&nbsp;&nbsp; {filtro3}&nbsp;&nbsp;{filtro4}&nbsp;&nbsp; {filtro5}&nbsp;&nbsp;{filtro7}&nbsp;&nbsp;{filtro8}</strong></p>
                            <p className="textabla2">Total de Evaluaciones consideradas : <strong>{evaluacionesConsideradas}</strong></p>
                            <p className="textabla2"><strong>{periodoEvaluacion}</strong></p>
                            <div style={{ position: "absolute", bottom: "10px", left: "360px" }}>
                                <p className="textabla3"><strong>{fechaEmision}</strong></p>
                            </div>
                            </Card>  
                            <center><img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,heigth:20}}/></center>                              
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
                            <br/>
                            <br/>
                            <center><p className="textabla1"><strong>GUÍA DE REFERENCIA I - 
                              CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE FUERON
                              SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</strong></p></center> <br/>  
                            <table className="table table-borderless table-small">
                                <tr>
                                    <td>{atsReporte}</td>
                                </tr>
                                <tr></tr>
                            </table>  
                            <MDBTable width="500" className="table" striped bordered small> 
                                <tr>
                                    <th scope="col" className="textabla3" align="center">1</th>
                                    <th scope="col" className="textabla2" width="85%">{titulo1}</th>
                                    <th scope="col" className="textabla3" align="center"></th>
                                </tr>
                                <tr>
                                    <td className="textabla3" style= {{padding:"2px"}}></td>
                                    <td style= {{padding:"5px"}} className="textabla3" align="left"  width="85%">
                                    ¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los siguientes:<br></br>
                                    Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión  grave? Asaltos? Actos violentos que derivaron en lesiones graves?
                                    Secuestro? Amenazas?, o Cualquier otro que ponga en riesgo su vida o salud, y/o la de otras personas?</td>
                                    <td className="textabla2"  style= {{padding:"2px"}}  align="center"><br/>{value1.Respuestas.toUpperCase()}</td>
                                </tr>
                            </MDBTable>  
                            <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%"}}>
                                <tr>
                                    <th scope="col" className="textabla3" align="center">2</th>
                                    <th scope="col" width="85%" className="textabla2">{titulo2}</th>
                                    <th scope="col" className="textabla3" align="center"></th>
                                </tr>
                                <tr>      
                                    <td className="textabla3" align="center" style= {{padding:"2px"}}></td>      
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value2.Respuestas.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" align="center"  style= {{padding:"2px"}}></td>
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Ha tenido sueños de carácter recurrente sobre el acontecimiento que le producen malestar?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value3.Respuestas.toUpperCase()}</td>
                                </tr>
                            </MDBTable>   
                            <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%"}}>
                                <tr>
                                    <th scope="col" className="textabla3" align="center">3</th>
                                    <th scope="col" width="85%" className="textabla2">{titulo3}</th>
                                    <th scope="col" className="textabla3" align="center"></th>
                                </tr>
                                <tr>      
                                    <td className="textabla3" align="center" style= {{padding:"2px"}}></td>      
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value4.Respuestas.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" align="center" style= {{padding:"2px"}}></td>      
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value5.Respuestas.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" align="center" style= {{padding:"2px"}}></td>      
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Ha tenido dificultad para recordar alguna parte importante del evento?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value6.Respuestas.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" align="center" style= {{padding:"2px"}}></td>      
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Ha disminuido su interés en sus actividades cotidianas?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value7.Respuestas.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" align="center" style= {{padding:"2px"}}></td>      
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Se ha sentido usted alejado o distante de los demás?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value8.Respuestas.toUpperCase()}</td>                                       
                                </tr>
                                <tr>
                                    <td className="textabla3" align="center" style= {{padding:"2px"}}></td>      
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Ha notado que tiene dificultad para expresar sus sentimientos?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value9.Respuestas.toUpperCase()}</td>                                       
                                </tr>
                                <tr>
                                    <td className="textabla3" align="center" style= {{padding:"2px"}}></td>      
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value10.Respuestas.toUpperCase()}</td> 
                                </tr>
                            </MDBTable>
                            <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%"}}>
                                <tr>
                                    <th scope="col" className="textabla3" align="center">4</th>
                                    <th scope="col" width="85%" className="textabla2">{titulo4}</th>
                                    <th scope="col" className="textabla3" align="center"></th>
                                </tr>
                                
                                <tr>      
                                    <td className="textabla3" align="center" style= {{padding:"2px"}}></td>      
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Ha tenido usted dificultades para dormir?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value12.Respuestas.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" align="center"  style= {{padding:"2px"}}></td>
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Ha estado particularmente irritable o le han dado arranques de coraje?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value13.Respuestas.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" align="center"  style= {{padding:"2px"}}></td>
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Ha tenido dificultad para concentrarse?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value14.Respuestas.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" align="center"  style= {{padding:"2px"}}></td>
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Ha estado nervioso o constantemente en alerta?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value15.Respuestas.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" align="center"  style= {{padding:"2px"}}></td>
                                    <td className="textabla3" align="left" style= {{padding:"5px"}}>¿Se ha sobresaltado fácilmente por cualquier cosa?</td>
                                    <td className="textabla2" align="center" style= {{padding:"2px"}}>{value16.Respuestas.toUpperCase()}</td>
                                </tr>
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
                              )
                            }
                          })}            
                        </PDFExport>
                    </div>
                  </div>       
                </div>

               );
            }
          }
 
export default ReportATSM;