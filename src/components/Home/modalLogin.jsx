import React, { useState } from 'react';
import { Button, Modal, ModalBody, } from 'reactstrap';
import Login from '../views/Login/login'
const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button  color="secondary" onClick={toggle}>{buttonLabel}Iniciar Sesion</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        {/* <ModalHeader toggle={toggle}></ModalHeader> */}
        <ModalBody>
         <Login></Login>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}></Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
}

export default ModalExample;