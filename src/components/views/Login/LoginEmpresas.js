import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import diagnostico from '../../images/diagnostico.png'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBInput,
  MDBMask,
  MDBRow,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBAnimation,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import "./index.css";
import { DialogUtility } from '@syncfusion/ej2-popups';
import axios from 'axios'
import {API} from  '../../utils/http'


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rfc: '',
            password: '',
            isPasswordShown: false
        
        }
      }
componentWillMount(){
sessionStorage.removeItem("elToken")
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

}      
handleInput = (e) => {
  console.log("esta es la e" , e)
    const {id, value} = e.target
     this.setState({
        [id]:value
    });
  }

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };


  handleForm = async (e) => { 
    e.preventDefault();
    console.log("event" , this.state.rfc,this.state.password)
    if(this.state.rfc && this.state.password){
    let IP;
    
    var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})

/*Ejemplo de uso*/
    await findIP.then(ip => {
      IP = ip
    }).catch(err=>{
      console.log("error al obtener ip" , err)
    })

    var rfc   = this.state.rfc;
    var pass  = this.state.password

    var date = new Date();
    var hours = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;

    console.log("datos" , rfc,pass,IP,date,hours)

        axios({
          url:  API,
          method:'post',
          data:{
          query:`
          mutation{
            loginEmpresas(data:"${[date,hours,IP,rfc,pass]}"){
              message
              token
              id
              nombre
              Apellidos
              RFC
              RazonSocial
              telefono
              correo
              activo
              fechaRegistro
              fk_superusuario
                }
              }
              `
          }
          }).then((datos) => {
            if(datos.data.data.loginEmpresas.token==='no hay token' && datos.data.data.loginEmpresas.message==='usuario y contraseña incorrectos'){
              DialogUtility.alert({
                animationSettings: { effect: 'Zoom' },           
                title: 'USUARIO Y CONTRASEÑA INCORRECTOS',
                position: "fixed",
            })  
            }
            else if(datos.data.data.loginEmpresas.message==='Login exitoso' && datos.data.data.loginEmpresas.token){
              localStorage.setItem('nombre', datos.data.data.loginEmpresas.nombre)
              sessionStorage.setItem('elToken', datos.data.data.loginEmpresas.token)  
              localStorage.setItem('apellidos', datos.data.data.loginEmpresas.Apellidos) 
              localStorage.setItem('rfc',datos.data.data.loginEmpresas.RFC) 
              localStorage.setItem('razonsocial',datos.data.data.loginEmpresas.RazonSocial) 
              localStorage.setItem('correo',datos.data.data.loginEmpresas.correo)
              localStorage.setItem('idAdmin', datos.data.data.loginEmpresas.id) 
              localStorage.setItem('fechaRegistro', datos.data.data.loginEmpresas.fechaRegistro) 
              localStorage.setItem('fk_superusuario', datos.data.data.loginEmpresas.fk_superusuario) 

              this.props.history.push("/inicio")  
              DialogUtility.alert({
                animationSettings: { effect: 'Zoom' },           
                title: 'Sesión iniciada  BIENVENIDO  '+ datos.data.data.loginEmpresas.nombre,
                position: "fixed",
               })  
        }else if (datos.data.data.loginEmpresas.message == 'RFC no encontrado'){
              DialogUtility.alert({
                title: "AVISO !",
                animationSettings: { effect: 'Zoom' },           
                content: 'Estimado usuario su RFC no ha sido encontrado',
                position: "fixed",
              })  
        }
          })
          .catch((error) => {
            console.log(".cartch" , error.response)
        });
      }else{
        DialogUtility.alert({
          animationSettings: { effect: 'Zoom' },           
          title: 'No deje espacios en blanco',
          position: "fixed",
         })  
      }
  }
  
  render() {
    return ( 
    <React.Fragment>
     <form onSubmit={e => this.handleForm(e)}>
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

    );
  }
}

export default Login;