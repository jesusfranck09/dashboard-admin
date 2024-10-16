import React from 'react'
import {Grid} from '@material-ui/core';
import axios from 'axios';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { API} from '../utils/http'
import Navbar from './navbar'
import './index.css'
import {Card,Button,Modal}  from 'antd'

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
            isModalVisible2:false,
            puesto: '',
            departamento: '',
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
        evaluar  = () =>{
          const puesto = this.state.puesto.replace(/,/g, "");
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

        evaluarDepto  = () =>{
          const departamento = this.state.departamento.replace(/,/g, "");
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

        handleChange = (e) => {
          this.setState({ [e.target.name]: e.target.value });
        };
        handleChange2 = (e) => {
          this.setState({ [e.target.name]: e.target.value });
        };
        
        
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
            <Card className="styledCard" title={<h6><strong>Registrar Puestos y Departamentos</strong></h6>} extra={
            <div>
              <Button type="dashed" className="departamentoButton" onClick={e => this.showModal()}>
                Departamentos&nbsp;&nbsp;<i className="fas fa-laptop"></i>
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="dashed" className="puestoButton" onClick={e => this.showModal2()}>
                Puestos &nbsp;&nbsp;<i className="fas fa-briefcase"></i>
              </Button>
            </div>
          }>
            <Card title={<strong>Ingrese el Puesto a Registrar</strong>} className="inputCard">
              <form>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <input
                      required
                      type="text"
                      name="puesto"
                      value={this.state.puesto}
                      onChange={this.handleChange}
                      placeholder="Nuevo Puesto"
                      className="inputField"
                    />
                  </Grid>
                </Grid>
              </form>
              <button
                className="registerButton"
                onClick={e => this.evaluar()}
              >
                Registrar Puesto
              </button>
            </Card>

            <Card title={<strong>Ingrese el Departamento a Registrar</strong>} className="inputCard">
              <form onSubmit={this.handleSubmit}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <input
                      required
                      type="text"
                      name="departamento"
                      value={this.state.departamento}
                      onChange={this.handleChange2}
                      placeholder="Nuevo Departamento"
                      className="inputField"
                    />
                  </Grid>
                </Grid>
              </form>
              <button
                className="registerButton"
                onClick={e => this.evaluarDepto()}
              >
                Registrar Departamento
              </button>
            </Card>
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