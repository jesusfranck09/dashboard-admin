
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
        $rfc:String,
        $razon_social:String,
        $email:String,
        $password:String, 
        ){
            signup(data: {
              first_name: $first_name
              last_name: $last_name
                rfc:$rfc
                razon_social:$razon_social
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
    rfc:'',
    razonSocial:'',
    nombreUsuario:'',
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
  console.log('Enviando formulario...');
  signup({variables: { 
      ...this.state
      
  }});
}

handleData = (data) => {

  if(data.signup.message=="no hay data"){
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
  console.log("data" ,data.signup.message)
  // if (data.signup.token === 'ERROR'){
  //   console.log("el token es "+ data.signup.token)
  //     alert('hubo un error ...');
  //     return false;
  //   }
  // localStorage.setItem('elToken', data.signup.token) 

  if(data.signup.message=='duplicado'){
    DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      content: "El RFC y/o correo electrónico ya han sido registrados con Anterioridad ---- por favor espere....",
      title: 'Aviso!',
      position: "fixed"
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000); 
  }else if(data.signup.message=="Signup exitoso"){
    DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      content: "Registro Exitoso!",
      title: 'Aviso!',
      position: "fixed"
    });
    
    let periodo = "Periodo Inicial"
    const url = 'http://localhost:8000/graphql'
    axios({
      url:  url,
      method:'post',
      data:{
      query:`
       mutation{
        addPeriodoInicial(data:"${[periodo]}"){
            message
              }
            }
          `
      }
    })
    .then(datos => {	
  
    })
  
    this.props.history.push('/');
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
                     <h1><Alert color="primary" className="text-center mt-4 ">Formulario de Registro</Alert></h1>
                      <Alert color ="secondary" className="text-center text-muted">Ingrese sus datos por favor</Alert>     
                      
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
                          <MDBIcon icon="building" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="rfc" onChange={this.handleInput} type="text"  placeholder="RFC" />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="building" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="razon_social" onChange={this.handleInput} type="text"  placeholder="Razón Social" 
                        />
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
                          <Boton outline color="primary" className="px-4" type='submit'>Registrarme</Boton>
                        </Col>

                        {/* <Col>
                        <Link to="/login">
                          <Boton color="secondary" className="px-4" >cancelar</Boton>
                          </Link>
                        </Col> */}
                        
                        
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