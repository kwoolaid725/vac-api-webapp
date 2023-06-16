import React from 'react'
import {Container, Navbar} from "react-bootstrap";
const Header = () => {
  return (
    <>
        <div className='app-header'>
            <h1>BG Vacuum Lab</h1>
        </div>

        <div className='app-navbar'>
          <Navbar bg="dark" expand="sm" variant="dark">
              <Container>
                  <Navbar.Brand href="/">HOME</Navbar.Brand>
              </Container>
          </Navbar>

        </div>

    </>
  )
}
export default Header