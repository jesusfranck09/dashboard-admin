import React, { Component } from 'react'
import NavbarTeletrabajo from './navbarTeletrabajo';
import axios from 'axios'
import {API} from '../utils/http'
import MUIDataTable from "mui-datatables";
import { Tabs,Card,Button  } from 'antd';
import { MDBIcon } from 'mdbreact';
import { DialogUtility } from '@syncfusion/ej2-popups';
import swal from 'sweetalert'


const { TabPane } = Tabs;

class EmptyClass extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            size: 'middle',
            arrayVSS:[],
            arrayEC:[],
            periodoActivo:'',
            evaluacionEnviada:false
    
        }
        
    }
    componentWillMount = async() =>{
    const idAdmin= localStorage.getItem("idAdmin");
    let periodo = localStorage.getItem("periodo"); 
    let arrayDatos = [];
    let evaluacionesRealizadasPeriodoActual;
    let evaluacionVSSContestado;
    let evaluacionECContestado;
    let resultVSS;
    let resultEC;
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
              accesoPortal
              passwordPortal
              teletrabajo
                }
              }
              `
          }
        }).then((datos) => {
           let datosEmpleados = datos.data.data.getUsersTableEmployees;
           let filter  = datosEmpleados.filter(function(hero){
                return hero.teletrabajo ===  "true";
           })
           arrayDatos.push(filter); 
        }).catch(err=>{

        })

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
            evaluacionVSSContestado = evaluacionesRealizadasPeriodoActual.filter(function(hero){
              return hero.encuesta ==="VSS"
            }) 
            resultVSS = evaluacionVSSContestado.filter(function(hero){
              return hero.periodo === periodo 
            })
            let arrayInicial = arrayDatos[0];
            var arrayVSS = [];
            for (var i = 0; i < arrayInicial.length; i++) {
                var igual = false;
                for (var j = 0; j < resultVSS.length & !igual; j++) {
                    if(arrayInicial[i].id == resultVSS[j].id) 
                            igual=true;
                }
                if(!igual)arrayVSS.push(arrayInicial[i]);
            }
            this.setState({arrayVSS:arrayVSS})

            evaluacionECContestado = evaluacionesRealizadasPeriodoActual.filter(function(hero){
                return hero.encuesta ==="EC"
              }) 
              resultEC = evaluacionECContestado.filter(function(hero){
                return hero.periodo === periodo 
              })
              var arrayEC = [];
              for (var i = 0; i < arrayInicial.length; i++) {
                  var igual = false;
                  for (var j = 0; j < resultEC.length & !igual; j++) {
                      if(arrayInicial[i].id == resultEC[j].id) 
                              igual=true;
                  }
                  if(!igual)arrayEC.push(arrayInicial[i]);
              }
              this.setState({arrayEC:arrayEC})
        })
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
    sendMailTeletrabajo(data,param){
        var arrayEm = []
        if(data && data[0]){
            const idAdmin = localStorage.getItem("idAdmin");
            if ( this.state.periodoActivo > 0){

            data.map(rows=>{
                console.log("rows",rows)
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
                arrayEm.push({"id":rows[0],"nombre":rows[1],"folio":folio,"correo":rows[2]})
            })   

            for(let i = 0; i <= arrayEm.length; i ++){
                if(arrayEm[i]){
                  axios({
                    url:  API,
                    method:'post',
                    data:{
                    query:` 
                    mutation{
                      sendMailTeletrabajo(data:"${[arrayEm[i].nombre,arrayEm[i].id,param,idAdmin,arrayEm[i].folio,arrayEm[i].correo]}"){
                          message
                          folio
                            }
                          }
                        `
                    }
                    }).then(datos => { 
                        console.log("datos",datos)
                      this.setState({folioRecibido:datos.data.data.sendMailTeletrabajo})
                      if(datos.data.data.sendMailTeletrabajo.message === "envio exitoso"){
                        this.setState({evaluacionEnviada:true})
                        if(this.state.evaluacionEnviada === true){
                            swal("Notificación!",  `Su evaluación fue enviada exitosamente a ${data.length} Empleados` , "success");
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
    render() { 
        const { size } = this.state;
        let datosEmpleados;
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
                      array2.push([rows[0].data[0],rows[0].data[4],rows[0].data[5]])
                    }
                  })
                }
              }
            datosEmpleados = array2
            },
            onFilterChange: (action, filtroTable) => {
              }     
            };
        const columns = ["ID","Nombre", "Apellido P.",  "Apellido M.","Telefono","Correo","Centro de trabajo","Puesto"];
        const data = this.state.arrayVSS.map(rows=>{
        let telefono;
        if(rows.telefono){
            telefono = rows.telefono
        }else{
            telefono = "No proporcionado"
        }
        return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,telefono,rows.correo,rows.CentroTrabajo,rows.Puesto])
        })

        const columnsEC = ["ID","Nombre", "Apellido P.",  "Apellido M.","Telefono","Correo","Centro de trabajo","Puesto"];
        const dataEC = this.state.arrayEC.map(rows=>{
        let telefono;
        if(rows.telefono){
            telefono = rows.telefono
        }else{
            telefono = "No proporcionado"
        }
        return([rows.id,rows.nombre,rows.ApellidoP ,rows.ApellidoM ,telefono,rows.correo,rows.CentroTrabajo,rows.Puesto])
        })
       
        return ( 
            <div>
                <NavbarTeletrabajo/>
                
                <div className="tabs" style={{marginTop:"5%",marginLeft:"2%", width:"80%"}}>
                    <center>
                    <Tabs className='tabs' type="card" defaultActiveKey="1"  size={size}>
                        <TabPane tab="Evaluación VSS Teletrabajo" key="1">
                        <Card className="card" title = {<h6><strong>Evaluación VSS (Verificación y seguridad) Teletrabajo</strong></h6>} extra={<div><Button outline ghost type="primary" onClick={(e)=>this.sendMailTeletrabajo(datosEmpleados,1)}>Enviar evaluación VSS &nbsp;<i class="fas fa-arrow-circle-right"></i></Button>&nbsp;&nbsp;&nbsp;</div> }>    
                        <MUIDataTable
                            data={data}
                            columns={columns}
                            options={options}
                        />
                        </Card>
                        </TabPane>
                        {/* <TabPane tab="Evaluación EC Teletrabajo" key="2">
                        <Card className="card" title = {<h6><strong>Evaluación EC (Evaluación de la conformidad) Teletrabajo</strong></h6>} extra={<div><Button outline ghost type="primary" onClick={(e)=>this.sendMailTeletrabajo(datosEmpleados,2)}>Enviar evaluación EC &nbsp;<i class="fas fa-arrow-circle-right"></i></Button>&nbsp;&nbsp;&nbsp;</div> }>    
                        <MUIDataTable
                            data={dataEC}
                            columns={columnsEC}
                            options={options}
                        />
                        </Card>
                        </TabPane> */}
                        {/* <TabPane  tab="Evaluación RP" key="2">
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
                        /> */}
                        {/* </Card>  
                        </TabPane> */}
                    </Tabs>
                    </center>
                    </div>
                {/* <Empty description="Plataforma en construcción" style={{marginTop:"2%"}}></Empty> */}
            </div>

         );
    }
}
 
export default EmptyClass;