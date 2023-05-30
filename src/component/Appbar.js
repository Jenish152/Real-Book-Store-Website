import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import bookservices from "../sevices/book.service";
import { useAuthContext } from "../context/auth.context";

export const Appbar = () => {
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const [searchval,setseearchval]=React.useState('');
  const handlesearch=async ()=>{
    console.log(searchval);
    const res=await bookservices.searchBook(searchval);
    console.log(res);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  BookListing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Link
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Link
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Link
                </Link>
              </li>
            </ul>
            <div className="input-group">
  <input type="search" onChange={e => setseearchval(e.target.value)} className="form-control rounded input-sm ml-1" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" onClick={handlesearch} className="btn btn-outline-dark">search</button>
</div>
            <form className="d-flex">
            {authContext.user.id && (
              <button
              type="button"
              onClick={() => {
               authContext.signOut();
              }}
              className="btn btn-outline-dark m-2"
            >
              LogOut
            </button>
            )}

             {!(authContext.user.id) && (
              <><button
              type="button"
              onClick={() => {
                navigate("/login");
              }}
              className="btn btn-outline-dark m-2"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="btn btn-outline-dark m-2"
            >
              Register
            </button></>
            )}
              
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};
