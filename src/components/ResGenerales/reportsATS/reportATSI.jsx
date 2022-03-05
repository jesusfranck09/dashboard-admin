import React, { Component } from 'react';
import {MDBTable} from 'mdbreact';
import diagnostico from '../../images/diagnostico.png'
import {Alert,Card,Button} from 'antd'
import { PDFExport }  from '@progress/kendo-react-pdf';
import PageTemplate from '../pageTemplate.jsx';
import logo from '../../images/logo.png'

class ReportATSI extends Component {
    pdfExportComponent ;
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {value1,value2,value3,value4,value5,value6,value7,value8,value9,
        value10,value12,value13,value14,value15,value16,estadoResultados}  = this.props
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
                   
        let ats;
        let atsReporte;
        if(atsDetectado === true){
            atsReporte= <Alert className="textabla2" message ={ <font size="1"face="arial">La evaluación reveló que el personal requiere canalización con un profesional</font>} type="error"/>
            ats = <Alert message ="La evaluación reveló que el personal requiere canalización con un profesional" type="error"/>
        }
        if(atsDetectado === false){
            atsReporte= <Alert className="textabla2" message ={<font size="1" face="arial">La evaluación reveló que el personal está en perfecto estado y nó requiere canalización con un profesional</font>} type="success"/>
            ats = <Alert message ="La evaluación reveló que el personal está en perfecto estado y nó requiere canalización con un profesional" type="success"/>
        }
        
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
        let titulo1 = <font color="blue">I.- Acontecimiento traumático severo </font>
        let titulo2 = <font color="blue">II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes)</font>
        let titulo3 = <font color="blue">III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento</font>
        let titulo4 = <font color="blue">IV.- Afectación (durante el último mes)</font>
 
        return ( 
        <React.Fragment>
            <center>
            <Card style={{width:"100%",padding:"25px"}}title = {<h6><strong>Resultados individuales de la evaluación ATS</strong></h6>} extra = {<div><Button type="primary" className="text-white" onClick={(e) => { this.pdfExportComponent.save(); }}>Descargar reporte</Button>&nbsp;&nbsp;&nbsp;<Button type="dashed" danger onClick={e=>window.location.reload()}>Cerrar</Button></div>}>
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
                <p  style={{marginTop:"2%"}}><strong>CUESTIONARIO PARA IDENTIFICAR LOS ACONTECIMIENTOS TRAUMÁTICOS SEVEROS EN LOS CENTROS DE TRABAJO<br/></strong></p>
            <table className="table table-borderless table-small" style={{marginTop:"5%",alignItems:"left"}}>
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
                        <td><strong><font size="2" color="blue">I.- Acontecimiento traumático severo</font></strong></td>    
                        <td></td>   
                    </tr>
                    <tr>
                        <td ></td>
                        <td width="91%"><p>¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como</p>
                            <p>los siguientes: Accidente que tenga como consecuencia la muerte la pérdida de un miembro o una </p>
                            <p>lesión grave, asaltos, actos violentos que derivaron en lesiones graves, secuestro, amenazas o</p>
                            <p> cualquier otro que ponga en riesgo su vida o salud, y/o la de otras personas?</p></td>
                        <td>{value1.Respuestas.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th><strong><font size="2" color="blue">II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes)</font></strong></th>       
                        <td></td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td><p>¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan</p> <p>malestares?</p></td>   
                        <td >{value2.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td><p>¿Ha tenido sueños de carácter recurrente sobre el acontecimiento</p>, <p>que le producen malestar?</p></td>   
                        <td >{value3.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <th>3</th>
                        <th><strong><font size="2" color="blue"><p>III.- Esfuerzo por evitar circunstancias parecidas o asociadas al</p><p> acontecimiento (durante el último mes)</p></font></strong></th>       
                        <td></td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td><p>¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones</p><p> o situaciones que le puedan recordar el acontecimiento?</p></td>   
                        <td>{value4.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td><p>¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas</p><p> que motivan recuerdos del acontecimiento?</p></td>   
                        <td >{value5.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td>¿Ha tenido dificultad para recordar alguna parte importante del evento?</td>   
                        <td >{value6.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td>¿Ha disminuido su interés en sus actividades cotidianas?</td>   
                        <td >{value7.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td>¿Se ha sentido usted alejado o distante de los demás?</td>   
                        <td >{value8.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td>¿Ha notado que tiene dificultad para expresar sus sentimientos?</td>   
                        <td >{value9.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td><p>¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas</p><p> o que tiene un futuro limitado?</p></td>   
                        <td >{value10.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <th>4</th>
                        <th><strong><font size="2" color="blue"><p>IV.- Afectación (durante el último mes)</p></font></strong></th>       
                        <td></td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td>¿Ha tenido usted dificultades para dormir?</td>   
                        <td >{value12.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td>¿Ha estado particularmente irritable o le han dado arranques de coraje?</td>   
                        <td >{value13.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td>¿Ha tenido dificultad para concentrarse?</td>   
                        <td >{value14.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td>¿Ha estado nervioso o constantemente en alerta?</td>   
                        <td >{value15.Respuestas.toUpperCase()}</td> 
                    </tr>
                    <tr>
                        <td></td>
                        <td>¿Se ha sobresaltado fácilmente por cualquier cosa?</td>   
                        <td >{value16.Respuestas.toUpperCase()}</td> 
                    </tr>
                </tbody>
            </table>               
            {ats}
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

                            fileName={`${estadoResultados[0].nombre} ${estadoResultados[0].ApellidoP} ${estadoResultados[0].ApellidoM} Reporte ATS ${new Date().getFullYear()}`}
                            ref={(component) => this.pdfExportComponent = component}
                        >
                            <div style={{ width: "530px" }}>
                                <center><img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/></center>  
                                <Card style = {{width:550}} className="text-left mt-2 ">   
                                <center><p className="textabla1">REPORTE INDIVIDUAL DEL DIAGNÓSTICO DE ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</p></center><br/><br></br>
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
                                <br></br>
                                <center><p className="textabla1"><strong>GUÍA DE REFERENCIA I - 
                                  CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE FUERON
                                  SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</strong></p></center> <br/>  
                                <table className="table table-borderless table-small">
                                    <tr>
                                        <td>{atsReporte}</td>
                                    </tr>
                                    <tr></tr>
                                </table>  
                                <MDBTable width="500" className="table" striped bordered small style={{marginLeft:"2%"}}> 
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
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
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
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
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
                                <MDBTable  width="500" className="table" striped bordered small style={{marginTop:"2%",marginLeft:"2%"}}>
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
                            </div>
                        </PDFExport>
                    </div>
                </div>
        </React.Fragment> 
         );
    }
}
 
export default ReportATSI;