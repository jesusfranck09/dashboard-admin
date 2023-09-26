import React, { Component } from 'react'
import NavbarTeletrabajo from '../../Home/navbarTeletrabajo';
import axios from 'axios'
import { API } from '../../utils/http';
import { Button, Card } from 'antd';
import MUIDataTable from "mui-datatables";
import { DialogUtility } from '@syncfusion/ej2-popups';
import ReportVSSI from './ReportVSSI';
import '../styles.css';


class VSS extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tablaPeriodoActual:true,
            empleados:[],
            resultados:[],
            reporteIndividual:false
         }
    }

    async componentWillMount(){
        var LaFecha=new Date();
        var Mes=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        var diasem=['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        var diasemana=LaFecha.getDay();
        var FechaCompleta="";
        var NumeroDeMes="";    
        NumeroDeMes=LaFecha.getMonth();
        FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
        this.setState({date:FechaCompleta}) 
        await this.getGlobalEmployees();
        }

        getGlobalEmployees = async () =>{
            let periodo =  localStorage.getItem("periodo")
            this.setState({spinner:true})
            var totalEmpleados = [];
            var datasort;
            var idAdmin  =  localStorage.getItem("idAdmin")    
            let evaluacionesRealizadasPeriodoActual;
            let evaluacionVSS;
            let result;
            await axios({
              url:  API,
              method:'post',
              data:{
              query:`
               query{
                getallPeriodo(data:"${[idAdmin]}"){
                 Descripcion
                 EventoActivo
                      }
                    }
                  `
              }
            })
            .then(datos => {	
              this.setState({todosLosPeriodos:datos.data.data.getallPeriodo})
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
              evaluacionVSS = evaluacionesRealizadasPeriodoActual.filter(function(hero){
                return hero.encuesta === "VSS"
              })
              this.setState({evaluacionesTodosLosPeriodos:evaluacionVSS}) 
              evaluacionVSS.map(rows=>{
                  axios({
                    url:  API,
                    method:'post',
                    data:{
                    query:`
                      query{
                        getresultGlobalSurveyVSS(data:"${[rows.id,rows.periodo]}"){
                        id 
                        Respuestas 
                        fk_preguntasVSS
                        fk_Empleados 
                        nombre 
                        ApellidoP 
                        ApellidoM 
                        Curp 
                        RFC 
                        FechaNacimiento 
                        Sexo 
                        EstadoCivil 
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
                        CentroTrabajo
                        fk_administrador 
                        fk_correos 
                        Periodo
                            }
                          }
                        `
                    }
                    }).then(datos => {  
                      totalEmpleados.push(datos.data.data.getresultGlobalSurveyVSS)
                      const list = totalEmpleados[0].sort((a,b) => a.fk_preguntasVSS - b.fk_preguntasVSS).map((exemple, index, array) => exemple)
                      this.setState({peticion:list})
                    })
                    .catch(err => {
                      console.log("err",err.response)
                      console.log("err",err)
                    });  
                  })
                  result = evaluacionVSS.filter(function(hero){
                    return hero.periodo === periodo 
                  })
                  this.setState({empleados:result}) 
                }).catch(err=>{
                  console.log("err" , err.response)
                  console.log("err" , err)
                })
                await axios({
                url:  API,
                method:'post',
                data:{ 
                query:`
                query{
                  getEmployeesResolvesVSS(data:"${[idAdmin]}"){
                    id
                    nombre
                    ApellidoP
                    ApellidoM
                    Sexo
                    AreaTrabajo
                    Puesto
                    periodo
                    CentroTrabajo
                      }
                    }
                    `
                }
                }).then(datos => {
                  datasort =  datos.data.data.getEmployeesResolvesVSS
                  datasort.sort(function(a,b) {return (a.ApellidoP > b.ApellidoP) ? 1 : ((b.ApellidoP > a.ApellidoP) ? -1 : 0);} );
                  let arrayFilter = datasort.filter(e => e.periodo === periodo)
                  this.setState({tablaEmpleados:arrayFilter}) 
                  }).catch(err=>{
                    console.log("error" ,err)
                  }) 
                  this.setState({spinner:false})
        }
        reporteIndividual(id,periodo){  
            axios({
              url:  API,
              method:'post',
              data:{
              query:`
                query{
                resultSingleSurveyVSS(data:"${[id,periodo]}"){
                  id 
                  Respuestas 
                  fk_preguntasVSS 
                  fk_Empleados 
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
                  fk_correos 
                      }
                    }
                  `
              }
              }).then(datos => {   
              if(datos.data.data.resultSingleSurveyVSS.length > 0 ){
              const list = datos.data.data.resultSingleSurveyVSS.sort((a,b) => a.fk_preguntasVSS - b.fk_preguntasVSS).map((exemple, index, array) => exemple)
              this.setState({resultados:'' })  
              this.setState({resultados:list })    
              this.setState({reporteIndividual:true})
              this.setState({tablaPeriodoActual:false}) 
              this.setState({tablaPeriodoSeleccionado:false})            
            } if(datos.data.data.resultSingleSurvey.length <= 0){
              DialogUtility.alert({
                animationSettings: { effect: 'Zoom' },           
                title: "Su colaborador aun no responde la evaluación",
                // title: 'Aviso!',
                position: "fixed"
                });
            }
            })
            .catch(err => {
              console.log("el error es  ",err)
            });  
        }
    render() { 
        let datosEmpleados;
        let filtro;
        let periodoTabla;
        let arrayFilter2 = [];
        const options = {
            elevation:0,
            viewColumns:false, 
            filterType: "dropdown",
            responsive: "stacked",
            sort:true,
            textLabels: {
              body: {
                noMatch: "Consultando información ...",
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
            datosEmpleados=tableState.displayData
            periodoTabla = tableState.filterData[3]
            },
            onFilterChange: (action, filtroTable) => {
              filtro = filtroTable
              if(filtro[0]){
                arrayFilter2.push({id:filtro[0]})
              }if(filtro[1]){
                arrayFilter2.push({nombre:filtro[1]})
              }if(filtro[2]){
                arrayFilter2.push({centroTrabajo:filtro[2]})
              }if(filtro[3]){
                arrayFilter2.push({periodo:filtro[3]})
              }if(filtro[4]){
                arrayFilter2.push({evaluacion:filtro[4]})
              }if(filtro[5]){
                arrayFilter2.push({status:filtro[5]})
              }
              this.setState({filtroTabla:arrayFilter2})
            }     
        };
        let tablaPeriodoActual;
        if(this.state.tablaPeriodoActual === true) {
        let periodo;
        periodo = localStorage.getItem("periodo")
        const columns = ["ID","Nombre","Centro de Trabajo","Periodo","Evaluación","Status",{name: "Respuestas",label: "Respuestas",options:{filter: false,sort: true,}}];
        const data = this.state.empleados.map(rows=>{
        if(rows){
          let boton =<Button  className = "text-white"  type="primary" onClick={(e) => this.reporteIndividual(rows.id,rows.periodo)} disabled={this.state.disabledButtons}>Resultados&nbsp;&nbsp;<i class="fas fa-diagnoses"></i></Button>
          return([rows.id,rows.nombre+" "+rows.ApellidoP + " "+rows.ApellidoM,rows.CentroTrabajo,rows.periodo,rows.encuesta,"Vigente",boton])
            }
        })

        let tituloTabla =  <h6><strong>Reportes VSS modelo Teletrabajo {periodo}</strong></h6>
        tablaPeriodoActual = 
        <div>
            <center>
                <Card style={{width:"100%",marginTop:"5%",marginLeft:"3%"}} className="cardATS" title={tituloTabla}>    
                    <MUIDataTable
                    data={data}
                    columns={columns}
                    options={options}
                    />
                </Card>
            </center>
        </div>
        }

        let pdfView1;
        if(this.state.resultados.length>0 && this.state.reporteIndividual === true){             
            let value3,value4,value5,value6,value7,value8,value9,value10,value11,value12,value13,value14,value15,value16,value17,value18,value19,value20;
            let value21,value22,value23,value24,value25,value26,value27,value28,value29,value30;
            let value31,value32,value33,value34,value35,value36,value37,value38,value39,value40;
            let value41,value42,value43,value44,value45,value46,value47,value48,value49,value50;
            let value51,value52,value53,value54,value55,value56,value57,value58,value59,value60;
            let value61,value62,value63,value64,value65,value66,value67,value68,value69,value70,value71,value72,value73,value74,value75,value76,value77,value78,value79,value80;
            let value81,value82,value83,value84,value85,value86,value87,value88,value89,value90,value91,value92,value93,value94,value95,value96,value97,value98,value99,value100;
            let value101,value102,value103,value104,value105,value106,value107,value108,value109,value110,value111,value112,value113,value114;


            let filtrar3,filtrar4,filtrar5,filtrar6,filtrar7,filtrar8,filtrar9,filtrar10,filtrar12,filtrar13,filtrar14,filtrar15,filtrar16;
            let filtrar17,filtrar24,filtrar31,filtrar38,filtrar45,filtrar52,filtrar61,filtrar71,filtrar81,filtrar91,filtrar101,filtrar108;
            let filtrar18,filtrar25,filtrar32,filtrar39,filtrar46,filtrar53,filtrar62,filtrar72,filtrar82,filtrar92,filtrar102,filtrar109;
            let filtrar19,filtrar26,filtrar33,filtrar40,filtrar47,filtrar54,filtrar63,filtrar73,filtrar83,filtrar93,filtrar103,filtrar110;
            let filtrar20,filtrar27,filtrar34,filtrar41,filtrar48,filtrar55,filtrar64,filtrar74,filtrar84,filtrar94,filtrar104,filtrar111;
            let filtrar21,filtrar28,filtrar35,filtrar42,filtrar49,filtrar56,filtrar65,filtrar75,filtrar85,filtrar95,filtrar105,filtrar112;
            let filtrar22,filtrar29,filtrar36,filtrar43,filtrar50,filtrar57,filtrar66,filtrar76,filtrar86,filtrar96,filtrar106,filtrar113;
            let filtrar23,filtrar30,filtrar37,filtrar44,filtrar51,filtrar58,filtrar67,filtrar77,filtrar87,filtrar97,filtrar107,filtrar114;

            let filtrar59,filtrar60,filtrar68,filtrar69,filtrar70,filtrar78,filtrar79,filtrar80,filtrar88,filtrar89,filtrar90,filtrar98,filtrar99,filtrar100,filtrar11;

            let dia1,dia2,dia3,dia4,dia5,dia6,dia7,dia8,dia9,dia10,dia11,dia12,dia13,dia14;
            let res = this.state.resultados
            if(res[0].Respuestas === "NO APLICA"){
                dia1 = ""
            }else{
                dia1 = res[0].Respuestas 
            } if(res[1].Respuestas === "NO APLICA"){
                dia2 = ""
            }else{
                dia2 = res[1].Respuestas 
            } if(res[2].Respuestas === "NO APLICA"){
                dia3 = ""
            }else{
                dia3 = res[2].Respuestas 
            } if(res[3].Respuestas === "NO APLICA"){
                dia4 = ""
            }else{
                dia4 = res[3].Respuestas 
            } if(res[4].Respuestas === "NO APLICA"){
                dia5 = ""
            }else{
                dia5 = res[4].Respuestas 
            } if(res[5].Respuestas === "NO APLICA"){
                dia6 = ""
            }else{
                dia6 = res[5].Respuestas 
            } if(res[6].Respuestas === "NO APLICA"){
                dia7 = ""
            }else{
                dia7 = res[6].Respuestas 
            } if(res[7].Respuestas === "NO APLICA"){
                dia8 = ""
            }else{
                dia8 = res[7].Respuestas 
            } if(res[8].Respuestas === "NO APLICA"){
                dia9 = ""
            }else{
                dia9 = res[8].Respuestas 
            } if(res[9].Respuestas === "NO APLICA"){
                dia10 = ""
            }else{
                dia10 = res[9].Respuestas 
            } if(res[10].Respuestas === "NO APLICA"){
                dia11 = ""
            }else{
                dia11 = res[10].Respuestas 
            } if(res[11].Respuestas === "NO APLICA"){
                dia12 = ""
            }else{
                dia12 = res[11].Respuestas 
            } if(res[12].Respuestas === "NO APLICA"){
                dia13 = ""
            }else{
                dia13 = res[12].Respuestas 
            } if(res[13].Respuestas === "NO APLICA"){
                dia14 = ""
            }else{
                dia14 = res[13].Respuestas 
            }


            filtrar3 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "3";
              });
              filtrar4 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "4";
              });
              filtrar5 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "5";
              });
              filtrar6 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "6";
              });
              filtrar7 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "7";
              });
              filtrar8 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "8";
              });
              filtrar9 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "9";
              });
              filtrar10 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "10";
              });
              filtrar11 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "11";
              });
              filtrar12 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "12";
              });
              filtrar13 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "13";
              });
              filtrar14 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "14";
              });
              filtrar15 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "15";
              });
              filtrar16 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "16";
              });
  
              filtrar17 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "17";
              });
              filtrar18 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "18";
              });
              filtrar19 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "19";
              });
              filtrar20 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "20";
              });
              filtrar21 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "21";
              });
              filtrar22 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "22";
              });
              filtrar23 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "23";
              });
              filtrar24 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "24";
              });
              filtrar25 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "25";
              });
              filtrar26 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "26";
              });
              filtrar27 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "27";
              });
              filtrar28 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "28";
              });
              filtrar29 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "29";
              });
              filtrar30 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "30";
              });
              filtrar31 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "31";
              });
              filtrar32 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "32";
              });
              filtrar33 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "33";
              });
              filtrar34 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "34";
              });
              filtrar35 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "35";
              });
              filtrar36 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "36";
              });
              filtrar37 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "37";
              });
              filtrar38 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "38";
              });
              filtrar39 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "39";
              });
              filtrar40 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "40";
              });
              filtrar41 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "41";
              });
              filtrar42 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "42";
              });
              filtrar43 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "43";
              });
              filtrar44 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "44";
              });
              filtrar45 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "45";
              });
              filtrar46 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "46";
              });
              filtrar47 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "47";
              });
              filtrar48 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "48";
              });
              filtrar49 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "49";
              });
              filtrar50 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "50";
              });
              filtrar51 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "51";
              });
              filtrar52 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "52";
              });
              filtrar53 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "53";
              });
              filtrar54 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "54";
              });
              filtrar55 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "55";
              });
              filtrar56 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "56";
              });
              filtrar57 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "57";
              });
              filtrar58 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "58";
              });
              filtrar59 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "59";
              });
              filtrar60 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "60";
              });
              filtrar61 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "61";
              });
              filtrar62 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "62";
              });
              filtrar63 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "63";
              });
              filtrar64 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "64";
              });
              filtrar65 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "65";
              });
              filtrar66 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "66";
              });
              filtrar67 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "67";
              });
              filtrar68 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "68";
              });
              filtrar69 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "69";
              });
              filtrar70 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "70";
              });
              filtrar71 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "71";
              });
              filtrar72 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "72";
              });
              filtrar73 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "73";
              });
              filtrar74 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "74";
              });
              filtrar75 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "75";
              });
              filtrar76 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "76";
              });
              filtrar77 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "77";
              });
              filtrar78 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "78";
              });
              filtrar79 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "79";
              });
              filtrar80 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "80";
              });
              filtrar81 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "81";
              });
              filtrar82 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "82";
              });
              filtrar83 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "83";
              });
              filtrar84 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "84";
              });
              filtrar85 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "85";
              });
              filtrar86 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "86";
              });
              filtrar87 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "87";
              });
              filtrar88 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "88";
              });
              filtrar89 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "89";
              });
              filtrar90 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "90";
              });
              filtrar91=  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "91";
              });
              filtrar92 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "92";
              });
              filtrar93 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "93";
              });
              filtrar94 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "94";
              });
              filtrar95 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "95";
              });
              filtrar96 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "96";
              });
              filtrar97 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "97";
              });
              filtrar98 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "98";
              });
              filtrar99 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "99";
              });
              filtrar100 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "100";
              });
              filtrar101 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "101";
              });
              filtrar102 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "102";
              });
              filtrar103 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "103";
              });
              filtrar104 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "104";
              });
              filtrar105 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "105";
              });
              filtrar106 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "106";
              });
              filtrar107 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "107";
              });
              filtrar108 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "108";
              });
              filtrar109 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "109";
              });
              filtrar110 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "110";
              });
              filtrar111 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "111";
              });
              filtrar112 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "112";
              });
              filtrar113 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "113";
              });
              filtrar114 =  this.state.resultados.filter(function(hero) {
                return hero.fk_preguntasVSS === "114";
              });

            value3 = filtrar3.pop();
            value4 = filtrar4.pop();
            value5 = filtrar5.pop();
            value6 = filtrar6.pop();
            value7 = filtrar7.pop();
            value8 = filtrar8.pop();
            value9 = filtrar9.pop();
            value10 = filtrar10.pop();
            value11 = filtrar11.pop();
            value12 = filtrar12.pop();
            value13 = filtrar13.pop();
            value14 = filtrar14.pop();
            value15 = filtrar15.pop();
            value16 = filtrar16.pop();
            value17 = filtrar17.pop();              
            value18 = filtrar18.pop(); 
            value19 = filtrar19.pop();
            value20 = filtrar20.pop();
            value21 = filtrar21.pop();
            value22 = filtrar22.pop();
            value23 = filtrar23.pop();
            value24 = filtrar24.pop();
            value25 = filtrar25.pop();
            value26 = filtrar26.pop();
            value27 = filtrar27.pop();
            value28 = filtrar28.pop();
            value29 = filtrar29.pop();
            value30 = filtrar30.pop();
            value31 = filtrar31.pop();              
            value32 = filtrar32.pop(); 
            value33 = filtrar33.pop();
            value34 = filtrar34.pop();
            value35 = filtrar35.pop();
            value36 = filtrar36.pop();
            value37 = filtrar37.pop();
            value38 = filtrar38.pop();
            value39 = filtrar39.pop();
            value40 = filtrar40.pop();
            value41 = filtrar41.pop();
            value42 = filtrar42.pop();
            value43 = filtrar43.pop();
            value44 = filtrar44.pop();
            value45 = filtrar45.pop();
            value46 = filtrar46.pop();
            value47 = filtrar47.pop();
            value48 = filtrar48.pop();
            value49 = filtrar49.pop();
            value50 = filtrar50.pop();
            value51 = filtrar51.pop();              
            value52 = filtrar52.pop(); 
            value53 = filtrar53.pop();
            value54 = filtrar54.pop();
            value55 = filtrar55.pop();
            value56 = filtrar56.pop();
            value57 = filtrar57.pop();
            value58 = filtrar58.pop();
            value59 = filtrar59.pop();
            value60 = filtrar60.pop();
            value61 = filtrar61.pop();
            value62 = filtrar62.pop();
            value63 = filtrar63.pop();
            value64 = filtrar64.pop();
            value65 = filtrar65.pop();
            value66 = filtrar66.pop();              
            value67 = filtrar67.pop(); 
            value68 = filtrar68.pop();
            value69 = filtrar69.pop();
            value70 = filtrar70.pop();
            value71 = filtrar71.pop();
            value72 = filtrar72.pop();
            value73 = filtrar73.pop();
            value74 = filtrar74.pop();
            value75 = filtrar75.pop();
            value76 = filtrar76.pop();
            value77 = filtrar77.pop();
            value78 = filtrar78.pop();
            value79 = filtrar79.pop();
            value80 = filtrar80.pop();              
            value81 = filtrar81.pop(); 
            value82 = filtrar82.pop();
            value83 = filtrar83.pop();
            value84 = filtrar84.pop();
            value85 = filtrar85.pop();
            value86 = filtrar86.pop();
            value87 = filtrar87.pop();
            value88 = filtrar88.pop();
            value89 = filtrar89.pop();
            value90 = filtrar90.pop();
            value91 = filtrar91.pop();
            value92 = filtrar92.pop();
            value93 = filtrar93.pop();
            value94 = filtrar94.pop();              
            value95 = filtrar95.pop(); 
            value96 = filtrar96.pop();
            value97 = filtrar97.pop();
            value98 = filtrar98.pop();
            value99 = filtrar99.pop();
            value100 = filtrar100.pop();
            value101 = filtrar101.pop();
            value102 = filtrar102.pop();
            value103 = filtrar103.pop();
            value104 = filtrar104.pop();
            value105 = filtrar105.pop();
            value106 = filtrar106.pop();
            value107 = filtrar107.pop();
            value108 = filtrar108.pop();
            value109 = filtrar109.pop();
            value110 = filtrar110.pop();
            value111 = filtrar111.pop();
            value112 = filtrar112.pop();
            value113 = filtrar113.pop();
            value114 = filtrar114.pop();

        pdfView1 = <ReportVSSI 
                     dia1 = {dia1} dia3 = {dia3} dia5 = {dia5} dia7 = {dia7} dia9 = {dia9} dia11 = {dia11} dia13 = {dia13} 
                     dia2 = {dia2} dia4 = {dia4} dia6 = {dia6} dia8 = {dia8} dia10 = {dia10} dia12 = {dia12} dia14 = {dia14}   
                      value3={value3} value4={value4} value5={value5} value6={value6}
                     value7={value7} value8={value8} value9={value9} value10={value10} 
                     value11={value11} value12={value12} value13={value13} value14={value14} value15={value15}
                     value16={value16} value17={value17} value18={value18} value19={value19} value20={value20}

                     value21={value21} value22={value22} value23={value23} value24={value24} value25={value25}
                     value26={value26} value27={value27} value28={value28} value29={value29} value30={value30}
                     value31={value31} value32={value32} value33={value33} value34={value34} value35={value35}
                     value36={value36} value37={value37} value38={value38} value39={value39} value40={value40}
                     value41={value41} value42={value42} value43={value43} value44={value44} value45={value45}
                     value46={value46} value47={value47} value48={value48} value49={value49} value50={value50}
                     value51={value51} value52={value52} value53={value53} value54={value54} value55={value55}
                     value56={value56} value57={value57} value58={value58} value59={value59} value60={value60}
                     value61={value61} value62={value62} value63={value63} value64={value64} value65={value65}
                     value66={value66} value67={value67} value68={value68} value69={value69} value70={value70}

                     value71={value71} value72={value72} value73={value73} value74={value74} value75={value75}
                     value76={value76} value77={value77} value78={value78} value79={value79} value80={value80}
                     value81={value81} value82={value82} value83={value83} value84={value84} value85={value85}
                     value86={value86} value87={value87} value88={value88} value89={value89} value90={value90}
                     value91={value91} value92={value92} value93={value93} value94={value94} value95={value95}
                     value96={value96} value97={value97} value98={value98} value99={value99} value100={value100}
                     value101={value101} value102={value102} value103={value103} value104={value104} value105={value105}
                     value106={value106} value107={value107} value108={value108} value109={value109} value110={value110}
                     value111={value111} value112={value112} value113={value113} value114={value114}
                    estadoResultados = {this.state.resultados}/>           
        }
        return ( 
            <div className="tabsATS" >
            <NavbarTeletrabajo/>
            {tablaPeriodoActual}
            {pdfView1}
            </div>
         );
    }
}
 
export default VSS;