import React from 'react';
import {MDBCardText,MDBIcon} from 'mdbreact';
import '../Home/index.css'
import { API} from '../utils/http'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import { DialogUtility } from '@syncfusion/ej2-popups';
import MUIDataTable from "mui-datatables";
import Navbar from './navbar'
import {MenuItem} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {Grid} from '@material-ui/core';
import axios from 'axios'
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es";
import { Tabs} from 'antd';
import {Card} from 'antd'
import './index.css'
import {Button,Select as Selec,Modal} from 'antd'
const { TabPane } = Tabs;
const { Option } = Selec;

class AdminGral extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        collapse: false,
        datos:[],
        datosSucursales:[],
        datosDeptos:[],
        datosPuestos:[],
        updateRows:[],
        updateRowsSucursales:[],
        updateRowsDeptos:[],
        updateRowsPuestos:[],
        periodo:[],
        inicial:null,
        final:null,
        Alerta1:null,
        Alerta2:null,
        Alerta3:null,
        imagePreviewUrl: '',
        allperiodo:[],
        dropdown:null,
        admin:[],
        date:'',
        size: 'small',
        periodoSeleccionado:'',
        tablaInicial:true,
        editarEmpleados:false,
        editarCentros:false,
        isModalVisible:false,
        isModalVisible2:false,
        isModalVisible3:false,
        nombreEmpleado: '',
        apellidoPaternoEmpleado: '',
        apellidoMaternoEmpleado: '',
        curpEmpleado: '',
        rfcEmpleado: '',
        generoEmpleado: '',
        centroTrabajoEmpleado: '',
        correoEmpleado: '',
        telefonoEmpleado: '',
        departamentoEmpleado: '',
        puestoEmpleado: '',
        edadEmpleado: '',
        tipoPuestoEmpleado: '',
        nombreSucursal:'',
        calle:'',
        numExt:'',
        numInt:'',
        colonia:'',
        CP:'',
        Ciudad:'',
        telefono:'',
        actividades:'',
        nombreDepto:'',
        nombrePuesto:'',
        NombrePeriodo:''
      };


        this.getEmployees = this.getEmployees.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
      async componentWillMount() {
        var LaFecha = new Date(), Mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        diasem = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'], diasemana = LaFecha.getDay(),
        FechaCompleta = `${diasem[diasemana]} ${LaFecha.getDate()} de ${Mes[LaFecha.getMonth()]} de ${LaFecha.getFullYear()}`;
        
        this.setState({ date: FechaCompleta });
        await this.getEmployees();
        const idAdmin = localStorage.getItem("idAdmin");
        
        axios({ url: API, method: 'post', data: { query: `query{ getPeriodo(data:"${[idAdmin]}"){ idEventos fk_administrador Descripcion } }` } })
          .then(datos => this.setState({ periodo: datos.data.data.getPeriodo }))
          .catch(err => {});
      
        axios({ url: API, method: 'post', data: { query: `query{ getallPeriodo(data:"${[idAdmin]}"){ evento eventoFinal alerta1 alerta2 alerta3 Descripcion EventoActivo } }` } })
          .then(datos => this.setState({ allperiodo: datos.data.data.getallPeriodo }))
          .catch(err => {});
      }
      
      getEmployees = async () => {
        var correo = localStorage.getItem("correo"), idAdmin = localStorage.getItem("idAdmin");
      
        await axios({ url: API, method: 'post', data: { query: `query{ getUsersTableEmployees(data:"${idAdmin}"){ id nombre ApellidoP ApellidoM Curp RFC FechaNacimiento Sexo CentroTrabajo EstadoCivil correo telefono AreaTrabajo Puesto TipoPuesto NivelEstudios TipoPersonal JornadaTrabajo TipoContratacion TiempoPuesto ExperienciaLaboral RotacionTurnos fk_administrador ATSContestado RPContestado EEOContestado } }` } })
          .then(datos => this.setState({ datos: datos.data.data.getUsersTableEmployees }))
          .catch(error => console.log(".catch", error));
      
        await axios({ url: API, method: 'post', data: { query: `query{ getSucursales(data:"${correo}"){ id nombreSucursal calle numExt numInt colonia CP Ciudad Estado actividad telefono actividades fk_administrador } }` } })
          .then(datos => this.setState({ datosSucursales: datos.data.data.getSucursales }))
          .catch(error => console.log(".catch", error));
      
        await axios({ url: API, method: 'post', data: { query: `query{ getDeptos(data:"${correo}"){ id nombre fk_Administrador } }` } })
          .then(datos => this.setState({ datosDeptos: datos.data.data.getDeptos }))
          .catch(error => console.log(".catch", error));
      
        await axios({ url: API, method: 'post', data: { query: `query{ getPuestos(data:"${correo}"){ id nombre fk_Administrador } }` } })
          .then(datos => this.setState({ datosPuestos: datos.data.data.getPuestos }))
          .catch(error => console.log(".catch", error));
      
        await axios({ url: API, method: 'post', data: { query: `query{ getAdminDashboard(data:"${idAdmin}"){ id fechaRegistro nombreAdmin Apellidos RFC RazonSocial correo Activo fk_superusuario objetivo } }` } })
          .then(datos => this.setState({ admin: datos.data.data.getAdminDashboard }))
          .catch(error => console.log(".catch", error));
      }
      
      delete(id) {
        var correo = localStorage.getItem("correo");
        axios({ url: API, method: 'post', data: { query: `mutation{ deleteEmployees(data:"${[id, correo]}"){ message } }` } })
            .then(datos => {
                DialogUtility.alert({ animationSettings: { effect: 'Fade' }, title: "AVISO!", content: 'Empleado desactivado exitosamente', position: "fixed" });
                setTimeout(() => window.location.reload(), 2000);
            })
            .catch(error => console.log(".catch", error.response));
    }
    
    deleteSucursales(id) {
        var correo = localStorage.getItem("correo");
        axios({
            url: API,
            method: 'post',
            data: { query: `mutation { deleteSucursales(data: "${[id, correo]}") { message } }` }
        }).then(datos => {
            DialogUtility.alert({ animationSettings: { effect: 'Fade' }, title: "AVISO!", content: 'Centro de trabajo eliminado exitosamente', position: "fixed" });
            setTimeout(() => window.location.reload(), 2000);
        }).catch(error => console.log(".catch", error.response));
    }
    
    deleteDepartamentos(id) {
        var correo = localStorage.getItem("correo");
        axios({
            url: API,
            method: 'post',
            data: { query: `mutation { deleteDeptos(data: "${[id, correo]}") { message } }` }
        }).then(datos => {
            DialogUtility.alert({ animationSettings: { effect: 'Fade' }, title: "AVISO!", content: 'Departamento eliminado exitosamente', position: "fixed" });
            setTimeout(() => window.location.reload(), 2000);
        }).catch(error => console.log(".catch", error.response));
    }
    
    deletePermanent(id) {
        axios({
            url: API,
            method: 'post',
            data: { query: `mutation { deleteEmpleadosPermanente(data: "${[id]}") { message } }` }
        }).then(datos => {
            if (datos.data.data.deleteEmpleadosPermanente.message === "empleado eliminado") {
                DialogUtility.alert({ animationSettings: { effect: 'Fade' }, title: "AVISO!", content: 'El expediente del empleado fue eliminado exitosamente', position: "fixed" });
                setTimeout(() => window.location.reload(), 2000);
            }
        }).catch(error => console.log(".catch", error.response));
    }
    
    deletePuestos(id) {
        var correo = localStorage.getItem("correo");
        axios({
            url: API,
            method: 'post',
            data: { query: `mutation { deletePuestos(data: "${[id, correo]}") { message } }` }
        }).then(datos => {
            DialogUtility.alert({ animationSettings: { effect: 'Fade' }, title: "AVISO!", content: 'El Puesto fue eliminado exitosamente', position: "fixed" });
            setTimeout(() => window.location.reload(), 2000);
        }).catch(error => console.log(".catch", error.response));
    }
    
    onSubmit(values) {}
    
    validate = values => {
        const errors = {};
        const requiredFields = ['nombre', 'ApellidoP', 'ApellidoM', 'Curp', 'rfc', 'FechaNacimiento', 'sexo', 'cp', 'EstadoCivil', 'correo', 'AreaTrabajo', 'Puesto', 'TipoPuesto', 'NivelEstudios', 'TipoPersonal', 'JornadaTrabajo', 'TipoContratacion', 'TiempoPuesto', 'ExperienciaLaboral'];
        requiredFields.forEach(field => { if (!values[field]) errors[field] = 'Este campo es requerido'; });
        if (values.rfc && (values.rfc.length < 12 || values.rfc.length > 13)) errors.rfc = 'El número de caracteres no es el correcto';
        if (values.Curp && values.Curp.length !== 18) errors.Curp = 'El número de caracteres no es el correcto';
        return errors;
    };
    
    validate3 = values => {
        const errors = {};
        if (!values.nombreDepto) errors.nombreDepto = 'Este campo es requerido';
        return errors;
    };
    
    validate4 = values => {
        const errors = {};
        if (!values.nombrePuesto) errors.nombrePuesto = 'Este campo es requerido';
        return errors;
    };
    validate2 = values => {
      const errors = {};
      const requiredFields = ['nombreSucursal', 'calle', 'numExt', 'numInt', 'colonia', 'Ciudad', 'rfc', 'telefono', 'correo', 'CP'];
      requiredFields.forEach(field => {
          if (!values[field]) errors[field] = 'Este campo es requerido';
      });
      if (values.rfc && (values.rfc.length < 12 || values.rfc.length > 13)) errors.rfc = 'El número de caracteres no es el correcto';
      return errors;
  };
  
  evaluar = (id) => {
      const idAdmin = localStorage.getItem('idAdmin');

      const nombreEmpleado = this.state.nombreEmpleado;
      const apellidoPaternoEmpleado = this.state.apellidoPaternoEmpleado;
      const apellidoMaternoEmpleado = this.state.apellidoMaternoEmpleado;
      const curpEmpleado = this.state.curpEmpleado;
      const rfcEmpleado = this.state.rfcEmpleado;
      const generoEmpleado = this.state.generoEmpleado;
      const centroTrabajoEmpleado = this.state.centroTrabajoEmpleado;
      const correoEmpleado = this.state.correoEmpleado;
      const telefonoEmpleado = this.state.telefonoEmpleado;
      const departamentoEmpleado = this.state.departamentoEmpleado;
      const puestoEmpleado = this.state.puestoEmpleado;
      const edadEmpleado = this.state.edadEmpleado;
      const tipoPuestoEmpleado = this.state.tipoPuestoEmpleado;

      // Validación y asignación
      const nombre = nombreEmpleado || this.state.updateRows.nombre;
      const ApellidoP = apellidoPaternoEmpleado || this.state.updateRows.ApellidoP;
      const ApellidoM = apellidoMaternoEmpleado || this.state.updateRows.ApellidoM;
      const Curp = curpEmpleado || this.state.updateRows.Curp;
      const rfc = rfcEmpleado || this.state.updateRows.RFC;
      const sexo = generoEmpleado || this.state.updateRows.Sexo;
      const centro = centroTrabajoEmpleado || this.state.updateRows.CentroTrabajo;
      const correoEmployee = correoEmpleado || this.state.updateRows.correo;
      const telefono = telefonoEmpleado || this.state.updateRows.telefono;
      const AreaTrabajo = departamentoEmpleado || this.state.updateRows.AreaTrabajo;
      const Puesto = puestoEmpleado || this.state.updateRows.Puesto;
      const edad = edadEmpleado || this.state.updateRows.FechaNacimiento;
      const TipoPuesto = tipoPuestoEmpleado || this.state.updateRows.TipoPuesto;

      if (nombre) {
          axios({
              url: API,
              method: 'post',
              data: {
                  query: `mutation {
                      updateEmployees(data:"${[nombre,ApellidoP,ApellidoM,Curp,rfc,sexo,centro,correoEmployee,AreaTrabajo,Puesto,TipoPuesto,id,idAdmin,telefono,edad]}"){

                          message
                      }
                  }`
              }
          }).then(datos => {	
              console.log(datos)
              if(datos.data.data.updateEmployees.message === 'actualizacion exitosa'){
              DialogUtility.alert({
                animationSettings: { effect: 'Fade' },        
                title:"AVISO!",   
                content: 'Empleado Actualizado',
                position: "fixed", 
              })
              setTimeout(()=>{
                  window.location.reload();
              },2000)
              }else{
                DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },        
                  title:"AVISO!",   
                  content: 'Estimado usuario el proceso no pudo completarse con éxito por favor intentelo nuevamente, si el problema persiste contacte a soporte técnico.',
                  position: "fixed", 
                })
              }
            })

      }
  };
  
  evaluarSucursales = (id) => {
      const nombreSucursal = this.state.nombreSucursal || this.state.updateRowsSucursales.nombreSucursal;
      const calle = this.state.calle || this.state.updateRowsSucursales.calle;
      const numExt = this.state.numExt || this.state.updateRowsSucursales.numExt;
      const numInt = this.state.numInt || this.state.updateRowsSucursales.numInt;
      const colonia = this.state.colonia || this.state.updateRowsSucursales.colonia;
      const CP = this.state.CP || this.state.updateRowsSucursales.CP;
      const telefono = this.state.telefono || this.state.updateRowsSucursales.telefono;
      const actividades = this.state.actividades || this.state.updateRowsSucursales.actividades;
      const Ciudad = this.state.Ciudad || this.state.updateRowsSucursales.Ciudad;

      const correo = localStorage.getItem('correo');
        
      if (nombreSucursal) {
          axios({
              url: API,
              method: 'post',
              data: {
                  query: `mutation {
                      updateSucursales(data: "${[nombreSucursal, calle, numExt, numInt, colonia, CP, Ciudad, telefono, id, actividades, correo]}") {
                          message
                      }
                  }`
              }
          }).then(datos => {
              DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },
                  title: "AVISO!",
                  content: 'Centro de trabajo actualizado',
                  position: "fixed",
              });
              window.location.reload();
          });
      }
  };
  
  evaluarDeptos = (id) => {
      const nombreDepto = this.state.nombreDepto || this.state.updateRowsDeptos.nombre;
      const correo = localStorage.getItem('correo');
      if (nombreDepto) {
          axios({
              url: API,
              method: 'post',
              data: {
                  query: `mutation {
                      updateDeptos(data: "${[nombreDepto.toUpperCase(), id, correo]}") {
                          message
                      }
                  }`
              }
          }).then(datos => {
              DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },
                  title: "AVISO!",
                  content: 'Departamento Actualizado',
                  position: "fixed",
              });
              window.location.reload();
          });
      } 
  };
  
  evaluarPuestos = (id) => {
      const nombrePuesto = this.state.nombrePuesto || this.state.updateRowsPuestos.nombre;

      const correo = localStorage.getItem('correo');
      if (nombrePuesto) {
          axios({
              url: API,
              method: 'post',
              data: {
                  query: `mutation {
                      updatePuestos(data: "${[nombrePuesto, id, correo]}") {
                          message
                      }
                  }`
              }
          }).then(datos => {
              DialogUtility.alert({
                  animationSettings: { effect: 'Fade' },
                  title: "AVISO!",
                  content: 'Puesto Actualizado',
                  position: "fixed",
              });
           window.location.reload();
          });
      } 
  };
  
  NuevoPeriodo() {
      if (this.state.NombrePeriodo && this.state.inicial && this.state.final && this.state.Alerta1 && this.state.Alerta2 && this.state.Alerta3) {
          const idAdmin = localStorage.getItem("idAdmin");
          axios({
              url: API,
              method: 'post',
              data: {
                  query: `query {
                      getEventos(data: "${[idAdmin]}") {
                          message
                      }
                  }`
              }
          }).then(datos => {
              const message = datos.data.data.getEventos.message;
              if (message === "evento encontrado") {
                  DialogUtility.alert({
                      animationSettings: { effect: 'Fade' },
                      title: "AVISO!",
                      content: 'Hay un evento activo, por favor deshabilítelo y vuelva a intentar',
                      position: "fixed",
                  });
              } else if (message === "exito") {
                  axios({
                      url: API,
                      method: 'post',
                      data: {
                          query: `mutation {
                              addPeriodo(data: "${[this.state.NombrePeriodo, this.state.inicial, this.state.final, this.state.Alerta1, this.state.Alerta2, this.state.Alerta3, idAdmin]}") {
                                  message
                              }
                          }`
                      }
                  }).then(datos => {
                      const addMessage = datos.data.data.addPeriodo.message;
                      DialogUtility.alert({
                          animationSettings: { effect: 'Fade' },
                          title: "AVISO!",
                          content: addMessage === 'registro exitoso' ? 'Periodo Registrado con Éxito' : 
                          addMessage === 'periodo existente' ? 'El nombre del periodo ya fue registrado' : 
                          'Error al registrar el periodo.',
                          position: "fixed",
                      });
                      if (addMessage === 'registro exitoso') window.location.reload();
                  });
              }
          }).catch(err => console.log("error en la consulta del evento", err));
      } else {
          DialogUtility.alert({
              animationSettings: { effect: 'Fade' },
              title: "AVISO!",
              content: 'Por favor ingrese algún valor',
              position: "fixed",
          });
      }
  }
  editarPeriodo(){  
      if(this.state.NombrePeriodo && this.state.final && this.state.Alerta1 && this.state.Alerta2 && this.state.Alerta3){    
      const idAdmin=localStorage.getItem("idAdmin")
      axios({
        url:  API,
        method:'post',
        data:{
        query:`
         mutation{
          updatePeriodo(data:"${[this.state.NombrePeriodo,this.state.final,this.state.Alerta1,this.state.Alerta2,this.state.Alerta3,idAdmin]}"){
              message
                }
              }
            `
        }
      })
      .then(datos => {	
        if(datos.data.data.updatePeriodo.message==='evento existente'){
          DialogUtility.alert({
            animationSettings: { effect: 'Fade' },        
            title:"AVISO!",   
            content: 'El nombre del periodo ya corresponde a un evento registrado o deshabilitado con anterioridad por favor ingrese uno diferente',
            position: "fixed",
          })
        }else if (datos.data.data.updatePeriodo.message==='no hay eventos'){
          DialogUtility.alert({
            animationSettings: { effect: 'Fade' },        
            title:"AVISO!",   
            content: 'No existe ningun periodo Activo por favor registre uno antes de editar',
            position: "fixed",
          })
        }else if ( datos.data.data.updatePeriodo.message==='evento Actualizdo'){
          DialogUtility.alert({
            animationSettings: { effect: 'Fade' },        
            title:"AVISO!",   
            content: 'periodo Actualizado con éxito',
            position: "fixed",
          })
          window.location.reload();
        }
      }).catch(err=>{
        console.log("error" , err.response)
      })
    }else{
      DialogUtility.alert({
        animationSettings: { effect: 'Fade' },        
        title:"AVISO!",   
        content:'Por favor complete todos los campos',
        position: "fixed",
      }) 
    }}

