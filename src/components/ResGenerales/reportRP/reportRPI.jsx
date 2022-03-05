import React, { Component } from 'react';
import {MDBTable} from 'mdbreact';
import diagnostico from '../../images/diagnostico.png'
import {Card,Button} from 'antd'
import '../styles.css'
import { PDFExport }  from '@progress/kendo-react-pdf';
import PageTemplate from '../pageTemplate.jsx';
import logo from '../../images/logo.png'

class ReportRP extends Component {
    pdfExportComponent;
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const {data,estado,fechaCompleta} = this.props
        let representante = localStorage.getItem("nombre") + " " + localStorage.getItem("apellidos")
        let periodoEvaluacion = localStorage.getItem("periodo")

        let titulo1 =<p className="textabla2"><font color="blue">I. Las condiciones de su centro de trabajo, así como la cantidad y ritmo de trabajo.</font> </p>
        let titulo2 =<p className="textabla2"><font color="blue">II. Las actividades que realiza en su trabajo y las responsabilidades que tiene.</font> </p>
        let titulo3 =<p className="textabla2"><font color="blue">III. El tiempo destinado a su trabajo y sus responsabilidades familiares.</font> </p>
        let titulo4 =<p className="textabla2"><font color="blue">IV. Las decisiones que puede tomar en su trabajo.</font> </p>
        let titulo5 =<p className="textabla2"><font color="blue">V. La capacitación e información que recibe sobre su trabajo.</font> </p>
        let titulo6 =<p className="textabla2"><font color="blue">VI. Las relaciones con sus compañeros de trabajo y su jefe.</font> </p>
        let titulo7 =<p className="textabla2"><font color="blue">VII. En mi trabajo debo brindar servicio a clientes o usuarios</font> </p>
        let titulo8 =<p className="textabla2"><font color="blue">VIII. Soy jefe de otros trabajadores</font> </p>
       
