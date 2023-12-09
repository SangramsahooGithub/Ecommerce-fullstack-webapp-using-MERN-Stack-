import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../../../Store";
import { loadUser } from "../../../actions/userAction";
import UserOptions from "./UserOptions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    store.dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      <nav className="navbar navbar-expand-lg linearcolor sticky-top  ">
        <div className="container">
          <Link className="navbar-brand brandtext fw-bold" to={"/"}>
            BuySure
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto me-5  ">
              <li className="nav-item">
                <Link
                  className="nav-link "
                  aria-current="page"
                  to={"/"}
                  onClick={closeNav}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " onClick={closeNav} to={"/products"}>
                  Products
                </Link>
              </li>
              {isAuthenticated ? (
                ""
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      onClick={closeNav}
                      to={"/signup"}
                    >
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      onClick={closeNav}
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}

              {/* {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " onClick={closeNav} to={"/signup"}>
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " onClick={closeNav} to={"/login"}>
                      Login
                    </Link>
                  </li>
                </>
              )} */}

              <li className="nav-item">
                <Link className="nav-link " onClick={closeNav} to={"/search"}>
                  Search
                </Link>
              </li>

              {isAuthenticated && <UserOptions user={user} />}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
