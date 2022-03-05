import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import logo from '../../images/logo.png'
import diagnostico from '../../images/diagnostico.png'
import { PDFExport } from '@progress/kendo-react-pdf';
import PageTemplate from '../pageTemplate.jsx';
import {Card,Alert,Button} from 'antd'
import '../styles.css'
import {MDBRow,MDBCol,MDBBtn,MDBTable, MDBTableBody, MDBContainer,MDBCardTitle,MDBIcon, MDBCard, MDBCardHeader,MDBCardBody} from 'mdbreact';
class ReportEEOG extends Component {
    pdfExportComponent;
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
      const {peticion1,filtro1,filtro2,filtro3,filtro4,filtro5,filtro6,filtro7,filtro8,parametro,fechaCompleta,datosLength} = this.props
      let renderizadoGlobal;
      let total;
      let array1=[], array2=[], array3=[], array4=[], array5=[], array6=[], array7=[], array8=[], array9=[], array10=[]      
      let array11=[], array12=[], array13=[], array14=[], array15=[], array16=[], array17=[], array18=[], array19=[], array20=[]      
      let array21=[], array22=[], array23=[], array24=[], array25=[], array26=[], array27=[], array28=[], array29=[], array30=[]      
      let array31=[], array32=[], array33=[], array34=[], array35=[], array36=[], array37=[], array38=[], array39=[], array40=[]      
      let array41=[], array42=[], array43=[], array44=[], array45=[], array46=[], array47=[], array48=[], array49=[], array50=[]      
      let array51=[], array52=[], array53=[], array54=[], array55=[], array56=[], array57=[], array58=[], array59=[], array60=[]      
      let array61=[], array62=[], array63=[], array64=[], array65=[], array66=[], array67=[], array68=[], array69=[], array70=[]
      let array71=[],array72=[];
      let filtrar1,filtrar2,filtrar3,filtrar4,filtrar5,filtrar6,filtrar7,filtrar8,filtrar9,filtrar10,
      filtrar11,filtrar12,filtrar13,filtrar14,filtrar15,filtrar16,filtrar17,filtrar18,filtrar19,filtrar20,
      filtrar21,filtrar22,filtrar23,filtrar24,filtrar25,filtrar26,filtrar27,filtrar28,filtrar29,filtrar30,
      filtrar31,filtrar32,filtrar33,filtrar34,filtrar35,filtrar36,filtrar37,filtrar38,filtrar39,filtrar40,
      filtrar41,filtrar42,filtrar43,filtrar44,filtrar45,filtrar46,filtrar47,filtrar48,filtrar49,filtrar50,
      filtrar51,filtrar52,filtrar53,filtrar54,filtrar55,filtrar56,filtrar57,filtrar58,filtrar59,filtrar60,
      filtrar61,filtrar62,filtrar63,filtrar64,filtrar65,filtrar66,filtrar67,filtrar68,filtrar69,filtrar70,filtrar71,filtrar72;

      var arr1Int,arr2Int,arr3Int,arr4Int,arr5Int,arr6Int,arr7Int,arr8Int,arr9Int,arr10Int,
      arr11Int,arr12Int,arr13Int,arr14Int,arr15Int,arr16Int,arr17Int,arr18Int,arr19Int,arr20Int,
      arr21Int,arr22Int,arr23Int,arr24Int,arr25Int,arr26Int,arr27Int,arr28Int,arr29Int,arr30Int,
      arr31Int,arr32Int,arr33Int,arr34Int,arr35Int,arr36Int,arr37Int,arr38Int,arr39Int,arr40Int,
      arr41Int,arr42Int,arr43Int,arr44Int,arr45Int,arr46Int,arr47Int,arr48Int,arr49Int,arr50Int,
      arr51Int,arr52Int,arr53Int,arr54Int,arr55Int,arr56Int,arr57Int,arr58Int,arr59Int,arr60Int,
      arr61Int,arr62Int,arr63Int,arr64Int,arr65Int,arr66Int,arr67Int,arr68Int,arr69Int,arr70Int,
      arr71Int,arr72Int;
      let respuesta1,respuesta2,respuesta3,respuesta4,respuesta5,respuesta6,respuesta7,respuesta8,respuesta9,respuesta10,
      respuesta11,respuesta12,respuesta13,respuesta14,respuesta15,respuesta16,respuesta17,respuesta18,respuesta19,respuesta20,
      respuesta21,respuesta22,respuesta23,respuesta24,respuesta25,respuesta26,respuesta27,respuesta28,respuesta29,respuesta30,
      respuesta31,respuesta32,respuesta33,respuesta34,respuesta35,respuesta36,respuesta37,respuesta38,respuesta39,respuesta40,
      respuesta41,respuesta42,respuesta43,respuesta44,respuesta45,respuesta46,respuesta47,respuesta48,respuesta49,respuesta50,
      respuesta51,respuesta52,respuesta53,respuesta54,respuesta55,respuesta56,respuesta57,respuesta58,respuesta59,respuesta60,
      respuesta61,respuesta62,respuesta63,respuesta64,respuesta65,respuesta66,respuesta67,respuesta68,respuesta69,respuesta70,respuesta71,respuesta72;    

