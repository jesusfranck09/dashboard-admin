import React , { useState } from 'react'
import XLSX from 'xlsx'
import {MDBCol} from "mdbreact";
import axios from 'axios';
import {MDBRow,  MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter ,MDBContainer, MDBBtn} from 'mdbreact';
import '../Home/index.css'
import { DialogUtility } from '@syncfusion/ej2-popups';
import { API} from '../utils/http'
import { withRouter } from 'react-router-dom';
import Navbar from '../adminGeneral/navbar'
import {Paper,Grid,RadioGroup,FormLabel,MenuItem,FormControl,FormControlLabel} from '@material-ui/core';
import {Card,Alert,Button,Modal as Mod} from 'antd'
import MUIDataTable from "mui-datatables";

class DragDropFile extends React.Component {
	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
	};
	suppress(evt) { evt.stopPropagation(); evt.preventDefault(); };
	onDrop(evt) {
		evt.stopPropagation(); evt.preventDefault();
		const files = evt.dataTransfer.files;
		if (files && files[0]) this.props.handleFile(files[0]);
	};
	render() {
		return (
			<div onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
				{this.props.children}
			</div>
			);
		};
	};

class DataInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	};
	handleChange(e) {
		const files = e.target.files;
		if (files && files[0]) this.props.handleFile(files[0]);
	};

	render() {
		return (
			<form > 
				<div style = {{marginTop:"10%"}} className="form-group">
				<Alert style = {{marginLeft:"5%"}}  message="Seleccione su base de datos, Puede cargar archivos (xlsx,csv)" type="primary"></Alert> 
				<input style = {{marginTop:"3%",marginLeft:"5%"}} type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
                </div>
            </form>
			);
		};
	}

	const SheetJSFT = [
		"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
	].map(function (x) { return "." + x; }).join(",");

	class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  deptos:[],
			puestos:[],
			sucursalJs:[],
			datos:[],
			isModalVisible:false,
			data: [],
			sucursalNoExiste:[],
			deptoNoExiste:[],
			puestoNoExiste:[],
			sucursal:[],
			depto:[],
			puesto:[],	
			message:[],
			modal: false,
			spinner:false,
			empleadoExitoso:[],
			empleadoNoExitoso:[],
			empleadoRegistrado:[],
			empleadoNoRegistrado:[],
			datosEmpleados:[],
			tablaInicio:true,
			tablaEmpleados:false,


			Nombre: '',
			ApellidoP: '',
			ApellidoM: '',
			curp: '',
			rfc: '',
			Correo: '',
			puesto2: '',
			area: '',
			CentroTrabajo: '',
			telefono: '',
			fechaN: '',
			Estado_Civil: '',
			tipoPuesto: '',
			estudios: '',
			personal: '',
			Jornada: '',
			contratacion: '',
			Tiempo_puestoActual: '',
			experiencia_Laboral: '',
			rotacion: '',
			stooge: '',
		};
		this.handleFile = this.handleFile.bind(this);
		this.exportFile = this.exportFile.bind(this);
	  }

   async componentWillMount(){
   const correoAdmin = localStorage.getItem("correo")
	await	axios({
		url:  API,
		method:'post',
		data:{
		query:`
		query{
			getDeptos(data:"${[correoAdmin]}"){
				id
				nombre
				fk_Administrador
				}
			}
			`
		}
	})
	.then(datos => {	
		this.setState({deptos:datos.data.data.getDeptos})	
	}).catch(err=>{
		console.log("este es el error get deptos" , err.response)
	}) 

	await axios({
		url:  API,
		method:'post',
		data:{
		query:`
		query{
			getPuestos(data:"${[correoAdmin]}"){
				id
				nombre
				fk_Administrador
				}
			}
			`
		}
	})
	.then(datos => {	
		console.log("puestos",datos.data.data.getPuestos)
		this.setState({puestos:datos.data.data.getPuestos})	
	}).catch(err=>{
		console.log("este es el error get deptos" , err.response)
	}) 

	await axios({
		url:  API,
		method:'post',
		data:{
		query:`
		query{
			getSucursales(data:"${[correoAdmin]}"){
				nombreSucursal
				}
			}
			`
		}
	})
	.then(datos => {	
		this.setState({sucursalJs:datos.data.data.getSucursales})	
	}).catch(err=>{
		console.log("este es el error get deptos" , err.response)
	}) 
	const idAdmin= localStorage.getItem("idAdmin") 
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
			}
		  }
		  `
		}
		}).then((datos) => {
		  this.setState({ datosEmpleados: datos.data.data.getUsersTableEmployees});
		})
		.catch((error) => {
			console.log(".cartch" , error)
		});  
	}

 	evaluar  =async () =>{
		const Nombre = this.state.Nombre.replace(/,/g, "");
		const ApellidoP = this.state.ApellidoP;
		const ApellidoM = this.state.ApellidoM;
		const curp = this.state.curp;
		const rfc = this.state.rfc;
		const fechaN = this.state.fechaN;
		const sexo = this.state.stooge;
		const Estado_Civil = this.state.Estado_Civil;
		const CentroTrabajo = this.state.CentroTrabajo.replace(/,/g, "");
		const area = this.state.area.replace(/,/g, "");
		const puesto = this.state.puesto2.replace(/,/g, "");
		const tipoPuesto = this.state.tipoPuesto.replace(/,/g, "");
		const estudios = this.state.estudios;
		const personal = this.state.personal;
		const Jornada = this.state.Jornada;
		const contratacion = this.state.contratacion;
		const Tiempo_puestoActual = this.state.Tiempo_puestoActual;
		const experiencia_Laboral = this.state.experiencia_Laboral;
		const rotacion = this.state.rotacion;
		const correos = this.state.Correo;
		const telefono = this.state.telefono;
		

		const Correo = correos.replace(/ /g, "")
	    let idSuperUsuario;
		const idAdmin =  localStorage.getItem("idAdmin")

		console.log({
			Nombre,
			ApellidoP,
			ApellidoM,
			curp,
			rfc,
			fechaN,
			sexo,
			Estado_Civil,
			CentroTrabajo,
			area,
			puesto,
			tipoPuesto,
			estudios,
			personal,
			Jornada,
			contratacion,
			Tiempo_puestoActual,
			experiencia_Laboral,
			rotacion,
			correos,
			telefono
		  });
		await axios({
			url:  API,
			method:'post',
			data:{
			query:`
			 query{
				getAdminDashboard(data:"${[idAdmin]}"){
				  fk_superusuario
					}
				  }
				`
			}
		  })
		  .then(datos => {		
			idSuperUsuario = datos.data.data.getAdminDashboard.fk_superusuario;
		  }).catch(err=>{
			  console.log("error" , err.response)
		  }) 
		
		if(Nombre && ApellidoP && ApellidoM && curp && rfc && fechaN && sexo && Estado_Civil && CentroTrabajo && telefono && Correo && area && puesto && tipoPuesto && estudios && personal && Jornada && contratacion && Tiempo_puestoActual && experiencia_Laboral && rotacion){
		let em;
		await axios({
		  url:  API,
		  method:'post',
		  data:{
		  query:`
		   query{
			verifyPackSuperUser(data:"${[idSuperUsuario]}"){
				empleados
				  }
				}
			  `
		  }
		})
		.then(datos => {		
			em =datos.data.data.verifyPackSuperUser[0].empleados
		}).catch(err=>{
			console.log("error" , err.response)
		}) 
	    let empleadosPack = parseInt(em)
		let max;
		  await axios({
				url:  API,
				method:'post',
				data:{
				query:`
				mutation{
					authRegisterSingleEmployee(data:"${[idAdmin]}"){
					max
						}
					}
					`
				}
			})
			.then(datos => {		
		    max=datos.data.data.authRegisterSingleEmployee[0].max
			});
			let empleadosRegistrados=parseInt(max)
			if(empleadosRegistrados <= empleadosPack ){
			axios({
			url:  API,
			method:'post',
			data:{
			query:`
			mutation{
				registerEmployee(data:"${[Nombre,ApellidoP,ApellidoM,curp,rfc,fechaN,sexo,Estado_Civil,Correo,area,puesto,tipoPuesto,estudios,personal,Jornada,contratacion,Tiempo_puestoActual,experiencia_Laboral,rotacion,CentroTrabajo,telefono,idAdmin]}"){
					message
					}
					}
				`
			}
			})
			
			.then((datos )=> {
			if(datos.data.data.registerEmployee.message === 'correo existente'){
				DialogUtility.alert({
					animationSettings: { effect: 'Zoom' },           
					content: "El correo proporcionado ya está en uso por favor ingrese uno diferente",
					title: 'Aviso!',
					position: "fixed"
				});
			}else if(datos.data.data.registerEmployee.message === 'registro exitoso')	{
				DialogUtility.alert({
					animationSettings: { effect: 'Zoom' },           
					content: "Colaborador Registrado exitosamente",
					title: 'Aviso!',
					position: "fixed"
				});
				this.props.history.push("/adminGral")
			}
			}).catch(err=>{
				console.log(err.response)
			})   
		} else{
			DialogUtility.alert({
				animationSettings: { effect: 'Zoom' },           
				content: 'Su suscripción no le permite registrar mas Empleados, por favor póngase en contacto con su asesor para ampliar el numero de sus usuarios. !',
				position: "fixed",
			})
			localStorage.removeItem("max")
		}  
	   }else{
		DialogUtility.alert({
			animationSettings: { effect: 'Zoom' },           
			content: 'Por favor llene todos los campos',
			position: "fixed",
		})
	   } 
	  }
  
	  showModal = () => {
		this.setState({isModalVisible:true});
	  };
	
	   handleCancel = () => {
		this.setState({isModalVisible:false});
		window.location.reload();
	};
	
	onSubmit (values) {
	};
	handleSubmit = async event => {
		this.setState({spinner:true})
		let array = []
		let array2 = []
		let array3 = []
		let idSuperUsuario;
		let arrayMessage=[];
		let empleadoExitoso=[];
		let empleadoNoRegistrado= [ ]
		const idAdmin =  await localStorage.getItem("idAdmin")
		await axios({
		url:  API,
		method:'post',
		data:{
		query:`
			query{
			getAdminDashboard(data:"${[idAdmin]}"){
				fk_superusuario
				}
				}
			`
		}
		})
		.then(datos => {		
		idSuperUsuario = datos.data.data.getAdminDashboard.fk_superusuario;

		}).catch(err=>{
			console.log("error" , err.response)
		}) 

			let em;
			await axios({
			url:  API,
			method:'post',
			data:{
			query:`
			query{
				verifyPackSuperUser(data:"${[idSuperUsuario]}"){
					empleados
					}
					}
				`
			}
			})
			.then(datos => {		
				em =datos.data.data.verifyPackSuperUser[0].empleados	
			}).catch(err=>{
				console.log("error" , err.response)
			}) 
		
			let empleadosPack = parseInt(em)
			let max;
			await axios({
			url:  API,
			method:'post',
			data:{
			query:`
			mutation{
				authRegisterSingleEmployee(data:"${[idAdmin]}"){
				max
					}
				}
				`
			}
		})
		.then(datos => {		
		max=datos.data.data.authRegisterSingleEmployee[0].max
		});

		let empleadosRegistrados=parseInt(max)
		if(empleadosRegistrados < empleadosPack ){
		for (var i=2; i< this.state.data.length; i++){
			var estado = this.state.data[i]	
			console.log("estado",estado)
			if(this.state.data[i].length === 21  ){	
			const query =  `
			mutation {
				registerEmployee(
					data:["${estado},${idAdmin}"]
				){		
					message
					valor1
					valor2
					valor3
					nombre 
					apellidoP
					apellidoM
					nombreExistente
					apellidoPExistente
					apellidoMExistente
				}
			}
			`;

			await axios({
			url:  API,
			method: 'post',
			data: {
				query,
				variables: {
					data: `${estado}`
				}
			}
			}).then( datos =>  {
			const valor1 = datos.data.data.registerEmployee.valor1
			const valor2 = datos.data.data.registerEmployee.valor2
			const valor3 = datos.data.data.registerEmployee.valor3
			var message = datos.data.data.registerEmployee.message
			var nombre = datos.data.data.registerEmployee.nombre
			var apellidoM = datos.data.data.registerEmployee.apellidoM
			var apellidoP = datos.data.data.registerEmployee.apellidoP
			var nombreExistente = datos.data.data.registerEmployee.nombreExistente
			var apellidoMExistente = datos.data.data.registerEmployee.apellidoMExistente
			var apellidoPExistente = datos.data.data.registerEmployee.apellidoPExistente
				array.push(valor1)
				array2.push(valor2)
				array3.push(valor3)
			arrayMessage.push(message)
			if( nombre != null && apellidoP != null && apellidoM != null ){
				empleadoExitoso.push(nombre +" "+ apellidoP + " " +  apellidoM)
			}
			if(nombreExistente != null && apellidoPExistente != null && apellidoMExistente != null ){
				empleadoNoRegistrado.push(nombreExistente  +" "+   apellidoPExistente  +" "  +  apellidoMExistente)
			}
			})
					.catch((error) => {
					console.log(".cartch" , error.response)
			});
			
			}else if(( this.state.data[i].length < 21 || this.state.data[i].length > 21 ) && this.state.data[i].length !== 0 ) {
				DialogUtility.alert({
				animationSettings: { effect: 'Zoom' },           
				title: "Su archivo no cumple con los requisitos",
				position: "fixed"
			});
			{ break; }
			}
			};
			if( this.state.data[2]== undefined ||  this.state.data[2].length== 0) {
				
				this.setState({spinner:false})	
				DialogUtility.alert({
				animationSettings: { effect: 'Zoom' },           
				title: "Su archivo no contiene datos",
				position: "fixed"
			});
			}
			this.setState({sucursalNoExiste:array3})
			this.setState({deptoNoExiste:array2})
			this.setState({puestoNoExiste:array})
			this.setState({empleadoExitoso:empleadoExitoso})
			this.setState({empleadoNoExitoso:empleadoNoRegistrado})
			this.setState({message:arrayMessage})
			}else{
				DialogUtility.alert({
					animationSettings: { effect: 'Zoom' },           
					content: 'Su suscripción no le permite registrar mas Empleados, por favor póngase en contacto con su asesor de ADS para ampliar el numero de sus usuarios. !',
					position: "fixed"
				});
				localStorage.removeItem("max")
			}
			}
	
		handleFile(file) {
			const reader = new FileReader();
			const rABS = !!reader.readAsBinaryString;
			reader.onload = (e) => {
				const bstr = e.target.result;
				const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
				this.setState({ data: data });
			};
			if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
		};
		exportFile() {
			const ws = XLSX.utils.aoa_to_sheet(this.state.data);
			const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
			XLSX.writeFile(wb, "sheetjs.xlsx")
		};
		toggle = () => {
			this.setState({
			  modal: !this.state.modal
			});
		  }	
		mostrarEmpleados(){
			this.setState({tablaInicio:false})
			this.setState({tablaEmpleados:true})
		} 
		cerrarEmpleados(){
			this.setState({tablaInicio:true})
			this.setState({tablaEmpleados:false})
		}  

		handleChange = (e) => {
			const { name, value } = e.target;
			this.setState({ [name]: value }); // Actualiza el estado respetando el nombre del input
		};
	
	render(){
		const options = {
			filterType: "dropdown",
			responsive: "staked",
			elevation:0,
			viewColumns:false,
			search:false,
			download:false,
			filter:false,
			print:false,
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
			 }
		   }
		}
		let spinner;	
		this.state.message.map(rows =>{
		if(rows === 'correo existente'){
			this.setState({empleadoNoRegistrado:this.state.empleadoNoExitoso})
			this.setState({empleadoNoExitoso:[]})
			this.toggle()
			this.setState({spinner:false})	
		}
		if(rows === 'el puesto no existe'){
			this.setState({puesto:this.state.puestoNoExiste})
			this.setState({puestoNoExiste:[]})
			this.toggle()
			this.setState({spinner:false})	
		}
		if(rows === 'el departamento no existe'){
			this.setState({depto:this.state.deptoNoExiste})
			this.setState({deptoNoExiste:[]})
			this.toggle()
			this.setState({spinner:false})	
		}
		if(rows=== 'la sucursal no existe'){
			this.setState({sucursal:this.state.sucursalNoExiste})
			this.setState({sucursalNoExiste:[]})
			this.toggle()
			this.setState({spinner:false})	
		}else if(rows === 'registro exitoso'){	
			this.setState({empleadoRegistrado:this.state.empleadoExitoso})
			this.setState({empleadoExitoso:[]})
			this.toggle()
			this.setState({spinner:false})	
		}
		this.setState({message:[]})
		})
		if(this.state.spinner === true){
			spinner = <div style={{marginTop:"5%"}} className="spinner-border text-warning" role="status"><strong className="sr-only">Espere un momento por favor ...</strong>
			</div>
		}
		let componenteCarga = <div>
		<center>{spinner}</center>
		<DragDropFile handleFile={this.handleFile}>	
		<div className="row">
			<div className="col-xs-12">
			<DataInput handleFile={this.handleFile} />
			<MDBCol className=" text-center mt-2 pt-2 " >
			</MDBCol> 		
		</div> </div>
		</DragDropFile>	
		<MDBModal centered = {true}  isOpen={this.state.modal} toggle={this.toggle}>
			<Card style={{padding:"15px"}} title={<h6><strong>Detalles de la carga de Empleados</strong></h6>} extra = {<Button type="dashed" danger onClick={this.toggle}>Cerrar detalle</Button>}>	
				<table  className = "table table-bordered table-small table-striped" >
					<tr>
					<td><strong>Centros de T. no registrados en su catálogo :</strong></td>
					</tr>
					{this.state.sucursal.map((row) => {
						return(
						<tr >
						<td component="th" scope="row">
							<Alert  message={row} type = "success"></Alert>
						</td>
						</tr>
						)
						})}
					<tr>
						<td><strong>Departamentos no registrados en su catálogo : </strong> </td>
					</tr>
					{this.state.depto.map((row) => {
						return(
							<tr >
							<td component="th" scope="row">
							 <Alert  message={row} type = "success"></Alert>
							</td>
							</tr>
							)
						})}
					<tr>
						<td><strong>Puestos no registrados  en su catálogo : </strong></td>
					</tr>
					{this.state.puesto.map((row) => {
						return(
							<tr >
							<td component="th" scope="row">
							<Alert  message={row} type = "success"></Alert>
							</td>
							</tr>
							)
						})}
					<tr>
						<td><strong>Empleados ya registrados con anterioridad  : </strong></td>
					</tr>
					{this.state.empleadoNoRegistrado.map((row) => {
						return(
							<tr >
							<td component="th" scope="row">
							<Alert  message={row} type = "success"></Alert>
							</td>
						
							</tr>
							)								
						})}
					<tr>
						<td><strong>Empleados cargados Exitosamente  : </strong></td>
					</tr>
					{this.state.empleadoRegistrado.map((row) => {
						return(
							<tr >
							<td component="th" scope="row">
								<Alert  message={row} type = "success"></Alert>
							</td>
							</tr>
						)
					})}
				</table>
		</Card>					
		</MDBModal>
		</div>
	let tablaEmpleados;	
	if(this.state.tablaEmpleados === true){
		const columns = ["Nombre","Apellido P", "Apellido M.", "Centro de Trabajo","Puesto"];
		const data = this.state.datosEmpleados.map((rows,i)=>{
		return([rows.nombre,rows.ApellidoP ,rows.ApellidoM ,rows.CentroTrabajo,rows.Puesto])
		})
		tablaEmpleados = 
		<Card style={{width:"70%",marginTop:"5%",padding:"15px"}} title = {<h6><strong>Lista de empleados registrados</strong></h6>} extra = {<Button type="dashed" danger onClick = {e=>this.cerrarEmpleados()}>Cerrar empleados</Button>}>
		<MUIDataTable
		  data={data}
		  columns={columns}
		  options={options}
		/>
		</Card>
	}	
	
	let tablaInicio; 
	if(this.state.tablaInicio === true){
		tablaInicio = 			<center>
		<Card className="cardEmpleados" style={{ padding: "10px" }} title={<h6><strong>Registrar empleados</strong></h6>} extra={
		  <div>
			<Button type="dashed" style={{ backgroundColor: "azure" }} onClick={e => this.showModal()}>
			  Importación por csv &nbsp;&nbsp;<i className="fas fa-file-csv"></i>
			</Button>&nbsp;&nbsp;&nbsp;
			<Button type="dashed" style={{ backgroundColor: "lightgreen" }} onClick={e => this.mostrarEmpleados()}>
			  Empleados&nbsp;&nbsp;<i className="fas fa-user-friends"></i>
			</Button>
		  </div>
		}>
		  <div style={{ margin: 'auto', maxWidth: 600 }}>
			<form>
			  <Grid container alignItems="flex-start" spacing={2}>
				<Grid item xs={6}>
				  <input
					required
					name="Nombre"
					type="text"
					placeholder="Nombre"
					value={this.state.Nombre || ''}
					onChange={this.handleChange}
				  />
				</Grid>
				<Grid item xs={6}>
				  <input
					required
					name="ApellidoP"
					type="text"
					placeholder="Apellido Paterno"
					value={this.state.ApellidoP || ''}
					onChange={this.handleChange}
				  />
				</Grid>
				<Grid item xs={6}>
				  <input
					required
					name="ApellidoM"
					type="text"
					placeholder="Apellido Materno"
					value={this.state.ApellidoM || ''}
					onChange={this.handleChange}
				  />
				</Grid>
				<Grid item xs={6}>
				  <input
					required
					name="curp"
					type="text"
					placeholder="CURP"
					value={this.state.curp || ''}
					onChange={this.handleChange}
				  />
				</Grid>
				<Grid item xs={6}>
				  <input
					required
					name="rfc"
					type="text"
					placeholder="RFC"
					value={this.state.rfc || ''}
					onChange={this.handleChange}
				  />
				</Grid>
				<Grid item xs={6}>
				  <input
					required
					name="Correo"
					type="email"
					placeholder="Correo"
					value={this.state.Correo || ''}
					onChange={this.handleChange}
				  />
				</Grid>
				<Grid item xs={6}>
				  <select
					name="puesto2"
					value={this.state.puesto2 || ''}
					onChange={this.handleChange}
					required
				  >
					<option value="">Seleccione una opcion</option>
					{this.state.puestos.map(row => (	
					  <option key={row.nombre} value={row.nombre}>{row.nombre}</option>
					))}
				  </select>
				</Grid>
				<Grid item xs={6}>
				  <select
					name="area"
					value={this.state.area || ''}
					onChange={this.handleChange}
					required
				  >
					<option value="">Seleccione una opcion</option>
					{this.state.deptos.map(rows => (
					  <option key={rows.nombre} value={rows.nombre}>{rows.nombre}</option>
					))}
				  </select>
				</Grid>
				<Grid item xs={6}>
				  <select
					name="CentroTrabajo"
					value={this.state.CentroTrabajo || ''}
					onChange={this.handleChange}
				  >
					<option value="">Seleccione una opcion</option>
					{this.state.sucursalJs.map(row => (
					  <option key={row.nombreSucursal} value={row.nombreSucursal}>{row.nombreSucursal}</option>
					))}
				  </select>
				</Grid>
				<Grid item xs={6}>
				  <input
					name="telefono"
					type="number"
					placeholder="Teléfono"
					value={this.state.telefono || ''}
					onChange={this.handleChange}
				  />
				</Grid>
				<Grid item xs={12} style={{ marginTop: 20 }}>
				  <strong><Alert message="Datos del trabajador" type="success"></Alert></strong>
				</Grid>
				<Grid item xs={6}>
				  <select
					name="fechaN"
					value={this.state.fechaN || ''}
					onChange={this.handleChange}
					required
				  >
					<option value="">Seleccione una opcion</option>
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
				</Grid>
				<Grid item xs={6}>
				  <select
					name="Estado_Civil"
					value={this.state.Estado_Civil || ''}
					onChange={this.handleChange}
				  >
					<option value="">Seleccione una opcion</option>
					<option value="Casado">Casado</option>
					<option value="Soltero">Soltero</option>
					<option value="Unión libre">Unión libre</option>
					<option value="Divorciado">Divorciado</option>
					<option value="Viudo">Viudo</option>
				  </select>
				</Grid>
				<Grid item xs={6}>
				  <select
					name="tipoPuesto"
					value={this.state.tipoPuesto || ''}
					onChange={this.handleChange}
				  >
					<option value="">Seleccione una opcion</option>
					<option value="Operativo">Operativo</option>
					<option value="Profesional o Técnico">Profesional o Técnico</option>
					<option value="Supervisor">Supervisor</option>
					<option value="Gerencial">Gerencial</option>
					<option value="Directivo">Directivo</option>
				  </select>
				</Grid>
				<Grid item xs={6}>
				  <select
					name="estudios"
					value={this.state.estudios || ''}
					onChange={this.handleChange}
				  >
					<option value="">Seleccione una opcion</option>
					<option value="Sin formacion">Sin formación</option>
					<option value="Primaria">Primaria</option>
					<option value="Secundaria">Secundaria</option>
					<option value="Preparatoria o Bachillerato">Preparatoria o Bachillerato</option>
					<option value="Licenciatura">Licenciatura</option>
					<option value="Maestria">Maestría</option>
					<option value="Doctorado">Doctorado</option>
				  </select>
				</Grid>
				<Grid item xs={6}>
				  <select
					name="personal"
					value={this.state.personal || ''}
					onChange={this.handleChange}
				  >
					<option value="">Seleccione una opcion</option>
					<option value="Sindicalizado">Sindicalizado</option>
					<option value="Ninguno">Ninguno</option>
					<option value="Confianza">Confianza</option>
				  </select>
				</Grid>
				<Grid item xs={6}>
				  <select
					name="Jornada"
					value={this.state.Jornada || ''}
					onChange={this.handleChange}
				  >
					<option value="">Seleccione una opcion</option>
					<option value="Fijo nocturno (entre las 20:00 y 6:00 hrs)">
					  Fijo nocturno (entre las 20:00 y 6:00 hrs)
					</option>
					<option value="Fijo diurno (entre las 6:00 y 20:00 hrs)">
					  Fijo diurno (entre las 6:00 y 20:00 hrs)
					</option>
					<option value="Fijo mixto (combinación de nocturno y diurno)">
					  Fijo mixto (combinación de nocturno y diurno)
					</option>
				  </select>
				</Grid>
				<Grid item xs={6}>
				  <select
					name="contratacion"
					value={this.state.contratacion || ''}
					onChange={this.handleChange}
				  >
					<option value="">Seleccione una opcion</option>
					<option value="Por obra o proyecto">Por obra o proyecto</option>
					<option value="por tiempo determinado (temporal)">
					  Por tiempo determinado (temporal)
					</option>
					<option value="Tiempo indeterminado">Tiempo indeterminado</option>
					<option value="Honorarios">Honorarios</option>
				  </select>
				</Grid>
				<Grid item xs={6}>
				  <select
					name="Tiempo_puestoActual"
					value={this.state.Tiempo_puestoActual || ''}
					onChange={this.handleChange}
				  >
					<option value="">Seleccione una opcion</option>
					<option value="">Seleccione una opcion</option>
					<option value="Menos de 6 meses">Menos de 6 meses</option>
					<option value="Entre 6 meses y 1 año">Entre 6 meses y 1 año</option>
					<option value="Entre 1 a 4 años">Entre 1 a 4 años</option>
					<option value="Entre 5 a 9 años">Entre 5 a 9 años</option>
					<option value="Entre 10 a 14 años">Entre 10 a 14 años</option>
					<option value="Entre 15 a 19 años">Entre 15 a 19 años</option>
					<option value="Entre 20 a 24 años">Entre 20 a 24 años</option>
					<option value="25 años o más">25 años o más</option>
				  </select>
				</Grid>
				<Grid item xs={12}>
				  <select
					name="experiencia_Laboral"
					value={this.state.experiencia_Laboral || ''}
					onChange={this.handleChange}
				  >
					<option value="">Seleccione una opcion</option>
					<option value="">Seleccione una opcion</option>
					<option value="Menos de 6 meses">Menos de 6 meses</option>
					<option value="Entre 6 meses y 1 año">Entre 6 meses y 1 año</option>
					<option value="Entre 1 a 4 años">Entre 1 a 4 años</option>
					<option value="Entre 5 a 9 años">Entre 5 a 9 años</option>
					<option value="Entre 10 a 14 años">Entre 10 a 14 años</option>
					<option value="Entre 15 a 19 años">Entre 15 a 19 años</option>
					<option value="Entre 20 a 24 años">Entre 20 a 24 años</option>
					<option value="25 años o más">25 años o más</option>
				  </select>
				</Grid>
				<Grid item xs={12}>
				{/* Componente de Rotación */}
				<div className="turnRotationFieldset">
					<legend className="turnRotationLegend">Realiza rotación de turnos:</legend>
					<div className="turnRotationOptions">
						<label className="turnRotationLabel">
							<input
								required
								name="rotacion"
								type="radio"
								value="si"
								checked={this.state.rotacion === "si"}
								onChange={this.handleChange}
							/>
							<span className="customTurnRotationRadio"></span>
							Rotación
						</label>
						<label className="turnRotationLabel">
							<input
								required
								name="rotacion"
								type="radio"
								value="no"
								checked={this.state.rotacion === "no"}
								onChange={this.handleChange}
							/>
							<span className="customTurnRotationRadio"></span>
							Sin Rotación
						</label>
					</div>
				</div>

				{/* Componente de Género */}
				<div className="genderFieldset">
					<legend className="genderLegend">Género</legend>
					<div className="genderOptions">
						<label className="genderLabel">
							<input
								required
								name="stooge"
								type="radio"
								value="Masculino"
								checked={this.state.stooge === "Masculino"}
								onChange={this.handleChange}
							/>
							<span className="customGenderRadio"></span>
							Masculino
						</label>
						<label className="genderLabel">
							<input
								required
								name="stooge"
								type="radio"
								value="Femenino"
								checked={this.state.stooge === "Femenino"}
								onChange={this.handleChange}
							/>
							<span className="customGenderRadio"></span>
							Femenino
						</label>
					</div>
				</div>
			</Grid>
			  </Grid>
			  <center>

			  </center>
			</form>
			<Button style={{ marginTop: "2%" }} size="md" type="primary"  onClick={(e) => this.evaluar()} className="text-white">
				  Registrar Empleado
				</Button>
		  </div>
		</Card>
	  </center>
	  
	} 
	return (
		<React.Fragment>
			<div>
            <Navbar modulo = {"CARGA DE EMPLEADOS"}/>
				{tablaInicio}
				<Mod onCancel = {e=>this.handleCancel()} footer={[
					<Button className="boton" disabled={!this.state.data.length} type="primary" onClick={e=>this.handleSubmit()}>
						Cargar Excel
					</Button>,
					<Button type="danger" className="boton" onClick={e=>this.handleCancel()}>
						Cerrar carga xls 
					</Button>
					]} title={<h6><strong>Carga de empleados por csv o xls</strong></h6>} visible={this.state.isModalVisible}>
				<Alert  message={<div>Nota : Puede ver los requisitos de su excel desde el siguiente enlace<br/> <a href="https://drive.google.com/open?id=1Ooo_zRxkaHNSjjetliZGTanceA7tRsK1" target="_blank">Carga de empleados Excel Ejemplo </a></div>} type="success"></Alert>
				{componenteCarga}
				</Mod>
				<center>
				{tablaEmpleados}
				</center>
				</div>
				</React.Fragment>
				);
			}
			}

export default withRouter(App)