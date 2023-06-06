import "./App.css";
import RegisterForm from "./pages/registration/RegisterForm";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login/Login";
import Spinner from "../src/asset/Spinner-1s-200px.svg";
import { Appbar } from "./component/Appbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Booklisting from "./pages/home/Booklisting";
import { AuthWrapper } from "./context/auth.context";
import { useAuthContext } from "./context/auth.context";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "./utils/enum";
import Book from "./pages/book/Book";
import Home from "./pages/home/Home";
import EditBook from "./pages/book/editBook";
import Categories from "./pages/category/Categories";
import EditCategory from "./pages/category/editCategory";
import Users from "./pages/user/Users";
import EditUser from "./pages/user/editUser/Edituser";
function App() {
  const authContext=useAuthContext();
  const Redirect = <Navigate to={RoutePaths.Login} />;
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
            <Route exact path="/book" element={<Book />} />
            <Route exact path="/category" element={<Categories />} />
            <Route exact path="/user" element={<Users />} />
            <Route
        exact
        path="/edit-book/:id"
        element={<EditBook />}
      />
      <Route
        exact
        path="add-book"
        element={<EditBook />}
      />
      <Route
        exact
        path="/edit-category/:id"
        element={<EditCategory />}
      />
      <Route
        exact
        path="/edit-user/:id"
        element={<EditUser />}
      />
      <Route
        exact
        path="add-category"
        element={<EditCategory />}
      />

          </Routes>
        </AuthWrapper>
      </Router>
    </>
  );
}

export default App;