        return (
            <React.Fragment>
            <center>
            <Card style={{width:"70%",padding:"25px"}}title = {<h6><strong>Resultados de la Aplicación de la evaluación RP </strong></h6>} extra = {<div><Button type="primary" className="text-white" onClick={(e) => { this.pdfExportComponent.save(); }}>Descargar reporte</Button>&nbsp;&nbsp;&nbsp;<Button type="dashed" danger onClick={e=>window.location.reload()}>Cerrar</Button></div>}>
                <table style={{width:"70%"}}>
                    <tr>
                        <td width="70%">
                            <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100}}/>
                        </td>
                        <td width="30%" >
                            <img src={diagnostico} alt="logo" style = {{width:150}}/> 
                        </td>
                    </tr>
                </table>    
                &nbsp;&nbsp;&nbsp; 
            <p  style={{marginTop:"2%"}}><strong>CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO<br/></strong></p>

            <table className="table table-borderless" style={{marginTop:"5%",alignItems:"left"}}>
                <tr>
                    <td>
                        <strong>{localStorage.getItem("razonsocial")}</strong>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <strong>{estado.nombre} {estado.ApellidoP} {estado.ApellidoM}</strong>                    
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>{estado.RFC}</strong>                    
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>{estado.correo}</strong>                    
                    </td>
                </tr>    
            </table>
            <table style={{marginTop:"2%"}} className="table table-bordered table table-sm">
                <tbody>
                    <tr>
                        <td className="textEEO1">1</td>
                        <td className="textEEO1"><strong><font size="2" color="blue">I. Las condiciones de su centro de trabajo, así como la cantidad y ritmo de trabajo.</font></strong></td>    
                        <td></td>   
                    </tr>
                    <tr>
                        <td ></td>
                        <td className="textEEO1" width="80%"><p>Mi trabajo me exige hacer mucho esfuerzo físico.</p></td>
                        <td className="textEEO1">{data[0].Respuestas.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Me preocupa sufrir un accidente en mi trabajo.</p></td>   
                        <td className="textEEO1" >{data[1].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Considero que las actividades que realizo son peligrosas</p></td>   
                        <td className="textEEO1">{data[2].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno.</p></td>   
                        <td className="textEEO1">{data[3].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Por la cantidad de trabajo que tengo debo trabajar sin parar.</p></td>   
                        <td className="textEEO1" >{data[4].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Considero que es necesario mantener un ritmo de trabajo acelerado.</p></td>   
                        <td className="textEEO1" >{data[5].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Mi trabajo exige que esté muy concentrado.</p></td>   
                        <td className="textEEO1" >{data[6].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Mi trabajo requiere que memorice mucha información..</p></td>   
                        <td className="textEEO1" >{data[7].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Mi trabajo exige que atienda varios asuntos al mismo tiempo.</p></td>   
                        <td className="textEEO1" >{data[8].Respuestas.toUpperCase()}</td> 
                    </tr>
        
                    <tr>
                        <td className="textEEO1">2</td>
                        <td className="textEEO1"><strong><font size="2" color="blue">II. Las actividades que realiza en su trabajo y las responsabilidades que tiene.</font></strong></td>    
                        <td></td>   
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>En mi trabajo soy responsable de cosas de mucho valor.</p></td>   
                        <td className="textEEO1" >{data[9].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Respondo ante mi jefe por los resultados de toda mi área de trabajo.</p></td>   
                        <td className="textEEO1" >{data[10].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>En mi trabajo me dan órdenes contradictorias.</p></td>   
                        <td className="textEEO1">{data[11].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Considero que en mi trabajo me piden hacer cosas innecesarias.</p></td>   
                        <td className="textEEO1">{data[12].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td className="textEEO1">3</td>
                        <td className="textEEO1"><strong><font size="2" color="blue">III. El tiempo destinado a su trabajo y sus responsabilidades familiares.</font></strong></td>    
                        <td></td>   
                    </tr>
                    <tr>
                        <td ></td>
                        <td className="textEEO1" width="82%"><p>Trabajo horas extras más de tres veces a la semana.</p></td>
                        <td className="textEEO1">{data[13].Respuestas.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Mi trabajo me exige laborar en días de descanso, festivos o fines de semana.</p></td>   
                        <td className="textEEO1">{data[14].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales.</p></td>   
                        <td className="textEEO1">{data[15].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Pienso en las actividades familiares o personales cuando estoy en mi trabajo.</p></td>   
                        <td className="textEEO1">{data[16].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td className="textEEO1">5</td>
                        <td className="textEEO1"><strong><font size="2" color="blue">IV. Las decisiones que puede tomar en su trabajo.</font></strong></td>    
                        <td></td>   
                    </tr>
                
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Mi trabajo permite que desarrolle nuevas habilidades.</p></td>   
                        <td className="textEEO1">{data[17].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>En mi trabajo puedo aspirar a un mejor puesto.</p></td>   
                        <td className="textEEO1">{data[18].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1" width="82%"><p>Durante mi jornada de trabajo puedo tomar pausas cuando las necesito.</p></td>   
                        <td className="textEEO1">{data[19].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo.</p></td>   
                        <td className="textEEO1">{data[20].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Puedo cambiar el orden de las actividades que realizo en mi trabajo.</p></td>   
                        <td className="textEEO1">{data[21].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td className="textEEO1">5</td>
                        <td className="textEEO1"><strong><font size="2" color="blue">V. La capacitación e información que recibe sobre su trabajo.</font></strong></td>    
                        <td></td>   
                    </tr>
                    <tr>
                        <td ></td>
                        <td className="textEEO1" width="82%"><p>Me informan con claridad cuáles son mis funciones.</p></td>
                        <td className="textEEO1">{data[22].Respuestas.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Me explican claramente los resultados que debo obtener en mi trabajo.</p></td>   
                        <td className="textEEO1">{data[23].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Me informan con quién puedo resolver problemas o asuntos de trabajo.</p></td>   
                        <td className="textEEO1">{data[24].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Me permiten asistir a capacitaciones relacionadas con mi trabajo.</p></td>   
                        <td className="textEEO1">{data[25].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Recibo capacitación útil para hacer mi trabajo.</p></td>   
                        <td className="textEEO1">{data[26].Respuestas.toUpperCase()}</td> 
                    </tr>

                    <tr>
                        <td className="textEEO1">6</td>
                        <td className="textEEO1"><strong><font size="2" color="blue">VI. Las relaciones con sus compañeros de trabajo y su jefe.</font></strong></td>    
                        <td></td>   
                    </tr>
                    <tr>
                        <td ></td>
                        <td className="textEEO1"width="82%"><p>Mi jefe tiene en cuenta mis puntos de vista y opiniones.</p></td>
                        <td className="textEEO1">{data[27].Respuestas.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo.</p></td>   
                        <td className="textEEO1" >{data[28].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Puedo confiar en mis compañeros de trabajo.</p></td>   
                        <td className="textEEO1" >{data[29].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Cuando tenemos que realizar trabajo de equipo los compañeros colaboran.</p></td>   
                        <td className="textEEO1" >{data[30].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Mis compañeros de trabajo me ayudan cuando tengo dificultades.</p></td>   
                        <td className="textEEO1" >{data[31].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>En mi trabajo puedo expresarme libremente sin interrupciones.</p></td>   
                        <td className="textEEO1" >{data[32].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Recibo críticas constantes a mi persona y/o trabajo.</p></td>   
                        <td className="textEEO1" >{data[33].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones.</p></td>   
                        <td className="textEEO1" >{data[34].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones.</p></td>   
                        <td className="textEEO1" >{data[35].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador.</p></td>   
                        <td className="textEEO1" >{data[36].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores.</p></td>   
                        <td className="textEEO1" >{data[37].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo.</p></td>   
                        <td className="textEEO1" >{data[38].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>He presenciado actos de violencia en mi centro de trabajo.</p></td>   
                        <td className="textEEO1" >{data[39].Respuestas.toUpperCase()}</td> 
                    </tr>
                    
                    <tr>
                        <td className="textEEO1">7</td>
                        <td className="textEEO1"><strong><font size="2" color="blue">VII. En mi trabajo debo brindar servicio a clientes o usuarios</font></strong></td>    
                        <td></td>   
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Atiendo clientes o usuarios muy enojados.</p></td>   
                        <td className="textEEO1">{data[40].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td ></td>
                        <td className="textEEO1" width="82%"><p>Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas.</p></td>
                        <td className="textEEO1">{data[41].Respuestas.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Para hacer mi trabajo debo demostrar sentimientos distintos a los míos.</p></td>   
                        <td className="textEEO1">{data[42].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td className="textEEO1">8</td>
                        <td className="textEEO1"><strong><font size="2" color="blue">VIII. Soy jefe de otros trabajadores</font></strong></td>    
                        <td></td>   
                    </tr>
                    <tr>
                        <td ></td>
                        <td className="textEEO1"width="82%"><p>Comunican tarde los asuntos de trabajo.</p></td>
                        <td className="textEEO1">{data[43].Respuestas.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Dificultan el logro de los resultados del trabajo.</p></td>   
                        <td className="textEEO1">{data[44].Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td className="textEEO1"><p>Ignoran las sugerencias para mejorar su trabajo.</p></td>   
                        <td className="textEEO1">{data[45].Respuestas.toUpperCase()}</td> 
                    </tr>
                </tbody>
            </table>      
            </Card>
            </center>
            <div>
              <div style={{ position: "absolute", left: "-5000px", top: 0 }}>
                  <PDFExport
                      paperSize="letter"
                      margin="1cm"
                      pageTemplate={PageTemplate}
                      forcePageBreak=".page-break"
                      fileName={`${estado.nombre} ${estado.ApellidoP} ${estado.ApellidoM} Reporte Individual RP ${new Date().getFullYear()}`}
                      ref={(component) => this.pdfExportComponent = component}
                  >
                      <div style={{ width: "550px" }}>
                          <center><img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/></center>  
                          <Card style = {{width:550}} className="text-left mt-2 ">   
                              <center><p className="textabla1">Reporte individual para identificar los factores de Riesgo Psicosocial en los centros de trabajo</p></center><br/>
                              <p className="textabla2"> <strong>{localStorage.getItem("razonsocial")}</strong></p>
                              <p className="textabla2">Representante: <strong>{representante}</strong></p>         
                              <p className="textabla2">{estado.nombre} {estado.ApellidoP} {estado.ApellidoM}</p>
                              <p className="textabla2"><strong>{periodoEvaluacion}</strong></p><br/>
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
                          <p className="textabla2"><strong>GUÍA DE REFERENCIA III CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO</strong></p> <br/>
                          </center>
                          <center>{titulo1}</center>    
                          <MDBTable width="500" className="table" striped bordered small>
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} width="80%" className="textabla3" align="left">Mi trabajo me exige hacer mucho esfuerzo físico.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[0].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3"  width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me preocupa sufrir un accidente en mi trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[1].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Considero que las actividades que realizo son peligrosas</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[2].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[3].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Por la cantidad de trabajo que tengo debo trabajar sin parar.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[4].Respuestas.toUpperCase()}</td>
                            </tr> 
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Considero que es necesario mantener un ritmo de trabajo acelerado.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[5].Respuestas.toUpperCase()}</td>
                            </tr> 
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo exige que esté muy concentrado.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[6].Respuestas.toUpperCase()}</td>
                            </tr> 
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo requiere que memorice mucha información.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[7].Respuestas.toUpperCase()}</td>
                            </tr> 
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo exige que atienda varios asuntos al mismo tiempo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[8].Respuestas.toUpperCase()}</td>
                            </tr> 
                          </MDBTable>  
                          <center>{titulo2}</center>    
                          <MDBTable width="500" className="table" striped bordered small>                             
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En mi trabajo soy responsable de cosas de mucho valor.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[9].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Respondo ante mi jefe por los resultados de toda mi área de trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[10].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En mi trabajo me dan órdenes contradictorias.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[11].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Considero que en mi trabajo me piden hacer cosas innecesarias.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[12].Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo3}</center>    
                          <MDBTable width="500" className="table" striped bordered small>  
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Trabajo horas extras más de tres veces a la semana.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[13].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo me exige laborar en días de descanso, festivos o fines de semana.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[14].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[15].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Pienso en las actividades familiares o personales cuando estoy en mi trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[16].Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo4}</center>    
                          <MDBTable width="500" className="table" striped bordered small>  
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo permite que desarrolle nuevas habilidades.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[17].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En mi trabajo puedo aspirar a un mejor puesto.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[18].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Durante mi jornada de trabajo puedo tomar pausas cuando las necesito.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[19].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[20].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Puedo cambiar el orden de las actividades que realizo en mi trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[21].Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo5}</center>    
                          <MDBTable width="500" className="table" striped bordered small>    
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me informan con claridad cuáles son mis funciones.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[22].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me explican claramente los resultados que debo obtener en mi trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[23].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me informan con quién puedo resolver problemas o asuntos de trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[24].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me permiten asistir a capacitaciones relacionadas con mi trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[25].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Recibo capacitación útil para hacer mi trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[26].Respuestas.toUpperCase()}</td>
                            </tr>
                            
                          </MDBTable>
                          <center>{titulo6}</center>    
                          <MDBTable width="500" className="table" striped bordered small>      
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi jefe tiene en cuenta mis puntos de vista y opiniones.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[27].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[28].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Puedo confiar en mis compañeros de trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[29].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Cuando tenemos que realizar trabajo de equipo los compañeros colaboran.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[30].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mis compañeros de trabajo me ayudan cuando tengo dificultades.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[31].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">En mi trabajo puedo expresarme libremente sin interrupciones.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[32].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Recibo críticas constantes a mi persona y/o trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[33].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[34].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[35].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[36].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[37].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[38].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">He presenciado actos de violencia en mi centro de trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[39].Respuestas.toUpperCase()}</td>
                            </tr>
                           
                          </MDBTable>
                          <center>{titulo7}</center>    
                          <MDBTable width="500" className="table" striped bordered small>      
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Atiendo clientes o usuarios muy enojados.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[40].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[41].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" width="5%" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Para hacer mi trabajo debo demostrar sentimientos distintos a los míos.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[42].Respuestas.toUpperCase()}</td>
                            </tr>
                          </MDBTable>
                          <center>{titulo8}</center>    
                          <MDBTable width="500" className="table" striped bordered small>        
                           
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Comunican tarde los asuntos de trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[43].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Dificultan el logro de los resultados del trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[44].Respuestas.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td className="textabla3" style= {{padding:"2px"}}></td>
                                <td style= {{padding:"5px"}} className="textabla3" align="left"  width="80%">Ignoran las sugerencias para mejorar su trabajo.</td>
                                <td className="textabla3"  style= {{padding:"2px"}}  align="center"><br/>{data[45].Respuestas.toUpperCase()}</td>
                            </tr>                           
                          </MDBTable>
                      </div>
                  </PDFExport>
              </div>
            </div> 
      </React.Fragment>
    );
    }
}
 
export default ReportRP;