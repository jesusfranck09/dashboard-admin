import { Table, Card, CardBody, Col, Container,Row,CardHeader} from 'reactstrap';
import React, { Component } from 'react'
import {  MDBInput, MDBBadge ,MDBBtn} from "mdbreact";


          class Dashboard extends Component{
            state = {
              radio: 0
            }
            
            onClick = (nr) => () => {
              this.setState({
                radio: nr
              });
            }
            render() {
             return (
                      
                   <React.Fragment>            
                            <div className="app flex-row align-items-center">
                             <Container>
                             <Card className="p-8">
                                  <CardHeader> INSTRUCCIONES : Para responder las preguntas siguientes considere las condiciones ambientales de su centro de trabajo.  </CardHeader>
                                    </Card>
                               <Row className="justify-content-center"> 
                                 <Col >
                                  <Card className="p-8">
                                  <CardHeader>Titulo 1 : Ambiente Laboral </CardHeader>
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
                                      <td>1 El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</td>
                                      
                                      
                                        <td> <MDBInput gap onClick={this.onClick(1)} checked={this.state.radio===1 ? true : false}  type="radio" id="radio1" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(2)} checked={this.state.radio===2 ? true : false}  type="radio" id="radio2" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(3)} checked={this.state.radio===3 ? true : false}type="radio" id="radio3" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(4)} checked={this.state.radio===4 ? true : false}  type="radio" id="radio4" />
                                        </td>
                                        <td><MDBInput gap onClick={this.onClick(5)} checked={this.state.radio===5 ? true : false}  type="radio" id="radio4" />
                                        </td>
                                  

                                         </tr>

                                         <tr>
                                      <td>1 El espacio donde trabajo me permite realizar mis actividades de manera segura e higiénica</td>
                                      
                                      
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
                                     
                                     <MDBBtn color="primary">Siguiente</MDBBtn>
                                    
                                   </CardBody>
                                  </Card>
                                  </Col>
                                 </Row>
                               
                                
                               </Container>
                             </div>      
                  </React.Fragment>
                );
              }


           }



export default Dashboard;