DesactivarPeriodo(){
  let values = this.state.periodoSeleccionado
  if(values){
  const idAdmin=localStorage.getItem("idAdmin")
  axios({
    url:  API,
    method:'post',
    data:{
    query:`
      mutation{
      deletePeriodo(data:"${[values,idAdmin]}"){
          message
            }
          }
        `
    }
  })
  .then(datos => {	
    DialogUtility.alert({
      animationSettings: { effect: 'Fade' },        
      title:"AVISO!",   
      content: 'Periodo Deshabilitado con Éxito',
      position: "fixed",
    })
    window.location.reload();
  })
}else{
  DialogUtility.alert({
    animationSettings: { effect: 'Fade' },        
    title:"AVISO!",   
    content: 'Por favor seleccione una opción',
    position: "fixed",
  })
}
}
    handleDateChange = date => {
        this.setState({ inicial: date });
    };
    handleDateChange2 = date2 => {
        this.setState({ final: date2 });
    };
    handleAlerta1 = date => {
        this.setState({ Alerta1: date });
    };
    handleAlerta2 = date => {
        this.setState({ Alerta2: date });
    };
    handleAlerta3 = date => {
        this.setState({ Alerta3: date });
    };
    handleSubmit() {}
    
          
      handleImageChange(e) { let reader = new FileReader(), file = e.target.files[0]; reader.onloadend = () => { this.setState({ file, imagePreviewUrl: reader.result }); }; reader.readAsDataURL(file); }
      handleDropdown = (event) => { this.setState({ dropdown: event.currentTarget }); };
      handleClose = () => { this.setState({ dropdown: null }); };
      handleChange(value) { this.setState({ periodoSeleccionado: value }); console.log(`selected ${value}`); }
      onChange = e => { this.setState({ size: e.target.value }); }; 
      edicionDatos(parameter, id) {
        if (parameter === 1) { this.setState({ tablaInicial: false, editarEmpleados: true, updateRows: id, editarCentros: false, editarPuestos: false }); }
        if (parameter === 2) { this.setState({ editarEmpleados: false, tablaInicial: false, editarCentros: true, updateRowsSucursales: id, editarPuestos: false }); }
        if (parameter === 3) { this.showModal2(); this.setState({ updateRowsDeptos: id }); }
        if (parameter === 4) { this.showModal(); this.setState({ updateRowsPuestos: id }); }
      }
      cerrarEdicion() { this.setState({ tablaInicial: true, editarEmpleados: false, editarCentros: false, editarPuestos: false, editarDeptos: false   }); }
      showModal = () => { this.setState({ isModalVisible: true }); }; 
      handleCancel = () => { this.setState({ isModalVisible: false }); };
      showModal2 = () => { this.setState({ isModalVisible2: true }); };
      showModal3 = () => { this.setState({ isModalVisible3: true }); }; 
      handleCancel2 = () => { this.setState({ isModalVisible2: false }); };
      handleCancel3 = () => { this.setState({ isModalVisible3: false }); };

      handleChange22 = (event) => {
          const { name, value } = event.target;
          this.setState({
              [name]: value,
          });
      };
      handleChange23 = (event) => {
          const { name, value } = event.target;
          this.setState({
              [name]: value,
          });
      };
      handleChange24 = (event) => {
          const { name, value } = event.target;
          this.setState({
              [name]: value,
          });
      };
      handleChange25 = (event) => {
          const { name, value } = event.target;
          this.setState({
              [name]: value,
          });
      };
      
      handleChange26 = (event) => {
          const { name, value } = event.target;
          this.setState({
              [name]: value,
          });
      };
      handleChange27 = (event) => {
          const { name, value } = event.target;
          this.setState({
              [name]: value,
          });
      };
      
      
  render() {  
    const { size } = this.state;
const localeMap = { es: esLocale }; 
const locale = "es"; 
const options = {
filterType: "dropdown",
responsive: "staked",
elevation: 0,
viewColumns: false,
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
    displayRows: "de"
  },
  toolbar: {
    search: "Buscar",
    downloadCsv: "Descargar CSV",
    print: "Imprimir",
    viewColumns: "Ver Columnas",
    filterTable: "Filtrar Tabla"
  },
  filter: {
    all: "Todos",
    title: "Filtros",
    reset: "Deshacer"
  },
  viewColumns: {
    title: "Mostrar Columnas",
    titleAria: "Show/Hide Table Columns"
  },
  selectedRows: {
    text: "Filas Selecionadas",
    delete: "Borrar",
    deleteAria: "Eliminar Filas Seleccionadas"
  }
},
onTableChange: (action, tableState) => {
  // datosEmpleados=tableState.displayData
},
onFilterChange: (action, filtroTable) => {
  // filtro=filtroTable
}
};
const columns = ["Nombre","Apellido P","Apellido M.","Centro de Trabajo","Puesto","Status",
{name:"boton1",label:"Editar",options:{filter:false,sort:true}},
{name:"boton2",label:"Suspender",options:{filter:false,sort:true}},
{name:"boton3",label:"Eliminar",options:{filter:false,sort:true}}
];

