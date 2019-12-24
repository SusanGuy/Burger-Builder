import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "../Menu/Menu";
import classes from "./Toolbar.module.css";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <Menu clicked={props.drawerToggleClicked} />
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
