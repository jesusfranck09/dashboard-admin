import React from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
// import ModalLogin from '../reciclaje/modalLogin'
// import ModalSignup from '../views/Login/reciclaje/modalSignup'
// import { Row, Col } from 'reactstrap'
import Sidebar from './sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import './index.css'


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onClick = this.onClick.bind(this);

  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  render() {
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
    return (
      <div>

        <Router>
          <header>
          
            <MDBNavbar className = "navbar" style={bgPink} dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
                <AppNavbarBrand
                  full={{ src: logo, width: 89, height: 25, alt: 'ADS' }} />
                {/* <strong>Bienvenido</strong> */}
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="www.ads.com.mx">Inicio</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#/cuestions">Realizar encuesta</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#">Beneficios</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#">Opciones</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    Bienvenido
                    {/* <MDBNavLink to="#">Bienvenido<MDBIcon fab icon="facebook-f" /></MDBNavLink> */}
                  </MDBNavItem>
                  {/* <Row>
                    <MDBNavItem>
                      <ModalLogin />
                    </MDBNavItem>
                    <Col>
                      <MDBNavItem>
                        <ModalSignup />
                      </MDBNavItem>
                    </Col>
                  </Row> */}
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
            
          </header>
        </Router>
        <MDBContainer style={container} className="text-center mt-5 pt-5">
         
        </MDBContainer>
        
        <Sidebar></Sidebar>
      </div>
    );
  }
}

export default Home;