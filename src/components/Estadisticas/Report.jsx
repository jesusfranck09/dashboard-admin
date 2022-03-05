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
                            <center><font  size="2"face="arial"color="black"> <strong>ESTADÍSTICA GUÍA DE REFERENCIA V</strong><br></br></font></center><br/>
                            <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>   
                            <font size="1"face="arial"color="black">Representante: <strong>{representante}</strong></font><br/>
                            <font size="1"face="arial"color="black">Total de Empleados Considerados : <strong>{epleadosTotales}</strong></font>
                            <br/><font size="1"face="arial"color="black">Periodo de evaluación : <strong>{periodoEvaluacion}</strong></font><br/>
                            <div style={{ position: "absolute", bottom: "10px", left: "360px" }}>
                            <font size="1"face="arial"color="black"><strong>{fechaCompleta}</strong></font>
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
                                <center><font size="2" face="arial" color="black"><strong>GUÍA DE REFERENCIA V - DATOS DEL TRABAJADOR</strong></font></center>    <br/>                                                  
                                    <center><font size="1" face="arial" color="black"><strong>Reporte de datos demográficos generales.</strong></font></center><br/>
                                    <center>
                                    <div style={{width:"85%"}}>
                                      {titulo1}
                                      <MDBTable striped bordered  small style={{marginTop:"2%"}}> 
                                      <MDBTableHead>
                                        <tr >                              
                                        <td width="25px" className="text-center"><font size="1" face="arial"color="black" >Género</font></td>
                                        <td width="25px" className="text-center"><font size="1" face="arial"color="black">No.Empleados</font></td>
                                        <td width="25px" className="text-center"><font size="1" face="arial"color="black">Porcentaje</font></td>
                                        </tr>
                                      </MDBTableHead>  
                                      <MDBTableBody>                               
                                        <tr >  
                                        <td width="25px" className="text-center"><font size="1" face="arial"color="black" >Hombres</font></td>
                                            <td width="25px" className="text-center"><font size="1" face="arial"color="black">{genero[0][0][0].length}</font></td>
                                            <td width="25px" className="text-center"><font size="1" face="arial"color="black">{genero[0][1]} %</font></td>
                                        </tr>
                                        <tr >  
                                        <td width="25px" className="text-center"><font size="1" face="arial"color="black" >Mujeres</font></td>
                                            <td width="25px" className="text-center"><font size="1" face="arial"color="black">{genero[1][0][0].length}</font></td>
                                            <td width="25px" className="text-center"><font size="1" face="arial"color="black">{genero[1][1]} %</font></td>
                                        </tr>
                                        <tr >  
                                        <td width="25px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                                            <td width="25px" className="text-center"><font size="1" face="arial"color="black">{totalPersonasGenero}</font></td>
                                            <td width="25px" className="text-center"><font size="1" face="arial"color="black">100 %</font></td>
                                        </tr>
                                        </MDBTableBody>
                                      </MDBTable>
                                    </div>
                                    <div style={{width:"85%"}}>
                                    {titulo2}
                                    <MDBTable bordered striped small style={{marginTop:"2%"}}> 
                                      <MDBTableHead>
                                        <tr >  
                                        <td className="text-center" width="75px"><font size="1" face="arial"color="black" >Centros de Trabajo</font></td>
                                        <td width="25px" className="text-center"><font size="1" face="arial"color="black">No.Empleados</font></td>
                                        </tr>
                                      </MDBTableHead>
                                      <MDBTableBody>
                                        {centroTrabajo.map(rows=>{
                                          return(
                                            <tr >                              
                                            <td ><font size="1" face="arial"color="black" >{rows[0]}</font></td>
                                            <td className="text-center"><font size="1" face="arial"color="black" >{rows[1]}</font></td>  
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
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Rango</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Empleados</font></td>   
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Porcentaje</font></td>                             
                                        </tr>   
                                       </MDBTableHead>
                                       <MDBTableBody>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >15 a 19 Años</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[0][0]}</font></td>                                                                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[0][1]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >20 a 24 Años</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[1][0]}</font></td>    
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[1][1]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >25 a 29 Años</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[2][0]}</font></td>      
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[2][1]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >30 a 34 Años</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[3][0]}</font></td>  
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[3][1]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >35 a 39 Años</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[4][0]}</font></td>    
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[4][1]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >40 a 44 Años</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[5][0]}</font></td>  
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[5][1]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >45 a 49 Años</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[6][0]}</font></td>   
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[6][1]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >50 a 54 Años</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[7][0]}</font></td> 
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[7][1]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >55 a 59 Años</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[8][0]}</font></td> 
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[8][1]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >60 a 64 Años</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[9][0]}</font></td>   
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[9][1]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >65 a 69 Años</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[10][0]}</font></td> 
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[10][0]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >70 o más</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{edad[11][0]}</font></td>   
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">{edad[11][1]} %</font></td>                                                                              
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                                          <td width="70px" className="text-center"><font size="1" face="arial"color="black">{edad[12]}</font></td>  
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black">100 %</font></td>                                                                              
                                        </tr>
                                      </MDBTableBody>
                                      </MDBTable>
                                      </div>
                                      <div style={{width:"85%"}}> 
                                      {titulo4}         
                                      <MDBTable bordered striped small style={{marginTop:"2%"}}> 
                                      <MDBTableHead>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Estudios</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Empleados</font></td>  
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Porcentaje</font></td>                             
                                        </tr>  
                                      </MDBTableHead> 
                                      <MDBTableBody> 
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Sin estudios</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{formacion[0][0]}</font></td> 
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{formacion[0][1]} %</font></td>                             
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Primaria</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{formacion[1][0]}</font></td>   
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{formacion[1][1]} %</font></td>                             
                                        </tr>
                                      <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Secundaria</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{formacion[2][0]}</font></td> 
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{formacion[2][1]} %</font></td>                             
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Preparatoria O Bachillerato</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{formacion[3][0]}</font></td>    
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{formacion[3][1]} %</font></td>                             
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Licenciatura</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{formacion[4][0]}</font></td>    
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{formacion[4][1]} %</font></td>                             
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Maestría</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{formacion[5][0]}</font></td>
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{formacion[5][1]} %</font></td>                             
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Doctorado</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{formacion[6][0]}</font></td> 
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{formacion[6][1]} %</font></td>                             
                                        </tr>
                                        <tr >                              
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                                          <td width="40px" className="text-center"><font size="1" face="arial"color="black">{epleadosTotales}</font></td> 
                                          <td width="30px" className="text-center"><font size="1" face="arial"color="black" >100 %</font></td>                             
                                        </tr>
                                    </MDBTableBody>
                                    </MDBTable>
                                   </div>
                                   <div style={{width:"85%"}}>
                                    {titulo5}
                                    <MDBTable  bordered striped small style={{marginTop:"2%"}}> 
                                    <MDBTableHead>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Experiencia</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Empleados</font></td>     
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Porcentaje</font></td>                             
                                    </tr>      
                                    </MDBTableHead>
                                    <MDBTableBody>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Menos de 6 Meses</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[0][0]}</font></td>  
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[0][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 6 meses y 1 Año</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[1][0]}</font></td>      
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[1][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 1 A 4 Años</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[2][0]}</font></td> 
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[2][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 5 A 9 Años</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[3][0]}</font></td> 
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[3][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 10 A 14 Años</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[4][0]}</font></td>  
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[4][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 15 A 19 Años</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[5][0]}</font></td>                                                                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[5][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Entre 20 A 24 Años</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[6][0]}</font></td>  
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[6][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >25 Años o más</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[7][0]}</font></td>   
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{experienciaLAboral[7][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{epleadosTotales}</font></td>  
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">100%</font></td>                                                                              
                                    </tr>
                                  </MDBTableBody>
                                  </MDBTable>
                                </div>   
                                <div style={{width:"85%"}}>   
                                {titulo6}     
                                  <MDBTable  bordered striped small style={{marginTop:"2%"}}> 
                                  <MDBTableHead>
                                    <tr >                              
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Antiguedad</font></td>
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Empleados</font></td>    
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Porcentaje</font></td>                             
                                    </tr>
                                  </MDBTableHead>  
                                  <MDBTableBody>
                                    <tr >                              
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Menos de 6 Meses</font></td>
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[0][0]}</font></td>  
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[0][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Entre 6 meses y 1 Año</font></td>
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[1][0]}</font></td>   
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[1][1]} %</font></td>                                                                                                                  </tr>
                                    <tr >                              
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Entre 1 A 4 Años</font></td>
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[2][0]}</font></td> 
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[2][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Entre 5 A 9 Años</font></td>
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[3][0]}</font></td>   
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[3][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Entre 10 A 14 Años</font></td>
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[4][0]}</font></td>     
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[4][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Entre 15 A 19 Años</font></td>
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[5][0]}</font></td>   
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[5][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Entre 20 A 24 Años</font></td>
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[6][0]}</font></td>   
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[6][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >25 Años o más</font></td>
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[7][0]}</font></td> 
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{antiguedad[7][1]} %</font></td>                                                                              
                                    </tr>
                                    <tr >                              
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">{epleadosTotales}</font></td>  
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black">100 %</font></td>                                                                              
                                    </tr>
                                  </MDBTableBody>  
                                  </MDBTable>
                                </div>  
                                <div  style={{width:"85%"}}> 
                                  {titulo7} 
                                  <MDBTable bordered striped small style={{marginTop:"2%"}}> 
                                  <MDBTableHead>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Puestos</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black" >Empleados</font></td>
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Porcentaje</font></td>                             
                                    </tr> 
                                  </MDBTableHead>  
                                  <MDBTableBody>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Operativo</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{puesto[0][0]}</font></td>  
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{puesto[1][0]} %</font></td>                             
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Profesional o Técnico</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{puesto[1][0]}</font></td>  
                                    <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{puesto[1][1]} %</font></td>                             
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Supervisor</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{puesto[2][0]}</font></td>   
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{puesto[2][1]} %</font></td>                             
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Gerencial</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{puesto[3][0]}</font></td>  
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{puesto[3][1]} %</font></td>                             
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Directivo</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{puesto[4][0]}</font></td>                                 
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >{puesto[4][1]} %</font></td>                             
                                    </tr>
                                    <tr >                              
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >Total</font></td>
                                      <td width="40px" className="text-center"><font size="1" face="arial"color="black">{epleadosTotales}</font></td>  
                                      <td width="30px" className="text-center"><font size="1" face="arial"color="black" >100 %</font></td>                             
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