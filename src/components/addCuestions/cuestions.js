
import React, { Component } from 'react'

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup,  Row } from 'reactstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CUESTIONS = gql`
    mutation CUESTIONS($data:[String]!){
            registerData(data:$data){
                message

            }
    }
`

class Cuestions extends Component{

    constructor(props){
        super(props);
        this.state = {
            cuestions:[]
        }
      }


    addCuestions(){
        this.setState({cuestions : [...this.state.cuestions,""]})
    }


    handleInput = (e) => {
      const {id, value} = e.target
       this.setState({
          [id]:value
      });
    }

    handleForm = (e, cuestions) => {
        e.preventDefault();
        console.log('Enviando formulario...');
        cuestions({variables: { 
            ...this.state
        }});
        console.log("el estado  " , this.state)
      }
      
    handleData = (data) => {
        if (data    === 'ERROR'){
            alert('hubo un error ...');
            return false;
          }
          if (data =! undefined){
      console.log("la data llego " ,  data)

          }

        alert('Envio Exitoso');
        this.props.history.push('/login');
      }
      
    handleError = (error) => {
      console.log(error)
        alert('Error en en el Envio...');
      }


    render(){
        return (
            <Mutation mutation={CUESTIONS}>
            {
                 (cuestions, {data, error, loading}) => {
                   if (loading) console.log(loading);
                   if (data) this.handleData(data);
                   if (error) this.handleError(error);
           
        return(
      <React.Fragment>
             <form onSubmit={e => this.handleForm(e, cuestions)}>

           <div className="app flex-row align-items-center">
           <Container>
           <Row className="justify-content-center">
           <Col md="8">
           <CardGroup>
            <Card className="p-4">
             <CardBody>
              <Form>
                <h2>Ingrese las preguntas en el formulario </h2>
                <InputGroup className="mb-3">
                    <div className= "cuestion">               
                        {
                         this.state.cuestions.map((cuestion,index)=>{
                        return (
                         <div key = {index}>
                            <Card>
                            <Form inline>                          
                            <Input id ="data" placeholder="Ingrese la pregunta " onChange={this.handleInput} size="60"/>
                            {/* <Button  onClick = {(e)=>this.handleRemove(e)}>Eliminar</Button>   */}
                            </Form>
                            </Card>
                          </div>
                        )})                    
                        }               
                         <hr/>   
                            <Row> 
                            <Col>            
                            <Button color="primary" onClick={(e)=>this.addCuestions(e)}> Agregar Preguntas</Button> 
                            </Col>
                            <Button color="success" >Enviar</Button>       
                           
                            </Row> 
                     </div>
                    </InputGroup>
                   </Form>
                  </CardBody>
                 </Card>
                </CardGroup>

              </Col>
             </Row>
            </Container>
           </div>
           </form>
         </React.Fragment>
                )
                                                }
               }
             </Mutation>

            )   
        }

}

export default Cuestions;