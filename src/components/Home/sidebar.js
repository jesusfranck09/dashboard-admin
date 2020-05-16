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
const drawerWidth = 240;

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
      width: theme.spacing(9) + 1,
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
        {/* <Divider /> */}
        {/* <Link to="/company" style={{ textDecoration: 'none' }}>
        <List >
          {[' Sucursal Principal'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <ApartmentIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </Link> */}

        <Link to="/table" style={{ textDecoration: 'none' }}>
        <List >
          {['Enviar Evaluaciones'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <MailOutlineIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>

        <Link to="/res" style={{ textDecoration: 'none' }}>
        <List >
          {['Res.EvaluacionesATS'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <BarChartIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
        <Link to="/resultRP" style={{ textDecoration: 'none' }}>
        <List >
          {['Res.EvaluacionesRP'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <EventNoteIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
        <Link to="/resultEEO" style={{ textDecoration: 'none' }}>
        <List >
          {['Res.EvaluacionesEEO'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <MenuBookIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
        <Link to="/indexAts" style={{ textDecoration: 'none' }}>
        <List >
          {['Res. GlobalesATS'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <TextFormatIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>

        <Link to="/resultGral" style={{ textDecoration: 'none' }}>
        <List >
          {['Res. GlobalesRP'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <TrendingUpRoundedIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>
        <Link to="/resultGralEEO" style={{ textDecoration: 'none' }}>
        <List >
          {['Res. GlobalesEEO'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <ExplicitOutlinedIcon /> </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>    
        </Link>

        <Divider />

        <Link to="/estadisticas" style={{ textDecoration: 'none' }}>
        <List >
          {['Estadísticas'].map((text) => (
            <ListItem button key={text} >
              <ListItemIcon> <DonutSmallOutlinedIcon  /> </ListItemIcon>
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
