  import React from "react";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import diagnostico from '../../images/diagnostico.png'
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import "bootstrap-css-only/css/bootstrap.min.css";
  import "mdbreact/dist/css/mdb.css";
  import 'antd/dist/antd.css';
  import axios from 'axios'
  import { Form } from 'reactstrap';
  import { Card } from 'antd';
  import {
    MDBInput,
    MDBMask,
    MDBRow,
    MDBBtn,
    MDBView,
    MDBAnimation,
    MDBCardBody,
  } from "mdbreact";
  import "./index.css";
  import { DialogUtility } from '@syncfusion/ej2-popups';
  import {API} from '../../utils/http';


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
  localStorage.removeItem("paqueteAdquirido")

  }      

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  onSubmitBtn(){
    axios({
      url:API,
      method:'post',
      data:{
          query:`
          mutation{
              loginEmpresas(data:"${[this.state.rfc,this.state.password]}"){
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
      }   
       }).then(response=>{
        if (response.data.data.loginEmpresas.token === 'no hay token' && response.data.data.loginEmpresas.message==="ningun dato"){
          DialogUtility.alert({
            animationSettings: { effect: 'Zoom' },  
            title:"Aviso!",         
            content: 'Por favor no deje espacios en blanco',
            position: "fixed",
        })
      }
      if(response.data.data.loginEmpresas.token==='no hay token' && response.data.data.loginEmpresas.message==='usuario y contraseña incorrectos'){
        let rfc = response.data.data.loginEmpresas.RFC
        var date = new Date();
        var hours = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        date = mm + '/' + dd + '/' + yyyy;
        let IP = "00000000";
          
            axios({
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
            title:"Aviso!",          
            content: 'RFC o contraseña es incorrectos',
            position: "fixed",
          })  
          }
          if(response.data.data.loginEmpresas.message==='Login exitoso' && response.data.data.loginEmpresas.token && response.data.data.loginEmpresas.activo === "true"){
            let IP  = "000000";
            let rfc = response.data.data.loginEmpresas.RFC
            let idEmpresa = response.data.data.loginEmpresas.id
            var date = new Date();
            var hours = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = date.getFullYear();
            date = mm + '/' + dd + '/' + yyyy;
        
         axios({
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
        
                localStorage.setItem('nombre', response.data.data.loginEmpresas.nombre)
                localStorage.setItem('elToken', response.data.data.loginEmpresas.token)  
                localStorage.setItem('apellidos', response.data.data.loginEmpresas.Apellidos) 
                localStorage.setItem('rfc',response.data.data.loginEmpresas.RFC) 
                if(response.data.data.loginEmpresas.RazonSocial.length>60){
                  localStorage.setItem('razonsocial', response.data.data.loginEmpresas.RazonSocial.substring(0,30) + "...") 
                }else{
                  localStorage.setItem('razonsocial', response.data.data.loginEmpresas.RazonSocial) 
                }
                localStorage.setItem('correo',response.data.data.loginEmpresas.correo)
                localStorage.setItem('idAdmin', response.data.data.loginEmpresas.id) 
                localStorage.setItem('fechaRegistro', response.data.data.loginEmpresas.fechaRegistro) 
                localStorage.setItem('fk_superusuario', response.data.data.loginEmpresas.fk_superusuario) 
                this.props.history.push("/inicio")  
                var texto = "";
                var ahora=new Date(); 
                var hora=ahora.getHours();
                if (hora>=6 && hora<12) {
                    texto="Buenos días";  
                } else if (hora>=12 && hora<=19) { 
                    texto="Buenas tardes";
                } else { 
                    texto="Buenas noches";
                }
              DialogUtility.alert({
                animationSettings: { effect: 'Zoom' },           
                title: `Hola ${texto} ${response.data.data.loginEmpresas.nombre}`,
                content:"Su sesón ha iniciado exitosamente" , 
                position: "fixed",
            })
                
          }if(response.data.data.loginEmpresas.activo === 'false'){
            DialogUtility.alert({
              animationSettings: { effect: 'Zoom' },           
              title: 'Su licencia ha Expirado',
              content: `Estimado cliente por el momento no puede iniciar sesión en el sistema de Administración ya que su suscripción ha terminado por favor contáctese con su asesor de ADS para renovar su licencia`,    
              position: "fixed",
          })
          }
       }).catch(err=>{
         console.log("error",err.response)
         console.log("error",err)
       })
      }
    onChangeInput =(e)=>{
      const {id,value} = e.target;
      this.setState({
          [id]:value
      })
    }

  render() {
    const { isPasswordShown } = this.state;
    let titulo = <center><strong><h3>Iniciar sesión</h3></strong></center>
    return(
      <React.Fragment>
       <div id="apppage" >  
        <MDBView>
          <MDBMask >
          <div style={{marginLeft:"70%",marginTop:"3%"}}>
              <MDBRow  >
              <MDBAnimation type="fadeInRight" delay=".3s">
              <Card title = {titulo} style={{width:"100%"}}>
              <div className="h5 text-center">
                <center>
                  <img src = {diagnostico} style={{width:180,height:60}}/>
                </center>
              </div>
                  <MDBCardBody style={{padding:10}}className="mx-4">
                  <Form onSubmit={this.onSubmitBtn}> 
                  <MDBInput                          
                   id="rfc"
                   type="text"
                   name="rfc"
                   onChange={this.onChangeInput}
                   value={this.state.rfc}
                   required
                   label="Ingrese su RFC"
                   validate
                   />    
                   <MDBInput  
                     size="md"
                     id="password"
                     name="password"
                     onChange={this.onChangeInput}
                     value={this.state.password}
                     required                         
                     label="Contraseña"  
                     type={isPasswordShown ? "text" : "password"}
                   ><i
                      style={{marginTop:"5%"}} 
                      className="fa fa-eye password-icon"
                      onClick={this.togglePasswordVisiblity}
                   /></MDBInput>
                    <div className="text-center mb-4 mt-5">
                    <MDBBtn
                      color='success'
                      onClick={e=> this.onSubmitBtn()}
                      className='btn-block z-depth-1'
                      size="sm"
                      >
                      Iniciar sesión
                    </MDBBtn>
                    </div>
                    </Form>
                  </MDBCardBody>
                </Card>
                </MDBAnimation>   
              </MDBRow>  
              </div>
          </MDBMask>
        </MDBView>
      </div>
      </React.Fragment>
    )        
  }
}

export default Login;