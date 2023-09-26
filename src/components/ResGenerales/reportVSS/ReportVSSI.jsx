import React, { Component } from 'react'
import { Card,Button } from 'antd';
import diagnostico from '../../images/diagnostico.png'
import { PDFExport }  from '@progress/kendo-react-pdf';
import PageTemplate from '../pageTemplate.jsx';
import {MDBTable} from 'mdbreact';
import logo from '../../images/logo.jpg'

class ReportVSSI extends Component {
    pdfExportComponent ;
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        const { dia1,dia2,dia3,dia4,dia5,dia6,dia7,dia8,dia9,dia10,dia11,dia12,dia13,dia14,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,
                value21,value22,value23,value24,value25,value26,value27,value28,value29,value30,value31,value32,value33,value34,value35,value36,value37,value38,value39,value40,
                value41,value42,value43,value44,value45,value46,value47,value48,value49,value50,value51,value52,value53,value54,value55,value56,value57,value58,value59,value60,
                value61,value62,value63,value64,value65,value66,value67,value68,value69,value70,value71,value72,value73,value74,value75,value76,value77,value78,value79,value80,
                value81,value82,value83,value84,value85,value86,value87,value88,value89,value90,value91,value92,value93,value94,value95,value96,value97,value98,value99,value100,
                value101,value102,value103,value104,value105,value106,value107,value108,value109,value110,value111,estadoResultados } = this.props

                console.log("dia1",dia1)
                console.log("value3",value3)

            let representante = localStorage.getItem("nombre") + " " + localStorage.getItem("apellidos")
            let periodoEvaluacion = localStorage.getItem("periodo")
            var LaFecha=new Date();
            var Mes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
            var diasem = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
            var diasemana=LaFecha.getDay();
            var fechaCompleta="";
            var NumeroDeMes="";    
            NumeroDeMes=LaFecha.getMonth();
            fechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
            let titulo1 = <font color="blue">I.- Días de la semana </font>
            let titulo2 = <font color="blue">II.- Conceptos elementales para seleccionar a las personas trabajadoras bajo la modalidad de Teletrabajo</font>
            let titulo3 = <font color="blue">III.- Organización para el trabajo</font>
            let titulo4 = <font color="blue">IV.- Para agentes físicos en el lugar de trabajo Espacio físico (general)</font>
    
