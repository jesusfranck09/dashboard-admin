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

class ReportRPGE extends Component {
  pdfExportComponent;
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        const {peticion1,filtro1,filtro2,filtro3,filtro4,filtro5,filtro6,filtro7,filtro8,parametro,fechaCompleta,datosLength} = this.props
        let representante = localStorage.getItem("nombre") + " " + localStorage.getItem("apellidos")
        let periodoEvaluacion = localStorage.getItem("periodo") 
        let botonDescargarReporteIndividualResultados = <Button type="success"   onClick={(e) => { this.pdfExportComponent.save();}}>Descargar reporte</Button>
        let cerrarReporte =  <Button shape="circle" size="middle" danger onClick={e=>window.location.reload()}><MDBIcon icon="times" /></Button>
        let total;
        let ponderacionPromedio;
        let ponderacionEjecutivo;
        let array1=[], array2=[], array3=[], array4=[], array5=[], array6=[], array7=[], array8=[], array9=[], array10=[]      
        let array11=[], array12=[], array13=[], array14=[], array15=[], array16=[], array17=[], array18=[], array19=[], array20=[]      
        let array21=[], array22=[], array23=[], array24=[], array25=[], array26=[], array27=[], array28=[], array29=[], array30=[]      
        let array31=[], array32=[], array33=[], array34=[], array35=[], array36=[], array37=[], array38=[], array39=[], array40=[]      
        let array41=[], array42=[], array43=[], array44=[], array45=[], array46=[];  

        let filtrar1,filtrar2,filtrar3,filtrar4,filtrar5,filtrar6,filtrar7,filtrar8,filtrar9,filtrar10,
        filtrar11,filtrar12,filtrar13,filtrar14,filtrar15,filtrar16,filtrar17,filtrar18,filtrar19,filtrar20,
        filtrar21,filtrar22,filtrar23,filtrar24,filtrar25,filtrar26,filtrar27,filtrar28,filtrar29,filtrar30,
        filtrar31,filtrar32,filtrar33,filtrar34,filtrar35,filtrar36,filtrar37,filtrar38,filtrar39,filtrar40,
        filtrar41,filtrar42,filtrar43,filtrar44,filtrar45,filtrar46;

        var arr1Int,arr2Int,arr3Int,arr4Int,arr5Int,arr6Int,arr7Int,arr8Int,arr9Int,arr10Int,
        arr11Int,arr12Int,arr13Int,arr14Int,arr15Int,arr16Int,arr17Int,arr18Int,arr19Int,arr20Int,
        arr21Int,arr22Int,arr23Int,arr24Int,arr25Int,arr26Int,arr27Int,arr28Int,arr29Int,arr30Int,
        arr31Int,arr32Int,arr33Int,arr34Int,arr35Int,arr36Int,arr37Int,arr38Int,arr39Int,arr40Int,
        arr41Int,arr42Int,arr43Int,arr44Int,arr45Int,arr46Int;

        let colorCategoriaUno,categoria1Nulo,categoria1Bajo,categoria1Medio,categoria1Alto,categoria1MuyAlto,
        colorCategoriaDos,categoria2Nulo,categoria2Bajo,categoria2Medio,categoria2Alto,categoria2MuyAlto,
        colorCategoriaTre,categoria3Nulo,categoria3Bajo,categoria3Medio,categoria3Alto,categoria3MuyAlto,
        colorCategoriaCuatro,categoria4Nulo,categoria4Bajo,categoria4Medio,categoria4Alto,categoria4MuyAlto;

        let respuesta1,respuesta2,respuesta3,respuesta4,respuesta5,respuesta6,respuesta7,respuesta8,respuesta9,respuesta10,
        respuesta11,respuesta12,respuesta13,respuesta14,respuesta15,respuesta16,respuesta17,respuesta18,respuesta19,respuesta20,
        respuesta21,respuesta22,respuesta23,respuesta24,respuesta25,respuesta26,respuesta27,respuesta28,respuesta29,respuesta30,
        respuesta31,respuesta32,respuesta33,respuesta34,respuesta35,respuesta36,respuesta37,respuesta38,respuesta39,respuesta40,
        respuesta41,respuesta42,respuesta43,respuesta44,respuesta45,respuesta46;

        let cat1Ejecutivo,cat2Ejecutivo,cat3Ejecutivo,cat4Ejecutivo,cat5Ejecutivo;

