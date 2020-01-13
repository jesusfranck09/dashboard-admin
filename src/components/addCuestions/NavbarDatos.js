import React from 'react';
import { MDBNavbar, MDBNavbarBrand,} from 'mdbreact';

import { AppNavbarBrand } from '@coreui/react';
import logo from '../images/logotipo.png'
import '../Home/index.css'


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

  componentWillMount(){

    
    }
  render() {
    const bgPink = { backgroundColor: 'rgba(4, 180, 174,0.5)' }

    return (
      <React.Fragment>
      <div>
          <header>
            <MDBNavbar className = "navbar" style={bgPink} dark expand="sm" scrolling fixed="top">
            <MDBNavbarBrand>
              <AppNavbarBrand/>               
              </MDBNavbarBrand> 
             
              <MDBNavbarBrand>
              <AppNavbarBrand
                  full={{ src: logo, width: 80, height: 25, alt: 'ADS' }} />               
              </MDBNavbarBrand>  
              <MDBNavbarBrand>
              { localStorage.getItem("nombreUsuario")}
              </MDBNavbarBrand>          
              <MDBNavbarBrand>
              {localStorage.getItem("ApellidoPUsuario")}
              </MDBNavbarBrand>   
              <MDBNavbarBrand>
              {localStorage.getItem("ApellidoMUsuario")}
              </MDBNavbarBrand>
              <MDBNavbarBrand>
              
              </MDBNavbarBrand>
              <MDBNavbarBrand>
             Correo: {localStorage.getItem("correoATS")}{localStorage.getItem("correoRP") }{localStorage.getItem("correoEEO")}
              </MDBNavbarBrand>
            </MDBNavbar>
          
          </header>
     
          </div>

      </React.Fragment>
    );
  }
}



export default Home;

