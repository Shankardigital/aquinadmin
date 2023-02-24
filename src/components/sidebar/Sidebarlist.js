import React, { useState } from "react";
import { menu } from "./menu";
import { hasChildren } from "./utils";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link, NavLink } from "react-router-dom";

export default function Sidebarlist() {
  return menu.map((item, key) => <MenuItem key={key} item={item} />);
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
  return (
    <ListItem button >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  );
};

const MultiLevel = ({ item }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} style={{ fontSize: "13px" }} />
        {open ? (
          <ExpandLessIcon style={{ color: "white" }} fontSize="small" />
        ) : (
          <ExpandMoreIcon style={{ color: "white" }} fontSize="small" />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {children.map((child, key) => (
          <NavLink to={child.to} className="NavLinks">
              <MenuItem key={key} item={child} /></NavLink>
            ))} 
         
        </List>
      </Collapse>
    </React.Fragment>
  );
};

{
  /* <NavLink to="/Profile"></NavLink> */
}
