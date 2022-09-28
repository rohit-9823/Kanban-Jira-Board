import React, { useState } from "react";
import userIcon from "../../image/user.svg";
import "../../../src/style.css"
// import { useHistory, Link } from "react-router-dom";
import useHistory from "react-router-dom"
function NewNavbar(props) {
  // const history = useHistory();
  const [click, setclick] = useState(false);
  const [showhide, setshowhide] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    // history.push("/login");
  };
  const handleclick = () => {
    setshowhide(!showhide);
  };
  let cls = showhide
    ? "fa-solid fa-caret-up fa-lg imgg"
    : "fa-solid fa-caret-down fa-lg imgg";
  return (
    <div className="n-top-bar">
      <div className="topleft">
        {/* <img src={lines} className="linesicon" onClick={handleshowhide}/> */}
        <div className="nav-search">
          <input
            className="nav-search-input"
            type="text"
            placeholder="Search"
          />
          <span className="nv-srch-ico">
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>
      <div className="n-nav-user">
        <img src={userIcon} alt="" onClick={handleclick} />
        {showhide?
                <div className="user-nav-menu">
          <ul>
            <li>
              <img src={userIcon} alt="" />
              <div className="unm-prof-det">
                <p>Bibek Neupane</p>
                <p>bibekneupane@gmail.com</p>
              </div>
            </li>
            <li>Manage Account</li>

            <li>Profile</li>
            <li>Personal settings</li>

            <li>Log out</li>
          </ul>
        </div>
        :null}


      </div>
    </div>
  );
}

export default NewNavbar;
