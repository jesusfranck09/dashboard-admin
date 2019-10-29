import { Table, Card, CardBody, Col, Container,Row,CardHeader} from 'reactstrap';
import React, { Component } from 'react'
import {  MDBInput, MDBBadge ,MDBBtn} from "mdbreact";
import axios from 'axios';


 class Dashboard extends Component{
           
              constructor(props){
              super(props);
              this.state = {           
                  radio: 0,
                  data:''
              }
            }

            onClick = (nr , data) => () => {
              this.setState({
                radio: nr,
                data
              });
             
            }



            handleSubmit = event => {
              event.preventDefault();
              const pregunta = this.state.data
              const radio =this.state.radio
              console.log("los datos en la promesa son  " , pregunta , radio)
          const url = 'http://localhost:8000/graphql'
              axios({
                url:  url,
                method:'post',
        data:{
            query:`
            mutation{
              registerData(data:"${[pregunta,radio]}"){
                message
                }
                      }
                    `
                }
              }).then((datos) => {
                console.log("los datos son ",datos)
              });

                
            }
   
            render() {
              const Titulo1  =  "¿Ha presenciado o sufrido alguna vez, durante o con motivo del trabajo un acontecimiento como los siguientes: "
              const pregunta2 = "Accidente que tenga como consecuencia la muerte, la pérdida de un miembro o una lesión grave?"
              const Pregunta3 = "  Asaltos?" 
             return (
                   <React.Fragment>    
                        <div className="app flex-row align-items-center">
                            <form onSubmit={this.handleSubmit}>
                             <Container>
                             <Card className="p-8">
                                  <CardHeader> INSTRUCCIONES : Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.  </CardHeader>
                                    </Card>
                               <Row className="justify-content-center"> 
                                 <Col >
                                  <Card className="p-8">
                                  <CardHeader>{Titulo1}</CardHeader>
                                  <CardBody>                                            
                                   <Table>                                    
                                      <tbody>
                                       <tr>
                                        <td>  </td>
                                        <td><MDBBadge color="success">Siempre</MDBBadge></td>
                                        <td><MDBBadge color="success">Casi Siempre</MDBBadge></td>
                                        <td><MDBBadge color="warning">Algunas Veces</MDBBadge></td>
                                        <td><MDBBadge color="danger">Casi Nunca</MDBBadge></td>
                                        <td><MDBBadge color="danger">Nunca</MDBBadge></td>
                                       </tr>                                   
                                       <tr>
                                      <td>{pregunta2}</td>

                                        <td> <MDBInput gap onClick={this.onClick(1 , pregunta2)} checked={this.state.radio===1 ? true : false} type="radio" id="radio1" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(2, pregunta2)} checked={this.state.radio===2 ? true : false}  type="radio" id="radio2" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(3, pregunta2)} checked={this.state.radio===3 ? true : false}type="radio" id="radio3" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(4, pregunta2)} checked={this.state.radio===4 ? true : false}  type="radio" id="radio4" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(5, pregunta2)} checked={this.state.radio===5 ? true : false}  type="radio" id="radio4" />
                                        </td>
                                         </tr>
                                         <tr>
                                        <td>{Pregunta3}</td>     
                                        
                                                                
                                        <td> <MDBInput gap onClick={this.onClick(6)} checked={this.state.radio===6 ? true : false}  type="radio" id="radio5" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(7)} checked={this.state.radio===7 ? true : false}  type="radio" id="radio6" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(8)} checked={this.state.radio===8 ? true : false}type="radio" id="radio7" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(9)} checked={this.state.radio===9 ? true : false}  type="radio" id="radio8" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(10)} checked={this.state.radio===10 ? true : false}  type="radio" id="radio9" />
                                        </td>
                                         </tr>
                                        </tbody>                                     
                                     </Table>                                   
                                     <MDBBtn type ="submit" color="primary">Siguiente</MDBBtn>
                                    
                                   </CardBody>
                                  </Card>
                                  </Col>
                                 </Row>                          
                               </Container>
                               </form>
                             </div>    
                  </React.Fragment>
                            )

              }


           }



export default Dashboard;