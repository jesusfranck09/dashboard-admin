import React, { Component } from 'react';
import { PDFExport }  from '@progress/kendo-react-pdf';
import PageTemplate from '../pageTemplate';
import logo from '../../images/logo.png'
import {Card} from 'antd'
import '../styles.css'
import {MDBTable} from 'mdbreact';

class ReportATSG extends Component {
    pdfExportComponent ;
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const {fechaEmision,evaluacionesConsideradas,filtrado,peticion1,descarga,filtro1,filtro2,filtro3,filtro4,filtro5,filtro6,filtro7,filtro8} = this.props 
        if(descarga === true){
            this.pdfExportComponent.save();
        }
        let variableCalculoATSDetectado =  0;
        let variableCalculoATSNoDetectado =  0;
        let tablaRenderizado =  peticion1.map((rows,i) => {
            let valor2 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "2"
            })
            let valor3 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "3"
            })
            let valor4 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "4"
            })
            let valor5 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "5"
            })
            let valor6 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "6"
            })
            let valor7 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "7"
            })
            let valor8 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "8"
            })
            let valor9 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "9"
            })
            let valor10 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "10"
            })
            let valor12 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "12"
            })
            let valor13 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "13"
            })
            let valor14 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "14"
            })
            let valor15 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "15"
            })
            let valor16 = rows.filter(function(hero){
                return hero.fk_preguntasATS === "16"
            })
          
            if(rows[1]){
            let array = [];
            let array2 =[];
            let respuesta;
                if(valor2[0].Respuestas=== "si" || valor3[0].Respuestas === "si"){
                    variableCalculoATSDetectado = variableCalculoATSDetectado + 1 
                    respuesta = <font color = "red"> SI </font>
                }else{
                    array.push(valor4[0].Respuestas,valor5[0].Respuestas,valor6[0].Respuestas,valor7[0].Respuestas,valor8[0].Respuestas,valor9[0].Respuestas,valor10[0].Respuestas)
                    var occurrences = array.reduce(function(obj, item) {
                    obj[item] = (obj[item] || 0) + 1;
                    return obj;
                    }, {});
            
                    if(occurrences.si >=3){
                        variableCalculoATSDetectado = variableCalculoATSDetectado + 1 
                        respuesta = <font color = "red"> SI </font>
                    }else if(occurrences.no>4){
                        array2.push(valor12[0].Respuestas,valor13[0].Respuestas,valor14[0].Respuestas,valor15[0].Respuestas,valor16[0].Respuestas)
                        var occurrences2 = array2.reduce(function(obj, item) {
                            obj[item] = (obj[item] || 0) + 1;
                            return obj;
                        }, {});
                
                        if(occurrences2.si >=2){
                            variableCalculoATSDetectado = variableCalculoATSDetectado + 1 
                            respuesta = <font color = "red"> SI </font>
                        }else if(occurrences2.no>3){
                            variableCalculoATSNoDetectado = variableCalculoATSNoDetectado + 1 
                            respuesta = <font color = "blue">NO</font>
                        }
                    }
                }
            return (
                <tr >
                    <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="7%" height="10%"  className="text-justify textabla3"><strong>{i + 1}</strong></td>
                    <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="19%" className="text-justify textabla3">{rows[1].ApellidoP}</td>
                    <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="19%" className="text-justify textabla3">{ rows[1].ApellidoM}</td>
                    <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="18%" className="text-justify textabla3">{rows[1].nombre}</td>
                    <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="27%" className="text-justify textabla3">{rows[1].CentroTrabajo}</td>
                    <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"align="center" ><strong>{respuesta}</strong></td>
                </tr>                                
            );
        }
    })
            
        return ( 
            <div>
        
                {filtrado.map((rows,i) =>{       
                    if(rows[1]){
                        let representante =  localStorage.getItem("nombre") + " " + localStorage.getItem("apellidos")
                        let periodoEvaluacion = localStorage.getItem("periodo")
                        return (
                        <div>
                            <div>
                            
                            <div style={{ position: "absolute", left:"-5000px", top: 0 }}>
                                <PDFExport
                                    pageTemplate={PageTemplate}
                                    forcePageBreak=".page-break"
                                    paperSize="letter"
                                    margin="1cm"
                                    pageNum
                                    fileName={`Reporte global ATS ${new Date().getFullYear()}`}
                                    // pageTemplate={this.pdfExportComponent}
                                    ref={(component) => this.pdfExportComponent = component}
                                        >
                                    <div style={{ width: "550px" }}>
                                        <center><img src={logo} alt="logo" style = {{width:550}}/></center>  
                                    <Card style = {{width:550}} className="text-left">   
                                        <center> <p className="textabla1"><strong>Reporte global del diagnóstico de Acontecimientos Traumáticos Severos</strong></p></center><br/>
                                        <font size="1"face="arial"color="black"> <strong>{localStorage.getItem("razonsocial")}</strong></font><br></br>
                                        <font size="1"face="arial"color="black">Representante: <strong>{representante}</strong></font>         
                                        <br/><font size="1"face="arial"color="black">Periodo de evaluación : <strong>{periodoEvaluacion}</strong></font><br/>
                                        <font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{evaluacionesConsideradas}</strong></font><br/>
                                        <font size="1"face="arial"color="black">Filtrado por : <strong>{filtro6}&nbsp;{filtro1}&nbsp;&nbsp;{filtro2}&nbsp;&nbsp; {filtro3}&nbsp;&nbsp;{filtro4}&nbsp;&nbsp; {filtro5}&nbsp;&nbsp;{filtro7}&nbsp;&nbsp;{filtro8}</strong></font><br/><br/>
                                    <div style={{ position: "absolute", bottom: "10px", left: "360px" }}>
                                        <font size="1"face="arial"color="black"><strong>{fechaEmision}</strong></font>
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
                                    <center> 
                                     <p className="textabla1">GUÍA DE REFERENCIA I - CUESTIONARIO PARA IDENTIFICAR LOS ACONTECIMIENTOS TRAUMÁTICOS SEVEROS EN LOS CENTROS DE TRABAJO</p> 
                                    </center>   <br/> 
                                    <center>
                                         <p className="textabla2"><strong>{localStorage.getItem("razonsocial")}</strong></p>
                                    </center> 
                                    <table width="500" className="table table-bordered table-sm table-striped " style = {{ marginBottom:20}}>
                                        <tr>
                                        <th style={{paddingTop:"2px",paddingBottom:"2px"}} scope="col" width="36%" className="text-center textabla2" >TOTAL: <strong>{evaluacionesConsideradas}</strong></th>
                                        <th style={{paddingTop:"2px",paddingBottom:"2px"}} scope="col" width="32%" className="text-center textabla2">ACCIÓN REQUERIDA: <font color="red"><strong>{variableCalculoATSDetectado}</strong></font></th>
                                        <th style={{paddingTop:"2px",paddingBottom:"2px"}} scope="col" width="32%" className="text-center textabla2">ACCIÓN NO REQUERIDA: <font color="blue"><strong>{variableCalculoATSNoDetectado}</strong></font></th>
                                        </tr>                                  
                                    </table>  
                                    <MDBTable className="table" striped bordered small > 
                                        <tr >   
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="text-center textabla2" width="5%"><strong>#</strong></td>                           
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="text-center textabla2" width="19%" ><strong>Apellido Paterno</strong></td>
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="text-center textabla2" width="19%"><strong>Apellido Materno</strong></td>
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="text-center textabla2" width="18%"><strong>Nombre</strong></td>
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="text-center textabla2" width="27%"><strong>Centro de Trabajo</strong></td>                                                                     
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="text-center textabla2" width="12%"><strong>Accion</strong></td>                                                                     
                                        </tr>
                                        {tablaRenderizado}
                                    </MDBTable>
                                    </div>
                                    </PDFExport>
                                </div>
                                </div>
                            </div>          
                                )   
                            }                      
                        })
                    }
            </div>
         );
    }
}
 
export default ReportATSG;