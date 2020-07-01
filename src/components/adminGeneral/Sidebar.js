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
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {Link} from 'react-router-dom'
import ApartmentIcon from '@material-ui/icons/Apartment';
// import AssessmentIcon from '@material-ui/icons/Assessment';
import BarChartIcon from '@material-ui/icons/BarChart';
import EventNoteIcon from '@material-ui/icons/EventNote';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import TimelineIcon from '@material-ui/icons/Timeline';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import ExplicitOutlinedIcon from '@material-ui/icons/ExplicitOutlined';
import DonutSmallOutlinedIcon from '@material-ui/icons/DonutSmallOutlined';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import DoneIcon from '@material-ui/icons/Done';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import DirectionsWalkOutlinedIcon from '@material-ui/icons/DirectionsWalkOutlined';
import ComputerOutlinedIcon from '@material-ui/icons/ComputerOutlined';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';

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
        <Link to="/sucursales" style={{ textDecoration: 'none' }}>
        <List >
          {['Agregar centros de trabajo'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <EmojiTransportationIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </Link>
        <Link to="/puestosDeptos" style={{ textDecoration: 'none' }}>
        <List >
          {['Agregar Puestos y Deptos'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <ComputerOutlinedIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
      
        <Link to="/employees" style={{ textDecoration: 'none' }}>
        <List >
          {['Agregar empleados'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <DirectionsWalkOutlinedIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>  
        <Link to="/adminGral" style={{ textDecoration: 'none' }}>
        <List >
          {['Gestionar mi Empresa'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <SettingsIcon  /> </ListItemIcon>
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
