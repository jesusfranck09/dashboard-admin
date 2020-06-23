import React from "react";
import MUIDataTable from "mui-datatables";
import Grow from "@material-ui/core/Grow";
import {MDBRow,MDBCol,MDBBtn,MDBTableHead, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav,MDBTable, MDBTableBody, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logo.png'
import logotipo from '../images/logotipo.png'
import diagnostico from '../images/diagnostico.png'
import { API} from '../utils/http'

import '../Home/index.css'
import usuario from '../images/usuario.png'
import Button from '@material-ui/core/Button';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { DialogUtility } from '@syncfusion/ej2-popups';
import Modal from 'react-modal';
import PDF from '../PDF/index'
import { Bar } from "react-chartjs-2";
import { MDBBadge} from "mdbreact";
import {Alert,Badge} from 'reactstrap'
import {
  Grid,
  
} from '@material-ui/core';
import axios from 'axios'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { PDFExport }  from '@progress/kendo-react-pdf';
import PageTemplate from './pageTemplate.jsx';


class App extends React.Component {
pdfExportComponent ;
  constructor(props) {
    super(props);
    this.state = {
      datos:[],
      empleados:[],
      getPonderacion:[],
      datosGlobales:[],
      botonDescargar:'1',
      botonDescargarIndividual:'1',
      botonDescargaMasivo:'1',
      peticion1:[],
      reporteImasivo:[],
      filtro1:'',
      filtro2:'',
      filtro3:'',
      filtro4:'',
      filtro5:'',
      filtro6:'',
      filtro7:'',
      filtro8:'',
      nombre1:'',
      nombre2:'',
      nombre3:'',
      nombre4:'',
      nombre5:'',
      nombre6:'',
      nombre7:'',
      nombre8:'',
      datosLength:'',
      resultados:[],
      fecha:'',
      collapse: false,
      isOpen: false,
      spinner:false,
      showModal2: false,  
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      dataBar: {
        labels: ["Nulo", "Bajo", "Medio", "Alto", "Muy Alto"],
        datasets: [
          {
            label: "% Resultados",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(155,224,247)",
              "rgba(107,245,110)",
              "rgba(255, 500,0)",
              "rgba(255, 192, 0)",
              "rgba(255, 0,0)",
            ],
            borderWidth: 2,
            borderColor: [
              // "rgba(255, 134, 159, 1)",
              // "rgba(98,  182, 239, 1)",
              // "rgba(255, 218, 128, 1)",
              // "rgba(113, 205, 205, 1)",
              // "rgba(170, 128, 252, 1)",
              // "rgba(255, 177, 101, 1)"
            ]
          }
        ]
      } 
    };
    this.onClick = this.onClick.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.ads = this.ads.bind(this);
    
  }

    componentWillMount(){
      var Nombre = localStorage.getItem("nombre")
      var Apellidos = localStorage.getItem("apellidos")

      var LaFecha=new Date();
      var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      var diasem=new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
      var diasemana=LaFecha.getDay();
      var FechaCompleta="";
      var NumeroDeMes="";    
      NumeroDeMes=LaFecha.getMonth();
      FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
  
      this.setState({date:FechaCompleta}) 
      this.setState({nombre:Nombre}) 
      this.setState({apellidos:Apellidos}) 
      this.getGlobalEmployees()
    
    }
      onClick() {
        this.setState({
          collapse: !this.state.collapse,
        });
      }
  
      handleclick(){
      this.props.history.push("/profile")
      }
   
      handleLogOut(){
      localStorage.removeItem("elToken")
      localStorage.removeItem("nombre")
      localStorage.removeItem("apellidos")
      localStorage.removeItem("rfc")
      localStorage.removeItem("razonsocial")
      localStorage.removeItem("usuario")
      localStorage.removeItem("correo")
      localStorage.removeItem("max")
      this.props.history.push("/")
      DialogUtility.alert({
        animationSettings: { effect: 'Fade' },           
        title: 'Hasta luego...!',
        position: "fixed",})}
      ads(){
        this.setState({showModal2:true}) 
      }
       getGlobalEmployees   = async () => {
        let datasort;
        let order;
        var id  =  localStorage.getItem("idAdmin")       
        // const url = 'http://localhost:8000/graphql'
    
        await  axios({
          url:  API,
          method:'post',
          data:{ 
          query:`
          query{
            getEmployeesResolvesATS(data:"${[id]}"){
              id
              nombre
              ApellidoP
              ApellidoM
              Sexo
              AreaTrabajo
              Puesto
              CentroTrabajo
              periodo
                }
              }
              `
          }
          }).then((datos) => {
            datasort = datos.data.data.getEmployeesResolvesATS
            datasort.sort(function(a,b) {return (a.ApellidoP > b.ApellidoP) ? 1 : ((b.ApellidoP > a.ApellidoP) ? -1 : 0);} );
            this.setState({empleados:datasort})  

            console.log("datasort",datasort)
        
          }).catch(err=>{
            console.log("error" ,err)
          })

         
     }

      consultarDatosFiltrados = async (datos,filtro) =>{
        this.setState({botonDescargaMasivo:''})
        this.setState({botonDescargarIndividual:''})
        this.setState({spinner:true})
        let array=[];
        let periodo;
        let totalEmpleados=[];
        datos.map(rows=>{
          periodo= rows.data[6]
          array.push(rows.data[0])
        })
        for(var i=0; i<=array.length;i++){   
        // console.log("array en la posicion  de i " , array[i])    
        // const url = 'http://localhost:8000/graphql'

       await  axios({
          url:  API,
          method:'post',
          data:{
          query:`
            query{
              getresultGlobalSurveyATS(data:"${[array[i],periodo]}"){
              id 
              Respuestas 
              fk_preguntasATS
              fk_Empleados 
              ponderacion
              nombre 
              ApellidoP 
              ApellidoM 
              Curp 
              RFC 
              FechaNacimiento 
              Sexo 
              EstadoCivil 
              correo 
              AreaTrabajo 
              Puesto 
              TipoPuesto 
              NivelEstudios 
              TipoPersonal 
              JornadaTrabajo 
              TipoContratacion 
              TiempoPuesto 
              ExperienciaLaboral 
              RotacionTurnos 
              CentroTrabajo
              fk_administrador 
              fk_correos 
                  }
                }
              `
          }
              }).then(datos => {    
              totalEmpleados.push(datos.data.data.getresultGlobalSurveyATS)
              // console.log("totalEMpleados" , totalEmpleados)
              this.setState({peticion1:totalEmpleados})
     
               
              this.setState({spinner:false}) 
              })
              .catch(err => {
              });  
           }
          
            if(filtro!= undefined){
            if(filtro[0].length>0){
              this.setState({nombre1:filtro[0][0]})
              this.setState({filtro1:"ID"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre1:''})
              this.setState({filtro1:""})
              this.setState({filtro6:""})
            }
            if(filtro[1].length>0){
              this.setState({nombre2:filtro[1][0]})
              this.setState({filtro2:"NOMBRE"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre2:''})
              this.setState({filtro2:""})
              this.setState({filtro6:""})
            }
            if(filtro[2].length>0){
              this.setState({nombre3:filtro[2][0]})
              this.setState({filtro3:"SEXO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre3:''})
              this.setState({filtro3:""})
              this.setState({filtro6:""})
            }
            if(filtro[3].length>0){
              this.setState({nombre4:filtro[3][0]})
              this.setState({filtro4:"ÁREA DE TRABAJO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre4:''})
              this.setState({filtro4:""})
              this.setState({filtro6:""})
            }if(filtro[4].length>0){
              this.setState({nombre5:filtro[4][0]})
              this.setState({filtro5:"PUESTO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre5:''})
              this.setState({filtro5:""})
              this.setState({filtro6:""})
            }if(filtro[5].length>0){
              this.setState({nombre6:filtro[5][0]})
              this.setState({filtro7:"CENTRO DE TRABAJO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre6:''})
              this.setState({filtro7:""})
              this.setState({filtro6:""})
            }if(filtro[6].length>0){
              this.setState({nombre7:filtro[6][0]})
              this.setState({filtro8:"PERIODO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre7:''})
              this.setState({filtro8:""})
              this.setState({filtro6:""})
            }
          }else{
            this.setState({filtro6:"SIN FILTRO"})
          }
          
          this.setState({datosLength:datos.length})
        // console.log("datos enviados",datos[0].data[6])
          }


        reporteImasivo = async (datos,filtro) =>{
        this.setState({botonDescargarIndividual:''})
        this.setState({botonDescargar:''})   
         this.setState({spinner:true})
          let array=[];
          let periodo;
          let totalEmpleados=[];
          datos.map(rows=>{
            periodo= rows.data[6]
            array.push(rows.data[0])
          })
          for(var i=0; i<=array.length;i++){   
            // console.log("array en la posicion  de i " , array[i])    
        // const url = 'http://localhost:8000/graphql'

            await  axios({
              url:  API,
              method:'post',
              data:{
              query:`
                query{
                  getresultGlobalSurveyATS(data:"${[array[i],periodo]}"){
                  id 
                  Respuestas 
                  fk_preguntasATS
                  fk_Empleados 
                  ponderacion
                  nombre 
                  ApellidoP 
                  ApellidoM 
                  Curp 
                  RFC 
                  FechaNacimiento 
                  Sexo 
                  EstadoCivil 
                  correo 
                  AreaTrabajo 
                  Puesto 
                  TipoPuesto 
                  NivelEstudios 
                  TipoPersonal 
                  JornadaTrabajo 
                  TipoContratacion 
                  TiempoPuesto 
                  ExperienciaLaboral 
                  RotacionTurnos 
                  CentroTrabajo
                  fk_administrador 
                  fk_correos 
                      }
                    }
                  `
              }
              }).then(datos => {    
              totalEmpleados.push(datos.data.data.getresultGlobalSurveyATS)
              // console.log("totalEMpleados" , totalEmpleados)
              this.setState({reporteImasivo:totalEmpleados})
              console.log("reporteImasivo" ,this.state.reporteImasivo )
               
              this.setState({spinner:false}) 
              })
              .catch(err => {
              });  
           }
          
            if(filtro!= undefined){
            if(filtro[0].length>0){
              this.setState({nombre1:filtro[0][0]})
              this.setState({filtro1:"ID"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre1:''})
              this.setState({filtro1:""})
              this.setState({filtro6:""})
            }
            if(filtro[1].length>0){
              this.setState({nombre2:filtro[1][0]})
              this.setState({filtro2:"NOMBRE"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre2:''})
              this.setState({filtro2:""})
              this.setState({filtro6:""})
            }
            if(filtro[2].length>0){
              this.setState({nombre3:filtro[2][0]})
              this.setState({filtro3:"SEXO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre3:''})
              this.setState({filtro3:""})
              this.setState({filtro6:""})
            }
            if(filtro[3].length>0){
              this.setState({nombre4:filtro[3][0]})
              this.setState({filtro4:"ÁREA DE TRABAJO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre4:''})
              this.setState({filtro4:""})
              this.setState({filtro6:""})
            }if(filtro[4].length>0){
              this.setState({nombre5:filtro[4][0]})
              this.setState({filtro5:"PUESTO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre5:''})
              this.setState({filtro5:""})
              this.setState({filtro6:""})
            }if(filtro[5].length>0){
              this.setState({nombre6:filtro[5][0]})
              this.setState({filtro7:"CENTRO DE TRABAJO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre6:''})
              this.setState({filtro7:""})
              this.setState({filtro6:""})
            }if(filtro[6].length>0){
              this.setState({nombre7:filtro[6][0]})
              this.setState({filtro8:"PERIODO"})
              this.setState({filtro6:""})
            }else{
              this.setState({nombre7:''})
              this.setState({filtro8:""})
              this.setState({filtro6:""})
            }
          }else{
            this.setState({filtro6:"SIN FILTRO"})
          }
          
         this.setState({datosLength:datos.length})
        // console.log("datos enviados",datos[0].data[6])
          }     

        click(id){  
          this.setState({botonDescargaMasivo:''})
          this.setState({botonDescargar:''})        
          const periodo  = localStorage.getItem("periodo")        
          // const url = 'http://localhost:8000/graphql'
          axios({
            url:  API,
            method:'post',
            data:{
            query:`
              query{
              resultSingleSurvey(data:"${[id,periodo]}"){
                id 
                Respuestas 
                fk_preguntasATS 
                fk_Empleados 
                nombre 
                ApellidoP 
                ApellidoM 
                Curp 
                RFC 
                FechaNacimiento 
                Sexo 
                EstadoCivil 
                correo 
                AreaTrabajo 
                Puesto 
                TipoPuesto 
                NivelEstudios 
                TipoPersonal 
                JornadaTrabajo 
                TipoContratacion 
                TiempoPuesto 
                ExperienciaLaboral 
                RotacionTurnos 
                fk_administrador 
                fk_correos 
                    }
                  }
                `
            }
                }).then(datos => {   
                if(datos.data.data.resultSingleSurvey.length > 0 ){
                this.setState({resultados:'' })  
                this.setState({resultados :datos.data.data.resultSingleSurvey })                
              } if(datos.data.data.resultSingleSurvey.length <= 0){
                DialogUtility.alert({
                  animationSettings: { effect: 'Zoom' },           
                  title: "Su colaborador aun no responde la evaluación",
                  // title: 'Aviso!',
                  position: "fixed"
                  });
              }
              })
                .catch(err => {
                  console.log("el error es  ",err.response)
                });  
              }



  render() {  
    let spinner;
    let nombre;
    let arrayNombre= []
   
    if(this.state.spinner== true){
      spinner = <div className="spinner-border text-info" role="status"><strong className="sr-only">Espere un momento por favor ...</strong>
        </div>
    }

    let accionSi = 0;
    let accionNo =0;
    this.state.peticion1.map(rows=>{
      if(rows[1]){
        if (rows[1].Respuestas == 'si'){
           accionSi = accionSi + 1
        }
        // console.log("accionSi" , accionSi)
        if (rows[1].Respuestas == 'no'){
           accionNo = accionNo +1
        }
      }
    })   
    // console.log("accionNo" , accionNo)
    const columns = ["ID","Nombre", "Sexo",  "Area", "Puesto","Centro de Trabajo","Periodo",{name: "Respuestas",label: "Respuestas",options:{filter: false,sort: true,}}];
    const data = this.state.empleados.map(rows=>{
        let boton =  <div><MDBBtn  disabled={!this.state.botonDescargarIndividual} color ="danger" onClick={(e) => this.click(rows.id)}>Respuestas</MDBBtn></div> 
      return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.Sexo,rows.AreaTrabajo,rows.Puesto,rows.CentroTrabajo,rows.periodo,boton])
    })

    let datosEmpleados;
    let filtro;
    const options = {
        filterType: "dropdown",
        responsive: "stacked",
        sort:true,
        textLabels: {
                   body: {
                     noMatch: "Lo Siento ,No se han encontrado Resultados :(",
                     toolTip: "Sort",
                     columnHeaderTooltip: column => `Sort for ${column.label}`
                   },
                   pagination: {
                     next: "Siguiente Página",
                     previous: "Anterior Página",
                     rowsPerPage: "Filas por Página:",
                     displayRows: "de",
                   },
                   toolbar: {
                     search: "Buscar",
                     downloadCsv: "Descargar CSV",
                     print: "Imprimir",
                     viewColumns: "Ver Columnas",
                     filterTable: "Filtrar Tabla",
                   },
                   filter: {
                     all: "Todos",
                     title: "Filtros",
                     reset: "Deshacer",
                   },
                   viewColumns: {
                     title: "Mostrar Columnas",
                     titleAria: "Show/Hide Table Columns",
                   },
                   selectedRows: {
                     text: "Filas Selecionadas",
                     delete: "Borrar",
                     deleteAria: "Eliminar Filas Seleccionadas",
                   },
                 },
      
        onTableChange: (action, tableState) => {
        datosEmpleados=tableState.displayData
        },
        onFilterChange: (action, filtroTable) => {
          filtro=filtroTable
          }     };

///////////////////////////////////////////////////////////////////////////////////////////////
            const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
            const container = { width: 500, height: 400,marginLeft: "17%"}
            const container2 = { width: 500, height: 300 }
            let pdfView1;
            let ATS;
            let ATSReporte;

            let a  = 1

            if(this.state.resultados.length!=0){
            if(this.state.resultados[1].Respuestas=="si"){
                ATSReporte= <font size="1"
                face="arial"
                color="red" >LA EVALUACIÓN REVELÓ QUE EL PERSONAL  REQUIERE CANALIZACIÓN CON UN PROFESIONAL</font>
                ATS = <Alert className ="mt-4" color ="danger ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL  REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
            }if(this.state.resultados[1].Respuestas=="no"){
                ATSReporte= <font size="1"
                face="arial"
                color="blue" >LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</font>
                ATS = <Alert className ="mt-4" color ="primary ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
                }
            }

            if(this.state.resultados.length>0){ 
            pdfView1 = <MDBContainer > <Alert className ="mt-4" color ="primary ">Resultados individuales de la Aplicación de la evaluación ATS </Alert>

            
                <React.Fragment>
                <section className="flex-column"  >

                <MDBTable small borderless className="mt-4 text-center">
                    <MDBTableBody>
                        
                    <tr>
                        <td width ="35%">  <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                                 Resultados de {this.state.resultados[0].nombre } {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM} 
                            </MDBBtn></td>
                        <td width ="55%">
                        <MDBBtn color="danger" onClick={ (e)=> window.location.reload()}>Cerrar</MDBBtn>
                        </td>
                    </tr>

                    </MDBTableBody>        
                    </MDBTable>
                <MDBTable small borderless className="mt-4 mb-4 text-center">
                    <MDBTableBody>
                        
                    <tr>
                        <td width ="35%"> <img src={localStorage.getItem("urlLogo")} alt="logo" style = {{width:100,marginBottom:20}}/></td>
                        <td width ="65%">
                        <img src={diagnostico} alt="logo" style = {{width:100,marginBottom:10}}/>

                        </td>
                    </tr>

                    </MDBTableBody>        
                    </MDBTable>
                
                        <MDBContainer style  = {{marginLeft: "3%"}}>
            
                        <MDBTable component={Paper}  small borderless className="text-left mt-4 ">
            
                        <MDBTableBody> 
                        <font face="arial" className = "mt-4" >CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE FUERON SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</font><br/>
                        <br/><strong>{localStorage.getItem("razonsocial")}</strong><br/>
                 
                        <tr>
                        <td width="55%" >Nombre : {this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM} </td>
                        <td >Puesto : {this.state.resultados[0].Puesto}</td>
                        </tr>
                        <tr>
                        <td width="55%" >Departamento : {this.state.resultados[0].AreaTrabajo}</td>
                        <td  >Genero : {this.state.resultados[0].Sexo}</td> 
                                        </tr>
                                        <tr>
                        <td width="55%" >Correo : {this.state.resultados[0].correo}</td>
                        <td  >RFC : {this.state.resultados[0].RFC}</td>   
                        
                        </tr>
                        </MDBTableBody>
                        </MDBTable>
                        </MDBContainer>
                        
                        <MDBContainer>
                        <MDBTable small borderless className="text-left">
                        <MDBTableHead>
                            <tr>
                            <th width="1%"></th>
                            <th width="80%">I.- Acontecimiento traumático severo</th>    
                            <td width="19%"></td>   
                                                
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                            <td width="1%">1</td>
                            <td width="80%">¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los
                                siguientes:<br/> Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión
                                grave? Asaltos? <br/>Actos violentos que derivaron en lesiones graves? <br/>Secuestro? Amenazas?, o Cualquier otro
                                que ponga en riesgo su vida o salud, y/o la de otras personas?</td>
                            <td width="19%">{this.state.resultados[1].Respuestas}</td>
                            
                            </tr>
                            <br/>
                        </MDBTableBody>
                    
                        <MDBTableHead>
                            <tr>
                            <th width="1%"></th>
                            <th>II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes):</th>       
                            <td></td> 
                            </tr>
                            <br/>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                            <td>2</td>
                            <td>¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</td>   
                            <td >{this.state.resultados[2].Respuestas}</td> 
                            </tr>
                        
                            <tr>
                            <td>3</td>
                            <td>¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?</td>   
                            <td >{this.state.resultados[3].Respuestas}</td> 
                            </tr>
                            <br/>
                        </MDBTableBody>

                        <MDBTableHead>
                            <tr>
                            <th></th>
                            <th>III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento (durante el último mes):</th>       
                            <td></td> 
                            </tr>
                            <br/>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                            <td>4</td>
                            <td>¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?</td>   
                            <td>{this.state.resultados[4].Respuestas}</td> 
                            </tr>
                        
                            <tr>
                            <td>5</td>
                            <td>¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?</td>   
                            <td >{this.state.resultados[5].Respuestas}</td> 
                            </tr>
                        
                            <tr>
                            <td>6</td>
                            <td>¿Ha tenido dificultad para recordar alguna parte importante del evento?</td>   
                            <td >{this.state.resultados[6].Respuestas}</td> 
                            </tr>
                            
                            <tr>
                            <td>7</td>
                            <td>¿Ha disminuido su interés en sus actividades cotidianas?</td>   
                            <td >{this.state.resultados[7].Respuestas}</td> 
                            </tr>
                        
                            <tr>
                            <td>8</td>
                            <td>¿Se ha sentido usted alejado o distante de los demás?</td>   
                            <td >{this.state.resultados[8].Respuestas}</td> 
                            </tr>
                        
                            <tr>
                            <td>9</td>
                            <td>¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?</td>   
                            <td >{this.state.resultados[9].Respuestas}</td> 
                            </tr>
                            <br/>
                        
                        </MDBTableBody>

                        <MDBTableHead>
                            <tr>
                            <th></th>
                            <th>IV.- Afectación (durante el último mes):</th>       
                            <td></td> 
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                            <td>10</td>
                            <td>¿Ha tenido usted dificultades para dormir?</td>   
                            <td >{this.state.resultados[10].Respuestas}</td> 
                            </tr>
                            <tr>
                            <td>11</td>
                            <td>¿Ha estado particularmente irritable o le han dado arranques de coraje?</td>   
                            <td >{this.state.resultados[11].Respuestas}</td> 
                            </tr>
                            <tr>
                            <td>12</td>
                            <td>¿Ha tenido dificultad para concentrarse?</td>   
                            <td >{this.state.resultados[12].Respuestas}</td> 
                            </tr>
                            <tr>
                            <td>13</td>
                            <td>¿Ha estado nervioso o constantemente en alerta?</td>   
                            <td >{this.state.resultados[13].Respuestas}</td> 
                            </tr>
                            <tr>
                            <td>14</td>
                            <td>¿Se ha sobresaltado fácilmente por cualquier cosa?</td>   
                            <td >{this.state.resultados[14].Respuestas}</td> 
                            </tr>
                        </MDBTableBody>
                        </MDBTable> 
                        {ATS}
                        </MDBContainer>
                    <div>
                        <div className="example-config">    
                        </div>
                        <div style={{ position: "absolute", left: "-1000px", top: 0 }}>
                            <PDFExport
                                paperSize="letter"
                                margin="1cm"
                                pageTemplate={PageTemplate}
                                forcePageBreak=".page-break"

                                fileName={`${this.state.resultados[0].nombre} ${this.state.resultados[0].ApellidoP} ${this.state.resultados[0].ApellidoM} Reporte ATS ${new Date().getFullYear()}`}
                                ref={(component) => this.pdfExportComponent = component}
                            >
                                <div style={{ width: "500px" }}>
                                    <MDBRow> 
                                    <MDBCol>
                                    <img src={logotipo} alt="logo" style = {{width:150,marginBottom:20}}/>
                                    </MDBCol>  
                                    <MDBCol>
                                    {/* <img src={localStorage.getItem("urlLogo")}  style = {{width:100,marginBottom:30}}/> */}
                                    </MDBCol>
                                    </MDBRow> 
                                    <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                                    <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left mt-4 ">
                                    
                                    <MDBTableBody>     
                                    <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                                    <font size="1"face="arial"color="black">{this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM}</font><br></br><br/>
                                    <font size="3"face="arial"color="black">Diagnóstico de acontecimientos traumáticos severos</font><br></br>
                                    <font size="1"face="arial"color="black">{this.state.date}</font>                     
                                    </MDBTableBody>
                                    </MDBTable>

                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
        
                                    <font size="1"
                                  face="arial"
                                  color="black" style = {{marginTop:25,marginLeft:35}}>GUÍA DE REFERENCIA I - 
                                  CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE</font>   <br/>  
                                  <font size="1"  face="arial"
                                  color="black" style = {{marginLeft:35}}>FUERON
                                  SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</font>
                                    
                                        
                                        <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
                                            <MDBTableBody>
                                            <tr>
                                            <td width="25%"><font size="1" face="arial"color="black"><strong>{this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM}</strong></font></td>
                                            <td width="25%"><font size="1" face="arial"color="black">RESULTADO DE LA EVALUACIÓN : </font></td>
                                        <td width="50%"> <font size="1" face="arial"color="black" > {ATSReporte}</font></td>
                                        </tr>
                                        <tr></tr>
                                        </MDBTableBody>
                                        
                                            </MDBTable>  
                                        
                                        <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left  ">
                                            <MDBTableBody>
                                            <tr></tr>
                                            <td ></td>
                                            <td></td>
                                    
                                        
                                        </MDBTableBody>
                                        
                                            </MDBTable>  

                                        <MDBTable  component={Paper}  small  className="text-left ">
                                            <MDBTableBody>
                                            <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">I.- Acontecimiento traumático severo </font>
                                            </MDBTableBody>                                                                            
                                            </MDBTable>
                                            <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left"> 
                                            <MDBTableBody>
                                                
                                                <tr>
                                            
                                                <td >
                                                <font size="1" face="arial"color="black" >¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los
                                                    siguientes:<br></br> Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión
                                                    grave? Asaltos? Actos violentos que derivaron en lesiones graves? Secuestro? Amenazas?, o Cualquier otro
                                                    que ponga en riesgo su vida o salud, y/o la de otras personas?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[1].Respuestas}</font></td>
                                                
                                                </tr>
                    
                                            </MDBTableBody>
                                            </MDBTable>
                                            <MDBTable  component={Paper}  small  className="text-left ">
                                            <MDBTableBody>
                                            <font color="red" style= {{marginTop:40,marginLeft:20}}   size="1">II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes)</font>
                                            </MDBTableBody>
                                            </MDBTable>
                                            <MDBTable style={{marginLeft:20}}  component={Paper}  small bordered className="text-left mt-4 ">
                                            <MDBTableBody>
                                            <tr>            
                                                <td >
                                            <font size="1" face="arial"color="black">¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[2].Respuestas}</font></td>
                                            </tr>
                                            <tr>
                                                <td >
                                            <font size="1" face="arial"color="black">¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[3].Respuestas}</font></td>
                                                
                                            </tr>
                                            
                                            </MDBTableBody>
                                            </MDBTable>
                                            <MDBTable  component={Paper}  small  className="text-left  ">
                                            <MDBTableBody>
                                
                                            <font style= {{marginLeft:20}}  size="1" color="red" >III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento</font>
                                        </MDBTableBody>
                                        </MDBTable>
                                            <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                                            <MDBTableBody>
                                                <tr>
                                                
                                                <td >
                                                <font size="1" face="arial"color="black">¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[4].Respuestas}</font></td></tr>
                                                
                                                <tr>
                                                
                                                <td >
                                                <font size="1" face="arial"color="black">¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[5].Respuestas}</font></td>
                                                </tr>

                                                <tr>
                                                
                                                <td >
                                                <font size="1" face="arial"color="black">¿Ha tenido dificultad para recordar alguna parte importante del evento?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[6].Respuestas}</font></td>
                                                </tr>

                                                <tr>
                                                
                                                <td >
                                                <font size="1" face="arial"color="black">¿Ha disminuido su interés en sus actividades cotidianas?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[7].Respuestas}</font></td>
                                                </tr>

                                                <tr>
                                                
                                                <td >
                                                <font size="1" face="arial"color="black">  ¿Se ha sentido usted alejado o distante de los demás?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[8].Respuestas}</font></td>
                                                </tr>

                                                <tr>
                                                
                                                <td >
                                                <font size="1" face="arial"color="black"> ¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[9].Respuestas}</font></td>

                                                </tr>
                                            
                                            </MDBTableBody>
                                            </MDBTable>
                                             <br/>
                                            <MDBTable  component={Paper}  small  className="text-left mt-4 ">
                                            <MDBTableBody>
                                            <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >IV.- Afectación (durante el último mes)</font>
                                            </MDBTableBody>
                                            </MDBTable>
                                            <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                                            <MDBTableBody>
                                                <tr>
                                                
                                                <td >
                                                <font size="1" face="arial"color="black">¿Ha tenido usted dificultades para dormir?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[10].Respuestas}</font></td></tr>
                                                
                                                <tr>
                                                
                                                <td >
                                                <font size="1" face="arial"color="black">¿Ha estado particularmente irritable o le han dado arranques de coraje?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[11].Respuestas}</font></td>
                                                </tr>

                                                <tr>
                                                
                                                <td >
                                                <font size="1" face="arial"color="black">¿Ha tenido dificultad para concentrarse?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[12].Respuestas}</font></td>
                                                </tr>

                                                <tr>
                                                
                                                <td >
                                                <font size="1" face="arial"color="black">¿Ha estado nervioso o constantemente en alerta?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[13].Respuestas}</font></td>
                                                </tr>

                                                <tr>
                                                
                                                <td >
                                                <font size="1" face="arial"color="black">¿Se ha sobresaltado fácilmente por cualquier cosa?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{this.state.resultados[14].Respuestas}</font></td>
                                                </tr>
                                            
                                                
                                            </MDBTableBody>
                                            </MDBTable>
                                        </div>
                                    </PDFExport>
                                </div>
                            </div>
                          </section>
                      </React.Fragment>
                  
                  </MDBContainer>
            }
////////////////////////////////////////////////////////////////////////////////////////////////

    let array = [];

    return (
      <React.Fragment>
      <div>
          <header>
          <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
            <Sidebar/>
              <MDBNavbarBrand a href="./inicio">
              <AppNavbarBrand
                  full={{ src: diagnostico, width: 100, height: 33, alt: 'Diagnostico' }} />               
              </MDBNavbarBrand>
              <MDBNavbarBrand>
                Resultados globales de la evaluación ATS
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
              &nbsp;&nbsp;&nbsp;          
                <strong>{localStorage.getItem("razonsocial")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {this.state.date}</strong> 
                <MDBNavbarNav right>
                <MDBNavbarBrand>
               <AppNavbarBrand full={{ src: usuario, width: 30, height: 25, alt: 'ADS' }} />               
              {this.state.nombre}
              </MDBNavbarBrand>
              <MDBNavbarBrand>
              <MDBNavItem> 
              <MDBDropdown> 
                <MDBDropdownToggle nav caret>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem onClick={this.handleclick}>Mi Perfil</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Configuración</MDBDropdownItem>
                  <MDBDropdownItem onClick={this.ads}>Más sobre ADS</MDBDropdownItem>
                  <MDBDropdownItem onClick={this.handleLogOut}>Cerrar Sesión</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              </MDBNavItem>
              </MDBNavbarBrand>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
          <MDBContainer className="pt-5">
         
                  <Modal className="modal-main" isOpen={this.state.showModal2} contentLabel="Minimal Modal Example">
                    <div className="row">
                        <div className="col-md-12" item xs={12}>
                            <center><br/>
                                <br/>
                                <br/>
                                <font size="4">
                                El Distribuidor Asociado Master de CONTPAQi® que ha recibido el reconocimiento como el
                                <br/>
                                 Primer Lugar en Ventas por 15 Años Consecutivos en la Ciudad de México.
                                
                                <br/>
                                <br/>
                                Alfa Diseño de Sistemas: 
                               
                                Somos un distribuidor asociado master de CONTPAQi®, 
                                <br/>
                                 una casa desarrolladora de software, que además es PAC (Proveedor Autorizado de Certificación) y PCRDD 
                                <br/>
                                (Proveedor de Certificación y Recepción de Documentos Digitales) por parte del SAT.
                                {/* <img src={Ok} alt="ok" className="img-fluid"/><br/><br/> */}
                                <br/>
                                <br/>
                                Conoce más sobre nosotros en 
                                <br></br>
                                  <a href="www.ads.com.mx">www.ads.com.mx</a>
                                </font>

                                <br/>
                                <br/>
                                <br/>
                                {/* <Alert color="secondary" style={{fontSize: 24}}>Su encuesta ha finalizado, Gracias por su colaboración</Alert> */}
                                <br/>
                                <br/>
                                <Grid item style={{ marginTop: 16 }} spacing={2} item xs={12}>
                                <Button 
                                  variant="outlined"
                                    color="primary"
                                    type = "submit"
                                     onClick={()=>{this.setState({showModal2:false})}}
                                  >
                                   Cerrar
                                  </Button>
                                  </Grid>
                            </center>
                            </div>
                        </div>
                    </Modal>
                </MDBContainer> 

              <div
              
              style={{
                marginLeft: "5%",
                position: "absolute"
              }}
              >
                <div style={{ height: "110%"}}>
                <Grow in={true}>
                  <div style={{ margin: "30px 56px" }}>
              <MUIDataTable
                title={`Empledos  totales de ${localStorage.getItem("razonsocial")}`}
                data={data}
                columns={columns}
                options={options}
              />
              <MDBRow style={{marginTop:20}}>
        
              <MDBCol ><MDBBtn  disabled={!this.state.botonDescargar}  onClick={e=>this.consultarDatosFiltrados(datosEmpleados,filtro)}  outline color="success">Resultados Globales</MDBBtn> &nbsp;&nbsp;&nbsp;&nbsp;<MDBBtn  disabled={!this.state.botonDescargaMasivo}  onClick={e=>this.reporteImasivo(datosEmpleados,filtro)}  outline color="success">Respuestas totales</MDBBtn> </MDBCol>  
              <MDBCol>
              <MDBContainer >
                {spinner}

                { this.state.peticion1.map((rows,i) =>{  
                a=1          
                let respuesta;
                if(rows[1]){
                return (
                     <div>
                      <div className="example-config">
                      </div>
                      <div style={{ position: "absolute", left: "-1500px", top: 0 }}>
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
                                <div style={{ width: "500px" }}>
                                <MDBRow> 
                                <MDBCol>
                                <img src={logotipo} alt="logo" style = {{width:150,marginBottom:20}}/>
                                </MDBCol>  
                                <MDBCol>
                                {/* <img src={logotipo} alt="logo" style = {{width:100,marginBottom:30}}/> */}
                                </MDBCol>
                                </MDBRow> 
                                <img src={logo} alt="logo" style = {{width:550,marginBottom:20}}/>
                                <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left">
                              
                                        <MDBTableBody>     
                                <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                                <font size="3"face="arial"color="black">Reporte Global de Acontecimientos Traumáticos Severos  </font><br></br>
                                <font size="1"face="arial"color="black">{this.state.date}</font><br/>
                                <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                                <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font>
                                <br/><font size="1"face="arial"color="black">Total de empleados con atención requerida : <strong>{accionSi}</strong></font>
                                <br/><font size="1"face="arial"color="black">Total de empleados sin atención requerida : <strong>{accionNo}</strong></font>
                                </MDBTableBody>
                                </MDBTable>
                              <br/>
                              <br/>
                              <br/>
                              <br/>  
                              <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-center">
                              <MDBTableBody>
                              <font size="1"
                              face="arial"
                              color="black" 
                              style = {{marginTop:25,marginLeft:20}}>GUÍA DE REFERENCIA I -
                              CUESTIONARIO PARA IDENTIFICAR LOS ACONTECIMIENTOS TRAUMÁTICOS SEVEROS EN LOS CENTROS DE TRABAJO</font>   <br/>  
                                </MDBTableBody>
                                </MDBTable>
                                <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
                                    <MDBTableBody>
                                    <tr>
                                        <td width="25%"><font size="1" face="arial"color="black"><strong>{localStorage.getItem("razonsocial")}</strong></font></td>
                                        <td width="15%"><font size="1" face="arial"color="black"><strong>{this.state.nombre3}</strong></font></td>
                                      <td width="15%"><font size="1" face="arial"color="black"><strong>{this.state.nombre4}</strong></font></td>
                                      <td width="15%"><font size="1" face="arial"color="black"><strong>{this.state.nombre5}</strong></font></td>
                                      <td width="15%"><font size="1" face="arial"color="black"><strong>{this.state.nombre6}</strong></font></td>
                                      <td width="15%"><font size="1" face="arial"color="black"><strong>{this.state.nombre7}</strong></font></td>
                                   </tr>
                                   </MDBTableBody>
                                   </MDBTable>
                                   <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left ">
                                    <MDBTableBody>
                                    <tr>
                                        <td width="25%"><font size="1" face="arial"color="black"></font></td>
                                   </tr>
                                   </MDBTableBody>
                                   </MDBTable>
                                   <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left ">
                                    <MDBTableBody>
                                   <tr>
                                   <td width="40%" style={{backgroundColor: "#D8D8D8"}}><font size="1" face="arial"color="black">TOTAL DE EVALUACIONES : <strong>{this.state.datosLength}</strong></font></td>
                                   <td width="30%" style={{backgroundColor: "#FF0000 "}} ><font size="1" face="arial"color="black">ACCIÓN REQUERIDA : {accionSi}</font></td>
                                   <td width="30%" style={{backgroundColor: "#9BE0F7"}}><font size="1" face="arial"color="black" >ACCIÓN NO REQUERIDA : {accionNo}</font></td>
                                   </tr>                                  
                                   </MDBTableBody>
                                    </MDBTable>  
                                <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                  <MDBTableBody>                                    
                                    <tr >   
                                    <td width="5%"><font size="1" face="arial"color="black" ><strong>#</strong></font></td>                           
                                    <td width="19%" ><font size="1" face="arial"color="black"><strong>Apellido Paterno</strong></font></td>
                                    <td width="19%"><font size="1" face="arial"color="black"><strong>Apellido Materno</strong></font></td>
                                    <td width="18%"><font size="1" face="arial"color="black" ><strong>Nombre</strong></font></td>
                                    <td width="27%"><font size="1" face="arial"color="black"><strong>Centro de Trabajo</strong></font></td>                                                                     

                                    <td width="12%"><font size="1" face="arial"color="black"><strong>Accion Requerida</strong></font></td>                                                                     

                                  </tr>
                                  { this.state.peticion1.sort().map((rows,i) => {
                                    console.log("rows",rows)
                                    if(rows[1]){
                              
                                      if(rows[1].Respuestas =='si'){
                                      respuesta =  <TableCell  width="12%" style={{backgroundColor: "#FF0000"}} align="center" component="th" scope="row" ><font size="1" face="arial"color="black">SI</font></TableCell>
                                      }if(rows[1].Respuestas =='no'){
                                        respuesta =  <TableCell  width="12%" style={{backgroundColor: "#9BE0F7 "}} align="center" component="th" scope="row" ><font size="1" face="arial"color="black">NO</font></TableCell>
                                      }
                                  
                                      return (
                                        <TableRow >
                                      <td width="5%"  className="text-center"><font size="1" face="arial"color="black" >{i + 1} </font></td>
                                      <td width="19%" className="text-left"><font size="1" face="arial"color="black">{rows[1].ApellidoP  }</font></td>
                                      <td width="19%"  className="text-left"><font size="1" face="arial"color="black">{rows[1].ApellidoM}</font></td>
                                      <td width="18%"  className="text-left"><font size="1" face="arial"color="black" >{rows[1].nombre} </font></td>
                                      <td width="27%"  className="text-left"><font size="1" face="arial"color="black" >{rows[1].CentroTrabajo} </font></td>

                                      {respuesta}
                                        </TableRow>                                
                                      );
                                    }
                                
                                  })
                                  }
                                </MDBTableBody>
                              </MDBTable>
                              </div>

                              </PDFExport>
                          </div>
                        </div>
                               
                        )       
                      }

                        return(
                        <MDBContainer>
                        <MDBRow>     
                        <MDBCol>   
                        <MDBBtn  color="primary" size="3"  outline className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                            Descargar Resultados
                        </MDBBtn>
                        </MDBCol>
                        <MDBCol> 
                        <MDBBtn color="danger" onClick= {(e) => window.location.reload()}>Cerrar</MDBBtn>
                        </MDBCol> 
                        </MDBRow>  
                        </MDBContainer>
                      )
                    } )
                    
                  }
                  { this.state.reporteImasivo.map((rows) =>{ 
                    a=1       
                  let respuesta;
                  if(rows[0]){
             
                  return (
                     <div>
                      <div style={{ position: "absolute", left: "-1500px", top: 0 }}>
                          <PDFExport
                              pageTemplate={PageTemplate}
                              forcePageBreak=".page-break"
                              paperSize="letter"
                              margin="1cm"
                              pageNum
                              fileName={`Reporte individual del total de empleados ATS ${new Date().getFullYear()}`}
                              // pageTemplate={this.pdfExportComponent}
                              ref={(component) => this.pdfExportComponent = component}
                                 >
                                <MDBRow> 
                                  <MDBCol>
                                  <img src={logotipo} alt="logo" style = {{width:150,marginBottom:20}}/>
                                  </MDBCol>  
                                  <MDBCol>
                                  {/* <img src={localStorage.getItem("urlLogo")}  style = {{width:100,marginBottom:30}}/> */}
                                  </MDBCol>
                                  </MDBRow> 
                                  <img src={logo} alt="logo" style = {{width:550}}/>
                                  <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left mt-4 ">
                                    
                                   <MDBTableBody>     
                                  <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                                  <font size="3"face="arial"color="black">Diagnóstico de acontecimientos traumáticos severos</font><br></br>
                                  <font size="1"face="arial"color="black">{this.state.date}</font>  <br/> 
                                  <font size="1"face="arial"color="black">Filtrado por : <strong>{this.state.filtro6}&nbsp;{this.state.filtro1}&nbsp;&nbsp;{this.state.filtro2}&nbsp;&nbsp; {this.state.filtro3}&nbsp;&nbsp;{this.state.filtro4}&nbsp;&nbsp; {this.state.filtro5}&nbsp;&nbsp;{this.state.filtro7}&nbsp;&nbsp;{this.state.filtro8}</strong></font>
                                  <br/><font size="1"face="arial"color="black">Total de Evaluaciones consideradas : <strong>{this.state.datosLength}</strong></font>
                 
                                  </MDBTableBody>
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
                                  <font size="1"
                                  face="arial"
                                  color="black" style = {{marginTop:25,marginLeft:35}}>GUÍA DE REFERENCIA I - 
                                  CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE</font>   <br/>  
                                  <font size="1"  face="arial"
                                  color="black" style = {{marginLeft:35}}>FUERON
                                  SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</font>
                                  {this.state.reporteImasivo.map(rows=>{
                                     let ATSReporteMasivo;
                                    if(rows[0]){
                                      if(rows[1].Respuestas=="si"){
                                        ATSReporteMasivo= <font size="1"
                                        face="arial"
                                        color="red" >LA EVALUACIÓN REVELÓ QUE EL PERSONAL  REQUIERE CANALIZACIÓN CON UN PROFESIONAL</font>
                                        ATS = <Alert className ="mt-4" color ="danger ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL  REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
                                        }if(rows[1].Respuestas=="no"){
                                          ATSReporteMasivo= <font size="1"
                                          face="arial"
                                          color="blue" >LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</font>
                                          ATS = <Alert className ="mt-4" color ="primary ">LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert>
                                        }
                                    }
                                    if(rows[0]){
                                    return(
                                    <div style={{ width: "500px" }}>  
                                       <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
                                          <MDBTableBody>
                                          <tr>
                                            <td width="25%"><font size="1" face="arial"color="black"><strong>{rows[0].nombre} {rows[0].ApellidoP} {rows[0].ApellidoM}</strong></font></td>
                                          <td width="25%"><font size="1" face="arial"color="black">RESULTADO DE LA EVALUACIÓN : </font></td>
                                         <td width="50%"> <font size="1" face="arial"color="black" > {ATSReporteMasivo}</font></td>
                                         </tr>
                                         <tr></tr>
                                         </MDBTableBody>
                                        </MDBTable>  
                          
                                      <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left  ">
                                          <MDBTableBody>
                                          <tr></tr>
                                          <td ></td>
                                          <td></td>
                                         </MDBTableBody>                                       
                                          </MDBTable>       
                                         <MDBTable  component={Paper}  small  className="text-left ">
                                           <MDBTableBody>
                                          <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">I.- Acontecimiento traumático severo </font>
                                          </MDBTableBody>                                                                            
                                          </MDBTable>
                                          <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left"> 
                                            <MDBTableBody>                
                                               <tr>           
                                                <td >
                                               <font size="1" face="arial"color="black" >¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los
                                                    siguientes:<br></br> Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión
                                                    grave? Asaltos? Actos violentos que derivaron en lesiones graves? Secuestro? Amenazas?, o Cualquier otro
                                                    que ponga en riesgo su vida o salud, y/o la de otras personas?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[1].Respuestas}</font></td>              
                                              </tr>
                     
                                            </MDBTableBody>
                                            </MDBTable>
                                            <MDBTable  component={Paper}  small  className="text-left ">
                                           <MDBTableBody>
                                            <font color="red" style= {{marginTop:40,marginLeft:20}}   size="1">II.- Recuerdos persistentes sobre el acontecimiento (durante el último mes)</font>
                                            </MDBTableBody>
                                            </MDBTable>
                                            <MDBTable style={{marginLeft:20}}  component={Paper}  small bordered className="text-left mt-4 ">
                                            <MDBTableBody>
                                            <tr>            
                                              <td >
                                            <font size="1" face="arial"color="black">¿Ha tenido recuerdos recurrentes sobre el acontecimiento que le provocan malestares?</font></td>
                                              <td width="60px"><font size="1" face="arial"color="black">{rows[2].Respuestas}</font></td>
                                             </tr>
                                             <tr>
                                              <td >
                                            <font size="1" face="arial"color="black">¿Ha tenido sueños de carácter recurrente sobre el acontecimiento, que le producen malestar?</font></td>
                                              <td width="60px"><font size="1" face="arial"color="black">{rows[3].Respuestas}</font></td>
                                               
                                            </tr>
                                           
                                          </MDBTableBody>
                                          </MDBTable>
                                          <MDBTable  component={Paper}  small  className="text-left  ">
                                           <MDBTableBody>
                              
                                            <font style= {{marginLeft:20}}  size="1" color="red" >III.- Esfuerzo por evitar circunstancias parecidas o asociadas al acontecimiento</font>
                                         </MDBTableBody>
                                         </MDBTable>
                                          <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                                            <MDBTableBody>
                                              <tr>
                                               
                                                <td >
                                              <font size="1" face="arial"color="black">¿Se ha esforzado por evitar todo tipo de sentimientos, conversaciones o situaciones que le puedan recordar el acontecimiento?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[4].Respuestas}</font></td></tr>
                                               
                                               <tr>
                                                
                                                <td >
                                              <font size="1" face="arial"color="black">¿Se ha esforzado por evitar todo tipo de actividades, lugares o personas que motivan recuerdos del acontecimiento?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[5].Respuestas}</font></td>
                                               </tr>
      
                                               <tr>
                                                
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha tenido dificultad para recordar alguna parte importante del evento?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[6].Respuestas}</font></td>
                                                </tr>
      
                                                <tr>
                                                
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha disminuido su interés en sus actividades cotidianas?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[7].Respuestas}</font></td>
                                               </tr>
      
                                               <tr>
                                               
                                                <td >
                                              <font size="1" face="arial"color="black">  ¿Se ha sentido usted alejado o distante de los demás?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[8].Respuestas}</font></td>
                                               </tr>
      
                                               <tr>
                                                
                                                <td >
                                              <font size="1" face="arial"color="black"> ¿Ha tenido la impresión de que su vida se va a acortar, que va a morir antes que otras personas o que tiene un futuro limitado?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[9].Respuestas}</font></td>
      
                                              </tr>
                                          
                                            </MDBTableBody>
                                            </MDBTable>
                                            <br/> 
                                            <br/> 
                                            <br/> 
                                            <br/> 
                                            <MDBTable  component={Paper}  small  className="text-left mt-4 ">
                                           <MDBTableBody>
                                            <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1" >IV.- Afectación (durante el último mes)</font>
                                           </MDBTableBody>
                                           </MDBTable>
                                            <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-left mt-4 ">
                                            <MDBTableBody>
                                              <tr>
                                               
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha tenido usted dificultades para dormir?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[10].Respuestas}</font></td></tr>
                                               
                                               <tr>
                                                
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha estado particularmente irritable o le han dado arranques de coraje?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[11].Respuestas}</font></td>
                                               </tr>
      
                                               <tr>
                                                
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha tenido dificultad para concentrarse?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[12].Respuestas}</font></td>
                                                </tr>
      
                                                <tr>
                                               
                                                <td >
                                              <font size="1" face="arial"color="black">¿Ha estado nervioso o constantemente en alerta?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[13].Respuestas}</font></td>
                                               </tr>
      
                                               <tr>
                                                
                                                <td >
                                              <font size="1" face="arial"color="black">¿Se ha sobresaltado fácilmente por cualquier cosa?</font></td>
                                                <td width="60px"><font size="1" face="arial"color="black">{rows[14].Respuestas}</font></td>
                                               </tr> 
                                            </MDBTableBody>
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
                                          </div>
                                            )
                                          }
                                        })}            

                              </PDFExport>
                          </div>
                        </div>       
                        )       
                       }
                        return(
                        <MDBContainer>
                        <MDBRow>     
                        <MDBCol>   
                        <MDBBtn  color="primary" size="3" outline className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                            Descargar Resultados
                        </MDBBtn>
                        </MDBCol>
                        <MDBCol> 
                        <MDBBtn color="danger" outline onClick= {(e) => window.location.reload()}>Cerrar</MDBBtn>
                        </MDBCol> 
                        </MDBRow>  
                        </MDBContainer>
                      )
                      
                    } )
                    
                  }
                </MDBContainer>
                </MDBCol> 
                {pdfView1} 
                </MDBRow>
              
                </div> 
              </Grow>  
            </div>
          </div>
          </div>

      </React.Fragment>
        
      )
    }
  }

  export default App