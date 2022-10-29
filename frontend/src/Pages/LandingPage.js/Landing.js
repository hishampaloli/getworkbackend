import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./landing.scss";

const Landing = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.userInfo?.userType === "employee") {
      navigate("/users/home");
    }
    if (user?.userInfo?.userType === "employer") {
      navigate("/employer/home");
    }
    if (user?.userInfo?.userType === "admin") {
      navigate("/admin/profile");
    }
  }, [user]);

  return (
    <div className="landing-main">
      <div className="leftt">
        <h1>GET THE BEST TALENTS ON GETWORKER</h1>
        <p>You can have the best people. Right here. Righ now</p>
        <Link to={"/signup"}>
          <button>GET STARTED</button>
        </Link>
      </div>

      <div className="right">
        <img
          src="https://i.pinimg.com/originals/ef/a4/bb/efa4bb17dc9b43142373419d50e0e3c1.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Landing;
