import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import Table from './tables'
import axios from 'axios';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBBtn} from 'mdbreact';
import Sidebar from '../Home/sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'



class TableEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isOpen: false,
      datos:[]
    
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }


  getEmployees = event => {

      var correo  = "d93409@gmail.com"


      
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
           query{
            getUsersTableEmployees(email:"${correo}"){
              correo
              nombre
              RFC
                Apellidos
                Usuario
                }
              }
              `
          }
              }).then((datos) => {
                console.log("los datos son ",datos.data.data.getUsersTableEmployees)
                this.setState({ datos: datos.data.data});
              

          console.log("la data del estado es " , this.state.datos) 
                // this.props.history.push("/inicio")
              })

              .catch((error) => {
          
                //console.log("errores" ,error.response.data.errors[0].message)
                console.log(".cartch" , error.response)
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
                  <MDBNavItem active>
                    <MDBNavLink to="/survey">Cuestionario ATS</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active>
                    <MDBNavLink to="/politicaRP">Cuestionario RP</MDBNavLink>
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
        <MDBBtn onClick = {this.getEmployees} >consulta </MDBBtn>
    <ScrollableTabsButtonAuto datos={this.state.datos}></ScrollableTabsButtonAuto>
        
        {/* <MDBDataTable /> */}
        </MDBContainer>
    
      {/* <ScrollableTabsButtonAuto></ScrollableTabsButtonAuto> */}
      </div>
      </React.Fragment>
    );
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '103%',
    overflowX: 'auto',

  },
  table: {
    minWidth: 760,

  },
 
}));

// function createData(name, LastName, curp, rfc, sexo,area,puesto,status,enviar,info) {
//   return { name, LastName, curp, rfc, sexo,area,puesto,status,enviar,info};
// }

// const rows = [
//   createData("props.data", "francisco", "FAFJ92312HVZRRS099", "A78EU1", "H","VENTAS","VENDEDOR",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Cecilia ', "Jimenez", "CEJI922313MMZRRS394", "UJJL24", "M","CONTABILIDAD","CONTADOR",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Jose Alfredo ', "Rios","JAJM94512HVZRRS073", "KÑU7349", "H","RH","JEFE RH",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Alfredo ',"Gonzalez" , "JAGJ92312HVZRRS043", "JKWLE344", "H","ADMINISTRACION","COLABORADOR",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Margarita ',"Almanza", "MAAL92312MVZRRS034", "JJKL33", "M","INGENIERIA","INGENIERO INDUSTRIAL",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Josefina ', "Martinez","JOMA92312MVZRRS434", "56GHGWE", "M","PRODUCCION","COLABORADOR",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
//   createData('Violeta',"Cruz", "VICL92312MVZRR544", "HKJ34WE", "M","TIC","INGENIERO EN SISTEMAS",<MDBBtn color="danger" >Status</MDBBtn>,<MDBBtn color="success" >Enviar</MDBBtn>,<MDBBtn color="primary" >Detalles</MDBBtn>),
// ];

 function DenseTable(props) {
  const classes = useStyles();


  const propiedades = (event)=> {
    console.log("estas son las props en densetable" , props.data.getUsersTableEmployees)
  };

  if(props !== undefined){
  return (
    <div className={classes.root}>
      <Paper >
      <button  onClick ={propiedades}>props</button>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow  >
              <TableCell >Nombre</TableCell>
              <TableCell align="right">Apellidos</TableCell>
              <TableCell align="right">Curp</TableCell>
              <TableCell align="right">Rfc</TableCell>
              <TableCell align="right">Sexo</TableCell>
              <TableCell align="right">Area</TableCell>
              <TableCell align="right">Puesto</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
       

              <TableRow >
                <TableCell component="th" scope="row">
             1
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
                <TableCell align="right">4</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">6</TableCell>
        <TableCell align="right">{}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                

   
              </TableRow>
          
          
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
  }
}




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={4}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const UseStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0,
    width: '140%',
    marginTop: theme.spacing(0),
    backgroundColor: theme.palette.background.paper,
  },
}));

function ScrollableTabsButtonAuto(props) {
  const classes = UseStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="info">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="light"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Colaboradores" {...a11yProps(0)} />
          
          
          {/* <Tab label="Enviar" {...a11yProps(1)} />
          <Tab label="Estadisticas" {...a11yProps(2)} />
          <Tab label="Ranking" {...a11yProps(3)} />
          <Tab label="Status" {...a11yProps(4)} />
          <Tab label="asd" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0}>
         
      <DenseTable data = {props.datos}  ></DenseTable> 
      </TabPanel>
      
      <TabPanel value={value} index={1}>

      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
    </div>
  );
}

export default TableEmployees