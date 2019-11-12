// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import {MDBBtn} from 'mdbreact'



// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//   },
//   paper: {
//     width: '103%',
//     overflowX: 'auto',

//   },
//   table: {
//     minWidth: 760,

//   },
 
// }));

// function createData(name, LastName, curp, rfc, sexo,area,puesto,status,enviar,info) {
//   return { name, LastName, curp, rfc, sexo,area,puesto,status,enviar,info};
// }

// const rows = [
//   createData('Jesus  ', "francisco", "FAFJ92312HVZRRS099", "A78EU1", "H","VENTAS","VENDEDOR",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Cecilia ', "Jimenez", "CEJI922313MMZRRS394", "UJJL24", "M","CONTABILIDAD","CONTADOR",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Jose Alfredo ', "Rios","JAJM94512HVZRRS073", "KÑU7349", "H","RH","JEFE RH",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Alfredo ',"Gonzalez" , "JAGJ92312HVZRRS043", "JKWLE344", "H","ADMINISTRACION","COLABORADOR",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Margarita ',"Almanza", "MAAL92312MVZRRS034", "JJKL33", "M","INGENIERIA","INGENIERO INDUSTRIAL",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Josefina ', "Martinez","JOMA92312MVZRRS434", "56GHGWE", "M","PRODUCCION","COLABORADOR",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Violeta',"Cruz", "VICL92312MVZRR544", "HKJ34WE", "M","TIC","INGENIERO EN SISTEMAS",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
// ];

// export default function DenseTable() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <Table className={classes.table} size="small" aria-label="a dense table">
//           <TableHead>
//             <TableRow  >
//               <TableCell >Nombre</TableCell>
//               <TableCell align="right">Apellidos</TableCell>
//               <TableCell align="right">Curp</TableCell>
//               <TableCell align="right">Rfc</TableCell>
//               <TableCell align="right">Sexo</TableCell>
//               <TableCell align="right">Area</TableCell>
//               <TableCell align="right">Puesto</TableCell>
//               <TableCell align="right"> </TableCell>
//               <TableCell align="right"></TableCell>
//               <TableCell align="right"></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map(row => (
//               <TableRow key={row.name}>
//                 <TableCell component="th" scope="row">
//                   {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.LastName}</TableCell>
//                 <TableCell align="right">{row.curp}</TableCell>
//                 <TableCell align="right">{row.rfc}</TableCell>
//                 <TableCell align="right">{row.sexo}</TableCell>
//                 <TableCell align="right">{row.area}</TableCell>
//                 <TableCell align="right">{row.puesto}</TableCell>
//                 <TableCell align="right">{row.status}</TableCell>
//                 <TableCell align="right">{row.enviar}</TableCell>
//                 <TableCell align="right">{row.info}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </div>
//   );
// }


