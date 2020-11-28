import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { InputGroup, InputGroupAddon, InputGroupText,Input } from 'reactstrap';
import { AppNavbarBrand } from '@coreui/react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import diagnostico from '../../images/diagnostico.png'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import axios from 'axios'
import {
  MDBInput,
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
  MDBNavLink,
  MDBCardHeader
} from "mdbreact";
import "./index.css";
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { DialogUtility } from '@syncfusion/ej2-popups';
import {API} from '../../utils/http'
const LOGINEMPRESAS = gql`
    mutation LOGINEMPRESAS($rfc: String!, $password: String!){
        loginEmpresas(rfc: $rfc, password: $password){
          activo
          message 
          token 
          id
          nombre
          Apellidos
          RFC
          RazonSocial
          correo
          activo 
          fechaRegistro
          fk_superusuario
        
        }
    }
`

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rfc: '',
            password: '',
            isPasswordShown: false,
        }
      }
componentWillMount(){
  localStorage.removeItem("elToken")
localStorage.removeItem("nombre")
localStorage.removeItem("apellidos")
localStorage.removeItem("rfc")
localStorage.removeItem("razonsocial")
localStorage.removeItem("usuario")
localStorage.removeItem("correo")
localStorage.removeItem("max")
localStorage.removeItem("idAdmin")
localStorage.removeItem("fechaRegistro")
localStorage.removeItem("fechaRegistroSuperusuario")
localStorage.removeItem("ok")
localStorage.removeItem("empleadoActivo")
localStorage.removeItem("DepartamentoActivo")
localStorage.removeItem("SucursalActiva")
localStorage.removeItem("PuestoActivo")
localStorage.removeItem("urlLogo")
localStorage.removeItem("periodo")
localStorage.removeItem("fk_superusuario")
}      
handleInput = async (e) => {
  const {id, value} = e.target
  this.setState({
    [id]:value,
   });
  }

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };


  handleForm = (e, login) => { 
    e.preventDefault();
    login({variables: { 
        ...this.state
    }});
  }
  
  handleData = async (data) => {
    if (data.loginEmpresas.token === 'no hay token' && data.loginEmpresas.message==="ningun dato"){
      DialogUtility.alert({
        animationSettings: { effect: 'Zoom' },           
        title: 'Por favor no deje espacios en blanco',
        position: "fixed",
    })
    setTimeout(() => {
      window.location.reload();
    }, 2000); 
  }
 if(data.loginEmpresas.token==='no hay token' && data.loginEmpresas.message==='usuario y contraseña incorrectos'){

  let rfc = data.loginEmpresas.RFC
  var date = new Date();
  var hours = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();

  date = mm + '/' + dd + '/' + yyyy;
  let IP = "12345678";
    
    await axios({
      url:  API,
      method:'post',
      data:{
      query:`
      mutation{
        transactions(data:"${[date,hours,IP,rfc]}"){
          message
            }
          }
          `
      }
      }).then((datos) => {
      }).catch(err=>{
        console.log("error" , err.response)
        console.log("err" , err)
      })  
      DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      title: 'USUARIO Y CONTRASEÑA INCORRECTOS',
      position: "fixed",
    })  
    setTimeout(() => {
      window.location.reload();
    }, 2000); 
    }
   if(data.loginEmpresas.message==='Login exitoso' && data.loginEmpresas.token){

    let IP  = "000000";
    
    // var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})

/*Ejemplo de uso*/
  //  await findIP.then(ip => {
  //     IP = ip
  //   }).catch(err=>{
  //   })

    let rfc = data.loginEmpresas.RFC
    let idEmpresa = data.loginEmpresas.id

    var date = new Date();
    var hours = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;

      await axios({
        url:  API,
        method:'post',
        data:{
        query:`
        mutation{
          transactions(data:"${[date,hours,IP,rfc,idEmpresa]}"){
            message
              }
            }
            `
        }
        }).then((datos) => {
        }).catch(err=>{
          console.log("error" , err.response)
          console.log("err" , err)

        })  

        localStorage.setItem('nombre', data.loginEmpresas.nombre)
        localStorage.setItem('elToken', data.loginEmpresas.token)  
        localStorage.setItem('apellidos', data.loginEmpresas.Apellidos) 
        localStorage.setItem('rfc',data.loginEmpresas.RFC) 
        localStorage.setItem('razonsocial', data.loginEmpresas.RazonSocial) 
        localStorage.setItem('correo',data.loginEmpresas.correo)
        localStorage.setItem('idAdmin', data.loginEmpresas.id) 
        localStorage.setItem('fechaRegistro', data.loginEmpresas.fechaRegistro) 
        localStorage.setItem('fk_superusuario', data.loginEmpresas.fk_superusuario) 

        this.props.history.push("/inicio")  

        var texto = "";
        var ahora=new Date(); 
        var hora=ahora.getHours();
        if (hora>=6 && hora<13) {
            texto="Buenos días";  
        } else if (hora>=13 && hora<21) { 
            texto="Buenas tardes";
        } else { 
            texto="Buenas noches";
        }

      DialogUtility.alert({
        animationSettings: { effect: 'Zoom' },           
        title: `Hola ${texto} ${data.loginEmpresas.nombre}`,
        content:"Su sesón ha iniciado exitosamente" , 
        position: "fixed",
        
    })
        
  }
  if(data.loginEmpresas.activo==='false'){

    DialogUtility.alert({
      animationSettings: { effect: 'Zoom' },           
      title: 'Su licencia ha Expirado',
      content: `Estimado cliente por el momento no puede iniciar sesión en el sistema de evaluaciones por favor contáctese con su Asesor de ADS para renovar su Suscripción`, 
     
      position: "fixed",
  })

  }
  }
  render() {
    const { isPasswordShown } = this.state;

    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
    return (
        <Mutation mutation={LOGINEMPRESAS}>
        {

    (login, {data, error}) => {
    if (data){
      this.handleData(data)
    } 
    return ( 
        <React.Fragment>
      <form onSubmit={e => this.handleForm(e,login)}>
      <div id="apppage">        
        <MDBView>
          <MDBMask >
            <MDBContainer>
              <MDBRow  >
              <img src = {diagnostico} style={{width:250,marginTop:"38%",marginLeft:"28%",height:90}}/>
              <MDBAnimation type="fadeInRight" delay=".3s">
              <MDBCard style={{width:"100%",marginTop:"2%",marginLeft:"70%"}} >
                <div className="header pt-3 grey lighten-2">
                  <MDBRow className="d-flex justify-content-center">
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                      Iniciar sesión
                    </h3>
                  </MDBRow>
                </div>
                  <MDBCardBody className="mx-4 mt-4">
                    <MDBInput label="Ingrese su RFC" group type="text" validate   id="rfc" onChange={this.handleInput} />
                    <MDBInput
                      id="password" 
                      label="Contraseña"
                      group
                      type="password"
                      validate
                      containerClass="mb-0"
                      onChange={this.handleInput} 
                    />
                    <div className="text-center mb-4 mt-5">
                    <MDBBtn
                      color='success'
                      rounded
                      type='submit'
                      className='btn-block z-depth-1'
                    >
                      Ingresar
                    </MDBBtn>
                    </div>
                  
                  </MDBCardBody>
                </MDBCard>
                </MDBAnimation>   
|
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