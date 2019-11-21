import React from 'react'
import XLSX from 'xlsx'
import {MDBBtn ,MDBCol} from "mdbreact";
import axios from 'axios';
import { Alert } from 'reactstrap';
import payload from '../../resolvers/payload';
// import ReactDom from 'react-dom'
// import { readdirSync } from 'fs';

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

export default SheetJSApp;