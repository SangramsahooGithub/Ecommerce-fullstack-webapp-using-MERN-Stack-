import React, { useState, useEffect } from "react";
import { login, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";

const Login = () => {
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated]);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(LoginEmail, LoginPassword));

    // navigate("/");
  };

  return (
    <>
      <MetaData title={`Login Page`} />
      <div className="container my-5 ">
        <div className="row justify-content-center ">
          <div className="col-md-6 col-12 shadow-lg p-4 usercontainer rounded-2  animate__animated animate__fadeInUp">
            <div className="signupimagecontainer mb-5  ">
              <img src="/images/clogo.png" alt="" />
              {/* <h5 className="text-center">Login</h5> */}
            </div>
            <form onSubmit={loginSubmit} autoComplete="off">
              <div className="mb-4">
                <label for="exampleFormControlInput1" class="form-label">
                  <small className="fw-bold"> Enter your Email address</small>
                </label>

                <input
                  type="email"
                  className="form-control "
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={LoginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter Your Email ....."
                  required={true}
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  <small className="fw-bold">Enter your Password</small>
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={LoginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter Your Password ....."
                  required={true}
                  autoComplete="off"
                />
              </div>
              <p>
                <small>
                  Not registered yet !{" "}
                  <Link to={`/signup`}>Go to register</Link>
                </small>
              </p>

              <div className="text-center">
                <button type="submit" className="btn  btn-sm neumorphin w-50">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
