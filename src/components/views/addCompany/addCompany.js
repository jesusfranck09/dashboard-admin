import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

  makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: theme.spacing(0),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const classes = makeStyles()

class Cuestions extends Component{

    constructor(props){
        super(props);
        this.state = {           
          data:[],
          
        }
      }

    handleInput = (e) => {
        
        const {id, value} = e.target
         this.setState({
            [id]:value,
        });
       
        console.log("el estado es ",this.state)
        
      }

      handleSubmit = event => {
        event.preventDefault();
        const rfc = this.state.rfc
        const razonsocial =this.state.razonsocial
        const empleados = this.state.empleados
        const representante = this.state.representante
        const direccion = this.state.direccion
        const telefono =  this.state.telefono
        const correo = this.state.correo
      
        const url = 'http://localhost:8000/graphql'
        axios({
          url:  url,
          method:'post',
          data:{
          query:`
           mutation{
              registerRS(data:"${[rfc,razonsocial,empleados,representante,direccion,telefono,correo]}"){
                message
                  }
                }
              `
          }
              }).then((datos) => {
                console.log("los datos son ",datos)
                alert("Registro Exitoso");
                this.props.history.push("/inicio")
              });       
            }

      render(){
      return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
             <Typography component="h1" variant="h5" style={{ color: '#AFE1CE' }}>
               <strong>Razón Social</strong>
              </Typography>
      
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="rfc"
                name="RFC"
                variant="outlined"
                required
                fullWidth
                type="text"
                id="rfc"
                label="RFC"
                autoFocus 
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="razonsocial"
                label="Razón Social"
                name="razonsocial"
                autoComplete="razonsocial"
                type="text"
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="empleados"
                label="Número de Empleados"
                name="empleados"
                autoComplete="empleados"
                type="number"
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Representante"
                label="Representante de la Empresa"
                type="text"
                id="representante"
                autoComplete="representante"
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="direccion"
                label="Dirección"
                type="text"
                id="direccion"
                autoComplete="dirección"
                onChange={this.handleInput}
              />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="telefono"
                label="Teléfono"
                type="tel"
                id="telefono"
                autoComplete="telefono"
                onChange={this.handleInput}
              />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="correo"
                label="Correo"
                type="email"
                id="correo"
                autoComplete="correo"
                onChange={this.handleInput}
              />
              
            </Grid>
 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
           <strong>Registrar mi Empresa</strong> 
          </Button>
          </Grid>
        </form>
      </div>
    </Container>
    </form> 
    </React.Fragment>
                    );    

             }
        }


export default Cuestions