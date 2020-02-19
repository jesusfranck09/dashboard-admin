
import React from 'react';
import { MDBBtn,MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol ,MDBRow} from 'mdbreact';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios';

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

      <MDBCard style={{width:"30rem",marginTop:10}} >
       
        <MDBCardBody>
        <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="outlined"
      >
        <Button style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(1)} }>1 a 15 Empleados</Button>
        <Button style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(2)} }>16 a 50 Empleados</Button>
        <Button style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(3)} }>50 a 100 Empleados</Button>

      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        color="default"
        aria-label="vertical contained secondary button group"
        variant="outlined"
      >
        <Button  style={{marginBottom:5}}>1 RFC</Button>
        <Button style={{marginBottom:5}}>1 RFC</Button>
        <Button style={{marginBottom:5}}>1 RFC</Button>

      </ButtonGroup>
        </MDBCardBody>
      </MDBCard> 
      <MDBCard style={{width:"30rem",marginTop:1,marginLeft:5}} >
       
       <MDBCardBody>
       <ButtonGroup
       orientation="vertical"
       color="primary"
       aria-label="vertical contained primary button group"
       variant="outlined"
     >
       <Button style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(4)} }>1 a 15 Empleados</Button>
       <Button style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(5)} }>16 a 50 Empleados</Button>
       <Button style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(6)} }>50 a 100 Empleados</Button>
 
     </ButtonGroup>
     <ButtonGroup
       orientation="vertical"
       color="default"
       aria-label="vertical contained secondary button group"
       variant="outlined"
     >
       <Button  style={{marginBottom:5}}>3 RFC</Button>
       <Button style={{marginBottom:5}}>3 RFC</Button>
       <Button style={{marginBottom:5}}>3 RFC</Button>
   
     </ButtonGroup>
       </MDBCardBody>
     </MDBCard> 
     <MDBCard style={{width:"30rem",marginTop:1,marginLeft:5}} >
       
       <MDBCardBody>
       <ButtonGroup
       orientation="vertical"
       color="primary"
       aria-label="vertical contained primary button group"
       variant="outlined"
     >
       <Button style={{marginBottom:5}}  onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(7)} }>1 a 15 Empleados</Button>
       <Button style={{marginBottom:5}}  onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(8)} }>16 a 50 Empleados</Button>
       <Button style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(9)} } >51  a 100 Empleados</Button>

     </ButtonGroup>
     <ButtonGroup
       orientation="vertical"
       color="default"
       aria-label="vertical contained secondary button group"
       variant="outlined"
     >
       <Button  style={{marginBottom:5}}>5 RFC</Button>
       <Button style={{marginBottom:5}}>5 RFC</Button>
       <Button style={{marginBottom:5}}>5 RFC</Button>

     </ButtonGroup>
       </MDBCardBody>
     </MDBCard> 
     <MDBCard style={{width:"30rem",marginTop:1,marginLeft:5}} >
       
       <MDBCardBody>
       <ButtonGroup
       orientation="vertical"
       color="primary"
       aria-label="vertical contained primary button group"
       variant="outlined"
     >
       <Button style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(10)} }>1 a 15 Empleados</Button>
       <Button style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(11)} }>16 a 50 Empleados</Button>
       <Button style={{marginBottom:5}} onClick={(e) => { if (window.confirm('¿Esta seguro de Registrar este Paquete?,No podrá Retroceder')) this.send(12)} }>50 a 100 Empleados</Button>

     </ButtonGroup>
     <ButtonGroup
       orientation="vertical"
       color="default"
       aria-label="vertical contained secondary button group"
       variant="outlined"
     >
       <Button  style={{marginBottom:5}}>10 RFC</Button>
       <Button style={{marginBottom:5}}>10 RFC</Button>
       <Button style={{marginBottom:5}}>10 RFC</Button>

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

}

export default Paquetes;