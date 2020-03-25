import React, { Component } from 'react';
// import { render } from 'react-dom';
import '../Home/index.css';

import axios from 'axios'
//  import ADS from '../images/foto.jpeg'
import {MDBContainer,MDBBadge, MDBRow, MDBCol,MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { DialogUtility } from '@syncfusion/ej2-popups';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { PDFExport } from '@progress/kendo-react-pdf';
import logo from '../images/logo.png'
import logotipo from '../images/logotipo.png'
import diagnostico from '../images/diagnostico.png'
import {Alert} from 'reactstrap'
import { API} from '../utils/http'

class App extends Component {
  pdfExportComponent 
  // =(props)=><span><font size="1"face="arial"color="red">diagnostico.com</font><br/><font size="1"face="arial"color="gray">{props.pageNum}</font></span>;
  constructor(props) {
    super(props);
    this.state = {
      datos:[],
      resultados:[],
      resultadosEvaluacion:[],
      resultadosQuery:[],
      fecha:''
    };
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((state) => {
      state[name] = value;
      return state;
    })
  }
  componentWillMount(){  
    // const url = 'http://localhost:8000/graphql'
    var correo  = localStorage.getItem("correo")   
    const idAdmin = localStorage.getItem("idAdmin")
    axios({
      url:  API,
      method:'post',
      data:{
      query:`
       query{
        getPeriodo(data:"${[idAdmin]}"){
          idEventos
          fk_administrador
          Descripcion
              }
            }
          `
      }
    })
    .then(datos => {	
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
        query{
          getUsersTableEmployeesthisPeriodoEEO(data:"${[idAdmin,datos.data.data.getPeriodo[0].Descripcion]}"){
            id
            nombre
            ApellidoP
            ApellidoM
            Curp
            RFC
            FechaNacimiento
            Sexo
            CP
            EstadoCivil
            correo
            AreaTrabajo
            Puesto
            Ciudad
            NivelEstudios
            TipoPersonal
            JornadaTrabajo
            TipoContratacion
            TiempoPuesto
            ExperienciaLaboral
            RotacionTurnos
            fk_administrador
              }
            }
            `
        }
            }).then((datos) => {
              this.setState({ datos: datos.data.data.getUsersTableEmployeesthisPeriodoEEO});
             console.log("this.state.resultados" , this.state.resultados)
            }).catch(err=>{
              console.log("el error " , err.response)
            })     
        }).catch(err=>{
          console.log("err", err.response)
        })


        var LaFecha=new Date();
        var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var diasem=new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
        var diasemana=LaFecha.getDay();
        var FechaCompleta="";
        var NumeroDeMes="";    
        NumeroDeMes=LaFecha.getMonth();
        FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
        this.setState({fecha:FechaCompleta})
      }
        click(id){
        console.log("el id es " , id)
        const periodo  = localStorage.getItem("periodo")        

          // const url = 'http://localhost:8000/graphql'
          axios({
            url:  API,
            method:'post',
            data:{
            query:`
              query{
              resultSingleSurveyEEO(data:"${[id,periodo]}"){
                id 
                Respuestas 
                fk_preguntasEEO
                fk_Empleados
                nombre 
                ApellidoP 
                ApellidoM 
                Curp 
                RFC 
                FechaNacimiento 
                Sexo 
                CP 
                EstadoCivil 
                correo 
                AreaTrabajo 
                Puesto 
                Ciudad 
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
                
                if(datos.data.data.resultSingleSurveyEEO.length > 0 ){
                  this.setState({resultados :datos.data.data.resultSingleSurveyEEO })                
                  console.log("resultados getsingle survey" ,this.state.resultados)
                  this.setState({getPonderacion:[]})
                } if(datos.data.data.resultSingleSurveyEEO.length <= 0){
                  DialogUtility.alert({
                    animationSettings: { effect: 'Zoom' },           
                    title: "Su colaborador aun no responde la Encuesta",
                    // title: 'Aviso!',
                    position: "fixed"
                    });
                }
              })
                .catch(err => {
                  console.log("el error es  ",err)
                });  

              }          
          getEvaluacion(id){
            const periodo  = localStorage.getItem("periodo")        

            // const url = 'http://localhost:8000/graphql'
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
                query{
                resultSingleSurveyEEO(data:"${[id,periodo]}"){
                  id 
                  Respuestas 
                  fk_preguntasEEO
                  fk_Empleados
                  ponderacion
                  nombre 
                  ApellidoP 
                  ApellidoM 
                  Curp 
                  RFC 
                  FechaNacimiento 
                  Sexo 
                  CP 
                  EstadoCivil 
                  correo 
                  AreaTrabajo 
                  Puesto 
                  Ciudad 
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
                    console.log("el estado en resultadosEvaluacion" , datos.data.data.resultSingleSurveyEEO)
                    if(datos.data.data.resultSingleSurveyEEO.length > 0 ){
                      this.setState({resultadosEvaluacion:''})
                    this.setState({resultadosEvaluacion :datos.data.data.resultSingleSurveyEEO })                
                    this.setState({resultados:[]}) 
                    console.log("el estado en resultadosEvaluacion" , this.state.resultadosEvaluacion)
                  } if(datos.data.data.resultSingleSurveyEEO.length <= 0){
                    DialogUtility.alert({
                      animationSettings: { effect: 'Zoom' },           
                      title: "Su colaborador aun no responde la Encuesta",
                      // title: 'Aviso!',
                      position: "fixed"
                      });
                  }
                })
                  .catch(err => {
                    console.log("el error es  ",err)
                  });  
  
                              
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
                query{
                resultSingleSurveyEEO(data:"${[id,periodo]}"){
                  id 
                  Respuestas 
                  fk_preguntasEEO
                  fk_Empleados
                  nombre 
                  ApellidoP 
                  ApellidoM 
                  Curp 
                  RFC 
                  FechaNacimiento 
                  Sexo 
                  CP 
                  EstadoCivil 
                  correo 
                  AreaTrabajo 
                  Puesto 
                  Ciudad 
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
                    console.log("datos recibidos" ,datos.data.data.resultSingleSurveyEEO )
                    this.setState({resultadosQuery:''})              
                    this.setState({resultadosQuery :datos.data.data.resultSingleSurveyEEO })                
        
                  })
                  .catch(err => {
                    console.log("el error es  ",err)
                  });  
                    }

  render() {
    const container = { marginLeft:65}
    let pdfView1;
    let pdfView2;
    if(this.state.resultados[2]){ 
      console.log("este es lo que contiene el estado ")
      pdfView1 = <MDBContainer> <Alert className ="mt-4" color ="primary ">Resultados de la Aplicación de la encuesta EEO </Alert>

     
        <React.Fragment>
          <section className="flex-column  bg-white  pa4 "  >
          <div>
                    <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                        Descargar Respuestas 
                    </MDBBtn>
           </div>
           <br/>
           <PDFExport
                    scale={0.6}
                    paperSize="A4"
                    margin="2cm"
                    ref={(component) => this.pdfExportComponent = component}
                    allPages= "true"
              
                >
          <MDBTable small borderless className="mt-4 text-center">
            <MDBTableBody>
              <tr>
                <td width ="50%"> <img src={logotipo} alt="logo" style = {{width:100,marginBottom:20}}/></td>
                <td width ="50%">
                <img src={diagnostico} alt="logo" style = {{width:100,marginBottom:30}}/>

                </td>
              </tr>

            </MDBTableBody>        
            </MDBTable>
          
         
          <font face="arial" className = "mt-4" >CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO</font>
          <br/><strong>{localStorage.getItem("razonsocial")}</strong><br/>
                <MDBContainer style={container}>
                <MDBTable small borderless className="text-left mt-4 ml-4">
       
                <MDBTableBody>                  
                  <tr>
                  <td  >Nombre : {this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM} </td>
                  <td >Puesto : {this.state.resultados[0].Puesto}</td>
                                </tr>
                                <tr>
                  <td >Departamento : {this.state.resultados[0].AreaTrabajo}</td>
                  <td >Genero : {this.state.resultados[0].Sexo}</td> 
                                </tr>
                                <tr>
                  <td >Correo : {this.state.resultados[0].correo}</td>
                  <td >RFC : {this.state.resultados[0].RFC}</td>   
                  </tr>
                </MDBTableBody>
                </MDBTable>
                </MDBContainer>
                
                <MDBContainer style={{marginLeft:20}} >
                <MDBTable small borderless className="mt-4 text-left ml-4">
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">I. Condiciones ambientales de su centro de trabajo.</th>    
                      <td width="25%"></td>   
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">1</td>
                      <td width="70%">El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</td>
                      <td width="25%" >{this.state.resultados[1].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td >2</td>
                      <td>Mi trabajo me exige hacer mucho esfuerzo físico</td>
                      <td>{this.state.resultados[2].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Me preocupa sufrir un accidente en mi trabajo</td>
                      <td>{this.state.resultados[3].Respuestas}</td> 
                    </tr>                    
                    <tr>
                      <td>4</td>
                      <td>Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo</td>
                      <td>{this.state.resultados[4].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Considero que las actividades que realizo son peligrosas</td>
                      <td >{this.state.resultados[5].Respuestas}</td> 
                    </tr>
                    <br/>
 
                  </MDBTableBody>
      
                  <MDBTableHead>
                    <tr>
                    <td></td>
                      <th >II. La cantidad y ritmo de trabajo que tiene.</th>       
                      <td></td>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>6</td>
                      <td>Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno</td>   
                      <td >{this.state.resultados[6].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Por la cantidad de trabajo que tengo debo trabajar sin parar</td>   
                      <td >{this.state.resultados[7].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Considero que es necesario mantener un ritmo de trabajo acelerado</td>   
                      <td >{this.state.resultados[8].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>
  
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">III. El esfuerzo mental que le exige su trabajo.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">9</td>
                      <td width="70%">Mi trabajo exige que esté muy concentrado</td> 
                      <td width="25%" >{this.state.resultados[9].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Mi trabajo requiere que memorice mucha información</td>   
                      <td >{this.state.resultados[10].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>En mi trabajo tengo que tomar decisiones difíciles muy rápido</td>   
                      <td>{this.state.resultados[11].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>Mi trabajo exige que atienda varios asuntos al mismo tiempo</td>   
                      <td >{this.state.resultados[12].Respuestas}</td> 
                    </tr>
                   <br/>
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">IV. Trabajo y las responsabilidades que tiene.</th>       
                      <td width="25%" ></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">13</td>
                      <td width="70%">En mi trabajo soy responsable de cosas de mucho valor</td>   
                      <td width="25%" >{this.state.resultados[13].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>14</td>
                      <td>Respondo ante mi jefe por los resultados de toda mi área de trabajo</td>   
                      <td>{this.state.resultados[14].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>En el trabajo me dan órdenes contradictorias</td>   
                      <td>{this.state.resultados[15].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>16</td>
                      <td>Considero que en mi trabajo me piden hacer cosas innecesarias</td>   
                      <td>{this.state.resultados[16].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">V. Jornada de trabajo.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">17</td>
                      <td width="70%">Trabajo horas extras más de tres veces a la semana</td>   
                      <td width="25%">{this.state.resultados[17].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>18</td>
                      <td>Mi trabajo me exige laborar en días de descanso, festivos o fines de semana</td>   
                      <td>{this.state.resultados[18].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>19</td>
                      <td>Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales</td>   
                      <td>{this.state.resultados[19].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>20</td>
                      <td>Debo atender asuntos de trabajo cuando estoy en casa</td>   
                      <td>{this.state.resultados[20].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>21</td>
                      <td>Pienso en las actividades familiares o personales cuando estoy en mi trabajo</td>   
                      <td>{this.state.resultados[21].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>22</td>
                      <td>Pienso que mis responsabilidades familiares afectan mi trabajo</td>   
                      <td>{this.state.resultados[22].Respuestas}</td> 
                    </tr>
                  </MDBTableBody>
                  <br/>
                  <MDBTableHead >
                    <tr>
                      <th  width="5%"></th>
                      <th  width="70%">VI. Decisiones que puede tomar en su trabajo.</th>       
                      <td  width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">23</td>
                      <td width="70%">Mi trabajo permite que desarrolle nuevas habilidades</td>   
                      <td width="25%">{this.state.resultados[23].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>24</td>
                      <td>En mi trabajo puedo aspirar a un mejor puesto</td>   
                      <td >{this.state.resultados[24].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>25</td>
                      <td>Durante mi jornada de trabajo puedo tomar pausas cuando las necesito</td>   
                      <td>{this.state.resultados[25].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td >26</td>
                      <td >Puedo decidir cuánto trabajo realizo durante la jornada laboral</td>   
                      <td >{this.state.resultados[26].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>27</td>
                      <td>Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo</td>   
                      <td >{this.state.resultados[27].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>28</td>
                      <td>Puedo cambiar el orden de las actividades que realizo en mi trabajo</td>   
                      <td>{this.state.resultados[28].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>
                  
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">VII. Cualquier tipo de cambio que ocurra en su trabajo (considere los últimos cambios realizados).</th>       
                      <td width="25%"> </td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td  width="5%">29</td>
                      <td  width="70%">Los cambios que se presentan en mi trabajo dificultan mi labor</td>   
                      <td  width="25%">{this.state.resultados[29].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>30</td>
                      <td>Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas o aportaciones</td>   
                      <td >{this.state.resultados[30].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">VIII. capacitación e información que se le proporciona sobre su trabajo.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">31</td>
                      <td width="70%">Me informan con claridad cuáles son mis funciones</td>   
                      <td width="25%">{this.state.resultados[31].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>32</td>
                      <td>Me explican claramente los resultados que debo obtener en mi trabajo</td>   
                      <td >{this.state.resultados[32].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>33</td>
                      <td>Me explican claramente los objetivos de mi trabajo</td>   
                      <td >{this.state.resultados[33].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>34</td>
                      <td>Me informan con quién puedo resolver problemas o asuntos de trabajo</td>   
                      <td>{this.state.resultados[34].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>35</td>
                      <td>Me permiten asistir a capacitaciones relacionadas con mi trabajo</td>   
                      <td>{this.state.resultados[35].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>36</td>
                      <td>Recibo capacitación útil para hacer mi trabajo</td>   
                      <td>{this.state.resultados[36].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">IX. Jefes con quien tiene contacto.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="5%">37</td>
                      <td width="70%">Mi jefe ayuda a organizar mejor el trabajo</td>   
                      <td width="25%">{this.state.resultados[37].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>38</td>
                      <td>Mi jefe tiene en cuenta mis puntos de vista y opiniones</td>   
                      <td>{this.state.resultados[38].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>39</td>
                      <td>Mi jefe me comunica a tiempo la información relacionada con el trabajo</td>   
                      <td>{this.state.resultados[39].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>40</td>
                      <td>La orientación que me da mi jefe me ayuda a realizar mejor mi trabajo</td>   
                      <td>{this.state.resultados[40].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>41</td>
                      <td>Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo</td>   
                      <td>{this.state.resultados[41].Respuestas}</td> 
                    </tr>                  
                    <br/>
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">X. Relaciones con sus compañeros.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td width="5%">42</td>
                      <td width="70%">Puedo confiar en mis compañeros de trabajo</td>   
                      <td width="25%">{this.state.resultados[42].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>43</td>
                      <td>Entre compañeros solucionamos los problemas de trabajo de forma respetuosa</td>   
                      <td>{this.state.resultados[43].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>44</td>
                      <td>En mi trabajo me hacen sentir parte del grupo</td>   
                      <td>{this.state.resultados[44].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>45</td>
                      <td>Cuando tenemos que realizar trabajo de equipo los compañeros colaboran</td>   
                      <td >{this.state.resultados[45].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>46</td>
                      <td>Mis compañeros de trabajo me ayudan cuando tengo dificultades</td>   
                      <td>{this.state.resultados[46].Respuestas}</td> 
                    </tr>
                    <br/>

                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th  width="5px"></th>
                      <th  width="70px">XI. Información que recibe sobre su rendimiento en el trabajo, el reconocimiento, el sentido de pertenencia y la estabilidad que le ofrece su trabajo.</th>       
                      <td  width="25px"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td width="5%">47</td>
                      <td width="70%">Me informan sobre lo que hago bien en mi trabajo</td>   
                      <td width="25%">{this.state.resultados[47].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>48</td>
                      <td>La forma como evalúan mi trabajo en mi centro de trabajo me ayuda a mejorar mi desempeño</td>   
                      <td>{this.state.resultados[48].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>49</td>
                      <td>En mi centro de trabajo me pagan a tiempo mi salario</td>   
                      <td>{this.state.resultados[49].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>50</td>
                      <td>El pago que recibo es el que merezco por el trabajo que realizo</td>   
                      <td>{this.state.resultados[50].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>51</td>
                      <td>Si obtengo los resultados esperados en mi trabajo me recompensan o reconocen</td>   
                      <td>{this.state.resultados[51].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>52</td>
                      <td>Las personas que hacen bien el trabajo pueden crecer laboralmente</td>   
                      <td >{this.state.resultados[52].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>53</td>
                      <td>Considero que mi trabajo es estable</td>   
                      <td >{this.state.resultados[53].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>54</td>
                      <td>En mi trabajo existe continua rotación de personal</td>   
                      <td>{this.state.resultados[54].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>55</td>
                      <td>Siento orgullo de laborar en este centro de trabajo</td>   
                      <td>{this.state.resultados[55].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>56</td>
                      <td>Me siento comprometido con mi trabajo</td>   
                      <td>{this.state.resultados[56].Respuestas}</td> 
                    </tr>
               
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">XII. Actos de violencia laboral (malos tratos, acoso, hostigamiento, acoso psicológico).</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td width="5%">57</td>
                      <td width="70%">En mi trabajo puedo expresarme libremente sin interrupciones</td>   
                      <td width="25%">{this.state.resultados[57].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>58</td>
                      <td>Recibo críticas constantes a mi persona y/o trabajo</td>   
                      <td>{this.state.resultados[58].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>59</td>
                      <td>Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones</td>   
                      <td>{this.state.resultados[59].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>60</td>
                      <td>Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones</td>   
                      <td>{this.state.resultados[60].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>61</td>
                      <td>Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador</td>   
                      <td>{this.state.resultados[61].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>62</td>
                      <td>Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores</td>   
                      <td>{this.state.resultados[62].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>63</td>
                      <td>Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo</td>   
                      <td>{this.state.resultados[63].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>64</td>
                      <td>He presenciado actos de violencia en mi centro de trabajo</td>   
                      <td >{this.state.resultados[64].Respuestas}</td> 
                    </tr>
                    <br/>
                  </MDBTableBody>
                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">XIII. Atención a clientes y usuarios.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td width="5%">65</td>
                      <td width="70%">Atiendo clientes o usuarios muy enojados</td>   
                      <td width="25%">{this.state.resultados[65].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>66</td>
                      <td>Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas</td>   
                      <td>{this.state.resultados[66].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>67</td>
                      <td>Para hacer mi trabajo debo demostrar sentimientos distintos a los míos</td>   
                      <td>{this.state.resultados[67].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>68</td>
                      <td>Mi trabajo me exige atender situaciones de violencia</td>   
                      <td>{this.state.resultados[68].Respuestas}</td> 
                    </tr> 
                    <br/>                   
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th width="5%"></th>
                      <th width="70%">XIV.  Las actitudes de las personas que supervisa.</th>       
                      <td width="25%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td width="5%">69</td>
                      <td width="70%"> Comunican tarde los asuntos de trabajo</td>   
                      <td width="25%">{this.state.resultados[69].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>70</td>
                      <td>Dificultan el logro de los resultados del trabajo</td>   
                      <td>{this.state.resultados[70].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>71</td>
                      <td>Cooperan poco cuando se necesita</td>   
                      <td >{this.state.resultados[71].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>72</td>
                      <td>Ignoran las sugerencias para mejorar su trabajo</td>   
                      <td>{this.state.resultados[72].Respuestas}</td> 
                    </tr>
                    
                  </MDBTableBody>
                </MDBTable> 
                </MDBContainer>  
                </PDFExport>
          </section>
        </React.Fragment>
   
      </MDBContainer>
    } 
 ///////////////////////////////////////////////////////////////////////////////////7
 let ponderacion 


// console.log("esta es la validacion",this.state.getPonderacion,this.state.resultadosEvaluacion.length,this.state.resultadosQuery.length>0)
 if( this.state.resultadosEvaluacion.length > 0 && this.state.resultadosQuery.length>0){

  let respuesta1=this.state.resultadosEvaluacion[1].Respuestas;
  let respuesta2=this.state.resultadosEvaluacion[2].Respuestas;
  let respuesta3=this.state.resultadosEvaluacion[3].Respuestas;
  let respuesta4=this.state.resultadosEvaluacion[4].Respuestas;
  let respuesta5=this.state.resultadosEvaluacion[5].Respuestas;
  let respuesta6=this.state.resultadosEvaluacion[6].Respuestas;
  let respuesta7=this.state.resultadosEvaluacion[7].Respuestas;
  let respuesta8=this.state.resultadosEvaluacion[8].Respuestas;
  let respuesta9=this.state.resultadosEvaluacion[9].Respuestas;
  let respuesta10=this.state.resultadosEvaluacion[10].Respuestas;
  let respuesta11=this.state.resultadosEvaluacion[11].Respuestas;
  let respuesta12=this.state.resultadosEvaluacion[12].Respuestas;
  let respuesta13=this.state.resultadosEvaluacion[13].Respuestas;
  let respuesta14=this.state.resultadosEvaluacion[14].Respuestas;
  let respuesta15=this.state.resultadosEvaluacion[15].Respuestas;
  let respuesta16=this.state.resultadosEvaluacion[16].Respuestas;
  let respuesta17=this.state.resultadosEvaluacion[17].Respuestas;
  let respuesta18=this.state.resultadosEvaluacion[18].Respuestas;
  let respuesta19=this.state.resultadosEvaluacion[19].Respuestas;
  let respuesta20=this.state.resultadosEvaluacion[20].Respuestas;
  let respuesta21=this.state.resultadosEvaluacion[21].Respuestas;
  let respuesta22=this.state.resultadosEvaluacion[22].Respuestas;
  let respuesta23=this.state.resultadosEvaluacion[23].Respuestas;
  let respuesta24=this.state.resultadosEvaluacion[24].Respuestas;
  let respuesta25=this.state.resultadosEvaluacion[25].Respuestas;
  let respuesta26=this.state.resultadosEvaluacion[26].Respuestas;
  let respuesta27=this.state.resultadosEvaluacion[27].Respuestas;
  let respuesta28=this.state.resultadosEvaluacion[28].Respuestas;
  let respuesta29=this.state.resultadosEvaluacion[29].Respuestas;
  let respuesta30=this.state.resultadosEvaluacion[30].Respuestas;
  let respuesta31=this.state.resultadosEvaluacion[31].Respuestas;
  let respuesta32=this.state.resultadosEvaluacion[32].Respuestas;
  let respuesta33=this.state.resultadosEvaluacion[33].Respuestas;
  let respuesta34=this.state.resultadosEvaluacion[34].Respuestas;
  let respuesta35=this.state.resultadosEvaluacion[35].Respuestas;
  let respuesta36=this.state.resultadosEvaluacion[36].Respuestas;
  let respuesta37=this.state.resultadosEvaluacion[37].Respuestas;
  let respuesta38=this.state.resultadosEvaluacion[38].Respuestas;
  let respuesta39=this.state.resultadosEvaluacion[39].Respuestas;
  let respuesta40=this.state.resultadosEvaluacion[40].Respuestas;
  let respuesta41=this.state.resultadosEvaluacion[41].Respuestas;
  let respuesta42=this.state.resultadosEvaluacion[42].Respuestas;
  let respuesta43=this.state.resultadosEvaluacion[43].Respuestas;
  let respuesta44=this.state.resultadosEvaluacion[44].Respuestas;
  let respuesta45=this.state.resultadosEvaluacion[45].Respuestas;
  let respuesta46=this.state.resultadosEvaluacion[46].Respuestas;
  let respuesta47=this.state.resultadosEvaluacion[47].Respuestas;
  let respuesta48=this.state.resultadosEvaluacion[48].Respuestas;
  let respuesta49=this.state.resultadosEvaluacion[49].Respuestas;
  let respuesta50=this.state.resultadosEvaluacion[50].Respuestas;  
  let respuesta51=this.state.resultadosEvaluacion[51].Respuestas;
  let respuesta52=this.state.resultadosEvaluacion[52].Respuestas;
  let respuesta53=this.state.resultadosEvaluacion[53].Respuestas;
  let respuesta54=this.state.resultadosEvaluacion[54].Respuestas;
  let respuesta55=this.state.resultadosEvaluacion[55].Respuestas;
  let respuesta56=this.state.resultadosEvaluacion[56].Respuestas;
  let respuesta57=this.state.resultadosEvaluacion[57].Respuestas;
  let respuesta58=this.state.resultadosEvaluacion[58].Respuestas;
  let respuesta59=this.state.resultadosEvaluacion[59].Respuestas;
  let respuesta60=this.state.resultadosEvaluacion[60].Respuestas; 
  let respuesta61=this.state.resultadosEvaluacion[61].Respuestas;
  let respuesta62=this.state.resultadosEvaluacion[62].Respuestas;
  let respuesta63=this.state.resultadosEvaluacion[63].Respuestas;
  let respuesta64=this.state.resultadosEvaluacion[64].Respuestas;
  let respuesta65=this.state.resultadosEvaluacion[65].Respuestas;
  let respuesta66=this.state.resultadosEvaluacion[66].Respuestas;
  let respuesta67=this.state.resultadosEvaluacion[67].Respuestas;
  let respuesta68=this.state.resultadosEvaluacion[68].Respuestas;
  let respuesta69=this.state.resultadosEvaluacion[69].Respuestas;
  let respuesta70=this.state.resultadosEvaluacion[70].Respuestas;
  let respuesta71=this.state.resultadosEvaluacion[71].Respuestas;
  let respuesta72=this.state.resultadosEvaluacion[72].Respuestas;
  
  let valor1=this.state.resultadosEvaluacion[1].ponderacion;
  let valor2=this.state.resultadosEvaluacion[2].ponderacion;
  let valor3=this.state.resultadosEvaluacion[3].ponderacion;
  let valor4=this.state.resultadosEvaluacion[4].ponderacion;
  let valor5=this.state.resultadosEvaluacion[5].ponderacion;
  let valor6=this.state.resultadosEvaluacion[6].ponderacion;
  let valor7=this.state.resultadosEvaluacion[7].ponderacion;
  let valor8=this.state.resultadosEvaluacion[8].ponderacion;
  let valor9=this.state.resultadosEvaluacion[9].ponderacion;
  let valor10=this.state.resultadosEvaluacion[10].ponderacion;
  let valor11=this.state.resultadosEvaluacion[11].ponderacion;
  let valor12=this.state.resultadosEvaluacion[12].ponderacion;
  let valor13=this.state.resultadosEvaluacion[13].ponderacion;
  let valor14=this.state.resultadosEvaluacion[14].ponderacion;
  let valor15=this.state.resultadosEvaluacion[15].ponderacion;
  let valor16=this.state.resultadosEvaluacion[16].ponderacion;
  let valor17=this.state.resultadosEvaluacion[17].ponderacion;
  let valor18=this.state.resultadosEvaluacion[18].ponderacion;
  let valor19=this.state.resultadosEvaluacion[19].ponderacion;
  let valor20=this.state.resultadosEvaluacion[20].ponderacion;
  let valor21=this.state.resultadosEvaluacion[21].ponderacion;
  let valor22=this.state.resultadosEvaluacion[22].ponderacion;
  let valor23=this.state.resultadosEvaluacion[23].ponderacion;
  let valor24=this.state.resultadosEvaluacion[24].ponderacion;
  let valor25=this.state.resultadosEvaluacion[25].ponderacion;
  let valor26=this.state.resultadosEvaluacion[26].ponderacion;
  let valor27=this.state.resultadosEvaluacion[27].ponderacion;
  let valor28=this.state.resultadosEvaluacion[28].ponderacion;
  let valor29=this.state.resultadosEvaluacion[29].ponderacion;
  let valor30=this.state.resultadosEvaluacion[30].ponderacion;
  let valor31=this.state.resultadosEvaluacion[31].ponderacion;
  let valor32=this.state.resultadosEvaluacion[32].ponderacion;
  let valor33=this.state.resultadosEvaluacion[33].ponderacion;
  let valor34=this.state.resultadosEvaluacion[34].ponderacion;
  let valor35=this.state.resultadosEvaluacion[35].ponderacion;
  let valor36=this.state.resultadosEvaluacion[36].ponderacion;
  let valor37=this.state.resultadosEvaluacion[37].ponderacion;
  let valor38=this.state.resultadosEvaluacion[38].ponderacion;
  let valor39=this.state.resultadosEvaluacion[39].ponderacion;
  let valor40=this.state.resultadosEvaluacion[40].ponderacion;
  let valor41=this.state.resultadosEvaluacion[41].ponderacion;
  let valor42=this.state.resultadosEvaluacion[42].ponderacion;
  let valor43=this.state.resultadosEvaluacion[43].ponderacion;
  let valor44=this.state.resultadosEvaluacion[44].ponderacion;
  let valor45=this.state.resultadosEvaluacion[45].ponderacion;
  let valor46=this.state.resultadosEvaluacion[46].ponderacion;
  let valor47=this.state.resultadosEvaluacion[47].ponderacion;
  let valor48=this.state.resultadosEvaluacion[48].ponderacion;
  let valor49=this.state.resultadosEvaluacion[49].ponderacion;
  let valor50=this.state.resultadosEvaluacion[50].ponderacion;  
  let valor51=this.state.resultadosEvaluacion[51].ponderacion;
  let valor52=this.state.resultadosEvaluacion[52].ponderacion;
  let valor53=this.state.resultadosEvaluacion[53].ponderacion;
  let valor54=this.state.resultadosEvaluacion[54].ponderacion;
  let valor55=this.state.resultadosEvaluacion[55].ponderacion;
  let valor56=this.state.resultadosEvaluacion[56].ponderacion;
  let valor57=this.state.resultadosEvaluacion[57].ponderacion;
  let valor58=this.state.resultadosEvaluacion[58].ponderacion;
  let valor59=this.state.resultadosEvaluacion[59].ponderacion;
  let valor60=this.state.resultadosEvaluacion[60].ponderacion; 
  let valor61=this.state.resultadosEvaluacion[61].ponderacion;
  let valor62=this.state.resultadosEvaluacion[62].ponderacion;
  let valor63=this.state.resultadosEvaluacion[63].ponderacion;
  let valor64=this.state.resultadosEvaluacion[64].ponderacion;
  let valor65=this.state.resultadosEvaluacion[65].ponderacion;
  let valor66=this.state.resultadosEvaluacion[66].ponderacion;
  let valor67=this.state.resultadosEvaluacion[67].ponderacion;
  let valor68=this.state.resultadosEvaluacion[68].ponderacion;
  let valor69=this.state.resultadosEvaluacion[69].ponderacion;
  let valor70=this.state.resultadosEvaluacion[70].ponderacion;
  let valor71=this.state.resultadosEvaluacion[71].ponderacion;
  let valor72=this.state.resultadosEvaluacion[72].ponderacion;
  let entero1=parseInt(valor1);let entero2=parseInt(valor2);let entero3=parseInt(valor3);let entero4=parseInt(valor4);
  let entero5=parseInt(valor5);let entero6=parseInt(valor6);let entero7=parseInt(valor7);let entero8=parseInt(valor8);
  let entero9=parseInt(valor9);let entero10=parseInt(valor10);let entero11=parseInt(valor11);let entero12=parseInt(valor12);
  let entero13=parseInt(valor13);let entero14=parseInt(valor14);let entero15=parseInt(valor15);let entero16=parseInt(valor16);
  let entero17=parseInt(valor17);let entero18=parseInt(valor18);let entero19=parseInt(valor19);let entero20=parseInt(valor20);
  let entero21=parseInt(valor21);let entero22=parseInt(valor22);let entero23=parseInt(valor23);let entero24=parseInt(valor24);
  let entero25=parseInt(valor25);let entero26=parseInt(valor26);let entero27=parseInt(valor27);let entero28=parseInt(valor28);
  let entero29=parseInt(valor29);let entero30=parseInt(valor30);let entero31=parseInt(valor31);let entero32=parseInt(valor32);
  let entero33=parseInt(valor33);let entero34=parseInt(valor34);let entero35=parseInt(valor35);let entero36=parseInt(valor36);
  let entero37=parseInt(valor37);let entero38=parseInt(valor38);let entero39=parseInt(valor39);let entero40=parseInt(valor40);
  let entero41=parseInt(valor41);let entero42=parseInt(valor42);let entero43=parseInt(valor43);let entero44=parseInt(valor44);
  let entero45=parseInt(valor45);let entero46=parseInt(valor46);let entero47=parseInt(valor47);let entero48=parseInt(valor48);
  let entero49=parseInt(valor49);let entero50=parseInt(valor50);let entero51=parseInt(valor51);let entero52=parseInt(valor52);
  let entero53=parseInt(valor53);let entero54=parseInt(valor54);let entero55=parseInt(valor55);let entero56=parseInt(valor56);
  let entero57=parseInt(valor57);let entero58=parseInt(valor58);let entero59=parseInt(valor59);let entero60=parseInt(valor60);
  let entero61=parseInt(valor61);let entero62=parseInt(valor62);let entero63=parseInt(valor63);let entero64=parseInt(valor64);
  let entero65=parseInt(valor65);let entero66=parseInt(valor66);let entero67=parseInt(valor67);let entero68=parseInt(valor68);
  let entero69=parseInt(valor69);let entero70=parseInt(valor70);let entero71=parseInt(valor71);let entero72=parseInt(valor72);

    let total = (entero1+entero2+entero3+entero4+entero5+entero6+entero7+entero8+entero9+entero10+entero11+entero12+entero13+entero14+entero15+entero16+entero17+entero18+entero19+entero20+entero21+entero22+entero23+entero24+entero25+entero26+entero27+entero28+entero29+entero30+entero31+entero32+entero33+entero34+entero35+entero36+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46+entero47+entero48+entero49+entero50+entero51+entero52+entero53+entero54+entero55+entero56+entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64+entero65+entero66+entero67+entero68+entero69+entero70+entero71+entero72);
    let celda1;
    let celda2;
    let celda3;
    let celda4;
    let celda5;
    let criterios;

    let color;
    if(total<50){
    criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}>El riesgo resulta despreciable por lo que no se requiere medidas adicionales.</TableCell>
    color =<TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
    celda1 = <TableCell style={{backgroundColor: "#9BE0F7"}} align="right">{total}</TableCell>
    }else if(total>=50 && total < 75){
      criterios = <TableCell style={{backgroundColor: "#E6E7E8"}}><font size="1" face="arial"color="black" align=" justify">Es necesario una mayor difusión de la política de prevención de riesgos
      psicosociales y programas para: la prevención de los factores de riesgo
      psicosocial, la promoción de un entorno organizacional favorable y la
      prevención de la violencia laboral.</font></TableCell>
      color= <TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black" >Bajo</font></TableCell>
      celda2 = <TableCell style={{backgroundColor: "#6BF56E"}} align="right">{total}</TableCell>
    }else if(total>=75 && total < 99){
      criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align=" justify">Se requiere revisar la política de prevención de riesgos psicosociales y
        programas para la prevención de los factores de riesgo psicosocial, la
        promoción de un entorno organizacional favorable y la prevención de la
        violencia laboral, así como reforzar su aplicación y difusión, mediante un
        Programa de intervención.</font></TableCell>
      color=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
      celda3 = <TableCell style={{backgroundColor: "#FFFF00"}} align="right">{total}</TableCell>
    }else if(total>=99 && total < 140){
      criterios = <TableCell style={{backgroundColor: "#E6E7E8"}} ><font size="1" face="arial"color="black" align=" justify">Se requiere realizar un análisis de cada categoría y dominio, de manera que
      se puedan determinar las acciones de intervención apropiadas a través de un
      Programa de intervención, que podrá incluir una evaluación específica y
      deberá incluir una campaña de sensibilización, revisar la política de
      prevención de riesgos psicosociales y programas para la prevención de los
      factores de riesgo psicosocial, la promoción de un entorno organizacional
      favorable y la prevención de la violencia laboral, así como reforzar su
      aplicación y difusión.</font></TableCell>
      color = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black" >Alto</font></TableCell>
     celda4 = <TableCell style={{backgroundColor: "#FFC000"}} align="right">{total}</TableCell>
    }
    else if( total > 140){
      criterios = <TableCell style={{backgroundColor: "#F0F8FF"}} ><font size="1" face="arial"color="black" align=" justify">Se requiere realizar el análisis de cada categoría y dominio para establecer
      las acciones de intervención apropiadas, mediante un Programa de
      intervención que deberá incluir evaluaciones específicas, y contemplar
      campañas de sensibilización, revisar la política de prevención de riesgos
      psicosociales y programas para la prevención de los factores de riesgo
      psicosocial, la promoción de un entorno organizacional favorable y la
      prevención de la violencia laboral, así como reforzar su aplicación y difusión.</font></TableCell>
      color = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
      celda5  = <TableCell style={{backgroundColor: "#FF0000"}} align="right">{total}</TableCell>
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////

let categoria1Nulo;
let categoria1Bajo;
let categoria1Medio;
let categoria1Alto;
let categoria1MuyAlto;
let categoriaUno = (entero1+entero3+entero2+entero4+entero5);
let colorCategoriaUno;
console.log("categotia1",entero1,entero3,entero2,entero4,entero5)
if(categoriaUno < 5){
  categoria1Nulo= categoriaUno
  colorCategoriaUno  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
}else if(categoriaUno >= 5 && categoriaUno < 9){
  colorCategoriaUno =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria1Bajo= categoriaUno
}else if(categoriaUno >= 9 && categoriaUno < 11){
  colorCategoriaUno=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria1Medio= categoriaUno
}else if(categoriaUno >= 11 && categoriaUno < 14){
  colorCategoriaUno = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria1Alto= categoriaUno
}else if(categoriaUno >= 14){
  colorCategoriaUno = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria1MuyAlto= categoriaUno
}

let categoria2Nulo;
let categoria2Bajo;
let categoria2Medio;
let categoria2Alto;
let categoria2MuyAlto;
let colorCategoriaDos;
let categoriaDos = (entero6+entero12+entero7+entero8+entero9+entero10+entero11+entero65+entero66+entero67+entero68+entero13+entero14+entero15+entero16+entero25+entero26+entero27+entero28+entero23+entero24+entero29+entero30+entero35+entero36);
if(categoriaDos < 15){
  colorCategoriaDos  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria2Nulo= categoriaDos
}else if(categoriaDos >= 15 && categoriaDos < 30){
  colorCategoriaDos =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria2Bajo= categoriaDos
}else if(categoriaDos >=30 && categoriaDos < 45){
  colorCategoriaDos=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria2Medio= categoriaDos
}else if(categoriaDos >=45 && categoriaDos < 60){
  colorCategoriaDos = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria2Alto= categoriaDos
}else if(categoriaDos >= 60){
  colorCategoriaDos = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria2MuyAlto= categoriaDos
}
let categoria3Nulo;
let categoria3Bajo;
let categoria3Medio;
let categoria3Alto;
let categoria3MuyAlto;
let colorCategoriaTre;
let categoriaTre = (entero17+entero18+entero19+entero20+entero21+entero22);
if(categoriaTre < 5){
  colorCategoriaTre  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria3Nulo= categoriaTre
}else if(categoriaTre >= 5 && categoriaTre < 7){
  colorCategoriaTre =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria3Bajo= categoriaTre
}else if(categoriaTre >=7 && categoriaTre < 10){
  colorCategoriaTre=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria3Medio= categoriaTre
}else if(categoriaTre >=10 && categoriaTre < 13){
  colorCategoriaTre = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria3Alto= categoriaTre
}else if(categoriaTre >= 13){
  categoria3MuyAlto= categoriaTre
  colorCategoriaTre = <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
}

let categoria4Nulo;
let categoria4Bajo;
let categoria4Medio;
let categoria4Alto;
let categoria4MuyAlto;
let colorCategoriaCuatro;
let categoriaCuatro = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72+entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64);
if(categoriaCuatro < 14){
  colorCategoriaCuatro  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria4Nulo= categoriaCuatro
}else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
  colorCategoriaCuatro =<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria4Bajo= categoriaCuatro
}else if(categoriaCuatro >=29 && categoriaCuatro < 42){
  colorCategoriaCuatro=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria4Medio= categoriaCuatro
}else if(categoriaCuatro >=42 && categoriaCuatro < 58){
  colorCategoriaCuatro = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria4Alto= categoriaCuatro
}else if(categoriaCuatro >= 58){
  colorCategoriaCuatro= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria4MuyAlto= categoriaCuatro
}

let categoria5Nulo;
let categoria5Bajo;
let categoria5Medio;
let categoria5Alto;
let categoria5MuyAlto;
let colorCategoriaCinco;
let categoriaCinco = (entero47+entero48+entero49+entero50+entero51+entero52+entero55+entero56+entero53+entero54);
if(categoriaCinco < 10){
  colorCategoriaCinco  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  categoria5Nulo= categoriaCinco
}else if(categoriaCinco >= 10 && categoriaCinco < 14){
  colorCategoriaCinco=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  categoria5Bajo= categoriaCinco
}else if(categoriaCinco >=14 && categoriaCinco < 18){
  colorCategoriaCinco=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  categoria5Medio= categoriaCinco
}else if(categoriaCinco >=18 && categoriaCinco < 23){
  colorCategoriaCinco = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  categoria5Alto= categoriaCinco
}else if(categoriaCinco >= 23){
  colorCategoriaCinco= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  categoria5MuyAlto= categoriaCinco
}


let Dominio1Nulo;
let Dominio1Bajo;
let Dominio1Medio;
let Dominio1Alto;
let Dominio1MuyAlto;
let DominioUno = (entero1+entero3+entero2+entero4+entero5);
let colorDominioUno;
if(DominioUno < 5){
  colorDominioUno  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio1Nulo= DominioUno
}else if(DominioUno >= 5 && DominioUno < 9){
  colorDominioUno=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio1Bajo= DominioUno
}else if(DominioUno >= 9 && DominioUno < 11){
  colorDominioUno=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio1Medio= DominioUno
}else if(DominioUno >=11 && DominioUno < 14){
  colorDominioUno = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio1Alto= DominioUno
}else if(DominioUno >= 14){
  colorDominioUno= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio1MuyAlto= DominioUno
}

let Dominio2Nulo;
let Dominio2Bajo;
let Dominio2Medio;
let Dominio2Alto;
let Dominio2MuyAlto;
let colorDominioDos;
let DominioDos = (entero6+entero12+entero7+entero8+entero9+entero10+entero11+entero65+entero66+entero67+entero68+entero13+entero14+entero15+entero16);
if(DominioDos < 15){
  colorDominioDos  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio2Nulo= DominioDos
}else if(DominioDos >= 15 && DominioDos < 21){
  colorDominioDos=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio2Bajo= DominioDos
}else if(DominioDos >= 21 && DominioDos < 27){
  colorDominioDos=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio2Medio= DominioDos
}else if(DominioDos >= 27 && DominioDos < 37){
  colorDominioDos = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio2Alto= DominioDos
}else if(DominioDos >= 37){
  colorDominioDos= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio2MuyAlto= DominioDos
}

let Dominio3Nulo;
let Dominio3Bajo;
let Dominio3Medio;
let Dominio3Alto;
let Dominio3MuyAlto;
let colorDominioTres;
let DominioTres = (entero25+entero26+entero27+entero28+entero23+entero24+entero29+entero30+entero35+entero36);
if(DominioTres < 11){
  colorDominioTres  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio3Nulo= DominioTres
}else if(DominioTres >= 11 && DominioTres < 16){
  colorDominioTres=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio3Bajo= DominioTres
}else if(DominioTres >= 16 && DominioTres < 21){
  colorDominioTres=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio3Medio= DominioTres
}else if(DominioTres >= 21 && DominioTres < 25){
  colorDominioTres = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio3Alto= DominioTres
}else if(DominioTres >= 25){
  colorDominioTres= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio3MuyAlto= DominioTres
}

let Dominio4Nulo;
let Dominio4Bajo;
let Dominio4Medio;
let Dominio4Alto;
let Dominio4MuyAlto;
let colorDominioCuatro;
let DominioCuatro = (entero17+entero18);
if(DominioCuatro < 1){
  colorDominioCuatro  = <TableCell style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio4Nulo= DominioCuatro
}else if(DominioCuatro >= 1 && DominioCuatro < 2){
  colorDominioCuatro=<TableCell style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio4Bajo= DominioCuatro
}else if(DominioCuatro >= 2 && DominioCuatro < 4){
  colorDominioCuatro=<TableCell style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio4Medio= DominioCuatro
}else if(DominioCuatro >= 4 && DominioCuatro < 6){
  colorDominioCuatro = <TableCell style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio4Alto= DominioCuatro
}else if(DominioCuatro >= 6){
  colorDominioCuatro= <TableCell style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio4MuyAlto= DominioCuatro
}

let Dominio5Nulo;
let Dominio5Bajo;
let Dominio5Medio;
let Dominio5Alto;
let Dominio5MuyAlto;
let colorDominioCinco;
let DominioCinco = (entero19+entero20+entero21+entero22);
if(DominioCinco < 4){
  colorDominioCinco  = <TableCell width="15px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio5Nulo= DominioCinco
}else if(DominioCinco >= 4 && DominioCinco < 6){
  colorDominioCinco=<TableCell width="15px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio5Bajo= DominioCinco
}else if(DominioCinco >= 6 && DominioCinco < 8){
  colorDominioCinco=<TableCell width="15px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio5Medio= DominioCinco
}else if(DominioCinco >= 8 && DominioCinco < 10){
  colorDominioCinco = <TableCell  width="15px"style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio5Alto= DominioCinco
}else if(DominioCinco >= 10){
  colorDominioCinco= <TableCell  width="15px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio5MuyAlto= DominioCinco
}

let Dominio6Nulo;
let Dominio6Bajo;
let Dominio6Medio;
let Dominio6Alto;
let Dominio6MuyAlto;
let colorDominioSeis;
let DominioSeis = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41);
if(DominioSeis < 9){
  colorDominioSeis  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio6Nulo= DominioSeis
}else if(DominioSeis >= 9 && DominioSeis < 12){
  colorDominioSeis=<TableCell  width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio6Bajo= DominioSeis
}else if(DominioSeis >= 12 && DominioSeis < 16){
  colorDominioSeis=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio6Medio= DominioSeis
}else if(DominioSeis >= 16 && DominioSeis < 20){
  colorDominioSeis = <TableCell width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio6Alto= DominioSeis
}else if(DominioSeis >= 20){
  colorDominioSeis= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio6MuyAlto= DominioSeis
}

let Dominio7Nulo;
let Dominio7Bajo;
let Dominio7Medio;
let Dominio7Alto;
let Dominio7MuyAlto;
let colorDominioSiete;
let DominioSiete = (entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72);
if(DominioSiete < 10){
  colorDominioSiete  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio7Nulo= DominioSiete
}else if(DominioSiete >= 10 && DominioSiete < 13){
  colorDominioSiete=<TableCell width="20px" style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Bajo</font></TableCell>
  Dominio7Bajo= DominioSiete
}else if(DominioSiete >= 13 && DominioSiete < 17){
  colorDominioSiete=<TableCell  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio7Medio= DominioSiete
}else if(DominioSiete >= 17 && DominioSiete < 21){
  colorDominioSiete = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
Dominio7Alto= DominioSiete
}else if(DominioSiete >= 21){
  colorDominioSiete= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio7MuyAlto= DominioSiete
}

let Dominio8Nulo;
let Dominio8Bajo;
let Dominio8Medio;
let Dominio8Alto;
let Dominio8MuyAlto;
let colorDominioOcho;
let DominioOcho = (entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64);
if(DominioOcho < 7){
  colorDominioOcho  = <TableCell width="20px" style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio8Nulo= DominioOcho
}else if(DominioOcho >= 7 && DominioOcho < 10){
  colorDominioOcho  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio8Bajo= DominioOcho
}else if(DominioOcho >= 10 && DominioOcho < 13){
  colorDominioOcho=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio8Medio= DominioOcho
}else if(DominioOcho >= 13 && DominioOcho < 16){
  colorDominioOcho = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio8Alto= DominioOcho
}else if(DominioOcho >= 16){
  colorDominioOcho= <TableCell width="20px"  style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio8MuyAlto= DominioOcho
}

let Dominio9Nulo;
let Dominio9Bajo;
let Dominio9Medio;
let Dominio9Alto;
let Dominio9MuyAlto;
let colorDominioNueve;
let DominioNueve = (entero47+entero48+entero49+entero50+entero51+entero52);
if(DominioNueve < 6){
  colorDominioNueve  = <TableCell width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio9Nulo= DominioNueve
}else if(DominioNueve >= 6 && DominioNueve < 10){
  colorDominioNueve  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio9Bajo= DominioNueve
}else if(DominioNueve >= 10 && DominioNueve < 14){
  colorDominioNueve=<TableCell  width="20px" style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio9Medio= DominioNueve
}else if(DominioNueve >= 14 && DominioNueve < 18){
  colorDominioNueve = <TableCell  width="20px" style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio9Alto= DominioNueve
}else if(DominioNueve >= 18){
  colorDominioNueve= <TableCell  width="20px" style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio9MuyAlto= DominioNueve
}

let Dominio10Nulo;
let Dominio10Bajo;
let Dominio10Medio;
let Dominio10Alto;
let Dominio10MuyAlto;
let colorDominioDiez;
let DominioDiez = (entero55+entero56+entero53+entero54);
if(DominioDiez < 4){
  colorDominioDiez  = <TableCell width="20px"  style={{backgroundColor: "#9BE0F7"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio10Nulo= DominioDiez
}else if(DominioDiez >= 4 && DominioDiez < 6){
  colorDominioDiez  = <TableCell width="20px"  style={{backgroundColor: "#6BF56E"}} align="center"><font size="1" face="arial"color="black">Nulo</font></TableCell>
  Dominio10Bajo= DominioDiez
}else if(DominioDiez >= 6 && DominioDiez < 8){
  colorDominioDiez=<TableCell width="20px"  style={{backgroundColor: "#FFFF00"}} align="center"><font size="1" face="arial"color="black">Medio</font></TableCell>
  Dominio10Medio= DominioDiez
}else if(DominioDiez >= 8 && DominioDiez < 10){
  colorDominioDiez = <TableCell width="20px"  style={{backgroundColor: "#FFC000"}} align="center"><font size="1" face="arial"color="black">Alto</font></TableCell>
  Dominio10Alto= DominioDiez
}else if(DominioDiez >= 10){
  colorDominioDiez= <TableCell  width="20px"style={{backgroundColor: "#FF0000"}} align="center"><font size="1" face="arial"color="black">Muy Alto</font></TableCell>
  Dominio10MuyAlto= DominioDiez
}
 
    ponderacion =  <React.Fragment>
             <div>
                    <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save();}}>
                        Descargar Resultados
                    </MDBBtn>
           </div>
           <br/>
     
                    <font face="arial" className = "mt-4" >CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO</font>
          <br/><strong>{localStorage.getItem("razonsocial")}</strong><br/>
          
                <MDBContainer style={container}>
                <MDBTable responsive small borderless className="text-left mt-4 ">
       
                <MDBTableBody>                  
                  <tr>
                  <td  >Nombre : {this.state.resultadosQuery[0].nombre} {this.state.resultadosQuery[0].ApellidoP} {this.state.resultadosQuery[0].ApellidoM} </td>
                  <td >Puesto : {this.state.resultadosQuery[0].Puesto}</td>
                                </tr>
                                <tr>
                  <td >Departamento : {this.state.resultadosQuery[0].AreaTrabajo}</td>
                  <td >Genero : {this.state.resultadosQuery[0].Sexo}</td> 
                                </tr>
                                <tr>
                  <td >Correo : {this.state.resultadosQuery[0].correo}</td>
                  <td >RFC : {this.state.resultadosQuery[0].RFC}</td>   
                  </tr>
                </MDBTableBody>
                </MDBTable>
                </MDBContainer>

    <TableContainer  component={Paper} style={{marginBottom:30}}>
          <Table  borderless  size="small" aria-label="a dense table" >
          <TableRow>
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}} width="50%"><strong>Resultados Generales</strong></TableCell>              
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell component="th" scope="row" ></TableCell>
                  <TableCell component="th" scope="row" ></TableCell>
                  <TableCell component="th" scope="row" ></TableCell>
                  <TableCell component="th" scope="row" ></TableCell>  
                </TableRow>
            <TableHead>
              <TableRow>
                <TableCell width ="10%"></TableCell>
                <TableCell align="right" style={{backgroundColor: "#9BE0F7"}}>Nulo</TableCell>
                <TableCell align="right" style={{backgroundColor: "#6BF56E"}}>Bajo&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#FFFF00"}}>Medio&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#FFC000"}}>Alto&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#FF0000"}}>Muy Alto&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody  style={{marginTop:20}}>
              
                <TableRow>
                  <TableCell component="th" scope="row">
                Puntuación total
                  </TableCell>
                  <TableCell component="th" scope="row"align="center">{celda1}</TableCell>
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
                <TableCell align="right" style={{backgroundColor: "#9BE0F7"}}>Nulo</TableCell>
                <TableCell align="right" style={{backgroundColor: "#6BF56E"}}>Bajo&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#FFFF00"}}>Medio&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#FFC000"}}>Alto&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#FF0000"}}>Muy Alto&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody  style={{marginTop:20}}>       
                <TableRow>
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados de la Categoría</strong></TableCell>              
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
                <TableCell component="th" scope="row" >V. Entorno organizacional</TableCell>   
                <TableCell component="th" scope="row" align="center">{categoria5Nulo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria5Bajo}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria5Medio}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria5Alto}</TableCell>
                <TableCell component="th" scope="row" align="center">{categoria5MuyAlto}</TableCell>           
                </TableRow>
               
                <TableRow>
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados del Dominio</strong></TableCell>              
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
              <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados Por Dimensión</strong></TableCell>              
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
            <TableCell component="th" scope="row" align="center"> {entero1+entero3}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >2.- Condiciones deficientes e insalubres</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {entero2+entero4}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow> 
           
            <TableRow>
            <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {entero5}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%">4.- Cargas cuantitativas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero6+entero12)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >5.- Ritmos de trabajo acelerado</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero7+entero8)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero9+entero10+entero11)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero65+entero66+entero67+entero68)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >8.- Cargas de alta responsabilidad</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero13+entero14)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >9.- Cargas contradictorias o inconsistentes</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero15+entero16)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero25+entero26+entero27+entero28)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero23+entero24)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>

            <TableRow>
            <TableCell component="th" scope="row" >12.- Insuficiente participación y manejo del cambio</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero29+entero30)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>

            <TableRow>
            <TableCell component="th" scope="row" >13.- Limitada o inexistente capacitación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero35+entero36)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >14.- Jornadas de trabajo extensas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero17+entero18)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >15.- Influencia del trabajo fuera del centro laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero19+entero20)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >16.- Influencia de las responsabilidades familiares</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero21+entero22)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >17.- Escasa claridad de funciones</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero31+entero32+entero33+entero34)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >18.- Características del liderazgo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero37+entero38+entero39+entero40+entero41)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >19.- Relaciones sociales en el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero42+entero43+entero44+entero45+entero46)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >20.- Deficiente relación con los colaboradores que supervisa</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero69+entero70+entero71+entero72)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >21.- Violencia laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >22.- Escasa o nula retroalimentación del desempeño</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero47+entero48)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>

            <TableRow>
            <TableCell component="th" scope="row" >23.- Escaso o nulo reconocimiento y compensación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero49+entero50+entero51+entero52)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >24.- Limitado sentido de pertenencia</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero55+entero56)}</TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >25.- Inestabilidad laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" align="center"> {(entero53+entero54)}</TableCell>
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
                        pageNum
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
                            <MDBTable style = {{marginLeft:35}} component={Paper}  small borderless className="text-left mt-4 ">
                              
                                    <MDBTableBody>     
                            <font size="1"face="arial"color="black"> {localStorage.getItem("razonsocial")}</font><br></br>          
                            <font size="1"face="arial"color="black">{this.state.resultadosQuery[0].nombre} {this.state.resultadosQuery[0].ApellidoP} {this.state.resultadosQuery[0].ApellidoM}</font><br></br><br/>
                            <font size="3"face="arial"color="black">Diagnóstico individual de factores de riesgo psicosocial y evaluación de entorno organizacional en los centros de trabajo</font><br></br>
                            <font size="1"face="arial"color="black">{this.state.fecha}</font>
                            
                        
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
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                          
                              <font size="1"
                              face="arial"
                              color="black" style = {{marginTop:25,marginLeft:20}}>GUÍA DE REFERENCIA III
                              CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y
                              EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO</font>   <br/>  
                                
                                <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
                                    <MDBTableBody>
                                    <tr>
                                      <td width="40%"><font size="1" face="arial"color="black"><strong>{this.state.resultadosQuery[0].nombre} {this.state.resultadosQuery[0].ApellidoP} {this.state.resultadosQuery[0].ApellidoM}</strong></font></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                   </tr>
                                   <tr>
                                   <td width="40%"><font size="1" face="arial"color="black">RESULTADO DEL CUESTIONARIO :  </font></td>
                                   <td width="20%"><font size="1" face="arial"color="black">{total}</font></td>
                                   <td width="20%"><font size="1" face="arial"color="black">Nivel de riesgo </font></td>
                                    {color}
                                   </tr>                                  
                                   </MDBTableBody>
                                    </MDBTable>  
                                    <MDBTable  component={Paper}  style = {{marginLeft:20}} small  className="text-left mt-4 ">
                                    <MDBTableBody>
                                    <tr>
                                      <td ><font size="1" face="arial"color="black"><strong>Necesidad de la acción :</strong></font></td>
                                   </tr>         
                                   <tr>
                                   {criterios}
                                     </tr>                     
                                   </MDBTableBody>
                                    </MDBTable>  

                                   <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">I.- Resultados de la categoría</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                    <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Categoría</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
                                          <td width="20px"><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                        </tr>
                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
                                        <td width="60px"  className="text-left"><font size="1" face="arial"color="black">Ambiente de Trabajo</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{categoriaUno}</font></td>
                                         {colorCategoriaUno}                
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Factores propios de la actividad</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{categoriaDos}</font></td>
                                           {colorCategoriaDos}
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Organización del tiempo de trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{categoriaTre}</font></td>
                                          {colorCategoriaTre}
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Liderazgo y relaciones en el trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{categoriaCuatro}</font></td>
                                          {colorCategoriaCuatro}
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Entorno organizacional</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{categoriaCinco}</font></td>
                                          {colorCategoriaCinco}  
                                        </tr>
               
                                      </MDBTableBody>
                                      </MDBTable>
                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">II.- Resultados del dominio</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                      <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Dominio</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
                                          <td width="20px"><font size="1" face="arial"color="black">Riesgo</font></td>                                         
                                        </tr>
                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
                                        <td width="60px"  className="text-left"><font size="1" face="arial"color="black">Carga de Trabajo</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{DominioUno}</font></td>
                                         {colorDominioUno}                
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Condiciones en el ambiente de trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioDos}</font></td>
                                           {colorDominioDos}
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Falta de control sobre el trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioTres}</font></td>
                                          {colorDominioTres}
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Interferencia en la relación trabajo-familia</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioCuatro}</font></td>
                                          {colorDominioCuatro}
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Jornada de trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioCinco}</font></td>
                                          {colorDominioCinco}  
                                        </tr>
                                        
                                      </MDBTableBody>
                                      </MDBTable>
                                      <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >6</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Liderazgo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioSeis}</font></td>
                                          {colorDominioSeis}  
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >7</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Relaciones en el trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioSiete}</font></td>
                                          {colorDominioSiete}  
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >8</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Violencia</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioOcho}</font></td>
                                          {colorDominioOcho}  
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >9</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Reconocimiento del desempeño</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioNueve}</font></td>
                                          {colorDominioNueve}  
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >10</font></td>
                                          <td width="60px" className="text-left"><font size="1" face="arial"color="black">Insuficiente sentido de pertenencia e, inestabilidad</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{DominioDiez}</font></td>
                                          {colorDominioDiez}  
                                        </tr>
                                      </MDBTableBody>
                                      </MDBTable>

                                      <MDBTable  component={Paper}  small  className="text-left ">
                                     <MDBTableBody>
                                    <font color="red" style= {{marginTop:40,marginLeft:20}}  size="1">III.- Resultados por Dimensión</font>
                                    </MDBTableBody>                                                                            
                                    </MDBTable>
                                      <MDBTable style={{marginLeft:20}} component={Paper}  small bordered className="text-center"> 
                                      <MDBTableBody>
                                          
                                         <tr >                              
                                          <td width="5px"><font size="1" face="arial"color="black" ></font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Dimensión</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">Calificación</font></td>
                                        </tr>
                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >1</font></td>
                                        <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Condiciones peligrosas e inseguras</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{entero1+entero3}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >2</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Condiciones deficientes e insalubres</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero2+entero4}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >3</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Trabajos peligrosos</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero5}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >4</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas cuantitativas</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(entero6+entero12)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >5</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero7+entero8}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >6</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Carga mental</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero9+entero10+entero11}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >7</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas psicológicas emocionales</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(entero65+entero66+entero67+entero68)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >8</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Cargas de alta responsabilidad</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero13+entero14}</font></td>
                                        </tr>


                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >9</font></td>
                                        <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Cargas contradictorias o inconsistentes</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{entero15+entero16}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >10</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Falta de control y autonomía sobre el trabajo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero25+entero26+entero27+entero28}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >11</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o nula posibilidad de desarrollo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero23+entero24}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >12</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Insuficiente participación y manejo del cambio</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(entero29+entero30)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >13</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitada o inexistente capacitación</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero35+entero36}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >14</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Jornadas de trabajo extensas</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero17+entero18}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >15</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia del trabajo fuera del centro laboral</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(entero19+entero20)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >16</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Influencia de las responsabilidades familiares</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero21+entero22}</font></td>
                                        </tr>

                                        <tr>           
                                        <td width="5px"><font size="1" face="arial"color="black" >17</font></td>
                                        <td width="80px"  className="text-left"><font size="1" face="arial"color="black">Escasa claridad de funciones</font></td>
                                        <td width="15px"><font size="1" face="arial"color="black">{entero31+entero32+entero33+entero34}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >18</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Características del liderazgo</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero37+entero38+entero39+entero40+entero41}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >19</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black"></font>Relaciones sociales en el trabajo</td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero42+entero43+entero44+entero45+entero46}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >20</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Deficiente relación con los colaboradores que Supervisa</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(entero69+entero70+entero71+entero72)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >21</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Violencia laboral</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >22</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Escasa o nula retroalimentación del desempeño</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero47+entero48}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >23</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Escaso o nulo reconocimiento y compensación</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{(entero49+entero50+entero51+entero52)}</font></td>
                                          </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >24</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Limitado sentido de pertenencia</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero55+entero56}</font></td>
                                        </tr>
                                        <tr>         
                                          <td width="5px"><font size="1" face="arial"color="black" >25</font></td>
                                          <td width="80px" className="text-left"><font size="1" face="arial"color="black">Ritmos de trabajo acelerado</font></td>
                                          <td width="15px"><font size="1" face="arial"color="black">{entero53+entero54}</font></td>
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
                                      
                                   
                                     
 
                        </div>
                    </PDFExport>
                </div>
            </div>
    </React.Fragment>
 }

    return (
      <React.Fragment>    
      <TableContainer component={Paper}>
      <Table bordered>
        <TableBody>
          {this.state.datos.map(rows => {
            return (
              <TableRow >
                <TableCell component="th" scope="row">
                  {rows.id}
                </TableCell>
                <TableCell >{rows.nombre}</TableCell>
                <TableCell  >{rows.ApellidoP}</TableCell>
                <TableCell  >{rows.ApellidoM}</TableCell>
                <TableCell  >{rows.Curp}</TableCell>
                <TableCell  >{rows.rfc} </TableCell>
                <TableCell  ><MDBBtn color="danger"  onClick={(e) => this.click(rows.id)}>Respuestas</MDBBtn></TableCell>
                <TableCell  ><Button  color="secondary" onClick={(e) => this.getEvaluacion(rows.id)}>Resultados</Button></TableCell>
              </TableRow>
              
            );
          })}
        </TableBody>
          </Table>

          </TableContainer>

          {pdfView1}
          {pdfView2}
          <MDBContainer  style = {{marginTop:"5%"}}>
         <MDBRow>
           <MDBCol>
           {ponderacion}
           </MDBCol>
           </MDBRow> 
       
        </MDBContainer>

      </React.Fragment>
    );
  }
}

export default App
