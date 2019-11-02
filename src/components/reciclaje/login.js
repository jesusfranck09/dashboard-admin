// import React, { Component } from 'react';
//  import { Link } from 'react-router-dom';
// import {Form, InputGroup, InputGroupAddon, InputGroupText,Input } from 'reactstrap';
// import { Mutation } from 'react-apollo';
// import gql from 'graphql-tag';
// import {MDBBtn,MDBCard,MDBContainer,MDBCardBody,MDBRow ,  MDBCol} from 'mdbreact'
// const LOGIN = gql`
//     mutation LOGIN($email: String!, $password: String!){
//         login(email: $email, password: $password){
//             token
//             message
//         }
//     }
// `
// class Login extends Component {

//   constructor(props){
//     super(props);
//     this.state = {
//         email: '',
//         password: ''
//     }
//   }

// handleInput = (e) => {
//   const {id, value} = e.target
//    this.setState({
//       [id]:value
//   });
// }

// handleForm = (e, login) => {
//   e.preventDefault();
//   console.log('Enviando formulario...');
//   login({variables: { 
//       ...this.state
//   }});
// }

// handleData = (data) => {
//   if (data.login.token === 'ERROR'){
//     console.log("el token es "+ data.login.token)
//       alert('Error en login...');
     
//       return false;
//     }
//     if (data=! undefined){

//     console.log("la data ha llegado " ,  data) 
//     } 
//     //localStorage.setItem('elToken', data.login.token) 
//   alert('Sesión iniciada exitosamente!');
//   this.props.history.push("/inicio")
// }

// handleError = (error) => {
//   console.log(error);
//   alert('Error en login...');
// }

//   render() {
//     return (
//       <Mutation mutation={LOGIN}>
//       {
//         (login, {data, error, loading}) => {
//         if (loading) console.log(loading);
//         if (data) this.handleData(data);
//         if (error) this.handleError(error);
//           return ( 

//       <React.Fragment>
        
//    <form onSubmit={e => this.handleForm(e, login)}>
//       <div className="app flex-row align-items-center grey-text">
//         <MDBContainer>
      
//           <MDBRow className="justify-content-center">      
//             <MDBCol md="8">
//                  <MDBCard className="p-4 " >
//                   <MDBCardBody color = "primary">
//                     <Form>                      
//                       <h1>Ingresar</h1>
//                       <InputGroup   className="mb-3">
//                         <InputGroupAddon addonType="prepend">
//                           <InputGroupText>
//                             <i className="icon-user"></i>
//                           </InputGroupText>
//                         </InputGroupAddon>
//                         <Input id="email" onChange={this.handleInput} type="email"  placeholder="Usuario" />
//                       </InputGroup>
//                       <InputGroup className="mb-4">
//                         <InputGroupAddon addonType="prepend">
//                           <InputGroupText>
//                             <i className="icon-lock"></i>
//                           </InputGroupText>
//                         </InputGroupAddon>
//                         <Input id="password" onChange={this.handleInput} type="password" placeholder="Contraseña"/>
//                       </InputGroup>
//                       <MDBRow>
//                         <MDBCol md="8">
//                           <MDBBtn color="success" className="px-4" type='submit'>Entrar</MDBBtn>
//                         </MDBCol>
    
//                         <MDBCol>                   
//                         <Link to="/signup">                  
//                         <MDBBtn  color="primary" >
//                             Regístrate ahora!</MDBBtn>
//                         </Link>                        
//                         </MDBCol>
//                       </MDBRow>
//                     </Form>
//                   </MDBCardBody>
//                 </MDBCard>
              
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </div>
//       </form>
//       </React.Fragment>
//           ) 
//         }
        
//       }
//       </Mutation>
//       );
//   }
// }
// // export default withRouter(Login) ;
