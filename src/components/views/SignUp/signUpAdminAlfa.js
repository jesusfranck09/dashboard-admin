
import React, { Component } from 'react';
import { Button as Boton, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {Alert} from 'reactstrap'
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios'

import {MDBIcon} from 'mdbreact'
 const SIGNUP = gql`
    mutation SIGNUP($first_name:String,
        $last_name:String,
        $email:String,
        $password:String, 
        ){
            signupAdminAlfa(data: {
              first_name: $first_name
              last_name: $last_name
                email: $email
                password: $password
            }){
             
                message
                token
            }
    }
`

class Registro extends Component {

  state = { 
    
    name:'',
    lastName:'',
    email:'',
    password:''
    
}



handleInput = (e) => {
  const {id, value} = e.target
   this.setState({
      [id]:value
     
  });
  
}



handleForm = (e, signup) => {
  e.preventDefault();
  const id = localStorage.getItem("idRegistro")
  console.log('Enviando formulario...');
  signup({variables: { 
      ...this.state,
         id
      
  }});
}

handleData = (data) => {

  if(data.signupAdminAlfa.message=="no hay data"){
    DialogUtility.alert({
          animationSettings: { effect: 'Zoom' },           
          content: "No deje espacios en blanco! ---- por favor espere...",
          title: 'Aviso!',
          position: "fixed"
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);     
        
  }
  console.log("data" ,data.signupAdminAlfa.message)
  if(data.signupAdminAlfa.message=='duplicado'){
    DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      content: "El correo electrónico ya ha sido registrados con Anterioridad",
      title: 'Aviso!',
      position: "fixed"
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000); 
  }else if(data.signupAdminAlfa.message=="Signup exitoso"){
    DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      content: "Registro Exitoso!",
      title: 'Aviso!',
      position: "fixed"
    });
    setTimeout(() => {
        window.location.reload();
      }, 2000); 
    localStorage.removeItem("idRegistro")
  }
  
}

  render() {
   
    return (
      <Mutation mutation={SIGNUP}>
      {
        (signup, {data, error, loading}) => {
         if (loading) console.log(loading);
        if (data){
          console.log("hay datos en el formulario" , data)
          this.handleData(data)} 

          
         
          return ( 

      <React.Fragment>
   <form onSubmit={e => this.handleForm(e, signup)}>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col xs="8">
              <CardGroup>
                <Card className="p-8">
                  <CardBody>
                    <Form>                      
                     <h1><Alert color="primary" className="text-center mt-4 ">Registrar Administrador ADS</Alert></h1>
                    
                      <InputGroup className="mb-3">
                        
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="male"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="first_name" onChange={this.handleInput} type="text"  placeholder="Nombre/Representante" />
                      </InputGroup>


                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="male"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="last_name" onChange={this.handleInput} type="text"  placeholder="Apellidos" />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="at" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="email" onChange={this.handleInput} type="email"  placeholder="Correo" />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="password" onChange={this.handleInput} type="password" placeholder="Contraseña"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Boton outline color="primary" className="px-4" type='submit'>Registrar administrador</Boton>
                        </Col>
                        
                  </Row>
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
      );
      
  }
}
export default Registro;