const data = this.state.datos.map((rows,i) => {
const boton2 = <div><Button shape="circle" size="large" type="primary" onClick={e => this.edicionDatos(1,rows)}><MDBIcon icon="user-edit" /></Button></div>;
const boton = <div><Button shape="circle" size="large" type='primary' style={{backgroundColor:'darkorange',borderColor:"orange"}} onClick={(e) => { if (window.confirm('¿Está seguro de desactivar a este empleado?, el empleado no aparecerá en su catálogo, pero su expediente seguirá vigente de esta manera podrá recuperar la información más adelante.')) this.delete(rows.id); }}><MDBIcon icon="user-times" /></Button></div>;
const boton3 = <div><Button shape="circle" size="large" type="danger" onClick={(e) => { if (window.confirm('¿Está seguro de Eliminar a este empleado?, Los datos se perderán y no podrá recuperar su expediente en el futuro')) this.deletePermanent(rows.id); }}><MDBIcon fas icon="trash" /></Button></div>;
return [rows.nombre,rows.ApellidoP,rows.ApellidoM,rows.CentroTrabajo,rows.Puesto,"Vigente",boton2,boton,boton3];
});

const columnsCentro = ["Centro de Trabajo","Calle","Colonia","Ciudad",
{name:"boton1",label:"Editar",options:{filter:false,sort:true}},
{name:"boton2",label:"Suspender",options:{filter:false,sort:true}}
];

