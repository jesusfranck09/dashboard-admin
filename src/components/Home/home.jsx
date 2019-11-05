import React from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBBtn} from 'mdbreact';
import Sidebar from './sidebar'
import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import './index.css'
import { isAuthenticated } from '../utils';

import { Link } from 'react-router-dom';
import {

  NavItem,
  NavLink,
  } from 'reactstrap';
 

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isOpen: false,
      auth: isAuthenticated()
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }


  renderAuth = () => {
    console.log(this.state.auth);
    if( !this.state.auth ){
      return <React.Fragment>
                <NavItem>
                  <NavLink>
                    <Link 
                      style={{
                        textDecoration: 'none',
                        color: 'white'
                      }}
                      to="/signup">Signup</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link
                      style={{
                        textDecoration: 'none',
                        color: 'white'
                      }} 
                      to="/login">Login</Link>
                  </NavLink>
                </NavItem>
              </React.Fragment>
    } else {
      return <React.Fragment>
      <NavItem>
        <NavLink>
          <Link 
            style={{
              textDecoration: 'none',
              color: 'white'
            }}
            to="/logout">Logout</Link>
        </NavLink>
      </NavItem>
    </React.Fragment>
    }
    }
  
  render() {
    const { children, ...attributes } = this.props;
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }
    const container = { width: 2500, height: 1300 }
    return (


      <React.Fragment>
      <div>
          <header>
      
            <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
            <Sidebar/>
              <MDBNavbarBrand href="/">
                <AppNavbarBrand
                  full={{ src: logo, width: 80, height: 25, alt: 'ADS' }} />               
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="/employees">Cargar Empleados</MDBNavLink>
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
                  <MDBNavLink to="#">Mi Perfil</MDBNavLink>
                </MDBNavItem>

                </MDBNavbarNav>
              </MDBCollapse>
              
            </MDBNavbar>
          </header>
        <MDBContainer style={container} className="text-center mt-2 pt-5">
    
      
        {/* <MDBDataTable /> */}
        </MDBContainer>
    
      </div>
      </React.Fragment>
    );
  }
}



export default Home;

