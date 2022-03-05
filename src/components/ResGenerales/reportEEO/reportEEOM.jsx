import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import PageTemplate from '../pageTemplate.jsx';
import {MDBTable} from 'mdbreact';
import logo from '../../images/logo.png'
import {Card} from 'antd'
import '../styles.css'

class reportEEOM extends Component {
  pdfExportComponent;
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
      const {fechaCompleta,datosLength,descarga,reporteImasivo,filtro1,filtro2,filtro3,filtro4,filtro5,filtro6,filtro7,filtro8}  = this.props
      if(descarga === true){
        this.pdfExportComponent.save();
      }
        return ( 
            <div style={{ position: "absolute", left: "-5000px", top: 0 }}>
             <PDFExport
               pageTemplate={PageTemplate}
               forcePageBreak=".page-break"
                 paperSize="letter"
                 margin="1cm"
                 ref={(component) => this.pdfExportComponent = component}
                 fileName={`Respuestas del total de empleados ${new Date().getFullYear()}`}
                 >
              <div style={{ width: "550px" }}>
                {reporteImasivo.map(rows=>{
                  if(rows[0]){
                   let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,value21,value22,value23,value24;
                   let value25,value26,value27,value28,value29,value30,value31,value32,value33,value34,value35,value36,value37,value38,value39,value40,value41,value42,value43,value44,value45,value46;
                   let value47,value48,value49,value50,value51,value52,value53,value54,value55,value56,value57,value58,value59,value60,value61,value62,value63,value64,value65,value66,value67,value68;
                   let value69,value70,value71,value72;
                   let filtrar1,filtrar2,filtrar3,filtrar4,filtrar5,filtrar6,filtrar7,filtrar8,filtrar9,filtrar10,
                   filtrar11,filtrar12,filtrar13,filtrar14,filtrar15,filtrar16,filtrar17,filtrar18,filtrar19,filtrar20,
                   filtrar21,filtrar22,filtrar23,filtrar24,filtrar25,filtrar26,filtrar27,filtrar28,filtrar29,filtrar30,
                   filtrar31,filtrar32,filtrar33,filtrar34,filtrar35,filtrar36,filtrar37,filtrar38,filtrar39,filtrar40,
                   filtrar41,filtrar42,filtrar43,filtrar44,filtrar45,filtrar46,filtrar47,filtrar48,filtrar49,filtrar50,
                   filtrar51,filtrar52,filtrar53,filtrar54,filtrar55,filtrar56,filtrar57,filtrar58,filtrar59,filtrar60,
                   filtrar61,filtrar62,filtrar63,filtrar64,filtrar65,filtrar66,filtrar67,filtrar68,filtrar69,filtrar70,filtrar71,filtrar72;
        
                  filtrar1 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "1";
                  });
                  value1 = filtrar1.pop()
                  filtrar2 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "2";
                  });
                  value2 = filtrar2.pop()
                  filtrar3 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "3";
                  });
                  value3 = filtrar3.pop()
                  filtrar4 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "4";
                  });
                  value4 = filtrar4.pop()
                  filtrar5 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "5";
                  });
                  value5 = filtrar5.pop()
                  filtrar6 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "6";
                  });
                  value6 = filtrar6.pop()
                  filtrar7 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "7";
                  });
                  value7 = filtrar7.pop()
                  filtrar8 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "8";
                  });
                  value8 = filtrar8.pop()
                  filtrar9 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "9";
                  });
                  value9  = filtrar9.pop()
                  filtrar10 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "10";
                  });
                  value10 = filtrar10.pop()
                  filtrar11 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "11";
                  });
                  value11 = filtrar11.pop()
                  filtrar12 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "12";
                  });
                  value12 = filtrar12.pop()
                  filtrar13 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "13";
                  });
                  value13 = filtrar13.pop()
                  filtrar14 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "14";
                  });
                  value14 = filtrar14.pop()
                  filtrar15 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "15";
                  });
                  value15 = filtrar15.pop()
                  filtrar16 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "16";
                  });
                  value16 = filtrar16.pop()
                  filtrar17 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "17";
                  });
                  value17 = filtrar17.pop()
                  filtrar18 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "18";
                  });
                  value18 = filtrar18.pop()
                  filtrar19 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "19";
                  });
                  value19 = filtrar19.pop()
                  filtrar20=  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "20";
                  });
                  value20 = filtrar20.pop()
                  filtrar21 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "21";
                  });
                  value21 = filtrar21.pop()
                  filtrar22 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "22";
                  });
                  value22 = filtrar22.pop()
                  filtrar23 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "23";
                  });
                  value23 = filtrar23.pop()
                  filtrar24=  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "24";
                  });
                  value24 = filtrar24.pop();
                  filtrar25 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "25";
                  });
                  value25 = filtrar25.pop()
                  filtrar26 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "26";
                  });
                  value26 = filtrar26.pop()
                  filtrar27 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "27";
                  }); 
                  value27 = filtrar27.pop()
                  filtrar28 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "28";
                  });
                  value28 = filtrar28.pop()
                  filtrar29 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "29";
                  }); 
                  value29 = filtrar29.pop()
                  filtrar30 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "30";
                  });
                  value30 = filtrar30.pop()
                  filtrar31 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "31";
                  });
                  value31 = filtrar31.pop()
                  filtrar32 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "32";
                  });
                  value32 = filtrar32.pop()
                  filtrar33 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "33";
                  });
                  value33 = filtrar33.pop()
                  filtrar34 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "34";
                  });
                  value34 = filtrar34.pop()
                  filtrar35 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "35";
                  });
                  value35 = filtrar35.pop()
                  filtrar36 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "36";
                  });
                  value36 = filtrar36.pop()
                  filtrar37 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "37";
                  });
                  value37 = filtrar37.pop()
                  filtrar38 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "38";
                  });
                  value38 = filtrar38.pop()
                  filtrar39 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "39";
                  });
                  value39 = filtrar39.pop()
                  filtrar40 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "40";
                  }); 
                  value40 = filtrar40.pop()
                  filtrar41 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "41";
                  });   
                  value41 = filtrar41.pop()
                  filtrar42 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "42";
                  });  
                  value42 = filtrar42.pop()
                  filtrar43 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "43";
                  }); 
                  value43 = filtrar43.pop()
                  filtrar44 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "44";
                  });
                  value44 = filtrar44.pop()
                  filtrar45 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "45";
                  });
                  value45 = filtrar45.pop()
                  filtrar46 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "46";
                  });
                  value46 = filtrar46.pop()
                  filtrar47 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "47";
                  });
                  value47 = filtrar47.pop()
                  filtrar48 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "48";
                  });
                  value48 = filtrar48.pop()
                  filtrar49 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "49";
                  });
                  value49 = filtrar49.pop()
                  filtrar50 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "50";
                  });
                  value50 = filtrar50.pop()
                  filtrar51 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "51";
                  });
                  value51 = filtrar51.pop()
                  filtrar52 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "52";
                  });
                  value52= filtrar52.pop()
                  filtrar53 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "53";
                  });
                  value53 = filtrar53.pop()
                  filtrar54 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "54";
                  });
                  value54 = filtrar54.pop()
                  filtrar55 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "55";
                  });
                  value55 = filtrar55.pop()
                  filtrar56 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "56";
                  });
                  value56 = filtrar56.pop()
                  filtrar57 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "57";
                  }); 
                  value57 = filtrar57.pop()
                  filtrar58 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "58";
                  });
                  value58 = filtrar58.pop()
                  filtrar59 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "59";
                  });
                  value59 = filtrar59.pop()
                  filtrar60 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "60";
                  });
                  value60 = filtrar60.pop()
                  filtrar61 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "61";
                  });
                  value61 = filtrar61.pop()
                  filtrar62 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "62";
                  });
                  value62 = filtrar62.pop()
                  filtrar63 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "63";
                  });
                  value63 = filtrar63.pop()
                  filtrar64 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "64";
                  });
                  value64 = filtrar64.pop()
                  filtrar65 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "65";
                  });
                  value65 = filtrar65.pop()
                  filtrar66 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "66";
                  });
                  value66 = filtrar66.pop()
                  filtrar67 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "67";
                  });
                  value67 = filtrar67.pop()
                  filtrar68 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "68";
                  });
                  value68 = filtrar68.pop()
                  filtrar69 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "69";
                  });
                  value69= filtrar69.pop()
                  filtrar70 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "70";
                  });
                  value70 = filtrar70.pop()
                  filtrar71 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "71";
                  });
                  value71 = filtrar71.pop()
                  filtrar72 =  rows.filter(function(hero) {
                    return hero.fk_preguntasEEO === "72";
                  });
                  value72 = filtrar72.pop()
                  let titulo1 =<p className="textabla2"><font color="blue">I. Condiciones ambientales de su centro de trabajo.</font> </p>
                  let titulo2 =<p className="textabla2"><font color="blue">II. La cantidad y ritmo de trabajo que tiene.</font> </p>
                  let titulo3 =<p className="textabla2"><font color="blue">III. El esfuerzo mental que le exige su trabajo.</font> </p>
                  let titulo4 =<p className="textabla2"><font color="blue">IV. Trabajo y las responsabilidades que tiene.</font> </p>
                  let titulo5 =<p className="textabla2"><font color="blue">V. Jornada de trabajo.</font> </p>
                  let titulo6 =<p className="textabla2"><font color="blue">VI. Decisiones que puede tomar en su trabajo.</font> </p>
                  let titulo7 =<p className="textabla2"><font color="blue">VII.Cualquier tipo de cambio que ocurra en su trabajo (considere los últimos cambios realizados).</font> </p>
                  let titulo8 =<p className="textabla2"><font color="blue">VIII. capacitación e información que se le proporciona sobre su trabajo.</font> </p>
                  let titulo9 =<p className="textabla2"><font color="blue">IX. Jefes con quien tiene contacto.</font> </p>
                  let titulo10 =<p className="textabla2"><font color="blue">X. Relaciones con sus compañeros.</font> </p>
                  let titulo11 =<p className="textabla2"><font color="blue">XI. Información que recibe sobre su rendimiento en el trabajo, el reconocimiento, el sentido de pertenencia y la estabilidad que le ofrece su trabajo.</font> </p>
                  let titulo12 =<p className="textabla2"><font color="blue">XII. Actos de violencia laboral (malos tratos, acoso, hostigamiento, acoso psicológico).</font> </p>
                  let titulo13 =<p className="textabla2"><font color="blue">XIII. Atención a clientes y usuarios.</font> </p>
                  let titulo14 =<p className="textabla2"><font color="blue">XIV.  Las actitudes de las personas que supervisa.</font> </p>
                  let representante = localStorage.getItem("nombre") + " " + localStorage.getItem("apellidos")
                  let periodoEvaluacion = localStorage.getItem("periodo")
                  return(
                   <div> 
                   <center><img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/></center>  
                          <Card style = {{width:550}} className="text-left mt-2 ">   
                              <center><p className="textabla1">Reporte individual para identificar los factores de Riesgo Psicosocial y evaluar el entorno organizacional en los centros de trabajo</p></center><br/>
                              <p className="textabla2"> <strong>{localStorage.getItem("razonsocial")}</strong></p>
                              <p className="textabla2">Representante: <strong>{representante}</strong></p>         
                              <p className="textabla2">{rows[0].nombre} {rows[0].ApellidoP} {rows[0].ApellidoM}</p>
                              <p className="textabla2"><strong>Filtrado por : {filtro6}&nbsp;{filtro1}&nbsp;&nbsp;{filtro2}&nbsp;&nbsp; {filtro3}&nbsp;&nbsp;{filtro4}&nbsp;&nbsp; {filtro5}&nbsp;&nbsp;{filtro7}&nbsp;&nbsp;{filtro8}</strong></p>
                              <p className="textabla2"><strong>{periodoEvaluacion}</strong></p>
                              <p className="textabla2"><strong>Total de Evaluaciones consideradas : {datosLength}</strong></p>
                              <div style={{ position: "absolute", bottom: "10px", left: "360px" }}>
                                  <p className="textabla3"><strong>{fechaCompleta}</strong></p>
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
                      <center>
                          <p className="textabla2"><strong>GUÍA DE REFERENCIA III
                              CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN
                              LOS CENTROS DE TRABAJO</strong></p> <br/>
                          </center>
                          <center>{titulo1}</center>    
                          <MDBTable width="500" className="table" striped bordered small>
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} width="80%" className="textabla3" align="left">El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value1.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3"  width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo me exige hacer mucho esfuerzo físico</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value2.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me preocupa sufrir un accidente en mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value3.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value4.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Considero que las actividades que realizo son peligrosas</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value5.Respuestas.toUpperCase()}</td>
                            </tr> 
                          </MDBTable>  
                          <center>{titulo2}</center>    
                          <MDBTable width="500" className="table" striped bordered small>                             
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value6.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Por la cantidad de trabajo que tengo debo trabajar sin parar</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value7.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Considero que es necesario mantener un ritmo de trabajo acelerado</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value8.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo3}</center>    
                          <MDBTable width="500" className="table" striped bordered small>  
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo exige que esté muy concentrado</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value9.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo requiere que memorice mucha información</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value10.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En mi trabajo tengo que tomar decisiones difíciles muy rápido</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value11.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo exige que atienda varios asuntos al mismo tiempo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value12.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo4}</center>    
                          <MDBTable width="500" className="table" striped bordered small>  
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En mi trabajo soy responsable de cosas de mucho valor</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value13.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Respondo ante mi jefe por los resultados de toda mi área de trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value14.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En el trabajo me dan órdenes contradictorias</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value15.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Considero que en mi trabajo me piden hacer cosas innecesarias</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value16.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                         
                          <center>{titulo5}</center>    
                          <MDBTable width="500" className="table" striped bordered small>    
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Trabajo horas extras más de tres veces a la semana</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value17.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo me exige laborar en días de descanso, festivos o fines de semana</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value18.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value19.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Debo atender asuntos de trabajo cuando estoy en casa</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value20.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Pienso en las actividades familiares o personales cuando estoy en mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value21.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}} width="5%"></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Pienso que mis responsabilidades familiares afectan mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value22.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo6}</center>    
                          <MDBTable width="500" className="table" striped bordered small>      
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo permite que desarrolle nuevas habilidades</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value23.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En mi trabajo puedo aspirar a un mejor puesto</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value24.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Durante mi jornada de trabajo puedo tomar pausas cuando las necesito</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value25.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Puedo decidir cuánto trabajo realizo durante la jornada laboral</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value26.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value27.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Puedo cambiar el orden de las actividades que realizo en mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value28.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo7}</center>    
                          <MDBTable width="500" className="table" striped bordered small>      
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Los cambios que se presentan en mi trabajo dificultan mi labor</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value29.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas o aportaciones</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value30.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo8}</center>    
                          <MDBTable width="500" className="table" striped bordered small>        
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me informan con claridad cuáles son mis funciones</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value31.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me explican claramente los resultados que debo obtener en mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value32.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me explican claramente los objetivos de mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value33.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me informan con quién puedo resolver problemas o asuntos de trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value34.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me permiten asistir a capacitaciones relacionadas con mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value35.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}} width="5%"></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Recibo capacitación útil para hacer mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value36.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo9}</center>    
                          <MDBTable width="500" className="table" striped bordered small>          
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi jefe ayuda a organizar mejor el trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value37.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi jefe tiene en cuenta mis puntos de vista y opiniones</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value38.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi jefe me comunica a tiempo la información relacionada con el trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value39.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">La orientación que me da mi jefe me ayuda a realizar mejor mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value40.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value41.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo10}</center>    
                          <MDBTable width="500" className="table" striped bordered small>            
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Puedo confiar en mis compañeros de trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value42.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Entre compañeros solucionamos los problemas de trabajo de forma respetuosa</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value43.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En mi trabajo me hacen sentir parte del grupo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value44.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Cuando tenemos que realizar trabajo de equipo los compañeros colaboran</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value45.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mis compañeros de trabajo me ayudan cuando tengo dificultades</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value46.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>  
                          <center>{titulo11}</center>    
                          <MDBTable width="500" className="table" striped bordered small>            
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me informan sobre lo que hago bien en mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value47.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">La forma como evalúan mi trabajo en mi centro de trabajo me ayuda a mejorar mi desempeño</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value48.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En mi centro de trabajo me pagan a tiempo mi salario</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value49.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">El pago que recibo es el que merezco por el trabajo que realizo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value50.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Si obtengo los resultados esperados en mi trabajo me recompensan o reconocen</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value51.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Las personas que hacen bien el trabajo pueden crecer laboralmente</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value52.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Considero que mi trabajo es estable</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value53.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En mi trabajo existe continua rotación de personal</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value54.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Siento orgullo de laborar en este centro de trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value55.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me siento comprometido con mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value56.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo12}</center>    
                          <MDBTable width="500" className="table" striped bordered small>              
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En mi trabajo puedo expresarme libremente sin interrupciones</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value57.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Recibo críticas constantes a mi persona y/o trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value58.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value59.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value60.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value61.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value62.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value63.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">He presenciado actos de violencia en mi centro de trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value64.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <br/><br/>
                          <center>{titulo13}</center>    
                          <MDBTable width="500" className="table" striped bordered small>                
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}} width="5%"></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Atiendo clientes o usuarios muy enojados</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value65.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value66.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Para hacer mi trabajo debo demostrar sentimientos distintos a los míos</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value67.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo me exige atender situaciones de violencia</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value68.Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo14}</center>                             
                          <MDBTable width="500" className="table" striped bordered small>                
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Comunican tarde los asuntos de trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value69.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Dificultan el logro de los resultados del trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value70.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Cooperan poco cuando se necesita</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value71.Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Ignoran las sugerencias para mejorar su trabajo</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{value72.Respuestas.toUpperCase()}</td>
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
                    )}
                  })}
                </div>
              </PDFExport>                 
            </div>
         );
    }
}
 
export default reportEEOM;