const dataCentro = this.state.datosSucursales.map((rows,i) => {
const botonUno = <div><Button shape="circle" size="large" type="primary" onClick={e => this.edicionDatos(2,rows)}><MDBIcon icon="pen-square" /></Button></div>;
const botonDos = <div><Button shape="circle" size="large" type="danger" onClick={(e) => { if (window.confirm('¿Está seguro de eliminar a este centro de trabajo?, Los datos se perderán')) this.deleteSucursales(rows.id); }}><MDBIcon icon="trash-alt" /></Button></div>;
return [rows.nombreSucursal,rows.calle,rows.colonia,rows.Ciudad,botonUno,botonDos];
});

const columnsDeptos = ["Id","Id administrador","Nombre",
{name:"boton1",label:"Editar",options:{filter:false,sort:true}},
{name:"boton2",label:"Eliminar",options:{filter:false,sort:true}}
];

const dataDeptos = this.state.datosDeptos.map((rows,i) => {
const boton1Uno = <div><Button shape="circle" size="large" type="primary" onClick={e => this.edicionDatos(3,rows)}><MDBIcon icon="marker" /></Button></div>;
const boton2Dos = <div><Button shape="circle" size="large" type="danger" onClick={(e) => { if (window.confirm('¿Está seguro de eliminar a este departamento?, Los datos se perderán')) this.deleteDepartamentos(rows.id); }}><MDBIcon icon="trash" /></Button></div>;
return [rows.id,rows.fk_Administrador,rows.nombre,boton1Uno,boton2Dos];
});

