import logo from "./logo.svg";
import "./App.css";
import Routes from "./Routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
