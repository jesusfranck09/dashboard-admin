import React , { useState } from 'react'
import XLSX from 'xlsx'
import {MDBCol} from "mdbreact";
import axios from 'axios';
import { Alert } from 'reactstrap';
import payload from '../../resolvers/payload';
import { Button as Boton, Modal, ModalBody} from 'reactstrap';
import {MDBRow,MDBTable, MDBTableBody, MDBTableHead, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBBtn} from 'mdbreact';
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'
import { DialogUtility } from '@syncfusion/ej2-popups';
import diagnostico from '../images/diagnostico.png'
import { API} from '../utils/http'
import { withRouter } from 'react-router-dom';
import MiniDrawer from '../adminGeneral/Sidebar'

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
	<Alert style = {{marginTop:40,width:400}} color ="success">Nota : Puede ver los requisitos de su excel desde este enlace<br/>   <a href="https://drive.google.com/open?id=1NSWrZqQ9ZbgUxUgUAGsYnsVqfbcBGC8t" target="_blank">Carga de empleados Excel Ejemplo </a></Alert>
	  </React.Fragment>	
	);
  }

class SheetJSApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],	
		};
		this.handleFile = this.handleFile.bind(this);
		this.exportFile = this.exportFile.bind(this);
	};

    handleSubmit = async event => {
		let idSuperUsuario;
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
		  console.log("exito no empleados",datos)
 
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
			 console.log("exito empleados registrados" , datos.data.data.authRegisterSingleEmployee[0].max)
			 max=datos.data.data.authRegisterSingleEmployee[0].max
			 });
 
			 let empleadosRegistrados=parseInt(max)
			//  console.log("empleados registrados " ,empleadosRegistrados ,empleadosPack)
		if(empleadosRegistrados < empleadosPack ){
	
	
        for (var i=2; i< this.state.data.length; i++)
     	  {
			 
				// const url  = 'http://localhost:8000/graphql'
				var estado = this.state.data[i]	
				if(this.state.data[i].length==21){		
				const query =  `
				mutation {
					registerEmployee(
						data:["${estado},${idAdmin}"]
					){
						message
					}
				}
				`;
				
				axios({
				url:  API,
				method: 'post',
				data: {
					query,
					variables: {
						data: `${estado}`
					}
				}
					}).then( datos => {
						if(datos.data.data.registerEmployee.message == 'correo existente'){
							DialogUtility.alert({
								animationSettings: { effect: 'Zoom' },           
								title:"Aviso!",
								content: "Uno de los correos  ya se encuentra registrado, por favor verifiquelo nuevamente !",
								position: "fixed"
							});
							
						}else if(datos.data.data.registerEmployee.message == 'la sucursal no existe'){
						
							DialogUtility.alert({
								animationSettings: { effect: 'Zoom' },           
								title:"Aviso!",
								content: "Estimado usuario el centro de trabajo proporcionado en su excel no existe en su catálogo de centros de trabajo activos",
								position: "fixed"
							});
							console.log("hola mundo")
						}else if(datos.data.data.registerEmployee.message == 'el puesto no existe'){
						
							DialogUtility.alert({
								animationSettings: { effect: 'Zoom' },           
								title:"Aviso!",
								content: "Estimado usuario el puesto proporcionado en su excel no existe en su catálogo de puestos activos",
								position: "fixed"
							});
							console.log("hola mundo")
						}else if(datos.data.data.registerEmployee.message == 'el departamento no existe'){
						
							DialogUtility.alert({
								animationSettings: { effect: 'Zoom' },           
								title:"Aviso!",
								content: "Estimado usuario el departamento proporcionado en su excel no existe en su catálogo de departamentos activos",
								position: "fixed"
							});
							console.log("hola mundo")
						}else if(datos.data.data.registerEmployee.message == 'registro exitoso'){
						
							DialogUtility.alert({
								animationSettings: { effect: 'Zoom' },           
						
								title: "Datos Cargados Exitosamente!",
								position: "fixed"
							});
							console.log("hola mundo")
						}
					})
					 .catch((error) => {
					 console.log(".cartch" , error.response)
				});

				}else{
			
					DialogUtility.alert({
					animationSettings: { effect: 'Zoom' },           
					title: "Su archivo no cumple con los requisitos",
					position: "fixed"
				});
				{ break; }
				}

		
				};

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
	
	render() {
		return (

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
		console.log("deptosExtraidas" , this.state.deptos)
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
		console.log("puestosExtraidas" , this.state.puestos)
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
		console.log("sucursalExtraidas" , this.state.sucursal)
	}).catch(err=>{
		console.log("este es el error get deptos" , err.response)
	}) 
	}

 evaluar  =async (values) =>{

		const Nombre = values.Nombre
		const ApellidoP = values.ApellidoP
		const ApellidoM = values.ApellidoM
		const curp = values.curp
		const rfc =  values.rfc
		const fechaN = values.fechaN
		const sexo = values.stooge

		const Estado_Civil= values.Estado_Civil
		const CentroTrabajo= values.CentroTrabajo
		const Correo = values.Correo
		const area = values.area
		const puesto = values.puesto
		const tipoPuesto =  values.tipoPuesto
		const estudios = values.estudios
		const personal =  values.personal
		const Jornada = values.Jornada
		const contratacion = values.contratacion
		const Tiempo_puestoActual = values.Tiempo_puestoActual 
		const experiencia_Laboral = values.experiencia_Laboral  
		const rotacion = values.rotacion
	  
	  
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
		 console.log("exito no empleados",datos)

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
			console.log("exito empleados registrados" , datos.data.data.authRegisterSingleEmployee[0].max)
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
			console.log("los segundos datos" , datos)
			
			
			});   
		} else{
	
			DialogUtility.alert({
				animationSettings: { effect: 'Zoom' },           
				content: 'Su suscripción no le permite registrar mas Empleados, por favor póngase en contacto con su asesor para ampliar el numero de sus usuarios. !',
				position: "fixed",
			})
			localStorage.removeItem("max")
		}  
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

			<header>
			  <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
			   <MiniDrawer/>
				<MDBNavbarBrand a href="./inicio">
				<AppNavbarBrand
                    full={{ src: diagnostico, width: 100, height: 33, alt: 'DIAGNOSTICO' }} />               
				</MDBNavbarBrand>
				<MDBNavbarBrand >
				<strong> Registrar Empleados</strong>
				</MDBNavbarBrand>
				<MDBNavbarNav left>
			  <MDBNavItem active>
				<MDBNavLink to="/adminGral">Administración general de mi Empresa</MDBNavLink>
			  </MDBNavItem>
			</MDBNavbarNav>

				<MDBNavbarToggler onClick={this.onClick} />
				<MDBCollapse isOpen={this.state.collapse} navbar>
  
				</MDBCollapse>
			  </MDBNavbar>
			
			</header>
				<MDBContainer style = {{marginTop:60}}>
				<MDBRow><MDBCol>
					
				<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
					<Form
					onSubmit={this.onSubmit}
					
					validate={this.validate}
					render={({ handleSubmit, submitting,values }) => (
						<form onSubmit={handleSubmit}>
						<Alert color="primary">Información general</Alert>
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
								label="Año de Nacimiento"
								formControlProps={{ fullWidth: true }}
								>
								<MenuItem value="1950">1950</MenuItem>
								<MenuItem value="1951">1951</MenuItem>
								<MenuItem value="1952">1952</MenuItem>
								<MenuItem value="1953">1953</MenuItem>
								<MenuItem value="1954">1954</MenuItem>
								<MenuItem value="1955">1955</MenuItem>
								<MenuItem value="1956">1956</MenuItem>
								<MenuItem value="1957">1957</MenuItem>
								<MenuItem value="1958">1958</MenuItem>
								<MenuItem value="1959">1959</MenuItem>
								<MenuItem value="1960">1960</MenuItem>
								<MenuItem value="1961">1961</MenuItem>
								<MenuItem value="1962">1962</MenuItem>
								<MenuItem value="1963">1963</MenuItem>
								<MenuItem value="1964">1964</MenuItem>
								<MenuItem value="1965">1965</MenuItem>
								<MenuItem value="1966">1966</MenuItem>
								<MenuItem value="1967">1967</MenuItem>
								<MenuItem value="1968">1968</MenuItem>
								<MenuItem value="1969">1969</MenuItem>
								<MenuItem value="1970">1970</MenuItem>
								<MenuItem value="1971">1971</MenuItem>
								<MenuItem value="1972">1972</MenuItem>
								<MenuItem value="1973">1973</MenuItem>
								<MenuItem value="1974">1974</MenuItem>
								<MenuItem value="1975">1975</MenuItem>
								<MenuItem value="1976">1976</MenuItem>
								<MenuItem value="1977">1977</MenuItem>
								<MenuItem value="1979">1979</MenuItem>
								<MenuItem value="1980">1980</MenuItem>
								<MenuItem value="1981">1981</MenuItem>
								<MenuItem value="1982">1982</MenuItem>
								<MenuItem value="1983">1983</MenuItem>
								<MenuItem value="1984">1984</MenuItem>
								<MenuItem value="1985">1985</MenuItem>
								<MenuItem value="1986">1986</MenuItem>
								<MenuItem value="1987">1987</MenuItem>
								<MenuItem value="1988">1988</MenuItem>
								<MenuItem value="1989">1989</MenuItem>
								<MenuItem value="1990">1990</MenuItem>
								<MenuItem value="1991">1991</MenuItem>
								<MenuItem value="1992">1992</MenuItem>
								<MenuItem value="1993">1993</MenuItem>
								<MenuItem value="1994">1994</MenuItem>
								<MenuItem value="1995">1995</MenuItem>
								<MenuItem value="1996">1996</MenuItem>
								<MenuItem value="1997">1997</MenuItem>
								<MenuItem value="1998">1998</MenuItem>
								<MenuItem value="1999">1999</MenuItem>
								<MenuItem value="2000">2000</MenuItem>
								<MenuItem value="2001">2001</MenuItem>

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
								
								<MenuItem value="sinInfo">Sin Información</MenuItem>
								<MenuItem value="operativo">Operativo</MenuItem>
								<MenuItem value="profesionalTecnico">Profesional o Técnico</MenuItem>
								<MenuItem value="supervisor">Supervisor</MenuItem>
								<MenuItem value="gerencial">Gerencial</MenuItem>
								<MenuItem value="directivo">Directivo</MenuItem>

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
			
								<MenuItem value="Sin formación">Sin formación</MenuItem>
								<MenuItem value="Primaria">Primaria</MenuItem>
								<MenuItem value="Secundaria">Secundaria</MenuItem>
								<MenuItem value="Preparatoria o Bachillerato">Preparatoria o Bachillerato</MenuItem>
								<MenuItem value="Licenciatura">Licenciatura</MenuItem>
								<MenuItem value="Maestría">Maestría</MenuItem>
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
								<MenuItem value="Fijo diurno (entre las 6:00 y 20:00 hrs">Fijo diurno (entre las 6:00 y 20:00 hrs</MenuItem>
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
								<MenuItem value="por tiempo">Por tiempo determinado (temporal)</MenuItem>
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
										value="hombre"
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
										value="mujer"
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
