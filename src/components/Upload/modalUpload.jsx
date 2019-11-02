import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter} from 'reactstrap';
import Upload from './Employes';
import {MDBBtn} from 'mdbreact'


const ModalPrueba = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  
  const handleToggle = () => setModal(!modal);
  

  return (
    <div>
      <Button  color="primary" onClick={toggle}>{buttonLabel}Cargar Empleados</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} tabindex="-1" >
        <ModalBody>
        <Upload/>
        </ModalBody>
        <MDBBtn color="secondary" onClick={handleToggle}>Cerrar</MDBBtn>
      </Modal>
    </div>
  );
}

export default ModalPrueba ;