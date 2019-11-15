import React, { Component } from 'react';
import { Button as Boton, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';



const SIGNUP = gql`
    mutation SIGNUP($first_name:String!,
        $last_name:String!,
        $rfc:String!,
        $razon_social:String!,
        $user:String!,
        $email:String!,
        $password:String!, 
        ){
            signup(data: {
              first_name: $first_name
              last_name: $last_name
                rfc:$rfc
                razon_social:$razon_social
                user:$user
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
  // if (data.signup.token === 'ERROR'){
  //   console.log("el token es "+ data.signup.token)
  //     alert('hubo un error ...');
  //     return false;
  //   }
  // localStorage.setItem('elToken', data.signup.token) 
  alert('Registro Exitoso');
  this.props.history.push('/');
}

handleError = (error) => {
  alert('Error en en el Registro...');
  console.log("el error es " , error.response)
}
  render() {
   
    return (
      <Mutation mutation={SIGNUP}>
      {
        (signup, {data, error, loading}) => {
         if (loading) console.log(loading);
        if (data) this.handleData(data);
        if (error) this.handleError(error);
    
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
                      <h1>Singup</h1>
                      <p className="text-muted">Ingrese sus datos por favor</p>     
                      
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="first_name" onChange={this.handleInput} type="text"  placeholder="Nombre/Nombres" />
                      </InputGroup>


                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="last_name" onChange={this.handleInput} type="text"  placeholder="Apellidos" />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="rfc" onChange={this.handleInput} type="text"  placeholder="RFC" />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="razon_social" onChange={this.handleInput} type="text"  placeholder="Razón Social" />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="user" onChange={this.handleInput} type="text"  placeholder="Nombre de Usuario" />
                      </InputGroup>
                      
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="email" onChange={this.handleInput} type="email"  placeholder="Correo" />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="password" onChange={this.handleInput} type="password" placeholder="Contraseña"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Boton color="primary" className="px-4" type='submit'>Registrarme</Boton>
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
