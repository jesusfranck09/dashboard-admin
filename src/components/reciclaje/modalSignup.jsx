// import React, { useState } from 'react';
// import { Button, Modal, ModalBody, } from 'reactstrap';
// import Signup from '../views/SignUp/signup'
// const ModalExample = (props) => {
//   const {
//     buttonLabel,
//     className
//   } = props;

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

//   return (
//     <div>
//       <Button  color="secondary" onClick={toggle}>{buttonLabel}Registrate
//       </Button>
//       <Modal isOpen={modal} toggle={toggle} className={className}>
//         {/* <ModalHeader toggle={toggle}></ModalHeader> */}
//         <ModalBody>
//          <Signup></Signup>
//         </ModalBody>
//         {/* <ModalFooter>
//           <Button color="primary" onClick={toggle}></Button>{' '}
//           <Button color="secondary" onClick={toggle}>Cancel</Button>
//         </ModalFooter> */}
//       </Modal>
//     </div>
//   );
// }

// export default ModalExample;