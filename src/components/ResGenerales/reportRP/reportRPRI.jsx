import React from 'react'
import {MDBTable, MDBIcon} from 'mdbreact';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import diagnostico from '../../images/diagnostico.png'
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import { PDFExport } from '@progress/kendo-react-pdf';
import PageTemplate from '../pageTemplate.jsx';
import logo from '../../images/logo.png'
import {Card,Button} from 'antd'
import '../styles.css'
class reportEEORI extends React.Component {
    pdfExportComponent;
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() { 
        const {data,fechaCompleta} = this.props
        let representante = localStorage.getItem("nombre") + " " + localStorage.getItem("apellidos")
        let periodoEvaluacion = localStorage.getItem("periodo")
        let valor1=parseInt(data[0].ponderacion);
        let valor2=parseInt(data[1].ponderacion);
        let valor3=parseInt(data[2].ponderacion);
        let valor4=parseInt(data[3].ponderacion);
        let valor5=parseInt(data[4].ponderacion);
        let valor6=parseInt(data[5].ponderacion);
        let valor7=parseInt(data[6].ponderacion);
        let valor8=parseInt(data[7].ponderacion);
        let valor9=parseInt(data[8].ponderacion);
        let valor10=parseInt(data[9].ponderacion);
        let valor11=parseInt(data[10].ponderacion);
        let valor12=parseInt(data[11].ponderacion);
        let valor13=parseInt(data[12].ponderacion);
        let valor14=parseInt(data[13].ponderacion);
        let valor15=parseInt(data[14].ponderacion);
        let valor16=parseInt(data[15].ponderacion);
        let valor17=parseInt(data[16].ponderacion);
        let valor18=parseInt(data[17].ponderacion);
        let valor19=parseInt(data[18].ponderacion);
        let valor20=parseInt(data[19].ponderacion);
        let valor21=parseInt(data[20].ponderacion);
        let valor22=parseInt(data[21].ponderacion);
        let valor23=parseInt(data[22].ponderacion);
        let valor24=parseInt(data[23].ponderacion);
        let valor25=parseInt(data[24].ponderacion);
        let valor26=parseInt(data[25].ponderacion);
        let valor27=parseInt(data[26].ponderacion);
        let valor28=parseInt(data[27].ponderacion);
        let valor29=parseInt(data[28].ponderacion);
        let valor30=parseInt(data[29].ponderacion);
        let valor31=parseInt(data[30].ponderacion);
        let valor32=parseInt(data[31].ponderacion);
        let valor33=parseInt(data[32].ponderacion);
        let valor34=parseInt(data[33].ponderacion);
        let valor35=parseInt(data[34].ponderacion);
        let valor36=parseInt(data[35].ponderacion);
        let valor37=parseInt(data[36].ponderacion);
        let valor38=parseInt(data[37].ponderacion);
        let valor39=parseInt(data[38].ponderacion);
        let valor40=parseInt(data[39].ponderacion);
        let valor41=parseInt(data[40].ponderacion);
        let valor42=parseInt(data[41].ponderacion);
        let valor43=parseInt(data[42].ponderacion);
        let valor44=parseInt(data[43].ponderacion);
        let valor45=parseInt(data[44].ponderacion);
        let valor46=parseInt(data[45].ponderacion);
       
        let colorCategoriaUno,categoria1Nulo,categoria1Bajo,categoria1Medio,categoria1Alto,categoria1MuyAlto,
        colorCategoriaDos,categoria2Nulo,categoria2Bajo,categoria2Medio,categoria2Alto,categoria2MuyAlto,
        colorCategoriaTre,categoria3Nulo,categoria3Bajo,categoria3Medio,categoria3Alto,categoria3MuyAlto,
        colorCategoriaCuatro,categoria4Nulo,categoria4Bajo,categoria4Medio,categoria4Alto,categoria4MuyAlto;

        let colorDominioUno,Dominio1Nulo,Dominio1Bajo,Dominio1Medio,Dominio1Alto,Dominio1MuyAlto,
        colorDominioDos,Dominio2Nulo,Dominio2Bajo,Dominio2Medio,Dominio2Alto,Dominio2MuyAlto,
        colorDominioTres,Dominio3Nulo,Dominio3Bajo,Dominio3Medio,Dominio3Alto,Dominio3MuyAlto,
        colorDominioCuatro,Dominio4Nulo,Dominio4Bajo,Dominio4Medio,Dominio4Alto,Dominio4MuyAlto,
        colorDominioCinco,Dominio5Nulo,Dominio5Bajo,Dominio5Medio,Dominio5Alto,Dominio5MuyAlto,
        colorDominioSeis,Dominio6Nulo,Dominio6Bajo,Dominio6Medio,Dominio6Alto,Dominio6MuyAlto,
        colorDominioSiete,Dominio7Nulo,Dominio7Bajo,Dominio7Medio,Dominio7Alto,Dominio7MuyAlto,
        colorDominioOcho,Dominio8Nulo,Dominio8Bajo,Dominio8Medio,Dominio8Alto,Dominio8MuyAlto;
        
        let total = (valor1+valor2+valor3+valor4+valor5+valor6+valor7+valor8+valor9+valor10+valor11+valor12+valor13+valor14+valor15+valor16+valor17+valor18+valor19+valor20+valor21+valor22+valor23+valor24+valor25+valor26+valor27+valor28+valor29+valor30+valor31+valor32+valor33+valor34+valor35+valor36+valor37+valor38+valor39+valor40+valor41+valor42+valor43+valor44+valor45+valor46).toFixed(2);
        let celda;
        let celda2;
        let celda3;
        let celda4;
        let celda5;
        let criterios;
        let color;

        let botonDescargarReporteIndividualResultados = <Button type="danger"   onClick={(e) => { this.pdfExportComponent.save();}}>Descargar reporte</Button>
        let cerrarReporte =  <Button shape="circle" size="middle" danger onClick={e=>window.location.reload()}><MDBIcon icon="times" /></Button>
        let criteriosPrev;
        if(total<20){
          color =<p className="textabla2" style={{backgroundColor:"#9BE0F7"}}>Nulo</p>
          criterios = <TableCell className="textabla2" style={{backgroundColor: "#a7f5ea"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
          celda = <TableCell style={{backgroundColor: "#9BE0F7"}} align="right">{total}</TableCell>
        }else if(total>=20 && total < 45){
           color= <p className="textabla2" style={{backgroundColor:"#6BF56E"}}>Bajo</p>
            criterios = <TableCell className="textabla2" style={{backgroundColor: "#a7f5ea"}}>Es necesario una mayor difusión de la política de prevención de riesgos
            psicosociales y programas para: la prevención de los factores de riesgo
            psicosocial, la promoción de un entorno organizacional favorable y la
            prevención de la violencia laboral.</TableCell>           
            celda2 = <TableCell style={{backgroundColor: "#6BF56E"}} align="right">{total}</TableCell>
          }else if(total>=45 && total < 70){
            color=<p className="textabla2" style={{backgroundColor:"#FFFF00"}}>Medio</p>
            criterios = <TableCell className="textabla2" style={{backgroundColor: "#a7f5ea"}} >Se requiere revisar la política de prevención de riesgos psicosociales y
              programas para la prevención de los factores de riesgo psicosocial, la
              promoción de un entorno organizacional favorable y la prevención de la
              violencia laboral, así como reforzar su aplicación y difusión, mediante un
              Programa de intervención.</TableCell>
           
            celda3 = <TableCell style={{backgroundColor: "#FFFF00"}} align="right">{total}</TableCell>
          }else if(total>=70 && total < 90){
            color = <p className="textabla2" style={{backgroundColor:"#FFC000"}}>Alto</p>
            criterios = <TableCell className="textabla2" style={{backgroundColor: "#a7f5ea"}} >Se requiere realizar un análisis de cada categoría y dominio, de manera que
            se puedan determinar las acciones de intervención apropiadas a través de un
            Programa de intervención, que podrá incluir una evaluación específica y
            deberá incluir una campaña de sensibilización, revisar la política de
            prevención de riesgos psicosociales y programas para la prevención de los
            factores de riesgo psicosocial, la promoción de un entorno organizacional
            favorable y la prevención de la violencia laboral, así como reforzar su
            aplicación y difusión.</TableCell>
           
           celda4 = <TableCell style={{backgroundColor: "#FFC000"}} align="right">{total}</TableCell>
      }
      else if( total >= 90){
            color = <p className="textabla2" style={{backgroundColor:"#FF0000"}}>Muy Alto</p>
            criterios = <TableCell className="textabla2" style={{backgroundColor: "#a7f5ea"}} >Se requiere realizar el análisis de cada categoría y dominio para establecer
            las acciones de intervención apropiadas, mediante un Programa de
            intervención que deberá incluir evaluaciones específicas, y contemplar
            campañas de sensibilización, revisar la política de prevención de riesgos
            psicosociales y programas para la prevención de los factores de riesgo
            psicosocial, la promoción de un entorno organizacional favorable y la
            prevención de la violencia laboral, así como reforzar su aplicación y difusión.</TableCell>
           
            celda5  = <TableCell style={{backgroundColor: "#FF0000"}} align="right">{total}</TableCell>
      }
      let categoriaUno = (valor2+valor1+valor3).toFixed(2);
     if(categoriaUno < 3){
        categoria1Nulo= categoriaUno
        colorCategoriaUno  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
      }else if(categoriaUno >= 3 && categoriaUno < 5){
        colorCategoriaUno =<td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        categoria1Bajo= categoriaUno
      }else if(categoriaUno >= 5 && categoriaUno < 7){
        colorCategoriaUno=<td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        categoria1Medio= categoriaUno
      }else if(categoriaUno >= 7 && categoriaUno < 9){
        colorCategoriaUno = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        categoria1Alto= categoriaUno
      }else if(categoriaUno >= 9){
        colorCategoriaUno = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        categoria1MuyAlto= categoriaUno
      }

    let categoriaDos = (valor4+valor9+valor5+valor6+valor7+valor8+valor41+valor42+valor43+valor10+valor11+valor12+valor13+valor20+valor21+valor22+valor18+valor19+valor26+valor27).toFixed(2);
     if(categoriaDos < 10){
        colorCategoriaDos  =  <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        categoria2Nulo= categoriaDos
      }else if(categoriaDos >= 10 && categoriaDos < 20){
        colorCategoriaDos =<td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        categoria2Bajo= categoriaDos
      }else if(categoriaDos >=20 && categoriaDos < 30){
        colorCategoriaDos=<td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        categoria2Medio= categoriaDos
      }else if(categoriaDos >=30 && categoriaDos < 40){
        colorCategoriaDos = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        categoria2Alto= categoriaDos
      }else if(categoriaDos >= 40){
        colorCategoriaDos = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        categoria2MuyAlto= categoriaDos
      }


      let categoriaTre = (valor14+valor15+valor16+valor17).toFixed(2);
     if(categoriaTre < 4){
        colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        categoria3Nulo= categoriaTre
      }else if(categoriaTre >= 4 && categoriaTre < 6){
        colorCategoriaTre = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        categoria3Bajo= categoriaTre
      }else if(categoriaTre >= 6 && categoriaTre < 9 ){
        colorCategoriaTre = <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        categoria3Medio= categoriaTre
      }else if(categoriaTre >= 9 && categoriaTre < 12){
        colorCategoriaTre = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        categoria3Alto= categoriaTre
      }else if(categoriaTre >= 12){
        categoria3MuyAlto= categoriaTre
        colorCategoriaTre = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
      }

let categoriaCuatro = (valor23+valor24+valor25+valor28+valor29+valor30+valor31+valor32+valor33+valor34+valor35+valor36+valor37+valor38+valor39+valor40+valor44+valor45+valor46).toFixed(2);
     if(categoriaCuatro < 10){
        colorCategoriaCuatro  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        categoria4Nulo= categoriaCuatro
      }else if(categoriaCuatro >= 10 && categoriaCuatro < 18){
        colorCategoriaCuatro =  <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        categoria4Bajo= categoriaCuatro
      }else if(categoriaCuatro >=18 && categoriaCuatro < 28){
        colorCategoriaCuatro= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        categoria4Medio= categoriaCuatro
      }else if(categoriaCuatro >=28 && categoriaCuatro < 38){
        colorCategoriaCuatro = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        categoria4Alto= categoriaCuatro
      }else if(categoriaCuatro >= 38){
        colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        categoria4MuyAlto= categoriaCuatro
      }     


      let DominioUno = (valor2+valor1+valor3).toFixed(2); 
     if(DominioUno < 3){
        colorDominioUno  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        Dominio1Nulo= DominioUno
      }else if(DominioUno >= 3 && DominioUno < 5){
        colorDominioUno = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        Dominio1Bajo= DominioUno
      }else if(DominioUno >= 5 && DominioUno < 7){
        colorDominioUno= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        Dominio1Medio= DominioUno
      }else if(DominioUno >= 7 && DominioUno < 9){
        colorDominioUno = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        Dominio1Alto= DominioUno
      }else if(DominioUno >= 9){
        colorDominioUno= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        Dominio1MuyAlto= DominioUno
      }


      let DominioDos = (valor4+valor9+valor5+valor6+valor7+valor8+valor41+valor42+valor43+valor10+valor11+valor12+valor13).toFixed(2);

      if(DominioDos < 12){
        colorDominioDos  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        Dominio2Nulo= DominioDos
      }else if(DominioDos >= 12 && DominioDos < 16){
        colorDominioDos= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        Dominio2Bajo= DominioDos
      }else if(DominioDos >= 16 && DominioDos < 20){
        colorDominioDos= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        Dominio2Medio= DominioDos
      }else if(DominioDos >= 20 && DominioDos < 24){
        colorDominioDos = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        Dominio2Alto= DominioDos
      }else if(DominioDos >= 24){
        colorDominioDos= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        Dominio2MuyAlto= DominioDos
      }

      let DominioTres = (valor20+valor21+valor22+valor18+valor19+valor26+valor27).toFixed(2);

    if(DominioTres < 5){
        colorDominioTres  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        Dominio3Nulo= DominioTres
      }else if(DominioTres >= 5 && DominioTres < 8){
        colorDominioTres= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        Dominio3Bajo= DominioTres
      }else if(DominioTres >= 8 && DominioTres < 11){
        colorDominioTres= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        Dominio3Medio= DominioTres
      }else if(DominioTres >= 11 && DominioTres < 14){
        colorDominioTres = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        Dominio3Alto= DominioTres
      }else if(DominioTres >= 14){
        colorDominioTres= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        Dominio3MuyAlto= DominioTres
      }

      let DominioCuatro = (valor14+valor15).toFixed(2);
      
      if(DominioCuatro < 1){
        colorDominioCuatro  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        Dominio4Nulo= DominioCuatro
      }else if(DominioCuatro >= 1 && DominioCuatro < 2){
        colorDominioCuatro= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        Dominio4Bajo= DominioCuatro
      }else if(DominioCuatro >= 2 && DominioCuatro < 4){
        colorDominioCuatro= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        Dominio4Medio= DominioCuatro
      }else if(DominioCuatro >= 4 && DominioCuatro < 6){
        colorDominioCuatro = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        Dominio4Alto= DominioCuatro
      }else if(DominioCuatro >= 6){
        colorDominioCuatro= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        Dominio4MuyAlto= DominioCuatro
      }

      let DominioCinco = (valor16+valor17).toFixed(2);
     
      if(DominioCinco < 1){
        colorDominioCinco  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        Dominio5Nulo= DominioCinco
      }else if(DominioCinco >= 1 && DominioCinco < 2){
        colorDominioCinco= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        Dominio5Bajo= DominioCinco
      }else if(DominioCinco >= 2 && DominioCinco < 4){
        colorDominioCinco= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        Dominio5Medio= DominioCinco
      }else if(DominioCinco >= 4 && DominioCinco < 6){
        colorDominioCinco = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        Dominio5Alto= DominioCinco
      }else if(DominioCinco >= 6){
        colorDominioCinco= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        Dominio5MuyAlto= DominioCinco
      }

let DominioSeis = (valor23+valor24+valor25+valor28+valor29).toFixed(2);

     if(DominioSeis < 3){
        colorDominioSeis  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        Dominio6Nulo= DominioSeis
      }else if(DominioSeis >= 3 && DominioSeis < 5){
        colorDominioSeis= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        Dominio6Bajo= DominioSeis
      }else if(DominioSeis >= 5 && DominioSeis < 8){
        colorDominioSeis= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        Dominio6Medio= DominioSeis
      }else if(DominioSeis >= 8 && DominioSeis < 11){
        colorDominioSeis = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        Dominio6Alto= DominioSeis
      }else if(DominioSeis >= 11){
        colorDominioSeis= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        Dominio6MuyAlto= DominioSeis
      }
      
      let DominioSiete = (valor30+valor31+valor32+valor44+valor45+valor46).toFixed(2);     
     
      if(DominioSiete < 5){
        colorDominioSiete  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        Dominio7Nulo= DominioSiete
      }else if(DominioSiete >= 5 && DominioSiete < 8){
        colorDominioSiete = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        Dominio7Bajo= DominioSiete
      }else if(DominioSiete >= 8 && DominioSiete < 11){
        colorDominioSiete= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        Dominio7Medio= DominioSiete
      }else if(DominioSiete >= 11 && DominioSiete < 14){
        colorDominioSiete = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
      Dominio7Alto= DominioSiete
    }else if(DominioSiete >= 14){
      colorDominioSiete=  <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        Dominio7MuyAlto= DominioSiete
      }
     
      let DominioOcho = (valor33+valor34+valor35+valor36+valor37+valor38+valor39+valor40).toFixed(2);     
     
      if(DominioOcho < 7){
        colorDominioOcho  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        Dominio8Nulo= DominioOcho
      }else if(DominioOcho >= 7 && DominioOcho < 10){
        colorDominioOcho  = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        Dominio8Bajo= DominioOcho
      }else if(DominioOcho >= 10 && DominioOcho < 13){
        colorDominioOcho= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        Dominio8Medio= DominioOcho
      }else if(DominioOcho >= 13 && DominioOcho < 16){
        colorDominioOcho = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        Dominio8Alto= DominioOcho
      }else if(DominioOcho >= 16){
        colorDominioOcho=  <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"align="center">Muy Alto</td>
        Dominio8MuyAlto= DominioOcho
      }
      
     
      let titulo1 =<p className="textabla2"><font color="blue">I.- Resultados de la categoría </font> </p>
      let titulo2 =<p className="textabla2"><font color="blue">II.- Resultados del dominio</font> </p>
      let titulo3 =<p className="textabla2"><font color="blue">III.- Resultados por Dimensión</font> </p>
  
      return ( 
        <React.Fragment>
            <center>
            <Card style={{width:"70%",padding:"25px"}} title={<h6><strong>Resultados individuales de la aplicación de la evaluación RP</strong></h6>} extra = {<div>{botonDescargarReporteIndividualResultados}&nbsp;&nbsp;&nbsp;{cerrarReporte}</div>}>
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
            <table className="table table-borderless" style={{marginTop:"2%",alignItems:"left"}}>
                <tr>
                    <td>
                        <strong>{localStorage.getItem("razonsocial")}</strong>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <strong>{data[0].nombre} {data[0].ApellidoP} {data[0].ApellidoM}</strong>                    
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>{data[0].RFC}</strong>                    
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>{data[0].correo}</strong>                    
                    </td>
                </tr>    
            </table>
            <Table  component={Paper} responsive small borderless className="text-left">
              <TableHead>
              <TableRow>
                <TableCell  width="13%" style={{backgroundColor: "#E6E7E8"}}>Resultados Generales</TableCell>
                {celda}{celda2}{celda3}{celda4}{celda5}
                <TableCell width="6%"  > <strong>   TOTAL {total}  Puntos </strong></TableCell>
                <TableCell width="2%" ></TableCell>
                <TableCell width="1%"  ></TableCell>
                {criterios}
              </TableRow>
              </TableHead>
              </Table>
              <br/>
            <TableContainer  component={Paper} style={{marginBottom:30}}>
              <Table  borderless  size="small" aria-label="a dense table" >
                <TableRow>
                      <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}} width="50%"><strong>RESULTADOS GENERALES</strong></TableCell>              
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell component="th" scope="row" ></TableCell>
                      <TableCell component="th" scope="row" ></TableCell>
                      <TableCell component="th" scope="row" ></TableCell>
                      <TableCell component="th" scope="row" ></TableCell>  
                </TableRow>
                <TableHead>
                    <TableRow>
                    <TableCell width="50%" ></TableCell>
                    <TableCell align="right" style={{backgroundColor: "#9BE0F7"}}><center>NULO</center></TableCell>
                    <TableCell align="right" style={{backgroundColor: "#6BF56E"}}><center>BAJO</center></TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FFFF00"}}><center>MEDIO</center></TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FFC000"}}><center>ALTO</center></TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FF0000"}}><center>MUY ALTO</center></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody  style={{marginTop:20}}>
                    <TableRow>
                      <TableCell component="th" scope="row">
                          Puntuación total
                      </TableCell>
                      <TableCell component="th" scope="row"align="center">{celda}</TableCell>
                      <TableCell component="th" scope="row"align="center">{celda2}</TableCell>
                      <TableCell component="th" scope="row"align="center">{celda3}</TableCell>
                      <TableCell component="th" scope="row"align="center">{celda4}</TableCell>
                      <TableCell component="th" scope="row"align="center">{celda5}</TableCell>
                    
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
           <TableContainer component={Paper} style={{marginBottom:30}}>
            <Table  size="small" aria-label="a dense table" >
                <TableHead>
                    <TableRow>
                    <TableCell width="50%" ></TableCell>
                    <TableCell align="right" style={{backgroundColor: "#9BE0F7"}}>NULO</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#6BF56E"}}>BAJO&nbsp;</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FFFF00"}}>MEDIO&nbsp;</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FFC000"}}>ALTO&nbsp;</TableCell>
                    <TableCell align="right" style={{backgroundColor: "#FF0000"}}>MUY ALTO&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody  style={{marginTop:20}}>       
                <TableRow>
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS DE LA CATEGORÍA</strong></TableCell>              
                    <TableCell component="th" scope="row"align="center"></TableCell>
                    <TableCell component="th" scope="row" align="center"></TableCell>
                    <TableCell component="th" scope="row" align="center"></TableCell>
                    <TableCell component="th" scope="row" align="center"></TableCell>
                    <TableCell component="th" scope="row" align="center"></TableCell>  
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >I. Ambiente de Trabajo</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria1Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria1Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria1Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria1Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria1MuyAlto}</TableCell>           
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >II. Factores propios de la actividad</TableCell>   
                    <TableCell component="th" scope="row" align="center">{categoria2Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria2Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria2Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria2Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria2MuyAlto}</TableCell>    
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >III. Organización del tiempo de trabajo</TableCell>   
                    <TableCell component="th" scope="row" align="center">{categoria3Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria3Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria3Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria3Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria3MuyAlto}</TableCell>    
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >IV. Liderazgo y relaciones en el trabajo</TableCell>   
                    <TableCell component="th" scope="row" align="center">{categoria4Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria4Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria4Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria4Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria4MuyAlto}</TableCell>           
                </TableRow>               
                <TableRow>
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS DEL DOMINIO</strong></TableCell>              
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >I. Condiciones en el ambiente de trabajo</TableCell> 
                    <TableCell component="th" scope="row" align="center">{Dominio1Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio1Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio1Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio1Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio1MuyAlto}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >II. Carga de trabajo</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio2Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio2Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio2Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio2Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio2MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >III. Falta de control sobre el trabajo</TableCell>     
                    <TableCell component="th" scope="row" align="center">{Dominio3Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio3Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio3Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio3Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio3MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >IV. Jornada de trabajo</TableCell>  
                    <TableCell component="th" scope="row" align="center">{Dominio4Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio4Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio4Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio4Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio4MuyAlto}</TableCell>         
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >V. Interferencia en la relación trabajo-familia</TableCell>           
                    <TableCell component="th" scope="row" align="center">{Dominio5Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio5Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio5Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio5Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio5MuyAlto}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >VI. Liderazgo</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio6Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio6Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio6Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio6Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio6MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >VII. Relaciones en el trabajo</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio7Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio7Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio7Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio7Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio7MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >VIII. Violencia</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio8Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio8Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio8Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio8Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio8MuyAlto}</TableCell>        
                </TableRow>                
               
                <TableRow>
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS POR DIMENSIÓN</strong></TableCell>              
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}></TableCell>              
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >1.- Condiciones peligrosas e inseguras</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {valor2.toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" width="50%" >2.- Condiciones deficientes e insalubres</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {valor1.toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow> 
                <TableRow>
                    <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {valor3.toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" width="50%">4.- Cargas cuantitativas</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor4+valor9).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >5.- Ritmos de trabajo acelerado</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor5+valor6).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor7+valor8).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor41+valor42+valor43).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >8.- Cargas de alta responsabilidad</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor10+valor11).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >9.- Cargas contradictorias o inconsistentes</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor12+valor13).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" width="50%" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor20+valor21+valor22).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor18+valor19).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >12.-Limitada o inexistente capacitación</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor26+valor27).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >13.- Jornadas de trabajo extensas</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor14+valor15).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >14.- Influencia del trabajo fuera del centro laboral</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {valor16.toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >15.- Influencia de las responsabilidades familiares</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {valor17.toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >16.- Escasa claridad de funciones</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor23+valor24+valor25).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >17.- Características del liderazgo</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor28+valor29).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >18.- Relaciones sociales en el trabajo</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor30+valor31+valor32).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >19.- Deficiente relación con los colaboradores que supervisa</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor44+valor45+valor46).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row" >20.- Violencia laboral</TableCell> 
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                    <TableCell component="th" scope="row" align="center"> {(valor33+valor34+valor35+valor36+valor37+valor38+valor39+valor40).toFixed(2)}</TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                </TableRow>                
        </TableBody>
        </Table>        
        </TableContainer>
        </Card>
        </center>
        <div>
            <div style={{ position: "absolute", left: "-5000px", top: 0 }}>
                <PDFExport
                    paperSize="letter"
                    margin="1cm"
                    pageNum
                    pageTemplate={PageTemplate}
                    forcePageBreak=".page-break"
                    fileName={`${data[0].nombre} ${data[0].ApellidoP} ${data[0].ApellidoM} Reporte RP ${new Date().getFullYear()}`}
                    ref={(component) => this.pdfExportComponent = component}>
                      <div style={{ width: "550px" }}>
                        <center><img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/></center>  
                        <Card style = {{width:550}} className="text-left mt-2 ">   
                              <center><p className="textabla1">Reporte de resultados del diagnóstico individual de factores de Riesgo Psicosocial en los centros de trabajo</p></center><br/><br></br>
                              <p className="textabla2"> <strong>{localStorage.getItem("razonsocial")}</strong></p>
                              <p className="textabla2">Representante: {representante}</p>         
                              <p className="textabla2">{data[0].nombre} {data[0].ApellidoP} {data[0].ApellidoM}</p>
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
                            <center>
                            <p className="textabla2"><strong>GUÍA DE REFERENCIA III
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
                            </div>
                            </PDFExport>
                        </div>
                    </div>
        </React.Fragment>
         );
    }
}
 
export default reportEEORI;