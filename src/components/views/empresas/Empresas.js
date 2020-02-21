import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import logo from '../../images/logotipo.png'
import { AppNavbarBrand } from '@coreui/react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
	Paper,
	Grid,
	MenuItem,Button
  } from '@material-ui/core';
  import TableCell from '@material-ui/core/TableCell';
  import TableBody from '@material-ui/core/TableBody';
  import Table from '@material-ui/core/Table';
  import TableRow from '@material-ui/core/TableRow';
  import { MDBModal, MDBModalBody, MDBModalHeader} from "mdbreact";
  import TableHead from '@material-ui/core/TableHead';
  import TableContainer from '@material-ui/core/TableContainer';

//   import { MDBModal, MDBModalBody, MDBModalHeader, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

  import { MDBCardTitle,MDBCardHeader ,MDBBtn} from 'mdbreact';
  
  import { Form, Field } from 'react-final-form';
  import {Alert} from 'reactstrap';
  import {  Select, TextField} from 'final-form-material-ui';
  import axios from 'axios'
  import { DialogUtility } from '@syncfusion/ej2-popups';


import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBView,
  MDBContainer,
  MDBAnimation,
  MDBCard,
  MDBCardBody,

} from "mdbreact";
import "../../Home/index.css";

import Chart from 'react-apexcharts'


