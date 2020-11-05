// import axios from 'axios' 
// import {API} from './http'



// export  const getResultGlobalSurveyATS  = (id) => {

//     let totalEmpleados=[ ];
//     return new Promise ((resolve,reject)=>{    
//     id.map(async function(rows){
//        await axios({
//          url:  API,
//          method:'post',
//          data:{
//          query:`
//            query{
//              getresultGlobalSurveyATS(data:"${[rows.id,rows.periodo]}"){
//              id 
//              Respuestas 
//              fk_preguntasATS
//              fk_Empleados 
//              nombre 
//              ApellidoP 
//              ApellidoM 
//              Curp 
//              RFC 
//              FechaNacimiento 
//              Sexo 
//              EstadoCivil 
//              AreaTrabajo 
//              Puesto 
//              TipoPuesto 
//              NivelEstudios 
//              TipoPersonal 
//              JornadaTrabajo 
//              TipoContratacion 
//              TiempoPuesto 
//              ExperienciaLaboral 
//              RotacionTurnos 
//              CentroTrabajo
//              fk_administrador 
//              fk_correos 
//                  }
//                }
//              `
//          }
//              }).then(function(datos)  {  
//               totalEmpleados.push(datos.data.data.getresultGlobalSurveyATS)
              

//              console.log("totalEmpleados" , totalEmpleados)
                
//             //  this.setState({peticion:totalEmpleados})   
//             //  if(this.state.peticion.length == this.state.empleados.length){
//             //    this.setState({spinner:false})
//             //  }
//              })
//              .catch(err => {
//              });  
//              resolve(totalEmpleados)
//      })
//     })

// } 