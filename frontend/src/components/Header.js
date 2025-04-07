import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaRecycle, FaUser } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect className="py-2 shadow-sm">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <FaRecycle className="me-2" size={24} />
              <span>Bank Sampah Digital</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/education">
                <Nav.Link className="mx-1">Edukasi</Nav.Link>
              </LinkContainer>
              
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <LinkContainer to="/dashboard">
                      <Nav.Link className="mx-1">Dashboard</Nav.Link>
                    </LinkContainer>
                  )}
                  
                  <LinkContainer to="/transactions">
                    <Nav.Link className="mx-1">Transaksi</Nav.Link>
                  </LinkContainer>
                  
                  <LinkContainer to="/rewards">
                    <Nav.Link className="mx-1">Hadiah</Nav.Link>
                  </LinkContainer>
                  
                  <NavDropdown title={<><FaUser className="me-1" />{user.fullName}</>} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profil</NavDropdown.Item>
                    </LinkContainer>
                    
                    <LinkContainer to="/qrcode">
                      <NavDropdown.Item>QR Code</NavDropdown.Item>
                    </LinkContainer>
                    
                    {(user.role === 'admin' || user.role === 'staff') && (
                      <LinkContainer to="/weight-integration">
                        <NavDropdown.Item>Timbangan Digital</NavDropdown.Item>
                      </LinkContainer>
                    )}
                    
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                      Keluar
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link className="mx-1">
                      <Button variant="outline-light" size="sm" className="px-3 py-1">Masuk</Button>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link className="mx-1">
                      <Button variant="light" size="sm" className="px-3 py-1 fw-medium">Daftar</Button>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;