const columnsPuestos = ["Id","Id administrador","Nombre",
{name:"boton1",label:"Editar",options:{filter:false,sort:true}},
{name:"boton2",label:"Eliminar",options:{filter:false,sort:true}}
];

const dataPuestos = this.state.datosPuestos.map((rows,i) => {
const boton11 = <div><Button shape="circle" size="large" type="primary" onClick={e => this.edicionDatos(4,rows)}><MDBIcon icon="pencil-alt" /></Button></div>;
const boton22 = <div><Button shape="circle" size="large" type="danger" onClick={(e) => { if (window.confirm('¿Está seguro de eliminar a este puesto?, Los datos se perderán')) this.deletePuestos(rows.id); }}><MDBIcon far icon="trash-alt" /></Button></div>;
return [rows.id,rows.fk_Administrador,rows.nombre,boton11,boton22];
});

let cartaAdmin;
if(this.state.admin.nombreAdmin) {
cartaAdmin = <Modal cancelText="Cancelar" okText="Aceptar" title={<h6><strong>Información General</strong></h6>} visible={this.state.isModalVisible3} onOk={e => this.handleCancel3()} onCancel={e => this.handleCancel3()}>
  <MDBCardText>Razón social: <strong>{this.state.admin.RazonSocial}</strong></MDBCardText>
  <MDBCardText>RFC: <strong>{this.state.admin.RFC}</strong></MDBCardText>
  <MDBCardText>Fecha de registro: <strong>{this.state.admin.fechaRegistro.substring(0,17)}</strong></MDBCardText>
  <MDBCardText>Objetivo de mi empresa: <strong>{this.state.admin.objetivo}</strong></MDBCardText>
  <MDBCardText>Administrador: <strong>{this.state.admin.nombreAdmin + " " + this.state.admin.Apellidos}</strong></MDBCardText>
</Modal>;
}

