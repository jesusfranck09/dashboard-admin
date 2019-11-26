import React , { useState } from 'react'
import XLSX from 'xlsx'
import {MDBCol} from "mdbreact";
import axios from 'axios';
import { Alert } from 'reactstrap';
import payload from '../../resolvers/payload';
import { Button, Modal, ModalBody} from 'reactstrap';
import {MDBRow, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBBtn} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'
import FormEmployee from './formEmployee'


class CargarArchivos extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		collapse: false,
		isOpen: false,
	  
	  };
	  this.onClick = this.onClick.bind(this);
	}
	onClick() {
	  this.setState({
		collapse: !this.state.collapse,
	  });
	}
  
	render() {
	  // const { children, ...attributes } = this.props;
	  const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
	  const container = { width: 2500, height: 1300 }
	  return (
  
  
		<React.Fragment>
		<div>
			<header>
			  <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
			  <Sidebar/>
				<MDBNavbarBrand href="/inicio">
				  <AppNavbarBrand
					full={{ src: logo, width: 80, height: 25, alt: 'ADS' }} />               
				</MDBNavbarBrand>
				<MDBNavbarToggler onClick={this.onClick} />
				<MDBCollapse isOpen={this.state.collapse} navbar>
				  <MDBNavbarNav left>
					<MDBNavItem active>
					  <MDBNavLink to="/employees">Cargar Empleados</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem>
					  <MDBNavLink to="#">Beneficios</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem>
					  <MDBNavLink to="#">Opciones</MDBNavLink>
					</MDBNavItem>
				  </MDBNavbarNav>
				  <MDBNavbarNav right>
				  <MDBNavItem>
					<MDBNavLink to="#">Mi Perfil</MDBNavLink>
				  </MDBNavItem>
				  </MDBNavbarNav>
				</MDBCollapse>
			  </MDBNavbar>
			</header>
		  <MDBContainer style={container} className="text-center mt-2 pt-5">
  
		<MDBRow>
		  <MDBCol><FormEmployee/></MDBCol> <MDBCol  md="3" className="white-text text-center text-md-left mt-xl-5 mb-5"><strong>¿Desea cargar por csv o xls?</strong> <ModalPrueba/></MDBCol> 
		</MDBRow>
		  </MDBContainer>
		</div>
		</React.Fragment>
	  );
	}
  }

  const ModalPrueba = (props) => {
	const {
	  buttonLabel,
	  className
	} = props;
  
	const [modal, setModal] = useState(false);
  
	const toggle = () => setModal(!modal);
	
	const handleToggle = () => setModal(!modal);
	
  
	return (
	  <div>
		<Button  color="primary" onClick={toggle}>{buttonLabel}Cargar Empleados</Button>
		<Modal isOpen={modal} toggle={toggle} className={className} tabindex="-1" >
		  <ModalBody>
		  <SheetJSApp/>
		  </ModalBody>
		  <MDBBtn color="secondary" onClick={handleToggle}>Cerrar</MDBBtn>
		</Modal>
	  </div>
	);
  }
  




class SheetJSApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			emailAdmin:[],
			passAdmin:[]
	
		};
		this.handleFile = this.handleFile.bind(this);
		this.exportFile = this.exportFile.bind(this);
	};

    handleSubmit = event => {
		event.preventDefault();

		console.log("el estado en la posicion local es " ,  this.state.emailAdmin,this.state.passAdmin)
 
        for (var i=0; i< this.state.data.length; i++)
     	  {
			// console.log(this.state.data[i])
				const url  = 'http://localhost:8000/graphql'
				var estado = this.state.data[i]	
				const query =  `
				mutation {
					registerEmployee(
						data:["${estado},${this.state.emailAdmin},${this.state.passAdmin}"]
					){
						message
					}
				}
				`;
				axios({
				url:  url,
				method: 'post',
				data: {
					query,
					variables: {
						data: `${estado}`
					}
				}
					}).then((result) => {
					})
					 .catch((error) => {
					 console.log(".cartch" , error.response)
				});
				};
				

				// const correoAdmin =  pl.email
				// const passAdmin = pl.password
				// console.log("correoAdmin " , correoAdmin)
				// console.log("passadmin", passAdmin)
				// axios({
				// 	url:  uri,
				// 	method:'post',
				// 	data:{
				// 	query:`
				// 	 mutation{
				// 		fkEmployee(email:"${correoAdmin}", password:"${passAdmin}"){
				// 		  message
				// 			}
				// 		  }
				// 		`
				// 	}
				// 		}).then((datos) => {
				// 		  console.log("los datos son ",datos)
				// 		  alert("Registro Exitoso");
				// 		  // this.props.history.push("/inicio")
				// 		}); 
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
			const token = localStorage.getItem('elToken')
			let pl = payload(token);
			var correoAdmin  = pl.email
			var passAdmin = pl.password 

			//aqui podemos visualizar la data
            this.setState({ data: data, emailAdmin:correoAdmin,passAdmin:passAdmin });
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
                    <MDBCol className=" text-center mt-2 pt-2 ml-4" >
                    <MDBBtn className="boton mr-6 " disabled={!this.state.data.length}  color="info" type="submit" onClick={this.handleSubmit } >Cargar </MDBBtn>
                 
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
export default CargarArchivos ;