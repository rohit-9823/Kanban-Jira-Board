import React from "react";
import { NavLink } from "react-router-dom";
import "../../../src/style.css"
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import { useHistory, useLocation } from "react-router-dom";

export const NSidebar = ({ rtl, toggled, handleToggleSidebar }) => {
  return (
    <div className="inner-sidebar1">
      <ProSidebar>
        <SidebarContent>
          <h1>Task Management System</h1>
          <Menu iconShape="circle">
            {/* <MenuItem
              icon={<FaTachometerAlt />}
              suffix={<span className="badge red">New</span>}
              title="Dashboard"
            >
              <NavLink exact to={"/"}>
                Dashboard
              </NavLink>
            </MenuItem> */}
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              icon={<FaRegLaughWink />}
              title="Dashboard"
            >
              <MenuItem>
                <NavLink exact to={"/projform"}>
                  Project Dashboard
                </NavLink>
              </MenuItem>
            </SubMenu>
            <SubMenu
              icon={<FaHeart />}
              title="User Management"
            >
              <MenuItem>
                <NavLink exact to={"/createuser"}>
                  Create User
                </NavLink>
              </MenuItem>
              <MenuItem>
              <NavLink exact to={"/createrole"}>
              Create Role
              </NavLink></MenuItem>
            </SubMenu>
            <SubMenu icon={<FaList />} title="Settings">
              <MenuItem> <NavLink exact to={"/documentType"}>
              Document Type
              </NavLink> </MenuItem>
              <MenuItem> <NavLink exact to={"/kanban"}>
              Kanban
              </NavLink> </MenuItem>
              <MenuItem> <NavLink exact to={"/client"}>
              Client
              </NavLink> </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
};


