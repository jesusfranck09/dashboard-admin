import React from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
// import ModalLogin from '../reciclaje/modalLogin'
// import ModalSignup from '../views/Login/reciclaje/modalSignup'
// import { Row, Col } from 'reactstrap'
import Carrousell from './carrousel'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'


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
    const bgPink = { backgroundColor: '#04B4AE' }
    const container = { width: 2500, height: 1300 }
    return (
      <div>
        <Router>
          <header>
            <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
                <AppNavbarBrand
                  full={{ src: logo, width: 89, height: 25, alt: 'ADS' }} />
                {/* <strong>Bienvenido</strong> */}
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="#">Inicio</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#">Sevicios</MDBNavLink>
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
                    <MDBNavLink to="#"><MDBIcon fab icon="facebook-f" /></MDBNavLink>
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
          <Carrousell></Carrousell>
        </MDBContainer>
      </div>
    );
  }
}

export default Home;