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
import { DialogUtility } from '@syncfusion/ej2-popups';




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
           console.log("this.state.resultados" , this.state.resultados)
          })     
  }

              click(id){
              
                  
                      const url = 'http://localhost:8000/graphql'
                      axios({
                        url:  url,
                        method:'post',
                        data:{
                        query:`
                          query{
                          resultSingleSurveyRP(data:"${[id]}"){
                            id 
                            Respuestas 
                            fk_preguntasRP
                            fk_EmpleadosRP 
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
                            
                            console.log("los resultados son " , datos.data.data.resultSingleSurveyRP)
                            if(datos.data.data.resultSingleSurveyRP.length > 0 ){
                              this.setState({resultados :datos.data.data.resultSingleSurveyRP })                

                            } if(datos.data.data.resultSingleSurveyRP.length <= 0){
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

    
  render() {
 
    const container = { marginLeft:20}
    let pdfView1;
    let pdfView2;
    if(this.state.resultados[2]){ 
      console.log("este es lo que contiene el estado ")
      pdfView1 = <MDBContainer> <Alert className ="mt-4" color ="primary ">Resultados de la Aplicación de la encuesta RP </Alert>

      <PdfContainer createPdf={this.createPdf}>
    
        <React.Fragment>


          <section className="flex-column  bg-white  pa4 "  >
          <font face="arial" className = "mt-4" >CUESTIONARIO PARA IDENTIFICAR LOS FACTORES DE RIESGO PSICOSOCIAL EN LOS CENTROS DE TRABAJO</font>
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
                      <th>I. Las condiciones de su centro de trabajo, así como la cantidad y ritmo de trabajo.</th>    
                      <td></td>   
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>1</td>
                      <td>Mi trabajo me exige hacer mucho esfuerzo físico.</td>
                      <td width="10%">{this.state.resultados[1].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Me preocupa sufrir un accidente en mi trabajo.</td>
                      <td width="10%">{this.state.resultados[2].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Considero que las actividades que realizo son peligrosas</td>
                      <td width="10%">{this.state.resultados[3].Respuestas}</td> 
                    </tr>                    
                    <tr>
                      <td>5</td>
                      <td>Por la cantidad de trabajo que tengo debo quedarme tiempo adicional a mi turno.</td>
                      <td width="10%">{this.state.resultados[4].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Por la cantidad de trabajo que tengo debo trabajar sin parar.</td>
                      <td width="10%">{this.state.resultados[5].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Considero que es necesario mantener un ritmo de trabajo acelerado.</td>
                      <td width="10%">{this.state.resultados[6].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Mi trabajo exige que esté muy concentrado.</td>
                      <td width="10%">{this.state.resultados[7].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Mi trabajo requiere que memorice mucha información.</td>
                      <td width="10%">{this.state.resultados[8].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Mi trabajo exige que atienda varios asuntos al mismo tiempo.</td>
                      <td width="10%">{this.state.resultados[9].Respuestas}</td> 
                    </tr>
 
                  </MDBTableBody>
                </MDBTable> 
                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>II. Las actividades que realiza en su trabajo y las responsabilidades que tiene.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>10</td>
                      <td>En mi trabajo soy responsable de cosas de mucho valor.</td>   
                      <td width="10%">{this.state.resultados[10].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>Respondo ante mi jefe por los resultados de toda mi área de trabajo.</td>   
                      <td width="10%">{this.state.resultados[11].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>En mi trabajo me dan órdenes contradictorias.</td>   
                      <td width="10%">{this.state.resultados[12].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>13</td>
                      <td>Considero que en mi trabajo me piden hacer cosas innecesarias.</td>   
                      <td width="10%">{this.state.resultados[13].Respuestas}</td> 
                    </tr>
                  </MDBTableBody>
                </MDBTable> 

                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>III. El tiempo destinado a su trabajo y sus responsabilidades familiares.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>14</td>
                      <td>Trabajo horas extras más de tres veces a la semana.</td>   
                      <td width="10%">{this.state.resultados[14].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>Mi trabajo me exige laborar en días de descanso, festivos o fines de semana.</td>   
                      <td width="10%">{this.state.resultados[15].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>16</td>
                      <td>Considero que el tiempo en el trabajo es mucho y perjudica mis actividades familiares o personales.</td>   
                      <td width="10%">{this.state.resultados[16].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>17</td>
                      <td>Pienso en las actividades familiares o personales cuando estoy en mi trabajo.</td>   
                      <td width="10%">{this.state.resultados[17].Respuestas}</td> 
                    </tr>
                   
                  </MDBTableBody>
                </MDBTable> 


                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>IV. Las decisiones que puede tomar en su trabajo.</th>       
                      <td ></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>18</td>
                      <td>Mi trabajo permite que desarrolle nuevas habilidades.</td>   
                      <td width="10%">{this.state.resultados[18].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>19</td>
                      <td>En mi trabajo puedo aspirar a un mejor puesto.</td>   
                      <td width="10%">{this.state.resultados[19].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>20</td>
                      <td>Durante mi jornada de trabajo puedo tomar pausas cuando las necesito.</td>   
                      <td width="10%">{this.state.resultados[20].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>21</td>
                      <td>Puedo decidir la velocidad a la que realizo mis actividades en mi trabajo.</td>   
                      <td width="10%">{this.state.resultados[21].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>22</td>
                      <td>Puedo cambiar el orden de las actividades que realizo en mi trabajo.</td>   
                      <td width="10%">{this.state.resultados[22].Respuestas}</td> 
                    </tr>
                  </MDBTableBody>
                </MDBTable> 
                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>V. La capacitación e información que recibe sobre su trabajo.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>23</td>
                      <td>Me informan con claridad cuáles son mis funciones.</td>   
                      <td>{this.state.resultados[23].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>24</td>
                      <td>Me explican claramente los resultados que debo obtener en mi trabajo.</td>   
                      <td width="10%">{this.state.resultados[24].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>25</td>
                      <td>Me informan con quién puedo resolver problemas o asuntos de trabajo.</td>   
                      <td width="10%">{this.state.resultados[25].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>26</td>
                      <td>Me permiten asistir a capacitaciones relacionadas con mi trabajo.</td>   
                      <td width="10%">{this.state.resultados[26].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>27</td>
                      <td>Recibo capacitación útil para hacer mi trabajo.</td>   
                      <td width="10%">{this.state.resultados[27].Respuestas}</td> 
                    </tr>
                  </MDBTableBody>
                </MDBTable> 
                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>VI. Las relaciones con sus compañeros de trabajo y su jefe.</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>28</td>
                      <td>Mi jefe tiene en cuenta mis puntos de vista y opiniones.</td>   
                      <td width="10%">{this.state.resultados[28].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>29</td>
                      <td>Mi jefe ayuda a solucionar los problemas que se presentan en el trabajo.</td>   
                      <td width="10%">{this.state.resultados[29].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>30</td>
                      <td>Puedo confiar en mis compañeros de trabajo.</td>   
                      <td width="10%">{this.state.resultados[30].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>31</td>
                      <td>Cuando tenemos que realizar trabajo de equipo los compañeros colaboran.</td>   
                      <td width="10%">{this.state.resultados[31].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>32</td>
                      <td>Mis compañeros de trabajo me ayudan cuando tengo dificultades.</td>   
                      <td width="10%">{this.state.resultados[32].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>33</td>
                      <td>En mi trabajo puedo expresarme libremente sin interrupciones.</td>   
                      <td width="10%">{this.state.resultados[33].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>34</td>
                      <td>Recibo críticas constantes a mi persona y/o trabajo.</td>   
                      <td width="10%">{this.state.resultados[34].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>35</td>
                      <td>Recibo burlas, calumnias, difamaciones, humillaciones o ridiculizaciones.</td>   
                      <td width="10%">{this.state.resultados[35].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>36</td>
                      <td>Se ignora mi presencia o se me excluye de las reuniones de trabajo y en la toma de decisiones.</td>   
                      <td width="10%">{this.state.resultados[36].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>37</td>
                      <td>Se manipulan las situaciones de trabajo para hacerme parecer un mal trabajador.</td>   
                      <td width="10%">{this.state.resultados[37].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>38</td>
                      <td>Se ignoran mis éxitos laborales y se atribuyen a otros trabajadores.</td>   
                      <td width="10%">{this.state.resultados[38].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>39</td>
                      <td>Me bloquean o impiden las oportunidades que tengo para obtener ascenso o mejora en mi trabajo.</td>   
                      <td width="10%">{this.state.resultados[39].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>40</td>
                      <td>He presenciado actos de violencia en mi centro de trabajo.</td>   
                      <td width="10%">{this.state.resultados[40].Respuestas}</td> 
                    </tr>
                  </MDBTableBody>
                </MDBTable> 
                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>VII. En mi trabajo debo brindar servicio a clientes o usuarios:</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>41</td>
                      <td>Atiendo clientes o usuarios muy enojados.</td>   
                      <td width="10%">{this.state.resultados[42].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>42</td>
                      <td>Mi trabajo me exige atender personas muy necesitadas de ayuda o enfermas.</td>   
                      <td width="10%">{this.state.resultados[43].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>43</td>
                      <td>Para hacer mi trabajo debo demostrar sentimientos distintos a los míos.</td>   
                      <td width="10%">{this.state.resultados[44].Respuestas}</td> 
                    </tr>
                  </MDBTableBody>
                </MDBTable> 

                <MDBTable bordered responsive className="mt-4 text-left">
                  <MDBTableHead>
                    <tr>
                      <th></th>
                      <th>VIII. Soy jefe de otros trabajadores:</th>       
                      <td></td> 
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>44</td>
                      <td>Comunican tarde los asuntos de trabajo.</td>   
                      <td width="10%">{this.state.resultados[46].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>45</td>
                      <td>Dificultan el logro de los resultados del trabajo.</td>   
                      <td width="10%">{this.state.resultados[47].Respuestas}</td> 
                    </tr>
                    <tr>
                      <td>46</td>
                      <td>Ignoran las sugerencias para mejorar su trabajo.</td>   
                      <td width="10%">{this.state.resultados[48].Respuestas}</td> 
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
