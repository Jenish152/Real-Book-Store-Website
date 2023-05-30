import "./App.css";
import RegisterForm from "./pages/registration/RegisterForm";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import Spinner from "../src/asset/Spinner-1s-200px.svg";
import { Appbar } from "./component/Appbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { AuthWrapper } from "./context/auth.context";
function App() {
  return (
    <>
      <div className="loader-wrapper">
        <img src={Spinner} alt="loader" />
      </div>

      <ToastContainer />
      <Router>
        <AuthWrapper>
          <Appbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<RegisterForm />} />
          </Routes>
        </AuthWrapper>
      </Router>
    </>
  );
}

export default App;