class Validation1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registro:'',
            empresa:[],
     
            dias:'',
            horas:'',
            minutos:'',
            segundos:'',
            licencia:'',
            noEmpresas:'',
            datosEmpresas:'',
            modal11:false,
            rs:'',
            totalEmpledosRegistrados:'',
            empleadosPack:'',
        }
      }
      onSubmit (values) {
		const vari = JSON.stringify(values,1,2)
        };
        componentWillMount(){
            var idASuperusuario = localStorage.getItem("idASuperusuario")    

            const url = 'http://localhost:8000/graphql'
            axios({
              url:  url,
              method:'post',
              data:{
              query:`
               query{
                getAdminFechaRegistro(data:"${[idASuperusuario]}"){
                fechaRegistro
                      }
                    }
                  `
              }
                  }).then((datos) => {
                  console.log("Registro",datos.data.data.getAdminFechaRegistro.fechaRegistro)
                  
                  var part1=datos.data.data.getAdminFechaRegistro.fechaRegistro.substring(5,11)
                  
                  var año = datos.data.data.getAdminFechaRegistro.fechaRegistro.substring(12,16)
                  var añoEntero  = parseInt(año)
                  var añoExpiracion = añoEntero+1 
                  var part2=datos.data.data.getAdminFechaRegistro.fechaRegistro.substring(16,29)
                  this.countdown(part1 + añoExpiracion + part2)
                  localStorage.setItem("fechaRegistroSuperusuario",datos.data.data.getAdminFechaRegistro.fechaRegistro)
                  })


		
                    axios({
                    url:  url,
                    method:'post',
                    data:{
                    query:`
                    query{
                        getEmpresas(data:"${[idASuperusuario]}"){
                            id
                            nombre
                            Apellidos
                            RFC
                            RazonSocial
                            correo
                            }
                        }
                        `
                    }
                })
                .then(datos => {	
                this.setState({empresa:datos.data.data.getEmpresas})
                }).catch(err=>{
                    console.log("este es el error get deptos" , err.response)
                }) 
                 axios({
                  url:  url,
                  method:'post',
                  data:{
                  query:`
                   query{
                    verifyPackSuperUser(data:"${[idASuperusuario]}"){
                        empresas
                        empleados
                          }
                        }
                      `
                  }
                })
                .then(datos => {	
              console.log("exito PAquetes" , datos)
              this.setState({empleadosPack:datos.data.data.verifyPackSuperUser.empleados})
              this.setState({noEmpresas: datos.data.data.verifyPackSuperUser.empresas})   
                }).catch(err=>{
                  console.log("error" ,err.response)
                })     
        }
        
        
        evaluar  = async (values) =>{
        console.log("values" , values)    
        if(values.Nombre && values.Apellidos && values.rfc && values.RazonSocial && values.correo && values.contraseña){
        console.log("entro")
          const url = 'http://localhost:8000/graphql'
        var idAdmin  =localStorage.getItem("idASuperusuario") 
        let noEmpresasPack;
        await axios({
          url:  url,
          method:'post',
          data:{
          query:`
           query{
            verifyPackSuperUser(data:"${[idAdmin]}"){
                empresas
   
                  }
                }
              `
          }
        })
        .then(datos => {	
      console.log("exito PAquetes" , datos)
          noEmpresasPack=datos.data.data.verifyPackSuperUser.empresas
        }).catch(err=>{
          console.log("error" ,err.response)
        })     

       let intEmpresasPack = parseInt(noEmpresasPack) 
      
       let empresas;     
       await axios({
        url:  url,
        method:'post',
        data:{
        query:`
         query{
          countEmpresas(data:"${[idAdmin]}"){
              id
                }
              }
            `
        }
      })
      .then(datos => {	
    
      empresas=datos.data.data.countEmpresas.id

      }).catch(err=>{
        console.log("error" ,err.response)
      })     

     let empresasInt = parseInt(empresas)

   
       if(empresasInt< intEmpresasPack){
        const nombre= values.Nombre
        const apellidos= values.Apellidos
        const rfc = values.rfc
        const RazonSocial = values.RazonSocial
        const correo = values.correo  
       const contraseña = values.contraseña
       var fecha = localStorage.getItem("fechaRegistroSuperusuario")
        const fechaRegistro  = fecha.substring(5,29)
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
          mutation{
            addAdminEmpresa(data:"${[nombre,apellidos,rfc,RazonSocial,correo,contraseña,fechaRegistro,idAdmin]}"){
              message 
              token
                }
              }
              `
          }
              }).then((datos) => {
               if(datos.data.data.addAdminEmpresa.message=="admin Registrado"){
                DialogUtility.alert({
                    animationSettings: { effect: 'Zoom' },           
                    content: "Empresa Registrada",
                    title: 'Aviso!',
                    position: "fixed"
                  });
                  let periodo = "Periodo Inicial"
                  const url = 'http://localhost:8000/graphql'
                  axios({
                    url:  url,
                    method:'post',
                    data:{
                    query:`
                     mutation{
                      addPeriodoInicial(data:"${[periodo]}"){
                          message
                            }
                          }
                        `
                    }
                  })
                  .then(datos => {	
                
                  })
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);   

               }
               else if(datos.data.data.addAdminEmpresa.message=="rfc duplicado"){
                DialogUtility.alert({
                    animationSettings: { effect: 'Zoom' },           
                    content: "El rfc ya se encuentra registrado por favor ingrese uno diferente ",
                    title: 'Aviso!',
                    position: "fixed"
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);     
               }
                // this.props.history.push("/inicio")
              })

              .catch((error) => {
          
                //console.log("errores" ,error.response.data.errors[0].message)
                console.log(".cartch" , error.response)
            });
       }else{
        DialogUtility.alert({
          animationSettings: { effect: 'Zoom' },           
          content: "Estimado Usuario ,no es posible registrar mas Empresas, Puede Ampliar su paquete Contactándose con su ejecutivo de ADS",
          title: 'Aviso!',
          position: "fixed"
        });
       }  
        }
        }

        entrar  = (values) => {
          this.props.history.push("./loginEmpresas")
          localStorage.removeItem('elToken')  
          localStorage.removeItem('idASuperusuario')   
          localStorage.removeItem('idASuperusuario') 
          localStorage.removeItem('fechaRegistroSuperusuario')
        //  console.log("values", values.empresa)
        //     const url = 'http://localhost:8000/graphql'
        //     axios({
        //     url:  url,
        //     method:'post',
        //     data:{
        //     query:`
        //     query{
        //         getAdminDashboard(data:"${[values.empresa]}"){
        //             id
        //             nombre
        //             Apellidos
        //             RFC
        //             RazonSocial
        //             correo
        //             Activo
        //             fechaRegistro
        //             }
        //         }
        //         `
        //     }
        // })
        // .then(datos => {	
      	
        //      console.log("deptosExtraidas" , datos.data.data.getAdminDashboard)
        //      if(datos.data.data.getAdminDashboard){
        //        
                
               
        //     }


             
        // }).catch(err=>{
        //     console.log("este es el error get deptos" , err.response)
        // })
      }
      salir(){
        this.props.history.push("./login")
          localStorage.removeItem('elToken')  
          localStorage.removeItem('idASuperusuario')   
          localStorage.removeItem('idASuperusuario') 
          localStorage.removeItem('fechaRegistroSuperusuario')
      }

        countdown = (deadline) => {


            const timerUpdate = setInterval( () => {
              const licencia ="su licencia ha caducado"
              let t = this.getRemainingTime(deadline);
             this.setState ({dias:t.remainDays})
             this.setState ({horas:t.remainHours})
             this.setState ({minutos:t.remainMinutes})
             this.setState ({segundos:t.remainSeconds})
             this.setState({licencia:licencia})
              if(t.remainTime <= 1) {
                clearInterval(timerUpdate);
                const correo   = localStorage.getItem('idASuperusuario')
                console.log("entro")
                const url = 'http://localhost:8000/graphql'
                axios({
                  url:  url,
                  method:'post',
                  data:{
                  query:`
                   mutation{
                    inactiveAdmin(data:"${[correo]}"){
                        message
                          }
                        }
                      `
                  }
                      }).then((datos) => {
                     
                      }); 
              }else {
              this.setState({licencia:""})
          
              }
          
            }, 1000)
          };
          
          getRemainingTime = deadline => {
            let now = new Date(),
                remainTime = (new Date(deadline) - now + 1000) / 1000,
                remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
                remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
                remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
                remainDays = Math.floor(remainTime / (3600 * 24));
          
            return {
              remainSeconds,
              remainMinutes,
              remainHours,
              remainDays,
              remainTime
            }
          };
          
    

getRemainingTime = deadline => {
  let now = new Date(),
      remainTime = (new Date(deadline) - now + 1000) / 1000,
      remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
      remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
      remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
      remainDays = Math.floor(remainTime / (3600 * 24));

  return {
    remainSeconds,
    remainMinutes,
    remainHours,
    remainDays,
    remainTime
  }
};


validate = values => {
  const errors = {};
  const length = {} 
  if (!values.Nombre) {
    errors.Nombre = 'Este campo es requerido';
  }
  if (!values.Apellidos) {
    errors.Apellidos = 'Este campo es requerido';
  }
  if (!values.rfc) {
    errors.rfc = 'Este campo es requerido';
  }
  if (!values.RazonSocial) {
    errors.RazonSocial = 'Este campo es requerido';
  }
  if (!values.correo) {
    errors.correo = 'Este campo es requerido';
  }
  
  if (!values.contraseña) {
    errors.contraseña = 'Este campo es Requerido';
  }
  return errors;
  };

  toggle =  (nr,id,rs) => () => {
    const url = 'http://localhost:8000/graphql'
     axios({
      url:  url,
      method:'post',
      data:{
      query:`
       query{
        countEmployees(data:"${[id]}"){
            id
              }
            }
          `
      }
          }).then((datos) => {  
         this.setState({totalEmpledosRegistrados:datos.data.data.countEmployees[0].id})
          }); 
    console.log("id",rs)
    this.setState({rs:rs})
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }
  

  render() {
    let modal;
    if(this.state.modal11){
  
  
        modal  =  <MDBContainer >
        <MDBModal isOpen={this.state.modal11} toggle={this.toggle(11)  } size="lg">
          <MDBModalHeader toggle={this.toggle(11)}>
            Detalles Generales de la Empresa
          </MDBModalHeader>
          <MDBModalBody>
          <TableContainer component={Paper} align="center">
       <Table  aria-label="simple table" style={{width:650}}>
         <TableHead>
           <TableRow>
    <TableCell align="left">Razón Social :  {this.state.rs}</TableCell>
             <TableCell align="left">Empleados Registrados : {this.state.totalEmpledosRegistrados} </TableCell>    
           </TableRow>         
         </TableHead>
         <TableBody>
         <TableRow>
    <TableCell align="left">Empleados por Registrar : {this.state.empleadosPack-this.state.totalEmpledosRegistrados}</TableCell>
           <TableCell align="left">Periodos : </TableCell>   
           </TableRow>
           <TableRow>
           <TableCell align="left">Evaluaciones ATS Contestadas : </TableCell>
             <TableCell align="left">Evaluaciones RP Contestadas</TableCell>
           </TableRow>
         <TableRow>
         <TableCell align="left">Evaluaciones EEO Contestadas</TableCell>
             <TableCell align="left">ATS Detectado : </TableCell>    
           </TableRow>
           <TableRow>
           <TableCell align="left">Departamentos Totales : </TableCell>
             <TableCell align="left">Puestos Totales : </TableCell>
           </TableRow>
           <TableRow>
           <TableCell align="left">Centros de Trabajo Registrados :</TableCell>

           </TableRow>
          {/* {this.state.empleadosEEO.map(row => (
             <TableRow key={row.id}>
               <TableCell component="th" scope="row">
                 {row.nombre}
               </TableCell>
               <TableCell align="center">{row.ApellidoP}</TableCell>
               <TableCell align="center">{row.ApellidoM}</TableCell>
               <TableCell align="center">{row.correo}</TableCell>
              
             </TableRow>
             ))} */}
         </TableBody>
       </Table>
     </TableContainer>
          </MDBModalBody>   
        </MDBModal>
      </MDBContainer>

  
     }
  

   let empresasRegistradas;
   let empresasPaquete;
   empresasRegistradas = this.state.empresa.length;
   empresasPaquete  =  this.state.noEmpresas
    let detalles;
if(this.state.datosEmpresas =='1'){
  detalles= <Paper variant = {"elevation"} square={false}>
  <Table bordered>

    <TableBody>
      {this.state.empresa.map(rows => {

        return (
          <TableRow >
            <TableCell component="th" scope="row">
              {rows.id}
            </TableCell>
            <TableCell >{rows.RazonSocial}</TableCell>
            <TableCell  ><MDBBtn  color ="primary" onClick={this.toggle(11,rows.id,rows.RazonSocial) }>Detalles</MDBBtn></TableCell>
          </TableRow>         
        );
      })}
    </TableBody>


      </Table>
      </Paper>
}

    let expiro;
    if(this.state.licencia){

      expiro = <Alert color="danger" className="text-center ">{this.state.licencia}</Alert>

    }
    let registro;  
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.handleTogglerClick}
      />
    );
    if(this.state.registro=="1"){
        registro= <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
		<Form
		  onSubmit={this.onSubmit}
		  
		  validate={this.validate}
		  render={({ handleSubmit, submitting,values }) => (
			<form onSubmit={handleSubmit}>
			  <Paper style={{ padding: 16 }}>
				<Grid container alignItems="flex-start" spacing={2}>
				  <Grid item xs={6}>
					<Field
					  fullWidth
					  required
					  name="Nombre"
					  component={TextField}
					  type="text"
					  label="Nombre/Representante"
					/>
				  </Grid>
  
				  <Grid item xs={6}>
					<Field
					  fullWidth
					  required
					  name="Apellidos"
					  component={TextField}
					  type="text"
					  label="Apellidos"
					/>
				  </Grid>
  
			
				  <Grid item xs={6}>
					<Field
					
					  fullWidth
					  required
					  name="rfc"
					  component={TextField}
					  type="text"
					  label="RFC / Empresa"
					/>
				  </Grid>
  
				  <Grid item xs={6}>
					<Field
					  fullWidth
					  required
					  name="RazonSocial"
					  component={TextField}
					  type="text"
					  label="Razón Social"
					/>
				  </Grid>
                  
				  <Grid item xs={6}>
					<Field
					  fullWidth
					  required
					  name="correo"
					  component={TextField}
					  type="email"
					  label="Correo"
					/>
				  </Grid>
          <Grid item xs={6}>
					<Field
					  fullWidth
					  required
					  name="contraseña"
					  component={TextField}
					  type="password"
					  label="contraseña"
					/>
				  </Grid>
                 
				  <Grid item style={{ marginTop: 16 ,marginLeft:100 }}>
					<Button
					 variant="outlined"
					  color="secondary"
					  type="submit"
					  disabled={submitting}
					  onClick={(e) =>this.evaluar(values)}
					>
					  Registrar Empresa
					</Button>
				  </Grid>
				</Grid>
			  </Paper>
			 
			</form>
		  )}
		/>
	  </div>

    }

    return ( 
        <React.Fragment>
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
                  <strong className="white-text">Empresas</strong>
                </MDBNavbarBrand>
     
              </MDBContainer>
            </MDBNavbar>
            {this.state.collapsed && overlay}
          </div>
        </Router>
        
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
               
              
                <MDBCol md="6" className="mb-8 mt-xl-5 " >
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <MDBCard id="classic-card" style={{marginTop:18}} >
                     <MDBCardHeader> <strong >Su Licencia caduca en {this.state.dias} Dias  {this.state.horas} horas {this.state.minutos} minutos {this.state.segundos} segundos</strong> {expiro} </MDBCardHeader> 
                      <MDBCardBody className="white-text">
                        <h3 className="text-center">
                             Por favor Seleccione su Empresa
                        </h3>
                     
                        <hr className="hr-light" />


                        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
                            <Form
                            onSubmit={this.onSubmit}
                            
                            validate={this.validate}
                            render={({ handleSubmit, submitting,values }) => (
                                <form onSubmit={handleSubmit}>
                                <Paper style={{ padding: 16 }}>
                                    <Grid container alignItems="flex-start" spacing={2}>
                                    
                                        <Grid item xs={12}>
                                        <Field
                                        fullWidth
                                        name="empresa"
                                        component={Select}
                                        label="Empresa"
                                        formControlProps={{ fullWidth: true }}
                                                                >
                                                {this.state.empresa.map(row=>{
                                                return(<MenuItem value={row.id}>{row.RazonSocial}</MenuItem>)
                                            })}
                                        </Field>
                                        </Grid>  
                                        

                                        <Grid item style={{ marginTop: 16  }}>
                                         <MDBRow>
                                         <MDBCol>
                                        <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                        onClick={(e) =>this.entrar(values)}
                                        >
                                            Entrar
                                        </Button>
                                        </MDBCol>   
                                        <MDBCol>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<AddCircleOutlineIcon />}
                                            onClick={e=>this.setState({registro:"1"})}
                                          
                                        >
                                            Agregar
                                        </Button>
                                        </MDBCol>
                                        <MDBCol>  <Button
                                        variant="contained"
                                        color="default"
                                        type="submit"
                                        onClick={(e) =>this.props.history.push("./login")}
                                        >
                                            Salir
                                        </Button></MDBCol>
                                        </MDBRow>   
				                        </Grid>   
                                    </Grid>
                                </Paper>                             
                                </form>
                            )}
                            />
                        </div>                   
                      </MDBCardBody>                
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
                <MDBCol md="8" xl="5" className="mt-xl-5  pt-5">                          
                {registro}
                </MDBCol>
                </MDBRow>
                <MDBRow>
                <MDBCol>
                <div className="donut">
                <Chart
                  options={{
                    labels:["disponible","ocupado"],
                    chart: {
                      events: {
                        dataPointSelection: (event, chartContext, config) => {
                          var index = config.dataPointIndex;
                          var empresa = config.w.config.labels[index]
                          if(empresa=="ocupado"){
                            this.setState({datosEmpresas:'1'})
                          }
                        console.log(empresa)
                        }
                      }
                    },
                    theme: {
                      monochrome: {
                        enabled: false
                      }
                    },
                    responsive: [
                      {
                        breakpoint: 100,
                        options: {
                          chart: {
                            width: "100%"
                          },
                          legend: {
                            show: false
                          }
                        }
                      }
                    ]
                  }}
                  colors={["#1B2260"]}
                  series={[empresasPaquete-empresasRegistradas,empresasRegistradas]}
                  // labels={["Apple", "Mango", "Orange", "Watermelon"]}
                  type="donut"
                  width="500"
                />
             </div>
                  </MDBCol>  
                  <MDBCol>
                  {detalles}

                  </MDBCol>
                
                    </MDBRow>
               
            </MDBContainer>
          </MDBMask>
        </MDBView>
        { modal }
      </div>

      </React.Fragment>
                 )
  
 
    
  }
}

export default Validation1;