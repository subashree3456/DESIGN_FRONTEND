import React from "react";
import "./Layout.css";
import Main from "../Main/Main";
import Sidebar from "../../component/sidebar/Sidebar";
import Nav from "../../component/nav/Nav";
const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Nav />
        <Main />
      </div>
    </div>
  );
};

export default Layout;
