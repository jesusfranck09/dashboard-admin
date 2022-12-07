import React from 'react';
import { API} from '../utils/http'
import MUIDataTable from "mui-datatables";
import '../Home/index.css'
import {Button} from 'antd';
import axios from 'axios'
import { DialogUtility } from '@syncfusion/ej2-popups';
import Navbar from './navbar'
import { Tabs } from 'antd';
import './style.css';
import {Card} from 'antd'
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
          size: 'middle'
        };
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
      console.log("param",param)
      if(datosEmpleados && datosEmpleados[0]){
        const idAdmin = localStorage.getItem("idAdmin");
        if ( this.state.periodoActivo > 0){
        axios({
        url:  API,
        method:'post',
        data:{
        query:` 
        mutation{
          sendMail(data:"${[datosEmpleados,param,idAdmin]}"){
              message
                }
              }
            `
        }
        }).then(datos => { 
          console.log("datos",datos.data.data.sendMail)
          DialogUtility.alert({
            animationSettings: { effect: 'Zoom' },           
            content: `Su evaluación fue enviada exitosamente a ${datosEmpleados.length} Empleados`,
            title: 'Aviso!',
            position: "fixed"
            })
        }).catch(err=>{
          console.log("error", err.response)
        })
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

  render() {
    const { size } = this.state;
    const columns = ["ID","Nombre", "Apellido P.",  "Apellido M.","Correo","Centro de trabajo","Puesto"];
    const data = this.state.empleadosATS.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.correo,rows.CentroTrabajo,rows.Puesto])
    })
    const dataRP = this.state.empleadosRP.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.correo,rows.CentroTrabajo,rows.Puesto])
    })
    const dataEEO = this.state.empleadosEEO.map(rows=>{
      return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.correo,rows.CentroTrabajo,rows.Puesto])
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
              
    return (
       <React.Fragment>
        <div >
        <Navbar modulo = {"ENVÍO DE EVALUACIONES"} />
        <center>
        <div className="tabs" style={{marginTop:"5%",marginLeft:"5%", width:"90%"}}>
              <Tabs type="card" defaultActiveKey="1"  size={size}>
                <TabPane tab="Evaluación ATS" key="1">
                <Card className="card" title = {<h6><strong>Evaluación ATS</strong></h6>} extra={ <Button outline type="primary" onClick={(e)=>this.sendMail(datosEmpleados,1)}>Enviar evaluación ATS &nbsp;<i class="fas fa-arrow-circle-right"></i></Button>}>    
                <MUIDataTable
                    data={data}
                    columns={columns}
                    options={options}
                  />
                </Card>
                </TabPane>
                <TabPane  tab="Evaluación RP" key="2">
                <Card className="card" title = {<h6><strong>Evaluación RP</strong></h6>} extra={ <Button outline type="danger" onClick={(e)=>this.sendMail(datosEmpleadosRP,2)}>Enviar evaluación RP &nbsp;<i class="fas fa-angle-double-right"></i></Button>}>    
                <MUIDataTable
                    data={dataRP}
                    columns={columns}
                    options={optionsRP}
                  />
                </Card>
                </TabPane>
                <TabPane tab="Evaluación EEO" key="3">
                <Card className="card" title = {<h6><strong>Evaluación EEO</strong></h6>} extra={ <Button outline type="success" onClick={(e)=>this.sendMail(datosEmpleadosEEO,3)}>Enviar evaluación EEO &nbsp;<i class="fas fa-file-import"></i></Button>}>    
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
        </React.Fragment>
        );
      }
    }
export default TableEmployees