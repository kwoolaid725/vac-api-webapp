import React from "react";
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'

import Tests from './pages/Tests'
import Test from './pages/Test'
import Users from './pages/Users'
import Vacuums from './pages/Vacuums'
import _Tests from './pages/_Tests'
import TestFunction from './pages/_Test'
import Layout from './components/Layout'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Container, Navbar} from "react-bootstrap";
function App() {
  return (
    <>
        <Router>
            <Layout>
                <Routes>
                    <Route path="/tests" element={<Tests/>} exact />
                    <Route path="/tests/:id" element={<Test/>}  />
                    <Route path="/users" element={<Users/>}  />
                    <Route path="/vacuums" element={<Vacuums/>}  />
                    <Route path="/_tests" element={<_Tests/>}  />
                    <Route path="/_tests/:id" element={<TestFunction/>}  />

                </Routes>
            </Layout>
        </Router>
    </>
  );
}

export default App;
