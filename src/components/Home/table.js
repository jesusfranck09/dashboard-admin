      import React from 'react';

      import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBBtn} from 'mdbreact';
      import Sidebar from '../Home/sidebar'
      import { AppNavbarBrand } from '@coreui/react';
      import logo from '../images/logotipo.png'
      import '../Home/index.css'
      import TableCell from '@material-ui/core/TableCell';
      import {Table } from 'semantic-ui-react'
      import Paper from '@material-ui/core/Paper';
      import { Alert } from 'reactstrap';
      import { MDBRow,MDBCol} from 'mdbreact'
      import Button from '@material-ui/core/Button';
      import axios from 'axios'
      import { DialogUtility } from '@syncfusion/ej2-popups';

      class TableEmployees extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            collapse: false,
            isOpen: false,
            datos:[],          
          };
          this.onClick = this.onClick.bind(this);

        }
        onClick() {
          this.setState({
            collapse: !this.state.collapse,
          });
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
                      console.log("el estado" , this.state.datos)
                      // this.props.history.push("/inicio")
                    })

                    .catch((error) => {
                
                      //console.log("errores" ,error.response.data.errors[0].message)
                      console.log(".cartch" , error.response)
                  });
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
                              <MDBNavbarNav right>
                              <MDBNavItem>
                                <MDBNavLink to="#">Mi Perfil</MDBNavLink>
                              </MDBNavItem>
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
                  <strong>Resultados Globales</strong> 
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


                 
                  {this.state.datos.map(function(title,index){

                   const sendMailATS =  async  (event,valor) =>{
                   console.log("valor" , valor)
               
                      const armando = "jesus.francisco@ads.com.mx"
                      const url = 'http://localhost:8000/graphql'
                     await  axios({
                        url:  url,
                        method:'post',
                        data:{
                        query:`
                         mutation{
                          sendMail(data:"${[armando]}"){
                              message
                                }
                              }
                            `
                        }
                            }).then((datos) => {
                              DialogUtility.alert({
                                animationSettings: { effect: 'Zoom' },           
                                content: "Su encuesta fue enviada Exitosamente!",
                                title: 'Aviso!',
                                position: "fixed"
                            });
                              console.log("los datos son ",datos)
                            }); 
                     }

                           return (
                           <Paper  >
                            
                            <Table  size="small" aria-label="a dense table">
                            <Table.Body>
                                <TableCell>{title.nombre}</TableCell>
                                <TableCell>{title.ApellidoP}</TableCell>
                                <TableCell>{title.ApellidoM}</TableCell>
                                <TableCell>{title.Curp}</TableCell>
                                <TableCell>{title.rfc}</TableCell>
                                <TableCell>{title.FechaNacimiento}</TableCell>
                                <TableCell>{title.EstadoCivil}</TableCell>
                                <TableCell><MDBBtn outline color="success"   onClick={(e) => sendMailATS(e,1)} >ATS</MDBBtn></TableCell>
                                <TableCell><MDBBtn outline color="primary"  onClick={(e) => sendMailATS(e,2)}>RP</MDBBtn></TableCell>
                                <TableCell><MDBBtn outline color="info" onClick={(e) => sendMailATS(e,3)}>EEO </MDBBtn></TableCell>
                                <TableCell><MDBBtn outline color="info">Resultado</MDBBtn></TableCell>
                            </Table.Body>
                          </Table>
                          </Paper>
                        )
                  })}
                  </ul>
                  </MDBContainer >
        </MDBContainer>
      </div>
   
      </React.Fragment>
    );
  }
}


export default TableEmployees