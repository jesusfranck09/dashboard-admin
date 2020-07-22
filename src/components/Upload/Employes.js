import React , { useState } from 'react'
import XLSX from 'xlsx'
import {MDBCol} from "mdbreact";
import axios from 'axios';
import { Alert } from 'reactstrap';
import payload from '../../resolvers/payload';
import { Button as Boton, Modal, ModalBody} from 'reactstrap';

import {MDBRow,MDBTable, MDBTableBody, MDBTableHead,  MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter ,MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBBtn} from 'mdbreact';
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'
import { DialogUtility } from '@syncfusion/ej2-popups';
import diagnostico from '../images/diagnostico.png'
import { API} from '../utils/http'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withRouter } from 'react-router-dom';
// import MiniDrawer from '../adminGeneral/Sidebar'
import Navbar from '../adminGeneral/navbar'
import {
	Paper,
	Grid,
	Button,
	RadioGroup,
	FormLabel,
	MenuItem,
	FormControl,
	FormControlLabel,
  } from '@material-ui/core';


  import { Form, Field } from 'react-final-form';

  import { TextField, Radio, Select } from 'final-form-material-ui';

  const ModalPrueba = (props) => {
	const {
	  buttonLabel,
	  className
	} = props;
  
	const [modal, setModal] = useState(false);
  
	const toggle = () => setModal(!modal);

	const handleToggle = () => setModal(!modal);
	return (
	<React.Fragment>
	  <div>
		<Boton  color="primary" onClick={toggle}>{buttonLabel}Cargar Empleados</Boton>
		<Modal isOpen={modal} toggle={toggle} className={className} tabindex="-1" >
		  <ModalBody>
		  <SheetJSApp/>
		  </ModalBody>
		  <MDBBtn color="secondary" onClick={handleToggle}>Cerrar</MDBBtn>
		</Modal>
	  </div>
	<Alert style = {{marginTop:40,width:350}} color ="success">Nota : Puede ver los requisitos de su excel desde este enlace<br/>   <a href="https://drive.google.com/open?id=1Ooo_zRxkaHNSjjetliZGTanceA7tRsK1" target="_blank">Carga de empleados Excel Ejemplo </a></Alert>
	  </React.Fragment>	
	);
  }



class SheetJSApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
			empleadoNoRegistrado:[]
		};
		this.handleFile = this.handleFile.bind(this);
		this.exportFile = this.exportFile.bind(this);
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
		// const url = 'http://localhost:8000/graphql'
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
			 em =datos.data.data.verifyPackSuperUser.empleados
		//   console.log("exito no empleados",datos)
 
		 }).catch(err=>{
			 console.log("error" , err.response)
		 }) 
	   
		 let empleadosPack = parseInt(em)
		 let max;
		const correoA = localStorage.getItem("correo")
		 await axios({
				 url:  API,
				 method:'post',
				 data:{
				 query:`
				 mutation{
					 authRegisterSingleEmployee(data:"${[correoA]}"){
					 max
						 }
					 }
					 `
				 }
			 })
			 .then(datos => {		
			//  console.log("exito empleados registrados" , datos.data.data.authRegisterSingleEmployee[0].max)
			 max=datos.data.data.authRegisterSingleEmployee[0].max
			 });
 
			 let empleadosRegistrados=parseInt(max)
			//  console.log("empleados registrados " ,empleadosRegistrados ,empleadosPack)
		if(empleadosRegistrados < empleadosPack ){
	
	
        for (var i=2; i< this.state.data.length; i++)
     	  {
			 
				// const url  = 'http://localhost:8000/graphql'
				var estado = this.state.data[i]	
				// console.log("el estado en la posicion de i " , estado)
				if(this.state.data[i].length==20  ){	
					console.log("estado if" , this.state.data[i].length)	
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
							// console.log("la nombre ap am " , nombre,apellidoP,apellidoM)
							// console.log("la nombre ape ame " , nombreExistente,apellidoMExistente,apellidoPExistente)
					})
					 .catch((error) => {
					 console.log(".cartch" , error.response)
				});
				
				}else if(( this.state.data[i].length < 20 || this.state.data[i].length > 20 ) && this.state.data[i].length !=0 ) {
					console.log("estado else" , this.state.data[i].length)
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
				
				console.log("this.state",this.state.data[2])

				
				this.setState({sucursalNoExiste:array3})
				this.setState({deptoNoExiste:array2})
				this.setState({puestoNoExiste:array})
				this.setState({empleadoExitoso:empleadoExitoso})
				this.setState({empleadoNoExitoso:empleadoNoRegistrado})
				this.setState({message:arrayMessage})


				
				// console.log("array" , this.state.sucursalNoExiste,this.state.deptoNoExiste,this.state.puestoNoExiste)
				// console.log("el estado message" , this.state.message)
				
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
			// const token = localStorage.getItem('elToken')
			// let pl = payload(token);
			// var correoAdmin  = pl.email
			var idAdmin = localStorage.getItem("idAdmin")
			// var passAdmin = pl.password 
			console.log("data filas" , data)
			//aqui podemos visualizar la data
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
	render() {

		let spinner;



	
		this.state.message.map(rows =>{
			if(rows == 'correo existente'){
			
				this.setState({empleadoNoRegistrado:this.state.empleadoNoExitoso})
				this.setState({empleadoNoExitoso:[]})
				this.toggle()
				this.setState({spinner:false})	
				
			}
			if(rows == 'el puesto no existe'){
				
				this.setState({puesto:this.state.puestoNoExiste})
				this.setState({puestoNoExiste:[]})
				this.toggle()
				this.setState({spinner:false})	
				
			}
			if(rows == 'el departamento no existe'){
				
				this.setState({depto:this.state.deptoNoExiste})
				this.setState({deptoNoExiste:[]})
	
				this.toggle()
				this.setState({spinner:false})	
			}
			if(rows== 'la sucursal no existe'){
				this.setState({sucursal:this.state.sucursalNoExiste})
				this.setState({sucursalNoExiste:[]})
				this.toggle()
				this.setState({spinner:false})	
				
			}
			
			else if(rows == 'registro exitoso'){	
				this.setState({empleadoRegistrado:this.state.empleadoExitoso})
				this.setState({empleadoExitoso:[]})
				this.toggle()
				this.setState({spinner:false})	
			}
			this.setState({message:[]})

		})

		

			if(this.state.spinner== true){
				spinner = <div className="spinner-border text-info" role="status"><strong className="sr-only">Espere un momento por favor ...</strong>
					</div>
			}
		
			// console.log("empleadoRegistrado" , empleadoRegistrado)
		return (
			
				<React.Fragment>
					{spinner}
			 	<DragDropFile handleFile={this.handleFile}>	
				<div className="row"><div className="col-xs-12">
					<DataInput handleFile={this.handleFile} />
                    <MDBCol className=" text-center mt-2 pt-2 " >
                    <MDBBtn className="boton" disabled={!this.state.data.length}  color="info" type="submit" onClick={this.handleSubmit } >Cargar </MDBBtn>
					
					</MDBCol> 		
				</div> </div>
				{/* <div className="row"><div className="col-xs-12">
					<button disabled={!this.state.data.length} className="btn btn-success" onClick={this.exportFile}>Export</button>
				</div></div> */}
				{/* <div className="row"><div className="col-xs-12">
					<OutTable data={this.state.data} cols={this.state.cols} />
				</div></div> */}
			</DragDropFile>	
				<MDBContainer>
			
				<MDBModal isOpen={this.state.modal} toggle={this.toggle}>
				<MDBModalHeader toggle={this.toggle}>
					Detalles en la carga de Empleados</MDBModalHeader>
						<MDBModalBody>
						<TableContainer component={Paper}>
						<Table  style = {{width:450}} size="small" aria-label="a dense table">
							<TableHead>
							<TableRow>
							<TableCell>Centros de T. no registrados en su catálogo :</TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{this.state.sucursal.map((row) => {
								return(
								<TableRow >
								<TableCell component="th" scope="row">
									{row}
								</TableCell>
							
								</TableRow>
								)
								
								})}
							</TableBody>
							<TableHead>
							<TableRow>
								<TableCell>Departamentos no registrados en su catálogo :  </TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{this.state.depto.map((row) => {
								return(
									<TableRow >
									<TableCell component="th" scope="row">
										{row}
									</TableCell>
									</TableRow>
									)
								})}
							</TableBody>
							<TableHead>
							<TableRow>
								<TableCell>Puestos no registrados  en su catálogo : </TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{this.state.puesto.map((row) => {
								return(
									<TableRow >
									<TableCell component="th" scope="row">
										{row}
									</TableCell>
									</TableRow>
									)
								})}
							</TableBody>
							<TableHead>
							<TableRow>
								<TableCell>Empleados ya registrados con anterioridad  : </TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{this.state.empleadoNoRegistrado.map((row) => {
								return(
									<TableRow >
									<TableCell component="th" scope="row">
										{row}
									</TableCell>
								
									</TableRow>
									)
									
								
								})}
							</TableBody>
							<TableHead>
							<TableRow>
								<TableCell>Empleados cargados Exitosamente  : </TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{this.state.empleadoRegistrado.map((row) => {
								return(
									<TableRow >
									<TableCell component="th" scope="row">
										{row}
									</TableCell>
									</TableRow>
									)
								
									})}
							</TableBody>
						</Table>
						</TableContainer>		
						</MDBModalBody>
						<MDBModalFooter>
						<MDBBtn color="secondary" onClick={this.toggle}>Cerrar</MDBBtn>

						</MDBModalFooter>
					</MDBModal>
					</MDBContainer>
							
			</React.Fragment>
		
		);
	};
};


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
				<div className="form-group">
				<Alert color="primary">Por favor seleccione su base de datos, Puede cargar archivos ("xlsx","csv")</Alert>   <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
                </div>
                </form>
		);
	};
}

	// class OutTable extends React.Component {
	// 	constructor(props) { super(props) }

	// 	render() {
	// 		return (
	// 			<div className="table-responsive">
	// 				<table className="table table-striped">
	// 					<thead>
	// 						<tr>{this.props.cols.map((c) => <th key={c.key}>{c.name}</th>)}</tr>
	// 					</thead>
	// 					<tbody>
	// 						{this.props.data.map((r, i) => <tr key={i}>


	// 							{this.props.cols.map(c => <td key={c.key}>{r[c.key]}</td>)}
	// 						</tr>)}
	// 					</tbody>
	// 				</table>
	// 			</div>

	// 		);
	// 	}
	// };