        let colorDominioUno,Dominio1Nulo,Dominio1Bajo,Dominio1Medio,Dominio1Alto,Dominio1MuyAlto,
        colorDominioDos,Dominio2Nulo,Dominio2Bajo,Dominio2Medio,Dominio2Alto,Dominio2MuyAlto,
        colorDominioTres,Dominio3Nulo,Dominio3Bajo,Dominio3Medio,Dominio3Alto,Dominio3MuyAlto,
        colorDominioCuatro,Dominio4Nulo,Dominio4Bajo,Dominio4Medio,Dominio4Alto,Dominio4MuyAlto,
        colorDominioCinco,Dominio5Nulo,Dominio5Bajo,Dominio5Medio,Dominio5Alto,Dominio5MuyAlto,
        colorDominioSeis,Dominio6Nulo,Dominio6Bajo,Dominio6Medio,Dominio6Alto,Dominio6MuyAlto,
        colorDominioSiete,Dominio7Nulo,Dominio7Bajo,Dominio7Medio,Dominio7Alto,Dominio7MuyAlto,
        colorDominioOcho,Dominio8Nulo,Dominio8Bajo,Dominio8Medio,Dominio8Alto,Dominio8MuyAlto;
        
        let empleado;

        let celdaEjecutivo,criteriosEjecutivo,celdaPrevEjecutivo,criteriosPrevEjecutivo; 



