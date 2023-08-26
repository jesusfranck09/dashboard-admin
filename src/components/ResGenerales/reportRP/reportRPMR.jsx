import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import PageTemplate from '../pageTemplate.jsx';
import {MDBTable} from 'mdbreact';
import logo from '../../images/logo.png'
import Table from '@material-ui/core/Table';
import {Card} from 'antd';
import '../styles.css'

class reportRPMR extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() { 
        const {resultadosEvaluacionMasivo,fechaCompleta,datosLength,descarga,filtro1,filtro2,filtro3,filtro4,filtro5,filtro6,filtro7,filtro8} = this.props 
        if(descarga === true){
            this.pdfExportComponent.save();
        }        
        return ( 
            <div style={{ position: "absolute", left: "-5000px", top: 0 }}>
            <PDFExport
                paperSize="letter"
                margin="1cm"
                pageTemplate={PageTemplate}
                forcePageBreak=".page-break"
                ref={(component) => this.pdfExportComponent = component}
                fileName={`Resultados del total de empleados ${new Date().getFullYear()}`}
            >
            <div style={{ width: "550px" }}>
            {resultadosEvaluacionMasivo.map(rows=>{
            if(rows[0]){
            let value1,value2,value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20,value21,value22,value23,value24;
            let value25,value26,value27,value28,value29,value30,value31,value32,value33,value34,value35,value36,value37,value38,value39,value40,value41,value42,value43,value44,value45,value46;
            
            let filtrar1,filtrar2,filtrar3,filtrar4,filtrar5,filtrar6,filtrar7,filtrar8,filtrar9,filtrar10,
            filtrar11,filtrar12,filtrar13,filtrar14,filtrar15,filtrar16,filtrar17,filtrar18,filtrar19,filtrar20,
            filtrar21,filtrar22,filtrar23,filtrar24,filtrar25,filtrar26,filtrar27,filtrar28,filtrar29,filtrar30,
            filtrar31,filtrar32,filtrar33,filtrar34,filtrar35,filtrar36,filtrar37,filtrar38,filtrar39,filtrar40,
            filtrar41,filtrar42,filtrar43,filtrar44,filtrar45,filtrar46;
            filtrar1 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP === "1";
            });
            value1 = filtrar1.pop()
            filtrar2 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "2";
            });
            value2 = filtrar2.pop()
            filtrar3 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "3";
            });
            value3 = filtrar3.pop()
            filtrar4 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "4";
            });
            value4 = filtrar4.pop()
            filtrar5 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "5";
            });
            value5 = filtrar5.pop()
            filtrar6 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "6";
            });
            value6 = filtrar6.pop()
            filtrar7 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "7";
            });
            value7 = filtrar7.pop()
            filtrar8 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "8";
            });
            value8 = filtrar8.pop()
            filtrar9 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "9";
            });
            value9  = filtrar9.pop()
            filtrar10 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "10";
            });
            value10 = filtrar10.pop()
            filtrar11 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "11";
            });
            value11 = filtrar11.pop()
            filtrar12 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "12";
            });
            value12 = filtrar12.pop()
            filtrar13 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "13";
            });
            value13 = filtrar13.pop()
            filtrar14 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "14";
            });
            value14 = filtrar14.pop()
            filtrar15 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "15";
            });
            value15 = filtrar15.pop()
            filtrar16 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "16";
            });
            value16 = filtrar16.pop()
            filtrar17 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "17";
            });
            value17 = filtrar17.pop()
            filtrar18 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "18";
            });
            value18 = filtrar18.pop()
            filtrar19 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "19";
            });
            value19 = filtrar19.pop()
            filtrar20=  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "20";
            });
            value20 = filtrar20.pop()
            filtrar21 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "21";
            });
            value21 = filtrar21.pop()
            filtrar22 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "22";
            });
            value22 = filtrar22.pop()
            filtrar23 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "23";
            });
            value23 = filtrar23.pop()
            filtrar24=  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "24";
            });
            value24 = filtrar24.pop();
            filtrar25 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "25";
            });
            value25 = filtrar25.pop()
            filtrar26 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "26";
            });
            value26 = filtrar26.pop()
            filtrar27 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "27";
            }); 
            value27 = filtrar27.pop()
            filtrar28 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "28";
            });
            value28 = filtrar28.pop()
            filtrar29 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "29";
            }); 
            value29 = filtrar29.pop()
            filtrar30 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "30";
            });
            value30 = filtrar30.pop()
            filtrar31 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "31";
            });
            value31 = filtrar31.pop()
            filtrar32 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "32";
            });
            value32 = filtrar32.pop()
            filtrar33 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "33";
            });
            value33 = filtrar33.pop()
            filtrar34 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "34";
            });
            value34 = filtrar34.pop()
            filtrar35 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "35";
            });
            value35 = filtrar35.pop()
            filtrar36 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "36";
            });
            value36 = filtrar36.pop()
            filtrar37 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "37";
            });
            value37 = filtrar37.pop()
            filtrar38 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "38";
            });
            value38 = filtrar38.pop()
            filtrar39 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "39";
            });
            value39 = filtrar39.pop()
            filtrar40 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "40";
            }); 
            value40 = filtrar40.pop()
            filtrar41 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "41";
            });   
            value41 = filtrar41.pop()
            filtrar42 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "42";
            });  
            value42 = filtrar42.pop()
            filtrar43 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "43";
            }); 
            value43 = filtrar43.pop()
            filtrar44 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "44";
            });
            value44 = filtrar44.pop()
            filtrar45 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "45";
            });
            value45 = filtrar45.pop()
            filtrar46 =  rows.filter(function(hero) {
            return hero.fk_preguntasRP === "46";
            });
            value46 = filtrar46.pop()
           
            let valor1=parseInt(value1.ponderacion);
            let valor2=parseInt(value2.ponderacion);
            let valor3=parseInt(value3.ponderacion);
            let valor4=parseInt(value4.ponderacion);
            let valor5=parseInt(value5.ponderacion);
            let valor6=parseInt(value6.ponderacion);
            let valor7=parseInt(value7.ponderacion);
            let valor8=parseInt(value8.ponderacion);
            let valor9=parseInt(value9.ponderacion);
            let valor10=parseInt(value10.ponderacion);
            let valor11=parseInt(value11.ponderacion);
            let valor12=parseInt(value12.ponderacion);
            let valor13=parseInt(value13.ponderacion);
            let valor14=parseInt(value14.ponderacion);
            let valor15=parseInt(value15.ponderacion);
            let valor16=parseInt(value16.ponderacion);
            let valor17=parseInt(value17.ponderacion);
            let valor18=parseInt(value18.ponderacion);
            let valor19=parseInt(value19.ponderacion);
            let valor20=parseInt(value20.ponderacion);
            let valor21=parseInt(value21.ponderacion);
            let valor22=parseInt(value22.ponderacion);
            let valor23=parseInt(value23.ponderacion);
            let valor24=parseInt(value24.ponderacion);
            let valor25=parseInt(value25.ponderacion);
            let valor26=parseInt(value26.ponderacion);
            let valor27=parseInt(value27.ponderacion);
            let valor28=parseInt(value28.ponderacion);
            let valor29=parseInt(value29.ponderacion);
            let valor30=parseInt(value30.ponderacion);
            let valor31=parseInt(value31.ponderacion);
            let valor32=parseInt(value32.ponderacion);
            let valor33=parseInt(value33.ponderacion);
            let valor34=parseInt(value34.ponderacion);
            let valor35=parseInt(value35.ponderacion);
            let valor36=parseInt(value36.ponderacion);
            let valor37=parseInt(value37.ponderacion);
            let valor38=parseInt(value38.ponderacion);
            let valor39=parseInt(value39.ponderacion);
            let valor40=parseInt(value40.ponderacion);
            let valor41=parseInt(value41.ponderacion);
            let valor42=parseInt(value42.ponderacion);
            let valor43=parseInt(value43.ponderacion);
            let valor44=parseInt(value44.ponderacion);
            let valor45=parseInt(value45.ponderacion);
            let valor46=parseInt(value46.ponderacion);
        
            let colorCategoriaUno,colorCategoriaDos,colorCategoriaTre,colorCategoriaCuatro;
            let colorDominioUno,colorDominioDos,colorDominioTres,colorDominioCuatro,colorDominioCinco,colorDominioSeis,colorDominioSiete,colorDominioOcho;

            let total = (valor1+valor2+valor3+valor4+valor5+valor6+valor7+valor8+valor9+valor10+valor11+valor12+valor13+valor14+valor15+valor16+valor17+valor18+valor19+valor20+valor21+valor22+valor23+valor24+valor25+valor26+valor27+valor28+valor29+valor30+valor31+valor32+valor33+valor34+valor35+valor36+valor37+valor38+valor39+valor40+valor41+valor42+valor43+valor44+valor45+valor46).toFixed(2);
            let criteriosPrev;
            let color;
            if(total<20){
                color =<p className="textabla2" style={{backgroundColor:"#9BE0F7"}}>Nulo</p>
                criteriosPrev = <p className="textabla3" style={{backgroundColor: "#a7f5ea",padding:"5px"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</p>
            }else if(total>=20 && total < 45){
                  color= <p className="textabla2" style={{backgroundColor:"#6BF56E"}}>Bajo</p>
                  criteriosPrev =  <p className="textabla3" style={{backgroundColor: "#a7f5ea",padding:"5px"}}>Es necesario una mayor difusión de la política de prevención de riesgos
                  psicosociales y programas para: la prevención de los factores de riesgo
                  psicosocial, la promoción de un entorno organizacional favorable y la
                  prevención de la violencia laboral.</p>
            }else if(total>=45 && total < 70){
                  color=<p className="textabla2" style={{backgroundColor:"#FFFF00"}}>Medio</p>
                    criteriosPrev = <p className="textabla3" style={{backgroundColor: "#a7f5ea",padding:"5px"}} >Se requiere revisar la política de prevención de riesgos psicosociales y
                    programas para la prevención de los factores de riesgo psicosocial, la
                    promoción de un entorno organizacional favorable y la prevención de la
                    violencia laboral, así como reforzar su aplicación y difusión, mediante un
                    Programa de intervención.</p>
            }else if(total>=70 && total < 90){
                  color = <p className="textabla2" style={{backgroundColor:"#FFC000"}}>Alto</p>
                  criteriosPrev = <p className="textabla3" style={{backgroundColor: "#a7f5ea",padding:"5px"}} >Se requiere realizar un análisis de cada categoría y dominio, de manera que
                  se puedan determinar las acciones de intervención apropiadas a través de un
                  Programa de intervención, que podrá incluir una evaluación específica y
                  deberá incluir una campaña de sensibilización, revisar la política de
                  prevención de riesgos psicosociales y programas para la prevención de los
                  factores de riesgo psicosocial, la promoción de un entorno organizacional
                  favorable y la prevención de la violencia laboral, así como reforzar su
                  aplicación y difusión.</p>
            }
            else if(total >= 90){
                  color = <p className="textabla2" style={{backgroundColor:"#FF0000"}}>Muy Alto</p>
                  criteriosPrev = <p className="textabla3" style={{backgroundColor: "#a7f5ea",padding:"5px"}} >Se requiere realizar el análisis de cada categoría y dominio para establecer
                  las acciones de intervención apropiadas, mediante un Programa de
                  intervención que deberá incluir evaluaciones específicas, y contemplar
                  campañas de sensibilización, revisar la política de prevención de riesgos
                  psicosociales y programas para la prevención de los factores de riesgo
                  psicosocial, la promoción de un entorno organizacional favorable y la
                  prevención de la violencia laboral, así como reforzar su aplicación y difusión.</p>
            }
    
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
    
            let categoriaUno = (valor2+valor1+valor3).toFixed(2);
            if(categoriaUno < 3){
               colorCategoriaUno  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(categoriaUno >= 3 && categoriaUno < 5){
               colorCategoriaUno =<td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(categoriaUno >= 5 && categoriaUno < 7){
               colorCategoriaUno=<td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(categoriaUno >= 7 && categoriaUno < 9){
               colorCategoriaUno = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
             }else if(categoriaUno >= 9){
               colorCategoriaUno = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }
       
           let categoriaDos = (valor4+valor9+valor5+valor6+valor7+valor8+valor41+valor42+valor43+valor10+valor11+valor12+valor13+valor20+valor21+valor22+valor18+valor19+valor26+valor27).toFixed(2);
            if(categoriaDos < 10){
               colorCategoriaDos  =  <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(categoriaDos >= 10 && categoriaDos < 20){
               colorCategoriaDos =<td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(categoriaDos >=20 && categoriaDos < 30){
               colorCategoriaDos=<td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(categoriaDos >=30 && categoriaDos < 40){
               colorCategoriaDos = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
             }else if(categoriaDos >= 40){
               colorCategoriaDos = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }
       
       
             let categoriaTre = (valor14+valor15+valor16+valor17).toFixed(2);
            if(categoriaTre < 4){
               colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(categoriaTre >= 4 && categoriaTre < 6){
               colorCategoriaTre = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(categoriaTre >= 6 && categoriaTre < 9 ){
               colorCategoriaTre = <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(categoriaTre >= 9 && categoriaTre < 12){
               colorCategoriaTre = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
             }else if(categoriaTre >= 12){
               colorCategoriaTre = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }
       
       let categoriaCuatro = (valor23+valor24+valor25+valor28+valor29+valor30+valor31+valor32+valor33+valor34+valor35+valor36+valor37+valor38+valor39+valor40+valor44+valor45+valor46).toFixed(2);
            if(categoriaCuatro < 10){
               colorCategoriaCuatro  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(categoriaCuatro >= 10 && categoriaCuatro < 18){
               colorCategoriaCuatro =  <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(categoriaCuatro >=18 && categoriaCuatro < 28){
               colorCategoriaCuatro= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(categoriaCuatro >=28 && categoriaCuatro < 38){
               colorCategoriaCuatro = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
             }else if(categoriaCuatro >= 38){
               colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }     
             let DominioUno = (valor2+valor1+valor3).toFixed(2); 
            if(DominioUno < 3){
               colorDominioUno  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(DominioUno >= 3 && DominioUno < 5){
               colorDominioUno = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(DominioUno >= 5 && DominioUno < 7){
               colorDominioUno= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(DominioUno >= 7 && DominioUno < 9){
               colorDominioUno = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
             }else if(DominioUno >= 9){
               colorDominioUno= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }
       
       
             let DominioDos = (valor4+valor9+valor5+valor6+valor7+valor8+valor41+valor42+valor43+valor10+valor11+valor12+valor13).toFixed(2);
       
             if(DominioDos < 12){
               colorDominioDos  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(DominioDos >= 12 && DominioDos < 16){
               colorDominioDos= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(DominioDos >= 16 && DominioDos < 20){
               colorDominioDos= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(DominioDos >= 20 && DominioDos < 24){
               colorDominioDos = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
             }else if(DominioDos >= 24){
               colorDominioDos= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }
       
             let DominioTres = (valor20+valor21+valor22+valor18+valor19+valor26+valor27).toFixed(2);
       
           if(DominioTres < 5){
               colorDominioTres  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(DominioTres >= 5 && DominioTres < 8){
               colorDominioTres= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(DominioTres >= 8 && DominioTres < 11){
               colorDominioTres= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(DominioTres >= 11 && DominioTres < 14){
               colorDominioTres = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
             }else if(DominioTres >= 14){
               colorDominioTres= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }
       
             let DominioCuatro = (valor14+valor15).toFixed(2);
             
             if(DominioCuatro < 1){
               colorDominioCuatro  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(DominioCuatro >= 1 && DominioCuatro < 2){
               colorDominioCuatro= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(DominioCuatro >= 2 && DominioCuatro < 4){
               colorDominioCuatro= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(DominioCuatro >= 4 && DominioCuatro < 6){
               colorDominioCuatro = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
             }else if(DominioCuatro >= 6){
               colorDominioCuatro= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }
       
             let DominioCinco = (valor16+valor17).toFixed(2);
            
             if(DominioCinco < 1){
               colorDominioCinco  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(DominioCinco >= 1 && DominioCinco < 2){
               colorDominioCinco= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(DominioCinco >= 2 && DominioCinco < 4){
               colorDominioCinco= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(DominioCinco >= 4 && DominioCinco < 6){
               colorDominioCinco = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
             }else if(DominioCinco >= 6){
               colorDominioCinco= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }
       
       let DominioSeis = (valor23+valor24+valor25+valor28+valor29).toFixed(2);
       
            if(DominioSeis < 3){
               colorDominioSeis  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(DominioSeis >= 3 && DominioSeis < 5){
               colorDominioSeis= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(DominioSeis >= 5 && DominioSeis < 8){
               colorDominioSeis= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(DominioSeis >= 8 && DominioSeis < 11){
               colorDominioSeis = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
             }else if(DominioSeis >= 11){
               colorDominioSeis= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }
             
             let DominioSiete = (valor30+valor31+valor32+valor44+valor45+valor46).toFixed(2);     
            
             if(DominioSiete < 5){
               colorDominioSiete  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(DominioSiete >= 5 && DominioSiete < 8){
               colorDominioSiete = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(DominioSiete >= 8 && DominioSiete < 11){
               colorDominioSiete= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(DominioSiete >= 11 && DominioSiete < 14){
               colorDominioSiete = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
           }else if(DominioSiete >= 14){
             colorDominioSiete=  <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }
            
             let DominioOcho = (valor33+valor34+valor35+valor36+valor37+valor38+valor39+valor40).toFixed(2);     
            
             if(DominioOcho < 7){
               colorDominioOcho  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
             }else if(DominioOcho >= 7 && DominioOcho < 10){
               colorDominioOcho  = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
             }else if(DominioOcho >= 10 && DominioOcho < 13){
               colorDominioOcho= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
             }else if(DominioOcho >= 13 && DominioOcho < 16){
               colorDominioOcho = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
             }else if(DominioOcho >= 16){
               colorDominioOcho=  <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
             }
             
             let titulo1 =<p className="textabla2"><font color="blue">I.- Resultados de la categoría </font> </p>
             let titulo2 =<p className="textabla2"><font color="blue">II.- Resultados del dominio</font> </p>
             let titulo3 =<p className="textabla2"><font color="blue">III.- Resultados por Dimensión</font> </p>

            let representante = localStorage.getItem("nombre") + " " + localStorage.getItem("apellidos")
            let periodoEvaluacion = localStorage.getItem("periodo")
                return(
                <div >
                <center><img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/></center>  
                <Card style = {{width:550}} className="text-left mt-2 ">   
                    <center><p className="textabla1">Reporte de resultados del diagnóstico individual de factores de riesgo psicosocial y Evaluación de Entorno Organizacional en los centros de trabajo</p></center>
                    <p className="textabla2"> <strong>{localStorage.getItem("razonsocial")}</strong></p>
                    <p className="textabla2">Representante: {representante}</p>         
                    <p className="textabla2">{rows[0].nombre} {rows[0].ApellidoP} {rows[0].ApellidoM}</p>
                    <p className="textabla2"><strong>Filtrado por : {filtro6}&nbsp;{filtro1}&nbsp;&nbsp;{filtro2}&nbsp;&nbsp; {filtro3}&nbsp;&nbsp;{filtro4}&nbsp;&nbsp; {filtro5}&nbsp;&nbsp;{filtro7}&nbsp;&nbsp;{filtro8}</strong></p>
                    <p className="textabla2"><strong>{periodoEvaluacion}</strong></p>
                    <p className="textabla2"><strong>Total de Evaluaciones consideradas : {datosLength}</strong></p>
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
                <br/>
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
                <center>
                    <p className="textabla2"><strong>GUÍA DE REFERENCIA II
                    CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN
                    LOS CENTROS DE TRABAJO</strong></p> 
                </center>
                <center>
                        <p className="textabla2"><strong>{localStorage.getItem("razonsocial")}</strong></p>
                </center> 
                <div className="resultado">
                    <div>
                        <p  className="textabla2">Resultado: <strong>{total}</strong></p>
                    </div>
                    <div>
                        <p className="textabla2">Nivel de riesgo <font color="black"><strong>{color}</strong></font></p>
                    </div>
                </div>
                
                <Table style={{padding:"2px"}} responsive small bordless  className="text-left mb-2">
                    <tr >                              
                        <td><p className="textabla3"><font color="black" >Necesidad de la acción :</font></p></td>                                
                    </tr>
                    <tr>
                        <td>{criteriosPrev}</td>
                    </tr>
                </Table>
                 <center>{titulo1}</center>    
                            <MDBTable width="500" className="table" striped bordered small>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}><strong>Índice</strong></td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left"><strong>Categoría</strong></td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center"><strong>Calificación</strong></td>
                                    <td className="textabla3"  style= {{padding:"2px"}}  align="center"><strong>Riesgo</strong></td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>1</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Ambiente de Trabajo</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{categoriaUno}</td>
                                    {colorCategoriaUno}
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>2</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Factores propios de la actividad</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{categoriaDos}</td>
                                    {colorCategoriaDos}
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>3</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Organización del tiempo de trabajo</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{categoriaTre}</td>
                                    {colorCategoriaTre}
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>4</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Liderazgo y relaciones en el trabajo</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{categoriaCuatro}</td>
                                    {colorCategoriaCuatro}
                                </tr>
                            </MDBTable>
                            <center>{titulo2}</center>                                       
                            <MDBTable width="500" className="table" striped bordered small>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}><strong>Índice</strong></td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left"><strong>Dominio</strong></td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center"><strong>Calificación</strong></td>
                                    <td className="textabla3"  style= {{padding:"2px"}}  align="center"><strong>Riesgo</strong></td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>1</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Condiciones en el ambiente de trabajo </td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioUno}</td>
                                    {colorDominioUno}
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>2</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Carga de Trabajo</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioDos}</td>
                                    {colorDominioDos}
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>3</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Falta de control sobre el trabajo</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioTres}</td>
                                    {colorDominioTres}
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>4</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Jornada de trabajo </td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioCuatro}</td>
                                    {colorDominioCuatro}
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>5</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Interferencia en la relación trabajo-familia</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioCinco}</td>
                                    {colorDominioCinco}
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>6</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Liderazgo</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioSeis}</td>
                                    {colorDominioSeis}
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>7</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Relaciones en el trabajo</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioSiete}</td>
                                    {colorDominioSiete}
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>8</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Violencia</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioOcho}</td>
                                    {colorDominioOcho}
                                </tr>
                            </MDBTable>     
                           
                            <center>{titulo3}</center> 
                            <MDBTable width="500" className="table" striped bordered small>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}><strong>Índice</strong></td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left"><strong>Dimensión</strong></td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center"><strong>Calificación</strong></td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>1</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Condiciones peligrosas e inseguras</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor2).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>2</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Condiciones deficientes e insalubres</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor1).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>3</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Trabajos peligrosos</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{valor3.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>4</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Cargas cuantitativas</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor4+valor9).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>5</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Ritmos de trabajo acelerado</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor5+valor6).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>6</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Carga mental</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor7+valor8).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>7</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Cargas psicológicas emocionales</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor41+valor42+valor43).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>8</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Cargas de alta responsabilidad</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor10+valor11).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>9</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Cargas contradictorias o inconsistentes</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor12+valor13).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>10</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Falta de control y autonomía sobre el trabajo</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor20+valor21+valor22).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>11</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Limitada o nula posibilidad de desarrollo</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor18+valor19).toFixed(2)}</td>
                                </tr>
                                
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>12</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Limitada o inexistente capacitación</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor26+valor27).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>13</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Jornadas de trabajo extensas</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor14+valor15).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>14</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Influencia del trabajo fuera del centro laboral</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor16).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>15</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Influencia de las responsabilidades familiares</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor17).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>16</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Escasa claridad de funciones</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor23+valor24+valor25).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>17</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Características del liderazgo</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor28+valor29).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>18</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Relaciones sociales en el trabajo</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor30+valor31+valor32).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>19</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Deficiente relación con los colaboradores que Supervisa</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor44+valor45+valor46).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>21</td>
                                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Violencia laboral</td>
                                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor33+valor34+valor35+valor36+valor37+valor38+valor39+valor40).toFixed(2)}</td>
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
    //         <div>       
    //         <MDBBtn   color="info" size="md"  onClick={() => { this.pdfExportComponent.save(); }}>
    //             Descargar reporte de resultados masivos
    //         </MDBBtn>
    //           <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
    //            <PDFExport
    //                   paperSize="A4"
    //                   margin="1cm"
    //                   ref={(component) => this.pdfExportComponent = component}
    //                   fileName={`Resultados del total de empleados ${new Date().getFullYear()}`}
    //                   pageTemplate={PageTemplate}
    //                   forcePageBreak=".page-break"
    //               >
                     
    //                       {this.state.resultadosEvaluacionMasivo.map(rows=>{
    //                         if(rows){
    //                           let filtrar1;
    //                            filtrar1 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 1;
    //                            });
    //                            console.log("filtrar1" , filtrar1)
    //                            value1=filtrar1.pop() 
    //                           // console.log("this.state.resultadosEvaluacionMasivo", this.state.resultadosEvaluacionMasivo)
    //                            let filtrar2;
    //                            filtrar2 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 2;
    //                            });
    //                            value2=filtrar2.pop() 
                              
    //                            let filtrar3;
    //                            filtrar3 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 3;
    //                            });
    //                            value3=filtrar3.pop() 
                              
    //                            let filtrar4;
    //                            filtrar4 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 4;
    //                            });
    //                            value4=filtrar4.pop() 
                              
    //                            let filtrar5;
    //                            filtrar5 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 5;
    //                            });
    //                            value5=filtrar5.pop() 
                              
    //                            let filtrar6;
    //                            filtrar6 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 6;
    //                            });
    //                            value6=filtrar6.pop() 
                              
    //                            let filtrar7;
    //                            filtrar7 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 7;
    //                            });
    //                            value7=filtrar7.pop() 
                              
    //                            let filtrar8;
    //                            filtrar8 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 8;
    //                            });
    //                            value8=filtrar8.pop() 
                              
    //                            let filtrar9;
    //                            filtrar9 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 9;
    //                            });
    //                            value9=filtrar9.pop() 
                              
    //                            let filtrar10;
    //                            filtrar10 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 10;
    //                            });
    //                            value10=filtrar10.pop() 
                              
    //                            let filtrar11;
    //                            filtrar11 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 11;
    //                            });
    //                            value11=filtrar11.pop() 
                              
    //                            let filtrar12;
    //                            filtrar12 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 12;
    //                            });
    //                            value12=filtrar12.pop() 
                              
    //                            let filtrar13;
    //                            filtrar13 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 13;
    //                            });
    //                            value13=filtrar13.pop() 
                              
    //                            let filtrar14;
    //                            filtrar14 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 14;
    //                            });
    //                            value14=filtrar14.pop() 
                              
    //                            let filtrar15;
    //                            filtrar15 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 15;
    //                            });
    //                            value15=filtrar15.pop() 
                              
    //                            let filtrar16;
    //                            filtrar16 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 16;
    //                            });
    //                            value16=filtrar16.pop() 
                              
    //                            let filtrar17;
    //                            filtrar17 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 17;
    //                            });
    //                            value17=filtrar17.pop() 
                              
    //                            let filtrar18;
    //                            filtrar18 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 18;
    //                            });
    //                            value18=filtrar18.pop() 
                              
    //                            let filtrar19;
    //                            filtrar19 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 19;
    //                            });
    //                            value19=filtrar19.pop() 
                              
    //                            let filtrar20;
    //                            filtrar20 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 20;
    //                            });
    //                            value20=filtrar20.pop() 
                              
    //                            let filtrar21;
    //                            filtrar21 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 21;
    //                            });
    //                            value21=filtrar21.pop() 
                              
    //                            let filtrar22;
    //                            filtrar22 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 22;
    //                            });
    //                            value22=filtrar22.pop() 
                              
    //                            let filtrar23;
    //                            filtrar23 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 23;
    //                            });
    //                            value23=filtrar23.pop() 
                              
    //                            let filtrar24;
    //                            filtrar24 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 24;
    //                            });
    //                            value24=filtrar24.pop() 
                              
    //                            let filtrar25;
    //                            filtrar25 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 25;
    //                            });
    //                            value25=filtrar25.pop() 
                              
    //                            let filtrar26;
    //                            filtrar26 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 26;
    //                            });
    //                            value26=filtrar26.pop() 
                              
    //                            let filtrar27;
    //                            filtrar27 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 27;
    //                            });
    //                            value27=filtrar27.pop() 
                              
    //                            let filtrar28;
    //                            filtrar28 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 28;
    //                            });
    //                            value28=filtrar28.pop() 
                              
    //                            let filtrar29;
    //                            filtrar29 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 29;
    //                            });
    //                            value29=filtrar29.pop() 
                              
    //                            let filtrar30;
    //                            filtrar30 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 30;
    //                            });
    //                            value30=filtrar30.pop() 
                              
    //                            let filtrar31;
    //                            filtrar31 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 31;
    //                            });
    //                            value31=filtrar31.pop() 
                              
    //                            let filtrar32;
    //                            filtrar32 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 32;
    //                            });
    //                            value32=filtrar32.pop() 
                              
    //                            let filtrar33;
    //                            filtrar33 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 33;
    //                            });
    //                            value33=filtrar33.pop() 
                              
    //                            let filtrar34;
    //                            filtrar34 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 34;
    //                            });
    //                            value34=filtrar34.pop() 
                              
    //                            let filtrar35;
    //                            filtrar35 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 35;
    //                            });
    //                            value35=filtrar35.pop() 
                              
    //                            let filtrar36;
    //                            filtrar36 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 36;
    //                            });
    //                            value36=filtrar36.pop() 
                              
    //                            let filtrar37;
    //                            filtrar37 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 37;
    //                            });
    //                            value37=filtrar37.pop() 
                              
    //                            let filtrar38;
    //                            filtrar38 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 38;
    //                            });
    //                            value38=filtrar38.pop() 
                              
    //                            let filtrar39;
    //                            filtrar39 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 39;
    //                            });
    //                            value39=filtrar39.pop() 
                               
    //                            let filtrar40;
    //                            filtrar40 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 40;
    //                            });
    //                            value40=filtrar40.pop() 
                              
    //                            let filtrar41;
    //                            filtrar41 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 41;
    //                            });
    //                            value41=filtrar41.pop() 
                              
    //                            let filtrar42;
    //                            filtrar42 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 42;
    //                            });
    //                            value42=filtrar42.pop() 
                              
    //                            let filtrar43;
    //                            filtrar43 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 43;
    //                            });
    //                            value43=filtrar43.pop() 
                              
    //                            let filtrar44;
    //                            filtrar44 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 44;
    //                            });
    //                            value44=filtrar44.pop() 
                              
    //                            let filtrar45;
    //                            filtrar45 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 45;
    //                            });
    //                            value45=filtrar45.pop() 
                              
    //                            let filtrar46;
    //                            filtrar46 =rows.filter(function(hero){
    //                              return hero.fk_preguntasRP == 46;
    //                            });
    //                            value46=filtrar46.pop() 
                               
    //                             let valor1=value1.ponderacion;
    //                             let valor2=value2.ponderacion;
    //                             let valor3=value3.ponderacion;
    //                             let valor4=value4.ponderacion;
    //                             let valor5=value5.ponderacion;
    //                             let valor6=value6.ponderacion;
    //                             let valor7=value7.ponderacion;
    //                             let valor8=value8.ponderacion;
    //                             let valor9=value9.ponderacion;
    //                             let valor10=value10.ponderacion;
    //                             let valor11=value11.ponderacion;
    //                             let valor12=value12.ponderacion;
    //                             let valor13=value13.ponderacion;
    //                             let valor14=value14.ponderacion;
    //                             let valor15=value15.ponderacion;
    //                             let valor16=value16.ponderacion;
    //                             let valor17=value17.ponderacion;
    //                             let valor18=value18.ponderacion;
    //                             let valor19=value19.ponderacion;
    //                             let valor20=value20.ponderacion;
    //                             let valor21=value21.ponderacion;
    //                             let valor22=value22.ponderacion;
    //                             let valor23=value23.ponderacion;
    //                             let valor24=value24.ponderacion;
    //                             let valor25=value25.ponderacion;
    //                             let valor26=value26.ponderacion;
    //                             let valor27=value27.ponderacion;
    //                             let valor28=value28.ponderacion;
    //                             let valor29=value29.ponderacion;
    //                             let valor30=value30.ponderacion;
    //                             let valor31=value31.ponderacion;
    //                             let valor32=value32.ponderacion;
    //                             let valor33=value33.ponderacion;
    //                             let valor34=value34.ponderacion;
    //                             let valor35=value35.ponderacion;
    //                             let valor36=value36.ponderacion;
    //                             let valor37=value37.ponderacion;
    //                             let valor38=value38.ponderacion;
    //                             let valor39=value39.ponderacion;
    //                             let valor40=value40.ponderacion;
    //                             let valor41=value41.ponderacion;
    //                             let valor42=value42.ponderacion;
    //                             let valor43=value43.ponderacion;
    //                             let valor44=value44.ponderacion;
    //                             let valor45=value45.ponderacion;
    //                             let valor46=value46.ponderacion;
                              
                              
    //                             let respuesta1=value1.Respuestas;
    //                             let respuesta2=value2.Respuestas;
    //                             let respuesta3=value3.Respuestas;
    //                             let respuesta4=value4.Respuestas;
    //                             let respuesta5=value5.Respuestas;
    //                             let respuesta6=value6.Respuestas;
    //                             let respuesta7=value7.Respuestas;
    //                             let respuesta8=value8.Respuestas;
    //                             let respuesta9=value9.Respuestas;
    //                             let respuesta10=value10.Respuestas;
    //                             let respuesta11=value11.Respuestas;
    //                             let respuesta12=value12.Respuestas;
    //                             let respuesta13=value13.Respuestas;
    //                             let respuesta14=value14.Respuestas;
    //                             let respuesta15=value15.Respuestas;
    //                             let respuesta16=value16.Respuestas;
    //                             let respuesta17=value17.Respuestas;
    //                             let respuesta18=value18.Respuestas;
    //                             let respuesta19=value19.Respuestas;
    //                             let respuesta20=value20.Respuestas;
    //                             let respuesta21=value21.Respuestas;
    //                             let respuesta22=value22.Respuestas;
    //                             let respuesta23=value23.Respuestas;
    //                             let respuesta24=value24.Respuestas;
    //                             let respuesta25=value25.Respuestas;
    //                             let respuesta26=value26.Respuestas;
    //                             let respuesta27=value27.Respuestas;
    //                             let respuesta28=value28.Respuestas;
    //                             let respuesta29=value29.Respuestas;
    //                             let respuesta30=value30.Respuestas;
    //                             let respuesta31=value31.Respuestas;
    //                             let respuesta32=value32.Respuestas;
    //                             let respuesta33=value33.Respuestas;
    //                             let respuesta34=value34.Respuestas;
    //                             let respuesta35=value35.Respuestas;
    //                             let respuesta36=value36.Respuestas;
    //                             let respuesta37=value37.Respuestas;
    //                             let respuesta38=value38.Respuestas;
    //                             let respuesta39=value39.Respuestas;
    //                             let respuesta40=value40.Respuestas;
    //                             let respuesta41=value41.Respuestas;
    //                             let respuesta42=value42.Respuestas;
    //                             let respuesta43=value43.Respuestas;
    //                             let respuesta44=value44.Respuestas;
    //                             let respuesta45=value45.Respuestas;
    //                             let respuesta46=value46.Respuestas;
                            
    //                         let entero1=parseInt(valor1);let entero2=parseInt(valor2);let entero3=parseInt(valor3);let entero4=parseInt(valor4);
    //                         let entero5=parseInt(valor5);let entero6=parseInt(valor6);let entero7=parseInt(valor7);let entero8=parseInt(valor8);
    //                         let entero9=parseInt(valor9);let entero10=parseInt(valor10);let entero11=parseInt(valor11);let entero12=parseInt(valor12);
    //                         let entero13=parseInt(valor13);let entero14=parseInt(valor14);let entero15=parseInt(valor15);let entero16=parseInt(valor16);
    //                         let entero17=parseInt(valor17);let entero18=parseInt(valor18);let entero19=parseInt(valor19);let entero20=parseInt(valor20);
    //                         let entero21=parseInt(valor21);let entero22=parseInt(valor22);let entero23=parseInt(valor23);let entero24=parseInt(valor24);
    //                         let entero25=parseInt(valor25);let entero26=parseInt(valor26);let entero27=parseInt(valor27);let entero28=parseInt(valor28);
    //                         let entero29=parseInt(valor29);let entero30=parseInt(valor30);let entero31=parseInt(valor31);let entero32=parseInt(valor32);
    //                         let entero33=parseInt(valor33);let entero34=parseInt(valor34);let entero35=parseInt(valor35);let entero36=parseInt(valor36);
    //                         let entero37=parseInt(valor37);let entero38=parseInt(valor38);let entero39=parseInt(valor39);let entero40=parseInt(valor40);
    //                         let entero41=parseInt(valor41);let entero42=parseInt(valor42);let entero43=parseInt(valor43);let entero44=parseInt(valor44);
    //                         let entero45=parseInt(valor45);let entero46=parseInt(valor46)
                            
    //                         let total = (entero1+entero2+entero3+entero4+entero5+entero6+entero7+entero8+entero9+entero10+entero11+entero12+entero13+entero14+entero15+entero16+entero17+entero18+entero19+entero20+entero21+entero22+entero23+entero24+entero25+entero26+entero27+entero28+entero29+entero30+entero31+entero32+entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46).toFixed(2);
    //                         // console.log("total" , entero1,entero2,entero3,entero4,entero5,entero6,entero7,entero8,entero9,entero10,entero11,entero12,entero13,entero14,entero15,entero16,entero17,entero18,entero19,entero20,entero21,entero22,entero23,entero24,entero25,entero26,entero27,entero28,entero29,entero30,entero31,entero32,entero33,entero34,entero35,entero36,entero37,entero38,entero39,entero40,entero41,entero42,entero43,entero44,entero45,entero46)
    //                         let celda1;
    //                         let celda2;
    //                         let celda3;
    //                         let celda4;
    //                         let celda5;
    //                         let criterios;
    //                         let color;
    //                         if(total<20){
    //                         color =<TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black" align="justify">Nulo</font></TableCell>
    //                         criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
    //                         celda1 = <TableCell style={{backgroundColor: "#9BE0F7"}} align="right">{total}</TableCell>
    //                         }else if(total>=20 && total <= 45){
    //                           criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align="left">
    //                             <p>Es necesario una mayor difusión de la política de prevención de riesgos
    //                           psicosociales y programas para: la prevención de los factores de riesgo
    //                           psicosocial, la promoción de un entorno organizacional favorable y la
    //                           prevención de la violencia laboral.</p></font></TableCell>
    //                           color= <TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black" >Bajo</font></TableCell>
    //                           celda2 = <TableCell style={{backgroundColor: "#6BF56E"}} align="right">{total}</TableCell>
    //                         }else if(total>=45 && total <= 70){
    //                           criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align="left">
    //                             <p>Se requiere revisar la política de prevención de riesgos psicosociales y
    //                           programas para la prevención de los factores de riesgo psicosocial, la
    //                           promoción de un entorno organizacional favorable y la prevención de la
    //                           violencia laboral, así como reforzar su aplicación y difusión, mediante un
    //                           Programa de intervención.</p></font></TableCell>
    //                         color=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black" align="justify">Medio</font></TableCell>
    //                           celda3 = <TableCell style={{backgroundColor: "#FFFF00"}} align="right">{total}</TableCell>
    //                         }else if(total>=70 && total <= 90){
    //                           criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align=" left">
    //                             <p>Se requiere realizar un análisis de cada categoría y dominio, de manera que
    //                           se puedan determinar las acciones de intervención apropiadas a través de un
    //                           Programa de intervención, que podrá incluir una evaluación específica y
    //                           deberá incluir una campaña de sensibilización, revisar la política de
    //                           prevención de riesgos psicosociales y programas para la prevención de los
    //                           factores de riesgo psicosocial, la promoción de un entorno organizacional
    //                           favorable y la prevención de la violencia laboral, así como reforzar su
    //                           aplicación y difusión.</p></font></TableCell>
    //                           color = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black" >Alto</font></TableCell>
    //                           celda4 = <TableCell style={{backgroundColor: "#FFC000"}} align="right">{total}</TableCell>
    //                         }
    //                         else if( total > 90){
    //                           criterios = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="1" face="arial"color="black" align=" left">
    //                             <p>Se requiere realizar el análisis de cada categoría y dominio para establecer
    //                           las acciones de intervención apropiadas, mediante un Programa de
    //                           intervención que deberá incluir evaluaciones específicas, y contemplar
    //                           campañas de sensibilización, revisar la política de prevención de riesgos
    //                           psicosociales y programas para la prevención de los factores de riesgo
    //                           psicosocial, la promoción de un entorno organizacional favorable y la
    //                           prevención de la violencia laboral, así como reforzar su aplicación y difusión.</p></font></TableCell>
    //                           color = <TableCell style={ {backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
    //                           celda5  = <TableCell style={{backgroundColor: "#FF0000"}} align="right">{total}</TableCell>
    //                         }
                            
    //                         let categoria1Nulo;
    //                         let categoria1Bajo; 
    //                         let categoria1Medio;
    //                         let categoria1Alto;
    //                         let categoria1MuyAlto;
    //                         let colorCategoriaUno;
    //                         let categoriaUno = (entero2+entero1+entero3).toFixed(2);
    //                         // console.log("categoria1" , categoriaUno)
    //                         if(categoriaUno < 3){
    //                           colorCategoriaUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           categoria1Nulo= categoriaUno
    //                         }else if(categoriaUno >= 3 && categoriaUno < 5){
    //                           colorCategoriaUno =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           categoria1Bajo= categoriaUno
    //                         }else if(categoriaUno >= 5 && categoriaUno < 7){
    //                           colorCategoriaUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           categoria1Medio= categoriaUno
    //                         }else if(categoriaUno >= 7 && categoriaUno < 9){
    //                           colorCategoriaUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           categoria1Alto= categoriaUno
    //                         }else if(categoriaUno >= 9){
    //                           colorCategoriaUno = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           categoria1MuyAlto= categoriaUno
    //                         }
                            
    //                         let categoria2Nulo;
    //                         let categoria2Bajo;
    //                         let categoria2Medio;
    //                         let categoria2Alto;
    //                         let categoria2MuyAlto;
    //                         let colorCategoriaDos;
    //                         let categoriaDos = (entero4+entero9+entero5+entero6+entero7+entero8+entero41+entero42+entero43+entero10+entero11+entero12+entero13+entero20+entero21+entero22+entero18+entero19+entero26+entero27).toFixed(2);
    //                         if(categoriaDos < 10){
    //                           colorCategoriaDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           categoria2Nulo= categoriaDos
    //                         }else if(categoriaDos >= 10 && categoriaDos < 20){
    //                           colorCategoriaDos =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           categoria2Bajo= categoriaDos
    //                         }else if(categoriaDos >=20 && categoriaDos < 30){
    //                           colorCategoriaDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           categoria2Medio= categoriaDos
    //                         }else if(categoriaDos >=30 && categoriaDos < 40){
    //                           colorCategoriaDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           categoria2Alto= categoriaDos
    //                         }else if(categoriaDos >= 40){
    //                           colorCategoriaDos = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           categoria2MuyAlto= categoriaDos
    //                         }
    //                         let categoria3Nulo;
    //                         let categoria3Bajo;
    //                         let categoria3Medio;
    //                         let categoria3Alto;
    //                         let categoria3MuyAlto;
    //                         let colorCategoriaTre;
    //                         let categoriaTre = (entero14+entero15+entero16+entero17).toFixed(2);
    //                         if(categoriaTre < 4){
    //                           colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           categoria3Nulo= categoriaTre
    //                         }else if(categoriaTre >= 4 && categoriaTre < 6){
    //                           colorCategoriaTre =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           categoria3Bajo= categoriaTre
    //                         }else if(categoriaTre >=6 && categoriaTre < 9){
    //                           colorCategoriaTre=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           categoria3Medio= categoriaTre
    //                         }else if(categoriaTre >=9 && categoriaTre < 12){
    //                           colorCategoriaTre = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           categoria3Alto= categoriaTre
    //                         }else if(categoriaTre >= 12){
    //                           colorCategoriaTre = <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           categoria3MuyAlto= categoriaTre
    //                         }
                            
    //                         let categoria4Nulo;
    //                         let categoria4Bajo;
    //                         let categoria4Medio;
    //                         let categoria4Alto;
    //                         let categoria4MuyAlto;
    //                         let colorCategoriaCuatro;
    //                         let categoriaCuatro = (entero23+entero24+entero25+entero28+entero29+entero30+entero31+entero32+entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40+entero44+entero45+entero46).toFixed(2);
    //                         if(categoriaCuatro < 10){
    //                           colorCategoriaCuatro  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           categoria4Nulo= categoriaCuatro
    //                         }else if(categoriaCuatro >= 10 && categoriaCuatro < 18){
    //                           colorCategoriaCuatro =<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           categoria4Bajo= categoriaCuatro
    //                         }else if(categoriaCuatro >=18 && categoriaCuatro < 28){
    //                           colorCategoriaCuatro=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           categoria4Medio= categoriaCuatro
    //                         }else if(categoriaCuatro >=28 && categoriaCuatro < 38){
    //                           colorCategoriaCuatro = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           categoria4Alto= categoriaCuatro
    //                         }else if(categoriaCuatro >= 38){
    //                           colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           categoria4MuyAlto= categoriaCuatro
    //                         }
                            
    //                         // console.log("categoria" , categoriaUno,categoriaDos,categoriaTre,categoriaCuatro)
    //                         let Dominio1Nulo;
    //                         let Dominio1Bajo;
    //                         let Dominio1Medio;
    //                         let Dominio1Alto;
    //                         let Dominio1MuyAlto;
    //                         let colorDominioUno;
    //                         let DominioUno = (entero2+entero1+entero3).toFixed(2);
    //                         if(DominioUno < 3){
    //                           colorDominioUno  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           Dominio1Nulo= DominioUno
    //                         }else if(DominioUno >= 3 && DominioUno < 5){
    //                           colorDominioUno=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           Dominio1Bajo= DominioUno
    //                         }else if(DominioUno >= 5 && DominioUno < 7){
    //                           colorDominioUno=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           Dominio1Medio= DominioUno
    //                         }else if(DominioUno >= 7 && DominioUno < 9){
    //                           colorDominioUno = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           Dominio1Alto= DominioUno
    //                         }else if(DominioUno >= 9){
    //                           colorDominioUno= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           Dominio1MuyAlto= DominioUno
    //                         }
                            
    //                         let Dominio2Nulo;
    //                         let Dominio2Bajo;
    //                         let Dominio2Medio;
    //                         let Dominio2Alto;
    //                         let Dominio2MuyAlto;
    //                         let colorDominioDos;
    //                         let DominioDos = (entero4+entero9+entero5+entero6+entero7+entero8+entero41+entero42+entero43+entero10+entero11+entero12+entero13).toFixed(2);
    //                         if(DominioDos < 12){
    //                           colorDominioDos  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           Dominio2Nulo= DominioDos
    //                         }else if(DominioDos >= 12 && DominioDos < 16){
    //                           colorDominioDos=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           Dominio2Bajo= DominioDos
    //                         }else if(DominioDos >= 16 && DominioDos < 20){
    //                           colorDominioDos=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           Dominio2Medio= DominioDos
    //                         }else if(DominioDos >= 20 && DominioDos < 24){
    //                           colorDominioDos = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           Dominio2Alto= DominioDos
    //                         }else if(DominioDos >= 24){
    //                           colorDominioDos= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           Dominio2MuyAlto= DominioDos
    //                         }
                            
    //                         let Dominio3Nulo;
    //                         let Dominio3Bajo;
    //                         let Dominio3Medio;
    //                         let Dominio3Alto;
    //                         let Dominio3MuyAlto;
    //                         let colorDominioTres
    //                         let DominioTres = (entero20+entero21+entero22+entero18+entero19+entero26+entero27).toFixed(2);
    //                         if(DominioTres < 5){
    //                           colorDominioTres  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           Dominio3Nulo= DominioTres
    //                         }else if(DominioTres >= 5 && DominioTres < 8){
    //                           colorDominioTres=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           Dominio3Bajo= DominioTres
    //                         }else if(DominioTres >= 8 && DominioTres < 11){
    //                           colorDominioTres=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           Dominio3Medio= DominioTres
    //                         }else if(DominioTres >= 11 && DominioTres < 14){
    //                           colorDominioTres = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           Dominio3Alto= DominioTres
    //                         }else if(DominioTres >= 14){
    //                           colorDominioTres= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           Dominio3MuyAlto= DominioTres
    //                         }
                            
    //                         let Dominio4Nulo;
    //                         let Dominio4Bajo;
    //                         let Dominio4Medio;
    //                         let Dominio4Alto;
    //                         let Dominio4MuyAlto;
    //                         let colorDominioCuatro;
    //                         let DominioCuatro = (entero14+entero15).toFixed(2);
    //                         if(DominioCuatro < 1){
    //                           colorDominioCuatro  = <td style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           Dominio4Nulo= DominioCuatro
    //                         }else if(DominioCuatro >= 1 && DominioCuatro < 2){
    //                           colorDominioCuatro=<td style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           Dominio4Bajo= DominioCuatro
    //                         }else if(DominioCuatro >= 2 && DominioCuatro < 4){
    //                           colorDominioCuatro=<td style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           Dominio4Medio= DominioCuatro
    //                         }else if(DominioCuatro >= 4 && DominioCuatro < 6){
    //                           colorDominioCuatro = <td style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           Dominio4Alto= DominioCuatro
    //                         }else if(DominioCuatro >= 6){
    //                           colorDominioCuatro= <td style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           Dominio4MuyAlto= DominioCuatro
    //                         }
                            
    //                         let Dominio5Nulo;
    //                         let Dominio5Bajo;
    //                         let Dominio5Medio;
    //                         let Dominio5Alto;
    //                         let Dominio5MuyAlto;
    //                         let colorDominioCinco;
    //                         let DominioCinco = (entero16+entero17).toFixed(2);
    //                         if(DominioCinco < 1){
    //                           colorDominioCinco  = <td width="15px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           Dominio5Nulo= DominioCinco
    //                         }else if(DominioCinco >= 1 && DominioCinco < 2){
    //                           colorDominioCinco=<td width="15px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           Dominio5Bajo= DominioCinco
    //                         }else if(DominioCinco >= 2 && DominioCinco < 4){
    //                           colorDominioCinco=<td width="15px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           Dominio5Medio= DominioCinco
    //                         }else if(DominioCinco >= 4 && DominioCinco < 6){
    //                           colorDominioCinco = <td  width="15px"style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           Dominio5Alto= DominioCinco
    //                         }else if(DominioCinco >= 6){
    //                           colorDominioCinco= <td  width="15px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           Dominio5MuyAlto= DominioCinco
    //                         }
                            
    //                         let Dominio6Nulo;
    //                         let Dominio6Bajo;
    //                         let Dominio6Medio;
    //                         let Dominio6Alto;
    //                         let Dominio6MuyAlto;
    //                         let colorDominioSeis;
    //                         let DominioSeis = (entero23+entero24+entero25+entero28+entero29).toFixed(2);
    //                         if(DominioSeis < 3){
    //                           colorDominioSeis  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           Dominio6Nulo= DominioSeis
    //                         }else if(DominioSeis >= 3 && DominioSeis < 5){
    //                           colorDominioSeis=<td  width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           Dominio6Bajo= DominioSeis
    //                         }else if(DominioSeis >= 5 && DominioSeis < 8){
    //                           colorDominioSeis=<td width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           Dominio6Medio= DominioSeis
    //                         }else if(DominioSeis >= 8 && DominioSeis < 11){
    //                           colorDominioSeis = <td width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           Dominio6Alto= DominioSeis
    //                         }else if(DominioSeis >= 11){
    //                           colorDominioSeis= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           Dominio6MuyAlto= DominioSeis
    //                         }
                            
    //                         let Dominio7Nulo;
    //                         let Dominio7Bajo;
    //                         let Dominio7Medio;
    //                         let Dominio7Alto;
    //                         let Dominio7MuyAlto;
    //                         let colorDominioSiete;
    //                         let DominioSiete = (entero30+entero31+entero32+entero44+entero45+entero46).toFixed(2);
                            
    //                         if(DominioSiete < 5){
    //                           colorDominioSiete  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           Dominio7Nulo= DominioSiete
    //                         }else if(DominioSiete >= 5 && DominioSiete < 8){
    //                           colorDominioSiete=<td width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           Dominio7Bajo= DominioSiete
    //                         }else if(DominioSiete >= 8 && DominioSiete < 11){
    //                           colorDominioSiete=<td  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           Dominio7Medio= DominioSiete
    //                         }else if(DominioSiete >= 11 && DominioSiete < 14){
    //                           colorDominioSiete = <td width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           Dominio7Alto= DominioSiete
    //                         }else if(DominioSiete >= 14){
    //                           colorDominioSiete= <td  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           Dominio7MuyAlto= DominioSiete
    //                         }
                            
    //                         let Dominio8Nulo;
    //                         let Dominio8Bajo;
    //                         let Dominio8Medio;
    //                         let Dominio8Alto;
    //                         let Dominio8MuyAlto;
    //                         let colorDominioOcho;
    //                         let DominioOcho = (entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40).toFixed(2);
    //                         if(DominioOcho < 7){
    //                           colorDominioOcho  = <td width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></td>
    //                           Dominio8Nulo= DominioOcho
    //                         }else if(DominioOcho >= 7 && DominioOcho < 10){
    //                           colorDominioOcho  = <td width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></td>
    //                           Dominio8Bajo= DominioOcho
    //                         }else if(DominioOcho >= 10 && DominioOcho < 13){
    //                           colorDominioOcho=<td width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></td>
    //                           Dominio8Medio= DominioOcho
    //                         }else if(DominioOcho >= 13 && DominioOcho < 16){
    //                           colorDominioOcho = <td width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></td>
    //                           Dominio8Alto= DominioOcho
    //                         }else if(DominioOcho >= 16){
    //                           colorDominioOcho= <td width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></td>
    //                           Dominio8MuyAlto= DominioOcho
    //                                 }
    //                         return(
    //                           <div style={{ width: "550px" }}>
    //                           <MDBRow style={{marginBottom:10}}> 
    //                           <MDBCol>
    //                           <img src={logo} alt="logo" style = {{width:550}}/>
    //                           <MDBTable  component={Paper}  small borderless className="text-left mt-4 ">
    //                           <MDBTableBody>  
    //                           <font size="3"face="arial"color="black">Reporte individual de resultados para identificar los factores de Riesgo Psicosocial en los centros de trabajo</font><br></br>  <br></br>
    //                           <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")} </font><br></br>  
    //                           <font color="black" className= "textleft"  size="1"><strong>{rows[0].nombre} {rows[0].ApellidoP} {rows[0].ApellidoM}</strong></font><br/>        
    //                           <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
    //                           <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font><br/>
    //                           <font color="black" className= "textleft"  size="1">Periodo: <strong>{rows[0].Periodo}</strong></font><br/>
    //                           <font size="1"face="arial"color="black">Fecha de emisión : <strong>{this.state.date}</strong></font>
    //                           <br></br>
    //                           <br></br>
    //                           <br></br>
    //                           <br></br>
    //                           </MDBTableBody>
    //                           </MDBTable>    
    //                           <center>   <img src={diagnostico} alt="logo" style = {{width:120,heigth:50}}/>&nbsp;&nbsp;&nbsp;<img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:90,heigth:20}}/></center>
    //                           </MDBCol> 
    //                           </MDBRow> 
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <br></br>
    //                             <center>
    //                             <p  className ="text-center"><strong> <font size="1"face="arial"color="black">GUÍA DE REFERENCIA II
    //                             CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN
    //                             LOS CENTROS DE TRABAJO</font></strong> </p>
    //                             </center>
    //                             <MDBTable bordless >
    //                             <MDBTableBody>
    //                             <tr>
    //                               <td width="30%"><font size="1" face="arial"color="black"><strong>{localStorage.getItem("razonsocial")}</strong></font></td>
    //                               <td width="14%"><font size="1" face="arial"color="black"><strong>{this.state.nombre3}</strong></font></td>
    //                               <td width="14%"><font size="1" face="arial"color="black"><strong>{this.state.nombre4}</strong></font></td>
    //                               <td width="14%"><font size="1" face="arial"color="black"><strong>{this.state.nombre5}</strong></font></td>
    //                               <td width="14%"><font size="1" face="arial"color="black"><strong>{this.state.nombre6}</strong></font></td>
    //                               <td width="14%"><font size="1" face="arial"color="black"><strong>{this.state.nombre7}</strong></font></td>
    //                             </tr> 
    //                             </MDBTableBody>
    //                             </MDBTable>
    //                             <MDBTable  large bordered  className="text-center">
    //                             <MDBTableBody>  
    //                             <tr >                              
    //                             <td width = "32%"><font size="1" face="arial"color="#283747" ><strong>Resultado:</strong></font></td>
    //                             <td width = "13%" className="text-left"><font size="1" face="arial"color="#273746"><strong>   {total}</strong></font></td>
    //                             <td width = "30%"><font size="1" face="arial"color="#283747"><strong> Nivel de riesgo:</strong></font></td>
    //                             {color}                                  
    //                             </tr>   
    //                             </MDBTableBody>                                              
    //                             </MDBTable>
    //                             <Table  responsive small bordless  className="text-left mb-2">
    //                             <tr >                              
    //                             <td width="100%"><font size="2" face="arial"color="black" ><strong>Necesidad de la acción : </strong></font></td>                                    
    //                             </tr>
    //                             <tr>
    //                               <td width="100%"><font size="1" face="arial"color="black" >{criterios}</font></td>
    //                             </tr>
    //                             </Table>
    //                        <p style={{textAlign: 'left'}}><font color="red" style= {{marginTop:20}}  size="1">I.- Resultados de la categoría</font></p>
    //                         <table width="530" className="table-bordered"> 
                                  
    //                              <tr >                              
    //                               <td width="10%"><font size="1" face="arial"color="black" ></font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Categoría</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
    //                               <td ><font size="1" face="arial"color="black">Riesgo</font></td>                                         
    //                             </tr>
    //                             <tr>           
    //                             <td  width="10%"><font size="1" face="arial"color="black" >1</font></td>
    //                             <td  width="60%"><font size="1" face="arial"color="black">Ambiente de Trabajo</font></td>
    //                             <td  width="20%"><font size="1" face="arial"color="black">{categoriaUno}</font></td>
    //                              {colorCategoriaUno}                
    //                             </tr>
    //                             <tr>         
    //                               <td  width="10%"><font size="1" face="arial"color="black" >2</font></td>
    //                               <td  width="60%"><font size="1" face="arial"color="black">Factores propios de la actividad</font></td>
    //                               <td  width="20%"><font size="1" face="arial"color="black">{categoriaDos}</font></td>
    //                                {colorCategoriaDos}
    //                             </tr>
    //                             <tr>         
    //                               <td  width="10%"><font size="1" face="arial"color="black" >3</font></td>
    //                               <td  width="60%"><font size="1" face="arial"color="black">Organización del tiempo de trabajo</font></td>
    //                               <td  width="20%"><font size="1" face="arial"color="black">{categoriaTre}</font></td>
    //                               {colorCategoriaTre}
    //                             </tr>
    //                             <tr>         
    //                               <td  width="10%"><font size="1" face="arial"color="black" >4</font></td>
    //                               <td  width="60%"><font size="1" face="arial"color="black">Liderazgo y relaciones en el trabajo</font></td>
    //                               <td  width="20%"><font size="1" face="arial"color="black">{categoriaCuatro}</font></td>
    //                               {colorCategoriaCuatro}
    //                               </tr>
    //                            </table>
    //                         <p style={{textAlign: 'left'}}><font color="red" style= {{marginTop:40}}  size="1">II.- Resultados del dominio</font></p>
    //                           <table width="530" className="table-bordered">                                             
    //                              <tr >                              
    //                               <td width="10%"><font size="1" face="arial"color="black" ></font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Dominio</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
    //                               <td ><font size="1" face="arial"color="black">Riesgo</font></td>                                         
    //                             </tr>
    //                             <tr>           
    //                             <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
    //                             <td width="60%"><font size="1" face="arial"color="black">Condiciones en el ambiente de trabajo</font></td>
    //                             <td width="20%"><font size="1" face="arial"color="black">{DominioUno}</font></td>
    //                              {colorDominioUno}                
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Carga de trabajo</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{DominioDos}</font></td>
    //                                {colorDominioDos}
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Falta de control sobre el trabajo</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{DominioTres}</font></td>
    //                               {colorDominioTres}
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Jornada de trabajo</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{DominioCuatro}</font></td>
    //                               {colorDominioCuatro}
    //                               </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Interferencia en la relación trabajo-familia</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{DominioCinco}</font></td>
    //                               {colorDominioCinco}  
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >6</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Liderazgo</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{DominioSeis}</font></td>
    //                               {colorDominioSeis}  
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >7</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Relaciones en el trabajo</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{DominioSiete}</font></td>
    //                               {colorDominioSiete}  
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >8</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Violencia</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{DominioOcho}</font></td>
    //                               {colorDominioOcho}  
    //                             </tr>
    //                           </table>
    //                           <br/>                                       
    //                         <p style={{textAlign: 'left'}}>  <font color="red" style= {{marginTop:40}}  size="1">III.- Resultados por Dimensión</font></p>
    //                           <table width="530"  className="table-bordered">                                             
    //                              <tr >                              
    //                               <td width="10%"><font size="1" face="arial"color="black" ></font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Dimensión</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">Calificación</font></td>
    //                             </tr>
    //                             <tr>           
    //                             <td width="10%"><font size="1" face="arial"color="black" >1</font></td>
    //                             <td width="60%"><font size="1" face="arial"color="black">Condiciones peligrosas e inseguras</font></td>
    //                             <td width="20%"><font size="1" face="arial"color="black">{entero2.toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >2</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{entero1.toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >3</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{entero3.toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >4</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero4+entero9).toFixed(2)}</font></td>
    //                               </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >5</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero5+entero6).toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >6</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Carga mental</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero7+entero8).toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >7</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero41+entero42+entero43).toFixed(2)}</font></td>
    //                               </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >8</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero10+entero11).toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>           
    //                             <td width="10%"><font size="1" face="arial"color="black" >9</font></td>
    //                             <td width="60%"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
    //                             <td width="20%"><font size="1" face="arial"color="black">{(entero12+entero13).toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >10</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero20+entero21+entero22).toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >11</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero18+entero19).toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >12</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero26+entero27).toFixed(2)}</font></td>
    //                               </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >13</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero14+entero15).toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >14</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{entero16.toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >15</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero17).toFixed(2)}</font></td>
    //                               </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >16</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero23+entero24+entero25).toFixed(2)}</font></td>
    //                             </tr>

    //                             <tr>           
    //                             <td width="10%"><font size="1" face="arial"color="black" >17</font></td>
    //                             <td width="60%"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
    //                             <td width="20%"><font size="1" face="arial"color="black">{(entero28+entero29).toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >18</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Relaciones sociales en el trabajo</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero30+entero31+entero32).toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >19</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{(entero44+entero45+entero46).toFixed(2)}</font></td>
    //                             </tr>
    //                             <tr>         
    //                               <td width="10%"><font size="1" face="arial"color="black" >20</font></td>
    //                               <td width="60%"><font size="1" face="arial"color="black">Violencia laboral</font></td>
    //                               <td width="20%"><font size="1" face="arial"color="black">{entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40}</font></td>
    //                               </tr>
    //                           </table>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //                           <br/>
    //          {/* <Alert className ="mt-4" color ="primary ">INFORMACIÓN: LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert> */}
    //          </div> 
    //            )}
    //            })}
    //          </PDFExport>
    //   </div>  
    //   </div>
         );
    }
}
 
export default reportRPMR;