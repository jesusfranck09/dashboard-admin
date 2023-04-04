import React from 'react';
import { API} from '../utils/http'
import MUIDataTable from "mui-datatables";
import '../Home/index.css'
import {Button} from 'antd';
import axios from 'axios'
import { DialogUtility } from '@syncfusion/ej2-popups';
import Navbar from './navbar'
import { Tabs,message  } from 'antd';
import './style.css';
import {Card,Modal,Input} from 'antd'
import swal from 'sweetalert'
import { MDBIcon } from 'mdbreact';
import ReactWhatsapp from 'react-whatsapp';

const { TabPane } = Tabs;


class TableEmployees extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          periodoActivo:'',
          correos:[],
          empleadosATS:[],
          empleadosRP:[],
          empleadosEEO:[],
          size: 'middle',
          evaluacionEnviada:false,
          folioRecibido:[],
          dataEval:[],
          modalEval:false,
          dataModal:true,
          detallesEmpleado:[],
          details:false,
          telefonoEmpleado:'',
          urlWhatsapp:'',
          whatsappButton:false,
          dataEmpleadoWhatsapp:[]
        };
        this.onOk = this.onOk.bind(this)
      }
      componentWillMount(){
        let idAdmin = localStorage.getItem("idAdmin")
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
        this.getEmployeesPeriodo()
      }

    handleclick(){
    this.props.history.push("/profile")
    }
    onOk(){
      window.location.reload()
    }
    getEmployeesPeriodo = async() =>{
    let array7 = [];
  
    const idAdmin= localStorage.getItem("idAdmin");
    let periodo = localStorage.getItem("periodo"); 
    let arrayDatos = [];
    await axios({
      url:  API,
      method:'post',
      data:{
      query:`
          query{
            getUsersTableEmployees(data:"${idAdmin}"){
              id
              nombre
              ApellidoP
              ApellidoM
              Curp
              RFC
              FechaNacimiento
              Sexo
              CentroTrabajo
              EstadoCivil
              telefono
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
              ATSDetectado

                }
              }
              `
          }
          }).then((datos) => {
            
            let datosEmpleados = datos.data.data.getUsersTableEmployees;
            arrayDatos.push(datosEmpleados);                       
          })
          .catch((error) => {
          }); 

          let evaluacionesRealizadasPeriodoActual;
          let evaluacionATSContestado;
          let resultATS;
          let evaluacionRPContestado;
          let resultRP;
          let evaluacionEEOContestado;
          let resultEEO;

          axios({
          url:  API,
          method:'post',
          data:{
          query:`
            query{
                getEmployeesPerido(data:"${[idAdmin]}"){
                  id
                  nombre
                  ApellidoP
                  ApellidoM
                  CentroTrabajo
                  idPeriodo
                  periodo
                  encuesta
                  fk_empleados
  
                }
              }
            `
          }
        })
        .then(datos => {	
          evaluacionesRealizadasPeriodoActual =   datos.data.data.getEmployeesPerido;
          evaluacionesRealizadasPeriodoActual.sort(function(a,b) {return (a.ApellidoP > b.ApellidoP) ? 1 : ((b.ApellidoP > a.ApellidoP) ? -1 : 0);} );
          evaluacionATSContestado = evaluacionesRealizadasPeriodoActual.filter(function(hero){
            return hero.encuesta ==="ATS"
          }) 
          resultATS = evaluacionATSContestado.filter(function(hero){
            return hero.periodo === periodo 
          })
          let arrayInicial = arrayDatos[0];
          var arrayATS = [];
          for (var i = 0; i < arrayInicial.length; i++) {
              var igual=false;
              for (var j = 0; j < resultATS.length & !igual; j++) {
                  if(arrayInicial[i].id == resultATS[j].id) 
                          igual=true;
              }
              if(!igual)arrayATS.push(arrayInicial[i]);
          }
          this.setState({empleadosATS:arrayATS})
          evaluacionRPContestado = evaluacionesRealizadasPeriodoActual.filter(function(hero){
            return hero.encuesta === "RP"
          }) 
          resultRP = evaluacionRPContestado.filter(function(hero){
            return hero.periodo === periodo 
          })
      
          var arrayRP = [];
          for (var iRP = 0; iRP < arrayInicial.length; iRP++) {
              var igualRP=false;
              for (var jRP = 0; jRP < resultRP.length & !igualRP; jRP++) {
                  if(arrayInicial[iRP].id == resultRP[jRP].id) 
                          igualRP=true;
              }
              if(!igualRP)arrayRP.push(arrayInicial[iRP]);
          }
          this.setState({empleadosRP:arrayRP})
          evaluacionEEOContestado = evaluacionesRealizadasPeriodoActual.filter(function(hero){
            return hero.encuesta === "EEO"
          }) 
          resultEEO = evaluacionEEOContestado.filter(function(hero){
            return hero.periodo === periodo 
          })
          var arrayEEO = [];
          for (var iEEO = 0; iEEO < arrayInicial.length; iEEO++) {
              var igualEEO=false;
              for (var jEEO = 0; jEEO < resultEEO.length & !igualEEO; jEEO++) {
                  if(arrayInicial[iEEO].id == resultEEO[jEEO].id) 
                          igualEEO=true;
              }
              if(!igualEEO)arrayEEO.push(arrayInicial[iEEO]);
          }
          this.setState({empleadosEEO:arrayEEO})
        })
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
    sendMail =  (datosEmpleados,param) =>{
      var array = []
      if(datosEmpleados && datosEmpleados[0]){
        const idAdmin = localStorage.getItem("idAdmin");
        if ( this.state.periodoActivo > 0){
          datosEmpleados.map(rows=>{
            let año  = new Date().getFullYear()
            function generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xAxxyx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                return uuid;
            }
          let folio = (año + generateUUID()).toUpperCase();

          array.push({"id":rows[0],"nombre":rows[1],"folio":folio})
          })
          console.log("array",array)
        for(let i = 0; i <= array.length; i ++){
          if(array[i]){
            axios({
              url:  API,
              method:'post',
              data:{
              query:` 
              mutation{
                sendMail(data:"${[array[i].nombre,array[i].id,param,idAdmin,array[i].folio]}"){
                    message
                    folio
                      }
                    }
                  `
              }
              }).then(datos => { 
                this.setState({folioRecibido:datos.data.data.sendMail})
                if(datos.data.data.sendMail.message === "envio exitoso"){
                  this.setState({evaluacionEnviada:true})
                  if(this.state.evaluacionEnviada === true){
                      swal("Notificación!",  `Su evaluación fue enviada exitosamente a ${datosEmpleados.length} Empleados` , "success");
                  }
                }else{
                  swal("Aviso!", "Algo salió mal!", "error");
                }
                
              }).catch(err=>{
                console.log("error", err)

                console.log("error", err.response)
              })
          }
        }
      }
      }else{
        DialogUtility.alert({
          animationSettings: { effect: 'Zoom' },           
          content: `Por favor seleccione al menos un empleado para enviar el correo`,
          title: 'Aviso!',
          position: "fixed"
          })
          setTimeout(()=>{
            window.location.reload()
          },2000)
      } 
    }    
      onChange = e => {
        this.setState({ size: e.target.value });
      };
        onChange = e => {
          this.setState({ size: e.target.value });
        };

    generarLiga = async(param1, param2)=>{
      console.log("param1",param1)
      // await this.sendMail(param1,param2);
      const idAdmin = localStorage.getItem("idAdmin");

      let encuesta;
      if(param2 === 1){
        encuesta = "ATS";
      }if(param2 === 2){
        encuesta = "RP";
      }
      if(param2 === 3){
        encuesta = "EEO";
      }
      let array2 = [];

      let array = []

      if(param1 ){
        if(param1[0]){
        param1.map(rows=>{
        let año  = new Date().getFullYear()
        function generateUUID() {
            var d = new Date().getTime();
            var uuid = 'xAxxyx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }
        let folio = (año + generateUUID()).toUpperCase();

       array2.push({"id":rows[0],"nombre":rows[1],"folio":folio})
          
        })
        let arrayEmpleados = [] 
        for(let i = 0; i <= array2.length; i ++){
          if(array2[i]){
             axios({
              url:  API,
              method:'post',
              data:{
              query:` 
              query{
                verifySurvey(data:"${[array2[i].nombre,array2[i].id,encuesta,idAdmin,array2[i].folio]}"){
                  idtokenEvaluaciones
                  codigoSeguridad
                  fechaCreacionToken
                  fechaExpiraicionToken
                  statusToken
                  evaluacion
                  fk_empleados
                      }
                    }
                  `
              }
              }).then(datos => { 
                let data = datos.data.data.verifySurvey[0];
                if(data){  
                  array.push(data)
                  this.setState({dataEval:array})
                  this.setState({modalEval:true})
                  console.log("array",array)
                }
              }).catch(err=>{
                console.log("error", err)
      
                console.log("error", err.response)
            })
          }
        }
       
      }else{
        swal("Notificación!",  `Seleccione una opción válida ` , "error");
      }
      // 
    }else{
      swal("Notificación!",  `Seleccione una opción válida ` , "error");
    }
    }
    details(param,index){
      if(index === 1){
        let dataEmpleado = this.state.empleadosATS.filter(function(rows){
          return rows.id === param.fk_empleados
        })

        this.setState({detallesEmpleado:dataEmpleado})
        this.setState({dataModal:false})
        this.setState({details:true})

    }
    }
    closeDetails(){
        this.setState({dataModal:true})
        this.setState({details:false})
    
    }
    copytext(param){
      message.info('Aviso!');
      message.info('URL copiado!');

      navigator.clipboard.writeText("https://eval.diagnostico035.com/politicaPrivacidad:&" + param.fk_empleados + "%" + param.codigoSeguridad)
    }
    sendWhatsapp(rows,param){
      if(param === 1){
        this.setState({whatsappButton:true})
        this.setState({dataModal:false})
        this.setState({details:false})

        let idEmpleado = rows.fk_empleados
        let datosEmpleados = this.state.empleadosATS
  
        let dataEmpleado = datosEmpleados.filter(function(hero){
          return hero.id === idEmpleado
        })
        if(dataEmpleado[0].telefono){
          let telefono = dataEmpleado[0].telefono
          let urlWhatsapp = `https://eval.diagnostico035.com/politicaPrivacidad:&${rows.fk_empleados}%${rows.codigoSeguridad}`
          const parser = new DOMParser();
          const decodedString = parser.parseFromString(`<!doctype html><body>${urlWhatsapp}`,'text/html').body.textContent;
          this.setState({telefonoEmpleado:telefono})
          this.setState({urlWhatsapp:decodedString})
          this.setState({dataEmpleadoWhatsapp:dataEmpleado})
        }else{
          swal("Notificación!",  `El empleado no cuenta con un número registrado, agregue uno en "Administración general/Editar empleado/ Teléfono" e inténtelo nuevamente` , "warning");

        }
      
      }
      
    }
  render() {
    const { size } = this.state;
    const columns = ["ID","Nombre", "Apellido P.",  "Apellido M.","Telefono","Correo","Centro de trabajo","Puesto"];
    const data = this.state.empleadosATS.map(rows=>{
      let telefono;
      if(rows.telefono){
        telefono = rows.telefono
      }else{
        telefono = "No proporcionado"
      }
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,telefono,rows.correo,rows.CentroTrabajo,rows.Puesto])
    })
    const dataRP = this.state.empleadosRP.map(rows=>{
      let telefono;
      if(rows.telefono){
        telefono = rows.telefono
      }else{
        telefono = "No proporcionado"
      }
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,telefono,rows.correo,rows.CentroTrabajo,rows.Puesto])
    })
    const dataEEO = this.state.empleadosEEO.map(rows=>{
      let telefono;
      if(rows.telefono){
        telefono = rows.telefono
      }else{
        telefono = "No proporcionado"
      }
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM,telefono ,rows.correo,rows.CentroTrabajo,rows.Puesto])
    })
    const columnss = ["Evaluación","Fecha", "Nombre",  "Apellido P.","Apellido M.","Curp","Status"];
    const datas = this.state.correos.map(rows=>{
      return([rows.Encuesta,rows.fecha,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.Curp,"Enviado"])
    })

    let datosEmpleados;
    let datosEmpleadosRP;
    let datosEmpleadosEEO;
    let datos;
    const options = {
        elevation:0,  
        print:false,
        download:false,
        viewColumns:false, 
        filterType: "dropdown",
        responsive: "stacked",
        textLabels: {
          body: {
            noMatch: "Consultando información",
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
          let array2 = []
          let param1 = tableState.selectedRows.data
          if(param1[0]){
            let array = []
            param1.map(param =>{
              let filter = tableState.data.filter(function(rows){
                return  rows.index  === param.dataIndex
              })

              array.push(filter)
            })
            if(array[0]){
              array.map(rows=>{
                if(rows[0]){
                  array2.push([rows[0].data[0],rows[0].data[4]])
                }
              })
            }
          }
        datosEmpleados = array2
        },
        onFilterChange: (action, filtroTable) => {
          }     
        };

          const optionsRP = {
            print:false,
            download:false,
            viewColumns:false,
            elevation:0,  
            filterType: "dropdown",
            responsive: "stacked",
            textLabels: {
              body: {
                noMatch: "Consultando información",
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
              let array2 = []
              let param1 = tableState.selectedRows.data
              if(param1[0]){
                let array = []
                param1.map(param =>{
                  let filter = tableState.data.filter(function(rows){
                    return  rows.index  === param.dataIndex
                  })
    
                  array.push(filter)
                })
                if(array[0]){
                  array.map(rows=>{
                    if(rows[0]){
                      array2.push([rows[0].data[0],rows[0].data[4]])
                    }                  })
                }
              }
            datosEmpleadosRP = array2
            },
            onFilterChange: (action, filtroTable) => {
              } };

              const optionsEEO = {
                print:false,
                download:false,
                viewColumns:false,
                elevation:0,  
                filterType: "dropdown",
                responsive: "stacked",
                textLabels: {
                    body: {
                      noMatch: "Consultando información",
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
                  let array2 = []
                  let param1 = tableState.selectedRows.data
                  if(param1[0]){
                    let array = []
                    param1.map(param =>{
                      let filter = tableState.data.filter(function(rows){
                        return  rows.index  === param.dataIndex
                      })
                      array.push(filter)
                    })
                    if(array[0]){
                      array.map(rows=>{
                        if(rows[0]){
                          array2.push([rows[0].data[0],rows[0].data[4]])
                        }                     
                      })
                    }
                  }

                if(param1[0]){
                  datosEmpleadosEEO = array2
                }else{
                  datosEmpleadosEEO = tableState.displayData
                }   
                },
                onFilterChange: (action, filtroTable) => {
                } };

                let whatsapp;
                let modalEval;
                if(this.state.modalEval === true){
                  let dataDetails;  
                  if(this.state.details === true){
                  if(this.state.detallesEmpleado[0]){
                    let dataEmpleado = this.state.detallesEmpleado[0]
                      dataDetails = <div className='detailsEmpleados'>
                        <table className='table table-bordered  table-small  table-striped'>
                        <Button type='danger' onClick={e=>this.closeDetails()}><MDBIcon fas icon="times" /></Button>
                          <tr>
                            <td>ID:</td>
                            <td>{dataEmpleado.id}</td>
                          </tr>
                          <tr>
                            <td>Nombre:</td>
                            <td>{dataEmpleado.nombre + " " + dataEmpleado.ApellidoP + " " + dataEmpleado.ApellidoM }</td>
                          </tr>
                          <tr>
                            <td>RFC:</td>
                            <td>{dataEmpleado.RFC}</td>
                          </tr>
                          <tr>
                            <td>Centro de trabajo:</td>
                            <td>{dataEmpleado.CentroTrabajo}</td>
                          </tr>
                          <tr>
                            <td>Correo:</td>
                            <td>{dataEmpleado.correo}</td>
                          </tr>
                          <tr>
                            <td>Puesto:</td>
                            <td>{dataEmpleado.Puesto}</td>
                          </tr>
                        </table>
                      </div>
                  }
                }
                  let dataModal;
                  if(this.state.dataModal === true ){
                    dataModal = this.state.dataEval.map(rows=>{
                      if(rows){
                        return(
                          <div className='row'>
                           <div className='input'>
                            <input  value={"ID: "+ rows.fk_empleados } disabled style={{width:"10%",fontWeight:"bold"}}></input><Input  value={"https://eval.diagnostico035.com/politicaPrivacidad:&" + rows.fk_empleados + "%" + rows.codigoSeguridad}></Input>
                            </div>
                            <div className='button'>
                              <Button  class="addMore" title="Detalles del empleado" shape="circle" type='primary' onClick={e=>this.details(rows,1)}><MDBIcon fas icon="info" /></Button>
                              <Button size='large' class="addMore" title="Copiar texto" shape="circle" type='link' onClick={(e) => {this.copytext(rows)}}><MDBIcon fas icon="copy" /></Button>
                              <Button  class="addMore" title="Enviar por whatsapp" shape="circle" type="success" onClick={(e) => {this.sendWhatsapp(rows,1)}}><MDBIcon fab icon="whatsapp" /></Button>
                            </div >
                            <br></br><br></br>
                          </div>
                        )
                      }
                    })
                  }
                  if(this.state.whatsappButton === true){
                    if(this.state.telefonoEmpleado && this.state.urlWhatsapp){
                      let param = this.state.dataEmpleadoWhatsapp[0]
                      const parser = new DOMParser();
                      const decodedString = parser.parseFromString(`<!doctype html><body>${this.state.urlWhatsapp}`,'text/html').body.textContent;

                      whatsapp = 
                      <div>
                      <table className='table table-bordered table table-small table table-striped'>
                        <tr>
                          <td>Nombre del empleado:</td>
                          <td>{param.nombre +  " " + param.ApellidoP + " " + param.ApellidoM}</td>
                        </tr>
                        <tr>
                          <td>Teléfono</td>
                          <td>{param.telefono}</td>
                        </tr>
                      </table>
                      <div className='input'>
                      <strong>Enlace para copiar</strong> <br></br><br></br>
                      <Input value={this.state.urlWhatsapp}></Input>
                      </div>
                      <br/>
                      <center><ReactWhatsapp className='button1' number={this.state.telefonoEmpleado} message= {`Adjunto en este mensaje la liga de acceso al sistema de evaluaciones. No olvide completar de forma satisfactoria el total de preguntas antes de enviar su evaluación. Acceda al siguiente link para completar el proceso.
                      
                      `}>Abrir link</ReactWhatsapp></center>
                      </div>
                    }
                  }
                    modalEval = <Modal width={"70%"} title={"Enlaces generados"} visible = {this.state.modalEval} onOk={this.onOk} onCancel = {this.onOk}>
                    {dataModal}
                    {dataDetails}
                    {whatsapp}
                  </Modal>                 
                }
               
              
    return (
       <React.Fragment>
        <div >
        <Navbar modulo = {"ENVÍO DE EVALUACIONES"} />
        <center>
        <div className="tabs" style={{marginTop:"5%",marginLeft:"5%", width:"80%"}}>
              <Tabs type="card" defaultActiveKey="1"  size={size}>
                <TabPane tab="Evaluación ATS" key="1">
                <Card className="card" title = {<h6><strong>Evaluación ATS</strong></h6>} extra={<div><Button outline type="primary" onClick={(e)=>this.sendMail(datosEmpleados,1)}>Enviar evaluación ATS &nbsp;<i class="fas fa-arrow-circle-right"></i></Button>&nbsp;&nbsp;&nbsp;<Button shape='cicle' size='middle' type='warning' onClick = {e=> this.generarLiga(datosEmpleados,1)}>Generar URL  &nbsp;<MDBIcon fas icon="share" /></Button></div> }>    
                <MUIDataTable
                    data={data}
                    columns={columns}
                    options={options}
                  />
                </Card>
                </TabPane>
                <TabPane  tab="Evaluación RP" key="2">
                <Card className="card" title = {<h6><strong>Evaluación RP</strong></h6>} extra={<div><Button outline type="danger" onClick={(e)=>this.sendMail(datosEmpleadosRP,2)}>Enviar evaluación RP &nbsp;<i class="fas fa-angle-double-right"></i></Button>&nbsp;&nbsp;&nbsp;<Button shape='cicle' size='middle' type='warning' onClick = {e=> this.generarLiga(datosEmpleadosRP,2)}>Generar URL  &nbsp;<MDBIcon fas icon="share" /></Button></div>}>    
                <MUIDataTable
                    data={dataRP}
                    columns={columns}
                    options={optionsRP}
                  />
                </Card>
                </TabPane>
                <TabPane tab="Evaluación EEO" key="3">
                <Card className="card" title = {<h6><strong>Evaluación EEO</strong></h6>} extra={<div> <Button outline type="success" onClick={(e)=>this.sendMail(datosEmpleadosEEO,3)}>Enviar evaluación EEO &nbsp;<i class="fas fa-file-import"></i></Button> &nbsp;&nbsp;&nbsp;<Button shape='cicle' size='middle' type='warning' onClick = {e=> this.generarLiga(datosEmpleadosEEO,3)}>Generar URL  &nbsp;<MDBIcon fas icon="share" /></Button></div>}>    
                <MUIDataTable
                    data={dataEEO}
                    columns={columns}
                    options={optionsEEO}
                  />
                  
                </Card> 
                </TabPane>
                <TabPane tab="Correos enviados" key="4">
                <Card className="card" title = {<h6><strong>Correos enviados</strong></h6>}>    
                  <MUIDataTable
                    data={datas}
                    columns={columnss}
                    options={options}
                  />
                </Card>  
                  </TabPane>
              </Tabs>
            </div>
            </center>
        </div>   
        {modalEval}
        </React.Fragment>
        );
      }
    }
export default TableEmployees