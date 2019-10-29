import React from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { InputGroup, InputGroupAddon, InputGroupText,Input } from 'reactstrap';
import logo from '../../images/logotipo.png'
import { AppNavbarBrand } from '@coreui/react';



import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBAnimation,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";
import "./index.css";
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


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        
        }
      }


//   handleTogglerClick = () => {
//     this.setState({
//       collapsed: !this.state.collapsed
//     });
//   };

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
      //localStorage.setItem('elToken', data.login.token) 
    alert('Sesión iniciada exitosamente!');
    
    this.props.history.push("/inicio")
  }


  handleError = (error) => {
    console.log(error);
    alert('Error en login...');
  }



  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
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
      <div id="apppage">
        <Router>
          <div>
            <MDBNavbar
              color="primary-color"
              dark
              expand="md"
              fixed="top"
              scrolling
              transparent
            >
              <MDBContainer>
                <MDBNavbarBrand>
                <AppNavbarBrand
                  full={{ src: logo, width: 89, height: 25, alt: 'ADS' }} />
                  <strong className="white-text">Bienvenido</strong>
                </MDBNavbarBrand>
     
                <MDBNavbarToggler />
                <MDBCollapse >
                  <MDBNavbarNav left>
                    <MDBNavItem active>
                      <MDBNavLink to="#!">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#!">Link</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#!">Profile</MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                  {/* <MDBNavbarNav right>
                    <MDBNavItem>
                      <MDBFormInline waves>
                        <div className="md-form my-0">
                          <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                          />
                        </div>
                      </MDBFormInline>
                    </MDBNavItem>
                  </MDBNavbarNav> */}
                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
            {this.state.collapsed && overlay}
          </div>
        </Router>
        
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>

                <MDBCol
                  md="6"
                  className="white-text text-center text-md-left mt-xl-5 mb-5"
                >
                </MDBCol>
                <MDBRow>
                <MDBCol md="6" className="mb-8">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <MDBCard id="classic-card">
                      <MDBCardBody className="white-text">
                        <h3 className="text-center">
                          <MDBIcon icon="user" /> Ingresar:
                        </h3>
                        <hr className="hr-light" />

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

                           
                      <MDBRow>
                        <MDBCol md="8">
                          <MDBBtn color="success" className="px-4" type='submit'>Entrar</MDBBtn>
                        </MDBCol>
    
                        <MDBCol>                   
                        <Link to="/signup">                  
                        <MDBBtn  color="primary" >
                            Regístrate ahora!</MDBBtn>
                        </Link>                        
                        </MDBCol>
                      </MDBRow>
                    
                      </MDBCardBody>
                    

                    </MDBCard>
                    <strong>NORMA OFICIAL MEXICANA NOM-035-STPS-2018, FACTORES DE RIESGO PSICOSOCIAL EN EL
TRABAJO-IDENTIFICACIÓN, ANÁLISIS Y PREVENCIÓN</strong>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol md="6" xl="5" className="mt-xl-5">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <img
                      src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"
                      alt=""
                      className="img-fluid"
                    />
                  </MDBAnimation>
                </MDBCol>
                </MDBRow>
              </MDBRow>          
            </MDBContainer>
          </MDBMask>
        </MDBView>
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