      let colorCategoriaUno,categoria1Nulo,categoria1Bajo,categoria1Medio,categoria1Alto,categoria1MuyAlto,
      colorCategoriaDos,categoria2Nulo,categoria2Bajo,categoria2Medio,categoria2Alto,categoria2MuyAlto,
      colorCategoriaTre,categoria3Nulo,categoria3Bajo,categoria3Medio,categoria3Alto,categoria3MuyAlto,
      colorCategoriaCuatro,categoria4Nulo,categoria4Bajo,categoria4Medio,categoria4Alto,categoria4MuyAlto,
      colorCategoriaCinco,categoria5Nulo,categoria5Bajo,categoria5Medio,categoria5Alto,categoria5MuyAlto;
      let colorDominioUno,Dominio1Nulo,Dominio1Bajo,Dominio1Medio,Dominio1Alto,Dominio1MuyAlto,
      colorDominioDos,Dominio2Nulo,Dominio2Bajo,Dominio2Medio,Dominio2Alto,Dominio2MuyAlto,
      colorDominioTres,Dominio3Nulo,Dominio3Bajo,Dominio3Medio,Dominio3Alto,Dominio3MuyAlto,
      colorDominioCuatro,Dominio4Nulo,Dominio4Bajo,Dominio4Medio,Dominio4Alto,Dominio4MuyAlto,
      colorDominioCinco,Dominio5Nulo,Dominio5Bajo,Dominio5Medio,Dominio5Alto,Dominio5MuyAlto,
      colorDominioSeis,Dominio6Nulo,Dominio6Bajo,Dominio6Medio,Dominio6Alto,Dominio6MuyAlto,
      colorDominioSiete,Dominio7Nulo,Dominio7Bajo,Dominio7Medio,Dominio7Alto,Dominio7MuyAlto,
      colorDominioOcho,Dominio8Nulo,Dominio8Bajo,Dominio8Medio,Dominio8Alto,Dominio8MuyAlto,
      colorDominioNueve,Dominio9Nulo,Dominio9Bajo,Dominio9Medio,Dominio9Alto,Dominio9MuyAlto,
      colorDominioDiez,Dominio10Nulo,Dominio10Bajo,Dominio10Medio,Dominio10Alto,Dominio10MuyAlto;
      let ponderacionEjecutivo;
      let ponderacionPromedio;
      let cat1Ejecutivo,cat2Ejecutivo,cat3Ejecutivo,cat4Ejecutivo,cat5Ejecutivo;
      let empleado;
      peticion1.map(rows=>{
        filtrar1 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "1";
        });
        array1.push(filtrar1)
        let valor1=[];
        let empleados = []
        array1.map(rows=>{
          if(rows[0]){
          empleados.push(rows[0].nombre +" " + rows[0].ApellidoP  + " " + rows[0].ApellidoM) 
          valor1.push(rows[0].ponderacion)
          } 
        })
        empleado = empleados
        arr1Int = valor1.map(x => Number.parseInt(x, 10)); 
        respuesta1=0;
        arr1Int.forEach (function(numero){
          respuesta1 += numero;
        });
        filtrar2 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "2";
        });
        array2.push(filtrar2)
        let valor2=[];
        array2.map(rows=>{
          if(rows[0]){
            valor2.push(rows[0].ponderacion)
          } 
        })
        arr2Int = valor2.map(x => Number.parseInt(x, 10)); 
        respuesta2=0;
        arr2Int.forEach (function(numero){
          respuesta2 += numero;
        });
        filtrar3 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "3";
        });
        array3.push(filtrar3)
        let valor3=[];
        array3.map(rows=>{
          if(rows[0]){
            valor3.push(rows[0].ponderacion)
          } 
        })
        arr3Int = valor3.map(x => Number.parseInt(x, 10)); 
        respuesta3=0;
        arr3Int.forEach (function(numero){
          respuesta3 += numero;
        });
        filtrar4 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "4";
        });
        array4.push(filtrar4)
        let valor4=[];
        array4.map(rows=>{
          if(rows[0]){
            valor4.push(rows[0].ponderacion)
          } 
        })
        arr4Int = valor4.map(x => Number.parseInt(x, 10)); 
        respuesta4=0;
        arr4Int.forEach (function(numero){
          respuesta4 += numero;
        });
        filtrar5 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "5";
        });
        array5.push(filtrar5)
        let valor5=[];
        array5.map(rows=>{
          if(rows[0]){
            valor5.push(rows[0].ponderacion)
          } 
        })
        arr5Int = valor5.map(x => Number.parseInt(x, 10)); 
        respuesta5=0;
        arr5Int.forEach (function(numero){
          respuesta5 += numero;
        });
        filtrar6 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "6";
        });
        array6.push(filtrar6)
        let valor6=[];
        array6.map(rows=>{
          if(rows[0]){
            valor6.push(rows[0].ponderacion)
          } 
        })
        arr6Int = valor6.map(x => Number.parseInt(x, 10)); 
        respuesta6=0;
        arr6Int.forEach (function(numero){
          respuesta6 += numero;
        });
        filtrar7 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "7";
        });
        array7.push(filtrar7)
        let valor7=[];
        array7.map(rows=>{
          if(rows[0]){
            valor7.push(rows[0].ponderacion)
          } 
        })
        arr7Int = valor7.map(x => Number.parseInt(x, 10)); 
        respuesta7=0;
        arr7Int.forEach (function(numero){
          respuesta7 += numero;
        });
        filtrar8 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "8";
        });
        array8.push(filtrar8)
        let valor8=[];
        array8.map(rows=>{
          if(rows[0]){
            valor8.push(rows[0].ponderacion)
          } 
        })
        arr8Int = valor8.map(x => Number.parseInt(x, 10)); 
        respuesta8=0;
        arr8Int.forEach (function(numero){
          respuesta8 += numero;
        });
        filtrar9 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "9";
        });
        array9.push(filtrar9)
        let valor9=[];
        array9.map(rows=>{
          if(rows[0]){
            valor9.push(rows[0].ponderacion)
          } 
        })
        arr9Int = valor9.map(x => Number.parseInt(x, 10)); 
        respuesta9=0;
        arr9Int.forEach (function(numero){
          respuesta9 += numero;
        });
        filtrar10 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "10";
        });
        array10.push(filtrar10)
        let valor10=[];
        array10.map(rows=>{
          if(rows[0]){
            valor10.push(rows[0].ponderacion)
          } 
        })
        arr10Int = valor10.map(x => Number.parseInt(x, 10)); 
        respuesta10=0;
        arr10Int.forEach (function(numero){
          respuesta10 += numero;
        });
        filtrar11 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "11";
        });
        array11.push(filtrar11)
        let valor11=[];
        array11.map(rows=>{
          if(rows[0]){
            valor11.push(rows[0].ponderacion)
          } 
        })
        arr11Int = valor11.map(x => Number.parseInt(x, 10)); 
        respuesta11=0;
        arr11Int.forEach (function(numero){
          respuesta11 += numero;
        });
        filtrar12 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "12";
        });
        array12.push(filtrar12)
        let valor12=[];
        array12.map(rows=>{
          if(rows[0]){
            valor12.push(rows[0].ponderacion)
          } 
        })
        arr12Int = valor12.map(x => Number.parseInt(x, 10)); 
        respuesta12=0;
        arr12Int.forEach (function(numero){
          respuesta12 += numero;
        });
        filtrar13 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "13";
        });
        array13.push(filtrar13)
        let valor13=[];
        array13.map(rows=>{
          if(rows[0]){
            valor13.push(rows[0].ponderacion)
          } 
        })
        arr13Int = valor13.map(x => Number.parseInt(x, 10)); 
        respuesta13=0;
        arr13Int.forEach (function(numero){
          respuesta13 += numero;
        });
        filtrar14 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "14";
        });
        array14.push(filtrar14)
        let valor14=[];
        array14.map(rows=>{
          if(rows[0]){
            valor14.push(rows[0].ponderacion)
          } 
        })
        arr14Int = valor14.map(x => Number.parseInt(x, 10)); 
        respuesta14=0;
        arr14Int.forEach (function(numero){
          respuesta14 += numero;
        });
        filtrar15 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "15";
        });
        array15.push(filtrar15)
        let valor15=[];
        array15.map(rows=>{
          if(rows[0]){
            valor15.push(rows[0].ponderacion)
          } 
        })
        arr15Int = valor15.map(x => Number.parseInt(x, 10)); 
        respuesta15=0;
        arr15Int.forEach (function(numero){
          respuesta15 += numero;
        });
        filtrar16 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "16";
        });
        array16.push(filtrar16)
        let valor16=[];
        array16.map(rows=>{
          if(rows[0]){
            valor16.push(rows[0].ponderacion)
          } 
        })
        arr16Int = valor16.map(x => Number.parseInt(x, 10)); 
        respuesta16=0;
        arr16Int.forEach (function(numero){
          respuesta16 += numero;
        });
        filtrar17 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "17";
        });
        array17.push(filtrar17)
        let valor17=[];
        array17.map(rows=>{
          if(rows[0]){
            valor17.push(rows[0].ponderacion)
          } 
        })
        arr17Int = valor17.map(x => Number.parseInt(x, 10)); 
        respuesta17=0;
        arr17Int.forEach (function(numero){
          respuesta17 += numero;
        });
        filtrar18 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "18";
        });
        array18.push(filtrar18)
        let valor18=[];
        array18.map(rows=>{
          if(rows[0]){
            valor18.push(rows[0].ponderacion)
          } 
        })
        arr18Int = valor18.map(x => Number.parseInt(x, 10)); 
        respuesta18=0;
        arr18Int.forEach (function(numero){
          respuesta18 += numero;
        });
        filtrar19 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "19";
        });
        array19.push(filtrar19)
        let valor19=[];
        array19.map(rows=>{
          if(rows[0]){
            valor19.push(rows[0].ponderacion)
          } 
        })
        arr19Int = valor19.map(x => Number.parseInt(x, 10)); 
        respuesta19=0;
        arr19Int.forEach (function(numero){
          respuesta19 += numero;
        });
        filtrar20 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "20";
        });
        array20.push(filtrar20)
        let valor20=[];
        array20.map(rows=>{
          if(rows[0]){
            valor20.push(rows[0].ponderacion)
          } 
        })
        arr20Int = valor20.map(x => Number.parseInt(x, 10)); 
        respuesta20=0;
        arr20Int.forEach (function(numero){
          respuesta20 += numero;
        });
        filtrar21 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "21";
        });
        array21.push(filtrar21)
        let valor21=[];
        array21.map(rows=>{
          if(rows[0]){
            valor21.push(rows[0].ponderacion)
          } 
        })
        arr21Int = valor21.map(x => Number.parseInt(x, 10)); 
        respuesta21=0;
        arr21Int.forEach (function(numero){
          respuesta21 += numero;
        });
        filtrar22 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "22";
        });
        array22.push(filtrar22)
        let valor22=[];
        array22.map(rows=>{
          if(rows[0]){
            valor22.push(rows[0].ponderacion)
          } 
        })
        arr22Int = valor22.map(x => Number.parseInt(x, 10)); 
        respuesta22=0;
        arr22Int.forEach (function(numero){
          respuesta22 += numero;
        });
        filtrar23 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "23";
        });
        array23.push(filtrar23)
        let valor23=[];
        array23.map(rows=>{
          if(rows[0]){
            valor23.push(rows[0].ponderacion)
          } 
        })
        arr23Int = valor23.map(x => Number.parseInt(x, 10)); 
        respuesta23=0;
        arr23Int.forEach (function(numero){
          respuesta23 += numero;
        });
        filtrar24 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "24";
        });
        array24.push(filtrar24)
        let valor24=[];
        array24.map(rows=>{
          if(rows[0]){
            valor24.push(rows[0].ponderacion)
          } 
        })
        arr24Int = valor24.map(x => Number.parseInt(x, 10)); 
        respuesta24=0;
        arr24Int.forEach (function(numero){
          respuesta24 += numero;
        });
        filtrar25 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "25";
        });
        array25.push(filtrar25)
        let valor25=[];
        array25.map(rows=>{
          if(rows[0]){
            valor25.push(rows[0].ponderacion)
          } 
        })
        arr25Int = valor25.map(x => Number.parseInt(x, 10)); 
        respuesta25=0;
        arr25Int.forEach (function(numero){
          respuesta25 += numero;
        });
        filtrar26 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "26";
        });
        array26.push(filtrar26)
        let valor26=[];
        array26.map(rows=>{
          if(rows[0]){
            valor26.push(rows[0].ponderacion)
          } 
        })
        arr26Int = valor26.map(x => Number.parseInt(x, 10)); 
        respuesta26=0;
        arr26Int.forEach (function(numero){
          respuesta26 += numero;
        });
        filtrar27 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "27";
        });
        array27.push(filtrar27)
        let valor27=[];
        array27.map(rows=>{
          if(rows[0]){
            valor27.push(rows[0].ponderacion)
          } 
        })
        arr27Int = valor27.map(x => Number.parseInt(x, 10)); 
        respuesta27=0;
        arr27Int.forEach (function(numero){
          respuesta27 += numero;
        });
        filtrar28 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "28";
        });
        array28.push(filtrar28)
        let valor28=[];
        array28.map(rows=>{
          if(rows[0]){
            valor28.push(rows[0].ponderacion)
          } 
        })
        arr28Int = valor28.map(x => Number.parseInt(x, 10)); 
        respuesta28=0;
        arr28Int.forEach (function(numero){
          respuesta28 += numero;
        });
        filtrar29 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "29";
        });
        array29.push(filtrar29)
        let valor29=[];
        array29.map(rows=>{
          if(rows[0]){
            valor29.push(rows[0].ponderacion)
          } 
        })
        arr29Int = valor29.map(x => Number.parseInt(x, 10)); 
        respuesta29=0;
        arr29Int.forEach (function(numero){
          respuesta29 += numero;
        });
        filtrar30 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "30";
        });
        array30.push(filtrar30)
        let valor30=[];
        array30.map(rows=>{
          if(rows[0]){
            valor30.push(rows[0].ponderacion)
          } 
        })
        arr30Int = valor30.map(x => Number.parseInt(x, 10)); 
        respuesta30=0;
        arr30Int.forEach (function(numero){
          respuesta30 += numero;
        });
        filtrar31 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "31";
        });
        array31.push(filtrar31)
        let valor31=[];
        array31.map(rows=>{
          if(rows[0]){
            valor31.push(rows[0].ponderacion)
          } 
        })
        arr31Int = valor31.map(x => Number.parseInt(x, 10)); 
        respuesta31=0;
        arr31Int.forEach (function(numero){
          respuesta31 += numero;
        });
        filtrar32 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "32";
        });
        array32.push(filtrar32)
        let valor32=[];
        array32.map(rows=>{
          if(rows[0]){
            valor32.push(rows[0].ponderacion)
          } 
        })
        arr32Int = valor32.map(x => Number.parseInt(x, 10)); 
        respuesta32=0;
        arr32Int.forEach (function(numero){
          respuesta32 += numero;
        });
        filtrar33 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "33";
        });
        array33.push(filtrar33)
        let valor33=[];
        array33.map(rows=>{
          if(rows[0]){
            valor33.push(rows[0].ponderacion)
          } 
        })
        arr33Int = valor33.map(x => Number.parseInt(x, 10)); 
        respuesta33=0;
        arr33Int.forEach (function(numero){
          respuesta33 += numero;
        });
        filtrar34 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "34";
        });
        array34.push(filtrar34)
        let valor34=[];
        array34.map(rows=>{
          if(rows[0]){
            valor34.push(rows[0].ponderacion)
          } 
        })
        arr34Int = valor34.map(x => Number.parseInt(x, 10)); 
        respuesta34=0;
        arr34Int.forEach (function(numero){
          respuesta34 += numero;
        });
        filtrar35 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "35";
        });
        array35.push(filtrar35)
        let valor35=[];
        array35.map(rows=>{
          if(rows[0]){
            valor35.push(rows[0].ponderacion)
          } 
        })
        arr35Int = valor35.map(x => Number.parseInt(x, 10)); 
        respuesta35=0;
        arr35Int.forEach (function(numero){
          respuesta35 += numero;
        });
        filtrar36 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "36";
        });
        array36.push(filtrar36)
        let valor36=[];
        array36.map(rows=>{
          if(rows[0]){
            valor36.push(rows[0].ponderacion)
          } 
        })
        arr36Int = valor36.map(x => Number.parseInt(x, 10)); 
        respuesta36=0;
        arr36Int.forEach (function(numero){
          respuesta36 += numero;
        });
        filtrar37 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "37";
        });
        array37.push(filtrar37)
        let valor37=[];
        array37.map(rows=>{
          if(rows[0]){
            valor37.push(rows[0].ponderacion)
          } 
        })
        arr37Int = valor37.map(x => Number.parseInt(x, 10)); 
        respuesta37=0;
        arr37Int.forEach (function(numero){
          respuesta37 += numero;
        });
        filtrar38 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "38";
        });
        array38.push(filtrar38)
        let valor38=[];
        array38.map(rows=>{
          if(rows[0]){
            valor38.push(rows[0].ponderacion)
          } 
        })
        arr38Int = valor38.map(x => Number.parseInt(x, 10)); 
        respuesta38=0;
        arr38Int.forEach (function(numero){
          respuesta38 += numero;
        });
        filtrar39 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "39";
        });
        array39.push(filtrar39)
        let valor39=[];
        array39.map(rows=>{
          if(rows[0]){
            valor39.push(rows[0].ponderacion)
          } 
        })
        arr39Int = valor39.map(x => Number.parseInt(x, 10)); 
        respuesta39=0;
        arr39Int.forEach (function(numero){
          respuesta39 += numero;
        });
        filtrar40 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "40";
        });
        array40.push(filtrar40)
        let valor40=[];
        array40.map(rows=>{
          if(rows[0]){
            valor40.push(rows[0].ponderacion)
          } 
        })
        arr40Int = valor40.map(x => Number.parseInt(x, 10)); 
        respuesta40=0;
        arr40Int.forEach (function(numero){
          respuesta40 += numero;
        });
        filtrar41 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "41";
        });
        array41.push(filtrar41)
        let valor41=[];
        array41.map(rows=>{
          if(rows[0]){
            valor41.push(rows[0].ponderacion)
          } 
        })
        arr41Int = valor41.map(x => Number.parseInt(x, 10)); 
        respuesta41=0;
        arr41Int.forEach (function(numero){
          respuesta41 += numero;
        });
        filtrar42 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "42";
        });
        array42.push(filtrar42)
        let valor42=[];
        array42.map(rows=>{
          if(rows[0]){
            valor42.push(rows[0].ponderacion)
          } 
        })
        arr42Int = valor42.map(x => Number.parseInt(x, 10)); 
        respuesta42=0;
        arr42Int.forEach (function(numero){
          respuesta42 += numero;
        });
        filtrar43 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "43";
        });
        array43.push(filtrar43)
        let valor43=[];
        array43.map(rows=>{
          if(rows[0]){
            valor43.push(rows[0].ponderacion)
          } 
        })
        arr43Int = valor43.map(x => Number.parseInt(x, 10)); 
        respuesta43=0;
        arr43Int.forEach (function(numero){
          respuesta43 += numero;
        });
        filtrar44 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "44";
        });
        array44.push(filtrar44)
        let valor44=[];
        array44.map(rows=>{
          if(rows[0]){
            valor44.push(rows[0].ponderacion)
          } 
        })
        arr44Int = valor44.map(x => Number.parseInt(x, 10)); 
        respuesta44=0;
        arr44Int.forEach (function(numero){
          respuesta44 += numero;
        });
        filtrar45 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "45";
        });
        array45.push(filtrar45)
        let valor45=[];
        array45.map(rows=>{
          if(rows[0]){
            valor45.push(rows[0].ponderacion)
          } 
        })
        arr45Int = valor45.map(x => Number.parseInt(x, 10)); 
        respuesta45=0;
        arr45Int.forEach (function(numero){
          respuesta45 += numero;
        });
        filtrar46 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "46";
        });
        array46.push(filtrar46)
        let valor46=[];
        array46.map(rows=>{
          if(rows[0]){
            valor46.push(rows[0].ponderacion)
          } 
        })
        arr46Int = valor46.map(x => Number.parseInt(x, 10)); 
        respuesta46=0;
        arr46Int.forEach (function(numero){
          respuesta46 += numero;
        });
        filtrar47 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "47";
        });
        array47.push(filtrar47)
        let valor47=[];
        array47.map(rows=>{
          if(rows[0]){
            valor47.push(rows[0].ponderacion)
          } 
        })
        arr47Int = valor47.map(x => Number.parseInt(x, 10)); 
        respuesta47=0;
        arr47Int.forEach (function(numero){
          respuesta47 += numero;
        });
        filtrar48 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "48";
        });
        array48.push(filtrar48)
        let valor48=[];
        array48.map(rows=>{
          if(rows[0]){
            valor48.push(rows[0].ponderacion)
          } 
        })
        arr48Int = valor48.map(x => Number.parseInt(x, 10)); 
        respuesta48=0;
        arr48Int.forEach (function(numero){
          respuesta48 += numero;
        });
        filtrar49 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "49";
        });
        array49.push(filtrar49)
        let valor49=[];
        array49.map(rows=>{
          if(rows[0]){
            valor49.push(rows[0].ponderacion)
          } 
        })
        arr49Int = valor49.map(x => Number.parseInt(x, 10)); 
        respuesta49=0;
        arr49Int.forEach (function(numero){
          respuesta49 += numero;
        });
        filtrar50 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "50";
        });
        array50.push(filtrar50)
        let valor50=[];
        array50.map(rows=>{
          if(rows[0]){
            valor50.push(rows[0].ponderacion)
          } 
        })
        arr50Int = valor50.map(x => Number.parseInt(x, 10)); 
        respuesta50=0;
        arr50Int.forEach (function(numero){
          respuesta50 += numero;
        });
        filtrar51 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "51";
        });
        array51.push(filtrar51)
        let valor51=[];
        array51.map(rows=>{
          if(rows[0]){
            valor51.push(rows[0].ponderacion)
          } 
        })
        arr51Int = valor51.map(x => Number.parseInt(x, 10)); 
        respuesta51=0;
        arr51Int.forEach (function(numero){
          respuesta51 += numero;
        });
        filtrar52 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "52";
        });
        array52.push(filtrar52)
        let valor52=[];
        array52.map(rows=>{
          if(rows[0]){
            valor52.push(rows[0].ponderacion)
          } 
        })
        arr52Int = valor52.map(x => Number.parseInt(x, 10)); 
        respuesta52=0;
        arr52Int.forEach (function(numero){
          respuesta52 += numero;
        });
        filtrar53 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "53";
        });
        array53.push(filtrar53)
        let valor53=[];
        array53.map(rows=>{
          if(rows[0]){
            valor53.push(rows[0].ponderacion)
          } 
        })
        arr53Int = valor53.map(x => Number.parseInt(x, 10)); 
        respuesta53=0;
        arr53Int.forEach (function(numero){
          respuesta53 += numero;
        });
        filtrar54 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "54";
        });
        array54.push(filtrar54)
        let valor54=[];
        array54.map(rows=>{
          if(rows[0]){
            valor54.push(rows[0].ponderacion)
          } 
        })
        arr54Int = valor54.map(x => Number.parseInt(x, 10)); 
        respuesta54=0;
        arr54Int.forEach (function(numero){
          respuesta54 += numero;
        });
        filtrar55 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "55";
        });
        array55.push(filtrar55)
        let valor55=[];
        array55.map(rows=>{
          if(rows[0]){
            valor55.push(rows[0].ponderacion)
          } 
        })
        arr55Int = valor55.map(x => Number.parseInt(x, 10)); 
        respuesta55=0;
        arr55Int.forEach (function(numero){
          respuesta55 += numero;
        });
        filtrar56 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "56";
        });
        array56.push(filtrar56)
        let valor56=[];
        array56.map(rows=>{
          if(rows[0]){
            valor56.push(rows[0].ponderacion)
          } 
        })
        arr56Int = valor56.map(x => Number.parseInt(x, 10)); 
        respuesta56=0;
        arr56Int.forEach (function(numero){
          respuesta56 += numero;
        });
        filtrar57 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "57";
        });
        array57.push(filtrar57)
        let valor57=[];
        array57.map(rows=>{
          if(rows[0]){
            valor57.push(rows[0].ponderacion)
          } 
        })
        arr57Int = valor57.map(x => Number.parseInt(x, 10)); 
        respuesta57=0;
        arr57Int.forEach (function(numero){
          respuesta57 += numero;
        });
        filtrar58 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "58";
        });
        array58.push(filtrar58)
        let valor58=[];
        array58.map(rows=>{
          if(rows[0]){
            valor58.push(rows[0].ponderacion)
          } 
        })
        arr58Int = valor58.map(x => Number.parseInt(x, 10)); 
        respuesta58=0;
        arr58Int.forEach (function(numero){
          respuesta58 += numero;
        });
        filtrar59 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "59";
        });
        array59.push(filtrar59)
        let valor59=[];
        array59.map(rows=>{
          if(rows[0]){
            valor59.push(rows[0].ponderacion)
          } 
        })
        arr59Int = valor59.map(x => Number.parseInt(x, 10)); 
        respuesta59=0;
        arr59Int.forEach (function(numero){
          respuesta59 += numero;
        });
        filtrar60 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "60";
        });
        array60.push(filtrar60)
        let valor60=[];
        array60.map(rows=>{
          if(rows[0]){
            valor60.push(rows[0].ponderacion)
          } 
        })
        arr60Int = valor60.map(x => Number.parseInt(x, 10)); 
        respuesta60=0;
        arr60Int.forEach (function(numero){
          respuesta60 += numero;
        });
        filtrar61 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "61";
        });
        array61.push(filtrar61)
        let valor61=[];
        array61.map(rows=>{
          if(rows[0]){
            valor61.push(rows[0].ponderacion)
          } 
        })
        arr61Int = valor61.map(x => Number.parseInt(x, 10)); 
        respuesta61=0;
        arr61Int.forEach (function(numero){
          respuesta61 += numero;
        });
        filtrar62 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "62";
        });
        array62.push(filtrar62)
        let valor62=[];
        array62.map(rows=>{
          if(rows[0]){
            valor62.push(rows[0].ponderacion)
          } 
        })
        arr62Int = valor62.map(x => Number.parseInt(x, 10)); 
        respuesta62=0;
        arr62Int.forEach (function(numero){
          respuesta62 += numero;
        });
        filtrar63 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "63";
        });
        array63.push(filtrar63)
        let valor63=[];
        array63.map(rows=>{
          if(rows[0]){
            valor63.push(rows[0].ponderacion)
          } 
        })
        arr63Int = valor63.map(x => Number.parseInt(x, 10)); 
        respuesta63=0;
        arr63Int.forEach (function(numero){
          respuesta63 += numero;
        });
        filtrar64 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "64";
        });
        array64.push(filtrar64)
        let valor64=[];
        array64.map(rows=>{
          if(rows[0]){
            valor64.push(rows[0].ponderacion)
          } 
        })
        arr64Int = valor64.map(x => Number.parseInt(x, 10)); 
        respuesta64=0;
        arr64Int.forEach (function(numero){
          respuesta64 += numero;
        });
        filtrar65 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "65";
        });
        array65.push(filtrar65)
        let valor65=[];
        array65.map(rows=>{
          if(rows[0]){
            valor65.push(rows[0].ponderacion)
          } 
        })
        arr65Int = valor65.map(x => Number.parseInt(x, 10)); 
        respuesta65=0;
        arr65Int.forEach (function(numero){
          respuesta65 += numero;
        });
        filtrar66 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "66";
        });
        array66.push(filtrar66)
        let valor66=[];
        array66.map(rows=>{
          if(rows[0]){
            valor66.push(rows[0].ponderacion)
          } 
        })
        arr66Int = valor66.map(x => Number.parseInt(x, 10)); 
        respuesta66=0;
        arr66Int.forEach (function(numero){
          respuesta66 += numero;
        });
        filtrar67 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "67";
        });
        array67.push(filtrar67)
        let valor67=[];
        array67.map(rows=>{
          if(rows[0]){
            valor67.push(rows[0].ponderacion)
          } 
        })
        arr67Int = valor67.map(x => Number.parseInt(x, 10)); 
        respuesta67=0;
        arr67Int.forEach (function(numero){
          respuesta67 += numero;
        });
        filtrar68 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "68";
        });
        array68.push(filtrar68)
        let valor68=[];
        array68.map(rows=>{
          if(rows[0]){
            valor68.push(rows[0].ponderacion)
          } 
        })
        arr68Int = valor68.map(x => Number.parseInt(x, 10)); 
        respuesta68=0;
        arr68Int.forEach (function(numero){
          respuesta68 += numero;
        });
        filtrar69 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "69";
        });
        array69.push(filtrar69)
        let valor69=[];
        array69.map(rows=>{
          if(rows[0]){
            valor69.push(rows[0].ponderacion)
          } 
        })
        arr69Int = valor69.map(x => Number.parseInt(x, 10)); 
        respuesta69=0;
        arr69Int.forEach (function(numero){
          respuesta69 += numero;
        });
        filtrar70 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "70";
        });
        array70.push(filtrar70)
        let valor70=[];
        array70.map(rows=>{
          if(rows[0]){
            valor70.push(rows[0].ponderacion)
          } 
        })
        arr70Int = valor70.map(x => Number.parseInt(x, 10)); 
        respuesta70=0;
        arr70Int.forEach (function(numero){
          respuesta70 += numero;
        });
        filtrar71 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "71";
        });
        array71.push(filtrar71)
        let valor71=[];
        array71.map(rows=>{
          if(rows[0]){
            valor71.push(rows[0].ponderacion)
          } 
        })
        arr71Int = valor71.map(x => Number.parseInt(x, 10)); 
        respuesta71=0;
        arr71Int.forEach (function(numero){
          respuesta71 += numero;
        });
        filtrar72 =  rows.filter(function(hero) {
          return hero.fk_preguntasEEO === "72";
        });
        array72.push(filtrar72)
        let valor72=[];
        array72.map(rows=>{
          if(rows[0]){
            valor72.push(rows[0].ponderacion)
          } 
        })
        arr72Int = valor72.map(x => Number.parseInt(x, 10)); 
        respuesta72=0;
        arr72Int.forEach (function(numero){
          respuesta72 += numero;
        });


        var arr1 = valor1.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr2 = valor2.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr3 = valor3.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr4 = valor4.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr5 = valor5.map(function (x) { 
          return parseInt(x, 10); 
        });
        var categoriaUnoEjecutivo = []; 
        for(let i = 0; i < arr1.length; i++){
          categoriaUnoEjecutivo[i] =arr1[i]+arr2[i]+arr3[i]+arr4[i]+arr5[i];
        }
        var arr6 = valor6.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr12 = valor12.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr7 = valor7.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr8 = valor8.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr9 = valor9.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr10 = valor10.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr11 = valor11.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr65 = valor65.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr66 = valor66.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr67 = valor67.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr68 = valor68.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr13 = valor13.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr14 = valor14.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr15 = valor15.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr16 = valor16.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr25 = valor25.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr26 = valor26.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr27 = valor27.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr28 = valor28.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr23 = valor23.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr24 = valor24.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr29 = valor29.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr30 = valor30.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr35 = valor35.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr36 = valor36.map(function (x) { 
          return parseInt(x, 10); 
        });
        var categoriaDosEjecutivo = [];
        for(let i = 0; i < arr6.length; i++){
          categoriaDosEjecutivo[i] = arr6[i]+arr12[i]+arr7[i]+arr8[i]+arr9[i]+arr10[i]+arr11[i]+arr65[i]+arr66[i]+arr67[i]+arr68[i]+arr13[i]+arr14[i]+arr15[i]+arr16[i]+arr25[i]+arr26[i]+arr27[i]+arr28[i]+arr23[i]+arr24[i]+arr29[i]+arr30[i]+arr35[i]+arr36[i];
        }
        
        var arr17 = valor17.map(function (x) { 
        return parseInt(x, 10); 
        });
        var arr18 = valor18.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr19 = valor19.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr20 = valor20.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr21 = valor21.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr22 = valor22.map(function (x) { 
          return parseInt(x, 10); 
        });
        var  categoriaTresEjecutivo = [];
        for(let i = 0; i < arr17.length; i++){
          categoriaTresEjecutivo[i] =arr17[i]+arr18[i]+arr19[i]+arr20[i]+arr21[i]+arr22[i];
        }
        var arr31 = valor31.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr32 = valor32.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr33 = valor33.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr34 = valor34.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr37 = valor37.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr38 = valor38.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr39 = valor39.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr40 = valor40.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr41 = valor41.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr42 = valor42.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr43 = valor43.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr44 = valor44.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr45 = valor45.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr46 = valor46.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr69 = valor69.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr70 = valor70.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr71 = valor71.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr72 = valor72.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr57 = valor57.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr58 = valor58.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr59 = valor59.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr60 = valor60.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr61 = valor61.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr62 = valor62.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr63 = valor63.map(function (x) { 
          return parseInt(x, 10); 
        });
        var arr64 = valor64.map(function (x) { 
          return parseInt(x, 10); 
        }); 
        var categoriaCuatroEjecutivo=[];
        for(let i = 0; i < arr31.length; i++){
          categoriaCuatroEjecutivo[i] =arr31[i]+arr32[i]+arr33[i]+arr34[i]+arr37[i]+arr38[i]+arr39[i]+arr40[i]+arr41[i]+arr42[i]+arr43[i]+arr44[i]+arr45[i]+arr46[i]+arr69[i]+arr70[i]+arr71[i]+arr72[i]+arr57[i]+arr58[i]+arr59[i]+arr60[i]+arr61[i]+arr62[i]+arr63[i]+arr64[i];
        }
        var arr47 = valor47.map(function (x) { 
          return parseInt(x, 10); 
        });  
        var arr48 = valor48.map(function (x) { 
          return parseInt(x, 10); 
        });  
        var arr49 = valor49.map(function (x) { 
          return parseInt(x, 10); 
        });  
        var arr50 = valor50.map(function (x) { 
          return parseInt(x, 10); 
        });  
        var arr51 = valor51.map(function (x) { 
          return parseInt(x, 10); 
        });  
        var arr52 = valor52.map(function (x) { 
          return parseInt(x, 10); 
        });  
        var arr55 = valor55.map(function (x) { 
          return parseInt(x, 10); 
        });  
        var arr56 = valor56.map(function (x) { 
          return parseInt(x, 10); 
        });  
        var arr53 = valor53.map(function (x) { 
          return parseInt(x, 10); 
        });  
        var arr54 = valor54.map(function (x) { 
          return parseInt(x, 10); 
        });  
        var categoriaCincoEjecutivo=[];
        for(let i = 0; i < arr47.length; i++){
          categoriaCincoEjecutivo[i] =arr47[i]+arr48[i]+arr49[i]+arr50[i]+arr51[i]+arr52[i]+arr55[i]+arr56[i]+arr53[i]+arr54[i];
        } 
        let totalPonderacion = [];

        for(let i = 0; i < categoriaUnoEjecutivo.length; i++){
           totalPonderacion[i] = categoriaUnoEjecutivo[i] + categoriaDosEjecutivo[i] + categoriaTresEjecutivo[i] + categoriaCuatroEjecutivo[i] + categoriaCincoEjecutivo[i];  
        }
        cat1Ejecutivo = categoriaUnoEjecutivo
        cat2Ejecutivo = categoriaDosEjecutivo
        cat3Ejecutivo = categoriaTresEjecutivo
        cat4Ejecutivo = categoriaCuatroEjecutivo
        cat5Ejecutivo = categoriaCincoEjecutivo
        ponderacionEjecutivo =  totalPonderacion 
        let suma = 0;
        totalPonderacion.forEach(function(numero){
            suma += numero;
        });
        let totalPonderacionEjecutivo = (suma/ponderacionEjecutivo.length).toFixed(2)
        ponderacionPromedio = totalPonderacionEjecutivo
        })

        
        let celdaEjecutivo,criteriosEjecutivo,celdaPrevEjecutivo,criteriosPrevEjecutivo; 

          total =(respuesta1+respuesta2+respuesta3+respuesta4+respuesta5+respuesta6+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta12+respuesta13+respuesta14+respuesta15+respuesta16+respuesta17+respuesta18+respuesta19+respuesta20
          +respuesta21+respuesta22+respuesta23+respuesta24+respuesta25+respuesta26+respuesta27+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40
          +respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52+respuesta53+respuesta54+respuesta55+respuesta56+respuesta57+respuesta58+respuesta59+respuesta60
          +respuesta61+respuesta62+respuesta63+respuesta64+respuesta65+respuesta66+respuesta67+respuesta68+respuesta69+respuesta70+respuesta71+respuesta72)    
        ////////////////////////////////// Global //////////////////////////////////        
        let length = peticion1.length;
        let general =total/length;
        let celda,criterios,celdaPrev,criteriosPrev;
        if(general<50){
        celda =<p className="textabla2" style={{backgroundColor:"#9BE0F7"}}>Nulo</p>
        celdaPrev = <TableCell width="10%"  style={{backgroundColor: "#9BE0F7"}} className="text-center">Nulo</TableCell>
        criterios = <TableCell style={{backgroundColor: "#a7f5ea"}}><font size="1" face="arial"color="black" align="justify">El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</font></TableCell>
        criteriosPrev = <TableCell style={{backgroundColor: "#a7f5ea"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
        }else if(general>=50 && general < 75){
          celda = <p className="textabla2" style={{backgroundColor:"#6BF56E"}}>Bajo</p>
          celdaPrev = <TableCell width="10%" style={{backgroundColor: "#6BF56E"}}  className="text-center">Bajo</TableCell>
          criterios = <TableCell style={{backgroundColor: "#a7f5ea"}}><font size="1" face="arial"color="black" align="justify">Es necesario una mayor difusión de la política de prevención de riesgos
          psicosociales y programas para: la prevención de los factores de riesgo
          psicosocial, la promoción de un entorno organizacional favorable y la
          prevención de la violencia laboral.</font></TableCell>
          criteriosPrev = <TableCell style={{backgroundColor: "#a7f5ea"}}>Es necesario una mayor difusión de la política de prevención de riesgos
          psicosociales y programas para: la prevención de los factores de riesgo
          psicosocial, la promoción de un entorno organizacional favorable y la
          prevención de la violencia laboral.</TableCell>
        }else if(general>=75 && general < 99){
          celda = <p className="textabla2" style={{backgroundColor:"#FFFF00"}}>Medio</p>
          celdaPrev = <TableCell width="10%"  style={{backgroundColor: "#FFFF00"}}  className="text-center">Medio</TableCell>
          criterios = <TableCell style={{backgroundColor: "#a7f5ea"}} ><font size="1" face="arial"color="black" align="justify">Se requiere revisar la política de prevención de riesgos psicosociales y
          programas para la prevención de los factores de riesgo psicosocial, la
          promoción de un entorno organizacional favorable y la prevención de la
          violencia laboral, así como reforzar su aplicación y difusión, mediante un
          Programa de intervención.</font></TableCell>
          criteriosPrev = <TableCell style={{backgroundColor: "#a7f5ea"}} >Se requiere revisar la política de prevención de riesgos psicosociales y
          programas para la prevención de los factores de riesgo psicosocial, la
          promoción de un entorno organizacional favorable y la prevención de la
          violencia laboral, así como reforzar su aplicación y difusión, mediante un
          Programa de intervención.</TableCell>
        }else if(general>=99 && general < 140){
        celda = <p className="textabla2" style={{backgroundColor:"#FFC000"}}>Alto</p>
        celdaPrev = <TableCell  width="10%" style={{backgroundColor: "#FFC000"}} className="text-center" >Alto</TableCell>
        criterios = <TableCell style={{backgroundColor: "#a7f5ea"}} ><font size="1" face="arial"color="black" align="justify">Se requiere realizar un análisis de cada categoría y dominio, de manera que
        se puedan determinar las acciones de intervención apropiadas a través de un
        Programa de intervención, que podrá incluir una evaluación específica y
        deberá incluir una campaña de sensibilización, revisar la política de
        prevención de riesgos psicosociales y programas para la prevención de los
        factores de riesgo psicosocial, la promoción de un entorno organizacional
        favorable y la prevención de la violencia laboral, así como reforzar su
        aplicación y difusión.</font></TableCell>
        criteriosPrev = <TableCell style={{backgroundColor: "#a7f5ea"}} >Se requiere realizar un análisis de cada categoría y dominio, de manera que
        se puedan determinar las acciones de intervención apropiadas a través de un
        Programa de intervención, que podrá incluir una evaluación específica y
        deberá incluir una campaña de sensibilización, revisar la política de
        prevención de riesgos psicosociales y programas para la prevención de los
        factores de riesgo psicosocial, la promoción de un entorno organizacional
        favorable y la prevención de la violencia laboral, así como reforzar su
        aplicación y difusión.</TableCell>
        }
        else if( general > 140){
        celda  =  <p className="textabla2" style={{backgroundColor:"#FF0000"}}>Muy Alto</p>
        celdaPrev  = <TableCell width="10%"  style={{backgroundColor: "#FF0000"}} className="text-center">Muy alto</TableCell>
        criterios= <TableCell style={{backgroundColor: "#a7f5ea"}} ><font size="1" face="arial"color="black" align="justify">Se requiere realizar el análisis de cada categoría y dominio para establecer
          las acciones de intervención apropiadas, mediante un Programa de
          intervención que deberá incluir evaluaciones específicas, y contemplar
          campañas de sensibilización, revisar la política de prevención de riesgos
          psicosociales y programas para la prevención de los factores de riesgo
          psicosocial, la promoción de un entorno organizacional favorable y la
          prevención de la violencia laboral, así como reforzar su aplicación y difusión.</font></TableCell>
          criteriosPrev = <TableCell style={{backgroundColor: "#a7f5ea "}} >Se requiere realizar el análisis de cada categoría y dominio para establecer
          las acciones de intervención apropiadas, mediante un Programa de
          intervención que deberá incluir evaluaciones específicas, y contemplar
          campañas de sensibilización, revisar la política de prevención de riesgos
          psicosociales y programas para la prevención de los factores de riesgo
          psicosocial, la promoción de un entorno organizacional favorable y la
          prevención de la violencia laboral, así como reforzar su aplicación y difusión.</TableCell>
        }

        let categoriaUno = ((respuesta1+respuesta3+respuesta2+respuesta4+respuesta5)/length).toFixed(2); 
        if(categoriaUno < 5){
            categoria1Nulo= categoriaUno
            colorCategoriaUno  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
        }else if(categoriaUno >= 5 && categoriaUno < 9){
            colorCategoriaUno =<td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            categoria1Bajo= categoriaUno
          }else if(categoriaUno >= 9 && categoriaUno < 11){
            colorCategoriaUno=<td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
            categoria1Medio= categoriaUno
          }else if(categoriaUno >= 11 && categoriaUno < 14){
            colorCategoriaUno = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
            categoria1Alto= categoriaUno
          }else if(categoriaUno >= 14){
            colorCategoriaUno = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            categoria1MuyAlto= categoriaUno
          }
        let categoriaDos = ((respuesta6+respuesta12+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta65+respuesta66+respuesta67+respuesta68+respuesta13+respuesta14+respuesta15+respuesta16+respuesta25+respuesta26+respuesta27+respuesta28+respuesta23+respuesta24+respuesta29+respuesta30+respuesta35+respuesta36)/length).toFixed(2);
        if(categoriaDos < 15){
            colorCategoriaDos  =  <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
            categoria2Nulo= categoriaDos
        }
        else if(categoriaDos >= 15 && categoriaDos < 30){
            colorCategoriaDos =<td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            categoria2Bajo= categoriaDos
        }else if(categoriaDos >=30 && categoriaDos < 45){
        colorCategoriaDos=<td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        categoria2Medio= categoriaDos
        }else if(categoriaDos >=45 && categoriaDos < 60){
        colorCategoriaDos = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        categoria2Alto= categoriaDos
        }else if(categoriaDos >= 60){
        colorCategoriaDos = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
        categoria2MuyAlto= categoriaDos
        }
        let categoriaTre = ((respuesta17+respuesta18+respuesta19+respuesta20+respuesta21+respuesta22)/length).toFixed(2);
        if(categoriaTre < 5){
            colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
            categoria3Nulo= categoriaTre
        }else if(categoriaTre >= 5 && categoriaTre < 7){
        colorCategoriaTre =<td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
        categoria3Bajo= categoriaTre
        }else if(categoriaTre >=7 && categoriaTre < 10){
        colorCategoriaTre =<td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
        categoria3Medio= categoriaTre
        }else if(categoriaTre >=10 && categoriaTre < 13){
        colorCategoriaTre = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        categoria3Alto= categoriaTre
        }else if(categoriaTre >= 13){
        categoria3MuyAlto= categoriaTre
        colorCategoriaTre = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
        }
          let categoriaCuatro = ((respuesta31+respuesta32+respuesta33+respuesta34+respuesta37+respuesta38+respuesta39+respuesta40+respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta69+respuesta70+respuesta71+respuesta72+respuesta57+respuesta58+respuesta59+respuesta60+respuesta61+respuesta62+respuesta63+respuesta64)/length).toFixed(2);
        if(categoriaCuatro < 14){
              colorCategoriaCuatro  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
              categoria4Nulo= categoriaCuatro
        }else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
            colorCategoriaCuatro =  <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            categoria4Bajo= categoriaCuatro
        }else if(categoriaCuatro >=29 && categoriaCuatro < 42){
            colorCategoriaCuatro= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
            categoria4Medio= categoriaCuatro
        }else if(categoriaCuatro >=42 && categoriaCuatro < 58){
            colorCategoriaCuatro = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
            categoria4Alto= categoriaCuatro
        }else if(categoriaCuatro >= 58){
            colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            categoria4MuyAlto= categoriaCuatro
        }
          let categoriaCinco = ((respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52+respuesta55+respuesta56+respuesta53+respuesta54)/length).toFixed(2);
        if(categoriaCinco < 10){
            colorCategoriaCinco  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
            categoria5Nulo= categoriaCinco
        }else if(categoriaCinco >= 10 && categoriaCinco < 14){
            colorCategoriaCinco= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            categoria5Bajo= categoriaCinco
        }else if(categoriaCinco >=14 && categoriaCinco < 18){
            colorCategoriaCinco= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
            categoria5Medio= categoriaCinco
        }else if(categoriaCinco >=18 && categoriaCinco < 23){
            colorCategoriaCinco = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
            categoria5Alto= categoriaCinco
        }else if(categoriaCinco >= 23){
            colorCategoriaCinco= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            categoria5MuyAlto= categoriaCinco
        }
      
        let DominioUno =( (respuesta1+respuesta3+respuesta2+respuesta4+respuesta5)/length).toFixed(2);
        if(DominioUno < 5){
            colorDominioUno  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
            Dominio1Nulo= DominioUno
        }else if(DominioUno >= 5 && DominioUno < 9){
            colorDominioUno = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            Dominio1Bajo= DominioUno
        }else if(DominioUno >= 9 && DominioUno < 11){
            colorDominioUno= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
            Dominio1Medio= DominioUno
        }else if(DominioUno >=11 && DominioUno < 14){
            colorDominioUno = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
            Dominio1Alto= DominioUno
        }else if(DominioUno >= 14){
            colorDominioUno= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            Dominio1MuyAlto= DominioUno
        }
        let DominioDos = ((respuesta6+respuesta12+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta65+respuesta66+respuesta67+respuesta68+respuesta13+respuesta14+respuesta15+respuesta16)/length).toFixed(2);
        if(DominioDos < 15){
            colorDominioDos  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
            Dominio2Nulo= DominioDos
        }else if(DominioDos >= 15 && DominioDos < 21){
            colorDominioDos= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            Dominio2Bajo= DominioDos
        }else if(DominioDos >= 21 && DominioDos < 27){
            colorDominioDos= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
            Dominio2Medio= DominioDos
        }else if(DominioDos >= 27 && DominioDos < 37){
            colorDominioDos = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
            Dominio2Alto= DominioDos
        }else if(DominioDos >= 37){
            colorDominioDos= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            Dominio2MuyAlto= DominioDos
        }
        let DominioTres = ((respuesta25+respuesta26+respuesta27+respuesta28+respuesta23+respuesta24+respuesta29+respuesta30+respuesta35+respuesta36)/length).toFixed(2);
        if(DominioTres < 11){
            colorDominioTres  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
            Dominio3Nulo= DominioTres
        }else if(DominioTres >= 11 && DominioTres < 16){
            colorDominioTres= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            Dominio3Bajo= DominioTres
        }else if(DominioTres >= 16 && DominioTres < 21){
            colorDominioTres= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
            Dominio3Medio= DominioTres
        }else if(DominioTres >= 21 && DominioTres < 25){
            colorDominioTres = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
            Dominio3Alto= DominioTres
        }else if(DominioTres >= 25){
            colorDominioTres= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            Dominio3MuyAlto= DominioTres
        }
        let DominioCuatro =( (respuesta17+respuesta18)/length).toFixed(2);
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
            colorDominioCuatro= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            Dominio4MuyAlto= DominioCuatro
        }
        let DominioCinco = ((respuesta19+respuesta20+respuesta21+respuesta22)/length).toFixed(2);
        if(DominioCinco < 4){
            colorDominioCinco  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
            Dominio5Nulo= DominioCinco
        }else if(DominioCinco >= 4 && DominioCinco < 6){
            colorDominioCinco= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            Dominio5Bajo= DominioCinco
        }else if(DominioCinco >= 6 && DominioCinco < 8){
            colorDominioCinco= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
            Dominio5Medio= DominioCinco
        }else if(DominioCinco >= 8 && DominioCinco < 10){
            colorDominioCinco = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
            Dominio5Alto= DominioCinco
        }else if(DominioCinco >= 10){
            colorDominioCinco= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            Dominio5MuyAlto= DominioCinco
        }
        let DominioSeis = ((respuesta31+respuesta32+respuesta33+respuesta34+respuesta37+respuesta38+respuesta39+respuesta40+respuesta41)/length).toFixed(2);
        if(DominioSeis < 9){
            colorDominioSeis  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
            Dominio6Nulo= DominioSeis
        }else if(DominioSeis >= 9 && DominioSeis < 12){
            colorDominioSeis= <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            Dominio6Bajo= DominioSeis
        }else if(DominioSeis >= 12 && DominioSeis < 16){
            colorDominioSeis= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
            Dominio6Medio= DominioSeis
        }else if(DominioSeis >= 16 && DominioSeis < 20){
            colorDominioSeis = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
            Dominio6Alto= DominioSeis
        }else if(DominioSeis >= 20){
            colorDominioSeis= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            Dominio6MuyAlto= DominioSeis
        }
        let DominioSiete = ((respuesta42+respuesta43+respuesta44+respuesta45+respuesta46+respuesta69+respuesta70+respuesta71+respuesta72)/length).toFixed(2);
        if(DominioSiete < 10){
            colorDominioSiete  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
            Dominio7Nulo= DominioSiete
        }else if(DominioSiete >= 10 && DominioSiete < 13){
            colorDominioSiete = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            Dominio7Bajo= DominioSiete
        }else if(DominioSiete >= 13 && DominioSiete < 17){
            colorDominioSiete= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
            Dominio7Medio= DominioSiete
        }else if(DominioSiete >= 17 && DominioSiete < 21){
            colorDominioSiete = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
        Dominio7Alto= DominioSiete
        }else if(DominioSiete >= 21){
            colorDominioSiete=  <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            Dominio7MuyAlto= DominioSiete
        }
        let DominioOcho = ((respuesta57+respuesta58+respuesta59+respuesta60+respuesta61+respuesta62+respuesta63+respuesta64)/length).toFixed(2);
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
            colorDominioOcho=  <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            Dominio8MuyAlto= DominioOcho
        }
        let DominioNueve = ((respuesta47+respuesta48+respuesta49+respuesta50+respuesta51+respuesta52)/length).toFixed(2);
        if(DominioNueve < 6){
            colorDominioNueve  =  <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
            Dominio9Nulo= DominioNueve
        }else if(DominioNueve >= 6 && DominioNueve < 10){
            colorDominioNueve  = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            Dominio9Bajo= DominioNueve
        }else if(DominioNueve >= 10 && DominioNueve < 14){
            colorDominioNueve= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
            Dominio9Medio= DominioNueve
        }else if(DominioNueve >= 14 && DominioNueve < 18){
            colorDominioNueve = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
            Dominio9Alto= DominioNueve
        }else if(DominioNueve >= 18){
            colorDominioNueve= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            Dominio9MuyAlto= DominioNueve
        }
        let DominioDiez = ((respuesta55+respuesta56+respuesta53+respuesta54)/length).toFixed(2);
        if(DominioDiez < 4){
            colorDominioDiez  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
            Dominio10Nulo= DominioDiez
        }else if(DominioDiez >= 4 && DominioDiez < 6){
            colorDominioDiez  = <td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
            Dominio10Bajo= DominioDiez
        }else if(DominioDiez >= 6 && DominioDiez < 8){
            colorDominioDiez= <td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
            Dominio10Medio= DominioDiez
        }else if(DominioDiez >= 8 && DominioDiez < 10){
            colorDominioDiez = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
            Dominio10Alto= DominioDiez
        }else if(DominioDiez >= 10){
            colorDominioDiez= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
            Dominio10MuyAlto= DominioDiez
        }
        let representante = localStorage.getItem("nombre") + " " + localStorage.getItem("apellidos")
        let periodoEvaluacion = localStorage.getItem("periodo") 
        let botonDescargarReporteIndividualResultados = <Button type="success"   onClick={(e) => { this.pdfExportComponent.save();}}>Descargar reporte</Button>
        let cerrarReporte =  <Button shape="circle" size="middle" danger onClick={e=>window.location.reload()}><MDBIcon icon="times" /></Button>
      ///////////////////////////////////////  Reporte Ejecutivo //////////////////////////////////
       
        let increment = 1;

        if(ponderacionPromedio<50){
          celdaEjecutivo = <p className="textabla2" style={{backgroundColor:"#9BE0F7"}}>Nulo</p>
          celdaPrevEjecutivo = <TableCell width="10%"  style={{backgroundColor: "#9BE0F7"}} className="text-center"><font size="3" face="arial"color="black" align="justify">NULO O DESPRECIABLE</font></TableCell>
          
          criteriosEjecutivo = <TableCell style={{backgroundColor: "#a7f5ea"}}><font size="1" face="arial"color="black" align="justify">El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</font></TableCell>
          criteriosPrevEjecutivo =<TableCell style={{backgroundColor: "#a7f5ea"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
          
          }else if(ponderacionPromedio>=50 && ponderacionPromedio < 75){
            celdaEjecutivo = <p className="textabla2" style={{backgroundColor:"#6BF56E"}}>Bajo</p>
            celdaPrevEjecutivo = <TableCell width="10%" style={{backgroundColor: "#6BF56E"}}  className="text-center">Bajo</TableCell>
            criteriosEjecutivo = <TableCell style={{backgroundColor: "#a7f5ea"}}><font size="1" face="arial"color="black" align="justify">Es necesario una mayor difusión de la política de prevención de riesgos
            psicosociales y programas para: la prevención de los factores de riesgo
            psicosocial, la promoción de un entorno organizacional favorable y la
            prevención de la violencia laboral.</font></TableCell>
            criteriosPrevEjecutivo = <TableCell style={{backgroundColor: "#a7f5ea"}}>Es necesario una mayor difusión de la política de prevención de riesgos
            psicosociales y programas para: la prevención de los factores de riesgo
            psicosocial, la promoción de un entorno organizacional favorable y la
            prevención de la violencia laboral.</TableCell>
          }else if(ponderacionPromedio>=75 && ponderacionPromedio < 99){
            celdaEjecutivo = <p className="textabla2" style={{backgroundColor:"#FFFF00"}}>Medio</p>
            celdaPrevEjecutivo = <TableCell width="10%"  style={{backgroundColor: "#FFFF00"}}  className="text-center">Medio</TableCell>
            criteriosEjecutivo = <TableCell style={{backgroundColor: "#a7f5ea"}} ><font size="1" face="arial"color="black" align="justify">Se requiere revisar la política de prevención de riesgos psicosociales y
            programas para la prevención de los factores de riesgo psicosocial, la
            promoción de un entorno organizacional favorable y la prevención de la
            violencia laboral, así como reforzar su aplicación y difusión, mediante un
            Programa de intervención.</font></TableCell>
            criteriosPrevEjecutivo = <TableCell style={{backgroundColor: "#a7f5ea"}} >Se requiere revisar la política de prevención de riesgos psicosociales y
            programas para la prevención de los factores de riesgo psicosocial, la
            promoción de un entorno organizacional favorable y la prevención de la
            violencia laboral, así como reforzar su aplicación y difusión, mediante un
            Programa de intervención.</TableCell>
          }else if(ponderacionPromedio>=99 && ponderacionPromedio < 140){
            celdaEjecutivo = <p className="textabla2" style={{backgroundColor:"#FFC000"}}>Alto</p>
            celdaPrevEjecutivo = <TableCell  width="10%" style={{backgroundColor: "#FFC000"}} className="text-center" >Alto</TableCell>
            criteriosEjecutivo = <TableCell style={{backgroundColor: "#a7f5ea"}} ><font size="1" face="arial"color="black" align="justify">Se requiere realizar un análisis de cada categoría y dominio, de manera que
            se puedan determinar las acciones de intervención apropiadas a través de un
            Programa de intervención, que podrá incluir una evaluación específica y
            deberá incluir una campaña de sensibilización, revisar la política de
            prevención de riesgos psicosociales y programas para la prevención de los
            factores de riesgo psicosocial, la promoción de un entorno organizacional
            favorable y la prevención de la violencia laboral, así como reforzar su
            aplicación y difusión.</font></TableCell>
            criteriosPrevEjecutivo = <TableCell style={{backgroundColor: "#a7f5ea"}} >Se requiere realizar un análisis de cada categoría y dominio, de manera que
            se puedan determinar las acciones de intervención apropiadas a través de un
            Programa de intervención, que podrá incluir una evaluación específica y
            deberá incluir una campaña de sensibilización, revisar la política de
            prevención de riesgos psicosociales y programas para la prevención de los
            factores de riesgo psicosocial, la promoción de un entorno organizacional
            favorable y la prevención de la violencia laboral, así como reforzar su
            aplicación y difusión.</TableCell>
          }
          else if( ponderacionPromedio > 140){
            celdaEjecutivo  =  <p className="textabla2" style={{backgroundColor:"#FF0000"}}>Muy Alto</p>
            celdaPrevEjecutivo  = <TableCell width="10%"  style={{backgroundColor: "#FF0000"}} className="text-center">Muy alto</TableCell>
            criteriosEjecutivo= <TableCell style={{backgroundColor: "#a7f5ea"}} ><font size="1" face="arial"color="black" align="justify">Se requiere realizar el análisis de cada categoría y dominio para establecer
              las acciones de intervención apropiadas, mediante un Programa de
              intervención que deberá incluir evaluaciones específicas, y contemplar
              campañas de sensibilización, revisar la política de prevención de riesgos
              psicosociales y programas para la prevención de los factores de riesgo
              psicosocial, la promoción de un entorno organizacional favorable y la
              prevención de la violencia laboral, así como reforzar su aplicación y difusión.</font></TableCell>
              criteriosPrevEjecutivo = <TableCell style={{backgroundColor: "#a7f5ea "}} >Se requiere realizar el análisis de cada categoría y dominio para establecer
              las acciones de intervención apropiadas, mediante un Programa de
              intervención que deberá incluir evaluaciones específicas, y contemplar
              campañas de sensibilización, revisar la política de prevención de riesgos
              psicosociales y programas para la prevención de los factores de riesgo
              psicosocial, la promoción de un entorno organizacional favorable y la
              prevención de la violencia laboral, así como reforzar su aplicación y difusión.</TableCell>
          }
            let frecuenciaCategoriaUno1 = 0;
            let frecuenciaCategoriaUno2 = 0;
            let frecuenciaCategoriaUno3 = 0;
            let frecuenciaCategoriaUno4 = 0;
            let frecuenciaCategoriaUno5 = 0;
            let frecuenciaCategoriaDos1 = 0;
            let frecuenciaCategoriaDos2 = 0;
            let frecuenciaCategoriaDos3 = 0;
            let frecuenciaCategoriaDos4 = 0;
            let frecuenciaCategoriaDos5 = 0;
            let frecuenciaCategoriaTres1 = 0;
            let frecuenciaCategoriaTres2 = 0;
            let frecuenciaCategoriaTres3 = 0;
            let frecuenciaCategoriaTres4 = 0;
            let frecuenciaCategoriaTres5 = 0;
            let frecuenciaCategoriaCuatro1= 0;
            let frecuenciaCategoriaCuatro2= 0;
            let frecuenciaCategoriaCuatro3= 0;
            let frecuenciaCategoriaCuatro4= 0;
            let frecuenciaCategoriaCuatro5= 0;
            let frecuenciaCategoriaCinco1= 0;
            let frecuenciaCategoriaCinco2= 0;
            let frecuenciaCategoriaCinco3= 0;
            let frecuenciaCategoriaCinco4= 0;
            let frecuenciaCategoriaCinco5= 0;
        
            let arrayFinal = [];
            for(let i = 0; i < empleado.length; i++){
               arrayFinal[i] = [empleado[i] , cat1Ejecutivo[i] , cat2Ejecutivo[i] , cat3Ejecutivo[i] , cat4Ejecutivo[i], cat5Ejecutivo[i],ponderacionEjecutivo[i]];  
            }
        /////////////////////////////////////////// renderizado ////////////////////////////////////////////////7    

        if(parametro === 1){
            renderizadoGlobal =  <Card style={{width:"70%",padding:"25px"}} title={<h6><strong>Resultados Globales en la aplicación de la evaluación EEO</strong></h6>} extra = {<div>{botonDescargarReporteIndividualResultados}&nbsp;&nbsp;&nbsp;{cerrarReporte}</div>}>
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
                <p  style={{marginTop:"2%"}}><strong>REPORTE GLOBAL DEL CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO<br/></strong></p>  
                <center> 
                <strong className="text-left  ml-2 mt-4">{localStorage.getItem("razonsocial")}</strong><br/>
                </center>
                <p className="text-left">FILTRADO POR: <strong>{filtro6}&nbsp;{filtro1}&nbsp;&nbsp;  {filtro2} &nbsp;&nbsp; {filtro3} &nbsp;&nbsp;{filtro4} &nbsp;&nbsp; {filtro5}&nbsp;&nbsp; {filtro7}&nbsp;&nbsp;{filtro8} </strong> </p>
                <br/>
                <Paper>
                <Table   responsive small borderless className="text-left">
                <TableHead>
                <TableRow>
                    <TableCell  width="13%" style={{backgroundColor: "#E6E7E8"}}>Resultados Generales</TableCell>
                    {celdaPrev}
                    <TableCell width="6%"  > <strong>   TOTAL {general.toFixed(2)}  Puntos </strong></TableCell>
                    <TableCell width="2%" ></TableCell>
                    <TableCell width="1%"  ></TableCell>
                {criteriosPrev}
                </TableRow>
                </TableHead>
                </Table>
                </Paper>
                <TableContainer component={Paper} style={{marginBottom:30,marginTop:20}}>
                <Table  size="small" aria-label="a dense table" >
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
                    <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS DE LA CATEGORIA</strong></TableCell>              
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>
                    <TableCell component="th" scope="row" ></TableCell>  
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
                    <TableCell component="th" scope="row" >V. Entorno organizacional</TableCell>   
                    <TableCell component="th" scope="row" align="center">{categoria5Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria5Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria5Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria5Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{categoria5MuyAlto}</TableCell>           
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
                    <TableCell component="th" scope="row" align="center" >{Dominio8MuyAlto}</TableCell>        
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >IX. Reconocimiento del desempeño</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio9Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio9Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio9Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio9Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio9MuyAlto}</TableCell>       
                    </TableRow>
                    <TableRow>
                    <TableCell component="th" scope="row" >XX. Insuficiente sentido de pertenencia e, inestabilidad</TableCell>    
                    <TableCell component="th" scope="row" align="center">{Dominio10Nulo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio10Bajo}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio10Medio}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio10Alto}</TableCell>
                    <TableCell component="th" scope="row" align="center">{Dominio10MuyAlto}</TableCell>        
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
                <TableCell component="th" scope="row" align="center">{((respuesta1/length)+(respuesta3/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" width="50%" >2.- Condiciones deficientes e insalubres</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta2/length)+(respuesta4/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow> 
                
                <TableRow>
                <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{(respuesta5/length).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" width="50%">4.- Cargas cuantitativas</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta6/length)+(respuesta12/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" width="50%">5.- Ritmos de trabajo acelerado</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta7/length)+(respuesta8/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta9/length)+(respuesta10/length)+(respuesta11/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta65/length)+(respuesta66/length)+(respuesta67/length)+(respuesta68/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >8.- Cargas de alta responsabilidad</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta13/length)+(respuesta14/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >9.- Cargas contradictorias o inconsistentes</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta15/length)+(respuesta16/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" width="50%" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta25/length)+(respuesta26/length)+(respuesta27/length)+(respuesta28/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta23/length)+(respuesta24/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>

                <TableRow>
                <TableCell component="th" scope="row" >12.- Insuficiente participación y manejo del cambio</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta29/length)+(respuesta30/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >13.- Limitada o inexistente capacitación</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta35/length)+(respuesta36/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >14.- Jornadas de trabajo extensas</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta17/length)+(respuesta18/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >15.- Influencia del trabajo fuera del centro laboral</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {((respuesta19/length)+(respuesta20/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >16.- Influencia de las responsabilidades familiares</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta21/length)+(respuesta22/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >17.- Escasa claridad de funciones</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta31/length)+(respuesta32/length)+(respuesta33/length)+(respuesta34/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >18.- Características del liderazgo</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)+(respuesta41/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >19.- Relaciones sociales en el trabajo</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta42/length)+(respuesta43/length)+(respuesta44/length)+(respuesta45/length)+(respuesta46/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >20.- Deficiente relación con los colaboradores que supervisa</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta69/length)+(respuesta70/length)+(respuesta71/length)+(respuesta72/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >21.- Violencia laboral</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta57/length)+(respuesta58/length)+(respuesta59/length)+(respuesta60/length)+(respuesta61/length)+(respuesta62/length)+(respuesta63/length)+(respuesta64/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >22.- Escasa o nula retroalimentación del desempeño</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta47/length)+(respuesta48/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>

                <TableRow>
                <TableCell component="th" scope="row" >23.- Escaso o nulo reconocimiento y compensación</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta49/length)+(respuesta50/length)+(respuesta51/length)+(respuesta52/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >24.- Limitado sentido de pertenencia</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center">{((respuesta55/length)+(respuesta56/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >25.- Inestabilidad laboral</TableCell> 
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                <TableCell component="th" scope="row" align="center"> {((respuesta53/length)+(respuesta54/length)).toFixed(2)}</TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                <TableCell component="th" scope="row" ></TableCell>
                </TableRow>
                
            </TableBody>
            </Table>
        </TableContainer>
        <div>
          <div className="example-config">
          </div>
          <div style={{ position: "absolute", left: "-1000px", top: 0 }}>
              <PDFExport
                  paperSize="letter"
                  margin="1cm"
                  pageTemplate={PageTemplate}
                  forcePageBreak=".page-break"
                  fileName={`Resultados globales EEO ${new Date().getFullYear()}`}
                  ref={(component) => this.pdfExportComponent = component}
              >
              <div style={{ width: "550px" }}>
                  <center><img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/></center>  
                  <Card style = {{width:550}} className="text-left mt-2 ">   
                      <center><p className="textabla1">Reporte global de factores de riesgo psicosocial y evaluación de entorno organizacional en los centros de trabajo</p></center><br/>
                      <p className="textabla2"> <strong>{localStorage.getItem("razonsocial")}</strong></p>
                      <p className="textabla2">Representante: {representante}</p>         
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
                          <p  className="textabla2">Resultado: <strong>{general.toFixed(2)}</strong></p>
                      </div>
                      <div>
                          <p className="textabla2">Nivel de riesgo <font color="black"><strong>{celda}</strong></font></p>
                      </div>
                  </div>
                  <Table style={{padding:"2px"}} responsive small bordless  className="text-left mb-2">
                      <tr >                              
                          <td><p className="textabla3"><font color="black" >Necesidad de la acción :</font></p></td>                                
                      </tr>
                      <tr>
                          <td>{criterios}</td>
                      </tr>
                  </Table>
                  <Alert style={{paddingTop:"2px",paddingBottom:"2px"}} type="info" message={<p className="textabla3"><strong>I.- Resultados de la categoría</strong></p>}></Alert>
                  <table  width="550"  className="table table-bordered table table-small mt-2" >                                           
                  <tr>
                      <td className="textabla3" width="10%" style= {{padding:"2px"}}><strong>Índice</strong></td>
                      <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left"><strong>Categoría</strong></td>
                      <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center"><strong>Calificación</strong></td>
                      <td className="textabla3"  style= {{padding:"2px"}}  align="center"><strong>Riesgo</strong></td>
                  </tr>
                  <tr style={{paddingTop:"2px",paddingBottom:"2px"}}>                              
                      <td className="textabla3" width="10%" style= {{padding:"2px"}}>1</td>
                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"  width="60%">Ambiente de Trabajo</td>
                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%">{categoriaUno}</td>
                      {colorCategoriaUno}                                       
                  </tr>
                  <tr style={{paddingTop:"2px",paddingBottom:"2px"}}>                              
                  <td className="textabla3" width="10%" style= {{padding:"2px"}}>2</td>
                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"  width="60%">Factores propios de la actividad</td>
                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%">{categoriaDos}</td>
                  {colorCategoriaDos}                                    
                  </tr>
                  <tr style={{paddingTop:"2px",paddingBottom:"2px"}}>                              
                  <td className="textabla3" width="10%" style= {{padding:"2px"}}>3</td>
                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"  width="60%">Organización del tiempo de trabajo</td>
                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%">{categoriaTre}</td>
                  {colorCategoriaTre}                              
                  </tr>
                  <tr style={{paddingTop:"2px",paddingBottom:"2px"}}>                              
                      <td className="textabla3" width="10%" style= {{padding:"2px"}}>4</td>
                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"  width="60%">Liderazgo y relaciones en el trabajo</td>
                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%">{categoriaCuatro}</td>
                      {colorCategoriaCuatro}                                       
                  </tr>
                  <tr style={{paddingTop:"2px",paddingBottom:"2px"}}>                              
                  <td className="success" width="10%" style= {{padding:"2px"}}>5</td>
                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"  width="60%">Entorno organizacional</td>
                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%">{categoriaCinco}</td>
                      {colorCategoriaCinco}                                   
                  </tr>
                  </table>
                  <Alert style={{paddingTop:"2px",paddingBottom:"2px"}} type="success" message={<p className="textabla3"><strong>II.- Resultados del dominio</strong></p>}></Alert>
                  <table  width="550"  className="table table-bordered table table-small mt-2">
                      <tr>
                          <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}><strong>Índice</strong></td>
                          <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}}align="left"><strong>Dominio</strong></td>
                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center"><strong>Calificación</strong></td>
                          <td className="textabla3"  style={{paddingTop:"2px",paddingBottom:"2px"}}  align="center"><strong>Riesgo</strong></td>
                      </tr>
                      <tr>
                          <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}>1</td>
                          <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Carga de Trabajo</td>
                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center">{DominioUno}</td>
                          {colorDominioUno}
                      </tr>
                      <tr>
                          <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}>2</td>
                          <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Condiciones en el ambiente de trabajo</td>
                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center">{DominioDos}</td>
                          {colorDominioDos} 
                      </tr>
                      <tr>
                          <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}>3</td>
                          <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Falta de control sobre el trabajo</td>
                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center">{DominioTres}</td>
                          {colorDominioTres}
                      </tr>
                      <tr>
                          <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}>4</td>
                          <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Interferencia en la relación trabajo-familia</td>
                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center">{DominioCuatro}</td>
                          {colorDominioCuatro}
                      </tr>
                      <tr>
                          <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}>5</td>
                          <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Jornada de trabajo</td>
                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center">{DominioCinco}</td>
                          {colorDominioCinco}
                      </tr>
                      <tr>
                          <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}>6</td>
                          <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Liderazgo</td>
                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center">{DominioSeis}</td>
                          {colorDominioSeis}
                      </tr>
                      <tr>
                          <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}>7</td>
                          <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Relaciones en el trabajo</td>
                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center">{DominioSiete}</td>
                          {colorDominioSiete}
                      </tr>
                      <tr>
                          <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}>8</td>
                          <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Violencia</td>
                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center">{DominioOcho}</td>
                          {colorDominioOcho}
                      </tr>
                      <tr>
                          <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}>9</td>
                          <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Reconocimiento del desempeño</td>
                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center">{DominioNueve}</td>
                          {colorDominioNueve}
                      </tr>
                      <tr>
                          <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}>10</td>
                          <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Insuficiente sentido de pertenencia e, inestabilidad</td>
                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center">{DominioDiez}</td>
                          {colorDominioDiez}
                      </tr>
                  </table>  
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <Alert style={{paddingTop:"2px",paddingBottom:"2px"}} type="error" message={<p className="textabla3"><strong>III.- Resultados por dimensión</strong></p>}></Alert>
                  <table width="550"   style={{paddingTop:"2px",paddingBottom:"2px"}} className="table table-bordered  table table-small mt-2"> 
                      <tr>
                          <td className="textabla3" width="10%" style= {{padding:"2px"}}><strong>Índice</strong></td>
                          <td className="textabla3" width="60%" style= {{padding:"2px"}} align="left"><strong>Dimensión</strong></td>
                          <td style= {{padding:"2px"}} width="20%" className="textabla3" align="center"><strong>Calificación</strong></td>
                      </tr>
                      <tr>           
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 1 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Condiciones peligrosas e inseguras </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta1/length)+(respuesta3/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 2 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Condiciones deficientes e insalubres </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta2/length)+(respuesta4/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 3 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Trabajos peligrosos </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {(respuesta5/length).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 4 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Cargas cuantitativas </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta6/length)+(respuesta12/length)).toFixed(2)} </td>
                          </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 5 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%" > Ritmos de trabajo acelerado </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta7/length)+(respuesta8/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 6 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Carga mental </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta9/length)+(respuesta10/length)+(respuesta11/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 7 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Cargas psicológicas emocionales </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta65/length)+(respuesta66/length)+(respuesta67/length)+(respuesta68/length)).toFixed(2)} </td>
                          </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 8 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Cargas de alta responsabilidad </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta13/length)+(respuesta14/length)).toFixed(2)} </td>
                      </tr>
                      <tr>           
                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 9 </td>
                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Cargas contradictorias o inconsistentes </td>
                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta15/length)+(respuesta16/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 10 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Falta de control y autonomía sobre el trabajo </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta25/length)+(respuesta26/length)+(respuesta27/length)+(respuesta28/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 11 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Limitada o nula posibilidad de desarrollo </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta23/length)+(respuesta24/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 12 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Insuficiente participación y manejo del cambio </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta29/length)+(respuesta30/length)).toFixed(2)} </td>
                          </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 13 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Limitada o inexistente capacitación </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta35/length)+(respuesta36/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 14 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Jornadas de trabajo extensas </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta17/length)+(respuesta18/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 15 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Influencia del trabajo fuera del centro laboral </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta19/length)+(respuesta20/length)).toFixed(2)} </td>
                          </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 16 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Influencia de las responsabilidades familiares </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta21/length)+(respuesta22/length)).toFixed(2)} </td>
                      </tr>

                      <tr>           
                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 17 </td>
                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Escasa claridad de funciones </td>
                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta31/length)+(respuesta32/length)+(respuesta33/length)+(respuesta34/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 18 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Características del liderazgo </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)+(respuesta41/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 19 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Relaciones sociales en el trabajo </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta42/length)+(respuesta43/length)+(respuesta44/length)+(respuesta45/length)+(respuesta46/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 20 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Deficiente relación con los colaboradores que Supervisa </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta69/length)+(respuesta70/length)+(respuesta71/length)+(respuesta72/length)).toFixed(2)} </td>
                          </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 21 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Violencia laboral </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta57/length)+(respuesta58/length)+(respuesta59/length)+(respuesta60/length)+(respuesta61/length)+(respuesta62/length)+(respuesta63/length)+(respuesta64/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 22 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Escasa o nula retroalimentación del desempeño </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta47/length)+(respuesta48/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 23 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Escaso o nulo reconocimiento y compensación </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta49/length)+(respuesta50/length)+(respuesta51/length)+(respuesta52/length)).toFixed(2)} </td>
                          </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 24 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Limitado sentido de pertenencia </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta55/length)+(respuesta56/length)).toFixed(2)} </td>
                      </tr>
                      <tr>         
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 25 </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Ritmos de trabajo acelerado </td>
                          <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%"> {((respuesta53/length)+(respuesta54/length)).toFixed(2)} </td>
                      </tr>
                      </table>          
                  </div>
              </PDFExport>
          </div>
       </div>
        </Card>
        }
        let renderizadoEjecutivo;
        if(parametro === 2) {
          renderizadoEjecutivo =
          <React.Fragment>
          <center>  
          <Card style={{width:"70%",padding:"25px"}} title={<h6><strong>Reporte Ejecutivo en la aplicación de la evaluación EEO</strong></h6>} extra = {<div>{botonDescargarReporteIndividualResultados}&nbsp;&nbsp;&nbsp;{cerrarReporte}</div>}>          
          <MDBCardBody> 
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
            <center> 
            <p  style={{marginTop:"2%"}}><strong>REPORTE EJECUTIVO DEL CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO<br/></strong></p>  
            <center> 
              <strong className="text-left  ml-2 mt-4">{localStorage.getItem("razonsocial")}</strong><br/>
            </center>
            </center>
            <p className="text-left">FILTRADO POR: <strong>{filtro6}&nbsp;{filtro1}&nbsp;&nbsp;  {filtro2} &nbsp;&nbsp; {filtro3} &nbsp;&nbsp;{filtro4} &nbsp;&nbsp; {filtro5}&nbsp;&nbsp; {filtro7}&nbsp;&nbsp;{filtro8} </strong> </p>
            <br/>
            <Paper>
                <Table   responsive small borderless className="text-left">
                <TableHead>
                <TableRow>
                    <TableCell  width="13%" style={{backgroundColor: "#E6E7E8"}}>Resultados Generales</TableCell>
                    {celdaPrevEjecutivo}
                    <TableCell width="6%"  > <strong>   TOTAL {ponderacionPromedio}  Puntos </strong></TableCell>
                    <TableCell width="2%" ></TableCell>
                    <TableCell width="1%"  ></TableCell>
                    {criteriosPrevEjecutivo}
                </TableRow>
                </TableHead>
                </Table>
            </Paper>  
            <br/>
          <TableContainer  component={Paper} style={{marginBottom:30,marginTop:20,width:"100%"}}>
          <Table>
           <TableRow>
              <TableCell width="5%" style={{backgroundColor: "#E6E7E8",paddingTop:"2px",paddingBottom:"2px"}}  className="textabla3"><strong></strong></TableCell> 
              <TableCell width="30%" style={{backgroundColor: "#E6E7E8",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"><strong>Nombre</strong></TableCell> 
              <TableCell width="11%" style={{backgroundColor: "#E6E7E8",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"><strong>Ambiente</strong></TableCell>              
              <TableCell width="11%" style={{backgroundColor: "#E6E7E8",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"><strong>Factores</strong></TableCell>              
              <TableCell width="11%" style={{backgroundColor: "#E6E7E8",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"><strong>Organización</strong></TableCell>              
              <TableCell width="11%" style={{backgroundColor: "#E6E7E8",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"><strong>Liderazgo</strong></TableCell>   
              <TableCell width="11%" style={{backgroundColor: "#E6E7E8",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"><strong> Entorno</strong></TableCell>
              <TableCell width="10%" style={{backgroundColor: "#E6E7E8",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"><strong>Total</strong></TableCell>              
          </TableRow>
          {arrayFinal.map(rows=>{
            let fila1;
            let fila2;
            let fila3;
            let fila4;
            let fila5;
            let fila6;     
            if(rows[1] < 5){
              fila1 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#9BE0F7"}}>
                <strong>  {rows[1]} </strong>
              </TableCell>
              frecuenciaCategoriaUno1++;
            }else if(rows[1] >= 5 && rows[1] < 9){                                                     
                fila1 = 
                <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#6BF56E"}}>
                  {rows[1]}
                </TableCell>
              frecuenciaCategoriaUno2++;
            }else if(rows[1] >= 9 && rows[1] < 11){
                fila1 = 
                <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFFF00"}}>
                    {rows[1]}
                </TableCell>
                frecuenciaCategoriaUno3++;
            }else if(rows[1] >= 11 && rows[1] < 14){
                fila1 = 
                <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFC000"}}>
                    {rows[1]}
                  </TableCell>
              frecuenciaCategoriaUno4++;   
            }else if(rows[1] >= 14){
                  fila1 = 
                  <TableCell  style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FF0000"}} >
                    {rows[1]}
                  </TableCell>
                frecuenciaCategoriaUno5++;
            }

            if(rows[2] < 15){
              fila2 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#9BE0F7"}}>
              {rows[2]}
              </TableCell>
              frecuenciaCategoriaDos1++;
            }else if(rows[2] >= 15 && rows[2] < 30){
              fila2 =
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#6BF56E"}}>
              {rows[2]}
              </TableCell>
              frecuenciaCategoriaDos2++;
            }else if(rows[2] >=30 && rows[2] < 45){
              fila2 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFFF00"}}>
              {rows[2]}
              </TableCell>
              frecuenciaCategoriaDos3++;
            }else if(rows[2] >=45 && rows[2] < 60){
              fila2 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFC000"}}>
              {rows[2]}
              </TableCell>
              frecuenciaCategoriaDos4++;
            }else if(rows[2] >= 60){
              fila2 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FF0000"}}>
              {rows[2]}
                </TableCell>
                frecuenciaCategoriaDos5++;
              }

            if(rows[3] < 5){
              fila3 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#9BE0F7"}}>
                  {rows[3]}
              </TableCell>
              frecuenciaCategoriaTres1++;
            }else if(rows[3] >= 5 && rows[3] < 7){
              fila3 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#6BF56E"}}>
                  {rows[3]}
              </TableCell>
              frecuenciaCategoriaTres2++;
            }else if(rows[3] >=7 && rows[3] < 10){
              fila3 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFFF00"}}>
                  {rows[3]}
              </TableCell>
              frecuenciaCategoriaTres3++;
            }else if(rows[3] >=10 && rows[3] < 13){
              fila3 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFC000"}}>
                  {rows[3]}
              </TableCell>
              frecuenciaCategoriaTres4++;
            }else if(rows[3] >= 13){
              fila3 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FF0000"}}>
                  {rows[3]}
              </TableCell>
              frecuenciaCategoriaTres5++;
            }

            if(rows[4]  < 14){
              fila4 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#9BE0F7"}}>
                  {rows[4]}
              </TableCell>
              frecuenciaCategoriaCuatro1++;
            }else if(rows[4] >= 14 && rows[4] < 29){
              fila4 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#6BF56E"}}>
                  {rows[4]}
              </TableCell>
              frecuenciaCategoriaCuatro2++;
            }else if(rows[4] >=29 && rows[4] < 42){
              fila4 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFFF00"}}>
                  {rows[4]}
              </TableCell>
              frecuenciaCategoriaCuatro3++;
            }else if(rows[4] >=42 && rows[4] < 58){
              fila4 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFC000"}}>
                  {rows[4]}
              </TableCell>
              frecuenciaCategoriaCuatro4++;
            }else if(rows[4] >= 58){
              fila4 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FF0000"}}>
                  {rows[4]}
              </TableCell>   
              frecuenciaCategoriaCuatro5++;
            }
            if(rows[5]  < 10){
              fila5 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#9BE0F7"}}>
                  {rows[5]}
              </TableCell>
              frecuenciaCategoriaCinco1++;
            }else if(rows[5] >= 10 && rows[5] < 14){
              fila5 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#6BF56E"}}>
                  {rows[5]}
              </TableCell>
              frecuenciaCategoriaCinco2++;
            }else if(rows[5] >=14 && rows[5] < 18){
              fila5 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFFF00"}}>
                  {rows[5]}
              </TableCell>
              frecuenciaCategoriaCinco3++;
            }else if(rows[5] >=18 && rows[5] < 23){
              fila5 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFC000"}}>
                  {rows[5]}
              </TableCell>
              frecuenciaCategoriaCinco4++;
            }else if(rows[5] >= 23){
              fila5 = 
              <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FF0000"}}>
                  {rows[5]}
              </TableCell>   
              frecuenciaCategoriaCinco5++;
            }

              if(rows[6]<50){
                fila6 = 
                <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor:"#9BE0F7"}}>
                    {rows[6]}
                </TableCell>    
              }
              else if(rows[6]>=50 && rows[6] <75){
                fila6 = 
                <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#6BF56E"}}>
                    {rows[6]}
                </TableCell> 
              }else if(rows[6]>=75 && rows[6] < 99){
                fila6 = 
                <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFFF00"}}>
                    {rows[6]}
                </TableCell> 
              }else if(rows[6]>=99 && rows[6] < 140){
                fila6 = <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFC000"}}>
                    {rows[6]}
                </TableCell> 
              }
              else if( rows[6] >= 140){
                fila6 = 
                <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FF0000"}}>
                    {rows[6]}
                </TableCell> 
            } 
            return(
              <TableBody>
                <TableRow>
                    <TableCell style={{paddingTop:"2px", paddingBottom:"2px"}} className="textabla3">{increment++}</TableCell>
                    <TableCell style={{paddingTop:"2px", paddingBottom:"2px"}}  className = "textabla3">{rows[0]}</TableCell>
                      {fila1}
                      {fila2}
                      {fila3}
                      {fila4}
                      {fila5}
                      {fila6}
                </TableRow>
                </TableBody>
              )
              })}  
        </Table>
            <br/>
            <p className="textabl1"><strong>FRECUENCIA</strong></p>
            <table className="table table-bordered">
                <tr>
                  <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1" width="10%"></td>
                  <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1" width="40%">Ponderaciones</td>
                  <td style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}} className="textabla1" width="10%" >Nulo</td>
                  <td style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}} className="textabla1" width="10%">Bajo</td>
                  <td style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}} className="textabla1" width="10%">Medio</td>
                  <td style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}} className="textabla1" width="10%">Alto</td>
                  <td style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}} className="textabla1" width="10%">Muy Alto</td>
                </tr>
              
              <tbody>
                <tr>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">1</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">Ambiente de Trabajo</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaUno1}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaUno2}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaUno3}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaUno4}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaUno5}</td>
                </tr>
                <tr>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">2</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">Factores Propios</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaDos1}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaDos2}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaDos3}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaDos4}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaDos5}</td>
                </tr>
                <tr>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">3</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">Organizacion</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaTres1}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaTres2}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaTres3}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaTres4}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaTres5}</td>
                </tr>
                <tr>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">4</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">Liderazgo</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaCuatro1}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaCuatro2}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaCuatro3}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaCuatro4}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaCuatro5}</td>
                </tr>
                <tr>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">5</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">Entorno Organizacional</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaCinco1}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaCinco2}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaCinco3}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaCinco4}</td>
                <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla1">{frecuenciaCategoriaCinco5}</td>
                </tr>
              </tbody>
            </table>
          </TableContainer> 
          </MDBCardBody> 
          </Card>             
                 <div>
                      <div className="example-config">
                        
                      </div>      
                      <div style={{ position: "absolute", left: "-2000px", top: 0 }}>
                          <PDFExport
                              paperSize="letter"
                              margin="1cm"
                              pageNum
                              pageTemplate={PageTemplate}
                              forcePageBreak=".page-break"
                              fileName={`Reporte ejecutivo ${new Date().getFullYear()}`}
                              ref={(component) => this.pdfExportComponent = component}
                          >
                              <div style={{ width: "550px" }}>                                          
                                  <center><img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/></center>  
                                  <Card style = {{width:550}} className="text-left mt-2 ">   
                                      <center><p className="textabla1">Reporte Ejecutivo Global | identificación y análisis de los factores de riesgo psicosocial y evaluacion del entorno organizacional</p></center><br/>
                                      <p className="textabla2"> <strong>{localStorage.getItem("razonsocial")}</strong></p>
                                      <p className="textabla2">Representante: {representante}</p>         
                                      <p className="textabla2"><strong>Filtrado por : {filtro6}&nbsp;{filtro1}&nbsp;&nbsp;{filtro2}&nbsp;&nbsp; {filtro3}&nbsp;&nbsp;{filtro4}&nbsp;&nbsp; {filtro5}&nbsp;&nbsp;{filtro7}&nbsp;&nbsp;{filtro8}</strong></p>
                                      <p className="textabla2"><strong>{periodoEvaluacion}</strong></p>
                                      <p className="textabla2"><strong>Total de Evaluaciones consideradas : {empleado.length}</strong></p>
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
                                            <p  className="textabla2">Puntaje Promedio: <strong>{ponderacionPromedio}</strong></p>
                                        </div>
                                        <div>
                                            <p className="textabla2">Nivel de riesgo <font color="black"><strong>{celdaEjecutivo}</strong></font></p>
                                        </div>
                                    </div>    
                                    <Table style={{padding:"2px"}} responsive small bordless  className="text-left mb-2">
                                        <tr >                              
                                            <td><p className="textabla3"><font color="black" >Necesidad de la acción :</font></p></td>                                
                                        </tr>
                                        <tr>
                                            <td>{criteriosEjecutivo}</td>
                                        </tr>
                                    </Table>
                                       <br/>
                                      <table width="500" className="table table-bordered table table-small table table-striped" >
                                      <tr >
                                          <th style={{paddingTop:"2px",paddingBottom:"2px"}} width="4%" scope="col" className="textabla3"><strong>#</strong></th>
                                          <th style={{paddingTop:"2px",paddingBottom:"2px"}} width="32%"scope="col" className="textabla3"><strong >Nombre</strong></th>
                                          <th style={{paddingTop:"2px",paddingBottom:"2px"}} width="12%"scope="col" className="textabla3"><strong>Ambiente de T.</strong></th>
                                          <th style={{paddingTop:"2px",paddingBottom:"2px"}} width="11%" scope="col" className="textabla3"><strong >Factores P.</strong></th>
                                          <th style={{paddingTop:"2px",paddingBottom:"2px"}} width="13%"scope="col" className="textabla3"><strong >Organización</strong></th>
                                          <th style={{paddingTop:"2px",paddingBottom:"2px"}} width="12%" scope="col" className="textabla3"><strong>Liderazgo</strong></th>
                                          <th style={{paddingTop:"2px",paddingBottom:"2px"}} width="10%" scope="col" className="textabla3"><strong>Entorno O.</strong></th>
                                          <th style={{paddingTop:"2px",paddingBottom:"2px"}} width="8%" scope="col" className="textabla3"><strong>Total</strong></th>
                                        </tr>
                                      {arrayFinal.map(rows=>{
                                        let fila1;
                                        let fila2;
                                        let fila3;
                                        let fila4;
                                        let fila5;
                                        let fila6;      
                                        if(rows[1] < 5){
                                          fila1 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}}>
                                             {rows[1]}
                                           </td>
                                       }else if(rows[1] >= 5 && rows[1] < 9){                                                     
                                           fila1 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}}>
                                             {rows[1]}
                                           </td>
                                       }else if(rows[1] >= 9 && rows[1] < 11){
                                            fila1 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}}>
                                               {rows[1]}
                                             </td>
                                       }else if(rows[1] >= 11 && rows[1] < 14){
                                            fila1 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}}>
                                               {rows[1]}
                                             </td>
                                       }else if(rows[1] >= 14){
                                             fila1 = <td className="textabla3"  style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}} >
                                               {rows[1]}
                                             </td>
                                       }
      
                                        if(rows[2] < 15){
                                          fila2 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}}>
                                          {rows[2]}
                                          </td>
                                        }else if(rows[2] >= 15 && rows[2] < 30){
                                          fila2 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}}>
                                          {rows[2]}
                                          </td>
                                        }else if(rows[2] >=30 && rows[2] < 45){
                                          fila2 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}}>
                                          {rows[2]}
                                          </td>
                                        }else if(rows[2] >=45 && rows[2] < 60){
                                          fila2 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}}>
                                          {rows[2]}
                                          </td>
                                        }else if(rows[2] >= 60){
                                          fila2 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}}>
                                          {rows[2]}
                                          </td>
                                        }
                                      if(rows[3] < 5){
                                        fila3 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}}>
                                            {rows[3]}
                                        </td>
                                      }else if(rows[3] >= 5 && rows[3] < 7){
                                        fila3 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}}>
                                            {rows[3]}
                                        </td>
                                      }else if(rows[3] >=7 && rows[3] < 10){
                                        fila3 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}}>
                                            {rows[3]}
                                        </td>
                                      }else if(rows[3] >=10 && rows[3] < 13){
                                        fila3 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}}>
                                            {rows[3]}
                                        </td>
                                      }else if(rows[3] >= 13){
                                        fila3 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}}>
                                            {rows[3]}
                                        </td>
                                      }
      
                                      if(rows[4]  < 14){
                                        fila4 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}}>
                                            {rows[4]}
                                        </td>
                                      }else if(rows[4] >= 14 && rows[4] < 29){
                                        fila4 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}}>
                                            {rows[4]}
                                        </td>
                                      }else if(rows[4] >=29 && rows[4] < 42){
                                        fila4 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}}>
                                            {rows[4]}
                                        </td>
                                      }else if(rows[4] >=42 && rows[4] < 58){
                                        fila4 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}}>
                                            {rows[4]}
                                        </td>
                                      }else if(rows[4] >= 58){
                                        fila4 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}}>
                                            {rows[4]}
                                        </td>   
                                      }
                                      if(rows[5]  < 10){
                                        fila5 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}}>
                                            {rows[5]}
                                        </td>
                                      }else if(rows[5] >= 10 && rows[5] < 14){
                                        fila5 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}}>
                                            {rows[5]}
                                        </td>
                                      }else if(rows[5] >=14 && rows[5] < 18){
                                        fila5 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}}>
                                            {rows[5]}
                                        </td>
                                      }else if(rows[5] >=18 && rows[5] < 23){
                                        fila5 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}}>
                                            {rows[5]}
                                        </td>
                                      }else if(rows[5] >= 23){
                                        fila5 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}}>
                                            {rows[5]}
                                        </td>   
                                      }
                                      if(rows[6]<50){
                                        fila6 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}}>
                                            {rows[6]}
                                        </td>    
                                      }
                                      else if(rows[6]>=50 && rows[6] <75){
                                        fila6 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}}>
                                            {rows[6]}
                                        </td> 
                                      }else if(rows[6]>=75 && rows[6] < 99){
                                        fila6 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}}>
                                            {rows[6]}
                                        </td> 
                                      }else if(rows[6]>=99 && rows[6] < 140){
                                        fila6 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}}>
                                            {rows[6]}
                                        </td> 
                                      }
                                      else if( rows[6] >= 140){
                                        fila6 = 
                                        <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}}>
                                            {rows[6]}
                                        </td> 
                                      }       
                                        return(
                                          <tbody>
                                            <tr>
                                              <th style={{paddingTop:"2px",paddingBottom:"2px"}} scope="row" className = "textabla3">{increment++}</th>
                                              <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40%"  className = "textabla3">{rows[0]}</td>
                                                {fila1}
                                                {fila2}
                                                {fila3}
                                                {fila4}
                                                {fila5}
                                                {fila6}
                                            </tr>
                                          </tbody>                     
                                        )
                                      })}
      
                                      </table>
                                      <p><font size="1" face="arial"color="black" >FRECUENCIA</font></p>
                                      <table className="table table-bordered table table-striped">
                                      
                                          <tr>
                                            <td width="10%" className="textabla3" style={{backgroundColor: "#F8F8F8",paddingTop:"2px",paddingBottom:"2px"}}></td>
                                            <td width="40%" className="textabla3" style={{backgroundColor: "#F8F8F8",paddingTop:"2px",paddingBottom:"2px"}}>Ponderaciones</td>
                                            <td width="10%"className="textabla3" style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}}>Nulo</td>
                                            <td width="10%"className="textabla3" style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}}>Bajo</td>
                                            <td width="10%"className="textabla3" style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}}>Medio</td>
                                            <td width="10%"className="textabla3" style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}}>Alto</td>
                                            <td width="10%"className="textabla3" style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}}>Muy Alto</td>
                                          </tr>
                                       
                                        <tbody>
                                          <tr>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>1</td>
                                          <td  width="40%" className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>Ambiente de Trabajo</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaUno1}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaUno2}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaUno3}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaUno4}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaUno5}</td>
                                          </tr>
                                          <tr>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>2</td>
                                          <td  width="40%" className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>Factores Propios</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaDos1}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaDos2}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaDos3}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaDos4}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaDos5}</td>
                                          </tr>
                                          <tr>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>3</td>
                                          <td  width="40%" className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>Organizacion</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaTres1}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaTres2}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaTres3}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaTres4}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaTres5}</td>
                                          </tr>
                                          <tr>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>4</td>
                                          <td width="40%" className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>Liderazgo</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaCuatro1}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaCuatro2}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaCuatro3}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaCuatro4}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaCuatro5}</td>
                                          </tr>
                                          <tr>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>5</td>
                                          <td width="40%" className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>Entorno Organizacional</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaCinco1}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaCinco2}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaCinco3}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaCinco4}</td>
                                          <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px"}}>{frecuenciaCategoriaCinco5}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <td>
                                       
                                       </td>
                                   
                              </div>
                          </PDFExport>
                      </div>
                  </div>
                  </center>    
                </React.Fragment>
        }
        
        return ( 
            <React.Fragment>
            <center>
            {renderizadoGlobal}
            {renderizadoEjecutivo}
            </center>  
        </React.Fragment>
         );
    }
}
 
export default ReportEEOG;