        peticion1.map(rows=>{
            filtrar1 =  rows.filter(function(hero) {
                return hero.fk_preguntasRP === "1";
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
                return hero.fk_preguntasRP === "2";
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
                return hero.fk_preguntasRP === "3";
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
                return hero.fk_preguntasRP === "4";
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
                return hero.fk_preguntasRP === "5";
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
                return hero.fk_preguntasRP === "6";
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
                return hero.fk_preguntasRP === "7";
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
                return hero.fk_preguntasRP === "8";
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
                return hero.fk_preguntasRP === "9";
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
                return hero.fk_preguntasRP === "10";
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
                return hero.fk_preguntasRP === "11";
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
                return hero.fk_preguntasRP === "12";
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
                return hero.fk_preguntasRP === "13";
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
                return hero.fk_preguntasRP === "14";
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
                return hero.fk_preguntasRP === "15";
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
                return hero.fk_preguntasRP === "16";
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
                return hero.fk_preguntasRP === "17";
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
                return hero.fk_preguntasRP === "18";
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
                return hero.fk_preguntasRP === "19";
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
                return hero.fk_preguntasRP === "20";
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
                return hero.fk_preguntasRP === "21";
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
                return hero.fk_preguntasRP === "22";
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
                return hero.fk_preguntasRP === "23";
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
                return hero.fk_preguntasRP === "24";
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
                return hero.fk_preguntasRP === "25";
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
                return hero.fk_preguntasRP === "26";
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
                return hero.fk_preguntasRP === "27";
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
                return hero.fk_preguntasRP === "28";
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
                return hero.fk_preguntasRP === "29";
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
                return hero.fk_preguntasRP === "30";
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
                return hero.fk_preguntasRP === "31";
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
                return hero.fk_preguntasRP === "32";
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
                return hero.fk_preguntasRP === "33";
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
                return hero.fk_preguntasRP === "34";
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
                return hero.fk_preguntasRP === "35";
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
                return hero.fk_preguntasRP === "36";
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
                return hero.fk_preguntasRP === "37";
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
                return hero.fk_preguntasRP === "38";
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
                return hero.fk_preguntasRP === "39";
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
                return hero.fk_preguntasRP === "40";
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
                return hero.fk_preguntasRP === "41";
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
                return hero.fk_preguntasRP === "42";
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
                return hero.fk_preguntasRP === "43";
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
                return hero.fk_preguntasRP === "44";
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
                return hero.fk_preguntasRP === "45";
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
                return hero.fk_preguntasRP === "46";
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
              var arr1 = valor1.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr2 = valor2.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr3 = valor3.map(function (x) { 
                return parseInt(x, 10); 
              });

              var categoriaUnoEjecutivo = []; 
              for(let i = 0; i < arr1.length; i++){
                categoriaUnoEjecutivo[i] =arr1[i]+arr2[i]+arr3[i];
              }

              var arr4 = valor4.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr9 = valor9.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr5 = valor5.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr6 = valor6.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr7 = valor7.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr8 = valor8.map(function (x) { 
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
              var arr10 = valor10.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr11 = valor11.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr12 = valor12.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr13 = valor13.map(function (x) { 
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
              var arr18 = valor18.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr19 = valor19.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr26 = valor26.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr27 = valor27.map(function (x) { 
                return parseInt(x, 10);                
              
              });
              var categoriaDosEjecutivo = [];
              for(let i = 0; i < arr4.length; i++){
                categoriaDosEjecutivo[i] =arr4[i]+arr9[i]+arr5[i]+arr6[i]+arr7[i]+arr8[i]+arr41[i]+arr42[i]+arr43[i]+arr10[i]+arr11[i]+arr12[i]+arr13[i]+arr20[i]+arr21[i]+arr22[i]+arr18[i]+arr19[i]+arr26[i]+arr27[i];
              }

              var arr14 = valor14.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr15 = valor15.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr16 = valor16.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr17 = valor17.map(function (x) { 
                return parseInt(x, 10); 
              });
          
              var categoriaTresEjecutivo = [];

              for(let i = 0; i < arr14.length; i++){
                categoriaTresEjecutivo[i] =arr14[i]+arr15[i]+arr16[i]+arr17[i];
              }

              var arr23 = valor23.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr24 = valor24.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr25 = valor25.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr28 = valor28.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr29 = valor29.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr30 = valor30.map(function (x) { 
                return parseInt(x, 10); 
              });
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
              var arr35 = valor35.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr36 = valor36.map(function (x) { 
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
              var arr44 = valor44.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr45 = valor45.map(function (x) { 
                return parseInt(x, 10); 
              });
              var arr46 = valor46.map(function (x) { 
                return parseInt(x, 10); 
              });
             
              var categoriaCuatroEjecutivo = [];

              for(let i = 0; i < arr23.length; i++){
                categoriaCuatroEjecutivo[i] =arr23[i]+arr24[i]+arr25[i]+arr28[i]+arr29[i]+arr30[i]+arr31[i]+arr32[i]+arr33[i]+arr34[i]+arr35[i]+arr36[i]+arr37[i]+arr38[i]+arr39[i]+arr40[i]+arr44[i]+arr45[i]+arr46[i];
              }
            let totalPonderacion = [];
    
            for(let i = 0; i < categoriaUnoEjecutivo.length; i++){
               totalPonderacion[i] = categoriaUnoEjecutivo[i] + categoriaDosEjecutivo[i] + categoriaTresEjecutivo[i] + categoriaCuatroEjecutivo[i];
            }
            cat1Ejecutivo = categoriaUnoEjecutivo
              cat2Ejecutivo = categoriaDosEjecutivo
              cat3Ejecutivo = categoriaTresEjecutivo
              cat4Ejecutivo = categoriaCuatroEjecutivo
              ponderacionEjecutivo =  totalPonderacion 
              let suma = 0;
              totalPonderacion.forEach(function(numero){
                  suma += numero;
              });
              let totalPonderacionEjecutivo = (suma/ponderacionEjecutivo.length).toFixed(2)
              ponderacionPromedio = totalPonderacionEjecutivo
              })
              
            total =(respuesta1+respuesta2+respuesta3+respuesta4+respuesta5+respuesta6+respuesta7+respuesta8+respuesta9+respuesta10+respuesta11+respuesta12+respuesta13+respuesta14+respuesta15+respuesta16+respuesta17+respuesta18+respuesta19+respuesta20
                +respuesta21+respuesta22+respuesta23+respuesta24+respuesta25+respuesta26+respuesta27+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40
                +respuesta41+respuesta42+respuesta43+respuesta44+respuesta45+respuesta46).toFixed(2)
                let length = peticion1.length;

                let general =total/length.toFixed(2);
                let celda,criterios,celdaPrev,criteriosPrev;

                if(general<20){
                    celda =<p className="textabla2" style={{backgroundColor:"#9BE0F7"}}>Nulo</p>
                    celdaPrev = <TableCell width="10%"  style={{backgroundColor: "#9BE0F7"}} className="text-center">Nulo</TableCell>
                    criterios = <TableCell style={{backgroundColor: "#a7f5ea"}}><font size="1" face="arial"color="black" align="justify">El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</font></TableCell>
                    criteriosPrev = <TableCell style={{backgroundColor: "#a7f5ea"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
                    }else if(general>=20 && general <45){
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
                    }else if(general>=45 && general < 70){
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
                    }else if(general>=70 && general < 90){
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
                    else if( general >= 90){
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

                    let categoriaUno = ((respuesta2+respuesta1+respuesta3)/length).toFixed(2);
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
                    let categoriaDos = ((respuesta4+respuesta9+respuesta5+respuesta6+respuesta7+respuesta8+respuesta41+respuesta42+respuesta43+respuesta10+respuesta11+respuesta12+respuesta13+respuesta20+respuesta21+respuesta22+respuesta18+respuesta19+respuesta26+respuesta27)/length).toFixed(2);
                    if(categoriaDos < 10){
                        colorCategoriaDos  =  <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
                        categoria2Nulo= categoriaDos
                      }
                      else if(categoriaDos >= 10 && categoriaDos < 20){
                        colorCategoriaDos =<td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
                        categoria2Bajo= categoriaDos
                      }else if(categoriaDos >=20 && categoriaDos < 30){
                        colorCategoriaDos=<td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
                        categoria2Medio= categoriaDos
                      }else if(categoriaDos >=30 && categoriaDos < 40){
                        colorCategoriaDos = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
                        categoria2Alto= categoriaDos
                      }else if(categoriaDos >= 40){
                        colorCategoriaDos = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
                        categoria2MuyAlto= categoriaDos
                      }
                      let  categoriaTre =( (respuesta14+respuesta15+respuesta16+respuesta17)/length).toFixed(2);
                      if(categoriaTre < 4){
                        colorCategoriaTre  = <td style={{backgroundColor: "#9BE0F7",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Nulo</td>
                        categoria3Nulo= categoriaTre
                      }else if(categoriaTre >= 4 && categoriaTre < 6){
                        colorCategoriaTre =<td style={{backgroundColor: "#6BF56E",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Bajo</td>
                        categoria3Bajo= categoriaTre
                      }else if(categoriaTre >=6 && categoriaTre < 9){
                        colorCategoriaTre =<td style={{backgroundColor: "#FFFF00",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Medio</td>
                        categoria3Medio= categoriaTre
                      }else if(categoriaTre >=9 && categoriaTre < 12){
                        colorCategoriaTre = <td style={{backgroundColor: "#FFC000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Alto</td>
                        categoria3Alto= categoriaTre
                      }else if(categoriaTre >= 12){
                        categoria3MuyAlto= categoriaTre
                        colorCategoriaTre = <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
                      }
                      let categoriaCuatro = ((respuesta23+respuesta24+respuesta25+respuesta28+respuesta29+respuesta30+respuesta31+respuesta32+respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40+respuesta44+respuesta45+respuesta46)/length).toFixed(2);
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
                          colorCategoriaCuatro= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
                          categoria4MuyAlto= categoriaCuatro
                      }

                      let DominioUno =( (respuesta2+respuesta1+respuesta3)/length).toFixed(2);

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
                          colorDominioUno= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
                          Dominio1MuyAlto= DominioUno
                      }
                      let DominioDos = ((respuesta4+respuesta9+respuesta5+respuesta6+respuesta7+respuesta8+respuesta41+respuesta42+respuesta43+respuesta10+respuesta11+respuesta12+respuesta13) /length).toFixed(2);
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
                          colorDominioDos= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
                          Dominio2MuyAlto= DominioDos
                      }
                      let DominioTres = ((respuesta20+respuesta21+respuesta22+respuesta18+respuesta19+respuesta26+respuesta27)/length).toFixed(2);
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
                          colorDominioTres= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
                          Dominio3MuyAlto= DominioTres
                      }
                      let DominioCuatro =( (respuesta14+respuesta15)/length).toFixed(2);
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
                      let DominioCinco = ((respuesta16+respuesta17)/length).toFixed(2);
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
                          colorDominioCinco= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
                          Dominio5MuyAlto= DominioCinco
                      }
                      let DominioSeis = ((respuesta23+respuesta24+respuesta25+respuesta28+respuesta29)/length).toFixed(2);
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
                          colorDominioSeis= <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
                          Dominio6MuyAlto= DominioSeis
                      }
                      let DominioSiete = ((respuesta30+respuesta31+respuesta32+respuesta44+respuesta45+respuesta46)/length).toFixed(2);
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
                          colorDominioSiete=  <td style={{backgroundColor: "#FF0000",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center">Muy Alto</td>
                          Dominio7MuyAlto= DominioSiete
                      }
                      let DominioOcho = ((respuesta33+respuesta34+respuesta35+respuesta36+respuesta37+respuesta38+respuesta39+respuesta40)/length).toFixed(2);
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
                      let increment = 1

                      
                    if(ponderacionPromedio<20){
                      celdaEjecutivo = <p className="textabla2" style={{backgroundColor:"#9BE0F7"}}>Nulo</p>
                      celdaPrevEjecutivo = <TableCell width="10%"  style={{backgroundColor: "#9BE0F7"}} className="text-center"><font size="3" face="arial"color="black" align="justify">NULO O DESPRECIABLE</font></TableCell>
                      
                      criteriosEjecutivo = <TableCell style={{backgroundColor: "#a7f5ea"}}><font size="1" face="arial"color="black" align="justify">El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</font></TableCell>
                      criteriosPrevEjecutivo =<TableCell style={{backgroundColor: "#a7f5ea"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
                      
                      }else if(ponderacionPromedio>=20 && ponderacionPromedio < 45){
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
                      }else if(ponderacionPromedio>=45 && ponderacionPromedio < 70){
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
                      }else if(ponderacionPromedio>=70 && ponderacionPromedio < 90){
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
                      else if(ponderacionPromedio > 90){
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
                      let arrayFinal = [];
                      for(let i = 0; i < empleado.length; i++){
                         arrayFinal[i] = [empleado[i] , cat1Ejecutivo[i] , cat2Ejecutivo[i] , cat3Ejecutivo[i] , cat4Ejecutivo[i],ponderacionEjecutivo[i]];  
                      }
                      let renderizadoGlobal;
                      //////////////////////////////////////////////////////////////////////////////////////
                      if(parametro === 1){
                        renderizadoGlobal =  <Card style={{width:"70%",padding:"25px"}} title={<h6><strong>Resultados Globales en la aplicación de la evaluación RP</strong></h6>} extra = {<div>{botonDescargarReporteIndividualResultados}&nbsp;&nbsp;&nbsp;{cerrarReporte}</div>}>
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
                            <p  style={{marginTop:"2%"}}><strong>REPORTE GLOBAL DEL CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO<br/></strong></p>  
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
                                <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>RESULTADOS DEL DOMINIO</strong></TableCell>              
                                <TableCell component="th" scope="row"></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>  
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
                                <TableCell component="th" scope="row" align="center">{((respuesta1/length).toFixed(2))}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" width="50%" >2.- Condiciones deficientes e insalubres</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center"> {(respuesta2/length).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow> 
                                
                                <TableRow>
                                <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{(respuesta3/length).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" width="50%">4.- Cargas cuantitativas</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center"> {((respuesta4/length)+(respuesta9/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" width="50%">5.- Ritmos de trabajo acelerado</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{((respuesta5/length)+(respuesta6/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{((respuesta7/length)+(respuesta8/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{((respuesta41/length)+(respuesta42/length)+(respuesta43/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >8.- Cargas de alta responsabilidad</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{((respuesta10/length)+(respuesta11/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >9.- Cargas contradictorias o inconsistentes</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{((respuesta12/length)+(respuesta13/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" width="50%" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{((respuesta20/length)+(respuesta21/length)+(respuesta22/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{((respuesta18/length)+(respuesta19/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >12.- Limitada o inexistente capacitación</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{((respuesta26/length)+(respuesta27/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >13.- Jornadas de trabajo extensas</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{((respuesta14/length)+(respuesta15/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >14.- Influencia del trabajo fuera del centro laboral</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center"> {(respuesta16/length).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >15.- Influencia de las responsabilidades familiares</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{(respuesta17/length).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >16.- Escasa claridad de funciones</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center"> {((respuesta23/length)+(respuesta24/length)+(respuesta25/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >17.- Características del liderazgo</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center"> {((respuesta28/length)+(respuesta29/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >18.- Relaciones sociales en el trabajo</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{((respuesta30/length)+(respuesta31/length)+(respuesta32/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >20.- Deficiente relación con los colaboradores que supervisa</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center"> {((respuesta44/length)+(respuesta45/length)+(respuesta46/length)).toFixed(2)}</TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ></TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell component="th" scope="row" >20.- Violencia laboral</TableCell> 
                                <TableCell component="th" scope="row" ></TableCell>
                                <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
                                <TableCell component="th" scope="row" align="center">{((respuesta33/length)+(respuesta34/length)+(respuesta35/length)+(respuesta36/length)+(respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)).toFixed(2)}</TableCell>
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
                                  <center><p className="textabla1">Reporte global de factores de riesgo psicosocial en los centros de trabajo</p></center><br/>
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
                                  <p className="textabla2"><strong>GUÍA DE REFERENCIA II
                                  CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN
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
                                  <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center" width="20%">{categoriaUno}</td>
                                  {colorCategoriaUno}                                       
                              </tr>
                              <tr style={{paddingTop:"2px",paddingBottom:"2px"}}>                              
                              <td className="textabla3" width="10%" style= {{padding:"2px"}}>2</td>
                                  <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"  width="60%">Factores propios de la actividad</td>
                                  <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center" width="20%">{categoriaDos}</td>
                              {colorCategoriaDos}                                    
                              </tr>
                              <tr style={{paddingTop:"2px",paddingBottom:"2px"}}>                              
                              <td className="textabla3" width="10%" style= {{padding:"2px"}}>3</td>
                                  <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"  width="60%">Organización del tiempo de trabajo</td>
                                  <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center"width="20%">{categoriaTre}</td>
                              {colorCategoriaTre}                              
                              </tr>
                              <tr style={{paddingTop:"2px",paddingBottom:"2px"}}>                              
                                  <td className="textabla3" width="10%" style= {{padding:"2px"}}>4</td>
                                  <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"  width="60%">Liderazgo y relaciones en el trabajo</td>
                                  <td style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" align="center" width="20%">{categoriaCuatro}</td>
                                  {colorCategoriaCuatro}                                       
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
                                      <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Condiciones en el ambiente de trabajo</td>
                                      <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="20%" className="textabla3" align="center">{DominioUno}</td>
                                      {colorDominioUno}
                                  </tr>
                                  <tr>
                                      <td className="textabla3" width="10%" style={{paddingTop:"2px",paddingBottom:"2px"}}>2</td>
                                      <td className="textabla3" width="60%" style={{paddingTop:"2px",paddingBottom:"2px"}} align="left">Carga de Trabajo</td>
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
                              </table>  
                             
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
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center">{(respuesta1/length).toFixed(2)} </td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 2 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Condiciones deficientes e insalubres </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {(respuesta2/length).toFixed(2)} </td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 3 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Trabajos peligrosos </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {(respuesta3/length).toFixed(2)} </td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 4 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Cargas cuantitativas </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta4/length)+(respuesta9/length)).toFixed(2)} </td>
                                      </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 5 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%" > Ritmos de trabajo acelerado </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta5/length)+(respuesta6/length)).toFixed(2)} </td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 6 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Carga mental </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta7/length)+(respuesta8/length)).toFixed(2)} </td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 7 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Cargas psicológicas emocionales </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta41/length)+(respuesta42/length)+(respuesta43/length)).toFixed(2)}</td>
                                      </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 8 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Cargas de alta responsabilidad </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta10/length)+(respuesta11/length)).toFixed(2)}</td>
                                  </tr>
                                  <tr>           
                                  <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 9 </td>
                                  <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Cargas contradictorias o inconsistentes </td>
                                  <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta12/length)+(respuesta13/length)).toFixed(2)}</td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 10 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Falta de control y autonomía sobre el trabajo </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta20/length)+(respuesta21/length)+(respuesta22/length)).toFixed(2)} </td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 11 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Limitada o nula posibilidad de desarrollo </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta18/length)+(respuesta19/length)).toFixed(2)} </td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 12 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Limitada o inexistente capacitación </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta26/length)+(respuesta27/length)).toFixed(2)}</td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 13 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Jornadas de trabajo extensas </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta14/length)+(respuesta15/length)).toFixed(2)} </td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 14 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Influencia del trabajo fuera del centro laboral </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {(respuesta16/length).toFixed(2)} </td>
                                      </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 15</td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Influencia de las responsabilidades familiares </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center">{(respuesta17/length).toFixed(2)}</td>
                                  </tr>
            
                                  <tr>           
                                  <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 16 </td>
                                  <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Escasa claridad de funciones </td>
                                  <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta23/length)+(respuesta24/length)+(respuesta25/length)).toFixed(2)} </td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 17 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Características del liderazgo </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center">{((respuesta28/length)+(respuesta29/length)).toFixed(2)}</td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 18 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Relaciones sociales en el trabajo </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center">  {((respuesta30/length)+(respuesta31/length)+(respuesta32/length)).toFixed(2)} </td>
                                  </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 19 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Deficiente relación con los colaboradores que Supervisa </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta44/length)+(respuesta45/length)+(respuesta46/length)).toFixed(2)} </td>
                                      </tr>
                                  <tr>         
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="10%"> 20 </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="60%"> Violencia laboral </td>
                                      <td  style={{paddingTop:"2px",paddingBottom:"2px"}} className="textabla3" width="20%" align="center"> {((respuesta33/length)+(respuesta34/length)+(respuesta35/length)+(respuesta36/length)+(respuesta37/length)+(respuesta38/length)+(respuesta39/length)+(respuesta40/length)).toFixed(2)}</td>
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
                      <Card style={{width:"70%",padding:"25px"}} title={<h6><strong>Reporte Ejecutivo en la aplicación de la evaluación RP</strong></h6>} extra = {<div>{botonDescargarReporteIndividualResultados}&nbsp;&nbsp;&nbsp;{cerrarReporte}</div>}>          
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
                        <p  style={{marginTop:"2%"}}><strong>REPORTE EJECUTIVO DEL CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO<br/></strong></p>  
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
                          <TableCell width="10%" style={{backgroundColor: "#E6E7E8",paddingTop:"2px",paddingBottom:"2px"}} className="textabla3"><strong>Total</strong></TableCell>              
                      </TableRow>
                      {arrayFinal.map(rows=>{
                        let fila1;
                        let fila2;
                        let fila3;
                        let fila4;
                        let fila5;
                        if(rows[1] < 3){
                          fila1 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#9BE0F7"}}>
                            <strong>  {rows[1]} </strong>
                          </TableCell>
                          frecuenciaCategoriaUno1++;
                        }else if(rows[1] >= 3 && rows[1] < 5){                                                     
                            fila1 = 
                            <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#6BF56E"}}>
                              {rows[1]}
                            </TableCell>
                          frecuenciaCategoriaUno2++;
                        }else if(rows[1] >= 5 && rows[1] < 7){
                            fila1 = 
                            <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFFF00"}}>
                                {rows[1]}
                            </TableCell>
                            frecuenciaCategoriaUno3++;
                        }else if(rows[1] >= 7 && rows[1] < 9){
                            fila1 = 
                            <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFC000"}}>
                                {rows[1]}
                              </TableCell>
                          frecuenciaCategoriaUno4++;   
                        }else if(rows[1] >= 9){
                              fila1 = 
                              <TableCell  style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FF0000"}} >
                                {rows[1]}
                              </TableCell>
                            frecuenciaCategoriaUno5++;
                        }
            
                        if(rows[2] < 10){
                          fila2 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#9BE0F7"}}>
                          {rows[2]}
                          </TableCell>
                          frecuenciaCategoriaDos1++;
                        }else if(rows[2] >= 10 && rows[2] < 20){
                          fila2 =
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#6BF56E"}}>
                          {rows[2]}
                          </TableCell>
                          frecuenciaCategoriaDos2++;
                        }else if(rows[2] >=20 && rows[2] < 30){
                          fila2 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFFF00"}}>
                          {rows[2]}
                          </TableCell>
                          frecuenciaCategoriaDos3++;
                        }else if(rows[2] >=30 && rows[2] < 40){
                          fila2 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFC000"}}>
                          {rows[2]}
                          </TableCell>
                          frecuenciaCategoriaDos4++;
                        }else if(rows[2] >= 40){
                          fila2 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FF0000"}}>
                          {rows[2]}
                            </TableCell>
                            frecuenciaCategoriaDos5++;
                          }
            
                        if(rows[3] < 4){
                          fila3 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#9BE0F7"}}>
                              {rows[3]}
                          </TableCell>
                          frecuenciaCategoriaTres1++;
                        }else if(rows[3] >= 4 && rows[3] < 6){
                          fila3 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#6BF56E"}}>
                              {rows[3]}
                          </TableCell>
                          frecuenciaCategoriaTres2++;
                        }else if(rows[3] >=6 && rows[3] < 9){
                          fila3 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFFF00"}}>
                              {rows[3]}
                          </TableCell>
                          frecuenciaCategoriaTres3++;
                        }else if(rows[3] >=9 && rows[3] < 12){
                          fila3 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFC000"}}>
                              {rows[3]}
                          </TableCell>
                          frecuenciaCategoriaTres4++;
                        }else if(rows[3] >= 12){
                          fila3 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FF0000"}}>
                              {rows[3]}
                          </TableCell>
                          frecuenciaCategoriaTres5++;
                        }
            
                        if(rows[4]  < 10){
                          fila4 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#9BE0F7"}}>
                              {rows[4]}
                          </TableCell>
                          frecuenciaCategoriaCuatro1++;
                        }else if(rows[4] >= 10 && rows[4] < 18){
                          fila4 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#6BF56E"}}>
                              {rows[4]}
                          </TableCell>
                          frecuenciaCategoriaCuatro2++;
                        }else if(rows[4] >=18 && rows[4] < 28){
                          fila4 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFFF00"}}>
                              {rows[4]}
                          </TableCell>
                          frecuenciaCategoriaCuatro3++;
                        }else if(rows[4] >=28 && rows[4] < 38){
                          fila4 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFC000"}}>
                              {rows[4]}
                          </TableCell>
                          frecuenciaCategoriaCuatro4++;
                        }else if(rows[4] >= 38){
                          fila4 = 
                          <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FF0000"}}>
                              {rows[4]}
                          </TableCell>   
                          frecuenciaCategoriaCuatro5++;
                        }            
                          if(rows[5]<20){
                            fila5 = 
                            <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor:"#9BE0F7"}}>
                                {rows[5]}
                            </TableCell>    
                          }
                          else if(rows[5]>=20 && rows[5] <45){
                            fila5 = 
                            <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#6BF56E"}}>
                                {rows[5]}
                            </TableCell> 
                          }else if(rows[5]>=45 && rows[5] < 70){
                            fila5 = 
                            <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFFF00"}}>
                                {rows[5]}
                            </TableCell> 
                          }else if(rows[5]>=70 && rows[5] < 90){
                            fila5 = <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FFC000"}}>
                                {rows[5]}
                            </TableCell> 
                          }
                          else if( rows[5] >= 90){
                            fila5 = 
                            <TableCell className="textabla3" style={{paddingTop:"2px", paddingBottom:"2px", backgroundColor: "#FF0000"}}>
                                {rows[5]}
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
                                                  <center><p className="textabla1">Reporte Ejecutivo Global | identificación y análisis de los factores de riesgo psicosocial</p></center><br/>
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
                                                    <p className="textabla2"><strong>GUÍA DE REFERENCIA II
                                                    CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN
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
                                                      <th style={{paddingTop:"2px",paddingBottom:"2px"}} width="8%" scope="col" className="textabla3"><strong>Total</strong></th>
                                                    </tr>
                                                  {arrayFinal.map(rows=>{
                                                    let filas1;
                                                    let filas2;
                                                    let filas3;
                                                    let filas4;
                                                    let filas5;
                                                    if(rows[1] < 3){
                                                      filas1 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}}>
                                                         {rows[1]}
                                                       </td>
                                                   }else if(rows[1] >= 3 && rows[1] < 5){                                                     
                                                       filas1 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}}>
                                                         {rows[1]}
                                                       </td>
                                                   }else if(rows[1] >= 5 && rows[1] < 7){
                                                        filas1 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}}>
                                                           {rows[1]}
                                                         </td>
                                                   }else if(rows[1] >= 7 && rows[1] < 9){
                                                        filas1 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}}>
                                                           {rows[1]}
                                                         </td>
                                                   }else if(rows[1] >= 9){
                                                         filas1 = <td className="textabla3"  style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}} >
                                                           {rows[1]}
                                                         </td>
                                                   }
                  
                                                    if(rows[2] < 10){
                                                      filas2 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}}>
                                                      {rows[2]}
                                                      </td>
                                                    }else if(rows[2] >= 10 && rows[2] < 20){
                                                      filas2 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}}>
                                                      {rows[2]}
                                                      </td>
                                                    }else if(rows[2] >=20 && rows[2] < 30){
                                                      filas2 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}}>
                                                      {rows[2]}
                                                      </td>
                                                    }else if(rows[2] >=30 && rows[2] < 40){
                                                      filas2 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}}>
                                                      {rows[2]}
                                                      </td>
                                                    }else if(rows[2] >= 40){
                                                      filas2 = <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}}>
                                                      {rows[2]}
                                                      </td>
                                                    }
                                                  if(rows[3] < 4){
                                                    filas3 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}}>
                                                        {rows[3]}
                                                    </td>
                                                  }else if(rows[3] >= 4 && rows[3] < 6){
                                                    filas3 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}}>
                                                        {rows[3]}
                                                    </td>
                                                  }else if(rows[3] >=6 && rows[3] < 9){
                                                    filas3 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}}>
                                                        {rows[3]}
                                                    </td>
                                                  }else if(rows[3] >=9 && rows[3] < 12){
                                                    filas3 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}}>
                                                        {rows[3]}
                                                    </td>
                                                  }else if(rows[3] >= 12){
                                                    filas3 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}}>
                                                        {rows[3]}
                                                    </td>
                                                  }
                  
                                                  if(rows[4]  < 10){
                                                    filas4 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}}>
                                                        {rows[4]}
                                                    </td>
                                                  }else if(rows[4] >= 10 && rows[4] < 18){
                                                    filas4 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}}>
                                                        {rows[4]}
                                                    </td>
                                                  }else if(rows[4] >=18 && rows[4] < 28){
                                                    filas4 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}}>
                                                        {rows[4]}
                                                    </td>
                                                  }else if(rows[4] >=28 && rows[4] < 38){
                                                    filas4 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}}>
                                                        {rows[4]}
                                                    </td>
                                                  }else if(rows[4] >= 38){
                                                    filas4 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}}>
                                                        {rows[4]}
                                                    </td>   
                                                  }
                                                  if(rows[5]<20){
                                                    filas5 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#9BE0F7"}}>
                                                        {rows[5]}
                                                    </td>
                                                  }else if(rows[5]>=20 && rows[5] <45){
                                                    filas5 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#6BF56E"}}>
                                                        {rows[5]}
                                                    </td>
                                                     
                                                  }else if(rows[5]>=45 && rows[5] < 70){
                                                    filas5 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFFF00"}}>
                                                        {rows[5]}
                                                    </td>
                                                     
                                                  }else if(rows[5]>=70 && rows[5] < 90){
                                                    filas5 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FFC000"}}>
                                                        {rows[5]}
                                                    </td>
                                                  }else if( rows[5] >= 90){ 
                                                    filas5 = 
                                                    <td className="textabla3" style={{paddingTop:"2px",paddingBottom:"2px",backgroundColor: "#FF0000"}}>
                                                        {rows[5]}
                                                    </td>   
                                                  }
                                                    return(
                                                      <tbody>
                                                        <tr>
                                                          <th style={{paddingTop:"2px",paddingBottom:"2px"}} scope="row" className = "textabla3">{increment++}</th>
                                                          <td style={{paddingTop:"2px",paddingBottom:"2px"}} width="40%"  className = "textabla3">{rows[0]}</td>
                                                            {filas1}
                                                            {filas2}
                                                            {filas3}
                                                            {filas4}
                                                            {filas5}
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
 
export default ReportRPGE;