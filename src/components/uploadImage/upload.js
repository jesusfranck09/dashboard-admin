import React, { useState } from "react";
import { render } from "react-dom";
import { storage } from "./firebase";
import CircularProgress from '@material-ui/core/CircularProgress';
import {MDBBtn} from 'mdbreact'
import axios from 'axios'
import {API} from '../utils/http'
import { createHashHistory } from "history";


const ReactFirebaseFileUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [cargando,setCargando]= useState("");
  const [mensaje,setMensaje] = useState("")
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
        // console.log(error);
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
                    loadLogo(data:"${[idAdmin,url]}"){
                    message
                            }
                        }
                        `
                    }
                })
                .then(datos => {	
                    console.log("datos",datos)
                }).catch(err=>{
                    // console.log("error" , err)
                })
                setUrl(url);
                setMensaje("Su logo ha sido cargado con éxito") 
                setDisabledButton("")     
                window.location.reload()
        }
          });
      }
    );
  };

  return (
    <div>
      <progress style = {{width: 460}} value={progress} max="100" /><br/>
      <strong style={{marginLeft:20}}>{cargando}  {mensaje}</strong>
      <br />
      <input type="file"  accept="image/x-png,image/gif,image/jpeg/,image/png" onChange={handleChange} />
      <MDBBtn disabled={!disabledButton} color ="success" onClick={handleUpload}>Cargar</MDBBtn>
      <br />
      <br />
      <img width="400" height="400" src={url || "https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png"}  alt="firebase-image" />
    </div>
  );
};

export default ReactFirebaseFileUpload