      import React from 'react';

      import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBBtn} from 'mdbreact';
      import Sidebar from '../Home/sidebar'
      import { AppNavbarBrand } from '@coreui/react';
      import logo from '../images/logotipo.png'
      import diagnostico from '../images/diagnostico.png'
      import { API} from '../utils/http'

      import '../Home/index.css'
      import TableCell from '@material-ui/core/TableCell';
      import TableRow from '@material-ui/core/TableCell';
      import TableContainer from '@material-ui/core/TableContainer';
      import TableHead from '@material-ui/core/TableHead';
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
            periodoActivo:''

         
          };
          this.onClick = this.onClick.bind(this);
          this.handleclick = this.handleclick.bind(this);
          this.handleLogOut = this.handleLogOut.bind(this);
          this.ads = this.ads.bind(this);

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

              let idAdmin = localStorage.getItem("idAdmin")
              // const url = 'http://localhost:8000/graphql'
              // console.log("el tiempo es " , t )
               axios({
                url:  API,
                method:'post',
                data:{
                query:`
                 query{
                  getPeriodo(data:"${[idAdmin]}"){
                    idEventos
                    fk_administrador
                    Descripcion
                    EventoActivo
                        }
                      }
                    `
                }
              })
              .then(datos => {	
              this.setState({periodoActivo : datos.data.data.getPeriodo.length})
            
              }).catch(err=>{
                console.log("error",err.response)
              })
            
            }
            onClick() {
              this.setState({
                collapse: !this.state.collapse,
              });
            }
          
          handleclick(){
          this.props.history.push("/profile")
          
          }
          
        getEmployees = event => {

          var idAdmin  =localStorage.getItem("idAdmin")  
          console.log(idAdmin)     
            // const url = 'http://localhost:8000/graphql'
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
              query{
                getUsersTableEmployees(data:"${[idAdmin]}"){
                  id
                  nombre
                  ApellidoP
                  ApellidoM
                  Curp
                  RFC
                  FechaNacimiento
                  Sexo
                  CP
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
                          <MDBNavbarBrand a href="./inicio">
                          <AppNavbarBrand
                              full={{ src: diagnostico, width: 100, height: 33, alt: 'Diagnostico' }} />               
                          </MDBNavbarBrand>
                          <MDBNavbarBrand>
                            Enviar Encuestas a mis colaoradores
                          </MDBNavbarBrand>
                          <MDBNavbarToggler onClick={this.onClick} />
                          <MDBCollapse isOpen={this.state.collapse} navbar>
                          &nbsp;&nbsp;&nbsp;
                          
                            <strong>{localStorage.getItem("razonsocial")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {this.state.date}</strong> 
                            <MDBNavbarNav right>
                                          
                      
                            <MDBNavbarBrand>
                            <AppNavbarBrand
                              full={{ src: logo, width: 80, height:25 , alt: 'ADS' }} /> 
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
                 </MDBCol>
                  </MDBRow>
                  <Alert style={{marginTop:'55', width:'1075px'}}  color="secondary" isOpen={this.state.datos.length}>
                  <tr><td width="5%" ></td><td width="9%" ></td>Si desea puede enviar su encuesta a los colaboradores </tr>
                  </Alert>  
                  <TableContainer component={Paper}>   
                <TableCell width="1%">Id</TableCell>
                    <TableCell width="10%" >Nombre</TableCell>
                    <TableCell width="13%">Apellido P.</TableCell>
                    <TableCell width="13%">Apellido M.</TableCell>
                    <TableCell width="13%"> CURP</TableCell>
                    <TableCell width="13%">RFC</TableCell>
                    <TableCell>EncuesATS</TableCell>
                    <TableCell>EncuestaRP</TableCell>
                    <TableCell>EncuestaEEO</TableCell>
                    </TableContainer>
              
                 <Paper className="mt-2">
                  <Table  >
                  {this.state.datos.map(rows =>{
                  
                          const sendMailATS =  async  (event,valor,idSurvey,correo) =>{
                            
                            // const url = 'http://localhost:8000/graphql'
                            axios({
                            url:  API,
                            method:'post',
                            data:{
                            query:`
                            query{
                              verifiEmailSurveyATS(data:"${[valor,correo]}"){
                                  ATSContestado
                                    }
                                  }
                                `
                            }
                         }).then(datos => {  
                       
                          //  this.setState({ATSContestado:datos.data.data.verifiEmailSurveyATS[0].ATSContestado})
                          var contestado = datos.data.data.verifiEmailSurveyATS[0].ATSContestado
                          localStorage.setItem("ATSContestado" ,contestado )
                          if(localStorage.getItem("ATSContestado") =='true'){

                            DialogUtility.alert({
                              animationSettings: { effect: 'Zoom' },           
                              title: "Su colaborador ya ha respondido la encuesta",
                              // title: 'Aviso!',
                              position: "fixed"
                              });
                              localStorage.removeItem("ATSContestado")
                           }
                           else if (localStorage.getItem("ATSContestado")=='false' && this.state.periodoActivo > 0){
                             
                            DialogUtility.alert({
                              animationSettings: { effect: 'Zoom' },           
                              content: "Su encuesta fue enviada Exitosamente!",
                              title: 'Aviso!',
                              position: "fixed"
                              });
                              axios({
                              url:  API,
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
  
                           } else{
                            DialogUtility.alert({
                              animationSettings: { effect: 'Zoom' },           
                              content: " Su evaluación no fue enviada ya que no cuenta con un periodo Registrado!",
                              title: 'Aviso!',
                              position: "fixed"
                              });
                           }       
                         }).catch(err =>{
                           console.log(err.response)
                         })             

                        }    
                            ///////////////////////////////////////////////////////////////////////////////////////
                              const sendMailRP =  async  (event,valor,idSurvey) =>{
                            
                                // const url = 'http://localhost:8000/graphql'
                                axios({
                                url:  API,
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
                               else if (localStorage.getItem("RPContestado")=='false' && this.state.periodoActivo > 0){
                                 
                                DialogUtility.alert({
                                  animationSettings: { effect: 'Zoom' },           
                                  content: "Su encuesta fue enviada Exitosamente!",
                                  title: 'Aviso!',
                                  position: "fixed"
                                  });
                                  axios({
                                  url:  API,
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
                               }else{
                                DialogUtility.alert({
                                  animationSettings: { effect: 'Zoom' },           
                                  content: " Su evaluación no fue enviada ya que no cuenta con un periodo Registrado!",
                                  title: 'Aviso!',
                                  position: "fixed"
                                  });
                               }        
                             }).catch(err =>{
                               console.log(err.response)
                             })          
                            }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                            const sendMailEEO =  async  (event,valor,idSurvey) =>{
                            console.log("valor EEO" , valor)
                              // const url = 'http://localhost:8000/graphql'
                              axios({
                              url:  API,
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
                             else if (localStorage.getItem("EEOContestado")=='false' && this.state.periodoActivo > 0){
                               
                              DialogUtility.alert({
                                animationSettings: { effect: 'Zoom' },           
                                content: "Su encuesta fue enviada Exitosamente!",
                                title: 'Aviso!',
                                position: "fixed"
                                });
                                axios({
                                url:  API,
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
                             }else{
                              DialogUtility.alert({
                                animationSettings: { effect: 'Zoom' },           
                                content: " Su evaluación no fue enviada ya que no cuenta con un periodo Registrado!",
                                title: 'Aviso!',
                                position: "fixed"
                                });
                             }        
                           }).catch(err =>{
                             console.log(err.response)
                           })          
                          }

                           return (
                           <TableBody>
                          
                            <TableCell width="1%">
                              {rows.id}
                            </TableCell>
                            <TableCell width="10%">{rows.nombre}</TableCell>
                            <TableCell width="10%" >{rows.ApellidoP}</TableCell>
                            <TableCell width="10%" >{rows.ApellidoM}</TableCell>
                            <TableCell  width="10%">{rows.Curp}</TableCell>
                            <TableCell width="10%" >{rows.RFC} </TableCell>
                            <TableCell width="10%" ><MDBBtn  color="danger"  onClick={(e) => sendMailATS(e,rows.id,1,rows.correo)}>ATS</MDBBtn></TableCell>
                            <TableCell width="10%" ><MDBBtn  color="danger"  onClick={(e) => sendMailRP(e,rows.id,2)}>RP</MDBBtn></TableCell>
                            <TableCell  width="10%"><MDBBtn  color="danger" onClick={(e) => sendMailEEO(e,rows.id,3)}>EEO </MDBBtn></TableCell>
                         
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