let editarEmpleados;
if(this.state.editarEmpleados === true) {
editarEmpleados =<div className="form-container">
<form className="form-content">
  <div className="form-row">
    <div className="form-field">
      <label htmlFor="nombreEmpleado">Nombre</label>
      <input
        type="text"
        name="nombreEmpleado"
        onChange={this.handleChange22}
        defaultValue={this.state.updateRows.nombre}
        required
      />
    </div>

    <div className="form-field">
      <label htmlFor="apellidoPaternoEmpleado">Apellido Paterno</label>
      <input
        type="text"
        name="apellidoPaternoEmpleado"
        onChange={this.handleChange22}
        defaultValue={this.state.updateRows.ApellidoP}
        required
      />
    </div>

    <div className="form-field">
      <label htmlFor="apellidoMaternoEmpleado">Apellido Materno</label>
      <input
        type="text"
        name="apellidoMaternoEmpleado"
        onChange={this.handleChange22}
        defaultValue={this.state.updateRows.ApellidoM}
        required
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-field">
      <label htmlFor="curpEmpleado">CURP</label>
      <input
        type="text"
        name="curpEmpleado"
        onChange={this.handleChange22}
        defaultValue={this.state.updateRows.Curp}
        required
      />
    </div>

    <div className="form-field">
      <label htmlFor="rfcEmpleado">RFC</label>
      <input
        type="text"
        name="rfcEmpleado"
        onChange={this.handleChange22}
        defaultValue={this.state.updateRows.RFC}
        required
      />
    </div>

    <div className="form-field">
      <label htmlFor="generoEmpleado">Género</label>
      <input
        type="text"
        name="generoEmpleado"
        onChange={this.handleChange22}
        defaultValue={this.state.updateRows.Sexo}
        required
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-field">
      <label htmlFor="centroTrabajoEmpleado">Centro de Trabajo</label>
      <select name="centroTrabajoEmpleado" onChange={this.handleChange22} required >
        <option value="">{this.state.updateRows.CentroTrabajo || "Seleccione un Centro de trabajo"}</option>
        {this.state.datosSucursales.map((row, idx) => (
          <option key={idx} value={row.nombreSucursal}>{row.nombreSucursal}</option>
        ))}
      </select>
    </div>

    <div className="form-field">
      <label htmlFor="correoEmpleado">Correo</label>
      <input
        type="email"
        name="correoEmpleado"
        onChange={this.handleChange22}
        defaultValue={this.state.updateRows.correo}
        required
      />
    </div>

    <div className="form-field">
      <label htmlFor="telefonoEmpleado">Teléfono</label>
      <input
        type="number"
        name="telefonoEmpleado"
        onChange={this.handleChange22}
        defaultValue={this.state.updateRows.telefono}
        required
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-field">
      <label htmlFor="departamentoEmpleado">Departamento</label>
      <select name="departamentoEmpleado" onChange={this.handleChange22} required>
        <option>{this.state.updateRows.AreaTrabajo || "Seleccione un Departamento"}</option>
        {this.state.datosDeptos.map((row, idx) => (
          <option key={idx} value={row.nombre}>{row.nombre}</option>
        ))}
      </select>
    </div>

    <div className="form-field">
      <label htmlFor="puestoEmpleado">Puesto</label>
      <select name="puestoEmpleado" onChange={this.handleChange22} required>
        <option>{this.state.updateRows.Puesto || "Seleccione un Cargo"}</option>
        {this.state.datosPuestos.map((row, idx) => (
          <option key={idx} value={row.nombre}>{row.nombre}</option>
        ))}
      </select>
    </div>

    <div className="form-field">
      <label htmlFor="edadEmpleado">Edad</label>
      <select name="edadEmpleado" onChange={this.handleChange22} required >
        <option >{this.state.updateRows.FechaNacimiento || "Seleccione una Edad"}</option>
        <option value="15 a 19">15 a 19</option>
        <option value="20 a 24">20 a 24</option>
        <option value="25 a 29">25 a 29</option>
        <option value="30 a 34">30 a 34</option>
        <option value="35 a 39">35 a 39</option>
        <option value="40 a 44">40 a 44</option>
        <option value="45 a 49">45 a 49</option>
        <option value="50 a 54">50 a 54</option>
        <option value="55 a 59">55 a 59</option>
        <option value="60 a 64">60 a 64</option>
        <option value="65 a 69">65 a 69</option>
        <option value="70 o más">70 o más</option>
      </select>
    </div>
  </div>

  <div className="form-row">
    <div className="form-field">
      <label htmlFor="tipoPuestoEmpleado">Tipo de Puesto</label>
      <input
        type="text"
        name="tipoPuestoEmpleado"
        onChange={this.handleChange22}
        defaultValue={this.state.updateRows.TipoPuesto}
        required
      />
    </div>
  </div>

  <div className="form-action-buttons">
    
  </div>
</form>
<button className="btn btn-primary" onClick={(e) =>this.evaluar(this.state.updateRows.id)}>Actualizar Empleado</button>
    <button type="button" className="btn btn-danger" onClick={() => this.cerrarEdicion()}>Cancelar</button>
</div>
}
let editarCentroT;

if(this.state.editarCentros === true) {
editarCentroT = 
<div className="form-container">
<form className="form-content">
  <div className="form-row">
    <div className="form-field">
      <label htmlFor="nombreSucursal">Nombre del Centro de Trabajo</label>
      <input
        type="text"
        name="nombreSucursal"
        onChange={this.handleChange23}
        defaultValue={this.state.updateRowsSucursales.nombreSucursal}
        required
      />
    </div>

    <div className="form-field">
      <label htmlFor="calle">Calle</label>
      <input
        type="text"
        name="calle"
        onChange={this.handleChange23}
        defaultValue={this.state.updateRowsSucursales.calle}
        required
      />
    </div>

    <div className="form-field">
      <label htmlFor="numExt">Número Exterior</label>
      <input
        type="number"
        name="numExt"
        onChange={this.handleChange23}
        defaultValue={this.state.updateRowsSucursales.numExt}
        required
      />
    </div>
  </div>

  <div className="form-row">
  <div className="form-field">
      <label htmlFor="numInt">Número Interior</label>
      <input
        type="number"
        name="numInt"
        onChange={this.handleChange23}
        defaultValue={this.state.updateRowsSucursales.numInt}
        required
      />
    </div>

    <div className="form-field">
      <label htmlFor="colonia">Colonia</label>
      <input
        type="text"
        name="colonia"
        onChange={this.handleChange23}
        defaultValue={this.state.updateRowsSucursales.colonia}
        required
      />
    </div>

    <div className="form-field">
      <label htmlFor="CP">CP</label>
      <input
        type="number"
        name="CP"
        onChange={this.handleChange23}
        defaultValue={this.state.updateRowsSucursales.CP}
        required
      />
    </div>
  </div>

  <div className="form-row">
  <div className="form-field">
      <label htmlFor="Ciudad">Ciudad</label>
      <input
        type="text"
        name="Ciudad"
        onChange={this.handleChange23}
        defaultValue={this.state.updateRowsSucursales.Ciudad}
        required
      />
    </div>
  

    <div className="form-field">
      <label htmlFor="telefono">Teléfono</label>
      <input
        type="number"
        name="telefono"
        onChange={this.handleChange23}
        defaultValue={this.state.updateRowsSucursales.telefono}
        required
      />
    </div>
  </div>

  <div className="form-field">
      <label htmlFor="actividades">Actividades</label>
      <input
        type="text"
        name="actividades"
        onChange={this.handleChange22}
        defaultValue={this.state.updateRowsSucursales.actividades}
        required
      />
    </div>
</form>
<button className="btn btn-primary" onClick={(e) =>this.evaluarSucursales(this.state.updateRowsSucursales.id)}>Actualizar Centro de Trabajo</button>
    <button type="button" className="btn btn-danger" onClick={() => this.cerrarEdicion()}>Cancelar</button>
</div>

}

