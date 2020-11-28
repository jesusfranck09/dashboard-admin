import React, { useState } from "react";
import { storage } from "./firebase";
import {MDBBtn} from 'mdbreact'
import axios from 'axios'
import {API} from '../utils/http'
import Button from '@material-ui/core/Button'


const ReactFirebaseFileUpdate = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [cargando,setCargando]= useState("");
  const [mensaje,setMensaje] = useState("")
  const [mensaje2,setMensaje2] = useState("")
  const [disabledButton,setDisabledButton] = useState("disabled")
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setCargando("Cargando por favor espere ....")
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
         console.log("error" , error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
             if(url){
                 setCargando("")
            
                const idAdmin = localStorage.getItem("idAdmin")
                axios({
                    url:  API,
                    method:'post',
                    data:{
                    query:`
                    mutation{
                    updateLogo(data:"${[idAdmin,url]}"){
                    message
                            }
                        }
                        `
                    }
                })
                .then(datos => {	
                }).catch(err=>{
                     console.log("error" , err.response)
                })
                setUrl(url);
                setMensaje(`Su logo ha sido cargado con éxito`) 
                setMensaje2(` ... Actualizando por favor espere ... `) 

                setDisabledButton("")
                // setTimeout(()=>{
                // window.location.reload()
                // },5000)     
        }
          });
      }
    );
  };

  return (
    <div>
      <progress style = {{width: 460}} value={progress} max="100" /><br/>
      <strong style={{marginLeft:20}}>{cargando}  {mensaje}<br/><br/>&nbsp;&nbsp;&nbsp;{mensaje2}</strong>
      <br />
      <input type="file"  accept="image/x-png,image/gif,image/jpeg/,image/png" onChange={handleChange} />
      <MDBBtn style={{marginLeft:20}} disabled={!image} color ="primary " onClick={(e) => { if (window.confirm('Su logo será remplazado por la imagen actual , ¿Desea continuar?')) handleUpload()} }>Actualizar logo</MDBBtn>
      <br />
      <br />
      <img width="400" height="400" src={url || "https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"}  alt="firebase-image" />
    </div>
  );
};

export default ReactFirebaseFileUpdate

