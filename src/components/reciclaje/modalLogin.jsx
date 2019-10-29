import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter} from 'reactstrap';
import Upload from '../Upload/Employes';


const ModalPrueba = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button  color="primary" onClick={toggle}>{buttonLabel}Cargar Empleados</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} tabindex="-1">
        {/* <ModalHeader toggle={toggle}></ModalHeader> */}
        <ModalBody>
        <Upload/>
        </ModalBody>
        {/* <ModalFooter>
          
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
}

export default ModalPrueba ;