
import React from 'react';
import { MDBBtn,MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol ,MDBRow} from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
const container = { width: 1500, height: 800 }
const redireccionar = () => {
 console.log("estoy redireccionando")
 this.props.history.push("/inicio")
}
const CardExample = () => {
  return (
    <MDBContainer style={container} className="text-center">
    <MDBCol>
        <Paper style={{marginTop:20}}>
       <MDBRow>    
       <MDBCol> 
              
      <MDBCard  component = {Paper} style={{width:"30rem",marginTop:10,marginLeft:5,height:"40rem"}} >
        <MDBCardImage className="img-fluid" src="https://images.pexels.com/photos/316465/pexels-photo-316465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" waves />
        <MDBCardBody>
          <MDBCardTitle>PAQUETES</MDBCardTitle>
          <MDBCardText>
          Por favor seleccione el paquete a Registrar
          </MDBCardText>
         
        </MDBCardBody>
      </MDBCard>
      </MDBCol> 
      <MDBCol>

      <MDBCard style={{width:"30rem",marginTop:10,marginLeft:5}} >
       
        <MDBCardBody>
        <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="outlined"
      >
        <Button style={{marginBottom:5}} onClick= {redireccionar}>1 a 15 Empleados</Button>
        <Button style={{marginBottom:5}}>16 a 50 Empleados</Button>
        <Button style={{marginBottom:5}}>50 a 100 Empleados</Button>

      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        color="default"
        aria-label="vertical contained secondary button group"
        variant="outlined"
      >
        <Button  style={{marginLeft:5,marginBottom:5}}>1 RFC</Button>
        <Button style={{marginLeft:5,marginBottom:5}}>1 RFC</Button>
        <Button style={{marginLeft:5,marginBottom:5}}>1 RFC</Button>

      </ButtonGroup>
        </MDBCardBody>
      </MDBCard> 
      <MDBCard style={{width:"30rem",marginTop:5,marginLeft:5}} >
       
       <MDBCardBody>
       <ButtonGroup
       orientation="vertical"
       color="primary"
       aria-label="vertical contained primary button group"
       variant="outlined"
     >
       <Button style={{marginBottom:5}}>1 a 15 Empleados</Button>
       <Button style={{marginBottom:5}}>16 a 50 Empleados</Button>
       <Button style={{marginBottom:5}}>50 a 100 Empleados</Button>
 
     </ButtonGroup>
     <ButtonGroup
       orientation="vertical"
       color="default"
       aria-label="vertical contained secondary button group"
       variant="outlined"
     >
       <Button  style={{marginLeft:5,marginBottom:5}}>3 RFC</Button>
       <Button style={{marginLeft:5,marginBottom:5}}>3 RFC</Button>
       <Button style={{marginLeft:5,marginBottom:5}}>3 RFC</Button>
   
     </ButtonGroup>
       </MDBCardBody>
     </MDBCard> 
     <MDBCard style={{width:"30rem",marginTop:5,marginLeft:5}} >
       
       <MDBCardBody>
       <ButtonGroup
       orientation="vertical"
       color="primary"
       aria-label="vertical contained primary button group"
       variant="outlined"
     >
       <Button style={{marginBottom:5}}>1 a 15 Empleados</Button>
       <Button style={{marginBottom:5}}>16 a 50 Empleados</Button>
       <Button style={{marginBottom:5}}>50 a 100 Empleados</Button>

     </ButtonGroup>
     <ButtonGroup
       orientation="vertical"
       color="default"
       aria-label="vertical contained secondary button group"
       variant="outlined"
     >
       <Button  style={{marginLeft:5,marginBottom:5}}>5 RFC</Button>
       <Button style={{marginLeft:5,marginBottom:5}}>5 RFC</Button>
       <Button style={{marginLeft:5,marginBottom:5}}>5 RFC</Button>

     </ButtonGroup>
       </MDBCardBody>
     </MDBCard> 
     <MDBCard style={{width:"30rem",marginTop:5,marginLeft:5}} >
       
       <MDBCardBody>
       <ButtonGroup
       orientation="vertical"
       color="primary"
       aria-label="vertical contained primary button group"
       variant="outlined"
     >
       <Button style={{marginBottom:5}}>1 a 15 Empleados</Button>
       <Button style={{marginBottom:5}}>16 a 50 Empleados</Button>
       <Button style={{marginBottom:5}}>50 a 100 Empleados</Button>

     </ButtonGroup>
     <ButtonGroup
       orientation="vertical"
       color="default"
       aria-label="vertical contained secondary button group"
       variant="outlined"
     >
       <Button  style={{marginLeft:5,marginBottom:5}}>10 RFC</Button>
       <Button style={{marginLeft:5,marginBottom:5}}>10 RFC</Button>
       <Button style={{marginLeft:5,marginBottom:5}}>10 RFC</Button>

     </ButtonGroup>
       </MDBCardBody>
     </MDBCard> 
      </MDBCol>
      </MDBRow> 
      </Paper>
    </MDBCol>
    </MDBContainer>
  )
}

export default CardExample;