import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';


 

const LOGIN = gql`
    mutation LOGIN($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            message
        }
    }
`
class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: ''
    }
  }

handleInput = (e) => {
  const {id, value} = e.target
   this.setState({
      [id]:value
  });
}

handleForm = (e, login) => {
  e.preventDefault();
  console.log('Enviando formulario...');
  login({variables: { 
      ...this.state
  }});
}

handleData = (data) => {
  if (data.login.token === 'ERROR'){
    console.log("el token es "+ data.login.token)
      alert('Error en login...');
     
      return false;
    }
    if (data=! undefined){

    console.log("la data ha llegado " ,  data) 
    } 
   // localStorage.setItem('elToken', data.login.token) 
  console.log('Sesión iniciada exitosamente!');
  this.props.history.push("/signup")
}

handleError = (error) => {
  console.log(error);
  alert('Error en login...');
}
  render() {
    return (
      <Mutation mutation={LOGIN}>
      {
        (login, {data, error, loading}) => {
        if (loading) console.log(loading);
        if (data) this.handleData(data);
        if (error) this.handleError(error);
          return ( 

      <React.Fragment>
   <form onSubmit={e => this.handleForm(e, login)}>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody color = "primary">
                    <Form>                      
                      <h1>Login</h1>
                      <p className="text-muted">Inicia sesion por favor</p>     
                      <InputGroup   className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="email" onChange={this.handleInput} type="email"  placeholder="Usuario" />
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
                          <Button color="success" className="px-4" type='submit'>Entrar</Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" >Olvidaste tu Contraseña?</Button>
                        </Col> */}
                        {/* <Col>
                        <Link to="/signup">
                        <Button  color="primary" className="mt-3" active tabIndex={-1}>
                            ¿No tienes una cuenta ?
                            Regístrate ahora!</Button>
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
export default Login;
