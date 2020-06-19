import React from "react";
import { Button, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

interface Props {
  activeItem: string;
  handleActiveItem: (_: any, data: any) => any;
}
const HeaderAuthButtons = ({ activeItem, handleActiveItem }: Props) => {
  return (
    <>
      <Menu.Item>
        <Button
          as={NavLink}
          active={activeItem === "signin"}
          onClick={handleActiveItem}
          inverted
          to="/signin"
          className={styles.headerButton}
        >
          Sign in
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          as={NavLink}
          active={activeItem === "signup"}
          onClick={handleActiveItem}
          inverted
          to="/signup"
          className={styles.headerButton}
        >
          Sign Up
        </Button>
      </Menu.Item>
    </>
  );
};
export default HeaderAuthButtons;
