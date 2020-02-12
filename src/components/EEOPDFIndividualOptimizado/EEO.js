import React, { Component } from 'react';
// import { render } from 'react-dom';
import './index.css';

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


import {Alert} from 'reactstrap'
class App extends Component {
  pdfExportComponent;
  constructor(props) {
    super(props);
    this.state = {
      datos:[],
      resultados:[],
      resultadosEvaluacion:[],
      getPonderacion:[],
      resultadosQuery:[],
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
    const url = 'http://localhost:8000/graphql'
    var correo  = localStorage.getItem("correo")   
    const idAdmin = localStorage.getItem("idAdmin")
    axios({
      url:  url,
      method:'post',
      data:{
      query:`
       query{
        getPeriodo(data:"${[idAdmin]}"){
          idEventos
          fk_administrador
          evento
              }
            }
          `
      }
    })
    .then(datos => {	
      axios({
        url:  url,
        method:'post',
        data:{
        query:`
        query{
          getUsersTableEmployeesthisPeriodoEEO(data:"${[idAdmin,datos.data.data.getPeriodo[0].evento]}"){
            id
            nombre
            ApellidoP
            ApellidoM
            Curp
            rfc
            FechaNacimiento
            Sexo
            cp
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
      }
        click(id){
        console.log("el id es " , id)
      
          const url = 'http://localhost:8000/graphql'
          axios({
            url:  url,
            method:'post',
            data:{
            query:`
              query{
              resultSingleSurveyEEO(data:"${[id]}"){
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
                  //  console.log("resultados" . this.state.resultados)
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
            const url = 'http://localhost:8000/graphql'
            axios({
              url:  url,
              method:'post',
              data:{
              query:`
                query{
                resultSingleSurveyEEO(data:"${[id]}"){
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
                  url:  url,
                  method:'post',
                  data:{
                  query:`
                    query{
                    getPonderacionEEO(data:"${[id]}"){
                      id
                      siempre
                      casisiempre
                      algunasveces
                      casinunca
                      nunca
                          }
                        }
                      `
                    }
                  }).then(datos => { 
                    this.setState({getPonderacion: datos.data.data.getPonderacionEEO})
                    console.log("ponderaciones",datos.data.data.getPonderacionEEO)
                  })
                  .catch(err => {
                    console.log("el error es  ",err.response)
                  });
                              
            axios({
              url:  url,
              method:'post',
              data:{
              query:`
                query{
                resultSingleSurveyEEO(data:"${[id]}"){
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
                    this.setState({resultadosQuery :datos.data.data.resultSingleSurveyEEO })                
                    console.log("los resultadosQuery",this.state.resultadosQuery )
                  })
                  .catch(err => {
                    console.log("el error es  ",err)
                  });  
                    }

  render() {
    const container = { marginLeft:20}
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
          <font face="arial" className = "mt-4" >CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO</font>
          <br/><strong>{localStorage.getItem("razonsocial")}</strong><br/>
          <font face="arial" className = "mt-4 " >  <img ref={(image) => this.image = image} src="http://www.ads.com.mx/_Media/logotipo_ads_png_med.png" width="100px"
                /></font>
                <MDBContainer style={container}>
                <MDBTable responsive small borderless className="text-left mt-4 ">
       
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
                
                <MDBContainer>
                <MDBTable small borderless className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th width="10px"></th>
                      <th width="150px">I. Condiciones ambientales de su centro de trabajo.</th>    
                      <td width="60px"></td>   
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td width="10px">1</td>
                      <td>El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</td>
                      <td >{this.state.resultados[1].Respuestas}</td> 
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
                      <th></th>
                      <th  width="10px">II. La cantidad y ritmo de trabajo que tiene.</th>       
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
                      <th></th>
                      <th>III. El esfuerzo mental que le exige su trabajo.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>9</td>
                      <td>Mi trabajo exige que esté muy concentrado</td> 
                      <td >{this.state.resultados[9].Respuestas}</td> 
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
                      <th></th>
                      <th>IV. Trabajo y las responsabilidades que tiene.</th>       
                      <td ></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>13</td>
                      <td>En mi trabajo soy responsable de cosas de mucho valor</td>   
                      <td >{this.state.resultados[13].Respuestas}</td> 
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
                      <th></th>
                      <th>V. Jornada de trabajo.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>17</td>
                      <td>Trabajo horas extras más de tres veces a la semana</td>   
                      <td>{this.state.resultados[17].Respuestas}</td> 
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
                      <th  width="10px"></th>
                      <th  width="150px">VI. Decisiones que puede tomar en su trabajo.</th>       
                      <td  width="60px"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>23</td>
                      <td>Mi trabajo permite que desarrolle nuevas habilidades</td>   
                      <td>{this.state.resultados[23].Respuestas}</td> 
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
                      <td>26</td>
                      <td>Puedo decidir cuánto trabajo realizo durante la jornada laboral</td>   
                      <td>{this.state.resultados[26].Respuestas}</td> 
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
                      <th width="10px"></th>
                      <th width="150px">VII. Cualquier tipo de cambio que ocurra en su trabajo (considere los últimos cambios realizados).</th>       
                      <td width="60px"> </td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td  width="10px">29</td>
                      <td  width="150px">Los cambios que se presentan en mi trabajo dificultan mi labor</td>   
                      <td  width="60px">{this.state.resultados[29].Respuestas}</td> 
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
                      <th></th>
                      <th>VIII. capacitación e información que se le proporciona sobre su trabajo.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>31</td>
                      <td>Me informan con claridad cuáles son mis funciones</td>   
                      <td>{this.state.resultados[31].Respuestas}</td> 
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
                      <th></th>
                      <th>IX. Jefes con quien tiene contacto.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>37</td>
                      <td>Mi jefe ayuda a organizar mejor el trabajo</td>   
                      <td>{this.state.resultados[37].Respuestas}</td> 
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
                      <th></th>
                      <th>X. Relaciones con sus compañeros.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td>42</td>
                      <td>Puedo confiar en mis compañeros de trabajo</td>   
                      <td>{this.state.resultados[42].Respuestas}</td> 
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
                      <th  width="10px"></th>
                      <th  width="150px">XI. Información que recibe sobre su rendimiento en el trabajo, el reconocimiento, el sentido de pertenencia y la estabilidad que le ofrece su trabajo.</th>       
                      <td  width="60px"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td>47</td>
                      <td>Me informan sobre lo que hago bien en mi trabajo</td>   
                      <td>{this.state.resultados[47].Respuestas}</td> 
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
                  </MDBTableBody>

                  <MDBTableHead>
                    <tr>
                      <th width="10%"></th>
                      <th width="150%">XII. Actos de violencia laboral (malos tratos, acoso, hostigamiento, acoso psicológico).</th>       
                      <td width="60%"></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td>57</td>
                      <td>En mi trabajo puedo expresarme libremente sin interrupciones</td>   
                      <td>{this.state.resultados[57].Respuestas}</td> 
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
                      <th></th>
                      <th>XIII. Atención a clientes y usuarios.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td>65</td>
                      <td>Atiendo clientes o usuarios muy enojados</td>   
                      <td>{this.state.resultados[65].Respuestas}</td> 
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
                      <th></th>
                      <th>XIV.  Las actitudes de las personas que supervisa.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td>69</td>
                      <td>Comunican tarde los asuntos de trabajo</td>   
                      <td>{this.state.resultados[69].Respuestas}</td> 
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
 
let valor1=0,valor2=0,valor3=0,valor4=0,valor5=0,valor6=0,valor7=0, valor8=0,valor9=0,valor10=0;
let valor11=0,valor12=0,valor13=0,valor14=0,valor15=0,valor16=0,valor17=0, valor18=0,valor19=0,valor20=0;
let valor21=0,valor22=0,valor23=0,valor24=0,valor25=0,valor26=0,valor27=0, valor28=0,valor29=0,valor30=0;
let valor31=0,valor32=0,valor33=0,valor34=0,valor35=0,valor36=0,valor37=0, valor38=0,valor39=0,valor40=0;
let valor41=0,valor42=0,valor43=0,valor44=0,valor45=0,valor46=0,valor47=0,valor48=0,valor49=0,valor50=0,valor51=0;
let valor52=0,valor53=0,valor54=0,valor55=0,valor56=0,valor57=0,valor58=0,valor59=0,valor60=0,valor61=0;
let valor62=0,valor63=0,valor64=0,valor65=0,valor66=0,valor67=0,valor68=0,valor69=0,valor70=0,valor71=0,valor72=0;

// console.log("esta es la validacion",this.state.getPonderacion,this.state.resultadosEvaluacion.length,this.state.resultadosQuery.length>0)
 if(this.state.getPonderacion[3]  && this.state.resultadosEvaluacion.length > 0 && this.state.resultadosQuery.length>0){
  let respuesta1;
  let respuesta2;
  let respuesta3;
  let respuesta4;
  let respuesta5;
  
  console.log("la ponderacion es " ,this.state.getPonderacion)
  if(this.state.resultadosEvaluacion[1].Respuestas=="Siempre"){
  respuesta1="Siempre"
  valor1= this.state.getPonderacion[0].siempre
  }else if(this.state.resultadosEvaluacion[1].Respuestas=="CasiSiempre"){
    respuesta2="Casi Siempre"
    valor1= this.state.getPonderacion[0].casisiempre
  }
  else if(this.state.resultadosEvaluacion[1].Respuestas=="AlgunasVeces"){
    respuesta3="Algunas Veces"
    valor1= this.state.getPonderacion[0].algunasveces
  } 
  else if(this.state.resultadosEvaluacion[1].Respuestas=="CasiNunca"){
    respuesta4="Casi Nunca"
    valor1= this.state.getPonderacion[0].casinunca
  } 
  else if(this.state.resultadosEvaluacion[1].Respuestas=="Nunca"){
    respuesta5="Nunca"
    valor1= this.state.getPonderacion[0].nunca
  } 
    let respuesta6;
    let respuesta7;
    let respuesta8;
    let respuesta9;
    let respuesta10;
    if(this.state.resultadosEvaluacion[2].Respuestas=="Siempre"){
    respuesta6="Siempre"
    valor2= this.state.getPonderacion[1].siempre
    }else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiSiempre"){
      respuesta7="Casi Siempre"
      valor2= this.state.getPonderacion[1].casisiempre
    }
    else if(this.state.resultadosEvaluacion[2].Respuestas=="AlgunasVeces"){
      respuesta8="Algunas Veces"
      valor2= this.state.getPonderacion[1].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[2].Respuestas=="CasiNunca"){
      respuesta9="Casi Nunca"
      valor2= this.state.getPonderacion[1].casinunca
    } 
    else if(this.state.resultadosEvaluacion[2].Respuestas=="Nunca"){
      respuesta10="Nunca"
      valor2= this.state.getPonderacion[1].nunca
    } 
  
    let respuesta11;
    let respuesta12;
    let respuesta13;
    let respuesta14;
    let respuesta15;
    if(this.state.resultadosEvaluacion[3].Respuestas=="Siempre"){
    respuesta11="Siempre"
    valor3= this.state.getPonderacion[2].siempre
    }else if(this.state.resultadosEvaluacion[3].Respuestas=="CasiSiempre"){
      respuesta12="Casi Siempre"
      valor3= this.state.getPonderacion[2].casisiempre
    }
    else if(this.state.resultadosEvaluacion[3].Respuestas=="AlgunasVeces"){
      respuesta13="Algunas Veces"
      valor3= this.state.getPonderacion[2].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[3].Respuestas=="CasiNunca"){
      respuesta14="Casi Nunca"
      valor3= this.state.getPonderacion[2].casinunca
    } 
    else if(this.state.resultadosEvaluacion[3].Respuestas=="Nunca"){
      respuesta15="Nunca"
      valor3= this.state.getPonderacion[2].nunca
    } 

    console.log("valor 3" , this.state.resultadosEvaluacion[3].Respuestas)

    let respuesta16;
    let respuesta17;
    let respuesta18;
    let respuesta19;
    let respuesta20;
    if(this.state.resultadosEvaluacion[4].Respuestas=="Siempre"){
    respuesta16="Siempre"
    valor4= this.state.getPonderacion[3].siempre
    }else if(this.state.resultadosEvaluacion[4].Respuestas=="CasiSiempre"){
      respuesta17="Casi Siempre"
      valor4= this.state.getPonderacion[3].casisiempre
    }
    else if(this.state.resultadosEvaluacion[4].Respuestas=="AlgunasVeces"){
      respuesta18="Algunas Veces"
      valor4= this.state.getPonderacion[3].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[4].Respuestas=="CasiNunca"){
      respuesta19="Casi Nunca"
      valor4= this.state.getPonderacion[3].casinunca
    } 
    else if(this.state.resultadosEvaluacion[4].Respuestas=="Nunca"){
      respuesta20="Nunca"
      valor4= this.state.getPonderacion[3].nunca
    } 
    let respuesta21;
    let respuesta22;
    let respuesta23;
    let respuesta24;
    let respuesta25;
    if(this.state.resultadosEvaluacion[5].Respuestas=="Siempre"){
    respuesta21="Siempre"
    valor5= this.state.getPonderacion[4].siempre
    }else if(this.state.resultadosEvaluacion[5].Respuestas=="CasiSiempre"){
      respuesta22="Casi Siempre"
      valor5= this.state.getPonderacion[4].casisiempre
    }
    else if(this.state.resultadosEvaluacion[5].Respuestas=="AlgunasVeces"){
      respuesta23="Algunas Veces"
      valor5= this.state.getPonderacion[4].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[5].Respuestas=="CasiNunca"){
      respuesta24="Casi Nunca"
      valor5= this.state.getPonderacion[4].casinunca
    } 
    else if(this.state.resultadosEvaluacion[5].Respuestas=="Nunca"){
      respuesta25="Nunca"
      valor5= this.state.getPonderacion[4].nunca
    } 
    let respuesta26;
    let respuesta27;
    let respuesta28;
    let respuesta29;
    let respuesta30;
    if(this.state.resultadosEvaluacion[6].Respuestas=="Siempre"){
    respuesta26="Siempre"
    valor6= this.state.getPonderacion[5].siempre
    }else if(this.state.resultadosEvaluacion[6].Respuestas=="CasiSiempre"){
      respuesta27="Casi Siempre"
      valor6= this.state.getPonderacion[5].casisiempre
    }
    else if(this.state.resultadosEvaluacion[6].Respuestas=="AlgunasVeces"){
      respuesta28="Algunas Veces"
      valor6= this.state.getPonderacion[5].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[6].Respuestas=="CasiNunca"){
      respuesta29="Casi Nunca"
      valor6= this.state.getPonderacion[5].casinunca
    } 
    else if(this.state.resultadosEvaluacion[6].Respuestas=="Nunca"){
      respuesta30="Nunca"
      valor6= this.state.getPonderacion[5].nunca
    }
    let respuesta31;
    let respuesta32;
    let respuesta33;
    let respuesta34;
    let respuesta35;
    if(this.state.resultadosEvaluacion[7].Respuestas=="Siempre"){
    respuesta31="Siempre"
    valor7= this.state.getPonderacion[6].siempre
    }else if(this.state.resultadosEvaluacion[7].Respuestas=="CasiSiempre"){
      respuesta32="Casi Siempre"
      valor7= this.state.getPonderacion[6].casisiempre
    }
    else if(this.state.resultadosEvaluacion[7].Respuestas=="AlgunasVeces"){
      respuesta33="Algunas Veces"
      valor7= this.state.getPonderacion[6].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[7].Respuestas=="CasiNunca"){
      respuesta34="Casi Nunca"
      valor7= this.state.getPonderacion[6].casinunca
    } 
    else if(this.state.resultadosEvaluacion[7].Respuestas=="Nunca"){
      respuesta35="Nunca"
      valor7= this.state.getPonderacion[6].nunca
    }
    let respuesta36;
    let respuesta37;
    let respuesta38;
    let respuesta39;
    let respuesta40;
    if(this.state.resultadosEvaluacion[8].Respuestas=="Siempre"){
    respuesta36="Siempre"
    valor8= this.state.getPonderacion[7].siempre
    }else if(this.state.resultadosEvaluacion[8].Respuestas=="CasiSiempre"){
      respuesta37="Casi Siempre"
      valor8= this.state.getPonderacion[7].casisiempre
    }
    else if(this.state.resultadosEvaluacion[8].Respuestas=="AlgunasVeces"){
      respuesta38="Algunas Veces"
      valor8= this.state.getPonderacion[7].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[8].Respuestas=="CasiNunca"){
      respuesta39="Casi Nunca"
      valor8= this.state.getPonderacion[7].casinunca
    } 
    else if(this.state.resultadosEvaluacion[8].Respuestas=="Nunca"){
      respuesta40="Nunca"
      valor8= this.state.getPonderacion[7].nunca
    }
    let respuesta41;
    let respuesta42;
    let respuesta43;
    let respuesta44;
    let respuesta45;
    if(this.state.resultadosEvaluacion[9].Respuestas=="Siempre"){
    respuesta41="Siempre"
    valor9= this.state.getPonderacion[8].siempre
    }else if(this.state.resultadosEvaluacion[9].Respuestas=="CasiSiempre"){
      respuesta42="Casi Siempre"
      valor9= this.state.getPonderacion[8].casisiempre
    }
    else if(this.state.resultadosEvaluacion[9].Respuestas=="AlgunasVeces"){
      respuesta43="Algunas Veces"
      valor9= this.state.getPonderacion[8].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[9].Respuestas=="CasiNunca"){
      respuesta44="Casi Nunca"
      valor9= this.state.getPonderacion[8].casinunca
    } 
    else if(this.state.resultadosEvaluacion[9].Respuestas=="Nunca"){
      respuesta45="Nunca"
      valor9= this.state.getPonderacion[8].nunca
    }
    let respuesta46;
    let respuesta47;
    let respuesta48;
    let respuesta49;
    let respuesta50;
    if(this.state.resultadosEvaluacion[10].Respuestas=="Siempre"){
    respuesta46="Siempre"
    valor10= this.state.getPonderacion[9].siempre
    }else if(this.state.resultadosEvaluacion[10].Respuestas=="CasiSiempre"){
      respuesta47="Casi Siempre"
      valor10= this.state.getPonderacion[9].casisiempre
    }
    else if(this.state.resultadosEvaluacion[10].Respuestas=="AlgunasVeces"){
      respuesta48="Algunas Veces"
      valor10= this.state.getPonderacion[9].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[10].Respuestas=="CasiNunca"){
      respuesta49="Casi Nunca"
      valor10= this.state.getPonderacion[9].casinunca
    } 
    else if(this.state.resultadosEvaluacion[10].Respuestas=="Nunca"){
      respuesta50="Nunca"
      valor10= this.state.getPonderacion[9].nunca
    }
    ///////////////////////////////////////////////////////////////////////7
  let respuesta51;
  let respuesta52;
  let respuesta53;
  let respuesta54;
  let respuesta55;
  if(this.state.resultadosEvaluacion[11].Respuestas=="Siempre"){
  respuesta51="Siempre"
  valor11= this.state.getPonderacion[10].siempre
  }else if(this.state.resultadosEvaluacion[11].Respuestas=="CasiSiempre"){
    respuesta52="Casi Siempre"
    valor11= this.state.getPonderacion[10].casisiempre
  }
  else if(this.state.resultadosEvaluacion[11].Respuestas=="AlgunasVeces"){
    respuesta53="Algunas Veces"
    valor11= this.state.getPonderacion[10].algunasveces
  } 
  else if(this.state.resultadosEvaluacion[11].Respuestas=="CasiNunca"){
    respuesta54="Casi Nunca"
    valor11= this.state.getPonderacion[10].casinunca
  } 
  else if(this.state.resultadosEvaluacion[11].Respuestas=="Nunca"){
    respuesta55="Nunca"
    valor11= this.state.getPonderacion[10].nunca
  } let respuesta56;
    let respuesta57;
    let respuesta58;
    let respuesta59;
    let respuesta60;
    if(this.state.resultadosEvaluacion[12].Respuestas=="Siempre"){
    respuesta56="Siempre"
    valor12= this.state.getPonderacion[11].siempre
    }else if(this.state.resultadosEvaluacion[12].Respuestas=="CasiSiempre"){
      respuesta57="Casi Siempre"
      valor12= this.state.getPonderacion[11].casisiempre
    }
    else if(this.state.resultadosEvaluacion[12].Respuestas=="AlgunasVeces"){
      respuesta58="Algunas Veces"
      valor12= this.state.getPonderacion[11].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[12].Respuestas=="CasiNunca"){
      respuesta59="Casi Nunca"
      valor12= this.state.getPonderacion[11].casinunca
    } 
    else if(this.state.resultadosEvaluacion[12].Respuestas=="Nunca"){
      respuesta60="Nunca"
      valor12= this.state.getPonderacion[11].nunca
    } 
    let respuesta61;
    let respuesta62;
    let respuesta63;
    let respuesta64;
    let respuesta65;
    if(this.state.resultadosEvaluacion[13].Respuestas=="Siempre"){
    respuesta61="Siempre"
    valor13= this.state.getPonderacion[12].siempre
    }else if(this.state.resultadosEvaluacion[13].Respuestas=="CasiSiempre"){
      respuesta62="Casi Siempre"
      valor13= this.state.getPonderacion[12].casisiempre
    }
    else if(this.state.resultadosEvaluacion[13].Respuestas=="AlgunasVeces"){
      respuesta63="Algunas Veces"
      valor13= this.state.getPonderacion[12].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[13].Respuestas=="CasiNunca"){
      respuesta64="Casi Nunca"
      valor13= this.state.getPonderacion[12].casinunca
    } 
    else if(this.state.resultadosEvaluacion[13].Respuestas=="Nunca"){
      respuesta65="Nunca"
      valor13= this.state.getPonderacion[12].nunca
    } 
    let respuesta66;
    let respuesta67;
    let respuesta68;
    let respuesta69;
    let respuesta70;
    if(this.state.resultadosEvaluacion[14].Respuestas=="Siempre"){
    respuesta66="Siempre"
    valor14= this.state.getPonderacion[13].siempre
    }else if(this.state.resultadosEvaluacion[14].Respuestas=="CasiSiempre"){
      respuesta67="Casi Siempre"
      valor14= this.state.getPonderacion[13].casisiempre
    }
    else if(this.state.resultadosEvaluacion[14].Respuestas=="AlgunasVeces"){
      respuesta68="Algunas Veces"
      valor14= this.state.getPonderacion[13].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[14].Respuestas=="CasiNunca"){
      respuesta69="Casi Nunca"
      valor14= this.state.getPonderacion[13].casinunca
    } 
    else if(this.state.resultadosEvaluacion[14].Respuestas=="Nunca"){
      respuesta70="Nunca"
      valor14= this.state.getPonderacion[13].nunca
    } 
    let respuesta71;
    let respuesta72;
    let respuesta73;
    let respuesta74;
    let respuesta75;
    if(this.state.resultadosEvaluacion[15].Respuestas=="Siempre"){
    respuesta71="Siempre"
    valor15= this.state.getPonderacion[14].siempre
    }else if(this.state.resultadosEvaluacion[15].Respuestas=="CasiSiempre"){
      respuesta72="Casi Siempre"
      valor15= this.state.getPonderacion[14].casisiempre
    }
    else if(this.state.resultadosEvaluacion[15].Respuestas=="AlgunasVeces"){
      respuesta73="Algunas Veces"
      valor15= this.state.getPonderacion[14].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[15].Respuestas=="CasiNunca"){
      respuesta74="Casi Nunca"
      valor15= this.state.getPonderacion[14].casinunca
    } 
    else if(this.state.resultadosEvaluacion[15].Respuestas=="Nunca"){
      respuesta75="Nunca"
      valor15= this.state.getPonderacion[14].nunca
    } 
    let respuesta76;
    let respuesta77;
    let respuesta78;
    let respuesta79;
    let respuesta80;
    if(this.state.resultadosEvaluacion[16].Respuestas=="Siempre"){
    respuesta76="Siempre"
    valor16= this.state.getPonderacion[15].siempre
    }else if(this.state.resultadosEvaluacion[16].Respuestas=="CasiSiempre"){
      respuesta77="Casi Siempre"
      valor16= this.state.getPonderacion[15].casisiempre
    }
    else if(this.state.resultadosEvaluacion[16].Respuestas=="AlgunasVeces"){
      respuesta78="Algunas Veces"
      valor16= this.state.getPonderacion[15].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[16].Respuestas=="CasiNunca"){
      respuesta79="Casi Nunca"
      valor16= this.state.getPonderacion[15].casinunca
    } 
    else if(this.state.resultadosEvaluacion[16].Respuestas=="Nunca"){
      respuesta80="Nunca"
      valor16= this.state.getPonderacion[15].nunca
    }
    let respuesta81;
    let respuesta82;
    let respuesta83;
    let respuesta84;
    let respuesta85;
    if(this.state.resultadosEvaluacion[17].Respuestas=="Siempre"){
    respuesta81="Siempre"
    valor17= this.state.getPonderacion[16].siempre
    }else if(this.state.resultadosEvaluacion[17].Respuestas=="CasiSiempre"){
      respuesta82="Casi Siempre"
      valor17= this.state.getPonderacion[16].casisiempre
    }
    else if(this.state.resultadosEvaluacion[17].Respuestas=="AlgunasVeces"){
      respuesta83="Algunas Veces"
      valor17= this.state.getPonderacion[16].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[17].Respuestas=="CasiNunca"){
      respuesta84="Casi Nunca"
      valor17= this.state.getPonderacion[16].casinunca
    } 
    else if(this.state.resultadosEvaluacion[17].Respuestas=="Nunca"){
      respuesta85="Nunca"
      valor17= this.state.getPonderacion[16].nunca
    }
    let respuesta86;
    let respuesta87;
    let respuesta88;
    let respuesta89;
    let respuesta90;
    if(this.state.resultadosEvaluacion[18].Respuestas=="Siempre"){
    respuesta86="Siempre"
    valor18= this.state.getPonderacion[17].siempre
    }else if(this.state.resultadosEvaluacion[18].Respuestas=="CasiSiempre"){
      respuesta87="Casi Siempre"
      valor18= this.state.getPonderacion[17].casisiempre
    }
    else if(this.state.resultadosEvaluacion[18].Respuestas=="AlgunasVeces"){
      respuesta88="Algunas Veces"
      valor18= this.state.getPonderacion[17].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[18].Respuestas=="CasiNunca"){
      respuesta89="Casi Nunca"
      valor18= this.state.getPonderacion[17].casinunca
    } 
    else if(this.state.resultadosEvaluacion[18].Respuestas=="Nunca"){
      respuesta90="Nunca"
      valor18= this.state.getPonderacion[17].nunca
    }
    let respuesta91;
    let respuesta92;
    let respuesta93;
    let respuesta94;
    let respuesta95;
    if(this.state.resultadosEvaluacion[19].Respuestas=="Siempre"){
    respuesta91="Siempre"
    valor19= this.state.getPonderacion[18].siempre
    }else if(this.state.resultadosEvaluacion[19].Respuestas=="CasiSiempre"){
      respuesta92="Casi Siempre"
      valor19= this.state.getPonderacion[18].casisiempre
    }
    else if(this.state.resultadosEvaluacion[19].Respuestas=="AlgunasVeces"){
      respuesta93="Algunas Veces"
      valor19= this.state.getPonderacion[18].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[19].Respuestas=="CasiNunca"){
      respuesta94="Casi Nunca"
      valor19= this.state.getPonderacion[18].casinunca
    } 
    else if(this.state.resultadosEvaluacion[19].Respuestas=="Nunca"){
      respuesta95="Nunca"
      valor19= this.state.getPonderacion[18].nunca
    }
    let respuesta96;
    let respuesta97;
    let respuesta98;
    let respuesta99;
    let respuesta100;
    if(this.state.resultadosEvaluacion[20].Respuestas=="Siempre"){
    respuesta96="Siempre"
    valor20= this.state.getPonderacion[19].siempre
    }else if(this.state.resultadosEvaluacion[20].Respuestas=="CasiSiempre"){
      respuesta97="Casi Siempre"
      valor20= this.state.getPonderacion[19].casisiempre
    }
    else if(this.state.resultadosEvaluacion[20].Respuestas=="AlgunasVeces"){
      respuesta98="Algunas Veces"
      valor20= this.state.getPonderacion[19].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[20].Respuestas=="CasiNunca"){
      respuesta99="Casi Nunca"
      valor20= this.state.getPonderacion[19].casinunca
    } 
    else if(this.state.resultadosEvaluacion[20].Respuestas=="Nunca"){
      respuesta100="Nunca"
      valor20= this.state.getPonderacion[19].nunca
    }
  
    ///////////////////////////////////////////////////////////////////////////
  
  let respuesta101;
  let respuesta102;
  let respuesta103;
  let respuesta104;
  let respuesta105;
  if(this.state.resultadosEvaluacion[21].Respuestas=="Siempre"){
  respuesta101="Siempre"
  valor21= this.state.getPonderacion[20].siempre
  }else if(this.state.resultadosEvaluacion[21].Respuestas=="CasiSiempre"){
    respuesta102="Casi Siempre"
    valor21= this.state.getPonderacion[20].casisiempre
  }
  else if(this.state.resultadosEvaluacion[21].Respuestas=="AlgunasVeces"){
    respuesta103="Algunas Veces"
    valor21= this.state.getPonderacion[20].algunasveces
  } 
  else if(this.state.resultadosEvaluacion[21].Respuestas=="CasiNunca"){
    respuesta104="Casi Nunca"
    valor21= this.state.getPonderacion[20].casinunca
  } 
  else if(this.state.resultadosEvaluacion[21].Respuestas=="Nunca"){
    respuesta105="Nunca"
    valor21= this.state.getPonderacion[20].nunca
  } 
    let respuesta106;
    let respuesta107;
    let respuesta108;
    let respuesta109;
    let respuesta110;

    if(this.state.resultadosEvaluacion[22].Respuestas=="Siempre"){
    respuesta106="Siempre"
    valor22= this.state.getPonderacion[21].siempre

    }else if(this.state.resultadosEvaluacion[22].Respuestas=="CasiSiempre"){
      respuesta107="Casi Siempre"
      valor22= this.state.getPonderacion[21].casisiempre
    }
    else if(this.state.resultadosEvaluacion[22].Respuestas=="AlgunasVeces"){
      respuesta108="Algunas Veces"
      valor22= this.state.getPonderacion[21].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[22].Respuestas=="CasiNunca"){
      respuesta109="Casi Nunca"
      valor22= this.state.getPonderacion[21].casinunca
    } 
    else if(this.state.resultadosEvaluacion[22].Respuestas=="Nunca"){
      respuesta110="Nunca"
      valor22= this.state.getPonderacion[21].nunca
    } 


    let respuesta111;
    let respuesta112;
    let respuesta113;
    let respuesta114;
    let respuesta115;
    if(this.state.resultadosEvaluacion[23].Respuestas=="Siempre"){
    respuesta111="Siempre"
    valor23= this.state.getPonderacion[22].siempre
    }else if(this.state.resultadosEvaluacion[23].Respuestas=="CasiSiempre"){
      respuesta112="Casi Siempre"
      valor23= this.state.getPonderacion[22].casisiempre
    }
    else if(this.state.resultadosEvaluacion[23].Respuestas=="AlgunasVeces"){
      respuesta113="Algunas Veces"
      valor23= this.state.getPonderacion[22].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[23].Respuestas=="CasiNunca"){
      respuesta114="Casi Nunca"
      valor23= this.state.getPonderacion[22].casinunca
    } 
    else if(this.state.resultadosEvaluacion[23].Respuestas=="Nunca"){
      respuesta115="Nunca"
      valor23= this.state.getPonderacion[22].nunca
    } 
    let respuesta116;
    let respuesta117;
    let respuesta118;
    let respuesta119;
    let respuesta120;
    if(this.state.resultadosEvaluacion[24].Respuestas=="Siempre"){
    respuesta116="Siempre"
    valor24= this.state.getPonderacion[23].siempre
    }else if(this.state.resultadosEvaluacion[24].Respuestas=="CasiSiempre"){
      respuesta117="Casi Siempre"
      valor24= this.state.getPonderacion[23].casisiempre
    }
    else if(this.state.resultadosEvaluacion[24].Respuestas=="AlgunasVeces"){
      respuesta118="Algunas Veces"
      valor24= this.state.getPonderacion[23].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[24].Respuestas=="CasiNunca"){
      respuesta119="Casi Nunca"
      valor24= this.state.getPonderacion[23].casinunca
    } 
    else if(this.state.resultadosEvaluacion[24].Respuestas=="Nunca"){
      respuesta120="Nunca"
      valor24= this.state.getPonderacion[23].nunca
    } 
    let respuesta121;
    let respuesta122;
    let respuesta123;
    let respuesta124;
    let respuesta125;
    if(this.state.resultadosEvaluacion[25].Respuestas=="Siempre"){
    respuesta121="Siempre"
    valor25= this.state.getPonderacion[24].siempre
    }else if(this.state.resultadosEvaluacion[25].Respuestas=="CasiSiempre"){
      respuesta122="Casi Siempre"
      valor25= this.state.getPonderacion[24].casisiempre
    }
    else if(this.state.resultadosEvaluacion[25].Respuestas=="AlgunasVeces"){
      respuesta123="Algunas Veces"
      valor25= this.state.getPonderacion[24].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[25].Respuestas=="CasiNunca"){
      respuesta124="Casi Nunca"
      valor25= this.state.getPonderacion[24].casinunca
    } 
    else if(this.state.resultadosEvaluacion[25].Respuestas=="Nunca"){
      respuesta125="Nunca"
      valor25= this.state.getPonderacion[24].nunca
    } 
  
    let respuesta126;
    let respuesta127;
    let respuesta128;
    let respuesta129;
    let respuesta130;
    if(this.state.resultadosEvaluacion[26].Respuestas=="Siempre"){
    respuesta126="Siempre"
    valor26= this.state.getPonderacion[25].siempre
    }else if(this.state.resultadosEvaluacion[26].Respuestas=="CasiSiempre"){
      respuesta127="Casi Siempre"
      valor26= this.state.getPonderacion[25].casisiempre
    }
    else if(this.state.resultadosEvaluacion[26].Respuestas=="AlgunasVeces"){
      respuesta128="Algunas Veces"
      valor26= this.state.getPonderacion[25].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[26].Respuestas=="CasiNunca"){
      respuesta129="Casi Nunca"
      valor26= this.state.getPonderacion[25].casinunca
    } 
    else if(this.state.resultadosEvaluacion[26].Respuestas=="Nunca"){
      respuesta130="Nunca"
      valor26= this.state.getPonderacion[25].nunca
    }
    let respuesta131;
    let respuesta132;
    let respuesta133;
    let respuesta134;
    let respuesta135;
    if(this.state.resultadosEvaluacion[27].Respuestas=="Siempre"){
    respuesta131="Siempre"
    valor27= this.state.getPonderacion[26].siempre
    }else if(this.state.resultadosEvaluacion[27].Respuestas=="CasiSiempre"){
      respuesta132="Casi Siempre"
      valor27= this.state.getPonderacion[26].casisiempre
    }
    else if(this.state.resultadosEvaluacion[27].Respuestas=="AlgunasVeces"){
      respuesta133="Algunas Veces"
      valor27= this.state.getPonderacion[26].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[27].Respuestas=="CasiNunca"){
      respuesta134="Casi Nunca"
      valor27= this.state.getPonderacion[26].casinunca
    } 
    else if(this.state.resultadosEvaluacion[27].Respuestas=="Nunca"){
      respuesta135="Nunca"
      valor27= this.state.getPonderacion[26].nunca
    }
    let respuesta136;
    let respuesta137;
    let respuesta138;
    let respuesta139;
    let respuesta140;
    if(this.state.resultadosEvaluacion[28].Respuestas=="Siempre"){
    respuesta136="Siempre"
    valor28= this.state.getPonderacion[27].siempre
    }else if(this.state.resultadosEvaluacion[28].Respuestas=="CasiSiempre"){
      respuesta137="Casi Siempre"
      valor28= this.state.getPonderacion[27].casisiempre
    }
    else if(this.state.resultadosEvaluacion[28].Respuestas=="AlgunasVeces"){
      respuesta138="Algunas Veces"
      valor28= this.state.getPonderacion[27].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[28].Respuestas=="CasiNunca"){
      respuesta139="Casi Nunca"
      valor28= this.state.getPonderacion[27].casinunca
    } 
    else if(this.state.resultadosEvaluacion[28].Respuestas=="Nunca"){
      respuesta140="Nunca"
      valor28= this.state.getPonderacion[27].nunca
    }
    let respuesta141;
    let respuesta142;
    let respuesta143;
    let respuesta144;
    let respuesta145;
    if(this.state.resultadosEvaluacion[29].Respuestas=="Siempre"){
    respuesta141="Siempre"
    valor29= this.state.getPonderacion[28].siempre
    }else if(this.state.resultadosEvaluacion[29].Respuestas=="CasiSiempre"){
      respuesta142="Casi Siempre"
      valor29= this.state.getPonderacion[28].casisiempre
    }
    else if(this.state.resultadosEvaluacion[29].Respuestas=="AlgunasVeces"){
      respuesta143="Algunas Veces"
      valor29= this.state.getPonderacion[28].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[29].Respuestas=="CasiNunca"){
      respuesta144="Casi Nunca"
      valor29= this.state.getPonderacion[28].casinunca
    } 
    else if(this.state.resultadosEvaluacion[29].Respuestas=="Nunca"){
      respuesta145="Nunca"
      valor29= this.state.getPonderacion[28].nunca
    }
    let respuesta146;
    let respuesta147;
    let respuesta148;
    let respuesta149;
    let respuesta150;
    if(this.state.resultadosEvaluacion[30].Respuestas=="Siempre"){
    respuesta146="Siempre"
    valor30= this.state.getPonderacion[29].siempre
    }else if(this.state.resultadosEvaluacion[30].Respuestas=="CasiSiempre"){
      respuesta147="Casi Siempre"
      valor30= this.state.getPonderacion[29].casisiempre
    }
    else if(this.state.resultadosEvaluacion[30].Respuestas=="AlgunasVeces"){
      respuesta148="Algunas Veces"
      valor30= this.state.getPonderacion[29].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[30].Respuestas=="CasiNunca"){
      respuesta149="Casi Nunca"
      valor30= this.state.getPonderacion[29].casinunca
    } 
    else if(this.state.resultadosEvaluacion[30].Respuestas=="Nunca"){
      respuesta150="Nunca"
      valor30= this.state.getPonderacion[29].nunca
    }
  
    ///////////////////////////////////////////////////////////////
  
  let respuesta151;
  let respuesta152;
  let respuesta153;
  let respuesta154;
  let respuesta155;
  if(this.state.resultadosEvaluacion[31].Respuestas=="Siempre"){
  respuesta151="Siempre"
  valor31= this.state.getPonderacion[30].siempre
  }else if(this.state.resultadosEvaluacion[31].Respuestas=="CasiSiempre"){
    respuesta152="Casi Siempre"
    valor31= this.state.getPonderacion[30].casisiempre
  }
  else if(this.state.resultadosEvaluacion[31].Respuestas=="AlgunasVeces"){
    respuesta153="Algunas Veces"
    valor31= this.state.getPonderacion[30].algunasveces
  } 
  else if(this.state.resultadosEvaluacion[31].Respuestas=="CasiNunca"){
    respuesta154="Casi Nunca"
    valor31= this.state.getPonderacion[30].casinunca
  } 
  else if(this.state.resultadosEvaluacion[31].Respuestas=="Nunca"){
    respuesta155="Nunca"
    valor31= this.state.getPonderacion[30].nunca
  } 
    let respuesta156;
    let respuesta157;
    let respuesta158;
    let respuesta159;
    let respuesta160;
    if(this.state.resultadosEvaluacion[32].Respuestas=="Siempre"){
    respuesta156="Siempre"
    valor32= this.state.getPonderacion[31].siempre
    }else if(this.state.resultadosEvaluacion[32].Respuestas=="CasiSiempre"){
      respuesta157="Casi Siempre"
      valor32= this.state.getPonderacion[31].casisiempre
    }
    else if(this.state.resultadosEvaluacion[32].Respuestas=="AlgunasVeces"){
      respuesta158="Algunas Veces"
      valor32= this.state.getPonderacion[31].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[32].Respuestas=="CasiNunca"){
      respuesta159="Casi Nunca"
      valor32= this.state.getPonderacion[31].casinunca
    } 
    else if(this.state.resultadosEvaluacion[32].Respuestas=="Nunca"){
      respuesta160="Nunca"
      valor32= this.state.getPonderacion[31].nunca
    } 
  
    let respuesta161;
    let respuesta162;
    let respuesta163;
    let respuesta164;
    let respuesta165;
    if(this.state.resultadosEvaluacion[33].Respuestas=="Siempre"){
    respuesta161="Siempre"
    valor33= this.state.getPonderacion[32].siempre
    }else if(this.state.resultadosEvaluacion[33].Respuestas=="CasiSiempre"){
      respuesta162="Casi Siempre"
      valor33= this.state.getPonderacion[32].casisiempre
    }
    else if(this.state.resultadosEvaluacion[33].Respuestas=="AlgunasVeces"){
      respuesta163="Algunas Veces"
      valor33= this.state.getPonderacion[32].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[33].Respuestas=="CasiNunca"){
      respuesta164="Casi Nunca"
      valor33= this.state.getPonderacion[32].casinunca
    } 
    else if(this.state.resultadosEvaluacion[33].Respuestas=="Nunca"){
      respuesta165="Nunca"
      valor33= this.state.getPonderacion[32].nunca
    } 
    let respuesta166;
    let respuesta167;
    let respuesta168;
    let respuesta169;
    let respuesta170;
    if(this.state.resultadosEvaluacion[34].Respuestas=="Siempre"){
    respuesta166="Siempre"
    valor34= this.state.getPonderacion[33].siempre
    }else if(this.state.resultadosEvaluacion[34].Respuestas=="CasiSiempre"){
      respuesta167="Casi Siempre"
      valor34= this.state.getPonderacion[33].casisiempre
    }
    else if(this.state.resultadosEvaluacion[34].Respuestas=="AlgunasVeces"){
      respuesta168="Algunas Veces"
      valor34= this.state.getPonderacion[33].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[34].Respuestas=="CasiNunca"){
      respuesta169="Casi Nunca"
      valor34= this.state.getPonderacion[33].casinunca
    } 
    else if(this.state.resultadosEvaluacion[34].Respuestas=="Nunca"){
      respuesta170="Nunca"
      valor34= this.state.getPonderacion[33].nunca
    } 
    let respuesta171;
    let respuesta172;
    let respuesta173;
    let respuesta174;
    let respuesta175;
    if(this.state.resultadosEvaluacion[35].Respuestas=="Siempre"){
    respuesta171="Siempre"
    valor35= this.state.getPonderacion[34].siempre
    }else if(this.state.resultadosEvaluacion[35].Respuestas=="CasiSiempre"){
      respuesta172="Casi Siempre"
      valor35= this.state.getPonderacion[34].casisiempre
    }
    else if(this.state.resultadosEvaluacion[35].Respuestas=="AlgunasVeces"){
      respuesta173="Algunas Veces"
      valor35= this.state.getPonderacion[34].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[35].Respuestas=="CasiNunca"){
      respuesta174="Casi Nunca"
      valor35= this.state.getPonderacion[34].casinunca
    } 
    else if(this.state.resultadosEvaluacion[35].Respuestas=="Nunca"){
      respuesta175="Nunca"
      valor35= this.state.getPonderacion[34].nunca
    } 
  
    let respuesta176;
    let respuesta177;
    let respuesta178;
    let respuesta179;
    let respuesta180;
    if(this.state.resultadosEvaluacion[36].Respuestas=="Siempre"){
    respuesta176="Siempre"
    valor36= this.state.getPonderacion[35].siempre
    }else if(this.state.resultadosEvaluacion[36].Respuestas=="CasiSiempre"){
      respuesta177="Casi Siempre"
      valor36= this.state.getPonderacion[35].casisiempre
    }
    else if(this.state.resultadosEvaluacion[36].Respuestas=="AlgunasVeces"){
      respuesta178="Algunas Veces"
      valor36= this.state.getPonderacion[35].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[36].Respuestas=="CasiNunca"){
      respuesta179="Casi Nunca"
      valor36= this.state.getPonderacion[35].casinunca
    } 
    else if(this.state.resultadosEvaluacion[36].Respuestas=="Nunca"){
      respuesta180="Nunca"
      valor36= this.state.getPonderacion[35].nunca
    }
    let respuesta181;
    let respuesta182;
    let respuesta183;
    let respuesta184;
    let respuesta185;
    if(this.state.resultadosEvaluacion[37].Respuestas=="Siempre"){
    respuesta181="Siempre"
    valor37= this.state.getPonderacion[36].siempre
    
    }else if(this.state.resultadosEvaluacion[37].Respuestas=="CasiSiempre"){
      respuesta182="Casi Siempre"
      valor37= this.state.getPonderacion[36].casisiempre
    }
    else if(this.state.resultadosEvaluacion[37].Respuestas=="AlgunasVeces"){
      respuesta183="Algunas Veces"
      valor37= this.state.getPonderacion[36].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[37].Respuestas=="CasiNunca"){
      respuesta184="Casi Nunca"
      valor37= this.state.getPonderacion[36].casinunca
    } 
    else if(this.state.resultadosEvaluacion[37].Respuestas=="Nunca"){
      respuesta185="Nunca"
      valor37= this.state.getPonderacion[36].nunca
    }
    let respuesta186;
    let respuesta187;
    let respuesta188;
    let respuesta189;
    let respuesta190;
    if(this.state.resultadosEvaluacion[38].Respuestas=="Siempre"){
    respuesta186="Siempre"
    valor38= this.state.getPonderacion[37].siempre
    }else if(this.state.resultadosEvaluacion[38].Respuestas=="CasiSiempre"){
      respuesta187="Casi Siempre"
      valor38= this.state.getPonderacion[37].casisiempre
    }
    else if(this.state.resultadosEvaluacion[38].Respuestas=="AlgunasVeces"){
      respuesta188="Algunas Veces"
      valor38= this.state.getPonderacion[37].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[38].Respuestas=="CasiNunca"){
      respuesta189="Casi Nunca"
      valor38= this.state.getPonderacion[37].casinunca
    } 
    else if(this.state.resultadosEvaluacion[38].Respuestas=="Nunca"){
      respuesta190="Nunca"
      valor38= this.state.getPonderacion[37].nunca
    }
    let respuesta191;
    let respuesta192;
    let respuesta193;
    let respuesta194;
    let respuesta195;
    if(this.state.resultadosEvaluacion[39].Respuestas=="Siempre"){
    respuesta191="Siempre"
    valor39= this.state.getPonderacion[38].siempre
    }else if(this.state.resultadosEvaluacion[39].Respuestas=="CasiSiempre"){
      respuesta192="Casi Siempre"
      valor39= this.state.getPonderacion[38].casisiempre
    }
    else if(this.state.resultadosEvaluacion[39].Respuestas=="AlgunasVeces"){
      respuesta193="Algunas Veces"
      valor39= this.state.getPonderacion[38].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[39].Respuestas=="CasiNunca"){
      respuesta194="Casi Nunca"
      valor39= this.state.getPonderacion[38].casinunca
    } 
    else if(this.state.resultadosEvaluacion[39].Respuestas=="Nunca"){
      respuesta195="Nunca"
      valor39= this.state.getPonderacion[38].nunca
    }
    let respuesta196;
    let respuesta197;
    let respuesta198;
    let respuesta199;
    let respuesta200;
    if(this.state.resultadosEvaluacion[40].Respuestas=="Siempre"){
    respuesta196="Siempre"
    valor40= this.state.getPonderacion[39].siempre
    }else if(this.state.resultadosEvaluacion[40].Respuestas=="CasiSiempre"){
      respuesta197="Casi Siempre"
      valor40= this.state.getPonderacion[39].casisiempre
    }
    else if(this.state.resultadosEvaluacion[40].Respuestas=="AlgunasVeces"){
      respuesta198="Algunas Veces"
      valor40= this.state.getPonderacion[39].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[40].Respuestas=="CasiNunca"){
      respuesta199="Casi Nunca"
      valor40= this.state.getPonderacion[39].casinunca
    } 
    else if(this.state.resultadosEvaluacion[40].Respuestas=="Nunca"){
      respuesta200="Nunca"
      valor40= this.state.getPonderacion[39].nunca
    }
    let respuesta201;
    let respuesta202;
    let respuesta203;
    let respuesta204;
    let respuesta205;
    if(this.state.resultadosEvaluacion[41].Respuestas=="Siempre"){
      respuesta201="Siempre"
      valor41= this.state.getPonderacion[40].siempre
    }else if(this.state.resultadosEvaluacion[41].Respuestas=="CasiSiempre"){
      respuesta202="Casi Siempre"
      valor41= this.state.getPonderacion[40].casisiempre
    }
    else if(this.state.resultadosEvaluacion[41].Respuestas=="AlgunasVeces"){
      respuesta203="Algunas Veces"
      valor41= this.state.getPonderacion[40].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[41].Respuestas=="CasiNunca"){
      respuesta204="Casi Nunca"
      valor41= this.state.getPonderacion[40].casinunca
    } 
    else if(this.state.resultadosEvaluacion[41].Respuestas=="Nunca"){
      respuesta205="Nunca"
      valor41= this.state.getPonderacion[40].nunca
    }
  
    let respuesta206;
    let respuesta207;
    let respuesta208;
    let respuesta209;
    let respuesta210;
    if(this.state.resultadosEvaluacion[42].Respuestas=="Siempre"){
      respuesta206="Siempre"
      valor42= this.state.getPonderacion[41].siempre
    }else if(this.state.resultadosEvaluacion[42].Respuestas=="CasiSiempre"){
      respuesta207="Casi Siempre"
      valor42= this.state.getPonderacion[41].casisiempre
    }
    else if(this.state.resultadosEvaluacion[42].Respuestas=="AlgunasVeces"){
      respuesta208="Algunas Veces"
      valor42= this.state.getPonderacion[41].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[42].Respuestas=="CasiNunca"){
      respuesta209="Casi Nunca"
      valor42= this.state.getPonderacion[41].casinunca
    } 
    else if(this.state.resultadosEvaluacion[42].Respuestas=="Nunca"){
      respuesta210="Nunca"
      valor42= this.state.getPonderacion[41].nunca
    }
    let respuesta211;
    let respuesta212;
    let respuesta213;
    let respuesta214;
    let respuesta215;
    if(this.state.resultadosEvaluacion[43].Respuestas=="Siempre"){
      respuesta211="Siempre"
      valor43= this.state.getPonderacion[42].siempre
    }else if(this.state.resultadosEvaluacion[43].Respuestas=="CasiSiempre"){
      respuesta212="Casi Siempre"
      valor43= this.state.getPonderacion[42].casisiempre
    }
    else if(this.state.resultadosEvaluacion[43].Respuestas=="AlgunasVeces"){
      respuesta213="Algunas Veces"
      valor43= this.state.getPonderacion[42].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[43].Respuestas=="CasiNunca"){
      respuesta214="Casi Nunca"
      valor43= this.state.getPonderacion[42].casinunca
    } 
    else if(this.state.resultadosEvaluacion[43].Respuestas=="Nunca"){
      respuesta215="Nunca"
      valor43= this.state.getPonderacion[42].nunca
    }
  
    let respuesta216;
    let respuesta217;
    let respuesta218;
    let respuesta219;
    let respuesta220;
    if(this.state.resultadosEvaluacion[44].Respuestas=="Siempre"){
      respuesta216="Siempre"
      valor44= this.state.getPonderacion[43].siempre
    }else if(this.state.resultadosEvaluacion[44].Respuestas=="CasiSiempre"){
      respuesta217="Casi Siempre"
      valor44= this.state.getPonderacion[43].casisiempre
    }
    else if(this.state.resultadosEvaluacion[44].Respuestas=="AlgunasVeces"){
      respuesta218="Algunas Veces"
      valor44= this.state.getPonderacion[43].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[44].Respuestas=="CasiNunca"){
      respuesta219="Casi Nunca"
      valor44= this.state.getPonderacion[43].casinunca
    } 
    else if(this.state.resultadosEvaluacion[44].Respuestas=="Nunca"){
      respuesta220="Nunca"
      valor44= this.state.getPonderacion[43].nunca
    }
    let respuesta221;
    let respuesta222;
    let respuesta223;
    let respuesta224;
    let respuesta225;
    if(this.state.resultadosEvaluacion[45].Respuestas=="Siempre"){
      respuesta221="Siempre"
      valor45= this.state.getPonderacion[44].siempre
    }else if(this.state.resultadosEvaluacion[45].Respuestas=="CasiSiempre"){
      respuesta222="Casi Siempre"
      valor45= this.state.getPonderacion[44].casisiempre
    }
    else if(this.state.resultadosEvaluacion[45].Respuestas=="AlgunasVeces"){
      respuesta223="Algunas Veces"
      valor45= this.state.getPonderacion[44].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[45].Respuestas=="CasiNunca"){
      respuesta224="Casi Nunca"
      valor45= this.state.getPonderacion[44].casinunca
    } 
    else if(this.state.resultadosEvaluacion[45].Respuestas=="Nunca"){
      respuesta225="Nunca"
      valor45= this.state.getPonderacion[44].nunca
    }
    let respuesta226;
    let respuesta227;
    let respuesta228;
    let respuesta229;
    let respuesta230;
    if(this.state.resultadosEvaluacion[46].Respuestas=="Siempre"){
      respuesta226="Siempre"
      valor46= this.state.getPonderacion[45].siempre
    }else if(this.state.resultadosEvaluacion[46].Respuestas=="CasiSiempre"){
      respuesta227="Casi Siempre"
      valor46= this.state.getPonderacion[45].casisiempre
    }
    else if(this.state.resultadosEvaluacion[46].Respuestas=="AlgunasVeces"){
      respuesta228="Algunas Veces"
      valor46= this.state.getPonderacion[45].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[46].Respuestas=="CasiNunca"){
      respuesta229="Casi Nunca"
      valor46= this.state.getPonderacion[45].casinunca
    } 
    else if(this.state.resultadosEvaluacion[46].Respuestas=="Nunca"){
      respuesta230="Nunca"
      valor46= this.state.getPonderacion[45].nunca
    }

    let respuesta231;
    let respuesta232;
    let respuesta233;
    let respuesta234;
    let respuesta235;
    if(this.state.resultadosEvaluacion[47].Respuestas=="Siempre"){
      respuesta231="Siempre"
      valor47= this.state.getPonderacion[46].siempre
    }else if(this.state.resultadosEvaluacion[47].Respuestas=="CasiSiempre"){
      respuesta232="Casi Siempre"
      valor47= this.state.getPonderacion[46].casisiempre
    }
    else if(this.state.resultadosEvaluacion[47].Respuestas=="AlgunasVeces"){
      respuesta233="Algunas Veces"
      valor47= this.state.getPonderacion[46].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[47].Respuestas=="CasiNunca"){
      respuesta234="Casi Nunca"
      valor47= this.state.getPonderacion[46].casinunca
    } 
    else if(this.state.resultadosEvaluacion[47].Respuestas=="Nunca"){
      respuesta235="Nunca"
      valor47= this.state.getPonderacion[46].nunca
    }

    let respuesta236;
    let respuesta237;
    let respuesta238;
    let respuesta239;
    let respuesta240;
    if(this.state.resultadosEvaluacion[48].Respuestas=="Siempre"){
      respuesta236="Siempre"
      valor48= this.state.getPonderacion[47].siempre
    }else if(this.state.resultadosEvaluacion[48].Respuestas=="CasiSiempre"){
      respuesta237="Casi Siempre"
      valor48= this.state.getPonderacion[47].casisiempre
    }
    else if(this.state.resultadosEvaluacion[48].Respuestas=="AlgunasVeces"){
      respuesta238="Algunas Veces"
      valor48= this.state.getPonderacion[47].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[48].Respuestas=="CasiNunca"){
      respuesta239="Casi Nunca"
      valor48= this.state.getPonderacion[47].casinunca
    } 
    else if(this.state.resultadosEvaluacion[48].Respuestas=="Nunca"){
      respuesta240="Nunca"
      valor48= this.state.getPonderacion[47].nunca
    }

    let respuesta241;
    let respuesta242;
    let respuesta243;
    let respuesta244;
    let respuesta245;
    if(this.state.resultadosEvaluacion[49].Respuestas=="Siempre"){
      respuesta241="Siempre"
      valor49= this.state.getPonderacion[48].siempre
    }else if(this.state.resultadosEvaluacion[49].Respuestas=="CasiSiempre"){
      respuesta242="Casi Siempre"
      valor49= this.state.getPonderacion[48].casisiempre
    }
    else if(this.state.resultadosEvaluacion[49].Respuestas=="AlgunasVeces"){
      respuesta243="Algunas Veces"
      valor49= this.state.getPonderacion[48].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[49].Respuestas=="CasiNunca"){
      respuesta244="Casi Nunca"
      valor49= this.state.getPonderacion[48].casinunca
    } 
    else if(this.state.resultadosEvaluacion[49].Respuestas=="Nunca"){
      respuesta245="Nunca"
      valor49= this.state.getPonderacion[48].nunca
    }

    let respuesta246;
    let respuesta247;
    let respuesta248;
    let respuesta249;
    let respuesta250;
    if(this.state.resultadosEvaluacion[50].Respuestas=="Siempre"){
      respuesta246="Siempre"
      valor50= this.state.getPonderacion[49].siempre
    }else if(this.state.resultadosEvaluacion[50].Respuestas=="CasiSiempre"){
      respuesta247="Casi Siempre"
      valor50= this.state.getPonderacion[49].casisiempre
    }
    else if(this.state.resultadosEvaluacion[50].Respuestas=="AlgunasVeces"){
      respuesta248="Algunas Veces"
      valor50= this.state.getPonderacion[49].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[50].Respuestas=="CasiNunca"){
      respuesta249="Casi Nunca"
      valor50= this.state.getPonderacion[49].casinunca
    } 
    else if(this.state.resultadosEvaluacion[50].Respuestas=="Nunca"){
      respuesta250="Nunca"
      valor50= this.state.getPonderacion[49].nunca
    }

    let respuesta251;
    let respuesta252;
    let respuesta253;
    let respuesta254;
    let respuesta255;
    if(this.state.resultadosEvaluacion[51].Respuestas=="Siempre"){
      respuesta251="Siempre"
      valor51= this.state.getPonderacion[50].siempre
    }else if(this.state.resultadosEvaluacion[51].Respuestas=="CasiSiempre"){
      respuesta252="Casi Siempre"
      valor51= this.state.getPonderacion[50].casisiempre
    }
    else if(this.state.resultadosEvaluacion[51].Respuestas=="AlgunasVeces"){
      respuesta253="Algunas Veces"
      valor51= this.state.getPonderacion[50].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[51].Respuestas=="CasiNunca"){
      respuesta254="Casi Nunca"
      valor51= this.state.getPonderacion[50].casinunca
    } 
    else if(this.state.resultadosEvaluacion[51].Respuestas=="Nunca"){
      respuesta255="Nunca"
      valor51= this.state.getPonderacion[50].nunca
    }

    let respuesta256;
    let respuesta257;
    let respuesta258;
    let respuesta259;
    let respuesta260;
    if(this.state.resultadosEvaluacion[52].Respuestas=="Siempre"){
      respuesta256="Siempre"
      valor52= this.state.getPonderacion[51].siempre
    }else if(this.state.resultadosEvaluacion[52].Respuestas=="CasiSiempre"){
      respuesta257="Casi Siempre"
      valor52= this.state.getPonderacion[51].casisiempre
    }
    else if(this.state.resultadosEvaluacion[52].Respuestas=="AlgunasVeces"){
      respuesta258="Algunas Veces"
      valor52= this.state.getPonderacion[51].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[52].Respuestas=="CasiNunca"){
      respuesta259="Casi Nunca"
      valor52= this.state.getPonderacion[51].casinunca
    } 
    else if(this.state.resultadosEvaluacion[52].Respuestas=="Nunca"){
      respuesta260="Nunca"
      valor52= this.state.getPonderacion[51].nunca
    }

    let respuesta261;
    let respuesta262;
    let respuesta263;
    let respuesta264;
    let respuesta265;
    if(this.state.resultadosEvaluacion[53].Respuestas=="Siempre"){
      respuesta261="Siempre"
      valor53= this.state.getPonderacion[52].siempre
    }else if(this.state.resultadosEvaluacion[53].Respuestas=="CasiSiempre"){
      respuesta262="Casi Siempre"
      valor53= this.state.getPonderacion[52].casisiempre
    }
    else if(this.state.resultadosEvaluacion[53].Respuestas=="AlgunasVeces"){
      respuesta263="Algunas Veces"
      valor53= this.state.getPonderacion[52].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[53].Respuestas=="CasiNunca"){
      respuesta264="Casi Nunca"
      valor53= this.state.getPonderacion[52].casinunca
    } 
    else if(this.state.resultadosEvaluacion[53].Respuestas=="Nunca"){
      respuesta265="Nunca"
      valor53= this.state.getPonderacion[52].nunca
    }

    let respuesta266;
    let respuesta267;
    let respuesta268;
    let respuesta269;
    let respuesta270;
    if(this.state.resultadosEvaluacion[54].Respuestas=="Siempre"){
      respuesta266="Siempre"
      valor54= this.state.getPonderacion[53].siempre
    }else if(this.state.resultadosEvaluacion[54].Respuestas=="CasiSiempre"){
      respuesta267="Casi Siempre"
      valor54= this.state.getPonderacion[53].casisiempre
    }
    else if(this.state.resultadosEvaluacion[54].Respuestas=="AlgunasVeces"){
      respuesta268="Algunas Veces"
      valor54= this.state.getPonderacion[53].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[54].Respuestas=="CasiNunca"){
      respuesta269="Casi Nunca"
      valor54= this.state.getPonderacion[53].casinunca
    } 
    else if(this.state.resultadosEvaluacion[54].Respuestas=="Nunca"){
      respuesta270="Nunca"
      valor54= this.state.getPonderacion[53].nunca
    }
    
    let respuesta271;
    let respuesta272;
    let respuesta273;
    let respuesta274;
    let respuesta275;
    if(this.state.resultadosEvaluacion[55].Respuestas=="Siempre"){
      respuesta271="Siempre"
      valor55= this.state.getPonderacion[54].siempre
    }else if(this.state.resultadosEvaluacion[55].Respuestas=="CasiSiempre"){
      respuesta272="Casi Siempre"
      valor55= this.state.getPonderacion[54].casisiempre
    }
    else if(this.state.resultadosEvaluacion[55].Respuestas=="AlgunasVeces"){
      respuesta273="Algunas Veces"
      valor55= this.state.getPonderacion[54].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[55].Respuestas=="CasiNunca"){
      respuesta274="Casi Nunca"
      valor55= this.state.getPonderacion[54].casinunca
    } 
    else if(this.state.resultadosEvaluacion[55].Respuestas=="Nunca"){
      respuesta275="Nunca"
      valor55= this.state.getPonderacion[54].nunca
    }

    let respuesta276;
    let respuesta277;
    let respuesta278;
    let respuesta279;
    let respuesta280;
    if(this.state.resultadosEvaluacion[56].Respuestas=="Siempre"){
      respuesta276="Siempre"
      valor56= this.state.getPonderacion[55].siempre
    }else if(this.state.resultadosEvaluacion[56].Respuestas=="CasiSiempre"){
      respuesta277="Casi Siempre"
      valor56= this.state.getPonderacion[55].casisiempre
    }
    else if(this.state.resultadosEvaluacion[56].Respuestas=="AlgunasVeces"){
      respuesta278="Algunas Veces"
      valor56= this.state.getPonderacion[55].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[56].Respuestas=="CasiNunca"){
      respuesta279="Casi Nunca"
      valor56= this.state.getPonderacion[55].casinunca
    } 
    else if(this.state.resultadosEvaluacion[56].Respuestas=="Nunca"){
      respuesta280="Nunca"
      valor56= this.state.getPonderacion[55].nunca
    }

    let respuesta281;
    let respuesta282;
    let respuesta283;
    let respuesta284;
    let respuesta285;
    if(this.state.resultadosEvaluacion[57].Respuestas=="Siempre"){
      respuesta281="Siempre"
      valor57= this.state.getPonderacion[56].siempre
    }else if(this.state.resultadosEvaluacion[57].Respuestas=="CasiSiempre"){
      respuesta282="Casi Siempre"
      valor57= this.state.getPonderacion[56].casisiempre
    }
    else if(this.state.resultadosEvaluacion[57].Respuestas=="AlgunasVeces"){
      respuesta283="Algunas Veces"
      valor57= this.state.getPonderacion[56].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[57].Respuestas=="CasiNunca"){
      respuesta284="Casi Nunca"
      valor57= this.state.getPonderacion[56].casinunca
    } 
    else if(this.state.resultadosEvaluacion[57].Respuestas=="Nunca"){
      respuesta285="Nunca"
      valor57= this.state.getPonderacion[56].nunca
    }

    let respuesta286;
    let respuesta287;
    let respuesta288;
    let respuesta289;
    let respuesta290;
    if(this.state.resultadosEvaluacion[58].Respuestas=="Siempre"){
      respuesta286="Siempre"
      valor58= this.state.getPonderacion[57].siempre
    }else if(this.state.resultadosEvaluacion[58].Respuestas=="CasiSiempre"){
      respuesta287="Casi Siempre"
      valor58= this.state.getPonderacion[57].casisiempre
    }
    else if(this.state.resultadosEvaluacion[58].Respuestas=="AlgunasVeces"){
      respuesta288="Algunas Veces"
      valor58= this.state.getPonderacion[57].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[58].Respuestas=="CasiNunca"){
      respuesta289="Casi Nunca"
      valor58= this.state.getPonderacion[57].casinunca
    } 
    else if(this.state.resultadosEvaluacion[58].Respuestas=="Nunca"){
      respuesta290="Nunca"
      valor58= this.state.getPonderacion[57].nunca
    }

    
    let respuesta291;
    let respuesta292;
    let respuesta293;
    let respuesta294;
    let respuesta295;
    if(this.state.resultadosEvaluacion[59].Respuestas=="Siempre"){
      respuesta291="Siempre"
      valor59= this.state.getPonderacion[58].siempre
    }else if(this.state.resultadosEvaluacion[59].Respuestas=="CasiSiempre"){
      respuesta292="Casi Siempre"
      valor59= this.state.getPonderacion[58].casisiempre
    }
    else if(this.state.resultadosEvaluacion[59].Respuestas=="AlgunasVeces"){
      respuesta293="Algunas Veces"
      valor59= this.state.getPonderacion[58].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[59].Respuestas=="CasiNunca"){
      respuesta294="Casi Nunca"
      valor59= this.state.getPonderacion[58].casinunca
    } 
    else if(this.state.resultadosEvaluacion[59].Respuestas=="Nunca"){
      respuesta295="Nunca"
      valor59= this.state.getPonderacion[58].nunca
    }
    let respuesta296;
    let respuesta297;
    let respuesta298;
    let respuesta299;
    let respuesta300;
    if(this.state.resultadosEvaluacion[60].Respuestas=="Siempre"){
      respuesta296="Siempre"
      valor60= this.state.getPonderacion[59].siempre
    }else if(this.state.resultadosEvaluacion[60].Respuestas=="CasiSiempre"){
      respuesta297="Casi Siempre"
      valor60= this.state.getPonderacion[59].casisiempre
    }
    else if(this.state.resultadosEvaluacion[60].Respuestas=="AlgunasVeces"){
      respuesta298="Algunas Veces"
      valor60= this.state.getPonderacion[59].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[60].Respuestas=="CasiNunca"){
      respuesta299="Casi Nunca"
      valor60= this.state.getPonderacion[59].casinunca
    } 
    else if(this.state.resultadosEvaluacion[60].Respuestas=="Nunca"){
      respuesta300="Nunca"
      valor60= this.state.getPonderacion[59].nunca
    }

    let respuesta301;
    let respuesta302;
    let respuesta303;
    let respuesta304;
    let respuesta305;
    if(this.state.resultadosEvaluacion[61].Respuestas=="Siempre"){
      respuesta301="Siempre"
      valor61= this.state.getPonderacion[60].siempre
    }else if(this.state.resultadosEvaluacion[61].Respuestas=="CasiSiempre"){
      respuesta302="Casi Siempre"
      valor61= this.state.getPonderacion[60].casisiempre
    }
    else if(this.state.resultadosEvaluacion[61].Respuestas=="AlgunasVeces"){
      respuesta303="Algunas Veces"
      valor61= this.state.getPonderacion[60].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[61].Respuestas=="CasiNunca"){
      respuesta304="Casi Nunca"
      valor61= this.state.getPonderacion[60].casinunca
    } 
    else if(this.state.resultadosEvaluacion[61].Respuestas=="Nunca"){
      respuesta305="Nunca"
      valor61= this.state.getPonderacion[60].nunca
    }

    let respuesta306;
    let respuesta307;
    let respuesta308;
    let respuesta309;
    let respuesta310;
    if(this.state.resultadosEvaluacion[62].Respuestas=="Siempre"){
      respuesta306="Siempre"
      valor62= this.state.getPonderacion[61].siempre
    }else if(this.state.resultadosEvaluacion[62].Respuestas=="CasiSiempre"){
      respuesta307="Casi Siempre"
      valor62= this.state.getPonderacion[61].casisiempre
    }
    else if(this.state.resultadosEvaluacion[62].Respuestas=="AlgunasVeces"){
      respuesta308="Algunas Veces"
      valor62= this.state.getPonderacion[61].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[62].Respuestas=="CasiNunca"){
      respuesta309="Casi Nunca"
      valor62= this.state.getPonderacion[61].casinunca
    } 
    else if(this.state.resultadosEvaluacion[62].Respuestas=="Nunca"){
      respuesta310="Nunca"
      valor62= this.state.getPonderacion[61].nunca
    }

    let respuesta311;
    let respuesta312;
    let respuesta313;
    let respuesta314;
    let respuesta315;
    if(this.state.resultadosEvaluacion[63].Respuestas=="Siempre"){
      respuesta311="Siempre"
      valor63= this.state.getPonderacion[62].siempre
    }else if(this.state.resultadosEvaluacion[63].Respuestas=="CasiSiempre"){
      respuesta312="Casi Siempre"
      valor63= this.state.getPonderacion[62].casisiempre
    }
    else if(this.state.resultadosEvaluacion[63].Respuestas=="AlgunasVeces"){
      respuesta313="Algunas Veces"
      valor63= this.state.getPonderacion[62].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[63].Respuestas=="CasiNunca"){
      respuesta314="Casi Nunca"
      valor63= this.state.getPonderacion[62].casinunca
    } 
    else if(this.state.resultadosEvaluacion[63].Respuestas=="Nunca"){
      respuesta315="Nunca"
      valor63= this.state.getPonderacion[62].nunca
    }

    let respuesta316;
    let respuesta317;
    let respuesta318;
    let respuesta319;
    let respuesta320;
    if(this.state.resultadosEvaluacion[64].Respuestas=="Siempre"){
      respuesta316="Siempre"
      valor64= this.state.getPonderacion[63].siempre
    }else if(this.state.resultadosEvaluacion[64].Respuestas=="CasiSiempre"){
      respuesta317="Casi Siempre"
      valor64= this.state.getPonderacion[63].casisiempre
    }
    else if(this.state.resultadosEvaluacion[64].Respuestas=="AlgunasVeces"){
      respuesta318="Algunas Veces"
      valor64= this.state.getPonderacion[63].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[64].Respuestas=="CasiNunca"){
      respuesta319="Casi Nunca"
      valor64= this.state.getPonderacion[63].casinunca
    } 
    else if(this.state.resultadosEvaluacion[64].Respuestas=="Nunca"){
      respuesta320="Nunca"
      valor64= this.state.getPonderacion[63].nunca
    }
    let respuesta321;
    let respuesta322;
    let respuesta323;
    let respuesta324;
    let respuesta325;
    if(this.state.resultadosEvaluacion[65].Respuestas=="Siempre"){
      respuesta321="Siempre"
      valor65= this.state.getPonderacion[64].siempre
    }else if(this.state.resultadosEvaluacion[65].Respuestas=="CasiSiempre"){
      respuesta322="Casi Siempre"
      valor65= this.state.getPonderacion[64].casisiempre
    }
    else if(this.state.resultadosEvaluacion[65].Respuestas=="AlgunasVeces"){
      respuesta323="Algunas Veces"
      valor65= this.state.getPonderacion[64].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[65].Respuestas=="CasiNunca"){
      respuesta324="Casi Nunca"
      valor65= this.state.getPonderacion[64].casinunca
    } 
    else if(this.state.resultadosEvaluacion[65].Respuestas=="Nunca"){
      respuesta325="Nunca"
      valor65= this.state.getPonderacion[64].nunca
    }

    let respuesta326;
    let respuesta327;
    let respuesta328;
    let respuesta329;
    let respuesta330;
    if(this.state.resultadosEvaluacion[66].Respuestas=="Siempre"){
      respuesta326="Siempre"
      valor66= this.state.getPonderacion[65].siempre
    }else if(this.state.resultadosEvaluacion[66].Respuestas=="CasiSiempre"){
      respuesta327="Casi Siempre"
      valor66= this.state.getPonderacion[65].casisiempre
    }
    else if(this.state.resultadosEvaluacion[66].Respuestas=="AlgunasVeces"){
      respuesta328="Algunas Veces"
      valor66= this.state.getPonderacion[65].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[66].Respuestas=="CasiNunca"){
      respuesta329="Casi Nunca"
      valor66= this.state.getPonderacion[65].casinunca
    } 
    else if(this.state.resultadosEvaluacion[66].Respuestas=="Nunca"){
      respuesta330="Nunca"
      valor66= this.state.getPonderacion[65].nunca
    }

    let respuesta331;
    let respuesta332;
    let respuesta333;
    let respuesta334;
    let respuesta335;
    if(this.state.resultadosEvaluacion[67].Respuestas=="Siempre"){
      respuesta331="Siempre"
      valor67= this.state.getPonderacion[66].siempre
    }else if(this.state.resultadosEvaluacion[67].Respuestas=="CasiSiempre"){
      respuesta332="Casi Siempre"
      valor67= this.state.getPonderacion[66].casisiempre
    }
    else if(this.state.resultadosEvaluacion[67].Respuestas=="AlgunasVeces"){
      respuesta333="Algunas Veces"
      valor67= this.state.getPonderacion[66].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[67].Respuestas=="CasiNunca"){
      respuesta334="Casi Nunca"
      valor67= this.state.getPonderacion[66].casinunca
    } 
    else if(this.state.resultadosEvaluacion[67].Respuestas=="Nunca"){
      respuesta335="Nunca"
      valor67= this.state.getPonderacion[66].nunca
    }


    let respuesta336;
    let respuesta337;
    let respuesta338;
    let respuesta339;
    let respuesta340;
    if(this.state.resultadosEvaluacion[68].Respuestas=="Siempre"){
      respuesta336="Siempre"
      valor68= this.state.getPonderacion[67].siempre
    }else if(this.state.resultadosEvaluacion[68].Respuestas=="CasiSiempre"){
      respuesta337="Casi Siempre"
      valor68= this.state.getPonderacion[67].casisiempre
    }
    else if(this.state.resultadosEvaluacion[68].Respuestas=="AlgunasVeces"){
      respuesta338="Algunas Veces"
      valor68= this.state.getPonderacion[67].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[68].Respuestas=="CasiNunca"){
      respuesta339="Casi Nunca"
      valor68= this.state.getPonderacion[67].casinunca
    } 
    else if(this.state.resultadosEvaluacion[68].Respuestas=="Nunca"){
      respuesta340="Nunca"
      valor68= this.state.getPonderacion[67].nunca
    }

    let respuesta341;
    let respuesta342;
    let respuesta343;
    let respuesta344;
    let respuesta345;
    if(this.state.resultadosEvaluacion[69].Respuestas=="Siempre"){
      respuesta341="Siempre"
      valor69= this.state.getPonderacion[68].siempre
    }else if(this.state.resultadosEvaluacion[69].Respuestas=="CasiSiempre"){
      respuesta342="Casi Siempre"
      valor69= this.state.getPonderacion[68].casisiempre
    }
    else if(this.state.resultadosEvaluacion[69].Respuestas=="AlgunasVeces"){
      respuesta343="Algunas Veces"
      valor69= this.state.getPonderacion[68].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[69].Respuestas=="CasiNunca"){
      respuesta344="Casi Nunca"
      valor69= this.state.getPonderacion[68].casinunca
    } 
    else if(this.state.resultadosEvaluacion[69].Respuestas=="Nunca"){
      respuesta345="Nunca"
      valor69= this.state.getPonderacion[68].nunca
    }

    let respuesta346;
    let respuesta347;
    let respuesta348;
    let respuesta349;
    let respuesta350;
    if(this.state.resultadosEvaluacion[70].Respuestas=="Siempre"){
      respuesta346="Siempre"
      valor70= this.state.getPonderacion[69].siempre
    }else if(this.state.resultadosEvaluacion[70].Respuestas=="CasiSiempre"){
      respuesta347="Casi Siempre"
      valor70= this.state.getPonderacion[69].casisiempre
    }
    else if(this.state.resultadosEvaluacion[70].Respuestas=="AlgunasVeces"){
      respuesta348="Algunas Veces"
      valor70= this.state.getPonderacion[69].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[70].Respuestas=="CasiNunca"){
      respuesta349="Casi Nunca"
      valor70= this.state.getPonderacion[69].casinunca
    } 
    else if(this.state.resultadosEvaluacion[70].Respuestas=="Nunca"){
      respuesta350="Nunca"
      valor70= this.state.getPonderacion[69].nunca
    }

    let respuesta351;
    let respuesta352;
    let respuesta353;
    let respuesta354;
    let respuesta355;
    if(this.state.resultadosEvaluacion[71].Respuestas=="Siempre"){
      respuesta351="Siempre"
      valor71= this.state.getPonderacion[70].siempre
    }else if(this.state.resultadosEvaluacion[71].Respuestas=="CasiSiempre"){
      respuesta352="Casi Siempre"
      valor71= this.state.getPonderacion[70].casisiempre
    }
    else if(this.state.resultadosEvaluacion[71].Respuestas=="AlgunasVeces"){
      respuesta353="Algunas Veces"
      valor71= this.state.getPonderacion[70].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[71].Respuestas=="CasiNunca"){
      respuesta354="Casi Nunca"
      valor71= this.state.getPonderacion[70].casinunca
    } 
    else if(this.state.resultadosEvaluacion[71].Respuestas=="Nunca"){
      respuesta355="Nunca"
      valor71= this.state.getPonderacion[70].nunca
    }

    let respuesta356;
    let respuesta357;
    let respuesta358;
    let respuesta359;
    let respuesta360;
    if(this.state.resultadosEvaluacion[72].Respuestas=="Siempre"){
      respuesta356="Siempre"
      valor72= this.state.getPonderacion[71].siempre
    }else if(this.state.resultadosEvaluacion[72].Respuestas=="CasiSiempre"){
      respuesta357="Casi Siempre"
      valor72= this.state.getPonderacion[71].casisiempre
    }
    else if(this.state.resultadosEvaluacion[72].Respuestas=="AlgunasVeces"){
      respuesta358="Algunas Veces"
      valor72= this.state.getPonderacion[71].algunasveces
    } 
    else if(this.state.resultadosEvaluacion[72].Respuestas=="CasiNunca"){
      respuesta359="Casi Nunca"
      valor72= this.state.getPonderacion[71].casinunca
    } 
    else if(this.state.resultadosEvaluacion[72].Respuestas=="Nunca"){
      respuesta360="Nunca"
      valor72= this.state.getPonderacion[71].nunca
    }


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
    let celda;
    if(total<50){
    celda = <TableCell style={{backgroundColor: "#51EAFF"}} align="right">Nulo o Despreciable</TableCell>
    }else if(total>=50 && total < 75){
      celda = <TableCell style={{backgroundColor: "#45D09E"}} align="right">Bajo</TableCell>
    }else if(total>=75 && total < 99){
      celda = <TableCell style={{backgroundColor: "#FFD600"}} align="right">Medio</TableCell>
    }else if(total>=99 && total < 140){
     celda = <TableCell style={{backgroundColor: "#FF905A"}} align="right">Alto</TableCell>
    }
    else if( total > 140){
      celda  = <TableCell style={{backgroundColor: "#E20338"}} align="right">Muy Alto</TableCell>
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////

let categoria1Nulo;
let categoria1Bajo;
let categoria1Medio;
let categoria1Alto;
let categoria1MuyAlto;
let categoriaUno = (entero1+entero3+entero2+entero4+entero5);
console.log("categotia1",entero1,entero3,entero2,entero4,entero5)
if(categoriaUno < 5){
  categoria1Nulo= <MDBBadge color="info">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 5 && categoriaUno < 9){
  categoria1Bajo= <MDBBadge color="success">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 9 && categoriaUno < 11){
  categoria1Medio= <MDBBadge color="warning">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 11 && categoriaUno < 14){
  categoria1Alto= <MDBBadge color="warning">{categoriaUno}</MDBBadge>
}else if(categoriaUno >= 14){
  categoria1MuyAlto= <MDBBadge color="danger">{categoriaUno}</MDBBadge>
}

let categoria2Nulo;
let categoria2Bajo;
let categoria2Medio;
let categoria2Alto;
let categoria2MuyAlto;
let categoriaDos = (entero6+entero12+entero7+entero8+entero9+entero10+entero11+entero65+entero66+entero67+entero68+entero13+entero14+entero15+entero16+entero25+entero26+entero27+entero28+entero23+entero24+entero29+entero30+entero35+entero36);
if(categoriaDos < 15){
  categoria2Nulo= <MDBBadge color="info">{categoriaDos}</MDBBadge>
}else if(categoriaDos >= 15 && categoriaDos < 30){
  categoria2Bajo= <MDBBadge color="success">{categoriaDos}</MDBBadge>
}else if(categoriaDos >=30 && categoriaDos < 45){
  categoria2Medio= <MDBBadge color="warning">{categoriaDos}</MDBBadge>
}else if(categoriaDos >=45 && categoriaDos < 60){
  categoria2Alto= <MDBBadge color="warning">{categoriaDos}</MDBBadge>
}else if(categoriaDos >= 60){
  categoria2MuyAlto= <MDBBadge color="danger">{categoriaDos}</MDBBadge>
}
let categoria3Nulo;
let categoria3Bajo;
let categoria3Medio;
let categoria3Alto;
let categoria3MuyAlto;
let categoriaTre = (entero17+entero18+entero19+entero20+entero21+entero22);
if(categoriaTre < 5){
  categoria3Nulo= <MDBBadge color="info">{categoriaTre}</MDBBadge>
}else if(categoriaTre >= 5 && categoriaTre < 7){
  categoria3Bajo= <MDBBadge color="success">{categoriaTre}</MDBBadge>
}else if(categoriaTre >=7 && categoriaTre < 10){
  categoria3Medio= <MDBBadge color="warning">{categoriaTre}</MDBBadge>
}else if(categoriaTre >=10 && categoriaTre < 13){
  categoria3Alto= <MDBBadge color="warning">{categoriaTre}</MDBBadge>
}else if(categoriaTre >= 13){
  categoria3MuyAlto= <MDBBadge color="danger">{categoriaTre}</MDBBadge>
}

let categoria4Nulo;
let categoria4Bajo;
let categoria4Medio;
let categoria4Alto;
let categoria4MuyAlto;
let categoriaCuatro = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41+entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72+entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64);
if(categoriaCuatro < 14){
  categoria4Nulo= <MDBBadge color="info">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >= 14 && categoriaCuatro < 29){
  categoria4Bajo= <MDBBadge color="success">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >=29 && categoriaCuatro < 42){
  categoria4Medio= <MDBBadge color="warning">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >=42 && categoriaCuatro < 58){
  categoria4Alto= <MDBBadge color="warning">{categoriaCuatro}</MDBBadge>
}else if(categoriaCuatro >= 58){
  categoria4MuyAlto= <MDBBadge color="danger">{categoriaCuatro}</MDBBadge>
}

let categoria5Nulo;
let categoria5Bajo;
let categoria5Medio;
let categoria5Alto;
let categoria5MuyAlto;
let categoriaCinco = (entero47+entero48+entero49+entero50+entero51+entero52+entero55+entero56+entero53+entero54);
if(categoriaCinco < 10){
  categoria5Nulo= <MDBBadge color="info">{categoriaCinco}</MDBBadge>
}else if(categoriaCinco >= 10 && categoriaCinco < 14){
  categoria5Bajo= <MDBBadge color="success">{categoriaCinco}</MDBBadge>
}else if(categoriaCinco >=14 && categoriaCinco < 18){
  categoria5Medio= <MDBBadge color="warning">{categoriaCinco}</MDBBadge>
}else if(categoriaCinco >=18 && categoriaCinco < 23){
  categoria5Alto= <MDBBadge color="warning">{categoriaCinco}</MDBBadge>
}else if(categoriaCinco >= 23){
  categoria5MuyAlto= <MDBBadge color="danger">{categoriaCinco}</MDBBadge>
}


let Dominio1Nulo;
let Dominio1Bajo;
let Dominio1Medio;
let Dominio1Alto;
let Dominio1MuyAlto;
let DominioUno = (entero1+entero3+entero2+entero4+entero5);
if(DominioUno < 5){
  Dominio1Nulo= <MDBBadge color="info">{DominioUno}</MDBBadge>
}else if(DominioUno >= 5 && DominioUno < 9){
  Dominio1Bajo= <MDBBadge color="success">{DominioUno}</MDBBadge>
}else if(DominioUno >= 9 && DominioUno < 11){
  Dominio1Medio= <MDBBadge color="warning">{DominioUno}</MDBBadge>
}else if(DominioUno >=11 && DominioUno < 14){
  Dominio1Alto= <MDBBadge color="warning">{DominioUno}</MDBBadge>
}else if(DominioUno >= 14){
  Dominio1MuyAlto= <MDBBadge color="danger">{DominioUno}</MDBBadge>
}

let Dominio2Nulo;
let Dominio2Bajo;
let Dominio2Medio;
let Dominio2Alto;
let Dominio2MuyAlto;
let DominioDos = (entero6+entero12+entero7+entero8+entero9+entero10+entero11+entero65+entero66+entero67+entero68+entero13+entero14+entero15+entero16);
if(DominioDos < 15){
  Dominio2Nulo= <MDBBadge color="info">{DominioDos}</MDBBadge>
}else if(DominioDos >= 15 && DominioDos < 21){
  Dominio2Bajo= <MDBBadge color="success">{DominioDos}</MDBBadge>
}else if(DominioDos >= 21 && DominioDos < 27){
  Dominio2Medio= <MDBBadge color="warning">{DominioDos}</MDBBadge>
}else if(DominioDos >= 27 && DominioDos < 37){
  Dominio2Alto= <MDBBadge color="warning">{DominioDos}</MDBBadge>
}else if(DominioDos >= 37){
  Dominio2MuyAlto= <MDBBadge color="danger">{DominioDos}</MDBBadge>
}

let Dominio3Nulo;
let Dominio3Bajo;
let Dominio3Medio;
let Dominio3Alto;
let Dominio3MuyAlto;
let DominioTres = (entero25+entero26+entero27+entero28+entero23+entero24+entero29+entero30+entero35+entero36);
if(DominioTres < 11){
  Dominio3Nulo= <MDBBadge color="info">{DominioTres}</MDBBadge>
}else if(DominioTres >= 11 && DominioTres < 16){
  Dominio3Bajo= <MDBBadge color="success">{DominioTres}</MDBBadge>
}else if(DominioTres >= 16 && DominioTres < 21){
  Dominio3Medio= <MDBBadge color="warning">{DominioTres}</MDBBadge>
}else if(DominioTres >= 21 && DominioTres < 25){
  Dominio3Alto= <MDBBadge color="warning">{DominioTres}</MDBBadge>
}else if(DominioTres >= 25){
  Dominio3MuyAlto= <MDBBadge color="danger">{DominioTres}</MDBBadge>
}

let Dominio4Nulo;
let Dominio4Bajo;
let Dominio4Medio;
let Dominio4Alto;
let Dominio4MuyAlto;
let DominioCuatro = (entero17+entero18);
if(DominioCuatro < 1){
  Dominio4Nulo= <MDBBadge color="info">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 1 && DominioCuatro < 2){
  Dominio4Bajo= <MDBBadge color="success">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 2 && DominioCuatro < 4){
  Dominio4Medio= <MDBBadge color="warning">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 4 && DominioCuatro < 6){
  Dominio4Alto= <MDBBadge color="warning">{DominioCuatro}</MDBBadge>
}else if(DominioCuatro >= 6){
  Dominio4MuyAlto= <MDBBadge color="danger">{DominioCuatro}</MDBBadge>
}

let Dominio5Nulo;
let Dominio5Bajo;
let Dominio5Medio;
let Dominio5Alto;
let Dominio5MuyAlto;
let DominioCinco = (entero19+entero20+entero21+entero22);
if(DominioCinco < 4){
  Dominio5Nulo= <MDBBadge color="info">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 4 && DominioCinco < 6){
  Dominio5Bajo= <MDBBadge color="success">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 6 && DominioCinco < 8){
  Dominio5Medio= <MDBBadge color="warning">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 8 && DominioCinco < 10){
  Dominio5Alto= <MDBBadge color="warning">{DominioCinco}</MDBBadge>
}else if(DominioCinco >= 10){
  Dominio5MuyAlto= <MDBBadge color="danger">{DominioCinco}</MDBBadge>
}

let Dominio6Nulo;
let Dominio6Bajo;
let Dominio6Medio;
let Dominio6Alto;
let Dominio6MuyAlto;
let DominioSeis = (entero31+entero32+entero33+entero34+entero37+entero38+entero39+entero40+entero41);
if(DominioSeis < 9){
  Dominio6Nulo= <MDBBadge color="info">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 9 && DominioSeis < 12){
  Dominio6Bajo= <MDBBadge color="success">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 12 && DominioSeis < 16){
  Dominio6Medio= <MDBBadge color="warning">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 16 && DominioSeis < 20){
  Dominio6Alto= <MDBBadge color="warning">{DominioSeis}</MDBBadge>
}else if(DominioSeis >= 20){
  Dominio6MuyAlto= <MDBBadge color="danger">{DominioSeis}</MDBBadge>
}

let Dominio7Nulo;
let Dominio7Bajo;
let Dominio7Medio;
let Dominio7Alto;
let Dominio7MuyAlto;
let DominioSiete = (entero42+entero43+entero44+entero45+entero46+entero69+entero70+entero71+entero72);
if(DominioSiete < 10){
  Dominio7Nulo= <MDBBadge color="info">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 10 && DominioSiete < 13){
  Dominio7Bajo= <MDBBadge color="success">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 13 && DominioSiete < 17){
  Dominio7Medio= <MDBBadge color="warning">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 17 && DominioSiete < 21){
  Dominio7Alto= <MDBBadge color="warning">{DominioSiete}</MDBBadge>
}else if(DominioSiete >= 21){
  Dominio7MuyAlto= <MDBBadge color="danger">{DominioSiete}</MDBBadge>
}

let Dominio8Nulo;
let Dominio8Bajo;
let Dominio8Medio;
let Dominio8Alto;
let Dominio8MuyAlto;
let DominioOcho = (entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64);
if(DominioOcho < 7){
  Dominio8Nulo= <MDBBadge color="info">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 7 && DominioOcho < 10){
  Dominio8Bajo= <MDBBadge color="success">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 10 && DominioOcho < 13){
  Dominio8Medio= <MDBBadge color="warning">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 13 && DominioOcho < 16){
  Dominio8Alto= <MDBBadge color="warning">{DominioOcho}</MDBBadge>
}else if(DominioOcho >= 16){
  Dominio8MuyAlto= <MDBBadge color="danger">{DominioOcho}</MDBBadge>
}

let Dominio9Nulo;
let Dominio9Bajo;
let Dominio9Medio;
let Dominio9Alto;
let Dominio9MuyAlto;
let DominioNueve = (entero47+entero48+entero49+entero50+entero51+entero52);
if(DominioNueve < 6){
  Dominio9Nulo= <MDBBadge color="info">{DominioNueve}</MDBBadge>
}else if(DominioNueve >= 6 && DominioNueve < 10){
  Dominio9Bajo= <MDBBadge color="success">{DominioNueve}</MDBBadge>
}else if(DominioNueve >= 10 && DominioNueve < 14){
  Dominio9Medio= <MDBBadge color="warning">{DominioNueve}</MDBBadge>
}else if(DominioNueve >= 14 && DominioNueve < 18){
  Dominio9Alto= <MDBBadge color="warning">{DominioNueve}</MDBBadge>
}else if(DominioNueve >= 18){
  Dominio9MuyAlto= <MDBBadge color="danger">{DominioNueve}</MDBBadge>
}

let Dominio10Nulo;
let Dominio10Bajo;
let Dominio10Medio;
let Dominio10Alto;
let Dominio10MuyAlto;
let DominioDiez = (entero55+entero56+entero53+entero54);
if(DominioDiez < 4){
  Dominio10Nulo= <MDBBadge color="info">{DominioDiez}</MDBBadge>
}else if(DominioDiez >= 4 && DominioDiez < 6){
  Dominio10Bajo= <MDBBadge color="success">{DominioDiez}</MDBBadge>
}else if(DominioDiez >= 6 && DominioDiez < 8){
  Dominio10Medio= <MDBBadge color="warning">{DominioDiez}</MDBBadge>
}else if(DominioDiez >= 8 && DominioDiez < 10){
  Dominio10Alto= <MDBBadge color="warning">{DominioDiez}</MDBBadge>
}else if(DominioDiez >= 10){
  Dominio10MuyAlto= <MDBBadge color="danger">{DominioDiez}</MDBBadge>
}

  
    ponderacion =  <React.Fragment>
             <div>
                    <MDBBtn  color="primary" className="k-button" onClick={() => { this.pdfExportComponent.save(); }}>
                        Descargar Resultados
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
                    <font face="arial" className = "mt-4" >CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO</font>
          <br/><strong>{localStorage.getItem("razonsocial")}</strong><br/>
          <font face="arial" className = "mt-4 " >  <img ref={(image) => this.image = image} src="http://www.ads.com.mx/_Media/logotipo_ads_png_med.png" width="100px"
                /></font>
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
            <TableHead>
              <TableRow>
                <TableCell width ="10%" style={{backgroundColor: "#E6E7E8"}}>Pregunta</TableCell>
                <TableCell align="right" style={{backgroundColor: "#51EAFF"}}>Nulo</TableCell>
                <TableCell align="right" style={{backgroundColor: "#76FEC5"}}>Bajo&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#F4EDB2"}}>Medio&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#F5E027"}}>Alto&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#FF756B"}}>Muy Alto&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody  style={{marginTop:20}}>
                <TableRow>
                  <TableCell width ="15%" style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                  1
                  </TableCell>
                  <TableCell  align="right">{respuesta1}</TableCell>
                  <TableCell align="right">{respuesta2}</TableCell>              
                  <TableCell align="right">{respuesta3}</TableCell>              
                  <TableCell  align="right">{respuesta4}</TableCell>
                  <TableCell  align="right">{respuesta5}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell  style={{backgroundColor: "#E6E7E8"}}component="th" scope="row">
                 2
                  </TableCell>
                  <TableCell  align="right">{respuesta6}</TableCell>
                  <TableCell  align="right">{respuesta7}</TableCell>              
                  <TableCell align="right">{respuesta8}</TableCell>              
                  <TableCell  align="right">{respuesta9}</TableCell>
                  <TableCell  align="right">{respuesta10}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                 3
                  </TableCell>
                  <TableCell  align="right">{respuesta11}</TableCell>
                  <TableCell  align="right">{respuesta12}</TableCell>              
                  <TableCell  align="right">{respuesta13}</TableCell>              
                  <TableCell  align="right">{respuesta14}</TableCell>
                  <TableCell  align="right">{respuesta15}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell  style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                4
                  </TableCell>
                  <TableCell align="right">{respuesta16}</TableCell>
                  <TableCell align="right">{respuesta17}</TableCell>              
                  <TableCell align="right">{respuesta18}</TableCell>              
                  <TableCell  align="right">{respuesta19}</TableCell>
                  <TableCell  align="right">{respuesta20}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                5
                  </TableCell>
                  <TableCell  align="right">{respuesta21}</TableCell>
                  <TableCell  align="right">{respuesta22}</TableCell>              
                  <TableCell  align="right">{respuesta23}</TableCell>              
                  <TableCell align="right">{respuesta24}</TableCell>
                  <TableCell  align="right">{respuesta25}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                6
                  </TableCell>
                  <TableCell  align="right">{respuesta26}</TableCell>
                  <TableCell  align="right">{respuesta27}</TableCell>              
                  <TableCell align="right">{respuesta28}</TableCell>              
                  <TableCell  align="right">{respuesta29}</TableCell>
                  <TableCell  align="right">{respuesta30}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                7
                  </TableCell>
                  <TableCell  align="right">{respuesta31}</TableCell>
                  <TableCell  align="right">{respuesta32}</TableCell>              
                  <TableCell  align="right">{respuesta33}</TableCell>              
                  <TableCell  align="right">{respuesta34}</TableCell>
                  <TableCell align="right">{respuesta35}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                8
                  </TableCell>
                  <TableCell   align="right">{respuesta36}</TableCell>
                  <TableCell   align="right">{respuesta37}</TableCell>              
                  <TableCell   align="right">{respuesta38}</TableCell>              
                  <TableCell   align="right">{respuesta39}</TableCell>
                  <TableCell   align="right">{respuesta40}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                9
                  </TableCell>
                  <TableCell   align="right">{respuesta41}</TableCell>
                  <TableCell   align="right">{respuesta42}</TableCell>              
                  <TableCell   align="right">{respuesta43}</TableCell>              
                  <TableCell   align="right">{respuesta44}</TableCell>
                  <TableCell   align="right">{respuesta45}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                10
                  </TableCell>
                  <TableCell   align="right">{respuesta46}</TableCell>
                  <TableCell  align="right">{respuesta47}</TableCell>              
                  <TableCell   align="right">{respuesta48}</TableCell>              
                  <TableCell  align="right">{respuesta49}</TableCell>
                  <TableCell   align="right">{respuesta50}</TableCell>
                </TableRow>
    
                <TableRow>
                  <TableCell  style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                 11
                  </TableCell>
                  <TableCell  align="right">{respuesta51}</TableCell>
                  <TableCell  align="right">{respuesta52}</TableCell>              
                  <TableCell  align="right">{respuesta53}</TableCell>              
                  <TableCell  align="right">{respuesta54}</TableCell>
                  <TableCell  align="right">{respuesta55}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                 12
                  </TableCell>
                  <TableCell  align="right">{respuesta56}</TableCell>
                  <TableCell  align="right">{respuesta57}</TableCell>              
                  <TableCell  align="right">{respuesta58}</TableCell>              
                  <TableCell  align="right">{respuesta59}</TableCell>
                  <TableCell  align="right">{respuesta60}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                 13
                  </TableCell>
                  <TableCell  align="right">{respuesta61}</TableCell>
                  <TableCell  align="right">{respuesta62}</TableCell>              
                  <TableCell  align="right">{respuesta63}</TableCell>              
                  <TableCell  align="right">{respuesta64}</TableCell>
                  <TableCell  align="right">{respuesta65}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                14
                  </TableCell>
                  <TableCell align="right">{respuesta66}</TableCell>
                  <TableCell  align="right">{respuesta67}</TableCell>              
                  <TableCell align="right">{respuesta68}</TableCell>              
                  <TableCell  align="right">{respuesta69}</TableCell>
                  <TableCell  align="right">{respuesta70}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                15
                  </TableCell>
                  <TableCell  align="right">{respuesta71}</TableCell>
                  <TableCell  align="right">{respuesta72}</TableCell>              
                  <TableCell  align="right">{respuesta73}</TableCell>              
                  <TableCell  align="right">{respuesta74}</TableCell>
                  <TableCell  align="right">{respuesta75}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                16
                  </TableCell>
                  <TableCell  align="right">{respuesta76}</TableCell>
                  <TableCell  align="right">{respuesta77}</TableCell>              
                  <TableCell  align="right">{respuesta78}</TableCell>              
                  <TableCell  align="right">{respuesta79}</TableCell>
                  <TableCell  align="right">{respuesta80}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                17
                  </TableCell>
                  <TableCell  align="right">{respuesta81}</TableCell>
                  <TableCell  align="right">{respuesta82}</TableCell>              
                  <TableCell  align="right">{respuesta83}</TableCell>              
                  <TableCell  align="right">{respuesta84}</TableCell>
                  <TableCell  align="right">{respuesta85}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell  style={{backgroundColor: "#E6E7E8"}}component="th" scope="row">
                18
                  </TableCell>
                  <TableCell  align="right">{respuesta86}</TableCell>
                  <TableCell  align="right">{respuesta87}</TableCell>              
                  <TableCell  align="right">{respuesta88}</TableCell>              
                  <TableCell  align="right">{respuesta89}</TableCell>
                  <TableCell  align="right">{respuesta90}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                19
                  </TableCell>
                  <TableCell  align="right">{respuesta91}</TableCell>
                  <TableCell align="right">{respuesta92}</TableCell>              
                  <TableCell  align="right">{respuesta93}</TableCell>              
                  <TableCell  align="right">{respuesta94}</TableCell>
                  <TableCell  align="right">{respuesta95}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell  style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                20
                  </TableCell>
                  <TableCell  align="right">{respuesta96}</TableCell>
                  <TableCell  align="right">{respuesta97}</TableCell>              
                  <TableCell  align="right">{respuesta98}</TableCell>              
                  <TableCell  align="right">{respuesta99}</TableCell>
                  <TableCell  align="right">{respuesta100}</TableCell>
                </TableRow>
    
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                  21
                  </TableCell>
                  <TableCell  align="right">{respuesta101}</TableCell>
                  <TableCell  align="right">{respuesta102}</TableCell>              
                  <TableCell  align="right">{respuesta103}</TableCell>              
                  <TableCell  align="right">{respuesta104}</TableCell>
                  <TableCell  align="right">{respuesta105}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                 22
                  </TableCell>
                  <TableCell  align="right">{respuesta106}</TableCell>
                  <TableCell  align="right">{respuesta107}</TableCell>              
                  <TableCell  align="right">{respuesta108}</TableCell>              
                  <TableCell  align="right">{respuesta109}</TableCell>
                  <TableCell  align="right">{respuesta110}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                 23
                  </TableCell>
                  <TableCell  align="right">{respuesta111}</TableCell>
                  <TableCell  align="right">{respuesta112}</TableCell>              
                  <TableCell  align="right">{respuesta113}</TableCell>              
                  <TableCell  align="right">{respuesta114}</TableCell>
                  <TableCell  align="right">{respuesta115}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                24
                  </TableCell>
                  <TableCell  align="right">{respuesta116}</TableCell>
                  <TableCell align="right">{respuesta117}</TableCell>              
                  <TableCell  align="right">{respuesta118}</TableCell>              
                  <TableCell align="right">{respuesta119}</TableCell>
                  <TableCell  align="right">{respuesta120}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
               25
                  </TableCell>
                  <TableCell  align="right">{respuesta121}</TableCell>
                  <TableCell  align="right">{respuesta122}</TableCell>              
                  <TableCell  align="right">{respuesta123}</TableCell>              
                  <TableCell  align="right">{respuesta124}</TableCell>
                  <TableCell align="right">{respuesta125}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                26
                  </TableCell>
                  <TableCell  align="right">{respuesta126}</TableCell>
                  <TableCell  align="right">{respuesta127}</TableCell>              
                  <TableCell  align="right">{respuesta128}</TableCell>              
                  <TableCell  align="right">{respuesta129}</TableCell>
                  <TableCell  align="right">{respuesta130}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                27
                  </TableCell>
                  <TableCell  align="right">{respuesta131}</TableCell>
                  <TableCell  align="right">{respuesta132}</TableCell>              
                  <TableCell  align="right">{respuesta133}</TableCell>              
                  <TableCell  align="right">{respuesta134}</TableCell>
                  <TableCell  align="right">{respuesta135}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                28
                  </TableCell>
                  <TableCell  align="right">{respuesta136}</TableCell>
                  <TableCell  align="right">{respuesta137}</TableCell>              
                  <TableCell  align="right">{respuesta138}</TableCell>              
                  <TableCell  align="right">{respuesta139}</TableCell>
                  <TableCell  align="right">{respuesta140}</TableCell>
                </TableRow>
                <TableRow>
                  
                  <TableCell  style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                29
                  </TableCell>
                  <TableCell  align="right">{respuesta141}</TableCell>
                  <TableCell  align="right">{respuesta142}</TableCell>              
                  <TableCell  align="right">{respuesta143}</TableCell>              
                  <TableCell  align="right">{respuesta144}</TableCell>
                  <TableCell  align="right">{respuesta145}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                  </TableCell>
                  <TableCell style={{backgroundColor: "#51EAFF"}} align="right">Nulo</TableCell>
                  <TableCell style={{backgroundColor: "#76FEC5"}} align="right">Bajo</TableCell>              
                  <TableCell align="right" style={{backgroundColor: "#F4EDB2"}} align="right">Medio</TableCell>              
                  <TableCell  align="right" style={{backgroundColor: "#F5E027"}}align="right">Alto</TableCell>
                  <TableCell align="right" align="right" style={{backgroundColor: "#FF756B"}} >Muy Alto</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell  style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                30
                  </TableCell>
                  <TableCell  align="right">{respuesta146}</TableCell>
                  <TableCell align="right">{respuesta147}</TableCell>              
                  <TableCell align="right">{respuesta148}</TableCell>              
                  <TableCell  align="right">{respuesta149}</TableCell>
                  <TableCell align="right">{respuesta150}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                31
                  </TableCell>
                  <TableCell align="right">{respuesta151}</TableCell>
                  <TableCell  align="right">{respuesta152}</TableCell>              
                  <TableCell  align="right">{respuesta153}</TableCell>              
                  <TableCell  align="right">{respuesta154}</TableCell>
                  <TableCell  align="right">{respuesta155}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                 32
                  </TableCell>
                  <TableCell  align="right">{respuesta156}</TableCell>
                  <TableCell  align="right">{respuesta157}</TableCell>              
                  <TableCell  align="right">{respuesta158}</TableCell>              
                  <TableCell  align="right">{respuesta159}</TableCell>
                  <TableCell  align="right">{respuesta160}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                 33
                  </TableCell>
                  <TableCell  align="right">{respuesta161}</TableCell>
                  <TableCell align="right">{respuesta162}</TableCell>              
                  <TableCell  align="right">{respuesta163}</TableCell>              
                  <TableCell align="right">{respuesta164}</TableCell>
                  <TableCell  align="right">{respuesta165}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                34
                  </TableCell>
                  <TableCell align="right">{respuesta166}</TableCell>
                  <TableCell  align="right">{respuesta167}</TableCell>              
                  <TableCell  align="right">{respuesta168}</TableCell>              
                  <TableCell align="right">{respuesta169}</TableCell>
                  <TableCell align="right">{respuesta170}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
               35
                  </TableCell>
                  <TableCell  align="right">{respuesta171}</TableCell>
                  <TableCell  align="right">{respuesta172}</TableCell>              
                  <TableCell  align="right">{respuesta173}</TableCell>              
                  <TableCell  align="right">{respuesta174}</TableCell>
                  <TableCell  align="right">{respuesta175}</TableCell>
                </TableRow>
               
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                36
                  </TableCell>
                  <TableCell  align="right">{respuesta176}</TableCell>
                  <TableCell  align="right">{respuesta177}</TableCell>              
                  <TableCell align="right">{respuesta178}</TableCell>              
                  <TableCell  align="right">{respuesta179}</TableCell>
                  <TableCell align="right">{respuesta180}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                37
                  </TableCell>
                  <TableCell align="right">{respuesta181}</TableCell>
                  <TableCell  align="right">{respuesta182}</TableCell>              
                  <TableCell align="right">{respuesta183}</TableCell>              
                  <TableCell  align="right">{respuesta184}</TableCell>
                  <TableCell  align="right">{respuesta185}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                38
                  </TableCell>
                  <TableCell  align="right">{respuesta186}</TableCell>
                  <TableCell  align="right">{respuesta187}</TableCell>              
                  <TableCell  align="right">{respuesta188}</TableCell>              
                  <TableCell  align="right">{respuesta189}</TableCell>
                  <TableCell  align="right">{respuesta190}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                39
                  </TableCell>
                  <TableCell  align="right">{respuesta191}</TableCell>
                  <TableCell  align="right">{respuesta192}</TableCell>              
                  <TableCell  align="right">{respuesta193}</TableCell>              
                  <TableCell  align="right">{respuesta194}</TableCell>
                  <TableCell  align="right">{respuesta195}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                40
                  </TableCell>
                  <TableCell  align="right">{respuesta196}</TableCell>
                  <TableCell  align="right">{respuesta197}</TableCell>              
                  <TableCell  align="right">{respuesta198}</TableCell>              
                  <TableCell  align="right">{respuesta199}</TableCell>
                  <TableCell  align="right">{respuesta200}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                41
                  </TableCell>
                  <TableCell  align="right">{respuesta201}</TableCell>
                  <TableCell  align="right">{respuesta202}</TableCell>              
                  <TableCell  align="right">{respuesta203}</TableCell>              
                  <TableCell  align="right">{respuesta204}</TableCell>
                  <TableCell  align="right">{respuesta205}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                42
                  </TableCell>
                  <TableCell  align="right">{respuesta206}</TableCell>
                  <TableCell  align="right">{respuesta207}</TableCell>              
                  <TableCell  align="right">{respuesta208}</TableCell>              
                  <TableCell  align="right">{respuesta209}</TableCell>
                  <TableCell  align="right">{respuesta210}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                43
                  </TableCell>
                  <TableCell  align="right">{respuesta211}</TableCell>
                  <TableCell  align="right">{respuesta212}</TableCell>              
                  <TableCell align="right">{respuesta213}</TableCell>              
                  <TableCell  align="right">{respuesta214}</TableCell>
                  <TableCell  align="right">{respuesta215}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                44
                  </TableCell>
                  <TableCell  align="right">{respuesta216}</TableCell>
                  <TableCell  align="right">{respuesta217}</TableCell>              
                  <TableCell  align="right">{respuesta218}</TableCell>              
                  <TableCell  align="right">{respuesta219}</TableCell>
                  <TableCell  align="right">{respuesta220}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                45
                  </TableCell>
                  <TableCell  align="right">{respuesta221}</TableCell>
                  <TableCell  align="right">{respuesta222}</TableCell>              
                  <TableCell  align="right">{respuesta223}</TableCell>              
                  <TableCell  align="right">{respuesta224}</TableCell>
                  <TableCell  align="right">{respuesta225}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                46
                  </TableCell>
                  <TableCell  align="right">{respuesta226}</TableCell>
                  <TableCell  align="right">{respuesta227}</TableCell>              
                  <TableCell align="right">{respuesta228}</TableCell>              
                  <TableCell  align="right">{respuesta229}</TableCell>
                  <TableCell  align="right">{respuesta230}</TableCell>
                </TableRow>


                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                47
                  </TableCell>
                  <TableCell  align="right">{respuesta231}</TableCell>
                  <TableCell  align="right">{respuesta232}</TableCell>              
                  <TableCell  align="right">{respuesta233}</TableCell>              
                  <TableCell  align="right">{respuesta234}</TableCell>
                  <TableCell  align="right">{respuesta235}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                48
                  </TableCell>
                  <TableCell  align="right">{respuesta236}</TableCell>
                  <TableCell  align="right">{respuesta237}</TableCell>              
                  <TableCell  align="right">{respuesta238}</TableCell>              
                  <TableCell  align="right">{respuesta239}</TableCell>
                  <TableCell  align="right">{respuesta240}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                 49
                  </TableCell>
                  <TableCell  align="right">{respuesta241}</TableCell>
                  <TableCell  align="right">{respuesta242}</TableCell>              
                  <TableCell  align="right">{respuesta243}</TableCell>              
                  <TableCell  align="right">{respuesta244}</TableCell>
                  <TableCell  align="right">{respuesta245}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                 50
                  </TableCell>
                  <TableCell  align="right">{respuesta246}</TableCell>
                  <TableCell  align="right">{respuesta247}</TableCell>              
                  <TableCell  align="right">{respuesta248}</TableCell>              
                  <TableCell  align="right">{respuesta249}</TableCell>
                  <TableCell  align="right">{respuesta250}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                51
                  </TableCell>
                  <TableCell  align="right">{respuesta251}</TableCell>
                  <TableCell  align="right">{respuesta252}</TableCell>              
                  <TableCell  align="right">{respuesta253}</TableCell>              
                  <TableCell  align="right">{respuesta254}</TableCell>
                  <TableCell  align="right">{respuesta255}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
               52
                  </TableCell>
                  <TableCell align="right">{respuesta256}</TableCell>
                  <TableCell  align="right">{respuesta257}</TableCell>              
                  <TableCell  align="right">{respuesta258}</TableCell>              
                  <TableCell  align="right">{respuesta259}</TableCell>
                  <TableCell  align="right">{respuesta260}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                53
                  </TableCell>
                  <TableCell align="right">{respuesta261}</TableCell>
                  <TableCell  align="right">{respuesta262}</TableCell>              
                  <TableCell align="right">{respuesta263}</TableCell>              
                  <TableCell  align="right">{respuesta264}</TableCell>
                  <TableCell  align="right">{respuesta265}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                54
                  </TableCell>
                  <TableCell  align="right">{respuesta266}</TableCell>
                  <TableCell  align="right">{respuesta267}</TableCell>              
                  <TableCell  align="right">{respuesta268}</TableCell>              
                  <TableCell  align="right">{respuesta269}</TableCell>
                  <TableCell  align="right">{respuesta270}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                55
                  </TableCell>
                  <TableCell  align="right">{respuesta271}</TableCell>
                  <TableCell  align="right">{respuesta272}</TableCell>              
                  <TableCell  align="right">{respuesta273}</TableCell>              
                  <TableCell  align="right">{respuesta274}</TableCell>
                  <TableCell  align="right">{respuesta275}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                56
                  </TableCell>
                  <TableCell  align="right">{respuesta276}</TableCell>
                  <TableCell  align="right">{respuesta277}</TableCell>              
                  <TableCell  align="right">{respuesta278}</TableCell>              
                  <TableCell  align="right">{respuesta279}</TableCell>
                  <TableCell  align="right">{respuesta280}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                57
                  </TableCell>
                  <TableCell  align="right">{respuesta281}</TableCell>
                  <TableCell align="right">{respuesta282}</TableCell>              
                  <TableCell  align="right">{respuesta283}</TableCell>              
                  <TableCell  align="right">{respuesta284}</TableCell>
                  <TableCell  align="right">{respuesta285}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                58
                  </TableCell>
                  <TableCell  align="right">{respuesta286}</TableCell>
                  <TableCell  align="right">{respuesta287}</TableCell>              
                  <TableCell  align="right">{respuesta288}</TableCell>              
                  <TableCell  align="right">{respuesta289}</TableCell>
                  <TableCell  align="right">{respuesta290}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                59
                  </TableCell>
                  <TableCell  align="right">{respuesta291}</TableCell>
                  <TableCell  align="right">{respuesta292}</TableCell>              
                  <TableCell  align="right">{respuesta293}</TableCell>              
                  <TableCell  align="right">{respuesta294}</TableCell>
                  <TableCell  align="right">{respuesta295}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                60
                  </TableCell>
                  <TableCell  align="right">{respuesta296}</TableCell>
                  <TableCell  align="right">{respuesta297}</TableCell>              
                  <TableCell  align="right">{respuesta298}</TableCell>              
                  <TableCell  align="right">{respuesta299}</TableCell>
                  <TableCell align="right">{respuesta300}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                61
                  </TableCell>
                  <TableCell  align="right">{respuesta301}</TableCell>
                  <TableCell  align="right">{respuesta302}</TableCell>              
                  <TableCell  align="right">{respuesta303}</TableCell>              
                  <TableCell align="right">{respuesta304}</TableCell>
                  <TableCell  align="right">{respuesta305}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                62
                  </TableCell>
                  <TableCell align="right">{respuesta306}</TableCell>
                  <TableCell  align="right">{respuesta307}</TableCell>              
                  <TableCell  align="right">{respuesta308}</TableCell>              
                  <TableCell  align="right">{respuesta309}</TableCell>
                  <TableCell  align="right">{respuesta310}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                63
                  </TableCell>
                  <TableCell  align="right">{respuesta311}</TableCell>
                  <TableCell  align="right">{respuesta312}</TableCell>              
                  <TableCell  align="right">{respuesta313}</TableCell>              
                  <TableCell  align="right">{respuesta314}</TableCell>
                  <TableCell  align="right">{respuesta315}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                64
                  </TableCell>
                  <TableCell  align="right">{respuesta316}</TableCell>
                  <TableCell align="right">{respuesta317}</TableCell>              
                  <TableCell  align="right">{respuesta318}</TableCell>              
                  <TableCell  align="right">{respuesta319}</TableCell>
                  <TableCell  align="right">{respuesta320}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                65
                  </TableCell>
                  <TableCell  align="right">{respuesta321}</TableCell>
                  <TableCell  align="right">{respuesta322}</TableCell>              
                  <TableCell  align="right">{respuesta323}</TableCell>              
                  <TableCell  align="right">{respuesta324}</TableCell>
                  <TableCell  align="right">{respuesta325}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                66
                  </TableCell>
                  <TableCell  align="right">{respuesta326}</TableCell>
                  <TableCell  align="right">{respuesta327}</TableCell>              
                  <TableCell  align="right">{respuesta328}</TableCell>              
                  <TableCell align="right">{respuesta329}</TableCell>
                  <TableCell  align="right">{respuesta330}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                67
                  </TableCell>
                  <TableCell  align="right">{respuesta331}</TableCell>
                  <TableCell  align="right">{respuesta332}</TableCell>              
                  <TableCell  align="right">{respuesta333}</TableCell>              
                  <TableCell  align="right">{respuesta334}</TableCell>
                  <TableCell align="right">{respuesta335}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                68
                  </TableCell>
                  <TableCell  align="right">{respuesta336}</TableCell>
                  <TableCell  align="right">{respuesta337}</TableCell>              
                  <TableCell  align="right">{respuesta338}</TableCell>              
                  <TableCell  align="right">{respuesta339}</TableCell>
                  <TableCell  align="right">{respuesta340}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                69
                  </TableCell>
                  <TableCell  align="right">{respuesta341}</TableCell>
                  <TableCell  align="right">{respuesta342}</TableCell>              
                  <TableCell  align="right">{respuesta343}</TableCell>              
                  <TableCell  align="right">{respuesta344}</TableCell>
                  <TableCell  align="right">{respuesta345}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                70
                  </TableCell>
                  <TableCell  align="right">{respuesta346}</TableCell>
                  <TableCell  align="right">{respuesta347}</TableCell>              
                  <TableCell  align="right">{respuesta348}</TableCell>              
                  <TableCell  align="right">{respuesta349}</TableCell>
                  <TableCell align="right">{respuesta350}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                71
                  </TableCell>
                  <TableCell  align="right">{respuesta351}</TableCell>
                  <TableCell  align="right">{respuesta352}</TableCell>              
                  <TableCell  align="right">{respuesta353}</TableCell>              
                  <TableCell  align="right">{respuesta354}</TableCell>
                  <TableCell  align="right">{respuesta355}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{backgroundColor: "#E6E7E8"}} component="th" scope="row">
                72
                  </TableCell>
                  <TableCell  align="right">{respuesta356}</TableCell>
                  <TableCell  align="right">{respuesta357}</TableCell>              
                  <TableCell  align="right">{respuesta358}</TableCell>              
                  <TableCell  align="right">{respuesta359}</TableCell>
                  <TableCell  align="right">{respuesta360}</TableCell>
                </TableRow>
              
    
                <TableRow>
                  <TableCell component="th" scope="row">
                Puntuación total
                  </TableCell>
                 {celda}{total}
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    

    
        <TableContainer component={Paper} style={{marginBottom:30}}>
          <Table  size="small" aria-label="a dense table" >
            <TableHead>
              <TableRow>
                <TableCell width="50%" ></TableCell>
                <TableCell align="right" style={{backgroundColor: "#51EAFF"}}>Nulo</TableCell>
                <TableCell align="right" style={{backgroundColor: "#76FEC5"}}>Bajo&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#F4EDB2"}}>Medio&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#F5E027"}}>Alto&nbsp;</TableCell>
                <TableCell align="right" style={{backgroundColor: "#FF756B"}}>Muy Alto&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody  style={{marginTop:20}}>       
                <TableRow>
                  <TableCell component="th" scope="row"  style={{backgroundColor: "#E6E7E8"}}><strong>Resultados de la Categoría</strong></TableCell>              
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell component="th" scope="row" ></TableCell>
                  <TableCell component="th" scope="row" ></TableCell>
                  <TableCell component="th" scope="row" ></TableCell>
                  <TableCell component="th" scope="row" ></TableCell>  
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >I. Ambiente de Trabajo</TableCell>
                <TableCell component="th" scope="row" >{categoria1Nulo}</TableCell>
                <TableCell component="th" scope="row" >{categoria1Bajo}</TableCell>
                <TableCell component="th" scope="row" >{categoria1Medio}</TableCell>
                <TableCell component="th" scope="row" >{categoria1Alto}</TableCell>
                <TableCell component="th" scope="row" >{categoria1MuyAlto}</TableCell>           
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >II. Factores propios de la actividad</TableCell>   
                <TableCell component="th" scope="row" >{categoria2Nulo}</TableCell>
                <TableCell component="th" scope="row" >{categoria2Bajo}</TableCell>
                <TableCell component="th" scope="row" >{categoria2Medio}</TableCell>
                <TableCell component="th" scope="row" >{categoria2Alto}</TableCell>
                <TableCell component="th" scope="row" >{categoria2MuyAlto}</TableCell>    
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >III. Organización del tiempo de trabajo</TableCell>   
                <TableCell component="th" scope="row" >{categoria3Nulo}</TableCell>
                <TableCell component="th" scope="row" >{categoria3Bajo}</TableCell>
                <TableCell component="th" scope="row" >{categoria3Medio}</TableCell>
                <TableCell component="th" scope="row" >{categoria3Alto}</TableCell>
                <TableCell component="th" scope="row" >{categoria3MuyAlto}</TableCell>    
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >IV. Liderazgo y relaciones en el trabajo</TableCell>   
                <TableCell component="th" scope="row" >{categoria4Nulo}</TableCell>
                <TableCell component="th" scope="row" >{categoria4Bajo}</TableCell>
                <TableCell component="th" scope="row" >{categoria4Medio}</TableCell>
                <TableCell component="th" scope="row" >{categoria4Alto}</TableCell>
                <TableCell component="th" scope="row" >{categoria4MuyAlto}</TableCell>           
                </TableRow>

                <TableRow>
                <TableCell component="th" scope="row" >V. Entorno organizacional</TableCell>   
                <TableCell component="th" scope="row" >{categoria5Nulo}</TableCell>
                <TableCell component="th" scope="row" >{categoria5Bajo}</TableCell>
                <TableCell component="th" scope="row" >{categoria5Medio}</TableCell>
                <TableCell component="th" scope="row" >{categoria5Alto}</TableCell>
                <TableCell component="th" scope="row" >{categoria5MuyAlto}</TableCell>           
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
                <TableCell component="th" scope="row" >{Dominio1Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio1Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio1Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio1Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio1MuyAlto}</TableCell>
    
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >II. Carga de trabajo</TableCell>    
                <TableCell component="th" scope="row" >{Dominio2Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio2Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio2Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio2Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio2MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >III. Falta de control sobre el trabajo</TableCell>     
                <TableCell component="th" scope="row" >{Dominio3Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio3Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio3Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio3Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio3MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >IV. Jornada de trabajo</TableCell>  
                <TableCell component="th" scope="row" >{Dominio4Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio4Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio4Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio4Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio4MuyAlto}</TableCell>         
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >V. Interferencia en la relación trabajo-familia</TableCell>           
                <TableCell component="th" scope="row" >{Dominio5Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio5Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio5Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio5Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio5MuyAlto}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >VI. Liderazgo</TableCell>    
                <TableCell component="th" scope="row" >{Dominio6Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio6Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio6Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio6Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio6MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >VII. Relaciones en el trabajo</TableCell>    
                <TableCell component="th" scope="row" >{Dominio7Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio7Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio7Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio7Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio7MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >VIII. Violencia</TableCell>    
                <TableCell component="th" scope="row" >{Dominio8Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio8Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio8Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio8Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio8MuyAlto}</TableCell>        
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >IX. Reconocimiento del desempeño</TableCell>    
                <TableCell component="th" scope="row" >{Dominio9Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio9Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio9Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio9Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio9MuyAlto}</TableCell>       
                </TableRow>
                <TableRow>
                <TableCell component="th" scope="row" >XX. Insuficiente sentido de pertenencia e, inestabilidad</TableCell>    
                <TableCell component="th" scope="row" >{Dominio10Nulo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio10Bajo}</TableCell>
                <TableCell component="th" scope="row" >{Dominio10Medio}</TableCell>
                <TableCell component="th" scope="row" >{Dominio10Alto}</TableCell>
                <TableCell component="th" scope="row" >{Dominio10MuyAlto}</TableCell>        
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
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{entero1+entero3}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >2.- Condiciones deficientes e insalubres</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{entero2+entero4}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow> 
           
            <TableRow>
            <TableCell component="th" scope="row" >3.- Trabajos peligrosos</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{entero5}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%">4.- Cargas cuantitativas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero6+entero12)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >5.- Ritmos de trabajo acelerado</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero7+entero8)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >6.- Carga mental</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero9+entero10+entero11)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >7.- Cargas psicológicas emocionales</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero65+entero66+entero67+entero68)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >8.- Cargas de alta responsabilidad</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero13+entero14)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >9.- Cargas contradictorias o inconsistentes</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero15+entero16)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" width="50%" >10.- Falta de control y autonomía sobre el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero25+entero26+entero27+entero28)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >11.- Limitada o nula posibilidad de desarrollo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero23+entero24)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>

            <TableRow>
            <TableCell component="th" scope="row" >12.- Insuficiente participación y manejo del cambio</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero29+entero30)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>



            <TableRow>
            <TableCell component="th" scope="row" >13.- Limitada o inexistente capacitación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero35+entero36)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >14.- Jornadas de trabajo extensas</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero17+entero18)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >15.- Influencia del trabajo fuera del centro laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero19+entero20)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >16.- Influencia de las responsabilidades familiares</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero21+entero22)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >17.- Escasa claridad de funciones</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero31+entero32+entero33+entero34)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >18.- Características del liderazgo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero37+entero38+entero39+entero40+entero41)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >19.- Relaciones sociales en el trabajo</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero42+entero43+entero44+entero45+entero46)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >20.- Deficiente relación con los colaboradores que supervisa</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero69+entero70+entero71+entero72)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >21.- Violencia laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero57+entero58+entero59+entero60+entero61+entero62+entero63+entero64)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >22.- Escasa o nula retroalimentación del desempeño</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero47+entero48)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>

            <TableRow>
            <TableCell component="th" scope="row" >23.- Escaso o nulo reconocimiento y compensación</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero49+entero50+entero51+entero52)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >24.- Limitado sentido de pertenencia</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero55+entero56)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row" >25.- Inestabilidad laboral</TableCell> 
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ><strong>Valor</strong></TableCell>
            <TableCell component="th" scope="row" > <MDBBadge  color="primary">{(entero53+entero54)}</MDBBadge ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            <TableCell component="th" scope="row" ></TableCell>
            </TableRow>
          </TableBody>
          </Table>        
          </TableContainer>
          </PDFExport>
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
