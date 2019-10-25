import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const REGISTERRS = gql`
    mutation REGISTERRS($data:[String]!){
        registerRS(data:$data){
                message

            }
    }
`


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
          data:[]

        }
      }

    handleInput = (e) => {
        
        const {id, value} = e.target
         this.setState({
            [id]:value
           
        });
        
      }
      
    
      
      handleForm = (e, registerRS) => {
        e.preventDefault();
        // const rfc = this.state.rfc
        // const razonSocial = this.state.razonsocial
        // const empleados = this.state.empleados
        // const representante = this.state.representante
        // const direccion  = this.state.direccion
        // const telefono  = this.state.telefono
        // const correo   = this.state.correo 
    
        console.log('Enviando formulario...');
      
        registerRS({variables: { 
            ...this.rfc,
            ...this.razonSocial
            
        }});
      }

      
      handleData = (data) => {
        console.log("la data  que deberia ser es " , this.state)
        alert('Registro Exitoso');
     
      }
      
      handleError = (error) => {
        alert('Error en en el Registro...');
      }

  render(){
    return (
        <Mutation mutation={REGISTERRS}>
        {
(registerRS, {data, error, loading}) => {
    if (loading) console.log(loading);
   if (data) this.handleData(data);
   if (error) this.handleError(error);


  return (
    <React.Fragment>
 <form onSubmit={e => this.handleForm(e, registerRS)}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
       
        {/* <Avatar className={classes.avatar}>
        <BusinessOutlinedIcon />
        </Avatar> */}
        
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
        </Mutation>

    )
  }
  }


export default Cuestions