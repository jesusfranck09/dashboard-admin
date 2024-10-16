import React from 'react'
import {
  Grid,
  } from '@material-ui/core';
  import { API} from '../utils/http'
import axios from 'axios';
import { DialogUtility } from '@syncfusion/ej2-popups';
import Navbar from './navbar'
import {Card,Alert,Button,Modal} from 'antd'

import './index.css'

    class Sucursales extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          collapse: false,
          datos:[],
          datosSucursales:[],
          isModalVisible:false,
          nombre: '',
          calle: '',
          numExt: '',
          numInt: '',
          telefono: '',
          colonia: '',
          cp: '',
          city: '',
          estado: '',
          actividad: '',
          actividades: ''
          
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
            getSucursales(data:"${correo}"){
              id
              nombreSucursal
              calle
              numExt
              numInt
              colonia
              CP
              Ciudad
              Estado
              actividad
              telefono
              actividades
              fk_administrador
                }
              }
              `
          }
          }).then((datos) => {
            this.setState({ datosSucursales: datos.data.data.getSucursales});
          }).catch((error) => {
            console.log(".cartch" , error)
         });  
      }

      evaluar  = () =>{
        const Nombre = this.state.nombre;
        const calle = this.state.calle.replace(/,/g, "");
        const NumExt = this.state.numExt;
        const numInt = this.state.numInt;
        const colonia = this.state.colonia.replace(/,/g, "");
        const cp = this.state.cp;
        const city = this.state.city.replace(/,/g, "");
        const estado = this.state.estado.replace(/,/g, "");
        const actividad = this.state.actividad.replace(/,/g, "");
        const telefono = this.state.telefono;
        const actividades = this.state.actividades.replace(/,/g, "");

        
        console.log({
          Nombre,
          calle,
          NumExt,
          numInt,
          colonia,
          cp,
          city,
          estado,
          actividad,
          telefono,
          actividades,
        });
        
        const correo = localStorage.getItem('correo')
        if(Nombre && calle && numInt && NumExt && colonia && cp && city && estado && actividad && telefono && actividades){
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
               mutation{
                registerSucursales(data:"${[Nombre,calle,NumExt,numInt,colonia,cp,city,estado,actividad,telefono,actividades,correo]}"){
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
                content: 'Centro de trabajo Registrado con Éxito!',
                position: "fixed",
              
            })
             this.props.history.push("/adminGral")
            });       
           } else{
            DialogUtility.alert({
                animationSettings: { effect: 'Fade' },           
                title:'Aviso',
                content: 'Debe Completar todos los Campos!',
                position: "fixed",
              })
           }
        }
        showModal = () => {
          this.setState({isModalVisible:true});
        };
      
         handleOk = () => {
          this.setState({isModalVisible:false});
        };
      
         handleCancel = () => {
          this.setState({isModalVisible:false});
        };
        handleChange = (event) => {
          const { name, value } = event.target;
          this.setState({ [name]: value });
        };
        
      
      render() {  
        let datosSucursales = 
        <Modal okText="Aceptar" cancelText="Cerrar" title={<h6><strong>Centros de trabajo registrados</strong></h6>} visible={this.state.isModalVisible} onOk={e=>this.handleOk()} onCancel={e=>this.handleCancel()}>
        <table className = "table table-striped table-bordered table-small ">
          <tr>
            <td><strong>Centro de trabajo</strong></td>
            <td><strong>Ciudad</strong></td>
          </tr>
          {this.state.datosSucursales.map(rows=>{
            if(rows){
              return(
                <tr>
                  <td>{rows.nombreSucursal}</td>
                  <td>{rows.Ciudad}</td>
                </tr>
              )
            }
          })}
        </table>
      </Modal>

        return (
          <React.Fragment>
          <div>
          <Navbar modulo = {"CENTROS DE TRABAJO"}/>
          <center>
          <Card style={{padding:"10px"}}  className="cardCentros" title = {<h6><strong>Registrar centros de trabajo</strong></h6>} extra={<Button  type = "dashed" style={{backgroundColor:"azure"}} onClick={e=> this.showModal()}>Centros de trabajo &nbsp;&nbsp;<i class="far fa-building"></i></Button>}>  
               <div style={{ padding: 16, margin: 'auto'}}>
               <form onSubmit={this.handleSubmit}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <input
                    required
                    name="nombre"
                    type="text"
                    placeholder="Centro de trabajo"
                    value={this.state.centroTrabajo}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                  <strong>
                    <Alert message="Datos generales" type="success" />
                  </strong>
                </Grid>
                <Grid item xs={6}>
                  <input
                    required
                    name="calle"
                    type="text"
                    placeholder="Calle"
                    value={this.state.calle}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <input
                    required
                    name="numExt"
                    type="number"
                    placeholder="Número Exterior"
                    value={this.state.numExt}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <input
                    required
                    name="numInt"
                    type="number"
                    placeholder="Número Interior / ejemplo. 0"
                    value={this.state.numInt}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <input
                    required
                    name="telefono"
                    type="number"
                    placeholder="Teléfono"
                    value={this.state.telefono}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <input
                    required
                    name="colonia"
                    type="text"
                    placeholder="Colonia"
                    value={this.state.colonia}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <input
                    required
                    name="cp"
                    type="number"
                    placeholder="Código Postal"
                    value={this.state.cp}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <input
                    required
                    name="city"
                    type="text"
                    placeholder="Ciudad"
                    value={this.state.ciudad}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <select
                    required
                    name="estado"
                    value={this.state.estado}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  >
                    <option value="">Selecciona un estado</option>
                    <option value="Aguascalientes">Aguascalientes</option>
                    <option value="Baja California">Baja California</option>
                    <option value="Baja California Sur">Baja California Sur</option>
                    <option value="Campeche">Campeche</option>
                    <option value="Chiapas">Chiapas</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Ciudad de México">Ciudad de México</option>
                    <option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>
                    <option value="Durango">Durango</option>
                    <option value="Estado de México">Estado de México</option>
                    <option value="Guanajuato">Guanajuato</option>
                    <option value="Guerrero">Guerrero</option>
                    <option value="Hidalgo">Hidalgo</option>
                    <option value="Jalisco">Jalisco</option>
                    <option value="Michoacán de Ocampo">Michoacán de Ocampo</option>
                    <option value="Morelos">Morelos</option>
                    <option value="Nayarit">Nayarit</option>
                    <option value="Nuevo León">Nuevo León</option>
                    <option value="Oaxaca">Oaxaca</option>
                    <option value="Puebla">Puebla</option>
                    <option value="Querétaro">Querétaro</option>
                    <option value="Quintana Roo">Quintana Roo</option>
                    <option value="San Luis Potosí">San Luis Potosí</option>
                    <option value="Sin Localidad">Sin Localidad</option>
                    <option value="Sonora">Sonora</option>
                    <option value="Tabasco">Tabasco</option>
                    <option value="Tamaulipas">Tamaulipas</option>
                    <option value="Tlaxcala">Tlaxcala</option>
                    <option value="Veracruz de Ignacio de la Llave">Veracruz de Ignacio de la Llave</option>
                    <option value="Yucatán">Yucatán</option>
                    <option value="Zacatecas">Zacatecas</option>
                  </select>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                  <strong>
                    <Alert message="Actividades de la empresa" type="info" />
                  </strong>
                  <input
                    required
                    name="actividad"
                    type="text"
                    placeholder="Actividad Principal"
                    value={this.state.actividad}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    required
                    name="actividades"
                    type="text"
                    placeholder="Principales actividades realizadas en el centro de trabajo"
                    value={this.state.actividades}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
              
            </form>
            <center>
                <button
                  style={{ marginTop: "5%" }}
                  type="submit"
                  onClick={e=>this.evaluar()}
                  className="text-white"
                >
                  Registrar Centro de Trabajo
                </button>
              </center>
              </div>
          </Card>    
          </center>
          {datosSucursales}
          </div>           
          </React.Fragment>
        );
      }
    }
    export default Sucursales