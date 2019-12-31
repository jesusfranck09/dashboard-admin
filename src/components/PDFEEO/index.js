import React, { Component } from 'react';
// import { render } from 'react-dom';
import './index.css';
import Doc from './pdfDat';
import PdfContainer from './pdf';
import axios from 'axios'
//  import ADS from '../images/foto.jpeg'
import {MDBContainer, MDBRow, MDBCol,MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';



import {Alert} from 'reactstrap'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos:[],
      resultados:[],
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

  createPdf = (html) => Doc.createPdf(html);
  componentWillMount(){  
    var correo  = localStorage.getItem("correo")    
     const url = 'http://localhost:8000/graphql'
    axios({
      url:  url,
      method:'post',
      data:{
      query:`
      query{
        getUsersTableEmployees(email:"${correo}"){
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
            this.setState({ datos: datos.data.data.getUsersTableEmployees});
           console.log("this.state.resultados" ,  datos.data.data.getUsersTableEmployees)
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
                              console.log("los resultados son " , datos.data.data.resultSingleSurveyEEO)
                            this.setState({resultados :datos.data.data.resultSingleSurveyEEO })                
                          console.log(this.state.resultados[0].nombre)
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

      <PdfContainer createPdf={this.createPdf}>
    
        <React.Fragment>


          <section className="flex-column  bg-white  pa4 "  >
          <font face="arial" className = "mt-4" >CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL Y EVALUAR EL ENTORNO ORGANIZACIONAL EN LOS CENTROS DE TRABAJO</font>
          <font face="arial " className = "mt-4 " > {localStorage.getItem("razonsocial")}</font>
                <MDBContainer style={container}>
                <MDBTable responsive small borderless className="text-left mt-4 ">
       
                <MDBTableBody>                  
                  <tr>
                  <td width="6%" >Nombre : {this.state.resultados[0].nombre} {this.state.resultados[0].ApellidoP} {this.state.resultados[0].ApellidoM} </td>
                  <td width="6%" >Puesto : {this.state.resultados[0].Puesto}</td>
                                </tr>
                                <tr>
                  <td width="6%" >Departamento : {this.state.resultados[0].AreaTrabajo}</td>
                  <td width="6%" >Genero : {this.state.resultados[0].Sexo}</td> 
                                </tr>
                                <tr>
                  <td width="6%" >Correo : {this.state.resultados[0].correo}</td>
                  <td width="6%" >RFC : {this.state.resultados[0].RFC}</td>   
                 
                  </tr>
                </MDBTableBody>
                </MDBTable>
                </MDBContainer>
                
                <MDBContainer>
                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>I. Condiciones ambientales de su centro de trabajo.</th>    
                      <td></td>   
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>1</td>
                      <td>El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</td>
                      <td width="10%">{this.state.resultados[1].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Mi trabajo me exige hacer mucho esfuerzo físico</td>
                      <td width="10%">{this.state.resultados[2].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Me preocupa sufrir un accidente en mi trabajo</td>
                      <td width="10%">{this.state.resultados[3].Respuestas}</td> 
                    </tr>                    
                    <tr>
                      <td>4</td>
                      <td>Considero que en mi trabajo se aplican las normas de seguridad y salud en el trabajo</td>
                      <td width="10%">{this.state.resultados[4].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Considero que las actividades que realizo son peligrosas</td>
                      <td width="10%">{this.state.resultados[5].Respuestas}</td> 
                    </tr>
 
                  </MDBTableBody>
                </MDBTable> 
                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>II. La cantidad y ritmo de trabajo que tiene.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>6</td>
                      <td>Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno</td>   
                      <td width="10%">{this.state.resultados[6].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Por la cantidad de trabajo que tengo debo trabajar sin parar</td>   
                      <td width="10%">{this.state.resultados[7].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Considero que es necesario mantener un ritmo de trabajo acelerado</td>   
                      <td width="10%">{this.state.resultados[8].Respuestas}</td> 
                    </tr>
                  </MDBTableBody>
                </MDBTable> 

                <MDBTable bordered responsive className="mt-4 text-left">
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
                      <td width="10%">{this.state.resultados[9].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Mi trabajo requiere que memorice mucha información</td>   
                      <td width="10%">{this.state.resultados[10].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>En mi trabajo tengo que tomar decisiones difíciles muy rápido</td>   
                      <td width="10%">{this.state.resultados[11].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>Mi trabajo exige que atienda varios asuntos al mismo tiempo</td>   
                      <td width="10%">{this.state.resultados[12].Respuestas}</td> 
                    </tr>
                   
                  </MDBTableBody>
                </MDBTable> 


                <MDBTable bordered responsive className="mt-4 text-left">
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
                      <td width="10%">{this.state.resultados[13].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>14</td>
                      <td>Respondo ante mi jefe por los resultados de toda mi área de trabajo</td>   
                      <td width="10%">{this.state.resultados[14].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>En el trabajo me dan órdenes contradictorias</td>   
                      <td width="10%">{this.state.resultados[15].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>16</td>
                      <td>Considero que en mi trabajo me piden hacer cosas innecesarias</td>   
                      <td width="10%">{this.state.resultados[16].Respuestas}</td> 
                    </tr>
                    
                  </MDBTableBody>
                </MDBTable> 
                <MDBTable bordered responsive className="mt-4 text-left">
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
                      <td width="10%">{this.state.resultados[18].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>19</td>
                      <td>Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales</td>   
                      <td width="10%">{this.state.resultados[19].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>20</td>
                      <td>Debo atender asuntos de trabajo cuando estoy en casa</td>   
                      <td width="10%">{this.state.resultados[20].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>21</td>
                      <td>Pienso en las actividades familiares o personales cuando estoy en mi trabajo</td>   
                      <td width="10%">{this.state.resultados[21].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>22</td>
                      <td>Pienso que mis responsabilidades familiares afectan mi trabajo</td>   
                      <td width="10%">{this.state.resultados[22].Respuestas}</td> 
                    </tr>
                  </MDBTableBody>
                </MDBTable> 
                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>VI. Decisiones que puede tomar en su trabajo.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>23</td>
                      <td>Mi trabajo permite que desarrolle nuevas habilidades</td>   
                      <td width="10%">{this.state.resultados[23].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>24</td>
                      <td>En mi trabajo puedo aspirar a un mejor puesto</td>   
                      <td width="10%">{this.state.resultados[24].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>25</td>
                      <td>Durante mi jornada de trabajo puedo tomar pausas cuando las necesito</td>   
                      <td width="10%">{this.state.resultados[25].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>26</td>
                      <td>Puedo decidir cuánto trabajo realizo durante la jornada laboral</td>   
                      <td width="10%">{this.state.resultados[26].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>27</td>
                      <td>Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo</td>   
                      <td width="10%">{this.state.resultados[27].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>28</td>
                      <td>Puedo cambiar el orden de las actividades que realizo en mi trabajo</td>   
                      <td width="10%">{this.state.resultados[28].Respuestas}</td> 
                    </tr>
                  
                  </MDBTableBody>
                </MDBTable> 
                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>VII. Cualquier tipo de cambio que ocurra en su trabajo (considere los últimos cambios realizados).</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>29</td>
                      <td>Los cambios que se presentan en mi trabajo dificultan mi labor</td>   
                      <td width="10%">{this.state.resultados[29].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>30</td>
                      <td>Cuando se presentan cambios en mi trabajo se tienen en cuenta mis ideas o aportaciones</td>   
                      <td width="10%">{this.state.resultados[30].Respuestas}</td> 
                    </tr>
            
                  </MDBTableBody>
                </MDBTable> 

                <MDBTable bordered responsive className="mt-4 text-left">
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
                      <td width="10%">{this.state.resultados[31].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>32</td>
                      <td>Me explican claramente los resultados que debo obtener en mi trabajo</td>   
                      <td width="10%">{this.state.resultados[32].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>33</td>
                      <td>Me explican claramente los objetivos de mi trabajo</td>   
                      <td width="10%">{this.state.resultados[33].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>34</td>
                      <td>Me informan con quién puedo resolver problemas o asuntos de trabajo</td>   
                      <td width="10%">{this.state.resultados[34].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>35</td>
                      <td>Me permiten asistir a capacitaciones relacionadas con mi trabajo</td>   
                      <td width="10%">{this.state.resultados[35].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>36</td>
                      <td>Recibo capacitación útil para hacer mi trabajo</td>   
                      <td width="10%">{this.state.resultados[36].Respuestas}</td> 
                    </tr>

                  </MDBTableBody>
                </MDBTable> 


                
                <MDBTable bordered responsive className="mt-4 text-left">
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
                      <td width="10%">{this.state.resultados[37].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>38</td>
                      <td>Mi jefe tiene en cuenta mis puntos de vista y opiniones</td>   
                      <td width="10%">{this.state.resultados[38].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>39</td>
                      <td>Mi jefe me comunica a tiempo la información relacionada con el trabajo</td>   
                      <td width="10%">{this.state.resultados[39].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>40</td>
                      <td>La orientación que me da mi jefe me ayuda a realizar mejor mi trabajo</td>   
                      <td width="10%">{this.state.resultados[40].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>41</td>
                      <td>Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo</td>   
                      <td width="10%">{this.state.resultados[41].Respuestas}</td> 
                    </tr>
                   

                  </MDBTableBody>
                </MDBTable> 


                
                <MDBTable bordered responsive className="mt-4 text-left">
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
                      <td width="10%">{this.state.resultados[42].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>43</td>
                      <td>Entre compañeros solucionamos los problemas de trabajo de forma respetuosa</td>   
                      <td width="10%">{this.state.resultados[43].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>44</td>
                      <td>En mi trabajo me hacen sentir parte del grupo</td>   
                      <td width="10%">{this.state.resultados[44].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>45</td>
                      <td>Cuando tenemos que realizar trabajo de equipo los compañeros colaboran</td>   
                      <td width="10%">{this.state.resultados[45].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>46</td>
                      <td>Mis compañeros de trabajo me ayudan cuando tengo dificultades</td>   
                      <td width="10%">{this.state.resultados[46].Respuestas}</td> 
                    </tr>

                  </MDBTableBody>
                </MDBTable> 

                     
                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>XI. Información que recibe sobre su rendimiento en el trabajo, el reconocimiento, el sentido de pertenencia y la estabilidad que le ofrece su trabajo.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td>47</td>
                      <td>Me informan sobre lo que hago bien en mi trabajo</td>   
                      <td width="10%">{this.state.resultados[47].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>48</td>
                      <td>La forma como evalúan mi trabajo en mi centro de trabajo me ayuda a mejorar mi desempeño</td>   
                      <td width="10%">{this.state.resultados[48].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>49</td>
                      <td>En mi centro de trabajo me pagan a tiempo mi salario</td>   
                      <td width="10%">{this.state.resultados[49].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>50</td>
                      <td>El pago que recibo es el que merezco por el trabajo que realizo</td>   
                      <td width="10%">{this.state.resultados[50].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>51</td>
                      <td>Si obtengo los resultados esperados en mi trabajo me recompensan o reconocen</td>   
                      <td width="10%">{this.state.resultados[51].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>52</td>
                      <td>Las personas que hacen bien el trabajo pueden crecer laboralmente</td>   
                      <td width="10%">{this.state.resultados[52].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>53</td>
                      <td>Considero que mi trabajo es estable</td>   
                      <td width="10%">{this.state.resultados[53].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>54</td>
                      <td>En mi trabajo existe continua rotación de personal</td>   
                      <td width="10%">{this.state.resultados[54].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>55</td>
                      <td>Siento orgullo de laborar en este centro de trabajo</td>   
                      <td width="10%">{this.state.resultados[55].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>56</td>
                      <td>Me siento comprometido con mi trabajo</td>   
                      <td width="10%">{this.state.resultados[56].Respuestas}</td> 
                    </tr>
                  

                  </MDBTableBody>
                </MDBTable> 

                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>XII. Actos de violencia laboral (malos tratos, acoso, hostigamiento, acoso psicológico).</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                  <tr>
                      <td>57</td>
                      <td>En mi trabajo puedo expresarme libremente sin interrupciones</td>   
                      <td width="10%">{this.state.resultados[57].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>58</td>
                      <td>Recibo críticas constantes a mi persona y/o trabajo</td>   
                      <td width="10%">{this.state.resultados[58].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>59</td>
                      <td>Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones</td>   
                      <td width="10%">{this.state.resultados[59].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>60</td>
                      <td>Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones</td>   
                      <td width="10%">{this.state.resultados[60].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>61</td>
                      <td>Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador</td>   
                      <td width="10%">{this.state.resultados[61].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>62</td>
                      <td>Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores</td>   
                      <td width="10%">{this.state.resultados[62].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>63</td>
                      <td>Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo</td>   
                      <td width="10%">{this.state.resultados[63].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>64</td>
                      <td>He presenciado actos de violencia en mi centro de trabajo</td>   
                      <td width="10%">{this.state.resultados[64].Respuestas}</td> 
                    </tr>
                    

                  </MDBTableBody>
                </MDBTable> 

                <MDBTable bordered responsive className="mt-4 text-left">
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
                      <td width="10%">{this.state.resultados[65].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>66</td>
                      <td>Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas</td>   
                      <td width="10%">{this.state.resultados[66].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>67</td>
                      <td>Para hacer mi trabajo debo demostrar sentimientos distintos a los míos</td>   
                      <td width="10%">{this.state.resultados[67].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>68</td>
                      <td>Mi trabajo me exige atender situaciones de violencia</td>   
                      <td width="10%">{this.state.resultados[68].Respuestas}</td> 
                    </tr>                    
                  </MDBTableBody>
                </MDBTable> 

                <MDBTable bordered responsive className="mt-4 text-left">
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
                      <td width="10%">{this.state.resultados[69].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>70</td>
                      <td>Dificultan el logro de los resultados del trabajo</td>   
                      <td width="10%">{this.state.resultados[70].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>71</td>
                      <td>Cooperan poco cuando se necesita</td>   
                      <td width="10%">{this.state.resultados[71].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>72</td>
                      <td>Ignoran las sugerencias para mejorar su trabajo</td>   
                      <td width="10%">{this.state.resultados[72].Respuestas}</td> 
                    </tr>
                    
                  </MDBTableBody>
                </MDBTable> 


                {/* <Alert className ="mt-4" color ="primary ">INFORMACIÓN: LA EVALUACIÓN REVELÓ QUE EL PERSONAL ESTA EN PERFECTO ESTADO Y NO REQUIERE CANALIZACIÓN CON UN PROFESIONAL</Alert> */}
                </MDBContainer>  

            {/* <textarea rows="20"
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange} /> */}
          </section>
        </React.Fragment>
      </PdfContainer>
      </MDBContainer>
    }



    
    // console.log(this.state);
    return (
      <React.Fragment>

       
      <Paper >
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
                <TableCell  >{rows.Ciudad}</TableCell>
                <TableCell  >{rows.Sexo}</TableCell>
                <TableCell  >{rows.rfc} </TableCell>
                <TableCell  ><MDBBtn color="danger"  onClick={(e) => this.click(rows.id)}>Ver Resultado</MDBBtn></TableCell>
              </TableRow>
              
            );
          })}
        </TableBody>


          </Table>
          </Paper>

          {pdfView1}
          {pdfView2}
    
      </React.Fragment>
    );
  }
}

export default App