let editarDepartamentos = 
<Modal footer={null} title={<h6><strong>Actualizar Departamento</strong></h6>} visible={this.state.isModalVisible2} onOk={(e) =>this.evaluarDeptos(this.state.updateRowsDeptos.id)}>    
<div className="form-container">
  <form className="form-content">
      <div className="form-row">
      <div className="form-field">
          <label htmlFor="nombreDepto">Nombre del Departamento</label>
          <input
          type="text"
          name="nombreDepto"
          onChange={this.handleChange24}
          defaultValue={this.state.updateRowsDeptos.nombre}
          required
          />
      </div>
      </div>
  </form>
  <button className="btn btn-primary" onClick={(e) =>this.evaluarDeptos(this.state.updateRowsDeptos.id)} onCancel={e=>this.handleCancel2()}>Actualizar</button>
  <button type="button" className="btn btn-danger" onClick={e=>this.handleCancel2()}>Cancelar</button>
</div>
</Modal>


let editarPuestos = 
<Modal footer={null} title={<h6><strong>Actualizar puesto</strong></h6>} visible={this.state.isModalVisible} onOk={(e) =>this.evaluarPuestos(this.state.updateRowsPuestos.id)} >
<div className="form-container">
  <form className="form-content">
      <div className="form-row">
      <div className="form-field">
          <label htmlFor="nombrePuesto">Nombre del Puesto</label>
          <input
          type="text"
          name="nombrePuesto"
          onChange={this.handleChange25}
          defaultValue={this.state.updateRowsPuestos.nombre}
          required
          />
      </div>
      </div>
  </form>
  <button className="btn btn-primary" onClick={(e) =>this.evaluarPuestos(this.state.updateRowsPuestos.id)} onCancel={e=>this.handleCancel()}>Actualizar</button>
  <button type="button" className="btn btn-danger" onClick={e=>this.handleCancel()}>Cancelar</button>
</div>
</Modal>

