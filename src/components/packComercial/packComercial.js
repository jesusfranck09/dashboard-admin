
import React from 'react';
import { MDBBtn,MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol ,MDBRow} from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';
import logo from '../images/logotipo.png'
import png from '../images/png.png'
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBMask,
  MDBView,

} from "mdbreact";
import { AppNavbarBrand } from '@coreui/react';

const container = { width: 1500, height: 800 }

class Paquetes extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          email: '',
          password: '',
      
      }
    }
 send(values){
  localStorage.setItem("paquete" , values)
    const url = 'http://localhost:8000/graphql'
    axios({
      url:  url,
      method:'post',
      data:{
      query:`
      mutation{
              insertPack(data:"${[values]}"){
              id
              }
            }
          `
      }
    })
    .then(datos => {	
      console.log("exito",datos.data.data.insertPack.id)
    localStorage.setItem("idRegistro" , datos.data.data.insertPack.id )
    this.props.history.push("/signUp")
    }).catch(err=>{
      console.log("error",err.response)
    })
 }   
render(){
  const container = { marginLeft:20}
  const overlay = (
    <div
      id="sidenav-overlay"
      style={{ backgroundColor: "transparent" }}
      onClick={this.handleTogglerClick}
    />
  );
  return (
    <React.Fragment>
     <div id="apppage">
       
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

              </MDBContainer>
            </MDBNavbar>
            {this.state.collapsed && overlay}
          </div>

        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer style={{marginTop:60}}>
            <MDBCol>
                <Paper style={{marginTop:20}}>
              <MDBRow>    
              <MDBCol> 

              <MDBCard style={{width:"30rem",marginTop:10,marginLeft:15}} >
              
              <MDBCardBody>
              <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained primary button group"
              
            >
              <MDBBtn  color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(1)} }>1 a 15 Empleados</MDBBtn>
              <MDBBtn  color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(2)} }>16 a 50 Empleados</MDBBtn>
              <MDBBtn  color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(3)} }>51 a 100 Empleados</MDBBtn>
              <MDBBtn  color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(4)} }>101 a 200 Empleados</MDBBtn>

            </ButtonGroup>
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained secondary button group"
              color="default"
              variant="outlined"
            >
              <MDBBtn  style={{marginBottom:5}}>1 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>1 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>1 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>1 RFC</MDBBtn>

            </ButtonGroup>
              </MDBCardBody>
            </MDBCard> 
            <MDBCard style={{width:"30rem",marginTop:1,marginLeft:15}} >
              
              <MDBCardBody>
              <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained primary button group"
            >
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(5)} }>1 a 15 Empleados</MDBBtn>
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(6)} }>16 a 50 Empleados</MDBBtn>
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(7)} }>51 a 100 Empleados</MDBBtn>
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(8)} }>101 a 200 Empleados</MDBBtn>

            </ButtonGroup>
            <ButtonGroup
              orientation="vertical"
              color="default"
              aria-label="vertical contained secondary button group"
              variant="outlined"
            >
              <MDBBtn  style={{marginBottom:5}}>3 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>3 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>3 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>3 RFC</MDBBtn>
            </ButtonGroup>
              </MDBCardBody>
            </MDBCard>
            <MDBCard style={{width:"30rem",marginTop:10,marginLeft:15}} ><img src={png} alt="png" /></MDBCard>
            
              </MDBCol> 
              <MDBCol>

              
            <MDBCard style={{width:"30rem",marginTop:10,marginLeft:5}} >
              
              <MDBCardBody>
              <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained primary button group"
              
            >
              <MDBBtn color="primary"  style={{marginBottom:5}}  onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(9)} }>1 a 15 Empleados</MDBBtn>
              <MDBBtn color="primary"  style={{marginBottom:5}}  onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(10)} }>16 a 50 Empleados</MDBBtn>
              <MDBBtn color="primary"  style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(11)} } >51  a 100 Empleados</MDBBtn>
              <MDBBtn color="primary"  style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(12)} } >101  a 200 Empleados</MDBBtn>

            </ButtonGroup>
            <ButtonGroup
              orientation="vertical"
              color="default"
              aria-label="vertical contained secondary button group"
              variant="outlined"
            >
              <MDBBtn  style={{marginBottom:5}}>5 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>5 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>5 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>5 RFC</MDBBtn>
            </ButtonGroup>
              </MDBCardBody>
            </MDBCard> 
            <MDBCard style={{width:"30rem",marginTop:1,marginLeft:5}} >
              
              <MDBCardBody>
              <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained primary button group"
            >
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(13)} }>1 a 15 Empleados</MDBBtn>
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(14)} }>16 a 50 Empleados</MDBBtn>
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(15)} }>51 a 100 Empleados</MDBBtn>
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(16)} }>101 a 200 Empleados</MDBBtn>

            </ButtonGroup>
            <ButtonGroup
              orientation="vertical"
              color="default"
              aria-label="vertical contained secondary button group"
              variant="outlined"
            >
              <MDBBtn  style={{marginBottom:5}}>10 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>10 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>10 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>10 RFC</MDBBtn>
            </ButtonGroup>
              </MDBCardBody>
            </MDBCard> 
            <MDBCard style={{width:"30rem",marginTop:1,marginLeft:5}} >
              
              <MDBCardBody>
              <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained primary button group"
            >
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(17)} }>1 a 15 Empleados</MDBBtn>
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(18)} }>16 a 50 Empleados</MDBBtn>
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(19)} }>51 a 100 Empleados</MDBBtn>
              <MDBBtn color="primary" style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(20)} }>101 a 200 Empleados</MDBBtn>

            </ButtonGroup>
            <ButtonGroup
              orientation="vertical"
              color="default"
              aria-label="vertical contained secondary button group"
              variant="outlined"
            >
              <MDBBtn  style={{marginBottom:5}}>20 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>20 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>20 RFC</MDBBtn>
              <MDBBtn style={{marginBottom:5}}>20 RFC</MDBBtn>
            </ButtonGroup>
              </MDBCardBody>
            </MDBCard>
              </MDBCol>
              </MDBRow> 
              </Paper>
            </MDBCol>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    <MDBContainer style={container} className="text-center">
   
    </MDBContainer>
    </React.Fragment>
  )
}

}

export default Paquetes;