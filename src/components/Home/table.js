import React from 'react';

import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBBtn} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import diagnostico from '../images/diagnostico.png'
import { API} from '../utils/http'
import MenuIcon from '@material-ui/icons/Menu';
import MUIDataTable from "mui-datatables";
import Grow from "@material-ui/core/Grow";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import '../Home/index.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
// import Paper from '@material-ui/core/Paper';
import { MDBRow,MDBCol} from 'mdbreact'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { DialogUtility } from '@syncfusion/ej2-popups';
// import TableBody from '@material-ui/core/TableBody';
// import TableHead from '@material-ui/core/TableHead';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import ExplicitOutlinedIcon from '@material-ui/icons/ExplicitOutlined';
import Navbar from './navbar'
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
      ATSContestado:'',
      periodoActivo:'',
      correosEnviados:'',
      correos:[],
      ventanaATS:'',
      ventanaRP:'',
      ventanaEEO:'',
      empleadosATS:[],
      empleadosRP:[],
      empleadosEEO:[]
   
    };
    this.onClick = this.onClick.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.ads = this.ads.bind(this);

  }


      componentWillMount(){
        this.getEmployees()
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

        let idAdmin = localStorage.getItem("idAdmin")
        // const url = 'http://localhost:8000/graphql'
        // console.log("el tiempo es " , t )
         axios({
          url:  API,
          method:'post',
          data:{
          query:`
           query{
            getPeriodo(data:"${[idAdmin]}"){
              idEventos
              fk_administrador
              Descripcion
              EventoActivo
                  }
                }
              `
          }
        })
        .then(datos => {	
        this.setState({periodoActivo : datos.data.data.getPeriodo.length})
      
        }).catch(err=>{
          console.log("error",err.response)
        })
      }
      onClick() {
        this.setState({
          collapse: !this.state.collapse,
        });
      }
    
    handleclick(){
    this.props.history.push("/profile")
    }
    
  getEmployees = async event => {
    var idAdmin  = localStorage.getItem("idAdmin")  
    console.log(idAdmin)     
    // const url = 'http://localhost:8000/graphql'
     await axios({
        url:  API,
        method:'post',
        data:{
        query:`
        query{
          getUsersTableEmployees(data:"${[idAdmin]}"){
            id
            nombre
            ApellidoP
            ApellidoM
            Curp
            RFC
            FechaNacimiento
            Sexo
            EstadoCivil
            correo
            AreaTrabajo
            Puesto
            TipoPuesto
            NivelEstudios
            TipoPersonal
            JornadaTrabajo
            TipoContratacion
            TiempoPuesto
            ExperienciaLaboral
            RotacionTurnos
            fk_administrador
            ATSContestado
            RPContestado
            EEOContestado
            CentroTrabajo
              }
            }
            `
        }
            }).then((datos) => {
              this.setState({ datos: datos.data.data.getUsersTableEmployees});
            })
            .catch((error) => {
              console.log(".cartch" , error.response)
          });

          axios({
            url:  API,
            method:'post',
            data:{
            query:`
             query{
              getCorreos(data:"${[idAdmin]}"){
                    Encuesta
                    fecha
                    nombre
                    ApellidoP
                    ApellidoM
                    Curp
                     }
                  }
                `
            }
          })
          .then(datos => {	
          this.setState({correos:datos.data.data.getCorreos})
          }).catch(err=>{
            console.log("error",err)
          })
          

          axios({
            url:  API,
            method:'post',
            data:{
            query:`
             query{
              getEmployeesResolvesSurveyATSFalse(data:"${[idAdmin]}"){
                    id
                    nombre
                    ApellidoP
                    ApellidoM
                    correo
                    CentroTrabajo
                    }
                  }
                `
              }
          })
          .then(datos => {	
          this.setState({empleadosATS:datos.data.data.getEmployeesResolvesSurveyATSFalse})
          }).catch(err=>{
            console.log("error",err)
          }) 

          axios({
            url:  API,
            method:'post',
            data:{
            query:`
             query{
              getEmployeesResolvesSurveyRPFalse(data:"${[idAdmin]}"){
                    id
                    nombre
                    ApellidoP
                    ApellidoM
                    correo
                    CentroTrabajo
                    }
                  }
                `
              }
          })
          .then(datos => {	
          this.setState({empleadosRP:datos.data.data.getEmployeesResolvesSurveyRPFalse})
          }).catch(err=>{
            console.log("error",err)
          }) 

          axios({
            url:  API,
            method:'post',
            data:{
            query:`
             query{
              getEmployeesResolvesSurveyEEOFalse(data:"${[idAdmin]}"){
                    id
                    nombre
                    ApellidoP
                    ApellidoM
                    correo
                    CentroTrabajo
                    }
                  }
                `
              }
          })
          .then(datos => {	
          this.setState({empleadosEEO:datos.data.data.getEmployeesResolvesSurveyEEOFalse})
          }).catch(err=>{
            console.log("error",err)
          }) 


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
    this.props.history.push("/")
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

     sendMailATS =  (datosEmpleados) =>{
      const idAdmin = localStorage.getItem("idAdmin")
      let array=[]
        datosEmpleados.map(rows=>{
         array.push(rows.data[0],[rows.data[4]])
        })
        if ( this.state.periodoActivo > 0){
        axios({
        url:  API,
        method:'post',
        data:{
        query:` 
        mutation{
          sendMail(data:"${[array,1,idAdmin]}"){
              message
                }
              }
            `
        }
            }).then(datos => {  
              console.log("datod" , datos)
              DialogUtility.alert({
                animationSettings: { effect: 'Zoom' },           
                content: `Su evaluación fue enviada exitosamente a ${datosEmpleados.length} Empleados  espere por favor ...`,
                title: 'Aviso!',
                position: "fixed"
                });
                  setTimeout(() => {
                    window.location.reload()
                  },1000);
            });
      }
    }    
        ///////////////////////////////////////////////////////////////////////////////////////

     sendMailRP =(datosEmpleados) =>{
      const idAdmin = localStorage.getItem("idAdmin")
        let array=[]
        datosEmpleados.map(rows=>{
        array.push(rows.data[0],[rows.data[4]])
        })
      if ( this.state.periodoActivo > 0){
          axios({
          url:  API,
          method:'post',
          data:{
          query:`
          mutation{
            sendMail(data:"${[array,2,idAdmin]}"){
                message
                  }
                }
              `
          }
              }).then(datos => {  
                console.log("datos" , datos)
                DialogUtility.alert({
                  animationSettings: { effect: 'Zoom' },           
                  content: `Su evaluación fue enviada exitosamente a ${datosEmpleados.length} Empleados  espere por favor ...`,      
                  title: 'Aviso!',
                  position: "fixed"
                  });
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000);
              });    
        }           
        }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
     sendMailEEO =  async  (datosEmpleados) =>{
      const idAdmin = localStorage.getItem("idAdmin")
      let array=[]
      datosEmpleados.map(rows=>{
      array.push(rows.data[0],[rows.data[4]])
      })
      if (this.state.periodoActivo > 0){
      
          axios({
          url:  API,
          method:'post',
          data:{
          query:`
          mutation{
            sendMail(data:"${[array,3,idAdmin]}"){
                message
                  }
                }
              `
          }
              }).then(datos => {  
                DialogUtility.alert({
                  animationSettings: { effect: 'Zoom' },           
                  content: `Su evaluación fue enviada exitosamente a ${datosEmpleados.length} Empleados  espere por favor ...`,      
                  title: 'Aviso!',
                  position: "fixed"
                  });
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000);
              });
           }     
      }

  render() {
    const columns = ["ID","Nombre", "Apellido P.",  "Apellido M.","Correo","Centro de trabajo"];

    const data = this.state.empleadosATS.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.correo,rows.CentroTrabajo])
    })

    const dataRP = this.state.empleadosRP.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.correo,rows.CentroTrabajo])
    })
    const dataEEO = this.state.empleadosEEO.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.correo,rows.CentroTrabajo])
    })

    const columnss = ["Evaluación","Fecha", "Nombre",  "Apellido P.","Apellido M.","Curp"];

    const datas = this.state.correos.map(rows=>{
      return([rows.Encuesta,rows.fecha,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.Curp])
    })

    let datosEmpleados;
    let datosEmpleadosRP;
    let filtroRP;
    let datosEmpleadosEEO;
    let filtroEEO;
    let filtro;
    const options = {
        filterType: "dropdown",
        responsive: "stacked",
        textLabels: {
                   body: {
                     noMatch: "Lo Siento ,No se han encontrado Resultados :(",
                     toolTip: "Sort",
                     columnHeaderTooltip: column => `Sort for ${column.label}`
                   },
                   pagination: {
                     next: "Siguiente Página",
                     previous: "Anterior Página",
                     rowsPerPage: "Filas por Página:",
                     displayRows: "de",
                   },
                   toolbar: {
                     search: "Buscar",
                     downloadCsv: "Descargar CSV",
                     print: "Imprimir",
                     viewColumns: "Ver Columnas",
                     filterTable: "Filtrar Tabla",
                   },
                   filter: {
                     all: "Todos",
                     title: "Filtros",
                     reset: "Deshacer",
                   },
                   viewColumns: {
                     title: "Mostrar Columnas",
                     titleAria: "Show/Hide Table Columns",
                   },
                   selectedRows: {
                     text: "Filas Selecionadas",
                     delete: "Borrar",
                     deleteAria: "Eliminar Filas Seleccionadas",
                   },
                 },
      
        onTableChange: (action, tableState) => {
        datosEmpleados = tableState.displayData
        },
        onFilterChange: (action, filtroTable) => {
          filtro=filtroTable
          console.log("filtro" , filtro) 
          }     };

          const optionsRP = {
            filterType: "dropdown",
            responsive: "stacked",
            textLabels: {
                       body: {
                         noMatch: "Lo Siento ,No se han encontrado Resultados :(",
                         toolTip: "Sort",
                         columnHeaderTooltip: column => `Sort for ${column.label}`
                       },
                       pagination: {
                         next: "Siguiente Página",
                         previous: "Anterior Página",
                         rowsPerPage: "Filas por Página:",
                         displayRows: "de",
                       },
                       toolbar: {
                         search: "Buscar",
                         downloadCsv: "Descargar CSV",
                         print: "Imprimir",
                         viewColumns: "Ver Columnas",
                         filterTable: "Filtrar Tabla",
                       },
                       filter: {
                         all: "Todos",
                         title: "Filtros",
                         reset: "Deshacer",
                       },
                       viewColumns: {
                         title: "Mostrar Columnas",
                         titleAria: "Show/Hide Table Columns",
                       },
                       selectedRows: {
                         text: "Filas Selecionadas",
                         delete: "Borrar",
                         deleteAria: "Eliminar Filas Seleccionadas",
                       },
                     },
          
            onTableChange: (action, tableState) => {
            datosEmpleadosRP = tableState.displayData
            },
            onFilterChange: (action, filtroTable) => {
              filtroRP=filtroTable
              }     };

              const optionsEEO = {
                filterType: "dropdown",
                responsive: "stacked",
                textLabels: {
                           body: {
                             noMatch: "Lo Siento ,No se han encontrado Resultados :(",
                             toolTip: "Sort",
                             columnHeaderTooltip: column => `Sort for ${column.label}`
                           },
                           pagination: {
                             next: "Siguiente Página",
                             previous: "Anterior Página",
                             rowsPerPage: "Filas por Página:",
                             displayRows: "de",
                           },
                           toolbar: {
                             search: "Buscar",
                             downloadCsv: "Descargar CSV",
                             print: "Imprimir",
                             viewColumns: "Ver Columnas",
                             filterTable: "Filtrar Tabla",
                           },
                           filter: {
                             all: "Todos",
                             title: "Filtros",
                             reset: "Deshacer",
                           },
                           viewColumns: {
                             title: "Mostrar Columnas",
                             titleAria: "Show/Hide Table Columns",
                           },
                           selectedRows: {
                             text: "Filas Selecionadas",
                             delete: "Borrar",
                             deleteAria: "Eliminar Filas Seleccionadas",
                           },
                         },
              
                onTableChange: (action, tableState) => {
                datosEmpleadosEEO = tableState.displayData
                },
                onFilterChange: (action, filtroTable) => {
                  filtroEEO=filtroTable
                  console.log("filtro" , filtro) 
                  }     };

          const options2 = {
            filterType: "dropdown",
            responsive: "stacked",
            textLabels: {
                       body: {
                         noMatch: "Lo Siento ,No se han encontrado Resultados :(",
                         toolTip: "Sort",
                         columnHeaderTooltip: column => `Sort for ${column.label}`
                       },
                       pagination: {
                         next: "Siguiente Página",
                         previous: "Anterior Página",
                         rowsPerPage: "Filas por Página:",
                         displayRows: "de",
                       },
                       toolbar: {
                         search: "Buscar",
                         downloadCsv: "Descargar CSV",
                         print: "Imprimir",
                         viewColumns: "Ver Columnas",
                         filterTable: "Filtrar Tabla",
                       },
                       filter: {
                         all: "Todos",
                         title: "Filtros",
                         reset: "Deshacer",
                       },
                       viewColumns: {
                         title: "Mostrar Columnas",
                         titleAria: "Show/Hide Table Columns",
                       },
                       selectedRows: {
                         text: "Filas Selecionadas",
                         delete: "Borrar",
                         deleteAria: "Eliminar Filas Seleccionadas",
                       },
                     },
         
                       };
    

                      let correosEnviados;
                      if(this.state.correosEnviados=='1'){
                        correosEnviados =<MDBContainer style={{marginBottom:20}}>
                          <MUIDataTable
                            title={`Mis Correos`}
                            data={datas}
                            columns={columnss}
                            options={options2}
                          />
                      </MDBContainer>  
                      }


         
    // const { children, ...attributes } = this.props;
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
    return (
       <React.Fragment>
          <div>
              <Navbar/>
             <MDBContainer style={container} className="text-center pt-5">
            <MDBContainer style={container} className="text-center pt-2">
            <ul>
            <MDBRow>
            <MDBCol> 
           </MDBCol>
            </MDBRow>   
            </ul>

        
        <div style={{ height: "110%"}}>
        <Button  startIcon={<MenuIcon />} color="primary" onClick={(e)=>this.setState({correosEnviados:'1'})} style={{marginBottom:20}}>
           correos Enviados
         </Button>
         <Button  startIcon={<CloseOutlinedIcon />} color="secondary" onClick={(e)=>this.setState({correosEnviados:''})} style={{marginBottom:20}}>
           Cerrar Correos
         </Button>
         <br></br>
        
         {correosEnviados}
    
         <Grow in={true}>
            <div >
            {/* <Alert variant="outlined" severity="warning">
              This is a warning alert — check it out!
            </Alert> */}
              <MUIDataTable
                title={`Enviar evaluación ATS`}
                data={data}
                columns={columns}
                options={options}
              />
              <MDBRow style={{marginTop:10}}>
              <MDBCol  sm="4"></MDBCol>  
             </MDBRow>
             <Button style={{marginBottom:40}} startIcon={<CheckOutlinedIcon />}  outline color="secondary" onClick={(e)=>this.sendMailATS(datosEmpleados)}>
                  Enviar evaluación ATS
               </Button>
             
            </div> 
          </Grow>  
          <Grow in={true}>
            <div >

              <MUIDataTable
                title={`Enviar evaluación RP`}
                data={dataRP}
                columns={columns}
                options={optionsRP}
              />
              <MDBRow style={{marginTop:10}}>
              <MDBCol  sm="4"></MDBCol>  
             </MDBRow>
           
               <Button style={{marginBottom:40}}  startIcon={<ArrowForwardIcon />} outline color="default" onClick={(e)=>this.sendMailRP(datosEmpleadosRP)}>
                  Enviar evaluación RP
               </Button>
              
            </div> 
          </Grow> 
          <Grow in={true}>
            <div >
              <MUIDataTable
                title={`Enviar evaluación EEO`}
                data={dataEEO}
                columns={columns}
                options={optionsEEO}
              />
              <MDBRow style={{marginTop:10}}>
              <MDBCol  sm="4"></MDBCol>  
             </MDBRow>
           
               <Button style={{marginBottom:60}}  startIcon={<CheckCircleOutlineOutlinedIcon />} outline color="primary" onClick={(e)=>this.sendMailEEO(datosEmpleadosEEO)}>
                  Enviar evaluación EEO
               </Button>
            </div> 
          </Grow>
        </div>

        
   
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