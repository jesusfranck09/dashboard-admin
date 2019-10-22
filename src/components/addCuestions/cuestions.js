
import React, { Component } from 'react'

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup,  Row } from 'reactstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CUESTIONS = gql`
    mutation CUESTIONS(
        $data:String
        ){
            registerData(data:{
                data:$data
            }){
            
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

    handleChange(e , index){
        this.state.cuestions[index]=e.target.value
        this.setState({cuestions : this.state.cuestions})
        console.log("handle change" , this.state.cuestions)
    }

    // handleRemove(index){
    //     this.state.cuestions.splice(index,1)
    //     console.log( this.state.cuestions ,"aqui se elimina")
    //     this.setState({cuestions:this.state.cuestions})
    // }
    // handleSubmit(e){
    //     console.log("este es lo que se envia",this.state.cuestions)

    // }


    handleForm = (e, cuestions) => {
        e.preventDefault();
        console.log('Enviando formulario...');
        console.log("cuestions",this.state.cuestions)
        cuestions({variables: { 
            ...this.state.cuestions
            
        }});
      }
      
    handleData = (data) => {
        if (data    === 'ERROR'){
          console.log("la data es "+ data)
            alert('hubo un error ...');
            return false;
          }
        alert('Envio Exitoso');
        this.props.history.push('/login');
      }
      
    handleError = (error) => {
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
                            <Input id = "data" placeholder="Ingrese la pregunta " onChange ={(e)=> this.handleChange(e,index) } value = {cuestion} size="60"/>
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
                            <form onSubmit={e => this.handleForm(e, cuestions)}>
                            <Button color="success" >Enviar</Button>       
                            </form>
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
         </React.Fragment>
                )
                                                }
               }
             </Mutation>

            )   
        }

}

export default Cuestions;