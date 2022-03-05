import React from 'react'
import {Grid} from '@material-ui/core';
import axios from 'axios';
import { Form, Field } from 'react-final-form';
import { TextField} from 'final-form-material-ui';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { API} from '../utils/http'
import Navbar from './navbar'
import './index.css'
import {Card,Button,Modal}  from 'antd'
 function onSubmit (values) { 
	};

	const validate = values => {
        const errors = {};
        if (!values.puesto) {
          errors.puesto = 'Este campo es requerido';
        }
        return errors;
      };

      const validateDepto = values => {
        const errors = {};
        if (!values.departamento) {
          errors.departamento = 'Este campo es requerido';
        }  
        return errors;
      };

      class Sucursales extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            collapse: false,
            datos:[],
            datosDepto:[],
            datosDeptos:[],
            datosPuestos:[],
            isModalVisible:false,
            isModalVisible2:false
          };          
        }
        onClick() {
          this.setState({
            collapse: !this.state.collapse,
          });
        }

        componentWillMount(){
          let correo = localStorage.getItem("correo")
           axios({
            url:  API,
            method:'post',
            data:{
            query:`
            query{
              getDeptos(data:"${correo}"){
                id
                nombre
                fk_Administrador                 
                  }
                }
                `
            }
            }).then((datos) => {
                this.setState({ datosDeptos: datos.data.data.getDeptos});
            }).catch((error) => {
              console.log(".cartch" , error.response)
            });  
             axios({
              url:  API,
              method:'post',
              data:{
              query:`
              query{
                getPuestos(data:"${correo}"){
                  id
                  nombre
                  fk_Administrador                 
                    }
                  }
                  `
              }
              }).then((datos) => {
                  this.setState({ datosPuestos: datos.data.data.getPuestos});
              }).catch((error) => {
                  console.log(".cartch" , error.response)
              });   
        }
        evaluar  = (values) =>{
          const puesto = values.puesto.replace(/,/g, "");
          const correo = localStorage.getItem('correo')
          if(puesto){
              axios({
                url:  API,
                method:'post',
                data:{
                query:`
                 mutation{
                  registerPuesto(data:"${[puesto,correo]}"){
                      message
                        }
                      }
                    `
                }
              })
              .then(datos => {		
              localStorage.setItem("ok",1)
              DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },           
                  title:'Aviso',
                  content: 'Nuevo Puesto registrado!',
                  position: "fixed",
                }
                )
               this.props.history.push("/adminGral")
              });    
          } else{
              DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },           
                  title:'Aviso',
                  content: 'Por favor complete el Campo!',
                  position: "fixed",
                
                }
                )
          }
        }

        evaluarDepto  = (values) =>{
          const departamento = values.departamento.replace(/,/g, "");
          const correo = localStorage.getItem('correo')
          if(departamento){
              axios({
                url:  API,
                method:'post',
                data:{
                query:`
                 mutation{
                  registerApartments(data:"${[departamento,correo]}"){
                      message
                        }
                      }
                    `
                }
              })
              .then(datos => {		
              localStorage.setItem("ok",1)
              DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },           
                  title:'Aviso',
                  content: 'Se agregó el Nuevo Departamento!',
                  position: "fixed",
                
                }
                )
                this.props.history.push("/adminGral")
              });    
             
          } else{
              DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },           
                  title:'Aviso',
                  content: 'Por favor complete el Campo!',
                  position: "fixed",
                })
          }
        }
        showModal(){
          this.setState({isModalVisible:true})
        }
        handleOk(){
          this.setState({isModalVisible:false})
        }
        handleCancel(){
          this.setState({isModalVisible:false})
        }
        showModal2(){
          this.setState({isModalVisible2:true})
        }
        handleOk2(){
          this.setState({isModalVisible2:false})
        }
        handleCancel2(){
          this.setState({isModalVisible2:false})
        }
        render() { 
          console.log("estado",this.state.datosPuestos)
          let datosDeptos = 
          <Modal okText="Aceptar" cancelText="Cerrar" title={<h6><strong>Departarmentos registrados</strong></h6>} visible={this.state.isModalVisible} onOk={e=>this.handleOk()} onCancel={e=>this.handleCancel()}>
          <table className = "table table-striped table-bordered table-small ">
            <tr>
              <td><strong>Id</strong></td>
              <td><strong>Departamento</strong></td>
            </tr>
            {this.state.datosDeptos.map(rows=>{
              if(rows){
                return(
                  <tr>
                    <td>{rows.id}</td>
                    <td>{rows.nombre}</td>
                  </tr>
                )
              }
            })}
          </table>
        </Modal>  
         let datosPuestos = 
         <Modal okText="Aceptar" cancelText="Cerrar" title={<h6><strong>Puestos registrados</strong></h6>} visible={this.state.isModalVisible2} onOk={e=>this.handleOk2()} onCancel={e=>this.handleCancel2()}>
         <table className = "table table-striped table-bordered table-small ">
           <tr>
             <td><strong>Id</strong></td>
             <td><strong>Puesto</strong></td>
           </tr>
           {this.state.datosPuestos.map(rows=>{
             if(rows){
               return(
                 <tr>
                   <td>{rows.id}</td>
                   <td>{rows.nombre}</td>
                 </tr>
               )
             }
           })}
         </table>
       </Modal>    
          return (
            <React.Fragment>
            <div>
            <Navbar modulo = {"PUESTOS Y DEPARTAMENTOS"}/>
            <center>             
            <Card style={{padding:"25px"}} className = "cardPuestosDeptos" title = {<h6><strong>Registrar puestos y departamentos</strong></h6>} extra = {<div><Button type = "dashed" style={{backgroundColor:"floralwhite"}} onClick={e=>this.showModal()}>Departamentos&nbsp;&nbsp;<i class="fas fa-laptop"></i></Button>&nbsp;&nbsp;&nbsp;<Button type = "dashed" style={{backgroundColor:"azure"}} onClick = {e=>this.showModal2()}>Puestos &nbsp;&nbsp;<i class="fas fa-briefcase"></i></Button></div>}>  
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                          <Card title={<strong>Ingrese el puesto a registrar</strong>}style={{padding:"20px"}} >
                          <Grid container alignItems="flex-start" spacing={2} >
                            <Grid item xs={6}>
                              <Field fullWidth required name="puesto" component={TextField} type="text" label="Nuevo Puesto"/>
                            </Grid>
                            <Grid item xs={6}>
                            <Button type="primary" style={{marginTop:"5%"}} disabled={submitting} onClick={(e) =>this.evaluar(values)} className="text-white" >Registrar</Button>
                            </Grid>
                          </Grid>
                          </Card>
                      </form>
                    )}
                  />
                    <Form
                      onSubmit={onSubmit}
                      validate={validateDepto}
                      render={({ handleSubmit, submitting,values }) => (
                        <form onSubmit={handleSubmit}>
                          <Card title={<strong>Ingrese el departamento a registrar</strong>}style={{padding:"20px"}}>
                            <Grid container alignItems="flex-start" spacing={2} >
                              <Grid item xs={6}>
                                <Field fullWidth required name="departamento" component={TextField} type="text" label="Nuevo Departamento"/>
                              </Grid>
                              <Grid item xs={6}>
                                <Button style={{marginTop:"5%"}} type="primary" disabled={submitting} onClick={(e) =>this.evaluarDepto(values)} className="text-white" >Registrar</Button>
                              </Grid>
                            </Grid>
                            </Card>    
                        </form>
                      )}
                    />
            </Card>   
            </center> 
            {datosDeptos}
            {datosPuestos}
            </div>
          </React.Fragment>
          );
        }
      }
      export default Sucursales