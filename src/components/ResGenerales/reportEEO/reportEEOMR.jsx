import React, { Component } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import PageTemplate from '../pageTemplate.jsx';
import {MDBTable} from 'mdbreact';
import logo from '../../images/logo.png'
import Table from '@material-ui/core/Table';
import {Card} from 'antd';
import '../styles.css'

class reportEEOMR extends Component {
    pdfExportComponent;
    constructor(props) {
        super(props);
        this.state = {  }
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
        let valor47=parseInt(value47.ponderacion);
        let valor48=parseInt(value48.ponderacion);
        let valor49=parseInt(value49.ponderacion);
        let valor50=parseInt(value50.ponderacion);  
        let valor51=parseInt(value51.ponderacion);
        let valor52=parseInt(value52.ponderacion);
        let valor53=parseInt(value53.ponderacion);
        let valor54=parseInt(value54.ponderacion);
        let valor55=parseInt(value55.ponderacion);
        let valor56=parseInt(value56.ponderacion);
        let valor57=parseInt(value57.ponderacion);
        let valor58=parseInt(value58.ponderacion);
        let valor59=parseInt(value59.ponderacion);
        let valor60=parseInt(value60.ponderacion); 
        let valor61=parseInt(value61.ponderacion);
        let valor62=parseInt(value62.ponderacion);
        let valor63=parseInt(value63.ponderacion);
        let valor64=parseInt(value64.ponderacion);
        let valor65=parseInt(value65.ponderacion);
        let valor66=parseInt(value66.ponderacion);
        let valor67=parseInt(value67.ponderacion);
        let valor68=parseInt(value68.ponderacion);
        let valor69=parseInt(value69.ponderacion);
        let valor70=parseInt(value70.ponderacion);
        let valor71=parseInt(value71.ponderacion);
        let valor72=parseInt(value72.ponderacion);
        let total = (valor1+valor2+valor3+valor4+valor5+valor6+valor7+valor8+valor9+valor10+valor11+valor12+valor13+valor14+valor15+valor16+valor17+valor18+valor19+valor20+valor21+valor22+valor23+valor24+valor25+valor26+valor27+valor28+valor29+valor30+valor31+valor32+valor33+valor34+valor35+valor36+valor37+valor38+valor39+valor40+valor41+valor42+valor43+valor44+valor45+valor46+valor47+valor48+valor49+valor50+valor51+valor52+valor53+valor54+valor55+valor56+valor57+valor58+valor59+valor60+valor61+valor62+valor63+valor64+valor65+valor66+valor67+valor68+valor69+valor70+valor71+valor72).toFixed(2);
        let criteriosPrev;
        let color;
        if(total<50){
            color =<p className="textabla2" style={{backgroundColor:"#9BE0F7"}}>Nulo</p>
            criteriosPrev = <p className="textabla3" style={{backgroundColor: "#a7f5ea",padding:"5px"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</p>
        }else if(total>=50 && total <= 75){
              color= <p className="textabla2" style={{backgroundColor:"#6BF56E"}}>Bajo</p>
              criteriosPrev =  <p className="textabla3" style={{backgroundColor: "#a7f5ea",padding:"5px"}}>Es necesario una mayor difusión de la política de prevención de riesgos
              psicosociales y programas para: la prevención de los factores de riesgo
              psicosocial, la promoción de un entorno organizacional favorable y la
              prevención de la violencia laboral.</p>
        }else if(total>=75 && total <= 99){
              color=<p className="textabla2" style={{backgroundColor:"#FFFF00"}}>Medio</p>
                criteriosPrev = <p className="textabla3" style={{backgroundColor: "#a7f5ea",padding:"5px"}} >Se requiere revisar la política de prevención de riesgos psicosociales y
                programas para la prevención de los factores de riesgo psicosocial, la
                promoción de un entorno organizacional favorable y la prevención de la
                violencia laboral, así como reforzar su aplicación y difusión, mediante un
                Programa de intervención.</p>
        }else if(total>=99 && total <= 140){
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
        else if( total > 140){
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

        let colorCategoriaUno,colorCategoriaDos,colorCategoriaTre,colorCategoriaCuatro,colorCategoriaCinco;
        let colorDominioUno,colorDominioDos,colorDominioTres,colorDominioCuatro,colorDominioCinco,colorDominioSeis,colorDominioSiete,colorDominioOcho,colorDominioNueve,colorDominioDiez;
        let categoriaUno = (valor1+valor3+valor2+valor4+valor5).toFixed(2);      
        if(categoriaUno < 5){
          colorCategoriaUno  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(categoriaUno >= 5 && categoriaUno < 9){
          colorCategoriaUno =<td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(categoriaUno >= 9 && categoriaUno < 11){
          colorCategoriaUno=<td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(categoriaUno >= 11 && categoriaUno < 14){
          colorCategoriaUno = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(categoriaUno >= 14){
          colorCategoriaUno = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
        let categoriaDos = (valor6+valor12+valor7+valor8+valor9+valor10+valor11+valor65+valor66+valor67+valor68+valor13+valor14+valor15+valor16+valor25+valor26+valor27+valor28+valor23+valor24+valor29+valor30+valor35+valor36).toFixed(2);
        if(categoriaDos < 15){
          colorCategoriaDos  =  <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(categoriaDos >= 15 && categoriaDos < 30){
          colorCategoriaDos =<td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(categoriaDos >=30 && categoriaDos < 45){
          colorCategoriaDos=<td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(categoriaDos >=45 && categoriaDos < 60){
          colorCategoriaDos = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(categoriaDos >= 60){
          colorCategoriaDos = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
        let categoriaTre = (valor17+valor18+valor19+valor20+valor21+valor22).toFixed(2);
        if(categoriaTre < 5){
          colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(categoriaTre >= 5 && categoriaTre < 7){
          colorCategoriaTre = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(categoriaTre >=7 && categoriaTre < 10){
          colorCategoriaTre = <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(categoriaTre >=10 && categoriaTre < 13){
          colorCategoriaTre = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(categoriaTre >= 13){
          colorCategoriaTre = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
        let categoriaCuatro = (valor31+valor32+valor33+valor34+valor37+valor38+valor39+valor40+valor41+valor42+valor43+valor44+valor45+valor46+valor69+valor70+valor71+valor72+valor57+valor58+valor59+valor60+valor61+valor62+valor63+valor64).toFixed(2);
        if(categoriaCuatro < 14){
          colorCategoriaCuatro  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
          colorCategoriaCuatro =  <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(categoriaCuatro >=29 && categoriaCuatro < 42){
          colorCategoriaCuatro= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(categoriaCuatro >=42 && categoriaCuatro < 58){
          colorCategoriaCuatro = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(categoriaCuatro >= 58){
          colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
        let categoriaCinco = (valor47+valor48+valor49+valor50+valor51+valor52+valor55+valor56+valor53+valor54).toFixed(2);
        if(categoriaCinco < 10){
          colorCategoriaCinco  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(categoriaCinco >= 10 && categoriaCinco < 14){
          colorCategoriaCinco= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(categoriaCinco >=14 && categoriaCinco < 18){
          colorCategoriaCinco= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(categoriaCinco >=18 && categoriaCinco < 23){
          colorCategoriaCinco = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(categoriaCinco >= 23){
          colorCategoriaCinco= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
  
        let DominioUno = (valor1+valor3+valor2+valor4+valor5).toFixed(2);
        if(DominioUno < 5){
          colorDominioUno  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(DominioUno >= 5 && DominioUno < 9){
          colorDominioUno = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(DominioUno >= 9 && DominioUno < 11){
          colorDominioUno= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(DominioUno >=11 && DominioUno < 14){
          colorDominioUno = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(DominioUno >= 14){
          colorDominioUno= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
        let DominioDos = (valor6+valor12+valor7+valor8+valor9+valor10+valor11+valor65+valor66+valor67+valor68+valor13+valor14+valor15+valor16).toFixed(2);
        if(DominioDos < 15){
          colorDominioDos  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(DominioDos >= 15 && DominioDos < 21){
          colorDominioDos= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(DominioDos >= 21 && DominioDos < 27){
          colorDominioDos= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(DominioDos >= 27 && DominioDos < 37){
          colorDominioDos = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(DominioDos >= 37){
          colorDominioDos= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
        let DominioTres = (valor25+valor26+valor27+valor28+valor23+valor24+valor29+valor30+valor35+valor36).toFixed(2);
        if(DominioTres < 11){
          colorDominioTres  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(DominioTres >= 11 && DominioTres < 16){
          colorDominioTres= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(DominioTres >= 16 && DominioTres < 21){
          colorDominioTres= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(DominioTres >= 21 && DominioTres < 25){
          colorDominioTres = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(DominioTres >= 25){
          colorDominioTres= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
        let DominioCuatro = (valor17+valor18).toFixed(2);
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
        let DominioCinco = (valor19+valor20+valor21+valor22).toFixed(2);
        if(DominioCinco < 4){
          colorDominioCinco  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(DominioCinco >= 4 && DominioCinco < 6){
          colorDominioCinco= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(DominioCinco >= 6 && DominioCinco < 8){
          colorDominioCinco= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(DominioCinco >= 8 && DominioCinco < 10){
          colorDominioCinco = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(DominioCinco >= 10){
          colorDominioCinco= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
        let DominioSeis = (valor31+valor32+valor33+valor34+valor37+valor38+valor39+valor40+valor41).toFixed(2);
        if(DominioSeis < 9){
          colorDominioSeis  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(DominioSeis >= 9 && DominioSeis < 12){
          colorDominioSeis= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(DominioSeis >= 12 && DominioSeis < 16){
          colorDominioSeis= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(DominioSeis >= 16 && DominioSeis < 20){
          colorDominioSeis = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(DominioSeis >= 20){
          colorDominioSeis= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
        let DominioSiete = (valor42+valor43+valor44+valor45+valor46+valor69+valor70+valor71+valor72).toFixed(2);
        if(DominioSiete < 10){
          colorDominioSiete  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(DominioSiete >= 10 && DominioSiete < 13){
          colorDominioSiete = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(DominioSiete >= 13 && DominioSiete < 17){
          colorDominioSiete= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(DominioSiete >= 17 && DominioSiete < 21){
          colorDominioSiete = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(DominioSiete >= 21){
          colorDominioSiete=  <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
        let DominioOcho = (valor57+valor58+valor59+valor60+valor61+valor62+valor63+valor64).toFixed(2);
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
        let DominioNueve = (valor47+valor48+valor49+valor50+valor51+valor52).toFixed(2);
        if(DominioNueve < 6){
          colorDominioNueve  =  <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(DominioNueve >= 6 && DominioNueve < 10){
          colorDominioNueve  = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(DominioNueve >= 10 && DominioNueve < 14){
          colorDominioNueve= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(DominioNueve >= 14 && DominioNueve < 18){
          colorDominioNueve = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(DominioNueve >= 18){
          colorDominioNueve= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        }
        let DominioDiez = (valor55+valor56+valor53+valor54).toFixed(2);
        if(DominioDiez < 4){
          colorDominioDiez  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(DominioDiez >= 4 && DominioDiez < 6){
          colorDominioDiez  = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        }else if(DominioDiez >= 6 && DominioDiez < 8){
          colorDominioDiez= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        }else if(DominioDiez >= 8 && DominioDiez < 10){
          colorDominioDiez = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        }else if(DominioDiez >= 10){
          colorDominioDiez= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
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
                <p className="textabla2"><strong>GUÍA DE REFERENCIA III
                CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN
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
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>5</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Entorno organizacional</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{categoriaCinco}</td>
                    {colorCategoriaCinco}
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
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Carga de Trabajo</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioUno}</td>
                    {colorDominioUno}
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>2</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Condiciones en el ambiente de trabajo</td>
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
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Interferencia en la relación trabajo-familia</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioCuatro}</td>
                    {colorDominioCuatro}
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>5</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Jornada de trabajo</td>
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
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>9</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Reconocimiento del desempeño</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioNueve}</td>
                    {colorDominioNueve}
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>10</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Insuficiente sentido de pertenencia e, inestabilidad</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{DominioDiez}</td>
                    {colorDominioDiez}
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
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor1+valor3).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>2</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Condiciones deficientes e insalubres</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor2+valor4).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>3</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Trabajos peligrosos</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{valor5.toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>4</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Cargas cuantitativas</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor6+valor12).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>5</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Ritmos de trabajo acelerado</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor7+valor8).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>6</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Carga mental</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor9+valor10+valor11).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>7</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Cargas psicológicas emocionales</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor65+valor66+valor67+valor68).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>8</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Cargas de alta responsabilidad</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor13+valor14).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>9</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Cargas contradictorias o inconsistentes</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor15+valor16).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>10</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Falta de control y autonomía sobre el trabajo</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor25+valor26+valor27+valor28).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>11</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Limitada o nula posibilidad de desarrollo</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor23+valor24).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>12</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Insuficiente participación y manejo del cambio</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor29+valor30).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>13</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Limitada o inexistente capacitación</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor35+valor36).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>14</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Jornadas de trabajo extensas</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor17+valor18).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>15</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Influencia del trabajo fuera del centro laboral</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor19+valor20).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>16</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Influencia de las responsabilidades familiares</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor21+valor22).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>17</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Escasa claridad de funciones</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor31+valor32+valor33+valor34).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>18</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Características del liderazgo</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor37+valor38+valor39+valor40+valor41).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>19</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Relaciones sociales en el trabajo</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor42+valor43+valor44+valor45+valor46).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>20</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Deficiente relación con los colaboradores que Supervisa</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor69+valor70+valor71+valor72).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>21</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Violencia laboral</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor57+valor58+valor59+valor60+valor61+valor62+valor63+valor64).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>22</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Escasa o nula retroalimentación del desempeño</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor47+valor48).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>23</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Escaso o nulo reconocimiento y compensación</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor49+valor50+valor51+valor52).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>24</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Limitado sentido de pertenencia</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor55+valor56).toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="textabla3" width="10%" style= {{padding:"2px"}}>25</td>
                    <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left">Ritmos de trabajo acelerado</td>
                    <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center">{(valor53+valor54).toFixed(2)}</td>
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
         );
    }
}
 
export default reportEEOMR;