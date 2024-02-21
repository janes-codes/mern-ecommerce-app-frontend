import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Rout from './components/Route';

export const URL = process.env.REACT_APP_SERVER_URL

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Rout />
      </Router>
    </div>
  );
}

export default App
