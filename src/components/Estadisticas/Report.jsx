import React, { Component } from 'react'

import {MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import logo from '../images/logo.png'
import { PDFExport } from '@progress/kendo-react-pdf';
import {Card} from 'antd'
class ReportEstadisticas extends Component {
    pdfExportComponent ;

    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let periodoEvaluacion = localStorage.getItem("periodo")
        var LaFecha=new Date();
        var Mes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        var diasem = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        var diasemana=LaFecha.getDay();
        var fechaCompleta="";
        var NumeroDeMes="";    
        NumeroDeMes=LaFecha.getMonth();
        fechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
        let {genero,edad,epleadosTotales,centroTrabajo,formacion,experienciaLAboral,antiguedad,puesto,descarga} = this.props

        let totalPersonasGenero = genero[0][0][0].length + genero[1][0][0].length;
        let representante = localStorage.getItem("nombre") + " " + localStorage.getItem("apellidos")
        let titulo1 = <font color="blue" size="1">I.-Distribución por Género</font>
        let titulo2 = <font color="blue" size="1">I.-Distribución por Centro de trabajo</font>
        let titulo3 = <font color="blue" size="1">I.-Distribución por Edad</font>
        let titulo4 = <font color="blue" size="1">I.-Distribución por Formación académica</font>
        let titulo5 = <font color="blue" size="1">I.-Distribución por Experiencia laboral</font>
        let titulo6 = <font color="blue" size="1">I.-Distribución por Antiguedad</font>
        let titulo7 = <font color="blue" size="1">I.-Distribución por Puesto</font>
        if(descarga ===  true){
          console.log("descarga ===  true",descarga)
          this.pdfExportComponent.save(); 
        }
        return ( 
            <React.Fragment> 
               <div>
                <div style={{ position: "absolute", left: "-5000px", top: 0 }}>
                    <PDFExport
                        paperSize="letter"
                        margin="1cm"
                        pageNum
                        // pageTemplate={this.pdfExportComponent}
                        ref={(component) => this.pdfExportComponent = component}
                        fileName={`Guía V ${new Date().getFullYear()}`}
                    >
                        <div style={{ width: "530px" }}>
                    
                           <center> <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/></center>
                            <Card style = {{width:550}} className="text-left mt-4 ">
                            <center><p className='textabla1'> <strong>ESTADÍSTICA GUÍA DE REFERENCIA V</strong><br></br></p></center><br/>
                            <p className='textabla2'> {localStorage.getItem("razonsocial")}</p>   
                            <p className='textabla2'>Representante: <strong>{representante}</strong></p>
                            <p className='textabla2'>Total de Empleados Considerados : <strong>{epleadosTotales}</strong></p>
                            <p className='textabla2'>Periodo de evaluación : <strong>{periodoEvaluacion}</strong></p>
                            <div style={{ position: "absolute", bottom: "10px", left: "360px" }}>
                            <p className='textabla2'><strong>{fechaCompleta}</strong></p>
                            </div>
                            <center><img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,heigth:20}}/></center>
                            </Card>
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
                                <center><p className='textabla1'><strong>GUÍA DE REFERENCIA V - DATOS DEL TRABAJADOR</strong></p></center>    <br/>                                                  
                                    <center><p className='textabla2'><strong>Reporte de datos demográficos generales.</strong></p></center><br/>
                                    <center>
                                    <div style={{width:"85%"}}>
                                      {titulo1}
                                      <MDBTable striped bordered  small style={{marginTop:"2%"}}> 
                                      <MDBTableHead>
                                        <tr style={{paddingTop:"2px",paddingBottom:"2px"}}>                              
                                        <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-center textabla3">Género</td>
                                        <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-center textabla3">No.Empleados</td>
                                        <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-center textabla3">Porcentaje</td>
                                        </tr>
                                      </MDBTableHead>  
                                      <MDBTableBody>                               
                                        <tr >  
                                        <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-left textabla3">Hombres</td>
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-center textabla3">{genero[0][0][0].length}</td>
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-center textabla3">{genero[0][1]} %</td>
                                        </tr>
                                        <tr >  
                                        <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-left textabla3">Mujeres</td>
                                            <td  style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-center textabla3">{genero[1][0][0].length}</td>
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-center textabla3">{genero[1][1]} %</td>
                                        </tr>
                                        <tr >  
                                        <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-left textabla3">Total</td>
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-center textabla3">{totalPersonasGenero}</td>
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-center textabla3">100 %</td>
                                        </tr>
                                        </MDBTableBody>
                                      </MDBTable>
                                    </div>
                                    <div style={{width:"85%"}}>
                                    {titulo2}
                                    <MDBTable bordered striped small style={{marginTop:"2%"}}> 
                                      <MDBTableHead>
                                        <tr >  
                                        <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="text-left textabla3" width="75px">Centros de Trabajo</td>
                                        <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="25px" className="text-center textabla3">No.Empleados</td>
                                        </tr>
                                      </MDBTableHead>
                                      <MDBTableBody>
                                        {centroTrabajo.map(rows=>{
                                          return(
                                            <tr >                              
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="text-left textabla3">{rows[0]}</td>
                                            <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="text-center textabla3">{rows[1]}</td>  
                                            </tr>
                                          )
                                        })}   
                                      </MDBTableBody>                                         
                                      </MDBTable>
                                    </div>
                                    <div style={{width:"85%"}}>    
                                       {titulo3}  
                                       <MDBTable bordered striped small style={{marginTop:"2%"}}> 
                                       <MDBTableHead>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Rango</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">Empleados</td>   
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">Porcentaje</td>                             
                                        </tr>   
                                       </MDBTableHead>
                                       <MDBTableBody>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">15 a 19 Años</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[0][0]}</td>                                                                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[0][1]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">20 a 24 Años</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[1][0]}</td>    
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[1][1]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">25 a 29 Años</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[2][0]}</td>      
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[2][1]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">30 a 34 Años</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[3][0]}</td>  
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[3][1]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">35 a 39 Años</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[4][0]}</td>    
                                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[4][1]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">40 a 44 Años</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[5][0]}</td>  
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[5][1]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">45 a 49 Años</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[6][0]}</td>   
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[6][1]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">50 a 54 Años</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[7][0]}</td> 
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[7][1]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">55 a 59 Años</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[8][0]}</td> 
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[8][1]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">60 a 64 Años</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[9][0]}</td>   
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[9][1]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">65 a 69 Años</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[10][0]}</td> 
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[10][0]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">70 o más</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{edad[11][0]}</td>   
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{edad[11][1]} %</td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Total</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="70px" className="text-center textabla3">{edad[12]}</td>  
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">100 %</td>                                                                              
                                        </tr>
                                      </MDBTableBody>
                                      </MDBTable>
                                      </div>
                                      <div style={{width:"85%"}}> 
                                      {titulo4}         
                                      <MDBTable bordered striped small style={{marginTop:"2%"}}> 
                                      <MDBTableHead>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Estudios</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">Empleados</td>  
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">Porcentaje</td>                             
                                        </tr>  
                                      </MDBTableHead> 
                                      <MDBTableBody> 
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Sin estudios</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{formacion[0][0]}</td> 
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{formacion[0][1]} %</td>                             
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Primaria</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{formacion[1][0]}</td>   
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{formacion[1][1]} %</td>                             
                                        </tr>
                                      <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Secundaria</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{formacion[2][0]}</td> 
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{formacion[2][1]} %</td>                             
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Preparatoria O Bachillerato</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{formacion[3][0]}</td>    
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{formacion[3][1]} %</td>                             
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Licenciatura</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{formacion[4][0]}</td>    
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{formacion[4][1]} %</td>                             
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Maestría</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{formacion[5][0]}</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{formacion[5][1]} %</td>                             
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Doctorado</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{formacion[6][0]}</td> 
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{formacion[6][1]} %</td>                             
                                        </tr>
                                        <tr >                              
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Total</td>
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{epleadosTotales}</td> 
                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">100 %</td>                             
                                        </tr>
                                    </MDBTableBody>
                                    </MDBTable>
                                   </div>
                                   <div style={{width:"85%"}}>
                                    {titulo5}
                                    <MDBTable  bordered striped small style={{marginTop:"2%"}}> 
                                    <MDBTableHead>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Experiencia</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">Empleados</td>     
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">Porcentaje</td>                             
                                    </tr>      
                                    </MDBTableHead>
                                    <MDBTableBody>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Menos de 6 Meses</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{experienciaLAboral[0][0]}</td>  
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{experienciaLAboral[0][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Entre 6 meses y 1 Año</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{experienciaLAboral[1][0]}</td>      
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{experienciaLAboral[1][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Entre 1 A 4 Años</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{experienciaLAboral[2][0]}</td> 
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{experienciaLAboral[2][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Entre 5 A 9 Años</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{experienciaLAboral[3][0]}</td> 
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{experienciaLAboral[3][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Entre 10 A 14 Años</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{experienciaLAboral[4][0]}</td>  
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{experienciaLAboral[4][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Entre 15 A 19 Años</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{experienciaLAboral[5][0]}</td>                                                                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{experienciaLAboral[5][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Entre 20 A 24 Años</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{experienciaLAboral[6][0]}</td>  
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{experienciaLAboral[6][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">25 Años o más</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{experienciaLAboral[7][0]}</td>   
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{experienciaLAboral[7][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Total</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{epleadosTotales}</td>  
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">100%</td>                                                                              
                                    </tr>
                                  </MDBTableBody>
                                  </MDBTable>
                                </div>   
                                <div style={{width:"85%"}}>   
                                {titulo6}     
                                  <MDBTable  bordered striped small style={{marginTop:"2%"}}> 
                                  <MDBTableHead>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-left textabla3">Antiguedad</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">Empleados</td>    
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">Porcentaje</td>                             
                                    </tr>
                                  </MDBTableHead>  
                                  <MDBTableBody>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-left textabla3">Menos de 6 Meses</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[0][0]}</td>  
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[0][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-left textabla3">Entre 6 meses y 1 Año</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[1][0]}</td>   
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[1][1]} %</td>                                                                                                                  </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-left textabla3">Entre 1 A 4 Años</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[2][0]}</td> 
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[2][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-left textabla3">Entre 5 A 9 Años</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[3][0]}</td>   
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[3][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-left textabla3">Entre 10 A 14 Años</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[4][0]}</td>     
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[4][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-left textabla3">Entre 15 A 19 Años</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[5][0]}</td>   
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[5][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-left textabla3">Entre 20 A 24 Años</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[6][0]}</td>   
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[6][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-left textabla3">25 Años o más</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[7][0]}</td> 
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{antiguedad[7][1]} %</td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-left textabla3">Total</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{epleadosTotales}</td>  
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">100 %</td>                                                                              
                                    </tr>
                                  </MDBTableBody>  
                                  </MDBTable>
                                </div>  
                                <div  style={{width:"85%"}}> 
                                  {titulo7} 
                                  <MDBTable bordered striped small style={{marginTop:"2%"}}> 
                                  <MDBTableHead>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Puestos</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">Empleados</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">Porcentaje</td>                             
                                    </tr> 
                                  </MDBTableHead>  
                                  <MDBTableBody>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Operativo</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{puesto[0][0]}</td>  
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{puesto[1][0]} %</td>                             
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Profesional o Técnico</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{puesto[1][0]}</td>  
                                    <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{puesto[1][1]} %</td>                             
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Supervisor</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{puesto[2][0]}</td>   
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{puesto[2][1]} %</td>                             
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Gerencial</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{puesto[3][0]}</td>  
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{puesto[3][1]} %</td>                             
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Directivo</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{puesto[4][0]}</td>                                 
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-center textabla3">{puesto[4][1]} %</td>                             
                                    </tr>
                                    <tr >                              
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="30px" className="text-left textabla3">Total</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40px" className="text-center textabla3">{epleadosTotales}</td>  
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}}width="30px" className="text-center textabla3">100 %</td>                             
                                    </tr>
                                    </MDBTableBody>
                                    </MDBTable>
                                  </div>  
                                </center>   
                        </div>
                    </PDFExport>
                </div>
            </div>
            </React.Fragment> 
         );
    }
}
 
export default ReportEstadisticas;