let tablaInicial;
    if(this.state.tablaInicial === true) {
      tablaInicial =  <div className="tabInicio" style={{marginTop:"5%"}}>                         
          <Tabs defaultActiveKey="1" type="card" size={size}>
          <TabPane tab="Empleados" key="1">
          <Card style={{width:"100%"}} className="card" title = {<h6><strong>Empleados Registrados {localStorage.getItem("razonsocial")}</strong></h6>} extra={<Button type="success" onClick = {e=>this.showModal3()}>Información general</Button>}>
          <MUIDataTable
            data={data}
            columns={columns}
            options={options}
          />
          </Card>
          </TabPane>
          <TabPane tab="Centros de trabajo" key="2">
          <Card  style={{width:"100%"}} className="card" title = {<h6><strong>Centros de trabajo de {localStorage.getItem("razonsocial")}</strong></h6>}>
            <MUIDataTable
            data={dataCentro}
            columns={columnsCentro}
            options={options}
          />
          </Card>
          </TabPane>
          <TabPane tab="Puestos de trabajo" key="3">
          <Card style={{width:"100%"}} className="card" title = {<h6><strong>Puestos de trabajo de  {localStorage.getItem("razonsocial")}</strong></h6>}>
          <MUIDataTable
            data={dataPuestos}
            columns={columnsPuestos}
            options={options}
          />
          </Card>
          </TabPane>
          <TabPane tab="Departamentos de trabajo" key="4">
            <Card style={{width:"100%"}} className="card" title = {<h6><strong>Departamentos registrados de  {localStorage.getItem("razonsocial")}</strong></h6>}>
            <MUIDataTable
            data={dataDeptos}
            columns={columnsDeptos}
            options={options}
            />
            </Card>
            
          </TabPane>
          <TabPane tab="Registrar periodo" key="5">
          <Card style={{ width:"100%",padding:"10px" }} title={<h6><strong>Agregar y eliminar periodo</strong></h6>}>
          <div className = "select">
          <Selec size="middle" defaultValue="Seleccione el periodo a deshabilitar" style={{ width: "35%" }} onChange={this.handleChange}>
            {this.state.periodo.map(row=>{
              return(<Option value={row.Descripcion}>{row.Descripcion}</Option>)
            })}
          </Selec>
          <Button  type = "danger"onClick={(e) => { if (window.confirm('Si desactiva el periodo no podrá habilitarlo nuevamente, Desea Continuar?')) this.DesactivarPeriodo()}}><MDBIcon icon="times" /></Button>
          </div>
          <div className="container">  

              <form className="form-layout">
                  <div className="form-group">
                      <div className="input-field">
                          <input
                              className="date-pickers"
                              type="text"
                              name="NombrePeriodo"
                              onChange={this.handleChange26}
                              required
                              placeholder='Nombre del periodo *'
                          />
                      </div>
                      <div className="date-pickers">
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                              <KeyboardDatePicker 
                                  margin="normal" 
                                  id="date-picker-inicio" 
                                  label="Fecha Inicial"  
                                  format="dd/MM/yyyy"
                                  value={this.state.inicial} 
                                  onChange={this.handleDateChange} 
                                  KeyboardButtonProps={{ 'aria-label': 'change date' }} 
                              />
                          </MuiPickersUtilsProvider>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                              <KeyboardDatePicker 
                                  margin="normal" 
                                  id="date-picker-fin" 
                                  label="Fecha Final" 
                                  format="dd/MM/yyyy" 
                                  value={this.state.final}
                                  onChange={this.handleDateChange2} 
                                  KeyboardButtonProps={{ 'aria-label': 'change date' }} 
                              />
                          </MuiPickersUtilsProvider>                                 
                      </div>
                  </div>
                  <div className="alert-dates">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                          <KeyboardDatePicker 
                              margin="normal" 
                              id="alerta-1" 
                              label="Alerta 1" 
                              format="dd/MM/yyyy" 
                              value={this.state.Alerta1}
                              onChange={this.handleAlerta1} 
                              KeyboardButtonProps={{ 'aria-label': 'change date' }} 
                          />
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                          <KeyboardDatePicker 
                              margin="normal" 
                              id="alerta-2" 
                              label="Alerta 2" 
                              format="dd/MM/yyyy" 
                              value={this.state.Alerta2}
                              onChange={this.handleAlerta2} 
                              KeyboardButtonProps={{ 'aria-label': 'change date' }} 
                          />
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                          <KeyboardDatePicker 
                              margin="normal" 
                              id="alerta-3" 
                              label="Alerta 3" 
                              format="dd/MM/yyyy" 
                              value={this.state.Alerta3}
                              onChange={this.handleAlerta3} 
                              KeyboardButtonProps={{ 'aria-label': 'change date' }} 
                          />
                      </MuiPickersUtilsProvider>
                  </div>
                  <Button type="primary" onClick={(e) => this.NuevoPeriodo()}>Registrar periodo</Button>
              </form>
          </div>
          </Card>
          </TabPane>
          <TabPane tab="Editar periodos" key="6">
          <Card style={{ width:"100%", padding:"15px" }} title = {<h6><strong>Editar periodo de evaluación</strong></h6>}>
          <div> 
          <form className="form-layout">
                  <div className="form-group">
                      <div className="input-field">
                          <input
                              className="date-pickers"
                              type="text"
                              name="NombrePeriodo"
                              onChange={this.handleChange27}
                              required
                              placeholder='Nuevo nombre del periodo *'
                          />
                      </div>
                      <div className="date-pickers">
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                      <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Fecha Final" format="dd/MM/yyyy"
                        value={this.state.final} onChange={this.handleDateChange2} 
                        KeyboardButtonProps={{'aria-label': 'change date',}}/>
                      </MuiPickersUtilsProvider>
                    
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                      <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 1" format="dd/MM/yyyy"
                          value={this.state.Alerta1} onChange={this.handleAlerta1}                        
                          KeyboardButtonProps={{'aria-label': 'change date',}}/>
                    </MuiPickersUtilsProvider>                               
                      </div>
                  </div>
                  <div className="alert-dates">
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
                      <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 2" format="dd/MM/yyyy"
                          value={this.state.Alerta2} onChange={this.handleAlerta2}
                          KeyboardButtonProps={{'aria-label': 'change date',}}/>
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>     
                      <KeyboardDatePicker margin="normal" id="date-picker-dialog" label="Alerta 3" format="dd/MM/yyyy"
                          value={this.state.Alerta3} onChange={this.handleAlerta3}
                          KeyboardButtonProps={{'aria-label': 'change date',}}/>
                    </MuiPickersUtilsProvider>
                  </div>
                  <Button type="primary" onClick={(e) => this.editarPeriodo()}>Editar periodo</Button>
              </form> 
            </div>    

          </Card>
          </TabPane>
          <TabPane tab="Historial de periodos" key="7">
          <Card style={{ width:"100%",padding:"25px" }} title = {<h6><strong>Historial de periodos</strong></h6>}>
            <div className = "select2">
            <Table bordered>
            <TableCell component="th" scope="row">
            <strong>Nombre</strong>
            </TableCell>
            <TableCell > <strong>Inicial </strong></TableCell>
            <TableCell > <strong>Final</strong></TableCell>
            <TableCell > <strong>Alerta1</strong></TableCell>
            <TableCell > <strong>Alerta2</strong></TableCell>
            <TableCell > <strong>Alerta3</strong></TableCell>             
            <TableBody>
                {this.state.allperiodo.map(rows => {
                  let evento;
                  let descripcion;
                  let eventoFinal;
                  let alerta1;
                  let alerta2;
                  let alerta3;
                  if(rows.EventoActivo === 'true'){
                    evento = <label style = {{color:'green'}}><strong>{rows.evento.substring(4,16).toUpperCase() }</strong></label>
                    descripcion  =<label style = {{color:'green'}}><strong>{rows.Descripcion.toUpperCase() + " (Periodo actual)"}</strong></label>
                  }else{
                    evento = rows.evento.substring(4,16).toUpperCase();
                    descripcion = rows.Descripcion.substring(0,16).toUpperCase();
                  }if(rows.eventoFinal === 'no hay Eventos'){
                    eventoFinal = rows.eventoFinal.toUpperCase();
                  }else {
                    eventoFinal = rows.eventoFinal.substring(4,16).toUpperCase();
                  }if(rows.alerta1 === 'no hay Eventos'){
                    alerta1 = rows.alerta1.toUpperCase();
                    }else {
                    alerta1 = rows.alerta1.substring(4,16).toUpperCase();
                    }if(rows.alerta2 === 'no hay Eventos'){
                      alerta2 = rows.alerta2.toUpperCase();
                    }else {
                      alerta2 = rows.alerta2.substring(4,16).toUpperCase();
                    }if(rows.alerta3 === 'no hay Eventos'){
                      alerta3 = rows.alerta3.toUpperCase();
                    }else {
                      alerta3 = rows.alerta3.substring(4,16).toUpperCase();
                    }
                  return (
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {descripcion}
                      </TableCell>
                      <TableCell >{evento}</TableCell>
                      <TableCell  >{eventoFinal}</TableCell>
                      <TableCell  >{alerta1}</TableCell>
                      <TableCell  >{alerta2} </TableCell>
                      <TableCell  >{alerta3} </TableCell>
                    </TableRow>                                
                  );
                })}
              </TableBody>
            </Table>
          </div>
            </Card>
          </TabPane>
          </Tabs>
        </div>
        }

return (
  <React.Fragment>
      <div>
          <Navbar modulo={"ADMINISTRACIÓN GENERAL"} />
          <center>{tablaInicial}</center>
          <div className="tablaEditar">
              {editarEmpleados}
              {editarCentroT}
              {editarPuestos}
              {editarDepartamentos}
              {cartaAdmin}
          </div>
      </div>
  </React.Fragment>
);
}
} 
export default AdminGral;

