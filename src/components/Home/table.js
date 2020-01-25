      import React from 'react';

      import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBBtn} from 'mdbreact';
      import Sidebar from '../Home/sidebar'
      import { AppNavbarBrand } from '@coreui/react';
      import logo from '../images/logotipo.png'
      import '../Home/index.css'
      import TableCell from '@material-ui/core/TableCell';
      import TableRow from '@material-ui/core/TableCell';
      
      import {Table } from 'semantic-ui-react'
      // import Paper from '@material-ui/core/Paper';
      import { MDBRow,MDBCol} from 'mdbreact'
      import Button from '@material-ui/core/Button';
      import axios from 'axios'
      import { DialogUtility } from '@syncfusion/ej2-popups';
      // import TableBody from '@material-ui/core/TableBody';
      import { Alert } from 'reactstrap';
      // import TableHead from '@material-ui/core/TableHead';

      import usuario from '../images/usuario.png'
      import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
      import Modal from 'react-modal';
      import {
        Grid    
      } from '@material-ui/core';

      import TableBody from '@material-ui/core/TableBody';
      import Paper from '@material-ui/core/Paper';

      class TableEmployees extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            collapse: false,
            isOpen: false,
            datos:[],
            propiedades:[]   ,
            showModal2: false,     
            ATSContestado:'',

         
          };
          this.onClick = this.onClick.bind(this);
          this.handleclick = this.handleclick.bind(this);
          this.handleLogOut = this.handleLogOut.bind(this);
          this.ads = this.ads.bind(this);

        }

        getEmployees = event => {

            var correo  =localStorage.getItem("correo")       
              const url = 'http://localhost:8000/graphql'
              axios({
                url:  url,
                method:'post',
                data:{
                query:`
                query{
                  getUsersTableEmployees(email:"${correo}"){
                    id
                    nombre
                    ApellidoP
                    ApellidoM
                    Curp
                    rfc
                    FechaNacimiento
                    Sexo
                    cp
                    EstadoCivil
                    correo
                    AreaTrabajo
                    Puesto
                    Ciudad
                    NivelEstudios
                    TipoPersonal
                    JornadaTrabajo
                    TipoContratacion
                    TiempoPuesto
                    ExperienciaLaboral
                    RotacionTurnos
                    fk_administrador
                    ATSContestado
                    RPContestado
                    EEOContestado
                      }
                    }
                    `
                }
                    }).then((datos) => {
                      // console.log("parseo" ,JSON.stringify(datos.data.data))
                      // console.log("datps" ,datos.data.data.getUsersTableEmployees)
                      this.setState({ datos: datos.data.data.getUsersTableEmployees});
                    
                     console.log("estos son los id" , datos.data.data.getUsersTableEmployees)
                      // this.props.history.push("/inicio")
                    })

                    .catch((error) => {
                
                      //console.log("errores" ,error.response.data.errors[0].message)
                      console.log(".cartch" , error.response)
                  });
                  
            }  

            componentWillMount(){
              this.getEmployees()
              var Nombre = localStorage.getItem("nombre")
              var Apellidos = localStorage.getItem("apellidos")
          
          
              var LaFecha=new Date();
              var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
              var diasem=new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
              var diasemana=LaFecha.getDay();
              var FechaCompleta="";
              var NumeroDeMes="";    
              NumeroDeMes=LaFecha.getMonth();
              FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
          
              this.setState({date:FechaCompleta}) 
              this.setState({nombre:Nombre}) 
              this.setState({apellidos:Apellidos}) 
            }
            onClick() {
              this.setState({
                collapse: !this.state.collapse,
              });
            }
          
          handleclick(){
          this.props.history.push("/profile")
          
          }
          
          
          
          handleLogOut(){
          localStorage.removeItem("elToken")
          localStorage.removeItem("nombre")
          localStorage.removeItem("apellidos")
          localStorage.removeItem("rfc")
          localStorage.removeItem("razonsocial")
          localStorage.removeItem("usuario")
          localStorage.removeItem("correo")
          localStorage.removeItem("max")
          this.props.history.push("/login")
          DialogUtility.alert({
            animationSettings: { effect: 'Fade' },           
            title: 'Hasta luego...!',
            position: "fixed",
          
          }
          )
          }
                   
          ads(){
          
            this.setState({showModal2:true})
            
          }

        render() {

          // const { children, ...attributes } = this.props;
          const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
          const container = { width: 2500, height: 1300 }
          return (
                    <React.Fragment>
                    <div>
                        <header>
                          <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
                          <Sidebar/>
                            <MDBNavbarBrand href="/inicio">
                              <AppNavbarBrand
                                full={{ src: logo, width: 80, height: 25, alt: 'ADS' }} />               
                            </MDBNavbarBrand>
                            <MDBNavbarToggler onClick={this.onClick} />
                            <MDBCollapse isOpen={this.state.collapse} navbar>
                              <MDBNavbarNav left>
                                <MDBNavItem active>
                                  <MDBNavLink to="/survey">Cuestionario ATS</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active>
                                  <MDBNavLink to="/politicaRP">Cuestionario RP</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active>
                                  <MDBNavLink to="/politicaEEO">Cuestionario EEO</MDBNavLink>
                                </MDBNavItem>
                              </MDBNavbarNav>
                              <strong>{this.state.date}</strong> 
                <MDBNavbarNav right>
                <MDBNavbarBrand>
              <AppNavbarBrand full={{ src: usuario, width: 30, height: 25, alt: 'ADS' }} />               
              {this.state.nombre}
              </MDBNavbarBrand>
              <MDBNavbarBrand>
              
              <MDBNavItem>
                
              <MDBDropdown>
                
                    <MDBDropdownToggle nav caret>
                  
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem onClick={this.handleclick}>Mi Perfil</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Configuración</MDBDropdownItem>
                      <MDBDropdownItem onClick={this.ads}>Más sobre ADS</MDBDropdownItem>
                      <MDBDropdownItem onClick={this.handleLogOut}>Cerrar Sesión</MDBDropdownItem>

                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                </MDBNavbarBrand>
                    </MDBNavbarNav>
                  </MDBCollapse>
                </MDBNavbar>
                        </header>
                      <MDBContainer style={container} className="text-center mt-4 pt-5">
                  <MDBContainer style={container} className="text-center mt-2 pt-2">
                  <ul>
                  <MDBRow>
                  <MDBCol> 
                  {/* <Alert  color="light"><Button
                   onClick = {this.getEmployees}
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="large"
 
                  >
                  <strong>Consultar Empleados</strong> 
                  </Button> </Alert>  */}
                  
                  <Alert  color="light"><Button
                   
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="large"
 
                  >
                  <strong>Opcion</strong> 
                  </Button> </Alert>

                  
                  </MDBCol>
                  <MDBCol>
                  <Alert  color="light"><Button
                   
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    size="large"
 
                  >
                  <strong>Estadísticas</strong> 
                  </Button> </Alert>

                  <Alert  color="light"><Button
                   
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    size="large"
 
                  >
                  <strong>Reportes</strong> 
                  </Button> </Alert>

                  {/* <MDBBtn className="boton mt-10 " color="info" onClick = {this.getEmployees}>consulta </MDBBtn> */}
                  </MDBCol>
                  </MDBRow>
                  <Alert style={{marginTop:'55', width:'1075px'}}  color="secondary" isOpen={this.state.datos.length}>
                  <tr><td width="5%" ></td><td width="9%" ></td>Si desea puede enviar su encuesta a los colaboradores </tr>
                  </Alert>
                  <Paper >
                
                  <table>
                  
                  <Alert style={{marginTop:'55', width:'1075px'}}  color="primary" isOpen={this.state.datos.length}>
                  <tr><td width="5%" ></td><td width="9%" >Nombre</td><td width="10%">Apellido P.</td><td width="10%" >Apellido M. </td><td width="13%">Curp</td><td width="10%">Ciudad</td><td width="10%">Sexo</td><td width="8%">RFC</td></tr>
                  </Alert>
                  </table>
                  <Table  >
                  {this.state.datos.map(rows =>{
                  
                          const sendMailATS =  async  (event,valor,idSurvey) =>{
                            
                            const url = 'http://localhost:8000/graphql'
                            axios({
                            url:  url,
                            method:'post',
                            data:{
                            query:`
                            query{
                              verifiEmailSurveyATS(data:"${[valor]}"){
                                  ATSContestado
                                    }
                                  }
                                `
                            }
                         }).then(datos => {  
                       
                          //  this.setState({ATSContestado:datos.data.data.verifiEmailSurveyATS[0].ATSContestado})
                          var contestado = datos.data.data.verifiEmailSurveyATS[0].ATSContestado
                          localStorage.setItem("ATSContestado" ,contestado )
                          console.log("entro primero aqui")
                          if(localStorage.getItem("ATSContestado") =='true'){
                            console.log("entro deoues aqui")
                            console.log("atscontestado" , this.state.ATSContestado)
                            DialogUtility.alert({
                              animationSettings: { effect: 'Zoom' },           
                              title: "Su colaborador ya ha respondido la encuesta",
                              // title: 'Aviso!',
                              position: "fixed"
                              });
                              localStorage.removeItem("ATSContestado")
                           }
                           else if (localStorage.getItem("ATSContestado")=='false'){
                             
                            DialogUtility.alert({
                              animationSettings: { effect: 'Zoom' },           
                              content: "Su encuesta fue enviada Exitosamente!",
                              title: 'Aviso!',
                              position: "fixed"
                              });
                              axios({
                              url:  url,
                              method:'post',
                              data:{
                              query:`
                              mutation{
                                sendMail(data:"${[rows.correo,valor,idSurvey]}"){
                                    message
                                      }
                                    }
                                  `
                              }
                                  }).then(datos => {  
                                    localStorage.removeItem("ATSContestado")
                                  });
  
                           }        
                         }).catch(err =>{
                           console.log(err.response)
                         })             

                        }    
                        
                              ///////////////////////////////////////////////////////////////////////////////////////
                              const sendMailRP =  async  (event,valor,idSurvey) =>{
                            
                                const url = 'http://localhost:8000/graphql'
                                axios({
                                url:  url,
                                method:'post',
                                data:{
                                query:`
                                query{
                                  verifiEmailSurveyRP(data:"${[valor]}"){
                                      RPContestado
                                        }
                                      }
                                    `
                                }
                             }).then(datos => {  
                              var contestado = datos.data.data.verifiEmailSurveyRP[0].RPContestado
                              localStorage.setItem("RPContestado" ,contestado )
                              if(localStorage.getItem("RPContestado") =='true'){
                                DialogUtility.alert({
                                  animationSettings: { effect: 'Zoom' },           
                                  title: "Su colaborador ya ha respondido la encuesta",
                                  // title: 'Aviso!',
                                  position: "fixed"
                                  });
                                  localStorage.removeItem("RPContestado")
                               }
                               else if (localStorage.getItem("RPContestado")=='false'){
                                 
                                DialogUtility.alert({
                                  animationSettings: { effect: 'Zoom' },           
                                  content: "Su encuesta fue enviada Exitosamente!",
                                  title: 'Aviso!',
                                  position: "fixed"
                                  });
                                  axios({
                                  url:  url,
                                  method:'post',
                                  data:{
                                  query:`
                                  mutation{
                                    sendMail(data:"${[rows.correo,valor,idSurvey]}"){
                                        message
                                          }
                                        }
                                      `
                                  }
                                      }).then(datos => {  
                                        localStorage.removeItem("RPContestado")
                                      });
                               }        
                             }).catch(err =>{
                               console.log(err.response)
                             })          
                            }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                            const sendMailEEO =  async  (event,valor,idSurvey) =>{
                            console.log("valor EEO" , valor)
                              const url = 'http://localhost:8000/graphql'
                              axios({
                              url:  url,
                              method:'post',
                              data:{
                              query:`
                              query{
                                verifiEmailSurveyEEO(data:"${[valor]}"){
                                    EEOContestado
                                      }
                                    }
                                  `
                              }
                           }).then(datos => {  
                            var contestado = datos.data.data.verifiEmailSurveyEEO[0].EEOContestado
                            localStorage.setItem("EEOContestado" ,contestado )
                            if(localStorage.getItem("EEOContestado") =='true'){
                              DialogUtility.alert({
                                animationSettings: { effect: 'Zoom' },           
                                title: "Su colaborador ya ha respondido la encuesta",
                                // title: 'Aviso!',
                                position: "fixed"
                                });
                                localStorage.removeItem("EEOContestado")
                             }
                             else if (localStorage.getItem("EEOContestado")=='false'){
                               
                              DialogUtility.alert({
                                animationSettings: { effect: 'Zoom' },           
                                content: "Su encuesta fue enviada Exitosamente!",
                                title: 'Aviso!',
                                position: "fixed"
                                });
                                axios({
                                url:  url,
                                method:'post',
                                data:{
                                query:`
                                mutation{
                                  sendMail(data:"${[rows.correo,valor,idSurvey]}"){
                                      message
                                        }
                                      }
                                    `
                                }
                                    }).then(datos => {  
                                      localStorage.removeItem("EEOContestado")
                                    });
                             }        
                           }).catch(err =>{
                             console.log(err.response)
                           })          
                          }
      

                           return (
                           <TableBody>
                            <TableRow>
                            <TableCell width="1%">
                              {rows.id}
                            </TableCell>
                            <TableCell width="10%">{rows.nombre}</TableCell>
                            <TableCell width="10%" >{rows.ApellidoP}</TableCell>
                            <TableCell width="10%" >{rows.ApellidoM}</TableCell>
                            <TableCell  width="10%">{rows.Curp}</TableCell>
                            <TableCell width="10%" >{rows.rfc} </TableCell>
                            <TableCell width="10%" ><MDBBtn outline color="primary"  onClick={(e) => sendMailATS(e,rows.id,1)}>ATS</MDBBtn></TableCell>
                            <TableCell width="10%" ><MDBBtn outline color="primary"  onClick={(e) => sendMailRP(e,rows.id,2)}>RP</MDBBtn></TableCell>
                            <TableCell  width="10%"><MDBBtn outline color="info" onClick={(e) => sendMailEEO(e,rows.id,3)}>EEO </MDBBtn></TableCell>
                          </TableRow>     
                          </TableBody>                 
                        )       
                  })}

                
                  </Table>
                  </Paper>
                 
                  </ul>


                  <Modal className="modal-main" isOpen={this.state.showModal2} contentLabel="Minimal Modal Example">
                    <div className="row">
                        <div className="col-md-12" item xs={12}>
                            <center><br/>
                                <br/>
                                <br/>
                                <font size="4">
                                El Distribuidor Asociado Master de CONTPAQi® que ha recibido el reconocimiento como el
                                <br/>
                                 Primer Lugar en Ventas por 15 Años Consecutivos en la Ciudad de México.
                                
                                <br/>
                                <br/>
                                Alfa Diseño de Sistemas: 
                               
                                Somos un distribuidor asociado master de CONTPAQi®, 
                                <br/>
                                 una casa desarrolladora de software, que además es PAC (Proveedor Autorizado de Certificación) y PCRDD 
                                <br/>
                                (Proveedor de Certificación y Recepción de Documentos Digitales) por parte del SAT.
                                {/* <img src={Ok} alt="ok" className="img-fluid"/><br/><br/> */}
                                <br/>
                                <br/>
                                Conoce más sobre nosotros en 
                                <br></br>
                                  <a href="www.ads.com.mx">www.ads.com.mx</a>
                                </font>

                                <br/>
                                <br/>
                                <br/>
                                {/* <Alert color="secondary" style={{fontSize: 24}}>Su encuesta ha finalizado, Gracias por su colaboración</Alert> */}
                                <br/>
                                <br/>
                                <Grid item style={{ marginTop: 16 }} spacing={2} item xs={12}>
                                <Button 
                                  variant="outlined"
                                    color="primary"
                                    type = "submit"
                                     onClick={()=>{this.setState({showModal2:false})}}
                                  >
                                   Cerrar
                                  </Button>
                                  </Grid>
                            </center>
                        </div>
                    </div>

                </Modal>
                  </MDBContainer >

        </MDBContainer>
      </div>   
      </React.Fragment>
    );
  }
}


export default TableEmployees