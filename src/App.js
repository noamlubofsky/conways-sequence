import './App.css';
import { BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";
import Sequence from './components/Sequence'

function App() {
  return (
    <div className="App">
      <Sequence />
    </div>
  );
}

export default App;