            let titulo5 = <font color="blue">V.- Iluminación</font>
            let titulo6 = <font color="blue">VI.- Ventilación</font>
            let titulo7 = <font color="blue">VII.- Temperatura</font>
            let titulo8 = <font color="blue">VIII.- Ruido</font>
            let titulo9 = <font color="blue">IX.- Para agentes mecánicos</font>
            let titulo10 = <font color="blue">X.- Para agentes químicos</font>
            let titulo11 = <font color="blue">XI.- Para factores de riesgo ergonómico</font>
            let titulo12 = <font color="blue">XII.- Para factores de riesgo psicosocial</font>
            let titulo13 = <font color="blue">XIII.- Para agentes físicos</font>
        return ( 
            <div>
                <center>
                <Card style={{width:"100%",padding:"25px",marginLeft:"3%"}}title = {<h6><strong>Resultados individuales de la evaluación VSS</strong></h6>} extra = {<div><Button type="primary" className="text-white" onClick={(e) => { this.pdfExportComponent.save(); }}>Descargar reporte</Button>&nbsp;&nbsp;&nbsp;<Button type="dashed" danger onClick={e=>window.location.reload()}>Cerrar</Button></div>}>
                    <center>
                    <table style={{width:"80%"}}>
                        <tr>
                            <td width="70%">
                                <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100}}/>
                            </td>
                            <td width="30%" >
                                <img src={diagnostico} alt="logo" style = {{width:150}}/> 
                            </td>
                        </tr>
                    </table>    
                    </center>
                    &nbsp;&nbsp;&nbsp; 
                    <p  style={{marginTop:"2%"}}><strong>CUESTIONARIO PARA IDENTIFICAR LA VERIFICACIÓN DE LAS CONDICIONES DE SEGURIDAD Y SALUD DEL LUGAR DE TRABAJO				<br/></strong></p>
                <table className="table table-borderless table-small" style={{marginTop:"5%",alignItems:"left",marginLeft:"5%"}}>
                    <tr>
                        <td>
                            <strong>{localStorage.getItem("razonsocial")}</strong>
                        </td>
                    </tr> 
                    <tr>
                        <td>
                            <strong>{estadoResultados[0].nombre} {estadoResultados[0].ApellidoP} {estadoResultados[0].ApellidoM}</strong>                    
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>{estadoResultados[0].RFC}</strong>                    
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>{estadoResultados[0].correo}</strong>                    
                        </td>
                    </tr>    
                </table>
                
                <table style={{marginTop:"2%"}} className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><strong><font size="2" color="blue">Sección I &nbsp;&nbsp;&nbsp;{titulo1}</font></strong></td>    
                            <td></td>   
                        </tr>
                        <tr>
                            <td ></td>
                            <td width="91%"><p>Mencione los días de la semana que actualmente trabaja presencialmente en el centro de trabajo</p></td>
                            <td className='textabla2'>{dia1 + " " + dia2 + " " + dia3 + " " + dia4 + " " + dia5 + " " + dia6 + " " + dia7}</td>
                        </tr>
                        <tr>
                            <td ></td>
                            <td width="91%"><p>Mencione los días de la semana que le gustaría trabajar en la modalidad de Teletrabajo</p></td>
                            <td className='textabla2'>{dia8 + " " + dia9 + " " + dia10 + " " + dia11 + " " + dia12 + " " + dia13 + " " + dia14}</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <th ><strong><font size="2" color="blue">{titulo2}</font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td><p>¿Usted trabajaría en la modalidad de Teletrabajo de forma voluntaria?</p></td>   
                            <td className='textabla2'>{value3.Respuestas.toUpperCase()}<br/><br/><br/></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td><p>¿Usted se incorporaría a la modalidad de Teletrabajo por imposición del patrón?</p></td>   
                            <td  className="textabla2">{value4.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td><p>¿Ha pensado Usted en algún lugar que pudiera seleccionar como lugar de trabajo para realizar Teletrabajo?</p></td>   
                            <td  className="textabla2">{value5.Respuestas.toUpperCase()}</td> 
                        </tr>
                      
                        <tr>
                            <td></td>
                            <td><p>¿El lugar que usted pudiera tener en mente como lugar de trabajo para realizar Teletrabajo es privado?</p></td>   
                            <td  className="textabla2">{value6.Respuestas.toUpperCase()}</td> 
                        </tr>

                        <tr>
                            <td></td>
                            <td><p>¿En el lugar de trabajo que usted ocuparía para realizar el Teletrabajo, existen menores de edad, <br/><br/><br/> o adultos mayores, o personas con alguna discapacidad que requieran de su atención?</p></td>   
                            <td  className="textabla2">{value7.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td><p>¿Para realizar su trabajo solamente utiliza las TIC´s [Tecnologías de la Información y Comunicación, <br/><br/><br/> como por ejemplo computadoras  o tabletas electrónicas]?</p></td>   
                            <td  className="textabla2">{value8.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td><p>¿El porcentaje de tiempo de su jornada laboral contenida en su contrato de trabajo, que desearía trabajar <br/><br/><br/> en la modalidad Teletrabajo,  es mayor a 40%?</p></td>   
                            <td  className="textabla2">{value9.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td><p>En el supuesto de que se incorpore a la lista de personas trabajadoras bajo la modalidad de Teletrabajo ¿estaría<br/><br/><br/> disponible a asistir  al centro de trabajo en los días considerados en la modalidad de Teletrabajo?</p></td>   
                            <td  className="textabla2">{value10.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td><p>¿Considera que podría encontrarse laborando en la modalidad de Teletrabajo con supervisión mínima de su trabajo <br/><br/><br/>y tiempo de la jornada laboral?</p></td>   
                            <td  className="textabla2">{value11.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td><p>¿Para incursionar en la modalidad de Teletrabajo requiere necesariamente que el patrón le proporcione mobiliario<br/><br/><br/> que establece la Ley?</p></td>   
                            <td  className="textabla2">{value12.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td><p>¿Para incursionar en la modalidad de Teletrabajo requiere necesariamente que el patrón le proporcione equipo<br/><br/><br/> (software) que establece la Ley?</p></td>   
                            <td  className="textabla2">{value13.Respuestas.toUpperCase()}</td> 
                        </tr><tr>
                            <td></td>
                            <td><p>¿Para incursionar en la modalidad de Teletrabajo requiere necesariamente que el patrón le proporcione equipo<br/><br/><br/> (hardware) que establece la Ley?</p></td>   
                            <td  className="textabla2">{value14.Respuestas.toUpperCase()}</td> 
                        </tr>

                        <tr>
                            <th>3</th>
                            <th><strong><font size="2" color="blue"><p>{titulo3}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td><p>¿Al estar en la modalidad de trabajo, considera que podría cumplir con sus metas y proyectos de trabajo al <br/><br/><br/>estar expuesto durante su  jornada laboral a interrupciones por familiares o por otras personas ajenas a su trabajo?</p></td>   
                            <td className="textabla2">{value15.Respuestas.toUpperCase()}</td> 
                        </tr>
                       
                        <tr>
                            <th>4</th>
                            <th><strong><font size="2" color="blue"><p>{titulo4}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo seleccionado para realizar Teletrabajo dispone de un espacio físico de al menos 2 metros <br/><br/><br/>cuadrados para ser utilizarlo  como plano de trabajo, y una altura de al menos 2,5 metros?</td>   
                            <td  className="textabla2">{value16.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo seleccionado para realizar Teletrabajo dispone de un espacio físico de una altura de al menos<br/><br/><br/> 2,5 metros?</td>   
                            <td  className="textabla2">{value17.Respuestas.toUpperCase()}</td> 
                        </tr>

                        <tr>
                            <th>5</th>
                            <th><strong><font size="2" color="blue"><p>{titulo5}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo que usted destinaría para el Teletrabajo cuenta con iluminación natural (luz del sol) o <br/><br/><br/> artificial (lámparas,  luminarias o focos) para la jornada de trabajo?</td>   
                            <td  className="textabla2">{value18.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Considera que la luz natural en el lugar de trabajo, con la que realizaría Teletrabajo, podría ser molesta para su visión?</td>   
                            <td  className="textabla2">{value19.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La posición de las lámparas, focos o luminarias del lugar de trabajo en las que realizaría Teletrabajo <br/><br/><br/>podrían producirle reflejos  molestos para su visión?</td>   
                            <td  className="textabla2">{value20.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo que usted utilizaría para realizar el Teletrabajo cuenta con lámparas de LED?</td>   
                            <td  className="textabla2">{value21.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo, donde colocaría los equipos de las TIC, se evitaría el deslumbramiento de la <br/><br/><br/> luz que entra por la ventana u por otra fuente de iluminación?</td>   
                            <td  className="textabla2">{value22.Respuestas.toUpperCase()}</td> 
                        </tr>

                        <tr>
                            <th>6</th>
                            <th><strong><font size="2" color="blue"><p>{titulo6}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo en donde realizaría el Teletrabajo cuenta con ventanas cerca del plano de trabajo<br/><br/><br/>  (escritorio o mesa de trabajo)?</td>   
                            <td  className="textabla2">{value23.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En caso de que cuente con ventanas el lugar de trabajo en donde realizaría el Teletrabajo, éstas se<br/><br/><br/>  encuentran normalmente cerradas?</td>   
                            <td  className="textabla2">{value24.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo en el que realizaría Teletrabajo cuenta con aire acondicionado?</td>   
                            <td  className="textabla2">{value25.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <th>7</th>
                            <th><strong><font size="2" color="blue"><p>{titulo7}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La temperatura del lugar de trabajo que utilizaría para realizar Teletrabajo le parece muy fría como <br/><br/><br/> para requerir del uso de ropa de abrigo?</td>   
                            <td  className="textabla2">{value26.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Considera que la temperatura de lugar de trabajo que destinaría para realizar Teletrabajo es alta como <br/><br/><br/> para requerir de ventilación adicional con un ventilador o aire acondicionado?</td>   
                            <td  className="textabla2">{value27.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La altura del lugar de trabajo que utilizaría para el Teletrabajo es de más de dos metros y medio?</td>   
                            <td  className="textabla2">{value28.Respuestas.toUpperCase()}</td> 
                        </tr>

                        <tr>
                            <th>8</th>
                            <th><strong><font size="2" color="blue"><p>{titulo8}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo que ocuparía para realizar Teletrabajo se percibe ruido de la calle, de patio o de<br/><br/><br/> otro lugar cercano que le  impida concentrarse en el Teletrabajo?</td>   
                            <td  className="textabla2">{value29.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo que utilizaría para el Teletrabajo se percibe un volumen alto de los aparatos de <br/><br/><br/>sonido como la televisión,  la radio, o la música de tal manera que no pudiera concentrarse en sus tareas?</td>   
                            <td  className="textabla2">{value30.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <th>9</th>
                            <th><strong><font size="2" color="blue"><p>{titulo9}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El área de trabajo que destinaría como lugar de trabajo está separada de otras áreas por elementos físicos  <br/><br/><br/>como paredes, puertas, ventanas, canceles o elementos similares?</td>   
                            <td  className="textabla2">{value31.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Los pisos del lugar de trabajo que destinaría al Teletrabajo están despejados y libres de elementos (sillas, <br/><br/><br/> bancos, cajas u otro  tipo de artículos) que le pudieran generar tropiezo o caída?</td>   
                            <td  className="textabla2">{value32.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Dispondría usted de un botiquín de primeros auxilios cerca al lugar de trabajo donde realizaría el Teletrabajo?</td>   
                            <td  className="textabla2">{value33.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo que usaría para realizar Teletrabajo existe mobiliario con esquinas o bordes afilados<br/><br/><br/> o salientes que le  pudieran provocar que se golpeara, raspara o cortara en manos o pies?</td>   
                            <td  className="textabla2">{value34.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Dispone cerca del lugar de trabajo de un directorio telefónico de números de emergencia?</td>   
                            <td  className="textabla2">{value35.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Dispone de instalaciones eléctricas (contactos eléctricos) en el lugar de trabajo que utilizaría para conectar <br/><br/><br/>los equipos de las TIC?</td>   
                            <td  className="textabla2">{value36.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo que destinaría para el Teletrabajo utilizaría multicontactos para conectar el equipo TIC? </td>   
                            <td  className="textabla2">{value37.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo que utilizaría para realizar Teletrabajo las instalaciones eléctricas tiene  <br/><br/><br/>cables expuestos, es decir los cables se encuentran por ejemplo fuera de la caja de los contactos eléctricos?</td>   
                            <td  className="textabla2">{value38.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo que ocuparía para el Teletrabajo, el equipo de las TIC se conectaría a un<br/><br/><br/> contacto eléctrico a una distancia mayor de un metro?</td>   
                            <td  className="textabla2">{value39.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo que destinaría para realizar el Teletrabajo, sabe si el contacto eléctrico <br/><br/><br/>que utilizaría para alimentar el equipo de las TIC cuenta con conexión a tierra física?</td>   
                            <td  className="textabla2">{value40.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Dispone de un extintor disponible cerca de su lugar de trabajo que destinaría para realizar el Teletrabajo?</td>   
                            <td  className="textabla2">{value41.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <th>10</th>
                            <th><strong><font size="2" color="blue"><p>{titulo10}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el espacio físico que destinaría como lugar de trabajo, se perciben olores de sustancias químicas <br/><br/><br/>(solventes, pinturas, humo de cigarro o polvos de aserrín) que le parezcan desagradables? </td>   
                            <td  className="textabla2">{value42.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Usted o alguien más fuma dentro del lugar de trabajo que utilizaría para realizar el Teletrabajo?</td>   
                            <td  className="textabla2">{value43.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo que usted ocuparía para realizar el Teletrabajo, se concentran los olores de <br/><br/><br/>la cocción de alimentos como asados de carne, chiles toreados, entre otros? </td>   
                            <td  className="textabla2">{value44.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <th>11</th>
                            <th><strong><font size="2" color="blue"><p>{titulo11}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Cuenta en el lugar de trabajo que destinaría para el Teletrabajo con alguna silla o asiento disponible <br/><br/><br/> para realizar estas actividades? </td>   
                            <td  className="textabla2">{value45.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La mesa, escritorio o superficie del lugar de trabajo que ocuparía para el Teletrabajo tiene una altura <br/><br/><br/>entre 72 cm y 76 cm</td>   
                            <td  className="textabla2">{value46.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <th>12</th>
                            <th><strong><font size="2" color="blue"><p>{titulo12}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Usted estaría dispuesto a realizar Teletrabajo para su patrón?</td>   
                            <td  className="textabla2">{value47.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En caso de que usted realizara Teletrabajo, tendría inconvenientes para llevarlo a cabo sin que para ello <br/><br/><br/>la familia fuese un obstáculo? </td>   
                            <td  className="textabla2">{value48.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el supuesto de que usted realizara Teletrabajo, considera que se sentiría apartado y degradado de su<br/><br/><br/> centro de trabajo?</td>   
                            <td  className="textabla2">{value49.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Usted considera que si, incursiona en la modalidad de Teletrabajo, éste podría interferir con los tiempos <br/><br/><br/>para la atención delas actividades del trabajo y los tiempos para la familia?</td>   
                            <td  className="textabla2">{value50.Respuestas.toUpperCase()}</td> 
                        </tr>


                        <tr>
                            <th>13</th>
                            <th><strong><font size="2" color="blue"><p>Sección II &nbsp;&nbsp;&nbsp;{titulo13} &nbsp;&nbsp;{titulo5}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo que usted determinó para el Teletrabajo tiene iluminación natural? (luz del sol)</td>   
                            <td  className="textabla2">{value51.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo que usted utiliza para realizar el Teletrabajo cuenta con lámparas incandescentes?<br/><br/><br/> (focos de filamento)</td>   
                            <td  className="textabla2">{value52.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo que usted destinó para realizar el Teletrabajo cuenta con lámparas de fluorescentes?<br/><br/><br/> (luminarias)</td>   
                            <td  className="textabla2">{value53.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Considera que la luz con la que realiza Teletrabajo en su lugar de trabajo es molesta para su visión?</td>   
                            <td  className="textabla2">{value54.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La posición de las lámparas, focos o luminarias del lugar de trabajo en las que realiza Teletrabajo le <br/><br/><br/>producen reflejos molestos para su visión?</td>   
                            <td  className="textabla2">{value55.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo que usted utiliza para el Teletrabajo tiene lámparas de LED?</td>   
                            <td  className="textabla2">{value56.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo, donde coloca los equipos de las TIC, evita el deslumbramiento de la luz que <br/><br/><br/>entra por la ventana upor otra fuente de iluminación?</td>   
                            <td  className="textabla2">{value57.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <th>14</th>
                            <th><strong><font size="2" color="blue"><p>{titulo6}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo en donde lleva a cabo el Teletrabajo cuenta con ventanas cerca?</td>   
                            <td  className="textabla2">{value58.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En caso de que cuente con ventanas el lugar de trabajo en donde realiza Teletrabajo, éstas se <br/><br/><br/>encuentran normalmente cerradas?</td>   
                            <td  className="textabla2">{value59.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo en el que desarrolla Teletrabajo cuenta con aire acondicionado?</td>   
                            <td  className="textabla2">{value60.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <th>15</th>
                            <th><strong><font size="2" color="blue"><p>{titulo7}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La temperatura del lugar de trabajo que emplea para el Teletrabajo le parece muy fría como para <br/><br/><br/>requerir del uso de ropa de abrigo? </td>   
                            <td  className="textabla2">{value61.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Considera que la temperatura de lugar de trabajo que utiliza para el Teletrabajo es alta como para<br/><br/><br/> requerir de ventilación adicional con un ventilador o aire acondicionado?</td>   
                            <td  className="textabla2">{value62.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La altura del lugar de trabajo que emplea para el Teletrabajo es de más de dos metros y medio?</td>   
                            <td  className="textabla2">{value63.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <th>16</th>
                            <th><strong><font size="2" color="blue"><p>{titulo8}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo que ocupa para realizar Teletrabajo se percibe ruido de la calle, de patio o <br/><br/><br/>de otro lugar cercano que le impida concentrarse en el Teletrabajo?</td>   
                            <td  className="textabla2">{value64.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El espacio destinado al Teletrabajo está alejado del ruido o de otras distracciones que pudieran <br/><br/><br/>interferir con las actividadesdel Teletrabajo?</td>   
                            <td  className="textabla2">{value65.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td  className="textabla2">{value66.Respuestas.toUpperCase()}</td> 
                        </tr>

                        <tr>
                            <th>17</th>
                            <th><strong><font size="2" color="blue"><p>{titulo9}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El área que destinó como lugar de trabajo está separada de otras áreas por elementos físicos<br/><br/><br/> como paredes, puertas, ventanas,canceles o elementos similares?</td>   
                            <td  className="textabla2">{value67.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La superficie de su plano de trabajo (mesa, escritorio, barra u otro elemento similar) le permite<br/><br/><br/> realizar sus actividades de Teletrabajo de manera similar al realizado en el centro de trabajo?</td>   
                            <td  className="textabla2">{value68.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En caso de que sus tareas de Teletrabajo, requiera de transcripción de documentos impresos a los <br/><br/><br/>equipos de las TIC dispone de  un soporte para documentos que le faciliten estas tareas en el lugar de trabajo?</td>   
                            <td  className="textabla2">{value69.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo los elementos de uso más frecuente como teléfono, documentos o accesorios<br/><br/><br/> de escritorio (engrapadora,caja de lápices o clips entre otros) están al alcance de las actividades del Teletrabajo que realiza?</td>   
                            <td  className="textabla2">{value70.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Los pasillos y las puertas de su lugar de trabajo se encuentran permanentemente despejados de objetos<br/><br/><br/> que interfieran a su libre desplazamiento?</td>   
                            <td  className="textabla2">{value71.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El espacio de trabajo se mantiene generalmente libre de basura, desorden y líquidos inflamables?</td>   
                            <td  className="textabla2">{value72.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Los pisos del lugar de trabajo que determinó para el Teletrabajo están despejados y libres de <br/><br/><br/>elementos (sillas, bancos, cajas u otro tipo de artículos) que le pudieran generar tropiezo o caída?</td>   
                            <td  className="textabla2">{value73.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En su caso, los cables que alimentan los equipos de las TIC se encuentran en el camino de acceso<br/><br/><br/> como pasillos al lugar de trabajo, que puedan convierten en obstrucciones para el libre acceso de entrada o salida?</td>   
                            <td  className="textabla2">{value74.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo que ocupa para realizar Teletrabajo existe mobiliario con esquinas o bordes<br/><br/><br/> afilados o salientes que le pudieran provocar que se golpeara, raspara o cortara en manos o pies?</td>   
                            <td  className="textabla2">{value75.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Cuenta con un directorio telefónico de números de emergencia cerca de su lugar de trabajo?</td>   
                            <td  className="textabla2">{value76.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>  ¿Dispone en su lugar de trabajo de instalaciones eléctricas (contactos eléctricos) para conectar <br/><br/><br/>los equipos de las TIC?</td>   
                            <td  className="textabla2">{value77.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En su lugar de trabajo para el Teletrabajo utiliza multicontactos para conectar el equipo TIC? </td>   
                            <td  className="textabla2">{value78.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Las instalaciones eléctricas de su lugar de trabajo para realizar Teletrabajo en tiene cables <br/><br/><br/>expuestos, es decir los cables se encuentran por ejemplo fuera de la caja de los contactos eléctricos?</td>   
                            <td  className="textabla2">{value79.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Los equipos utilizados para el Teletrabajo se conectan a un contacto eléctrico a una distancia<br/><br/><br/> mayor de un metro?</td>   
                            <td  className="textabla2">{value80.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Sabe usted si el contacto eléctrico que emplea para alimentar el equipo de las TIC en su lugar <br/><br/><br/>de trabajo para realizar el Teletrabajo cuenta con conexión a tierra física?</td>   
                            <td  className="textabla2">{value81.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Los contactos eléctricos de su lugar de trabajo se encuentran dañados, en malas condiciones a <br/><br/><br/>simple vista, como sucios rotos,flojos, o sin cubierta?</td>   
                            <td  className="textabla2">{value82.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo donde realiza el Teletrabajo, requiere del uso de cables conocidos como<br/><br/><br/> extensión para alimentar a los <br/><br/><br/>equipos de las TIC?</td>   
                            <td  className="textabla2">{value83.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Cuando no está en uso el equipo que usa para realizar el Teletrabajo, lo mantiene apagado o en<br/><br/><br/> modo de espera (suspender)?</td>   
                            <td  className="textabla2">{value84.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Dispone en el lugar de trabajo de un regulador contra sobretensiones eléctricas para proteger el <br/><br/><br/> equipo de TIC equipo con el que realiza Teletrabajo?</td>   
                            <td  className="textabla2">{value85.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el espacio físico que dispone como lugar de trabajo para realizar Teletrabajo se perciben olores <br/><br/><br/>de sustancias químicas  (solventes, pinturas, humo de cigarro o polvos de aserrín) que le parezcan desagradables? </td>   
                            <td  className="textabla2">{value86.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Usted o alguien más fuma dentro del lugar de trabajo que tiene destinado como lugar de trabajo para el Teletrabajo?</td>   
                            <td  className="textabla2">{value87.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo está ubicado en un ambiente libre de humo?</td>   
                            <td  className="textabla2">{value88.Respuestas.toUpperCase()}</td> 
                        </tr>

                        <tr>
                            <th>18</th>
                            <th><strong><font size="2" color="blue"><p>{titulo10}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La mesa, escritorio o superficie del lugar de trabajo que utiliza para el Teletrabajo tiene una <br/><br/><br/>altura entre 72 cm y 76 cm</td>   
                            <td  className="textabla2">{value89.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La silla que utiliza en su lugar de trabajo cuenta con cinco ruedas?</td>   
                            <td  className="textabla2">{value90.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Es posible ajustar la altura del asiento de su silla con respecto al piso? </td>   
                            <td  className="textabla2">{value91.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Si es posible ajustar la altura del asiento de su silla con respecto al piso, al hacerlo las <br/><br/><br/> plantas del píe le permiten descansarlos completamente en el piso?</td>   
                            <td  className="textabla2">{value92.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Su espalda queda completamente apoyada en el respaldo de la silla?</td>   
                            <td  className="textabla2">{value93.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Es posible ajustar el respaldo de su silla para apoyar completamente la espalda?</td>   
                            <td  className="textabla2">{value94.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El respaldo de la silla es capaz de soportar la curva lumbar de la espalda? (curva lumbar o<br/><br/><br/> espalda baja)</td>   
                            <td  className="textabla2">{value95.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La silla del lugar de trabajo en donde realiza el Teletrabajo cuenta con descansabrazos?</td>   
                            <td  className="textabla2">{value96.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En caso de que la silla del lugar de trabajo en donde realiza el Teletrabajo tenga <br/><br/><br/>descansabrazos, éstos son ajustables?</td>   
                            <td  className="textabla2">{value97.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Cuando está sentado la silla, en su lugar de trabajo, requiere de un reposapiés para <br/><br/><br/>apoyar las plantas de los pies?</td>   
                            <td  className="textabla2">{value98.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Considera usted que requiere de un apoyo lumbar en la silla del lugar de trabajo, es<br/><br/><br/> decir que requiere de algún elemento de soporte como un cojín en la espalda? </td>   
                            <td  className="textabla2">{value99.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Cuando realiza trabajos con equipos de TIC tiene posturas prolongadas en la misma <br/><br/><br/>posición, por ejemplo, permanece sentado en el mismo lugar, sin movimiento, por más de 60 minutos de forma continua?</td>   
                            <td  className="textabla2">{value100.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo se adapta al espacio físico, al equipo y al material relacionado <br/><br/><br/>con el Teletrabajo?</td>   
                            <td  className="textabla2">{value101.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿La brillantez que emiten los equipos para el manejo de las TIC le fatiga la vista al<br/><br/><br/> realizar las tareas de Teletrabajo?</td>   
                            <td  className="textabla2">{value102.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Al momento de teletrabajar en el lugar de trabajo, la distancia entre el monitor del <br/><br/><br/>equipo de las TIC y su cara (cuando tiene computadora de escritorio) se encuentra a una distancia de entre 30 y 50 cm.?</td>   
                            <td  className="textabla2">{value103.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿De acuerdo con las tareas a realizar en el lugar de trabajo, cuenta con un ratón o mouse <br/><br/><br/>indicador en el equipo de las TIC?</td>   
                            <td  className="textabla2">{value104.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿En el lugar de trabajo la distancia entre el teclado y los codos es insuficiente, de tal <br/><br/><br/>manera que le incomoda al teclear?</td>   
                            <td  className="textabla2">{value105.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿El lugar de trabajo es suficientemente amplio para que realice movimientos en el Teletrabajo<br/><br/><br/> sin que pueda tener una posturaforzada que le produzca tensión o lesión musculares?</td>   
                            <td  className="textabla2">{value106.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Tiene suficiente espacio debajo de la mesa de trabajo para evitar que las piernas se golpeen?</td>   
                            <td  className="textabla2">{value107.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Hay espacio en su lugar de trabajo para descansar los brazos cuando no teclea?</td>   
                            <td  className="textabla2">{value108.Respuestas.toUpperCase()}</td> 
                        </tr>


                        <tr>
                            <th>19</th>
                            <th><strong><font size="2" color="blue"><p>{titulo11}</p></font></strong></th>       
                            <td></td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Al realizar Teletrabajo, tiene inconvenientes para desarrollarlo sin que ello <br/><br/><br/>afecte o interfiera con las actividades de la familia? </td>   
                            <td  className="textabla2">{value109.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>¿Conoce algo sobre los ciclos de descanso de acuerdo con su actividad en el Teletrabajo?</td>   
                            <td  className="textabla2">{value110.Respuestas.toUpperCase()}</td> 
                        </tr>
                        <tr>
                            <td></td>
                            <td>Considera usted que el Teletrabajo le genera ansiedad, irritabilidad, estados <br/><br/><br/>depresivos, o fatiga mental</td>   
                            <td  className="textabla2">{value111.Respuestas.toUpperCase()}</td> 
                        </tr>
                       
                        
                    </tbody>
                </table>               
                </Card>
            </center>

            <div>
                    <div className="example-config">    
                    </div>
                    <div style={{ position: "absolute", left: "-5000px", top: 0 }}>
                        <PDFExport
                            paperSize="letter"
                            margin="1cm"
                            pageTemplate={PageTemplate}
                            forcePageBreak=".page-break"

                            fileName={`${estadoResultados[0].nombre} ${estadoResultados[0].ApellidoP} ${estadoResultados[0].ApellidoM} Reporte VSS ${new Date().getFullYear()}`}
                            ref={(component) => this.pdfExportComponent = component}
                        >
                            <div style={{ width: "530px" }}>
                                <center><img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/></center>  
                                <Card style = {{width:550}} className="text-left mt-2 ">   
                                <center><p className="textabla1">REPORTE INDIVIDUAL DE LA VRIFICACIÓN DE SEGURIDAD Y SALUD EN TELETRABAJO</p></center><br/>
                                <p className="textabla2"> <strong>{localStorage.getItem("razonsocial")}</strong></p>
                                <p className="textabla2">Representante: <strong>{representante}</strong></p>         
                                <p className="textabla2">{estadoResultados[0].nombre} {estadoResultados[0].ApellidoP} {estadoResultados[0].ApellidoM}</p>
                                <p className="textabla2"><strong>{periodoEvaluacion}</strong></p><br/>
                                <div style={{ position: "absolute", bottom: "10px", left: "360px" }}>
                                    <p className="textabla3"><strong>{fechaCompleta}</strong></p>
                                </div>
                                </Card>  
                                <center><img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,heigth:20}}/></center>
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
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <center><p className="textabla1"><strong>GUÍA DE REFERENCIA I - 
                                CUESTIONARIO PARA IDENTIFICAR LA VERIFICACIÓN DE LAS CONDICIONES DE SEGURIDAD Y SALUD DEL LUGAR DE TRABAJO</strong></p></center> <br/>  
                                <MDBTable width="500" className="table" striped bordered small style={{marginLeft:"2%"}}> 
                                    <tr>
                                        <td  className="textabla3">1</td>
                                        <td className="textabla3" align="left"width="85%"><strong><font size="1" color="blue">Sección I &nbsp;&nbsp;&nbsp;{titulo1}</font></strong></td>    
                                        <td></td>   
                                    </tr>
                                    <tr>
                                        <td ></td>
                                        <td className="textabla3"align="left" width="85%">Mencione los días de la semana que actualmente trabaja presencialmente en el centro de trabajo</td>
                                        <td className="textabla3">{dia1 + " " + dia2 + " " + dia3 + " " + dia4 + " " + dia5 + " " + dia6 + " " + dia7}</td>
                                    </tr>
                                    <tr>
                                        <td ></td>
                                        <td className="textabla3"align="left" width="85%">Mencione los días de la semana que le gustaría trabajar en la modalidad de Teletrabajo</td>
                                        <td className="textabla3">{dia8 + " " + dia9 + " " + dia10 + " " + dia11 + " " + dia12 + " " + dia13 + " " + dia14}</td>
                                    </tr>
                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                <td className="textabla3">2</td>
                                <td className="textabla3" width="85%" align="left"><strong><font size="1"  color="blue">{titulo2}</font></strong></td>       
                                <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3"align="left"  width="85%">¿Usted trabajaría en la modalidad de Teletrabajo de forma voluntaria?</td>   
                                    <td className="textabla3" >{value3.Respuestas.toUpperCase()}<br/></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3"align="left"  width="85%">¿Usted se incorporaría a la modalidad de Teletrabajo por imposición del patrón?</td>   
                                    <td className="textabla3" >{value4.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3"align="left" width="85%">¿Ha pensado Usted en algún lugar que pudiera seleccionar como lugar de trabajo para realizar Teletrabajo?</td>   
                                    <td className="textabla3" >{value5.Respuestas.toUpperCase()}</td> 
                                </tr>
                            
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3"align="left" width="85%">¿El lugar que usted pudiera tener en mente como lugar de trabajo para realizar Teletrabajo es privado?</td>   
                                    <td className="textabla3" >{value6.Respuestas.toUpperCase()}</td> 
                                </tr>

                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"width="85%">¿En el lugar de trabajo que usted ocuparía para realizar el Teletrabajo, existen menores de edad, <br/> o adultos mayores, o personas con alguna discapacidad que requieran de su atención?</td>   
                                    <td className="textabla3" >{value7.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3"align="left"width="85%">¿Para realizar su trabajo solamente utiliza las TIC´s [Tecnologías de la Información y Comunicación, <br/> como por ejemplo computadoras  o tabletas electrónicas]?</td>   
                                    <td className="textabla3" >{value8.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3"align="left" width="85%">¿El porcentaje de tiempo de su jornada laboral contenida en su contrato de trabajo, que desearía trabajar <br/> en la modalidad Teletrabajo,  es mayor a 40%?</td>   
                                    <td className="textabla3" >{value9.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left" width="85%">En el supuesto de que se incorpore a la lista de personas trabajadoras bajo la modalidad de Teletrabajo ¿estaría<br/> disponible a asistir  al centro de trabajo en los días considerados en la modalidad de Teletrabajo?</td>   
                                    <td className="textabla3" >{value10.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3"  align="left"  width="85%">¿Considera que podría encontrarse laborando en la modalidad de Teletrabajo con supervisión mínima de su trabajo <br/>y tiempo de la jornada laboral?</td>   
                                    <td className="textabla3" >{value11.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3"align="left" width="85%">¿Para incursionar en la modalidad de Teletrabajo requiere necesariamente que el patrón le proporcione mobiliario<br/> que establece la Ley?</td>   
                                    <td className="textabla3" >{value12.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3"align="left" width="85%">¿Para incursionar en la modalidad de Teletrabajo requiere necesariamente que el patrón le proporcione equipo<br/> (software) que establece la Ley?</td>   
                                    <td className="textabla3" >{value13.Respuestas.toUpperCase()}</td> 
                                </tr><tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left" width="85%">¿Para incursionar en la modalidad de Teletrabajo requiere necesariamente que el patrón le proporcione equipo<br/> (hardware) que establece la Ley?</td>   
                                    <td className="textabla3" >{value14.Respuestas.toUpperCase()}</td> 
                                </tr>
                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3">3</td>
                                    <td width="85%" className="textabla3" align="left"><strong><font size="1" color="blue">{titulo3}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left" width="85%">¿Al estar en la modalidad de trabajo, considera que podría cumplir con sus metas y proyectos de trabajo al <br/>estar expuesto durante su  jornada laboral a interrupciones por familiares o por otras personas ajenas a su trabajo?</td>   
                                    <td className="textabla3">{value15.Respuestas.toUpperCase()}</td> 
                                </tr>
                                </MDBTable>

                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                    <tr>
                                        <td className="textabla3">4</td>
                                        <td width="85%" align="left"  className="textabla3"><strong><font size="1" color="blue">{titulo4}</font></strong></td>       
                                        <td className="textabla3"></td> 
                                    </tr>
                                    <tr>
                                        <td className="textabla3"></td>
                                        <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo seleccionado para realizar Teletrabajo dispone de un espacio físico de al menos 2 metros <br/>cuadrados para ser utilizarlo  como plano de trabajo, y una altura de al menos 2,5 metros?</td>   
                                        <td className="textabla3" >{value16.Respuestas.toUpperCase()}</td> 
                                    </tr>
                                    <tr>
                                        <td className="textabla3"></td>
                                        <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo seleccionado para realizar Teletrabajo dispone de un espacio físico de una altura de al menos<br/> 2,5 metros?</td>   
                                        <td className="textabla3" >{value17.Respuestas.toUpperCase()}</td> 
                                    </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3">5</td>
                                    <td width="85%" align="left" className="textabla3"><strong><font size="1"  color="blue">{titulo5}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo que usted destinaría para el Teletrabajo cuenta con iluminación natural (luz del sol) o <br/> artificial (lámparas,  luminarias o focos) para la jornada de trabajo?</td>   
                                    <td className="textabla3" >{value18.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Considera que la luz natural en el lugar de trabajo, con la que realizaría Teletrabajo, podría ser molesta para su visión?</td>   
                                    <td className="textabla3" >{value19.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La posición de las lámparas, focos o luminarias del lugar de trabajo en las que realizaría Teletrabajo <br/>podrían producirle reflejos  molestos para su visión?</td>   
                                    <td className="textabla3" >{value20.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo que usted utilizaría para realizar el Teletrabajo cuenta con lámparas de LED?</td>   
                                    <td className="textabla3" >{value21.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo, donde colocaría los equipos de las TIC, se evitaría el deslumbramiento de la <br/> luz que entra por la ventana u por otra fuente de iluminación?</td>   
                                    <td className="textabla3" >{value22.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3">6</td>
                                    <td width="85%" className="textabla3" align="left"><strong><font size="1"  color="blue">{titulo6}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo en donde realizaría el Teletrabajo cuenta con ventanas cerca del plano de trabajo<br/> (escritorio o mesa de trabajo)?</td>   
                                    <td className="textabla3" >{value23.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En caso de que cuente con ventanas el lugar de trabajo en donde realizaría el Teletrabajo, éstas se<br/>  encuentran normalmente cerradas?</td>   
                                    <td className="textabla3" >{value24.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo en el que realizaría Teletrabajo cuenta con aire acondicionado?</td>   
                                    <td className="textabla3" >{value25.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3">7</td>
                                    <td width="85%" align="left" className="textabla3"><strong><font size="1" color="blue">{titulo7}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La temperatura del lugar de trabajo que utilizaría para realizar Teletrabajo le parece muy fría como <br/> para requerir del uso de ropa de abrigo?</td>   
                                    <td className="textabla3" >{value26.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Considera que la temperatura de lugar de trabajo que destinaría para realizar Teletrabajo es alta como <br/> para requerir de ventilación adicional con un ventilador o aire acondicionado?</td>   
                                    <td className="textabla3" >{value27.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La altura del lugar de trabajo que utilizaría para el Teletrabajo es de más de dos metros y medio?</td>   
                                    <td className="textabla3" >{value28.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3">8</td>
                                    <td className="textabla3" align="left" width="85%"><strong><font size="1" color="blue">{titulo8}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo que ocuparía para realizar Teletrabajo se percibe ruido de la calle, de patio o de<br/>otro lugar cercano que le  impida concentrarse en el Teletrabajo?</td>   
                                    <td className="textabla3" >{value29.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo que utilizaría para el Teletrabajo se percibe un volumen alto de los aparatos de <br/>sonido como la televisión,  la radio, o la música de tal manera que no pudiera concentrarse en sus tareas?</td>   
                                    <td className="textabla3" >{value30.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                <td className="textabla3">9</td>
                                <td className="textabla3" align="left" width="85%"><strong><font size="1" color="blue">{titulo9}</font></strong></td>       
                                <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El área de trabajo que destinaría como lugar de trabajo está separada de otras áreas por elementos físicos  <br/>como paredes, puertas, ventanas, canceles o elementos similares?</td>   
                                    <td className="textabla3" >{value31.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Los pisos del lugar de trabajo que destinaría al Teletrabajo están despejados y libres de elementos (sillas, <br/> bancos, cajas u otro  tipo de artículos) que le pudieran generar tropiezo o caída?</td>   
                                    <td className="textabla3" >{value32.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Dispondría usted de un botiquín de primeros auxilios cerca al lugar de trabajo donde realizaría el Teletrabajo?</td>   
                                    <td className="textabla3" >{value33.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo que usaría para realizar Teletrabajo existe mobiliario con esquinas o bordes afilados<br/> o salientes que le  pudieran provocar que se golpeara, raspara o cortara en manos o pies?</td>   
                                    <td className="textabla3" >{value34.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Dispone cerca del lugar de trabajo de un directorio telefónico de números de emergencia?</td>   
                                    <td className="textabla3" >{value35.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Dispone de instalaciones eléctricas (contactos eléctricos) en el lugar de trabajo que utilizaría para conectar <br/>los equipos de las TIC?</td>   
                                    <td className="textabla3" >{value36.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo que destinaría para el Teletrabajo utilizaría multicontactos para conectar el equipo TIC? </td>   
                                    <td className="textabla3" >{value37.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo que utilizaría para realizar Teletrabajo las instalaciones eléctricas tiene  <br/>cables expuestos, es decir los cables se encuentran por ejemplo fuera de la caja de los contactos eléctricos?</td>   
                                    <td className="textabla3" >{value38.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo que ocuparía para el Teletrabajo, el equipo de las TIC se conectaría a un<br/> contacto eléctrico a una distancia mayor de un metro?</td>   
                                    <td className="textabla3" >{value39.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo que destinaría para realizar el Teletrabajo, sabe si el contacto eléctrico <br/>que utilizaría para alimentar el equipo de las TIC cuenta con conexión a tierra física?</td>   
                                    <td className="textabla3" >{value40.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Dispone de un extintor disponible cerca de su lugar de trabajo que destinaría para realizar el Teletrabajo?</td>   
                                    <td className="textabla3" >{value41.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3">10</td>
                                    <td className="textabla3" align="left" width="85%"><strong><font size="1" color="blue">{titulo10}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left" width="85%">¿En el espacio físico que destinaría como lugar de trabajo, se perciben olores de sustancias químicas <br/>(solventes, pinturas, humo de cigarro o polvos de aserrín) que le parezcan desagradables? </td>   
                                    <td className="textabla3" >{value42.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left" width="85%">¿Usted o alguien más fuma dentro del lugar de trabajo que utilizaría para realizar el Teletrabajo?</td>   
                                    <td className="textabla3" >{value43.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left" width="85%">¿En el lugar de trabajo que usted ocuparía para realizar el Teletrabajo, se concentran los olores de <br/>la cocción de alimentos como asados de carne, chiles toreados, entre otros? </td>   
                                    <td className="textabla3" >{value44.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3">11</td>
                                    <td className="textabla3" width="85%" align="left"><strong><font size="1" color="blue">{titulo11}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left" width="85%">¿Cuenta en el lugar de trabajo que destinaría para el Teletrabajo con alguna silla o asiento disponible <br/> para realizar estas actividades? </td>   
                                    <td className="textabla3" >{value45.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La mesa, escritorio o superficie del lugar de trabajo que ocuparía para el Teletrabajo tiene una altura <br/>entre 72 cm y 76 cm</td>   
                                    <td className="textabla3" >{value46.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                <td className="textabla3">12</td>
                                <td className="textabla3" width="85%" align="left"><strong><font size="1"color="blue">{titulo12}</font></strong></td>       
                                <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Usted estaría dispuesto a realizar Teletrabajo para su patrón?</td>   
                                    <td className="textabla3" >{value47.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En caso de que usted realizara Teletrabajo, tendría inconvenientes para llevarlo a cabo sin que para ello <br/>la familia fuese un obstáculo? </td>   
                                    <td className="textabla3" >{value48.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el supuesto de que usted realizara Teletrabajo, considera que se sentiría apartado y degradado de su<br/> centro de trabajo?</td>   
                                    <td className="textabla3" >{value49.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Usted considera que si, incursiona en la modalidad de Teletrabajo, éste podría interferir con los tiempos <br/>para la atención delas actividades del trabajo y los tiempos para la familia?</td>   
                                    <td className="textabla3" >{value50.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3">13</td>
                                    <td className="textabla3" align="left" width="85%"><strong><font size="1" color="blue">Sección II &nbsp;&nbsp;&nbsp;{titulo13} &nbsp;&nbsp;{titulo5}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo que usted determinó para el Teletrabajo tiene iluminación natural? (luz del sol)</td>   
                                    <td className="textabla3" >{value51.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo que usted utiliza para realizar el Teletrabajo cuenta con lámparas incandescentes?<br/> (focos de filamento)</td>   
                                    <td className="textabla3" >{value52.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo que usted destinó para realizar el Teletrabajo cuenta con lámparas de fluorescentes?<br/> (luminarias)</td>   
                                    <td className="textabla3" >{value53.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Considera que la luz con la que realiza Teletrabajo en su lugar de trabajo es molesta para su visión?</td>   
                                    <td className="textabla3" >{value54.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La posición de las lámparas, focos o luminarias del lugar de trabajo en las que realiza Teletrabajo le <br/>producen reflejos molestos para su visión?</td>   
                                    <td className="textabla3" >{value55.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo que usted utiliza para el Teletrabajo tiene lámparas de LED?</td>   
                                    <td className="textabla3" >{value56.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo, donde coloca los equipos de las TIC, evita el deslumbramiento de la luz que <br/>entra por la ventana upor otra fuente de iluminación?</td>   
                                    <td className="textabla3" >{value57.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3">14</td>
                                    <td className="textabla3" align="left" width="85%"><strong><font size="1" color="blue">{titulo6}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo en donde lleva a cabo el Teletrabajo cuenta con ventanas cerca?</td>   
                                    <td className="textabla3" >{value58.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En caso de que cuente con ventanas el lugar de trabajo en donde realiza Teletrabajo, éstas se <br/>encuentran normalmente cerradas?</td>   
                                    <td className="textabla3" >{value59.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo en el que desarrolla Teletrabajo cuenta con aire acondicionado?</td>   
                                    <td className="textabla3" >{value60.Respuestas.toUpperCase()}</td> 
                                </tr>
                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3">15</td>
                                    <td width="85%" align="left" className="textabla3"><strong><font size="1"  color="blue">{titulo7}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La temperatura del lugar de trabajo que emplea para el Teletrabajo le parece muy fría como para <br/>requerir del uso de ropa de abrigo? </td>   
                                    <td className="textabla3" >{value61.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Considera que la temperatura de lugar de trabajo que utiliza para el Teletrabajo es alta como para<br/>requerir de ventilación adicional con un ventilador o aire acondicionado?</td>   
                                    <td className="textabla3" >{value62.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La altura del lugar de trabajo que emplea para el Teletrabajo es de más de dos metros y medio?</td>   
                                    <td className="textabla3" >{value63.Respuestas.toUpperCase()}</td> 
                                </tr>
                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td  className="textabla3">16</td>
                                    <td className="textabla3" width="85%" align="left" ><strong><font size="1" color="blue">{titulo8}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo que ocupa para realizar Teletrabajo se percibe ruido de la calle, de patio o <br/>de otro lugar cercano que le impida concentrarse en el Teletrabajo?</td>   
                                    <td className="textabla3" >{value64.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El espacio destinado al Teletrabajo está alejado del ruido o de otras distracciones que pudieran <br/>interferir con las actividadesdel Teletrabajo?</td>   
                                    <td className="textabla3" >{value65.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo que escogió para realizar el Teletrabajo se percibe un volumen alto de los aparatos de sonido como la televisión, la radio,<br/> o la música de ese lugar o de predios o lugares cercanos, de tal manera que no le permiten concentrarse en sus tareas?</td>
                                    <td className="textabla3" >{value66.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td  className="textabla3">17</td>
                                    <td className="textabla3" align="left" width="85%"><strong><font size="1" color="blue">{titulo9}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El área que destinó como lugar de trabajo está separada de otras áreas por elementos físicos<br/> como paredes, puertas, ventanas,canceles o elementos similares?</td>   
                                    <td className="textabla3" >{value67.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La superficie de su plano de trabajo (mesa, escritorio, barra u otro elemento similar) le permite<br/> realizar sus actividades de Teletrabajo de manera similar al realizado en el centro de trabajo?</td>   
                                    <td className="textabla3" >{value68.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En caso de que sus tareas de Teletrabajo, requiera de transcripción de documentos impresos a los <br/>equipos de las TIC dispone de  un soporte para documentos que le faciliten estas tareas en el lugar de trabajo?</td>   
                                    <td className="textabla3" >{value69.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo los elementos de uso más frecuente como teléfono, documentos o accesorios<br/> de escritorio (engrapadora,caja de lápices o clips entre otros) están al alcance de las actividades del Teletrabajo que realiza?</td>   
                                    <td className="textabla3" >{value70.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Los pasillos y las puertas de su lugar de trabajo se encuentran permanentemente despejados de objetos<br/> que interfieran a su libre desplazamiento?</td>   
                                    <td className="textabla3" >{value71.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El espacio de trabajo se mantiene generalmente libre de basura, desorden y líquidos inflamables?</td>   
                                    <td className="textabla3" >{value72.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Los pisos del lugar de trabajo que determinó para el Teletrabajo están despejados y libres de <br/>elementos (sillas, bancos, cajas u otro tipo de artículos) que le pudieran generar tropiezo o caída?</td>   
                                    <td className="textabla3" >{value73.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En su caso, los cables que alimentan los equipos de las TIC se encuentran en el camino de acceso<br/> como pasillos al lugar de trabajo, que puedan convierten en obstrucciones para el libre acceso de entrada o salida?</td>   
                                    <td className="textabla3" >{value74.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo que ocupa para realizar Teletrabajo existe mobiliario con esquinas o bordes<br/> afilados o salientes que le pudieran provocar que se golpeara, raspara o cortara en manos o pies?</td>   
                                    <td className="textabla3" >{value75.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Cuenta con un directorio telefónico de números de emergencia cerca de su lugar de trabajo?</td>   
                                    <td className="textabla3" >{value76.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left">¿Dispone en su lugar de trabajo de instalaciones eléctricas (contactos eléctricos) para conectar <br/>los equipos de las TIC?</td>   
                                    <td className="textabla3" >{value77.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En su lugar de trabajo para el Teletrabajo utiliza multicontactos para conectar el equipo TIC? </td>   
                                    <td className="textabla3" >{value78.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Las instalaciones eléctricas de su lugar de trabajo para realizar Teletrabajo en tiene cables <br/>expuestos, es decir los cables se encuentran por ejemplo fuera de la caja de los contactos eléctricos?</td>   
                                    <td className="textabla3" >{value79.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Los equipos utilizados para el Teletrabajo se conectan a un contacto eléctrico a una distancia<br/> mayor de un metro?</td>   
                                    <td className="textabla3" >{value80.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Sabe usted si el contacto eléctrico que emplea para alimentar el equipo de las TIC en su lugar <br/>de trabajo para realizar el Teletrabajo cuenta con conexión a tierra física?</td>   
                                    <td className="textabla3" >{value81.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Los contactos eléctricos de su lugar de trabajo se encuentran dañados, en malas condiciones a <br/>simple vista, como sucios rotos,flojos, o sin cubierta?</td>   
                                    <td className="textabla3" >{value82.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo donde realiza el Teletrabajo, requiere del uso de cables conocidos como<br/> extensión para alimentar a los <br/>equipos de las TIC?</td>   
                                    <td className="textabla3" >{value83.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Cuando no está en uso el equipo que usa para realizar el Teletrabajo, lo mantiene apagado o en<br/> modo de espera (suspender)?</td>   
                                    <td className="textabla3" >{value84.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Dispone en el lugar de trabajo de un regulador contra sobretensiones eléctricas para proteger el <br/> equipo de TIC equipo con el que realiza Teletrabajo?</td>   
                                    <td className="textabla3" >{value85.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el espacio físico que dispone como lugar de trabajo para realizar Teletrabajo se perciben olores <br/>de sustancias químicas  (solventes, pinturas, humo de cigarro o polvos de aserrín) que le parezcan desagradables? </td>   
                                    <td className="textabla3" >{value86.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Usted o alguien más fuma dentro del lugar de trabajo que tiene destinado como lugar de trabajo para el Teletrabajo?</td>   
                                    <td className="textabla3" >{value87.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo está ubicado en un ambiente libre de humo?</td>   
                                    <td className="textabla3" >{value88.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3"align="left">18</td>
                                    <td className="textabla3" width="85%" align="left"><strong><font size="1" color="blue">{titulo10}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La mesa, escritorio o superficie del lugar de trabajo que utiliza para el Teletrabajo tiene una <br/>altura entre 72 cm y 76 cm</td>   
                                    <td className="textabla3" >{value89.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La silla que utiliza en su lugar de trabajo cuenta con cinco ruedas?</td>   
                                    <td className="textabla3" >{value90.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Es posible ajustar la altura del asiento de su silla con respecto al piso? </td>   
                                    <td className="textabla3" >{value91.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Si es posible ajustar la altura del asiento de su silla con respecto al piso, al hacerlo las <br/> plantas del píe le permiten descansarlos completamente en el piso?</td>   
                                    <td className="textabla3" >{value92.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Su espalda queda completamente apoyada en el respaldo de la silla?</td>   
                                    <td className="textabla3" >{value93.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Es posible ajustar el respaldo de su silla para apoyar completamente la espalda?</td>   
                                    <td className="textabla3" >{value94.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El respaldo de la silla es capaz de soportar la curva lumbar de la espalda? (curva lumbar o<br/> espalda baja)</td>   
                                    <td className="textabla3" >{value95.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La silla del lugar de trabajo en donde realiza el Teletrabajo cuenta con descansabrazos?</td>   
                                    <td className="textabla3" >{value96.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En caso de que la silla del lugar de trabajo en donde realiza el Teletrabajo tenga <br/>descansabrazos, éstos son ajustables?</td>   
                                    <td className="textabla3" >{value97.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Cuando está sentado la silla, en su lugar de trabajo, requiere de un reposapiés para <br/>apoyar las plantas de los pies?</td>   
                                    <td className="textabla3" >{value98.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Considera usted que requiere de un apoyo lumbar en la silla del lugar de trabajo, es<br/> decir que requiere de algún elemento de soporte como un cojín en la espalda? </td>   
                                    <td className="textabla3" >{value99.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Cuando realiza trabajos con equipos de TIC tiene posturas prolongadas en la misma <br/>posición, por ejemplo, permanece sentado en el mismo lugar, sin movimiento, por más de 60 minutos de forma continua?</td>   
                                    <td className="textabla3" >{value100.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo se adapta al espacio físico, al equipo y al material relacionado <br/>con el Teletrabajo?</td>   
                                    <td className="textabla3" >{value101.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿La brillantez que emiten los equipos para el manejo de las TIC le fatiga la vista al<br/> realizar las tareas de Teletrabajo?</td>   
                                    <td className="textabla3" >{value102.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Al momento de teletrabajar en el lugar de trabajo, la distancia entre el monitor del <br/>equipo de las TIC y su cara (cuando tiene computadora de escritorio) se encuentra a una distancia de entre 30 y 50 cm.?</td>   
                                    <td className="textabla3" >{value103.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿De acuerdo con las tareas a realizar en el lugar de trabajo, cuenta con un ratón o mouse <br/>indicador en el equipo de las TIC?</td>   
                                    <td className="textabla3" >{value104.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿En el lugar de trabajo la distancia entre el teclado y los codos es insuficiente, de tal <br/>manera que le incomoda al teclear?</td>   
                                    <td className="textabla3" >{value105.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿El lugar de trabajo es suficientemente amplio para que realice movimientos en el Teletrabajo<br/> sin que pueda tener una posturaforzada que le produzca tensión o lesión musculares?</td>   
                                    <td className="textabla3" >{value106.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Tiene suficiente espacio debajo de la mesa de trabajo para evitar que las piernas se golpeen?</td>   
                                    <td className="textabla3" >{value107.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Hay espacio en su lugar de trabajo para descansar los brazos cuando no teclea?</td>   
                                    <td className="textabla3" >{value108.Respuestas.toUpperCase()}</td> 
                                </tr>

                                </MDBTable>
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
                                <tr>
                                    <td className="textabla3" align="left">19</td>
                                    <td className="textabla3" width="85%" align="left"><strong><font size="1"color="blue">{titulo11}</font></strong></td>       
                                    <td className="textabla3"></td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Al realizar Teletrabajo, tiene inconvenientes para desarrollarlo sin que ello <br/>afecte o interfiera con las actividades de la familia? </td>   
                                    <td className="textabla3" >{value109.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">¿Conoce algo sobre los ciclos de descanso de acuerdo con su actividad en el Teletrabajo?</td>   
                                    <td className="textabla3" >{value110.Respuestas.toUpperCase()}</td> 
                                </tr>
                                <tr>
                                    <td className="textabla3"></td>
                                    <td className="textabla3" align="left"  width="85%">Considera usted que el Teletrabajo le genera ansiedad, irritabilidad, estados <br/>depresivos, o fatiga mental</td>   
                                    <td className="textabla3"  >{value111.Respuestas.toUpperCase()}</td> 
                                </tr>
                                </MDBTable>
                            </div>
                        </PDFExport>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default ReportVSSI;