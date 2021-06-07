import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom'
import SettingsIcon from '@material-ui/icons/Settings';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import DirectionsWalkOutlinedIcon from '@material-ui/icons/DirectionsWalkOutlined';
import ComputerOutlinedIcon from '@material-ui/icons/ComputerOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
const drawerWidth = 290;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
      width: theme.spacing(0) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
    // ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));

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
        <Link to="/sucursales" style={{ textDecoration: 'none',color: 'blue' }}>
        <List >
          {['Agregar centros de trabajo'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z"/></svg></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </Link>
        <Link to="/puestosDeptos" style={{ textDecoration: 'none',color: 'blue' }}>
        <List >
          {['Agregar Puestos y Deptos'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
      
        <Link to="/employees" style={{ textDecoration: 'none',color: 'blue' }}>
        <List >
          {['Agregar empleados'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M9 8c1.11 0 2-.9 2-2s-.89-2-2-2c-1.1 0-2 .9-2 2s.9 2 2 2zm4 0c1.11 0 2-.9 2-2s-.89-2-2-2c-.36 0-.69.1-.98.27.3.51.48 1.1.48 1.73s-.18 1.22-.48 1.73c.29.17.63.27.98.27zM9 9.2c-1.67 0-5 .83-5 2.5V13h10v-1.3c0-1.67-3.33-2.5-5-2.5zM5 7H3V5H2v2H0v1h2v2h1V8h2V7zm9.23 2.31c.75.6 1.27 1.38 1.27 2.39V13H18v-1.3c0-1.31-2.07-2.11-3.77-2.39z"/></svg> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>  
        <Link to="/adminGral" style={{ textDecoration: 'none',color: 'blue'}}>
        <List >
          {['Gestionar mi Empresa'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
        <Link to="/inicio" style={{ textDecoration: 'none',color: 'blue' }}>
        <List >
          {['Página de inicio'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
        <Link to="/" style={{ textDecoration: 'none',color: 'blue' }}>
        <List >
          {['Cerrar sesión'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
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
