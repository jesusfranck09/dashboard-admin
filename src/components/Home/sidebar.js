import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Link} from 'react-router-dom'
import ApartmentIcon from '@material-ui/icons/Apartment';
import payload from '../../resolvers/payload';
import axios from 'axios';
import  TableEmployees from  './table'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const evaluar = () => {

  // const token = localStorage.getItem('elToken')
  // let pl = payload(token);

  // const correoAdmin =  pl.email

  // const url = 'http://localhost:8000/graphql'
  // axios({
  //   url:  url,
  //   method:'post',
  //   data:{
  //   query:`
  //    query{
  //     getUsersTableEmployees(email:"${correoAdmin}"){
  //       correo
  //       nombre
  //       RFC
  //         Apellidos
  //         Usuario
  //         }
  //       }
  //       `
  //   }
  //       }).then((datos) => {
  //         console.log("los datos son ",datos.data.data.getUsersTableEmployees)
         
  //       })

  //       .catch((error) => {
    
  //         //console.log("errores" ,error.response.data.errors[0].message)
  //         console.log(".cartch" , error.response)
  //      });

}

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      > */}
     
      {/* </AppBar> */}
      <Drawer

        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
         
          
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        {/* <Divider /> */}
        <Link to="/company" style={{ textDecoration: 'none' }}>
        <List >
          {['Alta de Empresas'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <ApartmentIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </Link>

        <Link to="/table" style={{ textDecoration: 'none' }}>
        <List >
          {['Consultar Empleados'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <PersonAddIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>


        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        
      </Drawer>
      <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            
         
          <MenuIcon  />
          
          </IconButton>
    </div>
  );
}