const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function (x) { return "." + x; }).join(",");


// const make_cols = refstr => {
// 	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
// 	for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
// 	return o; 

// };

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  deptos:[],
			puestos:[],
			sucursal:[],
			datos:[],
			deptos:[],	
		};
	   
		
	  }

	componentWillMount(){

   const correoAdmin = localStorage.getItem("correo")
  
		// const url = 'http://localhost:8000/graphql'
		axios({
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
		// console.log("deptosExtraidas" , this.state.deptos)
	}).catch(err=>{
		console.log("este es el error get deptos" , err.response)
	}) 

	axios({
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
		this.setState({puestos:datos.data.data.getPuestos})	
		// console.log("puestosExtraidas" , this.state.puestos)
	}).catch(err=>{
		console.log("este es el error get deptos" , err.response)
	}) 

	axios({
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
		this.setState({sucursal:datos.data.data.getSucursales})	
		// console.log("sucursalExtraidas" , this.state.sucursal)
	}).catch(err=>{
		console.log("este es el error get deptos" , err.response)
	}) 
	}


 evaluar  =async (values) =>{

		const Nombre = values.Nombre.replace(/,/g, "");
		const ApellidoP = values.ApellidoP
		const ApellidoM = values.ApellidoM
		const curp = values.curp
		const rfc =  values.rfc
		const fechaN = values.fechaN
		const sexo = values.stooge

		const Estado_Civil= values.Estado_Civil
		const CentroTrabajo= values.CentroTrabajo.replace(/,/g, "");
		const area = values.area.replace(/,/g, "");
		const puesto = values.puesto.replace(/,/g, "");
		const tipoPuesto =  values.tipoPuesto.replace(/,/g, "");
		const estudios = values.estudios
		const personal =  values.personal
		const Jornada = values.Jornada
		const contratacion = values.contratacion
		const Tiempo_puestoActual = values.Tiempo_puestoActual 
		const experiencia_Laboral = values.experiencia_Laboral  
		const rotacion = values.rotacion
	  
		const correos  = values.Correo

		const Correo = correos.replace(/ /g, "")

		// console.log("correos" ,)

		// const token = localStorage.getItem('elToken')
	    let idSuperUsuario;
		// const url = 'http://localhost:8000/graphql'
		const idAdmin =  localStorage.getItem("idAdmin")
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
		// const passAdmin = pl.password
		
		if(Nombre && ApellidoP && ApellidoM && curp && rfc && fechaN && sexo && Estado_Civil && CentroTrabajo && Correo && area && puesto && tipoPuesto && estudios && personal && Jornada && contratacion && Tiempo_puestoActual && experiencia_Laboral && rotacion){
		
	
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
			em =datos.data.data.verifyPackSuperUser.empleados
		//  console.log("exito no empleados",datos)

		}).catch(err=>{
			console.log("error" , err.response)
		}) 
		let correoAdmin = localStorage.getItem("correo")
	    let empleadosPack = parseInt(em)
		let max;
		  await axios({
				url:  API,
				method:'post',
				data:{
				query:`
				mutation{
					authRegisterSingleEmployee(data:"${[correoAdmin]}"){
					max
						}
					}
					`
				}
			})
			.then(datos => {		
			// console.log("exito empleados registrados" , datos.data.data.authRegisterSingleEmployee[0].max)
		    max=datos.data.data.authRegisterSingleEmployee[0].max
			});

			let empleadosRegistrados=parseInt(max)
			let idAdmin = localStorage.getItem("idAdmin")
			
			if(empleadosRegistrados < empleadosPack ){

			axios({
			url:  API,
			method:'post',
			data:{
			query:`
			mutation{
				registerEmployee(data:"${[Nombre,ApellidoP,ApellidoM,curp,rfc,fechaN,sexo,Estado_Civil,Correo,area,puesto,tipoPuesto,estudios,personal,Jornada,contratacion,Tiempo_puestoActual,experiencia_Laboral,rotacion,CentroTrabajo,idAdmin]}"){
					message
					}
					}
				`
			}
			})
			
			.then((datos )=> {

			if(datos.data.data.registerEmployee.message == 'correo existente'){
				DialogUtility.alert({
					animationSettings: { effect: 'Zoom' },           
					content: "El correo proporcionado ya está en uso por favor ingrese uno diferente",
					title: 'Aviso!',
					position: "fixed"
				});
			}else if(datos.data.data.registerEmployee.message == 'registro exitoso')	{
				DialogUtility.alert({
					animationSettings: { effect: 'Zoom' },           
					content: "Colaborador Registrado exitosamente",
					title: 'Aviso!',
					position: "fixed"
				});
				this.props.history.push("/adminGral")

			}
			// console.log("los segundos datos" , datos)
			
			
			});   
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
	  
      validate = values => {
		const errors = {};
		if (!values.Nombre) {
		  errors.Nombre = 'Este campo es requerido';
		}
		if (!values.ApellidoP) {
		  errors.ApellidoP = 'Este campo es requerido';
		}
		if (!values.ApellidoM) {
		  errors.ApellidoM = 'Este campo es requerido';
		}
		if (!values.curp) {
		  errors.curp = 'Este campo es requerido';
		}
		if (!values.rfc) {
		  errors.rfc = 'Este campo es requerido';
		}
		if (!values.Correo) {
		  errors.Correo = 'Este campo es requerido';

		}
		
		if(values.rfc){
			if(values.rfc.length < 12 || values.rfc.length > 13){
				errors.rfc = 'El número de caracteres no es el correcto';
			}
		}
	
		if(values.curp){
			if(values.curp.length != 18){
				 errors.curp = 'El número de caracteres no es el correcto';
			}
		}
 
		if (!values.area) {
		  errors.area = 'Required';
		}
	  
		return errors;
	  };


 onSubmit (values) {
		const vari = JSON.stringify(values,1,2)
		};

render(){
	const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
	  const container = { width: 2500, height: 1300 }
	return (
		<React.Fragment>
			<Alert style={{marginTop:60}} color="primary"><strong>Registrar empleados</strong></Alert>	
				<Navbar/>
				<MDBContainer style = {{marginTop:20}}>
				<MDBRow><MDBCol>
				<div style={{ margin: 'auto', maxWidth: 600 }}>
					<Form
					onSubmit={this.onSubmit}
					
					validate={this.validate}
					render={({ handleSubmit, submitting,values }) => (
						<form onSubmit={handleSubmit}>
						<Paper style={{ padding: 16 }}>
							<Grid container alignItems="flex-start" spacing={2}>
							<Grid item xs={6}>
								<Field
								fullWidth
								required
								name="Nombre"
								component={TextField}
								type="text"
								label="Nombre"
								/>
							</Grid>
			
							<Grid item xs={6}>
								<Field
								fullWidth
								required
								name="ApellidoP"
								component={TextField}
								type="text"
								label="Apellido Paterno"
								/>
							</Grid>
			
							<Grid item xs={6}>
								<Field
								fullWidth
								required
								name="ApellidoM"
								component={TextField}
								type="text"
								label="Apelllido Materno"
								/>
							</Grid>
			
							<Grid item xs={6}>
								<Field
								
								fullWidth
								required
								name="curp"
								component={TextField}
								type="text"
								label="CURP"
								/>
							</Grid>
			
							<Grid item xs={6}>
								<Field
								fullWidth
								required
								name="rfc"
								component={TextField}
								type="text"
								label="RFC"
								/>
							</Grid>
							<Grid item xs={6}>
								<Field
								name="Correo"
								fullWidth
								required
								component={TextField}
								type="email"
								label="Correo"
								/>
							</Grid>
			
							<Grid item xs={6}>
								<Field
								fullWidth
								name="puesto"
								component={Select}
								label="Puesto"
								formControlProps={{ fullWidth: true }}
								>
								{this.state.puestos.map(row=>{
									return(<MenuItem value={row.nombre}>{row.nombre}</MenuItem>)
								})}
								</Field>
								</Grid>
			
			
							<Grid item xs={6}>
								<Field
								name="area"
								fullWidth
								required
								component={TextField}
								type="text"
								label="Departamento"
								component={Select}
								formControlProps={{ fullWidth: true }}
								
								>
								{this.state.deptos.map(rows=>{
									return(	<MenuItem value={rows.nombre}>{rows.nombre}</MenuItem>)
								})}
								</Field>
							</Grid>
							<Grid item xs={12}>
								<Field
								fullWidth
								name="CentroTrabajo"
								component={Select}
								label="Centro de Trabajo"
								formControlProps={{ fullWidth: true }}
								>
								{this.state.sucursal.map(row=>{
									return(<MenuItem value={row.nombreSucursal}>{row.nombreSucursal}</MenuItem>)
								})}
								</Field>
								<Alert color="primary" style={{marginTop:30}}>Datos del Trabajador</Alert>
								</Grid>
							
							<Grid item xs={6}>

								<Field
								required
								fullWidth
								name="fechaN"
								component={Select}
								label="Rango de Edad"
								formControlProps={{ fullWidth: true }}
								>
								<MenuItem value="15 a 19">15 a 19</MenuItem>
								<MenuItem value="20 a 24">20 a 24</MenuItem>
								<MenuItem value="25 a 29">25 a 29</MenuItem>
								<MenuItem value="30 a 34">30 a 34</MenuItem>
								<MenuItem value="35 a 39">35 a 39</MenuItem>
								<MenuItem value="40 a 44">40 a 44</MenuItem>
								<MenuItem value="45 a 49">45 a 49</MenuItem>
								<MenuItem value="50 a 54">50 a 54</MenuItem>
								<MenuItem value="55 a 59">55 a 59</MenuItem>
								<MenuItem value="60 a 64">60 a 64</MenuItem>
								<MenuItem value="65 a 69">65 a 69</MenuItem>
								<MenuItem value="70 o más">70 o más</MenuItem>
								</Field>
								</Grid>
			
								<Grid item xs={6}>
								<Field
								fullWidth
								name="Estado_Civil"
								component={Select}
								label="Estado Civil"
								formControlProps={{ fullWidth: true }}
								>
			
								<MenuItem value="Casado">Casado</MenuItem>
								<MenuItem value="Soltero">Soltero</MenuItem>
								<MenuItem value="Unión libre">Unión libre</MenuItem>
								<MenuItem value="Divorciado">Divorciado</MenuItem>
								<MenuItem value="Viudo">Viudo</MenuItem>
								</Field>
								</Grid>

							<Grid item xs={6}>
								<Field
								fullWidth
								name="tipoPuesto"
								component={Select}
								label="Seleccione el Tipo de Puesto"
								formControlProps={{ fullWidth: true }}
								>
								<MenuItem value="Operativo">Operativo</MenuItem>
								<MenuItem value="Profesional o Técnico">Profesional o Técnico</MenuItem>
								<MenuItem value="Supervisor">Supervisor</MenuItem>
								<MenuItem value="Gerencial">Gerencial</MenuItem>
								<MenuItem value="Directivo">Directivo</MenuItem>

								</Field>
							</Grid>
			
						
							<Grid item xs={6}>
								<Field
								fullWidth
								name="estudios"
								component={Select}
								label="Nivel de Estudios"
								formControlProps={{ fullWidth: true }}
								>
			
								<MenuItem value="Sin formacion">Sin formación</MenuItem>
								<MenuItem value="Primaria">Primaria</MenuItem>
								<MenuItem value="Secundaria">Secundaria</MenuItem>
								<MenuItem value="Preparatoria o Bachillerato">Preparatoria o Bachillerato</MenuItem>
								<MenuItem value="Licenciatura">Licenciatura</MenuItem>
								<MenuItem value="Maestria">Maestría</MenuItem>
								<MenuItem value="Doctorado">Doctorado</MenuItem>
			
								</Field>
								</Grid>
			
								<Grid item xs={6}>
								<Field
								fullWidth
								name="personal"
								component={Select}
								label="Tipo de Personal"
								formControlProps={{ fullWidth: true }}
								>
								<MenuItem value="Sindicalizado">Sindicalizado</MenuItem>
								<MenuItem value="Ninguno">Ninguno</MenuItem>
								<MenuItem value="Confianza">Confianza</MenuItem>
								</Field>
								</Grid>
			
								<Grid item xs={6}>
								<Field
								fullWidth
								name="Jornada"
								component={Select}
								label="Tipo de jornada de trabajo:"
								formControlProps={{ fullWidth: true }}
								>
								<MenuItem value="Fijo nocturno (entre las 20:00 y 6:00 hrs)">Fijo nocturno (entre las 20:00 y 6:00 hrs)</MenuItem>
								<MenuItem value="Fijo diurno (entre las 6:00 y 20:00 hrs)">Fijo diurno (entre las 6:00 y 20:00 hrs</MenuItem>
								<MenuItem value="Fijo mixto (combinación de nocturno y diurno)">Fijo mixto (combinación de nocturno y diurno)</MenuItem>
				
								
								</Field>
								</Grid>
			
			
								<Grid item xs={6}>
								<Field
								fullWidth
								name="contratacion"
								component={Select}
								label="Tipo de Contratación"
								formControlProps={{ fullWidth: true }}
								>
			
								<MenuItem value="Por obra o proyecto">Por obra o proyecto</MenuItem>
								<MenuItem value="por tiempo determinado (temporal)">Por tiempo determinado (temporal)</MenuItem>
								<MenuItem value="Tiempo indeterminado">Tiempo indeterminado</MenuItem>
								<MenuItem value="Honorarios">Honorarios</MenuItem>
								</Field>
								</Grid>
			
			
								<Grid item xs={6}>
								<Field
								fullWidth
								name="Tiempo_puestoActual"
								component={Select}
								label="Tiempo en el puesto Actual"
								formControlProps={{ fullWidth: true }}
								>
			
								<MenuItem value="Menos de 6 meses">Menos de 6 meses</MenuItem>
								<MenuItem value="Entre 6 meses y 1 año">Entre 6 meses y 1 año</MenuItem>
								<MenuItem value="Entre 1 a 4 años">Entre 1 a 4 años</MenuItem>
								<MenuItem value="Entre 5 a 9 años">Entre 5 a 9 años</MenuItem>
								<MenuItem value="Entre 10 a 14 años">Entre 10 a 14 años</MenuItem>
								<MenuItem value="Entre 15 a 19 años">Entre 15 a 19 años</MenuItem>
								<MenuItem value="Entre 20 a 24 años">Entre 20 a 24 años</MenuItem>
								<MenuItem value="25 años o más">25 años o más</MenuItem>
								</Field>
								</Grid>
			
								<Grid item xs={12}>
								<Field
								fullWidth
								name="experiencia_Laboral"
								component={Select}
								label="Tiempo experiencia laboral"
								formControlProps={{ fullWidth: true }}
								
								>
			
								<MenuItem value="Menos de 6 meses">Menos de 6 meses</MenuItem>
								<MenuItem value="Entre 6 meses y 1 año">Entre 6 meses y 1 año</MenuItem>
								<MenuItem value="Entre 1 a 4 años">Entre 1 a 4 años</MenuItem>
								<MenuItem value="Entre 5 a 9 años">Entre 5 a 9 años</MenuItem>
								<MenuItem value="Entre 10 a 14 años">Entre 10 a 14 años</MenuItem>
								<MenuItem value="Entre 15 a 19 años">Entre 15 a 19 años</MenuItem>
								<MenuItem value="Entre 20 a 24 años">Entre 20 a 24 años</MenuItem>
								<MenuItem value="25 años o más">25 años o más</MenuItem>
								</Field>
								</Grid>
			
			
			
								<Grid  item xs={12}>
								<FormControl component="fieldset">
								<RadioGroup row>
									<MDBRow>
									<MDBCol>
									<FormLabel component="legend" className="text-center mt-3 ml-3">Realiza rotación de turnos:</FormLabel>
									</MDBCol> 
									<FormControlLabel 
									label="Si"
									control={
										<Field
										required
										name="rotacion"
										component={Radio}
										type="radio"
										value="si"
										/>
									}
									/>
									<FormControlLabel
									label="No"
									control={
										<Field
										required
										name="rotacion"
										component={Radio}
										type="radio"
										value="no"
										/>
									}
									/>
									</MDBRow>
			
								</RadioGroup>
								</FormControl>
							</Grid>
			
			
							<Grid  item xs={12}>
								<FormControl component="fieldset">
								<RadioGroup row>
									<MDBRow>
									<MDBCol>
									<FormLabel component="legend" className="text-center mt-3 ml-3">SEXO</FormLabel>
									</MDBCol> 
									<FormControlLabel 
									label="Hombre"
									control={
										<Field
										required
										name="stooge"
										component={Radio}
										type="radio"
										value="Masculino"
										/>
									}
									/>
									<FormControlLabel
									label="Mujer"
									control={
										<Field
										required
										name="stooge"
										component={Radio}
										type="radio"
										value="Femenino"
										/>
									}
									/>
									</MDBRow>
			
								</RadioGroup>
								</FormControl>
							</Grid>
			
							<Grid item style={{ marginTop: 16 ,marginLeft:160 }}>
								<Button
								variant="outlined"
								color="secondary"
								type="submit"
								disabled={submitting}
								onClick={(e) =>this.evaluar(values)}
								>
								Registrar Empleado
								</Button>
							</Grid>
							</Grid>
						</Paper>
						
						</form>
					)}
					/>
				</div>		
				</MDBCol>
									
						<MDBCol  md="3" className="white-text text-center text-md-left mt-xl-5 mb-5"><strong>¿Desea cargar por csv o xls?</strong> <ModalPrueba/></MDBCol> 
					
						</MDBRow>
						</MDBContainer>
				</React.Fragment>
				);
			}

			}

export default withRouter(App)
