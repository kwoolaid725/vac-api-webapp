import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'

import Tests from './pages/Tests'
import Test from './pages/Test'
import Layout from './components/Layout'
function App() {
  return (
    <Router>
        <Layout>
            <Routes>
                <Route path="/tests" element={<Tests/>} exact />
                <Route path="/tests/:id" element={<Test/>}  />
            </Routes>
        </Layout>
    </Router>
  );
}

export default App;
