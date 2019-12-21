      import React from 'react';

      import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBBtn} from 'mdbreact';
      import Sidebar from '../Home/sidebar'
      import { AppNavbarBrand } from '@coreui/react';
      import logo from '../images/logotipo.png'
      import '../Home/index.css'
      // import TableCell from '@material-ui/core/TableCell';
      // import TableRow from '@material-ui/core/TableCell';
      
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

      class TableEmployees extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            collapse: false,
            isOpen: false,
            datos:[],
            propiedades:[]   ,
            showModal2: false,       
          };
          this.onClick = this.onClick.bind(this);
          this.handleclick = this.handleclick.bind(this);
          this.handleLogOut = this.handleLogOut.bind(this);
          this.ads = this.ads.bind(this);

        }

        getEmployees = event => {

            var correo  = "d93409@gmail.com"       
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
                      }
                    }
                    `
                }
                    }).then((datos) => {
                      // console.log("parseo" ,JSON.stringify(datos.data.data))
                      // console.log("datps" ,datos.data.data.getUsersTableEmployees)
                      this.setState({ datos: datos.data.data.getUsersTableEmployees});
                    
                     
                      // this.props.history.push("/inicio")
                    })

                    .catch((error) => {
                
                      //console.log("errores" ,error.response.data.errors[0].message)
                      console.log(".cartch" , error.response)
                  });
            }  

            componentWillMount(){
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
                                  <MDBNavLink to="/employees">Cargar Empleados</MDBNavLink>
                                </MDBNavItem>
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
                  <Alert  color="light"><Button
                   onClick = {this.getEmployees}
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="large"
 
                  >
                  <strong>Consultar Empleados</strong> 
                  </Button> </Alert> 
                  
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

                 
                  <table>
                  <Alert style={{marginTop:'55', width:'1075px'}}  color="primary" isOpen={this.state.datos.length}>
                  <tr><td width="9%" >Nombre</td><td width="10%">Apellido P.</td><td width="10%" >Apellido M. </td><td width="13%">Curp</td><td width="10%">RFC</td><td width="10%">Fecha de N.</td><td width="8%">Estado C.</td><td width="12%">Encuesta ATS</td><td width="10%">Encuesta RP</td><td width="10%">Encuesta EEO</td></tr>
                  </Alert>
                  </table>


                  {this.state.datos.map(function(title,index){
                
                   const sendMailATS =  async  (event,valor) =>{
                  
                   DialogUtility.alert({
                    animationSettings: { effect: 'Zoom' },           
                    content: "Su encuesta fue enviada Exitosamente!",
                    title: 'Aviso!',
                    position: "fixed"
                });
   
                      const url = 'http://localhost:8000/graphql'
                     await  axios({
                        url:  url,
                        method:'post',
                        data:{
                        query:`
                         mutation{
                          sendMail(data:"${[title.correo,title.id,valor]}"){
                              message
                                }
                              }
                            `
                        }
                            }).then(datos => {  
                            });       
                            
                     }

                 
                    
                        //  const renderBodyRow = ({ name, status, notes }, i) => ({
                        //   key: name || `row-${i}`,
                        //   warning: !!(status && status.match('Requires Action')),
                        //   cells: [
                        //     name || 'No name specified',
                        //     status ? { key: 'status', icon: 'attention', content: status } : 'Unknown',
                        //     notes ? { key: 'notes', icon: 'attention', content: notes, warning: true } : 'None',
                        //   ],
                        // })
                       

                        console.log("el idex es " , index)
                        console.log("el title es " , title)

                           return (
                         

                            <Table   aria-label="responsive" width="1000" border="1">
                          
                        <tr><td width="10%" >{title.nombre}</td><td width="10%">{title.ApellidoP}</td><td width="10%" >{title.ApellidoM}</td><td width="10%">{title.Curp}</td><td width="10%">{title.rfc}</td><td width="10%">{title.FechaNacimiento}</td><td width="10%">{title.EstadoCivil}</td><td width="10%"> <MDBBtn outline color="success"   onClick={(e) => sendMailATS(e,1)} >ATS</MDBBtn></td><td width="10%"><MDBBtn outline color="primary"  onClick={(e) => sendMailATS(e,2)}>RP</MDBBtn></td><td width="10%"><MDBBtn outline color="info" onClick={(e) => sendMailATS(e,3)}>EEO </MDBBtn></td></tr>
                       
                                
                                
                            {/* <Table.Row>
                                <Table.Cell >{title.nombre}</Table.Cell>
                                <Table.Cell>{title.ApellidoP}</Table.Cell>
                                <Table.Cell>{title.ApellidoM}</Table.Cell>
                                <Table.Cell>{title.Curp}</Table.Cell>
                                <Table.Cell>{title.rfc}</Table.Cell>
                                <Table.Cell>{title.FechaNacimiento}</Table.Cell>
                                <Table.Cell>{title.EstadoCivil}</Table.Cell>
                                */}
                                {/* <TableCell><MDBBtn outline color="info" onClick={(e) => resultSurvey(e)}>Resultado</MDBBtn></TableCell>                      */}
{/*                            
                                </Table.Row> */}
                                {/* <Table celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={title.ApellidoP}/> */}
                 
                          </Table>
                       
                        )
                  })}
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