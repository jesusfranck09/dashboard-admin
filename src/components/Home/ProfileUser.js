import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {MDBMask,MDBAnimation} from 'mdbreact'
import axios from  'axios'
import { Image } from 'semantic-ui-react'
import AddressAdmin from  './addressAdmin'


const useStyles = makeStyles(theme => ({
    root: {
        width: 500,
        height: 500,
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      bigAvatar: {
        width: 200,
        height: 200,
      },
  card: {
    width: 700,
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    marginLeft:100
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(200deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

//WARNING! To be deprecated in React v17. Use componentDidMount instead.


export default function RecipeReviewCard() {

  var LaFecha=new Date();
  var Mes=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasem=new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
  var diasemana=LaFecha.getDay();
  var FechaCompleta="";
  var NumeroDeMes="";    
  NumeroDeMes=LaFecha.getMonth();
  FechaCompleta=diasem[diasemana]+" "+LaFecha.getDate()+" de "+Mes[NumeroDeMes]+" de "+LaFecha.getFullYear();
  var nombre = localStorage.getItem("nombre")
  var apellidos = localStorage.getItem("apellidos")
  var rfc = localStorage.getItem("rfc")
  var razonsocial = localStorage.getItem("razonsocial")
  var usuario = localStorage.getItem("usuario")
  var correo = localStorage.getItem("correo")
 
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [datosAdmin, setdatosAdmin] = React.useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
 

    const url = 'http://localhost:8000/graphql'
    axios({
      url:  url,
      method:'post',
      data:{
      query:`
       mutation{
        getAdmin(data:"${[correo]}"){
            id
              }
            }
          `
      }
          }).then((datos) => {
           console.log("datos " , datos.data.data.getAdmin)
           var resultado = Object.keys(datos.data.data.getAdmin).length
           setdatosAdmin(resultado);

          }).catch((err) =>{
            console.log("error", err.response)
          })
  };


  return (
    <MDBMask style={{marginTop:30}} className="d-flex justify-content-center align-items-center gradient">
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar  aria-label="recipe" className={classes.avatar}>
           { nombre[0]}
          </Avatar>
        }

        
    
        subheader={nombre}
        // subheader={FechaCompleta}
        action={
           <strong>{FechaCompleta}</strong> 
          }
      />
<Image style={{marginLeft:240}} height={150} src={'https://image.flaticon.com/icons/svg/180/180677.svg'} />
      {/* <div className={classes.bigAvatar}>
      <Avatar alt="Remy Sharp" src="https://image.flaticon.com/icons/svg/180/180677.svg" />
    </div> */}
     
                  
      <CardContent width={300}>
        <Typography variant="body2" color="textSecondary" component="p">
         Rol: Administrador
         <br/>   
         Nombre : {nombre}
         <br/>
         Apellidos : {apellidos}
         <br/>
         RFC : {rfc}
         <br/>
         Razón Social :{razonsocial}
         <br/>
         Usuario : {usuario}
         <br/>
         correo : {correo}
         <br/>
          Número de Trabajadores : {datosAdmin}
        
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent >
          <Typography paragraph>Dirección</Typography>
        
         <AddressAdmin/>
         
          <Typography paragraph>
         undefined
          </Typography>
          <Typography paragraph>
           undefined
          </Typography>
          <Typography>
          undefined          
            </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </MDBMask>
  );
}