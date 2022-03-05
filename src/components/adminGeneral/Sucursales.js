  import React from 'react'
  import {
    Grid,
    MenuItem,
    } from '@material-ui/core';
    import { API} from '../utils/http'
  import axios from 'axios';
  import { Form, Field } from 'react-final-form';
  import { TextField, Select } from 'final-form-material-ui';
  import { DialogUtility } from '@syncfusion/ej2-popups';
  import Navbar from './navbar'
  import {Card,Alert,Button,Modal} from 'antd'

  import './index.css'

      function onSubmit (values) {
        };
	      const validate = values => {
          const errors = {};
          if (!values.Nombre) {
            errors.Nombre = 'Este campo es requerido';
          }
          if (!values.calle) {
            errors.calle = 'Este campo es requerido';
          }
          if (!values.NumExt) {
            errors.NumExt = 'Este campo es requerido';
          }
          if (!values.numInt) {
            errors.numInt = 'Este campo es requerido';
          }
          if (!values.colonia) {
            errors.colonia = 'Este campo es requerido';
          }
          if (!values.cp) {
            errors.cp = 'Este campo es requerido';
          }
          if (!values.city) {
            errors.city = 'Este campo es requerido';
          }
          if (!values.estado) {
            errors.estado = 'Required';
          }
          if (!values.RFC) {
            errors.RFC = 'Required';
          }
          if (!values.telefono) {
            errors.telefono = 'Required';
          }
          if (!values.actividades) {
            errors.actividades = 'Required';
          }      
        return errors;
      };

      class Sucursales extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            collapse: false,
            datos:[],
            datosSucursales:[],
            isModalVisible:false
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

        evaluar  = (values) =>{
          const Nombre = values.Nombre
          const calle = values.calle.replace(/,/g, "");
          const NumExt = values.NumExt
          const numInt = values.numInt
          const colonia =  values.colonia.replace(/,/g, "");
          const cp = values.cp
          const city= values.city.replace(/,/g, "");
          const estado = values.estado.replace(/,/g, "");
          const actividad = values.actividad.replace(/,/g, "");
          const telefono = values.telefono
          const actividades =  values.actividades.replace(/,/g, "");
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
                  <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, submitting,values }) => (
                      <form onSubmit={handleSubmit}>
                      <Grid container alignItems="flex-start" spacing={2} >
                        <Grid item xs={6}>
                          <Field fullWidth required name="Nombre" component={TextField} type="text" label="Centro de trabajo"/>
                        </Grid>                          
                        <Grid item xs={12} style ={{marginTop:20}}>
                        <strong><Alert message="Datos generales" type="success" ></Alert></strong>
                        </Grid>
                        <Grid item xs = {6}>
                        <Field fullWidth  required  name="calle" component={TextField} type="text" label="Calle"/>
                        </Grid>
                        <Grid item xs={6}>
                          <Field fullWidth required  name="NumExt" component={TextField} type="number" label="Número Exterior"/>
                        </Grid>
                        <Grid item xs={6}>
                          <Field fullWidth required name="numInt"component={TextField} type="number" label="Número Interior  /  ejemplo. 0"/>
                        </Grid>
                        <Grid item xs={6}>
                          <Field required fullWidth name="telefono" component={TextField} label="Teléfono" type = "number"></Field>
                        </Grid>
                        <Grid item xs={6}>
                          <Field fullWidth required name="colonia" component={TextField} type="text" label="Colonia"/>
                        </Grid>
                        <Grid item xs={6}>
                        <Field fullWidth required name="cp" component={TextField} type="number" label="Código Postal"/>
                          </Grid>
                        <Grid item xs={6}>
                          <Field required fullWidth name="city" component={TextField} label="Ciudad" type = "text" />                       
                        </Grid>
                        <Grid item xs={6}>
                          <Field required fullWidth name="estado" component={Select} label="Estado" formControlProps={{ fullWidth: true }}>
                          <MenuItem value=" Aguascalientes">Aguascalientes</MenuItem>
                          <MenuItem value=" Baja California">Baja California</MenuItem>
                          <MenuItem value=" Baja California Sur">Baja California Sur</MenuItem>
                          <MenuItem value=" Campeche">Campeche</MenuItem>
                          <MenuItem value=" Chiapas">Chiapas</MenuItem>
                          <MenuItem value=" Chihuahua">Chihuahua</MenuItem>
                          <MenuItem value=" Ciudad de México">Ciudad de México</MenuItem>
                          <MenuItem value=" Coahuila de Zaragoza">Coahuila de Zaragoza</MenuItem>
                          <MenuItem value=" Durango">Durango</MenuItem>
                          <MenuItem value=" Estado de México">Estado de México</MenuItem>
                          <MenuItem value=" Guanajuato">Guanajuato</MenuItem>
                          <MenuItem value=" Guerrero">Guerrero</MenuItem>
                          <MenuItem value=" Hidalgo">Hidalgo</MenuItem>
                          <MenuItem value=" Jalisco">Jalisco</MenuItem>
                          <MenuItem value=" Michoacán de Ocampo">Michoacán de Ocampo</MenuItem>
                          <MenuItem value=" Morelos">Morelos</MenuItem>
                          <MenuItem value=" Nayarit">Nayarit</MenuItem>
                          <MenuItem value=" Nuevo León">Nuevo León</MenuItem>
                          <MenuItem value=" Oaxaca">Oaxaca</MenuItem>
                          <MenuItem value=" Puebla">Puebla</MenuItem>
                          <MenuItem value=" Querétaro">Querétaro</MenuItem>
                          <MenuItem value=" Quintana Roo">Quintana Roo</MenuItem>
                          <MenuItem value=" San Luis Potosí">San Luis Potosí</MenuItem>
                          <MenuItem value=" Sin Localidad">Sin Localidad</MenuItem>
                          <MenuItem value=" Sonora">Sonora</MenuItem>
                          <MenuItem value=" Tabasco">Tabasco</MenuItem>
                          <MenuItem value=" Tamaulipas">Tamaulipas</MenuItem>
                          <MenuItem value=" Tlaxcala">Tlaxcala</MenuItem>
                          <MenuItem value=" Veracruz de Ignacio de la Llave">Veracruz de Ignacio de la Llave</MenuItem>
                          <MenuItem value=" Yucatán"> Yucatán</MenuItem>
                          <MenuItem value=" Zacatecas">Zacatecas</MenuItem>
                          </Field>
                          </Grid>
                          <Grid item xs={12} style ={{marginTop:20}} > 
                          <strong><Alert message="Actividades de la empresa" type="info"></Alert></strong>
                          <Field required fullWidth name="actividad" component={TextField} label="Actividad Principal"type = "text"></Field>
                          </Grid>
                          <Grid item xs={12}>
                          <Field required fullWidth name="actividades" component={TextField} label="Principales actividades realizadas en el centro de trabajo"   
                            type = "text"></Field></Grid>                 
                      </Grid>
                      <center>
                      <Button style={{marginTop:"5%"}} type="primary" size="md" disabled={submitting} onClick={(e) =>this.evaluar(values)}
                        className="text-white">Registrar Centro de Trabajo</Button>
                      </center>
                      </form>
                    )}/>
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