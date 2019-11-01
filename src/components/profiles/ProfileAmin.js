import React, { Component } from 'react';
import {MDBBtn,MDBCard,MDBContainer,MDBCardBody,MDBRow ,  MDBCol, MDBCardHeader} from 'mdbreact'
import { string } from 'prop-types';
import {Form, InputGroup, InputGroupAddon, InputGroupText,Col } from 'reactstrap';


class ProfileAdmin extends Component {

    constructor(props){
      super(props);
      this.state = {
          email: '',
          password: '',

            }
        }
        render() {
            return (
                <React.Fragment>
                <div className="app flex-row align-items-center grey-text">
                <MDBContainer>
                        <MDBRow className="justify-content-center">      
                            <MDBCol md="8">
                                <MDBCard className="p-4 " >
                                <MDBCardHeader>
                                   <strong>Datos Generales</strong> 
                                </MDBCardHeader>
                                    <MDBCardBody color = "primary">
                                    <MDBRow>    
                                    <Col>  
                                    <MDBCard >
                                       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBRgURaZlfS3_jtwUNT7IkV_G6ydzVUoxTfap4auRrOaoeL0RX"></img> 
                                    </MDBCard>
                                    </Col>  
                                    <Col>
                                    <MDBCard >
                                       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBRgURaZlfS3_jtwUNT7IkV_G6ydzVUoxTfap4auRrOaoeL0RX"></img> 
                                    </MDBCard>
                                    </Col>   
                                    </MDBRow>    
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                </MDBContainer>
                </div>
                </React.Fragment>



            )
        }




    }
    export default ProfileAdmin